import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import Login from './pages/Login';
import Register from './pages/Register';

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00F0FF]/30 border-t-[#00F0FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/*" element={
        <ProtectedRoute>
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
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
