import React, { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, RefreshCw, ChevronDown } from 'lucide-react';

export default function FaqAccordion({ faqs, activePersona }) {
  const getId = (faq) => faq._id || faq.id;
  const [openId, setOpenId] = useState(faqs?.[0] ? getId(faqs[0]) : null);

  if (!faqs || faqs.length === 0) return null;

  const glowColor = activePersona === 'nora' ? '#3B82F6' : activePersona === 'sam' ? '#A855F7' : '#00F0FF';

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const faqId = getId(faq);
        const isOpen = openId === faqId;
        return (
          <div 
            key={faqId} 
            className={`rounded-xl border transition-colors ${isOpen ? 'bg-[#1A1B23] border-white/20' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
          >
            <button 
              onClick={() => setOpenId(isOpen ? null : faqId)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <h3 className={`text-sm font-medium pr-4 ${isOpen ? 'text-white' : 'text-white/80'}`}>{faq.question}</h3>
              <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out`}
              style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
              <div className="px-5 pb-5 pt-1 border-t border-white/5 relative">
                {/* Subtle left border glow mapping to persona */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: glowColor, opacity: 0.5 }}></div>
                
                <p className="text-sm text-white/70 leading-relaxed mb-4">{faq.answer}</p>
                
                <div className="flex items-center gap-3">
                  <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors" title="Copy to clipboard">
                     <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded bg-white/5 hover:bg-green-500/20 text-white/40 hover:text-green-500 transition-colors">
                     <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-colors">
                     <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors ml-auto flex items-center gap-1">
                     <RefreshCw className="w-3 h-3" />
                     <span className="text-[10px] font-medium uppercase tracking-wider">Regenerate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
