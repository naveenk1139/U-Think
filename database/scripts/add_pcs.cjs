const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

const replacements = [
  { id: 'kpsc', newName: 'KPSC (KAS/PCS)' },
  { id: 'kerala-psc', newName: 'Kerala PSC (KAS/PCS)' },
  { id: 'tnpsc', newName: 'TNPSC (Group 1/PCS)' },
  { id: 'mpsc', newName: 'MPSC (State Services/PCS)' },
  { id: 'uppsc', newName: 'UPPSC (UP PCS)' },
  { id: 'bpsc', newName: 'BPSC (Bihar PCS)' },
  { id: 'wbpsc', newName: 'WBPSC (WBCS/PCS)' },
  { id: 'rpsc', newName: 'RPSC (RAS/PCS)' },
  { id: 'appsc', newName: 'APPSC / TSPSC (Group 1/PCS)' },
  { id: 'mppsc', newName: 'MPPSC (State Service/PCS)' },
  { id: 'gpsc', newName: 'GPSC (Gujarat PCS)' },
  { id: 'hpsc', newName: 'HPSC (HCS/PCS)' },
  { id: 'hppsc', newName: 'HPPSC (HPAS/PCS)' },
  { id: 'ppsc', newName: 'PPSC (Punjab PCS)' },
  { id: 'jpsc', newName: 'JPSC (Jharkhand PCS)' },
  { id: 'opsc', newName: 'OPSC (OAS/PCS)' },
  { id: 'cgpsc', newName: 'CGPSC (Chhattisgarh PCS)' },
  { id: 'ukpsc', newName: 'UKPSC (Uttarakhand PCS)' },
  { id: 'state-psc-other', newName: 'Other State PSCs / PCS' }
];

for (const {id, newName} of replacements) {
  const regex = new RegExp('"id": "' + id + '",\\s*"name": "[^"]+"');
  content = content.replace(regex, '"id": "' + id + '",\\n    "name": "' + newName + '"');
}

fs.writeFileSync('src/data/exams.ts', content);
