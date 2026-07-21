"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { consentStore } from "@/lib/consent-store";
import { analytics } from "@/lib/constants";

export function AnalyticsScripts() {
  const state = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot,
  );

  const statisticsAllowed = state.hasChosen && state.statistics;
  const marketingAllowed = state.hasChosen && state.marketing && Boolean(analytics.googleAdsId);

  if (!statisticsAllowed && !marketingAllowed) return null;

  const configCalls = [
    statisticsAllowed ? `gtag('config', '${analytics.googleAnalyticsId}');` : "",
    marketingAllowed ? `gtag('config', '${analytics.googleAdsId}');` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configCalls}`}
      </Script>
    </>
  );
}
