import { StreamInfo, AptitudeQuestion, College, JobProfile, Mentor } from './types';

export const STREAMS_DATA: (StreamInfo & {name: string})[] = [
  {
    id: '12th_intermediate',
    name: '12th / Intermediate',
    title: '12th / Intermediate',
    shortDesc: 'Traditional academic path preparing for competitive entrance exams and professional university degrees.',
    fullDesc: 'Choosing 12th / Intermediate is the most popular academic pathway after 10th grade. It offers specialized division sets (Science, Commerce, Arts) with precise course combinations to prepare you for CA, JEE, NEET, or civil services.',
    durationRange: '2 Years',
    pros: [
      'Prepares for premier entrance exams (JEE, NEET, CLAT, etc.)',
      'Provides maximum flexibility for career switches later',
      'Essential for degrees like B.Tech, MBBS, CA'
    ],
    cons: [
      'No immediate job placement right after 12th standard',
      'High competition for top colleges and university seats',
      'Requires minimum 3-5 more years of study'
    ],
    courses: [
      // SCIENCE combinations
      {
        name: 'PCM (Physics, Chemistry, Maths)',
        duration: '2 Years',
        eligibility: 'Must have successfully completed 10th grade with strong Science & Mathematics scores.',
        description: 'A classical, fundamental science combination focusing on physical sciences, material structures, and rigorous mathematics.',
        branches: ['Physics', 'Chemistry', 'Mathematics'],
        careerProspects: ['B.E./B.Tech', 'B.Sc Mathematics', 'B.Sc Physics', 'B.Sc Chemistry', 'BCA', 'B.Sc IT', 'NDA']
      },
      {
        name: 'PCMC (Physics, Chemistry, Maths, Computer Science)',
        duration: '2 Years',
        eligibility: 'Must have successfully completed 10th grade with strong Science & Mathematics scores.',
        description: 'The premier combination for computer engineering, coding, software development, and technical computation studies.',
        branches: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
        careerProspects: ['B.E./B.Tech', 'BCA', 'B.Sc Computer Science', 'B.Sc Mathematics', 'B.Sc IT']
      },
      {
        name: 'PCME (Physics, Chemistry, Maths, Electronics)',
        duration: '2 Years',
        eligibility: 'Must have successfully completed 10th grade with robust Science & Mathematics rankings.',
        description: 'Focuses on electrical systems, circuitry, hardware devices, and mechanical design. Perfect for circuit branch engineering.',
        branches: ['Physics', 'Chemistry', 'Mathematics', 'Electronics'],
        careerProspects: ['B.E./B.Tech', 'B.Sc Electronics', 'BCA', 'B.Sc Physics', 'B.Sc Mathematics']
      },
      {
        name: 'PCMB (Physics, Chemistry, Maths, Biology)',
        duration: '2 Years',
        eligibility: 'Must have successfully completed 10th grade with high score in Science and Algebra.',
        description: 'Double-option stream leaving both Engineering and Medicine pathways open. Highly rigorous but versatile.',
        branches: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        careerProspects: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm', 'B.Sc Nursing', 'B.E./B.Tech', 'B.Sc Biotechnology']
      },
      {
        name: 'PCMS (Physics, Chemistry, Maths, Statistics)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with strong quantitative logic.',
        description: 'Blends classical physical sciences with advanced math models and statistical insights. Key for analytical fields.',
        branches: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],
        careerProspects: ['B.E./B.Tech', 'B.Sc Statistics', 'B.Sc Mathematics', 'BCA', 'Data Science']
      },
      {
        name: 'PCB (Physics, Chemistry, Biology)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with high interest in life sciences.',
        description: 'Pure medical track path centered on clinical setups, pharmaceutical compounding, and surgical helper programs.',
        branches: ['Physics', 'Chemistry', 'Biology', 'English'],
        careerProspects: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotechnology']
      },
      {
        name: 'PCBZ (Physics, Chemistry, Biology, Zoology)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with deep interest in animal biology.',
        description: 'A dedicated biological layout specializing in animal physiology, organic chemical reactions, and laboratory diagnostics.',
        branches: ['Physics', 'Chemistry', 'Biology', 'Zoology'],
        careerProspects: ['MBBS', 'BDS', 'B.Sc Zoology', 'B.Sc Life Sciences', 'B.Pharm']
      },
      {
        name: 'PCBH (Physics, Chemistry, Biology, Home Science)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade from a recognized national board.',
        description: 'Fuses chemical and life sciences with home-science structures including family resource management, child development, and bio-nutrition.',
        branches: ['Physics', 'Chemistry', 'Biology', 'Home Science'],
        careerProspects: ['MBBS', 'B.Sc Home Science', 'Nutrition & Dietetics', 'B.Pharm', 'Nursing']
      },
      
      // COMMERCE combinations
      {
        name: 'CEBA (Computer Science, Economics, Business Studies, Accountancy)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with numeric and general business appreciation.',
        description: 'Combines digital spreadsheets, business databases, billing software modules, and corporate macroeconomics.',
        branches: ['Computer Science', 'Economics', 'Business Studies', 'Accountancy'],
        careerProspects: ['B.Com', 'BBA', 'BA Economics', 'CA', 'CS']
      },
      {
        name: 'SEBA (Statistics, Economics, Business Studies, Accountancy)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with good logical arithmetic skills.',
        description: 'Focuses on financial bookkeeping, business systems, analytical metrics, market research, and micro-economies.',
        branches: ['Statistics', 'Economics', 'Business Studies', 'Accountancy'],
        careerProspects: ['B.Com', 'BBA', 'BA Economics', 'B.Sc Statistics', 'CA']
      },
      {
        name: 'HEBA (History, Economics, Business Studies, Accountancy)',
        duration: '2 Years',
        eligibility: 'Passed 10th grade with comprehensive reading and history interest.',
        description: 'Core commerce track adding history of economics and comparative state business laws. Ideal for corporate legal pathways.',
        branches: ['History', 'Economics', 'Business Studies', 'Accountancy'],
        careerProspects: ['BA History', 'BA Economics', 'BA Political Science', 'B.Com', 'BBA']
      },
      {
        name: 'ABMS (Accountancy, Business Studies, Mathematics, Statistics)',
        duration: '2 Years',
        eligibility: '10th grade passed with strong quantitative abilities.',
        description: 'Highly mathematical commerce track preparing you for rigorous auditing, quantitative financial engineering, and banking algorithms.',
        branches: ['Accountancy', 'Business Studies', 'Mathematics', 'Statistics'],
        careerProspects: ['B.Com', 'BBA', 'BBM', 'CA', 'MBA (after graduation)']
      },
      {
        name: 'EBAC (Economics, Business Studies, Accountancy, Computer Science)',
        duration: '2 Years',
        eligibility: 'Passed 10th grade with general IT framework interest.',
        description: 'Integrates corporate trade logistics, billing software applications, double-entry bookkeeping, and global macroeconomics.',
        branches: ['Economics', 'Business Studies', 'Accountancy', 'Computer Science'],
        careerProspects: ['B.Com', 'BBA', 'BA Economics', 'CA', 'CMA']
      },
      {
        name: 'BSBA (Business Studies, Statistics, Business Administration, Accountancy)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade from a recognized educational board.',
        description: 'A pre-management special course detail emphasizing statistics, bookkeeping, organizational structures, and product marketing concepts.',
        branches: ['Business Studies', 'Statistics', 'Business Administration', 'Accountancy'],
        careerProspects: ['B.Com', 'BBA', 'B.Sc Statistics', 'CA']
      },
      {
        name: 'CSBA (Computer Science, Statistics, Business Administration, Accountancy)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade with computational and general math skills.',
        description: 'Focuses on algorithmic business operations, analytics dashboards, corporate bookkeeping modules, and automated spreadsheets.',
        branches: ['Computer Science', 'Statistics', 'Business Administration', 'Accountancy'],
        careerProspects: ['B.Com', 'BBA', 'Company Secretary (CS)', 'CA']
      },

      // ARTS / HUMANITIES combinations
      {
        name: 'HEPS (History, Economics, Political Science, Sociology)',
        duration: '2 Years',
        eligibility: 'Completed 10th grade from a recognized board.',
        description: 'The standard premium humanities pathway. In-depth understanding of state mechanisms, civil laws, resource distribution, and community structures.',
        branches: ['History', 'Economics', 'Political Science', 'Sociology'],
        careerProspects: ['BA History', 'BA Economics', 'BA Political Science', 'LLB', 'Civil Services Preparation']
      },
      {
        name: 'HEPP (History, Economics, Political Science, Philosophy)',
        duration: '2 Years',
        eligibility: 'Passed 10th with interest in critical reading and logical thinking.',
        description: 'Examines world administrative systems, historical changes, market values, and advanced ethical/philosophical guidelines.',
        branches: ['History', 'Economics', 'Political Science', 'Philosophy'],
        careerProspects: ['BA History', 'BA Political Science', 'LLB', 'Journalism']
      },
      {
        name: 'HESP (History, Economics, Sociology, Psychology)',
        duration: '2 Years',
        eligibility: 'Passed 10th in full with high interest in behavioral science.',
        description: 'Introduces cognitive pathways, child psychology, clinical behavioral concepts, social dynamics, and history.',
        branches: ['History', 'Economics', 'Sociology', 'Psychology'],
        careerProspects: ['BA History', 'BA Economics', 'BA Sociology', 'Social Work']
      },
      {
        name: 'EPS (Economics, Political Science, Sociology)',
        duration: '2 Years',
        eligibility: 'Passed 10th grade.',
        description: 'Details state governance structures, community welfare standards, economic resource mapping, and sociology values.',
        branches: ['Economics', 'Political Science', 'Sociology'],
        careerProspects: ['BA Economics', 'BA Political Science', 'BA Sociology', 'Public Administration']
      },
      {
        name: 'JPE (Journalism, Psychology, English)',
        duration: '2 Years',
        eligibility: 'Passed 10th grade with excellent writing and language skills.',
        description: 'Highly creative path. Blends journalistic reporting, behavioral study methods, media logic, and classic English literature works.',
        branches: ['Journalism', 'Psychology', 'English'],
        careerProspects: ['BA English', 'BA Journalism', 'B.Sc Psychology', 'Media Communication', 'Public Relations']
      }
    ]
  },
  {
    id: 'diploma',
    name: 'Diploma Courses',
    title: 'Diploma Courses',
    shortDesc: 'A direct professional route to applied engineering and technical skills.',
    fullDesc: 'Polytechnic Diploma courses are highly practical 3-year programs focused directly on applied sciences, engineering disciplines, agricultural patterns, or media systems. They prepare you to join the industrial workforce directly or skip 1st year of university.',
    durationRange: '3 Years',
    pros: [
      'Direct hands-on engineering lab work right after 10th grade',
      'Eligibility for Junior Engineer posts in government and PSU railways',
      'Lateral entry directly to 2nd year of Engineering (B.E/B.Tech) degree'
    ],
    cons: [
      'Slightly lower starting salary compared to full graduate engineers',
      'Requires immediate specialization choice in 10th itself',
      'Lower priority for corporate white-collar roles compared to degree holders'
    ],
    courses: [
      {
        name: 'Engineering Diploma',
        duration: '3 Years',
        eligibility: 'Passed 10th class with Science and Mathematics as compulsory subjects.',
        description: 'Technical polytechnic courses spanning a wide array of fields including Civil, Mechanical, CSE, Electrical, Electronics, AI, Robotics, and more. Focuses on practical industry applications.',
        branches: ['Computer Science', 'Mechanical', 'Civil Engineering', 'Electrical', 'Electronics & Comm.', 'AI & Machine Learning', 'Automobile', 'Aeronautical', 'Mechatronics', 'Robotics', 'IT Engineering', 'Chemical Engineering'],
        careerProspects: ['Junior Engineer (Railways/Govt)', 'Field Supervisor', 'Technical Support Lead', 'Lateral B.Tech entry']
      },
      {
        name: 'Design and Media Specialization',
        duration: '3 Years',
        eligibility: 'Passed Class 10th with artistic/creative design interest.',
        description: 'Focuses on digital design layouts, graphic styling, video layout, digital presentation, and advertising visuals.',
        branches: ['Graphic Design', 'Animation', 'Multimedia', 'Interior Design', 'Fashion Design', 'UI/UX Design', 'Photography', 'Film Making', 'Video Editing', 'VFX'],
        careerProspects: ['Graphic Editor', 'Media Designer Associate', 'Creative Consultant', 'UI Assistant']
      },
      {
        name: 'Hotel Management',
        duration: '3 Years',
        eligibility: 'Class 10th pass with excellent soft skills and English.',
        description: 'Teaches luxury hospitality standards, lobby operations, corporate banquet layouts, reservation programs, and catering service structures.',
        branches: ['Hotel Management', 'Food Production', 'Front Office Management', 'Bakery & Confectionery', 'Housekeeping', 'Food & Beverage Service', 'Catering Technology'],
        careerProspects: ['Resort supervisor', 'Hotel operations manager', 'Catering Executive', 'Guest operations lead']
      },
      {
        name: 'Agriculture',
        duration: '3 Years',
        eligibility: 'Class 10th pass with interest in bio-farming sciences.',
        description: 'Covers crop breeding, soil fertility checks, watering methods, horticulture, agricultural machinery, and crop security.',
        branches: ['Agriculture', 'Agricultural Engineering', 'Agriculture Technology', 'Horticulture', 'Sericulture', 'Dairy Technology', 'Food Technology', 'Organic Farming'],
        careerProspects: ['Soil Analyst helper', 'Farm manager', 'Agricultural depot advisor', 'Fertilizer consultant']
      },
      {
        name: 'Pharmacy',
        duration: '2 Years',
        eligibility: 'Class 10th pass with Science background.',
        description: 'Provides vital instruction in drug dosages, composition records, pharmacological laws, dispensing methods, and retail store management.',
        branches: ['Diploma in Pharmacy (D.Pharm)', 'Pharmacy Assistant', 'Clinical Pharmacy', 'Pharmaceutical Chemistry'],
        careerProspects: ['Registered Retail Pharmacist', 'Hospital dispensary helper', 'Medical representative']
      },
      {
        name: 'Nursing',
        duration: '3 Years',
        eligibility: 'Completed Class 10th with good biology/physiology interest.',
        description: 'Clinical health path detailing ward nursing, maternal security, clinical dressing methods, diagnostics tracking, and hospital patient care.',
        branches: ['General Nursing and Midwifery (GNM)', 'Auxiliary Nursing and Midwifery (ANM)', 'Patient Care Technician', 'Home Nursing'],
        careerProspects: ['General staff nurse', 'Health worker', 'Clinical aide', 'Community health nurse']
      },
      {
        name: 'Tourism',
        duration: '3 Years',
        eligibility: 'Class 10th pass with geography knowledge.',
        description: 'Teaches tour destination planning, reservation database setups, global ticketing procedures, travel consulting, and tourist guidance rules.',
        branches: ['Travel and Tourism Management', 'Tour Guide', 'Air Ticketing', 'Airport Management', 'Hospitality & Tourism'],
        careerProspects: ['Holiday consultant', 'Travel Desk Coordinator', 'Guidance Lead', 'Resort desk supervisor']
      },
      {
        name: 'Fire and Safety',
        duration: '1-2 Years',
        eligibility: 'Class 10th pass with physical capability and height clearance.',
        description: 'Focuses on disaster management, fire prevention techniques, industrial safety protocols, and emergency response coordination.',
        branches: ['Fire and Safety Engineering', 'Industrial Safety', 'Occupational Health and Safety', 'Disaster Management', 'Environmental Safety'],
        careerProspects: ['Fire Safety Officer', 'Safety Auditor', 'Disaster Response Coordinator', 'Industrial Safety Supervisor']
      }
    ]
  },
  {
    id: 'iti',
    name: 'ITI Courses',
    title: 'ITI Courses',
    shortDesc: 'Very short-term, direct technical craft trades with rapid job entry.',
    fullDesc: 'Industrial Training Institutes (ITIs) offer physical craftsmanship and specific vocational trades. Centered on hands-on tools, safety protocols, and fast entry into industry platforms.',
    durationRange: '1 to 2 Years',
    pros: [
      'Shortest courses with lowest tuition fees',
      'Strongly practical, 80% lab and trade shop work',
      'Perfect for starting self-employment or technical plant careers very quickly'
    ],
    cons: [
      'Mainly physical labor and field-oriented duties',
      'Lower initial salary compared to colleges or polytechnics',
      'Limited long-term administrative progression without further academic upgrades'
    ],
    courses: [
      {
        name: 'Electrician',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with science/maths.',
        description: 'Core instructions details in electrical wiring, house building cabling, generator setups, AC transformers, and industrial power panel units.',
        branches: ['House grid wiring', 'AC/DC electrical motors', 'Transformer repairs', 'Power board safety'],
        careerProspects: ['State power grid lineman', 'Factory electrical assistant', 'Electrical shop owner', 'HSE wiring lead']
      },
      {
        name: 'Fitter',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with physics/maths.',
        description: 'Teaches metal sizing parameters, steel precision structures, lathe operating, engine joints, and component cutting guides.',
        branches: ['Metal sizing assembly', 'Lathe machines', 'Blueprint analysis', 'Pipeline alignments'],
        careerProspects: ['Locomotive engine fitter', 'Plant machinery assembler', 'Automotive fabrication helper']
      },
      {
        name: 'Welder',
        duration: '1 Year',
        eligibility: 'Passed Class 10th standard.',
        description: 'Explores gas cutting, shielded arc joining, TIG/MIG welding techniques, industrial alloy fabrications, and physical welder safety systems.',
        branches: ['Arc welding', 'MIG / TIG procedures', 'Chemical gas cutting', 'Structural fabrication safety'],
        careerProspects: ['Site Welder', 'Pipe-welding specialist', 'Shipyard tech helper', 'Fabrication shop operator']
      },
      {
        name: 'Diesel Mechanic',
        duration: '1 Year',
        eligibility: 'Class 10th pass with engine interest.',
        description: 'In-depth repairs of internal combustion engines, fuel valve setups, oil parameters, diesel trucks, and thermodynamic diagnostic tools.',
        branches: ['Diesel Engine theory', 'Fuel Valves calibration', 'Hydraulic systems', 'Engine overhauling'],
        careerProspects: ['Locomotive assistant', 'Marine deck motor helper', 'Heavy truck mechanic', 'Generator supervisor']
      },
      {
        name: 'Machinist',
        duration: '2 Years',
        eligibility: 'Class 10th pass with mechanical interest.',
        description: 'Focuses on using drilling machines, industrial gear carving, automatic mill operations, and computer numerical control (CNC) lathes.',
        branches: ['Milling-shaping tools', 'Gear carvings', 'Precision tooling', 'CNC automation'],
        careerProspects: ['Precision Machinist', 'CNC Toolmaker', 'Industrial gear assembler', 'Machinery shop expert']
      },
      {
        name: 'Electronic Mechanic',
        duration: '2 Years',
        eligibility: 'Class 10th pass with science scores.',
        description: 'Teaches circuit path diagnostics, soldering procedures, multimeter checks, and repairing microelectronic commercial appliances.',
        branches: ['Analog logic boards', 'Micro soldering', 'Diagnostic meters', 'Household device repair'],
        careerProspects: ['Electronics repair operative', 'Quality tester helper', 'Sub-component assembler']
      },
      {
        name: 'Instrument Mechanic',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with high maths parameters.',
        description: 'Teaches calibrating digital transmitters, refinery gauges, process pressure valves, flow charts, and automation controls.',
        branches: ['Transmitters calibration', 'Pressure/flow dial setup', 'Refinery monitoring', 'Pneumatic systems'],
        careerProspects: ["Refinery calibration lead", "Instrument specialist", "Control room technician helper"]
      },
      {
        name: 'Turner',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with basic geometry.',
        description: 'Provides hands-on mastery of metal-turning lathe equipment. Carve exact cylinders, metal shafts, outer grooves, and precision threads.',
        branches: ['Cylindrical carving', 'Metal shaft lathe work', 'Groove fittings', 'Precision threads'],
        careerProspects: ['Turner lathemaker', 'Industrial production machinist', 'Engine component assembler']
      },
      {
        name: 'Refrigeration & AC',
        duration: '2 Years',
        eligibility: 'Completed Class 10th with physical logistics.',
        description: 'Covers domestic refrigerators, window AC units, centralized HVAC loops, compressor setups, safety valves, and thermodynamic cooling gases.',
        branches: ['HVAC centralized loops', 'Compressor mechanics', 'Coolant gas charging', 'Thermostat wiring'],
        careerProspects: ['AC service expert', 'Central HVAC plant coordinator', 'Cold storage maintenance lead']
      },
      {
        name: 'COPA (Computer Operator & Programming Assistant)',
        duration: '1 Year',
        eligibility: 'Passed Class 10th.',
        description: 'Introduces double-accounting software systems, database queries (SQL), office automation tools, Internet setups, and code compilation basics.',
        branches: ['Office automation', 'SQL Query databases', 'JavaScript logic', 'Network layouts'],
        careerProspects: ['Data center operator', 'School technical advisor', 'Office backend assistant']
      },
      {
        name: 'Draftsman Civil',
        duration: '2 Years',
        eligibility: 'Class 10th pass with drawing skills.',
        description: 'Teaches scaling layouts, mechanical drawing methods, AutoCAD digital blueprint mapping, structural estimations, and maps.',
        branches: ['AutoCAD maps', 'Foundation mappings', 'Structural volume calc', 'Architectural sketches'],
        careerProspects: ['Civil CAD Drafter', 'Structural map designer', 'Construction site supervisor assistant']
      },
      {
        name: 'Plumber',
        duration: '1 Year',
        eligibility: 'Class 10th pass.',
        description: 'Essential layout instruction in septic line structures, municipal water connectors, domestic fittings, safety clamps, and valves.',
        branches: ['Drainage pipes design', 'Corporate bathroom grids', 'High pressure water connections', 'Sealants & joints'],
        careerProspects: ['Municipal plumber', 'Civic water lines fitter', 'Independent water contractor']
      },
      {
        name: 'Surveyor',
        duration: '1 Year',
        eligibility: 'Class 10th pass with arithmetic skill.',
        description: 'Coordinates mappings, roadway curves planning, measuring levels, physical theodolite alignments, and digital ground GPS coordinates.',
        branches: ['Topographic mapping', 'Theodolite logic', 'Road layouts calculation', 'GPS leveling'],
        careerProspects: ['Boundary Surveyor officer', 'Site supervisor', 'Railway track leveler aide']
      },
      {
        name: 'Solar Technician',
        duration: '1 Year',
        eligibility: 'Class 10th pass with physical wellness.',
        description: 'Covers photovoltaic cell arrays installation, solar inverters, solar panels positioning, battery setup safety, and load distribution.',
        branches: ['PV cell connections', 'Inverter battery setups', 'Solar water pumps', 'Grid cabling'],
        careerProspects: ['Rooftop solar installer', 'Green energy site assistant', 'Solar crop-pump designer']
      },
      {
        name: 'Radio & TV Mechanic',
        duration: '1 Year',
        eligibility: 'Passed Class 10th.',
        description: 'Instruction details in troubleshooting DTH networks, LED screen boards, digital audio setups, amplifiers, and satellite receivers.',
        branches: ['LED module testing', 'Satellite card setup', 'Coaxial alignment', 'DTH systems'],
        careerProspects: ['DTH provider engineer', 'LED TV repair lead', 'Acoustic assembly helper']
      },
      {
        name: 'Marine Mechanic',
        duration: '2 Years',
        eligibility: 'Class 10th pass with deep engine alignment.',
        description: 'Deals with boat motor cooling, rudder controls mechanics, marine heavy diesel turbines, auxiliary boilers, and port cranes.',
        branches: ['Outboard motor systems', 'Marine cooling cycles', 'Turbine auxiliary boards', 'Steering mechanisms'],
        careerProspects: ['Shipyard port mechanic', 'Dock vessel helper', 'Heavy turbine assistant']
      },
      {
        name: 'Fire Technology & Safety',
        duration: '1 Year',
        eligibility: '10th class pass with medical physical clearance.',
        description: 'Trades centered around fire safety drills, high-pressure extinguisher hoses, chemistry of flame combustion, and disaster maps rescue.',
        branches: ['Extinguisher chemical ratios', 'High pressure pumps', 'Rescue search protocols', 'HSE standard regulations'],
        careerProspects: ['Refinery HSE safety lead', 'Civic fire department assistant', 'Industrial safety marshal']
      },
      {
        name: 'Food Production (Cookery)',
        duration: '1 Year',
        eligibility: 'Class 10th pass.',
        description: 'Practical kitchen basics detailing knife cuts, food refrigeration standards, baking operations, menu costing, and hygiene standard audits.',
        branches: ['Knife chopping speed', 'Baking methods', 'Hygiene HACCP codes', 'Commercial buffet layout'],
        careerProspects: ['Catering junior chef', 'Baking setup operator', 'Cruise kitchen apprentice']
      },
      {
        name: 'Paint Technology',
        duration: '1 Year',
        eligibility: 'Passed Class 10th.',
        description: 'Technical instruction detailing aerosol spray application, polymer layers, automotive clear coats, color mixes, and rust inhibitors.',
        branches: ['Automotive paint booth', 'Rust powder structures', 'Polymer mixing safety', 'Aerosol techniques'],
        careerProspects: ['Automotive paint booth lead', 'Building textures contractor', 'Lacquer coordinator']
      }
    ]
  },
  {
    id: 'paramedical',
    name: 'Paramedical Courses',
    title: 'Paramedical Courses',
    shortDesc: 'Medical laboratory, scanning, and clinical support careers in the healthcare sector.',
    fullDesc: 'Paramedical courses are critical support lines for the healthcare system. Rather than studying 10 years, these 2-year diploma modules place you right inside hospital labs, dialysis units, radiology rooms, and surgical theatres.',
    durationRange: '2 Years',
    pros: [
      'Extremely high demand and stability in hospital & diagnostic sectors',
      'Practical training directly in working healthcare setups',
      'Shorter route to start earning compared to MBBS or Nursing Bachelor degrees'
    ],
    cons: [
      'Slightly low salary ceiling without further specialized degrees',
      'Usually involves shift work, on-call standby status, and long hours',
      'Not authorized to diagnose patients or write prescriptions independently'
    ],
    courses: [
      {
        name: 'Medical Lab Technician (DMLT)',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with high science scores.',
        description: 'Technical diagnostics preparation. Learn chemical blood tests, urine chemistry analysis, biopsy storage preparation, and pathology reports.',
        branches: ['Biochemistry', 'Pathology diagnostics', 'Hematology blood banks', 'Microbiology Pathogens'],
        careerProspects: ['Hospital diagnostics lead', 'Clinical lab advisor', 'Blood bank assistant']
      },
      {
        name: 'Physiotherapy Diploma',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with high biomechanics interest.',
        description: 'Focuses on muscle rehabilitation, bone/tissue exercise traction, athletic injury therapy, massage techniques, and pain recovery.',
        branches: ['Skeletal Anatomy', 'Therapeutic physical movements', 'Muscle recovery plans', 'Sports diagnostics basics'],
        careerProspects: ['Sports rehab assistant', 'Physiotherapy clinic aide', 'Maternity exercise trainer']
      },
      {
        name: 'Operation Theatre Technology (DOTT)',
        duration: '2 Years',
        eligibility: 'Class 10th pass with high sanitary ethics.',
        description: 'Covers keeping surgical sectors fully clean, configuring high-tech ventilators, arranging scalpel setups, and assisting active surgery.',
        branches: ['Surgical equipment assembly', 'OT Sterilization protocols', 'ICU ventilators setup', 'Anesthesia assisting'],
        careerProspects: ['Operation Theatre Assistant', 'Anaesthesia room tech', 'ICU staff nurse helper']
      },
      {
        name: 'Radiology Technician',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with strong physical sciences.',
        description: 'Focuses on preparing patient positioning, operating premium MRI tubes, CT diagnostic grids, radiological films, and radiation safety limits.',
        branches: ['Radiographic Physics', 'Patient alignment', 'CT scan slices', 'MRI scanning methods'],
        careerProspects: ['Radiologist assistant', 'MRI scan technician junior', 'Hospital CT scan advisor']
      },
      {
        name: 'Health Inspector',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with community health focus.',
        description: 'Teaches pest epidemic records tracking, sanitary audits, drinking water diagnostics checking, local hygiene standards, and municipal waste layouts.',
        branches: ['Community Sanitation', 'Health surveys', 'Water pathogens check', 'Waste recycling codes'],
        careerProspects: ['Municipal Health Inspector', 'Hote safety officer', 'Corporate sanitarian Lead']
      },
      {
        name: 'Ophthalmic Technician',
        duration: '2 Years',
        eligibility: 'Class 10th pass.',
        description: 'Focuses on testing optical visual power, screening eye pressure, verifying cataract indicators, and fitting customized eye lenses.',
        branches: ['Optical refraction models', 'Cataract visual screenings', 'Lens grinding standards', 'Eyewear selection'],
        careerProspects: ['Ophthalmic assistant', 'Optical store counselor', 'Hospital eye ward administrator']
      },
      {
        name: 'Dialysis Technician',
        duration: '2 Years',
        eligibility: 'Passed Class 10th with kidney anatomy core appreciation.',
        description: 'Focuses on connecting kidney hemodialysis loops, managing biochemical filter systems, sterilizing lines, and checking chronic renal status.',
        branches: ['Renal biology', 'Hemodialysis loops setup', 'Sterilization standards', 'Patient vitals tracking'],
        careerProspects: ['Hospital dialysis operator', 'Private renal center supervisor', 'Dialysis equipment engineer helper']
      },
      {
        name: 'Medical Records Technology',
        duration: '2 Years',
        eligibility: 'Class 10th pass with high database interest.',
        description: 'Teaches disease code tracking (ICD parameters), storing clinical diagnostic sheets safely, hospital billing, and insurance filing files.',
        branches: ['ICD diagnosis coding', 'Digital medical files layout', 'Hospital systems databases', 'Insurance claims verification'],
        careerProspects: ['Health records administrator', 'Medical billing coder helper', 'Admissions desk manager']
      },
      {
        name: 'Dental Technology',
        duration: '2 Years',
        eligibility: 'Class 10th pass with fine ceramic/manual skill.',
        description: 'Covers fabrication of orthodontic wire connectors, dental teeth crowns, bridge porcelain layouts, full dentures, and dental hygiene.',
        branches: ['Teeth cast modeling', 'Denture porcelain molding', 'Orthodontic wiring', 'Dental cleaning tools'],
        careerProspects: ['Prosthetic dental tech', 'Commercial dentures maker', 'Dental surgeon assistant']
      },
      {
        name: 'Cardiac Care Technology',
        duration: '2 Years',
        eligibility: 'Class 10th pass with biology focus.',
        description: 'Deals with placing chest electrodes for ECG tests, recording dynamic cardiac beats during treadmill stress tests, and documenting cardiac logs.',
        branches: ['ECG electrode configurations', 'Treadmill stress monitoring', 'Cardiac chamber readings', 'Cardiac diagnostic systems'],
        careerProspects: ['Cath lab assistant', 'ECG supervisor', 'Cardiac clinical coordinator']
      },
      {
        name: 'Anesthetic Technician',
        duration: '2 Years',
        eligibility: 'Class 10th pass with clinical chemistry interest.',
        description: 'Covers setting up medical gaseous supplies, testing anesthetic vaporizers, checking breathing lines safety, and checking post-op vitals.',
        branches: ['Anesthesia gases configurations', 'Vaporizer safety audits', 'Patient airways checklist', 'ICU patient tracking'],
        careerProspects: ['Anesthesia associate', 'Surgical theatre support lead', 'ICU breathing desk operator']
      }
    ]
  },
  {
    id: 'vocational',
    name: 'Vocational Courses',
    title: 'Vocational Courses',
    shortDesc: 'Direct industry action courses centered around media, styling, computers, and retail services.',
    fullDesc: 'Vocational courses combine fundamental commercial, creative, and service skills into quick, 1-to-2 year practical certificates built for immediate entrepreneurship or retail operations.',
    durationRange: '1 to 2 Years',
    pros: [
      'Focus is 100% on job-specific business operations',
      'Provides quick startup knowledge for starting a personal business',
      'Less academic stress than MPC/BiPC streams'
    ],
    cons: [
      'Slightly lower research opportunity compared to standard high school streams',
      'Fewer university-level admissions align perfectly without taking bridges',
      'Lower corporate visibility in modern global firms'
    ],
    courses: [
      {
        name: 'Digital Marketing',
        duration: '1 Year',
        eligibility: 'Completed Class 10th with interest in social media and writing.',
        description: 'Comprehensive training in modern digital brand strategies, search engine visibility, paid ad campaign management, and content creation.',
        branches: ['Search Engine Optimization (SEO)', 'Social Media Marketing (SMM)', 'Pay-Per-Click Ads (PPC)', 'Email Marketing Techniques', 'Web Analytics'],
        careerProspects: ['Digital Marketing Associate', 'Social Media Executive', 'SEO Specialist', 'Content Coordinator']
      },
      {
        name: 'Tally & Financial Accounting',
        duration: '6 Months to 1 Year',
        eligibility: 'Passed Class 10th with basic numeracy.',
        description: 'Practical mastery of computer-based double-accounting, GST configurations, voucher recording, invoice systems, and payroll management utilizing modern Tally systems.',
        branches: ['Double Entry Bookkeeping', 'GST Law & Filing', 'Tally ERP/Prime Software', 'Payroll Systems', 'Inventory Valuation'],
        careerProspects: ['Junior Accountant', 'Accounts Assistant', 'GST Billing Clerk', 'Audit Assistant']
      },
      {
        name: 'Graphic Design & UI/UX',
        duration: '1 Year',
        eligibility: 'Class 10th passed with creative or drawing interest.',
        description: 'Core digital vector skills, typography frameworks, layout design, user interface mockups, wireframing, and interactive app/website user experience principles.',
        branches: ['Vector Graphic Design', 'Typography & Layout', 'UI Wireframing & Prototyping', 'User Research & Persona Study', 'Design System Basics'],
        careerProspects: ['Graphic Designer', 'Junior UI/UX Designer', 'Creative Layout Designer', 'Brand Identity Designer']
      },
      {
        name: 'Full Stack Web Development',
        duration: '1 to 2 Years',
        eligibility: 'Passed Class 10th with logical aptitude.',
        description: 'Robust layout and system-side engineering for websites. Includes styling webpages, interactive scripting, database management systems, and backend servers.',
        branches: ['HTML5 & CSS3 Layouts', 'JavaScript & ES6 Scripts', 'Frontend Frameworks (React)', 'Backend servers with Node.js', 'Databases & APIs'],
        careerProspects: ['Junior Frontend Developer', 'Full Stack Associate', 'Web Developer', 'App Support Technician']
      },
      {
        name: 'Data Analytics & SQL',
        duration: '1 Year',
        eligibility: 'Completed Class 10th with quantitative logic interests.',
        description: 'Techniques to process raw datasets, write relational SQL database queries, design cloud databases, build insight dashboards, and extract business metrics.',
        branches: ['Relational Databases & SQL Queries', 'Data Analysis in Excel', 'BI Reporting Tools (Tableau/PowerBI)', 'Data Cleaning Protocols', 'Statistical Basics'],
        careerProspects: ['Data Analyst Junior', 'Business Intelligence Assistant', 'SQL Operator', 'Reporting Associate']
      },
      {
        name: 'Cybersecurity & Hacking',
        duration: '1 Year',
        eligibility: 'Class 10th passed with strong interest in computer systems.',
        description: 'Instruction in network security defenses, vulnerability testing, malware diagnostics, ethical penetration techniques, and security incident logs.',
        branches: ['Network Architecture Security', 'Ethical Penetration Tools', 'Malware Analysis Basics', 'Information Security Audits', 'Cryptography Concepts'],
        careerProspects: ['Security Associate', 'Network Defense Assistant', 'Vulnerability Assessor', 'Cyber Support Representative']
      },
      {
        name: 'Photography & Cinema',
        duration: '1 Year',
        eligibility: 'Class 10th pass with interest in visual media.',
        description: 'Covers camera mechanics, lens focal lengths, composition guidelines, lightning rigs, video shooting layouts, and digital editing workflows.',
        branches: ['Camera Aperture & ISO Controls', 'Lighting Techniques & Rigging', 'Storyboarding & Scene Angles', 'Video Post-Production', 'Commercial DSLR Settings'],
        careerProspects: ['Commercial Photographer', 'Assistant Cinematographer', 'Video Content Creator', 'Lighting Assistant']
      },
      {
        name: 'Event Management & PR',
        duration: '1 Year',
        eligibility: 'Passed Class 10th with strong verbal capability.',
        description: 'Practical instructions in event budgeting, venue coordination, artist relations, media drafting, corporate sponsorship logic, and crowd flow safety.',
        branches: ['Event Planning & Budgeting', 'Public Relations & Press Releases', 'Sponsor Acquisition', 'Venue & Vendor Logistics', 'Crisis Management'],
        careerProspects: ['Event Coordinator', 'PR Assistant', 'Venue Coordinator', 'Corporate Relations Associate']
      },
      {
        name: 'Music Production',
        duration: '1 Year',
        eligibility: 'Completed Class 10th with acoustic or musical interest.',
        description: 'Teaches digital audio workstation (DAW) editing, sequencing, synthesizers, mixing, dynamic sound design, beat matching, and live performance decks.',
        branches: ['Digital Audio Workstations (DAW)', 'Synthesizers & Sampling', 'Audio Mixing & Equalization', 'Beat Matching & DJ Decks', 'Acoustic Sound Design'],
        careerProspects: ['Assistant Sound Designer', 'Music Production Trainee', 'Live Event DJ', 'Audio Editor']
      },
      {
        name: 'Professional eSports & Gaming',
        duration: '1 Year',
        eligibility: 'Class 10th pass with gaming aptitude and lightning reflexes.',
        description: 'Curriculum addresses team tactics analysis, mechanical dexterity drills, gaming psychology, streaming workflows, hardware optimizations, and tournament regulations.',
        branches: ['Team Tactics & Game Analysis', 'Reflex & Dexterity Training', 'Esports Team Communication', 'Gaming Gear & Optimization', 'Tournament Rules & Logistics'],
        careerProspects: ['Esports Athlete Trainee', 'Esports Team Analyst', 'Stream Operations Manager', 'Guild & Tournament Moderator']
      },
      {
        name: 'Content Creation',
        duration: '1 Year',
        eligibility: 'Completed Class 10th with outgoing presentation personality.',
        description: 'Script preparation, video presentation, microphone guidelines, audience analytics, channel SEO, and brand collaboration negotiations.',
        branches: ['Video Scriptwriting & Hooks', 'On-Camera Presentation Skills', 'Audio/Video Production Basics', 'Content Scheduling & SEO', 'Sponsor Negotiations'],
        careerProspects: ['YouTube Content Producer', 'Social Media Influencer', 'Brand Ambassador', 'Podcast Producer']
      },
      {
        name: 'Professional Baking',
        duration: '1 Year',
        eligibility: 'Passed Class 10th with basic culinary interest.',
        description: 'Comprehensive training in oven temperatures, flour chemistry, bread dough structures, sugar sculpting, and commercial baking layouts.',
        branches: ['Oven Operations & Temperatures', 'Bread & Sourdough Fermentation', 'Cake Decoration & Sugar Craft', 'Patisserie & Pastry Chemistry', 'Baking Shop Safety'],
        careerProspects: ['Pastry Commis Chef', 'Bakeshop Baker', 'Patisserie Associate', 'Home Bakery Entrepreneur']
      },
      {
        name: 'Interior Styling',
        duration: '1 to 2 Years',
        eligibility: 'Passed Class 10th with space styling interest.',
        description: 'Aesthetic arrangements of rooms, color pallet logic, materials and textile selection, furniture layouts, and 2D interior draft alignments.',
        branches: ['Spatial Planning & Layouts', 'Color Palette Harmony', 'Textiles, Materials & Textures', 'Lighting Design Fundamentals', '2D Interior Draft Rendering'],
        careerProspects: ['Styling Assistant', 'Visual Merchandiser', 'Interior Consultant', 'Furniture Decor Advisor']
      },
      {
        name: 'Beauty & Wellness',
        duration: '1 Year',
        eligibility: 'Passed Class 10th with interest in wellness and styling.',
        description: 'Covers beauty parlor cosmetology, bridal hair styling, organic skincare therapies, cosmetic tools safety, and salon cash register bookkeeping.',
        branches: ['Cosmetology & Hair Styling', 'Aesthetic Skincare Therapies', 'Bridal Makeup Artistry', 'Salon Sanitation & Safety', 'Salon Management Basics'],
        careerProspects: ['Skincare Specialist', 'Professional Makeup Artist', 'Salon Assistant Manager', 'Beauty Advisor']
      },
      {
        name: 'Yoga Instruction',
        duration: '1 Year',
        eligibility: 'Class 10th passed with active physical fitness.',
        description: 'Asana posture mechanics, pranayama respiratory control, stretching physiology, nutrition essentials, and client training safety protocols.',
        branches: ['Asana Postures & Dynamics', 'Pranayama & Meditation Guides', 'Anatomy & Physiology of Stretching', 'Nutrition & Lifestyle Essentials', 'Client Gym Safety Protocols'],
        careerProspects: ['Yoga Instructor assistant', 'Gym Fitness Trainer', 'Corporate Wellness Advisor', 'Health Club Guide']
      }
    ]
  }
];

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 1,
    question: "When you have a toy, appliance, or bicycle that stops working, what is your first reaction?",
    category: 'technical',
    options: [
      {
        text: "I read about how it works, look at circuit diagrams, or take it apart to inspect the interior mechanism.",
        scoreWeight: { diploma: 3, iti: 2 }
      },
      {
        text: "I wonder if there is a company or manual that has an active solution, or think of buying a better model.",
        scoreWeight: { '12th_intermediate': 2, vocational: 2 }
      },
      {
        text: "I focus on treating the physical damage, checking user safety, or asking family members if they are hurt.",
        scoreWeight: { paramedical: 3 }
      },
      {
        text: "I try to quickly find a hand tool (like a screwdriver or wire stripper) to fix it immediately myself.",
        scoreWeight: { iti: 3, diploma: 1 }
      }
    ]
  },
  {
    id: 2,
    question: "Which of these subjects did you find most engaging during your 10th-grade studies?",
    category: 'analytical',
    options: [
      {
        text: "Theoretical Math & Advanced Physics — deriving formulas and solving complex numerical equations.",
        scoreWeight: { '12th_intermediate': 3 }
      },
      {
        text: "Human Biology, plants, anatomy, or understanding how diseases affect the human body.",
        scoreWeight: { paramedical: 3, '12th_intermediate': 2 }
      },
      {
        text: "Applied Mathematics and practical mechanics — how gears, electrical motors, or logic gates operate.",
        scoreWeight: { diploma: 3, iti: 2 }
      },
      {
        text: "Social Studies, Civics, Business details, budgeting, or local cultural histories.",
        scoreWeight: { vocational: 3, '12th_intermediate': 1 }
      }
    ]
  },
  {
    id: 3,
    question: "If you were to work at a medical clinic, which job role would you feel most content performing?",
    category: 'social',
    options: [
      {
        text: "Managing patient billing, planning clinical rosters, or marketing the clinic's online services.",
        scoreWeight: { vocational: 3 }
      },
      {
        text: "Conducting blood tests, running the high-tech X-ray/CT scan systems, and producing detailed lab reports.",
        scoreWeight: { paramedical: 3, diploma: 1 }
      },
      {
        text: "Engaging in long-term biochem research to develop advanced pharmaceutical vaccinations.",
        scoreWeight: { '12th_intermediate': 3 }
      },
      {
        text: "Assembling, maintaining, and wiring medical oxygen valves or dental chairs.",
        scoreWeight: { iti: 3 }
      }
    ]
  },
  {
    id: 4,
    question: "When you imagine your workspace 5 years from now, what does it look like?",
    category: 'administrative',
    options: [
      {
        text: "A structured university campus, a corporate corporate office, or a modern research laboratory.",
        scoreWeight: { '12th_intermediate': 3 }
      },
      {
        text: "A technical computer lab, industrial workshop, or a busy mechanical production factory.",
        scoreWeight: { diploma: 3 }
      },
      {
        text: "A clean hospital diagnostic unit, trauma team, or specialized pharmacy care center.",
        scoreWeight: { paramedical: 3 }
      },
      {
        text: "An active on-site service zone, retail outfit, travel hub, or independent repair studio.",
        scoreWeight: { iti: 2, vocational: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "What is your main goal to achieve within the next 3 to 4 years?",
    category: 'analytical',
    options: [
      {
        text: "I want to gain high technical manual skills so that I can start earning or run a workshop immediately.",
        scoreWeight: { iti: 3 }
      },
      {
        text: "I want to complete an advanced practical license (like software, construction, or electronics) and seek corporate entry.",
        scoreWeight: { diploma: 3 }
      },
      {
        text: "I want to learn hospitality, business management, or design skills to start my own boutique or travel agency.",
        scoreWeight: { vocational: 3 }
      },
      {
        text: "I want to qualify for premier national entrance exams to study at a top-tier university or central college.",
        scoreWeight: { '12th_intermediate': 3 }
      }
    ]
  }
];

export const COLLEGES_DATA: College[] = [
  // 12th Intermediate
  {
    id: 'col_12_1',
    name: 'St. Mary Senior Secondary College',
    stream: '12th_intermediate',
    course: 'Science (MPC) & Commerce (MEC)',
    location: 'Bangalore, Karnataka',
    type: 'Government-Aided',
    duration: '2 Years',
    approxFeesPerYear: '₹25,00,000 / Year',
    rating: 4.5,
    description: 'Renowned for record-breaking college placements in state and national engineering entrance exams. Includes excellent science labs.'
  },
  {
    id: 'col_12_2',
    name: 'National Junior College',
    stream: '12th_intermediate',
    course: 'Science (BiPC) & Arts (HEC)',
    location: 'Hyderabad, Telangana',
    type: 'Government',
    duration: '2 Years',
    approxFeesPerYear: '₹8,000 / Year',
    rating: 4.2,
    description: 'Highly affordable state government college offering pristine class infrastructure with top-tier lecturers of high experience.'
  },
  {
    id: 'col_12_3',
    name: 'Presidential International College',
    stream: '12th_intermediate',
    course: 'Commerce (CEC) & Humanities',
    location: 'Mumbai, Maharashtra',
    type: 'Private',
    duration: '2 Years',
    approxFeesPerYear: '₹85,000 / Year',
    rating: 4.7,
    description: 'Ultra-modern campus featuring specialized commerce tutorials, career counseling, debate clubs, and entrepreneur workshops.'
  },

  // Diploma Polytechnic
  {
    id: 'col_dip_1',
    name: 'Government Polytechnic College',
    stream: 'diploma',
    course: 'Diploma in Computer Science / Mechanical',
    location: 'Chennai, Tamil Nadu',
    type: 'Government',
    duration: '3 Years',
    approxFeesPerYear: '₹12,000 / Year',
    rating: 4.6,
    description: 'Premier polytechnic institution of the state with robust machine shops, heavy casting labs, and direct campus recruiting by major automobile firms.'
  },
  {
    id: 'col_dip_2',
    name: 'Apex Institute of Polytechnic Engineering',
    stream: 'diploma',
    course: 'Diploma in Electrical / Civil Engineering',
    location: 'Pune, Maharashtra',
    type: 'Private',
    duration: '3 Years',
    approxFeesPerYear: '₹60,000 / Year',
    rating: 4.0,
    description: 'Known for industrial collaboration programs. Offers internships with local manufacturing plants and high lateral entry success rates.'
  },

  // Paramedical
  {
    id: 'col_par_1',
    name: 'Rajiv Gandhi Institute of Paramedical Science',
    stream: 'paramedical',
    course: 'Diploma in Medical Lab Technology (DMLT)',
    location: 'Delhi NCR',
    type: 'Government-Aided',
    duration: '2 Years',
    approxFeesPerYear: '₹35,000 / Year',
    rating: 4.4,
    description: 'Affiliated with premier hospitals, allowing real-time clinical rounds, patient diagnostic procedures, and blood safety workshops.'
  },
  {
    id: 'col_par_2',
    name: 'Metro Diagnostics & Paramedical Academy',
    stream: 'paramedical',
    course: 'Diploma in X-Ray & Imaging Technology',
    location: 'Kolkata, West Bengal',
    type: 'Private',
    duration: '2 Years',
    approxFeesPerYear: '₹75,000 / Year',
    rating: 4.3,
    description: 'Features fully simulated hospital environments with high-end MRI, CT scanners, and biochemical diagnostic testing laboratories.'
  },

  // ITI
  {
    id: 'col_iti_1',
    name: 'Government ITI (Industrial Training Institute)',
    stream: 'iti',
    course: 'ITI Electrician / Fitter Trades',
    location: 'Ahmedabad, Gujarat',
    type: 'Government',
    duration: '2 Years',
    approxFeesPerYear: '₹4,000 / Year',
    rating: 4.2,
    description: 'National Level Grade-A ITI. Free safety toolkits provided. Directly sponsored by public manufacturing and railway coach builders.'
  },
  {
    id: 'col_iti_2',
    name: 'Shree Sai Industrial Technical Institute',
    stream: 'iti',
    course: 'Diesel Mechanic / Turner Class',
    location: 'Jaipur, Rajasthan',
    type: 'Private',
    duration: '1 Year',
    approxFeesPerYear: '₹22,000 / Year',
    rating: 4.1,
    description: 'Pioneers in engine diagnostics. Focuses heavily on computer numerical control (CNC) programming and heavy vehicle repair skills.'
  },

  // Vocational
  {
    id: 'col_voc_1',
    name: 'National Vocational Training Center',
    stream: 'vocational',
    course: 'Travel, Tourism & Hospitality Diploma',
    location: 'Cochin, Kerala',
    type: 'Government',
    duration: '1 Year',
    approxFeesPerYear: '₹15,000 / Year',
    rating: 4.3,
    description: 'Located in the tourism hub of India. Students get certified ticketing software credentials and undergo 6 months of mandatory active cruise/hotel internships.'
  },
  {
    id: 'col_voc_2',
    name: 'Deccan School of Apparel Design',
    stream: 'vocational',
    course: 'Fashion & Apparel Designing Studies',
    location: 'Bengaluru, Karnataka',
    type: 'Private',
    duration: '1.5 Years',
    approxFeesPerYear: '₹55,000 / Year',
    rating: 4.5,
    description: 'Offers specialized design laboratories with sewing simulators, digital embroidery machinery, and annual portfolio displays to local textile designers.'
  }
];

export const JOBS_DATA: JobProfile[] = [
  // 12th Intermediate (Note: Most need B.Tech/MBBS after 12th)
  {
    id: 'job_12_1',
    title: 'Graduate Engineer (Post B.Tech / BE)',
    stream: '12th_intermediate',
    averageSalary: '₹4,50,000 - ₹12,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Analytical Logic', 'Physics/Math', 'Programming', 'Project Coordination'],
    description: 'Requires taking 12th Science (MPC), then clearing JEE/EAMCET entrance exams to pursue B.Tech or B.E. Highly lucrative and flexible career path.',
    entryBarrier: 'High'
  },
  {
    id: 'job_12_2',
    title: 'Chartered Accountant (Post B.Com + CA)',
    stream: '12th_intermediate',
    averageSalary: '₹6,00,000 - ₹20,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Financial Accounting', 'Corporate Tax Law', 'Auditing Compliance', 'Excel Analytical skills'],
    description: 'A prestigious, safe career path beginning with 12th Commerce (CEC/MEC) and registering for the ICAI CA exams. High in demand across all corporate sectors.',
    entryBarrier: 'High'
  },
  {
    id: 'job_12_3',
    title: 'Data Scientist (Post B.Tech/B.Sc Stats)',
    stream: '12th_intermediate',
    averageSalary: '₹5,00,000 - ₹15,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Machine Learning', 'Statistical Modeling', 'Python/R', 'Data Visualization'],
    description: 'Analyze complex data sets to help organizations make informed decisions. Requires a strong mathematical foundation from 12th (MPC) and a relevant degree.',
    entryBarrier: 'High'
  },
  {
    id: 'job_12_4',
    title: 'Digital Marketing Specialist',
    stream: '12th_intermediate',
    averageSalary: '₹3,00,000 - ₹8,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['SEO/SEM', 'Content Strategy', 'Social Media Analytics', 'Ad Campaign Management'],
    description: 'Manage online presence and marketing campaigns for brands. Can be pursued after any 12th stream with a degree in Marketing, Communications, or specialized certifications.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_12_5',
    title: 'Corporate Lawyer (Post LLB/B.A. LLB)',
    stream: '12th_intermediate',
    averageSalary: '₹5,00,000 - ₹25,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Legal Research', 'Contract Drafting', 'Corporate Law', 'Negotiation Skills'],
    description: 'Advise businesses on legal rights and duties. Requires 12th in any stream (Arts/Comm/Sci) followed by a 5-year integrated law degree or 3-year LLB after graduation.',
    entryBarrier: 'High'
  },
  {
    id: 'job_12_6',
    title: 'Business Analyst',
    stream: '12th_intermediate',
    averageSalary: '₹4,00,000 - ₹12,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Requirements Gathering', 'Data Analysis', 'Process Mapping', 'Stakeholder Management'],
    description: 'Bridge the gap between business needs and IT solutions. Typically pursued after a degree in Business (BBA/B.Com) or Engineering (B.Tech) following 12th.',
    entryBarrier: 'Medium'
  },

  // Diploma
  {
    id: 'job_dip_1',
    title: 'Junior Electrical Engineer (JE - Power Boards)',
    stream: 'diploma',
    averageSalary: '₹3,00,000 - ₹5,50,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['AC/DC Transformer Maintenance', 'Substation Inspection', 'Switchboard diagnostics', 'Industrial wiring safety'],
    description: 'Perfect role for polytechnic electrical diploma holders. Highly sought after in state electricity boards, Indian Railways, and manufacturing plants.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_dip_2',
    title: 'Associate Software Developer',
    stream: 'diploma',
    averageSalary: '₹3,50,000 - ₹6,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['JavaScript / Python', 'Database Queries', 'Web Layouts', 'Problem Solving'],
    description: 'Junior developer responsibilities. Focuses on writing modules, designing test scripts, and supporting live web apps for tech consulting firms.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_dip_3',
    title: 'Mechanical Design Engineer (Junior)',
    stream: 'diploma',
    averageSalary: '₹2,80,000 - ₹5,00,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['AutoCAD / SolidWorks', 'Machine Drawing', 'Material Science', 'Prototype Testing'],
    description: 'Design and develop mechanical components and systems. Ideal for Mechanical Diploma holders looking to work in automotive, aerospace, or manufacturing design labs.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_dip_4',
    title: 'Civil Site Supervisor',
    stream: 'diploma',
    averageSalary: '₹2,50,000 - ₹4,50,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Blueprint Reading', 'Labour Management', 'Quality Control', 'Safety Auditing'],
    description: 'Oversee daily operations on construction sites, ensuring projects adhere to designs and safety standards. Great for Civil Engineering Diploma graduates.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_dip_5',
    title: 'Automobile Service Manager',
    stream: 'diploma',
    averageSalary: '₹3,00,000 - ₹6,00,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Vehicle Diagnostics', 'Customer Service', 'Inventory Management', 'Team Leadership'],
    description: 'Manage service operations at car or bike dealerships. Requires a Diploma in Automobile Engineering and strong interpersonal skills.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_dip_6',
    title: 'Instrumentation Technician',
    stream: 'diploma',
    averageSalary: '₹2,60,000 - ₹5,50,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Sensor Calibration', 'PLC Programming', 'Circuit Troubleshooting', 'Industrial Automation'],
    description: 'Maintain and repair measuring and control instruments used in chemical plants, refineries, and automated factories. Suitable for Instrumentation/Electronics Diploma holders.',
    entryBarrier: 'Medium'
  },

  // Paramedical
  {
    id: 'job_par_1',
    title: 'Medical Laboratory Technician',
    stream: 'paramedical',
    averageSalary: '₹2,40,000 - ₹4,80,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Sterile Handling', 'Biochemical analysis', 'Diagnostic Microscope calibration', 'Hematology blood handling'],
    description: 'Work inside state-of-the-art hospitals or commercial blood analysis clinics. Run automated tests and prepare critical reports for treatment boards.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_par_2',
    title: 'Senior Radiology Technician',
    stream: 'paramedical',
    averageSalary: '₹3,00,000 - ₹5,00,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['X-ray, MRI, and CT operation', 'Radiation dosage safety', 'Anatomical mapping', 'Emergency hospital protocols'],
    description: 'Administer radiological scans accurately while maintaining strict physical safety guidelines against excessive exposure. High security of jobs.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_par_3',
    title: 'Operation Theatre Technician',
    stream: 'paramedical',
    averageSalary: '₹2,20,000 - ₹4,00,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Surgical Instrument Sterilization', 'Patient Positioning', 'Anaesthesia Support', 'OT Environment Control'],
    description: 'Assist surgeons and anaesthetists during surgeries. Ensure the OT is sterile and equipped with all necessary surgical instruments and machines.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_par_4',
    title: 'Dialysis Technician',
    stream: 'paramedical',
    averageSalary: '₹2,50,000 - ₹4,50,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Dialysis Machine Operation', 'Vascular Access Management', 'Patient Monitoring', 'Sterilization Protocols'],
    description: 'Operate dialysis machines for patients with kidney failure. Monitor patients throughout the process and ensure equipment is properly maintained and sanitized.',
    entryBarrier: 'Medium'
  },
  {
    id: 'job_par_5',
    title: 'Physiotherapy Assistant',
    stream: 'paramedical',
    averageSalary: '₹1,80,000 - ₹3,50,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Exercise Instruction', 'Massage Therapy', 'Patient Mobility Support', 'Treatment Equipment Prep'],
    description: 'Help physiotherapists in rehabilitating patients with physical injuries or disabilities. Requires a certificate or diploma in physiotherapy assisting.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_par_6',
    title: 'Emergency Medical Technician (EMT)',
    stream: 'paramedical',
    averageSalary: '₹2,40,000 - ₹4,50,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['First Aid/CPR', 'Emergency Response', 'Patient Stabilization', 'Ambulance Equipment Op'],
    description: 'Provide immediate life-saving care in emergency situations and during transport to hospitals. A critical role requiring high composure and quick thinking.',
    entryBarrier: 'Medium'
  },

  // ITI
  {
    id: 'job_iti_1',
    title: 'Industrial Plant Electrician',
    stream: 'iti',
    averageSalary: '₹1,80,000 - ₹3,60,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Manual wiring', 'Industrial Motor repairs', 'Short circuit diagnosis', 'Transformer oil checks'],
    description: 'Ensure constant supply and safety of power grids inside printing presses, production lines, or automotive fabrication units.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_iti_2',
    title: 'Mechanical Fitter',
    stream: 'iti',
    averageSalary: '₹1,80,000 - ₹3,50,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Lathe machinery', 'Metal fitting & sizing', 'Blueprint reading', 'Structural precision'],
    description: 'Responsible for installing heavy machine frames, assembling gears, checking tolerances with micrometers, and handling basic plant welding.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_iti_3',
    title: 'Diesel Mechanic',
    stream: 'iti',
    averageSalary: '₹1,70,000 - ₹3,30,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Engine Overhauling', 'Fuel Injection Systems', 'Brake Calibration', 'Diagnostic Tool Usage'],
    description: 'Specialize in repairing and maintaining diesel engines used in trucks, buses, and heavy machinery. Essential for logistics and transport sectors.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_iti_4',
    title: 'Structural Welder',
    stream: 'iti',
    averageSalary: '₹1,90,000 - ₹3,80,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['ARC/TIG/MIG Welding', 'Metal Cutting', 'Structural Safety', 'Blueprint Interpretation'],
    description: 'Join metal components for buildings, bridges, and industrial structures. Requires high precision and adherence to strict safety and durability standards.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_iti_5',
    title: 'Industrial Plumber',
    stream: 'iti',
    averageSalary: '₹1,60,000 - ₹3,20,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['Pipe Fitting', 'Pumping Systems', 'Leakage Detection', 'Hydraulic Maintenance'],
    description: 'Install and repair large-scale water and chemical piping systems in factories and commercial buildings. ITI Plumber trade is the standard entry path.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_iti_6',
    title: 'Electronics Mechanic',
    stream: 'iti',
    averageSalary: '₹1,80,000 - ₹3,50,000 / Year',
    growthPotential: 'Steady',
    keySkills: ['PCB Soldering', 'Circuit Board Testing', 'Consumer Electronics Repair', 'Signal Calibration'],
    description: 'Repair and maintain electronic equipment such as UPS, Inverters, and specialized industrial gadgets. Great for students interested in hardware electronics.',
    entryBarrier: 'Low'
  },

  // Vocational
  {
    id: 'job_voc_1',
    title: 'Hospitality & Front Desk Coordinator',
    stream: 'vocational',
    averageSalary: '₹2,20,000 - ₹4,50,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Active listening', 'PMS reservation software', 'Guest check-in administration', 'Conflict resolution'],
    description: 'Engage with clients, process tickets, manage room structures, and ensure high quality of service delivery in hotel resorts or travel offices.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_voc_2',
    title: 'Boutique Apparel Designer',
    stream: 'vocational',
    averageSalary: '₹2,50,000 - ₹6,00,000 / Year',
    growthPotential: 'High',
    keySkills: ['Fabric Knowledge', 'Sketching designs', 'Tailoring modifications', 'E-commerce operations'],
    description: 'Launch a self-owned boutique or join retail apparel brands. Create customized patterns, select color textures, and manage client fitting reviews.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_voc_3',
    title: 'Graphic Designer & Content Creator',
    stream: 'vocational',
    averageSalary: '₹2,40,000 - ₹5,50,000 / Year',
    growthPotential: 'High',
    keySkills: ['Adobe Creative Suite', 'Visual Composition', 'Typography', 'Video Editing Basics'],
    description: 'Create visual concepts for advertisements, brochures, and digital media. A great creative path for vocational students with a flair for design.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_voc_4',
    title: 'Beauty & Wellness Consultant',
    stream: 'vocational',
    averageSalary: '₹2,00,000 - ₹4,00,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Skin/Hair Analysis', 'Makeup Artistry', 'Customer Relationship Management', 'Wellness Product Sales'],
    description: 'Provide personalized beauty and wellness advice. Work in high-end salons, spas, or as independent consultants for cosmetic brands.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_voc_5',
    title: 'Travel & Tourism Executive',
    stream: 'vocational',
    averageSalary: '₹2,20,000 - ₹4,80,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Itinerary Planning', 'GDS Systems', 'Visa Processing Knowledge', 'Customer Engagement'],
    description: 'Plan and sell transportation and accommodations for travel agencies or corporate groups. Focuses on tour package creation and logistics management.',
    entryBarrier: 'Low'
  },
  {
    id: 'job_voc_6',
    title: 'Fashion Merchandiser',
    stream: 'vocational',
    averageSalary: '₹2,50,000 - ₹5,00,000 / Year',
    growthPotential: 'Medium',
    keySkills: ['Trend Forecasting', 'Inventory Planning', 'Visual Merchandising', 'Supplier Management'],
    description: 'Coordinate between designers and retailers to ensure the right products reach the stores. Blends creative fashion sense with business logistics.',
    entryBarrier: 'Low'
  }
];

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'men_science_1',
    name: 'Dr. Vivek Swaminathan',
    role: 'Principal Scientist (Pharmaceutical Research)',
    companyOrHospital: 'Biocon Labs',
    stream: '12th_intermediate',
    bio: 'Vivek has 14+ years of research training in biomedical studies and oncology pharmaceuticals, advising students on pursuing MPC/BiPC, pure sciences, research papers, and competitive entrance exam patterns.',
    avatarSeed: 'vivek',
    expertQueryHint: 'Ask about BiPC vs MPC, research scope, JEE/NEET prep, or medicine academic timelines.'
  },
  {
    id: 'men_tech_1',
    name: 'Anjali Sharma',
    role: 'Senior Software Engineer (Systems Lead)',
    companyOrHospital: 'Capgemini Tech',
    stream: 'diploma',
    bio: 'Anjali started with a 3-year Polytechnic DCSE, entered engineering laterally, and is now an expert architect on distributed clouds. She helps students map software design careers, lateral admissions, and tech trends.',
    avatarSeed: 'anjali',
    expertQueryHint: 'Ask about polytechnic course options, direct IT job vs lateral entry B.Tech, or software engineer salaries.'
  },
  {
    id: 'men_medical_1',
    name: 'Karan Malhotra',
    role: 'Chief Diagnostic Manager',
    companyOrHospital: 'Apollo Healthcare Group',
    stream: 'paramedical',
    bio: 'With over 12 years managing state-of-the-art DMLT and imaging hubs, Karan gives students real insights into clinical laboratory tech, hospital staffing, dialysis jobs, and diagnostic licensing.',
    avatarSeed: 'karan',
    expertQueryHint: 'Ask about clinical labs, DMLT scope, imaging safety, or hospital placement opportunities.'
  },
  {
    id: 'men_craft_1',
    name: 'Mohammad Yusuf',
    role: 'Senior Workshop Lead & Machinist',
    companyOrHospital: 'Bharat Heavy Electricals (BHEL)',
    stream: 'iti',
    bio: 'Yusuf completed his ITI Electrician and fitter trades, spent 18 years maintaining high-pressure turbine lines, and coaches young craftsmen on skill certifications, railway jobs, and self-employment.',
    avatarSeed: 'yusuf',
    expertQueryHint: 'Ask about ITI trades, plant electrician jobs, railways criteria, or setting up a personal shop.'
  },
  {
    id: 'men_voc_1',
    name: 'Pooja Nair',
    role: 'Tourism Director & Boutique Founder',
    companyOrHospital: 'Vagabond Travels & Design Studio',
    stream: 'vocational',
    bio: 'Pooja is an entrepreneur who bridges apparel designs and tourism packages. She explains hospitality platforms, boutique logistics, styling careers, and vocational career maps.',
    avatarSeed: 'pooja',
    expertQueryHint: 'Ask about boutique operations, travel management, vocational courses vs standard arts, or self-funding.'
  }
];
