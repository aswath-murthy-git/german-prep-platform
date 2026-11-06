#!/usr/bin/env python3
"""
Adds the full 15-minute B1 Speaking Exam conversation master sample to src/components/ViobeanSpeakingPartner.tsx
Strictly 0 em dashes (\u2014) and 0 forbidden emojis.
"""
import sys

DATA_BLOCK = """
interface FullExamTurn {
  speaker: "Prüfer" | "Kandidat A" | "Kandidat B";
  phase: "Teil 1: Vorstellung" | "Teil 2: Präsentation & Frage" | "Teil 3: Gemeinsam planen" | "Abschluss";
  tag: string;
  de: string;
  en: string;
}

const FULL_EXAM_CONVERSATION: FullExamTurn[] = [
  // ── PHASE 1: TEIL 1 (Kennenlernen & Fragen) ──
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Eröffnung & Einladung",
    de: "Guten Tag, meine Damen und Herren! Willkommen zur mündlichen B1-Prüfung. Mein Name ist Frau Dr. Weber. Wir beginnen mit Teil 1: Bitte stellen Sie sich kurz vor. Herr Sharma, möchten Sie anfangen?",
    en: "Good day, ladies and gentlemen! Welcome to the B1 oral exam. My name is Dr. Weber. We begin with Part 1: Please introduce yourselves briefly. Mr. Sharma, would you like to start?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 1: Vorstellung",
    tag: "6-Satz Blueprint",
    de: "Sehr gern. Mein Name ist Rahul Sharma und ich komme aus Indien. Seit zwei Jahren wohne ich in Deutschland in Berlin. Ich bin verheiratet und habe einen kleinen Sohn. Von Beruf bin ich Softwareentwickler bei einem internationalen Unternehmen. Meine Muttersprache ist Hindi, aber ich spreche auch fließend Englisch und lerne jetzt Deutsch, weil ich hier langfristig leben und arbeiten möchte. In meiner Freizeit spiele ich sehr gern Fußball und koche am Wochenende für meine Familie.",
    en: "With pleasure. My name is Rahul Sharma and I come from India. I have been living in Germany in Berlin for two years. I am married and have a young son. By profession I am a software developer at an international company. My native language is Hindi, but I also speak fluent English and am now learning German because I want to live and work here long term. In my free time I like playing football and cooking for my family on weekends."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Prüfer-Rückfrage",
    de: "Vielen Dank, Herr Sharma. Wie gefällt Ihnen Ihre Arbeit in Berlin und wie lange lernen Sie schon Deutsch?",
    en: "Thank you very much, Mr. Sharma. How do you like your work in Berlin and how long have you been learning German?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 1: Vorstellung",
    tag: "Souveräne Antwort",
    de: "Meine Arbeit gefällt mir sehr gut, weil meine Kollegen hilfsbereit sind. Ich lerne seit etwa einem Jahr intensiv Deutsch, zuerst im Online-Kurs und jetzt im Integrationskurs.",
    en: "I like my work very much because my colleagues are helpful. I have been learning German intensively for about one year, first in an online course and now in the integration course."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Partner-Vorstellung",
    de: "Wunderbar. Frau Santos, nun sind Sie an der Reihe. Bitte stellen Sie sich vor.",
    en: "Wonderful. Ms. Santos, now it is your turn. Please introduce yourself."
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 1: Vorstellung",
    tag: "Partnerin stellt sich vor",
    de: "Guten Tag. Ich heiße Maria Santos und komme aus Brasilien. Ich lebe seit anderthalb Jahren in Potsdam. Ich bin ledig. In Brasilien habe ich als Krankenschwester gearbeitet und mache hier gerade die Anerkennung meiner Ausbildung. In meiner Freizeit lese ich gern deutsche Romane und fahre viel Fahrrad.",
    en: "Good day. My name is Maria Santos and I come from Brazil. I have been living in Potsdam for one and a half years. I am single. In Brazil I worked as a nurse and am currently getting my qualifications recognized here. In my free time I like reading German novels and cycling a lot."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 1: Vorstellung",
    tag: "Übergang zu Teil 2",
    de: "Danke schön, Frau Santos. Teil 1 ist damit abgeschlossen.",
    en: "Thank you, Ms. Santos. Part 1 is now completed."
  },

  // ── PHASE 2: TEIL 2 (Präsentation & Partner-Rückfrage) ──
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Präsentationsaufruf",
    de: "Nun kommen wir zu Teil 2: Ein Thema präsentieren. Herr Sharma, bitte halten Sie Ihre Präsentation zum Thema 'Brauchen Schulkinder ein eigenes Smartphone?'. Frau Santos, hören Sie bitte aufmerksam zu, denn Sie sollen anschließend eine Frage stellen.",
    en: "Now we come to Part 2: Presenting a topic. Mr. Sharma, please give your presentation on the topic 'Do school children need their own smartphone?'. Ms. Santos, please listen attentively, as you will ask a question afterwards."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 2: Präsentation & Frage",
    tag: "5-Punkte Präsentation",
    de: "Guten Tag zusammen. Das Thema meiner Präsentation lautet: 'Brauchen Schulkinder ein eigenes Smartphone?'. Ich habe dieses Thema gewählt, weil digitale Medien heutzutage jeden Haushalt betreffen. In meiner persönlichen Erfahrung habe ich bei meinem Neffen gesehen, dass er stundenlang am Handy spielte und sich kaum noch draußen bewegte. In meinem Heimatland Indien besitzen viele Kinder schon ab der fünften Klasse ein Smartphone, damit Eltern sie auf dem Schulweg jederzeit anrufen können. Einerseits bietet ein Smartphone große Vorteile: Man kann im Notfall sofort Hilfe rufen und nützliche Lern-Apps nutzen. Andererseits gibt es erhebliche Nachteile: Zu viel Bildschirmzeit schadet der Konzentration und den Augen. Meiner Meinung nach sollten Kinder erst ab etwa 12 Jahren ein eigenes Smartphone bekommen, und auch dann nur mit festen Zeitregeln. Das war meine Präsentation. Vielen Dank für Ihre Aufmerksamkeit!",
    en: "Good day everyone. The topic of my presentation is: 'Do school children need their own smartphone?'. I chose this topic because digital media affects every household today. In my personal experience with my nephew, I saw that he played on his phone for hours and barely moved outside. In my home country India, many children own a smartphone from fifth grade so parents can reach them on the way to school. On one hand, a smartphone offers great advantages: one can call for help immediately in an emergency and use learning apps. On the other hand, there are considerable disadvantages: too much screen time harms concentration and eyesight. In my opinion, children should only get their own smartphone from around age 12, and even then only with firm time rules. That was my presentation. Thank you for your attention!"
  },
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Aufforderung zur Partnerfrage",
    de: "Vielen Dank, Herr Sharma. Frau Santos, welche Frage möchten Sie Herrn Sharma zu seiner Präsentation stellen?",
    en: "Thank you very much, Mr. Sharma. Ms. Santos, what question would you like to ask Mr. Sharma about his presentation?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Relevante Partnerfrage",
    de: "Vielen Dank für deine interessante Präsentation, Rahul. Mich würde interessieren: Glaubst du, dass Schulen Smartphones im Unterricht erlauben sollten oder sollten sie komplett verboten sein?",
    en: "Thank you for your interesting presentation, Rahul. I would be interested to know: Do you believe that schools should allow smartphones in class or should they be completely forbidden?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Begründete Antwort",
    de: "Das ist eine sehr gute Frage, Maria. Ich denke, während des normalen Unterrichts sollten Handys in der Schultasche bleiben. Aber wenn Lehrer sie gezielt für ein Recherche-Projekt einsetzen, kann es sehr lehrreich sein.",
    en: "That is a very good question, Maria. I think during normal lessons phones should stay in school bags. But when teachers purposefully use them for research projects, it can be very educational."
  },
  {
    speaker: "Prüfer",
    phase: "Teil 2: Präsentation & Frage",
    tag: "Prüfer-Abschluss Teil 2",
    de: "Sehr gut argumentiert von Ihnen beiden. Damit ist Teil 2 beendet.",
    en: "Very well argued by both of you. That concludes Part 2."
  },

  // ── PHASE 3: TEIL 3 (Gemeinsam planen & Verhandeln) ──
  {
    speaker: "Prüfer",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Aufgabenstellung Teil 3",
    de: "Nun kommen wir zu Teil 3: Gemeinsam eine Aufgabe planen. Ihr gemeinsamer Deutschkurs-Kollege Thomas zieht nächsten Monat zurück in seine Heimat. Sie möchten eine Abschiedsfeier für ihn organisieren. Planen Sie gemeinsam: Wann und wo findet die Feier statt? Was bringen Sie zu essen und zu trinken mit? Welches Geschenk kaufen Sie? Und wie teilen Sie die Kosten auf? Sie haben etwa fünf Minuten Zeit.",
    en: "Now we come to Part 3: Planning a task together. Your fellow German course colleague Thomas is moving back to his home country next month. You want to organize a farewell party for him. Plan together: When and where will the party take place? What will you bring to eat and drink? What gift will you buy? And how will you split the costs? You have about five minutes."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "1. Vorschlag machen (Datum & Zeit)",
    de: "Hallo Maria, hast du schon gehört? Thomas zieht nächsten Monat um! Wollen wir eine kleine Überraschungsfeier für ihn organisieren? Wie wäre es mit nächstem Samstag um 18 Uhr?",
    en: "Hello Maria, have you heard? Thomas is moving next month! Shall we organize a small surprise party for him? How about next Saturday at 6 PM?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Zustimmung & Ort-Vorschlag",
    de: "Das ist eine wunderbare Idee! Samstagabend passt mir sehr gut. Wo wollen wir die Feier machen? Sollen wir einen Tisch im Restaurant reservieren oder uns draußen treffen?",
    en: "That is a wonderful idea! Saturday evening suits me very well. Where should we have the party? Shall we reserve a table at a restaurant or meet outdoors?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Höflicher Einwand & Alternative",
    de: "Im Restaurant wird es vielleicht etwas teuer für alle Kursteilnehmer. Wenn das Wetter schön ist, könnten wir ein schönes Picknick im Park machen. Falls es regnet, können wir gerne zu mir in die Wohnung kommen.",
    en: "In a restaurant it might be a bit expensive for all course participants. If the weather is nice, we could have a nice picnic in the park. If it rains, we can gladly come to my apartment."
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Essen & Getränke Aufteilung",
    de: "Perfekt, einverstanden! Und wie machen wir das mit dem Essen? Ich schlage vor, dass jeder Teilnehmer eine Kleinigkeit mitbringt: Salate, Fingerfood und Snacks. Was hältst du davon?",
    en: "Perfect, agreed! And how should we handle the food? I suggest that each participant brings a little something: salads, finger food, and snacks. What do you think?"
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Aufgabenverteilung & Geschenk",
    de: "Sehr gut! Ich besorge die Getränke und backe einen Kuchen. Und was schenken wir Thomas zum Abschied? Hast du eine Idee?",
    en: "Very good! I will get the drinks and bake a cake. And what shall we give Thomas as a farewell gift? Do you have an idea?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Geschenk-Idee & Kosten",
    de: "Wir könnten ein schönes Fotobuch mit Fotos aus unserem Deutschkurs erstellen und alle eine persönliche Nachricht hineinschreiben lassen. Wenn jeder fünf Euro gibt, reicht das völlig aus. Ich kann die Fotos sammeln und das Buch bestellen.",
    en: "We could create a nice photo book with photos from our German course and have everyone write a personal message. If everyone gives five euros, that is completely sufficient. I can collect the photos and order the book."
  },
  {
    speaker: "Kandidat A",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Einigung & Abschluss",
    de: "Das ist ein fantastisches Geschenk! Ich erstelle heute eine WhatsApp-Gruppe für den Kurs, damit alle Bescheid wissen. Wollen wir uns am Samstag um 17 Uhr treffen, um alles vorzubereiten?",
    en: "That is a fantastic gift! I will create a WhatsApp group for the course today so everyone is informed. Shall we meet on Saturday at 5 PM to prepare everything?"
  },
  {
    speaker: "Kandidat B",
    phase: "Teil 3: Gemeinsam planen",
    tag: "Feste Bestätigung",
    de: "Abgemacht! Samstag um 17 Uhr bei dir. Ich freue mich schon sehr darauf!",
    en: "Deal! Saturday at 5 PM at your place. I am already looking forward to it!"
  },
  {
    speaker: "Prüfer",
    phase: "Abschluss",
    tag: "Prüfungsabschluss & Lob",
    de: "Vielen Dank an Sie beide! Sie haben alle Punkte überzeugend und partnerschaftlich besprochen. Die mündliche Prüfung ist damit erfolgreich beendet. Wir wünschen Ihnen alles Gute!",
    en: "Thank you very much to both of you! You discussed all points convincingly and collaboratively. The oral exam is thus successfully concluded. We wish you all the best!"
  }
];

const FULL_EXAM_CONVERSATION_TEXT = FULL_EXAM_CONVERSATION.map(t => `${t.speaker}: ${t.de}`).join(" ");
"""

