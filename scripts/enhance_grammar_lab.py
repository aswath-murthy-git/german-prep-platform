#!/usr/bin/env python3
import sys

path = "german-prep-platform/src/components/B1GrammarPassLab.tsx"
content = open(path, "r", encoding="utf-8").read()

# 1. Update activeTab type definition
old_tab_type = 'const [activeTab, setActiveTab] = useState<"MODAL_VERBS" | "SATZBAU" | "QUIZ" | "PUZZLE" | "PASS_GUARANTEE" | "VERBS_LIBRARY">("MODAL_VERBS");'
new_tab_type = 'const [activeTab, setActiveTab] = useState<"MODAL_VERBS" | "REFLEXIV" | "PARTIZIP_2" | "SATZBAU" | "QUIZ" | "PUZZLE" | "PASS_GUARANTEE" | "VERBS_LIBRARY">("MODAL_VERBS");'

assert old_tab_type in content, "old_tab_type not found"
content = content.replace(old_tab_type, new_tab_type, 1)

# 2. Update tab switcher buttons array
old_tabs_array = """        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "MODAL_VERBS", label: "1. The 6 Modal Verbs", icon: Sparkles },
            { id: "SATZBAU", label: "2. Sentence Word Order (Satzbau)", icon: Layers },
            { id: "QUIZ", label: "3. 10-Question Pass Drill", icon: CheckCircle2 },
            { id: "PUZZLE", label: "4. Word Order Sentence Puzzle", icon: RotateCcw },
            { id: "PASS_GUARANTEE", label: "5. Will I Pass B1? (Guarantee)", icon: Award },
            { id: "VERBS_LIBRARY", label: "6. Verb Master Bank (26 Rules & 200+ Examples)", icon: Zap }
          ].map((tab) => {"""

new_tabs_array = """        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "MODAL_VERBS", label: "1. The 6 Modal Verbs", icon: Sparkles },
            { id: "REFLEXIV", label: "2. Reflexive Verben (mich/sich)", icon: RotateCcw },
            { id: "PARTIZIP_2", label: "3. Partizip II & Perfekt", icon: Award },
            { id: "SATZBAU", label: "4. Sentence Word Order (Satzbau)", icon: Layers },
            { id: "QUIZ", label: "5. 10-Question Pass Drill", icon: CheckCircle2 },
            { id: "PUZZLE", label: "6. Word Order Sentence Puzzle", icon: RotateCcw },
            { id: "PASS_GUARANTEE", label: "7. Will I Pass B1? (Guarantee)", icon: Award },
            { id: "VERBS_LIBRARY", label: "8. Verb Master Bank (26 Rules & 200+ Examples)", icon: Zap }
          ].map((tab) => {"""

assert old_tabs_array in content, "old_tabs_array not found"
content = content.replace(old_tabs_array, new_tabs_array, 1)

# 3. Add states for Reflexive and Partizip II
old_states_marker = """  const [modalWorkoutScore, setModalWorkoutScore] = useState<number>(0);"""
new_states = """  const [modalWorkoutScore, setModalWorkoutScore] = useState<number>(0);

  // Reflexive Verbs Workout State
  const [reflexivDrillIdx, setReflexivDrillIdx] = useState<number>(0);
  const [reflexivTyped, setReflexivTyped] = useState<string>("");
  const [reflexivSelected, setReflexivSelected] = useState<string | null>(null);
  const [reflexivSubmitted, setReflexivSubmitted] = useState<boolean>(false);
  const [reflexivIsCorrect, setReflexivIsCorrect] = useState<boolean | null>(null);
  const [reflexivScore, setReflexivScore] = useState<number>(0);
  const [reflexivMode, setReflexivMode] = useState<"TYPE" | "CHIP">("TYPE");

  // Partizip II Workout State
  const [partizipDrillIdx, setPartizipDrillIdx] = useState<number>(0);
  const [partizipTyped, setPartizipTyped] = useState<string>("");
  const [partizipSelected, setPartizipSelected] = useState<string | null>(null);
  const [partizipSubmitted, setPartizipSubmitted] = useState<boolean>(false);
  const [partizipIsCorrect, setPartizipIsCorrect] = useState<boolean | null>(null);
  const [partizipScore, setPartizipScore] = useState<number>(0);
  const [partizipMode, setPartizipMode] = useState<"TYPE" | "CHIP">("TYPE");"""

