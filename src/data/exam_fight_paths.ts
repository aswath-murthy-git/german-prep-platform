export interface FightPathStep {
  id: string;
  stepNumber: number;
  phaseTitle: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  moduleBadge: string;
  passingObjective: string;
  whyThisGuaranteesPass: string;
  targetSection: "SPEAKING" | "WRITING" | "ACADEMY" | "CASES" | "GRAMMAR" | "CONJUNCTIONS" | "READING" | "LISTENING" | "CITIZENSHIP" | "KEYWORDS" | "STRATEGY";
  targetSubtab?: string;
  actionButtonText: string;
  checklist: string[];
}

export interface ExamFightPath {
  examId: "DTZ" | "TELC_B1" | "GOETHE_B1" | "CITIZENSHIP_ONLY";
  examName: string;
  examBadge: string;
  passingRuleSummary: string;
  totalSteps: number;
  estimatedTotalHours: string;
  coreFocusNote: string;
  steps: FightPathStep[];
}

export const EXAM_FIGHT_PATHS: Record<"DTZ" | "TELC_B1" | "GOETHE_B1" | "CITIZENSHIP_ONLY", ExamFightPath> = {
  DTZ: {
    examId: "DTZ",
    examName: "DTZ (Deutsch-Test für Zuwanderer)",
    examBadge: "IMMIGRATION PASS PATHWAY",
    passingRuleSummary: "B1 in Sprechen (Mandatory) + B1 in Schreiben OR Hören/Lesen = Official B1 Certificate",
    totalSteps: 16,
    estimatedTotalHours: "12-14 Hours (15-20 mins per step)",
    coreFocusNote: "Concentrate 70% of effort on Speaking and Writing. Because speaking and writing are active and follow our blueprints, you easily secure B1 even with zero German background.",
    steps: [
      // Phase 1: Speaking Mastery (BAMF Mandatory Core)
      {
        id: "dtz-step-1",
        stepNumber: 1,
        phaseTitle: "Phase 1: Speaking Core (Mandatory B1 Bar)",
        title: "Self-Introduction Blueprint (Sprechen Teil 1)",
        subtitle: "The 6-Question Self-Intro Formula",
        durationMinutes: 15,
        moduleBadge: "Sprechen Teil 1",
        passingObjective: "Recite your name, country, residence, occupation, family, and languages in complete German sentences.",
        whyThisGuaranteesPass: "Examiners rate pronunciation and sentence structure right in the first 2 minutes. Nailing these 6 sentences sets a positive impression.",
        targetSection: "SPEAKING",
        targetSubtab: "INTRO",
        actionButtonText: "Practice Self-Intro Blueprint ➔",
        checklist: [
          "Learn: 'Ich heiße...', 'Ich komme aus...', 'Ich wohne seit... in...'",
          "Listen to audio pronunciation samples",
          "Practice reciting without looking at notes 3 times"
        ]
      },
      {
        id: "dtz-step-2",
        stepNumber: 2,
        phaseTitle: "Phase 1: Speaking Core (Mandatory B1 Bar)",
        title: "Examiner Follow-Up Questions (Sprechen Teil 1)",
        subtitle: "Handling Spontaneous Inquiries",
        durationMinutes: 15,
        moduleBadge: "Sprechen Teil 1",
        passingObjective: "Answer the 4 most common examiner questions: 'Wie lange lernen Sie Deutsch?', 'Was gefällt Ihnen hier?'",
        whyThisGuaranteesPass: "Answering with full subordinate clauses ('weil...', 'dass...') gives examiners the proof they need to award a B1 score.",
        targetSection: "SPEAKING",
        targetSubtab: "INTRO",
        actionButtonText: "Master Examiner Questions ➔",
        checklist: [
          "Practice: 'Ich lerne seit einem Jahr Deutsch, weil ich hier arbeiten möchte.'",
          "Answer: 'In Deutschland gefällt mir besonders die Pünktlichkeit.'",
          "Avoid one-word answers: always speak in complete sentences"
        ]
      },
      {
        id: "dtz-step-3",
        stepNumber: 3,
        phaseTitle: "Phase 1: Speaking Core (Mandatory B1 Bar)",
        title: "5-Sentence Picture Description (Sprechen Teil 2)",
        subtitle: "Picture & Personal Experience Blueprint",
        durationMinutes: 20,
        moduleBadge: "Sprechen Teil 2",
        passingObjective: "Describe any photo using our 5-sentence formula: Overview, Foreground, Background, Hypothesis, Personal Experience.",
        whyThisGuaranteesPass: "Examiners follow a strict checklist. Hitting all 5 structural sentences fulfills 100% of the BAMF rubric.",
        targetSection: "SPEAKING",
        targetSubtab: "PICTURE",
        actionButtonText: "Train 5-Sentence Picture Formula ➔",
        checklist: [
          "Sentence 1: 'Auf dem Bild sehe ich...'",
          "Sentence 2: 'Im Vordergrund steht... / Im Hintergrund liegt...'",
          "Sentence 3: 'Ich vermute, dass sie gerade über... sprechen.'",
          "Sentence 4: 'Das Thema erinnert mich an meine eigene Situation...'",
          "Sentence 5: 'In meinem Heimatland ist das ähnlich / anders...'"
        ]
      },
      {
        id: "dtz-step-4",
        stepNumber: 4,
        phaseTitle: "Phase 1: Speaking Core (Mandatory B1 Bar)",
        title: "Joint Partner Planning (Sprechen Teil 3)",
        subtitle: "Cooperative Planning Dialogue",
        durationMinutes: 20,
        moduleBadge: "Sprechen Teil 3",
        passingObjective: "Plan an everyday event with your partner using suggestions, agreements, and polite alternatives.",
        whyThisGuaranteesPass: "Examiners want to see natural turn-taking. Using 'Wollen wir...?', 'Was hältst du von...?' guarantees maximum points.",
        targetSection: "SPEAKING",
        targetSubtab: "PLANNING",
        actionButtonText: "Practice Planning Dialogue ➔",
        checklist: [
          "Making suggestions: 'Wollen wir uns am Samstag treffen?'",
          "Polite agreement: 'Das ist eine hervorragende Idee!'",
          "Constructive alternative: 'Am Vormittag kann ich leider nicht, aber wie wäre es um 15 Uhr?'",
          "Wrapping up: 'Perfekt, dann halten wir das so fest!'"
        ]
      },

      // Phase 2: Writing Blueprints (The 4 Official BAMF Letters)
      {
        id: "dtz-step-5",
        stepNumber: 5,
        phaseTitle: "Phase 2: Writing Blueprints (4 BAMF Letter Types)",
        title: "Letter Type 1: Sick Note / Absence Excuse",
        subtitle: "Entschuldigung für Arbeit oder Schule",
        durationMinutes: 20,
        moduleBadge: "Schreiben Template 1",
        passingObjective: "Write an official excuse letter explaining illness, doctor's notice, and return date.",
        whyThisGuaranteesPass: "Absence letters appear in over 40% of all DTZ exams. Memorizing this template secures easy passing points.",
        targetSection: "WRITING",
        targetSubtab: "TEMPLATES",
        actionButtonText: "Memorize Sick Note Template ➔",
        checklist: [
          "Salutation: 'Sehr geehrte/r Frau/Herr...'",
          "Reason with 'weil': '...weil ich hohes Fieber habe.'",
          "Attaching certificate: 'Das ärztliche Attest habe ich beigefügt.'",
          "Closing formula: 'Mit freundlichen Grüßen'"
        ]
      },
      {
        id: "dtz-step-6",
        stepNumber: 6,
        phaseTitle: "Phase 2: Writing Blueprints (4 BAMF Letter Types)",
        title: "Letter Type 2: Contract Cancellation (Kündigung)",
        subtitle: "Offizielle Kündigung von Verträgen",
        durationMinutes: 20,
        moduleBadge: "Schreiben Template 2",
        passingObjective: "Draft a formal contract cancellation (gym, internet, or subscription) requesting written confirmation.",
        whyThisGuaranteesPass: "BAMF tests real integration situations. Formal cancellations prove practical German competency.",
        targetSection: "WRITING",
        targetSubtab: "TEMPLATES",
        actionButtonText: "Train Cancellation Letter ➔",
        checklist: [
          "State contract number: 'Vertragsnummer: ...'",
          "Direct statement: 'Hiermit kündige ich meinen Vertrag fristgerecht zum...'",
          "Requesting confirmation: 'Bitte senden Sie mir eine schriftliche Bestätigung zu.'"
        ]
      },
      {
        id: "dtz-step-7",
        stepNumber: 7,
        phaseTitle: "Phase 2: Writing Blueprints (4 BAMF Letter Types)",
        title: "Letter Type 3: Landlord Defect Notice (Mängelrüge)",
        subtitle: "Beschwerde über Heizungsausfall / Lärm",
        durationMinutes: 20,
        moduleBadge: "Schreiben Template 3",
        passingObjective: "Write a polite but firm notice to your landlord requesting heating or plumbing repair by a specific date.",
        whyThisGuaranteesPass: "Examiners look for polite Konjunktiv II ('Könnten Sie bitte...'). This template hits 100% of formatting marks.",
        targetSection: "WRITING",
        targetSubtab: "TEMPLATES",
        actionButtonText: "Master Landlord Defect Letter ➔",
        checklist: [
          "State the issue: 'Seit zwei Tagen funktioniert die Heizung nicht mehr.'",
          "Set a reasonable deadline: 'Ich bitte Sie, den Schaden bis zum Freitag zu beheben.'",
          "Express polite urgency without aggression"
        ]
      },
      {
        id: "dtz-step-8",
        stepNumber: 8,
        phaseTitle: "Phase 2: Writing Blueprints (4 BAMF Letter Types)",
        title: "Letter Type 4: Citizen Bureau Appointment Request",
        subtitle: "Terminanfrage beim Bürgeramt / Ausländerbehörde",
        durationMinutes: 20,
        moduleBadge: "Schreiben Template 4",
        passingObjective: "Request an appointment for visa extension or registration, listing required documents.",
        whyThisGuaranteesPass: "Matches the exact real-world purpose of the integration exam for Permanent Residence applicants.",
        targetSection: "WRITING",
        targetSubtab: "TEMPLATES",
        actionButtonText: "Practice Bureau Appointment Letter ➔",
        checklist: [
          "Reason for appointment: 'Ich benötige einen Termin zur Verlängerung meines Aufenthaltstitels.'",
          "Suggesting time slots: 'Vormittags wäre es mir am liebsten.'",
          "Polite closing request"
        ]
      },

      // Phase 3: Core Grammar Engine
      {
        id: "dtz-step-9",
        stepNumber: 9,
        phaseTitle: "Phase 3: Core Grammar Engine",
        title: "Conjugations & Auxiliary Verbs (sein, haben, werden)",
        subtitle: "The Lifeblood of Every German Sentence",
        durationMinutes: 15,
        moduleBadge: "A1/A2 Grammar",
        passingObjective: "Conjugate regular verbs and the 3 auxiliaries across all 6 personal pronouns without hesitation.",
        whyThisGuaranteesPass: "Verb endings are Position 2 in main clauses. Correct endings prevent basic grammar penalties.",
        targetSection: "ACADEMY",
        targetSubtab: "CONJUGATION_TRAINER",
        actionButtonText: "Launch Verb Conjugation Sprint ➔",
        checklist: [
          "Universal endings formula: -e, -st, -t, -en, -t, -en",
          "sein: bin, bist, ist, sind, seid, sind",
          "haben: habe, hast, hat, haben, habt, haben",
          "Complete 10 interactive drills"
        ]
      },
      {
        id: "dtz-step-10",
        stepNumber: 10,
        phaseTitle: "Phase 3: Core Grammar Engine",
        title: "Nominativ vs Akkusativ (The Masculine Secret)",
        subtitle: "Only Masculine Changes!",
        durationMinutes: 15,
        moduleBadge: "Cases Lab",
        passingObjective: "Master the Akkusativ rule: only 'der' turns to 'den' and 'ein' turns to 'einen'. Feminine and neuter never change.",
        whyThisGuaranteesPass: "Eliminates 80% of common case confusion for beginners in speaking and writing.",
        targetSection: "CASES",
        targetSubtab: "MATRIX",
        actionButtonText: "Review Akkusativ Rule & Drill ➔",
        checklist: [
          "Subject (Who?) = Nominativ",
          "Direct Object (What?) = Akkusativ (einen Mann, eine Frau, ein Auto)",
          "Complete 10 rapid case questions"
        ]
      },
      {
        id: "dtz-step-11",
        stepNumber: 11,
        phaseTitle: "Phase 3: Core Grammar Engine",
        title: "The 6 Modal Verbs & Sentence Bracket",
        subtitle: "Satzklammer & Traps",
        durationMinutes: 20,
        moduleBadge: "Modal Verbs Lab",
        passingObjective: "Construct sentences with modal verbs on Position 2 and infinitive kicked to the very end.",
        whyThisGuaranteesPass: "Never confuse 'nicht dürfen' (forbidden) with 'nicht müssen' (optional). This trap appears in all reading tests.",
        targetSection: "GRAMMAR",
        targetSubtab: "MODAL",
        actionButtonText: "Practice Modal Verbs & Bracket ➔",
        checklist: [
          "können, müssen, dürfen, sollen, wollen, möchten",
          "Modal on Pos 2, Infinitive at end",
          "Review the 'nicht dürfen' vs 'nicht müssen' trap cards"
        ]
      },
      {
        id: "dtz-step-12",
        stepNumber: 12,
        phaseTitle: "Phase 3: Core Grammar Engine",
        title: "Subordinate Conjunctions (weil, dass, obwohl)",
        subtitle: "The Verb-Kicking Conjunctions",
        durationMinutes: 20,
        moduleBadge: "Conjunctions Lab",
        passingObjective: "Send the conjugated verb to the very end of subordinate clauses using 'weil', 'dass', 'obwohl'.",
        whyThisGuaranteesPass: "Subordinate connectors are the single most weighted criteria examiners use to award a B1 score.",
        targetSection: "CONJUNCTIONS",
        targetSubtab: "SUBORDINATING",
        actionButtonText: "Master Subordinate Clauses ➔",
        checklist: [
          "Form sentences with 'weil': '..., weil ich Deutsch lernen möchte.'",
          "Form sentences with 'dass': 'Ich hoffe, dass alles gut geht.'",
          "Contrast with ADUSO: 'aber', 'denn', 'und' stay in Position 0"
        ]
      },

      // Phase 4: Receptive Shortcuts & Traps
      {
        id: "dtz-step-13",
        stepNumber: 13,
        phaseTitle: "Phase 4: Receptive Shortcuts & Traps",
        title: "Fast-Scanning for Notices & Signs (Lesen)",
        subtitle: "Keyword Hunting Technique",
        durationMinutes: 15,
        moduleBadge: "Lesen Lab",
        passingObjective: "Scan notices, house rules, and classified ads for dates, prices, and restrictions without reading every word.",
        whyThisGuaranteesPass: "Saves 15 minutes of exam time and protects you from trap synonyms.",
        targetSection: "READING",
        targetSubtab: "PRACTICE",
        actionButtonText: "Train Fast-Scanning Techniques ➔",
        checklist: [
          "Read questions and underline keywords first",
          "Locate synonyms in the text",
          "Never read words you don't understand: focus on the context"
        ]
      },
      {
        id: "dtz-step-14",
        stepNumber: 14,
        phaseTitle: "Phase 4: Receptive Shortcuts & Traps",
        title: "Audio Announcements & Number Traps (Hören)",
        subtitle: "Public Announcements & Phone Messages",
        durationMinutes: 15,
        moduleBadge: "Hören Lab",
        passingObjective: "Catch platform numbers, times, and phone numbers in airport and train station announcements.",
        whyThisGuaranteesPass: "DTZ listening questions heavily test numbers and dates in public transport announcements.",
        targetSection: "LISTENING",
        targetSubtab: "AUDIO",
        actionButtonText: "Practice Listening with Speed Control ➔",
        checklist: [
          "Listen at 0.8x, then 1.0x, then 1.2x speed",
          "Underline numbers in the question stems",
          "Complete 5 audio practice tasks"
        ]
      },

      // Phase 5: Citizenship Exam Pass
      {
        id: "dtz-step-15",
        stepNumber: 15,
        phaseTitle: "Phase 5: Citizenship Exam Pass",
        title: "10-Question Rapid Citizenship Sprints",
        subtitle: "Basic Law, Democracy & Federal States",
        durationMinutes: 15,
        moduleBadge: "Citizenship Catalog",
        passingObjective: "Achieve 10/10 on the core democratic principles and constitutional questions of the Einbürgerungstest.",
        whyThisGuaranteesPass: "300 federal questions + 10 state questions. You only need 17 out of 33 correct (51%) to pass.",
        targetSection: "CITIZENSHIP",
        targetSubtab: "SPRINT",
        actionButtonText: "Launch 10Q Rapid Sprint ➔",
        checklist: [
          "Complete 10 questions with immediate explanations",
          "Review incorrect questions",
          "Select your federal state for local questions"
        ]
      },
      {
        id: "dtz-step-16",
        stepNumber: 16,
        phaseTitle: "Phase 5: Citizenship Exam Pass",
        title: "Full 33-Question Mock Citizenship Exam",
        subtitle: "Official 17/33 Passing Simulator",
        durationMinutes: 20,
        moduleBadge: "Citizenship Mock",
        passingObjective: "Score at least 25 out of 33 on a simulated official citizenship exam.",
        whyThisGuaranteesPass: "Gives you complete peace of mind that your German Naturalization requirements are 100% satisfied.",
        targetSection: "CITIZENSHIP",
        targetSubtab: "MOCK",
        actionButtonText: "Start Official 33Q Mock Exam ➔",
        checklist: [
          "Complete all 33 questions under exam timing",
          "Review detailed score breakdown",
          "Celebrate with certified passing banner"
        ]
      }
    ]
  },

  TELC_B1: {
    examId: "TELC_B1",
    examName: "telc Deutsch B1 (Zertifikat Deutsch)",
    examBadge: "POOLED WRITTEN PASS PATHWAY",
    passingRuleSummary: "Written Total (Lesen + Sprachbausteine + Hören + Schreiben) >= 60% (135/225) AND Speaking >= 60% (45/75)",
    totalSteps: 16,
    estimatedTotalHours: "14-16 Hours (15-20 mins per step)",
    coreFocusNote: "Written score is pooled together! A strong 80%+ score in Writing and Reading compensates for a weaker 45% score in Listening.",
    steps: [
      {
        id: "telc-step-1",
        stepNumber: 1,
        phaseTitle: "Phase 1: Sprachbausteine & Grammar Pool",
        title: "Grammar Gap-Fill Drill (Sprachbausteine Teil 1)",
        subtitle: "Prepositions, Connectors & Endings",
        durationMinutes: 20,
        moduleBadge: "Sprachbausteine Teil 1",
        passingObjective: "Score 8 out of 10 on grammar gap-fill tasks in formal correspondence.",
        whyThisGuaranteesPass: "Sprachbausteine delivers 30 easy points toward the 135-point written pool threshold.",
        targetSection: "GRAMMAR",
        actionButtonText: "Train Grammar Gap-Fill ➔",
        checklist: [
          "Check prepositions directly before gaps",
          "Identify case requirements (Akkusativ vs Dativ)",
          "Check verb placement for conjunctions"
        ]
      },
      {
        id: "telc-step-2",
        stepNumber: 2,
        phaseTitle: "Phase 1: Sprachbausteine & Grammar Pool",
        title: "Vocabulary Word-Box Matching (Sprachbausteine Teil 2)",
        subtitle: "Lexical Precision in Context",
        durationMinutes: 20,
        moduleBadge: "Sprachbausteine Teil 2",
        passingObjective: "Select 10 correct words from the 15-word box for a continuous narrative.",
        whyThisGuaranteesPass: "High-scoring section that takes less than 10 minutes in the exam.",
        targetSection: "KEYWORDS",
        actionButtonText: "Practice Word-Box Matching ➔",
        checklist: [
          "Identify part of speech for each gap",
          "Cross out words as you use them",
          "Check collocations and idioms"
        ]
      },
      {
        id: "telc-step-3",
        stepNumber: 3,
        phaseTitle: "Phase 1: Sprachbausteine & Grammar Pool",
        title: "The 4 Cases Master Matrix & Suffix Decoders",
        subtitle: "der/die/das & Declensions",
        durationMinutes: 20,
        moduleBadge: "Cases Lab",
        passingObjective: "Master the 100% reliable suffix rules for die (-ung, -heit), das (-chen, -ment), and der (-er, -or).",
        whyThisGuaranteesPass: "Essential for accurate article endings in both Sprachbausteine and written production.",
        targetSection: "CASES",
        actionButtonText: "Open Cases & Suffix Lab ➔",
        checklist: [
          "Review feminine suffixes: -ung, -heit, -keit, -schaft, -ion",
          "Review neuter suffixes: -chen, -lein, -ment, -um",
          "Complete 10 case drill questions"
        ]
      },
      {
        id: "telc-step-4",
        stepNumber: 4,
        phaseTitle: "Phase 1: Sprachbausteine & Grammar Pool",
        title: "Modal Traps ('nicht dürfen' vs 'nicht müssen')",
        subtitle: "Avoiding the Top 5 Exam Traps",
        durationMinutes: 15,
        moduleBadge: "Modal Verbs",
        passingObjective: "Recognize that 'nicht dürfen' = forbidden while 'nicht müssen' = optional.",
        whyThisGuaranteesPass: "Appears in every telc reading and listening section without exception.",
        targetSection: "GRAMMAR",
        actionButtonText: "Train Modal Traps ➔",
        checklist: [
          "Study trap comparison cards",
          "Complete 5 trap scenario questions",
          "Memorize: verboten = darf nicht"
        ]
      },
      {
        id: "telc-step-5",
        stepNumber: 5,
        phaseTitle: "Phase 2: Written Email (45 Points)",
        title: "The 4-Point Email Template (Informal / Semi-formal)",
        subtitle: "Hitting Every Prompt Bullet",
        durationMinutes: 25,
        moduleBadge: "Schreiben",
        passingObjective: "Draft a complete email addressing all 4 prompts with 2 full sentences per point.",
        whyThisGuaranteesPass: "Schreiben carries 45 points. Addressing all 4 points secures at least 35 points toward the 135 threshold.",
        targetSection: "WRITING",
        actionButtonText: "Practice 4-Point Email Template ➔",
        checklist: [
          "Select prompt theme",
          "Write 2 sentences for each of the 4 prompts",
          "Check word count (aim for 90-110 words)"
        ]
      },
      {
        id: "telc-step-6",
        stepNumber: 6,
        phaseTitle: "Phase 2: Written Email (45 Points)",
        title: "Connectors & Sentence Bracket in Writing",
        subtitle: "Using weil, obwohl, and deshalb",
        durationMinutes: 20,
        moduleBadge: "Schreiben / Konnektoren",
        passingObjective: "Incorporate at least 3 subordinate clauses and 1 inversion in your practice letter.",
        whyThisGuaranteesPass: "Examiners automatically award high language quality scores when B1 connectors are present.",
        targetSection: "CONJUNCTIONS",
        actionButtonText: "Train Sentence Connectors ➔",
        checklist: [
          "Incorporate 'weil' with verb at end",
          "Incorporate 'obwohl' with verb at end",
          "Incorporate 'deshalb' with inversion"
        ]
      },
      {
        id: "telc-step-7",
        stepNumber: 7,
        phaseTitle: "Phase 3: Reading & Listening Strategy",
        title: "Global Reading: Matching Headlines (Teil 1)",
        subtitle: "5 Texts to 10 Headlines",
        durationMinutes: 20,
        moduleBadge: "Lesen Teil 1",
        passingObjective: "Match 5 short articles to correct headlines in under 20 minutes.",
        whyThisGuaranteesPass: "Teil 1 offers 25 points. Identifying the core theme without reading word-for-word guarantees speed.",
        targetSection: "READING",
        actionButtonText: "Practice Headline Matching ➔",
        checklist: [
          "Read all 10 headlines first",
          "Highlight distinguishing keywords in headlines",
          "Skim text for matching themes"
        ]
      },
      {
        id: "telc-step-8",
        stepNumber: 8,
        phaseTitle: "Phase 3: Reading & Listening Strategy",
        title: "Detail Reading: Press Articles (Teil 2)",
        subtitle: "5 Multiple-Choice Questions",
        durationMinutes: 25,
        moduleBadge: "Lesen Teil 2",
        passingObjective: "Locate specific evidence in a long article for 5 multiple-choice questions.",
        whyThisGuaranteesPass: "Questions strictly follow the chronological flow of the text.",
        targetSection: "READING",
        actionButtonText: "Practice Press Article Reading ➔",
        checklist: [
          "Match question 1 to paragraph 1-2",
          "Verify exact textual proof",
          "Beware absolute statements (immer, nie, alle)"
        ]
      },
      {
        id: "telc-step-9",
        stepNumber: 9,
        phaseTitle: "Phase 3: Reading & Listening Strategy",
        title: "Selective Reading: Classified Ads (Teil 3)",
        subtitle: "10 Situations to 12 Ads",
        durationMinutes: 25,
        moduleBadge: "Lesen Teil 3",
        passingObjective: "Match 10 situations to 12 ads, correctly identifying situations with no match ('x').",
        whyThisGuaranteesPass: "Fastest way to earn 25 points in reading.",
        targetSection: "READING",
        actionButtonText: "Practice Classified Ads Matching ➔",
        checklist: [
          "Underline restrictions in person profiles",
          "Filter out mismatched days or locations",
          "Select 'x' when no ad fits all conditions"
        ]
      },
      {
        id: "telc-step-10",
        stepNumber: 10,
        phaseTitle: "Phase 3: Reading & Listening Strategy",
        title: "Listening Comprehension (Hören Teil 1-3)",
        subtitle: "Global, Detail & Selective Listening",
        durationMinutes: 25,
        moduleBadge: "Hören Lab",
        passingObjective: "Answer 12+ correct out of 20 in telc listening tasks.",
        whyThisGuaranteesPass: "Listening carries 75 points. Combined with Reading and Writing, this easily clears the 135 threshold.",
        targetSection: "LISTENING",
        actionButtonText: "Train Listening Comprehension ➔",
        checklist: [
          "Underline keywords during prep pauses",
          "Follow interview flow chronologically in Teil 2",
          "Confirm details during the 2nd playback of Teil 3"
        ]
      },
      {
        id: "telc-step-11",
        stepNumber: 11,
        phaseTitle: "Phase 4: Oral Exam with 20-Min Prep",
        title: "The 20-Minute Preparation Strategy",
        subtitle: "Drafting Effective Cue Cards",
        durationMinutes: 20,
        moduleBadge: "Sprechen Prep",
        passingObjective: "Draft bulleted cue cards in 20 minutes without writing full sentences.",
        whyThisGuaranteesPass: "telc gives you 20 minutes before speaking. Knowing what to write prevents speaking freezes.",
        targetSection: "SPEAKING",
        actionButtonText: "Master 20-Min Preparation Strategy ➔",
        checklist: [
          "Write 3 key nouns per topic bullet",
          "Note down 2 connectors to use",
          "Never write full paragraphs: speak freely from cues"
        ]
      },
      {
        id: "telc-step-12",
        stepNumber: 12,
        phaseTitle: "Phase 4: Oral Exam with 20-Min Prep",
        title: "Getting to Know Each Other (Teil 1)",
        subtitle: "Self-Introduction & Partner Follow-Up",
        durationMinutes: 15,
        moduleBadge: "Sprechen Teil 1",
        passingObjective: "Present your profile fluently and ask your partner 2 relevant follow-up questions.",
        whyThisGuaranteesPass: "Secures an immediate high score on pronunciation and communicative ability.",
        targetSection: "SPEAKING",
        actionButtonText: "Train Oral Teil 1 ➔",
        checklist: [
          "Fluently present your background",
          "Ask partner: 'Wie lange wohnst du schon hier?'",
          "Show active listening"
        ]
      },
      {
        id: "telc-step-13",
        stepNumber: 13,
        phaseTitle: "Phase 4: Oral Exam with 20-Min Prep",
        title: "Speaking About an Everyday Topic (Teil 2)",
        subtitle: "Experience Sharing & Discussion",
        durationMinutes: 20,
        moduleBadge: "Sprechen Teil 2",
        passingObjective: "Talk for 2-3 minutes about a book, movie, trip, or hobby, and discuss with partner.",
        whyThisGuaranteesPass: "Examiners evaluate whether you can sustain a monologue and explain your perspective.",
        targetSection: "SPEAKING",
        actionButtonText: "Train Topic Monologue ➔",
        checklist: [
          "Describe personal experience",
          "Give reasons for your preferences",
          "Respond to partner questions"
        ]
      },
      {
        id: "telc-step-14",
        stepNumber: 14,
        phaseTitle: "Phase 4: Oral Exam with 20-Min Prep",
        title: "Joint Event Planning (Teil 3)",
        subtitle: "Collaborative Planning Dialogue",
        durationMinutes: 20,
        moduleBadge: "Sprechen Teil 3",
        passingObjective: "Negotiate an activity, assign responsibilities, and agree on a date with your partner.",
        whyThisGuaranteesPass: "Carries the highest weight in the oral exam rubric.",
        targetSection: "SPEAKING",
        actionButtonText: "Practice Joint Planning Dialogue ➔",
        checklist: [
          "Suggest ideas: 'Wie wäre es, wenn wir...'",
          "Discuss logistics: 'Wer kauft die Getränke?'",
          "Reach clear agreement"
        ]
      },
      {
        id: "telc-step-15",
        stepNumber: 15,
        phaseTitle: "Phase 5: Citizenship Integration",
        title: "10-Question Citizenship Sprints",
        subtitle: "Preparation for Naturalization",
        durationMinutes: 15,
        moduleBadge: "Citizenship Catalog",
        passingObjective: "Score 10/10 on democratic institutions and German history.",
        whyThisGuaranteesPass: "Completes the dual requirement for German citizenship alongside the B1 certificate.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Start Citizenship Sprint ➔",
        checklist: [
          "Complete 10 questions with bilingual explanations",
          "Flag questions for review",
          "Select local state"
        ]
      },
      {
        id: "telc-step-16",
        stepNumber: 16,
        phaseTitle: "Phase 5: Citizenship Integration",
        title: "33-Question Mock Exam & Pass Benchmark",
        subtitle: "Simulated Naturalization Test",
        durationMinutes: 20,
        moduleBadge: "Citizenship Mock",
        passingObjective: "Pass with 17+ correct answers on official 33-question catalog.",
        whyThisGuaranteesPass: "Guarantees 100% readiness for your Ausländerbehörde application.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Launch 33Q Mock Exam ➔",
        checklist: [
          "Complete full 33Q mock",
          "Review incorrect questions",
          "Export completion status"
        ]
      }
    ]
  },

  GOETHE_B1: {
    examId: "GOETHE_B1",
    examName: "Goethe-Zertifikat B1",
    examBadge: "MODULAR RETAKE PATHWAY",
    passingRuleSummary: "Each module (Lesen, Hören, Schreiben, Sprechen) evaluated independently at >= 60% (60/100 points each)",
    totalSteps: 16,
    estimatedTotalHours: "14-16 Hours (15-20 mins per step)",
    coreFocusNote: "Full flexibility: You can take modules individually or together. Any passed module is permanently valid. If you fail one module, you ONLY retake that single module.",
    steps: [
      // Module 1: Schreiben (3 Tasks, 60 Min)
      {
        id: "goethe-step-1",
        stepNumber: 1,
        phaseTitle: "Modul Schreiben (60 Min, 3 Aufgaben)",
        title: "Task 1: Personal Email to a Friend (ca. 80 Wörter)",
        subtitle: "Narrating an Event & Making Suggestions",
        durationMinutes: 20,
        moduleBadge: "Schreiben Aufgabe 1",
        passingObjective: "Write an 80-word personal email addressing all 3 prompt points with friendly salutations and closures.",
        whyThisGuaranteesPass: "Aufgabe 1 carries 40% of the writing score. Clean narrative with connectors secures easy points.",
        targetSection: "WRITING",
        actionButtonText: "Train Personal Email Template ➔",
        checklist: [
          "Informal greeting: 'Liebe/r...'",
          "Narrate event with past tense",
          "Propose meetup with 'Wollen wir...?'"
        ]
      },
      {
        id: "goethe-step-2",
        stepNumber: 2,
        phaseTitle: "Modul Schreiben (60 Min, 3 Aufgaben)",
        title: "Task 2: Online Forum Opinion Post (ca. 80 Wörter)",
        subtitle: "Expressing Views on Current Topics",
        durationMinutes: 25,
        moduleBadge: "Schreiben Aufgabe 2",
        passingObjective: "Write an 80-word discussion post stating your opinion, advantages, disadvantages, and conclusion.",
        whyThisGuaranteesPass: "Unique to Goethe B1. Memorizing opinion phrases ('Meiner Meinung nach...', 'Ich bin der Ansicht, dass...') guarantees top coherence marks.",
        targetSection: "WRITING",
        actionButtonText: "Train Forum Opinion Post ➔",
        checklist: [
          "State your opinion: 'Meiner Meinung nach...'",
          "Give supporting reason: 'Ein großer Vorteil ist...'",
          "Conclude: 'Zusammenfassend denke ich, dass...'"
        ]
      },
      {
        id: "goethe-step-3",
        stepNumber: 3,
        phaseTitle: "Modul Schreiben (60 Min, 3 Aufgaben)",
        title: "Task 3: Formal Apology / Request (ca. 40 Wörter)",
        subtitle: "Polite Notice to Instructor / Landlord",
        durationMinutes: 15,
        moduleBadge: "Schreiben Aufgabe 3",
        passingObjective: "Write a short 40-word formal email apologizing for absence and politely requesting materials.",
        whyThisGuaranteesPass: "Shortest task in the writing exam: using 'Sehr geehrte/r...' and 'Könnten Sie...' guarantees full points.",
        targetSection: "WRITING",
        actionButtonText: "Train Formal Apology Letter ➔",
        checklist: [
          "Formal salutation: 'Sehr geehrte/r...'",
          "State reason with polite apology",
          "Polite closing: 'Mit freundlichen Grüßen'"
        ]
      },

      // Module 2: Sprechen (15 Min, 3 Teile)
      {
        id: "goethe-step-4",
        stepNumber: 4,
        phaseTitle: "Modul Sprechen (15 Min, 3 Teile)",
        title: "Part 1: Joint Planning Dialogue with Partner",
        subtitle: "Collaborating on an Everyday Activity",
        durationMinutes: 20,
        moduleBadge: "Sprechen Teil 1",
        passingObjective: "Plan an activity with your partner across 4 prompt points in 3 minutes.",
        whyThisGuaranteesPass: "Shows active communication: propose, respond, negotiate, agree.",
        targetSection: "SPEAKING",
        actionButtonText: "Train Joint Planning Dialogue ➔",
        checklist: [
          "Make proposal: 'Wollen wir...?'",
          "React to partner proposal",
          "Agree on timing and equipment"
        ]
      },
      {
        id: "goethe-step-5",
        stepNumber: 5,
        phaseTitle: "Modul Sprechen (15 Min, 3 Teile)",
        title: "Part 2: 5-Step Topic Presentation",
        subtitle: "Structured 3-4 Minute Monologue",
        durationMinutes: 25,
        moduleBadge: "Sprechen Teil 2",
        passingObjective: "Present a topic fluently using: Intro, Personal Experience, Home Country, Pros & Cons, Conclusion.",
        whyThisGuaranteesPass: "The 5-step formula exactly matches the official Goethe evaluation grid.",
        targetSection: "SPEAKING",
        actionButtonText: "Master 5-Step Presentation Blueprint ➔",
        checklist: [
          "Step 1: Introduce topic",
          "Step 2: Personal experience",
          "Step 3: Situation in home country",
          "Step 4: Advantages & disadvantages",
          "Step 5: Closing & thank you"
        ]
      },
      {
        id: "goethe-step-6",
        stepNumber: 6,
        phaseTitle: "Modul Sprechen (15 Min, 3 Teile)",
        title: "Part 3: Questions & Feedback",
        subtitle: "Asking & Answering Questions",
        durationMinutes: 15,
        moduleBadge: "Sprechen Teil 3",
        passingObjective: "Ask a partner a relevant question about their presentation and answer examiner inquiries.",
        whyThisGuaranteesPass: "Demonstrates spontaneous comprehension.",
        targetSection: "SPEAKING",
        actionButtonText: "Practice Questions & Feedback ➔",
        checklist: [
          "Give feedback: 'Danke für die interessante Präsentation.'",
          "Ask detail question: 'Mich würde interessieren...'",
          "Answer examiner questions with complete sentences"
        ]
      },

      // Module 3: Lesen (65 Min, 5 Teile)
      {
        id: "goethe-step-7",
        stepNumber: 7,
        phaseTitle: "Modul Lesen (65 Min, 5 Teile)",
        title: "Teil 1: Blog & Personal Experience Reports",
        subtitle: "6 True/False Questions",
        durationMinutes: 15,
        moduleBadge: "Lesen Teil 1",
        passingObjective: "Evaluate 6 statements on a personal blog post in under 10 minutes.",
        whyThisGuaranteesPass: "Easiest reading section: chronological structure and everyday vocabulary.",
        targetSection: "READING",
        actionButtonText: "Train Blog Reading ➔",
        checklist: [
          "Read statements first",
          "Match synonyms in the text",
          "Watch out for negative qualifiers (kaum, selten)"
        ]
      },
      {
        id: "goethe-step-8",
        stepNumber: 8,
        phaseTitle: "Modul Lesen (65 Min, 5 Teile)",
        title: "Teil 2: Press Articles & Reports",
        subtitle: "6 Multiple-Choice Questions",
        durationMinutes: 20,
        moduleBadge: "Lesen Teil 2",
        passingObjective: "Extract detailed facts from two factual articles for 6 multiple-choice questions.",
        whyThisGuaranteesPass: "Questions follow text order. Verifying line evidence prevents mistakes.",
        targetSection: "READING",
        actionButtonText: "Train Article Reading ➔",
        checklist: [
          "Locate corresponding text paragraph",
          "Confirm exact factual basis",
          "Select best matching option a, b, or c"
        ]
      },
      {
        id: "goethe-step-9",
        stepNumber: 9,
        phaseTitle: "Modul Lesen (65 Min, 5 Teile)",
        title: "Teil 3: Matching Advertisements",
        subtitle: "7 Situations to 10 Ads",
        durationMinutes: 20,
        moduleBadge: "Lesen Teil 3",
        passingObjective: "Match 7 customer requirements to 10 ads, recognizing the 1 unmatchable person ('0').",
        whyThisGuaranteesPass: "High-yield score: scan for dates, opening hours, and target age groups.",
        targetSection: "READING",
        actionButtonText: "Train Ad Matching ➔",
        checklist: [
          "Underline customer restrictions",
          "Scan ads for exclusions",
          "Mark '0' when no ad fits"
        ]
      },
      {
        id: "goethe-step-10",
        stepNumber: 10,
        phaseTitle: "Modul Lesen (65 Min, 5 Teile)",
        title: "Teil 4: Forum Reader Opinions",
        subtitle: "7 Yes/No Evaluation Tasks",
        durationMinutes: 15,
        moduleBadge: "Lesen Teil 4",
        passingObjective: "Identify whether 7 short reader comments agree or disagree with the discussion question.",
        whyThisGuaranteesPass: "Only binary choices (Ja or Nein). Looking at overall emotional tone guarantees fast points.",
        targetSection: "READING",
        actionButtonText: "Train Forum Reader Opinions ➔",
        checklist: [
          "Read central discussion question",
          "Determine if author supports (Ja) or opposes (Nein)",
          "Beware authors who mention pros but conclude negative"
        ]
      },
      {
        id: "goethe-step-11",
        stepNumber: 11,
        phaseTitle: "Modul Lesen (65 Min, 5 Teile)",
        title: "Teil 5: Official Regulations & House Rules",
        subtitle: "4 Multiple-Choice Tasks",
        durationMinutes: 15,
        moduleBadge: "Lesen Teil 5",
        passingObjective: "Interpret written guidelines and rules for 4 multiple-choice questions.",
        whyThisGuaranteesPass: "Directly tests modal verbs (darf, muss, soll) in practical settings.",
        targetSection: "READING",
        actionButtonText: "Train House Rules & Regulations ➔",
        checklist: [
          "Identify rule headings",
          "Pay attention to modal verbs",
          "Check exceptions (z.B. 'Außer im Notfall')"
        ]
      },

      // Module 4: Hören (40 Min, 4 Teile)
      {
        id: "goethe-step-12",
        stepNumber: 12,
        phaseTitle: "Modul Hören (40 Min, 4 Teile)",
        title: "Teil 1: Short Announcements (2x Played)",
        subtitle: "5 Short Texts (10 Questions)",
        durationMinutes: 15,
        moduleBadge: "Hören Teil 1",
        passingObjective: "Answer 1 True/False and 1 Multiple-Choice question for each of 5 short announcements.",
        whyThisGuaranteesPass: "Played twice: use 1st listening to understand, 2nd listening to confirm details.",
        targetSection: "LISTENING",
        actionButtonText: "Train Short Announcements ➔",
        checklist: [
          "Underline keywords during prep pause",
          "Focus on the main message during first playback",
          "Verify detail during second playback"
        ]
      },
      {
        id: "goethe-step-13",
        stepNumber: 13,
        phaseTitle: "Modul Hören (40 Min, 4 Teile)",
        title: "Teil 2: Public Tour / Guide (1x Played)",
        subtitle: "5 Multiple-Choice Questions",
        durationMinutes: 15,
        moduleBadge: "Hören Teil 2",
        passingObjective: "Follow a monologue about a museum, park, or exhibition played only ONCE.",
        whyThisGuaranteesPass: "Pre-reading all 5 questions beforehand prevents getting lost in the audio.",
        targetSection: "LISTENING",
        actionButtonText: "Train Public Guide Audio ➔",
        checklist: [
          "Read all 5 questions quickly during prep time",
          "Listen for chronological transitions ('Zuerst...', 'Danach...')",
          "Never dwell on missed questions: stay with the speaker"
        ]
      },
      {
        id: "goethe-step-14",
        stepNumber: 14,
        phaseTitle: "Modul Hören (40 Min, 4 Teile)",
        title: "Teil 3: Informal Conversation (1x Played)",
        subtitle: "7 True/False Questions",
        durationMinutes: 15,
        moduleBadge: "Hören Teil 3",
        passingObjective: "Determine truth of 7 statements from an informal conversation played only ONCE.",
        whyThisGuaranteesPass: "Distinguishing who speaks which line is the key to 100% accuracy.",
        targetSection: "LISTENING",
        actionButtonText: "Train Informal Conversation ➔",
        checklist: [
          "Differentiate voices of the two speakers",
          "Check whether the speaker agrees or disagrees",
          "Select Richtig or Falsch"
        ]
      },
      {
        id: "goethe-step-15",
        stepNumber: 15,
        phaseTitle: "Modul Hören (40 Min, 4 Teile)",
        title: "Teil 4: Radio Discussion (2x Played)",
        subtitle: "8 Speaker Attribution Tasks",
        durationMinutes: 20,
        moduleBadge: "Hören Teil 4",
        passingObjective: "Attribute 8 statements to the moderator or either of the two guests.",
        whyThisGuaranteesPass: "Played twice: identifies individual perspectives on a debate.",
        targetSection: "LISTENING",
        actionButtonText: "Train Radio Discussion ➔",
        checklist: [
          "Identify moderator vs guest 1 vs guest 2",
          "Attribute statements during first listening",
          "Confirm choices during second playback"
        ]
      },

      // Phase 5: Citizenship Pass
      {
        id: "goethe-step-16",
        stepNumber: 16,
        phaseTitle: "German Citizenship Requirement",
        title: "Citizenship Test 33Q Mock Pass",
        subtitle: "Complete Naturalization Preparation",
        durationMinutes: 20,
        moduleBadge: "Citizenship Mock",
        passingObjective: "Score 17+ on the official 33-question catalog to satisfy BAMF naturalization criteria.",
        whyThisGuaranteesPass: "Ensures that both the B1 and citizenship qualifications are completed in parallel.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Launch Citizenship Mock ➔",
        checklist: [
          "Complete official 33-question sprint",
          "Review state-specific questions",
          "Verify pass status"
        ]
      }
    ]
  },

  CITIZENSHIP_ONLY: {
    examId: "CITIZENSHIP_ONLY",
    examName: "Einbürgerungstest / Leben in Deutschland",
    examBadge: "CITIZENSHIP FAST-TRACK",
    passingRuleSummary: "17 out of 33 Questions correct (51%) = Officially Passed for Naturalization",
    totalSteps: 8,
    estimatedTotalHours: "4-5 Hours (15-20 mins per step)",
    coreFocusNote: "Focus purely on your 310 official BAMF questions (300 general + 10 for your state). With bilingual cards and 10Q sprints, passing is guaranteed.",
    steps: [
      {
        id: "cit-step-1",
        stepNumber: 1,
        phaseTitle: "Phase 1: Basic Law & Constitutional Rights",
        title: "Core Constitutional Principles",
        subtitle: "Democracy, Rule of Law & Human Dignity",
        durationMinutes: 15,
        moduleBadge: "Grundgesetz",
        passingObjective: "Master Articles 1-20: Human Dignity, Freedom of Speech, Separation of Powers.",
        whyThisGuaranteesPass: "Appears in every citizenship test. Answers are straightforward and high-yield.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Train Constitutional Principles ➔",
        checklist: [
          "Article 1: 'Die Würde des Menschen ist unantastbar.'",
          "5 principles: Republik, Demokratie, Sozialstaat, Bundesstaat, Rechtsstaat",
          "Complete 10 constitutional questions"
        ]
      },
      {
        id: "cit-step-2",
        stepNumber: 2,
        phaseTitle: "Phase 1: Basic Law & Constitutional Rights",
        title: "Elections & Political System",
        subtitle: "Bundestag, Bundesrat & Chancellor",
        durationMinutes: 15,
        moduleBadge: "Politik",
        passingObjective: "Understand the roles of the Bundestag, Bundesrat, Bundeskanzler, and Bundespräsident.",
        whyThisGuaranteesPass: "Standard high-frequency test questions.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Train Political System ➔",
        checklist: [
          "Elections: frei, geheim, gleich, unmittelbar, allgemein",
          "Head of Government: Bundeskanzler/in",
          "Head of State: Bundespräsident/in"
        ]
      },
      {
        id: "cit-step-3",
        stepNumber: 3,
        phaseTitle: "Phase 2: German History & European Union",
        title: "Post-War History & Reunification",
        subtitle: "1949, 1989 & 1990 Milestones",
        durationMinutes: 15,
        moduleBadge: "Geschichte",
        passingObjective: "Master key historical dates: Fall of the Berlin Wall (9. Nov 1989), Day of German Unity (3. Okt 1990).",
        whyThisGuaranteesPass: "Historical dates are tested in 4 to 6 questions per test.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Train Historical Milestones ➔",
        checklist: [
          "Federal Republic founded: 1949",
          "Fall of Wall: 9. November 1989",
          "German Reunification: 3. Oktober 1990"
        ]
      },
      {
        id: "cit-step-4",
        stepNumber: 4,
        phaseTitle: "Phase 2: German History & European Union",
        title: "European Union & International Alliances",
        subtitle: "EU Institutions & Common Currency",
        durationMinutes: 15,
        moduleBadge: "Europa",
        passingObjective: "Identify EU member states, EU capital (Brussels), and core principles.",
        whyThisGuaranteesPass: "Always 2-3 questions about the European Union in the test.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Train EU & Europe ➔",
        checklist: [
          "European anthem: Ode an die Freude",
          "Schengen Area: Freedom of movement without border controls",
          "Complete 10 EU questions"
        ]
      },
      {
        id: "cit-step-5",
        stepNumber: 5,
        phaseTitle: "Phase 3: State-Specific Questions",
        title: "Your Federal State Questions (Landesfragen)",
        subtitle: "Capital, Coat of Arms & State Parliament",
        durationMinutes: 15,
        moduleBadge: "Bundesland",
        passingObjective: "Answer all 10 questions for your specific federal state (e.g. Berlin, Bayern, NRW).",
        whyThisGuaranteesPass: "The official test always includes 3 state-specific questions (Questions 31-33).",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Select State & Practice ➔",
        checklist: [
          "Identify state capital and coat of arms",
          "Identify state parliament (Landtag)",
          "Know minimum voting age in state elections"
        ]
      },
      {
        id: "cit-step-6",
        stepNumber: 6,
        phaseTitle: "Phase 4: Full Simulation",
        title: "Official 33-Question Simulation 1",
        subtitle: "First Full Mock Exam",
        durationMinutes: 20,
        moduleBadge: "Mock Test 1",
        passingObjective: "Achieve at least 25 out of 33 correct (passing threshold is 17).",
        whyThisGuaranteesPass: "Builds real exam confidence with immediate scoring.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Launch Mock Test 1 ➔",
        checklist: [
          "Complete 33 questions",
          "Review missed questions",
          "Verify pass score"
        ]
      },
      {
        id: "cit-step-7",
        stepNumber: 7,
        phaseTitle: "Phase 4: Full Simulation",
        title: "Review Bookmarked & Tricky Questions",
        subtitle: "Eliminating Weak Spots",
        durationMinutes: 15,
        moduleBadge: "Weak Spots",
        passingObjective: "Review all previously missed or bookmarked citizenship questions.",
        whyThisGuaranteesPass: "Guarantees 100% accuracy on edge cases.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Review Tricky Questions ➔",
        checklist: [
          "Filter by failed questions",
          "Re-attempt until answered correctly twice",
          "Clear bookmark backlog"
        ]
      },
      {
        id: "cit-step-8",
        stepNumber: 8,
        phaseTitle: "Phase 4: Full Simulation",
        title: "Official 33-Question Simulation 2 (Final Mastery)",
        subtitle: "Certifying 100% Exam Readiness",
        durationMinutes: 20,
        moduleBadge: "Final Simulation",
        passingObjective: "Score 30+ out of 33 on a randomized official question set.",
        whyThisGuaranteesPass: "Official pass certificate unlocked.",
        targetSection: "CITIZENSHIP",
        actionButtonText: "Take Final Certification Mock ➔",
        checklist: [
          "Complete randomized mock test",
          "Achieve 90%+ score",
          "Download pass confirmation"
        ]
      }
    ]
  }
};
