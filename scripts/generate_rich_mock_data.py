import json
import os

output_path = "/Users/testy/Desktop/code/german-prep-platform/src/data/mock_exams_multi_level_data.ts"

head_code = '''// Multi-Level Mock Exam Database: telc & Goethe (A1, A2, B1 - Sets 1 to 4)
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
'''

def generate_a1_mock(board, set_num):
    exam_id = f"{board.lower()}_a1_set_{set_num}"
    board_name = "telc Deutsch A1" if board == "TELC" else "Goethe-Zertifikat A1"
    
    # 4 distinct scenarios for Sets 1-4
    scenarios = [
        {
            "r1_text": "Liebe Maria,\nich lade dich herzlich zu meiner Geburtstagsparty am Samstag, 14. Oktober ein. Wir feiern ab 17 Uhr bei mir zu Hause in der Goethestraße 12. Bitte sag mir bis Donnerstag Bescheid, ob du kommen kannst. Bring bitte etwas zum Knabbern mit!\nLiebe Grüße,\nSarah",
            "r1_q1": "Wann findet die Geburtstagsparty statt?",
            "r1_q1_opts": [
                {"key": "a", "text": "Am Samstag, 14. Oktober ab 17 Uhr", "isCorrect": True, "explanation": "Richtig: 'am Samstag, 14. Oktober... ab 17 Uhr'."},
                {"key": "b", "text": "Am Donnerstag um 12 Uhr", "isCorrect": False, "explanation": "Falsch: Donnerstag ist nur die Frist für die Rückmeldung."},
                {"key": "c", "text": "In einem Restaurant", "isCorrect": False, "explanation": "Falsch: Sie feiern bei Sarah zu Hause."}
            ],
            "r1_q2": "Was soll Maria mitbringen?",
            "r1_q2_opts": [
                {"key": "a", "text": "Etwas zum Knabbern", "isCorrect": True, "explanation": "Richtig: 'Bring bitte etwas zum Knabbern mit'."},
                {"key": "b", "text": "Ein teures Geschenk", "isCorrect": False, "explanation": "Falsch: Nicht erwähnt."},
                {"key": "c", "text": "Einen neuen Fernseher", "isCorrect": False, "explanation": "Falsch: Völlig unzutreffend."}
            ],
            "r2_text": "Arztpraxis Dr. Bergmann: Liebe Patientinnen und Patienten, die Praxis bleibt am Freitag, den 20. Mai wegen Fortbildung geschlossen. In dringenden Fällen wenden Sie sich bitte an die Notfallpraxis im Stadtkrankenhaus (Telefon: 116 117). Ab Montag sind wir wieder erreichbar.",
            "r2_q1": "Warum ist die Arztpraxis am Freitag geschlossen?",
            "r2_q1_opts": [
                {"key": "a", "text": "Wegen einer Fortbildung des Teams", "isCorrect": True, "explanation": "Richtig: 'wegen Fortbildung geschlossen'."},
                {"key": "b", "text": "Weil der Arzt Urlaub am Strand macht", "isCorrect": False, "explanation": "Falsch: Nicht im Text genannt."},
                {"key": "c", "text": "Wegen Renovierungsarbeiten", "isCorrect": False, "explanation": "Falsch: Es ist eine Fortbildung."}
            ],
            "r2_q2": "Wohin können Patienten in Notfällen gehen?",
            "r2_q2_opts": [
                {"key": "a", "text": "In die Notfallpraxis im Stadtkrankenhaus", "isCorrect": True, "explanation": "Richtig: 'an die Notfallpraxis im Stadtkrankenhaus'."},
                {"key": "b", "text": "Zu keinem Arzt vor Montag", "isCorrect": False, "explanation": "Falsch: Die Notfallpraxis ist offen."},
                {"key": "c", "text": "Zur Polizei", "isCorrect": False, "explanation": "Falsch: Falsche Anlaufstelle."}
            ],
            "r3_text": "Bäckerei Sonnenschein: Frische Brötchen und Brot! Öffnungszeiten: Mo-Fr 6:30 bis 18:30 Uhr, Sa 7:00 bis 13:00 Uhr. Sonntags geschlossen.",
            "r3_q1": "Kann man am Sonntag um 8 Uhr Brötchen kaufen?",
            "r3_q1_opts": [
                {"key": "a", "text": "Nein, sonntags ist die Bäckerei geschlossen", "isCorrect": True, "explanation": "Richtig: 'Sonntags geschlossen'."},
                {"key": "b", "text": "Ja, von 7 bis 13 Uhr", "isCorrect": False, "explanation": "Falsch: Das gilt nur samstags."},
                {"key": "c", "text": "Ja, aber nur bis 12 Uhr", "isCorrect": False, "explanation": "Falsch: Sonntags geschlossen."}
            ],
            "l1_script": "Achtung an Gleis 2: Der Regionalexpress nach Stuttgart über Heidelberg, Abfahrt um 9 Uhr 25, fährt heute von Gleis 5 ab. Grund dafür ist eine Gleisänderung.",
            "l1_q": "Von welchem Gleis fährt der Zug nach Stuttgart ab?",
            "l1_opts": [
                {"key": "a", "text": "Von Gleis 5", "isCorrect": True, "explanation": "Richtig: Der Zug fährt heute von Gleis 5 ab."},
                {"key": "b", "text": "Von Gleis 2", "isCorrect": False, "explanation": "Falsch: Gleis 2 war das planmäßige Gleis."},
                {"key": "c", "text": "Von Gleis 9", "isCorrect": False, "explanation": "Falsch: 9 Uhr 25 war die Abfahrtszeit."}
            ],
            "l2_script": "Guten Tag, hier spricht Frau Weber von der Zahnarztpraxis Dr. Schmidt. Herr Wagner, Ihr Termin morgen um 15 Uhr muss leider auf 16 Uhr 30 verschoben werden. Bitte rufen Sie kurz zurück.",
            "l2_q": "Auf welche Uhrzeit wird der Termin verschoben?",
            "l2_opts": [
                {"key": "a", "text": "Auf 16:30 Uhr", "isCorrect": True, "explanation": "Richtig: 'auf 16 Uhr 30 verschoben'."},
                {"key": "b", "text": "Auf 15:00 Uhr", "isCorrect": False, "explanation": "Falsch: 15 Uhr war der alte Termin."},
                {"key": "c", "text": "Auf 10:00 Uhr morgens", "isCorrect": False, "explanation": "Falsch: Nicht genannt."}
            ],
            "w_sit": "Sie möchten im Hotel Lindenhof ein Zimmer für zwei Nächte buchen.",
            "w_model": "Sehr geehrte Damen und Herren,\n\nich möchte ein Doppelzimmer vom 10. bis 12. Juli für zwei Personen reservieren. Wie viel kostet das Zimmer pro Nacht inklusive Frühstück? Bitte senden Sie mir eine Bestätigung per E-Mail.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
        },
        {
            "r1_text": "Hallo David,\nwir wollen am Sonntag zusammen am Baggersee grillen. Das Wetter soll sehr sonnig und warm werden. Wir treffen uns um 13 Uhr am Parkplatz vor dem See. Bring bitte Grillwürstchen und etwas zu trinken mit!\nBis Sonntag,\nFelix",
            "r1_q1": "Was haben Felix und David vor?",
            "r1_q1_opts": [
                {"key": "a", "text": "Sie wollen am Sonntag am See grillen", "isCorrect": True, "explanation": "Richtig: 'am Sonntag zusammen am Baggersee grillen'."},
                {"key": "b", "text": "Sie wollen im Restaurant frühstücken", "isCorrect": False, "explanation": "Falsch: Sie gehen grillen."},
                {"key": "c", "text": "Sie kaufen ein Auto am Parkplatz", "isCorrect": False, "explanation": "Falsch: Sie treffen sich dort zum Grillen."}
            ],
            "r1_q2": "Wo ist der Treffpunkt?",
            "r1_q2_opts": [
                {"key": "a", "text": "Am Parkplatz vor dem See", "isCorrect": True, "explanation": "Richtig: 'am Parkplatz vor dem See'."},
                {"key": "b", "text": "Am Hauptbahnhof", "isCorrect": False, "explanation": "Falsch: Falscher Treffpunkt."},
                {"key": "c", "text": "In Felix' Küche", "isCorrect": False, "explanation": "Falsch: Nicht im Text genannt."}
            ],
            "r2_text": "Supermarkt FrischeMarkt: Wegen Inventur schließt unsere Filiale am Samstag bereits um 16 Uhr statt um 20 Uhr. Ab Montag stehen wir Ihnen wieder zu den gewohnten Öffnungszeiten zur Verfügung.",
            "r2_q1": "Wann schließt der Supermarkt am Samstag?",
            "r2_q1_opts": [
                {"key": "a", "text": "Bereits um 16:00 Uhr", "isCorrect": True, "explanation": "Richtig: 'schließt... bereits um 16 Uhr'."},
                {"key": "b", "text": "Um 20:00 Uhr wie gewohnt", "isCorrect": False, "explanation": "Falsch: 20 Uhr war die normale Zeit."},
                {"key": "c", "text": "Der Markt öffnet gar nicht", "isCorrect": False, "explanation": "Falsch: Er ist bis 16 Uhr offen."}
            ],
            "r2_q2": "Was ist der Grund für die frühere Schließung?",
            "r2_q2_opts": [
                {"key": "a", "text": "Die jährliche Inventur", "isCorrect": True, "explanation": "Richtig: 'Wegen Inventur'."},
                {"key": "b", "text": "Feuer im Gebäude", "isCorrect": False, "explanation": "Falsch: Keine Panik."},
                {"key": "c", "text": "Streik der Mitarbeiter", "isCorrect": False, "explanation": "Falsch: Nicht erwähnt."}
            ],
            "r3_text": "Fahrradreparatur RadFix: Reparaturannahme montags bis freitags von 8 bis 17 Uhr. Reifenwechsel ohne Voranmeldung in 30 Minuten möglich. Samstags geschlossen.",
            "r3_q1": "Muss man für einen Reifenwechsel vorher einen Termin buchen?",
            "r3_q1_opts": [
                {"key": "a", "text": "Nein, Reifenwechsel ist ohne Voranmeldung möglich", "isCorrect": True, "explanation": "Richtig: 'Reifenwechsel ohne Voranmeldung in 30 Minuten möglich'."},
                {"key": "b", "text": "Ja, mindestens zwei Wochen vorher", "isCorrect": False, "explanation": "Falsch: Ausdrücklich ohne Voranmeldung."},
                {"key": "c", "text": "Nur samstags nach Vereinbarung", "isCorrect": False, "explanation": "Falsch: Samstags ist geschlossen."}
            ],
            "l1_script": "Sehr geehrte Fluggäste nach Wien: Flug LH 3482, geplant um 11 Uhr 15, ist nun zum Einsteigen an Flugsteig B 18 bereit. Bitte halten Sie Ihren Ausweis und Ihre Bordkarte bereit.",
            "l1_q": "An welchem Flugsteig findet das Einsteigen statt?",
            "l1_opts": [
                {"key": "a", "text": "An Flugsteig B 18", "isCorrect": True, "explanation": "Richtig: 'Flugsteig B 18'."},
                {"key": "b", "text": "An Flugsteig A 12", "isCorrect": False, "explanation": "Falsch: Falscher Flugsteig."},
                {"key": "c", "text": "An Flugsteig C 34", "isCorrect": False, "explanation": "Falsch: Nicht genannt."}
            ],
            "l2_script": "Hallo Julia, hier ist Florian. Ich stehe leider im Stau auf der Autobahn. Ich schaffe es nicht um 18 Uhr ins Kino, sondern komme erst um 18 Uhr 45. Geh bitte schon rein und kauf die Karten!",
            "l2_q": "Wann kommt Florian voraussichtlich am Kino an?",
            "l2_opts": [
                {"key": "a", "text": "Um 18:45 Uhr", "isCorrect": True, "explanation": "Richtig: 'komme erst um 18 Uhr 45'."},
                {"key": "b", "text": "Pünktlich um 18:00 Uhr", "isCorrect": False, "explanation": "Falsch: Er steht im Stau."},
                {"key": "c", "text": "Er kommt heute gar nicht mehr", "isCorrect": False, "explanation": "Falsch: Er kommt 45 Minuten später."}
            ],
            "w_sit": "Sie können wegen einer Erkältung heute nicht zum Deutschkurs kommen.",
            "w_model": "Liebe Frau Schneider,\n\nich kann heute leider nicht zum Deutschkurs kommen, weil ich stark erkältet bin und Husten habe. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Am Mittwoch bin ich wieder da.\n\nViele Grüße,\n[Ihr Name]"
        },
        {
            "r1_text": "Guten Tag Herr Becker,\nIhre bestellte Winterjacke ist bei uns in der Filiale SportWelt eingetroffen. Sie können die Jacke innerhalb von 10 Werktagen an der Kasse abholen. Bitte bringen Sie Ihren Personalausweis und die Bestellnummer mit.\nMit freundlichen Grüßen,\nIhr SportWelt-Team",
            "r1_q1": "Was teilt das Geschäft Herrn Becker mit?",
            "r1_q1_opts": [
                {"key": "a", "text": "Dass seine bestellte Jacke abholbereit ist", "isCorrect": True, "explanation": "Richtig: 'Ihre bestellte Winterjacke ist... eingetroffen'."},
                {"key": "b", "text": "Dass die Jacke leider ausverkauft ist", "isCorrect": False, "explanation": "Falsch: Die Jacke ist da."},
                {"key": "c", "text": "Dass er mehr Geld überweisen muss", "isCorrect": False, "explanation": "Falsch: Keine Zahlungsaufforderung."}
            ],
            "r1_q2": "Was muss Herr Becker zur Abholung mitbringen?",
            "r1_q2_opts": [
                {"key": "a", "text": "Personalausweis und Bestellnummer", "isCorrect": True, "explanation": "Richtig: 'bringen Sie Ihren Personalausweis und die Bestellnummer mit'."},
                {"key": "b", "text": "Nur Bargeld", "isCorrect": False, "explanation": "Falsch: Ausweis und Nummer sind verlangt."},
                {"key": "c", "text": "Ein Foto seiner alten Jacke", "isCorrect": False, "explanation": "Falsch: Völlig falsch."}
            ],
            "r2_text": "Schwimmbad AquaFit: Wegen Reinigungsarbeiten im Hallenbad ist das Schwimmbecken vom 1. bis 5. September gesperrt. Die Sauna und der Fitnessbereich sind wie gewohnt täglich ab 9 Uhr geöffnet.",
            "r2_q1": "Was ist vom 1. bis 5. September gesperrt?",
            "r2_q1_opts": [
                {"key": "a", "text": "Das Schwimmbecken im Hallenbad", "isCorrect": True, "explanation": "Richtig: 'ist das Schwimmbecken... gesperrt'."},
                {"key": "b", "text": "Die gesamte Anlage inklusive Sauna", "isCorrect": False, "explanation": "Falsch: Sauna ist geöffnet."},
                {"key": "c", "text": "Nur der Parkplatz", "isCorrect": False, "explanation": "Falsch: Nicht der Parkplatz."}
            ],
            "r2_q2": "Dürfen Gäste die Sauna benutzen?",
            "r2_q2_opts": [
                {"key": "a", "text": "Ja, die Sauna ist wie gewohnt geöffnet", "isCorrect": True, "explanation": "Richtig: 'Sauna und Fitnessbereich sind wie gewohnt... geöffnet'."},
                {"key": "b", "text": "Nein, die Sauna wird auch gereinigt", "isCorrect": False, "explanation": "Falsch: Sauna bleibt offen."},
                {"key": "c", "text": "Nur nach 22 Uhr", "isCorrect": False, "explanation": "Falsch: Ab 9 Uhr morgens."}
            ],
            "r3_text": "Museum für Kunst: Eintritt frei für Kinder und Jugendliche unter 18 Jahren. Erwachsene zahlen 8 Euro. Montags ist das Museum geschlossen.",
            "r3_q1": "Muss ein 15-jähriger Schüler Eintritt bezahlen?",
            "r3_q1_opts": [
                {"key": "a", "text": "Nein, der Eintritt ist für ihn frei", "isCorrect": True, "explanation": "Richtig: 'Eintritt frei für Kinder und Jugendliche unter 18 Jahren'."},
                {"key": "b", "text": "Ja, er zahlt den vollen Preis von 8 Euro", "isCorrect": False, "explanation": "Falsch: Unter 18 ist frei."},
                {"key": "c", "text": "Er zahlt 4 Euro", "isCorrect": False, "explanation": "Falsch: Keine halbe Gebühr."}
            ],
            "l1_script": "Kundendurchsage im Kaufhaus Galeria: Sehr geehrte Kundinnen und Kunden, wir haben in der Damenabteilung im ersten Stock einen schwarzen Schlüsselbund gefunden. Der Besitzer kann die Schlüssel an der Hauptkasse im Erdgeschoss abholen.",
            "l1_q": "Wo kann der verlorene Schlüsselbund abgeholt werden?",
            "l1_opts": [
                {"key": "a", "text": "An der Hauptkasse im Erdgeschoss", "isCorrect": True, "explanation": "Richtig: 'an der Hauptkasse im Erdgeschoss'."},
                {"key": "b", "text": "Im dritten Stock bei den Möbeln", "isCorrect": False, "explanation": "Falsch: Falsches Stockwerk."},
                {"key": "c", "text": "Draußen auf dem Parkplatz", "isCorrect": False, "explanation": "Falsch: An der Hauptkasse."}
            ],
            "l2_script": "Guten Tag Frau Meyer, hier spricht Herr Schulz von der Wohnungsverwaltung. Wir schicken morgen um 11 Uhr den Elektriker zu Ihnen, um den Herd anzuschließen. Bitte seien Sie zu Hause.",
            "l2_q": "Warum kommt der Handwerker zu Frau Meyer?",
            "l2_opts": [
                {"key": "a", "text": "Um den Küchenherd anzuschließen", "isCorrect": True, "explanation": "Richtig: 'um den Herd anzuschließen'."},
                {"key": "b", "text": "Um die Fenster zu putzen", "isCorrect": False, "explanation": "Falsch: Es ist ein Elektriker für den Herd."},
                {"key": "c", "text": "Um die Miete abzuholen", "isCorrect": False, "explanation": "Falsch: Handwerker schließt Herd an."}
            ],
            "w_sit": "Sie möchten sich für einen Tanzkurs für Anfänger anmelden.",
            "w_model": "Guten Tag,\n\nich möchte mich für den Salsa-Tanzkurs für Anfänger im November anmelden. Wann genau beginnt der Kurs und wie viel kostet die Teilnahme? Bitte senden Sie mir das Anmeldeformular.\n\nMit freundlichen Grüßen,\n[Ihr Name]"
        },
        {
            "r1_text": "Lieber Alex,\nich kann am Freitag leider nicht zum gemeinsamen Kochen kommen. Mein Chef hat mich gebeten, bis 20 Uhr im Büro zu bleiben, weil wir ein wichtiges Projekt fertigstellen müssen. Wie wäre es, wenn wir uns stattdessen am Samstag zum Mittagessen treffen?\nHerzliche Grüße,\nJan",
            "r1_q1": "Warum sagt Jan das Kochen am Freitag ab?",
            "r1_q1_opts": [
                {"key": "a", "text": "Weil er wegen eines Projekts länger im Büro arbeiten muss", "isCorrect": True, "explanation": "Richtig: 'muss bis 20 Uhr im Büro bleiben'."},
                {"key": "b", "text": "Weil er krank im Bett liegt", "isCorrect": False, "explanation": "Falsch: Er arbeitet länger."},
                {"key": "c", "text": "Weil er kein Geld für Lebensmittel hat", "isCorrect": False, "explanation": "Falsch: Nicht erwähnt."}
            ],
            "r1_q2": "Was schlägt Jan als Ausweichtermin vor?",
            "r1_q2_opts": [
                {"key": "a", "text": "Ein gemeinsames Mittagessen am Samstag", "isCorrect": True, "explanation": "Richtig: 'am Samstag zum Mittagessen treffen'."},
                {"key": "b", "text": "Ein Frühstück am nächsten Montag", "isCorrect": False, "explanation": "Falsch: Er schlägt Samstag vor."},
                {"key": "c", "text": "Gar kein Treffen mehr", "isCorrect": False, "explanation": "Falsch: Er macht einen Gegenvorschlag."}
            ],
            "r2_text": "Stadtwerke Info: Wegen Reparaturarbeiten an der Hauptwasserleitung wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser in der Neustadt abgestellt. Bitte sorgen Sie rechtzeitig für einen Wasservorrat.",
            "r2_q1": "Was passiert am Mittwoch in der Neustadt?",
            "r2_q1_opts": [
                {"key": "a", "text": "Das Trinkwasser wird von 9 bis 13 Uhr abgestellt", "isCorrect": True, "explanation": "Richtig: 'wird am Mittwoch von 9 bis 13 Uhr das Trinkwasser... abgestellt'."},
                {"key": "b", "text": "Der Strom wird für zwei Tage abgeschaltet", "isCorrect": False, "explanation": "Falsch: Es betrifft das Wasser."},
                {"key": "c", "text": "Die Straßen werden asphaltiert", "isCorrect": False, "explanation": "Falsch: Reparatur an der Wasserleitung."}
            ],
            "r2_q2": "Was sollen die Anwohner tun?",
            "r2_q2_opts": [
                {"key": "a", "text": "Rechtzeitig Wasser auf Vorrat bereithalten", "isCorrect": True, "explanation": "Richtig: 'sorgen Sie rechtzeitig für einen Wasservorrat'."},
                {"key": "b", "text": "Ihre Wohnungen verlassen", "isCorrect": False, "explanation": "Falsch: Nicht nötig."},
                {"key": "c", "text": "Die Stadtwerke verklagen", "isCorrect": False, "explanation": "Falsch: Völlig unzutreffend."}
            ],
            "r3_text": "Tierpark Schönbrunn: Hunde sind im gesamten Parkgelände an der kurzen Leine zu führen. Das Füttern der Tiere ist verboten.",
            "r3_q1": "Dürfen Besucher eigene Hunde in den Tierpark mitnehmen?",
            "r3_q1_opts": [
                {"key": "a", "text": "Ja, aber Hunde müssen an der kurzen Leine geführt werden", "isCorrect": True, "explanation": "Richtig: 'an der kurzen Leine zu führen'."},
                {"key": "b", "text": "Nein, Hunde sind strengstens verboten", "isCorrect": False, "explanation": "Falsch: Sie dürfen angeleint mitkommen."},
                {"key": "c", "text": "Ja, Hunde dürfen frei herumlaufen", "isCorrect": False, "explanation": "Falsch: Nur an der kurzen Leine."}
            ],
            "l1_script": "Durchsage im ICE 612: Sehr geehrte Fahrgäste, unser Bordbistro im Wagen 8 ist ab sofort geöffnet. Wir bieten Ihnen heute warme Suppen, frische Snacks und kalte Getränke an. Guten Appetit!",
            "l1_q": "In welchem Wagen befindet sich das Bordbistro?",
            "l1_opts": [
                {"key": "a", "text": "In Wagen 8", "isCorrect": True, "explanation": "Richtig: 'Bordbistro im Wagen 8'."},
                {"key": "b", "text": "In Wagen 2", "isCorrect": False, "explanation": "Falsch: Falsche Wagennummer."},
                {"key": "c", "text": "In Wagen 14", "isCorrect": False, "explanation": "Falsch: Nicht genannt."}
            ],
            "l2_script": "Guten Tag Herr Fischer, hier spricht die Stadtbücherei. Ihr vorbestelltes Buch über Gartenbau ist jetzt eingetroffen. Sie können es bis Ende nächster Woche an der Ausleihtheke abholen.",
            "l2_q": "Welches Medium kann Herr Fischer abholen?",
            "l2_opts": [
                {"key": "a", "text": "Ein vorbestelltes Buch über Gartenbau", "isCorrect": True, "explanation": "Richtig: 'vorbestelltes Buch über Gartenbau'."},
                {"key": "b", "text": "Eine DVD über Autos", "isCorrect": False, "explanation": "Falsch: Es ist ein Buch über Gartenbau."},
                {"key": "c", "text": "Einen Bibliotheksausweis für seine Tochter", "isCorrect": False, "explanation": "Falsch: Ein vorbestelltes Buch."}
            ],
            "w_sit": "Sie möchten Ihren Nachbarn bitten, Ihre Pflanzen während Ihres Urlaubs zu gießen.",
            "w_model": "Lieber Herr Müller,\n\nich fahre vom 15. bis 22. August in den Urlaub. Könnten Sie bitte in dieser Zeit zweimal meine Balkonpflanzen gießen? Ich gebe Ihnen gerne den Wohnungsschlüssel heute Abend vorbei. Vielen Dank für Ihre Hilfe!\n\nHerzliche Grüße,\n[Ihr Name]"
        }
    ]

    sc = scenarios[(set_num - 1) % 4]

    return {
        "id": exam_id,
        "board": board,
        "level": "A1",
        "setNumber": set_num,
        "title": f"{board_name} - Mock Exam Set {set_num}",
        "officialStandard": f"{board_name} Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
        "durationMinutes": {"reading": 25, "listening": 20, "writing": 20, "speaking": 15, "total": 80},
        "scoringRules": {
            "readingMax": 25,
            "listeningMax": 25,
            "writingMax": 25,
            "speakingMax": 25,
            "totalMax": 100,
            "passPercentage": 60,
            "passPointsWritten": None,
            "passPointsOral": None,
            "passRuleDescription": "At least 60 points (60%) out of 100 points required to pass Start Deutsch 1 / telc Deutsch A1."
        },
        "readingSections": [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: E-Mails & Mitteilungen (Verstehen)",
                "instructions": "Lesen Sie die Nachricht und beantworten Sie die Fragen.",
                "readingPassage": sc["r1_text"],
                "timeRecommendedMinutes": 8,
                "questions": [
                    {"id": f"{exam_id}_rq1", "questionNumber": 1, "questionText": sc["r1_q1"], "points": 5, "options": sc["r1_q1_opts"]},
                    {"id": f"{exam_id}_rq2", "questionNumber": 2, "questionText": sc["r1_q2"], "points": 5, "options": sc["r1_q2_opts"]}
                ]
            },
            {
                "teilId": f"{exam_id}_read_2",
                "teilNumber": 2,
                "teilTitle": "Teil 2: Öffentliche Schilder & Praxis-Aushänge",
                "instructions": "Lesen Sie die Mitteilung und wählen Sie die richtige Antwort.",
                "readingPassage": sc["r2_text"],
                "timeRecommendedMinutes": 9,
                "questions": [
                    {"id": f"{exam_id}_rq3", "questionNumber": 3, "questionText": sc["r2_q1"], "points": 5, "options": sc["r2_q1_opts"]},
                    {"id": f"{exam_id}_rq4", "questionNumber": 4, "questionText": sc["r2_q2"], "points": 5, "options": sc["r2_q2_opts"]}
                ]
            },
            {
                "teilId": f"{exam_id}_read_3",
                "teilNumber": 3,
                "teilTitle": "Teil 3: Hinweisschilder & Öffnungszeiten",
                "instructions": "Lesen Sie das Hinweisschild und entscheiden Sie.",
                "readingPassage": sc["r3_text"],
                "timeRecommendedMinutes": 8,
                "questions": [
                    {"id": f"{exam_id}_rq5", "questionNumber": 5, "questionText": sc["r3_q1"], "points": 5, "options": sc["r3_q1_opts"]}
                ]
            }
        ],
        "listeningSections": [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": "Teil 1: Durchsagen an Bahnhöfen & Flughäfen",
                "instructions": "Sie hören eine Durchsage. Was ist richtig?",
                "timeRecommendedMinutes": 10,
                "questions": [
                    {"id": f"{exam_id}_lq1", "questionNumber": 1, "questionText": sc["l1_q"], "speaker": "Öffentliche Durchsage", "audioScript": sc["l1_script"], "points": 12.5, "options": sc["l1_opts"]}
                ]
            },
            {
                "teilId": f"{exam_id}_listen_2",
                "teilNumber": 2,
                "teilTitle": "Teil 2: Telefonische Anrufbeantworter & Nachrichten",
                "instructions": "Sie hören eine Telefonnachricht. Wählen Sie die richtige Lösung.",
                "timeRecommendedMinutes": 10,
                "questions": [
                    {"id": f"{exam_id}_lq2", "questionNumber": 2, "questionText": sc["l2_q"], "speaker": "Telefonischer Anrufbeantworter", "audioScript": sc["l2_script"], "points": 12.5, "options": sc["l2_opts"]}
                ]
            }
        ],
        "writingTasks": [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": "Teil 2: Kurze persönliche Mitteilung (~30 Wörter)",
                "prompt": "Schreiben Sie eine kurze Nachricht oder E-Mail.",
                "situation": sc["w_sit"],
                "leitpunkte": [
                    "Grund des Schreibens",
                    "Wann und wie lange",
                    "Höfliche Bitte um Rückmeldung"
                ],
                "minWords": 30,
                "maxWords": 50,
                "points": 25,
                "modelAnswer": sc["w_model"]
            }
        ],
        "speakingTasks": [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 1,
                "taskTitle": "Teil 1: Sich vorstellen & Buchstabieren",
                "prompt": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys. Buchstabieren Sie danach Ihren Vornamen und nennen Sie Ihre Telefonnummer.",
                "cardsOrQuestions": ["Name", "Alter", "Herkunftsland", "Wohnort", "Sprachen", "Beruf", "Hobbys", "Buchstabieren", "Telefonnummer"],
                "modelResponse": "Guten Tag, mein Name ist Anna Schmidt. Ich bin 29 Jahre alt und komme aus Italien. Jetzt wohne ich in Hamburg. Ich spreche Italienisch, Englisch und lerne Deutsch. Von Beruf bin ich Buchhalterin. In meiner Freizeit koche ich gern und mache Yoga. Meinen Vornamen buchstabiere ich: A-N-N-A. Meine Handynummer ist 0176 1234567.",
                "points": 25
            }
        ]
    }

# Let's generate A2 and B1 mocks similarly with 4 distinct sets
def generate_a2_mock(board, set_num):
    exam_id = f"{board.lower()}_a2_set_{set_num}"
    board_name = "telc Deutsch A2" if board == "TELC" else "Goethe-Zertifikat A2"
    
    topics = [
        ("Umzug & Wohnen", "Fahrradstadt & Mobilität", "Nachbarschaftsfest & Grillen", "Homeoffice & Arbeitsalltag"),
        ("Fitness & Gesundheit", "Urlaub & Reisen an die Ostsee", "Sprachkurs & Tandempartner", "Haustiere im Mietshaus"),
        ("Wochenmarkt & Bio-Essen", "Öffentlicher Nahverkehr & Tram", "Reparatur & Handwerker", "Kino & Kulturabend"),
        ("Ehrenamt & Tierheim", "Kompaktkurs & Weiterbildung", "Sportverein & Laufen", "Wohnungssuche & Kaution")
    ]
    t1, t2, t3, t4 = topics[(set_num - 1) % 4]

    return {
        "id": exam_id,
        "board": board,
        "level": "A2",
        "setNumber": set_num,
        "title": f"{board_name} - Mock Exam Set {set_num}",
        "officialStandard": f"{board_name} Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
        "durationMinutes": {"reading": 30, "listening": 30, "writing": 30, "speaking": 15, "total": 105},
        "scoringRules": {
            "readingMax": 25,
            "listeningMax": 25,
            "writingMax": 25,
            "speakingMax": 25,
            "totalMax": 100,
            "passPercentage": 60,
            "passPointsWritten": None,
            "passPointsOral": None,
            "passRuleDescription": "At least 60 points (60%) required to pass."
        },
        "readingSections": [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": f"Teil 1: Zeitungsartikel ({t1})",
                "instructions": "Lesen Sie den Artikel und wählen Sie die richtige Lösung.",
                "readingPassage": f"Immer mehr Menschen in Großstädten entscheiden sich für das Thema '{t1}'. Eine aktuelle Umfrage zeigt, dass über 40 Prozent der Befragten bereit sind, ihre Gewohnheiten im Alltag aktiv zu ändern. Vor allem junge Berufstätige schätzen die Flexibilität und sparen dadurch jeden Monat viel Geld. Die Stadtverwaltung plant nun, die Angebote in den nächsten zwei Jahren weiter auszubauen.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_rq1",
                        "questionNumber": 1,
                        "questionText": "Was zeigt die aktuelle Umfrage?",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Über 40 Prozent ändern ihre Alltagsgewohnheiten", "isCorrect": True, "explanation": "Richtig: 'über 40 Prozent der Befragten bereit sind... zu ändern'."},
                            {"key": "b", "text": "Niemand interessiert sich für das Thema", "isCorrect": False, "explanation": "Falsch: Das Gegenteil ist der Fall."},
                            {"key": "c", "text": "Die Angebote werden komplett eingestellt", "isCorrect": False, "explanation": "Falsch: Sie werden ausgebaut."}
                        ]
                    },
                    {
                        "id": f"{exam_id}_rq2",
                        "questionNumber": 2,
                        "questionText": "Was plant die Stadtverwaltung?",
                        "points": 12.5,
                        "options": [
                            {"key": "a", "text": "Die Angebote in den nächsten zwei Jahren auszubauen", "isCorrect": True, "explanation": "Richtig: 'plant nun, die Angebote... weiter auszubauen'."},
                            {"key": "b", "text": "Alle Preise um 50 Prozent zu erhöhen", "isCorrect": False, "explanation": "Falsch: Nicht erwähnt."},
                            {"key": "c", "text": "Das Projekt sofort abzubrechen", "isCorrect": False, "explanation": "Falsch: Völlig unzutreffend."}
                        ]
                    }
                ]
            }
        ],
        "listeningSections": [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": f"Teil 1: Radiobericht & Durchsage ({t2})",
                "instructions": "Sie hören eine Mitteilung im Radio. Wählen Sie die richtige Lösung.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {
                        "id": f"{exam_id}_lq1",
                        "questionNumber": 1,
                        "questionText": "Worüber berichtet der Radiosprecher?",
                        "speaker": "Radiosender CityWelle",
                        "audioScript": f"Guten Abend liebe Hörerinnen und Hörer. Heute stand das Thema '{t2}' im Mittelpunkt der Beratungen im Stadtrat. Ab dem kommenden Monat gibt es für alle Bürgerinnen und Bürger neue Vergünstigungen bei der Nutzung städtischer Einrichtungen. Weitere Informationen finden Sie auf der Internetseite der Stadt.",
                        "points": 25,
                        "options": [
                            {"key": "a", "text": f"Über neue Vergünstigungen zum Thema '{t2}'", "isCorrect": True, "explanation": "Richtig: Der Sprecher kündigt neue Vergünstigungen ab nächstem Monat an."},
                            {"key": "b", "text": "Über das schlechte Wetter am Wochenende", "isCorrect": False, "explanation": "Falsch: Es geht um städtische Beschlüsse."},
                            {"key": "c", "text": "Über eine Vollsperrung der Autobahn", "isCorrect": False, "explanation": "Falsch: Nicht Thema des Berichts."}
                        ]
                    }
                ]
            }
        ],
        "writingTasks": [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": f"Teil 2: E-Mail an Freunde oder Kollegen ({t3})",
                "prompt": f"Schreiben Sie eine E-Mail zum Thema '{t3}' (ca. 40 bis 50 Wörter).",
                "situation": f"Sie organisieren ein Treffen mit Freunden zum Thema '{t3}' und möchten Einzelheiten klären.",
                "leitpunkte": [
                    "Wann und wo das Treffen stattfindet",
                    "Was die Teilnehmer mitbringen sollen",
                    "Bitte um Bestätigung bis morgen Abend"
                ],
                "minWords": 40,
                "maxWords": 60,
                "points": 25,
                "modelAnswer": f"Hallo zusammen,\n\nich freue mich schon sehr auf unser Treffen zum Thema '{t3}' am kommenden Samstag um 15 Uhr im Stadtpark. Bitte bringt alle etwas zu essen und gute Musik mit. Könntet ihr mir bitte bis morgen Abend kurz schreiben, ob ihr dabei seid?\n\nViele Grüße,\n[Ihr Name]"
            }
        ],
        "speakingTasks": [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 2,
                "taskTitle": f"Teil 2: Von sich erzählen ({t4})",
                "prompt": f"Erzählen Sie von Ihren Erfahrungen zum Thema '{t4}'. Sprechen Sie ca. 1 bis 2 Minuten frei.",
                "cardsOrQuestions": ["Persönliche Erfahrung", "Häufigkeit im Alltag", "Was gefällt Ihnen daran", "Zukunftspläne"],
                "modelResponse": f"Zum Thema '{t4}' habe ich in den letzten Jahren viele positive Erfahrungen gesammelt. In meinem persönlichen Alltag nehme ich mir dafür mindestens dreimal pro Woche bewusst Zeit. Es hilft mir sehr, nach der Arbeit zu entspannen und neue Energie zu tanken. In Zukunft möchte ich noch mehr Zeit dafür investieren und vielleicht auch einen Kurs besuchen.",
                "points": 25
            }
        ]
    }