assert old_states_marker in content, "old_states_marker not found"
content = content.replace(old_states_marker, new_states, 1)

# 4. Insert Reflexiv & Partizip 2 data collections and JSX views
reflexiv_jsx = """
      {/* TAB 2: REFLEXIVE VERBEN (mich, dich, sich) */}
      {activeTab === "REFLEXIV" && (() => {
        const reflexivItems = [
          {
            id: 1,
            before: "Ich freue",
            blank: "mich",
            after: "sehr auf meinen Urlaub in Spanien.",
            acceptable: ["mich"],
            options: ["mich", "mir", "sich", "dich"],
            translation: "I look forward very much to my vacation in Spain.",
            rule: "'sich freuen auf' takes Akkusativ: 'ich freue mich'."
          },
          {
            id: 2,
            before: "Herr Müller bewirbt",
            blank: "sich",
            after: "um die Stelle als Projektleiter.",
            acceptable: ["sich"],
            options: ["sich", "ihn", "ihm", "mich"],
            translation: "Mr. Müller applies for the position as project manager.",
            rule: "3rd-person singular 'Herr Müller' always takes 'sich'!"
          },
          {
            id: 3,
            before: "Ich putze",
            blank: "mir",
            after: "jeden Morgen gründlich die Zähne.",
            acceptable: ["mir"],
            options: ["mir", "mich", "dir", "sich"],
            translation: "I brush my teeth thoroughly every morning.",
            rule: "Dativ 'mir' because a direct object ('die Zähne') is present!"
          },
          {
            id: 4,
            before: "Wann treffen",
            blank: "wir",
            after: "uns am Samstag vor dem Kino?",
            acceptable: ["wir", "uns"],
            options: ["uns", "euch", "sich", "wir"],
            translation: "When do we meet on Saturday in front of the cinema?",
            rule: "1st-person plural reflexive pronoun is 'uns': 'wir treffen uns'."
          },
          {
            id: 5,
            before: "Interessieren Sie",
            blank: "sich",
            after: "für deutsche Geschichte und Kultur?",
            acceptable: ["sich"],
            options: ["sich", "Ihnen", "Sie", "euch"],
            translation: "Are you interested in German history and culture?",
            rule: "Formal 'Sie' takes 'sich': 'Interessieren Sie sich für...?'"
          },
          {
            id: 6,
            before: "Ich merke",
            blank: "mir",
            after: "die wichtigsten Grammatikregeln für die B1-Prüfung.",
            acceptable: ["mir"],
            options: ["mir", "mich", "sich", "dir"],
            translation: "I memorize the most important grammar rules for the B1 exam.",
            rule: "'sich merken' takes Dativ: 'ich merke mir'."
          }
        ];

        const curReflexiv = reflexivItems[reflexivDrillIdx % reflexivItems.length];

        const handleCheckReflexiv = (val?: string) => {
          const input = (val || reflexivTyped).trim().toLowerCase();
          if (!input) return;
          const isCorrect = curReflexiv.acceptable.includes(input);
          setReflexivSubmitted(true);
          setReflexivIsCorrect(isCorrect);
          if (isCorrect) {
            setReflexivScore(prev => prev + 1);
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
          }
        };

        const handleNextReflexiv = () => {
          setReflexivDrillIdx(prev => (prev + 1) % reflexivItems.length);
          setReflexivTyped("");
          setReflexivSelected(null);
          setReflexivSubmitted(false);
          setReflexivIsCorrect(null);
        };

        return (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    High-Yield B1 Reflexive Verben
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Reflexive Verben: Akkusativ vs. Dativ
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    90% of German reflexive verbs take Akkusativ (mich, dich, sich). Only when a direct noun object is present does it switch to Dativ (mir, dir).
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-black text-amber-400">{reflexivScore} / {reflexivItems.length}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Workout Score</div>
                </div>
              </div>

              {/* Pronoun Reference Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="p-3">Personalpronomen</th>
                      <th className="p-3 text-purple-400">Akkusativ (Standard)</th>
                      <th className="p-3 text-cyan-400">Dativ (Mit weiterem Objekt)</th>
                      <th className="p-3">Praxis-Beispiel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                    <tr>
                      <td className="p-3 font-bold text-white">ich</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">mich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">mir</td>
                      <td className="p-3">Ich wasche mich. vs. Ich wasche mir die Hände.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">du</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">dich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">dir</td>
                      <td className="p-3">Du ziehst dich an. vs. Du putzt dir die Zähne.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">er / sie / es</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">sich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">sich</td>
                      <td className="p-3 text-amber-300 font-bold">Always 'sich' in both cases!</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">wir</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">uns</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">uns</td>
                      <td className="p-3">Wir treffen uns um 18 Uhr.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">ihr</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">euch</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">euch</td>
                      <td className="p-3">Ruht euch gut aus!</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">sie / Sie</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">sich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">sich</td>
                      <td className="p-3 text-amber-300 font-bold">Always 'sich' in both cases!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Workout Card */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-purple-500/30 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-400">
                  Reflexive Sentence Workout (Question {curReflexiv.id} of {reflexivItems.length})
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setReflexivMode("TYPE")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      reflexivMode === "TYPE" ? "bg-purple-600 text-white border-purple-500" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Typing Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setReflexivMode("CHIP")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      reflexivMode === "CHIP" ? "bg-purple-600 text-white border-purple-500" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Multiple Choice Chips
                  </button>
                </div>
              </div>

              {/* Sentence Blank Display */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center text-lg sm:text-xl font-black text-white leading-relaxed">
                &ldquo;{curReflexiv.before}
                <span className="inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[70px] bg-slate-950 border-purple-400 text-purple-300">
                  {reflexivSelected || reflexivTyped || "___"}
                </span>
                {curReflexiv.after}&rdquo;
              </div>

              {/* Input Area */}
              {reflexivMode === "TYPE" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reflexivTyped}
                    onChange={(e) => setReflexivTyped(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckReflexiv()}
                    placeholder="Type missing reflexive pronoun (mich, mir, sich...)"
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckReflexiv()}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-2xl transition"
                  >
                    Check
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {curReflexiv.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setReflexivSelected(opt);
                        handleCheckReflexiv(opt);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition ${
                        reflexivSelected === opt
                          ? reflexivIsCorrect
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-rose-600 text-white border-rose-500"
                          : "bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback Banner */}
              {reflexivSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold space-y-1 ${
                  reflexivIsCorrect ? "bg-emerald-950/60 border-emerald-500 text-emerald-200" : "bg-rose-950/60 border-rose-500 text-rose-200"
                }`}>
                  <div className="flex items-center gap-1.5">
                    {reflexivIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{reflexivIsCorrect ? "Ausgezeichnet! Richtig!" : `Falsch! Erwartet: ${curReflexiv.acceptable[0]}`}</span>
                  </div>
                  <div className="font-normal text-slate-200">{curReflexiv.rule}</div>
                  <div className="text-[11px] text-slate-400 pt-1">Translation: {curReflexiv.translation}</div>
                </div>
              )}

              {reflexivSubmitted && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleNextReflexiv}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Next Reflexive Sentence ({((reflexivDrillIdx + 1) % reflexivItems.length) + 1} of {reflexivItems.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* TAB 3: PARTIZIP II & PERFEKT (Past Tense Master) */}
      {activeTab === "PARTIZIP_2" && (() => {
        const partizipItems = [
          {
            id: 1,
            before: "Ich habe gestern meine Hausaufgaben sorgfältig",
            blank: "gemacht",
            after: ".",
            acceptable: ["gemacht"],
            options: ["gemacht", "gemachen", "macht", "gemachte"],
            translation: "I did my homework carefully yesterday.",
            rule: "Regular weak verb: ge- + mach- + -t = 'gemacht'."
          },
          {
            id: 2,
            before: "Mein Bruder hat fünf Jahre in Heidelberg Medizin",
            blank: "studiert",
            after: ".",
            acceptable: ["studiert"],
            options: ["studiert", "gestudiert", "studieren", "studierte"],
            translation: "My brother studied medicine in Heidelberg for five years.",
            rule: "Verbs ending in '-ieren' NEVER take 'ge-': studieren -> studiert!"
          },
          {
            id: 3,
            before: "Der Zug ist pünktlich um 14 Uhr am Hauptbahnhof",
            blank: "angekommen",
            after: ".",
            acceptable: ["angekommen"],
            options: ["angekommen", "geankommen", "ankommt", "angekommt"],
            translation: "The train arrived punctually at 2 PM at the main station.",
            rule: "Separable verb: prefix (an-) + -ge- + strong stem (-komm-) + -en = 'angekommen'. Triggers SEIN!"
          },
          {
            id: 4,
            before: "Er hat die schwierige Grammatikregel sofort",
            blank: "verstanden",
            after: ".",
            acceptable: ["verstanden"],
            options: ["verstanden", "geverstanden", "versteht", "verstandet"],
            translation: "He understood the difficult grammar rule immediately.",
            rule: "Inseparable prefix 'ver-': NEVER takes 'ge-': verstehen -> verstanden."
          },
          {
            id: 5,
            before: "Am Wochenende sind wir zu Hause",
            blank: "geblieben",
            after: ", weil es geregnet hat.",
            acceptable: ["geblieben"],
            options: ["geblieben", "bleiben", "gebleibt", "gebliebt"],
            translation: "On the weekend we stayed at home because it rained.",
            rule: "Vowel mutation: bleiben -> geblieben. Triggers SEIN ('wir sind geblieben')!"
          },
          {
            id: 6,
            before: "Ich habe heute morgen eine wichtige E-Mail an die Behörde",
            blank: "geschrieben",
            after: ".",
            acceptable: ["geschrieben"],
            options: ["geschrieben", "geschreibt", "schreiben", "geschriebt"],
            translation: "I wrote an important email to the authority this morning.",
            rule: "Strong verb with vowel change: schreiben (ei) -> geschrieben (ie)."
          }
        ];

        const curPartizip = partizipItems[partizipDrillIdx % partizipItems.length];

        const handleCheckPartizip = (val?: string) => {
          const input = (val || partizipTyped).trim().toLowerCase();
          if (!input) return;
          const isCorrect = curPartizip.acceptable.includes(input);
          setPartizipSubmitted(true);
          setPartizipIsCorrect(isCorrect);
          if (isCorrect) {
            setPartizipScore(prev => prev + 1);
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
          }
        };

        const handleNextPartizip = () => {
          setPartizipDrillIdx(prev => (prev + 1) % partizipItems.length);
          setPartizipTyped("");
          setPartizipSelected(null);
          setPartizipSubmitted(false);
          setPartizipIsCorrect(null);
        };

        return (
          <div className="space-y-6">
            {/* Blueprint Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High-Yield B1 Perfekt & Vergangenheit
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Partizip II & Perfekt: Die 5 Goldenen Regeln
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Spoken German in B1 uses Perfekt (haben / sein + Partizip II) for 95% of past events!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-black text-amber-400">{partizipScore} / {partizipItems.length}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Workout Score</div>
                </div>
              </div>

              {/* 5 Rules Cheat Sheet */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">1. Regelmäßige Verben:</span>
                  <div className="font-mono text-purple-300">ge- + Stamm + -t</div>
                  <div className="text-slate-400">machen -> gemacht | kaufen -> gekauft</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">2. Verben auf -ieren:</span>
                  <div className="font-mono text-cyan-300">Stamm + -t (NIEMALS ge-!)</div>
                  <div className="text-slate-400">studieren -> studiert | reparieren -> repariert</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">3. Trennbare Verben:</span>
                  <div className="font-mono text-emerald-300">Vorsilbe + -ge- + Stamm + -t/-en</div>
                  <div className="text-slate-400">einkaufen -> eingekauft | anrufen -> angerufen</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">4. Untrennbare Verben:</span>
                  <div className="font-mono text-rose-300">be-, ver-, er-, ent- (KEIN ge-!)</div>
                  <div className="text-slate-400">verstehen -> verstanden | besuchen -> besucht</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 md:col-span-2">
                  <span className="font-bold text-amber-400 block">5. Hilfsverb: haben vs. sein</span>
                  <div className="text-slate-300">
                    <strong>SEIN</strong> bei Bewegung von A nach B (ist gefahren, ist gelaufen) & Zustandswechsel (ist aufgewacht, ist gestorben) sowie bei <em>bleiben</em> (ist geblieben). <strong>HABEN</strong> für alle anderen!
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Partizip II Workout */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-amber-500/30 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400">
                  Partizip II Sentence Workout (Question {curPartizip.id} of {partizipItems.length})
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPartizipMode("TYPE")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      partizipMode === "TYPE" ? "bg-amber-500 text-slate-950 border-amber-400 font-black" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Typing Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartizipMode("CHIP")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      partizipMode === "CHIP" ? "bg-amber-500 text-slate-950 border-amber-400 font-black" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Multiple Choice Chips
                  </button>
                </div>
              </div>

              {/* Sentence Blank Display */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center text-lg sm:text-xl font-black text-white leading-relaxed">
                &ldquo;{curPartizip.before}
                <span className="inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[80px] bg-slate-950 border-amber-400 text-amber-300">
                  {partizipSelected || partizipTyped || "___"}
                </span>
                {curPartizip.after}&rdquo;
              </div>

              {/* Input Area */}
              {partizipMode === "TYPE" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={partizipTyped}
                    onChange={(e) => setPartizipTyped(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckPartizip()}
                    placeholder="Type missing Partizip II (gemacht, studiert, angekommen...)"
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckPartizip()}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl transition"
                  >
                    Check
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {curPartizip.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setPartizipSelected(opt);
                        handleCheckPartizip(opt);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition ${
                        partizipSelected === opt
                          ? partizipIsCorrect
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-rose-600 text-white border-rose-500"
                          : "bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback Banner */}
              {partizipSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold space-y-1 ${
                  partizipIsCorrect ? "bg-emerald-950/60 border-emerald-500 text-emerald-200" : "bg-rose-950/60 border-rose-500 text-rose-200"
                }`}>
                  <div className="flex items-center gap-1.5">
                    {partizipIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{partizipIsCorrect ? "Ausgezeichnet! Richtig!" : `Falsch! Erwartet: ${curPartizip.acceptable[0]}`}</span>
                  </div>
                  <div className="font-normal text-slate-200">{curPartizip.rule}</div>
                  <div className="text-[11px] text-slate-400 pt-1">Translation: {curPartizip.translation}</div>
                </div>
              )}

              {partizipSubmitted && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleNextPartizip}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-md"
                  >
                    Next Partizip II Sentence ({((partizipDrillIdx + 1) % partizipItems.length) + 1} of {partizipItems.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
"""

insert_marker = """      {/* TAB 1: THE 6 MODAL VERBS */}"""
assert insert_marker in content, "insert_marker not found"

# Insert the reflexiv and partizip2 JSX right after modal verbs block or before satzbau
# Let's find where SATZBAU starts:
satzbau_marker = """      {/* TAB 2: SATZBAU (SENTENCE WORD ORDER) */}"""
pos = content.find(satzbau_marker)
assert pos != -1, f"{satzbau_marker} not found"

content = content[:pos] + reflexiv_jsx + "\n" + content[pos:]

# Check for em dashes
if '\u2014' in content:
    print("Found em dash! Replacing...")
    content = content.replace('\u2014', ' - ')

open(path, "w", encoding="utf-8").write(content)
print("Updated B1GrammarPassLab.tsx successfully!")
