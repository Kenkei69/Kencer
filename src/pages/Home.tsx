import { ArrowRight, CheckCircle2, Star, Zap, MonitorSmartphone, PenTool, PlayCircle } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { projectsData } from '../data/projects';
import { videosData } from '../data/videos';
import { useEffect, useState } from 'react';

// Text Scramble Effect Component
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) {
          return letter;
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="flex flex-col gap-32 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 px-4">
        
        {/* Background Glowing Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blob-glow -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blob-glow translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none" 
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          
          <motion.h1 
            style={{ y: yHeroText, opacity: opacityHero }}
            className="font-display text-[var(--display-size)] leading-[0.85] text-foreground tracking-tighter mb-6 mix-blend-overlay relative z-30 drop-shadow-sm"
          >
            <ScrambleText text="DIGITAL" />
            <br />
            <ScrambleText text="EXCELLENCE" />
          </motion.h1>

          <motion.div 
            style={{ y: yHeroImage }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <div className="w-[300px] h-[400px] md:w-[450px] md:h-[600px] mask-brush-stroke overflow-hidden glass-panel relative">
              <img 
                src={projectsData[0].image} 
                alt="Featured Hero Graphic" 
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80 mix-blend-multiply" />
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-40 md:mt-24 text-xl md:text-2xl text-foreground font-medium z-30 opacity-90 max-w-3xl"
          >
            Elevating brands through premium advertising, immersive digital experiences, and unapologetic creativity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 items-center z-30"
          >
            <Link to="/contact" className="px-8 py-5 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 magnetic-btn">
              Get Your Own Ad <ArrowRight size={24} />
            </Link>
            <Link to="/work" className="px-8 py-5 border border-[var(--glass-border)] text-foreground font-display text-2xl tracking-widest uppercase rounded-full hover:bg-[var(--glass-border)] transition-all duration-300 glass-panel hover:scale-105 magnetic-btn">
              View Work
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex items-center gap-4 z-30 text-foreground text-sm font-bold tracking-wide uppercase opacity-70"
          >
            <div className="flex gap-1">
               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="text-blue-500" />)}
            </div>
            <span>Trusted by 200+ Premium Brands</span>
          </motion.div>
        </div>

        {/* Infinite Marquee Brand Strip */}
        <div className="absolute bottom-0 left-0 w-full glass-panel py-6 z-30 overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-20 whitespace-nowrap px-8 items-center w-max opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-20">
                {['VOGUE', 'WIRED', 'FORBES', 'GQ', 'FAST COMPANY'].map((brand, j) => (
                  <span key={j} className="font-display text-3xl md:text-4xl tracking-widest text-foreground">{brand}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4">Reel</h2>
            <p className="text-xl text-foreground opacity-70 max-w-xl font-medium">Immersive motion pictures and high-converting commercials.</p>
          </div>
          <Link to="/work" className="font-display text-xl uppercase tracking-widest text-foreground border-b border-[var(--glass-border)] hover:border-foreground pb-1 transition-all flex items-center gap-2">
            View All Videos <PlayCircle size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {videosData.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="w-full aspect-video rounded-[2rem] overflow-hidden glass-panel relative group"
            >
              <video 
                src={video.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex flex-col justify-end p-10 pointer-events-none">
                <h3 className="font-display text-4xl text-foreground mb-2 uppercase">{video.title}</h3>
                <p className="text-foreground opacity-90 uppercase tracking-widest font-bold text-sm">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features / Expertise */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-6xl md:text-8xl text-foreground mb-6">Expertise</h2>
          <p className="text-xl text-foreground opacity-70 max-w-2xl mx-auto font-medium">We push the boundaries of what's possible on the web, combining aesthetic brilliance with technical mastery.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MonitorSmartphone size={40} />, title: "Digital Design", desc: "Crafting visually stunning, user-centric interfaces that captivate and convert." },
            { icon: <PenTool size={40} />, title: "Brand Identity", desc: "Building powerful brand narratives through typography, color, and motion." },
            { icon: <Zap size={40} />, title: "Creative Dev", desc: "Bringing designs to life with smooth animations and cutting-edge web technologies." }
          ].map((feature, i) => (
            <Tilt key={i} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2500}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="clay-panel p-10 flex flex-col items-start h-full"
              >
                <div className="p-4 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl text-foreground mb-8 transition-colors shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-display text-3xl text-foreground mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-foreground opacity-70 text-lg leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Featured Graphic Work */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4">Selected Work</h2>
            <p className="text-xl text-foreground opacity-70 max-w-xl font-medium">A glimpse into our latest and greatest visual creations.</p>
          </div>
          <Link to="/work" className="font-display text-xl uppercase tracking-widest text-foreground border-b border-[var(--glass-border)] hover:border-foreground pb-1 transition-all flex items-center gap-2">
            View All Projects <ArrowRight size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/work" className="group cursor-pointer flex flex-col">
                <div className="aspect-[4/5] bg-[var(--glass-bg)] rounded-3xl mb-6 overflow-hidden relative glass-panel">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-2 uppercase group-hover:text-blue-500 transition-colors">{project.title}</h3>
                <p className="text-foreground opacity-50 text-sm uppercase tracking-widest font-bold">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--glass-bg)] skew-y-3 origin-top-left -z-10 border-y border-[var(--glass-border)]" />
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div>
              <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4">Client Love</h2>
              <p className="text-xl text-foreground opacity-70 max-w-xl font-medium">Don't just take our word for it. Here's what visionary leaders say about our work.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "CMO, TechNova", text: "The redesign completely transformed our brand perception. We look like a billion-dollar company now." },
              { name: "Marcus Reed", role: "Founder, Studio X", text: "Bold, uncompromised, and technically flawless. They delivered exactly what we needed to stand out." },
              { name: "Elena Rostova", role: "Director, ArtBasel", text: "A rare mix of true artistic vision and digital execution. The final product exceeded all expectations." }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-3xl relative group"
              >
                <div className="flex text-foreground mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" className="opacity-80 text-blue-500" />)}
                </div>
                <p className="text-xl text-foreground opacity-90 mb-8 italic font-medium">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--glass-border)]" />
                  <div>
                    <h4 className="font-bold text-foreground uppercase tracking-wider">{testimonial.name}</h4>
                    <span className="text-foreground opacity-60 text-sm font-medium">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-32 relative text-center px-6 z-10 glass-panel border-x-0 mx-[-1rem]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[clamp(3rem,8vw,120px)] leading-none text-foreground mb-8 tracking-tighter mix-blend-overlay">
            READY TO BE BOLD?
          </h2>
          <p className="text-2xl text-foreground opacity-80 max-w-2xl mx-auto mb-12 font-medium">
            Stop blending in. Let's create an experience that demands attention.
          </p>
          <Link to="/contact" className="inline-block px-12 py-6 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300 magnetic-btn">
            Start a Project
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
