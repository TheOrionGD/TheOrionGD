import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaArrowRight, FaFileAlt, FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ALL_SECTIONS = [
  { id: 'home', num: '01', label: 'Hero' },
  { id: 'journey', num: '02', label: 'Timeline' },
  { id: 'skills', num: '03', label: 'Arsenal' },
  { id: 'coding-hub', num: '03b', label: 'Coding' },
  { id: 'projects', num: '04', label: 'Works' },
  { id: 'certifications', num: '05', label: 'Proof' },
  { id: 'gallery', num: '06', label: 'Field Log' },
  { id: 'experience', num: '07', label: 'Experience' },
  { id: 'academic-milestones', num: '07b', label: 'Academics' },
  { id: 'contact', num: '08', label: 'Signal' },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const sections = ['home', 'journey', 'skills', 'coding-hub', 'projects', 'certifications', 'gallery', 'experience', 'academic-milestones', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }

      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && !mobileMenuOpen) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const desktopNavItems = [
    { label: 'Arsenal', target: 'skills', hasArrow: true },
    { label: 'Works', target: 'projects', hasArrow: false },
    { label: 'Experience', target: 'experience', hasArrow: false },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-0 transition-transform duration-300 ease-in-out"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        {/* Floating Trapezoid Bar */}
        <div
          className="w-full max-w-4xl h-14 bg-[#EDEDED]/90 backdrop-blur-md text-black border border-[#D3D3D3]/70 flex items-center justify-between px-4 sm:px-12 pointer-events-auto select-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          style={{
            clipPath: isMobile
              ? 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 10px 100%)'
              : 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 24px 100%)'
          }}
        >
          {/* Left Side: Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="font-space-grotesk text-xs sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.2em] text-black hover:opacity-70 transition-opacity uppercase shrink-0"
          >
            TheOrionGD
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-[13px] font-medium uppercase tracking-[0.08em]">
            {desktopNavItems.map((item) => {
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

          {/* Right Side: CTA Button + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleNavClick(e, 'contact')}
              className="inline-flex items-center bg-black/80 backdrop-blur-md hover:bg-[#B87333] text-white transition-all duration-300 font-space-grotesk text-[11px] sm:text-xs font-bold tracking-[0.02em] py-1.5 sm:py-2 px-3 sm:px-4 uppercase cursor-pointer border border-white/20 shadow-md shrink-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'
              }}
            >
              <span className="text-[#B87333] mr-1.5 text-[8px]">▪</span>
              Hire ME
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-lg bg-black/5 hover:bg-black/10 active:scale-95 flex items-center justify-center text-black border border-black/10 cursor-pointer transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes size={13} /> : <FaBars size={13} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full bg-[#EDEDED] border-b border-[#D3D3D3] shadow-2xl pt-18 pb-6 px-6 max-h-[85vh] overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D3D3D3]/70">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/60">
                    NAVIGATION INDEX // THEORIONGD
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 text-black">
                    {activeSection.toUpperCase()}
                  </span>
                </div>

                {/* Section Links */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {ALL_SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={(e) => handleNavClick(e, sec.id)}
                        className={`text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white/60 hover:bg-white text-black border-black/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] font-bold ${isActive ? 'text-[#B87333]' : 'text-black/50'}`}>
                            {sec.num}
                          </span>
                          <span className="font-space-grotesk text-xs font-bold uppercase">
                            {sec.label}
                          </span>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Route Links & Action Bar */}
              <div className="pt-4 border-t border-[#D3D3D3]/70 space-y-2">
                <Link
                  to="/certificates"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D3D3D3] flex items-center justify-between font-space-grotesk text-xs font-bold text-black uppercase tracking-wider shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <FaCertificate className="text-[#B87333] text-sm" />
                    <span>Proof Vault // All Certificates</span>
                  </div>
                  <FaArrowRight className="text-black/40 text-xs" />
                </Link>

                <a
                  href="/assets/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D3D3D3] flex items-center justify-between font-space-grotesk text-xs font-bold text-black uppercase tracking-wider shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-black/60 text-sm" />
                    <span>Resume // Case File</span>
                  </div>
                  <FaArrowRight className="text-black/40 text-xs" />
                </a>

                <button
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="w-full py-3 rounded-xl bg-[#0A0A08] text-white flex items-center justify-center gap-2 font-space-grotesk text-xs font-bold uppercase tracking-wider shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                  <span className="text-[#B87333]">▪</span>
                  <span>Connect / Hire Me</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

