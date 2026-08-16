import React, { useState } from 'react';
import { STREAMS_DATA } from '../data';
import { StreamType, CourseDetail } from '../types';
import { ENGINEERING_SPECIALIZATIONS_DATABASE, SpecializationInfo } from '../data/engineeringSpecializations';
import { getCareerProfileDetails } from '../careerDetails';
import { BookOpen, Calendar, HelpCircle, GraduationCap, CheckCircle2, ChevronRight, Minimize2, ListFilter, Sparkles, ArrowRight, Milestone, TrendingUp, ExternalLink, Layers, Award, ShieldCheck, Clock, Briefcase, School, Coins, ArrowUpRight, Search, Filter, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSavedPathways } from '../hooks/useSavedPathways';

// Dynamic helper to construct structured high-level "Next Steps" roadmap towards elite college degrees and career destinations
function getRoadmapForCourse(courseName: string, streamId: string) {
  const name = courseName.toUpperCase();
  const sid = streamId;

  // Science Combinations
  if (sid === '12th_intermediate') {
    if (name.includes('PCMC')) {
      return {
        step1Title: "Immediate Milestones & National Entrance Exams",
        step1Desc: "Secure high scores in state and national technological entrance examinations right after Class 12.",
        step1Milestones: ["JEE Main & Advanced", "KCET / COMEDK", "BITSAT / VITEEE", "State CETs"],
        step2Title: "Recommended Undergraduate Degrees",
        step2Desc: "Step into elite technology and software engineering undergraduate degrees directly after your intermediate course.",
        step2Milestones: ["B.E. / B.Tech in Computer Science & Engineering", "B.Tech in Artificial Intelligence & Machine Learning (AI-ML)", "BCA (Bachelor of Computer Applications)", "B.Sc in Data Science / Cloud Computing"],
        step3Title: "Postgraduate & Global Specialization",
        step3Desc: "Hone deep domain expertise with high-intensity postgraduate and professional certifications.",
        step3Milestones: ["M.Tech in Software Engineering / AI", "MS in Computer Science (U.S./Europe)", "MCA (Master of Computer Applications)", "MBA in Technology Management"],
        step4Title: "Peak Career Destination",
        step4Desc: "The ultimate corporate, research, or executive leadership role matching this technical stream.",
        step4Milestones: ["Principal Software Architect", "Lead AI/ML Researcher", "Chief Technology Officer (CTO)", "Senior Cloud Security Engineer"]
      };
    }
    if (name.includes('PCME')) {
      return {
        step1Title: "Immediate Milestones & Electronics Entrance Exams",
        step1Desc: "Focus on electronic engineering, technical entrance syllabi, and logical reasoning tests.",
        step1Milestones: ["JEE Main", "KCET / COMEDK", "BITSAT Engineering Exams", "Viteee Electronics Tests"],
        step2Title: "Recommended Undergraduate Degrees",
        step2Desc: "Target core circuit sciences, hardware architectures, robotics, and computational systems.",
        step2Milestones: ["B.E. / B.Tech in Electronics & Communication Engineering (ECE)", "B.E. / B.Tech in Electrical & Electronics Engineering (EEE)", "B.Tech in Robotics & IoT Automation", "B.Sc (Hons) in Electronics & Instrumentation"],
        step3Title: "Postgraduate Specializations",
        step3Desc: "Pursue advanced core micro-architecture research and hardware-software co-design masters.",
        step3Milestones: ["M.Tech in VLSI Design & Microelectronics", "M.Tech in Embedded Systems / Robotics", "MS in Nanotechnology / Solid State Physics", "MBA in Operations & Systems"],
        step4Title: "Peak Career Destination",
        step4Desc: "Your ultimate design leadership and engineering-management professional summit.",
        step4Milestones: ["Senior ASIC / VLSI Design Architect", "Embedded Systems Principal Engineer", "Robotics Research Scientist", "Chief Hardware Engineer (Cisco/Intel)"]
      };
    }
    if (name.includes('PCMB')) {
      return {
        step1Title: "Immediate Medical & Bio Entrance Exams",
        step1Desc: "Prepare for medical, pharmaceutical, agricultural, or biotech national entrance screenings.",
        step1Milestones: ["NEET-UG (National Eligibility Entrance Test)", "KCET (Allied Health & Pharmacy)", "ICAR AIEEA (Agricultural Education)", "BITSAT Biotech Entrance"],
        step2Title: "Recommended College Degrees",
        step2Desc: "Apply for clinical healing sciences, medical technology engineering, or biotechnology research.",
        step2Milestones: ["MBBS (Bachelor of Medicine & Surgery)", "BDS (Bachelor of Dental Surgery)", "B.Tech in Biotechnology / Biomedical Engineering", "B.Sc in Agriculture / Forestry / Food Sciences"],
        step3Title: "Postgraduate clinical & Specialist Degrees",
        step3Desc: "Engage in medicine residency tracks, specialized surgery streams, or research fellowships.",
        step3Milestones: ["MD (Doctor of Medicine) / MS (Master of Surgery)", "M.Tech in Medical Nanotechnology", "MS in Food Science & Nutrition", "Master of Public Health (MPH)"],
        step4Title: "Peak Career Destination",
        step4Desc: "The ultimate healthcare, surgery, and bio-industrial leadership milestone.",
        step4Milestones: ["Consultant Neurosurgeon / Cardiologist", "Principal Biotech Research Scientist", "Hospital Medical Director", "Senior Agricultural Officer"]
      };
    }
    if (name.includes('PCMS')) {
      return {
        step1Title: "Quantitative & Analytical Entrance Exams",
        step1Desc: "Qualify prestigious quantitative, computational, and statistical entrance boards.",
        step1Milestones: ["ISI Admission Test (Indian Statistical Inst.)", "CMI Entrance (Chennai Mathematical Inst.)", "JEE Main Papers", "Actuarial Common Entrance Test (ACET)"],
        step2Title: "Expected Quantitative Degrees",
        step2Desc: "Immerse yourself in probability models, algebraic analytics, and complex computing.",
        step2Milestones: ["B.Stat (Hons) (Bachelor of Statistics)", "B.Sc (Hons) in Mathematics & Computing", "B.Sc in Actuarial Science", "B.Sc in Applied Mathematics"],
        step3Title: "Masters & Professional Credentials",
        step3Desc: "Aim for professional actuarial fellowships, advanced statistical research, or quantitative finance masters.",
        step3Milestones: ["M.Stat / M.Sc in Applied Statistics", "M.Sc in Data Science & Machine Learning", "Actuarial Science Fellowship (IAI/IFoA)", "Master in Quantitative Finance / Economics"],
        step4Title: "Peak Career Destination",
        step4Desc: "Actuarial leadership, risk modeling, and high-frequency algorithms specialization.",
        step4Milestones: ["Chief Risk Officer (CRO)", "Lead Actuary / Insurance Evaluator", "Quantitative Portfolio Strategist", "Principal Deep Learning Theorist"]
      };
    }
    if (name.startsWith('PCB') || name.includes('PCBZ') || name.includes('PCBH')) {
      return {
        step1Title: "Biological & Veterinary Entrance Exams",
        step1Desc: "Prepare for core medical services, nursing licenses, research, or veterinary entrance examinations.",
        step1Milestones: ["NEET-UG", "AIIMS Nursing Entrance", "PVT (Pre-Veterinary Test)", "KCET Allied Health Sciences"],
        step2Title: "Recommended Medical & Bio Degrees",
        step2Desc: "Select clinical healing, animal surgery, dentistry, or microbiological cellular engineering.",
        step2Milestones: ["MBBS / BDS", "B.V.Sc & AH (Veterinary Science & Animal Husbandry)", "B.Sc (Hons) in Microbiology / Molecular Genetics", "BAMS / BHMS (Alternative Medical Degrees)"],
        step3Title: "Postgraduate Clinical & Research Specialties",
        step3Desc: "Obtain specialized clinical residencies, veterinary surgery masteries, or biochemical laboratory credentials.",
        step3Milestones: ["MD / MS Postgrad Specialization", "M.Sc in Medical Biochemistry", "MVSc (Master of Veterinary Science)", "Master of Dental Surgery (MDS)"],
        step4Title: "Peak Career Destination",
        step4Desc: "Governing hospital management, consulting in senior surgical departments, or leading clinical trials.",
        step4Milestones: ["Chief Clinical Surgeon", "Senior Veterinary Advisor", "Lead Oncology Researcher", "Chief Viral Disease Specialist"]
      };
    }

    if (name === 'PCM' || name.startsWith('PCM (')) {
      return {
        step1Title: "Immediate Milestones & National Entrance Exams",
        step1Desc: "Secure high scores in state and national technological and sciences entrance examinations right after Class 12.",
        step1Milestones: ["JEE Main & Advanced", "KCET / COMEDK", "BITSAT / VITEEE", "NDA Entrance Exam"],
        step2Title: "Recommended Undergraduate Degrees",
        step2Desc: "Step into technology, software engineering, or core physical sciences undergraduate degrees.",
        step2Milestones: ["B.E. / B.Tech in Engineering", "B.Sc in Physics, Chemistry, or Mathematics", "BCA (Bachelor of Computer Applications)", "B.Sc in Information Technology"],
        step3Title: "Postgraduate & Global Specialization",
        step3Desc: "Hone deep domain expertise with high-intensity postgraduate and professional certifications.",
        step3Milestones: ["M.Tech in Engineering / AI", "MS in Physical Sciences", "MCA (Master of Computer Applications)", "MBA in Technology Management"],
        step4Title: "Peak Career Destination",
        step4Desc: "The ultimate corporate, research, or executive leadership role matching this technical stream.",
        step4Milestones: ["Principal Systems Engineer", "Lead Resarcher / Scientist", "Chief Technology Officer (CTO)", "Senior Project Director"]
      };
    }

    // Commerce Combinations
    if (name.includes('CEBA')) {
      return {
        step1Title: "Commerce, Business, & Professional Exams",
        step1Desc: "Access premier corporate, modern business, or accounting entrance frameworks.",
        step1Milestones: ["CUET-UG (Central Universities Test)", "CA Foundation Entrance", "SET / NPAT Business Administration", "CSEET (CS Entrance Test)"],
        step2Title: "Recommended Commerce & tech Degrees",
        step2Desc: "Integrate core accounting with technological management, automated business, and fintech dashboards.",
        step2Milestones: ["B.Com (Hons.) in FinTech & Digital Business", "BBA in Business Analytics / IT Management", "BCA in Data Analytics & Commerce applications", "Integrated BBA + MBA Program"],
        step3Title: "Postgraduate Specialization & Licensing",
        step3Desc: "Take auditing licenses, world-class executive administration degrees, or asset analytics credentials.",
        step3Milestones: ["CA (Chartered Accountant) Professional License", "MBA in Business Analytics / Finance", "CFA (Chartered Financial Analyst) Level I/II", "M.Com in Fintech"],
        step4Title: "Peak Career Destination",
        step4Desc: "Directing strategic financial operations, technology conversions, or asset allocations.",
        step4Milestones: ["Chief Financial Officer (CFO)", "Lead FinTech Specialist", "Investment Portfolio Director", "Senior Financial Systems Architect"]
      };
    }
    if (name.includes('SEBA') || name.includes('ABMS') || name.includes('BSBA')) {
      return {
        step1Title: "Mathematical Finance & Commerce Exams",
        step1Desc: "Register for elite actuarial, accounting, or administrative business entry criteria.",
        step1Milestones: ["CUET-UG Entrance", "CA Foundation Test", "ACET (Actuarial Entrance)", "NISM Certification Exams"],
        step2Title: "Recommended Analytical College Degrees",
        step2Desc: "Maximize your econometric skills with financial design and actuarial modeling degree tracks.",
        step2Milestones: ["B.Com (Hons.) in Quantitative Finance", "B.Sc in Actuarial Science", "B.Sc in Economics & Statistics", "BBA in Financial Risk Management"],
        step3Title: "Postgraduate Research & Professional Credentials",
        step3Desc: "Solidify your math power with global regulatory fellowships or advanced finance masteries.",
        step3Milestones: ["Actuarial Science Fellowship of IAI/IFoA", "CFA (Chartered Financial Analyst)", "M.Sc in Quantitative Economics", "MBA in Investment Banking"],
        step4Title: "Peak Career Destination",
        step4Desc: "Gaining ultimate command of global insurance networks, pension assets, and risk operations.",
        step4Milestones: ["Chief Actuary Consultant", "Risk Policy Architect", "Quantitative Portfolio Strategist", "Treasury & Investment Director"]
      };
    }
    if (name.includes('HEBA')) {
      return {
        step1Title: "Humanitarian Commerce & Law Exams",
        step1Desc: "Enroll in policy-making, strategic commerce, corporate law, or general administrative tests.",
        step1Milestones: ["CUET-UG Exam", "CLAT (Common Law Admission Test)", "CA Foundation", "AILET (All-India Law Entrance)"],
        step2Title: "Recommended Professional College Degrees",
        step2Desc: "Combine business intelligence with professional corporate legal degrees or economics analytics.",
        step2Milestones: ["Integrated B.A. LL.B (Hons.) - 5 Years", "B.Com (Hons.) with Corporate Compliance", "B.A. (Hons.) in Economics", "BBA in Human Resource Management"],
        step3Title: "Postgraduate Options & Masters",
        step3Desc: "Gain professional management mastery, legal specializations, or economic policy certificates.",
        step3Milestones: ["LL.M (Master of Laws) in Corporate Jurisprudence", "CA (Chartered Accountant)", "MBA in Human Resources / Industrial Relations", "M.A. in Applied Economics & Policy"],
        step4Title: "Peak Career Destination",
        step4Desc: "Commanding top corporate law firms, orchestrating macroeconomic policy, or directing global workforce strategies.",
        step4Milestones: ["Chief Corporate Legal Officer", "HR Director / Chief Executive Officer", "Senior Macroeconomic Policy Advisor", "Lead Arbitrator & Corporate Counsel"]
      };
    }
    if (name.includes('EBAC') || name.includes('CSBA')) {
      return {
        step1Title: "Computer Accounting & Systems Auditing Exams",
        step1Desc: "Focus on commercial analytics boards, technology entrance tests, and system safety certifications.",
        step1Milestones: ["CUET-UG Entrance", "CA Foundation", "SET / NPAT Tests", "CISA Systems Audit Prep"],
        step2Title: "Recommended Computer & Management Degrees",
        step2Desc: "Unlock technological business design, database scripting, and corporate accounting apps.",
        step2Milestones: ["B.Com in FinTech & Digital Accounting", "BCA (Bachelor of Computer Applications)", "BBA in Management Information Systems (MIS)", "B.Sc in Data Analytics for Commerce"],
        step3Title: "Postgraduate & IT Specializations",
        step3Desc: "Complete postgraduate computer applications or IT security auditor qualifications.",
        step3Milestones: ["MS in Business Analytics / FinTech", "MCA (Master of Computer Applications)", "MBA in Information Technology Management", "CISA / CISSP Certifications"],
        step4Title: "Peak Career Destination",
        step4Desc: "Steering the digital transformations of banking, auditing, and multinational enterprises.",
        step4Milestones: ["Chief Information Officer (CIO)", "Enterprise IT Strategy Director", "Senior Financial Systems Auditor", "Lead Data Analytics Architect"]
      };
    }

    // Arts / Humanities Combinations
    if (name.includes('HEPS') || name.includes('HEPP') || name.includes('HESP') || name.includes('EPS') || name.includes('JPE')) {
      return {
        step1Title: "Eminent Administrative & Public Policy Exams",
        step1Desc: "Enroll in law entrance exams, human behavior courses, state administrative qualifiers, or elite media boards.",
        step1Milestones: ["CUET-UG", "CLAT (Law Entrance)", "State Civil Services preparatory tests", "TISS-NET (Social Sciences)"],
        step2Title: "Recommended College Degrees",
        step2Desc: "Cultivate your analytical, creative, and administrative skills with targeted Honours degrees.",
        step2Milestones: ["B.A. (Hons.) in Political Science & Public Administration", "B.Sc / B.A. in Clinical Psychology", "B.A. in Journalism & Mass Communication", "Integrated B.A. LL.B (5-Year Law)"],
        step3Title: "Postgraduate Specialization & Licensure",
        step3Desc: "Obtain clinical psychological counseling licenses, publish mass communication stories, or master governance designs.",
        step3Milestones: ["M.A. in Public Policy & Governance", "M.Sc in Clinical Psychology & Counseling", "Master of Social Work (MSW)", "M.A. in International Relations & Diplomacy"],
        step4Title: "Peak Career Destination",
        step4Desc: "Leading administrative organs, consulting in mental health clinics, publishing international bureaus, or defining diplomatic outcomes.",
        step4Milestones: ["Indian Administrative Service (IAS) / Diplomat", "Senior Consultant Clinical Psychologist", "National News Bureau Editor-in-Chief", "UN Public Policy Specialist"]
      };
    }
  }

  // Polytechnic / Engineering Diploma
  if (sid === 'diploma') {
    const dName = courseName.toUpperCase();
    if (dName.includes('DESIGN') || dName.includes('MEDIA')) {
      return {
        step1Title: "Portfolio Building & Design Foundation",
        step1Desc: "Master core design software and build a strong creative portfolio right from the start.",
        step1Milestones: ["Adobe Creative Suite Mastery (Photoshop, Illustrator)", "UX Design Portfolio on Behance/Dribbble", "UI Design Principles & Wireframing Projects"],
        step2Title: "Creative Specialization Degrees",
        step2Desc: "Advance into full-time design or media degrees with a strong portfolio background.",
        step2Milestones: ["B.Des (Bachelor of Design) in Communication / Multimedia", "B.A. in Animation & VFX", "B.Sc in UI/UX Design & Game Arts"],
        step3Title: "Advanced Digital Media & Global Branding",
        step3Desc: "Gain advanced specialization in specific digital creative fields like VFX, UI/UX, or Motion Graphics.",
        step3Milestones: ["M.Des (Master of Design) in Interaction Design", "Advanced Certification in VFX / Motion Graphics", "UX Research Specialist Certification"],
        step4Title: "Peak Creative Career Destination",
        step4Desc: "Leading creative visions for global brands, directing cinematic animations, or defining user experiences.",
        step4Milestones: ["Creative Director (Agency/Brand)", "Lead UI/UX Architect", "VFX Supervisor (Film/Media)", "Principal Experience Designer"]
      };
    } else if (dName.includes('HOTEL') || dName.includes('MANAGEMENT') || dName.includes('CATERING')) {
      return {
        step1Title: "Hospitality Operational Skills",
        step1Desc: "Gain hands-on experience in frontline hospitality operations and professional grooming.",
        step1Milestones: ["Professional Grooming & Soft Skills Certification", "Operational training in Housekeeping & Front Office", "Basic Culinary & Food Safety Certifications"],
        step2Title: "Hospitality & Tourism Degrees",
        step2Desc: "Pursue full-scale management degrees to qualify for corporate executive hospitality roles.",
        step2Milestones: ["BHM (Bachelor of Hotel Management)", "B.Sc in Hospitality & Hotel Administration", "B.A. in Culinary Arts"],
        step3Title: "Luxury Management & Global Operations",
        step3Desc: "Master high-end resort management, event planning, or international hospitality standards.",
        step3Milestones: ["MBA in Hospitality & Luxury Brand Management", "Master of Tourism and Hotel Management (MTHM)", "Advanced Diploma in Gastronomy / Culinary Management"],
        step4Title: "Peak Hospitality Career Destination",
        step4Desc: "Managing five-star global hotels, directing international catering chains, or leading luxury resorts.",
        step4Milestones: ["General Manager (Luxury Hotel/Resort)", "Director of Global Operations (Hospitality)", "Chief Culinary Executive / Executive Chef", "Hospitality Strategy Director"]
      };
    } else if (dName.includes('AGRICULTURE') || dName.includes('HORTICULTURE')) {
      return {
        step1Title: "Agri-Tech & Field Mastery",
        step1Desc: "Learn modern farming techniques, soil health management, and agricultural machinery operations.",
        step1Milestones: ["State Agriculture Board Certification", "Hands-on training in Micro-Irrigation & Fertilizers", "Agri-Business & Marketing Basics Certification"],
        step2Title: "Agriculture & Technology Degrees",
        step2Desc: "Advance into core agricultural science or engineering degrees for deeper research and tech roles.",
        step2Milestones: ["B.Sc (Hons.) in Agriculture", "B.Tech in Agricultural Engineering", "B.Sc in Horticulture / Sericulture"],
        step3Title: "Sustainable Agri-Business & Post-Graduation",
        step3Desc: "Specialization in sustainable farming, dairy technology, or agricultural resource management.",
        step3Milestones: ["M.Sc in Agronomy / Soil Science", "MBA in Agri-Business Management", "M.Tech in Farm Machinery & Power Engineering"],
        step4Title: "Peak Agriculture Career Destination",
        step4Desc: "Directing agricultural policy, leading sustainable farming startups, or managing global agri-supply chains.",
        step4Milestones: ["Agriculture Scientist / Researcher", "Agri-Business Development Director", "Chief Operations Officer (Agri-Corp)", "Senior Land Resource Manager"]
      };
    } else if (dName.includes('PHARMACY')) {
      return {
        step1Title: "Pharmacy Licensure & Retail Mastery",
        step1Desc: "Earn your professional pharmacist license and master hospital/retail pharmacy operations.",
        step1Milestones: ["Pharmacy Council of India (PCI) Registration", "D.Pharm Professional Exit Examination", "Clinical Pharmacy Hospital Internship"],
        step2Title: "Advanced Pharmaceutical Degrees",
        step2Desc: "Step into deeper drug research, manufacturing, and pharmaceutical chemistry roles.",
        step2Milestones: ["B.Pharm (Lateral Entry to 2nd Year)", "Bachelor of Science in Pharmaceutical Chemistry", "B.Tech in Pharmaceutical Technology"],
        step3Title: "Clinical Research & Specialized Masters",
        step3Desc: "Master clinical research protocols, drug development, or advanced pharmacological studies.",
        step3Milestones: ["M.Pharm in Pharmaceutics / Pharmacology", "MS in Regulatory Affairs", "Post Graduate Diploma in Clinical Research"],
        step4Title: "Peak Pharmaceutical Career Destination",
        step4Desc: "Governing drug safety, leading pharmaceutical research, or directing global drug manufacturing plants.",
        step4Milestones: ["Chief Pharmacist / Pharmacy Director", "Head of R&D (Pharmaceuticals)", "Lead Regulatory Affairs Strategist", "Clinical Research Director"]
      };
    } else if (dName.includes('NURSING')) {
      return {
        step1Title: "Nursing Licensure & Clinical Training",
        step1Desc: "Achieve state nursing council registration and complete intensive clinical ward rotations.",
        step1Milestones: ["State Nursing Council Registered Nurse (RN) License", "General Nursing & Midwifery (GNM) Board Exam", "Clinical Competency Assessment in Intensive Care"],
        step2Title: "Nursing & Healthcare Degrees",
        step2Desc: "Advance your career with full nursing degrees and specialized clinical education.",
        step2Milestones: ["Post Basic B.Sc Nursing", "Bachelor of Science in Community Health", "Specialized Fellowship in Emergency Nursing"],
        step3Title: "Advanced Nursing Specialties & Leadership",
        step3Desc: "Gain authority in critical care, pediatrics, or maternal health with advanced postgraduate studies.",
        step3Milestones: ["M.Sc in Nursing (Pediatric/Critical Care/Mental Health)", "Master of Public Health (MPH)", "Master of Hospital Administration (MHA)"],
        step4Title: "Peak Nursing Career Destination",
        step4Desc: "Directing hospital nursing divisions, governing public health programs, or leading international clinical nursing.",
        step4Milestones: ["Nursing Superintendent / Director of Nursing", "Chief Clinical Nursing Officer (CCNO)", "Global Public Health Nurse Leader", "Nurse Scientist / Researcher"]
      };
    } else if (dName.includes('TOURISM') || dName.includes('TRAVEL')) {
      return {
        step1Title: "Travel Operations & GDS Mastery",
        step1Desc: "Learn global ticketing systems, itinerary design, and essential travel destination geography.",
        step1Milestones: ["IATA Foundation Certification", "GDS Proficiency (Amadeus/Galileo)", "Tour Guidance & Destination Management License"],
        step2Title: "Tourism & Travel Degrees",
        step2Desc: "Achieve full academic command over tourism management, airport operations, and hospitality.",
        step2Milestones: ["BBA / Bachelor in Tourism & Travel Management (BTTM)", "B.Sc in Hospitality & Airport Management", "B.Voc in Travel & Tourism"],
        step3Title: "Global Logistics & Tourism Specialization",
        step3Desc: "Master global supply chains, international tourism laws, or airline management at a strategic level.",
        step3Milestones: ["MBA in Tourism & Airline Management", "Master in Tourism Administration (MTA)", "Advanced Diploma in Cargo & Logistics Management"],
        step4Title: "Peak Tourism Career Destination",
        step4Desc: "Directing global travel networks, managing international airports, or leading national tourism boards.",
        step4Milestones: ["General Manager (Global Travel Agency/Tour Op)", "Director of Airport Operations", "Chief Tourism Marketing Officer", "Regional Tourism Board Director"]
      };
    } else if (dName.includes('FIRE') || dName.includes('SAFETY')) {
      return {
        step1Title: "Safety Drills & HSE Compliance",
        step1Desc: "Master industrial safety standards, fire prevention drills, and workplace hazard assessment.",
        step1Milestones: ["National Safety Council (NSC) Certification", "HSE Site Safety Supervisor Training", "Fire Safety Marshall & Rescue Drills Proficiency"],
        step2Title: "Safety Engineering & Health Degrees",
        step2Desc: "Advance into specialized safety engineering or occupational health bachelor degrees.",
        step2Milestones: ["B.E. / B.Tech in Fire & Safety Engineering", "B.Sc in Occupational Health & Safety", "B.Voc in Industrial Safety Management"],
        step3Title: "International Safety Auditor Credentials",
        step3Desc: "Earn high-level global safety certifications and masters for corporate auditor roles.",
        step3Milestones: ["NEBOSH International Diploma", "M.Tech in Industrial Safety & Risk Management", "Certified Safety Professional (CSP) Designation"],
        step4Title: "Peak Safety Career Destination",
        step4Desc: "Governing occupational health for multinational corporations, leading national disaster response, or directing safety audits.",
        step4Milestones: ["Chief Safety Officer (CSO)", "HSE Director (Multinational Corp)", "Senior Industrial Safety Auditor", "National Disaster Management Director"]
      };
    }
    return {
      step1Title: "Engineering Lateral Entry & Academic Exams",
      step1Desc: "Excel in state-level lateral entrance examinations to skip the first year of academic engineering courses.",
      step1Milestones: ["State DCET / LET Entrance Examinations", "Verify minimum 60% in engineering diploma syllabus", "Draft engineering portfolio showcasing hands-on projects"],
      step2Title: "Accelerated Undergraduate Engineering Degrees",
      step2Desc: "Acquire your coveted Bachelor of Engineering (B.E./B.Tech) degree starting directly in the 2nd year.",
      step2Milestones: ["B.E. or B.Tech (Lateral Entry directly to 3rd Semester) in related stream", "B.Voc (Bachelor of Vocation) in Industrial & Production Science", "AMIE (Associate Member of Institution of Engineers) Modules"],
      step3Title: "Postgraduate & Global Engineering Careers",
      step3Desc: "Further develop smart engineering, robotics designs, or enterprise operations skillsets.",
      step3Milestones: ["M.Tech or ME in Advanced Industrial Systems / Automation", "MS in Engineering (Global Technical Universities)", "MBA in Operations & Logistics Management", "Project Management Professional (PMP) Certification"],
      step4Title: "Peak Engineering Career Destination",
      step4Desc: "Synthesizing construction projects, leading industrial robotics designs, or driving hardware innovation.",
      step4Milestones: ["Cloud Projects and Infrastructure Director", "Senior Research & Development (R&D) Engineering Lead", "Industrial Operations Director", "Chief Automotive Architect"]
    };
  }

  // Paramedical Course Pathways
  if (sid === 'paramedical') {
    return {
      step1Title: "Paramedical Boards & Clinical Internships",
      step1Desc: "Earn board registration certificates and complete strict clinical internships inside state teaching hospitals.",
      step1Milestones: ["Paramedical Board Registered License", "Clinical Hospital Practical Internship Completion", "Allied Health Professional Common Entrance Test"],
      step2Title: "Recommended Medical Laboratory & Therapy Degrees",
      step2Desc: "Consolidate your diagnostic mastery into full-fledged Allied Health Bachelor’s degrees.",
      step2Milestones: ["B.Sc in Allied Health Sciences", "Bachelor of Physiotherapy (BPT)", "B.Sc in Medical Imaging Technology & Radiology", "Bachelor in Medical Laboratory Technology (BMLT)", "Bachelor of Optometry (B.Optom)"],
      step3Title: "Clinical Postgraduate & Healthcare Management Degrees",
      step3Desc: "Gain authorization to manage large clinical labs, specialize in oncology imaging, or lead hospital divisions.",
      step3Milestones: ["M.Sc in Clinical Biochemistry / Medical Radiography", "Master of Hospital Administration (MHA)", "M.Sc in Applied Cardiothoracic Care", "Post Graduate Diploma in Clinical Health Management"],
      step4Title: "Peak Paramedical Career Destination",
      step4Desc: "Governing full diagnostic operations, executing advanced radiology safety protocols, or directing hospital systems.",
      step4Milestones: ["Hospital Operations and Clinical Director", "Chief Consultant Medical Physiotherapist", "Allied Health Diagnostics Superintendent", "Radiological Health Safety Administrator"]
    };
  }

  // ITI Trades Pathways
  if (sid === 'iti') {
    return {
      step1Title: "National Trade Certifications & Apprenticeships",
      step1Desc: "Conclude state and national industrial training certifications followed by real on-floor apprenticeships.",
      step1Milestones: ["All India Trade Test (AITT) for National Trade Certificate", "Approve Craftsman Training Scheme (CTS) evaluation", "Execute NCVT National Apprentice Training Scheme (NAPS)"],
      step2Title: "Recommended Technical Diploma & B.Voc Degrees",
      step2Desc: "Climb from manual work to technical engineering design and supervisor roles.",
      step2Milestones: ["Diploma in Engineering (Direct 2nd-year lateral entry via state DCET)", "B.Voc (Bachelor of Vocation) in Industrial Automation Technology", "State Board Certified Licensure for Electrical Contractors"],
      step3Title: "Technical Training & Advanced Automation Specialties",
      step3Desc: "Achieve industrial trainer authorizations or specialize in advanced computerized manufacturing platforms.",
      step3Milestones: ["CITS (Craft Instructor Training Scheme) Certification", "M.Voc (Master of Vocation) in Smart Manufacturing / Robotics", "Advanced CNC Programming / Automation Specialist Certifications"],
      step4Title: "Peak Vocational Career Destination",
      step4Desc: "Directing public utilities grid lines, commanding modern assembly workshops, or operating heavy logistics hubs.",
      step4Milestones: ["Technical Training Institution (ITI) Director", "Industrial Assembly Operations Manager", "Chief Technical Electrical Inspector", "Senior Systems Automation Lead"]
    };
  }

  // Vocational Courses Pathways
  if (sid === 'vocational') {
    if (name.includes('MARKETING') || name.includes('TALLY') || name.includes('DATA ANALYTICS') || name.includes('FULL STACK') || name.includes('CYBERSECURITY') || name.includes('DESIGN')) {
      return {
        step1Title: "Immediate Software & Database Credentials",
        step1Desc: "Earn industry-authorized, vendor-certified credentials to confirm your software mastery to enterprise companies.",
        step1Milestones: ["CompTIA Security+ / AWS Cloud Practitioner", "Google Advanced Analytics / Meta Certified Marketer", "Tally Prime Certified Professional / Microsoft SQL Associate", "Portfolio design check and wireframe releases"],
        step2Title: "Recommended Vocational & Computer Degrees",
        step2Desc: "Build full academic eligibility with modern software and design college degrees.",
        step2Milestones: ["B.Voc (Bachelor of Vocation) in Software Development / Web Design", "BCA (Bachelor of Computer Applications)", "B.Sc in Information Technology (IT)", "Bachelor of Design (B.Des) in UX / Digital Communications"],
        step3Title: "Postgraduate Technology Management Degrees",
        step3Desc: "Strengthen your technical architecture, systems risk management, or digital business insights.",
        step3Milestones: ["MCA (Master of Computer Applications)", "MS in Cybersecurity / Web Engineering (Global)", "MBA in Technology Products / Business Analytics", "CISA / CISSP Security Certifications"],
        step4Title: "Peak Modern Software Career Destination",
        step4Desc: "Commanding complete corporate technological setups, writing safety codes, or leading creative design squads.",
        step4Milestones: ["Chief Technology Officer (CTO)", "Enterprise Cyber Security Architect", "Fintech Audits & Compliance Superintendent", "Senior Visual Product & UX Director"]
      };
    }
    if (name.includes('BAKINGS') || name.includes('BAKER') || name.includes('BEAUTY') || name.includes('YOGA') || name.includes('FITNESS')) {
      return {
        step1Title: "Immediate Licensure & Guild Certifications",
        step1Desc: "Earn highly regarded physical therapy, cosmetology, or culinary certifications recognized globally.",
        step1Milestones: ["CIDESCO Esthetic International Diploma", "Yoga Alliance RYT-200 / RYT-500 Certification", "City & Guilds Baking & Patisserie International Certification", "Fitness Academy Personal Trainer CPR/AED License"],
        step2Title: "Recommended Culinary & Wellness Degrees",
        step2Desc: "Establish academic background to govern physical health, dietary science, or retail cosmetics.",
        step2Milestones: ["B.Voc in Culinary Arts & Baking Sciences", "B.Sc in Food Science, Nutrition & Human Ecology", "Bachelor of Physical Education & Sports Sciences (B.P.Ed)", "B.Voc in Wellness & Cosmetology Studies"],
        step3Title: "Postgraduate Hospitality & Nutrition Studies",
        step3Desc: "Formulate business and dietary formulas with masters in luxury management or health sciences.",
        step3Milestones: ["MBA in Hospitality & Luxury Brand Management", "M.Sc in Clinical Nutrition & Sports Dietetics", "Post Graduate Diploma in Spa & Saloon Chains Management", "Yoga Therapeutics Specialized Studies Postgraduate"],
        step4Title: "Peak Fitness & Culinary Career Destination",
        step4Desc: "Directing premium hospitality complexes, managing state-of-the-art spas, or owning customized elite culinary chains.",
        step4Milestones: ["Chief Executive Pastry Chef at 5-Star Hotel Complex", "International Spa & Salon Franchise Owner", "Global Sports & Yoga Therapeutics Consultant", "Health & Wellness Chain Director"]
      };
    }
    if (name.includes('MUSIC') || name.includes('DJ') || name.includes('PHOTOGRAPHY') || name.includes('CINEMATOGRAPHY') || name.includes('EVENT') || name.includes('PUBLIC RELATIONS')) {
      return {
        step1Title: "Immediate Portfolio Review & Audits",
        step1Desc: "Consolidate a striking portfolio of physical layouts, digital photos, music tracks, or events layouts.",
        step1Milestones: ["Trinity Guildhall Sound / DJ Decks Certifications", "Behance & Professional Portfolio Audits", "Event Management Association Student Member", "National Academy of Photography (NAP) Gold Certificate"],
        step2Title: "Recommended Media, Sound, & Fine Arts Degrees",
        step2Desc: "Graduate with academic credentials in visual communications, audio engineering, or event coordination.",
        step2Milestones: ["B.Voc in Media Production / Event & PR Logistics", "Bachelor of Fine Arts (BFA) in Cinema & Multi-camera Photography", "Bachelor of Arts (BA) in Sound Technology & Music Production", "B.A. in Journalism & Mass Communication"],
        step3Title: "Postgraduate & Creative Studio Masters",
        step3Desc: "Control sound acoustics, direct cinematography, or coordinate high-profile public events.",
        step3Milestones: ["Master of Fine Arts (MFA) in Cinematography / Visual Effects", "MBA in Media and Entertainment Management", "M.A. in Public Relations & Advertisement Systems", "Advanced Audio Acoustics Postgraduate Degree"],
        step4Title: "Peak Creative Career Destination",
        step4Desc: "Directing visual film layouts, operating major music studios, or coordinating global summit logistics.",
        step4Milestones: ["Award-Winning Cinematic Director of Photography", "Audio Director at Worldwide Video Game/Film Studios", "Global Public Relations & Mega-Event Planner", "Media Production House Executive Director"]
      };
    }
    if (name.includes('ESPORTS') || name.includes('GAMING') || name.includes('CONTENT CREATION') || name.includes('INFLUENCING')) {
      return {
        step1Title: "Channel Partnering & Pro-Circuit Placements",
        step1Desc: "Earn streaming partner status, complete pro-gaming leagues, and obtain media broadcast credentials.",
        step1Milestones: ["Verified Stream Partner Status (Twitch/YouTube)", "Competitive Tier-1 Pro-Circuit Qualifier placements", "Digital Media Broadcast Operations Certificate"],
        step2Title: "Recommended Interactive Media Degrees",
        step2Desc: "Anchor your digital influence with formal undergraduate degrees in interactive gaming or media communication.",
        step2Milestones: ["B.Voc in Digital Media Production & Broadcast Technology", "Bachelor of Science (B.Sc) in Games Design and Esports", "B.A. in Communication & Digital Marketing", "B.Sc in Interactive Entertainment Development"],
        step3Title: "Postgraduate & Entertainment Enterprise Masters",
        step3Desc: "Gain expertise in media laws, digital copyrights, gaming finance, and audience psychology.",
        step3Milestones: ["MBA in Gaming, Sports & Esports Enterprise Management", "M.Sc in Interactive Media & Media Psychology", "M.A. in Digital Content Strategy & Rights Management", "Postgraduate Diploma in Video Production"],
        step4Title: "Peak Gaming & Media Career Destination",
        step4Desc: "Leading world-famous pro-gaming organizations, producing national gaming products, or heading media ecosystems.",
        step4Milestones: ["Franchise Esports Head Coach / Team Director", "Chief Content Officer at Global Media Networks", "Executive Producer of Digital Entertainment Assets", "Esports Tournament & Events Director"]
      };
    }
  }

  // General fallback roadmap
  return {
    step1Title: "Immediate Milestones & Exams",
    step1Desc: "Complete certifications and prepare for regional board or entrance qualifications.",
    step1Milestones: ["State & University Entrance Exams", "Practical Internships & Portfolio Work", "National Vocational Certification"],
    step2Title: "Recommended Undergraduate Degrees",
    step2Desc: "Gain professional eligibility by enrolling in specialized undergraduate courses.",
    step2Milestones: ["B.Voc (Bachelor of Vocation) in Specialization", "B.Sc / B.A. / B.Com in Applied Fields", "B.Tech / B.E. / Professional Diploma Programs"],
    step3Title: "Postgraduate Specialization Options",
    step3Desc: "Further specialize to access management or specialized leadership roles.",
    step3Milestones: ["M.Voc / PG Diploma in Field", "MBA in Sectoral Management", "Master of Science / Master of Arts", "Advanced Industry Professional Certifications"],
    step4Title: "Peak Industry Careers",
    step4Desc: "Target top executive, senior engineering, consultant, or research directions.",
    step4Milestones: ["Chief Consultant in Specialization", "Operations / Engineering Director", "Senior Research Head", "Hospital / Enterprise Executive"]
  };
}// Dynamic helper to map comprehensive curricula, subjects and exams based on selected post-10th course combination
function getSubjectsAndExamsForCourse(courseName: string, streamId: string) {
  const name = courseName.toUpperCase();
  const sid = streamId;

  // Defaults
  let subjects = [
    { name: "Core Specialization I", desc: "Fundamental principles, foundations, and introductory theories.", type: "core" as const },
    { name: "Applied Practice Lab", desc: "Practical workshops, software labs, and real-world experiments.", type: "practical" as const },
    { name: "Technical Elective", desc: "Specialized niche options according to student preference.", type: "elective" as const },
    { name: "Global Communication", desc: "Professional English, personality development, and ethics.", type: "core" as const }
  ];

  let exams: { name: string; type: string; details: string; status: string; link?: string; bestFor?: string; }[] = [
    { name: "National Eligibility Screen", type: "National Entrance", details: "All-India common entrance criteria protecting admissions to federal universities.", status: "Primary Gate", link: "cuet.samarth.ac.in" },
    { name: "State Common Entrance Board (CET)", type: "State Administered", details: "Regional state board assessment allocating heavily subsidized college seats.", status: "Subsidized Entry", link: "cetonline.karnataka.gov.in" },
    { name: "Professional Competence Test", type: "Industry Certification", details: "Voluntary licensure validating industrial fitness to corporate hirers.", status: "Value Booster" }
  ];

  let lifeAsStudent = "A balance of analytical reasoning, class-room theoretical breakdowns, and active laboratory assignments.";
  let difficulty = 3; // out of 5
  let practicalWeight = 50; // percentage
  let theoryWeight = 50; // percentage
  let futureJobOutlook = "Dynamic"; // Growing, Elite, Essential, High Demand, Niche
  let transitionAdvisor = "Yes. This path offers versatile logical credentials which can pivot into business studies, management, law, or media with brief bridging prep.";
  let eligibilityWarning = "";
  let specialNote = "";

  if (sid === '12th_intermediate') {
    if (name.includes('PCMC')) {
      subjects = [
        { name: "Physics & Electromagnetism", desc: "Mechanics, thermodynamics, wave theory, electrostatics, optics, magnetic fields and modern nuclear physics.", type: "core" as const },
        { name: "Analytical Chemistry", desc: "Organic synthesis, inorganic periodic properties, rate kinetics, electrochemistry, and coordination compounds.", type: "core" as const },
        { name: "Advanced Mathematics", desc: "Coordinate geometry, calculus (differential & integral), linear algebra, probability, and trigonometric functions.", type: "core" as const },
        { name: "Computer Science (C++ / Python / SQL)", desc: "Object-oriented scripting, algorithmic logic, data structures, boolean algebra, logic gates, and relational database operations.", type: "practical" as const },
        { name: "General English", desc: "Grammar, writeups, communications, and literary comprehension.", type: "elective" as const }
      ];
      exams = [
        { name: "JEE Main", type: "National Entrance", details: "National exam for NITs, IIITs, CFTIs. Conducted twice/year by NTA.", status: "Highly Competitive", link: "jeemain.nta.nic.in" },
        { name: "JEE Advanced", type: "National Entrance", details: "For IIT admissions. Only top 2.5L JEE Main qualifiers eligible.", status: "Elite Technical", link: "jeeadv.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka CET for state engineering colleges.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "BITSAT", type: "Private University", details: "BITS Pilani entrance (Pilani, Goa, Hyderabad campuses).", status: "High Premium", link: "bitsadmission.com" },
        { name: "VITEEE", type: "Private University", details: "VIT University entrance for B.Tech.", status: "Popular Track", link: "vit.ac.in/viteee" },
        { name: "COMEDK UGET", type: "Private Board", details: "Private engineering colleges in Karnataka.", status: "Regional Advantage", link: "comedk.org" },
        { name: "SRMJEE", type: "Private University", details: "SRM University engineering entrance.", status: "Popular Track", link: "srmist.edu.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "For central universities offering B.Sc CS, BCA etc.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "NIMCET", type: "National Entrance", details: "NIT MCA entrance (if pursuing MCA after B.Sc).", status: "Advanced Career", link: "nimcet.in" }
      ];
      lifeAsStudent = "Highly analytical. You will spend time coding in labs, debugging scripts, and solving complex physics/calculus modules.";
      difficulty = 5;
      practicalWeight = 60;
      theoryWeight = 40;
      futureJobOutlook = "Elite Software & Tech";
      transitionAdvisor = "Very High flexibility. You can easily switch to BCA / B.Sc IT, design, financial risk management, or commerce fields after Class 12.";
      eligibilityWarning = "❌ PCMC students are NOT eligible for NEET (no Biology in curriculum)";
    } else if (name.includes('PCME')) {
      subjects = [
        { name: "Advanced Mathematics", desc: "Calculus, differential equations, Fourier transforms, and wave equations modeling.", type: "core" as const },
        { name: "Applied Physics & Quantum Mechanics", desc: "Semiconductors, solid-state electronics, quantum theories, and thermodynamic principles.", type: "core" as const },
        { name: "Organic & Physical Chemistry", desc: "Electrochemistry, environmental safety, polymer reactions, and chemical structures.", type: "core" as const },
        { name: "Basic Electronics & Circuit Design", desc: "Ohm's laws, breadboard testing, operational amplifiers, transducers, logic gates, and analog communications.", type: "practical" as const },
        { name: "Digital Systems Design Lab", desc: "Assembling circuitry, oscilloscope tuning, and measuring current frequencies.", type: "practical" as const }
      ];
      exams = [
        { name: "JEE Main", type: "National Entrance", details: "Primary engineering entrance.", status: "Highly Competitive", link: "jeemain.nta.nic.in" },
        { name: "JEE Advanced", type: "National Entrance", details: "IIT admission.", status: "Elite Technical", link: "jeeadv.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka state engineering CET.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "BITSAT", type: "Private University", details: "BITS Pilani all campuses.", status: "High Premium", link: "bitsadmission.com" },
        { name: "COMEDK UGET", type: "Private Board", details: "Private colleges in Karnataka.", status: "Regional Advantage", link: "comedk.org" },
        { name: "VITEEE", type: "Private University", details: "VIT engineering entrance.", status: "Popular Track", link: "vit.ac.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Electronics/Physics at central universities.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "IISER IAT", type: "National Entrance", details: "For research-oriented B.S. programs at IISERs.", status: "Research Track", link: "iiseradmission.in" }
      ];
      lifeAsStudent = "Hands-on and circuit-centric. Expect to solve equations of electricity, design logic circuits, and solder micro-components on PCBs.";
      difficulty = 5;
      practicalWeight = 55;
      theoryWeight = 45;
      futureJobOutlook = "High Demand Chips & IoT";
      transitionAdvisor = "Strong pivot possible towards cybersecurity, robotics engineering, business analytics, or corporate technology operations.";
    } else if (name.includes('PCMB')) {
      subjects = [
        { name: "Human Anatomy & Plant Physiology", desc: "Detailed mechanisms of cardio-circulatory networks, cellular biology, genetics, and ecology.", type: "core" as const },
        { name: "Theoretical & Practical Chemistry", desc: "Invaluable biochemistry, metallurgy, kinetic equations, and laboratory chemical test strips.", type: "core" as const },
        { name: "Analytical Physics", desc: "Wave theory, electromagnetic physics, laser mechanics, and measurement calibration.", type: "core" as const },
        { name: "Advanced Mathematics & Calculus", desc: "Algebraic matrices, probability matrices, differentiation, and integral functions.", type: "elective" as const },
        { name: "Microbiology & Genetics Lab", desc: "Slide preparation, compound micro-imaging, botanical plant dissection, and biochemical assays.", type: "practical" as const }
      ];
      exams = [
        { name: "NEET UG", type: "National Entrance", details: "Single national exam for MBBS, BDS, BAMS, BHMS, BVSc.", status: "Extremely Intense", link: "neet.nta.nic.in" },
        { name: "JEE Main", type: "National Entrance", details: "Engineering (NITs, IIITs).", status: "Highly Competitive", link: "jeemain.nta.nic.in" },
        { name: "JEE Advanced", type: "National Entrance", details: "IIT admission.", status: "Elite Technical", link: "jeeadv.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka CET — covers both Engineering & Medical seats.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "BITSAT", type: "Private University", details: "BITS Pilani engineering.", status: "High Premium", link: "bitsadmission.com" },
        { name: "IISER IAT", type: "National Entrance", details: "Research science at IISERs (Biology track).", status: "Research Track", link: "iiseradmission.in" },
        { name: "NEST", type: "National Entrance", details: "NISER & UM-DAE CBS for B.Sc research programs.", status: "Research Track", link: "nestexam.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Biotech, Microbiology at central universities.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "COMEDK UGET", type: "Private Board", details: "Private medical/engineering colleges in Karnataka.", status: "Regional Advantage", link: "comedk.org" },
        { name: "NATA", type: "National Entrance", details: "National Aptitude Test in Architecture.", status: "Architecture", link: "nata.in" }
      ];
      lifeAsStudent = "Demanding and memorization-heavy. Balancing heavy biology biological terminology with physics math and chemistry equations.";
      difficulty = 5;
      practicalWeight = 45;
      theoryWeight = 55;
      futureJobOutlook = "Critical Lifesaving Roles";
      transitionAdvisor = "You can easily pivot to research (B.Sc Biotechnology), forensic science, healthcare management, or corporate biochemistry consultancy.";
    } else if (name.includes('PCMS')) {
      subjects = [
        { name: "Advanced Statistical Methods", desc: "Descriptive statistics, variance parameters, probability distributions, sampling techniques, and hypothesis testing.", type: "core" as const },
        { name: "Abstract & Applied Mathematics", desc: "Vector spaces, advanced calculus, coordinate equations, and sequence logic.", type: "core" as const },
        { name: "Analytical Physics", desc: "Kinetic gases, electro-mechanics, optics, and statistical thermodynamics.", type: "core" as const },
        { name: "General Chemistry Structures", desc: "Coordination compounds, chemistry kinetics, and basic analytical labs.", type: "elective" as const },
        { name: "Computational Statistics Lab", desc: "Using spreadsheets, programming basic loops, and interpreting statistical data sets.", type: "practical" as const }
      ];
      exams = [
        { name: "JEE Main", type: "National Entrance", details: "Engineering (Maths base qualifies).", status: "Highly Competitive", link: "jeemain.nta.nic.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka engineering seats.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Statistics/Maths/Economics at central universities.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "ISI Admission Test", type: "Elite National", details: "Indian Statistical Institute — premier for B.Stat/B.Math.", status: "Ultra-Competitive", link: "isical.ac.in" },
        { name: "CMI Entrance", type: "Elite National", details: "Chennai Mathematical Institute for B.Sc Maths & CS.", status: "Elite Analytical", link: "cmi.ac.in" },
        { name: "IISER IAT", type: "National Entrance", details: "Research science programs.", status: "Research Track", link: "iiseradmission.in" },
        { name: "NEST", type: "National Entrance", details: "NISER for pure sciences.", status: "Research Track", link: "nestexam.in" }
      ];
      lifeAsStudent = "Intensely logical and analytical. You will spend hours calculating variances, writing proofs, and organizing numerical distributions.";
      difficulty = 4.5;
      practicalWeight = 40;
      theoryWeight = 60;
      futureJobOutlook = "Mega Data & Financial Risk";
      transitionAdvisor = "Maximum flexibility for banking, financial modeling, machine learning, deep learning research, or accounting professions.";
    } else if (name.startsWith('PCB') && !name.includes('M') && !name.includes('Z') && !name.includes('H')) {
      // Standard PCB without Maths
      subjects = [
        { name: "Human Anatomy & Cell Biology", desc: "Cardiovascular, neural, and digestive mechanisms, evolutionary genetics, and human physiology.", type: "core" as const },
        { name: "Plant Botanical Physiology", desc: "Photosynthesis, plant hormones, botanical diversity, and ecological flora survival genetics.", type: "core" as const },
        { name: "Applied Chemistry & Biochemistry", desc: "Organic mechanisms, functional polymers, electrochemistry, and biomolecules.", type: "core" as const },
        { name: "Medical Physics & Optics", desc: "Principles of ray optics, nuclear energy, pressure mechanics, and acoustic wave frequencies.", type: "core" as const },
        { name: "Microscopy & Biotechnology Lab", desc: "Staining slides, genetic model splicing, botanical mapping, and buffer titration testing.", type: "practical" as const }
      ];
      exams = [
        { name: "NEET UG", type: "National Entrance", details: "MBBS, BDS, BAMS, BHMS, BPT, BVSc, Nursing — primary exam.", status: "Extremely Intense", link: "neet.nta.nic.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka medical seats (MBBS via government quota).", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Biotech, Microbiology, Zoology, Botany.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "AIIMS (via NEET)", type: "National Entrance", details: "AIIMS now admits through NEET scores.", status: "Elite Technical", link: "neet.nta.nic.in" },
        { name: "JIPMER (via NEET)", type: "National Entrance", details: "JIPMER also via NEET now.", status: "Elite Technical", link: "neet.nta.nic.in" },
        { name: "Paramedical CETs", type: "State Administered", details: "State-level exams for BPT, BMLT, B.Sc Nursing.", status: "Subsidized Entry" }
      ];
      lifeAsStudent = "Heavy terminology work and systematic note-making. Expect to balance biological system taxonomy files with intense laboratory tasks.";
      difficulty = 4.5;
      practicalWeight = 40;
      theoryWeight = 60;
      futureJobOutlook = "Highly Respected Healthcare";
      transitionAdvisor = "Very flexible for molecular genetics, cosmetics formulation, food tech, micro-pathology, or healthcare clinical research.";
      eligibilityWarning = "❌ PCB without Maths is NOT eligible for JEE";
    } else if (name.includes('PCBZ')) {
      subjects = [
        { name: "Animal Zoology & Taxonomies", desc: "Cardiovascular, neural, evolutionary biological tracks, and vertebrate classification.", type: "core" as const },
        { name: "Plant Botanical Physiology", desc: "Ecology, biochemical reactions in cells, plant life cycles, and botany.", type: "core" as const },
        { name: "Theoretical & Practical Chemistry", desc: "Organic synthesis, molecular weight calibration, and metallurgy.", type: "core" as const },
        { name: "Microbiology & Dissection Lab", desc: "Testing tissues, specimen identification, and preparing bacterial cultures.", type: "practical" as const }
      ];
      exams = [
        { name: "NEET UG", type: "National Entrance", details: "Required for MBBS, BVSc (Veterinary).", status: "Extremely Intense", link: "neet.nta.nic.in" },
        { name: "ICAR AIEEA", type: "National Entrance", details: "Agriculture & allied sciences (B.Sc Agriculture, Fisheries, Forestry).", status: "Allied Star", link: "icar.org.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Zoology, Life Sciences at central universities.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka medical/veterinary seats.", status: "Top Choice", link: "cetonline.karnataka.gov.in" }
      ];
      lifeAsStudent = "Very active lab lifestyle, identifying animal tissue models, taxonomy lists, and running biochemical reaction protocols.";
      difficulty = 4.5;
      practicalWeight = 45;
      theoryWeight = 55;
      futureJobOutlook = "Wildlife & Veterinary Research";
      transitionAdvisor = "A solid path to transition into biotechnology research, micro-biology industries, or marine life biology panels.";
    } else if (name.includes('PCBH')) {
      subjects = [
        { name: "Home Science & Human Nutrition", desc: "Principles of cooking biochemistry, dietary programs, resource management, and child study.", type: "core" as const },
        { name: "General Biology Organisms", desc: "Anatomy of vital systems, cell structures, and environmental botany.", type: "core" as const },
        { name: "Applied Chemistry & Food Assays", desc: "Organic compounds, physical chemistry, and food adulteration diagnostics.", type: "core" as const },
        { name: "Applied Nutrition & Pathology Lab", desc: "Diet plan structuring, diagnostic blood indicators, and hygiene auditing.", type: "practical" as const }
      ];
      exams = [
        { name: "NEET UG", type: "National Entrance", details: "For MBBS, BAMS, Nursing.", status: "Extremely Intense", link: "neet.nta.nic.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "B.Sc Home Science, Food & Nutrition at central universities.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka state quota medical/paramedical.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "AIHMCT WAT", type: "National Entrance", details: "Army Institute of Hotel Management (hospitality + nutrition track).", status: "Hospitality Track", link: "aihm.nic.in" },
        { name: "ICAR AIEEA", type: "National Entrance", details: "B.Sc in Food Technology, Home Science (agriculture universities).", status: "Allied Star", link: "icar.org.in" }
      ];
      lifeAsStudent = "Exposed to practical life sciences—dietary charting, food testing labs, structural textile checking, and human sociology.";
      difficulty = 3.5;
      practicalWeight = 50;
      theoryWeight = 50;
      futureJobOutlook = "Nutrition & Healthcare Hospitality";
      transitionAdvisor = "Very easy to transition into clinical nutrition, dietetics consultancy, hotel management, or developmental psychology.";
    } else if (name.startsWith('PCB')) {
      // General path for any remaining PCB combinations
      subjects = [
        { name: "Cellular Zoology & Animal Taxonomies", desc: "Cardiovascular, neural, and digestive mechanisms in animal frameworks; evolutionary genetics.", type: "core" as const },
        { name: "Plant Botanical Physiology", desc: "Photosynthesis, plant hormones, ecological systems, taxonomy, and flora survival genetics.", type: "core" as const },
        { name: "Applied Chemistry & Biochemistry", desc: "Organic mechanisms, functional polymers, electrochemistry, and biochemical compounds.", type: "core" as const },
        { name: "Medical Physics & Optics", desc: "Principles of ray optics, nuclear energy, mechanics of pressure, and acoustic frequencies.", type: "core" as const },
        { name: "Microscopy & Biotechnology Lab", desc: "Staining slides, genetic splicing models, botanical mapping, and buffer titration tests.", type: "practical" as const }
      ];
      exams = [
        { name: "NEET UG", type: "National Entrance", details: "Standard clinical screening for MBBS, dental BDS, and ancient healthcare medicine programs.", status: "Extreme Competition", link: "neet.nta.nic.in" },
        { name: "AIIMS Nursing & Allied Health", type: "National Hospital", details: "Exclusive hospital screening admitting to premier AIIMS branches in medical science support roles.", status: "High Security" },
        { name: "State Common Entrance Test (CET)", type: "State Administered", details: "For professional entry into physiotherapy BPT, medical laboratory technology, or pharma B.Pharm programs.", status: "Top Backup", link: "cetonline.karnataka.gov.in" }
      ];
      lifeAsStudent = "Heavy terminology work and systematic note-making. Expect to balance biological system taxonomy files with intense laboratory tasks.";
      difficulty = 4.5;
      practicalWeight = 40;
      theoryWeight = 60;
      futureJobOutlook = "Highly Respected Healthcare";
      transitionAdvisor = "Very flexible for molecular genetics, cosmetics formulation, food tech, micro-pathology, or healthcare clinical research.";
    } else if (name === 'PCM' || name.startsWith('PCM (')) {
      subjects = [
        { name: "Physics & Electromagnetism", desc: "Mechanics, thermodynamics, wave theory, electrostatics, optics, magnetic fields and modern nuclear physics.", type: "core" as const },
        { name: "Analytical Chemistry", desc: "Organic synthesis, inorganic periodic properties, rate kinetics, electrochemistry, and coordination compounds.", type: "core" as const },
        { name: "Advanced Mathematics", desc: "Coordinate geometry, calculus (differential & integral), linear algebra, probability, and trigonometric functions.", type: "core" as const },
        { name: "General English", desc: "Grammar, writeups, communications, and literary comprehension.", type: "elective" as const }
      ];
      exams = [
        { name: "JEE Main", type: "National Entrance", details: "National exam for NITs, IIITs, CFTIs. Conducted twice/year by NTA.", status: "Highly Competitive", link: "jeemain.nta.nic.in" },
        { name: "JEE Advanced", type: "National Entrance", details: "For IIT admissions. Only top 2.5L JEE Main qualifiers eligible.", status: "Elite Technical", link: "jeeadv.ac.in" },
        { name: "KCET", type: "State Administered", details: "Karnataka CET for state engineering colleges.", status: "Top Choice", link: "cetonline.karnataka.gov.in" },
        { name: "BITSAT", type: "Private University", details: "BITS Pilani entrance (Pilani, Goa, Hyderabad campuses).", status: "High Premium", link: "bitsadmission.com" },
        { name: "VITEEE", type: "Private University", details: "VIT University entrance for B.Tech.", status: "Popular Track", link: "vit.ac.in/viteee" },
        { name: "COMEDK UGET", type: "Private Board", details: "Private engineering colleges in Karnataka.", status: "Regional Advantage", link: "comedk.org" },
        { name: "SRMJEE", type: "Private University", details: "SRM University engineering entrance.", status: "Popular Track", link: "srmist.edu.in" },
        { name: "CUET (UG)", type: "National Entrance", details: "For central universities offering B.Sc Mathematics, B.Sc Physics, B.Sc Chemistry, BCA, etc.", status: "Central Exam", link: "cuet.samarth.ac.in" },
        { name: "NDA Exam", type: "Defense Entrance", details: "National Defence Academy for entering Army, Navy, or Air Force.", status: "Elite National", link: "upsc.gov.in" }
      ];
      lifeAsStudent = "Intensely analytical. You will spend time solving complex physics numericals, chemical reactions, and calculus equations.";
      difficulty = 4.8;
      practicalWeight = 50;
      theoryWeight = 50;
      futureJobOutlook = "High Demand Tech & Defense";
      transitionAdvisor = "Excellent versatility. You can pursue B.Tech, pure sciences (B.Sc), architecture, BCA, or join national defense wings with PCM.";
      eligibilityWarning = "❌ PCM students are NOT eligible for NEET (no Biology in curriculum)";
    } else if (name.includes('CEBA') || name.includes('SEBA') || name.includes('HEBA') || name.includes('ABMS') || name.includes('EBAC') || name.includes('BSBA') || name.includes('CSBA') || name.includes('COMMERCE')) {
      // COMMERCE STREAM
      subjects = [
        { name: "Principles of Accountancy", desc: "Double-entry systems, ledger bookkeeping, trial balances, Depreciation accounting, and final statement preparation.", type: "core" as const },
        { name: "Business Organization & Admin", desc: "Internal management, partnership firms, corporate hierarchies, planning, and workforce governance.", type: "core" as const },
        { name: "Macro & Micro Economics", desc: "Demand-supply curves, Gross Domestic Product, banking systems, taxation, and international trade.", type: "core" as const },
        { name: "Commercial & Business Mathematics", desc: "Logarithms, matrices, standard deviation calculations, financial equations and indexes.", type: "core" as const },
        { name: "Computer Operations Lab", desc: "Structured databases, computerized spreadsheets (Excel/Tally), and financial data models.", type: "practical" as const }
      ];
      
      const allCommerceExams = [
        { name: "CUET (UG)", type: "National Entrance", details: "Central Universities — B.Com, BBA, BA Economics. Mandatory for DU, JNU, BHU etc.", status: "Central Exam", link: "cuet.samarth.ac.in", bestFor: "All Commerce combos" },
        { name: "IPMAT", type: "National Entrance", details: "IIM Indore/Rohtak 5-year Integrated MBA (after 12th!)", status: "Elite Executive", link: "ipmat.ac.in", bestFor: "All Commerce combos (Mathematics is highly beneficial)" },
        { name: "NPAT (NMIMS)", type: "Private Entrance", details: "NMIMS Mumbai — BBA, B.Com, B.Sc Finance", status: "Popular Track", link: "nmims.edu", bestFor: "All Commerce combos" },
        { name: "SET (Symbiosis)", type: "Private Entrance", details: "Symbiosis University — BBA, B.Com, BA", status: "Popular Track", link: "set-test.org", bestFor: "All Commerce combos" },
        { name: "CA Foundation", type: "Professional licensing", details: "ICAI — Chartered Accountancy (CPT replaced by Foundation)", status: "Gold Standard", link: "icai.org", bestFor: "Combos with Accountancy" },
        { name: "CS Foundation (CSEET)", type: "Professional licensing", details: "ICSI — Company Secretary program", status: "Highly Professional", link: "icsi.edu", bestFor: "All Commerce combos" },
        { name: "CMA Foundation", type: "Professional licensing", details: "ICMAI — Cost & Management Accountancy", status: "Highly Professional", link: "icmai.in", bestFor: "Combos with Accountancy/Maths" },
        { name: "CLAT", type: "National Entrance", details: "Law — BBA LLB / B.Com LLB at NLUs", status: "Elite Law", link: "consortiumofnlus.ac.in", bestFor: "All Commerce combos" },
        { name: "AILET", type: "National Entrance", details: "NLU Delhi law entrance", status: "Elite Law", link: "nationallawuniversitydelhi.in", bestFor: "All Commerce combos" },
        { name: "AIMA UGAT", type: "National Entrance", details: "BBA/BHM/B.Com at AIMA-affiliated colleges", status: "Standard Track", link: "aima.in", bestFor: "All Commerce combos" },
        { name: "DU JAT", type: "National Entrance", details: "Delhi University — BMS, BA (H) Business Economics. Strictly requires 12th Mathematics as a mandatory core subject.", status: "Top Choice", link: "du.ac.in", bestFor: "ABMS" },
        { name: "NCHMCT JEE", type: "National Entrance", details: "Hotel Management at IHMs (National Council)", status: "Hospitality Track", link: "nchmct.org", bestFor: "All Commerce combos" }
      ];

      const hasMath = name.includes('ABMS') || name.includes('MATH');
      if (!hasMath) {
        // Filter out DU JAT since it strictly requires Class 12 Mathematics.
        exams = allCommerceExams.filter(exam => exam.name !== "DU JAT");
        eligibilityWarning = "❌ Non-Math Commerce students are NOT eligible for DU BMS / BBA-FIA, B.Sc Finance, and other courses requiring Class 12 Mathematics.";
      } else {
        exams = allCommerceExams;
      }

      lifeAsStudent = "Dynamic and modern. You'll work on spreadsheets, analyze corporate case studies, calculate capital flows, and balance digital ledger files.";
      difficulty = 3.5;
      practicalWeight = 45;
      theoryWeight = 55;
      futureJobOutlook = "Excellent FinTech & Banking";
      transitionAdvisor = "Highly versatile. You can transition directly to corporate law (via CLAT), web design, digital branding, or public management.";
      if (name.includes('EBAC') || name.includes('CSBA')) {
        specialNote = "💡 Special note: EBAC & CSBA (with Computer Science) students are also eligible for BCA programs, with some colleges accepting CUET scores or their own entrance tests.";
      }
    } else if (name.includes('HEPS') || name.includes('HEPP') || name.includes('HESP') || name.includes('EPS') || name.includes('JPE') || name.includes('ARTS') || name.includes('HUMANITIES')) {
      // ARTS / HUMANITIES STREAM
      subjects = [
        { name: "Indian Constitution & Governance", desc: "Legislative systems, judicial activism, parliamentary assemblies, and comparative public politics.", type: "core" as const },
        { name: "Clinical & Social Psychology", desc: "Human developmental behaviors, cognitive structures, biological psychology, and mental health studies.", type: "core" as const },
        { name: "Journalism & Broadcast Media", desc: "News gathering, digital media editing, broadcasting laws, and speech acoustics.", type: "practical" as const },
        { name: "Economic History & Civilizations", desc: "State budget systems, agrarian structures, fiscal policies, and world histories.", type: "core" as const },
        { name: "Speech & Creative Communication Lab", desc: "Debating, scripting documentaries, conducting peer reviews, and audio editing.", type: "practical" as const }
      ];

      const allArtsExams = [
        { name: "CUET (UG)", type: "National Entrance", details: "The most important Arts exam. For BA at DU, JNU, BHU, AMU (250+ universities). Domain subjects: History, PolSci, Economics, Sociology, Psychology", status: "Central Exam", link: "cuet.samarth.ac.in", bestFor: "All Arts combos" },
        { name: "CLAT", type: "National Entrance", details: "Law at 24 National Law Universities — B.A. LLB. English + GK + Legal Reasoning", status: "Elite Law", link: "consortiumofnlus.ac.in", bestFor: "All Arts combos — no Maths needed" },
        { name: "AILET", type: "National Entrance", details: "NLU Delhi — highly competitive law entrance", status: "Elite Law", link: "nationallawuniversitydelhi.in", bestFor: "All Arts combos" },
        { name: "SLAT (Symbiosis)", type: "Private Entrance", details: "Symbiosis Law School entrance", status: "Popular Track", link: "set-test.org", bestFor: "All Arts combos" },
        { name: "TISS BAT", type: "Elite National", details: "TISS Mumbai — BA Social Sciences, Development, Policy", status: "Elite Humanitarian", link: "tiss.edu", bestFor: "HEPS, HEPP, HESP, EPS" },
        { name: "IIMC Entrance", type: "Elite National", details: "Indian Institute of Mass Communication — Journalism PG (also applicable after graduation)", status: "Journalism Track", link: "iimc.gov.in", bestFor: "JPE especially" },
        { name: "NIFT GAT/CAT", type: "National Entrance", details: "Fashion & Design — open to all streams", status: "Design & Fashion", link: "niftadmissions.in", bestFor: "All Arts combos" },
        { name: "NID DAT", type: "National Entrance", details: "National Institute of Design — B.Des", status: "Design Academy", link: "admissions.nid.edu", bestFor: "All Arts combos" },
        { name: "UCEED", type: "National Entrance", details: "IIT-conducted Design entrance — B.Des at IITs", status: "Elite Design", link: "uceed.iitb.ac.in", bestFor: "All Arts combos" },
        { name: "SET (Symbiosis)", type: "Private Entrance", details: "BA Liberal Arts, Media, Psychology at Symbiosis", status: "Popular Track", link: "set-test.org", bestFor: "HEPP, HESP, EPS" },
        { name: "IPMAT", type: "National Entrance", details: "IIM Integrated MBA — some Arts students with strong aptitude apply", status: "Management Track", link: "ipmat.ac.in", bestFor: "EPS, JPE" },
        { name: "SSC CHSL", type: "National Entrance", details: "Government jobs (LDC, DEO) — 12th pass eligible", status: "Civil Services", link: "ssc.nic.in", bestFor: "All Arts combos" }
      ];

      // Arts combinations (HEPS, HEPP, HESP, EPS, JPE) lack Mathematics and Physics.
      // Therefore, they are not eligible for DU JAT (relying on Maths) or NDA (Navy & Air Force wings requiring Physics & Maths).
      exams = allArtsExams;
      eligibilityWarning = "❌ Arts students are NOT eligible for DU BMS / Business Economics, Air Force & Navy wings of NDA, and courses requiring Science/Mathematics in 12th.";

      lifeAsStudent = "Reflective and debate-centric. You will spend time reading extensive texts, writing essays, conducting social research projects, and analyzing mock court reviews.";
      difficulty = 3;
      practicalWeight = 35;
      theoryWeight = 65;
      futureJobOutlook = "Highly Prestigious Policy & Advisory";
      transitionAdvisor = "Extremely versatile. You can transition smoothly to international relation councils, clinical counseling center internships, corporate HR, or marketing media houses.";
    }
  } else if (sid === 'diploma') {
    if (name.includes('ENGINEERING')) {
      subjects = [
        { name: "Computer Science Engineering", desc: "Software development, algorithms, web technologies, and database management systems.", type: "core" as const },
        { name: "Mechanical Engineering", desc: "Machine design, thermodynamics, manufacturing processes, and industrial mechanics.", type: "core" as const },
        { name: "Civil Engineering", desc: "Structural analysis, construction technology, urban planning, and surveying.", type: "core" as const },
        { name: "Electrical & Electronics", desc: "Power systems, circuit analysis, control systems, and electrical machine design.", type: "core" as const },
        { name: "Electronics & Communication", desc: "Signal processing, wireless communications, embedded systems, and VLSI design.", type: "practical" as const },
        { name: "AI & Machine Learning", desc: "Neural networks, data science, predictive modeling, and intelligent systems.", type: "practical" as const },
        { name: "Robotics & Automation", desc: "Robotic mechanics, sensor integration, automated control, and industrial robotics.", type: "practical" as const },
        { name: "Mechatronics Engineering", desc: "Synergy of mechanical, electrical, and computer systems for smart manufacturing.", type: "practical" as const },
        { name: "Automobile Engineering", desc: "Vehicle design, engine technologies, automotive electronics, and transport systems.", type: "practical" as const },
        { name: "Aeronautical Engineering", desc: "Aerodynamics, aircraft structures, propulsion systems, and flight mechanics.", type: "practical" as const },
        { name: "IT Engineering", desc: "Network security, cloud computing, systems administration, and information management.", type: "core" as const },
        { name: "Chemical Engineering", desc: "Process design, chemical reactions, thermodynamics, and material science.", type: "core" as const }
      ];
      exams = [
        { name: "Lateral Entry DCET (State Boards)", type: "State Administered", details: "Provides entry directly into the 3rd Semester (2nd Year) of regional B.E./B.Tech engineering programs, bypassing Class 11 and 12 completely.", status: "Direct Degree Leap", link: "cetonline.karnataka.gov.in" },
        { name: "SSC Junior Engineer (JE)", type: "Government Job", details: "Huge All-India civil service board exam offering permanent Junior Engineer positions in railways and public works departments.", status: "Direct Federal Career", link: "ssc.nic.in" },
        { name: "State PWD / PSU Technical Exams", type: "Public Org Recruitment", details: "State board test verifying technical drawing, building material selection, and code safety values.", status: "Highly Secured" }
      ];
      lifeAsStudent = "Exceedingly practical. You will work on machinery, compile code in computer labs, test circuit boards, and write weekly laboratory journals.";
      difficulty = 4;
      practicalWeight = 75;
      theoryWeight = 25;
      futureJobOutlook = "Very High Industry Demands";
      transitionAdvisor = "Very secure. You can jump directly to 2nd year engineering degrees (Lateral entry), skip secondary boards, or start direct government service.";
    } else if (name.includes('DESIGN') || name.includes('MEDIA')) {
      subjects = [
        { name: "UI/UX Design", desc: "Mastering user research, wireframing, high-fidelity prototyping, and interactive interface design.", type: "practical" as const },
        { name: "VFX & Animation", desc: "Visual effects, 3D modeling, cinematic compositing, and advanced motion graphics production.", type: "practical" as const },
        { name: "Interior Design", desc: "Space planning, structural aesthetics, material selection, and sustainable architectural design.", type: "core" as const },
        { name: "Film Making & Media", desc: "Cinematography, digital editing, sound design, and creative narrative production for digital media.", type: "practical" as const },
        { name: "Graphic Design", desc: "Brand identity, typography, layout systems, and visual communication principles.", type: "core" as const },
        { name: "Fashion Design", desc: "Garment construction, apparel design, fashion illustration, textile science, and fashion marketing.", type: "core" as const },
        { name: "Photography & Visuals", desc: "Camera mechanics, studio lighting, digital composition, photo editing, and commercial photography.", type: "practical" as const },
        { name: "Video Editing", desc: "Non-linear video editing, sound synchronization, color grading, and video formatting for digital platforms.", type: "practical" as const },
        { name: "Multimedia Production", desc: "Interactive media, digital publishing, web integration, and multimedia presentation techniques.", type: "practical" as const }
      ];
      exams = [
        { name: "NID DAT (Diploma Track)", type: "National Entrance", details: "Design aptitude test for premier National Institute of Design programs.", status: "Elite Creative", link: "admissions.nid.edu" },
        { name: "NIFT GAT (General Aptitude)", type: "National Entrance", details: "Entrance for National Institute of Fashion Technology diploma programs.", status: "Design Standard", link: "niftadmissions.in" },
        { name: "Portfolio Review", type: "Industry Standard", details: "Critical evaluation of creative works for professional design studio entry.", status: "Career Gateway" }
      ];
      lifeAsStudent = "Highly creative and studio-based. You will spend hours on digital canvases, creating visual narratives, and building design portfolios.";
      difficulty = 3.5;
      practicalWeight = 85;
      theoryWeight = 15;
      futureJobOutlook = "High Demand Creative Tech";
      transitionAdvisor = "Excellent. You can transition into freelance design, digital marketing agencies, or pursue a full B.Des degree.";
    } else if (name.includes('HOTEL') || name.includes('CATERING')) {
      subjects = [
        { name: "Hotel Management", desc: "Comprehensive overview of hotel operations, hospitality laws, and business management in the global tourism industry.", type: "core" as const },
        { name: "Food Production", desc: "Professional culinary techniques, global cuisine mastery, and industrial kitchen operations.", type: "practical" as const },
        { name: "Front Office Management", desc: "Guest relations, lobby management systems, and hospitality administration excellence.", type: "core" as const },
        { name: "Bakery & Confectionery", desc: "Art of professional baking, pastry arts, chocolate crafting, and dessert presentation.", type: "practical" as const },
        { name: "Housekeeping", desc: "Maintenance of high cleanliness standards, laundry operations, and room management in luxury environments.", type: "practical" as const },
        { name: "Food & Beverage Service", desc: "Professional service techniques, restaurant management, banquet operations, and mixology basics.", type: "practical" as const },
        { name: "Catering Technology", desc: "Large-scale food service management, banquet operations, and institutional catering systems.", type: "core" as const }
      ];
      exams = [
        { name: "NCHMCT JEE", type: "National Entrance", details: "Standard exam for Institute of Hotel Management (IHM) admissions.", status: "National Standard", link: "nchmct.org" },
        { name: "Institutional Entrance Tests", type: "Private University", details: "Entrance exams for premier private hotel management schools like WGSHA or Oberoi.", status: "Premium Track" },
        { name: "Skill Assessment Interviews", type: "Industry Evaluation", details: "Practical tests for culinary or service skills by global hotel chains.", status: "Direct Placement" }
      ];
      lifeAsStudent = "Professional and disciplined. Expect rigorous grooming standards, real-time service drills, and kitchen-based laboratory work.";
      difficulty = 3;
      practicalWeight = 70;
      theoryWeight = 30;
      futureJobOutlook = "Global Hospitality Opportunities";
      transitionAdvisor = "Flexible. Leads to careers in cruises, airlines, luxury resorts, or entrepreneurship in the food industry.";
    } else if (name.includes('AGRICULT') || name.includes('HORTICULT')) {
      subjects = [
        { name: "Agriculture", desc: "Foundational study of crop production, soil management, and sustainable farming systems.", type: "core" as const },
        { name: "Agricultural Engineering", desc: "Farm machinery design, irrigation tech, and agricultural infrastructure systems.", type: "core" as const },
        { name: "Agriculture Technology", desc: "Modern tech in farming, smart irrigation, precision agriculture, and agri-robotics.", type: "practical" as const },
        { name: "Horticulture", desc: "Science of fruit, vegetable, and flower cultivation, and greenhouse management.", type: "core" as const },
        { name: "Sericulture", desc: "Art and science of silk production, silkworm rearing, and mulberry cultivation.", type: "practical" as const },
        { name: "Dairy Technology", desc: "Milk processing, dairy product engineering, quality control, and industrial dairy management.", type: "practical" as const },
        { name: "Food Technology", desc: "Principles of food processing, preservation, nutrition, and safety standards.", type: "core" as const },
        { name: "Organic Farming", desc: "Sustainable agriculture, bio-fertilizers, natural pest control, and eco-friendly farming.", type: "practical" as const }
      ];
      exams = [
        { name: "ICAR AIEEA (Diploma)", type: "National Entrance", details: "Entrance for agricultural universities offering diploma and degree tracks.", status: "Agri Standard", link: "icar.org.in" },
        { name: "State Agriculture CET", type: "State Administered", details: "Regional entrance for state-run agriculture colleges and institutes.", status: "Regional Advantage" },
        { name: "Diploma Lateral Entry (Agri)", type: "Academic Leap", details: "Enables direct entry into B.Sc Agriculture 2nd year in some universities.", status: "Direct Degree Path" }
      ];
      lifeAsStudent = "Nature-connected and field-intensive. You will balance classroom theory with outdoor crop trials, soil testing, and farm machinery operation.";
      difficulty = 3.5;
      practicalWeight = 65;
      theoryWeight = 35;
      futureJobOutlook = "Sustainable & Essential Tech";
      transitionAdvisor = "Very stable. Can pivot into farm management, agri-business startups, or government agricultural development departments.";
    } else if (name.includes('PHARMACY')) {
      subjects = [
        { name: "D.Pharm (Diploma in Pharmacy)", desc: "Essential pharmaceutical training, drug formulations, and clinical dispensing certification.", type: "core" as const },
        { name: "Pharmacy Assistant", desc: "Support roles in pharmacy operations, stock management, and prescription processing assistance.", type: "core" as const },
        { name: "Clinical Pharmacy", desc: "Application of pharmaceutical knowledge in patient care settings and medication therapy management.", type: "practical" as const },
        { name: "Pharmaceutical Chemistry", desc: "Study of chemical composition, synthesis, and analysis of drugs and biological substances.", type: "core" as const },
        { name: "Pharmaceutics Lab", desc: "Hands-on drug preparation, dosage form design, and pharmaceutical analysis.", type: "practical" as const },
        { name: "Hospital Pharmacy", desc: "Clinical inventory management, patient counseling, and healthcare retail operations.", type: "core" as const }
      ];
      exams = [
        { name: "D.Pharm Exit Exam", type: "Licensing Board", details: "Mandatory exam for registration with the Pharmacy Council of India (PCI).", status: "Professional Gate" },
        { name: "State Pharmacy Council Board", type: "State Administered", details: "Verification of clinical competence for community pharmacist registration.", status: "Mandatory License" },
        { name: "Hospital Recruitment Exams", type: "Public Service", details: "Entrance for pharmacist roles in government hospitals (ESIC, Railways).", status: "Secured Career" }
      ];
      lifeAsStudent = "Precision-focused and laboratory-heavy. You will spend significant time measuring chemicals, studying drug interactions, and hospital internships.";
      difficulty = 4;
      practicalWeight = 60;
      theoryWeight = 40;
      futureJobOutlook = "Stable Healthcare Demand";
      transitionAdvisor = "Direct. Allows opening retail pharmacies, working in pharmaceutical manufacturing, or pursuing a B.Pharm degree.";
    } else if (name.includes('NURSING')) {
      subjects = [
        { name: "GNM (General Nursing & Midwifery)", desc: "Comprehensive patient care training, clinical nursing, and community health services.", type: "core" as const },
        { name: "ANM (Auxiliary Nursing Midwifery)", desc: "Essential maternal and child health services, first-aid, and rural healthcare support.", type: "core" as const },
        { name: "Patient Care Technician", desc: "Specialized training in patient assistance, vital signs monitoring, and diagnostic support in clinical settings.", type: "practical" as const },
        { name: "Home Nursing", desc: "Personalized healthcare services, geriatric care, and recovery support for patients in residential environments.", type: "practical" as const },
        { name: "Clinical Nursing Practice", desc: "Hands-on ward training, patient monitoring, and critical care assistance.", type: "practical" as const }
      ];
      exams = [
        { name: "GNM / ANM Entrance Exam", type: "State/Institutional", details: "Entrance for nursing diploma programs at recognized nursing schools.", status: "Competitive Entry" },
        { name: "State Nursing Council Board", type: "State Administered", details: "Licensing exam for Registered Nurse (RN) status.", status: "Mandatory License" },
        { name: "Hospital Staff Selection", type: "Institutional Screen", details: "Direct screening by major hospitals for staff nurse positions.", status: "Direct Placement" }
      ];
      lifeAsStudent = "Compassionate and duty-oriented. Expect long hours in hospital wards, hands-on patient care training, and rigorous clinical rosters.";
      difficulty = 4;
      practicalWeight = 70;
      theoryWeight = 30;
      futureJobOutlook = "Global Healthcare Shortage";
      transitionAdvisor = "Strong. Opens doors to international nursing careers (NCLEX), hospital management, or B.Sc Nursing.";
    } else if (name.includes('TOURISM') || name.includes('TRAVEL')) {
      subjects = [
        { name: "Travel and Tourism Management", desc: "Foundational principles of travel agency operations, tourism marketing, and global industry standards.", type: "core" as const },
        { name: "Airport Management", desc: "Aviation operations, ground handling, terminal management, and logistics systems.", type: "core" as const },
        { name: "Hospitality & Tourism", desc: "International travel marketing, destination planning, and luxury guest relations.", type: "core" as const },
        { name: "Tour Guide", desc: "Professional guiding techniques, heritage interpretation, communication skills, and group management.", type: "practical" as const },
        { name: "Air Ticketing & GDS", desc: "Proficiency in global distribution systems like Amadeus/Galileo for flight bookings and ticketing.", type: "practical" as const }
      ];
      exams = [
        { name: "IATA Certification Exams", type: "Global Standard", details: "International Air Transport Association certifications for travel professionals.", status: "Global Passport", link: "iata.org" },
        { name: "Tourism Board Licensing", type: "State/National", details: "Official certification for tour guides and travel agencies.", status: "Professional Gate" },
        { name: "Airline Selection Tests", type: "Corporate Board", details: "Aptitude and personality tests for ground staff and airport management roles.", status: "Career Direct" }
      ];
      lifeAsStudent = "Dynamic and globally focused. You will work on itinerary builders, practice communication skills, and study world geography.";
      difficulty = 3;
      practicalWeight = 60;
      theoryWeight = 40;
      futureJobOutlook = "Growing Leisure Economy";
      transitionAdvisor = "Versatile. Leads to roles in airlines, cruise ships, event management, or starting a travel agency.";
    } else if (name.includes('FIRE') || name.includes('SAFETY')) {
      subjects = [
        { name: "Disaster Management", desc: "Emergency response protocols, rescue operations, and hazard mitigation strategies.", type: "practical" as const },
        { name: "Fire Engineering Science", desc: "Principles of fire chemistry, fire prevention technology, and industrial safety.", type: "core" as const },
        { name: "Occupational Health and Safety", desc: "Workplace hazard identification, health standards, risk assessment, and safety management systems.", type: "core" as const },
        { name: "Environmental Safety", desc: "Industrial pollution control, waste management, environmental audits, and sustainability protocols.", type: "practical" as const },
        { name: "Industrial Safety (HSE)", desc: "Workplace safety auditing, health protocols, and environmental hazard control.", type: "core" as const }
      ];
      exams = [
        { name: "NEBOSH / IOSH Certificates", type: "International Standard", details: "Globally recognized certifications in health and safety at work.", status: "High Premium", link: "nebosh.org.uk" },
        { name: "State Fire Service Exam", type: "Government Recruitment", details: "Selection for fire fighter and safety officer roles in public departments.", status: "Secured Career" },
        { name: "Industrial Safety Board", type: "Institutional Screen", details: "Certification for safety supervisors in chemical and manufacturing plants.", status: "Industrial Gateway" }
      ];
      lifeAsStudent = "Safety-critical and drill-intensive. Expect physically demanding safety drills, hazard analysis exercises, and technical equipment labs.";
      difficulty = 3.5;
      practicalWeight = 75;
      theoryWeight = 25;
      futureJobOutlook = "Critical Compliance Demand";
      transitionAdvisor = "Secure. Can lead to roles in industrial safety, environmental consulting, or government fire services.";
    } else {
      subjects = [
        { name: "Computer Science Engineering", desc: "Software development, algorithms, web technologies, and database management systems.", type: "core" as const },
        { name: "Mechanical Engineering", desc: "Machine design, thermodynamics, manufacturing processes, and industrial mechanics.", type: "core" as const },
        { name: "Civil Engineering", desc: "Structural analysis, construction technology, urban planning, and surveying.", type: "core" as const },
        { name: "Electrical & Electronics", desc: "Power systems, circuit analysis, control systems, and electrical machine design.", type: "core" as const },
        { name: "Electronics & Communication", desc: "Signal processing, wireless communications, embedded systems, and VLSI design.", type: "practical" as const },
        { name: "AI & Machine Learning", desc: "Neural networks, data science, predictive modeling, and intelligent systems.", type: "practical" as const },
        { name: "Robotics & Automation", desc: "Robotic mechanics, sensor integration, automated control, and industrial robotics.", type: "practical" as const },
        { name: "Mechatronics Engineering", desc: "Synergy of mechanical, electrical, and computer systems for smart manufacturing.", type: "practical" as const },
        { name: "Automobile Engineering", desc: "Vehicle design, engine technologies, automotive electronics, and transport systems.", type: "practical" as const },
        { name: "Aeronautical Engineering", desc: "Aerodynamics, aircraft structures, propulsion systems, and flight mechanics.", type: "practical" as const },
        { name: "IT Engineering", desc: "Network security, cloud computing, systems administration, and information management.", type: "core" as const },
        { name: "Chemical Engineering", desc: "Process design, chemical reactions, thermodynamics, and material science.", type: "core" as const }
      ];
      exams = [
        { name: "Lateral Entry DCET (State Boards)", type: "State Administered", details: "Provides entry directly into the 3rd Semester (2nd Year) of regional B.E./B.Tech engineering programs, bypassing Class 11 and 12 completely.", status: "Direct Degree Leap", link: "cetonline.karnataka.gov.in" },
        { name: "SSC Junior Engineer (JE)", type: "Government Job", details: "Huge All-India civil service board exam offering permanent Junior Engineer positions in railways and public works departments.", status: "Direct Federal Career", link: "ssc.nic.in" },
        { name: "State PWD / PSU Technical Exams", type: "Public Org Recruitment", details: "State board test verifying technical drawing, building material selection, and code safety values.", status: "Highly Secured" }
      ];
      lifeAsStudent = "Exceedingly practical. You will work on machinery, compile code in computer labs, test circuit boards, and write weekly laboratory journals.";
      difficulty = 4;
      practicalWeight = 75;
      theoryWeight = 25;
      futureJobOutlook = "Very High Industry Demands";
      transitionAdvisor = "Very secure. You can jump directly to 2nd year engineering degrees (Lateral entry), skip secondary boards, or start direct government service.";
    }
  } else if (sid === 'paramedical') {
    subjects = [
      { name: "Human Anatomy & System Physiology", desc: "Structure of vital systems, digestive loops, circulatory patterns, respiratory systems, and basic cellular functions.", type: "core" as const },
      { name: "Clinical Biochemistry & Pathology", desc: "Testing blood vials, chemical diagnostic indicator scales, urine assays, and viral pathogen culture screenings.", type: "practical" as const },
      { name: "Radiology Safety & Scanner Imaging", desc: "Positioning digital X-ray grids, diagnostic plate calibration, and CT scanner maintenance.", type: "practical" as const },
      { name: "Sterile Operating Protocols", desc: "Surgical steel autoclaving, oxygen flow verification, and ICU safety monitoring.", type: "practical" as const }
    ];
    exams = [
      { name: "State Paramedical Board Licensure", type: "State Certificate", details: "Crucial professional licensing exam allowing work in teaching hospitals and diagnostics.", status: "Mandatory License" },
      { name: "Allied Health Professional Common Test", type: "Institutional Screen", details: "Admitting students into full B.Sc in Allied Health sciences in central government clinical hubs.", status: "Subsidized Professional" },
      { name: "Railway Pharmacist / Tech Recruitment", type: "National Job Exam", details: "Centralized railway exam providing permanent technical healthcare vacancies.", status: "Secured Government", link: "ssc.nic.in" }
    ];
    lifeAsStudent = "Hospital-based and clinical. You will work directly with medical scanners, test tubes, and blood metrics during practical hospital rosters.";
    difficulty = 3.5;
    practicalWeight = 80;
    theoryWeight = 20;
    futureJobOutlook = "Critical Lifesaving Support";
    transitionAdvisor = "Strong pathway to BPT (Physiotherapy), advanced B.Sc in Imaging, or Diagnostic Center management.";
  } else if (sid === 'iti') {
    subjects = [
      { name: "Workshop Calculation & Science", desc: "Applied mathematics, unit conversions, material weights, and basic physical science for trades.", type: "core" as const },
      { name: "Trade Theory & Engineering Drawing", desc: "Foundational principles of your specific trade, reading blueprints, and technical sketching.", type: "core" as const },
      { name: "Trade Practical Lab", desc: "Hands-on workshop training, tool handling, machinery operation, and safety drills.", type: "practical" as const },
      { name: "Employability Skills", desc: "Digital literacy, communication skills, entrepreneurship, and workplace safety protocols.", type: "core" as const }
    ];
    exams = [
      { name: "All India Trade Test (AITT)", type: "National Certification", details: "The final NCVT assessment certifying trade competence across India.", status: "Primary License", link: "ncvtmis.gov.in" },
      { name: "State Council for Vocational Training (SCVT)", type: "State Administered", details: "Regional trade certification for local industry placements.", status: "Regional Entry" },
      { name: "Apprenticeship Mela Screen", type: "Industry Recruitment", details: "Direct screening by PSUs like Railways, BHEL, and HAL for apprentice roles.", status: "Direct Career" }
    ];
    lifeAsStudent = "Intensely practical and skill-based. You will spend 70% of your time in workshops, handling heavy machinery, and mastering manual precision.";
    difficulty = 2.5;
    practicalWeight = 85;
    theoryWeight = 15;
    futureJobOutlook = "High Demand Industrial Roles";
    transitionAdvisor = "Direct. You can enter 2nd year Diploma (Lateral entry) after finishing ITI or take government jobs in Railways and Defense.";
  } else if (sid === 'vocational') {
    if (name.includes('MARKETING') || name.includes('TALLY') || name.includes('EVENT')) {
      subjects = [
        { name: "Digital Branding & Analytics", desc: "Search Engine Optimization, Google Analytics, social media algorithms, and copy formatting.", type: "practical" as const },
        { name: "Saas Systems & Automated Billing", desc: "Tally Prime system operations, tax accounting ledger scripts, GST computing, and payroll schedules.", type: "practical" as const },
        { name: "Event Planning & PR", desc: "Budgeting, venue coordination, artist relations, media drafting, and sponsorship logic.", type: "core" as const },
        { name: "Business Ethics & Communications", desc: "Professional presentation, client relations, and commercial communication skills.", type: "core" as const }
      ];
      exams = [
        { name: "Meta Certified Digital Marketer", type: "Industry Standard", details: "Verifies mastery of social media advertising and campaign management.", status: "High Employability" },
        { name: "Tally Prime Gold Certification", type: "Accounting Licensing", details: "Proves expert auditing capability and corporate billing setups.", status: "Immediate Career" },
        { name: "Event Management Guild", type: "Professional Badge", details: "Certification for professional event coordinators and PR specialists.", status: "Career Gateway" }
      ];
      lifeAsStudent = "Exclusively computer and workspace-based. Building marketing plans, presenting design prototypes, and solving code problems on development systems.";
      difficulty = 3;
      practicalWeight = 80;
      theoryWeight = 20;
      futureJobOutlook = "Immediate Freelance & Job Offers";
      transitionAdvisor = "Fantastic. This career focus gets you hired fastest. You can bridge to B.Voc or digital marketing agencies easily.";
    } else if (name.includes('FULL STACK') || name.includes('DATA ANALYTICS') || name.includes('CYBERSECURITY')) {
      subjects = [
        { name: "Full Stack Scripting", desc: "HTML/Tailwind styling, JavaScript frameworks, and React.js web components.", type: "practical" as const },
        { name: "Data Warehousing & SQL", desc: "Writing backend data queries, managing Excel data tables, and presenting statistics reports.", type: "practical" as const },
        { name: "Cybersecurity Defense", desc: "Network security, vulnerability testing, ethical penetration, and malware diagnostics.", type: "core" as const },
        { name: "UI/UX Prototyping", desc: "Figma wireframing, layout grid alignments, and interactive interface design.", type: "practical" as const }
      ];
      exams = [
        { name: "Google Data Analytics Certificate", type: "Industry Standard", details: "Covers SQL, R-programming, and spreadsheet charts to prove analytic competence.", status: "High Employability" },
        { name: "AWS Cloud Practitioner Badge", type: "Global Vendor", details: "Verifies understanding of cloud computing frameworks and system scaling.", status: "Tech Catalyst" },
        { name: "CompTIA Security+", type: "Global Standard", details: "Foundational cybersecurity certification for network security professionals.", status: "Elite Security" }
      ];
      lifeAsStudent = "Technically rigorous. You will be coding for long hours, running security audits, and analyzing complex datasets.";
      difficulty = 4;
      practicalWeight = 90;
      theoryWeight = 10;
      futureJobOutlook = "High Growth Tech Sector";
      transitionAdvisor = "Excellent. You can transition into software engineering roles or pursue a full BCA/B.Sc IT degree.";
    } else if (name.includes('GRAPHIC') || name.includes('PHOTO') || name.includes('MUSIC') || name.includes('CONTENT')) {
      subjects = [
        { name: "Visual Media Arts", desc: "Graphic design, typography, layout systems, and brand identity principles.", type: "core" as const },
        { name: "Cinematography & Audio", desc: "Camera mechanics, lighting, sound design, and digital audio workstation (DAW) editing.", type: "practical" as const },
        { name: "Content Strategy & SEO", desc: "Script preparation, video presentation, audience analytics, and channel growth.", type: "practical" as const },
        { name: "Portfolio & Studio Work", desc: "Building physical assets, recording audio, and conducting multi-camera shoots.", type: "practical" as const }
      ];
      exams = [
        { name: "Adobe Certified Professional", type: "Vendor Standard", details: "Industry-standard certification for Photoshop, Illustrator, and Premiere Pro.", status: "Creative Standard" },
        { name: "Trinity Sound Lab Certification", type: "Music Standard", details: "Recognized certification for audio engineers and music producers.", status: "Artistic Gateway" },
        { name: "NAP Gold Certificate", type: "Academy Standard", details: "National Academy of Photography certification for visual artists.", status: "Professional Badge" }
      ];
      lifeAsStudent = "Creative and studio-based. Expect to spend hours on creative projects, recording sessions, and visual storytelling.";
      difficulty = 3.5;
      practicalWeight = 85;
      theoryWeight = 15;
      futureJobOutlook = "Thriving Creative Economy";
      transitionAdvisor = "Strong. Allows for a career in freelance arts, media production houses, or pursuing a BFA degree.";
    } else if (name.includes('BAKING') || name.includes('STYLING') || name.includes('BEAUTY') || name.includes('YOGA')) {
      subjects = [
        { name: "Lifestyle Craft & Wellness", desc: "Professional baking, interior styling, beauty cosmetology, or yoga posture mechanics.", type: "core" as const },
        { name: "Workshop Resource Allocation", desc: "Estimating materials, cost budgets, inventory calculations, and tool safety.", type: "core" as const },
        { name: "Sanitation & Physical Safety", desc: "Salon sanitation, oven operations, and client training safety protocols.", type: "practical" as const },
        { name: "Customer Relations & Billing", desc: "Managing client inquiries, appointments, and salon/boutique bookkeeping.", type: "practical" as const }
      ];
      exams = [
        { name: "Yoga Alliance RYT-200", type: "Global Standard", details: "The most recognized international yoga teacher training certification.", status: "Wellness Elite" },
        { name: "CIDESCO International Diploma", type: "Cosmetology Standard", details: "Premier global standard for beauty and spa therapy certifications.", status: "Beauty Leader" },
        { name: "City & Guilds Baking Badge", type: "Culinary Standard", details: "International certificate for professional bakers and pastry chefs.", status: "Chef Standard" }
      ];
      lifeAsStudent = "Active and hands-on. Building physical assets, conducting massage/yoga sessions, or working in a professional kitchen environment.";
      difficulty = 2.5;
      practicalWeight = 90;
      theoryWeight = 10;
      futureJobOutlook = "Stable Personal Services Industry";
      transitionAdvisor = "Very direct. Leads to self-employment, boutique ownership, or specialized wellness consultancy.";
    } else {
      subjects = [
        { name: "Specialized Skill Mastery", desc: "Hands-on instruction centering your creative, physical, or sound crafts.", type: "practical" as const },
        { name: "Workshop Resource Allocation", desc: "Estimating materials, cost budgets, inventory calculations, and tool safety.", type: "core" as const },
        { name: "Digital Brand Communications", desc: "Creating portfolios, managing customer inquiries, and publishing social layouts.", type: "practical" as const },
        { name: "Global Workplace Ethics & Language", desc: "Business presentation, customer service, and commercial communication.", type: "core" as const }
      ];
      exams = [
        { name: "National Vocational Board Guild", type: "State/National Certificate", details: "Guarantees formal competence and registers you with regional small business boards.", status: "Business Ready" },
        { name: "City & Guilds International Badge", type: "Global Professional", details: "Highly recognized international certificate facilitating work in premium hotels or centers abroad.", status: "Passport Approved" },
        { name: "Professional Guild Accreditation", type: "Licensing Board", details: "Assuring safety compliance standards for operating self-owned retail chains.", status: "Growth Booster" }
      ];
      lifeAsStudent = "Active, fast-paced, and workspace-based. Practical learning centered around industrial or creative skill acquisition.";
      difficulty = 3;
      practicalWeight = 80;
      theoryWeight = 20;
      futureJobOutlook = "Growing Skills-Based Economy";
      transitionAdvisor = "Flexible. Focuses on immediate job readiness while providing paths to higher vocational education.";
    }
  }

  return {
    subjects,
    exams,
    lifeAsStudent,
    difficulty,
    practicalWeight,
    theoryWeight,
    futureJobOutlook,
    transitionAdvisor,
    eligibilityWarning,
    specialNote
  };
}

function getSubjectImage(subjectName: string): string {
  const norm = subjectName.toLowerCase().trim();
  if (norm.includes('computer science') || norm.includes('cse')) {
    return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('mechanical')) {
    return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('civil')) {
    return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('electrical')) {
    return "https://images.unsplash.com/photo-1517420162514-99d3617b3b55?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('communication') || norm.includes('electronics & comm')) {
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('artificial intelligence') || norm.includes('ai & machine learning') || norm.includes('ai-ml')) {
    return "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('robotics')) {
    return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('mechatronics')) {
    return "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('automobile')) {
    return "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('aeronautical') || norm.includes('aerospace')) {
    return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('it engineering') || norm.includes('information technology')) {
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('chemical')) {
    return "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=600&auto=format&fit=crop&q=80";
  }
  
  // New Categories
  if (norm.includes('design') || norm.includes('animation') || norm.includes('multimedia') || norm.includes('photography') || norm.includes('film') || norm.includes('video') || norm.includes('vfx')) {
    return "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('hotel') || norm.includes('food production') || norm.includes('front office') || norm.includes('bakery') || norm.includes('housekeeping') || norm.includes('beverage') || norm.includes('catering')) {
    return "https://images.unsplash.com/photo-1551882547-ff40c63bc56b?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('agri') || norm.includes('horticulture') || norm.includes('sericulture') || norm.includes('dairy') || norm.includes('farming')) {
    return "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('pharm') || norm.includes('clinical pharmacy')) {
    return "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('nurse') || norm.includes('patient care')) {
    return "https://images.unsplash.com/photo-1584820927498-cfe5aea11d8d?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('tour') || norm.includes('travel') || norm.includes('hospitality')) {
    return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('safety') || norm.includes('industrial') || norm.includes('disaster') || norm.includes('environmental')) {
    return "https://images.unsplash.com/photo-1504917595617-75c12365287f?w=600&auto=format&fit=crop&q=80";
  }

  if (norm.includes('math') || norm.includes('calc') || norm.includes('stat') || norm.includes('proof')) {
    return "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80";
  }
  if (norm.includes('phys') || norm.includes('elect') || norm.includes('circuit') || norm.includes('frequency') || norm.includes('mechanic')) {
    return "https://images.unsplash.com/photo-1517420162514-99d3617b3b55?w=600&auto=format&fit=crop&q=80";
  }
  
  // Fallback
  return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80";
}

function getProjectImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('code') || t.includes('software') || t.includes('algorithm') || t.includes('web')) return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=80";
  if (t.includes('design') || t.includes('cad') || t.includes('model')) return "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&auto=format&fit=crop&q=80";
  if (t.includes('mechanical') || t.includes('machine') || t.includes('robot')) return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&auto=format&fit=crop&q=80";
  if (t.includes('civil') || t.includes('build')) return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&auto=format&fit=crop&q=80";
  if (t.includes('lab') || t.includes('test') || t.includes('experiment')) return "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=200&auto=format&fit=crop&q=80";
  return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80";
}

function getSubjectFullDetails(subjectName: string, subjectDesc: string, subjectType: string) {
  const name = subjectName.toLowerCase().trim();
  
  // Specific Engineering Streams
  if (name === 'computer science engineering') {
    return {
      topics: [
        "Advanced Data Structures & Analysis of Algorithms",
        "Object-Oriented Programming (OOPs) using C++ & Java",
        "Database Management Systems & SQL Query Optimizations",
        "Computer Networks, TCP/IP Protocols & Web Technologies"
      ],
      projects: [
        "Developing a full-stack student information system with database connectivity",
        "Coding custom algorithmic sorting visualizers and performance profiling tools",
        "Configuring and simulating a local intranet with custom subnets and DNS routing"
      ],
      value: "Serves as the absolute premier gateway for Software Engineering, Full-Stack Web Development, Systems Architecture, and lucrative IT sector placements.",
      tips: [
        "Practice dry-running algorithms on paper to understand loop variations and memory allocation.",
        "Write clean, highly indented code with meaningful comments to score maximum practical marks.",
        "Focus heavily on relational database normalizations (1NF, 2NF, 3NF) and index designs."
      ]
    };
  }

  if (name === 'mechanical engineering') {
    return {
      topics: [
        "Applied Thermodynamics, Heat Engines & IC Engine Cycles",
        "Strength of Materials, Stress-Strain Relations & Beam Deflections",
        "Fluid Mechanics, Hydraulic Machines & Pneumatic Control Systems",
        "Computer Aided Design (CAD) & Computer Aided Manufacturing (CAM)"
      ],
      projects: [
        "Designing and drafting a 3D CAD model of a multi-plate clutch assembly",
        "Conducting tensile testing on steel specimens to construct stress-strain diagrams",
        "Fabricating and testing a mini hydraulic crane prototype using Pascal's law principles"
      ],
      value: "The evergreen core branch qualifying you for heavy industry, automotive designs, thermal power plants, and advanced manufacturing sectors.",
      tips: [
        "Practice drawing neat, free-hand technical sketches of mechanical components and linkages.",
        "Master CAD software shortcut keys to boost your speed in practical lab assessments.",
        "Focus on understanding the thermodynamic PV and TS diagrams to solve numerical problems easily."
      ]
    };
  }

  if (name === 'civil engineering') {
    return {
      topics: [
        "Surveying Methods, Theodolite Traversing & Leveling Operations",
        "Strength of Materials, Concrete Technology & Mix Designs",
        "Structural Analysis, RCC Design & Steel Structure Drawings",
        "Transportation Engineering, Highway Layouts & Soil Mechanics"
      ],
      projects: [
        "Conducting a comprehensive topographical survey of a campus plot using total station",
        "Performing compressive strength tests on concrete cubes with varying water-cement ratios",
        "Designing and drafting a complete residential building plan using AutoCAD software"
      ],
      value: "Crucial foundation for infrastructure development, public works departments (PWD), real estate construction, and smart city planning.",
      tips: [
        "Understand and memorize IS code specifications for RCC and concrete mixture proportions.",
        "Pay absolute attention to unit conversions (mm to meters, kN to Newtons) during structure designs.",
        "Maintain clean, precise technical drawings with correct scale markings for maximum marks."
      ]
    };
  }

  if (name === 'electrical & electronics') {
    return {
      topics: [
        "AC/DC Machines, Transformers & Electrical Power Generation",
        "Analog and Digital Electronics, Operational Amplifiers & Logic Gates",
        "Electrical Circuit Theory, Network Theorems & Network Analysis",
        "Control Systems, Electrical Measurements & Instrumentation Devices"
      ],
      projects: [
        "Testing and plotting efficiency curves of a single-phase transformer under load",
        "Assembling and testing a full-wave rectifier circuit on breadboard with filter",
        "Designing an automatic street-light controller using LDR and transistor switching"
      ],
      value: "Essential for power plants, state electricity boards, electrical grid operations, and electronic hardware manufacturing industries.",
      tips: [
        "Practice sketching electrical schematic layouts meticulously with correct vector arrows.",
        "Learn the working principles, phasor diagrams, and equivalent circuits of electrical machines.",
        "Verify circuit connections carefully before switching on power supplies in labs."
      ]
    };
  }

  if (name === 'electronics & communication') {
    return {
      topics: [
        "Principles of Analog & Digital Communication Systems",
        "Microprocessors, Microcontrollers (8051) & Assembly Language",
        "VLSI Design, Embedded Systems & Signal Processing Loops",
        "Electromagnetic Waves, Antenna Wave Propagation & Fiber Optics"
      ],
      projects: [
        "Programming an 8051 microcontroller to control a stepper motor with custom speeds",
        "Designing and testing an Amplitude Modulation (AM) receiver circuit on a breadboard",
        "Creating an Arduino-based smart home temperature logging system using sensors"
      ],
      value: "Opens highly technical careers in telecommunications, mobile networks, embedded systems, and consumer electronics sectors.",
      tips: [
        "Understand register configurations and instruction sets of microcontrollers inside out.",
        "Keep signal frequency and amplitude measurements precise during oscilloscope lab work.",
        "Practice writing clean assembly or embedded C programs to handle real-world sensor interrupts."
      ]
    };
  }

  if (name === 'ai & machine learning') {
    return {
      topics: [
        "Foundations of Artificial Intelligence & Python Scripting",
        "Supervised & Unsupervised Machine Learning Algorithms",
        "Neural Networks, Deep Learning & TensorFlow Frameworks",
        "Data Preprocessing, Visualizations & Exploratory Data Analysis"
      ],
      projects: [
        "Building an AI-powered house price prediction model using linear regression",
        "Coding a real-time face mask detector using OpenCV and convolutional neural networks",
        "Developing a customer segmentation model using K-Means clustering on retail datasets"
      ],
      value: "Highly sought-after specialisation powering modern tech industries, smart automation, data science, and predictive analysis applications.",
      tips: [
        "Master Python libraries like NumPy, Pandas, Scikit-Learn, and Matplotlib.",
        "Understand the mathematical intuition behind model optimization and gradient descent.",
        "Focus heavily on high-quality data cleaning and feature engineering to get maximum accuracy."
      ]
    };
  }

  if (name === 'robotics & automation') {
    return {
      topics: [
        "Introduction to Robotics, Kinematics & Robotic Manipulator Geometry",
        "Sensors, Actuators, Transducers & Signal Conditioning Circuits",
        "Programmable Logic Controllers (PLC) & SCADA System Architectures",
        "Industrial Automation, Hydraulic & Pneumatic Control Loops"
      ],
      projects: [
        "Designing and coding a line-following autonomous robot with obstacle avoidance",
        "Programming a PLC ladder logic simulator to automate a bottle-filling conveyor belt",
        "Fabricating a 3-axis robotic arm controlled via servo motors and potentiometer inputs"
      ],
      value: "Positions you at the forefront of modern factory automation, warehouse robotics, and smart manufacturing systems.",
      tips: [
        "Focus on understanding the mathematical matrices for coordinate frame transformations.",
        "Master PLC ladder programming and understand how different input/output modules interface.",
        "Pay special attention to safety mechanisms and emergency stop loops in robotic setups."
      ]
    };
  }

  if (name === 'mechatronics engineering') {
    return {
      topics: [
        "Synergy of Mechanical, Electrical, & Computer Control Systems",
        "Microcontrollers, Interface Devices, & Embedded Programming",
        "Electro-Pneumatics, Actuator Control, & Fluid Power Systems",
        "Sensors & Instrumentation, Transducers, & Signal Conditioning"
      ],
      projects: [
        "Designing an automated greenhouse monitoring system with sensor-driven water pumps",
        "Developing a pneumatic sorting mechanism controlled by microcontrollers and optical sensors",
        "Constructing a self-balancing robot utilizing IMU sensor feedback loops"
      ],
      value: "Fuses multiple domains to prepare you for designing smart consumer devices, automated systems, and high-tech appliances.",
      tips: [
        "Maintain strong interdisciplinary foundations—do not neglect mechanical CAD or programming.",
        "Learn how to read complex composite mechanical-electrical engineering block diagrams.",
        "Understand the concepts of feedback loop control (PID controllers) and signal filtering."
      ]
    };
  }

  if (name === 'automobile engineering') {
    return {
      topics: [
        "Automotive Engine Technology, Construction & Valve Mechanisms",
        "Chassis, Suspension, Steering, Braking & Transmission Systems",
        "Automotive Electricals, Infotainment & Electronic Engine Management",
        "Electric & Hybrid Vehicles, Battery Systems, & Eco-friendly Mobility"
      ],
      projects: [
        "Dismantling and reassembling a multi-cylinder petrol engine block to study components",
        "Designing a diagnostic wire harness schematic for an automotive electronic control unit",
        "Measuring and adjusting wheel alignment parameters on an automotive test rig"
      ],
      value: "Prepares you directly for the high-velocity automotive manufacturing, design, testing, and modern EV development sectors.",
      tips: [
        "Stay updated with modern EV architectures, battery chemistry, and regenerations.",
        "Familiarize yourself with automotive troubleshooting tools like OBD scanners.",
        "Focus heavily on braking and steering linkage mechanics when studying chassis design."
      ]
    };
  }

  if (name === 'aeronautical engineering') {
    return {
      topics: [
        "Aerodynamics, Fluid Flow Regimes & Aerofoil Lift-Drag Characteristics",
        "Aircraft Structures, Structural Testing & Composite Materials",
        "Aircraft Propulsion, Gas Turbine Cycles & Jet Engine Dynamics",
        "Flight Mechanics, Performance Metrics & Stability Controls"
      ],
      projects: [
        "Simulating airflow velocity profiles over an aerofoil model using wind tunnel software",
        "Conducting stress analysis on an aircraft wing spar model under simulated loads",
        "Constructing and flying a scale remote-controlled glider with balanced control surfaces"
      ],
      value: "Gateway to elite careers in aerospace design, defense laboratories, airline maintenance, and space exploration programs.",
      tips: [
        "Master the physics of boundary layer theory, shockwaves, and Bernoulli's principles.",
        "Understand structural aircraft loading and why light-weight composite materials are used.",
        "Learn standard flight terminologies (pitch, yaw, roll) and coordinate flight dynamics."
      ]
    };
  }

  if (name === 'it engineering') {
    return {
      topics: [
        "Web Technologies, Responsive Front-End & Back-End Implementations",
        "Information Security, Network Cryptography & Cloud Computing Systems",
        "Systems Administration, Shell Scripting & Server Configurations",
        "Data Analytics, Enterprise Software Systems & IT Management"
      ],
      projects: [
        "Deploying and configuring a secure web server on a Linux container (Docker/VM)",
        "Developing a cloud-hosted collaborative note application with client-side encryption",
        "Creating an automated network vulnerability scanner script using Python and Nmap"
      ],
      value: "In-demand professional track focused on enterprise infrastructure, cloud deployments, cyber-security, and systems administration.",
      tips: [
        "Gain hands-on familiarity with Linux operating systems and command-line interfaces.",
        "Understand cloud architecture concepts (IaaS, PaaS, SaaS) and virtualization mechanics.",
        "Practice writing efficient Bash or PowerShell scripts to automate tedious administrative tasks."
      ]
    };
  }

  if (name === 'chemical engineering') {
    return {
      topics: [
        "Chemical Process Calculations, Material & Energy Balance Metrics",
        "Fluid Flow Operations, Heat Transfer & Mass Transfer Equipment",
        "Chemical Reaction Engineering, Kinetics & Industrial Reactor Designs",
        "Process Instrumentation, Control Systems & Plant Safety Measures"
      ],
      projects: [
        "Conducting liquid-liquid extraction experiments to determine partition coefficients",
        "Designing a shell-and-tube heat exchanger for a mock petroleum refinery unit",
        "Simulating chemical process flow diagrams (PFD) using engineering software tools",
        "Plotting distillation tower tray efficiency curves under varying reflux ratio rates"
      ],
      value: "Critical expertise required for petroleum refineries, pharmaceutical plants, food processing, water treatment, and fertilizer industries.",
      tips: [
        "Perfect your understanding of the law of conservation of mass in process flow equations.",
        "Memorize chemical process safety codes and hazardous material handling regulations.",
        "Focus on mass transfer and heat transfer coefficient derivations as they are highly scoring."
      ]
    };
  }

  // Math
  if (name.includes('math') || name.includes('calc') || name.includes('stat') || name.includes('proof')) {
    return {
      topics: [
        "Advanced Calculus (Limits, Derivatives, & Integral Formulations)",
        "Coordinate Geometry & Straight-Line Vectors",
        "Trigonometric Functions & Proof Identities",
        "Probability Theory & Data Frequency Analysis"
      ],
      projects: [
        "Graphing complex algebraic equations & tangent paths in GeoGebra",
        "Constructing normal distributions and standard deviations for virtual datasets",
        "Mapping real-world cost optimization scenarios using linear programming models"
      ],
      value: "Serves as the absolute gateway requirement for Engineering (JEE, KCET), Statistics B.Stat at ISI, Data Science degrees, Economics honors, and Actuarial sciences (ACET).",
      tips: [
        "Commit to practicing at least 15 comprehensive numeric problems daily.",
        "Maintain a dedicated revision book for mathematical derivations & trigonometric identities.",
        "Do not skip step-by-step working; regional boards award partial marks for logical methods."
      ]
    };
  }
  
  // Physics or electronics
  if (name.includes('phys') || name.includes('elect') || name.includes('circuit') || name.includes('frequency') || name.includes('mechanic')) {
    return {
      topics: [
        "Classical Dynamics, Gravitation, & Particle Mechanics",
        "Electrostatics, Current Electricity, & Alternating Waves",
        "Wave & Ray Optics (Refraction, Dispersion, Lenses)",
        "Semiconductor Devices & Logic Gate Formations"
      ],
      projects: [
        "Constructing and measuring electric resistances using a Wheatstone bridge wire model",
        "Calibrating optics focal distances with convex and concave surface assemblies",
        "Designing basic logic control configurations (AND, OR, NOT) on breadboards"
      ],
      value: "Essential core science indicator matching top university degrees in Robotics, Hardware Engineering, Electrical & Circuit Design (ECE), and Physics research (IISER/NEST).",
      tips: [
        "Focus on fundamental conceptual derivations instead of rote memorizing formulas.",
        "Pay extreme attention to SI metric units and dimensional integrity of final totals.",
        "Practice sketching circuit layouts meticulously with correct vector arrows indicating current flow."
      ]
    };
  }

  // Chemistry / Biochemistry / Assay
  if (name.includes('chem') || name.includes('titrat') || name.includes('catalyst') || name.includes('organic') || name.includes('period') || name.includes('assay')) {
    return {
      topics: [
        "Organic Synthesis Mechanisms (Named Reactions & Radical chains)",
        "Chemical Kinetics, Equilibrium & Electrochemistry Modules",
        "Inorganic Periodic Classifications & d-Block Complexes",
        "Biomolecules (Proteins, Lipids, Carbohydrates)"
      ],
      projects: [
        "Conducting standard acid-base chemical titrations to verify relative molarities",
        "Running qualitative laboratory tests to isolate organic radicals and salt compounds",
        "Measuring rates of reactions over varying concentrations and heat metrics"
      ],
      value: "An absolute mandatory pillar of clinical healthcare studies (NEET for MBBS/BDS), Chemical engineering pathways, Food technologies, and Pharmaceutical licensing.",
      tips: [
        "Draft physical flowchart trees mapping organic named conversions (like Wurtz or Aldol paths).",
        "Revise the structural properties of transition elements and coordination compounds regularly.",
        "Solve the sample textbook numeric problems for Chemical Kinetics and Solutions."
      ]
    };
  }
  
  // Computer Science / Python / SQL / Coding
  if (name.includes('comput') || name.includes('cs') || name.includes('c++') || name.includes('python') || name.includes('sql') || name.includes('script') || name.includes('data') || name.includes('software') || name.includes('web')) {
    return {
      topics: [
        "Object-Oriented Programming (Classes, Encapsulation, Polymorphism)",
        "Algorithmic Logic (Sorting, Searching & Loop Operations)",
        "SQL Database Architecture & Data Queries (DDL/DML Commands)",
        "Core Data Structures (Arrays, Lists, Maps, Stacks)"
      ],
      projects: [
        "Building a functional console-based customer registry terminal using C++ or Python",
        "Constructing a local school data query system with custom MySQL tables",
        "Coding dynamic landing page prototypes using responsive interface styles"
      ],
      value: "The highest-demand preparation of choice for Software Engineering (B.Tech CSE), Web/App development, IT Consulting, and SaaS/Internet startups.",
      tips: [
        "Practice dry-running algorithms on paper using trace tables to spot log issues early.",
        "Ensure consistent indentation and descriptive variable names inside your source scripts.",
        "Master relational database concepts—specifically keys (Primary & Foreign) and JOIN queries."
      ]
    };
  }

  // Biology, Zoology, Botany, Microbiology, Genetics, Life, Organism
  if (name.includes('bio') || name.includes('zoo') || name.includes('bot') || name.includes('micro') || name.includes('cell') || name.includes('organ') || name.includes('anat') || name.includes('physi')) {
    return {
      topics: [
        "Human Organ Systems, Cellular Physiology & Metabolic Tracks",
        "Plant Botanical Tissues, Ecological Networks & Photosynthesis",
        "Genetics, Molecular Splicing & Organic Evolution Mechanics",
        "Pathology, Immune Response & Diagnostic Microorganisms"
      ],
      projects: [
        "Preparing slide specimens of plants and staining them for compound microscopes",
        "Dissecting complex botanical structural models of flowers & leaves to isolate organs",
        "Conducting qualitative assays to detect proteins, lipids, and dietary sugars"
      ],
      value: "The absolute primary benchmark required for healthcare clinical entrances (NEET for MBBS/BVSc), Microbiology, genetics industries, and hospital diagnostics.",
      tips: [
        "Incorporate visual color diagrams with exact scientific terminology labels regularly.",
        "Utilize creative mnemonics to cleanly categorize complex taxonomic structures and classifications.",
        "Keep dedicated terminology flashcards for cellular and physiological concepts."
      ]
    };
  }

  // Accountancy, Bookkeeping, Tally, Ledger, Balance, Asset, Cash
  if (name.includes('acc') || name.includes('ledger') || name.includes('book') || name.includes('balance') || name.includes('audit') || name.includes('tally') || name.includes('billing')) {
    return {
      topics: [
        "Double-Entry Accounting System Mechanics (Debits & Credits)",
        "Journalizing Registers, Ledger Postings & Trial Balance Statements",
        "Bank Reconciliation Statements & Audit Discrepancy Files",
        "Filing Balance Sheets, Depreciation, & Joint-Stock Ledger Computations"
      ],
      projects: [
        "Simulating double-entry books of a mock retail chain on standard spreadsheets",
        "Auditing statement journals to reconcile imaginary ledger accounts using Tally",
        "Drafting comprehensive depreciation schedules based on varying asset lifespans"
      ],
      value: "The core foundational qualification for Chartered Accountancy (CA), professional corporate auditing, B.Com (Hons), Investment Banking, and FinTech career tracks.",
      tips: [
        "Keep the three gold rules of Debit and Credit completely clear and active in your mind.",
        "Always double-check that your debit totals perfectly match your credit totals.",
        "Maintain clean columns and consistent formatting for all Ledger and Balance drawings."
      ]
    };
  }

  // Business, Administration, Management, Branding, Marketing, Professional
  if (name.includes('bus') || name.includes('admin') || name.includes('org') || name.includes('manag') || name.includes('brand') || name.includes('mark') || name.includes('work') || name.includes('ethics')) {
    return {
      topics: [
        "Classical Administrative Theories (Fayol, Taylor, & Scientific Methods)",
        "Business Governance Layouts (Sole Prop, Partnerships & Corporate Stock)",
        "Core Administrative Loops: Planning, Organizing, Staffing, & Controlling",
        "Modern Digital Marketing Networks & Consumer Behavior Analytics"
      ],
      projects: [
        "Drafting a formal Partnership Deed detailing profit sharing and dispute rules",
        "Creating a competitive business canvas with feasibility studies and marketing SWOT audits",
        "Mapping operational hierarchies and safety frameworks for workspace systems"
      ],
      value: "Opens high-trajectory routes into business schools (IPMAT for direct 5-year IIM MBA), modern digital entrepreneurship, corporate consulting, and HR careers.",
      tips: [
        "Supplement descriptive examinations with real-world corporate case-studies to stand out.",
        "Learn core administrative principles by categorizing them into simple everyday examples.",
        "Keep structural organization styles clear in mind—especially functional and divisional designs."
      ]
    };
  }

  // Economics, Monetary, Budget, GDP, Commerce
  if (name.includes('econ') || name.includes('currency') || name.includes('budget') || name.includes('gdp') || name.includes('finance') || name.includes('fiscal') || name.includes('monet')) {
    return {
      topics: [
        "Market Mechanisms (Supply, Consumer Demand & Price Equilibrium)",
        "National Income Accounting, GDP, & Inflation Computations",
        "Central Banking Operations, Monetary Systems & Policy Tools",
        "Fiscal Budgets, Public Deficits, & International Balance of Payments"
      ],
      projects: [
        "Compiling analytical reports on the current Union Budget deficit and public spending",
        "Tracking local retail product substitutions over varying pricing spikes",
        "Mapping repo rate adjustments and comparing their effects on micro-finance rates"
      ],
      value: "Extremely reputable background for Investment Consulting, BA/B.Sc Economics at Top central universities, Corporate Policy advisory, and actuarial analysis.",
      tips: [
        "Practice drafting market demand/supply curves with absolute precision and correct labels.",
        "Understand real-world indicators: familiarize yourself with current central bank repo rates.",
        "Distinguish clearly between microeconomic shifts and macroeconomic aggregate policies."
      ]
    };
  }

  // History, Constitution, Political, Governance, Psychology, Human, Sociology, Liberal
  if (name.includes('hist') || name.includes('const') || name.includes('gov') || name.includes('pol') || name.includes('psy') || name.includes('soc') || name.includes('civ') || name.includes('human')) {
    return {
      topics: [
        "Indian Constitution, Fundamental Rights, State Policies, & Legislative loops",
        "Comparative Global Ideologies & Local Municipal Administrations",
        "Cognitive Development Theories, Biological Motivators & Personality Factors",
        "World Historical Revolutions, Industrial Milestones & Socio-Economic Changes"
      ],
      projects: [
        "Drafting a proposed civic bill presenting public welfare arguments for local councils",
        "Creating a detailed cognitive developmental focus questionnaire for research",
        "Designing spatial maps of old trade networks and summarizing socio-economic changes"
      ],
      value: "Crucial preparation for Civil Services (UPSC), National Law Universities (CLAT LLB), Clinical/Counseling Psychology, Policy Advocacy, and Journalism.",
      tips: [
        "Quote specific constitutional articles, legal acts, or exact historical dates to score top grades.",
        "Link theoretical humanities concepts directly to current global events in your descriptions.",
        "Engage in structured reading of editorial columns to develop logical, balanced opinions."
      ]
    };
  }

  // English, Language, Communication, Literary, Speech, Writing
  if (name.includes('eng') || name.includes('lang') || name.includes('comm') || name.includes('speech') || name.includes('writ') || name.includes('liter')) {
    return {
      topics: [
        "Advanced Grammar Mechanics (Idioms, Clauses, Spotting Common Errors)",
        "Formal & Business Writing (Reports, Analytic Proposals, Letter Formatting)",
        "Critical Reading Comprehension & Analytical Summary Formulation",
        "Phonetics, Voice Intonations, Presentation Etiquette, & Listening Skills"
      ],
      projects: [
        "Compiling a complete research resume and dynamic formal project proposal",
        "Conducting and recording professional mock interviews and dynamic public speeches",
        "Compiling critical reviews analyzing editorial and literary materials in detail"
      ],
      value: "Core qualifying test across all central universities in CUET, elite law screenings (CLAT), global exams (IELTS/TOEFL), and corporate executive roles.",
      tips: [
        "Build a rich word dictionary by reading reputable English papers or journals daily.",
        "Identify grammatical patterns and practice explaining ideas in your own words briefly.",
        "Practice standard letter and report outlines to ensure perfect visual layouts in exam drafts."
      ]
    };
  }

  // Design / Media / Graphic / UI / UX / Animation
  if (name.includes('design') || name.includes('media') || name.includes('graphic') || name.includes('animation') || name.includes('ui') || name.includes('ux') || name.includes('multimedia') || name.includes('vfx') || name.includes('film') || name.includes('photo') || name.includes('video') || name.includes('edit')) {
    return {
      topics: [
        "Visual Communication & Brand Identity",
        "Layout Design & Typography Fundamentals",
        "Motion Graphics & Character Animation",
        "User Experience (UX) Research & Prototyping"
      ],
      projects: [
        "Designing a complete visual brand identity kit for a startup",
        "Building a high-fidelity mobile app prototype using Figma or Adobe XD",
        "Creating a short animated narrative sequence with synchronized audio"
      ],
      value: "Essential for careers in UI/UX design, digital marketing, advertising, and the global creative economy.",
      tips: [
        "Focus on building a diverse portfolio showcasing your creative process.",
        "Stay updated with latest design tools and industry trends.",
        "Practice giving and receiving constructive design critiques."
      ]
    };
  }

  // Hotel Management / Culinary / Front Office / Bakery / Hospitality
  if (name.includes('hotel') || name.includes('culinary') || name.includes('front office') || name.includes('bakery') || name.includes('catering') || name.includes('food') || name.includes('hospitality')) {
    return {
      topics: [
        "Culinary Arts & Global Food Production",
        "Hospitality Operations & Housekeeping Management",
        "Food & Beverage Management & Service",
        "Bakery, Pastry & Confectionery Arts"
      ],
      projects: [
        "Planning and executing a theme-based banquet event",
        "Designing a standard operating procedure (SOP) for a front office department",
        "Creating a seasonal multi-course menu with costing and sourcing details"
      ],
      value: "Gateway to global hospitality careers in luxury hotels, airlines, cruise lines, and high-end restaurants.",
      tips: [
        "Maintain impeccable grooming and professional soft skills.",
        "Seek hands-on internships in diverse hotel departments.",
        "Develop a deep understanding of global cultural and culinary preferences."
      ]
    };
  }

  // Agriculture / Horticulture / Agri / Sericulture / Dairy
  if (name.includes('agri') || name.includes('horti') || name.includes('soil') || name.includes('farming') || name.includes('dairy') || name.includes('sericult')) {
    return {
      topics: [
        "Sustainable Agricultural Practices & Crop Production",
        "Agri-Technology & Smart Farming Systems",
        "Horticulture, Sericulture & Greenhouse Management",
        "Dairy & Food Processing Technology"
      ],
      projects: [
        "Conducting soil health analysis and recommended nutrient plans",
        "Designing a micro-irrigation system for a small farm plot",
        "Evaluating crop yield improvements using organic versus chemical fertilizers"
      ],
      value: "Critical for modern food security, agri-business management, and sustainable farming innovations.",
      tips: [
        "Gain field experience with diverse crop types and soil conditions.",
        "Stay informed about agricultural technology (Agri-Tech) innovations.",
        "Understand the economic and marketing aspects of the agricultural supply chain."
      ]
    };
  }

  // Pharmacy / Pharmaceutics / Pharmacognosy / Pharmaceutical
  if (name.includes('pharmacy') || name.includes('pharmac') || name.includes('dispensa')) {
    return {
      topics: [
        "Pharmaceutics & Dosage Form Design",
        "Pharmacology & Drug Action Mechanisms",
        "Pharmaceutical Chemistry & Analysis",
        "Hospital & Clinical Pharmacy Protocols"
      ],
      projects: [
        "Formulating and testing basic topical ointment bases",
        "Simulating hospital pharmacy inventory and drug dispensing logs",
        "Identifying medicinal plant extracts using qualitative pharmacognosy tests"
      ],
      value: "Mandatory for professional pharmacist registration, healthcare retail, and clinical support roles.",
      tips: [
        "Pay extreme attention to dosage calculations and measurement accuracy.",
        "Keep a dedicated log of common drug names and their therapeutic uses.",
        "Understand the legal and ethical framework of pharmaceutical practice."
      ]
    };
  }

  // Nursing / Patient Care / GNM / ANM / Health
  if (name.includes('nurs') || name.includes('patient') || name.includes('health') || name.includes('maternal') || name.includes('clinical dressing')) {
    return {
      topics: [
        "Patient Care & Home Nursing Specializations",
        "GNM & ANM Core Nursing Fundamentals",
        "Human Anatomy, Physiology & Pathology",
        "Community & Public Health Nursing"
      ],
      projects: [
        "Demonstrating critical first-aid and emergency resuscitation techniques",
        "Developing a community health awareness campaign for rural hygiene",
        "Maintaining precise clinical patient charts and vital sign monitoring logs"
      ],
      value: "A noble and high-demand career path in clinical care, hospital systems, and global health services.",
      tips: [
        "Develop high levels of patience, empathy, and professional composure.",
        "Focus on mastering clinical procedures through repeated practical drills.",
        "Always adhere to strict hospital hygiene and patient safety protocols."
      ]
    };
  }

  // Tourism / Travel / Ticketing / Airport / Tour
  if (name.includes('tourism') || name.includes('travel') || name.includes('ticket') || name.includes('airport') || name.includes('tour')) {
    return {
      topics: [
        "Travel and Tourism Management Operations",
        "Professional Tour Guiding & Destination Interpretation",
        "Global Tourism Geography & GDS Systems",
        "Airport Operations & Airline Management"
      ],
      projects: [
        "Designing a professional tour itinerary for a heritage circuit",
        "Mastering flight booking and ticketing using Amadeus or Galileo software",
        "Conducting a mock guided tour for a major historical destination"
      ],
      value: "Prepares you for the dynamic global travel and tourism sector, from airline operations to tour management.",
      tips: [
        "Develop strong communication and multi-cultural awareness.",
        "Stay updated with global travel regulations and visa procedures.",
        "Build a deep knowledge of world geography and major tourist attractions."
      ]
    };
  }

  // Fire / Safety / Disaster / Occupational / HSE
  if (name.includes('fire') || name.includes('safety') || name.includes('disaster') || name.includes('hse') || name.includes('occupational')) {
    return {
      topics: [
        "Occupational Health & Workplace Safety Systems",
        "Environmental Safety & Industrial Waste Management",
        "Fire Engineering Science & Prevention Techniques",
        "Disaster Management & Emergency Response Protocols"
      ],
      projects: [
        "Conducting an Occupational Health and Safety audit of a workplace",
        "Designing an Environmental Safety and waste management plan",
        "Developing a comprehensive Disaster Management response strategy"
      ],
      value: "Essential for ensuring workplace safety compliance across all industries, from construction to chemical plants.",
      tips: [
        "Maintain physical fitness and readiness for emergency drills.",
        "Pursue international safety certifications like NEBOSH or IOSH.",
        "Pay extreme attention to detail when conducting safety inspections."
      ]
    };
  }

  // Generic/Default
  return {
    topics: [
      "Foundational Theoretical Concepts & Subject Definitions",
      "Advanced Analytical Paradigms & Industry Standards",
      "Modern Applications, Ethical Metrics, & Research Frameworks",
      "Socio-Economic Relevance & Future Technological Evolutions"
    ],
    projects: [
      "Design an interface infographic highlighting the core workflows of the domain",
      "Draft a structured research presentation highlighting historic and modern transitions",
      "Construct a localized case study comparing standard textbook modules with industrial use"
    ],
    value: "Provides highly transferable logical credentials, heavily respected by recruiters, government screening channels, and prestigious central-university admissions.",
    tips: [
      "Read through core textbook reference manuals and highlight crucial definitions.",
      "Summarize complex concepts into structured checklists or diagrams for rapid revisions.",
      "Form peer review groups to debate challenging sections to ensure longer memory retention."
    ]
  };
}

interface GovtExam {
  name: string;
  type: string;
  details: string;
  status: string;
  link?: string;
  bestFor: string;
}

function getGovtExamsForCombination(courseName: string): GovtExam[] {
  const name = courseName.toUpperCase();
  
  // Science Streams
  if (name.includes('PCM') || name.includes('PCMC') || name.includes('PCME') || name.includes('PCMB') || name.includes('PCMS') || name.includes('PCB') || name.includes('PCBZ') || name.includes('PCBH')) {
    const exams: GovtExam[] = [
      {
        name: "UPSC Civil Services Examination (IAS/IPS/IFS)",
        type: "National Level Civil Service",
        details: "Requires any bachelor degree (B.Sc, B.E/B.Tech, etc.). Ideal for administrative command posts.",
        status: "Supreme Entry",
        link: "upsc.gov.in",
        bestFor: "All Science graduates"
      },
      {
        name: "NDA (National Defence Academy)",
        type: "Defence Officer Commission",
        details: "Conducted after 12th standard. 12th Physics & Math mandatory for Navy and Air Force selections.",
        status: "Elite Officer Guard",
        link: "upsc.gov.in",
        bestFor: name.includes('PCB') && !name.includes('M') ? "Army wing only (No Physics/Math)" : "Navy, Air Force & Army"
      },
      {
        name: "Indian Forest Service (IFS) via UPSC",
        type: "Central Environmental Service",
        details: "Requires degree in Botany, Zoology, Chemistry, Physics, Mathematics, Statistics or Engineering.",
        status: "Highly Reputable",
        link: "upsc.gov.in",
        bestFor: "PCMB, PCBZ, PCB, PCMS"
      },
      {
        name: "KPSC KAS (Karnataka Administrative Service)",
        type: "State Level Civil Service",
        details: "Recruiting Gazetted Probationers (KAS, DySP, CTO, Tehsildar) in Karnataka government.",
        status: "State Elite",
        link: "kpsc.kar.nic.in",
        bestFor: "All Karnataka Science students"
      },
      {
        name: "SSC CGL (Combined Graduate Level)",
        type: "Central Government Posts",
        details: "After graduation. Recruitment for Group B & C posts in various ministries (Inspectors, Assistants).",
        status: "High Job Security",
        link: "ssc.gov.in",
        bestFor: "All Science degree holders"
      },
      {
        name: "ISRO / DRDO Scientific Assistant",
        type: "Technical & Research Post",
        details: "Requires B.Sc Physics/Computer Science/Electronics or engineering degrees. National laboratories.",
        status: "Elite Respected Lab",
        link: "isro.gov.in",
        bestFor: "PCMC, PCME, PCMS"
      }
    ];
    return exams;
  }
  
  // Commerce Streams
  if (name.includes('CEBA') || name.includes('SEBA') || name.includes('HEBA') || name.includes('ABMS') || name.includes('EBAC') || name.includes('BSBA') || name.includes('CSBA')) {
    return [
      {
        name: "SSC CGL Assistant Audit Officer (AAO)",
        type: "Central Treasury Audit",
        details: "Comptroller and Auditor General (CAG) of India. Specifically prioritizes CA, CS, B.Com, and statistics backgrounds.",
        status: "Highest Paid SSC Post",
        link: "ssc.gov.in",
        bestFor: "All Commerce combinations"
      },
      {
        name: "RBI Grade B Officer",
        type: "Bank Operations & Policy",
        details: "Highly prestigious management entry at the Reserve Bank of India with standard monetary & financial screening.",
        status: "Elite Financial post",
        link: "rbi.org.in",
        bestFor: "All Commerce grads (Accounting/Economics)"
      },
      {
        name: "SBI PO & IBPS PO",
        type: "National Banking Sector",
        details: "Officer training intakes for State Bank of India & public sector banks. Commerce graduates possess high test success.",
        status: "High Banking Security",
        link: "sbi.co.in",
        bestFor: "All Commerce grads"
      },
      {
        name: "KPSC Assistant Statistical Officer (ASO)",
        type: "State Economic Office",
        details: "Requires a degree with Statistics, Mathematics, or Economics as major core subjects.",
        status: "Gazetted Regional Post",
        link: "kpsc.kar.nic.in",
        bestFor: "SEBA, ABMS, BSBA, CSBA"
      },
      {
        name: "UPSC Civil Services Examination (IAS/IPS/IRS)",
        type: "National Level Civil Service",
        details: "Any graduate is eligible. Commerce backgrounds excel in Indian Revenue Service (IRS - Income Tax & Customs).",
        status: "Supreme Entry",
        link: "upsc.gov.in",
        bestFor: "CEBA, SEBA, ABMS, HEBA"
      },
      {
        name: "LIC Assistant Administrative Officer (AAO Finance)",
        type: "Public Insurance Management",
        details: "National recruiting for finance administrative managers, audits, actuarial assessment, and ledger tracking.",
        status: "High Comfort Corporate",
        link: "licindia.in",
        bestFor: "All Commerce combinations"
      }
    ];
  }

  // Arts Streams
  return [
    {
      name: "UPSC Civil Services Examination (IAS/IPS/IFS)",
      type: "National Level Civil Service",
      details: "Massive curriculum overlap with Arts domain subjects (History, Political Science, Economics, and Sociology). Highly recommended.",
      status: "Absolute Best Fit",
      link: "upsc.gov.in",
      bestFor: "HEPS, HEPP, HESP, EPS"
    },
    {
      name: "KPSC KAS (Karnataka Administrative Service)",
      type: "State Level Civil Service",
      details: "State-level administrative officers (Assistant Commissioners, Tehsildars, DySP). Massive leverage for Humanities majors.",
      status: "State Elite",
      link: "kpsc.kar.nic.in",
      bestFor: "All Arts combinations"
    },
    {
      name: "UPSC CDS (Combined Defence Services)",
      type: "Defence Officer Commission",
      details: "Requires any graduation degree. Selection for military officer cadres in Indian Army (OTA). No maths/physics required for OTA.",
      status: "Defence Elite",
      link: "upsc.gov.in",
      bestFor: "All Arts graduates"
    },
    {
      name: "SSC CGL & CHSL (Civil Postings)",
      type: "Central Administration Staff",
      details: "For Group B & C assistant posts in ministries, central secretariat, intelligence bureau, and regional postal circles.",
      status: "Central Job Security",
      link: "ssc.gov.in",
      bestFor: "All Arts combinations"
    },
    {
      name: "IBPS Specialist Officer (SO - Rajbhasha Adhikari)",
      type: "Official Language Desk",
      details: "For language specialist officers, translators, corporate communication heads, and public relations inside national banks.",
      status: "Specialist Banking",
      link: "ibps.in",
      bestFor: "JPE, English / Language majors"
    },
    {
      name: "Archeological Survey of India Curator",
      type: "Museum curation & Heritage",
      details: "Requires graduation or post-graduation in History/Archeology. Handles state archives, monuments, and historic assets.",
      status: "Heritage Specialization",
      link: "kpsc.kar.nic.in",
      bestFor: "HEPS, HEPP, HESP, History majors"
    }
  ];
}

export interface DegreeFact {
  name: string;
  fullName: string;
  duration: string;
  overview: string;
  careerPaths?: {
    title: string;
    scope: string;
    skills: string[];
    sectors: string[];
    growth: string[];
    salary: string;
    upskilling: { name: string; details: string }[];
  }[];
  timeline?: { [key: string]: { title: string; desc: string } };
  keySubjects: string[];
  topColleges: string[];
  industryRoles: string[];
  avgSalary: string;
  higherStudies: string[];
  exams?: {
    entrance?: { name: string; details: string; link?: string }[];
    govt?: { name: string; details: string; link?: string }[];
  };
  syllabus?: string[];
}

function getDegreeDetails(degreeName: string): DegreeFact {
  const customProfile = getCareerProfileDetails(degreeName);
  if (customProfile) {
    return customProfile;
  }

  const norm = degreeName.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  if (norm.includes('BE') || norm.includes('BTECH') || norm.includes('BACHELOROFENGINEERING') || norm.includes('BACHELOROFTECHNOLOGY')) {
    return {
      name: "B.E. / B.Tech",
      fullName: "Bachelor of Engineering / Bachelor of Technology",
      duration: "4 Years",
      overview: "The premier professional undergraduate engineering degree. Focuses on applying scientific and mathematical principles to design, develop, and analyze technological systems, software, hardware, and infrastructure.",
      careerPaths: [
        {
          title: "Software Development Engineer (SDE)",
          scope: "Design, develop, and maintain robust software solutions, applications, and systems using scalable architectures and modern development practices.",
          skills: ["Full Stack Development", "Data Structures & Algorithms", "System Design", "Cloud Computing", "Version Control (Git)"],
          sectors: ["Technology Product Companies", "Global IT Services", "Startups", "FinTech"],
          growth: ["Senior SDE", "Engineering Manager", "Technical Architect", "CTO"],
          salary: "₹8 Lakhs - ₹30 Lakhs+ per annum",
          upskilling: [{ name: "Advanced System Design Certs", details: "Distributed Systems & Scalability" }]
        },
        {
          title: "Data Scientist / AI Engineer",
          scope: "Develop machine learning models, analyze complex datasets, and derive actionable insights to support strategic business decisions and product development.",
          skills: ["Machine Learning & AI", "Python/R", "Data Visualization", "Big Data Tools", "Statistical Modeling"],
          sectors: ["Tech Giants", "Healthcare", "E-commerce", "Finance"],
          growth: ["Senior Data Scientist", "AI Lead", "Director of Data Science"],
          salary: "₹10 Lakhs - ₹35 Lakhs+ per annum",
          upskilling: [{ name: "Professional AI/ML Certifications", details: "Deep Learning & NLP" }]
        }
      ],
      timeline: {
        step1: { title: "Foundations & Core Engineering", desc: "Master mathematics, physics, and basic engineering principles alongside introductory programming." },
        step2: { title: "Specialization & Internship", desc: "Select a major stream, gain deep technical knowledge, and complete industrial internships." },
        step3: { title: "Advanced Projects & Certifications", desc: "Work on real-world projects, obtain domain-specific certifications, and build an industry-ready portfolio." },
        step4: { title: "Professional Deployment", desc: "Enter the professional workforce as a specialized engineer or pursue advanced Master’s degrees." }
      },
      keySubjects: ["Data Structures & Algorithms", "Computer Networks", "Database Management Systems", "Artificial Intelligence & ML", "Operating Systems"],
      topColleges: ["Indian Institutes of Technology (IITs)", "National Institutes of Technology (NITs - e.g. Surathkal)", "RV College of Engineering (RVCE) Bangalore", "PES University (PESU) Bangalore", "BMS College of Engineering (BMSCE)"],
      industryRoles: ["Software Development Engineer (SDE)", "Data Scientist / AI Analyst", "System Architect", "Cloud Security Consultant", "Electronics Design Engineer"],
      avgSalary: "₹6.5 Lakhs - ₹24 Lakhs per annum (Top tier goes ₹50L+)",
      higherStudies: ["M.Tech / M.S. (Master of Science)", "MBA (Master of Business Administration)", "Ph.D. in Specialized Research Areas"],
      exams: {
        entrance: [{ name: "JEE Main / Advanced", details: "National level engineering entrance exams for IITs/NITs.", link: "jeemain.nta.ac.in" }],
        govt: [{ name: "GATE (Graduate Aptitude Test in Engineering)", details: "Gateway for M.Tech admissions and PSU recruitment.", link: "gate2025.iisc.ac.in" }]
      },
      syllabus: ["Engineering Mathematics", "Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Operating Systems", "Artificial Intelligence & ML", "Cloud Computing"]
    };
  }

  if (norm === 'BCA') {
    return {
      name: "BCA",
      fullName: "Bachelor of Computer Applications",
      duration: "3 Years",
      overview: "A highly sought-after 3-year undergraduate course specializing in computer applications, web development, app creation, database architecture, and programming languages. Fits perfectly with PCMC, PCME, and Commerce streams.",
      careerPaths: [
        {
          title: "Full Stack Web Developer",
          scope: "Design and build end-to-end web applications, handling both front-end user interfaces and back-end server logic, databases, and APIs.",
          skills: ["JavaScript/TypeScript", "React/Node.js", "HTML/CSS", "SQL/NoSQL", "REST APIs"],
          sectors: ["Tech Startups", "E-commerce", "SaaS Companies"],
          growth: ["Senior Developer", "Tech Lead", "Engineering Manager"],
          salary: "₹4 Lakhs - ₹12 Lakhs per annum",
          upskilling: [{ name: "Full Stack Bootcamps", details: "MERN Stack mastery" }]
        },
        {
          title: "Mobile App Developer",
          scope: "Create engaging and functional mobile applications for iOS and Android platforms, focusing on user experience and app performance.",
          skills: ["Flutter/React Native", "Swift/Kotlin", "UI/UX Basics", "App Store Deployment"],
          sectors: ["App Development Agencies", "Tech Startups", "Consumer Tech Companies"],
          growth: ["Senior Mobile Developer", "App Architect", "Product Manager"],
          salary: "₹4 Lakhs - ₹10 Lakhs per annum",
          upskilling: [{ name: "Advanced Mobile Certs", details: "Native/Cross-Platform Dev" }]
        }
      ],
      timeline: {
        step1: { title: "Programming Foundations", desc: "Master C, C++, and basic web technologies like HTML and CSS." },
        step2: { title: "Specialization & Projects", desc: "Deep dive into web/app frameworks and build complex software projects." },
        step3: { title: "Industrial Readiness", desc: "Complete professional internships and focus on placement preparation." },
        step4: { title: "Professional Deployment", desc: "Join the industry as a developer or pursue an MCA for higher education." }
      },
      keySubjects: ["Java & Python Programming", "Web Technologies (Full Stack)", "Software Engineering Guidelines", "Mobile Application Development", "Database Administration (SQL)"],
      topColleges: ["Christ University Bangalore", "St. Joseph's University Bangalore", "Symbiosis Institute of Computer Studies Pune", "Kristu Jayanti College Bangalore", "Mount Carmel College"],
      industryRoles: ["Full Stack Web Developer", "Mobile App Developer", "Database Administrator", "System Quality Assurance (QA) Tester", "IT Operations Technical Support"],
      avgSalary: "₹3.5 Lakhs - ₹8.5 Lakhs per annum",
      higherStudies: ["MCA (Master of Computer Applications)", "M.Sc Computer Science / Data Science", "MBA in Information Technology"],
      exams: {
        entrance: [{ name: "KMAT / PGCET", details: "State level entrance exams for BCA/MCA.", link: "cetonline.karnataka.gov.in" }],
        govt: [{ name: "State IT Dept Recruitment", details: "Government recruitment for IT roles.", link: "kar.nic.in" }]
      },
      syllabus: ["Programming in C/C++", "Java Programming", "Web Technologies", "Database Management Systems", "Software Engineering", "Mobile Application Development"]
    };
  }

  if (norm.includes('COMPUTER') && norm.includes('BSC')) {
    return {
      name: "B.Sc Computer Science",
      fullName: "Bachelor of Science in Computer Science",
      duration: "3 - 4 Years as per NEP Guidelines",
      overview: "An academic science program emphasizing computation theory, mathematical foundations, algorithmic designs, software engineering, and scientific computation. Blends core computer languages with numerical techniques.",
      keySubjects: ["Algorithmic Analysis", "Computer System Architecture", "Discrete Mathematics", "Data Analytics & ML", "Object-Oriented Programming (C++/Java)"],
      topColleges: ["St. Joseph's University Bangalore", "Christ University Bangalore", "Loyola College Chennai", "Fergusson College Pune", "Mount Carmel College Bangalore"],
      industryRoles: ["Junior Developer", "Data Analyst", "Database Coordinator", "Network Support Analyst", "Mathematical Computing Associate"],
      avgSalary: "₹3.8 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["M.Sc Computer Science", "MCA (Master of Computer Applications)", "Data Science Postgraduate Degree", "Competitive UPSC/IAS Prep"]
    };
  }

  if (norm.includes('IT') && norm.includes('BSC')) {
    return {
      name: "B.Sc IT",
      fullName: "Bachelor of Science in Information Technology",
      duration: "3 - 4 Years (as per NEP)",
      overview: "Focuses on the practical processing, storing, securing, and transmitting of data. It specializes more in networking, server administration, enterprise tech stacks, and cloud support pipelines than pure mathematics theory.",
      keySubjects: ["Cloud Computing Foundations", "Information & Cyber Security", "Linux Server Administration", "Network Infrastructure Designs", "Web Development & scripting"],
      topColleges: ["St. Xavier's College Mumbai", "SJC Bangalore", "SIFT Pune", "Mount Carmel Bangalore", "Kristu Jayanti College"],
      industryRoles: ["Cloud Administrator", "Network Security Associate", "IT Consultant", "System Support Engineer", "Database Specialist"],
      avgSalary: "₹3.6 Lakhs - ₹7.2 Lakhs per annum",
      higherStudies: ["M.Sc IT", "MCA", "MBA in Systems & Operations", "Cyber Security PG Programs"]
    };
  }

  if (norm.includes('MATHEMATICS') && norm.includes('BSC')) {
    return {
      name: "B.Sc Mathematics",
      fullName: "Bachelor of Science in Mathematics",
      duration: "3 - 4 Years (NEP)",
      overview: "A classical logical degree exploring advanced calculations, pure mathematics, statistics, numerical analytics, and complex variables. Essential for quantitative analytics, actuarial sciences, and high-level physics/finance modelling.",
      keySubjects: ["Real & Complex Analysis", "Linear Algebra & Vector Spaces", "Differential Equations", "Numerical Analysis", "Probability Theory"],
      topColleges: ["Chennai Mathematical Institute (CMI)", "St. Stephen's College Delhi", "Indian Institutes of Science Education (IISERs)", "St. Joseph's University Bangalore", "Christ University"],
      industryRoles: ["Quantitative Analyst (FinTech)", "Actuarial Associate", "Operations Researcher", "Statistical Modeler", "Academician / Mathematics educator"],
      avgSalary: "₹4.0 Lakhs - ₹9.0 Lakhs per annum",
      higherStudies: ["M.Sc Mathematics", "P.G. Diploma in Actuarial Science", "M.Sc in Financial Engineering", "Ph.D. in Pure/Applied Math"]
    };
  }

  if (norm.includes('ELECTRONICS') && norm.includes('BSC')) {
    return {
      name: "B.Sc Electronics",
      fullName: "Bachelor of Science in Electronics",
      duration: "3 - 4 Years (NEP)",
      overview: "Studies electronic components, solid-state devices, microprocessors, signal processing, VLSI design, and telecommunications. Fuses theoretical physics with circuit branch engineering practices.",
      keySubjects: ["Analog & Digital Circuits", "Microcontrollers & Programming", "Verilog / VHDL (VLSI) Designs", "Digital Signal Processing", "Internet of Things & Sensors"],
      topColleges: ["St. Joseph's University Bangalore", "Hansraj College Delhi", "Mount Carmel Bangalore", "The National College Bangalore", "Fergusson College Pune"],
      industryRoles: ["Embedded Systems Developer", "Hardware Design Associate", "VLSI Verification Engineer", "RF Engineer helper", "Robotics System Integrator"],
      avgSalary: "₹3.8 Lakhs - ₹8.0 Lakhs per annum",
      higherStudies: ["M.Sc Electronics", "M.Tech in Electronic Systems", "Embedded Systems Certification", "MBA in Operations"]
    };
  }

  if (norm.includes('PHYSICS') && norm.includes('BSC')) {
    return {
      name: "B.Sc Physics",
      fullName: "Bachelor of Science in Physics",
      duration: "3 - 4 Years (NEP)",
      overview: "Explores fundamental principles of the physical universe: quantum mechanics, thermodynamics, electromagnetism, and astrophysics. Forms the core of scientific experimentation, material engineering, and aerospace pathways.",
      keySubjects: ["Classical Mechanics", "Electromagnetism & Wave Theory", "Quantum Physics Basics", "Statistical Thermodynamics", "Solid State Physics"],
      topColleges: ["Indian Institute of Science (IISc) Bangalore", "St. Stephen's College Delhi", "Presidency College Chennai", "St. Joseph's University Bangalore", "St. Xavier's Kolkata"],
      industryRoles: ["Scientific Research Assistant", "Laboratory Quality Analyst", "Defense Research Lab Associate", "Technical Writer", "Analytical Consultant"],
      avgSalary: "₹3.5 Lakhs - ₹7.0 Lakhs per annum",
      higherStudies: ["M.Sc Physics (IISc/IITs)", "Joint M.Sc-Ph.D. Integrated Programs", "Geophysics specializations", "MBA"]
    };
  }

  if (norm.includes('MBBS')) {
    return {
      name: "MBBS",
      fullName: "Bachelor of Medicine, Bachelor of Surgery",
      duration: "5.5 Years (including 1 Year mandatory Internship)",
      overview: "The ultimate professional medical degree in India. Trains students in advanced human anatomy, pharmacology, pathology, medicine, and critical surgeries to become licensed clinical doctors (General Physicians).",
      keySubjects: ["Human Anatomy & Physiology", "Biochemistry & Pathology", "Pharmacology & Therapeutics", "General Surgery & Pediatrics", "Community Medicine / Obstetrics"],
      topColleges: ["All India Institute of Medical Sciences (AIIMS) New Delhi", "Bangalore Medical College and Research Institute (BMCRI)", "Christian Medical College (CMC) Vellore", "St. John's Medical College Bangalore", "KIMS Hubli"],
      industryRoles: ["Medical Officer", "General Practitioner / Doctor", "Emergency Medicine Resident", "Clinical Research Scientist", "Public Health Consultant"],
      avgSalary: "₹9.0 Lakhs - ₹18 Lakhs per annum (Significantly scales after MD/MS)",
      higherStudies: ["MD (Doctor of Medicine)", "MS (Master of Surgery)", "M.Ch / DM Super Specialization", "Master of Public Health (MPH)"]
    };
  }

  if (norm.includes('BDS')) {
    return {
      name: "BDS",
      fullName: "Bachelor of Dental Surgery",
      duration: "5 Years (including 1 Year Internship)",
      overview: "The professional dental medicine degree. Empowers students to diagnose, prevent, and treat dental complications, oral cavity disorders, reconstructive surgeries, and facial aesthetics.",
      keySubjects: ["Oral Pathology & Microbiology", "Prosthodontics & Crown-Bridge", "Orthodontics & Dentofacial Orthopedics", "Periodontology (Gum Specialist)", "Oral & Maxillofacial Surgery"],
      topColleges: ["Government Dental College Bangalore", "Manipal College of Dental Sciences", "Maulana Azad Institute of Dental Sciences Delhi", "M. S. Ramaiah Dental College Bangalore"],
      industryRoles: ["Licensed Dentist", "Dental surgeon", "Oral Care Specialist", "Clinical Consultant in Healthcare", "Cosmetic Dentist"],
      avgSalary: "₹4.5 Lakhs - ₹10 Lakhs per annum",
      higherStudies: ["MDS (Master of Dental Surgery)", "Master of Hospital Administration", "Cosmetology Professional Diplomas"]
    };
  }

  if (norm.includes('BAMS')) {
    return {
      name: "BAMS",
      fullName: "Bachelor of Ayurvedic Medicine & Surgery",
      duration: "5.5 Years (including 1 Year Internship)",
      overview: "An integrated medical program fusing ancient holistic Ayurvedic medical systems with modern clinical practices, diagnostics, pharmacology, and botanical science.",
      keySubjects: ["Sanskrit & Ayurvedic Samhitas", "Kayachikitsa (Internal Medicine)", "Shalya Tantra (General Surgery)", "Dravyaguna (Ayurvedic Pharmacology)", "Prasuti Tantra (Obstetrics)"],
      topColleges: ["Government Ayurvedic Medical College Bangalore", "National Institute of Ayurveda Jaipur", "BHU Varanasi", "SDM College of Ayurveda Hassan/Udupi"],
      industryRoles: ["Ayurvedic Doctor / Physician", "Clinical Researcher", "Wellness Consultant", "Panchakarma Center Director", "Ayurvedic Pharmacist"],
      avgSalary: "₹4.0 Lakhs - ₹9.0 Lakhs per annum",
      higherStudies: ["MD / MS in Ayurveda", "Master of Hospital Administration", "PG Diploma in Panchakarma Clinic"]
    };
  }

  if (norm.includes('BHMS')) {
    return {
      name: "BHMS",
      fullName: "Bachelor of Homeopathic Medicine and Surgery",
      duration: "5.5 Years (including 1 Year Internship)",
      overview: "Undergraduate medical course specializing in homoeopathy medicine concepts, holistic diagnosis, medical logic based on natural dilution systems, and anatomical foundations.",
      keySubjects: ["Principles of Homoeopathy", "Organon of Medicine", "Homoeopathic Materia Medica", "Repertory & Case Taking", "Practice of Medicine"],
      topColleges: ["Government Homoeopathic Medical College Bangalore", "National Institute of Homoeopathy Kolkata", "Father Muller Homoeopathic College Mangalore", "Lokmanya College Pune"],
      industryRoles: ["Homoeopath Consultant", "Homeopathic Medical Officer", "Pharmaceutical Consultant", "Clinical Investigator", "Wellness Center Supervisor"],
      avgSalary: "₹3.8 Lakhs - ₹8.0 Lakhs per annum",
      higherStudies: ["MD in Homoeopathy", "Master of Public Health (MPH)", "Hospital Management PG Programs"]
    };
  }

  if (norm.includes('BPHARM') || norm.includes('PHARMAC')) {
    return {
      name: "B.Pharm",
      fullName: "Bachelor of Pharmacy",
      duration: "4 Years",
      overview: "The main professional program for pharmaceutical compounding, chemistry of drug design, manufacturing techniques, drug dosage formulas, analysis, and clinical pharmacology regulations.",
      keySubjects: ["Pharmaceutical Chemistry", "Pharmacology & Toxicology", "Pharmaceutics (Dosage design)", "Pharmacognosy (Herbal products)", "Industrial Pharmacy & Jurisprudence"],
      topColleges: ["NIPER Mohali", "Government College of Pharmacy Bangalore", "Manipal College of Pharmaceutical Sciences", "JSS College of Pharmacy Mysore", "KLE College of Pharmacy Belagavi"],
      industryRoles: ["Drug Inspector", "Pharmaceutical Scientist (R&D)", "Quality Control / Quality Assurance Executive", "Medical Writer", "Clinical Trial Manager"],
      avgSalary: "₹3.6 Lakhs - ₹8.5 Lakhs per annum",
      higherStudies: ["M.Pharm (Master of Pharmacy)", "Doctor of Pharmacy (Pharm.D)", "MBA in Pharma Management"]
    };
  }

  if (norm.includes('NURSING')) {
    return {
      name: "B.Sc Nursing",
      fullName: "Bachelor of Science in Nursing",
      duration: "4 Years",
      overview: "A professional allied healthcare program designed to build clinical skills, medical knowledge, emergency nursing, and operational patient care in multi-specialty hospitals.",
      keySubjects: ["Anatomy & Physiology for Nurses", "Medical-Surgical Nursing", "Psychiatric Nursing", "Maternal & Child Health Care", "Community Health Nursing"],
      topColleges: ["St. John's College of Nursing Bangalore", "NIMHANS Bangalore (Nursing)", "Armed Forces Medical College (AFMC) Pune", "Apollo College of Nursing Chennai"],
      industryRoles: ["Registered Nurse (Staff Nurse)", "Critical Care Nurse Practitioner", "Clinical Nurse Educator", "Public Health Nurse", "Global Health Care Specialist"],
      avgSalary: "₹3.0 Lakhs - ₹7.5 Lakhs per annum (Excellent international packages at ₹25L+ in UK, USA)",
      higherStudies: ["M.Sc Nursing", "Clinical Nurse Specialist certifications", "Healthcare Administration Master's"]
    };
  }

  if (norm.includes('BIOTECH')) {
    return {
      name: "B.Sc Biotechnology",
      fullName: "Bachelor of Science in Biotechnology",
      duration: "3 - 4 Years (NEP)",
      overview: "Blends biological science with engineering technology to manipulate cell genetics, micro-organisms, and enzyme formulations. Essential for vaccinology, cancer therapeutics, industrial agriculture, and biofuels.",
      keySubjects: ["Cell Biology & Genetics", "Recombinant DNA (rDNA) Technology", "Immunology & Serology", "Plant & Animal Tissue Culture", "Industrial Microbiology"],
      topColleges: ["St. Joseph's University Bangalore", "Mount Carmel Bangalore", "Christ University Bangalore", "Stella Maris Chennai", "Fergusson College Pune"],
      industryRoles: ["Biotech Laboratory Researcher", "Food Technologist", "Genetic Analyst Assistant", "QC Analyst in Biopharma", "Clinical Data Tracker"],
      avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["M.Sc Biotechnology", "Integrated M.Sc-Ph.D. at IISc/IITs", "MBA in Biotech Enterprise"]
    };
  }

  if (norm === 'STATISTICS' || norm.includes('BSCSTATISTICS')) {
    return {
      name: "B.Sc Statistics",
      fullName: "Bachelor of Science in Statistics",
      duration: "3 - 4 Years (NEP)",
      overview: "Deals with advanced mathematical probability, sample survey models, biostatistics, prediction models, and computational logic. High-tier entry into AI, risk management, investments, and statistical computing.",
      keySubjects: ["Probability & Mathematical Statistics", "Stochastic Processes", "Design of Experiments", "Statistical Quality Control", "R & Python Data Analytics Labs"],
      topColleges: ["Indian Statistical Institute (ISI) Bangalore/Kolkata", "St. Xavier's Mumbai", "Christ University Bangalore", "Presidency College Chennai"],
      industryRoles: ["Data Analyst / Biostatistician", "Actuarial Specialist", "Statistical Research Associate", "Quantitative Risk Planner", "Market Analyst"],
      avgSalary: "₹4.5 Lakhs - ₹10 Lakhs per annum",
      higherStudies: ["M.Stat (Master of Statistics at ISI)", "M.Sc Data Science/Business Analytics", "P.G. Diploma in Actuarial Finance"]
    };
  }

  if (norm.includes('DATASCIENCE')) {
    return {
      name: "Data Science",
      fullName: "B.Sc / B.Tech in Data Science & Big Data Systems",
      duration: "3 - 4 Years (NEP)",
      overview: "The ultimate modern technological degree focusing on extracting intelligence from large data volumes. Combines advanced statistics, data warehousing, programming, machine learning, and business logic.",
      keySubjects: ["Machine Learning & Neural Networks", "Python & SQL Data Processing", "Big Data Architecture (Hadoop/Spark)", "Data Visualization (Tableau/D3)", "Predictive Analytics"],
      topColleges: ["IISc Bangalore (Computational Science)", "IIT Madras (Online B.Sc DS)", "PES University Bangalore", "Christ University Bangalore", "St. Joseph's University"],
      industryRoles: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst", "Big Data Architect", "Operations Data Tracker"],
      avgSalary: "₹6.0 Lakhs - ₹16 Lakhs per annum",
      higherStudies: ["M.Sc Data Science / Artificial Intelligence", "MS in Analytics (USA/Europe)", "MBA in Business Analytics"]
    };
  }

  if (norm.includes('ZOOLOGY')) {
    return {
      name: "B.Sc Zoology",
      fullName: "Bachelor of Science in Zoology",
      duration: "3 - 4 Years (NEP)",
      overview: "Explores animal physiology, evolutionary biology, behavioral ecology, veterinary genetics, entomology, and cell biology. Pivotal for wildlife conservation, veterinary research, and environmental fields.",
      keySubjects: ["Non-Chordata & Chordata Physiology", "Animal Behavior & Sociobiology", "Evolution & Genetics", "Animal Ecology & Zoogeography", "Parasitology & Immunology"],
      topColleges: ["St. Joseph's University Bangalore", "Miranda House Delhi", "Presidency College Chennai", "The National College Jayanagar Bangalore"],
      industryRoles: ["Wildlife Biologist Assistant", "Zoologist / Ecologist Assistant", "Animal Lab Assistant", "Forest Range Officer assistant", "Conservationist Support"],
      avgSalary: "₹3.2 Lakhs - ₹6.5 Lakhs per annum",
      higherStudies: ["M.Sc Zoology", "M.Sc Wildlife Biology / Forestry", "Integrated Ph.D. in Biological Sciences"]
    };
  }

  if (norm.includes('LIFESCIENCES')) {
    return {
      name: "B.Sc Life Sciences",
      fullName: "Bachelor of Science in Life Sciences",
      duration: "3 - 4 Years (NEP)",
      overview: "A highly comprehensive, multidisciplinary biological degree combining botany, zoology, biochemistry, molecular biology, genetics, and biotechnology.",
      keySubjects: ["Cell Biology & Biochemistry", "Applied Genomes & Genetics", "Plant & Animal Physiology", "Biophysics & Instrumentation", "Ecology & Microbiology"],
      topColleges: ["St. Joseph's University", "Delhi University", "Mount Carmel College Bangalore", "Christ University"],
      industryRoles: ["Clinical Research Specialist", "Laboratory Biochemist", "Quality Control Officer", "Agrochemical Researcher", "Medical Scribe"],
      avgSalary: "₹3.4 Lakhs - ₹7.0 Lakhs per annum",
      higherStudies: ["M.Sc Life Sciences", "M.Sc Biotech / Biochemistry", "Ph.D. in Cellular Biology"]
    };
  }

  if (norm.includes('HOMESCIENCE')) {
    return {
      name: "B.Sc Home Science",
      fullName: "Bachelor of Science in Home Science / Family Sciences",
      duration: "3 - 4 Years (NEP)",
      overview: "An elegant interdisciplinary degree blending nutritional sciences, child psychology, interior systems, family resource frameworks, textile care, and home economics.",
      keySubjects: ["Food Science & Clinical Nutrition", "Human Development & Childhood Psychology", "Family Resource Management", "Textiles & Apparel Designing", "Extension Education & Communication"],
      topColleges: ["Mount Carmel College Bangalore", "SNDT Women's University Mumbai", "Lady Irwin College New Delhi", "St. Teresa's College Ernakulam"],
      industryRoles: ["Child Development Counselor", "Interior Styling Consultant", "Apparel & Textile Designer", "Family Welfare Officer", "Food Products Tester"],
      avgSalary: "₹3.0 Lakhs - ₹6.5 Lakhs per annum",
      higherStudies: ["M.Sc Home Science", "M.Sc Nutrition / Human Development", "P.G. Diploma in Fashion & Design"]
    };
  }

  if (norm.includes('NUTRITION') || norm.includes('DIETETICS')) {
    return {
      name: "Nutrition & Dietetics",
      fullName: "B.Sc in Clinical Nutrition and Dietetics",
      duration: "3 - 4 Years (NEP)",
      overview: "Focuses on human nutrition, clinical diet charts, physiology of digestion, lifestyle diseases, therapeutic feeding formulas, metabolic planning, and hospital dietary systems.",
      keySubjects: ["Therapeutic Nutrition", "Clinical Dietetics Practices", "Human Physiology & Metabolism", "Food Microbiology & Safety", "Diet Counseling & Public Nutrition"],
      topColleges: ["Mount Carmel College Bangalore", "St. Joseph's University Bangalore", "St. Teresa's College", "Jamia Hamdard University Delhi"],
      industryRoles: ["Clinical Dietitian / Nutritionist", "Sports Nutrition Coach", "Food & Health Advisor", "Hospital Dietary Manager", "Wellness Blogger / Entrepreneur"],
      avgSalary: "₹3.5 Lakhs - ₹8.0 Lakhs per annum",
      higherStudies: ["M.Sc Clinical Nutrition", "Registered Dietitian (RD) Licensure", "Sports Nutrition certifications"]
    };
  }

  if (norm === 'BCOM' || norm.includes('COMMERCE')) {
    return {
      name: "B.Com",
      fullName: "Bachelor of Commerce",
      duration: "3 - 4 Years (NEP)",
      overview: "The ultimate benchmark undergraduate degree in business and corporate transactions. Heavily details ledger logging, monetary laws, bank processes, auditing regulations, and corporate trade structures.",
      keySubjects: ["Corporate Accounting", "Income Tax Laws & Auditing", "Financial Management", "Cost & Management Accounting", "Business Law & Goods and Services Tax (GST)"],
      topColleges: ["Sri Ram College of Commerce (SRCC) Delhi", "St. Joseph's College of Commerce (SJCC) Bangalore", "Christ University Bangalore", "Mount Carmel College Bangalore"],
      industryRoles: ["Corporate Accountant", "Financial Analyst Trainee", "Tax Consultant", "Audit Associate", "Operations Risk Associate"],
      avgSalary: "₹4.0 Lakhs - ₹10.5 Lakhs per annum (Significantly higher with professional tags like CA, ACCA)",
      higherStudies: ["M.Com (Master of Commerce)", "MBA (Finance)", "Professional Certifications (CA, ACCA, CS, CMA)"]
    };
  }

  if (norm === 'BBA' || norm.includes('BUSINESSADMIN')) {
    return {
      name: "BBA",
      fullName: "Bachelor of Business Administration",
      duration: "3 - 4 Years (NEP)",
      overview: "A professional undergraduate program preparing students for executive corporate roles. Imparts critical knowledge of team leadership, business strategy, consumer marketing, financial reports, and HR models.",
      keySubjects: ["Organizational Behavior & Human Resources", "Marketing Management & Digital Ads", "Financial Planning & Analysis", "Strategic Business Management", "Business Communication & Analytics"],
      topColleges: ["Shaheed Sukhdev College of Business Studies Delhi", "Christ University Bangalore", "Symbiosis Institute Pune", "St. Joseph's University Bangalore", "Alliance School of Business Bangalore"],
      industryRoles: ["Marketing Executive", "Human Resource Analyst", "Business Operations Executive", "Financial Planning Associate", "Sales Strategy Manager"],
      avgSalary: "₹4.2 Lakhs - ₹11.5 Lakhs per annum",
      higherStudies: ["MBA (Master of Business Administration)", "M.Sc Management", "Corporate Law (LLB) specializations"]
    };
  }

  if (norm.includes('ECONOMICS')) {
    return {
      name: "BA Economics",
      fullName: "Bachelor of Arts in Economics",
      duration: "3 - 4 Years (NEP)",
      overview: "A rigorous analytical humanities course exploring macroeconomic parameters, micro-demands, game theory concepts, market dynamics, public finance, and statistics/econometrics metrics.",
      keySubjects: ["Microeconomic & Macroeconomic Theories", "Mathematical Economics", "Introductory Econometrics", "Public Finance & Policy", "International Trade Models"],
      topColleges: ["Delhi School of Economics (DSE)", "St. Stephen's College Delhi", "Presidency College Kolkata", "St. Joseph's University Bangalore", "Christ University"],
      industryRoles: ["Economic Analyst", "Policy Researcher", "Market Risk Researcher", "Budget Planner", "Consultant / Business Scribe"],
      avgSalary: "₹4.5 Lakhs - ₹12 Lakhs per annum",
      higherStudies: ["M.Sc / MA Economics", "Master in Public Policy (MPP)", "Ph.D. in Developmental Economics"]
    };
  }

  if (norm === 'CA' || norm.includes('CHARTEREDACCOUNT')) {
    return {
      name: "CA",
      fullName: "Chartered Accountancy",
      duration: "4 - 5 Years (Professional Program by ICAI)",
      overview: "One of the most competitive and prestigious financial credentials in the world, certified by the Institute of Chartered Accountants of India (ICAI). Focuses on auditing, direct/indirect taxation, forensic accounting, state financial audits, and enterprise valuation.",
      keySubjects: ["Advanced Financial Reporting", "Direct & Indirect Tax Laws", "Strategic Financial Management", "Corporate Laws & Governance", "Statutory Auditing Protocols"],
      topColleges: ["Institute of Chartered Accountants of India (ICAI) - Direct Registrations / Self-Study with specialized coaching institutes"],
      industryRoles: ["Chartered Accountant / Tax Consultant", "Statutory Auditor", "Chief Financial Officer (CFO)", "Investment Banker", "Forensic Auditor / Advisor"],
      avgSalary: "₹9.0 Lakhs - ₹25 Lakhs per annum (No upper limit for independent practice)",
      higherStudies: ["Direct eligibility for Doctoral programs", "Master of Business Administration (Executive MBA)"]
    };
  }

  if (norm === 'CS' || norm.includes('COMPANYSECRET') || norm.includes('COMPANYESECRETARY')) {
    return {
      name: "Company Secretary (CS)",
      fullName: "Company Secretary (CS Professional Program by ICSI)",
      duration: "3 - 5 Years (Professional Program)",
      overview: "The ultimate professional corporate guidance credential administered by the Institute of Company Secretaries of India (ICSI). Ensures absolute corporate board compliance with central laws, shareholder systems, legal ethics, and corporate audits.",
      keySubjects: ["Corporate Law & Practice", "Securities Laws & Capital Markets", "Drafting & Legal Pleadings", "Corporate Restructuring & Valuation", "Ethics & Sustainability Systems"],
      topColleges: ["Institute of Company Secretaries of India (ICSI)"],
      industryRoles: ["In-house Company Secretary", "Legal Board Consultant", "Compliance Officer", "Corporate Governance Consultant", "Adviser to Board of Directors"],
      avgSalary: "₹6.5 Lakhs - ₹15 Lakhs per annum",
      higherStudies: ["Corporate Law (LLB) programs", "MBA in Corporate Governance"]
    };
  }

  if (norm === 'BBM' || norm.includes('BUSINESSMGMT')) {
    return {
      name: "BBM",
      fullName: "Bachelor of Business Management",
      duration: "3 Years",
      overview: "Focuses on core management structures, logistical operations, human team handling, and financial allocations. Very similar to BBA but prioritizes operational management and team psychology.",
      keySubjects: ["Production & Operations Management", "Management Accounting", "Business Law Practices", "Industrial Relations & HR", "Retail & Marketing Channels"],
      topColleges: ["Bangalore University Affiliated Colleges", "SJCC Bangalore", "Mount Carmel Bangalore"],
      industryRoles: ["Operations Supervisor", "Branch Manager Associate", "Client Liaison Associate", "Procurement Officer", "B2B Sales Lead"],
      avgSalary: "₹3.8 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["MBA (Finance/Marketing/Supply Chain)", "PG Diploma in Project Management"]
    };
  }

  if (norm.includes('MBA')) {
    return {
      name: "MBA (after graduation)",
      fullName: "Master of Business Administration (Regular Program)",
      duration: "2 Years (Post Graduation)",
      overview: "The premier worldwide administrative degree. Equips students with high-level team management skills, entrepreneurial strategies, global financial systems, organizational structures, and business leadership.",
      keySubjects: ["Strategic Management & Consulting", "Corporate Finance & Mergers", "Consumer Behavior & Branding", "Supply Chain & Analytics", "Leadership & Executive Presence"],
      topColleges: ["Indian Institutes of Management (IIMs)", "Xavier School of Management (XLRI) Jamshedpur", "FMS Delhi", "Symbiosis Pune"],
      industryRoles: ["Management Consultant", "Investment Banker", "Product Manager", "Brand Specialist / Director", "Operations Head"],
      avgSalary: "₹10 Lakhs - ₹35 Lakhs per annum (Top IIMs go ₹25L-50L+)",
      higherStudies: ["Ph.D. in Management Studies", "Executive Leadership Certifications (Harvard, INSEAD)"]
    };
  }

  if (norm === 'CMA' || norm.includes('COSTANDMGMT') || norm.includes('COSTMANAGEMENT')) {
    return {
      name: "CMA",
      fullName: "Cost & Management Accountancy",
      duration: "3 - 4 Years (Professional Program by ICAI-CMA)",
      overview: "Professional cost audit course focusing on corporate pricing strategies, manufacturing valuations, resource allocations, inventory controls, and financial reporting audits inside heavy factories.",
      keySubjects: ["Strategic Cost Management", "Performance Management", "Financial Reporting & Tax", "Corporate Laws & Compliance", "Cost Audit & Operational Control"],
      topColleges: ["Institute of Cost Accountants of India (ICAI-CMA)"],
      industryRoles: ["Cost Accountant", "Pricing Analyst", "Cost Auditor", "Financial Controller", "Internal Risk Controller"],
      avgSalary: "₹5.5 Lakhs - ₹12 Lakhs per annum",
      higherStudies: ["Doctoral admissions", "Executive MBA"]
    };
  }

  if (norm === 'JOURNALISM' || norm === 'BAJOURNALISM' || norm.includes('JOURNAL')) {
    return {
      name: "BA Journalism",
      fullName: "Bachelor of Arts in Journalism",
      duration: "3 - 4 Years (NEP)",
      overview: "Trains students in ethical print reporting, broadcast scripting, anchor protocols, web logging, press laws, and digital media channels.",
      keySubjects: ["Press Laws & Media Ethics", "Feature Writing & reporting", "Technical Editing & Lay-out", "Broadcast Technology (Radio/TV)", "Modern Digital Media Scribing"],
      topColleges: ["IIJNM Bangalore", "SJU Bangalore", "Christ University Bangalore", "Mount Carmel Bangalore"],
      industryRoles: ["News Scribe / Reporter", "Sub-Editor", "Creative Content Creator", "Media Manager", "Brand Executive"],
      avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["MA Journalism", "PG Diploma in Digital Scribes", "MBA"]
    };
  }

  if (norm.includes('HISTORY')) {
    return {
      name: "BA History",
      fullName: "Bachelor of Arts in History",
      duration: "3 - 4 Years (NEP)",
      overview: "Explore world civilizations, geopolitical evolutions, archeological paradigms, and state historical governance codes. Incredible leverage for governmental exams.",
      keySubjects: ["Ancient Indian Empires", "Medieval and Mughal Administration", "Modern Indian Freedom Struggle", "World Civilizations & Geo-Politics", "Archeological Excavation Research"],
      topColleges: ["St. Stephen's College Delhi", "Presidency College Chennai", "St. Joseph's University Bangalore", "Hansraj College"],
      industryRoles: ["Archival Assistant", "Historical Research Writer", "Civil Service Trainee", "Heritage Museum Curator", "Archeology Assistant"],
      avgSalary: "₹3.2 Lakhs - ₹6.0 Lakhs per annum",
      higherStudies: ["MA in History", "MA in Archeology", "PG Diploma in Archives"]
    };
  }

  if (norm.includes('POLITICAL') || norm.includes('POLSCI')) {
    return {
      name: "BA Political Science",
      fullName: "Bachelor of Arts in Political Science",
      duration: "3 - 4 Years (NEP)",
      overview: "Explores political mechanisms, Indian constitutional systems, comparative global government policies, international treaties, diplomacy, and public administration principles.",
      keySubjects: ["Indian Constitution & Polity", "International Relations & Systems", "Western & Indian Political Thinkers", "Comparative Public Policies", "Political Philosophy & Sociology"],
      topColleges: ["Hindu College Delhi", "St. Joseph's University Bengaluru", "Christ University Bengaluru", "Jawaharlal Nehru University (JNU)"],
      industryRoles: ["Policy Associate", "Legislative Assistant", "Diplomatic / NGO Coordinator", "Political Analyst", "Administrative Executive"],
      avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["MA Political Science / IR", "Master in Public Policy (MPP)", "Law (LLB) Studies"]
    };
  }

  if (norm === 'LLB' || norm.includes('LAW')) {
    return {
      name: "LLB",
      fullName: "Bachelor of Laws",
      duration: "3 Years (after graduation) or 5 Years (Integrated BA LLB after 12th)",
      overview: "The professional legal advocate qualification regulated by the Bar Council of India. Equips scholars with deep logical and litigation competencies, corporate legal drafting, and courtroom presentation skills.",
      keySubjects: ["Constitutional & Civil Procedure Laws", "Corporate & Intellectual Property Law", "Criminal & Forensic Evidence Law", "Environmental and Public International Laws", "Drafting, Pleading & Moot Court"],
      topColleges: ["National Law School of India University (NLSIU) Bangalore", "National Law Universities (NLUs)", "B.M.S. College of Law Bangalore", "School of Law Christ University"],
      industryRoles: ["Corporate Legal Counsel", "Litigation Lawyer / Advocate", "Judicial Officer / Magistrate", "Legal Compliance Manager", "Legal Quality Scribe"],
      avgSalary: "₹5.0 Lakhs - ₹15 Lakhs per annum (Top tier corporate packages exceed ₹18L+)",
      higherStudies: ["LLM (Master of Laws)", "Postgrad Diploma in Cyber Law", "Judicial Services Preparation"]
    };
  }

  if (norm.includes('PUBLICADMIN') || norm.includes('PUBLICADMINISTRATION')) {
    return {
      name: "Public Administration",
      fullName: "BA in Public Administration",
      duration: "3 - 4 Years (NEP)",
      overview: "Explores how state policies are formulated, audited, and systematically integrated on real field sites. Prepares candidates for local, municipal, state, and central administrative tasks.",
      keySubjects: ["Administrative Theories & Thought", "Financial Administration & Audit", "Personnel Administration & Public Relations", "Local Governance & Panchayat Systems", "Public Policy Analysis"],
      topColleges: ["Delhi University", "Presidency College", "Bangalore University Colleges", "SJC Bengaluru"],
      industryRoles: ["Public Policy Scribe", "Administrative Coordinator", "Panchayat Development Officer helper", "Legislative Assistant", "NGO Program Executive"],
      avgSalary: "₹3.4 Lakhs - ₹7.0 Lakhs per annum",
      higherStudies: ["MA Public Administration", "Civil Services", "Master in Public Policy (MPP)"]
    };
  }

  if (norm.includes('CIVILSERVICES') || norm.includes('UPSC')) {
    return {
      name: "Civil Services",
      fullName: "UPSC / KPSC Civil Services Strategic Alignment",
      duration: "Pre-Preparation integrated with any Bachelor's degree",
      overview: "A dedicated systematic academic outline to clear India's highest administrative systems (IAS, IPS, IFS, KAS). Direct focus on systemic syllabus content, ethics, general knowledge modules, and analytical essay drafting.",
      keySubjects: ["Indian Heritage & Modern Culture", "Geography & Natural Resources of India", "Economic developmental governance", "General Studies & Ethical Scruples", "Current Affairs & Global Treaties Analysis"],
      topColleges: ["National coaching hubs based in Delhi, Bangalore (Chandra Layout, Vijayanagar)", "St. Joseph's University (IAS Academy)", "Bangalore University"],
      industryRoles: ["Sub-Divisional Magistrate", "Assistant Commissioner", "State Tax Officer", "Superintendent of Police (DySP)", "IFS Officer"],
      avgSalary: "₹7.0 Lakhs - ₹13 Lakhs per annum (Excluding allowances, housing, transport, and national governance leverage)",
      higherStudies: ["Specialized administrative service training at LBSNAA, SVPNPA"]
    };
  }

  if (norm.includes('SOCIOLOGY')) {
    return {
      name: "BA Sociology",
      fullName: "Bachelor of Arts in Sociology",
      duration: "3 - 4 Years (NEP)",
      overview: "Comprehensively analyzes human social interactions, family networks, rural-urban transition frameworks, caste structures, research methodologies, and social development models.",
      keySubjects: ["Foundations of Sociological Thought", "Research Methodologies & Sociometry", "Social Problems & Governance Studies", "Urban-Rural Sociology Dynamics", "Gender & Development Study"],
      topColleges: ["St. Joseph's University Bangalore", "Delhi University", "Hindu College", "Christ University", "Mount Carmel Bangalore"],
      industryRoles: ["Social Welfare Researcher", "NGO Project Leader", "CSR Specialist (Corporate Social Responsibility)", "Developmental Consultant", "Public Relations Executive"],
      avgSalary: "₹3.2 Lakhs - ₹6.8 Lakhs per annum",
      higherStudies: ["MA Sociology", "Master of Social Work (MSW)", "Doctoral Research"]
    };
  }

  if (norm.includes('SOCIALWORK') || norm === 'BSW' || norm === 'MSW') {
    return {
      name: "Social Work",
      fullName: "BSW (Bachelor of Social Work)",
      duration: "3 Years",
      overview: "A professional, field-work intensive degree empowering students to actively address community struggles, counseling procedures, corporate CSR projects, rehabilitation pathways, and state welfare policies.",
      keySubjects: ["Introduction to Social Work Fields", "Human Psychology & Interventions", "Community Organization practices", "Social Welfare Policies & Laws", "Concurrent Field Work Internship"],
      topColleges: ["St. Joseph's University Bengaluru", "School of Social Work Roshni Nilaya Mangaluru", "TISS Mumbai", "St. George's Chennai"],
      industryRoles: ["CSR Manager (Corporate)", "Medical Social Worker", "Family & Mental Health Counselor", "NGO Coordinator", "Rehabilitation Officer"],
      avgSalary: "₹3.2 Lakhs - ₹7.0 Lakhs per annum",
      higherStudies: ["MSW (Master of Social Work)", "MBA in Human Resources/CSR"]
    };
  }

  if (norm.includes('ENGLISH')) {
    return {
      name: "BA English",
      fullName: "Bachelor of Arts in English Literature",
      duration: "3 - 4 Years (NEP)",
      overview: "Focuses on advanced literature, analysis of prose & poetry, creative writing, linguistics, global classics, and digital content communication frameworks.",
      keySubjects: ["British & Commonwealth Literature", "Indian Writing in English", "Literary Theory & Criticism", "Creative & Professional Writing", "Linguistics & Semiotics"],
      topColleges: ["St. Stephen's College Delhi", "Christ University Bengaluru", "St. Joseph's University", "Presidency College Chennai"],
      industryRoles: ["Content Writer / Copywriter", "Editor / Publisher Associate", "Corporate Communications Executive", "PR Executive", "Media Analyst"],
      avgSalary: "₹3.5 Lakhs - ₹7.2 Lakhs per annum",
      higherStudies: ["MA English Literature", "MBA in Communications / Media", "Postgrad in journalism"]
    };
  }

  if (norm.includes('PSYCHOLOGY')) {
    return {
      name: "B.Sc Psychology",
      fullName: "Bachelor of Science in Psychology",
      duration: "3 - 4 Years (NEP)",
      overview: "Studies human brain pathways, cognitive responses, child development, social behavior, counseling basics, and advanced clinical laboratory diagnostics.",
      keySubjects: ["General & Cognitive Psychology", "Developmental Psychology", "Abnormal & Clinical Psychology", "Psychometrics & Statistics", "Counseling & Experimental Labs"],
      topColleges: ["NIMHANS (Specialized clinical diplomas)", "St. Joseph's University Bangalore", "Christ University Bangalore", "Mount Carmel Bangalore"],
      industryRoles: ["Counseling Assistant", "H.R. Recruiter / Coordinator", "Child Care Consultant Helper", "Special Educator Assistant", "Behavioral Coach"],
      avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
      higherStudies: ["M.Sc Psychology", "M.Sc in Clinical Psychology", "M.Phil / Professional Clinical Counselor license"]
    };
  }

  if (norm.includes('MEDIACOMMUNICATION') || norm.includes('MEDIASTUDIES')) {
    return {
      name: "Media Communication",
      fullName: "BA in Media Studies & Communications",
      duration: "3 - 4 Years (NEP)",
      overview: "An elegant interdisciplinary degree focusing on digital media channels, visual arts, television scriptings, and advertising strategies.",
      keySubjects: ["Introduction to Media Models", "Visual Design & Media Tech", "Advertising & Branding Strategy", "Film Studies & Screenplay", "Media Scribes & Public Relations"],
      topColleges: ["IIJNM Bangalore", "Christ University", "SJU Bangalore", "Symbiosis Pune"],
      industryRoles: ["Media Planner", "Social Media Strategist", "Advertisement copywriter", "PR executive", "Digital Content Developer"],
      avgSalary: "₹3.6 Lakhs - ₹8.0 Lakhs per annum",
      higherStudies: ["MA in Mass Communication", "MBA in Marketing Communications"]
    };
  }

  if (norm.includes('PUBLICRELATIONS') || norm.includes('PRCORP')) {
    return {
      name: "Public Relations",
      fullName: "BA in Public Relations & Corporate Communication",
      duration: "3 - 4 Years (NEP)",
      overview: "Imparts skills for strategic corporate storytelling, brand reputation management, press interactions, press-release writing, crisis communication, and consumer perception audits.",
      keySubjects: ["Corporate Communications Systems", "Crisis Management & Ethics", "Branding & Consumer Psychology", "Digital Campaigns & Analytics", "Media Relations Practicum"],
      topColleges: ["Symbiosis Pune", "SJU Bangalore", "Mount Carmel Bangalore", "LSR College New Delhi"],
      industryRoles: ["PR Executive", "Corporate Communication Associate", "Brand Manager Assistant", "Publicist", "Event Coordinator"],
      avgSalary: "₹3.8 Lakhs - ₹8.5 Lakhs per annum",
      higherStudies: ["P.G. Diploma in PR", "MBA in Marketing / Communication"]
    };
  }

  // Fallback
  const isDegree = /^(B[A-Z]|M[A-Z]|BACHELOR|MASTER|DIPLOMA|PHD|MD|MS|MBBS|CA|CS|LLB|GNM|ANM|DMLT|DOTT)\b/i.test(degreeName) || degreeName.length <= 5;
  
  if (!isDegree) {
    return {
      name: degreeName,
      fullName: `${degreeName} Professional Pathway`,
      duration: "Immediate Direct Entry",
      overview: `A highly specialized professional career role focusing on core execution competencies as a ${degreeName}. Equips students with hands-on industrial skills, equipment/tool mastery, and commercial services management.`,
      keySubjects: [`Advanced ${degreeName} Procedures`, "Safety & Regulatory Compliance", "Client & Vendor Coordination", "Diagnostic & Troubleshooting Skills", "Service Quality Auditing"],
      topColleges: ["Leading Industry Service Providers", "Corporate Maintenance Divisions", "Specialized Sourcing Agencies", "Private Sector Contracting Firms"],
      industryRoles: [`Senior ${degreeName}`, "Team Shift Lead", "Technical Operations Supervisor", "Independent Contracting Specialist"],
      avgSalary: "₹2.5 Lakhs - ₹6.5 Lakhs per annum (Scales with experience)",
      higherStudies: ["Advanced Technical Certifications", "Industrial Safety (OSHA) Licenses", "Small Business Management Programs"]
    };
  }

  return {
    name: degreeName,
    fullName: `${degreeName} Degree Program`,
    duration: "3 - 4 Years as per NEP guidelines",
    overview: `A modern, progressive professional pathway focusing on core competencies in ${degreeName}. Equips students with intensive theoretical foundations, practical work labs, and strategic market knowledge.`,
    keySubjects: ["Theoretical Core Foundations", "Applied Sectoral Informatics", "Strategic Case Studies", "Elective Specializations", "Social and Ethical Frameworks"],
    topColleges: ["Christ University Bangalore", "St. Joseph's University Bangalore", "Mount Carmel College Bangalore", "Bangalore University Affiliated Institutions"],
    industryRoles: ["Project Analyst", "Field Operations Lead", "Strategic Adviser", "Specialized Officer"],
    avgSalary: "₹3.8 Lakhs - ₹8.2 Lakhs per annum",
    higherStudies: ["Academic Master's Degree (M.A/M.Sc)", "Executive Management Programs", "Ph.D. / Research Certifications"]
  };
}

interface PostGradFact {
  name: string;
  fullName: string;
  duration: string;
  overview: string;
  eligibility: string;
  specializations: string[];
  topColleges: string[];
  careerProspects: string[];
  salaryBoost: string;
}

function getPostGradDetails(pgName: string): PostGradFact {
  const norm = pgName.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (norm.includes('MTECH') || norm.includes('MASTEROFENGINEERING') || norm.includes('MSTECH') || (norm.includes('MS') && norm.includes('SCIENCE') && !norm.includes('MSC'))) {
    return {
      name: "M.Tech / M.S.",
      fullName: "Master of Technology / Master of Science",
      duration: "2 Years",
      overview: "An advanced research and professional program focusing on specialized engineering disciplines, computing research, systems architecture, and cutting-edge technology design.",
      eligibility: "B.E. / B.Tech or equivalent degree with a qualifying GATE score or PG entrance exams.",
      specializations: ["Computer Science & Engineering", "Data Science & AI", "VLSI & Microelectronics", "Robotics & Automation", "Software Engineering"],
      topColleges: ["IISc Bangalore", "IIT Bombay", "IIT Madras", "NITK Surathkal", "IIIT Bangalore"],
      careerProspects: ["Senior Research Engineer", "AI/ML Scientist", "Silicon Design Engineer", "System Architect", "R&D Lead"],
      salaryBoost: "Average package increases to ₹12 Lakhs - ₹35 Lakhs per annum."
    };
  }

  if (norm.includes('MBA') || norm.includes('MASTEROFBUSINESS')) {
    return {
      name: "MBA",
      fullName: "Master of Business Administration",
      duration: "2 Years",
      overview: "The most distinguished global credential in business management and corporate leadership. Emphasizes financial strategy, organizational behavior, marketing dynamics, operation methodologies, and venture creation.",
      eligibility: "Any bachelor's degree with CAT, GMAT, XAT, MAT, or state PGCET credentials.",
      specializations: ["Corporate Finance", "Marketing & Brand Strategy", "Information Technology Systems", "Supply Chain & Logistics", "Human Resource Management"],
      topColleges: ["IIM Bangalore", "IIM Ahmedabad", "IIM Calcutta", "XLRI Jamshedpur", "FMS New Delhi"],
      careerProspects: ["Management Consultant", "Investment Banker", "Product Manager", "Brand Director", "Business Operations Lead"],
      salaryBoost: "Highly rewarding average of ₹14 Lakhs - ₹40 Lakhs per annum."
    };
  }

  if (norm.includes('PHD') || norm.includes('DOCTOR') || norm.includes('INTEGRATEDPHD')) {
    return {
      name: "Ph.D. / Doctoral Studies",
      fullName: "Doctor of Philosophy (Research Degree)",
      duration: "3 - 5 Years",
      overview: "The pinnacle of academic research. Involves original scientific, technical, mathematical, or literary investigations culminating in a peer-reviewed thesis submission and oral defense.",
      eligibility: "Master's degree in a relevant specialization with a strong CSIR-NET, UGC-NET, GATE, or institutional JRF ranking.",
      specializations: ["Advanced Algorithms & Quantum Computing", "Pure and Applied Mathematics", "Molecular Biology & Biotech", "Applied Economics & Policy", "Sociological Frameworks"],
      topColleges: ["IISc Bangalore", "Tata Institute of Fundamental Research (TIFR)", "IITs", "JNU New Delhi", "IISERs"],
      careerProspects: ["Postdoctoral Researcher", "University Professor / Lecturer", "Principal R&D Scientist", "Policy Advisor", "Senior Domain Consultant"],
      salaryBoost: "Highly respected career trajectories starting at ₹10 Lakhs up to ₹25 Lakhs per annum in corporate R&D."
    };
  }

  if (norm.includes('MCA') || norm.includes('MASTEROFCOMPUTER')) {
    return {
      name: "MCA",
      fullName: "Master of Computer Applications",
      duration: "2 Years as per recent regulations",
      overview: "An advanced professional course specifically tailored for software enthusiasts. Connects computer science theory with enterprise-grade software development, system design, and database administration.",
      eligibility: "BCA, B.Sc Computer Science, or any bachelor's degree with Mathematics at PUC/Degree level, with Karnataka PGCET or equivalent ranking.",
      specializations: ["Cloud & DevOps", "Full Stack Web Engineering", "Cyber Security", "Data Analytics", "Mobile App Architecture"],
      topColleges: ["NIT Trichy", "RV College of Engineering (RVCE) Bangalore", "Christ University Bangalore", "PES University Bangalore", "BMSIT Bangalore"],
      careerProspects: ["Senior Software Engineer", "Systems Analyst", "Cloud Administrator", "Database Engineer", "IT Project Manager"],
      salaryBoost: "Bridges the gap to B.Tech grads with packages ranging from ₹6.0 Lakhs - ₹16 Lakhs per annum."
    };
  }

  if (norm.includes('MSC') && (norm.includes('COMP') || norm.includes('DATA') || norm.includes('ANALYTICS') || norm.includes('AI'))) {
    return {
      name: "M.Sc Comp. Science / Data Science",
      fullName: "Master of Science in Computer Science & Data Analytics",
      duration: "2 Years",
      overview: "A highly analytical post-graduate program balancing computing foundations, numerical sciences, machine learning algorithms, and high-performance big-data configurations.",
      eligibility: "B.Sc in Computer Science, BCA, or B.Sc in Math/Stats/Physics with appropriate computer programming coursework.",
      specializations: ["Data Science & Analytics", "Artificial Intelligence & Robotics", "Network Security", "Cloud Technologies"],
      topColleges: ["St. Joseph's University Bangalore", "Christ University Bangalore", "IIT Madras (specialized PG credentials)", "Pune University"],
      careerProspects: ["Data Scientist", "Machine Learning Developer", "Data Analyst", "Database Architect", "Research Analyst"],
      salaryBoost: "Strong starting packages of ₹7 Lakhs - ₹18 Lakhs per annum."
    };
  }

  if (norm.includes('MSC') && norm.includes('IT')) {
    return {
      name: "M.Sc IT / Systems",
      fullName: "Master of Science in Information Technology",
      duration: "2 Years",
      overview: "Focuses on the configuration, deployment, security auditing, and administration of modern enterprise information systems, database pipelines, and cloud networks.",
      eligibility: "B.Sc IT, BCA, or B.Sc in any mathematical science branch with foundational coding proficiency.",
      specializations: ["Information Security Systems", "Cloud Computing & Networks", "Software Quality Assurance", "Digital Transformation Management"],
      topColleges: ["St. Xavier's College Mumbai", "DA-IICT Gandhinagar", "Kristu Jayanti College Bangalore", "Mount Carmel College Bengaluru"],
      careerProspects: ["IT Infrastructure Manager", "Systems Security Consultant", "Network Architect", "Systems Administrator"],
      salaryBoost: "Professional salary packages varying from ₹5.5 Lakhs - ₹12 Lakhs per annum."
    };
  }

  if (norm.includes('MSC') && (norm.includes('MATH') || norm.includes('STAT') || norm.includes('ACTUAR') || norm.includes('MSTAT'))) {
    return {
      name: "M.Sc / M.Stat (Math/Stats)",
      fullName: "Master of Science / Master of Statistics in Mathematical Sciences",
      duration: "2 Years",
      overview: "Deeply immersive theoretical program dealing with micro-econometrics, probability systems, quantitative structures, and actuaries. Key to investment trading and high-frequency risk algorithms.",
      eligibility: "B.Sc with Mathematics/Statistics as a major combination with solid mathematical indices.",
      specializations: ["Actuarial Science & Insurance Risk", "Quantitative Finance & Trading", "Pure Mathematics", "Biostatistics & Experimental Design"],
      topColleges: ["Indian Statistical Institute (ISI) Bangalore/Kolkata", "Chennai Mathematical Institute (CMI)", "Delhi University", "IIT Bombay (M.Sc Applied Statistics)"],
      careerProspects: ["Quantitative Investment Analyst", "Actuary (Life & Risk Financial planning)", "Biostatistician", "Risk Management Modeler"],
      salaryBoost: "High-demand positions offering ₹8 Lakhs - ₹22 Lakhs per annum."
    };
  }

  if (norm.includes('MSC') && norm.includes('ELECTRONIC')) {
    return {
      name: "M.Sc Electronics",
      fullName: "Master of Science in Electronics & Embedded Systems",
      duration: "2 Years",
      overview: "Deals with integrated hardware-software designs, IoT systems, VLSI semiconductors, microarchitectures, and high-frequency wave designs.",
      eligibility: "B.Sc in Electronics / Physics / Computer Science or equivalent engineering credential.",
      specializations: ["VLSI Design & Semiconductors", "Embedded Systems & IoT", "Digital Signal Processing", "Robotics & Controls"],
      topColleges: ["SJU Bangalore", "Mount Carmel Bengaluru", "Pune University", "Delhi University"],
      careerProspects: ["Embedded Hardware Engineer", "VLSI Verification Professional", "IoT Solutions Lead", "Firmware Programmer"],
      salaryBoost: "Ranges from ₹6.5 Lakhs - ₹15 Lakhs per annum."
    };
  }

  if (norm.includes('MSC') && norm.includes('PHYSIC')) {
    return {
      name: "M.Sc Physics",
      fullName: "Master of Science in Physics",
      duration: "2 Years",
      overview: "Explores advanced quantum principles, solid-state condensed physical states, astrophysics, relative dynamics, and material science synthesis.",
      eligibility: "B.Sc in Physics with strong mathematics co-indices.",
      specializations: ["Astrophysics & Cosmology", "Condensed Matter Physics", "Nuclear & Particle Physics", "Optics & Photonics"],
      topColleges: ["IISc Bangalore", "IIT Kanpur", "TIFR Mumbai", "St. Stephen's Delhi", "SJU Bangalore"],
      careerProspects: ["Geophysicist (Oil & Minerals)", "Optical Research Scientist", "Lab Analyst in Nanomaterials", "Defense Scientist Assistant"],
      salaryBoost: "Packages around ₹5 Lakhs - ₹12 Lakhs per annum, focusing heavily on R&D."
    };
  }

  if (norm.includes('MD') || norm.includes('MS') || norm.includes('MCH') || norm.includes('DM') || norm.includes('MEDICINE') || norm.includes('SURGERY')) {
    return {
      name: "MD / MS Specialist",
      fullName: "Doctor of Medicine (MD) / Master of Surgery (MS)",
      duration: "3 Years",
      overview: "The gold standard specialization for licensed doctors (MBBS, BAMS, BHMS). Prepares doctors to become certified expert cardiologists, pediatricians, neurosurgeons, gynecologists, etc.",
      eligibility: "MBBS / BAMS / BHMS with qualifying marks in NEET-PG / AIAPGET or related specialized boards.",
      specializations: ["Cardiology & General Medicine (MD)", "Orthopedics & General Surgery (MS)", "Ophthalmology & Pediatrics", "Panchakarma and Kayachikitsa (Ayurveda MD)"],
      topColleges: ["AIIMS New Delhi", "Postgraduate Institute of Medical Education and Research (PGIMER) Chandigarh", "BMCRI Bangalore", "St. John's Medical College Bangalore"],
      careerProspects: ["Consultant Surgeon", "Specialist Physician", "Clinical Clinical Director", "Medical Professor"],
      salaryBoost: "Extremely elevated profile with packages starting at ₹15 Lakhs - ₹45 Lakhs+ per annum, scaling endlessly."
    };
  }

  if (norm.includes('MDS') || norm.includes('DENTAL')) {
    return {
      name: "MDS Specialist",
      fullName: "Master of Dental Surgery",
      duration: "3 Years",
      overview: "The post-graduate medical qualification in dental branches. Focuses on complex jaw reconstructions, advanced orthodontics, and cosmetic maxillofacial surgeries.",
      eligibility: "Bachelor of Dental Surgery (BDS) along with a clean rank in NEET-MDS.",
      specializations: ["Orthodontics & Dentofacial Orthopedics", "Oral and Maxillofacial Surgery", "Prosthodontics", "Paedodontics & Preventive Dentistry"],
      topColleges: ["Government Dental College Bangalore", "Manipal College of Dental Sciences", "Maulana Azad Institute New Delhi"],
      careerProspects: ["Consultant Orthodontist", "Maxillofacial Surgeon", "Dental Clinic Director", "Academia Head"],
      salaryBoost: "Average package varies between ₹8 Lakhs - ₹20 Lakhs per annum."
    };
  }

  if (norm.includes('MPH') || norm.includes('PUBLICHEALTH') || norm.includes('HOSPITAL') || norm.includes('HEALTHCARE')) {
    return {
      name: "MPH / MHA",
      fullName: "Master of Public Health / Master of Hospital Administration",
      duration: "2 Years",
      overview: "Focuses on systemic healthcare planning, epidemiology tracking, corporate hospital facility management, quality controls inside clinics, and global health policy designs.",
      eligibility: "Any medical or health sciences bachelor's degree (MBBS, BDS, B.Pharm, B.Sc Nursing, Life Sciences).",
      specializations: ["Epidemiology & Biostatistics", "Hospital Operations Management", "Health Policy & Economics", "Environmental Health", "Mental Health Systems"],
      topColleges: ["TISS Mumbai", "NIMHANS Bangalore", "Manipal Academy of Higher Education", "KLE Academy Belagavi"],
      careerProspects: ["Hospital Chief Operating Officer (COO)", "Public Health Specialist (WHO/UNICEF)", "Epidemiology Scribe", "Healthcare Quality Auditor"],
      salaryBoost: "Starting packages at ₹6.0 Lakhs - ₹15 Lakhs per annum."
    };
  }

  if (norm.includes('MPHARM') || norm.includes('PHARMD')) {
    return {
      name: "M.Pharm / Pharm.D",
      fullName: "Master of Pharmacy / Doctor of Pharmacy (Post-Baccalaureate)",
      duration: "2 Years (M.Pharm) or 3 Years (Pharm.D PB)",
      overview: "Delves into the deepest dynamics of pharmaceutical research, active ingredient formulations, clinical pharmacovigilance, drug discovery pathways, and analytical biotechnology.",
      eligibility: "B.Pharm degree certified by the Pharmacy Council of India with GPAT or state PG ratings.",
      specializations: ["Pharmaceutics", "Pharmacology & Bio-Systems", "Pharmaceutical Chemistry", "Pharmacovigilance & Drug Safety"],
      topColleges: ["NIPER SAS Nagar / Hyderabad", "Manipal College of Pharm Sciences", "JSS College of Pharmacy Mysore"],
      careerProspects: ["Senior Formulation Scientist", "Clinical Trial Auditor", "Pharmacovigilance Lead", "Drug Regulation Executive", "Patent Specialist"],
      salaryBoost: "Highly respected corporate R&D paths securing ₹6.5 Lakhs - ₹15 Lakhs per annum."
    };
  }

  if (norm.includes('NURSING') && norm.includes('MSC')) {
    return {
      name: "M.Sc Nursing",
      fullName: "Master of Science in Nursing",
      duration: "2 Years",
      overview: "Equips registered nurse professionals with advanced critical-care knowledge, clinical mentorship skills, nursing education techniques, and hospital nursing leadership principles.",
      eligibility: "B.Sc Nursing with a minimum of 1 year of clinical experience, certified by the Nursing Council.",
      specializations: ["Medical-Surgical Nursing", "Obstetrical & Gynecological Nursing", "Pediatric Nursing", "Psychiatric & Mental Health Nursing"],
      topColleges: ["St. John's College of Nursing Bangalore", "NIMHANS Bangalore (Nursing Division)", "AFMC Pune"],
      careerProspects: ["Nursing Supervisor / ICU Lead", "Clinical Nurse Specialist", "Nursing College Lecturer", "Healthcare Program Manager"],
      salaryBoost: "Enables fast-track international placements matching ₹30 Lakhs - ₹50 Lakhs per annum in western hospitals."
    };
  }

  if (norm.includes('BIOTECH') || norm.includes('ZOOLOGY') || norm.includes('LIFE') || norm.includes('BIOCHEM') || norm.includes('WILDLIFE')) {
    return {
      name: "M.Sc Biotech / Life Sciences",
      fullName: "Master of Science in Biotechnology & Life Sciences",
      duration: "2 Years",
      overview: "An intensive molecular program detailing genetic splicing, immunotherapy development, recombinant enzymes, industrial biomanufacturing, and advanced cellular pathways.",
      eligibility: "B.Sc in Biotechnology, Zoology, Life Sciences, Biochemistry, or related biological science.",
      specializations: ["Genetic Engineering & CRISPR", "Immunotechnology & Vaccines", "Industrial Microbiology", "Molecular Oncology Research"],
      topColleges: ["IIT Bombay (M.Sc Biotech)", "JNU New Delhi", "SJU Bangalore", "Christ University Bengaluru"],
      careerProspects: ["Bioprocess Scientist", "Immunology Scribe", "Genetic diagnostics specialist", "Biotech Lab Director"],
      salaryBoost: "Secures ₹5.5 Lakhs - ₹12 Lakhs per annum in clinical R&D hubs."
    };
  }

  if (norm.includes('HOMESCIENCE') || norm.includes('NUTRITION') || norm.includes('DIETETIC')) {
    return {
      name: "M.Sc Clinical Nutrition / Home Science",
      fullName: "Master of Science in Clinical Nutrition & Family Sciences",
      duration: "2 Years",
      overview: "Advanced studies in metabolic disease therapy, childhood psychological development, family dietary architectures, sports nutrition formulations, and critical clinical nutritional codes.",
      eligibility: "B.Sc in Home Science, Nutrition & Dietetics, clinical food tech, or related biochemical majors.",
      specializations: ["Therapeutic Clinical Nutrition", "Human Family & Child Development", "Apparel & Textile Management", "Dietary Consultation Systems"],
      topColleges: ["Mount Carmel College Bangalore", "Lady Irwin College New Delhi", "SNDT Mumbai"],
      careerProspects: ["Chief Clinical Dietitian (RD)", "Senior Sports Nutritionist", "Family Welfare Consultant", "Food Quality Assurance Manager"],
      salaryBoost: "Packages ranging from ₹5.0 Lakhs - ₹11 Lakhs per annum."
    };
  }

  if (norm === 'MCOM' || norm.includes('MASTEROFCOMMERCE')) {
    return {
      name: "M.Com",
      fullName: "Master of Commerce",
      duration: "2 Years",
      overview: "Deepens foundational knowledge in master corporate accounts, statistical business analysis, auditing methods, taxation principles, and state financial policy systems.",
      eligibility: "B.Com / BBM / BBA with minimum specified marks.",
      specializations: ["Advanced Accounting & Auditing", "Direct & Indirect Taxation", "Financial Business Systems", "Banking & Investment Insurance"],
      topColleges: ["SJCC Bangalore", "SRCC Delhi", "SJU Bangalore", "Christ University Bangalore"],
      careerProspects: ["Senior Investment Associate", "Corporate Accounts Manager", "Tax Advisor", "Financial Auditor", "Banking Operations Lead"],
      salaryBoost: "Positions securing ₹5.0 Lakhs - ₹10.5 Lakhs per annum."
    };
  }

  if (norm.includes('MCOM') || norm.includes('CHARTEREDACCOUNT') || norm.includes('ACCA') || norm.includes('CS') || norm.includes('CMA') || norm.includes('PROFESSIONAL') || norm.includes('COMPANYSECRET')) {
    return {
      name: "Professional Accountancy / CS",
      fullName: "Post-Graduate Professional Credentials",
      duration: "Flexible (3 - 5 Years parallel / subsequent)",
      overview: "Highest levels of financial, statutory, legal compliance audits, taxation, and judicial advisory inside corporate systems.",
      eligibility: "Clearing intermediate stages, graduation helps with direct entry.",
      specializations: ["Chartered Accountancy (ICAI)", "Company Secretaryship (ICSI)", "Cost & Management Accounting (CMA)", "Global Association of Chartered Accountants (ACCA)"],
      topColleges: ["Official Certification Institutes of India (ICAI, ICSI, ICAI-CMA)"],
      careerProspects: ["Statutory Auditor", "Legal Compliance Officer", "Corporate Legal Counsel", "CFO / Director of Audits"],
      salaryBoost: "Excellent starting options and top corporate advisory roles ranging from ₹10 Lakhs - ₹30 Lakhs per annum."
    };
  }

  if (norm.includes('MEC') || norm.includes('ECONOM')) {
    return {
      name: "MA / M.Sc Economics",
      fullName: "Master of Arts / Master of Science in Analytical Economics",
      duration: "2 Years",
      overview: "Rigorous quantitative and policy-driven master course. Focuses on macroeconomic indicators, advanced econometrics models, behavioral markets, and public finance solutions.",
      eligibility: "BA Economics, B.Sc Mathematics / Statistics, or B.Com with heavy computational background.",
      specializations: ["Applied Econometrics", "Financial Economics & Forecasting", "Development Policy & Public Economics", "Environmental Economics"],
      topColleges: ["Delhi School of Economics (DSE)", "Indira Gandhi Institute of Development Research (IGIDR) Mumbai", "Madras School of Economics (MSE)", "SJU Bangalore"],
      careerProspects: ["Market Strategist", "Government Policy Researcher", "Data Consultant / Investment Scribe", "Developmental Economist"],
      salaryBoost: "Averages excellent packages of ₹8.5 Lakhs - ₹22 Lakhs per annum."
    };
  }

  if (norm.includes('LLM') || norm.includes('LAW')) {
    return {
      name: "LL.M. Specialist",
      fullName: "Master of Laws",
      duration: "1 to 2 Years",
      overview: "An advanced academic legal program designed to master specific laws like intellectual property rights, digital cybersecurity, corporate litigation, or international commercial laws.",
      eligibility: "3-Year LLB or 5-Year Integrated LLB from a Bar Council recognized university with CLAT-PG or related indices.",
      specializations: ["Corporate & Commercial Law", "Intellectual Property Rights (IPR)", "Cyber & Digital Technology Law", "Constitutional & Administrative Law"],
      topColleges: ["NLSIU Bangalore", "Nalsar Hyderabad", "WBNUJS Kolkata", "BMS Law Bangalore"],
      careerProspects: ["Legal Advisor for Tech Firms", "Senior Corporate Counsel", "Judiciary Officer / Arbitrator", "Moot Court Lecturer"],
      salaryBoost: "Corporate legal roles with ₹7.5 Lakhs - ₹18 Lakhs per annum."
    };
  }

  if (norm.includes('POLITI') || norm.includes('PUBLICADMIN') || norm.includes('CIVIL') || norm.includes('UPSC')) {
    return {
      name: "MA Political Science / IR / Civil Prep",
      fullName: "Master of Arts in Political Science, Public Policy & International Relations",
      duration: "2 Years",
      overview: "Delves into modern geopolitical systems, comparative governance, foreign policies, diplomatic models, and high-level civil services preparation parameters.",
      eligibility: "Any graduate in humanity, commerce or science with strong current affairs awareness.",
      specializations: ["International Relations & Diplomacy", "Public Policy Analysis", "Comparative Democratic Systems", "Administrative Theories"],
      topColleges: ["JNU New Delhi", "Delhi University", "TISS Mumbai (Public Policy)", "SJU Bangalore"],
      careerProspects: ["Diplomatic Attache", "Policy Officer in NGOs", "Legislative Scribe / Researcher", "IAS / State Officer (subsequent to UPSC)"],
      salaryBoost: "Government scale or NGO packages starting around ₹5.0 Lakhs - ₹12 Lakhs per annum."
    };
  }

  if (norm.includes('JOURNAL') || norm.includes('MEDIA') || norm.includes('PR') || norm.includes('COMMUNICATION')) {
    return {
      name: "MA Journalism / Mass Comm",
      fullName: "Master of Arts in Journalism, Mass Communication & PR",
      duration: "2 Years",
      overview: "Focuses on strategic branding campaigns, advanced print & broadcast journalism, digital video cinematography, ethics of global media, and corporate PR frameworks.",
      eligibility: "Any bachelor's degree with a talent for storytelling, communication, or writing.",
      specializations: ["Digital & New Media Scribing", "Public Relations & Brand Strategy", "Television Production & Broadcasting", "Investigative Journalism"],
      topColleges: ["Indian Institute of Mass Communication (IIMC) New Delhi", "IIJNM Bangalore", "Symbiosis Institute Pune", "Christ University Bengaluru"],
      careerProspects: ["News anchor / sub-editor", "Corporate Communications Lead", "PR Account Director", "Social Platform Executive"],
      salaryBoost: "Packages spanning from ₹5.0 Lakhs - ₹14 Lakhs per annum."
    };
  }

  if (norm.includes('SOCIOLOG') || norm.includes('SOCIALWORK') || norm === 'MSW') {
    return {
      name: "MSW / MA Sociology",
      fullName: "Master of Social Work / Master of Arts in Sociology",
      duration: "2 Years",
      overview: "A professional field-work oriented master's curriculum targeting community rehabilitation, corporate social responsibility (CSR) auditing, psychiatric social counseling, and socio-developmental projects.",
      eligibility: "Bachelor's degree in Social Sciences, BSW, or any graduate with a commitment to community transformation.",
      specializations: ["Medical-Psychiatric Social Work", "Corporate Social Responsibility (CSR) & HR", "Child & Family Development", "Community Development"],
      topColleges: ["TISS Mumbai", "Roshni Nilaya Mangaluru", "SJU Bangalore", "Madras School of Social Work"],
      careerProspects: ["CSR Operations Manager", "Psychiatric Counselor", "NGO Program Director", "Social Impact Consultant"],
      salaryBoost: "Excellent modern packages of ₹5.5 Lakhs - ₹12 Lakhs per annum in large corporations (CSR)."
    };
  }

  if (norm.includes('ENGLIS')) {
    return {
      name: "MA English",
      fullName: "Master of Arts in English Literature & Communications",
      duration: "2 Years",
      overview: "Explores advanced linguistic histories, global prose analysis, gender-neutral literature, digital media copy designs, and creative storytelling theories.",
      eligibility: "BA in English Literature or any graduate with strong verbal/composition indices.",
      specializations: ["Post-Colonial Literature", "Professional Writing & Editing", "Gender & Cultural Studies", "Theoretical Criticism"],
      topColleges: ["EFL University Hyderabad", "JNU New Delhi", "SJU Bangalore", "Christ University"],
      careerProspects: ["Senior Content Strategist", "Editorial Chief / Publisher", "Linguistics Advisor", "Corporate Scribe Lead"],
      salaryBoost: "Valued communication leads securing ₹5.0 Lakhs - ₹12 Lakhs per annum."
    };
  }

  if (norm.includes('PSYCHOLOG')) {
    return {
      name: "M.Sc Clinical / Counseling Psychology",
      fullName: "Master of Science in Clinical and Applied Psychology",
      duration: "2 Years",
      overview: "Deeply investigates neuropsychology protocols, abnormal clinical therapy, psychometric measurements, adolescent counselors, and mental wellness rehabilitation programs.",
      eligibility: "B.Sc/BA in Psychology with laboratory work components.",
      specializations: ["Clinical Psychology (Licensed therapist)", "Counseling and Career Psychology", "Organizational & Workplace Psychology", "Neuropsychological diagnostics"],
      topColleges: ["NIMHANS Bangalore (M.Phil / specialized MSc)", "SJU Bangalore", "Christ University Bangalore", "Delhi University"],
      careerProspects: ["Clinical Psychologist (Hospitals/Practices)", "Corporate Behavioral Wellness Consultant", "Career Counselor Trainer", "Special Needs Specialist"],
      salaryBoost: "Invaluable modern sector securing ₹6.0 Lakhs - ₹15 Lakhs per annum, scaling up with personal consultancies."
    };
  }

  // Fallback for PG details
  return {
    name: pgName,
    fullName: `Master's Specialization in ${pgName}`,
    duration: "2 Years",
    overview: `An advanced post-graduate program to specialize in ${pgName}. Prepares scholars for critical research paths, domain-specific technological challenges, or specialized corporate responsibilities.`,
    eligibility: `Relevant bachelor's degree (3 or 4-year undergraduate course) with appropriate merit score/entrance ranks.`,
    specializations: ["Advanced Core Specialization", "Applied Research Practicum", "Strategic Industry Electives", "Multidisciplinary Capstone"],
    topColleges: ["Christ University Bangalore", "St. Joseph's University Bangalore", "Mount Carmel College Bengaluru", "SJC Bangalore"],
    careerProspects: ["Senior Subject Specialist", "Domain Expert / Researcher", "Industry Consultant", "Lecturer"],
    salaryBoost: "Typically boosts starting salary with an additional premium of ₹3 Lakhs to ₹8 Lakhs over undergraduate roles."
  };
}

function getDiplomaDetails(subjectName: string) {
  const norm = subjectName.toLowerCase().trim();

  // 1. COMPUTER SCIENCE / IT
  if (norm.includes('computer science') || norm.includes('cse') || norm.includes('it engineering') || norm.includes('information technology') || norm.includes('ai & machine learning') || norm.includes('artificial intelligence')) {
    return {
      careerPaths: [
        {
          title: "Junior Software Developer",
          scope: "Focuses on core engineering practices: writing modular code, conducting Unit Tests, debugging software blocks, and supporting database schema deployments under senior supervision.",
          skills: ["HTML5, CSS3, & Modern React", "JavaScript, Python, or Java Basics", "Version Control with Git & GitHub", "SQL Database Queries & CRUD Operations", "SDLC & Agile Scrum Methodology"],
          sectors: ["Global IT Consultation Giants (TCS, Wipro, Infosys)", "E-Commerce Delivery Technical Hubs", "Fast-Growth Regional Software Startups", "Government Digital Transformation Departments"],
          growth: ["Senior Fullstack Engineer", "Technical Scrum Lead", "Cloud Architect", "VP of Engineering"],
          salary: "₹3.5 Lakhs - ₹7.0 Lakhs per annum",
          upskilling: [
            { name: "Full Stack Development Bootcamps", details: "MERN/Next.js specialty certs" },
            { name: "AWS Certified Cloud Practitioner", details: "Core deployment skills" },
            { name: "Oracle SQL Expert Certification", details: "Database performance tuning" }
          ]
        },
        {
          title: "Database Associate In-charge",
          scope: "A crucial role maintaining corporate servers: administering database partitions, monitoring access tables, securing data lakes, and troubleshooting querying bottlenecks.",
          skills: ["Relational Algebra & Advanced SQL", "PostgreSQL / MySQL Administration", "Backup & Restore Procedures", "Data Warehousing Basics", "Cloud Database Storage Management"],
          sectors: ["National Banking & Financial Institutions", "E-commerce & Logistics Operations Centers", "Government Data Archives & Registries", "Data Storage Centers"],
          growth: ["Senior Database Administrator (DBA)", "Data Engineer Lead", "Big Data Architect", "Director of Business Intelligence"],
          salary: "₹3.2 Lakhs - ₹6.2 Lakhs per annum",
          upskilling: [
            { name: "PostgreSQL Professional Administrator", details: "Advanced clustering & replicas" },
            { name: "Google Cloud Professional Data Engineer", details: "BigQuery and Dataflow skills" },
            { name: "MongoDB Certified Developer Associate", details: "NoSQL and document store schema design" }
          ]
        },
        {
          title: "Web Operations Specialist",
          scope: "Oversees local web application deployments: coordinating hosting environments, administering web server configurations, and resolving front-end accessibility constraints.",
          skills: ["Nginx & Apache Web Server Basics", "Linux Shell Scripting & Command Line", "DNS Configurations & SSL Certificate Install", "Core HTML/CSS and Web Performance Metrics", "SEO & Analytics Integrations"],
          sectors: ["Digital Marketing & Web Agencies", "Enterprise Web Operations Units", "Media & E-publishing Platforms", "E-learning Portal Operators"],
          growth: ["Web Infrastructure Manager", "Site Reliability Engineer (SRE)", "Head of Technical SEO & Web Ops"],
          salary: "₹2.8 Lakhs - ₹5.5 Lakhs per annum",
          upskilling: [
            { name: "Linux Professional Institute Certification (LPIC-1)", details: "System administration" },
            { name: "Cloudflare Certified Associate", details: "Content delivery and CDN edge caching" },
            { name: "Google Analytics Individual Qualification", details: "Advanced web analytics" }
          ]
        },
        {
          title: "Technical Support Associate",
          scope: "Acts as the key bridge resolving customer problems: diagnosing software runtime failures, tracking active tickets, configuring operating systems, and coordinating escalations.",
          skills: ["OS Diagnostics (Windows/Linux/macOS)", "Network Routing Protocols & Wi-Fi Triaging", "SaaS & Cloud Software Basics", "Helpdesk Ticketing Platforms (Jira/Zendesk)", "Empathy & High-Clarity Tech Communication"],
          sectors: ["Global BPO & Tech Support Centers", "Corporate Internal IT Desks", "Telecom & ISP Operations", "Hospitality Tech Providers"],
          growth: ["IT Operations Manager", "Helpdesk Team Lead", "Director of IT Support"],
          salary: "₹2.5 Lakhs - ₹5.0 Lakhs per annum",
          upskilling: [
            { name: "CompTIA A+ Certification", details: "Hardware & OS foundations" },
            { name: "ITIL Foundation Certification", details: "IT Service Management best practices" },
            { name: "Cisco Certified Network Associate (CCNA)", details: "Core routing & switching" }
          ]
        }
      ],
      timeline: {
        step1: { title: "Core Technical Diploma & Lab Skills", desc: "Master fundamental diploma theory, execute industrial laboratory experiments, and build a foundational project portfolio." },
        step2: { title: "Lateral Entry to B.Tech Degree", desc: "Secure direct admission to the 2nd year (3rd semester) of professional Bachelor of Technology programs (B.Tech) via state exams." },
        step3: { title: "Post-Graduate Specialization (M.Tech)", desc: "Advance through specialized Master’s programs in Data Science, AI, Cloud, or Cyber Security to achieve domain mastery." },
        step4: { title: "Architectural & Executive Leadership", desc: "Lead large-scale technological infrastructures as a Software Architect, Data Specialist, or CTO." }
      },
      exams: {
        entrance: [
          { name: "State Common Entrance Test (DCET)", details: "Primary gateway for diploma holders to secure lateral entry seats in elite government and private engineering colleges.", link: "cetonline.karnataka.gov.in" },
          { name: "BITSAT / Lateral Admission Review", details: "Specialized direct admission review conducted by premier institutes for outstanding diploma scorers." }
        ],
        govt: [
          { name: "SSC Junior Engineer (JE) - IT Track", details: "Central government board recruitment exam offering highly secured permanent engineering posts." },
          { name: "State Informatics Officer Screening", details: "Regional public service exams recruiting tech administrators for municipal, police, and regional web grids." }
        ]
      },
      syllabus: ["Programming in C/C++", "Data Structures & Algorithms", "Computer Networks & Internet", "Database Management Systems", "Operating Systems", "Software Engineering", "Web Technologies", "Microprocessors & Interfacing", "Java Programming", "Object Oriented Programming"]
    };
  }

  // 2. AUTOMATION / ROBOTICS / MECHATRONICS / AERONAUTICAL / AUTOMOBILE / MECHANICAL
  if (norm.includes('mechanical') || norm.includes('mechatronics') || norm.includes('robotics') || norm.includes('automobile') || norm.includes('aeronautical') || norm.includes('aero') || norm.includes('civil') || norm.includes('electrical') || norm.includes('electronics') || norm.includes('chemical')) {
    // Determine specific labels based on matches
    let role1 = "Junior Technical Design Specialist";
    let role2 = "Plant Automation Supervisor";
    let role3 = "Quality Assurance Auditor";
    let role4 = "Maintenance & Site In-charge";
    
    if (norm.includes('civil')) {
      role1 = "Structural CAD Drafter";
      role2 = "Civil Site Supervisor";
      role3 = "Building Material Quality Inspector";
      role4 = "Surveying & Quantity Estimator";
    } else if (norm.includes('automobile')) {
      role1 = "Vehicle Design Associate";
      role2 = "Automotive Diagnostics Lead";
      role3 = "Emission & Safety Inspector";
      role4 = "Fleet Maintenance Manager";
    } else if (norm.includes('robotics') || norm.includes('mechatronics')) {
      role1 = "Robotic System Integrator";
      role2 = "Automation PLC Programmer";
      role3 = "Sensor Calibration Lead";
      role4 = "Industrial Robotics Technician";
    } else if (norm.includes('aeronautical')) {
      role1 = "Aircraft Structures Associate";
      role2 = "Avionics Maintenance Technician";
      role3 = "Aerodynamic Quality Inspector";
      role4 = "Propulsion Systems Lead";
    } else if (norm.includes('electrical') || norm.includes('electronics')) {
      role1 = "Electrical Panel Designer";
      role2 = "Power Grid Substation Assistant";
      role3 = "Circuit Diagnostics Inspector";
      role4 = "Embedded Systems Developer";
    }

    return {
      careerPaths: [
        {
          title: role1,
          scope: `Focuses on core engineering layout drafting, structural checking, and technical CAD configurations. Converts conceptual design blueprints into precision-scaled technical models for immediate plant manufacturing or site construction.`,
          skills: ["2D AutoCAD & 3D SolidWorks / CATIA", "Drafting Tolerance & Geometric Dimensioning", "Material Stress & Strength Calculations", "Technical Blueprint Symbol Analytics", "Compliance with National Engineering Standards"],
          sectors: ["Heavy Machinery Production Plants", "Automotive & Aerospace OEM Design Centers", "Infrastructure Construction Agencies", "Defense Research & PSU Workshops"],
          growth: ["Lead Design Architect", "CAD Operations Manager", "Director of Research & Development"],
          salary: "₹3.2 Lakhs - ₹6.5 Lakhs per annum",
          upskilling: [
            { name: "Professional CAD/CAM Certification", details: "Advanced surfaces & multi-axis toolpaths" },
            { name: "Geometric Dimensioning & Tolerancing (GD&T) Expert", details: "Industrial precision alignment standard" },
            { name: "Ansys Structural Simulation License", details: "Stress & FEA simulation modules" }
          ]
        },
        {
          title: role2,
          scope: `Oversees on-floor technical operations: administering automated assembly line units, programming PLC sequences, resolving mechanical and electrical alignment errors, and guaranteeing optimal daily output metrics.`,
          skills: ["PLC & SCADA Programming Basics", "Pneumatics & Hydraulics Actuation", "Preventive Machinery Maintenance Schedules", "Occupational Health & Safety (OSHA) Norms", "KPI Tracking & Team Shift Leadership"],
          sectors: ["Automated Beverage & FMCG Packing Plants", "Automotive Assembly Conveyor Plants", "Pharma Production Cleanrooms", "Metal & Alloy Smelting Plants"],
          growth: ["Plant Operations Director", "Maintenance In-charge", "General Manager (Production)"],
          salary: "₹3.0 Lakhs - ₹6.0 Lakhs per annum",
          upskilling: [
            { name: "Advanced Siemens/Allen-Bradley PLC Cert", details: "Network and analog signal diagnostics" },
            { name: "Lean Six Sigma Green Belt", details: "Waste reduction and manufacturing optimization" },
            { name: "ISO 9001 Quality Management Standards", details: "Core audit and compliance training" }
          ]
        },
        {
          title: role3,
          scope: `Responsible for maintaining extreme material standards: inspecting physical tolerances with precision instruments, verifying safety compliance, administering quality control checklists, and writing defect review logs.`,
          skills: ["Vernier Callipers, Micrometers & CMM", "Destructive & Nondestructive Testing (NDT)", "Statistical Process Control (SPC) Basics", "Regulatory Safety Compliance Directives", "Defect Root-Cause Troubleshooting"],
          sectors: ["Aviation Maintenance, Repair & Overhaul (MRO)", "Automotive Quality Assurance Divisions", "High-Rise Steel Structural Construction Projects", "Precision Instrument Laboratories"],
          growth: ["Chief Quality Auditor", "Director of Regulatory Compliance", "Technical Advisory Consultant"],
          salary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
          upskilling: [
            { name: "ASNT NDT Level-II Certification", details: "Ultrasonic, magnetic, & radiographic testing" },
            { name: "Certified Quality Inspector (CQI)", details: "American Society for Quality (ASQ) standards" },
            { name: "Welding inspector credentials (AWS-CWI)", details: "High-spec weld validation certifications" }
          ]
        },
        {
          title: role4,
          scope: `Maintains system uptime: coordinating daily diagnostic checks, replacing worn mechanical assemblies, repairing faulty circuits, and running emergency restore operations to prevent costly operational downtime.`,
          skills: ["Preventive & Corrective Maintenance", "Root Cause Analysis (RCA)", "Electrical Wiring & System Integration", "Lubrication & Vibration Monitoring", "Heavy Rigging & Equipment Installation"],
          sectors: ["Metro Rail & Public Transport Corporations", "Regional Electrical Sub-stations & Power Grids", "Large Commercial Estates & Airports", "Commercial Marine Vessel Operations"],
          growth: ["Chief Maintenance Engineer", "Site Infrastructure Director", "EHS Compliance Lead"],
          salary: "₹2.6 Lakhs - ₹5.5 Lakhs per annum",
          upskilling: [
            { name: "Industrial Safety (OSHA) Licenses", details: "General industry safety norms" },
            { name: "Vibration Analyst Category-I Certification", details: "Rotational machinery health monitoring" },
            { name: "HVAC & Commercial Chiller Specialization", details: "Climate control system configurations" }
          ]
        }
      ],
      timeline: {
        step1: { title: "Technical Apprenticeship & Shop Skills", desc: "Hone practical execution fluency by writing lab journals, executing CNC lathe calibrations, and taking plant training." },
        step2: { title: "Lateral Entry to B.E./B.Tech Degree", desc: "Enroll directly into the 2nd year of professional Engineering programs (B.E./B.Tech) via state-level lateral entry tests." },
        step3: { title: "Advanced M.E./M.Tech Specialization", desc: "Advance into micro-architectures, aerodynamics simulation, autonomous systems, or thermal designs at the Master’s level." },
        step4: { title: "Peak Industrial Operations & Leadership", desc: "Direct massive manufacturing operations, command multi-million dollar engineering fleets, or serve as Chief Architect/VP Operations." }
      },
      exams: {
        entrance: [
          { name: "State Common Entrance Test (DCET)", details: "Enables direct admission into the 2nd year of engineering degree programs (Lateral entry).", link: "cetonline.karnataka.gov.in" },
          { name: "State/Institutional B.Tech Screenings", details: "Specialized direct admission tests held by elite technical institutions for diploma graduates." }
        ],
        govt: [
          { name: "SSC Junior Engineer (JE)", details: "Massive annual recruitment exam for permanent JE posts in Railways, PWD, and military engineering services.", link: "ssc.nic.in" },
          { name: "State Power Grid Operator Examination", details: "Direct local government recruitment screening for grid safety and substation administration engineers." }
        ]
      },
      syllabus: ["Engineering Mathematics", "Applied Mechanics", "Engineering Drawing", "Workshop Practice", "Mechanical Engineering Drawing", "Strength of Materials", "Thermal Engineering", "Manufacturing Processes", "Theory of Machines", "Design of Machine Elements"]
    };
  }

  // 3. HOTEL MANAGEMENT & CATERING / FOOD PRODUCTION
  if (norm.includes('hotel') || norm.includes('catering') || norm.includes('food') || norm.includes('front office') || norm.includes('bakery') || norm.includes('housekeeping')) {
    return {
      careerPaths: [
        {
          title: "Resort supervisor",
          scope: "A highly specialized professional career role focusing on core execution competencies as a Resort supervisor. Equips students with hands-on industrial skills, equipment/tool mastery, and commercial services management.",
          skills: ["Advanced Resort supervisor Procedures", "Safety & Regulatory Compliance", "Client & Vendor Coordination", "Diagnostic & Troubleshooting Skills", "Service Quality Auditing"],
          sectors: ["Leading Industry Service Providers", "Corporate Maintenance Divisions", "Specialized Sourcing Agencies", "Private Sector Contracting Firms"],
          growth: ["Senior Resort supervisor", "Team Shift Lead", "Technical Operations Supervisor", "Independent Contracting Specialist"],
          salary: "₹2.5 Lakhs - ₹6.5 Lakhs per annum",
          upskilling: [
            { name: "Advanced Technical Certifications", details: "Frontline management standards" },
            { name: "Industrial Safety (OSHA) Licenses", details: "Workplace hazard protocols" },
            { name: "Small Business Management Programs", details: "Enterprise scale and operations" }
          ]
        },
        {
          title: "Hotel operations manager",
          scope: "Directs complete hospitality service lines: coordinating frontline reception workflows, managing guest experience standards, auditing room inventories, and ensuring high service excellence.",
          skills: ["Property Management Systems (PMS)", "Guest Relation Standards", "Room Inventory Audits", "Staff Scheduling & Training", "Budgeting & Financial Tracking"],
          sectors: ["Five-Star Luxury Hotels & Resorts", "Global Cruise Ship Accommodations", "Corporate Executive Guest Houses", "Boutique Wellness Retreats"],
          growth: ["Front Office Director", "Resident Manager", "General Manager (Hotel Operations)"],
          salary: "₹3.0 Lakhs - ₹7.0 Lakhs per annum",
          upskilling: [
            { name: "CHIA (Certification in Hotel Industry Analytics)", details: "Hotel business analytics and data trends" },
            { name: "Hospitality Sales Professional Certification", details: "Revenue management and conversion models" },
            { name: "Certified Hospitality Supervisor (CHS)", details: "American Hotel & Lodging Educational Institute (AHLEI) standard" }
          ]
        },
        {
          title: "Catering Executive",
          scope: "Manages large-scale food production operations: supervising industrial kitchens, optimizing supply chains, auditing food safety compliance, and directing menu presentation for banquets.",
          skills: ["Large-Scale Food Preparation", "HACCP & Food Safety Compliance", "Kitchen Staff Management", "Raw Material Sourcing & Costing", "Banqueting & Event Coordination"],
          sectors: ["Corporate Catering Agencies", "Luxury Event & Wedding Venues", "Airports & Flight Kitchens", "Educational & Medical Campus Kitchens"],
          growth: ["F&B Manager", "Director of Catering", "Independent F&B Entrepreneur"],
          salary: "₹2.8 Lakhs - ₹6.2 Lakhs per annum",
          upskilling: [
            { name: "ServSafe Manager Certification", details: "Global gold-standard for food safety" },
            { name: "Culinary Arts & Nutrition Diploma", details: "Advanced menu planning and dietary standards" },
            { name: "Event Management Professional Certificate", details: "Coordination of large scale catering assemblies" }
          ]
        },
        {
          title: "Guest operations lead",
          scope: "Ensures seamless guest journeys: overseeing VIP concierge protocols, administering loyalty programs, resolving escalated complaints, and coordinating with housekeeping and dining departments.",
          skills: ["Interpersonal & Communication Mastery", "Conflict Resolution & Complaint Triaging", "VIP Guest Protocols", "Customer Relationship Management (CRM) Tools", "Cross-Departmental Coordination"],
          sectors: ["Luxury Urban Hotels", "Aviation First-Class Lounges", "Premium Service Apartments", "Exclusive Corporate Clubs"],
          growth: ["Guest Relations Director", "Executive Club Lounge Manager", "Chief Concierge (Les Clefs d'Or)"],
          salary: "₹2.5 Lakhs - ₹5.8 Lakhs per annum",
          upskilling: [
            { name: "Customer Experience Management (CEM) Cert", details: "Modern guest journey mapping and NPS tracking" },
            { name: "Intercultural Etiquette & Protocol Certification", details: "Global communication standards for VIP clients" },
            { name: "Concierge Professional Excellence Training", details: "Luxury service benchmarks" }
          ]
        }
      ],
      timeline: {
        step1: { title: "Hospitality Operational Fundamentals", desc: "Gain hands-on experience in frontline hospitality operations, kitchen services, and professional grooming standards." },
        step2: { title: "Lateral Entry to Bachelor's Degree", desc: "Pursue full-scale management degrees (BHM/B.Sc Hospitality) to qualify for advanced executive hospitality roles." },
        step3: { title: "Master’s in Hotel/Tourism Management", desc: "Master high-end resort management, event planning, or international hospitality standards (MBA/Masters)." },
        step4: { title: "Peak Hospitality Executive Career", desc: "Managing five-star global hotels, directing international catering chains, or leading luxury resort operations." }
      },
      exams: {
        entrance: [
          { name: "NCHMCT JEE", details: "National Level Entrance exam for securing admission into the prestigious central Institutes of Hotel Management (IHMs).", link: "nchmct.org" },
          { name: "Institutional Selection Panels", details: "Direct interview rounds assessing verbal agility, grooming standards, and behavioral skills." }
        ],
        govt: [
          { name: "Railway Catering Superintendent Screening", details: "National test recruiting executive catering administrators for high-speed train networks." },
          { name: "Government Guest House Supervisor Exams", details: "Regional public service assessments for managing ministerial and VVIP residential complexes." }
        ]
      },
      syllabus: ["Food Production Operations", "Food and Beverage Service Operations", "Front Office Management", "Housekeeping Operations", "Hotel Accountancy", "Food Science & Nutrition", "Tourism Marketing", "Communication Skills", "Computer Applications in Hospitality", "Hotel Law and Ethics"]
    };
  }

  // 4. DESIGN & CREATIVE
  if (norm.includes('design') || norm.includes('animation') || norm.includes('multimedia') || norm.includes('photography') || norm.includes('film') || norm.includes('video') || norm.includes('vfx')) {
    return {
      careerPaths: [
        {
          title: "Creative Design Associate",
          scope: "Focuses on visual storytelling and digital design execution: creating layouts, editing video assets, manipulating graphics, and managing project timelines.",
          skills: ["Adobe Creative Suite", "Visual Composition", "Digital Illustration", "Motion Graphics", "Project Workflow Management"],
          sectors: ["Design Agencies", "Media Houses", "Advertising Firms", "Production Studios"],
          growth: ["Senior Designer", "Art Director", "Creative Lead"],
          salary: "₹2.5 Lakhs - ₹5.0 Lakhs per annum",
          upskilling: [{ name: "Professional Design Certs", details: "Advanced Adobe/AutoCAD" }]
        },
        {
          title: "UI/UX Design Assistant",
          scope: "Focuses on user interface layouts, prototyping digital experiences, conducting user research, and ensuring seamless web/app navigations.",
          skills: ["Figma/Adobe XD", "Wireframing", "User Research", "Prototyping", "Basic CSS/HTML"],
          sectors: ["Tech Startups", "E-commerce Platforms", "IT Services", "Design Consultancies"],
          growth: ["UI/UX Designer", "Product Designer", "UX Lead"],
          salary: "₹3.0 Lakhs - ₹5.5 Lakhs per annum",
          upskilling: [{ name: "UI/UX Certification", details: "Google UX Design or specialized bootcamps" }]
        }
      ],
      timeline: {
        step1: { title: "Creative Foundation & Portfolio", desc: "Build a strong portfolio showcasing technical and aesthetic skills in design, animation, or multimedia." },
        step2: { title: "Degree Enrollment (B.Des/B.A)", desc: "Enroll in recognized Bachelor of Design (B.Des) or B.A programs via design entrance tests." },
        step3: { title: "Masters (M.Des) & PG Specialization", desc: "Master specific tools and advanced creative domains like VFX, UI/UX, or Animation through PG programs." },
        step4: { title: "Creative Leadership & Art Direction", desc: "Lead design departments, creative ventures, and strategic art direction for top-tier creative agencies." }
      },
      exams: {
        entrance: [{ name: "National/State Design Entrances", details: "NID/CEED/UCEED or university tests.", link: "nid.edu" }],
        govt: [{ name: "Govt. Film & Media Recruitment", details: "Recruitment for government media wings." }]
      },
      syllabus: ["Design Fundamentals", "Visual Communication", "Digital Tools (Adobe)", "Portfolio Development", "Industry Best Practices", "Ethics & Trends", "Capstone Practical Project Work"]
    };
  }

  // 5. AGRICULTURE
  if (norm.includes('agri') || norm.includes('horticulture') || norm.includes('sericulture') || norm.includes('dairy') || norm.includes('farming')) {
    return {
      careerPaths: [
        {
          title: "Agricultural Technician",
          scope: "Focuses on crop management, soil health analysis, and farm technology implementation.",
          skills: ["Crop Production", "Soil Analysis", "Modern Farming Techniques", "Farm Equipment Operation", "Data Management"],
          sectors: ["Farming Organizations", "Agri-tech Firms", "Seed & Fertilizer Companies", "Agricultural Research Stations"],
          growth: ["Farm Manager", "Agricultural Scientist", "Agri-Consultant"],
          salary: "₹2.2 Lakhs - ₹4.5 Lakhs per annum",
          upskilling: [{ name: "Advanced Agri-Technology Certs", details: "Smart Farming" }]
        },
        {
          title: "Agri-Market Consultant",
          scope: "Assists in agricultural marketing, supply chain coordination, and promoting modern agri-business practices.",
          skills: ["Market Analysis", "Supply Chain Management", "Farmer Outreach", "Agri-Business Basics", "Communication"],
          sectors: ["Agri-Marketing Firms", "Cooperatives", "Rural Development NGOs", "Agri-Tech Platforms"],
          growth: ["Agri-Business Manager", "Marketing Strategist", "Market Development Lead"],
          salary: "₹2.5 Lakhs - ₹5.0 Lakhs per annum",
          upskilling: [{ name: "Agri-Business Certification", details: "Modern Agri-Trade Standards" }]
        }
      ],
      timeline: {
        step1: { title: "Field Experience & Farm Basics", desc: "Gain hands-on farm experience, crop production fundamentals, and modern agri-tech implementation skills." },
        step2: { title: "Enroll in Agricultural Degree (B.Sc)", desc: "Enroll in professional B.Sc programs in Agriculture, Horticulture, or related fields for career elevation." },
        step3: { title: "Advanced M.Sc (Agri) & PG Specialization", desc: "Master advanced farming techniques, genetics, agri-business management, and specialized agri-technology." },
        step4: { title: "Lead Agri-Business Operations", desc: "Lead large-scale agricultural projects, research institutes, or agri-tech firm operations at a senior level." }
      },
      exams: {
        entrance: [{ name: "State Agricultural University Entrance", details: "Tests for admission into agricultural colleges.", link: "icar.org.in" }],
        govt: [{ name: "Agriculture Officer Recruitment", details: "Government recruitment for agricultural roles." }]
      },
      syllabus: ["Fundamentals of Agriculture", "Crop Production Techniques", "Horticulture Basics", "Farm Management", "Soil & Water Conservation", "Pest & Disease Management", "Sustainable Farming Practices"]
    };
  }

  // 6. MEDICAL & HEALTH
  if (norm.includes('pharm') || norm.includes('nurse') || norm.includes('patient care')) {
    return {
      careerPaths: [
        {
          title: "Health Care Assistant",
          scope: "Provides essential patient support, assists in clinical procedures, and manages basic medical documentation.",
          skills: ["Patient Monitoring", "Basic Medical Care", "Clinical Assistance", "Health Records Management", "Patient Empathy"],
          sectors: ["Hospitals", "Nursing Homes", "Home Care Agencies", "Diagnostic Centers"],
          growth: ["Senior Nurse/Practitioner", "Health Care Supervisor", "Clinic Manager"],
          salary: "₹2.0 Lakhs - ₹4.0 Lakhs per annum",
          upskilling: [{ name: "Professional Nursing/Pharmacy Certs", details: "Advanced Health Protocols" }]
        },
        {
          title: "Pharmacy Inventory Specialist",
          scope: "Manages pharmaceutical stocks, monitors medicine expiry, assists in dispensing, and maintains digital pharmacy records.",
          skills: ["Drug Identification", "Inventory Management", "Dispensing Procedures", "Medical Records", "Attention to Detail"],
          sectors: ["Retail Pharmacies", "Hospital Pharmacies", "Drug Distribution Centers", "Health Clinics"],
          growth: ["Pharmacy Manager", "Clinical Assistant", "Supply Chain Lead"],
          salary: "₹2.2 Lakhs - ₹4.2 Lakhs per annum",
          upskilling: [{ name: "Pharmacy Inventory Management Cert", details: "Supply Chain & Safety" }]
        }
      ],
      timeline: {
        step1: { title: "Clinical Apprenticeship & Basic Care", desc: "Gain practical experience in clinical, pharmacy, or nursing settings under certified health professionals." },
        step2: { title: "Lateral Entry to Degree (B.Sc/B.Pharm)", desc: "Enroll in professional degree programs like B.Sc Nursing or B.Pharm for clinical practitioner status." },
        step3: { title: "Advanced M.Sc / Masters in Pharmacy", desc: "Master specialized medical, pharmaceutical, or nursing practices through advanced PG specializations." },
        step4: { title: "Health Facility Leadership", desc: "Direct healthcare facilities, pharmacy chains, or specialized nursing departments as a Chief Clinical Officer." }
      },
      exams: {
        entrance: [{ name: "Nursing/Pharmacy Common Entrance", details: "Standard entrance tests for health programs.", link: "nta.ac.in" }],
        govt: [{ name: "Govt. Health Department Screening", details: "Government health sector recruitments." }]
      },
      syllabus: ["Foundations of Healthcare", "Patient Care Principles", "Anatomy & Physiology Basics", "Basic Nursing/Pharmacy Techniques", "Health Records & Ethics", "Emergency Procedures", "Clinical Lab Practices"]
    };
  }

  // 7. TOURISM & HOSPITALITY
  if (norm.includes('tour') || norm.includes('travel') || norm.includes('hospitality')) {
    return {
      careerPaths: [
        {
          title: "Tourism & Travel Associate",
          scope: "Manages travel itineraries, customer bookings, airport support, and hospitality service standards.",
          skills: ["Itinerary Planning", "Customer Service", "Booking Systems", "Communication Skills", "Problem Solving"],
          sectors: ["Travel Agencies", "Hotels", "Airports", "Tourism Boards"],
          growth: ["Tourism Manager", "Hospitality Operations Manager", "Travel Consultant"],
          salary: "₹2.2 Lakhs - ₹4.5 Lakhs per annum",
          upskilling: [{ name: "Travel Management Certification", details: "Advanced Hospitality & Tourism" }]
        },
        {
          title: "Travel Operations Planner",
          scope: "Plans and executes travel logistics, supports group travel, manages travel vendors, and coordinates travel support services.",
          skills: ["Logistics Planning", "Vendor Management", "Travel Coordination", "Customer Support", "Crisis Management"],
          sectors: ["Travel Agencies", "Corporate Travel Desks", "Event Planning Firms", "Travel Tech"],
          growth: ["Operations Planner", "Travel Coordinator", "Logistics Lead"],
          salary: "₹2.5 Lakhs - ₹4.8 Lakhs per annum",
          upskilling: [{ name: "Travel Operations Certificate", details: "Logistics & Planning" }]
        }
      ],
      timeline: {
        step1: { title: "Hospitality Internship", desc: "Learn travel and hospitality operations." },
        step2: { title: "Direct Lateral Entry Degree", desc: "Enroll in BHM or B.Sc (Tourism/Hospitality) programs." },
        step3: { title: "Advanced PG Specializations", desc: "Master luxury resort management and global tourism standards." },
        step4: { title: "Lead Tourism Operations", desc: "Direct hotel and tourism companies." }
      },
      exams: {
        entrance: [{ name: "Hospitality Management Common Entrance", details: "Tests for hospitality programs.", link: "nchmct.org" }],
        govt: [{ name: "Tourism Department Recruitments", details: "Govt. tourism board recruitment." }]
      },
      syllabus: ["Tourism Foundations", "Hospitality Management Principles", "Customer Relations & Service", "Booking & Reservation Systems", "Travel Itinerary Planning", "Ethics & Cultural Awareness", "Capstone Project"]
    };
  }

  // 8. SAFETY & ENGINEERING
  if (norm.includes('safety') || norm.includes('industrial') || norm.includes('disaster') || norm.includes('environmental')) {
    return {
      careerPaths: [
        {
          title: "Safety Specialist Assistant",
          scope: "Implements industrial safety protocols, monitors environmental compliance, and assists in disaster management strategies.",
          skills: ["Safety Auditing", "Disaster Prevention", "Hazard Assessment", "Report Generation", "Policy Enforcement"],
          sectors: ["Manufacturing Plants", "Infrastructure Projects", "Government Safety Wings", "Environmental Agencies"],
          growth: ["Safety Officer", "EHS Manager", "Disaster Management Specialist"],
          salary: "₹2.5 Lakhs - ₹5.5 Lakhs per annum",
          upskilling: [{ name: "Advanced Safety Certs", details: "NEBOSH/OSHA Standards" }]
        },
        {
          title: "Environmental Compliance Specialist",
          scope: "Ensures projects meet environmental safety regulations, conducts impact assessments, and reports on compliance metrics.",
          skills: ["Environmental Assessment", "Regulatory Reporting", "Compliance Monitoring", "Impact Analysis", "Data Collection"],
          sectors: ["Environmental Agencies", "Construction Projects", "Government Safety Wings", "Industrial Compliance"],
          growth: ["Environmental Officer", "Compliance Manager", "Consulting Specialist"],
          salary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
          upskilling: [{ name: "Environmental Management Cert", details: "Regulation Compliance" }]
        }
      ],
      timeline: {
        step1: { title: "Industrial Safety Training", desc: "Learn core safety protocols, hazard identification, and industrial compliance basics through practical training." },
        step2: { title: "Lateral Entry to B.E./B.Sc Degree", desc: "Enroll in professional degree programs like B.E. or B.Sc in Safety Engineering or Management for career growth." },
        step3: { title: "Advanced M.E./M.Sc Specialization", desc: "Master environmental hazard modeling, disaster management strategies, and advanced safety auditing at PG level." },
        step4: { title: "Safety Leadership & Director Role", desc: "Direct large-scale industrial safety programs, disaster response fleets, and regional EHS compliance strategy." }
      },
      exams: {
        entrance: [{ name: "Safety Management Entrance Exams", details: "Tests for safety-focused degree programs.", link: "aicte.india.org" }],
        govt: [{ name: "Safety Inspector Screenings", details: "Government safety and environmental inspectorate roles." }]
      },
      syllabus: ["Industrial Safety Principles", "Environmental Health & Safety (EHS)", "Hazard Identification & Risk Analysis", "Disaster Management Strategies", "Safety Laws & Regulations", "Documentation & Auditing", "Emergency Response Planning"]
    };
  }

  // 4. DEFAULT FALLBACK GENERATOR
  const capitalizedSubjectName = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);
  return {
    careerPaths: [
      {
        title: `Junior ${capitalizedSubjectName} Specialist`,
        scope: `An immediate professional entry pathway focusing on core technical and administrative execution as a Junior ${capitalizedSubjectName} Associate. Equips students with hands-on industrial skills, equipment/tool mastery, and operational systems management.`,
        skills: [`Advanced ${capitalizedSubjectName} Procedures`, "Safety & Quality Compliance", "Client & Team Coordination", "Technical Problem Solving", "Process & Output Auditing"],
        sectors: ["Premier Industry Service Providers", "Corporate Core Operations Divisions", "Regional Sourcing & Contracting Agencies", "Private Sector Enterprises"],
        growth: [`Senior ${capitalizedSubjectName} Lead`, "Team/Shift Supervisor", "Technical Operations Manager", "Independent Project Specialist"],
        salary: "₹2.5 Lakhs - ₹5.5 Lakhs per annum",
        upskilling: [
          { name: "Advanced Technical Certifications", details: "Professional domain credentials" },
          { name: "Industrial Safety & Standards Licenses", details: "Compliance and safety benchmarks" },
          { name: "Small Business Sourcing & Operations Program", details: "Project scale and execution modules" }
        ]
      },
      {
        title: `${capitalizedSubjectName} Consultant Assistant`,
        scope: `Assists senior consultants in analyzing client requirements, drafting proposal parameters, monitoring active field trials, and preparing detailed regulatory compliance records.`,
        skills: ["Data Documentation & Analysis", "Client Feedback Sourcing", "Local Regulatory Compliances", "Technical Diagnostic Inspections", "Software & Tracker Integration"],
        sectors: ["Advisory & Consultation Agencies", "Corporate Quality Management Wings", "Urban Planning & Sourcing Hubs", "Independent Contracting Firms"],
        growth: ["Lead Technical Advisor", "Consultancy Operations Manager", "Principal Consultant Partner"],
        salary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
        upskilling: [
          { name: "Professional Consulting Foundations Certification", details: "Core problem solving & client management" },
          { name: "Technical Project Management Professional (PMP)", details: "Scope, budget, & timeline controls" },
          { name: "Data-Driven Decisions Certificate", details: "Advanced business informatics and reporting" }
        ]
      },
      {
        title: `Operations Executive (${capitalizedSubjectName})`,
        scope: `Directs daily on-floor systems: supervising technician crews, executing preventive checklists, coordinating material storage pipelines, and generating daily diagnostic health sheets.`,
        skills: ["Operations & Workflows Optimization", "Inventory & Resource Control", "Safety Directive Audits", "Incident Management Protocols", "Crew Shift Scheduling"],
        sectors: ["Multi-site Manufacturing Plants", "Logistics & Supply Chain Integrators", "Central Storage & Distribution Centers", "Public Utility Infrastructure Units"],
        growth: ["Operations Operations Director", "General Manager (Regional Logistics)", "Chief Operational Safety Executive"],
        salary: "₹3.0 Lakhs - ₹6.2 Lakhs per annum",
        upskilling: [
          { name: "Lean Operations & Process Mapping Cert", details: "Efficiency and resource optimization" },
          { name: "Supply Chain Professional Certification (CSCP)", details: "Global distribution & logistics grids" },
          { name: "Advanced Workplace Leadership Program", details: "Personnel management & crisis response" }
        ]
      }
    ],
    timeline: {
      step1: { title: "Practical Apprenticeship", desc: `Hone core field skills, execute diagnostic checks, and compile operational laboratory journals in ${capitalizedSubjectName}.` },
      step2: { title: "Recommended College Degrees", desc: `Transition smoothly into standard professional undergraduate degrees (B.Tech / B.Sc / B.Des) via direct lateral entry paths.` },
      step3: { title: "Advanced PG Specializations", desc: `Gain deep master-level expertise, specialized research credits, and high-performance industry certifications.` },
      step4: { title: `Peak ${capitalizedSubjectName} Leadership`, desc: "Oversee major multinational operations, serve as Chief Technical Director, or run an independent high-yield agency." }
    },
    exams: {
      entrance: [
        { name: "State Level Common Entrance Test (CET)", details: `Primary entrance exam allowing diploma students to bypass secondary boards and join professional degrees directly.`, link: "cetonline.karnataka.gov.in" },
        { name: "National Level Lateral Reviews", details: "Special admissions pathways conducted by top-tier universities for outstanding diploma candidates." }
      ],
      govt: [
        { name: "SSC Technical Cadre Selection", details: "Central government selection board exam offering highly secure permanent supervisor roles in civil bodies." },
        { name: "State Technical Public Services Screening", details: "Local civil services testing recruiting operational directors for district-level utilities." }
      ]
    },
      syllabus: ["Introduction to " + capitalizedSubjectName, "Core Applied Theory", "Methodologies and Toolsets", "Industry Standard Practices", "Safety, Compliance & Ethics", "Research & Documentation Principles", "Capstone Practical Project Work"]
    };
}

export default function StreamsList() {
  const { savedPathways, toggleSavedPathway, isSaved: isPathwaySaved } = useSavedPathways();
  const [selectedStreamId, setSelectedStreamId] = useState<StreamType | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<'science' | 'commerce' | 'arts'>('science');
  const [scoreInput, setScoreInput] = useState<number>(65);
  const [selectedSubject, setSelectedSubject] = useState<{name: string, desc: string, type: 'core' | 'practical' | 'elective'} | null>(null);
  const [activeSubjectTab, setActiveSubjectTab] = useState<'prospects' | 'entrance' | 'govt' | 'syllabus'>('prospects');
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'degrees' | 'entrance' | 'govt'>('degrees');
  const [selectedSubDegree, setSelectedSubDegree] = useState<string | null>(null);
  const [selectedPostGrad, setSelectedPostGrad] = useState<string | null>(null);

  // States for the 110 Specialization Courses Overlay
  const [showSpecializationsModal, setShowSpecializationsModal] = useState<boolean>(false);
  const [specSearchQuery, setSpecSearchQuery] = useState<string>('');
  const [specCategoryFilter, setSpecCategoryFilter] = useState<string>('all');
  const [activeSpecialization, setActiveSpecialization] = useState<SpecializationInfo | null>(null);

  React.useEffect(() => {
    const streamPreset = localStorage.getItem('stream_preset');
    const coursePreset = localStorage.getItem('course_preset');
    
    if (streamPreset) {
      setSelectedStreamId(streamPreset as StreamType);
      localStorage.removeItem('stream_preset');
    }
    
    if (coursePreset) {
      // Find course by name in the stream or across all streams if streamPreset is not set
      const findCourse = (sid: string | null) => {
        if (sid) {
          const stream = STREAMS_DATA.find(s => s.id === sid);
          return stream?.courses.find(c => c.name === coursePreset);
        }
        for (const s of STREAMS_DATA) {
          const c = s.courses.find(course => course.name === coursePreset);
          if (c) return { course: c, streamId: s.id };
        }
        return null;
      };

      const result = findCourse(streamPreset);
      if (result) {
        if ('course' in result) {
          setSelectedStreamId(result.streamId as StreamType);
          setSelectedCourse(result.course);
        } else {
          setSelectedCourse(result);
        }
      }
      localStorage.removeItem('course_preset');
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSubTab('degrees');
    if (selectedCourse && selectedCourse.careerProspects && selectedCourse.careerProspects.length > 0) {
      setSelectedSubDegree(selectedCourse.careerProspects[0]);
    } else {
      setSelectedSubDegree(null);
    }
    setSelectedPostGrad(null);
  }, [selectedStreamId, selectedCourse]);

  React.useEffect(() => {
    setSelectedPostGrad(null);
  }, [selectedSubDegree]);

  React.useEffect(() => {
    setActiveSubjectTab('prospects');
    setSelectedCareerIndex(0);
  }, [selectedSubject]);

  const selectedStream = selectedStreamId 
    ? (STREAMS_DATA.find((s) => s.id === selectedStreamId) || null)
    : null;

  if (selectedCourse) {
    const streamId = selectedStreamId || '12th_intermediate';
    const roadmap = getRoadmapForCourse(selectedCourse.name, streamId);
    const detailData = getSubjectsAndExamsForCourse(selectedCourse.name, streamId);

    if (selectedSubject) {
      const extra = getSubjectFullDetails(selectedSubject.name, selectedSubject.desc, selectedSubject.type);
      const diplomaData = getDiplomaDetails(selectedSubject.name);
      const currentRole = diplomaData.careerPaths[selectedCareerIndex] || diplomaData.careerPaths[0];
      
      return (
        <div id="subject-details-page" className="space-y-8 animate-fade-in font-sans pb-12 text-left">
          {/* Header/Banner with Gradient (No Image) */}
          <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-150 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
            
            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedSubject(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white font-bold text-xs py-1.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm mr-2"
                >
                  ← Back to Courses
                </button>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border ${
                  selectedSubject.type === 'core'
                    ? 'bg-blue-500/20 text-blue-200 border-blue-500/30'
                    : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                }`}>
                  {selectedSubject.type} Division
                </span>
                <span className="bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                  Post-10th {selectedStream?.title || 'Diploma'} Track
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-sans">
                {selectedSubject.name}
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl font-sans">
                {selectedSubject.desc}
              </p>
            </div>
          </div>

          {/* Career & Higher Education Guidance Tabs Title */}
          <div className="space-y-1 text-left">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> Career & Higher Education Guidance
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Explore future academic degrees, entrance exams, and secure government positions.
            </p>
          </div>

          {/* Tab Selector Bar */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-2.5 flex flex-wrap gap-2">
            <button
              id="tab-prospects"
              onClick={() => {
                setActiveSubjectTab('prospects');
                setSelectedCareerIndex(0);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeSubjectTab === 'prospects'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Career Prospects
            </button>
            <button
              id="tab-entrance"
              onClick={() => setActiveSubjectTab('entrance')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeSubjectTab === 'entrance'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Entrance Exam
            </button>
            <button
              id="tab-govt"
              onClick={() => setActiveSubjectTab('govt')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeSubjectTab === 'govt'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Govt Exams
            </button>
            <button
              id="tab-syllabus"
              onClick={() => setActiveSubjectTab('syllabus')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeSubjectTab === 'syllabus'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Syllabus & Projects
            </button>
          </div>

          {/* Active Tab Contents */}
          <div className="space-y-8">
            {activeSubjectTab === 'prospects' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* PART A: Recommended Career Pathways */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      🚀 Recommended Career Pathways & Roles
                    </h3>
                    <span className="bg-blue-50 text-blue-700 font-extrabold text-[10px] px-3.5 py-1 rounded-full uppercase border border-blue-100 shrink-0">
                      Select a career path below for deep insights
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    These specialized industry roles and upskilling pathways are highly recommended for <strong>{selectedSubject.name}</strong> students. Click any card to explore key skills, top hiring organizations, core duties, and salary trends.
                  </p>

                  {/* Horizontal Grid of Pathway Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {diplomaData.careerPaths.map((path, idx) => (
                      <div
                        key={idx}
                        id={`career-path-card-${idx}`}
                        onClick={() => setSelectedCareerIndex(idx)}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          selectedCareerIndex === idx
                            ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-[1.01]'
                            : 'bg-white border-slate-150/60 hover:border-slate-250 hover:shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-left">
                          {/* Round Index Bubble */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            selectedCareerIndex === idx
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {idx + 1}
                          </div>
                          
                          {/* Title & Links */}
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug line-clamp-1">{path.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                              <span className="flex items-center gap-0.5 hover:text-blue-600"><Clock className="w-2.5 h-2.5" /> QUICK VIEW ↓</span>
                              <span>|</span>
                              <span className="flex items-center gap-0.5 hover:text-indigo-600"><ExternalLink className="w-2.5 h-2.5" /> EXPERT HUB ↗</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PART B: Professional Role Profile (Image 2 Style) */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Top line with badges and action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-blue-50 text-blue-700 font-extrabold text-[9px] px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                        Professional Role Profile
                      </span>
                      <span className="bg-slate-50 text-slate-500 font-bold text-[9px] px-2.5 py-1 rounded-md border border-slate-200 uppercase tracking-wider">
                        Immediate Direct Entry
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Removed Expert Sourcing and Specializations Hub buttons */}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {currentRole.title} Professional Pathway
                    </h3>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">CAREER DESCRIPTION & SCOPE</span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {currentRole.scope}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Grid Column info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Left Column Widgets */}
                    <div className="space-y-6">
                      {/* Core Competencies */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Core Competencies & Skills
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {currentRole.skills.map((skill, i) => (
                            <span key={i} className="bg-slate-50 text-slate-700 font-bold text-[11px] px-3.5 py-2 rounded-xl border border-slate-150/40">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Advanced Career Growth Roles */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Advanced Career Growth Roles
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {currentRole.growth.map((grow, i) => (
                            <span key={i} className="bg-emerald-50 text-emerald-800 font-extrabold text-[11px] px-3.5 py-2 rounded-xl border border-emerald-150/40">
                              {grow}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column Widgets */}
                    <div className="space-y-6">
                      {/* Recruiting Sectors & Employers */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <Briefcase className="w-3.5 h-3.5 text-rose-600" /> Top Recruiting Sectors & Employers
                        </span>
                        <div className="bg-rose-50/5 border border-rose-100/30 rounded-2xl p-4 space-y-2">
                          <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-600">
                            {currentRole.sectors.map((sec, i) => (
                              <li key={i} className="flex gap-2 items-start leading-relaxed text-left">
                                <span className="text-rose-500 text-sm mt-0.5">●</span>
                                <span>{sec}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed pt-2 border-t border-slate-100">
                            Hiring is conducted via merit-based direct walk-ins, industrial training campus drives, and registered state/central contracting agencies.
                          </p>
                        </div>
                      </div>

                      {/* Expected Compensation Scale */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <Coins className="w-3.5 h-3.5 text-orange-600" /> Expected Compensation Scale
                        </span>
                        <div className="bg-orange-50/10 border border-orange-100/30 p-5 rounded-2xl space-y-1">
                          <p className="font-extrabold text-orange-600 text-lg sm:text-xl tracking-tight leading-none">
                            {currentRole.salary}
                          </p>
                          <span className="text-[10px] text-slate-500 font-bold block">(Scales with experience)</span>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed pt-1.5 border-t border-slate-100/50 mt-1.5">
                            Varies with local business region, overnight allowances, hazard bonuses, or small business contracting volume.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Upskilling & Certifications Section (Bottom Row) */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 pt-4 mt-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Upskilling, Certifications & Licenses
                      </span>
                      <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-0.5 rounded-md border border-blue-100">
                        Recommended growth pathways to escalate career!
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentRole.upskilling.map((cert, i) => (
                        <div key={i} className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center justify-between gap-4 transition-all hover:border-slate-300">
                          <div className="text-left space-y-0.5">
                            <h5 className="text-[11px] font-black text-slate-800 leading-tight">{cert.name}</h5>
                            <p className="text-[9px] text-slate-500 font-bold leading-normal">{cert.details}</p>
                          </div>
                          <span className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-black py-1 px-2 rounded-md border border-slate-200 cursor-pointer transition-all shrink-0">
                            View
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* PART C: Continuous Pathway to College Degrees & Peak Careers (Image 3 Style) */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <span className="bg-indigo-50 text-indigo-700 font-extrabold text-[9px] px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider w-max block">
                    Degrees Mapping & Timelines
                  </span>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                      🗺️ Continuous Pathway to College Degrees & Peak Careers
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                      We mapped where your course combination chronologically ends. Move up the chain from secondary exams toward selecting undergraduate college degrees, postgraduate specialization, and peak leadership.
                    </p>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 border-l-2 border-slate-150 ml-4 space-y-8 text-left mt-6 pt-2">
                    
                    {/* Step 1 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                      <div className="space-y-2">
                        <span className="bg-blue-50 text-blue-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          STEP 1: {diplomaData.timeline.step1.title} <span className="text-slate-400 ml-1 font-bold">(0 - 1 Years)</span>
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-800">
                          {selectedSubject.name} Operational Skills
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {diplomaData.timeline.step1.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedSubject.name.toLowerCase().includes('computer') ? (
                            <>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Git & GitHub Workspace Mastery</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Responsive Frontend Project Build</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ SQL Database Deployment Basics</span>
                            </>
                          ) : selectedSubject.name.toLowerCase().includes('hotel') ? (
                            <>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Professional Grooming & Soft Skills Certification</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Operational training in Housekeeping & Front Office</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Basic Culinary & Food Safety Certifications</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Advanced Specialty Tool Certifications</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Real-World Field Internship Experience</span>
                              <span className="bg-slate-50 text-slate-600 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-slate-150/40">✓ Hands-on Lab & Blueprint Portfolio</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm" />
                      <div className="space-y-2">
                        <span className="bg-rose-50 text-rose-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          STEP 2: {diplomaData.timeline.step2.title} <span className="text-slate-400 ml-1 font-bold">(3 - 4 Years)</span>
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-800">
                          Recommended Undergraduate Degrees
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {diplomaData.timeline.step2.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedSubject.name.toLowerCase().includes('computer') ? (
                            <>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.E. / B.Tech in Computer Science & Engineering</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.Tech in Information Technology</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.Tech in AI & Machine Learning (AI-ML)</span>
                            </>
                          ) : selectedSubject.name.toLowerCase().includes('hotel') ? (
                            <>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 BHM (Bachelor of Hotel Management)</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.Sc in Hospitality & Hotel Administration</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.A. in Culinary Arts</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.E. / B.Tech in {selectedSubject.name}</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.Tech in Applied Technologies</span>
                              <span className="bg-rose-50/20 text-rose-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-rose-100/40">🎓 B.Sc in {selectedSubject.name} Administration</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                      <div className="space-y-2">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          STEP 3: {diplomaData.timeline.step3.title} <span className="text-slate-400 ml-1 font-bold">(2 Years PG)</span>
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-800">
                          Advanced PG Specializations
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {diplomaData.timeline.step3.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedSubject.name.toLowerCase().includes('computer') ? (
                            <>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 MBA in Technology Management / Systems</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 M.Tech in Software Engineering / AI Systems</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 MS in Computer Science (Global Universities)</span>
                            </>
                          ) : selectedSubject.name.toLowerCase().includes('hotel') ? (
                            <>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 MBA in Hospitality & Luxury Brand Management</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 Master of Tourism and Hotel Management (MTHM)</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 Advanced Diploma in Gastronomy / Culinary Management</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 MBA in Operations / Technical Management</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 M.Tech in Specialized {selectedSubject.name}</span>
                              <span className="bg-emerald-50/20 text-emerald-700 font-semibold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-100/40">🚀 MS in Advanced Research Systems</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-violet-600 border-4 border-white shadow-sm" />
                      <div className="space-y-2">
                        <span className="bg-violet-50 text-violet-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          STEP 4: {diplomaData.timeline.step4.title} <span className="text-slate-400 ml-1 font-bold">(Peak Professional Summit)</span>
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-800">
                          Peak Industry Careers & Executive Roles
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {diplomaData.timeline.step4.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedSubject.name.toLowerCase().includes('computer') ? (
                            <>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Chief Technology Officer (CTO)</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Principal Software Architect</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Senior Dev Director / Engineering VP</span>
                            </>
                          ) : selectedSubject.name.toLowerCase().includes('hotel') ? (
                            <>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 General Manager (Luxury Hotel/Resort)</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Director of Global Operations (Hospitality)</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Chief Culinary Executive / Executive Chef</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Hospitality Strategy Director</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Chief Operations Executive / COO</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Director of Quality Control & Systems</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Principal Engineering Advisor</span>
                              <span className="bg-violet-600/10 text-violet-800 font-extrabold text-[10px] px-3 py-1 rounded-lg border border-violet-200/40">👑 Chief Design Architect / Lead Consultant</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {activeSubjectTab === 'entrance' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-left font-sans">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-50">
                    <GraduationCap className="w-5 h-5 text-blue-600" /> Academic Progression Entrance Examinations
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal font-medium">
                    Secure lateral admission into the second year of Bachelor's degree programs, completely skipping secondary pre-university courses.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    {diplomaData.exams.entrance.map((exam, i) => (
                      <div key={i} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Academic Entrance
                            </span>
                            <span className="bg-amber-100 text-amber-800 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Post-Diploma Leap
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-800">{exam.name}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-2xl">
                            {exam.details}
                          </p>
                        </div>
                        {exam.link && (
                          <a
                            href={`https://${exam.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs py-2 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 self-start md:self-center shrink-0"
                          >
                            Apply Online <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubjectTab === 'govt' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-left font-sans">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-50">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" /> Prestigious Government Career Recruitment Boards
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal font-medium">
                    Access permanent public service contracts, high-stability junior executive posts, and secure federal benefits.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    {diplomaData.exams.govt.map((exam, i) => (
                      <div key={i} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-800 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Public Sector Service
                            </span>
                            <span className="bg-purple-100 text-purple-800 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Direct Employment
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-800">{exam.name}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-2xl">
                            {exam.details}
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg border border-emerald-100 shrink-0 self-start md:self-center">
                          Active Annual Calendar
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubjectTab === 'syllabus' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in font-sans">
                
                {/* Left Column (Syllabus & Lab Work) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Syllabus Chapters & Topics */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-left">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-50">
                      <BookOpen className="w-5 h-5 text-blue-600" /> What Subjects You Study (Syllabus)
                    </h3>
                    <p className="text-xs text-slate-500 leading-normal font-medium">
                      The primary curriculum for {selectedSubject.name} covers these foundational and specialized theoretical concepts:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {(diplomaData?.syllabus ? diplomaData.syllabus : extra?.topics ?? []).map((topic, i) => (
                        <div key={i} className="flex gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100/50 items-start">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-extrabold text-xs mt-0.5 font-sans">
                            {i + 1}
                          </div>
                          <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hands-on Lab Work & Projects */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-left">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-50">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Practical Laboratory & Projects
                    </h3>
                    <p className="text-xs text-slate-500 leading-normal font-medium">
                      A key advantage of technical pathways is their heavy practical-weightage. You will construct, test, and present these models:
                    </p>
                    <div className="space-y-3 pt-2">
                      {(extra?.projects ?? []).map((project, i) => (
                        <div key={i} className="flex gap-4 bg-emerald-50/10 hover:bg-emerald-50/20 border border-emerald-100/40 p-4 rounded-2xl items-center transition-colors text-left">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <h4 className="text-xs font-black text-slate-800">Practical Project {i + 1}</h4>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{project}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column (Study Tips & Value) */}
                <div className="lg:col-span-4 space-y-6 text-left">
                  {/* Study Tips */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 pb-1 border-b border-slate-50">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Success Study Tips
                    </h3>
                    <div className="space-y-3 pt-1">
                      {extra.tips.map((tip, i) => (
                        <div key={i} className="bg-amber-50/20 border border-amber-150/30 p-3.5 rounded-xl flex gap-3 items-start">
                          <span className="bg-amber-150 text-amber-900 font-black text-[10px] w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-xs text-amber-950 font-medium leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Value */}
                  <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-800">
                      💡 Subject Value
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {extra.value}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Bottom Actions Row (Matches bottom bar in Screenshot 3) */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left mt-8 font-sans">
            <p className="text-xs text-slate-600 font-semibold leading-relaxed max-w-xl">
              Need more help analyzing courses? Take our custom system-level Aptitude Assessment to match your skill index!
            </p>
            <button
              onClick={() => {
                setSelectedSubject(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs py-3 px-6 rounded-2xl cursor-pointer transition-all shrink-0 flex items-center gap-2 shadow-sm"
            >
              ← Return to {selectedCourse.name}
            </button>
          </div>

        </div>
      );
    }

    return (
      <div id="course-details-page" className="space-y-8 animate-fade-in font-sans pb-12">
        {/* Top Back Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-xl gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1 z-10 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-500/30 text-blue-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
                {selectedStream?.title || "Academic Track"} Pathway
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
                Direct Degree Tracker
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-1.5 text-white">
              {selectedCourse.name} Full Career Pathfinder
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-sans font-medium">
              Explore dynamic subjects, registration timelines, potential entrance exams, and pathways ending in high-tier university degrees.
            </p>
          </div>
          <div className="flex items-center gap-2.5 z-10 shrink-0">
            <button
              onClick={() => {
                toggleSavedPathway({
                  id: `stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`,
                  title: `${selectedCourse.name} Academic Pathway`,
                  type: 'STREAM',
                  institute: `${selectedStream?.title || 'Academic Stream'} Track`
                });
              }}
              className={`border font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer transition-all flex items-center gap-2 shadow-sm ${
                isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`)
                  ? 'bg-rose-500/20 border-rose-400 text-rose-200 hover:bg-rose-500/30'
                  : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`) ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`) ? 'Saved' : 'Save Course'}</span>
            </button>
            <button
              onClick={() => {
                setSelectedCourse(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer transition-all flex items-center gap-2 shadow-sm"
            >
              ← Back to All Courses
            </button>
          </div>
        </div>

        {/* Core Grid layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT RAIL - Meta widgets & quick tools (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Stats overview */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-4 text-left">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 pb-1 border-b border-slate-50">
                ⚡ Course parameters
              </h3>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50 flex flex-col gap-0.5">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Duration Range</span>
                  <span className="font-extrabold text-slate-800 text-[13px]">{selectedCourse.duration}</span>
                </div>
                
                <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50 flex flex-col gap-0.5">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Future Career Outlook</span>
                  <span className="font-extrabold text-blue-700 text-[13px]">{detailData.futureJobOutlook}</span>
                </div>

                <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50 flex flex-col gap-0.5">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Minimum Eligibility criteria</span>
                  <p className="font-bold text-slate-700 leading-normal text-[11px] mt-0.5">
                    {selectedCourse.eligibility}
                  </p>
                </div>
              </div>
            </div>

            {/* SYLLABUS INTENSITY VISUALIZATION */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-5 text-left">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-50 flex items-center gap-1.5">
                📊 Academics Intensity Tracker
              </h3>

              <div className="space-y-4 font-sans">
                {/* Academic Difficulty rating stars indicators */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Theoretical Workload:</span>
                    <span className="text-amber-600 font-extrabold">{detailData.difficulty} / 5</span>
                  </div>
                  <div className="flex gap-1 pt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          star <= detailData.difficulty ? 'bg-amber-500' : 'bg-slate-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Practical vs Theory Split balance visual mapping */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>📘 Theory Weight</span>
                    <span>⚙️ Lab Practical</span>
                  </div>
                  <div className="relative h-5 bg-slate-100 rounded-full overflow-hidden flex text-white text-[9px] font-extrabold text-center select-none shadow-inner">
                    <div
                      style={{ width: `${detailData.theoryWeight}%` }}
                      className="bg-blue-600 flex items-center justify-center transition-all duration-700"
                    >
                      {detailData.theoryWeight}%
                    </div>
                    <div
                      style={{ width: `${detailData.practicalWeight}%` }}
                      className="bg-emerald-500 flex items-center justify-center transition-all duration-700"
                    >
                      {detailData.practicalWeight}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STREAM TRANSITION / DIVERSIFICATION ADVISER */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-2xs text-left space-y-2.5">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                🔄 Skill Transferability & Pivots
              </h4>
              <p className="text-xs font-medium text-slate-600 leading-relaxed font-sans">
                {detailData.transitionAdvisor}
              </p>
            </div>

            {/* COUNSELOR CHAT INITIATOR CALLOUT CARD */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4 text-left">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
              <h4 className="text-sm font-bold flex items-center gap-1.5 z-10 relative">
                <Sparkles className="w-4 h-4 text-amber-300" /> Have questions on {selectedCourse.name}?
              </h4>
              <p className="text-xs text-blue-150 leading-relaxed font-sans font-medium z-10 relative">
                Our active AI Advisor is trained to provide admission rates, expected tuition fees, hostel information, and direct college lists in India.
              </p>
              <button
                onClick={() => {
                  const customEvent = new CustomEvent('open-counselor-with-context', {
                    detail: { course: selectedCourse.name }
                  });
                  window.dispatchEvent(customEvent);
                }}
                className="w-full bg-white text-blue-700 hover:bg-slate-50 font-extrabold text-xs py-3 px-4 rounded-xl cursor-pointer transition-all shadow-sm block text-center"
              >
                Start Counseling Session Now
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR - Curriculums, Exams, and Timeline (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview description & student life */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5 text-left">
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  🌟 Educational Prospects & Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium font-sans">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4.5 space-y-1">
                <h4 className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5 uppercase tracking-wide">
                  🎭 Academic Lifestyle: What to expect
                </h4>
                <p className="text-xs text-amber-950 font-sans font-medium leading-relaxed">
                  {detailData.lifeAsStudent}
                </p>
              </div>
            </div>

            {/* SUBJECTS THEY READ (THE CURRICULUM SECTION) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" /> {selectedStream?.id === 'diploma' ? 'Available Courses & Specializations' : 'What Subjects You Study (Syllabus)'}
                </h3>
                <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Post-10th Curriculum
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {detailData.subjects.map((sub, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedSubject(sub as any);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white border border-slate-100 hover:border-blue-400 hover:scale-[1.01] hover:shadow-md rounded-3xl p-6 flex flex-col cursor-pointer transition-all text-left group justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Division Badge on the card */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border ${
                            sub.type === 'core'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : sub.type === 'practical'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}>
                            {sub.type} Division
                          </span>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                            {sub.name}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2 font-medium">
                            {sub.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <span className="text-[11px] font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                          Explore Career & Syllabus <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CAREER AND HIGHER STUDIES ACTION PATHS (TABBED INTERFACE) */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center px-1">
                <div className="space-y-0.5 text-left">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" /> Career & Higher Education Guidance
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-medium">Explore future academic degrees, entrance exams, and secure government positions.</p>
                </div>
              </div>

              {/* THREE BUTTONS */}
              <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setActiveSubTab('degrees')}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeSubTab === 'degrees'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                  id="tab-degrees"
                >
                  <Award className="w-4 h-4" /> {selectedStreamId === '12th_intermediate' ? 'Degrees' : 'Career Prospects'}
                </button>
                <button
                  onClick={() => setActiveSubTab('entrance')}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeSubTab === 'entrance'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                  id="tab-entrance"
                >
                  <Calendar className="w-4 h-4" /> Entrance Exam
                </button>
                <button
                  onClick={() => setActiveSubTab('govt')}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeSubTab === 'govt'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                  id="tab-govt"
                >
                  <ShieldCheck className="w-4 h-4" /> Govt Exams
                </button>
              </div>

              {/* RENDERING TAB CONTENT */}
              {activeSubTab === 'degrees' && (
                <div className="space-y-6 animate-fade-in animate-duration-200">
                  {/* DEGREE SELECTION GRID */}
                  <div className="bg-gradient-to-br from-blue-50/75 to-indigo-50/50 border border-blue-100/60 rounded-3xl p-6 shadow-2xs space-y-4 text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-1 border-b border-blue-100/40">
                      <h3 className="text-xs font-black text-blue-800 uppercase tracking-widest flex items-center gap-1.5">
                        {selectedStreamId === '12th_intermediate' ? '🎓 Recommended Degree Courses • Interactive Guide' : '🚀 Recommended Career Pathways & Roles'}
                      </h3>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full">
                        {selectedStreamId === '12th_intermediate' ? 'Select a degree below for deep insights' : 'Select a career path below for deep insights'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans mt-1">
                      {selectedStreamId === '12th_intermediate' ? (
                        <>These target higher education courses are officially recommended for <strong className="text-slate-800 font-black">{selectedCourse.name}</strong> students. Click any degree card to explore core curricula, elite institutes, job roles, and average salary metrics.</>
                      ) : (
                        <>These specialized industry roles and upskilling pathways are highly recommended for <strong className="text-slate-800 font-black">{selectedCourse.name}</strong> students. Click any card to explore key skills, top hiring organizations, core duties, and salary trends.</>
                      )}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                      {selectedCourse.careerProspects.map((degree, idx) => {
                        const isCurrent = selectedSubDegree === degree;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedSubDegree(degree);
                              setTimeout(() => {
                                const element = document.getElementById('selected-degree-profile');
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { 
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedSubDegree(degree);
                                setTimeout(() => {
                                  const element = document.getElementById('selected-degree-profile');
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }, 100);
                              }
                            }}
                            className={`p-4 rounded-2xl shadow-3xs transition-all flex items-start gap-3 text-left w-full cursor-pointer focus:outline-none ${
                              isCurrent
                                ? 'bg-white border-2 border-blue-600 ring-4 ring-blue-50'
                                : 'bg-white hover:bg-slate-50 border border-slate-100 hover:border-blue-150'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                              isCurrent
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                                : 'bg-blue-50 border-blue-100/50 text-blue-700'
                            }`}>
                              <span className="font-extrabold text-[12px]">{idx + 1}</span>
                            </div>
                            <div className="space-y-0.5 min-w-0 pr-1">
                              <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-blue-900' : 'text-slate-800'}`}>
                                {degree}
                              </h4>
                              <div className="flex items-center gap-2">
                                <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">
                                  Quick View &darr;
                                </p>
                                <span className="text-[8px] text-slate-300">|</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                      detail: { 
                                        tab: 'specializations',
                                        degreePreset: degree,
                                        degreePresetToSpec: true
                                      } 
                                    }));
                                  }}
                                  className="text-[10px] text-indigo-600 hover:text-indigo-800 font-black tracking-tight uppercase flex items-center gap-0.5 hover:underline"
                                >
                                  Expert Hub <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* DEEP DEGREE PROFILE INSIGHTS CARD */}
                  {selectedSubDegree && (() => {
                    const info = getDegreeDetails(selectedSubDegree);
                    return (
                      <div id="selected-degree-profile" className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 text-left animate-fade-in animate-duration-300">
                        {/* Title Banner */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-50 text-blue-700 border border-blue-100/50 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                                {selectedStreamId === '12th_intermediate' ? 'Degree Course Profile' : 'Professional Role Profile'}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                {selectedStreamId === '12th_intermediate' ? `${info.duration} Course` : info.duration}
                              </div>
                            </div>
                            <h3 className="text-lg font-black text-slate-900 leading-tight">
                              {info.fullName} {selectedStreamId === '12th_intermediate' ? `(${info.name})` : ''}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">
                            {selectedStreamId === '12th_intermediate' ? 'Course Description & Scope' : 'Career Description & Scope'}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                            {info.overview}
                          </p>
                        </div>

                        {/* Grid detailing Subjects & Colleges */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Syllabus / Key Subjects */}
                          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-indigo-100/50">
                              <BookOpen className="w-3.5 h-3.5" /> {selectedStreamId === '12th_intermediate' ? 'Core Curriculum Areas' : 'Core Competencies & Skills'}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {info.keySubjects.map((sub, i) => (
                                <span
                                  key={i}
                                  className="bg-white border border-slate-200/60 shadow-3xs text-[11px] font-extrabold text-slate-700 px-2.5 py-1 rounded-lg"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold leading-normal pt-1">
                              {selectedStreamId === '12th_intermediate' 
                                ? 'These represent essential conceptual subjects and specialized skill pillars taught over the semesters.' 
                                : 'These represent vital modern industrial execution competencies and practical field execution skills.'}
                            </p>

                            {/* Dynamic Specializations Directory Button */}
                            {(() => {
                              const dName = info.name;
                              let targetType: 'engineering'|'medical'|'commerce'|'arts'|'science'|'law'|null = null;
                              if (dName === "B.E. / B.Tech" || dName.startsWith("BTech")) targetType = 'engineering';
                              else if (dName === "MBBS") targetType = 'medical';
                              else if (dName.includes("B.Com") || dName.includes("BBA") || dName.includes("BBM") || dName.includes("CA")) targetType = 'commerce';
                              else if (dName.includes("BA ") || dName === "B.Sc Psychology") targetType = 'arts';
                              else if (dName.includes("BCA") || dName.includes("B.Sc ")) targetType = 'science';
                              else if (dName.includes("LLB") || dName.includes("Law")) targetType = 'law';

                              if (!targetType) return null;

                              const btnColors = {
                                engineering: 'bg-indigo-600',
                                medical: 'bg-emerald-600',
                                commerce: 'bg-blue-600',
                                science: 'bg-sky-600',
                                arts: 'bg-rose-600',
                                law: 'bg-amber-600'
                              }[targetType];

                              const tLabel = {
                                engineering: 'Engineering Streams',
                                medical: 'Medical Specializations',
                                commerce: 'Commerce & Business Focus Areas',
                                science: 'Science & Computing Specialties',
                                arts: 'Arts & Humanities Majors',
                                law: 'Law Specializations'
                              }[targetType];

                              return (
                                <div className="mt-3.5 pt-3 border-t border-slate-100/60">
                                  <button
                                    id="view-specs-button"
                                    onClick={() => {
                                      window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                        detail: { 
                                          tab: 'specializations',
                                          specType: targetType
                                        } 
                                      }));
                                    }}
                                    className={`w-full hover:bg-slate-900 text-white font-black text-[12px] py-2.5 px-4 rounded-xl cursor-pointer shadow-3xs hover:shadow-2xs transition-all text-center flex items-center justify-center gap-1.5 border border-indigo-500/20 ${btnColors}`}
                                  >
                                    🚀 Directory: {tLabel} &rarr;
                                  </button>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Top Colleges */}
                          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-rose-100/50">
                              <School className="w-3.5 h-3.5" /> {selectedStreamId === '12th_intermediate' ? 'Premier Institutions & Colleges' : 'Top Recruiting Sectors & Employers'}
                            </h4>
                            <ul className="space-y-2">
                              {info.topColleges.map((col, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                  <span>{col}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-[10px] text-slate-400 font-bold leading-normal">
                              {selectedStreamId === '12th_intermediate' 
                                ? 'Admissions typically require competitive state/national entrance indices (KCET, NEET, COMEDK, CLAT, JEE, etc.).' 
                                : 'Hiring is conducted via merit-based direct walk-ins, industrial training campus drives, and registered state/central contracting agencies.'}
                            </p>
                          </div>
                        </div>

                        {/* Bento segment for Careers & Starting package */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                          {/* Jobs */}
                          <div className="border border-slate-100 p-5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-emerald-100/50">
                              <Briefcase className="w-3.5 h-3.5" /> {selectedStreamId === '12th_intermediate' ? 'Common Placement Roles' : 'Advanced Career Growth Roles'}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {info.industryRoles.map((role, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                      detail: { 
                                        tab: 'jobs', 
                                        search: role 
                                      } 
                                    }));
                                  }}
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-900 text-[11px] font-extrabold border border-emerald-200 hover:border-emerald-400 px-2.5 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                                  title={`Explore ${role} in Job Explorer`}
                                >
                                  <span>💼 {role}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* CTC & Package */}
                          <div className="border border-slate-100 p-5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-amber-100/50">
                              <Coins className="w-3.5 h-3.5" /> {selectedStreamId === '12th_intermediate' ? 'Standard Starting Package (CTC)' : 'Expected Compensation Scale'}
                            </h4>
                            <div className="space-y-1">
                              <div className="text-lg font-black text-amber-700 flex items-baseline gap-1">
                                {info.avgSalary}
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold leading-normal">
                                {selectedStreamId === '12th_intermediate' 
                                  ? 'Subject to student skill proficiency, specialized internship portfolios, and final institutional placements.' 
                                  : 'Varies with local business region, overnight allowances, hazard bonuses, or small business contracting volume.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Higher studies alternatives */}
                        <div className="bg-blue-50/30 border border-blue-100/30 p-5 rounded-2xl space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-1 border-b border-blue-100/40">
                            <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-1.5">
                              <ArrowUpRight className="w-3.5 h-3.5" /> {selectedStreamId === '12th_intermediate' ? 'Postgrad Specialization & Higher Studies' : 'Upskilling, Certifications & Licenses'}
                            </h4>
                            <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded border border-indigo-100 animate-pulse">
                              {selectedStreamId === '12th_intermediate' ? 'Click any PG option below for FULL profile!' : 'Recommended growth pathways to escalate career!'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {info.higherStudies.map((prog, i) => {
                              const isPgSelected = selectedPostGrad === prog;
                              return (
                                <button
                                  key={i}
                                  onClick={() => setSelectedPostGrad(isPgSelected ? null : prog)}
                                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer text-left focus:outline-none flex items-center gap-1.5 border ${
                                    isPgSelected
                                      ? 'bg-violet-600 text-white border-violet-600 ring-2 ring-violet-200 shadow-xs'
                                      : 'bg-white text-blue-900 border-blue-100 hover:border-violet-300 hover:bg-violet-50/55'
                                  }`}
                                >
                                  <span>{prog}</span>
                                  <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-black ${isPgSelected ? 'bg-violet-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {isPgSelected ? 'Active' : 'View'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Selected PG Course Profile Deep-Dive */}
                        {selectedPostGrad && (() => {
                          const pgInfo = getPostGradDetails(selectedPostGrad);
                          return (
                            <div className="bg-gradient-to-br from-violet-50/60 to-purple-50/30 border border-violet-150 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 text-left animate-fade-in animate-duration-350 ring-4 ring-violet-50 transition-all mt-4">
                              {/* Title Banner */}
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-violet-100">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-violet-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                                      Advanced Post-Graduation Profile
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px] font-extrabold text-violet-600">
                                      <Clock className="w-3.5 h-3.5" />
                                      {pgInfo.duration} Course
                                    </div>
                                  </div>
                                  <h3 className="text-base sm:text-lg font-black text-violet-900 leading-tight">
                                    {pgInfo.fullName} ({pgInfo.name})
                                  </h3>
                                </div>
                                <button
                                  onClick={() => setSelectedPostGrad(null)}
                                  className="text-xs font-black text-rose-600 hover:text-rose-800 transition-colors px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-50 cursor-pointer"
                                >
                                  Close PG Profile &times;
                                </button>
                              </div>

                              {/* Overview and Eligibility */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">
                                    PG Program Overview & Scope
                                  </h4>
                                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                    {pgInfo.overview}
                                  </p>
                                </div>
                                <div className="bg-white border border-violet-100 p-4 rounded-2xl space-y-1.5 shadow-3xs">
                                  <h4 className="text-[10px] font-black text-violet-700 uppercase tracking-widest flex items-center gap-1">
                                    🔐 Typical Eligibility & Admission
                                  </h4>
                                  <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                                    {pgInfo.eligibility}
                                  </p>
                                </div>
                              </div>

                              {/* Specializations & Colleges */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Specializations list */}
                                <div className="bg-white border border-slate-100 p-5 rounded-2xl space-y-3 shadow-3xs">
                                  <h4 className="text-[10px] font-black text-violet-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-violet-100/50">
                                    <BookOpen className="w-3.5 h-3.5" /> Popular Specializations & Electives
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {pgInfo.specializations.map((spec, i) => (
                                      <span
                                        key={i}
                                        className="bg-slate-50 border border-slate-200/60 shadow-3xs text-[11px] font-bold text-slate-700 px-2.5 py-1 rounded-lg"
                                      >
                                        {spec}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Top Institutes */}
                                <div className="bg-white border border-slate-100 p-5 rounded-2xl space-y-3 shadow-3xs">
                                  <h4 className="text-[10px] font-black text-purple-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-purple-100/50">
                                    <School className="w-3.5 h-3.5" /> Elite Colleges & National Institutes
                                  </h4>
                                  <ul className="space-y-2">
                                    {pgInfo.topColleges.map((col, i) => (
                                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                                        <span>{col}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Career Prospects & Salary Boost */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="border border-slate-200 p-5 rounded-2xl space-y-3 bg-white">
                                  <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-emerald-100/50">
                                    <Briefcase className="w-3.5 h-3.5" /> Premium Placement Roles
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {pgInfo.careerProspects.map((role, i) => (
                                      <span key={i} className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-100/50 px-2.5 py-1 rounded-lg">
                                        {role}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="border border-slate-200 p-5 rounded-2xl space-y-3 bg-white">
                                  <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-amber-100/50">
                                    <Coins className="w-3.5 h-3.5" /> Expected Salary Catalyst / Package
                                  </h4>
                                  <div className="space-y-1">
                                    <p className="text-xs text-amber-800 font-black leading-relaxed">
                                      {pgInfo.salaryBoost}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold leading-normal">
                                      Master's degrees significantly expand eligibility for leadership, deep technology, and strategic corporate advisor positions.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
              )}

              {activeSubTab === 'entrance' && (
                <div className="space-y-4 animate-fade-in animate-duration-200 text-left">
                  {detailData.eligibilityWarning && (
                    <div id="eligibility-warning-card" className="bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl p-4 text-xs font-bold leading-relaxed flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>{detailData.eligibilityWarning}</span>
                    </div>
                  )}

                  {detailData.specialNote && (
                    <div id="special-note-card" className="bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl p-4 text-xs font-bold leading-relaxed flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{detailData.specialNote}</span>
                    </div>
                  )}

                  {/* List of exams */}
                  <div className="space-y-3">
                    {detailData.exams.map((exam, i) => (
                      <div key={i} className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left transition-all hover:shadow-2xs">
                        <div className="space-y-2 flex-1 font-sans">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-extrabold bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                              {exam.type}
                            </span>
                            <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-105 px-2.5 py-0.5 rounded-md uppercase">
                              {exam.status}
                            </span>
                            {exam.bestFor && (
                              <span className="text-[9px] font-extrabold bg-purple-50 text-purple-700 border border-purple-105 px-2.5 py-0.5 rounded-md">
                                🎯 For: {exam.bestFor}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900">
                            {exam.name}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                            {exam.details}
                          </p>
                          {exam.link && (
                            <div className="pt-2">
                              <a
                                href={exam.link.startsWith('http') ? exam.link : `https://${exam.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline"
                                id={`exam-link-${exam.name.replace(/\s+/g, '-').toLowerCase()}`}
                              >
                                Visit {exam.link} <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="shrink-0 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                detail: { 
                                  tab: 'exams',
                                  examPreset: exam.name
                                } 
                              }));
                            }}
                            className="w-full sm:w-auto bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200/60 text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-3xs active:scale-95"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Exam Guide &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* REAL-TIME ENTRANCE REGISTRY CHECKER MINI-WIDGET */}
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-md">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-yellow-300 flex items-center gap-2">
                        🎯 Interactive Exam Suitability Checker
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                        Adjust the percentage scale below to register your projected board score. We will calculate whether you qualify for direct state registrations or high-tier exam bookings:
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                        {/* INPUT SCORE KNOB */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 font-sans">Projected Class 12th Score:</span>
                            <span className="text-sm font-black text-yellow-300 font-mono">{scoreInput}%</span>
                          </div>
                          <input
                            type="range"
                            min="35"
                            max="100"
                            value={scoreInput}
                            onChange={(e) => setScoreInput(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400 outline-none"
                            id="exam-score-slider"
                          />
                        </div>
                      </div>

                      {/* VERDICT MATRICES PANEL */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                        {detailData.exams.slice(0, 4).map((ex, idx) => {
                          const minNeeded = ex.status === 'Highly Competitive' || ex.status === 'Elite Technical' || ex.status === 'Extremely Intense' ? 75 : 55;
                          const isEligible = scoreInput >= minNeeded;
                          return (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <h5 className="text-xs font-extrabold text-white truncate max-w-[150px]">{ex.name}</h5>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  isEligible ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}>
                                  {isEligible ? 'Eligible' : `Requires ${minNeeded}%`}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed line-clamp-2">
                                {isEligible 
                                  ? `Your projected score of ${scoreInput}% clears the cutoff requirement.` 
                                  : `Needs minimum ${minNeeded}% score. Focus on critical syllabus sections to achieve eligibility.`}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* DIRECTORY REDIRECT */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                          detail: { tab: 'exams' } 
                        }));
                      }}
                      className="w-full bg-indigo-600 hover:bg-slate-900 text-white font-black text-xs py-3.5 px-6 rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <Calendar className="w-4 h-4" /> Open Full Exams & Degrees Directory &rarr;
                    </button>
                  </div>
                </div>
              )}

              {activeSubTab === 'govt' && (
                <div className="space-y-4 animate-fade-in animate-duration-200 text-left">
                  <div className="bg-amber-50 border border-amber-105 rounded-3xl p-5 text-xs text-amber-900 font-medium leading-relaxed flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <strong className="font-extrabold block text-amber-950 mb-0.5">Government Careers Advantage:</strong>
                      Completing PUC with this specialized {selectedCourse.name} layout opens robust administrative, defence, and technical avenues in State and Central Government.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {getGovtExamsForCombination(selectedCourse.name).map((exam, i) => (
                      <div key={i} className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start justify-between gap-4 text-left transition-all hover:shadow-2xs">
                        <div className="space-y-2 flex-1 font-sans">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-105 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                              {exam.type}
                            </span>
                            <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-105 px-2.5 py-0.5 rounded-md uppercase">
                              {exam.status}
                            </span>
                            {exam.bestFor && (
                              <span className="text-[9px] font-extrabold bg-purple-50 text-purple-700 border border-purple-105 px-2.5 py-0.5 rounded-md">
                                🎯 Match: {exam.bestFor}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900">
                            {exam.name}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                            {exam.details}
                          </p>
                          {exam.link && (
                            <div className="pt-2">
                              <a
                                href={`https://${exam.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline"
                                id={`govt-link-${exam.name.replace(/\s+/g, '-').toLowerCase()}`}
                              >
                                Visit Official Portal ({exam.link}) <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="shrink-0 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                detail: { 
                                  tab: 'exams',
                                  examPreset: exam.name
                                } 
                              }));
                            }}
                            className="w-full sm:w-auto bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white border border-amber-200/60 text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-3xs active:scale-95"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Official Guide &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DIRECTORY REDIRECT */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                          detail: { tab: 'exams' } 
                        }));
                      }}
                      className="w-full bg-slate-900 hover:bg-amber-600 text-white font-black text-xs py-3.5 px-6 rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 border border-slate-700"
                    >
                      <Calendar className="w-4 h-4" /> Open Full Govt & Entrance Exams Directory &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* HIGH-FIDELITY DEGREE AND CAREER PATHWAY PROGRESSION TIMELINE */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs text-left">
              <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold bg-indigo-50 border border-indigo-150 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider">
                    Degrees mapping & timelines
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                    🗺️ Continuous Pathway to College Degrees & Peak Careers
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xl font-sans font-medium">
                    We mapped where your course combination chronologically ends. Move up the chain from secondary exams toward selecting undergraduate college degrees, postgraduate specialization, and peak leadership.
                  </p>
                </div>
                {selectedCourse && (
                  <button
                    onClick={() => {
                      toggleSavedPathway({
                        id: `stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`,
                        title: `${selectedCourse.name} Academic Pathway`,
                        type: 'STREAM',
                        institute: `12th Standard / Intermediate Pathway`
                      });
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm flex items-center gap-1.5 border shrink-0 cursor-pointer ${
                      isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`)
                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{isPathwaySaved(`stream-pathway-${selectedCourse.name.replace(/\s+/g, '-').toLowerCase()}`) ? 'Saved' : 'Save Pathway'}</span>
                  </button>
                )}
              </div>

              <div className="relative border-l-2 border-slate-100 pl-6 ml-3.5 space-y-8 py-2">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-100 border-4 border-blue-600 shadow-sm" />
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Step 1: Immediate Milestones
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">(0 - 1 Years)</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 leading-normal">
                      {roadmap.step1Title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {roadmap.step1Desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {roadmap.step1Milestones.map((ms, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-700 text-[10px] border border-slate-200 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                          {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-pink-100 border-4 border-pink-500 shadow-sm" />
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Step 2: Recommended College Degrees
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">(3 - 4 Years)</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 leading-normal font-sans">
                      {roadmap.step2Title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {roadmap.step2Desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {roadmap.step2Milestones.map((ms, idx) => (
                        <span key={idx} className="bg-pink-50/50 text-pink-700 text-[10px] border border-pink-100 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                          {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-100 border-4 border-emerald-500 shadow-sm" />
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Step 3: Advanced PG Specializations
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">(2 Years PG)</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 leading-normal font-sans">
                      {roadmap.step3Title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {roadmap.step3Desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {roadmap.step3Milestones.map((ms, idx) => (
                        <span key={idx} className="bg-emerald-50/50 text-emerald-850 text-[10px] border border-emerald-100 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-100 border-4 border-indigo-600 shadow-md animate-pulse" />
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Step 4: Ultimate Industry Careers
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">(Peak Professional Summit)</span>
                    </div>
                    <h5 className="text-xs font-bold text-indigo-900 leading-normal font-sans">
                      {roadmap.step4Title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {roadmap.step4Desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {roadmap.step4Milestones.map((ms, idx) => (
                        <span key={idx} className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-2.5 py-0.5 rounded-lg font-extrabold flex items-center gap-1 transition-all shadow-xs leading-normal cursor-default">
                          <Milestone className="w-3 h-3 text-yellow-300 shrink-0" />
                          {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK BUTTON FOOTER ELEMENT */}
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium text-left">
                Need more help analyzing courses? Take our custom system-level Aptitude Assessment to match your skill index!
              </span>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 px-8 rounded-xl cursor-pointer transition-all shadow-sm shrink-0"
              >
                ← Return to Streams List
              </button>
            </div>

          </div>

        </div>

        {/* SUBJECT DETAILS MODAL OVERLAY */}
        <AnimatePresence>
          {selectedSubject ? (() => {
            const subject = selectedSubject as { name: string; desc: string; type: 'core' | 'practical' | 'elective' };
            const extra = getSubjectFullDetails(subject.name, subject.desc, subject.type);
            return (
              <div
                id="subject-details-modal"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto"
                onClick={() => setSelectedSubject(null)}
              >
                <div
                  className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 relative overflow-hidden border border-slate-100 select-none text-left animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Visual Background Decors */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1.5 text-left">
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        subject.type === 'core'
                          ? 'bg-blue-50 text-blue-700 border border-blue-150'
                          : subject.type === 'practical'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-150'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-150'
                      }`}>
                        {subject.type} Subject Details
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                        {subject.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="p-1.5 hover:bg-slate-100 rounded-xl transition-all cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none"
                      aria-label="Close details"
                    >
                      <Minimize2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Contents - Scrollable to prevent overflow */}
                  <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
                    
                    {/* General Intro description */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500" /> Core Curriculum Theme
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed font-sans bg-slate-50 border border-slate-100/60 p-4 rounded-2xl">
                        {subject.desc}
                      </p>
                    </div>

                    {/* Detailed Syllabus Chapters / Topics */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Syllabus Chapters & Topics
                      </h4>
                      <div className="grid grid-cols-1 gap-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        {extra.topics.map((topic, index) => (
                          <div key={index} className="flex gap-2.5 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span className="text-xs text-slate-700 font-semibold">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Laboratory / Hands-on Scope */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Hands-on Lab Work & Projects
                      </h4>
                      <div className="grid grid-cols-1 gap-2 bg-emerald-50/20 border border-emerald-100/50 p-4 rounded-2xl">
                        {extra.projects.map((project, index) => (
                          <div key={index} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-600 font-medium">{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strategic Value */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Milestone className="w-3.5 h-3.5 text-indigo-600" /> Major Career & College Relevance
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold bg-indigo-50/20 p-4 rounded-2xl border border-indigo-150/30">
                        {extra.value}
                      </p>
                    </div>

                    {/* Study Advice */}
                    <div className="space-y-2.5 border-t border-slate-100 pt-4.5">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Success Tips to Score Highest Marks
                      </h4>
                      <div className="space-y-2">
                        {extra.tips.map((tip, index) => (
                          <div key={index} className="bg-amber-50/40 border border-amber-150/50 p-3 rounded-xl text-xs text-amber-950 leading-relaxed font-sans font-semibold flex gap-2.5 items-start">
                            <span className="bg-amber-100 text-amber-800 font-black text-[9px] w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar Footer */}
                  <div className="border-t border-slate-100 pt-4 flex gap-3">
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl cursor-pointer transition-all text-center shadow-xs"
                    >
                      Got it, Close
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSubject(null);
                        const customEvent = new CustomEvent('open-counselor-with-context', {
                          detail: { course: `${selectedCourse?.name || 'this pathway'} - Subject: ${subject.name}` }
                        });
                        window.dispatchEvent(customEvent);
                      }}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 font-extrabold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all text-center flex items-center gap-1 shrink-0"
                    >
                      Ask AI Counselor
                    </button>
                  </div>

                </div>
              </div>
            );
          })() : null}
        </AnimatePresence>

      </div>
    );
  }

  if (!selectedStream) {
    return (
      <div id="streams-page" className="space-y-8 animate-fade-in font-sans">
        {/* Intro Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-sans">
            <BookOpen className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="bg-blue-500/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Curated Academic Streams
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Explore Post-10th Pathways & Streams
            </h1>
            <p className="mt-4 text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl font-sans">
              Passing your 10th-grade secondary certifications presents multiple direct pathways. Compare core parameters like course duration, workloads, pros and cons, or specific study modules before selecting your perfect match.
            </p>
          </div>
        </div>

        {/* General Counseling Portal Introduction */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Post-10th Educational Milestone Selection
            </h2>
            <div className="mt-4 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
              <p>
                In the Indian educational ecosystem, finishing high school is the earliest entry into specialized career roadmaps. Instead of rushing due to peer patterns or parental oversight, it is recommended to review the diverse scopes of each mainstream track:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 font-sans">
                <li><strong>12th / Intermediate:</strong> Traditional division of Science, Commerce, and Humanities. Leads directly to university degrees and highly competitive entrance tests.</li>
                <li><strong>Diploma Courses:</strong> Direct 3-year mechanical, software, or circuit-focused structures offering junior engineer badges and direct B.Tech lateral entries.</li>
                <li><strong>ITI Trades:</strong> Practical, 1-to-2 year vocational trade certificates centered around machinery, linesmanship, fitting, and physical craft services.</li>
                <li><strong>Paramedical Care:</strong> Focuses on operating diagnostics, operation theatres, dialysis centers, and bio-testing labs in cooperation with hospitals.</li>
                <li><strong>Vocational Degrees:</strong> Practical, short-term modules merging office management, flight/resort booking, web layout design, and modern marketing tasks.</li>
              </ul>
              <p className="font-bold text-blue-700 mt-4 leading-relaxed">
                👉 Click on any of the core categories below to compare pros/cons, examine the syllabus, and select specific course prospectuses.
              </p>
            </div>
          </div>

          {/* Courses Categories Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Available Pathways & Stream Bundles:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STREAMS_DATA.map((stream) => (
                <div
                  key={stream.id}
                  onClick={() => {
                    setSelectedStreamId(stream.id);
                    if (stream.id === '12th_intermediate') {
                      setActiveCategory('science');
                    }
                  }}
                  className="bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-white rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {stream.durationRange}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {stream.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                      {stream.shortDesc}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:underline pt-2">
                    <span>Explore available courses</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="streams-page" className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BookOpen className="w-64 h-64 -mr-16 -mt-16" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="bg-blue-500/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Curated Academic Streams
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight font-sans">
            Explore Post-10th Pathways & Streams
          </h1>
          <p className="mt-4 text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl font-sans">
            Compare durations, benefits, eligibility, and direct career branches in India. Select any path or return to overview.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Tabs / Right Display Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stream Navigation Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <button
              onClick={() => {
                setSelectedStreamId(null);
                setSelectedCourse(null);
              }}
              className="w-full text-left p-3 rounded-xl border border-dashed border-blue-200 bg-blue-50/40 text-blue-800 hover:bg-blue-50 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer mb-2"
            >
              ← Return to Main Pathways Intro
            </button>
            <h3 className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider mb-2 flex items-center gap-1.5 pt-2">
              <ListFilter className="w-3.5 h-3.5" /> Select a Pathway
            </h3>
            <div className="space-y-1 font-sans">
              {STREAMS_DATA.map((stream) => {
                const isSelected = selectedStreamId === stream.id;
                return (
                  <button
                    id={`stream-tab-${stream.id}`}
                    key={stream.id}
                    onClick={() => {
                      setSelectedStreamId(stream.id);
                      setSelectedCourse(null);
                      if (stream.id === '12th_intermediate') {
                        setActiveCategory('science');
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-md border-l-4 border-blue-600 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                        {stream.title}
                      </div>
                      <p className="text-[11px] text-slate-450 line-clamp-1 group-hover:text-slate-600">
                        {stream.shortDesc}
                      </p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Guidance Callout */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 space-y-2">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
              💡 Confused about which stream matches you?
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed font-sans">
              Our AI-driven interactive Aptitude Assessment helps compile a customized dossier of paths corresponding to your logic, biology, mechanical, or creative styles.
            </p>
          </div>
        </div>

        {/* Detailed Stream Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
              Time Horizon: {selectedStream.durationRange}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              {selectedStream.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed whitespace-pre-line font-sans">
              {selectedStream.fullDesc}
            </p>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                👍 Pros / Advantages
              </h4>
              <ul className="space-y-2">
                {selectedStream.pros.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-emerald-950 font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
                ⚠️ Challenges / Cons
              </h4>
              <ul className="space-y-2">
                {selectedStream.cons.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs text-rose-950 font-sans leading-relaxed">
                    <HelpCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Courses / Branches Accordion */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Popular Specialty Courses & Branches
            </h3>
            
            {/* Friendly guidance introduction */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              <p className="font-bold text-blue-800 flex items-center gap-1.5 mb-1">
                <span>💡 Guidance Counselor Note: Explore Your Options</span>
              </p>
              Each sub-discipline below leads to different technical outcomes, industry scales, and everyday duties. To help you visualize your career fit, we have detailed the critical curriculum and prospective careers. <strong>Please select a division below to see its exact course combinations</strong>, then select any combination to view its complete prospectus.
            </div>

            {selectedStream?.id === '12th_intermediate' && (
              <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-100 rounded-2xl w-full sm:w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('science');
                    setSelectedCourse(null);
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeCategory === 'science'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Science Combinations
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('commerce');
                    setSelectedCourse(null);
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeCategory === 'commerce'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Commerce Combinations
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('arts');
                    setSelectedCourse(null);
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeCategory === 'arts'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Arts / Humanities
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(() => {
                const coursesToRender = selectedStream?.id === '12th_intermediate'
                  ? selectedStream.courses.filter(course => {
                      if (activeCategory === 'science') {
                        return ['PCM', 'PCMC', 'PCME', 'PCMB', 'PCMS', 'PCB', 'PCBZ', 'PCBH'].some(prefix => course.name.startsWith(prefix));
                      } else if (activeCategory === 'commerce') {
                        return ['CEBA', 'SEBA', 'HEBA', 'ABMS', 'EBAC', 'BSBA', 'CSBA'].some(prefix => course.name.startsWith(prefix));
                      } else if (activeCategory === 'arts') {
                        return ['HEPS', 'HEPP', 'HESP', 'EPS', 'JPE'].some(prefix => course.name.startsWith(prefix));
                      }
                      return true;
                    })
                  : selectedStream.courses;

                return coursesToRender.map((course, idx) => {
                  const courseId = `stream-pathway-${course.name.replace(/\s+/g, '-').toLowerCase()}`;
                  const isSaved = isPathwaySaved(courseId);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedCourse(course)}
                      className="border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 group text-left relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {course.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSavedPathway({
                              id: courseId,
                              title: `${course.name} Academic Pathway`,
                              type: 'STREAM',
                              institute: `${selectedStream?.title || 'Academic Stream'} Track`
                            });
                          }}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                            isSaved
                              ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100'
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          }`}
                          title={isSaved ? "Saved to profile" : "Save course pathway"}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        Duration: {course.duration}
                      </div>
                      <p className="text-xs text-slate-655 mt-2 line-clamp-2 font-medium">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-blue-600 font-bold group-hover:underline">
                          Prospectus →
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                              detail: { 
                                tab: 'specializations',
                                degreePreset: course.name,
                                degreePresetToSpec: true
                              } 
                            }));
                          }}
                          className="bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-3xs active:scale-95"
                        >
                          Expert Hub <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse ? (() => {
        const course = selectedCourse as CourseDetail;
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 relative">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 border border-slate-100 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
              >
              <Minimize2 className="w-5 h-5" />
            </button>

            <div>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                Prospectus Preview
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Study Duration: {course.duration}</p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {course.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                🎯 Minimum Eligibility Criteria
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {course.eligibility}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-widest">
                  📚 Key Subjects & Branches
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.branches.map((b: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                          detail: { 
                            tab: 'specializations',
                            degreePreset: b,
                            degreePresetToSpec: true
                          } 
                        }));
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer border border-slate-200 hover:border-slate-300 active:scale-95 flex items-center gap-1 font-bold"
                    >
                      {b}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-widest">
                  {selectedStreamId === '12th_intermediate' 
                    ? '🎓 Recommended Degree Courses After PUC' 
                    : '🚀 Practical Career Roles / Pathways'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.careerProspects.map((c: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                          detail: { 
                            tab: 'specializations',
                            degreePreset: c,
                            degreePresetToSpec: true
                          } 
                        }));
                      }}
                      className="bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer border border-blue-100 hover:border-blue-600 active:scale-95 shadow-3xs flex items-center gap-1 font-bold"
                    >
                      {c}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* HIGH-FIDELITY DEGREE AND CAREER PATHWAY PROGRESSION TIMELINE */}
            {(() => {
              const roadmap = getRoadmapForCourse(course.name, selectedStreamId || '');
              return (
                <div className="border-t border-slate-100 pt-6 mt-6 space-y-5">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-blue-50 rounded-xl text-blue-700 mt-0.5">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                        🗺️ Future College Degree & Career Roadmap
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        A full chronological projections mapping from this course up to choosing high-tier degrees and peak industry roles.
                      </p>
                    </div>
                  </div>

                  <div className="relative border-l-2 border-slate-100 pl-6 ml-3.5 space-y-8 py-2">
                    {/* Step 1 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-100 border-4 border-blue-600 shadow-sm" />
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Step 1: Immediate Milestones
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">(0 - 1 Years)</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 leading-normal">
                          {roadmap.step1Title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                          {roadmap.step1Desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {roadmap.step1Milestones.map((ms, idx) => (
                            <span key={idx} className="bg-slate-50 text-slate-700 text-[10px] border border-slate-200 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                              {ms}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-pink-100 border-4 border-pink-500 shadow-sm" />
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Step 2: Recommended College Degrees
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">(3 - 4 Years)</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 leading-normal font-sans">
                          {roadmap.step2Title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                          {roadmap.step2Desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {roadmap.step2Milestones.map((ms, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                  detail: { 
                                    tab: 'specializations',
                                    degreePreset: ms,
                                    degreePresetToSpec: true
                                  } 
                                }));
                              }}
                              className="bg-pink-50/50 hover:bg-pink-100 text-pink-700 text-[10px] border border-pink-100 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-3xs"
                            >
                              <GraduationCap className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                              {ms}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-100 border-4 border-emerald-500 shadow-sm" />
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Step 3: Advanced Specializations
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">(2 Years PG)</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 leading-normal font-sans">
                          {roadmap.step3Title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                          {roadmap.step3Desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {roadmap.step3Milestones.map((ms, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => {
                                // Try to find a degree related to this specialization to filter the hub
                                // Or just go to the hub
                                window.dispatchEvent(new CustomEvent('navigate-tab-with-search', { 
                                  detail: { 
                                    tab: 'specializations',
                                    degreePreset: ms,
                                    degreePresetToSpec: true
                                  } 
                                }));
                              }}
                              className="bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800 text-[10px] border border-emerald-100 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-3xs"
                            >
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              {ms}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-100 border-4 border-indigo-600 shadow-md animate-pulse" />
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Step 4: Peak Professional Careers
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">(Industry Destination)</span>
                        </div>
                        <h5 className="text-xs font-bold text-indigo-900 leading-normal font-sans">
                          {roadmap.step4Title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                          {roadmap.step4Desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {roadmap.step4Milestones.map((ms, idx) => (
                            <span key={idx} className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-2.5 py-0.5 rounded-lg font-extrabold flex items-center gap-1 transition-all shadow-xs leading-normal cursor-default">
                              <Milestone className="w-3 h-3 text-yellow-300 shrink-0" />
                              {ms}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedCourse(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-6 rounded-lg cursor-pointer transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
        );
      })() : null}

      {/* 110 Specializations Directory Modal */}
      {showSpecializationsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in text-slate-850">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative select-none">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/40">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-650 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest font-mono">
                    Engineering Specialized Streams Hub
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {ENGINEERING_SPECIALIZATIONS_DATABASE.length} Dynamic Curriculums
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight flex items-center gap-1.5">
                  <Layers className="w-5 h-5 text-indigo-600" /> B.E. / B.Tech Specialized Branches
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowSpecializationsModal(false);
                  setActiveSpecialization(null);
                }}
                className="text-slate-400 hover:text-slate-600 border border-slate-200 p-2 rounded-full hover:bg-white transition-all shadow-3xs cursor-pointer focus:outline-none"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200/60 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, subject, or career role description..."
                    value={specSearchQuery}
                    onChange={(e) => setSpecSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 placeholder-slate-400/80 transition-all shadow-3xs"
                  />
                </div>

                {/* Category Dropdown/Selector */}
                <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-3xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={specCategoryFilter}
                    onChange={(e) => setSpecCategoryFilter(e.target.value)}
                    className="bg-transparent border-0 py-1 text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">All Academic Categories ({ENGINEERING_SPECIALIZATIONS_DATABASE.length})</option>
                    <option value="CS & Computational">CS & Computational</option>
                    <option value="Electronics & Controls">Electronics & Controls</option>
                    <option value="Mechanical & Aerospace">Mechanical & Aerospace</option>
                    <option value="Biotech & Chemical">Biotech & Chemical</option>
                    <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                    <option value="Industrial & Management">Industrial & Management</option>
                  </select>
                </div>
              </div>

              {/* Quick Preset Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none whitespace-nowrap">
                <span className="text-[9px] font-black text-slate-450 uppercase tracking-wider font-mono mr-1">Categories:</span>
                {['all', 'CS & Computational', 'Electronics & Controls', 'Mechanical & Aerospace', 'Biotech & Chemical', 'Civil & Infrastructure', 'Industrial & Management'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSpecCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                      specCategoryFilter === cat
                        ? 'bg-indigo-650 border-indigo-650 text-white shadow-3xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-350'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body - List & Detail Splitscreen */}
            <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-50/30">
              
              {/* Left Column: List */}
              <div className={`w-full ${activeSpecialization ? 'hidden lg:block lg:w-[45%]' : 'w-full'} border-r border-slate-100 overflow-y-auto p-4 sm:p-6 space-y-3`}>
                <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono pb-1 border-b border-slate-100">
                  <span>Specialized Division Lists</span>
                  <span>{
                    ENGINEERING_SPECIALIZATIONS_DATABASE.filter(spec => {
                      const matchesSearch = spec.name.toLowerCase().includes(specSearchQuery.toLowerCase()) || 
                                            spec.description.toLowerCase().includes(specSearchQuery.toLowerCase()) ||
                                            spec.subjects.some(s => s.toLowerCase().includes(specSearchQuery.toLowerCase())) ||
                                            spec.roles.some(r => r.toLowerCase().includes(specSearchQuery.toLowerCase()));
                      const matchesCategory = specCategoryFilter === 'all' || spec.category === specCategoryFilter;
                      return matchesSearch && matchesCategory;
                    }).length
                  } matched</span>
                </div>

                <div className="space-y-2.5">
                  {ENGINEERING_SPECIALIZATIONS_DATABASE.filter(spec => {
                    const matchesSearch = spec.name.toLowerCase().includes(specSearchQuery.toLowerCase()) || 
                                          spec.description.toLowerCase().includes(specSearchQuery.toLowerCase()) ||
                                          spec.subjects.some(s => s.toLowerCase().includes(specSearchQuery.toLowerCase())) ||
                                          spec.roles.some(r => r.toLowerCase().includes(specSearchQuery.toLowerCase()));
                    const matchesCategory = specCategoryFilter === 'all' || spec.category === specCategoryFilter;
                    return matchesSearch && matchesCategory;
                  }).length > 0 ? (
                    ENGINEERING_SPECIALIZATIONS_DATABASE.filter(spec => {
                      const matchesSearch = spec.name.toLowerCase().includes(specSearchQuery.toLowerCase()) || 
                                            spec.description.toLowerCase().includes(specSearchQuery.toLowerCase()) ||
                                            spec.subjects.some(s => s.toLowerCase().includes(specSearchQuery.toLowerCase())) ||
                                            spec.roles.some(r => r.toLowerCase().includes(specSearchQuery.toLowerCase()));
                      const matchesCategory = specCategoryFilter === 'all' || spec.category === specCategoryFilter;
                      return matchesSearch && matchesCategory;
                    }).map((spec) => (
                      <button
                        key={spec.rank}
                        onClick={() => setActiveSpecialization(spec)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center gap-4 cursor-pointer focus:outline-none ${
                          activeSpecialization?.rank === spec.rank
                            ? 'bg-indigo-50/50 border-2 border-indigo-600 ring-4 ring-indigo-50/30'
                            : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-200'
                        }`}
                      >
                        <div className="space-y-1 flex-1 min-w-0 pr-2">
                          <div className="flex items-center flex-wrap gap-1.5">
                            <span className="bg-slate-100 text-slate-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                              #{spec.rank}
                            </span>
                            <span className="bg-indigo-50 text-indigo-700 text-[8px] font-extrabold px-2 py-0.5 rounded">
                              {spec.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-slate-800 leading-tight truncate">
                            {spec.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold leading-normal truncate font-sans">
                            {spec.description}
                          </p>
                        </div>

                        {/* Popularity Display */}
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-extrabold text-indigo-500 font-mono tracking-wider block">Wgt: {spec.weight}</span>
                          <span className="inline-block mt-1 text-[10px] text-blue-600 font-bold uppercase tracking-tight group-hover:underline">
                            Details &rarr;
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400 bg-white border border-slate-100/50 rounded-2xl">
                      <p className="text-xs font-bold font-sans">No matching specialization courses found.</p>
                      <button
                        onClick={() => { setSpecSearchQuery(''); setSpecCategoryFilter('all'); }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-850 font-bold underline mt-2 bg-transparent cursor-pointer"
                      >
                        Reset search filters and show all items
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Detailed Pane */}
              <div className={`${activeSpecialization ? 'block w-full lg:w-[55%]' : 'hidden lg:block lg:w-[55%]'} overflow-y-auto p-6 sm:p-8 bg-white border-l border-slate-100 relative`}>
                {activeSpecialization ? (
                  <div className="space-y-6 text-left animate-fade-in animate-duration-300">
                    {/* Mobile Back Button */}
                    <button
                      onClick={() => setActiveSpecialization(null)}
                      className="inline-flex lg:hidden items-center gap-1.5 text-xs text-slate-500 font-bold hover:text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg mb-4 cursor-pointer"
                    >
                      &larr; Back to Specializations list
                    </button>

                    <div className="flex justify-between items-start gap-3 pb-4 border-b border-slate-100">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                            {activeSpecialization.category}
                          </span>
                          <span className={`border text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                            activeSpecialization.demand.includes('Critical') 
                              ? 'bg-rose-50 text-rose-700 border-rose-100' 
                              : activeSpecialization.demand.includes('Emerging')
                              ? 'bg-amber-50 text-amber-700 border-amber-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}>
                            {activeSpecialization.demand}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                          <span className="text-indigo-600">#{activeSpecialization.rank}</span> {activeSpecialization.name}
                        </h3>
                      </div>

                      <div className="bg-indigo-50/60 border border-indigo-100/60 p-3 rounded-2xl text-right font-sans shrink-0 min-w-[100px]">
                        <span className="text-[8px] font-black text-indigo-700 uppercase tracking-widest block font-mono">Popularity</span>
                        <div className="flex items-baseline justify-end gap-1 pt-0.5">
                          <span className="text-lg font-black text-indigo-950 font-mono">{activeSpecialization.weight}</span>
                          <span className="text-[9px] text-indigo-500 font-bold">/ 100</span>
                        </div>
                      </div>
                    </div>

                    {/* Scope & Syllabus */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">disciplinary scope & outline</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {activeSpecialization.description}
                      </p>
                    </div>

                    {/* Sub-grid of Syllabus Subjects */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                      <h4 className="text-[10px] font-black text-indigo-850 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-indigo-100">
                        <BookOpen className="w-4 h-4 text-indigo-600" /> Key Curriculum Subjects ({activeSpecialization.subjects.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeSpecialization.subjects.map((sub, i) => (
                          <span
                            key={sub}
                            className="bg-white border border-slate-200 shadow-3xs text-[11px] font-bold text-slate-700 px-3 py-1.5 rounded-xl block transition-all hover:border-indigo-300"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Industry Roles Breakdown */}
                    <div className="border border-slate-200 p-5 rounded-2xl space-y-3 bg-white">
                      <h4 className="text-[10px] font-black text-emerald-850 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-emerald-100">
                        <Briefcase className="w-4 h-4 text-emerald-600" /> Placement Pathways & Corporate Roles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeSpecialization.roles.map((role, i) => (
                          <span
                            key={role}
                            className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[11px] font-extrabold px-3 py-1.5 rounded-xl block"
                          >
                            💼 {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-400 space-y-3 animate-fade-in">
                    <Layers className="w-12 h-12 text-slate-300" />
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400 font-mono tracking-widest">Selected Specialization Breakdown</p>
                      <p className="text-xs text-slate-500 font-semibold mt-1 max-w-sm leading-relaxed">
                        Select any of the {ENGINEERING_SPECIALIZATIONS_DATABASE.length} specialization streams from the left sidebar panel to analyze their key syllabi, popularity weight scores, and industry hiring roles.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer / Direct closing */}
            <div className="p-4 border-t border-slate-100 text-right bg-slate-50 flex justify-between items-center bg-slate-100/50">
              <span className="text-[10px] text-slate-400 font-bold">Specialized Curriculum Index Navigator</span>
              <button
                onClick={() => {
                  setShowSpecializationsModal(false);
                  setActiveSpecialization(null);
                }}
                className="bg-indigo-650 hover:bg-slate-900 border border-indigo-600/20 text-white font-black text-xs py-2 px-6 rounded-xl cursor-pointer transition-all shadow-3xs hover:shadow-xs focus:outline-none"
              >
                Close Specializations View
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
