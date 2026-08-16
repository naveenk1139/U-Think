export interface SpecializationInfo {
  rank: number;
  name: string;
  weight: number; // Popularity / relevance index out of 100
  category: 'CS & Computational' | 'Electronics & Controls' | 'Mechanical & Aerospace' | 'Biotech & Chemical' | 'Civil & Infrastructure' | 'Industrial & Management';
  demand: 'Critical Demand' | 'High Demand' | 'Moderate Demand' | 'Niche / Emerging';
  description: string;
  subjects: string[];
  roles: string[];
}

export const ENGINEERING_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Computer Science Engineering",
    weight: 100,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "The primary computational science field focusing on software design, algorithmic logic, computer systems, and scalable web/data infrastructures.",
    subjects: ["Data Structures & Algorithms", "Operating Systems", "Computer Architecture", "Database Management Systems"],
    roles: ["Software Developer", "Computer Hardware Engineer", "Embedded Systems Engineer", "Network Systems Administrator", "Data Analyst"]
  },
  {
    rank: 2,
    name: "Electronics & Communication Engineering",
    weight: 17,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Studies semiconductor structures, digital circuits, analog chips, microwave frequencies, fiber-optic telemetry, and telecom grids.",
    subjects: ["Digital Signal Processing", "Microcontrollers & Embedded Controllers", "Analog Communications", "Semiconductor Theory"],
    roles: ["Electronics Engineer", "Communication Engineer", "VLSI Design Engineer", "Network Engineer", "IoT Engineer"]
  },
  {
    rank: 3,
    name: "Artificial Intelligence & Machine Learning",
    weight: 16,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Fuses predictive mathematics, neural net layers, reinforcement learning architectures, and natural language logic models.",
    subjects: ["Deep Learning Models", "Statistical Mathematics", "Computer Vision", "Natural Language Processing"],
    roles: ["Machine Learning Engineer", "Artificial Intelligence Engineer", "Data Scientist", "Robotics software developer"]
  },
  {
    rank: 4,
    name: "Mechanical Engineering",
    weight: 16,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "Core discipline covering mechanical kinematics, structural kinetics, thermodynamics, CAD blueprints, and industrial design principles.",
    subjects: ["Thermodynamics & Heat Transfer", "Fluid Dynamics", "Kinematics of Machinery", "CAD/CAM Methodologies"],
    roles: ["Mechanical Design Engineer", "Manufacturing Engineer", "Product Engineer", "Maintenance Engineer", "Automotive Design Engineer"]
  },
  {
    rank: 5,
    name: "Electrical Engineering",
    weight: 11,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Explores heavy-generating engines, smart power distribution, high-voltage transformers, power grids, and control instruments.",
    subjects: ["Power Systems & Transmission", "Electrical Machinery", "Control Instrumentation", "Network Analysis & Circuits"],
    roles: ["Electrical Engineer", "Electronics Engineer", "Telecommunications Engineer", "Power Systems Engineer", "Control Systems Engineer"]
  },
  {
    rank: 6,
    name: "Civil Engineering",
    weight: 11,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Studies design architectures, mechanics of materials, soil foundation physics, and ecological environmental systems.",
    subjects: ["Concrete Structural Design", "Soil Mechanics", "Fluid Hydraulics", "Environmental Impact Mitigation"],
    roles: ["Civil Engineer", "Construction Engineer", "Geotechnical Engineer", "Project Engineer", "Structural Engineer"]
  },
  {
    rank: 7,
    name: "Biotechnology Engineering",
    weight: 10,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Fuses engineering controls with biology parameters to design cell structures, DNA manipulations, and clinical proteins.",
    subjects: ["Recombinant DNA Technology", "Bioinformatics Solutions", "Bioprocess kinetics", "Structural Cell Biology"],
    roles: ["Biotechnology Researcher", "Research Biochemist", "Quality Controller", "Clinical Researcher"]
  },
  {
    rank: 8,
    name: "Information Technology",
    weight: 6,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Direct engineering support for corporate web interfaces, mobile operating systems, database networks, and enterprise servers.",
    subjects: ["Fullstack Web Frameworks", "Cloud computing architecture", "Database Administration", "Network System Protocols"],
    roles: ["IT Engineer", "IT Specialist", "Mobile App Developer", "Computer Programmer", "Database Administrator"]
  },
  {
    rank: 9,
    name: "Electronics Engineering",
    weight: 6,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Specialized focus on integrated microchips, digital controllers, sensor hardware, and embedded power adapters.",
    subjects: ["Solid State Electronics", "Microcircuits & PCB Layouts", "Power Electronics", "Embedded Firmware"],
    roles: ["Electronics Engineer", "VLSI Quality Assurer", "IoT Device Tester", "Hardware Prototyper"]
  },
  {
    rank: 10,
    name: "Chemical Engineering",
    weight: 11,
    category: "Biotech & Chemical",
    demand: "High Demand",
    description: "Avenues targeting chemical raw transformations, petrochemical processes, reactor engineering, and safe mass material outputs.",
    subjects: ["Chemical Reaction Kinetics", "Mass Transfer Principles", "Petrochemical Processing", "Industrial Process Safety"],
    roles: ["Chemical Engineer", "Quality Control Engineer", "Petrochemical Engineer", "Nuclear Engineer", "Industrial Process Engineer"]
  },
  {
    rank: 11,
    name: "Aerospace Engineering",
    weight: 3,
    category: "Mechanical & Aerospace",
    demand: "Niche / Emerging",
    description: "Advanced aerodynamics, mechanics of propulsion, flight structural physics, satellite orbits, and supersonic designs.",
    subjects: ["Flight Mechanics & Dynamics", "Supersonic Aerodynamics", "Jet Propulsion Engines", "Avionics System architectures"],
    roles: ["Aerospace Design Specialist", "Avionics Engineer", "Aerodynamics Analyst", "Space Systems Engineer"]
  },
  {
    rank: 12,
    name: "Cyber Security",
    weight: 3,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Provisions firewalls, cybersecurity protocols, malware defenses, penetration metrics, ethical hacking, and database vulnerability audits.",
    subjects: ["Applied Cryptography", "Network Security Protocols", "Vulnerability Pentesting", "Computer Forensics & Audits"],
    roles: ["Cyber Security Consultant", "Penetration Tester", "Information Security Architect", "Incident Responder"]
  },
  {
    rank: 13,
    name: "Food Technology",
    weight: 3,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Explores dietary biochemistries, food preservations, refrigeration processes, manufacturing machinery, and food regulatory codes.",
    subjects: ["Food Microbiology & Safety", "Food Process Engineering", "Nutrition Biochemistry", "Preservation Mechanics"],
    roles: ["Food Technologist", "Food Storage Manager", "Quality Assurance Manager", "Nutrition Specialist", "Food Processing Engineer"]
  },
  {
    rank: 14,
    name: "Aeronautical Engineering",
    weight: 2,
    category: "Mechanical & Aerospace",
    demand: "Niche / Emerging",
    description: "Dedicated study toward commercial flight physics, cabin pressure dynamics, aviation materials, propulsion systems, and helicopter configurations.",
    subjects: ["Aircraft Performance & Control", "Structure Mechanics", "Aviation Thermodynamics", "Propulsion Models"],
    roles: ["Aircraft Design Engineer", "Aviation Maintenance Inspector", "Aeromotive Project Supervisor", "Flight Controls Tester"]
  },
  {
    rank: 15,
    name: "Biomedical Engineering",
    weight: 2,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Integrates biology metrics with electronics and mechanical modules to structure life-support apparatus, medical imaging, and implants.",
    subjects: ["Biomedical Sensors & Instrumentation", "Biomaterials of Implants", "Medical Imaging Processing", "Anatomy & Physiology"],
    roles: ["Biomedical Engineer", "Product Development Engineer", "Clinical Engineer", "Medical Imaging Specialist"]
  },
  {
    rank: 16,
    name: "Robotics Engineering",
    weight: 2,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "Combines electronic sensor feeds, mechanical servos, robot controllers, and computer code architectures to engineer smart androids.",
    subjects: ["Robot Kinetics & Dynamics", "Machine Vision Sensors", "Pneumatics & Hydraulic controls", "Industrial Mechatronics"],
    roles: ["Robotics Application Engineer", "Robotics Software Engineer", "Automation Engineer", "Mechatronics Engineer"]
  },
  {
    rank: 17,
    name: "Instrumentation Technology",
    weight: 2,
    category: "Electronics & Controls",
    demand: "Moderate Demand",
    description: "Measures, monitors, and regulates high-precision temperature, pressure, fluid flows, and computerized industrial valves.",
    subjects: ["Sensor Transducers & Actuators", "Industrial Process Control", "Digital Instrumentation", "Virtual Instrumentation Labs"],
    roles: ["Apparatus Calibration Lead", "Process Automation Specialist", "Instrumentation Designer", "SCADA Control Engineer"]
  },
  {
    rank: 18,
    name: "Mechatronics Engineering",
    weight: 2,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "An elegant fusion of mechanical kinematics, analog circuit electronics, and software logic to build automated machines.",
    subjects: ["Micro-Electro-Mechanical Systems (MEMS)", "Actuators & Sensors", "Programmable Logic Controllers (PLC)", "Digital Control Systems"],
    roles: ["Mechatronics Engineer", "Automation Developer", "Systems Integration Specialist", "Electro-mechanical Inspector"]
  },
  {
    rank: 19,
    name: "Metallurgical Engineering",
    weight: 1,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Processes primary row ores, purifies alloy structures, studies metal microstructures, thermal tempering, and surface corrosion physics.",
    subjects: ["Physical Metallurgy", "Iron & Steel Production", "Extracting Metals Chemistry", "Corrosion Prevention Systems"],
    roles: ["Metallurgist Specialist", "Materials Quality Controller", "Foundry Operations Supervisor", "Welding & Alloy Engineer"]
  },
  {
    rank: 20,
    name: "Materials Science",
    weight: 1,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Synthesizes advanced polymers, micro-silicon super-alloys, nano-carbon fibers, and smart materials for space, clinical implants, or quantum sectors.",
    subjects: ["Crystalline Lattice Structures", "Polymer Chemistry", "Nanomaterials & Synthesis", "Materials Thermodynamics"],
    roles: ["Materials Specialist", "R&D Scientist", "Quality Assurance Analyst", "Polymer Compounder"]
  },
  {
    rank: 21,
    name: "Automobile Engineering",
    weight: 1,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "Dedicated to designing automotive structures, combustion engines, transmission kinetics, aerodynamics, and advanced EV layouts.",
    subjects: ["Combustion & Hybrid Engines", "Vehicle Kinetics & Dynamics", "Acoustics & NVH parameters", "Automotive Electrical Networks"],
    roles: ["Automobile Engineer", "Automotive Design Engineer", "Automotive Technician", "Automotive Quality Assurance Engineer"]
  },
  {
    rank: 22,
    name: "Agriculture & Farm Engineering",
    weight: 1,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Applies mechanical, soil water conservation, and chemical factors to construct harvesters, automated drip channels, and smart greenhouses.",
    subjects: ["Soil Hydrology & Irrigation", "Farm Power Machinery", "Post-Harvest Processing", "Agri-informatics"],
    roles: ["Agricultural Technolog", "Irrigation Planner", "Farm Automation Engineer", "Food Storage Consultant"]
  },
  {
    rank: 23,
    name: "Industrial Engineering",
    weight: 1,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Optimizes complex workplace operations, eliminates logistics delays, enhances factory output layout designs, and enforces safety compliance.",
    subjects: ["Operations Research & Analytics", "Supply Chain & Logistics", "Ergonomics & Work Design", "Quality Assurance & Six Sigma"],
    roles: ["Industrial Systems Specialist", "Supply Chain Planner", "Operations Analyst", "Factory Layout Designer"]
  },
  {
    rank: 24,
    name: "Mining Engineering",
    weight: 1,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Coordinates mineral extraction operations, explores deep underground structural safety, designs tunnel ventilation, and monitors ecological hazards.",
    subjects: ["Surface Mining Operations", "Rock Mechanics & Blasting", "Mine Ventilation Systems", "Mineral Processing"],
    roles: ["Mining Engineer", "Underground Work supervisor", "Blasting Specialist", "Resource Evaluation Planner"]
  },
  {
    rank: 25,
    name: "Production Engineering",
    weight: 0.98,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Focuses on the methodologies of welding, casting, CNC machining, automated manufacturing lines, and production throughput.",
    subjects: ["Metal Casting & Joining", "Advanced Machining & CNC", "Production Inventory Control", "Metrology & Inspections"],
    roles: ["Production Manager", "Manufacturing Planner", "Plant Maintenance Executive", "Tool & Die Designer"]
  },
  {
    rank: 26,
    name: "Marine Engineering",
    weight: 0.95,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Teaches the operations of ship power generation plants, heavy boilers, steering mechanisms, and turbine systems found on cargo vessels.",
    subjects: ["Ship Boiler & Auxiliary Modules", "Marine Internal Combustion", "Naval architecture & Stability", "Electrical Distribution on Board"],
    roles: ["Marine Engineer", "Port Engineer", "Maritime Equipment Specialist", "Design Engineer", "Naval Architect"]
  },
  {
    rank: 27,
    name: "Telecommunication Engineering",
    weight: 0.9,
    category: "Electronics & Controls",
    demand: "Moderate Demand",
    description: "Fuses signal processing, wireless antennas, cellular routing, protocols (5G/6G), and satellite communications.",
    subjects: ["Information & Error Coding", "Mobile Cellular Design", "Fiber Optic Communications", "RF Antennas Planning"],
    roles: ["Telecom Network Architect", "Radio Frequency Specialist", "Switching & Routing Lead", "Network Ops Supervisor"]
  },
  {
    rank: 28,
    name: "VLSI Design",
    weight: 0.82,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Specialized layout design for nanometer silicon computer chips, transistor modeling, and hardware description code.",
    subjects: ["CMOS Analog design", "Verilog HDL Programming", "Silicon Fabrication Technology", "Static Timing Analysis"],
    roles: ["Silicon Layout Designer", "ASIC Design Engineer", "FPGA App Prototyper", "Verification Engineer"]
  },
  {
    rank: 29,
    name: "Textile Engineering",
    weight: 0.64,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Explores the manufacturing of natural/synthetic fibers, spinning kinetics, fabric weaving, dye chemical formulas, and apparel factory analytics.",
    subjects: ["Fiber Polymer Science", "Textile Yarn Spinning", "Fabric Weaving Structures", "Apparel Design Machinery"],
    roles: ["Textile Quality Controller", "Dyeing Process Supervisor", "Yarn Spinning Planner", "Apparel Sourcing Analyst"]
  },
  {
    rank: 30,
    name: "Communications Engineering",
    weight: 0.6,
    category: "Electronics & Controls",
    demand: "Moderate Demand",
    description: "Studies electrical signal transmissions, information noise filters, satellite telemetry, and hardware components of routing grids.",
    subjects: ["Digital Communications", "Signal & System Mathematics", "Electromagnetic Fields", "Antenna Wave Vectors"],
    roles: ["Communication Quality Auditor", "Signal Processing Analyst", "Networks Layout planner", "Hardware Field Coordinator"]
  },
  {
    rank: 31,
    name: "IoT and Connected Devices",
    weight: 0.59,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Explores sensor arrays, wireless microcontrollers, mesh networking protocols, and edge-computing client frameworks.",
    subjects: ["Wireless Sensor Nodes", "Embedded Systems with IoT", "Cloud Data Collection", "Real-time Operating Systems"],
    roles: ["IoT Systems Architect", "Embedded firmware programmer", "Smart Device Integrationist", "Sensor Array Specialist"]
  },
  {
    rank: 32,
    name: "Petroleum Engineering",
    weight: 0.53,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Focuses on reservoir evaluation, deep mud drilling layouts, oil well production operations, and offshore gas processing infrastructure.",
    subjects: ["Reservoir Rock Dynamics", "Deep Drilling Engineering", "Petroleum Production Ops", "Offshore Oil Rig layouts"],
    roles: ["Reservoir Modeler", "Drilling Operations supervisor", "Production Engineer", "Petroleum Scribe"]
  },
  {
    rank: 33,
    name: "Dairy Technology",
    weight: 0.49,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Examines dairy milk processing, microbiological cultures, pasteurization machinery, and high-quality milk byproduct manufacturing.",
    subjects: ["Dairy Chemistry & Microbiology", "Fluid Milk Processing", "Ice Cream & Butter Kinetics", "Dairy Plant Design & Safety"],
    roles: ["Dairy Food Technologist", "Processing Plant Manager", "Quality Inspector", "Product Innovator"]
  },
  {
    rank: 34,
    name: "Environmental Engineering",
    weight: 0.48,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Fuses ecology principles with civil planning to build waste recycling systems, sewage filters, and atmospheric smog control devices.",
    subjects: ["Waste Water Treatments", "Air Pollution Mitigation", "Solid Waste Management", "Ecological Impact Analysis"],
    roles: ["Environmental Compliance Expert", "Water Treatment Designer", "Sustainability Auditor", "Solid Waste consultant"]
  },
  {
    rank: 35,
    name: "Control Systems",
    weight: 0.41,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Explores linear system models, feedback mechanisms, PID controls, and automated aircraft/rocket balance configurations.",
    subjects: ["PID Control & Tuning", "State Space Mathematics", "Industrial SCADA Protocols", "Non-linear Dynamic Controls"],
    roles: ["Automation Systems Lead", "Surgical Robot Calibrationist", "Process Control Specialist", "Avionics balancing supervisor"]
  },
  {
    rank: 36,
    name: "Bioinformatics",
    weight: 0.4,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Combines data algorithms, genomic databases, and statistical mathematics to decode amino acids and model molecule drug interactions.",
    subjects: ["Sequence Alignment Algorithms", "Genomics & Proteomics Data", "Statistical Computing (R/Python)", "Computational Drug Modeling"],
    roles: ["Genomic Data Scientist", "Bio-informatician Researcher", "Database Architect in Pharma", "Clinical Trial Analyst"]
  },
  {
    rank: 37,
    name: "Fire & Safety Engineering",
    weight: 0.39,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Designs industrial fire detection systems, combustible toxic gas alerts, safe building exit routes, and hazard risk mitigation layouts.",
    subjects: ["Fire Dynamics & Chemistry", "Hazard Analysis & Risk", "Building Safety Fire Codes", "Industrial Evacuation Schemes"],
    roles: ["Industrial Safety Director", "Fire Prevention Designer", "Safety Risk Inspector", "Audit Compliance Supervisor"]
  },
  {
    rank: 38,
    name: "Biochemical Engineering",
    weight: 0.36,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Explores bioreactor kinetics, industrial raw biomass conversions, enzyme catalysts, and deep cell fermentation systems.",
    subjects: ["Bioreactor Transport kinetics", "Enzyme Biocatalysts", "Industrial Sterilization Models", "Fermenting Operations"],
    roles: ["Bioprocess Scientist", "Bioreactor Quality Assurer", "Fermentation Lead", "Pharmaceutical Compounds Formulator"]
  },
  {
    rank: 39,
    name: "Engineering Physics",
    weight: 0.32,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Integrates advanced quantum mechanics, lasers, optic systems, semiconductor physics, and experimental engineering apparatus.",
    subjects: ["Quantum Mechanics on Chips", "Laser & Plasma Physics", "Solid State Materials", "Electromagnetic Wave Guides"],
    roles: ["Optronics Specialist", "Semiconductor Lab Assistant", "Laser Applications Designer", "Advanced R&D Physicist"]
  },
  {
    rank: 40,
    name: "Energy Engineering",
    weight: 0.3,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Focuses on optimizing coal power grids, installing solar cell layouts, wind power installations, and energy auditing protocols.",
    subjects: ["Renewable Solar cells & Wind", "Power Plant Thermodynamics", "Energy Storage & Batteries", "Industrial Energy Audits"],
    roles: ["Energy Efficiency Advisor", "Solar Grid Design Specialist", "Wind Operations Engineer", "Power conservation analyst"]
  },
  {
    rank: 41,
    name: "Naval Architecture",
    weight: 0.22,
    category: "Mechanical & Aerospace",
    demand: "Niche / Emerging",
    description: "Deals with ship hull design, stability dynamics, hydrodynamics of watercraft, cruise liners, and military submarines.",
    subjects: ["Ship Hydrodynamics & Drag", "Hull Structural Analysis", "Watercraft Stability & buoyancy", "Marine Cad Drawing"],
    roles: ["Ship designer", "Coastal Infrastructure Specialist", "Marine Systems Modeler", "Salvage operations supervisor"]
  },
  {
    rank: 42,
    name: "Ceramic Engineering",
    weight: 0.21,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Examines inorganic non-metallic materials, heat-resistant bricks, spacecraft heat shields, high-performance spark plugs, and glass synthesis.",
    subjects: ["Refractory Science & Kilns", "Glass Synthesis & Processing", "Sintering Mechanics of Powders", "Structural Ceramics"],
    roles: ["Ceramics Quality Auditor", "Refractory Compounder", "Space Heat Shield specialist", "Materials testing expert"]
  },
  {
    rank: 43,
    name: "Polymer Technology",
    weight: 0.18,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Dedicated to formulating plastics, synthetic rubbers, composite fibers, injection mold templates, and eco-degradable polymer materials.",
    subjects: ["Polymer Synthesis Chemistry", "Injection Modeling & Extrusion", "Composite Structural Testing", "Degradable Elastomers"],
    roles: ["Rubber & Plastics Inspector", "Compound Formulator", "Procurement Quality Advisor", "Polymer R&D Scientist"]
  },
  {
    rank: 44,
    name: "Manufacturing Engineering",
    weight: 0.15,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "Deals with mass industrial production plans, CNC machine tool designs, metal cutting mechanics, assembly layouts, and automated robotics.",
    subjects: ["Metal Forming Kinetics", "Computer Integrated Manufacturing", "Tooling & Fixtures Design", "Automation Systems"],
    roles: ["Manufacturing Process Specialist", "Tooling Designer", "Plant Operations Coordinator", "Production Analyst"]
  },
  {
    rank: 45,
    name: "Automation",
    weight: 0.15,
    category: "Mechanical & Aerospace",
    demand: "High Demand",
    description: "Fuses cybernetics, programmable logic circuits (PLC), SCADA pipelines, and sensor layouts to build automated packing/sorting lines.",
    subjects: ["Industrial PLC systems", "Pneumatics & Servo controls", "Robotic arms scheduling", "SCADA Architecture"],
    roles: ["Automation Systems Lead", "SCADA Project Engineer", "Robotics Applications Planner", "Integration Inspector"]
  },
  {
    rank: 46,
    name: "Pharmaceutical engineering",
    weight: 0.15,
    category: "Biotech & Chemical",
    demand: "High Demand",
    description: "Specialized in pharmaceutical plant design, sterile pill compressions, liquid formulations, clinical packaging, and GMP safety audits.",
    subjects: ["Sterile Manufacturing practices", "Pharmaceutical Fluid Flow", "Tabletting & Compression", "Quality Audits & FDA Rules"],
    roles: ["Pharma Process Supervisor", "GMP Quality Specialist", "Fluid Dynamics Analyst in Lab", "Formulation Designer"]
  },
  {
    rank: 47,
    name: "Bioinformatics (General Science)",
    weight: 0.12,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Deep analytics focusing on gene transcription charts, software models for biological enzymes, and epidemiological computer programs.",
    subjects: ["Computational Protein Modeling", "Genomic Sequence databases", "Biostatistics & R Libraries", "Microarray Informatics"],
    roles: ["Genomic Assistant Analyst", "Pharma database assistant", "Clinical trial recorder", "Bio-statistical programmer"]
  },
  {
    rank: 48,
    name: "Power Engineering",
    weight: 0.12,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Fuses high-power switchgears, thermal coal turbines, solar installations, and high-voltage grid transmission systems.",
    subjects: ["High Voltage Apparatus", "Turbine dynamics", "Switchgears & Relays Protection", "Distributing smart grid models"],
    roles: ["Substation Systems Engineer", "Power grid operator", "High-Voltage calibrationist", "Thermal Energy Analyst"]
  },
  {
    rank: 49,
    name: "Business Analytics",
    weight: 0.1,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Explores corporate data warehouses, business intelligence dashboards, statistical tools, and data-driven process mapping.",
    subjects: ["Data Visualization (Tableau/PowerBI)", "Predictive Analytics Models", "Corporate Database SQL", "Statistical modeling"],
    roles: ["Business Intelligence Consultant", "Analytics Specialist", "Process Modeler", "Reporting Analyst"]
  },
  {
    rank: 50,
    name: "Microelectronics",
    weight: 0.1,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Focuses on semiconductor material doping, microscopic transistor physics, photolithography fabrication, and chip layout scaling.",
    subjects: ["Solid State Physics", "Photolithography process", "Thin film deposition", "VLSI Layout Designs"],
    roles: ["Semiconductor fab expert", "Microchip quality inspector", "Doping Process specialist", "R&D Device Physicist"]
  },
  {
    rank: 51,
    name: "Physics (Engineering Foundations)",
    weight: 0.09,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Mathematical research modeling regarding gravity coefficients, wave dynamics, structural acoustics, and thermodynamics foundations.",
    subjects: ["Advanced Theoretical Mechanics", "Wave Mechanics & Acoustics", "Advanced Thermodynamic physics", "Electro-magnetic theory"],
    roles: ["Physical Systems Simulator", "Acoustical specialist", "Materials Lab tester", "Aviation aerodynamics analyst"]
  },
  {
    rank: 52,
    name: "Data Analytics",
    weight: 0.08,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Extracts statistical patterns, structures business dashboards, runs automated regression charts, and manages databases.",
    subjects: ["Statistical Mathematics", "Data Mining & Databases", "Data Visualization tools", "Python & SQL workflows"],
    roles: ["Data Analyst", "Data visualization builder", "Reporting Specialist", "Database Controller"]
  },
  {
    rank: 53,
    name: "Construction Engineering",
    weight: 0.07,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Manages major structural concrete castings, tower crane installations, construction safety codes, and schedule timelines.",
    subjects: ["Construction Machinery & Layouts", "Cost Estimation & Tenders", "Structural concrete design", "Project Management System"],
    roles: ["Construction Manager", "Site Layout Inspector", "Cost Estimator Specialist", "Structure Quality advisor"]
  },
  {
    rank: 54,
    name: "Computer Science & Engineering (Specialized)",
    weight: 0.07,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "A comprehensive core computational major emphasizing higher systems, compilers, networking architectures, and computational engines.",
    subjects: ["Mathematical Computing Foundations", "Compiler Construction Layouts", "Distributed Database Logic", "Network Architectures"],
    roles: ["Systems Architect Developer", "Database Engineering Expert", "Compute Node Optimizer", "Platform Systems Controller"]
  },
  {
    rank: 55,
    name: "Biotechnology (Industrial)",
    weight: 0.07,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Focuses on scaling up laboratory microbiology cultures, designing automated bioreactors, and fermenting food/vaccines.",
    subjects: ["Industrial Bioreactors Design", "Sterile Fermentation Systems", "Cell Biology & Biomass", "Downstream Biochemistry Process"],
    roles: ["Industrial Bioreactor Manager", "Bioprocess Development Expert", "Inoculation Specialist", "Biotech QA Auditor"]
  },
  {
    rank: 56,
    name: "Genetic Engineering",
    weight: 0.06,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Explores CRISPR gene-cutting tools, transgenic crop modifications, vector-based gene therapy delivery, and custom molecular sequencing.",
    subjects: ["CRISPR & Gene Editing Keys", "Recombinant Vector vectors", "Transgenic Animal modeling", "Genomics informatics"],
    roles: ["Genetic Therapeutics Specialist", "Agricultural Molecular scientist", "Genomic Sequencer Auditor", "Gene expression analyst"]
  },
  {
    rank: 57,
    name: "Nanotechnology",
    weight: 0.05,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Synthesizes molecular quantum dots, carbon nanotube composites, nano-drug capsules, and photolithography transistors under 10nm.",
    subjects: ["Quantum Mechanics on NanoScale", "Synthesis of Nanomaterials", "Scanning Tunnel Microscopes", "Carbon Nanotubes applications"],
    roles: ["Nano-Materials Scientist", "Fab lithography technologist", "Drug formulation analyzer", "Quantum Computing R&D Analyst"]
  },
  {
    rank: 58,
    name: "Forensic Science (Technical)",
    weight: 0.05,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Fuses computer hard-drive recovery, chemical drug testing, DNA amplification charts, and trace materials analysis.",
    subjects: ["Cyber Computer Forensics", "Analytical Chemistry Diagnostics", "DNA amplifications & profiling", "Trace fibers spectrometry"],
    roles: ["Cyber Forensic Investigator", "Chemical lab examiner", "DNA expert technician", "Pathology trace consultant"]
  },
  {
    rank: 59,
    name: "Embedded Systems & VLSI",
    weight: 0.05,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Combines Assembly/C firmware with VLSI silicon transistor layout diagrams to create smart microchips for medical or cellular sectors.",
    subjects: ["Real-time Embedded systems", "Verilog Design coding", "transistor CMOS circuits", "Microprocessor architecture"],
    roles: ["Embedded Software Engineer", "VLSI Chip Designer", "ASIC Verification Expert", "Firmware Programmer"]
  },
  {
    rank: 60,
    name: "Data Science",
    weight: 0.05,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Uses deep statistical classifiers, multi-node cloud storage systems, data mining algorithms, and predictive analytics models.",
    subjects: ["Machine Learning Algorithms", "Big Data Hadoop & Spark Systems", "Multivariate Statistics", "Advanced SQL & Warehouses"],
    roles: ["Data Scientist", "Big Data Architect", "Machine Learning modeller", "Data Analyst"]
  },
  {
    rank: 61,
    name: "Mathematics (Engineering Dynamics)",
    weight: 0.04,
    category: "CS & Computational",
    demand: "Niche / Emerging",
    description: "Fuses high-dimensional matrix algebra, cryptography formulas, stochastic modeling, and numerical calculus simulation keys.",
    subjects: ["High-dimension Matrix algebra", "Applied Cryptographic formulas", "Stochastic Calculus & Modeler", "Numerical Analysis coding"],
    roles: ["Applied Cryptographer Analyst", "Stochastic systems simulator", "Risk Assessment modeler", "Finance systems quant"]
  },
  {
    rank: 62,
    name: "Software Development",
    weight: 0.04,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Highly focused on software building processes, agile boards, clean cloud code, full-stack tools, and database frameworks.",
    subjects: ["Object-Oriented Software design", "Agile Software Methodologies", "Cloud Deployments & Kubernetes", "API & Database design"],
    roles: ["Software Developer", "Fullstack Systems builder", "Backend APIs designer", "Desktop App programmer"]
  },
  {
    rank: 63,
    name: "Rubber Technology",
    weight: 0.04,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Analyzes raw vulcanization chemistry, synthetic elastomer compounds, vehicle tire design mechanics, and high-temperature elastic molds.",
    subjects: ["Vulcanization Reactions", "Elastomers & Synthetics Chemistry", "Tire Dynamics & Design", "High-temp Polymer machinery"],
    roles: ["Tire Quality inspector", "Rubber compounding expert", "Elastomers design engineer", "Industrial mold consultant"]
  },
  {
    rank: 64,
    name: "Aircraft Maintenance Engineering",
    weight: 0.03,
    category: "Mechanical & Aerospace",
    demand: "Moderate Demand",
    description: "Strictly trains students in commercial aircraft visual checks, engine repairs, hydraulic system diagnostics, and aviation safety certification.",
    subjects: ["Commercial Aircraft inspection", "Jet Engine Maintenance", "Hydraulics & Flight controls", "Aviation Safety Guidelines"],
    roles: ["Aircraft Maintenance Engineer", "Aviation Inspector", "Aperiodic Aircraft tester", "Hangar Operations Chief"]
  },
  {
    rank: 65,
    name: "Fullstack Development",
    weight: 0.03,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Hands-on engineering targeting browser UI layers (React/Vue/Angular) alongside server systems, database structures, and cloud hosting APIs.",
    subjects: ["Client UI frameworks (React)", "Server API frameworks (Node/Python)", "Database structures (SQL/NoSQL)", "Cloud Hosting & DevOps CI/CD"],
    roles: ["Full Stack Developer", "Web Front-End builder", "Backend Server designer", "Web App Creator"]
  },
  {
    rank: 66,
    name: "Structural Engineering",
    weight: 0.03,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Focuses on designing earthquake-resistant steel skeletons, computational concrete layouts, high-rise wind loads, and bridge trusses.",
    subjects: ["Concrete Structural Design", "Steel Skeleton Dynamics", "Earthquake Mitigation", "Structural software modeling"],
    roles: ["Structural Engineer", "Seismic Risk Advisor", "Architectural Steel reviewer", "Casting Quality expert"]
  },
  {
    rank: 67,
    name: "Quantum Computing",
    weight: 0.03,
    category: "CS & Computational",
    demand: "Niche / Emerging",
    description: "Studies quantum superposition states, cryogenic computing hardwares, quantum encryption algorithms, and qubit state controllers.",
    subjects: ["Qubit Mechanics & Superposition", "Quantum Cryptography Keys", "Cryogenic hardware structures", "Quantum Algorithms (Shor's/Shor)"],
    roles: ["Quantum Software Programmer", "Quantum Hardware Assistant", "Quantum Encryption Consultant", "Research Quant Researcher"]
  },
  {
    rank: 68,
    name: "Infrastructure (Urban Networks)",
    weight: 0.03,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Coordinates public municipal water conduits, high-voltage street pipelines, storm rainwater drainage systems, and green layouts.",
    subjects: ["Urban Pipe Infrastructure", "Rainwater runoff hydraulics", "Cable pipeline mapping", "Urban Planning policies"],
    roles: ["Public Infrastructure Engineer", "Water Drainage planner", "Pipeline Layout technician", "Municipal Project inspector"]
  },
  {
    rank: 69,
    name: "Computer Science (Theoretical foundations)",
    weight: 0.03,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "The core mathematical analysis of compilers, complexity theory, algorithmic bounds, graph theory, and automata languages.",
    subjects: ["Automata Theory & Languages", "Computational Complexity mapping", "Graph Theory & Combinatorics", "Higher Logic & Semantics"],
    roles: ["Theoretical Systems Analyst", "Algorithmic Efficiency reviewer", "Database Logic Designer", "Computational scientist"]
  },
  {
    rank: 70,
    name: "Ocean Engineering",
    weight: 0.02,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Undersea oil pipe designs, deep underwater wave-stress simulations, ocean energy turbines, and seawall concrete structures.",
    subjects: ["Deep Undersea pipeline designs", "Wave Stress & Hydrodynamics", "Offshore Concrete systems", "Ocean Current sensors"],
    roles: ["Deepwater Pipeline Engineer", "Offshore Oil Rig designer", "Seawall layout specialist", "Ocean sensor technician"]
  },
  {
    rank: 71,
    name: "Environmental Sciences",
    weight: 0.02,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Explores carbon dioxide metrics, soil chemical restorations, ecosystem biodiversity protections, and global warming computer models.",
    subjects: ["Carbon Accounting systems", "Ecosystem Biodiversity metrics", "Soil Restorations chemistry", "Meteorological simulator layouts"],
    roles: ["Sustainability Consultant", "Soil remediation expert", "Carbon credit auditor", "Ecosystem Impact supervisor"]
  },
  {
    rank: 72,
    name: "Electric Vehicles Design",
    weight: 0.02,
    category: "Mechanical & Aerospace",
    demand: "Critical Demand",
    description: "Underpins lithium battery management platforms, electric motor designs, regenerative brake setups, and EV dashboard telemetry.",
    subjects: ["Battery Management Systems", "Electric Powertrain design", "Regenerative Braking engineering", "High-power EV adaptive chargers"],
    roles: ["EV Powertrain Engineer", "Battery Management coder", "Automotive Design Specialist", "EV systems tester"]
  },
  {
    rank: 73,
    name: "Transportation Engineering",
    weight: 0.02,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Studies highway flow rates, intelligent street signal plans, high-speed rail curves, airport runway materials, and port cargo flow layouts.",
    subjects: ["Highway Route layouts", "Traffic flow analytics", "Airport runway materials", "Rail Track curve geometry"],
    roles: ["Transportation Engineer", "Traffic Signal Modeler", "Railway Layout planner", "Asphalt Materials checker"]
  },
  {
    rank: 74,
    name: "Thermal Engineering",
    weight: 0.02,
    category: "Mechanical & Aerospace",
    demand: "Moderate Demand",
    description: "Explores heavy steam boiler efficiencies, microchip cooling radiator fins, refrigerator gases, and industrial heat exchangers.",
    subjects: ["Industrial Boiler Dynamics", "Radiator Fin thermodynamics", "Refrigerant fluid chemistry", "Heat Exchanger design"],
    roles: ["Thermal Design Specialist", "HVAC Systems planner", "Energy Boiler Engineer", "Microchip Cooling tester"]
  },
  {
    rank: 75,
    name: "Avionics",
    weight: 0.02,
    category: "Mechanical & Aerospace",
    demand: "Niche / Emerging",
    description: "Specialized computer flight controllers, automatic pilot telemetry systems, black-box electronics, and aircraft radar equipment.",
    subjects: ["Automated Flight controllers", "Black-Box recorder networks", "Aviation radar & telemetry", "Cockpit interface design"],
    roles: ["Avionics Engineer", "Flight Controller programmer", "Aircraft Radar specialist", "Telemetry system assessor"]
  },
  {
    rank: 76,
    name: "Chemistry (Industrial Processes)",
    weight: 0.01,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Focuses on industrial solvent synthesize, bulk petroleum purifications, plastic chemical agents, and factory lab safety models.",
    subjects: ["Solvent Synthesize chemistry", "Petroleum fractionations", "Polymerizing plastic agents", "Hazardous Chemical controls"],
    roles: ["Industrial Chemist", "Chemical QA Analyst", "Petroleum purifier supervisor", "Solvent compound manager"]
  },
  {
    rank: 77,
    name: "Nuclear Engineering",
    weight: 0.01,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Designs radioactive uranium fuel rods, nuclear reactor containment domes, steam-cooling pumps, and radioactive waste shield structures.",
    subjects: ["Uranium Fission dynamics", "Reactor Core heat balance", "Shielding radiation materials", "Radioactive Waste management"],
    roles: ["Nuclear Engineer", "Core Reactor Supervisor", "Radiation Shield designer", "isotope safe-handling analyst"]
  },
  {
    rank: 78,
    name: "Project Management (Technical)",
    weight: 0.01,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Applies agile boards, project schedule algorithms, engineering cost projections, and subcontractor alignment.",
    subjects: ["Agile Gantt & Schedule systems", "Engineering Cost estimation", "Resource allocation models", "Subcontractor coordinate keys"],
    roles: ["Technical Project Manager", "Operations Coordinator", "Cost Analyst Planner", "Subcontractor manager"]
  },
  {
    rank: 79,
    name: "RF & Microwave Engineering",
    weight: 0.01,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Designs 5G cellular antennas, radar microwave wave-guides, and high-frequency wireless receiver chips.",
    subjects: ["RF Antenna layouts", "Microwave wave-guide dynamics", "High-frequency receiver chips", "Electromagnetic interference"],
    roles: ["RF Engineer", "Antenna Design Specialist", "Radar Hardware tuner", "Semiconductor chip reviewer"]
  },
  {
    rank: 80,
    name: "Leather Design (Industrial)",
    weight: 0.01,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Explores hide tanning enzymes, leather stitch durability mechanics, foot-wear sole designs, and automated cutting layouts.",
    subjects: ["Hide Tanning chemical enzymes", "Stitch durability mechanics", "automated hide cutters", "Footwear sole configurations"],
    roles: ["Leather Tannery Supervisor", "Footwear CAD designer", "Apparel Material auditor", "Leather compound tester"]
  },
  {
    rank: 81,
    name: "Construction Management",
    weight: 0.01,
    category: "Civil & Infrastructure",
    demand: "High Demand",
    description: "Administers tower-crane layout schedules, subcontractor agreements, material logistics, and smart building progress metrics.",
    subjects: ["Subcontractor agreements layouts", "Smart Material logistics", "Tower-Crane schedule charts", "Muncipal code inspections"],
    roles: ["Construction Site Manager", "Quantity Surveyor Lead", "Billing Engineer", "Risk Assessment manager"]
  },
  {
    rank: 82,
    name: "Biology (Applied Biotechnology)",
    weight: 0.01,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Explores amino-acid sequences, bacterial protein synthesis, drug cell testing, and organic biomass processing templates.",
    subjects: ["Bacterial protein synthesis", "Drug cell testing procedures", "Organic fuel biomasses", "Structure cytology"],
    roles: ["Applied Biologist", "Pharma research assistant", "Cell culture technologist", "Biomaterial reviewer"]
  },
  {
    rank: 83,
    name: "Tool Engineering",
    weight: 0.01,
    category: "Mechanical & Aerospace",
    demand: "Moderate Demand",
    description: "Designs industrial metal-pressing stamping dies, plastic injection mold outlines, jig setups, and CNC high-speed drills.",
    subjects: ["Stamping Die design layouts", "Injection Mold configurations", "Jig & Fixture geometry", "CNC metal cutting tool path"],
    roles: ["Tool & Die Designer", "CNC Machine Programmer", "Foundry mold calibrator", "Metrology supervisor"]
  },
  {
    rank: 84,
    name: "Geological Engineering",
    weight: 0.01,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Explores subsurface rock drilling cores, seismic fault risk evaluations, landslide preventions, and underground water table dynamics.",
    subjects: ["Subsurface Core Drill analytics", "Seismic Fault evaluations", "Landslide prevention designs", "Hydrology water table mapping"],
    roles: ["Geotechnical Consultant", "Seismic Risk Analyst", "Tunnel Operations expert", "Soil hydration tester"]
  },
  {
    rank: 85,
    name: "Robotics Process Automation",
    weight: 0.01,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Fuses computer scripts, automatic keyboard triggers, data scrape loops, and AI tools to replace manual database tasks.",
    subjects: ["automated data scrape loops", "software RPA key recorders", "Database API triggers", "Enterprise process algorithms"],
    roles: ["RPA Coder", "Enterprise Automation Builder", "Integrations Specialist", "QA Script reviewer"]
  },
  {
    rank: 86,
    name: "Soil & Water Conservation Engineering",
    weight: 0.01,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Constructs soil runoff check dams, intelligent river bank retaining structures, farm water collection systems, and desert irrigation metrics.",
    subjects: ["Soil Runoff check dams", "River Bank retaining equations", "Irrigation collection schemes", "Soil erosion metrics"],
    roles: ["Hydrologist Consultant", "Check-Dam Designer", "Soil Erosion assessor", "Arid Lands planner"]
  },
  {
    rank: 87,
    name: "Dairy Science",
    weight: 0.01,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Analyzes bovine dietary requirements, dairy cow hygiene metrics, raw milk preservation bacteria, and dairy cow wellness charts.",
    subjects: ["Dairy Bovine feeds & nutrition", "dairy bacteria preservation", "milk volume optimizations", "wellness metrics in livestock"],
    roles: ["Dairy Livestock Specialist", "Preservation Expert in Dairy", "Farming Process Optimizer", "Nutrition Compound planner"]
  },
  {
    rank: 88,
    name: "International Business (Technical Logistics)",
    weight: 0,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Manages container shipping sea lines, international cargo customs regulations, regional price hedging, and border tariff structures.",
    subjects: ["Sea Line Container routes", "Customs clearance protocols", "Foreign exchange price hedging", "Border tariff structures"],
    roles: ["Logistics Coordinator", "Sea Operations Analyst", "Customs compliance expert", "Tariff risk planner"]
  },
  {
    rank: 89,
    name: "Engineering Management (Operations)",
    weight: 0,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Explores assembly floor queue mathematics, plant safety laws, equipment maintenance budgets, and layout designs.",
    subjects: ["Assembly Queue simulations", "Industrial Safety law codes", "Equipment maintenance budgets", "factory layout matrices"],
    roles: ["Engineering Manager", "Operations Optimizer", "Cost Auditor Supervisor", "Agile Coordinator"]
  },
  {
    rank: 90,
    name: "Signal Processing",
    weight: 0,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Focuses on mathematical Fast Fourier Transforms (FFT), audio noise reduction filters, radar telemetry code, and biometric data conversions.",
    subjects: ["Fourier Transform calculations", "audio vocal noise filtering", "radar echo processing", "image conversion formats"],
    roles: ["Signal Specialist Advisor", "Audio Software dev", "radar chip programming", "Bio-Signal data modeller"]
  },
  {
    rank: 91,
    name: "Medical Laboratory Technology",
    weight: 0,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Underpins clinical centrifuge calibrations, automated blood testing tubes, cell staining spectrometry devices, and diagnostic codes.",
    subjects: ["Blood centrifuge mechanics", "spectrometrics diagnostic codes", "cell staining biochemistry", "lab hazard containment"],
    roles: ["Lab Equipment designer", "Clinical Instrument tuner", "Biotech Lab Director", "diagnostic assessor"]
  },
  {
    rank: 92,
    name: "SAP CRM (Enterprise Systems)",
    weight: 0,
    category: "CS & Computational",
    demand: "Moderate Demand",
    description: "Configures enterprise client database systems, automated customer support triggers, and sales data tracking tools.",
    subjects: ["SAP CRM data pipelines", "Customer ticket automation", "sales data tracking", "SQL data query boards"],
    roles: ["SAP Developer", "Integrations Specialist", "CRM database admin", "process analyst"]
  },
  {
    rank: 93,
    name: "SAP ERP (Resource Platforms)",
    weight: 0,
    category: "CS & Computational",
    demand: "Moderate Demand",
    description: "Designs enterprise inventory calculations, factory resource schedules, material sourcing ledgers, and database accounting codes.",
    subjects: ["SAP ERP inventory ledger", "factory resource schedules", "sourcing ledger validations", "financial reporting charts"],
    roles: ["SAP ERP Consultant", "Enterprise Sourcing Planner", "systems analyst", "finance controller"]
  },
  {
    rank: 94,
    name: "Business Intelligence Tools",
    weight: 0,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Develops interactive corporate dashboards, real-time sales alert scripts, server database warehouse connections, and KPI charts.",
    subjects: ["Interactive PowerBI/Tableau layouts", "Server warehouse linkages", "KPI data parsing", "sales trends analytics"],
    roles: ["BI Developer", "metrics visualization expert", "database mapper", "Reporting Specialist"]
  },
  {
    rank: 95,
    name: "GeoInformatics",
    weight: 0,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Creates global GPS map coordinate charts, satellite laser scans (LiDAR), land elevation 3D visualizers, and urban boundaries maps.",
    subjects: ["GPS Coordinate maths", "LiDAR Laser Scanning", "3D terrain modelers", "Urban boundaries GIS systems"],
    roles: ["GIS mapping consultant", "LiDAR drone analyst", "Terrain modeling technician", "Boundary assessor"]
  },
  {
    rank: 96,
    name: "Renewable Energy",
    weight: 0,
    category: "Industrial & Management",
    demand: "Critical Demand",
    description: "Focuses on silicon photovoltaic cells, solar panel micro-inverters, wind farm ocean layouts, and battery chemistry storages.",
    subjects: ["Silicon photovoltaic physics", "Solar panel micro-inverters", "Wind turbine aerodynamics", "Battery pack chemical storage"],
    roles: ["Solar Array Engineer", "Wind farm planner", "Battery storage expert", "Green systems inspector"]
  },
  {
    rank: 97,
    name: "Sustainability Management",
    weight: 0,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Underpins factory carbon dioxide calculations, green building certifications, raw recycling loops, and ecological safety logs.",
    subjects: ["Carbon accounting formulas", "Green Building certification rules", "materials recycling loops", "plant ecology audits"],
    roles: ["Sustainability Advisor", "Carbon credit coordinator", "Green Building reviewer", "Environmental log supervisor"]
  },
  {
    rank: 98,
    name: "DevOps",
    weight: 0,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Maintains automated cloud code compile pipelines (CI/CD), Kubernetes container servers, and server log monitors.",
    subjects: ["CI/CD pipeline scripts", "Kubernetes cluster setups", "cloud server metric registers", "Docker container setups"],
    roles: ["DevOps Engineer", "Cloud Infrastructure builder", "Site Reliability Specialist", "Server operations lead"]
  },
  {
    rank: 99,
    name: "Engineering Management (Operations II)",
    weight: 0,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Explores worker ergonomic motion charts, operations queue simulations, raw material supply networks, and risk spreadsheets.",
    subjects: ["worker ergonomic motion metrics", "operations queueing maths", "sourcing supply chains", "risk management planning"],
    roles: ["Operations Coordinator", "Ergonomics analyst", "supply manager", "risk expert"]
  },
  {
    rank: 100,
    name: "HealthCare & Hospital (Systems)",
    weight: 0,
    category: "Industrial & Management",
    demand: "Moderate Demand",
    description: "Deals with hospital ambulance queue models, clinical electronic record logs, medical equipment maintenance cycles, and clinic codes.",
    subjects: ["Hospital queue modelers", "Clinical EHR databases", "Medical machinery maintenance", "Clinic safety regulations"],
    roles: ["Healthcare systems optimizer", "Hospital log administrator", "Equipment check coordinator", "regulatory planner"]
  },
  {
    rank: 101,
    name: "IT & Systems (Corporate Management)",
    weight: 0,
    category: "CS & Computational",
    demand: "High Demand",
    description: "Underpins corporate computer upgrades, cloud system access portals, email system configurations, and office networks.",
    subjects: ["corporate workstation configurations", "cloud system access parameters", "email routing systems", "internal LAN networks"],
    roles: ["Systems Administrator", "IT Helpdesk Specialist", "LAN network controller", "Systems upgrade lead"]
  },
  {
    rank: 102,
    name: "Silk Technology",
    weight: 0,
    category: "Civil & Infrastructure",
    demand: "Niche / Emerging",
    description: "Explores silkworm cocoon preservation, automatic silk unraveling reels, fabric weaving looms, and dye chemical kinetics.",
    subjects: ["Cocoon preservation biology", "Automatic silk unraveling reels", "Fabric weaving looms", "dye chemical binders"],
    roles: ["Silk processing supervisor", "Weaving loom engineer", "Dyeing quality expert", "Textile sourcing specialist"]
  },
  {
    rank: 103,
    name: "UI / UX (Product Front-End Engineering)",
    weight: 0,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Designs interactive mobile page layouts, web wireframes, visual click maps, user interviews, and custom buttons.",
    subjects: ["Interactive phone UI wireframes", "website click maps tracking", "user persona analysis", "Figma design to CSS setups"],
    roles: ["UI/UX Designer", "Front-end Interface Programmer", "Product Interaction modeller", "visual layout specialist"]
  },
  {
    rank: 104,
    name: "Forensic Medical Science (Biochemical Systems)",
    weight: 0,
    category: "Biotech & Chemical",
    demand: "Niche / Emerging",
    description: "Designs medical toxic substance tests, blood splatter trajectory mechanics, trace chemicals spectroscopy, and forensics logs.",
    subjects: ["toxic substance test chemistry", "splatter trajectory equations", "spectrometric analysis", "biological evidence logs"],
    roles: ["Forensic Lab analyst", "splatter trajectory consultant", "spectroscopic technician", "medical log coordinator"]
  },
  {
    rank: 105,
    name: "iOS (Mobile Application Engineering)",
    weight: 0,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Specialized mobile software building using Apple Swift programming, Xcode simulators, and local CoreData storage files.",
    subjects: ["Swift Language standards", "Xcode Simulator tests", "CoreData local storage", "App Store deployment guides"],
    roles: ["iOS App Developer", "Mobile client architect", "Swift testing analyst", "mobile deployment executive"]
  },
  {
    rank: 106,
    name: "Fintech (Financial Systems Engineering)",
    weight: 0,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Fuses secure payment endpoints, bank ledger cryptography, algorithmic micro-loans, and credit scoring modelers.",
    subjects: ["Secure payment gateway endpoints", "bank ledger cryptography", "algorithmic microlending logic", "credit scoring models"],
    roles: ["Fintech Developer", "Payment security expert", "ledger controller", "finance quantitative modeler"]
  },
  {
    rank: 107,
    name: "Agriculture (Systems Automation)",
    weight: 0,
    category: "Civil & Infrastructure",
    demand: "Moderate Demand",
    description: "Provisions soil moisture tracking sensors, drone layout cameras, automatic water valves, and hydroponic nutrient mixers.",
    subjects: ["moisture tracking sensors", "drone inspection cameras", "hydroponic nutrient mixers", "automatic irrigation control"],
    roles: ["Agri-systems engineer", "drone farm map analyst", "moisture sensor technician", "irrigation automator"]
  },
  {
    rank: 108,
    name: "Electronics (Applied Equipment)",
    weight: 0,
    category: "Electronics & Controls",
    demand: "High Demand",
    description: "Focuses on analog voltage oscilloscopes, hardware circuit soldering, electrical components test boards, and battery supplies.",
    subjects: ["Analog oscilloscope operations", "PCB board soldering setups", "electrical components test logs", "battery voltage circuits"],
    roles: ["Electronics Assembler", "circuit board repairer", "Applied electronics advisor", "test rig tuner"]
  },
  {
    rank: 109,
    name: "Pulp & Paper Technology",
    weight: 0,
    category: "Biotech & Chemical",
    demand: "Moderate Demand",
    description: "Examines wood chemical bleaching boilers, paper press rolling machines, sewage water treatment, and packaging durability.",
    subjects: ["wood chemical bleaching kinetics", "paper press rolling configurations", "refinery water filtration", "packaging load limits"],
    roles: ["Pulp processing supervisor", "paper press technician", "ecological filter manager", "pack load inspector"]
  },
  {
    rank: 110,
    name: "Ethical Hacking",
    weight: 0,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Undergoes authorized system network hacking tests, server log checking, password crack audits, and cellular security logs.",
    subjects: ["Network injection scripts", "authorised server log breaches", "password strength checkers", "WIFI vulnerability audits"],
    roles: ["Ethical Hacker", "Security analyst", "penetration assessor", "incident auditor"]
  },
  {
    rank: 111,
    name: "Cybersecurity & Network Defense",
    weight: 98,
    category: "CS & Computational",
    demand: "Critical Demand",
    description: "Focuses on securing enterprise networks, penetration testing, ethical hacking, and advanced threat detection protocols.",
    subjects: ["Penetration Testing", "Network Forensics", "Cryptography", "Security Architecture"],
    roles: ["Cybersecurity Analyst", "Network Security Engineer", "Ethical Hacker", "Security Consultant"]
  },
  {
    rank: 112,
    name: "Renewable Energy Engineering",
    weight: 93,
    category: "Electronics & Controls",
    demand: "Critical Demand",
    description: "Specializes in design, optimization, and control of solar PV, wind turbine systems, grid-integrated storage, and sustainable power electronics.",
    subjects: ["PV System Design", "Wind Energy Mechanics", "Energy Storage Technologies", "Power Electronics"],
    roles: ["Renewable Energy Engineer", "Solar Systems Designer", "Wind Farm Analyst", "Power Systems Consultant"]
  },
  {
    rank: 113,
    name: "Silk Technology",
    weight: 0,
    category: "Industrial & Management",
    demand: "Niche / Emerging",
    description: "A specialized study of Silk Technology, covering fundamentals and applications.",
    subjects: ["Fundamental Principles", "Advanced Applications", "Case Studies", "Industry Projects"],
    roles: ["Specialist", "Consultant", "Engineer"]
  },
  {
    rank: 114,
    name: "UI / UX",
    weight: 0,
    category: "Industrial & Management",
    demand: "Niche / Emerging",
    description: "A specialized study of UI / UX, covering fundamentals and applications.",
    subjects: ["Fundamental Principles", "Advanced Applications", "Case Studies", "Industry Projects"],
    roles: ["Specialist", "Consultant", "Engineer"]
  }
];
