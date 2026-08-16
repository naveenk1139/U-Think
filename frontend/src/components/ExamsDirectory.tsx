import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTrackedExams } from '../hooks/useTrackedExams';
import { useReminders } from '../hooks/useReminders';
import { useSavedPathways } from '../hooks/useSavedPathways';
import { Search, BookOpen, GraduationCap, Award, Filter, ArrowRight, X, Bookmark, Bell, Briefcase, CheckCircle2, Milestone, ArrowUpRight, HelpCircle, Sparkles, Building, Landmark, Compass, ShieldAlert, BadgeCheck, Clock, Calendar, TrendingUp, UserCheck, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface ExamsDirectoryProps {
  initialTab?: 'exams' | 'degrees' | 'specializations';
  onNavigateToSpec?: (specId: string) => void;
  onNavigateToJobExplorer?: (role: string) => void;
}

import { BACHELOR_DEGREES_DATABASE } from '../data/bachelorDegrees';
import { ENGINEERING_SPECIALIZATIONS_DATABASE } from '../data/engineeringSpecializations';
import { MEDICAL_SPECIALIZATIONS_DATABASE } from '../data/medicalSpecializations';
import { COMMERCE_SPECIALIZATIONS_DATABASE, ARTS_SPECIALIZATIONS_DATABASE, SCIENCE_SPECIALIZATIONS_DATABASE, LAW_SPECIALIZATIONS_DATABASE } from '../data/genericSpecializations';
import { MARITIME_AVIATION_SPECIALIZATIONS_DATABASE } from '../data/maritimeAviationSpecializations';
import { MANAGEMENT_SPECIALIZATIONS_DATABASE, PARAMEDICAL_SPECIALIZATIONS_DATABASE, ANIMATION_SPECIALIZATIONS_DATABASE, PHARMACY_SPECIALIZATIONS_DATABASE, MASS_COMM_SPECIALIZATIONS_DATABASE, HOTEL_MGT_SPECIALIZATIONS_DATABASE, AVIATION_SPECIALIZATIONS_DATABASE, DESIGN_SPECIALIZATIONS_DATABASE, ARCHITECTURE_SPECIALIZATIONS_DATABASE, NATIONAL_COURSES_SPECIALIZATIONS_DATABASE, VOCATIONAL_SPECIALIZATIONS_DATABASE, DENTAL_SPECIALIZATIONS_DATABASE, VETERINARY_SPECIALIZATIONS_DATABASE, RELIGIOUS_SPECIALIZATIONS_DATABASE, COMPUTING_IT_SPECIALIZATIONS_DATABASE, BSC_SPECIALIZATIONS_DATABASE } from '../data/moreSpecializations';
import { DEFENCE_PE_SPECIALIZATIONS_DATABASE, EDUCATION_TEACHING_SPECIALIZATIONS_DATABASE, AGRICULTURE_SPECIALIZATIONS_DATABASE } from '../data/newSpecializations';
import { USER_SPECIALIZATIONS_DATABASE } from '../data/userSpecializations';
import NEW_SPECS_DATA from '../data/newSpecializations.json';
import SpecializationDetailView from './SpecializationDetailView';

// Hardcoded comprehensive exams list extracted from StreamsList.tsx & common knowledge
import { EXAMS_DB } from '../data/exams';

const getSubjectsForDegree = (name: string, fullName: string, category: string): string[] => {
  const normName = name.toLowerCase();
  const normFull = fullName.toLowerCase();

  if (normName.includes('cse') || normName.includes('computer science') || normName.includes('cs')) {
    return [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems (DBMS)',
      'Operating Systems & Kernel Design',
      'Computer Networks & Security',
      'Theory of Computation & Compiler',
      'Software Engineering Methodologies',
      'Web Technologies & App Development'
    ];
  }
  if (normName.includes('it') || normFull.includes('information technology')) {
    return [
      'Information Systems & Architecture',
      'Database Systems & Administration',
      'Network Routing & Switching',
      'Cloud Computing & Virtualization',
      'Cyber Security & Cryptography',
      'Enterprise App Development',
      'System Analysis & Design',
      'IT Project Management'
    ];
  }
  if (normName.includes('ece') || normFull.includes('electronics')) {
    return [
      'Analog & Digital Circuits',
      'Microprocessors & Microcontrollers',
      'Signals & Systems Analysis',
      'Electromagnetic Fields & Waves',
      'Digital Signal Processing (DSP)',
      'VLSI Design & Fabrication',
      'Embedded Systems & IoT',
      'Wireless & Satellite Communication'
    ];
  }
  if (normName.includes('eee') || normFull.includes('electrical')) {
    return [
      'Electric Circuits & Network Theory',
      'Electrical Machines & Generators',
      'Power Electronics & Drives',
      'Control Systems Engineering',
      'Power Systems Transmission',
      'Renewable Energy Grid Integration',
      'High Voltage Engineering',
      'Electrical Measurements'
    ];
  }
  if (normName.includes('me') || normFull.includes('mechanical')) {
    return [
      'Engineering Thermodynamics',
      'Fluid Mechanics & Machinery',
      'Strength of Materials',
      'Kinematics & Dynamics of Machines',
      'Manufacturing Processes & CAD/CAM',
      'Heat & Mass Transfer',
      'Automotive Systems Engineering',
      'Refrigeration & Air Conditioning'
    ];
  }
  if (normName.includes('civil') || normFull.includes('civil')) {
    return [
      'Structural Analysis & Design',
      'Concrete Technology & Steel Structures',
      'Fluid Mechanics & Hydraulics',
      'Geotechnical Engineering & Soil Mechanics',
      'Surveying & Levelling Operations',
      'Transportation & Highway Engineering',
      'Environmental Water Resources',
      'Construction Project Management'
    ];
  }
  if (normName.includes('ai') || normName.includes('machine learning')) {
    return [
      'Mathematical Foundations of AI',
      'Supervised & Unsupervised Learning',
      'Neural Networks & Deep Learning',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Processing',
      'Reinforcement Learning & Agents',
      'AI Ethics, Bias & Governance',
      'Data Pipelines & MLOps Infrastructure'
    ];
  }
  if (normName.includes('cyber') || normName.includes('security')) {
    return [
      'Fundamentals of Cryptography',
      'Network Security & Firewalls',
      'Ethical Hacking & Penetration Testing',
      'Operating System & Kernel Hardening',
      'Digital Forensics & Incident Response',
      'Cyber Laws, Auditing & Compliance',
      'Application Security & DevSecOps',
      'Malware Analysis & Reverse Engineering'
    ];
  }
  if (normName.includes('data science') || normName.includes('analytics')) {
    return [
      'Statistical Methods & Probability',
      'Data Wrangling & Exploratory Analysis',
      'Predictive Modeling & Regression',
      'Big Data Engineering with Spark/Hadoop',
      'Data Visualization & Business Intelligence',
      'Machine Learning Algorithms',
      'Database Technologies (SQL/NoSQL)',
      'Advanced Python & R for Analytics'
    ];
  }
  if (normName === 'mbbs' || normFull.includes('medicine')) {
    return [
      'Anatomy & Embryology',
      'Human Physiology & Biophysics',
      'Medical Biochemistry',
      'Pathology & Microbiology',
      'Pharmacology & Therapeutics',
      'Forensic Medicine & Toxicology',
      'Community Medicine & Epidemiology',
      'General Medicine & Pediatrics',
      'General Surgery & Orthopedics',
      'Obstetrics & Gynecology'
    ];
  }
  if (normName === 'bds' || normFull.includes('dental')) {
    return [
      'General Human Anatomy & Histology',
      'Dental Anatomy & Oral Embryology',
      'General Pathology & Microbiology',
      'General & Dental Pharmacology',
      'Dental Materials Science',
      'Oral Pathology & Medicine',
      'Oral & Maxillofacial Surgery',
      'Prosthodontics & Crown/Bridge',
      'Orthodontics & Dentofacial Orthopedics',
      'Conservative Dentistry & Endodontics'
    ];
  }
  if (normName.includes('bds') || normFull.includes('dental')) {
    return [
      'Oral Anatomy & Histology',
      'General Human Physiology',
      'Dental Materials Science',
      'Oral Pathology & Microbiology',
      'Conservative Dentistry',
      'Orthodontics & Dentofacial Orthopedics',
      'Oral & Maxillofacial Surgery',
      'Periodontology',
      'Prosthodontics & Crown Bridge',
      'Pedodontics & Preventive Dentistry'
    ];
  }
  if (normName.includes('b.voc') || normFull.includes('vocational')) {
    return [
      'Practical Skill Development',
      'Industry Apprenticeship',
      'Technical Communication',
      'Entrepreneurship Development',
      'Applied Computer Skills',
      'Workplace Ethics & Safety',
      'Domain Specific Technology',
      'Project Management',
      'Quality Standards & Compliance',
      'Digital Literacy'
    ];
  }
  if (normName.includes('b.tech') || normName.includes('b.e.') || normFull.includes('engineering')) {
    return [
      'Engineering Mathematics',
      'Physics for Engineers',
      'Computer Programming & Data Structures',
      'Digital Logic & Design',
      'Thermodynamics & Fluid Mechanics',
      'Electronic Circuits & Analysis',
      'Software Engineering & DevOps',
      'Artificial Intelligence & Cloud',
      'Environmental Engineering',
      'Professional Ethics & Management'
    ];
  }
  if (normName.includes('bba') || normName.includes('bms') || normFull.includes('management')) {
    return [
      'Principles of Management',
      'Organizational Behavior',
      'Financial Accounting',
      'Marketing Management',
      'Human Resource Management',
      'Business Statistics',
      'Operations & Logistics',
      'Entrepreneurship & Startups',
      'International Business',
      'Corporate Governance'
    ];
  }
  if (normName.includes('b.com') || normFull.includes('commerce')) {
    return [
      'Financial & Cost Accounting',
      'Corporate Law & Secretarial Practice',
      'Business Economics',
      'Banking & Insurance',
      'Auditing & Assurance',
      'Indirect Tax & GST',
      'Investment Management',
      'E-Commerce & Digital Trends',
      'Financial Markets',
      'Management Accounting'
    ];
  }
  if (normName.includes('ll.b') || normFull.includes('law')) {
    return [
      'Constitutional Law',
      'Criminal Law & Procedure',
      'Contract Law',
      'Family Law',
      'Environmental Law',
      'Intellectual Property Rights',
      'Administrative Law',
      'Public International Law',
      'Civil Procedure Code',
      'Legal Ethics & Research'
    ];
  }
  if (normName.includes('animation') || normFull.includes('animation') || normFull.includes('vfx')) {
    return [
      '2D & 3D Animation Principles',
      'Digital Sculpting & Modeling',
      'Visual Effects (VFX) & Compositing',
      'Character Design & Rigging',
      'Storyboarding & Scriptwriting',
      'Motion Graphics & Cinematography',
      'Lighting & Rendering Techniques',
      'Game Design & UI/UX',
      'Texturing & Shading',
      'Stop Motion & Experimental Animation'
    ];
  }
  if (normName.includes('mbbs') || normName.includes('bds') || normFull.includes('medical') || normName.includes('b.sc med')) {
    return [
      'Human Anatomy & Histology',
      'Human Physiology & Biophysics',
      'Biochemistry & Molecular Biology',
      'Pathology & Microbiology',
      'Pharmacology & Therapeutics',
      'Forensic Medicine & Toxicology',
      'Community Medicine & Epidemiology',
      'General Medicine & Surgery',
      'Obstetrics & Gynaecology',
      'Pediatrics & Clinical Specialties'
    ];
  }
  if (normName.includes('bvsc') || normFull.includes('veterinary')) {
    return [
      'Veterinary Anatomy',
      'Veterinary Physiology & Biochemistry',
      'Livestock Production Management',
      'Veterinary Microbiology & Pathology',
      'Animal Nutrition & Genetics',
      'Veterinary Pharmacology & Toxicology',
      'Veterinary Surgery & Radiology',
      'Veterinary Gynaecology & Obstetrics',
      'Veterinary Medicine',
      'Animal Husbandry Extension Education'
    ];
  }
  if (normName.includes('pharm') || normFull.includes('pharmacy')) {
    return [
      'Pharmaceutical Chemistry & Analysis',
      'Pharmaceutics & Drug Formulations',
      'Pharmacognosy & Phytochemistry',
      'Human Anatomy & Pathophysiology',
      'Pharmacology & Toxicology',
      'Clinical & Hospital Pharmacy',
      'Industrial Pharmacy Operations',
      'Pharmaceutical Jurisprudence & Ethics'
    ];
  }
  if (normName.includes('nursing')) {
    return [
      'Anatomy, Physiology & Nutrition',
      'Foundations of Nursing Practice',
      'Medical-Surgical Nursing Care',
      'Community Health Nursing',
      'Child Health Nursing & Pediatrics',
      'Mental Health Nursing & Psychiatry',
      'Midwifery & Obstetrical Nursing',
      'Nursing Research & Administration'
    ];
  }
  if (normName.includes('bca') || normName.includes('b.ca')) {
    return [
      'Foundations of Computing',
      'Programming in C++ & Java',
      'Software Engineering & UML',
      'Database Management Systems',
      'Web Application Design',
      'Data Structures using C++',
      'Operating Systems Basics',
      'Cloud Computing Foundations'
    ];
  }
  if (normName.includes('bba') || normName.includes('b.b.a')) {
    return [
      'Principles of Management',
      'Organizational Behavior',
      'Financial & Management Accounting',
      'Marketing Management & Strategy',
      'Human Resource Management (HRM)',
      'Business Law & Corporate Governance',
      'Managerial Economics',
      'Entrepreneurship & Startup Launch'
    ];
  }
  if (normName === 'b.com' || normName.includes('bcom')) {
    return [
      'Financial Accounting Standards',
      'Corporate Law & Secretarial Practice',
      'Business Mathematics & Statistics',
      'Direct & Indirect Taxation (GST)',
      'Cost & Management Accounting',
      'Auditing & Assurance Services',
      'Indian Financial System & Markets',
      'E-Commerce & Digital Commerce'
    ];
  }
  if (normName === 'llb' || normName.includes('law')) {
    return [
      'Constitutional Law of India',
      'Jurisprudence & Legal Theory',
      'Law of Contracts & Mercantile Law',
      'Law of Crimes & Penal Code',
      'Family Law & Personal Laws',
      'Law of Torts & Consumer Protection',
      'Code of Civil & Criminal Procedure',
      'Public International Law & Treaties'
    ];
  }
  if (normName === 'b.arch' || normFull.includes('architecture')) {
    return [
      'Architectural Design & Studio',
      'Building Construction & Materials',
      'Theory of Design & Architecture History',
      'Structural Mechanics & Analysis',
      'Architectural Drawing & Graphics',
      'Building Services & Climate Science',
      'Urban Planning & Landscape Design',
      'Professional Practice & Project Estimation'
    ];
  }
  if (normName.includes('b.des') || normName.includes('bdes') || normFull.includes('design')) {
    return [
      'Design Fundamentals & Form Study',
      'Drawing & Visual Representation',
      'Material & Prototype Fabrication',
      'Design History, Culture & Aesthetics',
      'Digital Design Tools & CAD Suite',
      'Ergonomics & Human-Centered Design',
      'Design Thinking & Iteration Methods',
      'Portfolio Development & Industry Pitch'
    ];
  }
  if (normName === 'bhm' || normFull.includes('hotel')) {
    return [
      'Food Production & Culinary Arts',
      'Food & Beverage Service Operations',
      'Front Office Management & Operations',
      'Housekeeping Services & Administration',
      'Hospitality Accounting & Finance',
      'Hotel Engineering & Maintenance',
      'Human Resource Management in Hospitality',
      'Event & Banquet Management Studies'
    ];
  }
  if (normFull.includes('aviation') || normName.includes('avia')) {
    return [
      'Aviation Meteorology & Weather Systems',
      'Air Navigation & Flight Instruments',
      'Aerodynamics & Aircraft Systems',
      'Airport Operations & Ground Handling',
      'Aviation Safety, Security & Compliance',
      'Air Traffic Control & Radio Procedures',
      'Airline Marketing & Fleet Management',
      'Flight Crew Resource Management'
    ];
  }
  if (normFull.includes('physics') || normName.includes('physics')) {
    return [
      'Classical Mechanics & Relativity',
      'Electromagnetism & Wave Optics',
      'Thermodynamics & Statistical Physics',
      'Quantum Mechanics & Atomic Models',
      'Solid State & Semiconductor Physics',
      'Nuclear & Particle Physics',
      'Mathematical Physics & Methods',
      'Experimental Physics & Lab Practices'
    ];
  }
  if (normFull.includes('chemistry') || normName.includes('chemistry')) {
    return [
      'Inorganic Chemistry & Bond Models',
      'Organic Chemistry & Reaction Mechanisms',
      'Physical Chemistry & Thermodynamics',
      'Analytical Chemistry & Spectroscopy',
      'Polymer & Materials Chemistry',
      'Environmental & Green Chemistry',
      'Biochemistry & Biomolecules',
      'Computational Chemistry Lab'
    ];
  }
  if (normFull.includes('mathematics') || normName.includes('math')) {
    return [
      'Calculus & Real Analysis',
      'Linear Algebra & Vector Spaces',
      'Abstract Algebra & Group Theory',
      'Ordinary & Partial Differential Equations',
      'Complex Analysis & Functions',
      'Numerical Methods & Algorithm Design',
      'Probability & Mathematical Statistics',
      'Discrete Mathematics & Graph Theory'
    ];
  }
  if (category.toLowerCase().includes('agriculture') || normName.includes('agri')) {
    return [
      'Principles of Agronomy & Crop Management',
      'Soil Science, Fertility & Plant Nutrition',
      'Plant Breeding & Genetics',
      'Agricultural Entomology & Pest Control',
      'Plant Pathology & Disease Management',
      'Agricultural Extension & Rural Sociology',
      'Horticultural Science & Breeding',
      'Agricultural Economics & Farm Management'
    ];
  }
  if (normFull.includes('veterinary') || normName.includes('bvsc')) {
    return [
      'Veterinary Anatomy & Physiology',
      'Animal Nutrition & Feed Technology',
      'Veterinary Microbiology & Immunology',
      'Veterinary Pathology & Parasitology',
      'Animal Breeding & Genetics',
      'Livestock Production & Management',
      'Veterinary Pharmacology & Toxicology',
      'Veterinary Surgery & Radiology Clinics'
    ];
  }
  if (normFull.includes('education') || normName.includes('b.ed')) {
    return [
      'Childhood & Growing Up Psychology',
      'Contemporary India & Education Policies',
      'Learning & Teaching Methodologies',
      'Language across the Curriculum',
      'Assessment for Learning',
      'Creating an Inclusive Classroom',
      'Gender, School & Society Dynamics',
      'Pedagogical Subject Instruction Design'
    ];
  }
  if (normFull.includes('journalism') || normName.includes('bjmc') || normFull.includes('mass')) {
    return [
      'Introduction to Journalism & Reporting',
      'History of Mass Media & Ethics',
      'Editing & Layout Design Operations',
      'Broadcast Journalism & TV Production',
      'Public Relations & Advertising Strategy',
      'Digital Media, Blogging & Social Media',
      'Media Law, Constitution & Governance',
      'Media Research & Audience Analysis'
    ];
  }

  // General fallback
  if (category.toLowerCase().includes('medical') || category.toLowerCase().includes('health')) {
    return [
      'Anatomy & Physiology',
      'Clinical Biochemistry',
      'First Aid & Patient Care Procedures',
      'Healthcare Management & Informatics',
      'Clinical Pharmacology Basics',
      'Laboratory Diagnostics Practices'
    ];
  }
  if (category.toLowerCase().includes('science')) {
    return [
      'Scientific Methodology & Research',
      'Mathematical Analysis & Statistics',
      'Laboratory Safety & Instrumentation',
      'Foundational Physical Laws',
      'Computational Tools for Science',
      'Interdisciplinary Science Elective'
    ];
  }
  return [
    'Foundational Theories & Principles',
    'Professional Practice & Ethics',
    'Research Methodology & Analysis',
    'Core Subject Specialty Module I',
    'Practical Case Analysis & Lab',
    'Industry Internship Project Portfolio'
  ];
};

const DEGREES_DB = BACHELOR_DEGREES_DATABASE.map((d, i) => ({
  id: String(i),
  name: d.name,
  fullName: d.fullName,
  category: d.field,
  duration: d.duration,
  subjects: getSubjectsForDegree(d.name, d.fullName, d.field)
}));

const getRolesForDegree = (name: string, fullName: string, category: string): string[] => {
  const nameLower = name.toLowerCase();
  const fullLower = fullName.toLowerCase();
  const catLower = category.toLowerCase();
  
  if (nameLower.includes('cse') || nameLower.includes('computer') || nameLower.includes('software')) {
    return ['Software Engineer', 'Systems Developer', 'IT Consultant', 'Technical Architect', 'Full Stack Developer'];
  }
  if (nameLower.includes('it') || fullLower.includes('information technology')) {
    return ['IT Analyst', 'Systems Administrator', 'Network Engineer', 'Cloud Associate', 'IT Solutions Consultant'];
  }
  if (nameLower.includes('ai') || nameLower.includes('data science') || nameLower.includes('ml')) {
    return ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'AI Research Consultant', 'Business Intelligence Analyst'];
  }
  if (nameLower.includes('cyber') || fullLower.includes('security')) {
    return ['Cyber Security Analyst', 'Information Security Officer', 'Penetration Tester', 'Security Architect', 'Security Incident Responder'];
  }
  if (nameLower.includes('robotics') || nameLower.includes('automation')) {
    return ['Robotics Engineer', 'Automation Consultant', 'Control Systems Developer', 'Mechatronics Specialist'];
  }
  if (nameLower.includes('ece') || nameLower.includes('electronics') || nameLower.includes('telecom')) {
    return ['Electronics Engineer', 'VLSI Design Engineer', 'Telecom Consultant', 'Hardware Engineer', 'RF Engineer'];
  }
  if (nameLower.includes('eee') || nameLower.includes('electrical')) {
    return ['Electrical Engineer', 'Power Grid Consultant', 'Renewable Energy Analyst', 'Control Systems Specialist'];
  }
  if (nameLower.includes('mech') || nameLower.includes('automobile')) {
    return ['Mechanical Design Engineer', 'Automotive Systems Designer', 'Production Supervisor', 'CAD Engineer', 'R&D Engineer'];
  }
  if (nameLower.includes('civil') || nameLower.includes('structural')) {
    return ['Civil Design Engineer', 'Site Consultant', 'Structural Analyst', 'Geotechnical Consultant', 'Project Manager'];
  }
  if (nameLower.includes('biotech') || nameLower.includes('bioinformatics')) {
    return ['Bioinformatics Analyst', 'Biotech Research Associate', 'Clinical Data Manager', 'Biomedical Scientist'];
  }
  if (nameLower.includes('bpt') || nameLower.includes('physiotherapy')) {
    return ['Physiotherapist', 'Sports Therapist', 'Rehabilitation Specialist', 'Clinical Consultant'];
  }
  if (nameLower.includes('b.pharm') || nameLower.includes('pharm.d') || fullLower.includes('pharmacy')) {
    return ['Pharmacist', 'Drug Safety Associate', 'Medical Writer', 'Clinical Pharmacist', 'Regulatory Affairs Specialist'];
  }
  if (nameLower.includes('b.sc nursing') || fullLower.includes('nursing')) {
    return ['Registered Nurse', 'Clinical Nurse Educator', 'Ward Charge Nurse', 'Community Health Advocate'];
  }
  if (nameLower.includes('bds') || fullLower.includes('dental')) {
    return ['Dental Surgeon', 'Dentist', 'Oral Health Specialist', 'Clinical Researcher'];
  }
  if (nameLower.includes('bba') || nameLower.includes('bms') || nameLower.includes('bbm') || nameLower.includes('bbs') || catLower.includes('management')) {
    return ['Management Trainee', 'Business Analyst', 'HR Administrator', 'Operations Executive', 'Strategy Consultant'];
  }
  if (nameLower.includes('b.com') || catLower.includes('commerce')) {
    return ['Financial Accountant', 'Audit Assistant', 'Tax Consultant', 'Accounts Executive', 'Financial Analyst'];
  }
  if (nameLower.includes('design') || nameLower.includes('b.des') || nameLower.includes('bfa') || nameLower.includes('bva')) {
    return ['Creative Designer', 'UX/UI Designer', 'Visual Merchandiser', 'Product Stylist', 'Brand Identity Designer'];
  }
  if (nameLower.includes('aviation') || nameLower.includes('pilot')) {
    return ['Commercial Pilot', 'Flight Operations Officer', 'Aviation Safety Consultant', 'Air Traffic Controller'];
  }
  if (nameLower.includes('nautical') || nameLower.includes('marine')) {
    return ['Deck Officer', 'Marine Engineer', 'Ship Surveyor', 'Port Operations Executive', 'Navigational Officer'];
  }
  if (nameLower.includes('law') || nameLower.includes('llb')) {
    return ['Legal Advisor', 'Advocate / Litigator', 'Corporate Compliance Officer', 'Legal Researcher', 'Arbitrator'];
  }
  if (nameLower.includes('edu') || nameLower.includes('b.ed') || fullLower.includes('education')) {
    return ['High School Teacher', 'Education Counselor', 'Instructional Designer', 'Academic Lead'];
  }
  if (nameLower.includes('media') || nameLower.includes('journalism') || nameLower.includes('bjmc') || nameLower.includes('bmm')) {
    return ['News Journalist', 'Content Creator', 'PR Representative', 'Media Coordinator', 'Digital Strategist'];
  }
  if (catLower.includes('architecture')) {
    return ['Architect', 'Urban Planner', 'Project Manager', 'Design Consultant', 'Construction Site Supervisor'];
  }
  if (catLower.includes('science') || fullLower.includes('physics') || fullLower.includes('chemistry') || fullLower.includes('math')) {
    return ['Scientific Assistant', 'Subject Matter Expert', 'Lab Analyst', 'Research Fellow', 'Technical Consultant'];
  }
  return ['Professional Specialist', 'Consultant', 'Industry Researcher', 'Domain Analyst'];
};