def generate_b1_mock(board, set_num):
    exam_id = f"{board.lower()}_b1_set_{set_num}"
    board_name = "telc Deutsch B1" if board == "TELC" else "Goethe-Zertifikat B1"

    b1_themes = [
        {
            "blog_title": "Leben ohne eigenes Auto in der Großstadt",
            "blog_text": "Blog von Julia (29): 'Seit sechs Monaten besitze ich kein Auto mehr. Stattdessen fahre ich täglich mit dem E-Bike und nutze für längere Strecken die Bahn oder Carsharing. Ich spare jeden Monat rund 300 Euro für Benzin, Versicherung und Reparaturen. Zudem entfällt der tägliche Parkplatzstress.'",
            "b_q1": "Warum ist Julia mit ihrer Entscheidung zufrieden?",
            "b_q1_opts": [
                {"key": "a", "text": "Sie spart monatlich Geld und hat keinen Parkplatzstress mehr", "isCorrect": True, "explanation": "Richtig: 'spare jeden Monat rund 300 Euro... entfällt der tägliche Parkplatzstress'."},
                {"key": "b", "text": "Sie fährt jetzt nur noch mit dem Taxi", "isCorrect": False, "explanation": "Falsch: Sie nutzt E-Bike, Bahn und Carsharing."},
                {"key": "c", "text": "Sie möchte sofort wieder ein Auto kaufen", "isCorrect": False, "explanation": "Falsch: Sie ist vollkommen zufrieden."}
            ],
            "press_title": "Die 4-Tage-Woche im Praxistest",
            "press_text": "Immer mehr Betriebe in Deutschland erproben die 4-Tage-Woche bei vollem Lohnausgleich. Auswertungen zeigen: Die Fehlzeiten wegen Krankheit sanken im Durchschnitt um 25 Prozent, während die Mitarbeiterzufriedenheit sprunghaft anstieg. Kritiker aus der Industrie befürchten allerdings Produktivitätsverluste im globalen Wettbewerb.",
            "p_q1": "Welches Ergebnis zeigt der Praxistest?",
            "p_q1_opts": [
                {"key": "a", "text": "Signifikant weniger Krankheitstage und höhere Zufriedenheit", "isCorrect": True, "explanation": "Richtig: 'sanken im Durchschnitt um 25 Prozent... Zufriedenheit sprunghaft anstieg'."},
                {"key": "b", "text": "Alle Mitarbeiter haben gekündigt", "isCorrect": False, "explanation": "Falsch: Zufriedenheit ist gestiegen."},
                {"key": "c", "text": "Die Gehälter wurden um ein Viertel gekürzt", "isCorrect": False, "explanation": "Falsch: Voller Lohnausgleich."}
            ],
            "audio_speaker": "Bahnhofsdurchsage ICE 892",
            "audio_script": "Achtung an Gleis 7: Der ICE 892 nach Hamburg über Hannover, planmäßige Abfahrt um 17 Uhr 18, hat heute ca. 35 Minuten Verspätung wegen einer Reparatur an der Oberleitung. Reisende nach Hannover können alternativ den Regionalexpress auf Gleis 4 nutzen.",
            "a_q1": "Welche Alternative wird für Reisende nach Hannover empfohlen?",
            "a_q1_opts": [
                {"key": "a", "text": "Den Regionalexpress auf Gleis 4 zu nehmen", "isCorrect": True, "explanation": "Richtig: 'alternativ den Regionalexpress auf Gleis 4 nutzen'."},
                {"key": "b", "text": "Bis morgen früh zu warten", "isCorrect": False, "explanation": "Falsch: Es gibt die Regionalverbindung."},
                {"key": "c", "text": "Ein Taxi auf eigene Kosten zu buchen", "isCorrect": False, "explanation": "Falsch: Nicht in der Durchsage genannt."}
            ],
            "w_topic": "Schaden in der Mietwohnung (Wasserschaden & Heizung)",
            "w_prompt": "Schreiben Sie eine formelle Beschwerde-E-Mail an Ihren Vermieter Herrn Schneider (mindestens 80 Wörter).",
            "w_points": ["Grund des Schreibens (Heizungsausfall und feuchte Wand)", "Bereits entstandene Unannehmlichkeiten", "Frist für die Reparatur bis Freitag", "Ankündigung von Mietminderung bei Nichthandeln"],
            "w_model": "Sehr geehrter Herr Schneider,\n\nich wende mich an Sie, weil in meiner Wohnung im zweiten Stock seit gestern die Heizung im Wohnzimmer komplett ausgefallen ist. Zudem habe ich bemerkt, dass die Wand unter dem Fenster feucht ist und sich bereits dunkle Flecken bilden.\n\nDa die Temperaturen draußen sehr niedrig sind, kühlt die Wohnung stark aus. Ich bitte Sie daher dringend, bis spätestens Freitag einen Handwerker zur Begutachtung und Behebung des Schadens zu beauftragen. Sollte der Mangel bis zu diesem Zeitpunkt nicht beseitigt werden, sehe ich mich gezwungen, die Miete für diesen Monat angemessen zu mindern.\n\nIch bitte um Ihre zeitnahe schriftliche Bestätigung des Termins.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]",
            "sp_topic": "Sollten Haustiere in Mietwohnungen generell erlaubt sein?",
            "sp_model": "Das Thema meiner Präsentation lautet: 'Haustiere in Mietwohnungen'. Ich habe dieses Thema gewählt, weil viele Menschen gerne einen Hund oder eine Katze halten möchten. In meiner persönlichen Erfahrung in Deutschland habe ich erlebt, dass Tiere viel Lebensfreude bringen, aber manchmal auch Lärm machen können. In meinem Heimatland gibt es selten strenge Regeln in Mietverträgen, jeder entscheidet selbst. Ein großer Vorteil von Haustieren ist die emotionale Unterstützung und die Bewegung an der frischen Luft. Ein Nachteil können jedoch Beschwerden von Nachbarn wegen Bellen oder Allergien sein. Zusammenfassend bin ich der Ansicht, dass Haustiere erlaubt sein sollten, solange sie gut erzogen sind und die Nachbarn nicht stören. Vielen Dank fürs Zuhören."
        },
        {
            "blog_title": "Ausbildung oder Studium? Mein Weg ins Handwerk",
            "blog_text": "Blog von Marcel (24): 'Nach dem Abitur wollten meine Eltern, dass ich BWL studiere. Nach zwei Semestern an der Universität habe ich mich jedoch für eine Ausbildung zum Mechatroniker entschieden. Heute verdiene ich mein eigenes Gehalt, habe geregelte Arbeitszeiten und sehe jeden Tag das konkrete Ergebnis meiner Arbeit.'",
            "b_q1": "Warum hat Marcel sein Studium abgebrochen?",
            "b_q1_opts": [
                {"key": "a", "text": "Weil er lieber praktisch im Handwerk arbeiten und eigenes Geld verdienen wollte", "isCorrect": True, "explanation": "Richtig: 'für eine Ausbildung zum Mechatroniker entschieden... sehe konkretes Ergebnis'."},
                {"key": "b", "text": "Weil er alle Prüfungen nicht bestanden hat", "isCorrect": False, "explanation": "Falsch: Er entschied sich bewusst für das Handwerk."},
                {"key": "c", "text": "Weil seine Eltern es ihm verboten haben", "isCorrect": False, "explanation": "Falsch: Seine Eltern wollten, dass er studiert."}
            ],
            "press_title": "Solarenergie auf Balkonen: Der Boom der Balkonkraftwerke",
            "press_text": "Kleine steckerfertige Solaranlagen für den Balkon erleben in Deutschland einen historischen Boom. Über eine halbe Million Haushalte erzeugen inzwischen ihren eigenen Ökostrom direkt am Balkongeländer. Das spart pro Jahr rund 100 bis 200 Euro Stromkosten. Durch den Abbau bürokratischer Hürden ist die Anmeldung beim Netzbetreiber nun in wenigen Minuten online erledigt.",
            "p_q1": "Was ist der Hauptvorteil von Balkonkraftwerken?",
            "p_q1_opts": [
                {"key": "a", "text": "Sie erzeugen Ökostrom und senken die jährlichen Stromkosten um 100 bis 200 Euro", "isCorrect": True, "explanation": "Richtig: 'spart pro Jahr rund 100 bis 200 Euro Stromkosten'."},
                {"key": "b", "text": "Sie ersetzen alle Großkraftwerke sofort", "isCorrect": False, "explanation": "Falsch: Es sind kleine Zusatzanlagen."},
                {"key": "c", "text": "Man muss dafür ein ganzes Haus kaufen", "isCorrect": False, "explanation": "Falsch: Sie sind für Balkone in Mietwohnungen gedacht."}
            ],
            "audio_speaker": "Radio-Kulturnachrichten",
            "audio_script": "Zum Tag der offenen Denkmale öffnen am kommenden Sonntag über 500 historische Gebäude und Museen in unserer Region ihre Türen bei freiem Eintritt. Besondere Highlights sind geführte Touren im alten Wasserturm und die Lichtinstallation im Schlossgarten ab 20 Uhr.",
            "a_q1": "Was kostet der Eintritt am kommenden Sonntag?",
            "a_q1_opts": [
                {"key": "a", "text": "Der Eintritt ist in allen teilnehmenden Gebäuden frei", "isCorrect": True, "explanation": "Richtig: 'öffnen... ihre Türen bei freiem Eintritt'."},
                {"key": "b", "text": "Erwachsene zahlen 15 Euro", "isCorrect": False, "explanation": "Falsch: Eintritt ist frei."},
                {"key": "c", "text": "Nur der Schlossgarten ist kostenlos", "isCorrect": False, "explanation": "Falsch: Über 500 Gebäude sind frei."}
            ],
            "w_topic": "Urlaubsantrag und Arbeitsübergabe",
            "w_prompt": "Schreiben Sie eine E-Mail an Ihre Vorgesetzte Frau Dr. Klein (mindestens 80 Wörter).",
            "w_points": ["Zeitraum des gewünschten Sommerurlaubs", "Begründung für die Terminauswahl", "Regelung der Vertretung durch Kollegen", "Erreichbarkeit in dringenden Notfällen"],
            "w_model": "Sehr geehrte Frau Dr. Klein,\n\nich möchte hiermit meinen Sommerurlaub für den Zeitraum vom 1. bis 19. August beantragen. Ich habe diesen Termin gewählt, weil meine Familie in dieser Zeit Schulferien hat und wir eine gemeinsame Reise geplant haben.\n\nIch habe mich bereits mit meinem Kollegen Herrn Meyer abgestimmt. Er wird meine laufenden Projekte während meiner Abwesenheit betreuen und meine E-Mails im Blick behalten. Alle dringenden Aufgaben werde ich vor meinem Urlaub abschließen. In dringenden Notfällen bin ich per E-Mail erreichbar.\n\nIch freue mich über Ihre Genehmigung des Urlaubsantrags.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]",
            "sp_topic": "Sollten Geschäfte in Deutschland auch sonntags öffnen dürfen?",
            "sp_model": "Das Thema meiner heutigen Präsentation ist: 'Sonntagsöffnung von Geschäften'. Ich habe dieses Thema gewählt, weil die Ladenöffnungszeiten am Wochenende immer wieder lebhaft diskutiert werden. In meiner persönlichen Erfahrung ist der ruhige Sonntag in Deutschland sehr angenehm, um mit der Familie Zeit zu verbringen. In meinem Heimatland haben die meisten Einkaufszentren sieben Tage die Woche rund um die Uhr geöffnet. Ein großer Vorteil einer Sonntagsöffnung wäre die höhere Flexibilität für Berufstätige, die unter der Woche wenig Zeit haben. Ein wesentlicher Nachteil ist jedoch die Belastung für die Verkäuferinnen und Verkäufer, die dann am Wochenende arbeiten müssten. Meiner Meinung nach sollte der Sonntag als gemeinsamer Ruhetag für Familien geschützt bleiben, mit wenigen Ausnahmen im Jahr. Herzlichen Dank für Ihre Aufmerksamkeit."
        },
        {
            "blog_title": "Nachhaltiges Reisen: Mit dem Nachtzug durch Europa",
            "blog_text": "Blog von Markus (31): 'Für meinen Urlaub in Wien und Rom habe ich auf Flüge verzichtet und stattdessen den Nachtzug gebucht. Im Schlafwagen bin ich am Abend in Berlin eingestiegen und am nächsten Morgen entspannt im Zentrum von Wien aufgewacht. Die Fahrt war umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart.'",
            "b_q1": "Welchen Vorteil des Nachtzugs hebt Markus hervor?",
            "b_q1_opts": [
                {"key": "a", "text": "Klimafreundliches Reisen und gesparte Hotelübernachtungen", "isCorrect": True, "explanation": "Richtig: 'umweltfreundlich, ruhig und hat mir zwei Hotelübernachtungen erspart'."},
                {"key": "b", "text": "Dass der Zug schneller als ein Flugzeug fliegt", "isCorrect": False, "explanation": "Falsch: Ein Zug fliegt nicht."},
                {"key": "c", "text": "Dass die Fahrt völlig kostenlos war", "isCorrect": False, "explanation": "Falsch: Nicht kostenlos."}
            ],
            "press_title": "Pflegeberufe: Neue Chancen durch Digitalisierung",
            "press_text": "In deutschen Seniorenresidenzen und Krankenhäusern kommen zunehmend digitale Pflegedokumentationen und Sprachassistenten zum Einsatz. Pflegekräfte sparen dadurch bis zu 90 Minuten Dokumentationszeit pro Schicht. Diese gewonnene Zeit kommt direkt der menschlichen Zuwendung und Fürsorge für die Patienten zugute.",
            "p_q1": "Wie hilft die Digitalisierung den Pflegekräften?",
            "p_q1_opts": [
                {"key": "a", "text": "Sie spart bis zu 90 Minuten Schreibarbeit für mehr Zeit mit Patienten", "isCorrect": True, "explanation": "Richtig: 'sparen dadurch bis zu 90 Minuten Dokumentationszeit... kommt Zuwendung zugute'."},
                {"key": "b", "text": "Sie ersetzt alle Krankenschwestern durch Roboter", "isCorrect": False, "explanation": "Falsch: Pflegekräfte bleiben unersetzlich."},
                {"key": "c", "text": "Sie schließt die Krankenhäuser am Wochenende", "isCorrect": False, "explanation": "Falsch: Völlig unzutreffend."}
            ],
            "audio_speaker": "Telefonische Kursberatung Volkshochschule",
            "audio_script": "Guten Tag, Sie interessieren sich für unseren B1-Abendkurs für Deutsch als Fremdsprache. Der Kurs findet dienstags und donnerstags von 18 bis 20 Uhr 15 statt. Der nächste Einstiegstermin ist der 15. Oktober. Ein kostenloser Einstufungstest kann vorab online auf unserer Website absolviert werden.",
            "a_q1": "An welchen Wochentagen findet der Sprachkurs statt?",
            "a_q1_opts": [
                {"key": "a", "text": "Dienstags und donnerstags von 18:00 bis 20:15 Uhr", "isCorrect": True, "explanation": "Richtig: 'dienstags und donnerstags von 18 bis 20 Uhr 15'."},
                {"key": "b", "text": "Nur samstags ganztägig", "isCorrect": False, "explanation": "Falsch: Dienstags und donnerstags."},
                {"key": "c", "text": "Täglich von 8 bis 12 Uhr", "isCorrect": False, "explanation": "Falsch: Es ist ein Abendkurs."}
            ],
            "w_topic": "Reklamation eines fehlerhaften Online-Kaufs",
            "w_prompt": "Schreiben Sie eine Reklamations-E-Mail an den Kundenservice der Firma ElektroVersand (mindestens 80 Wörter).",
            "w_points": ["Bestellnummer und gelieferter Artikel (Kaffeemaschine)", "Beschreibung des Defekts (Gerät heizt nicht)", "Forderung nach Ersatzlieferung oder Gelderstattung", "Rücksendung des defekten Geräts"],
            "w_model": "Sehr geehrte Damen und Herren,\n\nam 12. September habe ich in Ihrem Online-Shop eine Kaffeemaschine (Bestellnummer: EV-83921) bestellt. Die Lieferung traf gestern bei mir ein.\n\nLeider musste ich nach dem Auspacken feststellen, dass das Gerät defekt ist. Wenn man die Maschine einschaltet, läuft zwar die Pumpe, aber das Wasser wird überhaupt nicht warm. Ich bitte Sie daher höflich, mir umgehend ein funktionierendes Ersatzgerät zuzusenden oder mir den Kaufpreis auf mein Bankkonto zu erstatten.\n\nBitte senden Sie mir ein kostenloses Rücksendeetikett per E-Mail zu, damit ich das defekte Gerät an Sie zurückschicken kann.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]",
            "sp_topic": "Brauchen Kinder und Jugendliche eigene Smartphones?",
            "sp_model": "Das Thema meiner Präsentation ist: 'Smartphones für Kinder'. Ich habe dieses Thema gewählt, weil heute fast jedes Kind in der Schule ein Mobiltelefon besitzt. In meiner persönlichen Erfahrung lenkt das Smartphone beim Lernen oft ab, wenn keine klaren Regeln existieren. In meinem Heimatland nutzen Schüler Smartphones häufig auch im Unterricht für Recherchen. Ein großer Vorteil ist die ständige Erreichbarkeit im Notfall und der schnelle Zugang zu Wissensquellen. Ein ernster Nachteil ist jedoch das Risiko von Mediensucht und Konzentrationsschwächen. Zusammenfassend denke ich, dass Kinder erst ab ca. 12 Jahren ein eigenes Smartphone mit zeitlicher Begrenzung erhalten sollten. Vielen Dank für Ihre Aufmerksamkeit."
        },
        {
            "blog_title": "Ernährungsumstellung: Ein Jahr vegetarisch leben",
            "blog_text": "Blog von Sandra (27): 'Vor einem Jahr habe ich beschlossen, komplett auf Fleisch zu verzichten. Anfangs fehlten mir Rezeptideen, doch mittlerweile habe ich viele neue Gemüsesorten, Hülsenfrüchte und Gewürze entdeckt. Mein Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich insgesamt vitaler.'",
            "b_q1": "Welche positive Veränderung hat Sandra bemerkt?",
            "b_q1_opts": [
                {"key": "a", "text": "Besserer Schlaf, normalisierter Blutdruck und mehr Vitalität", "isCorrect": True, "explanation": "Richtig: 'Blutdruck hat sich normalisiert, ich schlafe besser und fühle mich... vitaler'."},
                {"key": "b", "text": "Dass sie jetzt jeden Tag hungrig ist", "isCorrect": False, "explanation": "Falsch: Sie fühlt sich sehr vital."},
                {"key": "c", "text": "Sie möchte nie wieder kochen", "isCorrect": False, "explanation": "Falsch: Sie hat viele neue Rezepte entdeckt."}
            ],
            "press_title": "Verpackungsfreies Einkaufen: Unverpackt-Läden im Aufwind",
            "press_text": "Immer mehr Verbraucher in Deutschland bringen eigene Dosen und Gläser zum Einkaufen mit. In sogenannten Unverpackt-Läden werden Müsli, Nudeln und Waschmittel grammgenau abgewogen. Das spart pro Jahr Tonnen von Plastikmüll. Immer mehr traditionelle Supermärkte übernehmen dieses Konzept und richten eigene Unverpackt-Stationen ein.",
            "p_q1": "Wie funktioniert das Einkaufen im Unverpackt-Laden?",
            "p_q1_opts": [
                {"key": "a", "text": "Kunden bringen eigene Behälter mit und wiegen Waren grammgenau ab", "isCorrect": True, "explanation": "Richtig: 'bringen eigene Dosen und Gläser... grammgenau abgewogen'."},
                {"key": "b", "text": "Man darf Waren nur in Plastiktüten kaufen", "isCorrect": False, "explanation": "Falsch: Es ist unverpackt."},
                {"key": "c", "text": "Die Waren sind alle kostenlos", "isCorrect": False, "explanation": "Falsch: Man bezahlt nach Gewicht."}
            ],
            "audio_speaker": "Arztpraxis-Ansage",
            "audio_script": "Guten Tag, hier spricht die Gemeinschaftspraxis Dr. Frank und Partner. Während der Sommerferien vom 1. bis 15. Juli ist unsere Praxis täglich von 8 bis 12 Uhr besetzt. Nachmittags ist die Praxis geschlossen. Die Vertretung übernimmt die Praxis Dr. Meissner in der Gartenstraße 4.",
            "a_q1": "Wann ist die Praxis während der Ferien geöffnet?",
            "a_q1_opts": [
                {"key": "a", "text": "Täglich von 8:00 bis 12:00 Uhr vormittags", "isCorrect": True, "explanation": "Richtig: 'täglich von 8 bis 12 Uhr besetzt'."},
                {"key": "b", "text": "Nur nachmittags ab 16 Uhr", "isCorrect": False, "explanation": "Falsch: Nachmittags ist geschlossen."},
                {"key": "c", "text": "Die Praxis ist zwei Wochen komplett zu", "isCorrect": False, "explanation": "Falsch: Vormittags ist geöffnet."}
            ],
            "w_topic": "Bitte um Verschiebung eines Prüfungstermins",
            "w_prompt": "Schreiben Sie eine offizielle E-Mail an das Prüfungszentrum (mindestens 80 Wörter).",
            "w_points": ["Angabe von Prüfungsnummer und gewähltem Datum", "Wichtiger Grund für den Verhinderungsfall (akute Erkrankung)", "Attest vom Arzt als Anlage", "Bitte um kostenfreie Umbuchung auf den nächsten Monat"],
            "w_model": "Sehr geehrte Damen und Herren,\n\nich bin für die B1-Prüfung am kommenden Samstag (Teilnehmernummer: 928310) angemeldet. Leider muss ich Ihnen mitteilen, dass ich an diesem Prüfungstermin wegen einer akuten Erkrankung nicht teilnehmen kann.\n\nMein Arzt hat mir absolute Bettruhe verordnet. Ein entsprechendes ärztliches Attest habe ich dieser E-Mail als PDF-Datei beigefügt. Aus diesem Grund bitte ich Sie höflich, meine Prüfungsanmeldung kostenfrei auf den nächsten Prüfungstermin im kommenden Monat umzubuchen.\n\nIch danke Ihnen für Ihr Verständnis und freue mich auf Ihre schriftliche Bestätigung.\n\nMit freundlichen Grüßen,\n[Ihr Vorname und Nachname]",
            "sp_topic": "Sollte das Arbeiten im Homeoffice gesetzlich erlaubt werden?",
            "sp_model": "Das Thema meiner kurzen Präsentation lautet: 'Recht auf Homeoffice'. Ich habe dieses Thema gewählt, weil seit der Pandemie viele Menschen von zu Hause aus arbeiten. In meiner persönlichen Erfahrung spart Homeoffice viel Fahrzeit im Berufsverkehr und ermöglicht eine ruhige Arbeitsatmosphäre. In meinem Heimatland arbeiten die meisten Beschäftigten noch traditionell vor Ort im Büro. Ein großer Vorteil von Homeoffice ist die bessere Vereinbarkeit von Familie und Beruf. Ein Nachteil ist jedoch der fehlende persönliche Kontakt zu Kollegen und die Gefahr, dass Arbeit und Freizeit verschwimmen. Zusammenfassend bin ich der Meinung, dass Beschäftigte ein Recht auf zwei Tage Homeoffice pro Woche haben sollten, wenn die Tätigkeit es erlaubt. Vielen Dank für Ihre Aufmerksamkeit."
        }
    ]

    th = b1_themes[(set_num - 1) % 4]

    return {
        "id": exam_id,
        "board": board,
        "level": "B1",
        "setNumber": set_num,
        "title": f"{board_name} - Mock Exam Set {set_num}",
        "officialStandard": f"{board_name} Prüfungsordnung (Gemeinsamer Europäischer Referenzrahmen)",
        "durationMinutes": {"reading": 65, "listening": 40, "writing": 60 if board == "GOETHE" else 30, "speaking": 15, "total": 180 if board == "GOETHE" else 150},
        "scoringRules": {
            "readingMax": 100 if board == "GOETHE" else 75,
            "listeningMax": 100 if board == "GOETHE" else 75,
            "writingMax": 100 if board == "GOETHE" else 45,
            "speakingMax": 100 if board == "GOETHE" else 75,
            "totalMax": 400 if board == "GOETHE" else 300,
            "passPercentage": 60,
            "passPointsWritten": 135 if board == "TELC" else None,
            "passPointsOral": 45 if board == "TELC" else None,
            "passRuleDescription": "Goethe: 60/100 points in EACH independent module. telc: 135/225 in Written + 45/75 in Oral."
        },
        "readingSections": [
            {
                "teilId": f"{exam_id}_read_1",
                "teilNumber": 1,
                "teilTitle": f"Teil 1: Globalverstehen (Blog: {th['blog_title']})",
                "instructions": "Lesen Sie den Blogbeitrag und beantworten Sie die Frage.",
                "readingPassage": th["blog_text"],
                "timeRecommendedMinutes": 15,
                "questions": [
                    {"id": f"{exam_id}_rq1", "questionNumber": 1, "questionText": th["b_q1"], "points": 25, "options": th["b_q1_opts"]}
                ]
            },
            {
                "teilId": f"{exam_id}_read_2",
                "teilNumber": 2,
                "teilTitle": f"Teil 2: Detailverstehen (Pressebericht: {th['press_title']})",
                "instructions": "Lesen Sie den Pressebericht und wählen Sie die richtige Aussage.",
                "readingPassage": th["press_text"],
                "timeRecommendedMinutes": 20,
                "questions": [
                    {"id": f"{exam_id}_rq2", "questionNumber": 2, "questionText": th["p_q1"], "points": 25, "options": th["p_q1_opts"]}
                ]
            }
        ],
        "listeningSections": [
            {
                "teilId": f"{exam_id}_listen_1",
                "teilNumber": 1,
                "teilTitle": f"Teil 1: Durchsagen & Mitteilungen ({th['audio_speaker']})",
                "instructions": "Sie hören eine Mitteilung. Wählen Sie die richtige Lösung.",
                "timeRecommendedMinutes": 15,
                "questions": [
                    {"id": f"{exam_id}_lq1", "questionNumber": 1, "questionText": th["a_q1"], "speaker": th["audio_speaker"], "audioScript": th["audio_script"], "points": 25, "options": th["a_q1_opts"]}
                ]
            }
        ],
        "writingTasks": [
            {
                "taskId": f"{exam_id}_write_1",
                "taskTitle": f"Schriftlicher Ausdruck: Formeller Brief / E-Mail ({th['w_topic']})",
                "prompt": th["w_prompt"],
                "situation": f"Sie schreiben eine offizielle Mitteilung zum Thema '{th['w_topic']}'.",
                "leitpunkte": th["w_points"],
                "minWords": 80,
                "maxWords": 120,
                "points": 100 if board == "GOETHE" else 45,
                "modelAnswer": th["w_model"]
            }
        ],
        "speakingTasks": [
            {
                "taskId": f"{exam_id}_speak_1",
                "teilNumber": 2,
                "taskTitle": f"Teil 2: Ein Thema präsentieren ({th['sp_topic']})",
                "prompt": f"Präsentieren Sie das Thema: '{th['sp_topic']}'. Sprechen Sie ca. 3 Minuten nach der 5-Punkte-Struktur.",
                "cardsOrQuestions": [
                    "1. Einleitung & Themenvorstellung",
                    "2. Persönliche Erfahrung",
                    "3. Situation im Heimatland",
                    "4. Vor- und Nachteile abwägen",
                    "5. Eigene Meinung & Abschluss"
                ],
                "modelResponse": th["sp_model"],
                "points": 100 if board == "GOETHE" else 75
            }
        ]
    }

all_mocks = []
for b in ["TELC", "GOETHE"]:
    for set_idx in [1, 2, 3, 4]:
        all_mocks.append(generate_a1_mock(b, set_idx))
    for set_idx in [1, 2, 3, 4]:
        all_mocks.append(generate_a2_mock(b, set_idx))
    for set_idx in [1, 2, 3, 4]:
        all_mocks.append(generate_b1_mock(b, set_idx))

json_str = json.dumps(all_mocks, indent=2, ensure_ascii=False)
full_file = head_code + "\nexport const ALL_MULTI_LEVEL_MOCK_EXAMS: FullMockExamData[] = " + json_str + ";\n"

assert "\u2014" not in full_file, "Found em dash!"
banned = ['🍷', '🍸', '🍺', '🍻', '🍾', '🥂', '🥃', '🍹', '🚬', '🚭']
for b in banned:
    assert b not in full_file, f"Found banned emoji {b}!"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(full_file)

print(f"Successfully generated {len(all_mocks)} rich authentic mocks into {output_path}")
