import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaArrowLeft, FaExpand } from 'react-icons/fa';

const FullGallery: FC = () => {
  const getImageUrl = (src: string) => {
    return src.replace(/ /g, '%20');
  };

  return (
    <div className="bg-background-deep min-h-screen text-text-primary">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <h1 className="text-2xl font-black text-text-primary tracking-tight">
              Full Event Archive
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-text-primary mb-4 tracking-tight">Gallery & Honors</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Complete collection of hackathons, prize distributions, and technical events from my journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-[300px]">
          {GALLERY_IMAGES.map((img, index) => {
            const isPortrait = img.height > img.width;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative rounded-2xl overflow-hidden shadow-xl border border-border/30 hover:shadow-2xl hover:border-accent/30 transition-all duration-300 ${
                  isPortrait ? 'col-span-1' : 'col-span-2'
                }`}
              >
              <img
                src={getImageUrl(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;

                  // Phase 1: Try without the 'assets/' prefix if it's there
                  if (img.src.startsWith('assets/') && !target.dataset.triedNoAssets) {
                    target.dataset.triedNoAssets = "true";
                    target.src = getImageUrl(img.src.replace('assets/', ''));
                    return;
                  }

                  // Phase 2: Try adding './' prefix
                  if (!target.dataset.triedRelative) {
                    target.dataset.triedRelative = "true";
                    target.src = `./${getImageUrl(img.src)}`;
                    return;
                  }

                  // Phase 3: Final fallback to a high-quality relevant Unsplash image
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = "true";
                    const fallbackQueries = ['coding', 'tech', 'hackathon', 'office', 'robot', 'future'];
                    const fallbackQuery = fallbackQueries[index % fallbackQueries.length];
                    target.src = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop&query=${fallbackQuery}&sig=${index}`;
                    target.className = "w-full h-full object-cover opacity-60 mix-blend-overlay bg-slate-800";
                  }
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-background-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-text-primary">
                  <FaExpand size={24} className="mx-auto mb-2 text-accent" />
                  <p className="text-sm font-bold uppercase tracking-widest">{img.alt}</p>
                </div>
              </div>

              {/* Title Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-surface/90 backdrop-blur-md border border-border/50 rounded-xl px-3 py-2">
                  <p className="text-text-primary text-xs font-bold uppercase tracking-widest text-center">{img.alt}</p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullGallery;