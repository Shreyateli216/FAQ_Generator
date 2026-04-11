import React, { useState, useEffect } from 'react';
import { Plus, LayoutDashboard, Library, Activity, BarChart, Server, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import projectsApi from '../../api/projectsApi';

export default function Sidebar() {
  const location = useLocation();
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        if (data.success) {
          setRecentProjects(data.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Library, label: 'FAQ Libraries', path: '/libraries' },
    { icon: Activity, label: 'Knowledge Drift', path: '/drift' },
    { icon: BarChart, label: 'SEO Reports', path: '/seo' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[280px] bg-[#0F1117]/50 backdrop-blur-xl border-r border-white/5 flex flex-col pt-6 overflow-y-auto">
      
      {/* New Project CTA */}
      <div className="px-6 mb-8">
        <button className="neon-button w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-white/5 border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,240,255,0.2)] hover:border-[#00F0FF]/40 text-sm font-semibold group transition-all">
          <Plus className="w-4 h-4 text-[#00F0FF] group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-white">New Project</span>
        </button>
      </div>

      {/* Main Nav */}
      <div className="px-3 mb-8 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-white/10 text-white relative after:absolute after:left-0 after:top-1.5 after:bottom-1.5 after:w-1 after:bg-[#00F0FF] after:rounded-r-full' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-[#00F0FF]' : 'text-white/40'}`} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="px-6 mb-4">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Recent Projects</h3>
        <div className="space-y-3">
          {recentProjects.length > 0 ? (
            recentProjects.map(proj => (
              <div key={proj._id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-2 h-2 rounded-full ${proj.thumbnail}`}></div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors truncate">{proj.name}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-white/30">No projects yet</p>
          )}
        </div>
      </div>

      <div className="mt-auto px-6 pb-6">
        {/* Settings Links */}
        <div className="space-y-1 mb-6 border-t border-white/5 pt-4">
           <Link to="/settings" className="flex items-center gap-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
              <Settings className="w-4 h-4 text-white/40" /> Settings
           </Link>
        </div>

        {/* Seamless Failover indicator */}
        <div className="glass-panel rounded-lg p-3 flex items-start gap-3 border border-[#A855F7]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#A855F7] opacity-10 blur-xl"></div>
          <div className="w-8 h-8 rounded shrink-0 bg-[#A855F7]/10 flex items-center justify-center border border-[#A855F7]/30 text-[#A855F7]">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white/90">Seamless Failover</h4>
            <p className="text-[10px] text-white/50 mt-0.5 leading-tight">Groq → Ollama active.</p>
          </div>
        </div>
      </div>

    </aside>
  );
}
