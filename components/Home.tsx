import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Gallery from './Gallery';
import CodingProfiles from './CodingProfiles';
import Certifications from './Certifications';
import Contact from './Contact';
import Background3D from './Background3D';

const Home: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent transition-colors duration-300 relative">
      <Background3D />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Gallery />
        <CodingProfiles />
        <Certifications />
      </main>
      <Contact />
    </div>
  );
};

export default Home;