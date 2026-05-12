"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfiguratorSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    design: '',
    features: [] as string[],
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => {
      if (prev.features.includes(feature)) {
        return { ...prev, features: prev.features.filter(f => f !== feature) };
      }
      return { ...prev, features: [...prev.features, feature] };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliere einen API Call (hier sollte eigentlich fetch an /api/contact gehen)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  }

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <section id="konfigurator" className="relative w-full py-32 px-6 flex justify-center bg-[#020617] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            Preisrechner
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Was kostet deine neue Website?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Klick dich in 60 Sekunden durch unseren Konfigurator und erhalte sofort eine realistische Preiseinschätzung für dein Projekt.
          </p>
        </div>

        {/* Configurator Box */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
          
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* SCHRITT 1: Art */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Was genau brauchst du?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'Onepager', title: 'Onepager', desc: 'Eine lange, scrollbare Seite. Ideal für Kampagnen.' },
                    { id: 'Firmenwebsite', title: 'Firmenwebsite', desc: 'Mehrseitige Website für optimale Google-Sichtbarkeit.' },
                    { id: 'Online-Shop', title: 'Online-Shop', desc: 'Produkte online verkaufen (z.B. Shopify).' }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => { updateData('type', item.id); nextStep(); }}
                      className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${formData.type === item.id ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-sky-400">
                        {formData.type === item.id ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <span className="text-lg font-bold">?</span>
                        )}
                      </div>
                      <div className="font-bold text-xl text-white mb-2">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SCHRITT 2: Design Level */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Welches Design-Level wünschst du dir?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'Clean & Modern', title: 'Clean & Modern', desc: 'Solides, professionelles Design. Ideal für den Start.', price: 'Standard' },
                    { id: 'Premium (Wie diese Seite)', title: 'Premium Agentur-Look', desc: 'Interaktive Elemente, 3D-Glows, maximale Conversion.', price: 'High-End' }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => { updateData('design', item.id); nextStep(); }}
                      className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${formData.design === item.id ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
                    >
                      <div>
                        <div className="font-bold text-xl text-white mb-2 flex justify-between items-center">
                          {item.title}
                          {formData.design === item.id && <span className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,1)]"></span>}
                        </div>
                        <div className="text-sm text-slate-400 mb-6">{item.desc}</div>
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 inline-block px-3 py-1 rounded-full w-max">
                        {item.price}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SCHRITT 3: Features */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Zusatzfunktionen (Mehrfachauswahl)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    'SEO-Texterstellung', 'Logo-Design', 'Terminbuchungs-Tool', 'Blog / News', 'Mehrsprachig', 'Google Maps Ranking'
                  ].map(feature => (
                    <button 
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`p-4 rounded-xl border transition-all duration-300 text-sm font-semibold flex items-center gap-3 ${formData.features.includes(feature) ? 'border-sky-500 bg-sky-500/10 text-white shadow-[0_0_15px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/30'}`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${formData.features.includes(feature) ? 'border-sky-500 bg-sky-500' : 'border-slate-500'}`}>
                        {formData.features.includes(feature) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      {feature}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center mt-auto">
                  <button onClick={nextStep} className="px-10 py-4 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Weiter zur Auswertung
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCHRITT 4: Lead Gen */}
            {step === 4 && !isSuccess && (
              <motion.form key="step4" onSubmit={handleSubmit} variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col justify-center max-w-lg mx-auto w-full">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Deine Auswertung ist bereit!</h3>
                  <p className="text-slate-400">
                    Wir haben den Aufwand für <strong>{formData.type}</strong> mit <strong>{formData.design}</strong> berechnet. Wohin sollen wir dir den Schätzpreis senden?
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => updateData('email', e.target.value)} 
                    placeholder="Deine E-Mail Adresse" 
                    className="w-full px-6 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(56,189,248,0.4)] disabled:opacity-50 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <span className="animate-pulse">Berechne...</span>
                  ) : (
                    <>Preis jetzt anzeigen <span className="text-xl">→</span></>
                  )}
                </button>
                <p className="text-xs text-slate-600 text-center mt-6">Kostenlos und 100% unverbindlich.</p>
              </motion.form>
            )}

            {/* ERFOLG */}
            {isSuccess && (
              <motion.div key="success" variants={slideVariants} initial="hidden" animate="visible" className="flex-grow flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30">
                  <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Fantastisch!</h3>
                <p className="text-lg text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
                  Deine Anfrage wurde gespeichert. Ich habe deine Daten erhalten und melde mich in Kürze mit einer konkreten Preiseinschätzung bei dir auf <span className="text-white font-bold">{formData.email}</span>.
                </p>
                <button onClick={() => { setIsSuccess(false); setStep(1); setFormData({type: '', design: '', features: [], email: ''}); }} className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
                  Konfigurator neu starten
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Button */}
          {step > 1 && step < 4 && !isSuccess && (
            <div className="absolute bottom-8 left-8 md:left-12">
              <button onClick={prevStep} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Zurück
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
