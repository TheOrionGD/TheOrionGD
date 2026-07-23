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
    <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 font-mono text-[10px] select-none">
      <div className="flex flex-col gap-4 relative py-6 items-start">
        {/* Continuous vertical line passing through circular nodes */}
        <div className="absolute left-[6.5px] top-0 bottom-0 w-[1.5px] bg-white/80 border-r border-slate-300/40 shadow-xs" />

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="group flex items-center gap-3.5 text-left cursor-pointer py-0.5 relative z-10 focus:outline-none"
            >
              {/* Circular Node Indicator (Matches exact circular design) */}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'border-2 border-[#F97316] bg-white shadow-[0_0_10px_rgba(249,115,22,0.85)] scale-110'
                    : 'border-[1.5px] border-white/90 bg-slate-100/30 group-hover:border-slate-400 group-hover:scale-105'
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                )}
              </div>

              {/* Section number & label tag */}
              <span
                className={`transition-all duration-300 font-mono font-bold uppercase tracking-wider text-[10px] whitespace-nowrap ${
                  isActive
                    ? 'text-black opacity-100 translate-x-0'
                    : 'text-black/50 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {sec.num} {"//"} {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
