import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
        }, 400);
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8f9fb 100%)' }}
    >
      <div className="flex flex-col items-center justify-center h-full pb-20">
        <motion.h1 
          layoutId="brandText"
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-8"
          style={{ color: '#4f46e5' }}
        >
          OrionGD
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="w-48 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(99,102,241,0.15)' }}
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)', boxShadow: '0 0 10px rgba(99,102,241,0.5)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.02 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xs font-bold uppercase tracking-widest"
          style={{ color: '#64748b' }}
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
