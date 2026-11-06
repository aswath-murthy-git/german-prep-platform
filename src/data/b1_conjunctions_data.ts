export interface ConjunctionFamily {
  id: string;
  name: string;
  positionRule: string;
  wordOrderFormula: string;
  explanation: string;
  examples: {
    de: string;
    en: string;
    breakdown: string;
  }[];
  conjunctionsList: {
    word: string;
    meaning_en: string;
    note: string;
  }[];
  examWarning: string;
}

export interface ConjunctionDrillQuestion {
  id: number;
  family: "ADUSO" | "VERB_END" | "INVERSION" | "DOUBLE";
  prompt_de: string;
  prompt_en: string;
  correctAnswer: string;
  options: string[]; // thoroughly mixed
  explanation_de: string;
  explanation_en: string;
  wordOrderSchematic: string;
}

export const CONJUNCTION_FAMILIES_DATA: ConjunctionFamily[] = [
  // ── Family 1: ADUSO (Position 0) ──
  {
    id: "aduso",
    name: "ADUSO Connectors (Position 0 - No Inversion)",
    positionRule: "Position 0 (Zero Inversion)",
    wordOrderFormula: "[ADUSO Connector] + [Position 1: Subject] + [Position 2: Conjugated Verb] + ...",
    explanation: "ADUSO connectors link two main clauses. Crucially, they DO NOT count as Position 1! The subject comes first, and the verb stays in its normal Position 2.",
    conjunctionsList: [
      { word: "aber", meaning_en: "but", note: "Shows contrast between two clauses." },
      { word: "denn", meaning_en: "because / for", note: "Explains reason WITHOUT kicking the verb! (Unlike 'weil')." },
      { word: "und", meaning_en: "and", note: "Links two related actions." },
      { word: "sondern", meaning_en: "but rather / but instead", note: "Used after a negative ('nicht / kein') to state what is true instead." },
      { word: "oder", meaning_en: "or", note: "Presents an alternative." }
    ],
    examples: [
      {
        de: "Ich möchte die Prüfung bestehen, denn ich brauche das B1-Zertifikat.",
        en: "I want to pass the exam, because I need the B1 certificate.",
        breakdown: "[denn (Pos 0)] + [ich (Pos 1)] + [brauche (Pos 2)] + [das B1-Zertifikat]."
      },
      {
        de: "Er lernt heute nicht Mathe, sondern er wiederholt deutsche Grammatik.",
        en: "He is not studying math today, but rather reviewing German grammar.",
        breakdown: "[sondern (Pos 0)] + [er (Pos 1)] + [wiederholt (Pos 2)] + ..."
      },
      {
        de: "Ich habe wenig Zeit, aber ich übe jeden Tag 30 Minuten.",
        en: "I have little time, but I practice for 30 minutes every day.",
        breakdown: "[aber (Pos 0)] + [ich (Pos 1)] + [übe (Pos 2)] + ..."
      }
    ],
    examWarning: "Exam Trap: Never kick the verb to the end after 'denn'! 'denn ich brauche' is correct. 'denn ich brauche habe' is wrong. If you want verb-at-the-end, use 'weil'."
  },

  // ── Family 2: Subordinating Verb-Kickers (Verb am Ende) ──
  {
    id: "verb_end",
    name: "Subordinating Connectors (Verb Kickers - KATI)",
    positionRule: "Verb at the Very End of the Clause",
    wordOrderFormula: "[Subclause: Connector + Subject + ... + CONJUGATED VERB at the end], [Main clause: VERB + Subject + ...]",
    explanation: "These conjunctions introduce a subordinate clause (Nebensatz). The conjugated verb is kicked to the absolute end of the clause. If the sentence begins with the subordinate clause, the main clause immediately starts with its verb (Comma + Verb rule)!",
    conjunctionsList: [
      { word: "weil", meaning_en: "because", note: "Kicks verb to end: '..., weil ich heute krank bin.'" },
      { word: "dass", meaning_en: "that", note: "Reported speech / belief: 'Ich hoffe, dass Sie mir helfen können.'" },
      { word: "obwohl", meaning_en: "although / even though", note: "Concession: 'Obwohl es regnet, gehe ich spazieren.'" },
      { word: "wenn", meaning_en: "if / when (present or recurring)", note: "Condition: 'Wenn ich Zeit habe, lerne ich.'" },
      { word: "als", meaning_en: "when (one-time past event)", note: "Past event: 'Als ich nach Deutschland kam, ...'" },
      { word: "damit", meaning_en: "so that / in order that", note: "Purpose with different subjects: 'Ich helfe dir, damit du bestehst.'" },
      { word: "ob", meaning_en: "whether / if (yes/no indirect question)", note: "Indirect question: 'Können Sie mir sagen, ob der Zug pünktlich ist?'" },
      { word: "da", meaning_en: "since / because (known fact)", note: "Often opens the sentence: 'Da das Wetter schön ist, ...'" },
      { word: "nachdem", meaning_en: "after", note: "Past sequence: 'Nachdem ich gegessen hatte, ging ich schlafen.'" },
      { word: "bevor", meaning_en: "before", note: "Sequence: 'Bevor ich schlafe, wiederhole ich Verben.'" }
    ],
    examples: [
      {
        de: "Ich kann morgen nicht kommen, weil mein Kind leider krank ist.",
        en: "I cannot come tomorrow because my child is unfortunately ill.",
        breakdown: "[weil (Connector)] + [mein Kind (Subject)] + [leider krank] + [ist (Verb at End)]."
      },
      {
        de: "Weil mein Kind krank ist, kann ich morgen nicht kommen.",
        en: "Because my child is ill, I cannot come tomorrow.",
        breakdown: "Subclause first: [..., ist] , [kann (Main Verb)] + [ich (Subject)] + ..."
      },
      {
        de: "Obwohl der Test schwierig war, hat sie die B1-Prüfung bestanden.",
        en: "Although the test was difficult, she passed the B1 exam.",
        breakdown: "[Obwohl ... war] , [hat (Auxiliary Verb in Pos 2)] + [sie (Subject)] + [bestanden]."
      }
    ],
    examWarning: "Comma + Verb Rule: When a 'weil' or 'obwohl' sentence comes FIRST, remember that the main clause after the comma must start with the VERB: 'Weil ich krank bin, BLEIBE ich zu Hause' (NEVER: 'Weil ich krank bin, ich bleibe zu Hause')."
  },

  // ── Family 3: Inversion Adverbial Connectors (Position 1 -> Verb in Position 2) ──
  {
    id: "inversion",
    name: "Inversion Connectors (Position 1 -> Verb in Position 2)",
    positionRule: "Connector = Position 1, Verb = Position 2",
    wordOrderFormula: "[Main clause 1]. [Position 1: Inversion Connector] + [Position 2: Conjugated Verb] + [Position 3: Subject] + ...",
    explanation: "These words are connective adverbs. When they start a sentence or follow a semicolon/period/comma, they occupy Position 1. Because German main clauses strictly demand the verb in Position 2, the verb comes immediately next, followed by the subject!",
    conjunctionsList: [
      { word: "deshalb / deswegen", meaning_en: "therefore / that is why", note: "Shows result: '..., deshalb lerne ich fleißig.'" },
      { word: "trotzdem", meaning_en: "nevertheless / anyway", note: "Shows unexpected contrast: 'Es regnet, trotzdem gehe ich joggen.'" },
      { word: "sonst", meaning_en: "otherwise / or else", note: "Consequence: 'Beeil dich, sonst verpassen wir den Bus!'" },
      { word: "außerdem", meaning_en: "furthermore / in addition", note: "Adding points: 'Er spricht Englisch, außerdem lernt er Deutsch.'" },
      { word: "danach / dann", meaning_en: "after that / then", note: "Chronological sequence: 'Zuerst dusche ich, danach frühstücke ich.'" }
    ],
    examples: [
      {
        de: "Ich möchte in Deutschland arbeiten, deshalb lerne ich die Sprache.",
        en: "I want to work in Germany, therefore I am learning the language.",
        breakdown: "[deshalb (Pos 1)] + [lerne (Pos 2 Verb)] + [ich (Pos 3 Subject)] + [die Sprache]."
      },
      {
        de: "Der Unterricht war anstrengend, trotzdem hat er bis spät geübt.",
        en: "The class was exhausting, nevertheless he practiced until late.",
        breakdown: "[trotzdem (Pos 1)] + [hat (Pos 2 Verb)] + [er (Pos 3 Subject)] + ..."
      },
      {
        de: "Wir müssen jetzt losgehen, sonst kommen wir zu spät zum Termin.",
        en: "We have to leave now, otherwise we will be late for the appointment.",
        breakdown: "[sonst (Pos 1)] + [kommen (Pos 2 Verb)] + [wir (Pos 3 Subject)] + ..."
      }
    ],
    examWarning: "The #1 B1 Inversion Deduction: Saying 'deshalb ich lerne' is a major error. It MUST be 'deshalb LERNE ich' (Connector + Verb + Subject)."
  },

  // ── Family 4: Two-Part Double Connectors (Zweiteilige Konnektoren) ──
  {
    id: "double",
    name: "Two-Part Double Connectors (Zweiteilige Konnektoren)",
    positionRule: "Paired Structures for High-Score B1 Bonus Points",
    wordOrderFormula: "[Part 1] ... [Part 2] ...",
    explanation: "Using paired connectors is the easiest way to impress B1 Goethe and TELC examiners in writing and speaking. They demonstrate complex sentence architecture.",
    conjunctionsList: [
      { word: "nicht nur ... sondern auch", meaning_en: "not only ... but also", note: "Combines two strong positive benefits." },
      { word: "entweder ... oder", meaning_en: "either ... or", note: "Two alternative options." },
      { word: "weder ... noch", meaning_en: "neither ... nor", note: "Double negative (replaces 'nicht ... und nicht')." },
      { word: "zwar ... aber", meaning_en: "indeed / it is true that ... but", note: "Concedes a point, then adds a limitation." },
      { word: "je ... desto / umso", meaning_en: "the more ... the more", note: "'je' kicks verb to end, 'desto' takes comparative + verb!" }
    ],
    examples: [
      {
        de: "Er spricht nicht nur fließend Englisch, sondern auch sehr gutes Deutsch.",
        en: "He speaks not only fluent English, but also very good German.",
        breakdown: "[nicht nur] + [English] , [sondern auch] + [German]."
      },
      {
        de: "Wir können entweder mit dem Zug fahren oder den Bus nehmen.",
        en: "We can either travel by train or take the bus.",
        breakdown: "[entweder] + [Zug fahren] + [oder] + [Bus nehmen]."
      },
      {
        de: "Sie trinkt weder Kaffee noch schwarzen Tee.",
        en: "She drinks neither coffee nor black tea.",
        breakdown: "[weder] + [Kaffee] + [noch] + [Tee]."
      },
      {
        de: "Je mehr ich übe, desto schneller verstehe ich die Grammatik.",
        en: "The more I practice, the faster I understand the grammar.",
        breakdown: "[Je mehr ... übe (Verb End)] , [desto schneller] + [verstehe (Verb)] + [ich]."
      }
    ],
    examWarning: "Pro-Tip: Using 'nicht nur... sondern auch' in your B1 Schreiben letter or Sprechen Part 2 presentation practically guarantees an above-average grammar score."
  }
];

