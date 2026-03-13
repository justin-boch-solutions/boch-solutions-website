import 'server-only';

// Hier definieren wir, wo die Wörterbücher liegen
const dictionaries = {
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

// Diese Funktion rufen wir später auf unseren Seiten auf
export const getDictionary = async (locale: 'de' | 'en') => {
  return dictionaries[locale]();
};