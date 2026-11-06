export interface ExamSubpart {
  partIndex: string; // e.g., "Teil 1", "Teil 2"
  title: string; // e.g. "Globalverstehen", "Detailverstehen", "Sprachbausteine Grammatik"
  taskFormat: string; // e.g., "5 Zuordnungsaufgaben", "10 Multiple-Choice-Aufgaben", "4 Leitpunkte"
  description: string;
  durationOrTimeHint?: string;
  tips: string;
}

export interface ExamModuleDetail {
  id: "LESEN" | "HOEREN" | "SCHREIBEN" | "SPRECHEN" | "SPRACHBAUSTEINE" | "HOEREN_LESEN";
  name: string; // e.g., "Lesen", "Sprachbausteine", "Hören", "Schreiben", "Sprechen"
  duration: string; // e.g., "65 Minuten", "90 Minuten (mit Sprachbausteine)", "40 Minuten"
  targetTasksSummary: string;
  subparts: ExamSubpart[];
}

export interface ComprehensiveExamProfile {
  id: "DTZ" | "TELC_B1" | "GOETHE_B1";
  name: string;
  officialSubtitle: string;
  developedBy: string;
  accreditedBy: string;
  badge: string;
  badgeColor: string;
  totalDuration: string;
  scoringFormat: string;
  passingRule: string;
  writtenOralSplit: string;
  whyStrategicForPR: string;
  preparationTimeOral: string;
  modules: ExamModuleDetail[];
  masterStrategy: string[];
}

export interface ExamCriteria {
  examName: string;
  totalPoints: number;
  passThresholdPoints: number;
  passPercentage: number;
  sections: {
    name: string;
    points: number;
    passRequirement: string;
    passHack: string;
  }[];
  masterPassStrategy: string[];
}

