import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { MOCK_DRIFT_DATA } from '../data/mockDriftData';
import { AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function DriftMonitor() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1A1B23',
        titleColor: '#F1F5F9',
        bodyColor: '#A855F7',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { display: false, color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' }, beginAtZero: true }
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6, backgroundColor: '#A855F7' }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Knowledge Drift Monitor</h1>
          <p className="text-sm text-white/50">Tracking semantic divergence between your FAQs and real-world user intent.</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F0FF]"></span>
          </span>
          <span className="text-sm font-medium">Monitoring Active</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 glass-card p-6 h-[400px] flex flex-col">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Semantic Drift Index (7 Days)</h2>
          <div className="flex-1 min-h-0">
            <Line options={chartOptions} data={MOCK_DRIFT_DATA.trendChart} />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Current Score</h2>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-[#A855F7]">12</span>
              <span className="text-sm text-[#22C55E] mb-1 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> -4%</span>
            </div>
            <p className="text-xs text-white/40 mt-1">Lower score indicates better alignment. Currently Healthy.</p>
          </div>
          
          <div className="flex-1 w-full bg-gradient-to-b from-[#1A1B23] to-transparent rounded-lg border border-white/5 p-4 flex flex-col items-center justify-center text-center">
            <WandSparklesIcon className="w-8 h-8 text-[#00F0FF] mb-3" />
            <span className="text-sm font-medium mb-1">Auto-Regeneration</span>
            <span className="text-xs text-white/50 mb-4">Automatically rewrite drifting FAQs</span>
            <button className="neon-button px-4 py-2 text-xs font-semibold rounded-md border border-[#00F0FF]/30">Enable Feature</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 flex-1">
         <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Recent Drift Events</h2>
         <div className="space-y-3">
           {MOCK_DRIFT_DATA.recentEvents.map(ev => (
             <div key={ev.id} className="flex gap-4 p-4 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
               <div className="pt-1">
                 {ev.actionNeeded ? (
                   <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                 ) : (
                   <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                 )}
               </div>
               <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                   <h3 className="font-medium text-sm text-white">{ev.title}</h3>
                   <span className="text-xs text-white/40">{ev.date}</span>
                 </div>
                 <p className="text-sm text-white/60 mb-3">{ev.description}</p>
                 {ev.actionNeeded && (
                   <button className="text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 px-3 py-1.5 rounded transition-colors">Review Suggestions</button>
                 )}
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

function WandSparklesIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
  );
}
