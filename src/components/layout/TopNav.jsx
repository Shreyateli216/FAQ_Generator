import React from 'react';
import { Sparkles, Shield, User, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const WORKFLOW_STEPS = [
  { label: "Ingest", path: "/ingest" },
  { label: "Extract", path: "/extract" },
  { label: "Generate", path: "/" },
  { label: "Preview", path: "/preview" },
  { label: "Export", path: "/export" }
];

export default function TopNav() {
  const location = useLocation();
  
  let activeStep = -1;
  const currentPath = location.pathname;
  if (currentPath === '/ingest') activeStep = 0;
  else if (currentPath === '/extract') activeStep = 1;
  else if (currentPath === '/') activeStep = 2; // Dashboard/Generate
  else if (currentPath === '/preview') activeStep = 3;
  else if (currentPath === '/export') activeStep = 4;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0F1117]/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6">
      
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <div className="font-heading font-bold text-xl tracking-tight flex items-center">
          <span className="text-[#00F0FF]">FAQ</span>
          <span className="text-white">Genie</span>
        </div>
        <Sparkles className="w-4 h-4 text-[#A855F7]" />
      </Link>

      {/* Stepper */}
      <div className="hidden md:flex items-center gap-2">
        {WORKFLOW_STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;
          return (
            <React.Fragment key={step.label}>
              <Link
                to={step.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#00F0FF] ${
                  isActive ? 'text-[#00F0FF]' : isPassed ? 'text-white/70' : 'text-white/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                  isActive ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : isPassed ? 'bg-white/10 text-white' : 'bg-transparent border border-white/10'
                }`}>
                  {index + 1}
                </div>
                {step.label}
              </Link>
              {index < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight className={`w-4 h-4 ${isPassed ? 'text-white/40' : 'text-white/10'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          <span className="text-white/90">Groq LLaMA 3</span>
          <span className="text-white/40 px-1">•</span>
          <span className="text-[#A855F7]">Live</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Shield className="w-4 h-4" />
          <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer border border-white/5">
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white/50 rounded-full transition-all"></div>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#A855F7] p-[1px]">
          <div className="w-full h-full bg-[#1A1B23] rounded-full flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 text-white/80" />
          </div>
        </div>
      </div>
    </nav>
  );
}
