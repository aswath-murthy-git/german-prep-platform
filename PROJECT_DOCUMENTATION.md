# German B1 & Citizenship Exam Minimum-Viable Prep Platform

## Architecture & Hosting Details
- **Port**: `3001` (default; configurable via `PORT` env var)
- **Vercel Deployment**: Auto-deployed via `vercel.json` on push to `main`
- **Cloudflare Tunnel**: Optional self-hosted alternative - see `cloudflared-config.example.yml`
- **Git Repository**: `https://github.com/aswath-murthy-git/german-prep-platform`

---

## 1. Local Authentication & User Accounts (`LoginModal.tsx` & `UserContext.tsx`)
- **Built for Personal & Multi-User Use**:
  - Default Account: Username `student`, PIN `1234`.
  - Create new local accounts with custom username, display name, and 4-digit PIN.
  - Switch accounts directly on your device.
- **Zero-Cost Portability & Free Hosting Sync**:
  - Built-in **Export Progress (JSON)** and **Import Progress (JSON)**.
  - When hosting for free on Vercel or Netlify, or studying across multiple devices (e.g. phone vs laptop), download your backup file and restore all scores and drill counters in one click without needing an expensive external database.

---

## 2. ADHD-Focused Cognitive Design & Interaction Style
- **ADHD Zen Focus Mode (`CommuteSprintDrill.tsx`)**:
  - One-click toggle in the navbar activates Zen Mode.
  - Strips away all menus, extra buttons, and visual clutter to display **exactly one card/question at a time** in high contrast.
  - Prevents cognitive fatigue and overwhelm from long German text paragraphs.
- **Color-Coded Cognitive Anchors**:
  - 🟡 **Gold / Amber**: Active prompt, essential B1 keywords, and connectors.
  - 🟢 **Emerald Green**: Correct answers, mastered milestones, and guaranteed passing points.
  - 🔴 **Crimson**: Critical exam traps, negation markers (`nicht`, `kein`, `ohne`), and distractors.
  - 🔵 **Cyan**: Instant English translation and clarification.
- **Dopamine Micro-Rewards & Chimes (`soundEffects.ts`)**:
  - Web Audio API synthesizes gentle, pleasant chord chimes on correct answers (no external audio assets needed).
  - Live streak counter (`🔥 Streak`) triggers celebratory micro-confetti every 5 consecutive correct answers.
  - Sound can be toggled on or off at any time.

---

## 3. Mobile & Travel-Optimized UX (Commute Study)
- **Mobile Bottom Navigation Dock (`MobileBottomNav.tsx`)**:
  - Fixed thumb-friendly dock at the bottom of the screen (`bottom: 0`, safe-area insets).
  - Minimum 48px touch targets for effortless one-handed use on the train, bus, or subway.
- **Commute Sprint Mode**:
  - 5-minute bite-sized travel drill serving one question at a time with instant explanation.
  - Prioritizes questions answered incorrectly or not yet mastered.
- **PWA Web App Manifest (`public/manifest.json`)**:
  - Mobile standalone display enabled.
  - Tap "Add to Home Screen" on iPhone Safari or Android Chrome to launch as an app.

---

## 4. "Practice Until You Pass" (100% Exam-Ready Guarantee)
- **The Core Philosophy**:
  - A learner with weak German grammar passes by practicing the exact recurring patterns and questions until mathematically guaranteed to score above the passing line.
- **Strict Mastery Criteria**:
  - **Citizenship**: A question is only certified "Exam-Ready" after being answered correctly **twice in a row** (consecutive count >= 2). A wrong answer resets the counter to 0.
  - **B1 Writing**: 4 templates practiced until 0 blank mistakes and all 5 checklist criteria met.
  - **B1 Speaking**: 3 core cheat scripts drilled with audio pronunciation.
  - **B1 Reading (Leseverstehen)**: All 5 exam parts (Blog, Press Report, Ads, Opinions, House Rules) practiced with fast-scan keyword matching.
  - **B1 Listening (Hörverstehen)**: All 4 audio parts (Announcements, Tour, Office Dialogue, Radio Discussion) practiced with multi-speed audio player.
  - **B1 Keywords**: All 8 keyword trap pairs recognized without error.
