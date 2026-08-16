export interface SpecializationInfo {
  name: string;
  weight: number;
  category: string;
  demand: string;
  description: string;
  subjects: string[];
  roles: string[];
  rank?: number;
  subCourses?: string[];
}

export const MANAGEMENT_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Marketing & Brand Management",
    weight: 94,
    category: "Management",
    demand: "Critical Demand",
    description: "Studies consumer behaviors, brand equity building, search engine marketing, product positioning, and omnichannel campaigns.",
    subjects: ["Digital Marketing", "Consumer Behavior", "Brand Positioning", "Market Analytics"],
    roles: ["Brand Manager", "Marketing Director", "Digital Strategist", "Market Researcher"]
  },
  {
    rank: 2,
    name: "Finance & Portfolio Management",
    weight: 95,
    category: "Management",
    demand: "Critical Demand",
    description: "Covers corporate valuation, asset allocations, capital budgeting, derivatives pricing, and modern investment banking structures.",
    subjects: ["Investment Banking", "Corporate Finance", "Portfolio Management", "Risk Valuation"],
    roles: ["Financial Analyst", "Investment Banker", "Fund Manager", "Treasury Specialist"]
  },
  {
    rank: 3,
    name: "Human Resource Management",
    weight: 91,
    category: "Management",
    demand: "High Demand",
    description: "Focuses on strategic talent acquisitions, compensation planning, organizational designs, labor code compliance, and HR analytics.",
    subjects: ["Talent Acquisition", "Compensation & Benefits", "Organizational Behavior", "Labor Law"],
    roles: ["HR Manager", "Talent Head", "Employee Relations Lead", "HR Business Partner"]
  },
  {
    rank: 4,
    name: "Operations & Supply Chain Management",
    weight: 88,
    category: "Management",
    demand: "High Demand",
    description: "Deals with process optimizations, logistics flow, global inventory control, materials scheduling, and Quality Assurance methodologies.",
    subjects: ["Logistics & Warehousing", "Operations Research", "Inventory Systems", "Six Sigma Quality"],
    roles: ["Supply Chain Analyst", "Operations Manager", "Logistics Head", "Procurement Lead"]
  },
  {
    rank: 5,
    name: "Healthcare & Hospital Management",
    weight: 85,
    category: "Management",
    demand: "High Demand",
    description: "Focused on administrative excellence in hospitals, healthcare quality standards, clinical service scheduling, and emergency logistics.",
    subjects: ["Hospital Administration", "Healthcare Quality Control", "Medical Law & Ethics", "Clinical Operations"],
    roles: ["Hospital Administrator", "Healthcare Quality Manager", "Medical Operations Head"]
  },
  {
    rank: 6,
    name: "International Business Strategy",
    weight: 86,
    category: "Management",
    demand: "Moderate Demand",
    description: "Analyzes international tariff codes, multinational joint ventures, cross-border currency hedges, and global market entry frameworks.",
    subjects: ["Global Trade Policies", "International Finance", "Cross-Border Mergers", "Global Supply Chain"],
    roles: ["International Trade Manager", "Global Business Consultant", "Export-Import Manager"]
  },
  {
    rank: 7,
    name: "Entrepreneurship & Startup Strategy",
    weight: 89,
    category: "Management",
    demand: "High Demand",
    description: "Provides incubation-level mastery of venture scaling, angel investment pitch decks, minimal viable product (MVP) design, and revenue scaling.",
    subjects: ["Venture Capital", "Business Model Design", "Product Development", "Growth Hacking"],
    roles: ["Startup Founder", "Venture Partner", "Business Incubator Lead", "Product Owner"]
  },
  {
    rank: 8,
    name: "Business Analytics & Data Intelligence",
    weight: 93,
    category: "Management",
    demand: "Critical Demand",
    description: "Translates big data streams into actionable corporate strategies, using data warehousing, statistical forecasting, and predictive modeling.",
    subjects: ["Python for Business Decisions", "Predictive Forecasting Models", "SQL & Enterprise Data Warehousing", "Interactive Data Visualizations (Tableau/BI)"],
    roles: ["Business Analytics Manager", "Data Strategy Consultant", "Enterprise Intelligence Analyst"]
  },
  {
    rank: 9,
    name: "Agri-Business Management",
    weight: 88,
    category: "Management",
    demand: "High Demand",
    description: "Focuses on supply chain logistics, agricultural commodity trading, cold chain infrastructure scaling, and food market regulations.",
    subjects: ["Agri-Food Marketing Strategy", "Agricultural Logistics & Cold Chains", "Commodity Risk Management", "Agro-Enterprise Financing"],
    roles: ["Agri-Business Manager", "Commodity Trader", "Farm Operations Director"]
  },
  {
    rank: 10,
    name: "FinTech, Blockchain & Digital Assets Management",
    weight: 96,
    category: "Management",
    demand: "Critical Demand",
    description: "Fuses algorithmic finance with blockchain architectures, decentralized banking models, crypto-economics, and international fintech policies.",
    subjects: ["Decentralized Finance (DeFi) Protocols", "Digital Asset Valuation", "Fintech Regulatory Sandboxes", "Algorithmic Risk Models"],
    roles: ["FinTech Product Lead", "Digital Asset Manager", "Decentralized Finance Strategist", "Crypto-Economic Policy Advisor"]
  },
  {
    rank: 11,
    name: "AI-Driven Product & Ecosystem Management",
    weight: 97,
    category: "Management",
    demand: "Critical Demand",
    description: "Mastery over the development life cycle of machine learning products, model monetization, pricing models, ethical governance, and tech-stack ecosystem scaling.",
    subjects: ["Productizing Large Language Models (LLMs)", "Data Valuation & Acquisition Strategies", "Ecosystem Pricing Architectures", "AI Ethics & Audit Controls"],
    roles: ["AI Product Manager", "Enterprise AI Strategist", "Technical Product Owner", "Ecosystem Solutions Director"]
  }
];

export const PARAMEDICAL_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Medical Laboratory Technology (MLT)",
    weight: 89,
    category: "Paramedical",
    demand: "High Demand",
    description: "Specialized analysis of clinical biofluids, diagnostic microbiological culturing, pathology reagents, and automated scanner controls. MLT professionals are essential in modern diagnostics, ensuring precision in disease identification, treatment monitoring, and preventative health screening. The role combines analytical chemistry, microbiology, and advanced laboratory instrumentation to provide critical clinical insights.",
    subjects: ["Clinical Biochemistry", "Hematology & Blood Banking", "Systemic Pathology", "Diagnostic Virology", "Laboratory Instrumentation", "Quality Assurance in Diagnostics"],
    roles: ["Lab Technologist", "Pathologist Associate", "Biofluid Analyst", "Quality Control Lab Chemist"]
  },
  {
    rank: 2,
    name: "Radiology & Medical Imaging Tech",
    weight: 92,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Clinical physics behind Computed Tomography (CT), Magnetic Resonance Imaging (MRI), ultrasound imaging, and X-ray emission protocols. Radiology technologists bridge the gap between patient care and clinical physics, operating sophisticated imaging equipment to visualize complex internal structures, aiding in the early detection and management of various pathological conditions. Focuses heavily on safety, diagnostic clarity, and image reconstruction techniques.",
    subjects: ["Radiological Physics", "MRI Positioning & Safety", "CT Scan Reconstruction", "Radiation Protection", "Ultrasound Diagnostic Imaging", "Advanced Image Processing"],
    roles: ["Radiological Technologist", "MRI Operator", "X-Ray Analyst", "Imaging Center Lead"]
  },
  {
    rank: 3,
    name: "Operation Theatre & Anaesthesia Tech",
    weight: 90,
    category: "Paramedical",
    demand: "High Demand",
    description: "Involves advanced surgical inventory preparations, strict sterilization validation protocols, maintenance of anaesthetic delivery systems, and real-time patient safety monitoring during complex surgical procedures. OT & Anaesthesia technologists act as the bridge between surgical and anaesthetic teams, ensuring a sterile, safe, and efficient environment for operative success.",
    subjects: ["Surgical Instrumentation & Handling", "Anaesthetic Pharmacology & Equipment", "Sterilization & Infection Control Standards", "Perioperative Patient Monitoring", "Operating Room Logistics"],
    roles: ["OT Technologist", "Anaesthesia Technician", "Surgical Operations Head", "Perioperative Support Specialist"]
  },
  {
    rank: 4,
    name: "Cardiovascular Perfusion Technology",
    weight: 87,
    category: "Paramedical",
    demand: "High Demand",
    description: "Specializes in the operation of heart-lung machines during complex cardiac and thoracic surgeries. Perfusionists are vital members of the surgical team, responsible for monitoring blood circulation, gas exchange, and pharmacological administration via extracorporeal circulation techniques. Requires deep knowledge of cardiopulmonary physiology and advanced life support instrumentation.",
    subjects: ["Cardiopulmonary Physiology", "Extracorporeal Circulation", "Perfusion Instrumentation & Safety", "Advanced Hemodynamics", "Cardiac Surgical Assist"],
    roles: ["Cardiovascular Perfusionist", "Extracorporeal Life Support Specialist", "Cardiac Surgical Tech"]
  },
  {
    rank: 5,
    name: "Renal Dialysis Technology",
    weight: 86,
    category: "Paramedical",
    demand: "High Demand",
    description: "Principles of hemodialysis and peritoneal dialysis, setting up vascular access, dialyzer fluid dynamics, and patient care management.",
    subjects: ["Hemodialysis Principles", "Vascular Access Care", "Dialysis Fluid Dynamics", "Nephrology Pathology"],
    roles: ["Dialysis Technician", "Renal Care Specialist", "Nephrology Associate"]
  },
  {
    rank: 6,
    name: "Optometry & Ophthalmic Technology",
    weight: 88,
    category: "Paramedical",
    demand: "High Demand",
    description: "Comprehensive eye examinations, clinical refractometry, contact lens prescribing, and ophthalmic diagnostics support.",
    subjects: ["Visual Optics", "Ocular Diseases", "Refraction Methods", "Contact Lens Practice"],
    roles: ["Clinical Optometrist", "Ophthalmic Technologist", "Contact Lens Specialist"]
  },
  {
    rank: 7,
    name: "Physiotherapy & Rehabilitation",
    weight: 91,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Restoring physical motion, managing orthopedic and sports trauma, neuro-rehabilitation exercises, and pain reduction strategies.",
    subjects: ["Kinesiology", "Exercise Therapy", "Electrotherapy Physics", "Orthopedic Rehab"],
    roles: ["Physiotherapist", "Rehab Advisor", "Sports Fitness Therapist"]
  },
  {
    rank: 8,
    name: "Occupational Therapy",
    weight: 84,
    category: "Paramedical",
    demand: "High Demand",
    description: "Rehabilitating developmental or traumatic limitations to enable patients to execute daily life activities independently.",
    subjects: ["Developmental Pediatrics Rehab", "Sensory Integration", "Assistive Devices Design", "Mental Health Rehab"],
    roles: ["Occupational Therapist", "Child Development Specialist", "Ergonomic Advisor"]
  },
  {
    rank: 9,
    name: "Critical Care & ICU Nursing",
    weight: 93,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Advanced nursing protocols for trauma centers, surgical intensive care units, cardiorespiratory monitoring, and invasive ventilators management.",
    subjects: ["Trauma Resuscitation", "Cardiorespiratory Monitoring Systems", "Intensive Care Pharmacology", "Emergency Code Management"],
    roles: ["Critical Care ICU Nurse", "Trauma Care Nurse Practitioner", "Clinical Nurse Educator"]
  },
  {
    rank: 10,
    name: "Telehealth & Remote Digital Care Administration",
    weight: 92,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Covers the management of remote patient monitoring software, telehealth diagnostics devices integration, digital health privacy regulations, and virtual clinic operations.",
    subjects: ["Remote Patient Monitoring Systems", "Digital Health Privacy Codes (HIPAA/GDPR)", "Virtual Diagnostics Integration", "Telehealth Clinic Workflows"],
    roles: ["Telehealth Operations Manager", "Digital Health Care Coordinator", "Remote Diagnostics Analyst"]
  },
  {
    rank: 11,
    name: "Molecular Diagnostics & Precision Lab Medicine",
    weight: 94,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Explores diagnostic DNA amplification techniques, gene sequencing laboratory protocols, molecular pathology analysis, and targeted biomarker discovery assays.",
    subjects: ["Quantitative PCR Diagnostics", "Next-Generation Sequencing Lab Workflows", "Molecular Oncology Biomarkers", "Diagnostic Reagent Assay Calibration"],
    roles: ["Molecular Diagnostic Lab Lead", "Genomic Sequencing Analyst", "Precision Medicine Laboratory Specialist"]
  }
];

