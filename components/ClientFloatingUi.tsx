"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
});

export default function ClientFloatingUi() {
  return (
    <>
      <CookieBanner />
      <WhatsAppButton />
    </>
  );
}
