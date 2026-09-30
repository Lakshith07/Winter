# WINTER ARC — 90 DAYS

> **"90 Days. No Excuses. Become Unrecognizable."**

**WINTER ARC — 90 DAYS** is a modern, production-ready, dark-themed personal self-improvement tracking web application designed to help you conquer your 90-day transformation from **October 1, 2026** to **December 29, 2026**.

Built with **React 19**, **Vite**, **Tailwind CSS**, **Lucide React**, **Recharts**, **HTML5 Web Audio Synthesizer**, and **LocalStorage** persistence.

---

## ❄️ Features Overview

### 1. Dashboard
- **Personalized Welcome**: `"Welcome to your Winter Arc, Lakshith."` (Name customizable in Settings).
- **Challenge Progress Gauge**: Large glowing circular SVG progress gauge displaying real-time overall completion percentage and current challenge day (`Day X / 90`).
- **Live Countdown Banner**: Live-ticking countdown to challenge start (before Oct 1) or countdown to December 29, 2026.
- **KPI Metric Cards**: Current Streak, Longest Streak, Today's Habit Target, Total Completed Habits.
- **Context-Aware Motivation**: Dynamic motivational engine that adapts to user momentum, milestones, perfect days, or streak recoveries without guilt.
- **"Your Reason to Start"**: Embedded personal manifesto card with inline editing and persistent saving.
- **Today's Quick Habit Action Grid**: 1-click completion toggles right on the dashboard.
- **Sleep Quick-Logger**: Direct logging for last night's sleep with recovery feedback.
- **Quote of the Day**: Rotating daily wisdom from Stoic philosophers and discipline masters with 1-click clipboard copying.

### 2. 8 Daily Habits Workspace
1. **Wake up at 5:30–5:40 AM** — *Discipline*
2. **Gym / Workout** — *Fitness*
3. **Follow my diet** — *Nutrition*
4. **Drink enough water** — *Health*
5. **Solve one LeetCode problem** — *Coding*
6. **DSA practice** — *Algorithms*
7. **Limit social media** — *Focus & Dopamine Shield*
8. **Learn one new skill daily** — *Growth*

- **Interactive Date Navigator**: Browse past days, jump to today, or review challenge history.
- **Future Date Protection**: Automatically locks future dates from being marked as completed.
- **Daily Completion Timestamps**: Automatically timestamps each habit (e.g. `Completed at 05:35 AM`).
- **Undo Capability**: Easily uncheck any habit if clicked accidentally.
- **8/8 Flawless Victory Banner**: Particle confetti celebration and audio chime when all 8 habits are executed.
- **Daily Reflection & Workout Notes**: Dedicated log for workout PRs, LeetCode problem details, and thoughts.

### 3. 90-Day Calendar & Streak Matrix
- Complete 90-day calendar divided into:
  - **October 2026** (Days 1–31)
  - **November 2026** (Days 32–61)
  - **December 2026** (Days 62–90)
  - **Full 90-Day Master Matrix**
- Visual Status per Day:
  - 🟢 **Green (Frost Emerald)**: 100% (8/8 habits completed)
  - 🔵 **Blue / Cyan**: Threshold met or partial completion
  - 🔴 **Red / Muted**: 0 habits completed
  - ⚡ **Glowing Border**: Today's active date
  - 🔒 **Lock Icon**: Future date
- **Interactive Day Modal**: Click any day to view or edit its 8 habits, sleep hours, and notes.
- **Dual View Modes**: Switch between graphical **Calendar Grid** and high-density **Matrix Table** recreated from the original reference sheet.

### 4. Streak & Milestone System
- **Real Streak Calculation**: A day counts as successful if $\ge$ threshold (default 6/8 habits, customizable in Settings).
- Consecutive successful days increment the active streak with a prominent **Fire Icon**.
- **9 Streak Milestone Badges**:
  - 🥉 3 Days: *Spark of Discipline*
  - 🥈 7 Days: *Iron Habit*
  - 🥈 14 Days: *Two Weeks of Fortitude*
  - 🥇 21 Days: *Rewired Mind*
  - 🥇 30 Days: *Phase 1: The Foundation*
  - 💎 45 Days: *Halfway Unrecognizable*
  - 💎 60 Days: *Phase 2: Cold Mastery*
  - 👑 75 Days: *Apex Predator*
  - 🏆 90 Days: *UNRECOGNIZABLE VICTORY*

### 5. Sleep & Recovery Tracker
- Dedicated sleep tracker recording daily sleep hours (4h, 5h, 6h, 7h, 8h, 9h, 10h).
- Recovery feedback: Highlights nights $<7$h with constructive recovery reminders.
- Kept strictly independent from the 8 daily habits.

### 6. Monthly Goals & Reflections
Recreation of the three bottom sections from the reference tracker:
1. **My Monthly Goals** (with add, edit, priority tag, toggle, delete)
2. **What I Have Achieved This Month** (milestone victories log)
3. **What Should I Improve?** (constructive adjustments & action plans)
- Distinct records saved for **October**, **November**, and **December**.

### 7. Progress Analytics (Recharts)
- **Daily Habit Completion Bar Chart** (with threshold reference line)
- **Weekly Consistency Area Chart** (Week 1 through Week 13 trend)
- **Sleep Duration Chart** (with 7h optimal reference line)
- **Habit-by-Habit Adherence Ranking** (horizontal bar chart)
- **Monthly Progress Breakdown**
- **Milestone Trophy Gallery**

### 8. Settings & Data Portability
- Customizable display name & personal motivation statement.
- Streak success threshold selector (5, 6, 7, or 8 habits).
- Theme switch: **Dark Winter**, **Glacier Light**, and **Pure OLED**.
- Audio chimes toggle (synthesized Web Audio API).
- Date simulation selector (for testing any day).
- **JSON Backup Export**: Download `winter-arc-backup-YYYY-MM-DD.json`.
- **JSON Backup Import**: Restore saved backups with instant preview and validation.
- **Challenge Reset**: Secure reset with double-confirmation dialog.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Frosted Glass Design System
- **Icons**: Lucide React
- **Charts**: Recharts
- **Celebrations**: Canvas Confetti + Web Audio API Synthesizer
- **Storage**: Browser LocalStorage
- **Routing**: React Router DOM
- **Deployment**: Vercel ready (`vercel.json` SPA rewrites included)

---

## 🚀 Quick Start (Local Development)

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

### Option A: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B: Via GitHub & Vercel Dashboard
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Vercel will build and deploy your Winter Arc website with 0 extra configuration!

---

## 🔒 Privacy & Data Storage

All data is stored directly in your browser's `localStorage`. No accounts, no API keys, and no third-party tracking. You own 100% of your transformation data.
