import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load models
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Branch from '../models/Branch.js';
import Course from '../models/Course.js';
import CourseCategory from '../models/CourseCategory.js';
import CourseDetail from '../models/CourseDetail.js';
import EducationLevel from '../models/EducationLevel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uthink';

const pathwaysData = [
  {
    levelSlug: 'after-10th',
    name: 'PUC (11th-12th)',
    slug: 'puc',
    duration: '2 Years',
    description: 'Academic path to degree',
    entryRequirement: 'SSLC / 10th Pass',
    order: 1,
    streams: [
      {
        name: 'Science',
        slug: 'science',
        description: 'Core Science Stream (PCMB/PCM/PCB)',
        duration: '2 Years',
        coreSubjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Kannada/English'],
        electives: ['Computer Science', 'Electronics', 'Statistics', 'Psychology'],
        examDates: {
          'Physics': 'March 6',
          'Chemistry': 'March 9',
          'Mathematics': 'March 14',
          'Biology': 'March 16',
          'Computer Science': 'March 16',
          'Electronics': 'March 11',
          'Statistics': 'March 2'
        },
        branches: [
          { name: 'BE/BTech (Engineering)', duration: '4 Years', careerOpportunities: ['Software Engineer', 'Civil Engineer', 'Mechanical Engineer'] },
          { name: 'MBBS (Medical)', duration: '5.5 Years', careerOpportunities: ['General Medicine', 'Surgery'] },
          { name: 'BDS (Dental)', duration: '5 Years', careerOpportunities: ['Oral Surgery', 'Periodontology'] },
          { name: 'BPharm (Pharmacy)', duration: '4 Years', careerOpportunities: ['Pharmaceutics', 'Pharmacology'] },
          { name: 'BSc (Basic Sciences)', duration: '3 Years', careerOpportunities: ['Physics', 'Chemistry', 'Math', 'Biology'] },
          { name: 'BSc Nursing', duration: '4 Years', careerOpportunities: ['General', 'Psychiatric Nursing'] },
          { name: 'BPT (Physiotherapy)', duration: '4.5 Years', careerOpportunities: ['Rehabilitation', 'Sports'] },
          { name: 'BArch (Architecture)', duration: '5 Years', careerOpportunities: ['Architectural Design'] },
          { name: 'BSc Agriculture', duration: '4 Years', careerOpportunities: ['Agronomy', 'Horticulture'] },
          { name: 'BVSc (Veterinary)', duration: '5 Years', careerOpportunities: ['Animal Medicine'] },
          { name: 'BAMS (Ayurveda)', duration: '5.5 Years', careerOpportunities: ['Ayurvedic Medicine'] },
          { name: 'BHMS (Homeopathy)', duration: '5.5 Years', careerOpportunities: ['Homeopathic Medicine'] },
          { name: 'BUMS (Unani)', duration: '5.5 Years', careerOpportunities: ['Unani Medicine'] },
          { name: 'BSc Anthropology', duration: '3 Years', careerOpportunities: ['Physical & Cultural Anthropology'] }
        ]
      },
      {
        name: 'Commerce',
        slug: 'commerce',
        description: 'Business, Finance, and Accountancy',
        duration: '2 Years',
        coreSubjects: ['Accountancy', 'Business Studies', 'Economics', 'Kannada/English'],
        electives: ['Statistics', 'Computer Science', 'Logic', 'Mathematics'],
        examDates: {
          'Business Studies': 'March 7',
          'Economics': 'March 10',
          'Accountancy': 'March 14',
          'Statistics': 'March 2',
          'Basic Mathematics': 'March 9'
        },
        branches: [
          { name: 'BCom', duration: '3 Years', careerOpportunities: ['General', 'Accounting', 'Finance'] },
          { name: 'BBA', duration: '3 Years', careerOpportunities: ['Business Administration'] },
          { name: 'BBM/BMS', duration: '3 Years', careerOpportunities: ['Management Studies'] },
          { name: 'CA (Chartered Accountancy)', duration: '4-5 Years', careerOpportunities: ['Accounting', 'Auditing', 'Taxation'] },
          { name: 'CS (Company Secretary)', duration: '3-4 Years', careerOpportunities: ['Corporate Compliance', 'Governance'] },
          { name: 'CMA (Cost Management Accountant)', duration: '3-4 Years', careerOpportunities: ['Cost & Management Accounting'] },
          { name: 'CFA (Chartered Financial Analyst)', duration: 'Varies', careerOpportunities: ['Investment Analysis', 'Portfolio'] },
          { name: 'LLB (Law)', duration: '3/5 Years', careerOpportunities: ['Constitutional', 'Criminal', 'Corporate'] },
          { name: 'BHM (Hotel Management)', duration: '3 Years', careerOpportunities: ['Hospitality', 'Tourism'] },
          { name: 'BA Economics', duration: '3 Years', careerOpportunities: ['Development', 'Finance', 'Policy'] }
        ]
      },
      {
        name: 'Arts / Humanities',
        slug: 'arts',
        description: 'Social Sciences, Languages, and Arts',
        duration: '2 Years',
        coreSubjects: ['History', 'Political Science', 'Sociology', 'Languages'],
        electives: ['Psychology', 'Economics', 'Geography', 'Logic', 'Home Science', 'Music'],
        examDates: {
          'Geography/Statistics/Psychology': 'March 2',
          'English': 'March 3',
          'History': 'March 5',
          'Political Science': 'March 13',
          'Sociology': 'March 16',
          'Logic/Electronics/Home Science': 'March 11'
        },
        branches: [
          { name: 'BA (History, Political Science, etc.)', duration: '3 Years', careerOpportunities: ['Various specializations'] },
          { name: 'BA Journalism & Mass Communication', duration: '3 Years', careerOpportunities: ['Print', 'Electronic', 'Digital'] },
          { name: 'BA Anthropology', duration: '3 Years', careerOpportunities: ['Physical & Cultural Anthropology'] },
          { name: 'BSW (Social Work)', duration: '3 Years', careerOpportunities: ['Community Development'] },
          { name: 'BA LLB (Integrated Law)', duration: '5 Years', careerOpportunities: ['Law + Arts'] },
          { name: 'LLB (Law)', duration: '3 Years', careerOpportunities: ['Constitutional', 'Criminal', 'Corporate'] },
          { name: 'B.Ed (Teaching)', duration: '2 Years', careerOpportunities: ['Teaching', 'Special Education'] },
          { name: 'Psychology (BA/MA)', duration: '3+2 Years', careerOpportunities: ['Clinical', 'Industrial', 'Counseling'] },
          { name: 'BFA (Fine Arts)', duration: '4 Years', careerOpportunities: ['Painting', 'Sculpture', 'Applied Arts'] },
          { name: 'BHM (Hotel Management)', duration: '3 Years', careerOpportunities: ['Hospitality', 'Tourism'] },
          { name: 'Bachelor Degree in Choreography', duration: '3 Years', careerOpportunities: ['Dance', 'Performance'] }
        ]
      },
      {
        name: 'Vocational',
        slug: 'vocational',
        description: 'Job-ready skills in various sectors',
        duration: '2 Years',
        coreSubjects: ['Information Technology (IT)', 'Healthcare', 'Retail', 'Automobile', 'Electronics & Hardware', 'Apparel & Home Furnishing', 'Beauty & Wellness'],
        electives: [],
        examDates: {
          'IT/Retail/Automobile/Healthcare': 'March 17',
          'Electronics & Hardware': 'March 17'
        },
        branches: [
          { name: 'IT/Software Development', duration: '2 Years', careerOpportunities: ['Software Development'] },
          { name: 'Healthcare/Nursing', duration: '2 Years', careerOpportunities: ['Healthcare'] },
          { name: 'Retail Management', duration: '2 Years', careerOpportunities: ['Retail'] },
          { name: 'Automobile Engineering', duration: '2 Years', careerOpportunities: ['Automobile Engineering'] },
          { name: 'Hardware/Electronics', duration: '2 Years', careerOpportunities: ['Hardware', 'Electronics'] },
          { name: 'Fashion Design/Apparel', duration: '2 Years', careerOpportunities: ['Fashion Design'] },
          { name: 'Beauty & Wellness/Spa Management', duration: '2 Years', careerOpportunities: ['Beauty', 'Wellness'] }
        ]
      }
    ]
  },
  {
    levelSlug: 'after-10th',
    name: 'ITI',
    slug: 'iti',
    duration: '1-2 Years',
    description: 'Skill-based technical training',
    entryRequirement: 'SSLC / 10th Pass',
    order: 2,
    streams: [
      {
        name: 'Engineering Trades',
        slug: 'iti-engineering',
        description: 'Technical manufacturing and repair trades',
        duration: '1-2 Years',
        branches: [
          { name: 'Fitter', duration: '2 Years', careerOpportunities: ['Maintenance', 'Manufacturing', 'Assembly'] },
          { name: 'Electrician', duration: '2 Years', careerOpportunities: ['Electrical Work', 'Wiring', 'Maintenance'] },
          { name: 'Electronic Mechanic', duration: '2 Years', careerOpportunities: ['Electronic Equipment Repair'] },
          { name: 'Welder (Gas & Electric)', duration: '1 Year', careerOpportunities: ['Fabrication', 'Construction', 'Repair'] },
          { name: 'Turner', duration: '2 Years', careerOpportunities: ['Lathe Operations', 'Machining'] },
          { name: 'Machinist', duration: '2 Years', careerOpportunities: ['Machine Operations', 'Manufacturing'] },
          { name: 'Mechanic Motor Vehicle', duration: '2 Years', careerOpportunities: ['Automobile Repair', 'Service Centers'] },
          { name: 'Mechanic Refrigeration & AC', duration: '2 Years', careerOpportunities: ['AC', 'Refrigeration Systems'] },
          { name: 'Architectural Assistant', duration: '2 Years', careerOpportunities: ['Drafting', 'Building Design'] },
          { name: 'Instrument Mechanic', duration: '2 Years', careerOpportunities: ['Industrial Instrumentation'] }
        ]
      },
      {
        name: 'Non-Engineering Trades',
        slug: 'iti-non-engineering',
        description: 'Service and computer-based trades',
        duration: '1 Year',
        branches: [
          { name: 'Computer Operator & Programming Assistant (COPA)', duration: '1 Year', careerOpportunities: ['IT Support', 'Data Entry'] },
          { name: 'Sewing Technology / Fashion Design', duration: '1 Year', careerOpportunities: ['Tailoring', 'Fashion'] },
          { name: 'Data Entry Operator', duration: '1 Year', careerOpportunities: ['Data Entry'] },
          { name: 'Digital Photography', duration: '1 Year', careerOpportunities: ['Photography'] },
          { name: 'Hair & Skin Care', duration: '1 Year', careerOpportunities: ['Salon', 'Beauty'] },
          { name: 'Embroidery & Needle Work', duration: '1 Year', careerOpportunities: ['Tailoring'] },
          { name: 'Domestic Housekeeping', duration: '1 Year', careerOpportunities: ['Housekeeping'] },
          { name: 'Dairying', duration: '1 Year', careerOpportunities: ['Dairy Farming'] },
          { name: 'Dress Making', duration: '1 Year', careerOpportunities: ['Tailoring'] },
          { name: 'Stenography', duration: '1 Year', careerOpportunities: ['Stenography'] }
        ]
      }
    ]
  },
  {
    levelSlug: 'after-10th',
    name: 'Diploma',
    slug: 'diploma',
    duration: '3 Years',
    description: 'Polytechnic education',
    entryRequirement: 'SSLC / 10th Pass (35%)',
    order: 3,
    streams: [
      {
        name: 'Engineering Diploma',
        slug: 'diploma-engineering',
        description: 'Core engineering polytechnic branches',
        duration: '3 Years',
        branches: [
          { name: 'Civil Engineering (DCE)', duration: '3 Years', careerOpportunities: ['Building Construction', 'Transportation'] },
          { name: 'Mechanical Engineering (DME)', duration: '3 Years', careerOpportunities: ['Manufacturing', 'Thermal', 'Design'] },
          { name: 'Computer Science & Engineering (DCST)', duration: '3 Years', careerOpportunities: ['Programming', 'Networking', 'Database'] },
          { name: 'Electronics & Communication (DEC)', duration: '3 Years', careerOpportunities: ['Embedded Systems', 'Telecom'] },
          { name: 'Electrical & Electronics (DEE)', duration: '3 Years', careerOpportunities: ['Power Systems', 'Control Systems'] },
          { name: 'Automobile Engineering (DAE)', duration: '3 Years', careerOpportunities: ['Vehicle Systems', 'Manufacturing'] },
          { name: 'Mechatronics (DM)', duration: '3 Years', careerOpportunities: ['Robotics', 'Automation'] },
          { name: 'Information Sciences (DIS)', duration: '3 Years', careerOpportunities: ['Software Development', 'IT'] }
        ]
      }
    ]
  },
  {
    levelSlug: 'after-12th',
    name: 'Undergraduate Degree',
    slug: 'undergraduate',
    duration: '3-5 Years',
    description: 'Higher education bachelor degrees',
    entryRequirement: 'PUC / 12th Pass',
    order: 4,
    streams: [
      {
        name: 'Engineering (B.E / B.Tech)',
        slug: 'ug-engineering',
        description: 'Professional engineering degree',
        duration: '4 Years',
        branches: [
          { name: 'Computer Science & Engineering', duration: '4 Years', careerOpportunities: ['AI/ML', 'Data Science', 'Cyber Security', 'Cloud Computing'] },
          { name: 'Information Science & Engineering', duration: '4 Years', careerOpportunities: ['Software Development', 'Database'] },
          { name: 'Electronics & Communication', duration: '4 Years', careerOpportunities: ['VLSI', 'Embedded Systems', 'Wireless'] },
          { name: 'Electrical & Electronics Engineering', duration: '4 Years', careerOpportunities: ['Power Systems', 'Renewable Energy'] },
          { name: 'Mechanical Engineering', duration: '4 Years', careerOpportunities: ['Production', 'Thermal', 'Design', 'Industrial'] },
          { name: 'Civil Engineering', duration: '4 Years', careerOpportunities: ['Structural', 'Transportation', 'Environmental'] },
          { name: 'Electronics & Instrumentation Engineering', duration: '4 Years', careerOpportunities: ['Industrial Instrumentation'] },
          { name: 'Information Technology', duration: '4 Years', careerOpportunities: ['Software Development'] },
          { name: 'Industrial Production & Engineering', duration: '4 Years', careerOpportunities: ['Manufacturing', 'Production'] }
        ]
      },
      {
        name: 'Professional Degrees',
        slug: 'ug-professional',
        description: 'Medical, Law, Architecture and other professional degrees',
        duration: '3-5.5 Years',
        branches: [
          { name: 'MBBS (Medical)', duration: '5.5 Years', careerOpportunities: ['General Medicine', 'Surgery', 'Pediatrics'] },
          { name: 'BDS (Dental)', duration: '5 Years', careerOpportunities: ['Oral Surgery', 'Periodontology'] },
          { name: 'BUMS (Unani Medicine)', duration: '5.5 Years', careerOpportunities: ['Unani Medicine'] },
          { name: 'BAMS (Ayurveda)', duration: '5.5 Years', careerOpportunities: ['Ayurvedic Medicine'] },
          { name: 'BHMS (Homeopathy)', duration: '5.5 Years', careerOpportunities: ['Homeopathic Medicine'] },
          { name: 'BPharm (Pharmacy)', duration: '4 Years', careerOpportunities: ['Pharmaceutics', 'Pharmacology'] },
          { name: 'BSc Nursing', duration: '4 Years', careerOpportunities: ['General', 'Psychiatric Nursing'] },
          { name: 'BPT (Physiotherapy)', duration: '4.5 Years', careerOpportunities: ['Rehabilitation', 'Sports'] },
          { name: 'LLB (Law)', duration: '3/5 Years', careerOpportunities: ['Constitutional', 'Criminal', 'Corporate'] },
          { name: 'BA LLB (Integrated Law)', duration: '5 Years', careerOpportunities: ['Law + Arts'] },
          { name: 'BBA LLB (Integrated Law)', duration: '5 Years', careerOpportunities: ['Law + Management'] },
          { name: 'BArch (Architecture)', duration: '5 Years', careerOpportunities: ['Architectural Design'] },
          { name: 'BEd (Education)', duration: '2 Years', careerOpportunities: ['Teaching', 'Special Education'] },
          { name: 'BSc Interior Design', duration: '3 Years', careerOpportunities: ['Space Design'] },
          { name: 'BSc Fashion Design', duration: '3 Years', careerOpportunities: ['Garment Design'] },
          { name: 'BBA Hotel Management', duration: '3 Years', careerOpportunities: ['Hospitality', 'Tourism'] },
          { name: 'Bachelor of Choreography', duration: '3 Years', careerOpportunities: ['Dance', 'Performance'] },
          { name: 'BSc Anthropology', duration: '3 Years', careerOpportunities: ['Physical & Cultural'] },
          { name: 'BA Anthropology', duration: '3 Years', careerOpportunities: ['Physical & Cultural'] },
          { name: 'BSW (Social Work)', duration: '3 Years', careerOpportunities: ['Community Development'] }
        ]
      },
      {
        name: 'Bachelor of Science (B.Sc)',
        slug: 'ug-science',
        description: 'Basic and applied sciences',
        duration: '3 Years',
        branches: [
          { name: 'Physics', duration: '3 Years', careerOpportunities: ['Electronics', 'Material Science'] },
          { name: 'Chemistry', duration: '3 Years', careerOpportunities: ['Organic', 'Inorganic', 'Physical'] },
          { name: 'Mathematics', duration: '3 Years', careerOpportunities: ['Applied', 'Statistics'] },
          { name: 'Biology', duration: '3 Years', careerOpportunities: ['Zoology', 'Botany', 'Microbiology'] },
          { name: 'Computer Science', duration: '3 Years', careerOpportunities: ['Programming', 'Networking'] },
          { name: 'Psychology', duration: '3 Years', careerOpportunities: ['Clinical', 'Industrial'] },
          { name: 'Anthropology', duration: '3 Years', careerOpportunities: ['Physical', 'Cultural'] },
          { name: 'Interior Design', duration: '3 Years', careerOpportunities: ['Space Design'] },
          { name: 'Fashion Design', duration: '3 Years', careerOpportunities: ['Garment Design'] }
        ]
      },
      {
        name: 'Bachelor of Arts (B.A)',
        slug: 'ug-arts',
        description: 'Humanities and Social Sciences',
        duration: '3 Years',
        branches: [
          { name: 'History', duration: '3 Years', careerOpportunities: ['Ancient', 'Medieval', 'Modern'] },
          { name: 'Political Science', duration: '3 Years', careerOpportunities: ['Government', 'International Relations'] },
          { name: 'Economics', duration: '3 Years', careerOpportunities: ['Development', 'Finance'] },
          { name: 'Sociology', duration: '3 Years', careerOpportunities: ['Urban', 'Rural', 'Social Work'] },
          { name: 'Psychology', duration: '3 Years', careerOpportunities: ['Clinical', 'Organizational'] },
          { name: 'Journalism & Mass Communication', duration: '3 Years', careerOpportunities: ['Print', 'Electronic', 'Digital'] },
          { name: 'Anthropology', duration: '3 Years', careerOpportunities: ['Physical', 'Cultural'] },
          { name: 'Kannada', duration: '3 Years', careerOpportunities: ['Literature', 'Linguistics'] },
          { name: 'English', duration: '3 Years', careerOpportunities: ['Literature', 'Language'] }
        ]
      },
      {
        name: 'Commerce & Management (B.Com, BBA)',
        slug: 'ug-commerce',
        description: 'Business, Finance, and Management',
        duration: '3 Years',
        branches: [
          { name: 'General Commerce', duration: '3 Years', careerOpportunities: ['Commerce'] },
          { name: 'Accounting & Finance', duration: '3 Years', careerOpportunities: ['Accounting', 'Finance'] },
          { name: 'International Business', duration: '3 Years', careerOpportunities: ['International Business'] },
          { name: 'Taxation', duration: '3 Years', careerOpportunities: ['Taxation'] },
          { name: 'Banking & Insurance', duration: '3 Years', careerOpportunities: ['Banking', 'Insurance'] },
          { name: 'General Management (BBA)', duration: '3 Years', careerOpportunities: ['General Management'] },
          { name: 'Marketing (BBA)', duration: '3 Years', careerOpportunities: ['Marketing'] },
          { name: 'Finance (BBA)', duration: '3 Years', careerOpportunities: ['Finance'] },
          { name: 'Human Resources (BBA)', duration: '3 Years', careerOpportunities: ['Human Resources'] },
          { name: 'Hotel Management (BBA)', duration: '3 Years', careerOpportunities: ['Hospitality', 'Tourism'] }
        ]
      }
    ]
  },
  {
    levelSlug: 'pg',
    name: 'Postgraduate Degree',
    slug: 'postgraduate',
    duration: '2 Years',
    description: 'Masters degree programs',
    entryRequirement: 'Undergraduate Degree',
    order: 5,
    streams: [
      {
        name: 'Master of Technology (M.Tech)',
        slug: 'pg-mtech',
        description: 'Advanced engineering degree',
        duration: '2 Years',
        branches: [
          { name: 'Artificial Intelligence & Machine Learning', duration: '2 Years', careerOpportunities: ['Deep Learning', 'NLP'] },
          { name: 'Mineral Processing', duration: '2 Years', careerOpportunities: ['Mining', 'Processing'] },
          { name: 'Computer Science Engineering', duration: '2 Years', careerOpportunities: ['AI', 'ML', 'Data Science'] },
          { name: 'Structural Engineering', duration: '2 Years', careerOpportunities: ['Building Design', 'Earthquake'] },
          { name: 'Power & Energy', duration: '2 Years', careerOpportunities: ['Power Systems', 'Renewables'] }
        ]
      },
      {
        name: 'Master of Science (M.Sc)',
        slug: 'pg-msc',
        description: 'Advanced science degree',
        duration: '2 Years',
        branches: [
          { name: 'Genetics and Genomics', duration: '2 Years', careerOpportunities: ['Molecular Genetics'] },
          { name: 'Zoology', duration: '2 Years', careerOpportunities: ['Animal Sciences'] },
          { name: 'Botany', duration: '2 Years', careerOpportunities: ['Plant Sciences'] },
          { name: 'Statistics and Data Analytics', duration: '2 Years', careerOpportunities: ['Data Science'] },
          { name: 'Chemistry', duration: '2 Years', careerOpportunities: ['Analytical', 'Organic'] },
          { name: 'Industrial Chemistry', duration: '2 Years', careerOpportunities: ['Chemical Processing'] },
          { name: 'Mathematics', duration: '2 Years', careerOpportunities: ['Pure', 'Applied'] },
          { name: 'Physics', duration: '2 Years', careerOpportunities: ['Nuclear', 'Solid State'] },
          { name: 'Computer Science', duration: '2 Years', careerOpportunities: ['Advanced Computing'] },
          { name: 'Biotechnology', duration: '2 Years', careerOpportunities: ['Life Sciences'] },
          { name: 'Microbiology', duration: '2 Years', careerOpportunities: ['Microbiology'] },
          { name: 'Applied Geology', duration: '2 Years', careerOpportunities: ['Exploration'] }
        ]
      },
      {
        name: 'Master of Arts (M.A)',
        slug: 'pg-ma',
        description: 'Advanced humanities degree',
        duration: '2 Years',
        branches: [
          { name: 'Kannada', duration: '2 Years', careerOpportunities: ['Literature', 'Language'] },
          { name: 'English', duration: '2 Years', careerOpportunities: ['Literature', 'Language'] },
          { name: 'Economics', duration: '2 Years', careerOpportunities: ['Development', 'Finance'] },
          { name: 'Political Science', duration: '2 Years', careerOpportunities: ['Government', 'IR'] },
          { name: 'Sociology', duration: '2 Years', careerOpportunities: ['Urban', 'Rural'] },
          { name: 'History and Archaeology', duration: '2 Years', careerOpportunities: ['Ancient', 'Modern'] },
          { name: 'Journalism & Mass Communication', duration: '2 Years', careerOpportunities: ['Print', 'Electronic'] },
          { name: 'Women Studies', duration: '2 Years', careerOpportunities: ['Gender Studies'] },
          { name: 'Master of Performing Arts (Drama)', duration: '2 Years', careerOpportunities: ['Theatre', 'Performance'] }
        ]
      },
      {
        name: 'Other Masters Programs',
        slug: 'pg-other',
        description: 'MBA, MCA, MSW, LLM, etc.',
        duration: '2 Years',
        branches: [
          { name: 'Master of Social Work (MSW)', duration: '2 Years', careerOpportunities: ['Social Work'] },
          { name: 'Master of Library and Information Science (MLISc)', duration: '1-2 Years', careerOpportunities: ['Library Science'] },
          { name: 'Master of Law (LL.M)', duration: '2 Years', careerOpportunities: ['Law'] },
          { name: 'Master of Commerce (M.Com)', duration: '2 Years', careerOpportunities: ['Commerce', 'Accounting & Finance', 'Taxation'] },
          { name: 'Master of Business Administration (MBA)', duration: '2 Years', careerOpportunities: ['Business Administration'] },
          { name: 'Master of Computer Applications (MCA)', duration: '2 Years', careerOpportunities: ['Computer Applications'] },
          { name: 'Master of Education (M.Ed)', duration: '2 Years', careerOpportunities: ['Education'] },
          { name: 'Master of Physical Education (M.P.Ed)', duration: '2 Years', careerOpportunities: ['Physical Education'] }
        ]
      }
    ]
  },
  {
    levelSlug: 'pg',
    name: 'Research (PhD / MPhil)',
    slug: 'research',
    duration: '3-6 Years',
    description: 'Doctoral and research programs',
    entryRequirement: 'Postgraduate Degree',
    order: 6,
    streams: [
      {
        name: 'PhD Programs',
        slug: 'phd',
        description: 'Doctoral research programs',
        duration: '3-6 Years',
        branches: [
          { name: 'Engineering & Technology', duration: '3-6 Years', careerOpportunities: ['Research', 'Academia'] },
          { name: 'Science', duration: '3-6 Years', careerOpportunities: ['Research', 'Academia'] },
          { name: 'Arts & Humanities', duration: '3-6 Years', careerOpportunities: ['Research', 'Academia'] },
          { name: 'Management', duration: '3-6 Years', careerOpportunities: ['Research', 'Academia'] }
        ]
      }
    ]
  }
];

