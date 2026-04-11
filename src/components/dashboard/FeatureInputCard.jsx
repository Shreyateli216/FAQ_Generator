import React from 'react';
import { Globe, ScanLine } from 'lucide-react';

export default function FeatureInputCard({ 
  targetUrl, 
  onUrlChange, 
  featureDescription, 
  onDescriptionChange 
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-5">
      
      {/* Website URL Input */}
      <div>
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Target Website URL</label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="https://example.com/pricing"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
              value={targetUrl}
              onChange={(e) => onUrlChange(e.target.value)}
            />
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2">
             <ScanLine className="w-4 h-4 text-[#A855F7]" />
             Scrape CSS
          </button>
        </div>
      </div>

      {/* Feature Description */}
      <div>
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Describe Your Feature</label>
        <textarea 
          rows={5}
          className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A855F7]/50 transition-colors resize-none"
          placeholder="Explain what the feature does, who it's for, and key limitations..."
          value={featureDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

    </div>
  );
}
