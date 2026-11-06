import os
import json

output_path = "/Users/testy/Desktop/code/german-prep-platform/src/data/fast_track_b1_plan_data.ts"

content = '''// Fast-Track B1 Master Plan & Diagnostic Assessment Data
// Strictly 0 em-dashes (\u2014) and 0 alcohol/smoking emojis

export interface ExamComparisonPoint {
  id: string;
  category: string;
  goethe: string;
  telc: string;
  verdict: string;
}

export interface RoadmapDayItem {
  day: number;
  phaseId: number;
  title: string;
  priority: string;
  focusGrammar: string[];
  vocabGoal: string;
  dailyGoal: string;
  recommendedLab: "GRAMMAR" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "EXAM";
}

export interface TimetableSlot {
  id: string;
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  activity: string;
  durationMinutes: number;
  objective: string;
  actionLab: "GRAMMAR" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "PRACTICE";
  adhdTip: string;
}

export interface FreeResourceItem {
  id: string;
  title: string;
  provider: string;
  url: string;
  category: string;
  description: string;
  examApplication: string;
  freeBadge: string;
}

export interface ResidencyRequirement {
  id: string;
  routeTitle: string;
  lawParagraph: string;
  residenceMonths: number;
  germanLevel: string;
  pensionMonths: number;
  notes: string;
}

export interface DiagnosticReadingQuestion {
  id: string;
  taskType: string;
  textSnippet: string;
  question: string;
  options: { key: string; text: string; isCorrect: boolean; explanation: string }[];
  testedRule: string;
}

export interface DiagnosticListeningQuestion {
  id: string;
  speaker: string;
  germanAudioScript: string;
  question: string;
  options: { key: string; text: string; isCorrect: boolean; explanation: string }[];
  testedSkill: string;
}

export interface DiagnosticWritingTask {
  id: string;
  prompt: string;
  context: string;
  requirements: string[];
  sampleModelAnswer: string;
  keyConnectors: string[];
  rubricCriteria: { criterion: string; weight: number; tip: string }[];
}

export interface DiagnosticSpeakingTask {
  id: string;
  teil: number;
  title: string;
  prompt: string;
  suggestedPhrases: string[];
  sampleTranscript: string;
  evaluationTips: string;
}

export const EXAM_SITUATION_STRATEGY = {
  headline: "Goethe or telc: Your Situation Analysis",
  recommendation: "Goethe B1 (Recommended for Uneven or Beginning Skills)",
  coreRationale: "Because you currently consider all four skills weak, neither examination is automatically easier. However, Goethe's modular structure allows you to take and pass modules independently (60% threshold each) and repeat only what you fail, eliminating the risk of having to retake the entire exam.",
  comparisonTable: [
    {
      id: "structure",
      category: "Exam Structure",
      goethe: "4 completely independent modules (Lesen, Hören, Schreiben, Sprechen).",
      telc: "2 combined parts: Written Exam (Reading + Language Elements + Listening + Writing) and Oral Exam.",
      verdict: "Goethe offers complete modular separation."
    },
    {
      id: "pass_threshold",
      category: "Pass Threshold",
      goethe: "60% required in each module (60/100 points).",
      telc: "60% in Written combined (135/225 points) AND 60% in Oral (45/75 points).",
      verdict: "Both require 60%, but telc compensates weak reading with language elements."
    },
    {
      id: "retake_rules",
      category: "Retake Policy",
      goethe: "Pass modules individually. You only repeat the specific module you failed at any Goethe center worldwide.",
      telc: "If you fail one section of the written exam, you must repeat the entire written block (reading, grammar, listening, writing).",
      verdict: "Goethe saves money and stress if your scores are uneven."
    },
    {
      id: "grammar_component",
      category: "Grammar & Vocab Testing",
      goethe: "No separate grammar test; grammar is evaluated indirectly in writing and speaking.",
      telc: "Dedicated Sprachbausteine section (30 points: 2 multiple choice cloze texts testing prepositions, connectors, adjective endings).",
      verdict: "Telc rewards rote grammar drills; Goethe focuses on real communication."
    },
    {
      id: "speaking_format",
      category: "Speaking Examination",
      goethe: "Pair exam: Teil 1 Gemeinsam planen, Teil 2 Thema präsentieren (monologue ~3 min), Teil 3 Fragen beantworten.",
      telc: "Pair exam: Teil 1 Kennenlernen (casual chat), Teil 2 Über ein Thema sprechen, Teil 3 Gemeinsam eine Aufgabe lösen.",
      verdict: "Goethe presentation requires structured 5-part slide format; telc is more conversational."
    }
  ] as ExamComparisonPoint[],
  practicalChecklist: [
    "Confirm your immigration office (Ausländerbehörde) accepts both (both are BAMF-certified).",
    "Goethe exam appointments book out 4 to 8 weeks in advance: check your local test center calendar now.",
    "If taking Goethe, book all 4 modules together first to save fees; you only re-register for single failed modules if needed.",
    "If you love multiple-choice grammar gap-fills, telc Sprachbausteine is predictable and can be drilled quickly."
  ]
};

export const ROADMAP_30_DAYS = {
  title: "Your 30-Day B1 Preparation Roadmap",
  studyCommitment: "3 Hours 20 Minutes per Day - 6 Days per Week (1 Light Revision Day)",
  phases: [
    {
      phaseId: 1,
      name: "Phase 1: Build the Foundation",
      daysRange: "Days 1 to 7",
      priority: "Grammar and Vocabulary Foundation",
      weeklyGoal: "Understand basic B1 sentences, conjugations, and everyday conversations.",
      keyTopics: [
        "Present (Präsens), Simple Past (Präteritum of haben/sein/modal verbs), and Conversational Past (Perfekt with haben/sein)",
        "Akkusativ (direct objects) and Dativ (indirect objects + the 7 fixed prepositions: aus, bei, mit, nach, seit, von, zu)",
        "Main clauses (Verb in position 2) and Subordinate clauses (Verb kicker to end)",
        "The 6 core modal verbs: können, müssen, dürfen, sollen, wollen, möchten",
        "High-yield connectors: weil, dass, obwohl, wenn, deshalb",
        "Memorize 20 high-frequency B1 words daily (140 words total in week 1)"
      ]
    },
    {
      phaseId: 2,
      name: "Phase 2: Receptive Skills Mastery",
      daysRange: "Days 8 to 14",
      priority: "Reading and Listening Comprehension",
      weeklyGoal: "Improve comprehension, scanning speed, and eliminating distractors.",
      keyTopics: [
        "Read 2 short B1 texts daily (blog posts, advertisements, formal notices, emails)",
        "Practice identifying the main idea (Globalverstehen) vs specific factual details (Detailverstehen)",
        "Listen to German conversations for 30 to 40 minutes daily using Nicos Weg and Easy German",
        "Double-listen protocol: Listen once without text, second time with transcript to spot unknown words",
        "Target keywords matching: Recognize synonyms between question stems and audio dialogue"
      ]
    },
    {
      phaseId: 3,
      name: "Phase 3: Productive Communication",
      daysRange: "Days 15 to 21",
      priority: "Writing and Speaking Production",
      weeklyGoal: "Produce structured, cohesive B1 German rather than isolated words.",
      keyTopics: [
        "Write 1 formal or informal email daily (80+ words): Apologies, appointment requests, complaints",
        "Master the 5-point presentation formula: Intro, Personal experience, Situation in home country, Pros/Cons, Conclusion",
        "Practice making suggestions and responding politely: 'Wie wäre es, wenn wir...', 'Das ist eine gute Idee, aber...'",
        "Practice speaking with an AI partner or tandem partner for 15 to 20 minutes daily",
        "Automate high-scoring polite formulas: 'Könnten Sie mir bitte...', 'Ich würde mich sehr freuen, wenn...'"
      ]
    },
    {
      phaseId: 4,
      name: "Phase 4: Examination Practice & Timing",
      daysRange: "Days 22 to 26",
      priority: "Exam Timing and Accuracy",
      weeklyGoal: "Consistently achieve at least 65% to 70% in practice under strict time limits.",
      keyTopics: [
        "Complete 1 timed reading module (65 minutes for Goethe B1 / 90 minutes for telc Reading+Vocab)",
        "Complete 1 full listening module (40 minutes) under real exam audio conditions",
        "Write 2 timed examination-style texts (60 minutes)",
        "Run 2 complete speaking simulations (Teil 1, Teil 2, Teil 3)",
        "Conduct error root-cause review: Document every trap you fell into in your error notebook"
      ]
    },
    {
      phaseId: 5,
      name: "Phase 5: Final Polish & Peak Readiness",
      daysRange: "Days 27 to 30",
      priority: "Exam Readiness and Confidence",
      weeklyGoal: "Consistently stay safely above the 60% passing threshold with calm confidence.",
      keyTopics: [
        "Complete 2 full mock examinations under authentic exam clock conditions",
        "Revise your personalized grammar error log (articles, case endings, verb kicker)",
        "Memorize fixed email openers and closers so you don't waste time on test day",
        "Practice speaking naturally without memorizing whole scripts word-for-word",
        "Prioritize sleep, hydration, and light review: avoid cramming new topics on Day 30"
      ]
    }
  ]
};

export const DAILY_TIMETABLE_DATA: TimetableSlot[] = [
  {
    id: "slot-1",
    timeOfDay: "Morning",
    activity: "Grammar & Vocabulary Focus",
    durationMinutes: 40,
    objective: "Memorize 20 new B1 vocabulary items and drill 1 specific grammar formula (e.g. Dative prepositions, Partizip II, or Subjunctive II).",
    actionLab: "GRAMMAR",
    adhdTip: "Use active recall cards and sentence typing. Do not just passively re-read tables."
  },
  {
    id: "slot-2",
    timeOfDay: "Morning",
    activity: "Reading Exercises & Speed Scanning",
    durationMinutes: 35,
    objective: "Complete 2 short reading texts. Practice skimming for titles and scanning for numbers, names, and negative conditions (nicht, kein).",
    actionLab: "READING",
    adhdTip: "Underline or highlight the keywords in the question BEFORE reading the text."
  },
  {
    id: "slot-3",
    timeOfDay: "Afternoon",
    activity: "Listening Comprehension & Transcripts",
    durationMinutes: 40,
    objective: "Listen to 2 to 3 dialogue tracks. First pass: main idea. Second pass: detail extraction. Check transcript for missed words.",
    actionLab: "LISTENING",
    adhdTip: "If you get distracted, take brief notes of numbers and dates as the speaker talks."
  },
  {
    id: "slot-4",
    timeOfDay: "Afternoon",
    activity: "Writing Practice (Email & Letter)",
    durationMinutes: 35,
    objective: "Draft 1 complete B1 letter/email (80+ words). Include proper greeting, 3 content points, at least 3 connectors (weil, dass, obwohl), and closing.",
    actionLab: "WRITING",
    adhdTip: "Use the 4-paragraph framework: Greeting, Context, Solution/Request, Polite Sign-off."
  },
  {
    id: "slot-5",
    timeOfDay: "Evening",
    activity: "Speaking Practice & Voice Recording",
    durationMinutes: 30,
    objective: "Practice speaking out loud. Record your 6-sentence introduction, 3-minute presentation, or negotiate a plan with the AI Speaking Partner.",
    actionLab: "SPEAKING",
    adhdTip: "Do not stop when you make a mistake. Keep talking and self-correct on the fly."
  },
  {
    id: "slot-6",
    timeOfDay: "Evening",
    activity: "Mistake Audit & Daily Revision",
    durationMinutes: 20,
    objective: "Review all incorrect answers from today. Note the exact reason: was it a vocabulary gap, a grammar rule, or an exam distractor trap?",
    actionLab: "PRACTICE",
    adhdTip: "Write down the 3 golden takeaways in your pocket notebook right before sleeping."
  }
];

export const FREE_RESOURCES_DATA: FreeResourceItem[] = [
  {
    id: "nicos-weg",
    title: "Nicos Weg (Deutsche Welle)",
    provider: "Deutsche Welle (DW)",
    url: "https://learngerman.dw.com/?utm_source=chatgpt.com",
    category: "Grammar, Listening & Everyday German",
    description: "The gold standard free interactive video telenovela covering A1, A2, and B1. Includes interactive exercises, native dialogues, transcripts, and grammar notes.",
    examApplication: "Ideal for daily 40-minute listening and vocabulary acquisition.",
    freeBadge: "100% Free / Public Broadcaster"
  },
  {
    id: "goethe-model-tests",
    title: "Official Goethe-Zertifikat B1 Model Tests",
    provider: "Goethe-Institut",
    url: "https://www.goethe.de/ins/de/en/prf/gzb1.cfm?utm_source=chatgpt.com",
    category: "Authentic Mock Exam Papers & Audio",
    description: "Official downloadable PDF test sets for all 4 modules (Lesen, Hören, Schreiben, Sprechen) directly from the exam board with official audio files and answer keys.",
    examApplication: "Must-do practice for Days 22 to 30 to test real timing and difficulty.",
    freeBadge: "Official Free Sample Sets"
  },
  {
    id: "easy-german",
    title: "Easy German Video Library",
    provider: "Easy German Team",
    url: "https://www.youtube.com/@EasyGerman?utm_source=chatgpt.com",
    category: "Listening & Colloquial Vocabulary",
    description: "Authentic street interviews with native speakers across Berlin and Germany. Features synchronized German and English subtitles to train your ear to natural conversational cadence.",
    examApplication: "Best for afternoon listening blocks when energy is low.",
    freeBadge: "Free on YouTube"
  },
  {
    id: "telc-mock-exam",
    title: "Official telc Deutsch B1 Übungstest 1",
    provider: "telc gGmbH",
    url: "https://www.telc.net/en/language-examinations/certificate-exams/german/certificate-german-telc-german-b1/?utm_source=chatgpt.com",
    category: "Complete telc Mock Exam & Audio",
    description: "The official practice test published by telc, featuring the full written test (Leseverstehen, Sprachbausteine, Hörverstehen, Schriftlicher Ausdruck) and oral exam guidelines.",
    examApplication: "Essential if sitting telc B1 or testing your Sprachbausteine grammar accuracy.",
    freeBadge: "Official Free PDF & MP3"
  }
];

export const BAMF_RESIDENCY_COMPASS: ResidencyRequirement[] = [
  {
    id: "blue-card-21",
    routeTitle: "EU Blue Card (Fast-Track with B1)",
    lawParagraph: "§ 18c Abs. 2 Satz 3 AufenthG",
    residenceMonths: 21,
    germanLevel: "B1 (Goethe, telc, DTZ, or ECL)",
    pensionMonths: 21,
    notes: "Reduces permanent residence wait time from 27 months down to only 21 months if you hold a certified B1 certificate."
  },
  {
    id: "blue-card-27",
    routeTitle: "EU Blue Card (Standard Route with A1)",
    lawParagraph: "§ 18c Abs. 2 Satz 1 AufenthG",
    residenceMonths: 27,
    germanLevel: "A1 (Basic knowledge)",
    pensionMonths: 27,
    notes: "Requires only A1 German, but requires 6 additional months of employment and statutory pension contributions."
  },
  {
    id: "skilled-worker",
    routeTitle: "Skilled Professional (Fachkräfte)",
    lawParagraph: "§ 18c Abs. 1 AufenthG",
    residenceMonths: 36,
    germanLevel: "B1",
    pensionMonths: 36,
    notes: "Requires 3 years (36 months) of skilled employment and 36 months of statutory pension payments."
  },
  {
    id: "general-route",
    routeTitle: "General Permanent Residence (Regel-NE)",
    lawParagraph: "§ 9 AufenthG",
    residenceMonths: 60,
    germanLevel: "B1 (Sufficient German proficiency)",
    pensionMonths: 60,
    notes: "Requires 5 years (60 months) lawful residence, secure livelihood, and 60 months of pension insurance."
  },
  {
    id: "spouse-german",
    routeTitle: "Spouse of a German Citizen",
    lawParagraph: "§ 28 Abs. 2 AufenthG",
    residenceMonths: 36,
    germanLevel: "B1 (Sufficient German)",
    pensionMonths: 0,
    notes: "Requires 3 years of marital cohabitation in Germany and basic knowledge of German legal and social order."
  }
];

export const DIAGNOSTIC_READING_QUESTIONS: DiagnosticReadingQuestion[] = [
  {
    id: "diag-read-1",
    taskType: "Globalverstehen (Main Idea)",
    textSnippet: "Liebe Kundinnen und Kunden, wegen dringender Renovierungsarbeiten bleibt unsere Filiale in der Bahnhofstraße vom 10. bis 17. November geschlossen. Dringende Postsendungen können Sie in unserer Partnerfiliale am Marktplatz abholen. Ab dem 18. November sind wir wieder wie gewohnt für Sie da.",
    question: "Was ist der Hauptgrund für diese Mitteilung?",
    options: [
      { key: "a", text: "Die Filiale öffnet dauerhaft an einem neuen Standort am Marktplatz.", isCorrect: false, explanation: "Falsch: Die Schließung ist nur vorübergehend wegen Renovierung." },
      { key: "b", text: "Die Postfiliale ist für eine Woche wegen Bauarbeiten geschlossen.", isCorrect: true, explanation: "Richtig: Vom 10. bis 17. November (1 Woche) geschlossen wegen Renovierungsarbeiten." },
      { key: "c", text: "Postsendungen können ab sofort gar nicht mehr abgeholt werden.", isCorrect: false, explanation: "Falsch: Man kann sie in der Partnerfiliale am Marktplatz abholen." }
    ],
    testedRule: "Global comprehension: recognizing time limits and primary purpose."
  },
  {
    id: "diag-read-2",
    taskType: "Detailverstehen (Negative Constraint Trap)",
    textSnippet: "Für die Teilnahme am B1-Kompaktkurs ist eine vorherige Anmeldung erforderlich. Die Kursgebühr von 240 Euro muss bis spätestens fünf Tage vor Kursbeginn überwiesen werden. Eine Barzahlung am ersten Kurstag ist leider nicht möglich. Bei Rücktritt bis zehn Tage vor Beginn wird die Gebühr vollständig erstattet.",
    question: "Welche Aussage über die Bezahlung ist zutreffend?",
    options: [
      { key: "a", text: "Teilnehmer dürfen die Kursgebühr am ersten Kurstag bar bezahlen.", isCorrect: false, explanation: "Falsch: Der Text sagt ausdrücklich: 'Eine Barzahlung ... ist leider nicht möglich'." },
      { key: "b", text: "Der Betrag muss mindestens fünf Tage vor dem Start per Überweisung bezahlt werden.", isCorrect: true, explanation: "Richtig: 'bis spätestens fünf Tage vor Kursbeginn überwiesen werden'." },
      { key: "c", text: "Nach der Anmeldung kann das Geld unter keinen Umständen erstattet werden.", isCorrect: false, explanation: "Falsch: Bei Rücktritt bis 10 Tage vorher wird die Gebühr vollständig erstattet." }
    ],
    testedRule: "Detail recognition: spotting absolute negative markers (nicht möglich)."
  },
  {
    id: "diag-read-3",
    taskType: "Konnektoren & Logik (weil vs obwohl)",
    textSnippet: "Herr Meier kommt heute später ins Büro, obwohl er gestern bis spät in die Nacht an der Präsentation gearbeitet hat und heute einen wichtigen Termin mit dem Chef hat.",
    question: "Warum kommt Herr Meier später ins Büro?",
    options: [
      { key: "a", text: "Weil er gestern bis spät in die Nacht gearbeitet hat.", isCorrect: false, explanation: "Vorsicht Falle: Der Text benutzt 'obwohl' (Konzessiv), nicht 'weil'. Der genaue Grund für die Verspätung wird nicht genannt, aber er kommt trotz des Termins später." },
      { key: "b", text: "Der Text nennt keinen Grund; er kommt trotz seiner wichtigen Verpflichtungen später.", isCorrect: true, explanation: "Richtig: 'obwohl' drückt einen Gegensatz/Widerspruch aus, keinen Grund." },
      { key: "c", text: "Weil sein Chef den Termin abgesagt hat.", isCorrect: false, explanation: "Falsch: Er hat einen wichtigen Termin, der Chef hat nichts abgesagt." }
    ],
    testedRule: "Connector semantics: distinguishing causal (weil) from concessive (obwohl)."
  },
  {
    id: "diag-read-4",
    taskType: "Präpositionen & Kasus (Dativ vs Akkusativ)",
    textSnippet: "Nach dem Abschluss des Vertrags müssen die Dokumente sofort an das Finanzamt geschickt werden, damit die Steuererklärung bearbeitet werden kann.",
    question: "Welche Präposition im Text verlangt zwingend den Dativ?",
    options: [
      { key: "a", text: "an ('an das Finanzamt')", isCorrect: false, explanation: "Falsch: 'an' ist eine Wechselpräposition mit Akkusativ (Richtung/Wohin?)." },
      { key: "b", text: "Nach ('Nach dem Abschluss')", isCorrect: true, explanation: "Richtig: 'nach' verlangt immer ohne Ausnahme den Dativ (dem Abschluss)." },
      { key: "c", text: "für ('für die Steuererklärung')", isCorrect: false, explanation: "Falsch: 'für' verlangt immer den Akkusativ." }
    ],
    testedRule: "Preposition case mastery: fixed Dative prepositions (nach + dem)."
  },
  {
    id: "diag-read-5",
    taskType: "Anzeigen & Kriterienzuordnung (Matching)",
    textSnippet: "Suche ruhige 2-Zimmer-Wohnung in Uninähe für Nichtraucher. Maximal 750 Euro warm. Haustiere sind nicht erlaubt. Einzug ab 1. Januar möglich. Kaution: 2 Monatsmieten.",
    question: "Wer passt perfekt zu diesem Wohnungsangebot?",
    options: [
      { key: "a", text: "Ein Student mit einem kleinen Hund, der 700 Euro zahlen kann.", isCorrect: false, explanation: "Falsch: Haustiere sind ausdrücklich verboten." },
      { key: "b", text: "Eine alleinstehende Universitäts-Mitarbeiterin (Nichtraucherin) ohne Haustiere mit Budget 800 Euro.", isCorrect: true, explanation: "Richtig: Erfüllt alle Kriterien: Uninähe, Nichtraucherin, keine Haustiere, Budget ausreichend." },
      { key: "c", text: "Ein Raucher, der sofort zum 1. Dezember einziehen möchte.", isCorrect: false, explanation: "Falsch: Nur für Nichtraucher und erst ab 1. Januar frei." }
    ],
    testedRule: "Constraint satisfaction: checking all negative conditions in advertisements."
  }
];

export const DIAGNOSTIC_LISTENING_QUESTIONS: DiagnosticListeningQuestion[] = [
  {
    id: "diag-listen-1",
    speaker: "Ansage am Bahnhof",
    germanAudioScript: "Achtung an Gleis 4: Der Intercity nach Hamburg über Hannover, planmäßige Abfahrt um 14 Uhr 15, fällt heute wegen einer technischen Störung am Triebwagen aus. Reisende nach Hamburg nutzen bitte den ICE 572 um 14 Uhr 32 von Gleis 7.",
    question: "Was sollen Fahrgäste nach Hamburg tun?",
    options: [
      { key: "a", text: "An Gleis 4 auf den nächsten Intercity warten.", isCorrect: false, explanation: "Falsch: Der Zug fällt komplett aus." },
      { key: "b", text: "Um 14 Uhr 32 den ICE von Gleis 7 nehmen.", isCorrect: true, explanation: "Richtig: Der Sprecher verweist auf ICE 572 um 14:32 von Gleis 7." },
      { key: "c", text: "Zum Informationsschalter am Gleis 1 gehen.", isCorrect: false, explanation: "Falsch: Das wird in der Ansage nicht empfohlen." }
    ],
    testedSkill: "Audio detail extraction: alternative train and track instructions."
  },
  {
    id: "diag-listen-2",
    speaker: "Telefonische Nachricht (Zahnarztpraxis)",
    germanAudioScript: "Guten Tag Herr Schmidt, hier spricht die Praxis Dr. Weber. Wir müssen Ihren morgigen Kontrolltermin um 9 Uhr leider verschieben, da der Arzt krank ist. Könnten Sie stattdessen am Donnerstag um 15 Uhr kommen? Bitte rufen Sie uns kurz zurück.",
    question: "Warum ruft die Arzthelferin an?",
    options: [
      { key: "a", text: "Um den Patienten an seinen Termin morgen um 9 Uhr zu erinnern.", isCorrect: false, explanation: "Falsch: Der morgige Termin muss verschoben werden." },
      { key: "b", text: "Weil der Arzt erkrankt ist und ein neuer Termin vorgeschlagen wird.", isCorrect: true, explanation: "Richtig: Der Arzt ist krank und Donnerstag 15 Uhr wird vorgeschlagen." },
      { key: "c", text: "Um die Rechnung für die letzte Behandlung zu schicken.", isCorrect: false, explanation: "Falsch: Es geht ausschließlich um den Termin." }
    ],
    testedSkill: "Audio message gist: appointment cancellation reason."
  },
  {
    id: "diag-listen-3",
    speaker: "Gespräch im Supermarkt",
    germanAudioScript: "Entschuldigung, wissen Sie, wo ich laktosefreie Milch finde? - Ja sicher! Die normale Milch steht dort drüben bei der Kühlung, aber die laktosefreie Milch und die Bio-Produkte haben wir ganz hinten in Gang 12 neben dem Müsli einsortiert.",
    question: "Wo steht die laktosefreie Milch?",
    options: [
      { key: "a", text: "Direkt bei der normalen Milch in der Kühlung.", isCorrect: false, explanation: "Falsch: Dort steht nur die normale Milch." },
      { key: "b", text: "Ganz hinten in Gang 12 neben dem Müsli.", isCorrect: true, explanation: "Richtig: Sie steht in Gang 12 neben dem Müsli." },
      { key: "c", text: "An der Kasse im Eingangsbereich.", isCorrect: false, explanation: "Falsch: Wird nicht erwähnt." }
    ],
    testedSkill: "Distractor rejection: distinguishing normal milk from lactose-free milk."
  },
  {
    id: "diag-listen-4",
    speaker: "Radio-Wettermeldung",
    germanAudioScript: "Und nun zum Wetter für Nordrhein-Westfalen: Am Vormittag halten sich noch dichte Nebelfelder, ab Mittag setzt sich jedoch verbreitet die Sonne durch bei milden Temperaturen um 16 Grad. Erst am späten Abend zieht von Westen her neuer Regen auf.",
    question: "Wie wird das Wetter am Nachmittag?",
    options: [
      { key: "a", text: "Es regnet den ganzen Tag ununterbrochen.", isCorrect: false, explanation: "Falsch: Regen kommt erst am späten Abend." },
      { key: "b", text: "Es wird sonnig und mild mit etwa 16 Grad.", isCorrect: true, explanation: "Richtig: Ab Mittag setzt sich die Sonne durch bei 16 Grad." },
      { key: "c", text: "Es schneit und die Temperaturen sinken unter Null.", isCorrect: false, explanation: "Falsch: Es ist mild (16 Grad)." }
    ],
    testedSkill: "Temporal sequencing: identifying the weather for the specific afternoon window."
  },
  {
    id: "diag-listen-5",
    speaker: "Mitteilung im Büro",
    germanAudioScript: "Hallo Susanne, hast du die Quartalszahlen für das Meeting schon ausgedruckt? - Noch nicht, der Drucker im zweiten Stock hat kein Papier mehr. Ich gehe jetzt kurz ins Erdgeschoss, hole neues Papier und bringe die Unterlagen dann gleich in den Konferenzraum.",
    question: "Was macht die Kollegin als Nächstes?",
    options: [
      { key: "a", text: "Sie geht direkt in den Konferenzraum und wartet dort.", isCorrect: false, explanation: "Falsch: Sie muss zuerst Papier holen." },
      { key: "b", text: "Sie geht ins Erdgeschoss, um Druckerpapier zu holen.", isCorrect: true, explanation: "Richtig: 'Ich gehe jetzt kurz ins Erdgeschoss, hole neues Papier'." },
      { key: "c", text: "Sie ruft den Chef an und sagt das Meeting ab.", isCorrect: false, explanation: "Falsch: Das Meeting wird nicht abgesagt." }
    ],
    testedSkill: "Action order: identifying the immediate next step in a workflow."
  }
];

export const DIAGNOSTIC_WRITING_TASK: DiagnosticWritingTask = {
  id: "diag-write-1",
  prompt: "Schreiben Sie eine E-Mail an Ihren Sprachkursleiter Herrn Berg.",
  context: "Sie können am kommenden Freitag nicht am B1-Intensivkurs teilnehmen, weil Sie einen dringenden Termin bei der Ausländerbehörde haben.",
  requirements: [
    "Grund für Ihr Fehlen höflich erklären",
    "Um Hausaufgaben und Kursunterlagen bitten",
    "Einen Vorschlag machen, wie Sie den verpassten Stoff nachholen"
  ],
  sampleModelAnswer: "Sehr geehrter Herr Berg,\n\nich schreibe Ihnen diese E-Mail, weil ich am kommenden Freitag leider nicht am Deutschkurs teilnehmen kann. Ich habe an diesem Tag einen wichtigen Termin bei der Ausländerbehörde, den ich nicht verschieben konnte.\n\nKönnten Sie mir bitte die Hausaufgaben und die Arbeitsblätter per E-Mail schicken? Ich möchte den Unterrichtsstoff am Wochenende selbstständig nachholen. Außerdem habe ich mich mit meiner Mitschülerin Maria verabredet, damit wir die Grammatikübungen gemeinsam wiederholen.\n\nIch danke Ihnen für Ihr Verständnis und freue mich auf Ihre Rückmeldung.\n\nMit freundlichen Grüßen\n[Ihr Vorname und Nachname]",
  keyConnectors: ["weil", "dass", "damit", "könnten Sie", "deshalb", "obwohl"],
  rubricCriteria: [
    { criterion: "Salutation & Closing Formula", weight: 20, tip: "Must use 'Sehr geehrter Herr Berg,' and 'Mit freundlichen Grüßen'." },
    { criterion: "All 3 Content Points Addressed", weight: 30, tip: "Explain reason, ask for materials, and propose catch-up plan." },
    { criterion: "B1 Connectors & Subordinate Clauses", weight: 30, tip: "Use 'weil', 'damit', or 'obwohl' with correct verb-at-end position." },
    { criterion: "Polite Requests (Konjunktiv II)", weight: 20, tip: "Use 'Könnten Sie mir bitte...' rather than blunt imperatives." }
  ]
};

export const DIAGNOSTIC_SPEAKING_TASKS: DiagnosticSpeakingTask[] = [
  {
    id: "diag-speak-1",
    teil: 1,
    title: "Teil 1: Sich vorstellen (Kennenlernen)",
    prompt: "Stellen Sie sich in 6 vollständigen Sätzen vor: Name, Herkunft, Wohnort, Familie, Beruf/Ausbildung und Hobbys.",
    suggestedPhrases: [
      "Ich heiße... und komme aus...",
      "Seit [zwei Jahren] lebe ich in Deutschland in...",
      "Von Beruf bin ich Softwareentwickler / Ingenieur...",
      "In meiner Freizeit spiele ich gerne..."
    ],
    sampleTranscript: "Guten Tag, mein Name ist... Ich komme aus Indien und lebe seit zwei Jahren in Deutschland. Von Beruf bin ich Softwareentwickler. In meiner Freizeit spiele ich gern Fußball und lerne Deutsch.",
    evaluationTips: "Clear pronunciation of umlauts (ä, ö, ü) and correct verb position in position 2 ('Seit zwei Jahren lebe ich...')."
  },
  {
    id: "diag-speak-2",
    teil: 2,
    title: "Teil 2: Ein Thema präsentieren (Präsentation)",
    prompt: "Sprechen Sie 2 Minuten über das Thema: 'Brauchen Kinder eigene Smartphones?'. Strukturieren Sie Ihren Vortrag mit Einleitung, persönlicher Erfahrung, Situation im Heimatland, Vor- und Nachteilen und Ihrer Meinung.",
    suggestedPhrases: [
      "Das Thema meiner Präsentation lautet...",
      "In meinem persönlichen Leben habe ich die Erfahrung gemacht, dass...",
      "In meinem Heimatland ist die Situation so, dass...",
      "Ein großer Vorteil ist..., aber ein wesentlicher Nachteil ist...",
      "Meiner Meinung nach sollten Kinder erst ab 12 Jahren..."
    ],
    sampleTranscript: "Das Thema meiner kurzen Präsentation ist 'Smartphones für Kinder'. Ich habe dieses Thema gewählt, weil heute fast jedes Kind ein Handy besitzt. In meiner persönlichen Erfahrung lenkt das Smartphone beim Lernen oft ab. Ein Vorteil ist jedoch die ständige Erreichbarkeit im Notfall. Zusammenfassend denke ich, dass feste Bildschirmzeiten sehr wichtig sind.",
    evaluationTips: "Use all 5 structural markers. Do not recite a monologue without pauses; speak at a natural pace."
  },
  {
    id: "diag-speak-3",
    teil: 3,
    title: "Teil 3: Gemeinsam etwas planen (Aufgabe lösen)",
    prompt: "Planen Sie mit Ihrem Partner eine Abschiedsfeier für eine Kollegin, die die Firma verlässt. Machen Sie Vorschläge für Termin, Ort, Geschenk und Essen.",
    suggestedPhrases: [
      "Wie wäre es, wenn wir die Feier am Freitag nach der Arbeit machen?",
      "Ich schlage vor, dass wir alle zusammen für ein Geschenk sammeln.",
      "Das ist ein guter Vorschlag, aber vielleicht sollten wir auch...",
      "Gut, dann einigen wir uns darauf, dass wir..."
    ],
    sampleTranscript: "Hallo! Da unsere Kollegin Sarah nächste Woche die Firma verlässt, sollten wir eine kleine Abschiedsfeier organisieren. Wie wäre es, wenn wir uns am Freitagnachmittag im Aufenthaltsraum treffen? Ich könnte Kuchen mitbringen, und wir könnten gemeinsam Geld für einen Gutschein sammeln. Was hältst du davon?",
    evaluationTips: "Interactive turn-taking: ask for your partner's opinion and actively agree or disagree politely."
  }
];
'''

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content.strip() + "\n")

print(f"Successfully generated {output_path}")
