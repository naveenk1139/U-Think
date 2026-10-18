package com.example.uthink.data

import com.example.uthink.model.*

object DataRepository {

    val streams: List<StreamInfo> = listOf(
        StreamInfo(
            id = "12th_intermediate",
            title = "12th / Intermediate",
            shortDesc = "Traditional 2-year pre-university academic path preparing for competitive entrance exams and degree programs.",
            fullDesc = "Choosing 12th / Intermediate is the premier pathway after 10th grade. It offers specialized streams (Science, Commerce, Arts/Humanities) with targeted subject combinations to prepare you for JEE, NEET, CA, CLAT, or UPSC.",
            durationRange = "2 Years",
            pros = listOf(
                "Prepares directly for premier national entrance tests (JEE, NEET, CLAT)",
                "Maximum flexibility for career pivots and competitive examinations",
                "Prerequisite foundation for professional degrees like B.Tech, MBBS, CA"
            ),
            cons = listOf(
                "No direct job placement immediately after completion",
                "High competition for seats in premier universities",
                "Requires 3 to 5 additional years of undergraduate study"
            ),
            courses = listOf(
                CourseCombination(
                    id = "pcmc",
                    name = "PCMC (Physics, Chemistry, Maths, Computer Science)",
                    code = "PCMC",
                    duration = "2 Years",
                    eligibility = "10th grade pass with minimum 60% in Mathematics and Science.",
                    description = "The premier combination for software engineering, computer science, coding, and technical computation.",
                    branches = listOf("Physics", "Chemistry", "Mathematics", "Computer Science"),
                    careerProspects = listOf("B.E. / B.Tech in CSE / AI", "BCA", "B.Sc Computer Science", "Data Science", "Software Developer"),
                    category = "Science"
                ),
                CourseCombination(
                    id = "pcmb",
                    name = "PCMB (Physics, Chemistry, Maths, Biology)",
                    code = "PCMB",
                    duration = "2 Years",
                    eligibility = "10th grade pass with strong foundation in Science and Algebra.",
                    description = "Double-option stream leaving both Engineering and Medical pathways open. Highly rigorous and versatile.",
                    branches = listOf("Physics", "Chemistry", "Mathematics", "Biology"),
                    careerProspects = listOf("MBBS / BDS", "B.Tech Biotechnology", "Biomedical Engineering", "B.Pharm", "Genetic Research"),
                    category = "Science"
                ),
                CourseCombination(
                    id = "pcme",
                    name = "PCME (Physics, Chemistry, Maths, Electronics)",
                    code = "PCME",
                    duration = "2 Years",
                    eligibility = "10th grade pass with strong interest in hardware circuits and logic.",
                    description = "Focuses on electrical systems, semiconductors, microcontrollers, and circuit designs. Ideal for electronics & robotics.",
                    branches = listOf("Physics", "Chemistry", "Mathematics", "Electronics"),
                    careerProspects = listOf("B.Tech Electronics & Comm (ECE)", "Robotics Engineering", "IoT Specialist", "VLSI Design"),
                    category = "Science"
                ),
                CourseCombination(
                    id = "pcb",
                    name = "PCB (Physics, Chemistry, Biology)",
                    code = "PCB",
                    duration = "2 Years",
                    eligibility = "10th grade pass with high affinity for life sciences.",
                    description = "Dedicated medical and life sciences track. Direct gateway to NEET-UG, clinical research, and allied healthcare.",
                    branches = listOf("Physics", "Chemistry", "Biology", "English"),
                    careerProspects = listOf("MBBS", "BDS", "BAMS", "B.Sc Nursing", "B.Pharm", "Clinical Research"),
                    category = "Science"
                ),
                CourseCombination(
                    id = "ceba",
                    name = "CEBA (Computer Science, Economics, Business Studies, Accountancy)",
                    code = "CEBA",
                    duration = "2 Years",
                    eligibility = "10th grade pass with general numeric and business interest.",
                    description = "Combines corporate accounting, macroeconomics, business models, and computer database software.",
                    branches = listOf("Computer Science", "Economics", "Business Studies", "Accountancy"),
                    careerProspects = listOf("B.Com (IT)", "BBA Fintech", "CA / CMA", "Data Analyst", "Corporate Finance"),
                    category = "Commerce"
                ),
                CourseCombination(
                    id = "seba",
                    name = "SEBA (Statistics, Economics, Business Studies, Accountancy)",
                    code = "SEBA",
                    duration = "2 Years",
                    eligibility = "10th grade pass with logical math abilities.",
                    description = "Focuses on financial bookkeeping, statistical modeling, market research, and corporate auditing.",
                    branches = listOf("Statistics", "Economics", "Business Studies", "Accountancy"),
                    careerProspects = listOf("B.Com Honors", "Actuarial Science", "Chartered Accountant (CA)", "Stock Market Analyst"),
                    category = "Commerce"
                ),
                CourseCombination(
                    id = "heps",
                    name = "HEPS (History, Economics, Political Science, Sociology)",
                    code = "HEPS",
                    duration = "2 Years",
                    eligibility = "10th grade pass with interest in public policy and humanities.",
                    description = "The standard humanities track. Deeply covers civil governance, state mechanisms, economic distribution, and societal structures.",
                    branches = listOf("History", "Economics", "Political Science", "Sociology"),
                    careerProspects = listOf("BA Public Policy", "Integrated LLB (5 Years)", "Civil Services (UPSC / State PSC)", "Journalism"),
                    category = "Arts"
                ),
                CourseCombination(
                    id = "jpe",
                    name = "JPE (Journalism, Psychology, English Literature)",
                    code = "JPE",
                    duration = "2 Years",
                    eligibility = "10th grade pass with creative writing and communication skills.",
                    description = "Creative arts track blending news reporting, human behavioral psychology, and classical literature.",
                    branches = listOf("Journalism", "Psychology", "English Literature"),
                    careerProspects = listOf("BA Journalism & Mass Media", "B.Sc Clinical Psychology", "Public Relations Lead", "Content Creator"),
                    category = "Arts"
                )
            )
        ),
        StreamInfo(
            id = "diploma",
            title = "Polytechnic Diploma",
            shortDesc = "Direct, hands-on 3-year technical and engineering programs with lateral entry to 2nd year B.Tech.",
            fullDesc = "Polytechnic Diplomas offer immediate practical engineering labs and industry-aligned skill building. Graduates can join companies as Junior Engineers or take direct lateral entry into the 2nd year of Engineering degrees.",
            durationRange = "3 Years",
            pros = listOf(
                "Immediate hands-on engineering lab work right after 10th",
                "Direct lateral admission into the 2nd year of B.Tech / B.E.",
                "Eligible for Junior Engineer posts in Railways, PSUs, and defense organizations"
            ),
            cons = listOf(
                "Requires early specialization selection at age 15-16",
                "Starting salary initially lower than 4-year degree graduates"
            ),
            courses = listOf(
                CourseCombination(
                    id = "dip_cse",
                    name = "Diploma in Computer Science & Engineering",
                    code = "DCSE",
                    duration = "3 Years",
                    eligibility = "10th grade pass with Mathematics and Science.",
                    description = "Industry training in software development, web frameworks, Linux system administration, and computer networks.",
                    branches = listOf("Data Structures", "Web Technologies", "Operating Systems", "Networking", "Database Systems"),
                    careerProspects = listOf("Junior Software Engineer", "Lateral B.Tech CSE", "Network Admin", "Frontend Developer"),
                    category = "Engineering"
                ),
                CourseCombination(
                    id = "dip_mech",
                    name = "Diploma in Mechanical Engineering",
                    code = "DME",
                    duration = "3 Years",
                    eligibility = "10th grade pass with Science and Math.",
                    description = "Covers CAD modeling, CNC machinery, thermodynamics, manufacturing automation, and industrial hydraulics.",
                    branches = listOf("Manufacturing Process", "Thermodynamics", "CAD/CAM", "Fluid Mechanics"),
                    careerProspects = listOf("Junior Mechanical Engineer", "Plant Supervisor", "Automotive Assembly Specialist", "Lateral B.Tech Mech"),
                    category = "Engineering"
                ),
                CourseCombination(
                    id = "dip_civil",
                    name = "Diploma in Civil Engineering",
                    code = "DCE",
                    duration = "3 Years",
                    eligibility = "10th grade pass.",
                    description = "Practical surveying, construction material testing, structural blueprints, and site supervision protocols.",
                    branches = listOf("Surveying", "Building Materials", "Structural Mechanics", "AutoCAD Civil"),
                    careerProspects = listOf("Site Engineer Assistant", "Surveyor", "PWD Contractor", "Lateral B.Tech Civil"),
                    category = "Engineering"
                ),
                CourseCombination(
                    id = "dip_pharm",
                    name = "Diploma in Pharmacy (D.Pharm)",
                    code = "D.Pharm",
                    duration = "2 Years",
                    eligibility = "10th pass or 12th Science pass.",
                    description = "Covers drug formulations, dosage dispensing, clinical pharmacology, and hospital pharmacy inventory management.",
                    branches = listOf("Pharmaceutics", "Pharmacology", "Biochemistry", "Drug Store Management"),
                    careerProspects = listOf("Licensed Retail Pharmacist", "Hospital Drug Dispensary Officer", "Medical Sales Representative"),
                    category = "Medical Support"
                )
            )
        ),
        StreamInfo(
            id = "iti",
            title = "ITI Vocational Crafts",
            shortDesc = "Intensive 1 to 2-year practical craftsman trade courses with rapid job placement.",
            fullDesc = "Industrial Training Institutes (ITIs) specialize in high-demand industrial trades. With 80% focus on practical workshops, students gain fast entry into public sector manufacturing, railways, power grids, or self-employment.",
            durationRange = "1 - 2 Years",
            pros = listOf(
                "Shortest training duration with lowest educational costs",
                "80% practical workshop and tooling experience",
                "Strong self-employment, apprenticeship, and PSU technician opportunities"
            ),
            cons = listOf(
                "Primarily physical and technician-grade roles",
                "Further academic upgrades required for high managerial positions"
            ),
            courses = listOf(
                CourseCombination(
                    id = "iti_elec",
                    name = "ITI Electrician",
                    code = "ELEC",
                    duration = "2 Years",
                    eligibility = "10th pass with Science and Mathematics.",
                    description = "Comprehensive mastery of electrical cabling, transformers, industrial switchgear, motor rewinding, and solar grid safety.",
                    branches = listOf("Wiring Systems", "AC/DC Motors", "Transformer Maintenance", "Substation Safety"),
                    careerProspects = listOf("State Power Grid Lineman", "Industrial Electrical Technician", "Licensed Contractor", "Railways Loco Tech"),
                    category = "Electrical"
                ),
                CourseCombination(
                    id = "iti_fitter",
                    name = "ITI Fitter",
                    code = "FITTER",
                    duration = "2 Years",
                    eligibility = "10th pass with Mathematics.",
                    description = "Teaches high-precision metal sizing, lathe turning, assembly drawings, pneumatic joints, and machinery repair.",
                    branches = listOf("Bench Work", "Lathe Operations", "Pneumatics", "Component Fabrication"),
                    careerProspects = listOf("Locomotive Workshop Fitter", "Factory Assembly Technician", "Tool Room Specialist"),
                    category = "Mechanical"
                ),
                CourseCombination(
                    id = "iti_copa",
                    name = "ITI COPA (Computer Operator & Programming Assistant)",
                    code = "COPA",
                    duration = "1 Year",
                    eligibility = "10th pass from any recognized board.",
                    description = "Essential training in office automation, SQL queries, spreadsheet analytics, cybersecurity basics, and hardware troubleshooting.",
                    branches = listOf("Office Automation", "Database Management", "HTML/CSS Basics", "Hardware Maintenance"),
                    careerProspects = listOf("Data Entry Operator", "IT Helpdesk Specialist", "Digital Service Center Operator"),
                    category = "Information Tech"
                ),
                CourseCombination(
                    id = "iti_solar",
                    name = "ITI Solar Technician",
                    code = "SOLAR",
                    duration = "1 Year",
                    eligibility = "10th pass.",
                    description = "Installation, testing, and maintenance of rooftop photovoltaic systems, solar inverters, battery storage, and solar pumps.",
                    branches = listOf("PV Panel Wiring", "Inverter Systems", "Battery Banks", "Grid Connections"),
                    careerProspects = listOf("Rooftop Solar Specialist", "Green Energy Field Technician", "Solar Plant Maintenance Lead"),
                    category = "Renewable Energy"
                )
            )
        ),
        StreamInfo(
            id = "paramedical",
            title = "Paramedical Courses",
            shortDesc = "Critical diagnostic, laboratory, and hospital technical support programs in healthcare.",
            fullDesc = "Paramedical professionals operate the diagnostic backbones of modern medical centers. In 2 years, students master medical laboratory diagnostics, radiology imaging, dialysis procedures, or cardiac life-support instrumentation.",
            durationRange = "2 - 3 Years",
            pros = listOf(
                "Immediate demand across government and private hospitals",
                "High job stability in essential healthcare infrastructure",
                "Direct clinical patient-care and diagnostic impact"
            ),
            cons = listOf(
                "Involves shift work and hospital emergency environment",
                "Strict hygiene and clinical compliance standards required"
            ),
            courses = listOf(
                CourseCombination(
                    id = "paramed_dmlt",
                    name = "Diploma in Medical Laboratory Technology (DMLT)",
                    code = "DMLT",
                    duration = "2 Years",
                    eligibility = "10th pass with Science subjects.",
                    description = "Teaches clinical blood testing, pathology staining, microbiology cultures, hematology analyzers, and biochemical diagnostics.",
                    branches = listOf("Hematology", "Clinical Pathology", "Microbiology", "Biochemistry Analyzers"),
                    careerProspects = listOf("Medical Lab Technologist", "Diagnostic Center Lead", "Blood Bank Specialist"),
                    category = "Diagnostics"
                ),
                CourseCombination(
                    id = "paramed_radio",
                    name = "Diploma in X-Ray & Radiology Technology",
                    code = "DXRT",
                    duration = "2 Years",
                    eligibility = "10th pass with Science.",
                    description = "Training on digital X-ray equipment, CT scan positioning, radiation protection guidelines, and ultrasound documentation.",
                    branches = listOf("Radiographic Techniques", "Radiation Safety", "Image Processing", "Darkroom Tech"),
                    careerProspects = listOf("Radiology Technician", "CT/MRI Operator Assistant", "Hospital Imaging Executive"),
                    category = "Imaging"
                ),
                CourseCombination(
                    id = "paramed_dialysis",
                    name = "Diploma in Dialysis Technology",
                    code = "DDT",
                    duration = "2 Years",
                    eligibility = "10th pass with Science.",
                    description = "Operation and monitoring of hemodialysis units, dialyzer reprocessing, fluid dynamics, and renal patient care.",
                    branches = listOf("Renal Physiology", "Hemodialysis Machines", "Vascular Access", "Patient Monitoring"),
                    careerProspects = listOf("Dialysis Technologist", "Nephrology Unit Technician", "Renal Care Coordinator"),
                    category = "Clinical Support"
                )
            )
        ),
        StreamInfo(
            id = "vocational",
            title = "Vocational & Skill Programs",
            shortDesc = "Industry-certified courses in design, hospitality, media, and digital services.",
            fullDesc = "Vocational courses offer specialized skill certifications under the National Skills Qualifications Framework (NSQF). They bridge education directly with modern commercial sectors like animation, culinary arts, fashion, and digital commerce.",
            durationRange = "1 - 3 Years",
            pros = listOf(
                "Strong alignment with modern creative and service industries",
                "Portfolio-based assessment rather than rote exams",
                "Direct pathways into entrepreneurship and freelance work"
            ),
            cons = listOf(
                "Requires building a competitive personal portfolio"
            ),
            courses = listOf(
                CourseCombination(
                    id = "voc_design",
                    name = "Diploma in UI/UX & Graphic Design",
                    code = "DUX",
                    duration = "1 - 2 Years",
                    eligibility = "10th pass with creative interest.",
                    description = "Teaches user experience research, wireframing, Figma design tools, visual branding, typography, and motion design.",
                    branches = listOf("Figma & Design Systems", "User Research", "Visual Branding", "Motion Graphics"),
                    careerProspects = listOf("UI/UX Designer", "Product Designer", "Brand Visualizer", "Freelance Creative Lead"),
                    category = "Design"
                ),
                CourseCombination(
                    id = "voc_culinary",
                    name = "Diploma in Food Production & Culinary Arts",
                    code = "DFP",
                    duration = "1 - 2 Years",
                    eligibility = "10th pass.",
                    description = "Professional culinary techniques, bakery arts, kitchen HACCP hygiene standards, menu costing, and banquet catering operations.",
                    branches = listOf("Continental & Indian Cuisine", "Bakery Arts", "Food Safety & HACCP", "Kitchen Operations"),
                    careerProspects = listOf("Commis Chef", "Pastry Specialist", "Catering Manager", "Food Entrepreneur"),
                    category = "Hospitality"
                )
            )
        )
    )

