clean_section = """## German Prep Platform: Zero to B1 Pass Guarantee Architecture
- **Coach Mindset & Core Philosophy**:
  - Purpose: Guaranteed B1 pass for complete beginners starting from A0.
  - Passing Standard: 60% threshold in Goethe-Zertifikat B1 (each module independent, repeat only failed modules) and telc Deutsch B1 (135/225 written, 45/75 oral).
- **Core Progression Engine (`ZeroToB1MasterFlight.tsx` & `a0_to_b1_master_data.ts`)**:
  - Primary Navigation: Dedicated 'A0 -> B1' Rocket tab in `Navbar.tsx` and `MobileBottomNav.tsx`.
  - Hero Coach Cockpit: Level selector (A0, A1, A2, B1, Exam Sprint) with progress tracker in localStorage.
  - Today's 3-Step Guided Mission: Step 1 (10m Learn Formula), Step 2 (15m Active Recall Drill), Step 3 (15m Output Sprint).
  - 5-Stage Flight Progression:
    1. Stage 0 (A0 Survival Skeleton): 4 verb endings (-e, -st, -t, -en), Position 2 rule, sein/haben.
    2. Stage 1 (A1 Sentence Builder): Gender suffix rules, Akkusativ masculine change, modal verbs, negation.
    3. Stage 2 (A2 Flow & Past Tense): Perfekt (haben vs sein motion rule), 7 dative kings (aus, bei, mit...), reflexive and separable verbs.
    4. Stage 3 (B1 Architecture): Subordinate Verb Kicker (weil, dass, obwohl, wenn, deshalb), relative clauses, passiv, Konjunktiv II.
    5. Stage 4 (B1 Hacks & Safety Net): Der/Die/Das decoded, Verb Kicker Train, Universal 45/45 Email Blueprint, Speaking rescue kit, 60% exam math calculator.
- **Mastery Practice Arena (`ZeroToB1MasterFlight.tsx` & `zero_to_b1_practice_drills_data.ts`)**:
  - 115+ authentic high-yield exam practice drills across 6 dedicated categories:
    1. Conjugations & Verbs (20 Qs): Präsens endings, stem changes (e->i/ie, a->ä), Präteritum, modal verbs, kennen vs wissen, haben vs sein.
    2. Konjunktiv II & Subjunctive (15 Qs): Polite requests (könnten, würden), wishes (hätte, wäre), advice (sollte, müsste), polite questions (dürfte).
    3. Partizip II & Perfekt Past (20 Qs): Regular ge...t, irregular ge...en, -ieren (no ge-), inseparables (no ge-), separables, Haben vs Sein motion/state change.
    4. Der / Die / Das Gender Rules (20 Qs): 100% feminine suffixes (-ung, -heit, -keit, -schaft, -tät, -ion), 100% neuter (-chen, -lein, -ment, -um, -nis, gerunds), 100% masculine (-ling, -or, -ist, days, seasons, car brands), compound nouns.
    5. Den, Dem, Die, Des 4 Cases (25 Qs): Nominativ, Akkusativ masculine change (der->den, ein->einen), Dativ 7 kings (dem, der, dem, den + n), Genitiv (des, der, wegen, trotz, während, statt), Two-Way prepositions (Wo? Dativ vs Wohin? Akkusativ), personal pronouns across all cases.
    6. Sentence Connectors & Word Order (15 Qs): ADUSO Position 0, Adverbs Position 1 with inversion, Subordinating verb kickers (weil, dass, obwohl, wenn), final purpose (damit vs um...zu), past time (als vs wenn), two-part connectors (nicht nur... sondern auch, sowohl... als auch, weder... noch), relative clauses.
  - Dual Input Modes: Active Typing Recall (with German umlaut buttons ä, ö, ü, ß) and Rapid Click Chips mode.
  - Instant Feedback: Rule explanations, exam tips, streak tracking with confetti celebration, and real-time German speech pronunciation.
- **Multi-Level Mock Exam Arena (`FullMockExamArena.tsx` & `mock_exams_multi_level_data.ts`)**:
  - 24 authentic mock exams across telc & Goethe for A1, A2, and B1 (Sets 1 to 4 each) with Lesen, Hören, Schreiben, and Sprechen.
  - Interactive timer, audio player, word counter, and official Zeugnis auto-grading.
- **Learn Academy & Verb Master Bank (`ViobeanLearnAcademy.tsx` & `VerbMasterLibrary.tsx`)**:
  - 15 comprehensive interactive lesson blueprints (A1 to B1) with 8-step interactive player.
  - 26-topic Verb Master Library with 208 audio-enabled example sentences and 78 typing/chip workouts.
- **Strict Constraints Verified**:
  - Zero em dashes across all source files, documentation, and chat responses.
  - Zero alcohol and smoking emojis.
"""

for path in ['/Users/testy/Desktop/code/GEMINI.md', '/Users/testy/Desktop/code/AGENTS.md']:
    content = open(path).read()
    marker = '## German Prep Platform: Zero to B1 Pass Guarantee Architecture'
    idx = content.find(marker)
    if idx != -1:
        content = content[:idx] + clean_section
    else:
        content = content.rstrip() + '\n\n' + clean_section
    with open(path, 'w') as f:
        f.write(content)
    print(f'Successfully updated {path}!')
