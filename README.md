# U-THINK: Karnataka's Ultimate Educational Navigation System 🚀

U-THINK is an exhaustive, comprehensive, and highly detailed educational navigation ecosystem built specifically for Karnataka students. It guides students from post-10th grade all the way to Research level (PhD), covering every single educational pathway, stream, course combination, branch, specialization, exam, career path, and institution available in the state.

## 🌟 Key Features

*   **100% Real Karnataka Institutional Data:** Covers ALL 31 districts and EVERY taluk in Karnataka with zero placeholder or fake data. All 3,500+ colleges and institutions are directly verified from official AISHE, UGC, and KEA databases.
*   **Pathways Explorer & Knowledge Graph:** Interactive visual pathway trees and a full Knowledge Graph to explore complex educational routes, degree prerequisites, and downstream career options seamlessly.
*   **Colleges & Exams Directory:** Comprehensive and highly filterable directories for colleges and exams, featuring detailed profile pages and direct side-by-side comparison tools.
*   **AI Counselor & Recommendations:** An integrated AI mentor and smart recommendation engine utilizing Gemini LLMs to offer personalized career guidance based on user profiles.
*   **Multilingual AI Translation Layer:** Seamlessly supports local languages dynamically through an AI-powered translation middleware, making educational guidance accessible to everyone in their native language.
*   **Job Finder & Career Tracker:** Integrated job boards and career tracking tools directly tied to educational outcomes and required degrees.
*   **Student Dashboard & Roadmaps:** A personalized student portal featuring application trackers, highly visual academic roadmaps, and automated deadline monitoring.
*   **Document Analysis:** Automatically extracts and structures academic information from uploaded marksheets securely using Gemini Vision capabilities.
*   **Mentorship Program:** Connects students with experienced mentors and alumni to guide them through complex career and academic decisions.
*   **Security & High-Performance Caching:** Fully protected against DDoS and NoSQL injections with strict rate-limiting, Helmet, and query sanitization. Employs aggressive in-memory caching to drastically reduce response times for major educational catalog reads.

## 🛠️ Technology Stack

This is a modern **MERN** stack application built with a focus on performance, scalability, type safety, and seamless Artificial Intelligence integration.

### 💻 Languages Used
*   **TypeScript (91.8%)**: The core language for both the React frontend and the Express backend, ensuring strict type-safety and robust development.
*   **JavaScript (6.0%)**: Utilized for specific utility scripts, database commands, and legacy ETL processing.
*   **Python (2.1%)**: Used for backend data scraping, exam generation scripts, and theme refactoring utilities.

### 🎨 Frontend (Client-Side)
*   **Core Framework:** React 19, TypeScript
*   **Build Tool & Bundler:** Vite 6
*   **Styling & UI:** Tailwind CSS 4, Lucide React (for iconography)
*   **Routing:** React Router v7
*   **Animations:** Motion (Framer Motion)
*   **Maps & Geospatial:** Google Maps API (`@react-google-maps/api`)
*   **HTTP Client:** Axios
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

### 🧠 Artificial Intelligence (AI/ML) & Graph
*   **Provider:** Google Gemini SDK (`@google/genai` v2.4.0)
*   **LLM Integration:** Utilizes Large Language Models (LLMs) like Gemini 2.5 Pro / 3.6 Flash for complex reasoning, personalized career recommendations, educational simulations, and dynamic multilingual translation.
*   **RAG Architecture:** Employs Retrieval-Augmented Generation (RAG) by dynamically injecting context from the real, verified institutional Knowledge Graph into AI prompts, ensuring completely grounded and hallucination-free advice.
*   **Vision AI:** Gemini Vision API used for extracting and processing structured data from uploaded 10th/12th Marksheets.

## 📁 Repository Structure

```text
U-Think/
├── backend/                  # Express API Server (Node.js/Express)
│   ├── src/
│   │   ├── config/           # Environment variables, MongoDB connection, Gemini setup
│   │   ├── controllers/      # API Controllers for pathways, exams, colleges, and auth
│   │   ├── middleware/       # Security (Helmet, Sanitize), Cache, Auth, AI Translation
│   │   ├── models/           # Mongoose schemas (College, Exam, Pathway, DataImportRun, etc)
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
│   │   │   ├── Admin/              # Admin dashboards and tools
│   │   │   ├── After10th/          # Career paths after 10th grade
│   │   │   ├── Roadmap/            # Roadmap views
│   │   │   └── Deadlines.tsx       # Important deadlines overview
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
npx tsx src/scripts/seedMegaPathways.ts

# 2. Entrance Exams Directory
npx tsx src/scripts/seedMegaExams.ts

# 3. Graph Relationships Mapping
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
