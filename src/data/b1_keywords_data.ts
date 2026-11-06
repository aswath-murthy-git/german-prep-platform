import { KeywordPair, ReadingExamItem } from "@/types";

export const B1_KEYWORD_PAIRS: KeywordPair[] = [
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
  },
  {
    "id": "kw-moving",
    "keyword": "Umzug / umziehen",
    "keyword_en": "moving / relocation",
    "synonym_de": "Wohnungswechsel / Wohnortwechsel / neue Anschrift / Adressänderung / Einzug",
    "synonym_en": "change of flat / change of residence / new address / address update / move-in",
    "exampleContext": "Bitte teilen Sie der Krankenkasse und dem Einwohnermeldeamt Ihren Wohnungswechsel unverzüglich mit.",
    "exampleContext_en": "Please inform your health insurance and registry office of your change of residence immediately.",
    "trapWarning": "Innerhalb von 14 Tagen nach Einzug muss die Ummeldung beim Bürgeramt erfolgen.",
    "trapWarning_en": "Registration update must occur within 14 days after moving in."
  },
  {
    "id": "kw-certificate",
    "keyword": "Bescheinigung / Attest",
    "keyword_en": "certificate / medical note",
    "synonym_de": "Nachweis / Bestätigung / Krankschreibung / ärztliches Zeugnis / Beleg / AU-Bescheinigung",
    "synonym_en": "proof / confirmation / sick leave note / medical report / receipt / sick note",
    "exampleContext": "Bei Erkrankung über 3 Kalendertage ist eine ärztliche Bescheinigung vorzulegen.",
    "exampleContext_en": "In case of illness exceeding 3 calendar days, a doctor's certificate must be submitted.",
    "trapWarning": "'Attest' oder 'AU-Bescheinigung' meint immer die offizielle Krankschreibung vom Arzt.",
    "trapWarning_en": "'Attest' or 'AU-Bescheinigung' always refers to the official doctor's sick note."
  },
  {
    "id": "kw-deposit",
    "keyword": "Kaution",
    "keyword_en": "rental deposit",
    "synonym_de": "Mietsicherheit / Sicherheitsleistung / Pfand / Rücklage für Schäden",
    "synonym_en": "security deposit / rental bond / security guarantee / damage buffer",
    "exampleContext": "Die Kaution beträgt drei Nettokaltmieten und wird auf einem Sperrkonto hinterlegt.",
    "exampleContext_en": "The deposit amounts to three months cold rent and is placed into a blocked account.",
    "trapWarning": "Die Kaution ist keine Miete, sondern eine rückzahlbare Sicherheit bei Auszug.",
    "trapWarning_en": "The deposit is not rent, but a refundable security upon moving out."
  },
  {
    "id": "kw-landlord",
    "keyword": "Vermieter / Eigentümer",
    "keyword_en": "landlord / owner",
    "synonym_de": "Hausverwaltung / Wohnungsbesitzer / Hausbesitzer / Wohnungsgeber",
    "synonym_en": "property management / apartment owner / homeowner / housing provider",
    "exampleContext": "Die Mängel in der Wohnung müssen der Hausverwaltung schriftlich mitgeteilt werden.",
    "exampleContext_en": "Defects in the apartment must be communicated to property management in writing.",
    "trapWarning": "Mängelanzeigen gehen meist an die 'Hausverwaltung', die den Vermieter vertritt.",
    "trapWarning_en": "Defect notices usually go to 'Hausverwaltung', representing the landlord."
  },
  {
    "id": "kw-job-offer",
    "keyword": "Stellenangebot / Stellenausschreibung",
    "keyword_en": "job advertisement",
    "synonym_de": "freie Stelle / wir suchen / Vakanz / Arbeitsplatz / Stellengesuch (Bewerber)",
    "synonym_en": "open vacancy / we are hiring / vacancy / job position / job inquiry",
    "exampleContext": "Unser Handwerksbetrieb sucht ab sofort einen zuverlässigen Anlagenmechaniker (m/w/d).",
    "exampleContext_en": "Our trade business is looking immediately for a reliable plant mechanic (m/f/d).",
    "trapWarning": "Achtung: 'Stellenangebot' = Firma sucht Mitarbeiter; 'Stellengesuch' = Arbeitssuchender sucht Job!",
    "trapWarning_en": "Exam trap: 'Stellenangebot' = employer hiring; 'Stellengesuch' = jobseeker seeking work!"
  },
  {
    "id": "kw-resume",
    "keyword": "Lebenslauf",
    "keyword_en": "curriculum vitae (CV)",
    "synonym_de": "Curriculum Vitae / CV / beruflicher Werdegang / Ausbildungsweg / Bewerbungsmappe",
    "synonym_en": "curriculum vitae / CV / career history / educational track / application folder",
    "exampleContext": "Bitte senden Sie uns Ihre vollständigen Bewerbungsunterlagen inklusive tabellarischem Lebenslauf.",
    "exampleContext_en": "Please send us your complete application documents including a tabular CV.",
    "trapWarning": "In Deutschland wird fast immer ein 'tabellarischer Lebenslauf' mit Monatsangaben verlangt.",
    "trapWarning_en": "In Germany, a 'tabular CV' with month-by-month dates is almost always required."
  },
  {
    "id": "kw-fulltime",
    "keyword": "Vollzeit",
    "keyword_en": "full-time",
    "synonym_de": "40-Stunden-Woche / ganztags / Vollzeitstelle / 100% Beschäftigung / 38,5 Stunden",
    "synonym_en": "40-hour week / full day / full-time post / 100% employment / 38.5 hours",
    "exampleContext": "Wir bieten eine Festanstellung in Vollzeit mit 38,5 Wochenstunden.",
    "exampleContext_en": "We offer a permanent full-time position with 38.5 hours per week.",
    "trapWarning": "'Ganztags' oder '40 Std.' = Vollzeit; 'Teilzeit' = deutlich weniger Stunden.",
    "trapWarning_en": "'Ganztags' or '40 hours' = full-time; 'Teilzeit' = significantly fewer hours."
  },
  {
    "id": "kw-parttime",
    "keyword": "Teilzeit / halbtags",
    "keyword_en": "part-time / half-days",
    "synonym_de": "Stundenbasis / 20 Stunden pro Woche / Halbtagsstelle / Teilzeitbeschäftigung / Minijob",
    "synonym_en": "hourly basis / 20 hours per week / half-day job / part-time employment / minijob",
    "exampleContext": "Die Stelle ist ab sofort in Teilzeit mit 20 Stunden wöchentlich zu besetzen.",
    "exampleContext_en": "The position is to be filled immediately on a part-time basis with 20 hours weekly.",
    "trapWarning": "Achtung bei Lesetexten: Verwechseln Sie nicht die Anforderungen für Vollzeit und Teilzeit.",
    "trapWarning_en": "Careful in reading tests: Do not mix up requirements for full-time and part-time."
  },
  {
    "id": "kw-delay-transport",
    "keyword": "Verspätung / Verzögerung",
    "keyword_en": "delay",
    "synonym_de": "später kommen / unpünktlich / Verspätungsmeldung / Wartedauer / verspätet sich um",
    "synonym_en": "arriving late / unpunctual / delay report / waiting time / delayed by",
    "exampleContext": "Wegen einer Weichenstörung verspätet sich der ICE 582 um circa 25 Minuten.",
    "exampleContext_en": "Due to a switch malfunction, ICE 582 is delayed by approximately 25 minutes.",
    "trapWarning": "'Verzögerung' im Bahnverkehr bedeutet immer Verspätung.",
    "trapWarning_en": "'Verzögerung' in rail transit always means a delay."
  },
  {
    "id": "kw-replacement-bus",
    "keyword": "Schienenersatzverkehr (SEV)",
    "keyword_en": "rail replacement bus service",
    "synonym_de": "Ersatzbus / Busse statt Bahnen / Streckensperrung / SEV-Haltestelle",
    "synonym_en": "replacement bus / buses instead of trains / track closure / replacement bus stop",
    "exampleContext": "Zwischen Hauptbahnhof und Ostkreuz ist wegen Bauarbeiten Schienenersatzverkehr mit Bussen eingerichtet.",
    "exampleContext_en": "Rail replacement bus service has been established between main station and Ostkreuz due to construction.",
    "trapWarning": "Bei 'SEV' fährt KEIN Zug, sondern ein Bus vor dem Bahnhofsgebäude!",
    "trapWarning_en": "With 'SEV', NO train runs; a bus departs in front of the station building!"
  },
  {
    "id": "kw-prescription",
    "keyword": "Rezept",
    "keyword_en": "prescription",
    "synonym_de": "ärztliche Verordnung / Verschreibung / E-Rezept / Medikamentenschein / rosa Schein",
    "synonym_en": "medical prescription / prescription / e-prescription / medication slip / pink slip",
    "exampleContext": "Für verschreibungspflichtige Medikamente müssen Sie das E-Rezept auf Ihrer Gesundheitskarte vorzeigen.",
    "exampleContext_en": "For prescription drugs, you must show the e-prescription on your health insurance card.",
    "trapWarning": "'Rezept' beim Arzt bedeutet Medikamentenverordnung, nicht Kochanleitung!",
    "trapWarning_en": "'Rezept' at the doctor means a medication prescription, not a cooking recipe!"
  },
  {
    "id": "kw-health-insurance",
    "keyword": "Krankenkasse / Krankenversicherung",
    "keyword_en": "health insurance",
    "synonym_de": "gesetzliche Krankenversicherung (GKV) / AOK / TK / Barmer / elektronische Gesundheitskarte",
    "synonym_en": "statutory health insurance / public health insurance / electronic health card",
    "exampleContext": "Bitte bringen Sie zu jedem Arztbesuch Ihre gültige elektronische Gesundheitskarte mit.",
    "exampleContext_en": "Please bring your valid electronic health card to every doctor visit.",
    "trapWarning": "Ohne gültige Gesundheitskarte müssen Sie die Behandlungskosten eventuell privat vorstrecken.",
    "trapWarning_en": "Without a valid card, you may have to pay upfront privately."
  },
  {
    "id": "kw-deadline",
    "keyword": "Frist / Abgabetermin",
    "keyword_en": "deadline",
    "synonym_de": "bis spätestens / Stichtag / Fristende / Termin einhalten / Fristablauf",
    "synonym_en": "by latest / cutoff date / end of deadline / meet the deadline / expiration of deadline",
    "exampleContext": "Die Antragsunterlagen müssen bis spätestens 31. März bei der Behörde eingegangen sein.",
    "exampleContext_en": "Application documents must have reached the authority by March 31st at the latest.",
    "trapWarning": "'Frist' = harter Stichtag. Nach Fristablauf wird der Antrag ohne Prüfung abgelehnt.",
    "trapWarning_en": "'Frist' = strict deadline. After expiration, applications are rejected without review."
  },
  {
    "id": "kw-contract",
    "keyword": "Vertrag",
    "keyword_en": "contract / agreement",
    "synonym_de": "Vereinbarung / Kontrakt / Klausel / Vertragskonditionen / Vertragsabschluss",
    "synonym_en": "agreement / contract / clause / contract terms / signing of contract",
    "exampleContext": "Vor Vertragsabschluss sollten Sie alle Klauseln im Mietvertrag gründlich durchlesen.",
    "exampleContext_en": "Before signing the agreement, you should thoroughly read all clauses in the rental contract.",
    "trapWarning": "Unterschriebene Verträge sind rechtlich bindend (kein 14-tägiges Rücktrittsrecht im Laden!).",
    "trapWarning_en": "Signed contracts are legally binding (no 14-day cancellation right in physical stores!)."
  },
  {
    "id": "kw-cancellation-period",
    "keyword": "Kündigungsfrist",
    "keyword_en": "notice period for cancellation",
    "synonym_de": "fristgerecht kündigen / Frist zur Kündigung / 3 Monate zum Monatsende / Kündigungszeit",
    "synonym_en": "timely cancellation / cancellation window / 3 months to month end / notice period",
    "exampleContext": "Die Kündigungsfrist für den Mietvertrag beträgt gesetzlich drei Monate.",
    "exampleContext_en": "The statutory notice period for the rental contract is three months.",
    "trapWarning": "Wer die Kündigungsfrist verpasst, muss den Vertrag oft um weitere Monate bezahlen.",
    "trapWarning_en": "If you miss the notice period, you must continue paying the contract for more months."
  }
];

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
  },
  {
    id: "reading-q6",
    title: "Stellenanzeige: Zahnarztpraxis Dr. Weigel",
    sourceType: "Jobportal / Zeitungsanzeige (TELC B1 Lesen)",
    text_de: `Wir suchen Verstärkung für unser Team!
Moderne Zahnarztpraxis in Köln-Deutz sucht ab dem 1. nächsten Monats eine freundliche und engagierte Zahnmedizinische Fachangestellte (m/w/d).
Beschäftigungsumfang: Teilzeit mit 25 Wochenstunden, vorwiegend vormittags von 08:00 bis 13:00 Uhr.
Wir bieten: Überdurchschnittliche Bezahlung, 30 Tage Urlaub sowie ein Jobticket für den Nahverkehr.
Voraussetzung: Abgeschlossene Berufsausbildung und Deutschkenntnisse mindestens auf B2-Niveau.
Bitte senden Sie Ihre Bewerbungsunterlagen bis zum 15. des Monats per E-Mail an bewerbung@praxis-weigel.de.`,
    text_en: `We are looking for team reinforcement!
Modern dental clinic in Cologne-Deutz is seeking a friendly and committed dental assistant (m/f/d) starting the 1st of next month.
Working hours: Part-time with 25 hours per week, primarily mornings from 8:00 AM to 1:00 PM.
We offer: Above-average compensation, 30 days vacation, and a local transit pass.
Requirement: Completed vocational training and German language skills at least B2.
Please send your application by email by the 15th of the month.`,
    question_de: "Welche Aussage über das Stellenangebot ist richtig?",
    question_en: "Which statement about the job offer is correct?",
    options: [
      { de: "Es handelt sich um eine Vollzeitstelle mit 40 Wochenstunden.", en: "It is a full-time position with 40 hours per week." },
      { de: "Die Arbeitszeit umfasst 25 Stunden pro Woche, hauptsächlich am Vormittag.", en: "The work hours comprise 25 hours per week, mainly in the morning." },
      { de: "Bewerbungen werden ausschließlich auf dem Postweg entgegengenommen.", en: "Applications are accepted exclusively by postal mail." },
      { de: "Deutschkenntnisse auf A1-Niveau reichen völlig aus.", en: "German skills at A1 level are completely sufficient." }
    ],
    correct: 1,
    keywordHint: "Signalwort: 'Teilzeit mit 25 Wochenstunden, vorwiegend vormittags' = Arbeitszeit 25 Std./Woche am Vormittag.",
    keywordHint_en: "Signal phrase: 'Teilzeit mit 25 Wochenstunden, vorwiegend vormittags' matches the correct answer."
  },
  {
    id: "reading-q7",
    title: "Mitteilung: Ablesung der Heizungszähler",
    sourceType: "Aushang der Hausverwaltung (DTZ B1 Lesen)",
    text_de: `Ankündigung für alle Mieterinnen und Mieter:
Am kommenden Donnerstag, den 18. November, finden zwischen 09:00 und 13:00 Uhr die jährlichen Ablesungen der Heizkostenverteiler und Wasserzähler in allen Wohnungen statt.
Bitte stellen Sie sicher, dass der Ablesedienst ungehinderten Zugang zu allen Heizkörpern und Zählern in Ihrer Wohnung hat.
Sollten Sie zu diesem Termin beruflich verhindert sein, bitten wir Sie dringend, einen Wohnungsschlüssel bei einem Nachbarn Ihres Vertrauens zu hinterlegen und einen Zettel an Ihrer Wohnungstür anzubringen.
Ein zweiter kostenloser Ablesetermin kann aus organisatorischen Gründen leider nicht angeboten werden.`,
    text_en: `Notice for all tenants:
Next Thursday, November 18, between 9:00 AM and 1:00 PM, annual readings of heating meters and water meters will take place in all apartments.
Please ensure that reading personnel have unobstructed access to all radiators and meters in your flat.
If you are unable to be present due to work, we urgently ask you to leave an apartment key with a trusted neighbor and put a note on your apartment door.
A second free reading date unfortunately cannot be offered for organizational reasons.`,
    question_de: "Was müssen Mieter tun, die am Donnerstagvormittag nicht zu Hause sein können?",
    question_en: "What must tenants do who cannot be home on Thursday morning?",
    options: [
      { de: "Den Ablesetermin telefonisch auf den nächsten Samstag verschieben.", en: "Postpone the reading date to next Saturday by phone." },
      { de: "Einen Schlüssel bei einem Nachbarn hinterlegen und einen Hinweis an der Tür anbringen.", en: "Deposit a key with a neighbor and leave a note on the door." },
      { de: "Die Zählerstände selbst ablesen und per E-Mail einsenden.", en: "Read the meter values themselves and send them by email." },
      { de: "Nichts, der Ablesedienst kommt automatisch nächste Woche wieder.", en: "Nothing, the reading service comes back automatically next week." }
    ],
    correct: 1,
    keywordHint: "Signal im Text: 'Wohnungsschlüssel bei einem Nachbarn hinterlegen und einen Zettel an der Tür anbringen'.",
    keywordHint_en: "Signal in text: 'Leave a key with a neighbor and put a note on the door'."
  },
  {
    id: "reading-q8",
    title: "Praxisaushang: Praxisurlaub Dr. med. Weber",
    sourceType: "Aushang an der Praxistür (Goethe / TELC B1)",
    text_de: `Liebe Patientinnen und Patienten,
unsere Praxis bleibt wegen Urlaubs von Montag, 02. August, bis einschließlich Freitag, 13. August, geschlossen.
Die Vertretung in dringenden akuten Fällen übernimmt freundlicherweise die Gemeinschaftspraxis Dr. Neumann & Partner, Bahnhofstraße 14, Tel.: 089 445566 (bitte vorher anrufen!).
Ab Montag, den 16. August, sind wir ab 08:00 Uhr wieder wie gewohnt für Sie da.
In lebensbedrohlichen Notfällen wählen Sie bitte sofort die Notrufnummer 112.
Außerhalb der regulären Praxiszeiten sowie am Wochenende erreichen Sie den ärztlichen Bereitschaftsdienst bundesweit unter der kostenfreien Telefonnummer 116 117.`,
    text_en: `Dear patients,
Our clinic will be closed for vacation from Monday, August 2nd through Friday, August 13th.
Substitute medical coverage for urgent acute cases is kindly provided by the joint practice Dr. Neumann & Partner, Bahnhofstraße 14, Phone: 089 445566 (please call beforehand!).
Starting Monday, August 16th, we are open as usual from 8:00 AM.
In life-threatening emergencies, dial 112 immediately.
Outside regular clinic hours and on weekends, reach the non-emergency medical service nationwide at freephone 116 117.`,
    question_de: "An wen können sich Patienten mit akuten Beschwerden an einem Werktag während des Urlaubs wenden?",
    question_en: "Whom can patients contact with acute complaints on a weekday during the holiday?",
    options: [
      { de: "Ausschließlich an den Notruf 112.", en: "Exclusively emergency call 112." },
      { de: "An die Vertretungspraxis Dr. Neumann in der Bahnhofstraße nach telefonischer Anmeldung.", en: "To the substitute clinic Dr. Neumann on Bahnhofstraße after calling ahead." },
      { de: "Man muss warten, bis Dr. Weber am 16. August wieder öffnet.", en: "One must wait until Dr. Weber reopens on August 16th." },
      { de: "An die Apotheke im Bahnhofsviertel.", en: "To the pharmacy in the station district." }
    ],
    correct: 1,
    keywordHint: "Schlüsselbegriff: 'Die Vertretung übernimmt freundlicherweise Dr. Neumann... bitte vorher anrufen!'.",
    keywordHint_en: "Keyword signal: 'Vertretung übernimmt Dr. Neumann' with note to call ahead."
  },
  {
    id: "reading-q9",
    title: "Fahrgastinformation: S-Bahn-Streckensperrung",
    sourceType: "Aushang am Bahnsteig / App-Meldung (TELC B1 Lesen)",
    text_de: `Achtung Fahrgäste der Linie S3 und S5:
Wegen Gleiserneuerungs- und Brückenarbeiten ist der Streckenabschnitt zwischen Ostbahnhof und Alexanderplatz von Freitag, 22:00 Uhr, bis Montag, 04:00 Uhr, für den gesamten Zugverkehr gesperrt.
Für die Fahrgäste ist ein Schienenersatzverkehr (SEV) mit Niederflurbussen eingerichtet. Die Busse halten direkt an den gekennzeichneten Haltestellen vor den jeweiligen Bahnhofsgebäuden.
Fahrzeitverlängerung: Bitte planen Sie bis zu 20 Minuten mehr Reisezeit ein.
Wichtiger Hinweis: Die Mitnahme von Fahrrädern ist in den Ersatzbussen aus Platz- und Sicherheitsgründen leider nicht gestattet. Rollstühle und Kinderwagen haben stets Vorrang.`,
    text_en: `Attention passengers of lines S3 and S5:
Due to track and bridge renewal work, the line section between Ostbahnhof and Alexanderplatz is closed to all rail traffic from Friday 10:00 PM until Monday 4:00 AM.
Rail replacement service (SEV) with low-floor buses has been set up for passengers. Buses stop at designated stops directly in front of the station buildings.
Increased travel time: Please allow up to 20 additional minutes.
Important note: Bicycle carriage is unfortunately not permitted on replacement buses due to space and safety reasons. Wheelchairs and strollers always have priority.`,
    question_de: "Welche Regel gilt für den Schienenersatzverkehr (SEV)?",
    question_en: "Which rule applies to the rail replacement service (SEV)?",
    options: [
      { de: "Fahrräder dürfen jederzeit im Ersatzbus mitgenommen werden.", en: "Bicycles may be taken onto the replacement bus anytime." },
      { de: "Fahrräder sind in den Ersatzbussen nicht erlaubt, Kinderwagen haben Vorrang.", en: "Bicycles are not allowed in replacement buses; strollers have priority." },
      { de: "Die Busse fahren ohne Zwischenhalt direkt zum Flughafen.", en: "The buses run nonstop directly to the airport." },
      { de: "Die Züge verkehren trotz der Bauarbeiten im 10-Minuten-Takt.", en: "The trains operate every 10 minutes despite construction." }
    ],
    correct: 1,
    keywordHint: "Signal: 'Mitnahme von Fahrrädern ist nicht gestattet. Rollstühle und Kinderwagen haben stets Vorrang'.",
    keywordHint_en: "Signal: 'Carriage of bicycles is not permitted. Strollers and wheelchairs have priority'."
  },
  {
    id: "reading-q10",
    title: "Kundeninformation: Rückgaberecht bei MediaMarkt",
    sourceType: "Kassenbeleg & Hinweisschild im Geschäft (DTZ B1 Lesen)",
    text_de: `Zufriedenheitsgarantie für Ihren Einkauf:
Wir möchten, dass Sie mit Ihren Geräten rundum zufrieden sind. Deshalb gewähren wir Ihnen ein freiwilliges Rückgaberecht von 14 Tagen ab Kaufdatum.
Bedingungen für den Umtausch oder die Rückerstattung des Kaufpreises:
1. Der Artikel muss unbenutzt, unbeschädigt und in der Originalverpackung vorliegen.
2. Die Vorlage des Original-Kassenbons ist zwingend erforderlich. Ohne Kassenbon ist weder ein Umtausch noch eine Geldauszahlung möglich.
Ausnahmen: Vom Rückgaberecht ausgeschlossen sind entsiegelte Software, Kopfhörer und Hygieneartikel sowie geöffnete Ton- und Datenträger.`,
    text_en: `Satisfaction guarantee for your purchase:
We want you to be completely satisfied with your devices. Therefore we grant a voluntary return period of 14 days from date of purchase.
Conditions for exchange or purchase price refund:
1. The item must be unused, undamaged, and in the original packaging.
2. Presentation of original purchase receipt is strictly mandatory. Without receipt neither exchange nor refund is possible.
Exceptions: Excluded from returns are unsealed software, headphones, hygiene articles, and opened media storage devices.`,
    question_de: "Was ist unbedingt notwendig, um einen gekauften Artikel zurückzugeben?",
    question_en: "What is strictly necessary to return a purchased item?",
    options: [
      { de: "Eine schriftliche Erklärung des Herstellers.", en: "A written explanation from the manufacturer." },
      { de: "Der Original-Kassenbon und die unbeschädigte Originalverpackung.", en: "The original receipt and undamaged original packaging." },
      { de: "Ein Nachweis über eine deutsche Bankverbindung.", en: "Proof of a German bank account." },
      { de: "Nur die Vorlage des Personalausweises ohne Quittung.", en: "Only showing an identity card without a receipt." }
    ],
    correct: 1,
    keywordHint: "Signalwörter: 'Vorlage des Original-Kassenbons ist zwingend erforderlich' und 'in der Originalverpackung'.",
    keywordHint_en: "Signal phrases: 'Presentation of original receipt is strictly required' and 'in original packaging'."
  }
];
