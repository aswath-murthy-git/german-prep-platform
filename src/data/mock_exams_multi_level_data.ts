// Multi-Level Mock Exam Database: telc & Goethe (A1, A2, B1 - Sets 1 to 4)
// Strictly 0 em-dashes and 0 alcohol/smoking emojis

export type MockExamBoard = "TELC" | "GOETHE";
export type MockExamLevel = "A1" | "A2" | "B1";

export interface MockReadingQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: { key: string; text: string; isCorrect: boolean; explanation: string }[];
  points: number;
}

export interface MockReadingTeil {
  teilId: string;
  teilNumber: number;
  teilTitle: string;
  instructions: string;
  readingPassage: string;
  questions: MockReadingQuestion[];
  timeRecommendedMinutes: number;
}

export interface MockListeningQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  audioScript: string;
  speaker: string;
  options: { key: string; text: string; isCorrect: boolean; explanation: string }[];
  points: number;
}

export interface MockListeningTeil {
  teilId: string;
  teilNumber: number;
  teilTitle: string;
  instructions: string;
  questions: MockListeningQuestion[];
  timeRecommendedMinutes: number;
}

export interface FormularField {
  label: string;
  correctAnswer: string;
  userHint: string;
}

export interface MockWritingTask {
  taskId: string;
  taskTitle: string;
  prompt: string;
  situation: string;
  leitpunkte: string[];
  minWords: number;
  maxWords?: number;
  formularFields?: FormularField[];
  modelAnswer: string;
  points: number;
}

export interface MockSpeakingTask {
  taskId: string;
  teilNumber: number;
  taskTitle: string;
  prompt: string;
  cardsOrQuestions: string[];
  modelResponse: string;
  points: number;
}

export interface FullMockExamData {
  id: string;
  board: MockExamBoard;
  level: MockExamLevel;
  setNumber: number;
  title: string;
  officialStandard: string;
  durationMinutes: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
    total: number;
  };
  scoringRules: {
    readingMax: number;
    listeningMax: number;
    writingMax: number;
    speakingMax: number;
    totalMax: number;
    passPercentage: number;
    passPointsWritten?: number | null;
    passPointsOral?: number | null;
    passRuleDescription: string;
  };
  readingSections: MockReadingTeil[];
  listeningSections: MockListeningTeil[];
  writingTasks: MockWritingTask[];
  speakingTasks: MockSpeakingTask[];
}

