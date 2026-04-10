import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FullGallery from './components/FullGallery';
import { useThemeManager } from './hooks/useThemeManager';

function App() {
  // 1. Dynamic Meta & Theme Color Manager
  useThemeManager();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<FullGallery />} />
      </Routes>
    </Router>
  );
}

export default App;