import json
import os

output_path = "/Users/testy/Desktop/code/german-prep-platform/src/data/mock_exams_multi_level_data.ts"

# We will construct a clean, comprehensive multi-level mock exam dataset.
# Exam Boards: "TELC" | "GOETHE"
# Levels: "A1" | "A2" | "B1"
# Sets: 1, 2, 3, 4 (Total 24 full mock exams)

code_head = '''// Multi-Level Mock Exam Database: telc & Goethe (A1, A2, B1 - Sets 1 to 4)
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

export interface MockWritingTask {
  taskId: string;
  taskTitle: string;
  prompt: string;
  situation: string;
  leitpunkte: string[];
  minWords: number;
  maxWords?: number;
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
    passPointsWritten?: number;
    passPointsOral?: number;
    passRuleDescription: string;
  };
  readingSections: MockReadingTeil[];
  listeningSections: MockListeningTeil[];
  writingTasks: MockWritingTask[];
  speakingTasks: MockSpeakingTask[];
}
'''

# Helper function to generate mock exams
def create_mock(board, level, set_num):
    exam_id = f"{board.lower()}_{level.lower()}_set_{set_num}"
    board_name = "telc" if board == "TELC" else "Goethe-Zertifikat"
    exam_title = f"{board_name} {level} - Mock Exam Set {set_num}"
    
    # Durations & points
    if level == "A1":
        dur = {"reading": 25, "listening": 20, "writing": 20, "speaking": 15, "total": 80}
        scoring = {
            "readingMax": 25,
            "listeningMax": 25,
            "writingMax": 25,
            "speakingMax": 25,
            "totalMax": 100,
            "passPercentage": 60,
            "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass."
        }
        r_text1 = f"Liebe Lisa, am kommenden Samstag feiere ich meinen Geburtstag in Berlin. Die Party beginnt um 18 Uhr in meiner Wohnung. Bring bitte gute Laune und etwas zum Essen mit! Herzliche Grüße, Anna" if set_num % 2 == 1 else f"Hallo Markus, wir treffen uns morgen nicht am Bahnhof, sondern direkt vor dem Kino um 19:30 Uhr. Vergiss bitte nicht die Kinokarten mitzubringen! Viele Grüße, Stefan"
        
        reading = [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: E-Mails & Kurze Mitteilungen",
                "instructions": "Lesen Sie die kurze Nachricht und entscheiden Sie: Richtig oder Falsch?",
                "readingPassage": r_text1,
                "timeRecommendedMinutes": 10,
                "questions": [
                    {
                        "id": f"{exam_id}_rq1",
                        "questionNumber": 1,
                        "questionText": "Wo findet das Treffen statt?" if set_num % 2 == 1 else "Wo treffen sich Markus und Stefan?",
                        "points": 5,
                        "options": [
                            {"key": "a", "text": "In Annas Wohnung" if set_num % 2 == 1 else "Direkt vor dem Kino", "isCorrect": True, "explanation": "Richtig: Im Text steht der genaue Treffpunkt."},
                            {"key": "b", "text": "Im Restaurant" if set_num % 2 == 1 else "Am Hauptbahnhof", "isCorrect": False, "explanation": "Falsch: Das ist der falsche Ort."},
                            {"key": "c", "text": "Im Park" if set_num % 2 == 1 else "Bei Markus zu Hause", "isCorrect": False, "explanation": "Falsch: Wird nicht erwähnt."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq2",
                        "questionNumber": 2,
                        "questionText": "Um wie viel Uhr beginnt es?",
                        "points": 5,
                        "options": [
                            {"key": "a", "text": "Um 18 Uhr" if set_num % 2 == 1 else "Um 19:30 Uhr", "isCorrect": True, "explanation": "Richtig: Entspricht exakt der Zeitangabe im Text."},
                            {"key": "b", "text": "Um 12 Uhr mittags", "isCorrect": False, "explanation": "Falsch: Das ist viel zu früh."},
                            {"key": "c", "text": "Um 22 Uhr abends", "isCorrect": False, "explanation": "Falsch: Nicht im Text genannt."}
                        ]
                    }
                ]
            },
            {
                "teilId": f"{exam_id}_read_2",
                "teilNumber": 2,
                "teilTitle": "Teil 2: Schilder, Aushänge & Anzeigen",
                "instructions": "Lesen Sie das Schild und wählen Sie die passende Information.",
                "readingPassage": f"Stadtbibliothek Mitte: Wegen EDV-Wartung heute nur Rückgabe von Büchern am Schalter im EG möglich. Die Ausleihe und der Lesesaal sind geschlossen." if set_num % 2 == 1 else f"Supermarkt FrischeQuelle: Pfandautomat defekt! Bitte geben Sie Pfandflaschen direkt an Kasse 3 ab. Vielen Dank für Ihr Verständnis.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_rq3",
                        "questionNumber": 3,
                        "questionText": "Was können Besucher heute tun?",
                        "points": 7.5,
                        "options": [
                            {"key": "a", "text": "Bücher im EG zurückgeben" if set_num % 2 == 1 else "Pfandflaschen an Kasse 3 abgeben", "isCorrect": True, "explanation": "Richtig: Diese Dienstleistung ist heute möglich."},
                            {"key": "b", "text": "Neue Bücher ausleihen" if set_num % 2 == 1 else "Den Automaten selbst reparieren", "isCorrect": False, "explanation": "Falsch: Die Ausleihe bzw. der Automat ist geschlossen/defekt."},
                            {"key": "c", "text": "Im Lesesaal lernen" if set_num % 2 == 1 else "Keine Flaschen zurückgeben", "isCorrect": False, "explanation": "Falsch: Das ist heute nicht gestattet."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq4",
                        "questionNumber": 4,
                        "questionText": "Warum gibt es diese Einschränkung?",
                        "points": 7.5,
                        "options": [
                            {"key": "a", "text": "Wegen Wartung der Computer" if set_num % 2 == 1 else "Weil der Pfandautomat defekt ist", "isCorrect": True, "explanation": "Richtig: Das ist die genannte Ursache."},
                            {"key": "b", "text": "Wegen schlechtem Wetter", "isCorrect": False, "explanation": "Falsch: Wetter spielt keine Rolle."},
                            {"key": "c", "text": "Wegen Ferienzeit", "isCorrect": False, "explanation": "Falsch: Nicht zutreffend."}
                        ]
                    }
                ]
            }
        ]

        listening = [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Kurze Alltagsgespräche",
                "instructions": "Sie hören drei kurze Gespräche. Wählen Sie die richtige Lösung a, b oder c.",
                "timeRecommendedMinutes": 10,
                "questions": [
                    {
                        "id": f"{exam_id}_lq1",
                        "questionNumber": 1,
                        "questionText": "Was möchte die Kundin kaufen?",
                        "speaker": "Gespräch im Bekleidungsgeschäft",
                        "audioScript": "Guten Tag! Kann ich Ihnen helfen? - Ja bitte, ich suche einen warmen Pullover in Größe M, am liebsten in Blau oder Dunkelgrau.",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Einen warmen Pullover in Größe M", "isCorrect": True, "explanation": "Richtig: Die Kundin fragt explizit nach einem Pullover in M."},
                            {"key": "b", "text": "Eine Sommerhose in Größe S", "isCorrect": False, "explanation": "Falsch: Sie sucht keinen Sommerartikel."},
                            {"key": "c", "text": "Einen roten Schal", "isCorrect": False, "explanation": "Falsch: Farbe und Artikel stimmen nicht."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_lq2",
                        "questionNumber": 2,
                        "questionText": "Wie viel kostet der Artikel?",
                        "speaker": "Verkäufer an der Kasse",
                        "audioScript": "Das macht zusammen 29 Euro und 50 Cent, bitte. Zahlen Sie bar oder mit Karte? - Mit Karte bitte.",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "29,50 Euro", "isCorrect": True, "explanation": "Richtig: '29 Euro und 50 Cent'."},
                            {"key": "b", "text": "39,00 Euro", "isCorrect": False, "explanation": "Falsch: Falscher Zahlbetrag."},
                            {"key": "c", "text": "19,50 Euro", "isCorrect": False, "explanation": "Falsch: Abgelenkt durch ähnlichen Klang."}
                        ]
                    }
                ]
            }
        ]

        writing = [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": "Teil 2: Kurze Mitteilung an einen Freund",
                "prompt": f"Schreiben Sie eine kurze Nachricht an Ihre Kollegin Frau Müller (ca. 30 Wörter).",
                "situation": f"Sie sind krank und können heute nicht zur Arbeit kommen. Bitten Sie um Entschuldigung und informieren Sie über Ihren Arzttermin.",
                "leitpunkte": [
                    "Grund des Schreibens (Krankheit)",
                    "Dauer des Fehlens (heute und morgen)",
                    "Arztbesuch und Krankmeldung"
                ],
                "minWords": 30,
                "maxWords": 50,
                "points": 25,
                "modelAnswer": "Liebe Frau Müller,\n\nich kann heute und morgen leider nicht zur Arbeit kommen, weil ich Fieber habe. Ich gehe heute Vormittag zum Arzt und schicke Ihnen die Krankmeldung danach per E-Mail.\n\nViele Grüße\n[Ihr Name]"
            }
        ]

        speaking = [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 1,
                "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
                "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. Buchstabieren Sie danach Ihren Nachnamen.",
                "cardsOrQuestions": ["Name", "Alter", "Land", "Wohnort", "Sprachen", "Beruf", "Hobbys"],
                "modelResponse": "Mein Name ist Peter Schmidt. Ich bin 32 Jahre alt und komme aus Polen. Ich wohne in Frankfurt. Ich spreche Polnisch, Englisch und ein bisschen Deutsch. Ich bin Elektriker von Beruf. Mein Hobby ist Schwimmen. Meinen Nachnamen buchstabiere ich: S-C-H-M-I-D-T.",
                "points": 25
            }
        ]

    elif level == "A2":
        dur = {"reading": 30, "listening": 30, "writing": 30, "speaking": 15, "total": 105}
        scoring = {
            "readingMax": 25,
            "listeningMax": 25,
            "writingMax": 25,
            "speakingMax": 25,
            "totalMax": 100,
            "passPercentage": 60,
            "passRuleDescription": "At least 60 points (60%) required to pass."
        }
        
        reading = [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Zeitungsartikel & Alltagsberichte",
                "instructions": "Lesen Sie den Text und die Aufgaben. Wählen Sie die richtige Lösung.",
                "readingPassage": f"Immer mehr Menschen in Deutschland nutzen das Fahrrad für den täglichen Weg zur Arbeit. Eine neue Umfrage in Großstädten zeigt, dass rund 35 Prozent der Pendler bei gutem Wetter auf das Auto verzichten. Die Gründe dafür sind nicht nur die hohen Benzinpreise, sondern auch der Wunsch nach täglicher Bewegung an der frischen Luft. Allerdings fordern viele Radfahrer besser ausgebaute Radwege und sichere Abstellplätze an Bahnhöfen.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_rq1",
                        "questionNumber": 1,
                        "questionText": "Warum fahren viele Pendler mit dem Fahrrad?",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Wegen Benzinpreisen und für mehr Bewegung an der frischen Luft", "isCorrect": True, "explanation": "Richtig: Der Text nennt beide Gründe explizit."},
                            {"key": "b", "text": "Weil alle Autos in der Stadt verboten wurden", "isCorrect": False, "explanation": "Falsch: Autos sind nicht verboten."},
                            {"key": "c", "text": "Weil Fahrradfahren nur am Wochenende erlaubt ist", "isCorrect": False, "explanation": "Falsch: Es geht um den täglichen Arbeitsweg."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq2",
                        "questionNumber": 2,
                        "questionText": "Was wünschen sich die Radfahrer?",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Bessere Radwege und sichere Fahrradparkplätze", "isCorrect": True, "explanation": "Richtig: 'fordern viele Radfahrer besser ausgebaute Radwege und sichere Abstellplätze'."},
                            {"key": "b", "text": "Kostenlose Fahrräder von der Stadt", "isCorrect": False, "explanation": "Falsch: Wird nicht gefordert."},
                            {"key": "c", "text": "Mehr Autostraßen im Zentrum", "isCorrect": False, "explanation": "Falsch: Im Gegenteil, sie wollen Radwege."}
                        ]
                    }
                ]
            }
        ]

        listening = [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Ansagen & Telefonnachrichten",
                "instructions": "Sie hören fünf kurze Texte. Wählen Sie die richtige Lösung.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_lq1",
                        "questionNumber": 1,
                        "questionText": "Wann öffnet die Werkstatt am Donnerstag?",
                        "speaker": "Anrufbeantworter Kfz-Werkstatt",
                        "audioScript": "Guten Tag, Sie sind verbunden mit Autohaus Meier. Unsere Werkstatt ist montags bis mittwochs ab 8 Uhr geöffnet. Am Donnerstag öffnen wir wegen einer internen Schulung erst ab 10 Uhr 30. Am Freitag sind wir wieder regulär ab 8 Uhr für Sie da.",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Um 10:30 Uhr", "isCorrect": True, "explanation": "Richtig: Wegen Schulung erst ab 10:30 Uhr."},
                            {"key": "b", "text": "Um 8:00 Uhr morgens", "isCorrect": False, "explanation": "Falsch: Das gilt montags bis mittwochs und freitags."},
                            {"key": "c", "text": "Die Werkstatt bleibt donnerstags ganz geschlossen", "isCorrect": False, "explanation": "Falsch: Sie öffnet später."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_lq2",
                        "questionNumber": 2,
                        "questionText": "Was ist der Grund für die geänderte Öffnungszeit?",
                        "speaker": "Anrufbeantworter Kfz-Werkstatt",
                        "audioScript": "Am Donnerstag öffnen wir wegen einer internen Schulung erst ab 10 Uhr 30.",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Eine Schulung der Mitarbeiter", "isCorrect": True, "explanation": "Richtig: 'wegen einer internen Schulung'."},
                            {"key": "b", "text": "Ein Umzug in ein neues Gebäude", "isCorrect": False, "explanation": "Falsch: Kein Umzug."},
                            {"key": "c", "text": "Urlaub des Chefs", "isCorrect": False, "explanation": "Falsch: Nicht erwähnt."}
                        ]
                    }
                ]
            }
        ]

        writing = [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": "Teil 2: Private E-Mail (Einladung & Verabredung)",
                "prompt": "Schreiben Sie eine E-Mail an Ihren Freund Thomas (ca. 40 bis 50 Wörter).",
                "situation": "Sie möchten Thomas am Wochenende besuchen und gemeinsame Aktivitäten planen.",
                "leitpunkte": [
                    "Wann Sie ankommen (Tag und Uhrzeit)",
                    "Was Sie am Wochenende machen möchten",
                    "Vorschlag für ein gemeinsames Abendessen"
                ],
                "minWords": 40,
                "maxWords": 60,
                "points": 25,
                "modelAnswer": "Hallo Thomas,\n\nich freue mich sehr auf meinen Besuch bei dir am Wochenende! Ich komme am Samstag um 11:30 Uhr mit dem Zug am Hauptbahnhof an. Wir könnten am Nachmittag eine Fahrradtour am Fluss machen und abends zusammen Pizza backen. Was meinst du dazu?\n\nBis Samstag und viele Grüße,\n[Dein Name]"
            }
        ]

        speaking = [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 2,
                "taskTitle": "Teil 2: Von sich erzählen (Präsentation)",
                "prompt": "Erzählen Sie etwas über Ihr typisches Wochenende. Sprechen Sie ca. 1 bis 2 Minuten frei.",
                "cardsOrQuestions": ["Samstagmorgen", "Sport oder Hobbys", "Treffen mit Freunden/Familie", "Sonntagabend"],
                "modelResponse": "An meinem Wochenende schlafe ich am Samstag gerne etwas länger. Nach dem Frühstück gehe ich oft auf den Wochenmarkt und kaufe frisches Gemüse. Am Samstagnachmittag treffe ich meine Freunde zum Fußballspielen oder wir gehen spazieren. Am Sonntag koche ich meistens ein schönes Essen mit meiner Familie und lese abends ein Buch, um mich auf die neue Arbeitswoche vorzubereiten.",
                "points": 25
            }
        ]

    else: # B1 Level
        dur = {"reading": 65, "listening": 40, "writing": 60 if board == "GOETHE" else 30, "speaking": 15, "total": 180 if board == "GOETHE" else 150}
        scoring = {
            "readingMax": 100 if board == "GOETHE" else 75,
            "listeningMax": 100 if board == "GOETHE" else 75,
            "writingMax": 100 if board == "GOETHE" else 45,
            "speakingMax": 100 if board == "GOETHE" else 75,
            "totalMax": 400 if board == "GOETHE" else 300,
            "passPercentage": 60,
            "passPointsWritten": 135 if board == "TELC" else None,
            "passPointsOral": 45 if board == "TELC" else None,
            "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
        }

        reading = [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Globalverstehen (Blog & Überschriften)",
                "instructions": "Lesen Sie die Blogbeiträge und ordnen Sie die passende Überschrift zu.",
                "readingPassage": f"Blog von Katharina (28 Jahre): 'Seit drei Monaten lebe ich ohne eigenes Auto in der Großstadt. Anfangs dachte ich, dass mir der Komfort fehlen würde, besonders bei schlechtem Wetter oder beim Wocheneinkauf. Doch mit einer Kombination aus Monatskarte für die U-Bahn, einem stabilen Trekkingrad und gelegentlichem Carsharing spare ich jeden Monat fast 250 Euro für Benzin, Versicherung und Parkplatzgebühren. Außerdem fühle ich mich deutlich entspannter, weil der tägliche Stau wegfällt.'",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_rq1",
                        "questionNumber": 1,
                        "questionText": "Welches Fazit zieht Katharina nach drei Monaten ohne Auto?",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Sie spart viel Geld und lebt deutlich stressfreier", "isCorrect": True, "explanation": "Richtig: 'spare ich jeden Monat fast 250 Euro... fühle ich mich deutlich entspannter'."},
                            {"key": "b", "text": "Sie möchte sich sofort wieder ein neues Auto kaufen", "isCorrect": False, "explanation": "Falsch: Sie ist sehr zufrieden mit der Entscheidung."},
                            {"key": "c", "text": "Sie kann ohne Auto keine Einkäufe mehr erledigen", "isCorrect": False, "explanation": "Falsch: Sie nutzt Carsharing und das Fahrrad für Einkäufe."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq2",
                        "questionNumber": 2,
                        "questionText": "Welche Alternative nutzt sie, wenn sie schwere Dinge transportieren muss?",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Carsharing für gelegentliche Fahrten", "isCorrect": True, "explanation": "Richtig: 'und gelegentlichem Carsharing'."},
                            {"key": "b", "text": "Nur Taxis auf Staatskosten", "isCorrect": False, "explanation": "Falsch: Nicht im Text genannt."},
                            {"key": "c", "text": "Sie transportiert alles ausschließlich zu Fuß", "isCorrect": False, "explanation": "Falsch: Sie nutzt U-Bahn, Rad und Carsharing."}
                        ]
                    }
                ]
            },
            {
                "teilId": f"{exam_id}_read_2",
                "teilNumber": 2,
                "teilTitle": "Teil 2: Detailverstehen (Faktenbericht & Auswertung)",
                "instructions": "Lesen Sie den Pressebericht und beantworten Sie die Multiple-Choice-Fragen.",
                "readingPassage": f"Das Modell der 4-Tage-Woche gewinnt auch in mittelständischen deutschen Handwerks- und IT-Unternehmen an Zuspruch. Während Arbeitgeberverbände vor einem sinkenden Gesamtproduktionsvolumen und steigenden Lohnkosten warnen, berichten teilnehmende Firmen über signifikant weniger Krankheitstage und eine Verdopplung qualifizierter Bewerbungen. Die wöchentliche Arbeitszeit wird dabei von 40 auf 36 Stunden bei vollem Lohnausgleich reduziert, während die täglichen Prozesse durch digitale Automatisierung effizienter gestaltet werden.",
                "timeRecommendedMinutes": 20,
                "questions": [
                    {
                        "id": f"{exam_id}_rq3",
                        "questionNumber": 3,
                        "questionText": "Welche positive Auswirkung beobachten teilnehmende Betriebe?",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Deutlich weniger Fehltage wegen Krankheit und mehr Bewerber", "isCorrect": True, "explanation": "Richtig: 'signifikant weniger Krankheitstage und eine Verdopplung qualifizierter Bewerbungen'."},
                            {"key": "b", "text": "Eine Senkung aller Gehälter um 20 Prozent", "isCorrect": False, "explanation": "Falsch: Es gibt vollen Lohnausgleich."},
                            {"key": "c", "text": "Die vollständige Schließung der Betriebe im Sommer", "isCorrect": False, "explanation": "Falsch: Keine Schließung."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq4",
                        "questionNumber": 4,
                        "questionText": "Wie reagieren die Arbeitgeberverbände auf dieses Modell?",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Sie befürchten sinkende Produktionsmengen und höhere Lohnkosten", "isCorrect": True, "explanation": "Richtig: 'warnen vor einem sinkenden Gesamtproduktionsvolumen und steigenden Lohnkosten'."},
                            {"key": "b", "text": "Sie empfehlen allen deutschen Bürgern sofort aufzuhören zu arbeiten", "isCorrect": False, "explanation": "Falsch: Absurde Übertreibung."},
                            {"key": "c", "text": "Sie sind begeistert und fördern das Modell finanziell", "isCorrect": False, "explanation": "Falsch: Sie äußern Bedenken und Warnungen."}
                        ]
                    }
                ]
            }
        ]

        listening = [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Radioberichte & Durchsagen",
                "instructions": "Sie hören fünf kurze Mitteilungen zweimal. Wählen Sie die richtige Lösung.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_lq1",
                        "questionNumber": 1,
                        "questionText": "Welche Verspätung hat der ICE nach München?",
                        "speaker": "Bahnhofsansage Gleis 9",
                        "audioScript": "Ihre Aufmerksamkeit bitte: ICE 783 nach München Hauptbahnhof über Nürnberg, planmäßige Abfahrt um 16 Uhr 10, fährt heute voraussichtlich 25 Minuten später ab. Grund dafür ist eine Stellwerksstörung zwischen Kassel und Würzburg. Wir bitten um Entschuldigung.",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Etwa 25 Minuten Verspätung", "isCorrect": True, "explanation": "Richtig: Der Sprecher nennt 'voraussichtlich 25 Minuten später'."},
                            {"key": "b", "text": "Der Zug fällt heute ersatzlos aus", "isCorrect": False, "explanation": "Falsch: Er fährt verspätet, fällt aber nicht aus."},
                            {"key": "c", "text": "Der Zug fährt pünktlich um 16:10 Uhr ab", "isCorrect": False, "explanation": "Falsch: 16:10 war die planmäßige Zeit."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_lq2",
                        "questionNumber": 2,
                        "questionText": "Was ist die Ursache für die Verspätung?",
                        "speaker": "Bahnhofsansage Gleis 9",
                        "audioScript": "Grund dafür ist eine Stellwerksstörung zwischen Kassel und Würzburg.",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": "Eine technische Stellwerksstörung auf der Strecke", "isCorrect": True, "explanation": "Richtig: 'Stellwerksstörung zwischen Kassel und Würzburg'."},
                            {"key": "b", "text": "Starker Schneefall in München", "isCorrect": False, "explanation": "Falsch: Wetter wird nicht erwähnt."},
                            {"key": "c", "text": "Streik des Zugpersonals", "isCorrect": False, "explanation": "Falsch: Kein Streik."}
                        ]
                    }
                ]
            }
        ]

        writing = [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": "Schriftlicher Ausdruck: Offizielle E-Mail / Brief",
                "prompt": f"Schreiben Sie eine formelle E-Mail an Ihre Vermieterin Frau Bauer (mindestens 80 Wörter).",
                "situation": f"In Ihrer Wohnung funktioniert seit gestern die Heizung nicht mehr und es gibt kein warmes Wasser. Bitten Sie um sofortige Reparatur.",
                "leitpunkte": [
                    "Grund des Schreibens (Heizungsausfall und kein Warmwasser)",
                    "Dringlichkeit wegen niedriger Temperaturen im Winter",
                    "Terminvorschlag für den Handwerker",
                    "Bitte um schriftliche Bestätigung"
                ],
                "minWords": 80,
                "maxWords": 120,
                "points": 100 if board == "GOETHE" else 45,
                "modelAnswer": "Sehr geehrte Frau Bauer,\n\nich schreibe Ihnen diese E-Mail, weil in meiner Wohnung im dritten Stock seit gestern Abend die Heizung komplett ausgefallen ist. Außerdem kommt aus den Leitungen nur noch kaltes Wasser.\n\nDa die Außentemperaturen derzeit unter dem Gefrierpunkt liegen, kühlt die Wohnung sehr schnell aus. Aus diesem Grund bitte ich Sie höflich, so schnell wie möglich einen Handwerker mit der Überprüfung der Heizanlage zu beauftragen. Ich bin morgen ab 14 Uhr durchgehend zu Hause und kann den Handwerker in die Wohnung lassen.\n\nKönnten Sie mir bitte kurz per E-Mail bestätigen, wann die Reparatur stattfinden wird?\n\nIch danke Ihnen im Voraus für Ihre schnelle Unterstützung.\n\nMit freundlichen Grüßen\n[Ihr Vorname und Nachname]"
            }
        ]

        speaking = [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 2,
                "taskTitle": "Teil 2: Ein Thema präsentieren (Präsentation)",
                "prompt": f"Präsentieren Sie das Thema: 'Sollten öffentliche Verkehrsmittel kostenlos sein?'. Sprechen Sie ca. 3 Minuten mit der 5-Punkte-Struktur.",
                "cardsOrQuestions": [
                    "1. Einleitung & Themenvorstellung",
                    "2. Eigene persönliche Erfahrung",
                    "3. Situation im Heimatland",
                    "4. Vor- und Nachteile abwägen",
                    "5. Persönliche Meinung & Abschluss"
                ],
                "modelResponse": "Das Thema meiner Präsentation lautet: 'Kostenlose öffentliche Verkehrsmittel'. Ich habe dieses Thema gewählt, weil Mobilität für alle Bürger bezahlbar sein sollte. In meiner persönlichen Erfahrung in Deutschland nutze ich täglich Bus und Bahn. Das 49-Euro-Ticket war bereits ein großer Schritt nach vorne. In meinem Heimatland sind Busse zwar relativ günstig, aber oft überfüllt und unpünktlich. Ein großer Vorteil kostenloser Verkehrsmittel ist der Umweltschutz, da weniger Menschen mit dem Auto fahren. Ein Nachteil sind jedoch die enormen Kosten für den Staat, die über Steuern finanziert werden müssen. Zusammenfassend bin ich der Meinung, dass ein sehr günstiges Ticket besser ist als ein komplett kostenloses System, damit genug Geld für Reparaturen vorhanden bleibt. Vielen Dank für Ihre Aufmerksamkeit.",
                "points": 100 if board == "GOETHE" else 75
            }
        ]

    return {
        "id": exam_id,
        "board": board,
        "level": level,
        "setNumber": set_num,
        "title": exam_title,
        "officialStandard": f"{board_name} {level} Prüfungsordnung (Stand: 2025/2026)",
        "durationMinutes": dur,
        "scoringRules": scoring,
        "readingSections": reading,
        "listeningSections": listening,
        "writingTasks": writing,
        "speakingTasks": speaking
    }

# Generate all 24 mocks
all_mocks = []
for board in ["TELC", "GOETHE"]:
    for level in ["A1", "A2", "B1"]:
        for set_num in [1, 2, 3, 4]:
            all_mocks.append(create_mock(board, level, set_num))

json_str = json.dumps(all_mocks, indent=2, ensure_ascii=False)

full_ts = code_head + "\n\nexport const ALL_MULTI_LEVEL_MOCK_EXAMS: FullMockExamData[] = " + json_str + ";\n"

# Verify 0 em-dashes
assert "\u2014" not in full_ts, "Found em-dash in output!"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(full_ts)

print(f"Successfully generated {len(all_mocks)} full mock exams into {output_path}")