export const ANIMATION_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "3D Animation & Asset Modeling",
    weight: 90,
    category: "Animation",
    demand: "High Demand",
    description: "Focuses on polygon topology, organic/hard-surface subdivision meshes, rigging skeletons, weight paints, and vertex deformation pipelines.",
    subjects: ["Organic Modeling", "Skeletal Rigging", "Vertex Weighting", "Cycles Rendering Engine"],
    roles: ["3D Character Modeler", "Rigging Artist", "3D Animator", "Technical DirectorMesh"]
  },
  {
    rank: 2,
    name: "Visual Effects (VFX) & Compositing",
    weight: 92,
    category: "Animation",
    demand: "Critical Demand",
    description: "Integrating CGI assets with live-action footages using chromakeying, rotoscoping, camera matching, and fluid/fire simulations.",
    subjects: ["Rotoscoping & Keying", "3D Camera Tracking", "Particle Dynamics Simulation", "Nuke Compositing"],
    roles: ["VFX Compositor", "Matchmove Artist", "Effects TD (Technical Director)", "Roto Artist"]
  },
  {
    rank: 3,
    name: "Game Design & Development",
    weight: 94,
    category: "Animation",
    demand: "Critical Demand",
    description: "Covers level design, gameplay scripting in Unreal/Unity engines, spatial user interaction, real-time lighting shaders, and audio triggers.",
    subjects: ["Unreal Engine Blueprinting", "Real-Time Shaders", "Level Layout Design", "Gameplay Logic Scripting"],
    roles: ["Level Designer", "Gameplay Scripter", "Technical Artist", "Game Environment Modeler"]
  },
  {
    rank: 4,
    name: "2D Character Animation & Storyboarding",
    weight: 85,
    category: "Animation",
    demand: "High Demand",
    description: "Classic hand-drawn keyframing principles, digital puppet rigging, camera pan pacing, and conceptual storyboard framing.",
    subjects: ["Classical Keyframing", "Puppet Rigging (ToonBoom)", "Anematic Assembly", "Visual Pacing"],
    roles: ["2D Animator", "Storyboard Artist", "Keyframe Illustrator", "Clean-up Artist"]
  },
  {
    rank: 5,
    name: "Motion Graphics & Broadcast Design",
    weight: 88,
    category: "Animation",
    demand: "High Demand",
    description: "Typography transitions, corporate product infographics, broadcast video packages, dynamic logo reveals, and kinetic text animations.",
    subjects: ["Kinetic Typography", "After Effects Expression Math", "Infographics Design", "Broadcast Branding"],
    roles: ["Motion Graphic Designer", "Broadcast Artist", "Creative Video Editor"]
  },
  {
    rank: 6,
    name: "Virtual Reality (VR) & Augmented Reality (AR) Design",
    weight: 95,
    category: "Animation",
    demand: "Critical Demand",
    description: "Immersive virtual experience modeling, real-time spatial user interfaces, mobile AR applications development, and digital spatial audio triggers.",
    subjects: ["AR/VR Spatial SDKs (Unity/Unreal)", "3D Spatial User Experience Design", "Holographic Prototyping", "Spatial Sound Engineering"],
    roles: ["AR/VR Developer", "Immersive Experience Designer", "Spatial UX Artist"]
  },
  {
    rank: 7,
    name: "Virtual Reality & Metaverse Worldbuilding",
    weight: 93,
    category: "Animation",
    demand: "High Demand",
    description: "Specializes in developing vast interactive virtual universes, real-time avatar kinematics, spatial architecture design, and virtual economy logistics.",
    subjects: ["Procedural World Generation", "Avatar Kinematics & Rigging", "Virtual Spatial Architecture", "Metaverse Economy Mechanics"],
    roles: ["Metaverse World Architect", "VR Environmental Artist", "Real-time Spatial Designer"]
  },
  {
    rank: 8,
    name: "Generative AI Artistry & Neural Rendering",
    weight: 96,
    category: "Animation",
    demand: "Critical Demand",
    description: "Leverages diffusion models, neural radiance fields (NeRFs), and deep generative pipelines to output real-time high-fidelity 3D assets, textures, and digital animations.",
    subjects: ["Neural Radiance Fields (NeRFs)", "Diffusion Models for Asset Gen", "Latent Space Image Synthesis", "Interactive Prompts & ControlNet Pipelines"],
    roles: ["Generative AI Tech Artist", "Neural Rendering Engineer", "AI Texture and Matte Designer"]
  },
  {
    rank: 9,
    name: "2D Animation & Storyboarding",
    category: "Animation",
    weight: 85,
    demand: "High Demand",
    description: "Focuses on traditional hand-drawn techniques, digital 2D animation, storyboarding for films, and character movement principles.",
    subjects: ["Hand-drawn Animation", "Storyboard Logic", "Digital Vector Animation", "Character Motion Principles"],
    roles: ["2D Animator", "Storyboard Artist", "Concept Designer"]
  },
  {
    rank: 10,
    name: "3D Modeling & Digital Sculpting",
    category: "Animation",
    weight: 88,
    demand: "High Demand",
    description: "High-end digital sculpting, hard-surface modeling, organic character creation, and UV unwrapping for high-resolution assets.",
    subjects: ["Organic Sculpting", "Hard Surface Modeling", "Texturing & Shading", "UV Mapping Theory"],
    roles: ["3D Modeler", "Environment Artist", "Character Sculptor"]
  }
];

export const PHARMACY_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Pharmaceutics & Drug Delivery",
    weight: 95,
    category: "Pharmacy",
    demand: "Critical Demand",
    description: "The physics and engineering of drug release models, micro-encapsulations, targeted nanoparticle deliveries, and tablet coating chemistry.",
    subjects: ["Biopharmaceutics", "Controlled Drug Delivery", "Industrial Unit Ops", "Dosage Form Engineering"],
    roles: ["Formulation Scientist", "Industrial Pharmacist", "Drug Development Expert"]
  },
  {
    rank: 2,
    name: "Pharmacology & Toxicology",
    weight: 93,
    category: "Pharmacy",
    demand: "Critical Demand",
    description: "Analyses of drug interactions with biological receptors, pharmacokinetics (ADME profiling), molecular pathways, and safety indexes.",
    subjects: ["Receptor Dynamics", "Pharmacokinetics (ADME)", "Toxicological Bioassays", "Neuro-Pharmacology"],
    roles: ["Pharmacologist Researcher", "Toxicology Consultant", "Pre-clinical Assay Lead"]
  },
  {
    rank: 3,
    name: "Pharmaceutical Chemistry",
    weight: 91,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Organic synthesis of active pharmaceutical ingredients (APIs), molecular docking, structure-activity relationship (SAR) modeling, and mass spectrometry.",
    subjects: ["Medicinal Synthesis", "Molecular Docking & SAR", "Instrumental Analysis", "Spectroscopic Verification"],
    roles: ["Medicinal Chemist", "API Synthesis Lead", "Analytical Lab Chemist"]
  },
  {
    rank: 4,
    name: "Clinical & Hospital Pharmacy",
    weight: 88,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Patient medication scheduling, critical drug-drug interaction audits, clinical trials management, and bedside pharmaceutical assistance.",
    subjects: ["Medication Management", "Pharmacotherapy Protocols", "Clinical Trials Phase I-IV", "Pharmacovigilance"],
    roles: ["Clinical Pharmacist", "Hospital Pharmacy Head", "Pharmacovigilance Officer"]
  },
  {
    rank: 5,
    name: "Pharmaceutical Quality Assurance",
    weight: 90,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Regulatory documentation for drug approvals (FDA/MHRA/ICH guidelines), GMP audit practices, and analytical validation protocols.",
    subjects: ["ICH Validation Guidelines", "Good Manufacturing Practices (GMP)", "Analytical Chem Validation", "Regulatory Affairs Dossiers"],
    roles: ["QA Manager", "Regulatory Affairs Executive", "Validation Scientist"]
  },
  {
    rank: 6,
    name: "Pharmacognosy, Phytochemistry & Herbal Drugs",
    weight: 88,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Analysis of botanical raw materials, extraction of organic active ingredients, standardization of herbal formulations, and plant biotechnology.",
    subjects: ["Herbal Extraction Chemistry", "Standardization of Botanicals", "Secondary Plant Metabolites", "Plant Tissue Culture Diagnostics"],
    roles: ["Herbal Formulation Scientist", "Natural Drug Chemist", "Botanicals Regulatory Advisor"]
  },
  {
    rank: 7,
    name: "Pharmacogenomics & Precision Therapy",
    weight: 94,
    category: "Pharmacy",
    demand: "Critical Demand",
    description: "Investigates the genetic basis of drug response variability, design of customized gene-specific dosing schedules, and patient-specific pharmacotherapy profiles.",
    subjects: ["Genomic Polymorphism Profiles", "Custom Pharmacogenetic Dosing", "Molecular Biomarkers Mapping", "Genetics-based Toxicology"],
    roles: ["Pharmacogenomics Consultant", "Precision Pharmacotherapy Analyst", "Clinical Genomics Specialist"]
  },
  {
    rank: 8,
    name: "Computational Drug Design & AI Therapeutics",
    weight: 96,
    category: "Pharmacy",
    demand: "Critical Demand",
    description: "Applies machine learning models, quantum chemistry simulations, virtual screening pipelines, and automatic lead molecular optimization algorithms to fast-track drug discovery.",
    subjects: ["Machine Learning for Lead Discovery", "Quantum Molecular Chemistry", "Virtual High-Throughput Screening", "Automatic Synthesis Layouts"],
    roles: ["Computational Pharmacist", "AI Therapeutics Scientist", "In Silico Screening Lead"]
  }
];

export const MASS_COMM_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Journalism & Investigative Reporting",
    weight: 88,
    category: "Mass Communication",
    demand: "High Demand",
    description: "Multi-platform news gathering, investigative interview techniques, field reporting under pressure, and ethical verification structures.",
    subjects: ["Investigative Reporting", "Digital News Gathering", "Broadcast Anchoring", "Media Law & Ethics"],
    roles: ["News Correspondent", "Investigative Journalist", "Broadcast Producer", "News Editor"]
  },
  {
    rank: 2,
    name: "Public Relations & Corporate Comm",
    weight: 90,
    category: "Mass Communication",
    demand: "High Demand",
    description: "Managing brand reputation, drafting crisis communication strategies, organizing media briefs, and establishing relations with journalists.",
    subjects: ["Crisis Communication", "Brand Rhetoric", "Media Liaison Strategies", "Corporate Writing"],
    roles: ["PR Specialist", "Corporate Communications Head", "Media Relations Manager"]
  },
  {
    rank: 3,
    name: "Advertising & Brand Strategy",
    weight: 92,
    category: "Mass Communication",
    demand: "Critical Demand",
    description: "Covers consumer psychology, planning commercial print/video/digital briefs, budget bidding, and target demographic research.",
    subjects: ["Consumer Psychology", "Ad Copywriting", "Media Planning & Bidding", "Creative Campaign Pitching"],
    roles: ["Creative Director", "Ad Copywriter", "Media Buyer & Planner", "Account Strategist"]
  },
  {
    rank: 4,
    name: "Digital Media & Content Creation",
    weight: 94,
    category: "Mass Communication",
    demand: "Critical Demand",
    description: "Explores SEO algorithms, analytics interfaces, podcast engineering, viral short-form videography, and social community scaling.",
    subjects: ["Search Engine Optimization", "Podcast & Audio Production", "Analytics Interpretation", "Social Engine Algorithms"],
    roles: ["Social Content Strategist", "SEO Editor", "Digital Community Specialist", "Podcast Producer"]
  },
  {
    rank: 5,
    name: "Film Making, Direction & Production",
    weight: 89,
    category: "Mass Communication",
    demand: "High Demand",
    description: "Technical camera operations, cinematography color palettes, spatial three-point lighting setups, sound mixing, and film assembly.",
    subjects: ["Cinematography Controls", "Script Screenplay Layout", "Creative Film Editing", "Sound Design & Scoring"],
    roles: ["Film Director", "Director of Photography", "Post-Production Editor", "Film Producer"]
  },
  {
    rank: 6,
    name: "Photojournalism & Documentary Filmmaking",
    weight: 89,
    category: "Mass Communication",
    demand: "High Demand",
    description: "Teaches rapid crime scene, event, and wildlife photography under extreme conditions, paired with documentary film direction, storytelling, and editing.",
    subjects: ["Visual Storytelling Dynamics", "Camera Lens Mechanics", "Documentary Script & Design", "Professional Image/Video Grading"],
    roles: ["Photojournalist", "Documentary Cinematographer", "Visual Editor", "Media Content Coder"]
  },
  {
    rank: 7,
    name: "Podcast Production & Audio Journalism",
    weight: 86,
    category: "Mass Communication",
    demand: "High Demand",
    description: "Focuses on professional vocal production, podcast hosting, sound editing in Digital Audio Workstations (DAW), and long-form conversational pacing.",
    subjects: ["Sound Wave Engineering", "Vocal Performance & Delivery", "Audio Scripting & Storyboards", "Audio Platform Distribution Models"],
    roles: ["Podcast Producer", "Audio Journalist", "Radio Host & Presenter"]
  },
  {
    rank: 8,
    name: "Algorithmic Content Strategy & Digital Influence",
    weight: 95,
    category: "Mass Communication",
    demand: "Critical Demand",
    description: "Designs audience retention algorithms models, viral distribution patterns, multi-channel platform content pipelines, and AI-powered audience telemetry tracking.",
    subjects: ["Audience Retention Analytics", "Viral Growth Mechanics", "Cross-Platform Pipeline Management", "AI Audience Telemetry Tracking"],
    roles: ["Content Strategy Director", "Digital Audience Growth Expert", "Algorithmic Campaign Planner"]
  },
  {
    rank: 9,
    name: "AI Journalism & Immersive Storytelling",
    weight: 92,
    category: "Mass Communication",
    demand: "Critical Demand",
    description: "Integrates AI-assisted natural language generation tools, multi-media deep-fakes verification databases, interactive AR data visualizations, and automated newsfeeds customization.",
    subjects: ["Natural Language News Generators", "Deep-Fake Verification Protocols", "Interactive Data Visualizations", "Automated Syndication Networks"],
    roles: ["Immersive News Producer", "AI Editorial Systems Manager", "Digital Storytelling Architect"]
  }
];

