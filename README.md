# German B1 & Citizenship Exam Prep Platform

A free, offline-first, mobile-ready web application for preparing for the **German B1 exam** and the **German Citizenship (Einburgerungstest)**. Built with Next.js 16, React 19, and TypeScript.

---

## Features

- **Citizenship Drill** - All 310 official questions with region-specific filtering (Question 301 and 308 for all 16 states), two-consecutive-correct mastery gate, and image flashcards.
- **B1 Reading Lab** - All 5 official reading parts (Blog, Press Report, Ads, Opinions, House Rules) with bilingual toggle and signal-word highlighting.
- **B1 Listening Lab** - All 4 audio parts synthesized via Web Speech API at 0.8x / 0.9x / 1.0x speeds with bilingual transcripts.
- **B1 Writing Lab** - 4 official letter templates with guided checklist and blank-detection scoring.
- **B1 Speaking Sanctuary** - Core cheat scripts with pronunciation audio.
- **Verb Master Library** - 26 conjugation rules, 208 authentic audio examples, 78 practice drills.
- **Grammar Lab** - Articles, cases, Partizip II, sentence brackets, and more.
- **Zero-to-B1 Academy** - Structured A0-to-B1 curriculum with lesson blueprints.
- **Fast Track 30-Day Hub** - Condensed sprint plan for exam-ready study.
- **Full Mock Exam Arena** - Timed TELC and Goethe mock exams.
- **ADHD Zen Mode** - One-card-at-a-time focus mode that strips all distractions.
- **Commute Sprint Drill** - 5-minute travel-friendly bite-sized sessions.
- **Multi-User Accounts** - Local username/PIN accounts with Export/Import JSON progress backup (no database needed).
- **100% Mastery Banner** - Real-time progress across all 5 exam pillars.
- **PWA Ready** - Add to Home Screen on iOS or Android for an app-like experience.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Hosting

### Option A: Vercel (Recommended - Free Forever)

1. Push this repository to your GitHub account.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your repository. Vercel auto-detects Next.js via `vercel.json`.
4. Click **Deploy**. Your site is live on `https://your-app.vercel.app` in seconds.

### Option B: Cloudflare Tunnel (Self-Hosted)

For running on your own machine with a custom domain:

1. Install [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/).
2. Copy `cloudflared-config.example.yml` to `cloudflared-config.yml` and fill in your tunnel credentials.
3. Run the local server and tunnel:
   ```bash
   ./run_service.sh
   ```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Audio | Web Speech API (no external files needed) |
| Storage | localStorage (zero backend cost) |
| Deployment | Vercel (free hobby tier) |

---

## License

MIT