JSX_BLOCK = """
          {/* ─── FULL EXAM CONVERSATION MASTER SAMPLE (ALWAYS VISIBLE AT BOTTOM) ─── */}
          <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    B1 Oral Exam Master Blueprint
                  </span>
                  <span className="text-xs text-amber-400 font-mono font-bold">15-Minuten Komplett-Ablauf</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black">
                  Vollständiges B1-Prüfungsgespräch (Full Exam Conversation Master Sample)
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  How the full 15-minute B1 Speaking Exam flows from the moment you enter the room: Teil 1 (Introduction & Questions), Teil 2 (Presentation & Partner Q&A), and Teil 3 (Joint Planning).
                </p>
              </div>

              <button
                type="button"
                onClick={() => speakGerman(FULL_EXAM_CONVERSATION_TEXT)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Gesamtes Gespräch anhören</span>
              </button>
            </div>

            {/* Conversation Timeline */}
            <div className="space-y-3.5">
              {FULL_EXAM_CONVERSATION.map((turn, tIdx) => {
                const isExaminer = turn.speaker === "Prüfer";
                const isCandidateA = turn.speaker === "Kandidat A";
                const isCandidateB = turn.speaker === "Kandidat B";

                return (
                  <div
                    key={tIdx}
                    className={`p-4 rounded-2xl border transition space-y-2 ${
                      isExaminer
                        ? isDark
                          ? "bg-slate-950/80 border-slate-800 text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                        : isCandidateA
                        ? isDark
                          ? "bg-purple-950/30 border-purple-500/30 text-purple-100"
                          : "bg-purple-50/50 border-purple-200 text-purple-950"
                        : isDark
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                        : "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono tracking-wider ${
                          isExaminer
                            ? "bg-slate-800 text-amber-300 border border-amber-500/30"
                            : isCandidateA
                            ? "bg-purple-600 text-white shadow-xs"
                            : "bg-emerald-600 text-white shadow-xs"
                        }`}>
                          {turn.speaker}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark ? "bg-slate-900 text-slate-400" : "bg-white text-slate-600 border border-slate-200"
                        }`}>
                          {turn.phase}
                        </span>

                        <span className="text-[11px] font-semibold text-rose-400">
                          {turn.tag}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakGerman(turn.de)}
                        className={`p-1.5 rounded-lg border text-rose-400 transition self-start sm:self-auto ${
                          isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-rose-50"
                        }`}
                        title="Diesen Satz anhören"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm font-bold leading-relaxed">
                      &ldquo;{turn.de}&rdquo;
                    </div>

                    <div className={`text-[11px] leading-normal ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {turn.en}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
"""