const getDynamicSpecs = (): any[] => {
  const dynamicList: any[] = [];
  
  // Create mapping of existing spec names for fast lookup
  const existingSet = new Set(
    USER_SPECIALIZATIONS_DATABASE.map(s => s.name.toLowerCase().replace(/[^a-z0-9]+/g, ''))
  );

  BACHELOR_DEGREES_DATABASE.forEach((d) => {
    const normName = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    const normFull = d.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '');

    // Check if there is already an entry in USER_SPECIALIZATIONS_DATABASE
    let matchFound = existingSet.has(normName) || existingSet.has(normFull);
    
    if (!matchFound) {
      // Find partial matches to prevent duplicates (e.g. B.Tech Computer Science Engineering vs B.Tech CSE)
      for (const s of USER_SPECIALIZATIONS_DATABASE) {
        const sNorm = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
        if (sNorm.includes(normName) || normName.includes(sNorm) || sNorm.includes(normFull) || normFull.includes(sNorm)) {
          matchFound = true;
          break;
        }
      }
    }

    if (!matchFound) {
      const specRoles = getRolesForDegree(d.name, d.fullName, d.field);
      const specSubjects = getSubjectsForDegree(d.name, d.fullName, d.field);
      
      dynamicList.push({
        name: d.name,
        weight: 8,
        category: d.field,
        demand: 'High Demand',
        description: `Professional undergraduate specialization pathway focusing on ${d.fullName}. Focuses on core competencies, practical laboratory sessions, and industry-oriented certifications.`,
        subjects: specSubjects,
        roles: specRoles,
        rank: 5
      });
    }
  });

  return dynamicList;
};

const getSignificantWords = (name: string): string[] => {
  const ignoreSet = new Set([
    'b.sc', 'bsc', 'b.tech', 'btech', 'm.sc', 'msc', 'b.e.', 'be', 'ba', 'b.a.', 'bca', 'mca', 'bba', 'mba', 'b.com', 'bcom', 'llb', 'llm', 'phd',
    'diploma', 'bachelor', 'master', 'of', 'in', 'and', '&', 'with', 'for', 'to', 'the', 'technology', 'science', 'sciences',
    'engineering', 'management', 'studies', 'applications', 'practice', 'practices', 'allied', 'applied', 'course', 'courses', 'hub',
    'specialization', 'specializations', 'field', 'fields', 'degree', 'degrees', 'major', 'majors', 'minor', 'minors', 'hons', 'honours', 'honors',
    'postgraduate', 'graduate', 'undergraduate', 'diploma', 'certificate', 'general', 'advanced', 'basic', 'applied', 'allopathy', 'ayush',
    'traditional', 'modern', 'systems', 'surgical', 'dental', 'medical', 'clinical', 'health', 'services', 'care', 'assistant', 'associate',
    'technician', 'technologist'
  ]);
  
  const cleanName = name.toLowerCase()
    .replace(/[\(\),\-\/]/g, ' ')
    .replace(/\./g, ' ');
  
  return cleanName.split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && !ignoreSet.has(w));
};

const getCategoryKey = (s: any): string => {
  const normCat = (s.category || 'General').toLowerCase().trim();
  const categoryToIdMap: Record<string, string> = {
    'engineering/ be/ b tech': 'eng',
    'computing & it': 'comp',
    'bsc': 'bsc',
    'pharmacy': 'pharm',
    'management': 'mgmt',
    'vocational courses': 'voc',
    'aviation': 'avia',
    'architecture': 'arch',
    'design': 'des',
    'medical': 'med',
    'paramedical': 'para',
    'dental': 'dent',
    'veterinary': 'vet',
    'education': 'edu',
    'commerce': 'com',
    'arts': 'arts',
    'law': 'law',
    'defence and physical education': 'def',
    'religious and language studies': 'rel',
    'animation': 'anim',
    'mass communication': 'mass',
    'hotel management': 'hm',
    'medical & health sciences': 'med',
    'allopathy — modern medicine': 'med',
    'ayush — traditional medicine systems': 'med',
    'ayush postgraduate degrees': 'med',
    'pg ayush': 'med',
    'pg medical (md)': 'med',
    'pg surgical (ms)': 'med',
    'pg dental (mds)': 'dent',
    'postgraduate diplomas (after mbbs | 2 years)': 'med',
    'postgraduate diplomas': 'med',
    'super specialty dm': 'med',
    'super specialty mch': 'med',
    'research / phd': 'med',
    'engineering & technology': 'eng',
    'computer science & it': 'comp',
    'pure sciences': 'bsc',
    'agriculture & allied sciences': 'bsc',
    'veterinary & agriculture': 'vet',
    'allied health / paramedical ug degrees': 'para',
    'commerce & management': 'mgmt',
    'arts & humanities': 'arts',
    'design, fine arts & performing arts': 'des',
    'hospitality, travel & tourism': 'hm',
    'education & teaching': 'edu',
    'media, communication & journalism': 'mass',
    'social sciences & public services': 'arts',
    'religious & language studies': 'rel',
    'defence & physical education': 'def',
    'maritime & aviation': 'avia',
    'cs & computational': 'comp',
    'finance': 'com',
    'accounting': 'com'
  };
  return categoryToIdMap[normCat] || normCat;
};

const getDeduplicatedSpecs = () => {
  const list = [
    ...USER_SPECIALIZATIONS_DATABASE,
    ...ENGINEERING_SPECIALIZATIONS_DATABASE,
    ...MEDICAL_SPECIALIZATIONS_DATABASE,
    ...COMMERCE_SPECIALIZATIONS_DATABASE,
    ...ARTS_SPECIALIZATIONS_DATABASE,
    ...SCIENCE_SPECIALIZATIONS_DATABASE,
    ...LAW_SPECIALIZATIONS_DATABASE,
    ...MARITIME_AVIATION_SPECIALIZATIONS_DATABASE,
    ...MANAGEMENT_SPECIALIZATIONS_DATABASE,
    ...PARAMEDICAL_SPECIALIZATIONS_DATABASE,
    ...ANIMATION_SPECIALIZATIONS_DATABASE,
    ...PHARMACY_SPECIALIZATIONS_DATABASE,
    ...MASS_COMM_SPECIALIZATIONS_DATABASE,
    ...HOTEL_MGT_SPECIALIZATIONS_DATABASE,
    ...AVIATION_SPECIALIZATIONS_DATABASE,
    ...DESIGN_SPECIALIZATIONS_DATABASE,
    ...ARCHITECTURE_SPECIALIZATIONS_DATABASE,
    ...NATIONAL_COURSES_SPECIALIZATIONS_DATABASE,
    ...VOCATIONAL_SPECIALIZATIONS_DATABASE,
    ...DENTAL_SPECIALIZATIONS_DATABASE,
    ...VETERINARY_SPECIALIZATIONS_DATABASE,
    ...RELIGIOUS_SPECIALIZATIONS_DATABASE,
    ...COMPUTING_IT_SPECIALIZATIONS_DATABASE,
    ...BSC_SPECIALIZATIONS_DATABASE,
    ...DEFENCE_PE_SPECIALIZATIONS_DATABASE,
    ...EDUCATION_TEACHING_SPECIALIZATIONS_DATABASE,
    ...AGRICULTURE_SPECIALIZATIONS_DATABASE,
    ...NEW_SPECS_DATA,
    ...getDynamicSpecs()
  ];
  
  const seenExact = new Set<string>();
  const seenWordsPerCategory: Record<string, Set<string>> = {};
  const deduped: any[] = [];
  
  const excludedNames = [
    'agriculture',
    'horticulture',
    'sericulture',
    'fisheries',
    'others'
  ];
  
  for (const s of list) {
    const key = s.name.toLowerCase().trim();
    if (excludedNames.includes(key)) {
      continue;
    }
    
    // Global exact name check
    if (seenExact.has(key)) {
      continue;
    }
    
    const catKey = getCategoryKey(s);
    const sigWords = getSignificantWords(s.name);
    
    if (catKey !== 'bsc' && sigWords.length > 0) {
      if (!seenWordsPerCategory[catKey]) {
        seenWordsPerCategory[catKey] = new Set<string>();
      }
      
      // Check if any of these words have been seen in this category
      let isDuplicateWord = false;
      for (const word of sigWords) {
        if (seenWordsPerCategory[catKey].has(word)) {
          isDuplicateWord = true;
          break;
        }
      }
      
      if (isDuplicateWord) {
        // One of the core words matched inside the same category, remove/skip this course
        continue;
      }
      
      // Mark words as seen for this category
      for (const word of sigWords) {
        seenWordsPerCategory[catKey].add(word);
      }
    }
    
    seenExact.add(key);
    deduped.push(s);
  }
  
  return deduped;
};

export const SPECS_DB = getDeduplicatedSpecs().map((s, i) => ({
  id: String(i),
  name: s.name,
  category: s.category || 'General',
  trending: (s.weight || 0) >= 10,
  weight: s.weight || 0,
  demand: s.demand || 'High Demand',
  description: s.description || 'Professional course overview and industry-oriented curriculum mapping.',
  subjects: s.subjects || [],
  roles: s.roles || [],
  rank: s.rank || (i % 10) + 1
}));

import DegreeMindMap, { CATEGORIES } from './DegreeMindMap';

const matchesCategory = (
  item: string | { name: string; fullName?: string; category: string }, 
  categoryId: string
) => {
  const normId = categoryId.toLowerCase();
  
  let normCat = '';
  let normName = '';
  let normFullName = '';

  if (typeof item === 'string') {
    normCat = item.toLowerCase();
  } else {
    normCat = (item.category || '').toLowerCase();
    normName = item.name.toLowerCase();
    normFullName = (item.fullName || '').toLowerCase();
  }

  // Exact mapping for the 23 categories for user database items
  const categoryToIdMap: Record<string, string> = {
    'engineering/ be/ b tech': 'eng',
    'computing & it': 'comp',
    'bsc': 'bsc',
    'pharmacy': 'pharm',
    'management': 'mgmt',
    'vocational courses': 'voc',
    'aviation': 'avia',
    'architecture': 'arch',
    'design': 'des',
    'medical': 'med',
    'paramedical': 'para',
    'dental': 'dent',
    'veterinary': 'vet',
    'education': 'edu',
    'commerce': 'com',
    'arts': 'arts',
    'law': 'law',
    'defence and physical education': 'def',
    'religious and language studies': 'rel',
    'animation': 'anim',
    'mass communication': 'mass',
    'hotel management': 'hm',
    'medical & health sciences': 'med',
    'allopathy — modern medicine': 'med',
    'ayush — traditional medicine systems': 'med',
    'ayush postgraduate degrees': 'med',
    'pg ayush': 'med',
    'pg medical (md)': 'med',
    'pg surgical (ms)': 'med',
    'pg dental (mds)': 'dent',
    'postgraduate diplomas (after mbbs | 2 years)': 'med',
    'postgraduate diplomas': 'med',
    'super specialty dm': 'med',
    'super specialty mch': 'med',
    'research / phd': 'med',
    'engineering & technology': 'eng',
    'computer science & it': 'comp',
    'pure sciences': 'bsc',
    'agriculture & allied sciences': 'bsc',
    'veterinary & agriculture': 'vet',
    'allied health / paramedical ug degrees': 'para',
    'commerce & management': 'mgmt',
    'arts & humanities': 'arts',
    'design, fine arts & performing arts': 'des',
    'hospitality, travel & tourism': 'hm',
    'education & teaching': 'edu',
    'media, communication & journalism': 'mass',
    'social sciences & public services': 'arts',
    'religious & language studies': 'rel',
    'defence & physical education': 'def',
    'maritime & aviation': 'avia',
    'cs & computational': 'comp',
    'finance': 'com',
    'accounting': 'com'
  };

  if (categoryToIdMap[normCat] !== undefined) {
    // Skip early return for broad categories that have specialized sub-categories needing granular checks
    const skipEarlyReturn = [
      'commerce & management',
      'medical & health sciences',
      'allopathy — modern medicine',
      'ayush — traditional medicine systems',
      'paramedical',
      'medical',
      'animation',
      'dental',
      'vocational',
      'engineering',
      'management',
      'commerce',
      'science',
      'arts',
      'law'
    ].includes(normCat);

    if (!skipEarlyReturn) {
      return categoryToIdMap[normCat] === normId;
    }
  }

  // 1. Engineering (eng)
  if (normId === 'eng') {
    return (
      normCat.includes('eng') || 
      normCat.includes('tech') || 
      normName.includes('b.tech') || 
      normName.includes('b.e') || 
      normFullName.includes('engineering')
    ) && !normName.includes('marine') && !normName.includes('military');
  }

  // 2. Computing & IT (comp)
  if (normId === 'comp') {
    return (
      normCat.includes('computer') || 
      normCat.includes('it') || 
      normCat.includes('computing') ||
      normName.includes('bca') || 
      normName.includes('cs') || 
      normName.includes('it') || 
      normFullName.includes('computer') || 
      normFullName.includes('information technology')
    );
  }

  // 3. Pharmacy (pharm)
  if (normId === 'pharm') {
    return normName.includes('pharm') || normFullName.includes('pharmacy') || normCat.includes('pharm');
  }

  // 4. Dental (dent)
  if (normId === 'dent') {
    return normName.includes('bds') || normFullName.includes('dental') || normCat.includes('dent');
  }

  // 5. Veterinary (vet)
  if (normId === 'vet') {
    return normName.includes('bvsc') || normFullName.includes('veterinary') || normCat.includes('vet');
  }

  // 6. Paramedical (para)
  if (normId === 'para') {
    return (
      normName.includes('bpt') || 
      normName.includes('bot') || 
      normName.includes('bmlt') || 
      normName.includes('bpo') || 
      normName.includes('baslp') ||
      normName.includes('optom') ||
      normName.includes('nursing') || 
      normName.includes('radiology') || 
      normName.includes('dialysis') || 
      normName.includes('anaesthesia') || 
      normName.includes('cardiac') || 
      normName.includes('perfusion') || 
      normName.includes('operation theatre') ||
      normName.includes('ot tech') ||
      normFullName.includes('nursing') ||
      normFullName.includes('physiotherapy') ||
      normFullName.includes('paramedical') ||
      normCat.includes('para')
    );
  }

  // 7. Medical (med)
  if (normId === 'med') {
    const isSpecialist = normName.includes('bds') || normFullName.includes('dental') ||
                         normName.includes('pharm') || normFullName.includes('pharmacy') ||
                         normName.includes('bvsc') || normFullName.includes('veterinary') ||
                         normName.includes('bpt') || normName.includes('bmlt') || normName.includes('nursing') ||
                         normName.includes('radiology') || normName.includes('dialysis') || normName.includes('anaesthesia');
    return (
      (normCat.includes('med') || normCat.includes('health') || normCat.includes('doctor') || normCat.includes('surgeon')) && !isSpecialist
    );
  }

  // 8. Commerce (com)
  if (normId === 'com') {
    const isCommerceCat = (normCat.includes('commerce') || normCat.includes('finance') || normCat.includes('accounting') || normCat === 'com') && 
                          !normCat.includes('comput') && 
                          !normCat.includes('commun');
    return (
      isCommerceCat &&
      !normName.includes('bba') && !normName.includes('bms') && !normName.includes('bbm') && !normName.includes('bbs')
    );
  }

  // 9. Management (mgmt)
  if (normId === 'mgmt') {
    return (
      (normCat.includes('manage') || 
       normCat.includes('business') || 
       normName.includes('bba') || 
       normName.includes('bms') || 
       normName.includes('bbm') || 
       normName.includes('bbs')) &&
      !normName.includes('b.com') && !normName.includes('bcom')
    );
  }

  // 10. Arts (arts)
  if (normId === 'arts') {
    return normCat.includes('arts') || normCat.includes('humanities');
  }

  // 11. Law (law)
  if (normId === 'law') {
    return normCat.includes('law') || normName.includes('llb') || normFullName.includes('legislative');
  }

  // 12. Education (edu)
  if (normId === 'edu') {
    return normCat.includes('edu') || normCat.includes('teach') || normName.includes('b.ed') || normFullName.includes('education');
  }

  // 13. Vocational (voc)
  if (normId === 'voc') {
    return normCat.includes('voc') || normCat.includes('skill') || normName.includes('d.el.ed') || normName.includes('diploma');
  }

  // 14. Defence (def)
  if (normId === 'def') {
    return normCat.includes('def') || normCat.includes('phys') || normCat.includes('mili') || normCat.includes('sport') || normFullName.includes('defence') || normFullName.includes('sports') || normName.includes('physical');
  }

  // 15. Religious & Languages (rel)
  if (normId === 'rel') {
    return normCat.includes('relig') || normCat.includes('lang') || normFullName.includes('sanskrit') || normFullName.includes('theology');
  }

  // 16. BSc Science (bsc)
  if (normId === 'bsc') {
    const nameLower = normName.toLowerCase();
    const isBsc = nameLower.startsWith('b.sc') || 
                  nameLower.includes(' b.sc') || 
                  nameLower.includes('(b.sc') ||
                  nameLower.startsWith('bsc') || 
                  nameLower.includes(' bsc') ||
                  nameLower.includes('(bsc') ||
                  normFullName.includes('bachelor of science') ||
                  normCat.includes('bsc') ||
                  normCat.includes('pure science') ||
                  normCat.includes('agriculture') ||
                  nameLower.includes('nursing') ||
                  nameLower.startsWith('bmlt') ||
                  nameLower.startsWith('b.optom') ||
                  nameLower.startsWith('bpo') ||
                  nameLower.startsWith('baslp');
    return isBsc;
  }

  // 17. Animation & VFX (anim)
  if (normId === 'anim') {
    return normName.includes('anim') || normFullName.includes('animation') || normFullName.includes('vfx') || normFullName.includes('gaming');
  }

  // 18. Mass Comm (mass)
  if (normId === 'mass') {
    return normCat.includes('media') || normCat.includes('journal') || normCat.includes('comm') || normName.includes('bjmc') || normName.includes('bmm');
  }

  // 19. Hotel Management (hm)
  if (normId === 'hm') {
    return normCat.includes('hotel') || normCat.includes('hospitality') || normCat.includes('tourism') || normName.includes('bhm') || normName.includes('culinary');
  }

  // 20. Aviation (avia)
  if (normId === 'avia') {
    return normCat.includes('avia') || normName.includes('aviation') || normFullName.includes('airport') || normFullName.includes('pilot');
  }

  // 21. Design (des)
  if (normId === 'des') {
    return normCat.includes('design') || normCat.includes('fine arts') || normName.includes('b.des') || normName.includes('bfa') || normName.includes('bva');
  }

  // 22. Architecture (arch)
  if (normId === 'arch') {
    return normCat.includes('arch') || normName.includes('b.arch') || normName.includes('b.plan') || normFullName.includes('architecture') || normFullName.includes('planning');
  }

  return normCat.includes(normId);
};

