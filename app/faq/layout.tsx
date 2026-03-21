import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) | JB Solutions',
  description: 'Was kostet eine Website? Wer schreibt die Texte? Hier beantworten wir alle wichtigen Fragen klipp und klar.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
