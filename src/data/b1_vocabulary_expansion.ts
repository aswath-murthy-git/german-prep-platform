export type B1VocabularyCategory =
  | "ARBEIT"
  | "WOHNEN"
  | "BEHOERDEN"
  | "GESUNDHEIT"
  | "REKLAMATION"
  | "VERKEHR"
  | "EINKAUFEN"
  | "FAMILIE"
  | "FREIZEIT"
  | "REISE"
  | "KOMMUNIKATION";

export interface B1VocabularyWord {
  id: string;
  german: string;
  article?: "der" | "die" | "das";
  plural?: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "phrase";
  english: string;
  category: B1VocabularyCategory;
  example_de: string;
  example_en: string;
  examSignalTip: string;
  highYieldB1PassScore: boolean;
}

const CORE_B1_VOCABULARY: B1VocabularyWord[] = [
  // ── 1. ARBEIT & BERUF (WORK & CAREER) ──
  {
    id: "arb-1",
    german: "Arbeitsvertrag",
    article: "der",
    plural: "die Arbeitsverträge",
    partOfSpeech: "noun",
    english: "employment contract",
    category: "ARBEIT",
    example_de: "Ich habe den Arbeitsvertrag heute unterschrieben.",
    example_en: "I signed the employment contract today.",
    examSignalTip: "Frequently tested in reading part 2 and writing job inquiries.",
    highYieldB1PassScore: true
  },
  {
    id: "arb-2",
    german: "Kündigungsfrist",
    article: "die",
    plural: "die Kündigungsfristen",
    partOfSpeech: "noun",
    english: "notice period (for resignation or dismissal)",
    category: "ARBEIT",
    example_de: "Die Kündigungsfrist beträgt drei Monate zum Monatsende.",
    example_en: "The notice period is three months to the end of the month.",
    examSignalTip: "Look for numbers in months or weeks next to this keyword in contract texts.",
    highYieldB1PassScore: true
  },
  {
    id: "arb-3",
    german: "Überstunden",
    article: "die",
    plural: "die Überstunden",
    partOfSpeech: "noun",
    english: "overtime hours",
    category: "ARBEIT",
    example_de: "Letzten Monat habe ich 15 Überstunden geleistet.",
    example_en: "Last month I worked 15 overtime hours.",
    examSignalTip: "Collocation with 'leisten' or 'abbauen' (to work overtime / take time off in lieu).",
    highYieldB1PassScore: true
  },
  {
    id: "arb-4",
    german: "befristet / unbefristet",
    partOfSpeech: "adjective",
    english: "fixed-term / permanent (indefinite)",
    category: "ARBEIT",
    example_de: "Meine Stelle ist leider auf ein Jahr befristet.",
    example_en: "My job position is unfortunately limited to one year.",
    examSignalTip: "'befristet' = limited time contract; 'unbefristet' = permanent job.",
    highYieldB1PassScore: true
  },
  {
    id: "arb-5",
    german: "Probezeit",
    article: "die",
    plural: "die Probezeiten",
    partOfSpeech: "noun",
    english: "probationary period",
    category: "ARBEIT",
    example_de: "Während der Probezeit kann mit zwei Wochen Frist gekündigt werden.",
    example_en: "During the probation period, employment can be terminated with two weeks notice.",
    examSignalTip: "Usually 6 months in Germany. High exam trap for reading dates.",
    highYieldB1PassScore: true
  },
  {
    id: "arb-6",
    german: "Bewerbungsunterlagen",
    article: "die",
    plural: "die Bewerbungsunterlagen",
    partOfSpeech: "noun",
    english: "application documents (CV, certificates, cover letter)",
    category: "ARBEIT",
    example_de: "Bitte senden Sie Ihre vollständigen Bewerbungsunterlagen per E-Mail.",
    example_en: "Please send your complete application documents via email.",
    examSignalTip: "Must-know for Schreiben Template 6 (Job application).",
    highYieldB1PassScore: true
  },
  {
    id: "arb-7",
    german: "Gehaltsabrechnung",
    article: "die",
    plural: "die Gehaltsabrechnungen",
    partOfSpeech: "noun",
    english: "payslip / salary statement",
    category: "ARBEIT",
    example_de: "Die Gehaltsabrechnung wird am Monatsende ausgestellt.",
    example_en: "The payslip is issued at the end of the month.",
    examSignalTip: "Synonym: 'Lohnabrechnung'. Needed for apartment applications.",
    highYieldB1PassScore: false
  },
  {
    id: "arb-8",
    german: "Fortbildung",
    article: "die",
    plural: "die Fortbildungen",
    partOfSpeech: "noun",
    english: "further training / professional development",
    category: "ARBEIT",
    example_de: "Ich nehme nächste Woche an einer Fortbildung teil.",
    example_en: "I am taking part in a training course next week.",
    examSignalTip: "Synonym: 'Weiterbildung'. Collocation: 'an einer Fortbildung teilnehmen'.",
    highYieldB1PassScore: true
  },

  // ── 2. WOHNEN & MIETVERTRAG (HOUSING & RENTAL) ──
  {
    id: "woh-1",
    german: "Kaution",
    article: "die",
    plural: "die Kautionen",
    partOfSpeech: "noun",
    english: "security deposit (for rental apartment)",
    category: "WOHNEN",
    example_de: "Die Kaution beträgt drei Monatskaltmieten.",
    example_en: "The security deposit amounts to three months base rent.",
    examSignalTip: "Almost always 3 months 'Kaltmiete'. Often tested in classified ads.",
    highYieldB1PassScore: true
  },
  {
    id: "woh-2",
    german: "Nebenkosten",
    article: "die",
    plural: "die Nebenkosten",
    partOfSpeech: "noun",
    english: "utility costs / service charges (heating, water, waste)",
    category: "WOHNEN",
    example_de: "Die Warmmiete beträgt 850 Euro inklusive Nebenkosten.",
    example_en: "The warm rent is 850 euros including utility costs.",
    examSignalTip: "Formula: Kaltmiete + Nebenkosten = Warmmiete (Gesamtmiete).",
    highYieldB1PassScore: true
  },
  {
    id: "woh-3",
    german: "Hausordnung",
    article: "die",
    plural: "die Hausordnungen",
    partOfSpeech: "noun",
    english: "house rules / building regulations",
    category: "WOHNEN",
    example_de: "Laut Hausordnung gilt ab 22:00 Uhr die Nachtruhe.",
    example_en: "According to the house rules, quiet hours apply from 10:00 PM.",
    examSignalTip: "Crucial for Reading Set 5 and complaint letters regarding noise.",
    highYieldB1PassScore: true
  },
  {
    id: "woh-4",
    german: "Mängel",
    article: "die",
    plural: "die Mängel (singular: der Mangel)",
    partOfSpeech: "noun",
    english: "defects / faults / damages",
    category: "WOHNEN",
    example_de: "Ich habe den Vermieter über die Mängel an den Fenstern informiert.",
    example_en: "I informed the landlord about the defects on the windows.",
    examSignalTip: "Core keyword for B1 Schreiben Template 5 (Mängelanzeige).",
    highYieldB1PassScore: true
  },
  {
    id: "woh-5",
    german: "Mieterhöhung",
    article: "die",
    plural: "die Mieterhöhungen",
    partOfSpeech: "noun",
    english: "rent increase",
    category: "WOHNEN",
    example_de: "Der Vermieter kündigte eine Mieterhöhung um 50 Euro an.",
    example_en: "The landlord announced a rent increase of 50 euros.",
    examSignalTip: "Frequently appears in reading letters and tenant association texts.",
    highYieldB1PassScore: true
  },
  {
    id: "woh-6",
    german: "Ruhezeiten",
    article: "die",
    plural: "die Ruhezeiten",
    partOfSpeech: "noun",
    english: "quiet hours (Nachtruhe, Mittagsruhe)",
    category: "WOHNEN",
    example_de: "Bitte beachten Sie die gesetzlichen Ruhezeiten zwischen 13:00 und 15:00 Uhr.",
    example_en: "Please observe the legal quiet hours between 1:00 PM and 3:00 PM.",
    examSignalTip: "Reading trap: doing laundry or vacuuming during quiet hours is forbidden.",
    highYieldB1PassScore: true
  },

  // ── 3. BEHÖRDEN & ÄMTER (AUTHORITIES & CITIZEN SERVICES) ──
  {
    id: "beh-1",
    german: "Aufenthaltstitel",
    article: "der",
    plural: "die Aufenthaltstitel",
    partOfSpeech: "noun",
    english: "residence permit",
    category: "BEHOERDEN",
    example_de: "Mein Aufenthaltstitel muss vor Ablauf verlängert werden.",
    example_en: "My residence permit must be extended before expiration.",
    examSignalTip: "Top topic in Ausländerbehörde official letters and appointment bookings.",
    highYieldB1PassScore: true
  },
  {
    id: "beh-2",
    german: "Meldebescheinigung",
    article: "die",
    plural: "die Meldebescheinigungen",
    partOfSpeech: "noun",
    english: "registration certificate (address confirmation from Bürgeramt)",
    category: "BEHOERDEN",
    example_de: "Für die Bank brauche ich eine aktuelle Meldebescheinigung.",
    example_en: "For the bank I need a current registration certificate.",
    examSignalTip: "Issued after the 'Anmeldung' at the Einwohnermeldeamt / Bürgeramt.",
    highYieldB1PassScore: true
  },
  {
    id: "beh-3",
    german: "Frist einhalten",
    partOfSpeech: "phrase",
    english: "to comply with a deadline",
    category: "BEHOERDEN",
    example_de: "Sie müssen die gesetzliche Frist von zwei Wochen unbedingt einhalten.",
    example_en: "You must strictly comply with the statutory two-week deadline.",
    examSignalTip: "Collocation: 'eine Frist setzen' (set deadline) / 'Frist versäumen' (miss deadline).",
    highYieldB1PassScore: true
  },
  {
    id: "beh-4",
    german: "Antrag stellen",
    partOfSpeech: "phrase",
    english: "to submit an application",
    category: "BEHOERDEN",
    example_de: "Ich habe einen Antrag auf Einbürgerung gestellt.",
    example_en: "I submitted an application for citizenship.",
    examSignalTip: "Synonym: 'einen Antrag einreichen / beantragen'.",
    highYieldB1PassScore: true
  },
  {
    id: "beh-5",
    german: "Bescheid",
    article: "der",
    plural: "die Bescheide",
    partOfSpeech: "noun",
    english: "official notice / formal decision letter from authority",
    category: "BEHOERDEN",
    example_de: "Der schriftliche Bescheid wird Ihnen per Post zugestellt.",
    example_en: "The written formal decision will be delivered to you by mail.",
    examSignalTip: "Also in idioms: 'Bescheid geben' (let someone know) / 'Bescheid wissen' (to know about it).",
    highYieldB1PassScore: true
  },

  // ── 4. GESUNDHEIT & ARZT (HEALTH & MEDICAL) ──
  {
    id: "ges-1",
    german: "Krankschreibung",
    article: "die",
    plural: "die Krankschreibungen",
    partOfSpeech: "noun",
    english: "sick leave certificate (AU-Bescheinigung / gelber Schein)",
    category: "GESUNDHEIT",
    example_de: "Ich habe dem Arbeitgeber meine Krankschreibung geschickt.",
    example_en: "I sent my sick leave certificate to my employer.",
    examSignalTip: "Formal term: 'Arbeitsunfähigkeitsbescheinigung' (AU). Crucial for Schreiben Template 4.",
    highYieldB1PassScore: true
  },
  {
    id: "ges-2",
    german: "Überweisung",
    article: "die",
    plural: "die Überweisungen",
    partOfSpeech: "noun",
    english: "referral to a medical specialist",
    category: "GESUNDHEIT",
    example_de: "Der Hausarzt gab mir eine Überweisung zum Kardiologen.",
    example_en: "The general practitioner gave me a referral to a cardiologist.",
    examSignalTip: "Also means 'bank transfer' in banking! Context determines meaning.",
    highYieldB1PassScore: true
  },
  {
    id: "ges-3",
    german: "Rezept",
    article: "das",
    plural: "die Rezepte",
    partOfSpeech: "noun",
    english: "medical prescription (or cooking recipe)",
    category: "GESUNDHEIT",
    example_de: "Der Arzt hat mir ein Rezept für Antibiotika ausgestellt.",
    example_en: "The doctor issued me a prescription for antibiotics.",
    examSignalTip: "Collocation: 'ein Rezept einlösen' (fill prescription at pharmacy).",
    highYieldB1PassScore: true
  },
  {
    id: "ges-4",
    german: "Beschwerden",
    article: "die",
    plural: "die Beschwerden",
    partOfSpeech: "noun",
    english: "symptoms / ailments / physical complaints",
    category: "GESUNDHEIT",
    example_de: "Seit drei Tagen habe ich starke Beschwerden im Rücken.",
    example_en: "For three days I have had severe symptoms in my back.",
    examSignalTip: "Doctor's question: 'Welche Beschwerden haben Sie?'",
    highYieldB1PassScore: true
  },
  {
    id: "ges-5",
    german: "Notaufnahme",
    article: "die",
    plural: "die Notaufnahmen",
    partOfSpeech: "noun",
    english: "emergency room (hospital ER)",
    category: "GESUNDHEIT",
    example_de: "Bei akuten Notfällen wenden Sie sich an die Notaufnahme.",
    example_en: "In acute emergencies, contact the emergency room.",
    examSignalTip: "Emergency phone: 112 (Fire/Ambulance), 116 117 (On-call medical service).",
    highYieldB1PassScore: false
  },

  // ── 5. REKLAMATION & REKLAMIEREN (COMPLAINTS & REFUNDS) ──
  {
    id: "rek-1",
    german: "Garantie",
    article: "die",
    plural: "die Garantien",
    partOfSpeech: "noun",
    english: "warranty / guarantee",
    category: "REKLAMATION",
    example_de: "Auf dieses Haushaltsgerät gibt es zwei Jahre Garantie.",
    example_en: "There is a two-year warranty on this household appliance.",
    examSignalTip: "Phrase: 'unter Garantie fallen' / 'innerhalb der Garantiezeit'.",
    highYieldB1PassScore: true
  },
  {
    id: "rek-2",
    german: "Rückerstattung",
    article: "die",
    plural: "die Rückerstattungen",
    partOfSpeech: "noun",
    english: "refund (money back)",
    category: "REKLAMATION",
    example_de: "Ich bitte um die volle Rückerstattung des Kaufpreises.",
    example_en: "I request a full refund of the purchase price.",
    examSignalTip: "Schreiben Template 1 key phrase: 'den Kaufpreis zurückerstatten'.",
    highYieldB1PassScore: true
  },
  {
    id: "rek-3",
    german: "beschädigt",
    partOfSpeech: "adjective",
    english: "damaged / broken",
    category: "REKLAMATION",
    example_de: "Das Paket kam leider stark beschädigt bei mir an.",
    example_en: "The package unfortunately arrived heavily damaged at my address.",
    examSignalTip: "Synonyms: 'defekt', 'kaputt', 'mangelhaft'.",
    highYieldB1PassScore: true
  },
  {
    id: "rek-4",
    german: "Ersatz",
    article: "der",
    partOfSpeech: "noun",
    english: "replacement / substitute",
    category: "REKLAMATION",
    example_de: "Ich fordere ein kostenloses Ersatzgerät.",
    example_en: "I demand a free replacement device.",
    examSignalTip: "Collocation: 'Ersatz fordern / liefern'.",
    highYieldB1PassScore: true
  },
  {
    id: "rek-5",
    german: "Kaufbeleg",
    article: "der",
    plural: "die Kaufbelege",
    partOfSpeech: "noun",
    english: "proof of purchase / receipt",
    category: "REKLAMATION",
    example_de: "Den Kaufbeleg habe ich dieser E-Mail als Anhang beigefügt.",
    example_en: "I have attached the proof of purchase to this email as an attachment.",
    examSignalTip: "Synonym: 'Quittung', 'Kassenbon', 'Rechnung'.",
    highYieldB1PassScore: true
  },

  // ── 6. VERKEHR, REISE & MOBILITÄT (TRANSIT & TRAVEL) ──
  {
    id: "ver-1",
    german: "Verspätung",
    article: "die",
    plural: "die Verspätungen",
    partOfSpeech: "noun",
    english: "delay",
    category: "VERKEHR",
    example_de: "Der ICE nach München hat heute circa 25 Minuten Verspätung.",
    example_en: "The ICE train to Munich has approximately 25 minutes delay today.",
    examSignalTip: "Tested in 90% of listening audio tasks: 'wegen einer technischen Störung'.",
    highYieldB1PassScore: true
  },
  {
    id: "ver-2",
    german: "Zugausfall",
    article: "der",
    plural: "die Zugausfälle",
    partOfSpeech: "noun",
    english: "train cancellation",
    category: "VERKEHR",
    example_de: "Wegen Streik kommt es heute zu mehreren Zugausfällen.",
    example_en: "Due to strike there are several train cancellations today.",
    examSignalTip: "Verb: 'ausfallen' (Der Zug fällt heute leider aus).",
    highYieldB1PassScore: true
  },
  {
    id: "ver-3",
    german: "Schienenersatzverkehr",
    article: "der",
    partOfSpeech: "noun",
    english: "rail replacement bus service (SEV)",
    category: "VERKEHR",
    example_de: "Zwischen Hauptbahnhof und Messe verkehrt ein Schienenersatzverkehr mit Bussen.",
    example_en: "Between main station and trade fair, a rail replacement bus service is running.",
    examSignalTip: "Abbreviated as 'SEV'. Very common in listening station announcements.",
    highYieldB1PassScore: true
  },
  {
    id: "ver-4",
    german: "Anschlusszug",
    article: "der",
    plural: "die Anschlusszüge",
    partOfSpeech: "noun",
    english: "connecting train",
    category: "VERKEHR",
    example_de: "Wegen der Verspätung habe ich meinen Anschlusszug verpasst.",
    example_en: "Due to the delay, I missed my connecting train.",
    examSignalTip: "Collocation: 'den Anschluss erreichen / verpassen'.",
    highYieldB1PassScore: true
  },
  {
    id: "ver-5",
    german: "Gleiswechsel",
    article: "der",
    plural: "die Gleiswechsel",
    partOfSpeech: "noun",
    english: "platform / track change",
    category: "VERKEHR",
    example_de: "Achtung an Gleis 4: Heute Gleiswechsel! Der Zug fährt ab Gleis 7.",
    example_en: "Attention at platform 4: Platform change today! The train departs from platform 7.",
    examSignalTip: "Audio keyword: 'heute von Gleis... statt Gleis...'.",
    highYieldB1PassScore: true
  }
];

