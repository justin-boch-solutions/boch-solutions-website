"use client";

import { useState } from 'react';
import FadeIn from '@/components/FadeIn';

export default function Kontakt() {
  const [mode, setMode] = useState<'project' | 'general'>('project');
  const [step, setStep] = useState(1);
  
  // Alle gesammelten Daten (jetzt erweitert)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: '',
    projectGoal: '',
    timeline: '',
    budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Dynamische Antworten für Schritt 2 (basierend auf der Wahl in Schritt 1)
  const getDynamicGoals = () => {
    switch (formData.projectType) {
      case 'Onepager / Landingpage':
        return ['Leads generieren', 'Produkt-Launch', 'Recruiting (Mitarbeiter/Azubis)', 'Event-Anmeldung'];
      case 'Firmenwebsite':
        return ['Komplettes Redesign', 'Online sichtbar werden', 'Mehr organische Anfragen (SEO)', 'Modernes Markenimage'];
      case 'Web-App / Portal':
        return ['Kundenportal / Dashboard', 'Interne Prozesse automatisieren', 'SaaS-Idee umsetzen', 'Bestehende Software ablösen'];
      default:
        return ['Leads generieren', 'Markenbekanntheit', 'Prozesse digitalisieren', 'Sonstiges'];
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

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      <div className="text-center max-w-3xl mb-12 text-slate-50">
        <FadeIn direction="up">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Lass uns <span className="text-sky-500">starten.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p className="text-lg text-slate-400">
            Wähle aus, wie wir dir helfen können. Für neue Projekte klickst du dich einfach in 30 Sekunden durch unseren intelligenten Fragebogen.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-4xl">
        
        {/* TAB SCHALTER */}
        <FadeIn direction="up" delay={0.2}>
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl mb-8 max-w-md mx-auto">
            <button 
              onClick={() => { setMode('project'); setStep(1); }}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${mode === 'project' ? 'bg-sky-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Projekt anfragen
            </button>
            <button 
              onClick={() => setMode('general')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${mode === 'general' ? 'bg-sky-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Allgemeine Frage
            </button>
          </div>
        </FadeIn>

        {/* DAS FORMULAR-GEHÄUSE */}
        <FadeIn direction="up" delay={0.3}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-center border border-slate-200">
            
            {/* ERFOLGSMELDUNG OVERLAY */}
            {isSuccess && (
              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-950 mb-4">Erfolgreich übermittelt!</h3>
                <p className="text-slate-600 mb-8 text-lg">Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden bei dir.</p>
                <button onClick={() => { setIsSuccess(false); setStep(1); setFormData({name: '', email: '', message: '', projectType: '', projectGoal: '', timeline: '', budget: ''}); }} className="px-8 py-3 bg-slate-900 text-white rounded-md font-bold hover:bg-slate-800 transition-colors">
                  Weitere Anfrage stellen
                </button>
              </div>
            )}

            {/* MODUS 1: ALLGEMEINE FRAGE */}
            {mode === 'general' && !isSuccess && (
              <form onSubmit={handleSubmit} className="space-y-6 text-slate-950 animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold mb-6">Wie können wir helfen?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Name *</label>
                    <input type="text" required value={formData.name} onChange={e => updateData('name', e.target.value)} className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" placeholder="Dein Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">E-Mail *</label>
                    <input type="email" required value={formData.email} onChange={e => updateData('email', e.target.value)} className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" placeholder="mail@beispiel.de" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Deine Nachricht *</label>
                  <textarea required rows={5} value={formData.message} onChange={e => updateData('message', e.target.value)} className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none" placeholder="Was liegt dir auf dem Herzen?"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-md font-bold text-lg bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors shadow-lg">
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </form>
            )}

            {/* MODUS 2: PROJEKT FUNNEL (Interaktiv & Dynamisch) */}
            {mode === 'project' && !isSuccess && (
              <div className="text-slate-950 h-full flex flex-col">
                
                {/* Fortschrittsbalken (jetzt 5 Schritte) */}
                <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                  <div className="bg-sky-500 h-full transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }}></div>
                </div>

                {/* SCHRITT 1: Was brauchst du? */}
                {step === 1 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 flex-grow">
                    <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Was genau benötigst du?</h2>
                      <span className="text-sm font-bold text-sky-500">1/5</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: 'Onepager / Landingpage', desc: 'Kurz & knackig für Kampagnen' },
                        { title: 'Firmenwebsite', desc: 'Dein digitales Hauptquartier' },
                        { title: 'Web-App / Portal', desc: 'Individuelle Programmierung' }
                      ].map((item) => (
                        <button 
                          key={item.title}
                          onClick={() => { updateData('projectType', item.title); nextStep(); }}
                          className={`p-6 rounded-xl border-2 text-left transition-all hover:border-sky-500 hover:shadow-md ${formData.projectType === item.title ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}
                        >
                          <div className="font-bold text-lg mb-2">{item.title}</div>
                          <div className="text-sm text-slate-500">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCHRITT 2: Was ist das Ziel? (DYNAMISCH) */}
                {step === 2 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 flex-grow">
                    <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Was ist das Hauptziel?</h2>
                      <span className="text-sm font-bold text-sky-500">2/5</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getDynamicGoals().map((goal) => (
                        <button 
                          key={goal}
                          onClick={() => { updateData('projectGoal', goal); nextStep(); }}
                          className={`p-5 rounded-xl border-2 text-left font-bold transition-all hover:border-sky-500 hover:shadow-md ${formData.projectGoal === goal ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCHRITT 3: Dringlichkeit */}
                {step === 3 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 flex-grow">
                    <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Wie sieht dein Zeitplan aus?</h2>
                      <span className="text-sm font-bold text-sky-500">3/5</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: 'So schnell wie möglich', desc: 'Innerhalb von 2-4 Wochen' },
                        { title: 'Zeitnah', desc: 'In den nächsten 1-2 Monaten' },
                        { title: 'Hat noch Zeit', desc: 'In den nächsten 3-6 Monaten' }
                      ].map((time) => (
                        <button 
                          key={time.title}
                          onClick={() => { updateData('timeline', time.title); nextStep(); }}
                          className={`p-6 rounded-xl border-2 text-center transition-all hover:border-sky-500 hover:shadow-md ${formData.timeline === time.title ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}
                        >
                          <div className="font-bold text-lg mb-2">{time.title}</div>
                          <div className="text-sm text-slate-500">{time.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCHRITT 4: Budget (Feiner aufgeteilt) */}
                {step === 4 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 flex-grow">
                    <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Welcher Budgetrahmen steht zur Verfügung?</h2>
                      <span className="text-sm font-bold text-sky-500">4/5</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {['Unter 1.000 €', '1.000 € - 2.500 €', '2.500 € - 5.000 €', 'Über 5.000 €'].map((budget) => (
                        <button 
                          key={budget}
                          onClick={() => { updateData('budget', budget); nextStep(); }}
                          className={`p-5 rounded-xl border-2 text-center font-bold transition-all hover:border-sky-500 hover:shadow-md ${formData.budget === budget ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-6 text-center">Das hilft uns, dir direkt die realistischste Lösung vorzuschlagen. Keine versteckten Kosten.</p>
                  </div>
                )}

                {/* SCHRITT 5: Kontaktdaten (Finaler Schritt) */}
                {step === 5 && (
                  <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-8 fade-in duration-500 flex-grow space-y-6">
                    <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Fast geschafft. Wie erreichen wir dich?</h2>
                      <span className="text-sm font-bold text-sky-500">5/5</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Name / Firma *</label>
                        <input type="text" required value={formData.name} onChange={e => updateData('name', e.target.value)} className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" placeholder="Max Mustermann" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">E-Mail Adresse *</label>
                        <input type="email" required value={formData.email} onChange={e => updateData('email', e.target.value)} className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" placeholder="mail@beispiel.de" />
                      </div>
                    </div>
                    
                    {/* Zusammenfassung der bisherigen Klicks */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600 flex gap-4 flex-wrap mt-2">
                      <span className="font-semibold text-slate-900">Auswahl:</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200">{formData.projectType}</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200">{formData.projectGoal}</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200">{formData.budget}</span>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-md font-bold text-lg bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors shadow-lg mt-4">
                      {isSubmitting ? 'Wird gesendet...' : 'Projektanfrage absenden'}
                    </button>
                  </form>
                )}

                {/* Zurück-Button (Nur bei Schritt 2-5) */}
                {step > 1 && step <= 5 && (
                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-start">
                    <button onClick={prevStep} className="text-slate-500 font-semibold hover:text-slate-900 flex items-center gap-2 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      Zurück
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>
        </FadeIn>

      </div>
    </main>
  );
}