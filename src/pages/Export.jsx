import React, { useState } from 'react';
import { Code, Download, Copy, CheckCircle2, Terminal, Package, ChevronLeft, Hexagon, Database, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Export() {
  const navigate = useNavigate();
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'script') {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const snippetCode = `<script>
  window.faqGenieConfig = {
    projectId: "prj_01hbw9x...",
    theme: "dark",
    primaryColor: "#00F0FF"
  };
</script>
<script src="https://cdn.faqgenie.io/v1/widget.js" async defer></script>
<!-- Place this where you want the FAQ to appear -->
<div id="faqgenie-root"></div>`;

  return (
    <div className="flex flex-col h-full gap-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#22C55E]/70 uppercase tracking-widest">Step 5 of 5</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40">Deploy</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Export &amp; Integrations</h1>
          <p className="text-sm text-white/50 mt-1">Take your generated FAQs and embed them seamlessly into your application.</p>
        </div>
        
        <button onClick={() => navigate('/preview')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/8 transition-all">
          <ChevronLeft className="w-4 h-4" /> Back to Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Left Col: Web Widget Embed */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border-t-4 border-t-[#00F0FF]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-[#00F0FF]/10 text-[#00F0FF]">
                 <Code className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold">Universal Web Snippet</h2>
            </div>
            
            <p className="text-sm text-white/60 mb-4">
              Embed this interactive React widget directly into any web application (HTML, WordPress, Webflow, etc.). It automatically pulls the latest FAQs.
            </p>

            <div className="relative group">
               <div className="absolute top-3 right-3 text-white/40">
                 <button onClick={() => copyToClipboard(snippetCode, 'script')} className="hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-md flex items-center gap-1.5 text-xs">
                    {copiedScript ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                    {copiedScript ? 'Copied!' : 'Copy'}
                 </button>
               </div>
               <pre className="bg-black/50 p-4 rounded-xl border border-white/10 text-xs text-[#00F0FF] font-mono overflow-x-auto">
                 <code>{snippetCode}</code>
               </pre>
            </div>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-[#A855F7] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-[#A855F7]/10 text-[#A855F7]">
                   <Database className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Raw Data Access (JSON/REST)</h2>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Want complete control over the UI? Consume the generated FAQ dataset via our highly available REST API, or download the raw JSON.
              </p>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 py-2.5 rounded-lg text-sm font-medium transition-colors">
                 <Download className="w-4 h-4" /> Download JSON
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#A855F7]/20 border border-[#A855F7]/30 hover:border-[#A855F7]/50 text-[#A855F7] py-2.5 rounded-lg text-sm font-medium transition-colors">
                 <Terminal className="w-4 h-4" /> View API Docs
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Framework SDKs */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded bg-white/10 text-white">
                 <Package className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold">Framework Integrations</h2>
            </div>
            
            <p className="text-sm text-white/60 mb-6">
               Native SDKs and plugins for the most popular stacks. Include FAQs at build time or fetch dynamically.
            </p>

            <div className="grid gap-3 flex-1">
              {[
                { name: 'React / Next.js', cmd: 'npm i @faqgenie/react', icon: '⚛️' },
                { name: 'Vue.js / Nuxt', cmd: 'npm i @faqgenie/vue', icon: '💚' },
                { name: 'WordPress Plugin', cmd: 'Download .zip package', icon: '📝' },
              ].map((sdk) => (
                <div key={sdk.name} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:border-white/20 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sdk.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5">{sdk.name}</h4>
                      <p className="text-xs text-white/50 font-mono">{sdk.cmd}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:text-[#00F0FF] transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Complete Step */}
      <div className="flex justify-center mt-6">
        <button onClick={() => navigate('/libraries')} className="neon-button px-8 py-3 rounded-full flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#10B981] text-white font-bold tracking-wide shadow-[0_0_25px_rgba(34,197,94,0.3)]">
          <CheckCircle2 className="w-5 h-5" /> Finish Project
        </button>
      </div>

    </div>
  );
}
