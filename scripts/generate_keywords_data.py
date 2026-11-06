# -*- coding: utf-8 -*-
import json

keywords = [
  {
    "id": "kw-free",
    "keyword": "kostenlos / gratis",
    "keyword_en": "free of charge",
    "synonym_de": "gebührenfrei / Eintritt frei / umsonst / keine Kosten / zum Nulltarif",
    "synonym_en": "no fee / free entry / without cost / zero cost",
    "exampleContext": "Die Teilnahme am Workshop ist gebührenfrei.",
    "exampleContext_en": "Participation in the workshop is free of charge.",
    "trapWarning": "Achtung: 'günstig', 'billig' oder 'ermäßigt' bedeutet NICHT kostenlos!",
    "trapWarning_en": "Warning: 'cheap', 'inexpensive', or 'reduced' does NOT mean free!"
  },
  {
    "id": "kw-cheap",
    "keyword": "günstig / preiswert",
    "keyword_en": "cheap / good value",
    "synonym_de": "billig / Rabatt / Sonderangebot / zum halben Preis / ermäßigt / Schnäppchen",
    "synonym_en": "inexpensive / discount / special offer / half price / reduced / bargain",
    "exampleContext": "Studenten und Rentner erhalten 20% Rabatt auf alle Eintrittskarten.",
    "exampleContext_en": "Students and seniors receive a 20% discount on all admission tickets.",
    "trapWarning": "Wichtig: 'preiswert' bedeutet gutes Preis-Leistungs-Verhältnis, nicht teuer.",
    "trapWarning_en": "Important: 'preiswert' means good value, not expensive."
  },
  {
    "id": "kw-cancelled",
    "keyword": "fällt aus / abgesagt",
    "keyword_en": "cancelled",
    "synonym_de": "findet nicht statt / entfällt / wird verschoben / gecancelt / abgesagt",
    "synonym_en": "does not take place / omitted / postponed / cancelled",
    "exampleContext": "Wegen schlechten Wetters muss das Open-Air-Konzert leider entfallen.",
    "exampleContext_en": "Due to bad weather the open-air concert must unfortunately be cancelled.",
    "trapWarning": "Prüfer-Falle: Wenn ein Event verschoben wird, ist der ursprüngliche Termin abgesagt!",
    "trapWarning_en": "Exam trap: If an event is postponed, the original date is cancelled!"
  },
  {
    "id": "kw-forbidden",
    "keyword": "verboten",
    "keyword_en": "forbidden / prohibited",
    "synonym_de": "nicht gestattet / untersagt / nicht erlaubt / bitte unterlassen / unzulässig",
    "synonym_en": "not permitted / prohibited / not allowed / please refrain from / unlawful",
    "exampleContext": "Das Mitbringen von Glasflaschen ist auf dem Gelände streng untersagt.",
    "exampleContext_en": "Bringing glass bottles onto the premises is strictly prohibited.",
    "trapWarning": "Signalwörter wie 'untersagt' oder 'nicht gestattet' signalisieren immer ein Verbot.",
    "trapWarning_en": "Signal words like 'untersagt' or 'nicht gestattet' always indicate a prohibition."
  },
  {
    "id": "kw-permitted",
    "keyword": "erlaubt",
    "keyword_en": "allowed / permitted",
    "synonym_de": "gestattet / zulässig / möglich / genehmigt / freigegeben",
    "synonym_en": "permitted / admissible / possible / approved / released",
    "exampleContext": "Fotografieren ohne Blitzlicht ist in der Galerie gestattet.",
    "exampleContext_en": "Photography without flash is permitted in the gallery.",
    "trapWarning": "Achten Sie genau auf Einschränkungen wie 'nur nach Anmeldung' oder 'ohne Blitz'.",
    "trapWarning_en": "Pay close attention to qualifiers like 'only upon registration' or 'without flash'."
  },
  {
    "id": "kw-closed",
    "keyword": "geschlossen",
    "keyword_en": "closed",
    "synonym_de": "Ruhetag / Betriebsferien / kein Einlass / wegen Umbau zu / vorübergehend geschlossen",
    "synonym_en": "rest day / company holidays / no admission / closed for renovation / temporarily closed",
    "exampleContext": "Montags ist unser Museum wegen Ruhetag geschlossen.",
    "exampleContext_en": "On Mondays our museum is closed for our rest day.",
    "trapWarning": "'Ruhetag' in Restaurant- oder Ladenanzeigen bedeutet: geschlossen!",
    "trapWarning_en": "'Ruhetag' in restaurant or shop notices always means closed!"
  },
  {
    "id": "kw-mandatory",
    "keyword": "erforderlich / Pflicht",
    "keyword_en": "required / mandatory",
    "synonym_de": "notwendig / muss / Voraussetzung / zwingend / vorgeschrieben / unverzichtbar",
    "synonym_en": "necessary / must / prerequisite / strictly required / prescribed / indispensable",
    "exampleContext": "Für diesen Kurs sind Deutschkenntnisse auf A2-Niveau zwingend erforderlich.",
    "exampleContext_en": "German skills at A2 level are strictly required for this course.",
    "trapWarning": "'Erforderlich' bedeutet keine freiwillige Option, sondern zwingende Pflicht.",
    "trapWarning_en": "'Erforderlich' is not an optional suggestion, it is a strict requirement."
  },
  {
    "id": "kw-optional",
    "keyword": "freiwillig / optional",
    "keyword_en": "voluntary / optional",
    "synonym_de": "keine Pflicht / nach Belieben / auf Wunsch / freigestellt / unverbindlich",
    "synonym_en": "no obligation / as you please / upon request / optional / non-binding",
    "exampleContext": "Die Teilnahme am gemeinsamen Mittagessen ist völlig freiwillig.",
    "exampleContext_en": "Participation in the joint lunch is completely voluntary.",
    "trapWarning": "Unterscheiden Sie: 'Pflicht' vs. 'freiwillig'.",
    "trapWarning_en": "Distinguish clearly: 'mandatory' vs 'voluntary'."
  },
  {
    "id": "kw-immediately",
    "keyword": "sofort",
    "keyword_en": "immediately",
    "synonym_de": "ab sofort / unverzüglich / ohne Verzögerung / zum nächstmöglichen Zeitpunkt / prompt",
    "synonym_en": "from now on / without delay / promptly / at earliest convenience",
    "exampleContext": "Wir suchen ab sofort eine erfahrene Bürokraft.",
    "exampleContext_en": "We are seeking an experienced office assistant immediately.",
    "trapWarning": "In Stellenanzeigen: 'ab sofort' bedeutet sofortiger Arbeitsbeginn, nicht erst in 3 Monaten.",
    "trapWarning_en": "In job postings: 'ab sofort' indicates immediate employment start, not in 3 months."
  },
  {
    "id": "kw-punctual",
    "keyword": "rechtzeitig / fristgerecht",
    "keyword_en": "in time / on deadline",
    "synonym_de": "pünktlich / vor Fristablauf / bis spätestens / termingerecht",
    "synonym_en": "punctual / before deadline / at latest by / on schedule",
    "exampleContext": "Bitte reichen Sie den Antrag bis spätestens 31. März fristgerecht ein.",
    "exampleContext_en": "Please submit the application on deadline by March 31st at the latest.",
    "trapWarning": "'Bis spätestens' markiert die allerletzte Einreichfrist.",
    "trapWarning_en": "'Bis spätestens' denotes the absolute final submission deadline."
  },
  {
    "id": "kw-delayed",
    "keyword": "verspätet",
    "keyword_en": "delayed",
    "synonym_de": "hat Verspätung / verzögert sich / später als geplant / unpünktlich",
    "synonym_en": "is delayed / experiences delay / later than planned / late",
    "exampleContext": "Die Ankunft des Zuges verzögert sich um etwa 20 Minuten.",
    "exampleContext_en": "The arrival of the train is delayed by approximately 20 minutes.",
    "trapWarning": "'Verzögert sich' bedeutet immer Verspätung.",
    "trapWarning_en": "'Verzögert sich' always indicates a delay."
  },
  {
    "id": "kw-register",
    "keyword": "anmelden",
    "keyword_en": "to register / sign up",
    "synonym_de": "registrieren / Einschreibung / Reservation / buchen / Platz sichern",
    "synonym_en": "register / enrollment / reservation / book / secure spot",
    "exampleContext": "Bitte melden Sie sich bis Freitag online für den Kurs an.",
    "exampleContext_en": "Please register online for the course by Friday.",
    "trapWarning": "Prüfer fragen oft: Muss man sich vorher anmelden oder kann man spontan kommen?",
    "trapWarning_en": "Examiners often ask: Must you register in advance or can you come spontaneously?"
  },
  {
    "id": "kw-cancel-booking",
    "keyword": "abmelden / kündigen",
    "keyword_en": "to cancel / terminate",
    "synonym_de": "Stornierung / Rücktritt / Kündigung / Vertrag beenden / absagen",
    "synonym_en": "cancellation / withdrawal / termination / end contract / cancel",
    "exampleContext": "Eine kostenlose Stornierung ist bis 24 Stunden vor Reisebeginn möglich.",
    "exampleContext_en": "Free cancellation is possible up to 24 hours before trip departure.",
    "trapWarning": "Achten Sie auf Stornierungsfristen und eventuelle Gebühren.",
    "trapWarning_en": "Pay attention to cancellation notice periods and fees."
  },
  {
    "id": "kw-accommodation",
    "keyword": "Unterkunft",
    "keyword_en": "accommodation / lodging",
    "synonym_de": "Hotel / Pension / Ferienwohnung / Jugendherberge / Zimmer / Übernachtung",
    "synonym_en": "hotel / guesthouse / holiday apartment / hostel / room / overnight stay",
    "exampleContext": "Die Kosten für die Unterkunft sind im Gesamtpreis bereits inbegriffen.",
    "exampleContext_en": "Costs for accommodation are already included in the total price.",
    "trapWarning": "'Unterkunft' ist der Oberbegriff für Hotel, Zelt, Hostel oder Pension.",
    "trapWarning_en": "'Unterkunft' is the generic term for hotel, tent, hostel, or guesthouse."
  },
  {
    "id": "kw-salary",
    "keyword": "Gehalt / Lohn",
    "keyword_en": "salary / wage",
    "synonym_de": "Verdienst / Bezahlung / Einkommen / Vergütung / Entlohnung",
    "synonym_en": "earnings / pay / income / remuneration / compensation",
    "exampleContext": "Die Vergütung erfolgt nach dem aktuellen Tarifvertrag des öffentlichen Dienstes.",
    "exampleContext_en": "Remuneration is paid according to the public sector collective agreement.",
    "trapWarning": "Wörter wie 'Vergütung' und 'Verdienst' bedeuten immer Gehalt.",
    "trapWarning_en": "Words like 'Vergütung' and 'Verdienst' always mean salary."
  },
  {
    "id": "kw-parttime",
    "keyword": "Teilzeit",
    "keyword_en": "part-time",
    "synonym_de": "halbe Stelle / stundenweise / 20 Stunden pro Woche / nicht Vollzeit",
    "synonym_en": "half-time position / hourly basis / 20 hours a week / non-full-time",
    "exampleContext": "Wir suchen eine Buchhalterin in Teilzeit (20 Stunden wöchentlich).",
    "exampleContext_en": "We are seeking a part-time accountant (20 hours weekly).",
    "trapWarning": "Gegensatz zu Vollzeit (meist 38-40 Stunden pro Woche).",
    "trapWarning_en": "Opposite of full-time (usually 38-40 hours per week)."
  },
  {
    "id": "kw-working",
    "keyword": "berufstätig",
    "keyword_en": "employed / working",
    "synonym_de": "arbeitet / Erwerbstätigkeit / im Beruf stehen / angestellt / jobben",
    "synonym_en": "working / gainfully employed / in a career / employed / working a job",
    "exampleContext": "Dieser Kurs richtet sich speziell an Berufstätige mit Unterricht am Samstag.",
    "exampleContext_en": "This course is specifically targeted at working professionals with classes on Saturday.",
    "trapWarning": "Kurse für 'Berufstätige' finden meist abends oder am Wochenende statt.",
    "trapWarning_en": "Courses for 'Berufstätige' usually occur in evenings or weekends."
  },
  {
    "id": "kw-sick",
    "keyword": "krank / erkrankt",
    "keyword_en": "ill / sick",
    "synonym_de": "arbeitsunfähig / krankgeschrieben / Attest / gesundheitliche Gründe",
    "synonym_en": "unable to work / on sick leave / medical certificate / health reasons",
    "exampleContext": "Der Dozent ist leider erkrankt, daher fällt der Unterricht aus.",
    "exampleContext_en": "The lecturer is unfortunately ill, therefore class is cancelled.",
    "trapWarning": "'Arbeitsunfähig' (AU) ist das offizielle deutsche Wort für krankgeschrieben.",
    "trapWarning_en": "'Arbeitsunfähig' (AU) is the official German term for certified sick leave."
  },
  {
    "id": "kw-appointment",
    "keyword": "Termin vereinbaren",
    "keyword_en": "to schedule an appointment",
    "synonym_de": "ausmachen / festlegen / buchen / reservieren / Termin absprechen",
    "synonym_en": "agree upon / fix / book / reserve / schedule",
    "exampleContext": "Bitte vereinbaren Sie telefonisch vorab einen Termin mit dem Bürgerbüro.",
    "exampleContext_en": "Please arrange an appointment with the citizens bureau in advance by phone.",
    "trapWarning": "Unterscheiden Sie: 'vereinbaren' (neu buchen) vs. 'verschieben' (ändern).",
    "trapWarning_en": "Distinguish: 'vereinbaren' (book new) vs 'verschieben' (change date)."
  },
  {
    "id": "kw-used",
    "keyword": "gebraucht",
    "keyword_en": "used / pre-owned",
    "synonym_de": "aus zweiter Hand / Second-Hand / nicht neu / guter Zustand / Vorbesitzer",
    "synonym_en": "second-hand / pre-owned / not new / good condition / previous owner",
    "exampleContext": "Verkaufe gut erhaltenes Damenrad aus zweiter Hand.",
    "exampleContext_en": "Selling well-maintained women's bicycle, second-hand.",
    "trapWarning": "'Aus zweiter Hand' bedeutet immer gebraucht, nicht nagelneu.",
    "trapWarning_en": "'Aus zweiter Hand' always means used, not brand new."
  },
  {
    "id": "kw-defective",
    "keyword": "defekt / beschädigt",
    "keyword_en": "defective / damaged",
    "synonym_de": "kaputt / funktioniert nicht / Mangel / Fehler / Schaden / unbrauchbar",
    "synonym_en": "broken / does not work / defect / error / damage / unusable",
    "exampleContext": "Die Heizung in der Wohnung ist seit gestern defekt.",
    "exampleContext_en": "The heating in the apartment has been defective since yesterday.",
    "trapWarning": "In Reklamationen: 'Mangel' oder 'Schaden' meint einen Defekt.",
    "trapWarning_en": "In complaints: 'Mangel' or 'Schaden' denotes a defect."
  },
  {
    "id": "kw-refund",
    "keyword": "Ersatz / Umtausch",
    "keyword_en": "replacement / exchange",
    "synonym_de": "Reklamation / Geld zurück / Erstattung / Neulieferung / Rückgabe",
    "synonym_en": "complaint / money back / refund / new delivery / return",
    "exampleContext": "Bei Mängeln haben Kunden Anspruch auf kostenlosen Umtausch oder Erstattung.",
    "exampleContext_en": "In case of defects, customers are entitled to free exchange or refund.",
    "trapWarning": "'Erstattung' bedeutet: Sie bekommen Ihr Geld zurück.",
    "trapWarning_en": "'Erstattung' means: You get your money refunded."
  },
  {
    "id": "kw-participate",
    "keyword": "teilnehmen",
    "keyword_en": "to participate / attend",
    "synonym_de": "mitmachen / dabei sein / belegen / sich beteiligen / anwesend sein",
    "synonym_en": "join in / be present / enroll / take part / attend",
    "exampleContext": "An diesem Ausflug können bis zu 25 Personen teilnehmen.",
    "exampleContext_en": "Up to 25 people can participate in this excursion.",
    "trapWarning": "Synonyme wie 'dabei sein' oder 'mitmachen' bedeuten Teilnahme.",
    "trapWarning_en": "Synonyms like 'dabei sein' or 'mitmachen' mean participation."
  },
  {
    "id": "kw-inclusive",
    "keyword": "inklusive / inbegriffen",
    "keyword_en": "inclusive / included",
    "synonym_de": "bereits enthalten / keine Zusatzkosten / im Preis drin / eingeschlossen",
    "synonym_en": "already contained / no extra cost / in price / included",
    "exampleContext": "Das Frühstücksbuffet ist im Übernachtungspreis inbegriffen.",
    "exampleContext_en": "The breakfast buffet is included in the room price.",
    "trapWarning": "'Inbegriffen' bedeutet: Man muss nichts extra bezahlen.",
    "trapWarning_en": "'Inbegriffen' means: You do not need to pay anything extra."
  },
  {
    "id": "kw-exclusive",
    "keyword": "exklusive / zzgl.",
    "keyword_en": "exclusive / plus extra",
    "synonym_de": "zuzüglich / extra Gebühr / nicht enthalten / gesondert berechnet",
    "synonym_en": "in addition / extra fee / not included / billed separately",
    "exampleContext": "Mietpreis: 650 Euro monatlich zzgl. 150 Euro Nebenkosten.",
    "exampleContext_en": "Rent: 650 euros monthly plus 150 euros utility costs.",
    "trapWarning": "'Zzgl.' (zuzüglich) bedeutet: Dieser Betrag kommt noch oben drauf!",
    "trapWarning_en": "'Zzgl.' (zuzüglich) means: This amount is added on top!"
  },
  {
    "id": "kw-workdays",
    "keyword": "werktags",
    "keyword_en": "on working days",
    "synonym_de": "Montag bis Samstag / an Arbeitstagen / nicht an Sonn- und Feiertagen",
    "synonym_en": "Monday to Saturday / on work days / not on Sundays and holidays",
    "exampleContext": "Die Praxis ist werktags von 8:00 bis 18:00 Uhr geöffnet.",
    "exampleContext_en": "The clinic is open on working days from 8:00 AM to 6:00 PM.",
    "trapWarning": "Achtung: Im deutschen Recht ist auch der SAMSTAG ein Werktag!",
    "trapWarning_en": "Warning: In German law, SATURDAY is also counted as a working day ('Werktag')!"
  },
  {
    "id": "kw-daily",
    "keyword": "täglich",
    "keyword_en": "daily",
    "synonym_de": "jeden Tag / an 7 Tagen pro Woche / Mo-So / rund um die Woche",
    "synonym_en": "every day / 7 days a week / Mon-Sun / all week long",
    "exampleContext": "Unser Kundenservice ist täglich von 9 bis 20 Uhr erreichbar.",
    "exampleContext_en": "Our customer service is reachable daily from 9 AM to 8 PM.",
    "trapWarning": "Unterscheiden Sie genau: 'werktags' (ohne Sonntag) vs. 'täglich' (auch Sonntag).",
    "trapWarning_en": "Distinguish: 'werktags' (excludes Sunday) vs 'täglich' (includes Sunday)."
  },
  {
    "id": "kw-cash",
    "keyword": "Barzahlung / bar zahlen",
    "keyword_en": "cash payment",
    "synonym_de": "mit Bargeld / Scheine und Münzen / nur Bares / keine Kartenzahlung",
    "synonym_en": "with cash / bills and coins / cash only / no card payment",
    "exampleContext": "Auf dem Wochenmarkt ist ausschließlich Barzahlung möglich.",
    "exampleContext_en": "Only cash payment is possible at the weekly farmers market.",
    "trapWarning": "Wenn 'nur Barzahlung' steht, kann man NICHT mit Karte zahlen.",
    "trapWarning_en": "If 'nur Barzahlung' is noted, you CANNOT pay by card."
  },
  {
    "id": "kw-card",
    "keyword": "Kartenzahlung / bargeldlos",
    "keyword_en": "card payment / cashless",
    "synonym_de": "EC-Karte / Kreditkarte / per Überweisung / Girocard / kontaktlos",
    "synonym_en": "debit card / credit card / via bank transfer / Girocard / contactless",
    "exampleContext": "Wir bitten um bargeldlose Zahlung per EC-Karte oder Smartphone.",
    "exampleContext_en": "We request cashless payment via debit card or smartphone.",
    "trapWarning": "'Bargeldlos' bedeutet: Kein Bargeld erwünscht.",
    "trapWarning_en": "'Bargeldlos' means: No cash desired."
  },
  {
    "id": "kw-discount-age",
    "keyword": "Ermäßigung für Kinder / Senioren",
    "keyword_en": "discount for children / seniors",
    "synonym_de": "halber Preis für Schüler / Rabatt ab 65 Jahren / vergünstigter Eintritt",
    "synonym_en": "half price for pupils / discount from 65 years / discounted admission",
    "exampleContext": "Kinder unter 6 Jahren haben freien Eintritt; Senioren zahlen den halben Preis.",
    "exampleContext_en": "Children under 6 have free admission; seniors pay half price.",
    "trapWarning": "Achten Sie genau auf Altersgrenzen (z. B. 'unter 14 Jahre' oder 'ab 65 Jahre').",
    "trapWarning_en": "Pay close attention to age thresholds (e.g. 'under 14' or 'from 65')."
  }
]

