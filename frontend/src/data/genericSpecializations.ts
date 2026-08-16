export interface GenericSpecializationInfo {
  rank: number;
  name: string;
  weight: number; // Popularity / relevance index out of 100
  category: string;
  demand: string;
  description: string;
  subjects: string[];
  roles: string[];
}

export const COMMERCE_SPECIALIZATIONS_DATABASE: GenericSpecializationInfo[] = [
  {
    rank: 1,
    name: "Finance & Accounting",
    weight: 95,
    category: "Finance",
    demand: "Critical Demand",
    description: "Focus on corporate finance, accounting standards, financial accounting reporting, and wealth management.",
    subjects: ["Corporate Accounting", "Financial Management", "Investment Banking", "Wealth Management"],
    roles: ["Financial Analyst", "Accountant", "Investment Banker", "Auditor"]
  },
  {
    rank: 2,
    name: "Marketing & Advertising",
    weight: 90,
    category: "Marketing",
    demand: "High Demand",
    description: "Covers consumer behavior, brand management, digital marketing strategies, and market research.",
    subjects: ["Digital Marketing", "Consumer Behavior", "Brand Management", "Market Research"],
    roles: ["Marketing Manager", "Brand Strategist", "SEO/SEM Specialist", "Market Analyst"]
  },
  {
    rank: 3,
    name: "Human Resource Management",
    weight: 85,
    category: "Management",
    demand: "High Demand",
    description: "Studies organizational behavior, talent acquisition, labor laws, and employee relations.",
    subjects: ["Organizational Behavior", "Talent Acquisition", "Labor Laws", "Performance Management"],
    roles: ["HR Manager", "Recruitment Specialist", "Employee Relations Manager"]
  },
  {
    rank: 4,
    name: "International Business",
    weight: 80,
    category: "Business",
    demand: "Moderate Demand",
    description: "Focuses on global trade policies, international finance, cross-cultural management, and supply chain logistics.",
    subjects: ["Global Trade", "International Finance", "Supply Chain Management"],
    roles: ["Export Manager", "International Business Consultant", "Supply Chain Analyst"]
  },
  {
    rank: 5,
    name: "Business Analytics",
    weight: 88,
    category: "Technology in Business",
    demand: "Critical Demand",
    description: "Combines business strategy with data analysis, teaching predictive modeling to solve business problems.",
    subjects: ["Data Visualization", "Predictive Analytics", "Business Intelligence", "Statistical Methods"],
    roles: ["Business Analyst", "Data Driven Decision Maker", "Consultant"]
  },
  {
    rank: 6,
    name: "Entrepreneurship & Innovation",
    weight: 82,
    category: "Business",
    demand: "High Demand",
    description: "Equips students with skills to start, scale, and manage their own business ventures and foster corporate innovation.",
    subjects: ["Venture Capital", "Startup Management", "Innovation Strategies", "Business Structuring"],
    roles: ["Entrepreneur", "Startup Founder", "Business Consultant", "Product Manager"]
  },
  {
    rank: 7,
    name: "Supply Chain & Operations Management",
    weight: 89,
    category: "Management",
    demand: "Critical Demand",
    description: "Managing the flow of goods and services, including the movement of raw materials, inventory, and end products.",
    subjects: ["Logistics", "Operations Research", "Inventory Management", "Quality Control"],
    roles: ["Operations Manager", "Supply Chain Analyst", "Logistics Coordinator"]
  },
  {
    rank: 8,
    name: "E-Commerce & Retail Management",
    weight: 84,
    category: "Business",
    demand: "High Demand",
    description: "Focus on digital sales paradigms, omnichannel retail strategies, and customer experience management online.",
    subjects: ["E-Commerce Strategies", "Retail Marketing", "Supply Chain in Retail", "Digital Payments"],
    roles: ["E-Commerce Manager", "Retail Store Manager", "Online Merchandiser"]
  },
  {
    rank: 9,
    name: "Banking & Insurance",
    weight: 81,
    category: "Finance",
    demand: "High Demand",
    description: "In-depth understanding of the commercial banking system, risk assessment, policies, and underwriting.",
    subjects: ["Principles of Banking", "Insurance Law", "Risk Management", "Actuarial Science Basics"],
    roles: ["Bank Manager", "Insurance Underwriter", "Risk Analyst", "Loan Officer"]
  },
  {
    rank: 10,
    name: "Taxation & Corporate Law",
    weight: 86,
    category: "Finance",
    demand: "Critical Demand",
    description: "Specialized focus on direct and indirect taxes, corporate regulations, and compliance frameworks.",
    subjects: ["Income Tax Law", "GST Regulations", "Corporate Law", "Financial Auditing"],
    roles: ["Tax Consultant", "Corporate Lawyer (with LLP)", "Compliance Manager"]
  },
  {
    rank: 11,
    name: "FinTech & Digital Payments",
    weight: 95,
    category: "Finance",
    demand: "Critical Demand",
    description: "Covers digital banking frameworks, blockchain-based finance, electronic payment gateways, and fintech regulatory compliance.",
    subjects: ["Digital Banking Systems", "Fintech Regulations", "Electronic Payment Architectures", "Blockchain Finance"],
    roles: ["FinTech Product Manager", "Digital Payment Analyst", "Financial Tech Architect"]
  },
  {
    rank: 12,
    name: "Sustainability Accounting & ESG Reporting",
    weight: 92,
    category: "Accounting",
    demand: "Critical Demand",
    description: "Focuses on environmental, social, and governance (ESG) metrics, carbon auditing, and sustainable financial disclosure standards.",
    subjects: ["ESG Reporting Frameworks", "Carbon Footprint Auditing", "Sustainable Investment Analysis", "Corporate Sustainability Metrics"],
    roles: ["ESG Analyst", "Sustainability Reporting Specialist", "Carbon Auditor"]
  }
];

