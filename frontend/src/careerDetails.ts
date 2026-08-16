import { DegreeFact } from './components/StreamsList';

// This file maps specialized vocational, diploma, ITI, and paramedical career prospects to detailed profiles
// to avoid fallback to standard academic degrees.

export const CAREER_DETAILS_MAP: Record<string, DegreeFact> = {
  // --- ITI ELECTRICIAN ---
  "statepowergridlineman": {
    name: "State Power Grid Lineman",
    fullName: "State Power Grid Lineman & Substation Operator",
    duration: "Direct Entry / 1-Year Apprenticeship",
    overview: "State Power Grid Linemen are responsible for laying, installing, maintaining, and emergency-repairing the high-voltage overhead and underground electrical lines that power urban and rural zones. This high-stability role offers robust public service security and hazard compensation.",
    keySubjects: ["High-Voltage Line Jointing", "Power Pole & Tower Safety Harnessing", "Transformer Installation & Safe Isolations", "Substation Switchgear Operations", "Emergency Grid Fault Restoration Protocols"],
    topColleges: ["State Electricity Boards (BESCOM, KPTCL, TNEB, MSEDCL)", "Power Grid Corporation of India (PGCIL)", "Indian Railways (Electrical Division)", "Heavy Electrical PSUs (BHEL, NTPC)"],
    industryRoles: ["Grid Patrol Lead", "Substation Control Desk In-charge", "Senior Lines Safety Officer", "Electrical Contractor Grade-A"],
    avgSalary: "₹3.2 Lakhs - ₹7.0 Lakhs per annum (with overtime & hazard pay)",
    higherStudies: ["AMIE Section A & B Exams (B.Tech Equivalent)", "Class-A Electrical Contractor Licensing", "Diploma in Electrical Engineering (Lateral Entry)"]
  },
  "factoryelectricalassistant": {
    name: "Factory Electrical Assistant",
    fullName: "Industrial Plant Electrical Maintenance Specialist",
    duration: "Immediate Direct Craft Entry",
    overview: "Responsible for keeping large-scale industrial manufacturing machinery running smoothly. Assists senior electrical engineers in routine motor checks, preventive line servicing, cabinet wiring, and electrical panel debugging to prevent expensive downtime.",
    keySubjects: ["Industrial Panel Assembly & Cabling", "AC/DC Motor Overhauling", "Programmable Logic Controllers (PLC) Basics", "Industrial Preventive Maintenance Schedules", "Occupational Safety and Health (OSHA) Norms"],
    topColleges: ["Tata Motors Ltd.", "Larsen & Toubro (L&T) Manufacturing Division", "Reliance Industries Plants", "Aditya Birla Group Production units"],
    industryRoles: ["Lead Plant Electrician", "Automation Maintenance Supervisor", "Shift Electrical Maintenance In-charge"],
    avgSalary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
    higherStudies: ["Advanced Industrial Automation & SCADA Certifications", "Diploma in Electrical & Electronics Engineering (Part-Time)"]
  },
  "electricalshopowner": {
    name: "Electrical Shop Owner",
    fullName: "Electrical Retailing, Sourcing & Contracting Entrepreneur",
    duration: "Self-Employment Startup",
    overview: "Empowers ITI graduates to run an independent enterprise sourcing electrical hardware, wiring, switches, and home appliances, while providing licensed contracting services for housing projects and commercial installations.",
    keySubjects: ["Retail Store Inventory Management", "Local Electrical Wiring Contracting Sourcing", "Taxation, GST & Small Business Bookkeeping", "Customer Care and Troubleshooting Assistance", "Electrical Equipment Brand Dealership Sourcing"],
    topColleges: ["Local Residential Housing Associations", "Commercial Real Estate Contracting Agencies", "Havells, Polycab, and Legrand Dealership Networks"],
    industryRoles: ["Proprietor & Principal Contractor", "Authorized System Dealership Lead", "Local Smart-Home Integration Specialist"],
    avgSalary: "₹4.5 Lakhs - ₹15.0 Lakhs per annum (highly dependent on scale & location)",
    higherStudies: ["Class-B/Class-A Government Electrical Contractor License", "Small Business Management & Digital Bookkeeping Programs"]
  },
  "hsewiringlead": {
    name: "HSE Wiring Lead",
    fullName: "Health, Safety & Environment (HSE) Electrical Wiring Inspector",
    duration: "1-2 Years Post-ITI Experience",
    overview: "Crucial regulatory role in industrial construction sites and corporate towers. Ensures all building cabling, earthing pits, and high-voltage panels comply strictly with national and global safety regulations to prevent fire and shock hazards.",
    keySubjects: ["National Electrical Code (NEC) Compliance", "Industrial Earthing & Lightning Protection Systems", "Infrared Thermal Imaging Diagnostics", "Lockout-Tagout (LOTO) Safety Protocols", "Fire and Flame Retardant Cabling Audits"],
    topColleges: ["Larsen & Toubro (L&T) Construction", "Shapoorji Pallonji Real Estate Division", "Global Tech Parks Maintenance (Jones Lang LaSalle, CBRE)", "HSE Regulatory Boards"],
    industryRoles: ["Chief Electrical Safety Inspector", "Project Safety Advisor", "EHS Compliance Manager (after graduation)"],
    avgSalary: "₹3.6 Lakhs - ₹7.5 Lakhs per annum",
    higherStudies: ["NEBOSH Safety Certifications", "OSHA Industrial Compliance Standards", "Diploma in Fire & Safety Engineering"]
  },

  // --- ITI FITTER ---
  "locomotiveenginefitter": {
    name: "Locomotive Engine Fitter",
    fullName: "Railway Locomotive Engine & Bogie Fitter Specialist",
    duration: "1-Year Railway Apprenticeship",
    overview: "Performs critical heavy structural maintenance on high-speed diesel and electric train engines. Aligns heavy crankshafts, inspects pneumatic wheel brake sets, and fits steel motor suspensions to guarantee railway safety.",
    keySubjects: ["Heavy Locomotive Mechanical Alignment", "High-Pressure Pneumatic Brake Systems", "Engine Valve Calibration & Timing", "Precision Hydraulic Jack Sourcing", "Heavy Metallurgy and Steel Tolerances"],
    topColleges: ["Indian Railways Workshop Divisions", "Bharat Earth Movers Limited (BEML)", "Chittaranjan Locomotive Works (CLW)", "Metro Rail Corporations (Namma Metro, DMRC)"],
    industryRoles: ["Senior Workshop Fitter", "Locomotive Maintenance Lead", "Section Engineer Assistant"],
    avgSalary: "₹3.5 Lakhs - ₹7.2 Lakhs per annum (with standard railway allowances)",
    higherStudies: ["Railway departmental examinations for promotion", "Diploma in Mechanical Engineering (Lateral Entry)"]
  },
  "plantmachineryassembler": {
    name: "Plant Machinery Assembler",
    fullName: "Industrial Machinery Sizing & Assembly Craftsman",
    duration: "Immediate Direct Entry",
    overview: "Reads complex 2D blueprint schematics to size, align, bolt, and weld massive automated assembly line units, hydraulic presses, and manufacturing equipment inside high-performance heavy factories.",
    keySubjects: ["Industrial Structural Blueprints Analysis", "Precision Micrometers & Vernier Gauges", "Hydraulic & Pneumatic Systems Assembly", "Torque and Tensioning Controls", "Heavy Machinery Grouting and Foundation Levelling"],
    topColleges: ["Bosch Limited", "L&T Heavy Engineering", "Bharat Heavy Electricals Limited (BHEL)", "Automotive OEMs (Hyundai, Maruti Suzuki)"],
    industryRoles: ["Assembly Line Lead Supervisor", "Precision Maintenance Expert", "Plant Quality Control Inspector"],
    avgSalary: "₹2.6 Lakhs - ₹5.5 Lakhs per annum",
    higherStudies: ["CNC Machining Specializations", "Diploma in Manufacturing Engineering (Lateral Entry)"]
  },
  "automotivefabricationhelper": {
    name: "Automotive Fabrication Helper",
    fullName: "Automotive Structural Fabrication & Assembly Craftsman",
    duration: "Immediate Direct Entry",
    overview: "Assists heavy automotive fabrication teams in building chassis frames, aligning structural body panels, and ensuring precise structural integrity of transport vehicles.",
    keySubjects: ["Automotive Chassis Geometry", "Spot Welding and Arc Joints", "Structural Alignment Inspection", "Heavy Hydraulic Press Controls", "Automotive Assembly Line Workflow"],
    topColleges: ["Mahindra & Mahindra", "Tata Motors Assembly Plants", "Ashok Leyland Factories", "Toyota Kirloskar Motors"],
    industryRoles: ["Lead Chassis Fabricator", "Assembly Line Team Lead", "Quality Inspection Inspector"],
    avgSalary: "₹2.4 Lakhs - ₹5.0 Lakhs per annum",
    higherStudies: ["Advanced Automobile Body Fabrication & Styling Courses", "Diploma in Automobile Engineering"]
  },

  // --- ITI WELDER ---
  "sitewelder": {
    name: "Site Welder",
    fullName: "Structural Construction Site Welder & Fabricator",
    duration: "Immediate Direct Entry",
    overview: "Performs heavy-duty manual arc, MIG, and TIG welding on construction sites. Bridges steel girders, secures overhead crane rails, and ensures the structural integrity of high-rise buildings and bridges.",
    keySubjects: ["Shielded Metal Arc Welding (SMAW)", "MIG / TIG Gas Configuration", "Structural Steel Welding Positions", "Blueprint Welder Symbols", "High-Altitude Construction Safety"],
    topColleges: ["DLF Construction", "L&T Infra Division", "Tata Projects Ltd", "Bridge and Roof Co. India"],
    industryRoles: ["Certified Site Welder", "Structural Lead Welder", "Welding Safety Auditor"],
    avgSalary: "₹2.5 Lakhs - ₹5.6 Lakhs per annum",
    higherStudies: ["American Welding Society (AWS) Welder Certification", "Nondestructive Testing (NDT) Level-I Certifications"]
  },
  "pipeweldingspecialist": {
    name: "Pipe-Welding Specialist",
    fullName: "High-Pressure Piping & Pipeline Welder Specialist",
    duration: "1-2 Years Specialized Training",
    overview: "Highly skilled, high-precision craftsman joining critical pipes in chemical plants, refineries, and trans-continental gas lines. Demands flawless weld joints to survive extreme pressures without leaks.",
    keySubjects: ["High-Pressure Tube Joints (6G Position)", "Argon TIG Welding Procedures", "Industrial Radiographic Joint Testing (RT)", "Alloy Steel Thermal Preparation", "Pipeline Purging Standards"],
    topColleges: ["Indian Oil Corporation (IOCL)", "Reliance Jamnagar Refinery", "GAIL India Limited", "ONGC Offshore Platforms"],
    industryRoles: ["Master Offshore Pipeline Welder", "Piping Lead Quality Inspector", "NDT Pipeline Supervisor"],
    avgSalary: "₹4.0 Lakhs - ₹10.5 Lakhs per annum (Offshore roles go higher)",
    higherStudies: ["CSWIP 3.1 Welding Inspector Certificate", "NDT Level-II Radiography & Ultrasonic Testing"]
  },
  "shipyardtechhelper": {
    name: "Shipyard Tech Helper",
    fullName: "Marine Shipyard Steel Fabrication Assistant",
    duration: "Immediate Direct Entry",
    overview: "Assists master marine shipwrights in fabricating heavy steel hulls, submarine compartments, and drydock repair structures under high-humidity safety environments.",
    keySubjects: ["Heavy Marine Plate Welding", "Flux Cored Arc Welding (FCAW)", "Ship Hull Alignment Checklists", "Gas/Plasma Cutting Operations", "Confined Spaces Safety Protocols"],
    topColleges: ["Cochin Shipyard Limited (CSL)", "Mazagon Dock Shipbuilders (MDL)", "Garden Reach Shipbuilders (GRSE)", "Hindustan Shipyard Visakhapatnam"],
    industryRoles: ["Marine Fabricator", "Drydock Supervisor", "Shipbuilding Section In-charge"],
    avgSalary: "₹2.8 Lakhs - ₹6.0 Lakhs per annum",
    higherStudies: ["Marine Welder Certifications", "Diploma in Shipbuilding Engineering"]
  },
  "fabricationshopoperator": {
    name: "Fabrication Shop Operator",
    fullName: "Boutique Metal Fabrication & Design Entrepreneur",
    duration: "Self-Employment Startup",
    overview: "Allows welders to establish independent workshops designing and building decorative iron gates, modern steel staircases, custom structural framing, and industrial storage racking.",
    keySubjects: ["Architectural Metal Design Plans", "Metal Lathe and Bending Operations", "Small Shop Machinery Costing", "Aesthetic Powder Coating & Anti-Rust", "Boutique Store B2B Marketing"],
    topColleges: ["Local Civil Developers & Contractors", "Architectural Interior Agencies", "Industrial Equipment Fabricators"],
    industryRoles: ["Proprietor & Principal Fabricator", "Structural Contracting Lead", "Boutique Metalwork Consultant"],
    avgSalary: "₹3.6 Lakhs - ₹12.0 Lakhs per annum (highly dependent on contracts)",
    higherStudies: ["Class-C Government PWD Contractor License", "Metal CNC Laser Cutting Automation Certifications"]
  },

  // --- ITI DIESEL MECHANIC ---
  "locomotiveassistant": {
    name: "Locomotive Assistant",
    fullName: "Assistant Loco Pilot (ALP) - Indian Railways",
    duration: "Requires clearing RRB ALP Exam",
    overview: "Serves as the crucial co-pilot inside high-speed trains. Monitors engine dial parameters, manages emergency brake valves, reviews track safety signals, and assists the driver during intensive long-distance hauling.",
    keySubjects: ["Railway Signal System Reading", "Locomotive Engine Diagnostic Dials", "Pneumatic & Vacuum Train Brakes", "Railway Route Operations Manual", "High-Stress Vigilance & Safety Drills"],
    topColleges: ["Indian Railways (Various Divisions)", "Central Railway Locomotive Depots", "Urban Rapid Rail Transit Systems"],
    industryRoles: ["Loco Pilot (Goods Trains)", "Passenger Loco Pilot", "Senior Passenger Train Commander"],
    avgSalary: "₹4.5 Lakhs - ₹9.0 Lakhs per annum (highly boosted by running mileage allowances)",
    higherStudies: ["Internal RRB Departmental Examinations", "Railway Technical Supervisor Exams"]
  },
  "marinedeckmotorhelper": {
    name: "Marine Deck Motor Helper",
    fullName: "Marine Inboard/Outboard Heavy Motor Assistant",
    duration: "Immediate Direct Entry",
    overview: "Assists ship engineering teams in checking deep marine cooling lines, grease calibration of heavy rudders, and maintaining engine oil pressures on shipping vessels and fishing fleets.",
    keySubjects: ["Marine Cooling Water Loops", "Marine Engine Lubricant Chemistry", "Outboard Motor Fuel Pumps", "Pneumatic Starter Systems", "Marine Vessel Safety Protocols"],
    topColleges: ["Adani Ports & SEZ", "Merchant Navy Operations", "State Fisheries Departments", "Private Shipping Corporations"],
    industryRoles: ["Marine Deck Mechanic", "Port Vessel Operator", "Inland Marine Engineering Supervisor"],
    avgSalary: "₹3.2 Lakhs - ₹6.5 Lakhs per annum",
    higherStudies: ["Marine Engineering Specializations", "Direct entry to Merchant Navy Rating courses"]
  },
  "heavytruckmechanic": {
    name: "Heavy Truck Mechanic",
    fullName: "Heavy Commercial Vehicle Engine & Powertrain Fitter",
    duration: "Immediate Direct Entry",
    overview: "Maintains high-tonnage heavy commercial trucks, buses, and cement mixing vehicles. Specializes in disassembling massive diesel blocks, swapping worn gearboxes, and repairing air-compressor brakes.",
    keySubjects: ["Heavy Diesel Cylinder Blocks Overhauling", "Multi-Speed Gearbox Splicing", "Heavy Air-Brake Air Lines", "Vehicle Wheel Alignments & Hub Greasing", "On-Board Diagnostics (OBD-II) Scanning"],
    topColleges: ["Tata Motors Service Depots", "Ashok Leyland Commercial Network", "Volvo Trucks Service Depots", "State Road Transport Corporations (KSRTC, BMTC, BEST)"],
    industryRoles: ["Lead Commercial Fleet Mechanic", "Service Depot Quality Advisor", "Commercial Fleet Workshop In-charge"],
    avgSalary: "₹2.8 Lakhs - ₹6.0 Lakhs per annum",
    higherStudies: ["Electronic Fuel Injection (EFI) Diagnostic Specializations", "Diploma in Mechanical Engineering"]
  },
  "generatorsupervisor": {
    name: "Generator Supervisor",
    fullName: "Industrial DG Set Operator & Power Backup Supervisor",
    duration: "Immediate Direct Entry",
    overview: "Critical maintenance role inside high-density server farms, hospitals, and heavy factories. Ensures massive standby diesel generator sets (DG) start up instantly during main grid failures.",
    keySubjects: ["DG Engine Automatic Starting Relays", "Alternator Voltage Calibrations", "Heavy Fuel Feed Lines & Filters", "Standby Battery Management", "Soundproofing Decibel Audits"],
    topColleges: ["Cummins India Ltd.", "Kirloskar Oil Engines Service Network", "Cat/GMMCO Generator Networks", "Data Centers (AdaniConneX, CtrlS)"],
    industryRoles: ["Power Infrastructure Lead", "Facility Backup Manager", "Service Engineer (Generator OEM)"],
    avgSalary: "₹3.0 Lakhs - ₹6.5 Lakhs per annum",
    higherStudies: ["Industrial Generator Synchronization and PLC Automation Certifications"]
  },

  // --- ITI MACHINIST ---
  "precisionmachinist": {
    name: "Precision Machinist",
    fullName: "Precision Metal Shaping & Machinery Specialist",
    duration: "Immediate Direct Entry",
    overview: "Uses high-pressure machine tools like industrial mills, shapers, and gear hobbing equipment to craft complex, close-tolerance steel components for aerospace, defense, and automation platforms.",
    keySubjects: ["Mechanical Engineering Blueprint Schematics", "Industrial Milling and Shaping Tools", "High-Precision Thread Cutting", "Index Plate Calculations", "Metrology (Verniers, Micro-Gauges)"],
    topColleges: ["Hindustan Aeronautics Limited (HAL)", "Bharat Electronics Limited (BEL)", "Isro Satellite Center Workshops", "Private Precision Machining Hubs"],
    industryRoles: ["Master Toolmaker", "Precision Workshop Supervisor", "Quality Control Inspector"],
    avgSalary: "₹3.0 Lakhs - ₹6.5 Lakhs per annum",
    higherStudies: ["Advanced CNC Programming Certifications", "Diploma in Precision Manufacturing Engineering"]
  },
  "cnctoolmaker": {
    name: "CNC Toolmaker",
    fullName: "Computer Numerical Control (CNC) Programmer & Operator",
    duration: "1-Year CNC Specialization",
    overview: "Bridges the gap between physical metalwork and digital technology. Programs and runs massive multi-axis CNC machines to cut steel blocks into precision moulds, engine parts, and aeronautical frames.",
    keySubjects: ["G-Code & M-Code Programming", "Tool Path Coordinate Calculations (X, Y, Z)", "CAD/CAM Software Basics (Mastercam, Fusion 360)", "Machining Speeds & Feeds Optimization", "CNC Controller Operation (Fanuc, Siemens)"],
    topColleges: ["Centres of Excellence in Advanced Manufacturing", "HAL Engine Division", "BFW (Bharat Fritz Werner)", "Automotive Powertrain Plants"],
    industryRoles: ["CNC Programmer", "Lead Automation Machinist", "CAM Design Engineer Assistant"],
    avgSalary: "₹3.5 Lakhs - ₹7.8 Lakhs per annum",
    higherStudies: ["Advanced Post-Diploma in Tool, Die & Mould Designing"]
  },
  "industrialgearassembler": {
    name: "Industrial Gear Assembler",
    fullName: "Heavy Transmission & Gearbox Assembly Fitter",
    duration: "Immediate Direct Entry",
    overview: "Specializes in assembling, calibrating, and quality-testing complex gear transmissions, planetary drives, and power reduction units used in steel mills, cement plants, and wind turbines.",
    keySubjects: ["Gear Profile Tolerances & Clearances", "High-Torque Bearing Installation", "Transmission Gasket Sealants", "Hydraulic Backlash Testing", "Lubricant Viscosity Checklists"],
    topColleges: ["Shanthi Gears Limited", "Flender Drives (Siemens Group)", "L&T Transmission Workshop", "Heavy Machinery Manufacturing Sites"],
    industryRoles: ["Gearbox Overhaul Expert", "Transmission Line Quality Lead", "Industrial Drives Supervisor"],
    avgSalary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
    higherStudies: ["Industrial Lubrication & Vibration Analysis Certifications"]
  },
  "machineryshopexpert": {
    name: "Machinery Shop Expert",
    fullName: "Precision Tool Sourcing & Workshop Entrepreneur",
    duration: "Self-Employment Startup",
    overview: "Empowers machinists to launch customized metal-shaping centers, fabrication tools outlets, or machinery job-work shops servicing local engineering clusters.",
    keySubjects: ["B2B Machinery Job Contracting Sourcing", "Workshop Layout & Power Load Setup", "Equipment Leasing & Tool Costing", "Digital Marketing for Local Factories", "Quality Tolerances Certification (ISO 9001)"],
    topColleges: ["Industrial Cluster Districts", "Medium & Small Enterprise Development", "State Industrial Area Networks"],
    industryRoles: ["Proprietor & Principal Machinist", "Workshop Engineering Lead", "Subcontractor Consultant"],
    avgSalary: "₹4.5 Lakhs - ₹15.0 Lakhs per annum (highly dependent on contracts)",
    higherStudies: ["Micro, Small & Medium Enterprises (MSME) Business Certifications"]
  },

  // --- ITI ELECTRONIC MECHANIC ---
  "electronicsrepairoperative": {
    name: "Electronics Repair Operative",
    fullName: "Industrial & Consumer Electronics Repair Specialist",
    duration: "Immediate Direct Entry",
    overview: "Specializes in repairing microelectronic devices, including LED displays, computer motherboards, solar inverters, and industrial sensor units, ensuring efficient repair cycles.",
    keySubjects: ["Micro-Soldering & SMD Component Desoldering", "Oscilloscope Waveform Interpretations", "Relational Circuit Path Tracing", "Microcontroller Flashing Procedures", "Component Testing (MOSFETs, ICs)"],
    topColleges: ["Samsung Customer Support Service Networks", "Wipro Consumer Care Centers", "Solar Panel Inverter Assembly Plants", "Private IT Hardware Diagnostics Labs"],
    industryRoles: ["Master Repair Specialist", "Service Center Floor In-charge", "Electronic Hardware Inspector"],
    avgSalary: "₹2.5 Lakhs - ₹5.5 Lakhs per annum",
    higherStudies: ["Advanced Mobile Hardware & Laptop Diagnostics Certifications", "Diploma in Electronics (Lateral Entry)"]
  },
  "qualitytesterhelper": {
    name: "Quality Tester Helper",
    fullName: "Electronics Assembly Quality Control Inspector",
    duration: "Immediate Direct Entry",
    overview: "Monitors electronics factory production lines, ensuring printed circuit board assemblies (PCBA) comply with strict quality guidelines and are free from soldering defects before final packaging.",
    keySubjects: ["IPC-A-610 Electronics Acceptability Standards", "Automated Optical Inspection (AOI)", "Multimeter and Insulation Testing", "ESD (Electrostatic Discharge) Safety Protocols", "Defect Logging & Quality Auditing"],
    topColleges: ["Bharat Electronics Limited (BEL)", "Foxconn (Electronics Manufacturing Service)", "Salcomp India Plants", "Centum Electronics Ltd"],
    industryRoles: ["Lead Quality Inspector", "Solder Process Engineer Assistant", "Reliability Test Supervisor"],
    avgSalary: "₹2.4 Lakhs - ₹5.0 Lakhs per annum",
    higherStudies: ["Six Sigma Green Belt for Electronics Manufacturing"]
  },
  "subcomponentassembler": {
    name: "Sub-component Assembler",
    fullName: "High-Volume Microelectronics Assembly Operator",
    duration: "Immediate Direct Entry",
    overview: "Runs precise automated pick-and-place component machines, reflow soldering ovens, and manual wiring harnesses to produce commercial power supplies, telecommunication cards, and smart sensors.",
    keySubjects: ["SMT Assembly Machine Operations", "Wiring Harness Cable Management", "Soldering Temperature Profiling", "Product Assembly Instructions Schematics", "Precision Electronic Tool Handling"],
    topColleges: ["Dixon Technologies Ltd", "Syrma SGS Technology Plants", "Sanmina Corporation", "Automotive Electronic Component Suppliers"],
    industryRoles: ["SMT Line Lead Operator", "Assembly Section In-charge", "Electronic Production Supervisor"],
    avgSalary: "₹2.2 Lakhs - ₹4.5 Lakhs per annum",
    higherStudies: ["Industrial Robotics & PLC Integration Specialist Courses"]
  },

  // --- ITI INSTRUMENT MECHANIC ---
  "refinerycalibrationlead": {
    name: "Refinery Calibration Lead",
    fullName: "Petrochemical & Process Plant Instrument Calibration Lead",
    duration: "1-2 Years Refinery Experience",
    overview: "A highly specialized safety role. Calibrates gas flowmeters, chemical pressure sensors, and automatic shutoff safety valves to prevent catastrophic leaks in refineries and heavy chemical plants.",
    keySubjects: ["Process Loop Calibration (4-20mA)", "Industrial Valve Actuator Testing", "HART Protocol Diagnostic Tools", "Hazardous Area Safety Compliance (ATEX)", "Distributive Control Systems (DCS) Interfaces"],
    topColleges: ["Reliance Jamnagar Petrochemical Complex", "Indian Oil Refineries", "Bharat Petroleum Complexes", "Mangalore Refinery and Petrochemicals Limited (MRPL)"],
    industryRoles: ["Chief Calibration Supervisor", "Process Safety Control Inspector", "DCS Panel Operator Assistant"],
    avgSalary: "₹3.8 Lakhs - ₹8.5 Lakhs per annum",
    higherStudies: ["Advanced Instrument Automation & SCADA Systems", "Diploma in Instrumentation & Control"]
  },
  "instrumentspecialist": {
    name: "Instrument Specialist",
    fullName: "Industrial Automation Instrumentation Specialist",
    duration: "Immediate Direct Entry",
    overview: "Configures, programs, and repairs the pneumatic dials, electronic level sensors, and thermodynamic temperature probes that automate massive industrial manufacturing plants.",
    keySubjects: ["Pneumatic Control Loops & Regulators", "RTD & Thermocouple Calibrations", "Smart Digital Transmitter Setup", "P&ID Schematic Reading", "PLC Input/Output Card Troubleshooting"],
    topColleges: ["Yokogawa India Service Team", "Honeywell Automation Services", "Siemens Process Divisions", "ABB Instrumentation Networks"],
    industryRoles: ["Automation Field Service Specialist", "Control Systems Specialist", "Lead Instrument Advisor"],
    avgSalary: "₹3.0 Lakhs - ₹6.8 Lakhs per annum",
    higherStudies: ["Instrumentation Systems Engineering Postgraduate Certifications"]
  },
  "controlroomtechnicianhelper": {
    name: "Control Room Technician Helper",
    fullName: "Control Room Operations & Alarm Monitoring Assistant",
    duration: "Immediate Direct Entry",
    overview: "Assists control room engineers in monitoring SCADA and DCS dashboards, checking remote temperature anomalies, and responding to system alarm flags.",
    keySubjects: ["DCS Alarm Logs Interpretation", "Remote Process Parameter Checks", "Emergency Trip System Triggers", "Control Room Communications Protocol", "Digital Log Book Archiving"],
    topColleges: ["NTPC Power Plants", "GAIL Gas Distribution Centers", "Chemical Process Industries", "Pharmaceutical Cleanrooms"],
    industryRoles: ["Lead DCS Console Operator", "Control Room Superintendent Assistant", "Automation Systems Engineer Assistant"],
    avgSalary: "₹2.8 Lakhs - ₹5.8 Lakhs per annum",
    higherStudies: ["DCS/SCADA Systems Advanced Configurations Courses"]
  },

  // --- ITI TURNER ---
  "turnerlathemaker": {
    name: "Turner Lathemaker",
    fullName: "Heavy-Duty Lathe Turning Machinist & Toolmaker",
    duration: "Immediate Direct Entry",
    overview: "Master of metal-cutting lathe equipment. Operates heavy rotating chucks to cut steel cylinders, manufacture engine axle shafts, cut custom screw threads, and prepare precise steel bearing fits.",
    keySubjects: ["Conventional Heavy Lathe Operations", "Cylindrical Taper Calculations", "Precision Axle Thread Cutting", "Bearing Fit Allowances & Tolerances", "Metal Lathe Tool Grinding (HSS/Carbide)"],
    topColleges: ["HAL Aircraft Manufacturing Division", "Indian Railways Wheel & Axle Plant Yelahanka", "Steel Authority of India (SAIL)", "Heavy Engineering Workshops"],
    industryRoles: ["Lead Lathe Craftsman", "Precision Turnery Supervisor", "Machine Tool Maintenance In-charge"],
    avgSalary: "₹2.8 Lakhs - ₹6.2 Lakhs per annum",
    higherStudies: ["CNC Lathe Turning and CAM Specializations", "Diploma in Mechanical Engineering"]
  },
  "industrialproductionmachinist": {
    name: "Industrial Production Machinist",
    fullName: "High-Volume Shaft & Cylinder Turning Operator",
    duration: "Immediate Direct Entry",
    overview: "Operates automated tool systems to shape massive batches of metal shafts, rotating gears, and pistons used in pump, tractor, and agricultural machinery production lines.",
    keySubjects: ["High-Volume Production Jig Setup", "Feed and Speed Rate Optimization", "Coolant Flow & Metal Chip Management", "ISO Dimensional Accuracy Auditing", "Machining Defect Diagnostics"],
    topColleges: ["Swaraj Tractors Ltd", "Kirloskar Brothers Pump Plants", "Tractor Engineers Limited", "Local Auto Component Hubs"],
    industryRoles: ["Production Line Machining Lead", "Machinery Tooling In-charge", "Machining Shop Floor Planner"],
    avgSalary: "₹2.5 Lakhs - ₹5.5 Lakhs per annum",
    higherStudies: ["Modern CNC Machining Center Operators Certificate"]
  },
  "enginecomponentassembler": {
    name: "Engine Component Assembler",
    fullName: "Rotational Engine Shaft & Gearbox Fitter",
    duration: "Immediate Direct Entry",
    overview: "Assembles heavy high-rpm engine shafts, balancing flywheels, connecting rods, and transmission casings, ensuring seamless structural rotation with zero vibration.",
    keySubjects: ["Flywheel Dynamic Balance Alignments", "Precision Bearing Press Fitting", "Connecting Rod Tolerances Verification", "Torque Wrench Calibration Guides", "Engine Vibration Checking Protocols"],
    topColleges: ["Cummins Engine Workshops", "Tata Motors Engine Plants", "BEML Heavy Transmissions", "Greaves Cotton Engines"],
    industryRoles: ["Lead Engine Assembler", "Rotational Balance Quality Inspector", "Engine Rebuild Supervisor"],
    avgSalary: "₹2.6 Lakhs - ₹5.6 Lakhs per annum",
    higherStudies: ["Precision Dynamics & Marine Propulsion Assembly Courses"]
  },

  // --- ITI REFRIGERATION & AC ---
  "acserviceexpert": {
    name: "AC Service Expert",
    fullName: "Residential & Commercial Cooling Systems Expert",
    duration: "Immediate Direct Entry",
    overview: "Responsible for fixing, washing, and gas-charging domestic split, window, and inverter air conditioners, alongside commercial refrigerators. Extremely high demand role with excellent independent gig-working potentials.",
    keySubjects: ["Split AC Electrical Board Wiring", "Eco-friendly Coolant Gas Charging (R32, R410)", "AC Leak Repair & Brazing Techniques", "Compressor Capacitance Diagnostics", "Inverter AC Microprocessor Debugging"],
    topColleges: ["Voltas Service Network", "Blue Star Ltd Service Franchise", "Daikin India Customer Support", "Urban Company Gig Network / Self-Contracting"],
    industryRoles: ["Lead HVAC Service Engineer", "Regional Service Franchise Manager", "Independent HVAC Contracting Specialist"],
    avgSalary: "₹3.0 Lakhs - ₹7.2 Lakhs per annum (scales strongly with summer season demand)",
    higherStudies: ["Advanced VRF (Variable Refrigerant Flow) Sizing Certifications", "Industrial Chillers Maintenance Specializations"]
  },
  "centralhvacplantcoordinator": {
    name: "Central HVAC Plant Coordinator",
    fullName: "Industrial HVAC Chiller Plant Console Coordinator",
    duration: "1-2 Years Experience",
    overview: "Manages central air conditioning and cooling tower complexes inside massive tech parks, luxury hotels, airport terminals, and pharmaceutical cleanrooms to ensure constant, regulated environmental temperatures.",
    keySubjects: ["Industrial Screw Chiller Compressors", "AHU (Air Handling Unit) Belt Alignments", "Water Cooling Tower Filtration Loops", "BMS (Building Management System) Temperature Maps", "HVAC Energy Conservation Audits"],
    topColleges: ["Tech Parks (Embassy, Manyata, Prestige Groups)", "Luxury Hotels (Taj, Marriott Groups)", "Kempegowda International Airport", "Data Center Facility Networks"],
    industryRoles: ["Chief HVAC Plant Operator", "Facility Utilities Superintendent", "BMS Automation Supervisor"],
    avgSalary: "₹3.6 Lakhs - ₹7.8 Lakhs per annum",
    higherStudies: ["Certified Energy Auditor (HVAC Branch)", "Diploma in HVAC & Refrigeration Technology"]
  },
  "coldstoragemaintenancelead": {
    name: "Cold Storage Maintenance Lead",
    fullName: "Agricultural & Pharmaceutical Cold Chain Maintenance Lead",
    duration: "1-2 Years Cold Chain Experience",
    overview: "A vital infrastructure security role. Keeps extreme sub-zero walk-in freezers running 24/7 to safeguard perishable food stocks, agricultural seeds, and life-saving medical vaccines.",
    keySubjects: ["Walk-in Freezer Ammonia Evaporators", "Cold Chain Temperature Loggers Compliance", "Backup Power Switchover Triggers", "Low-Temperature Defrosting Cycles", "Cold Storage Hermetic Compressors Maintenance"],
    topColleges: ["Cold Chain Logistics Companies (Snowman, DHL)", "Government Seeds & Grain Silos", "Biotech & Vaccine Labs (Serum Institute, Bharat Biotech)", "FMCG Distribution Depots"],
    industryRoles: ["Cold Chain Infrastructure Manager", "Biomedical Storage Supervisor", "Facility Maintenance Engineer (Assistant)"],
    avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
    higherStudies: ["Advanced Ammonia System Safety & Refrigeration Certifications"]
  },

  // --- ITI COPA ---
  "datacenteroperator": {
    name: "Data Center Operator",
    fullName: "Data Center Infrastructure & Network Diagnostics Operator",
    duration: "Immediate Direct Entry",
    overview: "Monitors massive rows of cloud server cabinets. Handles server cabinet loading, tracks digital temperature alert flags, changes faulty hard drives, and assists network administrators.",
    keySubjects: ["Server Rack Mounting & Patch Cabling", "Windows / Linux OS Command Terminals", "Ping & Traceroute Network Diagnostics", "Emergency Power Backups & UPS Checks", "Access Control Log Audits"],
    topColleges: ["Sify Technologies Data Centers", "CtrlS Datacenters", "AdaniConneX Facility Centers", "IT Parks Backend Server Rooms"],
    industryRoles: ["Data Center Facility Manager", "Network Operations Center (NOC) Lead", "Cloud Infrastructure Administrator"],
    avgSalary: "₹2.8 Lakhs - ₹6.0 Lakhs per annum",
    higherStudies: ["CompTIA A+ / Network+ Certifications", "Cisco CCNA (Routing & Switching)", "Red Hat Certified System Administrator (RHCSA)"]
  },
  "schooltechnicaladvisor": {
    name: "School Technical Advisor",
    fullName: "School & Educational Institution IT Lab Administrator",
    duration: "Immediate Direct Entry",
    overview: "Manages computer laboratory networks inside high schools and colleges. Configures student systems, updates local firewalls, trouble-shoots Wi-Fi networks, and manages office computers.",
    keySubjects: ["LAN Networking & Wi-Fi Configurations", "System OS Partition Imaging & Cloning", "Antivirus & Firewall Rule Configs", "Biometric Attendance Systems Setup", "Local SQL Student Databases Billing"],
    topColleges: ["Public and Private High Schools", "Engineering & Arts College IT Labs", "Government Educational Offices", "Computer Education Centers"],
    industryRoles: ["Chief Systems Administrator", "District IT Support Executive", "Technical Lab Superintendent"],
    avgSalary: "₹2.4 Lakhs - ₹5.2 Lakhs per annum",
    higherStudies: ["MCA (Master of Computer Applications - through distance education)", "Advanced Cloud Computing Certifications"]
  },
  "officebackendassistant": {
    name: "Office Backend Assistant",
    fullName: "Corporate Backend Office Assistant & Database Entry Clerk",
    duration: "Immediate Direct Entry",
    overview: "Handles clerical computing duties inside commercial firms, hospital admissions, and state offices. Generates Excel sheets, drafts communications, handles billing, and updates databases.",
    keySubjects: ["Advanced Excel (VLOOKUP, Pivot Tables)", "Double-Accounting Sourcing & Billing Tools", "Professional Business Email Writing", "Relational Database Data Entry Compliance", "Digital Record Archiving Standards"],
    topColleges: ["Corporate Administrative Offices", "Hospital Admissions & Billing Desks", "Logistics & Transport Depot Offices", "Local Bank Branches Operations"],
    industryRoles: ["Office Operations Coordinator", "Admissions & Desk Manager", "Senior Operations Executive"],
    avgSalary: "₹2.2 Lakhs - ₹4.5 Lakhs per annum",
    higherStudies: ["Tally Prime Certification", "Bachelor of Business Administration (BBA Distance)"]
  },

  // --- ITI DRAFTSMAN CIVIL ---
  "civilcaddrafter": {
    name: "Civil CAD Drafter",
    fullName: "Civil Computer-Aided Design (CAD) 2D/3D Draftsman",
    duration: "Immediate Direct Entry",
    overview: "Bridges architectural concepts with construction. Converts rough sketches from civil engineers into high-precision, digital AutoCAD 2D structural floor plans, concrete columns details, and construction drawings.",
    keySubjects: ["AutoCAD Civil 2D Layout Designs", "Revit 3D Building Modelling Foundations", "Civil Estimations & Structural Symbols", "Local Municipality Building Codes", "Survey Data Point Importing"],
    topColleges: ["Shapoorji Pallonji Engineering", "Sobha Ltd Design Office", "Civil Architecture Contracting Firms", "Urban Development Development Offices (BDA, BMRDA)"],
    industryRoles: ["Senior Design Drafter", "BIM (Building Information Modelling) Coordinator", "Civil Project Estimator"],
    avgSalary: "₹3.0 Lakhs - ₹6.8 Lakhs per annum",
    higherStudies: ["Advanced BIM Modeling Certifications", "Diploma in Civil Engineering (Lateral Entry)"]
  },
  "structuralmapdesigner": {
    name: "Structural Map Designer",
    fullName: "Structural Steel & Concrete Reinforcement Detailer",
    duration: "Immediate Direct Entry",
    overview: "Specializes in detailing structural steel skeletons and concrete rebar designs. Creates the exact blueprints that workers follow to place reinforcing steel bars in columns, slabs, and bridges.",
    keySubjects: ["Rebar Detailing & Bar Bending Schedules (BBS)", "Structural Steel Truss Drafting", "Concrete Clear Cover Standards", "TEKLA Structural Detailing Software", "High-Stress Joint Detailing Guides"],
    topColleges: ["Tata Steel Structural Division", "Bridge & Highway Contracting Agencies", "L&T Heavy Infra Detailing Offices", "Structural Consultancy Hubs"],
    industryRoles: ["Senior Structural Draftsman", "Tekla Detailer specialist", "Structural Construction Site Supervisor"],
    avgSalary: "₹2.8 Lakhs - ₹6.2 Lakhs per annum",
    higherStudies: ["Advanced Steel Design & CAD Certifications", "Diploma in Civil Engineering"]
  },
  "constructionsitesupervisorassistant": {
    name: "Construction Site Supervisor Assistant",
    fullName: "Construction Site Assistant Supervisor & Bill Detailer",
    duration: "Immediate Direct Entry",
    overview: "Assists site engineers in checking blueprints on site, measuring steel concrete pours, managing labor shifts, and checking construction material supplies.",
    keySubjects: ["Construction Blueprint Field Execution", "Physical Site Measuring & Logging", "Cement Concrete Reinforcement Checklists", "Labor Shift Schedules Tracking", "Site Material Inventory Logs"],
    topColleges: ["Sobha Developers", "Prestige Residential Projects", "NHAI Road Highway Construction Contractors", "Local Civil Contractors"],
    industryRoles: ["Site Supervisor In-charge", "Construction Quality Control Lead", "Project Bill Estimator"],
    avgSalary: "₹2.5 Lakhs - ₹5.5 Lakhs per annum",
    higherStudies: ["Class-D PWD Government Contractor License", "Diploma in Construction Management"]
  },

  // --- DIPLOMA ENGINEERING ---
  "juniorengineerrailwaysgovt": {
    name: "Junior Engineer (JE)",
    fullName: "Junior Engineer - Indian Railways, PWD & PSUs",
    duration: "Requires clearing SSC JE / Railway Recruitment Board Exams",
    overview: "Highly sought-after government engineering role. Directly oversees structural public works, railway signaling, water supply lines, or telecom grids. Combines desk planning with intensive on-site field engineering authority.",
    keySubjects: ["Public Infrastructure Sizing", "Government Contracting & Tender Bidding", "Structural Quality Testing Regulations", "Departmental Accounting & Auditing", "Civil/Mechanical Safety Codes"],
    topColleges: ["Indian Railways (Various Zones)", "State Public Works Departments (PWD)", "National Thermal Power Corporation (NTPC)", "Military Engineer Services (MES)"],
    industryRoles: ["Section Engineer", "Assistant Executive Engineer (after AMIE/B.Tech)", "Chief Government Project Supervisor"],
    avgSalary: "₹4.8 Lakhs - ₹9.6 Lakhs per annum (with excellent government quarters & pensions)",
    higherStudies: ["Departmental Promotional Examinations", "AMIE Electrical/Civil Engineering Degree Program"]
  },
  "fieldsupervisor": {
    name: "Field Supervisor",
    fullName: "Industrial Field Technical Supervisor",
    duration: "Immediate Direct Entry",
    overview: "Acts as the crucial bridge between corporate engineers and site technicians. Leads shift teams in maintaining cell towers, electrical substations, oil pipelines, or massive construction sites, ensuring strict safety compliance.",
    keySubjects: ["Technical Team Leadership Protocols", "Standard Operating Procedures (SOP) Compliance", "On-site Electrical / Mechanical Debugging", "Technical Logs & Daily Incident Reports", "Site Safety Hazards Management"],
    topColleges: ["Reliance Jio Tower Divisions", "L&T Infrastructure Projects", "Adani Power Transmission Lines", "Siemens Industrial Services"],
    industryRoles: ["Regional Field Operations Lead", "Industrial Project Site Manager", "Lead Safety Compliance Auditor"],
    avgSalary: "₹3.5 Lakhs - ₹7.5 Lakhs per annum",
    higherStudies: ["Certified Industrial Safety (NEBOSH/OSHA)", "Part-Time B.Tech in Technology Management"]
  },
  "technicalsupportlead": {
    name: "Technical Support Lead",
    fullName: "Enterprise Systems & Infrastructure Support Lead",
    duration: "Immediate Direct Entry",
    overview: "Manages complex computer networks, server racks, firewalls, and enterprise cloud systems. Keeps corporate offices, bank branches, and diagnostic systems running smoothly, resolving escalations.",
    keySubjects: ["Enterprise System Diagnostics", "Active Directory & LDAP Setup", "Router and Firewall Configurations", "ITIL Ticketing Frameworks", "Database Recovery Protocols"],
    topColleges: ["Infosys Limited", "Wipro Technologies Helpdesks", "Cognizant Technology Services", "Private Banking Servers Support Network"],
    industryRoles: ["Systems Administrator", "Cloud Infrastructure Lead", "Director of Global Support Services"],
    avgSalary: "₹3.2 Lakhs - ₹7.0 Lakhs per annum",
    higherStudies: ["Cisco CCNA/CCNP Routing Certifications", "AWS / Azure Solutions Architect certifications"]
  },
  "lateralbtechentry": {
    name: "Lateral B.Tech Entry",
    fullName: "B.Tech Second-Year Lateral Admission Pathway",
    duration: "3-Year Engineering Course (directly entering 2nd year)",
    overview: "A premium academic bridge. Allows Diploma holders to bypass the first year of general engineering courses and enter directly into the second year of B.Tech programs, specializing immediately.",
    keySubjects: ["Advanced Engineering Mathematics", "Object-Oriented Programming & Structures", "Complex Thermomechanics and Dynamics", "Digital Circuits Logic Designs", "Laboratory Engineering Research Methods"],
    topColleges: ["M.S. Ramaiah Institute of Technology Bangalore", "RV College of Engineering (RVCE)", "PES University Bangalore", "BMS College of Engineering"],
    industryRoles: ["Graduate Software Engineer (SDE-I)", "Mechanical Design Analyst", "Automation R&D Lead"],
    avgSalary: "₹6.0 Lakhs - ₹18.0 Lakhs per annum (post-graduation)",
    higherStudies: ["M.Tech / M.S. (Global Universities)", "MBA (IIMs / XLRI)"]
  },

  // --- PARAMEDICAL MEDICAL LAB TECHNICIAN (DMLT) ---
  "hospitaldiagnosticslead": {
    name: "Hospital Diagnostics Lead",
    fullName: "Clinical Diagnostics Lab Supervisor",
    duration: "2 Years Experience post-DMLT",
    overview: "Oversees chemical and pathological laboratory testing inside multi-specialty hospitals. Calibrates diagnostic analysers, monitors biological sample containment safety, and ensures highly accurate patient reports.",
    keySubjects: ["Advanced Biochemistry Analysis", "Biomedical Analyzer Calibration", "Clinical Microbiology & Pathogens Control", "Laboratory Safety & Biosafety Cabinets", "Quality Auditing & NABL Regulations"],
    topColleges: ["Apollo Hospitals Diagnostic Labs", "Manipal Health Diagnostics", "Dr. Lal PathLabs", "Government Medical College Diagnostics Labs"],
    industryRoles: ["Chief Lab Superintendent", "Diagnostics Quality Manager", "NABL Laboratory Auditor"],
    avgSalary: "₹3.5 Lakhs - ₹7.8 Lakhs per annum",
    higherStudies: ["B.Sc in Medical Laboratory Technology (BMLT - Lateral Entry)", "PG Diploma in Hospital Administration"]
  },
  "clinicallabadvisor": {
    name: "Clinical Lab Advisor",
    fullName: "Biomedical Testing & Technical Lab Consultant",
    duration: "Immediate Direct Entry",
    overview: "Assists medical staff in selecting appropriate biochemical blood screens, biopsy preservations, and hormone panel tests, ensuring precise laboratory procedures.",
    keySubjects: ["Pathology Blood Sourcing & Hemostasis", "Hormonal Panel Testing Protocols", "Immunology & Serology Test Assays", "Patient Blood Grouping & Crossmatching", "Diagnostic Software System Entry"],
    topColleges: ["Thyrocare Technologies Ltd", "Metropolis Healthcare Networks", "AstraZeneca R&D Diagnostic Hubs", "Apollo Diagnostic Centers"],
    industryRoles: ["Senior Laboratory Consultant", "Clinical Lab Research Associate", "Technical Product Specialist (Lab Equipment OEMs)"],
    avgSalary: "₹2.8 Lakhs - ₹6.0 Lakhs per annum",
    higherStudies: ["Advanced Molecular Diagnostics and PCR Certifications"]
  },
  "bloodbankassistant": {
    name: "Blood Bank Assistant",
    fullName: "Certified Blood Bank Laboratory Technician",
    duration: "Immediate Direct Entry",
    overview: "A highly responsible safety role. Operates blood donor screening campaigns, performs blood group antibody typing, operates centrifuges for platelet separations, and ensures sanitary blood supply.",
    keySubjects: ["Blood Donor Screening Protocols", "ABO Blood Grouping & RH Typing", "Blood Component Separation (Platelets, Plasma)", "Cold-Chain Blood Storage Safety", "Infectious Disease Screening Assays"],
    topColleges: ["Indian Red Cross Society", "Rotary Blood Banks", "Apollo Blood Bank Divisions", "State Blood Transfusion Council Centers"],
    industryRoles: ["Blood Bank Supervisor", "Transfusion Safety Coordinator", "Lead Storage Manager"],
    avgSalary: "₹2.6 Lakhs - ₹5.8 Lakhs per annum",
    higherStudies: ["Specialized Certificate in Blood Transfusion Technology"]
  }
};

