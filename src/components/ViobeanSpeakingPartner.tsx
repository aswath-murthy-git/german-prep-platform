"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Clock,
  Send,
  MessageSquare,
  Award,
  AlertCircle
} from "lucide-react";

const SAMPLE_INTRO_TEXT = "Guten Tag! Mein Name ist Rahul Sharma und ich komme aus Indien. Seit zwei Jahren lebe ich hier in Deutschland in Berlin. Ich bin verheiratet und habe einen kleinen Sohn. Von Beruf bin ich Softwareentwickler bei einem internationalen Technologieunternehmen. Meine Muttersprache ist Hindi, aber ich spreche auch fließend Englisch und lerne jetzt fleißig Deutsch, weil ich mich hier beruflich und privat zu Hause fühlen möchte. In meiner Freizeit spiele ich sehr gern Fußball mit meinen Freunden und koche am Wochenende für meine Familie.";

const SAMPLE_PRESENTATION_SLIDES = [
  {
    title: "Einleitung & Thema",
    text: "Guten Tag zusammen. Das Thema meiner Präsentation lautet: 'Brauchen Schulkinder ein eigenes Smartphone?' Ich habe dieses Thema gewählt, weil heute fast jedes Kind mit digitaler Technik aufwächst und viele Eltern unsicher sind, ab welchem Alter ein Smartphone sinnvoll ist."
  },
  {
    title: "Eigene Erfahrung",
    text: "In meiner eigenen Familie habe ich die Erfahrung gemacht, dass mein zehnjähriger Neffe oft stundenlang Spiele auf dem Handy gespielt hat, anstatt seine Hausaufgaben zu machen oder sich mit Freunden draußen zu treffen."
  },
  {
    title: "Situation im Heimatland",
    text: "In meinem Heimatland Indien besitzen viele Kinder bereits ab der fünften Klasse ein Smartphone, oft damit die Eltern sie auf dem Schulweg immer erreichen und orten können."
  },
  {
    title: "Vor- und Nachteile",
    text: "Einerseits bietet ein Smartphone große Vorteile: Kinder können im Notfall sofort ihre Eltern anrufen und Lern-Apps für die Schule nutzen. Andererseits gibt es auch erhebliche Nachteile: Zu viel Bildschirmzeit schadet den Augen und verringert die Konzentration beim Lernen spürbar."
  },
  {
    title: "Eigene Meinung & Abschluss",
    text: "Meiner Meinung nach sollten Kinder erst ab etwa 12 Jahren ein eigenes Smartphone bekommen, und auch dann nur mit klaren Zeitregeln. Das war meine Präsentation. Vielen Dank für Ihre Aufmerksamkeit. Haben Sie noch Fragen?"
  }
];

const SAMPLE_PRESENTATION_FULL = SAMPLE_PRESENTATION_SLIDES.map(s => s.text).join(" ");

const SAMPLE_PLANNING_TURNS = [
  {
    speaker: "Kandidat A",
    tag: "Vorschlag: Anlass & Termin",
    text: "Hallo Markus! Wie du weißt, beendet unsere Kollegin Sarah nächsten Monat ihren Deutschkurs. Wollen wir zusammen eine Abschiedsfeier für sie organisieren? Wie wäre es mit nächstem Samstag um 18 Uhr?"
  },
  {
    speaker: "Kandidat B",
    tag: "Zustimmung & Gegenvorschlag Ort",
    text: "Hallo Priya! Das ist eine wunderbare Idee. Samstagabend passt mir sehr gut. Aber wo sollen wir feiern? Ich schlage vor, dass wir bei gutem Wetter im Stadtpark grillen."
  },
  {
    speaker: "Kandidat A",
    tag: "Einwand & Alternative bei Regen",
    text: "Im Park zu grillen klingt fantastisch! Aber was machen wir, wenn es regnet? Vielleicht sollten wir vorsichtshalber einen Tisch in einem gemütlichen Restaurant reservieren?"
  },
  {
    speaker: "Kandidat B",
    tag: "Kompromiss & Essen",
    text: "Du hast völlig recht. Ich kenne ein nettes italienisches Restaurant mit Terrasse. Wenn die Sonne scheint, sitzen wir draußen. Wer kümmert sich um die Einladungen und das Geschenk?"
  },
  {
    speaker: "Kandidat A",
    tag: "Aufgabenverteilung & Geschenkidee",
    text: "Ich erstelle gleich heute Abend eine WhatsApp-Gruppe für die Einladungen. Und was hältst du davon, wenn wir Sarah ein Fotobuch mit gemeinsamen Erinnerungen schenken?"
  },
  {
    speaker: "Kandidat B",
    tag: "Einigung & Abschluss",
    text: "Ausgezeichnet, ein Fotobuch ist ein persönliches und schönes Geschenk! Ich sammle die Fotos und bestelle das Buch. Wir teilen die Kosten einfach durch alle Kollegen. Abgemacht!"
  }
];

