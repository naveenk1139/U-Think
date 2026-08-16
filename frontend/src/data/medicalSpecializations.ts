export interface MedicalSpecializationInfo {
  rank: number;
  name: string;
  weight: number; // Popularity / relevance index out of 100
  category: 'Medicine' | 'Surgery' | 'Diagnostics' | 'Allied & Niche';
  demand: 'Critical Demand' | 'High Demand' | 'Moderate Demand' | 'Niche / Emerging';
  description: string;
  subjects: string[];
  roles: string[];
}

export const MEDICAL_SPECIALIZATIONS_DATABASE: MedicalSpecializationInfo[] = [
  {
    rank: 1,
    name: "General Medicine",
    weight: 100,
    category: "Medicine",
    demand: "Critical Demand",
    description: "The foundational discipline diagnosing, treating, and managing a wide range of adult diseases through non-surgical primary care.",
    subjects: ["Internal Medicine", "Pathology Foundations", "Pharmacology", "Endocrinology basics"],
    roles: ["General Physician", "Internist", "Primary Care Provider", "Consultant Physician"]
  },
  {
    rank: 2,
    name: "General Surgery",
    weight: 95,
    category: "Surgery",
    demand: "Critical Demand",
    description: "Core surgical discipline encompassing operative procedures on the abdomen, skin, soft tissues, trauma, and emergency care.",
    subjects: ["Operative Techniques", "Anatomy & Traumatology", "Surgical Pathology", "Post-operative Care"],
    roles: ["General Surgeon", "Trauma Surgeon", "Consultant Surgeon"]
  },
  {
    rank: 3,
    name: "Pediatrics",
    weight: 92,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Dedicated to the comprehensive medical care of infants, children, and adolescents, including developmental milestones and immunizations.",
    subjects: ["Neonatology", "Pediatric Immunology", "Child Development", "Pediatric Infectious Diseases"],
    roles: ["Pediatrician", "Neonatologist", "Child Health Specialist"]
  },
  {
    rank: 4,
    name: "Obstetrics and Gynecology (OB/GYN)",
    weight: 90,
    category: "Surgery",
    demand: "Critical Demand",
    description: "Specialized in female reproductive health, pregnancy, childbirth, and postpartum care, involving both clinical and surgical skills.",
    subjects: ["Maternal-Fetal Medicine", "Reproductive Endocrinology", "Gynecologic Oncology", "Operative Obstetrics"],
    roles: ["Obstetrician", "Gynecologist", "Reproductive Consultant"]
  },
  {
    rank: 5,
    name: "Cardiology",
    weight: 88,
    category: "Medicine",
    demand: "High Demand",
    description: "Focuses on disorders of the heart and vascular system, encompassing diagnostic testing, chronic management, and intervention.",
    subjects: ["Echocardiography", "Electrophysiology", "Interventional Cardiology", "Cardiovascular Pharmacology"],
    roles: ["Cardiologist", "Interventional Cardiologist", "Cardiac Consultant"]
  },
  {
    rank: 6,
    name: "Orthopedics",
    weight: 85,
    category: "Surgery",
    demand: "High Demand",
    description: "Surgical and medical management of the musculoskeletal system, addressing fractures, joint replacements, and sports injuries.",
    subjects: ["Osteology", "Trauma & Fracture Fixation", "Rheumatology Basics", "Biomechanics"],
    roles: ["Orthopedic Surgeon", "Sports Medicine Specialist", "Joint Replacement Surgeon"]
  },
  {
    rank: 7,
    name: "Neurology",
    weight: 82,
    category: "Medicine",
    demand: "High Demand",
    description: "Diagnosis and management of disorders affecting the brain, spinal cord, and peripheral nervous system.",
    subjects: ["Neuroanatomy", "Electroencephalography (EEG)", "Stroke Management", "Movement Disorders"],
    roles: ["Neurologist", "Clinical Neurophysiologist", "Stroke Specialist"]
  },
  {
    rank: 8,
    name: "Dermatology",
    weight: 80,
    category: "Medicine",
    demand: "High Demand",
    description: "Specializes in conditions of the skin, hair, and nails, combining medical treatments with cosmetic and aesthetic procedures.",
    subjects: ["Clinical Dermatology", "Dermatopathology", "Cosmetology", "Immunodermatology"],
    roles: ["Dermatologist", "Cosmetologist", "Dermatosurgeon"]
  },
  {
    rank: 9,
    name: "Psychiatry",
    weight: 78,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Focuses on mental health, behavioral conditions, emotional disorders, and their neurochemical treatments and therapies.",
    subjects: ["Psychopharmacology", "Clinical Psychology", "Neuropsychiatry", "Counseling Therapies"],
    roles: ["Psychiatrist", "Mental Health Consultant", "Neuropsychiatrist"]
  },
  {
    rank: 10,
    name: "Radiology",
    weight: 75,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Crucial diagnostic field utilizing medical imaging techniques like X-rays, MRI, CT scans, and ultrasounds.",
    subjects: ["Radiation Physics", "Diagnostic Imaging", "Interventional Radiology", "Radiobiology"],
    roles: ["Radiologist", "Diagnostic Imaging Consultant", "Interventional Radiologist"]
  },
  {
    rank: 11,
    name: "Anesthesiology",
    weight: 74,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Vital for pain management and intraoperative patient stability, allowing safe surgical procedures and intensive care support.",
    subjects: ["Regional Anesthesia", "Critical Care Medicine", "Pain Management", "Pharmacokinetics of Sedatives"],
    roles: ["Anesthesiologist", "Intensivist", "Pain Management Specialist"]
  },
  {
    rank: 12,
    name: "Oncology",
    weight: 70,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Comprehensive study, diagnosis, and treatment therapies for various forms of cancer and tumors.",
    subjects: ["Tumor Immunology", "Chemo & Radiation Protocols", "Surgical Oncology", "Palliative Care"],
    roles: ["Medical Oncologist", "Radiation Oncologist", "Tumor Specialist"]
  },
  {
    rank: 13,
    name: "Ophthalmology",
    weight: 68,
    category: "Surgery",
    demand: "High Demand",
    description: "Surgical and medical care focused on eye disorders, visual pathways, and related cranial structures.",
    subjects: ["Ocular Anatomy", "Refractive Surgery", "Retina & Glaucoma Management", "Neuro-ophthalmology"],
    roles: ["Ophthalmologist", "Eye Surgeon", "Vision Consultant"]
  },
  {
    rank: 14,
    name: "ENT / Otorhinolaryngology",
    weight: 65,
    category: "Surgery",
    demand: "Moderate Demand",
    description: "Surgical management and treatment of diseases affecting the ear, nose, throat, head, and neck architectures.",
    subjects: ["Audiology basics", "Rhinology", "Head and Neck Surgery", "Laryngology"],
    roles: ["ENT Specialist", "Head and Neck Surgeon", "Otologist"]
  },
  {
    rank: 15,
    name: "Pathology",
    weight: 62,
    category: "Diagnostics",
    demand: "Moderate Demand",
    description: "The core diagnostic science analyzing tissue samples, blood, and cellular structures to determine disease origins.",
    subjects: ["Histopathology", "Cytopathology", "Hematology", "Clinical Microscopy"],
    roles: ["Pathologist", "Clinical Diagnostician", "Forensic Pathologist"]
  },
  {
    rank: 16,
    name: "Gastroenterology",
    weight: 80,
    category: "Medicine",
    demand: "High Demand",
    description: "Focuses on the digestive system and its disorders, diseases affecting the gastrointestinal tract.",
    subjects: ["Endoscopy", "Hepatology", "Pancreatology", "Colorectal Pathology"],
    roles: ["Gastroenterologist", "Hepatologist", "Endoscopy Specialist"]
  },
  {
    rank: 17,
    name: "Urology",
    weight: 78,
    category: "Surgery",
    demand: "High Demand",
    description: "Deals with diseases of the male and female urinary-tract system and the male reproductive organs.",
    subjects: ["Endourology", "Urologic Oncology", "Urogynecology", "Andrology"],
    roles: ["Urologist", "Andrologist", "Urologic Surgeon"]
  },
  {
    rank: 18,
    name: "Endocrinology",
    weight: 76,
    category: "Medicine",
    demand: "High Demand",
    description: "Concerned with the endocrine system, its diseases, and its specific secretions known as hormones.",
    subjects: ["Diabetology", "Thyroid Disorders", "Pediatric Endocrinology", "Reproductive Endocrinology"],
    roles: ["Endocrinologist", "Diabetologist", "Hormone Specialist"]
  },
  {
    rank: 19,
    name: "Nephrology",
    weight: 74,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Specialty of internal medicine that focuses on the treatment of diseases that affect the kidneys.",
    subjects: ["Dialysis Methods", "Kidney Transplantation", "Glomerular Diseases", "Renal Physiology"],
    roles: ["Nephrologist", "Dialysis Specialist", "Renal Transplant Physician"]
  },
  {
    rank: 20,
    name: "Pulmonology",
    weight: 82,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Medical specialty that deals with diseases involving the respiratory tract.",
    subjects: ["Respiratory Failure", "Asthma & COPD", "Sleep Diagnostics", "Interventional Pulmonology"],
    roles: ["Pulmonologist", "Respiratory Physician", "Sleep Medicine Specialist"]
  },
  {
    rank: 21,
    name: "Rheumatology",
    weight: 70,
    category: "Medicine",
    demand: "Moderate Demand",
    description: "Diagnosis and therapy of rheumatic diseases, involving clinical problems in joints, soft tissues, autoimmune diseases.",
    subjects: ["Clinical Immunology", "Musculoskeletal Radiology", "Autoimmune Diseases", "Joint Aspiration"],
    roles: ["Rheumatologist", "Immunologist", "Autoimmune Specialist"]
  },
  {
    rank: 22,
    name: "Emergency Medicine",
    weight: 85,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Medical specialty involving care for undifferentiated, unscheduled patients with illnesses or injuries requiring immediate medical attention.",
    subjects: ["Trauma Resuscitation", "Toxicology", "Pediatric Emergency", "Disaster Medicine"],
    roles: ["Emergency Physician", "Traumatologist", "ER Consultant"]
  },
  {
    rank: 23,
    name: "Plastic Surgery",
    weight: 75,
    category: "Surgery",
    demand: "High Demand",
    description: "Surgical specialty involving the restoration, reconstruction, or alteration of the human body.",
    subjects: ["Reconstructive Surgery", "Aesthetic Surgery", "Craniofacial Surgery", "Microsurgery"],
    roles: ["Plastic Surgeon", "Cosmetic Surgeon", "Reconstructive Specialist"]
  },
  {
    rank: 24,
    name: "Neurosurgery",
    weight: 72,
    category: "Surgery",
    demand: "High Demand",
    description: "The medical specialty concerned with the prevention, diagnosis, surgical treatment, and rehabilitation of disorders which affect any portion of the nervous system.",
    subjects: ["Neuroanatomy", "Spinal Surgery", "Neuro-oncology", "Cerebrovascular Surgery"],
    roles: ["Neurosurgeon", "Spine Surgeon", "Brain Surgeon"]
  },
  {
    rank: 25,
    name: "Cardiothoracic Surgery",
    weight: 70,
    category: "Surgery",
    demand: "Moderate Demand",
    description: "Surgical treatment of organs inside the thorax (the chest) - generally treatment of conditions of the heart and lungs.",
    subjects: ["Cardiac Surgery", "Thoracic Surgery", "Heart Transplantation", "Congenital Heart Defects"],
    roles: ["Cardiac Surgeon", "Cardiothoracic Surgeon", "Thoracic Surgeon"]
  },
  {
    rank: 26,
    name: "Infectious Diseases",
    weight: 84,
    category: "Medicine",
    demand: "Critical Demand",
    description: "Deals with the diagnosis and treatment of complex infections, virology, and pandemic management.",
    subjects: ["Virology", "Immunology", "Tropical Medicine", "Epidemiology"],
    roles: ["Infectious Disease Specialist", "Epidemiologist", "Clinical Virologist"]
  },
  {
    rank: 27,
    name: "Hematology",
    weight: 73,
    category: "Medicine",
    demand: "High Demand",
    description: "Focuses on the study of blood, the blood-forming organs, and blood diseases.",
    subjects: ["Coagulation Disorders", "Leukemia", "Lymphoma", "Blood Transfusion"],
    roles: ["Hematologist", "Hematopathologist", "Transfusion Medicine Specialist"]
  },
  {
    rank: 28,
    name: "Medical Genetics",
    weight: 65,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Involves the diagnosis and management of hereditary disorders and genetic diseases.",
    subjects: ["Cytogenetics", "Molecular Genetics", "Genetic Counseling", "Pharmacogenomics"],
    roles: ["Clinical Geneticist", "Genetic Counselor", "Research Scientist"]
  },
  {
    rank: 29,
    name: "Nuclear Medicine",
    weight: 68,
    category: "Diagnostics",
    demand: "Moderate Demand",
    description: "Uses small amounts of radioactive materials to diagnose and determine the severity of or treat a variety of diseases.",
    subjects: ["Radioisotopes", "PET-CT Imaging", "Radionuclide Therapy", "Radiation Physics"],
    roles: ["Nuclear Medicine Physician", "Molecular Imaging Specialist", "Radiopharmacist"]
  },
  {
    rank: 30,
    name: "Sports Medicine",
    weight: 72,
    category: "Medicine",
    demand: "High Demand",
    description: "Focuses on physical fitness and the treatment and prevention of injuries related to sports and exercise.",
    subjects: ["Biomechanics", "Exercise Physiology", "Kinesiology", "Joint Rehabilitation"],
    roles: ["Sports Medicine Physician", "Team Doctor", "Rehabilitation Specialist"]
  },
  {
    rank: 31,
    name: "Preventive & Social Medicine (PSM)",
    weight: 78,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Deals with population health, preventive healthcare, epidemiology, and public health administration.",
    subjects: ["Community Health", "Epidemiology", "Biostatistics", "Health Policy"],
    roles: ["Public Health Specialist", "Epidemiologist", "Preventive Medicine Physician"]
  },
  {
    rank: 32,
    name: "Pediatric Surgery",
    weight: 70,
    category: "Surgery",
    demand: "High Demand",
    description: "Subspecialty of surgery involving the surgery of fetuses, infants, children, adolescents, and young adults.",
    subjects: ["Neonatal Surgery", "Pediatric Trauma", "Fetal Surgery", "Congenital Anomalies"],
    roles: ["Pediatric Surgeon", "Fetal Surgeon"]
  },
  {
    rank: 33,
    name: "Forensic Medicine",
    weight: 60,
    category: "Allied & Niche",
    demand: "Moderate Demand",
    description: "Application of medical knowledge to investigate causes of death, injury, and disease in legal contexts.",
    subjects: ["Medicolegal Autopsy", "Forensic Toxicology", "Clinical Forensic Medicine", "Medical Jurisprudence"],
    roles: ["Forensic Medical Examiner", "Forensic Pathologist", "Police Surgeon"]
  },
  {
    rank: 34,
    name: "Transfusion Medicine",
    weight: 62,
    category: "Allied & Niche",
    demand: "Moderate Demand",
    description: "Branch of medicine that encompasses all aspects of the transfusion of blood and blood components.",
    subjects: ["Blood Banking", "Apheresis", "Immunohematology", "Coagulation"],
    roles: ["Transfusion Medicine Specialist", "Blood Bank Medical Officer"]
  },
  {
    rank: 35,
    name: "Geriatrics",
    weight: 75,
    category: "Medicine",
    demand: "High Demand",
    description: "Specialty that focuses on health care of elderly people, promoting health by preventing and treating diseases.",
    subjects: ["Aging Physiology", "Dementia Care", "Palliative Care", "Geriatric Pharmacology"],
    roles: ["Geriatrician", "Elderly Care Specialist", "Gerontologist"]
  },
  {
    rank: 36,
    name: "Physical Medicine and Rehabilitation",
    weight: 71,
    category: "Medicine",
    demand: "High Demand",
    description: "Aims to enhance and restore functional ability and quality of life to those with physical impairments or disabilities.",
    subjects: ["Neurorehabilitation", "Prosthetics & Orthotics", "Pain Management", "Spinal Cord Injury"],
    roles: ["Physiatrist", "Rehabilitation Physician", "Pain Medicine Specialist"]
  },
  {
    rank: 37,
    name: "Cardiothoracic/CTVS Nursing",
    weight: 70,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Specialized care for patients undergoing cardiothoracic and vascular surgeries.",
    subjects: ["Cardiology basics", "Thoracic Nursing", "Post-operative Care"],
    roles: ["Cardiac Nurse", "CTVS Specialist Nurse"]
  },
  {
    rank: 38,
    name: "Community Medicine Nursing",
    weight: 75,
    category: "Allied & Niche",
    demand: "Moderate Demand",
    description: "Focus on community health, public awareness, and disease prevention.",
    subjects: ["Public Health Nursing", "Epidemiology basics", "Community Education"],
    roles: ["Community Health Nurse", "Public Health Officer"]
  },
  {
    rank: 39,
    name: "Critical Care Nursing",
    weight: 85,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Intensive care for critically ill patients.",
    subjects: ["ICU Equipment", "Critical Care Protocols", "Life Support"],
    roles: ["ICU Nurse", "Critical Care Specialist"]
  },
  {
    rank: 40,
    name: "Emergency Medical Services Nursing",
    weight: 88,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Immediate nursing care in emergency situations.",
    subjects: ["Trauma Care", "Basic Life Support", "Emergency Triage"],
    roles: ["Emergency Nurse", "Trauma Nurse"]
  },
  {
    rank: 41,
    name: "Medical Surgical Nursing",
    weight: 80,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Holistic care for adult patients with various medical and surgical conditions.",
    subjects: ["General Medicine Nursing", "Post-operative Nursing", "Clinical Skills"],
    roles: ["Surgical Nurse", "Medical Nurse"]
  },
  {
    rank: 42,
    name: "Neonatal, Infant & Newborn Nursing",
    weight: 82,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Specialized care for newborns, especially those who are preterm or ill.",
    subjects: ["Neonatology Nursing", "Newborn Assessment", "NICU Protocols"],
    roles: ["Neonatal Nurse", "NICU Nurse"]
  },
  {
    rank: 43,
    name: "Nephrological Nursing",
    weight: 70,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Care for patients with kidney disorders.",
    subjects: ["Renal Anatomy", "Dialysis Procedures", "Kidney Care"],
    roles: ["Nephrology Nurse", "Dialysis Nurse"]
  },
  {
    rank: 44,
    name: "Neuro Science & Mental Health Nursing",
    weight: 78,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Care for neurological and psychological conditions.",
    subjects: ["Neuro Nursing", "Psychiatric Nursing", "Mental Health Assessment"],
    roles: ["Neuro Nurse", "Psychiatric Nurse"]
  },
  {
    rank: 45,
    name: "Nursing Administration",
    weight: 72,
    category: "Allied & Niche",
    demand: "Moderate Demand",
    description: "Management and leadership within the nursing field.",
    subjects: ["Nursing Leadership", "Healthcare Administration", "Policy & Ethics"],
    roles: ["Nursing Manager", "Hospital Administrator"]
  },
  {
    rank: 46,
    name: "MBBS (Bachelor of Medicine & Bachelor of Surgery)",
    weight: 100,
    category: "Medicine",
    demand: "Critical Demand",
    description: "The premier licensed under-graduate medical degree in India, training candidates in core diagnostics, medicine, pediatrics, pharmacology, and general surgery over 5.5 years (including internship).",
    subjects: ["Human Anatomy", "Clinical Biochemistry", "Systemic Pathology", "General Surgery & OB/GYN"],
    roles: ["Medical Officer", "General Physician / Practitioner", "Clinical Investigator", "Medical Consultant"]
  },
  {
    rank: 47,
    name: "BDS (Bachelor of Dental Surgery)",
    weight: 90,
    category: "Surgery",
    demand: "High Demand",
    description: "The professional degree for dental sciences, dealing with the preventions, diagnoses, and surgical/medical solutions of oral cavity and maxillofacial disorders.",
    subjects: ["Oral Anatomy", "Dental Materials", "Prosthodontics", "Oral & Maxillofacial Surgery"],
    roles: ["Dentist", "Dental Surgeon", "Cosmetic Dentistry Specialist", "Public Health Dentist"]
  },
  {
    rank: 48,
    name: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    weight: 85,
    category: "Medicine",
    demand: "High Demand",
    description: "An integrated undergraduate program blending traditional Vedic Ayurvedic wisdom with modern medicine, anatomy, pharmacology, and surgery principles.",
    subjects: ["Kriya Sharir (Physiology)", "Rachana Sharir (Anatomy)", "Dravyaguna Vijnana (Pharmacology)", "Shalya Tantra (General Surgery)"],
    roles: ["Ayurvedic Physician", "Panchakarma Specialist", "Research Officer", "Wellness Consultant"]
  },
  {
    rank: 49,
    name: "BHMS (Bachelor of Homeopathic Medicine & Surgery)",
    weight: 82,
    category: "Medicine",
    demand: "High Demand",
    description: "Specialized undergraduate study in the holistic system of Homeopathic medicine, emphasizing individualized natural healing systems and therapeutics.",
    subjects: ["Homeopathic Materia Medica", "Organon of Medicine", "Repertory", "Practice of Medicine & Pathology"],
    roles: ["Homeopathic Consultant", "Private Practitioner", "Homeopathic Pharmacist", "Medical Officer"]
  },
  {
    rank: 50,
    name: "BUMS (Bachelor of Unani Medicine & Surgery)",
    weight: 78,
    category: "Medicine",
    demand: "Moderate Demand",
    description: "Undergraduate course teaching the ancient Greek-Arabic health philosophy, focusing on the balance of four humors (blood, phlegm, yellow bile, black bile) along with modern updates.",
    subjects: ["Kulliyat (Principles of Medicine)", "Tashreeh-ul-Aza (Anatomy)", "Munafe-ul-Aza (Physiology)", "Ilmul Advia (Pharmacology)"],
    roles: ["Unani Physician", "Hakim", "Medical Officer", "Unani Researcher"]
  },
  {
    rank: 51,
    name: "BSMS (Bachelor of Siddha Medicine & Surgery)",
    weight: 76,
    category: "Medicine",
    demand: "Moderate Demand",
    description: "Traditional system of healing native to Southern India, incorporating advanced herbology, mineral extracts, pulse diagnostics, and holistic physiology.",
    subjects: ["Siddha Maruthuva Fundamentals", "Gunapadam (Herbology)", "Noi Naadal (Pathology)", "Varmam & Thokkanam"],
    roles: ["Siddha Practitioner", "Medical Officer", "Wellness Advisor", "Siddha Pharmacist"]
  },
  {
    rank: 52,
    name: "BNYS (Bachelor of Naturopathy & Yogic Sciences)",
    weight: 80,
    category: "Medicine",
    demand: "High Demand",
    description: "Drugless system of medical practice, integrating deep natural health sciences, nutrition therapies, hydrotherapy, physiological yoga, and acupuncture.",
    subjects: ["Philosophy of Nature Cure", "Yoga Therapy & Kriyas", "Dietetics & Nutrition", "Acupuncture & Physiotherapy"],
    roles: ["Naturopathy Physician", "Yoga Therapist", "Wellness Center Director", "Nutrition Consultant"]
  },
  {
    rank: 53,
    name: "BVSc & AH (Bachelor of Veterinary Science & Animal Husbandry)",
    weight: 84,
    category: "Medicine",
    demand: "High Demand",
    description: "The premier veterinary science program in India, training specialists in animal anatomy, surgeries, epidemiology, livestock wellness, and animal husbandry.",
    subjects: ["Veterinary Anatomy", "Veterinary Pharmacology", "Livestock Production Management", "Veterinary Surgery & Radiology"],
    roles: ["Veterinary Surgeon", "Livestock Officer", "Veterinary Public Health Officer", "Animal Breeder"]
  },
  {
    rank: 54,
    name: "BPT (Bachelor of Physiotherapy)",
    weight: 88,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Essential rehabilitation program training specialists in physical exercises, electrotherapy, manual manipulation, and functional movement restoration.",
    subjects: ["Exercise Therapy", "Electrotherapy", "Biomechanics & Kinesiology", "Orthopedic & Neuro Physiotherapy"],
    roles: ["Physiotherapist", "Sports Rehabilitation Therapist", "Cardiopulmonary Therapist", "Clinical Physiotherapist"]
  },
  {
    rank: 55,
    name: "BOT (Bachelor of Occupational Therapy)",
    weight: 80,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Rehabilitative specialty aimed at enabling patients with physical, cognitive, or sensory impairments to achieve absolute independence in daily life tasks.",
    subjects: ["Occupational Therapy in Pediatrics", "OT in Psychiatry", "Biomechanics & Ergonomics", "Kinesiology basics"],
    roles: ["Occupational Therapist", "Rehabilitation Specialist", "Ergonomics Consultant", "Pediatric OT Specialist"]
  },
  {
    rank: 56,
    name: "B.Sc Nursing (Bachelor of Science in Nursing)",
    weight: 95,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Standard 4-year professional medical nursing course focused on comprehensive patient care, nursing ethics, critical trauma/ICU operations, and ward management.",
    subjects: ["Medical-Surgical Nursing", "Community Health Nursing", "Obstetric & Gynecological Nursing", "Pediatric Nursing"],
    roles: ["Registered Nurse", "Nursing Officer", "Critical Care Nurse", "Community Health Nurse"]
  },
  {
    rank: 57,
    name: "B.Pharm (Bachelor of Pharmacy)",
    weight: 91,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "The foundational degree program in pharmaceutical sciences, studying drug formulation, pharmacology kinetics, medicinal chemistry, and quality standards.",
    subjects: ["Pharmaceutics & Formulation", "Medicinal Chemistry", "Pharmacology & Toxicology", "Pharmacognosy"],
    roles: ["Pharmacist", "Clinical Research Associate", "Manufacturing Chemist", "Drug Inspector"]
  },
  {
    rank: 58,
    name: "Pharm.D (Doctor of Pharmacy)",
    weight: 87,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "A comprehensive 6-year doctoral professional program centered on clinical pharmacy, hospital therapeutics, patient counseling, and direct drug monitoring.",
    subjects: ["Clinical Pharmacy & Pharamcotherapeutics", "Pharmacokinetics", "Hospital & Community Pharmacy", "Biostatistics"],
    roles: ["Clinical Pharmacist", "Medical Writer", "Pharmacovigilance Officer", "Principal Pharmacologist"]
  },
  {
    rank: 59,
    name: "BASLP (Bachelor of Audiology & Speech-Language Pathology)",
    weight: 79,
    category: "Allied & Niche",
    demand: "Niche / Emerging",
    description: "Specialized clinical program addressing hearing diagnostics, balance systems, vestibular rehabilitation, speech fluency, and communication disorders.",
    subjects: ["Speech Pathology", "Audiological Diagnostics", "Language Disorders in Children", "Hearing Aids & Cochlear Implants"],
    roles: ["Audiologist", "Speech-Language Pathologist", "Rehabilitation Officer", "Hearing Aid Specialist"]
  },
  {
    rank: 60,
    name: "B.Optom (Bachelor of Optometry)",
    weight: 84,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Undergraduate degree focusing on diagnostic refraction, vision screening, ocular pathologies, contact lens fitting, and binocular vision therapies.",
    subjects: ["Geometrical Optics", "Ocular Disease & Pathology", "Binocular Vision", "Contact Lenses"],
    roles: ["Optometrist", "Refraction Specialist", "Vision Consultant", "Contact Lens Practitioner"]
  },
  {
    rank: 61,
    name: "BPO (Bachelor of Prosthetics & Orthotics)",
    weight: 75,
    category: "Allied & Niche",
    demand: "Niche / Emerging",
    description: "Rehabilitation field combining engineering principles with clinical medicine to design, fabricate, and fit artificial limbs and supportive orthopedic braces.",
    subjects: ["Prosthetic Science", "Orthotic Science", "Applied Mechanics & Biomechanics", "Materials for P&O"],
    roles: ["Prosthetist & Orthotist", "Rehabilitation Engineer", "P&O Consultant"]
  },
  {
    rank: 62,
    name: "BMLT (Bachelor of Medical Laboratory Technology)",
    weight: 86,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Prepares professionals to perform complex clinical laboratory tests, hematology analyses, biochemical assays, molecular profiling, and cell examinations.",
    subjects: ["Clinical Biochemistry", "Clinical Hematology", "Medical Microbiology", "Histopathology Techniques"],
    roles: ["Medical Laboratory Technologist", "Clinical Lab Manager", "Pathology Lab Analyst"]
  },
  {
    rank: 63,
    name: "B.Sc Radiology (Radiology & Imaging Technology)",
    weight: 88,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Trains experts in setting up and operating advanced medical imaging devices including X-ray machines, computed tomography (CT) scanners, and MRIs.",
    subjects: ["Radiological Physics", "CT & MRI Imaging", "Ultrasound Techniques", "Radiation Safety & Protection"],
    roles: ["Radiology Technologist", "Imaging Specialist", "CT/MRI Operator", "X-Ray Technician"]
  },
  {
    rank: 64,
    name: "B.Sc OT Tech (Operation Theatre Technology)",
    weight: 82,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Prepares specialists to manage the clinical workspace of the operation theatre, assisting surgeons, maintaining sterility, and setting up surgical gear.",
    subjects: ["Surgical Sterile Protocols", "Anesthesia Equipment Basics", "OT Instruments & Equipment", "Surgical Anatomy"],
    roles: ["OT Technician", "Surgical Assistant", "Anesthesia Assistant", "CSSD Manager"]
  },
  {
    rank: 65,
    name: "B.Sc Perfusion (Cardiovascular Perfusion Technology)",
    weight: 81,
    category: "Allied & Niche",
    demand: "Niche / Emerging",
    description: "Highly critical specialization focusing on setting up and running heart-lung bypass machines (extracorporeal circulation) during complex open-heart surgeries.",
    subjects: ["Cardiopulmonary Bypass Science", "Perfusion Equipment & Physiology", "Myocardial Protection", "Hematology of Perfusion"],
    roles: ["Cardiovascular Perfusionist", "Clinical Perfusionist", "ECLS/ECMO Coordinator"]
  },
  {
    rank: 66,
    name: "B.Sc Dialysis (Renal Dialysis Technology)",
    weight: 83,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Trains professionals to monitor, adjust, and operate hemodialysis and peritoneal dialysis setups for patients suffering from kidney failure.",
    subjects: ["Renal Anatomy & Physiology", "Dialysis Technology & Equipment", "Dialysate Composition Science", "Patient Care in Nephrology"],
    roles: ["Dialysis Therapist", "Renal Dialysis Technician", "Urology Clinic Analyst"]
  },
  {
    rank: 67,
    name: "B.Sc Cardiac (Cardiac Care Technology)",
    weight: 85,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Allied health course focusing on assisting physicians in diagnosing cardiorespiratory conditions, operating ECGs, Echocardiograms, and Cath Labs.",
    subjects: ["Electrocardiography (ECG)", "Echocardiography Principles", "Cardiac Catheterization basics", "Holter Studies"],
    roles: ["Cardiac Care Technologist", "Cath Lab Technician", "Echocardiographer", "ECG Investigator"]
  },
  {
    rank: 68,
    name: "B.Sc Anaesthesia (Anaesthesia Technology)",
    weight: 84,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Trains Allied health practitioners to assist anesthesiologists in setting up gas delivery systems, preparing drugs, monitoring vital parameters during surgery.",
    subjects: ["Anesthetic Agents & Pharmacology", "Vitals Monitoring & Equipment", "Airway Management basics", "Resuscitation Techniques"],
    roles: ["Anaesthesia Technologist", "Anaesthesia Assistant", "PACU Care Associate"]
  },
  {
    rank: 69,
    name: "B.Sc Neuroscience (Neuroscience Technology)",
    weight: 78,
    category: "Diagnostics",
    demand: "Niche / Emerging",
    description: "Focuses on the study and diagnostic evaluation of the brain and nervous systems, covering electroencephalography (EEG), electromyography (EMG), and sleep testing.",
    subjects: ["Neurophysiology Diagnostics", "EEG Techniques & Recording", "Nerve Conduction Studies", "Polysomnography basics"],
    roles: ["Neuro-Electro-Physiologist", "EEG Technician", "EMG Operator", "Sleep Lab Analyst"]
  },
  {
    rank: 70,
    name: "B.Sc Respiratory (Respiratory Therapy)",
    weight: 83,
    category: "Allied & Niche",
    demand: "High Demand",
    description: "Trains individuals in the cardiorespiratory therapy field, operating mechanical ventilators, managing oxygen therapy chambers, and diagnostic lung spirometry.",
    subjects: ["Cardiopulmonary Pathologies", "Mechanical Ventilation Science", "Airway Clearance Therapies", "Pulmonary Function Tests"],
    roles: ["Respiratory Therapist", "Clinical Vent Manager", "Pulmonary Lab Specialist"]
  },
  {
    rank: 71,
    name: "B.Sc Nuclear Med (Nuclear Medicine Technology)",
    weight: 76,
    category: "Diagnostics",
    demand: "Niche / Emerging",
    description: "Trains experts to prep and administer tiny quantities of diagnostic radiopharmaceuticals, running highly complex SPECT and PET-CT scan machines.",
    subjects: ["Nuclear Medicine Instrumentation", "Radiopharmacy Practices", "SPECT/PET Scanning Protocol", "Radiation Waste Safety"],
    roles: ["Nuclear Medicine Technologist", "Radiation Safety Officer", "PET-CT Scan Operator"]
  },
  {
    rank: 72,
    name: "B.Sc Radiotherapy (Radiotherapy Technology)",
    weight: 80,
    category: "Diagnostics",
    demand: "High Demand",
    description: "Essential oncology technical role centered on planning, checking, and delivering precise high-energy therapeutic radiation beams to target cancer cells.",
    subjects: ["Radiation Oncology Physics", "Radiotherapy Planning Core", "Linear Accelerator Operations", "Immobilization & Brachytherapy"],
    roles: ["Radiation Therapist", "Dosimetrist", "Oncology Therapy Coordinator"]
  },
  {
    rank: 73,
    name: "B.Sc Emergency (Emergency Medical Technology)",
    weight: 87,
    category: "Allied & Niche",
    demand: "Critical Demand",
    description: "Prepares field specialists to deliver fast trauma-life support, emergency diagnostics, triage administration, and rapid medical transport procedures.",
    subjects: ["Trauma Resuscitation Techniques", "Advanced Cardiac Life Support", "Emergency Triage Management", "Ambulance Operations"],
    roles: ["Emergency Medical Technologist", "Ambulance Incident Lead", "Trauma Care Operator"]
  }
];
