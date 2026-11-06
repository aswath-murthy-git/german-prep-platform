export interface StepDefinition {
  title: string;
  type: string;
  subtitle: string;
}

export interface TopicLessonData {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  desc: string;
  duration: string;
  badge: string;
  steps: StepDefinition[];
  intro: {
    badge: string;
    title: string;
    description: string;
    exampleCard: {
      title: string;
      formula: string;
      highlight: string;
    };
    interactiveItems: Array<{
      german: string;
      english: string;
      note?: string;
    }>;
  };
  table: {
    badge: string;
    title: string;
    description: string;
    headers: string[];
    rows: Array<{
      col1: string;
      col2: string;
      col3: string;
      col4?: string;
      col5?: string;
      tip?: string;
    }>;
    goldenTip: string;
  };
  drill1: {
    badge: string;
    title: string;
    description: string;
    questions: Array<{
      sentence: string;
      correct: string;
      options: string[];
      explanation: string;
    }>;
  };
  drill2: {
    badge: string;
    title: string;
    description: string;
    questions: Array<{
      sentence: string;
      correct: string;
      options: string[];
      explanation: string;
    }>;
  };
  typingWorkout: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      sentenceBefore: string;
      blank: string;
      sentenceAfter: string;
      hint: string;
      acceptableAnswers: string[];
      explanation: string;
    }>;
  };
  nuance: {
    badge: string;
    title: string;
    description: string;
    cards: Array<{
      title: string;
      de: string;
      en: string;
      rule: string;
    }>;
  };
  quiz: {
    badge: string;
    title: string;
    questions: Array<{
      prompt: string;
      correct: number;
      options: string[];
      explanation: string;
    }>;
  };
  summary: {
    title: string;
    badge?: string;
    takeaway: string;
    bulletPoints: string[];
    points?: string[];
    nextRecommendation?: string;
  };
}