export const HOTEL_MGT_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Culinary Arts & Food Production",
    weight: 93,
    category: "Hotel Management",
    demand: "Critical Demand",
    description: "Mastery of professional kitchens, classic gastrotechnomy methods, food preservation biochemistry, pastry engineering, and restaurant safety.",
    subjects: ["Classic Gastronomy", "Pastry & Baking Sciences", "Kitchen Safety Codes", "Food Biochemistry"],
    roles: ["Sous Chef", "Pastry Chef", "Culinary Operations Executive", "Head Chef"]
  },
  {
    rank: 2,
    name: "Front Office Operations & Relations",
    weight: 86,
    category: "Hotel Management",
    demand: "High Demand",
    description: "Hotel property management systems (PMS), customer relationship indices, room inventory pricing, and hospitality hospitality.",
    subjects: ["Property Management Software (PMS)", "Revenue Optimization Pricing", "Guest Profiling Systems", "Guest Relations Codes"],
    roles: ["Front Desk Manager", "Guest Relations Officer", "Hotel Night Auditor"]
  },
  {
    rank: 3,
    name: "Food & Beverage Service Management",
    weight: 88,
    category: "Hotel Management",
    demand: "High Demand",
    description: "High-end banquet operations, mixology dynamics, wine tasting curation, cellar management, and restaurant revenue calculations.",
    subjects: ["Banquet Logistical Operations", "Mixology & Beverage Dynamics", "Fine Dining Protocols", "Beverage Pricing Control"],
    roles: ["F&B Service Manager", "Banquet Event Planner", "Head Sommelier"]
  },
  {
    rank: 4,
    name: "Travel, Tourism & Hospitality Mgt",
    weight: 90,
    category: "Hotel Management",
    demand: "High Demand",
    description: "Curation of travel packages, operations of destination resorts, eco-tourism policies, and event logistics management.",
    subjects: ["Destination Marketing", "Ecotourism Protocols", "Corporate Event Sourcing", "Tourism Economy Analytics"],
    roles: ["Tourism Consultant", "Resort Operations Lead", "Event Manager Coordinator"]
  },
  {
    rank: 5,
    name: "Event Management & MICE Operations",
    weight: 89,
    category: "Hotel Management",
    demand: "High Demand",
    description: "Covers corporate event planning, Meetings, Incentives, Conferences, and Exhibitions (MICE) logistics, budgeting, and client relationship management.",
    subjects: ["Corporate Event Logistics", "MICE Marketing & Sourcing", "Banquet Budgeting Methods", "Vendor & Sponsorship Relations"],
    roles: ["Event Operations Planner", "MICE Manager Coordinator", "Convention Services Executive"]
  },
  {
    rank: 6,
    name: "Smart Hospitality Operations & IoT Integration",
    weight: 91,
    category: "Hotel Management",
    demand: "High Demand",
    description: "Integrates smart property controls, internet-of-things (IoT) environmental systems, biometric guest verification locks, and automatic energy-saving rooms.",
    subjects: ["Smart Hotel IoT System Architectures", "Biometric Room Access Controls", "Automated Resource Allocations", "Hotel Operational Telemetry Analytics"],
    roles: ["Hospitality Technology Director", "Smart Systems Integrator", "Hotel Infrastructure Manager"]
  },
  {
    rank: 7,
    name: "Sustainable Eco-Tourism & Carbon-Neutral Hospitality",
    weight: 93,
    category: "Hotel Management",
    demand: "Critical Demand",
    description: "Manages eco-friendly properties, food waste anaerobic digesting systems, circular greywater treatment loops, and carbon-offset certification programs.",
    subjects: ["Zero-Waste Food Operations", "Circular Water Treatment Systems", "Ecotourism Landscaping Codes", "Carbon-Offset Audit Protocols"],
    roles: ["Eco-Resort Operations Manager", "Hospitality Sustainability Consultant", "Carbon-Neutral Policy Auditor"]
  }
];

export const AVIATION_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Aviation Operations & Management",
    weight: 88,
    category: "Aviation",
    demand: "High Demand",
    description: "Managing airport terminals, scheduling airline slots, check-in operations logistics, and handling civil aviation regulatory policies.",
    subjects: ["Airport Terminal Operations", "Airline Scheduling Science", "Civil Aviation Laws", "Baggage Ingress Systems"],
    roles: ["Airport Duty Manager", "Airlines Terminal Lead", "Aviation Operations Planner"]
  },
  {
    rank: 2,
    name: "Commercial Pilot Operations & Flight",
    weight: 95,
    category: "Aviation",
    demand: "Critical Demand",
    description: "Prepares candidates with structural understanding of flight aerodynamics, radio navigation signals, turbine engine layouts, and instrument ratings.",
    subjects: ["Flight Aerodynamics Theory", "Radio Signals & Navigation", "Turbine Engine Engineering", "Meteorological Interpretations"],
    roles: ["Airline First Officer", "Commercial Captain Candidate", "Flight Operations Officer"]
  },
  {
    rank: 3,
    name: "Air Traffic Control & Airport Safety",
    weight: 90,
    category: "Aviation",
    demand: "Critical Demand",
    description: "High-stress terminal control simulations, runway operations protocol, safety backup systems, and radar guidance operations.",
    subjects: ["Radar Vectoring Procedures", "Emergency Landing Controls", "Runway Ingress Regulations", "ATC Telecommunication"],
    roles: ["Air Traffic Controller", "Airport Safety Inspector", "ATC Radar Coordinator"]
  },
  {
    rank: 4,
    name: "Avionics & Flight Maintenance",
    weight: 87,
    category: "Aviation",
    demand: "High Demand",
    description: "Diagnostic procedures for aircraft digital cockpit displays, autopilot computer boards, landing gear hydraulics, and fuselage inspections.",
    subjects: ["Cockpit Digital Systems", "Autopilot Circuit Diagnostics", "Hydraulic Flight Actuators", "Maintenance Log Regulations"],
    roles: ["Avionics Engineer", "Aircraft Safety Maintenance Head", "Aero Technician Inspector"]
  },
  {
    rank: 5,
    name: "Autonomous Drone Fleet & eVTOL Management",
    weight: 94,
    category: "Aviation",
    demand: "Critical Demand",
    description: "Designs flight pathways for electric vertical takeoff and landing (eVTOL) air taxis, automated urban drone delivery logistics, and remote pilot operations protocols.",
    subjects: ["eVTOL Flight Mechanics", "Urban Airspace Geofencing", "Multi-UAV Routing Algorithms", "Autonomous Aircraft Safety Systems"],
    roles: ["Drone Fleet Systems Architect", "Urban Mobility Airspace Planner", "eVTOL Flight Operations Supervisor"]
  },
  {
    rank: 6,
    name: "Space Tourism Operations & Commercial Spaceflight Admin",
    weight: 95,
    category: "Aviation",
    demand: "Critical Demand",
    description: "Analyzes private spaceports logistics, suborbital spacecraft trajectory schedules, commercial astronaut safety protocols, and space insurance regulations.",
    subjects: ["Suborbital Trajectory Flight Mechanics", "Commercial Astronaut Safety Codes", "Spaceport Launch Ingress Logistics", "International Space Treaties & Laws"],
    roles: ["Commercial Spaceflight Operations Lead", "Space Tourism Program Coordinator", "Aero-Space Transport Administrator"]
  }
];

export const DESIGN_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Fashion & Apparel Design",
    weight: 92,
    category: "Design",
    demand: "Critical Demand",
    description: "Pattern-making layout math, garment sewing architecture, fabric draping, textile chemistry, and digital portfolio styling.",
    subjects: ["Pattern Layout Calculus", "Textile Chemistry Fibers", "Creative Draping", "Digital Portfolio Design"],
    roles: ["Fashion Designer", "Apparel Stylist", "Textile Visualizer", "Apparel Brand Lead"]
  },
  {
    rank: 2,
    name: "Interior & Spatial Design",
    weight: 91,
    category: "Design",
    demand: "High Demand",
    description: "3D CAD modeling of physical spaces, lighting ergonomics, interior material acoustics, furniture designs, and blueprints layout.",
    subjects: ["Spatial Acoustics & Lighting", "3D CAD Interior Blueprint", "Material Texture Studies", "Ergonomic Floor Layout"],
    roles: ["Interior Designer", "Furniture Stylist", "Space Exhibit Designer", "CAD Spatial Designer"]
  },
  {
    rank: 3,
    name: "UI/UX & Interactive Design",
    weight: 96,
    category: "Design",
    demand: "Critical Demand",
    description: "Wireframing user-journeys, high-fidelity Figma layouts, interactive motion prototypes, usability heatmaps, and design token pipelines.",
    subjects: ["High-Fidelity Wireframing", "Usability Heatmaps & Tests", "Interaction Prototype Flows", "Design Tokens Pipeline"],
    roles: ["UI/UX Designer", "Product UI Strategist", "Interaction Designer", "Usability Analyst"]
  },
  {
    rank: 4,
    name: "Graphic & Communication Design",
    weight: 93,
    category: "Design",
    demand: "Critical Demand",
    description: "Typography kerning, visual hierarchy composition, corporate branding identity packages, and illustration vectors creation.",
    subjects: ["Typography Kerning Math", "Visual Hierarchy Layout", "Branding Identity Packages", "Vector Illustration Design"],
    roles: ["Lead Graphic Designer", "Brand Visual Identity Artist", "Creative Illustrator"]
  },
  {
    rank: 5,
    name: "HCI (Human-Computer Interaction) & Spatial UI/UX",
    weight: 96,
    category: "Design",
    demand: "Critical Demand",
    description: "Studies the cognitive science behind spatial interfaces, virtual/augmented reality UI patterns, voice-activated user inputs, and accessibility protocols.",
    subjects: ["Spatial Design Interfaces", "Eye-Tracking & Gestural Navigation", "Voice UX & Conversation Trees", "Cognitive Usability Frameworks"],
    roles: ["Spatial UI/UX Designer", "HCI Usability Specialist", "Immersive Experience Prototyper"]
  },
  {
    rank: 6,
    name: "Computational Fashion & Smart Wearables",
    weight: 91,
    category: "Design",
    demand: "High Demand",
    description: "Applies 3D garment simulation mathematics, algorithmically generated textile weaves, smart sensor thread integrations, and customizable garment designs.",
    subjects: ["3D Clothing Simulation Algorithms", "Algorithmic Weave Structures", "Interactive Wearable Micro-Sensors", "Adaptive Pattern Calculus"],
    roles: ["Computational Fashion Tech Designer", "Smart Materials Product Specialist", "Interactive Textile Engineer"]
  }
];

