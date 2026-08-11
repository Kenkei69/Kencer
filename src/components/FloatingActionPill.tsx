import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

export default function FloatingActionPill() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-[90] flex items-center gap-2 glass-panel rounded-full p-2 pr-4 shadow-2xl backdrop-blur-xl"
        >
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background hover:scale-105 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
          
          <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
          
          <Link
            to="/contact"
            className="flex items-center gap-2 text-foreground font-medium text-sm hover:opacity-70 transition-opacity"
          >
            <MessageCircle size={16} />
            <span className="uppercase tracking-widest text-xs hidden sm:block">Chat</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
