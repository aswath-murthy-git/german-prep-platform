import json

output_path = "/Users/testy/Desktop/code/german-prep-platform/src/data/a0_to_b1_master_data.ts"

content = '''// A0 to B1 Guaranteed Pass Blueprint Data
// Strictly 0 em-dashes and 0 alcohol/smoking emojis

export interface FlightStage {
  stageId: string;
  level: "A0" | "A1" | "A2" | "B1" | "EXAM_HACKS";
  title: string;
  tagline: string;
  timeEstimate: string;
  coachPhilosophy: string;
  targetVocabCount: number;
  coreMilestones: {
    id: string;
    title: string;
    description: string;
    ruleFormula: string;
    exampleDe: string;
    exampleEn: string;
    trapToAvoid: string;
    recommendedLab: "GRAMMAR" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "PRACTICE" | "FAST_TRACK";
  }[];
  quickDrills: {
    id: string;
    prompt: string;
    sentence: string;
    options: string[];
    correct: string;
    explanation: string;
  }[];
}

export interface B1CheatCode {
  id: string;
  title: string;
  badge: string;
  problem: string;
  secretHack: string;
  interactiveToolType: "SUFFIX_SORTER" | "VERB_KICKER" | "EMAIL_TEMPLATE" | "SAFETY_PHRASES" | "CALCULATOR_60";
  contentItems: {
    label: string;
    detail: string;
    example?: string;
  }[];
}

export const ZERO_TO_B1_FLIGHT_STAGES: FlightStage[] = [
  {
    stageId: "stage-a0",
    level: "A0",
    title: "Stage 0: The Survival Skeleton",
    tagline: "Absolute Beginner • Zero German Knowledge to First Working Sentences",
    timeEstimate: "Days 1 to 10 (30 min daily)",
    coachPhilosophy: "Do not touch complex grammar yet. Master the 4 regular verb endings and the German sound system. Once you can say 'Ich heiße...', 'Ich wohne in...', and 'Ich lerne Deutsch', your brain stops fearing German.",
    targetVocabCount: 150,
    coreMilestones: [
      {
        id: "a0-m1",
        title: "The Regular Verb Ending Code (-e, -st, -t, -en)",
        description: "90% of all German verbs in present tense use the exact same 4 endings. Strip the -en from the infinitive and snap on the pronoun ending.",
        ruleFormula: "ich: -e | du: -st | er/sie/es: -t | wir: -en | ihr: -t | sie/Sie: -en",
        exampleDe: "Ich spiel-e Fußball. Du wohn-st in Berlin. Er lern-t Deutsch.",
        exampleEn: "I play soccer. You live in Berlin. He learns German.",
        trapToAvoid: "Never say 'Ich spielen' or 'Er lerne'. The verb ending must match the subject pronoun.",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "a0-m2",
        title: "The Golden Position 2 Rule (Hauptsatz)",
        description: "In normal German main clauses, the conjugated verb ALWAYS sits in position 2. No matter what starts the sentence, the verb cannot move.",
        ruleFormula: "Position 1 (Subject or Time) + Position 2 (Conjugated Verb) + Rest",
        exampleDe: "Heute lern-e ich Deutsch. (Time in pos 1, verb stays in pos 2!)",
        exampleEn: "Today I learn German.",
        trapToAvoid: "Do not copy English word order ('Heute ich lerne' is WRONG). The verb must be in position 2.",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "a0-m3",
        title: "The 2 Essential Helpers: Sein & Haben",
        description: "You cannot speak, pass A1, or form past tense later without mastering 'sein' (to be) and 'haben' (to have).",
        ruleFormula: "sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind | haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben",
        exampleDe: "Ich bin müde. Ich habe einen Termin.",
        exampleEn: "I am tired. I have an appointment.",
        trapToAvoid: "Mixing up 'ich bin' (identity/state) and 'ich habe' (possession/age in other languages). In German: 'Ich bin 30 Jahre alt'.",
        recommendedLab: "PRACTICE"
      },
      {
        id: "a0-m4",
        title: "Asking Questions (W-Fragen & Ja/Nein Fragen)",
        description: "To survive in Germany and pass oral exams, you must ask questions. W-questions keep the verb in position 2. Yes/No questions put the verb in position 1.",
        ruleFormula: "W-Frage: Woher / Was / Wie / Wann + Verb + Subject? | Ja/Nein: Verb + Subject + Rest?",
        exampleDe: "Wo wohnen Sie? / Kommst du aus Spanien?",
        exampleEn: "Where do you live? / Do you come from Spain?",
        trapToAvoid: "Do not use 'Do you...' helpers. German flips the verb directly: 'Wohnst du...?'",
        recommendedLab: "SPEAKING"
      }
    ],
    quickDrills: [
      {
        id: "a0-d1",
        prompt: "Choose the correct ending for 'ich':",
        sentence: "Ich ___ in Frankfurt. (wohnen)",
        options: ["wohne", "wohnst", "wohnt", "wohnen"],
        correct: "wohne",
        explanation: "The pronoun 'ich' always takes the ending '-e': ich wohne."
      },
      {
        id: "a0-d2",
        prompt: "Apply the Verb in Position 2 rule:",
        sentence: "Morgen ___ wir nach München. (fahren)",
        options: ["fahren", "wir fahren", "fahrt", "gefahren"],
        correct: "fahren",
        explanation: "Since 'Morgen' occupies Position 1, the conjugated verb 'fahren' must occupy Position 2 immediately."
      },
      {
        id: "a0-d3",
        prompt: "Complete with the correct form of 'sein':",
        sentence: "Du ___ sehr nett.",
        options: ["bist", "bin", "ist", "seid"],
        correct: "bist",
        explanation: "'du' conjugates with 'bist': Du bist sehr nett."
      }
    ]
  },
  {
    stageId: "stage-a1",
    level: "A1",
    title: "Stage 1: The Sentence Builder",
    tagline: "Elementary Control • Nominativ vs Akkusativ & Noun Genders",
    timeEstimate: "Days 11 to 25 (35 min daily)",
    coachPhilosophy: "Here is where most people get scared of German cases. But at A1, you only need Nominativ (the subject who does the action) and Akkusativ (the direct object being acted upon). The only article that changes is masculine: der becomes den!",
    targetVocabCount: 450,
    coreMilestones: [
      {
        id: "a1-m1",
        title: "The Akkusativ Shift: Only Masculine Changes!",
        description: "In Akkusativ (direct objects), feminine (die/eine), neuter (das/ein), and plural (die) DO NOT CHANGE. Only masculine flips from der/ein to den/einen.",
        ruleFormula: "der Mann -> den Mann | ein Hund -> einen Hund | (die, das, die stay identical)",
        exampleDe: "Ich habe einen Hund (der Hund) und eine Katze (die Katze).",
        exampleEn: "I have a dog and a cat.",
        trapToAvoid: "Changing 'das' or 'die' in accusative. Keep them identical: 'Ich sehe das Auto'.",
        recommendedLab: "CASES"
      },
      {
        id: "a1-m2",
        title: "The 10 Golden Gender Suffix Rules (Der, Die, Das Decoded)",
        description: "Stop memorizing genders randomly. Suffixes tell you the gender 80% of the time: -ung, -heit, -keit, -schaft, -tion are ALWAYS 'die'.",
        ruleFormula: "-ung, -heit, -keit, -schaft, -tion, -tät = DIE (100%) | -ling, -or, -ismus = DER | -chen, -lein, -um, -ment = DAS",
        exampleDe: "die Wohnung, die Freiheit, die Möglichkeit, das Mädchen, der Schmetterling.",
        exampleEn: "the apartment, freedom, possibility, the girl, the butterfly.",
        trapToAvoid: "Guessing genders for words ending in -ung or -heit. They are always feminine (die).",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "a1-m3",
        title: "Separable Verbs in Action (Trennbare Verben)",
        description: "Verbs like einkaufen, aufstehen, anrufen split in the present tense: the prefix flies to the absolute end of the clause.",
        ruleFormula: "Subject + Base Verb (Pos 2) + ... + Prefix (End of Sentence)",
        exampleDe: "Ich steh-e jeden Tag um 7 Uhr auf. (aufstehen)",
        exampleEn: "I get up every day at 7 AM.",
        trapToAvoid: "Leaving the prefix attached to the verb in a main clause ('Ich aufstehe' is completely wrong).",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "a1-m4",
        title: "Modal Verbs Formula: The Sentence Bracket (Satzklammer)",
        description: "Modal verbs (können, müssen, wollen, dürfen, sollen, möchten) take position 2, while the second verb goes in the infinitive to the very end.",
        ruleFormula: "Subject + Modal Verb (Pos 2) + Details + Infinitive (End)",
        exampleDe: "Ich kann sehr gut Deutsch sprechen.",
        exampleEn: "I can speak German very well.",
        trapToAvoid: "Conjugating the end verb. The end verb must ALWAYS remain in its base -en infinitive form.",
        recommendedLab: "GRAMMAR"
      }
    ],
    quickDrills: [
      {
        id: "a1-d1",
        prompt: "Identify the correct Akkusativ masculine article:",
        sentence: "Ich kaufe ___ neuen Laptop. (der Laptop)",
        options: ["einen", "ein", "eine", "einem"],
        correct: "einen",
        explanation: "Der Laptop is masculine. In Akkusativ, 'ein' becomes 'einen'."
      },
      {
        id: "a1-d2",
        prompt: "Complete the separable verb sentence:",
        sentence: "Wir kaufen heute im Supermarkt ___. (einkaufen)",
        options: ["ein", "auf", "an", "ab"],
        correct: "ein",
        explanation: "The prefix 'ein-' from 'einkaufen' moves to the very end of the main clause."
      },
      {
        id: "a1-d3",
        prompt: "Position the infinitive with a modal verb:",
        sentence: "Können Sie mir bitte die Dokumente ___?",
        options: ["schicken", "schicke", "schickst", "geschickt"],
        correct: "schicken",
        explanation: "The modal verb 'können' sends the secondary verb to the end in the infinitive (-en)."
      }
    ]
  },
  {
    stageId: "stage-a2",
    level: "A2",
    title: "Stage 2: Everyday Flow & The Past Tense",
    tagline: "Conversational Bridge • Perfekt (haben/sein) & Dative Prepositions",
    timeEstimate: "Days 26 to 45 (40 min daily)",
    coachPhilosophy: "In spoken German and everyday emails, Germans do not use Präteritum for most verbs: they use PERFEKT! If you master 'Ich habe gemacht' and 'Ich bin gefahren', plus the 7 fixed Dative prepositions, you unlock 90% of real conversation.",
    targetVocabCount: 850,
    coreMilestones: [
      {
        id: "a2-m1",
        title: "The Perfekt Formula: Haben vs. Sein",
        description: "Use 'sein' for movement (gehen, fahren, fliegen, kommen) or state change (aufwachen, sterben). Use 'haben' for almost everything else. Partizip II sits at the end.",
        ruleFormula: "Subject + haben/sein (Pos 2) + ... + Partizip II (ge-...-t / ge-...-en at End)",
        exampleDe: "Ich habe gestern gearbeitet. / Ich bin nach Berlin gefahren.",
        exampleEn: "I worked yesterday. / I traveled to Berlin.",
        trapToAvoid: "Using 'haben' with motion verbs ('Ich habe gefahren' is wrong; it must be 'Ich bin gefahren').",
        recommendedLab: "PRACTICE"
      },
      {
        id: "a2-m2",
        title: "The 7 Dative Kings (Always Dativ!)",
        description: "These 7 prepositions always force Dativ, without asking any questions: aus, bei, mit, nach, seit, von, zu.",
        ruleFormula: "aus, bei, mit, nach, seit, von, zu + DATIV (dem, der, dem, den + n)",
        exampleDe: "Ich wohne seit einem Jahr bei meiner Tante und fahre mit dem Bus zur Arbeit.",
        exampleEn: "I have been living with my aunt for a year and take the bus to work.",
        trapToAvoid: "Using Akkusativ after 'mit' or 'zu'. 'Mit den Bus' is wrong; it is always 'mit dem Bus'.",
        recommendedLab: "CASES"
      },
      {
        id: "a2-m3",
        title: "Präteritum of War, Hatte & Modal Verbs",
        description: "Germans rarely use Präteritum in speech, EXCEPT for three verbs: sein (war), haben (hatte), and modal verbs (konnte, musste, durfte, wollte).",
        ruleFormula: "ich war, du warst | ich hatte, du hattest | ich konnte, ich musste, ich wollte",
        exampleDe: "Gestern war ich krank und konnte nicht arbeiten.",
        exampleEn: "Yesterday I was sick and couldn't work.",
        trapToAvoid: "Overcomplicating past modal verbs with 'habe gekonnt'. In writing and speaking, use 'konnte' and 'musste'.",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "a2-m4",
        title: "Reflexive Verbs in Daily Life",
        description: "Verbs of daily routine require reflexive pronouns: sich freuen, sich interessieren, sich anmelden, sich treffen.",
        ruleFormula: "ich freue mich, du freust dich, er freut sich, wir freuen uns, ihr freut euch, sie freuen sich",
        exampleDe: "Ich freue mich auf die Reise. / Ich treffe mich mit Markus.",
        exampleEn: "I look forward to the trip. / I am meeting with Markus.",
        trapToAvoid: "Forgetting the pronoun 'mich' or 'sich'. 'Ich freue' is incomplete.",
        recommendedLab: "GRAMMAR"
      }
    ],
    quickDrills: [
      {
        id: "a2-d1",
        prompt: "Choose the correct auxiliary (haben or sein) for motion:",
        sentence: "Wir ___ am Wochenende nach Hamburg gefahren.",
        options: ["sind", "haben", "waren", "hatten"],
        correct: "sind",
        explanation: "Fahren involves physical movement from A to B, requiring 'sein' (wir sind gefahren)."
      },
      {
        id: "a2-d2",
        prompt: "Select the correct Dativ form after 'mit':",
        sentence: "Ich fahre jeden Morgen mit ___ U-Bahn. (die U-Bahn)",
        options: ["der", "die", "dem", "den"],
        correct: "der",
        explanation: "'mit' always triggers Dativ. Feminine 'die' becomes 'der' in Dativ: mit der U-Bahn."
      },
      {
        id: "a2-d3",
        prompt: "Select the correct past tense of 'können':",
        sentence: "Gestern ___ ich leider nicht kommen, weil ich Fieber hatte.",
        options: ["konnte", "kann", "gekonnt", "könnte"],
        correct: "konnte",
        explanation: "The simple past of 'ich kann' is 'ich konnte'."
      }
    ]
  },
  {
    stageId: "stage-b1",
    level: "B1",
    title: "Stage 3: The B1 Pass Architecture",
    tagline: "The Exam Winner • Subordinate Clauses & Polite Konjunktiv II",
    timeEstimate: "Days 46 to 65 (40 min daily)",
    coachPhilosophy: "This is what examiners grade you on for B1. If your letter only has short sentences ('Ich komme. Ich bin krank.'), you fail. If you link them with 'weil' and 'obwohl' and kick the verb to the end, and use 'Könnten Sie bitte...', you score maximum points automatically.",
    targetVocabCount: 1500,
    coreMilestones: [
      {
        id: "b1-m1",
        title: "The B1 'Verb Kicker' Rule (weil, dass, obwohl, wenn)",
        description: "Subordinate conjunctions are like a magnet that kicks the conjugated verb to the very last position in the clause.",
        ruleFormula: "Hauptsatz (Verb pos 2) + , + weil / dass / obwohl / wenn + Subject + ... + CONJUGATED VERB (END)",
        exampleDe: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.",
        exampleEn: "I learn German because I want to work in Germany.",
        trapToAvoid: "Putting the verb next to 'weil' ('weil ich möchte arbeiten' is an instant B1 penalty). The conjugated verb 'möchte' must go to the end.",
        recommendedLab: "CONJUNCTIONS"
      },
      {
        id: "b1-m2",
        title: "Konjunktiv II: The Official Letter Pass Formula",
        description: "Official letters and oral requests require politeness. Replace blunt imperatives with 'Könnten Sie mir bitte...' and 'Ich würde mich freuen...'.",
        ruleFormula: "Könnten Sie bitte... + Infinitiv (Ende)? | Ich würde mich sehr freuen, wenn...",
        exampleDe: "Könnten Sie mir bitte die Unterlagen per E-Mail schicken?",
        exampleEn: "Could you please send me the documents by email?",
        trapToAvoid: "Writing 'Schicken Sie mir die Dokumente!' in a B1 formal email. Examiners deduct points for impoliteness.",
        recommendedLab: "WRITING"
      },
      {
        id: "b1-m3",
        title: "Relative Clauses (Relativsätze): The Flow Accelerator",
        description: "Combine two choppy sentences into one fluent sentence using relative pronouns (der, die, das, die). The verb in the relative clause kicks to the end.",
        ruleFormula: "Noun, + Relativpronomen + ... + Verb am Ende.",
        exampleDe: "Das ist die Kollegin, die mir beim Projekt geholfen hat.",
        exampleEn: "That is the colleague who helped me with the project.",
        trapToAvoid: "Confusing relative pronouns with 'wer' or English 'which'. In German, use der/die/das matching the gender.",
        recommendedLab: "GRAMMAR"
      },
      {
        id: "b1-m4",
        title: "Passiv Basics (Vorgangspassiv mit 'werden')",
        description: "Recognize when an action is being described without focusing on the agent. Essential for B1 reading and instructions.",
        ruleFormula: "werden (konjugiert) + Partizip II am Ende",
        exampleDe: "Die Rechnung wird sofort bezahlt. / Die E-Mail wurde gestern verschickt.",
        exampleEn: "The bill is paid immediately. / The email was sent yesterday.",
        trapToAvoid: "Confusing 'wird' (passive: is done) with future tense (will do). Look for the Partizip II at the end.",
        recommendedLab: "GRAMMAR"
      }
    ],
    quickDrills: [
      {
        id: "b1-d1",
        prompt: "Apply the Verb Kicker rule with 'weil':",
        sentence: "Er bleibt heute zu Hause, weil er krank ___.",
        options: ["ist", "sein", "war", "wird"],
        correct: "ist",
        explanation: "'weil' is a subordinating conjunction that pushes the conjugated verb 'ist' to the very end."
      },
      {
        id: "b1-d2",
        prompt: "Select the polite Konjunktiv II request:",
        sentence: "___ Sie mir bitte einen Termin am Freitag geben?",
        options: ["Könnten", "Können", "Konnten", "Haben"],
        correct: "Könnten",
        explanation: "'Könnten Sie mir bitte...' is the standard high-scoring polite request formula for B1."
      },
      {
        id: "b1-d3",
        prompt: "Select the correct connector expressing contrast:",
        sentence: "Sie geht zur Arbeit, ___ sie sich nicht ganz fit fühlt.",
        options: ["obwohl", "weil", "deshalb", "denn"],
        correct: "obwohl",
        explanation: "'obwohl' (although) expresses concession/contrast and kicks the verb 'fühlt' to the end."
      }
    ]
  },
  {
    stageId: "stage-exam-hacks",
    level: "EXAM_HACKS",
    title: "Stage 4: B1 Exam Hacks & 60% Safety Net",
    tagline: "Test-Day Execution • The Passing Formula for Goethe, telc & DTZ",
    timeEstimate: "Days 66 to 75 (45 min daily)",
    coachPhilosophy: "You only need 60% to pass B1! You don't need a PhD in German literature. Learn where the cheap points are, write the pre-memorized 4-paragraph email, and use the 6-sentence speaking intro.",
    targetVocabCount: 2000,
    coreMilestones: [
      {
        id: "hack-m1",
        title: "The 4-Paragraph Universal Letter Template (45/45 Points)",
        description: "A bulletproof letter framework addressing all 4 Leitpunkte with pre-baked connectors that satisfies any B1 writing prompt.",
        ruleFormula: "P1: Greeting + Reason (weil) | P2: Situation & Problem | P3: Polite Request (Könnten Sie bitte...) | P4: Closing & Sign-off",
        exampleDe: "Sehr geehrte Damen und Herren, ich schreibe Ihnen, weil... Aus diesem Grund bitte ich Sie höflich, ob... Ich danke Ihnen im Voraus.",
        exampleEn: "Dear Sir or Madam, I am writing to you because... For this reason, I politely ask whether... Thank you in advance.",
        trapToAvoid: "Missing even 1 of the official Leitpunkte (bullet points). Each missed point costs 25% of content score.",
        recommendedLab: "WRITING"
      },
      {
        id: "hack-m2",
        title: "The 6-Sentence Oral Self-Introduction",
        description: "Examiners judge your fluency in the first 2 minutes. Memorize these 6 structured sentences perfectly so you start with maximum confidence.",
        ruleFormula: "1. Name -> 2. Herkunft -> 3. Wohnort (seit...) -> 4. Beruf -> 5. Sprachen -> 6. Hobbys",
        exampleDe: "Mein Name ist... Ich komme aus... Seit zwei Jahren lebe ich in... Von Beruf bin ich... In meiner Freizeit spiele ich gerne...",
        exampleEn: "My name is... I come from... For two years I have lived in... Professionally I am... In my free time I like...",
        trapToAvoid: "Saying 'Ich lebe in Deutschland seit zwei Jahre'. Correct Dative: 'seit zwei Jahren' (plural +n).",
        recommendedLab: "SPEAKING"
      },
      {
        id: "hack-m3",
        title: "Reading & Listening Traps: Negative Constraints (nicht/kein)",
        description: "Exam distractors always repeat words from the question. The trap is usually a hidden negative word (leider nicht, fällt aus, geschlossen).",
        ruleFormula: "Underline keywords in the question FIRST -> Listen/scan for negation words (nicht, nie, kein, abgesagt).",
        exampleDe: "Option A says 'Barzahlung möglich', but text says 'Barzahlung ist leider nicht möglich'. Reject A!",
        exampleEn: "Never select an option just because you saw the same word. Check the negation!",
        trapToAvoid: "Rushing without checking if the speaker said 'doch' or 'aber' at the last second to change their mind.",
        recommendedLab: "READING"
      },
      {
        id: "hack-m4",
        title: "The Speaking Emergency Kit (Buying Time & Asking for Repetition)",
        description: "If you don't understand the examiner or partner, DO NOT freeze in silence. Use these high-scoring German rescue phrases.",
        ruleFormula: "'Könnten Sie das bitte wiederholen?' / 'Wie meinten Sie das genau?' / 'Lassen Sie mich kurz nachdenken...'",
        exampleDe: "Könnten Sie die Frage bitte noch einmal langsamer wiederholen?",
        exampleEn: "Could you please repeat the question once more more slowly?",
        trapToAvoid: "Switching to English ('Sorry, I didn't understand'). Always stay in German!",
        recommendedLab: "SPEAKING"
      }
    ],
    quickDrills: [
      {
        id: "hack-d1",
        prompt: "What is the best reaction when you did not understand the examiner?",
        sentence: "Examiner asks a fast question you missed. What do you say?",
        options: [
          "Könnten Sie das bitte noch einmal wiederholen?",
          "Sorry, I don't understand.",
          "Ich weiß nicht.",
          "Bleiben Sie still und schweigen."
        ],
        correct: "Könnten Sie das bitte noch einmal wiederholen?",
        explanation: "Asking politely for repetition in German shows active communicative competence and earns points."
      },
      {
        id: "hack-d2",
        prompt: "Spot the distractor trap:",
        sentence: "Text: 'Wegen Bauarbeiten fährt der Bus 100 heute nicht.' - Option: 'Bus 100 fährt wie gewohnt.'",
        options: ["Falsch (Negation 'nicht' übersehen)", "Richtig", "Nicht im Text", "Nur sonntags"],
        correct: "Falsch (Negation 'nicht' übersehen)",
        explanation: "The text negates the bus service ('fährt heute nicht'). The option is a false distractor."
      }
    ]
  }
];

export const B1_CHEAT_CODES_DATA: B1CheatCode[] = [
  {
    id: "der-die-das-decoded",
    title: "1. Der, Die or Das Decoded (Stop Guessing Genders)",
    badge: "10 Golden Suffix Rules",
    problem: "Learners waste weeks trying to memorize random genders. Then they make article mistakes on the exam.",
    secretHack: "80% of German nouns reveal their gender in the last 2 to 4 letters. Memorize these 10 suffixes and you will never guess again.",
    interactiveToolType: "SUFFIX_SORTER",
    contentItems: [
      { label: "Always DIE (100% Feminine)", detail: "Words ending in -ung (die Wohnung), -heit (die Freiheit), -keit (die Möglichkeit), -schaft (die Freundschaft), -tion (die Station), -tät (die Universität)." },
      { label: "Always DER (100% Masculine)", detail: "Words ending in -ling (der Schmetterling), -or (der Motor), -ismus (der Optimismus), -er for male roles (der Lehrer, der Bäcker)." },
      { label: "Always DAS (100% Neuter)", detail: "Words ending in -chen (das Mädchen, das Brötchen), -lein (das Fräulein), -um (das Museum), -ment (das Dokument), -ma (das Thema)." }
    ]
  },
  {
    id: "verb-kicker-visualizer",
    title: "2. The B1 Verb Kicker Train (Konnektoren)",
    badge: "Word Order Architecture",
    problem: "English speakers naturally put verbs in position 2 ('weil ich will essen'). In German B1, this is an immediate penalty.",
    secretHack: "Treat 'weil', 'dass', 'obwohl', 'wenn', 'nachdem' like a magnetic magnet on a train. The conjugated verb is the caboose and MUST be kicked to the absolute end.",
    interactiveToolType: "VERB_KICKER",
    contentItems: [
      { label: "Direct Comparison", detail: "Main Clause: Ich HABE heute keine Zeit. -> Subordinate: ..., weil ich heute keine Zeit HABE." },
      { label: "With Modal Verbs", detail: "Main Clause: Ich MÖCHTE Deutsch lernen. -> Subordinate: ..., weil ich Deutsch lernen MÖCHTE." },
      { label: "In Perfekt (Past)", detail: "Main Clause: Ich HABE gestern geschlafen. -> Subordinate: ..., obwohl ich gestern geschlafen HABE." }
    ]
  },
  {
    id: "universal-letter-template",
    title: "3. The 45/45 Universal B1 Letter Blueprint",
    badge: "Guaranteed Writing Pass",
    problem: "Writing feels terrifying because students don't know how to reach 80 words without making dozens of mistakes.",
    secretHack: "Use this exact 4-paragraph framework. It contains 55 pre-memorized grammatically perfect words. You only need to add 25 words of your own!",
    interactiveToolType: "EMAIL_TEMPLATE",
    contentItems: [
      { label: "Paragraph 1: Salutation & Purpose", detail: "Sehr geehrte Damen und Herren, / Lieber [Name],\nich schreibe Ihnen diese E-Mail, weil ich [Grund]..." },
      { label: "Paragraph 2: The Situation / Conflict", detail: "Leider gibt es ein Problem, denn [Situation]. Da [Grund], kann ich leider nicht..." },
      { label: "Paragraph 3: The Solution / Polite Request", detail: "Könnten Sie mir bitte [Vorschlag/Bitte] per E-Mail bestätigen? Ich würde mich sehr freuen, wenn wir..." },
      { label: "Paragraph 4: Polite Sign-off", detail: "Ich danke Ihnen im Voraus für Ihr Verständnis und Ihre Unterstützung.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]" }
    ]
  },
  {
    id: "speaking-safety-phrases",
    title: "4. Speaking Sanctuary Safety Phrases",
    badge: "Never Freeze in the Oral Exam",
    problem: "Students freeze when an examiner speaks too fast or when their mind goes blank during the presentation.",
    secretHack: "Examiners do not expect native perfection. They reward candidates who use professional communication strategies in German to manage the conversation.",
    interactiveToolType: "SAFETY_PHRASES",
    contentItems: [
      { label: "When you miss a word", detail: "'Könnten Sie das bitte noch einmal wiederholen?' (Could you please repeat that?)" },
      { label: "When they speak too fast", detail: "'Könnten Sie bitte etwas langsamer sprechen?' (Could you speak a bit slower, please?)" },
      { label: "Buying 5 seconds to think", detail: "'Das ist eine sehr interessante Frage. Lassen Sie mich kurz nachdenken...' (That is an interesting question. Let me briefly think...)" },
      { label: "Polite Disagreement in Teil 3", detail: "'Das ist eine gute Idee, aber wie wäre es, wenn wir stattdessen...?' (That is a good idea, but how about if instead we...)" }
    ]
  },
  {
    id: "pass-calculator-60",
    title: "5. The 60% Exam Pass Safety Net",
    badge: "Strategic Grading Math",
    problem: "Students think they need 95% and burn out trying to be flawless in all areas.",
    secretHack: "Both Goethe and telc only require 60%. Even if you find Listening hard, you can score 85% on Writing and 80% on Reading to comfortably cruise past the finish line.",
    interactiveToolType: "CALCULATOR_60",
    contentItems: [
      { label: "Goethe B1 Modularity", detail: "Requires 60/100 points in each module. If you pass 3 and fail 1, you only repeat that 1 module!" },
      { label: "telc B1 Compensation", detail: "Requires 135/225 points in Written. Weak Reading points can be compensated by strong Writing and Sprachbausteine points!" }
    ]
  }
];
'''

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content.strip() + "\n")

print(f"Successfully generated {output_path}")
