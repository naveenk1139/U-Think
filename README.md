# U-THINK: Karnataka's Ultimate Educational Navigation System 🚀

U-THINK is an exhaustive, comprehensive, and highly detailed educational navigation ecosystem built specifically for Karnataka students. It guides students from post-10th grade all the way to Research level (PhD), covering every single educational pathway, stream, course combination, branch, specialization, exam, career path, and institution available in the state.

## 🌟 Key Features

*   **Dynamic Hierarchical Data Engine:** A robust, N-level deep database architecture powering the Education Pathways. Progressively loads nested options (Pathway → Stream → Course → Combination → Branch) while dynamically calculating and rendering available options via fast MongoDB Aggregations.
*   **100% Real Karnataka Institutional Data:** Covers ALL 31 districts and EVERY taluk in Karnataka with zero placeholder or fake data. All 3,500+ colleges and institutions are directly verified from official AISHE, UGC, and KEA databases.
*   **Pathways Explorer & Knowledge Graph:** Interactive visual pathway trees and a full Knowledge Graph to explore complex educational routes, degree prerequisites, and downstream career options seamlessly.
*   **Colleges & Exams Directory:** Comprehensive and highly filterable directories for colleges and exams, featuring detailed profile pages and direct side-by-side comparison tools.
*   **AI Counselor & Recommendations:** An integrated AI mentor and smart recommendation engine utilizing Gemini LLMs to offer highly personalized, profile-based career and course recommendations.
*   **LLM & RAG Architecture:** Employs advanced Retrieval-Augmented Generation (RAG) by injecting context from the real, verified institutional Knowledge Graph into AI prompts, ensuring completely grounded and hallucination-free advice.
*   **Multilingual AI Translation Layer:** Seamlessly supports local languages dynamically through an AI-powered translation middleware, making educational guidance accessible to everyone in their native language.
*   **Live Job Boards & Market Trends:** Directly pulls real-time job openings and career statistics via the Adzuna API to map educational choices to actual market demand.
*   **Student Dashboard & Roadmaps:** A personalized student portal featuring application trackers, highly visual academic roadmaps, and automated deadline monitoring.
*   **Document Analysis:** Automatically extracts and structures academic information from uploaded marksheets securely using Gemini Vision capabilities.
*   **Security & High-Performance Caching:** Fully protected against DDoS and NoSQL injections with strict rate-limiting, Helmet, and query sanitization. Employs aggressive in-memory caching and progressive data-loading to drastically reduce response times.

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
*   **File Handling:** Multer (for document uploads)
*   **Communications:** Nodemailer (Email), Twilio (SMS), node-cron (Scheduler)

### 🧠 Artificial Intelligence (LLM, AI/ML & RAG)
*   **Provider:** Google Gemini SDK (`@google/genai` v2.4.0)
*   **Profile-Based Recommendations:** Utilizes Large Language Models (LLMs) like Gemini 2.5 Pro / Flash for complex reasoning, personalized career recommendations based on student aptitude/interest profiles, and dynamic multilingual translation.
*   **RAG Architecture:** Employs Retrieval-Augmented Generation (RAG) by dynamically injecting context from the real, verified institutional Knowledge Graph into AI prompts, ensuring completely grounded and hallucination-free advice.
*   **Vision AI:** Gemini Vision API used for extracting and processing structured data from uploaded 10th/12th Marksheets.

### ⚙️ APIs & Integrations (Required Keys)
This project relies on several critical third-party APIs to function optimally. You must obtain API keys for the following services:
*   **Google Gemini API (`GEMINI_API_KEY`)**: Used heavily for the AI Counselor, dynamic multilingual translation, intelligent roadmap generation, and RAG architectures.
*   **Adzuna API (`ADZUNA_APP_ID`, `ADZUNA_APP_KEY`)**: Used to fetch live job listings, career market trends, and salary insights.
*   **CollegeDB API (`COLLEGEDB_API_KEY`)**: Used to aggregate extended institutional meta-data for universities and polytechnics.
*   **Gmail SMTP (`SMTP_USER`, `SMTP_PASS`)**: Used by Nodemailer to dispatch authentication OTPs and system notifications.

