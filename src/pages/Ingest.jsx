import React, { useState } from 'react';
import { UploadCloud, Link2, Globe, FileText, CheckCircle2, ChevronRight, Plus, X, Server, BookOpen, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOURCE_TILES = [
  { id: 'file', icon: UploadCloud, label: 'Upload Files', desc: 'PDF, DOCX, TXT, Markdown', color: '#00F0FF' },
  { id: 'url', icon: Globe, label: 'Scrape URL', desc: 'Any public webpage or blog', color: '#A855F7' },
  { id: 'notion', icon: BookOpen, label: 'Notion Doc', desc: 'Connect via Notion API', color: '#F59E0B' },
  { id: 'github', icon: GitBranch, label: 'GitHub README', desc: 'Public or private repos', color: '#22C55E' },
  { id: 'api', icon: Server, label: 'API / JSON', desc: 'Paste raw JSON or endpoint', color: '#EF4444' },
  { id: 'sitemap', icon: Link2, label: 'Sitemap', desc: 'Crawl entire sitemap.xml', color: '#00F0FF' },
];

const SAMPLE_FILES = [
  { name: 'product-docs-v3.pdf', size: '2.4 MB', status: 'ready' },
  { name: 'help-center-export.docx', size: '1.1 MB', status: 'ready' },
];

export default function Ingest() {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState('file');
  const [urlInput, setUrlInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(SAMPLE_FILES);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#00F0FF]/70 uppercase tracking-widest">Step 1 of 5</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40">Knowledge Ingestion</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Ingest Your Knowledge Base</h1>
          <p className="text-sm text-white/50 mt-1">Connect any document source. FAQGenie will extract signal from raw content.</p>
        </div>
        <button
          onClick={() => navigate('/extract')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF]/20 to-[#A855F7]/20 border border-[#00F0FF]/30 text-sm font-semibold text-white hover:border-[#00F0FF]/60 transition-all group"
        >
          Next: Extract
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Source Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SOURCE_TILES.map(src => (
          <button
            key={src.id}
            onClick={() => setActiveSource(src.id)}
            className={`glass-card p-4 flex flex-col items-center text-center gap-2 transition-all group ${
              activeSource === src.id ? 'border-[#00F0FF]/40 bg-[#00F0FF]/5' : 'hover:border-white/15'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              activeSource === src.id ? 'bg-[#00F0FF]/15' : 'bg-white/5 group-hover:bg-white/8'
            }`}
              style={{ boxShadow: activeSource === src.id ? `0 0 15px ${src.color}30` : 'none' }}
            >
              <src.icon className="w-5 h-5" style={{ color: activeSource === src.id ? src.color : 'rgba(255,255,255,0.4)' }} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${activeSource === src.id ? 'text-white' : 'text-white/60'}`}>{src.label}</p>
              <p className="text-[10px] text-white/30 leading-tight mt-0.5">{src.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload Area */}
        <div className="flex flex-col gap-4">
          {activeSource === 'file' ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              className={`glass-card p-8 flex flex-col items-center justify-center gap-4 text-center cursor-pointer border-dashed transition-all min-h-[200px] ${
                isDragging ? 'border-[#00F0FF]/60 bg-[#00F0FF]/5' : 'hover:border-white/20'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                isDragging ? 'bg-[#00F0FF]/20' : 'bg-white/5'
              }`}>
                <UploadCloud className={`w-8 h-8 transition-colors ${isDragging ? 'text-[#00F0FF]' : 'text-white/30'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Drag & drop files here</p>
                <p className="text-xs text-white/40 mt-1">Supports PDF, DOCX, TXT, MD — up to 50MB each</p>
              </div>
              <label className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/70 hover:bg-white/10 cursor-pointer transition-colors">
                Browse Files
                <input type="file" className="hidden" multiple accept=".pdf,.docx,.txt,.md" />
              </label>
            </div>
          ) : (
            <div className="glass-card p-6 flex flex-col gap-4 min-h-[200px]">
              <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#A855F7]" />
                {activeSource === 'url' ? 'Webpage URL' : activeSource === 'notion' ? 'Notion Page URL' : 'Source URL or Endpoint'}
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={
                    activeSource === 'github' ? 'https://github.com/user/repo/blob/main/README.md'
                    : activeSource === 'sitemap' ? 'https://yoursite.com/sitemap.xml'
                    : 'https://docs.example.com/help'
                  }
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00F0FF]/50"
                />
                <button className="px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-sm font-semibold rounded-lg hover:bg-[#00F0FF]/20 transition-colors">
                  Add
                </button>
              </div>
              {activeSource === 'api' && (
                <textarea
                  rows={4}
                  placeholder={'{\n  "key": "value"\n}'}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/70 font-mono placeholder-white/20 focus:outline-none focus:border-[#00F0FF]/50 resize-none"
                />
              )}
            </div>
          )}

          {/* Config Options */}
          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Ingestion Config</h3>
            <div className="space-y-3">
              {[
                { label: 'Chunking Strategy', options: ['Semantic (Recommended)', 'Fixed token', 'Paragraph'], default: 0 },
                { label: 'Language Detection', options: ['Auto-detect', 'English', 'Hindi', 'Marathi'], default: 0 },
              ].map(cfg => (
                <div key={cfg.label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-white/60">{cfg.label}</span>
                  <select className="bg-black/30 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50">
                    {cfg.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Strip boilerplate (headers, footers)</span>
                <button className="w-10 h-5 bg-[#00F0FF]/40 rounded-full relative border border-[#00F0FF]/30">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-[#00F0FF] rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ingested Files Queue */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/70">Source Queue</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
              {uploadedFiles.length} sources
            </span>
          </div>

          {uploadedFiles.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/20 gap-2">
              <FileText className="w-10 h-10" />
              <p className="text-sm">No sources added yet</p>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {uploadedFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-black/20 border border-white/5 group hover:border-white/10 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{f.name}</p>
                    <p className="text-xs text-white/40">{f.size}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-white/20 hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => setUploadedFiles(prev => [...prev, { name: 'new-source.pdf', size: '3.2 MB', status: 'ready' }])}
                className="w-full mt-2 p-3 rounded-lg border border-dashed border-white/10 hover:border-[#00F0FF]/30 text-xs text-white/30 hover:text-[#00F0FF] flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-3 h-3" /> Add another source
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span>Total content size</span>
              <span className="text-white/70 font-medium">3.5 MB</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-1/12 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] rounded-full" />
            </div>
            <p className="text-[10px] text-white/30 mt-1">of 512 MB limit</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between py-2">
        <p className="text-xs text-white/30 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
          All uploads encrypted in transit via TLS 1.3
        </p>
        <button
          onClick={() => navigate('/extract')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#0F1117] font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          Proceed to Extract <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