export const ALL_MULTI_LEVEL_MOCK_EXAMS: FullMockExamData[] = [
  {
    "id": "telc_a1_set_1",
    "board": "TELC",
    "level": "A1",
    "setNumber": 1,
    "title": "telc Deutsch A1 - Mock Exam Set 1",
    "officialStandard": "telc Deutsch A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "telc_a1_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Liebe Maria,\nich lade dich herzlich zu meiner Geburtstagsparty am Samstag, 14. Oktober ein. Wir feiern ab 17 Uhr bei mir zu Hause in der Goethestraße 12. Bitte sag mir bis Donnerstag Bescheid, ob du kommen kannst. Bring bitte etwas zum Knabbern mit!\nLiebe Grüße,\nSarah",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Wann findet die Geburtstagsparty statt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Am Samstag, 14. Oktober ab 17 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'am Samstag, 14. Oktober... ab 17 Uhr'."
              },
              {
                "key": "b",
                "text": "Am Donnerstag um 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Donnerstag ist nur die Frist für die Rückmeldung."
              },
              {
                "key": "c",
                "text": "In einem Restaurant",
                "isCorrect": false,
                "explanation": "Falsch: Sie feiern bei Sarah zu Hause."
              }
            ]
          },
          {
            "id": "telc_a1_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Was soll Maria mitbringen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Etwas zum Knabbern",
                "isCorrect": true,
                "explanation": "Richtig: 'Bring bitte etwas zum Knabbern mit'."
              },
              {
                "key": "b",
                "text": "Ein teures Geschenk",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Einen neuen Fernseher",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_1_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Arztpraxis Dr. Bergmann: Liebe Patientinnen und Patienten, die Praxis bleibt am Freitag, den 20. Mai wegen Fortbildung geschlossen. In dringenden Fällen wenden Sie sich bitte an die Notfallpraxis im Stadtkrankenhaus (Telefon: 116 117). Ab Montag sind wir wieder erreichbar.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "telc_a1_set_1_rq3",
            "questionNumber": 3,
            "questionText": "Warum ist die Arztpraxis am Freitag geschlossen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Wegen einer Fortbildung des Teams",
                "isCorrect": true,
                "explanation": "Richtig: 'wegen Fortbildung geschlossen'."
              },
              {
                "key": "b",
                "text": "Weil der Arzt Urlaub am Strand macht",
                "isCorrect": false,
                "explanation": "Falsch: Nicht im Text genannt."
              },
              {
                "key": "c",
                "text": "Wegen Renovierungsarbeiten",
                "isCorrect": false,
                "explanation": "Falsch: Es ist eine Fortbildung."
              }
            ]
          },
          {
            "id": "telc_a1_set_1_rq4",
            "questionNumber": 4,
            "questionText": "Wohin können Patienten in Notfällen gehen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "In die Notfallpraxis im Stadtkrankenhaus",
                "isCorrect": true,
                "explanation": "Richtig: 'an die Notfallpraxis im Stadtkrankenhaus'."
              },
              {
                "key": "b",
                "text": "Zu keinem Arzt vor Montag",
                "isCorrect": false,
                "explanation": "Falsch: Die Notfallpraxis ist offen."
              },
              {
                "key": "c",
                "text": "Zur Polizei",
                "isCorrect": false,
                "explanation": "Falsch: Falsche Anlaufstelle."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_1_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Bäckerei Sonnenschein: Frische Brötchen und Brot! Öffnungszeiten: Mo-Fr 6:30 bis 18:30 Uhr, Sa 7:00 bis 13:00 Uhr. Sonntags geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_1_rq5",
            "questionNumber": 5,
            "questionText": "Kann man am Sonntag um 8 Uhr Brötchen kaufen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, sonntags ist die Bäckerei geschlossen",
                "isCorrect": true,
                "explanation": "Richtig: 'Sonntags geschlossen'."
              },
              {
                "key": "b",
                "text": "Ja, von 7 bis 13 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Das gilt nur samstags."
              },
              {
                "key": "c",
                "text": "Ja, aber nur bis 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Sonntags geschlossen."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a1_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Von welchem Gleis fährt der Zug nach Stuttgart ab?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Achtung an Gleis 2: Der Regionalexpress nach Stuttgart über Heidelberg, Abfahrt um 9 Uhr 25, fährt heute von Gleis 5 ab. Grund dafür ist eine Gleisänderung.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Von Gleis 5",
                "isCorrect": true,
                "explanation": "Richtig: Der Zug fährt heute von Gleis 5 ab."
              },
              {
                "key": "b",
                "text": "Von Gleis 2",
                "isCorrect": false,
                "explanation": "Falsch: Gleis 2 war das planmäßige Gleis."
              },
              {
                "key": "c",
                "text": "Von Gleis 9",
                "isCorrect": false,
                "explanation": "Falsch: 9 Uhr 25 war die Abfahrtszeit."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_1_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_1_lq2",
            "questionNumber": 2,
            "questionText": "Auf welche Uhrzeit wird der Termin verschoben?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag, hier spricht Frau Weber von der Zahnarztpraxis Dr. Schmidt. Herr Wagner, Ihr Termin morgen um 15 Uhr muss leider auf 16 Uhr 30 verschoben werden. Bitte rufen Sie kurz zurück.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Auf 16:30 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'auf 16 Uhr 30 verschoben'."
              },
              {
                "key": "b",
                "text": "Auf 15:00 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: 15 Uhr war der alte Termin."
              },
              {
                "key": "c",
                "text": "Auf 10:00 Uhr morgens",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a1_set_1_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten im Hotel Lindenhof ein Zimmer für zwei Nächte buchen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nich möchte ein Doppelzimmer vom 10. bis 12. Juli für zwei Personen reservieren. Wie viel kostet das Zimmer pro Nacht inklusive Frühstück? Bitte senden Sie mir eine Bestätigung per E-Mail.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a1_set_1_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a1_set_2",
    "board": "TELC",
    "level": "A1",
    "setNumber": 2,
    "title": "telc Deutsch A1 - Mock Exam Set 2",
    "officialStandard": "telc Deutsch A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "telc_a1_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Hallo David,\nwir wollen am Sonntag zusammen am Baggersee grillen. Das Wetter soll sehr sonnig und warm werden. Wir treffen uns um 13 Uhr am Parkplatz vor dem See. Bring bitte Grillwürstchen und etwas zu trinken mit!\nBis Sonntag,\nFelix",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Was haben Felix und David vor?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Sie wollen am Sonntag am See grillen",
                "isCorrect": true,
                "explanation": "Richtig: 'am Sonntag zusammen am Baggersee grillen'."
              },
              {
                "key": "b",
                "text": "Sie wollen im Restaurant frühstücken",
                "isCorrect": false,
                "explanation": "Falsch: Sie gehen grillen."
              },
              {
                "key": "c",
                "text": "Sie kaufen ein Auto am Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: Sie treffen sich dort zum Grillen."
              }
            ]
          },
          {
            "id": "telc_a1_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Wo ist der Treffpunkt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Am Parkplatz vor dem See",
                "isCorrect": true,
                "explanation": "Richtig: 'am Parkplatz vor dem See'."
              },
              {
                "key": "b",
                "text": "Am Hauptbahnhof",
                "isCorrect": false,
                "explanation": "Falsch: Falscher Treffpunkt."
              },
              {
                "key": "c",
                "text": "In Felix' Küche",
                "isCorrect": false,
                "explanation": "Falsch: Nicht im Text genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_2_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Supermarkt FrischeMarkt: Wegen Inventur schließt unsere Filiale am Samstag bereits um 16 Uhr statt um 20 Uhr. Ab Montag stehen wir Ihnen wieder zu den gewohnten Öffnungszeiten zur Verfügung.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "telc_a1_set_2_rq3",
            "questionNumber": 3,
            "questionText": "Wann schließt der Supermarkt am Samstag?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Bereits um 16:00 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'schließt... bereits um 16 Uhr'."
              },
              {
                "key": "b",
                "text": "Um 20:00 Uhr wie gewohnt",
                "isCorrect": false,
                "explanation": "Falsch: 20 Uhr war die normale Zeit."
              },
              {
                "key": "c",
                "text": "Der Markt öffnet gar nicht",
                "isCorrect": false,
                "explanation": "Falsch: Er ist bis 16 Uhr offen."
              }
            ]
          },
          {
            "id": "telc_a1_set_2_rq4",
            "questionNumber": 4,
            "questionText": "Was ist der Grund für die frühere Schließung?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Die jährliche Inventur",
                "isCorrect": true,
                "explanation": "Richtig: 'Wegen Inventur'."
              },
              {
                "key": "b",
                "text": "Feuer im Gebäude",
                "isCorrect": false,
                "explanation": "Falsch: Keine Panik."
              },
              {
                "key": "c",
                "text": "Streik der Mitarbeiter",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_2_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Fahrradreparatur RadFix: Reparaturannahme montags bis freitags von 8 bis 17 Uhr. Reifenwechsel ohne Voranmeldung in 30 Minuten möglich. Samstags geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_2_rq5",
            "questionNumber": 5,
            "questionText": "Muss man für einen Reifenwechsel vorher einen Termin buchen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, Reifenwechsel ist ohne Voranmeldung möglich",
                "isCorrect": true,
                "explanation": "Richtig: 'Reifenwechsel ohne Voranmeldung in 30 Minuten möglich'."
              },
              {
                "key": "b",
                "text": "Ja, mindestens zwei Wochen vorher",
                "isCorrect": false,
                "explanation": "Falsch: Ausdrücklich ohne Voranmeldung."
              },
              {
                "key": "c",
                "text": "Nur samstags nach Vereinbarung",
                "isCorrect": false,
                "explanation": "Falsch: Samstags ist geschlossen."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a1_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_2_lq1",
            "questionNumber": 1,
            "questionText": "An welchem Flugsteig findet das Einsteigen statt?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Sehr geehrte Fluggäste nach Wien: Flug LH 3482, geplant um 11 Uhr 15, ist nun zum Einsteigen an Flugsteig B 18 bereit. Bitte halten Sie Ihren Ausweis und Ihre Bordkarte bereit.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "An Flugsteig B 18",
                "isCorrect": true,
                "explanation": "Richtig: 'Flugsteig B 18'."
              },
              {
                "key": "b",
                "text": "An Flugsteig A 12",
                "isCorrect": false,
                "explanation": "Falsch: Falscher Flugsteig."
              },
              {
                "key": "c",
                "text": "An Flugsteig C 34",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_2_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_2_lq2",
            "questionNumber": 2,
            "questionText": "Wann kommt Florian voraussichtlich am Kino an?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Hallo Julia, hier ist Florian. Ich stehe leider im Stau auf der Autobahn. Ich schaffe es nicht um 18 Uhr ins Kino, sondern komme erst um 18 Uhr 45. Geh bitte schon rein und kauf die Karten!",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Um 18:45 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'komme erst um 18 Uhr 45'."
              },
              {
                "key": "b",
                "text": "Pünktlich um 18:00 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Er steht im Stau."
              },
              {
                "key": "c",
                "text": "Er kommt heute gar nicht mehr",
                "isCorrect": false,
                "explanation": "Falsch: Er kommt 45 Minuten später."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a1_set_2_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie können wegen einer Erkältung heute nicht zum Deutschkurs kommen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Liebe Frau Schneider,\n\nich kann heute leider nicht zum Deutschkurs kommen, weil ich stark erkältet bin und Husten habe. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Am Mittwoch bin ich wieder da.\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a1_set_2_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a1_set_3",
    "board": "TELC",
    "level": "A1",
    "setNumber": 3,
    "title": "telc Deutsch A1 - Mock Exam Set 3",
    "officialStandard": "telc Deutsch A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "telc_a1_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Guten Tag Herr Becker,\nIhre bestellte Winterjacke ist bei uns in der Filiale SportWelt eingetroffen. Sie können die Jacke innerhalb von 10 Werktagen an der Kasse abholen. Bitte bringen Sie Ihren Personalausweis und die Bestellnummer mit.\nMit freundlichen Grüßen,\nIhr SportWelt-Team",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Was teilt das Geschäft Herrn Becker mit?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Dass seine bestellte Jacke abholbereit ist",
                "isCorrect": true,
                "explanation": "Richtig: 'Ihre bestellte Winterjacke ist... eingetroffen'."
              },
              {
                "key": "b",
                "text": "Dass die Jacke leider ausverkauft ist",
                "isCorrect": false,
                "explanation": "Falsch: Die Jacke ist da."
              },
              {
                "key": "c",
                "text": "Dass er mehr Geld überweisen muss",
                "isCorrect": false,
                "explanation": "Falsch: Keine Zahlungsaufforderung."
              }
            ]
          },
          {
            "id": "telc_a1_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Was muss Herr Becker zur Abholung mitbringen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Personalausweis und Bestellnummer",
                "isCorrect": true,
                "explanation": "Richtig: 'bringen Sie Ihren Personalausweis und die Bestellnummer mit'."
              },
              {
                "key": "b",
                "text": "Nur Bargeld",
                "isCorrect": false,
                "explanation": "Falsch: Ausweis und Nummer sind verlangt."
              },
              {
                "key": "c",
                "text": "Ein Foto seiner alten Jacke",
                "isCorrect": false,
                "explanation": "Falsch: Völlig falsch."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_3_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Schwimmbad AquaFit: Wegen Reinigungsarbeiten im Hallenbad ist das Schwimmbecken vom 1. bis 5. September gesperrt. Die Sauna und der Fitnessbereich sind wie gewohnt täglich ab 9 Uhr geöffnet.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "telc_a1_set_3_rq3",
            "questionNumber": 3,
            "questionText": "Was ist vom 1. bis 5. September gesperrt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Das Schwimmbecken im Hallenbad",
                "isCorrect": true,
                "explanation": "Richtig: 'ist das Schwimmbecken... gesperrt'."
              },
              {
                "key": "b",
                "text": "Die gesamte Anlage inklusive Sauna",
                "isCorrect": false,
                "explanation": "Falsch: Sauna ist geöffnet."
              },
              {
                "key": "c",
                "text": "Nur der Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: Nicht der Parkplatz."
              }
            ]
          },
          {
            "id": "telc_a1_set_3_rq4",
            "questionNumber": 4,
            "questionText": "Dürfen Gäste die Sauna benutzen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ja, die Sauna ist wie gewohnt geöffnet",
                "isCorrect": true,
                "explanation": "Richtig: 'Sauna und Fitnessbereich sind wie gewohnt... geöffnet'."
              },
              {
                "key": "b",
                "text": "Nein, die Sauna wird auch gereinigt",
                "isCorrect": false,
                "explanation": "Falsch: Sauna bleibt offen."
              },
              {
                "key": "c",
                "text": "Nur nach 22 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Ab 9 Uhr morgens."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_3_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Museum für Kunst: Eintritt frei für Kinder und Jugendliche unter 18 Jahren. Erwachsene zahlen 8 Euro. Montags ist das Museum geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_3_rq5",
            "questionNumber": 5,
            "questionText": "Muss ein 15-jähriger Schüler Eintritt bezahlen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, der Eintritt ist für ihn frei",
                "isCorrect": true,
                "explanation": "Richtig: 'Eintritt frei für Kinder und Jugendliche unter 18 Jahren'."
              },
              {
                "key": "b",
                "text": "Ja, er zahlt den vollen Preis von 8 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Unter 18 ist frei."
              },
              {
                "key": "c",
                "text": "Er zahlt 4 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Keine halbe Gebühr."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a1_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_3_lq1",
            "questionNumber": 1,
            "questionText": "Wo kann der verlorene Schlüsselbund abgeholt werden?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Kundendurchsage im Kaufhaus Galeria: Sehr geehrte Kundinnen und Kunden, wir haben in der Damenabteilung im ersten Stock einen schwarzen Schlüsselbund gefunden. Der Besitzer kann die Schlüssel an der Hauptkasse im Erdgeschoss abholen.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "An der Hauptkasse im Erdgeschoss",
                "isCorrect": true,
                "explanation": "Richtig: 'an der Hauptkasse im Erdgeschoss'."
              },
              {
                "key": "b",
                "text": "Im dritten Stock bei den Möbeln",
                "isCorrect": false,
                "explanation": "Falsch: Falsches Stockwerk."
              },
              {
                "key": "c",
                "text": "Draußen auf dem Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: An der Hauptkasse."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_3_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_3_lq2",
            "questionNumber": 2,
            "questionText": "Warum kommt der Handwerker zu Frau Meyer?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag Frau Meyer, hier spricht Herr Schulz von der Wohnungsverwaltung. Wir schicken morgen um 11 Uhr den Elektriker zu Ihnen, um den Herd anzuschließen. Bitte seien Sie zu Hause.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Um den Küchenherd anzuschließen",
                "isCorrect": true,
                "explanation": "Richtig: 'um den Herd anzuschließen'."
              },
              {
                "key": "b",
                "text": "Um die Fenster zu putzen",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Elektriker für den Herd."
              },
              {
                "key": "c",
                "text": "Um die Miete abzuholen",
                "isCorrect": false,
                "explanation": "Falsch: Handwerker schließt Herd an."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a1_set_3_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten sich für einen Tanzkurs für Anfänger anmelden.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Guten Tag,\n\nich möchte mich für den Salsa-Tanzkurs für Anfänger im November anmelden. Wann genau beginnt der Kurs und wie viel kostet die Teilnahme? Bitte senden Sie mir das Anmeldeformular.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a1_set_3_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a1_set_4",
    "board": "TELC",
    "level": "A1",
    "setNumber": 4,
    "title": "telc Deutsch A1 - Mock Exam Set 4",
    "officialStandard": "telc Deutsch A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "telc_a1_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Lieber Alex,\nich kann am Freitag leider nicht zum gemeinsamen Kochen kommen. Mein Chef hat mich gebeten, bis 20 Uhr im Büro zu bleiben, weil wir ein wichtiges Projekt fertigstellen müssen. Wie wäre es, wenn wir uns stattdessen am Samstag zum Mittagessen treffen?\nHerzliche Grüße,\nJan",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Warum sagt Jan das Kochen am Freitag ab?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Weil er wegen eines Projekts länger im Büro arbeiten muss",
                "isCorrect": true,
                "explanation": "Richtig: 'muss bis 20 Uhr im Büro bleiben'."
              },
              {
                "key": "b",
                "text": "Weil er krank im Bett liegt",
                "isCorrect": false,
                "explanation": "Falsch: Er arbeitet länger."
              },
              {
                "key": "c",
                "text": "Weil er kein Geld für Lebensmittel hat",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              }
            ]
          },
          {
            "id": "telc_a1_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Was schlägt Jan als Ausweichtermin vor?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ein gemeinsames Mittagessen am Samstag",
                "isCorrect": true,
                "explanation": "Richtig: 'am Samstag zum Mittagessen treffen'."
              },
              {
                "key": "b",
                "text": "Ein Frühstück am nächsten Montag",
                "isCorrect": false,
                "explanation": "Falsch: Er schlägt Samstag vor."
              },
              {
                "key": "c",
                "text": "Gar kein Treffen mehr",
                "isCorrect": false,
                "explanation": "Falsch: Er macht einen Gegenvorschlag."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_4_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Stadtwerke Info: Wegen Reparaturarbeiten an der Hauptwasserleitung wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser in der Neustadt abgestellt. Bitte sorgen Sie rechtzeitig für einen Wasservorrat.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "telc_a1_set_4_rq3",
            "questionNumber": 3,
            "questionText": "Was passiert am Mittwoch in der Neustadt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Das Trinkwasser wird von 9 bis 13 Uhr abgestellt",
                "isCorrect": true,
                "explanation": "Richtig: 'wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser... abgestellt'."
              },
              {
                "key": "b",
                "text": "Der Strom wird für zwei Tage abgeschaltet",
                "isCorrect": false,
                "explanation": "Falsch: Es betrifft das Wasser."
              },
              {
                "key": "c",
                "text": "Die Straßen werden asphaltiert",
                "isCorrect": false,
                "explanation": "Falsch: Reparatur an der Wasserleitung."
              }
            ]
          },
          {
            "id": "telc_a1_set_4_rq4",
            "questionNumber": 4,
            "questionText": "Was sollen die Anwohner tun?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Rechtzeitig Wasser auf Vorrat bereithalten",
                "isCorrect": true,
                "explanation": "Richtig: 'sorgen Sie rechtzeitig für einen Wasservorrat'."
              },
              {
                "key": "b",
                "text": "Ihre Wohnungen verlassen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht nötig."
              },
              {
                "key": "c",
                "text": "Die Stadtwerke verklagen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_4_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Tierpark Schönbrunn: Hunde sind im gesamten Parkgelände an der kurzen Leine zu führen. Das Füttern der Tiere ist verboten.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "telc_a1_set_4_rq5",
            "questionNumber": 5,
            "questionText": "Dürfen Besucher eigene Hunde in den Tierpark mitnehmen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ja, aber Hunde müssen an der kurzen Leine geführt werden",
                "isCorrect": true,
                "explanation": "Richtig: 'an der kurzen Leine zu führen'."
              },
              {
                "key": "b",
                "text": "Nein, Hunde sind strengstens verboten",
                "isCorrect": false,
                "explanation": "Falsch: Sie dürfen angeleint mitkommen."
              },
              {
                "key": "c",
                "text": "Ja, Hunde dürfen frei herumlaufen",
                "isCorrect": false,
                "explanation": "Falsch: Nur an der kurzen Leine."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a1_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_4_lq1",
            "questionNumber": 1,
            "questionText": "In welchem Wagen befindet sich das Bordbistro?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Durchsage im ICE 612: Sehr geehrte Fahrgäste, unser Bordbistro im Wagen 8 ist ab sofort geöffnet. Wir bieten Ihnen heute warme Suppen, frische Snacks und kalte Getränke an. Guten Appetit!",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "In Wagen 8",
                "isCorrect": true,
                "explanation": "Richtig: 'Bordbistro im Wagen 8'."
              },
              {
                "key": "b",
                "text": "In Wagen 2",
                "isCorrect": false,
                "explanation": "Falsch: Falsche Wagennummer."
              },
              {
                "key": "c",
                "text": "In Wagen 14",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_a1_set_4_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "telc_a1_set_4_lq2",
            "questionNumber": 2,
            "questionText": "Welches Medium kann Herr Fischer abholen?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag Herr Fischer, hier spricht die Stadtbücherei. Ihr vorbestelltes Buch über Gartenbau ist jetzt eingetroffen. Sie können es bis Ende nächster Woche an der Ausleihtheke abholen.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Ein vorbestelltes Buch über Gartenbau",
                "isCorrect": true,
                "explanation": "Richtig: 'vorbestelltes Buch über Gartenbau'."
              },
              {
                "key": "b",
                "text": "Eine DVD über Autos",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Buch über Gartenbau."
              },
              {
                "key": "c",
                "text": "Einen Bibliotheksausweis für seine Tochter",
                "isCorrect": false,
                "explanation": "Falsch: Ein vorbestelltes Buch."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a1_set_4_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten Ihren Nachbarn bitten, Ihre Pflanzen während Ihres Urlaubs zu gießen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Lieber Herr Müller,\n\nich fahre vom 15. bis 22. August in den Urlaub. Könnten Sie bitte in dieser Zeit zweimal meine Balkonpflanzen gießen? Ich gebe Ihnen gerne den Wohnungsschlüssel heute Abend vorbei. Vielen Dank für Ihre Hilfe!\n\nHerzliche Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a1_set_4_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a2_set_1",
    "board": "TELC",
    "level": "A2",
    "setNumber": 1,
    "title": "telc Deutsch A2 - Mock Exam Set 1",
    "officialStandard": "telc Deutsch A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "telc_a2_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Umzug & Wohnen)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Umzug & Wohnen'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "telc_a2_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a2_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Fahrradstadt & Mobilität)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Fahrradstadt & Mobilität' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Fahrradstadt & Mobilität'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a2_set_1_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Nachbarschaftsfest & Grillen)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Nachbarschaftsfest & Grillen' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Nachbarschaftsfest & Grillen' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Nachbarschaftsfest & Grillen' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a2_set_1_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Homeoffice & Arbeitsalltag)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Homeoffice & Arbeitsalltag'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Homeoffice & Arbeitsalltag' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a2_set_2",
    "board": "TELC",
    "level": "A2",
    "setNumber": 2,
    "title": "telc Deutsch A2 - Mock Exam Set 2",
    "officialStandard": "telc Deutsch A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "telc_a2_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Fitness & Gesundheit)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Fitness & Gesundheit'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "telc_a2_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a2_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Urlaub & Reisen an die Ostsee)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_2_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Urlaub & Reisen an die Ostsee' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Urlaub & Reisen an die Ostsee'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a2_set_2_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Sprachkurs & Tandempartner)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Sprachkurs & Tandempartner' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Sprachkurs & Tandempartner' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Sprachkurs & Tandempartner' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a2_set_2_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Haustiere im Mietshaus)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Haustiere im Mietshaus'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Haustiere im Mietshaus' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a2_set_3",
    "board": "TELC",
    "level": "A2",
    "setNumber": 3,
    "title": "telc Deutsch A2 - Mock Exam Set 3",
    "officialStandard": "telc Deutsch A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "telc_a2_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Wochenmarkt & Bio-Essen)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Wochenmarkt & Bio-Essen'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "telc_a2_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a2_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Öffentlicher Nahverkehr & Tram)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_3_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Öffentlicher Nahverkehr & Tram' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Öffentlicher Nahverkehr & Tram'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a2_set_3_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Reparatur & Handwerker)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Reparatur & Handwerker' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Reparatur & Handwerker' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Reparatur & Handwerker' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a2_set_3_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Kino & Kulturabend)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Kino & Kulturabend'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Kino & Kulturabend' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_a2_set_4",
    "board": "TELC",
    "level": "A2",
    "setNumber": 4,
    "title": "telc Deutsch A2 - Mock Exam Set 4",
    "officialStandard": "telc Deutsch A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "telc_a2_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Ehrenamt & Tierheim)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Ehrenamt & Tierheim'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "telc_a2_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_a2_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Kompaktkurs & Weiterbildung)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_a2_set_4_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Kompaktkurs & Weiterbildung' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Kompaktkurs & Weiterbildung'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_a2_set_4_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Sportverein & Laufen)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Sportverein & Laufen' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Sportverein & Laufen' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Sportverein & Laufen' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_a2_set_4_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Wohnungssuche & Kaution)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Wohnungssuche & Kaution'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Wohnungssuche & Kaution' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "telc_b1_set_1",
    "board": "TELC",
    "level": "B1",
    "setNumber": 1,
    "title": "telc Deutsch B1 - Mock Exam Set 1",
    "officialStandard": "telc Deutsch B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 30,
      "speaking": 15,
      "total": 150
    },
    "scoringRules": {
      "readingMax": 75,
      "listeningMax": 75,
      "writingMax": 45,
      "speakingMax": 75,
      "totalMax": 300,
      "passPercentage": 60,
      "passPointsWritten": 135,
      "passPointsOral": 45,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "telc_b1_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Leben ohne eigenes Auto in der Großstadt)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Julia (29): 'Seit sechs Monaten besitze ich kein Auto mehr. Stattdessen fahre ich täglich mit dem E-Bike und nutze für längere Strecken die Bahn oder Carsharing. Ich spare jeden Monat rund 300 Euro für Benzin, Versicherung und Reparaturen. Zudem entfällt der tägliche Parkplatzstress.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Warum ist Julia mit ihrer Entscheidung zufrieden?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie spart monatlich Geld und hat keinen Parkplatzstress mehr",
                "isCorrect": true,
                "explanation": "Richtig: 'spare jeden Monat rund 300 Euro... entfällt der tägliche Parkplatzstress'."
              },
              {
                "key": "b",
                "text": "Sie fährt jetzt nur noch mit dem Taxi",
                "isCorrect": false,
                "explanation": "Falsch: Sie nutzt E-Bike, Bahn und Carsharing."
              },
              {
                "key": "c",
                "text": "Sie möchte sofort wieder ein Auto kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Sie ist vollkommen zufrieden."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_b1_set_1_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Die 4-Tage-Woche im Praxistest)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Immer mehr Betriebe in Deutschland erproben die 4-Tage-Woche bei vollem Lohnausgleich. Auswertungen zeigen: Die Fehlzeiten wegen Krankheit sanken im Durchschnitt um 25 Prozent, während die Mitarbeiterzufriedenheit sprunghaft anstieg. Kritiker aus der Industrie befürchten allerdings Produktivitätsverluste im globalen Wettbewerb.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "telc_b1_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Welches Ergebnis zeigt der Praxistest?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Signifikant weniger Krankheitstage und höhere Zufriedenheit",
                "isCorrect": true,
                "explanation": "Richtig: 'sanken im Durchschnitt um 25 Prozent... Zufriedenheit sprunghaft anstieg'."
              },
              {
                "key": "b",
                "text": "Alle Mitarbeiter haben gekündigt",
                "isCorrect": false,
                "explanation": "Falsch: Zufriedenheit ist gestiegen."
              },
              {
                "key": "c",
                "text": "Die Gehälter wurden um ein Viertel gekürzt",
                "isCorrect": false,
                "explanation": "Falsch: Voller Lohnausgleich."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_b1_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Bahnhofsdurchsage ICE 892)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Welche Alternative wird für Reisende nach Hannover empfohlen?",
            "speaker": "Bahnhofsdurchsage ICE 892",
            "audioScript": "Achtung an Gleis 7: Der ICE 892 nach Hamburg über Hannover, planmäßige Abfahrt um 17 Uhr 18, hat heute ca. 35 Minuten Verspätung wegen einer Reparatur an der Oberleitung. Reisende nach Hannover können alternativ den Regionalexpress auf Gleis 4 nutzen.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Den Regionalexpress auf Gleis 4 zu nehmen",
                "isCorrect": true,
                "explanation": "Richtig: 'alternativ den Regionalexpress auf Gleis 4 nutzen'."
              },
              {
                "key": "b",
                "text": "Bis morgen früh zu warten",
                "isCorrect": false,
                "explanation": "Falsch: Es gibt die Regionalverbindung."
              },
              {
                "key": "c",
                "text": "Ein Taxi auf eigene Kosten zu buchen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht in der Durchsage genannt."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_b1_set_1_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Schaden in der Mietwohnung (Wasserschaden & Heizung))",
        "prompt": "Schreiben Sie eine formelle Beschwerde-E-Mail an Ihren Vermieter Herrn Schneider (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Schaden in der Mietwohnung (Wasserschaden & Heizung)'.",
        "leitpunkte": [
          "Grund des Schreibens (Heizungsausfall und feuchte Wand)",
          "Bereits entstandene Unannehmlichkeiten",
          "Frist für die Reparatur bis Freitag",
          "Ankündigung von Mietminderung bei Nichthandeln"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 45,
        "modelAnswer": "Sehr geehrter Herr Schneider,\n\nich wende mich an Sie, weil in meiner Wohnung im zweiten Stock seit gestern die Heizung im Wohnzimmer komplett ausgefallen ist. Zudem habe ich bemerkt, dass die Wand unter dem Fenster feucht ist und sich bereits dunkle Flecken bilden.\n\nDa die Temperaturen draußen sehr niedrig sind, kühlt die Wohnung stark aus. Ich bitte Sie daher dringend, bis spätestens Freitag einen Handwerker zur Begutachtung und Behebung des Schadens zu beauftragen. Sollte der Mangel bis zu diesem Zeitpunkt nicht beseitigt werden, sehe ich mich gezwungen, die Miete für diesen Monat angemessen zu mindern.\n\nIch bitte um Ihre zeitnahe schriftliche Bestätigung des Termins.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_b1_set_1_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollten Haustiere in Mietwohnungen generell erlaubt sein?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollten Haustiere in Mietwohnungen generell erlaubt sein?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner Präsentation lautet: 'Haustiere in Mietwohnungen'. Ich habe dieses Thema gewählt, weil viele Menschen gerne einen Hund oder eine Katze halten möchten. In meiner persönlichen Erfahrung in Deutschland habe ich erlebt, dass Tiere viel Lebensfreude bringen, aber manchmal auch Lärm machen können. In meinem Heimatland gibt es selten strenge Regeln in Mietverträgen, jeder entscheidet selbst. Ein großer Vorteil von Haustieren ist die emotionale Unterstützung und die Bewegung an der frischen Luft. Ein Nachteil können jedoch Beschwerden von Nachbarn wegen Bellen oder Allergien sein. Zusammenfassend bin ich der Ansicht, dass Haustiere erlaubt sein sollten, solange sie gut erzogen sind und die Nachbarn nicht stören. Vielen Dank fürs Zuhören.",
        "points": 75
      }
    ]
  },
  {
    "id": "telc_b1_set_2",
    "board": "TELC",
    "level": "B1",
    "setNumber": 2,
    "title": "telc Deutsch B1 - Mock Exam Set 2",
    "officialStandard": "telc Deutsch B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 30,
      "speaking": 15,
      "total": 150
    },
    "scoringRules": {
      "readingMax": 75,
      "listeningMax": 75,
      "writingMax": 45,
      "speakingMax": 75,
      "totalMax": 300,
      "passPercentage": 60,
      "passPointsWritten": 135,
      "passPointsOral": 45,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "telc_b1_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Ausbildung oder Studium? Mein Weg ins Handwerk)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Marcel (24): 'Nach dem Abitur wollten meine Eltern, dass ich BWL studiere. Nach zwei Semestern an der Universität habe ich mich jedoch für eine Ausbildung zum Mechatroniker entschieden. Heute verdiene ich mein eigenes Gehalt, habe geregelte Arbeitszeiten und sehe jeden Tag das konkrete Ergebnis meiner Arbeit.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Warum hat Marcel sein Studium abgebrochen?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Weil er lieber praktisch im Handwerk arbeiten und eigenes Geld verdienen wollte",
                "isCorrect": true,
                "explanation": "Richtig: 'für eine Ausbildung zum Mechatroniker entschieden... sehe konkretes Ergebnis'."
              },
              {
                "key": "b",
                "text": "Weil er alle Prüfungen nicht bestanden hat",
                "isCorrect": false,
                "explanation": "Falsch: Er entschied sich bewusst für das Handwerk."
              },
              {
                "key": "c",
                "text": "Weil seine Eltern es ihm verboten haben",
                "isCorrect": false,
                "explanation": "Falsch: Seine Eltern wollten, dass er studiert."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_b1_set_2_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Solarenergie auf Balkonen: Der Boom der Balkonkraftwerke)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Kleine steckerfertige Solaranlagen für den Balkon erleben in Deutschland einen historischen Boom. Über eine halbe Million Haushalte erzeugen inzwischen ihren eigenen Ökostrom direkt am Balkongeländer. Das spart pro Jahr rund 100 bis 200 Euro Stromkosten. Durch den Abbau bürokratischer Hürden ist die Anmeldung beim Netzbetreiber nun in wenigen Minuten online erledigt.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "telc_b1_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Was ist der Hauptvorteil von Balkonkraftwerken?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie erzeugen Ökostrom und senken die jährlichen Stromkosten um 100 bis 200 Euro",
                "isCorrect": true,
                "explanation": "Richtig: 'spart pro Jahr rund 100 bis 200 Euro Stromkosten'."
              },
              {
                "key": "b",
                "text": "Sie ersetzen alle Großkraftwerke sofort",
                "isCorrect": false,
                "explanation": "Falsch: Es sind kleine Zusatzanlagen."
              },
              {
                "key": "c",
                "text": "Man muss dafür ein ganzes Haus kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Sie sind für Balkone in Mietwohnungen gedacht."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_b1_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Radio-Kulturnachrichten)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_2_lq1",
            "questionNumber": 1,
            "questionText": "Was kostet der Eintritt am kommenden Sonntag?",
            "speaker": "Radio-Kulturnachrichten",
            "audioScript": "Zum Tag der offenen Denkmale öffnen am kommenden Sonntag über 500 historische Gebäude und Museen in unserer Region ihre Türen bei freiem Eintritt. Besondere Highlights sind geführte Touren im alten Wasserturm und die Lichtinstallation im Schlossgarten ab 20 Uhr.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Der Eintritt ist in allen teilnehmenden Gebäuden frei",
                "isCorrect": true,
                "explanation": "Richtig: 'öffnen... ihre Türen bei freiem Eintritt'."
              },
              {
                "key": "b",
                "text": "Erwachsene zahlen 15 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Eintritt ist frei."
              },
              {
                "key": "c",
                "text": "Nur der Schlossgarten ist kostenlos",
                "isCorrect": false,
                "explanation": "Falsch: Über 500 Gebäude sind frei."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_b1_set_2_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Urlaubsantrag und Arbeitsübergabe)",
        "prompt": "Schreiben Sie eine E-Mail an Ihre Vorgesetzte Frau Dr. Klein (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Urlaubsantrag und Arbeitsübergabe'.",
        "leitpunkte": [
          "Zeitraum des gewünschten Sommerurlaubs",
          "Begründung für die Terminauswahl",
          "Regelung der Vertretung durch Kollegen",
          "Erreichbarkeit in dringenden Notfällen"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 45,
        "modelAnswer": "Sehr geehrte Frau Dr. Klein,\n\nich möchte hiermit meinen Sommerurlaub für den Zeitraum vom 1. bis 19. August beantragen. Ich habe diesen Termin gewählt, weil meine Familie in dieser Zeit Schulferien hat und wir eine gemeinsame Reise geplant haben.\n\nIch habe mich bereits mit meinem Kollegen Herrn Meyer abgestimmt. Er wird meine laufenden Projekte während meiner Abwesenheit betreuen und meine E-Mails im Blick behalten. Alle dringenden Aufgaben werde ich vor meinem Urlaub abschließen. In dringenden Notfällen bin ich per E-Mail erreichbar.\n\nIch freue mich über Ihre Genehmigung des Urlaubsantrags.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_b1_set_2_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollten Geschäfte in Deutschland auch sonntags öffnen dürfen?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollten Geschäfte in Deutschland auch sonntags öffnen dürfen?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner heutigen Präsentation ist: 'Sonntagsöffnung von Geschäften'. Ich habe dieses Thema gewählt, weil die Ladenöffnungszeiten am Wochenende immer wieder lebhaft diskutiert werden. In meiner persönlichen Erfahrung ist der ruhige Sonntag in Deutschland sehr angenehm, um mit der Familie Zeit zu verbringen. In meinem Heimatland haben die meisten Einkaufszentren sieben Tage die Woche rund um die Uhr geöffnet. Ein großer Vorteil einer Sonntagsöffnung wäre die höhere Flexibilität für Berufstätige, die unter der Woche wenig Zeit haben. Ein wesentlicher Nachteil ist jedoch die Belastung für die Verkäuferinnen und Verkäufer, die dann am Wochenende arbeiten müssten. Meiner Meinung nach sollte der Sonntag als gemeinsamer Ruhetag für Familien geschützt bleiben, mit wenigen Ausnahmen im Jahr. Herzlichen Dank für Ihre Aufmerksamkeit.",
        "points": 75
      }
    ]
  },
  {
    "id": "telc_b1_set_3",
    "board": "TELC",
    "level": "B1",
    "setNumber": 3,
    "title": "telc Deutsch B1 - Mock Exam Set 3",
    "officialStandard": "telc Deutsch B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 30,
      "speaking": 15,
      "total": 150
    },
    "scoringRules": {
      "readingMax": 75,
      "listeningMax": 75,
      "writingMax": 45,
      "speakingMax": 75,
      "totalMax": 300,
      "passPercentage": 60,
      "passPointsWritten": 135,
      "passPointsOral": 45,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "telc_b1_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Nachhaltiges Reisen: Mit dem Nachtzug durch Europa)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Markus (31): 'Für meinen Urlaub in Wien und Rom habe ich auf Flüge verzichtet und stattdessen den Nachtzug gebucht. Im Schlafwagen bin ich am Abend in Berlin eingestiegen und am nächsten Morgen entspannt im Zentrum von Wien aufgewacht. Die Fahrt war umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Welchen Vorteil des Nachtzugs hebt Markus hervor?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Klimafreundliches Reisen und gesparte Hotelübernachtungen",
                "isCorrect": true,
                "explanation": "Richtig: 'umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart'."
              },
              {
                "key": "b",
                "text": "Dass der Zug schneller als ein Flugzeug fliegt",
                "isCorrect": false,
                "explanation": "Falsch: Ein Zug fliegt nicht."
              },
              {
                "key": "c",
                "text": "Dass die Fahrt völlig kostenlos war",
                "isCorrect": false,
                "explanation": "Falsch: Nicht kostenlos."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_b1_set_3_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Pflegeberufe: Neue Chancen durch Digitalisierung)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "In deutschen Seniorenresidenzen und Krankenhäusern kommen zunehmend digitale Pflegedokumentationen und Sprachassistenten zum Einsatz. Pflegekräfte sparen dadurch bis zu 90 Minuten Dokumentationszeit pro Schicht. Diese gewonnene Zeit kommt direkt der menschlichen Zuwendung und Fürsorge für die Patienten zugute.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "telc_b1_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Wie hilft die Digitalisierung den Pflegekräften?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie spart bis zu 90 Minuten Schreibarbeit für mehr Zeit mit Patienten",
                "isCorrect": true,
                "explanation": "Richtig: 'sparen dadurch bis zu 90 Minuten Dokumentationszeit... kommt Zuwendung zugute'."
              },
              {
                "key": "b",
                "text": "Sie ersetzt alle Krankenschwestern durch Roboter",
                "isCorrect": false,
                "explanation": "Falsch: Pflegekräfte bleiben unersetzlich."
              },
              {
                "key": "c",
                "text": "Sie schließt die Krankenhäuser am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_b1_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Telefonische Kursberatung Volkshochschule)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_3_lq1",
            "questionNumber": 1,
            "questionText": "An welchen Wochentagen findet der Sprachkurs statt?",
            "speaker": "Telefonische Kursberatung Volkshochschule",
            "audioScript": "Guten Tag, Sie interessieren sich für unseren B1-Abendkurs für Deutsch als Fremdsprache. Der Kurs findet dienstags und donnerstags von 18 bis 20 Uhr 15 statt. Der nächste Einstiegstermin ist der 15. Oktober. Ein kostenloser Einstufungstest kann vorab online auf unserer Website absolviert werden.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Dienstags und donnerstags von 18:00 bis 20:15 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'dienstags und donnerstags von 18 bis 20 Uhr 15'."
              },
              {
                "key": "b",
                "text": "Nur samstags ganztägig",
                "isCorrect": false,
                "explanation": "Falsch: Dienstags und donnerstags."
              },
              {
                "key": "c",
                "text": "Täglich von 8 bis 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Abendkurs."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_b1_set_3_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Reklamation eines fehlerhaften Online-Kaufs)",
        "prompt": "Schreiben Sie eine Reklamations-E-Mail an den Kundenservice der Firma ElektroVersand (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Reklamation eines fehlerhaften Online-Kaufs'.",
        "leitpunkte": [
          "Bestellnummer und gelieferter Artikel (Kaffeemaschine)",
          "Beschreibung des Defekts (Gerät heizt nicht)",
          "Forderung nach Ersatzlieferung oder Gelderstattung",
          "Rücksendung des defekten Geräts"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 45,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nam 12. September habe ich in Ihrem Online-Shop eine Kaffeemaschine (Bestellnummer: EV-83921) bestellt. Die Lieferung traf gestern bei mir ein.\n\nLeider musste ich nach dem Auspacken feststellen, dass das Gerät defekt ist. Wenn man die Maschine einschaltet, läuft zwar die Pumpe, aber das Wasser wird überhaupt nicht warm. Ich bitte Sie daher höflich, mir umgehend ein funktionierendes Ersatzgerät zuzusenden oder mir den Kaufpreis auf mein Bankkonto zu erstatten.\n\nBitte senden Sie mir ein kostenloses Rücksendeetikett per E-Mail zu, damit ich das defekte Gerät an Sie zurückschicken kann.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_b1_set_3_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Brauchen Kinder und Jugendliche eigene Smartphones?)",
        "prompt": "Präsentieren Sie das Thema: 'Brauchen Kinder und Jugendliche eigene Smartphones?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner Präsentation ist: 'Smartphones für Kinder'. Ich habe dieses Thema gewählt, weil heute fast jedes Kind in der Schule ein Mobiltelefon besitzt. In meiner persönlichen Erfahrung lenkt das Smartphone beim Lernen oft ab, wenn keine klaren Regeln existieren. In meinem Heimatland nutzen Schüler Smartphones häufig auch im Unterricht für Recherchen. Ein großer Vorteil ist die ständige Erreichbarkeit im Notfall und der schnelle Zugang zu Wissensquellen. Ein ernster Nachteil ist jedoch das Risiko von Mediensucht und Konzentrationsschwächen. Zusammenfassend denke ich, dass Kinder erst ab ca. 12 Jahren ein eigenes Smartphone mit zeitlicher Begrenzung erhalten sollten. Vielen Dank für Ihre Aufmerksamkeit.",
        "points": 75
      }
    ]
  },
  {
    "id": "telc_b1_set_4",
    "board": "TELC",
    "level": "B1",
    "setNumber": 4,
    "title": "telc Deutsch B1 - Mock Exam Set 4",
    "officialStandard": "telc Deutsch B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 30,
      "speaking": 15,
      "total": 150
    },
    "scoringRules": {
      "readingMax": 75,
      "listeningMax": 75,
      "writingMax": 45,
      "speakingMax": 75,
      "totalMax": 300,
      "passPercentage": 60,
      "passPointsWritten": 135,
      "passPointsOral": 45,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "telc_b1_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Ernährungsumstellung: Ein Jahr vegetarisch leben)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Sandra (27): 'Vor einem Jahr habe ich beschlossen, komplett auf Fleisch zu verzichten. Anfangs fehlten mir Rezeptideen, doch mittlerweile habe ich viele neue Gemüsesorten, Hülsenfrüchte und Gewürze entdeckt. Mein Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich insgesamt vitaler.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Welche positive Veränderung hat Sandra bemerkt?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Besserer Schlaf, normalisierter Blutdruck und mehr Vitalität",
                "isCorrect": true,
                "explanation": "Richtig: 'Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich... vitaler'."
              },
              {
                "key": "b",
                "text": "Dass sie jetzt jeden Tag hungrig ist",
                "isCorrect": false,
                "explanation": "Falsch: Sie fühlt sich sehr vital."
              },
              {
                "key": "c",
                "text": "Sie möchte nie wieder kochen",
                "isCorrect": false,
                "explanation": "Falsch: Sie hat viele neue Rezepte entdeckt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "telc_b1_set_4_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Verpackungsfreies Einkaufen: Unverpackt-Läden im Aufwind)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Immer mehr Verbraucher in Deutschland bringen eigene Dosen und Gläser zum Einkaufen mit. In sogenannten Unverpackt-Läden werden Müsli, Nudeln und Waschmittel grammgenau abgewogen. Das spart pro Jahr Tonnen von Plastikmüll. Immer mehr traditionelle Supermärkte übernehmen dieses Konzept und richten eigene Unverpackt-Stationen ein.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "telc_b1_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Wie funktioniert das Einkaufen im Unverpackt-Laden?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Kunden bringen eigene Behälter mit und wiegen Waren grammgenau ab",
                "isCorrect": true,
                "explanation": "Richtig: 'bringen eigene Dosen und Gläser... grammgenau abgewogen'."
              },
              {
                "key": "b",
                "text": "Man darf Waren nur in Plastiktüten kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Es ist unverpackt."
              },
              {
                "key": "c",
                "text": "Die Waren sind alle kostenlos",
                "isCorrect": false,
                "explanation": "Falsch: Man bezahlt nach Gewicht."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "telc_b1_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Arztpraxis-Ansage)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "telc_b1_set_4_lq1",
            "questionNumber": 1,
            "questionText": "Wann ist die Praxis während der Ferien geöffnet?",
            "speaker": "Arztpraxis-Ansage",
            "audioScript": "Guten Tag, hier spricht die Gemeinschaftspraxis Dr. Frank und Partner. Während der Sommerferien vom 1. bis 15. Juli ist unsere Praxis täglich von 8 bis 12 Uhr besetzt. Nachmittags ist die Praxis geschlossen. Die Vertretung übernimmt die Praxis Dr. Meissner in der Gartenstraße 4.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Täglich von 8:00 bis 12:00 Uhr vormittags",
                "isCorrect": true,
                "explanation": "Richtig: 'täglich von 8 bis 12 Uhr besetzt'."
              },
              {
                "key": "b",
                "text": "Nur nachmittags ab 16 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Nachmittags ist geschlossen."
              },
              {
                "key": "c",
                "text": "Die Praxis ist zwei Wochen komplett zu",
                "isCorrect": false,
                "explanation": "Falsch: Vormittags ist geöffnet."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "telc_b1_set_4_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Bitte um Verschiebung eines Prüfungstermins)",
        "prompt": "Schreiben Sie eine offizielle E-Mail an das Prüfungszentrum (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Bitte um Verschiebung eines Prüfungstermins'.",
        "leitpunkte": [
          "Angabe von Prüfungsnummer und gewähltem Datum",
          "Wichtiger Grund für den Verhinderungsfall (akute Erkrankung)",
          "Attest vom Arzt als Anlage",
          "Bitte um kostenfreie Umbuchung auf den nächsten Monat"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 45,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nich bin für die B1-Prüfung am kommenden Samstag (Teilnehmernummer: 928310) angemeldet. Leider muss ich Ihnen mitteilen, dass ich an diesem Prüfungstermin wegen einer akuten Erkrankung nicht teilnehmen kann.\n\nMein Arzt hat mir absolute Bettruhe verordnet. Ein entsprechendes ärztliches Attest habe ich dieser E-Mail als PDF-Datei beigefügt. Aus diesem Grund bitte ich Sie höflich, meine Prüfungsanmeldung kostenfrei auf den nächsten Prüfungstermin im kommenden Monat umzubuchen.\n\nIch danke Ihnen für Ihr Verständnis und freue mich auf Ihre schriftliche Bestätigung.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "telc_b1_set_4_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollte das Arbeiten im Homeoffice gesetzlich erlaubt werden?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollte das Arbeiten im Homeoffice gesetzlich erlaubt werden?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner kurzen Präsentation lautet: 'Recht auf Homeoffice'. Ich habe dieses Thema gewählt, weil seit der Pandemie viele Menschen von zu Hause aus arbeiten. In meiner persönlichen Erfahrung spart Homeoffice viel Fahrzeit im Berufsverkehr und ermöglicht eine ruhige Arbeitsatmosphäre. In meinem Heimatland arbeiten die meisten Beschäftigten noch traditionell vor Ort im Büro. Ein großer Vorteil von Homeoffice ist die bessere Vereinbarkeit von Familie und Beruf. Ein Nachteil ist jedoch der fehlende persönliche Kontakt zu Kollegen und die Gefahr, dass Arbeit und Freizeit verschwimmen. Zusammenfassend bin ich der Meinung, dass Beschäftigte ein Recht auf zwei Tage Homeoffice pro Woche haben sollten, wenn die Tätigkeit es erlaubt. Vielen Dank für Ihre Aufmerksamkeit.",
        "points": 75
      }
    ]
  },
  {
    "id": "goethe_a1_set_1",
    "board": "GOETHE",
    "level": "A1",
    "setNumber": 1,
    "title": "Goethe-Zertifikat A1 - Mock Exam Set 1",
    "officialStandard": "Goethe-Zertifikat A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "goethe_a1_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Liebe Maria,\nich lade dich herzlich zu meiner Geburtstagsparty am Samstag, 14. Oktober ein. Wir feiern ab 17 Uhr bei mir zu Hause in der Goethestraße 12. Bitte sag mir bis Donnerstag Bescheid, ob du kommen kannst. Bring bitte etwas zum Knabbern mit!\nLiebe Grüße,\nSarah",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Wann findet die Geburtstagsparty statt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Am Samstag, 14. Oktober ab 17 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'am Samstag, 14. Oktober... ab 17 Uhr'."
              },
              {
                "key": "b",
                "text": "Am Donnerstag um 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Donnerstag ist nur die Frist für die Rückmeldung."
              },
              {
                "key": "c",
                "text": "In einem Restaurant",
                "isCorrect": false,
                "explanation": "Falsch: Sie feiern bei Sarah zu Hause."
              }
            ]
          },
          {
            "id": "goethe_a1_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Was soll Maria mitbringen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Etwas zum Knabbern",
                "isCorrect": true,
                "explanation": "Richtig: 'Bring bitte etwas zum Knabbern mit'."
              },
              {
                "key": "b",
                "text": "Ein teures Geschenk",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Einen neuen Fernseher",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_1_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Arztpraxis Dr. Bergmann: Liebe Patientinnen und Patienten, die Praxis bleibt am Freitag, den 20. Mai wegen Fortbildung geschlossen. In dringenden Fällen wenden Sie sich bitte an die Notfallpraxis im Stadtkrankenhaus (Telefon: 116 117). Ab Montag sind wir wieder erreichbar.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "goethe_a1_set_1_rq3",
            "questionNumber": 3,
            "questionText": "Warum ist die Arztpraxis am Freitag geschlossen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Wegen einer Fortbildung des Teams",
                "isCorrect": true,
                "explanation": "Richtig: 'wegen Fortbildung geschlossen'."
              },
              {
                "key": "b",
                "text": "Weil der Arzt Urlaub am Strand macht",
                "isCorrect": false,
                "explanation": "Falsch: Nicht im Text genannt."
              },
              {
                "key": "c",
                "text": "Wegen Renovierungsarbeiten",
                "isCorrect": false,
                "explanation": "Falsch: Es ist eine Fortbildung."
              }
            ]
          },
          {
            "id": "goethe_a1_set_1_rq4",
            "questionNumber": 4,
            "questionText": "Wohin können Patienten in Notfällen gehen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "In die Notfallpraxis im Stadtkrankenhaus",
                "isCorrect": true,
                "explanation": "Richtig: 'an die Notfallpraxis im Stadtkrankenhaus'."
              },
              {
                "key": "b",
                "text": "Zu keinem Arzt vor Montag",
                "isCorrect": false,
                "explanation": "Falsch: Die Notfallpraxis ist offen."
              },
              {
                "key": "c",
                "text": "Zur Polizei",
                "isCorrect": false,
                "explanation": "Falsch: Falsche Anlaufstelle."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_1_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Bäckerei Sonnenschein: Frische Brötchen und Brot! Öffnungszeiten: Mo-Fr 6:30 bis 18:30 Uhr, Sa 7:00 bis 13:00 Uhr. Sonntags geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_1_rq5",
            "questionNumber": 5,
            "questionText": "Kann man am Sonntag um 8 Uhr Brötchen kaufen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, sonntags ist die Bäckerei geschlossen",
                "isCorrect": true,
                "explanation": "Richtig: 'Sonntags geschlossen'."
              },
              {
                "key": "b",
                "text": "Ja, von 7 bis 13 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Das gilt nur samstags."
              },
              {
                "key": "c",
                "text": "Ja, aber nur bis 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Sonntags geschlossen."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a1_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Von welchem Gleis fährt der Zug nach Stuttgart ab?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Achtung an Gleis 2: Der Regionalexpress nach Stuttgart über Heidelberg, Abfahrt um 9 Uhr 25, fährt heute von Gleis 5 ab. Grund dafür ist eine Gleisänderung.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Von Gleis 5",
                "isCorrect": true,
                "explanation": "Richtig: Der Zug fährt heute von Gleis 5 ab."
              },
              {
                "key": "b",
                "text": "Von Gleis 2",
                "isCorrect": false,
                "explanation": "Falsch: Gleis 2 war das planmäßige Gleis."
              },
              {
                "key": "c",
                "text": "Von Gleis 9",
                "isCorrect": false,
                "explanation": "Falsch: 9 Uhr 25 war die Abfahrtszeit."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_1_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_1_lq2",
            "questionNumber": 2,
            "questionText": "Auf welche Uhrzeit wird der Termin verschoben?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag, hier spricht Frau Weber von der Zahnarztpraxis Dr. Schmidt. Herr Wagner, Ihr Termin morgen um 15 Uhr muss leider auf 16 Uhr 30 verschoben werden. Bitte rufen Sie kurz zurück.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Auf 16:30 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'auf 16 Uhr 30 verschoben'."
              },
              {
                "key": "b",
                "text": "Auf 15:00 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: 15 Uhr war der alte Termin."
              },
              {
                "key": "c",
                "text": "Auf 10:00 Uhr morgens",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a1_set_1_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten im Hotel Lindenhof ein Zimmer für zwei Nächte buchen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nich möchte ein Doppelzimmer vom 10. bis 12. Juli für zwei Personen reservieren. Wie viel kostet das Zimmer pro Nacht inklusive Frühstück? Bitte senden Sie mir eine Bestätigung per E-Mail.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a1_set_1_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a1_set_2",
    "board": "GOETHE",
    "level": "A1",
    "setNumber": 2,
    "title": "Goethe-Zertifikat A1 - Mock Exam Set 2",
    "officialStandard": "Goethe-Zertifikat A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "goethe_a1_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Hallo David,\nwir wollen am Sonntag zusammen am Baggersee grillen. Das Wetter soll sehr sonnig und warm werden. Wir treffen uns um 13 Uhr am Parkplatz vor dem See. Bring bitte Grillwürstchen und etwas zu trinken mit!\nBis Sonntag,\nFelix",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Was haben Felix und David vor?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Sie wollen am Sonntag am See grillen",
                "isCorrect": true,
                "explanation": "Richtig: 'am Sonntag zusammen am Baggersee grillen'."
              },
              {
                "key": "b",
                "text": "Sie wollen im Restaurant frühstücken",
                "isCorrect": false,
                "explanation": "Falsch: Sie gehen grillen."
              },
              {
                "key": "c",
                "text": "Sie kaufen ein Auto am Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: Sie treffen sich dort zum Grillen."
              }
            ]
          },
          {
            "id": "goethe_a1_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Wo ist der Treffpunkt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Am Parkplatz vor dem See",
                "isCorrect": true,
                "explanation": "Richtig: 'am Parkplatz vor dem See'."
              },
              {
                "key": "b",
                "text": "Am Hauptbahnhof",
                "isCorrect": false,
                "explanation": "Falsch: Falscher Treffpunkt."
              },
              {
                "key": "c",
                "text": "In Felix' Küche",
                "isCorrect": false,
                "explanation": "Falsch: Nicht im Text genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_2_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Supermarkt FrischeMarkt: Wegen Inventur schließt unsere Filiale am Samstag bereits um 16 Uhr statt um 20 Uhr. Ab Montag stehen wir Ihnen wieder zu den gewohnten Öffnungszeiten zur Verfügung.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "goethe_a1_set_2_rq3",
            "questionNumber": 3,
            "questionText": "Wann schließt der Supermarkt am Samstag?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Bereits um 16:00 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'schließt... bereits um 16 Uhr'."
              },
              {
                "key": "b",
                "text": "Um 20:00 Uhr wie gewohnt",
                "isCorrect": false,
                "explanation": "Falsch: 20 Uhr war die normale Zeit."
              },
              {
                "key": "c",
                "text": "Der Markt öffnet gar nicht",
                "isCorrect": false,
                "explanation": "Falsch: Er ist bis 16 Uhr offen."
              }
            ]
          },
          {
            "id": "goethe_a1_set_2_rq4",
            "questionNumber": 4,
            "questionText": "Was ist der Grund für die frühere Schließung?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Die jährliche Inventur",
                "isCorrect": true,
                "explanation": "Richtig: 'Wegen Inventur'."
              },
              {
                "key": "b",
                "text": "Feuer im Gebäude",
                "isCorrect": false,
                "explanation": "Falsch: Keine Panik."
              },
              {
                "key": "c",
                "text": "Streik der Mitarbeiter",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_2_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Fahrradreparatur RadFix: Reparaturannahme montags bis freitags von 8 bis 17 Uhr. Reifenwechsel ohne Voranmeldung in 30 Minuten möglich. Samstags geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_2_rq5",
            "questionNumber": 5,
            "questionText": "Muss man für einen Reifenwechsel vorher einen Termin buchen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, Reifenwechsel ist ohne Voranmeldung möglich",
                "isCorrect": true,
                "explanation": "Richtig: 'Reifenwechsel ohne Voranmeldung in 30 Minuten möglich'."
              },
              {
                "key": "b",
                "text": "Ja, mindestens zwei Wochen vorher",
                "isCorrect": false,
                "explanation": "Falsch: Ausdrücklich ohne Voranmeldung."
              },
              {
                "key": "c",
                "text": "Nur samstags nach Vereinbarung",
                "isCorrect": false,
                "explanation": "Falsch: Samstags ist geschlossen."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a1_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_2_lq1",
            "questionNumber": 1,
            "questionText": "An welchem Flugsteig findet das Einsteigen statt?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Sehr geehrte Fluggäste nach Wien: Flug LH 3482, geplant um 11 Uhr 15, ist nun zum Einsteigen an Flugsteig B 18 bereit. Bitte halten Sie Ihren Ausweis und Ihre Bordkarte bereit.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "An Flugsteig B 18",
                "isCorrect": true,
                "explanation": "Richtig: 'Flugsteig B 18'."
              },
              {
                "key": "b",
                "text": "An Flugsteig A 12",
                "isCorrect": false,
                "explanation": "Falsch: Falscher Flugsteig."
              },
              {
                "key": "c",
                "text": "An Flugsteig C 34",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_2_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_2_lq2",
            "questionNumber": 2,
            "questionText": "Wann kommt Florian voraussichtlich am Kino an?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Hallo Julia, hier ist Florian. Ich stehe leider im Stau auf der Autobahn. Ich schaffe es nicht um 18 Uhr ins Kino, sondern komme erst um 18 Uhr 45. Geh bitte schon rein und kauf die Karten!",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Um 18:45 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'komme erst um 18 Uhr 45'."
              },
              {
                "key": "b",
                "text": "Pünktlich um 18:00 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Er steht im Stau."
              },
              {
                "key": "c",
                "text": "Er kommt heute gar nicht mehr",
                "isCorrect": false,
                "explanation": "Falsch: Er kommt 45 Minuten später."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a1_set_2_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie können wegen einer Erkältung heute nicht zum Deutschkurs kommen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Liebe Frau Schneider,\n\nich kann heute leider nicht zum Deutschkurs kommen, weil ich stark erkältet bin und Husten habe. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Am Mittwoch bin ich wieder da.\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a1_set_2_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a1_set_3",
    "board": "GOETHE",
    "level": "A1",
    "setNumber": 3,
    "title": "Goethe-Zertifikat A1 - Mock Exam Set 3",
    "officialStandard": "Goethe-Zertifikat A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "goethe_a1_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Guten Tag Herr Becker,\nIhre bestellte Winterjacke ist bei uns in der Filiale SportWelt eingetroffen. Sie können die Jacke innerhalb von 10 Werktagen an der Kasse abholen. Bitte bringen Sie Ihren Personalausweis und die Bestellnummer mit.\nMit freundlichen Grüßen,\nIhr SportWelt-Team",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Was teilt das Geschäft Herrn Becker mit?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Dass seine bestellte Jacke abholbereit ist",
                "isCorrect": true,
                "explanation": "Richtig: 'Ihre bestellte Winterjacke ist... eingetroffen'."
              },
              {
                "key": "b",
                "text": "Dass die Jacke leider ausverkauft ist",
                "isCorrect": false,
                "explanation": "Falsch: Die Jacke ist da."
              },
              {
                "key": "c",
                "text": "Dass er mehr Geld überweisen muss",
                "isCorrect": false,
                "explanation": "Falsch: Keine Zahlungsaufforderung."
              }
            ]
          },
          {
            "id": "goethe_a1_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Was muss Herr Becker zur Abholung mitbringen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Personalausweis und Bestellnummer",
                "isCorrect": true,
                "explanation": "Richtig: 'bringen Sie Ihren Personalausweis und die Bestellnummer mit'."
              },
              {
                "key": "b",
                "text": "Nur Bargeld",
                "isCorrect": false,
                "explanation": "Falsch: Ausweis und Nummer sind verlangt."
              },
              {
                "key": "c",
                "text": "Ein Foto seiner alten Jacke",
                "isCorrect": false,
                "explanation": "Falsch: Völlig falsch."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_3_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Schwimmbad AquaFit: Wegen Reinigungsarbeiten im Hallenbad ist das Schwimmbecken vom 1. bis 5. September gesperrt. Die Sauna und der Fitnessbereich sind wie gewohnt täglich ab 9 Uhr geöffnet.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "goethe_a1_set_3_rq3",
            "questionNumber": 3,
            "questionText": "Was ist vom 1. bis 5. September gesperrt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Das Schwimmbecken im Hallenbad",
                "isCorrect": true,
                "explanation": "Richtig: 'ist das Schwimmbecken... gesperrt'."
              },
              {
                "key": "b",
                "text": "Die gesamte Anlage inklusive Sauna",
                "isCorrect": false,
                "explanation": "Falsch: Sauna ist geöffnet."
              },
              {
                "key": "c",
                "text": "Nur der Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: Nicht der Parkplatz."
              }
            ]
          },
          {
            "id": "goethe_a1_set_3_rq4",
            "questionNumber": 4,
            "questionText": "Dürfen Gäste die Sauna benutzen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ja, die Sauna ist wie gewohnt geöffnet",
                "isCorrect": true,
                "explanation": "Richtig: 'Sauna und Fitnessbereich sind wie gewohnt... geöffnet'."
              },
              {
                "key": "b",
                "text": "Nein, die Sauna wird auch gereinigt",
                "isCorrect": false,
                "explanation": "Falsch: Sauna bleibt offen."
              },
              {
                "key": "c",
                "text": "Nur nach 22 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Ab 9 Uhr morgens."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_3_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Museum für Kunst: Eintritt frei für Kinder und Jugendliche unter 18 Jahren. Erwachsene zahlen 8 Euro. Montags ist das Museum geschlossen.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_3_rq5",
            "questionNumber": 5,
            "questionText": "Muss ein 15-jähriger Schüler Eintritt bezahlen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Nein, der Eintritt ist für ihn frei",
                "isCorrect": true,
                "explanation": "Richtig: 'Eintritt frei für Kinder und Jugendliche unter 18 Jahren'."
              },
              {
                "key": "b",
                "text": "Ja, er zahlt den vollen Preis von 8 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Unter 18 ist frei."
              },
              {
                "key": "c",
                "text": "Er zahlt 4 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Keine halbe Gebühr."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a1_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_3_lq1",
            "questionNumber": 1,
            "questionText": "Wo kann der verlorene Schlüsselbund abgeholt werden?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Kundendurchsage im Kaufhaus Galeria: Sehr geehrte Kundinnen und Kunden, wir haben in der Damenabteilung im ersten Stock einen schwarzen Schlüsselbund gefunden. Der Besitzer kann die Schlüssel an der Hauptkasse im Erdgeschoss abholen.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "An der Hauptkasse im Erdgeschoss",
                "isCorrect": true,
                "explanation": "Richtig: 'an der Hauptkasse im Erdgeschoss'."
              },
              {
                "key": "b",
                "text": "Im dritten Stock bei den Möbeln",
                "isCorrect": false,
                "explanation": "Falsch: Falsches Stockwerk."
              },
              {
                "key": "c",
                "text": "Draußen auf dem Parkplatz",
                "isCorrect": false,
                "explanation": "Falsch: An der Hauptkasse."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_3_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_3_lq2",
            "questionNumber": 2,
            "questionText": "Warum kommt der Handwerker zu Frau Meyer?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag Frau Meyer, hier spricht Herr Schulz von der Wohnungsverwaltung. Wir schicken morgen um 11 Uhr den Elektriker zu Ihnen, um den Herd anzuschließen. Bitte seien Sie zu Hause.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Um den Küchenherd anzuschließen",
                "isCorrect": true,
                "explanation": "Richtig: 'um den Herd anzuschließen'."
              },
              {
                "key": "b",
                "text": "Um die Fenster zu putzen",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Elektriker für den Herd."
              },
              {
                "key": "c",
                "text": "Um die Miete abzuholen",
                "isCorrect": false,
                "explanation": "Falsch: Handwerker schließt Herd an."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a1_set_3_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten sich für einen Tanzkurs für Anfänger anmelden.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Guten Tag,\n\nich möchte mich für den Salsa-Tanzkurs für Anfänger im November anmelden. Wann genau beginnt der Kurs und wie viel kostet die Teilnahme? Bitte senden Sie mir das Anmeldeformular.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a1_set_3_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a1_set_4",
    "board": "GOETHE",
    "level": "A1",
    "setNumber": 4,
    "title": "Goethe-Zertifikat A1 - Mock Exam Set 4",
    "officialStandard": "Goethe-Zertifikat A1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 25,
      "listening": 20,
      "writing": 20,
      "speaking": 15,
      "total": 80
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
    },
    "readingSections": [
      {
        "teilId": "goethe_a1_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
        "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
        "readingPassage": "Lieber Alex,\nich kann am Freitag leider nicht zum gemeinsamen Kochen kommen. Mein Chef hat mich gebeten, bis 20 Uhr im Büro zu bleiben, weil wir ein wichtiges Projekt fertigstellen müssen. Wie wäre es, wenn wir uns stattdessen am Samstag zum Mittagessen treffen?\nHerzliche Grüße,\nJan",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Warum sagt Jan das Kochen am Freitag ab?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Weil er wegen eines Projekts länger im Büro arbeiten muss",
                "isCorrect": true,
                "explanation": "Richtig: 'muss bis 20 Uhr im Büro bleiben'."
              },
              {
                "key": "b",
                "text": "Weil er krank im Bett liegt",
                "isCorrect": false,
                "explanation": "Falsch: Er arbeitet länger."
              },
              {
                "key": "c",
                "text": "Weil er kein Geld für Lebensmittel hat",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              }
            ]
          },
          {
            "id": "goethe_a1_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Was schlägt Jan als Ausweichtermin vor?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ein gemeinsames Mittagessen am Samstag",
                "isCorrect": true,
                "explanation": "Richtig: 'am Samstag zum Mittagessen treffen'."
              },
              {
                "key": "b",
                "text": "Ein Frühstück am nächsten Montag",
                "isCorrect": false,
                "explanation": "Falsch: Er schlägt Samstag vor."
              },
              {
                "key": "c",
                "text": "Gar kein Treffen mehr",
                "isCorrect": false,
                "explanation": "Falsch: Er macht einen Gegenvorschlag."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_4_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
        "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
        "readingPassage": "Stadtwerke Info: Wegen Reparaturarbeiten an der Hauptwasserleitung wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser in der Neustadt abgestellt. Bitte sorgen Sie rechtzeitig für einen Wasservorrat.",
        "timeRecommendedMinutes": 9,
        "questions": [
          {
            "id": "goethe_a1_set_4_rq3",
            "questionNumber": 3,
            "questionText": "Was passiert am Mittwoch in der Neustadt?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Das Trinkwasser wird von 9 bis 13 Uhr abgestellt",
                "isCorrect": true,
                "explanation": "Richtig: 'wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser... abgestellt'."
              },
              {
                "key": "b",
                "text": "Der Strom wird für zwei Tage abgeschaltet",
                "isCorrect": false,
                "explanation": "Falsch: Es betrifft das Wasser."
              },
              {
                "key": "c",
                "text": "Die Straßen werden asphaltiert",
                "isCorrect": false,
                "explanation": "Falsch: Reparatur an der Wasserleitung."
              }
            ]
          },
          {
            "id": "goethe_a1_set_4_rq4",
            "questionNumber": 4,
            "questionText": "Was sollen die Anwohner tun?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Rechtzeitig Wasser auf Vorrat bereithalten",
                "isCorrect": true,
                "explanation": "Richtig: 'sorgen Sie rechtzeitig für einen Wasservorrat'."
              },
              {
                "key": "b",
                "text": "Ihre Wohnungen verlassen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht nötig."
              },
              {
                "key": "c",
                "text": "Die Stadtwerke verklagen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_4_read_3",
        "teilNumber": 3,
        "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
        "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
        "readingPassage": "Tierpark Schönbrunn: Hunde sind im gesamten Parkgelände an der kurzen Leine zu führen. Das Füttern der Tiere ist verboten.",
        "timeRecommendedMinutes": 8,
        "questions": [
          {
            "id": "goethe_a1_set_4_rq5",
            "questionNumber": 5,
            "questionText": "Dürfen Besucher eigene Hunde in den Tierpark mitnehmen?",
            "points": 5,
            "options": [
              {
                "key": "a",
                "text": "Ja, aber Hunde müssen an der kurzen Leine geführt werden",
                "isCorrect": true,
                "explanation": "Richtig: 'an der kurzen Leine zu führen'."
              },
              {
                "key": "b",
                "text": "Nein, Hunde sind strengstens verboten",
                "isCorrect": false,
                "explanation": "Falsch: Sie dürfen angeleint mitkommen."
              },
              {
                "key": "c",
                "text": "Ja, Hunde dürfen frei herumlaufen",
                "isCorrect": false,
                "explanation": "Falsch: Nur an der kurzen Leine."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a1_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
        "instructions": "Sie hören eine Durchsage. Was ist richtig?",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_4_lq1",
            "questionNumber": 1,
            "questionText": "In welchem Wagen befindet sich das Bordbistro?",
            "speaker": "Öffentliche Durchsage",
            "audioScript": "Durchsage im ICE 612: Sehr geehrte Fahrgäste, unser Bordbistro im Wagen 8 ist ab sofort geöffnet. Wir bieten Ihnen heute warme Suppen, frische Snacks und kalte Getränke an. Guten Appetit!",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "In Wagen 8",
                "isCorrect": true,
                "explanation": "Richtig: 'Bordbistro im Wagen 8'."
              },
              {
                "key": "b",
                "text": "In Wagen 2",
                "isCorrect": false,
                "explanation": "Falsch: Falsche Wagennummer."
              },
              {
                "key": "c",
                "text": "In Wagen 14",
                "isCorrect": false,
                "explanation": "Falsch: Nicht genannt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_a1_set_4_listen_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
        "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 10,
        "questions": [
          {
            "id": "goethe_a1_set_4_lq2",
            "questionNumber": 2,
            "questionText": "Welches Medium kann Herr Fischer abholen?",
            "speaker": "Telefonischer Anrufbeantworter",
            "audioScript": "Guten Tag Herr Fischer, hier spricht die Stadtbücherei. Ihr vorbestelltes Buch über Gartenbau ist jetzt eingetroffen. Sie können es bis Ende nächster Woche an der Ausleihtheke abholen.",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Ein vorbestelltes Buch über Gartenbau",
                "isCorrect": true,
                "explanation": "Richtig: 'vorbestelltes Buch über Gartenbau'."
              },
              {
                "key": "b",
                "text": "Eine DVD über Autos",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Buch über Gartenbau."
              },
              {
                "key": "c",
                "text": "Einen Bibliotheksausweis für seine Tochter",
                "isCorrect": false,
                "explanation": "Falsch: Ein vorbestelltes Buch."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a1_set_4_write_1",
        "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
        "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
        "situation": "Sie möchten Ihren Nachbarn bitten, Ihre Pflanzen während Ihres Urlaubs zu gießen.",
        "leitpunkte": [
          "Grund des Schreibens",
          "Wann und wie lange",
          "Höfliche Bitte um Rückmeldung"
        ],
        "minWords": 30,
        "maxWords": 50,
        "points": 25,
        "modelAnswer": "Lieber Herr Müller,\n\nich fahre vom 15. bis 22. August in den Urlaub. Könnten Sie bitte in dieser Zeit zweimal meine Balkonpflanzen gießen? Ich gebe Ihnen gerne den Wohnungsschlüssel heute Abend vorbei. Vielen Dank für Ihre Hilfe!\n\nHerzliche Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a1_set_4_speak_1",
        "teilNumber": 1,
        "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
        "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
        "cardsOrQuestions": [
          "Name",
          "Alter",
          "Herkunftsland",
          "Wohnort",
          "Sprachen",
          "Beruf",
          "Hobbys",
          "Buchstabieren",
          "Telefonnummer"
        ],
        "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a2_set_1",
    "board": "GOETHE",
    "level": "A2",
    "setNumber": 1,
    "title": "Goethe-Zertifikat A2 - Mock Exam Set 1",
    "officialStandard": "Goethe-Zertifikat A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "goethe_a2_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Umzug & Wohnen)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Umzug & Wohnen'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "goethe_a2_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a2_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Fahrradstadt & Mobilität)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Fahrradstadt & Mobilität' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Fahrradstadt & Mobilität'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a2_set_1_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Nachbarschaftsfest & Grillen)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Nachbarschaftsfest & Grillen' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Nachbarschaftsfest & Grillen' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Nachbarschaftsfest & Grillen' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a2_set_1_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Homeoffice & Arbeitsalltag)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Homeoffice & Arbeitsalltag'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Homeoffice & Arbeitsalltag' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a2_set_2",
    "board": "GOETHE",
    "level": "A2",
    "setNumber": 2,
    "title": "Goethe-Zertifikat A2 - Mock Exam Set 2",
    "officialStandard": "Goethe-Zertifikat A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "goethe_a2_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Fitness & Gesundheit)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Fitness & Gesundheit'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "goethe_a2_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a2_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Urlaub & Reisen an die Ostsee)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_2_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Urlaub & Reisen an die Ostsee' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Urlaub & Reisen an die Ostsee'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a2_set_2_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Sprachkurs & Tandempartner)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Sprachkurs & Tandempartner' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Sprachkurs & Tandempartner' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Sprachkurs & Tandempartner' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a2_set_2_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Haustiere im Mietshaus)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Haustiere im Mietshaus'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Haustiere im Mietshaus' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a2_set_3",
    "board": "GOETHE",
    "level": "A2",
    "setNumber": 3,
    "title": "Goethe-Zertifikat A2 - Mock Exam Set 3",
    "officialStandard": "Goethe-Zertifikat A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "goethe_a2_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Wochenmarkt & Bio-Essen)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Wochenmarkt & Bio-Essen'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "goethe_a2_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a2_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Öffentlicher Nahverkehr & Tram)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_3_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Öffentlicher Nahverkehr & Tram' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Öffentlicher Nahverkehr & Tram'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a2_set_3_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Reparatur & Handwerker)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Reparatur & Handwerker' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Reparatur & Handwerker' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Reparatur & Handwerker' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a2_set_3_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Kino & Kulturabend)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Kino & Kulturabend'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Kino & Kulturabend' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_a2_set_4",
    "board": "GOETHE",
    "level": "A2",
    "setNumber": 4,
    "title": "Goethe-Zertifikat A2 - Mock Exam Set 4",
    "officialStandard": "Goethe-Zertifikat A2 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 30,
      "listening": 30,
      "writing": 30,
      "speaking": 15,
      "total": 105
    },
    "scoringRules": {
      "readingMax": 25,
      "listeningMax": 25,
      "writingMax": 25,
      "speakingMax": 25,
      "totalMax": 100,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "At least 60 points (60%) required to pass."
    },
    "readingSections": [
      {
        "teilId": "goethe_a2_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Zeitungsartikel (Ehrenamt & Tierheim)",
        "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
        "readingPassage": "Immer mehr Menschen in Großstädten entscheiden sich für das Thema 'Ehrenamt & Tierheim'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Was zeigt die aktuelle Umfrage?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten",
                "isCorrect": true,
                "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."
              },
              {
                "key": "b",
                "text": "Niemand interessiert sich für das Thema",
                "isCorrect": false,
                "explanation": "Falsch: Das Gegenteil ist der Fall."
              },
              {
                "key": "c",
                "text": "Die Angebote werden komplett eingestellt",
                "isCorrect": false,
                "explanation": "Falsch: Sie werden ausgebaut."
              }
            ]
          },
          {
            "id": "goethe_a2_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Was plant die Stadtverwaltung?",
            "points": 12.5,
            "options": [
              {
                "key": "a",
                "text": "Die Angebote in den nächsten zwei Jahren auszubauen",
                "isCorrect": true,
                "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."
              },
              {
                "key": "b",
                "text": "Alle Preise um 50 Prozent zu erhöhen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht erwähnt."
              },
              {
                "key": "c",
                "text": "Das Projekt sofort abzubrechen",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_a2_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Radiobericht & Durchsage (Kompaktkurs & Weiterbildung)",
        "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_a2_set_4_lq1",
            "questionNumber": 1,
            "questionText": "Worüber berichtet der Radiosprecher?",
            "speaker": "Radiosender CityWelle",
            "audioScript": "Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema 'Kompaktkurs & Weiterbildung' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Über neue Vergünstigungen zum Thema 'Kompaktkurs & Weiterbildung'",
                "isCorrect": true,
                "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."
              },
              {
                "key": "b",
                "text": "Über das schlechte Wetter am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Es geht um städtische Beschlüsse."
              },
              {
                "key": "c",
                "text": "Über eine Vollsperrung der Autobahn",
                "isCorrect": false,
                "explanation": "Falsch: Nicht Thema des Berichts."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_a2_set_4_write_1",
        "taskTitle": "Teil 2: E-Mail an Freunde oder Kollegen (Sportverein & Laufen)",
        "prompt": "Schreiben Sie eine E-Mail zum Thema 'Sportverein & Laufen' (ca. 40 bis 50 Wörter).",
        "situation": "Sie organisieren ein Treffen mit Freunden zum Thema 'Sportverein & Laufen' und möchten Einzelheiten klären.",
        "leitpunkte": [
          "Wann und wo das Treffen stattfindet",
          "Was die Teilnehmer mitbringen sollen",
          "Bitte um Bestätigung bis morgen Abend"
        ],
        "minWords": 40,
        "maxWords": 60,
        "points": 25,
        "modelAnswer": "Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema 'Sportverein & Laufen' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_a2_set_4_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Von sich erzählen (Wohnungssuche & Kaution)",
        "prompt": "Erzählen Sie von Ihren Erfahrungen zum Thema 'Wohnungssuche & Kaution'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
        "cardsOrQuestions": [
          "Persönliche Erfahrung",
          "Häufigkeit im Alltag",
          "Was gefällt Ihnen daran",
          "Zukunftspläne"
        ],
        "modelResponse": "Zum Thema 'Wohnungssuche & Kaution' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
        "points": 25
      }
    ]
  },
  {
    "id": "goethe_b1_set_1",
    "board": "GOETHE",
    "level": "B1",
    "setNumber": 1,
    "title": "Goethe-Zertifikat B1 - Mock Exam Set 1",
    "officialStandard": "Goethe-Zertifikat B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 60,
      "speaking": 15,
      "total": 180
    },
    "scoringRules": {
      "readingMax": 100,
      "listeningMax": 100,
      "writingMax": 100,
      "speakingMax": 100,
      "totalMax": 400,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "goethe_b1_set_1_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Leben ohne eigenes Auto in der Großstadt)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Julia (29): 'Seit sechs Monaten besitze ich kein Auto mehr. Stattdessen fahre ich täglich mit dem E-Bike und nutze für längere Strecken die Bahn oder Carsharing. Ich spare jeden Monat rund 300 Euro für Benzin, Versicherung und Reparaturen. Zudem entfällt der tägliche Parkplatzstress.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_1_rq1",
            "questionNumber": 1,
            "questionText": "Warum ist Julia mit ihrer Entscheidung zufrieden?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie spart monatlich Geld und hat keinen Parkplatzstress mehr",
                "isCorrect": true,
                "explanation": "Richtig: 'spare jeden Monat rund 300 Euro... entfällt der tägliche Parkplatzstress'."
              },
              {
                "key": "b",
                "text": "Sie fährt jetzt nur noch mit dem Taxi",
                "isCorrect": false,
                "explanation": "Falsch: Sie nutzt E-Bike, Bahn und Carsharing."
              },
              {
                "key": "c",
                "text": "Sie möchte sofort wieder ein Auto kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Sie ist vollkommen zufrieden."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_b1_set_1_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Die 4-Tage-Woche im Praxistest)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Immer mehr Betriebe in Deutschland erproben die 4-Tage-Woche bei vollem Lohnausgleich. Auswertungen zeigen: Die Fehlzeiten wegen Krankheit sanken im Durchschnitt um 25 Prozent, während die Mitarbeiterzufriedenheit sprunghaft anstieg. Kritiker aus der Industrie befürchten allerdings Produktivitätsverluste im globalen Wettbewerb.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "goethe_b1_set_1_rq2",
            "questionNumber": 2,
            "questionText": "Welches Ergebnis zeigt der Praxistest?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Signifikant weniger Krankheitstage und höhere Zufriedenheit",
                "isCorrect": true,
                "explanation": "Richtig: 'sanken im Durchschnitt um 25 Prozent... Zufriedenheit sprunghaft anstieg'."
              },
              {
                "key": "b",
                "text": "Alle Mitarbeiter haben gekündigt",
                "isCorrect": false,
                "explanation": "Falsch: Zufriedenheit ist gestiegen."
              },
              {
                "key": "c",
                "text": "Die Gehälter wurden um ein Viertel gekürzt",
                "isCorrect": false,
                "explanation": "Falsch: Voller Lohnausgleich."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_b1_set_1_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Bahnhofsdurchsage ICE 892)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_1_lq1",
            "questionNumber": 1,
            "questionText": "Welche Alternative wird für Reisende nach Hannover empfohlen?",
            "speaker": "Bahnhofsdurchsage ICE 892",
            "audioScript": "Achtung an Gleis 7: Der ICE 892 nach Hamburg über Hannover, planmäßige Abfahrt um 17 Uhr 18, hat heute ca. 35 Minuten Verspätung wegen einer Reparatur an der Oberleitung. Reisende nach Hannover können alternativ den Regionalexpress auf Gleis 4 nutzen.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Den Regionalexpress auf Gleis 4 zu nehmen",
                "isCorrect": true,
                "explanation": "Richtig: 'alternativ den Regionalexpress auf Gleis 4 nutzen'."
              },
              {
                "key": "b",
                "text": "Bis morgen früh zu warten",
                "isCorrect": false,
                "explanation": "Falsch: Es gibt die Regionalverbindung."
              },
              {
                "key": "c",
                "text": "Ein Taxi auf eigene Kosten zu buchen",
                "isCorrect": false,
                "explanation": "Falsch: Nicht in der Durchsage genannt."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_b1_set_1_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Schaden in der Mietwohnung (Wasserschaden & Heizung))",
        "prompt": "Schreiben Sie eine formelle Beschwerde-E-Mail an Ihren Vermieter Herrn Schneider (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Schaden in der Mietwohnung (Wasserschaden & Heizung)'.",
        "leitpunkte": [
          "Grund des Schreibens (Heizungsausfall und feuchte Wand)",
          "Bereits entstandene Unannehmlichkeiten",
          "Frist für die Reparatur bis Freitag",
          "Ankündigung von Mietminderung bei Nichthandeln"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 100,
        "modelAnswer": "Sehr geehrter Herr Schneider,\n\nich wende mich an Sie, weil in meiner Wohnung im zweiten Stock seit gestern die Heizung im Wohnzimmer komplett ausgefallen ist. Zudem habe ich bemerkt, dass die Wand unter dem Fenster feucht ist und sich bereits dunkle Flecken bilden.\n\nDa die Temperaturen draußen sehr niedrig sind, kühlt die Wohnung stark aus. Ich bitte Sie daher dringend, bis spätestens Freitag einen Handwerker zur Begutachtung und Behebung des Schadens zu beauftragen. Sollte der Mangel bis zu diesem Zeitpunkt nicht beseitigt werden, sehe ich mich gezwungen, die Miete für diesen Monat angemessen zu mindern.\n\nIch bitte um Ihre zeitnahe schriftliche Bestätigung des Termins.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_b1_set_1_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollten Haustiere in Mietwohnungen generell erlaubt sein?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollten Haustiere in Mietwohnungen generell erlaubt sein?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner Präsentation lautet: 'Haustiere in Mietwohnungen'. Ich habe dieses Thema gewählt, weil viele Menschen gerne einen Hund oder eine Katze halten möchten. In meiner persönlichen Erfahrung in Deutschland habe ich erlebt, dass Tiere viel Lebensfreude bringen, aber manchmal auch Lärm machen können. In meinem Heimatland gibt es selten strenge Regeln in Mietverträgen, jeder entscheidet selbst. Ein großer Vorteil von Haustieren ist die emotionale Unterstützung und die Bewegung an der frischen Luft. Ein Nachteil können jedoch Beschwerden von Nachbarn wegen Bellen oder Allergien sein. Zusammenfassend bin ich der Ansicht, dass Haustiere erlaubt sein sollten, solange sie gut erzogen sind und die Nachbarn nicht stören. Vielen Dank fürs Zuhören.",
        "points": 100
      }
    ]
  },
  {
    "id": "goethe_b1_set_2",
    "board": "GOETHE",
    "level": "B1",
    "setNumber": 2,
    "title": "Goethe-Zertifikat B1 - Mock Exam Set 2",
    "officialStandard": "Goethe-Zertifikat B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 60,
      "speaking": 15,
      "total": 180
    },
    "scoringRules": {
      "readingMax": 100,
      "listeningMax": 100,
      "writingMax": 100,
      "speakingMax": 100,
      "totalMax": 400,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "goethe_b1_set_2_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Ausbildung oder Studium? Mein Weg ins Handwerk)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Marcel (24): 'Nach dem Abitur wollten meine Eltern, dass ich BWL studiere. Nach zwei Semestern an der Universität habe ich mich jedoch für eine Ausbildung zum Mechatroniker entschieden. Heute verdiene ich mein eigenes Gehalt, habe geregelte Arbeitszeiten und sehe jeden Tag das konkrete Ergebnis meiner Arbeit.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_2_rq1",
            "questionNumber": 1,
            "questionText": "Warum hat Marcel sein Studium abgebrochen?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Weil er lieber praktisch im Handwerk arbeiten und eigenes Geld verdienen wollte",
                "isCorrect": true,
                "explanation": "Richtig: 'für eine Ausbildung zum Mechatroniker entschieden... sehe konkretes Ergebnis'."
              },
              {
                "key": "b",
                "text": "Weil er alle Prüfungen nicht bestanden hat",
                "isCorrect": false,
                "explanation": "Falsch: Er entschied sich bewusst für das Handwerk."
              },
              {
                "key": "c",
                "text": "Weil seine Eltern es ihm verboten haben",
                "isCorrect": false,
                "explanation": "Falsch: Seine Eltern wollten, dass er studiert."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_b1_set_2_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Solarenergie auf Balkonen: Der Boom der Balkonkraftwerke)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Kleine steckerfertige Solaranlagen für den Balkon erleben in Deutschland einen historischen Boom. Über eine halbe Million Haushalte erzeugen inzwischen ihren eigenen Ökostrom direkt am Balkongeländer. Das spart pro Jahr rund 100 bis 200 Euro Stromkosten. Durch den Abbau bürokratischer Hürden ist die Anmeldung beim Netzbetreiber nun in wenigen Minuten online erledigt.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "goethe_b1_set_2_rq2",
            "questionNumber": 2,
            "questionText": "Was ist der Hauptvorteil von Balkonkraftwerken?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie erzeugen Ökostrom und senken die jährlichen Stromkosten um 100 bis 200 Euro",
                "isCorrect": true,
                "explanation": "Richtig: 'spart pro Jahr rund 100 bis 200 Euro Stromkosten'."
              },
              {
                "key": "b",
                "text": "Sie ersetzen alle Großkraftwerke sofort",
                "isCorrect": false,
                "explanation": "Falsch: Es sind kleine Zusatzanlagen."
              },
              {
                "key": "c",
                "text": "Man muss dafür ein ganzes Haus kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Sie sind für Balkone in Mietwohnungen gedacht."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_b1_set_2_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Radio-Kulturnachrichten)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_2_lq1",
            "questionNumber": 1,
            "questionText": "Was kostet der Eintritt am kommenden Sonntag?",
            "speaker": "Radio-Kulturnachrichten",
            "audioScript": "Zum Tag der offenen Denkmale öffnen am kommenden Sonntag über 500 historische Gebäude und Museen in unserer Region ihre Türen bei freiem Eintritt. Besondere Highlights sind geführte Touren im alten Wasserturm und die Lichtinstallation im Schlossgarten ab 20 Uhr.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Der Eintritt ist in allen teilnehmenden Gebäuden frei",
                "isCorrect": true,
                "explanation": "Richtig: 'öffnen... ihre Türen bei freiem Eintritt'."
              },
              {
                "key": "b",
                "text": "Erwachsene zahlen 15 Euro",
                "isCorrect": false,
                "explanation": "Falsch: Eintritt ist frei."
              },
              {
                "key": "c",
                "text": "Nur der Schlossgarten ist kostenlos",
                "isCorrect": false,
                "explanation": "Falsch: Über 500 Gebäude sind frei."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_b1_set_2_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Urlaubsantrag und Arbeitsübergabe)",
        "prompt": "Schreiben Sie eine E-Mail an Ihre Vorgesetzte Frau Dr. Klein (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Urlaubsantrag und Arbeitsübergabe'.",
        "leitpunkte": [
          "Zeitraum des gewünschten Sommerurlaubs",
          "Begründung für die Terminauswahl",
          "Regelung der Vertretung durch Kollegen",
          "Erreichbarkeit in dringenden Notfällen"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 100,
        "modelAnswer": "Sehr geehrte Frau Dr. Klein,\n\nich möchte hiermit meinen Sommerurlaub für den Zeitraum vom 1. bis 19. August beantragen. Ich habe diesen Termin gewählt, weil meine Familie in dieser Zeit Schulferien hat und wir eine gemeinsame Reise geplant haben.\n\nIch habe mich bereits mit meinem Kollegen Herrn Meyer abgestimmt. Er wird meine laufenden Projekte während meiner Abwesenheit betreuen und meine E-Mails im Blick behalten. Alle dringenden Aufgaben werde ich vor meinem Urlaub abschließen. In dringenden Notfällen bin ich per E-Mail erreichbar.\n\nIch freue mich über Ihre Genehmigung des Urlaubsantrags.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_b1_set_2_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollten Geschäfte in Deutschland auch sonntags öffnen dürfen?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollten Geschäfte in Deutschland auch sonntags öffnen dürfen?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner heutigen Präsentation ist: 'Sonntagsöffnung von Geschäften'. Ich habe dieses Thema gewählt, weil die Ladenöffnungszeiten am Wochenende immer wieder lebhaft diskutiert werden. In meiner persönlichen Erfahrung ist der ruhige Sonntag in Deutschland sehr angenehm, um mit der Familie Zeit zu verbringen. In meinem Heimatland haben die meisten Einkaufszentren sieben Tage die Woche rund um die Uhr geöffnet. Ein großer Vorteil einer Sonntagsöffnung wäre die höhere Flexibilität für Berufstätige, die unter der Woche wenig Zeit haben. Ein wesentlicher Nachteil ist jedoch die Belastung für die Verkäuferinnen und Verkäufer, die dann am Wochenende arbeiten müssten. Meiner Meinung nach sollte der Sonntag als gemeinsamer Ruhetag für Familien geschützt bleiben, mit wenigen Ausnahmen im Jahr. Herzlichen Dank für Ihre Aufmerksamkeit.",
        "points": 100
      }
    ]
  },
  {
    "id": "goethe_b1_set_3",
    "board": "GOETHE",
    "level": "B1",
    "setNumber": 3,
    "title": "Goethe-Zertifikat B1 - Mock Exam Set 3",
    "officialStandard": "Goethe-Zertifikat B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 60,
      "speaking": 15,
      "total": 180
    },
    "scoringRules": {
      "readingMax": 100,
      "listeningMax": 100,
      "writingMax": 100,
      "speakingMax": 100,
      "totalMax": 400,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "goethe_b1_set_3_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Nachhaltiges Reisen: Mit dem Nachtzug durch Europa)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Markus (31): 'Für meinen Urlaub in Wien und Rom habe ich auf Flüge verzichtet und stattdessen den Nachtzug gebucht. Im Schlafwagen bin ich am Abend in Berlin eingestiegen und am nächsten Morgen entspannt im Zentrum von Wien aufgewacht. Die Fahrt war umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_3_rq1",
            "questionNumber": 1,
            "questionText": "Welchen Vorteil des Nachtzugs hebt Markus hervor?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Klimafreundliches Reisen und gesparte Hotelübernachtungen",
                "isCorrect": true,
                "explanation": "Richtig: 'umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart'."
              },
              {
                "key": "b",
                "text": "Dass der Zug schneller als ein Flugzeug fliegt",
                "isCorrect": false,
                "explanation": "Falsch: Ein Zug fliegt nicht."
              },
              {
                "key": "c",
                "text": "Dass die Fahrt völlig kostenlos war",
                "isCorrect": false,
                "explanation": "Falsch: Nicht kostenlos."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_b1_set_3_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Pflegeberufe: Neue Chancen durch Digitalisierung)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "In deutschen Seniorenresidenzen und Krankenhäusern kommen zunehmend digitale Pflegedokumentationen und Sprachassistenten zum Einsatz. Pflegekräfte sparen dadurch bis zu 90 Minuten Dokumentationszeit pro Schicht. Diese gewonnene Zeit kommt direkt der menschlichen Zuwendung und Fürsorge für die Patienten zugute.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "goethe_b1_set_3_rq2",
            "questionNumber": 2,
            "questionText": "Wie hilft die Digitalisierung den Pflegekräften?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Sie spart bis zu 90 Minuten Schreibarbeit für mehr Zeit mit Patienten",
                "isCorrect": true,
                "explanation": "Richtig: 'sparen dadurch bis zu 90 Minuten Dokumentationszeit... kommt Zuwendung zugute'."
              },
              {
                "key": "b",
                "text": "Sie ersetzt alle Krankenschwestern durch Roboter",
                "isCorrect": false,
                "explanation": "Falsch: Pflegekräfte bleiben unersetzlich."
              },
              {
                "key": "c",
                "text": "Sie schließt die Krankenhäuser am Wochenende",
                "isCorrect": false,
                "explanation": "Falsch: Völlig unzutreffend."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_b1_set_3_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Telefonische Kursberatung Volkshochschule)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_3_lq1",
            "questionNumber": 1,
            "questionText": "An welchen Wochentagen findet der Sprachkurs statt?",
            "speaker": "Telefonische Kursberatung Volkshochschule",
            "audioScript": "Guten Tag, Sie interessieren sich für unseren B1-Abendkurs für Deutsch als Fremdsprache. Der Kurs findet dienstags und donnerstags von 18 bis 20 Uhr 15 statt. Der nächste Einstiegstermin ist der 15. Oktober. Ein kostenloser Einstufungstest kann vorab online auf unserer Website absolviert werden.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Dienstags und donnerstags von 18:00 bis 20:15 Uhr",
                "isCorrect": true,
                "explanation": "Richtig: 'dienstags und donnerstags von 18 bis 20 Uhr 15'."
              },
              {
                "key": "b",
                "text": "Nur samstags ganztägig",
                "isCorrect": false,
                "explanation": "Falsch: Dienstags und donnerstags."
              },
              {
                "key": "c",
                "text": "Täglich von 8 bis 12 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Es ist ein Abendkurs."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_b1_set_3_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Reklamation eines fehlerhaften Online-Kaufs)",
        "prompt": "Schreiben Sie eine Reklamations-E-Mail an den Kundenservice der Firma ElektroVersand (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Reklamation eines fehlerhaften Online-Kaufs'.",
        "leitpunkte": [
          "Bestellnummer und gelieferter Artikel (Kaffeemaschine)",
          "Beschreibung des Defekts (Gerät heizt nicht)",
          "Forderung nach Ersatzlieferung oder Gelderstattung",
          "Rücksendung des defekten Geräts"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 100,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nam 12. September habe ich in Ihrem Online-Shop eine Kaffeemaschine (Bestellnummer: EV-83921) bestellt. Die Lieferung traf gestern bei mir ein.\n\nLeider musste ich nach dem Auspacken feststellen, dass das Gerät defekt ist. Wenn man die Maschine einschaltet, läuft zwar die Pumpe, aber das Wasser wird überhaupt nicht warm. Ich bitte Sie daher höflich, mir umgehend ein funktionierendes Ersatzgerät zuzusenden oder mir den Kaufpreis auf mein Bankkonto zu erstatten.\n\nBitte senden Sie mir ein kostenloses Rücksendeetikett per E-Mail zu, damit ich das defekte Gerät an Sie zurückschicken kann.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_b1_set_3_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Brauchen Kinder und Jugendliche eigene Smartphones?)",
        "prompt": "Präsentieren Sie das Thema: 'Brauchen Kinder und Jugendliche eigene Smartphones?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner Präsentation ist: 'Smartphones für Kinder'. Ich habe dieses Thema gewählt, weil heute fast jedes Kind in der Schule ein Mobiltelefon besitzt. In meiner persönlichen Erfahrung lenkt das Smartphone beim Lernen oft ab, wenn keine klaren Regeln existieren. In meinem Heimatland nutzen Schüler Smartphones häufig auch im Unterricht für Recherchen. Ein großer Vorteil ist die ständige Erreichbarkeit im Notfall und der schnelle Zugang zu Wissensquellen. Ein ernster Nachteil ist jedoch das Risiko von Mediensucht und Konzentrationsschwächen. Zusammenfassend denke ich, dass Kinder erst ab ca. 12 Jahren ein eigenes Smartphone mit zeitlicher Begrenzung erhalten sollten. Vielen Dank für Ihre Aufmerksamkeit.",
        "points": 100
      }
    ]
  },
  {
    "id": "goethe_b1_set_4",
    "board": "GOETHE",
    "level": "B1",
    "setNumber": 4,
    "title": "Goethe-Zertifikat B1 - Mock Exam Set 4",
    "officialStandard": "Goethe-Zertifikat B1 Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
    "durationMinutes": {
      "reading": 65,
      "listening": 40,
      "writing": 60,
      "speaking": 15,
      "total": 180
    },
    "scoringRules": {
      "readingMax": 100,
      "listeningMax": 100,
      "writingMax": 100,
      "speakingMax": 100,
      "totalMax": 400,
      "passPercentage": 60,
      "passPointsWritten": null,
      "passPointsOral": null,
      "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
    },
    "readingSections": [
      {
        "teilId": "goethe_b1_set_4_read_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Globalverstehen (Blog: Ernährungsumstellung: Ein Jahr vegetarisch leben)",
        "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
        "readingPassage": "Blog von Sandra (27): 'Vor einem Jahr habe ich beschlossen, komplett auf Fleisch zu verzichten. Anfangs fehlten mir Rezeptideen, doch mittlerweile habe ich viele neue Gemüsesorten, Hülsenfrüchte und Gewürze entdeckt. Mein Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich insgesamt vitaler.'",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_4_rq1",
            "questionNumber": 1,
            "questionText": "Welche positive Veränderung hat Sandra bemerkt?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Besserer Schlaf, normalisierter Blutdruck und mehr Vitalität",
                "isCorrect": true,
                "explanation": "Richtig: 'Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich... vitaler'."
              },
              {
                "key": "b",
                "text": "Dass sie jetzt jeden Tag hungrig ist",
                "isCorrect": false,
                "explanation": "Falsch: Sie fühlt sich sehr vital."
              },
              {
                "key": "c",
                "text": "Sie möchte nie wieder kochen",
                "isCorrect": false,
                "explanation": "Falsch: Sie hat viele neue Rezepte entdeckt."
              }
            ]
          }
        ]
      },
      {
        "teilId": "goethe_b1_set_4_read_2",
        "teilNumber": 2,
        "teilTitle": "Teil 2: Detailverstehen (Pressebericht: Verpackungsfreies Einkaufen: Unverpackt-Läden im Aufwind)",
        "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
        "readingPassage": "Immer mehr Verbraucher in Deutschland bringen eigene Dosen und Gläser zum Einkaufen mit. In sogenannten Unverpackt-Läden werden Müsli, Nudeln und Waschmittel grammgenau abgewogen. Das spart pro Jahr Tonnen von Plastikmüll. Immer mehr traditionelle Supermärkte übernehmen dieses Konzept und richten eigene Unverpackt-Stationen ein.",
        "timeRecommendedMinutes": 20,
        "questions": [
          {
            "id": "goethe_b1_set_4_rq2",
            "questionNumber": 2,
            "questionText": "Wie funktioniert das Einkaufen im Unverpackt-Laden?",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Kunden bringen eigene Behälter mit und wiegen Waren grammgenau ab",
                "isCorrect": true,
                "explanation": "Richtig: 'bringen eigene Dosen und Gläser... grammgenau abgewogen'."
              },
              {
                "key": "b",
                "text": "Man darf Waren nur in Plastiktüten kaufen",
                "isCorrect": false,
                "explanation": "Falsch: Es ist unverpackt."
              },
              {
                "key": "c",
                "text": "Die Waren sind alle kostenlos",
                "isCorrect": false,
                "explanation": "Falsch: Man bezahlt nach Gewicht."
              }
            ]
          }
        ]
      }
    ],
    "listeningSections": [
      {
        "teilId": "goethe_b1_set_4_listen_1",
        "teilNumber": 1,
        "teilTitle": "Teil 1: Durchsagen & Mitteilungen (Arztpraxis-Ansage)",
        "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
        "timeRecommendedMinutes": 15,
        "questions": [
          {
            "id": "goethe_b1_set_4_lq1",
            "questionNumber": 1,
            "questionText": "Wann ist die Praxis während der Ferien geöffnet?",
            "speaker": "Arztpraxis-Ansage",
            "audioScript": "Guten Tag, hier spricht die Gemeinschaftspraxis Dr. Frank und Partner. Während der Sommerferien vom 1. bis 15. Juli ist unsere Praxis täglich von 8 bis 12 Uhr besetzt. Nachmittags ist die Praxis geschlossen. Die Vertretung übernimmt die Praxis Dr. Meissner in der Gartenstraße 4.",
            "points": 25,
            "options": [
              {
                "key": "a",
                "text": "Täglich von 8:00 bis 12:00 Uhr vormittags",
                "isCorrect": true,
                "explanation": "Richtig: 'täglich von 8 bis 12 Uhr besetzt'."
              },
              {
                "key": "b",
                "text": "Nur nachmittags ab 16 Uhr",
                "isCorrect": false,
                "explanation": "Falsch: Nachmittags ist geschlossen."
              },
              {
                "key": "c",
                "text": "Die Praxis ist zwei Wochen komplett zu",
                "isCorrect": false,
                "explanation": "Falsch: Vormittags ist geöffnet."
              }
            ]
          }
        ]
      }
    ],
    "writingTasks": [
      {
        "taskId": "goethe_b1_set_4_write_1",
        "taskTitle": "Schriftlicher Ausdruck: Formeller Brief / E-Mail (Bitte um Verschiebung eines Prüfungstermins)",
        "prompt": "Schreiben Sie eine offizielle E-Mail an das Prüfungszentrum (mindestens 80 Wörter).",
        "situation": "Sie schreiben eine offizielle Mitteilung zum Thema 'Bitte um Verschiebung eines Prüfungstermins'.",
        "leitpunkte": [
          "Angabe von Prüfungsnummer und gewähltem Datum",
          "Wichtiger Grund für den Verhinderungsfall (akute Erkrankung)",
          "Attest vom Arzt als Anlage",
          "Bitte um kostenfreie Umbuchung auf den nächsten Monat"
        ],
        "minWords": 80,
        "maxWords": 120,
        "points": 100,
        "modelAnswer": "Sehr geehrte Damen und Herren,\n\nich bin für die B1-Prüfung am kommenden Samstag (Teilnehmernummer: 928310) angemeldet. Leider muss ich Ihnen mitteilen, dass ich an diesem Prüfungstermin wegen einer akuten Erkrankung nicht teilnehmen kann.\n\nMein Arzt hat mir absolute Bettruhe verordnet. Ein entsprechendes ärztliches Attest habe ich dieser E-Mail als PDF-Datei beigefügt. Aus diesem Grund bitte ich Sie höflich, meine Prüfungsanmeldung kostenfrei auf den nächsten Prüfungstermin im kommenden Monat umzubuchen.\n\nIch danke Ihnen für Ihr Verständnis und freue mich auf Ihre schriftliche Bestätigung.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]"
      }
    ],
    "speakingTasks": [
      {
        "taskId": "goethe_b1_set_4_speak_1",
        "teilNumber": 2,
        "taskTitle": "Teil 2: Ein Thema präsentieren (Sollte das Arbeiten im Homeoffice gesetzlich erlaubt werden?)",
        "prompt": "Präsentieren Sie das Thema: 'Sollte das Arbeiten im Homeoffice gesetzlich erlaubt werden?'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
        "cardsOrQuestions": [
          "1. Einleitung & Themenvorstellung",
          "2. Persönliche Erfahrung",
          "3. Situation im Heimatland",
          "4. Vor- und Nachteile abwägen",
          "5. Eigene Meinung & Abschluss"
        ],
        "modelResponse": "Das Thema meiner kurzen Präsentation lautet: 'Recht auf Homeoffice'. Ich habe dieses Thema gewählt, weil seit der Pandemie viele Menschen von zu Hause aus arbeiten. In meiner persönlichen Erfahrung spart Homeoffice viel Fahrzeit im Berufsverkehr und ermöglicht eine ruhige Arbeitsatmosphäre. In meinem Heimatland arbeiten die meisten Beschäftigten noch traditionell vor Ort im Büro. Ein großer Vorteil von Homeoffice ist die bessere Vereinbarkeit von Familie und Beruf. Ein Nachteil ist jedoch der fehlende persönliche Kontakt zu Kollegen und die Gefahr, dass Arbeit und Freizeit verschwimmen. Zusammenfassend bin ich der Meinung, dass Beschäftigte ein Recht auf zwei Tage Homeoffice pro Woche haben sollten, wenn die Tätigkeit es erlaubt. Vielen Dank für Ihre Aufmerksamkeit.",
        "points": 100
      }
    ]
  }
];
