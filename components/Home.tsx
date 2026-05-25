import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero'; // 01. Hero / Introduction
import About from './About'; // 02. The Narrative (About Me)
import Skills from './Skills'; // 03. Technical Arsenal (Skills)
import CodingProfiles from './CodingProfiles'; // 03b. Coding Ecosystem
import AIProjects from './AIProjects'; // 04. Featured AI Innovations
import ImmersiveSystems from './ImmersiveSystems'; // 05. Immersive System Building Experiences
import ScalableSystems from './ScalableSystems'; // 06. Full-Stack & Scalable Systems
import Experience from './Experience'; // 07. Professional Experience (Internships)
import Hackathons from './Hackathons'; // 08. Hackathons & Competitions (includes Marquee Gallery)
import Leadership from './Leadership'; // 09. Leadership & Community Impact
import Academics from './Academics'; // 10. Academic Milestones
import Certifications from './Certifications'; // 11. Certifications & Mastery
import Contact from './Contact'; // 12. Connect & Footer

const Home: React.FC = () => {
  return (
    <div className="relative z-10 min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <CodingProfiles />
        <AIProjects />
        <ImmersiveSystems />
        <ScalableSystems />
        <Experience />
        <Hackathons />
        <Leadership />
        <Academics />
        <Certifications />
      </main>
      <Contact />
    </div>
  );
};

export default Home;