## 📁 Repository Structure

```text
U-Think/
├── ⚙️ backend/                  # Express API Server & Data Ingestion
│   ├── src/
│   │   ├── config/           # Core configuration (MongoDB, Gemini AI setup)
│   │   ├── controllers/      # Route handlers for graph, exams, colleges, and auth
│   │   ├── middleware/       # Advanced Security (Helmet, Sanitize), Caching, AI Translation
│   │   ├── models/           # Mongoose schemas (Polymorphic Graph, DataImportRun)
│   │   ├── routes/           # RESTful API endpoints
│   │   ├── scripts/          # Massive seeders & Real Data ingestion engines
│   │   │   └── migrations/   # Database migration and cleanup scripts
│   │   ├── services/         # Integrations & Core Business Logic (AI, Scraping, Email)
│   │   └── index.ts          # Application entry point & Global middleware loader
│   └── package.json          # Backend dependencies
│
├── 🎨 frontend/                 # React Vite Application
│   ├── src/
│   │   ├── api/              # Axios API clients for backend communication
│   │   ├── components/       # Highly reusable UI components (Sidebar, Modals, Loaders)
│   │   ├── contexts/         # Global React Contexts (Auth, Notifications)
│   │   ├── hooks/            # Custom React Hooks
│   │   ├── lib/              # Shared utility functions and formatting libraries
│   │   ├── locales/          # Translation JSON files for multi-language support (i18next)
│   │   ├── pages/            # Core Feature Page Components
│   │   │   ├── Admin/        # Admin dashboards and data health tools
│   │   │   ├── After10th/    # Career navigation post-10th grade
│   │   │   ├── Roadmap/      # Interactive visual roadmaps
│   │   │   └── ...
│   │   ├── App.tsx           # Main application routing logic
│   │   ├── index.css         # Global Tailwind directives
│   │   ├── i18n.ts           # i18next configuration
│   │   └── main.tsx          # React DOM mounting point
│   ├── tailwind.config.js    # Tailwind v4 design system configuration
│   └── vite.config.ts        # Vite build & proxy configuration
│
├── 📄 docs/                     # Extensive Audit Reports & Architecture Plans (Phases 1-17)
└── 📖 README.md                 # Project documentation
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites
Ensure you have the following installed on your local environment:
*   **Node.js** (v18.x or higher)
*   **MongoDB** (Local instance running on port `27017` or a MongoDB Atlas cluster URL)
*   **API Keys** for Gemini, Adzuna, and SMTP.

### 💻 Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/naveenk1139/U-Think.git
cd U-Think
```

**2. Install dependencies (Workspace root):**
```bash
npm install
```

**3. Configure Environment Variables:**
You must set up environment files for both the frontend and backend.

*   **Backend** (`backend/.env`):
    ```env
    PORT=5000
    MONGODB_URI=mongodb://127.0.0.1:27017/uthink
    CORS_ORIGIN=http://localhost:3000
    
    # Required API Keys
    GEMINI_API_KEY=your_google_gemini_api_key_here
    ADZUNA_APP_ID=your_adzuna_app_id
    ADZUNA_APP_KEY=your_adzuna_app_key
    COLLEGEDB_API_KEY=your_collegedb_api_key
    
    # Email SMTP (Gmail)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_app_password
    SMTP_FROM=your_email@gmail.com
    
    # Security
    JWT_SECRET=your_jwt_secret
    ```
*   **Frontend** (`frontend/.env`):
    ```env
    VITE_API_URL=http://localhost:5000
    ```

**4. Run the Development Servers:**
Launch two separate terminal windows to run the frontend and backend concurrently:

