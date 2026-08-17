# 🎓 U-THINK — MERN Stack Platform

U-THINK is a modern, AI-powered career guidance and academic stream explorer application tailored for post-10th grade students across India. It helps students discover the right colleges, explore real job opportunities, take aptitude assessments, and chart their future pathways.

---

## ✨ Key Features

- **🎓 College Discovery Engine:** Real-time database of thousands of colleges across India, powered by the CollegeDB API with pagination and advanced filtering (state, city, courses).
- **💼 Job Explorer:** Live job board powered by the Adzuna API, showing real-time job openings with advanced filtering (role, location, experience) and pagination.
- **🤖 AI-Powered Career Assistant:** Integrated Gemini AI chatbot for personalized career counseling, pathway recommendations, and answering student queries.
- **📝 Aptitude Assessments:** Built-in quizzes to assess student interests and match them with suitable academic streams (Science, Commerce, Arts, Vocational).
- **🔒 Secure Authentication:** Firebase-powered authentication for secure student profiles, saved jobs, and tracked exams.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 & Vite
- TypeScript
- Tailwind CSS
- Context API (State Management)

**Backend:**
- Node.js & Express.js
- TypeScript
- MongoDB & Mongoose (Database)
- Firebase Admin SDK

**External APIs:**
- Google Gemini AI (Counseling)
- CollegeDB API (College Directory)
- Adzuna API (Real-time Jobs)

---

## 📁 Repository Structure

```
U-Think/
├── frontend/          ← React + Vite + TypeScript single-page application
│   ├── src/           ← Components, Contexts, Hooks, Data, API client
│   ├── index.html
│   └── package.json
│
├── backend/           ← Node.js + Express + TypeScript REST API server
│   ├── src/
│   │   ├── config/    ← MongoDB & Gemini AI configuration
│   │   ├── middleware/← Firebase authentication & error handler
│   │   └── routes/    ← User, AI, Quiz, Pathway, Exam, and Reminder routes
│   └── package.json
│
└── database/          ← MongoDB + Mongoose Models, Seeds & Scripts
    ├── models/        ← User, QuizResult, SavedPathway, TrackedExam, Reminder
    ├── scripts/       ← Data patch & generator utility scripts
    └── README.md      ← Database & script documentation
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend & backend dependencies
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Environment Variables
- Copy `backend/.env.example` to `backend/.env` and add your `MONGODB_URI`, `GEMINI_API_KEY`, `COLLEGEDB_API_KEY`, and `ADZUNA_APP_ID`/`ADZUNA_APP_KEY`.
- Copy `frontend/.env.example` to `frontend/.env` and update your Firebase credentials.

### 3. Run Development Servers
From the workspace root directory:
```bash
# Run both frontend and backend concurrently
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---
*Built with ❤️ by Naveen.*
