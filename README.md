# U-THINK: Karnataka's Ultimate Educational Navigation System 🚀

U-THINK is an exhaustive, comprehensive, and highly detailed educational navigation ecosystem built specifically for Karnataka students. It guides students from post-10th grade all the way to Research level (PhD), covering every single educational pathway, stream, course combination, branch, specialization, exam, career path, and institution available in the state.

## 🚀 5 New Educational Intelligence Features

*   **Education Path Dependency Engine:** Interactive graph explorer showing prerequisites and downstream pathways for any stream, course, or degree.
*   **Subject Combination Impact Simulator:** AI tool to pick 3-5 subjects and instantly see what career paths are unlocked and permanently locked.
*   **Eligibility Chain Analyzer:** Reverse-engineers the exact academic steps (exams, degrees, combinations) required to reach a target career starting from 10th grade.
*   **Education Route Switch Engine:** Analyzes lateral entry options, bridge courses, and shortcuts for switching between entirely different academic tracks.
*   **Academic Recovery Path Planner:** Compassionate AI that finds alternative routes (like NIOS or Diplomas) if a student faces an academic setback or failure.

## 🌟 Key Features

*   **100% Real Karnataka Institutional Data:** Covers ALL 31 districts and EVERY taluk in Karnataka with zero placeholder or fake data. All 3,500+ colleges and institutions are directly verified from official AISHE, UGC, and KEA databases.
*   **Multilingual AI Translation Layer:** Seamlessly supports local languages dynamically through an AI-powered translation middleware, making educational guidance accessible to everyone.
*   **Security & High-Performance Caching:** Fully protected against DDoS and NoSQL injections with strict rate-limiting, Helmet, and query sanitization. Employs aggressive in-memory caching to drastically reduce TTFB for major educational catalog reads.
*   **Career GPS Engine:** Turn-by-turn academic navigation mapping out the exact steps, exams, and skills required to reach a specific target career.
*   **Skill Evidence Graph:** Visual node-based graph mapping user skills to verifiable academic documents and projects.
*   **Career Fork Simulator:** AI-driven opportunity cost simulator that directly compares two career paths across Time Investment, Financial Cost, Job Growth, and Earning Potential.
*   **Recommendation Stability Engine:** "Devil's Advocate" AI that critically evaluates career choices against a student's profile to expose hidden risks, mismatched traits, and provide alternative suggestions.
*   **6 ASTRA Educational Pathway Engine:** The core navigation system mapping the 6 major educational transitions in Karnataka:
    1. **Post-10th Streams (PUC)**: Science, Commerce, Arts with detailed combinations.
    2. **ITI (Industrial Training)**: Engineering & Non-Engineering trades.
    3. **Polytechnic (Diploma)**: 3-year technical courses and lateral entry routes.
    4. **Paramedical & Allied Health**: Nursing, lab tech, and medical diplomas.
    5. **Undergraduate (UG)**: B.Tech, B.Com, B.Sc, BA, etc. mapped to pre-requisites.
    6. **Postgraduate (PG) & Research**: Specializations, Masters, and PhDs.
*   **Eligibility & Exams Engine:** Hard-linked prerequisites for degrees, automatically rendering mandatory entrance exams (e.g., JEE Main for B.Tech) directly in the pathway explorer.
*   **Career Passport:** A shareable, aggregated snapshot of the student's verified skills, stability scores, and active roadmap.
*   **Live Exam & Degree Directory:** A real-time engine tracking major entrance exams (JEE, NEET, KCET, CA, UPSC, etc.) with dynamic countdowns, eligibility checkers, and automated status calculations.
*   **AI Document Analysis:** Automatically extracts academic information (grades, subjects, institution) from uploaded 10th, 12th, or Diploma marksheets securely using Gemini Vision capabilities.
*   **AI Student Twin:** A virtual AI counselor and personalized data twin that maps the student's unique academic profile, allowing 24/7 intelligent, contextual advice and tailored pathway navigation.
*   **AI-Powered Recommendations:** Built-in AI integration (Gemini 2.5 Pro) that scores and recommends personalized pathways and colleges based on the user's aptitude, budget, and career goals.

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
*   **Localization:** i18next

