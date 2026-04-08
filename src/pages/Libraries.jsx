import React from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import { Folder, Search, MoreVertical, Globe } from 'lucide-react';

export default function Libraries() {
  return (
    <div className="max-w-[1200px] mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">My FAQ Libraries</h1>
          <p className="text-sm text-white/50">Manage your generated FAQ projects and shadow widgets.</p>
        </div>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map(proj => (
          <div key={proj.id} className="glass-card p-5 group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${proj.thumbnail} flex items-center justify-center shadow-lg`}>
                   <Folder className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">{proj.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-xs text-white/50">{proj.status}</span>
                  </div>
                </div>
              </div>
              <button className="text-white/40 hover:text-white p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 py-4 border-y border-white/5 my-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading text-white">{proj.faqsCount}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Total FAQs</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading text-white">{proj.seoScore}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">SEO Score</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/40">
              <span>Updated {proj.date}</span>
              <div className="flex items-center gap-1 hover:text-[#A855F7] cursor-pointer transition-colors">
                <Globe className="w-3 h-3" />
                <span>Live Widget</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
