import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'experience', 'academic-milestones', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }

      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Arsenal', target: 'skills', hasArrow: true },
    { label: 'Works', target: 'projects', hasArrow: false },
    { label: 'Experience', target: 'experience', hasArrow: false },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-0 transition-transform duration-300 ease-in-out"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)'
      }}
    >
      {/* Floating Trapezoid Bar */}
      <div
        className="w-full max-w-4xl h-14 bg-[#EDEDED]/80 backdrop-blur-md text-black border border-[#D3D3D3]/60 flex items-center justify-between px-6 sm:px-12 pointer-events-auto select-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        style={{
          clipPath: isMobile
            ? 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 12px 100%)'
            : 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 24px 100%)'
        }}
      >
        {/* Left Side: Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-space-grotesk text-sm font-bold tracking-[0.2em] text-black hover:opacity-70 transition-opacity uppercase"
        >
          TheOrionGD
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-[13px] font-medium uppercase tracking-[0.08em]">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`transition-colors duration-300 flex items-center gap-1.5 ${isActive
                  ? 'text-black font-semibold'
                  : 'text-black/60 hover:text-black'
                  }`}
              >
                {item.hasArrow && (
                  <span className="text-black text-xs font-sans">↘</span>
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side: CTA Button with Cut corner */}
        <div>
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="inline-flex items-center bg-black/80 backdrop-blur-md hover:bg-[#B87333] text-white transition-all duration-300 font-space-grotesk text-xs font-bold tracking-[0.02em] py-2 px-4 uppercase cursor-pointer border border-white/20 shadow-md"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'
            }}
          >
            <span className="text-[#B87333] mr-2 text-[8px]">▪</span>
            Hire ME
          </button>
        </div>

      </div>
    </header>
  );
};
