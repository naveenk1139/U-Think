const fs = require('fs');
const path = 'src/components/EditProfileModal.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { updateProfile } from 'firebase/auth';",
  "import { updateProfile } from 'firebase/auth';\nimport { ProfilePictureUpload } from './ProfilePictureUpload';"
);

content = content.replace(
  "const [target, setTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');",
  "const [target, setTarget] = useState(localStorage.getItem('user_target') || 'JEE Advanced');\n  const [bio, setBio] = useState(localStorage.getItem('user_bio') || 'Aspiring Engineer • Class 12th');\n  const [customPhotoURL, setCustomPhotoURL] = useState(localStorage.getItem('custom_photo_url') || currentUser?.photoURL);"
);

content = content.replace(
  "target\n        });",
  "target,\n          bio\n        });"
);

content = content.replace(
  "localStorage.setItem('user_target', target);",
  "localStorage.setItem('user_target', target);\n      localStorage.setItem('user_bio', bio);"
);

content = content.replace(
  `<div className="bg-white p-3 rounded-2xl shadow-md mb-4 mt-2">
            <User className="w-8 h-8 text-blue-600" />
          </div>`,
  `<div className="mb-4 mt-2">
            <ProfilePictureUpload 
              currentPhotoURL={customPhotoURL || currentUser?.photoURL} 
              onPhotoUpdated={(url) => setCustomPhotoURL(url)} 
            />
          </div>`
);

const newBioField = `<div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Bio / Status</label>
            <input 
              type="text" 
              value={bio} 
              onChange={e => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Aspiring Engineer • Class 12th"
            />
          </div>`;

content = content.replace(
  `<div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Exam / Goal</label>`,
  `${newBioField}\n          <div>\n            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Exam / Goal</label>`
);

fs.writeFileSync(path, content);
