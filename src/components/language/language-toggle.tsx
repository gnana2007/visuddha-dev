import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Globe, ChevronDown, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useLanguage, Language } from './language-context';
import { useState } from 'react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const languages: { code: Language; name: string; nativeName: string; flag: string; category: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', category: 'Primary' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', category: 'Primary' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', category: 'Regional' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', category: 'Regional' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', category: 'Regional' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', category: 'Regional' },
    { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', flag: '🇮🇳', category: 'Regional' },
    { code: 'gom', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳', category: 'Regional' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', category: 'Regional' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', category: 'Regional' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', category: 'Regional' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', category: 'Regional' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', category: 'Regional' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳', category: 'Classical' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', category: 'Regional' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', category: 'Regional' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', category: 'Regional' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Filter languages based on search term
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group languages by category
  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    if (!acc[lang.category]) {
      acc[lang.category] = [];
    }
    acc[lang.category].push(lang);
    return acc;
  }, {} as Record<string, typeof languages>);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 font-medium min-w-[120px]"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        {/* Search Input */}
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        </div>

        {/* Language Options */}
        <div className="p-1">
          {Object.entries(groupedLanguages).map(([category, categoryLanguages]) => (
            <div key={category}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {category}
              </div>
              {categoryLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center justify-between cursor-pointer rounded-md ${
                    language === lang.code ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-muted-foreground">{lang.name}</span>
                    </div>
                  </div>
                  {language === lang.code && (
                    <Badge variant="secondary" className="text-xs ml-2">
                      ✓
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              {Object.keys(groupedLanguages).indexOf(category) < Object.keys(groupedLanguages).length - 1 && (
                <DropdownMenuSeparator className="my-1" />
              )}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}