    val entranceExams: List<EntranceExam> = listOf(
        EntranceExam(
            id = "jee-main",
            name = "JEE Main",
            conductingBody = "National Testing Agency (NTA)",
            purpose = "Admission to NITs, IIITs, CFTIs, and qualifying screening for JEE Advanced.",
            category = "Engineering",
            level = "National",
            eligibility = "10+2 with Physics, Chemistry, and Mathematics (PCM).",
            pattern = "Computer-Based Test (MCQs + Numerical Value Questions in PCM).",
            applicationMonth = "November & January (2 Sessions)",
            website = "https://jeemain.nta.nic.in"
        ),
        EntranceExam(
            id = "jee-adv",
            name = "JEE Advanced",
            conductingBody = "IIT (Rotating Zonal Institute)",
            purpose = "Exclusive gateway to undergraduate programs across all 23 IITs.",
            category = "Engineering",
            level = "National",
            eligibility = "Top 2,50,000 qualifiers from JEE Main with Physics, Chemistry, Maths.",
            pattern = "Two mandatory 3-hour computer-based papers with analytical problem solving.",
            applicationMonth = "April / May",
            website = "https://jeeadv.ac.in"
        ),
        EntranceExam(
            id = "neet-ug",
            name = "NEET-UG",
            conductingBody = "National Testing Agency (NTA)",
            purpose = "Single national entrance exam for MBBS, BDS, BAMS, BHMS, and veterinary seats in India.",
            category = "Medical",
            level = "National",
            eligibility = "10+2 with Physics, Chemistry, Biology (PCB) with minimum 50% aggregate.",
            pattern = "Pen-and-Paper (OMR) test with 180 questions across Physics, Chemistry, Botany, and Zoology.",
            applicationMonth = "February / March",
            website = "https://neet.nta.nic.in"
        ),
        EntranceExam(
            id = "bitsat",
            name = "BITSAT",
            conductingBody = "BITS Pilani",
            purpose = "Admission to integrated first-degree programs at BITS Pilani, Goa, and Hyderabad campuses.",
            category = "Engineering",
            level = "National",
            eligibility = "10+2 with minimum 75% aggregate in PCM and 60% in each subject.",
            pattern = "Online test covering Physics, Chemistry, Maths, English Proficiency, and Logical Reasoning.",
            applicationMonth = "January / February",
            website = "https://bitsadmission.com"
        ),
        EntranceExam(
            id = "kcet",
            name = "KCET (Karnataka CET)",
            conductingBody = "Karnataka Examinations Authority (KEA)",
            purpose = "Admission to engineering, technology, pharmacy, and agriculture courses in Karnataka colleges.",
            category = "Engineering",
            level = "State",
            eligibility = "10+2 with Physics, Chemistry, Mathematics (PCM) or Biology (PCB).",
            pattern = "Offline OMR papers in Physics, Chemistry, and Mathematics/Biology.",
            applicationMonth = "January / February",
            website = "https://cetonline.karnataka.gov.in/kea"
        ),
        EntranceExam(
            id = "nda",
            name = "NDA & NA Exam",
            conductingBody = "Union Public Service Commission (UPSC)",
            purpose = "Officer cadets recruitment into Army, Navy, and Air Force wings of National Defence Academy.",
            category = "Defence",
            level = "National",
            eligibility = "10+2 passed (PCM compulsory for Navy and Air Force; any stream for Army).",
            pattern = "Written exam (Mathematics + General Ability Test) followed by 5-day SSB interview.",
            applicationMonth = "December & May (Held twice a year)",
            website = "https://upsc.gov.in"
        ),
        EntranceExam(
            id = "clat",
            name = "CLAT (Common Law Admission Test)",
            conductingBody = "Consortium of National Law Universities (NLUs)",
            purpose = "Gateway to 5-year integrated law degrees (BA LLB, BBA LLB) at 24 premier NLUs.",
            category = "Law",
            level = "National",
            eligibility = "10+2 from any stream with minimum 45% marks.",
            pattern = "Comprehension-based questions on English, Current Affairs, Legal Reasoning, Logical Reasoning, and Quant.",
            applicationMonth = "July - October",
            website = "https://consortiumofnlus.ac.in"
        ),
        EntranceExam(
            id = "cuet-ug",
            name = "CUET-UG",
            conductingBody = "National Testing Agency (NTA)",
            purpose = "Single window admission to all Central Universities (DU, BHU, JNU, etc.) for undergraduate degrees.",
            category = "Central Universities",
            level = "National",
            eligibility = "10+2 from any recognized educational board.",
            pattern = "Computer-Based Test in language test, domain subjects, and general aptitude.",
            applicationMonth = "February / March",
            website = "https://exams.nta.ac.in/CUET-UG"
        )
    )

