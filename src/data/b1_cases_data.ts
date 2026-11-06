export interface CaseDeclensionTable {
  caseName: "NOMINATIV" | "AKKUSATIV" | "DATIV" | "GENITIV";
  questionWord: string;
  coreFunction: string;
  examRelevance: string;
  articles: {
    masculine: { definite: string; indefinite: string; negative: string };
    feminine: { definite: string; indefinite: string; negative: string };
    neuter: { definite: string; indefinite: string; negative: string };
    plural: { definite: string; indefinite: string; negative: string };
  };
  sampleSentences: {
    de: string;
    en: string;
    highlight: string;
  }[];
  fixedPrepositions: string[];
  examPassHack: string;
}

export interface GenderSuffixRule {
  gender: "der" | "die" | "das";
  genderLabel: string;
  accuracy: string; // e.g. "100%" or "85%"
  suffixes: string[];
  examples: { de: string; en: string }[];
  examTip: string;
}

export interface CaseDrillQuestion {
  id: number;
  caseCategory: "NOMINATIV" | "AKKUSATIV" | "DATIV" | "GENITIV" | "WECHSELPRAEPOSITION" | "GENDER_RULE";
  prompt_de: string;
  prompt_en: string;
  correctAnswer: string;
  options: string[];
  explanation_de: string;
  explanation_en: string;
  ruleSchematic: string;
}

// ─── 1. THE 4 GERMAN CASES COMPLETE REFERENCE ───
export const GERMAN_CASES_DATA: CaseDeclensionTable[] = [
  {
    caseName: "NOMINATIV",
    questionWord: "Wer? / Was? (Who? / What?)",
    coreFunction: "The subject of the sentence - the person or thing performing the action.",
    examRelevance: "Every German sentence requires a subject in Nominativ. Conjugate verbs to match the Nominativ subject.",
    articles: {
      masculine: { definite: "der", indefinite: "ein", negative: "kein" },
      feminine: { definite: "die", indefinite: "eine", negative: "keine" },
      neuter: { definite: "das", indefinite: "ein", negative: "kein" },
      plural: { definite: "die", indefinite: "---", negative: "keine" }
    },
    sampleSentences: [
      {
        de: "Der neue Sachbearbeiter arbeitet sehr gründlich.",
        en: "The new clerk works very thoroughly.",
        highlight: "Der neue Sachbearbeiter (Subject = Nominativ maskulin)"
      },
      {
        de: "Eine Kündigung muss schriftlich erfolgen.",
        en: "A termination notice must be made in writing.",
        highlight: "Eine Kündigung (Subject = Nominativ feminin)"
      }
    ],
    fixedPrepositions: ["als (in apposition: 'Er arbeitet als Arzt')"],
    examPassHack: "Verbs like 'sein' (to be) and 'werden' (to become) take a Nominativ predicate, NOT Akkusativ: 'Er ist ein guter Kollege' (NOT einen)."
  },
  {
    caseName: "AKKUSATIV",
    questionWord: "Wen? / Was? / Wohin? (Whom? / What? / Where to?)",
    coreFunction: "The direct object receiving the action, or direction/motion with two-way prepositions.",
    examRelevance: "Essential for 90% of everyday sentences. ONLY THE MASCULINE GENDER CHANGES in Akkusativ! Feminine, neuter, and plural stay identical to Nominativ.",
    articles: {
      masculine: { definite: "den", indefinite: "einen", negative: "keinen" },
      feminine: { definite: "die", indefinite: "eine", negative: "keine" },
      neuter: { definite: "das", indefinite: "ein", negative: "kein" },
      plural: { definite: "die", indefinite: "---", negative: "keine" }
    },
    sampleSentences: [
      {
        de: "Ich brauche einen neuen Reisepass für die Einbürgerung.",
        en: "I need a new passport for the naturalization.",
        highlight: "einen neuen Reisepass (Direct Object = Akkusativ maskulin: ein -> einen)"
      },
      {
        de: "Wir haben die Wohnung sofort besichtigt.",
        en: "We viewed the apartment immediately.",
        highlight: "die Wohnung (Akkusativ feminin: stays 'die')"
      }
    ],
    fixedPrepositions: ["bis", "durch", "für", "gegen", "ohne", "um (Mnemonic: DOGFU / FODGU)"],
    examPassHack: "Never think about feminine or neuter in Akkusativ! Only look at masculine nouns (der Mann -> den Mann, ein Vertrag -> einen Vertrag)."
  },
  {
    caseName: "DATIV",
    questionWord: "Wem? / Wo? (To whom? / Where at?)",
    coreFunction: "The indirect object (beneficiary or recipient), stationary location (Wo?), or after fixed Dativ prepositions.",
    examRelevance: "Heavy scoring differentiator in B1 letters and speaking. Examiners listen closely for 'mit dem Bus' and 'zu der / zur Arbeit'.",
    articles: {
      masculine: { definite: "dem", indefinite: "einem", negative: "keinem" },
      feminine: { definite: "der", indefinite: "einer", negative: "keiner" },
      neuter: { definite: "dem", indefinite: "einem", negative: "keinem" },
      plural: { definite: "den (+n)", indefinite: "--- (+n)", negative: "keinen (+n)" }
    },
    sampleSentences: [
      {
        de: "Könnten Sie mir bitte bei dem Antrag helfen?",
        en: "Could you please help me with the application?",
        highlight: "mir (Pronoun Dativ) + bei dem Antrag (Preposition Dativ maskulin)"
      },
      {
        de: "Ich wohne seit einem Jahr in dieser schönen Wohnung.",
        en: "I have been living in this beautiful flat for one year.",
        highlight: "seit einem Jahr (seit + Dativ) + in dieser Wohnung (Wo? = Dativ)"
      }
    ],
    fixedPrepositions: ["aus", "bei", "mit", "nach", "seit", "von", "zu", "ab (Mnemonic: Aus, bei, mit, nach, seit, von, zu: Dativ immer im Nu!)"],
    examPassHack: "All plural nouns in Dativ take an extra '-n' at the end if they don't already end in -n or -s: mit den Kindern, seit zwei Jahren."
  },
  {
    caseName: "GENITIV",
    questionWord: "Wessen? (Whose?)",
    coreFunction: "Expresses possession, belonging, or used after formal bureaucratic prepositions (während, wegen, trotz).",
    examRelevance: "You DO NOT need to speak fluent Genitiv to pass B1! You only need to recognize it in reading notices, formal letters, and the Citizenship Test.",
    articles: {
      masculine: { definite: "des (+s/-es)", indefinite: "eines (+s/-es)", negative: "keines (+s/-es)" },
      feminine: { definite: "der", indefinite: "einer", negative: "keiner" },
      neuter: { definite: "des (+s/-es)", indefinite: "eines (+s/-es)", negative: "keines (+s/-es)" },
      plural: { definite: "der", indefinite: "---", negative: "keiner" }
    },
    sampleSentences: [
      {
        de: "Wegen des Feiertags bleibt das Bürgeramt am Montag geschlossen.",
        en: "Due to the public holiday, the citizens' registration office remains closed on Monday.",
        highlight: "Wegen des Feiertags (Genitiv maskulin: des + Feiertag-s)"
      },
      {
        de: "Während des Deutschkurses lernen wir viele neue Grammatikregeln.",
        en: "During the German course, we learn many new grammar rules.",
        highlight: "Während des Deutschkurses (während + Genitiv: des Kurs-es)"
      }
    ],
    fixedPrepositions: ["während (during)", "wegen (because of / due to)", "trotz (in spite of / despite)", "statt / anstelle (instead of)", "innerhalb (inside of)", "außerhalb (outside of)"],
    examPassHack: "Genitiv is tested repeatedly in reading announcements ('Wegen Umbau des Geschäfts...', 'Während der Öffnungszeiten...'). Recognize 'des/der' + noun with '-s'!"
  }
];

