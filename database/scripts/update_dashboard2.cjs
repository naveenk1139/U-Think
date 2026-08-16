const fs = require('fs');
const path = 'src/components/StudentDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { useAuth } from '../contexts/AuthContext';",
  "import { useAuth } from '../contexts/AuthContext';\nimport { ProfilePictureUpload } from './ProfilePictureUpload';"
);

content = content.replace(
  "const [userTarget, setUserTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');",
  "const [userTarget, setUserTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');\n  const [customPhotoURL, setCustomPhotoURL] = useState(localStorage.getItem('custom_photo_url') || currentUser?.photoURL);"
);

content = content.replace(
  "setUserTarget(localStorage.getItem('user_target') || 'JEE Advanced');",
  "setUserTarget(localStorage.getItem('user_target') || 'JEE Advanced');\n      setCustomPhotoURL(localStorage.getItem('custom_photo_url') || currentUser?.photoURL);"
);

const imgOld = `<div className="relative">
          <img 
            src={currentUser?.photoURL || "https://via.placeholder.com/100"} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-md object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
            PRO
          </div>
        </div>`;

const imgNew = `<div className="relative">
          <ProfilePictureUpload 
            currentPhotoURL={customPhotoURL || currentUser?.photoURL} 
            onPhotoUpdated={(url) => setCustomPhotoURL(url)} 
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white z-10 pointer-events-none">
            PRO
          </div>
        </div>`;

content = content.replace(imgOld, imgNew);
fs.writeFileSync(path, content);
