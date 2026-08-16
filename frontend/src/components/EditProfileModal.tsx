import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../api/userApi';
import { ProfilePictureUpload } from './ProfilePictureUpload';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { currentUser, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || currentUser?.name || '');
  const [target, setTarget] = useState(currentUser?.targetExam || 'JEE Advanced');
  const [bio, setBio] = useState(currentUser?.bio || 'Aspiring Engineer • Class 12th');
  const [location, setLocation] = useState(currentUser?.location || 'Not Set');
  const [academicLevel, setAcademicLevel] = useState(currentUser?.educationLevel || 'Class 12th');
  const [interests, setInterests] = useState(currentUser?.interests?.join(', ') || 'Engineering, AI, Tech');
  const [customPhotoURL, setCustomPhotoURL] = useState(currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentUser) {
        await updateProfile({
          name: displayName,
          bio,
          photoURL: customPhotoURL,
          location,
          targetExam: target,
          educationLevel: academicLevel,
          interests: interests.split(',').map(s => s.trim()).filter(Boolean),
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-blue-600 p-6 flex flex-col items-center relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-blue-100 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="mb-4 mt-2">
            <ProfilePictureUpload 
              currentPhotoURL={customPhotoURL || currentUser?.photoURL} 
              onPhotoUpdated={(url) => setCustomPhotoURL(url)} 
            />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Edit Profile</h2>
        </div>
        <form onSubmit={handleSave} className="p-8 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Display Name</label>
              <input 
                type="text" 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Academic Level</label>
              <select 
                value={academicLevel}
                onChange={e => setAcademicLevel(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
              >
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th">Class 11th</option>
                <option value="Class 12th">Class 12th</option>
                <option value="Diploma">Diploma</option>
                <option value="Undergraduate">Undergraduate</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Bio / Status</label>
            <input 
              type="text" 
              value={bio} 
              onChange={e => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="e.g. Aspiring Engineer • Class 12th"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location (City)</label>
              <input 
                type="text" 
                value={location} 
                onChange={e => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="e.g. Mumbai, India"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Target Exam / Goal</label>
              <input 
                type="text" 
                value={target} 
                onChange={e => setTarget(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="e.g. JEE Advanced, NEET, BCA"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Interests (Comma separated)</label>
            <input 
              type="text" 
              value={interests} 
              onChange={e => setInterests(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="e.g. Physics, Coding, Medicine"
            />
          </div>
          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Profile Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
