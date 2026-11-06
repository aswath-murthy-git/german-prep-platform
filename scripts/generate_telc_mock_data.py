#!/usr/bin/env python3
"""
Generates src/data/telc_b1_mock_exam_data.ts
Contains authentic data from telc_deutsch_b1_zd_uebungstest_1.pdf and MP3 audio.
Strictly 0 em dashes (\u2014) and 0 forbidden emojis.
"""

TS_CONTENT = r'''export interface TelcLesenTeil1Text {
  id: number;
  text: string;
  sourceOrCategory: string;
}

export interface TelcLesenTeil2Question {
  questionNumber: number;
  prompt: string;
  options: { key: "a" | "b" | "c"; text: string }[];
  correct: "a" | "b" | "c";
  explanation: string;
}

export interface TelcLesenTeil3Situation {
  situationNumber: number;
  text: string;
  correct: string; // "a".."l" or "x"
  explanation: string;
}

export interface TelcLesenTeil3Ad {
  key: string;
  title: string;
  content: string;
}

export interface TelcSprachbausteineTeil1Gap {
  gapNumber: number;
  options: { key: "a" | "b" | "c"; text: string }[];
  correct: "a" | "b" | "c";
  explanation: string;
}

export interface TelcSprachbausteineTeil2Gap {
  gapNumber: number;
  correctWordKey: string;
  correctWord: string;
  explanation: string;
}

export interface TelcHoerenTask {
  taskNumber: number;
  statement: string;
  correct: boolean; // true = +, false = -
  transcriptExcerpt: string;
  explanation: string;
}

export interface TelcMockExamFullData {
  meta: {
    title: string;
    level: string;
    subtests: string[];
    audioUrl: string;
    audioDuration: string;
    writtenPointsTotal: number;
    writtenPassThreshold: number;
    oralPointsTotal: number;
    oralPassThreshold: number;
    totalPoints: number;
  };
  lesen: {
    teil1: {
      instructions: string;
      headlines: { key: string; text: string }[];
      texts: TelcLesenTeil1Text[];
      answerKey: Record<number, string>;
    };
    teil2: {
      instructions: string;
      articleTitle: string;
      articleSubtitle: string;
      articleBody: string[];
      questions: TelcLesenTeil2Question[];
    };
    teil3: {
      instructions: string;
      situations: TelcLesenTeil3Situation[];
      ads: TelcLesenTeil3Ad[];
    };
  };
  sprachbausteine: {
    teil1: {
      instructions: string;
      sender: string;
      recipient: string;
      letterSegments: { type: "text" | "gap"; content?: string; gapNumber?: number }[];
      gaps: TelcSprachbausteineTeil1Gap[];
    };
    teil2: {
      instructions: string;
      recipientAd: { title: string; body: string };
      wordBank: { key: string; word: string }[];
      letterSegments: { type: "text" | "gap"; content?: string; gapNumber?: number }[];
      gaps: TelcSprachbausteineTeil2Gap[];
    };
  };
  hoeren: {
    audioUrl: string;
    teil1: {
      instructions: string;
      theme: string;
      tasks: TelcHoerenTask[];
    };
    teil2: {
      instructions: string;
      theme: string;
      tasks: TelcHoerenTask[];
    };
    teil3: {
      instructions: string;
      tasks: TelcHoerenTask[];
    };
  };
  schreiben: {
    instructions: string;
    duration: string;
    points: number;
    incomingEmail: {
      sender: string;
      subject: string;
      body: string;
    };
    guidingPoints: string[];
    criteria: {
      criterion: string;
      name: string;
      maxPoints: number;
      bands: { grade: string; points: number; desc: string }[];
    }[];
    certifiedModelSolution: {
      text: string;
      wordCount: number;
      score: number;
      breakdown: string;
    };
  };
  sprechen: {
    instructions: string;
    duration: string;
    points: number;
    teil1: {
      title: string;
      points: number;
      prompts: string[];
      examinerQuestions: string[];
    };
    teil2: {
      title: string;
      points: number;
      topic: string;
      participantAOpinion: string;
      participantBOpinion: string;
      instructions: string;
    };
    teil3: {
      title: string;
      points: number;
      scenario: string;
      planningPoints: string[];
      sampleDialogue: { speaker: string; text: string }[];
    };
    evaluationCriteria: {
      criterion: string;
      name: string;
      pointsTeil1: number;
      pointsTeil23: number;
    }[];
  };
}

export const TELC_B1_MOCK_EXAM_DATA: TelcMockExamFullData = {
  meta: {
    title: "telc Deutsch B1 / Zertifikat Deutsch (Übungstest 1)",
    level: "B1",
    subtests: [
      "Leseverstehen (Teil 1, 2, 3)",
      "Sprachbausteine (Teil 1, 2)",
      "Hörverstehen (Teil 1, 2, 3)",
      "Schriftlicher Ausdruck (E-Mail)",
      "Mündlicher Ausdruck (Paarprüfung)"
    ],
    audioUrl: "/audio/telc_deutsch_b1_uebungstest_1.mp3",
    audioDuration: "ca. 30 Minuten",
    writtenPointsTotal: 225,
    writtenPassThreshold: 135,
    oralPointsTotal: 75,
    oralPassThreshold: 45,
    totalPoints: 300
  },

  lesen: {
    teil1: {
      instructions: "Lesen Sie die Überschriften a-j und die Texte 1-5. Finden Sie für jeden Text die passende Überschrift. Sie können jede Überschrift nur einmal benutzen.",
      headlines: [
        { key: "a", text: "Immer mehr deutsche Familien reisen mit der Bahn" },
        { key: "b", text: "Buchtipp: Hilfe bei Schlafproblemen" },
        { key: "c", text: "Der Computer: Liebstes Hobby von Deutschlands Frauen" },
        { key: "d", text: "Neu bei der Bahn: Spezielle Informationen und Angebote für Radfahrer" },
        { key: "e", text: "Neu am Markt: Billige Schlaftabletten" },
        { key: "f", text: "Familien reisen billiger" },
        { key: "g", text: "Urlaub mit dem Fahrrad in Deutschland immer beliebter" },
        { key: "h", text: "Kultur im Urlaub: Interessen je nach Alter unterschiedlich" },
        { key: "i", text: "Umfrage: Wer verwendet den Computer am häufigsten?" },
        { key: "j", text: "Deutschland: Immer mehr Touristen reisen in den Westen" }
      ],
      texts: [
        {
          id: 1,
          sourceOrCategory: "Freizeitforschungsinstitut Hamburg",
          text: "Wer ist der typische Computerfan? Das B.A.T. Freizeitforschungsinstitut Hamburg ermittelte einige Eigenschaften: Er ist männlich, jung und hat einen höheren Schulabschluss. Bei der Beschäftigung am heimischen Computer stehen Textverarbeitung und Spiele ganz oben, es folgen private Buchhaltung, Grafikprogramme und Tabellenkalkulation."
        },
        {
          id: 2,
          sourceOrCategory: "Deutsche Bahn & Tourismuszentrale",
          text: "\"Bahn&Bike\" heißt ein 222-seitiger Prospekt, den die Deutsche Bahn AG in Zusammenarbeit mit der Deutschen Zentrale für Tourismus herausgebracht hat und der wichtige Informationen für jene bereitstellt, die ihren Radurlaub mit Bahnfahren verbinden wollen. Das Motto lautet: Hin mit der Bahn - das Rad vor Ort mieten. Der Prospekt enthält Angaben zur Streckenlänge und Wegbeschaffenheit, Adressen von Verleihstationen, verweist auf Sehenswürdigkeiten sowie Unterkünfte und wird durch Karten ergänzt. Die Broschüre kostet 5 Euro und ist im Buchhandel beziehungsweise an Fahrkartenschaltern zu beziehen."
        },
        {
          id: 3,
          sourceOrCategory: "Patientenratgeber Medizin",
          text: "Ausführliche Informationen zum Thema \"Schlafstörungen\" finden Sie im gleichnamigen Patientenratgeber von Dr. med. Fritz Hohagen. Sie erfahren, was den Schlaf stört und was Sie dagegen unternehmen können. Für 9,95 Euro erhalten Sie das Buch in Apotheken oder direkt beim Wort&Bild Verlag, 82065 Baierbrunn."
        },
        {
          id: 4,
          sourceOrCategory: "Bahnverkehr Deutschland / Österreich",
          text: "Jetzt wird für Familien Reisen mit der Bahn zwischen Österreich und Deutschland noch ein gutes Stück günstiger. Denn ab 6. Oktober gibt es den Familien-Super-Sparpreis. Ein echter Traumpreis für die ganze Familie - vom Baby bis zum Großpapa - da kann man wirklich sparen. Der Familien-Super-Sparpreis gilt für Familien, bestehend aus ein oder zwei Erwachsenen (Eltern, auch Großeltern) und deren Kindern/Enkelkindern bis zum vollendeten 17. Lebensjahr, wobei mindestens ein Kind/Enkelkind an der Reise teilnehmen muss."
        },
        {
          id: 5,
          sourceOrCategory: "Forschungsgemeinschaft Urlaub und Reisen e.V.",
          text: "Touristen zwischen 14 und 29 Jahren sowie zwischen 40 und 49 Jahren haben ein besonders großes Interesse an der Kultur des jeweiligen Reiselandes, während die Gruppe der 30- bis 39-jährigen im Urlaub \"eine Kulturpause einlegt\". Dies geht aus der neuesten Analyse der Forschungsgemeinschaft Urlaub und Reisen e. V. hervor. Urlauber aus Ostdeutschland, so die Studie, zeigen wiederum mehr Kulturinteresse als Reisende aus dem Westen. Grundsätzlich gelte: Je höher das Einkommen und die Schulbildung sind, umso mehr besteht im Urlaub der Wunsch, Land und Leute kennenzulernen."
        }
      ],
      answerKey: {
        1: "i",
        2: "d",
        3: "b",
        4: "f",
        5: "h"
      }
    },

    teil2: {
      instructions: "Lesen Sie den Text und die Aufgaben 6-10. Welche Lösung (a, b oder c) ist jeweils richtig?",
      articleTitle: "Büro-Werkstatt: Chance für behinderte Menschen",
      articleSubtitle: "Computerarbeit im Auftrag privater Firmen - jeder Dritte findet nach einem fünfmonatigen Kurs einen Job. Interessierte Unternehmen werden noch gesucht.",
      articleBody: [
        "Margit, die junge Frau im Rollstuhl, erledigt die Lohnverrechnung für einen Verlag. Reinhard, seit der Geburt gehbehindert, tippt für die Direktion von Hewlett Packard Protokolle und Preislisten. Martin, seine Unterarme sind verkürzt, layoutet die Speisekarte eines Wiener Restaurants.",
        "Drei junge körperbehinderte Menschen am Computer - alle drei können auf eine abgeschlossene kaufmännische Ausbildung verweisen. Dennoch hat man sie auf dem Arbeitsamt als \"schwer vermittelbar\" eingestuft - was de facto nicht vermittelbar bedeutet. Zurzeit arbeiten Margit, Reinhard und Martin - gemeinsam mit sieben anderen behinderten Menschen - in der \"Büro-Werkstatt\" in Wien-Stadlau. Hier werden körperbehinderte Schulabgänger auf das Berufsleben vorbereitet. In einem fünfmonatigen Kurs lernen sie, das in der Schule Gelernte in die Praxis umzusetzen. Ihre Dienste werden von Privatfirmen (darunter auch die OMV und zwei Banken) zugekauft.",
        "Gleichzeitig wird ihnen bei der Jobsuche geholfen. \"Leicht ist das nicht\", sagt Betreuer Günther Hos. \"Es gibt so viele Arbeitslose, die nicht behindert sind. Wer nimmt schon einen Mitarbeiter mit Handicap?\" Zwar wären die Firmen gesetzlich verpflichtet, pro 25 Beschäftigte einen Behinderten einzustellen. Die meisten Firmen nützen jedoch die Möglichkeit, sich \"freizukaufen\" (die sogenannte \"Ausgleichstaxe\" beträgt rund 150 Euro monatlich).",
        "Trotz der Rahmenbedingungen kann Hos mit einer durchaus positiven Bilanz aufwarten: \"Immerhin haben wir seit der Vereinsgründung vor drei Jahren ein Drittel unserer Leute untergebracht.\" Auch ein Dienst an der Allgemeinheit, denn jede Vermittlung bedeutet: ein Arbeitsloser weniger, ein Steuerzahler mehr.",
        "Gegründet wurde die Büro-Werkstatt von einer Lehrerin: Heide Hanisch, die in einer Wiener berufsbildenden Schule Geografie und Geschichte unterrichtet, wollte nicht länger hinnehmen, dass ihre behinderten Schüler erst ausgebildet werden, um dann als Arbeitnehmer nicht gebraucht zu werden.",
        "Nähere Informationen, auch für interessierte Firmen: \"Büro-Werkstatt\" in Wien-Stadlau, Telefon: 0222/283 85 75."
      ],
      questions: [
        {
          questionNumber: 6,
          prompt: "In einem fünfmonatigen Kurs können die Teilnehmer",
          options: [
            { key: "a", text: "eine berufliche Ausbildung abschließen." },
            { key: "b", text: "lernen, was sie in der Schule verpasst haben." },
            { key: "c", text: "praktische Erfahrungen mit der Büroarbeit sammeln." }
          ],
          correct: "c",
          explanation: "Der Text sagt: 'In einem fünfmonatigen Kurs lernen sie, das in der Schule Gelernte in die Praxis umzusetzen.'"
        },
        {
          questionNumber: 7,
          prompt: "Die Büro-Werkstatt versucht außerdem,",
          options: [
            { key: "a", text: "auch jenen Arbeitslosen zu helfen, die nicht behindert sind." },
            { key: "b", text: "Behinderte auf die Abschlussprüfungen vorzubereiten." },
            { key: "c", text: "für die behinderten Menschen eine Arbeit zu finden." }
          ],
          correct: "c",
          explanation: "Der Text sagt: 'Gleichzeitig wird ihnen bei der Jobsuche geholfen.'"
        },
        {
          questionNumber: 8,
          prompt: "Laut Gesetz müssen österreichische Firmen pro 25 Beschäftigte",
          options: [
            { key: "a", text: "eine besondere Steuer zahlen." },
            { key: "b", text: "einen Behinderten einstellen oder eine monatliche Gebühr bezahlen." },
            { key: "c", text: "für jeden Behinderten monatlich 150 Euro bezahlen." }
          ],
          correct: "b",
          explanation: "Gesetzliche Pflicht: Einen Behinderten pro 25 Beschäftigte einstellen oder sich durch die Ausgleichstaxe (150 Euro) freikaufen."
        },
        {
          questionNumber: 9,
          prompt: "Seit der Vereinsgründung",
          options: [
            { key: "a", text: "konnte für ein Drittel der behinderten Kursteilnehmer eine Arbeit gefunden werden." },
            { key: "b", text: "konnte Günther Hos für den Verein schon viel Geld sparen." },
            { key: "c", text: "zahlen Arbeitslose um ein Drittel weniger Steuern." }
          ],
          correct: "a",
          explanation: "'Immerhin haben wir seit der Vereinsgründung vor drei Jahren ein Drittel unserer Leute untergebracht.'"
        },
        {
          questionNumber: 10,
          prompt: "Die Lehrerin, die die Büro-Werkstatt gegründet hat,",
          options: [
            { key: "a", text: "wollte etwas tun, damit Behinderte einen Arbeitsplatz erhalten." },
            { key: "b", text: "wollte nicht länger Geografie und Geschichte unterrichten." },
            { key: "c", text: "wird nach der Ausbildung der Behinderten nicht mehr gebraucht." }
          ],
          correct: "a",
          explanation: "Sie wollte nicht länger hinnehmen, dass behinderte Schüler ausgebildet werden, um dann nicht gebraucht zu werden."
        }
      ]
    },

    teil3: {
      instructions: "Lesen Sie die Situationen 11-20 und die Anzeigen a-l. Finden Sie für jede Situation die passende Anzeige. Jede Anzeige passt nur einmal. Wenn es keine passende Anzeige gibt, wählen Sie 'x'.",
      situations: [
        {
          situationNumber: 11,
          text: "Sie möchten mit Freunden in einem Restaurant essen. Da das Wetter schön ist, möchten Sie gerne draußen sitzen.",
          correct: "b",
          explanation: "Anzeige b (Ristorante Olindo): 'Italienisches Restaurant ... Bei schönem Wetter Gartenbetrieb.'"
        },
        {
          situationNumber: 12,
          text: "Sie möchten heute nicht selbst kochen, sondern lieber ein warmes Essen kaufen und mit nach Hause nehmen.",
          correct: "a",
          explanation: "Anzeige a (Thai-China-Vietnam Bong - Hong): 'Alle Gerichte auch zum Mitnehmen und Heimservice.'"
        },
        {
          situationNumber: 13,
          text: "In den Sommerferien möchten Sie gerne in die USA fliegen. Sie brauchen dort auch eine Unterkunft.",
          correct: "d",
          explanation: "Anzeige d (SEATOP Reisen): 'Der Flug- und Hotelspezialist ... Sommertermine nach USA noch Plätze frei.'"
        },
        {
          situationNumber: 14,
          text: "Reisebüros bieten billigere Flüge an, wenn man in letzter Minute bucht. Sie suchen so einen Flug.",
          correct: "x",
          explanation: "Keine Anzeige bietet Last-Minute-Flüge an (Anzeige j betont im Gegenteil: 'Früh buchen lohnt!')."
        },
        {
          situationNumber: 15,
          text: "Ihre Tochter, die studiert, möchte in die USA fliegen. Sie suchen einen billigen Flug für sie.",
          correct: "e",
          explanation: "Anzeige e (COUNCIL TRAVEL): 'Für Studenten/Jugendliche: New York/Boston 329, Los Angeles 429...'"
        },
        {
          situationNumber: 16,
          text: "Ihr Sohn ist schlecht in Mathematik und braucht deshalb noch Unterricht außerhalb der Schule.",
          correct: "i",
          explanation: "Anzeige i (Unterricht / Nachhilfe): 'Nachhilfe in Mathe-Physik mit viel Geduld u. Erfahrung von Gymnasiallehrer.'"
        },
        {
          situationNumber: 17,
          text: "Das Kind Ihrer Freunde hat Probleme beim Sprechen und braucht deshalb Hilfe.",
          correct: "k",
          explanation: "Anzeige k: 'Für Erwachsene und Kinder mit (Sprach-)Schwierigkeiten: Gisela Geiger, Leopoldstraße 83.'"
        },
        {
          situationNumber: 18,
          text: "Sie haben einen jungen Franzosen zu Besuch. Sie möchten, dass er in einen Deutschkurs geht.",
          correct: "l",
          explanation: "Anzeige l (Sprachbörse): 'Deutsch als Fremdsprache - Prüfungskurse, Minigruppen und Einzelunterricht.'"
        },
        {
          situationNumber: 19,
          text: "Sie möchten, dass Ihr Sohn in einen Jugendclub geht.",
          correct: "x",
          explanation: "Keine der Anzeigen beschreibt einen Jugendclub für Jugendliche."
        },
        {
          situationNumber: 20,
          text: "Sie interessieren sich für die Probleme ausländischer Jugendlicher in Deutschland.",
          correct: "g",
          explanation: "Anzeige g (Internationaler Stammtisch): 'Deutsche und ausländische Jugendliche in München ist das Thema...'"
        }
      ],
      ads: [
        {
          key: "a",
          title: "Thai-China-Vietnam Restaurant Bong - Hong",
          content: "Asiatisches Spezialitäten-Restaurant. 81379 Boschetsrieder Str. 140. Täglich 11.30-14.30 und 17.30-23.00 Uhr. Alle Gerichte auch zum Mitnehmen und Heimservice."
        },
        {
          key: "b",
          title: "Ristorante OLINDO",
          content: "Italienisches Restaurant - hausgemachte Nudeln, Fischspezialitäten, Mittagsmenüs ab 7.50 Euro. Bei schönem Wetter Gartenbetrieb! Fallmerayerstr. 16, München-Schwabing."
        },
        {
          key: "c",
          title: "Versicherungsbüro Helmut Schwabe",
          content: "Sind Sie für den Urlaub gut versichert? Versicherungskammer Bayern, Herzogstraße 88, München."
        },
        {
          key: "d",
          title: "SEATOP Reisen",
          content: "Flug- und Hotelspezialist. WELTWEIT REISEN, Mietwagen, Hotelvermittlung, Rundreisen. Sommertermine nach USA noch Plätze frei!"
        },
        {
          key: "e",
          title: "COUNCIL TRAVEL",
          content: "Adalbertstr. 32, München. Für Studenten/Jugendliche: Flüge nach New York/Boston 329, Los Angeles 429, London 99, Paris 99. Sprachreisen & Abenteuerreisen."
        },
        {
          key: "f",
          title: "Kreittmayr Kneipe",
          content: "Kneipe mit Biergarten, Billard und Kegelbahnen. Bundesliga live. Kreittmayrstr. 15."
        },
        {
          key: "g",
          title: "Internationaler Stammtisch",
          content: "Deutsche und ausländische Jugendliche in München: Diskussion am Montag, 4. Sept., 19.30 Uhr im Ratskeller Moriskengewölbe (Marienplatz)."
        },
        {
          key: "h",
          title: "Gymnasiallehrer Mathe / Physik",
          content: "Nachhilfe für alle Klassen, Gymnasium, Realschule, FOS, Abi-Vorbereitung. Tel. 089/834 04 40."
        },
        {
          key: "i",
          title: "Nachhilfe Mathe-Physik",
          content: "Unterricht: Nachhilfe in Mathe-Physik mit viel Geduld und Erfahrung von Gymnasiallehrer, Tel. 260 95 57."
        },
        {
          key: "j",
          title: "City-Reisebüro Campmobile",
          content: "Campmobile USA/Canada (z.B. San Francisco/Los Angeles) ab 35 Euro pro Tag. Früh buchen lohnt!"
        },
        {
          key: "k",
          title: "Kurse für Sprachschwierigkeiten",
          content: "Für Erwachsene und Kinder mit (Sprach-)Schwierigkeiten. Gisela Geiger, Leopoldstraße 83, München, Tel. 39 99 95."
        },
        {
          key: "l",
          title: "SPRACHBÖRSE",
          content: "Deutsch als Fremdsprache, Fremdsprachen, Prüfungskurse, muttersprachliche Lehrkräfte, Minigruppen und Einzelunterricht. Nähe Rotkreuzplatz."
        }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      instructions: "Lesen Sie den Text und schließen Sie die Lücken 21-30. Welche Lösung (a, b oder c) ist jeweils richtig?",
      sender: "Fritz",
      recipient: "Karin",
      letterSegments: [
        { type: "text", content: "Liebe Karin,\n\nnach meinem Praktikum in Frankreich bin ich jetzt wieder zu Hause. Wie du ja weißt, wollte ich eigentlich nach Paris, " },
        { type: "gap", gapNumber: 21 },
        { type: "text", content: " das hat dann leider nicht geklappt. Doch dann habe ich eine Stelle als Praktikant bei " },
        { type: "gap", gapNumber: 22 },
        { type: "text", content: " Firma in Straßburg gefunden.\n\nDort " },
        { type: "gap", gapNumber: 23 },
        { type: "text", content: " ich drei Monate geblieben. Die Arbeit war sehr " },
        { type: "gap", gapNumber: 24 },
        { type: "text", content: " - ich musste schon um 8.00 Uhr im Büro sein -, hat mir aber " },
        { type: "gap", gapNumber: 25 },
        { type: "text", content: " sehr gut gefallen.\n\nIch habe " },
        { type: "gap", gapNumber: 26 },
        { type: "text", content: " dieser Zeit in verschiedenen Abteilungen gearbeitet und so nicht nur etwas über die Herstellung von Fernsehgeräten " },
        { type: "gap", gapNumber: 27 },
        { type: "text", content: ", sondern auch über den Verkauf. Und die Kollegen, mit " },
        { type: "gap", gapNumber: 28 },
        { type: "text", content: " ich am meisten zu tun hatte, waren wirklich sehr nett.\n\nNach dem Praktikum habe ich noch zwei Wochen Urlaub bei " },
        { type: "gap", gapNumber: 29 },
        { type: "text", content: " Freunden gemacht. Darüber erzähle ich " },
        { type: "gap", gapNumber: 30 },
        { type: "text", content: " bald mehr - für heute muss ich Schluss machen.\n\nLiebe Grüße,\nFritz" }
      ],
      gaps: [
        {
          gapNumber: 21,
          options: [{ key: "a", text: "aber" }, { key: "b", text: "denn" }, { key: "c", text: "sondern" }],
          correct: "a",
          explanation: "'aber' drückt die Einschränkung aus ('wollte nach Paris, aber es klappte nicht')."
        },
        {
          gapNumber: 22,
          options: [{ key: "a", text: "eine" }, { key: "b", text: "einen" }, { key: "c", text: "einer" }],
          correct: "c",
          explanation: "Präposition 'bei' verlangt Dativ feminin: 'bei einer Firma'."
        },
        {
          gapNumber: 23,
          options: [{ key: "a", text: "bin" }, { key: "b", text: "habe" }, { key: "c", text: "wurde" }],
          correct: "a",
          explanation: "Das Verb 'bleiben' bildet das Perfekt immer mit 'sein': 'ich bin geblieben'."
        },
        {
          gapNumber: 24,
          options: [{ key: "a", text: "anstrengend" }, { key: "b", text: "anstrengende" }, { key: "c", text: "anstrengendes" }],
          correct: "a",
          explanation: "Prädikatives Adjektiv nach 'war sehr': keine Endung -> 'anstrengend'."
        },
        {
          gapNumber: 25,
          options: [{ key: "a", text: "trotzdem" }, { key: "b", text: "wegen" }, { key: "c", text: "weshalb" }],
          correct: "a",
          explanation: "'trotzdem' (konzessiv): Die Arbeit war anstrengend, hat aber trotzdem gefallen."
        },
        {
          gapNumber: 26,
          options: [{ key: "a", text: "bis" }, { key: "b", text: "in" }, { key: "c", text: "nach" }],
          correct: "b",
          explanation: "'in dieser Zeit' (zeitliche Angabe im Dativ)."
        },
        {
          gapNumber: 27,
          options: [{ key: "a", text: "gelernt" }, { key: "b", text: "lernen" }, { key: "c", text: "lernte" }],
          correct: "a",
          explanation: "Perfekt-Konstruktion mit 'habe': Partizip II 'gelernt' am Satzende."
        },
        {
          gapNumber: 28,
          options: [{ key: "a", text: "dem" }, { key: "b", text: "denen" }, { key: "c", text: "die" }],
          correct: "b",
          explanation: "Relativpronomen im Dativ Plural nach 'mit': 'denen'."
        },
        {
          gapNumber: 29,
          options: [{ key: "a", text: "meine" }, { key: "b", text: "meinen" }, { key: "c", text: "meiner" }],
          correct: "b",
          explanation: "Präposition 'bei' verlangt Dativ Plural: 'bei meinen Freunden'."
        },
        {
          gapNumber: 30,
          options: [{ key: "a", text: "dir" }, { key: "b", text: "Ihnen" }, { key: "c", text: "uns" }],
          correct: "a",
          explanation: "Informeller Brief an Karin ('du') -> Dativ-Pronomen 'dir'."
        }
      ]
    },

    teil2: {
      instructions: "Lesen Sie den Text und schließen Sie die Lücken 31-40. Benutzen Sie die Wörter a-o aus dem Kasten. Jedes Wort passt nur einmal.",
      recipientAd: {
        title: "Hotel-Pension Janosch",
        body: "ruhige Lage, Wanderwege, Bademöglichkeiten, Tennis, Freizeitprogramm für Kinder, Familienappartements: 1 Woche pro Person nur 99 Euro inkl. Frühstück, spezielle Kinderermäßigung. Anfragen an: Herbert Janosch, Griesweg 3, A-5020 Innsbruck."
      },
      wordBank: [
        { key: "a", word: "BESONDERS" },
        { key: "b", word: "DA" },
        { key: "c", word: "DAFÜR" },
        { key: "d", word: "DAMALS" },
        { key: "e", word: "DAMIT" },
        { key: "f", word: "DANKBAR" },
        { key: "g", word: "DESHALB" },
        { key: "h", word: "FÜR" },
        { key: "i", word: "GERNE" },
        { key: "j", word: "KÖNNTEN" },
        { key: "k", word: "MIT" },
        { key: "l", word: "MÜSSTEN" },
        { key: "m", word: "SCHLIESSLICH" },
        { key: "n", word: "WANN" },
        { key: "o", word: "WENN" }
      ],
      letterSegments: [
        { type: "text", content: "Sehr geehrter Herr Janosch,\n\nich habe Ihre Anzeige gelesen und interessiere mich sehr " },
        { type: "gap", gapNumber: 31 },
        { type: "text", content: " Ihr Angebot. Ich möchte mit meiner Familie vom 10.-24. August in Österreich Urlaub machen und hätte " },
        { type: "gap", gapNumber: 32 },
        { type: "text", content: " noch nähere Informationen.\n\nMeine Frau und mich interessiert ganz " },
        { type: "gap", gapNumber: 33 },
        { type: "text", content: " das Freizeitprogramm für Kinder, " },
        { type: "gap", gapNumber: 34 },
        { type: "text", content: " wir zwei Kinder (3 und 8 Jahre) haben. Gibt es Schwimm- und Tenniskurse für Kinder und " },
        { type: "gap", gapNumber: 35 },
        { type: "text", content: " ja, was kosten sie? In Ihrer Anzeige steht auch, dass Sie für die Unterkunft günstige Angebote für Kinder haben. Wie viel " },
        { type: "gap", gapNumber: 36 },
        { type: "text", content: " wir pro Woche für unsere Kinder bezahlen?\n\nUnd " },
        { type: "gap", gapNumber: 37 },
        { type: "text", content: " noch eine letzte Frage: Wir haben einen kleinen Hund, von dem sich meine Kinder nicht trennen können und den wir " },
        { type: "gap", gapNumber: 38 },
        { type: "text", content: " auch mitnehmen müssten. Wäre das möglich?\n\nBitte schreiben Sie uns so bald wie möglich, " },
        { type: "gap", gapNumber: 39 },
        { type: "text", content: " wir uns bald entscheiden können. Außerdem wären wir Ihnen sehr " },
        { type: "gap", gapNumber: 40 },
        { type: "text", content: ", wenn Sie uns einige Prospekte oder Bilder Ihrer Pension sowie der Umgebung zusenden würden.\n\nMit freundlichen Grüßen,\nIhr Anton Müller" }
      ],
      gaps: [
        { gapNumber: 31, correctWordKey: "h", correctWord: "FÜR", explanation: "sich interessieren + FÜR (Akkusativ): 'für Ihr Angebot'." },
        { gapNumber: 32, correctWordKey: "i", correctWord: "GERNE", explanation: "Feste Wendung: 'hätte gerne noch nähere Informationen'." },
        { gapNumber: 33, correctWordKey: "a", correctWord: "BESONDERS", explanation: "'ganz besonders' (ganz speziell / im Besonderen)." },
        { gapNumber: 34, correctWordKey: "b", correctWord: "DA", explanation: "'da' (Kausalsatz / Begründung): da wir zwei Kinder haben." },
        { gapNumber: 35, correctWordKey: "o", correctWord: "WENN", explanation: "Konditional: 'und wenn ja, was kosten sie?'" },
        { gapNumber: 36, correctWordKey: "l", correctWord: "MÜSSTEN", explanation: "Höflicher Konjunktiv II: 'Wie viel müssten wir bezahlen?'" },
        { gapNumber: 37, correctWordKey: "m", correctWord: "SCHLIESSLICH", explanation: "'Und schließlich noch eine letzte Frage' (Aufzählung)." },
        { gapNumber: 38, correctWordKey: "g", correctWord: "DESHALB", explanation: "Kausaladverb: 'den wir deshalb auch mitnehmen müssten'." },
        { gapNumber: 39, correctWordKey: "e", correctWord: "DAMIT", explanation: "Finalsatz ('so that'): 'damit wir uns bald entscheiden können'." },
        { gapNumber: 40, correctWordKey: "f", correctWord: "DANKBAR", explanation: "Höflichkeitsformel im B1-Brief: 'wären wir Ihnen sehr dankbar'." }
      ]
    }
  },

  hoeren: {
    audioUrl: "/audio/telc_deutsch_b1_uebungstest_1.mp3",
    teil1: {
      instructions: "Sie hören fünf kurze Texte. Dazu lösen Sie fünf Aufgaben. Sie hören diese Texte nur einmal. Entscheiden Sie, ob die Aussagen 41-45 richtig (+) oder falsch (-) sind.",
      theme: "Gleichberechtigung im Haushalt (50 Paare befragt)",
      tasks: [
        {
          taskNumber: 41,
          statement: "Die Sprecherin muss im Haushalt fast alles alleine machen.",
          correct: true,
          transcriptExcerpt: "Na, eigentlich mach alles ich, ich bin zu Haus, daher koch ich, ich wasch ab, ich bügle, ich versorge das Kind...",
          explanation: "Richtig (+): Die Sprecherin sagt deutlich, dass sie fast alles alleine macht."
        },
        {
          taskNumber: 42,
          statement: "Der Sprecher wäscht das Geschirr und die Wäsche.",
          correct: false,
          transcriptExcerpt: "Dafür wäscht meine Frau eben ab... Wäsche waschen mach ich nicht so gerne, das macht sie...",
          explanation: "Falsch (-): Seine Frau wäscht das Geschirr und die Wäsche, er kocht und kauft ein."
        },
        {
          taskNumber: 43,
          statement: "Die Sprecherin ist berufstätig und hat keine Zeit für die Hausarbeit.",
          correct: false,
          transcriptExcerpt: "Mein Mann ist voll berufstätig, ich bin zu Hause mit unseren zwei kleinen Kindern...",
          explanation: "Falsch (-): Sie ist nicht berufstätig, sondern zu Hause mit den zwei Kindern."
        },
        {
          taskNumber: 44,
          statement: "Der Sprecher teilt sich mit seiner Partnerin die Arbeit je nach Situation auf.",
          correct: true,
          transcriptExcerpt: "Puh, wissen Sie, bei uns ist das eigentlich ganz unterschiedlich, das hängt von der Situation ab...",
          explanation: "Richtig (+): Er bestätigt ausdrücklich, dass die Aufteilung situationsabhängig ist."
        },
        {
          taskNumber: 45,
          statement: "Die Sprecherin ist froh, dass ihr Mann so viele Hausarbeiten übernimmt.",
          correct: false,
          transcriptExcerpt: "Also mein Mann, der ist ziemlich faul, der macht überhaupt nur, was ihm Spaß macht... von Putzen kann keine Rede sein...",
          explanation: "Falsch (-): Sie beschwert sich bitter darüber, dass ihr Mann faul ist."
        }
      ]
    },

    teil2: {
      instructions: "Sie hören ein Gespräch mit einer Vertreterin des Sportvereins. Lösen Sie zehn Aufgaben. Sie hören das Gespräch zweimal. Entscheiden Sie, ob die Aussagen 46-55 richtig (+) oder falsch (-) sind.",
      theme: "100 Jahre Turn- und Sportverein Neustadt (Interview mit Schriftführerin Frau Seiffert)",
      tasks: [
        {
          taskNumber: 46,
          statement: "Der Sportverein plant eine große Feier.",
          correct: true,
          transcriptExcerpt: "Der Turn- und Sportverein Neustadt wird in diesem Jahr 100 Jahre alt und feiert diesen Geburtstag mit einem großen Programm.",
          explanation: "Richtig (+): 100-jähriges Jubiläum mit großem Festprogramm."
        },
        {
          taskNumber: 47,
          statement: "Der Journalist unterhält sich mit einer Vertreterin des Sportvereins.",
          correct: true,
          transcriptExcerpt: "Ich begrüße dazu heute hier im Studio eine Vertreterin des Turn- und Sportvereins Neustadt, Frau Seiffert.",
          explanation: "Richtig (+): Frau Seiffert ist die Schriftführerin des Vereins."
        },
        {
          taskNumber: 48,
          statement: "Viele Papiere aus den Anfängen des Vereins sind im Krieg verloren gegangen.",
          correct: false,
          transcriptExcerpt: "Unsere Kollegen früher waren nämlich äußerst sorgfältig. So konnten wir in unserer Festzeitung das Programm von der ersten Hauptversammlung veröffentlichen.",
          explanation: "Falsch (-): Die Dokumente sind trotz zweier Kriege noch vorhanden."
        },
        {
          taskNumber: 49,
          statement: "Der Verein veröffentlicht jedes Jahr eine Festzeitung.",
          correct: false,
          transcriptExcerpt: "So konnten wir in unserer Festzeitung zum 100. Geburtstag...",
          explanation: "Falsch (-): Die Festzeitung erscheint anlässlich des 100. Geburtstags, nicht jedes Jahr."
        },
        {
          taskNumber: 50,
          statement: "Der Verein hatte von Anfang an auch Frauen als Mitglieder.",
          correct: false,
          transcriptExcerpt: "Am Anfang war Sport reine Männersache. Es hat 16 Jahre gedauert, bis bei uns die ersten Frauen dazukamen.",
          explanation: "Falsch (-): In den ersten 16 Jahren wurden nur Männer aufgenommen."
        },
        {
          taskNumber: 51,
          statement: "Heute gibt es im Verein mehr Frauen als Männer.",
          correct: true,
          transcriptExcerpt: "Über 50 Prozent der Mitglieder sind Frauen, d. h. mehr als 1000 der insgesamt 2000 Mitglieder.",
          explanation: "Richtig (+): Mehr als 50% der Mitglieder sind weiblich."
        },
        {
          taskNumber: 52,
          statement: "Im Verein kann man Sport im Freien und in der Halle treiben.",
          correct: true,
          transcriptExcerpt: "Ihr Verein hat ja hier in Neustadt eine schöne Anlage mit Sportplätzen im Freien und einer großen Halle.",
          explanation: "Richtig (+): Sowohl Freiluftplätze als auch eine große Sporthalle sind vorhanden."
        },
        {
          taskNumber: 53,
          statement: "Die Mitglieder müssen die Kosten für ihren Verein alleine tragen.",
          correct: false,
          transcriptExcerpt: "50 Prozent des Geldes... bekommen wir durch unsere Mitglieder... den Rest bekommen wir von der Stadt und vom Deutschen Sportbund.",
          explanation: "Falsch (-): Die Stadt und der Deutsche Sportbund finanzieren 50% mit."
        },
        {
          taskNumber: 54,
          statement: "Der Sportverein bietet auch Schwimmkurse an.",
          correct: false,
          transcriptExcerpt: "Im Grunde genommen bieten wir fast jede Sportart an, außer Schwimmen. Es gibt im Nachbarort ein großes Schwimmbad...",
          explanation: "Falsch (-): Schwimmen wird ausdrücklich nicht angeboten."
        },
        {
          taskNumber: 55,
          statement: "Einige Leute, die im Verein ausgebildet wurden, arbeiten dort heute als Lehrer.",
          correct: true,
          transcriptExcerpt: "Wir bilden ja viele Leute aus, die später Sport studieren... Diese Leute bitten wir oft, im eigenen Verein zu unterrichten.",
          explanation: "Richtig (+): Eigene Nachwuchskräfte unterrichten als Trainer und Sportlehrer."
        }
      ]
    },

    teil3: {
      instructions: "Sie hören fünf kurze Ansagen. Dazu lösen Sie fünf Aufgaben. Sie hören jeden Text zweimal. Entscheiden Sie, ob die Aussagen 56-60 richtig (+) oder falsch (-) sind.",
      tasks: [
        {
          taskNumber: 56,
          statement: "Das Büro ist in der Schillerstraße.",
          correct: true,
          transcriptExcerpt: "Überqueren Sie die Königstraße, bleiben Sie aber in der Schillerstraße. Wir sind dann ein Stückchen weiter, gegenüber vom Kino Gloria.",
          explanation: "Richtig (+): Das Büro befindet sich in der Schillerstraße."
        },
        {
          taskNumber: 57,
          statement: "Der Film „Sommer“ läuft im Filmcasino.",
          correct: false,
          transcriptExcerpt: "City Kino 1: \"Sommer\", 18 Uhr 45 und 21 Uhr. Filmcasino: \"Frühstück bei Tiffany\"...",
          explanation: "Falsch (-): 'Sommer' läuft im City Kino 1, nicht im Filmcasino."
        },
        {
          taskNumber: 58,
          statement: "Im Süden Bayerns wird es am Nachmittag schön und nicht sehr warm.",
          correct: true,
          transcriptExcerpt: "Südbayern: Anfangs noch vereinzelt Regen, später zunehmend sonnig mit Höchsttemperaturen bis 18 Grad.",
          explanation: "Richtig (+): Zunehmend sonnig (schön) und maximal 18 Grad (nicht sehr warm)."
        },
        {
          taskNumber: 59,
          statement: "Im Zugrestaurant können Sie auch Zeitungen kaufen.",
          correct: false,
          transcriptExcerpt: "Unser Zugrestaurant... ab 11.30 Uhr zum Mittagessen... Minibar mit Imbiss und Getränken...",
          explanation: "Falsch (-): Zeitungen werden im Zugrestaurant nicht erwähnt oder verkauft."
        },
        {
          taskNumber: 60,
          statement: "Damenröcke kosten heute 39 Euro.",
          correct: true,
          transcriptExcerpt: "Ja, bei uns gibt's zum Beispiel damenhafte Röcke für nur 39 Euro...",
          explanation: "Richtig (+): Die Ansage nennt exakt 'Röcke für nur 39 Euro'."
        }
      ]
    }
  },

  schreiben: {
    instructions: "Schreiben Sie eine Antwort-E-Mail an Ihre Freundin. Behandeln Sie alle vier Leitpunkte angemessen. Schreiben Sie etwa 100 bis 120 Wörter. Achten Sie auf Anrede, Einleitung, passende Konnektoren und Schlussformel.",
    duration: "30 Minuten",
    points: 45,
    incomingEmail: {
      sender: "Anna (anna.freundin@web.de)",
      subject: "Besuch bei dir!",
      body: "Liebe/r Freund/in,\\n\\ndanke für deine nette Einladung! Ich komme dich sehr gerne besuchen, um dein Land kennenzulernen - wie du weißt, war ich ja noch nie da. Wann wäre die beste Zeit, dich zu besuchen?\\nIch weiß noch nicht einmal, ob es bei euch im Sommer sehr heiß wird - allzu große Hitze mag ich nämlich nicht so sehr. Und gibt es sonst noch irgendwelche Dinge, die ich wissen sollte, bevor ich diese Reise mache?\\n\\nBitte schreib mir möglichst bald, damit ich mich gut auf die Reise vorbereiten kann.\\n\\nHerzliche Grüße,\\nAnna"
    },
    guidingPoints: [
      "Beste Reisezeit (Wann der Besuch am schönsten ist)",
      "Sommerwetter & Temperaturen (Reaktion auf ihre Hitzebedenken)",
      "Wichtige Tipps & Vorbereitung (Kleidung, Gepäck, Dokumente)",
      "Gemeinsame Pläne & Ausflüge (Was ihr zusammen unternehmen werdet)"
    ],
    criteria: [
      {
        criterion: "I",
        name: "Aufgabenbewältigung (Inhalt & Leitpunkte)",
        maxPoints: 15,
        bands: [
          { grade: "A (15 Pkt)", points: 15, desc: "Alle 4 Leitpunkte inhaltlich voll und präzise ausgearbeitet." },
          { grade: "B (10 Pkt)", points: 10, desc: "3 Leitpunkte voll oder alle 4 ansatzweise behandelt." },
          { grade: "C (5 Pkt)", points: 5, desc: "Nur 2 Leitpunkte behandelt; lückenhafte Ausführung." },
          { grade: "D (0 Pkt)", points: 0, desc: "Thema verfehlt oder weniger als 2 Leitpunkte." }
        ]
      },
      {
        criterion: "II",
        name: "Kommunikative Gestaltung (Textaufbau & Konnektoren)",
        maxPoints: 15,
        bands: [
          { grade: "A (15 Pkt)", points: 15, desc: "Sehr flüssiger Textaufbau, logische Absätze, vielfältige Konnektoren (weil, dass, obwohl, wenn)." },
          { grade: "B (10 Pkt)", points: 10, desc: "Überwiegend verständlich und gegliedert mit einfachen Verknüpfungen (und, aber, deshalb)." },
          { grade: "C (5 Pkt)", points: 5, desc: "Starker Bruch im Textfluss, kaum Konnektoren." },
          { grade: "D (0 Pkt)", points: 0, desc: "Kein zusammenhängender Text." }
        ]
      },
      {
        criterion: "III",
        name: "Formale Richtigkeit (Grammatik, Wortschatz & Orthographie)",
        maxPoints: 15,
        bands: [
          { grade: "A (15 Pkt)", points: 15, desc: "Keine oder nur vereinzelte Fehler; korrekte Satzstellung und Verbflexion." },
          { grade: "B (10 Pkt)", points: 10, desc: "Einige Fehler bei Artikeln oder Endungen, die das Verständnis aber nicht stören." },
          { grade: "C (5 Pkt)", points: 5, desc: "Häufige Grammatikfehler an zentralen Stellen." },
          { grade: "D (0 Pkt)", points: 0, desc: "Verständnis durch massive Sprachfehler unmöglich." }
        ]
      }
    ],
    certifiedModelSolution: {
      text: "Liebe Anna,\\n\\nich habe mich riesig über deine E-Mail gefreut! Es ist einfach großartig, dass du mich bald besuchen möchtest.\\n\\nDie beste Zeit für deine Reise ist der späte Frühling oder der frühe Herbst, am besten im Mai oder September. Zu dieser Zeit ist das Wetter herrlich mild und angenehm warm. Im Hochsommer kann es hier nämlich tatsächlich sehr heiß werden, mit Temperaturen über 35 Grad. Wenn du im Mai kommst, musst du dir also überhaupt keine Sorgen wegen der Hitze machen!\\n\\nFür deine Reisevorbereitung solltest du bequeme Wanderschuhe und eine leichte Regenjacke einpacken, da wir viel zu Fuß unterwegs sein werden. Ein Visum brauchst du zum Glück nicht, dein gültiger Reisepass reicht völlig aus.\\n\\nIch habe schon tolle Pläne für uns: Wir werden historische Sehenswürdigkeiten besichtigen, die wunderschönen Naturparks erkunden und abends typische lokale Spezialitäten probieren.\\n\\nSag mir bitte bald Bescheid, wenn du deinen Flug buchst, damit ich dich vom Flughafen abholen kann!\\n\\nHerzliche Grüße,\\nDein(e) Freund(in)",
      wordCount: 156,
      score: 45,
      breakdown: "Aufgabenbewältigung: 15/15 (alle 4 Punkte perfekt integriert) | Kommunikative Gestaltung: 15/15 (logische Absätze, Konnektoren weil, dass, wenn, damit) | Formale Richtigkeit: 15/15 (fehlerfreie B1-Grammatik)."
    }
  },

  sprechen: {
    instructions: "Die Mündliche Prüfung wird als Paarprüfung mit zwei Teilnehmenden und zwei Prüfenden durchgeführt. Dauer: ca. 15 Minuten.",
    duration: "15 Minuten",
    points: 75,
    teil1: {
      title: "Teil 1: Einander kennenlernen (ca. 3 Minuten)",
      points: 15,
      prompts: [
        "Name",
        "Woher sie oder er kommt",
        "Wie sie oder er wohnt (Wohnung, Haus, Garten...)",
        "Familie",
        "Wo sie oder er Deutsch gelernt hat",
        "Was sie oder er macht (Beruf, Schule, Studium...)",
        "Sprachen (welche, wie lange, warum)"
      ],
      examinerQuestions: [
        "Wie verbringen Sie normalerweise Ihr Wochenende?",
        "Welche Hobbys machen Ihnen besonders viel Spaß?",
        "Seit wann wohnen Sie in dieser Stadt?"
      ]
    },
    teil2: {
      title: "Teil 2: Über ein Thema sprechen (ca. 5 Minuten)",
      points: 30,
      topic: "Gruppenreisen vs. Allein reisen",
      participantAOpinion: "\"Ich verreise gern in einer Gruppe. Allein reisen macht mir keinen Spaß. Bei Gruppenreisen lernt man viele neue Freunde kennen, die Reiseleiter organisieren alle Hotels und Busse, und man fühlt sich immer sicher.\"",
      participantBOpinion: "\"Wenn man mit einer Gruppe unterwegs ist, gibt es leider oft Streit und Hektik. Jeder will etwas anderes sehen. Ich reise viel lieber allein oder nur mit meiner besten Freundin, weil wir dann ganz flexibel entscheiden können, wann wir aufstehen und wohin wir gehen.\"",
      instructions: "Berichten Sie Ihrer Partnerin/Ihrem Partner kurz über die Meinung aus Ihrem Text. Tauschen Sie sich anschließend über das Thema aus: Sagen Sie Ihre persönliche Meinung und berichten Sie von eigenen Reiseerfahrungen."
    },
    teil3: {
      title: "Teil 3: Gemeinsam etwas planen (ca. 5 Minuten)",
      points: 30,
      scenario: "Sie haben zwei Wochen Urlaub in Deutschland gemacht und dabei nette Leute kennengelernt. Vor Ihrer Abreise möchten Sie zusammen eine schöne Abschiedsparty feiern. Planen Sie die Party gemeinsam.",
      planningPoints: [
        "Wann? (Wochentag und Uhrzeit)",
        "Wo? (Restaurant, Garten, Park oder zu Hause)",
        "Essen & Getränke (Wer kauft was, wer kocht oder bringt etwas mit?)",
        "Musik & Unterhaltung (Playlist, Spiele)",
        "Geschenke & Erinnerungen",
        "Wer übernimmt welche Aufgabe?"
      ],
      sampleDialogue: [
        {
          speaker: "Kandidat A",
          text: "Hallo Maria! Da unser Urlaub bald zu Ende ist, sollten wir unbedingt eine Abschiedsparty für unsere neuen Freunde veranstalten. Was hältst du von Samstagabend ab 18 Uhr?"
        },
        {
          speaker: "Kandidat B",
          text: "Das ist eine fantastische Idee! Samstagabend passt jedem gut. Wo wollen wir denn feiern? Wollen wir einen Tisch im Restaurant reservieren?"
        },
        {
          speaker: "Kandidat A",
          text: "Im Restaurant wird es vielleicht etwas laut und teuer. Wenn das Wetter gut ist, könnten wir im Park grillen, oder bei Regen zu mir in den Garten gehen. Was meinst du?"
        },
        {
          speaker: "Kandidat B",
          text: "Im Garten ist es viel gemütlicher! Und wie machen wir das mit dem Essen? Ich schlage vor, dass jeder Gast einen Salat oder Snack mitbringt."
        },
        {
          speaker: "Kandidat A",
          text: "Einverstanden! Ich kümmere mich um die Getränke und besorge das Grillfleisch. Kannst du dich um die Musik und eine Playlist kümmern?"
        },
        {
          speaker: "Kandidat B",
          text: "Sehr gerne! Ich erstelle eine schöne Playlist und bringe eine Bluetooth-Box mit. Wollen wir auch ein Gästebuch für Erinnerungsfotos vorbereiten?"
        },
        {
          speaker: "Kandidat A",
          text: "Ausgezeichnet! Das wird eine wunderbare Feier. Lass uns heute Abend die Einladungen per WhatsApp abschicken. Abgemacht!"
        }
      ]
    },
    evaluationCriteria: [
      { criterion: "1", name: "Ausdrucksfähigkeit (Wortschatz & Register)", pointsTeil1: 4, pointsTeil23: 8 },
      { criterion: "2", name: "Aufgabenbewältigung (Interaktion & Inhalt)", pointsTeil1: 4, pointsTeil23: 8 },
      { criterion: "3", name: "Formale Richtigkeit (Syntax & Morphologie)", pointsTeil1: 4, pointsTeil23: 8 },
      { criterion: "4", name: "Aussprache und Intonation", pointsTeil1: 3, pointsTeil23: 6 }
    ]
  }
};
'''

with open("src/data/telc_b1_mock_exam_data.ts", "w", encoding="utf-8") as f:
    assert "\u2014" not in TS_CONTENT, "Em dash found in mock exam data!"
    for forbidden in ["🍷", "🍸", "🍺", "🍻", "🥂", "🥃", "🍹", "🚬"]:
        assert forbidden not in TS_CONTENT, f"Forbidden emoji {forbidden} found!"
    f.write(TS_CONTENT)

print("Created src/data/telc_b1_mock_exam_data.ts successfully!")
