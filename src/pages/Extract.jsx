import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Cpu, Tag, Target, Layers, RefreshCw, CheckCircle2, AlertCircle, ZapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_CHUNKS = [
  {
    id: 1,
    source: 'product-docs-v3.pdf',
    text: 'Shadow Integration automatically matches your existing website\'s color palette, typography, and border-radius tokens to create a seamless FAQ widget that feels native to your design system.',
    intent: 'Feature Explanation',
    confidence: 97,
    entities: ['Shadow Integration', 'color palette', 'typography', 'FAQ widget'],
    selected: true,
  },
  {
    id: 2,
    source: 'product-docs-v3.pdf',
    text: 'FAQGenie supports multi-language output including English, Hindi, and Marathi via our edge-optimized translation layer.',
    intent: 'Product Capability',
    confidence: 94,
    entities: ['FAQGenie', 'English', 'Hindi', 'Marathi', 'translation'],
    selected: true,
  },
  {
    id: 3,
    source: 'help-center-export.docx',
    text: 'Installation takes under 2 minutes. Add a single <script> tag to your website\'s <head> section to embed the FAQ widget.',
    intent: 'How-To / Setup',
    confidence: 91,
    entities: ['installation', 'script tag', 'FAQ widget'],
    selected: true,
  },
  {
    id: 4,
    source: 'help-center-export.docx',
    text: 'Our knowledge drift monitor checks your FAQs every 24 hours against live search queries to detect semantic divergence before it impacts user satisfaction.',
    intent: 'Feature Explanation',
    confidence: 88,
    entities: ['knowledge drift', 'FAQs', 'search queries', 'semantic divergence'],
    selected: false,
  },
  {
    id: 5,
    source: 'product-docs-v3.pdf',
    text: 'Pricing starts at $0 for the Starter tier, with up to 500 generated FAQs per month and 1 active project.',
    intent: 'Pricing / Commercial',
    confidence: 82,
    entities: ['Starter tier', '500 FAQs', '1 project'],
    selected: true,
  },
];

const INTENT_COLORS = {
  'Feature Explanation': '#00F0FF',
  'Product Capability': '#A855F7',
  'How-To / Setup': '#22C55E',
  'Pricing / Commercial': '#F59E0B',
};

const STATS = [
  { label: 'Raw Chunks', value: '147', sub: 'before filtering', color: '#00F0FF' },
  { label: 'High Confidence', value: '112', sub: '≥ 80% score', color: '#22C55E' },
  { label: 'Unique Intents', value: '9', sub: 'detected topics', color: '#A855F7' },
  { label: 'Entities Found', value: '84', sub: 'named entities', color: '#F59E0B' },
];