    val degrees: List<DegreeInfo> = listOf(
        DegreeInfo(
            id = "btech-cse",
            name = "B.Tech CSE",
            fullName = "Bachelor of Technology in Computer Science & Engineering",
            field = "Engineering",
            duration = "4 Years",
            eligibility = "10+2 with PCM + Entrance Exam (JEE Main / State CET).",
            topCareers = listOf("Software Engineer", "Cloud Architect", "Full Stack Developer", "Systems Engineer")
        ),
        DegreeInfo(
            id = "btech-aiml",
            name = "B.Tech AI & ML",
            fullName = "Bachelor of Technology in Artificial Intelligence & Machine Learning",
            field = "Engineering",
            duration = "4 Years",
            eligibility = "10+2 with PCM + Entrance Exam.",
            topCareers = listOf("AI Engineer", "Machine Learning Specialist", "Data Scientist", "NLP Researcher")
        ),
        DegreeInfo(
            id = "mbbs",
            name = "MBBS",
            fullName = "Bachelor of Medicine & Bachelor of Surgery",
            field = "Medical & Health",
            duration = "5.5 Years (Incl. 1 Year Internship)",
            eligibility = "10+2 with PCB + Qualifying NEET-UG score.",
            topCareers = listOf("General Physician", "Surgeon (Post MD/MS)", "Medical Officer", "Clinical Researcher")
        ),
        DegreeInfo(
            id = "bds",
            name = "BDS",
            fullName = "Bachelor of Dental Surgery",
            field = "Medical & Health",
            duration = "5 Years",
            eligibility = "10+2 with PCB + NEET-UG.",
            topCareers = listOf("Dentist", "Orthodontist (Post MDS)", "Dental Surgeon", "Oral Health Consultant")
        ),
        DegreeInfo(
            id = "bcom-hons",
            name = "B.Com (Honours)",
            fullName = "Bachelor of Commerce with Honours",
            field = "Commerce & Management",
            duration = "3 - 4 Years",
            eligibility = "10+2 with Commerce / Math subjects.",
            topCareers = listOf("Financial Analyst", "Chartered Accountant (CA track)", "Tax Consultant", "Investment Banker")
        ),
        DegreeInfo(
            id = "bba",
            name = "BBA",
            fullName = "Bachelor of Business Administration",
            field = "Commerce & Management",
            duration = "3 Years",
            eligibility = "10+2 in any stream from recognized board.",
            topCareers = listOf("Business Operations Lead", "Marketing Executive", "HR Coordinator", "Management Consultant")
        ),
        DegreeInfo(
            id = "ballb",
            name = "BA LLB (Integrated)",
            fullName = "Integrated Bachelor of Arts and Bachelor of Laws",
            field = "Law",
            duration = "5 Years",
            eligibility = "10+2 in any stream + CLAT / LSAT / AILET.",
            topCareers = listOf("Corporate Lawyer", "Litigation Advocate", "Legal Advisor", "Judicial Officer")
        ),
        DegreeInfo(
            id = "bdes",
            name = "B.Des",
            fullName = "Bachelor of Design",
            field = "Design & Media",
            duration = "4 Years",
            eligibility = "10+2 in any stream + UCEED / NID DAT / NIFT.",
            topCareers = listOf("Product Designer", "UI/UX Designer", "Automotive Stylist", "Fashion Designer")
        ),
        DegreeInfo(
            id = "bvoc-it",
            name = "B.Voc Software Dev",
            fullName = "Bachelor of Vocation in Software Development",
            field = "Vocational",
            duration = "3 Years",
            eligibility = "10+2 in any stream.",
            topCareers = listOf("Junior Web Developer", "Application Tester", "Technical Support Lead")
        )
    )

