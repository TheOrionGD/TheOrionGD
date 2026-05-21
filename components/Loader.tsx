import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, (currentStep / steps) * 100));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 400); // Small pause at 100% before triggering exit
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div 
      key="loader"
      exit={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000103]"
    >
      <div className="flex flex-col items-center justify-center h-full pb-20">
        <motion.h1 
          layoutId="brandText"
          className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-8"
        >
          OrionGD
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="w-48 h-1 bg-white/20 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.02 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
