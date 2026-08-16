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

export const USER_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    name: "Computer Science Engineering",
    weight: 100,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "The primary computational science field focusing on software design, algorithmic logic, computer systems, and scalable web/data infrastructures.",
    subjects: ["Data Structures & Algorithms", "Operating Systems", "Computer Architecture", "Database Management Systems"],
    roles: ["Software Developer", "Computer Hardware Engineer", "Embedded Systems Engineer", "Network Systems Administrator"]
  },
  {
    name: "Electronics & Communication Engineering",
    weight: 17,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Studies semiconductor structures, digital circuits, analog chips, microwave frequencies, fiber-optic telemetry, and telecom grids.",
    subjects: ["Digital Signal Processing", "Microcontrollers & Embedded Controllers", "Analog Communications", "Semiconductor Theory"],
    roles: ["Electronics Engineer", "Communication Engineer", "VLSI Design Engineer", "Network Engineer", "IoT Engineer"]
  },
  {
    name: "Artificial Intelligence & Machine Learning",
    weight: 16,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Fuses predictive mathematics, neural net layers, reinforcement learning architectures, and natural language logic models.",
    subjects: ["Deep Learning Models", "Statistical Mathematics", "Computer Vision", "Natural Language Processing"],
    roles: ["Machine Learning Engineer", "Artificial Intelligence Engineer", "Data Scientist", "Robotics software developer"]
  },
  {
    name: "Mechanical Engineering",
    weight: 16,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Core discipline covering mechanical kinematics, structural kinetics, thermodynamics, CAD blueprints, and industrial design principles.",
    subjects: ["Thermodynamics & Heat Transfer", "Fluid Dynamics", "Kinematics of Machinery", "CAD/CAM Methodologies"],
    roles: ["Mechanical Design Engineer", "Manufacturing Engineer", "Product Engineer", "Maintenance Engineer"]
  },
  {
    name: "Electrical Engineering",
    weight: 11,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Explores heavy-generating engines, smart power distribution, high-voltage transformers, power grids, and control instruments.",
    subjects: ["Power Systems & Transmission", "Electrical Machinery", "Control Instrumentation", "Network Analysis & Circuits"],
    roles: ["Electrical Engineer", "Power Analyst", "Grid Engineer", "Control System Specialist"]
  },
  {
    name: "Civil Engineering",
    weight: 11,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Architectural mechanics of structures, geotechnics of foundations, hydrologic drainage design, and heavy concrete/steel engineering.",
    subjects: ["Structural Analysis", "Geotechnical Engineering", "Fluid Mechanics & Hydraulics", "Concrete Technology"],
    roles: ["Civil Engineer", "Project Architect", "Structural Consultant", "Site Quality Lead"]
  },
  {
    name: "Biotechnology Engineering",
    weight: 10,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Integrates biological cell mechanics, DNA recombinant techniques, micro-organic growth, and industrial enzyme processes.",
    subjects: ["Biochemical Engineering", "Cell & Molecular Biology", "Bioprocess Technology", "Genetics & Gene Editing"],
    roles: ["Biotech Engineer", "Research Scientist", "Bioprocess Lead", "Clinical Quality Inspector"]
  },
  {
    name: "Information Technology",
    weight: 6,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Modern enterprise IT systems, web development frameworks, relational databases, routing protocols, and cloud computing architectures.",
    subjects: ["Web Development", "Cloud Computing", "Database Systems", "Computer Networking"],
    roles: ["IT Administrator", "DevOps Engineer", "Cloud Solutions Architect", "Database Admin"]
  },
  {
    name: "Electronics Engineering",
    weight: 6,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Designing, testing, and implementing miniature solid-state circuitry, silicon transistors, analog micro-chips, and hardware interfaces.",
    subjects: ["VLSI Design", "Analog Circuits", "Digital Electronics", "Control Systems"],
    roles: ["Electronics Designer", "System Design Engineer", "Hardware Analyst", "Test Engineer"]
  },
  {
    name: "Chemical Engineering",
    weight: 11,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Industrial processes for transforming raw materials into refined consumer chemicals, petroleum refining, and polymer production.",
    subjects: ["Mass Transfer Operations", "Reaction Kinetics", "Chemical Engineering Thermodynamics", "Process Control"],
    roles: ["Chemical Process Engineer", "Plant Operator", "Safety Analyst", "Refinery Supervisor"]
  },
  {
    name: "Aerospace Engineering",
    weight: 3,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Structural engineering of spacecraft and atmospheric aircraft, aerodynamics, rocket propulsion, and guidance systems.",
    subjects: ["Aerodynamics", "Propulsion Systems", "Avionics", "Flight Mechanics"],
    roles: ["Aerospace Specialist", "Structural Engineer", "Aeroelasticity Consultant", "Flight Controls Engineer"]
  },
  {
    name: "Cyber Security",
    weight: 3,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Information security, modern cryptography, digital threat defense, risk mitigation, and network penetration testing.",
    subjects: ["Cryptography", "Network Security", "Ethical Hacking", "Digital Forensics"],
    roles: ["Security Analyst", "Penetration Tester", "SOC Lead", "Security Architect"]
  },
  {
    name: "Food Technology",
    weight: 3,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Scientific food processing, manufacturing machinery, preserving nutritional value, sanitization controls, and smart food packaging.",
    subjects: ["Food Microbiology", "Food Processing Operations", "Food Chemistry & Nutrition", "Quality Control & Standards"],
    roles: ["Food Inspector", "Food Safety Officer", "Process Technologist", "Quality Manager"]
  },
  {
    name: "Aeronautical Engineering",
    weight: 2,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Aircraft systems, airframe structures, gas turbine engines, flight dynamics, and routine maintenance of aviation vehicles.",
    subjects: ["Aircraft Propulsion", "Flight Dynamics", "Aero-elasticity", "Avionics Systems"],
    roles: ["Aeronautical Engineer", "Maintenance Specialist", "Structural Inspector"]
  },
  {
    name: "Biomedical Engineering",
    weight: 2,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Crosses advanced clinical biology with medical equipment design, pacemakers, digital MRI imaging, and prosthetic materials.",
    subjects: ["Bio-instrumentation", "Medical Imaging", "Biomechanics", "Biomaterials"],
    roles: ["Biomedical Consultant", "Equipment Engineer", "Clinical Researcher"]
  },
  {
    name: "Robotics Engineering",
    weight: 2,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Design and program mechanical manipulators, computerized actuators, servo-motors, and advanced automated robotics controllers.",
    subjects: ["Kinematics & Dynamics", "Robot Vision", "Actuators & Sensors", "Control Systems"],
    roles: ["Robotics Engineer", "Automation Analyst", "Robotics software developer"]
  },
  {
    name: "Instrumentation Technology",
    weight: 2,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Electronic sensors, signal amplification, control transmitters, calibration loops, and PLC/SCADA process engineering.",
    subjects: ["Transducers & Sensors", "Process Instrumentation", "Signal Conditioning", "PLC & SCADA"],
    roles: ["Instrumentation Specialist", "Control Engineer", "Calibration Tech"]
  },
  {
    name: "Mechatronics Engineering",
    weight: 2,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Synergic blend of mechanical, electrical, computer engineering, microcontrollers, and automated sensor systems.",
    subjects: ["Microcontrollers", "Automation & Control", "Embedded Systems", "CAD/CAM"],
    roles: ["Mechatronics Specialist", "Automation Designer", "Control Technician"]
  },
  {
    name: "Metallurgical Engineering",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Extracting metals from raw ores, physical chemistry of alloy blending, hot/cold rolling, and corrosion prevention science.",
    subjects: ["Physical Metallurgy", "Iron & Steel Making", "Corrosion Engineering", "Extractive Metallurgy"],
    roles: ["Metallurgical Consultant", "Quality Inspector", "Alloy Researcher"]
  },
  {
    name: "Materials Science",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Structure-property relationship of engineering substances, advanced ceramics, polymers, and nanoscale composite materials.",
    subjects: ["Nanomaterials", "Polymer Sciences", "Ceramics & Composites", "Material Characterization"],
    roles: ["Materials Scientist", "Research Analyst", "Materials Consultant"]
  },
  {
    name: "Automobile Engineering",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Design of passenger cars and heavy trucks, internal combustion engines, suspension geometry, and modern electric vehicle powertrains.",
    subjects: ["Internal Combustion Engines", "Vehicle Dynamics", "Auto Transmission", "EV Technology"],
    roles: ["Automotive Designer", "Service Engineer", "Powertrain Lead"]
  },
  {
    name: "Agriculture & Farm Engineering",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Automating farm sowing, tractor machinery, agricultural soil hydrology, irrigation networks, and greenhouse environmental controls.",
    subjects: ["Farm Machinery", "Soil & Water Engineering", "Irrigation Systems", "Post-Harvest Tech"],
    roles: ["Agricultural Engineer", "Farm Consultant", "Irrigation Planner"]
  },
  {
    name: "Industrial Engineering",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Mathematical operations research, supply chain scheduling, facility layouts, quality control, and workplace ergonomics.",
    subjects: ["Operations Research", "Supply Chain", "Quality Control", "Ergonomics"],
    roles: ["Industrial Analyst", "Production Planner", "Supply Chain Consultant"]
  },
  {
    name: "Mining Engineering",
    weight: 1,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Open-cast and underground mine surveying, rock blasting chemistry, transport ventilation, and environmental mining regulations.",
    subjects: ["Mine Surveying", "Rock Mechanics", "Explosion Engineering", "Mineral Dressing"],
    roles: ["Mining Engineer", "Safety Inspector", "Explosives Manager"]
  },
  {
    name: "Production Engineering",
    weight: 0.98,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Industrial casting, welding technologies, metal cutting tool wear, CNC machine centers, and shopfloor layout management.",
    subjects: ["Casting & Welding", "CNC Machining", "Metrology", "Industrial Engineering"],
    roles: ["Production Supervisor", "Process Planner", "Assembly Lead"]
  },
  {
    name: "Marine Engineering",
    weight: 0.95,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Heavy marine ship propulsion engines, power generators, ballast plumbing systems, and hull structural engineering.",
    subjects: ["Marine Propulsion", "Ship Structure", "Naval Architecture", "Marine Auxiliaries"],
    roles: ["Marine Engineer", "Ship Surveyor", "Port Technical Officer"]
  },
  {
    name: "Telecommunication Engineering",
    weight: 0.9,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Fiber-optic networks, cellular base station coverage, radio frequency antenna design, and multiplexing grids.",
    subjects: ["Optical Networks", "Wireless Communication", "Antennas", "Satellite Communication"],
    roles: ["Telecom Network Analyst", "RF Engineer", "System Administrator"]
  },
  {
    name: "VLSI Design",
    weight: 0.82,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Ultra-miniature integrated circuit design, CMOS transistors, hardware description languages (Verilog/VHDL), and physical layouts.",
    subjects: ["CMOS Digital IC", "Verilog/VHDL", "Analog IC Design", "ASIC & FPGA"],
    roles: ["VLSI Design Engineer", "Physical Design Analyst", "Silicon Architect"]
  },
  {
    name: "Textile Engineering",
    weight: 0.64,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Spinning raw fibers into yarns, weaving looms, textile dyeing chemistry, and synthetic polymer fiber extrusion.",
    subjects: ["Yarn Manufacture", "Fabric Structure", "Textile Chemistry", "Fiber Science"],
    roles: ["Textile Quality Manager", "Production Lead", "Fabric Scientist"]
  },
  {
    name: "Communications Engineering",
    weight: 0.59,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Focuses on signal encoding, channel capacity, modems, noise filtering, and communication protocols.",
    subjects: ["Communication Theory", "Signal Processing", "Information Theory", "Networking Basics"],
    roles: ["Communications Engineer", "Systems Designer", "Signal Specialist"]
  },
  {
    name: "IoT and Connected Devices",
    weight: 0.59,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Sensor network topologies, smart home automation, IoT gateway security, micro-controllers, and cloud databases.",
    subjects: ["IoT Architectures", "Sensor Networks", "Cloud Integration", "Embedded IoT"],
    roles: ["IoT Specialist", "Smart Systems Architect", "Embedded Developer"]
  },
  {
    name: "Petroleum Engineering",
    weight: 0.53,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Offshore oil drilling math, petroleum reservoir pressure modeling, well logs, and extraction chemicals.",
    subjects: ["Drilling Engineering", "Reservoir Engineering", "Well Logging", "Petroleum Geology"],
    roles: ["Petroleum Engineer", "Drilling Consultant", "Reservoir Analyst"]
  },
  {
    name: "Dairy Technology",
    weight: 0.49,
    category: "Vocational courses",
    demand: "Moderate Demand",
    description: "Industrial milk pasteurization, milk protein chemistry, automated butter and cheese machinery, and hygiene standards.",
    subjects: ["Dairy Chemistry", "Dairy Engineering", "Milk Processing", "Quality Standards"],
    roles: ["Dairy Plant Manager", "Quality Specialist", "Milk Inspector"]
  },
  {
    name: "Environmental Engineering",
    weight: 0.48,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Designing municipal drinking water filters, chemical sewage treatment, ambient air scrubbers, and carbon footprint audits.",
    subjects: ["Wastewater Treatment", "Air Pollution Control", "Solid Waste Management", "EIA Studies"],
    roles: ["Environmental Analyst", "EHS Lead", "Water Treatment Consultant"]
  },
  {
    name: "Control Systems",
    weight: 0.41,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Feedback loops, mathematical state-space modeling, proportional-integral-derivative controllers, and industrial stability.",
    subjects: ["Linear Control Systems", "Digital Controls", "Optimal Control", "Robotics Dynamics"],
    roles: ["Control Systems Engineer", "Automation Consultant", "Loop Tuning Expert"]
  },
  {
    name: "Bioinformatics",
    weight: 0.4,
    category: "BSc",
    demand: "Critical Demand",
    description: "Computational tools to analyze DNA sequences, protein structural folds, gene expression arrays, and molecular evolution.",
    subjects: ["Computational Biology", "Sequence Analysis", "Biostatistics", "Genomics"],
    roles: ["Bioinformatics Analyst", "Data Curator", "Computational Biologist"]
  },
  {
    name: "Fire & Safety Engineering",
    weight: 0.39,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Structural fire protection, automatic alarm systems, chemical blast containment, and industrial escape safety design.",
    subjects: ["Fire Dynamics", "Safety Management", "Industrial Hazards", "Risk Assessment"],
    roles: ["Fire Safety Officer", "EHS Inspector", "Fire Protection Engineer"]
  },
  {
    name: "Biochemical Engineering",
    weight: 0.36,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Optimizing industrial bioreactor tanks, enzyme scaling kinematics, yeast fermentations, and downstream bio-purifications.",
    subjects: ["Bioreactor Design", "Downstream Processing", "Enzyme Technology", "Thermodynamics"],
    roles: ["Biochemical Engineer", "Bioprocess Scientist", "Fermentation Lead"]
  },
  {
    name: "Engineering Physics",
    weight: 0.32,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Fuses core quantum mechanics, optics lasers, electromagnetic solid state, and mathematical instrumentation.",
    subjects: ["Quantum Mechanics", "Electrodynamics", "Solid State Physics", "Laser Tech"],
    roles: ["Research Scientist", "Technical Consultant", "Optics Analyst"]
  },
  {
    name: "Energy Engineering",
    weight: 0.22,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Thermodynamics of thermal power plants, clean solar cell physics, wind turbine dynamics, and green carbon credits.",
    subjects: ["Solar & Wind Energy", "Energy Conservation", "Thermodynamics", "Power Plants"],
    roles: ["Energy Auditor", "Renewable Specialist", "Utility Analyst"]
  },
  {
    name: "Naval Architecture",
    weight: 0.22,
    category: "Architecture",
    demand: "High Demand",
    description: "Fluid dynamics of ship hulls, marine stability engineering, ship buoyancy, and maritime architectural drawings.",
    subjects: ["Ship Hydrodynamics", "Marine Structures", "Ship Resistance", "Vessel Design"],
    roles: ["Naval Architect", "Marine Consultant", "Hull Designer"]
  },
  {
    name: "Ceramic Engineering",
    weight: 0.21,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Refractory kiln furnace bricks, ultra-hard high temperature ceramics, glass blowing chemistry, and crystal structures.",
    subjects: ["Refractory Technology", "Glass Sciences", "Electronic Ceramics", "Powder Processing"],
    roles: ["Ceramic Engineer", "Materials Analyst", "Kiln Specialist"]
  },
  {
    name: "Polymer Technology",
    weight: 0.18,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Polymerization synthesis, plastic injection molding tools, rubber vulcanization, and material stress rheology.",
    subjects: ["Polymer Chemistry", "Plastics Processing", "Rubber Science", "Rheology"],
    roles: ["Polymer Engineer", "Molding Specialist", "Quality Control Inspector"]
  },
  {
    name: "Manufacturing Engineering",
    weight: 0.15,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Automated metal lathes, multi-axis machining toolpaths, additive 3D metal printing, and smart lean assembly lines.",
    subjects: ["CNC Systems", "Metal Cutting", "Industrial Robotics", "Additive Manufacturing"],
    roles: ["Manufacturing Engineer", "Process Auditor", "Plant Supervisor"]
  },
  {
    name: "Automation",
    weight: 0.15,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "PLC ladder logic programming, HMI console control screens, pneumatic actuator valves, and factory IoT networks.",
    subjects: ["PLC Programming", "SCADA Integration", "Robotics Controls", "Industrial IoT"],
    roles: ["Automation Engineer", "Systems Integrator", "Control Specialist"]
  },
  {
    name: "Pharmaceutical engineering",
    weight: 0.15,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Industrial chemical synthesis of drug active compounds, tablet pressing machinery, cleanroom GMP rules, and sterilizations.",
    subjects: ["Drug Formulation", "Process Validation", "Pharmacokinetics", "GMP Guidelines"],
    roles: ["Pharmaceutical Engineer", "Formulation Scientist", "Pharma Plant Manager"]
  },
  {
    name: "Bioinformatics",
    weight: 0.12,
    category: "BSc",
    demand: "Critical Demand",
    description: "Gene alignments, databases (NCBI/BLAST), scripting (Python/Perl) for clinical biology, and 3D molecular dockings.",
    subjects: ["Genetic Databases", "Computational Biology", "Structure Prediction", "Perl for Bio"],
    roles: ["Biocomputational Analyst", "Data Curator", "Bio-data Scientist"]
  },
  {
    name: "Power Engineering",
    weight: 0.12,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Electricity grid substation setups, high-voltage transformers, switchgear protection relays, and smart solar grids.",
    subjects: ["Substation Design", "Power Transmission", "Switchgear & Protection", "Smart Grids"],
    roles: ["Power Systems Analyst", "Grid Engineer", "Substation Designer"]
  },
  {
    name: "Business Analytics",
    weight: 0.1,
    category: "Management",
    demand: "Critical Demand",
    description: "Using predictive statistical models, SQL databases, business intelligence (Tableau), and R metrics to boost profits.",
    subjects: ["Data Mining", "Predictive Modeling", "Marketing Analytics", "R Programming"],
    roles: ["Business Analyst", "Marketing Data Specialist", "Strategy Lead"]
  },
  {
    name: "Microelectronics",
    weight: 0.09,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Semiconductor device physics, silicon wafer photo-lithography, ultra-thin physical vapor depositions, and sub-micron transistors.",
    subjects: ["Semiconductor Devices", "IC Processing", "VLSI Layout", "Solid State Physics"],
    roles: ["Device Physicist", "Silicon Analyst", "Process Engineer"]
  },
  {
    name: "Physics",
    weight: 0.09,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Fundamental laws of space-time, quantum atomic models, thermodynamic heat formulas, and classical vector math.",
    subjects: ["Classical Mechanics", "Quantum Physics", "Electromagnetism", "Nuclear Physics"],
    roles: ["Lecturer", "Scientific Assistant", "Research Fellow"]
  },
  {
    name: "Data Analytics",
    weight: 0.08,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Parsing corporate spreadsheets, SQL data extraction, creating live executive dashboards, and statistical distributions.",
    subjects: ["Tableau Reporting", "Python Data Science", "SQL Queries", "Statistics"],
    roles: ["Data Analyst", "Reporting Lead", "Metrics Specialist"]
  },
  {
    name: "Construction Engineering",
    weight: 0.07,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Soil concrete testing, heavy cranes scheduling, site concrete curing, cost budgeting, and structural safety guidelines.",
    subjects: ["Construction Planning", "Project Management", "Estimating & Costing", "Heavy Equipment"],
    roles: ["Construction Manager", "Site Engineer", "Concrete Quality Inspector"]
  },
  {
    name: "Computer Science & Engineering",
    weight: 0.07,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Theoretical computation bounds, data algorithms design, computer networks, and enterprise database integrations.",
    subjects: ["Data Structures", "Compiler Design", "Networks", "Algorithm Analysis"],
    roles: ["Software Engineer", "Systems Developer", "Database Lead"]
  },
  {
    name: "Biotechnology",
    weight: 0.07,
    category: "BSc",
    demand: "High Demand",
    description: "Cell biology, diagnostic antigen-antibody tests, genetic structures cloning, and biochemical laboratory operations.",
    subjects: ["Immunology", "Plant Biotech", "Animal Cell Culture", "Molecular Biology"],
    roles: ["Biotech Associate", "Lab Researcher", "Biopharm QA Lead"]
  },
  {
    name: "Genetic Engineering",
    weight: 0.06,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Direct genetic manipulation, gene splicing, CRISPR edits, genetically modified crop varietals, and gene therapies.",
    subjects: ["Gene Cloning", "Recombinant DNA", "Genomics", "Crispr Technology"],
    roles: ["Geneticist", "Bio-design Engineer", "Genomics Specialist"]
  },
  {
    name: "Nanotechnology",
    weight: 0.05,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Carbon nanotube synthesizing, nano-scale semiconductors, atomic force microscopy, and drug nanomedicines.",
    subjects: ["Synthesis of Nanomaterials", "Quantum Nanostructures", "Nano-electronics", "Characterization Techniques"],
    roles: ["Nanotechnologist", "Materials Analyst", "Nano-device Engineer"]
  },
  {
    name: "Forensic Science",
    weight: 0.05,
    category: "BSc",
    demand: "High Demand",
    description: "Diagnostic crime investigation, ballistics matches, blood spatter analysis, DNA finger-printing, and crime forensics.",
    subjects: ["Forensic Toxicology", "Ballistics", "Fingerprinting & Serology", "Crime Scene Mgmt"],
    roles: ["Forensic Expert", "Ballistics Analyst", "Forensic Lab Tech"]
  },
  {
    name: "Embedded Systems & VLSI",
    weight: 0.05,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Writing assembly code on small microchips, firmware controls, bus protocols (SPI/I2C), and chip VLSI registers.",
    subjects: ["Real-time Systems", "FPGA Interfacing", "Verilog", "Microcontrollers"],
    roles: ["Embedded Software Engineer", "VLSI Designer", "Firmware Specialist"]
  },
  {
    name: "Data Science",
    weight: 0.05,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Advanced Python data modeling, predictive machine learning classifiers, neural nets, and SQL databases.",
    subjects: ["Machine Learning", "Statistical Modeling", "Python Big Data", "Data Wrangling"],
    roles: ["Data Scientist", "Big Data Architect", "Analytics Consultant"]
  },
  {
    name: "Mathematics",
    weight: 0.04,
    category: "BSc",
    demand: "High Demand",
    description: "Abstract matrix algebras, calculus vectors, real analysis, differential equations, and statistical math bounds.",
    subjects: ["Abstract Algebra", "Real Analysis", "Numerical Methods", "Differential Equations"],
    roles: ["Math Professor", "Actuarial Specialist", "Statistical Analyst"]
  },
  {
    name: "Software Development",
    weight: 0.04,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Designing corporate software apps, agile code workflows, REST APIs, and database migrations.",
    subjects: ["Agile Practices", "Full Stack Coding", "Software Architecture", "API Design"],
    roles: ["Full Stack Developer", "Backend Engineer", "Software Architect"]
  },
  {
    name: "Rubber Technology",
    weight: 0.04,
    category: "Vocational courses",
    demand: "Moderate Demand",
    description: "Natural rubber latex processing, chemical synthetic rubbers, carbon black reinforcing, and car tyre moldings.",
    subjects: ["Rubber Compounding", "Vulcanization Science", "Tyre Manufacture", "Testing of Polymers"],
    roles: ["Rubber Chemist", "Tyre Design Expert", "Polymer Quality Lead"]
  },
  {
    name: "Aircraft Maintenance Engineering",
    weight: 0.03,
    category: "Aviation",
    demand: "Critical Demand",
    description: "Airplane engine overhauls, flight flight-control electronics checklists, airframe inspections, and strict aviation laws.",
    subjects: ["Airframe Systems", "Avionics Instruments", "Jet Engines", "Aviation Law"],
    roles: ["Aircraft Maintenance Engineer", "Avionics Inspector", "Hangar Supervisor"]
  },
  {
    name: "Fullstack Development",
    weight: 0.03,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Coding both browser client-side React and backend server-side Node, API routing, and cloud database storage.",
    subjects: ["React Front-end", "Node/Express Back-end", "Database Integration", "DevOps basics"],
    roles: ["Fullstack Engineer", "MERN Developer", "Web Architect"]
  },
  {
    name: "Structural Engineering",
    weight: 0.03,
    category: "Architecture",
    demand: "High Demand",
    description: "Drafting concrete beams, wind shears calculations for high-rises, bridge cables suspension, and earthquake loads.",
    subjects: ["Bridge Engineering", "Concrete Mechanics", "Steel Structures", "Seismic Design"],
    roles: ["Structural Consultant", "Bridge Designer", "Structural Analyst"]
  },
  {
    name: "Quantum Computing",
    weight: 0.03,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Programming quantum logic gates, superposition algorithms, quantum crytpography, and quantum hardware.",
    subjects: ["Quantum Mechanics", "Qubit Logic Gates", "Qiskit Programming", "Quantum Cryp"],
    roles: ["Quantum Software Engineer", "Research Physicist", "Quantum Developer"]
  },
  {
    name: "Infrastructure",
    weight: 0.03,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Planning municipal roadways, city drainage layouts, public transportation routing, and green urban designs.",
    subjects: ["Infrastructure Planning", "Urban Transportation", "Geo-synthetics", "Water Distribution"],
    roles: ["Infrastructure Architect", "Urban Engineer", "Development Consultant"]
  },
  {
    name: "Computer Science",
    weight: 0.03,
    category: "BSc",
    demand: "High Demand",
    description: "Coding desktop applications in C++, relational database designs, operating systems, and web scripting basics.",
    subjects: ["C++ Coding", "DBMS Basics", "Web Tech", "Discrete Mathematics"],
    roles: ["Systems Associate", "Software Developer", "IT Specialist"]
  },
  {
    name: "Ocean Engineering",
    weight: 0.02,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Offshore oil platform construction, wave dynamics research, harbor structures, and underwater acoustic sensors.",
    subjects: ["Wave Hydrodynamics", "Offshore Structures", "Coastal Hydraulics", "Underwater Acoustics"],
    roles: ["Ocean Engineer", "Offshore Surveyor", "Port Engineer"]
  },
  {
    name: "Environmental Sciences",
    weight: 0.02,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Ecological reserve conservation, water quality monitoring, carbon credit accounting, and wildlife ecology.",
    subjects: ["Ecology Systems", "Climate Science", "Environmental Laws", "Biodiversity"],
    roles: ["Conservation Specialist", "Ecology Analyst", "EIA Officer"]
  },
  {
    name: "Electric Vehicles Design",
    weight: 0.02,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Designing high voltage EV batteries, BMS cooling channels, electric motors, and regenerative braking controllers.",
    subjects: ["Battery Chemistries", "BMS Design", "Traction Motors", "Thermal Analysis"],
    roles: ["EV Engineer", "Battery Pack Designer", "Traction System Specialist"]
  },
  {
    name: "Transportation Engineering",
    weight: 0.02,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Traffic junction modeling, asphalt pavement composition testing, rail track engineering, and public transit designs.",
    subjects: ["Highway Geometric Design", "Traffic Modeling", "Pavement Materials", "Railway Engineering"],
    roles: ["Transportation Planner", "Traffic Expert", "Highway Engineer"]
  },
  {
    name: "Thermal Engineering",
    weight: 0.02,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Thermodynamics of steam boilers, industrial air conditioners, heat transfer pipes, and turbine aerodynamic blades.",
    subjects: ["Refrigeration Systems", "IC Engine Thermodynamics", "Gas Turbines", "Computational Heat"],
    roles: ["Thermal Analyst", "HVAC Design Specialist", "Boiler consultant"]
  },
  {
    name: "Avionics",
    weight: 0.02,
    category: "Aviation",
    demand: "High Demand",
    description: "Cockpit instrument screens, radar communications, autopilot software algorithms, and fly-by-wire flight wiring.",
    subjects: ["Flight Control Electronics", "Radar Systems", "Aviation Instrumentation", "Telemetry Systems"],
    roles: ["Avionics System Engineer", "Radar Analyst", "Avionics Installer"]
  },
  {
    name: "Chemistry",
    weight: 0.01,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Organic synthesis mechanisms, inorganic compound analysis, thermodynamics equations, and molecular laboratory tools.",
    subjects: ["Organic Chemistry", "Inorganic Analysis", "Physical Chemistry", "Analytical Tools"],
    roles: ["Chemist", "Quality Chemist", "Lab Assistant"]
  },
  {
    name: "Nuclear Engineering",
    weight: 0.01,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Nuclear fission reactor core modeling, uranium fuel rods, lead radiation shields, and nuclear waste storages.",
    subjects: ["Reactor Physics", "Radiation Shielding", "Nuclear Safety", "Fusion Technology"],
    roles: ["Nuclear Safety Analyst", "Reactor Operator", "Shielding Consultant"]
  },
  {
    name: "Project Management",
    weight: 0.01,
    category: "Management",
    demand: "High Demand",
    description: "Agile methodologies, project scope definitions, critical path charts, budget allocations, and scrum loops.",
    subjects: ["Agile & Scrum", "Risk Analysis", "Resource Allocations", "Project Budgeting"],
    roles: ["Project Manager", "Scrum Master", "Project Planner"]
  },
  {
    name: "RF & Microwave Engineering",
    weight: 0.01,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "High-frequency radio wave transmission, microwave waveguide tubes, radar dish antennas, and transceiver boards.",
    subjects: ["Antenna Design", "Microwave Circuits", "RF System Analysis", "Electromagnetic Fields"],
    roles: ["RF Engineer", "Antenna Engineer", "Microwave Specialist"]
  },
  {
    name: "Leather Design",
    weight: 0.01,
    category: "Design",
    demand: "Moderate Demand",
    description: "Artisanal leather jacket patterning, chemical hide tanning, leather shoe design, and commercial supply lines.",
    subjects: ["Leather Crafting", "Footwear Technology", "Apparel Designing", "Tanning Sciences"],
    roles: ["Leather Designer", "Product Developer", "Quality Inspector"]
  },
  {
    name: "Construction Management",
    weight: 0.01,
    category: "Management",
    demand: "High Demand",
    description: "Construction contracts, heavy material shipping supply lines, concrete pouring schedules, and cost charts.",
    subjects: ["WBS Systems", "Safety Norms", "Contracts & Tenders", "Construction Economics"],
    roles: ["Construction Supervisor", "Project Planner", "Contract Manager"]
  },
  {
    name: "Biology",
    weight: 0.01,
    category: "BSc",
    demand: "Moderate Demand",
    description: "Cell organelles division, plant photosynthesis, evolutionary genetics, and botanical taxonomic trees.",
    subjects: ["Cell Biology", "Genetics & Mutation", "Plant Physiology", "Zoology Basics"],
    roles: ["Biologist", "Teacher", "Science Assistant"]
  },
  {
    name: "Tool Engineering",
    weight: 0.01,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Designing plastic injection press molds, metal stamping jigs and fixtures, and CNC cutting tool assemblies.",
    subjects: ["Die & Mold Design", "Jigs & Fixtures", "Press Tools", "Plastic Molding Tech"],
    roles: ["Tool Designer", "Tool Room Engineer", "Dies Specialist"]
  },
  {
    name: "Geological Engineering",
    weight: 0.01,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Rock stratum mechanics, seismic geophysical surveys, aquifer water drillings, and dam geological safety.",
    subjects: ["Structural Geology", "Geophysics", "Rock Engineering", "Groundwater Hydrology"],
    roles: ["Geologist", "Mining Consultant", "Geological Surveyor"]
  },
  {
    name: "Robotics Process Automation",
    weight: 0.01,
    category: "Computing & IT",
    demand: "High Demand",
    description: "Designing software computer bots in UiPath, automating corporate data copy-pastes, and process workflows.",
    subjects: ["UiPath Scripting", "Process Discovery", "Cognitive Automation", "RPA Architecture"],
    roles: ["RPA Developer", "Automation Analyst", "Workflow Architect"]
  },
  {
    name: "Soil & Water Conservation Engineering",
    weight: 0.01,
    category: "Engineering/ BE/ B Tech",
    demand: "Moderate Demand",
    description: "Preventing soil erosion, watershed channel check-dams, drip agricultural piping, and storm water basins.",
    subjects: ["Soil Erosion Mechanics", "Watershed Hydrology", "Irrigation Projects", "Drainage Systems"],
    roles: ["Conservationist", "Hydrology Advisor", "Soil Engineer"]
  },
  {
    name: "Dairy Science",
    weight: 0.01,
    category: "Vocational courses",
    demand: "Moderate Demand",
    description: "Breeding dairy cow herds, cattle nutrition feeds, milk yield statistics, and livestock farm disease diagnoses.",
    subjects: ["Animal Physiology", "Milk Composition", "Forage Management", "Livestock Breeding"],
    roles: ["Dairy Farm Expert", "Farming Supervisor", "Flock Consultant"]
  },
  {
    name: "International Business",
    weight: 0.0,
    category: "Management",
    demand: "Moderate Demand",
    description: "Global shipping ocean freight laws, foreign currency exchange risks, cross-cultural team leadership, and customs.",
    subjects: ["Global Marketing", "Forex Management", "Export-Import Laws", "Cross-Cultural Mgmt"],
    roles: ["Exim Specialist", "Global Trade Advisor", "Forex Analyst"]
  },
  {
    name: "Engineering Management",
    weight: 0.0,
    category: "Management",
    demand: "High Demand",
    description: "Leading technical software engineers, budget planning, technical product roadmap strategy, and agile structures.",
    subjects: ["Tech Operations", "Innovation Mgmt", "Systems Engineering", "Product Lifecycle"],
    roles: ["Engineering Lead", "Tech Manager", "Technical Director"]
  },
  {
    name: "Signal Processing",
    weight: 0.0,
    category: "Engineering/ BE/ B Tech",
    demand: "High Demand",
    description: "Digital noise filters, Fourier transforms, voice spectral analysis, and medical image processing.",
    subjects: ["Fourier Analysis", "Digital Signal Filters", "Image Processing", "Spectral Estimation"],
    roles: ["DSP Developer", "Systems Specialist", "Signal Analyst"]
  },
  {
    name: "Medical Laboratory Technology",
    weight: 0.0,
    category: "Paramedical",
    demand: "High Demand",
    description: "Processing clinical blood diagnostics, slide pathology staining, chemical urinalysis, and microscopic tests.",
    subjects: ["Clinical Biochemistry", "Hematology", "Pathology Techniques", "Clinical Microbiology"],
    roles: ["Lab Technician", "Pathology Supervisor", "Clinical Analyst"]
  },
  {
    name: "SAP CRM",
    weight: 0.0,
    category: "Management",
    demand: "Moderate Demand",
    description: "Configuring SAP Customer Relationship CRM servers, customer support tickets, and corporate sales automation databases.",
    subjects: ["SAP Architecture", "Customer Management", "Sales Force Automation", "SAP ABAP basics"],
    roles: ["SAP CRM Consultant", "Functional Lead", "SAP Database Admin"]
  },
  {
    name: "SAP ERP",
    weight: 0.0,
    category: "Management",
    demand: "Moderate Demand",
    description: "SAP Enterprise Resource ERP configurations, corporate finance accounts, material shipping databases, and HR systems.",
    subjects: ["Enterprise Architecture", "FICO Module", "Materials Mgmt", "HR Logistics SAP"],
    roles: ["SAP ERP Specialist", "ERP Consultant", "Systems Auditor"]
  },
  {
    name: "Business Intelligence Tools",
    weight: 0.0,
    category: "Computing & IT",
    demand: "High Demand",
    description: "Connecting Microsoft PowerBI to databases, writing corporate DAX measures, and cleaning data warehouses.",
    subjects: ["Power BI", "Tableau Analytics", "Data Warehouse", "SQL Server Analysis"],
    roles: ["BI Developer", "Reporting Architect", "Business Analyst"]
  },
  {
    name: "GeoInformatics",
    weight: 0.0,
    category: "BSc",
    demand: "Moderate Demand",
    description: "GIS maps, remote sensing satellite photos, global GPS survey systems, and geological spatial maps.",
    subjects: ["GIS Platforms", "Remote Sensing", "GPS Surveying", "Spatial Databases"],
    roles: ["GIS Specialist", "Remote Sensing Engineer", "Spatial Analyst"]
  },
  {
    name: "Renewable Energy",
    weight: 0.0,
    category: "Engineering/ BE/ B Tech",
    demand: "Critical Demand",
    description: "Optimizing solar panel solar cells, wind farm wind turbines, organic biomass fuels, and micro hydropower projects.",
    subjects: ["Biofuels", "Geothermal Energy", "Solar Cell Physics", "Energy Economics"],
    roles: ["Sustainability Analyst", "Solar Consultant", "Energy Engineer"]
  },
  {
    name: "Sustainability Management",
    weight: 0.0,
    category: "Management",
    demand: "High Demand",
    description: "Corporate carbon footprint audits, ESG investment rules, sustainable material cycles, and green reporting.",
    subjects: ["Carbon Accounting", "ESG Criteria", "Circular Economy", "Corporate Responsibility"],
    roles: ["Sustainability Lead", "ESG Consultant", "Green Policy Analyst"]
  },
  {
    name: "DevOps",
    weight: 0.0,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Automating cloud code pipelines, Docker container packaging, Kubernetes orchestration, and cloud monitoring.",
    subjects: ["Docker & Kubernetes", "CI/CD Pipelines", "Jenkins Automation", "Terraform IaC"],
    roles: ["DevOps Engineer", "Site Reliability Lead", "Cloud Engineer"]
  },
  {
    name: "HealthCare & Hospital",
    weight: 0.0,
    category: "Management",
    demand: "High Demand",
    description: "Managing corporate hospital ward layouts, clinical insurance billings, patient record safety, and medical laws.",
    subjects: ["Hospital Operations", "Health Administration", "Patient Safety Laws", "Healthcare Billing"],
    roles: ["Hospital Administrator", "Operations Head", "Healthcare Consultant"]
  },
  {
    name: "IT & Systems",
    weight: 0.0,
    category: "Management",
    demand: "High Demand",
    description: "Corporate database configurations, hardware network setups, employee software licenses, and IT support teams.",
    subjects: ["Systems Analysis", "ERP Implementation", "Database Administration", "IT Strategy"],
    roles: ["Systems Manager", "IT Director", "IT Support Specialist"]
  },
  {
    name: "Silk Technology",
    weight: 0.0,
    category: "Vocational courses",
    demand: "Moderate Demand",
    description: "Silk reeling machinery, silkworm cocoon harvesting, raw fiber dyeing chemistry, and automated textile loom setups.",
    subjects: ["Cocoon Reeling", "Moriculture Agronomy", "Silk Spinning & Weaving", "Dyeing & Finishing"],
    roles: ["Silk Consultant", "Textile Expert", "Sericulture Supervisor"]
  },
  {
    name: "UI / UX",
    weight: 0.0,
    category: "Design",
    demand: "Critical Demand",
    description: "Drafting user wireframes in Figma, web screen layouts design, color theory systems, and customer interview testing.",
    subjects: ["Figma Wireframes", "User Research", "Interaction Design", "Usability Testing"],
    roles: ["UI/UX Designer", "Product Designer", "Interaction Specialist"]
  },
  {
    name: "Forensic Medical Science",
    weight: 0.0,
    category: "Medical",
    demand: "High Demand",
    description: "Autopsy examinations for legal trials, post-mortem toxicological diagnostics, and expert legal testimonies.",
    subjects: ["Autopsy Procedures", "Medical Jurisprudence", "Post-mortem Pathology", "Toxicology Analysis"],
    roles: ["Medical Examiner", "Forensic Pathologist", "Toxicology Analyst"]
  },
  {
    name: "iOS",
    weight: 0.0,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Developing Apple iPhone apps using Swift, SwiftUI interfaces, offline storage CoreData, and Apple App Store rules.",
    subjects: ["Swift Programming", "SwiftUI Layouts", "Xcode IDE", "CoreData Storage"],
    roles: ["iOS Developer", "Mobile Architect", "Swift Designer"]
  },
  {
    name: "Fintech",
    weight: 0.0,
    category: "Management",
    demand: "Critical Demand",
    description: "Digital banking, blockchain smart contracts, mobile payment security, and cryptocurrency algorithms.",
    subjects: ["Blockchain Ledger", "Digital Banking", "Financial Security", "Cryptocurrencies"],
    roles: ["Fintech Consultant", "Crypto Analyst", "Digital Payments Expert"]
  },
  {
    name: "Agriculture",
    weight: 0.0,
    category: "BSc",
    demand: "High Demand",
    description: "Scientific crop physiology, pest infestations chemical sprays, agricultural soil nutrients, and farming economics.",
    subjects: ["Crop Protection", "Weed Sciences", "Farm Management", "Seed Physiology"],
    roles: ["Agriculture Officer", "Farm Supervisor", "Agronomist Specialist"]
  },
  {
    name: "Electronics",
    weight: 0.0,
    category: "BSc",
    demand: "High Demand",
    description: "Semiconductor hardware physics, microcircuit calculations, analog wave generators, and basic logic gates.",
    subjects: ["Semiconductor Physics", "Network Analysis", "Analog Devices", "Digital Electronics"],
    roles: ["Electronics Instructor", "Lab Assistant", "Hardware Tester"]
  },
  {
    name: "Pulp & Paper Technology",
    weight: 0.0,
    category: "Vocational courses",
    demand: "Moderate Demand",
    description: "Industrial wood pulp chemical treatment, commercial papermaking machinery, bleaching chemistry, and effluent controls.",
    subjects: ["Pulping Sciences", "Paper Making Machinery", "Chemical Recovery", "Effluent Treatment"],
    roles: ["Pulp technologist", "Plant chemist", "Paper Quality Lead"]
  },
  {
    name: "Ethical Hacking",
    weight: 0.0,
    category: "Computing & IT",
    demand: "Critical Demand",
    description: "Legal system penetrations, web server vulnerability reports, Wi-Fi password cracking simulations, and security patches.",
    subjects: ["Penetration Testing", "Metasploit Suite", "Web Application Hacking", "Social Engineering"],
    roles: ["Ethical Hacker", "Security Analyst", "Penetration Tester"]
  },
  {
    name: "MBBS (Bachelor of Medicine & Bachelor of Surgery)",
    weight: 100,
    category: "Medical",
    demand: "Critical Demand",
    description: "The premier 5.5-year modern medical undergraduate program, qualifying clinicians in internal medicine, general surgery, pediatrics, and community healthcare.",
    subjects: ["Human Anatomy", "Physiology & Biochemistry", "Pathology & Microbiology", "Pharmacology & Forensic Medicine", "General Medicine & General Surgery", "Obstetrics & Gynaecology"],
    roles: ["General Practitioner", "Medical Officer", "Clinical Researcher", "Hospital Administrator"]
  },
  {
    name: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "AYUSH traditional Indian medicine combining ancient Vedic science of Ayurveda with modern clinical diagnostics.",
    subjects: ["Kriya Sharir (Physiology)", "Rachana Sharir (Anatomy)", "Dravyaguna Vijnan (Pharmacology)", "Kaya Chikitsa (Internal Medicine)"],
    roles: ["Ayurvedic Doctor", "AYUSH Medical Officer", "Wellness Consultant", "Research Officer"]
  },
  {
    name: "BHMS (Bachelor of Homeopathic Medicine & Surgery)",
    weight: 85,
    category: "Medical",
    demand: "High Demand",
    description: "Homeopathic clinical science targeting holistic healing through constitutional therapy and natural diluted formulations.",
    subjects: ["Homeopathic Pharmacy", "Organon of Medicine", "Homeopathic Materia Medica", "Repertory & Case Taking"],
    roles: ["Homeopathic Physician", "Wellness Consultant", "Clinical Researcher"]
  },
  {
    name: "BUMS (Bachelor of Unani Medicine & Surgery)",
    weight: 80,
    category: "Medical",
    demand: "High Demand",
    description: "Traditional Unani medical system focusing on balance of bodily humors (blood, phlegm, yellow bile, black bile) and herbal remedies.",
    subjects: ["Kulliyat (Principles of Unani)", "Tashreeh-ul-Aza (Anatomy)", "Munafe-ul-Aza (Physiology)", "Ilmul Advia (Pharmacology)"],
    roles: ["Unani Practitioner", "AYUSH Medical Officer", "Herbal Pharmacist"]
  },
  {
    name: "BSMS (Bachelor of Siddha Medicine & Surgery)",
    weight: 80,
    category: "Medical",
    demand: "High Demand",
    description: "Ancient Dravidian system of medicine aiming at balancing the three humors (Vatham, Pitham, Kapham) with mineral and herb formulations.",
    subjects: ["Siddha Maruthuva Adippadaigal", "Udal Koorugal (Anatomy)", "Udal Thathuvam (Physiology)", "Gunapadam (Pharmacology)"],
    roles: ["Siddha Physician", "Research Scientist", "AYUSH Consultant"]
  },
  {
    name: "BNYS (Bachelor of Naturopathy & Yogic Sciences)",
    weight: 80,
    category: "Medical",
    demand: "High Demand",
    description: "Drugless clinical healing system integrating natural element remedies, nutrition, hydrotherapy, acupuncture, and yogic science.",
    subjects: ["Naturopathy Philosophy", "Yoga Therapy & Postures", "Nutrition & Dietetics", "Acupuncture & Hydrotherapy"],
    roles: ["Naturopathic Doctor", "Yoga Therapist", "Wellness Centre Director"]
  },
  {
    name: "MD in General Medicine",
    weight: 95,
    category: "Medical",
    demand: "Critical Demand",
    description: "Advanced 3-year non-surgical postgraduate medical study focused on diagnosing and treating systemic internal organ disorders in adults.",
    subjects: ["Cardiovascular Diseases", "Endocrinology & Metabolism", "Nephrology & Urology", "Infectious Diseases & Pulmonology"],
    roles: ["Consultant Internist", "Physician", "Clinical Professor", "Health Advisor"]
  },
  {
    name: "MD in Paediatrics",
    weight: 92,
    category: "Medical",
    demand: "Critical Demand",
    description: "Postgraduate medical branch specializing in developmental stages, neonatology, child wellness, and pediatric diseases.",
    subjects: ["Neonatology & NICU Care", "Pediatric Infectious Diseases", "Developmental Pediatrics", "Pediatric Critical Care"],
    roles: ["Pediatrician", "Neonatologist", "Child Health Specialist"]
  },
  {
    name: "MD in Radio-Diagnosis (Radiology)",
    weight: 98,
    category: "Medical",
    demand: "Critical Demand",
    description: "High-tech non-surgical specialty focusing on diagnostic and interventional medical imaging (MRI, CT, Ultrasound, PET, X-Ray).",
    subjects: ["Diagnostic Radiography", "Interventional Radiology", "Computed Tomography (CT)", "Magnetic Resonance Imaging (MRI)"],
    roles: ["Consultant Radiologist", "Interventional Radiologist", "Imaging Expert"]
  },
  {
    name: "MD in Psychiatry",
    weight: 90,
    category: "Medical",
    demand: "Critical Demand",
    description: "Postgraduate branch dealing with neuro-chemistry, psychopharmacology, clinical psychotherapy, and behavioral psychopathology.",
    subjects: ["Neuropsychiatry", "Psychopharmacology", "Child & Adolescent Psychiatry", "Behavioral Therapy & Counseling"],
    roles: ["Clinical Psychiatrist", "Neuropsychiatrist", "Mental Health Advisor"]
  },
  {
    name: "MD in Dermatology, Venereology & Leprosy (DVL)",
    weight: 96,
    category: "Medical",
    demand: "Critical Demand",
    description: "Advanced clinical specialization covering skin health, dermato-surgery, cosmetological lasers, and systemic venereology.",
    subjects: ["Clinical Dermatology", "Dermato-surgery & Lasers", "Venereology & STIs", "Leprosy Management"],
    roles: ["Dermatologist", "Cosmetologist", "Dermato-surgeon"]
  },
  {
    name: "MD in Anaesthesiology",
    weight: 92,
    category: "Medical",
    demand: "Critical Demand",
    description: "Focuses on peri-operative anesthesia administration, pain medicine, surgical patient monitoring, and critical care.",
    subjects: ["General & Regional Anesthesia", "Critical Care Medicine", "Pain Management", "Emergency Medicine"],
    roles: ["Consultant Anaesthesiologist", "Critical Care Specialist", "Pain Therapist"]
  },
  {
    name: "MS in General Surgery",
    weight: 95,
    category: "Medical",
    demand: "Critical Demand",
    description: "3-year postgraduate surgical residency specializing in abdominal organs, thyroid, breast, endocrine systems, and trauma surgery.",
    subjects: ["Abdominal Surgery", "Trauma & Emergency Surgery", "Oncosurgery Basics", "Endocrine & Vascular Surgery"],
    roles: ["General Surgeon", "Trauma Consultant", "Surgical Specialist"]
  },
  {
    name: "MS in Orthopaedics",
    weight: 94,
    category: "Medical",
    demand: "Critical Demand",
    description: "Surgical branch focusing on the musculoskeletal framework, joint arthroplasty, spinal surgery, bone fractures, and sports trauma.",
    subjects: ["Fracture Management", "Arthroplasty (Joint Replacement)", "Spine Surgery", "Sports Medicine & Arthroscopy"],
    roles: ["Orthopaedic Surgeon", "Joint Replacement Expert", "Spine Specialist"]
  },
  {
    name: "MS in Ophthalmology",
    weight: 92,
    category: "Medical",
    demand: "Critical Demand",
    description: "Advanced ophthalmic micro-surgery covering cataract extractions, corneal grafts, laser refractive corrections, and retinal repairs.",
    subjects: ["Refractive Eye Surgery", "Cataract & Glaucoma Surgery", "Retina & Vitreous Diseases", "Cornea & Ocular Surface"],
    roles: ["Ophthalmologist", "Eye Surgeon", "Retinal Specialist"]
  },
  {
    name: "MS in ENT (Otorhinolaryngology)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Surgical specialty focused on hearing restoration, sinus micro-surgeries, vocal cord therapies, and head & neck cancers.",
    subjects: ["Otology & Audiology", "Rhinology & Sinus Surgery", "Laryngology & Voice Disorders", "Head & Neck Surgery"],
    roles: ["ENT Surgeon", "Otorhinolaryngologist", "Head & Neck Consultant"]
  },
  {
    name: "MS in Obstetrics & Gynaecology",
    weight: 96,
    category: "Medical",
    demand: "Critical Demand",
    description: "Advanced surgical curriculum centering on maternal-fetal medicine, prenatal labor care, and complex gynecological surgeries.",
    subjects: ["Obstetric Medicine & Care", "Gynecological Oncology", "Infertility & IVF", "Fetal Medicine"],
    roles: ["Obstetrician", "Gynecologist", "IVF Specialist"]
  },
  {
    name: "BDS (Bachelor of Dental Surgery)",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Undergraduate dental framework specializing in tooth restorations, orthodontic alignments, periodontal treatments, and oral surgeries.",
    subjects: ["Oral Anatomy & Histology", "Dental Materials", "Oral Pathology", "Oral & Maxillofacial Surgery", "Prosthodontics", "Orthodontics"],
    roles: ["Dental Surgeon", "Dentist", "Oral Health Consultant"]
  },
  {
    name: "MDS in Oral & Maxillofacial Surgery",
    weight: 95,
    category: "Dental",
    demand: "Critical Demand",
    description: "Surgical dental postgraduate path targeting complex facial reconstructions, jaw fractures, and maxillofacial tumors.",
    subjects: ["Maxillofacial Trauma", "Orthognathic Jaw Surgery", "Dentoalveolar Surgery", "Oral Oncology"],
    roles: ["Oral & Maxillofacial Surgeon", "Facial Trauma Consultant"]
  },
  {
    name: "MDS in Orthodontics & Dentofacial Orthopaedics",
    weight: 94,
    category: "Dental",
    demand: "Critical Demand",
    description: "Advanced dentistry focusing on corrective braces, clear aligners, dental malocclusions, and facial skeletal modifications.",
    subjects: ["Biomechanics of Braces", "Skeletal Growth Modification", "Clear Aligners", "Cleft Lip & Palate Care"],
    roles: ["Orthodontist", "Dental Aligners Expert", "Clinical Orthodontic Lead"]
  },
  {
    name: "MDS in Prosthodontics & Crown/Bridge",
    weight: 92,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized restoration of missing dental arches using implants, complete dentures, cosmetic veneers, and full-mouth crowns.",
    subjects: ["Dental Implants", "Complete & Partial Dentures", "Aesthetic Veneers", "Full Mouth Reconstruction"],
    roles: ["Prosthodontist", "Dental Implants Consultant", "Cosmetic Dentist"]
  },
  {
    name: "MDS in Conservative Dentistry & Endodontics",
    weight: 93,
    category: "Dental",
    demand: "Critical Demand",
    description: "Deals with root canal treatment, micro-endodontics, conservative tooth structures preservation, and smile designing.",
    subjects: ["Root Canal Therapy (RCT)", "Esthetic Restorations", "Micro-Endodontics", "Dental Laser Applications"],
    roles: ["Endodontist", "Cosmetic Restorative Expert", "Root Canal Specialist"]
  },
  {
    name: "BVSc & AH (Bachelor of Veterinary Science & Animal Husbandry)",
    weight: 90,
    category: "Veterinary",
    demand: "High Demand",
    description: "Veterinary clinical program managing farm animal pathology, pet surgical interventions, dairy herd wellness, and wild animal conservation.",
    subjects: ["Veterinary Anatomy", "Veterinary Pharmacology", "Livestock Production Management", "Animal Gynecology & Obstetrics"],
    roles: ["Veterinary Doctor", "Livestock Inspector", "Veterinary Surgeon", "Animal Welfare Officer"]
  },
  {
    name: "B.Pharm (Bachelor of Pharmacy)",
    weight: 91,
    category: "Pharmacy",
    demand: "High Demand",
    description: "Core industrial pharmaceutical degree exploring drug discovery, chemical synthesis, vaccine formulations, and regulatory laws.",
    subjects: ["Pharmaceutics", "Medicinal Chemistry", "Pharmacology", "Pharmacognosy (Herbal drugs)", "Pharmaceutical Jurisprudence"],
    roles: ["Pharmacist", "Drug Inspector", "Pharma Production Manager", "Quality Assurance Analyst"]
  },
  {
    name: "Pharm.D (Doctor of Pharmacy)",
    weight: 94,
    category: "Pharmacy",
    demand: "Critical Demand",
    description: "6-year clinical doctorate focusing on hospital ward reviews, pharmacology audits, drug-drug interactions, and clinical dosage guidance.",
    subjects: ["Clinical Pharmacy", "Pharmacotherapeutics", "Toxicology & Forensic Pharmacy", "Pharmaco-epidemiology"],
    roles: ["Clinical Pharmacist", "Medical Writer", "Pharma-co-vigilance Specialist", "Clinical Research Director"]
  },
  {
    name: "B.Sc Nursing",
    weight: 92,
    category: "Paramedical",
    demand: "Critical Demand",
    description: "Clinical nursing curriculum equipping specialists with critical care protocols, pediatric nursing, and surgical ward monitoring.",
    subjects: ["Medical-Surgical Nursing", "Community Health Nursing", "Obstetric Nursing", "Pediatric Nursing"],
    roles: ["Registered Nurse", "ICU Charge Nurse", "Nursing Educator", "Clinical Coordinator"]
  },
  {
    name: "BPT (Bachelor of Physiotherapy)",
    weight: 88,
    category: "Paramedical",
    demand: "High Demand",
    description: "Allied health framework exploring human biomechanics, neuromuscular exercise therapies, and sports orthopedics rehabilitation.",
    subjects: ["Kinesiology & Biomechanics", "Exercise Therapy", "Orthopedic Physiotherapy", "Sports Rehabilitation"],
    roles: ["Physiotherapist", "Sports Therapist", "Rehabilitation Specialist"]
  },
  {
    name: "BOT (Bachelor of Occupational Therapy)",
    weight: 82,
    category: "Paramedical",
    demand: "High Demand",
    description: "Therapeutic system aiding pediatric developmental delays, geriatric neuromuscular limitations, and sensory integration therapies.",
    subjects: ["Occupational Therapy in Pediatrics", "Neuro-rehabilitation", "Psychosocial Rehabilitation", "Orthotics & Assistive Tech"],
    roles: ["Occupational Therapist", "Child Rehabilitation Consultant", "Ergonomist"]
  },
  {
    name: "BASLP (Bachelor of Audiology & Speech-Language Pathology)",
    weight: 85,
    category: "Paramedical",
    demand: "High Demand",
    description: "Specializes in diagnosing hearing impairments, auditory processing issues, childhood stuttering, and prescribing customized hearing aids.",
    subjects: ["Audiological Diagnostics", "Speech-Language Diagnostics", "Aural Rehabilitation", "Neurological Speech Disorders"],
    roles: ["Speech Therapist", "Audiologist", "Clinical Speech Advisor"]
  },
  {
    name: "B.Sc Radiology & Imaging Technology",
    weight: 88,
    category: "Paramedical",
    demand: "High Demand",
    description: "Allied medical technology for operating advanced clinical scanners (CT scans, MRI systems, and X-ray devices) and ensuring radiation safety.",
    subjects: ["Radiological Physics", "CT & MRI Imaging Procedures", "Radiation Protection", "Anatomy for Imaging"],
    roles: ["Radiology Technologist", "CT Scan Operator", "MRI Specialist"]
  },
  {
    name: "B.Sc Operation Theatre Technology",
    weight: 84,
    category: "Paramedical",
    demand: "High Demand",
    description: "Equips specialized technicians in surgical anesthesia machine operations, sterile tray setups, and emergency ICU logistics.",
    subjects: ["Surgical Microbiology", "Anaesthesia Equipment", "Operation Theatre Ethics", "Surgical Instrumentation"],
    roles: ["OT Technician", "Surgical Assistant", "Sterilization Officer"]
  },
  {
    name: "B.Sc Cardiovascular Perfusion Technology",
    weight: 86,
    category: "Paramedical",
    demand: "High Demand",
    description: "Highly specialized Allied Health program training experts to manage cardiopulmonary bypass machines during complex open-heart surgeries.",
    subjects: ["Cardiopulmonary Bypass", "Perfusion Equipment & Technology", "Cardiovascular Anatomy", "Myocardial Protection"],
    roles: ["Cardiovascular Perfusionist", "Cardiac Clinical Associate"]
  },
  {
    name: "B.Sc Renal Dialysis Technology",
    weight: 85,
    category: "Paramedical",
    demand: "High Demand",
    description: "Technical training in hemodialysis and peritoneal filtration systems, managing renal failure patients' clinical safety.",
    subjects: ["Renal Anatomy & Physiology", "Dialysis Equipment Operation", "Renal Pathology", "Vascular Access & Safety"],
    roles: ["Dialysis Technologist", "Renal Care Specialist"]
  },
  {
    name: "DM in Cardiology",
    weight: 99,
    category: "Medical",
    demand: "Critical Demand",
    description: "The apex non-surgical cardiovascular super-specialty, qualifying specialists in coronary angiographies, angioplasties, and smart implants.",
    subjects: ["Interventional Cardiology", "Electro-physiology", "Congenital Heart Diseases", "Cardiac Pharmacology"],
    roles: ["Consultant Cardiologist", "Interventional Cardiologist", "Director of Cath Lab"]
  },
  {
    name: "DM in Neurology",
    weight: 98,
    category: "Medical",
    demand: "Critical Demand",
    description: "Highest tier clinical study analyzing stroke networks, neuropathic damage, neurophysiology, and cognitive brain science.",
    subjects: ["Neurophysiology", "Stroke Management", "Neuromuscular Disorders", "Cognitive Neurology"],
    roles: ["Consultant Neurologist", "Stroke Specialist", "Clinical Neuroscientist"]
  },
  {
    name: "MCh in Neurosurgery",
    weight: 99,
    category: "Medical",
    demand: "Critical Demand",
    description: "Premier surgical super-specialty centered on micro-surgical brain tumor removals, spinal canal micro-decompression, and trauma care.",
    subjects: ["Brain Tumor Micro-surgery", "Spinal Cord & Column Surgery", "Stereotactic Neurosurgery", "Pediatric Neurosurgery"],
    roles: ["Consultant Neurosurgeon", "Spine Surgeon", "Brain Tumor Specialist"]
  },
  {
    name: "MCh in Cardiothoracic Surgery (CVTS)",
    weight: 98,
    category: "Medical",
    demand: "Critical Demand",
    description: "Advanced surgical super-specialty focused on coronary bypass grafts, mechanical valve replacements, and congenital heart repairs.",
    subjects: ["Coronary Artery Bypass", "Heart Valve Surgery", "Aortic Aneurysm Repairs", "Thoracic Surgical Oncology"],
    roles: ["Cardiothoracic Surgeon", "Heart Surgeon", "Thoracic Oncosurgeon"]
  },
  {
    name: "PhD in Medical Sciences",
    weight: 90,
    category: "Medical",
    demand: "Critical Demand",
    description: "Top-tier doctoral research analyzing molecular oncology, metabolic paths, clinical trials design, and vaccine discoveries.",
    subjects: ["Research Methodology", "Biostatistics", "Molecular Biology Techniques", "Clinical Trials Management"],
    roles: ["Principal Investigator", "Research Scientist", "Biotech Lab Director", "Professor"]
  },
  {
    name: "MPH (Master of Public Health)",
    weight: 88,
    category: "Medical",
    demand: "High Demand",
    description: "Fuses clinical data with global health policies, sanitation controls, disease tracking networks, and vaccination drives.",
    subjects: ["Epidemiology Principles", "Health Economics & Policy", "Global Health Systems", "Environmental Health"],
    roles: ["Public Health Analyst", "Epidemiologist", "Healthcare Policy Consultant", "NGO Program Director"]
  },
  // NEW DEGREES FROM BACHELOR'S COMPLETE GUIDE PDF
  {
    name: "B.Sc Cardiac Care Technology",
    weight: 87,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Allied health program preparing clinical technologists to assist in invasive cardiac procedures and monitor hemodynamics in cath labs.",
    subjects: ["Cardiac Anatomy & Physiology", "Invasive Cardiology Basics", "ECG and Echocardiography", "Cardiac Pharmacology"],
    roles: ["Cardiac Technologist", "ECG Analyst", "Cath Lab Assistant"]
  },
  {
    name: "B.Sc Anaesthesia Technology",
    weight: 86,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Specialized training in monitoring patients under anaesthesia, managing surgical equipment, and preparing sterile operating suites.",
    subjects: ["Anaesthetic Agents", "Patient Monitoring Systems", "Operation Theatre Safety", "Cardiopulmonary Resuscitation"],
    roles: ["Anaesthesia Assistant", "OT Coordinator", "Critical Care Assistant"]
  },
  {
    name: "B.Sc Neuroscience Technology",
    weight: 89,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Equips technologists in conducting neuro-diagnostic tests such as EEG, EMG, and nerve conduction velocity studies.",
    subjects: ["Neuroanatomy & Neuropathology", "Electroencephalography (EEG)", "Nerve Conduction Studies", "Sleep Lab Technology"],
    roles: ["Neurotechnologist", "EEG Specialist", "Sleep Lab Analyst"]
  },
  {
    name: "B.Sc Respiratory Therapy",
    weight: 85,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Focuses on cardiorespiratory disease management, airway care, mechanical ventilation setup, and pulmonary rehabilitation.",
    subjects: ["Respiratory Care Science", "Mechanical Ventilation", "Pulmonary Function Testing", "Cardiopulmonary Pharmacology"],
    roles: ["Respiratory Therapist", "Pulmonary Rehabilitation Specialist", "Critical Care Therapist"]
  },
  {
    name: "B.Sc Nuclear Medicine Technology",
    weight: 88,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Fuses diagnostic radiology with radio-pharmaceuticals to capture metabolic molecular imaging inside patients.",
    subjects: ["Radiation Physics", "Radiopharmacy", "PET-CT and SPECT Imaging", "Radiation Dosimetry & Safety"],
    roles: ["Nuclear Medicine Technologist", "Radiation Safety Officer", "PET Scan Operator"]
  },
  {
    name: "B.Sc Radiotherapy Technology",
    weight: 87,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Focuses on administering precise high-energy radiation treatments to oncology patients using linear accelerators.",
    subjects: ["Oncology & Tumor Pathology", "Radiation Physics & Safety", "Radiotherapy Planning", "Linear Accelerator Operation"],
    roles: ["Radiation Therapist", "Medical Dosimetrist", "Oncology Care Specialist"]
  },
  {
    name: "B.Sc Emergency Medical Technology",
    weight: 89,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "Critical Demand",
    description: "Prepares advanced pre-hospital clinicians for trauma life support, disaster response, and immediate ambulance clinical care.",
    subjects: ["Trauma Care & Life Support", "Disaster Management Protocols", "Emergency Pharmacology", "Cardiac & Respiratory Emergencies"],
    roles: ["Emergency Medical Technician", "Ambulance Officer", "Triage Care Coordinator"]
  },
  {
    name: "BPO (Bachelor of Prosthetics & Orthotics)",
    weight: 84,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Designing and fitting customized artificial limbs and supportive braces to rehabilitate physically challenged individuals.",
    subjects: ["Biomechanics & Kinesiology", "Prosthetic Design & Fabrication", "Orthotic Materials & Mechanics", "Amputation Rehabilitation"],
    roles: ["Prosthetist", "Orthotist", "Rehabilitation Engineer"]
  },
  {
    name: "B.Optom (Bachelor of Optometry)",
    weight: 88,
    category: "Allied Health / Paramedical UG Degrees",
    demand: "High Demand",
    description: "Clinical vision science program for correcting refractive errors, prescribing spectacles/contact lenses, and identifying ocular pathologies.",
    subjects: ["Ocular Anatomy & Optics", "Refraction & Visual Diagnosis", "Contact Lens Practice", "Binocular Vision & Orthoptics"],
    roles: ["Optometrist", "Refraction Specialist", "Vision Consultant"]
  },
  {
    name: "B.Tech Computer Science & Engineering",
    weight: 100,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "The primary 4-year engineering program covering hardware-software interfaces, compiler designs, databases, and massive scalable networks.",
    subjects: ["Computer Networks", "Database Management", "Compiler Design", "Software Engineering"],
    roles: ["Software Engineer", "Systems Architect", "Network Engineer"]
  },
  {
    name: "B.Tech Information Technology",
    weight: 95,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Focuses on modern enterprise web applications, cloud networks, database security, and system administration services.",
    subjects: ["Web Technology", "Cloud Computing Infrastructure", "Network Security", "Database Systems"],
    roles: ["IT Analyst", "DevOps Engineer", "Database Administrator"]
  },
  {
    name: "B.Tech Electronics & Communication Engineering",
    weight: 92,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Fuses circuit designing with telecommunications, fiber optics, embedded controllers, and integrated semiconductor structures.",
    subjects: ["Analog & Digital Circuits", "Embedded Systems", "Optical Communication", "Microprocessors"],
    roles: ["Telecom Engineer", "Hardware Design Engineer", "VLSI Engineer"]
  },
  {
    name: "B.Tech Electrical & Electronics Engineering",
    weight: 90,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Combines high-voltage electrical power grids with micro-electronic signal processing and power transmission systems.",
    subjects: ["Power Systems & Transmission", "Electrical Machinery", "Power Electronics", "Control Instrumentation"],
    roles: ["Electrical Engineer", "Grid Systems Engineer", "Power Electronics Expert"]
  },
  {
    name: "B.Tech AI/ML",
    weight: 99,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Advanced engineering study focusing on computational neural networks, deep learning logic, and natural language model algorithms.",
    subjects: ["Deep Learning Models", "Statistical Computing", "Natural Language Processing", "Computer Vision"],
    roles: ["ML Engineer", "Data Scientist", "AI Researcher"]
  },
  {
    name: "B.Tech Data Science & Engineering",
    weight: 97,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Fuses database warehousing, predictive modeling, statistical architectures, and big data pipeline engineering.",
    subjects: ["Big Data Analytics", "Data Warehousing & Mining", "Statistical Inference", "Machine Learning Techniques"],
    roles: ["Data Engineer", "Data Analyst", "Analytics Specialist"]
  },
  {
    name: "B.Tech Cyber Security",
    weight: 98,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Equips students in defending computer systems, critical networks, and sensitive digital infrastructure from web vulnerability exploits.",
    subjects: ["Network Penetration Testing", "Cryptography & Protocols", "Cyber Forensics & Laws", "Ethical Hacking Methodologies"],
    roles: ["Cyber Security Analyst", "Security Consultant", "Incident Responder"]
  },
  {
    name: "B.Tech Robotics & Automation",
    weight: 96,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Fuses mechanical kinetics, sensory interfaces, pneumatic controls, and micro-controller intelligence to build industrial automations.",
    subjects: ["Robotic Kinematics & Dynamics", "Sensors & Actuators", "Industrial Automation Systems", "Microcontrollers & PLC Programming"],
    roles: ["Robotics Engineer", "Automation Developer", "Control Systems Lead"]
  },
  {
    name: "B.Tech Aerospace Engineering",
    weight: 95,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Covers aeronautics, flight physics, jet propulsion mechanisms, structure analysis, and space telemetry systems.",
    subjects: ["Aerodynamics & Flight Mechanics", "Rocket Propulsion Systems", "Aircraft Structures", "Space Mission Design"],
    roles: ["Aerospace Engineer", "Flight Data Analyst", "Propulsion Systems Designer"]
  },
  {
    name: "B.Tech Automobile Engineering",
    weight: 91,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Specialized vehicle kinematics, internal combustion engines, electronic chassis setups, and modern EV battery designs.",
    subjects: ["IC Engines & Combustion", "Vehicle Dynamics & Chassis", "Auto Transmission Systems", "Electric & Hybrid Vehicle Tech"],
    roles: ["Automotive Engineer", "Vehicle Safety Lead", "EV Systems Designer"]
  },
  {
    name: "B.Tech Marine Engineering",
    weight: 92,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Studies heavy cargo ship propulsion, diesel generators, steering hydraulics, and ship-board electrical navigation frameworks.",
    subjects: ["Ship Auxiliary Machinery", "Marine Diesel Engines", "Naval Architecture basics", "Marine Electrical Systems"],
    roles: ["Marine Engineer", "Ship Surveyor", "Port Technical Officer"]
  },
  {
    name: "B.Tech Metallurgical Engineering",
    weight: 88,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Physical metallurgy, metal ore extractions, heat treatments, crystal structures, and industrial alloy engineering.",
    subjects: ["Extractive Metallurgy", "Physical Metallurgy", "Mechanical Behavior of Metals", "Heat Treatment of Alloys"],
    roles: ["Metallurgist", "Material Quality Analyst", "Foundry Engineer"]
  },
  {
    name: "B.Tech Environmental Engineering",
    weight: 90,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Focuses on municipal wastewater filtration, environmental impact reports, atmospheric pollutant controls, and solid waste recycles.",
    subjects: ["Water & Wastewater Treatment", "Air Pollution Control", "Solid Waste Management", "Environmental Impact Assessment"],
    roles: ["Environmental Engineer", "Sustainability Consultant", "EIA Officer"]
  },
  {
    name: "B.Tech IoT (Internet of Things)",
    weight: 94,
    category: "Engineering & Technology",
    demand: "High Demand",
    description: "Integrates localized sensor grids with cloud systems, embedded communication hardware, and smart mesh networks.",
    subjects: ["Sensors & Wireless Networks", "Embedded C & Microcontrollers", "IoT Architectures", "Edge Computing & Node RED"],
    roles: ["IoT Developer", "Smart Systems Integrator", "Embedded Analyst"]
  },
  {
    name: "B.Tech Cloud Computing",
    weight: 96,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Focused on massive scalable cloud architectures, serverless micro-services, virtualization hypervisors, and container orchestration.",
    subjects: ["Virtualization & Hypervisors", "Kubernetes & Docker", "AWS & Azure Infrastructure", "Cloud Security & Devops"],
    roles: ["Cloud Consultant", "DevOps Specialist", "Infrastructure Engineer"]
  },
  {
    name: "B.Tech VLSI Design & Technology",
    weight: 95,
    category: "Engineering & Technology",
    demand: "Critical Demand",
    description: "Semiconductor chip design, Verilog/VHDL hardware synthesis, physical layout structures, and CMOS microchip physics.",
    subjects: ["CMOS Analog Circuit Design", "Digital VLSI Design", "Verilog HDL Programming", "ASIC & FPGA Architectures"],
    roles: ["VLSI Design Engineer", "ASIC Architect", "Physical Verification Engineer"]
  },
  {
    name: "B.Plan (Bachelor of Planning)",
    weight: 88,
    category: "Architecture",
    demand: "High Demand",
    description: "Undergraduate course specializing in master-planning of smart cities, urban GIS mapping, and transport network drainage systems.",
    subjects: ["Urban Planning Principles", "GIS & Remote Sensing", "Transportation Planning", "Housing & Land Development"],
    roles: ["Urban Planner", "Town Planning Officer", "GIS Consultant"]
  },
  {
    name: "BCA (Bachelor of Computer Applications)",
    weight: 90,
    category: "Computer Science & IT",
    demand: "High Demand",
    description: "Three-year computer applications program covering web development, database management systems, and programming in Java/Python.",
    subjects: ["Software Engineering", "Database Management", "Web Application Development", "Object Oriented Programming"],
    roles: ["Web Developer", "System Analyst", "IT Executive"]
  },
  {
    name: "B.Sc Computer Science",
    weight: 89,
    category: "Computer Science & IT",
    demand: "High Demand",
    description: "Theoretical computing frameworks, complexity theories, programming structures, and mathematical statistics.",
    subjects: ["Discrete Mathematics", "Data Structures", "Operating System Concepts", "Software Architecture"],
    roles: ["Computer Science Instructor", "Research Associate", "Software Developer"]
  },
  {
    name: "B.Sc Information Technology",
    weight: 88,
    category: "Computer Science & IT",
    demand: "High Demand",
    description: "Fuses database installations with localized server management, network configurations, and basic business programming.",
    subjects: ["Internet Technologies", "Database Administration", "Network Infrastructure", "System Security Basics"],
    roles: ["IT Support Specialist", "Network Administrator", "Database Executive"]
  },
  {
    name: "B.Sc Data Science",
    weight: 93,
    category: "Computer Science & IT",
    demand: "High Demand",
    description: "Fuses predictive mathematics, statistical software models (R/Python), and data dashboards visualization structures.",
    subjects: ["Statistical Methods", "Python for Data Analysis", "Data Visualization", "Predictive Analytics"],
    roles: ["Data Analyst", "Business Intelligence Specialist", "Data Modeler"]
  },
  {
    name: "B.Sc Cyber Security",
    weight: 92,
    category: "Computer Science & IT",
    demand: "High Demand",
    description: "Theoretical and clinical instruction in basic security patches, threat monitoring, cryptographic keys, and user awareness.",
    subjects: ["Fundamentals of Cryptography", "Information Security Management", "Ethical Hacking Basics", "Digital Forensics"],
    roles: ["Security Analyst", "Technical Support Specialist", "Information Security Auditor"]
  },
  {
    name: "B.Sc Physics",
    weight: 85,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Rigorous research study covering classical mechanics, electromagnetic equations, thermodynamics, and quantum physical logic.",
    subjects: ["Mathematical Physics", "Classical Mechanics & Relativity", "Electromagnetic Theory", "Quantum Mechanics"],
    roles: ["Research Physicist", "Lab Tutor", "Scientific Assistant"]
  },
  {
    name: "B.Sc Chemistry",
    weight: 85,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Organic syntheses, molecular reaction rates, inorganic crystal structures, and analytical spectroscopy calculations.",
    subjects: ["Organic Synthesis", "Physical Chemistry & Kinetics", "Inorganic & Co-ordination Chemistry", "Analytical Spectroscopy"],
    roles: ["Chemical Analyst", "Lab Chemist", "Pharma QA Associate"]
  },
  {
    name: "B.Sc Mathematics",
    weight: 87,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Explores linear algebra, calculus proofs, abstract group structures, and computational numerical models.",
    subjects: ["Real Analysis", "Abstract Algebra", "Differential Equations", "Numerical Analysis"],
    roles: ["Actuarial Analyst", "Data Modeler", "Mathematics Teacher"]
  },
  {
    name: "B.Sc Statistics",
    weight: 91,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Deals with probability distributions, clinical sampling surveys, demographic indices, and predictive regressions.",
    subjects: ["Probability Theory", "Sampling Methodologies", "Regression Analysis", "Design of Experiments"],
    roles: ["Statistical Officer", "Data Consultant", "Biostatistician Specialist"]
  },
  {
    name: "B.Sc Microbiology",
    weight: 88,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Studies microscopic viral agents, bacterial cell walls, microbial gene mapping, and industrial fermentation setups.",
    subjects: ["Bacteriology & Virology", "Microbial Genetics", "Industrial Fermentations", "Immunology basics"],
    roles: ["Microbiologist", "Food Safety Officer", "Research Assistant"]
  },
  {
    name: "B.Sc Biotechnology",
    weight: 89,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Focuses on genetic modification pathways, tissue culture diagnostics, bio-informatics sequencing, and vaccine R&D.",
    subjects: ["Recombinant DNA Technology", "Plant & Animal Tissue Culture", "Bioprocess Principles", "Genomics & Proteomics"],
    roles: ["Biotech Research Associate", "Quality Inspector", "Bioprocess Technician"]
  },
  {
    name: "B.Sc Biochemistry",
    weight: 87,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Chemical processes inside living organisms, macromolecular structures, enzyme kinetics, and clinical bio-analysis.",
    subjects: ["Biomolecules Structure", "Enzymology & Metabolism", "Clinical Biochemistry", "Molecular Cell Biology"],
    roles: ["Biochemist", "Clinical Lab Analyst", "Research Technician"]
  },
  {
    name: "B.Sc Forensic Science",
    weight: 90,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Fuses legal scene investigations with DNA profiling, fingerprint processing, chemical toxicology, and ballistics data.",
    subjects: ["Forensic Toxicology", "Fingerprint & Ballistic Analysis", "DNA Fingerprinting", "Criminal Investigation Procedures"],
    roles: ["Forensic Specialist", "Crime Scene Investigator", "Toxicology Analyst"]
  },
  {
    name: "B.Sc Nutrition & Dietetics",
    weight: 86,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Nutritional metabolism, therapeutic meal plans, commercial food safety, and clinical patient counseling.",
    subjects: ["Human Nutrition", "Therapeutic Dietetics", "Food Science & Chemistry", "Dietetic Counselling"],
    roles: ["Clinical Dietitian", "Nutritionist", "Food Quality Consultant"]
  },
  {
    name: "B.Sc Dairy Science & Technology",
    weight: 84,
    category: "Pure Sciences",
    demand: "High Demand",
    description: "Industrial milk processing machinery, hygiene standards, dairy fermentation bacteria, and product quality controls.",
    subjects: ["Dairy Chemistry", "Dairy Engineering & Machinery", "Milk Processing Technology", "Quality Assurance in Dairy"],
    roles: ["Dairy Plant Manager", "Quality Executive", "Dairy Technologist"]
  },
  {
    name: "B.Sc Forestry",
    weight: 85,
    category: "Agriculture & Allied Sciences",
    demand: "High Demand",
    description: "Studies wilderness silviculture, forest canopy botany, wood product logging operations, and wildlife ecosystem protection.",
    subjects: ["Silviculture & Agroforestry", "Forest Management", "Wood Science & Logging", "Wildlife Ecology & Conservation"],
    roles: ["Forest Range Officer", "Agroforestry Expert", "Conservation Scientist"]
  },
  {
    name: "B.Sc Fisheries",
    weight: 84,
    category: "Agriculture & Allied Sciences",
    demand: "High Demand",
    description: "Focuses on commercial fish farm pond layouts, marine biology, aquatic parasite therapies, and cold-storage operations.",
    subjects: ["Aquaculture Principles", "Fish Diseases & Pathology", "Fishery Resource Management", "Fish Processing Technology"],
    roles: ["Fishery Development Officer", "Aquaculture Consultant", "Processing Executive"]
  },
  {
    name: "B.Com (Bachelor of Commerce)",
    weight: 90,
    category: "Commerce & Management",
    demand: "High Demand",
    description: "General undergraduate commerce study covering book-keeping records, corporate auditing laws, and business economic policies.",
    subjects: ["Financial Accounting", "Corporate Law & Auditing", "Business Economics", "Direct & Indirect Taxes"],
    roles: ["Accountant", "Accounts Executive", "Finance Executive"]
  },
  {
    name: "B.Com (Honours)",
    weight: 92,
    category: "Commerce & Management",
    demand: "High Demand",
    description: "Advanced accounting formulas, econometric models, corporate taxation regulations, and portfolio tracking.",
    subjects: ["Advanced Corporate Accounting", "Financial Management", "Econometrics Basics", "Corporate Taxation"],
    roles: ["Financial Analyst", "Tax Advisor", "Auditing Consultant"]
  },
  {
    name: "BBA (Bachelor of Business Administration)",
    weight: 91,
    category: "Commerce & Management",
    demand: "High Demand",
    description: "A business program focusing on corporate HR, product marketing, supply chains, and managerial ethics.",
    subjects: ["Principles of Management", "Marketing Management", "Human Resource Management", "Organizational Behavior"],
    roles: ["Management Trainee", "HR Coordinator", "Marketing Executive"]
  },
  {
    name: "B.Com Banking & Finance",
    weight: 89,
    category: "Commerce & Management",
    demand: "High Demand",
    description: "Banking operations, commercial credit underwriting, insurance risks mathematical calculations, and retail ledger systems.",
    subjects: ["Banking Operations", "Risk Management & Insurance", "Commercial Credit Analysis", "Financial Markets & Services"],
    roles: ["Banking Officer", "Credit Analyst", "Financial Planner"]
  },
  {
    name: "B.Com Taxation",
    weight: 88,
    category: "Commerce & Management",
    demand: "High Demand",
    description: "Covers corporate GST rules, individual income tax filings, direct tax codes, and audit procedures.",
    subjects: ["Income Tax Law & Practice", "Goods & Services Tax (GST)", "Direct Tax Codes", "Tax Planning & Auditing"],
    roles: ["Tax Consultant", "Audit Assistant", "Tax Analyst"]
  },
  {
    name: "BA (Bachelor of Arts)",
    weight: 80,
    category: "Arts & Humanities",
    demand: "High Demand",
    description: "Explores core liberal arts, sociology structures, human geographies, and classical world history.",
    subjects: ["Sociology Foundations", "World History Basics", "Human Geography", "Intro to Public Policy"],
    roles: ["Civil Services Aspirant", "Content Writer", "Social Worker"]
  },
  {
    name: "BA (H) Political Science",
    weight: 83,
    category: "Arts & Humanities",
    demand: "High Demand",
    description: "Studies constitutional articles, comparative global politics, and public policy formulation pathways.",
    subjects: ["Political Theory", "Indian Constitution", "Comparative Politics", "International Relations"],
    roles: ["Policy Researcher", "Political Analyst", "Administrative Consultant"]
  },
  {
    name: "BA (H) Economics",
    weight: 92,
    category: "Arts & Humanities",
    demand: "Critical Demand",
    description: "Micro-economic trade models, macro-economic financial policies, mathematical statistics, and statistical econometric models.",
    subjects: ["Microeconomic Theory", "Macroeconomic Analysis", "Mathematical Economics", "Econometric Methods"],
    roles: ["Economist Analyst", "Research Associate", "Data Analyst"]
  },
  {
    name: "BA (H) Psychology",
    weight: 88,
    category: "Arts & Humanities",
    demand: "High Demand",
    description: "Clinical patient diagnoses, cognitive brain maps, human developmental counseling, and therapy methodologies.",
    subjects: ["Cognitive Psychology", "Abnormal Psychopathology", "Developmental Psychology", "Research Methods & Statistics"],
    roles: ["Counselor", "Clinical Associate", "HR Specialist"]
  },
  {
    name: "BA Liberal Arts",
    weight: 85,
    category: "Arts & Humanities",
    demand: "High Demand",
    description: "Interdisciplinary study combining philosophy, literature, sociology, and political sciences to train versatile critical thinkers.",
    subjects: ["Critical Thinking", "World Literature", "Sociological Perspectives", "Cultural Studies"],
    roles: ["Corporate Communications Specialist", "Public Relations Executive", "Creative Consultant"]
  },
  {
    name: "LLB (Bachelor of Legislative Law)",
    weight: 92,
    category: "Law",
    demand: "High Demand",
    description: "Three-year standard post-graduate legal degree covering civil lawsuits, criminal procedures, corporate laws, and courtroom trial briefs.",
    subjects: ["Constitutional Law of India", "Law of Torts & Contracts", "Criminal Procedure Code", "Civil Procedure Code"],
    roles: ["Advocate", "Legal Advisor", "Judicial Service Officer"]
  },
  {
    name: "BA LLB (Arts + Law Integrated)",
    weight: 95,
    category: "Law",
    demand: "Critical Demand",
    description: "Five-year integrated program combining liberal arts (history, political science) with rigorous courtroom litigation procedures.",
    subjects: ["Political Sociology", "International Law", "Jurisprudence & Legal Theory", "Law of Evidence"],
    roles: ["Corporate Lawyer", "Litigation Attorney", "Legal Consultant"]
  },
  {
    name: "B.Des (Bachelor of Design)",
    weight: 90,
    category: "Design, Fine Arts & Performing Arts",
    demand: "High Demand",
    description: "A comprehensive design program covering creative aesthetics, product prototyping, and visual styling.",
    subjects: ["Design Principles & Aesthetics", "Digital Sketching & Drawing", "Material Prototyping", "Visual Communication"],
    roles: ["Creative Director", "Product Stylist", "Visual Designer"]
  },
  {
    name: "B.Des Fashion Design",
    weight: 91,
    category: "Design, Fine Arts & Performing Arts",
    demand: "High Demand",
    description: "A apparel study program centered on textile sewing, garment sketch designs, fashion runway dynamics, and fabric treatments.",
    subjects: ["Fashion Illustration", "Pattern Making & Garment Construction", "Textile Sciences", "History of Fashion"],
    roles: ["Fashion Designer", "Apparel Brand Manager", "Stylist Coordinator"]
  },
  {
    name: "B.Des User Interface / Experience Design",
    weight: 98,
    category: "Design, Fine Arts & Performing Arts",
    demand: "Critical Demand",
    description: "Highly sought-after UX/UI framework covering website wireframe designs, visual user behavior tests, and dynamic application layouts.",
    subjects: ["User Research & Personas", "Wireframing & Prototyping", "Interaction Design Principles", "Usability Testing Methods"],
    roles: ["UX Researcher", "UI Designer", "Product Designer"]
  },
  {
    name: "BHM (Bachelor of Hotel Management)",
    weight: 89,
    category: "Hospitality, Travel & Tourism",
    demand: "High Demand",
    description: "Four-year hospitality study managing luxury hotel operations, gourmet culinary preparations, front desk services, and housekeeping logs.",
    subjects: ["Food Production & Patisserie", "Front Office Operations", "Housekeeping Administration", "Food & Beverage Service"],
    roles: ["Hotel Manager", "Guest Relations Executive", "Food & Beverage Director"]
  },
  {
    name: "B.Sc Culinary Arts",
    weight: 88,
    category: "Hospitality, Travel & Tourism",
    demand: "High Demand",
    description: "Gourmet culinary sciences, pastry baking, kitchen resource logistics, food hygiene laws, and international cuisine designs.",
    subjects: ["Food Production Operations", "Baking & Patisserie", "Gourmet Food Presentation", "Food Hygiene & HACCP"],
    roles: ["Executive Chef", "Pastry Sous Chef", "Kitchen Operations Lead"]
  },
  {
    name: "B.Ed (Bachelor of Education)",
    weight: 86,
    category: "Education & Teaching",
    demand: "High Demand",
    description: "Teacher training course covering classroom leadership, pedagogical teaching models, and student assessment architectures.",
    subjects: ["Childhood & Growing Up", "Pedagogy of School Subjects", "Learning & Teaching Theories", "Educational Assessment"],
    roles: ["Secondary School Teacher", "Educational Counselor", "Curriculum Designer"]
  },
  {
    name: "BJMC (Bachelor of Journalism & Mass Communication)",
    weight: 89,
    category: "Media, Communication & Journalism",
    demand: "High Demand",
    description: "Undergraduate curriculum covering newspaper journalism reporting, TV broadcast technologies, public relations, and advertising.",
    subjects: ["Reporting & Editing", "Broadcast Journalism", "Public Relations & Media", "Media Laws & Ethics"],
    roles: ["News Reporter", "Sub-Editor", "Public Relations Officer"]
  },
  {
    name: "B.Sc Nautical Science (Merchant Navy)",
    weight: 93,
    category: "Maritime & Aviation",
    demand: "High Demand",
    description: "Prepares deck cadets for celestial sea navigation, cargo handling stability, radar maneuvers, and merchant navy ship safety.",
    subjects: ["Celestial & Terrestrial Navigation", "Ship Stability & Cargo Operations", "Radar & Arpa Technology", "Meteorology & Maritime Safety"],
    roles: ["Deck Cadet", "Navigating Officer", "Marine Surveyor"]
  },
  {
    name: "B.Sc Aviation / Pilot Training",
    weight: 95,
    category: "Maritime & Aviation",
    demand: "Critical Demand",
    description: "Prepares candidates for commercial pilot licenses, including aircraft flight aerodynamics, meteorology charts, and instrument ratings.",
    subjects: ["Air Aerodynamics & Performance", "Flight Navigation & Meteorology", "Aviation Regulations", "Instrument Flight Rating"],
    roles: ["Commercial Pilot", "Flight Operations Officer", "Aviation Technical Officer"]
  },

  // --- NEW MEDICAL DEGREES FROM PDF ---
  {
    name: "MD in Pathology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in pathology.",
    subjects: ["Advanced Pathology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Microbiology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in microbiology.",
    subjects: ["Advanced Microbiology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Biochemistry",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in biochemistry.",
    subjects: ["Advanced Biochemistry Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Physiology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in physiology.",
    subjects: ["Advanced Physiology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Anatomy",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in anatomy.",
    subjects: ["Advanced Anatomy Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Pharmacology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in pharmacology.",
    subjects: ["Advanced Pharmacology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Forensic Medicine & Toxicology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in forensic medicine & toxicology.",
    subjects: ["Advanced Forensic Medicine & Toxicology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Community Medicine (Preventive & Social Medicine)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in community medicine (preventive & social medicine).",
    subjects: ["Advanced Community Medicine (Preventive & Social Medicine) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Respiratory Medicine (Pulmonology)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in respiratory medicine (pulmonology).",
    subjects: ["Advanced Respiratory Medicine (Pulmonology) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Obstetrics & Gynaecology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in obstetrics & gynaecology.",
    subjects: ["Advanced Obstetrics & Gynaecology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Physical Medicine & Rehabilitation",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in physical medicine & rehabilitation.",
    subjects: ["Advanced Physical Medicine & Rehabilitation Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Nuclear Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in nuclear medicine.",
    subjects: ["Advanced Nuclear Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Emergency Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in emergency medicine.",
    subjects: ["Advanced Emergency Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Geriatrics",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in geriatrics.",
    subjects: ["Advanced Geriatrics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Palliative Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in palliative medicine.",
    subjects: ["Advanced Palliative Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Sports Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in sports medicine.",
    subjects: ["Advanced Sports Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Radiation Oncology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in radiation oncology.",
    subjects: ["Advanced Radiation Oncology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Hospital Administration",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in hospital administration.",
    subjects: ["Advanced Hospital Administration Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Immuno-Haematology & Blood Transfusion",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in immuno-haematology & blood transfusion.",
    subjects: ["Advanced Immuno-Haematology & Blood Transfusion Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Transfusion Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in transfusion medicine.",
    subjects: ["Advanced Transfusion Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Reproductive Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in reproductive medicine.",
    subjects: ["Advanced Reproductive Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Clinical Pharmacology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in clinical pharmacology.",
    subjects: ["Advanced Clinical Pharmacology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Medical Genetics",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in medical genetics.",
    subjects: ["Advanced Medical Genetics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Occupational Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in occupational medicine.",
    subjects: ["Advanced Occupational Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Aviation Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in aviation medicine.",
    subjects: ["Advanced Aviation Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD in Tropical Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in tropical medicine.",
    subjects: ["Advanced Tropical Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MS in Anatomy",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in anatomy.",
    subjects: ["Advanced Anatomy Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MS in Traumatology & Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in traumatology & surgery.",
    subjects: ["Advanced Traumatology & Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Oral & Maxillofacial Surgery",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in oral & maxillofacial surgery.",
    subjects: ["Advanced Oral & Maxillofacial Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Orthodontics & Dentofacial Orthopaedics",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in orthodontics & dentofacial orthopaedics.",
    subjects: ["Advanced Orthodontics & Dentofacial Orthopaedics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Prosthodontics & Crown/Bridge",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in prosthodontics & crown/bridge.",
    subjects: ["Advanced Prosthodontics & Crown/Bridge Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Periodontics",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in periodontics.",
    subjects: ["Advanced Periodontics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Conservative Dentistry & Endodontics",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in conservative dentistry & endodontics.",
    subjects: ["Advanced Conservative Dentistry & Endodontics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Oral Medicine & Radiology",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in oral medicine & radiology.",
    subjects: ["Advanced Oral Medicine & Radiology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Paediatric & Preventive Dentistry",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric & preventive dentistry.",
    subjects: ["Advanced Paediatric & Preventive Dentistry Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Oral Pathology & Microbiology",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in oral pathology & microbiology.",
    subjects: ["Advanced Oral Pathology & Microbiology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Public Health Dentistry",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in public health dentistry.",
    subjects: ["Advanced Public Health Dentistry Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MDS in Oral Implantology",
    weight: 90,
    category: "Dental",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in oral implantology.",
    subjects: ["Advanced Oral Implantology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Nephrology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in nephrology.",
    subjects: ["Advanced Nephrology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Gastroenterology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in gastroenterology.",
    subjects: ["Advanced Gastroenterology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Endocrinology & Metabolism",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in endocrinology & metabolism.",
    subjects: ["Advanced Endocrinology & Metabolism Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Medical Oncology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in medical oncology.",
    subjects: ["Advanced Medical Oncology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Clinical Haematology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in clinical haematology.",
    subjects: ["Advanced Clinical Haematology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Rheumatology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in rheumatology.",
    subjects: ["Advanced Rheumatology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Hepatology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in hepatology.",
    subjects: ["Advanced Hepatology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Infectious Diseases",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in infectious diseases.",
    subjects: ["Advanced Infectious Diseases Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Neonatology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in neonatology.",
    subjects: ["Advanced Neonatology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Cardiology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric cardiology.",
    subjects: ["Advanced Paediatric Cardiology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Neurology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric neurology.",
    subjects: ["Advanced Paediatric Neurology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Haematology-Oncology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric haematology-oncology.",
    subjects: ["Advanced Paediatric Haematology-Oncology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Nephrology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric nephrology.",
    subjects: ["Advanced Paediatric Nephrology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Gastroenterology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric gastroenterology.",
    subjects: ["Advanced Paediatric Gastroenterology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric Pulmonology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric pulmonology.",
    subjects: ["Advanced Paediatric Pulmonology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Cardiac Anaesthesia",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in cardiac anaesthesia.",
    subjects: ["Advanced Cardiac Anaesthesia Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Neuro Anaesthesia",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in neuro anaesthesia.",
    subjects: ["Advanced Neuro Anaesthesia Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Critical Care Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in critical care medicine.",
    subjects: ["Advanced Critical Care Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Paediatric & Neonatal Anaesthesia",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric & neonatal anaesthesia.",
    subjects: ["Advanced Paediatric & Neonatal Anaesthesia Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Organ Transplant Anaesthesia",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in organ transplant anaesthesia.",
    subjects: ["Advanced Organ Transplant Anaesthesia Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Medical Genetics",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in medical genetics.",
    subjects: ["Advanced Medical Genetics Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Reproductive Medicine & Biology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in reproductive medicine & biology.",
    subjects: ["Advanced Reproductive Medicine & Biology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Nuclear Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in nuclear medicine.",
    subjects: ["Advanced Nuclear Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Geriatric Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in geriatric medicine.",
    subjects: ["Advanced Geriatric Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Palliative Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in palliative medicine.",
    subjects: ["Advanced Palliative Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Immunology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in immunology.",
    subjects: ["Advanced Immunology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Clinical Pharmacology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in clinical pharmacology.",
    subjects: ["Advanced Clinical Pharmacology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Radiotherapy (Advanced)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in radiotherapy (advanced).",
    subjects: ["Advanced Radiotherapy (Advanced) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DM in Pulmonary Medicine (Interventional)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in pulmonary medicine (interventional).",
    subjects: ["Advanced Pulmonary Medicine (Interventional) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Vascular Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in vascular surgery.",
    subjects: ["Advanced Vascular Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Plastic & Reconstructive Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in plastic & reconstructive surgery.",
    subjects: ["Advanced Plastic & Reconstructive Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Paediatric Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric surgery.",
    subjects: ["Advanced Paediatric Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Surgical Oncology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in surgical oncology.",
    subjects: ["Advanced Surgical Oncology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Urology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in urology.",
    subjects: ["Advanced Urology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Surgical Gastroenterology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in surgical gastroenterology.",
    subjects: ["Advanced Surgical Gastroenterology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Liver Transplant & HPB Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in liver transplant & hpb surgery.",
    subjects: ["Advanced Liver Transplant & HPB Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Burns & Plastic Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in burns & plastic surgery.",
    subjects: ["Advanced Burns & Plastic Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Endocrine Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in endocrine surgery.",
    subjects: ["Advanced Endocrine Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Colorectal Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in colorectal surgery.",
    subjects: ["Advanced Colorectal Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Hand Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in hand surgery.",
    subjects: ["Advanced Hand Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Spine Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in spine surgery.",
    subjects: ["Advanced Spine Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Joint Replacement Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in joint replacement surgery.",
    subjects: ["Advanced Joint Replacement Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Foot & Ankle Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in foot & ankle surgery.",
    subjects: ["Advanced Foot & Ankle Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Head & Neck Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in head & neck surgery.",
    subjects: ["Advanced Head & Neck Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Otology / Cochlear Implant Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in otology / cochlear implant surgery.",
    subjects: ["Advanced Otology / Cochlear Implant Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Rhinology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in rhinology.",
    subjects: ["Advanced Rhinology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Vitreo-Retinal Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in vitreo-retinal surgery.",
    subjects: ["Advanced Vitreo-Retinal Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Cornea & Anterior Segment Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in cornea & anterior segment surgery.",
    subjects: ["Advanced Cornea & Anterior Segment Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Glaucoma Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in glaucoma surgery.",
    subjects: ["Advanced Glaucoma Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Oculoplasty",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in oculoplasty.",
    subjects: ["Advanced Oculoplasty Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Paediatric Ophthalmology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in paediatric ophthalmology.",
    subjects: ["Advanced Paediatric Ophthalmology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Gynaecological Oncology",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in gynaecological oncology.",
    subjects: ["Advanced Gynaecological Oncology Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Maternal-Fetal Medicine",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in maternal-fetal medicine.",
    subjects: ["Advanced Maternal-Fetal Medicine Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Laparoscopic / Minimal Access Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in laparoscopic / minimal access surgery.",
    subjects: ["Advanced Laparoscopic / Minimal Access Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MCh in Renal Transplant Surgery",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in renal transplant surgery.",
    subjects: ["Advanced Renal Transplant Surgery Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "PhD (Medical Sciences)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in phd (medical sciences).",
    subjects: ["Advanced PhD (Medical Sciences) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DSc (Doctor of Science)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in dsc (doctor of science).",
    subjects: ["Advanced DSc (Doctor of Science) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DrPH (Doctor of Public Health)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in drph (doctor of public health).",
    subjects: ["Advanced DrPH (Doctor of Public Health) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD (Research)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in md (research).",
    subjects: ["Advanced MD (Research) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MBA (Hospital Administration)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in mba (hospital administration).",
    subjects: ["Advanced MBA (Hospital Administration) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Gynaecology & Obstetrics (DGO)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in gynaecology & obstetrics (dgo).",
    subjects: ["Advanced Diploma in Gynaecology & Obstetrics (DGO) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Child Health (DCH)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in child health (dch).",
    subjects: ["Advanced Diploma in Child Health (DCH) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Ophthalmology / Medical Sciences (DOMS)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in ophthalmology / medical sciences (doms).",
    subjects: ["Advanced Diploma in Ophthalmology / Medical Sciences (DOMS) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Laryngology & Otology (DLO)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in laryngology & otology (dlo).",
    subjects: ["Advanced Diploma in Laryngology & Otology (DLO) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Psychological Medicine (DPM)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in psychological medicine (dpm).",
    subjects: ["Advanced Diploma in Psychological Medicine (DPM) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Anaesthesiology (DA)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in anaesthesiology (da).",
    subjects: ["Advanced Diploma in Anaesthesiology (DA) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Public Health (DPH)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in public health (dph).",
    subjects: ["Advanced Diploma in Public Health (DPH) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Family Medicine (DFM)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in family medicine (dfm).",
    subjects: ["Advanced Diploma in Family Medicine (DFM) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Tuberculosis & Chest Diseases (DTCD)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in tuberculosis & chest diseases (dtcd).",
    subjects: ["Advanced Diploma in Tuberculosis & Chest Diseases (DTCD) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Radio-Diagnosis (DRD)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in radio-diagnosis (drd).",
    subjects: ["Advanced Diploma in Radio-Diagnosis (DRD) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Dermatology (Dip. Derm)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in dermatology (dip. derm).",
    subjects: ["Advanced Diploma in Dermatology (Dip. Derm) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Medical Radio-Diagnosis (DMRD)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in medical radio-diagnosis (dmrd).",
    subjects: ["Advanced Diploma in Medical Radio-Diagnosis (DMRD) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "Diploma in Medical Radio-Therapy (DMRT)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in diploma in medical radio-therapy (dmrt).",
    subjects: ["Advanced Diploma in Medical Radio-Therapy (DMRT) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "DNB (Diplomate of National Board)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in dnb (diplomate of national board).",
    subjects: ["Advanced DNB (Diplomate of National Board) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD (Ayu)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in md (ayu).",
    subjects: ["Advanced MD (Ayu) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MS (Ayu)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in ms (ayu).",
    subjects: ["Advanced MS (Ayu) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD (Hom)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in md (hom).",
    subjects: ["Advanced MD (Hom) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
  {
    name: "MD (Unani)",
    weight: 90,
    category: "Medical",
    demand: "High Demand",
    description: "Specialized postgraduate medical program focusing on advanced concepts and clinical practice in md (unani).",
    subjects: ["Advanced MD (Unani) Principles", "Clinical Practice & Guidelines", "Research Methodology", "Specialized Care"],
    roles: ["Specialist Doctor", "Consultant", "Medical Professor"]
  },
];

;