const SAMPLE_PLANNING_FULL = SAMPLE_PLANNING_TURNS.map(t => `${t.speaker}: ${t.text}`).join(" ");


interface FullExamTurn {
  speaker: "Prüfer" | "Kandidat A" | "Kandidat B";
  phase: "Teil 1: Vorstellung" | "Teil 2: Präsentation & Frage" | "Teil 3: Gemeinsam planen" | "Abschluss";
  tag: string;
  de: string;
  en: string;
}

const FULL_EXAM_CONVERSATION: FullExamTurn[] = [
  // ── PHASE 1: TEIL 1 (Kennenlernen & Fragen) ──
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Eröffnung & Einladung",
    de: "Guten Tag, meine Damen und Herren! Willkommen zur mündlichen B1-Prüfung. Mein Name ist Frau Dr. Weber. Wir beginnen mit Teil 1: Bitte stellen Sie sich kurz vor. Herr Sharma, möchten Sie anfangen?",
    en: "Good day, ladies and gentlemen! Welcome to the B1 oral exam. My name is Dr. Weber. We begin with Part 1: Please introduce yourselves briefly. Mr. Sharma, would you like to start?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 1: Vorstellung",
    tag: "6-Satz Blueprint",
    de: "Sehr gern. Mein Name ist Rahul Sharma und ich komme aus Indien. Seit zwei Jahren wohne ich in Deutschland in Berlin. Ich bin verheiratet und habe einen kleinen Sohn. Von Beruf bin ich Softwareentwickler bei einem internationalen Unternehmen. Meine Muttersprache ist Hindi, aber ich spreche auch fließend Englisch und lerne jetzt Deutsch, weil ich hier langfristig leben und arbeiten möchte. In meiner Freizeit spiele ich sehr gern Fußball und koche am Wochenende für meine Familie.",
    en: "With pleasure. My name is Rahul Sharma and I come from India. I have been living in Germany in Berlin for two years. I am married and have a young son. By profession I am a software developer at an international company. My native language is Hindi, but I also speak fluent English and am now learning German because I want to live and work here long term. In my free time I like playing football and cooking for my family on weekends."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Prüfer-Rückfrage",
    de: "Vielen Dank, Herr Sharma. Wie gefällt Ihnen Ihre Arbeit in Berlin und wie lange lernen Sie schon Deutsch?",
    en: "Thank you very much, Mr. Sharma. How do you like your work in Berlin and how long have you been learning German?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 1: Vorstellung",
    tag: "Souveräne Antwort",
    de: "Meine Arbeit gefällt mir sehr gut, weil meine Kollegen hilfsbereit sind. Ich lerne seit etwa einem Jahr intensiv Deutsch, zuerst im Online-Kurs und jetzt im Integrationskurs.",
    en: "I like my work very much because my colleagues are helpful. I have been learning German intensively for about one year, first in an online course and now in the integration course."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Partner-Vorstellung",
    de: "Wunderbar. Frau Santos, nun sind Sie an der Reihe. Bitte stellen Sie sich vor.",
    en: "Wonderful. Ms. Santos, now it is your turn. Please introduce yourself."
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 1: Vorstellung",
    tag: "Partnerin stellt sich vor",
    de: "Guten Tag. Ich heiße Maria Santos und komme aus Brasilien. Ich lebe seit anderthalb Jahren in Potsdam. Ich bin ledig. In Brasilien habe ich als Krankenschwester gearbeitet und mache hier gerade die Anerkennung meiner Ausbildung. In meiner Freizeit lese ich gern deutsche Romane und fahre viel Fahrrad.",
    en: "Good day. My name is Maria Santos and I come from Brazil. I have been living in Potsdam for one and a half years. I am single. In Brazil I worked as a nurse and am currently getting my qualifications recognized here. In my free time I like reading German novels and cycling a lot."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Übergang zu Teil 2",
    de: "Danke schön, Frau Santos. Teil 1 ist damit abgeschlossen.",
    en: "Thank you, Ms. Santos. Part 1 is now completed."
  },

  // ── PHASE 2: TEIL 2 (Präsentation & Partner-Rückfrage) ──
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Präsentationsaufruf",
    de: "Nun kommen wir zu Teil 2: Ein Thema präsentieren. Herr Sharma, bitte halten Sie Ihre Präsentation zum Thema 'Brauchen Schulkinder ein eigenes Smartphone?'. Frau Santos, hören Sie bitte aufmerksam zu, denn Sie sollen anschließend eine Frage stellen.",
    en: "Now we come to Part 2: Presenting a topic. Mr. Sharma, please give your presentation on the topic 'Do school children need their own smartphone?'. Ms. Santos, please listen attentively, as you will ask a question afterwards."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 2: Präsentation & Frage",
    tag: "5-Punkte Präsentation",
    de: "Guten Tag zusammen. Das Thema meiner Präsentation lautet: 'Brauchen Schulkinder ein eigenes Smartphone?'. Ich habe dieses Thema gewählt, weil digitale Medien heutzutage jeden Haushalt betreffen. In meiner persönlichen Erfahrung habe ich bei meinem Neffen gesehen, dass er stundenlang am Handy spielte und sich kaum noch draußen bewegte. In meinem Heimatland Indien besitzen viele Kinder schon ab der fünften Klasse ein Smartphone, damit Eltern sie auf dem Schulweg jederzeit anrufen können. Einerseits bietet ein Smartphone große Vorteile: Man kann im Notfall sofort Hilfe rufen und nützliche Lern-Apps nutzen. Andererseits gibt es erhebliche Nachteile: Zu viel Bildschirmzeit schadet der Konzentration und den Augen. Meiner Meinung nach sollten Kinder erst ab etwa 12 Jahren ein eigenes Smartphone bekommen, und auch dann nur mit festen Zeitregeln. Das war meine Präsentation. Vielen Dank für Ihre Aufmerksamkeit!",
    en: "Good day everyone. The topic of my presentation is: 'Do school children need their own smartphone?'. I chose this topic because digital media affects every household today. In my personal experience with my nephew, I saw that he played on his phone for hours and barely moved outside. In my home country India, many children own a smartphone from fifth grade so parents can reach them on the way to school. On one hand, a smartphone offers great advantages: one can call for help immediately in an emergency and use learning apps. On the other hand, there are considerable disadvantages: too much screen time harms concentration and eyesight. In my opinion, children should only get their own smartphone from around age 12, and even then only with firm time rules. That was my presentation. Thank you for your attention!"
  },
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Aufforderung zur Partnerfrage",
    de: "Vielen Dank, Herr Sharma. Frau Santos, welche Frage möchten Sie Herrn Sharma zu seiner Präsentation stellen?",
    en: "Thank you very much, Mr. Sharma. Ms. Santos, what question would you like to ask Mr. Sharma about his presentation?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Relevante Partnerfrage",
    de: "Vielen Dank für deine interessante Präsentation, Rahul. Mich würde interessieren: Glaubst du, dass Schulen Smartphones im Unterricht erlauben sollten oder sollten sie komplett verboten sein?",
    en: "Thank you for your interesting presentation, Rahul. I would be interested to know: Do you believe that schools should allow smartphones in class or should they be completely forbidden?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Begründete Antwort",
    de: "Das ist eine sehr gute Frage, Maria. Ich denke, während des normalen Unterrichts sollten Handys in der Schultasche bleiben. Aber wenn Lehrer sie gezielt für ein Recherche-Projekt einsetzen, kann es sehr lehrreich sein.",
    en: "That is a very good question, Maria. I think during normal lessons phones should stay in school bags. But when teachers purposefully use them for research projects, it can be very educational."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Prüfer-Abschluss Teil 2",
    de: "Sehr gut argumentiert von Ihnen beiden. Damit ist Teil 2 beendet.",
    en: "Very well argued by both of you. That concludes Part 2."
  },

  // ── PHASE 3: TEIL 3 (Gemeinsam planen & Verhandeln) ──
  {
    speaker: "Prüfer",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Aufgabenstellung Teil 3",
    de: "Nun kommen wir zu Teil 3: Gemeinsam eine Aufgabe planen. Ihr gemeinsamer Deutschkurs-Kollege Thomas zieht nächsten Monat zurück in seine Heimat. Sie möchten eine Abschiedsfeier für ihn organisieren. Planen Sie gemeinsam: Wann und wo findet die Feier statt? Was bringen Sie zu essen und zu trinken mit? Welches Geschenk kaufen Sie? Und wie teilen Sie die Kosten auf? Sie haben etwa fünf Minuten Zeit.",
    en: "Now we come to Part 3: Planning a task together. Your fellow German course colleague Thomas is moving back to his home country next month. You want to organize a farewell party for him. Plan together: When and where will the party take place? What will you bring to eat and drink? What gift will you buy? And how will you split the costs? You have about five minutes."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "1. Vorschlag machen (Datum & Zeit)",
    de: "Hallo Maria, hast du schon gehört? Thomas zieht nächsten Monat um! Wollen wir eine kleine Überraschungsfeier für ihn organisieren? Wie wäre es mit nächstem Samstag um 18 Uhr?",
    en: "Hello Maria, have you heard? Thomas is moving next month! Shall we organize a small surprise party for him? How about next Saturday at 6 PM?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Zustimmung & Ort-Vorschlag",
    de: "Das ist eine wunderbare Idee! Samstagabend passt mir sehr gut. Wo wollen wir die Feier machen? Sollen wir einen Tisch im Restaurant reservieren oder uns draußen treffen?",
    en: "That is a wonderful idea! Saturday evening suits me very well. Where should we have the party? Shall we reserve a table at a restaurant or meet outdoors?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Höflicher Einwand & Alternative",
    de: "Im Restaurant wird es vielleicht etwas teuer für alle Kursteilnehmer. Wenn das Wetter schön ist, könnten wir ein schönes Picknick im Park machen. Falls es regnet, können wir gerne zu mir in die Wohnung kommen.",
    en: "In a restaurant it might be a bit expensive for all course participants. If the weather is nice, we could have a nice picnic in the park. If it rains, we can gladly come to my apartment."
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Essen & Getränke Aufteilung",
    de: "Perfekt, einverstanden! Und wie machen wir das mit dem Essen? Ich schlage vor, dass jeder Teilnehmer eine Kleinigkeit mitbringt: Salate, Fingerfood und Snacks. Was hältst du davon?",
    en: "Perfect, agreed! And how should we handle the food? I suggest that each participant brings a little something: salads, finger food, and snacks. What do you think?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Aufgabenverteilung & Geschenk",
    de: "Sehr gut! Ich besorge die Getränke und backe einen Kuchen. Und was schenken wir Thomas zum Abschied? Hast du eine Idee?",
    en: "Very good! I will get the drinks and bake a cake. And what shall we give Thomas as a farewell gift? Do you have an idea?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Geschenk-Idee & Kosten",
    de: "Wir könnten ein schönes Fotobuch mit Fotos aus unserem Deutschkurs erstellen und alle eine persönliche Nachricht hineinschreiben lassen. Wenn jeder fünf Euro gibt, reicht das völlig aus. Ich kann die Fotos sammeln und das Buch bestellen.",
    en: "We could create a nice photo book with photos from our German course and have everyone write a personal message. If everyone gives five euros, that is completely sufficient. I can collect the photos and order the book."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Einigung & Abschluss",
    de: "Das ist ein fantastisches Geschenk! Ich erstelle heute eine WhatsApp-Gruppe für den Kurs, damit alle Bescheid wissen. Wollen wir uns am Samstag um 17 Uhr treffen, um alles vorzubereiten?",
    en: "That is a fantastic gift! I will create a WhatsApp group for the course today so everyone is informed. Shall we meet on Saturday at 5 PM to prepare everything?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Feste Bestätigung",
    de: "Abgemacht! Samstag um 17 Uhr bei dir. Ich freue mich schon sehr darauf!",
    en: "Deal! Saturday at 5 PM at your place. I am already looking forward to it!"
  },
  {
    speaker: "Prüfer",
    phase: "Abschluss",
    tag: "Prüfungsabschluss & Lob",
    de: "Vielen Dank an Sie beide! Sie haben alle Punkte überzeugend und partnerschaftlich besprochen. Die mündliche Prüfung ist damit erfolgreich beendet. Wir wünschen Ihnen alles Gute!",
    en: "Thank you very much to both of you! You discussed all points convincingly and collaboratively. The oral exam is thus successfully concluded. We wish you all the best!"
  }
];

