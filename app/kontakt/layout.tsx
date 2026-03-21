import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | JB Solutions',
  description: 'Schreib uns unverbindlich an. Wir melden uns innerhalb von 24 Stunden bei dir für eine Erstberatung.',
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
