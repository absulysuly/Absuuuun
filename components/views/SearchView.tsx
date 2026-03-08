import React from 'react';
import type { Language } from '../../types';
import { MOCK_BUSINESSES, TRANSLATIONS } from '../../constants';
import GlassCard from '../GlassCard';

interface SearchViewProps {
  searchQuery: string;
  language: Language;
  onSearchChange: (query: string) => void;
  onNavigate: (view: string) => void;
  onSelectBusiness: (id: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({
  searchQuery,
  language,
  onSearchChange,
  onNavigate,
  onSelectBusiness,
}) => {
  const t = TRANSLATIONS[language];
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const results = MOCK_BUSINESSES.filter((business) => {
    if (!normalizedQuery) {
      return true;
    }

    return [
      business.nameEn,
      business.nameAr,
      business.nameKu,
      business.descriptionEn,
      business.category,
      business.city,
      business.governorate,
    ].some((field) => field.toLowerCase().includes(normalizedQuery));
  });

  const noResults = normalizedQuery.length > 0 && results.length === 0;
  const summaryText = noResults
    ? `${t.noResults} '${searchQuery}'`
    : `${results.length} ${t.searchResults} '${searchQuery}'`;

  return (
    <section className="max-w-7xl mx-auto w-full py-4 md:py-8 pb-24">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="text-amber-400 mb-5 font-semibold"
      >
        {(language === 'ar' || language === 'ku') ? '→' : '←'} Back
      </button>

      <div className="mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <p className="text-sm text-slate-400 mb-6">{summaryText}</p>

      {!noResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((business) => (
            <GlassCard
              key={business.id}
              imageUrl={business.imageUrl}
              title={language === 'ar' ? business.nameAr : language === 'ku' ? business.nameKu : business.nameEn}
              subtitle={business.governorate}
              category={business.category}
              onClick={() => onSelectBusiness(business.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-white/10 rounded-2xl bg-white/5">
          <div className="mx-auto w-20 h-20 mb-5 text-slate-300">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="4" />
              <path d="M41 41L56 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <circle cx="28" cy="28" r="8" stroke="currentColor" strokeWidth="3" opacity="0.5" />
            </svg>
          </div>
          <p className="text-white text-lg mb-2">{t.noResults} '{searchQuery}'</p>
          <p className="text-slate-400 mb-5">{t.tryDifferent}</p>
          <button
            type="button"
            onClick={() => onNavigate('browse')}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white font-semibold"
          >
            {t.browseAll}
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchView;
