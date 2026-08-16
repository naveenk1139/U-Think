const fs = require('fs');
const filePath = './src/data/userSpecializations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `
  // --- NEW MEDICAL DEGREES FROM PDF ---
`;

// Looking closely at the output from earlier:
//   }
//   // --- NEW MEDICAL DEGREES FROM PDF ---
//   {
//     name: "MD in Pathology",

// We need to make sure there's a comma before `// --- NEW MEDICAL DEGREES FROM PDF ---`
const idx = content.indexOf('// --- NEW MEDICAL DEGREES FROM PDF ---');
if (idx !== -1) {
  // Let's find the closing brace before it.
  const beforeStr = content.substring(0, idx);
  const lastBraceIdx = beforeStr.lastIndexOf('}');
  
  if (lastBraceIdx !== -1) {
    const checkCommaStr = beforeStr.substring(lastBraceIdx + 1);
    if (!checkCommaStr.includes(',')) {
      content = content.substring(0, lastBraceIdx + 1) + ',' + content.substring(lastBraceIdx + 1);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log("Added missing comma.");
    } else {
      console.log("Comma seems to be there.");
    }
  }
}
