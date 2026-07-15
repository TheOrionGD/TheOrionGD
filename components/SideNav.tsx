import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'home', num: '01', label: 'HERO' },
  { id: 'skills', num: '02', label: 'ARSENAL' },
  { id: 'projects', num: '03', label: 'WORKS' },
  { id: 'certifications', num: '04', label: 'PROOF' },
  { id: 'gallery', num: '05', label: 'FIELD LOG' },
  { id: 'experience', num: '06', label: 'EXPERIENCE' },
  { id: 'academic-milestones', num: '07', label: 'ACADEMICS' },
  { id: 'contact', num: '08', label: 'SIGNAL' },
];

export const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let maxRatio = 0;
      let activeId = 'home';
      
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculate visible area overlap inside the viewport
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const ratio = visibleHeight / viewportHeight;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = sec.id;
          }
        }
      });
      setActiveSection(activeId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially to sync
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 font-mono text-[10px] select-none">
      <div className="flex flex-col gap-3.5 relative py-4 items-end">
        {/* Vertical tracking line */}
        <div className="absolute right-[3px] top-0 bottom-0 w-[1px] bg-[#2E2E2E]/10" />

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="group flex items-center gap-4 text-right cursor-pointer py-1 relative z-10 focus:outline-none"
            >
              {/* Text label revealed on hover */}
              <span 
                className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 font-bold uppercase tracking-widest text-[9px] ${
                  isActive ? 'text-black opacity-100!' : 'text-black/60 hover:text-black'
                }`}
              >
                {sec.num} {"//"} {sec.label}
              </span>

              {/* Indicator Dot/Bar */}
              <div 
                className={`w-1.5 h-6 transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'bg-[#B87333] w-2.5 scale-y-110 shadow-[0_0_8px_rgba(184,115,51,0.6)]' 
                    : 'bg-[#2E2E2E]/30 group-hover:bg-[#2E2E2E]/70'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
