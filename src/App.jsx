import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Libraries from './pages/Libraries';
import DriftMonitor from './pages/DriftMonitor';
import SeoReports from './pages/SeoReports';
import Settings from './pages/Settings';
import Ingest from './pages/Ingest';
import Extract from './pages/Extract';
import Preview from './pages/Preview';
import Export from './pages/Export';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/ingest" element={<Ingest />} />
        <Route path="/extract" element={<Extract />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/export" element={<Export />} />
        
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/drift" element={<DriftMonitor />} />
        <Route path="/seo" element={<SeoReports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
