import React from 'react';
import type { Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  language: Language;
  showToast: (message: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, language, showToast }) => {
  const { t } = useTranslation(language);

  const tabs = [
    { key: 'home', icon: '🏠', label: t('home'), action: () => onNavigate('home') },
    { key: 'browse', icon: '🔍', label: t('browse'), action: () => onNavigate('browse') },
    { key: 'search', icon: '🔎', label: t('search'), action: () => onNavigate('browse') },
    { key: 'profile', icon: '👤', label: t('profile'), action: () => showToast(t('comingSoon')) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-slate-900 border-t border-slate-700 flex justify-around items-center h-16 z-50">
      {tabs.map((tab) => {
        const isActive = currentView === tab.key || (tab.key === 'search' && currentView === 'browse');

        return (
          <button
            key={tab.key}
            onClick={tab.action}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
            type="button"
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