// ---------------------------------------------------------------------------
// Compact builders for the expanded B1 pass vocabulary (A1 -> B1 exam focus).
// Verbs carry the Perfekt form inside the example sentence.
// ---------------------------------------------------------------------------
type Cat = B1VocabularyCategory;

const n = (
  id: string, category: Cat, article: "der" | "die" | "das", german: string, plural: string,
  english: string, example_de: string, example_en: string, examSignalTip: string, high = true
): B1VocabularyWord => ({
  id, german, article, plural, partOfSpeech: "noun", english, category,
  example_de, example_en, examSignalTip, highYieldB1PassScore: high
});

const v = (
  id: string, category: Cat, german: string, english: string,
  example_de: string, example_en: string, examSignalTip: string, high = true
): B1VocabularyWord => ({
  id, german, partOfSpeech: "verb", english, category,
  example_de, example_en, examSignalTip, highYieldB1PassScore: high
});

const a = (
  id: string, category: Cat, german: string, english: string,
  example_de: string, example_en: string, examSignalTip: string, high = true
): B1VocabularyWord => ({
  id, german, partOfSpeech: "adjective", english, category,
  example_de, example_en, examSignalTip, highYieldB1PassScore: high
});

const p = (
  id: string, category: Cat, german: string, english: string,
  example_de: string, example_en: string, examSignalTip: string, high = true
): B1VocabularyWord => ({
  id, german, partOfSpeech: "phrase", english, category,
  example_de, example_en, examSignalTip, highYieldB1PassScore: high
});

