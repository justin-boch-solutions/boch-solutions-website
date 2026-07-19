export const company = {
  name: "JB Solutions",
  legalName: "JB Solutions – Justin Boch",
  owner: "Justin Boch",
  legalForm: "Einzelunternehmen",
  founded: "2025",
  tagline: "IT-Modernisierung für Handwerksbetriebe",
  claim: "Ihr Betrieb, modernisiert mit Microsoft-Technologie.",
  phone: "+49 251 28069471",
  phoneHref: "tel:+4925128069471",
  email: "kontakt@boch-solutions.de",
  emailHref: "mailto:kontakt@boch-solutions.de",
  address: {
    street: "Königsberger Straße 174",
    zip: "48157",
    city: "Münster",
    region: "Nordrhein-Westfalen",
    country: "DE",
  },
  geo: {
    latitude: 51.9957373,
    longitude: 7.6559627,
  },
  areaServed: ["Münster", "Telgte", "Greven", "Nottuln", "Havixbeck", "Senden"],
  vatId: "DE461737440" as string | null,
  domain: "boch-solutions.de",
  url: "https://boch-solutions.de",
} as const;

export const addressLine = `${company.address.street}, ${company.address.zip} ${company.address.city}`;

export const stack = [
  "Microsoft 365 & Azure",
  "Power Platform",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Vercel",
  "Figma",
  "Node.js",
] as const;

export const processPhases = [
  {
    number: "01",
    title: "Strategie-Call",
    description:
      "Wir besprechen den Status Ihrer aktuellen IT, Webseite und Sichtbarkeit – kostenlos und unverbindlich. Sie erfahren direkt, wo die größten Hebel liegen.",
    forYou: "15–30 Minuten, telefonisch oder vor Ort in Münster und Umgebung.",
  },
  {
    number: "02",
    title: "Architektur-Planung",
    description:
      "Wir planen die passende Microsoft-365/Azure-Struktur, Domain- und E-Mail-Einrichtung sowie das Konzept für Webseite und Software – abgestimmt auf Ihren Betrieb, nicht auf eine Schablone.",
    forYou: "Sie erhalten einen klaren Fahrplan mit Zeitrahmen und Zuständigkeiten.",
  },
  {
    number: "03",
    title: "Umsetzung",
    description:
      "Einrichtung von Microsoft 365, Lizenzen, E-Mail und Domain, Aufbau von Webseite, Google-Unternehmensprofil und individueller Software – laufend abgestimmt, ohne Betriebsunterbrechung.",
    forYou: "Sie arbeiten währenddessen normal weiter, wir übernehmen die Technik.",
  },
  {
    number: "04",
    title: "Skalierung & Wartung",
    description:
      "Laufende Betreuung, Updates, Sicherheits-Monitoring und Weiterentwicklung – SEO/GEO, Prozesse und Software wachsen mit Ihrem Betrieb mit.",
    forYou: "Fester Ansprechpartner, planbare Wartung, keine Blackbox.",
  },
] as const;

export const audiences = [
  "SHK-Betriebe (Sanitär, Heizung, Klima)",
  "Elektrobetriebe",
  "Ausbau- & Trockenbaubetriebe",
  "Bau- & Dachdeckerbetriebe",
  "Servicehandwerk & sonstige Gewerke",
] as const;
