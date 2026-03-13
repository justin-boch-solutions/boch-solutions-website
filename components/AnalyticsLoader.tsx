"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function AnalyticsLoader() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Funktion zum Prüfen der Zustimmung
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        const settings = JSON.parse(consent);
        setHasConsent(settings.analytics === true);
      }
    };

    // Beim ersten Laden prüfen
    checkConsent();

    // Event-Listener, falls der Nutzer die Einstellungen live ändert
    window.addEventListener("cookie-consent-updated", checkConsent);
    return () => window.removeEventListener("cookie-consent-updated", checkConsent);
  }, []);

  if (!hasConsent) return null;

  // WICHTIG: Ersetze G-XXXXXXXX mit deiner echten Google Analytics ID!
  const GA_TRACKING_ID = "G-XXXXXXXX";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}