export interface ModalVerbInfo {
  verb: string;
  meaning_en: string;
  coreFunction: string;
  examTrapWarning: string;
  conjugation: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  pastOrPolite: {
    label: string;
    forms: {
      ich: string;
      du: string;
      er_sie_es: string;
      wir: string;
    };
  };
  sampleSentences: {
    de: string;
    en: string;
    highlight: string;
  }[];
}

export interface SatzbauRule {
  id: string;
  title: string;
  category: "MODAL" | "SUBORDINATE" | "COORDINATING" | "INVERSION" | "PERFEKT";
  ruleDescription: string;
  formula: string;
  connectors?: string[];
  examples: {
    de: string;
    en: string;
    verbPos: string;
  }[];
  trapToAvoid: string;
}

export interface GrammarQuizQuestion {
  id: number;
  type: "MODAL_TRAP" | "SATZBAU" | "CONNECTOR" | "NEGATION";
  category: string;
  prompt_de: string;
  prompt_en: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation_de: string;
    explanation_en: string;
  }[];
}

export interface WordOrderPuzzle {
  id: number;
  prompt_en: string;
  scrambledTokens: string[];
  correctOrder: string[];
  ruleExplanation: string;
}

export const MODAL_VERBS_DATA: ModalVerbInfo[] = [
  {
    verb: "können",
    meaning_en: "can / to be able to / possibility",
    coreFunction: "Expressing ability, possibility, or polite requests.",
    examTrapWarning: "In polite requests for letters and speaking, use 'Könnten Sie bitte...' (Could you please...)",
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
      forms: {
        ich: "konnte / könnte",
        du: "konntest / könntest",
        er_sie_es: "konnte / könnte",
        wir: "konnten / könnten"
      }
    },
    sampleSentences: [
      {
        de: "Ich kann sehr gut Englisch und etwas Deutsch sprechen.",
        en: "I can speak English very well and a little German.",
        highlight: "kann ... sprechen (A1/A2 Speaking Intro)"
      },
      {
        de: "Könnten Sie mir bitte die Unterlagen per E-Mail schicken?",
        en: "Could you please send me the documents by email? (High-scoring B1 letter formula)",
        highlight: "Könnten Sie ... schicken? (Polite Request)"
      },
      {
        de: "Ich kann leider morgen nicht zum Unterricht kommen, weil ich arbeiten muss.",
        en: "Unfortunately, I cannot come to class tomorrow because I have to work.",
        highlight: "kann ... kommen (Appointment Cancellation)"
      },
      {
        de: "Können wir uns am Samstag um 15 Uhr am Hauptbahnhof treffen?",
        en: "Can we meet on Saturday at 3 PM at the main station?",
        highlight: "Können wir ... treffen? (Speaking Part 3 Planning)"
      },
      {
        de: "In dieser Situation kann man leider nichts mehr ändern.",
        en: "In this situation, one unfortunately cannot change anything anymore.",
        highlight: "kann man ... ändern (General Observation)"
      },
      {
        de: "Mein Kollege kann sehr gut mit internationalen Kunden umgehen.",
        en: "My colleague is very good at handling international clients.",
        highlight: "kann ... umgehen (Workplace Description)"
      },
      {
        de: "Könntest du mir bitte kurz beim Tragen des Koffers helfen?",
        en: "Could you please help me briefly carry the suitcase?",
        highlight: "Könntest du ... helfen? (Informal Konjunktiv II)"
      },
      {
        de: "Früher konnte ich nicht kochen, aber jetzt mache ich es jeden Tag.",
        en: "In the past I could not cook, but now I do it every day.",
        highlight: "konnte ... kochen (Präteritum Past Ability)"
      }
    ]
  },
  {
    verb: "müssen",
    meaning_en: "must / to have to (Obligation)",
    coreFunction: "Mandatory obligation or necessity.",
    examTrapWarning: "CRITICAL TRAP: 'nicht müssen' does NOT mean forbidden! It means 'you don't have to / optional'!",
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
      forms: {
        ich: "musste",
        du: "musstest",
        er_sie_es: "musste",
        wir: "mussten"
      }
    },
    sampleSentences: [
      {
        de: "Ich muss leider meinen Termin absagen, weil ich krank bin.",
        en: "I unfortunately have to cancel my appointment because I am sick. (Standard B1 writing template)",
        highlight: "muss ... absagen (Formal Cancellation)"
      },
      {
        de: "Sie müssen den Eintritt nicht bezahlen, er ist freiwillig.",
        en: "You do not have to pay the entrance fee, it is voluntary. (Trap: It is optional, not forbidden!)",
        highlight: "müssen ... nicht bezahlen (Optional / No Obligation)"
      },
      {
        de: "Um die B1-Prüfung zu bestehen, muss ich regelmäßig Grammatik wiederholen.",
        en: "In order to pass the B1 exam, I must regularly review grammar.",
        highlight: "muss ... wiederholen (Study Necessity)"
      },
      {
        de: "Wir müssen die Fahrkarten unbedingt im Voraus online buchen.",
        en: "We definitely have to book the tickets online in advance.",
        highlight: "müssen ... buchen (Speaking Part 3 Joint Planning)"
      },
      {
        de: "Gestern musste ich bis 20 Uhr im Büro Überstunden machen.",
        en: "Yesterday I had to work overtime in the office until 8 PM.",
        highlight: "musste ... machen (Präteritum Work Excuse)"
      },
      {
        de: "Alle Bewerber müssen ihren Lebenslauf und ihre Zeugnisse einreichen.",
        en: "All applicants must submit their CV and certificates.",
        highlight: "müssen ... einreichen (Official Job Requirement)"
      },
      {
        de: "Man muss in Deutschland die Ruhezeiten ab 22 Uhr einhalten.",
        en: "In Germany one must observe quiet hours starting at 10 PM.",
        highlight: "muss ... einhalten (Legal Rule / LiD Context)"
      },
      {
        de: "Du musst dir keine Sorgen machen, wir schaffen das zusammen!",
        en: "You don't need to worry, we will manage this together!",
        highlight: "musst ... keine Sorgen machen (Encouragement)"
      }
    ]
  },
  {
    verb: "dürfen",
    meaning_en: "may / to be allowed to (Permission)",
    coreFunction: "Permission and rules. With 'nicht', it means 100% STRICTLY FORBIDDEN.",
    examTrapWarning: "THE #1 B1 EXAM TRAP: 'nicht dürfen' = VERBOTEN (Prohibited). Appears in almost every reading & listening test!",
    conjugation: {
      ich: "darf",
      du: "darfst",
      er_sie_es: "darf",
      wir: "dürfen",
      ihr: "dürft",
      sie_Sie: "dürfen"
    },
    pastOrPolite: {
      label: "Präteritum (Past): durfte / Konjunktiv II: dürfte",
      forms: {
        ich: "durfte / dürfte",
        du: "durftest / dürftest",
        er_sie_es: "durfte / dürfte",
        wir: "durften / dürften"
      }
    },
    sampleSentences: [
      {
        de: "Hier darf man nicht parken. Es ist streng verboten!",
        en: "You are not allowed to park here. It is strictly forbidden!",
        highlight: "darf nicht parken = VERBOTEN (Exam Trap #1)"
      },
      {
        de: "Darf ich Sie etwas fragen?",
        en: "May I ask you something? (Polite speaking starter)",
        highlight: "Darf ich ... fragen? (Polite Question)"
      },
      {
        de: "In der Bibliothek darf man nicht laut telefonieren.",
        en: "One is not allowed to talk loudly on the phone in the library.",
        highlight: "darf nicht ... telefonieren (Prohibition)"
      },
      {
        de: "Ab welchem Alter dürfen Jugendliche in Deutschland wählen?",
        en: "From what age are teenagers in Germany allowed to vote?",
        highlight: "dürfen ... wählen (Citizenship / Voting Right)"
      },
      {
        de: "Während der Prüfung darf man kein Wörterbuch benutzen.",
        en: "During the exam, one is not allowed to use a dictionary.",
        highlight: "darf ... kein benutzen (Exam Rule)"
      },
      {
        de: "Dürfte ich kurz Ihr Telefon benutzen? Mein Akku ist leer.",
        en: "Might I briefly use your telephone? My battery is empty.",
        highlight: "Dürfte ich ... benutzen? (High Politeness Konjunktiv II)"
      },
      {
        de: "Als Kinder durften wir am Wochenende bis 22 Uhr fernsehen.",
        en: "As children we were allowed to watch television until 10 PM on weekends.",
        highlight: "durften ... fernsehen (Präteritum Past Permission)"
      },
      {
        de: "Sie dürfen die Unterlagen gerne per Post oder online einreichen.",
        en: "You are welcome to submit the documents by mail or online.",
        highlight: "dürfen ... einreichen (Official Permission)"
      }
    ]
  },
  {
    verb: "sollen",
    meaning_en: "should / ought to / doctor's or official advice",
    coreFunction: "Recommendations, moral duties, doctor orders, or instructions from a third party.",
    examTrapWarning: "When a doctor or boss gives advice: 'Der Arzt sagt, ich soll im Bett bleiben' (The doctor says I should stay in bed).",
    conjugation: {
      ich: "soll",
      du: "sollst",
      er_sie_es: "soll",
      wir: "sollen",
      ihr: "sollt",
      sie_Sie: "sollen"
    },
    pastOrPolite: {
      label: "Konjunktiv II: sollte (should / polite advice)",
      forms: {
        ich: "sollte",
        du: "solltest",
        er_sie_es: "sollte",
        wir: "sollten"
      }
    },
    sampleSentences: [
      {
        de: "Der Arzt hat gesagt, dass ich viel Wasser trinken soll.",
        en: "The doctor said that I should drink a lot of water.",
        highlight: "soll (Order from Doctor)"
      },
      {
        de: "Was sollen wir zur Abschiedsfeier mitbringen?",
        en: "What should we bring to the farewell party? (Essential for B1 Speaking Part 3: Joint Planning)",
        highlight: "sollen wir ... mitbringen? (Joint Planning)"
      },
      {
        de: "Sie sollten sich vor der Reise unbedingt über die Einreisebestimmungen informieren.",
        en: "You should definitely inform yourself about entry requirements before the trip.",
        highlight: "sollten ... informieren (Polite Recommendation)"
      },
      {
        de: "Soll ich dich heute Nachmittag vom Flughafen abholen?",
        en: "Shall I pick you up from the airport this afternoon?",
        highlight: "Soll ich ... abholen? (Offering Assistance)"
      },
      {
        de: "Die Mitarbeiter sollen die Sicherheitsvorschriften genau beachten.",
        en: "Employees should strictly observe safety regulations.",
        highlight: "sollen ... beachten (Workplace Regulation)"
      },
      {
        de: "Wenn Sie starke Schmerzen haben, sollten Sie sofort einen Arzt aufsuchen.",
        en: "If you have severe pain, you should consult a doctor immediately.",
        highlight: "sollten ... aufsuchen (Medical Advice in Letter)"
      },
      {
        de: "Was soll ich deiner Meinung nach jetzt tun?",
        en: "In your opinion, what should I do right now?",
        highlight: "Was soll ich ... tun? (Asking for Guidance)"
      },
      {
        de: "Gestern sollte ich den Chef anrufen, aber die Leitung war dauernd besetzt.",
        en: "Yesterday I was supposed to call the boss, but the line was constantly busy.",
        highlight: "sollte ... anrufen (Präteritum Planned Duty)"
      }
    ]
  },
  {
    verb: "wollen",
    meaning_en: "to want (Strong intention / plan)",
    coreFunction: "Expressing determined intentions and personal plans.",
    examTrapWarning: "Be careful: 'Ich will' sounds blunt in customer service or letters. Use 'Ich möchte' (I would like) instead for polite requests.",
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
      forms: {
        ich: "wollte",
        du: "wolltest",
        er_sie_es: "wollte",
        wir: "wollten"
      }
    },
    sampleSentences: [
      {
        de: "Ich will mich beruflich weiterentwickeln und neue Fähigkeiten erlernen.",
        en: "I want to develop myself professionally and learn new skills. (Strong statement)",
        highlight: "will mich ... weiterentwickeln (Career Motivation)"
      },
      {
        de: "Wir wollten eigentlich im Juli in den Urlaub fahren, aber der Flug wurde gestrichen.",
        en: "We actually wanted to go on vacation in July, but the flight was cancelled.",
        highlight: "wollten ... fahren (Präteritum Past Intention)"
      },
      {
        de: "Ich will unbedingt die deutsche Staatsbürgerschaft beantragen.",
        en: "I definitely want to apply for German citizenship.",
        highlight: "will ... beantragen (Citizenship Goal)"
      },
      {
        de: "Wollen wir am Wochenende zusammen einen Ausflug nach Potsdam machen?",
        en: "Do we want to make an excursion to Potsdam together on the weekend?",
        highlight: "Wollen wir ... machen? (Speaking Part 3 Proposal)"
      },
      {
        de: "Mein Sohn will später Informatik an der Technischen Universität studieren.",
        en: "My son wants to study computer science at the technical university later.",
        highlight: "will ... studieren (Education Ambition)"
      },
      {
        de: "Die Mieter wollen die Nebenkostenabrechnung vom Mieterverein prüfen lassen.",
        en: "The tenants want to have the utility bill checked by the tenants association.",
        highlight: "wollen ... prüfen lassen (Tenant Context)"
      },
      {
        de: "Ich wollte Ihnen nur kurz Bescheid geben, dass ich etwas später eintreffe.",
        en: "I just wanted to let you know briefly that I will arrive a bit later.",
        highlight: "wollte ... Bescheid geben (Polite Telephone Excuse)"
      },
      {
        de: "Was willst du heute Abend zum Abendessen kochen?",
        en: "What do you want to cook for dinner tonight?",
        highlight: "willst du ... kochen? (Daily Question)"
      }
    ]
  },
  {
    verb: "möchten",
    meaning_en: "would like (Polite wish / request)",
    coreFunction: "The gold standard for polite German in speaking and writing.",
    examTrapWarning: "Technically the Konjunktiv II of mögen, but functions in B1 as the primary polite modal verb.",
    conjugation: {
      ich: "möchte",
      du: "möchtest",
      er_sie_es: "möchte",
      wir: "möchten",
      ihr: "möchtet",
      sie_Sie: "möchten"
    },
    pastOrPolite: {
      label: "Past equivalent: 'wollte' or 'hätte gern gewollt'",
      forms: {
        ich: "hätte gern",
        du: "hättest gern",
        er_sie_es: "hätte gern",
        wir: "hätten gern"
      }
    },
    sampleSentences: [
      {
        de: "Ich möchte mich für die Stelle als Verkäufer bewerben.",
        en: "I would like to apply for the position as sales assistant. (Essential for B1 job application letter)",
        highlight: "möchte mich ... bewerben (Formal Job Application)"
      },
      {
        de: "Ich möchte Sie herzlich zu meiner Geburtstagsfeier am Samstag einladen.",
        en: "I would like to cordially invite you to my birthday party on Saturday.",
        highlight: "möchte Sie ... einladen (Official Invitation)"
      },
      {
        de: "Wir möchten uns über den ständigen Lärm in der Nachbarwohnung beschweren.",
        en: "We would like to complain about the constant noise in the neighboring apartment.",
        highlight: "möchten uns ... beschweren (Formal Complaint Letter)"
      },
      {
        de: "Ich möchte einen Termin bei Frau Dr. Schneider für nächste Woche vereinbaren.",
        en: "I would like to arrange an appointment with Dr. Schneider for next week.",
        highlight: "möchte ... vereinbaren (Medical Scheduling)"
      },
      {
        de: "Was möchten Sie gerne trinken, einen Tee oder ein Mineralwasser?",
        en: "What would you like to drink, a tea or mineral water?",
        highlight: "möchten Sie ... trinken? (Polite Hospitality)"
      },
      {
        de: "Ich möchte mich ganz herzlich für Ihre freundliche Unterstützung bedanken.",
        en: "I would like to thank you very warmly for your kind support.",
        highlight: "möchte mich ... bedanken (Letter Conclusion)"
      },
      {
        de: "Möchten Sie lieber drinnen im Restaurant oder draußen im Garten sitzen?",
        en: "Would you prefer to sit inside the restaurant or outside in the garden?",
        highlight: "Möchten Sie lieber ... sitzen? (Speaking Negotiation)"
      },
      {
        de: "Ich möchte klarstellen, dass es sich hierbei um ein Missverständnis handelt.",
        en: "I would like to clarify that this is a misunderstanding.",
        highlight: "möchte klarstellen (Conflict Resolution)"
      }
    ]
  }
];