// ─── 2. GENDER DECODER: DER / DIE / DAS RULES ───
export const GENDER_SUFFIX_RULES: GenderSuffixRule[] = [
  {
    gender: "die",
    genderLabel: "Feminine (die / eine)",
    accuracy: "100% Guaranteed",
    suffixes: ["-ung", "-heit", "-keit", "-schaft", "-ion", "-tät", "-ie", "-ik"],
    examples: [
      { de: "die Wohnung (flat)", en: "ends in -ung" },
      { de: "die Rechnung (bill / invoice)", en: "ends in -ung" },
      { de: "die Gesundheit (health)", en: "ends in -heit" },
      { de: "die Möglichkeit (possibility)", en: "ends in -keit" },
      { de: "die Freundschaft (friendship)", en: "ends in -schaft" },
      { de: "die Information (information)", en: "ends in -ion" },
      { de: "die Universität (university)", en: "ends in -tät" },
      { de: "die Politik (politics)", en: "ends in -ik" }
    ],
    examTip: "If a B1 noun ends in -ung, -heit, -keit, -schaft, or -ion, it is ALWAYS 'die'! This single rule gets you 40% of all noun genders right on the exam."
  },
  {
    gender: "das",
    genderLabel: "Neuter (das / ein)",
    accuracy: "98% Reliable",
    suffixes: ["-chen", "-lein", "-ment", "-um", "-tum", "Infinitiv als Nomen"],
    examples: [
      { de: "das Mädchen (girl)", en: "diminutive suffix -chen" },
      { de: "das Brötchen (bread roll)", en: "diminutive suffix -chen" },
      { de: "das Dokument (document)", en: "ends in -ment" },
      { de: "das Medikament (medication)", en: "ends in -ment" },
      { de: "das Datum (date)", en: "ends in -um" },
      { de: "das Zentrum (city center)", en: "ends in -um" },
      { de: "das Essen / das Leben", en: "nominalized infinitive (verb used as noun)" }
    ],
    examTip: "All words ending in -chen, -ment, or -um are neuter ('das'). Any verb turned into a noun (das Lernen, das Sprechen) is always 'das'!"
  },
  {
    gender: "der",
    genderLabel: "Masculine (der / ein)",
    accuracy: "85% High Frequency",
    suffixes: ["-er (male agent/tool)", "-or", "-ling", "-ismus", "-ist"],
    examples: [
      { de: "der Lehrer (male teacher)", en: "male profession -er" },
      { de: "der Drucker (printer)", en: "tool/machine -er" },
      { de: "der Motor (engine)", en: "ends in -or" },
      { de: "der Optimismus (optimism)", en: "ends in -ismus" },
      { de: "der Spezialist (specialist)", en: "ends in -ist" }
    ],
    examTip: "Days of the week (der Montag), months (der Januar), seasons (der Sommer), and compass points (der Norden) are always masculine ('der')!"
  }
];

// ─── 3. WECHSELPRAEPOSITIONEN (TWO-WAY PREPOSITIONS) ───
export const WECHSELPRAEPOSITIONEN_DATA = {
  prepositions: ["an", "auf", "hinter", "in", "neben", "über", "unter", "vor", "zwischen"],
  ruleWohin: {
    question: "Wohin? (Where to?)",
    case: "AKKUSATIV",
    concept: "Action, motion, direction, change of location",
    formula: "Subjekt + Verb der Bewegung + Präposition + AKKUSATIV",
    sample: "Ich stelle das Glas auf den Tisch (maskulin: der -> den)."
  },
  ruleWo: {
    question: "Wo? (Where at?)",
    case: "DATIV",
    concept: "Position, rest, stationary location, state",
    formula: "Subjekt + Verb der Ruhe + Präposition + DATIV",
    sample: "Das Glas steht auf dem Tisch (maskulin: der -> dem)."
  },
  pairedVerbs: [
    { movement: "stellen (to place upright + Akk)", state: "stehen (to stand + Dat)" },
    { movement: "legen (to lay flat + Akk)", state: "liegen (to lie + Dat)" },
    { movement: "setzen (to sit someone + Akk)", state: "sitzen (to be seated + Dat)" },
    { movement: "hängen (to hang something + Akk)", state: "hängen (to be hanging + Dat)" }
  ]
};

