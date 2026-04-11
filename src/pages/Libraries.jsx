import React, { useState, useEffect } from 'react';
import { Folder, Search, MoreVertical, Globe, Trash2 } from 'lucide-react';
import projectsApi from '../api/projectsApi';

export default function Libraries() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getAll();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/30">
          <Folder className="w-12 h-12 mb-3" />
          <p className="text-sm">{searchTerm ? 'No projects match your search' : 'No projects yet. Seed the database to get started!'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div key={proj._id} className="glass-card p-5 group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${proj.thumbnail} flex items-center justify-center shadow-lg`}>
                     <Folder className="w-5 h-5 text-white/90" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">{proj.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${proj.status === 'Active' ? 'bg-[#22C55E]' : proj.status === 'Draft' ? 'bg-[#F59E0B]' : 'bg-white/30'}`}></span>
                      <span className="text-xs text-white/50">{proj.status}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(proj._id)} className="text-white/20 hover:text-red-400 p-1 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
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
                <span>Updated {getTimeAgo(proj.updatedAt)}</span>
                <div className="flex items-center gap-1 hover:text-[#A855F7] cursor-pointer transition-colors">
                  <Globe className="w-3 h-3" />
                  <span>Live Widget</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
