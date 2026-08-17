# U-THINK — MERN Stack Platform

U-THINK is a modern career guidance and academic stream explorer application tailored for post-10th grade students across India.

## 📁 Repository Structure

```
remix_--u-think (1)/
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
│   ├── server.legacy.ts
│   └── package.json
│
└── database/          ← MongoDB + Mongoose Models, Seeds & Scripts
    ├── models/        ← User, QuizResult, SavedPathway, TrackedExam, Reminder
    ├── seeds/         ← Database sample seed scripts (seedExams.js)
    ├── scripts/       ← 40+ Data patch & generator utility scripts (.js, .cjs, .py)
    ├── data/          ← Data output files (.txt)
    ├── connection.js  ← Mongoose connection helper
    └── README.md      ← Database & script documentation
```

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
- Copy `backend/.env.example` to `backend/.env` and update `MONGODB_URI` & `GEMINI_API_KEY`.
- Copy `frontend/.env.example` to `frontend/.env` and update Firebase credentials.

### 3. Run Development Servers
From the workspace root directory:
```bash
# Run both frontend and backend concurrently
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
