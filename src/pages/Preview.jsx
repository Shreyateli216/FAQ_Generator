import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, ChevronLeft, ChevronRight, Settings, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FaqAccordion from '../components/dashboard/FaqAccordion';
import faqsApi from '../api/faqsApi';

export default function Preview() {
  const navigate = useNavigate();
  const [device, setDevice] = useState('desktop');
  const [theme, setTheme] = useState('dark');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await faqsApi.getAll({ persona: 'sam' });
        if (data.success) {
          setFaqs(data.data);
        }
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full max-w-[1200px]';
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#00F0FF]/70 uppercase tracking-widest">Step 4 of 5</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40">Live Preview</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Test Drive Your Widget</h1>
          <p className="text-sm text-white/50 mt-1">Simulate how your generated FAQs will look and interact on different devices.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="glass-card flex p-1">
            <button onClick={() => setDevice('desktop')} className={`p-2 rounded-md transition-colors ${device === 'desktop' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-white/40 hover:text-white'}`}>
              <Monitor className="w-4 h-4" />
            </button>
            <button onClick={() => setDevice('tablet')} className={`p-2 rounded-md transition-colors ${device === 'tablet' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-white/40 hover:text-white'}`}>
              <Tablet className="w-4 h-4" />
            </button>
            <button onClick={() => setDevice('mobile')} className={`p-2 rounded-md transition-colors ${device === 'mobile' ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'text-white/40 hover:text-white'}`}>
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          
          <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/8 transition-all">
            <ChevronLeft className="w-4 h-4" /> Back to Generation
          </button>
          <button onClick={() => navigate('/export')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF]/20 to-[#A855F7]/20 border border-[#00F0FF]/30 text-sm font-semibold text-white hover:border-[#00F0FF]/60 transition-all group">
            Next: Export <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 mt-4">
        {/* Left side preview */}
        <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center p-8 overflow-y-auto">
          <div className={`${getContainerWidth()} h-full transition-all duration-500 ease-in-out`}>
            <div className={`rounded-xl shadow-2xl overflow-hidden h-full flex flex-col ${theme === 'dark' ? 'bg-[#121212] text-white border border-white/10' : 'bg-white text-gray-900 border border-black/10'}`}>
              <div className="p-4 border-b border-inherit bg-inherit flex items-center justify-between shadow-sm z-10">
                <span className="font-semibold">Frequently Asked Questions</span>
                <Maximize className="w-4 h-4 opacity-50" />
              </div>
              <div className="flex-1 p-4 overflow-y-auto widget-scroll">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-6 h-6 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
                  </div>
                ) : faqs.length > 0 ? (
                  <FaqAccordion faqs={faqs} theme={theme} activePersona="sam" />
                ) : (
                  <p className="text-center text-sm opacity-50 py-8">No FAQs to preview. Seed the database first.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side config panel */}
        <div className="w-[300px] flex flex-col gap-4">
          <div className="glass-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-white/80">
              <Settings className="w-4 h-4" /> Container Styling
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-2 block">Theme</label>
                <div className="flex bg-black/30 rounded-lg p-1 border border-white/10">
                  <button onClick={() => setTheme('dark')} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${theme === 'dark' ? 'bg-white/10 text-white' : 'text-white/40'}`}>Dark</button>
                  <button onClick={() => setTheme('light')} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${theme === 'light' ? 'bg-white/10 text-white' : 'text-white/40'}`}>Light</button>
                </div>
              </div>
              
              <div>
                 <label className="text-xs text-white/50 mb-2 block">Brand Color</label>
                 <div className="flex gap-2">
                   {['#00F0FF', '#A855F7', '#22C55E', '#EF4444', '#F59E0B'].map(color => (
                     <button key={color} className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                   ))}
                 </div>
              </div>
              
              <div>
                 <label className="text-xs text-white/50 mb-2 block">Typography</label>
                 <select className="w-full bg-black/40 border border-white/10 rounded px-2 py-2 text-xs text-white">
                   <option>Inter (System)</option>
                   <option>Roboto</option>
                   <option>Open Sans</option>
                 </select>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 bg-[#00F0FF]/5 border-[#00F0FF]/20">
             <h4 className="text-xs font-bold text-[#00F0FF] mb-2 uppercase tracking-wide">Live Updates</h4>
             <p className="text-xs text-white/70 leading-relaxed">
               Any changes made to the knowledge base or intent mapping will instantly reflect here. This preview accurately represents the embedded iframe/script behavior.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
