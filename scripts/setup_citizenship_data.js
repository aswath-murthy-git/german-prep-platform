const https = require("https");
const fs = require("fs");
const path = require("path");

const DATA_URL = "https://raw.githubusercontent.com/abdullahbutt/leben-in-deutschland-test/html/quiz-data.json";
const BASE_IMG_URL = "https://raw.githubusercontent.com/abdullahbutt/leben-in-deutschland-test/html/";

const publicImgDir = path.join(__dirname, "../public/images/citizenship");
const dataDir = path.join(__dirname, "../src/data");

fs.mkdirSync(publicImgDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on("finish", () => {
        stream.close();
        resolve();
      });
      stream.on("error", reject);
    }).on("error", reject);
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let raw = "";
      res.on("data", c => raw += c);
      res.on("end", () => {
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("Fetching BAMF Citizenship Quiz Data...");
  const rawData = await fetchJson(DATA_URL);

  const imagesToDownload = new Set();

  function processQuestion(q, stateSlug = null, stateName = null) {
    let imgPath = null;
    if (q.image) {
      const fileName = path.basename(q.image);
      imagesToDownload.add(q.image);
      imgPath = `/images/citizenship/${fileName}`;
    }

    return {
      id: q.id,
      stateSlug: stateSlug,
      stateName: stateName,
      de: q.de,
      en: q.en,
      options: q.options.map(o => ({
        de: o.de,
        en: o.en
      })),
      correct: q.correct,
      explanation_de: q.exp_de || "",
      explanation_en: q.exp_en || "",
      image: imgPath,
      category: stateSlug ? "State Specific" : (q.id <= 100 ? "Politik in der Demokratie" : q.id <= 200 ? "Geschichte und Verantwortung" : "Mensch und Gesellschaft")
    };
  }

  const generalQuestions = rawData.general.map(q => processQuestion(q));

  const states = {};
  for (const sSlug in rawData.states) {
    const sObj = rawData.states[sSlug];
    states[sSlug] = {
      slug: sSlug,
      name_de: sObj.name_de,
      name_en: sObj.name_en,
      questions: sObj.questions.map(q => processQuestion(q, sSlug, sObj.name_en))
    };
  }

  const finalData = {
    version: rawData.version || "2026",
    totalGeneral: generalQuestions.length,
    totalStates: Object.keys(states).length,
    general: generalQuestions,
    states: states
  };

  const outJsonPath = path.join(dataDir, "citizenship_data.json");
  fs.writeFileSync(outJsonPath, JSON.stringify(finalData, null, 2), "utf8");
  console.log(`Saved ${generalQuestions.length} general questions and 16 states to ${outJsonPath}`);

  console.log(`Downloading ${imagesToDownload.size} question images...`);
  for (const imgRel of imagesToDownload) {
    const fileName = path.basename(imgRel);
    const dest = path.join(publicImgDir, fileName);
    const fullUrl = BASE_IMG_URL + imgRel;
    try {
      await downloadFile(fullUrl, dest);
      process.stdout.write(".");
    } catch (err) {
      console.error(`\nFailed image ${fullUrl}:`, err.message);
    }
  }
  console.log("\nAll images downloaded successfully!");
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
