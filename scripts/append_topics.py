# -*- coding: utf-8 -*-
import json
import os

EXTRA_TOPICS = [
  # 21. Simple Past of Regular (Weak) Verbs
  {
    "id": "v-praeteritum-weak",
    "category": "PAST",
    "level": "A2",
    "title": "The Simple Past of Regular (Weak) Verbs (lernte, machte, wohnte...)",
    "shortFormula": "Stamm + -te, -test, -te, -ten, -tet, -ten | e.g. ich lern-te, er mach-te",
    "description": "Regular verbs form the Präteritum by inserting '-t-' or '-te-' between the verb stem and the personal ending. In 1st and 3rd person singular, the ending is simply '-te'. This tense is ubiquitous in newspaper reports, novels, formal written biographies, and official incident reports.",
    "goldenRule": "1st and 3rd person singular are always identical: 'ich lernte' and 'er lernte' (no extra -t!).",
    "trapToAvoid": "Stems ending in -d or -t (arbeiten, warten) insert an extra 'e' before the past tense marker: 'arbeit-e-te', 'wart-e-te'.",
    "conjugationTable": {
      "headers": ["Pronoun", "lernen", "machen", "arbeiten (extra -e-)"],
      "rows": [
        {"pronoun": "ich", "form1": "lernte", "example": "machte", "tip": "arbeitete"},
        {"pronoun": "du", "form1": "lerntest", "example": "machtest", "tip": "arbeitetest"},
        {"pronoun": "er / sie / es", "form1": "lernte", "example": "machte", "tip": "arbeitete (same as ich!)"},
        {"pronoun": "wir", "form1": "lernten", "example": "machten", "tip": "arbeiteten"},
        {"pronoun": "ihr", "form1": "lerntet", "example": "machtet", "tip": "arbeitetet"},
        {"pronoun": "sie / Sie", "form1": "lernten", "example": "machten", "tip": "arbeiteten"}
      ]
    },
    "examples": [
      {"de": "Er wohnte fünf Jahre lang in einer kleinen Wohnung in Köln.", "en": "He lived in a small apartment in Cologne for five years.", "highlight": "wohnte"},
      {"de": "Die Zeugin wartete zwanzig Minuten an der Haltestelle.", "en": "The witness waited twenty minutes at the stop.", "highlight": "wartete (extra -e-)"},
      {"de": "Wir lernten damals jeden Tag vier Stunden für die Prüfung.", "en": "We studied four hours every day for the exam back then.", "highlight": "lernten"},
      {"de": "Der Sachbearbeiter prüfte alle Dokumente sehr sorgfältig.", "en": "The clerk examined all documents very carefully.", "highlight": "prüfte"},
      {"de": "Sie fragte die Passanten nach dem kürzesten Weg zum Bahnhof.", "en": "She asked the passers-by for the shortest way to the station.", "highlight": "fragte"},
      {"de": "Meine Großeltern bauten ihr eigenes Haus im Jahr 1970.", "en": "My grandparents built their own house in the year 1970.", "highlight": "bauten"},
      {"de": "Ich arbeitete damals als Werkstudent bei einem großen IT-Unternehmen.", "en": "Back then I worked as a working student at a large IT company.", "highlight": "arbeitete"},
      {"de": "Das Unternehmen kaufte neue Computer für alle Mitarbeiter.", "en": "The company bought new computers for all employees.", "highlight": "kaufte"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'wohnen' in Präteritum for 'er':",
        "sentenceBefore": "Früher",
        "sentenceAfter": "er in einem ruhigen Vorort von München.",
        "options": ["wohnte", "wohnte er", "wohnst", "gewohnt"],
        "correct": "wohnte",
        "acceptableAnswers": ["wohnte", "Früher wohnte er in einem ruhigen Vorort von München", "Früher wohnte er in einem ruhigen Vorort von München."],
        "hint": "3rd person singular takes -te: wohnte",
        "explanation": "3rd person singular regular Präteritum: er wohnte."
      },
      {
        "question": "Conjugate 'arbeiten' in Präteritum for 'ich':",
        "sentenceBefore": "Vor fünf Jahren",
        "sentenceAfter": "ich noch in einer Fabrik.",
        "options": ["arbeitete", "arbeitste", "gearbeitet", "arbeite"],
        "correct": "arbeitete",
        "acceptableAnswers": ["arbeitete", "Vor fünf Jahren arbeitete ich noch in einer Fabrik", "Vor fünf Jahren arbeitete ich noch in einer Fabrik."],
        "hint": "Stem ends in -t -> extra -e-: arbeitete",
        "explanation": "Stems in -t take -ete: ich arbeitete."
      },
      {
        "question": "Conjugate 'fragen' in Präteritum for 'wir':",
        "sentenceBefore": "Wir",
        "sentenceAfter": "den Polizisten nach dem Weg.",
        "options": ["fragten", "gefragt", "fragten wir", "fraget"],
        "correct": "fragten",
        "acceptableAnswers": ["fragten", "Wir fragten den Polizisten nach dem Weg", "Wir fragten den Polizisten nach dem Weg."],
        "hint": "wir + stem + -ten: fragten",
        "explanation": "1st person plural takes -ten: wir fragten."
      }
    ]
  },

  # 22. Simple Past of Irregular (Strong) Verbs
  {
    "id": "v-praeteritum-strong",
    "category": "PAST",
    "level": "B1",
    "title": "The Simple Past of Irregular (Strong) Verbs (ging, fuhr, sprach...)",
    "shortFormula": "Vokalwechsel + NULL-ENDUNG in 1. & 3. Person | z.B. ich ging, er ging",
    "description": "Strong verbs (starke Verben) form the Präteritum with a root vowel shift and ZERO ENDING in 1st (ich) and 3rd person singular (er/sie/es). This is the hallmark of literary and journalistic German (newspaper reports, B1 reading texts).",
    "goldenRule": "NEVER add '-te' to a strong verb! It is 'ich ging' (never gingte!), 'er fuhr' (never fahrte!), 'sie sprach' (never sprachte!).",
    "trapToAvoid": "Confusing strong past forms: gehen -> ging, fahren -> fuhr, sprechen -> sprach, sehen -> sah, trinken -> trank, kommen -> kam, finden -> fand, geben -> gab.",
    "conjugationTable": {
      "headers": ["Infinitive", "Präteritum (ich / er)", "du Form", "Meaning & Example"],
      "rows": [
        {"pronoun": "gehen", "form1": "ging (zero ending!)", "example": "gingst", "tip": "Er ging gestern nach Hause."},
        {"pronoun": "fahren", "form1": "fuhr (zero ending!)", "example": "fuhrst", "tip": "Wir fuhren mit dem Auto."},
        {"pronoun": "sprechen", "form1": "sprach (zero ending!)", "example": "sprachst", "tip": "Sie sprach sehr leise."},
        {"pronoun": "sehen", "form1": "sah (zero ending!)", "example": "sahst", "tip": "Ich sah ihn am Bahnhof."},
        {"pronoun": "kommen", "form1": "kam (zero ending!)", "example": "kamst", "tip": "Der Zug kam pünktlich an."},
        {"pronoun": "geben", "form1": "gab (zero ending!)", "example": "gabst", "tip": "Es gab viele Probleme."}
      ]
    },
    "examples": [
      {"de": "Der Mann ging zügig über die Straße und stieg in den Bus.", "en": "The man walked briskly across the street and got onto the bus.", "highlight": "ging ... stieg"},
      {"de": "Wir fuhren stundenlang durch den dichten Nebel auf der Autobahn.", "en": "We drove for hours through the dense fog on the highway.", "highlight": "fuhren"},
      {"de": "Die Zeugin sah den Unfall genau und rief sofort die Polizei.", "en": "The witness saw the accident clearly and immediately called the police.", "highlight": "sah ... rief"},
      {"de": "Der Minister sprach gestern ausführlich über die neue Wirtschaftsreform.", "en": "The minister spoke in detail yesterday about the new economic reform.", "highlight": "sprach"},
      {"de": "Sie trank einen Schluck Wasser und las den Brief weiter.", "en": "She drank a sip of water and continued reading the letter.", "highlight": "trank ... las"},
      {"de": "Gestern gab es im ganzen Bundesland heftige Gewitter.", "en": "Yesterday there were severe thunderstorms in the entire federal state.", "highlight": "es gab (there was/were)"},
      {"de": "Der Arzt kam sofort und half dem verletzten Passagier.", "en": "The doctor came immediately and helped the injured passenger.", "highlight": "kam ... half"},
      {"de": "Ich fand meinen verlorenen Ausweis schließlich unter dem Autositz.", "en": "I finally found my lost ID card under the car seat.", "highlight": "fand"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'gehen' in Präteritum for 'er':",
        "sentenceBefore": "Der Chef",
        "sentenceAfter": "ohne ein Wort aus dem Konferenzraum.",
        "options": ["ging", "gingte", "gehte", "gegangen"],
        "correct": "ging",
        "acceptableAnswers": ["ging", "Der Chef ging ohne ein Wort aus dem Konferenzraum", "Der Chef ging ohne ein Wort aus dem Konferenzraum."],
        "hint": "gehen -> ging (zero ending)",
        "explanation": "3rd person singular of gehen in Präteritum is 'ging'."
      },
      {
        "question": "Conjugate 'sehen' in Präteritum for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "den Verdächtigen gestern am Hauptbahnhof.",
        "options": ["sah", "sehte", "gesehen", "sahst"],
        "correct": "sah",
        "acceptableAnswers": ["sah", "Ich sah den Verdächtigen gestern am Hauptbahnhof", "Ich sah den Verdächtigen gestern am Hauptbahnhof."],
        "hint": "sehen -> sah (zero ending for ich)",
        "explanation": "First person singular of sehen is 'sah'."
      },
      {
        "question": "Conjugate 'fahren' in Präteritum for 'wir':",
        "sentenceBefore": "Letztes Jahr",
        "sentenceAfter": "wir mit dem Wohnmobil durch Schweden.",
        "options": ["fuhren", "fahrtet", "gefahren", "fahrten"],
        "correct": "fuhren",
        "acceptableAnswers": ["fuhren", "Letztes Jahr fuhren wir mit dem Wohnmobil durch Schweden", "Letztes Jahr fuhren wir mit dem Wohnmobil durch Schweden."],
        "hint": "fahren -> fuhren",
        "explanation": "1st person plural strong past: wir fuhren."
      }
    ]
  },

  # 23. Simple Past of Mixed Verbs
  {
    "id": "v-praeteritum-mixed",
    "category": "PAST",
    "level": "B1",
    "title": "The Simple Past of Mixed Verbs (dachte, wusste, brachte...)",
    "shortFormula": "Vokalwechsel + schwache Endung (-te) | z.B. denken -> dachte | wissen -> wusste",
    "description": "Mixed verbs (gemischte Verben) are a small, elite group of high-yield verbs that combine features of both weak and strong verbs: they change their stem vowel (like strong verbs) BUT attach the regular '-te' ending (like weak verbs).",
    "goldenRule": "The 5 core mixed verbs in B1 exams: denken -> dachte | wissen -> wusste | bringen -> brachte | kennen -> kannte | nennen -> nannte.",
    "trapToAvoid": "Confusing 'wusste' (past of wissen = knew a fact) with 'kannte' (past of kennen = knew a person/place): 'Ich wusste die Antwort', but 'Ich kannte den Mann'.",
    "conjugationTable": {
      "headers": ["Infinitive", "Präteritum (ich / er)", "Partizip II", "Core Meaning & Example"],
      "rows": [
        {"pronoun": "denken", "form1": "dachte (e -> a + te)", "example": "gedacht", "tip": "Ich dachte, du kommst heute."},
        {"pronoun": "wissen", "form1": "wusste (i -> u + te)", "example": "gewusst", "tip": "Er wusste die Lösung nicht."},
        {"pronoun": "bringen", "form1": "brachte (i -> a + te)", "example": "gebracht", "tip": "Sie brachte Kuchen mit."},
        {"pronoun": "kennen", "form1": "kannte (e -> a + te)", "example": "gekannt", "tip": "Ich kannte ihn schon lange."},
        {"pronoun": "nennen", "form1": "nannte (e -> a + te)", "example": "genannt", "tip": "Er nannte seinen Namen."}
      ]
    },
    "examples": [
      {"de": "Ich dachte eigentlich, dass der Zug um 15 Uhr abfährt.", "en": "I actually thought that the train departs at 3 PM.", "highlight": "dachte (denken)"},
      {"de": "Niemand im Büro wusste, wo sich die wichtigen Akten befanden.", "en": "Nobody in the office knew where the important files were located.", "highlight": "wusste (wissen)"},
      {"de": "Der Postbote brachte heute früh ein schweres Paket für Sie.", "en": "The mail carrier brought a heavy package for you early today.", "highlight": "brachte (bringen)"},
      {"de": "Ich kannte diesen Schriftsteller bisher noch nicht persönlich.", "en": "I did not know this writer personally until now.", "highlight": "kannte (kennen)"},
      {"de": "Er dachte lange über das attraktive Jobangebot nach.", "en": "He thought about the attractive job offer for a long time.", "highlight": "dachte ... nach"},
      {"de": "Sie brachte alle notwendigen Nachweise zum Termin mit.", "en": "She brought all necessary proofs to the appointment.", "highlight": "brachte ... mit"},
      {"de": "Wir wussten sofort, dass etwas nicht stimmte.", "en": "We knew immediately that something was not right.", "highlight": "wussten"},
      {"de": "Der Zeuge nannte der Polizei das Kennzeichen des Autos.", "en": "The witness gave (named) the police the license plate of the car.", "highlight": "nannte (nennen)"}
    ],
    "practiceDrill": [
      {
        "question": "Conjugate 'denken' in Präteritum for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "immer, dass Berlin die größte Stadt Deutschlands ist.",
        "options": ["dachte", "denkte", "gedacht", "dachten"],
        "correct": "dachte",
        "acceptableAnswers": ["dachte", "Ich dachte immer dass Berlin die größte Stadt Deutschlands ist", "Ich dachte immer, dass Berlin die größte Stadt Deutschlands ist."],
        "hint": "denken -> dachte",
        "explanation": "Präteritum of denken is 'dachte'."
      },
      {
        "question": "Conjugate 'wissen' in Präteritum for 'er':",
        "sentenceBefore": "Er",
        "sentenceAfter": "leider nicht, wie man das Problem lösen kann.",
        "options": ["wusste", "wissste", "wusste er", "gewusst"],
        "correct": "wusste",
        "acceptableAnswers": ["wusste", "Er wusste leider nicht wie man das Problem lösen kann", "Er wusste leider nicht, wie man das Problem lösen kann."],
        "hint": "wissen -> wusste",
        "explanation": "3rd person singular past of wissen is 'wusste'."
      },
      {
        "question": "Conjugate 'bringen' in Präteritum for 'sie' (singular):",
        "sentenceBefore": "Meine Nachbarin",
        "sentenceAfter": "mir gestern frische Blumen aus ihrem Garten.",
        "options": ["brachte", "bringte", "gebracht", "brachtet"],
        "correct": "brachte",
        "acceptableAnswers": ["brachte", "Meine Nachbarin brachte mir gestern frische Blumen aus ihrem Garten", "Meine Nachbarin brachte mir gestern frische Blumen aus ihrem Garten."],
        "hint": "bringen -> brachte",
        "explanation": "Präteritum of bringen is 'brachte'."
      }
    ]
  },

  # 24. The Subjunctive of Modal Verbs (könnte, müsste, dürfte, sollte)
  {
    "id": "v-konjunktiv2-modal",
    "category": "SUBJUNCTIVE",
    "level": "B1",
    "title": "The Subjunctive of Modal Verbs (könnte, müsste, dürfte, sollte)",
    "shortFormula": "können -> könnte | müssen -> müsste | dürfen -> dürfte | sollen -> sollte",
    "description": "Konjunktiv II of modal verbs adds umlauts to their Präteritum stems (except 'sollen' and 'wollen', which never take umlauts). In B1 exams, modal Konjunktiv II is indispensable for polite requests ('Könnten Sie bitte...'), advice ('Sie sollten...'), and hypothetical statements ('Ich müsste mehr lernen').",
    "goldenRule": "Polite request formula: 'Könnten Sie mir bitte helfen?' (Could you please help me?). Giving advice: 'Du solltest zum Arzt gehen' (You should go to the doctor).",
    "trapToAvoid": "Do NOT add umlauts to 'sollen' and 'wollen'! It is always 'sollte' and 'wollte' (there is no 'söllte' or 'wöllte' in German).",
    "conjugationTable": {
      "headers": ["Infinitive", "Konjunktiv II (ich / er)", "du Form", "Communicative Purpose"],
      "rows": [
        {"pronoun": "können (gains umlaut!)", "form1": "könnte", "example": "könntest", "tip": "Polite requests ('Could you please...')"},
        {"pronoun": "müssen (gains umlaut!)", "form1": "müsste", "example": "müsstest", "tip": "Hypothetical obligation ('I would have to')"},
        {"pronoun": "dürfen (gains umlaut!)", "form1": "dürfte", "example": "dürftest", "tip": "Polite permission / probability ('might')"},
        {"pronoun": "sollen (NO umlaut!)", "form1": "sollte", "example": "solltest", "tip": "Recommendation / advice ('You should')"},
        {"pronoun": "wollen (NO umlaut!)", "form1": "wollte", "example": "wolltest", "tip": "Polite desire ('I would like to')"}
      ]
    },
    "examples": [
      {"de": "Könnten Sie mir bitte die Speisekarte und die Rechnung bringen?", "en": "Could you please bring me the menu and the bill?", "highlight": "Könnten Sie (polite request)"},
      {"de": "Du siehst blass aus, du solltest heute früher nach Hause gehen.", "en": "You look pale, you should go home earlier today.", "highlight": "solltest (advice)"},
      {"de": "Ich müsste eigentlich viel mehr für meine Deutschprüfung lernen.", "en": "I really should/ought to study much more for my German exam.", "highlight": "müsste (obligation)"},
      {"de": "Dürfte ich Sie kurz um einen Gefallen bitten?", "en": "Might I ask you briefly for a favor?", "highlight": "Dürfte ich (courtesy)"},
      {"de": "Könntest du mich morgen früh zum Flughafen fahren?", "en": "Could you drive me to the airport tomorrow morning?", "highlight": "Könntest du (informal request)"},
      {"de": "Das Paket müsste eigentlich heute mit der Post ankommen.", "en": "The package ought to arrive with the mail today.", "highlight": "müsste (probability)"},
      {"de": "Sie sollten bei Halsschmerzen viel warmen Kräutertee trinken.", "en": "You should drink lots of warm herbal tea for a sore throat.", "highlight": "sollten (advice)"},
      {"de": "Wenn ich reich wäre, müsste ich nicht mehr jeden Tag arbeiten.", "en": "If I were rich, I would not have to work every day anymore.", "highlight": "wäre ... müsste"}
    ],
    "practiceDrill": [
      {
        "question": "Form polite request with 'können' for formal 'Sie':",
        "sentenceBefore": "",
        "sentenceAfter": "Sie mir bitte sagen, wo der Ausgang ist?",
        "options": ["Könnten", "Konnten", "Können", "Könntet"],
        "correct": "Könnten",
        "acceptableAnswers": ["Könnten", "Könnten Sie mir bitte sagen wo der Ausgang ist", "Könnten Sie mir bitte sagen, wo der Ausgang ist?"],
        "hint": "Polite conditional takes umlaut: Könnten",
        "explanation": "Polite requests use Konjunktiv II: 'Könnten Sie bitte...'"
      },
      {
        "question": "Form gentle advice with 'sollen' for 'du':",
        "sentenceBefore": "Du hast Fieber, du",
        "sentenceAfter": "sofort im Bett bleiben.",
        "options": ["solltest", "sölltest", "sollst", "sollt"],
        "correct": "solltest",
        "acceptableAnswers": ["solltest", "Du hast Fieber du solltest sofort im Bett bleiben", "Du hast Fieber, du solltest sofort im Bett bleiben."],
        "hint": "'sollen' takes NO umlaut in Konjunktiv II: solltest",
        "explanation": "'sollen' has no umlaut: du solltest."
      },
      {
        "question": "Form hypothetical obligation with 'müssen' for 'ich':",
        "sentenceBefore": "Ich",
        "sentenceAfter": "heute eigentlich arbeiten, aber ich habe frei genommen.",
        "options": ["müsste", "musste", "muss", "müsstest"],
        "correct": "müsste",
        "acceptableAnswers": ["müsste", "Ich müsste heute eigentlich arbeiten aber ich habe frei genommen", "Ich müsste heute eigentlich arbeiten, aber ich habe frei genommen."],
        "hint": "Hypothetical obligation gains umlaut: müsste",
        "explanation": "Hypothetical obligation uses 'müsste' (with umlaut)."
      }
    ]
  },

  # 25. The Future Tense with Modal Verbs
  {
    "id": "v-future-modal",
    "category": "FUTURE",
    "level": "B1",
    "title": "The Future Tense with Modal Verbs (werden + Infinitiv + Modalverb)",
    "shortFormula": "Subjekt + [werden konjugiert (Pos 2)] + [...] + [Infinitiv] + [Modalverb Infinitiv (ENDE)]",
    "description": "When expressing a future necessity, ability, or permission, German combines 'werden' with a double infinitive at the end of the sentence: the main action verb in infinitive PLUS the modal verb in infinitive.",
    "goldenRule": "Double Infinitive at Sentence End: Both the action verb AND the modal verb stay in the infinitive at the very end: '...länger arbeiten müssen'.",
    "trapToAvoid": "Do not conjugate the modal verb at the end! It is 'arbeiten MÜSSEN' (infinitive), NOT 'arbeiten muss'.",
    "conjugationTable": {
      "headers": ["Subject", "werden (Pos 2)", "Middle Information", "Double Infinitive (ENDE)"],
      "rows": [
        {"pronoun": "ich", "form1": "werde", "example": "morgen leider länger", "tip": "arbeiten MÜSSEN."},
        {"pronoun": "du", "form1": "wirst", "example": "nächstes Jahr bestimmt fließend", "tip": "sprechen KÖNNEN."},
        {"pronoun": "er / sie / es", "form1": "wird", "example": "den Führerschein bald", "tip": "wiederholen DÜRFEN."},
        {"pronoun": "wir", "form1": "werden", "example": "unsere Pläne wohl", "tip": "ändern MÜSSEN."},
        {"pronoun": "sie / Sie", "form1": "werden", "example": "das Problem schnell", "tip": "lösen KÖNNEN."}
      ]
    },
    "examples": [
      {"de": "Ich werde morgen wegen der Deadline bis 20 Uhr arbeiten müssen.", "en": "I will have to work until 8 PM tomorrow because of the deadline.", "highlight": "werde ... arbeiten müssen"},
      {"de": "Nach dem Sprachkurs wirst du dich ohne Probleme verständigen können.", "en": "After the language course you will be able to make yourself understood without problems.", "highlight": "wirst ... verständigen können"},
      {"de": "Die Regierung wird die Steuern im nächsten Jahr erhöhen müssen.", "en": "The government will have to raise taxes next year.", "highlight": "wird ... erhöhen müssen"},
      {"de": "Wir werden den Termin leider verschieben müssen.", "en": "We will unfortunately have to postpone the appointment.", "highlight": "werden ... verschieben müssen"},
      {"de": "In ein paar Jahren werden Roboter viele schwere Aufgaben erledigen können.", "en": "In a few years robots will be able to handle many heavy tasks.", "highlight": "werden ... erledigen können"},
      {"de": "Werdet ihr am Wochenende zum Fest kommen können?", "en": "Will you all be able to come to the festival on the weekend?", "highlight": "Werdet ... kommen können"},
      {"de": "Sie wird nach der Operation einige Wochen pausieren müssen.", "en": "She will have to pause for a few weeks after the surgery.", "highlight": "wird ... pausieren müssen"},
      {"de": "Hoffentlich werde ich mein Visum rechtzeitig verlängern können.", "en": "Hopefully I will be able to extend my visa in time.", "highlight": "werde ... verlängern können"}
    ],
    "practiceDrill": [
      {
        "question": "Form double infinitive at the end of Futur I with modal:",
        "sentenceBefore": "Ich werde morgen leider bis spät in die Nacht",
        "sentenceAfter": ".",
        "options": ["arbeiten müssen", "gearbeitet muss", "arbeiten muss", "müssen arbeiten"],
        "correct": "arbeiten müssen",
        "acceptableAnswers": ["arbeiten müssen", "Ich werde morgen leider bis spät in die Nacht arbeiten müssen", "Ich werde morgen leider bis spät in die Nacht arbeiten müssen."],
        "hint": "Main verb + modal verb both in infinitive: arbeiten müssen",
        "explanation": "Double infinitive at sentence end: action infinitive + modal infinitive."
      },
      {
        "question": "Conjugate 'werden' for 'du' in future modal construction:",
        "sentenceBefore": "Du",
        "sentenceAfter": "nach dem Kurs fließend Deutsch sprechen können.",
        "options": ["wirst", "wird", "werdest", "werdet"],
        "correct": "wirst",
        "acceptableAnswers": ["wirst", "Du wirst nach dem Kurs fließend Deutsch sprechen können", "Du wirst nach dem Kurs fließend Deutsch sprechen können."],
        "hint": "du + werden = wirst",
        "explanation": "2nd person singular of werden is 'wirst'."
      },
      {
        "question": "Complete the future modal construction:",
        "sentenceBefore": "Wir werden die Reise wegen des Streiks leider",
        "sentenceAfter": ".",
        "options": ["absagen müssen", "absagen gemusst", "müssen absagen", "abgesagt müssen"],
        "correct": "absagen müssen",
        "acceptableAnswers": ["absagen müssen", "Wir werden die Reise wegen des Streiks leider absagen müssen", "Wir werden die Reise wegen des Streiks leider absagen müssen."],
        "hint": "Infinitive + müssen: absagen müssen",
        "explanation": "Futur I with modal: werden ... absagen müssen."
      }
    ]
  },

  # 26. The Present Perfect of Separable Verbs
  {
    "id": "v-perfekt-separable",
    "category": "PAST",
    "level": "A2",
    "title": "The Present Perfect of Separable Verbs (ein-ge-kauft, an-ge-rufen...)",
    "shortFormula": "Präfix + -ge- + Stamm + -t / -en | e.g. ein-ge-kauft | an-ge-rufen | auf-ge-standen",
    "description": "In separable verbs (trennbare Verben), the 'ge-' participle prefix is not attached to the very front. Instead, it sandwiches in the middle between the separable prefix and the verb stem!",
    "goldenRule": "The Sandwich Rule: [Prefix] + [-ge-] + [Verb Stem] + [-t / -en]: 'an-ge-rufen', 'ein-ge-kauft', 'auf-ge-standen', 'mit-ge-bracht', 'fern-ge-sehen'.",
    "trapToAvoid": "Putting 'ge-' before the prefix: 'geanrufen' or 'geeinkauft' is completely wrong. The prefix ALWAYS leads!",
    "conjugationTable": {
      "headers": ["Infinitive", "Prefix", "Partizip II Formula", "Example Sentence"],
      "rows": [
        {"pronoun": "einkaufen", "form1": "ein-", "example": "ein-ge-kauf-t (regular -t)", "tip": "Ich habe im Supermarkt eingekauft."},
        {"pronoun": "anrufen", "form1": "an-", "example": "an-ge-ruf-en (irregular -en)", "tip": "Er hat mich gestern angerufen."},
        {"pronoun": "aufstehen", "form1": "auf-", "example": "auf-ge-stand-en (sein!)", "tip": "Wir sind früh aufgestanden."},
        {"pronoun": "mitbringen", "form1": "mit-", "example": "mit-ge-brach-t (mixed)", "tip": "Sie hat Kuchen mitgebracht."},
        {"pronoun": "fernsehen", "form1": "fern-", "example": "fern-ge-seh-en", "tip": "Die Kinder haben ferngesehen."},
        {"pronoun": "vorbereiten", "form1": "vor-", "example": "vor-ge-bereit-et", "tip": "Ich habe mich gut vorbereitet."}
      ]
    },
    "examples": [
      {"de": "Ich habe gestern nach der Arbeit im Bio-Supermarkt eingekauft.", "en": "I shopped at the organic supermarket yesterday after work.", "highlight": "ein-ge-kauft"},
      {"de": "Mein Kollege hat mich gestern Abend wegen des Projekts angerufen.", "en": "My colleague called me yesterday evening regarding the project.", "highlight": "an-ge-rufen"},
      {"de": "Am Sonntag sind wir alle erst um 10 Uhr aufgestanden.", "en": "On Sunday we all only got up at 10 AM.", "highlight": "auf-ge-standen (sein)"},
      {"de": "Vielen Dank, dass du diesen leckeren Salat mitgebracht hast!", "en": "Thank you very much for bringing along this delicious salad!", "highlight": "mit-ge-bracht"},
      {"de": "Wir haben uns mehrere Wochen intensiv auf die Prüfung vorbereitet.", "en": "We prepared intensively for the exam for several weeks.", "highlight": "vor-ge-bereitet"},
      {"de": "Der Zug ist pünktlich um 14:15 Uhr in München abgefahren.", "en": "The train departed on time at 2:15 PM in Munich.", "highlight": "ab-ge-fahren (sein)"},
      {"de": "Ich habe das Anmeldeformular bereits vollständig ausgefüllt.", "en": "I have already completely filled out the registration form.", "highlight": "aus-ge-füllt"},
      {"de": "Wer hat heute morgen das Fenster im Besprechungsraum aufgemacht?", "en": "Who opened the window in the meeting room this morning?", "highlight": "auf-ge-macht"}
    ],
    "practiceDrill": [
      {
        "question": "Form Partizip II for 'einkaufen':",
        "sentenceBefore": "Ich habe gestern im neuen Supermarkt",
        "sentenceAfter": ".",
        "options": ["eingekauft", "geeinkauft", "einkauft", "eingegekauft"],
        "correct": "eingekauft",
        "acceptableAnswers": ["eingekauft", "Ich habe gestern im neuen Supermarkt eingekauft", "Ich habe gestern im neuen Supermarkt eingekauft."],
        "hint": "Prefix + ge + stem + t: eingekauft",
        "explanation": "Separable verbs place -ge- in the middle: ein-ge-kauft."
      },
      {
        "question": "Form Partizip II for 'anrufen':",
        "sentenceBefore": "Hast du gestern deinen Vermieter",
        "sentenceAfter": "?",
        "options": ["angerufen", "geangerufen", "anruft", "angeruft"],
        "correct": "angerufen",
        "acceptableAnswers": ["angerufen", "Hast du gestern deinen Vermieter angerufen", "Hast du gestern deinen Vermieter angerufen?"],
        "hint": "an + ge + rufen = angerufen",
        "explanation": "anrufen -> an-ge-rufen."
      },
      {
        "question": "Form Partizip II for 'aufstehen' (with sein):",
        "sentenceBefore": "Wir sind heute Morgen um 6 Uhr",
        "sentenceAfter": ".",
        "options": ["aufgestanden", "geaufstanden", "aufgesteht", "aufgestanden sind"],
        "correct": "aufgestanden",
        "acceptableAnswers": ["aufgestanden", "Wir sind heute Morgen um 6 Uhr aufgestanden", "Wir sind heute Morgen um 6 Uhr aufgestanden."],
        "hint": "auf + ge + standen = aufgestanden",
        "explanation": "aufstehen -> auf-ge-standen (with sein)."
      }
    ]
  }
]

# Read current german_verbs_master_data.ts
target_path = "german-prep-platform/src/data/german_verbs_master_data.ts"
with open(target_path, "r", encoding="utf-8") as f:
    ts_code = f.read()

# Replace the array with updated JSON
import re
match = re.search(r'export const GERMAN_VERBS_MASTER_DATA: VerbMasterTopic\[\] = (\[.*\]);', ts_code, re.DOTALL)
if match:
    current_arr = json.loads(match.group(1))
    current_ids = {t["id"] for t in current_arr}
    added_count = 0
    for topic in EXTRA_TOPICS:
        if topic["id"] not in current_ids:
            current_arr.append(topic)
            added_count += 1
    
    new_json = json.dumps(current_arr, ensure_ascii=False, indent=2)
    new_ts = ts_code[:match.start(1)] + new_json + ts_code[match.end(1):]
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(new_ts)
    print(f"Successfully added {added_count} extra topics! Total topics now: {len(current_arr)}")
else:
    print("Could not match array in ts_code")

