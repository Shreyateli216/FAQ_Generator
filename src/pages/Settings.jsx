import React, { useState, useEffect } from 'react';
import { Key, Server, Lock, AlertTriangle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [settings, setSettings] = useState({
    groqApiKey: '',
    privacyMode: false,
    textEngine: 'mistral:latest',
    visionEngine: 'llava:7b'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem('faqgenie_settings');
    if (local) {
      try { setSettings(JSON.parse(local)); } catch (e) {}
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    localStorage.setItem('faqgenie_settings', JSON.stringify(settings));
    setTimeout(() => {
      setSaved(true);
      setSaving(false);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-heading">Platform Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF]/20 to-[#A855F7]/20 border border-[#00F0FF]/30 text-sm font-semibold text-white hover:border-[#00F0FF]/60 transition-all disabled:opacity-50"
        >
          {saved ? (
            <><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Saved!</>
          ) : saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>

      <div className="space-y-6">
        
        {/* API Configuration */}
        <section className="glass-card p-6 border-l-4 border-l-[#00F0FF]">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-5 h-5 text-[#00F0FF]" />
            <h2 className="text-lg font-semibold text-white">API Configuration</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Groq API Key (Primary Engine)</label>
              <div className="relative">
                <input 
                  type={showGroqKey ? 'text' : 'password'}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#00F0FF]/50"
                  value={settings.groqApiKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, groqApiKey: e.target.value }))}
                />
                <button onClick={() => setShowGroqKey(!showGroqKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-white/40 mt-1">Required for LLaMA-3 rapid inference.</p>
            </div>
          </div>
        </section>

        {/* Hybrid Fallback & Privacy */}
        <section className="glass-card p-6 border-l-4 border-l-[#A855F7]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#A855F7]" />
              <h2 className="text-lg font-semibold text-white">Privacy & Local Fallback</h2>
            </div>
            
            {/* Toggle */}
            <button 
              onClick={() => setSettings(prev => ({ ...prev, privacyMode: !prev.privacyMode }))}
              className={`w-12 h-6 rounded-full relative transition-colors ${settings.privacyMode ? 'bg-[#A855F7]' : 'bg-white/20'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings.privacyMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4 border border-white/5 flex gap-4">
            <div className="pt-0.5">
              <Server className={`w-5 h-5 ${settings.privacyMode ? 'text-[#A855F7]' : 'text-white/40'}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Local Edge Execution (Ollama)</h3>
              <p className="text-xs text-white/50 leading-relaxed mb-3">
                When enabled, generation bypasses Groq entirely. Data never leaves your machine. Slower inference, but 100% private.
              </p>
              
              <div className="flex gap-4">
                <div className="flex-1">
                   <label className="text-[10px] text-white/40 uppercase block mb-1">Text Engine</label>
                   <select 
                     disabled={!settings.privacyMode} 
                     value={settings.textEngine}
                     onChange={(e) => setSettings(prev => ({ ...prev, textEngine: e.target.value }))}
                     className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs text-white disabled:opacity-50"
                   >
                     <option>mistral:latest</option>
                     <option>llama3:8b</option>
                   </select>
                </div>
                <div className="flex-1">
                   <label className="text-[10px] text-white/40 uppercase block mb-1">Vision Engine</label>
                   <select 
                     disabled={!settings.privacyMode} 
                     value={settings.visionEngine}
                     onChange={(e) => setSettings(prev => ({ ...prev, visionEngine: e.target.value }))}
                     className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs text-white disabled:opacity-50"
                   >
                     <option>llava:7b</option>
                   </select>
                </div>
              </div>
            </div>
          </div>
          
          {!settings.privacyMode && (
             <div className="mt-4 flex items-start gap-2 text-xs text-[#F59E0B]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <p>Currently defaulting to Groq Cloud. Ollama will only spin up automatically if Groq rate limits are hit (Seamless Failover).</p>
             </div>
          )}
        </section>

      </div>
    </div>
  );
}