const SECTORS = [
  { id: 'all', name: 'All Sectors' },
  { id: 'stem', name: 'STEM & Tech' },
  { id: 'health', name: 'Health & Bio' },
  { id: 'biz', name: 'Biz & Law' },
  { id: 'arts', name: 'Arts & Design' },
  { id: 'niche', name: 'Applied & Niche' }
];

const SECTOR_MAPPING: Record<string, string[]> = {
  stem: ['eng', 'comp', 'bsc', 'arch'],
  health: ['med', 'dent', 'pharm', 'para', 'vet'],
  biz: ['com', 'mgmt', 'law', 'hm'],
  arts: ['arts', 'des', 'anim', 'mass'],
  niche: ['voc', 'def', 'rel', 'avia', 'edu']
};

interface CategoryMeta {
  branchName: string;
  branchColor: string;
  shortDesc: string;
  fullOverview: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  mgmt: {
    branchName: "ORANGE BRANCH",
    branchColor: "bg-orange-500",
    shortDesc: "Management degrees focus on leadership, business strategies, operations, and...",
    fullOverview: "Management degrees focus on leadership, business strategies, operations, and organizational behavior. It prepares candidates to manage resources, direct teams, and lead enterprises efficiently."
  },
  com: {
    branchName: "EMERALD BRANCH",
    branchColor: "bg-emerald-500",
    shortDesc: "Commerce is the study of trade, business, and financial transactions. It covers areas like...",
    fullOverview: "Commerce degrees focus on trade, financial markets, accounting, banking, and business transactions. It prepares candidates for careers in auditing, financial planning, and economic analyses."
  },
  arts: {
    branchName: "LIME BRANCH",
    branchColor: "bg-lime-500",
    shortDesc: "Arts and Humanities offer a deep exploration of human society, culture, literature, and creativ...",
    fullOverview: "Arts and Humanities offer a deep exploration of human society, culture, literature, and creative expressions, preparing candidates for diverse fields of critical thought and communications."
  },
  law: {
    branchName: "AMBER BRANCH",
    branchColor: "bg-amber-500",
    shortDesc: "Law is the study of rules, regulations, and legal frameworks governing society. It prepares...",
    fullOverview: "Law is the study of rules, regulations, and legal frameworks governing society. It prepares candidates for legal practice, policy advocacy, judiciary, and corporate compliance."
  },
  med: {
    branchName: "BLUE BRANCH",
    branchColor: "bg-blue-500",
    shortDesc: "Medical sciences encompass the study of human health, diagnostics, therapeutics...",
    fullOverview: "Medical sciences encompass the study of human health, diagnostics, therapeutic care, and surgical interventions to treat illnesses and promote systemic wellness."
  },
  comp: {
    branchName: "SKY BRANCH",
    branchColor: "bg-sky-500",
    shortDesc: "Computing and IT focus on software development, systems architecture, network protocols...",
    fullOverview: "Computing and IT degrees prepare candidates to engineer modern software solutions, analyze complex algorithmic problems, design cloud architectures, and secure cyber networks."
  },
  eng: {
    branchName: "INDIGO BRANCH",
    branchColor: "bg-indigo-500",
    shortDesc: "Engineering degrees apply scientific principles and mathematical logic to construct...",
    fullOverview: "Engineering degrees apply scientific principles and mathematical logic to design, build, and maintain machines, structures, systems, and advanced technology processes."
  },
  pharm: {
    branchName: "ROSE BRANCH",
    branchColor: "bg-rose-500",
    shortDesc: "Pharmacy covers pharmaceutical chemistry, drug formulations, patient pharmacology...",
    fullOverview: "Pharmacy programs focus on pharmaceutical chemistry, drug formulations, clinical pharmacology, and regulatory standards to prepare candidates for secure healthcare roles."
  },
  dent: {
    branchName: "TEAL BRANCH",
    branchColor: "bg-teal-500",
    shortDesc: "Dental surgery covers oral pathology, maxillofacial diagnostics, and restorative orthodontics...",
    fullOverview: "Dental programs study oral healthcare, dental surgeries, preventive medicine, and orthodontic therapies to prepare professional clinical practitioners."
  },
  vet: {
    branchName: "VIOLET BRANCH",
    branchColor: "bg-violet-500",
    shortDesc: "Veterinary medicine studies animal anatomy, pathology, zoological diagnostics...",
    fullOverview: "Veterinary programs focus on animal health, medical treatments, zoological sciences, and livestock pathology to prepare certified veterinary doctors."
  },
  bsc: {
    branchName: "EMERALD BRANCH",
    branchColor: "bg-emerald-500",
    shortDesc: "BSc Science program explores foundational physics, chemistry, biology, mathematics...",
    fullOverview: "Pure Science degrees focus on rigorous foundational chemistry, physics, mathematical proofs, and biological research, powering clinical R&D and analytical careers."
  },
  voc: {
    branchName: "PURPLE BRANCH",
    branchColor: "bg-purple-500",
    shortDesc: "Vocational courses offer hands-on professional apprenticeships and certified technical skills...",
    fullOverview: "Vocational courses offer specialized practical instruction, hands-on mechanical training, and certified technical credentials tailored directly for rapid corporate placement."
  },
  def: {
    branchName: "GREEN BRANCH",
    branchColor: "bg-green-500",
    shortDesc: "Defence and Physical sciences train candidates for military tactics, safety protocols, athletics...",
    fullOverview: "Defence and physical programs emphasize physical education, national security architectures, tactical field training, and sports sciences for defence forces."
  },
  rel: {
    branchName: "INDIGO BRANCH",
    branchColor: "bg-indigo-500",
    shortDesc: "Religious studies and languages examine ancient literature, philological studies...",
    fullOverview: "Religious studies and languages delve into linguistic histories, translation sciences, cultural theology, and global literature to preserve heritage and communication."
  },
  para: {
    branchName: "PINK BRANCH",
    branchColor: "bg-pink-500",
    shortDesc: "Paramedical sciences train allied healthcare workers, laboratory technicians, emergency...",
    fullOverview: "Paramedical programs cover emergency medical technologies, diagnostic radiology, nursing aids, and operation theatre assistance for essential healthcare networks."
  },
  anim: {
    branchName: "BLUE BRANCH",
    branchColor: "bg-blue-500",
    shortDesc: "Animation & VFX teaches 3D modeling, cinema CGI, digital storytelling, computer gaming...",
    fullOverview: "Animation & VFX programs train candidates in 3D graphic pipelines, cinematography visual effects, narrative storyboard modeling, and active computer game design."
  },
  mass: {
    branchName: "TEAL BRANCH",
    branchColor: "bg-teal-500",
    shortDesc: "Mass Communication prepares candidates for journalism, news reporting, PR agencies...",
    fullOverview: "Mass Communication programs study public relations, journalism broadcast networks, digital media operations, and news reporting to train versatile media specialists."
  },
  hm: {
    branchName: "ORANGE BRANCH",
    branchColor: "bg-orange-500",
    shortDesc: "Hotel Management teaches culinary arts, hospitality operations, front desk operations...",
    fullOverview: "Hotel Management programs focus on luxury culinary operations, global hospitality services, travel-tourism coordination, and operational administration."
  },
  avia: {
    branchName: "BLUE BRANCH",
    branchColor: "bg-blue-500",
    shortDesc: "Aviation programs study flight operations, aeronautics navigation, airport logistics...",
    fullOverview: "Aviation programs prepare candidates for flight navigation systems, commercial pilot roles, aircraft engineering systems, and international airport logistics."
  },
  des: {
    branchName: "ORANGE BRANCH",
    branchColor: "bg-orange-500",
    shortDesc: "Design studies apparel design, interior styling, UX layout frameworks, product designs...",
    fullOverview: "Design programs cultivate creative styling, textile engineering, user interface layout design, and spatial architecture mapping for modern aesthetics."
  },
  arch: {
    branchName: "TEAL BRANCH",
    branchColor: "bg-teal-500",
    shortDesc: "Architecture focuses on urban spatial planning, draft designs, civil aesthetics...",
    fullOverview: "Architecture programs explore architectural drawings, urban city masterplanning, structural load mechanics, and landscape design styles."
  },
  edu: {
    branchName: "PURPLE BRANCH",
    branchColor: "bg-purple-500",
    shortDesc: "Education and teaching explores child psychology, pedagogical styles, curriculum plans...",
    fullOverview: "Education programs study developmental learning styles, pedagogical instruction design, academic curriculum development, and school management styles."
  }
};

const SUB_COURSE_MAPPING: Record<string, string[]> = {
  'Computing & IT': [
    'BSc Computer Science', 'BSc IT', 'BSc Data Science', 'BSc AI & ML', 'BSc Cybersecurity',
    'BSc Cloud Computing', 'BSc Software Engineering', 'BSc Blockchain Technology', 'BSc Game Development', 'BSc IoT & Smart Systems'
  ],
  'Medical': [
    'BSc Biology', 'BSc Biochemistry', 'BSc Microbiology', 'BSc Biotechnology', 
    'BSc Zoology', 'BSc Botany', 'BSc Physiology', 'BSc Psychology', 'BSc Nursing',
    'BSc Genetics', 'BSc Immunology', 'BSc Bioinformatics', 'BSc Neuroscience'
  ],
  'Forestry': [
    'BSc Forestry', 'BSc Wildlife Science', 'BSc Environmental Science',
    'BSc Agroforestry', 'BSc Silviculture & Conservation'
  ],
  'Defence': [
    'BSc Defence & Strategic Studies', 'BSc Defence Studies', 'BSc Military Science', 'BSc Security Management',
    'BSc Counter-Terrorism Studies', 'BSc Homeland Security'
  ],
  'Marine & Aviation': [
    'BSc Marine Science', 'BSc Nautical Science', 'BSc Maritime Science', 'BSc Aviation', 'BSc Aeronautical Science', 'BSc Aircraft Maintenance Science', 'BSc Airline and Airport Management',
    'BSc Oceanography', 'BSc Avionics & Flight Systems'
  ],
  'Agriculture & Allied Sciences': [
    'BSc Agriculture', 'BSc Horticulture', 'BSc Fisheries & Aquatic Sciences', 'BSc Sericulture',
    'BSc Agricultural Biotechnology', 'BSc Agronomy & Crop Science', 'BSc Soil & Water Conservation', 'BSc Organic Farming'
  ],
  'Pure Science': [
    'BSc Physics', 'BSc Chemistry', 'BSc Mathematics', 'BSc Statistics', 'BSc Geology', 'BSc Astronomy',
    'BSc Astrophysics', 'BSc Nanotechnology', 'BSc Electronics', 'BSc Meteorology'
  ],
  'Others': [
    'BSc Hospitality and Hotel Administration', 'BSc Fashion Technology', 'BSc Interior Design', 
    'BSc Psychology', 'BSc Sports Science', 'BSc Yoga Science', 'BSc Nutrition and Food Science', 
    'BSc Clinical Research', 'BSc Fire and Industrial Safety', 'BSc Home Science', 'BSc Food Science & Technology',
    'BSc Material Science', 'BSc Anthropological Sciences', 'BSc Cognitive Science', 'BSc Geriatric Care & Wellness'
  ]
};

