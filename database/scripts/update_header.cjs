const fs = require('fs');
const path = 'src/components/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { useAuth } from '../contexts/AuthContext';",
  "import { useAuth } from '../contexts/AuthContext';\nimport { useState, useEffect } from 'react';"
);

content = content.replace(
  "const { currentUser, logout } = useAuth();",
  "const { currentUser, logout } = useAuth();\n  const [customPhotoURL, setCustomPhotoURL] = useState(localStorage.getItem('custom_photo_url') || null);\n  useEffect(() => {\n    const handleProfileUpdate = () => {\n      setCustomPhotoURL(localStorage.getItem('custom_photo_url'));\n    };\n    window.addEventListener('profile_updated', handleProfileUpdate);\n    return () => window.removeEventListener('profile_updated', handleProfileUpdate);\n  }, []);"
);

content = content.replace(
  "src={currentUser.photoURL || 'https://via.placeholder.com/32'}",
  "src={customPhotoURL || currentUser.photoURL || 'https://via.placeholder.com/32'}"
);

fs.writeFileSync(path, content);