    val colleges: List<CollegeInfo> = listOf(
        CollegeInfo(
            id = "iit-b",
            name = "Indian Institute of Technology (IIT Bombay)",
            location = "Mumbai, Maharashtra",
            type = "Government (Institute of National Importance)",
            stream = "Engineering & Technology",
            approxFeesPerYear = "₹2,20,000 / year",
            rating = 4.9,
            nirfRank = 3,
            featuredCourses = listOf("B.Tech Computer Science", "B.Tech Electrical", "B.Tech Mechanical", "Dual Degree AI")
        ),
        CollegeInfo(
            id = "iit-m",
            name = "Indian Institute of Technology (IIT Madras)",
            location = "Chennai, Tamil Nadu",
            type = "Government (Institute of National Importance)",
            stream = "Engineering & Technology",
            approxFeesPerYear = "₹2,15,000 / year",
            rating = 4.9,
            nirfRank = 1,
            featuredCourses = listOf("B.Tech Aerospace", "B.Tech Data Science", "B.Tech Computer Science")
        ),
        CollegeInfo(
            id = "aiims-d",
            name = "All India Institute of Medical Sciences (AIIMS)",
            location = "New Delhi",
            type = "Government (Premier Apex Medical)",
            stream = "Medical Sciences",
            approxFeesPerYear = "₹1,628 / year (Subsidized)",
            rating = 5.0,
            nirfRank = 1,
            featuredCourses = listOf("MBBS", "B.Sc Nursing", "M.D. / M.S. Specializations")
        ),
        CollegeInfo(
            id = "bits-p",
            name = "Birla Institute of Technology and Science (BITS)",
            location = "Pilani, Rajasthan",
            type = "Private (Deemed University)",
            stream = "Engineering & Sciences",
            approxFeesPerYear = "₹5,40,000 / year",
            rating = 4.8,
            nirfRank = 20,
            featuredCourses = listOf("B.E. Computer Science", "B.E. Electrical", "M.Sc Economics Dual")
        ),
        CollegeInfo(
            id = "rvce-b",
            name = "R.V. College of Engineering (RVCE)",
            location = "Bengaluru, Karnataka",
            type = "Private (Autonomous)",
            stream = "Engineering & Technology",
            approxFeesPerYear = "₹2,50,000 / year (State Quota)",
            rating = 4.7,
            nirfRank = 96,
            featuredCourses = listOf("B.E. CSE", "B.E. AI & ML", "B.E. Electronics & Communication")
        ),
        CollegeInfo(
            id = "nlu-b",
            name = "National Law School of India University (NLSIU)",
            location = "Bengaluru, Karnataka",
            type = "Government (National Law University)",
            stream = "Law",
            approxFeesPerYear = "₹3,50,000 / year",
            rating = 4.9,
            nirfRank = 1,
            featuredCourses = listOf("BA LLB (Hons)", "LLM", "Public Policy")
        )
    )