export const COMPREHENSIVE_EXAM_PROFILES: Record<"DTZ" | "TELC_B1" | "GOETHE_B1", ComprehensiveExamProfile> = {
  GOETHE_B1: {
    id: "GOETHE_B1",
    name: "Goethe-Zertifikat B1",
    officialSubtitle: "Gemeinschaftsprüfung von Goethe-Institut, Universität Freiburg/Schweiz & ÖSD",
    developedBy: "Goethe-Institut, Universität Freiburg (Schweiz) und Österreichisches Sprachdiplom Deutsch (ÖSD)",
    accreditedBy: "ALTE (Association of Language Testers in Europe), BAMF & Ausländerbehörde",
    badge: "MODULAR & INDEPENDENT RETAKES",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    totalDuration: "180 Minuten (ca. 3 Stunden) über 4 Module",
    scoringFormat: "4 x 100 Punkte (jedes Modul separat bewertet)",
    passingRule: "Mindestens 60 Punkte (60%) in jedem einzelnen Modul erforderlich. Jedes bestandene Modul ist dauerhaft gültig!",
    writtenOralSplit: "Lesen (100 Pkt) + Hören (100 Pkt) + Schreiben (100 Pkt) + Sprechen (100 Pkt)",
    whyStrategicForPR: "Volle Flexibilität: Die vier Module können einzeln oder in beliebiger Kombination abgelegt werden. Wenn ein Modul nicht bestanden wird, muss nur dieses eine Modul wiederholt werden, nicht die gesamte Prüfung.",
    preparationTimeOral: "15 Minuten Vorbereitungszeit vor der mündlichen Paarprüfung",
    modules: [
      {
        id: "HOEREN",
        name: "Hören",
        duration: "40 Minuten",
        targetTasksSummary: "Sie hören Durchsagen, kurze Vorträge, informelle Gespräche sowie Diskussionen aus dem Radio. Sie können Hauptaussagen und wichtige Einzelheiten erfassen.",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Durchsagen & Alltagsmitteilungen",
            taskFormat: "5 kurze Texte, jeweils 2 Aufgaben (Richtig/Falsch + Multiple Choice a/b/c)",
            description: "Sie hören kurze Mitteilungen (z. B. am Bahnhof, im Kaufhaus oder auf dem Anrufbeantworter). Jeder Text wird zweimal vorgespielt.",
            durationOrTimeHint: "ca. 10 Min. (2x abgespielt)",
            tips: "Nutzen Sie die Pausen vor dem ersten Abspielen, um die Schlüsselwörter in den Fragen zu unterstreichen."
          },
          {
            partIndex: "Teil 2",
            title: "Führung / Vortrag / Information",
            taskFormat: "5 Multiple-Choice-Aufgaben (a/b/c)",
            description: "Sie hören eine Präsentation, Führung oder Ansage an einem öffentlichen Ort (z. B. Museum, Naturpark, Touristenführung). Wird nur EINMAL gehört.",
            durationOrTimeHint: "ca. 8 Min. (1x abgespielt)",
            tips: "Da der Text nur einmal läuft, lesen Sie die 5 Aussagen vorab zügig durch und markieren Sie Nomen und Zahlen."
          },
          {
            partIndex: "Teil 3",
            title: "Informelles Alltagsgespräch",
            taskFormat: "7 Richtig-Falsch-Aufgaben",
            description: "Sie hören ein Gespräch zwischen zwei Personen (z. B. Bekannte im Zug oder Kollegen in der Pause). Wird nur EINMAL gehört.",
            durationOrTimeHint: "ca. 8 Min. (1x abgespielt)",
            tips: "Achten Sie genau darauf, WER welche Meinung äußert: Oft widerspricht ein Sprecher dem anderen."
          },
          {
            partIndex: "Teil 4",
            title: "Radiodiskussion",
            taskFormat: "8 Zuordnungsaufgaben (Wer sagt was?)",
            description: "Ein Moderator und zwei Studiogäste diskutieren über ein aktuelles Thema. Wird ZWEIMAL gehört.",
            durationOrTimeHint: "ca. 14 Min. (2x abgespielt)",
            tips: "Konzentrieren Sie sich darauf, die Stimmen der beiden Gäste sofort zu Beginn zu unterscheiden."
          }
        ]
      },
      {
        id: "LESEN",
        name: "Lesen",
        duration: "65 Minuten",
        targetTasksSummary: "Sie lesen Blog-Beiträge, E-Mails, Zeitungsartikel, Anzeigen und schriftliche Anweisungen. Sie können Hauptinformationen, wichtige Einzelheiten sowie Standpunkte und Meinungen erfassen.",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Blog-Beitrag / Persönlicher Erlebnisbericht",
            taskFormat: "6 Aufgaben (Richtig/Falsch)",
            description: "Sie lesen einen persönlichen Text (z. B. Blog über ein Hobby, eine Reise oder Berufserfahrungen) und beurteilen 6 Aussagen.",
            durationOrTimeHint: "ca. 10 Min.",
            tips: "Suchen Sie gezielt nach Synonymen im Text. Achten Sie auf Verneinungswörter wie 'kaum', 'nicht' oder 'ohne'."
          },
          {
            partIndex: "Teil 2",
            title: "Presseartikel / Informationstext",
            taskFormat: "6 Multiple-Choice-Aufgaben (a/b/c)",
            description: "Zwei Berichte oder ein sachlicher Zeitungsartikel über ein gesellschaftliches Thema mit Detailfragen.",
            durationOrTimeHint: "ca. 15 Min.",
            tips: "Lesen Sie erst die Frage, dann den entsprechenden Textabschnitt. Die Fragen folgen der chronologischen Reihenfolge des Textes."
          },
          {
            partIndex: "Teil 3",
            title: "Anzeigen zuordnen",
            taskFormat: "7 Situationszuordnungen + 1 unlösbare Situation",
            description: "10 Kleinanzeigen stehen zur Auswahl für 7 Personen mit konkreten Wünschen. Für eine Person gibt es keine passende Anzeige ('0').",
            durationOrTimeHint: "ca. 15 Min.",
            tips: "Markieren Sie die genauen Ausschlusskriterien der Personen (z. B. 'nur am Wochenende', 'keine Vorkenntnisse')."
          },
          {
            partIndex: "Teil 4",
            title: "Lesermeinungen / Forumsbeiträge",
            taskFormat: "7 Aufgaben (Ja/Nein zur Ausgangsfrage)",
            description: "7 kurze Leserbriefe oder Forumsbeiträge zu einer kontroversen Leitfrage (z. B. 'Sollten Haustiere im Büro erlaubt sein?').",
            durationOrTimeHint: "ca. 12 Min.",
            tips: "Entscheiden Sie rein nach der Gesamthaltung des Verfassers: Befürwortet er die Ausgangsfrage (Ja) oder lehnt er sie ab (Nein)?"
          },
          {
            partIndex: "Teil 5",
            title: "Reglement / Schriftliche Anweisungen",
            taskFormat: "4 Multiple-Choice-Aufgaben (a/b/c)",
            description: "Ein offizieller Text mit Verhaltensregeln (z. B. Hausordnung, Bibliotheksordnung, Brandschutzordnung).",
            durationOrTimeHint: "ca. 10 Min.",
            tips: "Achten Sie auf Modalverben: 'dürfen' (erlaubt), 'müssen' (verpflichtend) und 'nicht dürfen' (streng verboten)."
          }
        ]
      },
      {
        id: "SCHREIBEN",
        name: "Schreiben",
        duration: "60 Minuten",
        targetTasksSummary: "Sie schreiben persönliche und formelle E-Mails oder Briefe und äußern schriftlich Ihre Meinung in einem Forumsbeitrag.",
        subparts: [
          {
            partIndex: "Aufgabe 1",
            title: "Persönliche E-Mail an eine/n Freund/in",
            taskFormat: "Freier Text (ca. 80 Wörter) mit 3 vorgegebenen Leitpunkten",
            description: "Sie berichten von einem persönlichen Ereignis (z. B. Umzug, Feier, Reise), beschreiben Ihre Gefühle und machen einen Vorschlag für ein Treffen.",
            durationOrTimeHint: "ca. 20 Min.",
            tips: "Verwenden Sie informelle Anrede ('Liebe/r...'), Konnektoren (weil, dass, obwohl) und bearbeiten Sie alle 3 Leitpunkte mit je 2 Sätzen."
          },
          {
            partIndex: "Aufgabe 2",
            title: "Meinungsäußerung im Online-Forum",
            taskFormat: "Diskussionsbeitrag (ca. 80 Wörter) zu einem aktuellen Thema",
            description: "Sie nehmen schriftlich Stellung zu einem diskutierten Thema (z. B. 'Einkaufen im Internet' oder 'Öffentlicher Nahverkehr').",
            durationOrTimeHint: "ca. 25 Min.",
            tips: "Nutzen Sie Meinungsphrasen: 'Meiner Meinung nach...', 'Ich bin der Ansicht, dass...', 'Ein großer Vorteil ist...'."
          },
          {
            partIndex: "Aufgabe 3",
            title: "Formelle Entschuldigung / Bitte",
            taskFormat: "Kurze formelle E-Mail (ca. 40 Wörter)",
            description: "Sie schreiben an eine Respektsperson (z. B. Kursleiter/in oder Vermieter/in), entschuldigen sich für ein Versäumnis und bitten höflich um Verständnis.",
            durationOrTimeHint: "ca. 15 Min.",
            tips: "Verwenden Sie strikt Sie-Form, 'Sehr geehrte/r Frau/Herr...', Konjunktiv II ('Könnten Sie mir bitte...') und 'Mit freundlichen Grüßen'."
          }
        ]
      },
      {
        id: "SPRECHEN",
        name: "Sprechen",
        duration: "15 Minuten (mündliche Paarprüfung)",
        targetTasksSummary: "Sie planen etwas gemeinsam mit Ihrer Gesprächspartnerin oder Ihrem Gesprächspartner. Dabei reagieren Sie auf Fragen, äußern Ihre Meinung und machen Vorschläge. Sie tragen eine Präsentation zu einem aktuellen Thema frei vor und beantworten Fragen dazu.",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Gemeinsam etwas planen",
            taskFormat: "Dialog mit Partner/in (ca. 3 Minuten) anhand von 4 Leitpunkten",
            description: "Sie und Ihr Prüfungspartner planen ein reales Vorhaben (z. B. Geburtstagsüberraschung, Ausflug, Einweihungsparty).",
            durationOrTimeHint: "ca. 3 Min.",
            tips: "Machen Sie abwechselnd Vorschläge: 'Wollen wir...?', 'Was hältst du davon, wenn...?', 'Das ist eine gute Idee, aber...'."
          },
          {
            partIndex: "Teil 2",
            title: "Präsentation zu einem aktuellen Thema",
            taskFormat: "Freier Monolog (ca. 3-4 Minuten pro Person)",
            description: "Sie wählen eines von zwei Themen aus und präsentieren strukturiert: Thema vorstellen, persönliche Erfahrung, Situation im Heimatland, Vor- und Nachteile, Abschlussmeinung.",
            durationOrTimeHint: "ca. 3-4 Min. pro Person",
            tips: "Nutzen Sie unsere 5-Schritte-Präsentationsformel. Reden Sie flüssig und blicken Sie zu den Prüfern und Ihrem Partner."
          },
          {
            partIndex: "Teil 3",
            title: "Auf Fragen reagieren & Feedback geben",
            taskFormat: "Fragerunde & Feedback (ca. 1-2 Minuten pro Person)",
            description: "Sie stellen eine inhaltliche Frage zur Präsentation Ihres Partners, geben kurzes positives Feedback und beantworten danach Fragen der Prüfer zu Ihrer eigenen Präsentation.",
            durationOrTimeHint: "ca. 1-2 Min.",
            tips: "Standardfrage bereithalten: 'Ich fand deine Präsentation sehr interessant. Mich würde noch interessieren: Wie ist das genau bei...?'"
          }
        ]
      }
    ],
    masterStrategy: [
      "Jedes Modul kann einzeln bestanden werden (60 von 100 Punkten).",
      "Wenn Sie ein Modul nicht bestehen, müssen Sie nur dieses eine Modul wiederholen, nicht die gesamte Prüfung.",
      "Schreiben und Sprechen sind die sichersten Module für schnelle Vorbereitung, da 70% der Sprache aus festen Wendungen (Redemitteln) besteht."
    ]
  },

  TELC_B1: {
    id: "TELC_B1",
    name: "telc Deutsch B1 (Zertifikat Deutsch)",
    officialSubtitle: "Standardisierte B1-Prüfung nach GER mit gepoolter schriftlicher Wertung",
    developedBy: "telc gGmbH (The European Language Certificates)",
    accreditedBy: "BAMF, ALTE, Universitäten und Ausländerbehörden bundesweit",
    badge: "COMBINED WRITTEN POOL",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    totalDuration: "ca. 195 Minuten (150 Min. schriftlich + 20 Min. Vorbereitung + 15 Min. mündlich)",
    scoringFormat: "Gesamt 300 Punkte (Schriftlich: 225 Pkt, Mündlich: 75 Pkt)",
    passingRule: "Schriftliche Prüfung mindestens 60% (135/225 Punkte) UND Mündliche Prüfung mindestens 60% (45/75 Punkte). Gesamtergebnis mindestens 180/300 Punkte.",
    writtenOralSplit: "Schriftlich (225 Pkt) + Mündlich (75 Pkt) = 300 Pkt",
    whyStrategicForPR: "Gepoolter schriftlicher Wertungsblock: Lesen (75 Pkt), Sprachbausteine (30 Pkt), Hören (75 Pkt) und Schreiben (45 Pkt) fließen in EINEN gemeinsamen Topf. Eine starke Leistung im Schreiben und Lesen gleicht ein schwächeres Hören problemlos aus!",
    preparationTimeOral: "20 Minuten Vorbereitungszeit vor der mündlichen Paarprüfung (Notizen auf Aufgabenblatt erlaubt)",
    modules: [
      {
        id: "LESEN",
        name: "Lesen",
        duration: "Teil des 90-Minuten-Blocks (zusammen mit Sprachbausteine, keine Pause)",
        targetTasksSummary: "3 Leseteile zur Überprüfung von Globalverstehen, Detailverstehen und selektivem Verstehen (20 Aufgaben, 75 Punkte).",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Globalverstehen",
            taskFormat: "5 Zuordnungsaufgaben",
            description: "Sie lesen 5 kurze Texte (z. B. aus Zeitungen oder Zeitschriften) und ordnen ihnen die passenden Überschriften aus einer Auswahlliste von 10 Überschriften zu.",
            durationOrTimeHint: "ca. 20 Min.",
            tips: "Lesen Sie zuerst die Überschriften und markieren Sie die Kernaussage. Achten Sie auf thematische Ähnlichkeiten zwischen Überschriften."
          },
          {
            partIndex: "Teil 2",
            title: "Detailverstehen",
            taskFormat: "5 Multiple-Choice-Aufgaben (a/b/c)",
            description: "Ein längerer journalistischer Sachtext oder Bericht mit 5 detaillierten Fragen zum Textinhalt.",
            durationOrTimeHint: "ca. 25 Min.",
            tips: "Die Fragen folgen dem Text von oben nach unten. Belegen Sie jede Antwort mit der genauen Textzeile."
          },
          {
            partIndex: "Teil 3",
            title: "Selektives Verstehen",
            taskFormat: "10 Zuordnungsaufgaben (Kleinanzeigen)",
            description: "Sie lesen 10 Situationsbeschreibungen von Personen und ordnen passende Anzeigen aus 12 Kleinanzeigen zu. Für manche Situationen gibt es keine passende Anzeige ('x').",
            durationOrTimeHint: "ca. 25 Min.",
            tips: "Prüfen Sie bei jeder Anzeige genau, ob Einschränkungen vorliegen (z. B. Mindestalter, Ort, Wochentag)."
          }
        ]
      },
      {
        id: "SPRACHBAUSTEINE",
        name: "Sprachbausteine (Language Elements)",
        duration: "Integrierter Bestandteil des 90-Minuten-Blocks",
        targetTasksSummary: "20 Aufgaben (30 Punkte) zur Überprüfung von Grammatikstrukturen und lexikalischer Treffsicherheit.",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Grammatik im Lückentext",
            taskFormat: "10 Multiple-Choice-Aufgaben (a/b/c)",
            description: "Ein Brief oder eine E-Mail mit 10 grammatikalischen Lücken (Präpositionen, Konjunktionen, Artikel- und Adjektivendungen, Modalverben).",
            durationOrTimeHint: "ca. 10 Min.",
            tips: "Achten Sie auf die Wörter direkt vor und nach der Lücke: Häufig fordert ein Verb einen bestimmten Fall (Akkusativ/Dativ) oder eine feste Präposition."
          },
          {
            partIndex: "Teil 2",
            title: "Lexik / Wortschatz im Lückentext",
            taskFormat: "10 Zuordnungsaufgaben aus einer Wortbox (a bis o)",
            description: "Ein zusammenhängender Text mit 10 lexikalischen Lücken. Aus einer Leiste mit 15 vorgegebenen Wörtern müssen 10 passende Wörter ausgewählt werden.",
            durationOrTimeHint: "ca. 10 Min.",
            tips: "Bestimmen Sie zuerst die Wortart der Lücke (Nomen, Verb, Adverb). Streichen Sie bereits verwendete Wörter durch."
          }
        ]
      },
      {
        id: "HOEREN",
        name: "Hören",
        duration: "ca. 30 Minuten",
        targetTasksSummary: "3 Hörteile zur Überprüfung von Global-, Detail- und selektivem Hörverstehen (20 Aufgaben, 75 Punkte).",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Globalverstehen",
            taskFormat: "5 Richtig-Falsch-Aufgaben",
            description: "Sie hören 5 kurze Durchsagen oder Nachrichten (z. B. Wetterbericht, Verkehrshinweise, Ansagen im Zug). Jeder Text wird nur EINMAL gehört.",
            durationOrTimeHint: "ca. 8 Min. (1x gehört)",
            tips: "Lesen Sie vor jedem Text die jeweilige Aussage sorgfältig durch. Konzentrieren Sie sich auf die Hauptbotschaft."
          },
          {
            partIndex: "Teil 2",
            title: "Detailverstehen",
            taskFormat: "10 Richtig-Falsch-Aufgaben",
            description: "Sie hören ein längeres Interview oder eine Radiosendung mit einer Person über ihren Lebensweg oder Beruf. Wird nur EINMAL gehört.",
            durationOrTimeHint: "ca. 12 Min. (1x gehört)",
            tips: "Die Aussagen folgen genau dem Gesprächsverlauf. Verpassen Sie den Faden nicht, wenn eine Antwort unklar war: Gehen Sie sofort zur nächsten Frage."
          },
          {
            partIndex: "Teil 3",
            title: "Selektives Verstehen",
            taskFormat: "5 Richtig-Falsch-Aufgaben",
            description: "Sie hören 5 kurze Alltagstelefonate oder Informationsansagen (z. B. Arztpraxis, Kinoprogramm, Öffnungszeiten). Wird ZWEIMAL gehört.",
            durationOrTimeHint: "ca. 10 Min. (2x gehört)",
            tips: "Nutzen Sie das erste Hören zur Orientierung und das zweite Hören zur definitiven Bestätigung der Details."
          }
        ]
      },
      {
        id: "SCHREIBEN",
        name: "Schreiben",
        duration: "30 Minuten",
        targetTasksSummary: "Schreiben einer informellen oder halbformellen E-Mail mit 4 Leitpunkten (45 Punkte).",
        subparts: [
          {
            partIndex: "Schreibaufgabe",
            title: "E-Mail / Brief an eine Privatperson oder Institution",
            taskFormat: "1 zusammenhängender Text mit 4 Leitpunkten (Auswahl aus zwei Themen)",
            description: "Sie erhalten zwei Themen (z. B. Antwort auf eine Einladung oder eine Entschuldigung/Anfrage) und wählen eines aus. Sie bearbeiten alle 4 vorgegebenen Leitpunkte.",
            durationOrTimeHint: "30 Min.",
            tips: "Schreiben Sie zu jedem der 4 Leitpunkte mindestens 2 vollständige Sätze mit Konnektoren (weil, dass, deshalb). Das garantiert die volle Punktzahl für die inhaltliche Angemessenheit."
          }
        ]
      },
      {
        id: "SPRECHEN",
        name: "Sprechen",
        duration: "ca. 15 Minuten (Paarprüfung mit 20 Minuten Vorbereitungszeit)",
        targetTasksSummary: "Mündliche Paarprüfung in 3 Teilen mit 20 Minuten Vorbereitungszeit (75 Punkte).",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Einander kennenlernen",
            taskFormat: "Prüfungsgespräch mit Partner/in und Prüfern (ca. 3 Minuten)",
            description: "Sie stellen sich anhand von Stichpunkten vor (Name, Wohnort, Beruf, Familie, Sprachen, Hobbys) und beantworten spontane Zusatzfragen der Prüfer.",
            durationOrTimeHint: "ca. 3 Min.",
            tips: "Lernen Sie die Selbstvorstellung flüssig auswendig. Zeigen Sie Bereitschaft, ausführlich auf die Nachfragen der Prüfer zu antworten."
          },
          {
            partIndex: "Teil 2",
            title: "Über ein Thema sprechen",
            taskFormat: "Erfahrungsbericht & Gespräch (ca. 5 Minuten)",
            description: "Sie und Ihr Partner berichten über persönliche Erfahrungen zu einem Alltagsthema (z. B. Urlaub, Sport, Verkehrsmittel, Feiertage) und tauschen Meinungen aus.",
            durationOrTimeHint: "ca. 5 Min.",
            tips: "Verwenden Sie Ihre 20-minütige Vorbereitungszeit, um Stichpunkte zu Notizen aufzuschreiben. Lesen Sie jedoch nicht ab, sondern sprechen Sie frei."
          },
          {
            partIndex: "Teil 3",
            title: "Gemeinsam etwas planen",
            taskFormat: "Kooperative Planungsaufgabe (ca. 6 Minuten)",
            description: "Gemeinsam mit Ihrem Partner planen Sie ein Event (z. B. Abschiedsgeschenk für Kollegen, Ausflug am Wochenende, Party) und treffen konkrete Absprachen.",
            durationOrTimeHint: "ca. 6 Min.",
            tips: "Stellen Sie offene Fragen an Ihren Partner: 'Was denkst du über...?', 'Wer übernimmt die Einkäufe?', 'Wann passt es dir am besten?'."
          }
        ]
      }
    ],
    masterStrategy: [
      "Fokus auf die Formel: Bei TELC müssen sowohl der schriftliche als auch der mündliche Teil mit jeweils 60% bestanden werden.",
      "Schreiben: Nutzen Sie feste Redemittel (Anrede, Grund, Konnektoren, höfliche Bitte, Grußformel). Grammatikfehler im Detail ziehen weniger Punkte ab als fehlende Struktur.",
      "Leseverstehen: Keine Texte Wort für Wort lesen! Nur Fragen lesen, Signalwörter markieren und im Text nach Synonymen suchen.",
      "Hörverstehen: Nutzen Sie die Vorbereitungszeit, um Schlüsselwörter in den Aufgabenstellungen zu unterstreichen."
    ]
  },

  DTZ: {
    id: "DTZ",
    name: "DTZ (Deutsch-Test für Zuwanderer A2-B1)",
    officialSubtitle: "Offizieller BAMF-Integrationskurstest für Niederlassungserlaubnis & Einbürgerung",
    developedBy: "g.i.b.s. / telc gGmbH im Auftrag des Bundesministeriums des Innern (BMI) und BAMF",
    accreditedBy: "Bundesamt für Migration und Flüchtlinge (BAMF) für § 9 AufenthG & § 10 StAG",
    badge: "RECOMMENDED FOR PR & CITIZENSHIP",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    totalDuration: "ca. 116 Minuten (100 Min. schriftlich + 16 Min. mündlich)",
    scoringFormat: "Differenzierte Einstufung: Unter A2 / A2 / B1 je nach Fertigkeit",
    passingRule: "B1 in Sprechen (Pflicht) + B1 in mindestens einem schriftlichen Bereich (entweder Schreiben ODER Hören/Lesen) = Gesamtergebnis B1!",
    writtenOralSplit: "Hören/Lesen (45 Aufgaben) + Schreiben (1 Brief) + Sprechen (3 Teile)",
    whyStrategicForPR: "Asymmetrische Bestehensregel: Sie müssen NICHT in allen 4 Fertigkeiten B1 erreichen! Ein starkes B1 im Sprechen und B1 im Schreiben (beides mit unseren Vorlagen trainierbar) gleicht ein schwächeres Hören/Lesen komplett aus und sichert das offizielle B1-Zertifikat für Einbürgerung und Daueraufenthalt.",
    preparationTimeOral: "Keine Vorbereitungszeit vor der mündlichen Prüfung (Prüfung findet direkt statt)",
    modules: [
      {
        id: "HOEREN_LESEN",
        name: "Hören & Lesen (Combined)",
        duration: "ca. 70 Minuten (Hören ca. 25 Min. + Lesen ca. 45 Min.)",
        targetTasksSummary: "45 Aufgaben aus dem Lebensalltag von Zuwanderern in Deutschland (Arbeit, Behörden, Einkaufen, Wohnen, Gesundheit).",
        subparts: [
          {
            partIndex: "Hören",
            title: "Alltagshören (4 Teile)",
            taskFormat: "20 Aufgaben (Mitteilungen, Telefonansagen, Gespräche)",
            description: "Durchsagen an Bahnhöfen, Telefonansagen von Behörden und Arztpraxen sowie persönliche Beratungsgespräche.",
            durationOrTimeHint: "ca. 25 Min.",
            tips: "Achten Sie auf Uhrzeiten, Raumangaben, Telefonnummern und Datumsangaben."
          },
          {
            partIndex: "Lesen",
            title: "Alltagslesen (5 Teile)",
            taskFormat: "25 Aufgaben (Hinweisschilder, Anzeigen, Briefe, Verträge)",
            description: "Schilder im Amt, Wohnungsanzeigen, Mietverträge, Beipackzettel und Informationsschreiben von Krankenkassen.",
            durationOrTimeHint: "ca. 45 Min.",
            tips: "Nutzen Sie das Scanning: Suchen Sie Schlüsselwörter wie 'Kündigungsfrist', 'Öffnungszeiten', 'Anmeldefrist'."
          }
        ]
      },
      {
        id: "SCHREIBEN",
        name: "Schreiben",
        duration: "30 Minuten",
        targetTasksSummary: "Schreiben eines halboffiziellen oder offiziellen Briefes/E-Mails anhand von 4 Leitpunkten.",
        subparts: [
          {
            partIndex: "Schreibaufgabe",
            title: "Halboffizieller oder offizieller Brief / E-Mail",
            taskFormat: "1 Text mit 4 Leitpunkten (Auswahl aus zwei praxisnahen Themen)",
            description: "Typische Alltagsthemen: Entschuldigung an die Schule des Kindes, Kündigung eines Vertrags, Anfrage an den Vermieter wegen einer Reparatur oder Bitte um einen Termin beim Bürgeramt.",
            durationOrTimeHint: "30 Min.",
            tips: "Memorieren Sie unsere 8 offiziellen DTZ-Vorlagen. Alle 4 Leitpunkte mit Konnektoren (weil, da, deshalb) bearbeiten garantiert B1 im Schreiben."
          }
        ]
      },
      {
        id: "SPRECHEN",
        name: "Sprechen",
        duration: "ca. 16 Minuten (Paarprüfung ohne Vorbereitung)",
        targetTasksSummary: "3 Teile im Prüfungsgespräch mit Partner/in und zwei Prüfern.",
        subparts: [
          {
            partIndex: "Teil 1",
            title: "Über sich selbst sprechen",
            taskFormat: "Vorstellung anhand von 6 Themenfeldern + Prüfernachfragen",
            description: "Sie sprechen über Name, Herkunft, Wohnort, Familie, Beruf und Sprachen und beantworten 2-3 vertiefende Nachfragen der Prüfer.",
            durationOrTimeHint: "ca. 4 Min.",
            tips: "Sprechen Sie von sich aus in ganzen Sätzen. Antworten Sie nicht nur mit einzelnen Wörtern."
          },
          {
            partIndex: "Teil 2",
            title: "Über Erfahrungen sprechen / Bild beschreiben",
            taskFormat: "Monolog anhand eines Fotos oder einer Leitfrage",
            description: "Sie wählen ein Bild aus zwei Alltagsszenen aus, beschreiben, was Sie sehen, und schildern eigene Erfahrungen zu diesem Thema.",
            durationOrTimeHint: "ca. 5 Min.",
            tips: "Nutzen Sie unsere 5-Satz-Bildformel: 'Auf dem Bild sehe ich...', 'Im Vordergrund...', 'Das erinnert mich an...'."
          },
          {
            partIndex: "Teil 3",
            title: "Gemeinsam eine Aufgabe lösen / etwas planen",
            taskFormat: "Dialog mit Partner/in zur Lösung eines Alltagsproblems",
            description: "Sie und Ihr Prüfungspartner organisieren ein reales Vorhaben (z. B. Abschiedsgeschenk, Renovierungshilfe, Vorbereitung eines Familienfests).",
            durationOrTimeHint: "ca. 7 Min.",
            tips: "Gehen Sie aktiv auf Vorschläge Ihres Partners ein: 'Ich stimme dir zu, aber...', 'Wer könnte das übernehmen?'."
          }
        ]
      }
    ],
    masterStrategy: [
      "Die goldene DTZ-Erfolgsformel: Konzentrieren Sie 70% Ihrer Energie auf SPRECHEN und SCHREIBEN.",
      "Warum? Weil Sprechen und Schreiben aktiv trainierbar sind und aus festen Satzmustern bestehen.",
      "Ein B1 im Sprechen + B1 im Schreiben garantiert das B1-Gesamtergebnis für Einbürgerung und Niederlassungserlaubnis!"
    ]
  }
};

