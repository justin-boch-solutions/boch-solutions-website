"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function AnalyticsLoader() {
  const [hasConsent, setHasConsent] = useState(false);
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);

  useEffect(() => {
    // Funktion zum Prüfen der Zustimmung
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        const settings = JSON.parse(consent);
        setHasConsent(settings.analytics === true);
        setHasMarketingConsent(settings.marketing === true);
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
  // WICHTIG: Ersetze 1234567890 mit deiner echten Meta Pixel ID!
  const META_PIXEL_ID = "1234567890";

  return (
    <>
      {hasConsent && (
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
      )}

      {/* Meta Pixel für Instagram / Facebook Ads */}
      {hasMarketingConsent && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}