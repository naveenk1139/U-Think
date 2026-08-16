const fs = require('fs');
let content = fs.readFileSync('src/data/exams.ts', 'utf8');

const keralaPSC = `
  {
    "id": "kerala-psc",
    "name": "Kerala PSC",
    "conductingBody": "Kerala Public Service Commission",
    "purpose": "Kerala state civil services, LDC, degree-level, and gazetted posts",
    "category": "State Public Service Commissions",
    "level": "GOVT"
  },`;

content = content.replace('"Karnataka state civil services & gazetted posts",\n    "category": "State Public Service Commissions",\n    "level": "GOVT"\n  },', '"Karnataka state civil services & gazetted posts",\n    "category": "State Public Service Commissions",\n    "level": "GOVT"\n  },' + keralaPSC);

fs.writeFileSync('src/data/exams.ts', content);
