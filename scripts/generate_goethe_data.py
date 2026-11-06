#!/usr/bin/env python3
"""
Generates src/data/goethe_pruefungsordnung_data.ts
Official Goethe-Institut Prüfungsordnung (Stand 1. September 2025)
Strictly 0 em dashes (\u2014) and 0 forbidden emojis.
"""

TS_CONTENT = '''export interface GoetheRuleSection {
  sectionNumber: string;
  titleDe: string;
  titleEn: string;
  summary: string;
  bulletPoints: string[];
  examRelevance: string;
}

export interface GoetheVsTelcComparison {
  dimension: string;
  goetheB1: string;
  telcB1: string;
  dtz: string;
  winnerRecommendation: string;
}

export interface GoethePruefungsordnungData {
  meta: {
    title: string;
    stand: string;
    publisher: string;
    recognizedBy: string[];
    coreTakeaway: string;
  };
  modularB1System: {
    title: string;
    description: string;
    passBar: string;
    modules: {
      id: "LESEN" | "HOEREN" | "SCHREIBEN" | "SPRECHEN";
      name: string;
      duration: string;
      tasksSummary: string;
      maxPoints: number;
      passPoints: number;
      retakeRule: string;
    }[];
    gesamtzeugnisRule: string;
  };
  officialSections: GoetheRuleSection[];
  examComparison: GoetheVsTelcComparison[];
  examDayDoAndDont: {
    doList: string[];
    dontList: string[];
  };
}

export const GOETHE_PRUEFUNGSORDNUNG_DATA: GoethePruefungsordnungData = {
  meta: {
    title: "Prüfungsordnung des Goethe-Instituts e.V. (Exam Guidelines)",
    stand: "1. September 2025",
    publisher: "Goethe-Institut e.V., München",
    recognizedBy: [
      "ALTE (Association of Language Testers in Europe)",
      "BAMF (Bundesamt für Migration und Flüchtlinge)",
      "Auswärtiges Amt & Deutsche Botschaften weltweit",
      "Deutsche Hochschulen & Universitäten"
    ],
    coreTakeaway: "Goethe-Zertifikat B1 is fully modular: all 4 modules (Lesen, Hören, Schreiben, Sprechen) can be booked, taken, and retaken completely independently. Passing requires 60 points (60%) per module."
  },

  modularB1System: {
    title: "The 4-Module System of Goethe-Zertifikat B1 (§ 14.7 & § 15)",
    description: "Unlike non-modular exams where you must pass the entire test at once, Goethe-Zertifikat B1 evaluates each skill as a standalone certified module. Passed modules remain valid forever and can be combined into a single Gesamtzeugnis within one year.",
    passBar: "60 Punkte (60%) pro Modul erforderlich zum Bestehen.",
    modules: [
      {
        id: "LESEN",
        name: "Modul Lesen",
        duration: "65 Minuten",
        tasksSummary: "5 Teile, 30 Aufgaben: Blogbeiträge, Zeitungsartikel, Anzeigen zuordnen, Leserbriefe, Richtlinien & Hausordnungen.",
        maxPoints: 100,
        passPoints: 60,
        retakeRule: "Kann beliebig oft einzeln wiederholt werden, ohne dass andere Module verfallen."
      },
      {
        id: "HOEREN",
        name: "Modul Hören",
        duration: "40 Minuten",
        tasksSummary: "4 Teile, 30 Aufgaben: Durchsagen & Telefonansagen (2x), Museumsführung (1x), Alltagsgespräch (1x), Radiodiskussion (2x).",
        maxPoints: 100,
        passPoints: 60,
        retakeRule: "Kann beliebig oft einzeln wiederholt werden."
      },
      {
        id: "SCHREIBEN",
        name: "Modul Schreiben",
        duration: "60 Minuten",
        tasksSummary: "3 Aufgaben: Aufgabe 1: Informelle E-Mail (ca. 80 Wörter), Aufgabe 2: Diskussionsbeitrag im Online-Forum (ca. 80 Wörter), Aufgabe 3: Formliche Entschuldigung / Bitte (ca. 40 Wörter).",
        maxPoints: 100,
        passPoints: 60,
        retakeRule: "Kann beliebig oft einzeln wiederholt werden."
      },
      {
        id: "SPRECHEN",
        name: "Modul Sprechen",
        duration: "15 Minuten Paarprüfung (mit 15 Min. Vorbereitungszeit)",
        tasksSummary: "3 Teile: Teil 1: Gemeinsam etwas planen, Teil 2: Ein Thema präsentieren (Folienvortrag), Teil 3: Auf Fragen des Partners und Prüfers antworten.",
        maxPoints: 100,
        passPoints: 60,
        retakeRule: "Kann beliebig oft einzeln wiederholt werden."
      }
    ],
    gesamtzeugnisRule: "Werden alle 4 Module innerhalb eines Jahres (an Goethe-Instituten innerhalb der EU oder im gleichen Drittstaat) bestanden, wird auf Wunsch ein offizielles Gesamtzeugnis ausgestellt (§ 14.7.4)."
  },

  officialSections: [
    {
      sectionNumber: "§ 1 & § 2",
      titleDe: "Grundlagen & Prüfungszentren",
      titleEn: "General Principles & Examination Centres",
      summary: "Einheitliche Prüfungsdurchführung weltweit nach objektiven ALTE-Standards.",
      bulletPoints: [
        "Prüfungen finden weltweit an lizenzierten Goethe-Instituten, Goethe-Zentren und Prüfungskooperationspartnern statt.",
        "Prüfungen können papierbasiert in Präsenz, digital am PC im Prüfungszentrum oder online mit Proctoring abgelegt werden."
      ],
      examRelevance: "Alle Standorte bewerten nach exakt denselben Beurteilungskriterien."
    },
    {
      sectionNumber: "§ 9",
      titleDe: "Ausweispflicht",
      titleEn: "Obligation to show Identification",
      summary: "Zweifelsfreie Feststellung der Identität vor und während der Prüfung.",
      bulletPoints: [
        "Jeder Teilnehmende muss sich vor Beginn mit einem amtlichen, gültigen Lichtbildausweis (Reisepass, Personalausweis, Aufenthaltstitel) ausweisen.",
        "Ausweise werden bei der Anmeldung und vor jedem einzelnen Modul kontrolliert."
      ],
      examRelevance: "Ohne gültigen Original-Ausweis ist kein Prüfungsantritt möglich (Kopien werden nicht akzeptiert)."
    },
    {
      sectionNumber: "§ 11",
      titleDe: "Ausschluss & Täuschungshandlungen",
      titleEn: "Disqualification & Misconduct",
      summary: "Strenge Null-Toleranz-Politik bei Täuschungsversuchen und unerlaubten Hilfsmitteln.",
      bulletPoints: [
        "Unerlaubte Hilfsmittel: Smartphones, Smartwatches, Spickzettel, eigene Wörterbücher oder nicht genehmigtes Papier.",
        "Bereits das bloße Mitführen eines eingeschalteten Handys im Prüfungsraum führt zum sofortigen Prüfungsausschluss.",
        "Bei Täuschungsversuch gilt die gesamte Prüfung als nicht bestanden und es kann eine Sperrfrist von 3 Monaten bis zu 5 Jahren verhängt werden (§ 3.8)."
      ],
      examRelevance: "Alle elektronischen Geräte müssen vor Prüfungsbeginn komplett ausgeschaltet und abgegeben werden."
    },
    {
      sectionNumber: "§ 14 & § 15",
      titleDe: "Zertifikate, Bestehen & Wiederholung",
      titleEn: "Certificates, Passing & Resitting",
      summary: "Volle modulare Flexibilität für Goethe-Zertifikat B1.",
      bulletPoints: [
        "Bestehensgrenze: Mindestens 60 von 100 Punkten (60%) in jedem Modul.",
        "Jedes Modul erhält ein separates Einzelzeugnis mit Notenstufen (Sehr gut: 90-100, Gut: 80-89, Befriedigend: 70-79, Ausreichend: 60-69, Nicht bestanden: 0-59).",
        "Einzelne Module können beliebig oft wiederholt werden. Keine Wiederholungspflicht für bereits bestandene Module!",
        "Kombination zum Gesamtzeugnis innerhalb von 12 Monaten möglich."
      ],
      examRelevance: "Wenn Sie beispielsweise nur 'Hören' nicht bestehen, behalten Sie 'Lesen', 'Schreiben' und 'Sprechen' dauerhaft und wiederholen nur 'Hören'."
    },
    {
      sectionNumber: "Anhang",
      titleDe: "Digitale Deutschprüfungen",
      titleEn: "Digital German Examinations",
      summary: "Besondere Regelungen für computerbasierte Prüfungen am Prüfungszentrum.",
      bulletPoints: [
        "Lesen und Hören werden technisch automatisiert durch die Testplattform ausgewertet (Zero human grading errors).",
        "Schreiben wird durch zwei unabhängige, zertifizierte Goethe-Prüfende bewertet. Bei Notenabweichungen entscheidet ein dritter Prüfer (Drittbewertung).",
        "Im Modul Hören hören Sie die Texte über individuelle Kopfhörer mit eigener Lautstärkeregelung."
      ],
      examRelevance: "Digitale Prüfungen bieten oft schnellere Ergebnisbekanntgabe (meist innerhalb weniger Werktage)."
    }
  ],

  examComparison: [
    {
      dimension: "Prüfungsstruktur",
      goetheB1: "4 völlig unabhängige Module (Lesen, Hören, Schreiben, Sprechen)",
      telcB1: "Gepoolte Schriftliche Prüfung (225 Pkt) + Mündliche Prüfung (75 Pkt)",
      dtz: "Kombinierter Test A2/B1 mit Skalierungsbewertung",
      winnerRecommendation: "Goethe B1 bietet maximale Sicherheit, da Module einzeln gesichert werden können."
    },
    {
      dimension: "Wiederholungsregel",
      goetheB1: "Nur das nicht bestandene Modul wird wiederholt. Bereits bestandene Module bleiben dauerhaft gültig.",
      telcB1: "Wenn die schriftliche Prüfung nicht bestanden wird, müssen alle 3 Subtests (Lesen, Bausteine, Hören, Schreiben) wiederholt werden.",
      dtz: "Die gesamte Prüfung muss als Ganzes wiederholt werden.",
      winnerRecommendation: "Goethe B1 ist ideal für Kandidaten mit Schwächen in einer Einzelfähigkeit (z.B. Hören)."
    },
    {
      dimension: "Bestehensgrenze",
      goetheB1: "Exakt 60% (60/100 Pkt) in jedem gebuchten Modul",
      telcB1: "60% in der Schriftlichen (135/225 Pkt) UND 60% in der Mündlichen (45/75 Pkt)",
      dtz: "B1 in Sprechen (Pflicht) + B1 in Schreiben ODER Hören/Lesen",
      winnerRecommendation: "DTZ ist für Zuwanderer am leichtesten; telc erlaubt Punkteausgleich innerhalb der Schriftlichen."
    },
    {
      dimension: "Anerkennung in Deutschland",
      goetheB1: "100% weltweite Anerkennung bei Botschaften, Unis, Arbeitgebern und Behörden",
      telcB1: "100% bundesweit anerkannt für Einbürgerung, Niederlassung und Beruf",
      dtz: "Offizieller Integrationskurs-Abschluss für BAMF, Niederlassung und Pass",
      winnerRecommendation: "Alle drei Zertifikate werden von der Ausländerbehörde gleichwertig akzeptiert."
    }
  ],

  examDayDoAndDont: {
    doList: [
      "Bringen Sie Ihren gültigen amtlichen Original-Lichtbildausweis mit (§ 9).",
      "Seien Sie mindestens 30 Minuten vor Beginn am Prüfungszentrum.",
      "Nutzen Sie die 15-minütige Vorbereitungszeit im Sprechen, um Stichpunkte auf das Notizblatt zu schreiben.",
      "Füllen Sie bei Multiple-Choice immer eine Antwort aus: Es gibt keine Minuspunkte!",
      "Achten Sie im Schreiben auf alle Leitpunkte: Jeder ausgelassene Punkt kostet 3 bis 5 Wertungspunkte."
    ],
    dontList: [
      "Niemals das Smartphone eingeschaltet im Prüfungsraum lassen: führt zur Disqualifikation (§ 11).",
      "Keine eigenen Notizblätter oder Wörterbücher mitbringen: streng verboten.",
      "Im Sprechen nicht schweigen oder Monologe halten: Es wird lebendige Partnerschaftlichkeit bewertet.",
      "Nicht in Panik geraten, wenn ein Modul schwer fiel: Jedes Modul zählt für sich allein."
    ]
  }
};
'''

with open("src/data/goethe_pruefungsordnung_data.ts", "w", encoding="utf-8") as f:
    assert "\u2014" not in TS_CONTENT, "Em dash found in goethe data!"
    for forbidden in ["🍷", "🍸", "🍺", "🍻", "🥂", "🥃", "🍹", "🚬"]:
        assert forbidden not in TS_CONTENT, f"Forbidden emoji {forbidden} found!"
    f.write(TS_CONTENT)

print("Created src/data/goethe_pruefungsordnung_data.ts successfully!")

