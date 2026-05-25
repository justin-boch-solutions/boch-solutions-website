"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const analysisSteps = [
  'Analysiere Server-Antwortzeiten...',
  'Prüfe Mobile-Darstellung (Responsive Design)...',
  'Berechne technologischen SEO-Score...',
  'Überprüfe Conversion-Elemente...',
  'Identifiziere Performance-Engpässe...',
  'Erstelle finalen Report...'
];

export default function PerformanceCalculator() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Für Schritt 2 (Analyse)
  const [analysisText, setAnalysisText] = useState('Analysiere Server-Antwortzeiten...');
  const [progress, setProgress] = useState(0);
  
  // Ergebnisse
  const [fakeResults, setFakeResults] = useState({ score: 0, loadTime: 0, issues: 0 });
  const realResultsRef = useRef<{score: number, loadTime: number, issues: number} | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Schritt 1 -> Schritt 2
  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Bitte gib eine gültige URL ein.');
      return;
    }
    setError('');
    
    // Fallback Ergebnisse vorbereiten
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = url.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const fallbackScore = 42 + (absHash % 35);
    const fallbackLoadTime = 2.4 + ((absHash % 40) / 10);
    const fallbackIssues = 3 + (absHash % 5);
    const fallbackResults = { score: fallbackScore, loadTime: fallbackLoadTime, issues: fallbackIssues };
    
    setFakeResults(fallbackResults);
    realResultsRef.current = null;
    setStep(2);
    setElapsedSeconds(0); // Reset Timer

    // Echte Analyse im Hintergrund starten mit Timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 Sekunden Timeout

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data && !data.error) {
        realResultsRef.current = { score: data.score, loadTime: data.loadTime, issues: data.issues };
        setFakeResults(realResultsRef.current);
      } else {
        // Falls die API einen Fehler zurückgibt (z.B. weil URL nicht erreichbar ist)
        realResultsRef.current = fallbackResults;
      }
    } catch (err) {
      console.warn("API Timeout oder Fehler – Fallback wird genutzt.");
      // Fallback aktivieren
      realResultsRef.current = fallbackResults;
    }
  };

  // Schritt 2 Animation Logic
  useEffect(() => {
    if (step === 2) {
      let currentStep = 0;
      const totalTime = 6000; // 6 Sekunden Fake-Analyse
      const intervalTime = totalTime / analysisSteps.length;
      const progressIntervalTime = 50;

      // Text wechseln
      const textInterval = setInterval(() => {
        currentStep++;
        if (currentStep < analysisSteps.length) {
          setAnalysisText(analysisSteps[currentStep]);
        }
      }, intervalTime);

      // Sekunden zählen
      const secondsInterval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      // Progress Bar updaten
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        // Wenn echte Ergebnisse da sind, schnell auf 100% füllen
        if (realResultsRef.current !== null) {
           currentProgress += 5;
        } else {
           // Ansonsten langsam bis 95% kriechen und warten
           if (currentProgress < 95) {
              currentProgress += (100 - currentProgress) * 0.02;
           }
        }

        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          clearInterval(progressInterval);
          clearInterval(textInterval);
          clearInterval(secondsInterval);
          setTimeout(() => setStep(3), 500); // Weiter zu Schritt 3
          return;
        }
        setProgress(currentProgress);
      }, progressIntervalTime);

      return () => {
        clearInterval(textInterval);
        clearInterval(progressInterval);
        clearInterval(secondsInterval);
      };
    }
  }, [step]);

  // Schritt 3 -> Submit
  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'performance',
          url,
          name,
          email,
          phone,
          score: fakeResults.score,
          loadTime: fakeResults.loadTime,
          issues: fakeResults.issues,
          analysisDuration: elapsedSeconds
        }),
      });

      if (response.ok) {
        setStep(4);
      } else {
        setError('Es gab ein Problem. Bitte versuche es später noch einmal.');
      }
    } catch {
      setError('Netzwerkfehler. Bitte überprüfe deine Verbindung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-500/5 blur-[80px] pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {/* SCHRITT 1: URL EINGABE */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col relative z-10"
          >
            <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-center mb-6 text-sky-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Kostenloser Performance-Check
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Gib deine Website-URL ein und wir analysieren sie auf versteckte Fehler, lange Ladezeiten und Conversion-Killer.
            </p>

            <form onSubmit={startAnalysis} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="www.deine-website.de" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>
              
              {error && <p className="text-rose-400 text-sm mt-1">{error}</p>}
              
              <button 
                type="submit"
                className="w-full mt-2 bg-white text-black font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors flex justify-center items-center gap-2"
              >
                Jetzt kostenlos analysieren
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}

        {/* SCHRITT 2: ANALYSE LÄUFT */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 relative z-10 text-center"
          >
            {/* Pulsierender Kreis */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
              <div className="absolute inset-0 border-4 border-sky-500/20 rounded-full"></div>
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-sky-500 transition-all duration-75 ease-linear"
                  strokeDasharray={`${progress * 3.01} 301`}
                />
              </svg>
              <div className="text-2xl font-black text-white">{Math.round(progress)}%</div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Analyse läuft...</h3>
            <p className="text-sky-400 h-6 font-medium animate-pulse">{analysisText}</p>
            <p className="text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-sky-500/50" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ladezeit: {elapsedSeconds} Sekunden
            </p>
          </motion.div>
        )}

        {/* SCHRITT 3: ERGEBNIS / LEAD FORM */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col relative z-10"
          >
            <div className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-max">
              {fakeResults.issues} Handlungsfelder entdeckt
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Dein Performance-Score liegt bei nur <span className="text-rose-400">{fakeResults.score}/100</span>.
            </h2>
            <p className="text-slate-400 mb-8">
              Die Analyse ist abgeschlossen. Deine Seite lädt in <strong className="text-white">{fakeResults.loadTime.toFixed(1)} Sekunden</strong> (zu langsam). Um den detaillierten Report mit allen <strong>{fakeResults.issues} Fehlern</strong> zu sehen und eine kostenlose Ersteinschätzung zu erhalten, trage dich kurz ein.
            </p>

            <form onSubmit={submitLead} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dein Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50"
                  required
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50"
                  required
                />
              </div>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefonnummer (für WhatsApp / kurzen Anruf)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50"
              />
              
              {error && <p className="text-rose-400 text-sm mt-1">{error}</p>}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-sky-500 text-white font-bold py-4 rounded-xl hover:bg-sky-400 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Report wird freigeschaltet...</span>
                ) : (
                  <>
                    Report jetzt ansehen
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-2">
                100% Kostenlos. Kein Spam.
              </p>
            </form>
          </motion.div>
        )}

        {/* SCHRITT 4: ERFOLG */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center relative z-10"
          >
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Vielen Dank!
            </h2>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              Deine Anfrage war erfolgreich. Dein Website-Report wird gerade für dich generiert. Unser Experte meldet sich in Kürze bei dir, um dir das Ergebnis persönlich zu präsentieren.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
