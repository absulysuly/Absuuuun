import type { Language } from '../types';

type TranslationKey =
  | 'backToResults'
  | 'reviews'
  | 'moreIn'
  | 'getDirections'
  | 'call'
  | 'share'
  | 'notListed'
  | 'linkCopied'
  | 'businessNotFound'
  | 'phone'
  | 'address'
  | 'hours'
  | 'verified'
  | 'comingSoon'
  | 'home'
  | 'browse'
  | 'search'
  | 'profile';

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en: {
    backToResults: 'Back to results',
    reviews: 'Reviews',
    moreIn: 'More in',
    getDirections: 'Get Directions',
    call: 'Call',
    share: 'Share',
    notListed: 'Not listed',
    linkCopied: 'Link copied!',
    businessNotFound: 'Business not found',
    phone: 'Phone',
    address: 'Address',
    hours: 'Opening Hours',
    verified: 'Verified',
    comingSoon: 'Coming soon',
    home: 'Home',
    browse: 'Browse',
    search: 'Search',
    profile: 'Profile',
  },
  ar: {
    backToResults: 'العودة إلى النتائج',
    reviews: 'التقييمات',
    moreIn: 'المزيد في',
    getDirections: 'احصل على الاتجاهات',
    call: 'اتصال',
    share: 'مشاركة',
    notListed: 'غير مدرج',
    linkCopied: '!تم نسخ الرابط',
    businessNotFound: 'لم يتم العثور على النشاط التجاري',
    phone: 'الهاتف',
    address: 'العنوان',
    hours: 'ساعات العمل',
    verified: 'موثق',
    comingSoon: 'قريباً',
    home: 'الرئيسية',
    browse: 'تصفح',
    search: 'بحث',
    profile: 'الملف الشخصي',
  },
  ku: {
    backToResults: 'گەڕانەوە بۆ ئەنجامەکان',
    reviews: 'نرخاندنەکان',
    moreIn: 'زیاتر لە',
    getDirections: 'ئاراستەکان وەربگرە',
    call: 'پەیوەندی',
    share: 'هاوبەشکردن',
    notListed: 'تۆمارنەکراو',
    linkCopied: '!لینکەکە کۆپی کرا',
    businessNotFound: 'کارەبازەکە نەدۆزرایەوە',
    phone: 'تەلەفۆن',
    address: 'ناونیشان',
    hours: 'کاتەکانی کارکردن',
    verified: 'پشتڕاستکراوەتەوە',
    comingSoon: 'بەم زوانە',
    home: 'ماڵەوە',
    browse: 'گەڕان',
    search: 'گەڕان',
    profile: 'پرۆفایل',
  },
};

export const useTranslation = (language: Language) => {
  const t = (key: TranslationKey): string => TRANSLATIONS[language][key] ?? key;

  return { t };
};