export const ARTS_SPECIALIZATIONS_DATABASE: GenericSpecializationInfo[] = [
  {
    rank: 1,
    name: "Clinical & Counseling Psychology",
    weight: 85,
    category: "Psychology",
    demand: "Critical Demand",
    description: "Focuses on mental health assessment, therapeutic counselling, psychopathology, and cognitive behavior therapies.",
    subjects: ["Psychopathology", "Cognitive Psychology", "Therapeutic Models", "Neuropsychology"],
    roles: ["Clinical Psychologist", "Counselor", "Behavioral Therapist"]
  },
  {
    rank: 2,
    name: "Applied Economics & Finance",
    weight: 85,
    category: "Economics",
    demand: "High Demand",
    description: "The study of macro/micro economic theories applied to financial markets, public policy, and econometrics.",
    subjects: ["Macroeconomics", "Econometrics", "Public Policy", "Financial Economics"],
    roles: ["Economist", "Financial Consultant", "Policy Analyst"]
  },
  {
    rank: 3,
    name: "Journalism & Mass Communication",
    weight: 80,
    category: "Media",
    demand: "High Demand",
    description: "Covers multimedia reporting, digital content creation, editorial writing, and public relations.",
    subjects: ["Digital Media", "Public Relations", "Broadcast Journalism", "Media Ethics"],
    roles: ["Journalist", "Content Creator", "PR Specialist", "Editor"]
  },
  {
    rank: 4,
    name: "Political Science & Public Administration",
    weight: 75,
    category: "Humanities",
    demand: "Moderate Demand",
    description: "Explores governmental systems, political behavior, international relations, and public policy formulation.",
    subjects: ["International Relations", "Public Administration", "Political Theory", "Comparative Politics"],
    roles: ["Political Analyst", "Civil Servant", "Public Administrator", "Diplomat"]
  },
  {
    rank: 5,
    name: "Sociology & Social Work",
    weight: 70,
    category: "Humanities",
    demand: "Moderate Demand",
    description: "Investigates human society, social structures, community development, and welfare systems.",
    subjects: ["Social Theory", "Community Development", "Criminology", "Social Psychology"],
    roles: ["Social Worker", "Community Organizer", "Sociologist", "NGO Director"]
  },
  {
    rank: 6,
    name: "English Literature & Linguistics",
    weight: 72,
    category: "Languages & Literature",
    demand: "Moderate Demand",
    description: "Deep dive into classic and contemporary literature, evolutionary linguistics, syntax, and creative writing.",
    subjects: ["Classic Literature", "Modern Poetry", "Linguistics", "Creative Writing"],
    roles: ["Author", "Copywriter", "Editor", "Linguist", "Educator"]
  },
  {
    rank: 7,
    name: "History & Archaeology",
    weight: 65,
    category: "Humanities",
    demand: "Niche / Emerging",
    description: "Analytical study of past civilizations, historical preservation, museum studies, and sociological evolution.",
    subjects: ["Ancient History", "Modern World History", "Archaeological Methods", "Museology"],
    roles: ["Historian", "Archaeologist", "Museum Curator", "Archivist"]
  },
  {
    rank: 8,
    name: "Geography & Environmental Studies",
    weight: 78,
    category: "Humanities",
    demand: "High Demand",
    description: "Understanding human-environment interactions, geographic info systems (GIS), urban planning, and climate policy.",
    subjects: ["Physical Geography", "GIS Mapping", "Urban Planning", "Climate Science"],
    roles: ["Urban Planner", "GIS Specialist", "Environmental Consultant", "Cartographer"]
  },
  {
    rank: 9,
    name: "Performing Arts & Drama",
    weight: 68,
    category: "Creative Arts",
    demand: "Niche / Emerging",
    description: "Focus on theatrical performance, scriptwriting, stage direction, and dramatic history.",
    subjects: ["Acting Techniques", "Scriptwriting", "Stage Management", "History of Theatre"],
    roles: ["Actor", "Director", "Playwright", "Stage Manager"]
  },
  {
    rank: 10,
    name: "Philosophy & Ethics",
    weight: 60,
    category: "Humanities",
    demand: "Niche / Emerging",
    description: "Exploration of existential questions, logic, moral frameworks, and analytical reasoning.",
    subjects: ["Logic", "Moral Philosophy", "Ethics", "Epistemology"],
    roles: ["Philosopher", "Bioethicist", "Policy Advisor", "Author"]
  },
  {
    rank: 11,
    name: "Sound & Video Editing",
    weight: 75,
    category: "Creative Arts",
    demand: "High Demand",
    description: "Technical and creative work in post-production for film, audio, and multimedia.",
    subjects: ["Audio Engineering", "Non-linear Editing", "Color Grading", "Post Production Workflow"],
    roles: ["Sound Editor", "Video Editor", "Post-production Specialist"]
  },
  {
    rank: 12,
    name: "Visual Effects (VFX)",
    weight: 85,
    category: "Creative Arts",
    demand: "Critical Demand",
    description: "Digital manipulation and creation of imagery for film, television, and gaming industries.",
    subjects: ["Compositing", "3D Modeling", "Motion Graphics", "VFX Pipeline"],
    roles: ["VFX Artist", "Compositor", "Matchmove Artist"]
  },
  {
    rank: 13,
    name: "Game Design",
    weight: 88,
    category: "Creative Arts",
    demand: "Critical Demand",
    description: "Conceptualizing gameplay mechanics, level design, narrative structures, and player experience.",
    subjects: ["Game Mechanics", "Level Design", "Narrative Design", "UI/UX for Games"],
    roles: ["Game Designer", "Level Designer", "Narrative Architect"]
  },
  {
    rank: 14,
    name: "Graphic & Web Design",
    weight: 82,
    category: "Creative Arts",
    demand: "High Demand",
    description: "Visual communication design across digital and print media platforms.",
    subjects: ["Typography", "UI/UX Design", "Digital Illustration", "Web Design"],
    roles: ["Graphic Designer", "UI/UX Designer", "Art Director"]
  },
  {
    rank: 15,
    name: "Dance & Choreography",
    weight: 65,
    category: "Creative Arts",
    demand: "Moderate Demand",
    description: "Creative movement, performance, and the structure/design of dance sequences.",
    subjects: ["Choreography", "Dance Theory", "Performance Studies", "Movement Analysis"],
    roles: ["Choreographer", "Dancer", "Dance Teacher", "Performance Coach"]
  },
  {
    rank: 16,
    name: "Psychology",
    weight: 85,
    category: "Psychology",
    demand: "Critical Demand",
    description: "Focuses on human cognitive functions, neurological development, behavioral patterns, clinical diagnoses, psychological counseling methods, and experimental lab protocols.",
    subjects: ["General & Cognitive Psychology", "Abnormal & Clinical Diagnostic Models", "Social & Environmental Psychology", "Psychometrics & Statistics", "Adolescent Counseling & Experimental Labs"],
    roles: ["Counseling Assistant", "Adolescent Mentor Help", "Human Resources Recruiting Specialist", "Special Education Support", "Workplace Wellness Associate"]
  },
  {
    rank: 17,
    name: "Digital Humanities & Cultural Analytics",
    weight: 90,
    category: "Humanities",
    demand: "High Demand",
    description: "Applies data science techniques to analyze large collections of texts, artworks, and digital records to uncover cultural trends.",
    subjects: ["Text Mining", "Network Analysis for Humanities", "Digital Archives", "Data Visualization"],
    roles: ["Digital Archivist", "Cultural Data Analyst", "Humanities Researcher"]
  },
  {
    rank: 18,
    name: "Media Ethics & Algorithmic Literacy",
    weight: 92,
    category: "Media",
    demand: "Critical Demand",
    description: "Explores the intersection of media ethics, platform policies, and algorithmic bias in digital communication.",
    subjects: ["Media Ethics", "Algorithmic Literacy", "Platform Policy", "Content Moderation"],
    roles: ["Media Policy Advisor", "Content Ethics Officer", "Algorithmic Auditor"]
  }
];

