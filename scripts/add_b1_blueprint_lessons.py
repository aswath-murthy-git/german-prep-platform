#!/usr/bin/env python3
"""
Adds 7 new deep interactive blueprint lessons to src/data/learn_academy_lessons.ts
Strictly 0 em dashes (\u2014) and 0 banned alcohol/smoking emojis.
"""
import re
import sys

NEW_LESSONS = """
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
"""

def main():
    target_path = "src/data/learn_academy_lessons.ts"
    with open(target_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the closing "};" at the end of LEARN_ACADEMY_LESSONS
    # We will insert NEW_LESSONS right before the last "};"
    last_closing_brace = content.rfind("};")
    if last_closing_brace == -1:
        print("Could not find closing brace in file")
        sys.exit(1)

    # Check if "b1-wenn" is already in content
    if "b1-wenn" in content:
        print("b1-wenn already exists, skipping append")
        return

    updated = content[:last_closing_brace] + NEW_LESSONS + "\n};\n"

    # Verify no em dashes and no banned emojis
    assert "\u2014" not in updated, "Found em dash in updated content!"
    for forbidden in ["🍷", "🍸", "🍺", "🍻", "🥂", "🥃", "🍹", "🚬"]:
        assert forbidden not in updated, f"Found forbidden emoji {forbidden}!"

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(updated)
    print("Successfully appended 7 new blueprint lessons to learn_academy_lessons.ts")

if __name__ == "__main__":
    main()

