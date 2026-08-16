import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { uploadProfilePhoto } from '../api/profileApi';

interface ProfilePictureUploadProps {
  currentPhotoURL?: string | null;
  onPhotoUpdated: (newUrl: string) => void;
  size?: 'sm' | 'lg';
}

export function ProfilePictureUpload({ currentPhotoURL, onPhotoUpdated, size = 'lg' }: ProfilePictureUploadProps) {
  const { currentUser, refreshProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      
      // Resize image using canvas to save space
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          try {
            // Convert blob back to a File for upload
            const fileToUpload = new File([blob], file.name || 'profile.jpg', { type: 'image/jpeg' });
            
            // Upload to backend
            const res = await uploadProfilePhoto(fileToUpload);
            
            // Update local state if needed (url starts with /uploads so we need full url or just set it)
            const photoUrl = `http://localhost:5000${res.photoURL}`; 
            
            onPhotoUpdated(photoUrl);
            await refreshProfile();
          } catch (err) {
            console.error('Failed to upload user photo:', err);
            alert('Failed to upload profile photo.');
          }
        }, 'image/jpeg', 0.8);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
      <img 
        src={currentPhotoURL && currentPhotoURL.startsWith('/uploads') ? `http://localhost:5000${currentPhotoURL}` : (currentPhotoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250")} 
        alt="Profile" 
        className={size === 'lg' ? "w-24 h-24 rounded-full border-4 border-blue-50 shadow-md object-cover" : "w-12 h-12 rounded-full border-2 border-blue-50 shadow-sm object-cover"}
      />
      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Camera className="w-6 h-6 text-white" />
      </div>
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
    </div>
  );
}