export const SATZBAU_RULES_DATA: SatzbauRule[] = [
  {
    id: "modal-bracket",
    title: "Modal Verb Sentence Bracket (Satzklammer)",
    category: "MODAL",
    ruleDescription: "In a standard main clause with a modal verb, the modal verb is conjugated and sits in Position 2. The second action verb remains in the infinitive and is kicked to the VERY END of the sentence.",
    formula: "Subjekt (Pos 1) + Modalverb konjugiert (Pos 2) + Angaben (Zeit, Ort, etc.) + Infinitiv (ENDE)",
    examples: [
      {
        de: "Ich muss heute wegen einer Besprechung länger arbeiten.",
        en: "I have to work longer today because of a meeting.",
        verbPos: "muss in Pos 2, arbeiten at the very end"
      },
      {
        de: "Wir können am Samstag um 14 Uhr gemeinsam einkaufen gehen.",
        en: "We can go shopping together on Saturday at 2 PM.",
        verbPos: "können in Pos 2, einkaufen gehen at the very end"
      }
    ],
    trapToAvoid: "Never put both verbs together in the middle: 'Ich muss arbeiten heute' is an immediate grammar deduction!"
  },
  {
    id: "subordinate-kati",
    title: "Subordinating Conjunctions: Verb at the Very End",
    category: "SUBORDINATE",
    ruleDescription: "Connectors like 'weil' (because), 'dass' (that), 'obwohl' (although), 'wenn' (if/when), and 'damit' (so that) kick the conjugated verb to the absolute end of the clause. If there is a modal verb, the modal verb goes last!",
    formula: "Hauptsatz, + Konjunktion (weil/dass/obwohl) + Subjekt + Mittelfeld + konjugiertes Verb (ENDE)",
    connectors: ["weil (because)", "dass (that)", "obwohl (although)", "wenn (if / when)", "damit (so that)", "ob (whether)"],
    examples: [
      {
        de: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.",
        en: "I am learning German because I would like to work in Germany.",
        verbPos: "möchte goes to the very end after arbeiten"
      },
      {
        de: "Es tut mir leid, dass ich den Termin nicht wahrnehmen kann.",
        en: "I am sorry that I cannot keep the appointment.",
        verbPos: "kann goes to the absolute end"
      },
      {
        de: "Obwohl es stark regnet, geht er jeden Tag spazieren.",
        en: "Although it is raining heavily, he goes for a walk every day.",
        verbPos: "regnet at the end of subclause, then comma, then geht in Pos 2 of main clause"
      }
    ],
    trapToAvoid: "Writing 'weil ich bin krank' is the #1 mistake that fails A2/B1 students. Always write: 'weil ich krank bin'."
  },
  {
    id: "coordinating-aduso",
    title: "Coordinating Conjunctions: Position 0 (ADUSO)",
    category: "COORDINATING",
    ruleDescription: "The ADUSO connectors do NOT change word order. They occupy Position 0. The next clause keeps standard order (Subject in Pos 1, Verb in Pos 2).",
    formula: "[Satz 1], + ADUSO (Pos 0) + Subjekt (Pos 1) + Verb konjugiert (Pos 2) + ...",
    connectors: ["Aber (but)", "Denn (because)", "Und (and)", "Sondern (but rather)", "Oder (or)"],
    examples: [
      {
        de: "Ich habe viel gelernt, aber ich habe noch etwas Prüfungsangst.",
        en: "I studied a lot, but I still have some exam anxiety.",
        verbPos: "aber (Pos 0) -> ich (Pos 1) -> habe (Pos 2)"
      },
      {
        de: "Ich kann nicht kommen, denn mein Sohn ist plötzlich krank.",
        en: "I cannot come, because my son is suddenly sick.",
        verbPos: "denn (Pos 0) -> mein Sohn (Pos 1) -> ist (Pos 2)"
      }
    ],
    trapToAvoid: "Do not kick the verb to the end with 'denn'! 'Denn ich krank bin' is wrong. Use 'denn ich bin krank' OR 'weil ich krank bin'."
  },
  {
    id: "inversion-deshalb",
    title: "Inversion Connectors: Position 1 (Verb in Pos 2)",
    category: "INVERSION",
    ruleDescription: "Adverbial connectors like 'deshalb' (therefore), 'trotzdem' (nevertheless), 'danach' (afterwards), and 'sonst' (otherwise) count as Position 1. Because the verb MUST stay in Position 2 in a main clause, the subject is inverted and moves to Position 3!",
    formula: "Konnektor (Pos 1) + Verb konjugiert (Pos 2) + Subjekt (Pos 3) + ...",
    connectors: ["deshalb / deswegen (therefore)", "trotzdem (nevertheless)", "danach / dann (afterwards)", "sonst (otherwise)"],
    examples: [
      {
        de: "Ich war gestern erkältet, deshalb konnte ich nicht zum Kurs kommen.",
        en: "I had a cold yesterday, therefore I could not come to the course.",
        verbPos: "deshalb (Pos 1) -> konnte (Pos 2) -> ich (Pos 3)"
      },
      {
        de: "Es war sehr kalt, trotzdem haben wir eine Radtour gemacht.",
        en: "It was very cold, nevertheless we went on a bike tour.",
        verbPos: "trotzdem (Pos 1) -> haben (Pos 2) -> wir (Pos 3)"
      }
    ],
    trapToAvoid: "Writing 'deshalb ich konnte nicht' is wrong! Always invert: 'deshalb konnte ich nicht'."
  },
  {
    id: "perfekt-bracket",
    title: "Perfekt Sentence Bracket (haben/sein + Partizip II)",
    category: "PERFEKT",
    ruleDescription: "In spoken German and everyday emails, the past is expressed with Perfekt. The auxiliary verb (haben or sein) is conjugated in Position 2, and the Partizip II is kicked to the absolute end of the sentence.",
    formula: "Subjekt (Pos 1) + haben/sein konjugiert (Pos 2) + Angaben (Zeit, Ort, Objekt) + Partizip II (ENDE)",
    examples: [
      {
        de: "Ich habe gestern bis 18 Uhr im Büro gearbeitet.",
        en: "I worked in the office until 6 PM yesterday.",
        verbPos: "habe in Pos 2, gearbeitet at the very end"
      },
      {
        de: "Wir sind am Wochenende mit dem Zug nach Hamburg gefahren.",
        en: "We travelled to Hamburg by train on the weekend.",
        verbPos: "sind in Pos 2, gefahren at the very end"
      }
    ],
    trapToAvoid: "Never put the Partizip II in the middle: 'Ich habe gearbeitet gestern' is wrong. The Partizip II MUST be at the very end!"
  }
];

