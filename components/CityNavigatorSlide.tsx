import React from 'react';
import type { Language, TranslationSet } from '../types';

interface CityNavigatorSlideProps {
  t: TranslationSet;
  language: Language;
  onCitySelect: (cityId: string) => void;
}

const CITY_CARDS = [
  { id: 'Baghdad', emoji: '🏛', en: 'Baghdad', ar: 'بغداد', ku: 'بەغدا' },
  { id: 'Slemani', emoji: '🌿', en: 'Sulaymaniyah', ar: 'السليمانية', ku: 'سلێمانی' },
  { id: 'Erbil', emoji: '🦅', en: 'Erbil', ar: 'أربيل', ku: 'هەولێر' },
  { id: 'Basra', emoji: '⚓', en: 'Basra', ar: 'البصرة', ku: 'بەسرە' },
  { id: 'Najaf', emoji: '🕌', en: 'Najaf', ar: 'النجف', ku: 'نەجەف' },
  { id: 'Mosul', emoji: '🌊', en: 'Mosul', ar: 'الموصل', ku: 'مەوسڵ' },
] as const;

const CityNavigatorSlide: React.FC<CityNavigatorSlideProps> = ({ t, language, onCitySelect }) => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">{t.cityNavigator.title}</h2>
        <p className="text-slate-400">{t.cityNavigator.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CITY_CARDS.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => onCitySelect(city.id)}
            className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 text-center transition-all duration-300"
          >
            <div className="text-3xl mb-2">{city.emoji}</div>
            <p className="font-semibold text-white">
              {language === 'ar' ? city.ar : language === 'ku' ? city.ku : city.en}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CityNavigatorSlide;