    val jobRoles: List<JobRole> = listOf(
        JobRole(
            id = "job-ai-engineer",
            title = "AI / Machine Learning Engineer",
            sector = "Information Technology",
            averageSalary = "₹8,00,000 - ₹24,00,000 / year",
            growthPotential = "Very High",
            entryBarrier = "High",
            recommendedPathways = listOf("12th Science (PCMC)", "B.Tech CSE / AI & ML", "M.Tech / Self-Learning"),
            keySkills = listOf("Python", "Deep Learning", "TensorFlow / PyTorch", "Linear Algebra", "LLMs & GenAI"),
            description = "Builds algorithmic models, generative AI integrations, neural network reasoning pipelines, and automated intelligence systems."
        ),
        JobRole(
            id = "job-fullstack",
            title = "Full Stack Software Developer",
            sector = "Software Development",
            averageSalary = "₹6,00,000 - ₹18,00,000 / year",
            growthPotential = "High",
            entryBarrier = "Medium",
            recommendedPathways = listOf("12th Science (PCMC / CEBA)", "Polytechnic Diploma CSE", "B.Tech CSE / BCA"),
            keySkills = listOf("React", "Kotlin / TypeScript", "Node.js", "SQL & NoSQL", "Cloud DevOps"),
            description = "Designs, builds, and deploys high-scale web and mobile applications from intuitive frontends to reliable databases."
        ),
        JobRole(
            id = "job-doctor",
            title = "General Medical Physician / Specialist",
            sector = "Healthcare",
            averageSalary = "₹10,00,000 - ₹35,00,000 / year",
            growthPotential = "Very High",
            entryBarrier = "High",
            recommendedPathways = listOf("12th Science (PCB / PCMB)", "NEET-UG Exam", "MBBS Degree", "MD / MS Specialization"),
            keySkills = listOf("Clinical Diagnosis", "Patient Care", "Emergency Medicine", "Pharmacotherapy", "Surgical Basics"),
            description = "Diagnoses patient diseases, prescribes therapeutic and preventive care, oversees emergency treatments, and conducts healthcare trials."
        ),
        JobRole(
            id = "job-chartered-accountant",
            title = "Chartered Accountant (CA)",
            sector = "Finance & Auditing",
            averageSalary = "₹9,00,000 - ₹25,00,000 / year",
            growthPotential = "High",
            entryBarrier = "High",
            recommendedPathways = listOf("12th Commerce (SEBA / CEBA)", "ICAI Foundation", "B.Com", "ICAI Articleship"),
            keySkills = listOf("Corporate Auditing", "Taxation Laws", "Financial Reporting", "Risk Governance", "GST Compliance"),
            description = "Manages corporate fiscal audits, oversees taxation strategies, evaluates corporate compliance, and provides executive investment counsel."
        ),
        JobRole(
            id = "job-ui-ux",
            title = "Product & UI/UX Designer",
            sector = "Design & Tech",
            averageSalary = "₹6,00,000 - ₹16,00,000 / year",
            growthPotential = "High",
            entryBarrier = "Medium",
            recommendedPathways = listOf("12th Any Stream", "Vocational Design Diploma", "B.Des Degree", "Design Portfolio"),
            keySkills = listOf("Figma", "User Journey Mapping", "Prototyping", "Interaction Design", "Usability Testing"),
            description = "Crafts intuitive digital interfaces, conducts user behavior interviews, and builds responsive component design systems."
        ),
        JobRole(
            id = "job-solar-technician",
            title = "Renewable Energy / Solar Plant Specialist",
            sector = "Clean Energy",
            averageSalary = "₹3,50,000 - ₹7,50,000 / year",
            growthPotential = "Very High",
            entryBarrier = "Low",
            recommendedPathways = listOf("10th Pass", "ITI Solar / Electrician", "Polytechnic Electrical"),
            keySkills = listOf("Solar PV Arrays", "Inverters & Transformers", "Grid Synchronization", "Industrial Safety HSE"),
            description = "Installs commercial and residential rooftop solar arrays, conducts inverter diagnostics, and maintains clean energy outputs."
        )
    )

