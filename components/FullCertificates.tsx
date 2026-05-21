import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATE_ARCHIVE } from '../constants';
import {
  FaArrowLeft, FaEye, FaTimes, FaSearch, FaFilter,
  FaFileAlt, FaDownload, FaImage, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';

// ── Colour maps ──────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Core Professional':   'from-yellow-500/20 to-amber-600/10 border-yellow-500/30 text-yellow-400',
  'AI & Generative AI':  'from-purple-500/20 to-violet-600/10 border-purple-500/30 text-purple-400',
  'Microsoft':           'from-blue-500/20 to-cyan-600/10 border-blue-500/30 text-blue-400',
  'Internship':          'from-green-500/20 to-emerald-600/10 border-green-500/30 text-green-400',
  'Design & Development':'from-pink-500/20 to-rose-600/10 border-pink-500/30 text-pink-400',
  'Great Learning':      'from-orange-500/20 to-amber-600/10 border-orange-500/30 text-orange-400',
  'Technical Skills':    'from-red-500/20 to-rose-600/10 border-red-500/30 text-red-400',
  'Academic (NPTEL)':    'from-teal-500/20 to-cyan-600/10 border-teal-500/30 text-teal-400',
  'Workshops':           'from-indigo-500/20 to-blue-600/10 border-indigo-500/30 text-indigo-400',
  'Learnathon':          'from-fuchsia-500/20 to-purple-600/10 border-fuchsia-500/30 text-fuchsia-400',
  'Awards & Events':     'from-yellow-400/20 to-orange-600/10 border-yellow-400/30 text-yellow-300',
  'NSS & Civic':         'from-lime-500/20 to-green-600/10 border-lime-500/30 text-lime-400',
  'Patent':              'from-sky-500/20 to-blue-600/10 border-sky-500/30 text-sky-400',
  'Academic':            'from-violet-500/20 to-purple-600/10 border-violet-500/30 text-violet-400',
};