const getExamDetailsExtra = (exam: any) => {
  const name = (exam.name || '').toLowerCase();
  const id = (exam.id || '').toLowerCase();
  const category = (exam.category || '').toLowerCase();
  const level = (exam.level || '').toUpperCase();

  let nextSteps: string[] = [];
  let jobRoles: string[] = [];
  let placementInfo = '';
  let examPattern = '';
  let averageSalary = '';
  let allowances: string[] = [];
  let recruiterOrInstitutes: string[] = [];

  // 1. Establish robust default configurations based on levels
  if (level === 'GOVT') {
    nextSteps = [
      "Publication of Merit List: Check your rank and category-wise qualifying score on the official recruitment commission portal.",
      "Document Verification (DV): Attend the physical verification center with original academic certificates, caste/category proofs, and biometric identity documents.",
      "Medical Fitness Examination: Undergo the designated medical board fitness test (highly critical for Defence, Railways, and Police services).",
      "Department Allocation & Appointment Letter: Receive formal service cadre or department allocation followed by the official joining letter."
    ];
    jobRoles = [
      "Central / State Gazetted Officer (Group A / Group B depending on rank)",
      "Technical Specialist / Administrative Executive in government ministries",
      "Specialized Cadre Officer (such as Inspector, Superintendent, or Officer Cadet)"
    ];
    placementInfo = "Direct recruitment into secure permanent public sector and civil services, including central ministries and state administrative divisions with full allowances and pension options.";
    examPattern = "Multi-tier competitive recruitment exam including descriptive written tests, physical/aptitude checks, and highly structured personal interviews.";
    averageSalary = "₹35,400 - ₹1,12,400 per month (varies by department/post, typically Pay Level 6-8 of 7th Pay Commission plus perks)";
    allowances = [
      "Dearness Allowance (DA) - indexed to cost of living",
      "House Rent Allowance (HRA) or dedicated government quarters",
      "Transport Allowance & concessional railway passes (for RRB)",
      "Central Government Health Scheme (CGHS) medical coverage for family",
      "Defined Benefit Pension (NPS contributions) and paid annual/casual leave"
    ];
    recruiterOrInstitutes = [
      "Union Public Service Commission (UPSC)",
      "Staff Selection Commission (SSC)",
      "Railway Recruitment Board (RRB)",
      "Public Sector Undertakings (PSUs) & State Ministries"
    ];
  } else if (level === 'PG') {
    nextSteps = [
      "Download Scorecard: Access and print your official scorecard with sectional percentiles and rank.",
      "Counseling Registration: Register on centralized portals (like COAP, CCMT for M.Tech, or MCC for PG Medical, or individual B-School portals).",
      "Choice Filling & Preferences: Select specialized branches and college choices according to your qualifying rank.",
      "Interview & Written Tests: Participate in Written Ability Tests (WAT), Group Discussions (GD), and rigorous Personal Interviews (PI) if applicable."
    ];
    jobRoles = [
      "Senior Research Analyst / R&D Specialist",
      "Lead Domain Engineer / Technical Project Manager",
      "Management Executive / Management Consultant",
      "Junior Resident / Post-Graduate Clinical Practitioner"
    ];
    placementInfo = "Unlocks high-paying advanced management positions, R&D engineering roles in tech conglomerates, or specialist roles in premier healthcare facilities.";
    examPattern = "Advanced computer-based entrance exam testing core subject competency, analytical depth, and verbal/quantitative reasoning.";
    averageSalary = "₹12,00,000 - ₹28,00,000 per annum (starting CTC upon completion of post-graduation from top-tier institutes)";
    allowances = [
      "Post-Graduate Research Assistantship stipend (e.g. ₹12,400/month for GATE-qualified candidates)",
      "On-campus subsidized premium housing or hostel accommodations",
      "Corporate-sponsored technical conference travel grants",
      "Full access to advanced research labs, scientific databases, and patent funding support"
    ];
    recruiterOrInstitutes = [
      "Indian Institutes of Technology (IITs) & Indian Institute of Science (IISc)",
      "Indian Institutes of Management (IIMs)",
      "Top-tier private universities & Multi-national design labs"
    ];
  } else if (level === 'RESEARCH') {
    nextSteps = [
      "Obtain JRF / Lectureship e-Certificate: Download the formal digital certificate issued by NTA / CSIR.",
      "Apply to PhD / Faculty Vacancies: Submit your research proposals, academic CVs, and NET scorecard to UGC-recognized universities or research institutes.",
      "Faculty Recruitment Board Interview: Appear before university selection committees for Assistant Professor listings.",
      "Supervisor Selection & Thesis Defense: Select your research supervisor, register your topic, and draft the initial thesis outline."
    ];
    jobRoles = [
      "Assistant Professor / Lecturer in Central and State Universities",
      "Junior Research Fellow (JRF) / Senior Research Fellow (SRF)",
      "R&D Scientist in national research laboratories",
      "Academic Consultant & Higher Education Curriculum Specialist"
    ];
    placementInfo = "Enables fully-funded doctoral research programs, lifetime tenure-track academic careers, and prestigious advisor positions in scientific and public policy bodies.";
    examPattern = "Dual-paper computerized objective test covering Teaching & General Research Aptitude (Paper 1) and core Subject Mastery (Paper 2).";
    averageSalary = "₹37,000 - ₹42,00,000 per year stipend (JRF/SRF fellowships), or starting base pay of ₹57,700 per month (Level 10 under UGC scales)";
    allowances = [
      "House Rent Allowance (HRA) for research scholars without hostel facility",
      "Annual Contingency Grant (₹12,000 - ₹25,000) for research books, laptop, and lab consumables",
      "UGC Academic Grade Pay (AGP) incremental structures",
      "Travel reimbursement for presenting research at national and international seminars"
    ];
    recruiterOrInstitutes = [
      "Central and State Public Universities",
      "Council of Scientific and Industrial Research (CSIR) Labs",
      "National Research Centers (such as TIFR, NCBS, and IISERs)"
    ];
  } else if (level === 'DIPLOMA') {
    nextSteps = [
      "Counseling Selection: Register on state technical education portals and choose your technical trade or polytechnic branch.",
      "Apprenticeship Registration: Enroll on the National Apprenticeship Promotion Scheme (NAPS) portal for hands-on industrial training.",
      "Lateral Entry Entrance (Optional): Prepare for Lateral Entry Tests (e.g., ECET, JELET) to enter directly into the 2nd year of regular B.E./B.Tech programs."
    ];
    jobRoles = [
      "Junior Engineer (JE) in state public works and railways",
      "Industrial Technician / Shop Floor Supervisor",
      "Service Engineer / Plant Technical Maintenance Assistant"
    ];
    placementInfo = "Excellent entry-level practical careers in manufacturing, construction, power grids, or a direct pathway to higher technical professional degrees.";
    examPattern = "Objective offline or online entrance test assessing basic high-school level Mathematics, Science, and Logical Aptitude.";
    averageSalary = "₹2,50,000 - ₹5,50,000 per annum (starting compensation in public sector utilities or manufacturing conglomerates)";
    allowances = [
      "Technical Grade allowance & overtime duties premium",
      "Subsidized industrial canteen and medical facility on-site",
      "Government-subsidized transport and factory quarters",
      "Apprenticeship monthly stipend during training phases"
    ];
    recruiterOrInstitutes = [
      "State Boards of Technical Education",
      "Government and Private Polytechnic Colleges",
      "Leading heavy industries, Indian Railways, and State DISCOMs"
    ];
  } else if (level === 'STUDY_ABROAD') {
    nextSteps = [
      "Score Reporting: Select and submit your standardized score reports to targeted global universities.",
      "SOP & Letter of Recommendations (LOR): Prepare your statement of purpose and secure recommendations from academic and professional mentors.",
      "Visa Interview & Financial Proof: Apply for study visas (e.g., F-1 for USA, Study Permit for Canada) and present funding certifications.",
      "Pre-Departure & Orientation: Complete on-campus registration, housing selection, and course enrollment."
    ];
    jobRoles = [
      "Global Corporate Consultant / Business Analyst",
      "International Research Associate / Post-Doctoral Scholar",
      "Technical Lead / Cross-border Product Specialist"
    ];
    placementInfo = "Opens access to premium high-paying global employment markets, cross-border research collaborations, and international corporate leadership positions.";
    examPattern = "Standardized computerized examination evaluating analytical writing, quantitative reasoning, and verbal reasoning (or English language proficiency metrics).";
    averageSalary = "$75,000 - $145,000 per annum (average global starting package depending on program, country, and industry sector)";
    allowances = [
      "Graduate Assistantship stipends (teaching assistant or research assistant roles)",
      "Partial or full tuition fee waivers from host universities",
      "Subsidized student health insurance plans",
      "Optional Practical Training (OPT) or work permit eligibility in destination country"
    ];
    recruiterOrInstitutes = [
      "Ivy League and prestigious global research universities in USA, UK, Canada, Europe, and Australia",
      "Multinational conglomerates, tech firms, global think tanks, and international financial institutions"
    ];
  } else {
    // Default UG / Other
    nextSteps = [
      "Counselling Registration: Enroll on the central (JoSAA, MCC, CLAT) or state admission counseling websites.",
      "Choice Locking: Select your preferred university colleges and specialized branch streams.",
      "Document Verification & Physical Admission: Present academic credentials and pay seat locking fees at the designated campus."
    ];
    jobRoles = [
      "Graduate Engineer Trainee (GET)",
      "Software Development Engineer (SDE) / Tech Analyst",
      "Legal Associate / Associate Consultant",
      "General Duty Medical Officer (GDMO) / Clinic Associate"
    ];
    placementInfo = "Direct eligibility for university placement drives, campus interviews, higher master's degrees (PG), or entry-level corporate/professional hiring.";
    examPattern = "Standard computer-based or offline MCQ-based entrance exam assessing secondary/senior secondary syllabus concepts.";
    averageSalary = "₹4,50,000 - ₹12,00,000 per annum (average starting packages across professional degree placements)";
    allowances = [
      "Standard corporate health insurance coverage",
      "Performance-linked annual incentives and joining bonus",
      "Employee provident fund contributions & gratuity benefits",
      "Tuition assistance for professional certifications or part-time PG"
    ];
    recruiterOrInstitutes = [
      "Central, State, and Elite Private Universities",
      "Top campus-recruiting companies, IT services, and consulting firms"
    ];
  }

  // 2. Specific Exam-wise high-fidelity overrides
  if (id.includes('jee-main') || id.includes('jee-adv') || id.includes('bitsat') || id.includes('viteee') || id.includes('comedk') || id.includes('kcet') || id.includes('mhtcet') || id.includes('wbjee')) {
    nextSteps = [
      "JoSAA / CSAB or State-level Online Counseling: Register on the official portal and upload your JEE/CET score details.",
      "Choice Filling & Locking: Select your preferred colleges (IITs, NITs, IIITs, or leading state colleges) and engineering branches (CSE, ECE, Mech, Civil, Biotech, etc.).",
      "Seat Allocation & Virtual Reporting: Pay seat acceptance fees online and submit your category and academic documents for online verification.",
      "Physical Reporting at Campus: Complete final registration, submit physical medical fitness certificates, pay semester fees, and join the college orientation."
    ];
    jobRoles = [
      "Software Engineer / Frontend & Backend Developer",
      "Data Scientist / AI & Machine Learning Specialist",
      "Core Mechanical / Civil Design Engineer",
      "Consultant / Financial Systems Analyst",
      "Graduate Engineer Trainee (GET) in PSUs"
    ];
    placementInfo = "High-tier campus placements with multinational tech giants, elite global design advisories, or technical entries in public sector undertakings (PSUs).";
    examPattern = "JEE Main: Computer-based test with Section A (multiple choice) and Section B (numerical value) covering Physics, Chemistry, Mathematics. JEE Advanced: Highly rigorous 2-paper exam with multi-select, paragraph, and integer-type questions testing deep analytical mastery.";
    averageSalary = "₹12,00,000 - ₹45,00,000 per annum (average starting CTC for premier IIT/NIT graduates, going up to ₹1.5+ Crores for international tech postings)";
    allowances = [
      "Performance-linked annual bonuses (PLB) and stock grants (RSUs)",
      "Comprehensive family health insurance with premium coverage",
      "Relocation allowances, home office setup stipends",
      "Corporate learning and development sponsorships and certification benefits"
    ];
    recruiterOrInstitutes = [
      "Indian Institutes of Technology (IITs)",
      "National Institutes of Technology (NITs)",
      "Indian Institutes of Information Technology (IIITs)",
      "Global tech giants (Google, Microsoft, Amazon), consulting leaders (McKinsey, BCG, Bain), and premium finance hubs (Goldman Sachs, Morgan Stanley)"
    ];
  } else if (id.includes('neet-ug')) {
    nextSteps = [
      "All India (15% via MCC) & State Quota (85%) Counseling: Register and track the cut-off ranks for government and private medical colleges.",
      "Web Choice Entry: List your college preferences (AIIMS, JIPMER, leading state medical universities) for MBBS, BDS, or AYUSH courses.",
      "Mandatory Medical Check & Certificate Verification: Present physical health fitness certificates and verified NEET scorecard.",
      "College Joining & Bond Signing: Complete the mandatory service bond formalities (where applicable) and commence your medical training."
    ];
    jobRoles = [
      "General Duty Medical Officer (GDMO) in government hospitals",
      "Junior Resident Doctor / General Practitioner",
      "Clinical Consultant in healthcare networks",
      "Medical Advisor / Pharmaceutical Specialist"
    ];
    placementInfo = "Guaranteed direct postings in government health centers, leading multi-specialty private hospital chains, or a strong foundation for PG specializations (MD/MS).";
    examPattern = "Single offline pen-paper exam of 3 hours 20 minutes duration, containing 200 multiple-choice questions (180 to be answered) across Physics, Chemistry, and Biology (Botany & Zoology).";
    averageSalary = "₹6,00,000 - ₹18,00,000 per annum (during residency / junior doctor level, increasing to ₹25,00,000 - ₹60,00,000+ post MD/MS specialization)";
    allowances = [
      "Professional indemnity insurance coverage",
      "Non-Practicing Allowance (NPA) in government posts",
      "Subsidized on-call medical housing/hostel accommodation",
      "Continuing Medical Education (CME) grants & academic conference sponsorships"
    ];
    recruiterOrInstitutes = [
      "All India Institute of Medical Sciences (AIIMS)",
      "Maulana Azad Medical College (MAMC)",
      "Armed Forces Medical College (AFMC)",
      "Top Government Medical Colleges & multi-specialty healthcare networks"
    ];
  } else if (id.includes('gate')) {
    nextSteps = [
      "Register on COAP (Common Offer Acceptance Portal): View and accept PG admission offers from IITs and IISc.",
      "Register on CCMT (Centralized Counseling): For M.Tech / M.Arch / M.Plan admissions in NITs, IIITs, and GFTIs.",
      "Apply to PSU Recruitment Portals: Check individual websites of ONGC, IOCL, HPCL, NTPC, and GAIL for recruitment based on current GATE scores.",
      "Syllabus Prep for PSU Interviews: Prepare thoroughly for rigorous technical interviews and Group Discussions (GD)."
    ];
    jobRoles = [
      "Executive Engineer / Assistant Manager in PSUs (ONGC, IOCL, etc.)",
      "Scientific Officer in BARC, ISRO, or DRDO",
      "Senior Research Associate & Lab Developer",
      "Design & Development Engineer in global tech MNCs"
    ];
    placementInfo = "Direct selection to Group-A level central public sector jobs with attractive pay scales (Maharatna/Navratna packages), or premier funded research in IITs.";
    examPattern = "Single 3-hour computer-based test consisting of 65 questions (Multiple Choice, Multiple Select, and Numerical Answer Type) evaluating General Aptitude and Subject-Specific engineering concepts.";
    averageSalary = "₹7,00,000 - ₹22,00,000 per annum (in PSUs as officer trainee, or starting packages in elite engineering firms post-M.Tech)";
    allowances = [
      "PSU Cafeteria Perks (up to 35% of basic pay as allowances)",
      "Performance Related Pay (PRP) based on individual & company metrics",
      "Leased housing or dedicated township quarters",
      "Post-graduation stipend of ₹12,400/month if studying in IIT/IISc"
    ];
    recruiterOrInstitutes = [
      "Indian Institute of Science (IISc Bangalore)",
      "IITs",
      "Maharatna PSUs (ONGC, IOCL, GAIL, NTPC, HPCL, BPCL)",
      "Navratna PSUs (HAL, BEL)"
    ];
  } else if (id.includes('cat') || id.includes('xat') || id.includes('gmat')) {
    nextSteps = [
      "Shortlist & IIM CAP Registration: Apply to individual IIMs or participate in the Common Admission Process (CAP) for newer/baby IIMs.",
      "Prepare for WAT & GD/PI: Practice current affairs, analytical case studies, and corporate logic for Written Ability Tests and Personal Interviews.",
      "Profile Verification: Submit documents certifying work experience (if any), continuous academic marks, and reference letters.",
      "Accept Offer & Preparatory Course: Pay the commitment fee and complete preliminary courses in statistics, excel, and accounting."
    ];
    jobRoles = [
      "Management Consultant (McKinsey, BCG, Bain, etc.)",
      "Investment Banker / Private Equity Associate",
      "Product Manager / Tech Product Specialist",
      "Brand / Marketing Manager in FMCG",
      "Operations & Supply Chain Director"
    ];
    placementInfo = "High-tier executive corporate career tracks, global strategy teams, multi-national consulting engagements, and venture capital leadership pathways.";
    examPattern = "CAT: 2-hour computer-based test comprising three sections: Verbal Ability & Reading Comprehension (VARC), Data Interpretation & Logical Reasoning (DILR), and Quantitative Ability (QA).";
    averageSalary = "₹15,00,000 - ₹35,00,000+ per annum (Average starting package at top-tier IIMs ranges from ₹22 LPA to ₹34 LPA)";
    allowances = [
      "Executive travel allowances and business class upgrades",
      "Corporate wellness benefits & club memberships",
      "Annual performance bonuses and profit sharing options",
      "Stock options (RSUs) and performance equity grants"
    ];
    recruiterOrInstitutes = [
      "Indian Institutes of Management (IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, Indore)",
      "FMS Delhi, XLRI Jamshedpur, SPJIMR Mumbai",
      "Top management consulting, investment banks, and consumer-goods conglomerates"
    ];
  } else if (id.includes('clat')) {
    nextSteps = [
      "Consortium of NLUs Centralized Counseling: Register online, upload documents, and submit college priority choices.",
      "Seat Locking & Upgradation: Participate in multiple allotment rounds to lock your preferred National Law University.",
      "Physical Admission & Library Registration: Complete physical documentation at the allocated NLU campus."
    ];
    jobRoles = [
      "Corporate Legal Counsel (Amarchand, Trilegal, etc.)",
      "Judicial Magistrate / Civil Judge (via state exams)",
      "Legal Advisor / Legal Analyst in top MNCs",
      "Public Prosecutor / Litigator in Supreme/High Courts"
    ];
    placementInfo = "Top-tier law firm recruitments, direct legal advisory roles in corporate boards, judicial services entry, or independent courtroom litigation.";
    examPattern = "Single 2-hour offline test comprising 120 multiple-choice questions testing English Language, Current Affairs (including General Knowledge), Legal Reasoning, Logical Reasoning, and Quantitative Techniques.";
    averageSalary = "₹8,00,000 - ₹22,00,000 per annum (starting packages at premier tier-1 corporate law firms)";
    allowances = [
      "Annual retention bonuses & billable hours incentives",
      "Corporate travel allowances and professional clothing allowances",
      "Club memberships and legal conference sponsorships",
      "Comprehensive professional indemnity insurance coverage"
    ];
    recruiterOrInstitutes = [
      "National Law School of India University (NLSIU Bangalore)",
      "NALSAR Hyderabad",
      "WBNUJS Kolkata",
      "Top-tier law firms (Cyril Amarchand Mangaldas, Shardul Amarchand Mangaldas, Khaitan & Co, Trilegal)"
    ];
  }

  // 3. SPECIFIC GOVERNMENT RECRUITMENT EXAMS
  if (id === 'upsc-cse') {
    nextSteps = [
      "DAF-I Submission (Mains): Fill out the Detailed Application Form 1 with your educational details and preferred optional subject.",
      "Take the CSE Mains Written Exam: Appear for 9 descriptive papers (essay, general studies, optional, and language papers) in dedicated centers.",
      "DAF-II Submission (Interview): Complete the second detailed form listing service preferences (IAS, IPS, IFS, IRS) and state cadre choices.",
      "Appear for UPSC Personality Test: Attend the interview panel at Dholpur House, New Delhi, for standard evaluation.",
      "Foundation Training: Report to LBSNAA, Mussoorie, for the prestigious common foundation course."
    ];
    jobRoles = [
      "Indian Administrative Service (IAS) — Sub-Divisional Magistrate (SDM), District Magistrate (DM), Joint Secretary, Cabinet Secretary",
      "Indian Police Service (IPS) — Assistant Superintendent (ASP), Superintendent of Police (SP), Inspector General (IG), DGP",
      "Indian Foreign Service (IFS) — Under Secretary, Ambassador, Consul General, Foreign Secretary",
      "Indian Revenue Service (IRS) — Assistant Commissioner of Income Tax / GST"
    ];
    placementInfo = "Highly prestigious administrative and policymaking roles governing districts, diplomatic missions, internal security networks, and national revenue portfolios.";
    examPattern = "Three stages: 1. Prelims (2 objective papers: GS and CSAT), 2. Mains (9 descriptive papers), 3. Interview / Personality Test.";
    averageSalary = "₹67,700 - ₹2,50,000 per month (as per 7th Pay Commission, starting at Pay Level 10 plus allowances)";
    allowances = [
      "Dearness Allowance (DA) - indexed to cost of living",
      "House Rent Allowance (HRA) or official bungalow",
      "Official vehicle with driver & security guards",
      "Subsidized electricity, domestic help allowance, and water",
      "Lifetime pension benefits and comprehensive medical coverage"
    ];
    recruiterOrInstitutes = [
      "Department of Personnel and Training (DoPT)",
      "Ministry of Home Affairs (MHA)",
      "Ministry of External Affairs (MEA)",
      "Various State Governments"
    ];
  } else if (id === 'upsc-cds' || id === 'upsc-nda' || id === 'nda' || id === 'tes' || id.includes('navy')) {
    nextSteps = [
      "Services Selection Board (SSB) Call: Attend the highly rigorous 5-day SSB psychological, physical, and leadership testing.",
      "CPSS / Pilot Aptitude Test: Take the Computerised Pilot Selection System test if you chose the Air Force Flying Branch.",
      "Special Military Medical Examination: Complete extensive medical and physiological screenings at designated Armed Forces hospitals.",
      "Join the Academy: Receive joining letters for National Defence Academy (NDA, Khadakwasla), Indian Military Academy (IMA, Dehradun), Indian Naval Academy (INA, Ezhimala), or Air Force Academy (AFA, Dundigal)."
    ];
    jobRoles = [
      "Indian Army Officer — Lieutenant, Captain, Major, Colonel, Brigadier, General",
      "Indian Air Force Officer — Flying Officer, Flight Lieutenant, Squadron Leader, Wing Commander, Air Marshal",
      "Indian Navy Officer — Sub-Lieutenant, Lieutenant, Commander, Commodore, Admiral"
    ];
    placementInfo = "Elite combat and technical command leadership positions in the Indian Armed Forces, combining standard government officer perks with active field commands.";
    examPattern = "Two stages: 1. Written Examination (Mathematics, English, General Knowledge), 2. Services Selection Board (SSB) 5-day Interview testing psychology & group tasks.";
    averageSalary = "₹56,100 - ₹2,25,000 per month (starting as Lieutenant at Level 10 plus military service pay of ₹15,500/month)";
    allowances = [
      "Military Service Pay (MSP) & High Altitude/Field Area Allowances",
      "Subsidized Canteen facilities (CSD)",
      "Free medical treatment for self & family",
      "Subsidized housing in military stations",
      "2 Months Paid Annual Leave and 20 Days Casual Leave"
    ];
    recruiterOrInstitutes = [
      "Indian Army",
      "Indian Air Force",
      "Indian Navy",
      "Armed Forces Medical Services (AFMS)"
    ];
  } else if (id === 'upsc-capf') {
    nextSteps = [
      "Physical Standards Test (PST) & PET: Complete the mandatory physical efficiency test (running, long jump, shot put) at designated centers.",
      "Detailed Medical Examination (DME): Undergo comprehensive medical checkups by military medical boards.",
      "UPSC Interview / Personality Test: Attend the final evaluation interview in New Delhi.",
      "Allotment of Force: Receive officer commission in BSF, CRPF, CISF, ITBP, or SSB based on rank and preferences."
    ];
    jobRoles = [
      "Assistant Commandant (AC) — equivalent to Assistant Superintendent of Police / Captain in the Army",
      "Deputy Commandant / Second-in-Command of a battalion",
      "Commandant (CO) / Inspector General (IG) of paramilitary forces"
    ];
    placementInfo = "Gazetted combat officer positions leading armed central forces responsible for border security, counter-insurgency, and critical national infrastructure protection.";
    examPattern = "Three stages: 1. Written Exam (Paper I: General Ability & Intelligence, Paper II: General Studies, Essay & Comprehension), 2. Physical Standard & Efficiency Tests, 3. UPSC Interview.";
    averageSalary = "₹56,100 - ₹1,77,500 per month (starting at Level 10 plus allowances)";
    allowances = [
      "Ration Money Allowance",
      "Risk & Hardship Allowances based on posting area",
      "Government married accommodation",
      "Free medical facilities (CGHS/Ayushman CAPF)",
      "SDA (Special Duty Allowance) in border states"
    ];
    recruiterOrInstitutes = [
      "Border Security Force (BSF)",
      "Central Reserve Police Force (CRPF)",
      "Central Industrial Security Force (CISF)",
      "Indo-Tibetan Border Police (ITBP)",
      "Sashastra Seema Bal (SSB)"
    ];
  } else if (id === 'upsc-ese' || id.includes('ese-') || id === 'upsc-ese/ies') {
    nextSteps = [
      "Appear for ESE Mains Exam: Take conventional descriptive engineering papers in your chosen engineering discipline (Civil, Mechanical, Electrical, or ECE).",
      "Personality Test: Attend the personal interview panel evaluating engineering concepts, leadership, and analytical aptitude.",
      "Medical Board & Joining: Undergo a railway/central department medical checkup and report for training at national engineering academies."
    ];
    jobRoles = [
      "Assistant Executive Engineer in Central Engineering Services",
      "Assistant Director / Scientific Officer in central ministries",
      "Chief Engineer / Executive Director in Indian Railways, CPWD, Military Engineer Services (MES), or Border Roads Organisation (BRO)"
    ];
    placementInfo = "Premier technical leadership and infrastructure execution careers overseeing national highways, railway networks, defense construction, and public works.";
    examPattern = "Three stages: 1. Preliminary Exam (General Studies & Engineering Aptitude, Discipline-specific paper), 2. Mains Exam (2 conventional descriptive papers), 3. Personality Test.";
    averageSalary = "₹56,100 - ₹2,18,200 per month (starting as Assistant Executive Engineer at Level 10)";
    allowances = [
      "Dearness Allowance (DA)",
      "House Rent Allowance (HRA) or government quarters",
      "Official transport or travel allowance",
      "CGHS medical benefits",
      "Children's Education Allowance"
    ];
    recruiterOrInstitutes = [
      "Indian Railways (IRSE, IRSME, IRSEE)",
      "Military Engineer Services (MES)",
      "Central Public Works Department (CPWD)",
      "Border Roads Organisation (BRO)"
    ];
  } else if (id === 'upsc-epfo') {
    nextSteps = [
      "UPSC Personality Test: Shortlisted candidates based on written test scores are called for the interview round in New Delhi.",
      "Document Verification & Medical Checkup: Standard certification checks for central civil posts.",
      "Officer Induction Training: Undergo specialized training in labor laws, provident fund rules, and accounting at PDNASS."
    ];
    jobRoles = [
      "Enforcement Officer (EO) / Accounts Officer (AO) in EPFO",
      "Assistant Provident Fund Commissioner (APFC)",
      "Regional Provident Fund Commissioner (RPFC)"
    ];
    placementInfo = "Prestigious statutory officer positions managing social security, labor welfare, pension compliance, and statutory audits under the Ministry of Labor & Employment.";
    examPattern = "Two stages: 1. Recruitment Test (RT) - Pen & Paper objective test covering GS, Labor Laws, Industrial Relations, and Accountancy, 2. Interview (Weightage - 75:25).";
    averageSalary = "₹47,600 - ₹1,51,100 per month (starting as EO/AO at Level 8, or APFC at Level 10 starting at ₹56,100)";
    allowances = [
      "Non-Practicing Allowance / Special Pay",
      "Dearness Allowance (DA) & HRA",
      "LTC / Home Town Travel Concession",
      "Medical Reimbursement",
      "Government accommodation options"
    ];
    recruiterOrInstitutes = [
      "Employees' Provident Fund Organisation (EPFO)",
      "Ministry of Labour & Employment"
    ];
  } else if (id === 'ssc-cgl') {
    nextSteps = [
      "Appear for Tier-II Examination: Take objective computer-based tests in mathematical abilities, reasoning, English, and general awareness.",
      "Computer Proficiency & Typing Test: Clear the mandatory speed typing test (DEST) as qualifying criteria.",
      "Post Preference Entry: Choose preferred departments and ministries online.",
      "Document Verification: Standard department verification rounds."
    ];
    jobRoles = [
      "Assistant Audit Officer (AAO) / Assistant Accounts Officer in CAG",
      "Inspector of Income Tax (CBDT) / Inspector of GST & Central Excise (CBIC)",
      "Assistant Section Officer (ASO) in Central Secretariat, External Affairs, or Intelligence Bureau (IB)",
      "Sub-Inspector in Central Bureau of Investigation (CBI) / National Investigation Agency (NIA)"
    ];
    placementInfo = "Executive and inspector-level non-gazetted and gazetted postings in central ministries, intelligence agencies, and revenue enforcement boards with stable career progression.";
    examPattern = "Two-tier Computer Based Examination: Tier-I (Qualifying: Maths, Reasoning, English, GS), Tier-II (Discipline specific sections, Mathematical Abilities, English, General Awareness, and Computer Knowledge with a Data Entry Speed Test).";
    averageSalary = "₹25,500 - ₹1,51,100 per month (Depending on post: Levels 4 to 8, starting from ₹35,400 up to ₹47,600 base)";
    allowances = [
      "Dearness Allowance (DA)",
      "House Rent Allowance (HRA)",
      "Transport Allowance (TA)",
      "Medical Facility (CGHS)",
      "Government Quarters"
    ];
    recruiterOrInstitutes = [
      "Central Board of Direct Taxes (CBDT)",
      "Central Board of Indirect Taxes and Customs (CBIC)",
      "Comptroller and Auditor General (CAG)",
      "Central Bureau of Investigation (CBI)",
      "Ministry of External Affairs (MEA)",
      "Intelligence Bureau (IB)"
    ];
  } else if (id.includes('ibps') || id.includes('sbi')) {
    nextSteps = [
      "Mains Examination: Take advanced objective and descriptive English writing tests.",
      "Common Interview Round: Attend the interview panel conducted by participating public sector banks.",
      "Bank Preference Allotment: Allocation to public banks (SBI, PNB, Bank of Baroda, etc.) based on final composite scores."
    ];
    jobRoles = [
      "Probationary Officer (PO) / Management Trainee",
      "Assistant Branch Manager / Credit Officer",
      "Regional Manager / General Manager (senior executive levels)"
    ];
    placementInfo = "Fast-track executive officer roles in commercial banking, corporate credit, financial risk management, and branch operations across state-owned national banks.";
    examPattern = "Three-stage recruitment: 1. Preliminary Exam (English, Quantitative Aptitude, Reasoning), 2. Mains Exam (Data Analysis, Reasoning, General Economy/Banking Awareness, English Descriptive), 3. Psychometric Test & Group Exercise / Interview.";
    averageSalary = "₹41,960 (Basic Pay) - ₹65,000+ Gross per month (Starting scale-I officer total compensation is around ₹8.5 to ₹13 Lakhs per annum including perks)";
    allowances = [
      "Leased Accommodation (up to ₹30,000/month depending on city)",
      "Petrol Allowance (45-100 liters per month)",
      "Newspaper & Book Allowance",
      "Concessional rate housing/car/personal loans",
      "Superannuation and pension schemes"
    ];
    recruiterOrInstitutes = [
      "State Bank of India (SBI)",
      "Punjab National Bank (PNB)",
      "Bank of Baroda (BoB)",
      "Canara Bank",
      "Union Bank of India",
      "Other public sector banks"
    ];
  }

  return { nextSteps, jobRoles, placementInfo, examPattern, averageSalary, allowances, recruiterOrInstitutes };
};