const EXPANDED_B1_VOCABULARY: B1VocabularyWord[] = [
  // ---------------- ARBEIT ----------------
  n("arb-9", "ARBEIT", "der", "Arbeitgeber", "die Arbeitgeber", "employer", "Mein Arbeitgeber zahlt das Gehalt immer pünktlich.", "My employer always pays the salary on time.", "Opposite: 'der Arbeitnehmer'. Very common in letters and contract texts."),
  n("arb-10", "ARBEIT", "der", "Arbeitnehmer", "die Arbeitnehmer", "employee (person who works for a company)", "Als Arbeitnehmer habe ich Anspruch auf 24 Urlaubstage.", "As an employee I am entitled to 24 days of vacation.", "Appears in Reading texts about rights at work."),
  n("arb-11", "ARBEIT", "die", "Stelle", "die Stellen", "job / position / vacancy", "Ich suche eine neue Stelle als Verkäuferin.", "I am looking for a new job as a sales assistant.", "'eine Stelle suchen / finden / anbieten'. Core word in job ads."),
  n("arb-12", "ARBEIT", "die", "Stellenanzeige", "die Stellenanzeigen", "job advertisement", "Ich habe Ihre Stellenanzeige im Internet gelesen.", "I read your job advertisement on the internet.", "Standard first sentence of an application letter."),
  n("arb-13", "ARBEIT", "das", "Vorstellungsgespräch", "die Vorstellungsgespräche", "job interview", "Morgen habe ich ein Vorstellungsgespräch bei einer Firma.", "Tomorrow I have a job interview at a company.", "Synonym: 'Bewerbungsgespräch'. Speaking Teil 1 can be role play about this."),
  n("arb-14", "ARBEIT", "der", "Lebenslauf", "die Lebensläufe", "CV / resume", "Bitte schicken Sie uns Ihren Lebenslauf und Ihr Zeugnis.", "Please send us your CV and your certificate.", "Always part of the 'Bewerbungsunterlagen'."),
  n("arb-15", "ARBEIT", "das", "Gehalt", "die Gehälter", "salary (monthly pay)", "Das Gehalt wird immer am Ende des Monats überwiesen.", "The salary is always transferred at the end of the month.", "Brutto = before tax, netto = after tax. Reading trap!"),
  n("arb-16", "ARBEIT", "der", "Mitarbeiter", "die Mitarbeiter", "employee / staff member / co-worker", "Unsere Firma hat zweihundert Mitarbeiter.", "Our company has two hundred employees.", "Female form: 'die Mitarbeiterin'. Frequent in announcements."),
  n("arb-17", "ARBEIT", "der", "Kollege", "die Kollegen", "colleague (male)", "Mein Kollege hilft mir bei dem neuen Computerprogramm.", "My colleague helps me with the new computer program.", "Female form: 'die Kollegin' (plural die Kolleginnen). N-declension: den Kollegen."),
  n("arb-18", "ARBEIT", "der", "Chef", "die Chefs", "boss (male)", "Mein Chef ist heute auf einer Dienstreise.", "My boss is on a business trip today.", "Female form: 'die Chefin'. Neutral formal word: 'der Vorgesetzte'."),
  n("arb-19", "ARBEIT", "die", "Besprechung", "die Besprechungen", "meeting / discussion", "Die Besprechung beginnt um 9:30 Uhr im Konferenzraum.", "The meeting starts at 9:30 in the conference room.", "Synonym: 'das Meeting'. Listening: time and room are often tested."),
  n("arb-20", "ARBEIT", "die", "Schicht", "die Schichten", "shift (work shift)", "Diese Woche arbeite ich in der Nachtschicht.", "This week I work the night shift.", "Compounds: Frühschicht, Spätschicht, Nachtschicht."),
  n("arb-21", "ARBEIT", "die", "Berufserfahrung", "die Berufserfahrungen", "work experience", "Für diese Stelle brauchen Sie zwei Jahre Berufserfahrung.", "For this job you need two years of work experience.", "Job ads: 'mehrjährige Berufserfahrung' = several years of experience."),
  n("arb-22", "ARBEIT", "die", "Ausbildung", "die Ausbildungen", "vocational training / apprenticeship", "Sie macht eine Ausbildung zur Krankenschwester.", "She is doing training to become a nurse.", "'eine Ausbildung machen'. Do not confuse with 'Studium' (university)."),
  n("arb-23", "ARBEIT", "das", "Praktikum", "die Praktika", "internship / work placement", "Ich habe drei Monate ein Praktikum in einem Hotel gemacht.", "I did a three-month internship in a hotel.", "Plural is irregular: die Praktika. Verb: 'ein Praktikum machen'."),
  v("arb-24", "ARBEIT", "sich bewerben (um / bei)", "to apply (for a job)", "Ich habe mich bei Ihrer Firma um die Stelle beworben.", "I applied to your company for the position.", "Perfekt: hat sich beworben. Irregular: bewirbt, bewarb, beworben. Key verb for Schreiben."),
  v("arb-25", "ARBEIT", "kündigen", "to quit / to give notice / to terminate", "Ich habe meinen Arbeitsvertrag zum 31. März gekündigt.", "I terminated my employment contract effective March 31.", "Perfekt: hat gekündigt. Noun: 'die Kündigung'."),
  v("arb-26", "ARBEIT", "einstellen", "to hire (also: to stop / to adjust)", "Die Firma hat im Januar zehn neue Mitarbeiter eingestellt.", "The company hired ten new employees in January.", "Separable verb. Perfekt: hat eingestellt. Opposite of 'entlassen' (to dismiss)."),
  v("arb-27", "ARBEIT", "verdienen", "to earn", "Als Pfleger verdient er etwa 2.800 Euro im Monat.", "As a nurse he earns about 2,800 euros per month.", "Perfekt: hat verdient. Hearing: watch numbers like 'brutto' and 'netto'."),
  v("arb-28", "ARBEIT", "sich krankmelden", "to report sick", "Ich habe mich heute Morgen bei meinem Chef krankgemeldet.", "I reported sick to my boss this morning.", "Perfekt: hat sich krankgemeldet. Needed in Schreiben (Entschuldigung at work)."),
  a("arb-29", "ARBEIT", "zuständig (für)", "responsible / in charge (for)", "Für Beschwerden ist unsere Abteilung nicht zuständig.", "Our department is not responsible for complaints.", "Always with 'für + Akkusativ'. Very frequent in letters from offices."),
  p("arb-30", "ARBEIT", "in Teilzeit / in Vollzeit arbeiten", "to work part-time / full-time", "Seit der Geburt meiner Tochter habe ich in Teilzeit gearbeitet.", "Since the birth of my daughter I have worked part-time.", "Job ads: 'Teilzeit' = Part-time, 'Vollzeit' = 40 hours."),
  p("arb-31", "ARBEIT", "Urlaub nehmen", "to take vacation / time off", "Ich möchte im August zwei Wochen Urlaub nehmen.", "I would like to take two weeks of vacation in August.", "Also: 'Urlaub beantragen'. Do not mix with 'Ferien' (school holidays)."),

  // ---------------- WOHNEN ----------------
  n("woh-7", "WOHNEN", "die", "Miete", "die Mieten", "rent", "Die Miete muss bis zum dritten Werktag bezahlt werden.", "The rent must be paid by the third working day.", "Kaltmiete + Nebenkosten = Warmmiete. Check which one the question asks about."),
  n("woh-8", "WOHNEN", "der", "Vermieter", "die Vermieter", "landlord", "Der Vermieter wohnt im Erdgeschoss des Hauses.", "The landlord lives on the ground floor of the building.", "Female form: 'die Vermieterin'. Recipient of the Mängelanzeige."),
  n("woh-9", "WOHNEN", "der", "Mieter", "die Mieter", "tenant", "Alle Mieter erhalten die Nebenkostenabrechnung im Mai.", "All tenants receive the utility bill in May.", "Female form: 'die Mieterin'. Opposite of 'Vermieter'."),
  n("woh-10", "WOHNEN", "der", "Mietvertrag", "die Mietverträge", "rental agreement / lease", "Bitte lesen Sie den Mietvertrag genau, bevor Sie unterschreiben.", "Please read the rental agreement carefully before you sign.", "Look for 'Kündigungsfrist', 'Kaution' and 'Mietbeginn'."),
  n("woh-11", "WOHNEN", "die", "Besichtigung", "die Besichtigungen", "viewing (of an apartment)", "Die Besichtigung der Wohnung ist am Samstag um 11 Uhr.", "The apartment viewing is on Saturday at 11 o'clock.", "Verb: 'eine Wohnung besichtigen'. Listening: day and time."),
  n("woh-12", "WOHNEN", "der", "Umzug", "die Umzüge", "move (to a new home)", "Wir brauchen für den Umzug einen großen Transporter.", "We need a large van for the move.", "Verb: 'umziehen'. Also 'der Umzugswagen' (moving truck)."),
  n("woh-13", "WOHNEN", "der", "Nachbar", "die Nachbarn", "neighbor (male)", "Meine Nachbarn feiern jedes Wochenende laut.", "My neighbors party loudly every weekend.", "Female form: 'die Nachbarin'. N-declension: dem Nachbarn. Typical in complaint tasks."),
  n("woh-14", "WOHNEN", "die", "Heizung", "die Heizungen", "heating", "Seit einer Woche funktioniert die Heizung nicht mehr.", "The heating has not worked for a week.", "Frequent defect in the Mängelanzeige. Verb: 'heizen'."),
  n("woh-15", "WOHNEN", "der", "Hausmeister", "die Hausmeister", "caretaker / janitor", "Bitte melden Sie Schäden direkt beim Hausmeister.", "Please report damages directly to the caretaker.", "Notices in the staircase often name the Hausmeister as contact."),
  n("woh-16", "WOHNEN", "der", "Schlüssel", "die Schlüssel", "key", "Ich habe meinen Schlüssel in der Wohnung vergessen.", "I forgot my key in the apartment.", "Phrase: 'den Schlüssel übergeben' (hand over the key at move-out)."),
  n("woh-17", "WOHNEN", "der", "Müll", "(no plural)", "garbage / waste", "Der Müll wird jeden Dienstag abgeholt.", "The garbage is collected every Tuesday.", "Mülltrennung = separating waste (Papier, Plastik, Bio, Restmüll)."),
  n("woh-18", "WOHNEN", "der", "Lärm", "(no plural)", "noise", "Der Lärm von der Baustelle stört mich sehr.", "The noise from the construction site disturbs me a lot.", "Complaint phrase: 'Ich fühle mich durch den Lärm gestört'."),
  v("woh-19", "WOHNEN", "umziehen", "to move (to a new home)", "Wir sind letzten Monat nach Köln umgezogen.", "We moved to Cologne last month.", "Separable. Perfekt with SEIN: ist umgezogen."),
  v("woh-20", "WOHNEN", "einziehen / ausziehen", "to move in / to move out", "Mein Bruder ist gestern ausgezogen, und ich bin vor einer Woche eingezogen.", "My brother moved out yesterday, and I moved in a week ago.", "Perfekt with SEIN: ist eingezogen / ist ausgezogen."),
  v("woh-21", "WOHNEN", "renovieren", "to renovate / to redecorate", "Vor dem Auszug müssen Sie die Wohnung renovieren.", "Before moving out you must renovate the apartment.", "Perfekt: hat renoviert. 'Schönheitsreparaturen' = cosmetic repairs in leases."),
  v("woh-22", "WOHNEN", "lüften", "to air out / to ventilate", "Ich habe heute Morgen das ganze Zimmer gelüftet.", "I aired out the whole room this morning.", "Perfekt: hat gelüftet. Prevents mold (Schimmel) - common landlord topic."),
  a("woh-23", "WOHNEN", "möbliert", "furnished", "Das Apartment ist komplett möbliert und sofort frei.", "The apartment is fully furnished and available immediately.", "In ads: 'möbliert' vs 'unmöbliert'. Also 'Einbauküche' = fitted kitchen."),

  // ---------------- BEHOERDEN ----------------
  n("beh-6", "BEHOERDEN", "das", "Formular", "die Formulare", "form (to fill out)", "Bitte füllen Sie das Formular in Druckbuchstaben aus.", "Please fill out the form in block letters.", "Verb: 'ein Formular ausfüllen'. 'in Druckbuchstaben' = in capital print letters."),
  n("beh-7", "BEHOERDEN", "die", "Anmeldung", "die Anmeldungen", "registration / sign-up", "Für die Anmeldung brauchen Sie Ihren Pass und den Mietvertrag.", "For the registration you need your passport and the lease.", "Verb: 'sich anmelden'. Opposite: 'die Abmeldung'."),
  n("beh-8", "BEHOERDEN", "der", "Termin", "die Termine", "appointment / date", "Ich habe einen Termin beim Bürgeramt um 10:15 Uhr.", "I have an appointment at the citizens' office at 10:15.", "Verbs: 'einen Termin vereinbaren / absagen / verschieben'. Key word everywhere."),
  n("beh-9", "BEHOERDEN", "die", "Gebühr", "die Gebühren", "fee / charge", "Für den neuen Ausweis fällt eine Gebühr von 37 Euro an.", "A fee of 37 euros applies for the new ID card.", "Reading: check the amount and whether it is 'gebührenfrei' (free of charge)."),
  n("beh-10", "BEHOERDEN", "die", "Bescheinigung", "die Bescheinigungen", "certificate / official confirmation", "Die Schule stellt eine Bescheinigung über den Deutschkurs aus.", "The school issues a certificate for the German course.", "Verb: 'bescheinigen'. Related: Meldebescheinigung, Bescheinigung vom Arzt."),
  n("beh-11", "BEHOERDEN", "der", "Ausweis", "die Ausweise", "ID card", "Bitte legen Sie Ihren Ausweis am Schalter vor.", "Please present your ID at the counter.", "'Personalausweis' = ID card, 'Reisepass' = passport."),
  n("beh-12", "BEHOERDEN", "der", "Reisepass", "die Reisepässe", "passport", "Mein Reisepass ist noch zwei Jahre gültig.", "My passport is still valid for two more years.", "Check 'gültig bis' (valid until) in reading tasks."),
  n("beh-13", "BEHOERDEN", "der", "Nachweis", "die Nachweise", "proof / evidence", "Als Nachweis brauchen wir eine Kopie Ihres Sprachzertifikats.", "As proof we need a copy of your language certificate.", "Verb: 'nachweisen'. 'Einen Nachweis erbringen' = provide proof."),
  n("beh-14", "BEHOERDEN", "die", "Unterschrift", "die Unterschriften", "signature", "Das Formular ist ohne Unterschrift ungültig.", "The form is invalid without a signature.", "Verb: 'unterschreiben'. 'Unterschrift' is at the bottom: 'Ort, Datum, Unterschrift'."),
  n("beh-15", "BEHOERDEN", "die", "Staatsangehörigkeit", "die Staatsangehörigkeiten", "nationality / citizenship", "Welche Staatsangehörigkeit haben Sie?", "What nationality do you have?", "Form field. Synonym: 'Nationalität'."),
  n("beh-16", "BEHOERDEN", "der", "Wohnsitz", "die Wohnsitze", "place of residence", "Mein Wohnsitz ist seit 2023 in Hamburg.", "My place of residence has been in Hamburg since 2023.", "Form fields: 'Wohnsitz', 'Anschrift', 'Geburtsort'."),
  n("beh-17", "BEHOERDEN", "die", "Genehmigung", "die Genehmigungen", "permit / approval", "Für die Veranstaltung brauchen wir eine Genehmigung der Stadt.", "For the event we need approval from the city.", "Verb: 'genehmigen' (hat genehmigt)."),
  v("beh-18", "BEHOERDEN", "ausfüllen", "to fill out (a form)", "Ich habe das Formular vollständig ausgefüllt.", "I filled out the form completely.", "Separable. Perfekt: hat ausgefüllt."),
  v("beh-19", "BEHOERDEN", "beantragen", "to apply for (officially)", "Ich habe beim Amt ein neues Visum beantragt.", "I applied for a new visa at the office.", "Perfekt: hat beantragt. Noun: 'der Antrag'."),
  v("beh-20", "BEHOERDEN", "vorlegen", "to present / to submit (documents)", "Sie müssen alle Unterlagen beim Termin vorlegen.", "You must present all documents at the appointment.", "Separable. Perfekt: hat vorgelegt."),
  v("beh-21", "BEHOERDEN", "unterschreiben", "to sign", "Hast du den Vertrag schon unterschrieben?", "Have you already signed the contract?", "Inseparable. Perfekt: hat unterschrieben (no ge-)."),
  a("beh-22", "BEHOERDEN", "gültig / ungültig", "valid / invalid", "Ihr Aufenthaltstitel ist nur noch bis Mai gültig.", "Your residence permit is only valid until May.", "Reading trap: 'gültig bis' dates and 'abgelaufen' (expired)."),
  a("beh-23", "BEHOERDEN", "erforderlich", "required / necessary", "Für die Anmeldung ist ein gültiger Pass erforderlich.", "A valid passport is required for the registration.", "Synonyms: 'notwendig', 'nötig'. Typical in official notices."),

  // ---------------- GESUNDHEIT ----------------
  n("ges-6", "GESUNDHEIT", "die", "Praxis", "die Praxen", "doctor's practice / surgery", "Die Praxis ist von 8 bis 12 Uhr geöffnet.", "The practice is open from 8 to 12.", "Listening: opening hours ('Sprechzeiten'). Also 'Arztpraxis'."),
  n("ges-7", "GESUNDHEIT", "die", "Sprechstunde", "die Sprechstunden", "consultation hours", "Die Sprechstunde fällt am Mittwoch leider aus.", "Consultation hours are unfortunately cancelled on Wednesday.", "Often announced on the answering machine."),
  n("ges-8", "GESUNDHEIT", "der", "Hausarzt", "die Hausärzte", "family doctor / GP", "Zuerst gehe ich immer zu meinem Hausarzt.", "I always go to my family doctor first.", "Female form: 'die Hausärztin'. The Hausarzt gives the Überweisung."),
  n("ges-9", "GESUNDHEIT", "das", "Medikament", "die Medikamente", "medication", "Nehmen Sie dieses Medikament dreimal täglich nach dem Essen.", "Take this medication three times daily after meals.", "Package leaflet: 'Beipackzettel'. Listen for dose: 'dreimal täglich'."),
  n("ges-10", "GESUNDHEIT", "die", "Tablette", "die Tabletten", "tablet / pill", "Ich muss jeden Morgen eine Tablette nehmen.", "I have to take one tablet every morning.", "'eine Tablette nehmen'. Also: 'Tropfen' (drops), 'Salbe' (ointment)."),
  n("ges-11", "GESUNDHEIT", "die", "Apotheke", "die Apotheken", "pharmacy", "In der Apotheke habe ich mein Rezept eingelöst.", "At the pharmacy I filled my prescription.", "'Notdienst' = emergency pharmacy open at night."),
  n("ges-12", "GESUNDHEIT", "die", "Krankenversicherung", "die Krankenversicherungen", "health insurance", "Ohne Krankenversicherung dürfen Sie in Deutschland nicht arbeiten.", "Without health insurance you may not work in Germany.", "Also 'Krankenkasse' (health insurance fund). Card: 'Versichertenkarte'."),
  n("ges-13", "GESUNDHEIT", "die", "Schmerzen", "(only plural)", "pain", "Ich habe seit gestern starke Schmerzen im Knie.", "I have had severe pain in my knee since yesterday.", "Always plural: 'Schmerzen haben'. Doctor role play: 'Wo tut es weh?'"),
  n("ges-14", "GESUNDHEIT", "das", "Fieber", "(no plural)", "fever", "Das Kind hat seit zwei Tagen hohes Fieber.", "The child has had a high fever for two days.", "'Fieber haben' / 'Fieber messen'."),
  n("ges-15", "GESUNDHEIT", "die", "Erkältung", "die Erkältungen", "cold (illness)", "Wegen einer Erkältung bleibe ich heute zu Hause.", "Because of a cold I am staying at home today.", "Symptoms: Husten (cough), Schnupfen (runny nose), Halsschmerzen."),
  n("ges-16", "GESUNDHEIT", "die", "Impfung", "die Impfungen", "vaccination", "Für die Schule brauchen wir den Nachweis über alle Impfungen.", "For school we need proof of all vaccinations.", "Verb: 'impfen'. Document: 'der Impfausweis'."),
  n("ges-17", "GESUNDHEIT", "die", "Nebenwirkung", "die Nebenwirkungen", "side effect", "Dieses Medikament hat kaum Nebenwirkungen.", "This medication has hardly any side effects.", "Listening: pharmacist explains Nebenwirkungen and dose."),
  v("ges-18", "GESUNDHEIT", "untersuchen", "to examine", "Der Arzt hat mich gründlich untersucht.", "The doctor examined me thoroughly.", "Inseparable. Perfekt: hat untersucht. Noun: 'die Untersuchung'."),
  v("ges-19", "GESUNDHEIT", "verschreiben", "to prescribe", "Die Ärztin hat mir ein Medikament gegen den Husten verschrieben.", "The doctor prescribed me a medication for the cough.", "Perfekt: hat verschrieben. Gives the 'Rezept'."),
  v("ges-20", "GESUNDHEIT", "sich erholen", "to recover / to rest", "Nach der Grippe habe ich mich eine Woche lang erholt.", "After the flu I recovered for a week.", "Perfekt: hat sich erholt. Noun: 'die Erholung'."),
  p("ges-21", "GESUNDHEIT", "einen Termin vereinbaren", "to make an appointment", "Ich möchte gern einen Termin für nächste Woche vereinbaren.", "I would like to make an appointment for next week.", "Perfekt: hat vereinbart. Standard sentence for phone and email tasks."),

  // ---------------- REKLAMATION ----------------
  n("rek-6", "REKLAMATION", "die", "Beschwerde", "die Beschwerden", "complaint", "Ich schreibe Ihnen eine Beschwerde über den schlechten Service.", "I am writing you a complaint about the poor service.", "Do not mix with 'Beschwerden' = symptoms (Gesundheit). Verb: 'sich beschweren'."),
  n("rek-7", "REKLAMATION", "die", "Bestellung", "die Bestellungen", "order", "Meine Bestellung ist nach zwei Wochen noch nicht angekommen.", "My order still has not arrived after two weeks.", "Give the 'Bestellnummer' (order number) in the letter."),
  n("rek-8", "REKLAMATION", "die", "Lieferung", "die Lieferungen", "delivery", "Die Lieferung war leider unvollständig.", "The delivery was unfortunately incomplete.", "Verb: 'liefern'. 'Lieferzeit' = delivery time."),
  n("rek-9", "REKLAMATION", "die", "Rechnung", "die Rechnungen", "invoice / bill", "In der Rechnung steht ein falscher Betrag.", "There is a wrong amount on the invoice.", "In a restaurant: 'Die Rechnung, bitte!'. Also a typical complaint topic."),
  n("rek-10", "REKLAMATION", "der", "Schaden", "die Schäden", "damage", "Beim Transport ist ein Schaden am Gerät entstanden.", "Damage to the device occurred during transport.", "Related: 'Schadensersatz' (compensation), 'beschädigt' (damaged)."),
  n("rek-11", "REKLAMATION", "der", "Schadensersatz", "(no plural)", "compensation / damages", "Ich verlange Schadensersatz für die beschädigte Ware.", "I demand compensation for the damaged goods.", "Formal demand phrase in strong complaint letters."),
  n("rek-12", "REKLAMATION", "der", "Kundenservice", "(no plural)", "customer service", "Der Kundenservice war telefonisch nicht erreichbar.", "Customer service was not reachable by phone.", "Often combined with 'Hotline' in listening tasks."),
  v("rek-13", "REKLAMATION", "reklamieren", "to complain about a defect / to make a claim", "Ich habe die kaputte Jacke im Geschäft reklamiert.", "I made a claim about the broken jacket in the store.", "Perfekt: hat reklamiert. Noun: 'die Reklamation'."),
  v("rek-14", "REKLAMATION", "sich beschweren (über)", "to complain (about)", "Ich habe mich beim Manager über den Lärm beschwert.", "I complained to the manager about the noise.", "Perfekt: hat sich beschwert. 'über + Akkusativ'."),
  v("rek-15", "REKLAMATION", "umtauschen", "to exchange", "Kann ich die Hose bitte gegen eine größere umtauschen?", "Can I please exchange the pants for a bigger pair?", "Separable. Perfekt: hat umgetauscht. Needs the 'Kassenbon'."),
  v("rek-16", "REKLAMATION", "zurückgeben", "to return / to give back", "Ich habe das Paket am Montag zurückgegeben.", "I returned the package on Monday.", "Separable. Perfekt: hat zurückgegeben. Noun: 'die Rückgabe'."),
  v("rek-17", "REKLAMATION", "liefern", "to deliver", "Die Firma hat das falsche Modell geliefert.", "The company delivered the wrong model.", "Perfekt: hat geliefert. Typical complaint: 'falsch geliefert'."),
  a("rek-18", "REKLAMATION", "defekt", "defective / broken", "Der Fernseher war schon beim Auspacken defekt.", "The television was already defective when unpacking.", "Synonyms: kaputt, beschädigt, mangelhaft. Never 'defektiv'."),
  a("rek-19", "REKLAMATION", "unvollständig", "incomplete", "Das Paket war leider unvollständig, es fehlt das Kabel.", "The package was unfortunately incomplete, the cable is missing.", "'Es fehlt ...' = '... is missing'. Core complaint sentence."),
  p("rek-20", "REKLAMATION", "Ich möchte mich beschweren", "I would like to complain", "Ich möchte mich über die lange Wartezeit beschweren.", "I would like to complain about the long waiting time.", "Perfect opener for a complaint (Schreiben and Sprechen). Add 'über + Akkusativ'."),

  // ---------------- VERKEHR ----------------
  n("ver-6", "VERKEHR", "der", "Fahrplan", "die Fahrpläne", "timetable / schedule", "Laut Fahrplan fährt der Bus um 7:42 Uhr ab.", "According to the timetable the bus leaves at 7:42.", "Listening and Reading: 'Abfahrt' (departure) and 'Ankunft' (arrival) times."),
  n("ver-7", "VERKEHR", "die", "Fahrkarte", "die Fahrkarten", "ticket", "Wo kann ich eine Fahrkarte kaufen?", "Where can I buy a ticket?", "Synonym: 'der Fahrschein'. 'Monatskarte' = monthly pass."),
  n("ver-8", "VERKEHR", "die", "Haltestelle", "die Haltestellen", "stop (bus, tram)", "Die nächste Haltestelle ist Rathausplatz.", "The next stop is Rathausplatz.", "Announcements: 'Nächster Halt: ...'."),
  n("ver-9", "VERKEHR", "der", "Bahnsteig", "die Bahnsteige", "platform (area at the station)", "Bitte treten Sie vom Bahnsteig zurück.", "Please step back from the platform.", "'Gleis' is the track number, 'Bahnsteig' the platform. Often used as synonyms."),
  n("ver-10", "VERKEHR", "die", "Baustelle", "die Baustellen", "construction site / roadworks", "Wegen einer Baustelle ist die Straße gesperrt.", "The road is closed because of roadworks.", "Radio traffic news: 'Baustelle', 'Stau', 'Umleitung'."),
  n("ver-11", "VERKEHR", "der", "Stau", "die Staus", "traffic jam", "Ich stand eine Stunde im Stau und kam zu spät.", "I stood in a traffic jam for an hour and arrived late.", "Reason for lateness in many letters and phone calls."),
  n("ver-12", "VERKEHR", "die", "Umleitung", "die Umleitungen", "detour", "Die Umleitung ist ab der Brücke ausgeschildert.", "The detour is signposted from the bridge.", "Verb: 'umleiten'. Listen for the street names."),
  n("ver-13", "VERKEHR", "die", "Sperrung", "die Sperrungen", "closure / blockage", "Es gibt eine Sperrung der A9 zwischen Nürnberg und München.", "There is a closure of the A9 between Nuremberg and Munich.", "Verb: 'sperren'. Adjective: 'gesperrt' (closed)."),
  n("ver-14", "VERKEHR", "der", "Führerschein", "die Führerscheine", "driver's license", "Ich mache gerade meinen Führerschein.", "I am currently getting my driver's license.", "'den Führerschein machen'. Ask: 'Haben Sie einen Führerschein?'"),
  n("ver-15", "VERKEHR", "die", "Verbindung", "die Verbindungen", "connection (route, train link)", "Gibt es eine direkte Verbindung nach Berlin?", "Is there a direct connection to Berlin?", "'direkte Verbindung' = without changing trains. Typical info-desk question."),
  n("ver-16", "VERKEHR", "die", "Störung", "die Störungen", "disruption / malfunction", "Wegen einer Störung fährt die S-Bahn nicht.", "The S-Bahn is not running because of a disruption.", "Announcement phrase: 'technische Störung', 'Signalstörung'."),
  v("ver-17", "VERKEHR", "umsteigen", "to change (trains, buses)", "In Frankfurt bin ich in den ICE nach Berlin umgestiegen.", "In Frankfurt I changed to the ICE to Berlin.", "Separable. Perfekt with SEIN: ist umgestiegen."),
  v("ver-18", "VERKEHR", "einsteigen / aussteigen", "to get on / to get off", "Ich bin am Hauptbahnhof ausgestiegen.", "I got off at the main station.", "Separable. Perfekt with SEIN: ist eingestiegen / ist ausgestiegen."),
  v("ver-19", "VERKEHR", "abfahren", "to depart / to leave", "Der Zug ist pünktlich um 9:05 Uhr abgefahren.", "The train left on time at 9:05.", "Separable. Perfekt with SEIN: ist abgefahren. Noun: 'die Abfahrt'."),
  v("ver-20", "VERKEHR", "ankommen", "to arrive", "Wir sind um 18 Uhr am Flughafen angekommen.", "We arrived at the airport at 6 p.m.", "Separable. Perfekt with SEIN: ist angekommen. Noun: 'die Ankunft'."),
  v("ver-21", "VERKEHR", "verpassen", "to miss (train, bus, appointment)", "Ich habe leider den Bus verpasst.", "Unfortunately I missed the bus.", "Inseparable. Perfekt: hat verpasst. Common excuse in phone calls."),
  p("ver-22", "VERKEHR", "Verspätung haben", "to be late / delayed", "Der Bus hatte heute zehn Minuten Verspätung.", "The bus was ten minutes late today.", "Also 'sich verspäten'. Excuse: 'Entschuldigung für die Verspätung'."),

  // ---------------- EINKAUFEN ----------------
  n("ein-1", "EINKAUFEN", "das", "Angebot", "die Angebote", "special offer / deal", "Diese Woche gibt es Äpfel im Angebot.", "This week there are apples on offer.", "'im Angebot' = on sale. Also 'Sonderangebot'. Reading: check the end date."),
  n("ein-2", "EINKAUFEN", "der", "Rabatt", "die Rabatte", "discount", "Studenten bekommen zehn Prozent Rabatt.", "Students get ten percent discount.", "'Prozent Rabatt bekommen / geben'. Synonym: 'die Ermäßigung'."),
  n("ein-3", "EINKAUFEN", "der", "Kassenbon", "die Kassenbons", "receipt (from the cash register)", "Bitte bewahren Sie den Kassenbon gut auf.", "Please keep the receipt safe.", "Also 'die Quittung' or 'der Beleg'. Needed for exchange and Garantie."),
  n("ein-4", "EINKAUFEN", "die", "Kasse", "die Kassen", "checkout / cash register", "Bitte bezahlen Sie an der Kasse im Erdgeschoss.", "Please pay at the checkout on the ground floor.", "Also 'Kasse' at the cinema or a museum (Tageskasse)."),
  n("ein-5", "EINKAUFEN", "der", "Preis", "die Preise", "price", "Der Preis ist inklusive Mehrwertsteuer.", "The price includes value-added tax.", "'Preis pro Person' / 'Preis pro Nacht'. Reading trap: per person or total?"),
  n("ein-6", "EINKAUFEN", "die", "Kreditkarte", "die Kreditkarten", "credit card", "Kann ich hier mit Kreditkarte bezahlen?", "Can I pay by credit card here?", "'mit Karte' vs 'bar' (cash). 'EC-Karte' = debit card."),
  n("ein-7", "EINKAUFEN", "das", "Konto", "die Konten", "bank account", "Ich möchte ein Konto bei Ihrer Bank eröffnen.", "I would like to open an account at your bank.", "'ein Konto eröffnen'. Related: 'die IBAN', 'die Kontonummer'."),
  n("ein-8", "EINKAUFEN", "das", "Bargeld", "(no plural)", "cash", "Ich habe leider kein Bargeld dabei.", "Unfortunately I have no cash with me.", "'bar bezahlen' = to pay cash. 'am Geldautomaten' = at the ATM."),
  n("ein-9", "EINKAUFEN", "der", "Betrag", "die Beträge", "amount (of money)", "Der offene Betrag beträgt 45 Euro.", "The outstanding amount is 45 euros.", "In bills: 'Gesamtbetrag' = total amount. Often tested numerically."),
  n("ein-10", "EINKAUFEN", "die", "Größe", "die Größen", "size", "Haben Sie diese Jacke auch in Größe 42?", "Do you have this jacket also in size 42?", "Clothes: 'Größe', 'passen' (fit), 'anprobieren' (try on)."),
  n("ein-11", "EINKAUFEN", "die", "Lebensmittel", "(only plural)", "groceries / food", "Lebensmittel kaufe ich meistens im Supermarkt.", "I mostly buy groceries at the supermarket.", "Always plural. 'Mindesthaltbarkeitsdatum' = best-before date."),
  n("ein-12", "EINKAUFEN", "der", "Wochenmarkt", "die Wochenmärkte", "weekly market", "Samstags kaufe ich frisches Gemüse auf dem Wochenmarkt.", "On Saturdays I buy fresh vegetables at the weekly market.", "Listening: market stands announce prices per Kilo."),
  n("ein-13", "EINKAUFEN", "die", "Packung", "die Packungen", "pack / package", "Ich hätte gern eine Packung Nudeln und ein Kilo Äpfel.", "I would like a pack of pasta and a kilo of apples.", "Quantities: ein Kilo, ein Liter, eine Flasche, eine Dose, ein Stück."),
  n("ein-14", "EINKAUFEN", "die", "Mehrwertsteuer", "(no plural)", "value-added tax (VAT)", "In Deutschland beträgt die Mehrwertsteuer meistens 19 Prozent.", "In Germany the VAT is usually 19 percent.", "Abbreviation: 'MwSt.'. 'inklusive MwSt.' = tax included."),
  v("ein-15", "EINKAUFEN", "anprobieren", "to try on", "Ich habe drei Hemden anprobiert, aber keins gekauft.", "I tried on three shirts but did not buy any.", "Separable. Perfekt: hat anprobiert. Place: 'die Umkleidekabine'."),
  v("ein-16", "EINKAUFEN", "bezahlen", "to pay", "Ich habe die Rechnung gestern per Überweisung bezahlt.", "I paid the bill yesterday by bank transfer.", "Perfekt: hat bezahlt. 'bar', 'mit Karte', 'per Überweisung'."),
  v("ein-17", "EINKAUFEN", "ausgeben", "to spend (money)", "Diesen Monat habe ich zu viel Geld für Kleidung ausgegeben.", "This month I spent too much money on clothes.", "Separable. Perfekt: hat ausgegeben. Pattern: 'Geld für etwas ausgeben'."),
  v("ein-18", "EINKAUFEN", "sparen", "to save (money, time)", "Wir haben ein Jahr lang auf unseren Urlaub gespart.", "We saved for our vacation for a year.", "Perfekt: hat gespart. 'sparen auf + Akkusativ'."),
  v("ein-19", "EINKAUFEN", "abheben", "to withdraw (money)", "Ich habe am Automaten 100 Euro abgehoben.", "I withdrew 100 euros at the ATM.", "Separable. Perfekt: hat abgehoben. 'Geld abheben' / 'einzahlen' (deposit)."),
  a("ein-20", "EINKAUFEN", "günstig", "inexpensive / good value", "Im Internet ist das Handy viel günstiger als im Laden.", "On the internet the phone is much cheaper than in the shop.", "Synonyms: billig, preiswert. Opposite: teuer."),
  a("ein-21", "EINKAUFEN", "kostenlos", "free of charge", "Der Eintritt für Kinder unter sechs Jahren ist kostenlos.", "Admission for children under six is free.", "Synonyms: gratis, umsonst, gebührenfrei. Reading: watch age limits."),
  a("ein-22", "EINKAUFEN", "frisch", "fresh", "Das Brot ist frisch und noch warm.", "The bread is fresh and still warm.", "Opposite: 'abgelaufen' (expired), 'alt'."),
  p("ein-23", "EINKAUFEN", "Stimmt so!", "Keep the change!", "Das macht 18 Euro. - Stimmt so!", "That makes 18 euros. - Keep the change!", "Said when paying in a restaurant. Tip is called 'das Trinkgeld'."),

  // ---------------- FAMILIE ----------------
  n("fam-1", "FAMILIE", "die", "Eltern", "(only plural)", "parents", "Meine Eltern wohnen noch in der Türkei.", "My parents still live in Turkey.", "Always plural. Singular: 'der Vater', 'die Mutter'. 'Elternabend' at school."),
  n("fam-2", "FAMILIE", "das", "Kind", "die Kinder", "child", "Mein Kind geht seit September in den Kindergarten.", "My child has been going to kindergarten since September.", "Plural: die Kinder. 'Kinder unter 6' are often free."),
  n("fam-3", "FAMILIE", "die", "Geschwister", "(only plural)", "siblings (brothers and sisters)", "Ich habe zwei Geschwister, einen Bruder und eine Schwester.", "I have two siblings, a brother and a sister.", "Always plural. Speaking Teil 1: talk about your family."),
  n("fam-4", "FAMILIE", "die", "Großeltern", "(only plural)", "grandparents", "Am Wochenende besuchen wir meine Großeltern.", "On the weekend we visit my grandparents.", "Singular: der Großvater, die Großmutter."),
  n("fam-5", "FAMILIE", "die", "Verwandten", "(only plural)", "relatives", "Zu Weihnachten kommen alle Verwandten zu uns.", "At Christmas all relatives come to us.", "'ein Verwandter / eine Verwandte', adjective endings like 'die Deutschen'."),
  n("fam-6", "FAMILIE", "der", "Kindergarten", "die Kindergärten", "kindergarten / nursery", "Der Kindergarten ist von 7 bis 16 Uhr geöffnet.", "The kindergarten is open from 7 to 4 p.m.", "Registration: 'Kindergartenplatz' (place). Listening: opening times."),
  n("fam-7", "FAMILIE", "die", "Grundschule", "die Grundschulen", "primary school", "Meine Tochter kommt im Herbst in die Grundschule.", "My daughter starts primary school in autumn.", "Grades 1 to 4. After that: 'Gymnasium', 'Realschule', 'Gesamtschule'."),
  n("fam-8", "FAMILIE", "der", "Lehrer", "die Lehrer", "teacher (male)", "Der Lehrer hat uns viele Hausaufgaben gegeben.", "The teacher gave us a lot of homework.", "Female form: 'die Lehrerin'. Letter to teacher: 'Sehr geehrte Frau Müller'."),
  n("fam-9", "FAMILIE", "die", "Hausaufgaben", "(only plural)", "homework", "Hast du schon deine Hausaufgaben gemacht?", "Have you already done your homework?", "Always plural. Phrase: 'Hausaufgaben machen'."),
  n("fam-10", "FAMILIE", "der", "Elternabend", "die Elternabende", "parents' evening", "Am Dienstag ist ein Elternabend in der Schule.", "On Tuesday there is a parents' evening at school.", "Typical invitation text: Datum, Uhrzeit, Raum. Verb: 'teilnehmen'."),
  n("fam-11", "FAMILIE", "das", "Zeugnis", "die Zeugnisse", "certificate / school report", "Das Zeugnis bekommen die Schüler vor den Sommerferien.", "The students get their report before the summer holidays.", "Also a work reference ('Arbeitszeugnis')."),
  n("fam-12", "FAMILIE", "der", "Stundenplan", "die Stundenpläne", "class schedule", "Laut Stundenplan hat Max heute sechs Stunden.", "According to the class schedule Max has six lessons today.", "Subjects: Mathe, Deutsch, Sport, Musik."),
  n("fam-13", "FAMILIE", "der", "Alltag", "(no plural)", "everyday life / daily routine", "In meinem Alltag bleibt wenig Zeit für Hobbys.", "In my daily life there is little time for hobbies.", "Speaking: 'Wie sieht Ihr Alltag aus?' Use 'zuerst, dann, danach, abends'."),
  n("fam-14", "FAMILIE", "die", "Ferien", "(only plural)", "school holidays / vacation", "In den Sommerferien fahren wir ans Meer.", "In the summer holidays we go to the sea.", "Always plural. Compare 'der Urlaub' (work vacation)."),
  v("fam-15", "FAMILIE", "aufstehen", "to get up", "Heute bin ich schon um fünf Uhr aufgestanden.", "Today I already got up at five o'clock.", "Separable. Perfekt with SEIN: ist aufgestanden."),
  v("fam-16", "FAMILIE", "frühstücken", "to have breakfast", "Wir haben heute Morgen zusammen gefrühstückt.", "We had breakfast together this morning.", "Perfekt: hat gefrühstückt. Noun: 'das Frühstück'."),
  v("fam-17", "FAMILIE", "abholen", "to pick up", "Ich habe meine Tochter um 15 Uhr vom Kindergarten abgeholt.", "I picked up my daughter from kindergarten at 3 p.m.", "Separable. Perfekt: hat abgeholt. 'jemanden vom Bahnhof abholen'."),
  v("fam-18", "FAMILIE", "aufräumen", "to tidy up", "Wir haben gestern die ganze Wohnung aufgeräumt.", "We tidied up the whole apartment yesterday.", "Separable. Perfekt: hat aufgeräumt."),
  v("fam-19", "FAMILIE", "erziehen", "to bring up / to raise", "Sie haben ihre Kinder zweisprachig erzogen.", "They raised their children bilingually.", "Perfekt: hat erzogen. Noun: 'die Erziehung'."),
  a("fam-20", "FAMILIE", "verheiratet / ledig / geschieden", "married / single / divorced", "Ich bin seit fünf Jahren verheiratet und habe zwei Kinder.", "I have been married for five years and have two children.", "Form field 'Familienstand'. Also 'verwitwet' (widowed)."),

  // ---------------- FREIZEIT ----------------
  n("fre-1", "FREIZEIT", "das", "Hobby", "die Hobbys", "hobby", "Mein Hobby ist Fotografieren und Wandern.", "My hobby is photography and hiking.", "Speaking Teil 1: 'Was machen Sie in Ihrer Freizeit?'"),
  n("fre-2", "FREIZEIT", "die", "Veranstaltung", "die Veranstaltungen", "event", "Die Veranstaltung beginnt um 19 Uhr, der Eintritt ist frei.", "The event starts at 7 p.m., admission is free.", "Reading: date, time, location and price are asked. 'Eintritt frei' = free."),
  n("fre-3", "FREIZEIT", "das", "Konzert", "die Konzerte", "concert", "Wir haben Karten für das Konzert am Samstag gekauft.", "We bought tickets for the concert on Saturday.", "Related: 'Eintrittskarte', 'Konzertkarte'."),
  n("fre-4", "FREIZEIT", "die", "Eintrittskarte", "die Eintrittskarten", "admission ticket", "Die Eintrittskarten gibt es an der Abendkasse.", "Admission tickets are available at the box office on the night.", "Synonym: 'das Ticket'. 'Eintritt' = price of entry."),
  n("fre-5", "FREIZEIT", "der", "Verein", "die Vereine", "club / association", "Ich bin seit zwei Jahren Mitglied im Sportverein.", "I have been a member of the sports club for two years.", "'Mitglied sein in einem Verein', 'Mitgliedsbeitrag' (membership fee)."),
  n("fre-6", "FREIZEIT", "das", "Fitnessstudio", "die Fitnessstudios", "gym", "Das Fitnessstudio hat bis 23 Uhr geöffnet.", "The gym is open until 11 p.m.", "Contract words: 'Mitgliedschaft', 'Kündigungsfrist'."),
  n("fre-7", "FREIZEIT", "die", "Einladung", "die Einladungen", "invitation", "Vielen Dank für Ihre Einladung zur Geburtstagsfeier.", "Thank you very much for your invitation to the birthday party.", "Verb: 'einladen'. Answer: 'zusagen' (accept) or 'absagen' (decline)."),
  n("fre-8", "FREIZEIT", "der", "Ausflug", "die Ausflüge", "excursion / day trip", "Am Sonntag machen wir einen Ausflug an den See.", "On Sunday we take a day trip to the lake.", "'einen Ausflug machen'. Class trips: 'Klassenfahrt'."),
  n("fre-9", "FREIZEIT", "die", "Ausstellung", "die Ausstellungen", "exhibition", "Die Ausstellung im Museum läuft noch bis Ende Mai.", "The exhibition at the museum runs until the end of May.", "'läuft bis' = lasts until. Closing day: 'Ruhetag'."),
  n("fre-10", "FREIZEIT", "der", "Kurs", "die Kurse", "course / class", "Ich besuche einen Deutschkurs an der Volkshochschule.", "I attend a German course at the adult education center.", "Course ads: 'Beginn', 'Dauer', 'Gebühr', 'Anmeldeschluss'."),
  n("fre-11", "FREIZEIT", "das", "Wochenende", "die Wochenenden", "weekend", "Am Wochenende möchte ich mich ausruhen.", "On the weekend I would like to rest.", "'am Wochenende' (on the weekend), 'übers Wochenende' (over the weekend)."),
  n("fre-12", "FREIZEIT", "der", "Spaziergang", "die Spaziergänge", "walk / stroll", "Nach dem Essen machen wir einen kurzen Spaziergang.", "After dinner we take a short walk.", "'einen Spaziergang machen'. Verb: 'spazieren gehen'."),
  v("fre-13", "FREIZEIT", "sich treffen", "to meet (with friends)", "Wir haben uns gestern im Café getroffen.", "We met at the café yesterday.", "Perfekt: hat sich getroffen. Irregular: trifft, traf, getroffen."),
  v("fre-14", "FREIZEIT", "sich verabreden", "to arrange to meet", "Ich habe mich für Samstag mit einer Freundin verabredet.", "I arranged to meet a friend on Saturday.", "Perfekt: hat sich verabredet. Noun: 'die Verabredung'."),
  v("fre-15", "FREIZEIT", "einladen", "to invite", "Er hat mich zu seinem Geburtstag eingeladen.", "He invited me to his birthday.", "Separable, irregular: lädt ein, lud ein, hat eingeladen."),
  v("fre-16", "FREIZEIT", "absagen", "to cancel / to decline", "Leider musste ich den Termin kurzfristig absagen.", "Unfortunately I had to cancel the appointment at short notice.", "Separable. Perfekt: hat abgesagt. Opposite: 'zusagen'."),
  v("fre-17", "FREIZEIT", "verschieben", "to postpone / to reschedule", "Können wir unser Treffen auf nächste Woche verschieben?", "Can we postpone our meeting to next week?", "Perfekt: hat verschoben. Pattern: 'auf + Akkusativ'. Very common in emails."),
  v("fre-18", "FREIZEIT", "teilnehmen (an)", "to take part (in)", "Ich habe an dem Workshop teilgenommen.", "I took part in the workshop.", "Separable. Perfekt: hat teilgenommen. 'an + Dativ'."),
  v("fre-19", "FREIZEIT", "ausfallen", "to be cancelled / to not take place", "Der Kurs ist wegen Krankheit der Lehrerin ausgefallen.", "The course was cancelled because of the teacher's illness.", "Separable. Perfekt with SEIN: ist ausgefallen. Listening: 'fällt aus'."),
  p("fre-20", "FREIZEIT", "Lust haben auf / zu", "to feel like (doing) something", "Ich habe Lust auf ein Eis. Hast du Lust, ins Kino zu gehen?", "I feel like having an ice cream. Do you feel like going to the cinema?", "Invitation phrases: 'Hast du Lust ...?', 'Wollen wir ...?'"),
  p("fre-21", "FREIZEIT", "Spaß machen", "to be fun", "Das Training macht mir viel Spaß.", "The training is a lot of fun for me.", "Pattern: 'Etwas macht (mir) Spaß'. Useful in Sprechen for hobbies."),

  // ---------------- REISE ----------------
  n("rei-1", "REISE", "die", "Reise", "die Reisen", "trip / journey", "Die Reise nach Wien dauert mit dem Zug fünf Stunden.", "The trip to Vienna takes five hours by train.", "'eine Reise buchen / machen'. 'Gute Reise!' = Have a good trip!"),
  n("rei-2", "REISE", "die", "Buchung", "die Buchungen", "booking", "Ihre Buchung wurde erfolgreich bestätigt.", "Your booking was successfully confirmed.", "Verb: 'buchen'. 'Buchungsnummer' = booking number."),
  n("rei-3", "REISE", "die", "Reservierung", "die Reservierungen", "reservation", "Ich möchte eine Reservierung für vier Personen machen.", "I would like to make a reservation for four people.", "Verb: 'reservieren'. Restaurants, hotels, train seats."),
  n("rei-4", "REISE", "das", "Einzelzimmer", "die Einzelzimmer", "single room", "Haben Sie noch ein Einzelzimmer frei?", "Do you still have a single room available?", "Also 'Doppelzimmer' (double room), 'mit Dusche / Bad'."),
  n("rei-5", "REISE", "die", "Übernachtung", "die Übernachtungen", "overnight stay", "Eine Übernachtung kostet 70 Euro, mit Frühstück.", "One night costs 70 euros, with breakfast.", "Verb: 'übernachten'. 'Preis pro Übernachtung' - do the math!"),
  n("rei-6", "REISE", "die", "Unterkunft", "die Unterkünfte", "accommodation", "Die Unterkunft liegt direkt am Strand.", "The accommodation is located directly on the beach.", "Hotel, Pension, Jugendherberge, Ferienwohnung."),
  n("rei-7", "REISE", "das", "Gepäck", "(no plural)", "luggage", "Mein Gepäck ist leider nicht angekommen.", "Unfortunately my luggage did not arrive.", "Never plural. 'Handgepäck' = hand luggage; 'ein Gepäckstück' = one piece."),
  n("rei-8", "REISE", "der", "Koffer", "die Koffer", "suitcase", "Ich habe meinen Koffer schon gepackt.", "I have already packed my suitcase.", "'den Koffer packen / auspacken'."),
  n("rei-9", "REISE", "der", "Flug", "die Flüge", "flight", "Mein Flug nach Rom startet um 6:50 Uhr.", "My flight to Rome takes off at 6:50.", "Related: Flughafen, Abflug, Landung, Verspätung."),
  n("rei-10", "REISE", "der", "Flughafen", "die Flughäfen", "airport", "Wir müssen zwei Stunden vor dem Abflug am Flughafen sein.", "We have to be at the airport two hours before departure.", "Announcement: 'Gate', 'Boarding', 'Check-in'."),
  n("rei-11", "REISE", "die", "Anreise / die Abreise", "die Anreisen / die Abreisen", "arrival (travel to) / departure (travel home)", "Die Anreise ist ab 15 Uhr möglich, die Abreise bis 11 Uhr.", "Arrival is possible from 3 p.m., departure by 11 a.m.", "Hotel info: check-in and check-out times. Verbs: anreisen, abreisen."),
  n("rei-12", "REISE", "die", "Sehenswürdigkeit", "die Sehenswürdigkeiten", "sight / tourist attraction", "In Berlin gibt es viele Sehenswürdigkeiten.", "In Berlin there are many sights.", "Tourist info: 'Stadtführung', 'Stadtplan', 'Öffnungszeiten'."),
  n("rei-13", "REISE", "die", "Pauschalreise", "die Pauschalreisen", "package holiday", "Die Pauschalreise enthält Flug, Hotel und Frühstück.", "The package holiday includes flight, hotel and breakfast.", "'enthalten' / 'inklusive' = included. Check what is NOT included."),
  n("rei-14", "REISE", "das", "Visum", "die Visa", "visa", "Für diese Reise brauchen Sie ein Visum.", "For this trip you need a visa.", "Plural: die Visa. 'ein Visum beantragen'."),
  n("rei-15", "REISE", "die", "Stornierung", "die Stornierungen", "cancellation (of a booking)", "Eine Stornierung ist bis zu 48 Stunden vorher kostenlos.", "A cancellation is free of charge up to 48 hours before.", "Verb: 'stornieren'. Reading trap: deadline and fee."),
  n("rei-16", "REISE", "die", "Auskunft", "die Auskünfte", "information (desk)", "Am Bahnhof habe ich bei der Auskunft nach dem Zug gefragt.", "At the station I asked the information desk about the train.", "'Auskunft geben / bekommen'. Also 'Tourist-Information'."),
  v("rei-17", "REISE", "buchen", "to book", "Wir haben das Hotel schon im Januar gebucht.", "We already booked the hotel in January.", "Perfekt: hat gebucht. Also 'online buchen'."),
  v("rei-18", "REISE", "reservieren", "to reserve", "Ich habe einen Tisch für 19 Uhr reserviert.", "I reserved a table for 7 p.m.", "Perfekt: hat reserviert. Foreign-origin verb: no ge-."),
  v("rei-19", "REISE", "übernachten", "to stay overnight", "Wir haben zwei Nächte in einer kleinen Pension übernachtet.", "We stayed two nights in a small guesthouse.", "Inseparable. Perfekt: hat übernachtet."),
  v("rei-20", "REISE", "stornieren", "to cancel (booking, order)", "Ich möchte meine Reise leider stornieren.", "Unfortunately I would like to cancel my trip.", "Perfekt: hat storniert. Writing: cancel a booking."),
  v("rei-21", "REISE", "verreisen", "to go away / to travel", "Im Sommer sind wir für drei Wochen verreist.", "In the summer we went away for three weeks.", "Perfekt with SEIN: ist verreist. 'Wir verreisen nächste Woche.'"),
  a("rei-22", "REISE", "inklusive", "included / including", "Der Preis versteht sich inklusive Frühstück.", "The price includes breakfast.", "Opposite: 'exklusive' / 'zuzüglich'. Hotel and travel ads."),

  // ---------------- KOMMUNIKATION ----------------
  n("kom-1", "KOMMUNIKATION", "die", "E-Mail", "die E-Mails", "email", "Ich habe Ihnen gestern eine E-Mail geschickt.", "I sent you an email yesterday.", "Writing task: an email with Betreff, Anrede, 3 content points, Gruß."),
  n("kom-2", "KOMMUNIKATION", "der", "Anhang", "die Anhänge", "attachment", "Im Anhang finden Sie meinen Lebenslauf.", "In the attachment you will find my CV.", "Verb: 'anhängen' (hat angehängt). Very common closing sentence."),
  n("kom-3", "KOMMUNIKATION", "der", "Betreff", "(no plural)", "subject line (of an email or letter)", "Als Betreff schreibe ich: Anfrage zum Deutschkurs.", "As the subject I write: Inquiry about the German course.", "Always put 'Betreff' at the top of formal emails (Schreiben)."),
  n("kom-4", "KOMMUNIKATION", "die", "Nachricht", "die Nachrichten", "message", "Ich habe Ihnen eine Nachricht auf den Anrufbeantworter gesprochen.", "I left you a message on the answering machine.", "'Nachrichten' (plural) also means 'the news'."),
  n("kom-5", "KOMMUNIKATION", "der", "Anrufbeantworter", "die Anrufbeantworter", "answering machine", "Bitte sprechen Sie nach dem Signalton auf den Anrufbeantworter.", "Please speak on the answering machine after the beep.", "Listening Teil 2 and 4: key details are name, number, time."),
  n("kom-6", "KOMMUNIKATION", "die", "Rückmeldung", "die Rückmeldungen", "feedback / reply", "Ich bitte Sie um eine kurze Rückmeldung bis Freitag.", "I ask you for a short reply by Friday.", "Synonym: 'Antwort'. Formal closing request."),
  n("kom-7", "KOMMUNIKATION", "die", "Bestätigung", "die Bestätigungen", "confirmation", "Sie erhalten die Bestätigung per E-Mail.", "You will receive the confirmation by email.", "Verb: 'bestätigen'. 'schriftlich bestätigen' = confirm in writing."),
  n("kom-8", "KOMMUNIKATION", "der", "Vorschlag", "die Vorschläge", "suggestion / proposal", "Ich habe einen Vorschlag: Wir treffen uns um 18 Uhr.", "I have a suggestion: we meet at 6 p.m.", "Verb: 'vorschlagen'. Sprechen Teil 3: 'Ich schlage vor, dass ...'."),
  v("kom-9", "KOMMUNIKATION", "zurückrufen", "to call back", "Ich habe gestern zurückgerufen, aber niemand war da.", "I called back yesterday, but nobody was there.", "Separable. Perfekt: hat zurückgerufen. Phone: 'Ich rufe Sie später zurück.'"),
  v("kom-10", "KOMMUNIKATION", "mitteilen", "to inform / to notify", "Die Firma hat mir mitgeteilt, dass die Lieferung später kommt.", "The company informed me that the delivery comes later.", "Separable. Perfekt: hat mitgeteilt. Formal: 'Ich teile Ihnen mit, dass ...'."),
  v("kom-11", "KOMMUNIKATION", "bestätigen", "to confirm", "Bitte bestätigen Sie den Termin per E-Mail.", "Please confirm the appointment by email.", "Perfekt: hat bestätigt."),
  v("kom-12", "KOMMUNIKATION", "sich entschuldigen", "to apologize", "Ich habe mich für die Verspätung entschuldigt.", "I apologized for being late.", "Perfekt: hat sich entschuldigt. 'für + Akkusativ'."),
  v("kom-13", "KOMMUNIKATION", "weiterleiten", "to forward", "Ich habe Ihre E-Mail an die Personalabteilung weitergeleitet.", "I forwarded your email to the human resources department.", "Separable. Perfekt: hat weitergeleitet."),
  v("kom-14", "KOMMUNIKATION", "sich erkundigen (nach)", "to inquire (about)", "Ich habe mich nach den Kursterminen erkundigt.", "I inquired about the course dates.", "Perfekt: hat sich erkundigt. 'nach + Dativ'. Typical inquiry letter verb."),
  a("kom-15", "KOMMUNIKATION", "erreichbar", "reachable / available", "Sind Sie am Vormittag telefonisch erreichbar?", "Are you reachable by phone in the morning?", "Typical sentence at the end of a letter or in a phone call."),
  p("kom-16", "KOMMUNIKATION", "Sehr geehrte Damen und Herren,", "Dear Sir or Madam, (formal letter opening)", "Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen Ihrer Anzeige.", "Dear Sir or Madam, I am writing to you about your advertisement.", "Formal opening. Known person: 'Sehr geehrter Herr Meier' / 'Sehr geehrte Frau Meier'."),
  p("kom-17", "KOMMUNIKATION", "Mit freundlichen Grüßen", "Yours sincerely (formal closing)", "Vielen Dank für Ihre Hilfe. Mit freundlichen Grüßen, Ali Yilmaz", "Thank you for your help. Yours sincerely, Ali Yilmaz", "Formal closing, no comma problems. Informal: 'Viele Grüße' / 'Liebe Grüße'."),
  p("kom-18", "KOMMUNIKATION", "Liebe Anna, / Lieber Tom,", "Dear Anna, / Dear Tom, (informal letter opening)", "Liebe Anna, vielen Dank für deine Einladung!", "Dear Anna, thank you very much for your invitation!", "Informal: write 'du' forms with small letters (dein, dir) in letters now allowed capital too, but be consistent."),
  p("kom-19", "KOMMUNIKATION", "Ich schreibe Ihnen, weil ...", "I am writing to you because ...", "Ich schreibe Ihnen, weil ich eine Wohnung in Ihrer Anzeige gefunden habe.", "I am writing to you because I found an apartment in your ad.", "Good introduction sentence. Remember: weil + verb at the end."),
  p("kom-20", "KOMMUNIKATION", "Ich möchte mich erkundigen, ob ...", "I would like to inquire whether ...", "Ich möchte mich erkundigen, ob der Kurs noch freie Plätze hat.", "I would like to inquire whether the course still has free places.", "'ob' sends the verb to the end. Cover all content points in the task."),
  p("kom-21", "KOMMUNIKATION", "Könnten Sie mir bitte ... schicken?", "Could you please send me ...?", "Könnten Sie mir bitte weitere Informationen schicken?", "Could you please send me further information?", "Polite request with Konjunktiv II. Also: 'Würden Sie bitte ...?'"),
  p("kom-22", "KOMMUNIKATION", "Ich wäre Ihnen dankbar, wenn ...", "I would be grateful if ...", "Ich wäre Ihnen dankbar, wenn Sie mir den Termin bestätigen könnten.", "I would be grateful if you could confirm the appointment for me.", "Polite formal pattern with Konjunktiv II. Impressive for the B1 Schreiben rating."),
  p("kom-23", "KOMMUNIKATION", "Vielen Dank im Voraus.", "Thank you in advance.", "Vielen Dank im Voraus für Ihre Mühe.", "Thank you in advance for your effort.", "Closing phrase before 'Mit freundlichen Grüßen'."),
  p("kom-24", "KOMMUNIKATION", "Ich freue mich auf Ihre Antwort.", "I look forward to your reply.", "Ich freue mich auf Ihre baldige Antwort.", "I look forward to your prompt reply.", "Also: 'Ich würde mich über eine Antwort freuen.' 'sich freuen auf' = future."),
  p("kom-25", "KOMMUNIKATION", "Ich rufe an wegen ...", "I am calling about ...", "Guten Tag, hier spricht Maria Lopez. Ich rufe an wegen der Wohnung.", "Hello, this is Maria Lopez. I am calling about the apartment.", "Phone opening: 'Hier spricht ...' (not 'Ich bin ...'). Listening and Sprechen."),
  p("kom-26", "KOMMUNIKATION", "Können Sie das bitte wiederholen?", "Could you please repeat that?", "Entschuldigung, können Sie das bitte noch einmal wiederholen?", "Excuse me, could you please repeat that once more?", "Survival phrase for Sprechen. Also 'Wie bitte?' and 'Könnten Sie langsamer sprechen?'"),
  p("kom-27", "KOMMUNIKATION", "Einen Moment bitte, ich verbinde Sie.", "One moment please, I will put you through.", "Einen Moment bitte, ich verbinde Sie mit Frau Schneider.", "One moment please, I will put you through to Mrs. Schneider.", "Phone listening: receptionist. 'verbinden' = connect."),
  p("kom-28", "KOMMUNIKATION", "Leider muss ich absagen.", "Unfortunately I have to cancel / decline.", "Leider muss ich Ihre Einladung absagen, weil ich krank bin.", "Unfortunately I have to decline your invitation because I am sick.", "Always give a reason ('weil ...') and offer an alternative."),
  p("kom-29", "KOMMUNIKATION", "Es tut mir leid, aber ...", "I am sorry, but ...", "Es tut mir leid, aber ich kann am Dienstag nicht kommen.", "I am sorry, but I cannot come on Tuesday.", "Polite refusal. More formal: 'Ich bedauere sehr, dass ...'."),
  p("kom-30", "KOMMUNIKATION", "Ich hätte gern ...", "I would like to have ...", "Ich hätte gern ein Zimmer mit Frühstück.", "I would like a room with breakfast.", "Polite ordering and booking phrase (Konjunktiv II of haben)."),
  p("kom-31", "KOMMUNIKATION", "Wie schon am Telefon besprochen, ...", "As already discussed on the phone, ...", "Wie schon am Telefon besprochen, schicke ich Ihnen die Unterlagen per Post.", "As already discussed on the phone, I am sending you the documents by post.", "Links a letter to an earlier phone call. Useful for formal emails."),
  p("kom-32", "KOMMUNIKATION", "Ich beziehe mich auf ...", "I am referring to ...", "Ich beziehe mich auf Ihre Anzeige vom 3. Mai in der Zeitung.", "I am referring to your ad from May 3 in the newspaper.", "Formal start of an inquiry. Accusative after 'auf'."),
  p("kom-33", "KOMMUNIKATION", "Auf Wiederhören!", "Goodbye! (on the phone)", "Vielen Dank für die Auskunft. Auf Wiederhören!", "Thank you for the information. Goodbye!", "Only on the phone ('hören'). Face to face: 'Auf Wiedersehen!'"),
  p("kom-34", "KOMMUNIKATION", "Bitte rufen Sie mich zurück.", "Please call me back.", "Hier ist Tom Weber, Nummer 0151 234567. Bitte rufen Sie mich zurück.", "This is Tom Weber, number 0151 234567. Please call me back.", "Typical answering-machine message. Practise saying phone numbers in pairs of digits."),
  p("kom-35", "KOMMUNIKATION", "Ich würde vorschlagen, dass ...", "I would suggest that ...", "Ich würde vorschlagen, dass wir uns um 15 Uhr am Bahnhof treffen.", "I would suggest that we meet at the station at 3 p.m.", "Sprechen Teil 3 (planning together). Also 'Wie wäre es, wenn ...?'"),
  p("kom-36", "KOMMUNIKATION", "Das finde ich gut / nicht so gut, weil ...", "I think that is good / not so good because ...", "Das finde ich gut, weil man dort viel lernen kann.", "I think that is good because you can learn a lot there.", "Opinion pattern for Sprechen Teil 2 and 3. Always give a reason with 'weil'.")
];

export const B1_EXPANDED_VOCABULARY: B1VocabularyWord[] = [
  ...CORE_B1_VOCABULARY,
  ...EXPANDED_B1_VOCABULARY
];

/** Total number of vocabulary entries (use this for homepage claims). */
export const B1_VOCAB_TOTAL = B1_EXPANDED_VOCABULARY.length;

/** Number of entries per category. */
export const B1_VOCAB_COUNTS_BY_CATEGORY: Record<B1VocabularyCategory, number> =
  B1_EXPANDED_VOCABULARY.reduce(
    (acc, w) => {
      acc[w.category] += 1;
      return acc;
    },
    {
      ARBEIT: 0, WOHNEN: 0, BEHOERDEN: 0, GESUNDHEIT: 0, REKLAMATION: 0, VERKEHR: 0,
      EINKAUFEN: 0, FAMILIE: 0, FREIZEIT: 0, REISE: 0, KOMMUNIKATION: 0
    } as Record<B1VocabularyCategory, number>
  );
