"use client";

import React, { useState, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  BookOpen, 
  Target, 
  PenTool, 
  Headphones, 
  MessageSquare, 
  CheckCircle2, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb, 
  Filter, 
  Layers, 
  Eye, 
  EyeOff, 
  Award, 
  Clock, 
  Compass, 
  HelpCircle,
  FileText,
  Send,
  AlertCircle
} from "lucide-react";

export type ExamFilter = "ALL" | "TELC_B1" | "GOETHE_B1" | "DTZ";
export type SkillTab = "LESEN" | "SPRACHBAUSTEINE" | "SCHREIBEN" | "HOEREN" | "SPRECHEN";

export const PracticeWorkbench: React.FC = () => {
  const { profile, theme } = useUser();
  const [selectedExam, setSelectedExam] = useState<ExamFilter>("ALL");
  const [activeSkill, setActiveSkill] = useState<SkillTab>("LESEN");

  const isDark = theme === "dark";

  // ─────────────────────────────────────────────────────────────
  // 1. LESEN STATE
  // ─────────────────────────────────────────────────────────────
  const [lesenPart, setLesenPart] = useState<number>(1);
  const [lesenSelectedAnswers, setLesenSelectedAnswers] = useState<Record<number, string>>({});
  const [lesenChecked, setLesenChecked] = useState<boolean>(false);

  // ─────────────────────────────────────────────────────────────
  // 2. SPRACHBAUSTEINE STATE
  // ─────────────────────────────────────────────────────────────
  const [sbPart, setSbPart] = useState<number>(1);
  const [sbAnswers, setSbAnswers] = useState<Record<number, string>>({});
  const [sbChecked, setSbChecked] = useState<boolean>(false);
  const [activeSbSlot, setActiveSbSlot] = useState<number | null>(null);

  // Conjunctions Glue Drill State (from LearnOutLive book)
  const [glueDrillIdx, setGlueDrillIdx] = useState<number>(0);
  const [glueSelectedOpt, setGlueSelectedOpt] = useState<string | null>(null);
  const [glueScore, setGlueScore] = useState<number>(0);
  const [glueAnswered, setGlueAnswered] = useState<boolean>(false);

  // ─────────────────────────────────────────────────────────────
  // 3. SCHREIBEN STATE
  // ─────────────────────────────────────────────────────────────
  const [writingPromptIndex, setWritingPromptIndex] = useState<number>(0);
  const [writingMode, setWritingMode] = useState<"GUIDED" | "FREE_TYPING" | "MODEL">("GUIDED");
  const [typedLetter, setTypedLetter] = useState<string>("");
  const [guidedAnswers, setGuidedAnswers] = useState<Record<number, string>>({});
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  const [activeWritingSlot, setActiveWritingSlot] = useState<number | null>(0);
  const [aiEvaluation, setAiEvaluation] = useState<{
    score: number;
    wordCount: number;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  // ─────────────────────────────────────────────────────────────
  // 4. HOEREN STATE
  // ─────────────────────────────────────────────────────────────
  const [hoerenTrackIndex, setHoerenTrackIndex] = useState<number>(0);
  const [hoerenSpeed, setHoerenSpeed] = useState<number>(1.0);
  const [hoerenAnswers, setHoerenAnswers] = useState<Record<number, boolean>>({});
  const [hoerenChecked, setHoerenChecked] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // ─────────────────────────────────────────────────────────────
  // 5. SPRECHEN STATE
  // ─────────────────────────────────────────────────────────────
  const [sprechenPart, setSprechenPart] = useState<number>(1);
  const [activePartnerStep, setActivePartnerStep] = useState<number>(0);

  // Audio Player helper
  const handlePlayAudio = (text: string, speed = 1.0) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = speed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // DATA COLLECTIONS (Authentic B1 Material from telc, Goethe, DTZ)
  // ─────────────────────────────────────────────────────────────

  // Reading Passages
  const LESEN_PART1_TASK = {
    part: 1,
    examTag: "telc Deutsch B1 / Goethe B1",
    title: "Teil 1: Zuordnung / Überschriften (Matching Headlines)",
    instruction: "Lesen Sie die 5 Situationen (1-5) und die 8 Überschriften (A-H). Welche Überschrift passt zu welcher Situation?",
    situations: [
      { id: 1, text: "Monika möchte mit ihrem Fahrrad im Urlaub schöne Landschaften erkunden, möchte aber nicht die ganze Strecke mit dem Rad fahren.", match: "E" },
      { id: 2, text: "Jürgen sucht für das Wochenende einen Kurs, um den Umgang mit Tabellenkalkulation und Textverarbeitung am PC zu vertiefen.", match: "B" },
      { id: 3, text: "Familie Weber sucht ein günstiges Ferienhaus an der Nordsee, in dem auch Haustiere erlaubt sind.", match: "G" },
      { id: 4, text: "Stefan sucht eine Gruppe von Jugendlichen, die sich sonntags zum gemeinsamen Wandern im Mittelgebirge treffen.", match: "A" },
      { id: 5, text: "Fatima möchte ihr Deutsch verbessern und sucht eine Sprachpartnerin für regelmäßigen Austausch in einem Café.", match: "D" }
    ],
    headings: [
      { key: "A", title: "A: Jugend-Wanderclub: Sonntagstouren durch den Taunus für Einsteiger" },
      { key: "B", title: "B: Wochenend-Workshop: Microsoft Office und Excel im Beruf und Alltag" },
      { key: "C", title: "C: Exklusive Luxushotels im Schwarzwald mit Wellness-Oase" },
      { key: "D", title: "D: Tandem-Treff Berlin: Deutsch-Arabischer Sprachaustausch jeden Dienstag" },
      { key: "E", title: "E: Bahn & Bike: Mit dem Zug anreisen, Rad vor Ort mieten und Natur genießen" },
      { key: "F", title: "F: Schnupperkurs: Programmieren in Python für Schulkinder" },
      { key: "G", title: "G: Ferienwohnungen an der Nordseeküste: Hunde und Katzen herzlich willkommen" },
      { key: "H", title: "H: Autovermietung am Hauptbahnhof mit Sonderangeboten für Großfamilien" }
    ]
  };

  const LESEN_PART2_TASK = {
    part: 2,
    examTag: "telc B1 / DTZ / Goethe B1",
    title: "Teil 2: Pressebericht (Vier-Tage-Woche im Praxistest)",
    instruction: "Lesen Sie den Text und wählen Sie bei jeder Aufgabe die richtige Lösung (a, b oder c).",
    text: `Immer mehr Unternehmen in Deutschland testen neue Arbeitszeitmodelle, um im Wettbewerb um qualifizierte Fachkräfte attraktiv zu bleiben. Ein kürzlich abgeschlossenes Pilotprojekt mit 45 mittelständischen Unternehmen zeigt überraschend positive Ergebnisse: Bei vollem Lohnausgleich reduzierten die Mitarbeiter ihre wöchentliche Arbeitszeit auf vier Tage.

Die Auswertung der Universität Münster ergab, dass die Produktivität in 85 Prozent der teilnehmenden Firmen gleich geblieben oder sogar leicht gestiegen ist. Als Hauptgrund nannten die Geschäftsführer eine spürbare Steigerung der Konzentration und eine Verringerung von Fehlzeiten durch Krankheitstage um durchschnittlich 18 Prozent.

Allerdings warnen Wirtschaftsverbände vor einer voreiligen gesetzlichen Einführung. Besonders in Pflegeberufen, in der Gastronomie und im Handwerk sei eine Verkürzung der Arbeitszeit ohne zusätzliches Personal kaum umsetzbar. Viele Handwerksbetriebe klagen bereits heute über einen akuten Mangel an Auszubildenden und Gesellen.`,
    questions: [
      {
        id: 6,
        prompt: "6. Welches Ergebnis zeigte das Pilotprojekt zur Vier-Tage-Woche?",
        options: [
          { key: "a", text: "a) Die Gehälter der Mitarbeiter wurden um 20 Prozent gekürzt." },
          { key: "b", text: "b) Die Produktivität sank in den meisten teilnehmenden Betrieben." },
          { key: "c", text: "c) Die Mitarbeiter waren seltener wegen Krankheit abwesend." }
        ],
        correctKey: "c",
        explanation: "Im Text heißt es: '...und eine Verringerung von Fehlzeiten durch Krankheitstage um durchschnittlich 18 Prozent'."
      },
      {
        id: 7,
        prompt: "7. In welchen Branchen wird das Vier-Tage-Modell kritisch gesehen?",
        options: [
          { key: "a", text: "a) In der IT-Branche und bei Banken." },
          { key: "b", text: "b) In Handwerksbetrieben und Pflegeheimen." },
          { key: "c", text: "c) Ausschließlich an Universitäten und Schulen." }
        ],
        correctKey: "b",
        explanation: "Im Text steht: 'Besonders in Pflegeberufen, in der Gastronomie und im Handwerk sei eine Verkürzung... kaum umsetzbar'."
      }
    ]
  };

  // Authentic Housing Ads & Abbreviations from Schritte Plus Neu 3 (A2.1 / B1)
  const LESEN_PART3_TASK = {
    part: 3,
    examTag: "DTZ / telc Deutsch B1 / Goethe B1",
    title: "Teil 3: Wohnungsanzeigen & Abkürzungen (Housing Ads Decoder)",
    instruction: "Lesen Sie die 3 Wohnungssuchen (1-3) und die 4 Wohnungsanzeigen (A-D). Welche Anzeige passt zu welcher Person? (Klicken Sie auf Abkürzungen für die Bedeutung)",
    abbreviations: [
      { abbr: "KM", full: "Kaltmiete", meaning: "Rent without heating & utility costs (base rent)" },
      { abbr: "NK", full: "Nebenkosten", meaning: "Utilities: water, garbage, maintenance, property taxes" },
      { abbr: "WM", full: "Warmmiete", meaning: "Total rent including heating & operating costs (KM + NK)" },
      { abbr: "EBK", full: "Einbauküche", meaning: "Fitted kitchen already installed in the apartment" },
      { abbr: "Wfl.", full: "Wohnfläche", meaning: "Total living space in square meters (m²)" },
      { abbr: "ZKB", full: "Zimmer, Küche, Bad", meaning: "Standard layout: rooms, kitchen, and bathroom" },
      { abbr: "Kaution: 3 MM", full: "3 Monatskaltmieten", meaning: "Security deposit equal to 3 months of base rent" },
      { abbr: "TG-Stellplatz", full: "Tiefgaragenstellplatz", meaning: "Underground parking space" },
      { abbr: "DG", full: "Dachgeschoss", meaning: "Top floor / attic apartment" },
      { abbr: "EG", full: "Erdgeschoss", meaning: "Ground floor apartment" }
    ],
    situations: [
      {
        id: 11,
        seeker: "Jonas (Student)",
        text: "Sucht ab sofort eine 1-Zimmer-Wohnung bis max. 480 € Warmmiete mit Einbauküche in Uni-Nähe. Hat kein Auto.",
        match: "B"
      },
      {
        id: 12,
        seeker: "Familie Meier (2 Kinder, 1 Hund)",
        text: "Sucht eine geräumige Familienwohnung (mindestens 4 Zimmer, ab 95 m²) mit Gartenanteil oder Terrasse. Haustiere müssen erlaubt sein.",
        match: "D"
      },
      {
        id: 13,
        seeker: "Berufstätiges Paar (Pendler)",
        text: "Sucht eine moderne 2-Zimmer-Wohnung im Dachgeschoss mit Tiefgaragenstellplatz und Balkon bis 850 € Kaltmiete.",
        match: "A"
      }
    ],
    ads: [
      {
        key: "A",
        title: "Anzeige A: Traumhafte 2-ZKB im DG mit Südbalkon",
        details: "Lage: Potsdam-Zentrum. Wfl. 68 m², 2 ZKB, sonniges DG, moderne EBK, Südbalkon, TG-Stellplatz inklusive. KM 820 € + NK 160 €, Kaution: 3 MM. Frei ab 01.12. Keine Haustiere.",
        bestFor: "Ideal für Paare ohne Haustiere mit Auto."
      },
      {
        key: "B",
        title: "Anzeige B: Helles 1-Zimmer-Appartement direkt am Campus",
        details: "Lage: Uni-Viertel. Wfl. 28 m², 1 ZKB, Pantry-EBK, Duschbad, Fahrradkeller, Tram-Haltestelle vor der Tür. WM 440 € (inkl. Heizung & NK), Kaution: 2 MM. Sofort beziehbar. Nur an Studierende.",
        bestFor: "Perfekt für Studenten ohne Auto."
      },
      {
        key: "C",
        title: "Anzeige C: Ruhige 3-Zimmer-Wohnung im 2. OG",
        details: "Lage: Stadtrand. Wfl. 74 m², 3 ZKB, renoviertes Wannenbad, ohne EBK (Mieter bringt eigene Küche mit). KM 710 € + NK 190 €. Kaution: 3 MM. Bezugsfrei ab sofort. Haustiere nach Vereinbarung.",
        bestFor: "Nicht passend für Jonas (zu teuer) oder Familie Meier (zu klein, keine 4 Zimmer)."
      },
      {
        key: "D",
        title: "Anzeige D: Großzügige 4,5-Zimmer-Erdgeschosswohnung mit Garten",
        details: "Lage: Grüne Wohnsiedlung nahe Spielplatz. Wfl. 108 m², 4,5 ZKB, Gästebad, EBK, 80 m² eigener Gartenanteil. KM 1.150 € + NK 280 €, Kaution: 3 MM. Haustiere (Hund/Katze) herzlich willkommen!",
        bestFor: "Perfekt für Familie Meier mit 2 Kindern und Hund."
      }
    ]
  };

  // Sprachbausteine Teil 1 & 2
  const SPRACHBAUSTEINE_TEIL1 = {
    title: "Sprachbausteine Teil 1: Brief an Karin (Multiple Choice)",
    intro: "Lesen Sie den Brief und schließen Sie die Lücken. Welche Lösung (a, b oder c) ist richtig?",
    passage: [
      { text: "Liebe Karin,\n\nnach meinem Praktikum in Frankreich bin ich jetzt wieder zu Hause. Wie du ja weißt, wollte ich eigentlich nach Paris, " },
      { slot: 21, options: ["aber", "denn", "sondern"], correct: "aber" },
      { text: " das hat dann leider nicht geklappt. Doch dann habe ich eine Stelle als Praktikant bei " },
      { slot: 22, options: ["eine", "einen", "einer"], correct: "einer" },
      { text: " Firma in Straßburg gefunden.\n\nDort " },
      { slot: 23, options: ["bin", "habe", "wurde"], correct: "bin" },
      { text: " ich drei Monate geblieben. Die Arbeit war sehr " },
      { slot: 24, options: ["anstrengend", "anstrengende", "anstrengendes"], correct: "anstrengend" },
      { text: ", " },
      { slot: 25, options: ["trotzdem", "deshalb", "weshalb"], correct: "trotzdem" },
      { text: " hat es mir viel Spaß gemacht. Ich habe viele nette Kollegen kennengelernt, mit " },
      { slot: 26, options: ["denen", "dem", "die"], correct: "denen" },
      { text: " ich am Wochenende Ausflüge gemacht habe.\n\nWann hast du Zeit, dass wir " },
      { slot: 27, options: ["uns", "dir", "Ihnen"], correct: "uns" },
      { text: " wiedersehen?\n\nViele Grüße,\nMichael" }
    ]
  };

  const SPRACHBAUSTEINE_TEIL2 = {
    title: "Sprachbausteine Teil 2: Anfrage an Hotel-Pension Janosch",
    intro: "Lesen Sie den Text und wählen Sie für jede Lücke das passende Wort aus dem Wortschatz-Kasten (a-j). Jedes Wort passt nur einmal.",
    wordBank: [
      "für", "gern", "besonders", "da", "wenn", "ob", "deshalb", "trotz", "über", "uns"
    ],
    distractors: ["weil", "nach", "ohne"],
    passage: [
      { text: "Sehr geehrter Herr Janosch,\n\nich habe Ihre Anzeige in der Zeitung gelesen und interessiere mich sehr " },
      { slot: 31, correct: "für" },
      { text: " Ihr Angebot. Ich möchte mit meiner Familie im August Urlaub in Österreich machen und hätte " },
      { slot: 32, correct: "deshalb" },
      { text: " noch nähere Informationen.\n\nMeine Frau und mich interessiert ganz " },
      { slot: 33, correct: "besonders" },
      { text: " das Freizeitprogramm für Kinder, " },
      { slot: 34, correct: "da" },
      { text: " wir zwei Söhne im Alter von 4 und 8 Jahren haben. Könnten Sie mir bitte mitteilen, " },
      { slot: 35, correct: "ob" },
      { text: " in der Zeit vom 10. bis 24. August noch ein Familienappartement frei ist?\n\nWir würden " },
      { slot: 36, correct: "uns" },
      { text: " über eine baldige Antwort sehr freuen.\n\nMit freundlichen Grüßen,\nStefan Richter" }
    ]
  };

  // 13 Authentic Drills from LearnOutLive "German Conjunctions: The Glue That Holds The Language Together"
  const GLUE_CONJUNCTIONS_DRILLS = [
    {
      id: 1,
      tier: "Tier 1: Position 0 (ADUSO)",
      sentence: "Ich bleibe heute zu Hause, ___ ich bin sehr erkältet.",
      options: ["denn", "weil", "deshalb", "obwohl"],
      correct: "denn",
      rule: "Position 0: 'denn' does not move the verb. The conjugated verb 'bin' stays in normal Position 2 ('ich bin')."
    },
    {
      id: 2,
      tier: "Tier 2: Subordinating (Verb Kicker)",
      sentence: "Ich bleibe heute zu Hause, ___ ich sehr erkältet bin.",
      options: ["weil", "denn", "deshalb", "aber"],
      correct: "weil",
      rule: "Verb-Kicker: 'weil' introduces a subclause and kicks the conjugated verb 'bin' to the very end of the sentence."
    },
    {
      id: 3,
      tier: "Tier 3: Conjunctive Adverb (Inversion)",
      sentence: "Ich bin sehr erkältet, ___ bleibe ich heute zu Hause.",
      options: ["deshalb", "denn", "weil", "obwohl"],
      correct: "deshalb",
      rule: "Inversion: 'deshalb' is a connector adverb taking Position 1 of clause 2, immediately followed by the verb 'bleibe' in Position 2 before subject 'ich'."
    },
    {
      id: 4,
      tier: "Tier 3: Conjunctive Adverb (Inversion)",
      sentence: "Er hat fleißig gelernt, ___ hat er die B1-Prüfung leider nicht bestanden.",
      options: ["trotzdem", "obwohl", "aber", "weil"],
      correct: "trotzdem",
      rule: "Inversion: 'trotzdem' (nevertheless) sits in Position 1, forcing verb 'hat' directly into Position 2 before subject 'er'."
    },
    {
      id: 5,
      tier: "Tier 2: Subordinating (Verb Kicker)",
      sentence: "Er hat die B1-Prüfung nicht bestanden, ___ er fleißig gelernt hat.",
      options: ["obwohl", "trotzdem", "denn", "deshalb"],
      correct: "obwohl",
      rule: "Verb-Kicker: 'obwohl' (although) is subordinating, kicking the conjugated auxiliary 'hat' to the absolute end."
    },
    {
      id: 6,
      tier: "Tier 1: Position 0 (ADUSO)",
      sentence: "Wir wollten im Park spazieren gehen, ___ es fing plötzlich an heftig zu regnen.",
      options: ["aber", "obwohl", "trotzdem", "weil"],
      correct: "aber",
      rule: "Position 0: 'aber' (ADUSO) introduces the contrast without occupying a numbered slot; 'es' is Pos 1, 'fing' is Pos 2."
    },
    {
      id: 7,
      tier: "Tier 1: Position 0 (ADUSO)",
      sentence: "Nicht Maria hat angerufen, ___ ihr Bruder war am Apparat.",
      options: ["sondern", "aber", "denn", "deshalb"],
      correct: "sondern",
      rule: "Position 0: 'sondern' replaces or corrects a previous negative ('Nicht Maria..., sondern...')."
    },
    {
      id: 8,
      tier: "Tier 3: Conjunctive Adverb (Inversion)",
      sentence: "Beeil dich bitte, ___ verpassen wir die S-Bahn zum Flughafen!",
      options: ["sonst", "wenn", "denn", "damit"],
      correct: "sonst",
      rule: "Inversion: 'sonst' (otherwise) occupies Position 1 of the consequence clause, immediately followed by verb 'verpassen'."
    },
    {
      id: 9,
      tier: "Tier 2: Subordinating (Verb Kicker)",
      sentence: "Ich weiß noch nicht genau, ___ ich im Sommer nach Spanien fliege.",
      options: ["ob", "wenn", "dass", "denn"],
      correct: "ob",
      rule: "Verb-Kicker: 'ob' (whether / if) introduces an indirect yes/no question and kicks 'fliege' to the end."
    },
    {
      id: 10,
      tier: "Tier 2: Subordinating (Verb Kicker)",
      sentence: "Frau Müller rief an, ___ sie den Termin beim Arzt verschieben wollte.",
      options: ["da", "denn", "deshalb", "trotzdem"],
      correct: "da",
      rule: "Verb-Kicker: 'da' (since / because) introduces a known cause and kicks the modal verb 'wollte' to the end."
    },
    {
      id: 11,
      tier: "Tier 2: Subordinating (Verb Kicker)",
      sentence: "___ ich gestern Abend nach Hause kam, brannte noch Licht in der Küche.",
      options: ["Als", "Wenn", "Wann", "Weil"],
      correct: "Als",
      rule: "Verb-Kicker: 'Als' is used for a single, unique event in the past (yesterday evening) and sends 'kam' to the comma."
    },
    {
      id: 12,
      tier: "Tier 1: Multi-Part Conjunction",
      sentence: "Sie spricht ___ fließend Deutsch, sondern sie lernt auch schon Spanisch.",
      options: ["nicht nur", "entweder", "weder", "sowohl"],
      correct: "nicht nur",
      rule: "Multi-Part: 'nicht nur ... sondern auch' (not only ... but also) expresses two complementary positive facts."
    },
    {
      id: 13,
      tier: "Tier 1: Multi-Part Conjunction",
      sentence: "Er trinkt morgens ___ Kaffee noch schwarzen Tee, sondern nur heißes Zitronenwasser.",
      options: ["weder", "entweder", "nicht nur", "sowohl"],
      correct: "weder",
      rule: "Multi-Part: 'weder ... noch' (neither ... nor) expresses double negation."
    }
  ];

  // Writing Prompts from Brief B1.pdf
  const WRITING_PROMPTS = [
    {
      id: "krankmeldung-kurs",
      title: "Entschuldigung für Abwesenheit (Deutschkurs wegen Krankheit)",
      targetExam: "DTZ / telc B1 / Goethe B1",
      scenario: "Sie können in den nächsten drei Tagen nicht am Deutschkurs teilnehmen, weil Sie plötzlich krank geworden sind. Schreiben Sie eine E-Mail an Ihre Kursleiterin, Frau Müller.",
      leitpunkte: [
        "Grund für Ihr Fehlen (Krankheit, Arzttermin)",
        "Dauer der Abwesenheit (3 Tage / bis Freitag)",
        "Hausaufgaben und Unterrichtsmaterialien anfordern",
        "Wann Sie wieder zum Unterricht kommen"
      ],
      guidedText: [
        { text: "Sehr geehrte Frau Müller,\n\nich schreibe Ihnen diese E-Mail, " },
        { slot: 1, correct: "weil" },
        { text: " ich in den nächsten drei Tagen leider nicht am Kurs teilnehmen kann.\n\nGestern bin ich plötzlich krank geworden und habe hohes Fieber. Der Arzt hat mich bis Freitag " },
        { slot: 2, correct: "krankgeschrieben" },
        { text: ". Das ärztliche Attest habe ich im Anhang beigefügt.\n\nKönnten Sie mir bitte die aktuellen " },
        { slot: 3, correct: "Hausaufgaben" },
        { text: " per E-Mail schicken, damit ich den verpassten Stoff zu Hause nachholen kann?\n\nAm kommenden Montag " },
        { slot: 4, correct: "werde" },
        { text: " ich voraussichtlich wieder gesund sein und zum Unterricht kommen.\n\nVielen Dank im Voraus für Ihr " },
        { slot: 5, correct: "Verständnis" },
        { text: ".\n\nMit freundlichen Grüßen,\n[Ihr Name]" }
      ],
      blankAnswers: ["weil", "krankgeschrieben", "Hausaufgaben", "werde", "Verständnis"],
      distractors: ["obwohl", "kann", "deshalb"],
      modelAnswer: `Sehr geehrte Frau Müller,

ich schreibe Ihnen diese E-Mail, weil ich in den nächsten drei Tagen leider nicht am Deutschkurs teilnehmen kann.

Gestern Abend bin ich plötzlich krank geworden und habe hohes Fieber bekommen. Der Arzt hat mich bis Freitag krankgeschrieben. Das ärztliche Attest habe ich dieser E-Mail im Anhang beigefügt.

Könnten Sie mir bitte mitteilen, welche Hausaufgaben wir aufhaben? Es wäre sehr nett, wenn Sie mir die Arbeitsblätter per E-Mail zusenden könnten, damit ich den verpassten Stoff zu Hause nachholen kann.

Am kommenden Montag werde ich voraussichtlich wieder gesund sein und am Unterricht teilnehmen.

Vielen Dank im Voraus für Ihr Verständnis und Ihre Unterstützung.

Mit freundlichen Grüßen
[Ihr Name]`
    },
    {
      id: "heizungsausfall-hausverwaltung",
      title: "Beschwerdebrief an die Hausverwaltung (Heizungsausfall im Winter)",
      targetExam: "DTZ / telc B1 / Goethe B1",
      scenario: "In Ihrer Mietwohnung funktioniert seit zwei Tagen mitten im Winter die Heizung nicht mehr. Trotz telefonischer Meldung hat sich niemand gemeldet. Schreiben Sie eine formelle Beschwerde an die Hausverwaltung.",
      leitpunkte: [
        "Grund des Schreibens (Heizung defekt)",
        "Wie lange das Problem schon besteht (2 Tage) und welche Temperaturen in der Wohnung herrschen",
        "Hinweis auf das bisher erfolglose Telefonat",
        "Fristsetzung zur Reparatur und Ankündigung von Mietminderung"
      ],
      guidedText: [
        { text: "Sehr geehrte Damen und Herren,\n\nich wende mich an Sie, " },
        { slot: 1, correct: "da" },
        { text: " die Heizung in meiner Wohnung seit zwei Tagen komplett ausgefallen ist.\n\nTrotz winterlicher Außentemperaturen beträgt die Temperatur in den Wohnräumen nur noch 14 Grad. Dies ist besonders gesundheitsschädlich, " },
        { slot: 2, correct: "weil" },
        { text: " ich mit meiner kleinen Tochter zusammenlebe.\n\nObwohl ich den Schaden bereits vorgestern telefonisch " },
        { slot: 3, correct: "gemeldet" },
        { text: " habe, ist bisher kein Handwerker erschienen.\n\nIch fordere Sie hiermit höflich auf, die Heizung bis morgen Nachmittag zu " },
        { slot: 4, correct: "reparieren" },
        { text: ".\n\nSollte das Problem nicht fristgerecht behoben werden, behalte ich mir eine " },
        { slot: 5, correct: "Mietminderung" },
        { text: " vor.\n\nMit freundlichen Grüßen,\n[Ihr Name]" }
      ],
      blankAnswers: ["da", "weil", "gemeldet", "reparieren", "Mietminderung"],
      distractors: ["obwohl", "trotzdem", "bezahlen"],
      modelAnswer: `Sehr geehrte Damen und Herren,

ich wende mich an Sie, da in meiner Wohnung seit zwei Tagen die Zentralheizung komplett ausgefallen ist.

In der gesamten Wohnung ist es eiskalt und das Thermometer zeigt nur noch 14 Grad an. Dies ist ein unhaltbarer Zustand, besonders weil ich mit einem Kleinkind zusammenlebe.

Obwohl ich diesen Schaden bereits am Montag telefonisch in Ihrem Büro gemeldet habe, ist bisher leider kein Techniker vorbeigekommen.

Ich bitte Sie daher dringend, die Heizungsanlage bis spätestens morgen, 18:00 Uhr, fachgerecht reparieren zu lassen. Sollte die Reparatur nicht fristgerecht erfolgen, sehe ich mich gezwungen, die Miete entsprechend zu mindern.

Ich hoffe auf eine schnelle Erledigung und bitte um eine kurze Rückmeldung.

Mit freundlichen Grüßen
[Ihr Name]`
    },
    {
      id: "wohnungsbewerbung-besichtigung",
      title: "Wohnungsbewerbung & Besichtigungsanfrage (Schritte Plus Neu 3)",
      targetExam: "DTZ / telc B1 / Goethe B1",
      scenario: "Sie haben eine Wohnungsanzeige für eine 3-Zimmer-Wohnung in Potsdam gelesen. Schreiben Sie eine formelle Bewerbung an den Vermieter, Herrn Schneider.",
      leitpunkte: [
        "Grund des Schreibens und Bezug auf die Wohnungsanzeige (Wfl., Lage)",
        "Angaben zu Ihrer Person, Beruf und sicherem Einkommen",
        "Fragen zu Nebenkosten (NK) und Kaution (3 MM)",
        "Bitte um einen zeitnahen Besichtigungstermin"
      ],
      guidedText: [
        { text: "Sehr geehrter Herr Schneider,\n\nmit großem Interesse habe ich Ihre Anzeige für die 3-Zimmer-Wohnung in Potsdam gelesen und " },
        { slot: 1, correct: "bewerbe" },
        { text: " mich hiermit um diese schöne Wohnung.\n\nIch bin als IT-Fachkraft fest angestellt und verfüge über ein geregeltes " },
        { slot: 2, correct: "Einkommen" },
        { text: ". Ich lebe in einer festen Partnerschaft, wir haben keine Haustiere und sind " },
        { slot: 3, correct: "Nichtraucher" },
        { text: ".\n\nIn der Anzeige erwähnen Sie eine Kaltmiete von 780 Euro. Könnten Sie mir bitte mitteilen, welche " },
        { slot: 4, correct: "Nebenkosten" },
        { text: " monatlich noch hinzukommen?\n\nDa die Lage für meinen Arbeitsweg ideal ist, würde ich mich über einen " },
        { slot: 5, correct: "Besichtigungstermin" },
        { text: " sehr freuen.\n\nMit freundlichen Grüßen,\n[Ihr Name]" }
      ],
      blankAnswers: ["bewerbe", "Einkommen", "Nichtraucher", "Nebenkosten", "Besichtigungstermin"],
      distractors: ["Kündigung", "obwohl", "Heizung"],
      modelAnswer: `Sehr geehrter Herr Schneider,

mit großem Interesse habe ich Ihre Wohnungsanzeige für die 3-Zimmer-Wohnung in Potsdam gelesen und bewerbe mich hiermit um diese Wohnung.

Zu meiner Person: Ich bin 29 Jahre alt und arbeite seit zwei Jahren als festangestellter Softwareentwickler in Potsdam. Mein Einkommen ist sicher und ungekündigt. Ich lebe zusammen mit meiner Partnerin, wir haben keine Haustiere und sind beide Nichtraucher.

In Ihrer Anzeige wird die Kaltmiete mit 780 Euro angegeben. Könnten Sie mir freundlicherweise mitteilen, wie hoch die monatlichen Nebenkosten (Heizung, Wasser, Müll) durchschnittlich ausfallen und wie hoch die Kaution (3 MM) ist?

Da die Wohnung ideal zu unseren Anforderungen passt, würden wir uns über die Möglichkeit eines persönlichen Besichtigungstermins sehr freuen. Gerne bringen wir alle erforderlichen Unterlagen (Gehaltsnachweise, Schufa-Auskunft) mit.

Vielen Dank im Voraus für Ihre Mühe.

Mit freundlichen Grüßen
[Ihr Name]`
    }
  ];

  const currentWritingPrompt = WRITING_PROMPTS[writingPromptIndex];

  // Jumbled word bank for current writing prompt with distractors
  const currentJumbledWritingWords = useMemo(() => {
    const rawList = [
      ...currentWritingPrompt.blankAnswers,
      ...currentWritingPrompt.distractors
    ];
    let seed = currentWritingPrompt.id.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 55);
    const shuffled = [...rawList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentWritingPrompt]);

  // Automated AI Evaluation for Free Typing
  const handleEvaluateLetter = () => {
    const words = typedLetter.trim().split(/\s+/).filter(Boolean);
    const count = words.length;

    const lower = typedLetter.toLowerCase();
    const hasGreeting = lower.includes("sehr geehrte") || lower.includes("liebe") || lower.includes("lieber");
    const hasClosing = lower.includes("mit freundlichen grüßen") || lower.includes("viele grüße") || lower.includes("herzliche grüße");
    const hasWeil = lower.includes("weil") || lower.includes("da");
    const hasPolite = lower.includes("könnten") || lower.includes("würden") || lower.includes("wäre");

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (count >= 70 && count <= 120) {
      strengths.push("Ideale Wortanzahl (~80 Wörter optimal für B1 Prüfung).");
    } else if (count < 60) {
      improvements.push("Text zu kurz: B1 erfordert mindestens 70 bis 80 Wörter.");
    }

    if (hasGreeting) {
      strengths.push("Korrekte, formgerechte Anrede verwendet.");
    } else {
      improvements.push("Anrede fehlt oder unvollständig (z.B. 'Sehr geehrte Frau Müller,').");
    }

    if (hasClosing) {
      strengths.push("Passende Grußformel und Unterschrift vorhanden.");
    } else {
      improvements.push("Grußformel fehlt (z.B. 'Mit freundlichen Grüßen').");
    }

    if (hasWeil) {
      strengths.push("B1-Konnektoren (weil/da) mit Verbletzstellung korrekt angewendet.");
    } else {
      improvements.push("B1-Konnektoren fehlen: Nutzen Sie 'weil' oder 'dass', um B1-Niveau nachzuweisen.");
    }

    if (hasPolite) {
      strengths.push("Höflicher Konjunktiv II ('Könnten Sie bitte...') stärkt die Kommunikative Gestaltung.");
    } else {
      improvements.push("Fügen Sie eine höfliche Bitte im Konjunktiv II ein ('Könnten Sie mir bitte...').");
    }

    let calculatedScore = 60;
    if (count >= 65) calculatedScore += 10;
    if (hasGreeting) calculatedScore += 10;
    if (hasClosing) calculatedScore += 10;
    if (hasWeil) calculatedScore += 5;
    if (hasPolite) calculatedScore += 5;

    setAiEvaluation({
      score: Math.min(100, calculatedScore),
      wordCount: count,
      strengths,
      improvements
    });

    if (calculatedScore >= 80) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER WORKBENCH
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* ─── Top Header & Exam Filter ─── */}
      <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm transition-colors duration-200 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
              }`}>
                Comprehensive Practice Hub
              </span>
              <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Real Exam Drills from telc, Goethe & DTZ
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Official B1 Practice Workbench
            </h1>
          </div>

          {/* Exam Filter Buttons */}
          <div className={`inline-flex p-1 rounded-2xl border flex-wrap transition-colors duration-200 ${
            isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
          }`}>
            {[
              { id: "ALL" as const, label: "All Exams" },
              { id: "TELC_B1" as const, label: "telc B1" },
              { id: "GOETHE_B1" as const, label: "Goethe B1" },
              { id: "DTZ" as const, label: "DTZ (Zuwanderer)" }
            ].map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedExam(e.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedExam === e.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Subtest Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-5 border-t mt-4 border-slate-800/40">
          {[
            { id: "LESEN" as const, label: "Lesen", icon: BookOpen, desc: "Reading & Match" },
            { id: "SPRACHBAUSTEINE" as const, label: "Sprachbausteine", icon: Layers, desc: "Cloze & Grammar" },
            { id: "SCHREIBEN" as const, label: "Schreiben", icon: PenTool, desc: "Email & Letter Studio" },
            { id: "HOEREN" as const, label: "Hören", icon: Headphones, desc: "Native Audio Drills" },
            { id: "SPRECHEN" as const, label: "Sprechen", icon: MessageSquare, desc: "Oral Exam Blueprint" }
          ].map((skill) => {
            const Icon = skill.icon;
            const isActive = activeSkill === skill.id;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setActiveSkill(skill.id)}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-1 shadow-xs active:scale-95 ${
                  isActive
                    ? isDark
                      ? "bg-purple-950/80 border-purple-500/60 text-white shadow-md shadow-purple-950/50"
                      : "bg-purple-50 border-purple-300 text-purple-950"
                    : isDark
                    ? "bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
                  {isActive && <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />}
                </div>
                <div className="font-extrabold text-xs sm:text-sm">{skill.label}</div>
                <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{skill.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. SKILL: LESEN (Reading Practice)
      ───────────────────────────────────────────────────────────── */}
      {activeSkill === "LESEN" && (
        <div className="space-y-6">
          {/* Part Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { p: 1, label: "Teil 1 (Überschriften)" },
              { p: 2, label: "Teil 2 (Pressebericht)" },
              { p: 3, label: "Teil 3 (Wohnungsanzeigen & Abkürzungen)" }
            ].map(({ p, label }) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setLesenPart(p);
                  setLesenChecked(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  lesenPart === p
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30"
                    : isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Teil 1: Zuordnung / Matching */}
          {lesenPart === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Situations */}
              <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">5 Readers</span>
                    <h3 className="text-base font-bold">Situations to Match</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLesenChecked(true)}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
                  >
                    Check Matches
                  </button>
                </div>

                <div className="space-y-3">
                  {LESEN_PART1_TASK.situations.map((sit) => {
                    const currentSelected = lesenSelectedAnswers[sit.id];
                    const isCorrect = currentSelected === sit.match;
                    return (
                      <div
                        key={sit.id}
                        className={`p-3.5 rounded-2xl border space-y-2 transition ${
                          lesenChecked
                            ? isCorrect
                              ? "bg-emerald-950/40 border-emerald-500/50"
                              : "bg-rose-950/40 border-rose-500/50"
                            : isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">
                            {sit.id}
                          </span>
                          <select
                            value={currentSelected || ""}
                            onChange={(e) => setLesenSelectedAnswers(prev => ({ ...prev, [sit.id]: e.target.value }))}
                            className={`px-3 py-1 rounded-xl text-xs font-bold border focus:outline-none transition ${
                              isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                            }`}
                          >
                            <option value="">Select Heading...</option>
                            {LESEN_PART1_TASK.headings.map(h => (
                              <option key={h.key} value={h.key}>Überschrift {h.key}</option>
                            ))}
                          </select>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {sit.text}
                        </p>
                        {lesenChecked && (
                          <div className={`text-[11px] font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                            {isCorrect ? "✓ Richtig zugeordnet!" : `✕ Falsch. Richtig ist Überschrift ${sit.match}.`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Available Headings */}
              <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-3 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="pb-2 border-b border-slate-800/40">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Catalog of News & Offers</span>
                  <h3 className="text-base font-bold">8 Headings (Überschriften A - H)</h3>
                </div>

                <div className="space-y-2">
                  {LESEN_PART1_TASK.headings.map((h) => (
                    <div
                      key={h.key}
                      className={`p-3 rounded-2xl border text-xs leading-relaxed transition ${
                        isDark ? "bg-slate-950/40 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <strong className="text-purple-400 font-black">{h.key}:</strong> {h.title.replace(`${h.key}: `, "")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Teil 2: Pressebericht */}
          {lesenPart === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Text */}
              <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-3 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                  <h3 className="text-base font-bold">Original Lesetext (German)</h3>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(LESEN_PART2_TASK.text)}
                    className="p-1.5 rounded-lg border text-purple-400 hover:text-purple-300 flex items-center gap-1 text-xs font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Text anhören</span>
                  </button>
                </div>
                <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}>
                  {LESEN_PART2_TASK.text}
                </div>
              </div>

              {/* Right: Multiple Choice Questions */}
              <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                  <h3 className="text-base font-bold">Exam Comprehension Questions (2)</h3>
                  <button
                    type="button"
                    onClick={() => setLesenChecked(true)}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition"
                  >
                    Check Answers
                  </button>
                </div>

                <div className="space-y-4">
                  {LESEN_PART2_TASK.questions.map((q) => {
                    const selected = lesenSelectedAnswers[q.id];
                    const isCorrect = selected === q.correctKey;
                    return (
                      <div key={q.id} className="space-y-2 p-3.5 rounded-2xl border border-slate-800/40">
                        <div className="text-xs sm:text-sm font-bold">{q.prompt}</div>
                        <div className="space-y-1.5">
                          {q.options.map((opt) => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setLesenSelectedAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                              className={`w-full p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${
                                selected === opt.key
                                  ? "bg-purple-600 text-white border-purple-600 font-bold"
                                  : isDark
                                  ? "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-purple-400"
                                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                              }`}
                            >
                              <span>{opt.text}</span>
                              {selected === opt.key && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          ))}
                        </div>
                        {lesenChecked && (
                          <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                            isCorrect ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300" : "bg-rose-950/40 border border-rose-500/40 text-rose-300"
                          }`}>
                            {isCorrect ? "✓ Richtig! " : "✕ Falsch. "}
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Teil 3: Wohnungsanzeigen & Abkürzungen (from Schritte Plus Neu 3) */}
          {lesenPart === 3 && (
            <div className="space-y-6">
              {/* Abkürzungs-Entschlüssler Interactive Bar */}
              <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-3 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-800/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {LESEN_PART3_TASK.examTag}
                      </span>
                      <h3 className="text-base font-black">{LESEN_PART3_TASK.title}</h3>
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {LESEN_PART3_TASK.instruction}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLesenChecked(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-xs self-start sm:self-auto shrink-0"
                  >
                    Antworten prüfen
                  </button>
                </div>

                {/* Abbreviation Decoder Chips */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                    Abkürzungs-Entschlüssler (Housing Acronyms from Schritte Plus Neu 3):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {LESEN_PART3_TASK.abbreviations.map((abbr) => (
                      <div
                        key={abbr.abbr}
                        className={`p-2.5 rounded-xl border text-xs space-y-1 transition ${
                          isDark ? "bg-slate-950/60 border-slate-800 hover:border-purple-500/50" : "bg-purple-50/30 border-purple-200 hover:border-purple-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-amber-400 text-xs">{abbr.abbr}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{abbr.full}</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                          {abbr.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Situations (Left) vs Ads (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: 3 Wohnungssuchende */}
                <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                  isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">3 Wohnungssuchende</span>
                    <span className="text-xs text-slate-400">Wählen Sie die passende Anzeige (A-D)</span>
                  </div>

                  <div className="space-y-4">
                    {LESEN_PART3_TASK.situations.map((sit) => {
                      const selected = lesenSelectedAnswers[sit.id];
                      const isCorrect = selected === sit.match;
                      return (
                        <div
                          key={sit.id}
                          className={`p-4 rounded-2xl border space-y-3 transition ${
                            lesenChecked
                              ? isCorrect
                                ? "bg-emerald-950/40 border-emerald-500/50"
                                : "bg-rose-950/40 border-rose-500/50"
                              : isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-sm text-purple-300">{sit.seeker}</span>
                            <span className="text-[11px] text-slate-400 font-mono">Aufgabe #{sit.id}</span>
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            {sit.text}
                          </p>

                          {/* Ad Selection Buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {["A", "B", "C", "D"].map((adKey) => (
                              <button
                                key={adKey}
                                type="button"
                                onClick={() => setLesenSelectedAnswers(prev => ({ ...prev, [sit.id]: adKey }))}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                                  selected === adKey
                                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                                    : isDark
                                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-400"
                                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                Anzeige {adKey}
                              </button>
                            ))}
                          </div>

                          {lesenChecked && (
                            <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                              isCorrect ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40" : "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                            }`}>
                              {isCorrect ? `✓ Richtig! Anzeige ${sit.match} ist die perfekte Übereinstimmung.` : `✕ Falsch. Richtige Anzeige ist ${sit.match}.`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: 4 Authentic Housing Ads */}
                <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
                  isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">4 Wohnungsanzeigen (Potsdam/Berlin)</span>
                    <span className="text-xs text-slate-400">Authentische Zeitungsausschnitte</span>
                  </div>

                  <div className="space-y-3">
                    {LESEN_PART3_TASK.ads.map((ad) => (
                      <div
                        key={ad.key}
                        className={`p-4 rounded-2xl border space-y-2 transition ${
                          isDark ? "bg-slate-950/70 border-slate-800 hover:border-amber-400/40" : "bg-amber-50/20 border-amber-200 hover:border-amber-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs sm:text-sm text-amber-400">{ad.title}</span>
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                            Code: {ad.key}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed font-sans ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {ad.details}
                        </p>
                        <div className={`text-[11px] font-medium pt-1 italic ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Hinweis: {ad.bestFor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. SKILL: SPRACHBAUSTEINE (Cloze Practice)
      ───────────────────────────────────────────────────────────── */}
      {activeSkill === "SPRACHBAUSTEINE" && (
        <div className="space-y-6">
          {/* Part Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { p: 1, label: "Teil 1: Multiple Choice (a/b/c)" },
              { p: 2, label: "Teil 2: Wortschatz-Kasten" },
              { p: 3, label: "Teil 3: Satzbau-Kleber (3-Tier Model & Drills)" }
            ].map(({ p, label }) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSbPart(p);
                  setSbChecked(false);
                  setSbAnswers({});
                  setActiveSbSlot(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  sbPart === p
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30"
                    : isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Teil 1: Multiple Choice Cloze */}
          {sbPart === 1 && (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
                <div>
                  <h3 className="text-base sm:text-lg font-black">{SPRACHBAUSTEINE_TEIL1.title}</h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{SPRACHBAUSTEINE_TEIL1.intro}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSbChecked(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  Prüfen & Auswerten
                </button>
              </div>

              {/* Passage with Inlined Choice Gaps */}
              <div className={`p-6 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                isDark ? "bg-slate-950/60 border-slate-800 text-slate-200" : "bg-purple-50/30 border-purple-200 text-slate-800"
              }`}>
                {SPRACHBAUSTEINE_TEIL1.passage.map((item, idx) => {
                  if ("text" in item) {
                    return <span key={idx}>{item.text}</span>;
                  }
                  if ("slot" in item && item.slot) {
                    const slot = item.slot;
                    const selected = sbAnswers[slot];
                    const isCorrect = selected === item.correct;
                    return (
                      <span key={idx} className="inline-block mx-1">
                        <select
                          value={selected || ""}
                          onChange={(e) => setSbAnswers(prev => ({ ...prev, [slot]: e.target.value }))}
                          className={`px-2 py-1 rounded-xl text-xs font-bold border transition ${
                            sbChecked
                              ? isCorrect
                                ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                                : "bg-rose-950 border-rose-500 text-rose-300"
                              : selected
                              ? "bg-purple-900/60 border-purple-500 text-white"
                              : isDark ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <option value="">[{slot}] Wählen...</option>
                          {item.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* Teil 2: Word Bank Cloze */}
          {sbPart === 2 && (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
                <div>
                  <h3 className="text-base sm:text-lg font-black">{SPRACHBAUSTEINE_TEIL2.title}</h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{SPRACHBAUSTEINE_TEIL2.intro}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSbChecked(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  Prüfen & Auswerten
                </button>
              </div>

              {/* Jumbled Word Bank with Distractors */}
              <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? "bg-slate-950/80 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                  Word Bank (Click word to fill active slot):
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...SPRACHBAUSTEINE_TEIL2.wordBank, ...SPRACHBAUSTEINE_TEIL2.distractors].sort().map((w) => {
                    const isUsed = Object.values(sbAnswers).includes(w);
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => {
                          if (activeSbSlot !== null) {
                            setSbAnswers(prev => ({ ...prev, [activeSbSlot]: w }));
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                          isUsed
                            ? "opacity-40 border-dashed line-through"
                            : isDark
                            ? "bg-slate-900 hover:bg-purple-600 hover:text-white border-slate-700 text-slate-200"
                            : "bg-white hover:bg-purple-600 hover:text-white border-slate-300 text-slate-800"
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text with Interactive Gaps */}
              <div className={`p-6 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                isDark ? "bg-slate-950/60 border-slate-800 text-slate-200" : "bg-purple-50/30 border-purple-200 text-slate-800"
              }`}>
                {SPRACHBAUSTEINE_TEIL2.passage.map((item, idx) => {
                  if ("text" in item) {
                    return <span key={idx}>{item.text}</span>;
                  }
                  if ("slot" in item && item.slot) {
                    const slot = item.slot;
                    const selected = sbAnswers[slot];
                    const isCorrect = selected === item.correct;
                    const isActive = activeSbSlot === slot;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSbSlot(slot)}
                        className={`inline-block mx-1 px-3 py-1 rounded-xl text-xs font-black border-2 transition ${
                          isActive
                            ? "border-purple-500 bg-purple-950/80 text-purple-200 ring-2 ring-purple-500/40"
                            : sbChecked
                            ? isCorrect
                              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                              : "bg-rose-950 border-rose-500 text-rose-300"
                            : selected
                            ? "bg-purple-900/60 border-purple-500 text-white"
                            : isDark ? "bg-slate-900 border-dashed border-slate-700 text-slate-400" : "bg-white border-dashed border-slate-300 text-slate-500"
                        }`}
                      >
                        [{slot}] {selected || "_____"}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* Teil 3: Satzbau-Kleber (3-Tier Model & Drills from LearnOutLive) */}
          {sbPart === 3 && (
            <div className="space-y-6">
              {/* 3-Tier Architecture Visual Model */}
              <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-5 ${
                isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="space-y-1 pb-3 border-b border-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      LearnOutLive Grammar Blueprint
                    </span>
                    <span className="text-xs text-slate-400 font-mono">13 Authentic Drills</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black">
                    Der Satzbau-Kleber: The 3-Tier German Conjunction Model
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    German conjunctions dictate word order. Master the three positional tiers to eliminate 90% of B1 sentence structure mistakes:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tier 1 */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/40 border-purple-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Tier 1: Position 0</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 font-mono font-bold">ADUSO</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      aber, denn, und, sondern, oder
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      Sidekick connectors: they link clauses without taking a numbered seat. The verb remains in standard Position 2:
                    </p>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300">
                      &ldquo;... denn [Pos 0] ich [Pos 1] <strong>bin</strong> [Pos 2] krank.&rdquo;
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/40 border-purple-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Tier 2: Verb-Kickers</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-400/10 text-purple-300 font-mono font-bold">Subordinating</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      weil, dass, obwohl, wenn, ob, als, da
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      Puppet masters: they kick the conjugated verb to the absolute end of the subordinate clause:
                    </p>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-purple-300">
                      &ldquo;... weil ich sehr krank <strong>bin</strong> [Ende].&rdquo;
                    </div>
                  </div>

                  {/* Tier 3 */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/40 border-purple-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Tier 3: Inversion</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-300 font-mono font-bold">Conjunctive Adverbs</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      deshalb, trotzdem, sonst, daher, folglich
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      Native constituents: they occupy Position 1 of the clause, forcing immediate subject-verb inversion:
                    </p>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300">
                      &ldquo;... deshalb [Pos 1] <strong>bleibe</strong> [Pos 2] ich [Pos 3] zu Hause.&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Drill Card */}
              {(() => {
                const curGlueDrill = GLUE_CONJUNCTIONS_DRILLS[glueDrillIdx];
                const isSelectedCorrect = glueSelectedOpt === curGlueDrill.correct;
                return (
                  <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
                    isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                  }`}>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {curGlueDrill.tier}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          Drill {glueDrillIdx + 1} von {GLUE_CONJUNCTIONS_DRILLS.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-purple-400">
                          Punkte: {glueScore} / {GLUE_CONJUNCTIONS_DRILLS.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setGlueDrillIdx(0);
                            setGlueScore(0);
                            setGlueSelectedOpt(null);
                            setGlueAnswered(false);
                          }}
                          className={`text-xs underline ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Sentence with Blank */}
                    <div className={`p-6 rounded-2xl border text-center space-y-2 ${
                      isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/30 border-purple-200"
                    }`}>
                      <div className="text-base sm:text-xl font-bold font-sans">
                        &ldquo;{curGlueDrill.sentence.split("___")[0]}
                        <span className={`inline-block px-3 py-1 mx-1.5 rounded-xl border-2 font-mono font-black text-sm sm:text-base ${
                          glueAnswered
                            ? isSelectedCorrect
                              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                              : "bg-rose-950 border-rose-500 text-rose-300"
                            : isDark ? "bg-slate-900 border-dashed border-purple-400 text-purple-300" : "bg-white border-dashed border-purple-400 text-purple-700"
                        }`}>
                          {glueSelectedOpt || "___"}
                        </span>
                        {curGlueDrill.sentence.split("___")[1]}&rdquo;
                      </div>
                      <div className="text-xs text-slate-400">
                        Wählen Sie den passenden Satzbau-Kleber:
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {curGlueDrill.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          disabled={glueAnswered}
                          onClick={() => {
                            setGlueSelectedOpt(opt);
                            setGlueAnswered(true);
                            if (opt === curGlueDrill.correct) {
                              setGlueScore(prev => prev + 1);
                              confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                            }
                          }}
                          className={`p-3.5 rounded-2xl font-black text-sm border transition shadow-xs ${
                            glueAnswered
                              ? opt === curGlueDrill.correct
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : opt === glueSelectedOpt
                                ? "bg-rose-600 text-white border-rose-600"
                                : isDark ? "bg-slate-950/50 border-slate-800 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-400"
                              : isDark
                              ? "bg-slate-950/70 border-slate-800 text-slate-200 hover:border-purple-400 hover:text-white"
                              : "bg-white border-slate-200 text-slate-800 hover:border-purple-500"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {/* Feedback & Rule Explanation */}
                    {glueAnswered && (
                      <div className={`p-4 rounded-2xl border space-y-1.5 animate-fadeIn ${
                        isSelectedCorrect
                          ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                          : "bg-rose-950/40 border-rose-500/50 text-rose-200"
                      }`}>
                        <div className="font-black text-sm flex items-center gap-1.5">
                          {isSelectedCorrect ? "✓ Ausgezeichnet! Richtig kombiniert." : `✕ Leider nicht richtig. Richtige Antwort: ${curGlueDrill.correct}`}
                        </div>
                        <p className="text-xs leading-relaxed opacity-95">
                          {curGlueDrill.rule}
                        </p>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        disabled={glueDrillIdx === 0}
                        onClick={() => {
                          setGlueDrillIdx(prev => Math.max(0, prev - 1));
                          setGlueSelectedOpt(null);
                          setGlueAnswered(false);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                          glueDrillIdx === 0
                            ? "opacity-40 cursor-not-allowed border-transparent text-slate-500"
                            : isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        ← Vorherige Aufgabe
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (glueDrillIdx < GLUE_CONJUNCTIONS_DRILLS.length - 1) {
                            setGlueDrillIdx(prev => prev + 1);
                            setGlueSelectedOpt(null);
                            setGlueAnswered(false);
                          } else {
                            // Loop or celebrate
                            setGlueDrillIdx(0);
                            setGlueSelectedOpt(null);
                            setGlueAnswered(false);
                          }
                        }}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                      >
                        <span>{glueDrillIdx < GLUE_CONJUNCTIONS_DRILLS.length - 1 ? "Nächste Aufgabe →" : "Von vorne beginnen ↺"}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. SKILL: SCHREIBEN (Email & Letter Practice Studio)
      ───────────────────────────────────────────────────────────── */}
      {activeSkill === "SCHREIBEN" && (
        <div className="space-y-6">
          {/* Prompt Selector & Mode Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {WRITING_PROMPTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setWritingPromptIndex(i);
                    setGuidedAnswers({});
                    setTypedLetter("");
                    setAiEvaluation(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    writingPromptIndex === i
                      ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30"
                      : isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Prompt {i + 1}: {i === 0 ? "Krankmeldung" : i === 1 ? "Heizungsausfall" : "Wohnungsbewerbung"}
                </button>
              ))}
            </div>

            <div className={`inline-flex p-1 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              {(["GUIDED", "FREE_TYPING", "MODEL"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setWritingMode(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    writingMode === m
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {m === "GUIDED" ? "Guided Fill-in" : m === "FREE_TYPING" ? "Free Typing Simulator" : "Model Solution"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Leitpunkte & Scenario */}
            <div className={`lg:col-span-1 rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                }`}>
                  {currentWritingPrompt.targetExam}
                </span>
                <h3 className="text-base font-bold">{currentWritingPrompt.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {currentWritingPrompt.scenario}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/40">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                  Leitpunkte (Must Address All 4):
                </span>
                <div className="space-y-2">
                  {currentWritingPrompt.leitpunkte.map((lp, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                        isDark ? "bg-slate-950/60 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{lp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* B1 Connectors Cheat Sheet */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/50 border-purple-200"
              }`}>
                <div className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>High-Yield B1 Connectors:</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div><strong className="text-purple-400">weil / da:</strong> Verb at the end</div>
                  <div><strong className="text-purple-400">Könnten Sie bitte...:</strong> Polite Konjunktiv II</div>
                  <div><strong className="text-purple-400">damit / um...zu:</strong> expressing purpose</div>
                  <div><strong className="text-purple-400">obwohl:</strong> although (Verb kicker)</div>
                </div>
              </div>
            </div>

            {/* Right Column: Active Mode Workspace */}
            <div className={`lg:col-span-2 rounded-3xl border p-6 sm:p-8 shadow-sm space-y-5 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              {/* MODE 1: GUIDED FILL-IN-THE-BLANKS */}
              {writingMode === "GUIDED" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <div>
                      <h4 className="text-base font-bold">Guided Fill-In-The-Blanks</h4>
                      <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Click on a blank, then select the right word from the jumbled bank below.
                      </p>
                    </div>
                  </div>

                  {/* Jumbled Word Bank */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? "bg-slate-950/80 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                    <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                      Jumbled Word Bank (Includes Distractors):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentJumbledWritingWords.map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() => {
                            if (activeWritingSlot !== null) {
                              setGuidedAnswers(prev => ({ ...prev, [activeWritingSlot]: word }));
                              // Auto move to next slot
                              const totalSlots = currentWritingPrompt.blankAnswers.length;
                              let nextSlot = (activeWritingSlot % totalSlots) + 1;
                              setActiveWritingSlot(nextSlot);
                            }
                          }}
                          className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition ${
                            isDark
                              ? "bg-slate-900 hover:bg-purple-600 hover:text-white border-slate-700 text-slate-200"
                              : "bg-white hover:bg-purple-600 hover:text-white border-slate-300 text-slate-800"
                          }`}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Letter with Clickable Gaps */}
                  <div className={`p-6 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isDark ? "bg-slate-950/60 border-slate-800 text-slate-200" : "bg-purple-50/20 border-purple-200 text-slate-800"
                  }`}>
                    {currentWritingPrompt.guidedText.map((chunk, idx) => {
                      if ("text" in chunk) {
                        return <span key={idx}>{chunk.text}</span>;
                      }
                      if ("slot" in chunk && chunk.slot) {
                        const slot = chunk.slot;
                        const answer = guidedAnswers[slot];
                        const isCorrect = answer === chunk.correct;
                        const isActive = activeWritingSlot === slot;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveWritingSlot(slot)}
                            className={`inline-block mx-1 px-3 py-1 rounded-xl text-xs font-black border-2 transition ${
                              isActive
                                ? "border-purple-500 bg-purple-950/80 text-purple-200 ring-2 ring-purple-500/40"
                                : answer
                                ? isCorrect
                                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                                  : "bg-rose-950 border-rose-500 text-rose-300"
                                : isDark ? "bg-slate-900 border-dashed border-slate-700 text-slate-400" : "bg-white border-dashed border-slate-300 text-slate-500"
                            }`}
                          >
                            [{slot}] {answer || "_____"}
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* MODE 2: FREE TYPING SIMULATOR */}
              {writingMode === "FREE_TYPING" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-bold">Free Typing Simulator</h4>
                      <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Type your full B1 letter without templates. Click connectors to insert them.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-400">
                      Words: {typedLetter.trim().split(/\s+/).filter(Boolean).length} / ~80
                    </span>
                  </div>

                  {/* Connectors Quick Insertion Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Sehr geehrte Frau Müller,",
                      "ich schreibe Ihnen, weil...",
                      "Könnten Sie mir bitte...?",
                      "Ich wäre Ihnen sehr dankbar, wenn...",
                      "Mit freundlichen Grüßen"
                    ].map((phrase) => (
                      <button
                        key={phrase}
                        type="button"
                        onClick={() => setTypedLetter(prev => prev ? `${prev}\n${phrase}` : phrase)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
                          isDark ? "bg-slate-900 border-slate-700 text-slate-300 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        + {phrase}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={10}
                    value={typedLetter}
                    onChange={(e) => setTypedLetter(e.target.value)}
                    placeholder="Sehr geehrte Damen und Herren,&#10;&#10;ich schreibe Ihnen, weil..."
                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium focus:outline-none focus:border-purple-600 transition leading-relaxed ${
                      isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setTypedLetter("")}
                      className="text-xs text-slate-400 hover:underline"
                    >
                      Clear Text
                    </button>
                    <button
                      type="button"
                      onClick={handleEvaluateLetter}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Instant AI Automated Evaluation</span>
                    </button>
                  </div>

                  {/* AI Evaluation Results */}
                  {aiEvaluation && (
                    <div className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                      isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50/50 border-purple-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-400 uppercase">Automated B1 Rating</span>
                        <span className="text-lg font-black text-emerald-400">{aiEvaluation.score} / 100</span>
                      </div>

                      {aiEvaluation.strengths.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-emerald-400 uppercase">Stärken (Pass Criteria):</span>
                          {aiEvaluation.strengths.map((s, i) => (
                            <div key={i} className="text-xs text-emerald-300 flex items-center gap-1.5">
                              <Check className="w-3 h-3 stroke-[3]" /> {s}
                            </div>
                          ))}
                        </div>
                      )}

                      {aiEvaluation.improvements.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[11px] font-bold text-amber-400 uppercase">Tipps für 100% B1 Punkte:</span>
                          {aiEvaluation.improvements.map((im, i) => (
                            <div key={i} className="text-xs text-amber-300 flex items-center gap-1.5">
                              <AlertCircle className="w-3 h-3" /> {im}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* MODE 3: MODEL SOLUTION */}
              {writingMode === "MODEL" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <div>
                      <h4 className="text-base font-bold">Official Model Answer (Musterlösung)</h4>
                      <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Certified 100% score according to telc and Goethe B1 marking criteria.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(currentWritingPrompt.modelAnswer)}
                        className="p-2 rounded-xl border text-purple-400 hover:text-purple-300 transition"
                        title="Native audio reading"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(currentWritingPrompt.modelAnswer);
                          setCopiedModel(true);
                          setTimeout(() => setCopiedModel(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition"
                      >
                        {copiedModel ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedModel ? "Kopiert!" : "Copy Text"}</span>
                      </button>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line font-mono ${
                    isDark ? "bg-slate-950 border-slate-800 text-purple-200" : "bg-purple-50/50 border-purple-200 text-purple-950"
                  }`}>
                    {currentWritingPrompt.modelAnswer}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. SKILL: HOEREN (Listening Practice)
      ───────────────────────────────────────────────────────────── */}
      {activeSkill === "HOEREN" && (
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
          isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/40">
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Native German Audio Simulator</span>
              <h3 className="text-xl font-extrabold">Hörverstehen: Durchsagen & Dialoge</h3>
            </div>

            {/* Playback Speed Switcher */}
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Speed:</span>
              {[0.8, 1.0, 1.2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setHoerenSpeed(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                    hoerenSpeed === s
                      ? "bg-purple-600 text-white border-purple-600"
                      : isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Sample Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 0, title: "Bahnsteigdurchsage Gleis 3", type: "Announcement", text: "Achtung an Gleis 3. Der Intercity-Express 543 nach München Hauptbahnhof über Frankfurt und Nürnberg, Abfahrt 14 Uhr 25, hat heute circa 20 Minuten Verspätung. Grund dafür ist eine technische Störung am Triebfahrzeug. Wir bitten alle Reisenden um Verständnis." },
              { id: 1, title: "Anrufbeantworter Arztpraxis", type: "Voicemail", text: "Guten Tag, hier ist die Praxis Dr. Weber. Wir haben derzeit Urlaub bis einschließlich nächsten Freitag. In dringenden Notfällen wenden Sie sich bitte an den ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117. Ab Montag, den 15. sind wir wieder wie gewohnt für Sie da." },
              { id: 2, title: "Supermarkt-Sonderangebot", type: "Commercial", text: "Liebe Kundinnen und Kunden, beachten Sie heute unsere Frische-Aktion in der Obst- und Gemüseabteilung: Frische Erdbeeren aus der Region für nur zwei Euro neunundvierzig das Kilo! Nur solange der Vorrat reicht." }
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setHoerenTrackIndex(track.id);
                  handlePlayAudio(track.text, hoerenSpeed);
                }}
                className={`p-4 rounded-2xl border text-left transition space-y-2 shadow-xs active:scale-95 ${
                  hoerenTrackIndex === track.id
                    ? isDark ? "bg-purple-950/80 border-purple-500 text-white" : "bg-purple-50 border-purple-300 text-purple-950"
                    : isDark ? "bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 uppercase">{track.type}</span>
                  <Volume2 className="w-4 h-4 text-purple-400" />
                </div>
                <div className="font-bold text-xs sm:text-sm">{track.title}</div>
                <div className="text-[11px] text-slate-400">Click to listen with native TTS</div>
              </button>
            ))}
          </div>

          {/* Transcript Viewer Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowTranscript(prev => !prev)}
              className="text-xs text-purple-400 font-bold hover:underline flex items-center gap-1"
            >
              {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showTranscript ? "Transkript verbergen" : "Deutsches Transkript anzeigen"}</span>
            </button>

            {showTranscript && (
              <div className={`mt-3 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-purple-50/50 border-purple-200 text-slate-800"
              }`}>
                {hoerenTrackIndex === 0 && "Achtung an Gleis 3. Der Intercity-Express 543 nach München Hauptbahnhof über Frankfurt und Nürnberg, Abfahrt 14 Uhr 25, hat heute circa 20 Minuten Verspätung. Grund dafür ist eine technische Störung am Triebfahrzeug. Wir bitten alle Reisenden um Verständnis."}
                {hoerenTrackIndex === 1 && "Guten Tag, hier ist die Praxis Dr. Weber. Wir haben derzeit Urlaub bis einschließlich nächsten Freitag. In dringenden Notfällen wenden Sie sich bitte an den ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117. Ab Montag, den 15. sind wir wieder wie gewohnt für Sie da."}
                {hoerenTrackIndex === 2 && "Liebe Kundinnen und Kunden, beachten Sie heute unsere Frische-Aktion in der Obst- und Gemüseabteilung: Frische Erdbeeren aus der Region für nur zwei Euro neunundvierzig das Kilo! Nur solange der Vorrat reicht."}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. SKILL: SPRECHEN (Oral Exam Blueprint)
      ───────────────────────────────────────────────────────────── */}
      {activeSkill === "SPRECHEN" && (
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
          isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/40">
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Oral Exam Partner & Blueprint</span>
              <h3 className="text-xl font-extrabold">Mündliche B1 Prüfung: Sprechen</h3>
            </div>

            <div className="flex items-center gap-2">
              {[
                { p: 1, label: "Teil 1: Sich vorstellen" },
                { p: 2, label: "Teil 2: Bildbeschreibung" },
                { p: 3, label: "Teil 3: Gemeinsam planen" }
              ].map((item) => (
                <button
                  key={item.p}
                  type="button"
                  onClick={() => setSprechenPart(item.p)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    sprechenPart === item.p
                      ? "bg-purple-600 text-white border-purple-600"
                      : isDark ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Teil 1: Kontaktaufnahme Blueprint */}
          {sprechenPart === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold">The 6-Question Self-Introduction Blueprint</h4>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Examiners ask these 6 standard questions in the first 2 minutes. Memorize these sentence patterns for a guaranteed pass:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { q: "1. Name", de: "Ich heiße [Name] und bin [Alter] Jahre alt.", tip: "Klar und deutlich sprechen." },
                  { q: "2. Herkunft", de: "Ich komme aus [Land], einer wunderschönen Stadt namens [Stadt].", tip: "Genitiv oder Relativsatz einbauen." },
                  { q: "3. Wohnort", de: "Seit [zwei Jahren] wohne ich hier in Deutschland in [Stadt].", tip: "Seit + Dativ beachten!" },
                  { q: "4. Familie", de: "Ich bin verheiratet / ledig und habe [ein Kind / keine Kinder].", tip: "Akkusativ bei Kindern beachten." },
                  { q: "5. Beruf / Ausbildung", de: "Von Beruf bin ich Software-Entwickler und arbeite bei [Firma].", tip: "'Von Beruf bin ich...' klingt nativ." },
                  { q: "6. Sprachen & Hobbys", de: "In meiner Freizeit koche ich sehr gern und treibe regelmäßig Sport.", tip: "Verb auf Position 2 nach Zeitangabe!" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-400 uppercase">{item.q}</span>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(item.de)}
                        className="p-1 text-purple-400 hover:text-purple-300"
                        title="Listen to native pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className={`text-xs sm:text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {item.de}
                    </div>
                    <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Tipp: {item.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teil 3: Gemeinsam planen Simulator */}
          {sprechenPart === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold">Interactive Dialogue: Gemeinsam etwas planen</h4>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Szenario: Sie und Ihr Partner wollen eine Abschiedsfeier für Ihren Deutschlehrer organisieren. Reagieren Sie auf die Vorschläge:
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: 0,
                    partner: "Hallo! Unser Deutschkurs ist bald zu Ende. Wollen wir eine kleine Überraschungsparty für Herrn Schmidt planen?",
                    responseOptions: [
                      { text: "Ja, das ist eine wunderbare Idee! Was hältst du davon, wenn wir am Freitag feiern?", isGood: true, de: "Perfekter B1 Gegenvorschlag!" },
                      { text: "Nein, keine Zeit.", isGood: false, de: "Zu kurz! In B1 immer begründen und Alternativen vorschlagen." }
                    ]
                  },
                  {
                    step: 1,
                    partner: "Freitag passt mir gut. Sollen wir etwas kochen oder lieber Pizza bestellen?",
                    responseOptions: [
                      { text: "Ich schlage vor, dass jeder eine Spezialität aus seinem Heimatland mitbringt. So haben wir ein tolles internationales Buffet!", isGood: true, de: "Ausgezeichnete Idee mit 'Ich schlage vor, dass...' (Verb am Ende)." },
                      { text: "Egal, mir egal.", isGood: false, de: "Zeigt keine Initiative im Prüfungsgespräch." }
                    ]
                  }
                ].map((d) => (
                  <div
                    key={d.step}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/30 border-purple-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-black uppercase">
                        Prüfungspartner:
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(d.partner)}
                        className="text-purple-400 hover:text-purple-300 p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold italic ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                      &ldquo;{d.partner}&rdquo;
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase">Wählen Sie Ihre Antwort:</div>
                      {d.responseOptions.map((opt, oi) => (
                        <button
                          key={oi}
                          type="button"
                          onClick={() => {
                            if (opt.isGood) {
                              confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
                            }
                            handlePlayAudio(opt.text);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-xs text-left transition ${
                            opt.isGood
                              ? isDark
                                ? "bg-slate-900 border-slate-700 hover:border-emerald-500 text-slate-200"
                                : "bg-white border-slate-200 hover:border-emerald-500 text-slate-800"
                              : isDark
                              ? "bg-slate-900/40 border-slate-800 text-slate-500"
                              : "bg-slate-100 border-slate-200 text-slate-400"
                          }`}
                        >
                          <div className="font-bold">{opt.text}</div>
                          <div className={`text-[10px] mt-0.5 ${opt.isGood ? "text-emerald-400" : "text-rose-400"}`}>
                            {opt.de}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teil 2: Bildbeschreibung */}
          {sprechenPart === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold">Teil 2: Bildbeschreibung & Eigene Meinung</h4>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Die 4 Schritte, um jedes Bild in der mündlichen Prüfung perfekt zu beschreiben:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { step: "1. Auf dem Bild sehe ich...", phrase: "Auf dem Foto sehe ich mehrere Personen, die an einem Tisch im Büro sitzen." },
                  { step: "2. Im Vordergrund / Hintergrund...", phrase: "Im Vordergrund steht ein Laptop, während im Hintergrund ein Whiteboard zu sehen ist." },
                  { step: "3. Das Thema des Bildes ist...", phrase: "Das Bild behandelt das Thema moderne Arbeitswelt und Teamarbeit." },
                  { step: "4. Meine persönliche Erfahrung...", phrase: "In meinem Heimatland arbeiten viele Menschen auch im Homeoffice, aber ich bevorzuge die Arbeit im Team." }
                ].map((b, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-400">{b.step}</span>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(b.phrase)}
                        className="p-1 text-purple-400 hover:text-purple-300"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {b.phrase}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};