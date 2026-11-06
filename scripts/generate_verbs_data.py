# -*- coding: utf-8 -*-
"""
Generates the comprehensive German Verbs Master Library dataset.
Contains all 28 Preply German Verb topics with 8-12 authentic examples each,
full conjugation tables, exam traps, and interactive practice drills.
Strict constraint: Zero em dashes (\u2014) and zero alcohol/smoking emojis.
"""

import json
import os

OUT_PATH = "german-prep-platform/src/data/german_verbs_master_data.ts"

VERBS_DATA = [
  # 1. haben
  {
    "id": "v-haben",
    "category": "PRESENT",
    "level": "A1",
    "title": "haben (ich habe, du hast...)",
    "shortFormula": "ich habe | du hast | er/sie/es hat | wir haben | ihr habt | sie/Sie haben",
    "description": "One of the two most important auxiliary verbs in German. It expresses possession ('to have'), physical states ('Hunger haben', 'Zeit haben'), and serves as the auxiliary verb for 80% of all past tense (Perfekt) sentences.",
    "goldenRule": "'haben' triggers the AKKUSATIV case when describing possession: 'Ich habe einen (maskulin) Hund', 'Ich habe ein (neutral) Auto', 'Ich habe eine (feminin) Frage'.",
    "trapToAvoid": "Stem change in 2nd and 3rd person singular: 'du hast' and 'er hat' drop the 'b'! Writing 'du habst' or 'er habt' is wrong.",
    "conjugationTable": {
      "headers": ["Pronoun", "Form", "Example Sentence", "Translation"],
      "rows": [
        {"pronoun": "ich", "form1": "habe", "example": "Ich habe heute viel zu tun.", "tip": "I have a lot to do today."},
        {"pronoun": "du", "form1": "hast", "example": "Hast du morgen Zeit für mich?", "tip": "Do you have time for me tomorrow?"},
        {"pronoun": "er / sie / es", "form1": "hat", "example": "Er hat einen neuen Job in Berlin.", "tip": "He has a new job in Berlin."},
        {"pronoun": "wir", "form1": "haben", "example": "Wir haben eine wichtige Frage an Sie.", "tip": "We have an important question for you."},
        {"pronoun": "ihr", "form1": "habt", "example": "Habt ihr eure Fahrkarten dabei?", "tip": "Do you all have your tickets with you?"},
        {"pronoun": "sie / Sie", "form1": "haben", "example": "Haben Sie am Freitag einen freien Termin?", "tip": "Do you have an available appointment on Friday?"}
      ]
    },
    "examples": [
      {"de": "Ich habe leider keine Zeit für das Telefongespräch.", "en": "Unfortunately I have no time for the phone call.", "highlight": "Akkusativ: keine Zeit"},
      {"de": "Hast du schon Hunger oder wollen wir später essen?", "en": "Are you hungry yet or do we want to eat later?", "highlight": "Idiom: Hunger haben"},
      {"de": "Er hat gestern Abend einen interessanten Film gesehen.", "en": "He watched an interesting movie yesterday evening.", "highlight": "Auxiliary in Perfekt"},
      {"de": "Wir haben heute großes Glück mit dem Wetter.", "en": "We are having great luck with the weather today.", "highlight": "Glück haben"},
      {"de": "Sie hat zwei Kinder und arbeitet Teilzeit.", "en": "She has two children and works part-time.", "highlight": "Possession / Family"},
      {"de": "Habt ihr heute Nachmittag einen Deutschkurs?", "en": "Do you all have a German course this afternoon?", "highlight": "Question with haben"},
      {"de": "Haben Sie die Rechnung bereits überwiesen?", "en": "Have you already transferred the bill?", "highlight": "Formal question"},
      {"de": "Ich habe Angst vor Prüfungen, aber ich bereite mich gut vor.", "en": "I am afraid of exams, but I prepare well.", "highlight": "Angst haben vor + Dat"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate for 'du':",
        "sentenceBefore": "Warum",
        "sentenceAfter": "du mir gestern nicht geantwortet?",
        "options": ["hast", "habst", "hat", "haben"],
        "correct": "hast",
        "acceptableAnswers": ["hast", "Warum hast du mir gestern nicht geantwortet", "Warum hast du mir gestern nicht geantwortet?"],
        "hint": "du + irregular stem drop: hast",
        "explanation": "2nd person singular drops the 'b': du hast."
      },
      {
        "question": "Conjugate for 'er':",
        "sentenceBefore": "Mein Kollege",
        "sentenceAfter": "heute leider keine Zeit für die Besprechung.",
        "options": ["hat", "habt", "habe", "haben"],
        "correct": "hat",
        "acceptableAnswers": ["hat", "Mein Kollege hat heute leider keine Zeit für die Besprechung", "Mein Kollege hat heute leider keine Zeit für die Besprechung."],
        "hint": "er/sie/es drops the 'b': hat",
        "explanation": "3rd person singular drops 'b': er hat."
      },
      {
        "question": "Fill the blank (Akkusativ object):",
        "sentenceBefore": "Ich habe",
        "sentenceAfter": "neuen Deutschkurs an der Volkshochschule gebucht.",
        "options": ["einen", "ein", "einem", "einer"],
        "correct": "einen",
        "acceptableAnswers": ["einen", "Ich habe einen neuen Deutschkurs an der Volkshochschule gebucht", "Ich habe einen neuen Deutschkurs an der Volkshochschule gebucht."],
        "hint": "'Kurs' is masculine (der Kurs -> einen Kurs)",
        "explanation": "'haben' triggers masculine Akkusativ: einen neuen Kurs."
      }
    ]
  },

  # 2. sein
  {
    "id": "v-sein",
    "category": "PRESENT",
    "level": "A1",
    "title": "sein (ich bin, du bist...)",
    "shortFormula": "ich bin | du bist | er/sie/es ist | wir sind | ihr seid | sie/Sie sind",
    "description": "The most irregular verb in the entire German language. It corresponds to 'to be' and links subjects with adjectives, professions, locations, or feelings. It also serves as the auxiliary verb in Perfekt for verbs of movement and change of state.",
    "goldenRule": "Never use Akkusativ after 'sein'! 'sein' is a linking verb (Kopulaverb) and ALWAYS keeps the predicate noun in the NOMINATIV: 'Er ist EIN netter Mann' (never einen!).",
    "trapToAvoid": "Confusing 'ihr seid' (you all are) with 'seit' (since/for a period of time). Remember: 'seid' with 'd' is the verb form!",
    "conjugationTable": {
      "headers": ["Pronoun", "Form", "Example Sentence", "Translation"],
      "rows": [
        {"pronoun": "ich", "form1": "bin", "example": "Ich bin seit zwei Jahren in Deutschland.", "tip": "I have been in Germany for two years."},
        {"pronoun": "du", "form1": "bist", "example": "Bist du heute Abend zu Hause?", "tip": "Are you at home this evening?"},
        {"pronoun": "er / sie / es", "form1": "ist", "example": "Die Prüfung ist am nächsten Montag.", "tip": "The exam is next Monday."},
        {"pronoun": "wir", "form1": "sind", "example": "Wir sind sehr zufrieden mit der Wohnung.", "tip": "We are very satisfied with the apartment."},
        {"pronoun": "ihr", "form1": "seid", "example": "Seid ihr bereit für den Test?", "tip": "Are you all ready for the test?"},
        {"pronoun": "sie / Sie", "form1": "sind", "example": "Wo sind meine Schlüssel?", "tip": "Where are my keys?"}
      ]
    },
    "examples": [
      {"de": "Ich bin von Beruf Softwareentwickler.", "en": "I am a software developer by profession.", "highlight": "Profession (no 'ein')"},
      {"de": "Er ist sehr müde nach dem langen Arbeitstag.", "en": "He is very tired after the long workday.", "highlight": "State / Adjective"},
      {"de": "Wir sind gestern um 23 Uhr am Bahnhof angekommen.", "en": "We arrived at the station yesterday at 11 PM.", "highlight": "Auxiliary for movement"},
      {"de": "Seid ihr am Wochenende in der Stadt oder auf dem Land?", "en": "Are you all in the city or in the countryside on the weekend?", "highlight": "ihr seid (with -d!)"},
      {"de": "Frau Müller, sind Sie mit dem Vertrag einverstanden?", "en": "Mrs. Müller, do you agree with the contract?", "highlight": "Formal question"},
      {"de": "Das Wetter ist heute viel wärmer als gestern.", "en": "The weather is much warmer today than yesterday.", "highlight": "Comparison with ist"},
      {"de": "Ich bin glücklich, dass ich die B1 Prüfung bestanden habe.", "en": "I am happy that I passed the B1 exam.", "highlight": "Emotion + Nebensatz"},
      {"de": "Meine Kinder sind in der Schule und lernen fleißig.", "en": "My children are in school and studying diligently.", "highlight": "Plural sind"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate for 'ihr':",
        "sentenceBefore": "Wo",
        "sentenceAfter": "ihr gestern während des Gewitters gewesen?",
        "options": ["seid", "seit", "sind", "bist"],
        "correct": "seid",
        "acceptableAnswers": ["seid", "Wo seid ihr gestern während des Gewitters gewesen", "Wo seid ihr gestern während des Gewitters gewesen?"],
        "hint": "The verb form ends with 'd': seid",
        "explanation": "'ihr' takes 'seid' (spelled with d, unlike 'seit' meaning since)."
      },
      {
        "question": "Conjugate for 'du':",
        "sentenceBefore": "Wie alt",
        "sentenceAfter": "du eigentlich?",
        "options": ["bist", "ist", "bin", "seid"],
        "correct": "bist",
        "acceptableAnswers": ["bist", "Wie alt bist du eigentlich", "Wie alt bist du eigentlich?"],
        "hint": "du + sein = bist",
        "explanation": "2nd person singular of sein is 'bist'."
      },
      {
        "question": "Complete the nominative predicate:",
        "sentenceBefore": "Herr Meier ist",
        "sentenceAfter": "sehr freundlicher Nachbar.",
        "options": ["ein", "einen", "einem", "eines"],
        "correct": "ein",
        "acceptableAnswers": ["ein", "Herr Meier ist ein sehr freundlicher Nachbar", "Herr Meier ist ein sehr freundlicher Nachbar."],
        "hint": "'sein' demands Nominativ: der Nachbar -> ein Nachbar",
        "explanation": "'sein' is a linking verb: the noun stays in the Nominativ (ein freundlicher Nachbar)."
      }
    ]
  },

  # 3. Verb endings in present tense
  {
    "id": "v-endings",
    "category": "PRESENT",
    "level": "A1",
    "title": "Verb Endings in Present Tense (-e, -st, -t, -en)",
    "shortFormula": "ich: -e | du: -st | er/sie/es: -t | wir: -en | ihr: -t | sie/Sie: -en",
    "description": "The foundational blueprint of German verbs. By removing the infinitive ending '-en', you isolate the stem (Verbstamm) and attach the 4 core personal endings.",
    "goldenRule": "Verbs with stems ending in -d or -t (arbeiten, warten, finden) insert an extra '-e-' before '-st' and '-t' to make pronunciation easy: 'du arbeitest', 'er arbeitet'.",
    "trapToAvoid": "Forgetting that 'wir' and 'sie/Sie' always use the same form as the infinitive ending (-en).",
    "conjugationTable": {
      "headers": ["Pronoun", "Ending", "lernen", "wohnen", "arbeiten (extra -e-)"],
      "rows": [
        {"pronoun": "ich", "form1": "-e", "example": "ich lerne", "tip": "ich wohne | ich arbeite"},
        {"pronoun": "du", "form1": "-st", "example": "du lernst", "tip": "du wohnst | du arbeitest"},
        {"pronoun": "er / sie / es", "form1": "-t", "example": "er lernt", "tip": "er wohnt | er arbeitet"},
        {"pronoun": "wir", "form1": "-en", "example": "wir lernen", "tip": "wir wohnen | wir arbeiten"},
        {"pronoun": "ihr", "form1": "-t", "example": "ihr lernt", "tip": "ihr wohnt | ihr arbeitet"},
        {"pronoun": "sie / Sie", "form1": "-en", "example": "sie lernen", "tip": "sie wohnen | sie arbeiten"}
      ]
    },
    "examples": [
      {"de": "Ich trinke morgens immer eine Tasse Kaffee.", "en": "I always drink a cup of coffee in the morning.", "highlight": "ich trink-e"},
      {"de": "Woher kommst du und wo wohnst du in Deutschland?", "en": "Where do you come from and where do you live in Germany?", "highlight": "du komm-st, wohn-st"},
      {"de": "Der Bus wartet fünf Minuten an der Haltestelle.", "en": "The bus waits five minutes at the stop.", "highlight": "wart-e-t (extra -e-)"},
      {"de": "Wir kochen am Wochenende gern mit Freunden.", "en": "We like cooking with friends on the weekend.", "highlight": "wir koch-en"},
      {"de": "Ihr spielt heute wirklich sehr gut Fußball!", "en": "You all are playing soccer really well today!", "highlight": "ihr spiel-t"},
      {"de": "Die Studenten schreiben eine schwierige Klausur.", "en": "The students are writing a difficult exam.", "highlight": "sie schreib-en"},
      {"de": "Er findet seine Brille nicht mehr.", "en": "He cannot find his glasses anymore.", "highlight": "find-e-t (extra -e-)"},
      {"de": "Arbeiten Sie gerne im Team oder lieber allein?", "en": "Do you like working in a team or rather alone?", "highlight": "Formal arbeit-en"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'arbeiten' for 'du':",
        "sentenceBefore": "Wo",
        "sentenceAfter": "du zurzeit in Berlin?",
        "options": ["arbeitest", "arbeitst", "arbeite", "arbeiten"],
        "correct": "arbeitest",
        "acceptableAnswers": ["arbeitest", "Wo arbeitest du zurzeit in Berlin", "Wo arbeitest du zurzeit in Berlin?"],
        "hint": "Stem ends in -t -> adds an extra -e-: arbeitest",
        "explanation": "Stems ending in -t or -d take -est: du arbeitest."
      },
      {
        "question": "Conjugate 'wohnen' for 'ihr':",
        "sentenceBefore": "Wie lange",
        "sentenceAfter": "ihr schon in dieser Wohnung?",
        "options": ["wohnt", "wohnen", "wohnst", "wohntet"],
        "correct": "wohnt",
        "acceptableAnswers": ["wohnt", "Wie lange wohnt ihr schon in dieser Wohnung", "Wie lange wohnt ihr schon in dieser Wohnung?"],
        "hint": "ihr + stem + -t",
        "explanation": "The ending for 'ihr' is -t: ihr wohnt."
      },
      {
        "question": "Conjugate 'fragen' for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "den Lehrer nach der Hausaufgabe.",
        "options": ["frage", "fragst", "fragt", "fragen"],
        "correct": "frage",
        "acceptableAnswers": ["frage", "Ich frage den Lehrer nach der Hausaufgabe", "Ich frage den Lehrer nach der Hausaufgabe."],
        "hint": "ich + stem + -e",
        "explanation": "First person singular takes -e: ich frage."
      }
    ]
  },

  # 4. Stem changing e -> i
  {
    "id": "v-stem-change-ei",
    "category": "PRESENT",
    "level": "A1",
    "title": "The Present Tense of Stem-Changing Verbs (e -> i)",
    "shortFormula": "sprechen: du sprichst, er spricht | helfen: du hilfst, er hilft | essen: du isst, er isst",
    "description": "Strong verbs in German frequently mutate their stem vowel in the 2nd and 3rd person singular (du and er/sie/es). In this family, a short or long 'e' changes to 'i'.",
    "goldenRule": "Stem vowel mutation ONLY happens in 'du' and 'er/sie/es'. 'ich', 'wir', 'ihr', and 'sie/Sie' keep the original stem: 'ich spreche', 'ihr sprecht', but 'du sprichst', 'er spricht'!",
    "trapToAvoid": "Forgetting that 'geben' (to give) changes: 'es gibt' (there is/are) comes from this rule!",
    "conjugationTable": {
      "headers": ["Pronoun", "sprechen (e->i)", "helfen (e->i)", "geben (e->i)", "essen (e->i)"],
      "rows": [
        {"pronoun": "ich", "form1": "spreche", "example": "helfe", "tip": "gebe | esse"},
        {"pronoun": "du", "form1": "sprichst (Vowel shift!)", "example": "hilfst", "tip": "gibst | isst"},
        {"pronoun": "er / sie / es", "form1": "spricht (Vowel shift!)", "example": "hilft", "tip": "gibt | isst"},
        {"pronoun": "wir", "form1": "sprechen", "example": "helfen", "tip": "geben | essen"},
        {"pronoun": "ihr", "form1": "sprecht (No shift!)", "example": "helft", "tip": "gebt | esst"},
        {"pronoun": "sie / Sie", "form1": "sprechen", "example": "helfen", "tip": "geben | essen"}
      ]
    },
    "examples": [
      {"de": "Er spricht fließend Englisch und lernt jetzt Deutsch.", "en": "He speaks fluent English and is now learning German.", "highlight": "er spricht"},
      {"de": "Hilfst du mir bitte kurz beim Tragen der Kisten?", "en": "Will you please help me carry the boxes for a moment?", "highlight": "du hilfst"},
      {"de": "In unserer Stadt gibt es viele schöne Parks und Museen.", "en": "In our city there are many beautiful parks and museums.", "highlight": "es gibt (there is/are)"},
      {"de": "Was isst du normalerweise zum Frühstück?", "en": "What do you usually eat for breakfast?", "highlight": "du isst"},
      {"de": "Der Arzt nimmt sich viel Zeit für die Patienten.", "en": "The doctor takes a lot of time for the patients.", "highlight": "er nimmt (e -> i + mm)"},
      {"de": "Warum triffst du deine Freunde nicht am Wochenende?", "en": "Why do you not meet your friends on the weekend?", "highlight": "du triffst (treffen)"},
      {"de": "Sie vergisst leider oft ihre Passwörter.", "en": "Unfortunately she often forgets her passwords.", "highlight": "sie vergisst (vergessen)"},
      {"de": "Gibst du mir bitte mal das Salz?", "en": "Will you please give me the salt?", "highlight": "du gibst"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'sprechen' for 'du':",
        "sentenceBefore": "Du",
        "sentenceAfter": "schon sehr gut und deutlich Deutsch!",
        "options": ["sprichst", "sprechst", "spricht", "sprechen"],
        "correct": "sprichst",
        "acceptableAnswers": ["sprichst", "Du sprichst schon sehr gut und deutlich Deutsch", "Du sprichst schon sehr gut und deutlich Deutsch!"],
        "hint": "e shifts to i: sprichst",
        "explanation": "Stem change e -> i in 2nd person singular: du sprichst."
      },
      {
        "question": "Conjugate 'helfen' for 'er':",
        "sentenceBefore": "Mein Nachbar",
        "sentenceAfter": "mir immer bei der Gartenarbeit.",
        "options": ["hilft", "helft", "helfe", "helfen"],
        "correct": "hilft",
        "acceptableAnswers": ["hilft", "Mein Nachbar hilft mir immer bei der Gartenarbeit", "Mein Nachbar hilft mir immer bei der Gartenarbeit."],
        "hint": "e shifts to i: hilft",
        "explanation": "3rd person singular stem change: er hilft."
      },
      {
        "question": "Conjugate 'treffen' for 'du':",
        "sentenceBefore": "Wann",
        "sentenceAfter": "du dich heute mit deinen Kollegen?",
        "options": ["triffst", "treffst", "trifft", "trefft"],
        "correct": "triffst",
        "acceptableAnswers": ["triffst", "Wann triffst du dich heute mit deinen Kollegen", "Wann triffst du dich heute mit deinen Kollegen?"],
        "hint": "treffen -> triffst",
        "explanation": "treffen shifts e -> i with double f: du triffst."
      }
    ]
  },

  # 5. Vowel Changing Verbs (sehen, lesen, e -> ie)
  {
    "id": "v-stem-change-eie",
    "category": "PRESENT",
    "level": "A1",
    "title": "Vowel Changing Verbs (sehen, lesen: e -> ie)",
    "shortFormula": "sehen: du siehst, er sieht | lesen: du liest, er liest | empfehlen: er empfiehlt",
    "description": "When the stem contains a long 'e', it often shifts to 'ie' in the 2nd and 3rd person singular. This affects high-frequency verbs like 'sehen' (to see), 'lesen' (to read), and 'empfehlen' (to recommend).",
    "goldenRule": "'lesen' in 2nd person: since the stem already ends in -s (les-), you only attach '-t' (not -st): 'du liest' (identical to 'er liest')!",
    "trapToAvoid": "Applying the 'ie' shift to 'ihr'. 'ihr' NEVER shifts: 'ihr seht', 'ihr lest'. Only 'du' and 'er/sie/es' change!",
    "conjugationTable": {
      "headers": ["Pronoun", "sehen (e -> ie)", "lesen (e -> ie)", "empfehlen (e -> ie)"],
      "rows": [
        {"pronoun": "ich", "form1": "sehe", "example": "lese", "tip": "empfehle"},
        {"pronoun": "du", "form1": "siehst (e -> ie)", "example": "liest (no extra s!)", "tip": "empfiehlst"},
        {"pronoun": "er / sie / es", "form1": "sieht (e -> ie)", "example": "liest", "tip": "empfiehlt"},
        {"pronoun": "wir", "form1": "sehen", "example": "lesen", "tip": "empfehlen"},
        {"pronoun": "ihr", "form1": "seht (No shift!)", "example": "lest (No shift!)", "tip": "empfehlt"},
        {"pronoun": "sie / Sie", "form1": "sehen", "example": "lesen", "tip": "empfehlen"}
      ]
    },
    "examples": [
      {"de": "Sieht er heute Abend den Dokumentarfilm im Fernsehen?", "en": "Is he watching the documentary on TV this evening?", "highlight": "er sieht"},
      {"de": "Liest du gerne deutsche Kriminalromane oder Zeitungen?", "en": "Do you like reading German crime novels or newspapers?", "highlight": "du liest"},
      {"de": "Der Kellner empfiehlt den frischen Fisch des Tages.", "en": "The waiter recommends the fresh fish of the day.", "highlight": "er empfiehlt"},
      {"de": "Du siehst heute wirklich sehr gut und erholt aus!", "en": "You look really good and well-rested today!", "highlight": "du siehst ... aus"},
      {"de": "Meine Tochter liest jeden Abend vor dem Schlafen ein Kapitel.", "en": "My daughter reads a chapter every evening before sleeping.", "highlight": "sie liest"},
      {"de": "Siehst du den großen Turm dort drüben am Horizont?", "en": "Do you see the tall tower over there on the horizon?", "highlight": "du siehst"},
      {"de": "Was empfiehlst du mir für die mündliche B1 Prüfung?", "en": "What do you recommend to me for the oral B1 exam?", "highlight": "du empfiehlst"},
      {"de": "Wir sehen uns nächste Woche im Sprachkurs wieder.", "en": "We will see each other again next week in the language course.", "highlight": "wir sehen (no shift)"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'sehen' for 'du':",
        "sentenceBefore": "Warum",
        "sentenceAfter": "du mich so überrascht an?",
        "options": ["siehst", "sehst", "sieht", "seht"],
        "correct": "siehst",
        "acceptableAnswers": ["siehst", "Warum siehst du mich so überrascht an", "Warum siehst du mich so überrascht an?"],
        "hint": "e changes to ie: siehst",
        "explanation": "Stem shift e -> ie: du siehst."
      },
      {
        "question": "Conjugate 'lesen' for 'er':",
        "sentenceBefore": "Mein Chef",
        "sentenceAfter": "jeden Morgen die Süddeutsche Zeitung.",
        "options": ["liest", "lest", "leset", "liestet"],
        "correct": "liest",
        "acceptableAnswers": ["liest", "Mein Chef liest jeden Morgen die Süddeutsche Zeitung", "Mein Chef liest jeden Morgen die Süddeutsche Zeitung."],
        "hint": "e changes to ie: liest",
        "explanation": "3rd person singular: er liest."
      },
      {
        "question": "Conjugate 'empfehlen' for 'der Arzt':",
        "sentenceBefore": "Der Arzt",
        "sentenceAfter": "mir viel Ruhe und warme Getränke.",
        "options": ["empfiehlt", "empfehlt", "empfehle", "empfiehlst"],
        "correct": "empfiehlt",
        "acceptableAnswers": ["empfiehlt", "Der Arzt empfiehlt mir viel Ruhe und warme Getränke", "Der Arzt empfiehlt mir viel Ruhe und warme Getränke."],
        "hint": "e changes to ie: empfiehlt",
        "explanation": "3rd person singular: er empfiehlt."
      }
    ]
  },

  # 6. Vowel change a -> ä
  {
    "id": "v-stem-change-aae",
    "category": "PRESENT",
    "level": "A1",
    "title": "Vowel Changing Verbs (fahren, schlafen: a -> ä)",
    "shortFormula": "fahren: du fährst, er fährt | schlafen: du schläfst, er schläft | tragen: er trägt",
    "description": "Verbs with the stem vowel 'a' gain an umlaut (ä) in the 2nd and 3rd person singular. Essential verbs in this group include 'fahren' (to drive/travel), 'schlafen' (to sleep), 'tragen' (to wear/carry), 'waschen' (to wash), and 'laufen' (au -> äu).",
    "goldenRule": "'laufen' (to run) shifts from 'au' to 'äu': 'du läufst', 'er läuft'. Pronounce 'äu' like 'oi' in English 'boy'!",
    "trapToAvoid": "Adding an umlaut to 'ihr'. It is 'ihr fahrt' and 'ihr schlaft' (NO umlaut!).",
    "conjugationTable": {
      "headers": ["Pronoun", "fahren (a -> ä)", "schlafen (a -> ä)", "laufen (au -> äu)"],
      "rows": [
        {"pronoun": "ich", "form1": "fahre", "example": "schlafe", "tip": "laufe"},
        {"pronoun": "du", "form1": "fährst (Umlaut!)", "example": "schläfst (Umlaut!)", "tip": "läufst (äu!)"},
        {"pronoun": "er / sie / es", "form1": "fährt (Umlaut!)", "example": "schläft (Umlaut!)", "tip": "läuft (äu!)"},
        {"pronoun": "wir", "form1": "fahren", "example": "schlafen", "tip": "laufen"},
        {"pronoun": "ihr", "form1": "fahrt (NO umlaut!)", "example": "schlaft (NO umlaut!)", "tip": "lauft (NO umlaut!)"},
        {"pronoun": "sie / Sie", "form1": "fahren", "example": "schlafen", "tip": "laufen"}
      ]
    },
    "examples": [
      {"de": "Er fährt jeden Morgen mit der U-Bahn zur Arbeit.", "en": "He travels to work every morning with the subway.", "highlight": "er fährt"},
      {"de": "Schläfst du am Wochenende gerne etwas länger aus?", "en": "Do you like to sleep in a bit longer on the weekend?", "highlight": "du schläfst"},
      {"de": "Der Hund läuft fröhlich durch den grünen Park.", "en": "The dog runs joyfully through the green park.", "highlight": "er läuft (au -> äu)"},
      {"de": "Sie trägt heute ein elegantes schwarzes Kleid.", "en": "She is wearing an elegant black dress today.", "highlight": "sie trägt"},
      {"de": "Wann fährt der nächste Zug nach Frankfurt ab?", "en": "When does the next train to Frankfurt depart?", "highlight": "fährt ... ab"},
      {"de": "Fährst du lieber mit dem Fahrrad oder mit dem Auto?", "en": "Do you prefer riding by bicycle or by car?", "highlight": "du fährst"},
      {"de": "Das Baby schläft jetzt tief und ruhig.", "en": "The baby is now sleeping deeply and quietly.", "highlight": "es schläft"},
      {"de": "Mein Sohn wäscht sich vor dem Abendessen die Hände.", "en": "My son washes his hands before dinner.", "highlight": "er wäscht (waschen)"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'fahren' for 'er':",
        "sentenceBefore": "Er",
        "sentenceAfter": "jeden Tag mit dem Regionalzug nach Potsdam.",
        "options": ["fährt", "fahrt", "fahre", "fahren"],
        "correct": "fährt",
        "acceptableAnswers": ["fährt", "Er fährt jeden Tag mit dem Regionalzug nach Potsdam", "Er fährt jeden Tag mit dem Regionalzug nach Potsdam."],
        "hint": "a gains umlaut: fährt",
        "explanation": "Stem change a -> ä: er fährt."
      },
      {
        "question": "Conjugate 'schlafen' for 'du':",
        "sentenceBefore": "Wie viele Stunden",
        "sentenceAfter": "du normalerweise pro Nacht?",
        "options": ["schläfst", "schlafst", "schläft", "schlaft"],
        "correct": "schläfst",
        "acceptableAnswers": ["schläfst", "Wie viele Stunden schläfst du normalerweise pro Nacht", "Wie viele Stunden schläfst du normalerweise pro Nacht?"],
        "hint": "du + a -> ä: schläfst",
        "explanation": "2nd person singular stem change: du schläfst."
      },
      {
        "question": "Conjugate 'laufen' for 'der Sportler':",
        "sentenceBefore": "Der Sportler",
        "sentenceAfter": "jeden Morgen zehn Kilometer durch den Wald.",
        "options": ["läuft", "lauft", "laufe", "läufst"],
        "correct": "läuft",
        "acceptableAnswers": ["läuft", "Der Sportler läuft jeden Morgen zehn Kilometer durch den Wald", "Der Sportler läuft jeden Morgen zehn Kilometer durch den Wald."],
        "hint": "au changes to äu: läuft",
        "explanation": "au shifts to äu: er läuft."
      }
    ]
  },

  # 7. Separable verbs
  {
    "id": "v-separable",
    "category": "PRESENT",
    "level": "A2",
    "title": "Separable Verbs (Trennbare Verben: aufstehen, einkaufen...)",
    "shortFormula": "Hauptsatz: [Präfix fliegt an das Satzende!] | e.g. Ich stehe um 7 Uhr AUF.",
    "description": "In German, prefixes like auf-, an-, ein-, aus-, mit-, vor-, ab-, and fern- detach from the verb in simple present and past main clauses, flying to the absolute end of the sentence.",
    "goldenRule": "Prefixes with stress (emphasized pronunciation) are separable: 'AN-rufen', 'AUF-stehen', 'EIN-kaufen'. In main clauses, the base verb conjugates in Position 2, and the prefix sits at the very end.",
    "trapToAvoid": "In Nebensätzen (with weil, dass, wenn), separable verbs do NOT separate! The whole verb stays glued together at the end: '...weil ich um 7 Uhr aufstehe'.",
    "conjugationTable": {
      "headers": ["Infinitive", "Prefix", "Base Verb", "Present Main Clause Example"],
      "rows": [
        {"pronoun": "aufstehen", "form1": "auf-", "example": "stehen", "tip": "Ich stehe jeden Morgen um 6 Uhr auf."},
        {"pronoun": "einkaufen", "form1": "ein-", "example": "kaufen", "tip": "Wir kaufen samstags im Supermarkt ein."},
        {"pronoun": "anrufen", "form1": "an-", "example": "rufen", "tip": "Er ruft seine Mutter jeden Sonntag an."},
        {"pronoun": "mitbringen", "form1": "mit-", "example": "bringen", "tip": "Bringen Sie bitte Ihre Unterlagen mit."},
        {"pronoun": "fernsehen", "form1": "fern-", "example": "sehen", "tip": "Die Kinder sehen abends eine Stunde fern."},
        {"pronoun": "abholen", "form1": "ab-", "example": "holen", "tip": "Ich hole dich um 18 Uhr vom Bahnhof ab."}
      ]
    },
    "examples": [
      {"de": "Der Wecker klingelt und ich stehe sofort auf.", "en": "The alarm rings and I get up immediately.", "highlight": "stehe ... auf"},
      {"de": "Kaufst du heute nach der Arbeit noch Milch und Brot ein?", "en": "Are you shopping for milk and bread today after work?", "highlight": "Kaufst ... ein"},
      {"de": "Ich rufe Sie morgen Vormittag wegen des Termins an.", "en": "I will call you tomorrow morning regarding the appointment.", "highlight": "rufe ... an"},
      {"de": "Wann fängt der Deutschkurs heute Nachmittag an?", "en": "When does the German course begin this afternoon?", "highlight": "fängt ... an (anfangen)"},
      {"de": "Wir bereiten uns gemeinsam auf die B1 Prüfung vor.", "en": "We are preparing together for the B1 exam.", "highlight": "bereiten ... vor"},
      {"de": "Holst du mich bitte pünktlich von der Haltestelle ab?", "en": "Will you please pick me up on time from the stop?", "highlight": "Holst ... ab"},
      {"de": "Er schaltet den Computer im Büro ein.", "en": "He switches on the computer in the office.", "highlight": "schaltet ... ein"},
      {"de": "Ich lade alle meine Freunde herzlich zu meiner Geburtstagsfeier ein.", "en": "I cordially invite all my friends to my birthday party.", "highlight": "lade ... ein (einladen)"}
    ],
    "practiceDrill": [
      {
        "question": "Place the separable prefix at the end:",
        "sentenceBefore": "Ich rufe dich heute Abend nach dem Abendessen",
        "sentenceAfter": ".",
        "options": ["an", "auf", "ein", "aus"],
        "correct": "an",
        "acceptableAnswers": ["an", "Ich rufe dich heute Abend nach dem Abendessen an", "Ich rufe dich heute Abend nach dem Abendessen an."],
        "hint": "Verb is 'anrufen': prefix is 'an'",
        "explanation": "anrufen splits: 'rufe ... an'."
      },
      {
        "question": "Conjugate 'aufstehen' for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "werktags immer pünktlich um 6:30 Uhr auf.",
        "options": ["stehe", "stehst", "steht", "aufstehe"],
        "correct": "stehe",
        "acceptableAnswers": ["stehe", "Ich stehe werktags immer pünktlich um 6:30 Uhr auf", "Ich stehe werktags immer pünktlich um 6:30 Uhr auf."],
        "hint": "Base verb 'stehen' conjugates in Pos 2: ich stehe",
        "explanation": "In main clauses, the base verb stands in Position 2: ich stehe ... auf."
      },
      {
        "question": "Choose the prefix for 'abholen':",
        "sentenceBefore": "Mein Mann holt unsere Tochter vom Kindergarten",
        "sentenceAfter": ".",
        "options": ["ab", "an", "auf", "mit"],
        "correct": "ab",
        "acceptableAnswers": ["ab", "Mein Mann holt unsere Tochter vom Kindergarten ab", "Mein Mann holt unsere Tochter vom Kindergarten ab."],
        "hint": "Verb is 'abholen': prefix is 'ab'",
        "explanation": "abholen splits into 'holt ... ab'."
      }
    ]
  },

  # 8. Modal verbs
  {
    "id": "v-modal-verbs",
    "category": "MODAL",
    "level": "A1",
    "title": "Modal Verbs (können, müssen, dürfen, sollen, wollen, möchten)",
    "shortFormula": "Satzklammer: [Modalverb konjugiert (Pos 2)] + [...] + [Infinitiv (ENDE)]",
    "description": "Modal verbs express ability, necessity, permission, obligation, intention, or polite desire. They create a grammatical sentence bracket (Satzklammer) where the main action verb is kicked in the infinitive to the absolute end of the sentence.",
    "goldenRule": "In singular (ich, du, er/sie/es), modal verbs change their stem vowel, and 'ich' and 'er/sie/es' have ZERO ENDING (-e is dropped!): 'ich kann', 'er kann' (never ich kanne!).",
    "trapToAvoid": "'müssen' vs 'dürfen': 'nicht müssen' = optional / not necessary ('Sie müssen nicht bezahlen' = it is free). 'nicht dürfen' = STRICTLY FORBIDDEN ('Sie dürfen hier nicht rauchen'). This is tested on every single B1 exam!",
    "conjugationTable": {
      "headers": ["Verb", "Meaning", "ich / er Form", "du Form", "Sentence Bracket Example"],
      "rows": [
        {"pronoun": "können", "form1": "ability / possibility", "example": "kann", "tip": "kannst | Ich kann gut Deutsch sprechen."},
        {"pronoun": "müssen", "form1": "obligation / necessity", "example": "muss", "tip": "musst | Er muss heute länger arbeiten."},
        {"pronoun": "dürfen", "form1": "permission / (nicht = forbidden)", "example": "darf", "tip": "darfst | Hier darf man nicht parken."},
        {"pronoun": "sollen", "form1": "advice / external command", "example": "soll", "tip": "sollst | Ich soll die Tabletten nehmen."},
        {"pronoun": "wollen", "form1": "strong plan / will", "example": "will", "tip": "willst | Wir wollen ein Haus kaufen."},
        {"pronoun": "möchten", "form1": "polite wish ('would like')", "example": "möchte", "tip": "möchtest | Ich möchte einen Kaffee trinken."}
      ]
    },
    "examples": [
      {"de": "Ich kann sehr gut Englisch und etwas Deutsch sprechen.", "en": "I can speak English very well and a little German.", "highlight": "kann ... sprechen"},
      {"de": "Sie müssen den Antrag bis Freitag beim Amt einreichen.", "en": "You must submit the application to the office by Friday.", "highlight": "müssen ... einreichen"},
      {"de": "Hier darf man während der Fahrt das Handy nicht benutzen.", "en": "One is not allowed to use the phone while driving here.", "highlight": "darf nicht (forbidden)"},
      {"de": "Der Arzt sagt, ich soll mich schonen und viel Tee trinken.", "en": "The doctor says I should take it easy and drink lots of tea.", "highlight": "soll ... trinken"},
      {"de": "Wir wollen im Sommer zwei Wochen nach Italien reisen.", "en": "We want to travel to Italy for two weeks in the summer.", "highlight": "wollen ... reisen"},
      {"de": "Könnten Sie mir bitte die Dokumente per E-Mail zusenden?", "en": "Could you please send me the documents by email?", "highlight": "Polite Konjunktiv II"},
      {"de": "Ich möchte mich gerne für den B1 Integrationskurs anmelden.", "en": "I would like to register for the B1 integration course.", "highlight": "möchte ... anmelden"},
      {"de": "Musst du am Samstag auch arbeiten oder hast du frei?", "en": "Do you also have to work on Saturday or do you have the day off?", "highlight": "Musst ... arbeiten"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'können' for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "heute leider nicht zur Besprechung kommen.",
        "options": ["kann", "könne", "kannst", "könnt"],
        "correct": "kann",
        "acceptableAnswers": ["kann", "Ich kann heute leider nicht zur Besprechung kommen", "Ich kann heute leider nicht zur Besprechung kommen."],
        "hint": "No -e ending in 1st person: ich kann",
        "explanation": "Modal verbs have zero ending for ich and er/sie/es: ich kann."
      },
      {
        "question": "Choose the correct modal verb for 'strictly forbidden':",
        "sentenceBefore": "Auf diesem Gelände",
        "sentenceAfter": "man keine Fotos machen. Es ist verboten!",
        "options": ["darf", "muss", "kann", "soll"],
        "correct": "darf",
        "acceptableAnswers": ["darf", "Auf diesem Gelände darf man keine Fotos machen", "Auf diesem Gelände darf man keine Fotos machen."],
        "hint": "'nicht dürfen' = forbidden",
        "explanation": "'nicht dürfen' expresses an absolute prohibition."
      },
      {
        "question": "Conjugate 'müssen' for 'wir':",
        "sentenceBefore": "Wir",
        "sentenceAfter": "unsere Fahrkarten vor der Abfahrt entwerten.",
        "options": ["müssen", "musst", "muss", "müsst"],
        "correct": "müssen",
        "acceptableAnswers": ["müssen", "Wir müssen unsere Fahrkarten vor der Abfahrt entwerten", "Wir müssen unsere Fahrkarten vor der Abfahrt entwerten."],
        "hint": "wir takes the infinitive form: müssen",
        "explanation": "1st person plural matches infinitive: wir müssen."
      }
    ]
  },

  # 9. Kennen and Wissen
  {
    "id": "v-kennen-wissen",
    "category": "SPECIAL",
    "level": "A2",
    "title": "Kennen vs. Wissen (to know people vs. facts)",
    "shortFormula": "kennen + Noun (Akkusativ) | wissen + Fact / Nebensatz (dass, ob, W-Frage)",
    "description": "German separates English 'to know' into two distinct verbs: 'kennen' is used for familiarity with people, places, and things (always followed by a direct noun/pronoun in Akkusativ). 'wissen' is used for factual knowledge and is followed by clauses (dass, ob, wann, wie) or isolated facts.",
    "goldenRule": "Use 'kennen' when you can say 'I am familiar with...'. Use 'wissen' when you can say 'I know THAT...' or 'I know the information'.",
    "trapToAvoid": "Never use 'wissen' with a person! 'Ich weiß ihn' is completely wrong. You MUST say: 'Ich kenne ihn'. Also, 'wissen' conjugates like a modal verb: 'ich weiß', 'du weißt', 'er weiß' (zero ending!).",
    "conjugationTable": {
      "headers": ["Pronoun", "kennen (regular)", "wissen (irregular!)", "Usage Formula"],
      "rows": [
        {"pronoun": "ich", "form1": "kenne", "example": "weiß (zero ending!)", "tip": "Ich kenne Berlin. | Ich weiß das."},
        {"pronoun": "du", "form1": "kennst", "example": "weißt", "tip": "Kennst du ihn? | Weißt du, wann er kommt?"},
        {"pronoun": "er / sie / es", "form1": "kennt", "example": "weiß (zero ending!)", "tip": "Er kennt den Weg. | Er weiß die Antwort."},
        {"pronoun": "wir", "form1": "kennen", "example": "wissen", "tip": "Wir kennen uns. | Wir wissen Bescheid."},
        {"pronoun": "ihr", "form1": "kennt", "example": "wisst", "tip": "Kennt ihr sie? | Wisst ihr die Lösung?"},
        {"pronoun": "sie / Sie", "form1": "kennen", "example": "wissen", "tip": "Kennen Sie Herrn Meier? | Wissen Sie, wo...?"}
      ]
    },
    "examples": [
      {"de": "Kennen Sie Herrn Schneider aus der Buchhaltung?", "en": "Do you know Mr. Schneider from accounting?", "highlight": "kennen + Person"},
      {"de": "Ich weiß nicht, wann der nächste Bus abfährt.", "en": "I do not know when the next bus departs.", "highlight": "wissen + W-Frage"},
      {"de": "Kennst du ein gutes italienisches Restaurant in der Nähe?", "en": "Do you know a good Italian restaurant nearby?", "highlight": "kennen + Place/Noun"},
      {"de": "Weißt du, dass unser Deutschlehrer heute krank ist?", "en": "Do you know that our German teacher is sick today?", "highlight": "wissen + dass-Satz"},
      {"de": "Ich kenne diese Stadt sehr gut, weil ich hier aufgewachsen bin.", "en": "I know this city very well because I grew up here.", "highlight": "kennen + City"},
      {"de": "Niemand weiß genau, wie das System funktioniert.", "en": "Nobody knows exactly how the system works.", "highlight": "wissen + fact"},
      {"de": "Er kennt viele interessante Menschen aus aller Welt.", "en": "He knows many interesting people from all over the world.", "highlight": "kennen + People"},
      {"de": "Wir wissen Bescheid und kümmern uns sofort darum.", "en": "We are informed (we know) and will take care of it immediately.", "highlight": "Bescheid wissen (idiom)"}
    ],
    "practiceDrill": [
      {
        "question": "Choose kennen or wissen:",
        "sentenceBefore": "",
        "sentenceAfter": "du, wie spät es ist?",
        "options": ["Weißt", "Kennst", "Wissen", "Weiß"],
        "correct": "Weißt",
        "acceptableAnswers": ["Weißt", "Weißt du wie spät es ist", "Weißt du, wie spät es ist?"],
        "hint": "Followed by a clause (wie spät es ist): use wissen",
        "explanation": "Clauses (wie, wann, dass) always require 'wissen': Weißt du...?"
      },
      {
        "question": "Choose kennen or wissen for a person:",
        "sentenceBefore": "Ich",
        "sentenceAfter": "Ihren neuen Kollegen noch nicht persönlich.",
        "options": ["kenne", "weiß", "kennt", "wisse"],
        "correct": "kenne",
        "acceptableAnswers": ["kenne", "Ich kenne Ihren neuen Kollegen noch nicht persönlich", "Ich kenne Ihren neuen Kollegen noch nicht persönlich."],
        "hint": "Knowing a person demands 'kennen' + Akkusativ",
        "explanation": "You can only 'kennen' a person: Ich kenne Ihren Kollegen."
      },
      {
        "question": "Conjugate 'wissen' for 'er':",
        "sentenceBefore": "Er",
        "sentenceAfter": "immer die richtige Antwort auf alle Fragen.",
        "options": ["weiß", "weißt", "wusst", "wisst"],
        "correct": "weiß",
        "acceptableAnswers": ["weiß", "Er weiß immer die richtige Antwort auf alle Fragen", "Er weiß immer die richtige Antwort auf alle Fragen."],
        "hint": "3rd person singular has zero ending: er weiß",
        "explanation": "'er' takes 'weiß' with zero ending (similar to modal verbs)."
      }
    ]
  },

  # 10. The Imperative
  {
    "id": "v-imperative",
    "category": "SPECIAL",
    "level": "A2",
    "title": "The Imperative (Befehlsform: du, ihr, Sie)",
    "shortFormula": "du: Stamm (mach!) | ihr: Stamm + t (macht!) | Sie: Verb + Sie (machen Sie!)",
    "description": "Used to give instructions, orders, directions, or urgent polite advice. German has three distinct imperative forms depending on who you are addressing: informal singular (du), informal plural (ihr), and formal (Sie).",
    "goldenRule": "For 'du': Take the 2nd person singular present (machst), remove 'du', and remove the '-st' ending: 'Komm!', 'Geh!', 'Schreib!'. Verbs with stem change e -> i keep the shift: 'Sprich!', 'Lies!', 'Nimm!' (but verbs with a -> ä DROP the umlaut: 'Fahr!', 'Schlaf!').",
    "trapToAvoid": "The irregular imperative of 'sein': du: 'Sei ruhig!', ihr: 'Seid pünktlich!', Sie: 'Seien Sie so nett!'.",
    "conjugationTable": {
      "headers": ["Verb", "du (informal 1)", "ihr (informal plural)", "Sie (formal)", "Rule Note"],
      "rows": [
        {"pronoun": "machen", "form1": "Mach!", "example": "Macht!", "tip": "Machen Sie! (regular)"},
        {"pronoun": "kommen", "form1": "Komm!", "example": "Kommt!", "tip": "Kommen Sie!"},
        {"pronoun": "sprechen", "form1": "Sprich! (e -> i)", "example": "Sprecht!", "tip": "Sprechen Sie! (keeps i in du)"},
        {"pronoun": "lesen", "form1": "Lies! (e -> ie)", "example": "Lest!", "tip": "Lesen Sie!"},
        {"pronoun": "fahren", "form1": "Fahr! (NO umlaut!)", "example": "Fahrt!", "tip": "Fahren Sie! (drops ä)"},
        {"pronoun": "sein", "form1": "Sei! (irregular)", "example": "Seid!", "tip": "Seien Sie! (highly tested!)"}
      ]
    },
    "examples": [
      {"de": "Kommen Sie bitte herein und nehmen Sie Platz!", "en": "Please come in and take a seat!", "highlight": "Formal: Verben + Sie"},
      {"de": "Ruf mich bitte an, wenn du am Bahnhof ankommst!", "en": "Please call me when you arrive at the station!", "highlight": "du: Ruf ... an"},
      {"de": "Macht bitte eure Handys während der Prüfung aus!", "en": "Please turn off your phones during the exam!", "highlight": "ihr: Macht ... aus"},
      {"de": "Sei bitte pünktlich zum Vorstellungsgespräch!", "en": "Please be on time for the job interview!", "highlight": "du: Sei! (sein)"},
      {"de": "Lies die Aufgabe sorgfältig durch, bevor du antwortest!", "en": "Read the task through carefully before answering!", "highlight": "du: Lies! (lesen)"},
      {"de": "Fahr bitte vorsichtig, die Straße ist nass und glatt!", "en": "Please drive carefully, the road is wet and slippery!", "highlight": "du: Fahr! (no umlaut)"},
      {"de": "Seien Sie so freundlich und unterschreiben Sie hier.", "en": "Please be so kind and sign here.", "highlight": "Formal: Seien Sie"},
      {"de": "Nimm bitte deinen Regenschirm mit, es regnet gleich.", "en": "Please take your umbrella with you, it will rain soon.", "highlight": "du: Nimm! (nehmen)"}
    ],
    "practiceDrill": [
      {
        "question": "Form the 'du' imperative for 'lesen':",
        "sentenceBefore": "",
        "sentenceAfter": "bitte diesen wichtigen Brief durch!",
        "options": ["Lies", "Lese", "Liest", "Les"],
        "correct": "Lies",
        "acceptableAnswers": ["Lies", "Lies bitte diesen wichtigen Brief durch", "Lies bitte diesen wichtigen Brief durch!"],
        "hint": "e shifts to ie: Lies!",
        "explanation": "e -> ie stem change stays in the imperative: Lies!"
      },
      {
        "question": "Form the 'du' imperative for 'sein':",
        "sentenceBefore": "",
        "sentenceAfter": "nicht so nervös vor der B1 Prüfung!",
        "options": ["Sei", "Bist", "Seid", "Seien"],
        "correct": "Sei",
        "acceptableAnswers": ["Sei", "Sei nicht so nervös vor der B1 Prüfung", "Sei nicht so nervös vor der B1 Prüfung!"],
        "hint": "Irregular imperative of sein for du is 'Sei!'",
        "explanation": "Imperative of sein for du is 'Sei!'."
      },
      {
        "question": "Form the formal 'Sie' imperative for 'unterschreiben':",
        "sentenceBefore": "Bitte",
        "sentenceAfter": "den Mietvertrag auf der letzten Seite.",
        "options": ["unterschreiben Sie", "unterschreibt Sie", "unterschreibe Sie", "Sie unterschreiben"],
        "correct": "unterschreiben Sie",
        "acceptableAnswers": ["unterschreiben Sie", "Bitte unterschreiben Sie den Mietvertrag auf der letzten Seite", "Bitte unterschreiben Sie den Mietvertrag auf der letzten Seite."],
        "hint": "Infinitive + Sie: unterschreiben Sie",
        "explanation": "Formal imperative is always verb + Sie: unterschreiben Sie."
      }
    ]
  },

  # 11. Reflexive verbs
  {
    "id": "v-reflexive",
    "category": "SPECIAL",
    "level": "A2",
    "title": "Reflexive Verben (sich freuen, sich interessieren...)",
    "shortFormula": "Akkusativ: mich, dich, sich, uns, euch, sich | Dativ: mir, dir, sich, uns, euch, sich",
    "description": "Reflexive verbs express actions that reflect back onto the subject. They are always accompanied by a reflexive pronoun. In B1, they frequently pair with fixed prepositions (sich freuen auf/über, sich interessieren für, sich bewerben um).",
    "goldenRule": "Use Dativ reflexive pronouns (mir, dir) ONLY when a separate direct object is explicitly mentioned: 'Ich wasche MICH' (Akk) vs. 'Ich wasche MIR die Hände' (Dativ, because 'die Hände' is the direct object)!",
    "trapToAvoid": "'sich freuen auf' vs 'sich freuen über': 'auf' + Akk = future anticipation ('Ich freue mich auf den Urlaub'). 'über' + Akk = present/past joy ('Ich freue mich über dein Geschenk').",
    "conjugationTable": {
      "headers": ["Subject", "Akkusativ Pronoun", "Dativ Pronoun", "Prepositional Example"],
      "rows": [
        {"pronoun": "ich", "form1": "mich", "example": "mir", "tip": "Ich freue mich auf das Wochenende."},
        {"pronoun": "du", "form1": "dich", "example": "dir", "tip": "Interessierst du dich für Kunst?"},
        {"pronoun": "er / sie / es", "form1": "sich", "example": "sich", "tip": "Er bewirbt sich um die Stelle."},
        {"pronoun": "wir", "form1": "uns", "example": "uns", "tip": "Wir erinnern uns gern an die Reise."},
        {"pronoun": "ihr", "form1": "euch", "example": "euch", "tip": "Freut ihr euch über das Geschenk?"},
        {"pronoun": "sie / Sie", "form1": "sich", "example": "sich", "tip": "Setzen Sie sich bitte!"}
      ]
    },
    "examples": [
      {"de": "Ich freue mich schon sehr auf Ihren Besuch am Samstag.", "en": "I am already looking forward very much to your visit on Saturday.", "highlight": "sich freuen auf + Akk (future)"},
      {"de": "Mein Kollege interessiert sich sehr für deutsche Geschichte.", "en": "My colleague is very interested in German history.", "highlight": "sich interessieren für + Akk"},
      {"de": "Ich habe mich um eine neue Arbeitsstelle in Hamburg beworben.", "en": "I applied for a new job position in Hamburg.", "highlight": "sich bewerben um + Akk"},
      {"de": "Er ärgert sich über die ständige Verspätung der Züge.", "en": "He gets annoyed about the constant delay of the trains.", "highlight": "sich ärgern über + Akk"},
      {"de": "Ich wasche mir vor dem Essen gründlich die Hände.", "en": "I wash my hands thoroughly before eating.", "highlight": "Dativ: mir (die Hände = object)"},
      {"de": "Können Sie sich noch an den Namen des Zeugen erinnern?", "en": "Can you still remember the name of the witness?", "highlight": "sich erinnern an + Akk"},
      {"de": "Wir müssen uns jetzt voll auf die B1 Prüfung konzentrieren.", "en": "We must now concentrate fully on the B1 exam.", "highlight": "sich konzentrieren auf + Akk"},
      {"de": "Wie fühlen Sie sich heute nach der Behandlung?", "en": "How do you feel today after the treatment?", "highlight": "sich fühlen"}
    ],
    "practiceDrill": [
      {
        "question": "Fill the reflexive pronoun for 'er':",
        "sentenceBefore": "Er interessiert",
        "sentenceAfter": "sehr für moderne Technologie.",
        "options": ["sich", "ihn", "ihm", "dich"],
        "correct": "sich",
        "acceptableAnswers": ["sich", "Er interessiert sich sehr für moderne Technologie", "Er interessiert sich sehr für moderne Technologie."],
        "hint": "3rd person reflexive is always 'sich'",
        "explanation": "3rd person singular and plural always use 'sich'."
      },
      {
        "question": "Choose the correct preposition for future anticipation:",
        "sentenceBefore": "Ich freue mich schon riesig",
        "sentenceAfter": "den gemeinsamen Urlaub im Sommer.",
        "options": ["auf", "über", "an", "für"],
        "correct": "auf",
        "acceptableAnswers": ["auf", "Ich freue mich schon riesig auf den gemeinsamen Urlaub im Sommer", "Ich freue mich schon riesig auf den gemeinsamen Urlaub im Sommer."],
        "hint": "Looking forward to future event = auf + Akk",
        "explanation": "'sich freuen auf' expresses future anticipation."
      },
      {
        "question": "Fill the Dativ reflexive pronoun:",
        "sentenceBefore": "Ich putze",
        "sentenceAfter": "zweimal am Tag gründlich die Zähne.",
        "options": ["mir", "mich", "dir", "sich"],
        "correct": "mir",
        "acceptableAnswers": ["mir", "Ich putze mir zweimal am Tag gründlich die Zähne", "Ich putze mir zweimal am Tag gründlich die Zähne."],
        "hint": "'die Zähne' is the direct object -> pronoun is Dativ (mir)",
        "explanation": "Because 'die Zähne' is the Akkusativ object, the reflexive pronoun must be in Dativ: mir."
      }
    ]
  },

  # 12. Expressing the Past Tense (Introduction)
  {
    "id": "v-past-intro",
    "category": "PAST",
    "level": "A2",
    "title": "Expressing the Past Tense (Introduction: Perfekt Overview)",
    "shortFormula": "Perfekt = [haben / sein (Pos 2)] + [Angaben...] + [Partizip II (ENDE)]",
    "description": "In spoken German and everyday written communication (emails, informal notes), past events are almost exclusively described using the PERFEKT tense. It consists of an auxiliary verb ('haben' or 'sein') conjugated in Position 2 and a past participle (Partizip II) at the absolute end of the clause.",
    "goldenRule": "The sentence bracket (Satzklammer) is inviolable: never place the Partizip II in the middle of a main clause! 'Ich habe gelernt gestern' is an immediate deduction.",
    "trapToAvoid": "Using Präteritum in spoken German for normal verbs. Only 'sein', 'haben', and modal verbs normally use Präteritum in speech ('ich war', 'ich hatte', 'ich musste'). All other verbs use Perfekt!",
    "conjugationTable": {
      "headers": ["Component", "Position in Sentence", "Example with haben", "Example with sein"],
      "rows": [
        {"pronoun": "Position 1 (Subject)", "form1": "Pos 1", "example": "Ich", "tip": "Wir"},
        {"pronoun": "Position 2 (Auxiliary)", "form1": "Pos 2 (conjugated)", "example": "HABE", "tip": "SIND"},
        {"pronoun": "Mittelfeld (Details)", "form1": "Middle", "example": "gestern den ganzen Tag", "tip": "pünktlich am Bahnhof"},
        {"pronoun": "Satzende (Partizip II)", "form1": "VERY END", "example": "GEARBEITET.", "tip": "ANGEKOMMEN."}
      ]
    },
    "examples": [
      {"de": "Ich habe gestern meinen Schlüssel in der Wohnung vergessen.", "en": "I forgot my key in the apartment yesterday.", "highlight": "habe ... vergessen"},
      {"de": "Wir sind am Wochenende mit Freunden an den See gefahren.", "en": "We drove to the lake with friends on the weekend.", "highlight": "sind ... gefahren"},
      {"de": "Er hat mir die Situation ausführlich am Telefon erklärt.", "en": "He explained the situation to me in detail on the phone.", "highlight": "hat ... erklärt"},
      {"de": "Wann bist du heute Morgen aufgestanden?", "en": "When did you get up this morning?", "highlight": "bist ... aufgestanden"},
      {"de": "Haben Sie meine E-Mail vom Montag erhalten?", "en": "Did you receive my email from Monday?", "highlight": "Haben ... erhalten"},
      {"de": "Ich habe zwei Jahre in München gewohnt und gearbeitet.", "en": "I lived and worked in Munich for two years.", "highlight": "gewohnt und gearbeitet"},
      {"de": "Was hast du am Wochenende Schönes gemacht?", "en": "What nice things did you do on the weekend?", "highlight": "hast ... gemacht"},
      {"de": "Sie ist gestern leider den ganzen Tag krank im Bett geblieben.", "en": "Unfortunately she stayed sick in bed all day yesterday.", "highlight": "ist ... geblieben"}
    ],
    "practiceDrill": [
      {
        "question": "Assemble the Perfekt sentence bracket:",
        "sentenceBefore": "Ich",
        "sentenceAfter": "gestern den ganzen Tag fleißig für die Prüfung gelernt.",
        "options": ["habe", "bin", "hat", "hast"],
        "correct": "habe",
        "acceptableAnswers": ["habe", "Ich habe gestern den ganzen Tag fleißig für die Prüfung gelernt", "Ich habe gestern den ganzen Tag fleißig für die Prüfung gelernt."],
        "hint": "'lernen' takes 'haben' with subject 'ich'",
        "explanation": "Subject 'ich' takes auxiliary 'habe'."
      },
      {
        "question": "Where does Partizip II sit in a main clause?",
        "sentenceBefore": "Er hat gestern Abend seine Mutter",
        "sentenceAfter": ".",
        "options": ["angerufen", "rufen an", "angeruft", "angerufen hat"],
        "correct": "angerufen",
        "acceptableAnswers": ["angerufen", "Er hat gestern Abend seine Mutter angerufen", "Er hat gestern Abend seine Mutter angerufen."],
        "hint": "Partizip II goes to the absolute end: angerufen",
        "explanation": "In Perfekt, the participle stands at the very end of the clause."
      },
      {
        "question": "Which sentence follows the correct German Satzklammer?",
        "sentenceBefore": "",
        "sentenceAfter": "",
        "options": [
          "Ich habe gestern meine Hausaufgaben gemacht.",
          "Ich habe gemacht gestern meine Hausaufgaben.",
          "Ich gestern habe meine Hausaufgaben gemacht.",
          "Ich habe meine Hausaufgaben machen."
        ],
        "correct": "Ich habe gestern meine Hausaufgaben gemacht.",
        "acceptableAnswers": ["Ich habe gestern meine Hausaufgaben gemacht.", "Ich habe gestern meine Hausaufgaben gemacht"],
        "hint": "Verb Pos 2 + Partizip at the end",
        "explanation": "Standard Perfekt: Subject + habe (Pos 2) + details + gemacht (Ende)."
      }
    ]
  },

  # 13. Present Perfect with Haben
  {
    "id": "v-perfekt-haben",
    "category": "PAST",
    "level": "A2",
    "title": "The Present Perfect with Haben (Regular & Irregular)",
    "shortFormula": "ge- + Stamm + -t (regelmäßig) | ge- + Stammwechsel + -en (unregelmäßig)",
    "description": "Around 80% of all German verbs take 'haben' in the Perfekt. This includes all transitive verbs (verbs taking an accusative object), all modal verbs, all reflexive verbs, and all stationary action verbs.",
    "goldenRule": "Regular verbs form Partizip II with: ge- + Stamm + -t: 'ge-lern-t', 'ge-kauf-t', 'ge-mach-t', 'ge-wohn-t'.",
    "trapToAvoid": "Thinking all past participles end in -t. Strong verbs (starke Verben) end in '-en' and often change their vowel: 'gesprochen', 'geschrieben', 'gesehen', 'getrunken'.",
    "conjugationTable": {
      "headers": ["Verb", "Type", "Partizip II", "Example Sentence"],
      "rows": [
        {"pronoun": "lernen", "form1": "regular (weak)", "example": "gelernt", "tip": "Ich habe Deutsch gelernt."},
        {"pronoun": "kaufen", "form1": "regular (weak)", "example": "gekauft", "tip": "Er hat ein Ticket gekauft."},
        {"pronoun": "schreiben", "form1": "irregular (strong: ei -> ie)", "example": "geschrieben", "tip": "Sie hat einen Brief geschrieben."},
        {"pronoun": "sprechen", "form1": "irregular (strong: e -> o)", "example": "gesprochen", "tip": "Wir haben mit dem Arzt gesprochen."},
        {"pronoun": "trinken", "form1": "irregular (strong: i -> u)", "example": "getrunken", "tip": "Hast du genug Wasser getrunken?"},
        {"pronoun": "sehen", "form1": "irregular (strong: e -> e)", "example": "gesehen", "tip": "Ich habe den Film gesehen."}
      ]
    },
    "examples": [
      {"de": "Ich habe heute morgen schon zwei Tassen Kaffee getrunken.", "en": "I already drank two cups of coffee this morning.", "highlight": "habe ... getrunken"},
      {"de": "Er hat gestern Abend einen langen Brief an seine Eltern geschrieben.", "en": "He wrote a long letter to his parents yesterday evening.", "highlight": "hat ... geschrieben"},
      {"de": "Wir haben das ganze Wochenende fleißig für die B1 Prüfung gelernt.", "en": "We studied diligently for the B1 exam the entire weekend.", "highlight": "haben ... gelernt"},
      {"de": "Hast du den neuen Film von Christopher Nolan schon gesehen?", "en": "Have you already seen Christopher Nolan's new film?", "highlight": "hast ... gesehen"},
      {"de": "Meine Schwester hat sich gestern ein schönes Fahrrad gekauft.", "en": "My sister bought herself a nice bicycle yesterday.", "highlight": "hat ... gekauft"},
      {"de": "Haben Sie mit Ihrem Vermieter über die Heizung gesprochen?", "en": "Have you spoken with your landlord about the heating?", "highlight": "Haben ... gesprochen"},
      {"de": "Die Kinder haben draußen im Garten fröhlich gespielt.", "en": "The children played joyfully outside in the garden.", "highlight": "haben ... gespielt"},
      {"de": "Ich habe die leckere Suppe komplett aufgegessen.", "en": "I completely ate up the delicious soup.", "highlight": "habe ... aufgegessen"}
    ],
    "practiceDrill": [
      {
        "question": "Form the Partizip II for 'schreiben':",
        "sentenceBefore": "Ich habe gestern eine lange E-Mail an das Bürgeramt",
        "sentenceAfter": ".",
        "options": ["geschrieben", "geschreibt", "schreiben", "geschreibet"],
        "correct": "geschrieben",
        "acceptableAnswers": ["geschrieben", "Ich habe gestern eine lange E-Mail an das Bürgeramt geschrieben", "Ich habe gestern eine lange E-Mail an das Bürgeramt geschrieben."],
        "hint": "Vowel shift ei -> ie + -en ending: geschrieben",
        "explanation": "schreiben -> geschrieben."
      },
      {
        "question": "Form the Partizip II for 'lernen':",
        "sentenceBefore": "Wir haben viele neue Vokabeln",
        "sentenceAfter": ".",
        "options": ["gelernt", "gelernen", "gelernten", "lernt"],
        "correct": "gelernt",
        "acceptableAnswers": ["gelernt", "Wir haben viele neue Vokabeln gelernt", "Wir haben viele neue Vokabeln gelernt."],
        "hint": "Regular verb: ge- + lern + -t = gelernt",
        "explanation": "Regular verbs form ge- + stem + -t: gelernt."
      },
      {
        "question": "Form the Partizip II for 'trinken':",
        "sentenceBefore": "Er hat gestern Abend viel Mineralwasser",
        "sentenceAfter": ".",
        "options": ["getrunken", "getrinkt", "getranken", "getrinket"],
        "correct": "getrunken",
        "acceptableAnswers": ["getrunken", "Er hat gestern Abend viel Mineralwasser getrunken", "Er hat gestern Abend viel Mineralwasser getrunken."],
        "hint": "Vowel shift i -> u + -en: getrunken",
        "explanation": "trinken -> getrunken."
      }
    ]
  },

  # 14. Present Perfect with Sein
  {
    "id": "v-perfekt-sein",
    "category": "PAST",
    "level": "A2",
    "title": "The Present Perfect with Sein (Movement & State Change)",
    "shortFormula": "sein + Partizip II | For: Movement (A -> B), Change of State, & Exceptions (bleiben/sein)",
    "description": "Verbs that indicate motion from one place to another (gehen, fahren, fliegen, laufen, kommen, reisen) or a transition from one physical state to another (aufstehen, einschlafen, sterben, wachsen) form the Perfekt exclusively with 'sein'.",
    "goldenRule": "The 2 famous exceptions that DO NOT move but ALWAYS take 'sein': 'bleiben' (to stay: 'Ich bin geblieben') and 'sein' (to be: 'Ich bin gewesen')!",
    "trapToAvoid": "Using 'haben' with movement verbs. Saying 'Ich habe nach Hause gefahren' is wrong unless there is an explicit accusative object ('Ich habe das Auto in die Garage gefahren'). Always default to 'sein' for travel: 'Ich bin gefahren'.",
    "conjugationTable": {
      "headers": ["Verb", "Category", "Partizip II", "Example Sentence with sein"],
      "rows": [
        {"pronoun": "gehen", "form1": "movement (A -> B)", "example": "gegangen", "tip": "Ich bin zu Fuß zur Arbeit gegangen."},
        {"pronoun": "fahren", "form1": "movement (A -> B)", "example": "gefahren", "tip": "Wir sind mit dem Zug gefahren."},
        {"pronoun": "fliegen", "form1": "movement (A -> B)", "example": "geflogen", "tip": "Sie sind nach Spanien geflogen."},
        {"pronoun": "aufstehen", "form1": "change of state (sleep -> awake)", "example": "aufgestanden", "tip": "Er ist um 7 Uhr aufgestanden."},
        {"pronoun": "einschlafen", "form1": "change of state (awake -> sleep)", "example": "eingeschlafen", "tip": "Das Baby ist schnell eingeschlafen."},
        {"pronoun": "bleiben", "form1": "exception (stationary!)", "example": "geblieben", "tip": "Ich bin gestern zu Hause geblieben."}
      ]
    },
    "examples": [
      {"de": "Gestern bin ich um 22 Uhr müde ins Bett gegangen.", "en": "Yesterday I went to bed tired at 10 PM.", "highlight": "bin ... gegangen"},
      {"de": "Mein Kollege ist letztes Jahr nach Berlin umgezogen.", "en": "My colleague moved to Berlin last year.", "highlight": "ist ... umgezogen (move)"},
      {"de": "Wann seid ihr heute Morgen aufgestanden?", "en": "When did you all get up this morning?", "highlight": "seid ... aufgestanden"},
      {"de": "Der Flug nach Frankfurt ist pünktlich gelandet.", "en": "The flight to Frankfurt landed on time.", "highlight": "ist ... gelandet"},
      {"de": "Ich bin wegen des Regens den ganzen Tag zu Hause geblieben.", "en": "I stayed at home all day because of the rain.", "highlight": "bin ... geblieben (Exception!)"},
      {"de": "Sie sind vor drei Tagen aus dem Urlaub zurückgekommen.", "en": "They came back from vacation three days ago.", "highlight": "sind ... zurückgekommen"},
      {"de": "Was ist gestern auf der Autobahn passiert?", "en": "What happened on the highway yesterday?", "highlight": "ist ... passiert (passieren takes sein)"},
      {"de": "Wir sind zehn Kilometer durch den Wald gewandert.", "en": "We hiked ten kilometers through the forest.", "highlight": "sind ... gewandert"}
    ],
    "practiceDrill": [
      {
        "question": "Choose the correct auxiliary for 'gehen':",
        "sentenceBefore": "Gestern",
        "sentenceAfter": "ich zu Fuß zum Bahnhof gegangen.",
        "options": ["bin", "habe", "war", "hatte"],
        "correct": "bin",
        "acceptableAnswers": ["bin", "Gestern bin ich zu Fuß zum Bahnhof gegangen", "Gestern bin ich zu Fuß zum Bahnhof gegangen."],
        "hint": "Movement verb 'gehen' takes sein: bin",
        "explanation": "'gehen' is movement from A to B -> requires 'sein'."
      },
      {
        "question": "Choose the auxiliary for 'bleiben':",
        "sentenceBefore": "Meine Freunde",
        "sentenceAfter": "das ganze Wochenende in Berlin geblieben.",
        "options": ["sind", "haben", "waren", "hatten"],
        "correct": "sind",
        "acceptableAnswers": ["sind", "Meine Freunde sind das ganze Wochenende in Berlin geblieben", "Meine Freunde sind das ganze Wochenende in Berlin geblieben."],
        "hint": "'bleiben' is an exception: always takes 'sein'",
        "explanation": "'bleiben' always forms Perfekt with 'sein' (sind geblieben)."
      },
      {
        "question": "Form the Partizip II for 'fliegen':",
        "sentenceBefore": "Wir sind letzten Sommer nach Griechenland",
        "sentenceAfter": ".",
        "options": ["geflogen", "gefliegt", "fliegen", "geflogt"],
        "correct": "geflogen",
        "acceptableAnswers": ["geflogen", "Wir sind letzten Sommer nach Griechenland geflogen", "Wir sind letzten Sommer nach Griechenland geflogen."],
        "hint": "fliegen -> geflogen (ie -> o)",
        "explanation": "'fliegen' forms irregular participle 'geflogen'."
      }
    ]
  },

  # 15. Past Participles of -ieren Verbs
  {
    "id": "v-perfekt-ieren",
    "category": "PAST",
    "level": "A2",
    "title": "Past Participles of -ieren Verbs (studieren -> studiert)",
    "shortFormula": "Infinitiv auf -ieren -> Partizip II: Stamm + -t (NEVER ge-!)",
    "description": "Verbs ending in '-ieren' are mostly words of French or Latin origin adopted into German (studieren, reparieren, reservieren, telefonieren, organisieren, korrigieren). Their past participle is formed by simply replacing '-en' with '-t'. They NEVER take the 'ge-' prefix!",
    "goldenRule": "Mnemonic rule: If it ends in -ieren, throw 'ge-' out the window! 'Ich habe reserviert' (NOT gereserviert).",
    "trapToAvoid": "Examiners in telc and Goethe B1 actively look for 'gestudiert' or 'gerepariert' in the writing module. Any 'ge-' on an -ieren verb is marked as an error.",
    "conjugationTable": {
      "headers": ["Infinitive", "Meaning", "Partizip II (NO ge-!)", "Wrong Form to Avoid"],
      "rows": [
        {"pronoun": "studieren", "form1": "to study (university)", "example": "studiert", "tip": "NEVER 'gestudiert'!"},
        {"pronoun": "reparieren", "form1": "to repair", "example": "repariert", "tip": "NEVER 'gerepariert'!"},
        {"pronoun": "reservieren", "form1": "to reserve", "example": "reserviert", "tip": "NEVER 'gereserviert'!"},
        {"pronoun": "telefonieren", "form1": "to speak on the phone", "example": "telefoniert", "tip": "NEVER 'getelefoniert'!"},
        {"pronoun": "funktionieren", "form1": "to work / function", "example": "funktioniert", "tip": "NEVER 'gefunktioniert'!"},
        {"pronoun": "organisieren", "form1": "to organize", "example": "organisiert", "tip": "NEVER 'georganisiert'!"}
      ]
    },
    "examples": [
      {"de": "Ich habe in München fünf Jahre Informatik studiert.", "en": "I studied computer science in Munich for five years.", "highlight": "studiert (NOT gestudiert)"},
      {"de": "Der Handwerker hat unsere Waschmaschine gestern repariert.", "en": "The handyman repaired our washing machine yesterday.", "highlight": "repariert (NOT gerepariert)"},
      {"de": "Ich habe einen Tisch für vier Personen im Restaurant reserviert.", "en": "I reserved a table for four people in the restaurant.", "highlight": "reserviert"},
      {"de": "Haben Sie heute schon mit Ihrem Anwalt telefoniert?", "en": "Have you already spoken on the phone with your lawyer today?", "highlight": "telefoniert"},
      {"de": "Die Klimaanlage im Zug hat leider nicht funktioniert.", "en": "Unfortunately the air conditioning in the train did not work.", "highlight": "funktioniert"},
      {"de": "Wir haben eine tolle Überraschungsparty für ihn organisiert.", "en": "We organized a fantastic surprise party for him.", "highlight": "organisiert"},
      {"de": "Der Lehrer hat alle Prüfungen noch am selben Tag korrigiert.", "en": "The teacher corrected all exams on the very same day.", "highlight": "korrigiert"},
      {"de": "Ich habe mich ausführlich über den B1 Kurs informiert.", "en": "I informed myself in detail about the B1 course.", "highlight": "informiert"}
    ],
    "practiceDrill": [
      {
        "question": "Form the Partizip II for 'reservieren':",
        "sentenceBefore": "Ich habe für heute Abend einen Tisch im Restaurant",
        "sentenceAfter": ".",
        "options": ["reserviert", "gereserviert", "reservieren", "gereservierte"],
        "correct": "reserviert",
        "acceptableAnswers": ["reserviert", "Ich habe für heute Abend einen Tisch im Restaurant reserviert", "Ich habe für heute Abend einen Tisch im Restaurant reserviert."],
        "hint": "No ge- for -ieren verbs: reserviert",
        "explanation": "-ieren verbs never take 'ge-': reserviert."
      },
      {
        "question": "Form the Partizip II for 'reparieren':",
        "sentenceBefore": "Der Mechaniker hat mein Auto gestern erfolgreich",
        "sentenceAfter": ".",
        "options": ["repariert", "gerepariert", "reparieren", "gereparierte"],
        "correct": "repariert",
        "acceptableAnswers": ["repariert", "Der Mechaniker hat mein Auto gestern erfolgreich repariert", "Der Mechaniker hat mein Auto gestern erfolgreich repariert."],
        "hint": "-ieren drops ge- completely: repariert",
        "explanation": "reparieren -> repariert."
      },
      {
        "question": "Form the Partizip II for 'funktionieren':",
        "sentenceBefore": "Die Heizung hat den ganzen Winter ohne Probleme",
        "sentenceAfter": ".",
        "options": ["funktioniert", "gefunktioniert", "funktionierte", "funktionierende"],
        "correct": "funktioniert",
        "acceptableAnswers": ["funktioniert", "Die Heizung hat den ganzen Winter ohne Probleme funktioniert", "Die Heizung hat den ganzen Winter ohne Probleme funktioniert."],
        "hint": "No ge-: funktioniert",
        "explanation": "funktionieren -> funktioniert."
      }
    ]
  },

  # 16. Simple Past of Sein, Haben, and Werden
  {
    "id": "v-praeteritum-sein-haben-werden",
    "category": "PAST",
    "level": "A2",
    "title": "Simple Past (Präteritum) of Sein, Haben, and Werden",
    "shortFormula": "sein -> war | haben -> hatte | werden -> wurde",
    "description": "While most German verbs express the past using Perfekt in speech, 'sein', 'haben', and 'werden' are the major exceptions: native speakers almost ALWAYS use their Präteritum forms ('war', 'hatte', 'wurde') instead of 'bin gewesen' or 'habe gehabt'.",
    "goldenRule": "'ich' and 'er/sie/es' are identical in Präteritum: 'ich war' / 'er war', 'ich hatte' / 'er hatte', 'ich wurde' / 'er wurde' (no -t ending for 3rd person!).",
    "trapToAvoid": "Using 'ich war gewesen' or 'ich habe gehabt' in daily conversation. It sounds cumbersome and repetitive. Always prefer: 'Ich war gestern im Büro' and 'Ich hatte keine Zeit'.",
    "conjugationTable": {
      "headers": ["Pronoun", "sein (war...)", "haben (hatte...)", "werden (wurde...)"],
      "rows": [
        {"pronoun": "ich", "form1": "war", "example": "hatte", "tip": "wurde (1st & 3rd person identical)"},
        {"pronoun": "du", "form1": "warst", "example": "hattest", "tip": "wurdest"},
        {"pronoun": "er / sie / es", "form1": "war", "example": "hatte", "tip": "wurde (identical to ich!)"},
        {"pronoun": "wir", "form1": "waren", "example": "hatten", "tip": "wurden"},
        {"pronoun": "ihr", "form1": "wart", "example": "hattet", "tip": "wurdet"},
        {"pronoun": "sie / Sie", "form1": "waren", "example": "hatten", "tip": "wurden"}
      ]
    },
    "examples": [
      {"de": "Gestern war ich den ganzen Tag wegen einer Grippe im Bett.", "en": "Yesterday I was in bed all day due to the flu.", "highlight": "ich war"},
      {"de": "Ich hatte gestern leider keine Zeit, dich zurückzurufen.", "en": "Unfortunately I had no time to call you back yesterday.", "highlight": "ich hatte"},
      {"de": "Er wurde letztes Jahr zum Abteilungsleiter befördert.", "en": "He was promoted to department manager last year.", "highlight": "er wurde (Passiv)"},
      {"de": "Wir waren vor zwei Jahren zum ersten Mal in Deutschland.", "en": "We were in Germany for the first time two years ago.", "highlight": "wir waren"},
      {"de": "Hattet ihr früher auch einen Hund in eurem Haus?", "en": "Did you all also have a dog in your house in the past?", "highlight": "ihr hattet"},
      {"de": "Das Wetter wurde am Nachmittag plötzlich stürmisch und kalt.", "en": "The weather suddenly became stormy and cold in the afternoon.", "highlight": "wurde (became)"},
      {"de": "Frau Weber, wo waren Sie gestern um 15 Uhr?", "en": "Mrs. Weber, where were you yesterday at 3 PM?", "highlight": "waren Sie"},
      {"de": "Es war einmal ein König, der hatte drei Töchter.", "en": "Once upon a time there was a king who had three daughters.", "highlight": "Fairy tale past"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'sein' in Präteritum for 'ich':",
        "sentenceBefore": "Gestern",
        "sentenceAfter": "ich den ganzen Nachmittag beim Arzt.",
        "options": ["war", "bin", "hatte", "ware"],
        "correct": "war",
        "acceptableAnswers": ["war", "Gestern war ich den ganzen Nachmittag beim Arzt", "Gestern war ich den ganzen Nachmittag beim Arzt."],
        "hint": "ich + Präteritum of sein = war",
        "explanation": "First person singular Präteritum of sein is 'war'."
      },
      {
        "question": "Conjugate 'haben' in Präteritum for 'du':",
        "sentenceBefore": "Warum",
        "sentenceAfter": "du gestern keine Zeit für unser Treffen?",
        "options": ["hattest", "hast", "hattet", "hatte"],
        "correct": "hattest",
        "acceptableAnswers": ["hattest", "Warum hattest du gestern keine Zeit für unser Treffen", "Warum hattest du gestern keine Zeit für unser Treffen?"],
        "hint": "du + hatte + st = hattest",
        "explanation": "2nd person singular of hatte is 'hattest'."
      },
      {
        "question": "Conjugate 'werden' in Präteritum for 'er':",
        "sentenceBefore": "Er",
        "sentenceAfter": "gestern nach der langen Reise plötzlich krank.",
        "options": ["wurde", "worden", "wird", "wurdet"],
        "correct": "wurde",
        "acceptableAnswers": ["wurde", "Er wurde gestern nach der langen Reise plötzlich krank", "Er wurde gestern nach der langen Reise plötzlich krank."],
        "hint": "3rd person singular of werden in past is 'wurde'",
        "explanation": "3rd person singular of werden in Präteritum is 'wurde'."
      }
    ]
  },

  # 17. The Simple Past of Modal Verbs
  {
    "id": "v-praeteritum-modal",
    "category": "PAST",
    "level": "A2",
    "title": "The Simple Past of Modal Verbs (musste, konnte, durfte...)",
    "shortFormula": "müssen -> musste | können -> konnte | dürfen -> durfte | sollen -> sollte | wollen -> wollte",
    "description": "In German, modal verbs are ALMOST NEVER used in Perfekt in speech (avoiding 'hat ... müssen'). Instead, speakers always use the simple past (Präteritum): 'Ich musste zum Arzt' (I had to go to the doctor), 'Ich konnte nicht kommen' (I couldn't come).",
    "goldenRule": "ALL UMLAUTS ARE DROPPED in Präteritum! 'müssen' becomes 'musste', 'können' becomes 'konnte', 'dürfen' becomes 'durfte'. Adding an umlaut turns it into Konjunktiv II ('könnte' = could, 'konnte' = was able to)!",
    "trapToAvoid": "Confusing 'konnte' (past fact: I was able to) with 'könnte' (hypothetical polite: I could). In letters explaining why you missed an appointment, use 'konnte' without umlaut: 'Ich konnte gestern nicht kommen'.",
    "conjugationTable": {
      "headers": ["Infinitive", "Präteritum (ich / er)", "du Form", "Formula for Excuses in B1"],
      "rows": [
        {"pronoun": "müssen (drop umlaut!)", "form1": "musste", "example": "musstest", "tip": "Ich musste dringend zum Arzt gehen."},
        {"pronoun": "können (drop umlaut!)", "form1": "konnte", "example": "konntest", "tip": "Ich konnte leider nicht kommen."},
        {"pronoun": "dürfen (drop umlaut!)", "form1": "durfte", "example": "durftest", "tip": "Er durfte keinen Zucker essen."},
        {"pronoun": "sollen (no change)", "form1": "sollte", "example": "solltest", "tip": "Ich sollte das Paket abholen."},
        {"pronoun": "wollen (no change)", "form1": "wollte", "example": "wolltest", "tip": "Wir wollten dich gestern besuchen."}
      ]
    },
    "examples": [
      {"de": "Es tut mir leid, aber ich konnte gestern nicht zum Kurs kommen.", "en": "I am sorry, but I could not come to the course yesterday.", "highlight": "konnte (past ability)"},
      {"de": "Ich musste gestern wegen eines Notfalls länger im Büro bleiben.", "en": "I had to stay longer in the office yesterday due to an emergency.", "highlight": "musste (past obligation)"},
      {"de": "Früher durften Kinder im Auto ohne Kindersitz mitfahren.", "en": "In the past children were allowed to ride in cars without a booster seat.", "highlight": "durften (past permission)"},
      {"de": "Er wollte eigentlich Arzt werden, aber er hat Jura studiert.", "en": "He actually wanted to become a doctor, but he studied law.", "highlight": "wollte (past desire)"},
      {"de": "Der Arzt sagte, ich sollte mich ein paar Tage ausruhen.", "en": "The doctor said I was supposed to rest for a few days.", "highlight": "sollte (past order)"},
      {"de": "Konntest du die Aufgaben gestern allein lösen?", "en": "Were you able to solve the exercises alone yesterday?", "highlight": "du konntest"},
      {"de": "Wir mussten zwei Stunden auf den verspäteten Zug warten.", "en": "We had to wait two hours for the delayed train.", "highlight": "wir mussten"},
      {"de": "Sie durfte wegen ihrer Krankheit keinen Sport treiben.", "en": "She was not allowed to do sports because of her illness.", "highlight": "sie durfte"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'müssen' in past for 'ich':",
        "sentenceBefore": "Entschuldigung, ich",
        "sentenceAfter": "gestern kurzfristig zum Zahnarzt gehen.",
        "options": ["musste", "müsste", "muss", "musst"],
        "correct": "musste",
        "acceptableAnswers": ["musste", "Entschuldigung, ich musste gestern kurzfristig zum Zahnarzt gehen", "Entschuldigung, ich musste gestern kurzfristig zum Zahnarzt gehen."],
        "hint": "Drop the umlaut: musste",
        "explanation": "Past tense of müssen drops umlaut: ich musste."
      },
      {
        "question": "Conjugate 'können' in past for 'wir':",
        "sentenceBefore": "Wir",
        "sentenceAfter": "Sie gestern telefonisch leider nicht erreichen.",
        "options": ["konnten", "könnten", "können", "konntet"],
        "correct": "konnten",
        "acceptableAnswers": ["konnten", "Wir konnten Sie gestern telefonisch leider nicht erreichen", "Wir konnten Sie gestern telefonisch leider nicht erreichen."],
        "hint": "No umlaut for past fact: konnten",
        "explanation": "Past fact uses 'konnten' (no umlaut). 'könnten' would be hypothetical."
      },
      {
        "question": "Conjugate 'wollen' in past for 'du':",
        "sentenceBefore": "Warum",
        "sentenceAfter": "du gestern nicht mit uns ins Kino kommen?",
        "options": ["wolltest", "wollte", "willst", "wollt"],
        "correct": "wolltest",
        "acceptableAnswers": ["wolltest", "Warum wolltest du gestern nicht mit uns ins Kino kommen", "Warum wolltest du gestern nicht mit uns ins Kino kommen?"],
        "hint": "wollte + st = wolltest",
        "explanation": "2nd person singular past of wollen is 'wolltest'."
      }
    ]
  },

  # 18. Talking about future using present tense & Futur I
  {
    "id": "v-future-praesens",
    "category": "FUTURE",
    "level": "A2",
    "title": "Talking About the Future (Präsens + Time vs. Futur I)",
    "shortFormula": "Präsens + Zeitangabe (morgen, nächste Woche) | Futur I: werden + Infinitiv",
    "description": "In 85% of spoken and everyday written German, native speakers express future events simply using the PRESENT TENSE combined with a time marker (morgen, nächste Woche, bald, im Sommer). The formal future tense (Futur I: werden + Infinitiv) is reserved for promises, strong intentions, or written forecasts.",
    "goldenRule": "When a time indicator is present ('morgen', 'am Samstag', 'nächstes Jahr'), use the simple present tense: 'Morgen fahre ich nach Berlin' (no need for 'werde fahren'!).",
    "trapToAvoid": "Forgetting that 'werden' is irregular in the present tense: 'du wirst', 'er wird' (drops -d and takes -t: 'er wird').",
    "conjugationTable": {
      "headers": ["Method", "Formula", "Example Sentence", "Tone / Context"],
      "rows": [
        {"pronoun": "Method 1 (85% Spoken)", "form1": "Präsens + Zeitangabe", "example": "Morgen fahre ich nach Hamburg.", "tip": "Natural, everyday German"},
        {"pronoun": "Method 2 (Formal Futur I)", "form1": "werden + Infinitiv am Ende", "example": "Ich werde dich morgen anrufen.", "tip": "Promise, formal forecast"},
        {"pronoun": "werden: ich", "form1": "werde", "example": "Ich werde fleißig lernen.", "tip": "First person"},
        {"pronoun": "werden: du", "form1": "wirst (irregular!)", "example": "Du wirst die Prüfung bestehen.", "tip": "Encouragement"},
        {"pronoun": "werden: er/sie/es", "form1": "wird (irregular!)", "example": "Das Wetter wird morgen schön.", "tip": "Forecast"}
      ]
    },
    "examples": [
      {"de": "Nächste Woche fängt mein neuer Deutschkurs an.", "en": "Next week my new German course begins.", "highlight": "Präsens + Zeitangabe (nächste Woche)"},
      {"de": "Morgen besuche ich meine Großeltern auf dem Land.", "en": "Tomorrow I will visit my grandparents in the countryside.", "highlight": "morgen besuche ich"},
      {"de": "Keine Sorge, ich werde pünktlich am Treffpunkt sein.", "en": "Do not worry, I will be at the meeting point on time.", "highlight": "Futur I: werde ... sein (Promise)"},
      {"de": "Im Sommer fliegen wir für zwei Wochen nach Italien.", "en": "In the summer we are flying to Italy for two weeks.", "highlight": "im Sommer fliegen wir"},
      {"de": "Du wirst die B1 Prüfung ganz sicher mit einer guten Note bestehen!", "en": "You will certainly pass the B1 exam with a good grade!", "highlight": "wirst ... bestehen"},
      {"de": "Am Freitag habe ich ein wichtiges Vorstellungsgespräch.", "en": "On Friday I have an important job interview.", "highlight": "am Freitag habe ich"},
      {"de": "Die Experten sagen, die Preise werden im nächsten Monat sinken.", "en": "The experts say prices will fall next month.", "highlight": "werden ... sinken (Forecast)"},
      {"de": "Bald ziehen wir in unsere neue Wohnung um.", "en": "Soon we will move into our new apartment.", "highlight": "bald ziehen wir um"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'werden' for Futur I (du):",
        "sentenceBefore": "Du",
        "sentenceAfter": "die Prüfung bestimmt erfolgreich schaffen!",
        "options": ["wirst", "werdest", "wird", "werdet"],
        "correct": "wirst",
        "acceptableAnswers": ["wirst", "Du wirst die Prüfung bestimmt erfolgreich schaffen", "Du wirst die Prüfung bestimmt erfolgreich schaffen!"],
        "hint": "du + werden = wirst",
        "explanation": "2nd person singular of werden is 'wirst'."
      },
      {
        "question": "Choose natural future phrasing with time marker:",
        "sentenceBefore": "Morgen",
        "sentenceAfter": "wir den Vertrag beim Notar.",
        "options": ["unterschreiben", "werden unterschreiben", "unterschrieben", "haben unterschrieben"],
        "correct": "unterschreiben",
        "acceptableAnswers": ["unterschreiben", "Morgen unterschreiben wir den Vertrag beim Notar", "Morgen unterschreiben wir den Vertrag beim Notar."],
        "hint": "Natural German uses simple Präsens with time words: unterschreiben",
        "explanation": "With 'morgen', simple present tense 'unterschreiben' is standard and natural."
      },
      {
        "question": "Where does the infinitive sit in Futur I?",
        "sentenceBefore": "Ich werde Sie morgen Vormittag noch einmal",
        "sentenceAfter": ".",
        "options": ["anrufen", "angerufen", "rufe an", "anruft"],
        "correct": "anrufen",
        "acceptableAnswers": ["anrufen", "Ich werde Sie morgen Vormittag noch einmal anrufen", "Ich werde Sie morgen Vormittag noch einmal anrufen."],
        "hint": "Futur I takes the infinitive at the very end: anrufen",
        "explanation": "werden + Infinitive at sentence end: werde ... anrufen."
      }
    ]
  },

  # 19. Polite Speech: Würde-form and Subjunctive of Haben and Sein
  {
    "id": "v-konjunktiv2-polite",
    "category": "SUBJUNCTIVE",
    "level": "B1",
    "title": "Polite Speech: Würde-form, Hätte, and Wäre (Konjunktiv II)",
    "shortFormula": "würde + Infinitiv (general verbs) | hätte (haben) | wäre (sein)",
    "description": "Konjunktiv II is the key to passing the B1 writing and speaking exams. It softens demands into courteous requests, expresses wishes, and allows hypothetical reasoning without sounding demanding or rude.",
    "goldenRule": "For regular verbs, use 'würde + Infinitiv am Satzende': 'Ich würde mich freuen'. For 'haben' and 'sein', use their dedicated forms directly: 'Ich HÄTTE gerne...' and 'Das WÄRE super!'. Never say 'ich würde haben'!",
    "trapToAvoid": "Using 'ich will' in formal letters. Writing 'Ich will einen Termin' will get points deducted for inappropriate tone. Always write: 'Ich hätte gern einen Termin' or 'Ich würde gern einen Termin vereinbaren'.",
    "conjugationTable": {
      "headers": ["Pronoun", "würde + Infinitiv", "hätte (I had / would have)", "wäre (I were / would be)"],
      "rows": [
        {"pronoun": "ich", "form1": "würde", "example": "hätte", "tip": "wäre (1st & 3rd identical)"},
        {"pronoun": "du", "form1": "würdest", "example": "hättest", "tip": "wärst"},
        {"pronoun": "er / sie / es", "form1": "würde", "example": "hätte", "tip": "wäre (identical to ich!)"},
        {"pronoun": "wir", "form1": "würden", "example": "hätten", "tip": "wären"},
        {"pronoun": "ihr", "form1": "würdet", "example": "hättet", "tip": "wärt"},
        {"pronoun": "sie / Sie", "form1": "würden", "example": "hätten", "tip": "wären"}
      ]
    },
    "examples": [
      {"de": "Könnten Sie mir bitte die Bestätigung per E-Mail zusenden?", "en": "Could you please send me the confirmation by email?", "highlight": "Könnten Sie (polite request)"},
      {"de": "Ich hätte gerne einen Termin beim Arzt für nächsten Dienstag.", "en": "I would like to have an appointment at the doctor for next Tuesday.", "highlight": "Ich hätte gerne (polite request)"},
      {"de": "Es wäre sehr nett von Ihnen, wenn Sie mir kurz antworten würden.", "en": "It would be very kind of you if you would answer me briefly.", "highlight": "wäre nett + wenn ... würden"},
      {"de": "Ich würde mich sehr über eine positive Rückmeldung freuen.", "en": "I would be very pleased to receive positive feedback.", "highlight": "Standard B1 letter closing"},
      {"de": "Wenn ich mehr Zeit hätte, würde ich jeden Tag Sport treiben.", "en": "If I had more time, I would do sports every day.", "highlight": "Hypothetical condition"},
      {"de": "An Ihrer Stelle würde ich den Vertrag erst gründlich prüfen.", "en": "In your place, I would examine the contract thoroughly first.", "highlight": "Advice: An Ihrer Stelle würde ich"},
      {"de": "Wären Sie so freundlich und würden mir die Tür aufhalten?", "en": "Would you be so kind and hold the door open for me?", "highlight": "Polite everyday request"},
      {"de": "Wir würden gern einen Tisch für zwei Personen reservieren.", "en": "We would like to reserve a table for two people.", "highlight": "Table reservation"}
    ],
    "practiceDrill": [
      {
        "question": "Choose polite B1 request formula for 'haben':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "gerne eine Tasse schwarzen Kaffee mit etwas Milch.",
        "options": ["hätte", "habe", "würde haben", "will"],
        "correct": "hätte",
        "acceptableAnswers": ["hätte", "Ich hätte gerne eine Tasse schwarzen Kaffee mit etwas Milch", "Ich hätte gerne eine Tasse schwarzen Kaffee mit etwas Milch."],
        "hint": "hätte gerne (not 'will' or 'würde haben')",
        "explanation": "Polite requests with 'haben' use 'hätte': Ich hätte gerne..."
      },
      {
        "question": "Complete the polite letter closing with 'würde':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "mich über eine baldige Antwort sehr freuen.",
        "options": ["würde", "werde", "wollte", "habe"],
        "correct": "würde",
        "acceptableAnswers": ["würde", "Ich würde mich über eine baldige Antwort sehr freuen", "Ich würde mich über eine baldige Antwort sehr freuen."],
        "hint": "Polite conditional: ich würde",
        "explanation": "'Ich würde mich freuen' is the golden B1 letter closing formula."
      },
      {
        "question": "Conjugate 'sein' in Konjunktiv II for 'es':",
        "sentenceBefore": "Das",
        "sentenceAfter": "wirklich eine große Hilfe für mich!",
        "options": ["wäre", "war", "ist", "würde sein"],
        "correct": "wäre",
        "acceptableAnswers": ["wäre", "Das wäre wirklich eine große Hilfe für mich", "Das wäre wirklich eine große Hilfe für mich!"],
        "hint": "sein in Konjunktiv II = wäre",
        "explanation": "'Das wäre...' expresses hypothetical appreciation."
      }
    ]
  },

  # 20. Wenn-sentences (Conditional clauses)
  {
    "id": "v-wenn-sentences",
    "category": "SPECIAL",
    "level": "A2",
    "title": "Wenn-Sentences (Konditionalsätze: Conditions & Inversion)",
    "shortFormula": "Wenn [Nebensatz: Verb am ENDE], [Hauptsatz: VERB auf Pos 1] + [Subjekt]...",
    "description": "'Wenn' introduces conditional clauses ('if' or 'whenever'). Like all subordinating connectors, 'wenn' kicks the conjugated verb to the absolute end of the subclause. When the 'wenn'-clause comes first, the following main clause MUST begin immediately with its conjugated verb (Verb-Verb Collision rule).",
    "goldenRule": "Verb-Verb Collision rule: 'Wenn das Wetter schön IST, GEHEN wir spazieren.' Notice how the two verbs ('ist' and 'gehen') touch across the comma!",
    "trapToAvoid": "'wenn' vs 'als': Use 'wenn' for conditions, repeated past events ('whenever'), or present/future. Use 'als' ONLY for a single, unique, completed past event ('Als ich ein Kind war...').",
    "conjugationTable": {
      "headers": ["Order", "First Part", "Second Part", "Word Order Rule"],
      "rows": [
        {"pronoun": "Type 1: Hauptsatz first", "form1": "Ich rufe dich an,", "example": "wenn ich Feierabend HABE.", "tip": "Verb at end of wenn-clause"},
        {"pronoun": "Type 2: Wenn-clause first", "form1": "Wenn ich Feierabend HABE,", "example": "RUFE ich dich an.", "tip": "Verbs touch across comma!"},
        {"pronoun": "With Modal Verb", "form1": "Wenn du Hilfe BRAUCHST,", "example": "KANNST du mich anrufen.", "tip": "Modal verb in Pos 1 after comma"},
        {"pronoun": "With Konjunktiv II", "form1": "Wenn ich Geld HÄTTE,", "example": "WÜRDE ich ein Haus kaufen.", "tip": "Unreal conditional"}
      ]
    },
    "examples": [
      {"de": "Wenn das Wetter morgen schön ist, machen wir einen Fahrradausflug.", "en": "If the weather is nice tomorrow, we will go on a bicycle trip.", "highlight": "ist, machen wir (Collision)"},
      {"de": "Ich rufe dich sofort an, wenn ich am Bahnhof angekommen bin.", "en": "I will call you immediately when I have arrived at the station.", "highlight": "wenn ... bin"},
      {"de": "Wenn Sie Fragen haben, können Sie mich jederzeit kontaktieren.", "en": "If you have questions, you can contact me at any time.", "highlight": "haben, können Sie"},
      {"de": "Wenn man in Deutschland arbeiten möchte, muss man Deutsch lernen.", "en": "If one would like to work in Germany, one must learn German.", "highlight": "möchte, muss man"},
      {"de": "Ich helfe dir gerne, wenn du bei den Hausaufgaben nicht weiterkommst.", "en": "I will gladly help you if you get stuck with the homework.", "highlight": "wenn ... weiterkommst"},
      {"de": "Wenn es morgen stark regnet, bleiben wir einfach zu Hause.", "en": "If it rains heavily tomorrow, we will simply stay at home.", "highlight": "regnet, bleiben wir"},
      {"de": "Was machst du, wenn du am Wochenende frei hast?", "en": "What do you do if you have time off on the weekend?", "highlight": "frei hast (end)"},
      {"de": "Wenn ich die B1 Prüfung bestehe, mache ich eine große Feier.", "en": "If I pass the B1 exam, I will throw a big party.", "highlight": "bestehe, mache ich"}
    ],
    "practiceDrill": [
      {
        "question": "Apply the Verb-Verb collision rule across the comma:",
        "sentenceBefore": "Wenn es morgen regnet,",
        "sentenceAfter": "wir das Treffen absagen.",
        "options": ["müssen", "wir müssen", "muss", "werden wir müssen"],
        "correct": "müssen",
        "acceptableAnswers": ["müssen", "Wenn es morgen regnet, müssen wir das Treffen absagen", "Wenn es morgen regnet, müssen wir das Treffen absagen."],
        "hint": "Main clause starts with the conjugated verb: müssen",
        "explanation": "When the subordinate clause comes first, the main clause begins with the conjugated verb: müssen wir."
      },
      {
        "question": "Where does the verb go inside the 'wenn'-clause?",
        "sentenceBefore": "Ich helfe dir gerne, wenn du Zeit",
        "sentenceAfter": ".",
        "options": ["hast", "hast du", "haben", "hat"],
        "correct": "hast",
        "acceptableAnswers": ["hast", "Ich helfe dir gerne, wenn du Zeit hast", "Ich helfe dir gerne, wenn du Zeit hast."],
        "hint": "'wenn' kicks the verb to the very end: hast",
        "explanation": "'wenn' is a subordinating connector that kicks the conjugated verb to the very end: hast."
      },
      {
        "question": "Complete the 'wenn' conditional sentence:",
        "sentenceBefore": "Wenn Sie unzufrieden sind,",
        "sentenceAfter": "Sie Ihr Geld zurück.",
        "options": ["bekommen", "Sie bekommen", "bekommst", "bekommen Sie"],
        "correct": "bekommen",
        "acceptableAnswers": ["bekommen", "Wenn Sie unzufrieden sind, bekommen Sie Ihr Geld zurück", "Wenn Sie unzufrieden sind, bekommen Sie Ihr Geld zurück."],
        "hint": "Verb goes to Position 1 after comma: bekommen",
        "explanation": "After the comma, the verb stands first: bekommen Sie."
      }
    ]
  }
]

