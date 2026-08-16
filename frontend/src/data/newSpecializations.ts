export interface SpecializationInfo {
  name: string;
  weight: number;
  category: string;
  demand: string;
  description: string;
  subjects: string[];
  roles: string[];
  rank?: number;
}

export const DEFENCE_PE_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Defence Studies",
    weight: 85,
    category: "Defence",
    demand: "High",
    description: "Study of national security, military history, and strategic defence.",
    subjects: ["Military Strategy", "National Security", "War History"],
    roles: ["Defence Analyst", "Officer"]
  },
  {
    rank: 2,
    name: "Physical Education",
    weight: 80,
    category: "Sports",
    demand: "Moderate",
    description: "Focus on physical fitness, sports science, and coaching.",
    subjects: ["Sports Physiology", "Kinesiology", "Coaching"],
    roles: ["Physical Trainer", "Sports Coach"]
  },
  {
    rank: 3,
    name: "Military Science & Tactical Operations",
    weight: 88,
    category: "Defence",
    demand: "High",
    description: "Explores the physical science of ballistic trajectories, strategic unit movements, combat simulations, and infantry logistics frameworks.",
    subjects: ["Ballistics & Weapons Physics", "Combat Unit Tactics", "Military Logistics", "Operations Simulations"],
    roles: ["Tactical Operations Specialist", "Military Analyst", "Logistics Planning Officer"]
  },
  {
    rank: 4,
    name: "Security Management & Counter-Terrorism Studies",
    weight: 89,
    category: "Defence",
    demand: "High",
    description: "Mastery of physical security systems, threat intelligence compilation, counter-terrorist tactical doctrine, and critical infrastructure defense.",
    subjects: ["Threat Intelligence Analyses", "Critical Infrastructure Protection", "Counter-Terrorism Strategy", "Physical Security Systems"],
    roles: ["Security Director", "Counter-Terrorism Analyst", "Corporate Security Consultant"]
  }
];

export const EDUCATION_TEACHING_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Early Childhood Education",
    weight: 85,
    category: "Education",
    demand: "High",
    description: "Focus on teaching and development of young children.",
    subjects: ["Child Psychology", "Pedagogy", "Curriculum Design"],
    roles: ["Pre-school Teacher", "Child Care Specialist"]
  },
  {
    rank: 2,
    name: "Secondary Education",
    weight: 85,
    category: "Education",
    demand: "High",
    description: "Training in subject-specific teaching at secondary level.",
    subjects: ["Subject Pedagogy", "Classroom Management"],
    roles: ["High School Teacher", "Educator"]
  },
  {
    rank: 3,
    name: "Educational Technology & Instructional Architecture",
    weight: 92,
    category: "Education",
    demand: "Critical",
    description: "Applies cognitive learning theories to design virtual classroom software, interactive online curriculums, and e-learning assessment analytics.",
    subjects: ["LMS Platform Architectures", "Cognitive Design & Usability", "Digital Assessment Math", "E-Learning Instructional Flows"],
    roles: ["Instructional Designer", "EdTech Product Specialist", "Learning Systems Administrator"]
  },
  {
    rank: 4,
    name: "Special Education & Neurodiversity Pedagogy",
    weight: 91,
    category: "Education",
    demand: "High",
    description: "Specialized instruction strategies for children with learning differences, sensory processing adaptations, and customizable IEP developmental curricula.",
    subjects: ["Sensory Processing Adaptations", "IEP Curricular Architectures", "Neurodiversity-Affirming Methods", "Behavioral Analysis & Support"],
    roles: ["Special Education Teacher", "Neurodiversity Education Specialist", "Behavior Analyst Consultant"]
  }
];