const courseCategoriesData = [
  {
    name: 'Makeup & Beauty Courses',
    slug: 'makeup-beauty',
    description: 'Professional makeup, beauty, and wellness courses',
    courses: [
      { title: 'Makeup Artist Course', duration: '4 Months', fees: '₹40,000-₹1.5 Lakh', keySkills: ['Bridal', 'Editorial', 'HD Makeup'], careerOpportunities: ['Film and TV sets', 'Bridal studios', 'Fashion and editorial shoots', 'E-commerce product campaigns', 'Freelance and private clients', 'Salon placements'] },
      { title: 'Beautician Course', duration: '4 Months', fees: '₹40,000-₹1.5 Lakh', keySkills: ['Facials', 'Threading', 'Skincare'], careerOpportunities: ['Salon placements', 'Freelance'] },
      { title: 'Makeup for South Indian Wedding', duration: '4 Months', fees: '₹40,000-₹1.5 Lakh', keySkills: ['Traditional & Contemporary Bridal Looks'], careerOpportunities: ['Bridal studios', 'Freelance'] },
      { title: 'Indian Makeup for Wedding', duration: '4 Months', fees: '₹40,000-₹1.5 Lakh', keySkills: ['Region-specific Wedding Styles'], careerOpportunities: ['Bridal studios', 'Freelance'] }
    ]
  },
  {
    name: 'Digital Marketing Courses',
    slug: 'digital-marketing',
    description: 'Comprehensive digital marketing and strategy',
    courses: [
      { title: 'SEO Training', duration: 'Varies', fees: 'Varies', keySkills: ['Search Engine Optimization'], careerOpportunities: ['SEO Executive'] },
      { title: 'Google Ads (PPC)', duration: 'Varies', fees: 'Varies', keySkills: ['PPC Campaign Management'], careerOpportunities: ['PPC Specialist'] },
      { title: 'Social Media Marketing', duration: 'Varies', fees: 'Varies', keySkills: ['Platform Management & Analytics'], careerOpportunities: ['Social Media Manager'] },
      { title: 'Content Marketing', duration: 'Varies', fees: 'Varies', keySkills: ['Content Strategy & Creation'], careerOpportunities: ['Content Strategist'] },
      { title: 'WordPress Web Development', duration: 'Varies', fees: 'Varies', keySkills: ['Website Development & Management'], careerOpportunities: ['Web Developer'] },
      { title: 'Digital Marketing Master Course', duration: 'Varies', fees: 'Varies', keySkills: ['Live Campaigns', 'Real Client Projects'], careerOpportunities: ['Digital Marketing Specialist'] }
    ]
  }
];


