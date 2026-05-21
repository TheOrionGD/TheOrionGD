import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
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
    const sections = ['about', 'experience', 'skills', 'projects', 'gallery', 'certifications', 'contact'];
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
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[45]"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark border-b py-4 shadow-xl shadow-black/50'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          {/* Left placeholder for flex alignment */}
          <div className="w-10"></div>

          {/* Centered Brand Text transitioning from Loader */}
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
              className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest hover:scale-105 transition-transform"
            >
              OrionGD
            </motion.h1>
          </a>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-xl glass border border-accent/20 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(252,58,69,0.3)] focus:outline-none z-[60]"
            aria-label="Toggle menu"
          >
            <motion.span
              variants={topVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 bg-white rounded-full origin-center"
            ></motion.span>
            <motion.span
              variants={middleVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 bg-white rounded-full"
            ></motion.span>
            <motion.span
              variants={bottomVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-5 h-0.5 bg-white rounded-full origin-center"
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
            className="fixed top-0 right-0 h-screen w-80 max-w-[80vw] glass-dark border-l shadow-2xl z-50 flex flex-col px-8 py-24 overflow-y-auto"
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
                      isActive ? 'text-accent' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </motion.a>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full h-px bg-border/30 my-4"
              ></motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-accent/10 border border-accent/40 text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-accent hover:shadow-[0_0_20px_rgba(252,58,69,0.4)] transition-all"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Logic */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full glass border border-accent/40 flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all shadow-xl shadow-accent/20"
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