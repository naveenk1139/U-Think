const fs = require('fs');
const path = 'src/components/StudentDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "const [userTarget, setUserTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');",
  "const [userTarget, setUserTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');\n  const [userBio, setUserBio] = useState(localStorage.getItem('user_bio') || 'Aspiring Engineer • Class 12th');"
);

content = content.replace(
  "setUserTarget(localStorage.getItem('user_target') || 'JEE Advanced');",
  "setUserTarget(localStorage.getItem('user_target') || 'JEE Advanced');\n      setUserBio(localStorage.getItem('user_bio') || 'Aspiring Engineer • Class 12th');"
);

content = content.replace(
  '<p className="text-slate-500 font-medium">Aspiring Engineer • Class 12th</p>',
  '<p className="text-slate-500 font-medium">{userBio}</p>'
);

fs.writeFileSync(path, content);