### ⚙️ Backend (Server-Side)
*   **Runtime & Framework:** Node.js, Express.js (v4.21), TypeScript
*   **Database & ODM:** MongoDB, Mongoose 8 (with Polymorphic Graph Schemas)
*   **Authentication & Security:** JWT, bcryptjs, Helmet, Express-Rate-Limit, Express-Mongo-Sanitize, CORS
*   **Performance:** Custom API response caching middleware
*   **File Handling:** Multer (for document uploads)
*   **Data Ingestion & Scraping:** Puppeteer, Cheerio (AISHE ETL pipeline)
*   **Communications:** Nodemailer (Email), Twilio (SMS), node-cron (Scheduler)
*   **Development Tools:** TSX (TypeScript Execute), Dotenv

### 🧠 Artificial Intelligence & Graph
*   **Provider:** Google Gemini SDK (`@google/genai` v2.4.0)
*   **Models Applied:** Gemini 2.5 Pro / 3.6 Flash (Complex Reasoning, Recommendations, Simulation, Multilingual Translation)
*   **Vision AI:** Gemini Vision API (for extracting structured data from 10th/12th Marksheets)
*   **Resilience Engineering:** Built-in automated fallback mechanisms and mock data simulators to elegantly handle `429 RESOURCE_EXHAUSTED` rate limits.

## 📁 Repository Structure

```text
U-Think/
├── backend/                  # Express API Server (Node.js/Express)
│   ├── src/
│   │   ├── config/           # Environment variables, MongoDB connection, Gemini setup
│   │   ├── controllers/      # API Controllers for pathways, exams, colleges, and auth
│   │   ├── middleware/       # Security (Helmet, Sanitize), Cache, Auth, AI Translation
│   │   ├── models/           # Mongoose schemas (College, Exam, Pathway, DataImportRun)
│   │   ├── routes/           # REST endpoints (educationGraphRoutes, aiRoutes, etc.)
│   │   ├── scripts/          # Massive seeders & Real Data ingestion
│   │   │   ├── seedGeography.ts      # Seeds 31 Districts and all Taluks
│   │   │   ├── seedColleges.ts       # Main seeder for verified institutions
│   │   │   └── importRealCollegesPipeline.ts # Automated ETL pipeline
│   │   ├── services/         # Integrations & Core Logic
│   │   │   ├── ingestion/    # AISHE Scraper & College DB Client
│   │   │   ├── geminiService # Core AI integrations
│   │   │   ├── reminderScheduler # Cron-based notification engine
│   │   │   └── notificationAdapters # SMS/Email/In-App dispatcher
│   │   └── index.ts          # Application entry point & Global middlewares
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                 # React Vite Application (Client)
│   ├── src/
│   │   ├── api/              # Axios API clients for backend communication
│   │   ├── assets/           # Static assets, images, and global CSS
│   │   ├── components/       # Reusable UI components (Sidebar, Loaders, Modals)
│   │   ├── contexts/         # React Contexts (AuthContext, NotificationContext)
│   │   ├── locales/          # Translation JSON files for multi-language support (i18next)
│   │   ├── pages/            # Feature Page Components
│   │   │   ├── DependencyEngine/   # Path Graph Explorer
│   │   │   ├── ImpactSimulator/    # Subject Combination Tool
│   │   │   ├── EligibilityChain/   # Target Career Reverse-Engineering
│   │   │   ├── RouteSwitch/        # Lateral Entry & Switch Strategy Tool
│   │   │   └── AcademicRecovery/   # AI Backup Planner for Setbacks
│   │   ├── App.tsx           # Main application routing
│   │   └── main.tsx          # React DOM entry point
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind v4 configuration
│   └── vite.config.ts        # Vite build configuration
├── docs/                     # Audit Reports & Architecture Plans (Phase 1-17)
├── package.json              # Workspace root package manager
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
*   **Node.js** (v18 or higher)
*   **MongoDB** (Local instance or Atlas cluster)
*   **Google Gemini API Key** (Required for the AI Intelligence Features to function. If you hit the free-tier rate limit (429), the app will automatically gracefully degrade to mock data).

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

3.  **Configure Environment Variables:**
    *   Create `backend/.env` and add your configurations:
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
    Open two terminals to run both frontend and backend concurrently, or use the workspace script if configured:
    ```bash
    # Terminal 1 (Backend)
    npm run dev:backend

    # Terminal 2 (Frontend)
    npm run dev:frontend
    ```
    The frontend will run on `http://localhost:3000` (or `3001` if 3000 is occupied) and the backend will run on `http://localhost:5000`.

