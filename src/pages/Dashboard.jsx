import React, { useState, useEffect } from 'react';
import FeatureInputCard from '../components/dashboard/FeatureInputCard';
import ScreenshotUploader from '../components/dashboard/ScreenshotUploader';
import GenerateButton from '../components/dashboard/GenerateButton';
import PersonaTabs from '../components/dashboard/PersonaTabs';
import FaqAccordion from '../components/dashboard/FaqAccordion';
import faqsApi from '../api/faqsApi';

export default function Dashboard() {
  const [activePersona, setActivePersona] = useState('nora'); // nora, sam, paul
  const [language, setLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [faqs, setFaqs] = useState({ nora: [], sam: [], paul: [] });
  const [loading, setLoading] = useState(true);

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const [noraData, samData, paulData] = await Promise.all([
          faqsApi.getAll({ persona: 'nora' }),
          faqsApi.getAll({ persona: 'sam' }),
          faqsApi.getAll({ persona: 'paul' }),
        ]);
        setFaqs({
          nora: noraData.success ? noraData.data : [],
          sam: samData.success ? samData.data : [],
          paul: paulData.success ? paulData.data : [],
        });
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const currentFaqs = faqs[activePersona] || [];

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto h-full">
      
      {/* Left Column (60%) - Input & Generation Panel */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6 h-full pb-8">
        <h1 className="text-2xl font-bold font-heading">Generate New FAQ Widget</h1>
        
        <FeatureInputCard />
        
        <ScreenshotUploader />
        
        <div className="mt-4">
          <GenerateButton isGenerating={isGenerating} onClick={handleGenerate} />
        </div>

        <div className="mt-auto pt-6 flex items-center justify-center gap-2 text-xs font-medium text-[#A855F7]">
          <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse"></div>
          <span>Knowledge Grounded • RAG Enabled</span>
        </div>
      </div>

      {/* Right Column (45%) - Live Results & Preview */}
      <div className="w-full lg:w-[45%] flex flex-col h-full bg-[#1A1B23]/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden relative">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold font-heading">Live Preview</h2>
          
          {/* Output Controls */}
          <div className="flex gap-2">
             <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs rounded border ${language === 'en' ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10' : 'border-white/10 text-white/50 bg-transparent'}`}>English</button>
             <button onClick={() => setLanguage('hi')} className={`px-2 py-1 text-xs rounded border ${language === 'hi' ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10' : 'border-white/10 text-white/50 bg-transparent'}`}>हिंदी</button>
             <button onClick={() => setLanguage('mr')} className={`px-2 py-1 text-xs rounded border ${language === 'mr' ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10' : 'border-white/10 text-white/50 bg-transparent'}`}>मराठी</button>
          </div>
        </div>

        <div className="p-6">
          <PersonaTabs activePersona={activePersona} onChange={setActivePersona} />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {isGenerating || loading ? (
            <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
               <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin"></div>
               <p className="text-sm">{loading ? 'Loading FAQs...' : 'Synthesizing Intent & Extracting UI Context...'}</p>
            </div>
          ) : currentFaqs.length > 0 ? (
            <FaqAccordion faqs={currentFaqs} activePersona={activePersona} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-2">
              <p className="text-sm">No FAQs generated yet.</p>
              <p className="text-xs">Seed the database or generate new FAQs to see them here.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
