import React from 'react';

export default function PersonaTabs({ activePersona, onChange }) {
  const personas = [
    { 
      id: 'nora', 
      name: 'Nora (Newbie)', 
      tagline: 'Simple & Guided', 
      color: 'bg-blue-500', 
      border: 'border-blue-500/30',
      activeBg: 'bg-blue-500/10'
    },
    { 
      id: 'sam', 
      name: 'Sam (Skeptic)', 
      tagline: 'Clear & Trustworthy', 
      color: 'bg-purple-500', 
      border: 'border-purple-500/30',
      activeBg: 'bg-purple-500/10'
    },
    { 
      id: 'paul', 
      name: 'Paul (Pro)', 
      tagline: 'Fast & Technical', 
      color: 'bg-cyan-500', 
      border: 'border-cyan-500/30',
      activeBg: 'bg-cyan-500/10'
    }
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {personas.map((p) => {
        const isActive = activePersona === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`min-w-[140px] flex-1 p-3 rounded-lg border text-left transition-all ${
              isActive ? p.border + ' ' + p.activeBg : 'border-white/5 bg-black/20 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${p.color} ${isActive ? 'shadow-[0_0_8px_currentColor]' : ''}`}></div>
              <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/60'}`}>{p.name}</span>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-wide">{p.tagline}</p>
          </button>
        )
      })}
    </div>
  );
}
