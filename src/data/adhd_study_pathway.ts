export interface DailyStudyTask {
  id: string;
  week: 1 | 2 | 3 | 4;
  dayNumber: number; // 1 to 6 (Day 7 is Recovery / Review)
  dayTitle: string;
  durationMinutes: number; // typically 30 - 35 mins
  focusModule: string;
  objective: string;
  adhdFocusTip: string;
  tasks: string[];
  targetSection: "ACADEMY" | "GRAMMAR" | "WRITING" | "SPEAKING" | "READING" | "LISTENING" | "CITIZENSHIP" | "CONJUNCTIONS" | "KEYWORDS" | "CASES";
  actionLabel: string;
  badgeReward: string;
}

export interface WeeklyStudyPlan {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  weeklyTargetHours: string; // e.g. "3.0 Hours (30 mins x 6 days)"
  milestoneGoal: string;
  coreConcepts: string[];
  days: DailyStudyTask[];
}

export const ADHD_STUDY_PATHWAY: WeeklyStudyPlan[] = [
  // ─────────────────────────────────────────────────────────────
  // WEEK 1: Level 0 & 1 Foundations (3.0 Hours Total)
  // ─────────────────────────────────────────────────────────────
  {
    week: 1,
    title: "Week 1: Level 0 & 1 Foundations",
    subtitle: "Regular Verb Conjugations, 3 Auxiliary Verbs & Pronouns",
    weeklyTargetHours: "3.0 Hours (30 mins x 6 days)",
    milestoneGoal: "Conjugate any German regular verb and the 3 auxiliary verbs (sein, haben, werden) with zero hesitation.",
    coreConcepts: [
      "Universal verb endings formula: -e, -st, -t, -en, -t, -en",
      "The 3 essential auxiliary verbs: sein (to be), haben (to have), werden (to become / future)",
      "Stem-changing irregular verbs (fahren, sprechen, sehen, lesen, treffen)",
      "Personal pronouns in Nominativ (ich, du, er/sie/es, wir, ihr, sie/Sie)"
    ],
    days: [
      {
        id: "w1d1",
        week: 1,
        dayNumber: 1,
        dayTitle: "Day 1: The Universal Verb Endings Formula",
        durationMinutes: 30,
        focusModule: "Level 1 Grammar Engine",
        objective: "Memorize the universal regular verb endings (-e, -st, -t, -en, -t, -en) for 'lernen', 'wohnen', 'machen'.",
        adhdFocusTip: "Start a 15-minute timer. Don't look at grammar theory; jump straight into 15 active recall drills.",
        tasks: [
          "Review the regular verb endings rule: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en",
          "Complete 10 interactive drills on Regular Verbs in 0 → B1 Academy",
          "Write down 3 sentences about yourself using 'lernen' and 'wohnen'"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Practice Regular Verbs Drill ➔",
        badgeReward: "Formula Master"
      },
      {
        id: "w1d2",
        week: 1,
        dayNumber: 2,
        dayTitle: "Day 2: Auxiliary Verb #1 - sein (to be)",
        durationMinutes: 30,
        focusModule: "Essential Auxiliaries",
        objective: "Master 'sein' in present tense (bin, bist, ist, sind, seid, sind) and past 'war'.",
        adhdFocusTip: "Notice that 'ihr seid' is spelled with 'd', while 'seit' with 't' means 'since'. This is a frequent exam trap!",
        tasks: [
          "Practice reciting: ich bin, du bist, er ist, wir sind, ihr seid, sie sind",
          "Complete 10 drills filtering by Auxiliary Verbs",
          "Speak aloud: 'Ich bin seit drei Jahren in Deutschland' 3 times"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Practice 'sein' Drills ➔",
        badgeReward: "Sein Specialist"
      },
      {
        id: "w1d3",
        week: 1,
        dayNumber: 3,
        dayTitle: "Day 3: Auxiliary Verb #2 - haben (to have)",
        durationMinutes: 30,
        focusModule: "Essential Auxiliaries",
        objective: "Master 'haben' (habe, hast, hat, haben, habt, haben) and understand how it forms 80% of past tense.",
        adhdFocusTip: "Remember: 'du hast' and 'er hat' drop the 'b'. Keep your session under 30 minutes to maintain dopamine flow.",
        tasks: [
          "Conjugate 'haben' across all 6 pronouns",
          "Complete 10 interactive drills featuring 'haben'",
          "Listen to sample sentences using Audio Voice button"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Practice 'haben' Drills ➔",
        badgeReward: "Haben Hero"
      },
      {
        id: "w1d4",
        week: 1,
        dayNumber: 4,
        dayTitle: "Day 4: Auxiliary Verb #3 - werden (to become / will)",
        durationMinutes: 30,
        focusModule: "Essential Auxiliaries",
        objective: "Master 'werden' (werde, wirst, wird, werden, werdet, werden) for future goals and passive sentences.",
        adhdFocusTip: "'du wirst' and 'er wird' are irregular. Practice switching between 'du' and 'er' 5 times.",
        tasks: [
          "Memorize the irregular forms: du wirst, er wird",
          "Complete 10 drills on 'werden' in the Conjugation Trainer",
          "Practice saying: 'Ich werde die B1-Prüfung bestehen!'"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Practice 'werden' Drills ➔",
        badgeReward: "Future Navigator"
      },
      {
        id: "w1d5",
        week: 1,
        dayNumber: 5,
        dayTitle: "Day 5: Stem-Changing Verbs (Vokalwechsel)",
        durationMinutes: 30,
        focusModule: "A1/A2 Irregular Core",
        objective: "Master the 5 essential stem-changers: fahren (fährt), sprechen (spricht), sehen (sieht), lesen (liest), treffen (trifft).",
        adhdFocusTip: "Vowel changes ONLY happen for 'du' and 'er/sie/es'. 'wir' and 'sie' are always normal!",
        tasks: [
          "Identify the 2 patterns: a -> ä (fahren) and e -> i/ie (sprechen, sehen, lesen)",
          "Complete 15 STEM_CHANGE category drills",
          "Review the feedback explanations for any wrong answers"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Train Stem-Changers ➔",
        badgeReward: "Vowel Shifter"
      },
      {
        id: "w1d6",
        week: 1,
        dayNumber: 6,
        dayTitle: "Day 6: Week 1 Foundation Speed-Check (20 Drills)",
        durationMinutes: 30,
        focusModule: "Mastery Benchmark",
        objective: "Achieve at least 16/20 (80%) on mixed conjugation drills with randomized options.",
        adhdFocusTip: "Treat it like a video game sprint. Try to maintain a streak of 5 correct answers for the confetti celebration!",
        tasks: [
          "Reset drill score and select 'ALL Categories'",
          "Complete 20 consecutive drills without looking at notes",
          "Reach an 80%+ accuracy score to unlock Week 2"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Launch Speed-Check Sprint ➔",
        badgeReward: "Week 1 Foundation Certified"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 2: Level 2 Modal Verbs & Satzklammer (3.5 Hours Total)
  // ─────────────────────────────────────────────────────────────
  {
    week: 2,
    title: "Week 2: Level 2 Modal Verbs",
    subtitle: "The 6 Modal Verbs, Sentence Bracket & Vital B1 Traps",
    weeklyTargetHours: "3.5 Hours (35 mins x 6 days)",
    milestoneGoal: "Master the 6 modal verbs, form flawless Satzklammer sentences, and never confuse 'nicht dürfen' with 'nicht müssen'.",
    coreConcepts: [
      "The 6 modal verbs: können (ability), müssen (necessity), dürfen (permission), sollen (duty/advice), wollen (intent), möchten (polite wish)",
      "Sentence bracket (Satzklammer): Modal in Position 2, Infinitive at the very end of the clause",
      "Singular 1st and 3rd person take NO endings (ich kann, er kann; ich muss, er muss)",
      "Crucial B1 Exam Trap: 'nicht dürfen' = strictly forbidden; 'nicht müssen' = optional / free of charge",
      "Past tense (Präteritum) of modals: konnte, musste, durfte, sollte, wollte"
    ],
    days: [
      {
        id: "w2d1",
        week: 2,
        dayNumber: 1,
        dayTitle: "Day 1: The 6 Modal Verbs & Their Exact Exam Meanings",
        durationMinutes: 35,
        focusModule: "Modal Verbs Lab",
        objective: "Learn the core meaning of each modal verb and why 'ich' and 'er/sie/es' never take -e or -t.",
        adhdFocusTip: "Notice the symmetry: 'ich kann' = 'er kann'. 'ich muss' = 'er muss'. Zero ending for 1st and 3rd person singular!",
        tasks: [
          "Review the 6 modal verbs in the Modal Verbs Lab table",
          "Complete 10 Modal Verb conjugation drills",
          "Memorize: können (can), müssen (must), dürfen (allowed to), sollen (should), wollen (want), möchten (would like)"
        ],
        targetSection: "GRAMMAR",
        actionLabel: "Explore Modal Verbs Lab ➔",
        badgeReward: "Modal Scout"
      },
      {
        id: "w2d2",
        week: 2,
        dayNumber: 2,
        dayTitle: "Day 2: The Sentence Bracket (Satzklammer Rule)",
        durationMinutes: 35,
        focusModule: "Sentence Structure",
        objective: "Build sentences where the conjugated modal is in Position 2 and the main verb waits in infinitive at the end.",
        adhdFocusTip: "Think of the modal and infinitive as two bookends holding the information together in the middle.",
        tasks: [
          "Inspect the Satzklammer visual diagram in the Grammar Lab",
          "Complete 3 Sentence Word-Order Puzzles",
          "Practice transforming: 'Ich lerne Deutsch' -> 'Ich MUSS jeden Tag Deutsch LERNEN'"
        ],
        targetSection: "GRAMMAR",
        actionLabel: "Solve Word-Order Puzzles ➔",
        badgeReward: "Bracket Architect"
      },
      {
        id: "w2d3",
        week: 2,
        dayNumber: 3,
        dayTitle: "Day 3: The Deadly B1 Trap: 'nicht dürfen' vs 'nicht müssen'",
        durationMinutes: 35,
        focusModule: "Exam Trap Breaker",
        objective: "Never lose points on B1 reading and signs: 'nicht dürfen' = verboten; 'nicht müssen' = kostenlos / freiwillig.",
        adhdFocusTip: "This single trap appears in 100% of TELC and Goethe B1 reading sections. Lock it into long-term memory today.",
        tasks: [
          "Study the 'Forbidden vs Optional' trap cards in the Grammar Lab",
          "Complete 10 Modal Trap quiz questions",
          "Say aloud: 'Hier darf man nicht parken = Parken ist verboten!'"
        ],
        targetSection: "GRAMMAR",
        actionLabel: "Train Modal Traps ➔",
        badgeReward: "Trap Breaker"
      },
      {
        id: "w2d4",
        week: 2,
        dayNumber: 4,
        dayTitle: "Day 4: Modal Verbs in Past Tense (Präteritum)",
        durationMinutes: 35,
        focusModule: "B1 Writing Essentials",
        objective: "Master 'konnte', 'musste', 'wollte' for writing excuses, complaints, and sick notes.",
        adhdFocusTip: "In past tense, all modal verbs drop their umlauts (können -> konnte; müssen -> musste).",
        tasks: [
          "Review past modal forms in the Präteritum table",
          "Complete 10 PAST category conjugation drills",
          "Practice writing: 'Gestern konnte ich nicht zur Arbeit kommen, weil ich krank war'"
        ],
        targetSection: "ACADEMY",
        actionLabel: "Practice Past Modal Drills ➔",
        badgeReward: "Past Master"
      },
      {
        id: "w2d5",
        week: 2,
        dayNumber: 5,
        dayTitle: "Day 5: Polite Modals for Maximum Points (könnten & möchten)",
        durationMinutes: 35,
        focusModule: "Polite Formula Lab",
        objective: "Use 'Könnten Sie bitte...' and 'Ich möchte...' to guarantee maximum points in formal letters and speaking.",
        adhdFocusTip: "Writing 'Ich will' sounds rude and loses points. Always write 'Ich möchte' or 'Könnten Sie bitte...'.",
        tasks: [
          "Learn the 3 golden polite opening phrases: 'Könnten Sie mir bitte... zusenden?'",
          "Complete the 5 polite phrasing quiz questions",
          "Listen to polite speech audio samples"
        ],
        targetSection: "GRAMMAR",
        actionLabel: "Practice Polite Requests ➔",
        badgeReward: "Diplomat"
      },
      {
        id: "w2d6",
        week: 2,
        dayNumber: 6,
        dayTitle: "Day 6: Week 2 Modal Mastery Sprint (25 Questions)",
        durationMinutes: 35,
        focusModule: "Mastery Benchmark",
        objective: "Score 85%+ on the comprehensive Modal Verb & Satzbau Exam Quiz.",
        adhdFocusTip: "Quick 20-minute focus burst. Read the question carefully before clicking the shuffled options.",
        tasks: [
          "Take the full Grammar Quiz in B1 Pass Grammar Lab",
          "Solve 3 advanced Satzklammer word puzzles",
          "Verify your overall Grammar Readiness reaches 75%+"
        ],
        targetSection: "GRAMMAR",
        actionLabel: "Start Modal Quiz Sprint ➔",
        badgeReward: "Week 2 Modal Certified"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 3: B1 Writing & Speaking Blueprint (3.5 - 4.0 Hours)
  // ─────────────────────────────────────────────────────────────
  {
    week: 3,
    title: "Week 3: B1 Writing & Speaking Blueprint",
    subtitle: "8 Official Letter Templates & 5-Sentence Presentation Formula",
    weeklyTargetHours: "3.5 - 4.0 Hours (35-40 mins x 6 days)",
    milestoneGoal: "Memorize the 8 official B1 letter templates in the Schreiben Lab and the 5-sentence picture presentation in Sprechen Sanctuary.",
    coreConcepts: [
      "The 8 official B1 letter templates: Reklamation (complaint), Terminverschiebung, Einladung, Krankmeldung, Mängelanzeige, Bewerbung, Kursanmeldung, Entschuldigung",
      "Formal vs informal letter greetings and sign-offs: 'Sehr geehrte Damen und Herren' -> 'Mit freundlichen Grüßen'",
      "Meeting the 80-word minimum threshold without grammatical breakdown",
      "Speaking Part 2 picture presentation formula: 1. Was sehe ich? 2. Personen & Ort 3. Handlung 4. Atmosphäre 5. Eigene Erfahrung",
      "Speaking Part 3 Joint Planning (Gemeinsam planen) proposal and agreement phrases"
    ],
    days: [
      {
        id: "w3d1",
        week: 3,
        dayNumber: 1,
        dayTitle: "Day 1: Letter Blueprint #1 - Reklamation & Defective Items",
        durationMinutes: 35,
        focusModule: "B1 Schreiben Lab",
        objective: "Memorize the complaint letter template (damaged goods, repair, refund request).",
        adhdFocusTip: "Use the interactive fill-in-the-blank feature in the Schreiben Lab to test your memory actively.",
        tasks: [
          "Study Letter Template 1: 'Reklamation - Defektes Gerät / Lieferung'",
          "Fill in the 4 blanks in the interactive letter editor",
          "Check word count (target: 80-100 words)"
        ],
        targetSection: "WRITING",
        actionLabel: "Open Reklamation Template ➔",
        badgeReward: "Complaint Ace"
      },
      {
        id: "w3d2",
        week: 3,
        dayNumber: 2,
        dayTitle: "Day 2: Letter Blueprint #2 & #3 - Appointment Change & Sick Note",
        durationMinutes: 35,
        focusModule: "B1 Schreiben Lab",
        objective: "Memorize 'Terminverschiebung' (postponing appointment) and 'Krankmeldung' (informing employer/school of sickness).",
        adhdFocusTip: "These two topics account for over 40% of all real B1 exam prompts because they are daily life scenarios.",
        tasks: [
          "Review Template 2 (Termin absagen/verschieben) and Template 4 (Krankmeldung)",
          "Practice writing the reason using 'weil' or 'deshalb': 'weil ich plötzlich hohes Fieber habe'",
          "Complete the interactive blanks for both templates"
        ],
        targetSection: "WRITING",
        actionLabel: "Practice Termin & Krankmeldung ➔",
        badgeReward: "Reliable Communicator"
      },
      {
        id: "w3d3",
        week: 3,
        dayNumber: 3,
        dayTitle: "Day 3: Letter Blueprint #4 & #5 - Landlord Repair & Course Inquiry",
        durationMinutes: 35,
        focusModule: "B1 Schreiben Lab",
        objective: "Master 'Mängelanzeige' (broken heating/water leak to landlord) and 'Kursanmeldung/Bewerbung'.",
        adhdFocusTip: "Always include the polite deadline: 'Ich bitte Sie, den Schaden bis zum [Datum] zu beheben.'",
        tasks: [
          "Study Template 5: 'Mängelanzeige an den Vermieter (Heizung defekt)'",
          "Study Template 6: 'Bewerbungsanfrage / Praktikum'",
          "Verify the formal salutation: 'Sehr geehrte Damen und Herren' and 'Mit freundlichen Grüßen'"
        ],
        targetSection: "WRITING",
        actionLabel: "Open Landlord & Application Templates ➔",
        badgeReward: "Tenant Advocate"
      },
      {
        id: "w3d4",
        week: 3,
        dayNumber: 4,
        dayTitle: "Day 4: Speaking Part 2 - The 5-Sentence Picture Formula",
        durationMinutes: 40,
        focusModule: "B1 Sprechen Sanctuary",
        objective: "Present any photo smoothly for 1.5 minutes using the universal 5-sentence blueprint.",
        adhdFocusTip: "Examiners don't care what you say; they care that you speak fluently for 90 seconds without long silences. Stick to the 5 sentences!",
        tasks: [
          "Memorize Sentence 1: 'Auf diesem Bild sehe ich...'",
          "Memorize Sentence 2: 'Im Vordergrund / Im Hintergrund befinden sich...'",
          "Memorize Sentence 3: 'Die Personen scheinen..., weil sie...'",
          "Memorize Sentence 4: 'Die Stimmung wirkt sehr angenehm und entspannt.'",
          "Memorize Sentence 5: 'In meinem Heimatland ist das ähnlich / ganz anders...'",
          "Listen to the sample audio presentation and repeat aloud twice"
        ],
        targetSection: "SPEAKING",
        actionLabel: "Train 5-Sentence Picture Formula ➔",
        badgeReward: "Picture Presenter"
      },
      {
        id: "w3d5",
        week: 3,
        dayNumber: 5,
        dayTitle: "Day 5: Speaking Part 3 - Joint Planning Dialogue (Gemeinsam planen)",
        durationMinutes: 35,
        focusModule: "B1 Sprechen Sanctuary",
        objective: "Master the 4 dialogue phrases for proposing, agreeing, politely disagreeing, and setting a time.",
        adhdFocusTip: "Never stay silent. If you disagree, use: 'Das ist eine gute Idee, aber wie wäre es, wenn wir...'",
        tasks: [
          "Learn Proposal phrase: 'Was hältst du davon, wenn wir...?'",
          "Learn Agreement phrase: 'Ja, das passt mir sehr gut!'",
          "Learn Compromise phrase: 'Am Samstag kann ich leider nicht, aber am Sonntag hätte ich Zeit.'",
          "Practice the birthday party planning scenario in Sprechen Sanctuary"
        ],
        targetSection: "SPEAKING",
        actionLabel: "Practice Joint Planning Dialogue ➔",
        badgeReward: "Dialogue Partner"
      },
      {
        id: "w3d6",
        week: 3,
        dayNumber: 6,
        dayTitle: "Day 6: Complete 80-Word B1 Letter Exam Simulation",
        durationMinutes: 40,
        focusModule: "Full Writing Mock",
        objective: "Write an original 80-word letter from scratch using a real exam prompt and live word counter.",
        adhdFocusTip: "Break it down: 1. Salutation (5 words) -> 2. Reason for writing (15 words) -> 3. Details (30 words) -> 4. Polite request (20 words) -> 5. Closing (10 words). Done!",
        tasks: [
          "Select the 'Practice Free Writing' tab in Schreiben Lab",
          "Write a response to the prompt: 'Ihre Waschmaschine ist kaputt'",
          "Ensure word count reaches at least 80 words with zero missing elements"
        ],
        targetSection: "WRITING",
        actionLabel: "Start 80-Word Writing Mock ➔",
        badgeReward: "Week 3 Writing & Speaking Certified"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 4: Exam Reading, Listening & Citizenship (4.0 Hours)
  // ─────────────────────────────────────────────────────────────
  {
    week: 4,
    title: "Week 4: Exam Reading, Listening & Citizenship",
    subtitle: "3+ Reading Exam Sets, Audio Speed Control & 10-Question Sprints",
    weeklyTargetHours: "4.0 Hours (40 mins x 6 days)",
    milestoneGoal: "Practice all reading exam sets, listening tasks with speed control, and 10-question citizenship sprints until 100% mastery.",
    coreConcepts: [
      "B1 Reading strategy: Keyword matching, eliminating negative traps ('kann nicht stattfinden'), scanning titles first",
      "B1 Listening audio drill with 0.75x slow-motion and 1.0x normal exam speed",
      "Citizenship test (Einbürgerungstest / Leben in Deutschland) 10-question commute sprints until 100% readiness",
      "B1 Conjunction mastery (ADUSO Pos 0, Verb-Kickers at end, Inversion Pos 1/2, Doppelkonnektoren)",
      "Final readiness check and test-day anxiety management"
    ],
    days: [
      {
        id: "w4d1",
        week: 4,
        dayNumber: 1,
        dayTitle: "Day 1: B1 Reading Exam Set 1 & Fast-Scanning Technique",
        durationMinutes: 40,
        focusModule: "B1 Lesen Lab",
        objective: "Solve Reading Set 1 using keyword highlighting and zero translation of unnecessary words.",
        adhdFocusTip: "Read the question FIRST before reading the text! You only need to hunt for the specific answer.",
        tasks: [
          "Open B1 Lesen Lab and select Exam Set 1 (General Reading & Classifieds)",
          "Practice finding keywords (e.g. 'kostenfrei' = 'gebührenfrei')",
          "Score at least 4 out of 5 correct answers"
        ],
        targetSection: "READING",
        actionLabel: "Solve Reading Set 1 ➔",
        badgeReward: "Reading Scanner"
      },
      {
        id: "w4d2",
        week: 4,
        dayNumber: 2,
        dayTitle: "Day 2: B1 Reading Exam Set 2 & Set 3 - Official Notices & Traps",
        durationMinutes: 40,
        focusModule: "B1 Lesen Lab",
        objective: "Identify exam trap words: 'außer Betrieb', 'abgesagt', 'ausschließlich gestattet'.",
        adhdFocusTip: "Watch out for dates and times! If an event is postponed to Saturday, the answer is Saturday, not tomorrow.",
        tasks: [
          "Solve Exam Set 2 (Official notices and community announcements)",
          "Solve Exam Set 3 (Workplace instructions and transit changes)",
          "Review the Trap Explanations for all 10 questions"
        ],
        targetSection: "READING",
        actionLabel: "Solve Reading Sets 2 & 3 ➔",
        badgeReward: "Notice Detective"
      },
      {
        id: "w4d3",
        week: 4,
        dayNumber: 3,
        dayTitle: "Day 3: B1 Listening Lab - Train Announcements & Audio Tasks",
        durationMinutes: 40,
        focusModule: "B1 Hören Lab",
        objective: "Listen to realistic B1 exam audio at 0.75x first, then 1.0x exam speed, and answer comprehension questions.",
        adhdFocusTip: "Listen with eyes closed the first time. Then turn on the German transcript if you get stuck.",
        tasks: [
          "Play Task 1: Train delay announcement at 0.75x speed",
          "Re-listen at 1.0x normal speed and select the correct answer",
          "Complete Task 2 (Doctor's office voicemail) and Task 3 (Department store notice)"
        ],
        targetSection: "LISTENING",
        actionLabel: "Train Listening Audio ➔",
        badgeReward: "Golden Ear"
      },
      {
        id: "w4d4",
        week: 4,
        dayNumber: 4,
        dayTitle: "Day 4: Citizenship Sprint Marathon - 4 Sprints of 10 Questions",
        durationMinutes: 40,
        focusModule: "Citizenship Fast-Track",
        objective: "Complete 4 consecutive 10-question sprints (40 questions total) in Commute Mode.",
        adhdFocusTip: "Each 10-question sprint takes only 3 to 4 minutes. Quick dopamine hits with instant answer feedback!",
        tasks: [
          "Launch Commute Sprint Drill",
          "Complete Sprint 1 (10 questions on German Constitution & Basic Law)",
          "Complete Sprint 2 (10 questions on Federal System & Elections)",
          "Complete Sprints 3 & 4 (20 questions on History, EU, and Society)",
          "Hit a 90%+ pass rate on all 4 sprints"
        ],
        targetSection: "CITIZENSHIP",
        actionLabel: "Launch 10Q Citizenship Sprint ➔",
        badgeReward: "Sprint Champion"
      },
      {
        id: "w4d5",
        week: 4,
        dayNumber: 5,
        dayTitle: "Day 5: Conjunctions & Connectors Mastery (ADUSO, weil, deshalb)",
        durationMinutes: 40,
        focusModule: "B1 Conjunctions Lab",
        objective: "Guarantee B1 writing & speaking points by mastering the 4 conjunction families and word order.",
        adhdFocusTip: "ADUSO = Position 0 (verb stays in Pos 2). 'weil/dass/obwohl' = Verb at the end. 'deshalb/trotzdem' = Verb in Pos 2 directly after!",
        tasks: [
          "Study the 4 Conjunction Families in B1 Conjunctions Lab",
          "Complete 15 interactive connector drills",
          "Verify understanding of 'nicht nur... sondern auch' for high-scoring sentences"
        ],
        targetSection: "CONJUNCTIONS",
        actionLabel: "Train Conjunctions Lab ➔",
        badgeReward: "Connector Grandmaster"
      },
      {
        id: "w4d6",
        week: 4,
        dayNumber: 6,
        dayTitle: "Day 6: Final 100% Mastery Benchmark & Pass Certification",
        durationMinutes: 45,
        focusModule: "Grand Final Simulation",
        objective: "Verify 100% readiness across all 4 B1 skills and citizenship test, unlocking the Pass Certificate.",
        adhdFocusTip: "You did it! 4 weeks of consistent 30-minute daily practice. Review your readiness score and claim your victory.",
        tasks: [
          "Complete 1 final 10-question citizenship sprint to ensure 100% streak",
          "Do a rapid 10-question reading and vocabulary keyword check",
          "Check the Mastery Certificate Banner on the home dashboard to claim your B1 Pass Guarantee"
        ],
        targetSection: "ACADEMY",
        actionLabel: "View Final Readiness Dashboard ➔",
        badgeReward: "B1 & Citizenship Exam Ready"
      }
    ]
  }
];