export const ARCHITECTURE_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "General Architectural Design",
    weight: 94,
    category: "Architecture",
    demand: "Critical Demand",
    description: "Structural load calculations, architectural drafting (CAD/BIM), environmental facade dynamics, and building materials performance.",
    subjects: ["Structural Load Calculations", "BIM & CAD Revit Drafting", "Facade Heat Transfer", "Material Durability Studies"],
    roles: ["Principal Architect", "BIM Technical Lead", "Architectural Drafter"]
  },
  {
    rank: 2,
    name: "Urban Planning & Regional Development",
    weight: 91,
    category: "Architecture",
    demand: "High Demand",
    description: "Socio-spatial layout of smart cities, zoning policy rules, transit-oriented development patterns, and environmental impact assessments.",
    subjects: ["Smart City Geomatics", "Transit-Oriented Design", "Municipal Zoning Policies", "Environmental Impact Studies"],
    roles: ["Urban Planner", "Zoning Consultant", "Smart City Architect", "City Development Head"]
  },
  {
    rank: 3,
    name: "Sustainable & Green Architecture",
    weight: 93,
    category: "Architecture",
    demand: "Critical Demand",
    description: "Solar path building orientation, carbon footprint estimation, water recycling layouts, LEED/IGBC rating compliance validation.",
    subjects: ["Solar Path Orientation", "Life-Cycle Carbon Auditing", "LEED Certification Math", "Passive HVAC Ventilation"],
    roles: ["Green Building Consultant", "LEED Certification Analyst", "Eco-Architectural Consultant"]
  },
  {
    rank: 4,
    name: "Parametric Design & Computational Urbanism",
    weight: 95,
    category: "Architecture",
    demand: "Critical Demand",
    description: "Leverages algorithmic geometric generation, parametric models, adaptive facades optimization, and computational city-level zoning frameworks.",
    subjects: ["Parametric Modeling Algorithms (Grasshopper)", "Procedural Structural Engineering", "Computational Zoning Simulations", "Adaptive Facade Actuators"],
    roles: ["Parametric Design Specialist", "Computational Urban Planner", "BIM Automation Engineer"]
  },
  {
    rank: 5,
    name: "Regenerative Architecture & Closed-Loop Building",
    weight: 92,
    category: "Architecture",
    demand: "High Demand",
    description: "Architectural designs focusing on net-positive energy, living organism facade integration (algae bio-reactors), and structural material circularity.",
    subjects: ["Bio-Receptive Building Facades", "Net-Positive Energy Modeling", "Closed-Loop Material Sourcing", "Ecosystem Restoration Designs"],
    roles: ["Regenerative Systems Architect", "Circular Building Consultant", "Biophilic Design Consultant"]
  }
];

export const NATIONAL_COURSES_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [];

export const VOCATIONAL_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Software Development & App Design",
    weight: 92,
    category: "Vocational",
    demand: "Critical Demand",
    description: "Hands-on application coding, SQL database layouts, Git version operations, and industrial testing operations.",
    subjects: ["App Development & Scripting", "Database Schemas & SQL", "Git Version Control", "Software Quality Testing"],
    roles: ["Junior Software Developer", "Technical Support Associate", "Web Designer Technician"]
  },
  {
    rank: 2,
    name: "Automobile Technology & Maintenance",
    weight: 87,
    category: "Vocational",
    demand: "High Demand",
    description: "Practical troubleshooting of combustion engines, vehicle electrical boards, hybrid car systems, and wheel balancing.",
    subjects: ["Combustion Diagnostics", "Vehicle Electrical Circuits", "Hybrid Powertrains Upkeep", "Braking & Steering Diagnostics"],
    roles: ["Automobile Service Head", "Powertrain Technician", "Fleet Maintenance Supervisor"]
  },
  {
    rank: 3,
    name: "Food Processing & Quality Control",
    weight: 88,
    category: "Vocational",
    demand: "High Demand",
    description: "Industrial baking workflows, vacuum packaging setups, food safety hazard critical control points (HACCP), and chemical preservation.",
    subjects: ["Baking & Canning Workflows", "HACCP Safety Verification", "Packaging Preservation Sciences", "Raw Material Chemical Audits"],
    roles: ["Food Preservation Specialist", "Food QA Lead Technician", "Processing Line Lead"]
  },
  {
    rank: 4,
    name: "Renewable Energy Tech & Solar Installation",
    weight: 92,
    category: "Vocational",
    demand: "Critical Demand",
    description: "Covers physical solar panel assembly layouts, battery charging circuits calibration, rooftop installation standards, and micro-grid power configurations.",
    subjects: ["Photovoltaics Cell Science", "Battery Charging Systems Maintenance", "Rooftop Integration Calculations", "Micro-Grid Power Troubleshooting"],
    roles: ["Solar Array Installation Lead", "Renewable Energy Field Auditor", "Clean Energy Service Technician"]
  },
  {
    rank: 5,
    name: "Additive Manufacturing & 3D Printing Tech",
    weight: 90,
    category: "Vocational",
    demand: "High Demand",
    description: "Hands-on calibration of industrial 3D printing systems, filament and resin selection chemistry, model slicing software setups, and post-processing quality standards.",
    subjects: ["3D Printing Slicing Software (Cura)", "Polymer & Metal Filament Chemistry", "Printbed Calibration & Levelling", "Post-Processing Sanding & Curing"],
    roles: ["3D Printing System Technician", "Additive Manufacturing Specialist", "Rapid Prototyping Lead"]
  },
  {
    rank: 6,
    name: "Precision CNC Machining & CAD/CAM Operations",
    weight: 88,
    category: "Vocational",
    demand: "High Demand",
    description: "Practical setup of multi-axis computer numerical control (CNC) lathes and mills, manual G-code programming, CAM blueprinting, and metal fabrication tolerance checking.",
    subjects: ["CNC Lathe & Mill Operation Protocols", "G-Code & M-Code Programming", "CAM Toolpath Calculations", "Precision Calibrations & Micrometer Audits"],
    roles: ["CNC Machinist Operator", "CAM Tooling Technician", "Precision Metal Fabricator"]
  },
  {
    rank: 7,
    name: "Digital Marketing & E-Commerce Operations",
    weight: 89,
    category: "Vocational",
    demand: "High Demand",
    description: "Covers multi-channel digital strategy, social media campaign execution, e-commerce storefront management (Shopify/Magento), customer data platforms (CDPs), CRM integration (Salesforce/HubSpot), SEO/SEM audit tools (Ahrefs/SEMrush), and advanced online conversion tracking using Google Analytics 4 (GA4) and Tag Manager.",
    subjects: ["Social Media Campaign Execution", "E-Commerce Platform Architecture", "Customer Data Platforms (CDPs)", "CRM & Marketing Automation", "SEO/SEM Strategy & Analytics", "Conversion Rate Optimization (CRO)"],
    roles: ["Digital Marketing Coordinator", "E-Commerce Operations Specialist", "Online Growth Technician", "Performance Marketing Analyst"]
  },
  {
    rank: 8,
    name: "Graphic Design & Digital Publishing",
    weight: 87,
    category: "Vocational",
    demand: "High Demand",
    description: "Focuses on vector design tools, layout for digital media, infographic generation, and print publishing preparation.",
    subjects: ["Vector Graphics Design", "Digital Publishing Layout", "Infographic Visualization", "Print Preparation Standards"],
    roles: ["Graphic Design Assistant", "Digital Publishing Technician", "Visual Content Creator"]
  },
  {
    rank: 9,
    name: "Automotive Servicing & Advanced Diagnostic Tech",
    weight: 88,
    category: "Vocational",
    demand: "High Demand",
    description: "Covers engine management systems, OBD-II diagnostics, vehicle electronics, and hybrid powertrain servicing.",
    subjects: ["Engine Management Systems", "OBD-II Diagnostic Procedures", "Vehicle Electronics & Sensors", "Hybrid Powertrain Servicing"],
    roles: ["Automotive Diagnostic Technician", "Vehicle Electronics Specialist", "Service Center Foreman"]
  },
  {
    rank: 10,
    name: "Renewable Energy Systems Installation",
    weight: 90,
    category: "Vocational",
    demand: "High Demand",
    description: "Comprehensive training in solar PV installation, wind turbine maintenance, grid-tie inverter configuration, battery management systems (BMS), and home energy storage setup. Focuses on compliance with NEC (National Electrical Code) and energy auditing best practices.",
    subjects: ["Solar PV System Design & Installation", "Grid-Tie Inverter Configuration", "Battery Management Systems (BMS)", "Wind Turbine Maintenance Basics", "Energy Auditing & NEC Compliance"],
    roles: ["Renewable Energy Technician", "Solar Installer", "Energy Systems Maintenance Specialist", "Grid-Tie Consultant"]
  }
];

export const DENTAL_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Oral & Maxillofacial Surgery",
    weight: 95,
    category: "Dental",
    demand: "Critical Demand",
    description: "Advanced surgical procedures for facial trauma, cleft lip reconstruction, dental implant bone grafts, and extraction of impacted teeth.",
    subjects: ["Facial Skeletal Reconstruction", "Advanced Bone Grafts Procedures", "Surgical Extractions", "Anaesthesia in Dentistry"],
    roles: ["Maxillofacial Surgeon", "Oral Surgery Specialist", "Dental Clinical Consultant"]
  },
  {
    rank: 2,
    name: "Orthodontics & Dentofacial Orthopedics",
    weight: 94,
    category: "Dental",
    demand: "Critical Demand",
    description: "Correcting tooth misalignment and jaws, applying physical braces, aligners CAD systems, and jaw skeletal growth guidance.",
    subjects: ["Biomechanics of Braces", "Aligner CAD Configurations", "Cephalometric Analysis", "Skeletal Growth Cues"],
    roles: ["Orthodontist Specialist", "Dental Aligners Advisor", "Clinical Dentistry Lead"]
  },
  {
    rank: 3,
    name: "Conservative Dentistry & Endodontics",
    weight: 92,
    category: "Dental",
    demand: "Critical Demand",
    description: "Root canal therapy (RCT) procedures under microscopes, tooth-colored cosmetic restorations, and crown prep work.",
    subjects: ["Microscopic Endodontics (RCT)", "Tooth Cosmetic Composite Resins", "Apexification & Vital Pulp", "Structural Crown Prep"],
    roles: ["Endodontist Specialist", "Cosmetic Dental Consultant", "Root Canal Expert"]
  },
  {
    rank: 4,
    name: "Pediatric & Preventive Dentistry",
    weight: 91,
    category: "Dental",
    demand: "High Demand",
    description: "Child psychology during dental surgery procedures, developmental growth monitoring, fluoride therapies, and pediatric endodontic care.",
    subjects: ["Pediatric Dental Psychology", "Skeletal Development Monitoring", "Preventive Sealant Therapies", "Pedodontic Pulpotomy Procedures"],
    roles: ["Pediatric Dentist Specialist", "Preventive Dental Advisor", "School Oral Health Consultant"]
  },
  {
    rank: 5,
    name: "Periodontology & Implantology",
    weight: 93,
    category: "Dental",
    demand: "Critical Demand",
    description: "Advanced diagnostic scales for periodontal tissue diseases, gum soft-tissue laser surgeries, bone grafts, and titanium implant fixtures placement.",
    subjects: ["Periodontal Pathology Audits", "Soft-Tissue Laser Surgeries", "Titanium Dental Implant Mechanics", "Tissue Regenerative Bone Grafts"],
    roles: ["Periodontist Specialist", "Dental Implantologist Surgeon", "Laser Periodontics Expert"]
  },
  {
    rank: 6,
    name: "Teledentistry & Digital Orthodontics Systems",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Integrates remote dental monitoring, digital orthodontic aligners fabrication pipelines, and remote intraoral scanner imaging data workflows.",
    subjects: ["Intraoral Digital Scanning Workflows", "Remote Aligner Tele-Monitoring", "3D Dental Skeletal Diagnostics", "Teledentistry Practice Protocols"],
    roles: ["Digital Orthodontics Specialist", "Teledentistry Operations Lead", "Dental Tech Systems Integrator"]
  },
  {
    rank: 7,
    name: "3D Biomaterial Printing & Dental Implantology",
    weight: 92,
    category: "Dental",
    demand: "Critical Demand",
    description: "Leverages bio-compatible 3D printers, tooth bone grafts scaffolds, custom crown sintering, and customized guided-surgery dental implants fabrication.",
    subjects: ["Bio-Compatible Printing Polymers", "Scaffold Grafting Calculations", "Digital Sintering Oven Workflows", "Guided-Surgery Template Design"],
    roles: ["Dental Biomaterial Specialist", "Guided-Surgery CAD Designer", "Advanced Prosthetic Lab Lead"]
  },
  {
    rank: 8,
    name: "Oral Pathology & Microbiology",
    category: "Dental",
    weight: 89,
    demand: "High Demand",
    description: "Study of the causes and effects of diseases affecting the oral and maxillofacial regions, including microscopic analysis of biopsies.",
    subjects: ["Histopathology", "Microbiology", "Oral Oncology", "Diagnostic Imaging"],
    roles: ["Oral Pathologist", "Diagnostic Consultant", "Academic Researcher"]
  },
  {
    rank: 9,
    name: "Public Health Dentistry",
    category: "Dental",
    weight: 87,
    demand: "High Demand",
    description: "Focuses on community-wide oral health promotion, dental epidemiology, and the development of public health policies.",
    subjects: ["Epidemiology", "Community Health", "Dental Statistics", "Health Policy"],
    roles: ["Public Health Dentist", "Policy Advisor", "Health Program Manager"]
  }
];

