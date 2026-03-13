"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);
  
  // Standard-Einstellungen
  const [preferences, setPreferences] = useState({
    essential: true, // Immer true, kann nicht deaktiviert werden
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setPreferences(JSON.parse(consent));
      setHasDecided(true);
    }

    // Lauscht auf den Klick im Footer
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (newPreferences: any) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setIsVisible(false);
    setShowDetails(false);
    setHasDecided(true);
    // Dem Analytics-Loader Bescheid geben, dass sich was geändert hat
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const acceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true });
  const acceptEssential = () => saveConsent({ essential: true, analytics: false, marketing: false });
  const saveCustom = () => saveConsent(preferences);

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) {
    return hasDecided ? (
      <button 
        onClick={() => { setIsVisible(true); setShowDetails(true); }}
        className="fixed bottom-6 left-6 z-40 bg-slate-900 border border-slate-800 text-slate-400 p-3 rounded-full shadow-lg hover:bg-slate-800 hover:text-sky-400 transition-all duration-300 group"
        aria-label="Cookie-Einstellungen"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-rose-400"></div>
        
        <div className="p-6 md:p-8 overflow-y-auto">
          <h3 className="text-xl font-bold text-slate-50 mb-3 flex items-center gap-2">
            Privatsphäre-Einstellungen <span className="text-2xl">🍪</span>
          </h3>
          
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Wir nutzen Cookies, um dir das bestmögliche Erlebnis zu bieten. Einige sind technisch notwendig, andere helfen uns, die Website zu optimieren. Deine Wahl kannst du jederzeit im{' '}
            <Link href="/de/datenschutz" className="text-sky-400 hover:text-sky-300 underline decoration-sky-500/30 underline-offset-2">Datenschutz</Link> anpassen.
          </p>

          {/* Detaillierte Einstellungen (Toggles) */}
          {showDetails && (
            <div className="space-y-4 mb-8 border-t border-slate-800 pt-6">
              
              {/* Essential */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-200 font-bold text-sm">Notwendig</h4>
                  <p className="text-xs text-slate-500 mt-1">Erforderlich für die Grundfunktionen der Website.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-sky-500 opacity-50 cursor-not-allowed">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                <div className="pr-4">
                  <h4 className="text-slate-200 font-bold text-sm">Statistiken</h4>
                  <p className="text-xs text-slate-500 mt-1">Helfen uns zu verstehen, wie Besucher mit der Seite interagieren (Google Analytics).</p>
                </div>
                <button 
                  onClick={() => togglePreference('analytics')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.analytics ? 'bg-sky-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
            <button 
              onClick={acceptAll}
              className="w-full sm:w-auto flex-1 bg-sky-500 text-slate-950 font-bold py-3 px-4 rounded-lg hover:bg-sky-400 transition-colors text-sm shadow-[0_0_15px_rgba(14,165,233,0.3)] order-1 sm:order-3"
            >
              Alle akzeptieren
            </button>
            
            {showDetails ? (
              <button 
                onClick={saveCustom}
                className="w-full sm:w-auto flex-1 bg-slate-800 text-slate-300 font-medium py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm order-2"
              >
                Auswahl speichern
              </button>
            ) : (
              <button 
                onClick={() => setShowDetails(true)}
                className="w-full sm:w-auto flex-1 bg-slate-800 text-slate-300 font-medium py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm order-2"
              >
                Einstellungen
              </button>
            )}

            {!showDetails && (
              <button 
                onClick={acceptEssential}
                className="w-full sm:w-auto flex-1 bg-slate-950 border border-slate-800 text-slate-400 font-medium py-3 px-4 rounded-lg hover:text-slate-300 hover:bg-slate-900 transition-colors text-sm order-3 sm:order-1"
              >
                Nur notwendige
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}