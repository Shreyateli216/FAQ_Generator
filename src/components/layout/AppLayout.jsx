import React from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F1F5F9] font-body selection:bg-[#00F0FF]/30">
      <TopNav />
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="pl-[280px] pt-16 min-h-screen transition-all">
        <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
