import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Home from './components/Home';
import FullCertificates from './components/FullCertificates';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Loader from './components/Loader';
import { useThemeManager } from './hooks/useThemeManager';

function App() {
  // 1. Dynamic Meta & Theme Color Manager
  useThemeManager();

  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <LayoutGroup>
        <AnimatePresence>
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<FullCertificates />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        )}
      </LayoutGroup>
    </Router>
  );
}

export default App;