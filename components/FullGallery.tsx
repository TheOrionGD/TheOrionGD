import type { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaArrowLeft, FaExpand } from 'react-icons/fa';

const FullGallery: FC = () => {
  const getImageUrl = (src: string) => {
    return src.replace(/ /g, '%20');
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent relative z-10">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass py-4"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-3 px-4 py-2 rounded-xl glass-dark text-text-secondary hover:text-accent transition-all duration-300 hover:scale-105"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-[10px] md:text-sm uppercase tracking-widest">Exit Archive</span>
            </Link>

            <h1 className="text-lg md:text-2xl font-black text-gradient tracking-tight text-center flex-1 uppercase">
              Visual <span className="hidden md:inline">History</span>
            </h1>

            <div className="hidden md:flex w-32 justify-end">
              <div className="h-1 w-12 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gallery Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
             Memories & Milestones
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
             Gallery <span className="text-gradient uppercase tracking-tighter">& Honors</span>
          </h2>
          <div className="w-24 h-1.5 bg-glow-gradient mx-auto rounded-full mb-8 neon-glow-red"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
            A comprehensive visual record of technical milestones, hackathons, and collaborative achievements throughout my academic and professional career.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          {GALLERY_IMAGES.map((img, index) => {
            const isPortrait = img.height > img.width;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-accent/40 transition-all duration-500 ${isPortrait ? 'col-span-1' : 'col-span-1 sm:col-span-2'
                  }`}
              >
                <img
                  src={getImageUrl(img.src)}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (img.src.startsWith('assets/') && !target.dataset.triedNoAssets) {
                      target.dataset.triedNoAssets = "true";
                      target.src = getImageUrl(img.src.replace('assets/', ''));
                      return;
                    }
                    if (!target.dataset.triedRelative) {
                      target.dataset.triedRelative = "true";
                      target.src = `./${getImageUrl(img.src)}`;
                      return;
                    }
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = "true";
                      const queries = ['coding', 'tech', 'hackathon', 'cyber', 'robot', 'future'];
                      target.src = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop&query=${queries[index % queries.length]}&sig=${index}`;
                      target.className = "w-full h-full object-cover opacity-50 mix-blend-luminosity";
                    }
                  }}
                />

                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 glass-dark opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 mx-auto border border-accent/40">
                      <FaExpand className="text-white" />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-accent px-4 py-1.5 rounded-full shadow-lg">Enlarge</span>
                  </motion.div>
                </div>

                {/* Floating Title Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass px-4 py-3 rounded-2xl border border-white/10 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_rgba(252,58,69,0.2)] transition-all duration-300">
                    <p className="text-text-primary text-[10px] font-black uppercase tracking-[0.2em] text-center line-clamp-1">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FullGallery;