async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing Pathways & Streams data...');
    await Pathway.deleteMany({});
    await Stream.deleteMany({});
    await Course.deleteMany({});
    await Branch.deleteMany({});
    await CourseCategory.deleteMany({});
    await CourseDetail.deleteMany({});

    console.log('Seeding Pathways, Streams, and Branches...');
    for (const pathwayData of pathwaysData) {
      console.log(`Seeding Pathway: ${pathwayData.name}`);
      let eduLevel = await EducationLevel.findOne({ slug: pathwayData.levelSlug });
      if (!eduLevel) {
        eduLevel = await EducationLevel.create({ name: pathwayData.levelSlug, slug: pathwayData.levelSlug, order: 1 });
      }

      const pathway = await Pathway.create({
        educationLevelId: eduLevel._id,
        name: pathwayData.name,
        slug: pathwayData.slug,
        description: pathwayData.description,
        duration: pathwayData.duration,
        entryRequirement: pathwayData.entryRequirement,
        order: pathwayData.order
      });

      if (pathwayData.streams) {
        for (let i = 0; i < pathwayData.streams.length; i++) {
          const streamData = pathwayData.streams[i];
          const stream = await Stream.create({
            pathwayId: pathway._id,
            name: streamData.name,
            slug: streamData.slug,
            description: streamData.description,
            duration: streamData.duration,
            coreSubjects: streamData.coreSubjects,
            electives: streamData.electives,
            examDates: streamData.examDates,
            order: i
          });

          if (streamData.branches) {
            for (let j = 0; j < streamData.branches.length; j++) {
              const branchData = streamData.branches[j];
              const branchSlug = `${stream.slug}-${branchData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              await Course.create({
                streamId: stream._id,
                name: branchData.name,
                slug: branchSlug.substring(0, 50),
                duration: branchData.duration,
                order: j
              });
            }
          }
        }
      }
    }

    console.log('Seeding Course Categories and Details...');
    for (const cat of courseCategoriesData) {
      const category = await CourseCategory.create({
        name: cat.name,
        slug: cat.slug,
        description: cat.description
      });

      if (cat.courses) {
        for (const course of cat.courses) {
          await CourseDetail.create({
            categoryId: category._id,
            title: course.title,
            slug: course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            duration: course.duration,
            fees: course.fees,
            keySkills: course.keySkills,
            careerOpportunities: course.careerOpportunities
          });
        }
      }
    }

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    mongoose.disconnect();
  }
}

run();
