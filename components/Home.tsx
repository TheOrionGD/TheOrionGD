import React, { useState, useEffect } from 'react';
import Hero from './Hero'; // 01. Entry Frame
import HorizontalJourney from './HorizontalJourney'; // 02b. Timeline
import Skills from './Skills'; // 03. Arsenal
import CodingProfiles from './CodingProfiles'; // 03b. Coding Ecosystem
import Projects from './Projects'; // 04. Works
import Certifications from './Certifications'; // 05. Proof
import Hackathons from './Hackathons'; // 06. Field Log
import Experience from './Experience'; // 07. Experience Log
import Academics from './Academics'; // 07b. Academic Milestones
import Contact from './Contact'; // 08. Signal
import ChatbotWidget from './ChatbotWidget';
import { BackgroundVideo } from './BackgroundVideo';
import { SideNav } from './SideNav';
import { CursorGlow } from './CursorGlow';
import { Header } from './Header';

const Home: React.FC = () => {
  // Keep video hidden until after the loader exit animation has fully completed.
  // Loader fades out over 500ms; we wait 600ms before revealing the video.
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent bg-transparent">
      <Header />
      <BackgroundVideo hidden={!videoReady} />
      <CursorGlow />
      <SideNav />
      <div className="relative z-10">
        <main>
          <Hero />
          <HorizontalJourney />
          <Skills />
          <CodingProfiles />
          <Projects />
          <Certifications />
          <Hackathons />
          <Experience />
          <Academics />
        </main>
        <Contact />
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default Home;
