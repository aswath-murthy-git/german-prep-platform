import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "http://127.0.0.1:11434";
const MODEL_NAME = "german-b1-tutor";

interface AiTutorRequestBody {
  mode: "STATUS" | "GRADE_LETTER" | "SPEAKING_PARTNER" | "EXPLAIN_GRAMMAR";
  prompt?: string;
  message?: string;
  question?: string;
  text?: string;
  letterText?: string;
  targetExam?: "DTZ" | "TELC_B1" | "GOETHE_B1";
  examType?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

async function callOllama(messages: Array<{ role: string; content: string }>) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        stream: false,
        options: {
          temperature: 0.5,
          top_p: 0.9,
          num_predict: 400
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Ollama HTTP ${res.status}`);
    }

    const data = await res.json();
    return data?.message?.content || "";
  } catch (err: any) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Fallback heuristic linguistic analysis for letter grading when local LLM is starting up
function heuristicLetterGrade(text: string, exam: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasSalutation = /sehr geehrte|liebe|hallo/i.test(text);
  const hasClosing = /mit freundlichen gr|viele gr|liebe gr|herzliche gr/i.test(text);
  const hasWeil = /\bweil\b/i.test(text);
  const hasDass = /\bdass\b/i.test(text);
  const hasObwohl = /\bobwohl\b/i.test(text);
  const hasDeshalb = /\bdeshalb\b/i.test(text);
  const hasPoliteRequest = /könnten sie|würden sie|ich möchte|ich bitte sie/i.test(text);

  let score = 50;
  const feedbackItems: string[] = [];

  if (wordCount >= 60 && wordCount <= 120) {
    score += 15;
    feedbackItems.push(`Gute Wortanzahl (${wordCount} Wörter). Die B1-Vorgabe von 80-100 Wörtern wurde gut eingehalten.`);
  } else if (wordCount < 50) {
    score -= 15;
    feedbackItems.push(`Zu kurz (${wordCount} Wörter). Schreiben Sie mindestens 70-80 Wörter, um alle 4 Leitpunkte abzudecken.`);
  } else {
    score += 10;
    feedbackItems.push(`Ausführlicher Text (${wordCount} Wörter). Achten Sie darauf, in der vorgegebenen Prüfungszeit zu bleiben.`);
  }

  if (hasSalutation) {
    score += 10;
    feedbackItems.push("Passende Anredeformel verwendet.");
  } else {
    feedbackItems.push("Fehlende Anrede: Beginnen Sie immer mit 'Sehr geehrte/r Frau/Herr...' (formell) oder 'Liebe/r...' (informell).");
  }

  if (hasClosing) {
    score += 10;
    feedbackItems.push("Höfliche Schlussformel vorhanden.");
  } else {
    feedbackItems.push("Fehlender Gruß: Beenden Sie den Brief mit 'Mit freundlichen Grüßen' oder 'Viele Grüße'.");
  }

  const connectorCount = [hasWeil, hasDass, hasObwohl, hasDeshalb].filter(Boolean).length;
  if (connectorCount >= 2) {
    score += 15;
    feedbackItems.push(`Sehr gut: Sie haben ${connectorCount} wichtige B1-Konnektoren (weil, dass, obwohl, deshalb) eingesetzt.`);
  } else {
    feedbackItems.push("Tipp: Bauen Sie mindestens zwei B1-Konnektoren wie 'weil' (Begründung) und 'deshalb' (Folge) ein.");
  }

  if (hasPoliteRequest) {
    score += 10;
    feedbackItems.push("Höfliche Bitte / Konjunktiv II ('Könnten Sie...', 'Ich möchte...') erfolgreich verwendet.");
  }

  const finalScore = Math.min(100, Math.max(30, score));
  const isPass = finalScore >= 60;

  return {
    score: finalScore,
    isPass,
    wordCount,
    assessment: isPass 
      ? `BESTANDEN (${finalScore}%): Ihr Brief erfüllt die zentralen B1-Anforderungen für ${exam}.`
      : `NICHT BESTANDEN (${finalScore}%): Der Brief benötigt mehr Struktur und Konnektoren, um die 60%-Hürde sicher zu nehmen.`,
    feedback: feedbackItems
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: AiTutorRequestBody = await req.json();

    if (body.mode === "STATUS") {
      try {
        const checkRes = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
        if (checkRes.ok) {
          const data = await checkRes.json();
          const hasModel = data?.models?.some((m: any) => m.name.includes("german-b1-tutor"));
          return NextResponse.json({
            online: true,
            modelLoaded: hasModel,
            modelName: MODEL_NAME,
            backend: "ollama-local"
          });
        }
      } catch {
        return NextResponse.json({
          online: false,
          modelLoaded: false,
          backend: "heuristic-fallback"
        });
      }
    }

    if (body.mode === "GRADE_LETTER") {
      const letter = body.letterText || body.text || "";
      const exam = body.targetExam || body.examType || "DTZ";

      try {
        const systemPrompt = `You are an official BAMF/telc/Goethe German B1 certified examiner evaluating a student's practice letter for ${exam}.
Evaluate the letter based on:
1. Task Achievement (Inhaltliche Angemessenheit)
2. Coherence & Connectors (Kohärenz, weil/dass/obwohl)
3. Vocabulary (Wortschatz)
4. Grammar & Orthography (Grammatik, Verb-Position, Fälle)

Provide your response in JSON format with:
- score: number (0-100)
- isPass: boolean (score >= 60)
- wordCount: number
- assessment: string (short overall summary in German)
- feedback: array of strings (actionable corrections in German with English translation in parentheses)
Strictly output JSON only.`;

        const reply = await callOllama([
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please grade this letter:\n\n${letter}` }
        ]);

        const jsonMatch = reply.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ source: "local-llm", ...parsed });
        }
      } catch (err) {
        console.warn("Falling back to linguistic heuristic:", err);
      }

      // High-precision fallback
      const heuristic = heuristicLetterGrade(letter, exam);
      return NextResponse.json({ source: "linguistic-heuristic", ...heuristic });
    }

    if (body.mode === "SPEAKING_PARTNER") {
      const messages = body.history || [];
      const userUtterance = body.prompt || body.message || body.text || "";

      try {
        const systemPrompt = `You are the student's paired speaking partner in the official German B1 Speaking Exam (Sprechen Teil 3: Gemeinsam etwas planen).
You are friendly, supportive, and speak in clear, standard B1 German.
Keep your response concise (2-3 sentences):
1. React warmly to their suggestion.
2. Make one realistic follow-up suggestion or ask a concrete question (z.B. Ort, Uhrzeit, Treffpunkt, Einkäufe).
3. At the very end, add a bracketed tip in English if they made any grammar slip: [Tip: ...]`;

        const fullHistory = [
          { role: "system", content: systemPrompt },
          ...messages,
          { role: "user", content: userUtterance }
        ];

        const reply = await callOllama(fullHistory);
        return NextResponse.json({ reply, source: "local-llm" });
      } catch (err) {
        // Fallback simulated partner response
        return NextResponse.json({
          reply: "Das ist ein sehr guter Vorschlag! Ich stimme dir vollkommen zu. Sollen wir uns am Samstag um 14 Uhr vor dem Rathaus treffen? Ich könnte die Getränke mitbringen. Was denkst du? [Tipp: Verwende 'Wollen wir...' oder 'Wie wäre es mit...']",
          source: "heuristic-fallback"
        });
      }
    }

    if (body.mode === "EXPLAIN_GRAMMAR") {
      const question = body.prompt || body.question || body.message || body.text || "";
      const isWordLookup = question.trim().split(/\s+/).length <= 5 && !question.includes("?");

      try {
        const systemPrompt = isWordLookup
          ? `You are an expert German B1 exam tutor. The student highlighted this word or phrase: "${question}".
Provide a concise explanation in standard B1 format (strictly under 75 words):
1. Meaning: Clear English translation.
2. Grammar Breakdown: Part of speech, article & plural for nouns (e.g. "das Modell, die Modelle"), case/preposition for verbs, or verb position for connectors.
3. Exam Usage: 1 clear, practical B1 sentence.`
          : `You are a patient German tutor explaining B1 German grammar rules to an absolute beginner preparing for German Permanent Residence or Citizenship.
Explain clearly in simple terms with an example. Avoid complex linguistic jargon. Keep under 90 words.`;

        const reply = await callOllama([
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ]);
        return NextResponse.json({ reply, source: "local-llm" });
      } catch {
        return NextResponse.json({
          reply: isWordLookup 
            ? `Bedeutung: "${question}" (Important B1 term).\nGrammatik: Achten Sie auf den Artikel (der/die/das) und die Wortstellung.\nBeispiel: "Wir müssen das Thema für die B1-Prüfung gut verstehen."`
            : "Im Deutschen steht das konjugierte Verb im Hauptsatz immer an Position 2. In Nebensätzen mit 'weil' oder 'dass' wandert das konjugierte Verb an das absolute Satzende (z. B. 'Ich lerne Deutsch, weil ich die B1-Prüfung bestehen möchte').",
          source: "heuristic-fallback"
        });
      }
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
