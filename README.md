# U-THINK: Karnataka's Ultimate Educational Navigation System 🚀

U-THINK is an exhaustive, comprehensive, and highly detailed educational navigation ecosystem built specifically for Karnataka students. It guides students from post-10th grade all the way to Research level (PhD), covering every single educational pathway, stream, course combination, branch, specialization, exam, career path, and institution available in the state.

## 🚀 5 New Educational Intelligence Features

*   **Education Path Dependency Engine:** Interactive graph explorer showing prerequisites and downstream pathways for any stream, course, or degree.
*   **Subject Combination Impact Simulator:** AI tool to pick 3-5 subjects and instantly see what career paths are unlocked and permanently locked.
*   **Eligibility Chain Analyzer:** Reverse-engineers the exact academic steps (exams, degrees, combinations) required to reach a target career starting from 10th grade.
*   **Education Route Switch Engine:** Analyzes lateral entry options, bridge courses, and shortcuts for switching between entirely different academic tracks.
*   **Academic Recovery Path Planner:** Compassionate AI that finds alternative routes (like NIOS or Diplomas) if a student faces an academic setback or failure.

## 🚀 Key Features

*   **Career GPS Engine:** Turn-by-turn academic navigation mapping out the exact steps, exams, and skills required to reach a specific target career.
*   **Skill Evidence Graph:** Visual node-based graph mapping user skills to verifiable academic documents and projects.
*   **Career Fork Simulator:** AI-driven opportunity cost simulator that directly compares two career paths across Time Investment, Financial Cost, Job Growth, and Earning Potential.
*   **Recommendation Stability Engine:** "Devil's Advocate" AI that critically evaluates career choices against a student's profile to expose hidden risks, mismatched traits, and provide alternative suggestions.
*   **Career Passport:** A shareable, aggregated snapshot of the student's verified skills, stability scores, and active roadmap.
*   **Comprehensive Pathway Discovery:** Interactive mapping of ALL possible educational pathways after 10th (PUC, Diploma, ITI, Paramedical, etc.).
*   **In-Depth Stream Exploration:** Detailed insights into every stream and course combination (e.g., PCMB, PCMSc, HEPS, CEBA).
*   **Verified Institution Ecosystem:** A robust directory of 3,500+ verified colleges, institutes, and universities across all 31 districts of Karnataka.
*   **Live Exam & Degree Directory:** A real-time engine tracking major entrance exams (JEE, NEET, KCET, CA, UPSC, etc.) with dynamic countdowns, eligibility checkers, and automated status calculations.
*   **AI Document Analysis:** Automatically extracts academic information (grades, subjects, institution) from uploaded 10th, 12th, or Diploma marksheets securely using Gemini Vision capabilities.
*   **AI Student Twin:** A virtual AI counselor and personalized data twin that maps the student's unique academic profile, allowing 24/7 intelligent, contextual advice and tailored pathway navigation.
*   **AI-Powered Recommendations:** Built-in AI integration (Gemini 2.5 Pro) that scores and recommends personalized pathways and colleges based on the user's aptitude, budget, and career goals.
*   **Comprehensive User Settings:** Fully functional account management allowing students to personalize notifications, update academic profiles, configure AI counselor preferences, and manage security settings.
*   **Data Provenance:** Strict verification markers for all data sources (AISHE, NTA, KEA, official portals) ensuring zero fake data.

## 🛠️ Technology Stack

This is a modern **MERN** stack application built with a focus on performance, scalability, type safety, and seamless Artificial Intelligence integration.

### 🎨 Frontend (Client-Side)
*   **Core Framework:** React 19, TypeScript
*   **Build Tool & Bundler:** Vite 6
*   **Styling & UI:** Tailwind CSS 4, Lucide React (for iconography)
*   **Routing:** React Router v7
*   **Animations:** Motion (Framer Motion)
*   **Maps & Geospatial:** Google Maps API (`@react-google-maps/api`)
*   **HTTP Client:** Axios
*   **Data Parsing:** React Markdown

### ⚙️ Backend (Server-Side)
*   **Runtime & Framework:** Node.js, Express.js (v4.21), TypeScript
*   **Database & ODM:** MongoDB, Mongoose 8 (with Polymorphic Graph Schemas)
*   **Authentication & Security:** JWT (JSON Web Tokens), bcryptjs, CORS
*   **File Handling:** Multer (for document uploads)
*   **Data Ingestion & Scraping:** Puppeteer, Cheerio
*   **Communications:** Nodemailer (Email), Twilio (SMS)
*   **Development Tools:** TSX (TypeScript Execute), Dotenv

### 🧠 Artificial Intelligence & Graph
*   **Provider:** Google Gemini SDK (`@google/genai` v2.4.0)
*   **Models Applied:** Gemini 2.5 Pro / 3.6 Flash (Complex Reasoning, Recommendations, Simulation)
*   **Vision AI:** Gemini Vision API (for extracting structured data from 10th/12th Marksheets)
*   **Resilience Engineering:** Built-in automated fallback mechanisms and mock data simulators to elegantly handle `429 RESOURCE_EXHAUSTED` rate limits.

## 📁 Repository Structure

```text
U-Think/
├── backend/                  # Express API Server (Node.js/Express)
│   ├── src/
│   │   ├── config/           # Environment, Database, and API settings
│   │   ├── controllers/      # Route handlers (pathwayController, etc.)
│   │   ├── middleware/       # Custom middlewares (requireAuth, Error Handler)
│   │   ├── models/           # Mongoose schemas (Exam, College, Pathway, etc.)
│   │   ├── routes/           # API endpoints (educationGraphRoutes.ts, etc.)
│   │   ├── scripts/          # Data ingestion (seedMegaExams, seedGraphRelations)
│   │   ├── services/         # Integrations (geminiService.ts, Email, SMS)
│   │   └── index.ts          # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React Vite Application (Client)
│   ├── src/
│   │   ├── api/              # Axios API clients for backend communication
│   │   ├── assets/           # Static assets, images, and global CSS
│   │   ├── components/       # Reusable UI components (Sidebar, Loaders)
│   │   ├── contexts/         # React Context providers (AuthContext)
│   │   ├── pages/            # Feature Page Components
│   │   │   ├── DependencyEngine/   # Path Graph Explorer
│   │   │   ├── ImpactSimulator/    # Subject Combination Tool
│   │   │   ├── EligibilityChain/   # Target Career Reverse-Engineering
│   │   │   ├── RouteSwitch/        # Lateral Entry & Switch Strategy Tool
│   │   │   └── AcademicRecovery/   # AI Backup Planner for Setbacks
│   │   ├── App.tsx           # Main application routing
│   │   └── main.tsx          # React DOM entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
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

## 📊 Official Data Sources

The ecosystem relies on the following verified and official data sources for its databases:

*   **AISHE (All India Survey on Higher Education):** [https://aishe.gov.in](https://aishe.gov.in)
*   **UGC (University Grants Commission):** [https://www.ugc.gov.in](https://www.ugc.gov.in)
*   **KEA (Karnataka Examination Authority):** [https://kea.kar.nic.in](https://kea.kar.nic.in)
*   **NTA (National Testing Agency):** [https://nta.ac.in](https://nta.ac.in)
*   **AICTE (All India Council for Technical Education):** [https://www.aicte-india.org](https://www.aicte-india.org)
*   **Karnataka State Higher Education Council:** [https://kshec.karnataka.gov.in](https://kshec.karnataka.gov.in)