const getExamDetailedFacts = (examId: string, level: string) => {
  const id = (examId || '').toLowerCase();
  
  if (id.includes('jee') || id.includes('bitsat') || id.includes('viteee') || id.includes('comedk') || id.includes('kcet') || id.includes('mhtcet') || id.includes('wbjee')) {
    return {
      family: 'Engineering',
      languages: "English, Hindi, and 11 Indian regional languages",
      duration: "3 Hours (180 minutes) per paper",
      attempts: "Maximum 3 consecutive attempts for JEE Main, 2 for JEE Advanced",
      ageLimit: "No upper age limit (must have passed Class 12 in recent 2 years)",
      format: "Computer Based Test (CBT) with MCQ & Numerical Answer types",
      marking: "+4 for correct, -1 for incorrect MCQs, 0 for unattended",
      mode: "Online (Computer Based Test - CBT)",
      mcqCount: "75 Questions (60 Multiple Choice Questions + 15 Numerical Answer Types)",
      essayWriting: "No Essay Writing or descriptive papers",
      problemTypes: "Complex multiple-choice concepts, high-yield physics calculations, chemical bonding equations, single-digit decimal numbers",
      totalMarks: "300 Marks",
      weightages: [
        { subject: "Mathematics", pct: 33, color: "bg-blue-600", topics: ["Calculus (Limits, Integration, Derivatives)", "Coordinate Geometry & 3D", "Vectors & Complex Numbers", "Matrices & Determinants"] },
        { subject: "Physics", pct: 33, color: "bg-teal-500", topics: ["Electrostatics & Current Electricity", "Mechanics & Kinematics", "Modern Physics & Quantum mechanics", "Thermodynamics & Fluid Mechanics"] },
        { subject: "Chemistry", pct: 34, color: "bg-amber-500", topics: ["Organic reaction mechanisms", "Inorganic coordination compounds", "Physical thermodynamics & kinetics", "Chemical Bonding & Structures"] }
      ]
    };
  }

  if (id.includes('neet-ug')) {
    return {
      family: 'Medical',
      languages: "English, Hindi, Assamese, Bengali, Gujarati, Kannada, Marathi, Odia, Punjabi, Tamil, Telugu, Urdu",
      duration: "3 Hours 20 minutes (200 minutes) duration",
      attempts: "No maximum attempt limits under current guidelines",
      ageLimit: "Completed minimum 17 years on or before Dec 31 of entry year",
      format: "Offline Pen-and-Paper OMR test",
      marking: "+4 for correct, -1 for incorrect, 0 for unattended",
      mode: "Offline (Pen-and-Paper OMR Sheet)",
      mcqCount: "180 MCQs to be answered out of 200 questions total",
      essayWriting: "No Essay Writing or descriptive papers",
      problemTypes: "Conceptual biology MCQs, chemical structures and organic formula matching, numeric physics calculation equations",
      totalMarks: "720 Marks",
      weightages: [
        { subject: "Biology (Botany & Zoology)", pct: 50, color: "bg-emerald-600", topics: ["Human Physiology & Anatomy", "Genetics & Biological Evolution", "Plant Physiology & Photosynthesis", "Ecology & Environmental Issues", "Cell Biology & Biomolecules"] },
        { subject: "Chemistry", pct: 25, color: "bg-amber-500", topics: ["Organic Reactions & biomolecules", "Coordination Compounds & d-block", "Chemical Kinetics & Thermodynamics", "Periodic Classification & s-block"] },
        { subject: "Physics", pct: 25, color: "bg-blue-600", topics: ["Ray & Wave Optics", "Semiconductor Devices & Gates", "Electrostatics & Current Electricity", "Kinematics & Laws of Motion"] }
      ]
    };
  }

  if (id.includes('upsc') || id.includes('ssc-cgl') || id === 'upsc-cse' || id === 'upsc-epfo' || id === 'upsc-capf') {
    return {
      family: 'Civil Services / Govt Admin',
      languages: "English & Hindi (Main papers can be answered in any scheduled language)",
      duration: "Prelims: Two papers of 2 hours each; Mains: Nine papers of 3 hours each",
      attempts: "6 attempts for General category, 9 for OBC, unlimited for SC/ST",
      ageLimit: "21 to 32 years (relaxations for reserved categories)",
      format: "Prelims: OMR Objective; Mains: Descriptive written papers; Interview: Verbal",
      marking: "Prelims: +2.0 (GS) / +2.5 (CSAT); -1/3rd penalty for incorrect options",
      mode: "Mixed Mode (Prelims: Offline OMR; Mains: Offline Pen-and-Paper Descriptive)",
      mcqCount: "Prelims: 180 MCQs total (GS Paper I: 100 MCQs, CSAT Paper II: 80 MCQs). Mains: Zero MCQs (Descriptive only).",
      essayWriting: "Yes: 2 full essays in dedicated Paper-I (250 marks), plus descriptive answers for GS I-IV and Optional subjects",
      problemTypes: "Administrative decision-making case studies, qualitative descriptive essay drafting, deep logical aptitude CSAT sets",
      totalMarks: "Prelims: 400 Marks (Qualifying); Mains: 1750 Marks + 275 Interview Marks",
      weightages: [
        { subject: "Indian Polity & Constitution", pct: 20, color: "bg-indigo-600", topics: ["Fundamental Rights & DPSP", "Panchayati Raj & Local Self-Gov", "Judiciary & Federal Relations", "Public Administration & Policies"] },
        { subject: "Modern History & Culture", pct: 20, color: "bg-amber-600", topics: ["Indian Freedom Struggle (1857-1947)", "Art, Architecture & Ancient Literature", "Social & Religious Reform Movements"] },
        { subject: "Economics & Development", pct: 20, color: "bg-emerald-600", topics: ["Macroeconomics & Monetary Policy", "Union Budget, GST & Taxation", "Poverty, Planning & Banking Reforms"] },
        { subject: "Geography & Environment", pct: 20, color: "bg-sky-500", topics: ["Physical, Climate & Human Geography", "Ecology, Climate Change & Biodiversity", "Wildlife Sanctuaries & Rivers of India"] },
        { subject: "Aptitude, CSAT & Science", pct: 20, color: "bg-purple-500", topics: ["CSAT Comprehension & Reasoning", "Quantitative Aptitude shortcuts", "Space, Defence, Nano-tech & Biotech"] }
      ]
    };
  }

  if (id.includes('cat') || id.includes('xat') || id.includes('gmat') || id.includes('snap') || id.includes('nmat') || id.includes('cmat') || id.includes('mat')) {
    return {
      family: 'Management',
      languages: "English exclusively",
      duration: "2 Hours (120 minutes) for CAT; 3 Hours for GMAT",
      attempts: "No maximum attempt restriction across management tests",
      ageLimit: "No upper age limit (requires a recognized Bachelor degree with min 50% score)",
      format: "Computer Based Test (CBT) with MCQs and TITA (Type-In-The-Answer) questions",
      marking: "+3 for correct, -1 for incorrect MCQs, 0 for incorrect TITA",
      mode: "Online (Computer Based Test - CBT)",
      mcqCount: "66 Questions (approx. 48 MCQs + 18 Non-MCQ TITA / Type-in text)",
      essayWriting: "No Essay Writing in CAT (GMAT has 1 Analytical Writing Assessment essay)",
      problemTypes: "Quantitative algebraic problems, Circular puzzles, set-theory Venn diagrams, logical arrangement caselets",
      totalMarks: "198 Marks (CAT)",
      weightages: [
        { subject: "Quantitative Ability (QA)", pct: 34, color: "bg-blue-600", topics: ["Algebra, Quadratic equations & Series", "Arithmetic (Time/Speed/Distance, Profit/Loss)", "Number Systems & Geometry/Mensuration", "Permutations & Combinations"] },
        { subject: "Data Interpretation & Logical Reasoning (DILR)", pct: 33, color: "bg-purple-500", topics: ["Linear & Circular Arrangements", "Venn Diagrams & Set theory puzzles", "Graphs, Bar Charts & Tabular caselets", "Mathematical logic & grid puzzles"] },
        { subject: "Verbal Ability & Reading Comprehension (VARC)", pct: 33, color: "bg-teal-500", topics: ["High-level RC passage interpretation", "Para-jumbles & Odd-one-out sentences", "Sentence Correction & completion", "Critical Reasoning & inferences"] }
      ]
    };
  }

  if (id.includes('clat')) {
    return {
      family: 'Law',
      languages: "English exclusively",
      duration: "2 Hours (120 minutes) duration",
      attempts: "No maximum attempt restriction",
      ageLimit: "No upper age limit for CLAT admission",
      format: "Offline Pen-and-Paper MCQ test",
      marking: "+1 for correct, -0.25 for incorrect, 0 for unattended",
      mode: "Offline (Pen-and-Paper OMR Sheet)",
      mcqCount: "120 Multiple Choice Questions (MCQs)",
      essayWriting: "No Essay Writing or Descriptive papers",
      problemTypes: "Legal passage reading & inference, factual analysis & scenario resolution, logical deductions, data comprehension",
      totalMarks: "120 Marks",
      weightages: [
        { subject: "Legal Reasoning", pct: 25, color: "bg-red-600", topics: ["Law of Contracts & Agreements", "Law of Torts & Negligence", "Indian Penal Code (Criminal Law)", "Constitutional Law & Jurisprudence"] },
        { subject: "Current Affairs & GK", pct: 25, color: "bg-amber-500", topics: ["National & International events", "Awards, Science breakthroughs & history", "Important Supreme Court judgments"] },
        { subject: "Logical Reasoning", pct: 20, color: "bg-violet-600", topics: ["Syllogisms & Analytical logical chains", "Statement-Assumption & Cause-Effect", "Critical passages & argument strength"] },
        { subject: "English Language", pct: 20, color: "bg-sky-600", topics: ["Passage comprehension & main-idea questions", "Grammatical structures & editing", "Vocabulary in passage context"] },
        { subject: "Quantitative Techniques", pct: 10, color: "bg-emerald-500", topics: ["Data interpretation charts", "Basic arithmetic caselets (10th standard)"] }
      ]
    };
  }

  // Default Fallback
  return {
    family: 'General / Professional Entrance',
    languages: "English and Hindi standard",
    duration: "2 Hours (120 minutes)",
    attempts: "Varies; usually no limit within age boundaries",
    ageLimit: "Varies by specific institute guidelines",
    format: "Online or Offline objective MCQ test",
    marking: "+1 or +4 standard; 1/4th negative marking usually applied",
    mode: "Online or Offline (Varies by conducting board)",
    mcqCount: "100 Multiple Choice Questions (MCQs)",
    essayWriting: "No Essay Writing usually; check specific institute term brochures",
    problemTypes: "Analytical reasoning, general computer literacy MCQs, verbal grammar and reading comprehension sections",
    totalMarks: "100 - 200 Marks standard",
    weightages: [
      { subject: "Technical / Core Domain Knowledge", pct: 60, color: "bg-blue-600", topics: ["Core discipline theory and definitions", "Analytical problem solving", "Practical tools & application models"] },
      { subject: "Analytical Reasoning & Math", pct: 20, color: "bg-purple-500", topics: ["Logical deductive reasoning", "Quantitative shortcuts and arithmetic"] },
      { subject: "Verbal Aptitude & General Awareness", pct: 20, color: "bg-teal-500", topics: ["English reading comprehension", "Basic general knowledge & tech trends"] }
    ]
  };
};

const getQuizQuestionsForExam = (examId: string) => {
  const id = (examId || '').toLowerCase();
  
  if (id.includes('jee') || id.includes('bitsat') || id.includes('viteee') || id.includes('comedk') || id.includes('kcet') || id.includes('mhtcet') || id.includes('wbjee')) {
    return [
      {
        id: 'q1',
        question: "A car accelerates from rest at a constant rate α for some time, after which it decelerates at a constant rate β and comes to rest. If the total time elapsed is t, what is the maximum velocity acquired by the car?",
        options: [
          "(αβt) / (α + β)",
          "(α + β)t / (αβ)",
          "(α² + β²)t / (α + β)",
          "(α - β)t / (α + β)"
        ],
        correctIndex: 0,
        explanation: "The maximum velocity is obtained at the transition from acceleration to deceleration. v_max = α * t1 = β * t2, where t1 + t2 = t. Solving this system gives v_max = (αβt) / (α + β)."
      },
      {
        id: 'q2',
        question: "Which of the following molecules has a non-zero dipole moment?",
        options: [
          "CO2 (Carbon Dioxide)",
          "NF3 (Nitrogen Trifluoride)",
          "BF3 (Boron Trifluoride)",
          "CCl4 (Carbon Tetrachloride)"
        ],
        correctIndex: 1,
        explanation: "NF3 has a pyramidal structure with a lone pair on nitrogen, which causes the individual polar N-F bond dipole moments to add up rather than cancel out. CO2 is linear, and BF3 and CCl4 are highly symmetrical planar/tetrahedral molecules, having zero net dipole moment."
      }
    ];
  }

  if (id.includes('neet-ug')) {
    return [
      {
        id: 'q1',
        question: "Which of the following hormone levels will cause release of ovum (ovulation) from the graafian follicle in a normal human female?",
        options: [
          "Low concentration of Luteinizing Hormone (LH)",
          "Low concentration of Follicle-Stimulating Hormone (FSH)",
          "High concentration of Estrogen",
          "High concentration of Progesterone"
        ],
        correctIndex: 2,
        explanation: "A high level of estrogen near the middle of the menstrual cycle triggers a positive feedback loop on the pituitary gland, resulting in a sudden surge of Luteinizing Hormone (LH surge), which directly causes the rupture of the Graafian follicle and ovulation."
      },
      {
        id: 'q2',
        question: "In double-stranded DNA, the ratio of Adenine to Thymine and Guanine to Cytosine is always equal to 1. This fundamental observation is known as:",
        options: [
          "Chargaff's Rule",
          "Central Dogma",
          "Mendel's Law of Segregation",
          "Watson-Crick Base Pair Postulate"
        ],
        correctIndex: 0,
        explanation: "Erwin Chargaff formulated the rule that in any double-stranded DNA molecule, the ratio of Adenine to Thymine and Guanine to Cytosine is 1:1 (i.e. %A = %T and %G = %C). This was crucial evidence for Watson and Crick's double helix model."
      }
    ];
  }

  if (id.includes('upsc') || id.includes('ssc-cgl') || id === 'upsc-cse' || id === 'upsc-epfo' || id === 'upsc-capf') {
    return [
      {
        id: 'q1',
        question: "Which Constitutional Amendment Act to the Constitution of India added 'Secular', 'Socialist', and 'Integrity' to the Preamble?",
        options: [
          "44th Amendment Act, 1978",
          "42nd Amendment Act, 1976",
          "24th Amendment Act, 1971",
          "86th Amendment Act, 2002"
        ],
        correctIndex: 1,
        explanation: "The 42nd Amendment Act of 1976, enacted during the Emergency under PM Indira Gandhi, added three new terms to the Preamble of the Indian Constitution: 'Socialist', 'Secular', and 'Integrity'."
      },
      {
        id: 'q2',
        question: "The 'Insolvency and Bankruptcy Code' (IBC) in India was enacted in 2016 to address which of the following primary macro-economic issues?",
        options: [
          "High rate of agricultural crop-debt defaults",
          "Non-performing assets (NPAs) and facilitating ease of corporate exit",
          "Sovereign bond ratings and external debt dispute settlement",
          "International double tax avoidance and capital flight"
        ],
        correctIndex: 1,
        explanation: "The IBC was introduced to provide a unified, time-bound legal framework for resolving insolvencies, maximizing the value of assets of distressed firms, and clearing up massive bank non-performing assets (NPAs) while improving the 'Ease of Doing Business' in India."
      }
    ];
  }

  if (id.includes('cat') || id.includes('xat') || id.includes('gmat') || id.includes('snap') || id.includes('nmat') || id.includes('cmat') || id.includes('mat')) {
    return [
      {
        id: 'q1',
        question: "A shopkeeper sells an item at a discount of 20% on the marked price and still makes a profit of 12%. By what percentage is the marked price of the item above its cost price?",
        options: [
          "32%",
          "40%",
          "30%",
          "36%"
        ],
        correctIndex: 1,
        explanation: "Let Cost Price = CP, and Marked Price = MP. Selling Price SP = 0.8 * MP (discounted by 20%). The profit is 12%, so SP = 1.12 * CP. Equating SP: 0.8 * MP = 1.12 * CP => MP / CP = 1.12 / 0.8 = 1.40. Thus, the Marked Price is exactly 40% above the Cost Price."
      },
      {
        id: 'q2',
        question: "If log_2(x) + log_4(x) + log_16(x) = 7/2, what is the value of x?",
        options: [
          "x = 2",
          "x = 16",
          "x = 8",
          "x = 4"
        ],
        correctIndex: 3,
        explanation: "Convert all logs to base 2. Since log_4(x) = (1/2)log_2(x) and log_16(x) = (1/4)log_2(x), the equation becomes: log_2(x) + 0.5*log_2(x) + 0.25*log_2(x) = 3.5 => log_2(x) * (1 + 0.5 + 0.25) = 7/2 => log_2(x) * (7/4) = 7/2 => log_2(x) = 2 => x = 2^2 = 4."
      }
    ];
  }

  if (id.includes('clat')) {
    return [
      {
        id: 'q1',
        question: "Under the Law of Torts, 'Strict Liability' holds a person liable for damages even if they were not at fault or negligent. Which landmark English common-law case established this rule?",
        options: [
          "Donoghue v. Stevenson (1932)",
          "Rylands v. Fletcher (1868)",
          "Hadley v. Baxendale (1854)",
          "Carlill v. Carbolic Smoke Ball Co. (1893)"
        ],
        correctIndex: 1,
        explanation: "Rylands v. Fletcher (1868) established the rule of strict liability. It holds that if a person brings onto their land something which is not naturally there and which is likely to do mischief if it escapes, they must keep it at their peril, and are liable for all damage which is the natural consequence of its escape, regardless of any negligence."
      },
      {
        id: 'q2',
        question: "What is the primary operational distinction of a 'cognizable offence' under the Indian Code of Criminal Procedure (CrPC)?",
        options: [
          "The police can arrest the accused without a judicial warrant, and can investigate without a Magistrate's order.",
          "The offence is completely non-bailable under all circumstances.",
          "The offence carries a maximum penalty of exactly one year in prison.",
          "The trial must be completed within 60 days of registering the FIR."
        ],
        correctIndex: 0,
        explanation: "A cognizable offence is defined as one in which a police officer has the authority to arrest the suspect without a warrant from a magistrate, and can initiate an investigation immediately upon registration of the First Information Report (FIR)."
      }
    ];
  }

  // General default aptitude quiz
  return [
    {
      id: 'q1',
      question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train in meters?",
      options: [
        "120 meters",
        "150 meters",
        "324 meters",
        "180 meters"
      ],
      correctIndex: 1,
      explanation: "Convert speed to m/s: 60 km/hr = 60 * (5/18) = 50/3 m/s. Length of train = Speed * Time = (50/3) * 9 = 150 meters."
    },
    {
      id: 'q2',
      question: "Choose the correct antonym for the word 'DIFFERENTIATE':",
      options: [
        "Distinguish",
        "Confound",
        "Assimilate",
        "Analyze"
      ],
      correctIndex: 2,
      explanation: "'Differentiate' means to recognize or express a difference. 'Assimilate' means to absorb, blend in, or integrate, making it the correct antonym. 'Confound' means to confuse, and 'distinguish' is a synonym."
    }
  ];
};

