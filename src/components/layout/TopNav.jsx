import React, { useState } from 'react';
import { Sparkles, Shield, User, ChevronRight, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const WORKFLOW_STEPS = ["Ingest", "Extract", "Generate", "Preview", "Export"];

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  let activeStep = -1;
  if (location.pathname === '/ingest') activeStep = 0;
  else if (location.pathname === '/extract') activeStep = 1;
  else if (location.pathname === '/') activeStep = 2; // Dashboard/Generate
  else if (location.pathname === '/preview') activeStep = 3;
  else if (location.pathname === '/export') activeStep = 4;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
            <React.Fragment key={step}>
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#00F0FF]' : isPassed ? 'text-white/70' : 'text-white/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  isActive ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : isPassed ? 'bg-white/10 text-white' : 'bg-transparent border border-white/10'
                }`}>
                  {index + 1}
                </div>
                {step}
              </div>
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

        {/* User avatar with dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#A855F7] p-[1px] cursor-pointer hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-shadow"
          >
            <div className="w-full h-full bg-[#1A1B23] rounded-full flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-white/80" />
            </div>
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-12 w-56 bg-[#1A1B23] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-white/40 truncate">{user?.email || ''}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
