import React, { useState, useEffect } from 'react';
import FeatureInputCard from '../components/dashboard/FeatureInputCard';
import ScreenshotUploader from '../components/dashboard/ScreenshotUploader';
import GenerateButton from '../components/dashboard/GenerateButton';
import PersonaTabs from '../components/dashboard/PersonaTabs';
import FaqAccordion from '../components/dashboard/FaqAccordion';
import { MOCK_FAQS } from '../data/mockFaqs';
import { generateFaqsFromContext, checkOllamaConnection } from '../utils/ollamaClient';
import faqsApi from '../api/faqsApi';

export default function Dashboard() {
  const [activePersona, setActivePersona] = useState('nora'); // nora, sam, paul
  const [language, setLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFaqs, setGeneratedFaqs] = useState(null);
  const [ollamaError, setOllamaError] = useState('');
  const [faqs, setFaqs] = useState({ nora: [], sam: [], paul: [] });
  const [loading, setLoading] = useState(true);

  // UI State for Context Generation
  const [targetUrl, setTargetUrl] = useState('https://acme.inc/new-dashboard');
  const [featureDescription, setFeatureDescription] = useState("The new Shadow Integration widget automatically inherits the host website's CSS tokens (colors, typography, spacing) without requiring heavy configuration. It connects via a single `<script>` tag and relies on dynamic DOM inspection.");

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

  const handleGenerate = async () => {
    if (!featureDescription.trim()) {
      setOllamaError("Please describe your feature before generating FAQs.");
      return;
    }

    setIsGenerating(true);
    setOllamaError('');
    
    try {
       // Check if Ollama proxy is up
       const isConnected = await checkOllamaConnection();
       if (!isConnected) {
         setOllamaError('Could not connect to Ollama. Make sure Ollama desktop app is running and Vite Proxy is configured.');
         setIsGenerating(false);
         return;
       }

       // Construct a single "chunk" representing the user context
       const userContextChunks = [
         {
           intent: 'User Described Feature',
           text: `Target context URL: ${targetUrl}. Description: ${featureDescription}`,
           selected: true
         }
       ];

       // Perform real inference using the user input
       const responseText = await generateFaqsFromContext(userContextChunks, 'llama3');
       
       let parsed = null;
       try {
         // 1. Aggressive extraction: Find the very first '[' or '{' and the last ']' or '}'
         const firstBrace = responseText.indexOf('{');
         const firstBracket = responseText.indexOf('[');
         
         let firstChar = -1;
         if (firstBrace !== -1 && firstBracket !== -1) firstChar = Math.min(firstBrace, firstBracket);
         else if (firstBrace !== -1) firstChar = firstBrace;
         else firstChar = firstBracket;

         const lastBrace = responseText.lastIndexOf('}');
         const lastBracket = responseText.lastIndexOf(']');

         let lastChar = -1;
         if (lastBrace !== -1 && lastBracket !== -1) lastChar = Math.max(lastBrace, lastBracket);
         else if (lastBrace !== -1) lastChar = lastBrace;
         else lastChar = lastBracket;

         let jsonStr = responseText;
         if (firstChar !== -1 && lastChar !== -1 && lastChar > firstChar) {
             jsonStr = responseText.substring(firstChar, lastChar + 1);
         }

         // 2. Parse JSON
         parsed = JSON.parse(jsonStr);
         
         // 3. Ensure it's an Array
         if (!Array.isArray(parsed)) {
            // Search the object for any property that holds an Array
            const arrayKey = Object.keys(parsed).find(key => Array.isArray(parsed[key]));
            if (arrayKey) {
               parsed = parsed[arrayKey];
            } else {
               throw new Error("Returned JSON was an object, but could not find inner array");
            }
         }

         // 4. Ensure properties map exactly to what FaqAccordion expects
         /* eslint-disable no-unused-vars */
         const formattedFaqs = parsed.map((item, index) => ({
             id: item.id || `gen-${Date.now()}-${index}`,
             question: item.question || item.q || "Question not generated",
             answer: item.answer || item.a || "Answer not generated",
             intent: item.intent || "General"
         }));

         setGeneratedFaqs(formattedFaqs);
       } catch (err) {
         console.error("Ollama JSON parse error:", err, "Raw Output:", responseText);
         // If it completely fails, we show the raw output so the user can easily see why it broke.
         let snippet = responseText.substring(0, 100) + (responseText.length > 100 ? "..." : "");
         setOllamaError(`Invalid JSON. Raw LLM Output was: "${snippet}"`);
       }
    } catch (err) {
       setOllamaError(err.message || 'An error occurred during generation.');
    } finally {
       setIsGenerating(false);
    }
  };

  const currentFaqs = generatedFaqs || faqs[activePersona] || MOCK_FAQS[activePersona];

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto h-full">
      
      {/* Left Column (60%) - Input & Generation Panel */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6 h-full pb-8">
        <h1 className="text-2xl font-bold font-heading">Generate New FAQ Widget</h1>
        
        <FeatureInputCard 
          targetUrl={targetUrl}
          onUrlChange={setTargetUrl}
          featureDescription={featureDescription}
          onDescriptionChange={setFeatureDescription}
        />
        
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
               <p className="text-sm">{isGenerating ? 'Prompting LLaMA-3 via Ollama...' : 'Loading FAQs from database...'}</p>
               {isGenerating && <p className="text-xs text-white/20">This may take a few seconds depending on your machine specs.</p>}
            </div>
          ) : ollamaError ? (
            <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4 p-6 bg-red-500/5 rounded-xl border border-red-500/20">
               <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">!</div>
               <p className="text-sm text-center text-red-400 font-medium">{ollamaError}</p>
            </div>
          ) : (
            <div className="space-y-4">
               {generatedFaqs && (
                 <div className="px-4 py-2 rounded border border-[#22C55E]/30 bg-[#22C55E]/10 text-xs text-[#22C55E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    Successfully connected to local Ollama. These FAQs are dynamically AI-generated!
                 </div>
               )}
               {currentFaqs.length > 0 ? (
                 <FaqAccordion faqs={currentFaqs} activePersona={activePersona} />
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-2 py-12">
                   <p className="text-sm">No FAQs generated yet.</p>
                   <p className="text-xs">Seed the database or generate new FAQs to see them here.</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
