import React from 'react';
import type { Language } from '../../types';
import { MOCK_BUSINESSES, MOCK_REVIEWS } from '../../constants';
import GlassCard from '../GlassCard';
import { useTranslation } from '../../hooks/useTranslation';

interface DetailViewProps {
  businessId: string;
  language: Language;
  onNavigate: (view: string) => void;
  onSelectBusiness: (id: string) => void;
  showToast: (message: string) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ businessId, language, onNavigate, onSelectBusiness, showToast }) => {
  const { t } = useTranslation(language);
  const business = MOCK_BUSINESSES.find((b) => b.id === businessId);

  if (!business) {
    return (
      <section className="max-w-4xl mx-auto py-8">
        <button type="button" className="text-amber-400 mb-6" onClick={() => onNavigate('browse')}>
          {(language === 'ar' || language === 'ku') ? '→' : '←'} {t('backToResults')}
        </button>
        <p className="text-white text-xl">{t('businessNotFound')}</p>
      </section>
    );
  }

  const description =
    language === 'ar' ? business.descriptionAr : language === 'ku' ? business.descriptionKu : business.descriptionEn;

  const reviews = MOCK_REVIEWS.filter((review) => review.businessId === business.id).slice(0, 3);
  const moreInCategory = MOCK_BUSINESSES.filter((item) => item.category === business.category && item.id !== business.id).slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: business.name,
        text: business.name,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    showToast(t('linkCopied'));
  };

  return (
    <section className="max-w-5xl mx-auto py-4 md:py-8 pb-24">
      <button type="button" className="text-amber-400 mb-4" onClick={() => onNavigate('browse')}>
        {(language === 'ar' || language === 'ku') ? '→' : '←'} {t('backToResults')}
      </button>

      <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
        <img src={business.imageUrl} alt={business.name} className="w-full h-[220px] object-cover" />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{business.name}</h1>
            {business.isVerified && <span className="text-green-400 font-semibold">✓ {t('verified')}</span>}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400">{'★'.repeat(Math.round(business.rating))}{'☆'.repeat(5 - Math.round(business.rating))}</span>
            <span className="text-slate-400">({business.reviewCount} reviews)</span>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">{business.category}</span>
            <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-200 text-sm">{business.city}</span>
          </div>

          <p className="text-slate-200 mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-800/70 rounded-lg p-3">📞 <strong>{t('phone')}:</strong> {business.phone || t('notListed')}</div>
            <div className="bg-slate-800/70 rounded-lg p-3">📍 <strong>{t('address')}:</strong> {business.address}</div>
            <div className="bg-slate-800/70 rounded-lg p-3">🕐 <strong>{t('hours')}:</strong> {business.openingHours || t('notListed')}</div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(`${business.name} ${business.city} Iraq`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold"
            >
              🗺 {t('getDirections')}
            </a>
            <a
              href={business.phone ? `tel:${business.phone}` : undefined}
              className={`px-4 py-2 rounded-lg font-semibold ${business.phone ? 'bg-emerald-500 text-slate-900' : 'bg-slate-600 text-slate-300 pointer-events-none'}`}
            >
              📞 {t('call')}
            </a>
            <button type="button" onClick={handleShare} className="px-4 py-2 rounded-lg bg-slate-700 text-white font-semibold">
              🔗 {t('share')}
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">{t('reviews')}</h2>
          <div className="space-y-3 mb-8">
            {reviews.map((review) => (
              <article key={review.id} className="bg-slate-800/70 rounded-lg p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-slate-600 flex items-center justify-center font-bold">{review.reviewerName[0]}</div>
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-amber-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm mb-1">{language === 'ar' ? review.commentAr : language === 'ku' ? review.commentKu : review.comment}</p>
                <p className="text-slate-400 text-xs">{review.date}</p>
              </article>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">{t('moreIn')} {business.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moreInCategory.map((item) => (
              <button key={item.id} className="text-left" type="button" onClick={() => onSelectBusiness(item.id)}>
                <GlassCard imageUrl={item.imageUrl} title={item.name} subtitle={item.city} category={item.category} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailView;