export const AGRICULTURE_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Agronomy",
    weight: 90,
    category: "Agriculture",
    demand: "Critical",
    description: "In-depth crop cultivation, soil management, dryland farming practices, and optimization of yield.",
    subjects: ["Crop Physiology", "Weed Management", "Sustainable Farming", "Irrigation Science"],
    roles: ["Agronomist", "Farm Consultant", "Crop Production Manager"]
  },
  {
    rank: 2,
    name: "Horticulture",
    weight: 85,
    category: "Agriculture",
    demand: "High",
    description: "Scientific cultivation, propagation, and marketing of high-value fruits, vegetables, flowers, and nursery plants.",
    subjects: ["Pomology", "Olericulture", "Floriculture & Landscaping", "Post-Harvest Management"],
    roles: ["Horticulturist", "Florist Consultant", "Greenhouse Manager"]
  },
  {
    rank: 3,
    name: "Forestry & Silviculture",
    weight: 82,
    category: "Conservation",
    demand: "High",
    description: "Sustainable management of forest reserves, timber harvesting, ecological restoration, and wildlife protection policies.",
    subjects: ["Forest Mensuration", "Silvicultural Systems", "Wood Tech", "Forest Policy & Laws"],
    roles: ["Forest Range Officer", "Wildlife Conservator", "Silviculture Consultant"]
  },
  {
    rank: 4,
    name: "Aquaculture & Fisheries",
    weight: 88,
    category: "Marine Sciences",
    demand: "High",
    description: "Study of inland and marine aquatic life breeding, breeding infrastructure, and post-harvest shipping systems.",
    subjects: ["Freshwater Aquaculture", "Fish Nutrition", "Marine Ecosystems", "Hatchery Engineering"],
    roles: ["Fishery Development Officer", "Aquaculturist", "Hatchery Manager"]
  },
  {
    rank: 5,
    name: "Sericulture & Silk Tech",
    weight: 80,
    category: "Textiles",
    demand: "Niche",
    description: "Study of silkworm rearing, host crop agronomy, cocoon harvesting, raw silk reeling, and fiber loom processing.",
    subjects: ["Moriculture", "Silkworm Pathology", "Silk Grainage", "Silk Reeling Technology"],
    roles: ["Sericulture Inspector", "Silk Technologist", "Textile Quality Analyst"]
  },
  {
    rank: 6,
    name: "Food Technology",
    weight: 92,
    category: "Food Science",
    demand: "Critical",
    description: "Focus on industrial food production, preservation, nutrition biochemistry, safety standards, and modern packaging sciences.",
    subjects: ["Food Microbiology", "Unit Operations", "Sensory Evaluation", "Preservation Economics"],
    roles: ["Food Technologist", "Quality Assurance Lead", "Product Development Specialist"]
  },
  {
    rank: 7,
    name: "Agricultural Biotechnology",
    weight: 94,
    category: "Bio-Sciences",
    demand: "Critical",
    description: "Using gene-editing, recombinant DNA, tissue culture, and genomics to cultivate pest-resistant, climate-resilient crop varietals.",
    subjects: ["Plant Tissue Culture", "Genetic Engineering", "Molecular Markers", "Bio-safety Ethics"],
    roles: ["Biotech Researcher", "Plant Breeder", "Tissue Culture Specialist"]
  },
  {
    rank: 8,
    name: "Plant Pathology & Protection",
    weight: 83,
    category: "Crop Health",
    demand: "High",
    description: "Diagnosis and biological/chemical mitigation of plant viral, bacterial, and fungal infections to prevent catastrophic crop failure.",
    subjects: ["Mycology", "Plant Virology", "Epidemiology", "Biological Pest Mitigation"],
    roles: ["Plant Pathologist", "Crop Protection Advisor", "Pesticide Formulation Expert"]
  },
  {
    rank: 9,
    name: "Soil Science & Chemistry",
    weight: 89,
    category: "Earth Sciences",
    demand: "High",
    description: "Study of chemical, physical, and biological parameters of soil, diagnostic nutrient testing, fertilizer engineering, and conservation.",
    subjects: ["Soil Physics", "Soil Mineralogy", "Fertilizer Chemistry", "Soil Microbiology"],
    roles: ["Soil Chemist", "Soil Conservationist", "Precision Farming Advisor"]
  },
  {
    rank: 10,
    name: "Poultry Science",
    weight: 84,
    category: "Animal Husbandry",
    demand: "High",
    description: "Specialized focus on broiler and layer raising, flock nutrition, disease diagnosis, hatchery controls, and commercial supply chains.",
    subjects: ["Poultry Breeding & Genetics", "Avian Immunology", "Hatchery Management", "Flock Economics"],
    roles: ["Poultry Farm Manager", "Hatchery Technical Supervisor", "Poultry Nutrition Consultant"]
  },
  {
    rank: 11,
    name: "Animal Nutrition",
    weight: 86,
    category: "Animal Husbandry",
    demand: "High",
    description: "Fodder evaluation, physiological rumen microbiology, feed balancing math, pet nutrition, and commercial livestock health management.",
    subjects: ["Rumen Physiology", "Feed Formulation Tech", "Fodder Agronomy", "Veterinary Dietetics"],
    roles: ["Livestock Nutritionist", "Dairy Feed Quality Analyst", "Feed Mill Manager"]
  },
  {
    rank: 12,
    name: "Precision Farming & IoT Agriculture",
    weight: 95,
    category: "Agriculture",
    demand: "Critical",
    description: "Applies IoT sensor networks, GPS soil mapping indices, real-time weather analytics, and drone spectral imaging to maximize commercial crop yields.",
    subjects: ["IoT Soil Sensor Networks", "Drone Spectral Mapping", "Variable Rate Application", "GIS Spatial Crop Analytics"],
    roles: ["Precision Agriculture Consultant", "Digital Farming Advisor", "Agri-Tech Systems Integrator"]
  },
  {
    rank: 13,
    name: "Vertical Farming & Controlled-Environment Agri",
    weight: 93,
    category: "Agriculture",
    demand: "High",
    description: "Specializes in design of urban vertical hydroponic crops, aeroponic plant nutrition, closed-loop lighting spectra optimization, and automatic climate systems.",
    subjects: ["Hydroponics & Aeroponics Mechanics", "Closed-Loop Lighting Optimization", "Controlled-Environment Systems", "Nutrient Film Techniques"],
    roles: ["Vertical Farm Manager", "CEA Grow Specialist", "Urban Agriculturist Advisor"]
  }
];