def main():
    target_path = "src/components/ViobeanSpeakingPartner.tsx"
    with open(target_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Insert DATA_BLOCK before "interface ViobeanSpeakingPartnerProps"
    if "FULL_EXAM_CONVERSATION" not in content:
        pos_props = content.find("interface ViobeanSpeakingPartnerProps")
        if pos_props == -1:
            print("Could not find ViobeanSpeakingPartnerProps")
            sys.exit(1)
        content = content[:pos_props] + DATA_BLOCK + "\n" + content[pos_props:]

    # 2. Insert JSX_BLOCK right before the end of ROUNDS mode:
    # Look for:
    #           </div>
    #         </div>
    #       )}
    #
    #       {/* ─── FREE-STYLE TALK MODE
    target_needle = "          )}\n        </div>\n      )}\n\n      {/* ─── FREE-STYLE TALK MODE"
    if target_needle in content:
        replacement = "          )}\n" + JSX_BLOCK + "\n        </div>\n      )}\n\n      {/* ─── FREE-STYLE TALK MODE"
        content = content.replace(target_needle, replacement, 1)
    else:
        print("Could not find target needle for JSX_BLOCK")
        sys.exit(1)

    # Verification
    assert "\u2014" not in content, "Em dash found!"
    for forbidden in ["🍷", "🍸", "🍺", "🍻", "🥂", "🥃", "🍹", "🚬"]:
        assert forbidden not in content, f"Forbidden emoji {forbidden} found!"

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated ViobeanSpeakingPartner.tsx with Full Exam Conversation!")

if __name__ == "__main__":
    main()