export const SCIENCE_SPECIALIZATIONS_DATABASE: GenericSpecializationInfo[] = [
  {
    rank: 1,
    name: "Data Science & Analytics",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Focus on statistical modeling, data mining, machine learning algorithms, and big data architectures.",
    subjects: ["Data Mining", "Machine Learning", "Big Data", "Statistical Methods"],
    roles: ["Data Scientist", "Data Analyst", "Machine Learning Engineer"]
  },
  {
    rank: 2,
    name: "Artificial Intelligence",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Explores AI frameworks, deep learning, NLP, and intelligent system designs.",
    subjects: ["Neural Networks", "NLP", "Robotics Basics", "Deep Learning"],
    roles: ["AI Engineer", "Research Scientist", "NLP Engineer"]
  },
  {
    rank: 3,
    name: "Cloud Computing & Cybersecurity",
    weight: 90,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Focus on cloud infrastructure, distributed systems, and modern cybersecurity protocols.",
    subjects: ["Cloud Architectures", "Cryptography", "Network Security", "Distributed Systems"],
    roles: ["Cloud Engineer", "Security Analyst", "Systems Admin"]
  },
  {
    rank: 4,
    name: "Software & Web Development",
    weight: 88,
    category: "Computing & IT",
    demand: "High Demand",
    description: "Advanced programming paradigms, web and mobile app development, and agile software development.",
    subjects: ["Web Development", "Software Testing", "Agile Methodologies", "Database Systems"],
    roles: ["Software Developer", "Full Stack Engineer", "QA Engineer"]
  },
  {
    rank: 5,
    name: "Applied Mathematics & Statistics",
    weight: 85,
    category: "Mathematical Sciences",
    demand: "High Demand",
    description: "Uses statistical models and mathematical techniques to solve real-world problems in operations, finance, and logistics.",
    subjects: ["Probability Algorithms", "Operations Research", "Financial Mathematics"],
    roles: ["Quantitative Analyst", "Actuary", "Operations Researcher"]
  },
  {
    rank: 6,
    name: "Zoology & Animal Sciences",
    weight: 80,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Deep study of animal life, ecosystems, evolutionary biology, and wildlife conservation.",
    subjects: ["Animal Physiology", "Evolutionary Biology", "Ecology", "Genetics"],
    roles: ["Zoologist", "Wildlife Biologist", "Conservationist", "Researcher"]
  },
  {
    rank: 7,
    name: "Home Science & Nutrition",
    weight: 78,
    category: "Applied Sciences",
    demand: "Moderate Demand",
    description: "Focus on human development, dietetics, family resource management, and textile science.",
    subjects: ["Food & Nutrition", "Human Development", "Textile Science", "Dietetics"],
    roles: ["Nutritionist", "Dietitian", "Child Development Specialist", "Educator"]
  },
  {
    rank: 8,
    name: "Statistics & Probability",
    weight: 88,
    category: "Mathematical Sciences",
    demand: "Critical Demand",
    description: "The science of learning from data, measuring, controlling, and communicating uncertainty.",
    subjects: ["Statistical Inference", "Probability Theory", "Survey Methods", "Time Series Analysis"],
    roles: ["Statistician", "Data Analyst", "Risk Analyst", "Actuary"]
  },
  {
    rank: 9,
    name: "Biotechnology & Genetics",
    weight: 82,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Application of molecular biology, genetic engineering, and bio-informatics.",
    subjects: ["Genetics", "Molecular Biology", "Bio-informatics", "Bioprocess"],
    roles: ["Biotechnologist", "Geneticist", "Research Associate"]
  },
  {
    rank: 10,
    name: "Applied Physics & Electronics",
    weight: 75,
    category: "Physical Sciences",
    demand: "Moderate Demand",
    description: "The study of quantum mechanics, material science, and integrated electronics.",
    subjects: ["Solid State Physics", "Photonics", "Material Science"],
    roles: ["Research Scientist", "Electronics Consultant"]
  },
  {
    rank: 11,
    name: "Environmental Science & Ecology",
    weight: 83,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focuses on solving environmental issues, conservation, sustainability mapping, and mitigating climate impact.",
    subjects: ["Conservation Biology", "Climatology", "Environmental Policy", "Pollution Control"],
    roles: ["Environmental Scientist", "Ecologist", "Sustainability Consultant"]
  },
  {
    rank: 12,
    name: "Forensic Science & Criminology",
    weight: 79,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Applying scientific methods and processes to solving crimes, analyzing DNA, toxicology, and ballistics.",
    subjects: ["Crime Scene Investigation", "Forensic Toxicology", "Ballistics", "DNA Profiling"],
    roles: ["Forensic Scientist", "Crime Scene Investigator", "Toxicologist"]
  },
  {
    rank: 13,
    name: "Microbiology & Immunology",
    weight: 86,
    category: "Life Sciences",
    demand: "Critical Demand",
    description: "The study of microscopic organisms, immune system responses, vaccine development, and virology.",
    subjects: ["Virology", "Immunology", "Bacteriology", "Medical Microbiology"],
    roles: ["Microbiologist", "Immunologist", "Clinical Researcher", "Epidemiologist"]
  },
  {
    rank: 14,
    name: "Botany & Plant Sciences",
    weight: 74,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Detailed study of plant physiology, agricultural biotechnology, forestry, and plant genetics.",
    subjects: ["Plant Physiology", "Agricultural Science", "Forestry", "Plant Genetics"],
    roles: ["Botanist", "Agronomist", "Plant Pathologist", "Ecologist"]
  },
  {
    rank: 15,
    name: "Chemistry & Industrial Applications",
    weight: 81,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Explores organic and inorganic compositions, polymer sciences, pharmaceuticals, and manufacturing processes.",
    subjects: ["Organic Chemistry", "Analytical Chemistry", "Polymer Science", "Industrial Pharmaceuticals"],
    roles: ["Chemical Analyst", "Research Chemist", "Quality Control Manager"]
  },
  {
    rank: 16,
    name: "Nursing",
    weight: 85,
    category: "Life Sciences",
    demand: "Critical Demand",
    description: "Comprehensive clinical care degree focusing on community health, medical-surgical nursing, maternal biology, infection control, and primary patient care.",
    subjects: ["Medical-Surgical Nursing", "Community Health Nursing", "Pediatric Nursing", "Anatomy & Physiology"],
    roles: ["Staff Nurse", "Nursing Supervisor", "Clinical Instructor", "Public Health Nurse"]
  },
  {
    rank: 17,
    name: "Radiology & Imaging Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Diagnostic Growth",
    description: "Training in diagnostic imaging technologies such as X-Ray, MRI, CT scans, and ultrasound.",
    subjects: ["Radiation Physics", "Radiographic Anatomy", "CT/MRI Tech", "Radiobiology"],
    roles: ["Radiology Technician", "MRI Specialist", "CT Scan Technologist"]
  },
  {
    rank: 18,
    name: "Operation Theatre Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "Essential Surgical Aide",
    description: "Allied health program dealing with managing operation theatres, surgical equipment, and assisting surgeons.",
    subjects: ["Surgical Principles", "Anesthesia Equipment", "Sterilization", "Surgical Anatomy"],
    roles: ["OT Technician", "Surgical Assistant", "Sterilization Manager"]
  },
  {
    rank: 19,
    name: "Cardiac Care Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand in Cardiology",
    description: "Specializes in assisting cardiologists during invasive and non-invasive cardiovascular procedures.",
    subjects: ["Cardiovascular Anatomy", "ECG", "Echocardiography", "Cath Lab Procedures"],
    roles: ["Cardiac Care Technician", "Echocardiographer", "Cath Lab Technologist"]
  },
  {
    rank: 20,
    name: "Cardiovascular Perfusion Technology",
    weight: 90,
    category: "Life Sciences",
    demand: "Specialized Critical",
    description: "Deals with setting up and operating heart-lung machines during complex heart surgeries.",
    subjects: ["Perfusion Technology", "Heart-Lung Machine", "Cardiac Anatomy", "Surgical Assistance"],
    roles: ["Perfusionist", "Cardiovascular Technician"]
  },
  {
    rank: 21,
    name: "Renal Dialysis Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "Steady Clinical Need",
    description: "Preparation to operate dialysis machines and assist patients with chronic kidney failure.",
    subjects: ["Renal Anatomy & Physiology", "Dialysis Procedures", "Nephrology", "Patient Monitoring"],
    roles: ["Dialysis Technician", "Renal Technologist"]
  },
  {
    rank: 22,
    name: "Anaesthesia Technology",
    weight: 80,
    category: "Life Sciences",
    demand: "Critical Care Demand",
    description: "Trains students to assist anesthesiologists in operating rooms, preparing gases and intubation setups.",
    subjects: ["Anesthetic Agents", "Clinical Physiology", "ICU Management", "Patient Monitoring"],
    roles: ["Anaesthesia Technician", "ICU Technologist"]
  },
  {
    rank: 23,
    name: "Neuroscience Technology",
    weight: 80,
    category: "Life Sciences",
    demand: "Niche Neurological Diagnostics",
    description: "Focuses on operating neuro-diagnostic equipment like EEG, EMG to diagnose nerve and brain disorders.",
    subjects: ["Neuroanatomy", "Clinical Neurophysiology", "EEG/EMG Operations", "Pathology"],
    roles: ["Neuro Technologist", "EEG Technician"]
  },
  {
    rank: 24,
    name: "Respiratory Therapy",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focuses on evaluating and treating patients with respiratory/cardiopulmonary disorders.",
    subjects: ["Ventilation Therapy", "Respiratory Physiology", "Pulmonary Diagnostics"],
    roles: ["Respiratory Therapist", "Pulmonary Technician"]
  },
  {
    rank: 25,
    name: "Nuclear Medicine Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Using radioactive tracers to diagnose and treat diseases.",
    subjects: ["Radio-pharmacy", "Nuclear Physics", "Imaging Techniques"],
    roles: ["Nuclear Medicine Technologist"]
  },
  {
    rank: 26,
    name: "Radiotherapy Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focus on using high-energy radiation to treat cancer.",
    subjects: ["Radiobiology", "Oncology", "Radiation Physics"],
    roles: ["Radiotherapy Technologist", "Oncology Assistant"]
  },
  {
    rank: 27,
    name: "Emergency Medical Technology",
    weight: 90,
    category: "Life Sciences",
    demand: "Critical Demand",
    description: "Pre-hospital emergency care, life support, and rapid patient stabilization.",
    subjects: ["Emergency Aid", "Trauma Care", "Life Support Systems"],
    roles: ["Emergency Medical Technician", "Paramedic"]
  },
  {
    rank: 28,
    name: "Computer Science",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Foundational study of algorithms, data structures, computer architecture, and programming languages.",
    subjects: ["Data Structures", "Algorithms", "Operating Systems", "Programming"],
    roles: ["Software Engineer", "Systems Architect", "Developer"]
  },
  {
    rank: 29,
    name: "Information Technology",
    weight: 90,
    category: "Computing & IT",
    demand: "High Demand",
    description: "Focuses on the application of technology in business, including network management, database administration, and IT support.",
    subjects: ["Database Management", "System Admin", "Information Systems", "Networking"],
    roles: ["IT Specialist", "Database Administrator", "System Administrator"]
  },
  {
    rank: 30,
    name: "Data Science",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Study of extracting knowledge from data using statistical and computational techniques.",
    subjects: ["Big Data Analytics", "Machine Learning", "Data Visualization"],
    roles: ["Data Scientist", "Data Analyst"]
  },
  {
    rank: 31,
    name: "Artificial Intelligence",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Study of intelligent agents, machine learning, and human-computer interaction.",
    subjects: ["Neural Networks", "Robotics", "NLP", "AI Systems"],
    roles: ["AI Engineer", "ML Engineer"]
  },
  {
    rank: 32,
    name: "Cyber Security",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Protection of computer systems, networks, and data from digital attacks.",
    subjects: ["Network Security", "Cryptography", "Ethical Hacking", "Info Sec"],
    roles: ["Security Analyst", "Penetration Tester", "Security Consultant"]
  },
  {
    rank: 33,
    name: "Software Engineering",
    weight: 90,
    category: "Computing & IT",
    demand: "High Demand",
    description: "Systematic approach to developing, maintaining, and testing software systems.",
    subjects: ["Software Design", "Testing", "Project Management", "Software Architecture"],
    roles: ["Software Engineer", "Systems Analyst"]
  },
  {
    rank: 35,
    name: "Physics",
    weight: 90,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Fundamental study of matter, energy, and the physical universe.",
    subjects: ["Mechanics", "Electromagnetism", "Quantum Physics", "Thermodynamics"],
    roles: ["Physicist", "Researcher", "Lab Technician"]
  },
  {
    rank: 36,
    name: "Mathematics",
    weight: 95,
    category: "Mathematical Sciences",
    demand: "High Demand",
    description: "Study of structure, space, and change through mathematical theories and logic.",
    subjects: ["Calculus", "Algebra", "Real Analysis", "Differential Equations"],
    roles: ["Mathematician", "Data Analyst", "Educator"]
  },
  {
    rank: 37,
    name: "Biochemistry",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Study of chemical processes within and relating to living organisms.",
    subjects: ["Enzymology", "Metabolism", "Molecular Biology", "Clinical Chemistry"],
    roles: ["Biochemist", "Lab Scientist", "Clinical Researcher"]
  },
  {
    rank: 38,
    name: "Geology",
    weight: 80,
    category: "Earth Sciences",
    demand: "Moderate Demand",
    description: "Study of the solid Earth, the rocks of which it is composed, and the processes by which they change.",
    subjects: ["Mineralogy", "Petrology", "Geomorphology", "Sedimentology"],
    roles: ["Geologist", "Mineralogist", "Surveyor"]
  },
  {
    rank: 39,
    name: "Geography",
    weight: 75,
    category: "Earth Sciences",
    demand: "Moderate Demand",
    description: "Study of places and the relationships between people and their environments.",
    subjects: ["Physical Geography", "Human Geography", "GIS", "Cartography"],
    roles: ["Geographer", "Urban Planner", "Cartographer"]
  },
  {
    rank: 40,
    name: "Food Science & Technology",
    weight: 85,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Study of physical, microbiological, and chemical makeup of food.",
    subjects: ["Food Chemistry", "Food Microbiology", "Food Processing", "Quality Assurance"],
    roles: ["Food Technologist", "Quality Control Manager", "Food Scientist"]
  },
  {
    rank: 41,
    name: "Anthropology",
    weight: 70,
    category: "Humanities & Sciences",
    demand: "Niche / Emerging",
    description: "Study of human societies, cultures, and their development.",
    subjects: ["Cultural Anthropology", "Physical Anthropology", "Linguistics", "Archaeology"],
    roles: ["Anthropologist", "Social Researcher", "Cultural Consultant"]
  },
  {
    rank: 42,
    name: "Astronomy & Astrophysics",
    weight: 75,
    category: "Physical Sciences",
    demand: "Niche / Emerging",
    description: "Scientific study of celestial objects and the physics of the universe.",
    subjects: ["Astrophysics", "Stellar Evolution", "Cosmology", "Planetary Science"],
    roles: ["Astronomer", "Astrophysicist", "Researcher"]
  },
  {
    rank: 43,
    name: "Nanotechnology",
    weight: 85,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Study of manipulation of matter on an atomic, molecular, and supramolecular scale.",
    subjects: ["Nano-materials", "Nanofabrication", "Nano-electronics", "Nano-medicine"],
    roles: ["Nanotechnologist", "Research Scientist", "Materials Engineer"]
  },
  {
    rank: 44,
    name: "Bioinformatics",
    weight: 88,
    category: "Computing & Life Sciences",
    demand: "High Demand",
    description: "Use of software tools to understand biological data.",
    subjects: ["Computational Biology", "Sequence Analysis", "Genomics", "Algorithms"],
    roles: ["Bioinformatician", "Computational Biologist"]
  },
  {
    rank: 45,
    name: "Textile Science",
    weight: 80,
    category: "Applied Sciences",
    demand: "Moderate Demand",
    description: "Study of textile fibers, manufacturing, and processing.",
    subjects: ["Fiber Science", "Textile Chemistry", "Material Testing"],
    roles: ["Textile Engineer", "Quality Technician", "Fabric Researcher"]
  },
  {
    rank: 46,
    name: "Dairy Science & Technology",
    weight: 80,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Study of milk production, processing, and dairy product manufacturing.",
    subjects: ["Dairy Chemistry", "Dairy Microbiology", "Processing Technology"],
    roles: ["Dairy Technologist", "Quality Inspector", "Production Manager"]
  },
  {
    rank: 47,
    name: "Horticulture",
    weight: 80,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Art and science of growing plants.",
    subjects: ["Pomology", "Olericulture", "Floriculture", "Plant Breeding"],
    roles: ["Horticulturist", "Plant Nursery Manager", "Plant Pathologist"]
  },
  {
    rank: 48,
    name: "Sericulture",
    weight: 75,
    category: "Life Sciences",
    demand: "Niche",
    description: "Study of silkworm rearing and silk production.",
    subjects: ["Silkworm Biology", "Silk Processing", "Sericulture Practices"],
    roles: ["Sericulturist", "Silk Technology Expert"]
  },
  {
    rank: 50,
    name: "Physics",
    weight: 90,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Fundamental study of matter, energy, and the physical universe.",
    subjects: ["Mechanics", "Electromagnetism", "Quantum Physics", "Thermodynamics"],
    roles: ["Physicist", "Researcher", "Lab Technician"]
  },
  {
    rank: 51,
    name: "Chemistry",
    weight: 85,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Explores organic and inorganic compositions, polymer sciences, and chemical structures.",
    subjects: ["Organic Chemistry", "Analytical Chemistry", "Physical Chemistry"],
    roles: ["Chemical Analyst", "Research Chemist", "Quality Control Manager"]
  },
  {
    rank: 52,
    name: "Mathematics",
    weight: 95,
    category: "Mathematical Sciences",
    demand: "High Demand",
    description: "Study of structure, space, and change through mathematical theories and logic.",
    subjects: ["Calculus", "Algebra", "Real Analysis", "Differential Equations"],
    roles: ["Mathematician", "Data Analyst", "Educator"]
  },
  {
    rank: 53,
    name: "Statistics",
    weight: 88,
    category: "Mathematical Sciences",
    demand: "Critical Demand",
    description: "The science of learning from data, measuring, controlling, and communicating uncertainty.",
    subjects: ["Statistical Inference", "Probability Theory", "Survey Methods", "Time Series Analysis"],
    roles: ["Statistician", "Data Analyst", "Risk Analyst", "Actuary"]
  },
  {
    rank: 54,
    name: "Biology",
    weight: 80,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "The study of living organisms, their structure, growth, evolution, and distribution.",
    subjects: ["Cell Biology", "Ecology", "Genetics", "Physiology"],
    roles: ["Biologist", "Lab Researcher", "Ecologist"]
  },
  {
    rank: 55,
    name: "Botany",
    weight: 74,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Detailed study of plant physiology, agricultural biotechnology, forestry, and plant genetics.",
    subjects: ["Plant Physiology", "Agricultural Science", "Forestry", "Plant Genetics"],
    roles: ["Botanist", "Agronomist", "Plant Pathologist", "Ecologist"]
  },
  {
    rank: 56,
    name: "Zoology",
    weight: 80,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Deep study of animal life, ecosystems, evolutionary biology, and wildlife conservation.",
    subjects: ["Animal Physiology", "Evolutionary Biology", "Ecology", "Genetics"],
    roles: ["Zoologist", "Wildlife Biologist", "Conservationist", "Researcher"]
  },
  {
    rank: 57,
    name: "Microbiology",
    weight: 86,
    category: "Life Sciences",
    demand: "Critical Demand",
    description: "The study of microscopic organisms, immune system responses, vaccine development, and virology.",
    subjects: ["Virology", "Immunology", "Bacteriology", "Medical Microbiology"],
    roles: ["Microbiologist", "Immunologist", "Clinical Researcher", "Epidemiologist"]
  },
  {
    rank: 58,
    name: "Biotechnology",
    weight: 82,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Application of molecular biology, genetic engineering, and bio-informatics.",
    subjects: ["Genetics", "Molecular Biology", "Bio-informatics", "Bioprocess"],
    roles: ["Biotechnologist", "Geneticist", "Research Associate"]
  },
  {
    rank: 59,
    name: "Biochemistry",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Study of chemical processes within and relating to living organisms.",
    subjects: ["Enzymology", "Metabolism", "Molecular Biology", "Clinical Chemistry"],
    roles: ["Biochemist", "Lab Scientist", "Clinical Researcher"]
  },
  {
    rank: 60,
    name: "Genetics",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Study of heredity and genetic variation in organisms.",
    subjects: ["Molecular Genetics", "Population Genetics", "Genomics"],
    roles: ["Geneticist", "Research Assistant", "Biomedical Specialist"]
  },
  {
    rank: 61,
    name: "Environmental Science",
    weight: 83,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focuses on solving environmental issues, conservation, sustainability mapping, and mitigating climate impact.",
    subjects: ["Conservation Biology", "Climatology", "Environmental Policy", "Pollution Control"],
    roles: ["Environmental Scientist", "Ecologist", "Sustainability Consultant"]
  },
  {
    rank: 62,
    name: "Geology",
    weight: 80,
    category: "Earth Sciences",
    demand: "Moderate Demand",
    description: "Study of the solid Earth, the rocks of which it is composed, and the processes by which they change.",
    subjects: ["Mineralogy", "Petrology", "Geomorphology", "Sedimentology"],
    roles: ["Geologist", "Mineralogist", "Surveyor"]
  },
  {
    rank: 63,
    name: "Geography",
    weight: 75,
    category: "Earth Sciences",
    demand: "Moderate Demand",
    description: "Study of places and the relationships between people and their environments.",
    subjects: ["Physical Geography", "Human Geography", "GIS", "Cartography"],
    roles: ["Geographer", "Urban Planner", "Cartographer"]
  },
  {
    rank: 64,
    name: "Electronics",
    weight: 80,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Study of circuits, devices, and systems using electricity.",
    subjects: ["Circuit Theory", "Digital Electronics", "Embedded Systems"],
    roles: ["Electronics Engineer", "Technician"]
  },
  {
    rank: 65,
    name: "Forensic Science",
    weight: 79,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Applying scientific methods and processes to solving crimes, analyzing DNA, toxicology, and ballistics.",
    subjects: ["Crime Scene Investigation", "Forensic Toxicology", "Ballistics", "DNA Profiling"],
    roles: ["Forensic Scientist", "Crime Scene Investigator", "Toxicologist"]
  },
  {
    rank: 66,
    name: "Nutrition & Dietetics",
    weight: 78,
    category: "Applied Sciences",
    demand: "Moderate Demand",
    description: "Focus on human development, dietetics, family resource management, and textile science.",
    subjects: ["Food & Nutrition", "Clinical Dietetics"],
    roles: ["Nutritionist", "Dietitian", "Child Development Specialist", "Educator"]
  },
  {
    rank: 67,
    name: "Food Science & Technology",
    weight: 85,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Study of physical, microbiological, and chemical makeup of food.",
    subjects: ["Food Chemistry", "Food Microbiology", "Food Processing", "Quality Assurance"],
    roles: ["Food Technologist", "Quality Control Manager", "Food Scientist"]
  },
  {
    rank: 68,
    name: "Home Science",
    weight: 75,
    category: "Applied Sciences",
    demand: "Moderate Demand",
    description: "Study of home and family management.",
    subjects: ["Resource Management", "Textiles", "Human Development"],
    roles: ["Home Management Specialist", "Counselor"]
  },
  {
    rank: 69,
    name: "Anthropology",
    weight: 70,
    category: "Humanities & Sciences",
    demand: "Niche / Emerging",
    description: "Study of human societies, cultures, and their development.",
    subjects: ["Cultural Anthropology", "Physical Anthropology", "Linguistics", "Archaeology"],
    roles: ["Anthropologist", "Social Researcher", "Cultural Consultant"]
  },
  {
    rank: 70,
    name: "Astronomy & Astrophysics",
    weight: 75,
    category: "Physical Sciences",
    demand: "Niche / Emerging",
    description: "Scientific study of celestial objects and the physics of the universe.",
    subjects: ["Astrophysics", "Stellar Evolution", "Cosmology", "Planetary Science"],
    roles: ["Astronomer", "Astrophysicist", "Researcher"]
  },
  {
    rank: 71,
    name: "Nanotechnology",
    weight: 85,
    category: "Physical Sciences",
    demand: "High Demand",
    description: "Study of manipulation of matter on an atomic, molecular, and supramolecular scale.",
    subjects: ["Nano-materials", "Nanofabrication", "Nano-electronics", "Nano-medicine"],
    roles: ["Nanotechnologist", "Research Scientist", "Materials Engineer"]
  },
  {
    rank: 72,
    name: "Bioinformatics",
    weight: 88,
    category: "Computing & Life Sciences",
    demand: "High Demand",
    description: "Use of software tools to understand biological data.",
    subjects: ["Computational Biology", "Sequence Analysis", "Genomics", "Algorithms"],
    roles: ["Bioinformatician", "Computational Biologist"]
  },
  {
    rank: 73,
    name: "Textile Science",
    weight: 80,
    category: "Applied Sciences",
    demand: "Moderate Demand",
    description: "Study of textile fibers, manufacturing, and processing.",
    subjects: ["Fiber Science", "Textile Chemistry", "Material Testing"],
    roles: ["Textile Engineer", "Quality Technician", "Fabric Researcher"]
  },
  {
    rank: 74,
    name: "Dairy Science & Technology",
    weight: 80,
    category: "Applied Sciences",
    demand: "High Demand",
    description: "Study of milk production, processing, and dairy product manufacturing.",
    subjects: ["Dairy Chemistry", "Dairy Microbiology", "Processing Technology"],
    roles: ["Dairy Technologist", "Quality Inspector", "Production Manager"]
  },
  {
    rank: 75,
    name: "Horticulture",
    weight: 80,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Art and science of growing plants.",
    subjects: ["Pomology", "Olericulture", "Floriculture", "Plant Breeding"],
    roles: ["Horticulturist", "Plant Nursery Manager", "Plant Pathologist"]
  },
  {
    rank: 76,
    name: "Sericulture",
    weight: 75,
    category: "Life Sciences",
    demand: "Niche",
    description: "Study of silkworm rearing and silk production.",
    subjects: ["Silkworm Biology", "Silk Processing", "Sericulture Practices"],
    roles: ["Sericulturist", "Silk Technology Expert"]
  },
  {
    rank: 77,
    name: "Marine Biology",
    weight: 82,
    category: "Life Sciences",
    demand: "Moderate Demand",
    description: "Study of marine organisms and their ecosystems.",
    subjects: ["Oceanography", "Marine Ecology", "Ichthyology", "Marine Conservation"],
    roles: ["Marine Biologist", "Oceanographer", "Conservationist"]
  },
  {
    rank: 78,
    name: "Cardiac Care Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand in Cardiology",
    description: "Specializes in assisting cardiologists during invasive and non-invasive cardiovascular procedures.",
    subjects: ["Cardiovascular Anatomy", "ECG", "Echocardiography", "Cath Lab Procedures"],
    roles: ["Cardiac Care Technician", "Echocardiographer", "Cath Lab Technologist"]
  },
  {
    rank: 79,
    name: "Anaesthesia Technology",
    weight: 80,
    category: "Life Sciences",
    demand: "Critical Care Demand",
    description: "Trains students to assist anesthesiologists in operating rooms, preparing gases and intubation setups.",
    subjects: ["Anesthetic Agents", "Clinical Physiology", "ICU Management", "Patient Monitoring"],
    roles: ["Anaesthesia Technician", "ICU Technologist"]
  },
  {
    rank: 80,
    name: "Neuroscience Technology",
    weight: 80,
    category: "Life Sciences",
    demand: "Niche Neurological Diagnostics",
    description: "Focuses on operating neuro-diagnostic equipment like EEG, EMG to diagnose nerve and brain disorders.",
    subjects: ["Neuroanatomy", "Clinical Neurophysiology", "EEG/EMG Operations", "Pathology"],
    roles: ["Neuro Technologist", "EEG Technician"]
  },
  {
    rank: 81,
    name: "Respiratory Therapy",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focuses on evaluating and treating patients with respiratory/cardiopulmonary disorders.",
    subjects: ["Ventilation Therapy", "Respiratory Physiology", "Pulmonary Diagnostics"],
    roles: ["Respiratory Therapist", "Pulmonary Technician"]
  },
  {
    rank: 82,
    name: "Nuclear Medicine Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Using radioactive tracers to diagnose and treat diseases.",
    subjects: ["Radio-pharmacy", "Nuclear Physics", "Imaging Techniques"],
    roles: ["Nuclear Medicine Technologist"]
  },
  {
    rank: 83,
    name: "Radiotherapy Technology",
    weight: 85,
    category: "Life Sciences",
    demand: "High Demand",
    description: "Focus on using high-energy radiation to treat cancer.",
    subjects: ["Radiobiology", "Oncology", "Radiation Physics"],
    roles: ["Radiotherapy Technologist", "Oncology Assistant"]
  },
  {
    rank: 84,
    name: "Emergency Medical Technology",
    weight: 90,
    category: "Life Sciences",
    demand: "Critical Demand",
    description: "Pre-hospital emergency care, life support, and rapid patient stabilization.",
    subjects: ["Emergency Aid", "Trauma Care", "Life Support Systems"],
    roles: ["Emergency Medical Technician", "Paramedic"]
  }
];