export const CONJUNCTION_DRILL_QUESTIONS: ConjunctionDrillQuestion[] = [
  {
    id: 1,
    family: "ADUSO",
    prompt_de: "Ergänzen Sie den Satz mit 'denn': 'Ich lerne jeden Abend Deutsch, ___'",
    prompt_en: "Complete the sentence with 'denn': 'I study German every evening, ___'",
    correctAnswer: "denn ich möchte die Prüfung bestehen.",
    options: [
      "denn ich möchte die Prüfung bestehen.",
      "denn möchte ich die Prüfung bestehen.",
      "denn ich die Prüfung bestehen möchte."
    ],
    explanation_de: "'denn' ist ein ADUSO-Konnektor auf Position 0. Das Subjekt 'ich' steht auf Position 1 und das Modalverb 'möchte' auf Position 2.",
    explanation_en: "'denn' is an ADUSO connector occupying Position 0. Subject 'ich' is in Position 1, and the verb 'möchte' stays in Position 2.",
    wordOrderSchematic: "[denn (Pos 0)] + [ich (Pos 1)] + [möchte (Pos 2)] + [die Prüfung bestehen]."
  },
  {
    id: 2,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit 'weil' hat die richtige B1-Wortstellung?",
    prompt_en: "Which sentence with 'weil' (because) has the correct B1 word order?",
    correctAnswer: "Ich kann heute nicht zum Kurs kommen, weil meine Tochter Fieber hat.",
    options: [
      "Ich kann heute nicht zum Kurs kommen, weil hat meine Tochter Fieber.",
      "Ich kann heute nicht zum Kurs kommen, weil meine Tochter Fieber hat.",
      "Ich kann heute nicht zum Kurs kommen, weil meine Tochter hat Fieber."
    ],
    explanation_de: "'weil' kickt das konjugierte Verb 'hat' an das absolute Ende des Nebensatzes.",
    explanation_en: "'weil' kicks the conjugated verb 'hat' to the absolute end of the subordinate clause.",
    wordOrderSchematic: "[weil] + [meine Tochter (Subject)] + [Fieber] + [hat (Verb am Ende)]."
  },
  {
    id: 3,
    family: "INVERSION",
    prompt_de: "Welche Satzverbindung mit 'deshalb' (therefore) ist korrekt?",
    prompt_en: "Which sentence combination with 'deshalb' (therefore) is correct?",
    correctAnswer: "Der Zug hatte 40 Minuten Verspätung, deshalb verpasste ich meinen Anschluss.",
    options: [
      "Der Zug hatte 40 Minuten Verspätung, deshalb ich verpasste meinen Anschluss.",
      "Der Zug hatte 40 Minuten Verspätung, deshalb verpasste ich meinen Anschluss.",
      "Der Zug hatte 40 Minuten Verspätung, deshalb ich meinen Anschluss verpasste."
    ],
    explanation_de: "'deshalb' besetzt Position 1 im Satz. Daher muss das konjugierte Verb 'verpasste' sofort auf Position 2 folgen (Inversion)!",
    explanation_en: "'deshalb' occupies Position 1. Therefore the conjugated verb 'verpasste' must immediately follow in Position 2!",
    wordOrderSchematic: "[deshalb (Pos 1)] + [verpasste (Pos 2 Verb)] + [ich (Pos 3 Subject)] + ..."
  },
  {
    id: 4,
    family: "VERB_END",
    prompt_de: "Wenn der Nebensatz mit 'obwohl' am Satzanfang steht: Wie geht der Hauptsatz weiter?",
    prompt_en: "When the subordinate clause with 'obwohl' begins the sentence: How does the main clause continue?",
    correctAnswer: "Obwohl er müde war, lernte er noch zwei Stunden weiter.",
    options: [
      "Obwohl er müde war, er lernte noch zwei Stunden weiter.",
      "Obwohl er müde war, noch zwei Stunden er lernte weiter.",
      "Obwohl er müde war, lernte er noch zwei Stunden weiter."
    ],
    explanation_de: "Komma-Verb-Regel: Nach dem Nebensatz beginnt der Hauptsatz sofort mit dem konjugierten Verb 'lernte'!",
    explanation_en: "Comma + Verb rule: After the subordinate clause, the main clause immediately starts with the conjugated verb 'lernte'!",
    wordOrderSchematic: "[Obwohl ... war (Verb End)], [lernte (Verb)] + [er (Subject)] + ..."
  },
  {
    id: 5,
    family: "ADUSO",
    prompt_de: "Wann benutzt man 'sondern' anstelle von 'aber'?",
    prompt_en: "When is 'sondern' (but rather) used instead of 'aber' (but)?",
    correctAnswer: "Nach einer Negation ('nicht' / 'kein'), um eine korrigierende Alternative auszudrücken.",
    options: [
      "Nach einer Negation ('nicht' / 'kein'), um eine korrigierende Alternative auszudrücken.",
      "Immer wenn man das Verb ans Satzende schieben möchte.",
      "Nur bei Fragen in der Vergangenheit."
    ],
    explanation_de: "'sondern' korrigiert eine vorherige Verneinung: 'Ich wohne nicht in Berlin, sondern ich wohne in München.'",
    explanation_en: "'sondern' corrects a preceding negation: 'I do not live in Berlin, but rather in Munich.'",
    wordOrderSchematic: "[Negation: nicht ...] , [sondern (Pos 0)] + [Subject] + [Verb] + ..."
  },
  {
    id: 6,
    family: "DOUBLE",
    prompt_de: "Welcher Satz verwendet den Doppelkonnektor 'nicht nur ... sondern auch' richtig?",
    prompt_en: "Which sentence uses the paired connector 'nicht nur ... sondern auch' correctly?",
    correctAnswer: "Sie spricht nicht nur fließend Deutsch, sondern sie hat auch gute Computerkenntnisse.",
    options: [
      "Sie spricht nicht nur fließend Deutsch, sondern sie hat auch gute Computerkenntnisse.",
      "Sie spricht nicht nur fließend Deutsch, sondern auch gute Computerkenntnisse hat sie.",
      "Sie spricht nicht nur fließend Deutsch, aber auch gute Computerkenntnisse hat."
    ],
    explanation_de: "'nicht nur ... sondern auch' verbindet zwei positive Aussagen ohne Verb-Endstellung.",
    explanation_en: "'nicht nur ... sondern auch' connects two positive statements seamlessly.",
    wordOrderSchematic: "[nicht nur Element 1] , [sondern ... auch Element 2]."
  },
  {
    id: 7,
    family: "INVERSION",
    prompt_de: "Ergänzen Sie mit 'trotzdem' (nevertheless): 'Es regnete sehr stark, ___'",
    prompt_en: "Complete with 'trotzdem' (nevertheless): 'It rained very heavily, ___'",
    correctAnswer: "trotzdem ging die Familie im Park spazieren.",
    options: [
      "trotzdem die Familie ging im Park spazieren.",
      "trotzdem ging die Familie im Park spazieren.",
      "trotzdem die Familie im Park spazieren ging."
    ],
    explanation_de: "'trotzdem' ist ein Inversions-Konnektor (Position 1). Das Verb 'ging' folgt auf Position 2.",
    explanation_en: "'trotzdem' is an inversion connector (Position 1). The verb 'ging' must be in Position 2.",
    wordOrderSchematic: "[trotzdem (Pos 1)] + [ging (Pos 2 Verb)] + [die Familie (Subject)] + ..."
  },
  {
    id: 8,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit 'dass' (that) ist für eine B1-E-Mail korrekt?",
    prompt_en: "Which sentence with 'dass' (that) is correct for a B1 email?",
    correctAnswer: "Ich hoffe sehr, dass Sie mir bei diesem Problem helfen können.",
    options: [
      "Ich hoffe sehr, dass Sie können mir bei diesem Problem helfen.",
      "Ich hoffe sehr, dass können Sie mir bei diesem Problem helfen.",
      "Ich hoffe sehr, dass Sie mir bei diesem Problem helfen können."
    ],
    explanation_de: "Bei Modalverben im Nebensatz steht das Hilfs-/Modalverb 'können' ganz am Ende nach dem Infinitiv 'helfen'.",
    explanation_en: "With modal verbs in a subclause, the conjugated modal 'können' stands at the very end after infinitive 'helfen'.",
    wordOrderSchematic: "[dass] + [Sie (Subject)] + [mir ... helfen (Infinitive)] + [können (Modal am Ende)]."
  },
  {
    id: 9,
    family: "VERB_END",
    prompt_de: "Wann benutzt man 'als' und wann 'wenn' für 'when' in der Vergangenheit?",
    prompt_en: "When do you use 'als' vs 'wenn' for 'when' in the past?",
    correctAnswer: "'als' für ein einmaliges Ereignis in der Vergangenheit; 'wenn' für wiederholte Ereignisse.",
    options: [
      "'als' für ein einmaliges Ereignis in der Vergangenheit; 'wenn' für wiederholte Ereignisse.",
      "'wenn' steht nur in der Zukunft; 'als' steht nur in der Gegenwart.",
      "Beide Konnektoren sind 100% austauschbar."
    ],
    explanation_de: "'Als ich ein Kind war' (einmaliger Zeitraum). 'Immer wenn es regnete' (wiederholt). Beide kicken das Verb ans Ende!",
    explanation_en: "'Als ich ein Kind war' (single past period). 'Immer wenn es regnete' (repeated). Both kick the verb to the end!",
    wordOrderSchematic: "[Als ich 18 Jahre alt war (Verb End)], [kam (Verb)] + [ich nach Deutschland]."
  },
  {
    id: 10,
    family: "INVERSION",
    prompt_de: "Ergänzen Sie mit 'sonst' (otherwise): 'Bitte antworten Sie mir bis Freitag, ___'",
    prompt_en: "Complete with 'sonst' (otherwise): 'Please reply to me by Friday, ___'",
    correctAnswer: "sonst muss ich mich an die Verbraucherzentrale wenden.",
    options: [
      "sonst ich muss mich an die Verbraucherzentrale wenden.",
      "sonst muss ich mich an die Verbraucherzentrale wenden.",
      "sonst an die Verbraucherzentrale ich mich wenden muss."
    ],
    explanation_de: "'sonst' verlangt sofort das Verb 'muss' auf Position 2 (Inversion).",
    explanation_en: "'sonst' strictly demands the conjugated verb 'muss' in Position 2 (inversion).",
    wordOrderSchematic: "[sonst (Pos 1)] + [muss (Pos 2 Verb)] + [ich (Subject)] + ..."
  },
  {
    id: 11,
    family: "DOUBLE",
    prompt_de: "Welche Bedeutung hat der Doppelkonnektor 'weder ... noch'?",
    prompt_en: "What is the meaning of the paired connector 'weder ... noch'?",
    correctAnswer: "Eine doppelte Verneinung (weder A noch B = nicht A und auch nicht B).",
    options: [
      "Eine Wahl zwischen zwei positiven Dingen.",
      "Eine doppelte Verneinung (weder A noch B = nicht A und auch nicht B).",
      "Eine zeitliche Reihenfolge wie zuerst und danach."
    ],
    explanation_de: "'weder ... noch' bedeutet, dass keines von beiden zutrifft: 'Ich habe weder Zeit noch Geld.'",
    explanation_en: "'weder ... noch' means neither applies: 'I have neither time nor money.'",
    wordOrderSchematic: "[weder Element 1] + [noch Element 2]."
  },
  {
    id: 12,
    family: "VERB_END",
    prompt_de: "Welche indirekte Frage mit 'ob' (whether/if) ist grammatikalisch richtig?",
    prompt_en: "Which indirect question with 'ob' (whether/if) is grammatically correct?",
    correctAnswer: "Könnten Sie mir mitteilen, ob die Wohnung ab 1. Mai frei ist?",
    options: [
      "Könnten Sie mir mitteilen, ob ist die Wohnung ab 1. Mai frei?",
      "Könnten Sie mir mitteilen, ob die Wohnung ist ab 1. Mai frei?",
      "Könnten Sie mir mitteilen, ob die Wohnung ab 1. Mai frei ist?"
    ],
    explanation_de: "'ob' leitet eine indirekte Ja/Nein-Frage ein und kickt das Verb 'ist' an das Satzende.",
    explanation_en: "'ob' introduces an indirect yes/no question and kicks the verb 'ist' to the very end.",
    wordOrderSchematic: "[ob] + [die Wohnung (Subject)] + [ab 1. Mai frei] + [ist (Verb am Ende)]."
  },
  {
    id: 13,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit 'damit' (so that / purpose with different subjects) ist korrekt?",
    prompt_en: "Which sentence with 'damit' (so that) is grammatically correct?",
    correctAnswer: "Ich erkläre Ihnen die Aufgabe langsam, damit Sie alles genau verstehen.",
    options: [
      "Ich erkläre Ihnen die Aufgabe langsam, damit Sie alles genau verstehen.",
      "Ich erkläre Ihnen die Aufgabe langsam, damit Sie verstehen alles genau.",
      "Ich erkläre Ihnen die Aufgabe langsam, damit verstehen Sie alles genau."
    ],
    explanation_de: "'damit' leitet einen finalen Nebensatz ein und verlangt das finite Verb 'verstehen' am Satzende.",
    explanation_en: "'damit' introduces a purpose subclause and places the finite verb 'verstehen' at the very end.",
    wordOrderSchematic: "[damit] + [Sie (Subject)] + [alles genau] + [verstehen (Verb am Ende)]."
  },
  {
    id: 14,
    family: "INVERSION",
    prompt_de: "Welcher Satz mit dem Aufzählungs-Konnektor 'außerdem' (in addition) ist richtig?",
    prompt_en: "Which sentence with 'außerdem' (in addition) uses correct word order?",
    correctAnswer: "Er spricht sehr gut Deutsch, außerdem lernt er seit einem Jahr Spanisch.",
    options: [
      "Er spricht sehr gut Deutsch, außerdem er lernt seit einem Jahr Spanisch.",
      "Er spricht sehr gut Deutsch, außerdem lernt er seit einem Jahr Spanisch.",
      "Er spricht sehr gut Deutsch, außerdem er seit einem Jahr Spanisch lernt."
    ],
    explanation_de: "'außerdem' steht auf Position 1 und erzwingt das Verb 'lernt' sofort auf Position 2 (Inversion).",
    explanation_en: "'außerdem' occupies Position 1 and forces the verb 'lernt' into Position 2 (inversion).",
    wordOrderSchematic: "[außerdem (Pos 1)] + [lernt (Pos 2 Verb)] + [er (Subject)] + ..."
  },
  {
    id: 15,
    family: "ADUSO",
    prompt_de: "Warum ist 'denn' ein ADUSO-Konnektor und wie steht das Verb danach?",
    prompt_en: "Why is 'denn' an ADUSO connector and where does the verb stand?",
    correctAnswer: "'denn' steht auf Position 0: danach folgt das Subjekt (Pos 1) und das konjugierte Verb (Pos 2).",
    options: [
      "'denn' steht auf Position 0: danach folgt das Subjekt (Pos 1) und das konjugierte Verb (Pos 2).",
      "'denn' kickt das Verb an das absolute Satzende wie 'weil'.",
      "'denn' verlangt sofort eine Inversion wie 'deshalb'."
    ],
    explanation_de: "Große Prüfungsfalle: 'denn' verändert die normale Hauptsatz-Wortstellung nicht! 'denn ich brauche' ist richtig.",
    explanation_en: "Major exam trap: 'denn' does NOT kick the verb! 'denn ich brauche' is standard main-clause order.",
    wordOrderSchematic: "[denn (Pos 0)] + [ich (Pos 1 Subject)] + [brauche (Pos 2 Verb)] + ..."
  },
  {
    id: 16,
    family: "DOUBLE",
    prompt_de: "Welcher Satz verwendet den alternativen Doppelkonnektor 'entweder ... oder' korrekt?",
    prompt_en: "Which sentence uses the alternative connector 'entweder ... oder' correctly?",
    correctAnswer: "Wir können uns entweder am Freitag treffen oder wir verschieben den Termin auf Montag.",
    options: [
      "Wir können uns entweder am Freitag treffen oder wir verschieben den Termin auf Montag.",
      "Wir können uns entweder am Freitag treffen oder verschieben wir den Termin auf Montag.",
      "Wir können uns entweder am Freitag treffen oder wir den Termin auf Montag verschieben."
    ],
    explanation_de: "'oder' ist ein ADUSO-Konnektor (Position 0). Im Folgesatz steht das Subjekt 'wir' auf Pos 1 und das Verb 'verschieben' auf Pos 2.",
    explanation_en: "'oder' is an ADUSO connector (Pos 0). In the following clause, subject 'wir' is in Pos 1, verb 'verschieben' in Pos 2.",
    wordOrderSchematic: "[entweder ... oder] + [Subjekt (Pos 1)] + [Verb (Pos 2)]."
  },
  {
    id: 17,
    family: "VERB_END",
    prompt_de: "Welche Wortstellung ist mit der temporalen Konjunktion 'bevor' (before) korrekt?",
    prompt_en: "Which word order is correct with temporal conjunction 'bevor' (before)?",
    correctAnswer: "Bitte prüfen Sie Ihre Unterlagen, bevor Sie den Antrag einreichen.",
    options: [
      "Bitte prüfen Sie Ihre Unterlagen, bevor Sie reichen den Antrag ein.",
      "Bitte prüfen Sie Ihre Unterlagen, bevor Sie den Antrag einreichen.",
      "Bitte prüfen Sie Ihre Unterlagen, bevor reichen Sie den Antrag ein."
    ],
    explanation_de: "'bevor' leitet einen temporalen Nebensatz ein: Das trennbare Verb 'einreichen' steht ungetrennt am Satzende.",
    explanation_en: "'bevor' introduces a temporal subclause: the separable verb 'einreichen' stays together at the very end.",
    wordOrderSchematic: "[bevor] + [Sie (Subject)] + [den Antrag] + [einreichen (Verb am Ende)]."
  },
  {
    id: 18,
    family: "INVERSION",
    prompt_de: "Wie wird der Kausal-Adverb 'deswegen' (for this reason) richtig mit dem Verb verbunden?",
    prompt_en: "How is the causal adverb 'deswegen' (for this reason) correctly connected with the verb?",
    correctAnswer: "Das Wetter war sehr stürmisch, deswegen fiel unser Flug leider aus.",
    options: [
      "Das Wetter war sehr stürmisch, deswegen unser Flug fiel leider aus.",
      "Das Wetter war sehr stürmisch, deswegen fiel unser Flug leider aus.",
      "Das Wetter war sehr stürmisch, deswegen unser Flug leider ausfiel."
    ],
    explanation_de: "'deswegen' steht auf Position 1 des Hauptsatzes und verlangt das Verb 'fiel' sofort auf Position 2 (Inversion).",
    explanation_en: "'deswegen' occupies Position 1 and requires the verb 'fiel' immediately in Position 2 (inversion).",
    wordOrderSchematic: "[deswegen (Pos 1)] + [fiel (Pos 2 Verb)] + [unser Flug (Subject)] + [aus (Präfix am Ende)]."
  },
  {
    id: 19,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit 'nachdem' (after) zeigt die klassische B1-Zeitform-Abfolge korrekt?",
    prompt_en: "Which sentence with 'nachdem' (after) shows the correct B1 sequence of tenses?",
    correctAnswer: "Nachdem er die E-Mail gelesen hatte, rief er sofort seinen Chef an.",
    options: [
      "Nachdem er die E-Mail gelesen hatte, rief er sofort seinen Chef an.",
      "Nachdem er hatte die E-Mail gelesen, er rief sofort seinen Chef an.",
      "Nachdem er die E-Mail gelesen hatte, er rief sofort seinen Chef an."
    ],
    explanation_de: "'nachdem' leitet Vorzeitigkeit ein (Plusquamperfekt 'gelesen hatte' am Ende), gefolgt von sofortiger Inversion im Hauptsatz ('rief er').",
    explanation_en: "'nachdem' triggers prior action (Past Perfect 'gelesen hatte' at end), followed by immediate inversion in main clause ('rief er').",
    wordOrderSchematic: "[Nachdem ... gelesen hatte (Verb End)], [rief (Verb Pos 2)] + [er (Subject)] + ..."
  },
  {
    id: 20,
    family: "DOUBLE",
    prompt_de: "Welche Aussage drückt der Doppelkonnektor 'zwar ... aber' (admittedly ... but) aus?",
    prompt_en: "What meaning does the paired connector 'zwar ... aber' convey?",
    correctAnswer: "Eine Einschränkung: Man gibt einen Nachteil oder Zugeständnis zu, hebt aber den positiven Aspekt hervor.",
    options: [
      "Eine Einschränkung: Man gibt einen Nachteil oder Zugeständnis zu, hebt aber den positiven Aspekt hervor.",
      "Eine doppelte Negation wie 'weder ... noch'.",
      "Eine zeitliche Reihenfolge wie 'zuerst ... danach'."
    ],
    explanation_de: "'zwar ... aber' signalisiert B1-Reife: 'Die Wohnung ist zwar klein, aber sie hat einen wunderschönen Balkon.'",
    explanation_en: "'zwar ... aber' signals B1 maturity: 'The flat is admittedly small, but it has a wonderful balcony.'",
    wordOrderSchematic: "[zwar + Zugeständnis] , [aber (Pos 0)] + [Hauptsatz]."
  },
  {
    id: 21,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit der temporalen Konjunktion 'während' (while) ist korrekt aufgebaut?",
    prompt_en: "Which sentence with temporal conjunction 'während' (while) is correctly constructed?",
    correctAnswer: "Während die Kinder schliefen, lasen die Eltern ein Buch.",
    options: [
      "Während die Kinder schliefen, lasen die Eltern ein Buch.",
      "Während die Kinder schliefen, die Eltern lasen ein Buch.",
      "Während schliefen die Kinder, lasen die Eltern ein Buch."
    ],
    explanation_de: "'während' leitet Gleichzeitigkeit ein: Verb 'schliefen' am Ende, nach dem Komma sofort das Hauptsatz-Verb 'lasen'.",
    explanation_en: "'während' indicates simultaneous actions: verb 'schliefen' at end, main clause verb 'lasen' right after the comma.",
    wordOrderSchematic: "[Während ... schliefen (Verb End)], [lasen (Verb Pos 2)] + [die Eltern (Subject)] + ..."
  },
  {
    id: 22,
    family: "INVERSION",
    prompt_de: "Wie lautet der richtige Satzbau mit dem Kausal-Adverb 'daher' (therefore)?",
    prompt_en: "What is the correct sentence order with causal adverb 'daher' (therefore)?",
    correctAnswer: "Mein Akku war leer, daher konnte ich Sie nicht rechtzeitig anrufen.",
    options: [
      "Mein Akku war leer, daher ich konnte Sie nicht rechtzeitig anrufen.",
      "Mein Akku war leer, daher konnte ich Sie nicht rechtzeitig anrufen.",
      "Mein Akku war leer, daher ich Sie nicht anrufen konnte."
    ],
    explanation_de: "'daher' besetzt Position 1 des Folgesatzes und verlangt das Modalverb 'konnte' auf Position 2 (Inversion).",
    explanation_en: "'daher' occupies Position 1 of the following clause and demands modal 'konnte' in Position 2 (inversion).",
    wordOrderSchematic: "[daher (Pos 1)] + [konnte (Pos 2 Verb)] + [ich (Subject)] + [anrufen (Infinitiv am Ende)]."
  },
  {
    id: 23,
    family: "DOUBLE",
    prompt_de: "Welcher Satz mit 'sowohl ... als auch' (both ... and) verbindet zwei Vorteile korrekt?",
    prompt_en: "Which sentence with 'sowohl ... als auch' connects two benefits correctly?",
    correctAnswer: "Das Kursangebot umfasst sowohl Vormittags- als auch Abendkurse.",
    options: [
      "Das Kursangebot umfasst sowohl Vormittags- als auch Abendkurse.",
      "Das Kursangebot umfasst sowohl Vormittags- wie auch Abendkurse nicht.",
      "Das Kursangebot sowohl umfasst Vormittags- als auch Abendkurse."
    ],
    explanation_de: "'sowohl ... als auch' verbindet zwei gleichwertige Elemente ohne Negation und ohne Verb-Endstellung.",
    explanation_en: "'sowohl ... als auch' joins two equal elements without negation and without kicking verbs.",
    wordOrderSchematic: "[sowohl Element 1] + [als auch Element 2]."
  },
  {
    id: 24,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit dem Kausalkonnektor 'da' (since/as) am Satzanfang ist richtig formuliert?",
    prompt_en: "Which sentence with causal connector 'da' (since/as) at sentence beginning is correctly formed?",
    correctAnswer: "Da es heute stark schneit, bleiben alle Schulen in der Stadt geschlossen.",
    options: [
      "Da es heute stark schneit, bleiben alle Schulen in der Stadt geschlossen.",
      "Da es heute stark schneit, alle Schulen in der Stadt bleiben geschlossen.",
      "Da heute schneit es stark, bleiben alle Schulen geschlossen."
    ],
    explanation_de: "'da' steht oft am Satzanfang und kickt das Verb 'schneit' ans Ende. Der Hauptsatz beginnt direkt mit dem Verb 'bleiben'.",
    explanation_en: "'da' commonly starts a sentence and kicks verb 'schneit' to the end. The main clause begins directly with verb 'bleiben'.",
    wordOrderSchematic: "[Da ... schneit (Verb End)], [bleiben (Verb Pos 2)] + [alle Schulen (Subject)] + ..."
  },
  {
    id: 25,
    family: "ADUSO",
    prompt_de: "Welcher Satz mit dem Gegensatz-Konnektor 'aber' (but) ist fehlerfrei?",
    prompt_en: "Which sentence with contrast connector 'aber' (but) is flawless?",
    correctAnswer: "Ich habe mich für die Stelle beworben, aber ich habe noch keine Rückmeldung erhalten.",
    options: [
      "Ich habe mich für die Stelle beworben, aber ich habe noch keine Rückmeldung erhalten.",
      "Ich habe mich für die Stelle beworben, aber habe ich noch keine Rückmeldung erhalten.",
      "Ich habe mich für die Stelle beworben, aber ich noch keine Rückmeldung erhalten habe."
    ],
    explanation_de: "'aber' ist ADUSO (Position 0). Das Subjekt 'ich' steht auf Position 1 und das Hilfsverb 'habe' auf Position 2.",
    explanation_en: "'aber' is ADUSO (Pos 0). Subject 'ich' stands in Position 1, and auxiliary 'habe' in Position 2.",
    wordOrderSchematic: "[aber (Pos 0)] + [ich (Pos 1 Subject)] + [habe (Pos 2 Verb)] + [erhalten (Partizip am Ende)]."
  },
  {
    id: 26,
    family: "DOUBLE",
    prompt_de: "Welcher Satz mit der Proportional-Verbindung 'je ... desto' (the ... the) ist grammatikalisch perfekt?",
    prompt_en: "Which sentence with proportional connector 'je ... desto' (the ... the) is grammatically perfect?",
    correctAnswer: "Je mehr Sie Deutsch üben, desto schneller bestehen Sie die B1-Prüfung.",
    options: [
      "Je mehr Sie Deutsch üben, desto schneller bestehen Sie die B1-Prüfung.",
      "Je mehr Sie Deutsch üben, desto schneller Sie die B1-Prüfung bestehen.",
      "Je mehr üben Sie Deutsch, desto schneller bestehen Sie die B1-Prüfung."
    ],
    explanation_de: "Im Je-Nebensatz steht das Verb 'üben' am Ende. Im Desto-Hauptsatz steht das Verb 'bestehen' direkt nach dem Komparativ 'desto schneller'.",
    explanation_en: "In the 'je' subclause, verb 'üben' is at the end. In the 'desto' main clause, verb 'bestehen' follows right after comparative 'desto schneller'.",
    wordOrderSchematic: "[Je + Komparativ + Subjekt + ... + Verb am Ende], [desto + Komparativ + VERB + Subjekt + ...]"
  },
  {
    id: 27,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit 'seitdem' (ever since) ist korrekt aufgebaut?",
    prompt_en: "Which sentence with 'seitdem' (ever since) is correctly constructed?",
    correctAnswer: "Seitdem Herr Schmidt in Berlin wohnt, fährt er jeden Tag mit dem Fahrrad.",
    options: [
      "Seitdem Herr Schmidt in Berlin wohnt, fährt er jeden Tag mit dem Fahrrad.",
      "Seitdem Herr Schmidt in Berlin wohnt, er fährt jeden Tag mit dem Fahrrad.",
      "Seitdem wohnt Herr Schmidt in Berlin, fährt er jeden Tag mit dem Fahrrad."
    ],
    explanation_de: "'seitdem' leitet einen Nebensatz ein (Verb 'wohnt' am Ende), gefolgt vom Hauptsatz-Verb 'fährt' auf Position 2 nach dem Komma.",
    explanation_en: "'seitdem' introduces a subclause (verb 'wohnt' at end), followed by main clause verb 'fährt' in Position 2 after comma.",
    wordOrderSchematic: "[Seitdem ... wohnt (Verb End)], [fährt (Verb Pos 2)] + [er (Subject)] + ..."
  },
  {
    id: 28,
    family: "INVERSION",
    prompt_de: "Wie wird das gehobene B1-Konnektor-Wort 'jedoch' (however) auf Position 1 verwendet?",
    prompt_en: "How is the elevated B1 connector 'jedoch' (however) used in Position 1?",
    correctAnswer: "Wir haben sehr gründlich gesucht, jedoch fanden wir den Schlüssel nicht.",
    options: [
      "Wir haben sehr gründlich gesucht, jedoch wir fanden den Schlüssel nicht.",
      "Wir haben sehr gründlich gesucht, jedoch fanden wir den Schlüssel nicht.",
      "Wir haben sehr gründlich gesucht, jedoch wir den Schlüssel nicht fanden."
    ],
    explanation_de: "'jedoch' am Satzanfang besetzt Position 1: Das Präteritum-Verb 'fanden' steht auf Position 2, gefolgt vom Subjekt 'wir'.",
    explanation_en: "'jedoch' at clause start occupies Position 1: the verb 'fanden' stands in Position 2, followed by subject 'wir'.",
    wordOrderSchematic: "[jedoch (Pos 1)] + [fanden (Pos 2 Verb)] + [wir (Subject)] + ..."
  },
  {
    id: 29,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit der temporalen Konjunktion 'solange' (as long as) ist korrekt?",
    prompt_en: "Which sentence with temporal conjunction 'solange' (as long as) is correct?",
    correctAnswer: "Solange Sie noch Fieber haben, dürfen Sie keinen Sport treiben.",
    options: [
      "Solange Sie noch Fieber haben, dürfen Sie keinen Sport treiben.",
      "Solange Sie haben noch Fieber, Sie dürfen keinen Sport treiben.",
      "Solange haben Sie noch Fieber, dürfen Sie keinen Sport treiben."
    ],
    explanation_de: "'solange' kickt das finite Verb 'haben' ans Nebensatz-Ende. Der Hauptsatz beginnt direkt mit dem Modalverb 'dürfen'.",
    explanation_en: "'solange' kicks the finite verb 'haben' to the subclause end. The main clause begins directly with modal verb 'dürfen'.",
    wordOrderSchematic: "[Solange ... haben (Verb End)], [dürfen (Verb Pos 2)] + [Sie (Subject)] + [treiben (Infinitiv)]."
  },
  {
    id: 30,
    family: "INVERSION",
    prompt_de: "Welcher Satz zeigt eine korrekte zeitliche Reihenfolge mit 'dann' (then / position 1)?",
    prompt_en: "Which sentence shows a correct chronological sequence with 'dann' (then / position 1)?",
    correctAnswer: "Zuerst füllen Sie bitte das Formular aus, dann unterschreiben Sie hier unten.",
    options: [
      "Zuerst füllen Sie bitte das Formular aus, dann Sie unterschreiben hier unten.",
      "Zuerst füllen Sie bitte das Formular aus, dann unterschreiben Sie hier unten.",
      "Zuerst füllen Sie bitte das Formular aus, dann hier unten Sie unterschreiben."
    ],
    explanation_de: "'dann' ist ein temporales Adverb auf Position 1 und erfordert sofort das konjugierte Verb 'unterschreiben' auf Position 2.",
    explanation_en: "'dann' is a temporal adverb occupying Position 1, requiring conjugated verb 'unterschreiben' in Position 2.",
    wordOrderSchematic: "[dann (Pos 1)] + [unterschreiben (Pos 2 Verb)] + [Sie (Subject)] + ..."
  },
  {
    id: 31,
    family: "VERB_END",
    prompt_de: "Welcher Satz mit dem Konsekutiv-Konnektor 'sodass' (so that / with result that) ist richtig?",
    prompt_en: "Which sentence with consecutive connector 'sodass' is correct?",
    correctAnswer: "Es gab einen plötzlichen Stromausfall, sodass alle Computer im Büro ausgingen.",
    options: [
      "Es gab einen plötzlichen Stromausfall, sodass alle Computer im Büro ausgingen.",
      "Es gab einen plötzlichen Stromausfall, sodass gingen alle Computer im Büro aus.",
      "Es gab einen plötzlichen Stromausfall, sodass alle Computer im Büro gingen aus."
    ],
    explanation_de: "'sodass' leitet eine Folge ein und kickt das trennbare Verb 'ausgingen' ungetrennt an das absolute Satzende.",
    explanation_en: "'sodass' introduces a consequence and kicks separable verb 'ausgingen' together to the sentence end.",
    wordOrderSchematic: "[sodass] + [alle Computer (Subject)] + [ausgingen (Verb am Ende)]."
  },
  {
    id: 32,
    family: "ADUSO",
    prompt_de: "Welcher Satz mit der Alternative 'oder' (or) ist grammatikalisch fehlerfrei?",
    prompt_en: "Which sentence with alternative 'oder' (or) is error-free?",
    correctAnswer: "Möchten Sie lieber bar bezahlen oder überweisen Sie den Betrag online?",
    options: [
      "Möchten Sie lieber bar bezahlen oder überweisen Sie den Betrag online?",
      "Möchten Sie lieber bar bezahlen oder Sie überweisen den Betrag online?",
      "Möchten Sie lieber bar bezahlen oder den Betrag online Sie überweisen?"
    ],
    explanation_de: "Bei Entscheidungsfragen nach 'oder' folgt wie bei jeder Ja/Nein-Frage das Verb 'überweisen' an erster Stelle im Fragesatz.",
    explanation_en: "In question clauses after 'oder', the verb 'überweisen' stands in the first position of the question.",
    wordOrderSchematic: "[Fragesatz 1] + [oder (Pos 0)] + [Verb (Pos 1 der Frage)] + [Subjekt] + ..."
  },
  {
    id: 33,
    family: "VERB_END",
    prompt_de: "Wie verhält sich ein trennbares Verb im Nebensatz mit 'weil'?",
    prompt_en: "How does a separable verb behave in a subclause with 'weil'?",
    correctAnswer: "Das trennbare Verb wird NICHT getrennt, sondern steht zusammengefügt und konjugiert am Satzende.",
    options: [
      "Das trennbare Verb wird NICHT getrennt, sondern steht zusammengefügt und konjugiert am Satzende.",
      "Die Vorsilbe bleibt am Ende, aber der Verbstamm wandert auf Position 2.",
      "Trennbare Verben sind nach 'weil' verboten."
    ],
    explanation_de: "Im Nebensatz bleibt die Vorsilbe mit dem Stamm verbunden: '..., weil der Zug um 14 Uhr ankommt' (nicht: 'weil der Zug kommt an').",
    explanation_en: "In subclauses, prefix and stem remain attached: '..., weil der Zug ankommt' (never: 'weil der Zug kommt an').",
    wordOrderSchematic: "[weil] + [Subjekt] + [Objekt / Zeit] + [ankommt (zusammen am Ende)]."
  },
  {
    id: 34,
    family: "INVERSION",
    prompt_de: "Welcher Satz mit 'trotzdem' und einem Modalverb im Präteritum ist korrekt?",
    prompt_en: "Which sentence with 'trotzdem' and a past modal verb is correct?",
    correctAnswer: "Der Baulärm war unerträglich, trotzdem konnte Herr Lehmann konzentriert arbeiten.",
    options: [
      "Der Baulärm war unerträglich, trotzdem Herr Lehmann konnte konzentriert arbeiten.",
      "Der Baulärm war unerträglich, trotzdem konnte Herr Lehmann konzentriert arbeiten.",
      "Der Baulärm war unerträglich, trotzdem Herr Lehmann konzentriert arbeiten konnte."
    ],
    explanation_de: "'trotzdem' steht auf Position 1. Das finite Modalverb 'konnte' folgt auf Position 2, der Infinitiv 'arbeiten' steht am Ende.",
    explanation_en: "'trotzdem' is in Position 1. The modal 'konnte' follows in Position 2, infinitive 'arbeiten' at the end.",
    wordOrderSchematic: "[trotzdem (Pos 1)] + [konnte (Pos 2 Verb)] + [Herr Lehmann (Subject)] + [arbeiten (Infinitiv am Ende)]."
  },
  {
    id: 35,
    family: "DOUBLE",
    prompt_de: "Welcher Satz mit der doppelten Negation 'weder ... noch' ist richtig aufgebaut?",
    prompt_en: "Which sentence with double negation 'weder ... noch' is correctly constructed?",
    correctAnswer: "Er kann zurzeit weder schwimmen noch schwere Lasten tragen.",
    options: [
      "Er kann zurzeit weder schwimmen noch schwere Lasten tragen.",
      "Er kann zurzeit weder schwimmen und nicht schwere Lasten tragen.",
      "Er weder kann schwimmen noch schwere Lasten tragen."
    ],
    explanation_de: "'weder ... noch' verneint zwei Verben oder Nomen gleichwertig, ohne dass ein zusätzliches 'nicht' nötig ist.",
    explanation_en: "'weder ... noch' negates both verbs or nouns equally without requiring an extra 'nicht'.",
    wordOrderSchematic: "[weder + Verb/Nomen 1] + [noch + Verb/Nomen 2]."
  },
  {
    id: 36,
    family: "VERB_END",
    prompt_de: "Welche B1-Schlussformel mit der Bedingung 'wenn' ist für formelle Briefe perfekt?",
    prompt_en: "Which B1 closing formula with conditional 'wenn' is perfect for formal letters?",
    correctAnswer: "Wenn Sie weitere Fragen haben, stehe ich Ihnen gerne zur Verfügung.",
    options: [
      "Wenn Sie weitere Fragen haben, stehe ich Ihnen gerne zur Verfügung.",
      "Wenn Sie haben weitere Fragen, ich stehe Ihnen gerne zur Verfügung.",
      "Wenn haben Sie weitere Fragen, stehe ich Ihnen gerne zur Verfügung."
    ],
    explanation_de: "Prüfungsgarantie: 'Wenn ... haben' (Verb am Ende des Nebensatzes), gefolgt von 'stehe ich' (Inversion zu Beginn des Hauptsatzes).",
    explanation_en: "Guaranteed pass formula: 'Wenn ... haben' (verb at end of subclause), followed by 'stehe ich' (inversion at start of main clause).",
    wordOrderSchematic: "[Wenn ... haben (Verb End)], [stehe (Verb Pos 2)] + [ich (Subject)] + ..."
  },
  // ── Authentic Drills from LearnOutLive "German Conjunctions" ──
  {
    id: 37,
    family: "ADUSO",
    prompt_de: "Ergänzen Sie: 'Ich bleibe heute zu Hause, ___ ich bin sehr erkältet.'",
    prompt_en: "Fill in: 'I am staying home today, because I have a bad cold.' (Verb 'bin' in Pos 2)",
    correctAnswer: "denn",
    options: ["denn", "weil", "deshalb", "obwohl"],
    explanation_de: "'denn' ist eine Position-0-Konjunktion (ADUSO). Das Verb 'bin' bleibt regulär auf Position 2 nach dem Subjekt 'ich'.",
    explanation_en: "'denn' is a Position 0 conjunction (ADUSO). The verb 'bin' stays in normal Position 2 after the subject 'ich'.",
    wordOrderSchematic: "[denn (Pos 0)] + [ich (Subject Pos 1)] + [bin (Verb Pos 2)] ..."
  },
  {
    id: 38,
    family: "VERB_END",
    prompt_de: "Ergänzen Sie: 'Ich bleibe heute zu Hause, ___ ich sehr erkältet bin.'",
    prompt_en: "Fill in: 'I am staying home today, because I have a bad cold.' (Verb 'bin' at the end)",
    correctAnswer: "weil",
    options: ["weil", "denn", "deshalb", "aber"],
    explanation_de: "'weil' ist ein subordinierender Verb-Kicker. Das finite Verb 'bin' wird an das absolute Satzende gekickt.",
    explanation_en: "'weil' is a subordinating verb-kicker. The conjugated verb 'bin' is kicked to the absolute end of the sentence.",
    wordOrderSchematic: "[weil (Kicker)] + [ich (Subject)] + ... + [bin (Verb am Ende)]"
  },
  {
    id: 39,
    family: "INVERSION",
    prompt_de: "Ergänzen Sie: 'Ich bin sehr erkältet, ___ bleibe ich heute zu Hause.'",
    prompt_en: "Fill in: 'I have a bad cold, therefore I stay home today.' (Verb 'bleibe' before subject)",
    correctAnswer: "deshalb",
    options: ["deshalb", "denn", "weil", "obwohl"],
    explanation_de: "'deshalb' besetzt Position 1 des zweiten Satzes und erzwingt Inversion: finites Verb 'bleibe' auf Position 2, Subjekt 'ich' auf Position 3.",
    explanation_en: "'deshalb' occupies Position 1 of the second clause, forcing inversion: verb 'bleibe' on Pos 2, subject 'ich' on Pos 3.",
    wordOrderSchematic: "[deshalb (Pos 1)] + [bleibe (Verb Pos 2)] + [ich (Subject Pos 3)] ..."
  },
  {
    id: 40,
    family: "INVERSION",
    prompt_de: "Ergänzen Sie: 'Er hat fleißig gelernt, ___ hat er die B1-Prüfung leider nicht bestanden.'",
    prompt_en: "Fill in: 'He studied hard, nevertheless he sadly didn't pass the B1 exam.'",
    correctAnswer: "trotzdem",
    options: ["trotzdem", "obwohl", "aber", "weil"],
    explanation_de: "'trotzdem' steht auf Position 1 und leitet eine Inversion ein: Hilfsverb 'hat' folgt unmittelbar auf Position 2 vor dem Subjekt 'er'.",
    explanation_en: "'trotzdem' sits in Position 1 and triggers inversion: auxiliary verb 'hat' directly follows in Position 2 before subject 'er'.",
    wordOrderSchematic: "[trotzdem (Pos 1)] + [hat (Verb Pos 2)] + [er (Subject Pos 3)] ..."
  },
  {
    id: 41,
    family: "VERB_END",
    prompt_de: "Ergänzen Sie: 'Er hat die B1-Prüfung nicht bestanden, ___ er fleißig gelernt hat.'",
    prompt_en: "Fill in: 'He didn't pass the B1 exam, although he studied hard.'",
    correctAnswer: "obwohl",
    options: ["obwohl", "trotzdem", "denn", "deshalb"],
    explanation_de: "'obwohl' ist subordinierend und befördert das Hilfsverb 'hat' an das absolute Ende des Nebensatzes.",
    explanation_en: "'obwohl' (although) is subordinating and sends auxiliary 'hat' to the absolute end of the subordinate clause.",
    wordOrderSchematic: "[obwohl] + [er] + [fleißig gelernt] + [hat (Verb am Ende)]."
  },
  {
    id: 42,
    family: "ADUSO",
    prompt_de: "Ergänzen Sie: 'Wir wollten im Park spazieren gehen, ___ es fing plötzlich an zu regnen.'",
    prompt_en: "Fill in: 'We wanted to go for a walk, but it suddenly began to rain.'",
    correctAnswer: "aber",
    options: ["aber", "obwohl", "trotzdem", "weil"],
    explanation_de: "'aber' (ADUSO) besetzt Position 0. Das Subjekt 'es' folgt auf Position 1, und das Verb 'fing an' steht auf Position 2.",
    explanation_en: "'aber' (ADUSO) occupies Position 0. Subject 'es' is in Pos 1, verb 'fing' is in Pos 2.",
    wordOrderSchematic: "[aber (Pos 0)] + [es (Subject Pos 1)] + [fing (Verb Pos 2)] ..."
  },
  {
    id: 43,
    family: "ADUSO",
    prompt_de: "Ergänzen Sie: 'Nicht Maria hat angerufen, ___ ihr Bruder war am Apparat.'",
    prompt_en: "Fill in: 'Not Maria called, but rather her brother was on the phone.'",
    correctAnswer: "sondern",
    options: ["sondern", "aber", "denn", "deshalb"],
    explanation_de: "'sondern' korrigiert eine vorherige Negation ('Nicht Maria...'). Als ADUSO-Konnektor nimmt es Position 0 ein.",
    explanation_en: "'sondern' (but rather) replaces a preceding negation ('Nicht Maria...'). As an ADUSO connector, it occupies Position 0.",
    wordOrderSchematic: "[sondern (Pos 0)] + [ihr Bruder (Subject Pos 1)] + [war (Verb Pos 2)] ..."
  },
  {
    id: 44,
    family: "INVERSION",
    prompt_de: "Ergänzen Sie: 'Beeil dich bitte, ___ verpassen wir die S-Bahn zum Flughafen!'",
    prompt_en: "Fill in: 'Hurry up please, otherwise we'll miss the S-Bahn to the airport!'",
    correctAnswer: "sonst",
    options: ["sonst", "wenn", "denn", "damit"],
    explanation_de: "'sonst' (andernfalls) ist ein Adverb auf Position 1 und erfordert Inversion: 'verpassen' (Verb Pos 2) + 'wir' (Subjekt Pos 3).",
    explanation_en: "'sonst' (otherwise) is an adverb in Position 1 requiring inversion: 'verpassen' (Verb Pos 2) + 'wir' (Subject Pos 3).",
    wordOrderSchematic: "[sonst (Pos 1)] + [verpassen (Verb Pos 2)] + [wir (Subject Pos 3)] ..."
  },
  {
    id: 45,
    family: "VERB_END",
    prompt_de: "Ergänzen Sie: 'Ich weiß noch nicht genau, ___ ich im Sommer nach Spanien fliege.'",
    prompt_en: "Fill in: 'I do not know yet whether I am flying to Spain in the summer.'",
    correctAnswer: "ob",
    options: ["ob", "wenn", "dass", "denn"],
    explanation_de: "'ob' leitet eine indirekte Ja/Nein-Frage ein und kickt das Verb 'fliege' an das Satzende.",
    explanation_en: "'ob' (whether / if) introduces an indirect question and kicks the conjugated verb 'fliege' to the end.",
    wordOrderSchematic: "[ob] + [ich] + [im Sommer nach Spanien] + [fliege (Verb am Ende)]."
  },
  {
    id: 46,
    family: "VERB_END",
    prompt_de: "Ergänzen Sie: 'Frau Müller rief an, ___ sie den Termin beim Arzt verschieben wollte.'",
    prompt_en: "Fill in: 'Mrs. Müller called because / since she wanted to reschedule the doctor appointment.'",
    correctAnswer: "da",
    options: ["da", "denn", "deshalb", "trotzdem"],
    explanation_de: "'da' (weil / da) leitet einen kausalen Nebensatz ein und kickt das finite Modalverb 'wollte' an das Satzende.",
    explanation_en: "'da' (since / because) introduces a causal subordinate clause, kicking modal 'wollte' to the end.",
    wordOrderSchematic: "[da] + [sie] + [den Termin ...] + [verschieben wollte (Verb am Ende)]."
  },
  {
    id: 47,
    family: "VERB_END",
    prompt_de: "Ergänzen Sie: '___ ich gestern Abend nach Hause kam, brannte noch Licht in der Küche.'",
    prompt_en: "Fill in: 'When I came home yesterday evening, the light in the kitchen was still on.'",
    correctAnswer: "Als",
    options: ["Als", "Wenn", "Wann", "Weil"],
    explanation_de: "Für ein einmaliges Ereignis in der Vergangenheit verwendet man 'Als'. Es kickt das Verb 'kam' an das Komma.",
    explanation_en: "For a single, unique event in the past, German uses 'Als'. It kicks verb 'kam' directly before the comma.",
    wordOrderSchematic: "[Als ... kam (Verb vor Komma)], [brannte (Verb Pos 2)] + [noch Licht] ..."
  },
  {
    id: 48,
    family: "DOUBLE",
    prompt_de: "Ergänzen Sie: 'Sie spricht ___ fließend Deutsch, sondern sie lernt auch schon Spanisch.'",
    prompt_en: "Fill in: 'She speaks not only fluent German, but she is also already learning Spanish.'",
    correctAnswer: "nicht nur",
    options: ["nicht nur", "entweder", "weder", "sowohl"],
    explanation_de: "Das zweiteilige Konnektoren-Paar 'nicht nur ... sondern auch' drückt zwei gleichwertige positive Tatsachen aus.",
    explanation_en: "The two-part connector 'nicht nur ... sondern auch' (not only ... but also) expresses two complementary positive facts.",
    wordOrderSchematic: "[nicht nur + Fakt 1] + [sondern auch + Fakt 2]."
  },
  {
    id: 49,
    family: "DOUBLE",
    prompt_de: "Ergänzen Sie: 'Er trinkt morgens ___ Kaffee noch schwarzen Tee, sondern nur heißes Zitronenwasser.'",
    prompt_en: "Fill in: 'In the morning he drinks neither coffee nor black tea, but only hot lemon water.'",
    correctAnswer: "weder",
    options: ["weder", "entweder", "nicht nur", "sowohl"],
    explanation_de: "Das Paar 'weder ... noch' drückt eine doppelte Negation aus (weder X noch Y).",
    explanation_en: "The pair 'weder ... noch' (neither ... nor) expresses double negation.",
    wordOrderSchematic: "[weder + Element 1] + [noch + Element 2]."
  }
];
