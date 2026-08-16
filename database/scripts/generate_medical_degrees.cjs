const fs = require('fs');
const filePath = './src/data/userSpecializations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const missingMD = [
  "Pathology", "Microbiology", "Biochemistry", "Physiology", "Anatomy",
  "Pharmacology", "Forensic Medicine & Toxicology", "Community Medicine (Preventive & Social Medicine)",
  "Respiratory Medicine (Pulmonology)", "Obstetrics & Gynaecology", "Physical Medicine & Rehabilitation",
  "Nuclear Medicine", "Emergency Medicine", "Geriatrics", "Palliative Medicine", "Sports Medicine",
  "Radiation Oncology", "Hospital Administration", "Immuno-Haematology & Blood Transfusion",
  "Transfusion Medicine", "Reproductive Medicine", "Clinical Pharmacology", "Medical Genetics",
  "Occupational Medicine", "Aviation Medicine", "Tropical Medicine"
];

const missingMS = [
  "Anatomy", "Traumatology & Surgery"
];

const missingMDS = [
  "Oral & Maxillofacial Surgery", "Orthodontics & Dentofacial Orthopaedics",
  "Prosthodontics & Crown/Bridge", "Periodontics", "Conservative Dentistry & Endodontics",
  "Oral Medicine & Radiology", "Paediatric & Preventive Dentistry",
  "Oral Pathology & Microbiology", "Public Health Dentistry", "Oral Implantology"
];

const missingDM = [
  "Nephrology", "Gastroenterology", "Endocrinology & Metabolism", "Medical Oncology",
  "Clinical Haematology", "Rheumatology", "Hepatology", "Infectious Diseases",
  "Neonatology", "Paediatric Cardiology", "Paediatric Neurology",
  "Paediatric Haematology-Oncology", "Paediatric Nephrology", "Paediatric Gastroenterology",
  "Paediatric Pulmonology", "Cardiac Anaesthesia", "Neuro Anaesthesia",
  "Critical Care Medicine", "Paediatric & Neonatal Anaesthesia", "Organ Transplant Anaesthesia",
  "Medical Genetics", "Reproductive Medicine & Biology", "Nuclear Medicine",
  "Geriatric Medicine", "Palliative Medicine", "Immunology", "Clinical Pharmacology",
  "Radiotherapy (Advanced)", "Pulmonary Medicine (Interventional)"
];

const missingMCh = [
  "Vascular Surgery", "Plastic & Reconstructive Surgery", "Paediatric Surgery",
  "Surgical Oncology", "Urology", "Surgical Gastroenterology", "Liver Transplant & HPB Surgery",
  "Burns & Plastic Surgery", "Endocrine Surgery", "Colorectal Surgery", "Hand Surgery",
  "Spine Surgery", "Joint Replacement Surgery", "Foot & Ankle Surgery", "Head & Neck Surgery",
  "Otology / Cochlear Implant Surgery", "Rhinology", "Vitreo-Retinal Surgery",
  "Cornea & Anterior Segment Surgery", "Glaucoma Surgery", "Oculoplasty",
  "Paediatric Ophthalmology", "Gynaecological Oncology", "Maternal-Fetal Medicine",
  "Laparoscopic / Minimal Access Surgery", "Renal Transplant Surgery"
];

const missingOthers = [
  "PhD (Medical Sciences)", "DSc (Doctor of Science)", "DrPH (Doctor of Public Health)",
  "MD (Research)", "MBA (Hospital Administration)",
  "Diploma in Gynaecology & Obstetrics (DGO)", "Diploma in Child Health (DCH)",
  "Diploma in Ophthalmology / Medical Sciences (DOMS)", "Diploma in Laryngology & Otology (DLO)",
  "Diploma in Psychological Medicine (DPM)", "Diploma in Anaesthesiology (DA)",
  "Diploma in Public Health (DPH)", "Diploma in Family Medicine (DFM)",
  "Diploma in Tuberculosis & Chest Diseases (DTCD)", "Diploma in Radio-Diagnosis (DRD)",
  "Diploma in Dermatology (Dip. Derm)", "Diploma in Medical Radio-Diagnosis (DMRD)",
  "Diploma in Medical Radio-Therapy (DMRT)", "DNB (Diplomate of National Board)",
  "MD (Ayu)", "MS (Ayu)", "MD (Hom)", "MD (Unani)"
];

let newDegreesStr = `
  // --- NEW MEDICAL DEGREES FROM PDF ---
`;

function addDegrees(prefix, list, category) {
  for (const item of list) {
    const fullName = prefix ? `${prefix} in ${item}` : item;
    newDegreesStr += `  {
    name: "${fullName}",
    weight: 90,
    category: "${category}",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in ${item.toLowerCase()}.",
    subjects: ["Advanced ${item} Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
`;
  }
}

addDegrees("MD", missingMD, "Medical");
addDegrees("MS", missingMS, "Medical");
addDegrees("MDS", missingMDS, "Dental");
addDegrees("DM", missingDM, "Medical");
addDegrees("MCh", missingMCh, "Medical");
addDegrees("", missingOthers, "Medical");

// Inject into file right before the last closing bracket of USER_SPECIALIZATIONS_DATABASE
const closingBracketIndex = content.lastIndexOf('];');
if (closingBracketIndex !== -1) {
  content = content.slice(0, closingBracketIndex) + newDegreesStr + content.slice(closingBracketIndex) + ';\n';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully appended new medical degrees.");
} else {
  console.log("Could not find closing bracket.");
}