```bash
# Terminal 1: Start the Backend Server
npm run dev:backend

# Terminal 2: Start the Frontend Application
npm run dev:frontend
```
*   **Frontend:** accessible at `http://localhost:3000`
*   **Backend API:** accessible at `http://localhost:5000`

---

## 🌱 Database Seeding (Crucial Step)

> [!IMPORTANT]
> **Why is this necessary?** 
> U-Think relies on a highly interconnected, polymorphic **Knowledge Graph**. An empty database will cause most of the AI intelligence features, graph visualizers, and directories to return blank. 

To power the core ecosystem, you **must** populate the database with the structural nodes and relationships. Run the following scripts from the `backend/` directory in this **exact order**:

```bash
cd backend

# 1. Base Graph Nodes & Foundation
npx tsx src/scripts/seedMegaExams.ts      # Entrance Exams Directory
npx tsx src/scripts/seedPathwaysSystem.ts # Master Pathways Hierarchy

# 2. Detailed Course Blueprints & Mapping
npx tsx src/scripts/migrations/20261003_seed_pathway_courses.ts
npx tsx src/scripts/migrations/20261003_seed_all_combinations.ts

# 3. Categorization & Duplicate Cleanup
npx tsx src/scripts/migrations/20261003_fix_categories.ts
npx tsx src/scripts/migrations/20261003_remove_empty_streams.ts
npx tsx src/scripts/migrations/20261003_remove_empty_pathways.ts

# 4. Real Institutional Data Mapping (Colleges & Geography)
npx tsx src/scripts/seedGeography.ts      # 31 Districts & Taluks
npx tsx src/scripts/seedColleges.ts       # 3,500+ Verified Colleges

# 5. Edges & Relationships
npx tsx src/scripts/seedGraphRelations.ts # Connects subjects to degrees
```

---

## 🤝 Contribution Guidelines

We welcome contributions to make U-Think the best educational platform possible! However, data integrity is our highest priority.

*   **Strict "Real Data Only" Mandate:** Absolutely no placeholder data, fake dates, or unverified fees should be committed to the database layer or seeders.
*   **Data Provenance:** Always cite your data source (e.g., `source_url`, `last_verified_at`) in the database schemas when updating institutional or exam information.
*   **Type Safety:** Ensure all new components or models are strictly typed using TypeScript interfaces. 

---

## 📊 Official Data Sources & Provenance

To maintain absolute data integrity and prevent AI hallucinations during RAG injection, U-Think grounds its Knowledge Graph and College Directory exclusively in verified, official government and institutional sources. 

*   🏛️ **AISHE (All India Survey on Higher Education):** Provides the foundational dataset for the 3,500+ verified colleges in Karnataka. [https://aishe.gov.in](https://aishe.gov.in)
*   🎓 **KEA (Karnataka Examination Authority):** Source of truth for state-level entrance exams (KCET, PGCET, DCET) and state matrix seat counseling rules. [https://cetonline.karnataka.gov.in/kea](https://cetonline.karnataka.gov.in/kea)
*   📝 **NTA (National Testing Agency):** Centralized data for national entrance exams like JEE Main and NEET. [https://nta.ac.in](https://nta.ac.in)
*   📜 **UGC (University Grants Commission):** Validation of University accreditations and approved degree nomenclatures. [https://www.ugc.gov.in](https://www.ugc.gov.in)
*   ⚙️ **AICTE (All India Council for Technical Education):** Technical and engineering college approval data. [https://www.aicte-india.org](https://www.aicte-india.org)
*   🏢 **KSHEC (Karnataka State Higher Education Council):** State-specific higher education policies and structural pathways. [https://kshec.karnataka.gov.in](https://kshec.karnataka.gov.in)
*   🔧 **DTE (Directorate of Technical Education, Karnataka):** Diploma and Polytechnic curriculum and lateral entry eligibility rules. [https://dte.karnataka.gov.in](https://dte.karnataka.gov.in)
