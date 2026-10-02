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

The workspace is organized into a clean, modern monorepo structure separating the AI-driven Node.js backend from the highly interactive React Vite frontend.

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
│   │   │   ├── seedGeography.ts      # Hydrates 31 Districts and Taluks
│   │   │   ├── seedColleges.ts       # Core seeder for verified institutions
│   │   │   └── importRealCollegesPipeline.ts # Automated ETL data pipeline
│   │   ├── services/         # Integrations & Core Business Logic
│   │   │   ├── ingestion/    # AISHE Scraper & College DB Client
│   │   │   ├── geminiService # Core Google Gemini AI integrations
│   │   │   └── reminderScheduler # Cron-based notification engine
│   │   └── index.ts          # Application entry point & Global middleware loader
│   └── package.json          # Backend dependencies
│
├── 🎨 frontend/                 # React Vite Application
│   ├── src/
│   │   ├── api/              # Axios API clients for backend communication
│   │   ├── assets/           # Static assets, UI graphics, and global CSS
│   │   ├── components/       # Highly reusable UI components (Sidebar, Modals, Loaders)
│   │   ├── contexts/         # Global React Contexts (Auth, Notifications)
│   │   ├── locales/          # Translation JSON files for multi-language support (i18next)
│   │   ├── pages/            # Core Feature Page Components
│   │   │   ├── Admin/              # Admin dashboards and data health tools
│   │   │   ├── After10th/          # Career navigation post-10th grade
│   │   │   ├── Roadmap/            # Interactive visual roadmaps
│   │   │   └── Deadlines.tsx       # Important chronological deadlines overview
│   │   ├── App.tsx           # Main application routing logic
│   │   └── main.tsx          # React DOM mounting point
│   ├── tailwind.config.js    # Tailwind v4 design system configuration
│   └── vite.config.ts        # Vite build & proxy configuration
│
├── 📄 docs/                     # Extensive Audit Reports & Architecture Plans (Phases 1-17)
├── 📦 package.json              # Workspace root package manager
└── 📖 README.md                 # Project documentation
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites
Ensure you have the following installed on your local environment:
*   **Node.js** (v18.x or higher)
*   **MongoDB** (Local instance running on port `27017` or a MongoDB Atlas cluster URL)
*   **Google Gemini API Key** *(Required for AI features. If the free-tier rate limit (HTTP 429) is hit, the application gracefully degrades to using mock data).*

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
    MONGO_URI=mongodb://127.0.0.1:27017/u-think
    CORS_ORIGIN=http://localhost:3000
    GEMINI_API_KEY=your_google_gemini_api_key_here
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

# 1. Base Graph Nodes
npx tsx src/scripts/seedMegaPathways.ts   # Core Educational Pathways
npx tsx src/scripts/seedMegaExams.ts      # Entrance Exams Directory

# 2. Edges & Relationships
npx tsx src/scripts/seedGraphRelations.ts # Connects subjects to degrees

# 3. Advanced Pathways (Phase-wise Seeders)
npx tsx src/scripts/seedSchoolPhase3.ts
npx tsx src/scripts/seedPhase4.ts
npx tsx src/scripts/seedPhase5.ts
npx tsx src/scripts/seedPhase6.ts
npx tsx src/scripts/seedPhase9.ts

# 4. Real Institutional Data Mapping
npx tsx src/scripts/seedGeography.ts      # 31 Districts & Taluks
npx tsx src/scripts/seedColleges.ts       # 3,500+ Verified Colleges
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

*   🏛️ **AISHE (All India Survey on Higher Education):** Provides the foundational dataset for the 3,500+ verified colleges in Karnataka.
*   🎓 **KEA (Karnataka Examination Authority):** Source of truth for state-level entrance exams (KCET, PGCET, DCET) and state matrix seat counseling rules.
*   📝 **NTA (National Testing Agency):** Centralized data for national entrance exams like JEE Main and NEET.
*   📜 **UGC (University Grants Commission):** Validation of University accreditations and approved degree nomenclatures.
*   ⚙️ **AICTE (All India Council for Technical Education):** Technical and engineering college approval data.
*   🏢 **KSHEC (Karnataka State Higher Education Council):** State-specific higher education policies and structural pathways.
*   🔧 **DTE (Directorate of Technical Education, Karnataka):** Diploma and Polytechnic curriculum and lateral entry eligibility rules.
