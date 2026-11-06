# -*- coding: utf-8 -*-
import json

speaking_data = """import { SpeakingPart } from "@/types";

export const B1_SPEAKING_PARTS: SpeakingPart[] = [
  {
    id: "speaking-part-1",
    partNumber: 1,
    title: "Teil 1: Sich vorstellen (Self-Introduction)",
    title_en: "Part 1: Introducing Yourself (Guaranteed Passing Formula)",
    description: "In Teil 1 des B1-Sprechens stellen Sie sich anhand von 7 Leitpunkten vor. Prüfer erwarten flüssige Sätze mit mindestens 2 B1-Konnektoren (weil, obwohl, seit).",
    description_en: "In Part 1 of the B1 speaking exam, introduce yourself using 7 key prompts. Examiners expect fluent sentences with at least two B1 connectors (because, although, since).",
    minPassFormula: [
      "1. Name: Mein Name ist [Name] und ich komme aus [Land].",
      "2. Wohnort: Zurzeit wohne ich in [Stadt], wo ich mich sehr wohl fühle.",
      "3. Dauer: Ich lebe seit [Zahl] Jahren in Deutschland, weil ich hier neue berufliche Chancen suche.",
      "4. Beruf: Von Beruf bin ich [Beruf], und aktuell arbeite ich als [Job].",
      "5. Familie: Ich bin [verheiratet / ledig] und habe [Zahl] Kinder.",
      "6. Sprachen: Meine Muttersprache ist [Sprache], außerdem spreche ich fließend Englisch und lerne jetzt Deutsch auf B1-Niveau.",
      "7. Hobbys: In meiner Freizeit spiele ich gerne Fußball, koche internationale Gerichte und lese historische Bücher."
    ],
    minPassFormula_en: [
      "1. Name: My name is [Name] and I come from [Country].",
      "2. Location: Currently I live in [City], where I feel very comfortable.",
      "3. Duration: I have lived in Germany for [Number] years because I seek new career opportunities here.",
      "4. Occupation: By profession I am a [Profession], and currently work as a [Job].",
      "5. Family: I am [married / single] and have [Number] children.",
      "6. Languages: My native language is [Language], I also speak fluent English and am currently learning German at B1 level.",
      "7. Hobbies: In my free time I like playing football, cooking international dishes, and reading history books."
    ],
    samplePrompts: [
      {
        prompt: "Vollständiges Musterbeispiel für Teil 1",
        prompt_en: "Full Model Introduction for Part 1",
        modelAnswer: "Guten Tag! Mein Name ist Alex Becker und ich komme ursprünglich aus Indien. Seit knapp zwei Jahren lebe ich hier in Frankfurt am Main, weil ich als Software-Entwickler bei einem internationalen Unternehmen tätig bin. Ich bin verheiratet und lebe hier mit meiner Frau. Meine Muttersprache ist Tamil, aber ich spreche auch fließend Englisch. Obwohl Deutsch eine anspruchsvolle Sprache mit vielen Grammatikregeln ist, gefällt mir das Lernen sehr, da ich mich im Alltag problemlos mit Nachbarn und Kollegen verständigen möchte. In meiner Freizeit jogge ich gerne am Mainufer, fahre mit dem Fahrrad und erkunde deutsche Städte.",
        modelAnswer_en: "Good day! My name is Alex Becker and I originally come from India. I have lived here in Frankfurt am Main for almost two years because I work as a software engineer at an international company. I am married and live here with my wife. My native language is Tamil, but I also speak fluent English. Although German is a challenging language with many grammar rules, I enjoy learning it because I want to communicate effortlessly with neighbors and colleagues in daily life. In my free time, I enjoy jogging along the Main river, cycling, and exploring German cities.",
        followUpQuestions: [
          {
            q: "Prüfer-Frage: Wie lange lernen Sie schon Deutsch und wie lernen Sie am liebsten?",
            q_en: "Examiner question: How long have you been learning German and how do you prefer to learn?",
            a: "Ich lerne seit ungefähr einem Jahr intensiv Deutsch. Am liebsten lerne ich, indem ich deutsche Podcasts höre und mich regelmäßig mit deutschen Freunden unterhalte.",
            a_en: "I have been learning German intensively for about one year. I prefer learning by listening to German podcasts and regularly speaking with German friends."
          },
          {
            q: "Prüfer-Frage: Was gefällt Ihnen in Deutschland am besten?",
            q_en: "Examiner question: What do you like best in Germany?",
            a: "Mir gefallen besonders die gut organisierte Infrastruktur, die Pünktlichkeit der Züge und die wunderschöne Natur mit vielen Parks und Wäldern.",
            a_en: "I particularly like the well-organized infrastructure, the punctuality of trains, and the beautiful nature with many parks and forests."
          }
        ]
      }
    ]
  },
  {
    id: "speaking-part-2",
    partNumber: 2,
    title: "Teil 2: Ein Bild beschreiben & eigene Erfahrungen",
    title_en: "Part 2: Picture Description & Personal Experience (The 5-Sentence Golden Formula)",
    description: "Beschreiben Sie ein vorgelegtes Foto und vergleichen Sie die Situation mit Ihrem Heimatland. Nutzen Sie die 5 festen Phrasen, um maximale Punkte ohne langes Nachdenken zu sichern.",
    description_en: "Describe a provided photo and compare the situation with your home country. Use the 5 fixed phrases to secure maximum points without hesitation.",
    minPassFormula: [
      "Schritt 1 (Allgemeines): Auf dem Foto sehe ich ein Bild zum Thema [Thema].",
      "Schritt 2 (Details): Im Vordergrund erkennt man [Objekt/Person], während im Hintergrund [Objekt] zu sehen ist.",
      "Schritt 3 (Atmosphäre): Die Stimmung wirkt auf mich sehr [angenehm / ruhig], weil die Menschen lächeln.",
      "Schritt 4 (Meinung): Ich persönlich finde, dass [Thema] in der heutigen Zeit eine zentrale Rolle spielt.",
      "Schritt 5 (Heimatland): In meinem Heimatland ist die Situation [ähnlich / anders], da die meisten Menschen dort..."
    ],
    minPassFormula_en: [
      "Step 1 (General): In the photo I see an image on the topic of [Topic].",
      "Step 2 (Details): In the foreground one recognizes [Object/Person], while in the background [Object] can be seen.",
      "Step 3 (Atmosphere): The atmosphere seems very [pleasant / calm] to me because the people are smiling.",
      "Step 4 (Opinion): Personally I believe that [Topic] plays a central role in modern times.",
      "Step 5 (Home country): In my home country the situation is [similar / different] because most people there..."
    ],
    samplePrompts: [
      {
        prompt: "Thema 1: Home-Office und mobiles Arbeiten",
        prompt_en: "Topic 1: Home Office and Remote Work",
        modelAnswer: "Auf diesem Bild sehe ich eine junge Frau, die an einem aufgeräumten Schreibtisch in ihrem Wohnzimmer sitzt. Im Vordergrund sieht man einen modernen Laptop, eine Kaffeetasse und einige Notizen. Im Hintergrund befindet sich ein helles Bücherregal und eine grüne Pflanze. Die Atmosphäre wirkt sehr konzentriert und entspannt, da die Frau aufmerksam auf den Bildschirm blickt. Das Bild behandelt das Thema mobiles Arbeiten oder Home-Office. Ich persönlich arbeite auch sehr gerne von zu Hause aus, weil man dadurch viel Fahrzeit spart. In meinem Heimatland wird Home-Office seit der Pandemie ebenfalls immer beliebter, allerdings arbeiten traditionelle Firmen immer noch am liebsten vor Ort im Büro.",
        modelAnswer_en: "In this picture I see a young woman sitting at a tidy desk in her living room. In the foreground one sees a modern laptop, a coffee mug, and some notes. In the background there is a bright bookshelf and a green plant. The atmosphere appears very concentrated and relaxed because the woman is looking attentively at the screen. The picture deals with the topic of remote work or home office. Personally I also enjoy working from home because it saves a lot of commute time. In my home country, home office has also become increasingly popular since the pandemic, although traditional companies still prefer working on-site in the office."
      },
      {
        prompt: "Thema 2: Öffentliche Verkehrsmittel vs. Auto",
        prompt_en: "Topic 2: Public Transportation vs. Private Car",
        modelAnswer: "Auf diesem Foto sehe ich viele Menschen an einem Bahnsteig, die auf eine moderne Straßenbahn warten. Im Vordergrund steht ein junger Mann mit Kopfhörern und Smartphone, während im Hintergrund die Bahn gerade einfährt. Die Atmosphäre wirkt friedlich und alltäglich. Das zentrale Thema ist die Nutzung von öffentlichen Verkehrsmitteln in der Stadt. Meiner Meinung nach ist die Bahn eine sehr umweltfreundliche Alternative zum Auto. In meinem Heimatland nutzen die meisten Menschen Busse oder Motorräder, weil das U-Bahn-Netz noch nicht in allen Stadtteilen ausgebaut ist.",
        modelAnswer_en: "In this photo I see many people on a railway platform waiting for a modern tram. In the foreground stands a young man with headphones and smartphone, while in the background the train is just pulling in. The atmosphere feels peaceful and everyday. The central theme is the use of public transport in the city. In my opinion, the train is a very environmentally friendly alternative to the car. In my home country, most people use buses or motorbikes because the subway network is not yet expanded in all districts."
      },
      {
        prompt: "Thema 3: Haustiere in der Familie (Hunde & Katzen)",
        prompt_en: "Topic 3: Pets in the Family (Dogs and Cats)",
        modelAnswer: "Auf diesem Foto sehe ich eine vierköpfige Familie mit einem kleinen braunen Hund im Park. Im Vordergrund rennen zwei fröhliche Kinder mit einem Ball, während die Eltern im Hintergrund auf einer Parkbank lächeln. Die Stimmung wirkt harmonisch und voller Lebensfreude. Das zentrale Thema ist die Haltung von Haustieren in Familien. Meiner Meinung nach lernen Kinder durch ein Haustier früh Verantwortung und Fürsorge, allerdings erfordert ein Hund viel Zeit für tägliche Spaziergänge und Tierarztkosten. In meinem Heimatland leben Hunde meistens draußen im Garten als Wachhunde, während in Deutschland Hunde oft wie vollwertige Familienmitglieder in der Wohnung leben.",
        modelAnswer_en: "In this photo I see a family of four with a small brown dog in the park. In the foreground two cheerful children run with a ball, while in the background the parents smile on a park bench. The atmosphere feels harmonious. The central topic is keeping pets in families. In my opinion, children learn responsibility and care through pets, although a dog requires a lot of time for daily walks and vet bills. In my home country dogs mostly live outdoors in the garden, whereas in Germany dogs often live in the apartment like full family members."
      },
      {
        prompt: "Thema 4: Einkaufen im Internet vs. im Geschäft vor Ort",
        prompt_en: "Topic 4: Online Shopping vs. Local In-Store Shopping",
        modelAnswer: "Auf diesem Bild sehe ich einen Mann, der mit seinem Smartphone auf dem Sofa sitzt und auf einem Online-Portal einkauft. Neben ihm auf dem Tisch stehen zwei bereits gelieferte Pappkartons. Im Hintergrund ist ein modernes Wohnzimmer zu sehen. Das Bild behandelt das Thema Online-Shopping im Vergleich zum traditionellen Einzelhandel. Ich persönlich bestelle Bücher und Elektronikartikel gerne im Internet, weil die Preise oft günstiger sind und die Ware direkt nach Hause geliefert wird. Kleidung und Schuhe kaufe ich jedoch lieber im Geschäft vor Ort, da man die Sachen sofort anprobieren kann. In meinem Heimatland kaufen die meisten Menschen frische Lebensmittel täglich auf traditionellen Märkten ein.",
        modelAnswer_en: "In this picture I see a man sitting on the sofa with his smartphone shopping on an online portal. Next to him on the table are two cardboard boxes already delivered. The central topic is online shopping compared to traditional retail. Personally I like ordering books and electronics online because prices are often lower and goods are delivered home. However, I prefer buying clothes and shoes in local stores because you can try them on immediately. In my home country, most people buy fresh groceries daily at traditional markets."
      }
    ]
  },
  {
    id: "speaking-part-3",
    partNumber: 3,
    title: "Teil 3: Gemeinsam etwas planen (Planning Together)",
    title_en: "Part 3: Planning an Event Together (Partner Dialogue Flow)",
    description: "Planen Sie mit Ihrem Partner eine gemeinsame Aktivität (z. B. Geburtstagsfeier, Geschenk, Ausflug). Zeigen Sie Dialogfähigkeit durch Vorschläge, höfliche Einwände und Aufgabenteilung.",
    description_en: "Plan an activity together with your partner (e.g. birthday party, joint gift, weekend trip). Demonstrate conversation skills via suggestions, polite objections, and task allocation.",
    minPassFormula: [
      "1. Vorschlag machen: Was hältst du davon, wenn wir...?",
      "2. Zustimmen: Das ist ein hervorragender Vorschlag, das machen wir!",
      "3. Höflicher Einwand: Eigentlich gerne, aber am Samstag habe ich schon einen Termin. Wie wäre es stattdessen am Sonntag?",
      "4. Aufgaben aufteilen: Ich kann mich um die Getränke kümmern, könntest du das Geschenk besorgen?",
      "5. Abschluss: Abgemacht! Wir treffen uns am Sonntag um 14 Uhr am Hauptbahnhof."
    ],
    minPassFormula_en: [
      "1. Make suggestion: What do you think about us doing...?",
      "2. Agree: That is an excellent suggestion, let us do that!",
      "3. Polite objection: Actually gladly, but on Saturday I already have an appointment. How about Sunday instead?",
      "4. Divide tasks: I can take care of the drinks, could you obtain the gift?",
      "5. Agreement: Deal! We meet on Sunday at 2:00 PM at the central station."
    ],
    samplePrompts: [
      {
        prompt: "Szenario 1: Eine Überraschungsparty für die Kollegin Sarah planen",
        prompt_en: "Scenario 1: Planning a Surprise Party for Colleague Sarah",
        modelAnswer: `Kandidat A: Hallo! Wie du weißt, hat unsere Kollegin Sarah nächste Woche Geburtstag. Was hältst du davon, wenn wir eine kleine Überraschungsparty für sie im Pausenraum organisieren?

Kandidat B: Das ist eine fantastische Idee! Sarah wird sich bestimmt riesig freuen. Wann sollten wir die Feier am besten machen? Passt es dir am Freitagnachmittag nach der Arbeit?

Kandidat A: Ja, Freitag ab 16:00 Uhr klingt perfekt. Was schenken wir ihr? Ich schlage vor, dass wir alle zusammenlegen und ihr einen Gutschein für ihre Lieblingsbuchhandlung kaufen.

Kandidat B: Einverstanden! Ich kann das Geld von den Kollegen einsammeln und den Gutschein besorgen. Könntest du dich vielleicht um einen Kuchen und alkoholfreie Getränke kümmern?

Kandidat A: Sehr gerne, ich backe einen frischen Apfelkuchen und bringe Säfte und Mineralwasser mit. Sollen wir auch eine Glückwunschkarte besorgen, auf der alle unterschreiben?

Kandidat B: Großartig! Die Karte bringe ich mit. Dann haben wir alles Wichtige geregelt. Wir treffen uns am Freitag um 15:30 Uhr zur Vorbereitung.`,
        modelAnswer_en: `Candidate A: Hello! As you know, our colleague Sarah has her birthday next week. What do you think about organizing a small surprise party for her in the break room?

Candidate B: That is a fantastic idea! Sarah will surely be thrilled. When should we best hold the party? Does Friday afternoon after work suit you?

Candidate A: Yes, Friday after 4:00 PM sounds perfect. What shall we give her as a gift? I suggest we all pool money together and buy her a voucher for her favorite bookstore.

Candidate B: Agreed! I can collect the money from colleagues and get the voucher. Could you perhaps take care of a cake and non-alcoholic drinks?

Candidate A: Gladly, I will bake a fresh apple cake and bring juices and sparkling water. Should we also get a greeting card where everyone can sign?

Candidate B: Wonderful! I will bring the card. Then we have organized everything important. We meet on Friday at 3:30 PM for setup.`
      },
      {
        prompt: "Szenario 2: Einen gemeinsamen Wochenendausflug nach Heidelberg planen",
        prompt_en: "Scenario 2: Planning a Weekend Trip to Heidelberg",
        modelAnswer: `Kandidat A: Hallo! Der Frühling ist da und das Wetter soll am Wochenende fantastisch werden. Wollen wir einen gemeinsamen Tagesausflug nach Heidelberg machen?

Kandidat B: Das ist eine super Idee! Heidelberg mit dem alten Schloss und der historischen Altstadt wollte ich schon immer mal sehen. Wie wollen wir dorthin fahren? Mit dem Auto oder mit der Bahn?

Kandidat A: Ich bin für die Bahn. Mit dem Deutschlandticket können wir kostenlos mit dem Regionalexpress fahren und sparen uns den teuren Parkplatz in der Stadt.

Kandidat B: Absolut einverstanden. Die Fahrt dauert nur etwa eine Stunde. Wann wollen wir am Samstag losfahren? Ich schlage vor, wir nehmen den Zug um 08:30 Uhr.

Kandidat A: 08:30 Uhr am Hauptbahnhof passt perfekt. Was wollen wir vor Ort unternehmen? Wir sollten unbedingt das Heidelberger Schloss besichtigen und über die Alte Brücke spazieren.

Kandidat B: Ja, genau! Und mittags können wir in einem traditionellen Restaurant essen oder ein schönes Picknick am Neckarufer machen. Ich kann belegte Brote und Obst mitbringen.

Kandidat A: Großartig, dann besorge ich Mineralwasser und einen Stadtplan. Wir treffen uns am Samstag um 08:15 Uhr vor der Bahnhofsbäckerei!`,
        modelAnswer_en: `Candidate A: Hello! Spring is here and weather is forecast to be fantastic this weekend. Do we want to make a day trip to Heidelberg together?

Candidate B: Great idea! I always wanted to see Heidelberg with its castle and old town. How should we travel? Car or train?

Candidate A: I am in favor of the train. With the Deutschlandticket we can ride the Regional Express for free and avoid expensive parking.

Candidate B: Completely agreed. The ride takes only one hour. When should we depart Saturday? I suggest the 8:30 AM train.

Candidate A: 8:30 AM at main station fits perfectly. We should definitely visit the castle and walk over the Old Bridge.

Candidate B: Yes, and for lunch we can picnic by the Neckar river. I can bring sandwiches and fruit.

Candidate A: Wonderful, I will get water and a city map. We meet Saturday at 8:15 AM in front of the station bakery!`
      },
      {
        prompt: "Szenario 3: Einem Kollegen beim Wohnungsumzug helfen",
        prompt_en: "Scenario 3: Helping a Colleague with an Apartment Move",
        modelAnswer: `Kandidat A: Hallo! Unser Kollege Daniel zieht am kommenden Samstag in seine neue Wohnung und hat gefragt, ob wir ihm beim Umzug helfen können. Hast du Zeit dafür?

Kandidat B: Ja, am Samstagvormittag habe ich noch nichts vor. Ich helfe gerne! Weißt du, wie viele Leute mithelfen und ob Daniel schon einen Transporter organisiert hat?

Kandidat A: Ja, Daniel hat einen großen Transporter gemietet und zwei weitere Freunde helfen auch mit. Wir fangen um 09:00 Uhr an, die Möbel abzubauen und die Kartons hinunterzutragen.

Kandidat B: Prima. Hast du vielleicht Werkzeug wie Akkuschrauber und Inbusschlüssel? Das braucht man beim Möbelabbau immer.

Kandidat A: Ja, ich bringe meinen kompletten Werkzeugkoffer und Arbeitshandschuhe für uns beide mit. Könntest du dafür sorgen, dass wir Verpflegung für die Helfer haben?

Kandidat B: Kein Problem, ich kaufe am Freitag einen Kasten Mineralwasser, Säfte und backe ein Blech Pizza für die Mittagspause. Dann müssen wir nichts extra bestellen.

Kandidat A: Perfekt geregelt. Ich hole dich am Samstag um 08:30 Uhr mit dem Fahrrad ab und dann fahren wir gemeinsam zu Daniel!`,
        modelAnswer_en: `Candidate A: Hello! Colleague Daniel is moving next Saturday and asked if we can help. Do you have time?

Candidate B: Yes, Saturday morning I am free. Gladly! Do you know how many people are helping and if Daniel rented a van?

Candidate A: Yes, Daniel rented a large van and two other friends are helping. We start at 9:00 AM dismantling furniture and carrying boxes.

Candidate B: Great. Do you have tools like a cordless screwdriver?

Candidate A: Yes, I will bring my toolbox and work gloves for both of us. Could you arrange snacks for the helpers?

Candidate B: No problem, I will buy mineral water, juices, and bake pizza for lunch break.

Candidate A: Perfectly arranged. I will pick you up Saturday at 8:30 AM!`
      }
    ]
  }
];
"""

with open("/Users/testy/Desktop/code/german-prep-platform/src/data/b1_speaking_data.ts", "w", encoding="utf-8") as f:
    f.write(speaking_data)

print("Successfully updated b1_speaking_data.ts with expanded topics and partner planning scenarios!")