    val aptitudeQuestions: List<AptitudeQuestion> = listOf(
        AptitudeQuestion(
            id = 1,
            question = "When faced with an intricate real-world problem, which approach excites you the most?",
            category = "Logical & Analytical",
            options = listOf(
                QuizOption("Writing algorithmic code or constructing mathematical formulas to calculate an exact answer", mapOf("science" to 3, "diploma" to 2)),
                QuizOption("Analyzing balance sheets, market dynamics, and calculating profit margins", mapOf("commerce" to 3)),
                QuizOption("Debating societal impacts, human rights, policies, or writing narrative stories", mapOf("arts" to 3)),
                QuizOption("Opening the machine casing to inspect the physical wires, gears, and circuitry", mapOf("iti" to 3, "diploma" to 2)),
                QuizOption("Investigating biological specimens, human vitals, or clinical symptoms", mapOf("paramedical" to 3, "science" to 1))
            )
        ),
        AptitudeQuestion(
            id = 2,
            question = "If you had a free weekend to complete a self-chosen project, what would you create?",
            category = "Creative & Practical",
            options = listOf(
                QuizOption("A mobile app, a website, or a physics simulation program", mapOf("science" to 3, "diploma" to 2)),
                QuizOption("A micro-business plan or tracking stock movements on an Excel spreadsheet", mapOf("commerce" to 3)),
                QuizOption("An investigative article, short film script, or creative graphic design", mapOf("arts" to 3)),
                QuizOption("Assembling a custom mechanical robot, woodwork piece, or home electrical automation switch", mapOf("iti" to 3, "diploma" to 2)),
                QuizOption("Volunteering in a community first-aid camp or health diagnostics drive", mapOf("paramedical" to 3))
            )
        ),
        AptitudeQuestion(
            id = 3,
            question = "What subject did you genuinely enjoy the most during your 10th school exams?",
            category = "Academic Affinity",
            options = listOf(
                QuizOption("Mathematics & Physics (equations, forces, problem solving)", mapOf("science" to 3, "diploma" to 2)),
                QuizOption("Commercial Mathematics & Social Economics (money, banking, business concepts)", mapOf("commerce" to 3)),
                QuizOption("History, Civics, English Literature (essays, constitution, world events)", mapOf("arts" to 3)),
                QuizOption("Hands-on Science Labs, drawing diagrams, workshop craft tools", mapOf("diploma" to 3, "iti" to 2)),
                QuizOption("Biology & Life Sciences (human body anatomy, botany, cells)", mapOf("science" to 2, "paramedical" to 3))
            )
        ),
        AptitudeQuestion(
            id = 4,
            question = "What is your main timeline and career goal after finishing school?",
            category = "Career Timeline",
            options = listOf(
                QuizOption("Study 4-5 rigorous years in university for high-paying engineering or medical degrees", mapOf("science" to 3)),
                QuizOption("Establish a solid foundation in finance, corporate consulting, or family business within 3-4 years", mapOf("commerce" to 3)),
                QuizOption("Build a creative or civil services career (law, public service, media, writing)", mapOf("arts" to 3)),
                QuizOption("Get practical engineering skills fast and join the industry or lateral entry into B.Tech in 3 years", mapOf("diploma" to 3)),
                QuizOption("Gain hands-on certified craft skills in 1-2 years and start earning right away", mapOf("iti" to 3, "paramedical" to 2))
            )
        ),
        AptitudeQuestion(
            id = 5,
            question = "Which work environment do you envision yourself thriving in?",
            category = "Work Environment",
            options = listOf(
                QuizOption("Tech campus, research lab, or high-end computer workstation", mapOf("science" to 3)),
                QuizOption("Corporate boardroom, stock exchange desk, or banking office", mapOf("commerce" to 3)),
                QuizOption("Courtroom, media newsroom, publishing house, or civil administrative office", mapOf("arts" to 3)),
                QuizOption("Industrial manufacturing shop floor, engineering project site, or power plant", mapOf("diploma" to 2, "iti" to 3)),
                QuizOption("Hospital diagnostic center, pathology lab, or clinical emergency room", mapOf("paramedical" to 3))
            )
        )
    )

