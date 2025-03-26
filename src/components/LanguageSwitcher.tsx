
import React, { createContext, useContext, useState } from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Available languages - this would connect with a real translation service
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'zh', name: '中文' },
];

// Create a language context
type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  getCurrentLanguageName: () => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real implementation, this would change the app's language
    console.log(`Language changed to: ${langCode}`);
  };

  const getCurrentLanguageName = () => {
    return languages.find(lang => lang.code === currentLanguage)?.name || 'English';
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, getCurrentLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, getCurrentLanguageName } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 h-9">
          <Globe className="h-4 w-4" />
          <span className="text-sm">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-primary/10 font-medium" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
