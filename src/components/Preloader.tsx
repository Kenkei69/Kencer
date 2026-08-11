import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
      setProgress(current);
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center text-foreground"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-6 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-8xl tracking-widest"
          >
            KENCER<span className="opacity-50">.</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-6xl md:text-9xl font-bold"
          >
            {progress}%
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-foreground/10">
          <motion.div 
            className="h-full bg-foreground"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.2 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