// ─── 4. INTERACTIVE 36-QUESTION CASES DRILL BANK ───
export const CASES_DRILL_QUESTIONS: CaseDrillQuestion[] = [
  {
    id: 1,
    caseCategory: "AKKUSATIV",
    prompt_de: "Ergänzen Sie den richtigen Artikel: 'Ich habe gestern ___ neuen Mietvertrag unterschrieben.'",
    prompt_en: "Complete the correct article: 'I signed the new rental contract yesterday.'",
    correctAnswer: "den",
    options: ["dem", "den", "der", "des"],
    explanation_de: "'Mietvertrag' ist maskulin (der Vertrag). 'unterschreiben' verlangt ein direktes Objekt im Akkusativ: der -> den.",
    explanation_en: "'Mietvertrag' is masculine. The verb 'unterschreiben' takes an Accusative direct object: der -> den.",
    ruleSchematic: "[Akkusativ maskulin] = den neuen Mietvertrag."
  },
  {
    id: 2,
    caseCategory: "DATIV",
    prompt_de: "Ergänzen Sie nach der festen Dativ-Präposition: 'Ich fahre jeden Morgen mit ___ Straßenbahn.'",
    prompt_en: "Complete after the fixed Dative preposition: 'I take the tram every morning.'",
    correctAnswer: "der",
    options: ["die", "den", "der", "dem"],
    explanation_de: "'mit' verlangt immer Dativ! 'Straßenbahn' ist feminin (die Straßenbahn). Im Dativ wird 'die' zu 'der'.",
    explanation_en: "'mit' always requires Dative! 'Straßenbahn' is feminine (die). In Dative, 'die' becomes 'der'.",
    ruleSchematic: "[mit + Dativ feminin] = mit der Straßenbahn."
  },
  {
    id: 3,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wohin stellen Sie den Stuhl? 'Ich stelle den Stuhl in ___ Ecke.'",
    prompt_en: "Where are you putting the chair? 'I am putting the chair in the corner.'",
    correctAnswer: "die",
    options: ["der", "die", "den", "dem"],
    explanation_de: "Frage 'Wohin?' (Richtung/Aktion mit 'stellen') verlangt Akkusativ. 'Ecke' ist feminin: die Ecke bleibt 'die'.",
    explanation_en: "Question 'Wohin?' (direction with 'stellen') requires Accusative. Feminine stays 'die'.",
    ruleSchematic: "[Wohin? -> Akkusativ feminin] = in die Ecke."
  },
  {
    id: 4,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wo steht der Stuhl jetzt? 'Der Stuhl steht in ___ Ecke.'",
    prompt_en: "Where is the chair standing now? 'The chair stands in the corner.'",
    correctAnswer: "der",
    options: ["die", "der", "den", "dem"],
    explanation_de: "Frage 'Wo?' (Ruhe/Position mit 'stehen') verlangt Dativ. 'die Ecke' wird im Dativ zu 'der Ecke'.",
    explanation_en: "Question 'Wo?' (location with 'stehen') requires Dative. 'die Ecke' becomes 'der Ecke'.",
    ruleSchematic: "[Wo? -> Dativ feminin] = in der Ecke."
  },
  {
    id: 5,
    caseCategory: "GENITIV",
    prompt_de: "Im Behördenaushang: 'Wegen ___ Umbaus bleibt die Zulassungsstelle heute geschlossen.'",
    prompt_en: "Notice on authority door: 'Due to renovation, the registration office remains closed today.'",
    correctAnswer: "des",
    options: ["dem", "den", "des", "der"],
    explanation_de: "'wegen' ist eine Genitiv-Präposition. 'Umbau' ist maskulin: 'des Umbaus' (mit Endung -s am Nomen).",
    explanation_en: "'wegen' takes Genitive. 'Umbau' is masculine: 'des Umbaus' (with -s ending on noun).",
    ruleSchematic: "[wegen + Genitiv maskulin] = wegen des Umbaus."
  },
  {
    id: 6,
    caseCategory: "GENDER_RULE",
    prompt_de: "Welchen Artikel hat das Wort 'die Bescheinigung' und warum?",
    prompt_en: "Which article does 'Bescheinigung' have and why?",
    correctAnswer: "die, weil alle Nomen auf die Endung '-ung' zu 100% feminin sind.",
    options: [
      "die, weil alle Nomen auf die Endung '-ung' zu 100% feminin sind.",
      "der, weil es ein deutsches Schriftstück ist.",
      "das, weil es von einem Verb abstammt."
    ],
    explanation_de: "Goldene Endungsregel: Nomen mit '-ung' (Wohnung, Bescheinigung, Rechnung, Kündigung) sind ausnahmslos 'die'!",
    explanation_en: "Golden suffix rule: Nouns ending in '-ung' are without exception feminine ('die')!",
    ruleSchematic: "Suffix -ung = immer 'die'."
  },
  {
    id: 7,
    caseCategory: "DATIV",
    prompt_de: "Plural im Dativ: 'Herr Müller hilft ___ Nachbarn.'",
    prompt_en: "Plural in Dative: 'Mr. Müller helps the neighbors.'",
    correctAnswer: "den",
    options: ["die", "den", "der", "des"],
    explanation_de: "'helfen' verlangt Dativ. Im Plural heißt der bestimmte Dativartikel immer 'den' (den Nachbarn).",
    explanation_en: "'helfen' requires Dative. In plural, the definite Dative article is always 'den'.",
    ruleSchematic: "[helfen + Dativ Plural] = den Nachbarn."
  },
  {
    id: 8,
    caseCategory: "AKKUSATIV",
    prompt_de: "Welcher Satz mit der festen Akkusativ-Präposition 'für' ist korrekt?",
    prompt_en: "Which sentence with fixed Accusative preposition 'für' is correct?",
    correctAnswer: "Das Dokument ist für meinen neuen Arbeitgeber.",
    options: [
      "Das Dokument ist für meinem neuen Arbeitgeber.",
      "Das Dokument ist für meinen neuen Arbeitgeber.",
      "Das Dokument ist für mein neuer Arbeitgeber."
    ],
    explanation_de: "'für' verlangt immer Akkusativ: 'mein neuer Arbeitgeber' (maskulin) wird zu 'meinen neuen Arbeitgeber'.",
    explanation_en: "'für' strictly demands Accusative: masculine becomes 'meinen neuen Arbeitgeber'.",
    ruleSchematic: "[für + Akkusativ maskulin] = für meinen neuen Arbeitgeber."
  },
  {
    id: 9,
    caseCategory: "DATIV",
    prompt_de: "Ergänzen Sie mit 'zu' + Artikel: 'Wann gehst du heute ___ Arzt?'",
    prompt_en: "Complete with 'zu' + article: 'When are you going to the doctor today?'",
    correctAnswer: "zum (zu + dem)",
    options: ["zur", "zum (zu + dem)", "in den", "zu den"],
    explanation_de: "'zu' verlangt Dativ. 'Arzt' ist maskulin (der Arzt -> dem Arzt). 'zu + dem' verschmilzt zu 'zum'.",
    explanation_en: "'zu' takes Dative. 'Arzt' is masculine (dem Arzt). 'zu + dem' merges into 'zum'.",
    ruleSchematic: "zu + dem = zum Arzt."
  },
  {
    id: 10,
    caseCategory: "NOMINATIV",
    prompt_de: "Warum steht 'ein guter Freund' im Nominativ: 'Er ist ___ guter Freund von mir.'",
    prompt_en: "Why is 'ein guter Freund' in Nominative in: 'He is a good friend of mine.'",
    correctAnswer: "ein",
    options: ["einen", "ein", "einem", "eines"],
    explanation_de: "Prüfungsfalle: Das Verb 'sein' (ist) verbindet zwei Nominative (Prädikatsnomen), niemals Akkusativ!",
    explanation_en: "Exam trap: The verb 'sein' (ist) links two Nominative nouns, never an Accusative object!",
    ruleSchematic: "[sein + Nominativ maskulin] = ein guter Freund."
  },
  {
    id: 11,
    caseCategory: "GENITIV",
    prompt_de: "Im Fahrplanaushang: 'Während ___ Sommermonate fahren zusätzliche Busse an den See.'",
    prompt_en: "On timetable notice: 'During the summer months, additional buses run to the lake.'",
    correctAnswer: "der",
    options: ["den", "der", "des", "die"],
    explanation_de: "'während' verlangt Genitiv. 'Monate' ist Plural: Der Genitiv Plural lautet 'der Sommermonate'.",
    explanation_en: "'während' takes Genitive. 'Monate' is plural: Genitive plural is 'der Sommermonate'.",
    ruleSchematic: "[während + Genitiv Plural] = während der Sommermonate."
  },
  {
    id: 12,
    caseCategory: "GENDER_RULE",
    prompt_de: "Welchen Artikel hat das Wort 'das Dokument' und warum?",
    prompt_en: "Which article does 'Dokument' have and why?",
    correctAnswer: "das, weil Nomen mit der Endung '-ment' zu 98% neutral sind.",
    options: [
      "das, weil Nomen mit der Endung '-ment' zu 98% neutral sind.",
      "der, weil es männlich klingt.",
      "die, weil es wie Information eine Mitteilung ist."
    ],
    explanation_de: "Nomen mit den Endungen '-ment' (Dokument, Medikament, Instrument) oder '-um' (Zentrum, Datum) sind 'das'!",
    explanation_en: "Nouns ending in '-ment' (Dokument, Medikament) or '-um' (Zentrum, Datum) are neuter ('das')!",
    ruleSchematic: "Suffix -ment / -um = immer 'das'."
  },
  {
    id: 13,
    caseCategory: "DATIV",
    prompt_de: "Zeitangabe mit 'seit': 'Frau Yilmaz wohnt seit ___ Jahr in Deutschland.'",
    prompt_en: "Time expression with 'seit': 'Ms. Yilmaz has lived in Germany for one year.'",
    correctAnswer: "einem",
    options: ["ein", "einen", "einem", "einer"],
    explanation_de: "'seit' verlangt immer Dativ! 'Jahr' ist neutral (das Jahr). Im Dativ unbestimmt: 'einem Jahr'.",
    explanation_en: "'seit' strictly requires Dative! 'Jahr' is neuter (das Jahr). Indefinite Dative: 'einem Jahr'.",
    ruleSchematic: "[seit + Dativ neutral] = seit einem Jahr."
  },
  {
    id: 14,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wohin legst du das Buch? 'Ich lege das Buch auf ___ Tisch.'",
    prompt_en: "Where are you placing the book? 'I am placing the book on the table.'",
    correctAnswer: "den",
    options: ["dem", "den", "der", "das"],
    explanation_de: "'legen' ist eine Aktion/Bewegung (Wohin? -> Akkusativ). 'Tisch' ist maskulin (der Tisch -> den Tisch).",
    explanation_en: "'legen' is movement/action (Wohin? -> Accusative). 'Tisch' is masculine (der -> den).",
    ruleSchematic: "[legen + auf + Akkusativ maskulin] = auf den Tisch."
  },
  {
    id: 15,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wo liegt das Buch jetzt? 'Das Buch liegt auf ___ Tisch.'",
    prompt_en: "Where is the book lying now? 'The book lies on the table.'",
    correctAnswer: "dem",
    options: ["den", "dem", "der", "des"],
    explanation_de: "'liegen' beschreibt einen Zustand (Wo? -> Dativ). 'Tisch' ist maskulin (der Tisch -> dem Tisch).",
    explanation_en: "'liegen' describes a stationary state (Wo? -> Dative). Masculine becomes 'dem Tisch'.",
    ruleSchematic: "[liegen + auf + Dativ maskulin] = auf dem Tisch."
  },
  {
    id: 16,
    caseCategory: "AKKUSATIV",
    prompt_de: "Verneinung im Akkusativ: 'Ich habe heute leider ___ Termin bekommen.'",
    prompt_en: "Negation in Accusative: 'Unfortunately I did not get an appointment today.'",
    correctAnswer: "keinen",
    options: ["kein", "keinen", "keinem", "keiner"],
    explanation_de: "'Termin' ist maskulin (der Termin). Bei 'bekommen' steht das Nomen im Akkusativ: kein -> keinen Termin.",
    explanation_en: "'Termin' is masculine (der). With 'bekommen', it takes Accusative: kein -> keinen Termin.",
    ruleSchematic: "[Akkusativ maskulin Negation] = keinen Termin."
  },
  {
    id: 17,
    caseCategory: "GENITIV",
    prompt_de: "Citizenship Test Phrase: 'Im Namen ___ Bundesrepublik Deutschland.'",
    prompt_en: "Citizenship Test Phrase: 'In the name of the Federal Republic of Germany.'",
    correctAnswer: "der",
    options: ["die", "der", "des", "dem"],
    explanation_de: "'Bundesrepublik' ist feminin (die Republik). Im Genitiv lautet der Artikel 'der Bundesrepublik Deutschland'.",
    explanation_en: "'Bundesrepublik' is feminine. In Genitive, the article is 'der Bundesrepublik Deutschland'.",
    ruleSchematic: "[Im Namen + Genitiv feminin] = im Namen der Bundesrepublik."
  },
  {
    id: 18,
    caseCategory: "DATIV",
    prompt_de: "Ergänzen Sie mit 'bei' + Artikel: 'Herr Becker arbeitet bei ___ Firma Bosch.'",
    prompt_en: "Complete with 'bei' + article: 'Mr. Becker works at the company Bosch.'",
    correctAnswer: "der",
    options: ["die", "der", "den", "dem"],
    explanation_de: "'bei' verlangt Dativ. 'Firma' ist feminin (die Firma). Im Dativ wird 'die' zu 'der Firma'.",
    explanation_en: "'bei' takes Dative. 'Firma' is feminine (die). In Dative, 'die' becomes 'der Firma'.",
    ruleSchematic: "[bei + Dativ feminin] = bei der Firma."
  },
  {
    id: 19,
    caseCategory: "GENDER_RULE",
    prompt_de: "Welchen Artikel haben die Wochentage wie Montag, Dienstag, Mittwoch?",
    prompt_en: "Which article do days of the week like Monday, Tuesday, Wednesday have?",
    correctAnswer: "immer 'der' (der Montag, der Dienstag...)",
    options: [
      "immer 'der' (der Montag, der Dienstag...)",
      "immer 'das' (das Montag)",
      "immer 'die' (die Montag)"
    ],
    explanation_de: "Alle Wochentage, Monate (der Januar) und Jahreszeiten (der Sommer, der Winter) sind ausnahmslos maskulin ('der').",
    explanation_en: "All days of the week, months, and seasons are without exception masculine ('der').",
    ruleSchematic: "Wochentage & Monate = immer 'der'."
  },
  {
    id: 20,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wohin hängst du das Bild? 'Ich hänge das Bild an ___ Wand.'",
    prompt_en: "Where are you hanging the picture? 'I am hanging the picture on the wall.'",
    correctAnswer: "die",
    options: ["der", "die", "den", "dem"],
    explanation_de: "'hängen' als Handlung (Wohin?) verlangt Akkusativ. 'Wand' ist feminin: 'die Wand' bleibt 'die'.",
    explanation_en: "'hängen' as an action (Wohin?) takes Accusative. Feminine remains 'die Wand'.",
    ruleSchematic: "[hängen (Aktion) + an + Akkusativ feminin] = an die Wand."
  },
  {
    id: 21,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wo hängt das Bild jetzt? 'Das Bild hängt an ___ Wand.'",
    prompt_en: "Where is the picture hanging now? 'The picture hangs on the wall.'",
    correctAnswer: "der",
    options: ["die", "der", "dem", "den"],
    explanation_de: "'hängen' als Zustand (Wo?) verlangt Dativ. 'die Wand' wird im Dativ zu 'der Wand'.",
    explanation_en: "'hängen' as a state (Wo?) takes Dative. 'die Wand' becomes 'der Wand' in Dative.",
    ruleSchematic: "[hängen (Zustand) + an + Dativ feminin] = an der Wand."
  },
  {
    id: 22,
    caseCategory: "AKKUSATIV",
    prompt_de: "Welcher Satz verwendet das Akkusativ-Fragewort 'Wen?' richtig?",
    prompt_en: "Which sentence uses the Accusative question word 'Wen?' correctly?",
    correctAnswer: "Wen hast du gestern auf dem Bürgeramt getroffen?",
    options: [
      "Wen hast du gestern auf dem Bürgeramt getroffen?",
      "Wer hast du gestern auf dem Bürgeramt getroffen?",
      "Wem hast du gestern auf dem Bürgeramt getroffen?"
    ],
    explanation_de: "'treffen' verlangt ein Akkusativobjekt: Wenn man nach einer Person fragt, heißt es 'Wen?' (Wen hast du getroffen?).",
    explanation_en: "'treffen' governs an Accusative object: Asking for a person in Accusative is 'Wen?'.",
    ruleSchematic: "[Akkusativ Person Fragewort] = Wen?"
  },
  {
    id: 23,
    caseCategory: "DATIV",
    prompt_de: "Welcher Satz verwendet das Dativ-Fragewort 'Wem?' richtig?",
    prompt_en: "Which sentence uses the Dative question word 'Wem?' correctly?",
    correctAnswer: "Wem gehört dieses rote Auto vor der Ausfahrt?",
    options: [
      "Wem gehört dieses rote Auto vor der Ausfahrt?",
      "Wen gehört dieses rote Auto vor der Ausfahrt?",
      "Wer gehört dieses rote Auto vor der Ausfahrt?"
    ],
    explanation_de: "'gehören' verlangt immer Dativ: Die Frage nach der Person lautet 'Wem gehört das?'.",
    explanation_en: "'gehören' always takes Dative: Asking for the person in Dative is 'Wem gehört das?'.",
    ruleSchematic: "[gehören + Dativ Fragewort] = Wem?"
  },
  {
    id: 24,
    caseCategory: "GENITIV",
    prompt_de: "B1-Schreiben Formel: 'Trotz ___ schwierigen Situation bedanke ich mich herzlich.'",
    prompt_en: "B1 letter formula: 'Despite the difficult situation, I thank you warmly.'",
    correctAnswer: "der",
    options: ["die", "der", "dem", "den"],
    explanation_de: "'trotz' verlangt Genitiv. 'Situation' ist feminin (die Situation). Im Genitiv heißt es 'trotz der schwierigen Situation'.",
    explanation_en: "'trotz' takes Genitive. 'Situation' is feminine (die). In Genitive it is 'trotz der Situation'.",
    ruleSchematic: "[trotz + Genitiv feminin] = trotz der Situation."
  },
  {
    id: 25,
    caseCategory: "GENDER_RULE",
    prompt_de: "Welchen Artikel hat das Wort 'die Möglichkeit' (possibility) und warum?",
    prompt_en: "Which article does 'Möglichkeit' have and why?",
    correctAnswer: "die, weil Nomen mit der Endung '-keit' zu 100% feminin sind.",
    options: [
      "die, weil Nomen mit der Endung '-keit' zu 100% feminin sind.",
      "das, weil es eine abstrakte Idee ist.",
      "der, weil es von 'möglich' kommt."
    ],
    explanation_de: "Die Endungen '-keit' (Möglichkeit, Pünktlichkeit, Sauberkeit) sind ausnahmslos feminin ('die').",
    explanation_en: "Suffixes '-keit' (Möglichkeit, Pünktlichkeit) are without exception feminine ('die').",
    ruleSchematic: "Suffix -keit = immer 'die'."
  },
  {
    id: 26,
    caseCategory: "DATIV",
    prompt_de: "Ergänzen Sie mit 'nach' + Artikel: 'Nach ___ Deutschkurs gehe ich einkaufen.'",
    prompt_en: "Complete with 'nach' + article: 'After the German course, I go shopping.'",
    correctAnswer: "dem",
    options: ["den", "dem", "der", "des"],
    explanation_de: "'nach' verlangt Dativ. 'Deutschkurs' ist maskulin (der Kurs -> dem Kurs).",
    explanation_en: "'nach' requires Dative. 'Deutschkurs' is masculine (der Kurs -> dem Kurs).",
    ruleSchematic: "[nach + Dativ maskulin] = nach dem Deutschkurs."
  },
  {
    id: 27,
    caseCategory: "AKKUSATIV",
    prompt_de: "Feste Akkusativ-Präposition 'ohne': 'Ohne ___ Personalausweis kann der Antrag nicht bearbeitet werden.'",
    prompt_en: "Fixed Accusative preposition 'ohne': 'Without an ID card, the application cannot be processed.'",
    correctAnswer: "einen",
    options: ["einem", "einen", "ein", "einer"],
    explanation_de: "'ohne' verlangt ausnahmslos Akkusativ! 'Personalausweis' ist maskulin: ein -> einen Ausweis.",
    explanation_en: "'ohne' strictly requires Accusative! 'Personalausweis' is masculine: ein -> einen Ausweis.",
    ruleSchematic: "[ohne + Akkusativ maskulin] = ohne einen Ausweis."
  },
  {
    id: 28,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Er setzt sich: 'Herr Schmidt setzt sich auf ___ Stuhl.'",
    prompt_en: "He sits down: 'Mr. Schmidt sits down on the chair.'",
    correctAnswer: "den",
    options: ["dem", "den", "der", "das"],
    explanation_de: "'sich setzen' ist eine Bewegung/Aktion (Wohin? -> Akkusativ). 'Stuhl' ist maskulin: der -> den Stuhl.",
    explanation_en: "'sich setzen' is a motion/action (Wohin? -> Accusative). Masculine becomes 'den Stuhl'.",
    ruleSchematic: "[sich setzen + auf + Akkusativ maskulin] = auf den Stuhl."
  },
  {
    id: 29,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Er sitzt bereits: 'Herr Schmidt sitzt auf ___ Stuhl.'",
    prompt_en: "He is already seated: 'Mr. Schmidt sits on the chair.'",
    correctAnswer: "dem",
    options: ["den", "dem", "der", "des"],
    explanation_de: "'sitzen' ist ein Ruhezustand (Wo? -> Dativ). 'Stuhl' ist maskulin: der -> dem Stuhl.",
    explanation_en: "'sitzen' is stationary rest (Wo? -> Dative). Masculine becomes 'dem Stuhl'.",
    ruleSchematic: "[sitzen + auf + Dativ maskulin] = auf dem Stuhl."
  },
  {
    id: 30,
    caseCategory: "GENDER_RULE",
    prompt_de: "Welchen Artikel hat das Wort 'die Gesundheit' (health) und warum?",
    prompt_en: "Which article does 'Gesundheit' have and why?",
    correctAnswer: "die, weil Nomen mit der Endung '-heit' zu 100% feminin sind.",
    options: [
      "die, weil Nomen mit der Endung '-heit' zu 100% feminin sind.",
      "das, weil Gesundheit neutral ist.",
      "der, weil es ein medizinischer Begriff ist."
    ],
    explanation_de: "Nomen auf '-heit' (Gesundheit, Krankheit, Freiheit, Wahrheit) sind immer feminin ('die').",
    explanation_en: "Nouns ending in '-heit' (Gesundheit, Krankheit, Freiheit) are always feminine ('die').",
    ruleSchematic: "Suffix -heit = immer 'die'."
  },
  {
    id: 31,
    caseCategory: "DATIV",
    prompt_de: "Dativ-Verb 'antworten': 'Bitte antworten Sie ___ Vermieterin bis Freitag.'",
    prompt_en: "Dative verb 'antworten': 'Please reply to the landlady by Friday.'",
    correctAnswer: "der",
    options: ["die", "der", "den", "dem"],
    explanation_de: "'antworten' verlangt das Dativobjekt für die Person: 'die Vermieterin' wird zu 'der Vermieterin'.",
    explanation_en: "'antworten' requires a Dative person object: 'die Vermieterin' becomes 'der Vermieterin'.",
    ruleSchematic: "[antworten + Dativ feminin] = der Vermieterin."
  },
  {
    id: 32,
    caseCategory: "AKKUSATIV",
    prompt_de: "Akkusativ-Präposition 'um': 'Die Touristen gehen um ___ Marktplatz herum.'",
    prompt_en: "Accusative preposition 'um': 'The tourists walk around the marketplace.'",
    correctAnswer: "den",
    options: ["dem", "den", "der", "des"],
    explanation_de: "'um' verlangt immer Akkusativ. 'Marktplatz' ist maskulin: der -> den Marktplatz.",
    explanation_en: "'um' strictly requires Accusative. 'Marktplatz' is masculine: der -> den Marktplatz.",
    ruleSchematic: "[um + Akkusativ maskulin] = um den Marktplatz."
  },
  {
    id: 33,
    caseCategory: "GENITIV",
    prompt_de: "Im Mietvertrag: 'Die Kosten ___ Heizung sind in den Nebenkosten enthalten.'",
    prompt_en: "In the lease: 'The costs of heating are included in the utilities.'",
    correctAnswer: "der",
    options: ["die", "der", "des", "den"],
    explanation_de: "Zugehörigkeit (Genitiv): 'Heizung' ist feminin (die Heizung). Im Genitiv lautet der Artikel 'der Heizung'.",
    explanation_en: "Possession (Genitive): 'Heizung' is feminine (die). In Genitive, the article is 'der Heizung'.",
    ruleSchematic: "[Kosten + Genitiv feminin] = Kosten der Heizung."
  },
  {
    id: 34,
    caseCategory: "DATIV",
    prompt_de: "Ergänzen Sie mit 'von' + Artikel: 'Ich habe einen Brief von ___ Bürgeramt erhalten.'",
    prompt_en: "Complete with 'von' + article: 'I received a letter from the citizens' office.'",
    correctAnswer: "dem (vom)",
    options: ["dem (vom)", "das", "den", "der"],
    explanation_de: "'von' verlangt Dativ. 'Bürgeramt' ist neutral (das Amt -> dem Amt). 'von + dem' wird meist zu 'vom'.",
    explanation_en: "'von' requires Dative. 'Bürgeramt' is neuter (das Amt -> dem Amt). 'von + dem' usually merges to 'vom'.",
    ruleSchematic: "von + dem = vom Bürgeramt."
  },
  {
    id: 35,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wohin gehst du? 'Ich gehe heute Abend in ___ Supermarkt.'",
    prompt_en: "Where are you going? 'I am going into the supermarket this evening.'",
    correctAnswer: "den",
    options: ["dem", "den", "der", "das"],
    explanation_de: "Frage 'Wohin?' (Richtung/Ziel mit 'gehen') verlangt Akkusativ: der Supermarkt -> den Supermarkt.",
    explanation_en: "Question 'Wohin?' (direction with 'gehen') takes Accusative: der Supermarkt -> den Supermarkt.",
    ruleSchematic: "[gehen + in + Akkusativ maskulin] = in den Supermarkt."
  },
  {
    id: 36,
    caseCategory: "WECHSELPRAEPOSITION",
    prompt_de: "Wo bist du jetzt? 'Ich bin gerade in ___ Supermarkt.'",
    prompt_en: "Where are you now? 'I am in the supermarket right now.'",
    correctAnswer: "dem (im)",
    options: ["den", "dem (im)", "der", "des"],
    explanation_de: "Frage 'Wo?' (Ort/Aufenthalt mit 'sein') verlangt Dativ: der Supermarkt -> dem Supermarkt ('in dem' = 'im').",
    explanation_en: "Question 'Wo?' (location with 'sein') takes Dative: der Supermarkt -> dem Supermarkt ('in dem' = 'im').",
    ruleSchematic: "in + dem = im Supermarkt."
  }
];

