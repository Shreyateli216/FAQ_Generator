import React, { useState, useEffect } from 'react';
import { Settings2, ShieldCheck, Download, CodeXml } from 'lucide-react';
import seoApi from '../api/seoApi';

export default function SeoReports() {
  const [seoData, setSeoData] = useState({
    score: 0,
    metrics: { keywordDensity: 0, readability: 0, schemaCompleteness: 0, userIntent: 0 },
    suggestions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const data = await seoApi.getData();
        if (data.success && data.data) {
          setSeoData({
            score: data.data.score || 0,
            metrics: data.data.metrics || { keywordDensity: 0, readability: 0, schemaCompleteness: 0, userIntent: 0 },
            suggestions: data.data.suggestions || []
          });
        }
      } catch (err) {
        console.error('Failed to load SEO data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeo();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
      </div>
    );
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent Score';
    if (score >= 75) return 'Good Score';
    if (score >= 50) return 'Fair Score';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-[1200px] mx-auto h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">SEO & Intent Scoring</h1>
          <p className="text-sm text-white/50">LLM-as-a-Judge evaluations and structural SEO validation.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center col-span-1">
           <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                 <circle cx="50" cy="50" r="45" fill="none" stroke="#00F0FF" strokeWidth="8" strokeDasharray={`${seoData.score * 2.82} 282`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center">
                 <span className="text-3xl font-bold text-white">{seoData.score}</span>
                 <span className="text-[10px] uppercase text-white/50 tracking-wider">Overall</span>
              </div>
           </div>
           <h3 className="font-semibold text-white/90">{getScoreLabel(seoData.score)}</h3>
           <p className="text-xs text-white/50 mt-1">{seoData.score >= 80 ? 'Ready for production deployment.' : 'Consider the suggestions below.'}</p>
        </div>

        <div className="glass-card p-6 col-span-1 md:col-span-3 grid grid-cols-2 gap-4">
           {Object.entries(seoData.metrics).map(([key, val]) => (
             <div key={key} className="bg-black/20 rounded-lg border border-white/5 p-4 flex flex-col justify-center">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-white/60 uppercase tracking-wider font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                 <span className="text-sm font-bold text-white">{val}/100</span>
               </div>
               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <div className={`h-full rounded-full ${val > 90 ? 'bg-[#22C55E]' : val > 75 ? 'bg-[#00F0FF]' : 'bg-[#F59E0B]'}`} style={{ width: `${val}%` }}></div>
               </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
             <Settings2 className="w-4 h-4" /> AI Judge Suggestions
          </h2>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            {seoData.suggestions.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-8">No suggestions available.</p>
            ) : (
              seoData.suggestions.map((sug, i) => (
                <div key={i} className={`p-4 border rounded-lg flex items-start gap-3 ${sug.type === 'success' ? 'bg-[#22C55E]/5 border-[#22C55E]/20' : 'bg-[#F59E0B]/5 border-[#F59E0B]/20'}`}>
                 {sug.type === 'success' ? <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /> : <Settings2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />}
                 <p className="text-sm text-white/80 leading-relaxed">{sug.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col bg-[#1A1B23]/80">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
             <CodeXml className="w-4 h-4" /> Auto-Generated JSON-LD
          </h2>
          <div className="flex-1 bg-black/40 rounded-lg border border-white/10 overflow-hidden font-mono text-[11px] text-zinc-400 p-4 overflow-y-auto">
<pre>{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Shadow Integration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shadow Integration matches styles..."
      }
    }
  ]
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