export const GRAMMAR_QUIZ_QUESTIONS: GrammarQuizQuestion[] = [
  {
    id: 1,
    type: "MODAL_TRAP",
    category: "Modal Verb Trap: Forbidden vs Optional",
    prompt_de: "Auf dem Schild am Bahnhof steht: 'Hier darf man nicht rauchen'. Was bedeutet das?",
    prompt_en: "The sign at the train station says: 'Hier darf man nicht rauchen'. What does this mean in the exam?",
    options: [
      {
        text: "Rauchen ist hier streng verboten.",
        isCorrect: true,
        explanation_de: "'nicht dürfen' bedeutet immer ein absolutes Verbot (Streng verboten / untersagt).",
        explanation_en: "'nicht dürfen' always means strictly forbidden / prohibited. This is tested repeatedly in B1 reading!"
      },
      {
        text: "Man muss hier nicht rauchen, aber man kann es tun.",
        isCorrect: false,
        explanation_de: "Das wäre 'nicht müssen' (Freiwilligkeit). 'Nicht dürfen' bedeutet Verbot!",
        explanation_en: "That would be 'nicht müssen' (optional). 'Nicht dürfen' is an absolute prohibition!"
      },
      {
        text: "Man soll hier rauchen.",
        isCorrect: false,
        explanation_de: "'sollen' bedeutet eine Empfehlung, das Gegenteil von 'darf nicht'.",
        explanation_en: "'sollen' means recommendation, the exact opposite of 'darf nicht'."
      }
    ]
  },
  {
    id: 2,
    type: "MODAL_TRAP",
    category: "Modal Verb Trap: Optional vs Forbidden",
    prompt_de: "Die Bibliothekarin sagt: 'Sie müssen für die Registrierung nichts bezahlen.' Was bedeutet das?",
    prompt_en: "The librarian says: 'Sie müssen für die Registrierung nichts bezahlen.' What does this mean?",
    options: [
      {
        text: "Die Registrierung ist kostenlos (kostenfrei).",
        isCorrect: true,
        explanation_de: "'nichts bezahlen müssen' bedeutet, dass es keine Pflicht gibt (kostenlos / gratis).",
        explanation_en: "'nicht müssen' means no obligation (it is free of charge / optional)."
      },
      {
        text: "Es ist verboten, Geld zu bezahlen.",
        isCorrect: false,
        explanation_de: "Verboten wäre 'Sie dürfen nicht bezahlen'.",
        explanation_en: "Forbidden would be 'Sie dürfen nicht bezahlen'."
      },
      {
        text: "Man darf sich hier nicht registrieren.",
        isCorrect: false,
        explanation_de: "Falsch: Man kann sich registrieren, es kostet nur nichts.",
        explanation_en: "False: You can register, it just does not cost money."
      }
    ]
  },
  {
    id: 3,
    type: "SATZBAU",
    category: "Sentence Order: Conjunction 'weil'",
    prompt_de: "Welcher Satz hat die richtige B1-Satzstruktur mit 'weil'?",
    prompt_en: "Which sentence has the correct B1 word order with 'weil' (because)?",
    options: [
      {
        text: "Ich bleibe heute zu Hause, weil ich leider krank bin.",
        isCorrect: true,
        explanation_de: "'weil' kickt das konjugierte Verb 'bin' an das absolute Satzende.",
        explanation_en: "'weil' kicks the conjugated verb 'bin' to the very end of the subclause."
      },
      {
        text: "Ich bleibe heute zu Hause, weil ich bin leider krank.",
        isCorrect: false,
        explanation_de: "Das Verb 'bin' darf nach 'weil' niemals in Position 2 stehen!",
        explanation_en: "The verb 'bin' must never stay in position 2 after 'weil'!"
      },
      {
        text: "Ich bleibe heute zu Hause, weil bin ich leider krank.",
        isCorrect: false,
        explanation_de: "Inversion nach 'weil' ist grammatikalisch falsch.",
        explanation_en: "Inversion directly after 'weil' is grammatically incorrect."
      }
    ]
  },
  {
    id: 4,
    type: "SATZBAU",
    category: "Sentence Order: Conjunction 'obwohl'",
    prompt_de: "Ergänzen Sie den Satz richtig: 'Obwohl er wenig geschlafen hat, ...'",
    prompt_en: "Complete the sentence correctly: 'Obwohl er wenig geschlafen hat, ...'",
    options: [
      {
        text: "... geht er pünktlich zur Arbeit.",
        isCorrect: true,
        explanation_de: "Nach dem Nebensatz mit 'obwohl' folgt im Hauptsatz sofort das Verb 'geht' auf Position 2!",
        explanation_en: "When the subordinate clause comes first, the main clause immediately begins with the conjugated verb ('geht')!"
      },
      {
        text: "... er geht pünktlich zur Arbeit.",
        isCorrect: false,
        explanation_de: "Nach dem Nebensatz steht das Verb an erster Stelle des Hauptsatzes (Position 2 des Gesamtsatzes).",
        explanation_en: "After the comma, the verb must immediately follow ('geht er')."
      },
      {
        text: "... zur Arbeit er pünktlich geht.",
        isCorrect: false,
        explanation_de: "Das Verb gehört nicht ans Ende des Hauptsatzes.",
        explanation_en: "The verb does not belong at the end of the main clause."
      }
    ]
  },
  {
    id: 5,
    type: "CONNECTOR",
    category: "Connector: Inversion with 'deshalb'",
    prompt_de: "Welcher Satz mit 'deshalb' (therefore) ist grammatikalisch korrekt?",
    prompt_en: "Which sentence with 'deshalb' (therefore) is grammatically correct?",
    options: [
      {
        text: "Mein Zug hatte Verspätung, deshalb komme ich 20 Minuten später.",
        isCorrect: true,
        explanation_de: "'deshalb' besetzt Position 1, daher rückt das konjugierte Verb 'komme' auf Position 2 vor das Subjekt.",
        explanation_en: "'deshalb' occupies position 1, so the conjugated verb 'komme' takes position 2 before the subject."
      },
      {
        text: "Mein Zug hatte Verspätung, deshalb ich komme 20 Minuten später.",
        isCorrect: false,
        explanation_de: "Keine Inversion: 'deshalb ich komme' ist ein typischer Fehler bei B1-Prüfungen.",
        explanation_en: "Missing inversion: 'deshalb ich komme' is a typical deduction in B1 exams."
      },
      {
        text: "Mein Zug hatte Verspätung, deshalb 20 Minuten später komme ich.",
        isCorrect: false,
        explanation_de: "Das Verb 'komme' muss direkt nach 'deshalb' stehen.",
        explanation_en: "The verb 'komme' must immediately follow 'deshalb'."
      }
    ]
  },
  {
    id: 6,
    type: "MODAL_TRAP",
    category: "Modal Verb: Polite Request in Writing",
    prompt_de: "Welche Formulierung ist die höflichste und bringt die meisten B1-Punkte in einem formellen Brief?",
    prompt_en: "Which phrasing is the most polite and scores the highest points in a formal B1 letter?",
    options: [
      {
        text: "Könnten Sie mir bitte die Bestätigung zusenden?",
        isCorrect: true,
        explanation_de: "Konjunktiv II 'Könnten Sie bitte...' ist die offizielle B1-Standardformel für höfliche Bitten.",
        explanation_en: "Konjunktiv II 'Könnten Sie bitte...' is the official B1 standard formula for polite requests."
      },
      {
        text: "Sie müssen mir die Bestätigung senden.",
        isCorrect: false,
        explanation_de: "'müssen' klingt fordernd und unhöflich im Brief.",
        explanation_en: "'müssen' sounds demanding and impolite in a formal letter."
      },
      {
        text: "Ich will die Bestätigung haben.",
        isCorrect: false,
        explanation_de: "'Ich will haben' ist unhöflich und führt zu Punktabzug.",
        explanation_en: "'Ich will haben' is impolite and leads to point deductions."
      }
    ]
  },
  {
    id: 7,
    type: "SATZBAU",
    category: "Sentence Order: Conjunction 'dass'",
    prompt_de: "Frau Müller sagt: 'Ich hoffe, dass ...'",
    prompt_en: "Frau Müller says: 'Ich hoffe, dass ...'",
    options: [
      {
        text: "... Sie meine Nachricht rechtzeitig erhalten haben.",
        isCorrect: true,
        explanation_de: "'dass' schickt das Hilfsverb 'haben' an das allerletzte Satzende nach dem Partizip 'erhalten'.",
        explanation_en: "'dass' sends the auxiliary verb 'haben' to the very end after participle 'erhalten'."
      },
      {
        text: "... Sie haben meine Nachricht rechtzeitig erhalten.",
        isCorrect: false,
        explanation_de: "'haben' darf nach 'dass' nicht in Position 2 stehen.",
        explanation_en: "'haben' must not stay in position 2 after 'dass'."
      },
      {
        text: "... haben Sie rechtzeitig meine Nachricht erhalten.",
        isCorrect: false,
        explanation_de: "Keine Frageform nach 'dass'.",
        explanation_en: "No question inversion after 'dass'."
      }
    ]
  },
  {
    id: 8,
    type: "NEGATION",
    category: "Negation: 'nicht' vs 'kein'",
    prompt_de: "Welcher Satz verwendet die Negation korrekt?",
    prompt_en: "Which sentence uses negation correctly?",
    options: [
      {
        text: "Ich habe heute leider keine Zeit für das Treffen.",
        isCorrect: true,
        explanation_de: "'Zeit' ist ein Nomen ohne bestimmten Artikel, daher verneint man mit 'keine Zeit'.",
        explanation_en: "'Zeit' is a noun without definite article, so it is negated with 'keine Zeit'."
      },
      {
        text: "Ich habe heute leider nicht Zeit für das Treffen.",
        isCorrect: false,
        explanation_de: "'nicht Zeit' ist falsch; Nomen verneint man mit 'kein/keine'.",
        explanation_en: "'nicht Zeit' is incorrect; nouns are negated with 'kein/keine'."
      },
      {
        text: "Ich kann kommen nicht.",
        isCorrect: false,
        explanation_de: "Das Negationswort 'nicht' steht vor dem Infinitiv am Satzende: 'Ich kann nicht kommen'.",
        explanation_en: "'nicht' stands before the infinitive at sentence end: 'Ich kann nicht kommen'."
      }
    ]
  },
  {
    id: 9,
    type: "MODAL_TRAP",
    category: "Modal Verb: 'sollen' vs 'wollen'",
    prompt_de: "Der Chef sagt zu Herrn Weber: 'Herr Weber, Sie sollen den Bericht bis 16 Uhr fertigstellen.' Was drückt 'sollen' hier aus?",
    prompt_en: "The boss says: 'Sie sollen den Bericht bis 16 Uhr fertigstellen.' What does 'sollen' express here?",
    options: [
      {
        text: "Eine Anweisung / Auftrag von einer anderen Person (Chef).",
        isCorrect: true,
        explanation_de: "'sollen' drückt eine Aufforderung oder Aufgabe aus, die von einer anderen Person verlangt wird.",
        explanation_en: "'sollen' expresses an instruction or task requested by another person (the boss/doctor)."
      },
      {
        text: "Herr Webers persönlicher Wunsch.",
        isCorrect: false,
        explanation_de: "Ein persönlicher Wunsch wäre 'Herr Weber will / möchte'.",
        explanation_en: "A personal wish would be 'will / möchte'."
      },
      {
        text: "Herr Weber darf den Bericht nicht schreiben.",
        isCorrect: false,
        explanation_de: "Falsch: Er hat den Auftrag, ihn zu schreiben.",
        explanation_en: "False: He has been instructed to write it."
      }
    ]
  },
  {
    id: 10,
    type: "SATZBAU",
    category: "Sentence Bracket with Modal Verb in Past (Präteritum)",
    prompt_de: "Welcher Satz im Präteritum mit Modalverb ist korrekt formuliert?",
    prompt_en: "Which past tense sentence with modal verb is correctly formulated?",
    options: [
      {
        text: "Gestern musste ich wegen Fiebers den ganzen Tag im Bett bleiben.",
        isCorrect: true,
        explanation_de: "Präteritum 'musste' auf Position 2, Infinitiv 'bleiben' am Satzende.",
        explanation_en: "Past tense modal 'musste' in position 2, infinitive 'bleiben' at the very end."
      },
      {
        text: "Gestern ich musste im Bett bleiben den ganzen Tag.",
        isCorrect: false,
        explanation_de: "Zeitangabe 'Gestern' auf Pos 1 verlangt das Verb 'musste' auf Pos 2 (Inversion).",
        explanation_en: "Starting with 'Gestern' requires the verb 'musste' in position 2."
      },
      {
        text: "Gestern musste im Bett ich bleiben.",
        isCorrect: false,
        explanation_de: "Das Subjekt 'ich' muss direkt nach dem Verb auf Position 3 stehen.",
        explanation_en: "The subject 'ich' must immediately follow the verb in position 3."
      }
    ]
  },
  {
    id: 11,
    type: "SATZBAU",
    category: "Subordinate Clause with Modal Verb",
    prompt_de: "Welcher Nebensatz mit 'weil' und Modalverb ist grammatikalisch korrekt?",
    prompt_en: "Which subclause with 'weil' and a modal verb is grammatically correct?",
    options: [
      {
        text: "Ich kann nicht zur Feier kommen, weil ich am Samstag arbeiten muss.",
        isCorrect: true,
        explanation_de: "Im Nebensatz mit Modalverb steht zuerst der Infinitiv ('arbeiten') und ganz am Ende das konjugierte Modalverb ('muss').",
        explanation_en: "In a subclause with a modal verb, the infinitive comes first, and the conjugated modal verb stands at the very end."
      },
      {
        text: "Ich kann nicht zur Feier kommen, weil ich muss am Samstag arbeiten.",
        isCorrect: false,
        explanation_de: "'muss' darf nach 'weil' nicht auf Position 2 stehen.",
        explanation_en: "'muss' must not stay in position 2 after 'weil'."
      },
      {
        text: "Ich kann nicht zur Feier kommen, weil ich am Samstag muss arbeiten.",
        isCorrect: false,
        explanation_de: "Das konjugierte Modalverb gehört an das absolute Satzende hinter den Infinitiv: 'arbeiten muss'.",
        explanation_en: "The conjugated modal verb belongs at the very end after the infinitive: 'arbeiten muss'."
      }
    ]
  },
  {
    id: 12,
    type: "SATZBAU",
    category: "Perfekt Auxiliary: Movement ('sein' vs 'haben')",
    prompt_de: "Welcher Satz im Perfekt verwendet das richtige Hilfsverb?",
    prompt_en: "Which past tense (Perfekt) sentence uses the correct auxiliary verb?",
    options: [
      {
        text: "Gestern bin ich mit dem Schnellzug nach München gefahren.",
        isCorrect: true,
        explanation_de: "Verben der Ortsveränderung wie 'fahren', 'gehen', 'fliegen' bilden das Perfekt immer mit 'sein'.",
        explanation_en: "Verbs indicating change of location like 'fahren', 'gehen', 'fliegen' always form Perfekt with 'sein'."
      },
      {
        text: "Gestern habe ich mit dem Schnellzug nach München gefahren.",
        isCorrect: false,
        explanation_de: "'haben gefahren' ist falsch bei Ortsveränderung ohne Akkusativobjekt.",
        explanation_en: "'haben gefahren' is incorrect for change of location without a direct accusative object."
      },
      {
        text: "Gestern fahre ich nach München gewesen.",
        isCorrect: false,
        explanation_de: "Grammatikalisch vollkommen fehlerhafte Konstruktion.",
        explanation_en: "Grammatically invalid construction."
      }
    ]
  },
  {
    id: 13,
    type: "SATZBAU",
    category: "Perfekt Auxiliary: Change of State ('sein')",
    prompt_de: "Welcher Satz beschreibt eine Zustandsänderung mit 'sein' korrekt?",
    prompt_en: "Which sentence correctly describes a change of state using 'sein'?",
    options: [
      {
        text: "Das Baby ist gestern Abend sehr schnell eingeschlafen.",
        isCorrect: true,
        explanation_de: "Zustandsänderungen wie 'einschlafen' oder 'aufwachen' bilden das Perfekt immer mit 'sein'.",
        explanation_en: "Verbs of state change like 'einschlafen' (fall asleep) or 'aufwachen' (wake up) always take 'sein'."
      },
      {
        text: "Das Baby hat gestern Abend sehr schnell eingeschlafen.",
        isCorrect: false,
        explanation_de: "'einschlafen' bildet das Perfekt mit 'ist', nicht mit 'hat'.",
        explanation_en: "'einschlafen' forms Perfekt with 'ist', not with 'hat'."
      },
      {
        text: "Das Baby ist geschlafen sehr schnell.",
        isCorrect: false,
        explanation_de: "'schlafen' (Zustand) bildet Perfekt mit 'haben', aber 'einschlafen' (Veränderung) mit 'sein'.",
        explanation_en: "'schlafen' takes 'haben', but 'einschlafen' takes 'sein' and requires the prefix 'eingeschlafen'."
      }
    ]
  },
  {
    id: 14,
    type: "SATZBAU",
    category: "Perfekt Auxiliary: Stationary Verbs ('haben')",
    prompt_de: "Welcher Satz verwendet das Hilfsverb 'haben' im Perfekt korrekt?",
    prompt_en: "Which sentence uses the auxiliary 'haben' correctly in the Perfekt?",
    options: [
      {
        text: "Am Wochenende haben wir drei Stunden für die Deutschprüfung gelernt.",
        isCorrect: true,
        explanation_de: "'lernen' ist ein Tätigkeitsverb ohne Orts- oder Zustandsveränderung und bildet das Perfekt mit 'haben'.",
        explanation_en: "'lernen' is an activity verb without change of location or state, so it forms Perfekt with 'haben'."
      },
      {
        text: "Am Wochenende sind wir drei Stunden für die Deutschprüfung gelernt.",
        isCorrect: false,
        explanation_de: "'lernen' bildet das Perfekt niemals mit 'sein'.",
        explanation_en: "'lernen' never forms the Perfekt with 'sein'."
      },
      {
        text: "Am Wochenende haben wir drei Stunden gelernt werden.",
        isCorrect: false,
        explanation_de: "Falsche Mischung aus Perfekt und Passiv.",
        explanation_en: "Incorrect mixture of Perfekt and passive voice."
      }
    ]
  },
  {
    id: 15,
    type: "SATZBAU",
    category: "Two-Way Prepositions: Direction / Motion (Akkusativ)",
    prompt_de: "Wohin stellen Sie die Lampe? Wählen Sie den korrekten Akkusativ:",
    prompt_en: "Where are you placing the lamp? Choose the correct Accusative:",
    options: [
      {
        text: "Ich stelle die neue Lampe auf den Schreibtisch.",
        isCorrect: true,
        explanation_de: "Frage 'Wohin?' (Aktion/Bewegung) verlangt bei Wechselpräpositionen ('auf') den Akkusativ: 'den Schreibtisch' (maskulin).",
        explanation_en: "The question 'Wohin?' (direction/motion) requires Accusative with two-way prepositions: 'den Schreibtisch'."
      },
      {
        text: "Ich stelle die neue Lampe auf dem Schreibtisch.",
        isCorrect: false,
        explanation_de: "'auf dem' ist Dativ (Wo? - Zustand). 'stellen' ist eine Bewegung (Wohin? - Akkusativ).",
        explanation_en: "'auf dem' is Dative (stationary location). 'stellen' is movement (direction - Accusative)."
      },
      {
        text: "Ich stelle die neue Lampe auf der Schreibtisch.",
        isCorrect: false,
        explanation_de: "'der' ist Nominativ oder Dativ feminin, aber 'Schreibtisch' ist maskulin Akkusativ ('den').",
        explanation_en: "'Schreibtisch' is masculine accusative, requiring 'den'."
      }
    ]
  },
  {
    id: 16,
    type: "SATZBAU",
    category: "Two-Way Prepositions: Location (Dativ)",
    prompt_de: "Wo steht die Lampe jetzt? Wählen Sie den korrekten Dativ:",
    prompt_en: "Where is the lamp standing now? Choose the correct Dative:",
    options: [
      {
        text: "Die Lampe steht jetzt auf dem Schreibtisch.",
        isCorrect: true,
        explanation_de: "Frage 'Wo?' (Ruhe/Position) verlangt bei Wechselpräpositionen ('auf') den Dativ: 'dem Schreibtisch' (maskulin).",
        explanation_en: "The question 'Wo?' (stationary position) requires Dative with two-way prepositions: 'dem Schreibtisch'."
      },
      {
        text: "Die Lampe steht jetzt auf den Schreibtisch.",
        isCorrect: false,
        explanation_de: "'auf den' ist Akkusativ (Wohin? - Richtung). Bei 'stehen' braucht man Dativ.",
        explanation_en: "'auf den' is Accusative (direction). 'stehen' describes a position and requires Dative."
      },
      {
        text: "Die Lampe steht jetzt an der Schreibtisch.",
        isCorrect: false,
        explanation_de: "Falsche Präposition und falscher Artikel.",
        explanation_en: "Wrong preposition and incorrect article."
      }
    ]
  },
  {
    id: 17,
    type: "SATZBAU",
    category: "Fixed Dative Prepositions: 'mit', 'bei', 'nach', 'zu'",
    prompt_de: "Welcher Satz verwendet die Präposition 'mit' grammatikalisch richtig?",
    prompt_en: "Which sentence uses the preposition 'mit' grammatically correctly?",
    options: [
      {
        text: "Ich fahre jeden Tag mit der U-Bahn zur Arbeit.",
        isCorrect: true,
        explanation_de: "'mit' verlangt ausnahmslos den Dativ: 'die U-Bahn' wird im Dativ zu 'der U-Bahn'.",
        explanation_en: "'mit' always takes the Dative: 'die U-Bahn' becomes 'der U-Bahn' in Dative."
      },
      {
        text: "Ich fahre jeden Tag mit die U-Bahn zur Arbeit.",
        isCorrect: false,
        explanation_de: "'die' ist Akkusativ/Nominativ. 'mit' braucht immer Dativ ('der').",
        explanation_en: "'die' is Accusative. 'mit' always requires Dative ('der')."
      },
      {
        text: "Ich fahre jeden Tag mit den U-Bahn zur Arbeit.",
        isCorrect: false,
        explanation_de: "'den' ist maskulin Akkusativ oder Plural Dativ. U-Bahn ist feminin Singular.",
        explanation_en: "'U-Bahn' is feminine singular, so Dative is 'der'."
      }
    ]
  },
  {
    id: 18,
    type: "SATZBAU",
    category: "Fixed Accusative Prepositions: 'für', 'ohne', 'durch', 'um'",
    prompt_de: "Welcher Satz verwendet die Präposition 'für' grammatikalisch richtig?",
    prompt_en: "Which sentence uses the preposition 'für' grammatically correctly?",
    options: [
      {
        text: "Dieses Geschenk ist für meinen neuen Kollegen.",
        isCorrect: true,
        explanation_de: "'für' verlangt immer den Akkusativ: maskulin wird zu 'meinen neuen Kollegen'.",
        explanation_en: "'für' strictly requires the Accusative: masculine becomes 'meinen neuen Kollegen'."
      },
      {
        text: "Dieses Geschenk ist für meinem neuen Kollegen.",
        isCorrect: false,
        explanation_de: "'meinem' ist Dativ. 'für' darf niemals mit Dativ stehen!",
        explanation_en: "'meinem' is Dative. 'für' can never take the Dative!"
      },
      {
        text: "Dieses Geschenk ist für mein neuer Kollege.",
        isCorrect: false,
        explanation_de: "'mein neuer Kollege' ist Nominativ.",
        explanation_en: "'mein neuer Kollege' is Nominative."
      }
    ]
  },
  {
    id: 19,
    type: "SATZBAU",
    category: "Time Preposition 'seit' + Present Tense",
    prompt_de: "Wie drückt man im Deutschen eine Handlung aus, die in der Vergangenheit begann und noch andauert?",
    prompt_en: "How do you express an ongoing situation that began in the past and continues now?",
    options: [
      {
        text: "Ich wohne seit zwei Jahren in Frankfurt.",
        isCorrect: true,
        explanation_de: "'seit' steht immer mit Dativ und im Präsens, wenn die Situation in der Gegenwart noch andauert.",
        explanation_en: "'seit' takes Dative and requires Present tense if the action is still ongoing in the present."
      },
      {
        text: "Ich habe seit zwei Jahren in Frankfurt gewohnt.",
        isCorrect: false,
        explanation_de: "Perfekt bedeutet, dass man dort nicht mehr wohnt. Für andauernde Zustände nutzt Deutsch das Präsens.",
        explanation_en: "Perfekt implies the state ended. For ongoing states, German uses Present tense with 'seit'."
      },
      {
        text: "Ich wohne vor zwei Jahren in Frankfurt.",
        isCorrect: false,
        explanation_de: "'vor' bedeutet einen abgeschlossenen Zeitpunkt in der Vergangenheit ('vor zwei Jahren kam ich an').",
        explanation_en: "'vor' denotes a completed past moment, not an ongoing duration."
      }
    ]
  },
  {
    id: 20,
    type: "CONNECTOR",
    category: "Concessive Subclause: 'obwohl' (Although)",
    prompt_de: "Welcher Satz mit 'obwohl' ist grammatikalisch vollkommen korrekt?",
    prompt_en: "Which sentence with 'obwohl' (although) is grammatically completely correct?",
    options: [
      {
        text: "Obwohl der Zug Verspätung hatte, kamen wir noch pünktlich an.",
        isCorrect: true,
        explanation_de: "'obwohl' kickt das Verb 'hatte' ans Ende. Der Hauptsatz nach dem Komma beginnt sofort mit dem finiten Verb 'kamen'.",
        explanation_en: "'obwohl' sends 'hatte' to the end. The main clause after the comma must start immediately with the finite verb 'kamen'."
      },
      {
        text: "Obwohl der Zug hatte Verspätung, wir kamen pünktlich an.",
        isCorrect: false,
        explanation_de: "Zwei schwere Fehler: Verb auf Pos 2 im Nebensatz und kein Verbanschluss im Hauptsatz.",
        explanation_en: "Two major errors: verb in pos 2 in subclause, and missing inversion in the main clause."
      },
      {
        text: "Obwohl der Zug Verspätung hatte, wir kamen pünktlich an.",
        isCorrect: false,
        explanation_de: "Nach dem Komma muss das konjugierte Verb stehen: 'kamen wir', nicht 'wir kamen'.",
        explanation_en: "After the comma, the conjugated verb must come first: 'kamen wir', not 'wir kamen'."
      }
    ]
  },
  {
    id: 21,
    type: "CONNECTOR",
    category: "Inversion Connector: 'deshalb' (Therefore / Pos 1)",
    prompt_de: "Welcher Satz mit 'deshalb' verwendet die richtige Verbposition?",
    prompt_en: "Which sentence with 'deshalb' uses the correct verb position?",
    options: [
      {
        text: "Mein Wecker war kaputt, deshalb bin ich heute zu spät gekommen.",
        isCorrect: true,
        explanation_de: "'deshalb' besetzt Position 1 im zweiten Satz. Auf Position 2 folgt direkt das konjugierte Verb 'bin'.",
        explanation_en: "'deshalb' occupies Position 1 in the second clause, followed immediately by the verb 'bin' in Position 2."
      },
      {
        text: "Mein Wecker war kaputt, deshalb ich bin heute zu spät gekommen.",
        isCorrect: false,
        explanation_de: "'deshalb' ist kein ADUSO-Konnektor. Das Subjekt 'ich' darf nicht vor dem Verb stehen.",
        explanation_en: "'deshalb' causes inversion. The subject 'ich' cannot precede the verb."
      },
      {
        text: "Mein Wecker war kaputt, deshalb ich zu spät gekommen bin.",
        isCorrect: false,
        explanation_de: "'deshalb' ist keine unterordnende Konjunktion und kickt das Verb nicht ans Ende.",
        explanation_en: "'deshalb' does not push the verb to the end like 'weil'."
      }
    ]
  },
  {
    id: 22,
    type: "CONNECTOR",
    category: "Inversion Connector: 'trotzdem' (Nevertheless / Pos 1)",
    prompt_de: "Welcher Satz mit 'trotzdem' ist korrekt aufgebaut?",
    prompt_en: "Which sentence with 'trotzdem' (nevertheless) is correctly structured?",
    options: [
      {
        text: "Es regnete sehr stark, trotzdem ging Herr Müller ohne Schirm spazieren.",
        isCorrect: true,
        explanation_de: "'trotzdem' auf Position 1 verlangt das Präteritum-Verb 'ging' sofort auf Position 2 (Inversion).",
        explanation_en: "'trotzdem' in Position 1 requires the verb 'ging' in Position 2 before the subject."
      },
      {
        text: "Es regnete sehr stark, trotzdem Herr Müller ging spazieren.",
        isCorrect: false,
        explanation_de: "Fehlende Inversion nach 'trotzdem': 'ging Herr Müller' ist vorgeschrieben.",
        explanation_en: "Missing inversion: 'ging Herr Müller' is required."
      },
      {
        text: "Es regnete sehr stark, trotzdem Herr Müller ohne Schirm spazieren ging.",
        isCorrect: false,
        explanation_de: "'trotzdem' ist kein Nebensatz-Einleiter mit Verb am Ende (das wäre 'obwohl').",
        explanation_en: "'trotzdem' is not a subordinator; that would be 'obwohl'."
      }
    ]
  },
  {
    id: 23,
    type: "SATZBAU",
    category: "Infinitive with 'um ... zu' vs 'damit'",
    prompt_de: "Wann verwendet man 'um ... zu' anstelle von 'damit'?",
    prompt_en: "When do you use 'um ... zu' instead of 'damit'?",
    options: [
      {
        text: "Wenn das Subjekt im Hauptsatz und Nebensatz identisch ist (gleiche Person).",
        isCorrect: true,
        explanation_de: "Beispiel: 'Ich lerne Deutsch, um in Deutschland zu arbeiten' (Ich = Ich). Bei verschiedenen Subjekten muss 'damit' stehen.",
        explanation_en: "When the subject in both clauses is identical. Example: 'Ich lerne Deutsch, um zu arbeiten'. If subjects differ, use 'damit'."
      },
      {
        text: "Wenn zwei verschiedene Personen handeln.",
        isCorrect: false,
        explanation_de: "Bei verschiedenen Subjekten muss zwingend 'damit' verwendet werden.",
        explanation_en: "With different subjects, 'damit' must strictly be used."
      },
      {
        text: "Nur in der Vergangenheit.",
        isCorrect: false,
        explanation_de: "'um ... zu' wird in allen Zeitformen genutzt.",
        explanation_en: "'um ... zu' is used across all tenses."
      }
    ]
  },
  {
    id: 24,
    type: "SATZBAU",
    category: "Subclause 'damit' (Different Subjects)",
    prompt_de: "Welcher Satz mit 'damit' ist grammatikalisch fehlerfrei?",
    prompt_en: "Which sentence with 'damit' (so that) is grammatically flawless?",
    options: [
      {
        text: "Die Mutter schickt den Brief per Einschreiben, damit er sicher ankommt.",
        isCorrect: true,
        explanation_de: "'damit' leitet einen Nebensatz ein: Das konjugierte Verb 'ankommt' steht am Satzende.",
        explanation_en: "'damit' introduces a subordinate clause: the conjugated verb 'ankommt' stands at the end."
      },
      {
        text: "Die Mutter schickt den Brief per Einschreiben, damit er kommt sicher an.",
        isCorrect: false,
        explanation_de: "Das trennbare Verb darf nicht getrennt auf Position 2 stehen, sondern steht zusammen am Ende: 'ankommt'.",
        explanation_en: "The separable verb cannot stay separated in pos 2; it stays united at the end: 'ankommt'."
      },
      {
        text: "Die Mutter schickt den Brief per Einschreiben, um er sicher ankommt.",
        isCorrect: false,
        explanation_de: "'um' kann keinen Nebensatz mit Subjekt ('er') einleiten.",
        explanation_en: "'um' cannot introduce a clause with a personal subject."
      }
    ]
  },
  {
    id: 25,
    type: "CONNECTOR",
    category: "Past Time: 'als' vs 'wenn'",
    prompt_de: "Welcher Satz verwendet 'als' für ein einmaliges vergangenes Ereignis korrekt?",
    prompt_en: "Which sentence uses 'als' correctly for a single past event?",
    options: [
      {
        text: "Als ich vor fünf Jahren nach Deutschland kam, sprach ich noch kein Wort Deutsch.",
        isCorrect: true,
        explanation_de: "Für einmalige Handlungen oder Zeiträume in der Vergangenheit verwendet man immer 'als', niemals 'wenn'.",
        explanation_en: "For single, non-repeated events or periods in the past, German strictly uses 'als', never 'wenn'."
      },
      {
        text: "Wenn ich vor fünf Jahren nach Deutschland kam, sprach ich kein Deutsch.",
        isCorrect: false,
        explanation_de: "'wenn' im Präteritum drückt eine wiederholte Handlung aus ('jedes Mal wenn'). Einmalig erfordert 'als'.",
        explanation_en: "'wenn' in past indicates repeated events ('every time when'). Single past events require 'als'."
      },
      {
        text: "Wann ich vor fünf Jahren nach Deutschland kam, sprach ich kein Deutsch.",
        isCorrect: false,
        explanation_de: "'wann' ist ein Fragewort ('Wann kommst du?') und keine zeitliche Verbindungskonjunktion.",
        explanation_en: "'wann' is an interrogative question word, not a temporal conjunction."
      }
    ]
  },
  {
    id: 26,
    type: "CONNECTOR",
    category: "Repeated Time in Past: 'immer wenn'",
    prompt_de: "Wie drückt man eine wiederholte Gewohnheit in der Vergangenheit aus?",
    prompt_en: "How do you express a repeated habit in the past?",
    options: [
      {
        text: "Immer wenn ich früher Ferien hatte, besuchte ich meine Großeltern.",
        isCorrect: true,
        explanation_de: "Bei mehrfachen, wiederholten Ereignissen in der Vergangenheit sagt man 'immer wenn' (oder '(jedes Mal) wenn').",
        explanation_en: "For repeated actions or habits in the past, use 'immer wenn' (every time when)."
      },
      {
        text: "Immer als ich früher Ferien hatte, besuchte ich meine Großeltern.",
        isCorrect: false,
        explanation_de: "'als' kann nicht für wiederholte Ereignisse mit 'immer' kombiniert werden.",
        explanation_en: "'als' cannot be used with 'immer' for repeated events."
      },
      {
        text: "Immer wann ich Ferien hatte, besuchte ich meine Großeltern.",
        isCorrect: false,
        explanation_de: "'wann' ist nur eine Frage nach der Uhrzeit oder dem Datum.",
        explanation_en: "'wann' is strictly for direct or indirect questions about time."
      }
    ]
  },
  {
    id: 27,
    type: "SATZBAU",
    category: "Adjective Declension: Definite Article in Dative",
    prompt_de: "Welche Adjektivendung ist nach dem bestimmten Artikel im Dativ maskulin richtig?",
    prompt_en: "Which adjective ending is correct after a definite article in masculine Dative?",
    options: [
      {
        text: "Ich habe gestern mit dem neuen Vermieter telefoniert.",
        isCorrect: true,
        explanation_de: "Im Dativ erhalten Adjektive nach dem bestimmten Artikel ('dem', 'der', 'den') immer die Endung '-en'.",
        explanation_en: "In the Dative, adjectives after definite articles ('dem', 'der', 'den') always take the ending '-en'."
      },
      {
        text: "Ich habe gestern mit dem neuem Vermieter telefoniert.",
        isCorrect: false,
        explanation_de: "Die Endung '-em' ist doppelt und falsch, da der Artikel 'dem' bereits das Dativ-Signal trägt.",
        explanation_en: "Ending '-em' is incorrect duplicate signaling because 'dem' already carries the Dative marker."
      },
      {
        text: "Ich habe gestern mit dem neuer Vermieter telefoniert.",
        isCorrect: false,
        explanation_de: "'-er' ist Nominativ oder Dativ feminin ohne Artikel.",
        explanation_en: "'-er' is Nominative, not Dative after 'dem'."
      }
    ]
  },
  {
    id: 28,
    type: "SATZBAU",
    category: "Adjective Declension: Indefinite Article in Accusative",
    prompt_de: "Welche Adjektivendung ist nach dem unbestimmten Artikel im Akkusativ maskulin richtig?",
    prompt_en: "Which adjective ending is correct after an indefinite article in masculine Accusative?",
    options: [
      {
        text: "Mein Freund sucht einen unbefristeten Arbeitsvertrag.",
        isCorrect: true,
        explanation_de: "Akkusativ maskulin verlangt 'einen' und beim Adjektiv die Endung '-en': 'einen unbefristeten Vertrag'.",
        explanation_en: "Masculine Accusative requires 'einen' and the adjective ending '-en': 'einen unbefristeten Vertrag'."
      },
      {
        text: "Mein Freund sucht einen unbefristeter Arbeitsvertrag.",
        isCorrect: false,
        explanation_de: "'-er' ist Nominativ ('ein unbefristeter Vertrag'). Im Akkusativ heißt es '-en'.",
        explanation_en: "'-er' is Nominative. In Accusative, the adjective takes '-en'."
      },
      {
        text: "Mein Freund sucht ein unbefristetes Arbeitsvertrag.",
        isCorrect: false,
        explanation_de: "'Arbeitsvertrag' ist der Vertrag (maskulin), nicht das Vertrag (neutral).",
        explanation_en: "'Vertrag' is masculine (der), not neuter (das)."
      }
    ]
  },
  {
    id: 29,
    type: "SATZBAU",
    category: "Adjective Declension: Indefinite Article in Neuter Nominative",
    prompt_de: "Welche Form ist für ein neutrales Nomen im Nominativ korrekt?",
    prompt_en: "Which form is correct for a neuter noun in the Nominative?",
    options: [
      {
        text: "Wir haben ein schönes Zimmer im Stadtzentrum gemietet.",
        isCorrect: true,
        explanation_de: "Das Zimmer (neutral): Nach 'ein' im Akkusativ/Nominativ neutral bekommt das Adjektiv das Kennzeichen '-es' ('ein schönes Zimmer').",
        explanation_en: "Neuter noun (das Zimmer): After 'ein', the adjective takes '-es' ('ein schönes Zimmer')."
      },
      {
        text: "Wir haben ein schöne Zimmer im Stadtzentrum gemietet.",
        isCorrect: false,
        explanation_de: "'-e' wäre feminin ('eine schöne Wohnung'). Neutral verlangt '-es'.",
        explanation_en: "'-e' is feminine. Neuter requires '-es'."
      },
      {
        text: "Wir haben einen schönes Zimmer im Stadtzentrum gemietet.",
        isCorrect: false,
        explanation_de: "'einen' ist maskulin Akkusativ. Zimmer ist das Zimmer.",
        explanation_en: "'einen' is masculine Accusative. Zimmer is neuter (das)."
      }
    ]
  },
  {
    id: 30,
    type: "MODAL_TRAP",
    category: "Konjunktiv II: Polite Formula for Letters",
    prompt_de: "Welcher Satz ist die höflichste und prüfungsrelevanteste B1-Formel für eine Bitte?",
    prompt_en: "Which sentence is the most polite and high-scoring B1 formula for a request?",
    options: [
      {
        text: "Könnten Sie mir bitte die Quittung per E-Mail zusenden?",
        isCorrect: true,
        explanation_de: "'Könnten Sie bitte...' ist die offizielle B1-Prüfungsformel für maximale Höflichkeit im Brief und Gespräch.",
        explanation_en: "'Könnten Sie bitte...' is the standard B1 high-scoring formula for maximum politeness in letters and speaking."
      },
      {
        text: "Sie müssen mir sofort die Quittung schicken.",
        isCorrect: false,
        explanation_de: "Zu unhöflich und aggressiv für formelle Briefe im B1-Test.",
        explanation_en: "Too impolite and demanding for formal letters in the B1 exam."
      },
      {
        text: "Können Sie schicken mir die Quittung?",
        isCorrect: false,
        explanation_de: "Falscher Satzbau: Das Infinitiv-Verb 'schicken' muss am Satzende stehen.",
        explanation_en: "Incorrect word order: the infinitive 'schicken' must stand at the sentence end."
      }
    ]
  },
  {
    id: 31,
    type: "MODAL_TRAP",
    category: "Konjunktiv II: Hypothetical Wishes ('hätte' / 'wäre')",
    prompt_de: "Welcher Satz drückt einen irrealen Wunsch im Konjunktiv II korrekt aus?",
    prompt_en: "Which sentence correctly expresses an unreal wish in Konjunktiv II?",
    options: [
      {
        text: "Wenn ich mehr Freizeit hätte, würde ich öfter Sport treiben.",
        isCorrect: true,
        explanation_de: "Irrealer Konditionalsatz: 'hätte' im Wenn-Satz am Ende, Hauptsatz mit 'würde' + Infinitiv.",
        explanation_en: "Unreal conditional: 'hätte' at the end of the wenn-clause, main clause with 'würde' + infinitive."
      },
      {
        text: "Wenn ich mehr Freizeit habe, würde ich Sport treiben.",
        isCorrect: false,
        explanation_de: "Falsche Mischung aus Indikativ Präsens ('habe') und Konjunktiv II ('würde').",
        explanation_en: "Invalid mix of Indicative Present ('habe') with Konjunktiv II ('würde')."
      },
      {
        text: "Wenn ich hätte mehr Freizeit, würde ich Sport treiben.",
        isCorrect: false,
        explanation_de: "Nach 'wenn' muss das Verb 'hätte' an das Satzende gestellt werden.",
        explanation_en: "After 'wenn', the verb 'hätte' must stand at the very end."
      }
    ]
  },
  {
    id: 32,
    type: "SATZBAU",
    category: "Reflexive Verbs: 'sich freuen auf' vs 'sich freuen über'",
    prompt_de: "Sie sprechen über eine geplante Feier am nächsten Samstag. Welche Präposition ist richtig?",
    prompt_en: "You are talking about an upcoming party next Saturday. Which preposition is correct?",
    options: [
      {
        text: "Ich freue mich schon sehr auf die Feier am Samstag.",
        isCorrect: true,
        explanation_de: "'sich freuen auf + Akkusativ' bezieht sich immer auf ein zukünftiges Ereignis (Vorfreude).",
        explanation_en: "'sich freuen auf + Accusative' always refers to a future event (anticipation / looking forward to)."
      },
      {
        text: "Ich freue mich schon sehr über die Feier am Samstag.",
        isCorrect: false,
        explanation_de: "'sich freuen über + Akkusativ' bezieht sich auf die Gegenwart oder Vergangenheit (z. B. ein Geschenk, das man schon hat).",
        explanation_en: "'sich freuen über + Accusative' refers to present or past events (e.g. a gift already received)."
      },
      {
        text: "Ich freue mich für die Feier am Samstag.",
        isCorrect: false,
        explanation_de: "'sich freuen für' verwendet man nur für Personen ('Ich freue mich für dich').",
        explanation_en: "'sich freuen für' is only used for people ('I am happy for you')."
      }
    ]
  },
  {
    id: 33,
    type: "SATZBAU",
    category: "Prepositional Verbs: 'sich bewerben um'",
    prompt_de: "Frau Becker schreibt eine Bewerbung. Welche Präposition verlangt 'sich bewerben' für eine Arbeitsstelle?",
    prompt_en: "Which preposition does 'sich bewerben' take when applying for a job position?",
    options: [
      {
        text: "Frau Becker bewirbt sich um die ausgeschriebene Stelle als Buchhalterin.",
        isCorrect: true,
        explanation_de: "'sich bewerben um + Akkusativ' ist die feste Fügung für eine Arbeitsstelle oder einen Ausbildungsplatz.",
        explanation_en: "'sich bewerben um + Accusative' is the fixed collocation for applying for a job or apprenticeship."
      },
      {
        text: "Frau Becker bewirbt sich für die Stelle als Buchhalterin.",
        isCorrect: false,
        explanation_de: "Umgangssprachlich zwar gehört, aber in B1-Briefen und Grammatikprüfungen gilt 'um' als einzig korrekt.",
        explanation_en: "While heard colloquially, only 'um' is standard and accepted on the B1 exam."
      },
      {
        text: "Frau Becker bewirbt sich nach der Stelle als Buchhalterin.",
        isCorrect: false,
        explanation_de: "'nach' ist falsch. Man bewirbt sich 'um' eine Stelle.",
        explanation_en: "'nach' is incorrect. One applies 'um' a job."
      }
    ]
  },
  {
    id: 34,
    type: "SATZBAU",
    category: "Relative Clauses with Preposition (Dative)",
    prompt_de: "Welcher Relativsatz mit Präposition ist grammatikalisch fehlerfrei?",
    prompt_en: "Which relative clause with a preposition is grammatically error-free?",
    options: [
      {
        text: "Das ist die Kollegin, mit der ich das neue Projekt durchführe.",
        isCorrect: true,
        explanation_de: "'die Kollegin' (feminin), 'mit' verlangt Dativ -> Relativpronomen 'der'. Das Verb steht am Satzende: 'durchführe'.",
        explanation_en: "'die Kollegin' is feminine, 'mit' requires Dative -> relative pronoun 'der'. Verb is at the end: 'durchführe'."
      },
      {
        text: "Das ist die Kollegin, mit die ich das neue Projekt durchführe.",
        isCorrect: false,
        explanation_de: "'mit die' ist falsch, da 'mit' zwingend den Dativ verlangt ('mit der').",
        explanation_en: "'mit die' is incorrect; 'mit' strictly requires Dative ('mit der')."
      },
      {
        text: "Das ist die Kollegin, mit der führe ich das Projekt durch.",
        isCorrect: false,
        explanation_de: "Im Relativsatz muss das Verb am Ende stehen ('durchführe'), nicht auf Position 2.",
        explanation_en: "In a relative clause, the verb must stand at the very end, not in Position 2."
      }
    ]
  },
  {
    id: 35,
    type: "SATZBAU",
    category: "Passiv (Passive Voice Recognition in B1 Reading)",
    prompt_de: "Im Aushang steht: 'Die Reparatur wird bis Freitag durchgeführt.' Wer führt die Reparatur aus?",
    prompt_en: "The notice reads: 'Die Reparatur wird bis Freitag durchgeführt.' What does this passive sentence mean?",
    options: [
      {
        text: "Die Reparatur wird von Handwerkern erledigt (Passiv: Handlung steht im Fokus, nicht die handelnde Person).",
        isCorrect: true,
        explanation_de: "Vorgangspassiv mit 'werden + Partizip II' stellt das Geschehen in den Vordergrund.",
        explanation_en: "Passive voice with 'werden + Partizip II' focuses on the action rather than the actor."
      },
      {
        text: "Die Reparatur repariert sich selbst.",
        isCorrect: false,
        explanation_de: "Sinnlose Interpretation.",
        explanation_en: "Nonsensical interpretation."
      },
      {
        text: "Die Reparatur ist bereits abgeschlossen.",
        isCorrect: false,
        explanation_de: "'wird durchgeführt' ist Gegenwart / Zukunft, nicht Vergangenheit (das wäre 'wurde durchgeführt').",
        explanation_en: "'wird durchgeführt' is ongoing present / near future, not completed past."
      }
    ]
  },
  {
    id: 36,
    type: "CONNECTOR",
    category: "Two-Part Connector: 'nicht nur ... sondern auch'",
    prompt_de: "Welcher Satz verbindet zwei Vorteile mit dem Doppelkonnektor 'nicht nur ... sondern auch' korrekt?",
    prompt_en: "Which sentence links two benefits correctly using 'nicht nur ... sondern auch'?",
    options: [
      {
        text: "Die neue Wohnung ist nicht nur zentral gelegen, sondern auch sehr ruhig.",
        isCorrect: true,
        explanation_de: "'nicht nur ... sondern auch' verbindet zwei gleichwertige Satzteile und verstärkt eine positive Aufzählung.",
        explanation_en: "'nicht nur ... sondern auch' connects two parallel elements and reinforces a positive enumeration."
      },
      {
        text: "Die neue Wohnung ist nicht nur zentral gelegen, aber auch sehr ruhig.",
        isCorrect: false,
        explanation_de: "Der feste Partner von 'nicht nur' ist immer 'sondern auch', niemals 'aber auch'.",
        explanation_en: "The fixed pair for 'nicht nur' is always 'sondern auch', never 'aber auch'."
      },
      {
        text: "Die neue Wohnung ist nicht nur zentral gelegen, und auch sehr ruhig.",
        isCorrect: false,
        explanation_de: "Falsche Konnektorkombination.",
        explanation_en: "Incorrect connector combination."
      }
    ]
  }
];

