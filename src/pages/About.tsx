import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-8xl md:text-[140px] text-foreground leading-none mb-12 uppercase mix-blend-overlay drop-shadow-sm"
      >
        About Us
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl bg-[var(--glass-bg)] border-[var(--glass-border)]"
      >
        <p className="text-2xl md:text-4xl text-foreground opacity-90 leading-relaxed font-medium">
          We are a digital design agency that doesn't compromise. We believe in bold colors, massive typography, and leaving a lasting impression.
        </p>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--glass-border)] pt-12">
          {[
            { value: "10+", label: "Years Exp" },
            { value: "200", label: "Projects" },
            { value: "15", label: "Awards" },
            { value: "5M+", label: "Views" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="font-display text-5xl text-foreground mb-2">{stat.value}</div>
              <div className="text-foreground opacity-60 uppercase tracking-widest text-sm font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
