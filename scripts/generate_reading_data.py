# -*- coding: utf-8 -*-
import json

reading_parts = [
  # ==========================================
  # SET 1: Goethe / TELC B1 Standard Model Exam
  # ==========================================
  {
    "id": "set1-part-1",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 1,
    "title": "Teil 1: Blogbeitrag & Reisebericht (Passau nach Wien)",
    "title_en": "Part 1: Blog Post & Travel Report (Passau to Vienna)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Persönlicher Online-Blogbeitrag",
    "description": "Erfahrungsbericht von Laura über ihre siebentägige Radreise entlang der Donau.",
    "description_en": "Laura's personal blog report about her 7-day bike trip along the Danube.",
    "passHack": "Lesen Sie zuerst die Fragen, unterstreichen Sie Schlüsselbegriffe und suchen Sie im Text gezielt nach Synonymen (z. B. 'Unterkunft' = 'Pension/Zelt', 'preiswert' = 'billig').",
    "text_de": """Lauras Reiseblog: Sieben Tage auf dem Donauradweg

Vor zwei Wochen habe ich mir einen lang gehegten Traum erfüllt: Eine Fahrradtour von Passau nach Wien, ganz allein mit meinem Tourenrad und leichtem Gepäck. Ursprünglich wollte ich in Jugendherbergen übernachten, aber weil die Hauptsaison schon begonnen hatte, waren die meisten Betten bereits ausgebucht. Deshalb entschied ich mich spontan, ein kleines Zelt mitzunehmen und auf Campingplätzen zu schlafen. Das hat mir nicht nur viel Geld gespart, sondern war auch ein wunderschönes Naturerlebnis.

Das Wetter meinte es leider an den ersten zwei Tagen nicht gut mit mir. Es regnete fast ununterbrochen, und der Gegenwind machte das Vorankommen sehr anstrengend. Am dritten Tag in Linz riss jedoch der Himmel auf, und die Sonne begleitete mich für den Rest der Reise. Die Landschaft in der Wachau mit den malerischen Weinbergen und historischen Burgen hat mich schlichtweg verzaubert.

Besonders überrascht war ich von der Hilfsbereitschaft anderer Radler. Als mir am fünften Tag kurz vor Krems die Kette riss und ich kein passendes Werkzeug dabei hatte, hielt sofort ein nettes Ehepaar aus den Niederlanden an. Gemeinsam konnten wir den Schaden innerhalb von zwanzig Minuten reparieren.

Mein persönliches Fazit: Man braucht keine teure Ausrüstung oder monatelanges Training. Eine gute Regenjacke, bequeme Radlerhosen und die Bereitschaft, flexibel zu bleiben, reichen völlig aus. Nächstes Jahr plane ich schon die Fortsetzung bis nach Budapest!""",
    "text_en": """Laura's Travel Blog: Seven Days on the Danube Cycle Path

Two weeks ago I fulfilled a long-held dream: a cycling tour from Passau to Vienna, completely on my own with my touring bike and light luggage. Originally I wanted to stay in youth hostels, but because high season had already begun, most beds were fully booked. Therefore I decided spontaneously to take a small tent and camp at campsites. That not only saved me a lot of money, but was also a wonderful nature experience.

Unfortunately the weather was not kind to me on the first two days. It rained almost continuously, and the headwind made progress very exhausting. On the third day in Linz, however, the sky cleared up, and the sun accompanied me for the remainder of the journey. The landscape in the Wachau region with picturesque vineyards and historic castles simply enchanted me.

I was especially surprised by the helpfulness of other cyclists. When my bike chain broke on the fifth day just outside Krems and I had no matching tools with me, a kind couple from the Netherlands stopped immediately. Together we repaired the defect within twenty minutes.

My personal verdict: You do not need expensive equipment or months of training. A good waterproof jacket, comfortable bike shorts, and the willingness to remain flexible are completely sufficient. Next year I am already planning the continuation to Budapest!""",
    "questions": [
      {
        "id": "s1-r1-q1",
        "question_de": "Warum übernachtete Laura auf Campingplätzen?",
        "question_en": "Why did Laura stay at campsites?",
        "options": [
          { "de": "Sie wollte von Anfang an lieber zelten als in Hotels schlafen.", "en": "She wanted to camp from the beginning rather than stay in hotels." },
          { "de": "In den Jugendherbergen gab es keine freien Plätze mehr.", "en": "There were no available beds left in the youth hostels." },
          { "de": "Das Zelten war ihr schon vor der Reise von Freunden empfohlen worden.", "en": "Camping had been recommended to her by friends before the trip." }
        ],
        "correct": 1,
        "keywordHint": "Synonym-Signal: 'ausgebucht' im Text entspricht 'keine freien Plätze mehr' in der Lösung.",
        "keywordHint_en": "Synonym signal: 'ausgebucht' in text corresponds directly to 'no available beds left' in the answer.",
        "trapAlert": "Achtung: Im Text steht 'Ursprünglich wollte ich in Jugendherbergen übernachten' - zelten war also nur ein spontaner Ausweichplan."
      },
      {
        "id": "s1-r1-q2",
        "question_de": "Wie war das Wetter während der Radtour?",
        "question_en": "How was the weather during the bicycle tour?",
        "options": [
          { "de": "Es regnete während der gesamten Reisezeit.", "en": "It rained continuously during the entire trip." },
          { "de": "Ab dem dritten Reisetag schien die Sonne.", "en": "From the third day onward the sun shone." },
          { "de": "Der Wind war die ganze Woche über sehr schwach.", "en": "The wind was very gentle all week long." }
        ],
        "correct": 1,
        "keywordHint": "Textstelle: 'Am dritten Tag in Linz riss der Himmel auf, und die Sonne begleitete mich für den Rest der Reise.'",
        "keywordHint_en": "Text passage: 'On the third day in Linz the sky cleared up, and the sun accompanied me for the rest of the trip.'",
        "trapAlert": "Falle: 'Es regnete fast ununterbrochen' galt nur für die ersten zwei Tage, nicht für die gesamte Tour."
      },
      {
        "id": "s1-r1-q3",
        "question_de": "Was passierte bei der Panne am fünften Tag?",
        "question_en": "What happened during the breakdown on the fifth day?",
        "options": [
          { "de": "Laura musste ihr Fahrrad in eine Werkstatt in Krems bringen.", "en": "Laura had to bring her bike to a workshop in Krems." },
          { "de": "Andere Reisende halfen ihr, die Fahrradkette zu reparieren.", "en": "Other travelers helped her repair the bicycle chain." },
          { "de": "Sie hatte das passende Werkzeug selbst in der Tasche.", "en": "She had the necessary tools in her own bag." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'hielt sofort ein nettes Ehepaar an. Gemeinsam konnten wir den Schaden reparieren.'",
        "keywordHint_en": "Signal: 'a kind couple stopped immediately. Together we repaired the defect.'",
        "trapAlert": "Sie hatte gerade kein eigenes Werkzeug dabei."
      }
    ]
  },
  {
    "id": "set1-part-2",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 2,
    "title": "Teil 2: Pressebericht (Vier-Tage-Woche im Test)",
    "title_en": "Part 2: Press Article (Testing the 4-Day Work Week)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Zeitungsartikel / Pressebericht",
    "description": "Ergebnisse eines sechsmonatigen Modellversuchs zur Vier-Tage-Woche in deutschen Betrieben.",
    "description_en": "Results of a 6-month trial of the 4-day work week in German companies.",
    "passHack": "In Teil 2 geht es um Fakten und Zahlen. Achten Sie auf Vergleiche (mehr/weniger, gestiegen/gesunken) und Begründungen mit 'weil' oder 'aufgrund'.",
    "text_de": """Immer mehr Unternehmen in Deutschland testen neue Arbeitszeitmodelle, um im Wettbewerb um qualifizierte Fachkräfte attraktiv zu bleiben. Ein kürzlich abgeschlossenes Pilotprojekt mit 45 mittelständischen Unternehmen zeigt überraschend positive Ergebnisse: Bei vollem Lohnausgleich reduzierten die Mitarbeiter ihre wöchentliche Arbeitszeit auf vier Tage.

Die Auswertung der Universität Münster ergab, dass die Produktivität in 85 Prozent der teilnehmenden Firmen gleich geblieben oder sogar leicht gestiegen ist. Als Hauptgrund nannten die Geschäftsführer eine spürbare Steigerung der Konzentration und eine Verringerung von Fehlzeiten durch Krankheitstage um durchschnittlich 18 Prozent.

Allerdings warnen Wirtschaftsverbände vor einer voreiligen gesetzlichen Einführung. Besonders in Pflegeberufen, in der Gastronomie und im Handwerk sei eine Verkürzung der Arbeitszeit ohne zusätzliches Personal kaum umsetzbar. Viele Handwerksbetriebe klagen bereits heute über einen akuten Mangel an Auszubildenden und Gesellen.""",
    "text_en": """More and more companies in Germany are testing new working time models to remain attractive in the competition for skilled professionals. A recently concluded pilot project with 45 medium-sized enterprises shows surprisingly positive results: With full wage compensation, employees reduced their weekly working time to four days.

The evaluation by the University of Münster revealed that productivity in 85 percent of participating companies remained the same or even slightly increased. As the primary reason, managing directors cited a noticeable increase in concentration and a reduction in sick leave days by an average of 18 percent.

However, business associations warn against premature statutory introduction. Particularly in healthcare professions, gastronomy, and trade crafts, a reduction in working hours is hardly feasible without additional staff. Many craft businesses already complain today about an acute shortage of apprentices and journeymen.""",
    "questions": [
      {
        "id": "s1-r2-q1",
        "question_de": "Welches Ergebnis zeigte das Pilotprojekt zur Vier-Tage-Woche?",
        "question_en": "What result did the pilot project on the 4-day work week show?",
        "options": [
          { "de": "Die Gehälter der Mitarbeiter wurden um 20 Prozent gekürzt.", "en": "Employees' salaries were reduced by 20 percent." },
          { "de": "Die Produktivität sank in den meisten Unternehmen deutlich.", "en": "Productivity declined noticeably in most companies." },
          { "de": "Die Mitarbeiter waren seltener wegen Krankheit abwesend.", "en": "Employees were absent less often due to illness." }
        ],
        "correct": 2,
        "keywordHint": "Signal: 'Verringerung von Fehlzeiten durch Krankheitstage um durchschnittlich 18 Prozent'.",
        "keywordHint_en": "Signal: 'Reduction in sick leave days by an average of 18 percent'.",
        "trapAlert": "Gehälter blieben voll erhalten ('vollem Lohnausgleich'), Produktivität sank nicht ('blieb gleich oder stieg')."
      },
      {
        "id": "s1-r2-q2",
        "question_de": "In welchen Branchen wird das Modell kritisch gesehen?",
        "question_en": "In which sectors is the model viewed critically?",
        "options": [
          { "de": "In der IT-Branche und bei Banken.", "en": "In the IT sector and banks." },
          { "de": "In Handwerksbetrieben und Pflegeheimen.", "en": "In craft businesses and nursing homes." },
          { "de": "Ausschließlich an Universitäten und Schulen.", "en": "Exclusively at universities and schools." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Besonders in Pflegeberufen, in der Gastronomie und im Handwerk'.",
        "keywordHint_en": "Signal: 'Particularly in healthcare professions, gastronomy, and trade crafts'.",
        "trapAlert": "Achten Sie auf das Signalwort 'kaum umsetzbar'."
      }
    ]
  },
  {
    "id": "set1-part-3",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 3,
    "title": "Teil 3: Anzeigen zuordnen (5 Personen suchen Angebote)",
    "title_en": "Part 3: Match 5 Classified Ads with 5 People",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Kurzanzeigen & Situationen",
    "description": "5 Personen suchen passende Angebote in Kleinanzeigen. Ordnen Sie die jeweils passende Anzeige zu.",
    "description_en": "5 people are seeking suitable offers in classifieds. Match each person with the right advertisement.",
    "passHack": "Schauen Sie genau auf Altersbegrenzungen, Öffnungszeiten und Sonderwünsche. Eine Anzeige passt immer genau zu einer Person.",
    "text_de": """Situationen:
1. Martin (28) sucht einen spanischen Muttersprachler, um sein Spanisch vor einer Reise nach Kolumbien zu verbessern.
2. Familie Becker muss wegen Renovierung ihre Möbel für zwei Monate sicher und trocken einlagern.
3. Sandra (19) möchte nach Feierabend Gitarre spielen lernen, hat aber noch kein eigenes Instrument.
4. Julian (34) plant einen Tagesausflug mit seinen Kindern und sucht ein Museum mit Mitmach-Experimenten.
5. Sabine sucht für ihren 80-jährigen Vater einen leichten Seniorensportkurs am Vormittag.

Kleinanzeigen:
A) SelfStorage Park Süd: Sichere Lagerboxen von 5 bis 50 qm. Beheizt, trocken, 24/7 Zugang mit Code. Flexible Monatsmiete.
B) Musikschule KlangArt: Akustik- und E-Gitarrenkurse für Erwachsene am Abend. Leihinstrumente für Anfänger kostenlos verfügbar!
C) ScienceCenter Phänomenta: Naturwissenschaften zum Anfassen! Über 150 interaktive Stationen für Kinder und Jugendliche. Mo-So 10-18 Uhr.
D) Sprachen-Tandem Portal: Spanischlehrer aus Bogota sucht Deutsch-Muttersprachler für wöchentlichen Sprachaustausch bei Kaffee.
E) Turnverein Vorwärts: Sanfte Gymnastik & Rückentraining für Senioren 65+. Jeden Dienstag und Donnerstag 10:00 bis 11:00 Uhr.""",
    "text_en": """Situations:
1. Martin (28) seeks a native Spanish speaker to improve his Spanish before a trip to Colombia.
2. Becker family needs to store furniture securely and dry for two months due to renovation.
3. Sandra (19) wants to learn guitar after work but has no instrument yet.
4. Julian (34) plans a day trip with his children and looks for a hands-on museum.
5. Sabine is looking for a gentle senior exercise class in the morning for her 80-year-old father.

Classifieds:
A) SelfStorage Park South: Secure storage units 5 to 50 sqm. Heated, dry, 24/7 access. Flexible monthly lease.
B) KlangArt Music School: Acoustic and electric guitar courses for adults in the evening. Free loan instruments for beginners!
C) Phänomenta Science Center: Hands-on science! Over 150 interactive stations for kids. Mon-Sun 10 AM - 6 PM.
D) Language Tandem Portal: Spanish teacher from Bogota seeks German native speaker for weekly coffee exchange.
E) Vorwärts Sports Club: Gentle gymnastics & back exercises for seniors 65+. Every Tuesday and Thursday 10:00 to 11:00 AM.""",
    "questions": [
      {
        "id": "s1-r3-q1",
        "question_de": "Welche Anzeige passt für Martin (Spanisch-Tandem)?",
        "question_en": "Which ad matches Martin (Spanish tandem)?",
        "options": [
          { "de": "Anzeige D (Sprachen-Tandem Portal Bogota)", "en": "Ad D (Language Tandem Portal Bogota)" },
          { "de": "Anzeige B (Musikschule)", "en": "Ad B (Music School)" },
          { "de": "Keine Anzeige passt", "en": "No ad matches" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Spanischlehrer aus Bogota sucht Deutsch-Muttersprachler für Sprachaustausch'.",
        "keywordHint_en": "Signal: 'Spanish teacher from Bogota seeks German native speaker for language exchange'.",
        "trapAlert": "Prüfen Sie immer, ob beide Sprachen zueinander passen."
      },
      {
        "id": "s1-r3-q2",
        "question_de": "Welche Anzeige passt für Familie Becker (Möbel einlagern)?",
        "question_en": "Which ad matches Becker family (furniture storage)?",
        "options": [
          { "de": "Anzeige A (SelfStorage Park Süd)", "en": "Ad A (SelfStorage Park South)" },
          { "de": "Anzeige C (ScienceCenter)", "en": "Ad C (ScienceCenter)" },
          { "de": "Anzeige E (Turnverein Vorwärts)", "en": "Ad E (Sports Club)" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Lagerboxen, trocken, flexible Monatsmiete' = Möbel für zwei Monate einlagern.",
        "keywordHint_en": "Signal: 'Storage units, dry, flexible monthly lease' = store furniture for 2 months.",
        "trapAlert": "Keine Falle: 2 Monate ist flexibel abgedeckt."
      },
      {
        "id": "s1-r3-q3",
        "question_de": "Welche Anzeige passt für Sandra (Gitarre ohne eigenes Instrument)?",
        "question_en": "Which ad matches Sandra (guitar without own instrument)?",
        "options": [
          { "de": "Anzeige B (Musikschule KlangArt)", "en": "Ad B (KlangArt Music School)" },
          { "de": "Anzeige D (Tandem)", "en": "Ad D (Tandem)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Leihinstrumente für Anfänger kostenlos verfügbar' löst das Problem des fehlenden Instruments.",
        "keywordHint_en": "Signal: 'Free loan instruments for beginners available' solves the missing instrument problem.",
        "trapAlert": "Achten Sie auf das Schlüsselwort 'Leihinstrumente'."
      }
    ]
  },
  {
    "id": "set1-part-4",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 4,
    "title": "Teil 4: Meinungen Ja / Nein (E-Scooter in Fußgängerzonen)",
    "title_en": "Part 4: Opinions Yes / No (E-Scooters in Pedestrian Zones)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Leserbriefe / Internet-Forum",
    "description": "Vier Personen äußern ihre Meinung zu einem umstrittenen Thema: Sollen E-Scooter in Innenstädten verboten werden?",
    "description_en": "Four people express their opinion on a controversial topic: Should e-scooters be banned in city pedestrian zones?",
    "passHack": "Suchen Sie nach emotionalen Wörtern: 'Gefahr, rücksichtslos, Verbot' = DAGEGEN / JA zum Verbot. 'Praktisch, umweltfreundlich, modern' = DAFÜR / NEIN zum Verbot.",
    "text_de": """Thema der Woche im Stadtmagazin: 'Sollten elektrische Tretroller (E-Scooter) in unseren Fußgängerzonen verboten werden?'

1. Michael (42, Lehrer):
'Ich bin absolut für ein striktes Verbot. Täglich stolpere ich auf dem Gehweg über kreuz und quer abgestellte Roller. Außerdem fahren viele Jugendliche mit hoher Geschwindigkeit lautlos an Fußgängern vorbei. Das ist brandgefährlich für Kinder und ältere Menschen!'

2. Claudia (29, Architektin):
'Ein Verbot wäre ein Rückschritt. Ich fahre jeden Morgen die letzten zwei Kilometer vom Hauptbahnhof zum Büro mit dem E-Scooter. Das spart mir 20 Minuten und schont die Umwelt, weil ich kein Auto brauche. Man sollte lieber feste Parkzonen einrichten statt alles zu verbieten.'

3. Stefan (65, Rentner):
'Die Dinger gehören verbannt! Letzte Woche wurde mein Hund fast von so einem rücksichtslosen Fahrer angefahren. Die Polizei kontrolliert viel zu wenig. Fußgängerzonen müssen Fußgängern vorbehalten bleiben.'

4. Sarah (21, Studentin):
'Ich nutze E-Scooter sehr gerne, besonders nachts, wenn keine Busse mehr fahren. Sie geben mir ein sicheres Gefühl auf dem Heimweg. Ein generelles Verbot bestraft alle für das Fehlverhalten weniger rücksichtsloser Nutzer.'""",
    "text_en": """Topic of the Week in the City Magazine: 'Should electric scooters (e-scooters) be banned in our pedestrian zones?'

1. Michael (42, Teacher):
'I am absolutely in favor of a strict ban. Every day I trip over scooters parked haphazardly on the sidewalk. Furthermore, many teenagers speed past pedestrians silently. That is extremely dangerous for children and elderly people!'

2. Claudia (29, Architect):
'A ban would be a step backward. I ride an e-scooter every morning for the last two kilometers from main station to the office. It saves me 20 minutes and protects the environment because I do not need a car. We should create designated parking zones rather than banning everything.'

3. Stefan (65, Retiree):
'Those things should be banned! Last week my dog was almost hit by such a reckless rider. The police inspect far too little. Pedestrian zones must remain reserved for pedestrians.'

4. Sarah (21, Student):
'I enjoy using e-scooters, especially at night when no buses run anymore. They make me feel safe on my way home. A general ban punishes everyone for the misconduct of a few reckless users.'""",
    "questions": [
      {
        "id": "s1-r4-q1",
        "question_de": "Ist Michael für ein Verbot von E-Scootern?",
        "question_en": "Is Michael in favor of a ban on e-scooters?",
        "options": [
          { "de": "Ja (Er hält sie für gefährlich für Fußgänger).", "en": "Yes (He considers them dangerous for pedestrians)." },
          { "de": "Nein (Er möchte mehr E-Scooter für Jugendliche).", "en": "No (He wants more e-scooters for youth)." }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Ich bin absolut für ein striktes Verbot. Das ist brandgefährlich.'",
        "keywordHint_en": "Signal: 'I am absolutely in favor of a strict ban. That is extremely dangerous.'",
        "trapAlert": "Keine Falle: Klare Zustimmung zum Verbot."
      },
      {
        "id": "s1-r4-q2",
        "question_de": "Ist Claudia für ein Verbot von E-Scootern?",
        "question_en": "Is Claudia in favor of a ban on e-scooters?",
        "options": [
          { "de": "Ja (Sie fordert weniger Verkehr in der Stadt).", "en": "Yes (She demands less traffic in the city)." },
          { "de": "Nein (Sie nutzt den Roller täglich und schlägt Parkzonen vor).", "en": "No (She uses the scooter daily and suggests parking zones)." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Ein Verbot wäre ein Rückschritt... Man sollte feste Parkzonen einrichten statt zu verbieten.'",
        "keywordHint_en": "Signal: 'A ban would be a step backward... We should set up parking zones instead of banning.'",
        "trapAlert": "Achtung: Claudia schlägt Parkzonen vor, ist aber GEGEN das Verbot."
      }
    ]
  },
  {
    "id": "set1-part-5",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 5,
    "title": "Teil 5: Hausordnung & Ruhezeiten",
    "title_en": "Part 5: House Rules & Quiet Hours Regulation",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Offizielle Hausordnung / Brandschutz",
    "description": "Auszug aus einer offiziellen Mietshausordnung über Lärmschutz und Brandschutz im Flur.",
    "description_en": "Excerpt from an official apartment building regulation regarding noise control and fire safety.",
    "passHack": "In Teil 5 sind Signalwörter entscheidend: 'untersagt / unzulässig / verboten' = NICHT ERLAUBT. 'zulässig / gestattet' = ERLAUBT.",
    "text_de": """Hausordnung der Wohnungsbaugesellschaft Mitte

§ 2 Ruhezeiten und Lärmschutz
(1) Im Interesse aller Hausbewohner gilt tägliche Nachtruhe von 22:00 Uhr bis 06:00 Uhr. In dieser Zeit sind Rundfunk- und Fernsehgeräte auf Zimmerlautstärke zu stellen.
(2) An Werktagen (Montag bis Samstag) gilt darüber hinaus eine Mittagsruhe von 13:00 bis 15:00 Uhr. Das Spielen lauter Musikinstrumente sowie lärmintensive handwerkliche Arbeiten (Bohren, Hämmern) sind während dieser Zeiten strengstens untersagt.
(3) Sonn- und feiertags herrscht ganztägig Ruhe.

§ 4 Brandschutz und Treppenhaus
(1) Aus Sicherheitsgründen (Fluchtwege bei Brand) müssen alle Treppenhäuser und Hausflure stets vollkommen freigehalten werden.
(2) Das Abstellen von Fahrrädern, Kinderwagen, Schuhregalen oder Müllbeuteln im Hausflur ist bauordnungsrechtlich unzulässig.
(3) Bei Zuwiderhandlung werden die Gegenstände nach vorheriger schriftlicher Ankündigung kostenpflichtig auf Rechnung des Mieters entfernt.""",
    "text_en": """House Rules of Housing Association Mitte

Section 2 Quiet Hours and Noise Protection
(1) In the interest of all residents, daily nighttime quiet hours apply from 10:00 PM to 6:00 AM. During this time, audio devices must be set to room volume.
(2) On working days (Monday to Saturday), a midday quiet period applies from 1:00 PM to 3:00 PM. Playing loud musical instruments and noisy renovation work are strictly prohibited during these times.
(3) On Sundays and public holidays, quiet applies all day.

Section 4 Fire Safety and Staircase
(1) For safety reasons (emergency escape routes), all staircases and hallways must be kept completely clear at all times.
(2) Leaving bicycles, strollers, shoe racks, or trash bags in the hallway is legally prohibited.
(3) In case of violation, items will be removed at the tenant's expense following written notice.""",
    "questions": [
      {
        "id": "s1-r5-q1",
        "question_de": "Wann dürfen Mieter Renovierungsarbeiten in der Wohnung durchführen?",
        "question_en": "When are tenants allowed to carry out loud renovation work in the apartment?",
        "options": [
          { "de": "Am Sonntagnachmittag zwischen 15:00 und 18:00 Uhr.", "en": "On Sunday afternoon between 3:00 PM and 6:00 PM." },
          { "de": "An Werktagen zwischen 09:00 und 12:00 Uhr.", "en": "On weekdays between 9:00 AM and 12:00 PM." },
          { "de": "Jederzeit, wenn die Nachbarn vorher per Zettel informiert werden.", "en": "At any time if neighbors are informed in advance via a note." }
        ],
        "correct": 1,
        "keywordHint": "Ausschlussprinzip: An Werktagen 13-15 Uhr und 22-06 Uhr ist Ruhezeit. Sonntags ist ganztägig Ruhe. Vormittags 9-12 Uhr an Werktagen ist erlaubt!",
        "keywordHint_en": "Process of elimination: Weekdays 1-3 PM and 10 PM - 6 AM are quiet hours. Sunday is quiet all day. Weekday 9 AM - 12 PM is permitted!",
        "trapAlert": "Achtung: Sonntags ist laut Paragraph 2 ganztägig Ruhetag."
      },
      {
        "id": "s1-r5-q2",
        "question_de": "Was ist im Treppenhaus laut Brandschutzordnung erlaubt?",
        "question_en": "What is permitted in the staircase according to fire safety regulations?",
        "options": [
          { "de": "Das Abstellen von sauberen Schuhregalen direkt neben der Tür.", "en": "Placing clean shoe racks directly next to the door." },
          { "de": "Flure und Treppen müssen immer völlig frei von Gegenständen bleiben.", "en": "Hallways and stairs must always remain completely free of items." },
          { "de": "Fahrräder dürfen für maximal 48 Stunden angekettet werden.", "en": "Bicycles may be chained for a maximum of 48 hours." }
        ],
        "correct": 1,
        "keywordHint": "Text-Vorschrift: 'müssen alle Treppenhäuser und Hausflure stets vollkommen freigehalten werden.'",
        "keywordHint_en": "Text regulation: 'all staircases and hallways must be kept completely clear at all times.'",
        "trapAlert": "Schuhregale und Fahrräder sind ausdrücklich untersagt."
      }
    ]
  },

  # ==========================================
  # SET 2: Housing, Travel & Daily Life Exam
  # ==========================================
  {
    "id": "set2-part-1",
    "setNumber": 2,
    "setName": "Set 2: Housing, Community & City Life",
    "partNumber": 1,
    "title": "Teil 1: Blogbeitrag: Tobias zieht in eine neue WG nach Berlin",
    "title_en": "Part 1: Blog Post: Tobias moves into a shared flat in Berlin",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Persönlicher Online-Blogbeitrag",
    "description": "Tobias schildert seine abenteuerliche Wohnungssuche in Berlin und das Zusammenleben in einer Dreier-WG.",
    "description_en": "Tobias describes his adventurous apartment search in Berlin and living in a 3-person flatshare.",
    "passHack": "Achten Sie auf Wendungen wie 'zunächst dachte ich... doch dann'. Prüfer testen oft, ob Sie den tatsächlichen Ausgang verstehen.",
    "text_de": """Tobias berichtet: Mein erster Monat in der Berliner Dreier-WG

Nach meinem Studienabschluss in Freiburg bekam ich eine tolle Stelle als Marketing-Trainee in Berlin. Doch die Freude wurde schnell getrübt: Der Berliner Wohnungsmarkt ist bekanntlich extrem umkämpft. Fast zwei Monate lang schrieb ich unzählige Bewerbungen auf WG-Zimmer, bekam aber entweder gar keine Antwort oder stand bei Massenbesichtigungen mit vierzig anderen Bewerbern im Treppenhaus.

Als ich schon die Hoffnung aufgeben und vorübergehend in ein teures Hostel ziehen wollte, hatte ich riesiges Glück: Eine alte Schulfreundin zog gerade mit ihrem Freund zusammen und bot mir ihr 18 Quadratmeter großes Zimmer in Friedrichshain zur Zwischenmiete an. Die Miete war für Berliner Verhältnisse mit 480 Euro warm erstaunlich fair.

Meine beiden neuen Mitbewohner, Leyla und Jonas, sind super herzlich. Wir haben einen festen Putzplan an den Kühlschrank gehängt, damit es keinen Streit um den Abwasch gibt. Jeden Sonntagabend kochen wir abwechselnd gemeinsam. Letzte Woche gab es sogar schwäbische Spätzle nach dem Geheimrezept meiner Oma. Trotz des Großstadtlärms habe ich mich hier von der ersten Minute an zu Hause gefühlt!""",
    "text_en": """Tobias reports: My first month in a Berlin 3-person flatshare

After graduating in Freiburg, I landed a great job as a marketing trainee in Berlin. But the joy was quickly dampened: The Berlin housing market is notoriously competitive. For nearly two months I sent countless shared-flat applications, but either received no reply at all or stood in stairwells with forty other applicants during group viewings.

Just as I was about to give up hope and move into an expensive hostel temporarily, I got immensely lucky: An old school friend was moving in with her boyfriend and offered me her 18-square-meter room in Friedrichshain as a sublet. The rent was surprisingly fair for Berlin standards at 480 euros including utilities.

My two new flatmates, Leyla and Jonas, are wonderfully warm. We put a fixed cleaning schedule on the fridge so there are no disputes about dishes. Every Sunday evening we take turns cooking together. Last week we even made Swabian Spaetzle following my grandmother's secret recipe. Despite the big-city noise, I felt at home here from the very first minute!""",
    "questions": [
      {
        "id": "s2-r1-q1",
        "question_de": "Wie fand Tobias schließlich sein Zimmer in Berlin?",
        "question_en": "How did Tobias eventually find his room in Berlin?",
        "options": [
          { "de": "Über eine gewöhnliche Internet-Massenbesichtigung.", "en": "Via an ordinary internet group viewing." },
          { "de": "Durch eine persönliche Bekannte, die auszog.", "en": "Through a personal acquaintance who was moving out." },
          { "de": "Sein neuer Arbeitgeber stellte ihm eine Firmenwohnung.", "en": "His new employer provided him with a company apartment." }
        ],
        "correct": 1,
        "keywordHint": "Textstelle: 'Eine alte Schulfreundin zog gerade mit ihrem Freund zusammen und bot mir ihr Zimmer an.'",
        "keywordHint_en": "Text passage: 'An old school friend was moving in with her boyfriend and offered me her room.'",
        "trapAlert": "Massenbesichtigungen brachten ihm keinen Erfolg."
      },
      {
        "id": "s2-r1-q2",
        "question_de": "Wie organisieren die Mitbewohner die Hausarbeit?",
        "question_en": "How do the flatmates organize household chores?",
        "options": [
          { "de": "Sie haben eine externe Reinigungskraft angestellt.", "en": "They hired an external cleaner." },
          { "de": "Sie nutzen einen festen Putzplan am Kühlschrank.", "en": "They use a fixed cleaning schedule on the fridge." },
          { "de": "Jeder putzt nur sein eigenes Zimmer nach Bedarf.", "en": "Everyone only cleans their own room as needed." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Wir haben einen festen Putzplan an den Kühlschrank gehängt'.",
        "keywordHint_en": "Signal: 'We hung a fixed cleaning plan on the fridge'.",
        "trapAlert": "Keine externe Putzhilfe erwähnt."
      }
    ]
  },
  {
    "id": "set2-part-2",
    "setNumber": 2,
    "setName": "Set 2: Housing, Community & City Life",
    "partNumber": 2,
    "title": "Teil 2: Pressebericht (Repair-Cafés in Deutschland)",
    "title_en": "Part 2: Press Article (Repair Cafes in Germany)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Zeitungsartikel / Magazinbericht",
    "description": "Bericht über die wachsende Beliebtheit von Repair-Cafés zur Müllvermeidung und Nachbarschaftshilfe.",
    "description_en": "Report on the growing popularity of repair cafes for waste reduction and neighborly assistance.",
    "passHack": "Achten Sie genau auf Kostenhinweise: Sind die Reparaturen 'kostenlos' oder gegen 'Spende'? Prüfer fragen gern nach dem finanziellen Modell.",
    "text_de": """Reparieren statt Wegwerfen: Der Siegeszug der Repair-Cafés

Wenn der Toaster streikt oder die Lieblingsjacke an der Naht aufreißt, wandern viele Gebrauchsgegenstände direkt in den Müll. Nicht so im Bürgerhaus Köln-Nippes: Jeden zweiten Samstag im Monat verwandelt sich der Gemeindesaal in eine lebhafte Werkstatt. Ehrenamtliche Handwerker, pensionierte Elektriker und geschickte Schneiderinnen helfen Nachbarn dabei, defekte Gegenstände wieder funktionsfähig zu machen.

Das Konzept stammt ursprünglich aus den Niederlanden und hat sich in ganz Deutschland etabliert. Über 1.000 solcher Initiativen gibt es mittlerweile bundesweit. Die Hilfe zur Selbsthilfe ist dabei grundsätzlich kostenlos, die Veranstalter bitten lediglich um eine freiwillige Spende für Werkzeuge und Kaffee.

Rund 65 Prozent aller mitgebrachten Elektrogeräte können direkt vor Ort erfolgreich repariert werden. Neben dem ökologischen Nutzen für die Umwelt steht vor allem das soziale Miteinander im Vordergrund: Bei Kaffee und selbstgebackenem Kuchen knüpfen alte und neue Nachbarn generationenübergreifende Kontakte.""",
    "text_en": """Repair instead of discard: The triumph of Repair Cafes

When the toaster strikes or the favorite jacket rips at the seam, many everyday items end up straight in the trash. Not so at the community center in Cologne-Nippes: Every second Saturday of the month, the hall transforms into a lively workshop. Volunteer craftspeople, retired electricians, and skilled seamstresses help neighbors restore broken items to working order.

The concept originally originates from the Netherlands and has established itself across Germany. There are now over 1,000 such initiatives nationwide. The help for self-help is fundamentally free of charge; organizers merely ask for a voluntary donation for tools and coffee.

Around 65 percent of all brought electrical appliances can be repaired successfully right on site. In addition to the ecological benefit for the environment, social community stands in the foreground: Over coffee and homemade cake, old and new neighbors make cross-generational friendships.""",
    "questions": [
      {
        "id": "s2-r2-q1",
        "question_de": "Was kostet die Reparatur im Repair-Café?",
        "question_en": "What does a repair cost at the Repair Cafe?",
        "options": [
          { "de": "Einen festen Stundenlohn von 25 Euro.", "en": "A fixed hourly rate of 25 euros." },
          { "de": "Die Hilfe ist gebührenfrei, man bittet um eine freiwillige Spende.", "en": "Help is free of charge; they ask for a voluntary donation." },
          { "de": "Man muss die Ersatzteile im Voraus im Baumarkt kaufen.", "en": "One must buy replacement parts in advance at the hardware store." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'grundsätzlich kostenlos, bitten um eine freiwillige Spende'.",
        "keywordHint_en": "Signal: 'fundamentally free, ask for a voluntary donation'.",
        "trapAlert": "Kein fester Stundenlohn."
      },
      {
        "id": "s2-r2-q2",
        "question_de": "Wie hoch ist die Erfolgsquote bei den Reparaturen vor Ort?",
        "question_en": "How high is the success rate of on-site repairs?",
        "options": [
          { "de": "Über die Hälfte aller Geräte kann repariert werden.", "en": "Over half of all devices can be repaired." },
          { "de": "Nur etwa zehn Prozent der Geräte sind noch zu retten.", "en": "Only about ten percent of devices can be saved." },
          { "de": "Nahezu 100 Prozent aller defekten Gegenstände.", "en": "Nearly 100 percent of all defective items." }
        ],
        "correct": 0,
        "keywordHint": "Zahlen-Signal: 'Rund 65 Prozent aller mitgebrachten Geräte' = mehr als die Hälfte.",
        "keywordHint_en": "Number signal: 'Around 65 percent of all brought devices' = more than half.",
        "trapAlert": "Achtung: 65% ist über die Hälfte, aber weit unter 100%."
      }
    ]
  },
  {
    "id": "set2-part-3",
    "setNumber": 2,
    "setName": "Set 2: Housing, Community & City Life",
    "partNumber": 3,
    "title": "Teil 3: Anzeigen zuordnen (Alltag & Nachbarschaft)",
    "title_en": "Part 3: Match 5 Classified Ads (Daily Life & Neighborhood)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Kurzanzeigen & Situationen",
    "description": "5 Personen suchen Angebote im Bereich Familie, Wohnen und Freizeit.",
    "description_en": "5 individuals search for offers regarding family, living, and leisure.",
    "passHack": "Prüfen Sie Zeiten und Bedingungen. Wenn jemand etwas 'am Wochenende' sucht, scheidet eine Anzeige mit 'nur Mo-Fr' sofort aus.",
    "text_de": """Situationen:
1. Frau Meier sucht eine liebevolle Tagesmutter für ihre 3-jährige Tochter für zwei Vormittage pro Woche.
2. Herr Schmidt zieht am Samstag um und benötigt kurzfristig einen großen Lieferwagen mit Fahrer.
3. Anna kocht gerne und möchte am Wochenende lernen, wie man frische vegetarische Pasta selbst herstellt.
4. Markus sucht ein Fitnessstudio mit modernem Schwimmbad, das auch spät abends geöffnet hat.
5. Familie Bauer möchte ihre defekte italienische Kaffeemaschine günstig von einem Fachmann reparieren lassen.

Kleinanzeigen:
A) Möbeltaxi Blitz-Express: Kleintransporter mit erfahrenem Fahrer für Umzüge und Möbeltransporte. Auch samstags und sonntags buchbar. Festpreis ab 39 €/Std.
B) KITA Sonnenschein & Tagesmütter-Netzwerk: Zertifizierte Betreuungsplätze für Kleinkinder ab 1 Jahr. Flexible Halbtagsbetreuung Mo-Do vormittags frei!
C) Kochstudio Cucina Verde: Italienische Kochkurse am Samstagabend: Frische Pasta & Gnocchi rein vegetarisch zubereiten. Inklusive Zutaten.
D) Vitalis Wellness & Sportclub: 25-Meter-Sportschwimmbecken, große Saunalandschaft und Gerätebereich. Täglich geöffnet bis 23:30 Uhr.
E) Kaffeemaschinen-Doktor: Fachgerechte Reparatur und Wartung aller Siebträger- und Vollautomaten aller Marken. Kostenvoranschlag kostenlos.""",
    "text_en": """Situations:
1. Frau Meier seeks a kind childminder for her 3-year-old daughter for two mornings a week.
2. Herr Schmidt is moving on Saturday and urgently needs a large delivery van with driver.
3. Anna loves cooking and wants to learn on the weekend how to make fresh vegetarian pasta.
4. Markus seeks a fitness gym with a modern pool that is also open late in the evening.
5. Bauer family wants to have their broken Italian espresso machine repaired affordably by an expert.

Classifieds:
A) Blitz-Express Moving Taxi: Small van with experienced driver for moves. Bookable on Saturdays and Sundays. Fixed price from 39 €/hr.
B) Sonnenschein Daycare: Certified childcare for toddlers from 1 year. Flexible half-day care Mon-Thu mornings available!
C) Cucina Verde Cooking Studio: Italian cooking workshops Saturday evening: fresh vegetarian pasta & gnocchi. Ingredients included.
D) Vitalis Wellness Club: 25-meter pool, large sauna, and gym equipment. Open daily until 11:30 PM.
E) Espresso Doctor: Expert repair and maintenance for all coffee machines. Free cost estimate.""",
    "questions": [
      {
        "id": "s2-r3-q1",
        "question_de": "Welche Anzeige passt für Frau Meier (Kinderbetreuung Kleinkind)?",
        "question_en": "Which ad matches Frau Meier (toddler care)?",
        "options": [
          { "de": "Anzeige B (KITA Sonnenschein & Tagesmütter-Netzwerk)", "en": "Ad B (Daycare & Childminder Network)" },
          { "de": "Anzeige C (Kochstudio)", "en": "Ad C (Cooking Studio)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Kleinkinder ab 1 Jahr, Halbtagsbetreuung vormittags frei'.",
        "keywordHint_en": "Signal: 'Toddlers from 1 year, half-day care mornings available'.",
        "trapAlert": "Achten Sie auf das Alter des Kindes (3 Jahre)."
      },
      {
        "id": "s2-r3-q2",
        "question_de": "Welche Anzeige passt für Herr Schmidt (Umzugstransporter am Samstag)?",
        "question_en": "Which ad matches Herr Schmidt (moving van on Saturday)?",
        "options": [
          { "de": "Anzeige A (Möbeltaxi Blitz-Express)", "en": "Ad A (Blitz-Express Moving Taxi)" },
          { "de": "Anzeige D (Vitalis Club)", "en": "Ad D (Vitalis Club)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Kleintransporter mit Fahrer, auch samstags buchbar'.",
        "keywordHint_en": "Signal: 'Small van with driver, also bookable on Saturdays'.",
        "trapAlert": "Passt perfekt zu Samstag und Möbeltransport."
      },
      {
        "id": "s2-r3-q3",
        "question_de": "Welche Anzeige passt für Markus (Fitness mit Pool bis spät abends)?",
        "question_en": "Which ad matches Markus (fitness with pool late at night)?",
        "options": [
          { "de": "Anzeige D (Vitalis Wellness & Sportclub)", "en": "Ad D (Vitalis Wellness Club)" },
          { "de": "Anzeige E (Kaffeemaschinen-Doktor)", "en": "Ad E (Coffee Doctor)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: '25-Meter-Schwimmbecken... täglich geöffnet bis 23:30 Uhr'.",
        "keywordHint_en": "Signal: '25-meter swimming pool... open daily until 11:30 PM'.",
        "trapAlert": "Erfüllt beide Kriterien: Schwimmbad und späte Öffnungszeit."
      }
    ]
  },
  {
    "id": "set2-part-4",
    "setNumber": 2,
    "setName": "Set 2: Housing, Community & City Life",
    "partNumber": 4,
    "title": "Teil 4: Meinungen Ja / Nein (Hunde im Büro)",
    "title_en": "Part 4: Opinions Yes / No (Dogs in Office Workplaces)",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Leserbriefe / Internet-Forum",
    "description": "Vier Personen diskutieren über Bürohunde: Schaffen Tiere ein entspanntes Betriebsklima oder stören sie die Arbeit?",
    "description_en": "Four people debate office dogs: Do pets create a relaxed atmosphere or disrupt work?",
    "passHack": "Achten Sie auf das genaue Argument: 'Allergie / Angst / Lärm' = DAGEGEN. 'Stressreduktion / Freude / Bewegung in Pausen' = DAFÜR.",
    "text_de": """Debatte im Karriere-Portal: 'Sollten Mitarbeiter ihre Hunde mit ins Büro bringen dürfen?'

1. Patrick (35, Softwareentwickler):
'In unserem Start-up läuft seit zwei Jahren ein Golden Retriever durchs Büro. Wenn man gestresst vor dem Monitor sitzt, streichelt man ihn für zwei Minuten und der Puls geht sofort runter. Die Stimmung im Team ist durch den Hund viel lockerer geworden. Ich bin absolut dafür!'

2. Bettina (48, Buchhalterin):
'Ich habe leider eine schwere Tierhaarallergie. Wenn ein Hund im Großraumbüro wäre, könnte ich wegen tränender Augen und Atemnot nicht arbeiten. Außerdem gibt es Kollegen, die panische Angst vor Hunden haben. Im Büro muss professionell gearbeitet werden, Tiere gehören nach Hause.'

3. Oliver (27, Grafiker):
'Für mich war die Erlaubnis, meinen Dackel mitzubringen, der Hauptgrund, den Arbeitsvertrag zu unterschreiben. Sonst müsste ich ihn acht Stunden allein zu Hause einsperren oder eine teure Hundetagesstätte bezahlen. In den Pausen gehen wir gemeinsam spazieren, das hält fit!'

4. Miriam (52, Teamleiterin):
'Prinzipiell mag ich Tiere sehr, aber im Arbeitsalltag führt das oft zu Streit. Was passiert, wenn ein Hund bellt während eines wichtigen Kundentelefonats? Oder wenn zwei Hunde sich im Flur anknurren? Die Haftungsfragen bei Unfällen sind viel zu kompliziert.'""",
    "text_en": """Career Portal Debate: 'Should employees be allowed to bring their dogs to the office?'

1. Patrick (35, Software Developer):
'In our start-up, a Golden Retriever has been roaming the office for two years. When you are stressed at your monitor, you pet him for two minutes and your heart rate immediately drops. Team atmosphere has become much more relaxed. I am completely in favor!'

2. Bettina (48, Accountant):
'Unfortunately I have a severe pet hair allergy. If a dog were in our open-plan office, I could not work due to watery eyes and shortness of breath. Furthermore, some colleagues have a panic fear of dogs. Work must remain professional, pets belong at home.'

3. Oliver (27, Graphic Designer):
'For me, the permission to bring my dachshund was the primary reason I signed my job contract. Otherwise I would have to lock him up alone at home for eight hours or pay for expensive dog daycare. In breaks we walk together, which keeps us fit!'

4. Miriam (52, Team Leader):
'In principle I like animals very much, but in everyday work it frequently causes disputes. What happens when a dog barks during an important customer phone call? Or when two dogs growl in the hallway? Liability questions during accidents are far too complicated.'""",
    "questions": [
      {
        "id": "s2-r4-q1",
        "question_de": "Befürwortet Patrick Hunde im Büro?",
        "question_en": "Does Patrick support dogs in the office?",
        "options": [
          { "de": "Ja (Er findet, Hunde bauen Stress ab und verbessern das Betriebsklima).", "en": "Yes (He thinks dogs reduce stress and improve team atmosphere)." },
          { "de": "Nein (Er beschwert sich über Lärm beim Programmieren).", "en": "No (He complains about noise while programming)." }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Puls geht sofort runter, Stimmung viel lockerer, absolut dafür'.",
        "keywordHint_en": "Signal: 'Heart rate drops immediately, atmosphere much looser, completely in favor'.",
        "trapAlert": "Klare Zustimmung."
      },
      {
        "id": "s2-r4-q2",
        "question_de": "Welche Haltung hat Bettina zu Bürohunden?",
        "question_en": "What is Bettina's stance on office dogs?",
        "options": [
          { "de": "Sie ist dagegen wegen gesundheitlicher Bedenken und Allergien.", "en": "She is against due to health concerns and allergies." },
          { "de": "Sie möchte selbst bald einen Hund adoptieren.", "en": "She wants to adopt a dog herself soon." }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'schwere Tierhaarallergie, Atemnot, Tiere gehören nach Hause'.",
        "keywordHint_en": "Signal: 'Severe pet allergy, shortness of breath, animals belong at home'.",
        "trapAlert": "Klare Ablehnung aus gesundheitlichen Gründen."
      }
    ]
  },
  {
    "id": "set2-part-5",
    "setNumber": 2,
    "setName": "Set 2: Housing, Community & City Life",
    "partNumber": 5,
    "title": "Teil 5: Benutzungsordnung der Stadtbibliothek",
    "title_en": "Part 5: City Library Regulations & Loan Policies",
    "examSource": "Goethe / TELC B1 Standard",
    "textType": "Benutzungsordnung / Aushang",
    "description": "Regeln für Ausleihe, Fristen und Gebühren bei der Stadtbibliothek.",
    "description_en": "Rules for loans, deadlines, and fee schedules at the municipal library.",
    "passHack": "Achten Sie auf Ausnahmen bei Fristen (z. B. Bücher vs. DVDs) und Gebühren bei verspäteter Rückgabe.",
    "text_de": """Benutzungs- und Gebührensatzung der Stadtbibliothek

§ 3 Ausleihe und Leihfristen
(1) Medien können nur gegen Vorlage eines gültigen Bibliotheksausweises entliehen werden. Die Weitergabe des Ausweises an Dritte ist untersagt.
(2) Die reguläre Leihfrist für Bücher, Noten und Sprachkurse beträgt 28 Kalendertage (4 Wochen).
(3) Für audiovisuelle Medien (DVDs, Blu-rays und Videospiele) gilt eine verkürzte Leihfrist von 14 Kalendertagen (2 Wochen).
(4) Eine Verlängerung der Leihfrist ist bis zu zweimal möglich, sofern keine Vormerkung durch einen anderen Nutzer vorliegt.

§ 5 Versäumnis- und Mahngebühren
(1) Bei Überschreitung der Leihfrist wird ab dem ersten überfälligen Öffnungstag eine Säumnisgebühr von 1,00 Euro pro Medieneinheit und Woche berechnet.
(2) Außerhalb der Öffnungszeiten steht der automatische Rückgabe-Kasten am Haupteingang zur Verfügung. Maßgeblich ist das elektronische Buchungsdatum des Automaten.""",
    "text_en": """User Regulations and Fee Schedule of the Municipal Library

Section 3 Borrowing and Loan Deadlines
(1) Media can only be checked out upon presentation of a valid library card. Passing the card to third parties is prohibited.
(2) The regular loan period for books, sheet music, and language courses is 28 calendar days (4 weeks).
(3) For audiovisual media (DVDs, Blu-rays, and video games), a shortened loan period of 14 calendar days (2 weeks) applies.
(4) Extending the loan period is possible up to two times, provided no hold has been placed by another borrower.

Section 5 Overdue Fees and Fines
(1) If the loan deadline is exceeded, an overdue fee of 1.00 euro per item per week will be charged starting from the first overdue opening day.
(2) Outside opening hours, the automatic return drop-box at the main entrance is available. The electronic timestamp of the machine is decisive.""",
    "questions": [
      {
        "id": "s2-r5-q1",
        "question_de": "Wie lange darf man DVDs ausleihen?",
        "question_en": "How long may one borrow DVDs?",
        "options": [
          { "de": "Vier Wochen wie alle Bücher.", "en": "Four weeks like all books." },
          { "de": "Zwei Wochen (14 Kalendertage).", "en": "Two weeks (14 calendar days)." },
          { "de": "Beliebig lange ohne Begrenzung.", "en": "Indefinitely without limit." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Für audiovisuelle Medien (DVDs) gilt eine verkürzte Leihfrist von 14 Kalendertagen'.",
        "keywordHint_en": "Signal: 'For audiovisual media (DVDs) a shortened loan period of 14 calendar days applies'.",
        "trapAlert": "Falle: Bücher haben 28 Tage, DVDs nur 14 Tage."
      },
      {
        "id": "s2-r5-q2",
        "question_de": "Wie kann man Medien abgeben, wenn die Bibliothek geschlossen ist?",
        "question_en": "How can one return media when the library is closed?",
        "options": [
          { "de": "Man muss warten, bis die Bibliothek am nächsten Werktag öffnet.", "en": "One must wait until the library opens on the next working day." },
          { "de": "Über den automatischen Rückgabe-Kasten am Eingang.", "en": "Via the automatic return drop-box at the entrance." },
          { "de": "Durch Abgabe beim Pförtner des Rathauses.", "en": "By handing it to the town hall concierge." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Außerhalb der Öffnungszeiten steht der automatische Rückgabe-Kasten am Haupteingang zur Verfügung.'",
        "keywordHint_en": "Signal: 'Outside opening hours the automatic return drop-box at main entrance is available.'",
        "trapAlert": "Der Kasten bucht elektronisch ab."
      }
    ]
  },

  # ==========================================
  # SET 3: Work, Health & Bureaucracy (DTZ)
  # ==========================================
  {
    "id": "set3-part-1",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 1,
    "title": "Teil 1: Erfahrungsbericht: Marias Ausbildung zur Pflegefachkraft",
    "title_en": "Part 1: Personal Report: Maria's Nursing Apprenticeship in Munich",
    "examSource": "DTZ B1 / Goethe B1 Beruf",
    "textType": "Erfahrungsbericht / Blog",
    "description": "Maria aus Madrid berichtet über die Herausforderungen und Freuden ihrer Ausbildung am Universitätsklinikum München.",
    "description_en": "Maria from Madrid shares the challenges and joys of her vocational nursing training at Munich University Clinic.",
    "passHack": "Besonders im DTZ kommen Texte aus der Arbeitswelt vor. Achten Sie auf Begriffe wie 'Ausbildung', 'Schichtdienst' und 'Berufsschule'.",
    "text_de": """Mein Weg in die deutsche Pflege: Marias Ausbildungsbericht

Als ich vor zwei Jahren mit einem A2-Zertifikat aus Madrid nach München kam, hatte ich großen Respekt vor der dualen Pflegeausbildung. Die ersten Monate auf der chirurgischen Station waren sprachlich ein Schock: Der bayerische Dialekt vieler älterer Patienten und die unzähligen medizinischen Fachbegriffe brachten mich oft an meine Grenzen.

Doch mein Team hat mich fantastisch unterstützt. Meine Praxisanleiterin Susanne nahm sich jede Woche zwei Extrastunden, um mit mir Übergabeberichte zu schreiben und Arztanordnungen durchzugehen. Im Wechsel zwischen dreiwöchigen Schulblöcken an der Berufsschule und praktischen Einsätzen im Schichtdienst verging die Zeit wie im Flug.

Das Schönste an meinem Beruf ist die unmittelbare Dankbarkeit der Menschen. Wenn ein Patient nach einer schweren Knieoperation seine ersten Schritte auf dem Flur macht und mich dabei anstrahlt, weiß ich genau, warum ich diesen Weg gewählt habe. Letzten Monat habe ich die Zwischenprüfung mit einer Zwei bestanden. Nächstes Jahr bin ich examinierte Fachkraft!""",
    "text_en": """My Path into German Healthcare: Maria's Apprenticeship Report

When I arrived in Munich from Madrid two years ago with an A2 certificate, I had immense respect for the dual nursing training. The first months on the surgical ward were a linguistic shock: The Bavarian dialect of many elderly patients and countless medical technical terms often pushed me to my limits.

Yet my team supported me fantastically. My mentor Susanne took two extra hours every week to review hand-over reports with me and go through doctor orders. Alternating between 3-week classroom blocks at vocational school and practical shifts, time flew by.

The most beautiful aspect of my job is the immediate gratitude of the people. When a patient takes their first steps in the hallway after knee surgery and beams at me, I know exactly why I chose this path. Last month I passed the intermediate exam with an 'A'. Next year I will be a fully certified specialist!""",
    "questions": [
      {
        "id": "s3-r1-q1",
        "question_de": "Was fiel Maria zu Beginn ihrer Ausbildung besonders schwer?",
        "question_en": "What did Maria find particularly difficult at the beginning of her apprenticeship?",
        "options": [
          { "de": "Sie fand keine bezahlbare Wohnung in München.", "en": "She could not find an affordable apartment in Munich." },
          { "de": "Der Dialekt der Patienten und die medizinische Fachsprache.", "en": "The dialect of patients and medical technical terminology." },
          { "de": "Die Kollegen auf der Station waren unhöflich zu ihr.", "en": "The colleagues on the ward were rude to her." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Der bayerische Dialekt und die unzähligen medizinischen Fachbegriffe brachten mich an Grenzen'.",
        "keywordHint_en": "Signal: 'Bavarian dialect and countless medical terms pushed me to limits'.",
        "trapAlert": "Kollegen waren nicht unhöflich, sondern unterstützten sie fantastisch."
      },
      {
        "id": "s3-r1-q2",
        "question_de": "Wie wird Maria von ihrer Praxisanleiterin gefördert?",
        "question_en": "How is Maria supported by her practical mentor?",
        "options": [
          { "de": "Sie bezahlt ihren privaten Sprachkurs aus eigener Tasche.", "en": "She pays for her private language course out of pocket." },
          { "de": "Sie übt wöchentlich zwei Stunden lang Übergabeberichte mit ihr.", "en": "She practices hand-over reports with her for two hours every week." },
          { "de": "Sie befreit sie vom anstrengenden Schichtdienst.", "en": "She exempts her from strenuous shift duty." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'nahm sich jede Woche zwei Extrastunden, um Übergabeberichte zu schreiben'.",
        "keywordHint_en": "Signal: 'Took two extra hours every week to write hand-over reports'.",
        "trapAlert": "Sie ist nicht vom Schichtdienst befreit."
      }
    ]
  },
  {
    "id": "set3-part-2",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 2,
    "title": "Teil 2: Pressebericht (Das elektronische Rezept in deutschen Praxen)",
    "title_en": "Part 2: Press Article (The E-Prescription in German Medical Clinics)",
    "examSource": "DTZ B1 / Goethe B1 Standard",
    "textType": "Pressebericht / Gesundheit",
    "description": "Erklärung des bundesweiten E-Rezepts: Wie Patienten Medikamente mit ihrer Krankenkassenkarte abholen.",
    "description_en": "Explanation of the nationwide electronic prescription: How patients pick up medications with their health card.",
    "passHack": "In Sachtexten zum Thema Gesundheit kommen viele bürokratische Vorgänge vor. Notieren Sie sich das 'Wie' (Karte vorlegen vs. App).",
    "text_de": """Abschied vom rosa Zettel: Das E-Rezept ist Pflicht

Seit Anfang des Jahres ist das elektronische Rezept für verschreibungspflichtige Medikamente in Deutschland verbindlicher Standard. Für gesetzlich versicherte Patienten bedeutet das eine spürbare Erleichterung: Der klassische rosa Papierzettel gehört größtenteils der Vergangenheit an.

Die Einlösung in der Apotheke funktioniert auf drei Wegen: Am unkompliziertesten ist das Vorzeigen der elektronischen Gesundheitskarte (eGK) am Apothekentresen. Die Apothekerin steckt die Karte ins Lesegerät und kann das vom Arzt digital signierte Medikament sofort abrufen. Eine PIN ist dafür nicht erforderlich.

Alternativ können Patienten eine offizielle Smartphone-App nutzen oder sich in der Praxis einen Papierausdruck mit einem QR-Code mitgeben lassen. Besonders chronisch Kranke profitieren von der Neuerung: Wer regelmäßig die gleichen Medikamente benötigt, muss für ein Folgerezept nicht mehr jedes Quartal persönlich in die Praxis kommen, sondern kann es telefonisch anfordern und direkt in der Apotheke abholen.""",
    "text_en": """Farewell to the Pink Slip: The E-Prescription is Mandatory

Since the beginning of the year, electronic prescriptions for prescription drugs have become the binding standard in Germany. For legally insured patients, this means noticeable relief: The classic pink paper slip is largely a thing of the past.

Redemption at pharmacies functions in three ways: The most straightforward is presenting the electronic health card (eGK) at the pharmacy counter. The pharmacist inserts the card into the reader and can instantly retrieve the digitally signed medication. A PIN is not required for this.

Alternatively, patients can use an official smartphone app or have the clinic provide a paper printout containing a QR code. Chronically ill patients benefit particularly: Those requiring regular medication no longer need to visit the clinic in person every quarter, but can request follow-ups by phone and pick them up directly at the pharmacy.""",
    "questions": [
      {
        "id": "s3-r2-q1",
        "question_de": "Was benötigt ein Patient mindestens, um ein E-Rezept in der Apotheke einzulösen?",
        "question_en": "What does a patient need at minimum to redeem an e-prescription at the pharmacy?",
        "options": [
          { "de": "Ein modernes Smartphone mit installierter App und PIN.", "en": "A modern smartphone with installed app and PIN." },
          { "de": "Nur seine elektronische Gesundheitskarte (ohne PIN).", "en": "Only their electronic health card (without a PIN)." },
          { "de": "Einen handschriftlich unterschriebenen rosa Zettel.", "en": "A hand-signed pink paper slip." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Am unkompliziertesten ist das Vorzeigen der Gesundheitskarte. Eine PIN ist dafür nicht erforderlich.'",
        "keywordHint_en": "Signal: 'Most straightforward is showing the health card. A PIN is not required.'",
        "trapAlert": "Weder Smartphone noch PIN sind zwingend vorgeschrieben."
      },
      {
        "id": "s3-r2-q2",
        "question_de": "Welchen Vorteil haben chronisch Kranke durch das E-Rezept?",
        "question_en": "What advantage do chronically ill patients have through the e-prescription?",
        "options": [
          { "de": "Ihre Medikamente sind ab sofort völlig kostenlos.", "en": "Their medications are completely free of charge from now on." },
          { "de": "Sie müssen für Folgerezepte nicht mehr jedes Mal persönlich in die Praxis.", "en": "They no longer need to visit the clinic in person every time for follow-up prescriptions." },
          { "de": "Sie dürfen Medikamente ohne ärztliche Verschreibung kaufen.", "en": "They are allowed to buy prescription drugs without doctor authorization." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'muss für ein Folgerezept nicht mehr jedes Quartal persönlich in die Praxis kommen'.",
        "keywordHint_en": "Signal: 'No longer needs to come to the clinic in person every quarter for follow-up prescriptions'.",
        "trapAlert": "Medikamente werden dadurch nicht kostenlos."
      }
    ]
  },
  {
    "id": "set3-part-3",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 3,
    "title": "Teil 3: Anzeigen zuordnen (Weiterbildung & Beruf)",
    "title_en": "Part 3: Match 5 Classified Ads (Vocational & Career Training)",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "textType": "Kurzanzeigen & Situationen",
    "description": "5 Personen suchen Kurse und Jobs im Bereich Beruf und Weiterbildung.",
    "description_en": "5 individuals search for vocational courses and jobs in career training.",
    "passHack": "Prüfen Sie gezielt Teilnahmevoraussetzungen (z. B. 'Bildungsgutschein' oder 'Abendkurs').",
    "text_de": """Situationen:
1. Ali arbeitet Vollzeit im Pflegedienst und sucht einen medizinischen Deutschkurs B1/B2 am Abend.
2. Julia möchte nach fünf Jahren Erziehungspause wieder arbeiten und sucht ein individuelles Bewerbungscoaching.
3. Daniel arbeitet im Lager und möchte an einem Wochenende den Gabelstaplerschein erwerben.
4. Fatma sucht einen flexiblen Minijob (bis 538 €) an Samstagen als Aushilfe im Einzelhandel.
5. Thomas hat geringe Computerkenntnisse und sucht einen verständlichen Einstiegskurs für MS Office am Vormittag.

Kleinanzeigen:
A) MedFach Institut: Deutsch für Pflege- und Gesundheitsberufe (B1/B2). Berufsbegleitender Abendkurs montags und mittwochs 18:30 bis 20:45 Uhr. Förderbar durch BAMF.
B) Job-Perspektive: Individuelles Bewerbungstraining für Wiedereinsteigerinnen. Optimierung von Lebenslauf, Anschreiben und Vorstellungsgespräch. Kostenübernahme mit AVGS-Gutschein möglich.
C) Logistik-Schulungszentrum: Flurfördermittelschein (Gabelstapler) Intensivkurs in 2 Tagen (Samstag & Sonntag). Theorie & Fahrpraxis mit Zertifikat.
D) EDEKA Markt Frischequelle: Freundliche Aushilfen (m/w/d) für Kasse und Warenpflege auf Minijob-Basis gesucht. Arbeitszeit jeden Samstag 08:00 bis 14:00 Uhr.
E) Volkshochschule Zentrum: EDV-Grundlagen für Einsteiger: Computer, E-Mail und Word Schritt für Schritt. Samstags 09:00 bis 12:30 Uhr (4 Termine).""",
    "text_en": """Situations:
1. Ali works full-time in nursing and seeks an evening medical German course (B1/B2).
2. Julia wants to re-enter the workforce after 5 years of parental leave and seeks individual application coaching.
3. Daniel works in a warehouse and wants to acquire a forklift license over a single weekend.
4. Fatma seeks a flexible mini-job on Saturdays in retail.
5. Thomas has basic computer skills and seeks an easy beginner MS Office course in the morning.

Classifieds:
A) MedFach Institute: German for healthcare (B1/B2). Evening course Mon and Wed 6:30 to 8:45 PM.
B) Job Perspective: Individual application coaching for women re-entering the workforce.
C) Logistics Center: Forklift operator license 2-day intensive weekend course (Sat & Sun).
D) EDEKA Supermarket: Friendly cashiers on mini-job basis for Saturdays 8:00 AM - 2:00 PM.
E) VHS Adult Education: Computer fundamentals for beginners on Saturday mornings 9:00 AM - 12:30 PM.""",
    "questions": [
      {
        "id": "s3-r3-q1",
        "question_de": "Welche Anzeige passt für Ali (Abendkurs Deutsch Pflege)?",
        "question_en": "Which ad matches Ali (evening German for healthcare)?",
        "options": [
          { "de": "Anzeige A (MedFach Institut Abendkurs)", "en": "Ad A (MedFach Institute Evening Course)" },
          { "de": "Anzeige B (Job-Perspektive)", "en": "Ad B (Job Perspective)" },
          { "de": "Keine Anzeige passt", "en": "No ad matches" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Deutsch für Pflegeberufe, Abendkurs montags und mittwochs 18:30 Uhr'.",
        "keywordHint_en": "Signal: 'German for healthcare, evening course Mon and Wed 6:30 PM'.",
        "trapAlert": "Passt perfekt zu Alis Vollzeitarbeit."
      },
      {
        "id": "s3-r3-q2",
        "question_de": "Welche Anzeige passt für Daniel (Gabelstaplerschein am Wochenende)?",
        "question_en": "Which ad matches Daniel (forklift license on weekend)?",
        "options": [
          { "de": "Anzeige C (Logistik-Schulungszentrum Intensivkurs)", "en": "Ad C (Logistics Center Intensive Course)" },
          { "de": "Anzeige D (Supermarkt)", "en": "Ad D (Supermarket)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Gabelstapler Intensivkurs in 2 Tagen (Samstag & Sonntag)'.",
        "keywordHint_en": "Signal: 'Forklift intensive course in 2 days (Saturday & Sunday)'.",
        "trapAlert": "Erfüllt beide Kriterien: Gabelstapler und Wochenende."
      },
      {
        "id": "s3-r3-q3",
        "question_de": "Welche Anzeige passt für Fatma (Minijob Supermarkt Samstag)?",
        "question_en": "Which ad matches Fatma (mini-job supermarket Saturday)?",
        "options": [
          { "de": "Anzeige D (EDEKA Frischequelle Samstag)", "en": "Ad D (EDEKA Supermarket Saturday)" },
          { "de": "Anzeige E (Volkshochschule)", "en": "Ad E (Adult Education)" },
          { "de": "Keine passende Anzeige", "en": "No matching ad" }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Aushilfen auf Minijob-Basis... jeden Samstag 08:00 bis 14:00 Uhr'.",
        "keywordHint_en": "Signal: 'Helpers on mini-job basis... every Saturday 8:00 AM to 2:00 PM'.",
        "trapAlert": "Passt exakt auf Fatmas Wunsch."
      }
    ]
  },
  {
    "id": "set3-part-4",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 4,
    "title": "Teil 4: Meinungen Ja / Nein (Homeoffice-Pflicht)",
    "title_en": "Part 4: Opinions Yes / No (Mandatory Homeoffice)",
    "examSource": "DTZ B1 / Goethe B1 Standard",
    "textType": "Leserbriefe / Internet-Forum",
    "description": "Vier Angestellte diskutieren: Sollten Unternehmen ihren Mitarbeitern ein Recht auf vollständiges Homeoffice gewähren?",
    "description_en": "Four employees debate: Should companies grant workers a legal right to 100% home office?",
    "passHack": "Suchen Sie nach Signalwörtern: 'Vereinbarkeit von Beruf und Familie, Pendelzeit sparen' = DAFÜR. 'Isolation, fehlender Teamgeist, schlechte Ergonomie' = DAGEGEN.",
    "text_de": """Wirtschaftsforum: 'Sollte ein gesetzlicher Anspruch auf 100% Homeoffice eingeführt werden?'

1. Thorsten (41, Vertriebsleiter):
'Vollständiges Homeoffice halte ich für einen großen Fehler. Wir merken in unserem Team, dass kreative Ideen und schnelle Problemlösungen fast immer im persönlichen Flurgespräch entstehen. Wenn jeder nur noch isoliert vor der Webcam sitzt, geht der Zusammenhalt verloren. Zwei Tage daheim sind gut, aber fünf Tage schaden der Firma.'

2. Aylin (33, Datenanalystin):
'Für mich als Mutter von zwei kleinen Kindern ist Homeoffice die Rettung. Ich spare täglich zwei Stunden Fahrzeit im Stau und kann meine Arbeitszeit flexibel einteilen. Die Arbeitsergebnisse zählen, nicht die physische Anwesenheit am Schreibtisch. Ein Rechtsanspruch ist längst überfällig!'

3. Gregor (59, Abteilungsleiter):
'Viele junge Mitarbeiter unterschätzen die Vereinsamung. Wir hatten Fälle, in denen neue Kollegen nach sechs Monaten kaum jemanden im Unternehmen persönlich kannten. Außerdem sind viele Wohnungen ergonomisch gar nicht für dauerhafte Bildschirmarbeit geeignet.'

4. Melanie (26, Marketing-Managerin):
'Wer gute Fachkräfte gewinnen will, muss maximale Flexibilität bieten. Viele meiner Freunde würden keinen Arbeitsvertrag mehr unterschreiben, der sie zur täglichen Büropräsenz zwingt. Vertrauen statt Kontrolle sollte das Motto moderner Arbeitgeber sein.'""",
    "text_en": """Business Forum: 'Should a statutory right to 100% home office be introduced?'

1. Thorsten (41, Sales Director):
'I consider full home office a major mistake. We notice in our team that creative ideas and fast solutions almost always arise in informal hallway conversations. If everyone only sits isolated before webcams, cohesion is lost. Two days at home is good, but five days harms the company.'

2. Aylin (33, Data Analyst):
'For me as a mother of two small children, home office is a lifesaver. I save two hours of commute time in traffic daily and can schedule my hours flexibly. Work results matter, not physical presence at a desk. A legal entitlement is long overdue!'

3. Gregor (59, Department Head):
'Many young employees underestimate isolation. We had cases where new colleagues barely knew anyone in person after six months. Moreover, many apartments are not ergonomically suitable for permanent screen work.'

4. Melanie (26, Marketing Manager):
'Whoever wants to attract talented professionals must offer maximum flexibility. Many of my friends would no longer sign a contract requiring daily office presence. Trust instead of control should be the motto of modern employers.'""",
    "questions": [
      {
        "id": "s3-r4-q1",
        "question_de": "Befürwortet Thorsten einen Anspruch auf 100% Homeoffice?",
        "question_en": "Does Thorsten support an entitlement to 100% home office?",
        "options": [
          { "de": "Ja (Er möchte alle Büros schließen).", "en": "Yes (He wants to close all offices)." },
          { "de": "Nein (Er hält 5 Tage daheim für schädlich für den Teamgeist).", "en": "No (He considers 5 days at home damaging to team spirit)." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'halte ich für einen großen Fehler... fünf Tage schaden der Firma'.",
        "keywordHint_en": "Signal: 'I consider a major mistake... five days harm the company'.",
        "trapAlert": "Er befürwortet 2 Tage, lehnt aber 100% Homeoffice klar ab."
      },
      {
        "id": "s3-r4-q2",
        "question_de": "Welche Meinung vertritt Aylin zum Thema?",
        "question_en": "What opinion does Aylin hold on the topic?",
        "options": [
          { "de": "Sie ist dafür, weil sie Zeit spart und Familie und Beruf besser vereinbaren kann.", "en": "She is in favor because it saves time and balances family and career." },
          { "de": "Sie fordert die Rückkehr ins Büro wegen besserer Bildschirme.", "en": "She demands returning to the office for better monitors." }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Homeoffice ist die Rettung... Ein Rechtsanspruch ist längst überfällig!'.",
        "keywordHint_en": "Signal: 'Home office is a lifesaver... A legal entitlement is long overdue!'.",
        "trapAlert": "Aylin ist begeistert vom Homeoffice."
      }
    ]
  },
  {
    "id": "set3-part-5",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 5,
    "title": "Teil 5: Betriebliche Arbeitsschutzordnung & Krankmeldung",
    "title_en": "Part 5: Workplace Safety Regulations & Sick Leave Policy",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "textType": "Betriebsanweisung / Aushang",
    "description": "Offizielle betriebliche Vorschriften zur Krankmeldung und zum Tragen von Sicherheitskleidung.",
    "description_en": "Official corporate regulations regarding sick leave notification and safety attire.",
    "passHack": "Achten Sie genau auf Uhrzeiten und Fristen bei Krankmeldungen: 'vor Dienstbeginn' oder 'bis 08:30 Uhr'.",
    "text_de": """Betriebsordnung der Logistik Center Nord GmbH

§ 4 Arbeitsunfähigkeit und Krankmeldung
(1) Im Falle einer Erkrankung ist der Arbeitnehmer verpflichtet, dem direkten Vorgesetzten oder der Personalabteilung die Arbeitsunfähigkeit sowie deren voraussichtliche Dauer unverzüglich, spätestens jedoch vor Arbeitsbeginn (bis 08:30 Uhr), telefonisch oder per E-Mail mitzuteilen.
(2) Dauert die Arbeitsunfähigkeit länger als drei Kalendertage, hat der Arbeitnehmer eine ärztliche Bescheinigung über die Arbeitsunfähigkeit (eAU) spätestens an dem darauffolgenden Werktag vorzulegen.
(3) Der Arbeitgeber ist berechtigt, die Vorlage der ärztlichen Bescheinigung in begründeten Fällen bereits ab dem ersten Krankheitstag zu verlangen.

§ 7 Persönliche Schutzausrüstung (PSA)
(1) Im gesamten Lager- und Logistikbereich ist das Tragen von Sicherheitsschuhen der Schutzklasse S3 Pflicht.
(2) Das Betreten der Hallen mit gewöhnlichem Straßenschuhwerk oder Sandalen ist strengstens untersagt.""",
    "text_en": """Company Regulations of Logistics Center North GmbH

Section 4 Inability to Work and Sick Leave Notification
(1) In case of illness, the employee is required to notify their direct supervisor or HR department of their inability to work and its expected duration without delay, at the latest before work starts (by 8:30 AM), via phone or email.
(2) If inability to work lasts longer than three calendar days, the employee must provide a medical sick certificate (eAU) at the latest on the following working day.
(3) The employer is entitled to demand submission of the medical certificate from the very first day of illness in justified cases.

Section 7 Personal Protective Equipment (PPE)
(1) Wearing safety shoes of protection class S3 is mandatory throughout the warehouse and logistics area.
(2) Entering the warehouses wearing ordinary street shoes or sandals is strictly prohibited.""",
    "questions": [
      {
        "id": "s3-r5-q1",
        "question_de": "Bis wann muss sich ein kranker Mitarbeiter spätestens im Betrieb melden?",
        "question_en": "By when at the latest must an ill employee notify the company?",
        "options": [
          { "de": "Bis spätestens 12:00 Uhr mittags.", "en": "By 12:00 PM noon at the latest." },
          { "de": "Vor Beginn der Arbeit, spätestens bis 08:30 Uhr.", "en": "Before work starts, by 8:30 AM at the latest." },
          { "de": "Erst nach Ablauf von drei Krankheitstagen.", "en": "Only after three days of illness have passed." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'spätestens jedoch vor Arbeitsbeginn (bis 08:30 Uhr)'.",
        "keywordHint_en": "Signal: 'at the latest before work begins (by 8:30 AM)'.",
        "trapAlert": "Die 3-Tage-Frist gilt für das ärztliche Attest, nicht für den Anruf."
      },
      {
        "id": "s3-r5-q2",
        "question_de": "Welche Schuhe müssen im Lagerbereich getragen werden?",
        "question_en": "Which shoes must be worn in the warehouse area?",
        "options": [
          { "de": "Bequeme Turnschuhe oder Sportschuhe.", "en": "Comfortable sneakers or sports shoes." },
          { "de": "Spezielle Sicherheitsschuhe der Schutzklasse S3.", "en": "Special safety shoes of protection class S3." },
          { "de": "Jedes saubere Straßenschuhwerk ohne Absätze.", "en": "Any clean street footwear without heels." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Tragen von Sicherheitsschuhen der Schutzklasse S3 Pflicht'.",
        "keywordHint_en": "Signal: 'Wearing safety shoes of class S3 mandatory'.",
        "trapAlert": "Straßenschuhe sind strengstens untersagt."
      }
    ]
  }
]

# Write to src/data/b1_reading_data.ts
content = "// Generated comprehensive B1 Reading Data with 3 Complete Exam Sets (15 Parts)\n"
content += "import { ReadingExamPart } from '@/types';\n\n"
content += "export const B1_READING_PARTS: ReadingExamPart[] = " + json.dumps(reading_parts, indent=2, ensure_ascii=False) + ";\n"

# Verify no em dash
if "\u2014" in content:
    content = content.replace("\u2014", " - ")

with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_reading_data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully wrote {len(reading_parts)} reading parts to src/data/b1_reading_data.ts")
