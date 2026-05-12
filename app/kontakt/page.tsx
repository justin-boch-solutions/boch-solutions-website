"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as 'configurator' | 'project' | 'general') || 'configurator';
  
  const [mode, setMode] = useState<'configurator' | 'project' | 'general'>(initialMode);
  const [step, setStep] = useState(1);
  
  // Gemeinsamer State für alle Formulare
  const [formData, setFormData] = useState({
    // General / Contact
    name: '',
    email: '',
    message: '',
    // Project Flow
    projectType: '',
    projectGoal: '',
    timeline: '',
    budget: '',
    // Configurator specific
    configType: '',
    configDesign: '',
    configFeatures: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync mode if URL changes
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'configurator' || modeParam === 'project' || modeParam === 'general') {
      setMode(modeParam);
    }
  }, [searchParams]);

  const updateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleConfigFeature = (feature: string) => {
    setFormData(prev => {
      if (prev.configFeatures.includes(feature)) {
        return { ...prev, configFeatures: prev.configFeatures.filter(f => f !== feature) };
      }
      return { ...prev, configFeatures: [...prev.configFeatures, feature] };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const getDynamicGoals = () => {
    switch (formData.projectType) {
      case 'Onepager / Landingpage': return ['Leads generieren', 'Produkt-Launch', 'Recruiting (Mitarbeiter/Azubis)', 'Event-Anmeldung'];
      case 'Firmenwebsite': return ['Komplettes Redesign', 'Online sichtbar werden', 'Mehr organische Anfragen (SEO)', 'Modernes Markenimage'];
      case 'Web-App / Portal': return ['Kundenportal / Dashboard', 'Interne Prozesse automatisieren', 'SaaS-Idee umsetzen', 'Bestehende Software ablösen'];
      default: return ['Leads generieren', 'Markenbekanntheit', 'Prozesse digitalisieren', 'Sonstiges'];
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, requestType: mode }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Fehler beim Senden. Bitte versuche es später noch einmal.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Es gab ein technisches Problem.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <main className="min-h-screen bg-[#020617] flex flex-col items-center pt-32 pb-24 px-4 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="text-center max-w-4xl mb-12 relative z-10">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            Contact Center
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Lass uns <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">starten.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Wähle aus, wie wir dir helfen können. Berechne sofort einen Preis, starte ein konkretes Projekt oder stelle eine kurze Frage.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        
        {/* TAB SCHALTER - NEU & MASSIV */}
        <FadeIn direction="up" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            <button 
              onClick={() => { setMode('configurator'); setStep(1); }}
              className={`py-4 px-6 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 ${mode === 'configurator' ? 'bg-sky-500/10 border-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Preis berechnen
            </button>
            <button 
              onClick={() => { setMode('project'); setStep(1); }}
              className={`py-4 px-6 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 ${mode === 'project' ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Projekt anfragen
            </button>
            <button 
              onClick={() => setMode('general')}
              className={`py-4 px-6 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 ${mode === 'general' ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              Allgemeine Frage
            </button>
          </div>
        </FadeIn>

        {/* DAS FORMULAR-GEHÄUSE (Premium Dark Mode) */}
        <FadeIn direction="up" delay={0.3}>
          <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px] flex flex-col justify-center border border-white/10 group">
            
            {/* Inner Glow */}
            <div className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-500 ${mode === 'configurator' ? 'bg-sky-500/10 group-hover:bg-sky-400/20' : mode === 'project' ? 'bg-indigo-500/10 group-hover:bg-indigo-400/20' : 'bg-emerald-500/10 group-hover:bg-emerald-400/20'}`}></div>

            {/* ERFOLGSMELDUNG OVERLAY */}
            {isSuccess && (
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl z-20 flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Erfolgreich übermittelt!</h3>
                <p className="text-slate-400 mb-10 text-lg max-w-md mx-auto leading-relaxed">
                  {mode === 'configurator' ? 'Wir haben deine Konfiguration erhalten und senden dir den Schätzpreis in Kürze zu.' : 'Wir haben deine Anfrage erhalten und melden uns in Kürze.'}
                </p>
                <button onClick={() => { setIsSuccess(false); setStep(1); }} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                  Zurück zum Start
                </button>
              </div>
            )}

            {/* ============================================================
                MODUS 1: KONFIGURATOR (Website Preis berechnen)
                ============================================================ */}
            {mode === 'configurator' && !isSuccess && (
              <div className="h-full flex flex-col relative z-10 w-full max-w-4xl mx-auto">
                <div className="w-full bg-black/50 h-1.5 rounded-full mb-10 overflow-hidden border border-white/5">
                  <div className="bg-sky-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(56,189,248,0.8)]" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="c-step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Was genau brauchst du?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { id: 'Onepager', title: 'Onepager', desc: 'Eine scrollbare Seite.' },
                          { id: 'Firmenwebsite', title: 'Firmenwebsite', desc: 'Mehrseitig & SEO.' },
                          { id: 'Online-Shop', title: 'Online-Shop', desc: 'z.B. Shopify.' }
                        ].map(item => (
                          <button key={item.id} onClick={() => { updateData('configType', item.id); nextStep(); }} className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${formData.configType === item.id ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'border-white/10 bg-black/40 hover:border-sky-500/50'}`}>
                            <div className="font-bold text-xl text-white mb-2">{item.title}</div>
                            <div className="text-sm text-slate-400">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="c-step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Welches Design-Level wünschst du dir?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { id: 'Clean & Modern', title: 'Clean & Modern', desc: 'Solides, professionelles Design. Ideal für den Start.', price: 'Standard' },
                          { id: 'Premium Agentur-Look', title: 'Premium Agentur-Look', desc: 'Interaktive Elemente, 3D-Glows, maximale Conversion.', price: 'High-End' }
                        ].map(item => (
                          <button key={item.id} onClick={() => { updateData('configDesign', item.id); nextStep(); }} className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${formData.configDesign === item.id ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'border-white/10 bg-black/40 hover:border-sky-500/50'}`}>
                            <div>
                              <div className="font-bold text-xl text-white mb-2">{item.title}</div>
                              <div className="text-sm text-slate-400 mb-6">{item.desc}</div>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 inline-block px-3 py-1 rounded-full w-max">{item.price}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="c-step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Zusatzfunktionen (Mehrfachauswahl)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {['SEO-Texterstellung', 'Logo-Design', 'Terminbuchung', 'Blog / News', 'Mehrsprachig', 'Google Maps Ranking'].map(feature => (
                          <button key={feature} onClick={() => toggleConfigFeature(feature)} className={`p-4 rounded-xl border transition-all duration-300 text-sm font-semibold flex items-center gap-3 ${formData.configFeatures.includes(feature) ? 'border-sky-500 bg-sky-500/10 text-white' : 'border-white/10 bg-black/40 text-slate-300 hover:border-sky-500/50'}`}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${formData.configFeatures.includes(feature) ? 'border-sky-500 bg-sky-500' : 'border-slate-500'}`}>
                              {formData.configFeatures.includes(feature) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            {feature}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-center mt-auto">
                        <button onClick={nextStep} className="px-10 py-4 bg-sky-500 text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                          Weiter zur Auswertung
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.form key="c-step4" onSubmit={handleSubmit} variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col justify-center max-w-lg mx-auto w-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Deine Auswertung ist bereit!</h3>
                        <p className="text-slate-400">
                          Wir haben den Aufwand berechnet. Wohin sollen wir dir den Schätzpreis senden?
                        </p>
                      </div>
                      <div className="space-y-4 mb-8">
                        <input type="email" required value={formData.email} onChange={e => updateData('email', e.target.value)} placeholder="Deine E-Mail Adresse" className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors" />
                        <input type="text" required value={formData.name} onChange={e => updateData('name', e.target.value)} placeholder="Name / Firma" className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors" />
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(56,189,248,0.4)] disabled:opacity-50">
                        {isSubmitting ? 'Berechne...' : 'Preis jetzt anzeigen →'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                {step > 1 && step < 4 && (
                  <div className="mt-10 pt-6 border-t border-white/10 flex justify-start">
                    <button onClick={prevStep} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Zurück
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
                MODUS 2: PROJEKT FUNNEL
                ============================================================ */}
            {mode === 'project' && !isSuccess && (
              <div className="h-full flex flex-col relative z-10 w-full max-w-4xl mx-auto">
                <div className="w-full bg-black/50 h-1.5 rounded-full mb-10 overflow-hidden border border-white/5">
                  <div className="bg-indigo-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: `${(step / 5) * 100}%` }}></div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="p-step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h2 className="text-3xl font-bold text-white mb-8">Was genau benötigst du?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {['Onepager / Landingpage', 'Firmenwebsite', 'Web-App / Portal'].map((item) => (
                          <button key={item} onClick={() => { updateData('projectType', item); nextStep(); }} className={`p-6 rounded-2xl border-2 text-left transition-all hover:border-indigo-500 ${formData.projectType === item ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-black/40'}`}>
                            <div className="font-bold text-xl text-white mb-2">{item}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="p-step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h2 className="text-3xl font-bold text-white mb-8">Was ist das Hauptziel?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {getDynamicGoals().map((goal) => (
                          <button key={goal} onClick={() => { updateData('projectGoal', goal); nextStep(); }} className={`p-6 rounded-2xl border-2 text-left font-bold text-lg transition-all hover:border-indigo-500 ${formData.projectGoal === goal ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/10 bg-black/40 text-slate-300'}`}>
                            {goal}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="p-step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h2 className="text-3xl font-bold text-white mb-8">Wie sieht dein Zeitplan aus?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {['ASAP', 'Zeitnah', 'Entspannt'].map((time) => (
                          <button key={time} onClick={() => { updateData('timeline', time); nextStep(); }} className={`p-6 rounded-2xl border-2 text-center transition-all hover:border-indigo-500 ${formData.timeline === time ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-black/40'}`}>
                            <div className="font-bold text-xl text-white mb-2">{time}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="p-step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                      <h2 className="text-3xl font-bold text-white mb-8">Welcher Budgetrahmen steht zur Verfügung?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {['Unter 2.000 €', '2.000 € - 5.000 €', '5.000 € - 10.000 €', 'Über 10.000 €'].map((budget) => (
                          <button key={budget} onClick={() => { updateData('budget', budget); nextStep(); }} className={`p-6 rounded-2xl border-2 text-center font-bold text-lg transition-all hover:border-indigo-500 ${formData.budget === budget ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/10 bg-black/40 text-slate-300'}`}>
                            {budget}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 5 && (
                    <motion.form key="p-step5" onSubmit={handleSubmit} variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow space-y-8">
                      <h2 className="text-3xl font-bold text-white mb-8">Wie erreichen wir dich?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-400">Name / Firma *</label>
                          <input type="text" required value={formData.name} onChange={e => updateData('name', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-400">E-Mail Adresse *</label>
                          <input type="email" required value={formData.email} onChange={e => updateData('email', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        </div>
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-xl font-bold text-lg bg-indigo-500 text-white uppercase tracking-widest hover:bg-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.4)] mt-4">
                        {isSubmitting ? 'Wird gesendet...' : 'Projektanfrage absenden'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                {step > 1 && step <= 5 && (
                  <div className="mt-10 pt-6 border-t border-white/10 flex justify-start">
                    <button onClick={prevStep} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Zurück
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
                MODUS 3: ALLGEMEINE FRAGE
                ============================================================ */}
            {mode === 'general' && !isSuccess && (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500 relative z-10 w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8">Wie können wir helfen?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-400">Name *</label>
                    <input type="text" required value={formData.name} onChange={e => updateData('name', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-400">E-Mail *</label>
                    <input type="email" required value={formData.email} onChange={e => updateData('email', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-400">Deine Nachricht *</label>
                  <textarea required rows={5} value={formData.message} onChange={e => updateData('message', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-xl font-bold text-lg bg-emerald-500 text-white uppercase tracking-widest hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </form>
            )}

          </div>
        </FadeIn>

      </div>
    </main>
  );
}

export default function KontaktPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]"></div>}>
      <ContactFormContent />
    </Suspense>
  );
}