export const VETERINARY_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Veterinary Surgery & Radiology",
    weight: 94,
    category: "Veterinary",
    demand: "Critical Demand",
    description: "Surgical soft tissue repairs, animal bone fracture settings, clinical x-ray imagery, and anaesthetic monitoring for animals.",
    subjects: ["Veterinary Orthopedic Fixes", "Small & Large Animal Anaesthesia", "Aseptic Surgery Methods", "Diagnostic Animal Radiology"],
    roles: ["Veterinary Surgeon", "Animal Radiology Analyst", "Zoo Vet Consultant"]
  },
  {
    rank: 2,
    name: "Veterinary Medicine & Therapeutics",
    weight: 92,
    category: "Veterinary",
    demand: "Critical Demand",
    description: "Clinical diagnosis of internal systemic diseases in cattle, horses, dogs, and pets. Includes treatment design and pharmacology.",
    subjects: ["Internal Livestock Pathology", "Canine & Feline Diagnostics", "Avian Medicine & Fevers", "Veterinary Pharmacology"],
    roles: ["Veterinary Physician", "Animal Clinic Director", "Livestock Health Advisor"]
  },
  {
    rank: 3,
    name: "Animal Reproduction, Gynecology & Obstetrics",
    weight: 90,
    category: "Veterinary",
    demand: "High Demand",
    description: "Semen preservation biochemistry, livestock artificial insemination systems, canine obstetric procedures, and breeding cycle planning.",
    subjects: ["Artificial Insemination Systems", "Semen Cryopreservation", "Livestock Dystocia Management", "Reproductive Endocrinology"],
    roles: ["Animal Breeding Consultant", "Livestock Fertility Expert", "Veterinary Obstetrician"]
  },
  {
    rank: 4,
    name: "Veterinary Pathology & Diagnostics",
    weight: 90,
    category: "Veterinary",
    demand: "High Demand",
    description: "Diagnostics procedures for wild and domestic animals diseases, clinical necropsy reporting, animal histopathology sample preparation, and oncology diagnostics.",
    subjects: ["Clinical Histopathology Practices", "Animal Necropsy Protocols", "Diagnostics Reagent Chemistry", "Veterinary Oncological Biomarkers"],
    roles: ["Veterinary Pathologist Analyst", "Animal Diagnostic Center Director", "Zoonotic Pathology Specialist"]
  },
  {
    rank: 5,
    name: "Veterinary Genomics & Molecular Diagnostics",
    weight: 91,
    category: "Veterinary",
    demand: "Critical Demand",
    description: "Examines the genetic foundations of veterinary diseases, gene sequencing PCR protocols for domestic animals, and molecular gene therapy designs.",
    subjects: ["Animal Genomic Sequencing", "Diagnostic PCR for Livestock", "Animal Gene Therapy Protocols", "Heritable Livestock Pathologies"],
    roles: ["Veterinary Genomics Analyst", "Livestock Genetic Advisor", "Animal Diagnostics Lab Lead"]
  },
  {
    rank: 6,
    name: "Wildlife Epidemiology & One-Health Administration",
    weight: 93,
    category: "Veterinary",
    demand: "Critical Demand",
    description: "Examines pathogen transfers between wildlife, domestic livestock, and human populations, focusing on containment and ecosystem health policies.",
    subjects: ["Zoonotic Disease Dynamics", "Wildlife Disease Mapping & GIS", "One-Health Policy Frameworks", "Ecosystem Vector Containment"],
    roles: ["Wildlife Epidemiologist", "One-Health Policy Director", "Zoonotic Disease Outbreak Analyst"]
  },
  {
    rank: 7,
    name: "Small Animal Surgical Assistance & Tech",
    weight: 90,
    category: "Veterinary",
    demand: "High Demand",
    description: "Training in surgical setup, sterile field management, anaesthesia monitoring for small animals, and post-operative recovery care.",
    subjects: ["Surgical Setup & Sterilization", "Small Animal Anaesthesia", "Post-Op Recovery Care", "Clinical Surgical Assistance"],
    roles: ["Veterinary Surgical Technician", "Small Animal Clinical Assistant", "Anaesthesia Monitor"]
  },
  {
    rank: 8,
    name: "Livestock Nutrition & Farm Health Management",
    weight: 92,
    category: "Veterinary",
    demand: "Critical Demand",
    description: "Focuses on balanced diet formulations for commercial livestock, disease monitoring in herds, vaccine scheduling, and basic herd diagnostics.",
    subjects: ["Livestock Nutrition Balancing", "Herd Disease Surveillance", "Vaccine Schedule Management", "Basic Herd Diagnostics"],
    roles: ["Livestock Health Manager", "Animal Nutrition Advisor", "Herd Health Technician"]
  },
  {
    rank: 9,
    name: "Animal Rehabilitation & Physiotherapy",
    weight: 89,
    category: "Veterinary",
    demand: "High Demand",
    description: "Specializes in hydrotherapy for animals, post-surgical physical rehabilitation exercises, and pain management modalities.",
    subjects: ["Animal Hydrotherapy Techniques", "Physiotherapy for Small Animals", "Pain Management Modalities", "Rehabilitation Exercise Protocols"],
    roles: ["Animal Rehab Therapist", "Veterinary Physiotherapist", "Pain Management Consultant"]
  },
  {
    rank: 10,
    name: "Dairy Farm Management & Hygiene Protocols",
    weight: 91,
    category: "Veterinary",
    demand: "High Demand",
    description: "Concentrates on automated milking system maintenance, barn hygiene standards, bovine health monitoring, and dairy quality assurance.",
    subjects: ["Automated Milking Maintenance", "Barn Hygiene Standards", "Bovine Health Surveillance", "Dairy Quality Assurance"],
    roles: ["Dairy Farm Operations Manager", "Bovine Health Technician", "Milk Quality Specialist"]
  }
];

export const RELIGIOUS_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Sanskrit Philology & Linguistics",
    weight: 85,
    category: "Religious Studies",
    demand: "Moderate Demand",
    description: "Phonetics study of Ashtadhyayi grammar formulas, comparative Indo-Aryan language evolution, and manuscript decoding procedures.",
    subjects: ["Paninian Grammar Formulas", "Indo-Aryan Linguistics", "Ancient Brahmi Manuscriptology", "Sanskrit Prose Construction"],
    roles: ["Language Translator", "Sanskrit Manuscript Analyst", "Epigraphy Epigraphist Expert"]
  },
  {
    rank: 2,
    name: "Vedic Studies & Ancient Astronomy",
    weight: 88,
    category: "Religious Studies",
    demand: "High Demand",
    description: "Explores the philosophical structures of Upanishads, Vedic recitation methods, and ancient astronomical observations coordinates systems.",
    subjects: ["Upanishadic Philosophical Treatises", "Vedic Phonetics & Accents", "Ancient Indian Astronomy", "Episodic Chronology Science"],
    roles: ["Vedic Scholar Researcher", "Philosophy Academician", "Sanskrit Cultural Advisor"]
  },
  {
    rank: 3,
    name: "Buddhist Philosophy & Pali Literature",
    weight: 86,
    category: "Religious Studies",
    demand: "Moderate Demand",
    description: "Focuses on text parsing in Theravada and Mahayana, grammatical Pali structures translation, historic Buddhist sculpture arts, and meditative techniques history.",
    subjects: ["Pali Grammar & Script Translation", "Theravada Philosophical Texts", "Meditation History Studies", "Buddhist Art & Iconography Mapping"],
    roles: ["Buddhist Studies Academic Researcher", "Pali Texts Translator", "Ancient Arts Curator"]
  },
  {
    rank: 4,
    name: "Digital Humanities & Interfaith Mediation Studies",
    weight: 88,
    category: "Religious Studies",
    demand: "High Demand",
    description: "Combines text-mining algorithms with cross-faith discussions, digital transcription of ancient scrolls, and modern cultural conflict resolution frameworks.",
    subjects: ["Interfaith Dialogue Ethics", "Digital Manuscript Text Mining", "Socio-Religious Mediation", "Scriptural Heritage Database Design"],
    roles: ["Interfaith Relations Coordinator", "Digital Humanities Researcher", "Cultural Heritage Consultant"]
  },
  {
    rank: 5,
    name: "Comparative Cultural Archeology & Heritage Informatics",
    weight: 89,
    category: "Religious Studies",
    demand: "High Demand",
    description: "Applies 3D photogrammetry scanning to ancient ruins, coordinates digital heritage databases, and analyzes comparative global mythology pathways.",
    subjects: ["3D Photogrammetry Archeology", "Global Mythology Comparative Logic", "Heritage Database Architecture", "Epigraphy & Script Chronologies"],
    roles: ["Archaeological Informatics Lead", "Digital Heritage Conservator", "Cultural Anthropologist Adviser"]
  }
];

export const COMPUTING_IT_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Artificial Intelligence & Machine Learning",
    weight: 97,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Covers deep learning neural networks, natural language processing (NLP), model parameter tuning, and transformer architectures.",
    subjects: ["Neural Networks & Deep Learning", "Transformers & NLP Layouts", "Statistical Python Math", "Computer Vision Algorithms"],
    roles: ["AI Engineer", "ML Research Scientist", "Data Analytics Lead"]
  },
  {
    rank: 2,
    name: "Software Engineering & Application Dev",
    weight: 96,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Explores agile software architecture patterns, web application frameworks (React/Node.js), and software life-cycle pipelines.",
    subjects: ["React & Frontend Architecture", "RESTful API Development", "Software Design Patterns", "Automated Testing Suites"],
    roles: ["Full Stack Developer", "Software Architect", "Technical Program Manager"]
  },
  {
    rank: 3,
    name: "Cybersecurity & Ethical Hacking",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Prepares candidates in computer network security, penetrative testing protocols, encryption ciphers, and threat mitigations.",
    subjects: ["Network Firewalls & Security", "Penetration Testing (Metasploit)", "AES & RSA Cryptography", "Incident Forensic Recovery"],
    roles: ["Ethical Hacker", "Information Security Analyst", "SOC Security Lead"]
  },
  {
    rank: 4,
    name: "Cloud Computing & DevOps Engineering",
    weight: 96,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Covers high-scale cloud platforms architecture, Docker and Kubernetes container systems, CI/CD automated deployment, and automated infrastructure as code.",
    subjects: ["Enterprise Cloud (AWS & Azure)", "Docker & Kubernetes Systems", "CI/CD Deployment Pipelines", "Infrastructure as Code (Terraform)"],
    roles: ["Cloud Solutions Architect", "DevOps Systems Engineer", "Site Reliability Engineer"]
  },
  {
    rank: 5,
    name: "Blockchain & Cryptographic FinTech",
    weight: 92,
    category: "Computing & IT",
    demand: "Emerging Demand",
    description: "Decentralized consensus protocols, smart contract audit standards, zero-knowledge proofs cryptography, and digital asset ledger integration.",
    subjects: ["Smart Contract Architecture (Solidity)", "Consensus Algorithms Mechanics", "Applied Cryptography & ZKPs", "DeFi Protocol Implementations"],
    roles: ["Blockchain Protocol Engineer", "Smart Contract Auditor", "FinTech Solutions Architect"]
  },
  {
    rank: 6,
    name: "Big Data Engineering & Data Lakes",
    weight: 94,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Architectures for high-volume stream ingestion, distributed computing structures, schema-on-read data lakehouses, and real-time streaming pipelines.",
    subjects: ["Distributed Computing (Spark/Hadoop)", "Kafka Stream Architecture", "Data Warehouse Schema Optimization", "Data Lakehouse Design (Delta/Iceberg)"],
    roles: ["Data Engineer Specialist", "Data Warehouse Architect", "Big Data Operations Engineer"]
  },
  {
    rank: 7,
    name: "Edge Computing & Decentralized Cloud Systems",
    weight: 95,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Designs ultra-low latency applications running on decentralized cell towers, smart IoT edges, and local micro-datacenters with real-time stream state replication.",
    subjects: ["Edge Virtualization & Micro-K8s", "Low-Latency Stream Ingestion", "Decentralized Database Sync", "IoT Security Protocols"],
    roles: ["Edge Systems Architect", "IoT Infrastructure Lead", "Decentralized Cloud Engineer"]
  },
  {
    rank: 8,
    name: "Quantum Software Architecture & Dev",
    weight: 93,
    category: "Computing & IT",
    demand: "Emerging Demand",
    description: "Applies quantum mechanical logic gates, qubit coherence math, and quantum algorithms to model optimization and cryptographic designs on quantum simulators.",
    subjects: ["Qubit Mechanics & Linear Algebra", "Quantum Algorithm Design (Shor/Grover)", "Quantum SDKs (Qiskit/Cirq)", "Post-Quantum Cryptography Basics"],
    roles: ["Quantum Software Developer", "Quantum Algorithm Analyst", "Cryptographic Research Assistant"]
  }
];

