import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<'default' | 'button' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const textElement = target.closest('[data-cursor-text]');
      if (textElement) {
        setHoverState('text');
        setCursorText(textElement.getAttribute('data-cursor-text') || '');
        return;
      }

      if (target.closest('.group')) {
        setHoverState('text');
        setCursorText('VIEW');
        return;
      }

      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setHoverState('button');
        setCursorText('');
        return;
      }

      setHoverState('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      borderColor: 'var(--foreground)'
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      borderColor: 'var(--foreground)'
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: 'var(--foreground)',
      borderColor: 'var(--foreground)'
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1,
      opacity: 1
    },
    button: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0,
      opacity: 0
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0,
      opacity: 0
    }
  };

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center overflow-hidden"
        animate={hoverState}
        variants={variants}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <motion.span
          className="font-display text-[12px] font-bold tracking-widest text-background"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: hoverState === 'text' ? 1 : 0,
            scale: hoverState === 'text' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
        >
          {cursorText}
        </motion.span>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={hoverState}
        variants={dotVariants}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.1,
        }}
      />
    </>
  );
}
