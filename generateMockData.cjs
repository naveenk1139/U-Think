const fs = require('fs');

const districts = [
  "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural",
  "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur",
  "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere",
  "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu",
  "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
  "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada",
  "Vijayapura", "Yadgir", "Vijayanagara"
];

const types = [
  { type: 'University', prob: 0.05 },
  { type: 'Affiliated College', prob: 0.70 },
  { type: 'Autonomous College', prob: 0.10 },
  { type: 'Polytechnic', prob: 0.10 },
  { type: 'ITI', prob: 0.05 }
];

const ownerships = ['Private Un-Aided', 'Government', 'Private Aided', 'State Public University', 'Deemed to be University'];

const names = [
  "Institute of Technology", "Medical College", "Degree College", "Polytechnic College",
  "Science and Commerce College", "First Grade College", "School of Nursing",
  "College of Engineering", "Institute of Management", "Law College", "Dental College",
  "College of Education", "Arts and Science College"
];

const prefix = [
  "Sri", "Govt", "National", "Global", "International", "Bapuji", "Basaveshwara", "SJB",
  "JSS", "KLE", "PES", "Dayananda Sagar", "Christ", "Jain", "BMS", "RV", "MSR", "CMR",
  "Oxford", "Cambridge", "Vidya", "Jnana", "Vikas", "Siddaganga", "Malnad",
  "BVB", "SDM", "Al-Ameen", "Reva", "Presidency", "Nitte"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateName(type, district) {
  if (type === 'University') return `${getRandom(prefix)} University of ${district}`;
  const p = getRandom(prefix);
  const n = getRandom(names);
  return `${p} ${n}, ${district}`;
}

const colleges = [];

for (let i = 1; i <= 1500; i++) {
  const district = getRandom(districts);
  
  const randType = Math.random();
  let type = 'Affiliated College';
  let acc = 0;
  for (const t of types) {
    acc += t.prob;
    if (randType <= acc) {
      type = t.type;
      break;
    }
  }

  const ownership = getRandom(ownerships);
  const name = generateName(type, district.split(' ')[0]);
  const year = 1950 + Math.floor(Math.random() * 70);

  // Approximate lat long for Karnataka (11.5 to 18.5 N, 74 to 78.5 E)
  const lat = 11.5 + Math.random() * 7.0;
  const lng = 74.0 + Math.random() * 4.5;

  colleges.push({
    aisheCode: `C-${10000 + i}`,
    name: name,
    state: "Karnataka",
    district: district,
    institutionType: type,
    management: ownership,
    yearOfEstablishment: year,
    latitude: lat,
    longitude: lng
  });
}

fs.writeFileSync('backend/aisheData.json', JSON.stringify(colleges, null, 2));
console.log(`Generated ${colleges.length} mock colleges in backend/aisheData.json`);

const geoData = {
  state: { name: "Karnataka" },
  districts: districts.map(d => ({ name: d }))
};

fs.writeFileSync('backend/geoData.json', JSON.stringify(geoData, null, 2));
console.log(`Generated Geography data in backend/geoData.json`);
