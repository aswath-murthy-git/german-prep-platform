export interface ConjugationTable {
  verb: string;
  infinitive_en: string;
  type: "REGULAR" | "AUXILIARY" | "STEM_CHANGE" | "MODAL" | "SEPARABLE";
  level: "A1" | "A2" | "B1";
  ruleHighlight: string;
  conjugation: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  pastOrPolite?: {
    label: string;
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  exampleSentence: {
    de: string;
    en: string;
  };
}

export interface ConjugationDrillItem {
  id: number;
  verb: string;
  verb_en: string;
  pronoun: "ich" | "du" | "er/sie/es" | "wir" | "ihr" | "sie/Sie";
  correctAnswer: string;
  options: string[];
  sentenceTemplate_de: string;
  sentenceTemplate_en: string;
  ruleExplanation: string;
  category: "REGULAR" | "AUXILIARY" | "STEM_CHANGE" | "MODAL" | "PAST";
}

export interface FoundationTopic {
  id: string;
  level: "A0" | "A1" | "A2" | "B1";
  title: string;
  title_en: string;
  description: string;
  keyRule: string;
  cheatSheetItems: {
    de: string;
    en: string;
    note?: string;
    targetSection?: "WRITING" | "SPEAKING" | "READING" | "LISTENING" | "GRAMMAR" | "CONJUNCTIONS" | "CITIZENSHIP" | "ACADEMY" | "KEYWORDS" | "CASES";
    secondaryTargetSection?: "LISTENING" | "READING";
  }[];
}

// ─── 1. COMPLETE CONJUGATION TABLES (REGULAR, AUXILIARY, STEM-CHANGE, MODAL) ───
export const VERB_CONJUGATIONS_DATA: ConjugationTable[] = [
  // ── Modal Verbs (A2 / B1 Pass Choke Points) ──
  {
    verb: "können",
    infinitive_en: "can / to be able to",
    type: "MODAL",
    level: "A2",
    ruleHighlight: "Vowel changes from 'ö' to 'a' in singular (ich kann, du kannst, er kann). Singular 1st and 3rd person have NO ending!",
    conjugation: {
      ich: "kann",
      du: "kannst",
      er_sie_es: "kann",
      wir: "können",
      ihr: "könnt",
      sie_Sie: "können"
    },
    pastOrPolite: {
      label: "Präteritum (Past): konnte / Konjunktiv II: könnte",
      ich: "konnte / könnte",
      du: "konntest / könntest",
      er_sie_es: "konnte / könnte",
      wir: "konnten / könnten",
      ihr: "konntet / könntet",
      sie_Sie: "konnten / könnten"
    },
    exampleSentence: {
      de: "Ich kann sehr gut Englisch und etwas Deutsch sprechen.",
      en: "I can speak English very well and a little German."
    }
  },
  {
    verb: "müssen",
    infinitive_en: "must / to have to",
    type: "MODAL",
    level: "A2",
    ruleHighlight: "Vowel changes from 'ü' to 'u' in singular (ich muss, du musst, er muss). 'nicht müssen' = optional / free!",
    conjugation: {
      ich: "muss",
      du: "musst",
      er_sie_es: "muss",
      wir: "müssen",
      ihr: "müsst",
      sie_Sie: "müssen"
    },
    pastOrPolite: {
      label: "Präteritum (Past): musste (had to)",
      ich: "musste",
      du: "musstest",
      er_sie_es: "musste",
      wir: "mussten",
      ihr: "musstet",
      sie_Sie: "mussten"
    },
    exampleSentence: {
      de: "Ich muss morgen früh aufstehen, weil ich eine Prüfung habe.",
      en: "I have to get up early tomorrow because I have an exam."
    }
  },
  {
    verb: "dürfen",
    infinitive_en: "may / to be allowed to",
    type: "MODAL",
    level: "A2",
    ruleHighlight: "Vowel changes from 'ü' to 'a' (ich darf, du darfst, er darf). 'nicht dürfen' = 100% strictly forbidden!",
    conjugation: {
      ich: "darf",
      du: "darfst",
      er_sie_es: "darf",
      wir: "dürfen",
      ihr: "dürft",
      sie_Sie: "dürfen"
    },
    pastOrPolite: {
      label: "Präteritum (Past): durfte (was allowed to)",
      ich: "durfte",
      du: "durftest",
      er_sie_es: "durfte",
      wir: "durften",
      ihr: "durftet",
      sie_Sie: "durften"
    },
    exampleSentence: {
      de: "Hier darf man nicht fotografieren. Es ist verboten!",
      en: "You are not allowed to take photos here. It is prohibited!"
    }
  },
  {
    verb: "sollen",
    infinitive_en: "should / ought to (Orders / Advice)",
    type: "MODAL",
    level: "A2",
    ruleHighlight: "No vowel change! Stays 'o' throughout (ich soll, du sollst, er soll). Used for doctor or boss instructions.",
    conjugation: {
      ich: "soll",
      du: "sollst",
      er_sie_es: "soll",
      wir: "sollen",
      ihr: "sollt",
      sie_Sie: "sollen"
    },
    pastOrPolite: {
      label: "Konjunktiv II: sollte (polite advice / should)",
      ich: "sollte",
      du: "solltest",
      er_sie_es: "sollte",
      wir: "sollten",
      ihr: "solltet",
      sie_Sie: "sollten"
    },
    exampleSentence: {
      de: "Der Arzt sagt, ich soll viel Tee trinken und im Bett bleiben.",
      en: "The doctor says I should drink a lot of tea and stay in bed."
    }
  },
  {
    verb: "wollen",
    infinitive_en: "to want (Strong plan)",
    type: "MODAL",
    level: "A2",
    ruleHighlight: "Vowel changes from 'o' to 'i' in singular (ich will, du willst, er will). Strong intention.",
    conjugation: {
      ich: "will",
      du: "willst",
      er_sie_es: "will",
      wir: "wollen",
      ihr: "wollt",
      sie_Sie: "wollen"
    },
    pastOrPolite: {
      label: "Präteritum (Past): wollte (wanted)",
      ich: "wollte",
      du: "wolltest",
      er_sie_es: "wollte",
      wir: "wollten",
      ihr: "wolltet",
      sie_Sie: "wollten"
    },
    exampleSentence: {
      de: "Wir wollen dieses Jahr die B1-Prüfung bestehen.",
      en: "We want to pass the B1 exam this year."
    }
  },
  {
    verb: "möchten",
    infinitive_en: "would like (Polite wish)",
    type: "MODAL",
    level: "A1",
    ruleHighlight: "The gold standard for polite German in speaking and writing. Ends in -e for ich/er (ich möchte, er möchte).",
    conjugation: {
      ich: "möchte",
      du: "möchtest",
      er_sie_es: "möchte",
      wir: "möchten",
      ihr: "möchtet",
      sie_Sie: "möchten"
    },
    exampleSentence: {
      de: "Ich möchte mich für den Deutschkurs anmelden.",
      en: "I would like to register for the German course."
    }
  },

  // ── The 3 Essential Auxiliary Verbs ──
  {
    verb: "sein",
    infinitive_en: "to be",
    type: "AUXILIARY",
    level: "A1",
    ruleHighlight: "Completely irregular! Must be memorized immediately. Forms the Perfekt past of movement verbs.",
    conjugation: {
      ich: "bin",
      du: "bist",
      er_sie_es: "ist",
      wir: "sind",
      ihr: "seid",
      sie_Sie: "sind"
    },
    pastOrPolite: {
      label: "Präteritum (Past): war (was/were)",
      ich: "war",
      du: "warst",
      er_sie_es: "war",
      wir: "waren",
      ihr: "wart",
      sie_Sie: "waren"
    },
    exampleSentence: {
      de: "Ich bin seit drei Jahren in Deutschland.",
      en: "I have been in Germany for three years."
    }
  },
  {
    verb: "haben",
    infinitive_en: "to have",
    type: "AUXILIARY",
    level: "A1",
    ruleHighlight: "Drops the 'b' in du hast and er hat. Used as auxiliary verb for 80% of all Perfekt past sentences.",
    conjugation: {
      ich: "habe",
      du: "hast",
      er_sie_es: "hat",
      wir: "haben",
      ihr: "habt",
      sie_Sie: "haben"
    },
    pastOrPolite: {
      label: "Präteritum (Past): hatte (had)",
      ich: "hatte",
      du: "hattest",
      er_sie_es: "hatte",
      wir: "hatten",
      ihr: "hattet",
      sie_Sie: "hatten"
    },
    exampleSentence: {
      de: "Ich habe gestern den ganzen Tag für die Prüfung gelernt.",
      en: "I studied all day yesterday for the exam."
    }
  },
  {
    verb: "werden",
    infinitive_en: "to become / will (Future & Passive)",
    type: "AUXILIARY",
    level: "A2",
    ruleHighlight: "Irregular in singular: du wirst, er wird. Used for future plans and passive voice in B1.",
    conjugation: {
      ich: "werde",
      du: "wirst",
      er_sie_es: "wird",
      wir: "werden",
      ihr: "werdet",
      sie_Sie: "werden"
    },
    pastOrPolite: {
      label: "Präteritum (Past): wurde (became)",
      ich: "wurde",
      du: "wurdest",
      er_sie_es: "wurde",
      wir: "wurden",
      ihr: "wurdet",
      sie_Sie: "wurden"
    },
    exampleSentence: {
      de: "Ich werde im nächsten Monat die Prüfung ablegen.",
      en: "I will take the exam next month."
    }
  },

  // ── Stem-Changing Irregular Verbs (Vokalwechsel A1/A2) ──
  {
    verb: "fahren",
    infinitive_en: "to drive / to travel",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "a changes to ä in 2nd and 3rd person singular: du fährst, er fährt.",
    conjugation: {
      ich: "fahre",
      du: "fährst",
      er_sie_es: "fährt",
      wir: "fahren",
      ihr: "fahrt",
      sie_Sie: "fahren"
    },
    exampleSentence: {
      de: "Er fährt jeden Morgen mit dem Bus zur Arbeit.",
      en: "He travels by bus to work every morning."
    }
  },
  {
    verb: "sprechen",
    infinitive_en: "to speak",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "e changes to i in 2nd and 3rd person singular: du sprichst, er spricht.",
    conjugation: {
      ich: "spreche",
      du: "sprichst",
      er_sie_es: "spricht",
      wir: "sprechen",
      ihr: "sprecht",
      sie_Sie: "sprechen"
    },
    exampleSentence: {
      de: "Sie spricht fließend Englisch und lernt jetzt Deutsch.",
      en: "She speaks fluent English and is now learning German."
    }
  },
  {
    verb: "sehen",
    infinitive_en: "to see / to watch",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "e changes to ie in 2nd and 3rd person singular: du siehst, er sieht.",
    conjugation: {
      ich: "sehe",
      du: "siehst",
      er_sie_es: "sieht",
      wir: "sehen",
      ihr: "seht",
      sie_Sie: "sehen"
    },
    exampleSentence: {
      de: "Auf dem Bild sieht man eine Familie beim Abendessen.",
      en: "In the picture one sees a family at dinner. (B1 Speaking template)"
    }
  },
  {
    verb: "lesen",
    infinitive_en: "to read",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "e changes to ie: du liest, er liest. (Because stem ends in 's', du ending is -t, not -st).",
    conjugation: {
      ich: "lese",
      du: "liest",
      er_sie_es: "liest",
      wir: "lesen",
      ihr: "lest",
      sie_Sie: "lesen"
    },
    exampleSentence: {
      de: "Ich lese gern deutsche Zeitungsartikel zur Vorbereitung.",
      en: "I like to read German newspaper articles for preparation."
    }
  },
  {
    verb: "treffen",
    infinitive_en: "to meet",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "e changes to i and doubles the 'f': du triffst, er trifft.",
    conjugation: {
      ich: "treffe",
      du: "triffst",
      er_sie_es: "trifft",
      wir: "treffen",
      ihr: "trefft",
      sie_Sie: "treffen"
    },
    exampleSentence: {
      de: "Wann treffen wir uns am Bahnhof?",
      en: "When do we meet at the train station? (B1 Speaking Part 3)"
    }
  },

  // ── Regular Verbs (The Universal Endings Formula: -e, -st, -t, -en, -t, -en) ──
  {
    verb: "lernen",
    infinitive_en: "to learn / to study",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Standard regular endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
    conjugation: {
      ich: "lerne",
      du: "lernst",
      er_sie_es: "lernt",
      wir: "lernen",
      ihr: "lernt",
      sie_Sie: "lernen"
    },
    exampleSentence: {
      de: "Ich lerne jeden Tag 30 Minuten Deutsch auf dieser Plattform.",
      en: "I study German for 30 minutes every day on this platform."
    }
  },
  {
    verb: "arbeiten",
    infinitive_en: "to work",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Stem ends in 't', so an extra 'e' is added before -st and -t: du arbeitest, er arbeitet, ihr arbeitet.",
    conjugation: {
      ich: "arbeite",
      du: "arbeitest",
      er_sie_es: "arbeitet",
      wir: "arbeiten",
      ihr: "arbeitet",
      sie_Sie: "arbeiten"
    },
    exampleSentence: {
      de: "Er arbeitet als Ingenieur bei einer Firma in Berlin.",
      en: "He works as an engineer at a company in Berlin."
    }
  },
  {
    verb: "wohnen",
    infinitive_en: "to live / reside",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Standard regular verb: ich wohne, du wohnst, er wohnt, wir wohnen.",
    conjugation: {
      ich: "wohne",
      du: "wohnst",
      er_sie_es: "wohnt",
      wir: "wohnen",
      ihr: "wohnt",
      sie_Sie: "wohnen"
    },
    exampleSentence: {
      de: "Ich wohne in einer gemütlichen Dreizimmerwohnung.",
      en: "I live in a cozy three-room apartment."
    }
  },
  {
    verb: "machen",
    infinitive_en: "to do / to make",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Universal helper verb: ich mache, du machst, er macht, wir machen.",
    conjugation: {
      ich: "mache",
      du: "machst",
      er_sie_es: "macht",
      wir: "machen",
      ihr: "macht",
      sie_Sie: "machen"
    },
    exampleSentence: {
      de: "Was machst du am Wochenende?",
      en: "What are you doing on the weekend?"
    }
  },
  {
    verb: "nehmen",
    infinitive_en: "to take",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "Vowel changes from 'e' to 'i' with double 'mm': du nimmst, er/sie/es nimmt. Präteritum: nahm, Perfekt: hat genommen.",
    conjugation: {
      ich: "nehme",
      du: "nimmst",
      er_sie_es: "nimmt",
      wir: "nehmen",
      ihr: "nehmt",
      sie_Sie: "nehmen"
    },
    pastOrPolite: {
      label: "Präteritum: nahm / Perfekt: hat genommen",
      ich: "nahm",
      du: "nahmst",
      er_sie_es: "nahm",
      wir: "nahmen",
      ihr: "nahmt",
      sie_Sie: "nahmen"
    },
    exampleSentence: {
      de: "Ich nehme jeden Morgen die Straßenbahn zur Arbeit.",
      en: "I take the tram to work every morning."
    }
  },
  {
    verb: "geben",
    infinitive_en: "to give",
    type: "STEM_CHANGE",
    level: "A1",
    ruleHighlight: "Vowel changes from 'e' to 'i': du gibst, er/sie/es gibt. Essential B1 idiom: 'Es gibt' (There is / There are).",
    conjugation: {
      ich: "gebe",
      du: "gibst",
      er_sie_es: "gibt",
      wir: "geben",
      ihr: "gebt",
      sie_Sie: "geben"
    },
    pastOrPolite: {
      label: "Präteritum: gab / Perfekt: hat gegeben",
      ich: "gab",
      du: "gabst",
      er_sie_es: "gab",
      wir: "gaben",
      ihr: "gabt",
      sie_Sie: "gaben"
    },
    exampleSentence: {
      de: "In dieser Stadt gibt es viele gute Sprachschulen.",
      en: "There are many good language schools in this city."
    }
  },
  {
    verb: "gehen",
    infinitive_en: "to go / to walk",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Forms Perfekt with 'sein': ist gegangen. Essential polite question: 'Wie geht es Ihnen?'",
    conjugation: {
      ich: "gehe",
      du: "gehst",
      er_sie_es: "geht",
      wir: "gehen",
      ihr: "geht",
      sie_Sie: "gehen"
    },
    pastOrPolite: {
      label: "Präteritum: ging / Perfekt: ist gegangen",
      ich: "ging",
      du: "gingst",
      er_sie_es: "ging",
      wir: "gingen",
      ihr: "gingt",
      sie_Sie: "gingen"
    },
    exampleSentence: {
      de: "Wie geht es Ihnen? - Mir geht es sehr gut, danke!",
      en: "How are you? - I am doing very well, thank you!"
    }
  },
  {
    verb: "kommen",
    infinitive_en: "to come",
    type: "REGULAR",
    level: "A1",
    ruleHighlight: "Forms Perfekt with 'sein': ist gekommen. Frequently used with separable prefix: ankommen (to arrive).",
    conjugation: {
      ich: "komme",
      du: "kommst",
      er_sie_es: "kommt",
      wir: "kommen",
      ihr: "kommt",
      sie_Sie: "kommen"
    },
    pastOrPolite: {
      label: "Präteritum: kam / Perfekt: ist gekommen",
      ich: "kam",
      du: "kamst",
      er_sie_es: "kam",
      wir: "kamen",
      ihr: "kamt",
      sie_Sie: "kamen"
    },
    exampleSentence: {
      de: "Der Zug kommt pünktlich auf Gleis 4 an.",
      en: "The train arrives on time on platform 4."
    }
  },
  {
    verb: "wissen",
    infinitive_en: "to know (a fact)",
    type: "STEM_CHANGE",
    level: "A2",
    ruleHighlight: "Irregular present singular: ich weiß, du weißt, er/sie/es weiß (no ending!). Präteritum: wusste.",
    conjugation: {
      ich: "weiß",
      du: "weißt",
      er_sie_es: "weiß",
      wir: "wissen",
      ihr: "wisst",
      sie_Sie: "wissen"
    },
    pastOrPolite: {
      label: "Präteritum: wusste / Perfekt: hat gewusst",
      ich: "wusste",
      du: "wusstest",
      er_sie_es: "wusste",
      wir: "wussten",
      ihr: "wusstet",
      sie_Sie: "wussten"
    },
    exampleSentence: {
      de: "Wissen Sie, wann das Bürgeramt heute öffnet?",
      en: "Do you know when the citizen's office opens today?"
    }
  },
  {
    verb: "helfen",
    infinitive_en: "to help",
    type: "STEM_CHANGE",
    level: "A2",
    ruleHighlight: "Vowel changes from 'e' to 'i': du hilfst, er/sie/es hilft. Strictly takes Dative object: 'Ich helfe Ihnen'.",
    conjugation: {
      ich: "helfe",
      du: "hilfst",
      er_sie_es: "hilft",
      wir: "helfen",
      ihr: "helft",
      sie_Sie: "helfen"
    },
    pastOrPolite: {
      label: "Präteritum: half / Konjunktiv II: hülfe/würde helfen",
      ich: "half",
      du: "halfst",
      er_sie_es: "half",
      wir: "halfen",
      ihr: "halft",
      sie_Sie: "halfen"
    },
    exampleSentence: {
      de: "Könnten Sie mir bitte bei diesem Formular helfen?",
      en: "Could you please help me with this form?"
    }
  }
];

// ─── 2. INTERACTIVE CONJUGATION DRILL BANK (SHUFFLED OPTIONS) ───
export const CONJUGATION_DRILL_ITEMS: ConjugationDrillItem[] = [
  {
    id: 1,
    verb: "können",
    verb_en: "can / to be able to",
    pronoun: "ich",
    correctAnswer: "kann",
    options: ["könne", "kann", "kannst"],
    sentenceTemplate_de: "Ich ___ gut schwimmen.",
    sentenceTemplate_en: "I can swim well.",
    ruleExplanation: "Modal verb 'können' has stem change to 'a' in singular: ich kann. No -e ending!",
    category: "MODAL"
  },
  {
    id: 2,
    verb: "müssen",
    verb_en: "must / to have to",
    pronoun: "du",
    correctAnswer: "musst",
    options: ["müsst", "musstet", "musst"],
    sentenceTemplate_de: "Du ___ heute pünktlich sein.",
    sentenceTemplate_en: "You must be on time today.",
    ruleExplanation: "Stem vowel changes from 'ü' to 'u': du musst (not müsst, which is for 'ihr').",
    category: "MODAL"
  },
  {
    id: 3,
    verb: "dürfen",
    verb_en: "may / to be allowed to",
    pronoun: "er/sie/es",
    correctAnswer: "darf",
    options: ["dörft", "darf", "dürft"],
    sentenceTemplate_de: "Er ___ hier nicht rauchen.",
    sentenceTemplate_en: "He is not allowed to smoke here.",
    ruleExplanation: "'er/sie/es darf': singular 3rd person modal verbs take NO ending (identical to 'ich darf')!",
    category: "MODAL"
  },
  {
    id: 4,
    verb: "wollen",
    verb_en: "to want",
    pronoun: "wir",
    correctAnswer: "wollen",
    options: ["willen", "wollt", "wollen"],
    sentenceTemplate_de: "Wir ___ am Samstag ins Kino gehen.",
    sentenceTemplate_en: "We want to go to the cinema on Saturday.",
    ruleExplanation: "Plural forms of all modal verbs keep the regular infinitive stem: wir wollen.",
    category: "MODAL"
  },
  {
    id: 5,
    verb: "sollen",
    verb_en: "should",
    pronoun: "du",
    correctAnswer: "sollst",
    options: ["sollt", "sollst", "söllst"],
    sentenceTemplate_de: "Du ___ die Medizin dreimal täglich nehmen.",
    sentenceTemplate_en: "You should take the medicine three times daily.",
    ruleExplanation: "'sollen' keeps the vowel 'o' without umlaut: du sollst.",
    category: "MODAL"
  },
  {
    id: 6,
    verb: "sein",
    verb_en: "to be",
    pronoun: "ihr",
    correctAnswer: "seid",
    options: ["sind", "seid", "bist"],
    sentenceTemplate_de: "___ ihr schon bereit für die Prüfung?",
    sentenceTemplate_en: "Are you all ready for the exam already?",
    ruleExplanation: "'ihr seid' (spelled with 'd', not 'seit' with 't' which means 'since').",
    category: "AUXILIARY"
  },
  {
    id: 7,
    verb: "haben",
    verb_en: "to have",
    pronoun: "er/sie/es",
    correctAnswer: "hat",
    options: ["habt", "habet", "hat"],
    sentenceTemplate_de: "Sie ___ gestern die Bestätigung bekommen.",
    sentenceTemplate_en: "She received the confirmation yesterday.",
    ruleExplanation: "The letter 'b' drops out: er/sie/es hat.",
    category: "AUXILIARY"
  },
  {
    id: 8,
    verb: "fahren",
    verb_en: "to drive",
    pronoun: "du",
    correctAnswer: "fährst",
    options: ["fahrst", "fährst", "fährtest"],
    sentenceTemplate_de: "___ du morgen mit dem Zug nach Hamburg?",
    sentenceTemplate_en: "Are you travelling by train to Hamburg tomorrow?",
    ruleExplanation: "Vokalwechsel: 'a' changes to 'ä' for du: du fährst.",
    category: "STEM_CHANGE"
  },
  {
    id: 9,
    verb: "sprechen",
    verb_en: "to speak",
    pronoun: "er/sie/es",
    correctAnswer: "spricht",
    options: ["sprecht", "spracht", "spricht"],
    sentenceTemplate_de: "Mein Kollege ___ sehr deutlich.",
    sentenceTemplate_en: "My colleague speaks very clearly.",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'i' in singular: er spricht.",
    category: "STEM_CHANGE"
  },
  {
    id: 10,
    verb: "sehen",
    verb_en: "to see",
    pronoun: "du",
    correctAnswer: "siehst",
    options: ["siehst", "sehst", "sieht"],
    sentenceTemplate_de: "___ du das rote Auto dort drüben?",
    sentenceTemplate_en: "Do you see the red car over there?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'ie': du siehst.",
    category: "STEM_CHANGE"
  },
  {
    id: 11,
    verb: "arbeiten",
    verb_en: "to work",
    pronoun: "er/sie/es",
    correctAnswer: "arbeitet",
    options: ["arbeitt", "arbeitet", "arbeiten"],
    sentenceTemplate_de: "Mein Bruder ___ bei Siemens.",
    sentenceTemplate_en: "My brother works at Siemens.",
    ruleExplanation: "Stems ending in 't' or 'd' insert an extra 'e': er arbeitet (not arbeitt).",
    category: "REGULAR"
  },
  {
    id: 12,
    verb: "können",
    verb_en: "can (Präteritum / Past)",
    pronoun: "ich",
    correctAnswer: "konnte",
    options: ["könnte", "kannte", "konnte"],
    sentenceTemplate_de: "Gestern ___ ich leider nicht kommen.",
    sentenceTemplate_en: "Yesterday I unfortunately could not come.",
    ruleExplanation: "Past tense modal verb drops the umlaut: ich konnte (könnte is subjunctive / polite request).",
    category: "PAST"
  },
  {
    id: 13,
    verb: "müssen",
    verb_en: "must (Präteritum / Past)",
    pronoun: "wir",
    correctAnswer: "mussten",
    options: ["mussten", "müssten", "musstet"],
    sentenceTemplate_de: "Wir ___ zwei Stunden auf den Bus warten.",
    sentenceTemplate_en: "We had to wait two hours for the bus.",
    ruleExplanation: "Past tense: wir mussten (drops umlaut).",
    category: "PAST"
  },
  {
    id: 14,
    verb: "möchten",
    verb_en: "would like",
    pronoun: "ich",
    correctAnswer: "möchte",
    options: ["möchtet", "möchtest", "möchte"],
    sentenceTemplate_de: "Ich ___ bitte ein Glas Wasser.",
    sentenceTemplate_en: "I would like a glass of water, please.",
    ruleExplanation: "1st and 3rd person singular take -e: ich möchte, er möchte.",
    category: "MODAL"
  },
  {
    id: 15,
    verb: "lesen",
    verb_en: "to read",
    pronoun: "du",
    correctAnswer: "liest",
    options: ["lesst", "liest", "lest"],
    sentenceTemplate_de: "Welches Buch ___ du gerade?",
    sentenceTemplate_en: "Which book are you reading right now?",
    ruleExplanation: "Stem 'les-' changes to 'lies-'. Since stem ends in s, only 't' is added: du liest.",
    category: "STEM_CHANGE"
  },
  {
    id: 16,
    verb: "werden",
    verb_en: "to become / will (Future)",
    pronoun: "du",
    correctAnswer: "wirst",
    options: ["werdest", "wirst", "werdet"],
    sentenceTemplate_de: "Wann ___ du die B1-Prüfung ablegen?",
    sentenceTemplate_en: "When will you take the B1 exam?",
    ruleExplanation: "'werden' is irregular in 2nd person singular: du wirst (not werdest).",
    category: "AUXILIARY"
  },
  {
    id: 17,
    verb: "werden",
    verb_en: "to become / will (Future)",
    pronoun: "er/sie/es",
    correctAnswer: "wird",
    options: ["werdet", "werdt", "wird"],
    sentenceTemplate_de: "Das Wetter ___ morgen bestimmt besser.",
    sentenceTemplate_en: "The weather will definitely be better tomorrow.",
    ruleExplanation: "3rd person singular is 'er/sie/es wird'.",
    category: "AUXILIARY"
  },
  {
    id: 18,
    verb: "wohnen",
    verb_en: "to live / reside",
    pronoun: "wir",
    correctAnswer: "wohnen",
    options: ["wohnt", "wohnen", "wohnet"],
    sentenceTemplate_de: "Wir ___ seit zwei Jahren in Frankfurt.",
    sentenceTemplate_en: "We have been living in Frankfurt for two years.",
    ruleExplanation: "Regular verb ending for 'wir' is always -en: wir wohnen.",
    category: "REGULAR"
  },
  {
    id: 19,
    verb: "dürfen",
    verb_en: "may / to be allowed to",
    pronoun: "ihr",
    correctAnswer: "dürft",
    options: ["darft", "dürft", "dörft"],
    sentenceTemplate_de: "Hier ___ ihr eure Fahrräder nicht abstellen.",
    sentenceTemplate_en: "You all are not allowed to park your bikes here.",
    ruleExplanation: "2nd person plural keeps the umlaut with -t ending: ihr dürft.",
    category: "MODAL"
  },
  {
    id: 20,
    verb: "treffen",
    verb_en: "to meet",
    pronoun: "du",
    correctAnswer: "triffst",
    options: ["treffst", "trafst", "triffst"],
    sentenceTemplate_de: "Wen ___ du heute Nachmittag am Hauptbahnhof?",
    sentenceTemplate_en: "Whom are you meeting this afternoon at the main station?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'i' and doubles 'ff': du triffst.",
    category: "STEM_CHANGE"
  },
  {
    id: 21,
    verb: "nehmen",
    verb_en: "to take",
    pronoun: "du",
    correctAnswer: "nimmst",
    options: ["nehmst", "nimmst", "nahmst"],
    sentenceTemplate_de: "Welchen Zug ___ du morgen früh nach Hamburg?",
    sentenceTemplate_en: "Which train are you taking tomorrow morning to Hamburg?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'i' with double 'mm': du nimmst.",
    category: "STEM_CHANGE"
  },
  {
    id: 22,
    verb: "nehmen",
    verb_en: "to take",
    pronoun: "er/sie/es",
    correctAnswer: "nimmt",
    options: ["nehmt", "nimmt", "namt"],
    sentenceTemplate_de: "Der Patient ___ seine Tabletten regelmäßig ein.",
    sentenceTemplate_en: "The patient takes his tablets regularly.",
    ruleExplanation: "3rd person singular stem change: er/sie/es nimmt.",
    category: "STEM_CHANGE"
  },
  {
    id: 23,
    verb: "geben",
    verb_en: "to give",
    pronoun: "er/sie/es",
    correctAnswer: "gibt",
    options: ["gebt", "gibt", "gab"],
    sentenceTemplate_de: "In dieser Region ___ es viele offene Stellen.",
    sentenceTemplate_en: "In this region there are many open job vacancies.",
    ruleExplanation: "B1 core expression: 'Es gibt' (There is / There are). 'e' changes to 'i': er/sie/es gibt.",
    category: "STEM_CHANGE"
  },
  {
    id: 24,
    verb: "helfen",
    verb_en: "to help",
    pronoun: "du",
    correctAnswer: "hilfst",
    options: ["helfst", "hilfst", "halfst"],
    sentenceTemplate_de: "___ du mir bitte beim Ausfüllen des Formulars?",
    sentenceTemplate_en: "Do you help me fill out the form, please?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'i': du hilfst (with Dative object 'mir').",
    category: "STEM_CHANGE"
  },
  {
    id: 25,
    verb: "helfen",
    verb_en: "to help",
    pronoun: "er/sie/es",
    correctAnswer: "hilft",
    options: ["helft", "hilft", "halft"],
    sentenceTemplate_de: "Die Beraterin ___ den Zuwanderern bei der Wohnungssuche.",
    sentenceTemplate_en: "The advisor helps immigrants with their apartment search.",
    ruleExplanation: "3rd person singular: sie hilft (takes Dative: den Zuwanderern).",
    category: "STEM_CHANGE"
  },
  {
    id: 26,
    verb: "wissen",
    verb_en: "to know (a fact)",
    pronoun: "ich",
    correctAnswer: "weiß",
    options: ["wisse", "weiß", "weißt"],
    sentenceTemplate_de: "Ich ___ leider nicht, wo das Bürgeramt liegt.",
    sentenceTemplate_en: "I unfortunately do not know where the citizens' registration office is located.",
    ruleExplanation: "Irregular 1st person singular: ich weiß (has no -e ending, identical to er/sie weiß).",
    category: "STEM_CHANGE"
  },
  {
    id: 27,
    verb: "wissen",
    verb_en: "to know (a fact)",
    pronoun: "du",
    correctAnswer: "weißt",
    options: ["weisst", "weißt", "wisst"],
    sentenceTemplate_de: "___ du, wann der nächste Deutschkurs beginnt?",
    sentenceTemplate_en: "Do you know when the next German course begins?",
    ruleExplanation: "2nd person singular: du weißt.",
    category: "STEM_CHANGE"
  },
  {
    id: 28,
    verb: "wissen",
    verb_en: "to know (a fact)",
    pronoun: "er/sie/es",
    correctAnswer: "weiß",
    options: ["weißt", "wisst", "weiß"],
    sentenceTemplate_de: "Der Sachbearbeiter ___ über den Fall Bescheid.",
    sentenceTemplate_en: "The clerk knows about the case.",
    ruleExplanation: "3rd person singular modal-style: er/sie/es weiß (no -t ending!).",
    category: "STEM_CHANGE"
  },
  {
    id: 29,
    verb: "gehen",
    verb_en: "to go / to be (state)",
    pronoun: "er/sie/es",
    correctAnswer: "geht",
    options: ["gehst", "geht", "ging"],
    sentenceTemplate_de: "Wie ___ es Ihnen heute, Frau Müller?",
    sentenceTemplate_en: "How are you today, Ms. Müller?",
    ruleExplanation: "Polite idiom: 'Wie geht es Ihnen?' (impersonal 3rd person singular).",
    category: "REGULAR"
  },
  {
    id: 30,
    verb: "kommen",
    verb_en: "to come",
    pronoun: "wir",
    correctAnswer: "kommen",
    options: ["kommt", "kommen", "kamen"],
    sentenceTemplate_de: "Wir ___ morgen um 10 Uhr zum vereinbarten Termin.",
    sentenceTemplate_en: "We will come to the agreed appointment tomorrow at 10 AM.",
    ruleExplanation: "Standard 1st person plural: wir kommen.",
    category: "REGULAR"
  },
  {
    id: 31,
    verb: "sein",
    verb_en: "to be (Präteritum)",
    pronoun: "ich",
    correctAnswer: "war",
    options: ["ware", "bin", "war"],
    sentenceTemplate_de: "Gestern ___ ich wegen einer Grippe beim Arzt.",
    sentenceTemplate_en: "Yesterday I was at the doctor because of flu.",
    ruleExplanation: "Präteritum of 'sein' for 'ich' is 'war' (no ending).",
    category: "PAST"
  },
  {
    id: 32,
    verb: "sein",
    verb_en: "to be (Präteritum)",
    pronoun: "du",
    correctAnswer: "warst",
    options: ["wart", "warst", "bist"],
    sentenceTemplate_de: "Wo ___ du gestern Abend während des Anrufs?",
    sentenceTemplate_en: "Where were you yesterday evening during the call?",
    ruleExplanation: "Präteritum 2nd person singular: du warst.",
    category: "PAST"
  },
  {
    id: 33,
    verb: "sein",
    verb_en: "to be (Präteritum)",
    pronoun: "wir",
    correctAnswer: "waren",
    options: ["wart", "waren", "sind"],
    sentenceTemplate_de: "Wir ___ mit der Beratung im Bürgeramt sehr zufrieden.",
    sentenceTemplate_en: "We were very satisfied with the consultation at the citizens' office.",
    ruleExplanation: "Präteritum 1st person plural: wir waren.",
    category: "PAST"
  },
  {
    id: 34,
    verb: "haben",
    verb_en: "to have (Präteritum)",
    pronoun: "ich",
    correctAnswer: "hatte",
    options: ["habte", "hatte", "habe"],
    sentenceTemplate_de: "Ich ___ gestern leider keine Zeit für das Telefonat.",
    sentenceTemplate_en: "I unfortunately had no time for the phone call yesterday.",
    ruleExplanation: "Präteritum of 'haben' for 'ich' is 'hatte'.",
    category: "PAST"
  },
  {
    id: 35,
    verb: "haben",
    verb_en: "to have (Präteritum)",
    pronoun: "du",
    correctAnswer: "hattest",
    options: ["habtest", "hattest", "hast"],
    sentenceTemplate_de: "___ du gestern Probleme mit dem Internet?",
    sentenceTemplate_en: "Did you have problems with the internet yesterday?",
    ruleExplanation: "Präteritum 2nd person singular: du hattest.",
    category: "PAST"
  },
  {
    id: 36,
    verb: "haben",
    verb_en: "to have (Präteritum)",
    pronoun: "wir",
    correctAnswer: "hatten",
    options: ["haben", "hatten", "habten"],
    sentenceTemplate_de: "Wir ___ letzte Woche einen Termin beim Vermieter.",
    sentenceTemplate_en: "We had an appointment with the landlord last week.",
    ruleExplanation: "Präteritum 1st person plural: wir hatten.",
    category: "PAST"
  },
  {
    id: 37,
    verb: "können",
    verb_en: "can (Präteritum)",
    pronoun: "ich",
    correctAnswer: "konnte",
    options: ["könnte", "kannte", "konnte"],
    sentenceTemplate_de: "Wegen starker Zahnschmerzen ___ ich gestern nicht arbeiten.",
    sentenceTemplate_en: "Because of severe toothache, I could not work yesterday.",
    ruleExplanation: "Präteritum modal: 'ich konnte' (no umlaut!). 'könnte' is subjunctive (would be able).",
    category: "PAST"
  },
  {
    id: 38,
    verb: "müssen",
    verb_en: "had to (Präteritum)",
    pronoun: "ich",
    correctAnswer: "musste",
    options: ["müsste", "musste", "musstet"],
    sentenceTemplate_de: "Gestern ___ ich dringend zur Ausländerbehörde gehen.",
    sentenceTemplate_en: "Yesterday I had to go to the immigration office urgently.",
    ruleExplanation: "Präteritum modal: 'ich musste' (no umlaut!). 'müsste' is subjunctive (would have to).",
    category: "PAST"
  },
  {
    id: 39,
    verb: "dürfen",
    verb_en: "was allowed to (Präteritum)",
    pronoun: "er/sie/es",
    correctAnswer: "durfte",
    options: ["dürfte", "durfte", "darfte"],
    sentenceTemplate_de: "Der Patient ___ gestern nach der Untersuchung nach Hause gehen.",
    sentenceTemplate_en: "The patient was allowed to go home yesterday after the examination.",
    ruleExplanation: "Präteritum modal: er/sie/es durfte (no umlaut!).",
    category: "PAST"
  },
  {
    id: 40,
    verb: "wollen",
    verb_en: "wanted to (Präteritum)",
    pronoun: "wir",
    correctAnswer: "wollten",
    options: ["willten", "wollten", "wolleten"],
    sentenceTemplate_de: "Wir ___ Sie gestern telefonisch informieren.",
    sentenceTemplate_en: "We wanted to inform you by phone yesterday.",
    ruleExplanation: "Präteritum modal: wir wollten.",
    category: "PAST"
  },
  {
    id: 41,
    verb: "sollen",
    verb_en: "should / was supposed to (Präteritum)",
    pronoun: "ich",
    correctAnswer: "sollte",
    options: ["söllte", "sollte", "sollt"],
    sentenceTemplate_de: "Der Arzt sagte, ich ___ drei Tage das Bett hüten.",
    sentenceTemplate_en: "The doctor said I was supposed to stay in bed for three days.",
    ruleExplanation: "Präteritum / indirect command: ich sollte.",
    category: "PAST"
  },
  {
    id: 42,
    verb: "möchten",
    verb_en: "would like",
    pronoun: "wir",
    correctAnswer: "möchten",
    options: ["mochten", "möchtet", "möchten"],
    sentenceTemplate_de: "Wir ___ uns für die schnelle Antwort bedanken.",
    sentenceTemplate_en: "We would like to thank you for the prompt response.",
    ruleExplanation: "Polite B1 letter formula: wir möchten uns bedanken.",
    category: "MODAL"
  },
  {
    id: 43,
    verb: "fahren",
    verb_en: "to drive / to travel",
    pronoun: "du",
    correctAnswer: "fährst",
    options: ["fahrst", "fährst", "fuhrt"],
    sentenceTemplate_de: "Mit welcher U-Bahn ___ du morgens zur Sprachschule?",
    sentenceTemplate_en: "Which subway do you take in the morning to the language school?",
    ruleExplanation: "Vokalwechsel: 'a' changes to 'ä': du fährst.",
    category: "STEM_CHANGE"
  },
  {
    id: 44,
    verb: "fahren",
    verb_en: "to drive / to travel",
    pronoun: "er/sie/es",
    correctAnswer: "fährt",
    options: ["fahrt", "fährt", "fuhrt"],
    sentenceTemplate_de: "Der Zug nach München ___ heute von Gleis 7 ab.",
    sentenceTemplate_en: "The train to Munich departs from platform 7 today.",
    ruleExplanation: "Vokalwechsel: 'a' changes to 'ä': er/sie/es fährt.",
    category: "STEM_CHANGE"
  },
  {
    id: 45,
    verb: "lesen",
    verb_en: "to read",
    pronoun: "du",
    correctAnswer: "liest",
    options: ["lesest", "liest", "last"],
    sentenceTemplate_de: "___ du regelmäßig die Tageszeitung auf Deutsch?",
    sentenceTemplate_en: "Do you regularly read the daily newspaper in German?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'ie': du liest (only one -t added because stem ends in -s).",
    category: "STEM_CHANGE"
  },
  {
    id: 46,
    verb: "lesen",
    verb_en: "to read",
    pronoun: "er/sie/es",
    correctAnswer: "liest",
    options: ["lest", "liest", "liesst"],
    sentenceTemplate_de: "Die Anwältin ___ den Vertrag vor der Unterschrift sehr sorgfältig.",
    sentenceTemplate_en: "The lawyer reads the contract very carefully before signing.",
    ruleExplanation: "3rd person singular: sie liest.",
    category: "STEM_CHANGE"
  },
  {
    id: 47,
    verb: "sehen",
    verb_en: "to see",
    pronoun: "du",
    correctAnswer: "siehst",
    options: ["sehst", "siehst", "saht"],
    sentenceTemplate_de: "___ du den gelben Briefkasten an der Ecke?",
    sentenceTemplate_en: "Do you see the yellow mailbox on the corner?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'ie': du siehst.",
    category: "STEM_CHANGE"
  },
  {
    id: 48,
    verb: "sehen",
    verb_en: "to see",
    pronoun: "er/sie/es",
    correctAnswer: "sieht",
    options: ["seht", "sieht", "sah"],
    sentenceTemplate_de: "Er ___ sich die Wohnungsangebote im Internet an.",
    sentenceTemplate_en: "He looks at the apartment offers on the internet.",
    ruleExplanation: "3rd person singular: er sieht (sich an).",
    category: "STEM_CHANGE"
  },
  {
    id: 49,
    verb: "essen",
    verb_en: "to eat",
    pronoun: "du",
    correctAnswer: "isst",
    options: ["esst", "isst", "aßest"],
    sentenceTemplate_de: "Was ___ du am liebsten in der Mittagspause?",
    sentenceTemplate_en: "What do you like to eat best during the lunch break?",
    ruleExplanation: "Vokalwechsel: 'e' changes to 'i' with double 'ss': du isst.",
    category: "STEM_CHANGE"
  },
  {
    id: 50,
    verb: "essen",
    verb_en: "to eat",
    pronoun: "er/sie/es",
    correctAnswer: "isst",
    options: ["esst", "isst", "aßt"],
    sentenceTemplate_de: "Mein Kollege ___ in der Kantine meistens einen Salat.",
    sentenceTemplate_en: "My colleague usually eats a salad in the canteen.",
    ruleExplanation: "3rd person singular: er isst.",
    category: "STEM_CHANGE"
  },
  {
    id: 51,
    verb: "schlafen",
    verb_en: "to sleep",
    pronoun: "du",
    correctAnswer: "schläfst",
    options: ["schlafst", "schläfst", "schliefst"],
    sentenceTemplate_de: "Wie viele Stunden ___ du normalerweise pro Nacht?",
    sentenceTemplate_en: "How many hours do you normally sleep per night?",
    ruleExplanation: "Vokalwechsel: 'a' changes to 'ä': du schläfst.",
    category: "STEM_CHANGE"
  },
  {
    id: 52,
    verb: "schlafen",
    verb_en: "to sleep",
    pronoun: "er/sie/es",
    correctAnswer: "schläft",
    options: ["schlaft", "schläft", "schlieft"],
    sentenceTemplate_de: "Das kranke Kind ___ jetzt ruhig in seinem Bett.",
    sentenceTemplate_en: "The sick child is sleeping peacefully in its bed now.",
    ruleExplanation: "3rd person singular: das Kind schläft.",
    category: "STEM_CHANGE"
  },
  {
    id: 53,
    verb: "tragen",
    verb_en: "to carry / to wear",
    pronoun: "du",
    correctAnswer: "trägst",
    options: ["tragst", "trägst", "trugst"],
    sentenceTemplate_de: "Warum ___ du bei diesem kalten Wind keine Mütze?",
    sentenceTemplate_en: "Why aren't you wearing a hat in this cold wind?",
    ruleExplanation: "Vokalwechsel: 'a' changes to 'ä': du trägst.",
    category: "STEM_CHANGE"
  },
  {
    id: 54,
    verb: "tragen",
    verb_en: "to carry / to wear",
    pronoun: "er/sie/es",
    correctAnswer: "trägt",
    options: ["tragt", "trägt", "trug"],
    sentenceTemplate_de: "Die Krankenschwester ___ im Behandlungszimmer Schutzkleidung.",
    sentenceTemplate_en: "The nurse wears protective clothing in the treatment room.",
    ruleExplanation: "3rd person singular: sie trägt.",
    category: "STEM_CHANGE"
  },
  {
    id: 55,
    verb: "arbeiten",
    verb_en: "to work",
    pronoun: "er/sie/es",
    correctAnswer: "arbeitet",
    options: ["arbeitt", "arbeitet", "arbeitest"],
    sentenceTemplate_de: "Herr Fischer ___ seit fünf Jahren als Mechatroniker.",
    sentenceTemplate_en: "Mr. Fischer has been working as a mechatronics technician for five years.",
    ruleExplanation: "Verbs ending in -t or -d insert an 'e' before ending for pronunciation: er arbeitet.",
    category: "REGULAR"
  },
  {
    id: 56,
    verb: "anrufen",
    verb_en: "to call (phone)",
    pronoun: "ich",
    correctAnswer: "rufe an",
    options: ["anrufe", "rufe an", "anrief"],
    sentenceTemplate_de: "Ich ___ morgen Vormittag in Ihrer Praxis ___.",
    sentenceTemplate_en: "I will call your doctor's office tomorrow morning.",
    ruleExplanation: "Separable verb in main clause: 'rufe' in Position 2, prefix 'an' at the very end.",
    category: "REGULAR"
  },
  {
    id: 57,
    verb: "einkaufen",
    verb_en: "to shop / buy groceries",
    pronoun: "wir",
    correctAnswer: "kaufen ein",
    options: ["einkaufen", "kaufen ein", "kauftet ein"],
    sentenceTemplate_de: "Wir ___ jeden Samstag im Supermarkt um die Ecke ___.",
    sentenceTemplate_en: "We do our grocery shopping every Saturday at the supermarket around the corner.",
    ruleExplanation: "Separable verb: 'kaufen' on Pos 2, prefix 'ein' at the end.",
    category: "REGULAR"
  },
  {
    id: 58,
    verb: "aufstehen",
    verb_en: "to get up",
    pronoun: "er/sie/es",
    correctAnswer: "steht auf",
    options: ["aufsteht", "steht auf", "stand auf"],
    sentenceTemplate_de: "Frau Becker ___ an Werktagen immer um 6 Uhr ___.",
    sentenceTemplate_en: "Ms. Becker always gets up at 6 AM on weekdays.",
    ruleExplanation: "Separable verb: 'steht' in Position 2, prefix 'auf' at the end.",
    category: "REGULAR"
  },
  {
    id: 59,
    verb: "verstehen",
    verb_en: "to understand",
    pronoun: "ich",
    correctAnswer: "verstehe",
    options: ["verstehe", "verstand", "verstehst"],
    sentenceTemplate_de: "Ich ___ die grammatikalische Regel jetzt vollkommen.",
    sentenceTemplate_en: "I understand the grammar rule completely now.",
    ruleExplanation: "Inseparable prefix verb: ich verstehe (never separated!).",
    category: "REGULAR"
  },
  {
    id: 60,
    verb: "bezahlen",
    verb_en: "to pay",
    pronoun: "sie/Sie",
    correctAnswer: "bezahlen",
    options: ["bezahlt", "bezahlen", "bezahlten"],
    sentenceTemplate_de: "Möchten Sie die Rechnung mit EC-Karte ___?",
    sentenceTemplate_en: "Would you like to pay the bill with debit card?",
    ruleExplanation: "Infinitive after modal verb 'Möchten Sie': bezahlen at the end.",
    category: "REGULAR"
  }
];

// ─── 3. THE 0-TO-B1 LEVEL PATHWAY TOPICS ───
export const FOUNDATION_LEVELS_DATA: {
  level: "A0" | "A1" | "A2" | "B1";
  name: string;
  badge: string;
  summary: string;
  topics: FoundationTopic[];
}[] = [
  {
    level: "A0",
    name: "Absolute Beginner Foundations",
    badge: "Level 0: Getting Started",
    summary: "Pronunciation phonetics, essential greetings, numbers, and personal pronouns.",
    topics: [
      {
        id: "a0-phonetics",
        level: "A0",
        title: "German Sounds & Alphabet Secrets",
        title_en: "Phonetics & Pronunciation Hacks",
        description: "German spelling is almost 100% phonetic. Learn these 6 sound combinations to pronounce any German word on the exam correctly.",
        keyRule: "German vowels are crisp. 'ei' sounds like 'eye', 'ie' sounds like 'ee', and 'ch' is a soft breath sound.",
        cheatSheetItems: [
          { de: "ä, ö, ü", en: "Umlauts: ä = 'e' in bed, ö = rounded lips saying 'ay', ü = rounded lips saying 'ee'", note: "Crucial for modal verbs!" },
          { de: "ei vs ie", en: "'ei' = like 'mine' (mein, Wein). 'ie' = like 'see' (sie, Liebe). Rule: pronounce the second letter!", note: "Top spelling trap" },
          { de: "ch", en: "Soft 'ich' sound after e/i/ä/ö/ü (ich, nicht). Guttural 'ach' sound after a/o/u (Buch, machen).", note: "Vital for clear speaking score" },
          { de: "sp / st at word start", en: "Pronounced as 'shp' / 'sht': sprechen ('shprechen'), Straße ('shtrasse').", note: "Instant native sound" },
          { de: "ß (Eszett)", en: "Pronounced like a sharp 'ss' after long vowels (Straße, heißen).", note: "Never capitalized in standard text" }
        ]
      },
      {
        id: "a0-pronouns-greetings",
        level: "A0",
        title: "Subject Pronouns & Survival Intros",
        title_en: "Personal Pronouns & Introductions",
        description: "The 9 personal pronouns and standard introduction formulas for Part 1 of the speaking exam.",
        keyRule: "In formal speaking (with examiners or officials), ALWAYS use 'Sie' (capitalized). With friends or family, use 'du' or 'ihr'.",
        cheatSheetItems: [
          { de: "ich (I) / du (you singular informal)", en: "ich lerne / du lernst", note: "Everyday conversation" },
          { de: "er (he) / sie (she) / es (it)", en: "er lernt / sie lernt / es lernt", note: "3rd person singular" },
          { de: "wir (we) / ihr (you plural informal)", en: "wir lernen / ihr lernt", note: "Group addressing" },
          { de: "sie (they) / Sie (You formal)", en: "sie lernen / Sie lernen (with capital 'S')", note: "Official exam setting" },
          { de: "Ich heiße ... / Ich komme aus ...", en: "My name is ... / I come from ...", note: "Speaking Part 1 intro" }
        ]
      }
    ]
  },
  {
    level: "A1",
    name: "A1 Grammar Core: Conjugation & Articles",
    badge: "Level 1: The Core Engine",
    summary: "The universal verb conjugation formula, the 3 auxiliary verbs, and the Nominativ vs Akkusativ system.",
    topics: [
      {
        id: "a1-regular-conjugation",
        level: "A1",
        title: "The Universal Verb Conjugation Formula",
        title_en: "Regular Verb Endings Formula",
        description: "How to conjugate 90% of all German verbs. Take the infinitive stem (remove -en) and attach the golden endings.",
        keyRule: "Formula: Stem + endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
        cheatSheetItems: [
          { de: "lernen -> lern-", en: "ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen", note: "Standard regular" },
          { de: "wohnen -> wohn-", en: "ich wohne, du wohnst, er wohnt, wir wohnen, ihr wohnt, sie wohnen", note: "Standard regular" },
          { de: "arbeiten -> arbeit- (ends in -t)", en: "ich arbeite, du arbeitest, er arbeitet (adds 'e' for pronunciation)", note: "t/d stem rule" },
          { de: "heißen -> heiß- (ends in -ß)", en: "ich heiße, du heißt (not heißst), er heißt", note: "s/ß/z stem rule" }
        ]
      },
      {
        id: "a1-auxiliary-and-stem-change",
        level: "A1",
        title: "Auxiliary Verbs & Vokalwechsel Verbs",
        title_en: "sein, haben & Stem-Changers",
        description: "The 3 lifeblood verbs (sein, haben, werden) plus verbs where 'e' changes to 'i/ie' or 'a' changes to 'ä'.",
        keyRule: "Vokalwechsel ONLY happens in 2nd person (du) and 3rd person singular (er/sie/es). 'wir', 'ihr', and 'sie' stay regular!",
        cheatSheetItems: [
          { de: "sein (to be)", en: "ich bin, du bist, er ist, wir sind, ihr seid, sie/Sie sind", note: "Essential for Perfekt" },
          { de: "haben (to have)", en: "ich habe, du hast, er hat, wir haben, ihr habt, sie/Sie haben", note: "Essential for Perfekt" },
          { de: "fahren (a -> ä)", en: "ich fahre, du fährst, er fährt, wir fahren, ihr fahrt, sie fahren", note: "Movement verb" },
          { de: "sprechen (e -> i)", en: "ich spreche, du sprichst, er spricht, wir sprechen, ihr sprecht", note: "Speaking verb" },
          { de: "sehen (e -> ie)", en: "ich sehe, du siehst, er sieht, wir sehen, ihr seht, sie sehen", note: "Visual description" }
        ]
      },
      {
        id: "a1-articles-and-akkusativ",
        level: "A1",
        title: "Articles & The Akkusativ Secret",
        title_en: "der/die/das & Direct Object",
        description: "Understanding genders and why you only need to worry about the masculine gender in Akkusativ.",
        keyRule: "IN AKKUSATIV, ONLY MASCULINE CHANGES: 'der' becomes 'den' (and 'ein' becomes 'einen'). Feminine ('die'/'eine'), Neuter ('das'/'ein'), and Plural ('die') NEVER CHANGE!",
        cheatSheetItems: [
          { de: "Nominativ (Subject: Who?)", en: "der Mann, die Frau, das Kind, die Leute (ein, eine, ein)", note: "Does the action", targetSection: "CASES" },
          { de: "Akkusativ (Object: What?)", en: "den Mann (einen), die Frau (eine), das Kind (ein), die Leute (keine)", note: "Receives action", targetSection: "CASES" },
          { de: "Key Akkusativ verbs", en: "haben, brauchen, kaufen, sehen, essen, trinken, suchen", note: "Always take Akkusativ", targetSection: "CASES" },
          { de: "Example sentence", en: "Ich habe einen Hund (m) und eine Katze (f) und ein Auto (n).", note: "Notice 'einen' for masculine!", targetSection: "CASES" }
        ]
      }
    ]
  },
  {
    level: "A2",
    name: "A2 Bridge: The 6 Modal Verbs, Dativ & Past",
    badge: "Level 2: The Passing Bridge",
    summary: "The 6 modal verbs, sentence bracket, Dativ prepositions, and conversational Perfekt past tense.",
    topics: [
      {
        id: "a2-modal-verbs-choke-point",
        level: "A2",
        title: "The 6 Modal Verbs & Sentence Bracket",
        title_en: "Modal Verbs & Satzklammer",
        description: "Modal verbs express ability, necessity, permission, and polite requests. The conjugated modal verb sits in Position 2, and the action verb is kicked to the very end in infinitive.",
        keyRule: "Formula: Subject (Pos 1) + Modalverb (Pos 2) + Middle + Infinitiv (End). In singular (ich/er), modal verbs have NO personal ending!",
        cheatSheetItems: [
          { de: "können (ability / can)", en: "ich kann, du kannst, er kann, wir können, ihr könnt, sie können", note: "Polite: könnte" },
          { de: "müssen (obligation / must)", en: "ich muss, du musst, er muss, wir müssen, ihr müsst, sie müssen", note: "nicht müssen = optional!" },
          { de: "dürfen (permission / allowed to)", en: "ich darf, du darfst, er darf, wir dürfen, ihr dürft, sie dürfen", note: "nicht dürfen = VERBOTEN!" },
          { de: "sollen (advice / doctor order)", en: "ich soll, du sollst, er soll, wir sollen, ihr sollt, sie sollen", note: "Polite: sollte" },
          { de: "wollen (strong intention / want)", en: "ich will, du willst, er will, wir wollen, ihr wollt, sie wollen", note: "Personal plan" },
          { de: "möchten (polite request / would like)", en: "ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet", note: "Writing standard" }
        ]
      },
      {
        id: "a2-dativ-and-prepositions",
        level: "A2",
        title: "The Dativ Case & Mnemonic Prepositions",
        title_en: "Indirect Object & Dativ Prepositions",
        description: "Dativ indicates to whom or for whom something happens. Certain prepositions ALWAYS demand Dativ.",
        keyRule: "Dativ changes: der -> dem, das -> dem, die -> der, die (pl) -> den ...n. Remember the rhyme: 'Aus, bei, mit, nach, seit, von, zu: Dativ immer im Nu!'",
        cheatSheetItems: [
          { de: "Dativ changes", en: "dem Mann (einem), der Frau (einer), dem Kind (einem), den Freunden (pl + n)", note: "Master 'dem' and 'der'", targetSection: "CASES" },
          { de: "Dativ prepositions (Fixed)", en: "aus, bei, mit, nach, seit, von, zu", note: "Always Dativ!", targetSection: "CASES" },
          { de: "Akkusativ prepositions (Fixed)", en: "für, ohne, durch, gegen, um (FODGU)", note: "Always Akkusativ!", targetSection: "CASES" },
          { de: "Example sentence", en: "Ich fahre mit dem Bus (m) zu meiner Arbeit (f).", note: "Both prepositions trigger Dativ", targetSection: "CASES" }
        ]
      },
      {
        id: "a2-perfekt-past",
        level: "A2",
        title: "Conversational Past Tense (Perfekt)",
        title_en: "Spoken Past Tense (Perfekt)",
        description: "In spoken German and everyday emails, past events are expressed in Perfekt using 'haben' or 'sein' plus the Partizip II at the end.",
        keyRule: "Use 'sein' ONLY for movement (gehen, fahren, fliegen, kommen) or change of state (aufwachen, einschlafen) or 'sein/bleiben'. Everything else uses 'haben'!",
        cheatSheetItems: [
          { de: "Regular Partizip II formula", en: "ge- + verb stem + -t (z. B. gelernt, gemacht, gewohnt, gekauft)", note: "80% of verbs" },
          { de: "Movement with 'sein'", en: "Ich bin nach Berlin gefahren. / Er ist nach Hause gegangen.", note: "sein + movement" },
          { de: "State with 'sein'", en: "Ich bin zu Hause geblieben. / Er ist spät aufgewacht.", note: "sein + state" },
          { de: "Everything else with 'haben'", en: "Ich habe einen Brief geschrieben. / Wir haben Deutsch geübt.", note: "haben + object" }
        ]
      }
    ]
  },
  {
    level: "B1",
    name: "B1 Exam Passing Mastery: Satzbau & Connectors",
    badge: "Level 3: B1 Exam Pass Mastery",
    summary: "Word-order connectors (weil, dass, obwohl, deshalb), letter formulas, and the 60% passing benchmark.",
    topics: [
      {
        id: "b1-connectors-satzbau",
        level: "B1",
        title: "Subordinate Conjunctions (Verb Kickers)",
        title_en: "weil, dass, obwohl & Word Order",
        description: "Examiners listen and look specifically for subordinating conjunctions to award a B1 score. Subordinating connectors kick the conjugated verb to the absolute end.",
        keyRule: "Subordinate: 'weil', 'dass', 'obwohl', 'wenn' -> verb at the VERY END. Coordinating ADUSO ('aber, denn, und, sondern, oder') -> Pos 0, verb in Pos 2.",
        cheatSheetItems: [
          { de: "weil (because)", en: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.", note: "Verb at end", targetSection: "CONJUNCTIONS" },
          { de: "dass (that)", en: "Ich hoffe, dass Sie meine Nachricht erhalten haben.", note: "Writing formula", targetSection: "CONJUNCTIONS" },
          { de: "obwohl (although)", en: "Obwohl es regnet, gehen wir spazieren.", note: "High score connector", targetSection: "CONJUNCTIONS" },
          { de: "Inversion with deshalb", en: "Ich war krank, deshalb konnte ich nicht kommen. (deshalb + verb + subject)", note: "Inversion", targetSection: "CONJUNCTIONS" }
        ]
      },
      {
        id: "b1-exam-day-blueprint",
        level: "B1",
        title: "The 60% Passing Rubric & Exam Secrets",
        title_en: "Passing Strategy for Zero-to-B1 Learners",
        description: "How an absolute beginner who completes this platform guarantees 60%+ marks across all 4 exam modules.",
        keyRule: "You do NOT need perfection. You need 60% (18/30 points). Writing templates and speaking structures carry 70% of the total points!",
        cheatSheetItems: [
          { 
            de: "Schreiben (Writing): 75%+ guaranteed", 
            en: "Memorize our 8 templates. Hitting all 4 prompt points with 'weil', 'dass', and 'Könnten Sie bitte...' satisfies the CEFR rubric.", 
            note: "Easiest module to pass", 
            targetSection: "WRITING" 
          },
          { 
            de: "Sprechen (Speaking): Structure over vocab", 
            en: "Use our 5-sentence picture description: 'Auf dem Bild sehe ich...', 'Im Vordergrund...', 'Ich vermute, dass...'.", 
            note: "Examiners love structure", 
            targetSection: "SPEAKING" 
          },
          { 
            de: "Lesen & Hören: 18/30 passing mark", 
            en: "Look for synonym keywords and beware the 'nicht dürfen' (forbidden) vs 'nicht müssen' (optional) traps.", 
            note: "Multiple choice safety", 
            targetSection: "READING",
            secondaryTargetSection: "LISTENING"
          }
        ]
      }
    ]
  }
];
