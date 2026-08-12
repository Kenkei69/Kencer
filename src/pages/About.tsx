import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

function StatItem({ value, label, delay }: { value: string, label: string, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center md:items-start"
    >
      <div className="font-display text-7xl md:text-8xl text-foreground mb-4 tracking-tighter">{value}</div>
      <div className="text-foreground opacity-60 uppercase tracking-widest text-sm font-bold">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const marqueeX = useTransform(smoothProgress, [0, 1], [0, -1000]);

  return (
    <div ref={containerRef} className="w-full relative bg-background pb-32">
      
      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="font-display text-[clamp(4rem,15vw,200px)] text-foreground leading-[0.8] uppercase tracking-tighter mix-blend-overlay drop-shadow-sm mb-12">
            WE ARE <br/>
            KENCER.
          </h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl md:text-4xl text-foreground opacity-80 max-w-3xl font-medium leading-tight"
          >
            A digital design agency that refuses to compromise. We believe in bold colors, massive typography, and leaving an unforgettable impression.
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden py-24 bg-foreground my-20 flex items-center">
        <motion.div 
          style={{ x: marqueeX }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-8xl md:text-[150px] text-background uppercase tracking-tighter px-8 mix-blend-difference opacity-90">
              UNAPOLOGETIC CREATIVITY • 
            </span>
          ))}
        </motion.div>
      </div>

      {/* Culture / Vibe Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div 
            style={{ y: y1 }}
            className="rounded-3xl overflow-hidden glass-panel aspect-[4/5] relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team collaborating" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          </motion.div>

          <div className="flex flex-col gap-8 md:gap-16">
            <motion.div 
              style={{ y: y2 }}
              className="rounded-3xl overflow-hidden glass-panel aspect-video relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </motion.div>

            <div className="glass-panel p-10 md:p-12 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <h3 className="font-display text-4xl text-foreground uppercase tracking-widest mb-6">Our DNA</h3>
              <p className="text-xl text-foreground opacity-80 leading-relaxed font-medium">
                Born from a desire to break the mold, Kencer is an assembly of visionary designers, developers, and strategists. We don't just build websites; we craft digital ecosystems that dominate their markets and captivate audiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Stats */}
      <div className="max-w-7xl mx-auto px-6 py-32 border-t border-[var(--glass-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <StatItem value="10+" label="Years Experience" delay={0.1} />
          <StatItem value="200" label="Projects Delivered" delay={0.2} />
          <StatItem value="15" label="Industry Awards" delay={0.3} />
          <StatItem value="5M+" label="Global Reach" delay={0.4} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tighter mb-10">
          Ready to disrupt <br/> your industry?
        </h2>
        <Link to="/contact" className="inline-flex items-center gap-4 px-10 py-6 bg-foreground text-background rounded-full font-display text-2xl uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
          Let's Talk <ArrowRight size={28} />
        </Link>
      </div>

    </div>
  );
}