export const LEARN_ACADEMY_LESSONS: Record<string, TopicLessonData> = {
  // ── 1. PRÄSENS: REGELMÄSSIGE VERBEN ──
  "a1-praesens": {
    id: "a1-praesens",
    level: "A1",
    title: "Präsens: Regelmäßige Verben",
    desc: "Master the 4 core verb endings (-e, -st, -t, -en) with instant pattern recognition.",
    duration: "10 min",
    badge: "High Yield",
    steps: [
      { title: "1. The Core Blueprint Formula", type: "intro", subtitle: "Verbstamm + Endung" },
      { title: "2. Personal Endings Master Chart", type: "table", subtitle: "Golden Reference Table" },
      { title: "3. Conjugation Drill in Action", type: "drill1", subtitle: "Sentence Gap Practice" },
      { title: "4. Click-to-Place Challenge", type: "drill2", subtitle: "Fast Word Placement" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Correct Conjugation" },
      { title: "6. Irregular Stem Changes", type: "nuance", subtitle: "Vowel Mutations (e -> i, a -> ä)" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How German Verbs Work in Präsens",
      description: "Every German verb consists of a stem (Verbstamm) and an ending (Endung). To conjugate in present tense, remove the infinitive ending -en and attach the matching pronoun ending.",
      exampleCard: {
        title: "Example Verb: spielen (to play)",
        formula: "Stem: spiel- | ich spiel-e | du spiel-st | er/sie/es spiel-t | wir spiel-en | ihr spiel-t | sie/Sie spiel-en",
        highlight: "The stem never changes for regular verbs!"
      },
      interactiveItems: [
        { german: "spiel-en", english: "to play", note: "Stem: spiel-" },
        { german: "lern-en", english: "to learn", note: "Stem: lern-" },
        { german: "wohn-en", english: "to live", note: "Stem: wohn-" },
        { german: "komm-en", english: "to come", note: "Stem: komm-" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "Personal Pronoun Endings Chart",
      description: "Memorize these 4 core ending groups. They apply to over 85% of all German verbs:",
      headers: ["Pronoun", "Ending", "Example (lernen)"],
      rows: [
        { col1: "ich (I)", col2: "-e", col3: "ich lerne", tip: "Singular 1st person" },
        { col1: "du (you informal)", col2: "-st", col3: "du lernst", tip: "Always has -st!" },
        { col1: "er / sie / es (he/she/it)", col2: "-t", col3: "er lernt", tip: "Singular 3rd person" },
        { col1: "wir (we)", col2: "-en", col3: "wir lernen", tip: "Identical to infinitive!" },
        { col1: "ihr (you plural)", col2: "-t", col3: "ihr lernt", tip: "Same ending as er/sie/es" },
        { col1: "sie / Sie (they / You formal)", col2: "-en", col3: "sie/Sie lernen", tip: "Identical to infinitive!" }
      ],
      goldenTip: "Notice: 'wir' and 'sie/Sie' ALWAYS have the exact same form as the dictionary infinitive (-en)!"
    },
    drill1: {
      badge: "Step 3: Sentence Conjugation",
      title: "Select the Correct Verb Form",
      description: "Identify the subject pronoun and pick the matching verb ending:",
      questions: [
        {
          sentence: "Ich ___ gern am Wochenende Fußball mit Freunden.",
          correct: "spiele",
          options: ["spiele", "spielst", "spielt", "spielen"],
          explanation: "Pronoun 'ich' always takes ending -e: ich spiele."
        },
        {
          sentence: "Du ___ seit zwei Jahren in Berlin.",
          correct: "wohnst",
          options: ["wohne", "wohnst", "wohnt", "wohnen"],
          explanation: "Pronoun 'du' always takes ending -st: du wohnst."
        },
        {
          sentence: "Er ___ jeden Tag fleißig Deutsch für die B1-Prüfung.",
          correct: "lernt",
          options: ["lerne", "lernst", "lernt", "lernen"],
          explanation: "Pronoun 'er' takes ending -t: er lernt."
        },
        {
          sentence: "Wir ___ heute Abend zusammen ein traditionelles Abendessen.",
          correct: "kochen",
          options: ["koche", "kochst", "kocht", "kochen"],
          explanation: "Pronoun 'wir' takes ending -en: wir kochen."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Click-to-Place",
      title: "Slot the Matching Ending into Place",
      description: "Click the correct conjugated verb to complete each everyday sentence:",
      questions: [
        {
          sentence: "Frau Müller, wo ___ Sie zurzeit?",
          correct: "arbeiten",
          options: ["arbeite", "arbeitest", "arbeitet", "arbeiten"],
          explanation: "Formal 'Sie' takes ending -en: arbeiten Sie."
        },
        {
          sentence: "Ihr ___ sehr schnell Deutsch!",
          correct: "lernt",
          options: ["lerne", "lernst", "lernt", "lernen"],
          explanation: "'ihr' (you plural) takes ending -t: ihr lernt."
        },
        {
          sentence: "Meine Schwester ___ in Frankfurt am Main.",
          correct: "wohnt",
          options: ["wohne", "wohnst", "wohnt", "wohnen"],
          explanation: "'Meine Schwester' is 3rd person singular (sie): sie wohnt."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Conjugated Verb",
      description: "Type the correct conjugated form into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Ich",
          blank: "komme",
          sentenceAfter: "aus Indien und lebe in Deutschland.",
          hint: "Verb: kommen, Pronomen: ich",
          acceptableAnswers: ["komme"],
          explanation: "ich komme: stem 'komm' + ending '-e'."
        },
        {
          sentenceBefore: "Wo",
          blank: "wohnst",
          sentenceAfter: "du in Berlin?",
          hint: "Verb: wohnen, Pronomen: du",
          acceptableAnswers: ["wohnst"],
          explanation: "du wohnst: stem 'wohn' + ending '-st'."
        },
        {
          sentenceBefore: "Wir",
          blank: "trinken",
          sentenceAfter: "morgens gern Kaffee.",
          hint: "Verb: trinken, Pronomen: wir",
          acceptableAnswers: ["trinken"],
          explanation: "wir trinken: identical to dictionary infinitive."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Stem Mutations",
      title: "Irregular Vowel Stem Changes (du & er/sie/es)",
      description: "Strong verbs change their stem vowel ONLY in 'du' and 'er/sie/es' forms:",
      cards: [
        {
          title: "e -> i Mutation (sprechen)",
          de: "ich spreche | du sprichst | er spricht",
          en: "I speak | you speak | he speaks",
          rule: "Stem vowel 'e' changes to 'i' in 2nd and 3rd person singular."
        },
        {
          title: "a -> ä Mutation (fahren)",
          de: "ich fahre | du fährst | er fährt",
          en: "I drive | you drive | he drives",
          rule: "Stem vowel 'a' receives an umlaut 'ä' in 2nd and 3rd person singular."
        },
        {
          title: "e -> ie Mutation (sehen)",
          de: "ich sehe | du siehst | er sieht",
          en: "I see | you see | he sees",
          rule: "Stem vowel 'e' becomes 'ie': du siehst, er sieht."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welche Endung bekommt das Verb bei 'du'?",
          correct: 1,
          options: ["-e", "-st", "-t", "-en"],
          explanation: "'du' verlangt immer die Endung -st (z.B. du lernst, du gehst)."
        },
        {
          prompt: "Er ___ fließend Deutsch und Englisch. (sprechen)",
          correct: 2,
          options: ["sprecht", "spreche", "spricht", "sprechen"],
          explanation: "Vokalwechsel e -> i: er spricht (nicht 'sprecht')."
        },
        {
          prompt: "Welche beiden Pronomen haben immer die gleiche Verbform wie der Infinitiv (-en)?",
          correct: 0,
          options: ["wir und sie/Sie", "ich und er", "du und ihr", "er und sie"],
          explanation: "'wir' und 'sie/Sie' enden im Präsens immer auf -en."
        }
      ]
    },
    summary: {
      title: "Präsens Mastery Achieved!",
      takeaway: "You have mastered regular German present tense conjugations.",
      bulletPoints: [
        "Core Endings Formula: -e (ich), -st (du), -t (er/sie/es/ihr), -en (wir/sie/Sie).",
        "Vowel mutations (e->i, a->ä) occur strictly in du and er/sie/es.",
        "Active typing builds the reflexive muscle memory required for B1 speaking and writing."
      ]
    }
  },

  // ── 2. GENUSREGELN: DER, DIE ODER DAS? ──
  "a1-genus": {
    id: "a1-genus",
    level: "A1",
    title: "Genusregeln: der, die oder das?",
    desc: "Stop guessing genders: memorize 10 reliable noun suffix rules (-ung, -heit, -ling, -chen).",
    duration: "12 min",
    badge: "Essential",
    steps: [
      { title: "1. The 3 Gender Articles", type: "intro", subtitle: "der (masc), die (fem), das (neut)" },
      { title: "2. 10 Golden Noun Suffix Rules", type: "table", subtitle: "100% Reliable Ending Rules" },
      { title: "3. Suffix Detection Drill", type: "drill1", subtitle: "Recognize Endings Instantly" },
      { title: "4. Gender Bucket Sorting", type: "drill2", subtitle: "Sort Words into der/die/das" },
      { title: "5. Active Article Typing", type: "typing", subtitle: "Type the Correct Article" },
      { title: "6. Compound Noun Rule (Komposita)", type: "nuance", subtitle: "The Last Word Decides!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Article Challenges" },
      { title: "8. Genus Mastery Summary", type: "summary", subtitle: "No More Guessing Articles" }
    ],
    intro: {
      badge: "Step 1: Gender Blueprint",
      title: "Stop Guessing: German Nouns Have Rules",
      description: "German nouns are not random! More than 60% of all German nouns can be determined instantly by looking at their suffix (the last 2-4 letters of the word).",
      exampleCard: {
        title: "The Golden Suffix Secret",
        formula: "Word Endings dictate 100% of these genders: -ung / -heit / -keit / -schaft = DIE | -chen / -lein / -ment / -um = DAS | -ling / -or / -ismus = DER",
        highlight: "Never learn a German noun without its article!"
      },
      interactiveItems: [
        { german: "die Wohn-ung", english: "the apartment", note: "Suffix -ung is ALWAYS die!" },
        { german: "die Frei-heit", english: "the freedom", note: "Suffix -heit is ALWAYS die!" },
        { german: "das Mäd-chen", english: "the girl", note: "Diminutive -chen is ALWAYS das!" },
        { german: "der Früh-ling", english: "the spring", note: "Suffix -ling is ALWAYS der!" }
      ]
    },
    table: {
      badge: "Step 2: Suffix Reference Table",
      title: "10 Golden Noun Suffix Rules",
      description: "Commit these high-yield suffixes to memory to score maximum marks on B1 writing and reading:",
      headers: ["Gender", "Reliable Suffixes", "Examples"],
      rows: [
        { col1: "DIE (Feminin - 99%)", col2: "-ung, -heit, -keit, -schaft, -tät, -ion", col3: "die Wohnung, die Gesundheit, die Möglichkeit, die Freundschaft", tip: "Words ending in -ung are ALWAYS feminine!" },
        { col1: "DAS (Neutral - 100%)", col2: "-chen, -lein, -ment, -um, -tum", col3: "das Mädchen, das Brötchen, das Dokument, das Zentrum", tip: "Diminutives (-chen) are always neutral!" },
        { col1: "DER (Maskulin - 95%)", col2: "-ling, -or, -ismus, -ist, -ant", col3: "der Frühling, der Motor, der Optimismus, der Tourist", tip: "Male agents and technical suffixes are masculine." }
      ],
      goldenTip: "Pro-Tip: Days of the week (der Montag), months (der August), seasons (der Sommer), and compass points (der Norden) are ALWAYS 'DER'!"
    },
    drill1: {
      badge: "Step 3: Suffix Recognition",
      title: "Identify Gender by Suffix",
      description: "Look at the ending of the noun and pick the correct article:",
      questions: [
        {
          sentence: "___ Rechnung für die Reparatur ist gestern angekommen.",
          correct: "Die",
          options: ["Der", "Die", "Das"],
          explanation: "Nouns ending in -ung are 100% feminine: die Rechnung."
        },
        {
          sentence: "Könnten Sie mir bitte ___ Dokument unterschreiben?",
          correct: "das",
          options: ["den", "die", "das"],
          explanation: "Nouns ending in -ment are neutral: das Dokument."
        },
        {
          sentence: "___ Sicherheit der Passagiere hat höchste Priorität.",
          correct: "Die",
          options: ["Der", "Die", "Das"],
          explanation: "Nouns ending in -heit are always feminine: die Sicherheit."
        },
        {
          sentence: "Wir genießen ___ Frühling im Stadtpark.",
          correct: "den",
          options: ["den", "die", "das"],
          explanation: "Suffix -ling is masculine (der Frühling). In Akkusativ: den Frühling."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Click-to-Sort",
      title: "Categorize Nouns by Gender",
      description: "Select the correct article for these high-frequency B1 nouns:",
      questions: [
        {
          sentence: "___ Universität in Potsdam hat einen hervorragenden Ruf.",
          correct: "Die",
          options: ["Der", "Die", "Das"],
          explanation: "Ending -tät is always feminine: die Universität."
        },
        {
          sentence: "Das Kind isst gern ___ Brötchen zum Frühstück.",
          correct: "ein",
          options: ["einen", "eine", "ein"],
          explanation: "Diminutive ending -chen is neutral: das Brötchen (ein Brötchen)."
        },
        {
          sentence: "___ Optimismus hilft beim Bestehen der B1-Prüfung.",
          correct: "Der",
          options: ["Der", "Die", "Das"],
          explanation: "Ending -ismus is masculine: der Optimismus."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Article Typing",
      title: "Type the Correct Article (der / die / das)",
      description: "Type the exact definite article into the blank:",
      items: [
        {
          sentenceBefore: "Ich habe gestern",
          blank: "die",
          sentenceAfter: "Wohnung besichtigt.",
          hint: "Endung -ung",
          acceptableAnswers: ["die"],
          explanation: "Wohnung ends in -ung -> die Wohnung."
        },
        {
          sentenceBefore: "Wo befindet sich",
          blank: "das",
          sentenceAfter: "Bürgeramt in dieser Stadt?",
          hint: "Endung -amt (Neutral)",
          acceptableAnswers: ["das"],
          explanation: "das Amt / das Bürgeramt."
        },
        {
          sentenceBefore: "Er repariert",
          blank: "den",
          sentenceAfter: "Motor des Autos.",
          hint: "Endung -or (Maskulin, Akkusativ)",
          acceptableAnswers: ["den", "der"],
          explanation: "der Motor -> Akkusativ: den Motor."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Komposita Rule",
      title: "The Compound Noun Rule (Komposita)",
      description: "In long compound words, the LAST word dictates 100% of the gender and plural!",
      cards: [
        {
          title: "der Tisch + das Tuch",
          de: "das Tischtuch",
          en: "the tablecloth",
          rule: "The last word is 'das Tuch' -> whole compound is DAS Tischtuch!"
        },
        {
          title: "die Sonne + der Schirm",
          de: "der Sonnenschirm",
          en: "the parasol / sun umbrella",
          rule: "The last word is 'der Schirm' -> whole compound is DER Sonnenschirm!"
        },
        {
          title: "das Haus + die Tür",
          de: "die Haustür",
          en: "the front door",
          rule: "The last word is 'die Tür' -> whole compound is DIE Haustür!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welches Genus hat das Wort 'Möglichkeit'?",
          correct: 1,
          options: ["der", "die", "das"],
          explanation: "Wörter auf -keit sind immer feminin (die Möglichkeit)."
        },
        {
          prompt: "Welches Genus hat das Wort 'Instrument'?",
          correct: 2,
          options: ["der", "die", "das"],
          explanation: "Wörter auf -ment sind neutral (das Instrument)."
        },
        {
          prompt: "Welches Wort bestimmt das Genus bei einem zusammengesetzten Nomen (z.B. der Apfelsaft)?",
          correct: 0,
          options: ["Das letzte Wort", "Das erste Wort", "Die Länge des Wortes", "Der Zufall"],
          explanation: "Immer das letzte Wort bestimmt Artikel und Plural (der Saft -> der Apfelsaft)."
        }
      ]
    },
    summary: {
      title: "Genus Mastery Achieved!",
      takeaway: "You now identify German genders systematically using suffixes and compound rules.",
      bulletPoints: [
        "Feminine (-ung, -heit, -keit, -schaft, -tät) accounts for a massive percentage of B1 vocabulary.",
        "Diminutives (-chen, -lein) and foreign loans (-ment, -um) are always neutral (das).",
        "Compound words always inherit the gender of their final noun component."
      ]
    }
  },

  // ── 3. PERSONALPRONOMEN (NOMINATIV & AKKUSATIV) ──
  "a1-pronomen": {
    id: "a1-pronomen",
    level: "A1",
    title: "Personalpronomen (Nominativ & Akkusativ)",
    desc: "Replace subjects and direct objects smoothly (ich/mich, du/dich, er/ihn, es/es, sie/sie).",
    duration: "8 min",
    badge: "Core",
    steps: [
      { title: "1. Subject vs Object Blueprint", type: "intro", subtitle: "Who acts vs Who is affected" },
      { title: "2. Nominativ vs Akkusativ Matrix", type: "table", subtitle: "Full Personal Pronoun Chart" },
      { title: "3. Direct Object Workout", type: "drill1", subtitle: "Akkusativ Pronoun Matching" },
      { title: "4. Noun Replacement Challenge", type: "drill2", subtitle: "Replace Noun Phrases" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Correct Pronoun" },
      { title: "6. The Crucial 'er -> ihn' Shift", type: "nuance", subtitle: "Only Masculine Changes Form!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Pronoun Questions" },
      { title: "8. Pronoun Mastery Summary", type: "summary", subtitle: "Natural Fluid German Speech" }
    ],
    intro: {
      badge: "Step 1: Pronoun Blueprint",
      title: "Replacing Nouns with Pronouns",
      description: "Repeating full nouns sounds robotic. German personal pronouns replace subjects in Nominativ (who is doing the action) and direct objects in Akkusativ (who/what is receiving the action).",
      exampleCard: {
        title: "Example Transformation",
        formula: "Kennst du den Lehrer? -> Ja, ich kenne ihn! (den Lehrer [Akkusativ Maskulin] -> ihn)",
        highlight: "Only masculine changes in Akkusativ: er -> ihn! The others stay similar."
      },
      interactiveItems: [
        { german: "ich -> mich", english: "I -> me", note: "Hörst du mich?" },
        { german: "du -> dich", english: "you -> you", note: "Ich liebe dich." },
        { german: "er -> ihn", english: "he -> him", note: "Ich sehe ihn." },
        { german: "wir -> uns", english: "we -> us", note: "Besuchst du uns?" }
      ]
    },
    table: {
      badge: "Step 2: Master Matrix",
      title: "Personal Pronoun Declension Chart",
      description: "Study how personal pronouns shift between subject (Nominativ) and direct object (Akkusativ):",
      headers: ["Person", "Nominativ (Subject)", "Akkusativ (Direct Object)", "Example Sentence"],
      rows: [
        { col1: "1st Sing.", col2: "ich", col3: "mich", col4: "Der Arzt untersucht mich.", tip: "Direct object 'me'" },
        { col1: "2nd Sing.", col2: "du", col3: "dich", col4: "Ich rufe dich morgen an.", tip: "Direct object 'you'" },
        { col1: "3rd Masc.", col2: "er", col3: "ihn", col4: "Der Kaffee ist heiß. Ich trinke ihn.", tip: "Changes from er to ihn!" },
        { col1: "3rd Fem.", col2: "sie", col3: "sie", col4: "Die Suppe schmeckt gut. Ich esse sie.", tip: "No change: sie stays sie." },
        { col1: "3rd Neut.", col2: "es", col3: "es", col4: "Das Buch ist spannend. Ich lese es.", tip: "No change: es stays es." },
        { col1: "1st Plur.", col2: "wir", col3: "uns", col4: "Der Lehrer korrigiert uns.", tip: "Direct object 'us'" },
        { col1: "2nd Plur.", col2: "ihr", col3: "euch", col4: "Ich lade euch zur Party ein.", tip: "Direct object 'you all'" },
        { col1: "Formal", col2: "Sie", col3: "Sie", col4: "Ich verstehe Sie sehr gut.", tip: "Formal You remains Sie." }
      ],
      goldenTip: "Notice the golden shortcut: In Akkusativ, ONLY the masculine pronoun changes form (er -> ihn). Feminin (sie), Neutral (es), and Formal (Sie) remain identical to Nominativ!"
    },
    drill1: {
      badge: "Step 3: Direct Object Drill",
      title: "Choose the Correct Object Pronoun",
      description: "Pick the correct Akkusativ pronoun to complete the sentence:",
      questions: [
        {
          sentence: "Wo ist mein Schlüssel? Ich suche ___ schon den ganzen Morgen.",
          correct: "ihn",
          options: ["er", "ihn", "ihm", "es"],
          explanation: "'Der Schlüssel' is masculine. In Akkusativ as direct object, it becomes 'ihn'."
        },
        {
          sentence: "Kennst du Maria? Ja, ich habe ___ gestern beim Deutschkurs getroffen.",
          correct: "sie",
          options: ["sie", "ihr", "ihn", "es"],
          explanation: "'Maria' is feminine. Direct object in Akkusativ remains 'sie'."
        },
        {
          sentence: "Können Sie ___ bitte helfen? Ich verstehe die Aufgabe nicht.",
          correct: "mir",
          options: ["mich", "mir", "ich", "ihn"],
          explanation: "The verb 'helfen' strictly triggers Dativ: helfen Sie mir!"
        },
        {
          sentence: "Wir haben ein schönes Auto gesehen und wollen ___ kaufen.",
          correct: "es",
          options: ["ihn", "sie", "es", "ihm"],
          explanation: "'Das Auto' is neutral. Direct object in Akkusativ remains 'es'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Noun Replacement",
      title: "Replace the Noun with the Matching Pronoun",
      description: "Select the pronoun that correctly replaces the bracketed noun phrase:",
      questions: [
        {
          sentence: "Ich lade [meinen Bruder] zum Essen ein. -> Ich lade ___ ein.",
          correct: "ihn",
          options: ["ihn", "ihm", "er", "es"],
          explanation: "'meinen Bruder' is masculine accusative -> 'ihn'."
        },
        {
          sentence: "Wir besuchen [unsere Großeltern] am Sonntag. -> Wir besuchen ___ am Sonntag.",
          correct: "sie",
          options: ["ihnen", "sie", "uns", "ihr"],
          explanation: "'unsere Großeltern' is plural accusative -> 'sie'."
        },
        {
          sentence: "Rufst du [deine Freundin] heute an? -> Rufst du ___ heute an?",
          correct: "sie",
          options: ["sie", "ihr", "ihn", "dich"],
          explanation: "'deine Freundin' is feminine accusative -> 'sie'."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Correct Personal Pronoun",
      description: "Type the missing personal pronoun into the blank:",
      items: [
        {
          sentenceBefore: "Ich sehe den Bus. Ich nehme",
          blank: "ihn",
          sentenceAfter: "jetzt.",
          hint: "der Bus (Akkusativ)",
          acceptableAnswers: ["ihn"],
          explanation: "der Bus -> ihn (masculine accusative)."
        },
        {
          sentenceBefore: "Hörst du",
          blank: "mich",
          sentenceAfter: "? Die Verbindung ist sehr schlecht.",
          hint: "ich (Akkusativ)",
          acceptableAnswers: ["mich"],
          explanation: "Hörst du mich?"
        },
        {
          sentenceBefore: "Wir haben das Formular ausgefüllt und schicken",
          blank: "es",
          sentenceAfter: "an das Bürgeramt.",
          hint: "das Formular (Neutral)",
          acceptableAnswers: ["es"],
          explanation: "das Formular -> es."
        }
      ]
    },
    nuance: {
      badge: "Step 6: The Golden Tip",
      title: "The Masculine Singularity Rule",
      description: "Why beginners struggle with German pronouns and how to bypass it:",
      cards: [
        {
          title: "Only 'er' shifts to 'ihn'",
          de: "der Kaffee -> ich trinke ihn | der Brief -> ich schreibe ihn",
          en: "the coffee -> I drink it | the letter -> I write it",
          rule: "In English, things are 'it'. In German, grammatical gender dictates the pronoun!"
        },
        {
          title: "Feminine & Neuter are immune",
          de: "die Lampe -> ich sehe sie | das Bild -> ich mag es",
          en: "the lamp -> I see it | the picture -> I like it",
          rule: "'die' stays 'sie', and 'das' stays 'es'. Zero mental effort required!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wie lautet das Akkusativ-Pronomen für 'er'?",
          correct: 0,
          options: ["ihn", "ihm", "er", "sein"],
          explanation: "'er' wird im Akkusativ zu 'ihn'."
        },
        {
          prompt: "Ich liebe diese Stadt. Ich finde ___ wunderschön.",
          correct: 1,
          options: ["ihn", "sie", "es", "ihr"],
          explanation: "'die Stadt' ist feminin -> Akkusativ-Pronomen ist 'sie'."
        },
        {
          prompt: "Besucht ihr uns morgen? -> Ja, wir besuchen ___ um 15 Uhr.",
          correct: 2,
          options: ["uns", "Sie", "euch", "ihr"],
          explanation: "Gegenfrage von 'ihr uns': 'wir euch' (we visit you all)."
        }
      ]
    },
    summary: {
      title: "Personal Pronoun Mastery Achieved!",
      takeaway: "You can now refer to people and objects smoothly in German without awkward repetitions.",
      bulletPoints: [
        "In Akkusativ, only masculine changes (er -> ihn). Feminine and neuter remain identical to Nominativ.",
        "German pronouns match grammatical gender, not biological gender of objects.",
        "Using pronouns naturally is a major scoring criterion in B1 speaking and writing."
      ]
    }
  },

  // ── 4. REFLEXIVE VERBEN (A2 / B1 CORE) ──
  "a2-reflexiv": {
    id: "a2-reflexiv",
    level: "A2",
    title: "Reflexive Verben (sich freuen, sich interessieren...)",
    desc: "Master reflexive pronouns in Akkusativ and Dativ plus essential B1 preposition combinations.",
    duration: "12 min",
    badge: "High Yield B1",
    steps: [
      { title: "1. The Reflexive Blueprint", type: "intro", subtitle: "Subject Acts on Itself" },
      { title: "2. Reflexive Pronoun Matrix", type: "table", subtitle: "Akkusativ vs Dativ Pronouns" },
      { title: "3. Akkusativ vs Dativ Distinction", type: "drill1", subtitle: "mich vs mir Workout" },
      { title: "4. Reflexive Verbs with Prepositions", type: "drill2", subtitle: "sich freuen auf/über, etc." },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Reflexive Pronoun" },
      { title: "6. Daily Routine Verbs", type: "nuance", subtitle: "sich anziehen, sich waschen" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Reflexive Challenges" },
      { title: "8. Reflexive Mastery Summary", type: "summary", subtitle: "B1 Letter & Speech Fluency" }
    ],
    intro: {
      badge: "Step 1: Reflexive Blueprint",
      title: "What are Reflexive Verbs?",
      description: "In a reflexive verb, the subject performs an action on itself. The verb is accompanied by a reflexive pronoun (mich, dich, sich, uns, euch, sich).",
      exampleCard: {
        title: "The Formula",
        formula: "Subjekt + konjugiertes Verb + Reflexivpronomen (+ Präpositionalobjekt)\nIch freue mich auf die Reise. (I look forward to the trip)",
        highlight: "3rd person singular and plural (er/sie/es/sie/Sie) ALWAYS uses 'sich'!"
      },
      interactiveItems: [
        { german: "sich freuen auf", english: "to look forward to (future)", note: "Ich freue mich auf das Wochenende." },
        { german: "sich freuen über", english: "to be happy about (present/past)", note: "Ich freue mich über das Geschenk." },
        { german: "sich interessieren für", english: "to be interested in", note: "Ich interessiere mich für Kultur." },
        { german: "sich bewerben um", english: "to apply for (job)", note: "Ich bewerbe mich um die Stelle." }
      ]
    },
    table: {
      badge: "Step 2: Pronoun Chart",
      title: "Reflexive Pronouns: Akkusativ vs Dativ",
      description: "90% of reflexive verbs take Akkusativ. Dativ is used ONLY when an additional direct object is present:",
      headers: ["Pronoun", "Akkusativ (Standard)", "Dativ (When object present)", "Example"],
      rows: [
        { col1: "ich", col2: "mich", col3: "mir", col4: "Ich wasche mich. vs Ich wasche mir die Hände.", tip: "'die Hände' is the direct object, so pronoun shifts to 'mir'!" },
        { col1: "du", col2: "dich", col3: "dir", col4: "Du ziehst dich an. vs Du putzt dir die Zähne.", tip: "'die Zähne' is the direct object, so pronoun is 'dir'!" },
        { col1: "er / sie / es", col2: "sich", col3: "sich", col4: "Er freut sich. / Er merkt sich das.", tip: "Always 'sich' in both cases!" },
        { col1: "wir", col2: "uns", col3: "uns", col4: "Wir treffen uns um 18 Uhr.", tip: "Identical in both cases." },
        { col1: "ihr", col2: "euch", col3: "euch", col4: "Ruht euch gut aus!", tip: "Identical in both cases." },
        { col1: "sie / Sie", col2: "sich", col3: "sich", col4: "Freuen Sie sich auf den Kurs?", tip: "Always 'sich' in both cases!" }
      ],
      goldenTip: "Crucial B1 Rule: 'er', 'sie', 'es', 'sie' (plural) and formal 'Sie' ALL share the exact same reflexive pronoun: 'SICH'!"
    },
    drill1: {
      badge: "Step 3: Reflexive Pronoun Drill",
      title: "Pick the Right Reflexive Pronoun",
      description: "Choose the correct reflexive pronoun to complete the sentence:",
      questions: [
        {
          sentence: "Ich freue ___ sehr über Ihre Einladung.",
          correct: "mich",
          options: ["mich", "mir", "sich", "dich"],
          explanation: "'sich freuen über' takes Akkusativ: ich freue mich."
        },
        {
          sentence: "Herr Müller bewirbt ___ um die offene Stelle als Buchhalter.",
          correct: "sich",
          options: ["ihn", "ihm", "sich", "mich"],
          explanation: "3rd person singular 'Herr Müller' always takes 'sich'."
        },
        {
          sentence: "Wir treffen ___ morgen um 15 Uhr vor dem Café.",
          correct: "uns",
          options: ["uns", "euch", "sich", "wir"],
          explanation: "'wir' takes reflexive pronoun 'uns'."
        },
        {
          sentence: "Interessierst du ___ für moderne Kunst?",
          correct: "dich",
          options: ["dich", "dir", "sich", "du"],
          explanation: "'du' with 'sich interessieren für' takes Akkusativ 'dich'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Preposition Combinations",
      title: "Match the Preposition to the Reflexive Verb",
      description: "In B1 exams, examiners specifically test if you know which preposition belongs to which verb:",
      questions: [
        {
          sentence: "Ich bewerbe mich ___ die Stelle als Softwareentwickler.",
          correct: "um",
          options: ["um", "für", "auf", "an"],
          explanation: "'sich bewerben' always pairs with 'um' + Akkusativ."
        },
        {
          sentence: "Wir freuen uns schon sehr ___ den gemeinsamen Ausflug am Samstag.",
          correct: "auf",
          options: ["auf", "über", "an", "für"],
          explanation: "Looking forward to a FUTURE event is always 'sich freuen auf'!"
        },
        {
          sentence: "Er ärgert sich oft ___ den lauten Verkehr vor seiner Wohnung.",
          correct: "über",
          options: ["über", "für", "auf", "mit"],
          explanation: "'sich ärgern' always pairs with 'über' + Akkusativ."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Correct Reflexive Pronoun",
      description: "Type the missing reflexive pronoun into the sentence:",
      items: [
        {
          sentenceBefore: "Ich bedanke",
          blank: "mich",
          sentenceAfter: "herzlich für Ihre Unterstützung.",
          hint: "sich bedanken (ich)",
          acceptableAnswers: ["mich"],
          explanation: "Ich bedanke mich (standard B1 polite letter closing)."
        },
        {
          sentenceBefore: "Die Teilnehmer bereiten",
          blank: "sich",
          sentenceAfter: "auf die B1-Prüfung vor.",
          hint: "sich vorbereiten (sie Plural)",
          acceptableAnswers: ["sich"],
          explanation: "Die Teilnehmer (Plural) -> sich."
        },
        {
          sentenceBefore: "Ich muss",
          blank: "mir",
          sentenceAfter: "noch die Hände waschen.",
          hint: "die Hände is direct object -> Dativ",
          acceptableAnswers: ["mir"],
          explanation: "When body parts are mentioned as direct objects, the pronoun shifts to Dativ 'mir'!"
        }
      ]
    },
    nuance: {
      badge: "Step 6: Exam Trap Alert",
      title: "sich freuen AUF vs sich freuen ÜBER",
      description: "This is one of the most frequent traps in the telc, Goethe, and DTZ exams:",
      cards: [
        {
          title: "sich freuen AUF (Future)",
          de: "Ich freue mich AUF meinen Urlaub nächste Woche.",
          en: "I look forward to my vacation next week.",
          rule: "Used exclusively for events in the FUTURE that have not happened yet."
        },
        {
          title: "sich freuen ÜBER (Present / Past)",
          de: "Ich freue mich ÜBER deine nette Nachricht von gestern.",
          en: "I am happy about your kind message from yesterday.",
          rule: "Used for something that has ALREADY occurred or is happening right now."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welches Reflexivpronomen gehört zu 'sie' (Plural)?",
          correct: 2,
          options: ["sie", "ihnen", "sich", "uns"],
          explanation: "Für die 3. Person (er, sie, es, sie Plural) ist das Reflexivpronomen immer 'sich'."
        },
        {
          prompt: "Ich wasche ___ jeden Morgen die Haare.",
          correct: 1,
          options: ["mich", "mir", "sich", "meine"],
          explanation: "Da 'die Haare' das Akkusativ-Objekt ist, steht das Reflexivpronomen im Dativ: 'mir'."
        },
        {
          prompt: "Er interessiert sich sehr ___ deutsche Geschichte.",
          correct: 0,
          options: ["für", "über", "an", "auf"],
          explanation: "'sich interessieren' verlangt immer die Präposition 'für' + Akkusativ."
        }
      ]
    },
    summary: {
      title: "Reflexive Verbs Mastery Achieved!",
      takeaway: "You have mastered reflexive verbs, pronoun cases, and essential B1 prepositions.",
      bulletPoints: [
        "3rd person (er/sie/es/sie/Sie) ALWAYS takes 'sich'.",
        "Distinguish 'sich freuen auf' (future anticipation) from 'sich freuen über' (present gratitude).",
        "Reflexive verbs are essential for polite B1 letter formulas ('Ich bedanke mich im Voraus')."
      ]
    }
  },

  // ── 5. DATIV PRÄPOSITIONEN (AUS, BEI, MIT, NACH...) ──
  "a2-dativ": {
    id: "a2-dativ",
    level: "A2",
    title: "Dativ Präpositionen (aus, bei, mit, nach...)",
    desc: "The 7 prepositions that always trigger the dative case (dem, der, dem, den + n).",
    duration: "14 min",
    badge: "Pass Guarantee",
    steps: [
      { title: "1. The 7 Dative Kings", type: "intro", subtitle: "aus, bei, mit, nach, seit, von, zu" },
      { title: "2. Dative Article Master Chart", type: "table", subtitle: "dem, der, dem, den + n" },
      { title: "3. Dative Declension Drill", type: "drill1", subtitle: "Article Declension Workout" },
      { title: "4. Preposition Meaning Match", type: "drill2", subtitle: "Contextual Choice Practice" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Dative Article" },
      { title: "6. The Tricky 'seit' & Plural -n", type: "nuance", subtitle: "B1 Exam Traps" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Dative Questions" },
      { title: "8. Dative Mastery Summary", type: "summary", subtitle: "Zero Dative Mistakes" }
    ],
    intro: {
      badge: "Step 1: Dative Blueprint",
      title: "The 7 Prepositions That ALWAYS Trigger Dativ",
      description: "In German, prepositions rule grammar. Memorize this musical rhyme: 'Aus, bei, mit, nach, seit, von, zu verlangen immer Dativ, das weißt du!'. No matter what, these 7 words force the dative case.",
      exampleCard: {
        title: "The Golden Dative Rhyme",
        formula: "aus | bei | mit | nach | seit | von | zu -> ALWAYS DATIV!\nIch fahre mit DEM Bus (der Bus -> dem Bus).",
        highlight: "Never use Akkusativ after these 7 prepositions!"
      },
      interactiveItems: [
        { german: "mit + Dativ", english: "with / by (vehicle)", note: "Ich fahre mit dem Zug." },
        { german: "bei + Dativ", english: "at / near / at someone's place", note: "Ich wohne bei meiner Tante." },
        { german: "nach + Dativ", english: "to (cities/countries) / after", note: "Nach dem Deutschkurs gehe ich einkaufen." },
        { german: "seit + Dativ", english: "since / for (duration)", note: "Seit drei Monaten wohne ich in Berlin." }
      ]
    },
    table: {
      badge: "Step 2: Dative Matrix",
      title: "Dative Article Declension Master Table",
      description: "How articles change after dative prepositions:",
      headers: ["Gender", "Nominativ", "Dativ Definite", "Dativ Indefinite", "Example with 'mit'"],
      rows: [
        { col1: "Maskulin", col2: "der Mann", col3: "dem", col4: "einem", col5: "mit dem / einem Mann" },
        { col1: "Feminin", col2: "die Frau", col3: "der", col4: "einer", col5: "mit der / einer Frau" },
        { col1: "Neutral", col2: "das Kind", col3: "dem", col4: "einem", col5: "mit dem / einem Kind" },
        { col1: "Plural", col2: "die Kinder", col3: "den (+ n)", col4: "meinen (+ n)", col5: "mit den Kindern" }
      ],
      goldenTip: "Notice the Plural rule: Dative plural takes 'DEN' and adds an '-n' to the end of the noun (mit den Freunden, mit den Kindern)!"
    },
    drill1: {
      badge: "Step 3: Dative Declension Drill",
      title: "Select the Correct Dative Form",
      description: "Identify the gender and choose the correct dative article:",
      questions: [
        {
          sentence: "Ich fahre jeden Tag mit ___ U-Bahn zur Arbeit.",
          correct: "der",
          options: ["die", "der", "dem", "den"],
          explanation: "'die U-Bahn' is feminine. After 'mit' (Dativ) it becomes 'der U-Bahn'."
        },
        {
          sentence: "Er wohnt seit ___ Jahr in Deutschland.",
          correct: "einem",
          options: ["ein", "einen", "einem", "einer"],
          explanation: "'das Jahr' is neutral. After 'seit' (Dativ) it becomes 'einem Jahr'."
        },
        {
          sentence: "Wir treffen uns nach ___ Unterricht vor der Bibliothek.",
          correct: "dem",
          options: ["der", "den", "dem", "das"],
          explanation: "'der Unterricht' is masculine. After 'nach' (Dativ) it becomes 'dem Unterricht'."
        },
        {
          sentence: "Sie spricht oft mit ihren ___ über ihre Zukunftspläne.",
          correct: "Freunden",
          options: ["Freunde", "Freunden", "Freund", "Freunds"],
          explanation: "Dativ Plural adds '-n' to the noun: mit ihren Freunden."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Preposition Context Drill",
      title: "Choose the Fitting Dative Preposition",
      description: "Pick the preposition that makes semantic sense in the B1 situation:",
      questions: [
        {
          sentence: "___ zwei Jahren lerne ich intensiv Deutsch.",
          correct: "Seit",
          options: ["Seit", "Nach", "Von", "Aus"],
          explanation: "'Seit' expresses an action that began in the past and still continues into the present."
        },
        {
          sentence: "Ich komme gerade ___ Arzt und habe ein Rezept bekommen.",
          correct: "vom",
          options: ["vom", "nach", "aus", "mit"],
          explanation: "'vom' (von dem) expresses coming from a professional or person: vom Arzt."
        },
        {
          sentence: "Morgen fahre ich ___ meinen Eltern nach Hamburg.",
          correct: "zu",
          options: ["zu", "nach", "bei", "in"],
          explanation: "Traveling to people uses 'zu' + Dativ: zu meinen Eltern."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Correct Dative Article",
      description: "Type the correct dative article into the blank:",
      items: [
        {
          sentenceBefore: "Ich spreche mit",
          blank: "dem",
          sentenceAfter: "Arzt über meine Rückenschmerzen.",
          hint: "der Arzt (Maskulin Dativ)",
          acceptableAnswers: ["dem"],
          explanation: "der Arzt -> mit dem Arzt."
        },
        {
          sentenceBefore: "Sie wohnt bei",
          blank: "einer",
          sentenceAfter: "freundlichen Familie.",
          hint: "die Familie (Feminin Dativ)",
          acceptableAnswers: ["einer"],
          explanation: "die Familie -> bei einer Familie."
        },
        {
          sentenceBefore: "Seit",
          blank: "drei",
          sentenceAfter: "Monaten arbeite ich in diesem Büro.",
          hint: "Zahlwort",
          acceptableAnswers: ["drei"],
          explanation: "Seit drei Monaten."
        }
      ]
    },
    nuance: {
      badge: "Step 6: B1 Exam Traps",
      title: "Common Dative Pitfalls to Avoid",
      description: "Keep these two high-stakes rules in mind during the writing and speaking exams:",
      cards: [
        {
          title: "Preposition Contractions",
          de: "bei + dem = beim | von + dem = vom | zu + dem = zum | zu + der = zur",
          en: "at the / from the / to the",
          rule: "Always use contractions in spoken and written German: 'beim Arzt', 'zur Arbeit'."
        },
        {
          title: "The Plural -n Trap",
          de: "die Kinder -> mit den Kindern | die Monate -> seit drei Monaten",
          en: "with the children | for three months",
          rule: "Don't forget the extra -n on the noun in Dativ Plural (except if noun ends in -s or -n already)."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welche Präposition gehört NICHT zu den reinen Dativ-Präpositionen?",
          correct: 2,
          options: ["mit", "bei", "für", "nach"],
          explanation: "'für' verlangt immer den Akkusativ (für + Akkusativ)."
        },
        {
          prompt: "Er geht jeden Morgen zu Fuß ___ Arbeit.",
          correct: 1,
          options: ["zum", "zur", "nach", "bei"],
          explanation: "zu + der (die Arbeit) = zur Arbeit."
        },
        {
          prompt: "Ich lebe seit ___ Woche in dieser schönen Stadt.",
          correct: 0,
          options: ["einer", "eine", "einem", "einen"],
          explanation: "'die Woche' ist feminin. Nach 'seit' (Dativ): seit einer Woche."
        }
      ]
    },
    summary: {
      title: "Dative Prepositions Mastery Achieved!",
      takeaway: "You have mastered the 7 kings of Dative and plural noun declension.",
      bulletPoints: [
        "Aus, bei, mit, nach, seit, von, zu ALWAYS demand the dative case.",
        "Articles shift: der -> dem, die -> der, das -> dem, die (Pl.) -> den (+ n).",
        "Mastering contractions (beim, vom, zum, zur) gives your German an authentic natural flow."
      ]
    }
  },

  // ── 5b. PARTIZIP II & PERFEKT (DAS VERGANGENHEITS-GEHEIMNIS) ──
  "a2-partizip2": {
    id: "a2-partizip2",
    level: "A2",
    title: "Partizip II & Perfekt (Vergangenheits-Meister)",
    desc: "Master the 5 golden Partizip II rules (ge- + t, -ieren, separable, inseparable, irregular) and haben vs. sein.",
    duration: "14 min",
    badge: "High Yield",
    steps: [
      { title: "1. The Perfekt Blueprint", type: "intro", subtitle: "haben / sein (Pos 2) + Partizip II (Satzende)" },
      { title: "2. The 5 Formation Families", type: "table", subtitle: "Golden Reference Matrix" },
      { title: "3. Quick Partizip Recall", type: "drill1", subtitle: "Interactive Form Builder" },
      { title: "4. Haben vs. Sein Compass", type: "drill2", subtitle: "Movement, Change of State, or Stationary?" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Participle or Full Sentence" },
      { title: "6. The 3 Forbidden Traps", type: "nuance", subtitle: "No ge- with -ieren & inseparable prefixes!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast DTZ & B1 Exam Questions" },
      { title: "8. Partizip II Mastery Summary", type: "summary", subtitle: "Zero Past Tense Deductions" }
    ],
    intro: {
      badge: "Step 1: Perfekt Blueprint",
      title: "How Partizip II and Perfekt Work in German",
      description: "In spoken German and everyday emails, past events are expressed in Perfekt. The golden sentence bracket formula: The auxiliary verb ('haben' or 'sein') sits conjugated in Position 2, while the Partizip II is kicked to the absolute end of the sentence!",
      exampleCard: {
        title: "The Perfekt Sentence Bracket (Satzklammer)",
        formula: "[Subjekt] + [haben / sein (Pos 2 konjugiert)] + [Angaben...] + [Partizip II (SATZENDE)]",
        highlight: "Example: 'Ich HABE gestern meine Hausaufgaben GEMACHT.' | 'Wir SIND nach Berlin GEFAHREN.'"
      },
      interactiveItems: [
        { german: "Ich habe Deutsch gelernt.", english: "I learned German.", note: "ge-lern-t (regular)" },
        { german: "Er hat in München studiert.", english: "He studied in Munich.", note: "-ieren verbs: NEVER ge-!" },
        { german: "Wir sind um 7 Uhr aufgestanden.", english: "We got up at 7 AM.", note: "auf-ge-standen (separable + sein)" },
        { german: "Sie hat die Rechnung bezahlt.", english: "She paid the bill.", note: "be-zahlt (inseparable prefix: NO ge-)" },
        { german: "Ich bin nach Hause gefahren.", english: "I drove home.", note: "ge-fahr-en (motion -> sein)" }
      ]
    },
    table: {
      badge: "Reference Matrix: The 5 Partizip II Rules",
      title: "The 5 Golden Rules for Forming Partizip II",
      description: "Every German verb belongs to one of these 5 families. Learn the pattern once, and you can form any participle effortlessly:",
      headers: ["Family", "Pattern", "Infinitiv", "Partizip II", "Hilfsverb", "Exam Rule"],
      rows: [
        { col1: "1. Regular (Schwach)", col2: "ge- + Stamm + -t", col3: "lernen / machen", col4: "gelernt / gemacht", col5: "haben", tip: "80% of all German verbs" },
        { col1: "2. Verbs with -ieren", col2: "Stamm + -t (NO ge-!)", col3: "studieren / reparieren", col4: "studiert / repariert", col5: "haben", tip: "-ieren verbs drop ge- completely" },
        { col1: "3. Separable Verbs", col2: "Präfix + -ge- + Stamm + -t/-en", col3: "einkaufen / anrufen", col4: "eingekauft / angerufen", col5: "haben", tip: "-ge- slips between prefix and stem" },
        { col1: "4. Inseparable (be-, ver-, er-)", col2: "Präfix + Stamm + -t/-en (NO ge-!)", col3: "bezahlen / verstehen", col4: "bezahlt / verstanden", col5: "haben", tip: "be-, ver-, er-, ent-, ge-, zer- never take ge-" },
        { col1: "5. Irregular / Motion", col2: "ge- + Stammwechsel + -en", col3: "gehen / fahren / fliegen", col4: "gegangen / gefahren / geflogen", col5: "sein", tip: "Movement or change of state takes 'sein'" }
      ],
      goldenTip: "Haben vs. Sein Rule: Verbs of movement (gehen, fahren, fliegen, laufen, kommen) and change of state (aufstehen, einschlafen, sterben) take 'sein'. Stationary verbs take 'haben'. Exception: 'bleiben' (to stay) and 'sein' (to be) always take 'sein'!"
    },
    drill1: {
      badge: "Drill 1: Form the Partizip II",
      title: "Interactive Partizip II Form Practice",
      description: "Pick the correct participle form for the given context:",
      questions: [
        {
          sentence: "Gestern habe ich meine Hausaufgaben sorgfältig ___ (machen).",
          correct: "gemacht",
          options: ["gemacht", "gemachen", "gemachten", "gemachte"],
          explanation: "Regular verb 'machen': ge- + mach + -t = gemacht."
        },
        {
          sentence: "Mein Bruder hat fünf Jahre in München Medizin ___ (studieren).",
          correct: "studiert",
          options: ["studiert", "gestudiert", "gestudierte", "studierte"],
          explanation: "Verbs ending in -ieren NEVER take 'ge-': studiert (not gestudiert!)."
        },
        {
          sentence: "Wir haben am Samstag im Supermarkt viel Obst ___ (einkaufen).",
          correct: "eingekauft",
          options: ["eingekauft", "geeinkauft", "eingekaufen", "einkauft"],
          explanation: "Separable verb 'einkaufen': the -ge- goes between prefix and stem: ein-ge-kauf-t."
        },
        {
          sentence: "Ich habe Ihre wichtige E-Mail leider erst heute ___ (verstehen).",
          correct: "verstanden",
          options: ["verstanden", "geverstanden", "versteht", "geversteht"],
          explanation: "Inseparable prefix 'ver-': NO 'ge-'! The irregular participle is verstanden."
        }
      ]
    },
    drill2: {
      badge: "Drill 2: Haben vs. Sein Compass",
      title: "Pick the Correct Auxiliary Verb (haben oder sein)",
      description: "Choose the conjugated auxiliary verb for Position 2 in the Perfekt sentence:",
      questions: [
        {
          sentence: "Ich ___ gestern mit dem Zug nach Berlin gefahren.",
          correct: "bin",
          options: ["bin", "habe", "bist", "hat"],
          explanation: "'fahren' is a verb of movement from A to B: requires 'sein' (ich bin gefahren)."
        },
        {
          sentence: "Wir ___ gestern Abend eine leckere Pizza gegessen.",
          correct: "haben",
          options: ["haben", "sind", "habt", "seid"],
          explanation: "'essen' is an action with a direct object (Pizza): requires 'haben' (wir haben gegessen)."
        },
        {
          sentence: "Wann ___ du heute Morgen aufgestanden?",
          correct: "bist",
          options: ["bist", "hast", "bist du", "hat"],
          explanation: "'aufstehen' is a change of physical state (from sleeping to awake): requires 'sein' (du bist aufgestanden)."
        },
        {
          sentence: "Meine Eltern ___ das ganze Wochenende zu Hause geblieben.",
          correct: "sind",
          options: ["sind", "haben", "waren", "seid"],
          explanation: "'bleiben' (to stay) is a famous exception: even though stationary, it ALWAYS takes 'sein'!"
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Sentence Workout",
      title: "Active Sentence Typing: Complete the Partizip II",
      description: "Type the missing Partizip II or type the full completed sentence. Both are accepted!",
      items: [
        {
          sentenceBefore: "Ich habe gestern den ganzen Tag für die Prüfung",
          blank: "gelernt",
          sentenceAfter: ".",
          hint: "Regular verb: ge- + lern + -t",
          acceptableAnswers: ["gelernt", "ge-lernt"],
          explanation: "Regelmäßiges Verb 'lernen' bildet das Partizip II mit ge- + Stamm + -t: gelernt."
        },
        {
          sentenceBefore: "Der Handwerker hat unsere Heizung gestern erfolgreich",
          blank: "repariert",
          sentenceAfter: ".",
          hint: "Verbs ending in -ieren take NO ge-! Stamm + -t",
          acceptableAnswers: ["repariert", "reparieren"],
          explanation: "Verben auf -ieren bilden das Partizip II OHNE ge-: repariert (niemals gerepariert!)."
        },
        {
          sentenceBefore: "Meine Kollegin hat mich gestern Abend noch kurz",
          blank: "angerufen",
          sentenceAfter: ".",
          hint: "Separable verb: an + ge + rufen",
          acceptableAnswers: ["angerufen", "an-ge-rufen"],
          explanation: "Trennbares Verb 'anrufen': Das -ge- schlüpft in die Mitte zwischen Präfix und Stamm: angerufen."
        },
        {
          sentenceBefore: "Ich habe die Monatsmiete bereits per Banküberweisung",
          blank: "bezahlt",
          sentenceAfter: ".",
          hint: "Inseparable prefix 'be-': takes NO ge-!",
          acceptableAnswers: ["bezahlt", "be-zahlt"],
          explanation: "Nicht-trennbares Präfix 'be-': Kein ge-! Partizip II lautet 'bezahlt' (nicht gebezahlt!)."
        },
        {
          sentenceBefore: "Letzten Sommer sind wir mit dem Flugzeug nach Spanien",
          blank: "geflogen",
          sentenceAfter: ".",
          hint: "Movement verb 'fliegen' + sein (Stammvokal ie -> o)",
          acceptableAnswers: ["geflogen", "ge-flogen"],
          explanation: "'fliegen' ist ein Bewegungsverb (sein) mit starkem Vokalwechsel: geflogen."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Nuances",
      title: "The 4 Classic Partizip II Traps in B1 Exams",
      description: "Examiners watch specifically for these 4 common mistakes in the writing and speaking tests:",
      cards: [
        {
          title: "The -ieren Trap (NO ge-!)",
          de: "Ich habe einen Tisch reserviert.",
          en: "I reserved a table.",
          rule: "Verbs ending in -ieren (studieren, reparieren, reservieren, telefonieren) NEVER take 'ge-'. Saying 'gereserviert' is an immediate deduction!"
        },
        {
          title: "Inseparable Prefixes (NO ge-!)",
          de: "Ich habe Ihre Erklärung verstanden.",
          en: "I understood your explanation.",
          rule: "Verbs starting with be-, ver-, er-, ent-, ge-, zer-, miss- never take 'ge-': bezahlt, verstanden, erklärt, entlassen."
        },
        {
          title: "The 'bleiben' & 'sein' Exception",
          de: "Ich bin gestern zu Hause geblieben.",
          en: "I stayed at home yesterday.",
          rule: "Even though 'bleiben' does not express movement, it always takes the auxiliary verb 'sein': 'Ich bin geblieben' (never 'habe geblieben')."
        },
        {
          title: "Sentence Bracket (Partizip at the End)",
          de: "Ich habe gestern nach der Arbeit meine Mutter angerufen.",
          en: "I called my mother yesterday after work.",
          rule: "The Partizip II must always stand at the absolute end of the main clause, after time, manner, place, and objects."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Exam Quiz",
      title: "3 Fast Partizip II Exam Questions",
      questions: [
        {
          prompt: "Welches Partizip II ist für das Verb 'studieren' korrekt?",
          correct: 1,
          options: ["gestudiert", "studiert", "gestudierte", "studierte"],
          explanation: "Verben auf -ieren bilden das Partizip II immer OHNE ge-: studiert."
        },
        {
          prompt: "Welcher Satz verwendet das grammatikalisch richtige Hilfsverb?",
          correct: 1,
          options: [
            "Ich habe gestern nach Hause gegangen.",
            "Ich bin gestern nach Hause gegangen.",
            "Ich habe gestern nach Hause gegangen bin.",
            "Ich bin gestern nach Hause gegangt."
          ],
          explanation: "'gehen' ist ein Bewegungsverb von Ort A nach Ort B und verlangt zwingend 'sein': 'Ich bin gegangen'."
        },
        {
          prompt: "Wie lautet das korrekte Partizip II für das trennbare Verb 'aufstehen'?",
          correct: 1,
          options: ["geaufstanden", "aufgestanden", "aufgesteht", "aufstanden"],
          explanation: "Bei trennbaren Verben schlüpft das -ge- zwischen Präfix und Stamm: auf-ge-standen."
        }
      ]
    },
    summary: {
      title: "Perfekt & Partizip II Mastery Achieved!",
      badge: "Past Tense Certified",
      takeaway: "You have mastered the 5 Partizip II families, the haben vs. sein compass, and the sentence bracket rule.",
      bulletPoints: [
        "Regular verbs take ge- + Stamm + -t (gelernt, gemacht, gewohnt).",
        "-ieren verbs and inseparable prefixes (be-, ver-, er-) NEVER take 'ge-'.",
        "Separable verbs place -ge- in the middle (ein-ge-kauft, an-ge-rufen).",
        "Movement and change of state verbs take 'sein' (gefahren, aufgestanden, geblieben).",
        "The Partizip II sits at the absolute end of the clause."
      ],
      points: [
        "Regular verbs take ge- + Stamm + -t (gelernt, gemacht, gewohnt).",
        "-ieren verbs and inseparable prefixes (be-, ver-, er-) NEVER take 'ge-'.",
        "Separable verbs place -ge- in the middle (ein-ge-kauft, an-ge-rufen).",
        "Movement and change of state verbs take 'sein' (gefahren, aufgestanden, geblieben).",
        "The Partizip II sits at the absolute end of the clause."
      ],
      nextRecommendation: "Practice connecting your past sentences with Nebensätze (weil ich Deutsch gelernt habe...) in the Nebensätze Lesson."
    }
  },

  // ── 6. NEBENSÄTZE MIT WEIL, DASS, OBWOHL ──
  "b1-nebensaetze": {
    id: "b1-nebensaetze",
    level: "B1",
    title: "Nebensätze mit weil, dass, obwohl",
    desc: "The B1 Verb Kicker rule: why the conjugated verb always flies to the absolute end.",
    duration: "15 min",
    badge: "B1 Mandatory",
    steps: [
      { title: "1. The Verb-Kicker Blueprint", type: "intro", subtitle: "Conjugated Verb Flies to End" },
      { title: "2. The 5 Big B1 Subordinators", type: "table", subtitle: "weil, dass, obwohl, wenn, da" },
      { title: "3. Verb Position Workout", type: "drill1", subtitle: "Spot the Conjugated Verb" },
      { title: "4. Two Verbs in Subclause (Modal)", type: "drill2", subtitle: "Infinitive + Modal at End" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Correct Connector" },
      { title: "6. The Verb-Verb Sandwich", type: "nuance", subtitle: "When Nebensatz Leads!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Word Order Questions" },
      { title: "8. Subclause Mastery Summary", type: "summary", subtitle: "Guaranteed B1 Sentence Structure" }
    ],
    intro: {
      badge: "Step 1: Verb-Kicker Blueprint",
      title: "The Golden B1 Word Order Rule",
      description: "Subordinating connectors (weil, dass, obwohl, wenn, ob, als) are 'puppet masters'. Whenever they open a clause, they kick the conjugated verb to the absolute final position, right before the period or comma.",
      exampleCard: {
        title: "The Verb-Kicker Formula",
        formula: "Hauptsatz, [Konnektor + Subjekt + ... + konjugiertes VERB am Ende]\nIch lerne Deutsch, weil ich in Berlin arbeiten MÖCHTE.",
        highlight: "The verb is NOT in Position 2 anymore: it is at the very END!"
      },
      interactiveItems: [
        { german: "weil", english: "because (reason)", note: "..., weil ich krank bin." },
        { german: "dass", english: "that (statement/fact)", note: "Ich hoffe, dass du kommst." },
        { german: "obwohl", english: "although (contrast)", note: "..., obwohl es regnet." },
        { german: "wenn", english: "if / when (condition)", note: "..., wenn ich Zeit habe." }
      ]
    },
    table: {
      badge: "Step 2: Subordinator Chart",
      title: "The 5 Big B1 Subordinating Connectors",
      description: "These connectors are mandatory for reaching the B1 benchmark in writing and speaking:",
      headers: ["Connector", "Meaning", "Example Sentence", "Verb at End"],
      rows: [
        { col1: "weil", col2: "because", col3: "Ich bleibe zu Hause, weil ich krank bin.", col4: "bin" },
        { col1: "dass", col2: "that", col3: "Ich weiß, dass Sie viel Erfahrung haben.", col4: "haben" },
        { col1: "obwohl", col2: "although", col3: "Er kam pünktlich, obwohl der Zug Verspätung hatte.", col4: "hatte" },
        { col1: "wenn", col2: "if / whenever", col3: "Ich rufe dich an, wenn ich Feierabend mache.", col4: "mache" },
        { col1: "ob", col2: "whether / if", col3: "Könnten Sie mir sagen, ob der Termin stattfindet?", col4: "stattfindet" }
      ],
      goldenTip: "Never put the verb in Position 2 after 'weil'! Saying 'weil ich bin krank' is an instant grade deduction in B1 exams."
    },
    drill1: {
      badge: "Step 3: Verb Position Drill",
      title: "Identify the Correctly Structured Sentence",
      description: "Which sentence places the conjugated verb correctly at the absolute end?",
      questions: [
        {
          sentence: "Welcher Satz mit 'weil' ist grammatikalisch korrekt?",
          correct: "Ich kann nicht kommen, weil ich hohes Fieber habe.",
          options: [
            "Ich kann nicht kommen, weil ich hohes Fieber habe.",
            "Ich kann nicht kommen, weil ich habe hohes Fieber.",
            "Ich kann nicht kommen, weil habe ich hohes Fieber."
          ],
          explanation: "In a 'weil' clause, conjugated verb 'habe' must be placed at the very end."
        },
        {
          sentence: "Welcher Satz mit 'dass' ist richtig?",
          correct: "Es freut mich sehr, dass Sie mich zum Vorstellungsgespräch einladen.",
          options: [
            "Es freut mich sehr, dass Sie mich zum Vorstellungsgespräch einladen.",
            "Es freut mich sehr, dass Sie laden mich zum Vorstellungsgespräch ein.",
            "Es freut mich sehr, dass einladen Sie mich zum Vorstellungsgespräch."
          ],
          explanation: "Separable verbs join back together at the end of a subordinate clause: einladen!"
        },
        {
          sentence: "Welcher Satz mit 'obwohl' ist korrekt?",
          correct: "Er geht zur Arbeit, obwohl er sich noch müde fühlt.",
          options: [
            "Er geht zur Arbeit, obwohl er sich noch müde fühlt.",
            "Er geht zur Arbeit, obwohl er fühlt sich noch müde.",
            "Er geht zur Arbeit, obwohl fühlt er sich noch müde."
          ],
          explanation: "'fühlt' stands at the end of the clause."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Two Verbs in Subclause",
      title: "Modal Verb + Infinitive in Subclause",
      description: "When a subordinate clause contains a modal verb, the infinitive stands FIRST, and the conjugated modal stands at the ABSOLUTE END:",
      questions: [
        {
          sentence: "Er bleibt heute daheim, weil er sich...",
          correct: "ausruhen muss.",
          options: [
            "ausruhen muss.",
            "muss ausruhen.",
            "ausruht müssen.",
            "ausruhen gemusst hat."
          ],
          explanation: "Formula: [Infinitive] + [Conjugated Modal at End]: ausruhen muss."
        },
        {
          sentence: "Sie freut sich, dass sie im neuen Job...",
          correct: "mehr verdienen kann.",
          options: [
            "mehr verdienen kann.",
            "kann mehr verdienen.",
            "mehr kann verdienen."
          ],
          explanation: "Formula: verdienen (Infinitive) + kann (Modal at End)."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Correct Connector (weil / dass / obwohl)",
      description: "Type the missing subordinator connector into the blank:",
      items: [
        {
          sentenceBefore: "Ich schreibe Ihnen diese E-Mail,",
          blank: "weil",
          sentenceAfter: "ich am Kurs leider nicht teilnehmen kann.",
          hint: "Begründung (reason)",
          acceptableAnswers: ["weil", "da"],
          explanation: "'weil' explains the reason for missing class."
        },
        {
          sentenceBefore: "Ich hoffe sehr,",
          blank: "dass",
          sentenceAfter: "wir uns bald wiedersehen.",
          hint: "Fakt / Aussage (that)",
          acceptableAnswers: ["dass"],
          explanation: "'dass' introduces the content of hope."
        },
        {
          sentenceBefore: "Er hat die Prüfung bestanden,",
          blank: "obwohl",
          sentenceAfter: "die Aufgaben sehr schwer waren.",
          hint: "Gegensatz (although)",
          acceptableAnswers: ["obwohl"],
          explanation: "'obwohl' expresses concession / contrast."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Verb-Verb Sandwich",
      title: "When the Subordinate Clause Comes First",
      description: "When the sentence starts with 'Weil' or 'Obwohl', the main clause after the comma begins IMMEDIATELY with its conjugated verb:",
      cards: [
        {
          title: "The Verb-Verb Sandwich Rule",
          de: "Weil ich krank bin, BLEIBE ich zu Hause.",
          en: "Because I am sick, I stay at home.",
          rule: "[Verb 1: bin] + [Komma] + [Verb 2: bleibe]. Two verbs touch across the comma!"
        },
        {
          title: "Another Example with Obwohl",
          de: "Obwohl es regnet, GEHE ich spazieren.",
          en: "Although it's raining, I go for a walk.",
          rule: "'regnet' and 'gehe' meet right at the comma boundary."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wo steht das konjugierte Verb in einem Nebensatz mit 'weil'?",
          correct: 2,
          options: ["Auf Position 1", "Auf Position 2", "Am absoluten Satzende", "Vor dem Subjekt"],
          explanation: "In allen Nebensätzen mit subordinierenden Konnektoren steht das Verb am Ende."
        },
        {
          prompt: "Ergänzen Sie: 'Weil ich keine Zeit hatte, ___ ich nicht kommen.'",
          correct: 1,
          options: ["ich konnte", "konnte ich", "ich kann", "kann ich"],
          explanation: "Verb-Verb-Sandwich: Nach dem Komma muss sofort das Verb 'konnte' folgen!"
        },
        {
          prompt: "Was passiert mit trennbaren Verben (z.B. anrufen) im 'dass'-Nebensatz?",
          correct: 0,
          options: ["Sie bleiben zusammen (dass ich dich anrufe)", "Sie werden getrennt (dass ich rufe dich an)", "Sie stehen am Anfang", "Das Präfix fällt weg"],
          explanation: "Im Nebensatz werden trennbare Verben wieder zusammengeschrieben (anrufe)."
        }
      ]
    },
    summary: {
      title: "Subordinate Clauses Mastery Achieved!",
      takeaway: "You have mastered the B1 Verb-Kicker rule and the Verb-Verb Sandwich.",
      bulletPoints: [
        "Connectors like weil, dass, obwohl, wenn kick the conjugated verb to the very end.",
        "With modal verbs, the formula is: [Infinitive] + [Modal verb at the end].",
        "When the subclause leads, the main clause begins immediately with its verb right after the comma."
      ]
    }
  },

  // ── 7. KONJUNKTIV II: HÖFLICHKEIT & BITTEN ──
  "b1-konjunktiv": {
    id: "b1-konjunktiv",
    level: "B1",
    title: "Konjunktiv II: Höflichkeit & Bitten",
    desc: "Formula for official letters: 'Könnten Sie mir bitte...', 'Ich würde mich freuen...'.",
    duration: "10 min",
    badge: "Writing Key",
    steps: [
      { title: "1. The Politeness Blueprint", type: "intro", subtitle: "Direct Order vs Polite Request" },
      { title: "2. The 3 Golden Konjunktiv II Verbs", type: "table", subtitle: "könnten, würden, hätten" },
      { title: "3. Polite Request Transformation", type: "drill1", subtitle: "Imperativ -> Konjunktiv II" },
      { title: "4. Official B1 Email Formulas", type: "drill2", subtitle: "Letter Closing & Requests" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Konjunktiv II Verb" },
      { title: "6. Wishes & Unreal Statements", type: "nuance", subtitle: "Ich hätte gern / Ich wäre gern" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Politeness Questions" },
      { title: "8. Konjunktiv II Mastery Summary", type: "summary", subtitle: "Perfect Score in B1 Letters" }
    ],
    intro: {
      badge: "Step 1: Politeness Blueprint",
      title: "Why Konjunktiv II Decides Your Writing Score",
      description: "In Germany, direct commands sound rude in emails and official offices. Instead of saying 'Geben Sie mir den Termin!', B1 candidates must use Konjunktiv II: 'Könnten Sie mir bitte einen Termin geben?'.",
      exampleCard: {
        title: "The Formula",
        formula: "[Könnten / Würden] + Sie + [bitte] + ... + [Infinitiv am Ende]?\nKönnten Sie mir bitte den Vertrag zusenden?",
        highlight: "This single structure guarantees maximum points in B1 letter writing!"
      },
      interactiveItems: [
        { german: "Könnten Sie bitte...?", english: "Could you please...?", note: "Könnten Sie mir helfen?" },
        { german: "Würden Sie bitte...?", english: "Would you please...?", note: "Würden Sie das reparieren?" },
        { german: "Ich hätte gern...", english: "I would like to have...", note: "Ich hätte gern Informationen." },
        { german: "Ich würde mich freuen...", english: "I would be very glad...", note: "Ich würde mich über eine Antwort freuen." }
      ]
    },
    table: {
      badge: "Step 2: Golden Verbs Chart",
      title: "The 3 Core Konjunktiv II Forms for B1",
      description: "You do NOT need complex subjunctive charts. In 95% of B1 exams, only these 3 verbs are used:",
      headers: ["Pronoun", "können -> könnten (could)", "werden -> würden (would)", "haben -> hätten (would have)"],
      rows: [
        { col1: "ich", col2: "ich könnte", col3: "ich würde", col4: "ich hätte", tip: "No -e difference" },
        { col1: "du", col2: "du könntest", col3: "du würdest", col4: "du hättest", tip: "Informal friendly" },
        { col1: "er/sie/es", col2: "er könnte", col3: "er würde", col4: "er hätte", tip: "Identical to 'ich'!" },
        { col1: "wir", col2: "wir könnten", col3: "wir würden", col4: "wir hätten", tip: "Joint planning" },
        { col1: "Sie (formal)", col2: "Sie könnten", col3: "Sie würden", col4: "Sie hätten", tip: "Crucial for letters!" }
      ],
      goldenTip: "Notice: The 'ich' and 'er/sie/es' forms are ALWAYS 100% identical: ich könnte / er könnte, ich würde / er würde, ich hätte / er hätte!"
    },
    drill1: {
      badge: "Step 3: Polite Transformation",
      title: "Turn Rude Demands into Polite Requests",
      description: "Select the professional B1 Konjunktiv II version for each everyday situation:",
      questions: [
        {
          sentence: "Rude: 'Schicken Sie mir die Unterlagen!' -> Polite:",
          correct: "Könnten Sie mir bitte die Unterlagen schicken?",
          options: [
            "Könnten Sie mir bitte die Unterlagen schicken?",
            "Schicken Sie mir bitte die Unterlagen!",
            "Können Sie die Unterlagen schicken müssen?"
          ],
          explanation: "'Könnten Sie mir bitte... schicken?' is the gold standard of B1 formal politeness."
        },
        {
          sentence: "Rude: 'Reparieren Sie die Heizung schnell!' -> Polite:",
          correct: "Würden Sie bitte die Heizung zeitnah reparieren lassen?",
          options: [
            "Würden Sie bitte die Heizung zeitnah reparieren lassen?",
            "Sie müssen sofort die Heizung reparieren!",
            "Reparieren Sie doch schnell die Heizung."
          ],
          explanation: "'Würden Sie bitte...' transforms a demanding complaint into a professional business request."
        },
        {
          sentence: "Direct: 'Ich will einen Kaffee.' -> Polite:",
          correct: "Ich hätte gern einen Kaffee, bitte.",
          options: [
            "Ich hätte gern einen Kaffee, bitte.",
            "Ich will Kaffee haben.",
            "Ich habe gern einen Kaffee."
          ],
          explanation: "'Ich hätte gern...' is universally polite in restaurants, bakeries, and offices."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Letter Formulas",
      title: "Official B1 Email Closing Formulas",
      description: "Pick the high-scoring Konjunktiv II formula for your exam letter:",
      questions: [
        {
          sentence: "Über eine baldige Antwort ___ ich mich sehr freuen.",
          correct: "würde",
          options: ["würde", "werde", "hätte", "könnte"],
          explanation: "Standard closing: 'Ich würde mich sehr freuen' (I would be very pleased)."
        },
        {
          sentence: "___ es Ihnen möglich, den Termin auf Freitag zu verschieben?",
          correct: "Wäre",
          options: ["Wäre", "Würde", "Hätte", "Könnte"],
          explanation: "'Wäre es Ihnen möglich...?' (Would it be possible for you...?)."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Konjunktiv II Verb Form",
      description: "Type the correct Konjunktiv II verb into the blank:",
      items: [
        {
          sentenceBefore: "",
          blank: "Könnten",
          sentenceAfter: "Sie mir bitte Bescheid geben?",
          hint: "können (Sie formal)",
          acceptableAnswers: ["Könnten", "könnten"],
          explanation: "Könnten Sie mir bitte Bescheid geben? (Could you please let me know?)."
        },
        {
          sentenceBefore: "Ich",
          blank: "würde",
          sentenceAfter: "mich über einen Besichtigungstermin sehr freuen.",
          hint: "werden (ich)",
          acceptableAnswers: ["würde"],
          explanation: "Ich würde mich freuen."
        },
        {
          sentenceBefore: "Ich",
          blank: "hätte",
          sentenceAfter: "gern noch nähere Auskünfte über den Kurs.",
          hint: "haben (ich)",
          acceptableAnswers: ["hätte"],
          explanation: "Ich hätte gern."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Wishes & Unreal Dreams",
      title: "Expressing Wishes with 'wäre' and 'hätte'",
      description: "How to express wishes in Sprechen Teil 2 and informal letters:",
      cards: [
        {
          title: "Wishes with 'hätte gern'",
          de: "Wenn ich mehr Zeit hätte, würde ich mehr reisen.",
          en: "If I had more time, I would travel more.",
          rule: "Condition with 'hätte' (had) + consequence with 'würde' (would)."
        },
        {
          title: "Wishes with 'wäre gern'",
          de: "Ich wäre jetzt gern am Strand im Urlaub.",
          en: "I would love to be on the beach on vacation right now.",
          rule: "wäre (would be) express an unreal present state."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welche Form von 'können' drückt eine höfliche Bitte an 'Sie' aus?",
          correct: 1,
          options: ["können", "könnten", "konnten", "kann"],
          explanation: "'könnten' ist der Konjunktiv II für höfliche Bitten."
        },
        {
          prompt: "Wie lautet die 1. Person Singular von 'werden' im Konjunktiv II?",
          correct: 0,
          options: ["ich würde", "ich werde", "ich wurde", "ich würdest"],
          explanation: "ich würde (I would)."
        },
        {
          prompt: "Was bedeutet 'Ich hätte gern'?",
          correct: 2,
          options: ["Ich habe schon", "Ich hatte gestern", "Ich möchte gern haben", "Ich muss haben"],
          explanation: "'Ich hätte gern' bedeutet 'Ich möchte gern haben' (höflicher Wunsch)."
        }
      ]
    },
    summary: {
      title: "Konjunktiv II Mastery Achieved!",
      takeaway: "You can now write polite, professional German emails and speak respectfully in all official situations.",
      bulletPoints: [
        "Use 'Könnten Sie bitte...' for appointment requests and polite inquiries.",
        "Use 'Ich würde mich sehr freuen' for professional letter endings.",
        "Remember that 'ich' and 'er/sie/es' forms are always identical in Konjunktiv II."
      ]
    }
  },

  // ── 9. B1: WENN-SÄTZE & KONDITIONALE ──
  "b1-wenn": {
    id: "b1-wenn",
    level: "B1",
    title: "Wenn-Sätze & Konditionale",
    desc: "Master conditions and consequences: real conditions in Präsens vs unreal wishes in Konjunktiv II.",
    duration: "12 min",
    badge: "B1 Core",
    steps: [
      { title: "1. The Condition Blueprint", type: "intro", subtitle: "Wenn [Nebensatz], [Hauptsatz]" },
      { title: "2. Real vs Unreal Matrix", type: "table", subtitle: "Präsens vs Konjunktiv II" },
      { title: "3. Verb Kicker Drill", type: "drill1", subtitle: "End Position Mastery" },
      { title: "4. Comma & Verb Inversion", type: "drill2", subtitle: "Comma Rule & Verb Flip" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Conditional Verb" },
      { title: "6. Nuances & False Friends", type: "nuance", subtitle: "Wenn vs Wann vs Als" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How Wenn-Clauses Function in German",
      description: "A 'wenn'-sentence is a subordinate clause (Nebensatz). The conjunction 'wenn' (if / whenever) kicks the conjugated verb to the absolute end. If 'wenn' comes first, the main clause immediately starts with its verb right after the comma!",
      exampleCard: {
        title: "Golden Two-Verb Comma Rule:",
        formula: "Wenn das Wetter schön ist, gehen wir spazieren.",
        highlight: "Notice: '...ist,' followed immediately by 'gehen wir' (Verb-Comma-Verb!)"
      },
      interactiveItems: [
        { german: "Wenn ich Zeit habe, lerne ich Deutsch.", english: "If I have time, I learn German.", note: "Real present condition" },
        { german: "Wenn ich mehr Geld hätte, würde ich ein Auto kaufen.", english: "If I had more money, I would buy a car.", note: "Unreal condition (Konjunktiv II)" },
        { german: "Ich rufe dich an, wenn ich am Bahnhof ankomme.", english: "I will call you when I arrive at the station.", note: "Nebensatz at the end" }
      ]
    },
    table: {
      badge: "Step 2: Real vs Unreal Matrix",
      title: "Real vs Unreal Conditional Matrix",
      description: "Learn how the verb forms shift between real daily plans and hypothetical B1 exam wishes:",
      headers: ["Condition Type", "Wenn-Clause Verb", "Main Clause Verb", "Example Sentence"],
      rows: [
        { col1: "Real Present (Plan)", col2: "Präsens (am Ende)", col3: "Präsens (Pos. 1)", col4: "Wenn es regnet, bleibe ich zu Hause." },
        { col1: "Real Future (Promise)", col2: "Präsens (am Ende)", col3: "werden + Infinitiv", col4: "Wenn du hilfst, werde ich mich freuen." },
        { col1: "Unreal Wish (haben)", col2: "hätte (am Ende)", col3: "würde + Infinitiv", col4: "Wenn ich Urlaub hätte, würde ich verreisen." },
        { col1: "Unreal State (sein)", col2: "wäre (am Ende)", col3: "würde + Infinitiv", col4: "Wenn ich gesund wäre, würde ich joggen." },
        { col1: "Unreal Modal (können)", col2: "könnte (am Ende)", col3: "würde / Hauptsatz", col4: "Wenn ich fliegen könnte, wäre das super." }
      ],
      goldenTip: "Whenever a 'wenn'-clause comes first, the comma is immediately followed by the verb of the next clause: [..., verb] [verb, ...]!"
    },
    drill1: {
      badge: "Step 3: Verb Kicker Drill",
      title: "Place the Verb at the End",
      description: "Pick the correct conjugated form in the subordinate 'wenn' clause:",
      questions: [
        {
          sentence: "Wenn ich morgen Zeit ___, helfe ich dir beim Umzug.",
          correct: "habe",
          options: ["habe", "hast", "haben", "hatte"],
          explanation: "'ich' in the present tense takes 'habe' placed at the end of the clause."
        },
        {
          sentence: "Wenn Sie Fragen ___, können Sie mich jederzeit anrufen.",
          correct: "haben",
          options: ["haben", "habt", "hat", "hättest"],
          explanation: "Formal 'Sie' takes 'haben' at the end of the wenn-clause."
        },
        {
          sentence: "Wir gehen spazieren, wenn die Sonne ___.",
          correct: "scheint",
          options: ["scheint", "scheinen", "schien", "geschienen"],
          explanation: "'die Sonne' (sie) takes 3rd person singular 'scheint' at the absolute end."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Comma & Inversion Drill",
      title: "Master the Verb-Comma-Verb Rule",
      description: "Choose the correct main clause word order following the comma:",
      questions: [
        {
          sentence: "Wenn ich die B1-Prüfung bestehe, ___ ich mich sehr.",
          correct: "freue",
          options: ["freue", "ich freue", "freuen", "habe gefreut"],
          explanation: "After the comma, the main clause verb comes in Position 1: '..., freue ich mich sehr.'"
        },
        {
          sentence: "Wenn das Wetter morgen schlecht ist, ___ wir im Büro.",
          correct: "bleiben",
          options: ["bleiben", "wir bleiben", "geblieben", "bleibt"],
          explanation: "Verb 'bleiben' must directly follow the comma before the subject 'wir'."
        },
        {
          sentence: "Wenn ich mehr Zeit hätte, ___ ich jeden Tag Sport machen.",
          correct: "würde",
          options: ["würde", "ich würde", "werde", "hätte"],
          explanation: "Hypothetical condition triggers 'würde' immediately after the comma."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Correct Verb Form",
      description: "Type the missing verb into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Wenn ich heute früher Feierabend",
          blank: "mache",
          sentenceAfter: ", gehe ich zum Deutschkurs.",
          hint: "Präsens form of 'machen' for 'ich'",
          acceptableAnswers: ["mache", "Wenn ich heute früher Feierabend mache, gehe ich zum Deutschkurs."],
          explanation: "Conjugated verb 'mache' belongs at the end of the 'wenn' subordinate clause."
        },
        {
          sentenceBefore: "Wenn Sie das Formular",
          blank: "unterschreiben",
          sentenceAfter: ", ist der Vertrag gültig.",
          hint: "Präsens form of 'unterschreiben' for formal 'Sie'",
          acceptableAnswers: ["unterschreiben", "Wenn Sie das Formular unterschreiben, ist der Vertrag gültig."],
          explanation: "Subordinate 'wenn' clause requires 'unterschreiben' at the end."
        },
        {
          sentenceBefore: "Wenn ich reich",
          blank: "wäre",
          sentenceAfter: ", würde ich eine Weltreise machen.",
          hint: "Konjunktiv II form of 'sein' for 'ich' (unreal state)",
          acceptableAnswers: ["wäre", "Wenn ich reich wäre, würde ich eine Weltreise machen."],
          explanation: "'wäre' expresses the hypothetical condition 'if I were rich'."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Nuances",
      title: "The Ultimate Trap: Wenn vs Wann vs Als",
      description: "Examiners love testing whether you know when to use 'wenn', 'wann', and 'als':",
      cards: [
        {
          title: "WENN: Condition & Repeated Past",
          de: "Wenn ich frei habe, lese ich gern. / Wenn ich als Kind krank war, brachte Oma Suppe.",
          en: "If I am free, I like to read. / Whenever I was sick as a child...",
          rule: "Use 'wenn' for conditional 'if' and for repeated events in the past ('whenever')."
        },
        {
          title: "ALS: Single Event in the Past",
          de: "Als ich vor zwei Jahren nach Deutschland kam, sprach ich kein Deutsch.",
          en: "When I came to Germany two years ago, I spoke no German.",
          rule: "Use 'als' exclusively for a single, unique event or period in the past ('when')."
        },
        {
          title: "WANN: Question Word (Time)",
          de: "Ich weiß nicht, wann der nächste Zug abfährt.",
          en: "I do not know at what time the next train departs.",
          rule: "Use 'wann' only for direct or indirect questions about clock time."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Was passiert mit dem Hauptsatz, wenn der Wenn-Satz am Anfang steht?",
          correct: 1,
          options: ["Das Subjekt kommt zuerst", "Das Verb kommt direkt nach dem Komma", "Das Verb fliegt ans Satzende", "Das Verb entfällt"],
          explanation: "Nach dem Komma folgt direkt das konjugierte Verb des Hauptsatzes (Verb-Komma-Verb)."
        },
        {
          prompt: "Welches Wort passt: '___ ich zehn Jahre alt war, lebte ich in Spanien.'?",
          correct: 0,
          options: ["Als", "Wenn", "Wann", "Weil"],
          explanation: "'Als' wird für einmalige Ereignisse/Zeiträume in der Vergangenheit verwendet."
        },
        {
          prompt: "Ergänzen Sie: 'Wenn Sie Hilfe brauchen, ___ Sie mich bitte anrufen.'",
          correct: 2,
          options: ["haben", "müssen", "können", "gekonnt"],
          explanation: "'können Sie mich bitte anrufen' steht auf Position 1 direkt nach dem Komma."
        }
      ]
    },
    summary: {
      title: "Wenn-Sätze Mastery Achieved!",
      takeaway: "You can now express conditions, promises, and hypothetical wishes with perfect word order.",
      bulletPoints: [
        "In the 'wenn' clause, the conjugated verb always sits at the absolute end.",
        "When 'wenn' starts the sentence, the main clause begins with the verb right after the comma.",
        "Remember: 'wenn' = if/whenever, 'als' = single past event, 'wann' = question about clock time."
      ]
    }
  },

  // ── 10. B1: RELATIVSÄTZE ──
  "b1-relativ": {
    id: "b1-relativ",
    level: "B1",
    title: "Relativsätze (der, die, das, dem, den)",
    desc: "Connect thoughts fluidly without short robotic sentences: the #1 tool for top speaking scores.",
    duration: "15 min",
    badge: "High Yield",
    steps: [
      { title: "1. The Relative Pronoun Rule", type: "intro", subtitle: "Gender from Noun, Case from Role" },
      { title: "2. The Relative Pronoun Matrix", type: "table", subtitle: "Nominativ, Akkusativ, Dativ" },
      { title: "3. Akkusativ Relative Drill", type: "drill1", subtitle: "den / die / das" },
      { title: "4. Dativ Relative Drill", type: "drill2", subtitle: "dem / der / denen" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Relative Pronoun" },
      { title: "6. Prepositional Relative Clauses", type: "nuance", subtitle: "mit dem, in der, auf den" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How Relative Clauses Build B1 Speaking Fluency",
      description: "Relative clauses describe a noun in more detail. In German, a relative clause is enclosed in commas, begins with a relative pronoun, and ends with the conjugated verb!",
      exampleCard: {
        title: "The Golden Two-Step Rule:",
        formula: "1. Gender & Number come from the reference noun. | 2. Case (Nom/Akk/Dat) comes from its role in the relative clause.",
        highlight: "Das ist der Mann (masc.), den (akk. object) ich gestern getroffen habe."
      },
      interactiveItems: [
        { german: "Der Kollege, der mir hilft, ist sehr nett.", english: "The colleague who helps me is very kind.", note: "Nominativ masculine: der" },
        { german: "Der Brief, den ich geschrieben habe, ist wichtig.", english: "The letter that I wrote is important.", note: "Akkusativ masculine: den" },
        { german: "Die Nachbarin, der ich geholfen habe, bedankt sich.", english: "The neighbor whom I helped says thanks.", note: "Dativ feminine: der" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "Relative Pronouns Master Matrix",
      description: "Relative pronouns look almost identical to definite articles, with only two special forms in Dativ plural (denen) and Genitiv (dessen/deren):",
      headers: ["Case", "Maskulin (der)", "Feminin (die)", "Neutral (das)", "Plural (die)"],
      rows: [
        { col1: "Nominativ (Subject)", col2: "der", col3: "die", col4: "das", col5: "die", tip: "Identical to articles" },
        { col1: "Akkusativ (Direct Object)", col2: "den", col3: "die", col4: "das", col5: "die", tip: "Only maskulin changes to 'den'" },
        { col1: "Dativ (Indirect / Prep)", col2: "dem", col3: "der", col4: "dem", col5: "denen", tip: "Special plural form: DENEN!" }
      ],
      goldenTip: "Notice: Only masculine Akkusativ ('den') and plural Dativ ('denen') differ from standard articles!"
    },
    drill1: {
      badge: "Step 3: Akkusativ Drill",
      title: "Pick the Akkusativ Relative Pronoun",
      description: "Choose the correct pronoun when the described noun is the direct object:",
      questions: [
        {
          sentence: "Das ist der Deutschkurs, ___ ich seit drei Monaten besuche.",
          correct: "den",
          options: ["den", "der", "dem", "das"],
          explanation: "'Der Kurs' is masculine, and in 'ich besuche ___' it is the direct accusative object: 'den'."
        },
        {
          sentence: "Die E-Mail, ___ ich gestern erhalten habe, war sehr informativ.",
          correct: "die",
          options: ["die", "der", "den", "das"],
          explanation: "'Die E-Mail' is feminine accusative: 'die'."
        },
        {
          sentence: "Das Auto, ___ mein Nachbar gekauft hat, ist nagelneu.",
          correct: "das",
          options: ["das", "dem", "den", "der"],
          explanation: "'Das Auto' is neuter accusative: 'das'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Dativ Drill",
      title: "Pick the Dativ Relative Pronoun",
      description: "Select the pronoun triggered by dative verbs (helfen, danken, gefallen) or dative prepositions:",
      questions: [
        {
          sentence: "Das ist der Arzt, ___ ich sehr vertraue.",
          correct: "dem",
          options: ["dem", "den", "der", "das"],
          explanation: "'Der Arzt' is masculine, and the verb 'vertrauen' requires Dativ: 'dem'."
        },
        {
          sentence: "Die Kollegin, ___ ich geholfen habe, hat mir Schokolade geschenkt.",
          correct: "der",
          options: ["der", "die", "dem", "denen"],
          explanation: "'Die Kollegin' is feminine, and 'helfen' requires Dativ: 'der'."
        },
        {
          sentence: "Die Freunde, mit ___ ich in den Urlaub fahre, kommen aus Berlin.",
          correct: "denen",
          options: ["denen", "den", "die", "der"],
          explanation: "Plural with preposition 'mit' requires the special dative plural relative pronoun 'denen'!"
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Relative Pronoun",
      description: "Type the exact relative pronoun into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Der Antrag,",
          blank: "den",
          sentenceAfter: "ich beim Bürgeramt eingereicht habe, wurde genehmigt.",
          hint: "Masculine accusative: der Antrag -> den",
          acceptableAnswers: ["den", "Der Antrag, den ich beim Bürgeramt eingereicht habe, wurde genehmigt."],
          explanation: "'Der Antrag' is masculine and acts as the direct object of 'eingereicht habe'."
        },
        {
          sentenceBefore: "Die Wohnung,",
          blank: "in der",
          sentenceAfter: "ich wohne, liegt sehr zentral.",
          hint: "Preposition 'in' + feminine dative: in der",
          acceptableAnswers: ["in der", "Die Wohnung, in der ich wohne, liegt sehr zentral."],
          explanation: "Location answer to 'Wo?' triggers dative: 'in der'."
        },
        {
          sentenceBefore: "Hier sind die Kollegen, mit",
          blank: "denen",
          sentenceAfter: "ich das Projekt leite.",
          hint: "Plural dative after preposition 'mit'",
          acceptableAnswers: ["denen", "Hier sind die Kollegen, mit denen ich das Projekt leite."],
          explanation: "Plural dative relative pronoun is 'denen'."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Prepositions",
      title: "Prepositions in Relative Clauses",
      description: "When a preposition belongs to the relative clause, it always sits right at the start before the relative pronoun:",
      cards: [
        {
          title: "Preposition + Dativ",
          de: "Das ist die Stadt, in der ich seit fünf Jahren lebe.",
          en: "That is the city in which I have been living for five years.",
          rule: "The preposition 'in' asks 'Wo?', triggering Dativ: die Stadt -> in der."
        },
        {
          title: "Preposition + Akkusativ",
          de: "Das ist der Kurs, für den ich mich angemeldet habe.",
          en: "That is the course for which I registered.",
          rule: "The preposition 'für' strictly triggers Akkusativ: der Kurs -> für den."
        },
        {
          title: "Dativ Plural Special Form",
          de: "Die Kinder, mit denen mein Sohn spielt, sind sehr höflich.",
          en: "The children with whom my son plays are very polite.",
          rule: "Never write 'mit den'. For plural dative relative clauses, always write 'mit denen'!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wo steht das konjugierte Verb in einem Relativsatz?",
          correct: 2,
          options: ["Auf Position 1", "Auf Position 2", "Am absoluten Satzende", "Direkt nach dem Pronomen"],
          explanation: "Ein Relativsatz ist ein Nebensatz: Das konjugierte Verb steht immer am absoluten Satzende."
        },
        {
          prompt: "Welche Form ist der Dativ Plural des Relativpronomens?",
          correct: 1,
          options: ["den", "denen", "die", "der"],
          explanation: "Im Dativ Plural lautet das Relativpronomen 'denen' (z.B. 'die Leute, mit denen ich arbeite')."
        },
        {
          prompt: "Ergänzen Sie: 'Das ist der Schlüssel, ___ ich gesucht habe.'",
          correct: 0,
          options: ["den", "der", "dem", "dessen"],
          explanation: "'Der Schlüssel' ist maskulin Akkusativ (Objekt von suchen) -> 'den'."
        }
      ]
    },
    summary: {
      title: "Relativsätze Mastery Achieved!",
      takeaway: "You can now connect ideas smoothly in speaking and writing, sounding natural and sophisticated.",
      bulletPoints: [
        "Relative clauses always have commas on both sides and send the conjugated verb to the end.",
        "Gender and number are fixed by the noun; case is determined by the verb inside the relative clause.",
        "Look out for the special form: Dativ Plural is 'denen'!"
      ]
    }
  },

  // ── 11. B1: PASSIV (PRÄSENS & PRÄTERITUM) ──
  "b1-passiv": {
    id: "b1-passiv",
    level: "B1",
    title: "Passiv (Präsens & Präteritum)",
    desc: "Essential for official German letters, administrative forms, and workplace instructions: werden + Partizip II.",
    duration: "14 min",
    badge: "Official & B1",
    steps: [
      { title: "1. The Passive Blueprint", type: "intro", subtitle: "werden / wurden + Partizip II" },
      { title: "2. Passive Conjugation Table", type: "table", subtitle: "Präsens vs Präteritum" },
      { title: "3. Form the Passive Drill", type: "drill1", subtitle: "Active to Passive Conversion" },
      { title: "4. Agent Drill: von + Dativ", type: "drill2", subtitle: "Naming Who Did It" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Passive Verb" },
      { title: "6. Nuances & Official Notices", type: "nuance", subtitle: "Man vs Passiv" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "Why Passiv is Vital for B1 Writing & Reading",
      description: "In official German letters, authorities focus on the action rather than the person: 'Your application is being processed'. Passive is formed with the auxiliary verb 'werden' (or 'wurden' in the past) plus Partizip II at the end!",
      exampleCard: {
        title: "The Golden Passive Bracket:",
        formula: "[Subject] + [werden / wurde] + ... + [Partizip II at end]",
        highlight: "Der Antrag wird heute vom Amt geprüft."
      },
      interactiveItems: [
        { german: "Der Brief wird abgeschickt.", english: "The letter is being sent.", note: "Passiv Präsens" },
        { german: "Das Auto wurde repariert.", english: "The car was repaired.", note: "Passiv Präteritum (Past)" },
        { german: "Die Rechnung muss bezahlt werden.", english: "The bill must be paid.", note: "Passiv with modal verb" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "Passive Auxiliary 'werden' Conjugation",
      description: "Compare the present and past tense forms of 'werden' that form the passive backbone:",
      headers: ["Pronoun", "Präsens (is being done)", "Präteritum (was done)", "With Partizip II"],
      rows: [
        { col1: "ich", col2: "werde", col3: "wurde", col4: "werde / wurde informiert" },
        { col1: "du", col2: "wirst", col3: "wurdest", col4: "wirst / wurdest gefragt" },
        { col1: "er / sie / es (der Antrag)", col2: "wird", col3: "wurde", col4: "wird / wurde geprüft" },
        { col1: "wir", col2: "werden", col3: "wurden", col4: "werden / wurden eingeladen" },
        { col1: "ihr", col2: "werdet", col3: "wurdet", col4: "werdet / wurdet benachrichtigt" },
        { col1: "sie / Sie (die Dokumente)", col2: "werden", col3: "wurden", col4: "werden / wurden bearbeitet" }
      ],
      goldenTip: "Notice: 3rd person singular 'wird' (present) and 'wurde' (past) account for over 80% of all passive sentences in B1 exams!"
    },
    drill1: {
      badge: "Step 3: Passive Formation Drill",
      title: "Select the Correct Auxiliary Form",
      description: "Complete the official notification with the correct form of 'werden':",
      questions: [
        {
          sentence: "Ihr Reisepass ___ zurzeit bei der Botschaft bearbeitet.",
          correct: "wird",
          options: ["wird", "werde", "werden", "wurde"],
          explanation: "'Ihr Reisepass' is singular (er/es), so the present passive auxiliary is 'wird'."
        },
        {
          sentence: "Die Unterlagen ___ gestern vollständig an das Amt geschickt.",
          correct: "wurden",
          options: ["wurden", "werden", "wurde", "worden"],
          explanation: "'Die Unterlagen' is plural, and 'gestern' triggers past tense (Präteritum): 'wurden'."
        },
        {
          sentence: "Die neue Sprachschule ___ nächsten Monat eröffnet.",
          correct: "wird",
          options: ["wird", "werdet", "wurde", "wurden"],
          explanation: "3rd person singular present passive: 'wird ... eröffnet'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Agent 'von + Dativ' Drill",
      title: "Specify Who Performed the Action",
      description: "In passive voice, the person doing the action is introduced with 'von + Dativ':",
      questions: [
        {
          sentence: "Der Brief wurde ___ Hausarzt unterschrieben.",
          correct: "vom",
          options: ["vom", "von der", "von den", "von"],
          explanation: "'Der Hausarzt' in dative is 'dem Hausarzt'. von + dem merges into 'vom'."
        },
        {
          sentence: "Das Dokument wird ___ Sachbearbeiterin geprüft.",
          correct: "von der",
          options: ["von der", "vom", "von dem", "von den"],
          explanation: "'Die Sachbearbeiterin' in dative is 'der Sachbearbeiterin': 'von der'."
        },
        {
          sentence: "Die Gäste wurden ___ Bürgermeister persönlich begrüßt.",
          correct: "vom",
          options: ["vom", "von der", "von", "durch"],
          explanation: "von + dem Bürgermeister = 'vom Bürgermeister'."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Passive Verb Component",
      description: "Type the missing passive form into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Der Antrag",
          blank: "wird",
          sentenceAfter: "schnellstmöglich geprüft.",
          hint: "3rd person singular present of werden",
          acceptableAnswers: ["wird", "Der Antrag wird schnellstmöglich geprüft."],
          explanation: "'Der Antrag' requires 'wird' in present passive."
        },
        {
          sentenceBefore: "Die Straßen",
          blank: "wurden",
          sentenceAfter: "nach dem Unwetter gereinigt.",
          hint: "Plural past form of werden (Präteritum)",
          acceptableAnswers: ["wurden", "Die Straßen wurden nach dem Unwetter gereinigt."],
          explanation: "Plural subject 'Die Straßen' in the past takes 'wurden'."
        },
        {
          sentenceBefore: "Der Vertrag wurde von beiden Partnern",
          blank: "unterschrieben",
          sentenceAfter: ".",
          hint: "Partizip II of 'unterschreiben'",
          acceptableAnswers: ["unterschreiben", "Der Vertrag wurde von beiden Partnern unterschrieben."],
          explanation: "Passive requires Partizip II at the end of the sentence."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Alternatives",
      title: "Passiv vs 'man' in Daily German",
      description: "Germans often use the pronoun 'man' (one / people) in conversational speech as an alternative to passive:",
      cards: [
        {
          title: "Conversational 'man'",
          de: "Hier spricht man Deutsch. / Das macht man so.",
          en: "People speak German here. / That is how one does it.",
          rule: "'man' acts like 'er/sie/es' and takes a standard active conjugated verb."
        },
        {
          title: "Official Written Passiv",
          de: "Hier wird Deutsch gesprochen. / Das wird so gemacht.",
          en: "German is spoken here. / That is done this way.",
          rule: "Used in official letters, signs, guidelines, and formal communications."
        },
        {
          title: "Passiv with Modal Verbs",
          de: "Die Rechnung muss bis Freitag bezahlt werden.",
          en: "The invoice must be paid by Friday.",
          rule: "Modal verb in Position 2 + Partizip II + 'werden' at the absolute end!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wie wird das Passiv im Deutschen gebildet?",
          correct: 0,
          options: ["werden + Partizip II", "haben + Partizip II", "sein + Infinitiv", "würde + Infinitiv"],
          explanation: "Das Passiv wird immer mit einer Form von 'werden' und dem Partizip II gebildet."
        },
        {
          prompt: "Welche Präposition nennt den Urheber der Handlung im Passiv?",
          correct: 1,
          options: ["mit + Dativ", "von + Dativ", "für + Akkusativ", "an + Dativ"],
          explanation: "Der Handelnde wird mit 'von + Dativ' eingeleitet (z.B. 'vom Arzt')."
        },
        {
          prompt: "Wie lautet die Vergangenheitsform (Präteritum) von 'Das Auto wird repariert'?",
          correct: 2,
          options: ["Das Auto ist repariert worden", "Das Auto wurde repariert", "Das Auto wird repariert haben", "Das Auto war repariert"],
          explanation: "'Das Auto wurde repariert' ist das Präteritum Passiv."
        }
      ]
    },
    summary: {
      title: "Passiv Mastery Achieved!",
      takeaway: "You can now understand official letters and write formal reports with total confidence.",
      bulletPoints: [
        "Passiv focuses on the action: 'wird / wurde' + Partizip II at the end.",
        "Remember: 3rd person singular is 'wird' (present) and 'wurde' (past).",
        "With modal verbs, the formula is: [Modalverb] ... [Partizip II] + [werden]."
      ]
    }
  },

  // ── 12. B1: INFINITIV MIT 'ZU' & 'UM... ZU' ──
  "b1-infinitiv": {
    id: "b1-infinitiv",
    level: "B1",
    title: "Infinitiv mit 'zu' & 'um... zu'",
    desc: "Express personal plans, intentions, and purpose: 'Ich habe vor, Deutsch zu lernen'.",
    duration: "12 min",
    badge: "High Yield",
    steps: [
      { title: "1. The Infinitive Clause Blueprint", type: "intro", subtitle: "Main Clause + ..., [zu + Verb at end]" },
      { title: "2. Trigger Expressions Table", type: "table", subtitle: "Lust haben, vorhaben, wichtig sein" },
      { title: "3. 'zu' vs 'um... zu' Drill", type: "drill1", subtitle: "General Clause vs Purpose" },
      { title: "4. Separable Verb Drill: aufzustehen", type: "drill2", subtitle: "Inserting 'zu' inside the Verb" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the 'zu + Verb' Form" },
      { title: "6. Nuances & When NOT to use 'zu'", type: "nuance", subtitle: "Modal Verbs never take 'zu'!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How Infinitive Clauses Work in B1 German",
      description: "When two actions share the same subject, you do not need a second 'dass'-clause with a conjugated verb. Instead, connect them with a comma and place 'zu + Infinitiv' at the end!",
      exampleCard: {
        title: "The Golden 'zu' Pattern:",
        formula: "Es ist wichtig, jeden Tag neue Wörter zu lernen.",
        highlight: "Notice: Comma before the infinitive clause, 'zu lernen' at the very end!"
      },
      interactiveItems: [
        { german: "Ich habe vor, die B1-Prüfung zu bestehen.", english: "I plan to pass the B1 exam.", note: "vorhaben + zu" },
        { german: "Ich lerne fleißig, um gute Noten zu bekommen.", english: "I study hard in order to get good grades.", note: "um... zu (Purpose/Goal)" },
        { german: "Es freut mich, Sie kennenzulernen.", english: "It pleases me to get to know you.", note: "Separable: kennen-zu-lernen" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "The 3 Major Triggers for 'zu + Infinitiv'",
      description: "Memorize the 3 phrase categories that naturally demand an infinitive clause with 'zu':",
      headers: ["Category", "Key Triggers", "Formula", "B1 Exam Example"],
      rows: [
        { col1: "1. Nouns with haben", col2: "Lust haben, Zeit haben, Angst haben", col3: "..., [Objekt] zu [Verb]", col4: "Ich habe keine Zeit, ins Kino zu gehen." },
        { col1: "2. Adjectives with sein", col2: "wichtig sein, schön sein, verboten sein", col3: "Es ist ..., zu [Verb]", col4: "Es ist gesund, viel Wasser zu trinken." },
        { col1: "3. Intention Verbs", col2: "vorhaben, planen, versuchen, vergessen", col3: "..., [Objekt] zu [Verb]", col4: "Vergiss nicht, den Schlüssel mitzunehmen!" },
        { col1: "4. Purpose ('in order to')", col2: "um ... zu (expresses aim/goal)", col3: "..., um [Ziel] zu [Verb]", col4: "Ich lerne Deutsch, um in Berlin zu arbeiten." }
      ],
      goldenTip: "CRITICAL: 'um... zu' answers the question 'Wozu?' (For what purpose?). The subject of both parts must be identical!"
    },
    drill1: {
      badge: "Step 3: 'zu' vs 'um... zu' Drill",
      title: "Distinguish Purpose from General Clauses",
      description: "Choose whether the sentence requires 'zu' alone or 'um ... zu' (purpose):",
      questions: [
        {
          sentence: "Ich gehe zum Sprachkurs, ___ meine Aussprache zu verbessern.",
          correct: "um",
          options: ["um", "damit", "zu", "ohne"],
          explanation: "Expresses a clear goal/purpose ('in order to improve my pronunciation'): 'um ... zu'."
        },
        {
          sentence: "Es ist nicht erlaubt, im Zug ___ rauchen.",
          correct: "zu",
          options: ["zu", "um zu", "an", "für"],
          explanation: "Adjective phrase 'es ist nicht erlaubt' triggers standard 'zu + Infinitiv'."
        },
        {
          sentence: "Hast du heute Abend Lust, mit mir kochen ___ gehen?",
          correct: "zu",
          options: ["zu", "um", "für", "ohne"],
          explanation: "'Lust haben' triggers standard 'zu + Infinitiv'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Separable Verb Drill",
      title: "Insert 'zu' between Prefix and Stem",
      description: "For separable verbs, 'zu' is wedged right inside between the prefix and the root verb (e.g. an-zu-rufen):",
      questions: [
        {
          sentence: "Ich habe vergessen, meine Mutter ___ (anrufen).",
          correct: "anzurufen",
          options: ["anzurufen", "zu anrufen", "angerufen", "anrufen zu"],
          explanation: "Separable prefix 'an-' + 'zu' + root 'rufen' = 'anzurufen'."
        },
        {
          sentence: "Es ist schwer, jeden Tag um 5 Uhr morgens ___ (aufstehen).",
          correct: "aufzustehen",
          options: ["aufzustehen", "zu aufstehen", "aufgestanden", "aufstehende"],
          explanation: "Prefix 'auf-' + 'zu' + 'stehen' = 'aufzustehen'."
        },
        {
          sentence: "Ich freue mich darauf, Sie bald persönlich ___ (kennenlernen).",
          correct: "kennenzulernen",
          options: ["kennenzulernen", "zu kennenlernen", "kennengelernt", "kennen zu lernen"],
          explanation: "'kennen' + 'zu' + 'lernen' = 'kennenzulernen'."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the 'zu + Verb' Form",
      description: "Type the exact infinitive with 'zu' into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Ich habe vor, die B1-Prüfung",
          blank: "zu bestehen",
          sentenceAfter: ".",
          hint: "zu + bestehen (non-separable)",
          acceptableAnswers: ["zu bestehen", "Ich habe vor, die B1-Prüfung zu bestehen."],
          explanation: "'bestehen' is not separable, so 'zu' stands in front as a separate word."
        },
        {
          sentenceBefore: "Vergiss bitte nicht, die Tür",
          blank: "abzuschließen",
          sentenceAfter: "!",
          hint: "Separable: ab + zu + schließen",
          acceptableAnswers: ["abzuschließen", "Vergiss bitte nicht, die Tür abzuschließen!"],
          explanation: "Separable verb: 'abzuschließen'."
        },
        {
          sentenceBefore: "Ich lerne jeden Tag Deutsch, um einen guten Job",
          blank: "zu finden",
          sentenceAfter: ".",
          hint: "zu + finden",
          acceptableAnswers: ["zu finden", "Ich lerne jeden Tag Deutsch, um einen guten Job zu finden."],
          explanation: "'um ... zu finden' completes the purpose clause."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Exceptions",
      title: "When NOT to use 'zu' in German!",
      description: "The #1 student mistake is adding 'zu' after modal verbs or perception verbs:",
      cards: [
        {
          title: "NEVER use 'zu' with Modal Verbs",
          de: "Ich kann Deutsch sprechen. (NOT: zu sprechen!)",
          en: "I can speak German.",
          rule: "können, müssen, dürfen, sollen, wollen, möchten NEVER take 'zu'!"
        },
        {
          title: "Verbs of Perception (sehen, hören)",
          de: "Ich höre die Vögel singen. / Ich sehe ihn kommen.",
          en: "I hear the birds sing. / I see him coming.",
          rule: "Verbs of seeing and hearing take pure bare infinitive without 'zu'."
        },
        {
          title: "gehen, bleiben, lassen",
          de: "Ich gehe einkaufen. / Sie bleibt sitzen.",
          en: "I go shopping. / She stays seated.",
          rule: "Motion verbs like 'gehen' and 'fahren' take bare infinitive without 'zu'."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wo steht 'zu' bei trennbaren Verben (z.B. mitbringen)?",
          correct: 1,
          options: ["Vor dem ganzen Verb (zu mitbringen)", "Zwischen Vorsilbe und Stamm (mitzubringen)", "Hinter dem Verb (mitbringen zu)", "Gar nicht"],
          explanation: "Bei trennbaren Verben wird 'zu' zwischen Vorsilbe und Verbstamm eingeschoben: mitzubringen."
        },
        {
          prompt: "Welcher Satz ist grammatisch KORREKT?",
          correct: 2,
          options: ["Ich muss Deutsch zu lernen.", "Ich will einen Termin zu machen.", "Ich habe vor, nach Berlin zu fahren.", "Ich kann gut schwimmen zu."],
          explanation: "Modalverben nehmen NIEMALS 'zu'! Nur 'Ich habe vor, nach Berlin zu fahren' ist korrekt."
        },
        {
          prompt: "Was bedeutet 'um... zu'?",
          correct: 0,
          options: ["Ein Ziel / eine Absicht (in order to)", "Einen Grund (weil)", "Einen Gegensatz (obwohl)", "Eine Bedingung (wenn)"],
          explanation: "'um... zu' drückt eine finale Absicht oder ein Ziel aus ('in order to')."
        }
      ]
    },
    summary: {
      title: "Infinitiv mit 'zu' Mastery Achieved!",
      takeaway: "You can now express personal goals, plans, and instructions with authentic native German structure.",
      bulletPoints: [
        "Infinitive clauses end with '[zu] + [Infinitiv]'.",
        "Separable verbs wedge 'zu' inside: aufzustehen, mitzubringen, anzurufen.",
        "Golden Rule: NEVER use 'zu' with modal verbs (kann, muss, darf, will, soll, möchte)!"
      ]
    }
  },

  // ── 13. B1: ZWEITEILIGE KONNEKTOREN ──
  "b1-konnektoren": {
    id: "b1-konnektoren",
    level: "B1",
    title: "Zweiteilige Konnektoren",
    desc: "The secret to 90%+ in B1 writing: sowohl... als auch, nicht nur... sondern auch, entweder... oder.",
    duration: "12 min",
    badge: "B1 Distinction",
    steps: [
      { title: "1. The Two-Part Connector Blueprint", type: "intro", subtitle: "Connecting Two Options or Advantages" },
      { title: "2. The 5 Core Connectors Table", type: "table", subtitle: "Mastery Comparison Chart" },
      { title: "3. Addition Connector Drill", type: "drill1", subtitle: "sowohl... als auch / nicht nur... sondern auch" },
      { title: "4. Alternative & Contrast Drill", type: "drill2", subtitle: "entweder... oder / zwar... aber" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Matching Connector" },
      { title: "6. Nuances & Word Order Traps", type: "nuance", subtitle: "Position of Verbs & Commas" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How Two-Part Connectors Elevate Your B1 Score",
      description: "Examiners evaluate whether you can link two ideas elegantly. Instead of repeating 'und... und...', two-part connectors show sophisticated sentence construction that guarantees top marks in writing and speaking!",
      exampleCard: {
        title: "The Golden B1 Writing Formula:",
        formula: "Er spricht nicht nur fließend Englisch, sondern auch sehr gutes Deutsch.",
        highlight: "Not only ... but also! Immediate indicator of advanced B1 language command."
      },
      interactiveItems: [
        { german: "sowohl ... als auch", english: "both ... and / as well as", note: "Positive addition (equal weight)" },
        { german: "nicht nur ... sondern auch", english: "not only ... but also", note: "Emphatic addition (second part is even better)" },
        { german: "entweder ... oder", english: "either ... or", note: "Alternative choice (one of the two)" },
        { german: "weder ... noch", english: "neither ... nor", note: "Double negative (neither A nor B)" },
        { german: "zwar ... aber", english: "it is true that ... but", note: "Concession and contrast" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "The 5 Two-Part Connectors Master Matrix",
      description: "Compare the meaning, comma rules, and everyday exam contexts for each connector pair:",
      headers: ["Connector Pair", "Meaning", "Comma Rule", "B1 Exam Example"],
      rows: [
        { col1: "sowohl ... als auch", col2: "both ... and (+ +)", col3: "NO comma", col4: "Ich mag sowohl Tee als auch Kaffee." },
        { col1: "nicht nur ... sondern auch", col2: "not only ... but also (+ ++)", col3: "COMMA before sondern", col4: "Er ist nicht nur freundlich, sondern auch hilfsbereit." },
        { col1: "entweder ... oder", col2: "either ... or (Choice)", col3: "NO comma (usually)", col4: "Wir fahren entweder nach Berlin oder nach Hamburg." },
        { col1: "weder ... noch", col2: "neither ... nor (- -)", col3: "NO comma", col4: "Ich trinke weder Alkohol noch rauche ich." },
        { col1: "zwar ... aber", col2: "admittedly ... but (+ -)", col3: "COMMA before aber", col4: "Die Wohnung ist zwar klein, aber sehr gemütlich." }
      ],
      goldenTip: "Notice: Always place a comma before 'sondern auch' and 'aber'! 'sowohl ... als auch' and 'weder ... noch' NEVER take a comma!"
    },
    drill1: {
      badge: "Step 3: Addition Connector Drill",
      title: "Pair the Addition Connectors",
      description: "Complete the sentence with the matching counterpart:",
      questions: [
        {
          sentence: "Er spricht sowohl Deutsch ___ auch Spanisch fließend.",
          correct: "als",
          options: ["als", "wie", "und", "sondern"],
          explanation: "The set pair is 'sowohl ... als auch' (both ... and)."
        },
        {
          sentence: "Das Hotel ist nicht nur günstig, ___ auch sehr sauber.",
          correct: "sondern",
          options: ["sondern", "aber", "als", "oder"],
          explanation: "The pair is 'nicht nur ..., sondern auch' (not only ..., but also)."
        },
        {
          sentence: "In meiner Freizeit spiele ich sowohl Fußball ___ Basketball.",
          correct: "als auch",
          options: ["als auch", "sondern auch", "oder", "noch"],
          explanation: "Full matching phrase: 'sowohl ... als auch'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Alternative & Contrast Drill",
      title: "Select Alternatives & Concessions",
      description: "Choose the correct connector for choices or contrasting points:",
      questions: [
        {
          sentence: "Wir können ___ mit der Bahn fahren oder ein Auto mieten.",
          correct: "entweder",
          options: ["entweder", "weder", "zwar", "sowohl"],
          explanation: "Paired with 'oder' is 'entweder ... oder' (either ... or)."
        },
        {
          sentence: "Die Prüfung war ___ schwer, aber ich habe sie bestanden.",
          correct: "zwar",
          options: ["zwar", "weder", "entweder", "nicht nur"],
          explanation: "Paired with 'aber' is 'zwar ... aber' (admittedly ..., but)."
        },
        {
          sentence: "Er hat ___ Zeit noch Lust, auf die Party zu gehen.",
          correct: "weder",
          options: ["weder", "entweder", "sowohl", "nicht"],
          explanation: "Paired with 'noch' is 'weder ... noch' (neither ... nor)."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Matching Connector",
      description: "Type the missing connector into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Wir reisen im Sommer",
          blank: "entweder",
          sentenceAfter: "nach Spanien oder nach Italien.",
          hint: "The partner of 'oder'",
          acceptableAnswers: ["entweder", "Wir reisen im Sommer entweder nach Spanien oder nach Italien."],
          explanation: "'entweder ... oder' presents two mutually exclusive choices."
        },
        {
          sentenceBefore: "Das Buch ist nicht nur spannend,",
          blank: "sondern",
          sentenceAfter: "auch sehr lehrreich.",
          hint: "The word before 'auch' in an emphatic addition",
          acceptableAnswers: ["sondern", "Das Buch ist nicht nur spannend, sondern auch sehr lehrreich."],
          explanation: "'nicht nur ..., sondern auch' requires 'sondern'."
        },
        {
          sentenceBefore: "Das neue Smartphone ist zwar teuer,",
          blank: "aber",
          sentenceAfter: "die Kamera ist fantastisch.",
          hint: "The partner of 'zwar'",
          acceptableAnswers: ["aber", "Das neue Smartphone ist zwar teuer, aber die Kamera ist fantastisch."],
          explanation: "'zwar ..., aber' introduces a positive counterpoint to a drawback."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Comma Rules",
      title: "Punctuation & Stylistic Precision",
      description: "Avoid common punctuation mistakes that cost points in B1 writing:",
      cards: [
        {
          title: "The Comma Rule with 'sondern'",
          de: "Er arbeitet nicht nur viel, sondern er treibt auch viel Sport.",
          en: "He not only works a lot, but he also exercises a lot.",
          rule: "Always write a comma before 'sondern'. If two full clauses are connected, keep standard subject-verb word order."
        },
        {
          title: "NO Comma with 'sowohl... als auch'",
          de: "Sie lernt sowohl Grammatik als auch Wortschatz.",
          en: "She studies both grammar and vocabulary.",
          rule: "Never put a comma before 'als auch' in German!"
        },
        {
          title: "Double Negative 'weder... noch'",
          de: "Er spricht weder Französisch noch Spanisch.",
          en: "He speaks neither French nor Spanish.",
          rule: "Do NOT add 'nicht' or 'kein'! 'weder... noch' already makes the sentence completely negative."
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Welcher Konnektor gehört zu 'sondern auch'?",
          correct: 1,
          options: ["sowohl", "nicht nur", "weder", "entweder"],
          explanation: "'nicht nur ..., sondern auch' ist das feste Konnektoren-Paar."
        },
        {
          prompt: "Darf vor 'als auch' ein Komma stehen?",
          correct: 0,
          options: ["Nein, niemals", "Ja, immer", "Nur wenn ein Verb folgt", "Es ist freigestellt"],
          explanation: "Vor 'als auch' steht im Deutschen niemals ein Komma."
        },
        {
          prompt: "Was bedeutet 'weder... noch'?",
          correct: 3,
          options: ["beides", "nur eines von beiden", "vielleicht beides", "keines von beiden (doppelte Verneinung)"],
          explanation: "'weder... noch' bedeutet, dass keines der beiden Dinge zutrifft."
        }
      ]
    },
    summary: {
      title: "Zweiteilige Konnektoren Mastery Achieved!",
      takeaway: "You have now unlocked the key to top-tier B1 essay points and sophisticated speaking presentations.",
      bulletPoints: [
        "Use 'nicht nur ..., sondern auch' to emphasize two strong points in writing.",
        "Use 'zwar ..., aber' to discuss pros and cons objectively in Speaking Part 2.",
        "Remember the comma rules: comma before 'sondern' and 'aber'; no comma for 'als auch' and 'noch'!"
      ]
    }
  },

  // ── 14. A2: MODALVERBEN IM PRÄTERITUM ──
  "a2-modalverben": {
    id: "a2-modalverben",
    level: "A2",
    title: "Modalverben im Präteritum (konnte, musste)",
    desc: "The #1 past tense formula for B1 writing excuses and daily stories: konnte, musste, durfte, wollte.",
    duration: "12 min",
    badge: "Writing Core",
    steps: [
      { title: "1. The Past Modal Blueprint", type: "intro", subtitle: "No Umlauts in Präteritum!" },
      { title: "2. The Präteritum Modal Table", type: "table", subtitle: "All 6 Modal Verbs in Past" },
      { title: "3. 'musste' vs 'konnte' Drill", type: "drill1", subtitle: "Obligation vs Ability" },
      { title: "4. Excuse Writing Drill", type: "drill2", subtitle: "Doctor, Illness, Work Delays" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Past Modal Verb" },
      { title: "6. Nuances: Präteritum vs Perfekt", type: "nuance", subtitle: "Why Germans NEVER use Perfekt for Modals" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "Why Past Modals are Essential for B1 Letters",
      description: "In almost every B1 writing test, you must apologize for missing an appointment or class: 'I had to go to the doctor', 'I could not come'. For modal verbs, Germans ALWAYS use Präteritum (never Perfekt)!",
      exampleCard: {
        title: "The Golden Umlaut-Dropping Rule:",
        formula: "All umlauts (ö, ü) disappear in Präteritum! | können -> konnte | müssen -> musste | dürfen -> durfte",
        highlight: "ich musste zum Arzt gehen. (NOT: ich habe gemusst!)"
      },
      interactiveItems: [
        { german: "Ich konnte gestern nicht kommen.", english: "I could not come yesterday.", note: "Inability / illness" },
        { german: "Ich musste lange arbeiten.", english: "I had to work late.", note: "Work obligation" },
        { german: "Wir wollten Sie anrufen.", english: "We wanted to call you.", note: "Intention in the past" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "The 6 Modal Verbs in Präteritum",
      description: "Notice that 'ich' and 'er/sie/es' forms are ALWAYS identical in Präteritum:",
      headers: ["Infinitive", "Meaning", "ich / er / sie / es", "du", "wir / sie / Sie"],
      rows: [
        { col1: "können", col2: "could / was able to", col3: "konnte", col4: "konntest", col5: "konnten" },
        { col1: "müssen", col2: "had to / was obliged", col3: "musste", col4: "musstest", col5: "mussten" },
        { col1: "dürfen", col2: "was allowed to", col3: "durfte", col4: "durftest", col5: "durften" },
        { col1: "wollen", col2: "wanted to", col3: "wollte", col4: "wolltest", col5: "wollten" },
        { col1: "sollen", col2: "was supposed to", col3: "sollte", col4: "solltest", col5: "sollten" }
      ],
      goldenTip: "Golden Rule: 'ich' and 'er/sie/es' NEVER take a -t ending in Präteritum! It is 'ich konnte' and 'er konnte'!"
    },
    drill1: {
      badge: "Step 3: 'musste' vs 'konnte' Drill",
      title: "Choose the Correct Past Modal",
      description: "Distinguish between obligations (musste) and ability or permissions (konnte / durfte):",
      questions: [
        {
          sentence: "Entschuldigung, ich ___ gestern nicht zum Unterricht kommen, weil ich krank war.",
          correct: "konnte",
          options: ["konnte", "musste", "durfte", "wollte"],
          explanation: "Inability due to illness: 'konnte nicht kommen'."
        },
        {
          sentence: "Mein Sohn hatte hohes Fieber, deshalb ___ ich sofort mit ihm zum Kinderarzt fahren.",
          correct: "musste",
          options: ["musste", "durfte", "konntest", "sollt"],
          explanation: "Urgent obligation: 'musste ... fahren'."
        },
        {
          sentence: "Als Kind ___ ich abends nicht lange draußen bleiben.",
          correct: "durfte",
          options: ["durfte", "musste", "wolltest", "konnten"],
          explanation: "Parental rule/permission: 'durfte nicht bleiben'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: B1 Letter Excuse Drill",
      title: "Select High-Scoring Written Excuses",
      description: "Pick the standard B1 written excuse phrases:",
      questions: [
        {
          sentence: "Sehr geehrte Damen und Herren, leider ___ ich meinen Termin gestern nicht wahrnehmen.",
          correct: "konnte",
          options: ["konnte", "kann", "könnte", "habe gekonnt"],
          explanation: "Past appointment cancellation in an official letter: 'konnte nicht wahrnehmen'."
        },
        {
          sentence: "Wir ___ eigentlich gestern anreisen, aber unser Zug hatte zwei Stunden Verspätung.",
          correct: "wollten",
          options: ["wollten", "mussten", "durften", "sollten"],
          explanation: "Original plan in the past: 'wollten eigentlich anreisen'."
        },
        {
          sentence: "Der Arzt hat gesagt, dass ich drei Tage im Bett bleiben ___.",
          correct: "sollte",
          options: ["sollte", "musst", "könntest", "durften"],
          explanation: "Doctor's advice reported in the past: 'sollte bleiben'."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Past Modal Verb",
      description: "Type the exact Präteritum form into the blank (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Gestern",
          blank: "musste",
          sentenceAfter: "ich bis 20 Uhr im Büro bleiben.",
          hint: "Past of müssen for 'ich' (no umlaut!)",
          acceptableAnswers: ["musste", "Gestern musste ich bis 20 Uhr im Büro bleiben."],
          explanation: "Obligation in the past: 'musste'."
        },
        {
          sentenceBefore: "Leider",
          blank: "konnten",
          sentenceAfter: "wir Sie telefonisch nicht erreichen.",
          hint: "Past of können for 'wir'",
          acceptableAnswers: ["konnten", "Leider konnten wir Sie telefonisch nicht erreichen."],
          explanation: "Plural past form: 'konnten'."
        },
        {
          sentenceBefore: "Ich",
          blank: "wollte",
          sentenceAfter: "dir schon gestern schreiben, hatte aber kein Internet.",
          hint: "Past of wollen for 'ich'",
          acceptableAnswers: ["wollte", "Ich wollte dir schon gestern schreiben, hatte aber kein Internet."],
          explanation: "'wollte' expresses past intention."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Golden Exam Secrets",
      title: "Why Germans NEVER use Perfekt for Modals",
      description: "Technically German has a Perfekt form ('hat ... gekonnt'), but in 99% of spoken and written German, Präteritum is preferred:",
      cards: [
        {
          title: "Sound Natural: Use Präteritum",
          de: "Ich musste arbeiten. (NATURAL) vs Ich habe arbeiten gemusst. (CLUNKY)",
          en: "I had to work.",
          rule: "Even in casual speaking, always use 'konnte, musste, wollte'. It is simpler, cleaner, and 100% natural."
        },
        {
          title: "The Umlaut-Drop Memory Rule",
          de: "können -> konnte | müssen -> musste | dürfen -> durfte",
          en: "Umlauts always drop in Präteritum.",
          rule: "If it has an umlaut in the past ('könnte'), it is Konjunktiv II (hypothetical), NOT past tense!"
        },
        {
          title: "Identical 1st & 3rd Person",
          de: "ich konnte = er/sie/es konnte | ich musste = er/sie/es musste",
          en: "I was able to = he was able to",
          rule: "Never add a '-t' to 3rd person singular in Präteritum!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Haben Modalverben im Präteritum einen Umlaut (ö, ü)?",
          correct: 1,
          options: ["Ja, immer", "Nein, niemals", "Nur im Plural", "Nur bei 'müssen'"],
          explanation: "Im Präteritum verlieren alle Modalverben ihre Umlaute: konnte, musste, durfte."
        },
        {
          prompt: "Wie lautet die 3. Person Singular von 'können' im Präteritum?",
          correct: 0,
          options: ["er konnte", "er konntet", "er hat gekonnt", "er könnte"],
          explanation: "Die 1. und 3. Person Singular sind identisch und haben kein -t: 'er konnte'."
        },
        {
          prompt: "Welcher Satz ist der Standard für eine B1-Entschuldigung im Brief?",
          correct: 2,
          options: ["Ich habe zum Arzt gehen müssen.", "Ich muss gestern zum Arzt.", "Ich musste gestern dringend zum Arzt gehen.", "Ich bin zum Arzt gemusst."],
          explanation: "'Ich musste gestern dringend zum Arzt gehen' ist die perfekte Standard-Formel."
        }
      ]
    },
    summary: {
      title: "Modalverben im Präteritum Mastery Achieved!",
      takeaway: "You can now write authentic apology and excuse letters for your B1 exam with zero effort.",
      bulletPoints: [
        "Drop all umlauts: können -> konnte, müssen -> musste, dürfen -> durfte.",
        "Forms for 'ich' and 'er/sie/es' are always 100% identical.",
        "Always use Präteritum instead of Perfekt for modal verbs in both speaking and writing!"
      ]
    }
  },

  // ── 15. A1: TRENNBARE VERBEN IM ALLTAG ──
  "a1-trennbar": {
    id: "a1-trennbar",
    level: "A1",
    title: "Trennbare Verben im Alltag (aufstehen, einkaufen)",
    desc: "Master the iconic German sentence bracket: the prefix flies to the absolute end of the sentence.",
    duration: "10 min",
    badge: "Core Essential",
    steps: [
      { title: "1. The Bracket Blueprint Formula", type: "intro", subtitle: "Prefix detaches to the very end" },
      { title: "2. The 8 Core Separable Prefixes", type: "table", subtitle: "ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-" },
      { title: "3. Sentence Bracket Drill", type: "drill1", subtitle: "Position 2 and End Placement" },
      { title: "4. Daily Routine Drill", type: "drill2", subtitle: "aufstehen, anrufen, mitbringen" },
      { title: "5. Active Typing Mode", type: "typing", subtitle: "Type the Detached Prefix" },
      { title: "6. Traps: Separable vs Inseparable", type: "nuance", subtitle: "be-, ge-, er-, ver-, zer- never separate!" },
      { title: "7. Mini Sprint Quiz", type: "quiz", subtitle: "3 Fast Exam Questions" },
      { title: "8. Lesson Mastery Summary", type: "summary", subtitle: "Score & Completion Celebration" }
    ],
    intro: {
      badge: "Step 1: Core Formula",
      title: "How Separable Verbs Form the German Sentence Bracket",
      description: "Many German verbs carry a prefix (Vorsilbe). In a simple present sentence, the verb splits: the stem is conjugated on Position 2, while the prefix flies to the absolute end of the sentence!",
      exampleCard: {
        title: "The Iconic Sentence Bracket (Satzklammer):",
        formula: "aufstehen: Ich [stehe] jeden Morgen um 6:30 Uhr [auf].",
        highlight: "Stem on Position 2 | Prefix on the very last word before the period!"
      },
      interactiveItems: [
        { german: "einkaufen: Ich kaufe im Supermarkt ein.", english: "I shop at the supermarket.", note: "ein- goes to end" },
        { german: "anrufen: Wann rufst du mich an?", english: "When are you calling me?", note: "an- goes to end" },
        { german: "mitbringen: Er bringt einen Kuchen mit.", english: "He brings a cake along.", note: "mit- goes to end" }
      ]
    },
    table: {
      badge: "Step 2: Golden Master Table",
      title: "The 8 Most Common Separable Prefixes",
      description: "These 8 prefixes always stress the first syllable and detach in present and past tense:",
      headers: ["Prefix", "Core Meaning", "Example Verb", "Present Tense Sentence"],
      rows: [
        { col1: "auf-", col2: "up / open", col3: "aufstehen", col4: "Ich stehe früh auf." },
        { col1: "an-", col2: "on / at / to", col3: "anrufen", col4: "Er ruft seine Mutter an." },
        { col1: "ein-", col2: "in / into", col3: "einkaufen", col4: "Wir kaufen samstags ein." },
        { col1: "aus-", col2: "out / off", col3: "aussteigen", col4: "Sie steigen am Bahnhof aus." },
        { col1: "mit-", col2: "along / with", col3: "mitbringen", col4: "Bringst du etwas mit?" },
        { col1: "ab-", col2: "off / away", col3: "abfahren", col4: "Der Zug fährt um 9 Uhr ab." },
        { col1: "vor-", col2: "forward / introduce", col3: "vorstellen", col4: "Ich stelle mich kurz vor." },
        { col1: "zu-", col2: "shut / closed", col3: "zumachen", col4: "Mach bitte das Fenster zu!" }
      ],
      goldenTip: "Pronunciation Rule: The prefix is ALWAYS stressed heavily when speaking ('ÁUF-stehen', 'ÉIN-kaufen')!"
    },
    drill1: {
      badge: "Step 3: Sentence Bracket Drill",
      title: "Slot the Detached Prefix at the End",
      description: "Pick the matching detached prefix to complete the sentence bracket:",
      questions: [
        {
          sentence: "Der Bus fährt pünktlich am Hauptbahnhof ___ (abfahren).",
          correct: "ab",
          options: ["ab", "an", "auf", "aus"],
          explanation: "Verb 'abfahren' splits: 'fährt ... ab'."
        },
        {
          sentence: "Ich stehe am Wochenende meistens erst um 9 Uhr ___ (aufstehen).",
          correct: "auf",
          options: ["auf", "aus", "ein", "an"],
          explanation: "Verb 'aufstehen' splits: 'stehe ... auf'."
        },
        {
          sentence: "Rufst du mich heute Abend bitte kurz ___ (anrufen)?",
          correct: "an",
          options: ["an", "auf", "mit", "ab"],
          explanation: "Verb 'anrufen' splits: 'Rufst ... an'."
        }
      ]
    },
    drill2: {
      badge: "Step 4: Daily Routine Drill",
      title: "Conjugate Daily Routine Verbs",
      description: "Choose the correct conjugated verb stem on Position 2:",
      questions: [
        {
          sentence: "Wir ___ jeden Freitagabend im Bioladen ein.",
          correct: "kaufen",
          options: ["kaufen", "kauft", "kaufe", "einkaufen"],
          explanation: "Subject 'wir' takes stem 'kaufen' on Position 2, 'ein' at the end."
        },
        {
          sentence: "Wann ___ der Zug in Frankfurt an?",
          correct: "kommt",
          options: ["kommt", "kommen", "kam", "ankommt"],
          explanation: "Subject 'der Zug' (er) takes 3rd person singular 'kommt' on Position 2."
        },
        {
          sentence: "Ich ___ mich kurz bei Ihnen vor.",
          correct: "stelle",
          options: ["stelle", "stellst", "stellen", "vorstelle"],
          explanation: "sich vorstellen: 'Ich stelle mich ... vor'."
        }
      ]
    },
    typingWorkout: {
      badge: "Step 5: Active Typing",
      title: "Type the Detached Prefix",
      description: "Type the missing prefix into the blank at the end (or type the entire completed sentence):",
      items: [
        {
          sentenceBefore: "Ich stehe jeden Tag um 7 Uhr",
          blank: "auf",
          sentenceAfter: ".",
          hint: "Prefix of aufstehen",
          acceptableAnswers: ["auf", "Ich stehe jeden Tag um 7 Uhr auf."],
          explanation: "'aufstehen' splits into 'stehe ... auf'."
        },
        {
          sentenceBefore: "Mein Kollege ruft mich gleich",
          blank: "an",
          sentenceAfter: ".",
          hint: "Prefix of anrufen",
          acceptableAnswers: ["an", "Mein Kollege ruft mich gleich an."],
          explanation: "'anrufen' splits into 'ruft ... an'."
        },
        {
          sentenceBefore: "Bitte mach die Tür leise",
          blank: "zu",
          sentenceAfter: "!",
          hint: "Prefix of zumachen (to close)",
          acceptableAnswers: ["zu", "Bitte mach die Tür leise zu!"],
          explanation: "'zumachen' splits into 'mach ... zu'."
        }
      ]
    },
    nuance: {
      badge: "Step 6: Traps & Inseparable Verbs",
      title: "Inseparable Verbs NEVER Split!",
      description: "Be careful: verbs with the prefixes 'be-, ge-, er-, ver-, zer-, ent-, emp-, miss-' NEVER detach!",
      cards: [
        {
          title: "Inseparable: 'verstehen'",
          de: "Ich verstehe die Frage. (NEVER: Ich stehe die Frage ver!)",
          en: "I understand the question.",
          rule: "Prefixes like 'ver-' and 'be-' are unstressed and remain glued to the stem."
        },
        {
          title: "Inseparable: 'bezahlen'",
          de: "Ich bezahle die Rechnung. (NEVER: Ich zahle die Rechnung be!)",
          en: "I pay the bill.",
          rule: "The prefix 'be-' never separates in any tense."
        },
        {
          title: "With Modal Verbs: Glued at End",
          de: "Ich muss morgen früh aufstehen.",
          en: "I have to get up early tomorrow.",
          rule: "When a modal verb takes Position 2, the separable verb stays WHOLE at the end of the sentence!"
        }
      ]
    },
    quiz: {
      badge: "Step 7: Sprint Quiz",
      title: "Sprint Verification: 3 Fast Questions",
      questions: [
        {
          prompt: "Wo steht die trennbare Vorsilbe in einem Hauptsatz im Präsens?",
          correct: 2,
          options: ["Auf Position 1", "Auf Position 2", "Am absoluten Satzende", "Direkt hinter dem Subjekt"],
          explanation: "Die trennbare Vorsilbe wandert immer ans absolute Satzende."
        },
        {
          prompt: "Welches Verb ist NICHT trennbar?",
          correct: 1,
          options: ["aufstehen", "verstehen", "einkaufen", "mitbringen"],
          explanation: "'verstehen' hat die Vorsilbe 'ver-', die niemals trennbar ist."
        },
        {
          prompt: "Was passiert mit einem trennbaren Verb, wenn ein Modalverb im Satz steht?",
          correct: 0,
          options: ["Es bleibt ungetrennt am Satzende als Infinitiv", "Es trennt sich trotzdem", "Die Vorsilbe entfällt", "Es wird zu Partizip II"],
          explanation: "Mit Modalverb bleibt das trennbare Verb ungetrennt als Infinitiv am Satzende: 'Ich muss aufstehen'."
        }
      ]
    },
    summary: {
      title: "Trennbare Verben Mastery Achieved!",
      takeaway: "You have mastered the iconic German sentence bracket for all daily routines and conversations.",
      bulletPoints: [
        "In present tense, the stem is on Position 2, while the prefix sits at the very end.",
        "Prefixes with 'be-, ge-, er-, ver-, zer-' NEVER separate.",
        "When paired with a modal verb (muss, will, kann), the verb stays intact as an infinitive at the end!"
      ]
    }
  }

};
