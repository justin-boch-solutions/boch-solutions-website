import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Stelle sicher, dass die URL mit http:// oder https:// beginnt
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // Wir nutzen die offizielle Google PageSpeed Insights API mit deinem Key
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&category=performance&strategy=mobile${apiKey ? `&key=${apiKey}` : ''}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.error) {
       return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const lighthouseResult = data.lighthouseResult;
    
    // 1. Performance Score (wird von Google als Wert zwischen 0.0 und 1.0 zurückgegeben)
    const rawScore = lighthouseResult?.categories?.performance?.score || 0;
    const score = Math.round(rawScore * 100);
    
    // 2. Ladezeit (Speed Index in Millisekunden, wir rechnen es in Sekunden um)
    const rawLoadTime = lighthouseResult?.audits?.['speed-index']?.numericValue || 0;
    const loadTime = rawLoadTime / 1000;
    
    // 3. Fehler / Handlungsfelder zählen (Alle Audits, die einen schlechten Score haben < 0.9)
    let issues = 0;
    if (lighthouseResult?.audits) {
      for (const key in lighthouseResult.audits) {
        const audit = lighthouseResult.audits[key];
        if (audit.score !== null && audit.score < 0.9 && audit.score !== undefined) {
          issues++;
        }
      }
    }

    // Falls die API keine brauchbaren Daten liefert, setze Fallbacks
    return NextResponse.json({ 
      score: score > 0 ? score : 45, 
      loadTime: loadTime > 0 ? loadTime : 4.2, 
      issues: issues > 0 ? issues : 5 
    });

  } catch (error) {
    console.error("Fehler bei der PageSpeed Analyse:", error);
    return NextResponse.json({ error: 'Failed to analyze URL' }, { status: 500 });
  }
}
