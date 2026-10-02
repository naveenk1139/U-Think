import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 border border-gray-200 dark:border-gray-700">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={i18n.resolvedLanguage || 'en'}
        onChange={changeLanguage}
        className="bg-transparent text-xs font-medium text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
      >
        <option value="en">Eng</option>
        <option value="hi">हिंदी</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>
  );
}
