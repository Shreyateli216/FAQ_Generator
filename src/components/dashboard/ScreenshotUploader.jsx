import React from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ScreenshotUploader() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">UI Context (Optional)</label>
        <span className="text-[10px] bg-black/30 border border-white/10 px-2 py-0.5 rounded text-white/50">LLaVA Vision Extraction</span>
      </div>
      
      <div className="border-2 border-dashed border-white/10 hover:border-[#00F0FF]/40 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer bg-black/10 group">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
           <UploadCloud className="w-6 h-6 text-[#00F0FF]" />
        </div>
        <p className="text-sm font-medium text-white mb-1">Drag & drop screenshots</p>
        <p className="text-xs text-white/40 mb-4">PNG, JPG, WebP up to 5MB</p>
        
        {/* Mock Uploaded Thumbnails */}
        <div className="flex gap-3">
           <div className="relative w-16 h-12 rounded bg-[#1A1B23] border border-white/10 overflow-hidden group/img">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
              <ImageIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#22C55E]"></div>
           </div>
           <div className="relative w-16 h-12 rounded bg-[#1A1B23] border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-pink-500/20"></div>
              <ImageIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#22C55E]"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