- **100% Mastery Banner (`MasteryCertificateBanner.tsx`)**:
  - Displays real-time progress across all 5 pillars (Citizenship, Reading, Listening, Writing, and Speaking).
  - Once 100% is reached, issues the "100% Exam-Ready Certified" badge.

---

## 5. B1 Reading Master Lab (`B1ReadingLab.tsx`)
- **Direct Access**: Click **Lesen** in the top navigation or on the mobile bottom dock.
- **Covers All 5 Official B1 Reading Parts**:
  - **Teil 1**: Blog / Reisebericht (Social Blog on Apartment Hunting in Germany).
  - **Teil 2**: Pressebericht / Zeitungsartikel (Work-Life Balance and 4-Day Work Week).
  - **Teil 3**: Anzeigen zuordnen (Matching 5 user needs with 5 classified advertisements).
  - **Teil 4**: Meinungen Ja / Nein (Public forum debate on electric scooters in cities).
  - **Teil 5**: Hausordnung / Sicherheitsvorschriften (Official residential noise rules and quiet hours).
- **A1-to-B1 Passing Features**:
  - **Bilingual Reading**: 1-click toggle to show or hide English line-by-line translation.
  - **Signal-Word Fast Scan**: Highlights key German synonyms so learners do not need to understand every word to find the right answer.
  - **Trap Explanations**: Immediate explanation of why tempting wrong answers are tricks (e.g. `preiswert` vs `kostenlos`).

---

## 6. B1 Listening Master Lab (`B1ListeningLab.tsx`)
- **Direct Access**: Click **Hören** in the top navigation or on the mobile bottom dock.
- **Covers All 4 Official B1 Listening Parts**:
  - **Teil 1**: Kurze Durchsagen & Anrufbeantworter (Train delay, doctor cancellation, weather alert).
  - **Teil 2**: Museumsführung / Stadtrundgang (Guide introducing BMW Museum Munich).
  - **Teil 3**: Büro- & Alltagsgespräch (Two colleagues organizing an office summer barbecue).
  - **Teil 4**: Radio-Diskussion (Moderator interviewing guests on remote work).
- **Dedicated Audio Console with Multi-Speed Control**:
  - **0.8x**: Learner Pace (extra clear articulation for A1-A2 beginners).
  - **0.9x**: Recommended Study Pace.
  - **1.0x**: Official Exam Speed.
- **Speech Synthesis & Transcripts**:
  - Web Speech API synthesizes spoken German text cleanly without requiring external media downloads.
  - **Interactive Transcript**: Can be kept hidden during exam simulation, or toggled visible for study.
  - **Bilingual Transcript**: Side-by-side English translation for difficult phrases.
  - **Distractor Alerts**: Shows how examiners plant false clues (e.g. mentioning a date before correcting it: "Eigentlich wollten wir Dienstag, aber...").

---

## 7. Free Hosting Setup (Git & Vercel)
This platform is built with **zero paid dependencies** (no paid APIs, speech uses native browser synthesis, state uses client storage):

### Deploying for Free to Vercel (Hobby Tier: 100% Free Forever):
1. Push your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/aswath-murthy-git/german-prep-platform.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import the repository.
3. Vercel automatically detects Next.js (using `vercel.json`). Click **Deploy**.
4. Your site will be live on `https://your-app.vercel.app` at zero cost.

---

## 8. Local Server Commands
- **Run in Background with Cloudflare Tunnel**:
  ```bash
  ./run_service.sh
  ```
- **Run in Local Dev Mode**:
  ```bash
  npm run dev
  ```