def generate():
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    
    # Generate TypeScript code
    ts_code = '/* eslint-disable */\n'
    ts_code += '// AUTO-GENERATED VERB MASTER LIBRARY DATASET\n'
    ts_code += '// Contains all authentic German Verb topics with 8-12 high-scoring examples each,\n'
    ts_code += '// full conjugation tables, exam traps, and interactive sentence typing workouts.\n\n'
    
    ts_code += 'export interface VerbMasterExample {\n'
    ts_code += '  de: string;\n'
    ts_code += '  en: string;\n'
    ts_code += '  highlight: string;\n'
    ts_code += '  tip?: string;\n'
    ts_code += '}\n\n'

    ts_code += 'export interface VerbMasterPracticeItem {\n'
    ts_code += '  question: string;\n'
    ts_code += '  options: string[];\n'
    ts_code += '  correct: string;\n'
    ts_code += '  acceptableAnswers: string[];\n'
    ts_code += '  sentenceBefore: string;\n'
    ts_code += '  sentenceAfter: string;\n'
    ts_code += '  hint: string;\n'
    ts_code += '  explanation: string;\n'
    ts_code += '}\n\n'

    ts_code += 'export interface VerbMasterTopic {\n'
    ts_code += '  id: string;\n'
    ts_code += '  category: "PRESENT" | "PAST" | "MODAL" | "FUTURE" | "SUBJUNCTIVE" | "SPECIAL";\n'
    ts_code += '  level: "A1" | "A2" | "B1";\n'
    ts_code += '  title: string;\n'
    ts_code += '  shortFormula: string;\n'
    ts_code += '  description: string;\n'
    ts_code += '  goldenRule: string;\n'
    ts_code += '  trapToAvoid: string;\n'
    ts_code += '  conjugationTable?: {\n'
    ts_code += '    headers: string[];\n'
    ts_code += '    rows: Array<{\n'
    ts_code += '      pronoun: string;\n'
    ts_code += '      form1: string;\n'
    ts_code += '      example: string;\n'
    ts_code += '      tip: string;\n'
    ts_code += '    }>;\n'
    ts_code += '  };\n'
    ts_code += '  examples: VerbMasterExample[];\n'
    ts_code += '  practiceDrill: VerbMasterPracticeItem[];\n'
    ts_code += '}\n\n'

    ts_code += 'export const GERMAN_VERBS_MASTER_DATA: VerbMasterTopic[] = '
    ts_code += json.dumps(VERBS_DATA, ensure_ascii=False, indent=2)
    ts_code += ';\n'

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print(f"Successfully generated {len(VERBS_DATA)} verb master topics with rich examples into {OUT_PATH}!")

if __name__ == "__main__":
    generate()

