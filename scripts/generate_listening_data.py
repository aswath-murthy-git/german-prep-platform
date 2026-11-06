# -*- coding: utf-8 -*-
import json

listening_parts = [
  # ==========================================
  # SET 1: Goethe / TELC Standard Exam
  # ==========================================
  {
    "id": "set1-listen-part-1",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 1,
    "title": "Teil 1: Kurze Durchsagen & Mitteilungen (3 Alltagssituationen)",
    "title_en": "Part 1: Short Announcements (Train, Doctor, Storm)",
    "scenarioType": "Durchsagen & Anrufbeantworter",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Sie hören drei kurze Durchsagen aus dem Alltag. Zu jedem Text gibt es eine Frage.",
    "description_en": "You will hear three short announcements from everyday life. One question per text.",
    "passHack": "Achten Sie auf Richtungswechsel: Wenn der Sprecher sagt 'Eigentlich wollten wir... aber', folgt danach die richtige Information!",
    "audioTranscript_de": """Text 1 (Bahnhofsdurchsage):
Achtung an Gleis 4: Der Intercity-Express 782 nach Hamburg-Altona über Hannover, planmäßige Abfahrt 14 Uhr 25, hat heute voraussichtlich 35 Minuten Verspätung. Grund dafür ist eine technische Störung an der Oberleitung kurz vor Fulda. Reisende nach Hannover nutzen bitte alternativ den Regionalexpress auf Gleis 6, der in fünf Minuten abfährt. Ihre Fahrkarten sind für diesen Zug gültig. Wir bitten um Ihr Verständnis.

Text 2 (Anrufbeantworter Arztpraxis):
Guten Tag, hier ist die Praxis Dr. Müller. Frau Hoffmann, wir rufen an wegen Ihres Termins zur Blutabnahme am kommenden Donnerstag um 9 Uhr. Herr Dr. Müller muss am Donnerstagvormittag kurzfristig an einer dringenden Fortbildung teilnehmen. Wir möchten Ihren Termin daher gerne auf Freitag, den 14. Oktober, zur gleichen Uhrzeit verlegen. Bitte rufen Sie uns bis heute 17 Uhr zurück, um den neuen Termin zu bestätigen. Danke!

Text 3 (Wetterwarnung im Radio):
Und nun der Wetterbericht mit einer Unwetterwarnung für den gesamten Alpenraum: Für heute Nachmittag werden schwere Gewitter mit starkem Hagel und Sturmböen von bis zu 90 Stundenkilometern erwartet. Der Deutsche Wetterdienst rät dringend davon ab, Bergtouren oder Wanderungen oberhalb von 1.500 Metern zu unternehmen. Schließen Sie rechtzeitig alle Fenster und sichern Sie lose Gegenstände auf Balkonen und Terrassen.""",
    "audioTranscript_en": """Text 1 (Train station announcement):
Attention at Platform 4: ICE 782 to Hamburg-Altona via Hannover, scheduled departure 2:25 PM, is delayed by approximately 35 minutes today due to an overhead wire defect. Passengers to Hannover please take the Regional Express at Platform 6 leaving in 5 minutes. Tickets are valid for this train.

Text 2 (Doctor clinic voicemail):
Hello, this is Dr. Müller's clinic. Frau Hoffmann, we are calling regarding your blood test on Thursday at 9:00 AM. Dr. Müller has to attend urgent training. We would like to reschedule your appointment to Friday, October 14th, at the same time. Please call us back by 5:00 PM today to confirm.

Text 3 (Radio weather alert):
And now the weather alert for the entire Alpine region: Heavy thunderstorms with hail and gale-force winds up to 90 km/h are expected this afternoon. The Weather Service urgently advises against mountain hikes above 1,500 meters. Close all windows in advance and secure loose items on balconies.""",
    "questions": [
      {
        "id": "s1-l1-q1",
        "question_de": "Was sollen Fahrgäste nach Hannover tun?",
        "question_en": "What should passengers to Hannover do?",
        "options": [
          { "de": "Am Gleis 4 auf den verspäteten ICE warten.", "en": "Wait at Platform 4 for the delayed ICE." },
          { "de": "Den Regionalexpress auf Gleis 6 nehmen.", "en": "Take the Regional Express at Platform 6." },
          { "de": "Ihre Fahrkarten im Reisezentrum umtauschen.", "en": "Exchange their tickets at the travel center." }
        ],
        "correct": 1,
        "keywordHint": "Hör-Signal: 'Reisende nach Hannover nutzen bitte alternativ den Regionalexpress auf Gleis 6'.",
        "keywordHint_en": "Audio signal: 'Passengers to Hannover please take the Regional Express at platform 6'.",
        "distractorTrap": "Falle: Der ICE hat 35 Minuten Verspätung, Fahrkarten müssen nicht umgetauscht werden."
      },
      {
        "id": "s1-l1-q2",
        "question_de": "Wann soll der neue Termin für Frau Hoffmann stattfinden?",
        "question_en": "When is the new appointment for Frau Hoffmann scheduled?",
        "options": [
          { "de": "Am Donnerstag um 9 Uhr.", "en": "On Thursday at 9:00 AM." },
          { "de": "Am Freitag zur gleichen Uhrzeit.", "en": "On Friday at the same time." },
          { "de": "Heute Nachmittag vor 17 Uhr.", "en": "This afternoon before 5:00 PM." }
        ],
        "correct": 1,
        "keywordHint": "Hör-Signal: 'Termin daher gerne auf Freitag verlegen... zur gleichen Uhrzeit'.",
        "keywordHint_en": "Audio signal: 'Reschedule appointment to Friday... at the same time'.",
        "distractorTrap": "Falle: Donnerstag war der alte Termin; 17 Uhr ist die Rückruffrist."
      },
      {
        "id": "s1-l1-q3",
        "question_de": "Wovor warnt der Wetterdienst?",
        "question_en": "What does the weather service warn against?",
        "options": [
          { "de": "Vor Fahrten mit der Bergbahn.", "en": "Against riding the cable car." },
          { "de": "Vor Wanderungen in den Bergen ab 1.500 Metern.", "en": "Against hikes in the mountains above 1,500 meters." },
          { "de": "Vor Überschwemmungen an großen Flüssen.", "en": "Against flooding on major rivers." }
        ],
        "correct": 1,
        "keywordHint": "Hör-Signal: 'rät dringend davon ab, Bergtouren oberhalb von 1.500 Metern zu unternehmen'.",
        "keywordHint_en": "Audio signal: 'Urgently advises against mountain tours above 1,500 meters'.",
        "distractorTrap": "Flussüberschwemmungen werden in der Durchsage gar nicht erwähnt."
      }
    ]
  },
  {
    "id": "set1-listen-part-2",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 2,
    "title": "Teil 2: Führung durch das BMW Museum München",
    "title_en": "Part 2: Guided Tour of the BMW Museum Munich",
    "scenarioType": "Führung / Präsentation",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Sie hören eine Museumsführung. Der Museumsführer informiert eine Besuchergruppe über historische Fahrzeuge und Rundgangsregeln.",
    "description_en": "You will hear a museum guide introducing a visitor group to historic vehicles and exhibition rules.",
    "passHack": "Notieren Sie beim Hören sofort Zahlen (Stockwerke, Jahreszahlen) und Verbote (Fotografieren, Essen/Trinken).",
    "audioTranscript_de": """Herzlich willkommen im BMW Museum hier am Olympiapark in München! Mein Name ist Thomas Bach und ich freue mich, Sie heute durch unsere Dauerausstellung führen zu dürfen. 

Bevor wir gleich in den ersten Ausstellungsbereich gehen, möchte ich Ihnen kurz den Ablauf erklären: Unser Rundgang dauert etwa 75 Minuten. Wir werden die Geschichte des Unternehmens von den Anfängen als Flugmotorenhersteller im Jahr 1916 bis hin zu den modernen Elektrofahrzeugen der Zukunft kennenlernen. Auf einer Fläche von über 5.000 Quadratmetern erwarten Sie mehr als 120 Original-Exponate.

Ein paar wichtige Hinweise für Ihren Besuch: Das Fotografieren für private Zwecke ist in allen Räumen ausdrücklich gestattet, allerdings bitten wir Sie herzlich, auf das Verwenden von Blitzlicht und Stativen zu verzichten, um andere Besucher nicht zu stören. Essen und Getränke dürfen nicht in die Ausstellungsräume mitgenommen werden. Falls Sie Taschen oder Rucksäcke dabeihaben, können Sie diese kostenlos in unseren Schließfächern im Untergeschoss einschließen.

Am Ende unseres Rundgangs haben Sie noch die Gelegenheit, unseren Museumsshop zu besuchen oder im Café M1 einen Kaffee zu trinken. Folgen Sie mir bitte jetzt die Rampe hinauf zu unserer ersten Station: Den legendären Motorrädern der zwanziger Jahre.""",
    "audioTranscript_en": """Welcome to the BMW Museum here at the Olympic Park in Munich! My name is Thomas Bach and I am delighted to guide you through our permanent exhibition today.

Before we enter the first exhibition area, I would like to briefly explain the schedule: Our tour takes approximately 75 minutes. We will explore the company's history from its origins as an aircraft engine manufacturer in 1916 through to modern electric vehicles. Across 5,000 square meters, more than 120 original exhibits await you.

A few important notices: Photography for private purposes is permitted in all rooms; however, we kindly ask you to refrain from flash and tripods. Food and drinks are not allowed in exhibition halls. Free lockers are available in the basement for bags.

At the end of our tour, you will have the opportunity to visit our museum shop or enjoy coffee at Café M1. Please follow me now up the ramp to our first station.""",
    "questions": [
      {
        "id": "s1-l2-q1",
        "question_de": "Wie lange dauert die Führung durch das Museum?",
        "question_en": "How long does the guided museum tour last?",
        "options": [
          { "de": "Etwa 45 Minuten.", "en": "Approximately 45 minutes." },
          { "de": "Ungefähr 75 Minuten (eine Stunde und 15 Minuten).", "en": "About 75 minutes (one hour and 15 minutes)." },
          { "de": "Über zwei Stunden.", "en": "Over two hours." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Unser Rundgang dauert etwa 75 Minuten'.",
        "keywordHint_en": "Signal: 'Our tour takes approximately 75 minutes'.",
        "distractorTrap": "Achten Sie genau auf die genannte Minutenzahl."
      },
      {
        "id": "s1-l2-q2",
        "question_de": "Welche Regel gilt für das Fotografieren im Museum?",
        "question_en": "What rule applies to photography in the museum?",
        "options": [
          { "de": "Fotografieren ist strengstens verboten.", "en": "Photography is strictly forbidden." },
          { "de": "Private Fotos sind erlaubt, aber ohne Blitzlicht.", "en": "Private photos are permitted, but without flash." },
          { "de": "Man muss eine zusätzliche Fotokarte für 5 Euro kaufen.", "en": "One must purchase an additional photo pass for 5 euros." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Fotografieren für private Zwecke gestattet, allerdings auf Blitzlicht verzichten'.",
        "keywordHint_en": "Signal: 'Photography for private purposes permitted, but refrain from flash'.",
        "distractorTrap": "Keine Fotokarte erwähnt; Blitzlicht ist verboten, nicht das Fotografieren selbst."
      }
    ]
  },
  {
    "id": "set1-listen-part-3",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 3,
    "title": "Teil 3: Büro-Gespräch (Planung des Sommerfestes)",
    "title_en": "Part 3: Office Conversation (Planning the Summer Barbecue)",
    "scenarioType": "Zwiegespräch im Büro",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Sie hören ein Gespräch zwischen den Arbeitskollegen Julia und Jan. Sie planen das Firmen-Sommerfest.",
    "description_en": "You will hear a conversation between colleagues Julia and Jan planning the company summer party.",
    "passHack": "Achten Sie darauf, WER WAS macht: Sprecher 1 schlägt etwas vor, Sprecher 2 widerspricht oder übernimmt eine andere Aufgabe.",
    "audioTranscript_de": """Julia: Hallo Jan! Hast du kurz Zeit? Wir müssen dringend das Sommerfest für unsere Abteilung organisieren. Chef meinte gestern, der Termin steht jetzt fest: Freitag, der 18. Juli.

Jan: Hi Julia! Ja klar, super. Letztes Jahr waren wir ja im Biergarten am Fluss, aber da war es so laut, dass man sich kaum unterhalten konnte.

Julia: Genau deshalb dachte ich, wir mieten diesmal die Grillhütte am Waldsee. Da haben wir viel Platz, einen überdachten Pavillon, falls es regnet, und die Kollegen können auch Volleyball spielen.

Jan: Die Idee ist klasse! Aber wer kümmert sich um das Essen? Wenn wir alles bei einem Caterer bestellen, wird das ziemlich teuer. Unser Abteilungsbudget ist dieses Jahr knapp.

Julia: Wir könnten es so machen wie bei Michaels Abschied: Die Firma spendiert die Getränke und das Grillfleisch sowie vegetarische Würstchen. Und die Kollegen bringen selbst Salate, Kuchen und Dips mit. Ich erstelle dafür heute Nachmittag eine digitale Liste im Intranet, in die sich jeder eintragen kann.

Jan: Perfekt. Und ich rufe gleich beim Forstamt an und reserviere die Grillhütte für den 18. Juli. Wir brauchen sicher auch noch zwei Musikanlagen, darum kümmere ich mich ebenfalls.""",
    "audioTranscript_en": """Julia: Hello Jan! Do you have a moment? We urgently need to organize our department summer party. The boss confirmed the date: Friday, July 18th.

Jan: Hi Julia! Sure. Last year we were at the river beer garden, but it was so noisy we could barely talk.

Julia: Exactly why I thought we should rent the barbecue hut at Lake Waldsee this time. Ample space, covered pavilion if it rains, and volleyball.

Jan: Great idea! But who handles the food? A caterer is expensive and budget is tight.

Julia: We could do it like Michael's farewell: Company sponsors drinks, meat, and vegetarian sausages. Colleagues bring salads, cakes, and dips. I will create a shared list on the intranet this afternoon.

Jan: Perfect. I will call the forestry office right now to reserve the hut for July 18th and organize speakers.""",
    "questions": [
      {
        "id": "s1-l3-q1",
        "question_de": "Wo soll das diesjährige Sommerfest stattfinden?",
        "question_en": "Where should this year's summer party take place?",
        "options": [
          { "de": "Wieder im lauten Biergarten am Fluss.", "en": "Again at the noisy beer garden by the river." },
          { "de": "In einer Grillhütte am Waldsee.", "en": "In a barbecue cabin at Lake Waldsee." },
          { "de": "In der Kantine des Firmengebäudes.", "en": "In the cafeteria of the office building." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'diesmal die Grillhütte am Waldsee mieten'.",
        "keywordHint_en": "Signal: 'Rent the barbecue hut at Lake Waldsee this time'.",
        "distractorTrap": "Der Biergarten war die Location vom letzten Jahr."
      },
      {
        "id": "s1-l3-q2",
        "question_de": "Welche Aufgabe übernimmt Julia?",
        "question_en": "Which task does Julia take on?",
        "options": [
          { "de": "Sie reserviert die Hütte beim Forstamt.", "en": "She reserves the cabin at the forestry office." },
          { "de": "Sie erstellt eine Liste im Intranet für Salate und Kuchen.", "en": "She creates an intranet list for salads and cakes." },
          { "de": "Sie kauft die Musikanlage für das Fest.", "en": "She buys the music speakers for the party." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Ich erstelle dafür heute Nachmittag eine digitale Liste im Intranet'.",
        "keywordHint_en": "Signal: 'I will create a digital list on the intranet this afternoon'.",
        "distractorTrap": "Jan reserviert die Hütte und kümmert sich um die Musik."
      }
    ]
  },
  {
    "id": "set1-listen-part-4",
    "setNumber": 1,
    "setName": "Set 1: Goethe / TELC Standard Exam",
    "partNumber": 4,
    "title": "Teil 4: Radio-Diskussion (Homeoffice & Arbeitswelt)",
    "title_en": "Part 4: Radio Discussion (Remote Work & Modern Office)",
    "scenarioType": "Radiogespräch mit zwei Gästen",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Ein Radiomoderator spricht mit Frau Vogel (Arbeitspsychologin) und Herrn Krüger (Unternehmer) über Vor- und Nachteile von Homeoffice.",
    "description_en": "A radio moderator talks with Frau Vogel (work psychologist) and Herr Krüger (business owner) about remote work pros and cons.",
    "passHack": "In Teil 4 fragt die Prüfung fast immer: 'Wer sagt was?' - Achten Sie auf die Stimme und ob Frau Vogel oder Herr Krüger spricht.",
    "audioTranscript_de": """Moderator: Guten Abend, liebe Hörerinnen und Hörer! Willkommen zu unserer Diskussionsrunde 'Aktuell am Abend'. Heute sprechen wir über das Thema: 'Dauerhaft daheim oder zurück ins Büro?'. Bei mir im Studio begrüße ich die Arbeitspsychologin Dr. Sabine Vogel und den Geschäftsführer einer IT-Firma, Markus Krüger. Herr Krüger, wie sieht die Lage in Ihrem Betrieb aus?

Herr Krüger: Wir haben während der Pandemie fast zu 100 Prozent remote gearbeitet. Aber ganz ehrlich: Die anfängliche Begeisterung ist verflogen. Wir stellen fest, dass neue Kollegen kaum noch eine emotionale Bindung zur Firma aufbauen. Zudem leidet die Innovationskraft: Die besten Ideen entstehen bei einer spontanen Tasse Kaffee in der Teeküche, nicht in geplanten Video-Meetings. Deshalb haben wir vor zwei Monaten eine Pflicht eingeführt: Mindestens drei Tage pro Woche muss jeder im Büro sein.

Moderator: Frau Dr. Vogel, Sie forschen seit vielen Jahren zur Arbeitszufriedenheit. Sehen Sie das auch so skeptisch?

Frau Vogel: Nicht ganz, Herr Moderator. Unsere Studien zeigen ganz klar: Die Produktivität leidet im Homeoffice keineswegs, oft ist sie sogar höher, weil die ständigen Unterbrechungen durch Kollegen am Schreibtisch wegfallen. Der entscheidende Punkt ist die Flexibilität: Wenn Arbeitnehmer ihre Arbeitszeit selbstbestimmt an ihr Familienleben anpassen können, sinkt das Burnout-Risiko dramatisch. Eine starre Präsenzpflicht, wie Herr Krüger sie vorschlägt, führt bei vielen qualifizierten Mitarbeitern eher zu Frust und Kündigungen.""",
    "audioTranscript_en": """Moderator: Good evening, listeners! Welcome to 'Current Topics'. Today: 'Permanently at home or back to the office?'. In the studio: work psychologist Dr. Sabine Vogel and IT company managing director Markus Krüger. Herr Krüger, how does your firm handle this?

Herr Krüger: We worked nearly 100% remote initially. But the initial enthusiasm is gone. New colleagues build barely any emotional connection. The best ideas arise spontaneously over coffee in the kitchen, not in video meetings. Therefore, we introduced a rule: At least three days a week in the office.

Moderator: Dr. Vogel, you research job satisfaction. Do you share this skepticism?

Frau Vogel: Not entirely. Studies clearly show productivity does not suffer at home; it is often higher without office interruptions. The decisive point is flexibility: When workers adapt hours to family life, burnout drops dramatically. A rigid office presence rule causes frustration and resignations.""",
    "questions": [
      {
        "id": "s1-l4-q1",
        "question_de": "Welche Regelung gilt aktuell in der Firma von Herrn Krüger?",
        "question_en": "What regulation applies currently in Herr Krüger's company?",
        "options": [
          { "de": "Alle Mitarbeiter arbeiten zu 100 Prozent zu Hause.", "en": "All employees work 100 percent at home." },
          { "de": "Jeder muss mindestens drei Tage pro Woche im Büro anwesend sein.", "en": "Everyone must be present in the office at least three days a week." },
          { "de": "Das Büro wurde komplett aufgegeben.", "en": "The office was completely given up." }
        ],
        "correct": 1,
        "keywordHint": "Signal Herr Krüger: 'Deshalb haben wir eine Pflicht eingeführt: Mindestens drei Tage pro Woche im Büro'.",
        "keywordHint_en": "Signal Herr Krüger: 'Therefore we introduced a rule: At least three days a week in the office'.",
        "distractorTrap": "100% Homeoffice war nur während der Pandemie."
      },
      {
        "id": "s1-l4-q2",
        "question_de": "Welchen Hauptvorteil von Homeoffice nennt Frau Dr. Vogel?",
        "question_en": "What primary benefit of home office does Dr. Vogel cite?",
        "options": [
          { "de": "Mitarbeiter machen weniger Pausen und arbeiten länger.", "en": "Employees take fewer breaks and work longer." },
          { "de": "Bessere Vereinbarkeit mit der Familie und geringeres Burnout-Risiko.", "en": "Better balance with family and lower risk of burnout." },
          { "de": "Unternehmen sparen die Miete für Büroflächen.", "en": "Companies save rent on office space." }
        ],
        "correct": 1,
        "keywordHint": "Signal Frau Vogel: 'Arbeitszeit an Familienleben anpassen, sinkt das Burnout-Risiko dramatisch'.",
        "keywordHint_en": "Signal Frau Vogel: 'Adapt work hours to family life, burnout risk drops dramatically'.",
        "distractorTrap": "Büromiete wird von Frau Vogel nicht erwähnt."
      }
    ]
  },

  # ==========================================
  # SET 2: Housing, Shopping & City Life
  # ==========================================
  {
    "id": "set2-listen-part-1",
    "setNumber": 2,
    "setName": "Set 2: Housing, Shopping & City Life",
    "partNumber": 1,
    "title": "Teil 1: Kurze Durchsagen (Supermarkt, Flughafen, Notdienst)",
    "title_en": "Part 1: Short Announcements (Supermarket, Airport Gate, Dental Emergency)",
    "scenarioType": "Durchsagen & Anrufbeantworter",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Drei authentische Ansagen: Supermarkt-Kassendurchsage, Gate-Wechsel am Flughafen und Zahnarzt-Notdienst.",
    "description_en": "Three authentic announcements: Supermarket checkout notice, airport gate change, and dental emergency service.",
    "passHack": "Achten Sie auf Zahlen und Uhrzeiten: Kassen-Nummern, Gate-Buchstaben und Notdienst-Sprechzeiten.",
    "audioTranscript_de": """Text 1 (Supermarktdurchsage):
Sehr geehrte Kundinnen und Kunden, wir öffnen für Sie ab sofort Kasse 3. Bitte beachten Sie: An Kasse 3 ist ausschließlich bargeldlose Zahlung mit EC-Karte, Kreditkarte oder Smartphone möglich. Kundinnen und Kunden, die bar bezahlen möchten, nutzen bitte weiterhin die Kassen 1 und 2. Außerdem möchten wir Sie daran erinnern, dass unser Markt heute um 20 Uhr schließt. Bitte begeben Sie sich rechtzeitig zu den Kassen.

Text 2 (Flughafendurchsage):
Letzter Aufruf für die Fluggäste der Lufthansa, Flug LH 402 nach New York JFK. Herr Carlos Ramos und Frau Sophie Laurent, bitte begeben Sie sich unverzüglich zum Gate C 04. Ich wiederhole: Eine wichtige Gate-Änderung für Flug LH 402 nach New York: Das neue Abfluggate ist C 04 im Terminal 2 und nicht wie auf Ihrer Bordkarte aufgedruckt Gate B 12. Das Boarding wird in wenigen Minuten geschlossen.

Text 3 (Anrufbeantworter Zahnärztlicher Notdienst):
Sie sind verbunden mit dem zahnärztlichen Notdienst der Stadt Nürnberg. Die regulären Praxen sind am heutigen Wochenende geschlossen. Den Notdienst am heutigen Samstag und morgigen Sonntag übernimmt die Praxis Dr. Karin Weiland in der Fürther Straße 45. Die Notfall-Sprechstunden finden vormittags von 10:00 bis 12:00 Uhr und nachmittags von 17:00 bis 18:30 Uhr statt. Bitte bringen Sie Ihre elektronische Gesundheitskarte mit.""",
    "audioTranscript_en": """Text 1 (Supermarket notice):
Dear customers, we are opening Checkout 3 immediately. Please note: Checkout 3 accepts cashless payments only (card or smartphone). Cash payers please continue to use Checkouts 1 and 2. Our market closes at 8:00 PM today.

Text 2 (Airport announcement):
Final call for Lufthansa flight LH 402 to New York JFK. Gate change notice: The new departure gate is C 04 in Terminal 2, and not Gate B 12 as printed on your boarding pass. Boarding closes in a few minutes.

Text 3 (Dental emergency voicemail):
You have reached the dental emergency hotline for Nuremberg. Emergency service this weekend is provided by Dr. Karin Weiland, Fürther Straße 45. Consultation hours: 10:00 to 12:00 AM and 5:00 to 6:30 PM. Please bring your health insurance card.""",
    "questions": [
      {
        "id": "s2-l1-q1",
        "question_de": "Wer darf an Kasse 3 bezahlen?",
        "question_en": "Who is allowed to pay at Checkout 3?",
        "options": [
          { "de": "Nur Kunden mit Bargeld.", "en": "Only customers with cash." },
          { "de": "Kunden, die mit Karte oder Smartphone bargeldlos zahlen.", "en": "Customers paying cashlessly with card or phone." },
          { "de": "Nur Inhaber einer speziellen Kundenkarte.", "en": "Only holders of a special loyalty card." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'ausschließlich bargeldlose Zahlung mit EC-Karte, Kreditkarte oder Smartphone'.",
        "keywordHint_en": "Signal: 'Cashless payment only with debit card, credit card, or smartphone'.",
        "distractorTrap": "Barzahler müssen Kasse 1 und 2 nutzen."
      },
      {
        "id": "s2-l1-q2",
        "question_de": "Zu welchem Gate müssen die Passagiere nach New York gehen?",
        "question_en": "Which gate must passengers to New York proceed to?",
        "options": [
          { "de": "Zu Gate B 12 wie auf der Bordkarte.", "en": "To Gate B 12 as on the boarding pass." },
          { "de": "Zu Gate C 04 im Terminal 2.", "en": "To Gate C 04 in Terminal 2." },
          { "de": "Direkt zum Informationsschalter im Terminal 1.", "en": "Directly to the info counter in Terminal 1." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Das neue Abfluggate ist C 04 im Terminal 2 und nicht Gate B 12'.",
        "keywordHint_en": "Signal: 'The new departure gate is C 04 in Terminal 2 and not Gate B 12'.",
        "distractorTrap": "Gate B 12 war das alte Gate."
      },
      {
        "id": "s2-l1-q3",
        "question_de": "Wann ist die Notfall-Sprechstunde am Nachmittag?",
        "question_en": "When are the afternoon emergency consultation hours?",
        "options": [
          { "de": "Von 14:00 bis 16:00 Uhr.", "en": "From 2:00 to 4:00 PM." },
          { "de": "Von 17:00 bis 18:30 Uhr.", "en": "From 5:00 to 6:30 PM." },
          { "de": "Durchgehend bis 22:00 Uhr.", "en": "Continuously until 10:00 PM." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'nachmittags von 17:00 bis 18:30 Uhr'.",
        "keywordHint_en": "Signal: 'Afternoons from 5:00 to 6:30 PM'.",
        "distractorTrap": "10:00 bis 12:00 Uhr war die Vormittagszeit."
      }
    ]
  },
  {
    "id": "set2-listen-part-2",
    "setNumber": 2,
    "setName": "Set 2: Housing, Shopping & City Life",
    "partNumber": 2,
    "title": "Teil 2: Stadtführung durch das historische Nürnberg",
    "title_en": "Part 2: Historic City Tour of Nuremberg",
    "scenarioType": "Stadtführung / Fremdenführerin",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Stadtführerin Frau Wagner führt eine Touristengruppe vom Hauptmarkt hinauf zur Kaiserburg.",
    "description_en": "Tour guide Frau Wagner leads a tourist group from the main market up to the Imperial Castle.",
    "passHack": "Merken Sie sich Treffpunkte und Zeitpunkte für Pausen oder Fotostopps.",
    "audioTranscript_de": """Grüß Gott und herzlich willkommen zu unserer Altstadtführung durch Nürnberg! Mein Name ist Brigitte Wagner. Wir stehen hier auf dem berühmten Nürnberger Hauptmarkt, wo im Dezember der weltbekannte Christkindlesmarkt stattfindet.

Unser Spaziergang dauert etwa 90 Minuten. Wir gehen zunächst an der gotischen Frauenkirche vorbei, überqueren die Pegnitz über die historische Henkersteg-Brücke und steigen dann hinauf zur Kaiserburg, dem Wahrzeichen unserer Stadt. Auf der Burg haben Sie von der Aussichtsplattform einen fantastischen Panoramablick über die gesamte Stadt.

Vorab zwei praktische organisatorische Hinweise: Der Aufstieg zur Burg ist an zwei Stellen etwas steil mit Kopfsteinpflaster. Gehen Sie bitte langsam und vorsichtig. Auf der Burg oben legen wir eine 15-minütige Pause ein. Dort gibt es auch saubere öffentliche Toiletten sowie einen Kiosk für Getränke und echte Nürnberger Lebkuchen. Bitte seien Sie nach der Pause pünktlich wieder am Brunnen im inneren Burghof, damit wir gemeinsam den berühmten Tiefen Brunnen besichtigen können. Jetzt aber los!""",
    "audioTranscript_en": """Hello and welcome to our old town tour of Nuremberg! My name is Brigitte Wagner. We are standing here on the famous main market square.

Our walk lasts about 90 minutes. We will pass the Gothic Frauenkirche church, cross the Pegnitz river via the historic Henkersteg bridge, and climb up to the Imperial Castle, our city's landmark with its panoramic viewing terrace.

Two practical notes: The climb has cobblestones and is steep in two spots; please walk carefully. At the castle we take a 15-minute break with restrooms and snacks. Please gather punctually at the fountain inside the castle courtyard after the break.""",
    "questions": [
      {
        "id": "s2-l2-q1",
        "question_de": "Wie lange dauert der Stadtrundgang?",
        "question_en": "How long does the walking tour last?",
        "options": [
          { "de": "Etwa 45 Minuten.", "en": "About 45 minutes." },
          { "de": "Ungefähr 90 Minuten (eineinhalb Stunden).", "en": "About 90 minutes (one and a half hours)." },
          { "de": "Den ganzen Nachmittag.", "en": "The entire afternoon." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Unser Spaziergang dauert etwa 90 Minuten'.",
        "keywordHint_en": "Signal: 'Our walk takes approximately 90 minutes'.",
        "distractorTrap": "15 Minuten ist nur die Pause oben auf der Burg."
      },
      {
        "id": "s2-l2-q2",
        "question_de": "Wo trifft sich die Gruppe nach der Pause auf der Burg?",
        "question_en": "Where does the group meet after the break at the castle?",
        "options": [
          { "de": "Unten am Hauptmarkt.", "en": "Down at the main market square." },
          { "de": "Am Brunnen im inneren Burghof.", "en": "At the fountain in the inner castle courtyard." },
          { "de": "Direkt an der Henkersteg-Brücke.", "en": "Directly at the Henkersteg bridge." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'wieder am Brunnen im inneren Burghof, damit wir den Tiefen Brunnen besichtigen'.",
        "keywordHint_en": "Signal: 'Again at the fountain in the inner courtyard to visit the Deep Well'.",
        "distractorTrap": "Hauptmarkt war der Startpunkt, Henkersteg unterwegs."
      }
    ]
  },
  {
    "id": "set2-listen-part-3",
    "setNumber": 2,
    "setName": "Set 2: Housing, Shopping & City Life",
    "partNumber": 3,
    "title": "Teil 3: Alltagsgespräch (Wohnungsübergabe & Kaution)",
    "title_en": "Part 3: Everyday Dialogue (Apartment Handover & Deposit)",
    "scenarioType": "Zwiegespräch zwischen Freunden",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Lisa bittet ihren Freund Karim um Hilfe bei der Übergabe ihrer alten Mietwohnung.",
    "description_en": "Lisa asks her friend Karim for advice regarding the handover of her rented apartment.",
    "passHack": "Achten Sie darauf, über welches Problem gesprochen wird (z. B. Wände streichen oder Kaution zurückbekommen).",
    "audioTranscript_de": """Lisa: Karim, danke, dass du vorbeigekommen bist! Ich mache mir gerade ziemliche Sorgen wegen meiner Wohnungsübergabe am kommenden Mittwoch.

Karim: Warum denn, Lisa? Du hast die Wohnung doch immer super gepflegt.

Lisa: Ja, aber mein Vermieter, Herr Huber, ist extrem pingelig. Im Mietvertrag steht, dass ich alle Wände beim Auszug weiß streichen muss. Im Wohnzimmer hatte ich aber vor zwei Jahren eine Wand dunkelblau gestrichen. Reicht es, wenn ich nur diese eine Wand wieder weiß streiche, oder muss ich wirklich die ganze Wohnung renovieren?

Karim: Keine Panik! Ich kenne mich da durch meinen Bruder im Mieterverein ein bisschen aus: Wenn die restlichen Wände sauber sind, musst du nur die farbige Wand in einem neutralen, hellen Farbton streichen. Weiß oder Hellgrau reicht völlig aus. Ich helfe dir am Montagabend dabei, mit einer Farbrolle haben wir das in zwei Stunden erledigt.

Lisa: Oh Karim, du bist ein Lebensretter! Und wie läuft das mit der Kaution? Ich brauche die 1.400 Euro dringend für meine neue Wohnung.

Karim: Wichtig ist, dass ihr am Mittwoch ein Übergabeprotokoll ausfüllt. Alle Zählerstände für Strom, Wasser und Heizung genau aufschreiben und Herr Huber muss unterschreiben, dass keine Schäden da sind. Den Großteil der Kaution muss er dir dann innerhalb weniger Wochen überweisen, nur einen kleinen Teil darf er für die Nebenkostenabrechnung einbehalten.""",
    "audioTranscript_en": """Lisa: Karim, thanks for coming! I am quite worried about my apartment handover next Wednesday.

Karim: Why, Lisa? You maintained the place wonderfully.

Lisa: Yes, but landlord Herr Huber is very picky. The contract says repaint white. I painted one wall dark blue. Do I only repaint that wall or the whole flat?

Karim: No panic! You only need to repaint the colored wall in a neutral light tone. White or light gray is fine. I will help you Monday evening; done in two hours.

Lisa: You are a lifesaver! What about the 1,400 euro deposit?

Karim: Essential: fill out a handover protocol on Wednesday. Record meter readings for electricity, water, heating, and get Huber's signature that there is no damage.""",
    "questions": [
      {
        "id": "s2-l3-q1",
        "question_de": "Was müssen Lisa und Karim am Montagabend tun?",
        "question_en": "What must Lisa and Karim do on Monday evening?",
        "options": [
          { "de": "Die gesamte Wohnung komplett neu tapezieren.", "en": "Completely wallpaper the whole apartment." },
          { "de": "Nur die dunkelblaue Wand im Wohnzimmer wieder weiß streichen.", "en": "Only repaint the dark blue living room wall white." },
          { "de": "Die Zählerstände an die Stadtwerke melden.", "en": "Report meter readings to utility company." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'musst du nur die farbige Wand... streichen. Ich helfe dir am Montagabend dabei'.",
        "keywordHint_en": "Signal: 'Only repaint the colored wall... I will help you Monday evening'.",
        "distractorTrap": "Die ganze Wohnung muss nicht gestrichen werden."
      },
      {
        "id": "s2-l3-q2",
        "question_de": "Was rät Karim für die Übergabe am Mittwoch?",
        "question_en": "What does Karim advise for the handover on Wednesday?",
        "options": [
          { "de": "Einen Anwalt mitzubringen.", "en": "To bring a lawyer along." },
          { "de": "Ein genaues Übergabeprotokoll mit Zählerständen auszufüllen.", "en": "To fill out an exact handover protocol with meter readings." },
          { "de": "Die Schlüssel einfach in den Briefkasten zu werfen.", "en": "To simply throw the keys into the mailbox." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Wichtig ist, dass ihr am Mittwoch ein Übergabeprotokoll ausfüllt'.",
        "keywordHint_en": "Signal: 'Important is that you fill out a handover protocol on Wednesday'.",
        "distractorTrap": "Kein Anwalt nötig; Zählerstände und Protokoll sind entscheidend."
      }
    ]
  },
  {
    "id": "set2-listen-part-4",
    "setNumber": 2,
    "setName": "Set 2: Housing, Shopping & City Life",
    "partNumber": 4,
    "title": "Teil 4: Radio-Diskussion (Autofreie Innenstädte)",
    "title_en": "Part 4: Radio Discussion (Car-Free City Centers)",
    "scenarioType": "Radiogespräch mit zwei Gästen",
    "examSource": "Goethe / TELC B1 Standard",
    "description": "Radio-Streitgespräch über das Für und Wider einer autofreien Innenstadt zwischen einem Einzelhändler und einer Umweltschützerin.",
    "description_en": "Radio debate on pros and cons of car-free city centers between a local shop owner and an environmentalist.",
    "passHack": "Achten Sie genau auf Gegenargumente: 'Umsatzeinbußen / Kunden fahren ins Einkaufszentrum' vs 'bessere Luft / mehr Lebensqualität'.",
    "audioTranscript_de": """Moderatorin: Herzlich willkommen zu unserer wöchentlichen Diskussionssendung 'Forum Stadtleben'. Heute debattieren wir über ein Thema, das die Gemüter erhitzt: 'Sollte unsere historische Innenstadt komplett für den Autoverkehr gesperrt werden?'. Bei mir im Studio sind Jürgen Meyer, Vorsitzender des Einzelhandelsverbandes, und Elena Fischer von der Initiative 'Lebenswerte Stadt'. Herr Meyer, Sie haben letzte Woche mit einer Demonstration gegen die Pläne der Stadtverwaltung protestiert. Warum?

Herr Meyer: Weil ein totales Autoverbot den Todesstoß für viele Traditionsgeschäfte in unserer Fußgängerzone bedeuten würde! Unsere Kunden kommen nicht nur aus der Altstadt, sondern aus dem gesamten Landkreis. Wer für 200 Euro Kleidung kauft oder schwere Haushaltswaren besorgt, transportiert das nicht in einer überfüllten Straßenbahn. Wenn die Leute nicht mehr bequem mit dem Pkw in die Parkhäuser fahren können, kaufen sie entweder im Internet oder fahren ins große Einkaufszentrum an der Autobahn.

Moderatorin: Frau Fischer, Sie fordern seit Jahren eine autofreie City. Verstehen Sie die Sorgen der Händler nicht?

Frau Fischer: Diese Sorgen sind verständlich, aber unbegründet, Herr Meyer. Alle europäischen Vorzeigebeispiele von Kopenhagen bis Wien belegen das Gegenteil: Wo kein Motorenlärm und keine Abgase sind, verweilen Menschen viel länger. Cafés und Restaurants stellen Tische nach draußen, Familien flanieren entspannt ohne Angst um ihre Kinder. Mehr Aufenthaltsqualität bringt nachweislich mehr Umsatz, nicht weniger! Was wir brauchen, sind günstige Park-and-Ride-Parkplätze am Stadtrand und ein Fünf-Minuten-Takt bei Straßenbahnen und Bussen.""",
    "audioTranscript_en": """Moderator: Welcome to 'City Life Forum'. Today's debate: 'Should our historic inner city be completely closed to car traffic?'. Guests: Jürgen Meyer (Retailers Association) and Elena Fischer ('Liveable City'). Herr Meyer, why did you protest?

Herr Meyer: Because a total car ban is the death blow for traditional stores! Customers come from surrounding counties. Anyone buying 200 euros of goods will not transport them on crowded trams. If they cannot drive into parking garages, they shop online or go to the motorway mall.

Moderator: Frau Fischer, you demand a car-free city. Do you not understand retailers' concerns?

Frau Fischer: Understandable, but unfounded. European models from Copenhagen to Vienna prove the opposite: Without engine noise and exhaust, people linger longer. Outdoor dining flourishes; families stroll safely. Higher quality of stay increases revenue. We need Park & Ride and 5-minute tram intervals.""",
    "questions": [
      {
        "id": "s2-l4-q1",
        "question_de": "Welche Befürchtung äußert Herr Meyer zum Autoverbot?",
        "question_en": "What fear does Herr Meyer express regarding the car ban?",
        "options": [
          { "de": "Dass Parkhäuser zu teuer für die Stadtverwaltung werden.", "en": "That parking garages will become too expensive for the city." },
          { "de": "Dass Kunden wegen fehlender Parkmöglichkeiten im Internet oder Einkaufszentrum kaufen.", "en": "That customers will shop online or at highway malls due to lack of parking." },
          { "de": "Dass die Straßenbahnen nicht pünktlich fahren.", "en": "That trams will not run on time." }
        ],
        "correct": 1,
        "keywordHint": "Signal Herr Meyer: 'kaufen sie entweder im Internet oder fahren ins große Einkaufszentrum an der Autobahn'.",
        "keywordHint_en": "Signal Herr Meyer: 'They shop either online or drive to the shopping mall on the highway'.",
        "distractorTrap": "Herr Meyer sorgt sich um Umsatzeinbrüche im Einzelhandel."
      },
      {
        "id": "s2-l4-q2",
        "question_de": "Was schlägt Frau Fischer vor, um die Anreise zu erleichtern?",
        "question_en": "What does Frau Fischer propose to ease travel into town?",
        "options": [
          { "de": "Kostenloses Benzin für alle Besucher.", "en": "Free gasoline for all visitors." },
          { "de": "Park-and-Ride-Plätze am Stadtrand und dichte Bus- und Bahntakte.", "en": "Park & Ride facilities on city outskirts with frequent bus/tram schedules." },
          { "de": "Unterirdische Autotunnel unter der Altstadt.", "en": "Underground car tunnels beneath the old town." }
        ],
        "correct": 1,
        "keywordHint": "Signal Frau Fischer: 'günstige Park-and-Ride-Parkplätze am Stadtrand und Fünf-Minuten-Takt'.",
        "keywordHint_en": "Signal Frau Fischer: 'Affordable Park & Ride lots on outskirts and 5-minute transit frequency'.",
        "distractorTrap": "Keine Tunnel erwähnt."
      }
    ]
  },

  # ==========================================
  # SET 3: Work, Health & Bureaucracy (DTZ)
  # ==========================================
  {
    "id": "set3-listen-part-1",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 1,
    "title": "Teil 1: Kurze Durchsagen (S-Bahn-Bauarbeiten, Sprachschule, Bürgeramt)",
    "title_en": "Part 1: Short Announcements (S-Bahn Bus Replacement, Exam Room Change, Citizens Office)",
    "scenarioType": "Durchsagen & Bürokratie",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "description": "Drei berufs- und alltagsrelevante Durchsagen: Schienenersatzverkehr, Prüfungsraum-Änderung und Wartenummer.",
    "description_en": "Three vocational/bureaucracy announcements: Bus replacement service, exam room change, and citizens office ticket call.",
    "passHack": "Achten Sie genau auf Ersatz-Orte und Räume: Wohin müssen die Personen gehen?",
    "audioTranscript_de": """Text 1 (S-Bahn-Durchsage):
Achtung an alle Fahrgäste der Linie S 7: Wegen dringender Gleisbauarbeiten zwischen Alexanderplatz und Warschauer Straße ist der Zugverkehr auf diesem Abschnitt bis kommenden Montag unterbrochen. Zwischen den Bahnhöfen Alexanderplatz und Ostbahnhof ist ein Schienenersatzverkehr mit Gelenkbussen eingerichtet. Die Ersatzbusse halten direkt vor dem Haupteingang an Haltestelle 4. Bitte planen Sie für Ihre Fahrt mindestens 25 Minuten mehr Reisezeit ein.

Text 2 (Telefonansage Volkshochschule Sprachprüfung):
Guten Tag, hier ist die Prüfungsabteilung der Volkshochschule Mitte. Diese Nachricht richtet sich an alle Prüfungsteilnehmer des B1-Zertifikats Deutsch am morgigen Samstag: Wegen eines Wasserschadens in der ersten Etage findet die schriftliche Prüfung nicht wie geplant in Raum 104 statt, sondern in der großen Aula im zweiten Stockwerk. Einlass und Identitätskontrolle beginnen pünktlich um 08 Uhr 15. Bitte denken Sie unbedingt an Ihren Original-Reisepass oder Personalausweis!

Text 3 (Automatenansage im Bürgeramt):
Achtung: Wartenummer B 147 bitte an Schalter 8 im Erdgeschoss. Wartenummer B 147 an Schalter 8. Ein wichtiger Hinweis für alle Bürgerinnen und Bürger, die ihren neuen Personalausweis oder Reisepass abholen möchten: Wenn Sie den PIN-Brief per Post erhalten haben, benötigen Sie keine Wartenummer. Sie können die Dokumente direkt an der Schnell-Ausgabe an Schalter 1 abholen.""",
    "audioTranscript_en": """Text 1 (S-Bahn notice):
Attention passengers of Line S 7: Track construction between Alexanderplatz and Warschauer Straße interrupts train service until Monday. Bus replacement runs between Alexanderplatz and Ostbahnhof from Stop 4. Expect 25 minutes additional travel time.

Text 2 (VHS language exam voicemail):
Hello, VHS Exam Department. Notice for tomorrow's B1 German exam participants: Due to water damage on the 1st floor, the written exam will not take place in Room 104, but in the Great Aula on the 2nd floor. ID inspection begins at 8:15 AM sharp. Bring your passport!

Text 3 (Bürgeramt automated announcement):
Attention: Waiting ticket B 147 please proceed to Counter 8 on ground floor. Important note for picking up ID cards/passports: If you received your PIN letter by mail, you do not need a ticket; collect documents directly at Counter 1.""",
    "questions": [
      {
        "id": "s3-l1-q1",
        "question_de": "Wo fahren die Ersatzbusse der S-Bahn ab?",
        "question_en": "Where do the S-Bahn replacement buses depart from?",
        "options": [
          { "de": "Am unterirdischen U-Bahnsteig.", "en": "At the underground subway platform." },
          { "de": "Vor dem Haupteingang an Haltestelle 4.", "en": "In front of the main entrance at Stop 4." },
          { "de": "An Gleis 7 im Hauptbahnhof.", "en": "At Track 7 in the main station." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'halten direkt vor dem Haupteingang an Haltestelle 4'.",
        "keywordHint_en": "Signal: 'Stop directly in front of main entrance at Stop 4'.",
        "distractorTrap": "Kein Bahnsteig, sondern Bushaltestelle."
      },
      {
        "id": "s3-l1-q2",
        "question_de": "Wo findet die B1-Deutschprüfung morgen statt?",
        "question_en": "Where will tomorrow's B1 German exam take place?",
        "options": [
          { "de": "In Raum 104 in der ersten Etage.", "en": "In Room 104 on the 1st floor." },
          { "de": "In der großen Aula im zweiten Stockwerk.", "en": "In the Great Aula on the 2nd floor." },
          { "de": "Die Prüfung fällt wegen Wasserschadens komplett aus.", "en": "The exam is completely cancelled due to water damage." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'nicht in Raum 104, sondern in der großen Aula im zweiten Stockwerk'.",
        "keywordHint_en": "Signal: 'Not in Room 104, but in the Great Aula on the 2nd floor'.",
        "distractorTrap": "Raum 104 war der alte Raum; Prüfung findet statt."
      },
      {
        "id": "s3-l1-q3",
        "question_de": "Wer benötigt keine Wartenummer im Bürgeramt?",
        "question_en": "Who does not need a waiting ticket at the Bürgeramt?",
        "options": [
          { "de": "Personen, die ihren Pass abholen und den PIN-Brief haben.", "en": "People picking up their passport who have their PIN letter." },
          { "de": "Alle Bürger, die vor 8:00 Uhr morgens da sind.", "en": "All citizens who arrive before 8:00 AM." },
          { "de": "Niemand, jeder muss eine Nummer ziehen.", "en": "Nobody; everyone must pull a ticket." }
        ],
        "correct": 0,
        "keywordHint": "Signal: 'Wenn Sie den PIN-Brief erhalten haben, benötigen Sie keine Wartenummer'.",
        "keywordHint_en": "Signal: 'If you have received the PIN letter, you do not need a waiting ticket'.",
        "distractorTrap": "Gilt speziell für Passabholung mit PIN-Brief an Schalter 1."
      }
    ]
  },
  {
    "id": "set3-listen-part-2",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 2,
    "title": "Teil 2: Sicherheitsunterweisung im Logistikzentrum",
    "title_en": "Part 2: Workplace Safety Induction at Logistics Center",
    "scenarioType": "Betriebliche Unterweisung / Sicherheitsbeauftragter",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "description": "Sicherheitsbeauftragter Herr Fischer weist neue Mitarbeiter in die Unfallverhütungsvorschriften ein.",
    "description_en": "Safety officer Herr Fischer instructs new hires on accident prevention regulations in the warehouse.",
    "passHack": "Im Berufs-Hörverstehen werden oft Sicherheitsvorschriften abgefragt: Was MUSS getragen werden? Wer hat Vorfahrt?",
    "audioTranscript_de": """Guten Morgen zusammen! Willkommen an Ihrem ersten Arbeitstag bei der NordLogistik GmbH. Mein Name ist Uwe Fischer und ich bin hier für den Arbeitsschutz und die Sicherheit auf dem Betriebsgelände zuständig. 

Bevor Sie gleich Ihren Arbeitsplatz im Hochregallager einnehmen, führe ich Sie durch unsere Sicherheitsregeln. Unser oberstes Gebot lautet: Null Unfälle! In unseren Lagerhallen herrscht reger Gabelstaplerverkehr. Deshalb gilt ab dem Moment, in dem Sie die Hallentür durchschreiten: Absolute Warnwestenpflicht! Wer ohne die leuchtend gelbe Warnweste und ohne Sicherheitsschuhe mit Stahlkappen angetroffen wird, wird sofort von der Schicht abgemeldet.

Zweitens: Auf den Fahrwegen haben Gabelstapler immer Vorrang vor Fußgängern. Benutzen Sie bitte ausschließlich die gelb markierten Fußgängerwege am Rand der Gänge und tragen Sie niemals Kopfhörer beim Gehen, damit Sie Hup- und Warnsignale jederzeit wahrnehmen können. 

Drittens: Rauchen und offenes Feuer sind auf dem gesamten Gelände strengstens verboten, mit einer einzigen Ausnahme: der Raucherpavillon hinter Halle 3 neben dem Pausenraum. Bei Feueralarm ertönt eine durchgehende Sirene. In diesem Fall verlassen Sie die Halle ruhig über die grün beleuchteten Notausgänge zum Sammelplatz auf dem Parkplatz Ost. Haben Sie dazu Fragen?""",
    "audioTranscript_en": """Good morning! Welcome to your first day at NordLogistik. My name is Uwe Fischer, safety manager.

Before you start in the high-rack warehouse, safety rules: First rule: Zero accidents! Heavy forklift traffic. As soon as you enter: Mandatory high-visibility yellow vest and steel-toe safety shoes. Anyone caught without them is sent home.

Second: Forklifts always have right of way over pedestrians. Walk only on yellow-marked walking zones; never wear headphones so you can hear horn signals.

Third: Smoking strictly forbidden except in the pavilion behind Hall 3. Fire alarm is a continuous siren: exit calmly via green emergency doors to Assembly Point East.""",
    "questions": [
      {
        "id": "s3-l2-q1",
        "question_de": "Welche Schutzkleidung ist in der Halle ausnahmslos vorgeschrieben?",
        "question_en": "Which protective clothing is mandatory without exception in the hall?",
        "options": [
          { "de": "Ein Schutzhelm und eine Schutzbrille.", "en": "A hard hat and protective goggles." },
          { "de": "Eine gelbe Warnweste und Sicherheitsschuhe mit Stahlkappen.", "en": "A yellow safety vest and safety shoes with steel toes." },
          { "de": "Schwere Lederhandschuhe für alle Mitarbeiter.", "en": "Heavy leather gloves for all staff." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Absolute Warnwestenpflicht... leuchtend gelbe Warnweste und Sicherheitsschuhe mit Stahlkappen'.",
        "keywordHint_en": "Signal: 'Absolute safety vest obligation... bright yellow vest and safety shoes with steel caps'.",
        "distractorTrap": "Helm und Handschuhe werden hier nicht als Grundausstattung verlangt."
      },
      {
        "id": "s3-l2-q2",
        "question_de": "Wer hat auf den Fahrwegen im Lager Vorfahrt?",
        "question_en": "Who has the right-of-way on driving paths in the warehouse?",
        "options": [
          { "de": "Fußgänger auf dem Weg zur Pause.", "en": "Pedestrians on their way to break." },
          { "de": "Gabelstapler haben immer Vorrang vor Fußgängern.", "en": "Forklifts always have right-of-way over pedestrians." },
          { "de": "Immer das Fahrzeug, das von rechts kommt.", "en": "Always the vehicle coming from the right." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Auf den Fahrwegen haben Gabelstapler immer Vorrang vor Fußgängern'.",
        "keywordHint_en": "Signal: 'On driving paths, forklifts always have priority over pedestrians'.",
        "distractorTrap": "Fußgänger müssen die markierten Wege nutzen."
      }
    ]
  },
  {
    "id": "set3-listen-part-3",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 3,
    "title": "Teil 3: Büro-Gespräch (Schichttausch im Krankenhaus)",
    "title_en": "Part 3: Office Dialogue (Hospital Shift Swap Negotiation)",
    "scenarioType": "Zwiegespräch im Beruf",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "description": "Carlos und Melanie besprechen einen Diensttausch für das kommende Wochenende im Klinikum.",
    "description_en": "Carlos and Melanie discuss swapping shifts for the upcoming weekend at the hospital.",
    "passHack": "Achten Sie genau auf Daten und Begründungen: Wer bittet um den Gefallen und was wird als Gegenleistung angeboten?",
    "audioTranscript_de": """Melanie: Hallo Carlos! Hast du kurz Zeit? Ich brauche dringend deine Hilfe bei der Dienstplanung für das nächste Wochenende.

Carlos: Hi Melanie, klar. Was gibt's denn? Eigentlich habe ich Samstag und Sonntag Frühdienst von 6:00 bis 14:30 Uhr auf Station 4.

Melanie: Genau darum geht es: Meine Schwester heiratet am Samstag in Hamburg. Ich habe vor drei Monaten Urlaub beantragt, aber weil Kollegin Tanja krank geworden ist, hat die Stationsleitung mich für den Samstagabend-Spätdienst eingeteilt. Wenn ich den Dienst machen muss, verpasse ich die Hochzeit komplett!

Carlos: Oh, das wäre schrecklich, eine Hochzeit verpasst man nicht. Kannst du denn dafür eine meiner Schichten in zwei Wochen übernehmen? Da hat nämlich meine Tochter Geburtstag und ich wollte mit ihr in den Freizeitpark.

Melanie: Na klar, sehr gerne! Welcher Tag wäre das?

Carlos: Samstag, der 26. Oktober. Wenn du da meinen Frühdienst übernimmst, mache ich kommenden Samstag deinen Spätdienst. Dann kannst du ganz entspannt nach Hamburg fahren.

Melanie: Carlos, tausend Dank! Ich gehe sofort ins Dienstzimmer und trage den Tausch in den Dienstplan ein, damit Schwester Sabine Bescheid weiß.""",
    "audioTranscript_en": """Melanie: Hello Carlos! I urgently need your help with next weekend's schedule.

Carlos: Hi Melanie. I have morning shift Saturday and Sunday 6:00 AM to 2:30 PM on Ward 4.

Melanie: Exactly: My sister is getting married in Hamburg on Saturday. I was scheduled for Saturday evening shift because Tanja fell ill. If I work, I miss the wedding!

Carlos: That is awful. Could you take one of my shifts in two weeks in return? My daughter's birthday is then.

Melanie: Gladly! Which day?

Carlos: Saturday, October 26th. If you take my morning shift, I work your late shift this Saturday.

Melanie: Thousands of thanks! I will record the swap on the duty roster immediately.""",
    "questions": [
      {
        "id": "s3-l3-q1",
        "question_de": "Warum möchte Melanie ihre Schicht am Samstag tauschen?",
        "question_en": "Why does Melanie want to swap her Saturday shift?",
        "options": [
          { "de": "Sie möchte ihre kranke Kollegin Tanja im Krankenhaus besuchen.", "en": "She wants to visit her sick colleague Tanja in the hospital." },
          { "de": "Ihre Schwester heiratet in Hamburg.", "en": "Her sister is getting married in Hamburg." },
          { "de": "Sie hat Geburtstag und feiert eine Party.", "en": "She has a birthday and is having a party." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Meine Schwester heiratet am Samstag in Hamburg'.",
        "keywordHint_en": "Signal: 'My sister is getting married on Saturday in Hamburg'.",
        "distractorTrap": "Tanja ist krank, aber Melanie fährt zur Hochzeit der Schwester."
      },
      {
        "id": "s3-l3-q2",
        "question_de": "Welche Gegenleistung vereinbaren die beiden?",
        "question_en": "What exchange do the two agree upon?",
        "options": [
          { "de": "Carlos bekommt 100 Euro von Melanie.", "en": "Carlos receives 100 euros from Melanie." },
          { "de": "Melanie übernimmt am 26. Oktober Carlos' Frühdienst.", "en": "Melanie takes over Carlos' morning shift on October 26th." },
          { "de": "Melanie muss die nächsten drei Wochenenden durcharbeiten.", "en": "Melanie must work through the next three weekends." }
        ],
        "correct": 1,
        "keywordHint": "Signal: 'Wenn du am 26. Oktober meinen Frühdienst übernimmst, mache ich deinen Spätdienst'.",
        "keywordHint_en": "Signal: 'If you take my morning shift on Oct 26th, I will do your late shift'.",
        "distractorTrap": "Kein Geld im Spiel, sondern Schichttausch wegen Geburtstag der Tochter."
      }
    ]
  },
  {
    "id": "set3-listen-part-4",
    "setNumber": 3,
    "setName": "Set 3: Work, Healthcare & Bureaucracy (DTZ)",
    "partNumber": 4,
    "title": "Teil 4: Radio-Diskussion (Anerkennung ausländischer Berufsabschlüsse)",
    "title_en": "Part 4: Radio Discussion (Foreign Credential Recognition)",
    "scenarioType": "Radiogespräch mit zwei Gästen",
    "examSource": "DTZ B1 / TELC B1 Beruf",
    "description": "Ein Radiomoderator spricht mit Herrn Al-Mansoor (Ingenieur aus Syrien) und Frau Dr. Hartmann (Industrie- und Handelskammer) über Bürokratie und Fachkräfteeinwanderung.",
    "description_en": "A radio moderator talks with Herr Al-Mansoor (engineer from Syria) and Dr. Hartmann (Chamber of Commerce) regarding bureaucratic recognition of foreign diplomas.",
    "passHack": "Achten Sie darauf, WER WELCHE Verbesserung vorschlägt (schnellere Anerkennung, digitale Anträge, Fachsprachkurse).",
    "audioTranscript_de": """Moderator: Herzlich willkommen zu unserer Sendung 'Perspektive Beruf'. Deutschland sucht händeringend Fachkräfte - doch viele Zuwanderer mit akademischen Abschlüssen arbeiten weit unter ihrer Qualifikation. Bei mir sind Dr. Eva Hartmann von der Industrie- und Handelskammer und Tariq Al-Mansoor, der als Maschinenbauingenieur aus Syrien nach Deutschland kam. Herr Al-Mansoor, wie sah Ihr Weg in den deutschen Arbeitsmarkt aus?

Herr Al-Mansoor: Leider war es ein jahrelanger bürokratischer Marathon. In Damaskus habe ich fünf Jahre Maschinenbau studiert und sieben Jahre als Projektingenieur gearbeitet. Als ich nach Deutschland kam, dauerte das Anerkennungsverfahren fast zwei Jahre! Ich musste unzählige beglaubigte Übersetzungen einreichen. In dieser Zeit durfte ich nicht als Ingenieur arbeiten und habe als Lagerhelfer gearbeitet, um meine Familie zu ernähren. Das war frustrierend, weil meine Kenntnisse eigentlich dringend gebraucht wurden.

Moderator: Frau Dr. Hartmann, zwei Jahre Wartezeit - das ist doch ein Armutszeugnis für den Wirtschaftsstandort Deutschland?

Frau Dr. Hartmann: Da gebe ich Herrn Al-Mansoor völlig recht, das ist absolut unbefriedigend. Die Anerkennungsstellen bei den Bundesländern waren in der Vergangenheit personell völlig überlastet. Doch es tut sich einiges: Seit diesem Jahr gibt es die 'Fast-Track'-Verfahren für Mangelberufe. Anträge können nun komplett digital eingereicht werden und die Bearbeitungszeit wurde gesetzlich auf maximal drei Monate begrenzt. Zudem bieten wir gemeinsam mit den Arbeitsagenturen berufsbegleitende Anpassungsqualifizierungen an, damit Fachkräfte sofort im Betrieb anfangen und Sprachlücken parallel schließen können.""",
    "audioTranscript_en": """Moderator: Welcome to 'Vocational Perspectives'. Germany desperately seeks skilled workers, yet many immigrants work below their qualifications. Guests: Dr. Eva Hartmann (Chamber of Commerce) and Tariq Al-Mansoor (mechanical engineer from Syria). Herr Al-Mansoor, what was your experience?

Herr Al-Mansoor: Unfortunately a bureaucratic marathon lasting nearly two years! I studied engineering for five years and worked for seven. I had to submit countless certified translations and worked in a warehouse in the meantime to feed my family.

Moderator: Dr. Hartmann, two years of waiting is unsatisfactory for Germany as a business hub?

Dr. Hartmann: Completely agree, totally unsatisfactory. Authorities were understaffed. But improvements are underway: 'Fast-Track' procedures for bottleneck professions, 100% digital applications, statutory maximum processing time reduced to three months, and on-the-job adaptation courses.""",
    "questions": [
      {
        "id": "s3-l4-q1",
        "question_de": "Wie lange dauerte das Anerkennungsverfahren von Herrn Al-Mansoor?",
        "question_en": "How long did Herr Al-Mansoor's credential recognition process take?",
        "options": [
          { "de": "Nur drei Monate über das Internet.", "en": "Only three months over the internet." },
          { "de": "Fast zwei Jahre.", "en": "Nearly two years." },
          { "de": "Sein Abschluss wurde überhaupt nicht anerkannt.", "en": "His degree was not recognized at all." }
        ],
        "correct": 1,
        "keywordHint": "Signal Herr Al-Mansoor: 'dauerte das Anerkennungsverfahren fast zwei Jahre!'.",
        "keywordHint_en": "Signal Herr Al-Mansoor: 'Credential recognition lasted nearly two years!'.",
        "distractorTrap": "Drei Monate ist das neue Zielgesetz, galt damals aber noch nicht."
      },
      {
        "id": "s3-l4-q2",
        "question_de": "Welche Verbesserung nennt Frau Dr. Hartmann für neue Anträge?",
        "question_en": "What improvement does Dr. Hartmann mention for new applications?",
        "options": [
          { "de": "Anträge können jetzt voll digital gestellt werden mit maximal drei Monaten Bearbeitungszeit.", "en": "Applications can now be submitted fully digitally with max 3 months processing time." },
          { "de": "Ausländische Abschlüsse werden gar nicht mehr geprüft.", "en": "Foreign credentials are no longer verified at all." },
          { "de": "Alle Übersetzungen sind ab sofort kostenlos beim Amt erhältlich.", "en": "All translations are available for free at the agency." }
        ],
        "correct": 0,
        "keywordHint": "Signal Frau Dr. Hartmann: 'Anträge komplett digital... Bearbeitungszeit gesetzlich auf maximal drei Monate begrenzt'.",
        "keywordHint_en": "Signal Dr. Hartmann: 'Applications completely digital... processing time limited to max 3 months'.",
        "distractorTrap": "Abschlüsse werden weiterhin geprüft, aber viel schneller."
      }
    ]
  }
]

# Write to src/data/b1_listening_data.ts
content = "// Generated comprehensive B1 Listening Data with 3 Complete Exam Sets (12 Parts)\n"
content += "import { ListeningExamPart } from '@/types';\n\n"
content += "export const B1_LISTENING_PARTS: ListeningExamPart[] = " + json.dumps(listening_parts, indent=2, ensure_ascii=False) + ";\n"

if "\u2014" in content:
    content = content.replace("\u2014", " - ")

with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_listening_data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully wrote {len(listening_parts)} listening parts to src/data/b1_listening_data.ts")
