# 🚀 JobPilot — Job Application Tracker

A React-based job search tracker for managing applications, interviews and offers.
Track progress across your pipeline, review status trends, and move opportunities
through a practical workflow with Firebase auth and cloud sync.

> **Firebase is required.** Configure your Firebase project before using the app
for authentication and Firestore syncing.

---

## ✨ Features

### Authentication
- Email / password **sign up** & **sign in**
- **Google** sign-in (popup)
- **Forgot password** (reset email)
- **Protected routes** + **session persistence** (stay signed in across reloads)
- **Logout** everywhere

### Dashboard
- Stat cards: Total applications, Interviews, Offers, Rejections, Response rate
- Custom **SVG charts**: status donut, 6-month timeline, pipeline breakdown
- Recent applications feed
- Loading skeletons + empty states

### Job Management
- **Add / Edit / Delete** applications
- **Search**, **filter** (status, type, priority) and **sort** (6 options)
- Per-application status tracking, salary, contacts, notes, priority & more
- Form **validation** and toast notifications

### Pipeline board
- Four columns: **Applied → Interview → Offer → Rejected**
- **Drag & drop** to update status instantly
- Add directly to any column

### Profile & Settings
- Update display name and **profile image** (URL or auto initials avatar)
- Switch **light / dark** theme
- Manage data and clear all
- Update email & password
- Account sign-out

### UI / UX
- Modern responsive design, fully **responsive**
- **Dark mode** (class-based, persisted + system-aware)
- **Toast** notifications, **loading skeletons**, **empty states**
- Reusable component library + custom hooks

---

## 🧰 Tech Stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | **React 19**                            |
| Build tool     | **Vite 7**                              |
| Styling        | **Tailwind CSS v4**                     |
| Routing        | **React Router v7** (HashRouter)        |
| Auth + DB      | **Firebase Authentication + Firestore** |
| State          | **Context API** + custom hooks          |
| Icons          | **lucide-react**                        |
| Language       | **JavaScript (JSX)**                    |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

Open the printed local URL. Sign up with your Firebase account (or click
**Continue with Google**) to start using the tracker.

---

## 🔥 Optional: Connect Firebase

To enable cloud auth and synced data across devices, connect Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com) and
   **create a project**.
2. Add a **Web app** (</> icon) and copy the generated config values.
3. In the Firebase Console, enable:
   - **Authentication → Sign-in method → Email/Password** ✅
   - **Authentication → Sign-in method → Google** ✅
   - **Firestore Database → Create database** (production mode is fine with the
     rules below).
4. Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Restart `npm run dev`. The app now uses **Firebase Authentication + Cloud
   Firestore** (the sidebar/status badges confirm "Connected to Firebase").

### Firestore Security Rules

The included [`firestore.rules`](./firestore.rules) ensure users can only access
**their own** applications. Deploy them with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

```js
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      allow read:   if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
  }
}
```

---

## 📁 Project Structure

```
src/
├─ components/
│  ├─ auth/            # AuthShell, GoogleButton
│  ├─ dashboard/       # StatCard, Charts (SVG donut/bars/timeline)
│  ├─ jobs/            # JobCard, JobForm, JobModal
│  ├─ layout/          # Layout, Sidebar, Topbar
│  ├─ ui/              # Button, Input, Select, Modal, Skeleton, Badge, …
│  ├─ ProtectedRoute.jsx
│  └─ PublicRoute
├─ context/            # AuthContext, ThemeContext, ToastContext, JobsContext
├─ hooks/              # useAuth, useTheme, useToast, useJobs, useDebounce, …
├─ lib/                # utils, constants, validation
├─ services/           # firebase, jobService (Firestore)
├─ pages/              # Landing, Login, Signup, ForgotPassword,
│                      # Dashboard, Jobs, Kanban, Profile, Settings, NotFound
├─ App.jsx             # Providers + routes
└─ main.jsx            # Entry point
```

### Architecture highlights
- **Context API** for auth, theme, toasts and jobs — each with a dedicated hook.
- **Smart data layer** (`services/jobService.js`): a single interface that uses
  Firestore with live `onSnapshot` for real-time sync.
- **Reusable UI kit** with consistent variants (Tailwind v4 tokens, dark mode).
- **Custom hooks** (`useDebounce`, `useMediaQuery`, `useJobModals`) keep pages
  lean and composable.

---

## 📜 Available Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite dev server            |
| `npm run build`    | Type-check-free production build     |
| `npm run preview`  | Preview the production build locally |

---

## ☁️ Deployment

This app builds to static assets and deploys anywhere.

### Vercel
1. Push to GitHub and import the repo on [Vercel](https://vercel.com).
2. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
3. Add your `VITE_FIREBASE_*` environment variables in Project Settings.
4. (In the Firebase Console, add your deployment URL under
   **Authentication → Settings → Authorized domains**.)

### Netlify
1. Connect the repo on [Netlify](https://netlify.com).
2. Build command `npm run build`, publish directory `dist`.
3. Add the `VITE_FIREBASE_*` env vars and authorize the Netlify domain in Firebase.

### Firebase Hosting
```bash
npm run build
firebase init hosting     # public dir: dist, SPA rewrite: yes
firebase deploy
```

> **Note on routing:** the app uses `HashRouter`, so deep links work on any
> static host without extra rewrite configuration. To switch to clean URLs with
> `BrowserRouter`, configure SPA fallback rewrites on your host.

---

## 📄 License

MIT — free to use as a portfolio project. Built with ❤️ for job seekers.