export default function Extract() {
  const navigate = useNavigate();
  const [chunks, setChunks] = useState(MOCK_CHUNKS);
  const [filterIntent, setFilterIntent] = useState('All');
  const [minConfidence, setMinConfidence] = useState(75);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleChunk = (id) => {
    setChunks(prev => prev.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  };

  const handleReprocess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1800);
  };

  const allIntents = ['All', ...new Set(MOCK_CHUNKS.map(c => c.intent))];
  const filtered = chunks.filter(c =>
    (filterIntent === 'All' || c.intent === filterIntent) && c.confidence >= minConfidence
  );
  const selectedCount = chunks.filter(c => c.selected).length;

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#A855F7]/70 uppercase tracking-widest">Step 2 of 5</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40">NLP Extraction &amp; Intent Mapping</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Review Extracted Knowledge</h1>
          <p className="text-sm text-white/50 mt-1">Our NLP engine has parsed your documents. Select chunks to include in FAQ generation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/ingest')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/8 transition-all">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#A855F7]/20 to-[#00F0FF]/20 border border-[#A855F7]/30 text-sm font-semibold text-white hover:border-[#A855F7]/60 transition-all group">
            Next: Generate <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="glass-card p-4 flex flex-col gap-1">
            <span className="text-3xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs font-semibold text-white/70">{s.label}</span>
            <span className="text-[10px] text-white/30">{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left: Filters */}
        <div className="flex flex-col gap-4">
          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Filter Chunks</h3>

            <div className="mb-4">
              <label className="text-xs text-white/40 mb-2 block">Intent Type</label>
              <div className="space-y-1">
                {allIntents.map(intent => (
                  <button
                    key={intent}
                    onClick={() => setFilterIntent(intent)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      filterIntent === intent ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {intent !== 'All' && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: INTENT_COLORS[intent] || '#888' }} />
                      )}
                      {intent}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white/40">Min Confidence</label>
                <span className="text-xs font-bold text-[#00F0FF]">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full accent-[#00F0FF] h-1.5 rounded-full bg-white/10"
              />
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Extraction Model</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#A855F7]/5 border border-[#A855F7]/20">
              <Cpu className="w-5 h-5 text-[#A855F7] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">LLaMA-3 8B</p>
                <p className="text-[10px] text-white/40">via Groq · 180 tok/s</p>
              </div>
            </div>
            <button
              onClick={handleReprocess}
              disabled={isProcessing}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-white/60 bg-white/5 border border-white/10 hover:bg-white/8 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
              {isProcessing ? 'Reprocessing...' : 'Re-extract'}
            </button>
          </div>

          <div className="glass-card p-4 border border-[#22C55E]/20 bg-[#22C55E]/5">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span className="text-xs font-semibold text-white">{selectedCount} chunks selected</span>
            </div>
            <p className="text-[10px] text-white/40">These will be used to generate your FAQ set.</p>
          </div>
        </div>

        {/* Right: Chunk List */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>Showing {filtered.length} of {chunks.length} chunks</span>
            <div className="flex gap-2">
              <button onClick={() => setChunks(prev => prev.map(c => ({ ...c, selected: true })))} className="text-[#00F0FF] hover:underline">Select all</button>
              <span>·</span>
              <button onClick={() => setChunks(prev => prev.map(c => ({ ...c, selected: false })))} className="hover:text-white">Clear</button>
            </div>
          </div>

          {filtered.map(chunk => (
            <div
              key={chunk.id}
              onClick={() => toggleChunk(chunk.id)}
              className={`glass-card p-5 cursor-pointer transition-all group ${
                chunk.selected ? 'border-[#00F0FF]/25 bg-[#00F0FF]/3' : 'hover:border-white/12 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                  chunk.selected ? 'border-[#00F0FF] bg-[#00F0FF]' : 'border-white/20'
                }`}>
                  {chunk.selected && <CheckCircle2 className="w-3 h-3 text-[#0F1117]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{
                      color: INTENT_COLORS[chunk.intent] || '#888',
                      borderColor: `${INTENT_COLORS[chunk.intent] || '#888'}40`,
                      backgroundColor: `${INTENT_COLORS[chunk.intent] || '#888'}10`
                    }}>
                      {chunk.intent}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">{chunk.source}</span>
                    <div className="flex items-center gap-1.5 ml-auto">
                      {chunk.confidence >= 90 ? (
                        <ZapIcon className="w-3 h-3 text-[#22C55E]" />
                      ) : chunk.confidence >= 80 ? (
                        <CheckCircle2 className="w-3 h-3 text-[#00F0FF]" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-[#F59E0B]" />
                      )}
                      <span className={`text-xs font-bold ${
                        chunk.confidence >= 90 ? 'text-[#22C55E]' : chunk.confidence >= 80 ? 'text-[#00F0FF]' : 'text-[#F59E0B]'
                      }`}>{chunk.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed mb-3">{chunk.text}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-3 h-3 text-white/20 shrink-0" />
                    {chunk.entities.map(e => (
                      <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Layers className="w-4 h-4" />
          <span>{selectedCount} selected chunks → estimated ~{selectedCount * 3}–{selectedCount * 5} FAQs</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-[#0F1117] font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.25)]"
        >
          Generate FAQs <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
