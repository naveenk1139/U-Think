# 🎓 U-THINK — MERN Stack Platform

U-THINK is a modern, AI-powered career guidance and academic stream explorer application tailored for post-10th grade students across India. It helps students discover the right colleges, explore real job opportunities, take aptitude assessments, and chart their future pathways.

---

## ✨ Key Features

- **🎓 College Discovery Engine:** Verified, database-driven directory of thousands of colleges across India, seamlessly ingesting data from official AISHE datasets and rendering interactive `@react-google-maps/api` maps. Features comprehensive, dynamically calculated geographical and course-based filtering.
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
- Google Maps Platform (Campus geolocations & interactive maps)
- CollegeDB API & AISHE Datasets (College Directory)
- Adzuna API (Real-time Jobs)

---

## 📁 Repository Structure

```text
U-Think/
├── frontend/          ← React + Vite + TypeScript single-page application
│   ├── src/           ← Components, Contexts, Hooks, API client, Pages
│   ├── index.html
│   └── package.json
│
└── backend/           ← Node.js + Express + TypeScript REST API server
    ├── src/
    │   ├── config/      ← MongoDB, Firebase, and Gemini AI configuration
    │   ├── controllers/ ← Business logic and route handlers
    │   ├── middleware/  ← Firebase authentication & global error handlers
    │   ├── models/      ← Mongoose Models (College, Pathway, Stream, CareerPath, JobRole, etc.)
    │   ├── routes/      ← Express Routes (Colleges, Pathways, Geography, User, AI)
    │   └── scripts/     ← Database seeders and mass data ingestion scripts (UGC, AISHE, etc.)
    └── package.json
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
- Note: The frontend requires a `VITE_GOOGLE_MAPS_API_KEY` for map functionalities.

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