export default function ExamsDirectory({ initialTab = 'exams', onNavigateToSpec, onNavigateToJobExplorer }: ExamsDirectoryProps) {
  const [activeTab, setActiveTab] = useState<'exams' | 'degrees' | 'specializations' | 'compare' | 'specialization_detail'>(() => {
    const preset = localStorage.getItem('degrees_tab_active_preset');
    if (preset === 'compare' && initialTab === 'degrees') {
      return 'compare';
    }
    return initialTab as any;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeViewMode, setDegreeViewMode] = useState<'mindmap' | 'list'>('mindmap');
  const [activeMindMapNode, setActiveMindMapNode] = useState<string | null>(null);
  const [degreeTypeFilter, setDegreeTypeFilter] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
  const [selectedDegreeForModal, setSelectedDegreeForModal] = useState<any>(null);
  const [selectedExamForModal, setSelectedExamForModal] = useState<any>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'pathway' | 'career' | 'resources'>('overview');
  
  // Custom states for interactive Exam Planner & Quiz Hub
  const [plannerYear, setPlannerYear] = useState<string>('2027');
  const [plannerLevel, setPlannerLevel] = useState<string>('Beginner');
  const [plannerHours, setPlannerHours] = useState<string>('5-7');
  const [plannerGenerated, setPlannerGenerated] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedExamForModal) {
      setActiveModalTab('overview');
      setPlannerGenerated(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setCompletedSteps({});
    }
  }, [selectedExamForModal]);

  useEffect(() => {
    const handleNavWithSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { tab, degreePreset, examPreset, specPreset, search } = customEvent.detail;
        
        if (tab === 'degrees') {
          const preset = localStorage.getItem('degrees_tab_active_preset');
          if (preset === 'compare') {
            setActiveTab('compare' as any);
            localStorage.removeItem('degrees_tab_active_preset');
          } else {
            setActiveTab('degrees');
          }
          if (degreePreset || search) {
            setSearchQuery(degreePreset || search);
          }
        } else if (tab === 'exams') {
          setActiveTab('exams');
          if (examPreset || search) {
            setSearchQuery(examPreset || search);
          }
        } else if (tab === 'specializations') {
          setActiveTab('specializations');
          if (specPreset || degreePreset || search) {
            setSearchQuery(specPreset || degreePreset || search);
          }
        }
      }
    };
    window.addEventListener('navigate-tab-with-search', handleNavWithSearch);
    return () => {
      window.removeEventListener('navigate-tab-with-search', handleNavWithSearch);
    };
  }, []);

  const examExtraDetails = useMemo(() => {
    if (!selectedExamForModal) return null;
    return getExamDetailsExtra(selectedExamForModal);
  }, [selectedExamForModal]);

  const detailedFacts = useMemo(() => {
    if (!selectedExamForModal) return null;
    return getExamDetailedFacts(selectedExamForModal.id, selectedExamForModal.level);
  }, [selectedExamForModal]);

  const quizQuestions = useMemo(() => {
    if (!selectedExamForModal) return [];
    return getQuizQuestionsForExam(selectedExamForModal.id);
  }, [selectedExamForModal]);
  const [specCategoryFilter, setSpecCategoryFilter] = useState<string>('all');
  const [selectedBscSubCourse, setSelectedBscSubCourse] = useState<string | null>(null);
  const [examLevelFilter, setExamLevelFilter] = useState<'UG' | 'PG' | 'DIPLOMA' | 'RESEARCH' | 'GOVT' | 'STUDY_ABROAD'>('UG');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const { trackedExams, toggleTrackedExam, isTracked } = useTrackedExams();
  const { hasReminder, toggleReminder } = useReminders();
  const { savedPathways, toggleSavedPathway, isSaved: isPathwaySaved } = useSavedPathways();

  const allSpecializations = useMemo(() => [
      ...ENGINEERING_SPECIALIZATIONS_DATABASE,
      ...MEDICAL_SPECIALIZATIONS_DATABASE,
      ...COMMERCE_SPECIALIZATIONS_DATABASE,
      ...ARTS_SPECIALIZATIONS_DATABASE,
      ...SCIENCE_SPECIALIZATIONS_DATABASE,
      ...LAW_SPECIALIZATIONS_DATABASE,
      ...MARITIME_AVIATION_SPECIALIZATIONS_DATABASE,
      ...MANAGEMENT_SPECIALIZATIONS_DATABASE,
      ...PARAMEDICAL_SPECIALIZATIONS_DATABASE,
      ...ANIMATION_SPECIALIZATIONS_DATABASE,
      ...PHARMACY_SPECIALIZATIONS_DATABASE,
      ...MASS_COMM_SPECIALIZATIONS_DATABASE,
      ...HOTEL_MGT_SPECIALIZATIONS_DATABASE,
      ...AVIATION_SPECIALIZATIONS_DATABASE,
      ...DESIGN_SPECIALIZATIONS_DATABASE,
      ...ARCHITECTURE_SPECIALIZATIONS_DATABASE,
      ...NATIONAL_COURSES_SPECIALIZATIONS_DATABASE,
      ...VOCATIONAL_SPECIALIZATIONS_DATABASE,
      ...DENTAL_SPECIALIZATIONS_DATABASE,
      ...VETERINARY_SPECIALIZATIONS_DATABASE,
      ...RELIGIOUS_SPECIALIZATIONS_DATABASE,
      ...COMPUTING_IT_SPECIALIZATIONS_DATABASE,
      ...BSC_SPECIALIZATIONS_DATABASE,
      ...DEFENCE_PE_SPECIALIZATIONS_DATABASE,
      ...EDUCATION_TEACHING_SPECIALIZATIONS_DATABASE,
      ...AGRICULTURE_SPECIALIZATIONS_DATABASE,
      ...USER_SPECIALIZATIONS_DATABASE
  ], []);

  // Custom states for Degree Comparison Feature
  const [compareAId, setCompareAId] = useState<string>(() => DEGREES_DB[41]?.id || '41'); // B.Tech CSE
  const [compareBId, setCompareBId] = useState<string>(() => DEGREES_DB[76]?.id || '76'); // BCA

  const handleSelectCategory = (catId: string | null) => {
    setActiveMindMapNode(catId);
    if (catId) {
      // Find which sector this category belongs to and select it so it becomes visible in the Search Directory
      let foundSector = 'all';
      for (const [secId, catIds] of Object.entries(SECTOR_MAPPING)) {
        if (catIds.includes(catId)) {
          foundSector = secId;
          break;
        }
      }
      setSelectedSector(foundSector);
      
      // Also clear search query so the selected category's degrees are fully displayed and not filtered out
      setSearchQuery('');
    } else {
      // Reset sector filter and search query when central hub is clicked
      setSelectedSector('all');
      setSearchQuery('');
    }
  };

  const getCategoryStyle = (catId: string, isActive: boolean) => {
    if (isActive) {
      return 'bg-blue-600 text-white border-blue-600 shadow-md';
    }
    
    if (['eng', 'comp', 'bsc', 'arch'].includes(catId)) {
      return 'bg-blue-50 text-blue-700 border-blue-200/60 hover:bg-blue-100/60';
    }
    if (['med', 'dent', 'pharm', 'para', 'vet'].includes(catId)) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/60';
    }
    if (['com', 'mgmt', 'law', 'hm'].includes(catId)) {
      return 'bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100/60';
    }
    if (['arts', 'des', 'anim', 'mass'].includes(catId)) {
      return 'bg-pink-50 text-pink-700 border-pink-200/60 hover:bg-pink-100/60';
    }
    return 'bg-violet-50 text-violet-700 border-violet-200/60 hover:bg-violet-100/60';
  };

  // Auto-select first matching specialization when active category changes
  useEffect(() => {
    if (activeMindMapNode) {
      const matches = SPECS_DB.filter(s => matchesCategory(s.category, activeMindMapNode));
      if (matches.length > 0) {
        setSelectedSpecId(matches[0].id);
      } else {
        setSelectedSpecId(null);
      }
    } else {
      setSelectedSpecId(null);
    }
  }, [activeMindMapNode]);

  // Smooth scroll to results when a node is clicked in mind map explorer mode
  useEffect(() => {
    if (activeMindMapNode && degreeViewMode === 'mindmap') {
      const el = document.getElementById('mindmap-degrees-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeMindMapNode, degreeViewMode]);

  // Reset activeModalTab to 'overview' when modal exam is changed
  useEffect(() => {
    if (selectedExamForModal) {
      setActiveModalTab('overview');
    }
  }, [selectedExamForModal]);

  const getFilteredDegrees = (node: string | null, search: string, typeFilter: string) => {
    return DEGREES_DB.filter(d => {
      // 1. Category Filter
      const matchesCat = !node || matchesCategory(d.category, node);
      
      // 2. Search Query Filter
      const matchesSearch = !search || 
        d.name.toLowerCase().includes(search.toLowerCase()) || 
        d.fullName.toLowerCase().includes(search.toLowerCase());
        
      // 3. Degree Type Filter
      let matchesType = true;
      if (typeFilter !== 'all') {
        const nameLower = d.name.toLowerCase();
        if (typeFilter === 'btech') {
          matchesType = nameLower.includes('b.tech') || nameLower.includes('b.e') || nameLower.startsWith('be');
        } else if (typeFilter === 'bsc') {
          matchesType = nameLower.startsWith('b.sc') || nameLower.includes('bsc');
        } else if (typeFilter === 'bcom') {
          matchesType = nameLower.startsWith('b.com') || nameLower.includes('bba') || nameLower.includes('bms');
        } else if (typeFilter === 'bca') {
          matchesType = nameLower.includes('bca') || nameLower.includes('it') || nameLower.includes('comp');
        } else if (typeFilter === 'medical') {
          matchesType = nameLower.includes('mbbs') || nameLower.includes('bds') || nameLower.includes('bams') || nameLower.includes('bhms') || nameLower.includes('pharm') || nameLower.includes('nurse');
        } else if (typeFilter === 'ba') {
          matchesType = nameLower.startsWith('b.a') || nameLower.includes('ba ') || nameLower === 'ba';
        }
      }
      
      return matchesCat && matchesType && matchesSearch;
    });
  };

  const getFilteredSpecs = (node: string | null, search: string) => {
    return SPECS_DB.filter(s => {
      const matchesCat = !node || matchesCategory(s.category, node);
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  };

  const filteredDegreesFromMindMap = getFilteredDegrees(activeMindMapNode, searchQuery, degreeTypeFilter);
  const filteredSpecsFromMindMap = getFilteredSpecs(activeMindMapNode, searchQuery);

  const renderMasterDetail = () => {
    // Filter categories by selected sector and search query
    const filteredCats = CATEGORIES.filter(cat => {
      // 1. Sector Filter
      if (selectedSector !== 'all') {
        const allowed = SECTOR_MAPPING[selectedSector] || [];
        if (!allowed.includes(cat.id)) {
          return false;
        }
      }
      // 2. Search Query
      if (searchQuery) {
        const meta = CATEGORY_META[cat.id];
        const matchName = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchDesc = meta ? meta.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        if (!matchName && !matchDesc) {
          return false;
        }
      }
      return true;
    });

    const activeCatId = activeMindMapNode;
    const activeCategory = activeCatId ? (CATEGORIES.find(c => c.id === activeCatId) || CATEGORIES[7]) : null;
    const activeMeta = activeCatId ? (CATEGORY_META[activeCatId] || {
      branchName: "GENERAL",
      branchColor: "bg-slate-500",
      shortDesc: "Explore professional degree pathways and courses.",
      fullOverview: "Explore course and degree program details."
    }) : null;

    // Filter degrees under this active category, matching search query
    const matchedDegrees = DEGREES_DB.filter(d => {
      // 1. Category Check
      if (!activeCatId) return false;
      const isCorrectCat = matchesCategory(d, activeCatId);
      if (!isCorrectCat) return false;

      // 2. Search Query Check
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const matchesSearch = d.name.toLowerCase().includes(queryLower) || 
                              d.fullName.toLowerCase().includes(queryLower);
        if (!matchesSearch) return false;
      }

      return true;
    });

    // Get profiles matching this category to calculate profiles count dynamically
    const getProfileCount = (catId: string) => {
      return SPECS_DB.filter(s => matchesCategory(s.category, catId)).length;
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="degrees-master-detail-container">
        {/* LEFT COLUMN: SEARCH DIRECTORY */}
        <div className="lg:col-span-4 flex flex-col bg-white border border-slate-200 rounded-[2rem] p-6 shadow-md" id="search-directory-sidebar">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                🗂️ SEARCH DIRECTORY ({filteredCats.length})
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                FILTERED CANDIDATES
              </p>
            </div>
            {(selectedSector !== 'all' || searchQuery || activeMindMapNode !== null) && (
              <button
                onClick={() => {
                  setSelectedSector('all');
                  setSearchQuery('');
                  setActiveMindMapNode(null);
                }}
                className="text-xs font-black text-red-500 hover:text-red-600 transition-all uppercase tracking-wider"
              >
                Reset
              </button>
            )}
          </div>

          {/* Filter by degree field */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                🎓 FILTER BY DEGREE FIELD:
              </span>
            </div>

            {/* Sector Buttons Grid */}
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map(sec => (
                <button
                  key={`sec-${sec.id}`}
                  onClick={() => {
                    setSelectedSector(sec.id);
                    // Auto-select first category in this sector if any
                    if (sec.id !== 'all') {
                      const allowed = SECTOR_MAPPING[sec.id] || [];
                      if (allowed.length > 0 && !allowed.includes(activeMindMapNode || '')) {
                        setActiveMindMapNode(allowed[0]);
                      }
                    }
                  }}
                  className={`py-2 px-3 rounded-xl text-[11px] font-black tracking-wide transition-all text-center border ${
                    selectedSector === sec.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {sec.name}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical List of matching Categories (Domains) */}
          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredCats.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs font-bold">No Categories Match</p>
                <p className="text-[10px] text-slate-500 mt-1">Try resetting the filters above.</p>
              </div>
            ) : (
              filteredCats.map((cat, index) => {
                const isSelected = activeCatId === cat.id;
                const pCount = getProfileCount(cat.id);
                const meta = CATEGORY_META[cat.id] || {
                  branchName: "GENERAL BRANCH",
                  branchColor: "bg-slate-500",
                  shortDesc: "Explore professional degree pathways and courses."
                };

                return (
                  <div
                    key={`sidebar-cat-${cat.id}`}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 group relative ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-[0_4px_16px_rgba(37,99,235,0.08)] translate-x-1.5'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Left: Icon box styled nicely */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-sm transition-transform group-hover:scale-105"
                      style={{ 
                        backgroundColor: isSelected ? `${cat.color}25` : `${cat.color}10`,
                        borderColor: isSelected ? `${cat.color}40` : `${cat.color}20` 
                      }}
                    >
                      {cat.icon}
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-1 min-w-0 flex-1">
                      {/* Top Row Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-blue-200/50 text-blue-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {pCount} Profiles
                        </span>
                        <span className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          <span className={`w-1 h-1 rounded-full ${meta.branchColor}`}></span>
                          {meta.branchName}
                        </span>
                      </div>

                      {/* Category Title */}
                      <h4 className={`text-sm font-black transition-colors ${
                        isSelected ? 'text-blue-900' : 'text-slate-800 group-hover:text-blue-600'
                      }`}>
                        {cat.name}
                      </h4>

                      {/* Brief description */}
                      <p className="text-slate-500 text-[10px] font-bold leading-relaxed line-clamp-2">
                        {meta.shortDesc}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}
        <div className="lg:col-span-8 flex flex-col gap-6" id="domain-profile-panel">
          {activeCategory && activeMeta ? (
            <>
              {/* Header Card: Domain Overview */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-md">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    DOMAIN OVERVIEW
                  </span>
                  <p className="text-slate-700 text-sm md:text-base font-bold leading-relaxed">
                    {activeMeta.fullOverview}
                  </p>
                </div>
              </div>

              {/* Pathways Card */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-md">
                <div className="border-b border-slate-100 pb-5 mb-6 space-y-1">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-blue-500">🎓</span> OFFERED DEGREE PROGRAMS / COURSE PATHWAYS
                  </h3>
                  <p className="text-slate-500 text-xs font-bold leading-relaxed">
                    The following programs are offered under the {activeCategory.name} domain. Click on a course to navigate to its core profile directory.
                  </p>
                </div>

                {/* Grid of Course Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {matchedDegrees.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-xs font-bold">No Degree Programs Listed</p>
                      <p className="text-[10px] text-slate-500 mt-1">We are currently seeding course structures for this domain.</p>
                    </div>
                  ) : (
                    matchedDegrees.map((deg) => {
                      const isSaved = isPathwaySaved(deg.id);
                      return (
                        <div
                          key={`deg-card-${deg.id}`}
                          onClick={() => setSelectedDegreeForModal(deg)}
                          className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[150px] relative"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                                style={{ backgroundColor: `${activeCategory.color}15`, color: activeCategory.color }}
                              >
                                🎓
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-400 font-extrabold uppercase">
                                  {deg.duration}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSavedPathway({
                                      id: deg.id,
                                      title: deg.name,
                                      type: deg.duration,
                                      institute: deg.fullName
                                    });
                                  }}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    isSaved
                                      ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100 hover:border-rose-300 shadow-xs'
                                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                  }`}
                                  title={isSaved ? "Saved to profile" : "Save degree pathway"}
                                >
                                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                {deg.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-extrabold line-clamp-2 mt-0.5">
                                {deg.fullName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2.5 border-t border-slate-50 mt-3 text-[10px] font-black uppercase text-blue-600">
                            <span>View Details</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-slate-200 rounded-[2rem] p-12 text-center shadow-md space-y-4 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl">
                🎓
              </div>
              <h3 className="text-xl font-black text-slate-800">Select a Course Category</h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed font-semibold">
                Choose any course category from the directory on the left or the concentric mind map above to explore core program requirements, subjects, career pathways, and salary metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Update tab if prop changes
  useEffect(() => {
    const preset = localStorage.getItem('degrees_tab_active_preset');
    if (preset === 'compare' && initialTab === 'degrees') {
      setActiveTab('compare' as any);
      localStorage.removeItem('degrees_tab_active_preset');
    } else {
      setActiveTab((prev) => {
        if (initialTab === 'degrees' && prev === 'compare') {
          return prev;
        }
        if (initialTab === 'specializations' && prev === 'specialization_detail') {
          return prev;
        }
        return initialTab as any;
      });
    }
    if (initialTab === 'degrees') {
      setDegreeViewMode('mindmap');
      const degreePreset = localStorage.getItem('degree_preset_search');
      if (degreePreset) {
        setSearchQuery(degreePreset);
        localStorage.removeItem('degree_preset_search');
      }
    } else if (initialTab === 'exams') {
      const examPreset = localStorage.getItem('exam_preset_search');
      if (examPreset) {
        setSearchQuery(examPreset);
        localStorage.removeItem('exam_preset_search');
      }
    } else if (initialTab === 'specializations') {
      const specPreset = localStorage.getItem('spec_preset_search');
      if (specPreset) {
        setSearchQuery(specPreset);
        localStorage.removeItem('spec_preset_search');
      }
    }
  }, [initialTab]);

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300">
      
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Exams & Degrees Analytics Board
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
            Explore verified requirements, schedules, eligibility structures, top engineering/medical/common collegiate entrance systems, syllabus maps, specialized career pathways, and expected salaries. Select any profile for complete real-market breakdowns.
          </p>
        </div>
      </div>

      {/* Header and Controls */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-300 shadow-sm overflow-x-auto scrollbar-none whitespace-nowrap">
        
        <div className="flex gap-1 shrink-0 items-center">
          <button 
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'exams' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('exams')}
          >
            🔥 Exams Hub
          </button>
          <button 
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'degrees' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => {
              setActiveTab('degrees');
              setDegreeViewMode('mindmap');
            }}
          >
            🎓 Degrees & Profiles Directory
          </button>
          <button 
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'specializations' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('specializations')}
          >
            ⭐ Specializations Hub
          </button>
          <button 
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'compare' as any ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('compare' as any)}
          >
            ⚖️ Compare Degrees
          </button>
        </div>
        
        <div className="w-px h-8 bg-slate-200 shrink-0 hidden md:block"></div>
        
        <div className="relative w-full min-w-[200px] shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search database..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {activeTab === 'degrees' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 p-4 md:px-6 rounded-2xl border border-slate-300 shadow-sm">
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                🎓 Degrees Directory View Modes
              </h3>
              <p className="text-xs font-medium text-slate-600">
                Choose between the highly interactive concentric Mind Map explorer or the classic structured List search.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
              <button 
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${degreeViewMode === 'mindmap' ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
                onClick={() => setDegreeViewMode('mindmap')}
              >
                🗺️ MIND MAP EXPLORER
              </button>
              <button 
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${degreeViewMode === 'list' ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'text-slate-700 hover:bg-slate-200'}`}
                onClick={() => setDegreeViewMode('list')}
              >
                📋 CLASSIC DIRECTORY
              </button>
            </div>
          </div>

        </>
      )}

      {/* Decoupled Tab Content Grids */}
      
      {/* Exams Tab Grid */}
      {activeTab === 'exams' && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 p-4 md:px-6 rounded-2xl border border-slate-300 shadow-sm mb-6">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
              🏛️ Exams & Recruitment Hub
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Comprehensive Reference — UG, PG & Government Levels
            </p>
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-xl shadow-inner overflow-x-auto whitespace-nowrap hide-scrollbar">
            {(['UG', 'PG', 'DIPLOMA', 'RESEARCH', 'GOVT', 'STUDY_ABROAD'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setExamLevelFilter(mode)}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all uppercase tracking-wider flex-shrink-0 ${
                  examLevelFilter === mode ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {mode === 'GOVT' ? 'Govt / PSC' : mode === 'DIPLOMA' ? 'Diploma / ITI' : mode === 'RESEARCH' ? 'Research / PhD' : mode === 'STUDY_ABROAD' ? 'Study Abroad' : mode + ' Exams'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exams Tab Grid */}
      {activeTab === 'exams' && (
        <div className="space-y-12 animate-fade-in">
          {(() => {
            const filteredExams = EXAMS_DB.filter(e => 
                (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                ((e as any).conductingBody?.toLowerCase() || '').includes(searchQuery.toLowerCase())
              )
              .filter(e => searchQuery ? true : (e as any).level === examLevelFilter);
              
            const groupings = {
              'UG': [
                { title: 'Engineering — National Level', filter: (e: any) => e.category === 'Engineering — National Level' },
                { title: 'Engineering — State Level', filter: (e: any) => e.category === 'Engineering — State Level' },
                { title: 'Medical & Health Sciences', filter: (e: any) => e.category === 'Medical & Health Sciences' },
                { title: 'Nursing & Allied Health', filter: (e: any) => e.category === 'Nursing & Allied Health' },
                { title: 'Pharmacy', filter: (e: any) => e.category === 'Pharmacy' },
                { title: 'Law', filter: (e: any) => e.category === 'Law' },
                { title: 'Design & Architecture', filter: (e: any) => e.category === 'Design & Architecture' },
                { title: 'Integrated & UG Management', filter: (e: any) => e.category === 'Integrated & UG Management' },
                { title: 'General / Central & State Universities', filter: (e: any) => e.category === 'General / Central & State Universities' },
                { title: 'Defence (UG-Entry)', filter: (e: any) => e.category === 'Defence (UG-Entry)' },
                { title: 'Agriculture, Fisheries, Forestry & Veterinary', filter: (e: any) => e.category === 'Agriculture, Fisheries, Forestry & Veterinary' },
                { title: 'Hotel Management & Hospitality', filter: (e: any) => e.category === 'Hotel Management & Hospitality' },
                { title: 'Journalism, Mass Communication & Media', filter: (e: any) => e.category === 'Journalism, Mass Communication & Media' },
                { title: 'Aviation, Merchant Navy & Allied', filter: (e: any) => e.category === 'Aviation, Merchant Navy & Allied' },
              ],
              'PG': [
                { title: 'Engineering & Technology', filter: (e: any) => e.category === 'Engineering & Technology' },
                { title: 'Pure & Applied Sciences', filter: (e: any) => e.category === 'Pure & Applied Sciences' },
                { title: 'Medical', filter: (e: any) => e.category === 'Medical' },
                { title: 'Management', filter: (e: any) => e.category === 'Management' },
                { title: 'Law', filter: (e: any) => e.category === 'Law' },
                { title: 'General / Central Universities', filter: (e: any) => e.category === 'General / Central Universities' },
                { title: 'Computer Applications', filter: (e: any) => e.category === 'Computer Applications' },
                { title: 'Design & Architecture (PG)', filter: (e: any) => e.category === 'Design & Architecture (PG)' },
              ],
              'DIPLOMA': [
                { title: 'Diploma & Polytechnic Entrance', filter: (e: any) => e.category === 'Diploma & Polytechnic Entrance' },
                { title: 'ITI Admissions', filter: (e: any) => e.category === 'ITI Admissions' },
                { title: 'Lateral Entry Exams (Diploma-to-Degree)', filter: (e: any) => e.category === 'Lateral Entry Exams (Diploma-to-Degree)' },
              ],
              'RESEARCH': [
                { title: 'Research, NET & PhD Entrance', filter: (e: any) => e.category === 'Research, NET & PhD Entrance' },
              ],
              'STUDY_ABROAD': [
                { title: 'Study Abroad (MS, MBA) & Language Proficiency', filter: (e: any) => e.category === 'Study Abroad & Language Proficiency' },
              ],
              'GOVT': [
                { title: 'Civil Services & Union Government (UPSC)', filter: (e: any) => e.category === 'Civil Services & Union Government (UPSC)' },
                { title: 'Staff Selection Commission (SSC)', filter: (e: any) => e.category === 'Staff Selection Commission (SSC)' },
                { title: 'Banking & Insurance', filter: (e: any) => e.category === 'Banking & Insurance' },
                { title: 'Railways', filter: (e: any) => e.category === 'Railways' },
                { title: 'Defence & Police (Graduate-Level)', filter: (e: any) => e.category === 'Defence & Police (Graduate-Level)' },
                { title: 'PSU Recruitment', filter: (e: any) => e.category === 'PSU Recruitment' },
                { title: 'State Public Service Commissions', filter: (e: any) => e.category === 'State Public Service Commissions' },
                { title: 'Teaching Eligibility & Recruitment', filter: (e: any) => e.category === 'Teaching Eligibility & Recruitment' },
                { title: 'Judicial & Legal Services', filter: (e: any) => e.category === 'Judicial & Legal Services' },
                { title: 'Other Central & Miscellaneous Govt Exams', filter: (e: any) => e.category === 'Other Central & Miscellaneous Govt Exams' },
              ]
            };
            
            const currentGroupings = searchQuery 
              ? Array.from(new Set(filteredExams.map((e: any) => e.category))).map(cat => ({ title: cat, filter: (e: any) => e.category === cat }))
              : groupings[examLevelFilter as keyof typeof groupings];
            
            return currentGroupings.map(group => {
              const groupExams = filteredExams.filter(group.filter);
              if (groupExams.length === 0) return null;
              
              return (
                <div key={group.title} className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{group.title}</h2>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupExams.map(exam => (
                      <div 
                        key={exam.id} 
                        onClick={() => setSelectedExamForModal(exam)}
                        className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-blue-100 max-w-[70%] truncate">
                              {(exam as any).category || (exam as any).type}
                            </span>
                            {(exam as any).difficulty && (
                              <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-wider flex-shrink-0">
                                <Award className="w-3.5 h-3.5" /> Diff: {(exam as any).difficulty}/5
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{exam.name}</h3>
                          {(exam as any).fullName && <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-wide">{(exam as any).fullName}</p>}
                          
                          {(exam as any).conductingBody && (
                            <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">CONDUCTING BODY</span>
                              <p className="text-xs text-slate-700 font-bold leading-relaxed">{(exam as any).conductingBody}</p>
                            </div>
                          )}

                          {(exam as any).purpose && (
                            <div className="mt-3 px-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">PURPOSE / SCOPE</span>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed italic line-clamp-3">{(exam as any).purpose}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            {(exam as any).eligibility && (
                                <>
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ELIGIBILITY</span>
                                  <span className="text-xs text-slate-900 font-black">{(exam as any).eligibility}</span>
                                </>
                            )}
                          </div>
                          <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* Degrees Tab - Master Detail View */}
      {activeTab === 'degrees' && degreeViewMode === 'list' && (
        renderMasterDetail()
      )}

      {/* Degrees Tab - Mind Map Mode */}
      {activeTab === 'degrees' && degreeViewMode === 'mindmap' && (
        <div className="space-y-10 animate-fade-in">
          <DegreeMindMap 
            activeNode={activeMindMapNode} 
            setActiveNode={handleSelectCategory} 
            searchQuery={searchQuery}
            selectedSector={selectedSector}
            sectorMapping={SECTOR_MAPPING}
            degreesDb={DEGREES_DB}
            onSelectDegree={setSelectedDegreeForModal}
          />
          
          {/* Below the Mind Map, show either the detail view or selection prompt */}
          {activeMindMapNode !== null ? (
            <div id="mindmap-degrees-results" className="scroll-mt-24">
              {renderMasterDetail()}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 bg-slate-50/40 rounded-[2rem] border border-dashed border-slate-200 animate-fade-in duration-300">
              <GraduationCap className="w-10 h-10 mx-auto text-slate-400 mb-3 animate-pulse" />
              <h3 className="text-lg font-black text-slate-700">Explore Curated Degrees</h3>
              <p className="text-sm mt-1 text-slate-500 max-w-md mx-auto leading-relaxed">
                Click on any course category node in the concentric Mind Map above to instantly load associated bachelor degrees, study durations, and specialized career profiles.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Specializations Tab Grid */}
      {activeTab === 'specializations' && (
        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full items-start">
          {/* Vertical Degree Sidebar / Filters for Specialization Hub */}
          <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-md shrink-0 lg:sticky lg:top-24 max-h-[calc(100vh-140px)] flex flex-col">
            <div className="pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🎯</span> SPECIALIZATION HUB
              </h3>
              <p className="text-slate-500 text-[11px] font-bold mt-1">
                Explore pathways across 23 major degree fields. Select a category to see specialized curriculum and career roles.
              </p>
              
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search 23 fields..."
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {(specCategoryFilter !== 'all' || categorySearchQuery) && (
                <button
                  onClick={() => {
                    setSpecCategoryFilter('all');
                    setSelectedBscSubCourse(null);
                    setCategorySearchQuery('');
                  }}
                  className="w-full mt-3 text-xs font-black text-red-500 hover:text-red-600 transition-all uppercase tracking-wider bg-red-50 hover:bg-red-100 py-2 rounded-xl border border-red-200 block text-center"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Vertical Scroll List of 23 degree fields */}
            <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 flex-1 scrollbar-thin max-h-[300px] lg:max-h-[calc(100vh-340px)]">
              {categorySearchQuery === '' && (
                <button
                  onClick={() => {
                    setSpecCategoryFilter('all');
                    setSelectedBscSubCourse(null);
                  }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-black tracking-wide text-left border flex items-center justify-between transition-all ${
                    specCategoryFilter === 'all'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🌐</span>
                    <span>All Degrees</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    specCategoryFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {SPECS_DB.length}
                  </span>
                </button>
              )}

              {CATEGORIES.filter(cat => 
                cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) || 
                cat.id.toLowerCase().includes(categorySearchQuery.toLowerCase())
              ).map(cat => {
                // Count specializations for this category
                const count = SPECS_DB.filter(s => matchesCategory(s, cat.id)).length;
                return (
                  <React.Fragment key={`cat-group-${cat.id}`}>
                    <button
                      key={`spec-filter-${cat.id}`}
                      onClick={() => {
                        setSpecCategoryFilter(cat.id);
                        setSelectedBscSubCourse(null);
                      }}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-black tracking-wide text-left border flex items-center justify-between transition-all ${
                        specCategoryFilter === cat.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-[1.02] translate-x-1'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <span className="shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black shrink-0 ${
                        specCategoryFilter === cat.id ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                    {cat.id === 'bsc' && specCategoryFilter === 'bsc' && (
                      <div className="text-[9px] text-slate-500 px-4 pb-3 pt-2 font-medium bg-slate-50 rounded-b-2xl border-x border-b border-slate-200 animate-fade-in">
                        <div className="mb-1.5 font-bold text-slate-400 flex justify-between items-center">
                          <span>SUB-COURSES:</span>
                          {selectedBscSubCourse && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBscSubCourse(null);
                              }}
                              className="text-[8px] text-red-500 hover:text-red-600 uppercase font-black"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {['Computing & IT', 'Medical', 'Forestry', 'Defence', 'Marine & Aviation', 'Agriculture & Allied Sciences', 'Pure Science', 'Others'].map(course => (
                            <button
                              key={course}
                              onClick={() => {
                                setSelectedBscSubCourse(prev => prev === course ? null : course);
                                document.getElementById('specializations-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
                              className={`px-2 py-1 rounded transition-all text-left font-black tracking-wide text-[9px] border shadow-sm ${
                                selectedBscSubCourse === course
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 text-slate-600'
                              }`}
                            >
                              {course}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Grid of Specializations */}
          <div className="flex-1 w-full scroll-mt-24">
            {/* New Search Header for Specializations */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>🚀</span> CAREER TRACKS
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">
                  {specCategoryFilter === 'all' 
                    ? "Browsing all specializations across domains." 
                    : `Showing specializations for ${CATEGORIES.find(c => c.id === specCategoryFilter)?.name || specCategoryFilter}.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500" />
                  <input 
                    type="text"
                    placeholder="Search career tracks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-emerald-50/30 border border-emerald-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {SPECS_DB.filter(s => {
                    const query = searchQuery.toLowerCase();
                    const textMatch = s.name.toLowerCase().includes(query) || 
                                      s.category.toLowerCase().includes(query);
                    const categoryMatch = specCategoryFilter === 'all' || matchesCategory(s, specCategoryFilter);
                    let bscSubCourseMatch = true;
                    if (specCategoryFilter === 'bsc' && selectedBscSubCourse) {
                      const mappedKeywords = SUB_COURSE_MAPPING[selectedBscSubCourse] || [];
                      bscSubCourseMatch = mappedKeywords.some(keyword => s.name.toLowerCase().includes(keyword.toLowerCase()));
                    }
                    return textMatch && categoryMatch && bscSubCourseMatch;
                  }).length} Results
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 scroll-mt-24" id="specializations-grid">
              {SPECS_DB.filter(s => {
                const query = searchQuery.toLowerCase();
                const textMatch = s.name.toLowerCase().includes(query) || 
                                  s.category.toLowerCase().includes(query);
                const categoryMatch = specCategoryFilter === 'all' || matchesCategory(s, specCategoryFilter);
                
                let bscSubCourseMatch = true;
                if (specCategoryFilter === 'bsc' && selectedBscSubCourse) {
                  const mappedKeywords = SUB_COURSE_MAPPING[selectedBscSubCourse] || [];
                  bscSubCourseMatch = mappedKeywords.some(keyword => s.name.toLowerCase().includes(keyword.toLowerCase()));
                }
                
                return textMatch && categoryMatch && bscSubCourseMatch;
              }).map(spec => (
                <div key={spec.id} className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {spec.category}
                      </span>
                      {spec.trending && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          Trending
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{spec.name}</h3>
                    <p className="text-sm text-slate-500 mt-2 font-medium line-clamp-2">A focused pathway in {spec.category} targeting modern industry demands.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (typeof onNavigateToSpec === 'function') {
                        onNavigateToSpec(spec.id);
                      } else {
                        setSelectedSpecId(spec.id);
                        setActiveTab('specialization_detail');
                      }
                    }}
                    className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors w-full"
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Curriculum</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compare Degrees Tab View */}
      {activeTab === 'compare' && (() => {
        const degA = DEGREES_DB.find(d => d.id === compareAId) || DEGREES_DB[41];
        const degB = DEGREES_DB.find(d => d.id === compareBId) || DEGREES_DB[76];

        const getSalaryRange = (cat: string) => {
          const catLower = cat.toLowerCase();
          if (catLower.includes('medical') || catLower.includes('health') || catLower.includes('dental')) return '₹8.0L - ₹15.0L';
          if (catLower.includes('engineering') || catLower.includes('technology') || catLower.includes('computer')) return '₹6.5L - ₹14.0L';
          if (catLower.includes('commerce') || catLower.includes('account')) return '₹4.0L - ₹7.5L';
          if (catLower.includes('management') || catLower.includes('business')) return '₹4.5L - ₹8.5L';
          if (catLower.includes('design') || catLower.includes('creative') || catLower.includes('animation')) return '₹4.5L - ₹9.0L';
          if (catLower.includes('pure') || catLower.includes('science')) return '₹3.5L - ₹6.0L';
          if (catLower.includes('paramedical') || catLower.includes('nursing')) return '₹3.0L - ₹5.5L';
          return '₹3.0L - ₹5.0L';
        };

        const getGrowthLevel = (cat: string) => {
          const catLower = cat.toLowerCase();
          if (catLower.includes('computer') || catLower.includes('technology') || catLower.includes('ai') || catLower.includes('security')) return 'Exponential (25% YOY)';
          if (catLower.includes('medical') || catLower.includes('health')) return 'Very High (18% YOY)';
          if (catLower.includes('design') || catLower.includes('animation')) return 'High (15% YOY)';
          if (catLower.includes('management') || catLower.includes('commerce')) return 'Steady (10% YOY)';
          return 'Moderate (8% YOY)';
        };

        const getJobStyle = (cat: string) => {
          const catLower = cat.toLowerCase();
          if (catLower.includes('medical') || catLower.includes('health') || catLower.includes('dental')) {
            return 'High responsibility, clinical settings, patient-facing shifts, and rigid regulations.';
          }
          if (catLower.includes('engineering') || catLower.includes('technology') || catLower.includes('computer')) {
            return 'Cognitive problem-solving, digital development pipelines, remote/hybrid flexibility, rapid technology changes.';
          }
          if (catLower.includes('commerce') || catLower.includes('account') || catLower.includes('management')) {
            return 'Corporate structures, meeting schedules, spreadsheet analytics, audit filings, organizational alignment.';
          }
          if (catLower.includes('design') || catLower.includes('creative') || catLower.includes('animation')) {
            return 'Creative studio setups, agency campaigns, visual asset creation, feedback-driven iteration, layout and UX mapping.';
          }
          return 'Academic, regulatory, lab-focused research, with highly structured compliance frameworks.';
        };

        const rolesA = getRolesForDegree(degA.name, degA.fullName, degA.category);
        const rolesB = getRolesForDegree(degB.name, degB.fullName, degB.category);

        return (
          <div className="space-y-8 animate-fade-in" id="degree-comparison-view">
            {/* Split selectors header */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-md">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
                  ⚖️ SIDE-BY-SIDE ANALYTICS
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Compare Degree Programs Side-By-Side
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Pick any two undergraduate options from our verified databases. Compare curriculum subjects, career trajectory profiles, entry qualifications, starting pay structures, and labor growth rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Degree A selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Choose Degree A (Left Side)
                  </label>
                  <select
                    value={compareAId}
                    onChange={(e) => setCompareAId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    {DEGREES_DB.map(d => (
                      <option key={`compare-opt-a-${d.id}`} value={d.id}>
                        {d.name} — {d.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Degree B selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Choose Degree B (Right Side)
                  </label>
                  <select
                    value={compareBId}
                    onChange={(e) => setCompareBId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    {DEGREES_DB.map(d => (
                      <option key={`compare-opt-b-${d.id}`} value={d.id}>
                        {d.name} — {d.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Side-by-side comparative dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card A */}
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-md relative overflow-hidden transition-all hover:border-blue-400">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-40 shrink-0 pointer-events-none"></div>
                <div className="space-y-6">
                  {/* Title Header */}
                  <div>
                    <span className="bg-blue-100 text-blue-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {degA.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-3 leading-tight">
                      {degA.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-extrabold mt-1 uppercase tracking-wider leading-relaxed">
                      {degA.fullName}
                    </p>
                  </div>

                  {/* Standard Duration */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Standard Program Duration
                      </p>
                      <p className="text-base font-black text-slate-800 mt-1">
                        ⏱️ {degA.duration} (Undergraduate)
                      </p>
                    </div>
                  </div>

                  {/* Curriculums Side */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      📖 Core Subjects & Syllabus Mapping
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {degA.subjects.map((sub, i) => (
                        <span key={i} className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Future Career Roles */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      💼 Typical Professional Career Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rolesA.map((role, i) => (
                        <span key={i} className="text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                          🔥 {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projections Matrix */}
                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      📈 Market Projections & Lifestyle
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          Starter Salaries
                        </span>
                        <p className="text-sm font-black text-emerald-600">
                          {getSalaryRange(degA.category)}
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          Industrial Growth
                        </span>
                        <p className="text-sm font-black text-blue-600">
                          {getGrowthLevel(degA.category)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        Typical Work-Life Environment
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {getJobStyle(degA.category)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card B */}
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-md relative overflow-hidden transition-all hover:border-emerald-400">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full opacity-40 shrink-0 pointer-events-none"></div>
                <div className="space-y-6">
                  {/* Title Header */}
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {degB.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-3 leading-tight">
                      {degB.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-extrabold mt-1 uppercase tracking-wider leading-relaxed">
                      {degB.fullName}
                    </p>
                  </div>

                  {/* Standard Duration */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Standard Program Duration
                      </p>
                      <p className="text-base font-black text-slate-800 mt-1">
                        ⏱️ {degB.duration} (Undergraduate)
                      </p>
                    </div>
                  </div>

                  {/* Curriculums Side */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      📖 Core Subjects & Syllabus Mapping
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {degB.subjects.map((sub, i) => (
                        <span key={i} className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Future Career Roles */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      💼 Typical Professional Career Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rolesB.map((role, i) => (
                        <span key={i} className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                          🔥 {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projections Matrix */}
                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      📈 Market Projections & Lifestyle
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          Starter Salaries
                        </span>
                        <p className="text-sm font-black text-emerald-600">
                          {getSalaryRange(degB.category)}
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          Industrial Growth
                        </span>
                        <p className="text-sm font-black text-blue-600">
                          {getGrowthLevel(degB.category)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        Typical Work-Life Environment
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {getJobStyle(degB.category)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Empty State Banner */}
      {((activeTab === 'exams' && EXAMS_DB.filter(e => 
          (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
          ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
          ((e as any).conductingBody?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        ).filter(e => searchQuery ? true : (e as any).level === examLevelFilter).length === 0) ||
        (activeTab === 'degrees' && degreeViewMode === 'list' && DEGREES_DB.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.fullName.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) ||
        (activeTab === 'specializations' && SPECS_DB.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0)) && (
        <div className="text-center p-12 text-slate-400 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
          <Filter className="w-8 h-8 mx-auto text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-600">No Matches Found</h3>
          <p className="text-xs mt-1 max-w-sm mx-auto">We couldn't find any entries matching your current search. Try modifying your search term or selecting a different tab.</p>
        </div>
      )}

      {/* Specialization details page */}
      {activeTab === 'specialization_detail' && selectedSpecId && (
        <SpecializationDetailView 
          specId={selectedSpecId} 
          onBack={() => setActiveTab('specializations')} 
          onNavigateToJobExplorer={typeof onNavigateToJobExplorer === 'function' ? onNavigateToJobExplorer : () => {}}
          onNavigateToSpec={typeof onNavigateToSpec === 'function' ? onNavigateToSpec : () => {}}
        />
      )}

      
      {/* Exam details modal */}
      {selectedExamForModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-200">
                      {selectedExamForModal.category || selectedExamForModal.type}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Level: {selectedExamForModal.level}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                    {selectedExamForModal.name}
                  </h3>
                  {selectedExamForModal.fullName && (
                    <p className="text-xs md:text-sm font-extrabold text-slate-500 uppercase tracking-wide">
                      {selectedExamForModal.fullName}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleReminder(selectedExamForModal.id, selectedExamForModal.name)}
                    className={`p-2 rounded-xl transition-all border flex items-center gap-1 text-[10px] font-black ${
                      hasReminder(selectedExamForModal.id) 
                        ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                    title="Set exam alert"
                  >
                    <Bell className={`w-3.5 h-3.5 ${hasReminder(selectedExamForModal.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span className="hidden sm:inline">{hasReminder(selectedExamForModal.id) ? 'Active' : 'Alert'}</span>
                  </button>
                  <button
                    onClick={() => toggleTrackedExam(selectedExamForModal.id)}
                    className={`p-2 rounded-xl transition-all border flex items-center gap-1 text-[10px] font-black ${
                      isTracked(selectedExamForModal.id) 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                    title="Bookmark exam"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isTracked(selectedExamForModal.id) ? 'fill-indigo-500 text-indigo-500' : ''}`} />
                    <span className="hidden sm:inline">{isTracked(selectedExamForModal.id) ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedExamForModal(null)}
                    className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex border-b border-slate-200 p-0.5 bg-slate-100/80 rounded-2xl">
                <button
                  onClick={() => setActiveModalTab('overview')}
                  className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all ${
                    activeModalTab === 'overview'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🔍 Overview
                </button>
                <button
                  onClick={() => setActiveModalTab('pathway')}
                  className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all ${
                    activeModalTab === 'pathway'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🗺️ Next Steps
                </button>
                <button
                  onClick={() => setActiveModalTab('career')}
                  className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all ${
                    activeModalTab === 'career'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  💼 Careers & Salary
                </button>
                <button
                  onClick={() => setActiveModalTab('resources')}
                  className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all ${
                    activeModalTab === 'resources'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📚 Prep Kit
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto bg-white flex-1 custom-scrollbar">
              <div className="space-y-6">

                {/* TAB 1: OVERVIEW & STRUCTURE */}
                {activeModalTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    {selectedExamForModal.purpose && (
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-blue-500" /> PURPOSE & SCOPE
                        </h4>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed bg-blue-50/20 p-4 rounded-2xl border border-blue-100/40">
                          {selectedExamForModal.purpose}
                        </p>
                      </div>
                    )}

                    {/* Highly Detailed Quick Facts Grid */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-blue-500" /> DETAILED EXAM STRUCTURE & KEY FACTS
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
                        {selectedExamForModal.conductingBody && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">CONDUCTING BODY</span>
                            <span className="text-xs font-bold text-slate-800 leading-snug">{selectedExamForModal.conductingBody}</span>
                          </div>
                        )}
                        {detailedFacts?.format && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">EXAM MODE & FORMAT</span>
                            <span className="text-xs font-bold text-slate-800 leading-snug">{detailedFacts.format}</span>
                          </div>
                        )}
                        {detailedFacts?.duration && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">TEST DURATION</span>
                            <span className="text-xs font-bold text-slate-800 leading-snug">{detailedFacts.duration}</span>
                          </div>
                        )}
                        {detailedFacts?.languages && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">TEST MEDIUM LANGUAGES</span>
                            <span className="text-xs font-bold text-slate-800 leading-snug truncate block" title={detailedFacts.languages}>{detailedFacts.languages}</span>
                          </div>
                        )}
                        {detailedFacts?.marking && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">GRADING & PENALTY SYSTEM</span>
                            <span className="text-xs font-bold text-slate-800 leading-snug">{detailedFacts.marking}</span>
                          </div>
                        )}
                        {selectedExamForModal.difficulty && (
                          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-0.5">DIFFICULTY RATING</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-slate-800">{selectedExamForModal.difficulty} / 5</span>
                              <span className="text-[9px] font-black text-amber-600 uppercase">
                                {selectedExamForModal.difficulty >= 4.5 ? 'Elite' : selectedExamForModal.difficulty >= 3.5 ? 'Hard' : 'Moderate'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mode, Question format and problem types breakdown */}
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/10 border border-slate-200 rounded-2xl space-y-4 text-left shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200/50 pb-2.5">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-indigo-500 animate-pulse" /> FORMAT & PROBLEM-SOLVING SPECIFICATION
                        </h4>
                        <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
                          Official Standard
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        <div className="bg-white p-3.5 border border-slate-150 rounded-xl hover:shadow-sm transition-all">
                          <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">Official Test Mode</span>
                          <span className="text-xs font-black text-slate-800 leading-snug block">
                            {detailedFacts?.mode || "Online / Offline"}
                          </span>
                        </div>
                        <div className="bg-white p-3.5 border border-slate-150 rounded-xl hover:shadow-sm transition-all">
                          <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">MCQ Question Count</span>
                          <span className="text-xs font-black text-slate-800 leading-snug block">
                            {detailedFacts?.mcqCount || "100 MCQs standard"}
                          </span>
                        </div>
                        <div className="bg-white p-3.5 border border-slate-150 rounded-xl hover:shadow-sm transition-all">
                          <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">Descriptive / Essay</span>
                          <span className="text-xs font-black text-slate-800 leading-snug block">
                            {detailedFacts?.essayWriting || "None"}
                          </span>
                        </div>
                        <div className="bg-white p-3.5 border border-slate-150 rounded-xl hover:shadow-sm transition-all">
                          <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">Total Exam Marks</span>
                          <span className="text-xs font-black text-slate-800 leading-snug block">
                            {detailedFacts?.totalMarks || "Varies"}
                          </span>
                        </div>
                      </div>

                      {detailedFacts?.problemTypes && (
                        <div className="bg-white p-4 border border-slate-150 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase mb-1.5">NATURE OF PROBLEM SOLVING & SKILLS TESTED</span>
                          <p className="text-xs font-bold text-slate-600 leading-relaxed">
                            {detailedFacts.problemTypes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Eligibility breakdown */}
                    <div className="p-5 bg-indigo-50/10 border border-indigo-100 rounded-2xl space-y-3">
                      <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-500" /> ACADEMIC ELIGIBILITY & LIMITS BLUEPRINT
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Academic Benchmark</span>
                          <span className="text-xs font-extrabold text-slate-800">{selectedExamForModal.eligibility || "Completed 12th / Undergraduation"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Attempt Boundaries</span>
                          <span className="text-xs font-extrabold text-slate-800">{detailedFacts?.attempts || "No limit under standard conditions"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block">Age Guidelines</span>
                          <span className="text-xs font-extrabold text-slate-800">{detailedFacts?.ageLimit || "Standard general group terms"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Syllabus Weightages */}
                    {detailedFacts?.weightages && (
                      <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-500" /> EXPERT SYLLABUS & WEIGHTAGE ANALYSIS
                          </h4>
                          <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100">
                            High Yield Topics
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          {detailedFacts.weightages.map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-black text-slate-800">
                                <span>{item.subject}</span>
                                <span className="text-slate-500">{item.pct}% Weight</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                              </div>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {item.topics.map((t, tIdx) => (
                                  <span key={tIdx} className="bg-slate-50 border border-slate-150/60 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {examExtraDetails?.examPattern && (
                      <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-2 text-left">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-purple-500" /> OFFICIAL EXAM PATTERN DETAIL
                        </h4>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                          {examExtraDetails.examPattern}
                        </p>
                      </div>
                    )}

                    {examExtraDetails?.recruiterOrInstitutes && examExtraDetails.recruiterOrInstitutes.length > 0 && (
                      <div className="p-5 bg-slate-50/50 border border-slate-150 rounded-3xl space-y-3 text-left">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Landmark className="w-4 h-4 text-indigo-500" /> {selectedExamForModal.level === 'GOVT' ? 'TOP RECRUITING MINISTRIES & DEPARTMENTS' : 'PREMIER TARGET INSTITUTES & SPONSORS'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {examExtraDetails.recruiterOrInstitutes.map((item, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: POST-EXAM ROADMAP (NEXT STEPS) */}
                {activeModalTab === 'pathway' && examExtraDetails && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Milestone className="w-4 h-4 text-blue-600" /> INTERACTIVE SELECTION PIPELINE TRACKER
                      </h4>
                      <span className="text-[9px] font-black bg-blue-50 text-blue-600 uppercase tracking-wider px-2 py-0.5 rounded border border-blue-100">
                        Check off completed milestones
                      </span>
                    </div>

                    <div className="bg-blue-50/25 p-4 rounded-2xl border border-blue-100/50 flex items-start gap-3 text-left">
                      <span className="text-xl">🗺️</span>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                        After the results are published, the selection process enters these official stages. Mark each checkbox as you complete them to visual-map your custom journey.
                      </p>
                    </div>

                    <div className="relative pl-8 space-y-6 text-left py-2">
                      {/* Vertical connecting track line */}
                      <div className="absolute left-3.5 top-2 bottom-6 w-0.5 bg-slate-200"></div>

                      {examExtraDetails.nextSteps.map((step, idx) => {
                        const parts = step.split(': ');
                        const title = parts[0];
                        const detail = parts[1] || '';
                        const stepKey = `step-${idx}`;
                        const isCompleted = !!completedSteps[stepKey];
                        return (
                          <div key={idx} className="relative group">
                            {/* Step circle node or interactive checkbox */}
                            <button
                              onClick={() => setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }))}
                              className={`absolute -left-8 top-0.5 w-7.5 h-7.5 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all z-10 shadow-sm ${
                                isCompleted
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50'
                              }`}
                            >
                              {isCompleted ? '✓' : idx + 1}
                            </button>
                            <div className={`space-y-1.5 p-4 border rounded-2xl transition-all ${
                              isCompleted 
                                ? 'bg-emerald-50/20 border-emerald-200/80' 
                                : 'bg-slate-50/70 hover:bg-slate-50 border-slate-150'
                            }`}>
                              <div className="flex items-center justify-between">
                                <h5 className={`text-sm font-black ${isCompleted ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>{title}</h5>
                                <button
                                  onClick={() => setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }))}
                                  className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase"
                                >
                                  {isCompleted ? 'Undo' : 'Mark Complete'}
                                </button>
                              </div>
                              {detail && (
                                <p className={`text-xs font-medium leading-relaxed ${isCompleted ? 'text-slate-500' : 'text-slate-600'}`}>{detail}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Crucial preparation milestones */}
                    <div className="p-5 bg-slate-50/60 border border-slate-200 rounded-2xl space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-indigo-500" /> SELECTION CYCLE TIMELINE SUMMARY
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        <div className="bg-white p-3 border border-slate-150 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">1. Application</span>
                          <span className="text-xs font-extrabold text-indigo-600">Month 1-2</span>
                        </div>
                        <div className="bg-white p-3 border border-slate-150 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">2. Admit Cards</span>
                          <span className="text-xs font-extrabold text-indigo-600">Month 4</span>
                        </div>
                        <div className="bg-white p-3 border border-slate-150 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">3. Actual Test</span>
                          <span className="text-xs font-extrabold text-indigo-600">Month 5-6</span>
                        </div>
                        <div className="bg-white p-3 border border-slate-150 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">4. Counseling</span>
                          <span className="text-xs font-extrabold text-indigo-600">Month 8-9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CAREER & PLACEMENTS (JOBS) */}
                {activeModalTab === 'career' && examExtraDetails && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-emerald-600" /> COMPENSATION, ALLOWANCES & DESIGNATIONS
                      </h4>
                      <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-100">
                        Placement Profile
                      </span>
                    </div>

                    {/* Salary Dashboard Card */}
                    <div className="bg-emerald-50/20 border border-emerald-150/80 rounded-[1.5rem] p-6 space-y-4 text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider block">EXPECTED STARTING SALARY PACKAGE</span>
                          <span className="text-xl md:text-2xl font-black text-slate-950 tracking-tight block">
                            {examExtraDetails.averageSalary || 'Competitive Standard CTC'}
                          </span>
                        </div>
                        <div className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                          💵 High Paying
                        </div>
                      </div>

                      {examExtraDetails.placementInfo && (
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-white border border-slate-100 p-3.5 rounded-xl flex items-start gap-2.5">
                          <span className="text-lg leading-none shrink-0">🎯</span>
                          <span>{examExtraDetails.placementInfo}</span>
                        </p>
                      )}
                    </div>

                    {/* Salary Growth Projection Track */}
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm text-left">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> STARTING VS SENIOR SALARY GROWTH TRAJECTORY
                      </h5>
                      <div className="relative pt-6 pb-2 overflow-x-auto">
                        <div className="min-w-[450px]">
                          {/* Horizontal connecting track line */}
                          <div className="absolute left-6 right-6 top-[2.2rem] h-1 bg-slate-100"></div>
                          
                          <div className="grid grid-cols-4 gap-2 relative">
                            <div className="text-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold mx-auto mb-2 relative z-10 border-4 border-white ring-1 ring-emerald-500">1</div>
                              <span className="text-[9px] font-extrabold text-slate-800 block leading-tight">Entry Level</span>
                              <span className="text-[10px] font-black text-emerald-600">₹60k - ₹80k</span>
                            </div>
                            <div className="text-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold mx-auto mb-2 relative z-10 border-4 border-white ring-1 ring-emerald-500">2</div>
                              <span className="text-[9px] font-extrabold text-slate-800 block leading-tight">Mid Career</span>
                              <span className="text-[10px] font-black text-emerald-600">₹90k - ₹1.3L</span>
                            </div>
                            <div className="text-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold mx-auto mb-2 relative z-10 border-4 border-white ring-1 ring-emerald-500">3</div>
                              <span className="text-[9px] font-extrabold text-slate-800 block leading-tight">Lead Specialist</span>
                              <span className="text-[10px] font-black text-emerald-600">₹1.4L - ₹1.8L</span>
                            </div>
                            <div className="text-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold mx-auto mb-2 relative z-10 border-4 border-white ring-1 ring-emerald-500">4</div>
                              <span className="text-[9px] font-extrabold text-slate-800 block leading-tight">Director / Exec</span>
                              <span className="text-[10px] font-black text-emerald-600">₹2.0L+ / mo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Allowances section */}
                    {examExtraDetails.allowances && examExtraDetails.allowances.length > 0 && (
                      <div className="space-y-2.5 text-left">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> EXCLUSIVE SERVICE BENEFITS & EXTRA PERKS
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {examExtraDetails.allowances.map((allowance, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 p-3 bg-amber-50/20 border border-amber-100/50 rounded-xl">
                              <BadgeCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <span className="text-xs font-bold text-slate-700 leading-snug">{allowance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Job Roles Section */}
                    <div className="space-y-3 text-left">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-blue-500" /> TARGET DESIGNATIONS POST-SELECTION
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {examExtraDetails.jobRoles.map((role, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedExamForModal(null);
                              if (typeof onNavigateToJobExplorer === 'function') {
                                onNavigateToJobExplorer(role);
                              }
                            }}
                            className="flex items-center justify-between p-3 bg-white border border-slate-150/70 hover:border-emerald-500 hover:bg-emerald-50/10 rounded-xl hover:shadow-xs transition-all cursor-pointer text-left w-full group/job"
                            title={`Explore salaries & careers for ${role}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 group-hover/job:scale-110 transition-transform" />
                              <span className="text-xs font-extrabold text-slate-800 group-hover/job:text-emerald-700 transition-colors leading-snug">{role}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/job:text-emerald-500 transition-colors group-hover/job:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: RESOURCES KIT */}
                {activeModalTab === 'resources' && (
                  <div className="space-y-8 animate-fade-in text-left">
                    
                    {/* Part A: Interactive Exam Study Planner */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-indigo-600" /> INTERACTIVE EXAM STUDY PLANNER
                        </h4>
                        <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
                          Counselor System
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-600">
                        Input your available parameters below to let our AI Counselor map out a custom step-by-step target preparation schedule.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Target Exam Year</label>
                          <select
                            value={plannerYear}
                            onChange={(e) => { setPlannerYear(e.target.value); setPlannerGenerated(false); }}
                            className="w-full text-xs font-extrabold bg-white border border-slate-200 rounded-xl p-2 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="2027">2027 Cycle</option>
                            <option value="2028">2028 Cycle</option>
                            <option value="2029">2029 Cycle</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Base Level</label>
                          <select
                            value={plannerLevel}
                            onChange={(e) => { setPlannerLevel(e.target.value); setPlannerGenerated(false); }}
                            className="w-full text-xs font-extrabold bg-white border border-slate-200 rounded-xl p-2 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Beginner">Beginner (Fundamentals needed)</option>
                            <option value="Intermediate">Intermediate (Concepts cleared)</option>
                            <option value="Advanced">Advanced (Revision & Test mode)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Study Hours / Day</label>
                          <select
                            value={plannerHours}
                            onChange={(e) => { setPlannerHours(e.target.value); setPlannerGenerated(false); }}
                            className="w-full text-xs font-extrabold bg-white border border-slate-200 rounded-xl p-2 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="2-4">2 - 4 Hours / day</option>
                            <option value="5-7">5 - 7 Hours / day</option>
                            <option value="8+">8+ Hours / day (Full-time)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => setPlannerGenerated(true)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4 fill-white" /> Generate Custom Milestone Roadmap
                      </button>

                      {plannerGenerated && (
                        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-4 animate-fade-in text-left">
                          <h5 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            TAILORED ROADMAP ({plannerYear} - {plannerLevel} Route)
                          </h5>
                          
                          <div className="space-y-3.5 border-l-2 border-indigo-100 pl-4 relative ml-2">
                            <div className="relative">
                              <span className="absolute -left-6 top-1 w-3.5 h-3.5 bg-indigo-500 rounded-full border-4 border-white ring-1 ring-indigo-500"></span>
                              <h6 className="text-xs font-extrabold text-slate-800">Month 1 - 3: Foundational Concepts Phase</h6>
                              <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-relaxed">
                                {plannerLevel === 'Beginner' 
                                  ? `Devote ${plannerHours} hours daily strictly to conceptual lectures and core standard text books. Aim to cover 100% of the syllabus definitions, equations and base theories. Do not skip basics.`
                                  : `Revise weak syllabus corners. Focus deeply on top-weighted categories like ${detailedFacts?.weightages?.[0]?.subject || 'Core Trades'}. Solve sectional practice questions.`}
                              </p>
                            </div>
                            
                            <div className="relative">
                              <span className="absolute -left-6 top-1 w-3.5 h-3.5 bg-indigo-500 rounded-full border-4 border-white ring-1 ring-indigo-500"></span>
                              <h6 className="text-xs font-extrabold text-slate-800">Month 4 - 6: Intensive Practice & PYQ Blitz</h6>
                              <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-relaxed">
                                Begin daily chapter quizzes. Solve previous 10 years of solved question papers. Target speed-solving tricks and negative-marking prevention strategies.
                              </p>
                            </div>

                            <div className="relative">
                              <span className="absolute -left-6 top-1 w-3.5 h-3.5 bg-indigo-500 rounded-full border-4 border-white ring-1 ring-indigo-500"></span>
                              <h6 className="text-xs font-extrabold text-slate-800">Month 7 - 9: Mock Tests Series & Speed Tuning</h6>
                              <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-relaxed">
                                Take 2 full-length simulated mock exams under strict exam-hall timing constraints every week. Analyze mistakes logs carefully. Target a standard 95th percentile accuracy.
                              </p>
                            </div>
                          </div>

                          <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-[11px] font-semibold text-emerald-800 leading-relaxed">
                            💡 <strong>Tip from the Counselor:</strong> Based on your {plannerHours} hours plan, we recommend splitting your study hours: 60% on technical/core practice and 40% on test-taking stamina and mock corrections.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Part B: Micro-Aptitude practice quiz */}
                    {quizQuestions && quizQuestions.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-purple-600" /> INSTANT APTITUDE MOCK TEST
                          </h4>
                          <span className="text-[9px] font-black bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wider">
                            Real Syllabus MCQ
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                          Test your knowledge instantly with these official syllabus level previous year questions!
                        </p>

                        <div className="space-y-5 text-left">
                          {quizQuestions.map((q, idx) => {
                            const isSelected = quizAnswers[q.id] !== undefined;
                            const chosenIdx = Number(quizAnswers[q.id]);
                            const isCorrect = chosenIdx === q.correctIndex;
                            return (
                              <div key={q.id} className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-3">
                                <h5 className="text-xs font-black text-slate-800 leading-relaxed">
                                  Q{idx + 1}. {q.question}
                                </h5>
                                
                                <div className="space-y-1.5">
                                  {q.options.map((option, optIdx) => {
                                    const optStr = String(optIdx);
                                    const isChosenOpt = quizAnswers[q.id] === optStr;
                                    let btnStyle = "border-slate-200 hover:bg-slate-50 text-slate-700 bg-white";
                                    
                                    if (quizSubmitted) {
                                      if (optIdx === q.correctIndex) {
                                        btnStyle = "border-emerald-300 bg-emerald-50 text-emerald-900";
                                      } else if (isChosenOpt) {
                                        btnStyle = "border-rose-300 bg-rose-50 text-rose-950";
                                      } else {
                                        btnStyle = "border-slate-200 bg-white text-slate-400";
                                      }
                                    } else if (isChosenOpt) {
                                      btnStyle = "border-blue-500 bg-blue-50/50 text-blue-900 font-bold";
                                    }

                                    return (
                                      <button
                                        key={optIdx}
                                        disabled={quizSubmitted}
                                        onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optStr }))}
                                        className={`w-full p-2.5 text-xs text-left rounded-xl border transition-all flex items-center gap-2 ${btnStyle}`}
                                      >
                                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                                          isChosenOpt ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-500 bg-slate-50'
                                        }`}>
                                          {String.fromCharCode(65 + optIdx)}
                                        </span>
                                        <span>{option}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {quizSubmitted && (
                                  <div className={`p-3.5 rounded-xl border text-[11px] leading-relaxed space-y-1 ${
                                    isCorrect ? 'bg-emerald-50/30 border-emerald-150 text-emerald-800' : 'bg-rose-50/30 border-rose-150 text-rose-800'
                                  }`}>
                                    <div className="font-extrabold flex items-center gap-1">
                                      {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Selected: Option ${String.fromCharCode(65 + chosenIdx)})`}
                                    </div>
                                    <p className="font-medium text-slate-600 mt-1">
                                      <strong>Explanation:</strong> {q.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {!quizSubmitted ? (
                          <button
                            disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                            onClick={() => setQuizSubmitted(true)}
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-black transition-all shadow-sm"
                          >
                            Submit Practice Quiz Answers
                          </button>
                        ) : (
                          <button
                            onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-black transition-all"
                          >
                            Reset & Try Again
                          </button>
                        )}
                      </div>
                    )}

                    {/* Part C: Web References */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600" /> RECOMMENDED PREPARATION KITS & VERIFIED LINKS
                      </h4>

                      <div className="space-y-2.5 text-left">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(selectedExamForModal.name + " official website")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-2xl group transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <h5 className="text-sm font-black text-slate-800 group-hover:text-blue-700 transition-colors">Official Website & Latest Notifications</h5>
                              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Direct search for recruitment schedules, syllabus updates, and eligibility portals</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </a>

                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(selectedExamForModal.name + " syllabus and exam pattern")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-2xl group transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <h5 className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors">Comprehensive Syllabus & Sectional Weights</h5>
                              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Find detailed topic lists, negative markings, questions distribution, and cutoffs</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                        </a>

                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(selectedExamForModal.name + " previous year question papers pdf")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-2xl group transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <h5 className="text-sm font-black text-slate-800 group-hover:text-purple-700 transition-colors">Previous Year Question Papers (PYQs)</h5>
                              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Download real mock papers, keys, solved solutions, and practice archives</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between rounded-b-[2rem]">
              <span className="text-[10px] font-bold text-slate-400">
                🚀 Powered by AI Counselor Engine
              </span>
              <button
                onClick={() => setSelectedExamForModal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-black transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Pathways details modal */}
      {selectedDegreeForModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {selectedDegreeForModal.duration} COURSE
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Code: {selectedDegreeForModal.name}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                  {selectedDegreeForModal.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDegreeForModal(null)}
                className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              {/* Domain information */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  DEGREE SYNOPSIS & ACADEMIC VALUE
                </h4>
                <p className="text-slate-600 text-sm md:text-base font-bold leading-relaxed">
                  This standard undergraduate program equips candidates with intensive foundational training under the {
                    CATEGORIES.find(c => matchesCategory(selectedDegreeForModal.category, c.id))?.name || selectedDegreeForModal.category
                  } division. Graduates gain complete corporate eligibility, practical laboratory and case studies analysis skill sets, and robust specialized credentials.
                </p>
              </div>

              {/* Specialization profiles inside the modal */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  ⭐ MATCHING SPECIALIZATION PROFILE PATHWAYS
                </h4>
                <div className="space-y-3">
                  {SPECS_DB.filter(s => matchesCategory(s.category, selectedDegreeForModal.category)).length === 0 ? (
                    <p className="text-xs text-slate-400 font-bold">No custom specialization tracks registered for this code yet.</p>
                  ) : (
                    SPECS_DB.filter(s => matchesCategory(s.category, selectedDegreeForModal.category)).map((spec, i) => (
                      <div
                        key={`modal-spec-${spec.id}`}
                        className="p-4 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl flex flex-col gap-2 hover:bg-slate-100/50 transition-all group/spec"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-slate-900 group-hover/spec:text-blue-600 transition-colors">
                            Track #{i + 1}: {spec.name}
                          </h5>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedDegreeForModal(null);
                                if (typeof onNavigateToSpec === 'function') {
                                  onNavigateToSpec(spec.id);
                                }
                              }}
                              className="text-[9px] bg-blue-50 text-blue-700 hover:bg-blue-100 font-extrabold px-2 py-0.5 rounded cursor-pointer transition-colors"
                            >
                              Details ➔
                            </button>
                            <span className="bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                              {spec.demand} DEMAND
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          {spec.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1 items-center">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Careers:</span>
                          {spec.roles.slice(0, 3).map((r: string, ri: number) => (
                            <button
                              key={ri}
                              onClick={() => {
                                setSelectedDegreeForModal(null);
                                if (typeof onNavigateToJobExplorer === 'function') {
                                  onNavigateToJobExplorer(r);
                                }
                              }}
                              className="text-[9px] font-bold text-slate-600 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1"
                              title={`Explore ${r} salaries & demand`}
                            >
                              <span>💼 {r}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
              <button
                onClick={() => {
                  toggleSavedPathway({
                    id: selectedDegreeForModal.id,
                    title: selectedDegreeForModal.name,
                    type: selectedDegreeForModal.duration,
                    institute: selectedDegreeForModal.fullName
                  });
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm flex items-center gap-1.5 border cursor-pointer ${
                  isPathwaySaved(selectedDegreeForModal.id)
                    ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isPathwaySaved(selectedDegreeForModal.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isPathwaySaved(selectedDegreeForModal.id) ? 'Saved' : 'Save Pathway'}</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDegreeForModal(null)}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                >
                  Close Window
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
