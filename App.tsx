import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import Header from './components/Header';
import HeroSlide from './components/HeroSlide';
import FeaturedBusinessesSlide from './components/FeaturedBusinessesSlide';
import CuratedEventsSlide from './components/CuratedEventsSlide';
import DealsMarketplaceSlide from './components/DealsMarketplaceSlide';
import BusinessDirectorySlide from './components/BusinessDirectorySlide';
import CityNavigatorSlide from './components/CityNavigatorSlide';
import AccessibilityHubSlide from './components/AccessibilityHubSlide';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import DetailView from './components/views/DetailView';
import SearchView from './components/views/SearchView';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState('base');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'browse' | 'detail' | 'search'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState({
    searchTerm: '',
    governorate: 'all',
    category: 'all',
    price: 'all',
    rating: 'all',
    sortBy: 'default'
  });
  const businessDirectoryRef = useRef<HTMLElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      category: categoryId,
      price: 'all',
      rating: 'all',
      searchTerm: ''
    }));
    setCurrentView('browse');
    businessDirectoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectBusiness = (id: string) => {
    setSelectedBusinessId(id);
    setCurrentView('detail');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setCurrentView('search');
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const sizeMap = {
      sm: '14px',
      base: '16px',
      lg: '18px'
    };
    document.documentElement.style.fontSize = sizeMap[fontSize as keyof typeof sizeMap];

    document.documentElement.setAttribute('data-reduced-motion', String(reduceMotion));
  }, [fontSize, reduceMotion]);

  useEffect(() => {
    if (selectedGovernorate !== activeFilters.governorate) {
      setActiveFilters(prev => ({ ...prev, governorate: selectedGovernorate }));
    }
  }, [selectedGovernorate, activeFilters.governorate]);

  const t = TRANSLATIONS[language];

  return (
    <div dir={language === 'ar' || language === 'ku' ? 'rtl' : 'ltr'} className="bg-[#0A0E27] text-white min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#6C2BD9]/30 to-transparent blur-3xl animate-glow-1"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#00D9FF]/20 to-transparent blur-3xl animate-glow-2"></div>
      </div>

      <div className="relative z-10 pb-20 md:pb-0">
        <Header language={language} setLanguage={setLanguage} t={t} />

        <main className="container mx-auto px-4 py-8 flex flex-col gap-16 md:gap-24">
          {currentView === 'home' && (
            <>
              <HeroSlide
                t={t}
                language={language}
                onCategorySelect={handleCategorySelect}
                selectedGovernorate={selectedGovernorate}
                onGovernorateChange={setSelectedGovernorate}
                onSearch={handleSearch}
              />
              <FeaturedBusinessesSlide t={t} selectedGovernorate={selectedGovernorate} onSelectBusiness={handleSelectBusiness} />
              <CuratedEventsSlide t={t} />
              <DealsMarketplaceSlide t={t} selectedGovernorate={selectedGovernorate} />
              <CityNavigatorSlide
                t={t}
                language={language}
                onCitySelect={(cityId) => {
                  setSelectedGovernorate(cityId);
                  setCurrentView('browse');
                }}
              />
              <AccessibilityHubSlide
                t={t}
                fontSize={fontSize}
                setFontSize={setFontSize}
                reduceMotion={reduceMotion}
                setReduceMotion={setReduceMotion}
              />
            </>
          )}

          {currentView === 'browse' && (
            <BusinessDirectorySlide
              ref={businessDirectoryRef}
              t={t}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              onSelectBusiness={handleSelectBusiness}
            />
          )}


          {currentView === 'search' && (
            <SearchView
              searchQuery={searchQuery}
              language={language}
              onSearchChange={handleSearch}
              onNavigate={(view) => setCurrentView(view as 'home' | 'browse' | 'detail' | 'search')}
              onSelectBusiness={handleSelectBusiness}
            />
          )}

          {currentView === 'detail' && selectedBusinessId && (
            <DetailView
              businessId={selectedBusinessId}
              language={language}
              onNavigate={(view) => setCurrentView(view as 'home' | 'browse' | 'detail' | 'search')}
              onSelectBusiness={handleSelectBusiness}
              showToast={showToast}
            />
          )}
        </main>

        <footer className="text-center p-8 mt-16 border-t border-white/10 text-gray-400">
          <p>&copy; 2024 Iraq Compass. All rights reserved.</p>
        </footer>
      </div>

      <BottomNav currentView={currentView} onNavigate={(view) => setCurrentView(view as 'home' | 'browse' | 'detail' | 'search')} language={language} showToast={showToast} />
      {toastMessage && <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />}
    </div>
  );
};

export default App;
