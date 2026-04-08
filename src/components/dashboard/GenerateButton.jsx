import React from 'react';
import { Wand2, Loader2 } from 'lucide-react';

export default function GenerateButton({ isGenerating, onClick }) {
  return (
    <button 
      onClick={onClick}
      disabled={isGenerating}
      className={`relative w-full overflow-hidden rounded-xl p-[1px] transition-transform ${isGenerating ? 'opacity-80 cursor-not-allowed scale-95' : 'hover:scale-[1.02] active:scale-95 glow-shadow'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#00F0FF] rounded-xl z-0 animate-gradient-bg bg-[length:200%_auto]"></div>
      <div className="relative bg-[#1A1B23] rounded-xl px-6 py-4 flex items-center justify-center gap-3 z-10 hover:bg-transparent transition-colors duration-500">
         {isGenerating ? (
           <Loader2 className="w-5 h-5 text-white animate-spin" />
         ) : (
           <Wand2 className="w-5 h-5 text-white" />
         )}
         <span className="text-white font-bold text-lg tracking-wide">
           {isGenerating ? 'Synthesizing Knowledge...' : 'Generate Persona-Driven FAQs'}
         </span>
      </div>
      <style>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          animation: gradient-bg 3s ease infinite;
        }
        .glow-shadow {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </button>
  );
}