export const EXAM_CRITERIA_DATA: Record<string, ExamCriteria> = {
  TELC_B1: {
    examName: "TELC Deutsch B1 (Zertifikat Deutsch)",
    totalPoints: 300,
    passThresholdPoints: 180,
    passPercentage: 60,
    sections: [
      {
        name: "Schriftliche Prüfung (Written)",
        points: 225,
        passRequirement: "Mindestens 135 Punkte (60%)",
        passHack: "Schreiben bringt 45 Punkte: Mit vorbereiteten E-Mail-Templates und festen Konnektoren (weil, obwohl, deshalb) holen Sie garantiert über 35 Punkte."
      },
      {
        name: "Mündliche Prüfung (Oral)",
        points: 75,
        passRequirement: "Mindestens 45 Punkte (60%)",
        passHack: "Teil 1 (Vorstellung) und Teil 3 (Planen) lassen sich zu 100% vorab auswendig lernen. Damit haben Sie die 45 Punkte bereits sicher in der Tasche."
      }
    ],
    masterPassStrategy: [
      "Fokus auf die Formel: Bei TELC müssen sowohl der schriftliche als auch der mündliche Teil mit jeweils 60% bestanden werden.",
      "Schreiben: Nutzen Sie feste Redemittel (Anrede, Grund, Konnektoren, höfliche Bitte, Grußformel). Grammatikfehler im Detail ziehen weniger Punkte ab als fehlende Struktur.",
      "Leseverstehen: Keine Texte Wort für Wort lesen! Nur Fragen lesen, Signalwörter markieren und im Text nach Synonymen suchen.",
      "Hörverstehen: Nutzen Sie die Vorbereitungszeit, um Schlüsselwörter in den Aufgabenstellungen zu unterstreichen."
    ]
  },
  GOETHE_B1: {
    examName: "Goethe-Zertifikat B1",
    totalPoints: 400,
    passThresholdPoints: 240,
    passPercentage: 60,
    sections: [
      {
        name: "Modul Lesen (Reading)",
        points: 100,
        passRequirement: "Mindestens 60 Punkte (60%)",
        passHack: "Teil 1 (Blog) und Teil 3 (Anzeigen) sind die leichtesten Punkte: Konzentrieren Sie sich auf Synonympaare."
      },
      {
        name: "Modul Hören (Listening)",
        points: 100,
        passRequirement: "Mindestens 60 Punkte (60%)",
        passHack: "Achten Sie auf Verneinungen (nicht, kein) und Korrekturen des Sprechers ('Eigentlich wollte ich..., aber...')."
      },
      {
        name: "Modul Schreiben (Writing)",
        points: 100,
        passRequirement: "Mindestens 60 Punkte (60%)",
        passHack: "Aufgabe 1 (persönliche E-Mail) und Aufgabe 3 (formelle Mitteilung) folgen festen Leitpunkten. Beantworten Sie jeden Punkt mit 2 Sätzen."
      },
      {
        name: "Modul Sprechen (Speaking)",
        points: 100,
        passRequirement: "Mindestens 60 Punkte (60%)",
        passHack: "Vortrag (Präsentation) zu einem Thema: Nutzen Sie die 5-Schritte-Präsentationsformel für einen garantierten Punktegewinn."
      }
    ],
    masterPassStrategy: [
      "Jedes Modul kann einzeln bestanden werden (60 von 100 Punkten).",
      "Wenn Sie ein Modul nicht bestehen, müssen Sie nur dieses eine Modul wiederholen, nicht die gesamte Prüfung.",
      "Schreiben und Sprechen sind die sichersten Module für schnelle Vorbereitung, da 70% der Sprache aus festen Wendungen (Redemitteln) besteht."
    ]
  },
  DTZ: {
    examName: "DTZ (Deutsch-Test für Zuwanderer A2-B1)",
    totalPoints: 100,
    passThresholdPoints: 60,
    passPercentage: 60,
    sections: [
      {
        name: "Sprechen (Mandatory for B1)",
        points: 100,
        passRequirement: "B1 im Sprechen ist zwingende Voraussetzung für das B1-Gesamtzertifikat!",
        passHack: "Wer im Sprechen B1 erreicht, braucht nur noch in EINER weiteren Fertigkeit (entweder Schreiben ODER Hören/Lesen) B1, um das B1-Gesamtzertifikat zu erhalten!"
      },
      {
        name: "Schreiben (E-Mail / Brief)",
        points: 100,
        passRequirement: "B1 oder A2",
        passHack: "Schreiben ist viel leichter auf B1 zu bringen als Hören/Lesen! Lernen Sie die 4 Grund-Vorlagen (Entschuldigung, Beschwerde, Verschiebung, Einladung) auswendig."
      },
      {
        name: "Hören & Lesen (Combined)",
        points: 100,
        passRequirement: "B1 oder A2",
        passHack: "Selbst wenn Hören/Lesen nur auf A2-Niveau ausfällt, erhalten Sie das offizielle B1-Zertifikat, sobald Sprechen B1 und Schreiben B1 erreicht sind!"
      }
    ],
    masterPassStrategy: [
      "Die goldene DTZ-Erfolgsformel: Konzentrieren Sie 70% Ihrer Energie auf SPRECHEN und SCHREIBEN.",
      "Warum? Weil Sprechen und Schreiben aktiv trainierbar sind und aus festen Satzmustern bestehen.",
      "Ein B1 im Sprechen + B1 im Schreiben garantiert das B1-Gesamtergebnis für Einbürgerung und Niederlassungserlaubnis!"
    ]
  }
};