export const WORD_ORDER_PUZZLES: WordOrderPuzzle[] = [
  {
    id: 1,
    prompt_en: "I cannot come tomorrow because I am sick.",
    scrambledTokens: ["morgen", "weil", "Ich", "kann", "nicht", "ich", "kommen,", "krank", "bin."],
    correctOrder: ["Ich", "kann", "morgen", "nicht", "kommen,", "weil", "ich", "krank", "bin."],
    ruleExplanation: "Main clause has modal verb 'kann' in Position 2, 'kommen' at the end before comma. The subclause begins with 'weil' and ends with conjugated verb 'bin'."
  },
  {
    id: 2,
    prompt_en: "Could you please send me the appointment confirmation?",
    scrambledTokens: ["die", "Terminbestätigung", "Könnten", "bitte", "Sie", "mir", "zusenden?"],
    correctOrder: ["Könnten", "Sie", "mir", "bitte", "die", "Terminbestätigung", "zusenden?"],
    ruleExplanation: "Polite question in Konjunktiv II: 'Könnten' in Position 1, Subject 'Sie' in Position 2, and the action verb 'zusenden' at the very end."
  },
  {
    id: 3,
    prompt_en: "Smoking is strictly not allowed here.",
    scrambledTokens: ["man", "nicht", "darf", "Hier", "rauchen."],
    correctOrder: ["Hier", "darf", "man", "nicht", "rauchen."],
    ruleExplanation: "Place 'Hier' in Position 1, modal verb 'darf' in Position 2, subject 'man' in Position 3, and infinitive 'rauchen' at the end. 'darf nicht' = strictly forbidden."
  },
  {
    id: 4,
    prompt_en: "Although it is raining, we are going for a walk.",
    scrambledTokens: ["gehen", "es", "wir", "regnet,", "Obwohl", "spazieren."],
    correctOrder: ["Obwohl", "es", "regnet,", "gehen", "wir", "spazieren."],
    ruleExplanation: "'Obwohl' clause ends with verb 'regnet,'. The main clause after the comma must start immediately with the conjugated verb 'gehen' in Position 2 of the whole sentence."
  },
  {
    id: 5,
    prompt_en: "I missed the bus, therefore I am arriving later.",
    scrambledTokens: ["den", "habe", "Bus", "Ich", "verpasst,", "deshalb", "später.", "komme", "ich"],
    correctOrder: ["Ich", "habe", "den", "Bus", "verpasst,", "deshalb", "komme", "ich", "später."],
    ruleExplanation: "'deshalb' is an inversion connector (Position 1 of clause 2), forcing the verb 'komme' into Position 2 before the subject 'ich'."
  },
  {
    id: 6,
    prompt_en: "I am riding my bike to the office today because of the strike.",
    scrambledTokens: ["heute", "wegen", "Ich", "des", "fahre", "mit", "dem", "Streiks", "Fahrrad", "ins", "Büro."],
    correctOrder: ["Ich", "fahre", "heute", "wegen", "des", "Streiks", "mit", "dem", "Fahrrad", "ins", "Büro."],
    ruleExplanation: "TeKaMoLo rule: Temporal (heute) -> Kausal (wegen des Streiks) -> Modal (mit dem Fahrrad) -> Lokal (ins Büro)."
  },
  {
    id: 7,
    prompt_en: "I really hope that we see each other again soon.",
    scrambledTokens: ["hoffe", "wir", "Ich", "dass", "sehr,", "uns", "bald", "wiedersehen."],
    correctOrder: ["Ich", "hoffe", "sehr,", "dass", "wir", "uns", "bald", "wiedersehen."],
    ruleExplanation: "The connector 'dass' introduces a subordinate clause, kicking the conjugated verb 'wiedersehen' to the very end."
  },
  {
    id: 8,
    prompt_en: "He cannot come because he has to work today.",
    scrambledTokens: ["Er", "nicht", "kann", "kommen,", "weil", "arbeiten", "er", "heute", "muss."],
    correctOrder: ["Er", "kann", "nicht", "kommen,", "weil", "er", "heute", "arbeiten", "muss."],
    ruleExplanation: "In a subclause with a modal verb ('weil'), the infinitive 'arbeiten' stands first, and the conjugated modal 'muss' is placed at the absolute end."
  },
  {
    id: 9,
    prompt_en: "I am calling to arrange a new appointment.",
    scrambledTokens: ["rufe", "einen", "Ich", "an,", "neuen", "um", "Termin", "zu", "vereinbaren."],
    correctOrder: ["Ich", "rufe", "an,", "um", "einen", "neuen", "Termin", "zu", "vereinbaren."],
    ruleExplanation: "Infinitive clause with 'um ... zu': starts with 'um' and ends with 'zu vereinbaren' at the end of the sentence."
  },
  {
    id: 10,
    prompt_en: "He had a fever, nevertheless he went to work.",
    scrambledTokens: ["Er", "Fieber,", "hatte", "trotzdem", "er", "ist", "zur", "gegangen.", "Arbeit"],
    correctOrder: ["Er", "hatte", "Fieber,", "trotzdem", "ist", "er", "zur", "Arbeit", "gegangen."],
    ruleExplanation: "'trotzdem' is an inversion connector at Position 1 of the second clause, followed immediately by the auxiliary 'ist' in Position 2."
  },
  {
    id: 11,
    prompt_en: "Yesterday I had to go to the doctor urgently.",
    scrambledTokens: ["musste", "Gestern", "ich", "zum", "dringend", "gehen.", "Arzt"],
    correctOrder: ["Gestern", "musste", "ich", "dringend", "zum", "Arzt", "gehen."],
    ruleExplanation: "Starting with time word 'Gestern' in Position 1 causes inversion: past modal 'musste' in Position 2, subject 'ich' in Position 3, infinitive 'gehen' at the end."
  },
  {
    id: 12,
    prompt_en: "She signed the new rental contract yesterday.",
    scrambledTokens: ["den", "Sie", "neuen", "hat", "gestern", "unterschrieben.", "Mietvertrag"],
    correctOrder: ["Sie", "hat", "gestern", "den", "neuen", "Mietvertrag", "unterschrieben."],
    ruleExplanation: "Perfekt sentence bracket: auxiliary 'hat' in Position 2, separable past participle 'unterschrieben' at the very end."
  },
  {
    id: 13,
    prompt_en: "Although it was cold, he wore no jacket.",
    scrambledTokens: ["war,", "kalt", "Obwohl", "es", "trug", "keine", "er", "Jacke."],
    correctOrder: ["Obwohl", "es", "kalt", "war,", "trug", "er", "keine", "Jacke."],
    ruleExplanation: "When a subordinate clause ('Obwohl') leads, the main clause starts immediately with its conjugated verb 'trug' right after the comma (Verb-Verb sandwich)."
  },
  {
    id: 14,
    prompt_en: "Would you please inform me of the address?",
    scrambledTokens: ["Sie", "Würden", "mir", "bitte", "Adresse", "die", "mitteilen?"],
    correctOrder: ["Würden", "Sie", "mir", "bitte", "die", "Adresse", "mitteilen?"],
    ruleExplanation: "Konjunktiv II polite question formula: 'Würden' in Position 1, Subject 'Sie' in Position 2, infinitive 'mitteilen' at the sentence end."
  },
  {
    id: 15,
    prompt_en: "We are putting the large table into the kitchen.",
    scrambledTokens: ["den", "stellen", "Wir", "großen", "Tisch", "die", "in", "Küche."],
    correctOrder: ["Wir", "stellen", "den", "großen", "Tisch", "in", "die", "Küche."],
    ruleExplanation: "'stellen' is movement (Wohin?), requiring Accusative 'die Küche' with two-way preposition 'in'."
  },
  {
    id: 16,
    prompt_en: "The large table stands in the kitchen.",
    scrambledTokens: ["Tisch", "Der", "steht", "große", "in", "der", "Küche."],
    correctOrder: ["Der", "große", "Tisch", "steht", "in", "der", "Küche."],
    ruleExplanation: "'stehen' is a stationary state (Wo?), requiring Dative 'der Küche' with two-way preposition 'in'."
  },
  {
    id: 17,
    prompt_en: "I have been living in this apartment for three months.",
    scrambledTokens: ["wohne", "drei", "Ich", "seit", "Monaten", "in", "dieser", "Wohnung."],
    correctOrder: ["Ich", "wohne", "seit", "drei", "Monaten", "in", "dieser", "Wohnung."],
    ruleExplanation: "'seit' takes Dative plural ('drei Monaten') and requires the Present tense ('wohne') for actions continuing into the present."
  },
  {
    id: 18,
    prompt_en: "It rained heavily, therefore we stayed at home.",
    scrambledTokens: ["hat", "stark", "Es", "geregnet,", "deshalb", "wir", "blieben", "zu", "Hause."],
    correctOrder: ["Es", "hat", "stark", "geregnet,", "deshalb", "blieben", "wir", "zu", "Hause."],
    ruleExplanation: "'deshalb' takes Position 1 in the second clause, conjugated verb 'blieben' takes Position 2, followed by subject 'wir'."
  },
  {
    id: 19,
    prompt_en: "When I arrived in Berlin, I looked for an apartment.",
    scrambledTokens: ["ich", "Als", "in", "Berlin", "suchte", "ankam,", "eine", "ich", "Wohnung."],
    correctOrder: ["Als", "ich", "in", "Berlin", "ankam,", "suchte", "ich", "eine", "Wohnung."],
    ruleExplanation: "A unique past event uses 'Als' (verb 'ankam' at end), followed by immediate inversion with main verb 'suchte' after the comma."
  },
  {
    id: 20,
    prompt_en: "The complaint is processed immediately by customer service.",
    scrambledTokens: ["Beschwerde", "Die", "wird", "vom", "Kundenservice", "sofort", "bearbeitet."],
    correctOrder: ["Die", "Beschwerde", "wird", "vom", "Kundenservice", "sofort", "bearbeitet."],
    ruleExplanation: "Passive voice: auxiliary 'wird' in Position 2, past participle 'bearbeitet' at the sentence end."
  },
  {
    id: 21,
    prompt_en: "That is the family doctor whom I trust completely.",
    scrambledTokens: ["ist", "Das", "der", "Hausarzt,", "ich", "dem", "vollständig", "vertraue."],
    correctOrder: ["Das", "ist", "der", "Hausarzt,", "dem", "ich", "vollständig", "vertraue."],
    ruleExplanation: "'vertrauen' takes Dative ('der Hausarzt' -> 'dem'). Relative pronoun starts the relative clause, and verb 'vertraue' stands at the end."
  },
  {
    id: 22,
    prompt_en: "We can either go shopping today or drive tomorrow.",
    scrambledTokens: ["können", "Wir", "entweder", "heute", "einkaufen", "oder", "morgen", "fahren."],
    correctOrder: ["Wir", "können", "entweder", "heute", "einkaufen", "oder", "morgen", "fahren."],
    ruleExplanation: "Two-part connector 'entweder ... oder' links two alternatives, bracketed by the modal verb 'können'."
  }
];

