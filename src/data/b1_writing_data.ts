import { WritingTemplate } from "@/types";

export const B1_WRITING_TEMPLATES: WritingTemplate[] = [
  {
    id: "apology-course-absence",
    title: "Entschuldigung für Abwesenheit (Sprachkurs / Arbeit)",
    examType: "TELC B1 / DTZ / Goethe B1",
    level: "B1 Minimum Passing Standard",
    scenario: "Sie können in den nächsten drei Tagen nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Kursleiterin, Frau Müller.",
    scenario_en: "You cannot attend the German course for the next three days. Write an email to your instructor, Ms. Müller.",
    bulletPoints: [
      "Grund für Ihr Fehlen (Krankheit / Arzttermin)",
      "Dauer der Abwesenheit (Drei Tage)",
      "Hausaufgaben und Unterrichtsmaterialien anfordern",
      "Wann Sie wieder in den Unterricht zurückkehren"
    ],
    bulletPoints_en: [
      "Reason for your absence (illness / doctor appointment)",
      "Duration of absence (three days)",
      "Request homework and lesson materials",
      "When you will return to class"
    ],
    sampleSolution: `Sehr geehrte Frau Müller,

ich schreibe Ihnen diese E-Mail, weil ich leider in den nächsten drei Tagen nicht am Deutschkurs teilnehmen kann. 

Gestern Abend bin ich plötzlich krank geworden und habe hohes Fieber bekommen. Der Arzt hat mich bis Freitag krankgeschrieben. Das ärztliche Attest habe ich dieser E-Mail im Anhang beigefügt.

Könnten Sie mir bitte mitteilen, welche Hausaufgaben wir aufhaben? Es wäre sehr nett, wenn Sie mir die Arbeitsblätter per E-Mail zusenden könnten, damit ich den verpassten Stoff zu Hause nachholen kann.

Am kommenden Montag werde ich voraussichtlich wieder gesund sein und am Unterricht teilnehmen.

Vielen Dank im Voraus für Ihr Verständnis und Ihre Unterstützung.

Mit freundlichen Grüßen
[Ihr Name]`,
    sampleSolution_en: `Dear Ms. Müller,

I am writing you this email because unfortunately I cannot attend the German course for the next three days.

Yesterday evening I suddenly fell ill and developed a high fever. The doctor has put me on sick leave until Friday. I have attached the medical certificate to this email.

Could you please let me know what homework we have? It would be very kind if you could email me the worksheets so that I can catch up on the missed material at home.

Next Monday I expect to be healthy again and participate in class.

Thank you in advance for your understanding and support.

Sincerely,
[Your Name]`,
    fillInTheBlankTemplate: `Sehr geehrte Frau Müller,

ich schreibe Ihnen, [BLANK_1] ich in den nächsten drei Tagen leider nicht am Kurs teilnehmen kann.

Gestern bin ich plötzlich krank geworden und habe hohes Fieber. Der Arzt hat mich bis Freitag [BLANK_2]. 

Könnten Sie mir bitte die [BLANK_3] per E-Mail schicken, damit ich zu Hause lernen kann?

Am nächsten Montag [BLANK_4] ich wieder zum Unterricht kommen.

Vielen Dank für Ihr [BLANK_5].

Mit freundlichen Grüßen
[Ihr Name]`,
    blankAnswers: [
      "weil",
      "krankgeschrieben",
      "Hausaufgaben",
      "werde",
      "Verständnis"
    ],
    distractors: [
      "obwohl",
      "gearbeitet",
      "kann"
    ],
    keyVocab: [
      { de: "Sehr geehrte Frau...", en: "Dear Ms. (formal salutation)" },
      { de: "ich schreibe Ihnen, weil...", en: "I am writing to you because... (triggers verb to the end)" },
      { de: "krankgeschrieben sein", en: "to be on sick leave / doctor's note" },
      { de: "Könnten Sie mir bitte...?", en: "Could you please...? (polite Konjunktiv II)" },
      { de: "damit ich... kann", en: "so that I can..." },
      { de: "Vielen Dank für Ihr Verständnis", en: "Thank you for your understanding" },
      { de: "Mit freundlichen Grüßen", en: "Sincerely / With kind regards" }
    ]
  },
  {
    id: "complaint-broken-heating",
    title: "Beschwerde & Reparatur (Defekte Heizung im Winter)",
    examType: "DTZ / TELC B1 / Goethe B1",
    level: "B1 Minimum Passing Standard",
    scenario: "In Ihrer Mietwohnung funktioniert seit zwei Tagen die Heizung nicht mehr. Es ist sehr kalt. Schreiben Sie Ihrem Vermieter, Herrn Schneider.",
    scenario_en: "The heating in your rented apartment has not been working for two days. It is very cold. Write to your landlord, Mr. Schneider.",
    bulletPoints: [
      "Das genaue Problem beschreiben (Heizung kalt)",
      "Seit wann das Problem besteht und wie kalt es ist",
      "Frist für die Reparatur setzen",
      "Konsequenzen bei Nichtbeachtung (Mietminderung)"
    ],
    bulletPoints_en: [
      "Describe exact problem (cold radiators)",
      "How long the problem has existed and room temperature",
      "Set a deadline for the technician / repair",
      "Consequences if ignored (rent reduction warning)"
    ],
    sampleSolution: `Sehr geehrter Herr Schneider,

ich wende mich heute an Sie, weil in meiner Wohnung die Heizung seit zwei Tagen komplett ausgefallen ist.

Obwohl ich die Heizkörper voll aufgedreht habe, bleiben alle Räume eiskalt. Da die Außentemperatur aktuell unter null Grad liegt, beträgt die Zimmertemperatur nur noch 14 Grad. Diese Situation ist unerträglich, besonders weil ich mich leicht erkälten kann.

Ich bitte Sie daher dringend, schnellstmöglich einen Handwerker mit der Reparatur zu beauftragen. Bitte beheben Sie den Schaden bis spätestens Freitag, den 5. November.

Sollte bis zu diesem Termin keine Reparatur erfolgen, sehe ich mich gezwungen, die monatliche Miete entsprechend zu kürzen.

Ich danke Ihnen für eine rasche Rückmeldung.

Mit freundlichen Grüßen
[Ihr Name]`,
    sampleSolution_en: `Dear Mr. Schneider,

I am reaching out to you today because the heating in my apartment has completely stopped working for two days.

Although I turned the radiators up completely, all rooms remain freezing cold. Since the outside temperature is currently below zero, the room temperature is only 14 degrees. This situation is intolerable, especially because I catch colds easily.

I therefore urgently request that you hire a technician for the repair as soon as possible. Please resolve the defect by Friday, November 5th at the latest.

If no repair takes place by this date, I will be forced to reduce the monthly rent accordingly.

Thank you for a prompt reply.

Sincerely,
[Your Name]`,
    fillInTheBlankTemplate: `Sehr geehrter Herr Schneider,

ich schreibe Ihnen, weil die Heizung in meiner Wohnung seit zwei Tagen [BLANK_1] ist.

[BLANK_2] es draußen sehr kalt ist, werden die Heizkörper nicht warm. In der Wohnung sind es nur noch 14 Grad.

Ich bitte Sie [BLANK_3], so schnell wie möglich einen Handwerker zu schicken.

Bitte reparieren Sie den Schaden bis [BLANK_4] Freitag.

Ich freue mich auf Ihre [BLANK_5].

Mit freundlichen Grüßen
[Ihr Name]`,
    blankAnswers: [
      "kaputt",
      "Weil",
      "dringend",
      "spätestens",
      "Antwort"
    ],
    distractors: [
      "repariert",
      "deshalb",
      "Geld"
    ],
    keyVocab: [
      { de: "die Heizung ist ausgefallen", en: "the heating broke down" },
      { de: "Obwohl...", en: "Although... (subordinate clause connector)" },
      { de: "Ich bitte Sie dringend", en: "I urgently ask you" },
      { de: "bis spätestens [Datum]", en: "by [Date] at the latest" },
      { de: "einen Handwerker beauftragen", en: "to commission a technician/craftsman" },
      { de: "Ich freue mich auf Ihre Antwort", en: "I look forward to your reply" }
    ]
  },
  {
    id: "appointment-reschedule",
    title: "Terminverschiebung bei einer Behörde / Arzt",
    examType: "TELC B1 / Goethe B1",
    level: "B1 Minimum Passing Standard",
    scenario: "Sie haben einen wichtigen Termin beim Bürgeramt oder beim Arzt, können diesen aber aus beruflichen Gründen nicht wahrnehmen. Bitten Sie um einen neuen Termin.",
    scenario_en: "You have an important appointment at the citizen center or doctor, but cannot attend due to work. Ask for a rescheduled date.",
    bulletPoints: [
      "Angabe des aktuellen Termins (Datum und Uhrzeit)",
      "Grund für die Absage (wichtige Besprechung / Schichtarbeit)",
      "Vorschlag für zwei neue Termine",
      "Bitte um schriftliche Bestätigung"
    ],
    bulletPoints_en: [
      "Mention existing appointment (date and time)",
      "Reason for cancellation (urgent meeting / work shift)",
      "Two alternative date suggestions",
      "Request written confirmation"
    ],
    sampleSolution: `Sehr geehrte Damen und Herren,

ich habe am kommenden Donnerstag, den 12. Oktober, um 10:00 Uhr einen Termin bei Ihnen.

Leider muss ich diesen Termin kurzfristig absagen, da ich an diesem Tag an einer dringenden geschäftlichen Besprechung teilnehmen muss. Es tut mir sehr leid für die Unannehmlichkeiten.

Wäre es möglich, den Termin auf nächste Woche zu verschieben? Mir würde es am Dienstag ab 14:00 Uhr oder am Mittwochvormittag um 10:30 Uhr sehr gut passen.

Bitte teilen Sie mir zeitnah mit, ob einer dieser Termine für Sie infrage kommt.

Ich danke Ihnen herzlich für Ihre Flexibilität und Ihr Verständnis.

Mit freundlichen Grüßen
[Ihr Name]`,
    sampleSolution_en: `Dear Sir or Madam,

I have an appointment with you next Thursday, October 12th, at 10:00 AM.

Unfortunately, I must cancel this appointment on short notice because I have to attend an urgent business meeting that day. I am very sorry for any inconvenience caused.

Would it be possible to postpone the appointment to next week? Tuesday after 2:00 PM or Wednesday morning at 10:30 AM would suit me very well.

Please let me know soon whether one of these dates works for you.

Thank you very much for your flexibility and understanding.

Sincerely,
[Your Name]`,
    fillInTheBlankTemplate: `Sehr geehrte Damen und Herren,

ich habe am Donnerstag um 10:00 Uhr einen Termin bei Ihnen.

Leider kann ich nicht kommen, [BLANK_1] ich arbeiten muss. Es tut mir sehr [BLANK_2].

Können wir den Termin bitte [BLANK_3]? Nächste Woche Dienstag um 14:00 Uhr [BLANK_4] mir gut.

Bitte [BLANK_5] Sie mir den neuen Termin per E-Mail.

Mit freundlichen Grüßen
[Ihr Name]`,
    blankAnswers: [
      "weil",
      "leid",
      "verschieben",
      "passt",
      "bestätigen"
    ],
    distractors: [
      "obwohl",
      "Termin",
      "brauchen"
    ],
    keyVocab: [
      { de: "Sehr geehrte Damen und Herren", en: "Dear Sir/Madam (general formal salutation)" },
      { de: "den Termin absagen", en: "to cancel the appointment" },
      { de: "den Termin verschieben", en: "to postpone / reschedule the appointment" },
      { de: "Es tut mir leid", en: "I am sorry" },
      { de: "Das passt mir gut", en: "That suits me well" },
      { de: "Bitte bestätigen Sie...", en: "Please confirm..." }
    ]
  },
  {
    id: "invitation-rsvp-informal",
    title: "Einladung zur Feier (Zusage & Geschenkplanung)",
    examType: "Goethe B1 / TELC B1",
    level: "B1 Minimum Passing Standard",
    scenario: "Ihr Freund Markus hat Sie zu seiner Einweihungsparty am Samstag eingeladen. Schreiben Sie ihm eine Antwort.",
    scenario_en: "Your friend Markus invited you to his housewarming party on Saturday. Write him a reply.",
    bulletPoints: [
      "Dank für die Einladung und Zusage",
      "Frage nach dem Geschenk / Was er braucht",
      "Angebot, Essen oder Getränke mitzubringen",
      "Frage nach der Wegbeschreibung"
    ],
    bulletPoints_en: [
      "Thank for invitation and accept",
      "Ask about gifts / what he needs for new apartment",
      "Offer to bring food or drinks",
      "Ask for directions / public transport"
    ],
    sampleSolution: `Lieber Markus,

vielen Dank für deine Einladung zu deiner Einweihungsparty! Ich habe mich riesig darüber gefreut.

Ich komme natürlich sehr gerne am Samstag zu dir. Herzlichen Glückwunsch noch einmal zu deiner neuen Wohnung!

Sag mal, was wünschst du dir denn für dein neues Zuhause? Brauchst du noch etwas Bestimmtes für die Küche oder das Wohnzimmer? Außerdem würde ich gerne einen leckeren Salat oder einen Kuchen mitbringen. Was soll ich am besten einpacken?

Könntest du mir bitte noch kurz schreiben, welche U-Bahn oder welcher Bus am nächsten an deiner neuen Wohnung hält?

Ich freue mich schon sehr auf das Wiedersehen und auf die Feier!

Liebe Grüße
[Dein Name]`,
    sampleSolution_en: `Dear Markus,

Thank you so much for the invitation to your housewarming party! I was thrilled to get it.

Of course I would love to come on Saturday. Congratulations once again on your new apartment!

Tell me, what would you like for your new place? Do you need anything specific for the kitchen or living room? Also, I would gladly bring a tasty salad or cake. What should I pack best?

Could you please also briefly message me which subway or bus stops closest to your new apartment?

I am really looking forward to seeing you and celebrating!

Best regards,
[Your Name]`,
    fillInTheBlankTemplate: `Lieber Markus,

vielen Dank [BLANK_1] die Einladung! Ich habe mich sehr gefreut.

Ich komme am Samstag sehr [BLANK_2] zu deiner Party.

Brauchst du noch ein [BLANK_3] für deine neue Wohnung? Ich kann auch gerne einen Salat [BLANK_4].

Schreib mir bitte, wie ich am besten zu dir [BLANK_5].

Liebe Grüße
[Dein Name]`,
    blankAnswers: [
      "für",
      "gerne",
      "Geschenk",
      "mitbringen",
      "komme"
    ],
    distractors: [
      "zu",
      "kaufen",
      "Party"
    ],
    keyVocab: [
      { de: "Lieber... / Liebe...", en: "Dear... (informal salutation)" },
      { de: "Ich habe mich sehr gefreut", en: "I was very pleased" },
      { de: "Ich komme sehr gerne", en: "I would gladly come" },
      { de: "etwas mitbringen", en: "to bring something along" },
      { de: "Ich freue mich auf...", en: "I look forward to..." },
      { de: "Liebe Grüße / Herzliche Grüße", en: "Warm regards (informal closing)" }
    ]
  }
,
  {
  "id": "noise-complaint-landlord",
  "title": "Mängelanzeige: Lärmbelästigung im Mietshaus",
  "examType": "TELC B1 / Goethe B1 Brief",
  "level": "B1 Formal Complaint",
  "scenario": "Ihre Nachbarn im 3. Stock feiern seit zwei Wochen fast jede Nacht laute Partys. Sie haben bereits persönlich mit ihnen gesprochen, aber es hat sich nichts geändert. Schreiben Sie einen formellen Beschwerdebrief an Ihren Vermieter Herrn Schneider.",
  "scenario_en": "Your neighbors on the 3rd floor have been throwing loud parties almost every night for two weeks. You already spoke to them in person, but nothing changed. Write a formal complaint letter to your landlord Mr. Schneider.",
  "bulletPoints": [
    "Grund für das Schreiben (nächtliche Ruhestörung durch Nachbarn)",
    "Was Sie bisher unternommen haben (persönliches Gespräch ohne Erfolg)",
    "Auswirkungen auf Ihre Gesundheit und Arbeit (Schlafmangel)",
    "Aufforderung an den Vermieter, das Problem zeitnah zu lösen"
  ],
  "bulletPoints_en": [
    "Reason for writing (nightly noise disturbance by neighbors)",
    "What you have done so far (personal conversation without success)",
    "Impact on health and work (lack of sleep)",
    "Request for the landlord to resolve the issue promptly"
  ],
  "sampleSolution": "Sehr geehrter Herr Schneider,\n\nich wende mich an Sie, um mich über eine erhebliche Lärmbelästigung in unserem Haus zu beschweren.\n\nSeit zwei Wochen spielen die Nachbarn aus dem dritten Stock fast jede Nacht laute Musik und feiern bis spät in die Nacht. Obwohl ich bereits zweimal persönlich das Gespräch gesucht habe, hat sich die Situation leider überhaupt nicht gebessert.\n\nWegen des ständigen Lärms leide ich unter erheblichem Schlafmangel, weshalb ich mich bei meiner Arbeit tagsüber kaum noch konzentrieren kann.\n\nIch möchte Sie daher dringend bitten, die betreffenden Mieter schriftlich abzumahnen und für die Einhaltung der gesetzlichen Ruhezeiten zu sorgen.\n\nVielen Dank im Voraus für Ihre Unterstützung.\n\nMit freundlichen Grüßen\n[Ihr Vorname Nachname]",
  "sampleSolution_en": "Dear Mr. Schneider,\n\nI am contacting you to complain about considerable noise disturbance in our building.\n\nFor two weeks, the neighbors on the third floor have been playing loud music almost every night and partying until late. Although I have sought a personal conversation twice, the situation has unfortunately not improved at all.\n\nDue to the constant noise, I suffer from significant lack of sleep, which is why I can barely concentrate at work during the day.\n\nI would therefore like to urgently ask you to issue a written warning to the tenants in question and ensure compliance with statutory quiet hours.\n\nThank you in advance for your support.\n\nSincerely,\n[Your Name]",
  "fillInTheBlankTemplate": "Sehr geehrter Herr Schneider,\n\nich wende mich an Sie, [BLANK_1] mich über eine erhebliche Ruhestörung zu beschweren.\n\n[BLANK_2] ich bereits persönlich mit den Nachbarn gesprochen habe, feiern sie jede Nacht laute Partys.\n\nWegen des Lärms kann ich nachts nicht schlafen, [BLANK_3] bin ich tagsüber bei der Arbeit sehr müde.\n\nKönnten Sie bitte [BLANK_4], damit im Haus wieder Ruhe herrscht?\n\nIch danke Ihnen im [BLANK_5] für Ihre Hilfe.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  "blankAnswers": [
    "um",
    "Obwohl",
    "deshalb",
    "eingreifen",
    "Voraus"
  ],
  "distractors": [
    "damit",
    "Weil",
    "sprechen"
  ],
  "keyVocab": [
    {
      "de": "sich beschweren über...",
      "en": "to complain about..."
    },
    {
      "de": "die Ruhestörung / Lärmbelästigung",
      "en": "noise disturbance"
    },
    {
      "de": "das Gespräch suchen",
      "en": "to seek a conversation"
    },
    {
      "de": "abmahnen",
      "en": "to issue a warning"
    },
    {
      "de": "die gesetzliche Nachtruhe",
      "en": "statutory nighttime quiet hours"
    }
  ]
},
  {
  "id": "damaged-order-complaint",
  "title": "Reklamation: Beschädigte Ware aus Online-Shop",
  "examType": "Goethe B1 / TELC B1 Brief",
  "level": "B1 Formal Complaint",
  "scenario": "Sie haben vor drei Tagen einen Staubsauger im Online-Shop 'MediaWelt' bestellt. Heute kam das Paket an, aber das Gerät ist beschädigt und funktioniert nicht. Schreiben Sie eine Reklamations-E-Mail an den Kundenservice.",
  "scenario_en": "Three days ago you ordered a vacuum cleaner at online shop 'MediaWelt'. Today the package arrived, but the appliance is damaged and does not work. Write a formal complaint email to customer service.",
  "bulletPoints": [
    "Bestellnummer und Artikel nennen",
    "Den Schaden genau beschreiben",
    "Kaufbeleg und Foto als Anhang erwähnen",
    "Kostenlose Ersatzlieferung oder Rückerstattung fordern"
  ],
  "bulletPoints_en": [
    "State order number and item name",
    "Describe the damage precisely",
    "Mention receipt and photo attached",
    "Request free replacement or refund"
  ],
  "sampleSolution": "Sehr geehrte Damen und Herren,\n\nvor drei Tagen habe ich in Ihrem Online-Shop einen Staubsauger (Bestellnummer #48920) bestellt. Das Paket wurde heute geliefert, allerdings ist das Gerät stark beschädigt.\n\nDas Gehäuse weist einen großen Riss auf und der Motor startet überhaupt nicht, wenn man das Gerät an die Steckdose anschließt. \n\nIm Anhang finden Sie die Rechnung sowie zwei Fotos, die den Schaden deutlich zeigen.\n\nDa ich das Gerät dringend benötige, bitte ich Sie um eine umgehende, kostenlose Ersatzlieferung. Falls der Artikel nicht mehr vorrätig sein sollte, erstatten Sie mir bitte den vollen Kaufbetrag auf mein Konto.\n\nIch freue mich auf Ihre schnelle Rückmeldung.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  "sampleSolution_en": "Dear Sir or Madam,\n\nThree days ago I ordered a vacuum cleaner (Order #48920) in your online shop. The package was delivered today; however, the appliance is heavily damaged.\n\nThe casing has a large crack and the motor does not start at all when plugged into the socket.\n\nAttached you will find the invoice as well as two photos clearly demonstrating the damage.\n\nAs I need the appliance urgently, I request an immediate, free replacement delivery. If the item is out of stock, please refund the full purchase amount to my account.\n\nI look forward to your prompt reply.\n\nSincerely,\n[Your Name]",
  "fillInTheBlankTemplate": "Sehr geehrte Damen und Herren,\n\nich schreibe Ihnen bezüglich meiner [BLANK_1] mit der Nummer #48920.\n\nDas gelieferte Gerät ist leider [BLANK_2] und lässt sich nicht einschalten.\n\nIm [BLANK_3] sende ich Ihnen die Rechnung und Fotos vom Schaden.\n\nIch möchte Sie bitten, mir ein neues Gerät als [BLANK_4] zuzusenden.\n\nVielen Dank im [BLANK_5] für die schnelle Bearbeitung.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  "blankAnswers": [
    "Bestellung",
    "defekt",
    "Anhang",
    "Ersatz",
    "Voraus"
  ],
  "distractors": [
    "Rechnung",
    "neu",
    "kaufen"
  ],
  "keyVocab": [
    {
      "de": "die Reklamation / reklamieren",
      "en": "complaint / to complain"
    },
    {
      "de": "das Gerät ist beschädigt / defekt",
      "en": "the device is damaged / broken"
    },
    {
      "de": "im Anhang finden Sie...",
      "en": "attached you will find..."
    },
    {
      "de": "die Ersatzlieferung",
      "en": "replacement delivery"
    },
    {
      "de": "den Kaufbetrag erstatten",
      "en": "to refund purchase price"
    }
  ]
},
  {
  "id": "child-school-absence",
  "title": "Entschuldigungsschreiben: Krankheit des Kindes",
  "examType": "DTZ B1 / TELC B1 Brief",
  "level": "B1 Semi-Formal Absence",
  "scenario": "Ihr 8-jähriger Sohn Lukas hat hohes Fieber und kann diese Woche nicht zur Schule gehen. Schreiben Sie einen formellen Entschuldigungsbrief an seine Klassenlehrerin Frau Wagner.",
  "scenario_en": "Your 8-year-old son Lukas has a high fever and cannot attend school this week. Write a semi-formal absence note to his class teacher Frau Wagner.",
  "bulletPoints": [
    "Grund für das Fehlen (starke Grippe mit Fieber)",
    "Voraussichtliche Dauer der Abwesenheit (Montag bis Donnerstag)",
    "Ärztliches Attest erwähnen",
    "Hausaufgaben über einen Mitschüler anfordern"
  ],
  "bulletPoints_en": [
    "Reason for absence (severe flu with fever)",
    "Expected duration of absence (Monday to Thursday)",
    "Mention doctor note",
    "Ask for homework via classmate"
  ],
  "sampleSolution": "Sehr geehrte Frau Wagner,\n\nich schreibe Ihnen, um meinen Sohn Lukas Hoffmann (Klasse 3b) für die kommenden Tage krankzumelden.\n\nLukas ist am Wochenende leider an einer schweren Grippe mit hohem Fieber erkrankt. Laut unserem Kinderarzt muss er das Bett hüten und kann von Montag, den 10. November, bis voraussichtlich Donnerstag nicht am Unterricht teilnehmen. Ein ärztliches Attest liegt diesem Schreiben bei.\n\nKönnten Sie Lukas' Mitschüler Tim bitte die Hausaufgaben und Unterrichtsmaterialien mitgeben? Wir möchten gerne sicherstellen, dass er den Anschluss an den Schulstoff nicht verliert.\n\nSobald Lukas wieder fieberfrei ist, wird er wieder wie gewohnt zur Schule kommen.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  "sampleSolution_en": "Dear Ms. Wagner,\n\nI am writing to report my son Lukas Hoffmann (Class 3b) sick for the coming days.\n\nLukas unfortunately fell ill with severe flu and high fever over the weekend. According to our pediatrician, he must stay in bed and cannot attend class from Monday, November 10th until probably Thursday. A medical note is enclosed.\n\nCould you please give Lukas's classmate Tim the homework and lesson materials? We want to ensure he does not fall behind.\n\nAs soon as Lukas is fever-free, he will return to school as usual.\n\nThank you for your understanding.\n\nSincerely,\n[Your Name]",
  "fillInTheBlankTemplate": "Sehr geehrte Frau Wagner,\n\nich möchte meinen Sohn Lukas für die nächsten Tage [BLANK_1].\n\nEr hat hohes Fieber und [BLANK_2] von Montag bis Donnerstag nicht in die Schule kommen.\n\nDas ärztliche [BLANK_3] habe ich beigefügt.\n\nWäre es möglich, dass Tim ihm die [BLANK_4] mitbringt?\n\nVielen Dank [BLANK_5] Ihr Verständnis.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  "blankAnswers": [
    "krankmelden",
    "kann",
    "Attest",
    "Hausaufgaben",
    "für"
  ],
  "distractors": [
    "muss",
    "Brief",
    "mitnehmen"
  ],
  "keyVocab": [
    {
      "de": "das Kind krankmelden",
      "en": "to report a child sick"
    },
    {
      "de": "das ärztliche Attest",
      "en": "doctor sick certificate"
    },
    {
      "de": "am Unterricht teilnehmen",
      "en": "to participate in class"
    },
    {
      "de": "die Hausaufgaben mitgeben",
      "en": "to send homework along"
    },
    {
      "de": "das Bett hüten",
      "en": "to stay in bed"
    }
  ]
},
  {
  "id": "decline-party-invitation",
  "title": "Höfliche Absage einer privaten Einladung",
  "examType": "Goethe B1 Schreiben Teil 1",
  "level": "B1 Informal Letter",
  "scenario": "Ihre Kollegin Sarah hat Sie zu ihrer Geburtstagsparty am nächsten Samstagabend eingeladen. Leider können Sie nicht kommen, weil Sie bereits eine Dienstreise geplant haben. Schreiben Sie ihr eine persönliche E-Mail.",
  "scenario_en": "Your colleague Sarah invited you to her birthday party next Saturday evening. Unfortunately you cannot attend because you have a planned business trip. Write her a personal email.",
  "bulletPoints": [
    "Dank für die nette Einladung",
    "Grund für die Absage (Dienstreise nach Hamburg)",
    "Bedauern ausdrücken",
    "Vorschlag für ein baldiges Treffen zu zweit (Kaffee nächste Woche)"
  ],
  "bulletPoints_en": [
    "Thank for the kind invitation",
    "Reason for declining (business trip to Hamburg)",
    "Express regret",
    "Suggest meeting soon for coffee"
  ],
  "sampleSolution": "Liebe Sarah,\n\nvielen Dank für deine liebe Einladung zu deinem Geburtstag! Ich habe mich wirklich sehr darüber gefreut.\n\nLeider muss ich dir schweren Herzens absagen. Ich bin von Freitag bis Sonntag auf einer wichtigen Konferenz in Hamburg, die ich schon vor Monaten beruflich zusagen musste. Ich wäre so gerne dabei gewesen, um mit dir anzustoßen!\n\nIch hoffe, du feierst ein tolles Fest im Kreis deiner Freunde. Wie wäre es, wenn wir uns nächste Woche Mittwoch in der Mittagspause auf einen Kaffee treffen? Dann hole ich mein Geschenk nach und lade dich herzlich ein!\n\nAlles Liebe zum Geburtstag und bis ganz bald!\n\nLiebe Grüße\n[Dein Name]",
  "sampleSolution_en": "Dear Sarah,\n\nThank you so much for your sweet invitation to your birthday! I was truly delighted to receive it.\n\nUnfortunately with a heavy heart I have to decline. From Friday to Sunday I will be attending an important conference in Hamburg that I had to commit to months ago for work. I would have loved to be there to toast with you!\n\nI hope you celebrate a wonderful party with your friends. How about we meet next Wednesday during lunch break for coffee? Then I will give you your present and treat you!\n\nAll the best for your birthday and see you very soon!\n\nWarm regards,\n[Your Name]",
  "fillInTheBlankTemplate": "Liebe Sarah,\n\nherzlichen Dank [BLANK_1] die tolle Einladung!\n\nLeider kann ich am Samstag nicht [BLANK_2], weil ich auf einer Dienstreise in Hamburg bin.\n\nDas tut mir wirklich schrecklich [BLANK_3]!\n\nLass uns doch nächste Woche zusammen einen Kaffee [BLANK_4].\n\nIch wünsche dir eine wunderschöne [BLANK_5]!\n\nLiebe Grüße\n[Dein Name]",
  "blankAnswers": [
    "für",
    "kommen",
    "leid",
    "trinken",
    "Feier"
  ],
  "distractors": [
    "zu",
    "gehen",
    "Woche"
  ],
  "keyVocab": [
    {
      "de": "vielen Dank für die Einladung",
      "en": "thank you for the invitation"
    },
    {
      "de": "schweren Herzens absagen",
      "en": "to decline with a heavy heart"
    },
    {
      "de": "das tut mir leid",
      "en": "I am sorry"
    },
    {
      "de": "auf ein Treffen einladen",
      "en": "to invite for a meeting"
    },
    {
      "de": "alles Liebe zum Geburtstag",
      "en": "all the best for your birthday"
    }
  ]
}];

