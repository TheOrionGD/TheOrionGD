import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Home from './components/Home';
import FullGallery from './components/FullGallery';
import FullCertificates from './components/FullCertificates';
import NeonGridBackground from './components/NeonGridBackground';
import Loader from './components/Loader';
import { useThemeManager } from './hooks/useThemeManager';

function App() {
  // 1. Dynamic Meta & Theme Color Manager
  useThemeManager();
  
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {/* Fixed neon grid + mouse tail — renders on every page */}
      <NeonGridBackground />
      
      <LayoutGroup>
        <AnimatePresence>
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/certificates" element={<FullCertificates />} />
          </Routes>
        )}
      </LayoutGroup>
    </Router>
  );
}

export default App;