export interface ArticleWritingExercise {
  id: number;
  level: "A1" | "A2" | "B1";
  category: "AKKUSATIV" | "DATIV" | "GENITIV" | "WECHSEL" | "NEGATION";
  beforeText: string;
  blankAnswer: string;
  acceptableAnswers?: string[];
  afterText: string;
  targetWordPrompt: string; // e.g. "ein", "der", "kein"
  noun: string;
  gender: "maskulin" | "feminin" | "neutral" | "plural";
  caseName: "Nominativ" | "Akkusativ" | "Dativ" | "Genitiv";
  hint_de: string;
  hint_en: string;
  translation_en: string;
  examTip: string;
}

export const ARTICLE_WRITING_EXERCISES: ArticleWritingExercise[] = [
  {
    id: 1,
    level: "A1",
    category: "AKKUSATIV",
    beforeText: "Ich habe gestern",
    blankAnswer: "einen",
    afterText: "neuen Arbeitsvertrag unterschrieben.",
    targetWordPrompt: "ein",
    noun: "Arbeitsvertrag (der Vertrag)",
    gender: "maskulin",
    caseName: "Akkusativ",
    hint_de: "'haben' und 'unterschreiben' verlangen Akkusativ. Maskulin: ein -> einen.",
    hint_en: "'haben' and 'unterschreiben' trigger the Accusative case. Masculine: ein -> einen.",
    translation_en: "Yesterday I signed a new employment contract.",
    examTip: "Akkusativ maskulin (einen / den / keinen) is the most tested article transformation in B1 Writing."
  },
  {
    id: 2,
    level: "A1",
    category: "AKKUSATIV",
    beforeText: "Könnten Sie bitte",
    blankAnswer: "den",
    afterText: "Schlüssel beim Hausmeister abgeben?",
    targetWordPrompt: "der",
    noun: "Schlüssel (der Schlüssel)",
    gender: "maskulin",
    caseName: "Akkusativ",
    hint_de: "Direktes Objekt für 'abgeben' steht im Akkusativ: der Schlüssel -> den Schlüssel.",
    hint_en: "Direct object for 'abgeben' is Accusative: der Schlüssel -> den Schlüssel.",
    translation_en: "Could you please hand the key to the caretaker?",
    examTip: "In B1 request letters ('Könnten Sie bitte...'), remember to change 'der' to 'den'."
  },
  {
    id: 3,
    level: "A1",
    category: "DATIV",
    beforeText: "Ich fahre jeden Morgen mit",
    blankAnswer: "dem",
    afterText: "Bus zur Sprachschule.",
    targetWordPrompt: "der",
    noun: "Bus (der Bus)",
    gender: "maskulin",
    caseName: "Dativ",
    hint_de: "Die Präposition 'mit' verlangt immer Dativ! Maskulin: der -> dem.",
    hint_en: "The preposition 'mit' strictly requires Dative! Masculine: der -> dem.",
    translation_en: "I ride the bus to language school every morning.",
    examTip: "'mit dem Bus / Zug' is an automatic bonus point in speaking and writing modules."
  },
  {
    id: 4,
    level: "A2",
    category: "DATIV",
    beforeText: "Nach dem Unterricht gehe ich zu",
    blankAnswer: "der",
    afterText: "Ärztin in der Praxis.",
    targetWordPrompt: "die",
    noun: "Ärztin (die Ärztin)",
    gender: "feminin",
    caseName: "Dativ",
    hint_de: "'zu' verlangt immer Dativ! Feminin: die Ärztin -> der Ärztin (oft verkürzt zu 'zur').",
    hint_en: "'zu' always requires Dative! Feminine: die Ärztin -> der Ärztin.",
    translation_en: "After class I am going to the doctor at the clinic.",
    examTip: "In Dativ, feminine 'die' always changes to 'der'."
  },
  {
    id: 5,
    level: "A2",
    category: "DATIV",
    beforeText: "Ich helfe am Wochenende gerne",
    blankAnswer: "dem",
    afterText: "neuen Kollegen bei der Arbeit.",
    targetWordPrompt: "der",
    noun: "Kollege (der Kollege)",
    gender: "maskulin",
    caseName: "Dativ",
    hint_de: "Das Verb 'helfen' regiert immer den Dativ: der Kollege -> dem Kollegen.",
    hint_en: "The verb 'helfen' strictly takes Dative: der Kollege -> dem Kollegen.",
    translation_en: "On the weekend I gladly help the new colleague with work.",
    examTip: "Common B1 Dativ verbs: helfen, danken, antworten, gratulieren."
  },
  {
    id: 6,
    level: "A2",
    category: "WECHSEL",
    beforeText: "Bitte stellen Sie den Ordner auf",
    blankAnswer: "den",
    afterText: "Tisch im Konferenzraum.",
    targetWordPrompt: "der",
    noun: "Tisch (der Tisch)",
    gender: "maskulin",
    caseName: "Akkusativ",
    hint_de: "Wohin stellen? Richtung und Bewegung erfordern Akkusativ: der Tisch -> den Tisch.",
    hint_en: "Where to put it? Direction and action require Accusative: der Tisch -> den Tisch.",
    translation_en: "Please place the binder on the table in the conference room.",
    examTip: "Action verbs: stellen, legen, setzen -> Akkusativ (Wohin?)."
  },
  {
    id: 7,
    level: "A2",
    category: "WECHSEL",
    beforeText: "Die wichtigen Dokumente liegen bereits auf",
    blankAnswer: "dem",
    afterText: "Tisch bereit.",
    targetWordPrompt: "der",
    noun: "Tisch (der Tisch)",
    gender: "maskulin",
    caseName: "Dativ",
    hint_de: "Wo liegen die Dokumente? Ruhezustand und Ort erfordern Dativ: der Tisch -> dem Tisch.",
    hint_en: "Where are the documents lying? Stationary position requires Dative: der Tisch -> dem Tisch.",
    translation_en: "The important documents are already lying on the table ready.",
    examTip: "Position verbs: stehen, liegen, sitzen -> Dativ (Wo?)."
  },
  {
    id: 8,
    level: "A2",
    category: "WECHSEL",
    beforeText: "Nächsten Monat ziehen wir in",
    blankAnswer: "eine",
    afterText: "größere Wohnung um.",
    targetWordPrompt: "eine",
    noun: "Wohnung (die Wohnung)",
    gender: "feminin",
    caseName: "Akkusativ",
    hint_de: "Wohin ziehen? Umzug = Bewegung/Richtung (Akkusativ). Feminin bleibt 'eine'.",
    hint_en: "Where to move? Relocation = motion (Accusative). Feminine remains 'eine'.",
    translation_en: "Next month we are moving into a bigger apartment.",
    examTip: "Feminine nouns do not change form between Nominativ and Akkusativ."
  },
  {
    id: 9,
    level: "A2",
    category: "WECHSEL",
    beforeText: "Ich wohne seit zwei Jahren in",
    blankAnswer: "einer",
    afterText: "ruhigen Wohnung am Park.",
    targetWordPrompt: "eine",
    noun: "Wohnung (die Wohnung)",
    gender: "feminin",
    caseName: "Dativ",
    hint_de: "Wo wohnst du? Ruhelage verlangt Dativ. Feminin: eine -> einer.",
    hint_en: "Where do you live? Stationary location requires Dative. Feminine: eine -> einer.",
    translation_en: "I have been living in a quiet apartment near the park for two years.",
    examTip: "'in einer Wohnung / in einem Haus' is standard in the B1 Speaking intro."
  },
  {
    id: 10,
    level: "A1",
    category: "NEGATION",
    beforeText: "Im Moment habe ich leider",
    blankAnswer: "keine",
    afterText: "Zeit für ein persönliches Treffen.",
    targetWordPrompt: "kein",
    noun: "Zeit (die Zeit)",
    gender: "feminin",
    caseName: "Akkusativ",
    hint_de: "Feminin Nomen mit Negation im Akkusativ: die Zeit -> keine Zeit.",
    hint_en: "Feminine noun with negation in Accusative: die Zeit -> keine Zeit.",
    translation_en: "At the moment I unfortunately have no time for an in-person meeting.",
    examTip: "'Ich habe leider keine Zeit' is the most polite excuse template for B1 letters."
  },
  {
    id: 11,
    level: "A1",
    category: "NEGATION",
    beforeText: "Mein Kollege trinkt morgens",
    blankAnswer: "keinen",
    afterText: "Kaffee, sondern nur Kräutertee.",
    targetWordPrompt: "kein",
    noun: "Kaffee (der Kaffee)",
    gender: "maskulin",
    caseName: "Akkusativ",
    hint_de: "Akkusativ maskulin bei Negation: kein -> keinen.",
    hint_en: "Accusative masculine with negation: kein -> keinen.",
    translation_en: "My colleague drinks no coffee in the morning, only herbal tea.",
    examTip: "Remember: 'trinken', 'essen', 'kaufen' take direct object in Akkusativ."
  },
  {
    id: 12,
    level: "B1",
    category: "GENITIV",
    beforeText: "Wegen",
    blankAnswer: "des",
    acceptableAnswers: ["des"],
    afterText: "starken Lärms konnte ich mich nicht konzentrieren.",
    targetWordPrompt: "der",
    noun: "Lärm (der Lärm)",
    gender: "maskulin",
    caseName: "Genitiv",
    hint_de: "'wegen' verlangt standardsprachlich Genitiv! Maskulin: der Lärm -> des Lärms.",
    hint_en: "'wegen' standardly governs Genitive! Masculine: der Lärm -> des Lärms.",
    translation_en: "Because of the loud noise, I could not concentrate.",
    examTip: "Using 'wegen des + Noun-s' in Goethe/Telc writing demonstrates B1-B2 mastery."
  },
  {
    id: 13,
    level: "B1",
    category: "GENITIV",
    beforeText: "Während",
    blankAnswer: "der",
    afterText: "offiziellen Prüfung ist das Handy verboten.",
    targetWordPrompt: "die",
    noun: "Prüfung (die Prüfung)",
    gender: "feminin",
    caseName: "Genitiv",
    hint_de: "'während' verlangt Genitiv. Feminin: die Prüfung -> der Prüfung.",
    hint_en: "'während' governs Genitive. Feminine: die Prüfung -> der Prüfung.",
    translation_en: "During the official exam, mobile phones are forbidden.",
    examTip: "'Während der Arbeitszeit' or 'Während der Prüfung' are top B1 collocations."
  },
  {
    id: 14,
    level: "A2",
    category: "DATIV",
    beforeText: "Herr Müller kommt gerade aus",
    blankAnswer: "dem",
    afterText: "Büro des Abteilungsleiters.",
    targetWordPrompt: "das",
    noun: "Büro (das Büro)",
    gender: "neutral",
    caseName: "Dativ",
    hint_de: "'aus' verlangt ausnahmslos Dativ. Neutral: das Büro -> dem Büro.",
    hint_en: "'aus' strictly takes Dative. Neuter: das Büro -> dem Büro.",
    translation_en: "Mr. Müller is just coming out of the department manager's office.",
    examTip: "Dativ prepositions: aus, bei, mit, nach, seit, von, zu (Mnemonic: Blue Danube)."
  },
  {
    id: 15,
    level: "A2",
    category: "AKKUSATIV",
    beforeText: "Ohne",
    blankAnswer: "einen",
    afterText: "gültigen Ausweis erhalten Sie keinen Zutritt.",
    targetWordPrompt: "ein",
    noun: "Ausweis (der Ausweis)",
    gender: "maskulin",
    caseName: "Akkusativ",
    hint_de: "'ohne' verlangt immer Akkusativ! Maskulin: ein -> einen Ausweis.",
    hint_en: "'ohne' strictly requires Accusative! Masculine: ein -> einen Ausweis.",
    translation_en: "Without a valid ID you receive no admission.",
    examTip: "Prepositions with Akkusativ: bis, durch, für, gegen, ohne, um."
  },
  {
    id: 16,
    level: "A2",
    category: "DATIV",
    beforeText: "Ich lerne schon seit",
    blankAnswer: "einem",
    afterText: "Jahr intensiv Deutsch für die B1-Prüfung.",
    targetWordPrompt: "ein",
    noun: "Jahr (das Jahr)",
    gender: "neutral",
    caseName: "Dativ",
    hint_de: "'seit' verlangt immer Dativ! Neutral: ein Jahr -> einem Jahr.",
    hint_en: "'seit' strictly requires Dative! Neuter: ein Jahr -> einem Jahr.",
    translation_en: "I have been learning German intensively for one year for the B1 exam.",
    examTip: "Always use 'seit einem Monat / Jahr' to express ongoing time in the speaking exam."
  }
];