# Write to b1_keywords_data.ts
code = """import { KeywordPair, ReadingExamItem } from "@/types";

export const B1_KEYWORD_PAIRS: KeywordPair[] = """ + json.dumps(keywords, indent=2, ensure_ascii=False) + """;

export const B1_READING_EXAM_ITEMS: ReadingExamItem[] = [
  {
    id: "reading-q1",
    title: "Anzeige: Fitnessstudio & Wellness-Angebote",
    sourceType: "Zeitung / Web-Anzeige (TELC B1 Leseverstehen Teil 1)",
    text_de: `SuperFit Club Berlin
Trainieren Sie an 365 Tagen im Jahr mit modernsten Geräten!
Für alle Neuanmeldungen in diesem Monat: Die ersten zwei Probewochen sind völlig gebührenfrei.
Wer danach einen Jahresvertrag abschließt, zahlt statt 40 Euro nur 29 Euro monatlich.
Wichtig: Am Wochenende schließt der Saunabereich bereits um 18:00 Uhr. Kinder unter 14 Jahren haben keinen Zutritt zu den Fitnessräumen.`,
    text_en: `SuperFit Club Berlin
Train 365 days a year with state-of-the-art equipment!
For all new sign-ups this month: The first two trial weeks are completely free of charge.
Anyone signing an annual contract afterwards pays only 29 euros monthly instead of 40 euros.
Important: On weekends the sauna area closes at 6:00 PM. Children under 14 have no access to fitness rooms.`,
    question_de: "Was erfährt man über das Probetraining?",
    question_en: "What do we learn about the trial training?",
    options: [
      { de: "Es kostet 29 Euro für zwei Wochen.", en: "It costs 29 euros for two weeks." },
      { de: "Man kann zwei Wochen lang kostenlos trainieren.", en: "One can train for free for two weeks." },
      { de: "Es ist nur für Kinder unter 14 Jahren möglich.", en: "It is only possible for children under 14." },
      { de: "Man muss sofort einen Jahresvertrag unterschreiben.", en: "One must immediately sign an annual contract." }
    ],
    correct: 1,
    keywordHint: "Schlüsselwort: 'gebührenfrei' = kostenlos. Zwei Probewochen kosten nichts.",
    keywordHint_en: "Keyword: 'gebührenfrei' = free of charge. Two trial weeks cost nothing."
  },
  {
    id: "reading-q2",
    title: "E-Mail: Wichtige Information zum Deutschkurs",
    sourceType: "E-Mail an Kursteilnehmer (Goethe B1 Lesen Teil 2)",
    text_de: `Liebe Kursteilnehmende,
unser Dozent Herr Weber ist leider erkrankt. Aus diesem Grund kann der morgige Abendunterricht nicht stattfinden.
Wir holen diesen Termin am kommenden Samstag von 10:00 bis 13:00 Uhr im Raum 204 nach.
Wer am Samstag verhindert ist, kann die Unterrichtsmaterialien über unser Online-Portal herunterladen.
Beste Grüße, Ihre Sprachschulleitung`,
    text_en: `Dear course participants,
Our lecturer Mr. Weber is unfortunately ill. For this reason tomorrow's evening class cannot take place.
We will make up this session next Saturday from 10:00 AM to 1:00 PM in Room 204.
Anyone unavailable on Saturday can download the course materials via our online portal.
Best regards, Language School Management`,
    question_de: "Wann findet der nächste reguläre Unterricht von Herrn Weber statt?",
    question_en: "When will Mr. Weber's next scheduled class session take place?",
    options: [
      { de: "Morgen Abend wie gewohnt.", en: "Tomorrow evening as usual." },
      { de: "Der Kurs wird komplett abgesagt.", en: "The course is completely cancelled." },
      { de: "Am Samstagvormittag als Ersatztermin.", en: "On Saturday morning as a makeup session." },
      { de: "Nur online über das Internet.", en: "Only online via the internet." }
    ],
    correct: 2,
    keywordHint: "Prüfer-Falle: 'kann nicht stattfinden' = der morgige Termin fällt aus. Aber 'holen am kommenden Samstag nach' = Ersatztermin am Samstag!",
    keywordHint_en: "Exam trap: 'kann nicht stattfinden' = tomorrow cancelled. But 'holen am Samstag nach' = makeup session Saturday morning!"
  },
  {
    id: "reading-q3",
    title: "Aushang: Parkordnung vor dem Ärztehaus",
    sourceType: "Hinweisschild / Aushang (DTZ B1 Lesen)",
    text_de: `Parkplatzhinweis für Patienten:
Das Parken vor dem Haupteingang ist ausschließlich Rettungsfahrzeugen und mobilitätseingeschränkten Personen mit blauem Parkausweis gestattet.
Für alle anderen Besucher ist das Abstellen von Fahrzeugen streng untersagt. Widerrechtlich geparkte Autos werden kostenpflichtig abgeschleppt.
Kostenfreie Parkplätze finden Sie 200 Meter weiter am Sportplatz.`,
    text_en: `Parking notice for patients:
Parking in front of the main entrance is permitted exclusively for emergency vehicles and mobility-impaired persons with a blue parking badge.
For all other visitors, parking vehicles is strictly prohibited. Illegally parked cars will be towed at the owner's expense.
Free parking spaces can be found 200 meters further at the sports grounds.`,
    question_de: "Wer darf direkt vor dem Haupteingang parken?",
    question_en: "Who is allowed to park directly in front of the main entrance?",
    options: [
      { de: "Jeder Besucher des Ärztehauses für 30 Minuten.", en: "Every visitor of the medical center for 30 minutes." },
      { de: "Nur Patienten mit speziellem Behindertenparkausweis oder Rettungswagen.", en: "Only patients with a special disabled parking badge or ambulances." },
      { de: "Niemand, dort herrscht absolutes Halteverbot.", en: "Nobody, there is a total no-stopping rule." },
      { de: "Nur Mitarbeiter des Sportplatzes.", en: "Only employees of the sports facility." }
    ],
    correct: 1,
    keywordHint: "Schlüsselwort: 'ausschließlich gestattet' = nur für bestimmte Gruppen erlaubt (mobilitätseingeschränkt / Rettungsfahrzeuge).",
    keywordHint_en: "Keyword: 'ausschließlich gestattet' = permitted exclusively for specific groups."
  },
  {
    id: "reading-q4",
    title: "Hausmitteilung: Reparatur des Aufzugs",
    sourceType: "Aushang im Hausflur (TELC B1 Lesen Teil 5)",
    text_de: `Wichtige Information für alle Bewohner der Friedrichstraße 12:
Wegen dringender Wartungsarbeiten ist der Personenaufzug von Montag, 07:00 Uhr bis Mittwoch, 16:00 Uhr außer Betrieb.
Die Müllabfuhr erfolgt am Dienstag regulär. Bitte stellen Sie Ihre Mülltonnen wie gewohnt an den Bürgersteig.
Für ältere und gehbehinderte Hausbewohner bietet der Hausmeisterdienst am Dienstag zwischen 10:00 und 12:00 Uhr Tragehilfe für Einkäufe an.`,
    text_en: `Important information for all residents of Friedrichstraße 12:
Due to urgent maintenance, the passenger elevator is out of service from Monday 7:00 AM until Wednesday 4:00 PM.
Garbage collection takes place regularly on Tuesday.
For elderly and mobility-impaired residents, the janitorial service offers assistance carrying groceries on Tuesday between 10:00 AM and 12:00 PM.`,
    question_de: "Wann kann der Aufzug wieder genutzt werden?",
    question_en: "When can the elevator be used again?",
    options: [
      { de: "Ab Montagmorgen 07:00 Uhr.", en: "From Monday morning 7:00 AM." },
      { de: "Ab Mittwochnachmittag nach 16:00 Uhr.", en: "From Wednesday afternoon after 4:00 PM." },
      { de: "Nur am Dienstagvormittag während der Tragehilfe.", en: "Only on Tuesday morning during carrying assistance." },
      { de: "Erst nächste Woche Montag.", en: "Only next week on Monday." }
    ],
    correct: 1,
    keywordHint: "Signal: 'außer Betrieb bis Mittwoch, 16:00 Uhr' = ab Mittwoch 16:00 Uhr wieder nutzbar.",
    keywordHint_en: "Signal: 'Out of service until Wednesday 4:00 PM' = usable again after Wednesday 4:00 PM."
  },
  {
    id: "reading-q5",
    title: "Geschäftszeiten: Bürgeramt Ausländerbehörde",
    sourceType: "Webseite / Behördenaushang (DTZ B1 Lesen)",
    text_de: `Kundenzentrum Bürgerdienste:
Für alle Dienstleistungen (Anmeldung einer Wohnung, Beantragung von Pässen, Führungszeugnisse) ist eine vorherige Online-Terminvereinbarung zwingend erforderlich.
Kunden ohne gebuchten Termin können leider nicht bedient werden.
Ausnahme: Die Abholung bereits fertiggestellter Reisepässe und Personalausweise ist montags und donnerstags von 14:00 bis 16:00 Uhr ohne Voranmeldung an Schalter 3 möglich.`,
    text_en: `Customer Center Citizen Services:
For all services (apartment registration, passport applications, police clearance certificates), prior online appointment booking is strictly mandatory.
Customers without a booked appointment unfortunately cannot be served.
Exception: Collection of already completed passports and ID cards is possible without prior appointment at Counter 3 on Mondays and Thursdays from 2:00 PM to 4:00 PM.`,
    question_de: "Was kann man ohne vorherigen Termin erledigen?",
    question_en: "What can one do without an advance appointment?",
    options: [
      { de: "Eine neue Wohnung im Melderegister anmelden.", en: "Register a new apartment in the registry." },
      { de: "Einen fertigen Reisepass zu den festgelegten Zeiten abholen.", en: "Collect a completed passport during specified hours." },
      { de: "Ein polizeiliches Führungszeugnis beantragen.", en: "Apply for a police clearance certificate." },
      { de: "Gar nichts, ohne Termin gibt es keinerlei Service.", en: "Nothing at all; without an appointment there is zero service." }
    ],
    correct: 1,
    keywordHint: "Signal: 'Ausnahme: Die Abholung fertiggestellter Pässe ist ohne Voranmeldung möglich'.",
    keywordHint_en: "Signal: 'Exception: Collection of completed passports is possible without prior appointment'."
  }
];
"""

with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_keywords_data.ts", "w", encoding="utf-8") as f:
    f.write(code)

print(f"Successfully wrote {len(keywords)} keyword pairs and {5} exam drills to b1_keywords_data.ts")