const TAG_COLORS: Record<string, string> = {
  'Top Credential': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  'Specialization': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'Verified':       'bg-green-500/20 text-green-300 border-green-500/40',
  'Winner':         'bg-red-500/20 text-red-300 border-red-500/40',
  'Hackathon':      'bg-orange-500/20 text-orange-300 border-orange-500/40',
  'Innovation':     'bg-sky-500/20 text-sky-300 border-sky-500/40',
  'Full Stack':     'bg-blue-500/20 text-blue-300 border-blue-500/40',
  'Web Dev':        'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  'Cyber Security': 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  'UI/UX':          'bg-pink-500/20 text-pink-300 border-pink-500/40',
  'AI Foundations': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
  'Civic Pledge':   'bg-lime-500/20 text-lime-300 border-lime-500/40',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const encodePath = (p: string) =>
  p.replace(/ /g, '%20').replace(/&/g, '%26').replace(/,/g, '%2C');

const isImageFile = (path: string) => /\.(png|jpe?g|gif|webp|svg)$/i.test(path);

// ── Modal state type ─────────────────────────────────────────────────────────
interface ModalState {
  name: string;
  file: string;
  fileType: 'pdf' | 'image';
  pages: string[];   // empty = single page / PDF
  pageIndex: number;
}

// ── Component ────────────────────────────────────────────────────────────────
const FullCertificates: FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalState | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(CERTIFICATE_ARCHIVE.map(c => c.category)));
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return CERTIFICATE_ARCHIVE.filter(c => {
      const matchCat  = activeCategory === 'All' || c.category === activeCategory;
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.issuer.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  // Open modal
  const openViewer = (index: number) => {
    const cert = filtered[index];
    const pages = cert.pages ?? [];
    const fileType = cert.fileType ?? (isImageFile(cert.file) ? 'image' : 'pdf');
    setModal({ name: cert.name, file: cert.file, fileType, pages, pageIndex: 0 });
  };

  const closeViewer = () => setModal(null);

  const prevPage = () =>
    setModal(m => m && m.pages.length > 0
      ? { ...m, pageIndex: (m.pageIndex - 1 + m.pages.length) % m.pages.length }
      : m);

  const nextPage = () =>
    setModal(m => m && m.pages.length > 0
      ? { ...m, pageIndex: (m.pageIndex + 1) % m.pages.length }
      : m);

  // Current image URL for multi-page viewer
  const currentPageUrl = modal
    ? encodePath(modal.pages.length > 0 ? modal.pages[modal.pageIndex] : modal.file)
    : '';

  return (
    <div className="min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent relative z-10">

      {/* ── Fixed Header ── */}
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass py-4 border-b border-white/5"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3 px-4 py-2 rounded-xl glass-dark text-text-secondary hover:text-accent transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] md:text-sm uppercase tracking-widest">Back to Portfolio</span>
          </Link>

          <h1 className="text-lg md:text-2xl font-black text-gradient tracking-tight text-center flex-1 uppercase">
            Certificate <span className="hidden md:inline">Archive</span>
          </h1>

          <div className="hidden md:flex w-40 justify-end">
            <span className="text-[10px] font-black text-accent/60 border border-accent/20 px-3 py-1 rounded-full uppercase tracking-widest">
              {CERTIFICATE_ARCHIVE.length} Certs
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Page Content ── */}
      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaFileAlt /> Professional Credentials
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 tracking-tight">
            Full <span className="text-gradient uppercase">Certificate</span> Archive
          </h2>
          <div className="w-24 h-1.5 bg-glow-gradient mx-auto rounded-full mb-6 neon-glow-red" />
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A verified record of every certification, internship credential, and academic achievement — click any card to view the document.
          </p>
        </motion.div>

        {/* Search + Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 text-sm" />
            <input
              type="text"
              placeholder="Search certificates…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-accent/50 transition-colors bg-transparent"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <span className="flex items-center gap-1.5 text-text-secondary text-[10px] font-black uppercase tracking-widest mr-1 self-center">
              <FaFilter size={10} /> Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                    : 'glass-dark border-white/10 text-text-secondary hover:border-accent/30 hover:text-text-primary'
                }`}
              >
                {cat === 'All' ? `All (${CERTIFICATE_ARCHIVE.length})` : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count — animates on every filter change */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`${activeCategory}-${search}-${filtered.length}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-text-secondary text-xs font-black uppercase tracking-widest mb-6"
          >
            Showing {filtered.length} of {CERTIFICATE_ARCHIVE.length} certificates
          </motion.p>
        </AnimatePresence>

        {/* Certificate Card Grid */}
        <motion.div
          layout
          layoutId="cert-grid"
          transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, index) => {
              const colorClass = CATEGORY_COLORS[cert.category] ?? 'from-white/5 to-white/0 border-white/10 text-text-secondary';
              const tagColor   = cert.tag ? (TAG_COLORS[cert.tag] ?? 'bg-accent/20 text-accent border-accent/30') : '';
              const isImg      = cert.fileType === 'image' || isImageFile(cert.file);
              // Cap stagger so last card never waits more than 200ms
              const staggerDelay = Math.min(index * 0.04, 0.2);

              return (
                <motion.div
                  key={cert.file}
                  layout
                  layoutId={cert.file}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.12 } }}
                  transition={{
                    opacity: { duration: 0.25, delay: staggerDelay },
                    y:       { duration: 0.25, delay: staggerDelay },
                    scale:   { duration: 0.25, delay: staggerDelay },
                    layout:  { type: 'spring', stiffness: 350, damping: 30 },
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden border bg-gradient-to-br ${colorClass} glass backdrop-blur-md hover:shadow-xl hover:shadow-black/30 transition-all duration-400 cursor-pointer`}
                  onClick={() => openViewer(index)}
                >
                  {/* Top accent strip */}
                  <div className="h-1 w-full bg-gradient-to-r from-white/10 to-transparent" />

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    {/* Tag + Issuer row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-70 truncate">{cert.issuer}</span>
                      {cert.tag && (
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border whitespace-nowrap ${tagColor}`}>
                          {cert.tag}
                        </span>
                      )}
                    </div>

                    {/* Icon + Name */}
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass.split(' ').slice(0,2).join(' ')} border ${colorClass.split(' ')[2]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {isImg ? <FaImage className="text-sm opacity-80" /> : <FaFileAlt className="text-sm opacity-80" />}
                      </div>
                      <h3 className="text-text-primary text-sm font-black leading-snug line-clamp-3 group-hover:text-white transition-colors">
                        {cert.name}
                      </h3>
                    </div>

                    {/* Category pill */}
                    <span className={`self-start text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-black/20 ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]}`}>
                      {cert.category}
                    </span>
                  </div>

                  {/* View button */}
                  <div className="px-5 pb-5 pt-0 mt-auto">
                    <button
                      onClick={e => { e.stopPropagation(); openViewer(index); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass-dark border border-white/10 text-text-secondary text-[10px] font-black uppercase tracking-widest hover:border-accent/50 hover:text-accent group-hover:border-accent/40 transition-all duration-300"
                    >
                      <FaEye className="group-hover:scale-110 transition-transform" />
                      View Certificate
                    </button>
                  </div>

                  {/* Hover ring */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-white/10" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-text-secondary"
          >
            <FaFileAlt className="mx-auto text-4xl mb-4 opacity-20" />
            <p className="text-sm font-black uppercase tracking-widest">No certificates match your search.</p>
          </motion.div>
        )}
      </div>

      {/* ── Viewer Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-md"
            onClick={closeViewer}
          >
            {/* Modal header */}
            <motion.div
              initial={{ y: -60 }}
              animate={{ y: 0 }}
              exit={{ y: -60 }}
              className="flex-none flex items-center justify-between px-6 py-4 glass border-b border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 min-w-0">
                {modal.fileType === 'image'
                  ? <FaImage className="text-accent flex-shrink-0" />
                  : <FaFileAlt className="text-accent flex-shrink-0" />}
                <span className="text-text-primary text-sm font-black uppercase tracking-widest truncate">{modal.name}</span>
                {modal.pages.length > 0 && (
                  <span className="ml-2 text-[10px] text-text-secondary font-black uppercase tracking-widest whitespace-nowrap">
                    Page {modal.pageIndex + 1} / {modal.pages.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={currentPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-white/10 text-text-secondary hover:text-accent hover:border-accent/40 text-[10px] font-black uppercase tracking-widest transition-all"
                  onClick={e => e.stopPropagation()}
                >
                  <FaFileAlt /> Open
                </a>
                <button
                  onClick={closeViewer}
                  className="w-9 h-9 rounded-xl glass-dark border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>

            {/* Modal body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-hidden p-4 flex flex-col gap-3"
              onClick={e => e.stopPropagation()}
            >
              {/* ── Image viewer ── */}
              {modal.fileType === 'image' ? (
                <div className="flex-1 relative flex items-center justify-center overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPageUrl}
                      src={currentPageUrl}
                      alt={modal.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                  </AnimatePresence>

                  {/* Prev / Next arrows for multi-page */}
                  {modal.pages.length > 1 && (
                    <>
                      <button
                        onClick={prevPage}
                        className="absolute left-4 w-11 h-11 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all shadow-xl"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextPage}
                        className="absolute right-4 w-11 h-11 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all shadow-xl"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                /* ── PDF iframe ── */
                <iframe
                  src={encodePath(modal.file)}
                  title={modal.name}
                  className="flex-1 w-full rounded-2xl border border-white/10 bg-white"
                />
              )}

              {/* Page dot indicators for multi-page */}
              {modal.pages.length > 1 && (
                <div className="flex-none flex items-center justify-center gap-1.5 pb-1">
                  {modal.pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModal(m => m ? { ...m, pageIndex: i } : m)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === modal.pageIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullCertificates;
