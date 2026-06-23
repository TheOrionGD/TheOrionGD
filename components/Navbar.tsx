import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'AI Innovations', href: '#ai-innovations' },
    { name: 'Immersive Systems', href: '#immersive-systems' },
    { name: 'Experience', href: '#experience' },
    { name: 'Competitions', href: '#hackathons' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Academics', href: '#academic-milestones' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'skills', 'ai-innovations', 'immersive-systems', 'experience', 'hackathons', 'leadership', 'academic-milestones', 'certifications', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Hamburger animation variants
  const topVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 9 },
  };

  const middleVariants: Variants = {
    closed: { opacity: 1, translateX: 0 },
    opened: { opacity: 0, translateX: 20 },
  };

  const bottomVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -9 },
  };

  // Sidebar animations
  const sidebarVariants: Variants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    opened: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      {/* Backdrop for Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[45]"
            style={{ background: 'rgba(15,23,42,0.25)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
        style={scrolled ? {
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99,102,241,0.12)',
          boxShadow: '0 4px 20px rgba(99,102,241,0.08)'
        } : {}}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          {/* Left placeholder for flex alignment */}
          <div className="w-10"></div>

          {/* Centered Brand Text */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <motion.h1
              layoutId="brandText"
              className="text-2xl md:text-3xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              style={{ color: '#4f46e5' }}
            >
              OrionGD
            </motion.h1>
          </a>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-xl transition-all focus:outline-none z-[60]"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.20)'
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              variants={topVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 rounded-full origin-center"
              style={{ background: '#4f46e5' }}
            ></motion.span>
            <motion.span
              variants={middleVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 rounded-full"
              style={{ background: '#4f46e5' }}
            ></motion.span>
            <motion.span
              variants={bottomVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 rounded-full origin-center"
              style={{ background: '#4f46e5' }}
            ></motion.span>
          </button>
        </div>
      </motion.nav>

      {/* Auto-Hide Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed top-0 right-0 h-screen w-80 max-w-[80vw] z-50 flex flex-col px-8 py-24 overflow-y-auto"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(99,102,241,0.12)',
              boxShadow: '-8px 0 32px rgba(99,102,241,0.10)'
            }}
          >
            <div className="flex flex-col gap-8 items-start">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-medium transition-all uppercase tracking-[0.15em] relative group ${
                      isActive ? '' : ''
                    }`}
                    style={{ color: isActive ? '#4f46e5' : '#334155' }}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-px transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      style={{ background: '#4f46e5' }}
                    ></span>
                  </motion.a>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full h-px my-4"
                style={{ background: 'rgba(99,102,241,0.15)' }}
              ></motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all text-white"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.3)'
                }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              color: 'white'
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;