// Returns career/degree profile with high-fidelity matching
export function getCareerProfileDetails(degreeName: string): DegreeFact | null {
  const norm = degreeName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (CAREER_DETAILS_MAP[norm]) {
    return CAREER_DETAILS_MAP[norm];
  }
  
  // Custom smart matching to capture slightly different names or spelling variants
  for (const key of Object.keys(CAREER_DETAILS_MAP)) {
    if (norm.includes(key) || key.includes(norm)) {
      return CAREER_DETAILS_MAP[key];
    }
  }

  // Handle specialized common cases
  if (norm === 'hotemanyorhotelsafetyofficer' || norm.includes('hotesafety') || norm.includes('hotelsafety')) {
    return {
      name: "Hotel Safety Officer",
      fullName: "Hotel Health, Sanitation & Fire Safety Inspector",
      duration: "Immediate Direct Entry (Paramedical Health Inspector background)",
      overview: "Enforces elite sanitation, structural health codes, water quality checks, pest eradication, and fire evacuation safety protocols across luxury resort chains and large-scale hospitality venues.",
      keySubjects: ["HACCP Food Safety Codes", "Hospitality Fire Safety Audits", "Pest Vector Controls", "Water Sanitation & Legionella Audits", "Evacuation Route Mapping"],
      topColleges: ["Taj Hotels and Resorts", "The Oberoi Group", "ITC Luxury Hotels Maintenance Divisions", "Club Mahindra Resorts"],
      industryRoles: ["Regional HSE Hospitality Manager", "EHS Audit Coordinator", "Chief Hotel Compliance Director"],
      avgSalary: "₹3.2 Lakhs - ₹7.0 Lakhs per annum",
      higherStudies: ["Food Safety ISO Lead Auditor Certification", "NEBOSH Safety Certifications"]
    };
  }

  return null;
}
