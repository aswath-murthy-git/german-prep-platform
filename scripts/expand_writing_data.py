# -*- coding: utf-8 -*-
import json

new_templates = [
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
    "sampleSolution": """Sehr geehrter Herr Schneider,

ich wende mich an Sie, um mich über eine erhebliche Lärmbelästigung in unserem Haus zu beschweren.

Seit zwei Wochen spielen die Nachbarn aus dem dritten Stock fast jede Nacht laute Musik und feiern bis spät in die Nacht. Obwohl ich bereits zweimal persönlich das Gespräch gesucht habe, hat sich die Situation leider überhaupt nicht gebessert.

Wegen des ständigen Lärms leide ich unter erheblichem Schlafmangel, weshalb ich mich bei meiner Arbeit tagsüber kaum noch konzentrieren kann.

Ich möchte Sie daher dringend bitten, die betreffenden Mieter schriftlich abzumahnen und für die Einhaltung der gesetzlichen Ruhezeiten zu sorgen.

Vielen Dank im Voraus für Ihre Unterstützung.

Mit freundlichen Grüßen
[Ihr Vorname Nachname]""",
    "sampleSolution_en": """Dear Mr. Schneider,

I am contacting you to complain about considerable noise disturbance in our building.

For two weeks, the neighbors on the third floor have been playing loud music almost every night and partying until late. Although I have sought a personal conversation twice, the situation has unfortunately not improved at all.

Due to the constant noise, I suffer from significant lack of sleep, which is why I can barely concentrate at work during the day.

I would therefore like to urgently ask you to issue a written warning to the tenants in question and ensure compliance with statutory quiet hours.

Thank you in advance for your support.

Sincerely,
[Your Name]""",
    "fillInTheBlankTemplate": """Sehr geehrter Herr Schneider,

ich wende mich an Sie, [BLANK_1] mich über eine erhebliche Ruhestörung zu beschweren.

[BLANK_2] ich bereits persönlich mit den Nachbarn gesprochen habe, feiern sie jede Nacht laute Partys.

Wegen des Lärms kann ich nachts nicht schlafen, [BLANK_3] bin ich tagsüber bei der Arbeit sehr müde.

Könnten Sie bitte [BLANK_4], damit im Haus wieder Ruhe herrscht?

Ich danke Ihnen im [BLANK_5] für Ihre Hilfe.

Mit freundlichen Grüßen
[Ihr Name]""",
    "blankAnswers": [
      "um",
      "Obwohl",
      "deshalb",
      "eingreifen",
      "Voraus"
    ],
    "keyVocab": [
      { "de": "sich beschweren über...", "en": "to complain about..." },
      { "de": "die Ruhestörung / Lärmbelästigung", "en": "noise disturbance" },
      { "de": "das Gespräch suchen", "en": "to seek a conversation" },
      { "de": "abmahnen", "en": "to issue a warning" },
      { "de": "die gesetzliche Nachtruhe", "en": "statutory nighttime quiet hours" }
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
    "sampleSolution": """Sehr geehrte Damen und Herren,

vor drei Tagen habe ich in Ihrem Online-Shop einen Staubsauger (Bestellnummer #48920) bestellt. Das Paket wurde heute geliefert, allerdings ist das Gerät stark beschädigt.

Das Gehäuse weist einen großen Riss auf und der Motor startet überhaupt nicht, wenn man das Gerät an die Steckdose anschließt. 

Im Anhang finden Sie die Rechnung sowie zwei Fotos, die den Schaden deutlich zeigen.

Da ich das Gerät dringend benötige, bitte ich Sie um eine umgehende, kostenlose Ersatzlieferung. Falls der Artikel nicht mehr vorrätig sein sollte, erstatten Sie mir bitte den vollen Kaufbetrag auf mein Konto.

Ich freue mich auf Ihre schnelle Rückmeldung.

Mit freundlichen Grüßen
[Ihr Name]""",
    "sampleSolution_en": """Dear Sir or Madam,

Three days ago I ordered a vacuum cleaner (Order #48920) in your online shop. The package was delivered today; however, the appliance is heavily damaged.

The casing has a large crack and the motor does not start at all when plugged into the socket.

Attached you will find the invoice as well as two photos clearly demonstrating the damage.

As I need the appliance urgently, I request an immediate, free replacement delivery. If the item is out of stock, please refund the full purchase amount to my account.

I look forward to your prompt reply.

Sincerely,
[Your Name]""",
    "fillInTheBlankTemplate": """Sehr geehrte Damen und Herren,

ich schreibe Ihnen bezüglich meiner [BLANK_1] mit der Nummer #48920.

Das gelieferte Gerät ist leider [BLANK_2] und lässt sich nicht einschalten.

Im [BLANK_3] sende ich Ihnen die Rechnung und Fotos vom Schaden.

Ich möchte Sie bitten, mir ein neues Gerät als [BLANK_4] zuzusenden.

Vielen Dank im [BLANK_5] für die schnelle Bearbeitung.

Mit freundlichen Grüßen
[Ihr Name]""",
    "blankAnswers": [
      "Bestellung",
      "defekt",
      "Anhang",
      "Ersatz",
      "Voraus"
    ],
    "keyVocab": [
      { "de": "die Reklamation / reklamieren", "en": "complaint / to complain" },
      { "de": "das Gerät ist beschädigt / defekt", "en": "the device is damaged / broken" },
      { "de": "im Anhang finden Sie...", "en": "attached you will find..." },
      { "de": "die Ersatzlieferung", "en": "replacement delivery" },
      { "de": "den Kaufbetrag erstatten", "en": "to refund purchase price" }
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
    "sampleSolution": """Sehr geehrte Frau Wagner,

ich schreibe Ihnen, um meinen Sohn Lukas Hoffmann (Klasse 3b) für die kommenden Tage krankzumelden.

Lukas ist am Wochenende leider an einer schweren Grippe mit hohem Fieber erkrankt. Laut unserem Kinderarzt muss er das Bett hüten und kann von Montag, den 10. November, bis voraussichtlich Donnerstag nicht am Unterricht teilnehmen. Ein ärztliches Attest liegt diesem Schreiben bei.

Könnten Sie Lukas' Mitschüler Tim bitte die Hausaufgaben und Unterrichtsmaterialien mitgeben? Wir möchten gerne sicherstellen, dass er den Anschluss an den Schulstoff nicht verliert.

Sobald Lukas wieder fieberfrei ist, wird er wieder wie gewohnt zur Schule kommen.

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen
[Ihr Name]""",
    "sampleSolution_en": """Dear Ms. Wagner,

I am writing to report my son Lukas Hoffmann (Class 3b) sick for the coming days.

Lukas unfortunately fell ill with severe flu and high fever over the weekend. According to our pediatrician, he must stay in bed and cannot attend class from Monday, November 10th until probably Thursday. A medical note is enclosed.

Could you please give Lukas's classmate Tim the homework and lesson materials? We want to ensure he does not fall behind.

As soon as Lukas is fever-free, he will return to school as usual.

Thank you for your understanding.

Sincerely,
[Your Name]""",
    "fillInTheBlankTemplate": """Sehr geehrte Frau Wagner,

ich möchte meinen Sohn Lukas für die nächsten Tage [BLANK_1].

Er hat hohes Fieber und [BLANK_2] von Montag bis Donnerstag nicht in die Schule kommen.

Das ärztliche [BLANK_3] habe ich beigefügt.

Wäre es möglich, dass Tim ihm die [BLANK_4] mitbringt?

Vielen Dank [BLANK_5] Ihr Verständnis.

Mit freundlichen Grüßen
[Ihr Name]""",
    "blankAnswers": [
      "krankmelden",
      "kann",
      "Attest",
      "Hausaufgaben",
      "für"
    ],
    "keyVocab": [
      { "de": "das Kind krankmelden", "en": "to report a child sick" },
      { "de": "das ärztliche Attest", "en": "doctor sick certificate" },
      { "de": "am Unterricht teilnehmen", "en": "to participate in class" },
      { "de": "die Hausaufgaben mitgeben", "en": "to send homework along" },
      { "de": "das Bett hüten", "en": "to stay in bed" }
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
    "sampleSolution": """Liebe Sarah,

vielen Dank für deine liebe Einladung zu deinem Geburtstag! Ich habe mich wirklich sehr darüber gefreut.

Leider muss ich dir schweren Herzens absagen. Ich bin von Freitag bis Sonntag auf einer wichtigen Konferenz in Hamburg, die ich schon vor Monaten beruflich zusagen musste. Ich wäre so gerne dabei gewesen, um mit dir anzustoßen!

Ich hoffe, du feierst ein tolles Fest im Kreis deiner Freunde. Wie wäre es, wenn wir uns nächste Woche Mittwoch in der Mittagspause auf einen Kaffee treffen? Dann hole ich mein Geschenk nach und lade dich herzlich ein!

Alles Liebe zum Geburtstag und bis ganz bald!

Liebe Grüße
[Dein Name]""",
    "sampleSolution_en": """Dear Sarah,

Thank you so much for your sweet invitation to your birthday! I was truly delighted to receive it.

Unfortunately with a heavy heart I have to decline. From Friday to Sunday I will be attending an important conference in Hamburg that I had to commit to months ago for work. I would have loved to be there to toast with you!

I hope you celebrate a wonderful party with your friends. How about we meet next Wednesday during lunch break for coffee? Then I will give you your present and treat you!

All the best for your birthday and see you very soon!

Warm regards,
[Your Name]""",
    "fillInTheBlankTemplate": """Liebe Sarah,

herzlichen Dank [BLANK_1] die tolle Einladung!

Leider kann ich am Samstag nicht [BLANK_2], weil ich auf einer Dienstreise in Hamburg bin.

Das tut mir wirklich schrecklich [BLANK_3]!

Lass uns doch nächste Woche zusammen einen Kaffee [BLANK_4].

Ich wünsche dir eine wunderschöne [BLANK_5]!

Liebe Grüße
[Dein Name]""",
    "blankAnswers": [
      "für",
      "kommen",
      "leid",
      "trinken",
      "Feier"
    ],
    "keyVocab": [
      { "de": "vielen Dank für die Einladung", "en": "thank you for the invitation" },
      { "de": "schweren Herzens absagen", "en": "to decline with a heavy heart" },
      { "de": "das tut mir leid", "en": "I am sorry" },
      { "de": "auf ein Treffen einladen", "en": "to invite for a meeting" },
      { "de": "alles Liebe zum Geburtstag", "en": "all the best for your birthday" }
    ]
  }
]

# Read existing b1_writing_data.ts
with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_writing_data.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find end of B1_WRITING_TEMPLATES array
marker = "];\n\nexport const REDEMITTEL_LIBRARY"
if marker in text:
    existing_part, rest = text.split(marker, 1)
    # Append new templates
    new_code = ""
    for tmpl in new_templates:
        new_code += ",\n  " + json.dumps(tmpl, indent=2, ensure_ascii=False)
    
    updated = existing_part + new_code + marker + rest
    if "\u2014" in updated:
        updated = updated.replace("\u2014", " - ")
    with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_writing_data.ts", "w", encoding="utf-8") as f:
        f.write(updated)
    print("Successfully added 4 new writing templates (total 8 templates)!")
else:
    print("Marker not found in b1_writing_data.ts")
