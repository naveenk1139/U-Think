# U-THINK: Karnataka's Ultimate Educational Navigation System 🚀

U-THINK is an exhaustive, comprehensive, and highly detailed educational navigation ecosystem built specifically for Karnataka students. It guides students from post-10th grade all the way to Research level (PhD), covering every single educational pathway, stream, course combination, branch, specialization, exam, career path, and institution available in the state.

## 🌟 Key Features

*   **Comprehensive Pathway Discovery:** Interactive mapping of ALL possible educational pathways after 10th (PUC, Diploma, ITI, Paramedical, etc.).
*   **In-Depth Stream Exploration:** Detailed insights into every stream and course combination (e.g., PCMB, PCMSc, HEPS, CEBA).
*   **Verified Institution Ecosystem:** A robust directory of 3,500+ verified colleges, institutes, and universities across all 31 districts of Karnataka.
*   **Live Exam & Degree Directory:** A real-time engine tracking major entrance exams (JEE, NEET, KCET, CA, UPSC, etc.) with dynamic countdowns, eligibility checkers, and automated status calculations.
*   **AI-Powered Recommendations:** Built-in AI integration (Gemini 2.5 Pro) that scores and recommends personalized pathways and colleges based on the user's aptitude, budget, and career goals.
*   **Data Provenance:** Strict verification markers for all data sources (AISHE, NTA, KEA, official portals) ensuring zero fake data.

## 🛠️ Technology Stack

This is a modern **MERN** stack application built with a focus on performance, scalability, and type safety.

*   **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router DOM.
*   **Backend:** Node.js, Express.js, TypeScript, Mongoose.
*   **Database:** MongoDB.
*   **AI Integration:** Google Gemini SDK (`@google/genai`).

## 📁 Repository Structure

```text
U-Think/
├── backend/                  # Express API Server
│   ├── src/
│   │   ├── config/           # Database and API configurations (MongoDB, Gemini)
│   │   ├── controllers/      # Route handlers and business logic
│   │   ├── middleware/       # Express middlewares (Auth, Error Handling)
│   │   ├── models/           # Mongoose schemas (Exam, College, Pathway, etc.)
│   │   ├── routes/           # API route definitions
│   │   ├── scripts/          # Seeder scripts for data ingestion (seedMegaExams, etc.)
│   │   ├── services/         # External service integrations (SMS, Email)
│   │   └── index.ts          # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React Vite Application
│   ├── src/
│   │   ├── api/              # Axios API clients for backend communication
│   │   ├── assets/           # Static assets, images, and global CSS
│   │   ├── components/       # Reusable UI components (ExamDetail, CollegesDirectory)
│   │   ├── contexts/         # React Context providers (AuthContext)
│   │   ├── App.tsx           # Main application routing
│   │   └── main.tsx          # React DOM entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── .gitignore
├── package.json              # Workspace root package manager
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Google Gemini API Key (for AI recommendations)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/naveenk1139/U-Think.git
    cd U-Think
    ```

2.  **Install dependencies (Workspace):**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    *   Create `backend/.env` and add:
        ```env
        PORT=5000
        MONGO_URI=mongodb://127.0.0.1:27017/u-think
        CORS_ORIGIN=http://localhost:3000
        GEMINI_API_KEY=your_gemini_api_key_here
        ```
    *   Create `frontend/.env` and add:
        ```env
        VITE_API_URL=http://localhost:5000
        ```

4.  **Run Development Servers:**
    Open two terminals to run both frontend and backend concurrently, or use the workspace script:
    ```bash
    # Terminal 1 (Backend)
    npm run dev:backend

    # Terminal 2 (Frontend)
    npm run dev:frontend
    ```
    The frontend will run on `http://localhost:3000` (or `3001` if 3000 is occupied) and the backend will run on `http://localhost:5000`.

## 🌱 Data Seeding

To populate the database with the verified Karnataka educational dataset and major entrance exams, run the following scripts from the `backend/` directory:

```bash
cd backend
npx tsx src/scripts/seedMegaPathways.ts
npx tsx src/scripts/seedMegaExams.ts
# Additional seeders available in src/scripts/
```

## 🤝 Contribution Guidelines
This project enforces a strict "Real Data Only" mandate. No placeholder data, fake dates, or unverified fees should be committed to the database layer. Always cite your data source (e.g., `source_url`, `last_verified_at`) when updating institutional or exam information.