export const REDEMITTEL_LIBRARY = {
  salutations: [
    { de: "Sehr geehrte Damen und Herren,", en: "Dear Sir or Madam (when name unknown)" },
    { de: "Sehr geehrte Frau Müller,", en: "Dear Ms. Müller (formal female)" },
    { de: "Sehr geehrter Herr Schneider,", en: "Dear Mr. Schneider (formal male)" },
    { de: "Liebe Anna, / Lieber Markus,", en: "Dear Anna / Dear Markus (informal friend)" }
  ],
  openings: [
    { de: "ich schreibe Ihnen, weil...", en: "I am writing to you because..." },
    { de: "vielen Dank für Ihre E-Mail / Ihre Einladung.", en: "Thank you very much for your email / invitation." },
    { de: "ich wende mich an Sie bezüglich...", en: "I am contacting you regarding..." }
  ],
  connectors: [
    { de: "weil (verb at end)", en: "because (e.g. weil ich krank bin)" },
    { de: "obwohl (verb at end)", en: "although (e.g. obwohl es kalt ist)" },
    { de: "deshalb (verb in 2nd position)", en: "therefore (e.g. deshalb kann ich nicht kommen)" },
    { de: "damit (verb at end)", en: "so that (e.g. damit ich lernen kann)" },
    { de: "wenn (verb at end)", en: "if / when (e.g. wenn Sie Zeit haben)" }
  ],
  politeRequests: [
    { de: "Könnten Sie mir bitte mitteilen, ob...?", en: "Could you please let me know whether...?" },
    { de: "Es wäre sehr nett, wenn Sie...", en: "It would be very kind if you..." },
    { de: "Ich möchte Sie bitten, ... zu ...", en: "I would like to ask you to..." }
  ],
  closings: [
    { de: "Vielen Dank im Voraus für Ihre Mühe.", en: "Thank you in advance for your trouble." },
    { de: "Ich freue mich auf Ihre baldige Rückmeldung.", en: "I look forward to your prompt response." },
    { de: "Vielen Dank für Ihr Verständnis.", en: "Thank you for your understanding." }
  ],
  signOffs: [
    { de: "Mit freundlichen Grüßen", en: "Sincerely (Formal standard)" },
    { de: "Herzliche Grüße / Viele Grüße", en: "Warm regards (Semi-formal / friendly)" },
    { de: "Liebe Grüße", en: "Best wishes / love (Informal friends)" }
  ]
};