    fun calculateResult(scores: Map<String, Int>): AssessmentResult {
        val topTrack = scores.maxByOrNull { it.value }?.key ?: "science"
        val total = scores.values.sum().coerceAtLeast(1)
        val percentage = ((scores[topTrack] ?: 1) * 100) / total

        return when (topTrack) {
            "science" -> AssessmentResult(
                dominantTrack = "12th Science",
                trackTitle = "Science & Engineering / Medical Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "Your answers show sharp analytical logic, affinity for quantitative concepts, and scientific inquiry. You are well-suited for professional degree paths like Computer Engineering, AI, or Medicine.",
                topRecommendedStreams = listOf("12th Science (PCMC)", "12th Science (PCMB)", "12th Science (PCME)"),
                topDegrees = listOf("B.Tech in Computer Science / AI", "MBBS / BDS", "B.Tech Robotics", "B.Sc Data Science"),
                topCareers = listOf("AI Engineer", "Software Developer", "Physician", "Data Scientist")
            )
            "commerce" -> AssessmentResult(
                dominantTrack = "12th Commerce",
                trackTitle = "Commerce, Finance & Business Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "You display natural business acumen, numerical aptitude, and strategic financial reasoning. You will excel in corporate accounting, fintech, capital markets, and corporate governance.",
                topRecommendedStreams = listOf("12th Commerce (SEBA)", "12th Commerce (CEBA)", "12th Commerce (ABMS)"),
                topDegrees = listOf("B.Com (Honours)", "BBA Fintech", "CA Professional Track", "Actuarial Science"),
                topCareers = listOf("Chartered Accountant", "Financial Analyst", "Investment Banker", "Corporate Strategist")
            )
            "arts" -> AssessmentResult(
                dominantTrack = "12th Arts / Humanities",
                trackTitle = "Humanities, Law & Public Policy Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "Your mindset leans strongly towards social reasoning, articulate communication, critical world perspectives, and legal ethics. Perfect for law, journalism, civil services, and media.",
                topRecommendedStreams = listOf("12th Arts (HEPS)", "12th Arts (JPE)", "12th Arts (HEPP)"),
                topDegrees = listOf("Integrated BA LLB (5 Years)", "BA Journalism & Mass Media", "BA Public Policy", "B.Des"),
                topCareers = listOf("Corporate Lawyer", "Civil Services Officer (UPSC)", "Journalist", "Public Policy Advisor")
            )
            "diploma" -> AssessmentResult(
                dominantTrack = "Polytechnic Diploma",
                trackTitle = "Applied Polytechnic Engineering Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "You prefer hands-on technical labs and applied engineering systems. Polytechnic Diplomas offer the quickest bridge to technical mastery with the option of lateral entry into 2nd year B.Tech.",
                topRecommendedStreams = listOf("Diploma in Computer Engineering", "Diploma in Mechanical", "Diploma in Civil"),
                topDegrees = listOf("Lateral B.Tech 2nd Year", "Diploma in Computer Science", "Diploma in Robotics"),
                topCareers = listOf("Junior Engineer", "CAD Designer", "Technical Support Lead", "Site Supervisor")
            )
            "iti" -> AssessmentResult(
                dominantTrack = "ITI Craftsman Trades",
                trackTitle = "Practical Craftsman & Technical Trades Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "You thrive with tactile, physical craftsmanship and immediate practical skills. ITI trades provide the shortest path to employment in public sectors, railways, power grids, and entrepreneurship.",
                topRecommendedStreams = listOf("ITI Electrician", "ITI Fitter", "ITI Solar Technician", "ITI COPA"),
                topDegrees = listOf("National Trade Certificate (NTC)", "Apprenticeship Certification"),
                topCareers = listOf("Power Grid Lineman", "Solar Technician", "Machinery Specialist", "Loco Technician")
            )
            else -> AssessmentResult(
                dominantTrack = "Paramedical Diagnostic",
                trackTitle = "Paramedical & Clinical Support Track",
                scorePercentage = percentage.coerceIn(55, 96),
                analysis = "You are drawn to health diagnostics, hospital support, and clinical care. Paramedical courses get you certified inside modern hospital laboratories and imaging centers in 2 years.",
                topRecommendedStreams = listOf("Diploma in Medical Lab Tech (DMLT)", "Diploma in Radiology", "Diploma in Dialysis"),
                topDegrees = listOf("B.Sc Medical Laboratory Technology", "DMLT Diploma", "B.Sc Imaging Tech"),
                topCareers = listOf("Medical Lab Technologist", "Radiology Technician", "Dialysis Specialist")
            )
        }
    }
}
