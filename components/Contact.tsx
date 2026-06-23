import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';

/**
 * Magnetic element component for premium interactivity
 * Automatically disables on mobile for better UX
 */
const MagneticElement: FC<{ children: React.ReactNode; strength?: number }> = ({ children, strength = 0.4 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const Contact: FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "fc881cfb-436b-4b5b-a54f-9a135b7b07a2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer id="contact" className="relative pt-8 md:pt-10 pb-6 overflow-hidden" style={{ borderTop: '1px solid rgba(99,102,241,0.12)' }}>
      {/* Background Decorative Element removed */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-8 items-center"
        >
          {/* Left: Interactive Info */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', color: '#4f46e5' }}>
                Let&apos;s Connect
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase" style={{ color: '#0f172a' }}>
                Ready to <span className="text-gradient">Collab?</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm md:text-base mb-6 max-w-md leading-relaxed" style={{ color: '#64748b' }}>
                Whether you have a specific project in mind or just want to explore possibilities, I&apos;m always open to new adventures and technical challenges.
              </motion.p>
            </div>

            <div className="space-y-3">
              {/* Email Card */}
              <motion.div variants={itemVariants}>
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-[1.25rem] cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(99,102,241,0.10)', boxShadow: '0 2px 8px rgba(99,102,241,0.06)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.10)'}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base group-hover:scale-110 transition-all duration-500 flex-shrink-0" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#4f46e5' }}>
                    <FaEnvelope />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#94a3b8' }}>Direct Outreach</p>
                    <p className="font-black text-xs sm:text-sm tracking-tight truncate" style={{ color: '#0f172a' }}>{PERSONAL_INFO.email}</p>
                  </div>
                  <div className="ml-auto pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedType === 'email' ? <FaCheck className="animate-bounce" style={{ color: '#4f46e5' }} /> : <FaCopy style={{ color: '#94a3b8' }} />}
                  </div>

                  {/* Subtle Copied Toast */}
                  {copiedType === 'email' && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute right-4 bottom-2 text-[10px] font-black uppercase tracking-tighter" style={{ color: '#4f46e5' }}>Copied!</motion.div>
                  )}
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div variants={itemVariants}>
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-[1.25rem] cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(99,102,241,0.10)', boxShadow: '0 2px 8px rgba(99,102,241,0.06)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.10)'}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base group-hover:scale-110 transition-all duration-500 flex-shrink-0" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#4f46e5' }}>
                    <FaPhone />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#94a3b8' }}>Quick Call</p>
                    <p className="font-black text-xs sm:text-sm tracking-tight" style={{ color: '#0f172a' }}>{PERSONAL_INFO.phone}</p>
                  </div>
                  <div className="ml-auto pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedType === 'phone' ? <FaCheck className="animate-bounce" style={{ color: '#4f46e5' }} /> : <FaCopy style={{ color: '#94a3b8' }} />}
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="flex items-center gap-3.5 p-3 sm:p-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.10)', color: '#94a3b8' }}>
                  <FaMapMarkerAlt />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#94a3b8' }}>Based In</p>
                  <p className="font-black text-xs sm:text-sm tracking-tight uppercase truncate" style={{ color: '#64748b' }}>{PERSONAL_INFO.location}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Modern Contact Form */}
          <motion.div variants={itemVariants} className="relative">
            <div className="p-4 sm:p-5 md:p-6 rounded-[1.5rem] relative overflow-hidden group"
              style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(99,102,241,0.12)', boxShadow: '0 6px 24px rgba(99,102,241,0.08)', backdropFilter: 'blur(20px)' }}>
              <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.03), transparent, rgba(124,58,237,0.03))' }} />

              <form className="relative z-10 space-y-3.5 md:space-y-4" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="New Portfolio Message" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest ml-1" style={{ color: '#94a3b8' }}>Identity</label>
                    <input name="name" type="text" placeholder="Full Name" required className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none transition-all font-bold uppercase text-xs" style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(99,102,241,0.15)', color: '#0f172a' }} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.10)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest ml-1" style={{ color: '#94a3b8' }}>E-Mail</label>
                    <input name="email" type="email" placeholder="example@domain.com" required className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none transition-all font-bold uppercase text-xs" style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(99,102,241,0.15)', color: '#0f172a' }} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.10)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1" style={{ color: '#94a3b8' }}>Your Vision</label>
                  <textarea name="message" rows={3} placeholder="Describe your project or ideas..." required className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none transition-all resize-none font-bold uppercase text-xs" style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(99,102,241,0.15)', color: '#0f172a' }} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.10)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`group relative w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.4em] transition-all overflow-hidden ${isSubmitting ? 'cursor-wait' : 'hover:scale-[1.02]'}`}
                  style={{ background: isSubmitting ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}
                >
                  <motion.div
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/10 opacity-0 transition-opacity rounded-2xl pointer-events-none"
                  />

                  <span className="relative flex items-center justify-center gap-4 text-white">
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                    <FaPaperPlane className={`text-sm ${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700'}`} />
                  </span>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[10px] font-black text-green-500 tracking-widest uppercase mt-4">
                    Message Received. Expect a response soon.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[10px] font-black text-accent tracking-widest uppercase mt-4">
                    Connection Error. Please retry later.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Magnetic Socials Section */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 px-4 md:px-0">
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderTop: '1px solid rgba(99,102,241,0.10)' }}>
          {/* Magnetic Socials Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
            {SOCIAL_LINKS.map((social, index) => (
              <MagneticElement key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(99,102,241,0.12)', color: '#64748b' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(99,102,241,0.45)'; el.style.color = '#4f46e5'; el.style.boxShadow = '0 4px 12px rgba(99,102,241,0.15)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(99,102,241,0.12)'; el.style.color = '#64748b'; el.style.boxShadow = 'none'; }}
                  title={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </MagneticElement>
            ))}
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-center md:text-right" style={{ color: '#94a3b8' }}>
            &copy; {new Date().getFullYear()} <span style={{ color: '#334155' }}>Godfrey T R</span>. Built with curiosity and consistency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;