export const LAW_SPECIALIZATIONS_DATABASE: GenericSpecializationInfo[] = [
  {
    rank: 1,
    name: "Corporate & Business Law",
    weight: 90,
    category: "Law",
    demand: "Critical Demand",
    description: "Specializes in corporate governance, mergers, acquisitions, contract law, and financial regulations.",
    subjects: ["Company Law", "Contract Law", "Taxation Law", "M&A Regulations"],
    roles: ["Corporate Lawyer", "Legal Counsel", "Compliance Officer"]
  },
  {
    rank: 2,
    name: "Administrative Law",
    weight: 75,
    category: "Law",
    demand: "Moderate Demand",
    description: "Deals with the rules, regulations, orders, and decisions created by administrative agencies.",
    subjects: ["Administrative Procedures", "Agency Law", "Regulatory Compliance", "Governmental Processes"],
    roles: ["Administrative Lawyer", "Legal Consultant", "Regulatory Affairs Specialist"]
  },
  {
    rank: 3,
    name: "Air & Space Law",
    weight: 65,
    category: "Law",
    demand: "Niche / Emerging",
    description: "Governs the rules for aviation, outer space activities, and international air travel.",
    subjects: ["Aviation Law", "Space Treaties", "International Air Law", "Satellite Regulations"],
    roles: ["Aviation Attorney", "Space Policy Consultant", "Legal Advisor"]
  },
  {
    rank: 4,
    name: "Cyber Law & IT Regulations",
    weight: 88,
    category: "Law",
    demand: "Critical Demand",
    description: "Deals with data privacy, cybercrimes, e-commerce regulations, and digital footprint legislation.",
    subjects: ["IT Act", "Data Privacy Laws", "Cybercrime Prosecution", "Intellectual Property"],
    roles: ["Cyber Lawyer", "Data Privacy Officer", "Technology Counsel"]
  },
  {
    rank: 5,
    name: "Criminal Law",
    weight: 85,
    category: "Law",
    demand: "High Demand",
    description: "The classic practice of prosecution, defense, criminal procedures, forensics, and evidence acts.",
    subjects: ["Criminal Procedure Code", "Evidence Act", "Forensic Law", "Penal Code"],
    roles: ["Criminal Defense Lawyer", "Public Prosecutor", "Legal Advisor"]
  },
  {
    rank: 6,
    name: "Intellectual Property Rights",
    weight: 82,
    category: "Law",
    demand: "High Demand",
    description: "Focus on patents, trademarks, copyrights, and intellectual trade rights in business and tech.",
    subjects: ["Patent Law", "Trademark Regulations", "Copyright Law", "International IP Laws"],
    roles: ["IPR Attorney", "Patent Agent", "Trademark Lawyer"]
  },
  {
    rank: 7,
    name: "Human Rights & International Law",
    weight: 78,
    category: "Law",
    demand: "Moderate Demand",
    description: "Focuses on global treaties, diplomatic law, humanitarian rights, and international dispute resolution.",
    subjects: ["International Treaties", "Humanitarian Law", "Public International Law", "Diplomacy"],
    roles: ["Human Rights Lawyer", "Diplomat", "NGO Legal Advisor", "Policy Analyst"]
  },
  {
    rank: 8,
    name: "Family Law & Child Protection",
    weight: 80,
    category: "Law",
    demand: "High Demand",
    description: "Handles sensitive domestic issues spanning divorce, alimony, child custody, and domestic abuse.",
    subjects: ["Marriage Laws", "Child Custody", "Divorce Protocols", "Inheritance Frameworks"],
    roles: ["Family Lawyer", "Divorce Attorney", "Child Advocate"]
  },
  {
    rank: 9,
    name: "Environmental Law & Sustainability",
    weight: 85,
    category: "Law",
    demand: "Critical Demand",
    description: "Works at the intersection of industry regulations, public policy, and environmental protection mandates.",
    subjects: ["Environmental Policy", "Climate Accords", "Pollution Control Acts", "Sustainability Law"],
    roles: ["Environmental Attorney", "Compliance Regulator", "Green Policy Advisor"]
  },
  {
    rank: 10,
    name: "Labor & Employment Law",
    weight: 81,
    category: "Law",
    demand: "High Demand",
    description: "Governs the relationships between employers, employees, trade unions, and workplace safety.",
    subjects: ["Industrial Disputes Act", "Workmen's Compensation", "Trade Union Laws", "Employment Discrimination"],
    roles: ["Labor Lawyer", "In-House HR Counsel", "Union Representative"]
  },
  {
    rank: 11,
    name: "Real Estate & Property Law",
    weight: 86,
    category: "Law",
    demand: "High Demand",
    description: "Specialized in zoning laws, commercial property development, title transfers, and tenant rights.",
    subjects: ["Property Transfer Act", "Zoning Regulations", "Real Estate Contracts", "Mortgage Law"],
    roles: ["Real Estate Attorney", "Property Consultant", "Title Analyst"]
  },
  {
    rank: 12,
    name: "Arbitration Law",
    weight: 80,
    category: "Law",
    demand: "High Demand",
    description: "Focuses on alternative dispute resolution mechanisms to settle legal disputes outside of court.",
    subjects: ["Arbitration Act", "Mediation Techniques", "ADR Procedures", "Dispute Resolution"],
    roles: ["Arbitrator", "Mediator", "Conflict Resolution Specialist"]
  },
  {
    rank: 13,
    name: "Banking Law",
    weight: 88,
    category: "Law",
    demand: "High Demand",
    description: "Governs operations of financial institutions, banking regulations, and lending rules.",
    subjects: ["Banking Regulations", "NPA Management", "Financial Law", "Securitization"],
    roles: ["Banking Attorney", "Legal Advisor to Banks", "Financial Compliance Officer"]
  },
  {
    rank: 14,
    name: "Civil Law",
    weight: 85,
    category: "Law",
    demand: "Critical Demand",
    description: "Deals with disputes between individuals or organizations, including contracts, property, and torts.",
    subjects: ["Civil Procedure", "Tort Law", "Contract Law", "Property Litigation"],
    roles: ["Civil Advocate", "Litigation Lawyer", "Legal Consultant"]
  },
  {
    rank: 15,
    name: "Commercial & Competition Law",
    weight: 89,
    category: "Law",
    demand: "High Demand",
    description: "Governs business transactions, fair trade practices, and market competition.",
    subjects: ["Competition Act", "Commercial Contracts", "Trade Regulations", "Antitrust Laws"],
    roles: ["Commercial Lawyer", "Competition Law Specialist", "Trade Consultant"]
  },
  {
    rank: 16,
    name: "Constitutional Law",
    weight: 92,
    category: "Law",
    demand: "Niche",
    description: "Deals with the interpretation and application of the country's constitution.",
    subjects: ["Fundamental Rights", "Constitutional Amendment", "Judicial Review", "Federal Structure"],
    roles: ["Constitutional Lawyer", "Policy Consultant", "Legal Scholar"]
  },
  {
    rank: 17,
    name: "B.A. LL.B.",
    weight: 92,
    category: "Law",
    demand: "High Demand",
    description: "An integrated 5-year double-degree program combining Bachelor of Arts subjects (History, Sociology, Political Science) with a professional Bachelor of Laws. This interdisciplinary approach provides a solid foundation in the humanities while developing core legal acumen.",
    subjects: ["Constitutional Law", "Sociology of Law", "Political Science", "Family Law", "Law of Torts"],
    roles: ["Civil Litigator", "Legal Journalist", "Legal Advisor", "Public Policy Analyst"]
  },
  {
    rank: 18,
    name: "B.A. LL.B. Honours (Hons)",
    weight: 96,
    category: "Law",
    demand: "Critical Demand",
    description: "An advanced, highly prestigious integrated 5-year program that offers specialization honours in select legal branches like International Law, Corporate Jurisprudence, or Intellectual Property. Features a rigorous curriculum with specialized seminars, clinical training, and dissertation requirements.",
    subjects: ["Advanced Constitutional Jurisprudence", "International Human Rights", "Judicial Process & Interpretation", "Clinical Legal Education", "Honours Seminar Research"],
    roles: ["Corporate Legal Consultant", "International Human Rights Lawyer", "Supreme Court Litigator", "Policy Advisor"]
  },
  {
    rank: 19,
    name: "B.Com LL.B",
    weight: 90,
    category: "Law",
    demand: "High Demand",
    description: "An integrated 5-year curriculum blending business commerce concepts (Accounting, Finance, Business Statistics) with extensive legal training. Perfect for candidates looking to practice corporate law, tax advocacy, commercial litigation, or in-house counsel.",
    subjects: ["Corporate Accounting", "Company Law", "Direct & Indirect Taxation", "Banking & Insurance Regulations", "Bankruptcy & Insolvency Code"],
    roles: ["In-House Corporate Counsel", "Tax Consultant & Advocate", "Corporate Compliance Officer", "Financial Legal Analyst"]
  },
  {
    rank: 20,
    name: "B.Sc. LL.B",
    weight: 85,
    category: "Law",
    demand: "Niche / Emerging",
    description: "An integrated 5-year program designed for the intersection of science and law. Combines scientific principles (Chemistry, Forensic Science, Biotechnology) with legal studies, providing a unique advantage in patent litigation, cybersecurity, and environmental law.",
    subjects: ["Forensic Science & Criminology", "Intellectual Property Rights", "Information Technology Law", "Environmental & Biodiversity Law", "Biotech Regulations"],
    roles: ["Patent Litigator", "Cybersecurity Legal Consultant", "Forensic Analyst Advocate", "Environmental Lawyer"]
  },
  {
    rank: 21,
    name: "BBA LL.B.",
    weight: 91,
    category: "Law",
    demand: "High Demand",
    description: "An integrated 5-year professional program bridging Business Administration (Management, Marketing, Human Resources) with a comprehensive legal syllabus. Equips students with managerial skills alongside corporate legal expertise, ideal for commercial legal practices.",
    subjects: ["Strategic Management", "Organizational Behavior", "Mergers & Acquisitions Law", "Consumer Protection & Fair Trade", "International Business Contracts"],
    roles: ["Corporate Lawyer", "Legal Risk Consultant", "Commercial Arbitrator", "Corporate Secretary Specialist"]
  },
  {
    rank: 22,
    name: "BBA LL.B. Honours (Hons)",
    weight: 95,
    category: "Law",
    demand: "Critical Demand",
    description: "An elite integrated 5-year course combining business management with honours specialization in commercial law fields. Students engage in deep research, corporate legal case studies, intensive moot-court training, and advanced strategic business regulations.",
    subjects: ["Advanced Corporate Law & Finance", "Securities & Capital Market Regulations", "International Trade Dispute Resolution", "Intellectual Property Management", "Strategic Legal Compliance"],
    roles: ["Investment Banking Legal Advisor", "Senior M&A Counsel", "International Trade Arbitrator", "Corporate Governance Consultant"]
  },
  {
    rank: 23,
    name: "LL.B.",
    weight: 89,
    category: "Law",
    demand: "High Demand",
    description: "The classic 3-year post-graduation law program designed for graduates of any discipline (Science, Arts, Commerce) who want to pursue a professional career in the legal field. Focuses purely on core law subjects, civil/criminal litigation, and judicial processes.",
    subjects: ["Civil Procedure Code (CPC)", "Code of Criminal Procedure (CrPC)", "Law of Evidence", "Property Law", "Professional Ethics"],
    roles: ["Trial Court Advocate", "Judicial Officer Candidates", "In-House Legal Advisor", "Public Prosecutor"]
  },
  {
    rank: 24,
    name: "Distance LL.B.",
    weight: 74,
    category: "Law",
    demand: "Moderate Demand",
    description: "An external or correspondence program designed for working professionals, executives, and academic researchers seeking legal education. Please note: correspondence law courses are often not recognized for direct court practice by national bar councils, but are highly valued for academic, corporate advisor, and policy-making purposes.",
    subjects: ["Jurisprudence & Legal Theory", "Labour & Industrial Relations", "Environmental Protection Rules", "Public International Law", "Alternative Dispute Resolution"],
    roles: ["Corporate Legal Advisor", "Non-Governmental Policy Consultant", "Legal Academician", "Contract Specialist"]
  },
  {
    rank: 25,
    name: "LL.D. (Doctor of Laws)",
    weight: 82,
    category: "Law",
    demand: "Niche / Emerging",
    description: "The highest postgraduate research degree in law, requiring candidates to make an original, substantial contribution to legal scholarship. Often pursued by senior academicians, seasoned jurists, and international policy formulators.",
    subjects: ["Advanced Jurisprudence Theory", "Global Legal System Comparison", "Constitutional Interpretation Research", "Public Policy Design & Impact", "Socio-Legal Research Methodology"],
    roles: ["Senior Law Professor", "Supreme Court Legal Scholar", "International Jurist", "Chief Legal Reform Commissioner"]
  },
  {
    rank: 26,
    name: "LL.M.",
    weight: 93,
    category: "Law",
    demand: "High Demand",
    description: "An advanced 1 to 2-year postgraduate program allowing law graduates to specialize deeply in fields like Corporate Law, Cyber Law, Criminal Law, or Constitutional Law. Combines advanced coursework with a research dissertation, preparing graduates for high-level research, academics, and litigation.",
    subjects: ["Research Methodology in Law", "Comparative Public Law", "Legal & Justice Systems", "Advanced Specialized Electives", "Master Thesis Dissertation"],
    roles: ["Specialist Legal Counsel", "Senior Arbitrator", "Judiciary Specialist", "Academic Law Lecturer"]
  },
  {
    rank: 27,
    name: "B.L.S. LL.B. (Bachelor of Legal Science & Bachelor of Law)",
    weight: 88,
    category: "Law",
    demand: "High Demand",
    description: "A unique integrated 5-year double-degree program where students are awarded a Bachelor of Legal Science after completing the first 3 years of basic socio-legal education, followed by a professional LLB. Highly popular in states like Maharashtra, specializing in legal science and analytical theory.",
    subjects: ["Logic & Legal Reasoning", "History of Courts & Legislature", "Socio-Legal Systems", "Jurisprudence", "Law of Evidence & Procedures"],
    roles: ["High Court Legal Counsel", "Legal Analyst", "Judiciary Officer", "Corporate Legal Executive"]
  },
  {
    rank: 28,
    name: "B.Tech LL.B.",
    weight: 87,
    category: "Law",
    demand: "Niche / Emerging",
    description: "A highly specialized integrated 6-year engineering and law program. Blends technology subjects (Computer Networks, Electrical Systems, Cybersecurity) with law courses, training graduates uniquely in technical patents, telecommunication legalities, cyber-defense legislation, and digital IP enforcement.",
    subjects: ["Intellectual Property & Patents", "Cybersecurity & Forensic Law", "Telecommunication Regulations", "Energy & Infrastructure Laws", "Tech Contract Drafting"],
    roles: ["Patent Litigation Specialist", "Technology Legal Counsel", "Cybercrime Prosecution Expert", "IP Asset Manager"]
  }
];