export const BSC_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  // --- High-level Categories ---
  {
    rank: 1,
    name: "BSc Computing & IT",
    weight: 94,
    category: "BSc",
    demand: "Critical Demand",
    description: "Includes software programming, databases systems, network protocols, data parsing, and tech workspace operations.",
    subjects: ["Industrial Java Programming", "Relational Database Schemas", "TCP/IP Network Routing", "Operating Systems Internals"],
    roles: ["Systems Analyst", "IT Project Coordinator", "Network Operations Specialist"],
    subCourses: ["Computer Science", "Information Technology", "Artificial Intelligence", "Cybersecurity", "Data Analytics", "Data Science", "Software Development", "Fullstack Development", "Quantum Computing", "Robotics Process Automation", "Business Intelligence Tools"]
  },
  {
    rank: 2,
    name: "BSc Medical",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Focuses on diagnostics equipment operations, radiological physics, medical scanning procedures, and emergency clinical operations.",
    subjects: ["Diagnostics Lab Chemistry", "Diagnostic Imaging Science", "Emergency Traumatic Care", "Clinical Safety Codes"],
    roles: ["Diagnostics Technician", "Healthcare Systems Analyst", "Allied Clinic Associate"],
    subCourses: ["Anatomy", "Physiology", "Microbiology", "Radiology", "Emergency Medical Technology"]
  },
  {
    rank: 3,
    name: "BSc Agriculture & Allied Sciences",
    weight: 92,
    category: "BSc",
    demand: "Critical Demand",
    description: "In-depth agronomy methodologies, horticultural crops breeding, soil nutrients testing, and sustainable agro-economics.",
    subjects: ["Crop Physiology & Yields", "Horticultural Breeding Science", "Soil Physical-Chemical Testing", "Sustainable Crop Sourcing"],
    roles: ["Agricultural Officer", "Agronomist Advisor", "Agri-Industry Manager"],
    subCourses: ["Agronomy", "Horticulture", "Soil Science", "Plant Breeding", "Agro-economics"]
  },
  {
    rank: 4,
    name: "BSc Forensic Science & Criminology",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Crime scene analysis protocols, forensic toxicology profiling, ballistics markings, DNA extraction, and legal courtroom defense.",
    subjects: ["Crime Scene Investigation Methods", "Forensic Toxicology & Serology", "Ballistics markings & Physics", "Digital Cyber Forensics Protocols"],
    roles: ["Forensic Lab Specialist", "Crime Scene Inspector", "Forensic Toxicology Associate"]
  },
  {
    rank: 5,
    name: "BSc Microbiology & Immunology",
    weight: 92,
    category: "BSc",
    demand: "High Demand",
    description: "Covers bacterial and viral pathology research, clinical immune response mechanisms, industrial bio-preservation, and pharmaceutical quality assays.",
    subjects: ["Systemic Bacteriology & Virology", "Pathogenic Immune Response Mechanisms", "Industrial Microbe Bio-Assays", "Clinical Mycology Diagnostics"],
    roles: ["Clinical Microbiologist", "Immunology Research Associate", "Quality Assurance Microbiologist"]
  },
  {
    rank: 6,
    name: "BSc Biochemistry & Molecular Genetics",
    weight: 93,
    category: "BSc",
    demand: "High Demand",
    description: "Explores the molecular architecture of living systems, gene expression regulators, DNA recombination methods, and metabolic pathway tracking.",
    subjects: ["Gene Expression & Regulation", "Enzymology & Protein Catalysis", "Recombinant DNA Methodologies", "Clinical Metabolic Assays"],
    roles: ["Geneticist Research Assistant", "Clinical Biochemist Specialist", "Bio-Pharmaceutical Chemist"]
  },
  {
    rank: 7,
    name: "BSc Environmental Science & Climate Action",
    weight: 90,
    category: "BSc",
    demand: "Critical Demand",
    description: "Assesses ecosystem restoration strategies, environmental impact evaluations, renewable energy solutions, and toxic waste remediation procedures.",
    subjects: ["Ecosystem Conservation Policy", "EIA (Environmental Impact Assessment)", "Waste Remediation Chemistry", "Climate Modeling & Forecasting"],
    roles: ["Environmental Impact Analyst", "Conservation Project Officer", "Sustainability Operations Lead"]
  },
  {
    rank: 8,
    name: "BSc Applied Statistics & Data Modeling",
    weight: 93,
    category: "BSc",
    demand: "Critical Demand",
    description: "Applies multivariate statistical models, stochastic processes, experimental designs, and high-level predictive simulations to extract actionable market intelligence.",
    subjects: ["Multivariate Regression Analysis", "Stochastic & Markov Processes", "R & SAS Statistical Computing", "High-Fidelity Monte Carlo Simulations"],
    roles: ["Statistical Data Analyst", "Predictive Risk Modeler", "Clinical Trials Statistician"]
  },
  {
    rank: 9,
    name: "BSc Forestry",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Studies forest ecology, silviculture, wildland management, wood science, and ecosystem conservation policies.",
    subjects: ["Silviculture Principles", "Forest Ecology", "Wildland Management", "Timber & Wood Science"],
    roles: ["Forest Officer", "Silviculturist", "Ecology Consultant"],
    subCourses: ["Silviculture", "Forest Ecology", "Wildland Management", "Wood Science"]
  },
  {
    rank: 10,
    name: "BSc Defence",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Covers military tactics, strategic national defense, security policies, and defense logistics.",
    subjects: ["Military Tactics", "Strategic Defence Studies", "Security Policies", "Defence Logistics"],
    roles: ["Defence Analyst", "Security Officer", "Strategic Advisor"],
    subCourses: ["Military Tactics", "Strategic Defence", "Security Policies", "Defence Logistics"]
  },
  {
    rank: 11,
    name: "BSc Marine & Aviation",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Studies maritime navigation, aviation operations, oceanography, and aeronautical meteorology.",
    subjects: ["Maritime Navigation", "Aviation Operations", "Oceanography", "Aeronautical Meteorology"],
    roles: ["Marine Navigator", "Aviation Operations Specialist", "Oceanographer"],
    subCourses: ["Maritime Navigation", "Aviation Operations", "Oceanography", "Aeronautical Meteorology"]
  },
  {
    rank: 12,
    name: "BSc Pure Science",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Includes studies in fundamental sciences like Physics, Chemistry, and Mathematics.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Advanced Science"],
    roles: ["Research Scientist", "Academician", "Science Communicator"],
    subCourses: ["Physics", "Chemistry", "Mathematics", "Biology"]
  },

  // --- Specific BSc Sub-Courses From PDF ---
  // 1. Computing & IT
  {
    name: "BSc Computer Science",
    weight: 95,
    category: "BSc",
    demand: "Critical Demand",
    description: "Foundations of computation, software design, data structures, algorithm analysis, and database architecture.",
    subjects: ["Data Structures & Algorithms", "Database Systems", "Operating Systems", "Software Engineering"],
    roles: ["Software Developer", "System Analyst", "Database Administrator"]
  },
  {
    name: "BSc IT",
    weight: 94,
    category: "BSc",
    demand: "Critical Demand",
    description: "Focuses on computer networking, server systems management, web technology architectures, and enterprise systems deployment.",
    subjects: ["Computer Networks", "Web Technologies", "Information Security", "System Administration"],
    roles: ["IT Administrator", "Network Specialist", "Technical Support Engineer"]
  },
  {
    name: "BSc Data Science",
    weight: 95,
    category: "BSc",
    demand: "Critical Demand",
    description: "Mathematical modeling, predictive analytics, statistical computing, and high-volume data visualization.",
    subjects: ["Applied Statistics", "R & Python Analytics", "Predictive Modeling", "Data Visualization"],
    roles: ["Data Analyst", "Data Engineer", "BI Architect"]
  },
  {
    name: "BSc AI & ML",
    weight: 96,
    category: "BSc",
    demand: "Critical Demand",
    description: "Deals with machine learning models, neural networks, natural language processing, and automated reasoning engines.",
    subjects: ["Deep Learning Models", "Natural Language Processing", "Machine Learning Foundations", "Neural Networks"],
    roles: ["Machine Learning Analyst", "AI Associate", "Computer Vision Specialist"]
  },
  {
    name: "BSc Cybersecurity",
    weight: 95,
    category: "BSc",
    demand: "Critical Demand",
    description: "Ethical hacking, network security defenses, digital forensics, incident remediation, and system hardening.",
    subjects: ["Network Security & Firewalls", "Ethical Hacking Protocols", "Cryptography & Ciphers", "Digital Forensic Recovery"],
    roles: ["Cyber Security Analyst", "Security Administrator", "Ethical Hacker"]
  },

  // 2. Medical
  {
    name: "BSc Biology",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Broad study of living organisms, cellular biology, genetics, ecology, evolutionary pathways, and physiological systems.",
    subjects: ["Cell Biology", "Genetics & Heredity", "Ecology & Conservation", "Evolutionary Biology"],
    roles: ["Research Assistant", "Biological Technician", "Environmental Consultant"]
  },
  {
    name: "BSc Biochemistry",
    weight: 92,
    category: "BSc",
    demand: "High Demand",
    description: "Explores the molecular structures and chemical processes within living organisms, metabolic pathways, and enzymology.",
    subjects: ["Molecular Biology", "Enzymology & Kinetics", "Metabolic Pathways", "Structural Biochemistry"],
    roles: ["Biochemist Associate", "Clinical Lab Analyst", "Pharmaceutical Researcher"]
  },
  {
    name: "BSc Microbiology",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Studies microscopic organisms including bacteria, viruses, fungi, and protozoa, their pathogenesis, and clinical immunology.",
    subjects: ["Bacteriology & Virology", "Immunology & Host Defenses", "Industrial Microbiology", "Microbial Genetics"],
    roles: ["Microbiologist", "Quality Control Analyst", "Clinical Research Associate"]
  },
  {
    name: "BSc Biotechnology",
    weight: 93,
    category: "BSc",
    demand: "High Demand",
    description: "Utilizes cellular and biomolecular processes to develop advanced technologies and products for healthcare, agriculture, and industries.",
    subjects: ["Recombinant DNA Technology", "Bioprocess Engineering", "Plant & Animal Biotechnology", "Bioinformatics"],
    roles: ["Biotechnologist", "Lab Quality Specialist", "Process Engineer"]
  },
  {
    name: "BSc Zoology",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Focuses on the structure, physiology, behavior, classification, and distribution of animals.",
    subjects: ["Animal Physiology", "Vertebrate & Invertebrate Anatomy", "Animal Behaviour & Ethology", "Developmental Biology"],
    roles: ["Zoologist Assistant", "Wildlife Conservationist", "Zookeeper / Animal Care Expert"]
  },
  {
    name: "BSc Botany",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "In-depth study of plant life, plant taxonomy, plant physiology, breeding, and agricultural botany applications.",
    subjects: ["Plant Anatomy & Physiology", "Plant Taxonomy & Systematics", "Economic Botany", "Plant Pathology"],
    roles: ["Botanist Advisor", "Plant Geneticist Assistant", "Agronomy Consultant"]
  },
  {
    name: "BSc Physiology",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Studies the biological functions and mechanics of human systems, organs, cells, and tissues.",
    subjects: ["Human Anatomy & Physiology", "Neurobiology & Nerve Functions", "Cardiovascular & Respiratory Systems", "Endocrine Regulation"],
    roles: ["Physiology Lab Assistant", "Clinical Research Associate", "Healthcare Administrator"]
  },
  {
    name: "BSc Psychology",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Explores human cognitive behavior, abnormal psychology, counseling methods, and psychological research approaches.",
    subjects: ["Cognitive Processes", "Abnormal Psychology", "Developmental Psychology", "Research Methodology"],
    roles: ["Counseling Assistant", "HR Specialist", "Mental Health Care Coordinator"]
  },
  {
    name: "BSc Nursing",
    weight: 93,
    category: "BSc",
    demand: "Critical Demand",
    description: "Prepares students for registered nursing care, patient diagnosis support, clinical medicine management, and emergency response.",
    subjects: ["Fundamentals of Nursing", "Medical-Surgical Nursing", "Community Health Nursing", "Pharmacology & Safety"],
    roles: ["Registered Nurse", "Clinical Care Associate", "Healthcare Administrator"]
  },

  // 3. Forestry
  {
    name: "BSc Forestry",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Studies forest ecosystems, silviculture practices, wildlife ecology, wood sciences, and forest policy regulations.",
    subjects: ["Silviculture & Afforestation", "Forest Mensuration", "Forest Ecology", "Timber & Wood Sciences"],
    roles: ["Forest Range Officer", "Silviculture Specialist", "Ecology Consultant"]
  },
  {
    name: "BSc Wildlife Science",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Habitat tracking, wildlife behaviour research, animal population census methods, and national park sanctuary management.",
    subjects: ["Wildlife Habitat Ecology", "Mammalogy & Ornithology", "Wildlife Census Techniques", "Biodiversity Conservation"],
    roles: ["Wildlife Biologist Assistant", "Conservation Officer", "Ecotourism Manager"]
  },
  {
    name: "BSc Environmental Science",
    weight: 90,
    category: "BSc",
    demand: "Critical Demand",
    description: "Ecosystem preservation, environmental impact assessments, waste remediation techniques, and global climate patterns.",
    subjects: ["EIA (Environmental Impact Assessment)", "Pollution Control & Remediation", "Natural Resource Management", "Climate Science & Policy"],
    roles: ["Environmental Analyst", "Sustainability Coordinator", "Conservation Planner"]
  },

  // 4. Defence
  {
    name: "BSc Defence & Strategic Studies",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "National security policies, military history, tactical logistics, international geopolitics, and conflict resolution.",
    subjects: ["National Security & Geopolitics", "Military History & Warfare", "Defence Logistics & Planning", "Conflict Resolution Methods"],
    roles: ["Strategic Policy Analyst", "Defence Advisor", "Intelligence Assistant Officer"]
  },
  {
    name: "BSc Defence Studies",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Strategic defense policy analysis, international geo-political conflicts research, military history, and defense resource logistics.",
    subjects: ["National Security Policies", "Geo-Political Conflict Studies", "Military History Tactics", "Defense Logistics Planning"],
    roles: ["Defence Strategic Analyst", "National Security Advisor", "Intelligence Assistant"]
  },
  {
    name: "BSc Military Science",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Combines physical training, military leadership, combat weaponry mechanics, and field survival strategies.",
    subjects: ["Military Leadership Concepts", "Combat Weapon Mechanics", "Field Map & Navigation Survival", "Tactical Combat Formations"],
    roles: ["Armed Forces Cadet Officer", "Security Consultant", "Combat Tactical Instructor"]
  },
  {
    name: "BSc Security Management",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Industrial security assessments, corporate disaster response planning, perimeter access controls, and electronic surveillance architectures.",
    subjects: ["Industrial Hazard Security", "Disaster Response Frameworks", "Electronic CCTV Architectures", "Access Control Management"],
    roles: ["Corporate Security Manager", "Loss Prevention Expert", "Risk Assessment Specialist"]
  },

  // 5. Marine & Aviation
  {
    name: "BSc Marine Science",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Ocean ecosystems, marine biology conservation, marine chemistry, marine geology, and coastal zone management.",
    subjects: ["Biological Oceanography", "Marine Pollution Chemistry", "Coastal Zone Management", "Marine Geology & Tectonics"],
    roles: ["Oceanographer Assistant", "Marine Biology Specialist", "Coastal Resource Planner"]
  },
  {
    name: "BSc Nautical Science",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Merchant navy operations, celestial ship navigation, radar navigation, maritime cargo safety, and ship stability.",
    subjects: ["Celestial Navigation & Chartwork", "Radar & ARPA Systems", "Ship Stability & Maneuvers", "Cargo Operations & Safety"],
    roles: ["Merchant Navy Deck Cadet", "Port Operations Coordinator", "Marine Surveyor"]
  },
  {
    name: "BSc Maritime Science",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Ocean vessels engineering, marine ecosystems pollution control, shipping business regulations, and maritime law.",
    subjects: ["Ship Auxiliary Engines", "Marine Pollution Mitigation", "Maritime Regulatory Codes", "Shipping Logistics Business"],
    roles: ["Marine Superintendent", "Port Operations Lead", "Maritime Shipping Analyst"]
  },
  {
    name: "BSc Aviation",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Covers flight navigation theory, aviation meteorology, airport safety management, and commercial piloting operations.",
    subjects: ["Aviation Meteorology", "Air Navigation Principles", "Aircraft Engine Mechanics", "Air Traffic Control Protocols"],
    roles: ["Airline Flight Cadet", "Aviation Safety Inspector", "Airport Terminal Manager"]
  },
  {
    name: "BSc Aeronautical Science",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Fluid dynamics of flight, structural design analysis of aircraft, gas turbine engine operations, and supersonic flight limits.",
    subjects: ["Flight Aerodynamics", "Aircraft Structural Design", "Gas Turbine Operations", "Avionics System Architecture"],
    roles: ["Aeronautical Technical Specialist", "Aviation Systems Designer", "Aircraft Maintenance Inspector"]
  },
  {
    name: "BSc Aircraft Maintenance Science",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Aircraft engine troubleshooting protocols, avionic electronics calibration, landing gear maintenance, and civil aviation authority compliance checks.",
    subjects: ["Aircraft Troubleshooting Codes", "Avionics Electronics Calibration", "Landing Gear Maintenance", "DGCA Aviation Regulations"],
    roles: ["Aircraft Maintenance Engineer", "Avionics Test Technician", "Hangar Quality Inspector"]
  },
  {
    name: "BSc Airline and Airport Management",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "International flight ticketing procedures, airport baggage terminal operations, airline fuel pricing, and emergency evacuation planning.",
    subjects: ["Baggage Handling & Logistics", "Flight Ticketing Systems", "Airport Terminal Administration", "Emergency Evacuation Planning"],
    roles: ["Airport Duty Manager", "Airline Revenue Specialist", "Ground Handling Executive"]
  },

  // 6. Agriculture
  {
    name: "BSc Agriculture",
    weight: 92,
    category: "BSc",
    demand: "Critical Demand",
    description: "Agronomy practices, plant disease diagnostics, agricultural economics, soil chemistry, and crop productivity improvement.",
    subjects: ["Principles of Agronomy", "Soil Science & Nutrients", "Plant Disease Diagnosis", "Agricultural Marketing & Finance"],
    roles: ["Agricultural Officer", "Agronomist Advisor", "Farm Manager"]
  },
  {
    name: "BSc Horticulture",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Cultivation of fruits, vegetables, flowers, landscape gardening principles, and greenhouse management.",
    subjects: ["Floriculture & Landscaping", "Olericulture & Pomology", "Post-Harvest Management", "Greenhouse Design & Automation"],
    roles: ["Horticulture Specialist", "Landscape Designer", "Greenhouse Nursery Manager"]
  },
  {
    name: "BSc Fisheries & Aquatic Sciences",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Aquaculture engineering, fish farming operations, aquatic pathology, and commercial fishing gear management.",
    subjects: ["Aquaculture Engineering", "Fish Pathology & Nutrition", "Marine Fisheries Biology", "Post-Harvest Fish Processing"],
    roles: ["Fishery Development Officer", "Aquaculture Farm Specialist", "Hatchery Supervisor"]
  },
  {
    name: "BSc Sericulture",
    weight: 86,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Silkworm rearing technologies, mulberry cultivation systems, silk extraction technology, and silk processing.",
    subjects: ["Silkworm Anatomy & Pathology", "Mulberry Breeding Systems", "Silk Extraction Technology", "Sericulture Marketing"],
    roles: ["Sericulture Inspector", "Silk Advisor", "Mulberry Farm Manager"]
  },

  // 7. Pure Science
  {
    name: "BSc Physics",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Classical and quantum physics principles, thermodynamics, electromagnetism, and atomic modeling calculations.",
    subjects: ["Classical Mechanics", "Quantum Physics", "Electromagnetism Theory", "Thermodynamics"],
    roles: ["Physics Research Assistant", "Laboratory Analyst", "Scientific Technical Writer"]
  },
  {
    name: "BSc Chemistry",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Inorganic and organic reaction structures, spectrophotometric analyses, material compounds, and biochemistry pathways.",
    subjects: ["Organic Synthesis", "Inorganic Coordination Chemistry", "Analytical Spectrophotometry", "Physical Chemistry"],
    roles: ["Analytical Chemist", "Chemical Laboratory Specialist", "Formulation Chemist"]
  },
  {
    name: "BSc Mathematics",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Real analysis, calculus, abstract group theories, vector space systems, and numerical analysis algorithms.",
    subjects: ["Real & Complex Analysis", "Abstract Algebra", "Linear Algebra & Vectors", "Numerical Analysis Algorithms"],
    roles: ["Mathematical Modeler", "Data Analyst Assistant", "Quantitative Researcher"]
  },
  {
    name: "BSc Statistics",
    weight: 92,
    category: "BSc",
    demand: "Critical Demand",
    description: "Probability distributions, multivariate hypothesis testing, stochastic processes, and linear regression forecasting modeling.",
    subjects: ["Probability Theory", "Multivariate Hypothesis Tests", "Linear Regression Models", "Statistical Computing & Packages"],
    roles: ["Statistical Analyst", "Actuarial Associate", "Data Modeler"]
  },
  {
    name: "BSc Geology",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Earth tectonic processes, mineral crystallography mapping, sedimentary stratigraphy, and groundwater resource explorations.",
    subjects: ["Structural Geology", "Mineralogy & Crystallography", "Sedimentary Stratigraphy", "Hydrogeology & Water Maps"],
    roles: ["Geological Field Assistant", "Mining Project Specialist", "Hydrogeological Surveyor"]
  },
  {
    name: "BSc Astronomy",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Astrophysics, stellar evolution models, galactic and cosmic structures, astronomical observational instruments and spectroscopy.",
    subjects: ["Stellar Astrophysics", "Cosmology & Galactic Dynamics", "Observational Instrumentation", "Astronomical Spectroscopy"],
    roles: ["Astronomical Research Assistant", "Planetarium Coordinator", "Science Observatory Assistant"]
  },

  // 8. Others
  {
    name: "BSc Home Science",
    weight: 87,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Human development, nutrition and dietetics, home resource management, textile fabrics, and family studies.",
    subjects: ["Human Development & Family Studies", "Food Science & Nutrition", "Home Resource Management", "Textiles & Apparel Designing"],
    roles: ["Home Science Advisor", "Child Care Consultant", "Nutrition Extension Worker"]
  },
  {
    name: "BSc Food Science & Technology",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Food chemistry, preservation technologies, thermal processing engineering, and food safety quality auditing.",
    subjects: ["Food Preservation Chemistry", "Food Processing Engineering", "Sensory Quality Assessment", "Food Standards & Auditing"],
    roles: ["Food Quality Inspector", "Product Developer", "Food Processing Lead"]
  },
  {
    name: "BSc Fashion Technology",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Garment apparel CAD patternmaking, textile engineering processes, fashion merchandising campaigns, and garment manufacture systems.",
    subjects: ["Apparel CAD Patternmaking", "Textile Fiber Engineering", "Garment Manufacturing Quality", "Fashion Retail Merchandising"],
    roles: ["Fashion Apparel Designer", "Textile Quality Auditor", "Production Merchandiser"]
  },
  {
    name: "BSc Interior Design",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Spatial interior architectures, furniture ergonomics plans, CAD structural blueprints, and lighting system designs.",
    subjects: ["Spatial Architecture Plans", "Furniture Ergonomics & CAD", "Lighting Layout Designs", "Interior Finishing Materials"],
    roles: ["Interior Space Designer", "CAD Structural Draftsman", "Home Decorator Advisor"]
  },
  {
    name: "BSc Hospitality and Hotel Administration",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Front office operations, food and beverage service management, housekeeping operations, and hospitality marketing principles.",
    subjects: ["Front Office Operations", "Food & Beverage Service", "Accommodation Operations", "Hospitality Marketing"],
    roles: ["Hotel Assistant Manager", "Front Office Supervisor", "F&B Operations Coordinator"]
  },
  {
    name: "BSc Sports Science",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Human anatomy and physiology in exercise, sports biomechanics, athletic training methods, and sports nutrition and psychology.",
    subjects: ["Exercise Physiology", "Sports Biomechanics", "Athletic Training Methods", "Sports Nutrition & Psychology"],
    roles: ["Sports Coach", "Fitness Trainer", "Exercise Physiologist"]
  },
  {
    name: "BSc Yoga Science",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Philosophy of yoga, anatomy and physiology of yogic practices, yogic therapy and counseling, and meditation and pranayama techniques.",
    subjects: ["Yogic Philosophy", "Anatomy of Yoga", "Yogic Therapy", "Meditation & Pranayama Techniques"],
    roles: ["Yoga Instructor", "Yoga Therapist", "Wellness Consultant"]
  },
  {
    name: "BSc Nutrition and Food Science",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Principles of human nutrition, food chemistry, dietetics and therapy, and community nutrition and wellness programs.",
    subjects: ["Human Nutrition Principles", "Food Chemistry & Microbiology", "Clinical Dietetics", "Community Wellness Programs"],
    roles: ["Clinical Dietitian", "Nutritionist", "Wellness Coach"]
  },
  {
    name: "BSc Clinical Research",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Clinical trial design, regulatory affairs and pharmacovigilance, ethical guidelines in human research, and data management in clinical trials.",
    subjects: ["Clinical Trial Methodologies", "Pharmacovigilance & Regulations", "Ethical Research Guidelines", "Clinical Data Management"],
    roles: ["Clinical Research Coordinator", "Clinical Data Analyst", "Pharmacovigilance Officer"]
  },
  {
    name: "BSc Fire and Industrial Safety",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Fire dynamics and prevention systems, industrial safety regulations and audits, hazard identification and risk assessment, and disaster emergency management.",
    subjects: ["Fire Dynamics & Prevention", "Industrial Safety Standards", "Hazard & Risk Assessment", "Disaster Emergency Management"],
    roles: ["Fire Safety Officer", "Industrial Safety Inspector", "EHS Specialist"]
  },
  // --- AI-Researched Cutting-Edge BSc Courses ---
  // Computing & IT
  {
    name: "BSc Cloud Computing",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Cloud architecture, virtualization, serverless computing, enterprise cloud security, and cloud deployment pipelines (AWS, Azure, GCP).",
    subjects: ["Cloud Infrastructure Setup", "Containerization & Kubernetes", "Serverless Computing Concepts", "Cloud Security Best Practices"],
    roles: ["Cloud Solutions Architect", "DevOps Engineer", "Cloud Security Consultant"]
  },
  {
    name: "BSc Software Engineering",
    weight: 92,
    category: "BSc",
    demand: "High Demand",
    description: "System design patterns, advanced algorithms, agile software methodologies, continuous integration, and software test automation.",
    subjects: ["Design Patterns & Architecture", "Software Development Lifecycle", "Automated Testing Frameworks", "CI/CD Pipeline Integration"],
    roles: ["Fullstack Software Developer", "Systems Architect", "QA Automation Engineer"]
  },
  {
    name: "BSc Blockchain Technology",
    weight: 86,
    category: "BSc",
    demand: "High Demand",
    description: "Cryptographic consensus, decentralized ledger systems, smart contract development (Solidity), and decentralized applications (DApps).",
    subjects: ["Cryptographic Hash Functions", "Smart Contract Engineering", "Consensus Algorithms (PoW/PoS)", "DApp Architecture"],
    roles: ["Blockchain Developer", "Smart Contract Auditor", "Decentralized Systems Architect"]
  },
  {
    name: "BSc Game Development",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Interactive real-time game engines (Unity, Unreal Engine), 3D asset modeling and texturing, physics simulation, and game loop programming.",
    subjects: ["Game Engine Programming", "3D Rendering & Shaders", "Physics Simulation Systems", "Interactive UI/UX in Games"],
    roles: ["Game Play Developer", "Technical Artist", "3D Level Designer"]
  },
  {
    name: "BSc IoT & Smart Systems",
    weight: 85,
    category: "BSc",
    demand: "Medium Demand",
    description: "Microcontroller programming, sensor network integration, edge computing, wireless communication protocols, and smart city architectures.",
    subjects: ["Microcontroller C/C++ Programming", "Wireless Sensor Networks", "Edge Computing Architectures", "IoT Security Protocols"],
    roles: ["IoT Solutions Developer", "Embedded Systems Engineer", "Smart Systems Integrator"]
  },
  // Medical & Life Sciences
  {
    name: "BSc Genetics",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Chromosomal inheritance, gene replication, mutation analysis, population genetics, and CRISPR gene editing methodologies.",
    subjects: ["Molecular Genetics", "Cytogenetics & Chromosomes", "Population Genomics", "CRISPR-Cas9 Technologies"],
    roles: ["Genetics Lab Analyst", "Clinical Genetic Technologist", "Genetic Counselor Assistant"]
  },
  {
    name: "BSc Immunology",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Host defense mechanisms, cellular immunity pathways, autoimmune disorder diagnostics, vaccine design, and immunotherapy research.",
    subjects: ["Adaptive & Innate Immunity", "Autoimmunity Diagnostics", "Vaccinology & Clinical Trials", "Immunotherapy Techniques"],
    roles: ["Immunology Research Assistant", "Clinical Immunodiagnostics Analyst", "Biotech Development Associate"]
  },
  {
    name: "BSc Bioinformatics",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Computational genomics, sequence alignment algorithms, structural protein modeling, biological databases, and programming with BioPython.",
    subjects: ["Sequence Alignment Algorithms", "Biological Database Systems", "Protein Structure Modeling", "BioPython & Scripting"],
    roles: ["Bioinformatics Specialist", "Computational Biologist", "Genomic Data Scientist"]
  },
  {
    name: "BSc Neuroscience",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Neuroanatomy, cellular neurobiology, cognitive brain mapping, neurodegenerative disease mechanisms, and neuropharmacology.",
    subjects: ["Neuroanatomy & Systems", "Cognitive Brain Mapping", "Cellular Synaptic Transmission", "Neuropharmacology Principles"],
    roles: ["Neuroscience Lab Technician", "Clinical Neurophysiology Assistant", "Mental Health Research Assistant"]
  },
  // Forestry
  {
    name: "BSc Agroforestry",
    weight: 84,
    category: "BSc",
    demand: "Medium Demand",
    description: "Intercropping woody perennials with agricultural crops, soil fertility enhancement, ecological biodiversity restoration, and agroforestry policy.",
    subjects: ["Silvopastoral Systems", "Perennial Crop Management", "Soil Biology & Nutrition", "Agroforestry Economics"],
    roles: ["Agroforestry Planner", "Sustainable Farm Consultant", "Environmental Forester"]
  },
  {
    name: "BSc Silviculture & Conservation",
    weight: 85,
    category: "BSc",
    demand: "High Demand",
    description: "Forest stand establishment, tree genetics selection, ecosystem restoration strategies, and forest fire preventative conservation.",
    subjects: ["Stand Dynamics & Spacing", "Ecosystem Restoration Ecology", "Tree Breeding & Selection", "Forest Fire Management"],
    roles: ["Silviculturist Specialist", "Forest Conservation Officer", "Restoration Ecologist"]
  },
  // Defence
  {
    name: "BSc Counter-Terrorism Studies",
    weight: 86,
    category: "BSc",
    demand: "High Demand",
    description: "Asymmetric warfare patterns, extremist group radicalization dynamics, cyber-terrorism mitigation, and critical national infrastructure protection.",
    subjects: ["Asymmetric Warfare Analysis", "Extremist Radicalization Models", "Cyber-Terrorism Mitigation", "Infrastructure Protection Policies"],
    roles: ["Counter-Terrorism Analyst", "Intelligence Operations Analyst", "Security Advisor Officer"]
  },
  {
    name: "BSc Homeland Security",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Emergency incident command structures, border patrol logistics, maritime port security measures, and national intelligence coordination.",
    subjects: ["Incident Command Structures", "Border Patrol Logistical Operations", "Maritime Port Security", "Intelligence Coordination Systems"],
    roles: ["Homeland Security Officer", "Emergency Response Coordinator", "Border Operations Analyst"]
  },
  // Marine & Aviation
  {
    name: "BSc Oceanography",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Physical ocean currents, marine chemical balance, geological deep-sea structures, marine biology populations, and ocean climate feedback.",
    subjects: ["Ocean Dynamic Currents", "Marine Biochemistry Cycles", "Deep-Sea Geological Surveys", "Climate-Ocean Feedback Models"],
    roles: ["Oceanographer Scientist", "Marine Environmental Consultant", "Climate Risk Modeler"]
  },
  {
    name: "BSc Avionics & Flight Systems",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Aircraft flight navigation instruments, digital flight control systems, glass cockpit instrumentation, and flight communication networks.",
    subjects: ["Flight Navigation Avionics", "Digital Autopilot Control", "Cockpit Display Instruments", "Radar & Aerospace Networks"],
    roles: ["Avionics Design Engineer", "Flight Systems Integration Lead", "Aviation Systems Technician"]
  },
  // Agriculture
  {
    name: "BSc Agricultural Biotechnology",
    weight: 90,
    category: "BSc",
    demand: "High Demand",
    description: "Genetically modified plant strain development, plant tissue culture reproduction, bio-pesticide syntheses, and agricultural genome mapping.",
    subjects: ["Plant Tissue Culture", "Agri-Genomics & Selection", "Bio-Pesticide Synthesis", "Crop Molecular Diagnostics"],
    roles: ["Agricultural Biotech Scientist", "Plant Tissue Culturist", "Agri-Seed Lab Manager"]
  },
  {
    name: "BSc Agronomy & Crop Science",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Soil management techniques, sustainable crop production, weed control strategies, precision farming technologies, and seed science.",
    subjects: ["Sustainable Crop Production", "Weed Biology & Management", "Precision Farming Systems", "Seed Physiology & Testing"],
    roles: ["Agronomist Advisor", "Crop Production Manager", "Seed Technology Specialist"]
  },
  {
    name: "BSc Soil & Water Conservation",
    weight: 86,
    category: "BSc",
    demand: "Medium Demand",
    description: "Soil erosion prevention practices, watershed management, soil hydrology systems, and water purification technologies for agriculture.",
    subjects: ["Soil Erosion Mechanics", "Watershed Hydrology & Management", "Agricultural Irrigation Systems", "Salinity & Drainage Control"],
    roles: ["Soil Conservation Officer", "Watershed Manager", "Irrigation Specialist"]
  },
  {
    name: "BSc Organic Farming",
    weight: 85,
    category: "BSc",
    demand: "High Demand",
    description: "Natural soil biology building, bio-fertilizer manufacturing, organic certification regulations, and integrated non-chemical pest management.",
    subjects: ["Soil Biological Health", "Bio-Fertilizer Composting", "Organic Certification Codes", "Integrated Pest Management"],
    roles: ["Organic Farm Consultant", "Ecocert Auditor", "Sustainable Farming Lead"]
  },
  // Pure Science
  {
    name: "BSc Astrophysics",
    weight: 91,
    category: "BSc",
    demand: "High Demand",
    description: "Stellar evolution cycles, galactic structural mechanics, cosmology models, and radio astronomy observation techniques.",
    subjects: ["Stellar Astrophysics", "Cosmological Model Frameworks", "General Relativity Basics", "Observational Radio Astronomy"],
    roles: ["Astrophysicist Research Assistant", "Data Scientist", "Observatory Operation Executive"]
  },
  {
    name: "BSc Nanotechnology",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Synthesis of nanomaterials, carbon nanotubes characterization, scanning electron microscopy, and molecular electronics.",
    subjects: ["Nanomaterial Chemical Synthesis", "Carbon Nanotube Properties", "Scanning Electron Microscopy", "Molecular Electronics Theory"],
    roles: ["Nanotechnology Researcher", "Materials Quality Engineer", "Bio-Nanotech Analyst"]
  },
  {
    name: "BSc Electronics",
    weight: 88,
    category: "BSc",
    demand: "High Demand",
    description: "Analog circuit design, digital signal processing, microprocessors architecture (ARM), and embedded programming.",
    subjects: ["Analog Circuit Architecture", "Digital Signal Processing", "Microprocessor Engineering", "Embedded System Firmware"],
    roles: ["Electronics Design Engineer", "Firmware Programmer", "Hardware Test Assistant"]
  },
  {
    name: "BSc Meteorology",
    weight: 86,
    category: "BSc",
    demand: "High Demand",
    description: "Atmospheric thermodynamic dynamics, weather forecast modeling, satellite radar observation, and climate trend analysis.",
    subjects: ["Atmospheric Thermodynamics", "Numerical Weather Forecasting", "Satellite & Radar Meteorology", "Global Climate Change Models"],
    roles: ["Weather Forecaster", "Meteorologist Analyst", "Climate Risk Assessor"]
  },
  // Others
  {
    name: "BSc Material Science",
    weight: 87,
    category: "BSc",
    demand: "High Demand",
    description: "Atomic structures of solids, mechanical properties of polymers, super-conducting alloy designs, and materials testing procedures.",
    subjects: ["Solid State Material Structures", "Polymer Chemistry & Physics", "Superconducting Alloys Design", "Destructive Testing Standards"],
    roles: ["Materials Engineering Tech", "Metallurgical Specialist", "Quality Control Lab Manager"]
  },
  {
    name: "BSc Anthropological Sciences",
    weight: 83,
    category: "BSc",
    demand: "Medium Demand",
    description: "Human evolution biology, skeletal forensic profiling, cultural adaptation anthropology, and archaeological excavation techniques.",
    subjects: ["Human Evolutionary Biology", "Skeletal Forensic Profiling", "Socio-Cultural Adaptations", "Archaeological Methods"],
    roles: ["Forensic Anthropologist Assistant", "Museum Curator Specialist", "Socio-Cultural Field Researcher"]
  },
  {
    name: "BSc Cognitive Science",
    weight: 89,
    category: "BSc",
    demand: "High Demand",
    description: "Human brain information processing models, cognitive psychology research, linguistics analysis, and artificial neural networks logic.",
    subjects: ["Brain Information Processing", "Cognitive Psychology Models", "Computational Linguistics", "Artificial Neural Networks"],
    roles: ["Cognitive Researcher Assistant", "Human-Computer Interaction (HCI) Designer", "AI Training Specialist"]
  },
  {
    name: "BSc Geriatric Care & Wellness",
    weight: 85,
    category: "BSc",
    demand: "High Demand",
    description: "Physical rehabilitation for aging populations, chronic disease management, palliative care strategies, and elderly nutrition plan designs.",
    subjects: ["Aging Human Physiology", "Chronic Disease Management", "Palliative Care Strategies", "Elderly Nutrition Programs"],
    roles: ["Geriatric Wellness Coordinator", "Assisted Living Facility Manager", "Community Health Advisor"]
  }
];
