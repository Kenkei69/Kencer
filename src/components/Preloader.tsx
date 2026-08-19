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
        className="fixed inset-0 z-[99999] pointer-events-none"
        exit={{ opacity: 0, transition: { duration: 0.1, delay: 1 } }}
      >
        {/* Top Half Split */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 bg-background pointer-events-auto"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Bottom Half Split */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-background pointer-events-auto"
          initial={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />
        
        {/* Content Container */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-foreground z-10 pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl md:text-8xl tracking-widest flex flex-col items-center"
            >
              <div>KENCER<span className="opacity-50">.</span></div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-sm md:text-base font-body tracking-[0.3em] uppercase mt-2 opacity-70"
              >
                Digital Excellence
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display text-4xl md:text-6xl font-bold opacity-80 mt-8"
            >
              {progress}%
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] md:w-[40%] h-1 bg-foreground/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <motion.div 
              className="h-full bg-foreground shadow-[0_0_10px_currentColor]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