const FULL_EXAM_CONVERSATION_TEXT = FULL_EXAM_CONVERSATION.map(t => `${t.speaker}: ${t.de}`).join(" ");

interface ViobeanSpeakingPartnerProps {
  onOpenAiCoach?: () => void;
}

export const ViobeanSpeakingPartner: React.FC<ViobeanSpeakingPartnerProps> = ({
  onOpenAiCoach
}) => {
  const { profile, theme } = useUser();
  const [activeMode, setActiveMode] = useState<"ROUNDS" | "FREESTYLE">("ROUNDS");
  const [activeRound, setActiveRound] = useState<1 | 2 | 3>(1);

  const isDark = theme === "dark";

  // Free-style talk chat state
  const [messages, setMessages] = useState<Array<{
    sender: "ai" | "user";
    text: string;
    correction?: string;
    cefr?: string;
  }>>([
    {
      sender: "ai",
      text: "Hallo! Ich bin dein KI-Prüfungspartner für das B1-Zertifikat. Welches Thema möchtest du heute üben? Oder wollen wir direkt mit Teil 1 (Kennenlernen) anfangen?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Play audio of German speech
  const speakGerman = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Submit free-style input to local Ollama or smart simulated tutor
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setInputText("");

    // Append user message
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsThinking(true);

    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "german-b1-tutor",
          prompt: `You are an official telc/Goethe B1 German oral examiner. The candidate said: "${userMsg}". 
Respond naturally in German (2-3 sentences), ask a follow-up B1 oral question, and briefly provide 1 grammar correction or vocabulary upgrade if needed. Keep response concise and encouraging. No em dashes.`,
          stream: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiResponse = data.response || "Sehr gut formuliert! Erzähl mir mehr darüber.";
        setMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
        speakGerman(aiResponse);
      } else {
        const fallbackResponse = "Das ist ein sehr guter B1-Satz! Könntest du das noch genauer begründen mit 'weil' oder 'obwohl'?";
        setMessages(prev => [...prev, { sender: "ai", text: fallbackResponse }]);
        speakGerman(fallbackResponse);
      }
    } catch {
      const fallbackResponse = "Das klingt schon sehr flüssig! Was sind deiner Meinung nach die größten Vorteile und Nachteile?";
      setMessages(prev => [...prev, { sender: "ai", text: fallbackResponse }]);
      speakGerman(fallbackResponse);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── HEADER & MODE TOGGLE ─── */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b transition-colors duration-200 ${
        isDark ? "border-slate-800" : "border-slate-200"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "bg-rose-950/60 text-rose-300 border border-rose-500/30" : "bg-rose-100 text-rose-700"
            }`}>
              Oral Exam Practice
            </span>
            <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Paarprüfung & AI Voice Partner
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Speaking Partner Sanctuary
          </h1>
        </div>

        {/* Toggle Mode */}
        <div className={`inline-flex p-1 rounded-2xl border self-start sm:self-auto transition-colors duration-200 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => setActiveMode("ROUNDS")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeMode === "ROUNDS"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Exam rounds
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("FREESTYLE")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeMode === "FREESTYLE"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Free-style talk
          </button>
        </div>
      </div>

      {/* ─── EXAM ROUNDS MODE ─── */}
      {activeMode === "ROUNDS" && (
        <div className="space-y-6">
          {/* Round Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { round: 1 as const, title: "Teil 1: Kennenlernen", time: "3 Min", pts: "15 Pkt" },
              { round: 2 as const, title: "Teil 2: Präsentation", time: "5 Min", pts: "30 Pkt" },
              { round: 3 as const, title: "Teil 3: Gemeinsam planen", time: "5 Min", pts: "30 Pkt" }
            ].map((r) => (
              <button
                key={r.round}
                type="button"
                onClick={() => setActiveRound(r.round)}
                className={`p-4 rounded-2xl border text-left transition shadow-xs ${
                  activeRound === r.round
                    ? isDark
                      ? "bg-rose-950/60 border-rose-500/80 ring-2 ring-rose-500/20 text-white"
                      : "bg-rose-50 border-rose-400 ring-2 ring-rose-400/20 text-slate-900"
                    : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    : "bg-white border-slate-200 text-slate-900 hover:border-slate-300"
                }`}
              >
                <div className={`flex items-center justify-between text-xs font-semibold mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  <span>{r.time}</span>
                  <span className="font-mono text-rose-400 font-bold">{r.pts}</span>
                </div>
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {r.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Round Workbench */}
          {activeRound === 1 && (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? "bg-rose-950/60 text-rose-300 border border-rose-500/30" : "bg-rose-100 text-rose-800"
                }`}>
                  Teil 1: Sich vorstellen
                </span>
                <h2 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  The 6-Sentence Self-Introduction Blueprint
                </h2>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Examiners evaluate your accent and word order in the first 2 minutes. Memorize these 6 structured sentences perfectly:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "1. Name", de: "Ich heiße [Ihr Name] und komme aus...", tip: "Clear pronunciation of umlauts." },
                  { label: "2. Wohnort", de: "Seit [zwei Jahren] wohne ich in Deutschland in...", tip: "Triggers Dativ: in der Stadt, auf dem Land." },
                  { label: "3. Familie", de: "Ich bin verheiratet / ledig und habe...", tip: "Accusative objects: einen Sohn, eine Tochter." },
                  { label: "4. Beruf", de: "Von Beruf bin ich Ingenieur / Softwareentwickler...", tip: "No 'ein' before profession in German." },
                  { label: "5. Sprachen", de: "Meine Muttersprache ist..., und ich lerne Deutsch...", tip: "Use connector 'weil' for reasons." },
                  { label: "6. Hobbys", de: "In meiner Freizeit spiele ich gern Fußball oder...", tip: "Verb in position 2 after 'In meiner Freizeit'." }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.label}</span>
                      <button
                        type="button"
                        onClick={() => speakGerman(item.de)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-400"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-rose-400 font-mono">
                      {item.de}
                    </div>
                    <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      💡 {item.tip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Sample Introduction Card */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-rose-50/30 border-rose-200"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      B1 Musterbeispiel (100% Score)
                    </span>
                    <h4 className="text-sm sm:text-base font-black">Vollständige Selbstvorstellung</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(SAMPLE_INTRO_TEXT)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gesamte Vorstellung anhören</span>
                  </button>
                </div>

                <div className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border font-sans ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-rose-100 text-slate-800"
                }`}>
                  &ldquo;{SAMPLE_INTRO_TEXT}&rdquo;
                </div>

                {/* Follow-up Examiner Q&A */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                    Typische Prüfer-Anschlussfragen (Examiner Follow-up):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-3 rounded-xl border space-y-1 ${
                      isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    }`}>
                      <div className="font-bold text-rose-300">Prüfer: &ldquo;Wie lange lernen Sie schon Deutsch?&rdquo;</div>
                      <div className="text-slate-300">&ldquo;Ich lerne seit etwa einem Jahr Deutsch, zuerst in einem Online-Kurs und jetzt im Integrationskurs.&rdquo;</div>
                    </div>
                    <div className={`p-3 rounded-xl border space-y-1 ${
                      isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    }`}>
                      <div className="font-bold text-rose-300">Prüfer: &ldquo;Was gefällt Ihnen an Ihrem Beruf am besten?&rdquo;</div>
                      <div className="text-slate-300">&ldquo;Am besten gefällt mir, dass ich jeden Tag kreative Lösungen für komplexe Probleme entwickeln kann.&rdquo;</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Teil 1 Examiner & Candidate Conversation Box */}
              <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-rose-50/30 border-rose-200"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-800/40">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Vollständiges Prüfungsgespräch
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Teil 1: Kennenlernen (Prüfer & Kandidat)</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black">Kompletter Dialog von Begrüßung bis Anschlussfragen</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(FULL_EXAM_CONVERSATION.filter(t => t.phase === "Teil 1: Vorstellung").map(t => `${t.speaker}: ${t.de}`).join(" "))}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gesamtes Kennenlernen anhören</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {FULL_EXAM_CONVERSATION.filter(t => t.phase === "Teil 1: Vorstellung").map((turn, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                        turn.speaker === "Prüfer"
                          ? isDark ? "bg-slate-900 border-amber-500/30" : "bg-amber-50/30 border-amber-200"
                          : isDark ? "bg-slate-900 border-rose-500/30" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded font-mono ${
                            turn.speaker === "Prüfer"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}>
                            {turn.speaker}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {turn.tag}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                          &ldquo;{turn.de}&rdquo;
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {turn.en}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakGerman(turn.de)}
                        className={`p-2 rounded-xl border text-rose-400 self-start shrink-0 ${
                          isDark ? "bg-slate-950 border-slate-700 hover:bg-slate-800" : "bg-slate-50 border-slate-200 hover:bg-rose-50"
                        }`}
                        title="Zeile anhören"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => speakGerman(SAMPLE_INTRO_TEXT)}
                  className={`px-4 py-2.5 font-bold text-xs rounded-xl transition flex items-center gap-2 ${
                    isDark 
                      ? "bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30" 
                      : "bg-rose-50 hover:bg-rose-100 text-rose-700"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Full Sample Introduction</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRound(2)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Proceed to Teil 2: Presentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeRound === 2 && (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? "bg-rose-950/60 text-rose-300 border border-rose-500/30" : "bg-rose-100 text-rose-800"
                }`}>
                  Teil 2: Ein Thema präsentieren
                </span>
                <h2 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  The 5-Point Presentation Structure
                </h2>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Present for ~3 minutes on everyday topics (e.g. Haustiere, Öffentliche Verkehrsmittel, Einkaufen im Internet).
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { step: "Einleitung", formula: "Das Thema meiner Präsentation ist... Ich habe dieses Thema gewählt, weil..." },
                  { step: "Eigene Erfahrung", formula: "In meinem persönlichen Leben habe ich die Erfahrung gemacht, dass..." },
                  { step: "Situation im Heimatland", formula: "In meinem Heimatland ist die Situation ganz anders als in Deutschland, denn..." },
                  { step: "Vor- und Nachteile", formula: "Einerseits bietet es große Vorteile, wie zum Beispiel... Andererseits gibt es auch Nachteile..." },
                  { step: "Eigene Meinung & Abschluss", formula: "Meiner Meinung nach... Das war meine Präsentation. Haben Sie noch Fragen?" }
                ].map((s, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-rose-50/40 border-rose-200"
                  }`}>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                        {i + 1}. {s.step}
                      </div>
                      <div className={`text-xs sm:text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                        &ldquo;{s.formula}&rdquo;
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakGerman(s.formula)}
                      className={`p-2 rounded-xl border text-rose-400 self-start sm:self-auto shrink-0 ${
                        isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800" : "bg-white border-rose-200 hover:bg-rose-50"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Full Sample Presentation Card */}
              <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-rose-50/30 border-rose-200"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-800/40">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Muster-Präsentation B1
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Thema: Brauchen Schulkinder Smartphones?</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black">Vollständiger 3-Minuten-Vortrag</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(SAMPLE_PRESENTATION_FULL)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gesamten Vortrag anhören</span>
                  </button>
                </div>

                {/* 5 Slide Sections */}
                <div className="space-y-3">
                  {SAMPLE_PRESENTATION_SLIDES.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                            Folie {idx + 1}: {slide.title}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                          &ldquo;{slide.text}&rdquo;
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakGerman(slide.text)}
                        className={`p-2 rounded-xl border text-rose-400 self-start shrink-0 ${
                          isDark ? "bg-slate-950 border-slate-700 hover:bg-slate-800" : "bg-slate-50 border-slate-200 hover:bg-rose-50"
                        }`}
                        title="Folie anhören"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Examiner Question & Partner Feedback */}
                <div className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Prüfer-Rückfrage & Antwort nach dem Vortrag:
                  </div>
                  <div className="text-xs space-y-1.5">
                    <p className="text-slate-300">
                      <strong>Prüfer:</strong> &ldquo;Ab welchem Alter halten Sie persönlich ein eigenes Smartphone für sinnvoll?&rdquo;
                    </p>
                    <p className="text-rose-300">
                      <strong>Kandidat:</strong> &ldquo;Ich bin der Meinung, dass Kinder ab etwa 12 Jahren ein eigenes Smartphone haben können, weil sie dann meistens selbstständig zur weiterführenden Schule fahren und erreichbar sein sollten.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveRound(3)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Proceed to Teil 3: Gemeinsam planen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRound === 3 && (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? "bg-rose-950/60 text-rose-300 border border-rose-500/30" : "bg-rose-100 text-rose-800"
                }`}>
                  Teil 3: Gemeinsam etwas planen
                </span>
                <h2 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Interactive Negotiation & Dialogue
                </h2>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  You and your partner must plan an event (e.g. Abschiedsfeier, Ausflug, Geschenk kaufen). Propose ideas, disagree politely, and reach an agreement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200" : "bg-emerald-50 border-emerald-200 text-emerald-950"
                }`}>
                  <div className="text-xs font-bold text-emerald-400 uppercase">1. Vorschlag machen</div>
                  <div className="text-xs font-semibold space-y-1">
                    <p>&ldquo;Wie wäre es, wenn wir...?&rdquo;</p>
                    <p>&ldquo;Ich schlage vor, dass wir...&rdquo;</p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? "bg-amber-950/40 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-950"
                }`}>
                  <div className="text-xs font-bold text-amber-400 uppercase">2. Widersprechen</div>
                  <div className="text-xs font-semibold space-y-1">
                    <p>&ldquo;Das ist eine gute Idee, aber...&rdquo;</p>
                    <p>&ldquo;Ich bin mir nicht sicher, ob...&rdquo;</p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-200" : "bg-indigo-50 border-indigo-200 text-indigo-950"
                }`}>
                  <div className="text-xs font-bold text-indigo-400 uppercase">3. Einigung finden</div>
                  <div className="text-xs font-semibold space-y-1">
                    <p>&ldquo;Gut, dann machen wir das so!&rdquo;</p>
                    <p>&ldquo;Wir treffen uns am Samstag um...&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Full Sample Dialogue Card */}
              <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-rose-50/30 border-rose-200"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-800/40">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Vollständiger Muster-Dialog
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Thema: Abschiedsfeier planen</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black">Komplettes Prüfungsgespräch (Kandidat A & B)</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakGerman(SAMPLE_PLANNING_FULL)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gesamtes Gespräch anhören</span>
                  </button>
                </div>

                {/* 6 Turns Dialogue */}
                <div className="space-y-3">
                  {SAMPLE_PLANNING_TURNS.map((turn, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                        turn.speaker === "Kandidat A"
                          ? isDark ? "bg-slate-900 border-indigo-500/30" : "bg-indigo-50/30 border-indigo-200"
                          : isDark ? "bg-slate-900 border-emerald-500/30" : "bg-emerald-50/30 border-emerald-200"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded font-mono ${
                            turn.speaker === "Kandidat A"
                              ? "bg-indigo-500/20 text-indigo-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}>
                            {turn.speaker}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {turn.tag}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                          &ldquo;{turn.text}&rdquo;
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakGerman(turn.text)}
                        className={`p-2 rounded-xl border text-rose-400 self-start shrink-0 ${
                          isDark ? "bg-slate-950 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-rose-50"
                        }`}
                        title="Diesen Satz anhören"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={`p-4 rounded-xl border text-xs space-y-1 ${
                  isDark ? "bg-slate-900/60 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                }`}>
                  <strong className="text-rose-400 block">💡 B1 Prüfungs-Geheimnis für Teil 3:</strong>
                  Es geht nicht darum, Recht zu haben! Prüfer wollen sehen, dass Sie aktiv zuhören, Kompromisse vorschlagen (*&ldquo;Was hältst du davon, wenn...?&rdquo;*) und Aufgaben gerecht aufteilen.
                </div>
              </div>
            </div>
          )}

          {/* ─── FULL EXAM CONVERSATION MASTER SAMPLE (ALWAYS VISIBLE AT BOTTOM) ─── */}
          <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    B1 Oral Exam Master Blueprint
                  </span>
                  <span className="text-xs text-amber-400 font-mono font-bold">15-Minuten Komplett-Ablauf</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black">
                  Vollständiges B1-Prüfungsgespräch (Full Exam Conversation Master Sample)
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  How the full 15-minute B1 Speaking Exam flows from the moment you enter the room: Teil 1 (Introduction & Questions), Teil 2 (Presentation & Partner Q&A), and Teil 3 (Joint Planning).
                </p>
              </div>

              <button
                type="button"
                onClick={() => speakGerman(FULL_EXAM_CONVERSATION_TEXT)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Gesamtes Gespräch anhören</span>
              </button>
            </div>

            {/* Conversation Timeline */}
            <div className="space-y-3.5">
              {FULL_EXAM_CONVERSATION.map((turn, tIdx) => {
                const isExaminer = turn.speaker === "Prüfer";
                const isCandidateA = turn.speaker === "Kandidat A";
                const isCandidateB = turn.speaker === "Kandidat B";

                return (
                  <div
                    key={tIdx}
                    className={`p-4 rounded-2xl border transition space-y-2 ${
                      isExaminer
                        ? isDark
                          ? "bg-slate-950/80 border-slate-800 text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                        : isCandidateA
                        ? isDark
                          ? "bg-purple-950/30 border-purple-500/30 text-purple-100"
                          : "bg-purple-50/50 border-purple-200 text-purple-950"
                        : isDark
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                        : "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono tracking-wider ${
                          isExaminer
                            ? "bg-slate-800 text-amber-300 border border-amber-500/30"
                            : isCandidateA
                            ? "bg-purple-600 text-white shadow-xs"
                            : "bg-emerald-600 text-white shadow-xs"
                        }`}>
                          {turn.speaker}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark ? "bg-slate-900 text-slate-400" : "bg-white text-slate-600 border border-slate-200"
                        }`}>
                          {turn.phase}
                        </span>

                        <span className="text-[11px] font-semibold text-rose-400">
                          {turn.tag}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakGerman(turn.de)}
                        className={`p-1.5 rounded-lg border text-rose-400 transition self-start sm:self-auto ${
                          isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-rose-50"
                        }`}
                        title="Diesen Satz anhören"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm font-bold leading-relaxed">
                      &ldquo;{turn.de}&rdquo;
                    </div>

                    <div className={`text-[11px] leading-normal ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {turn.en}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ─── FREE-STYLE TALK MODE (Ollama / Local AI) ─── */}
      {activeMode === "FREESTYLE" && (
        <div className={`rounded-3xl border shadow-sm overflow-hidden flex flex-col h-[580px] transition-colors duration-200 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          {/* Chat Header */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDark ? "border-slate-800" : "border-slate-100"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center ${
                isDark ? "bg-rose-950/60 border-rose-500/40 text-rose-300" : "bg-rose-100 border-rose-200 text-rose-700"
              }`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  KI Prüfungspartner (Ollama B1 Model)
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active & Ready to Talk
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMessages([{
                sender: "ai",
                text: "Lass uns ein neues Gespräch anfangen! Worüber möchtest du heute sprechen?"
              }])}
              className={`p-2 rounded-xl transition ${
                isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              }`}
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${
            isDark ? "bg-slate-950/60" : "bg-slate-50/50"
          }`}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-xl ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-purple-600 text-white" 
                    : isDark
                    ? "bg-rose-950/80 text-rose-300 border border-rose-500/30"
                    : "bg-rose-100 text-rose-700 border border-rose-200"
                }`}>
                  {msg.sender === "user" ? "Du" : "AI"}
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white font-medium rounded-tr-xs shadow-md shadow-purple-600/20"
                    : isDark
                    ? "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs shadow-md shadow-black/20"
                    : "bg-white border border-slate-200 text-slate-900 rounded-tl-xs shadow-xs"
                }`}>
                  <p>{msg.text}</p>

                  {msg.sender === "ai" && (
                    <button
                      type="button"
                      onClick={() => speakGerman(msg.text)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 pt-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio anhören</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 max-w-xl mr-auto">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                  isDark ? "bg-rose-950 text-rose-300" : "bg-rose-100 text-rose-700"
                }`}>
                  AI
                </div>
                <div className={`p-3 rounded-2xl text-xs flex items-center gap-2 border ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"
                }`}>
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Prüfer überlegt Antwort...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className={`p-3 sm:p-4 border-t flex items-center gap-2 ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Antworte auf Deutsch (z.B. 'Ich denke, dass es sehr wichtig ist...')"
              className={`flex-1 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:border-rose-400 transition ${
                isDark 
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500" 
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
              }`}
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isThinking}
              className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl disabled:opacity-40 transition shadow-sm"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
