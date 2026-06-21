# 🚀 JobPilot – Job Application Tracker

[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/Ujjwallp/JobPilot_Web/pulls)

JobPilot is a web application designed to help job seekers keep track of their job applications, interviews, and offers. I built this to solve my own problem of organizing job applications while learning how to integrate a React frontend with a backend database.

---

## 🌐 Live Demo

**Live App:** [https://jobpilot-web.netlify.app](https://jobpilot-web.netlify.app)

---

## 📸 Interactive System Tour

### Landing Portal
![Hero Section](./docs/screenshots/landing-page.png)

### Analytics Dashboard
![Dashboard](./docs/screenshots/dashboard-overview.png)

### Kanban Pipeline Board
![Pipeline Board](./docs/screenshots/kanban-pipeline.png)

### Unified Authentication Shell
![Authentication](./docs/screenshots/auth-portal.png)

---

## ✨ Key Features

* **Job application tracking:** Track job applications through a drag-and-drop Kanban board.
* **Dashboard:** View application statistics and offer rates on the dashboard.
* **Authentication:** Secure user authentication (Email/Password & Google) using Firebase.
* **Search and filtering:** Search, filter, and sort applications easily.
* **Responsive UI:** Fully styled responsive design with dark and light themes.

---

## 🧠 What I Learned

* How to manage global state and authenticate users using Firebase Auth.
* Performing CRUD operations and real-time data syncing with Cloud Firestore.
* Building complex interactive UI components like drag-and-drop Kanban boards.
* Structuring a larger React application using React Router and Context API.

---

## 🛠 Tech Stack

* **React 19**
* **Vite**
* **Tailwind CSS**
* **Firebase (Auth & Cloud Firestore)**
* **React Router**
* **Lucide React**

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
- Node.js 20+
- npm or yarn
- Firebase account

### 2. Clone & Install Dependencies

```bash
git clone https://github.com/Ujjwallp/JobPilot_Web.git
cd JobPilot_Web
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and append your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

---

## 👨‍💻 Author

**Ujjwal Prakash**
* **GitHub:** [https://github.com/Ujjwallp](https://github.com/Ujjwallp)