export const PASS_B1_CRITERIA_SUMMARY = {
  overallPassScore: "60%",
  examBreakdown: [
    {
      exam: "Goethe-Zertifikat B1",
      passThreshold: "60 out of 100 points per module (Lesen, Hören, Schreiben, Sprechen)",
      canPassSeparately: true,
      strategySummary: "Passed modules are permanently valid. If you pass 3 and miss 1, you only re-take the missing 1."
    },
    {
      exam: "TELC Deutsch B1",
      passThreshold: "60% written (Lesen+Hören+Schreiben >= 135/225 pts) AND 60% oral (Sprechen >= 45/75 pts)",
      canPassSeparately: true,
      strategySummary: "High score in Schreiben and Lesen can compensate for lower score in Hören in the written part."
    },
    {
      exam: "DTZ (Deutsch-Test für Zuwanderer)",
      passThreshold: "B1 in Sprechen (mandatory) PLUS B1 in either Schreiben OR Hören/Lesen",
      canPassSeparately: false,
      strategySummary: "Master our 5-Sentence Speaking formula + 8 Letter Templates and you are 100% guaranteed B1!"
    }
  ],
  whyOurTrainingGuaranteesPass: [
    "Modal Verb Mastery: Eliminates the #1 reason students lose 4-6 points in reading and listening traps ('darf nicht' vs 'muss nicht').",
    "Satzbau Formula: Examiners strictly look for 'weil', 'dass', and 'obwohl' with verb at the end to award B1 grammar level.",
    "8 Official Writing Templates: Covers all 4 bullet points required by the CEFR rubric with pre-tested polite phrases.",
    "5-Sentence Speaking Blueprint: Guarantees B1 fluency score without needing advanced vocabulary.",
    "Bilingual Keyword Traps: Teaches the exact 30 synonym traps tested on Goethe and TELC exams."
  ]
};