## 🌱 Database Seeding (Crucial)

Because U-Think relies on a highly interconnected Knowledge Graph, an empty database will cause most of the AI intelligence features and graphs to return blank. 

To power the core ecosystem, you **must** populate the database with the structural nodes and relationships. Run the following scripts from the `backend/` directory in this specific order:

```bash
cd backend

# 1. Core Educational Pathways
# Seeds all high school streams (PCMB, CEBA), undergraduate degrees (B.Tech, B.Com), 
# and master's specializations into the database.
npx tsx src/scripts/seedMegaPathways.ts

# 2. Entrance Exams Directory
# Seeds the state and national entrance exams (KCET, NEET, JEE) along with 
# their current status (Upcoming, Registration Open, etc.).
npx tsx src/scripts/seedMegaExams.ts

# 3. Graph Relationships Mapping
# (CRITICAL for the Dependency Engine & Impact Simulator)
# Creates the complex prerequisite relationships mapping which subjects unlock which degrees.
npx tsx src/scripts/seedGraphRelations.ts

# 4. Phase-wise Seeders (For Advanced Pathways and Colleges)
npx tsx src/scripts/seedSchoolPhase3.ts
npx tsx src/scripts/seedPhase4.ts
npx tsx src/scripts/seedPhase5.ts
npx tsx src/scripts/seedPhase6.ts
npx tsx src/scripts/seedPhase9.ts

# 5. Geographies & Institutions (REAL Data)
npx tsx src/scripts/seedGeography.ts
npx tsx src/scripts/seedColleges.ts
```

## 🤝 Contribution Guidelines
This project enforces a strict "Real Data Only" mandate. No placeholder data, fake dates, or unverified fees should be committed to the database layer. Always cite your data source (e.g., `source_url`, `last_verified_at`) when updating institutional or exam information.

## 📊 Official Data Sources & Provenance

To maintain absolute data integrity and prevent AI hallucinations, U-Think grounds its Knowledge Graph and College Directory exclusively in verified, official sources. 

*   **AISHE (All India Survey on Higher Education):** Provides the foundational dataset for the 3,500+ verified colleges in Karnataka. [https://aishe.gov.in](https://aishe.gov.in)
*   **KEA (Karnataka Examination Authority):** Source of truth for state-level entrance exams (KCET, PGCET, DCET) and state matrix seat counseling rules. [https://kea.kar.nic.in](https://kea.kar.nic.in)
*   **NTA (National Testing Agency):** Centralized data for national entrance exams like JEE Main and NEET. [https://nta.ac.in](https://nta.ac.in)
*   **UGC (University Grants Commission):** Validation of University accreditations and approved degree nomenclatures. [https://www.ugc.gov.in](https://www.ugc.gov.in)
*   **AICTE (All India Council for Technical Education):** Technical and engineering college approval data. [https://www.aicte-india.org](https://www.aicte-india.org)
*   **KSHEC (Karnataka State Higher Education Council):** State-specific higher education policies and structural pathways. [https://kshec.karnataka.gov.in](https://kshec.karnataka.gov.in)
*   **DTE (Directorate of Technical Education, Karnataka):** Diploma and Polytechnic curriculum and lateral entry eligibility rules. [https://dte.karnataka.gov.in](https://dte.karnataka.gov.in)
