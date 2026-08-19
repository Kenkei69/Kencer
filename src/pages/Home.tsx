import { ArrowRight, CheckCircle2, Star, Zap, MonitorSmartphone, PenTool, PlayCircle } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { projectsData } from '../data/projects';
import { videosData } from '../data/videos';
import MagneticBtn from '../components/MagneticBtn';
import Hero3DObject from '../components/Hero3DObject';
import { useEffect, useState, useRef } from 'react';

// Stat Counter Component
const StatCounter = ({ value, suffix, label }: { value: number, suffix: string, label: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, value, count]);

  return (
    <div ref={ref} className="flex flex-col items-center flex-1">
      <div className="font-display text-5xl md:text-7xl text-foreground flex">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <span className="text-foreground opacity-60 text-sm uppercase tracking-widest font-bold mt-2 text-center">{label}</span>
    </div>
  );
};

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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 px-4 bg-background overflow-hidden">
        
        {/* Full-width 3D Background */}
        <motion.div 
          style={{ y: yHeroImage }}
          className="absolute inset-0 w-full h-full z-20 flex items-center justify-center"
        >
          <Hero3DObject />
        </motion.div>

        {/* Hero Content */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center pb-32 pointer-events-none">
          
          <motion.h1 
            style={{ y: yHeroText, opacity: opacityHero }}
            className="font-display text-[clamp(4rem,22vw,360px)] leading-[0.8] text-white tracking-tighter mb-6 mix-blend-difference relative z-30 whitespace-nowrap pointer-events-none select-none"
          >
            <ScrambleText text="DIGITAL" />
            <br />
            <ScrambleText text="EXCELLENCE" />
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-40 md:mt-24 text-xl md:text-2xl text-white mix-blend-difference font-medium z-30 opacity-100 max-w-3xl pointer-events-none select-none"
          >
            Elevating brands through premium advertising, immersive digital experiences, and unapologetic creativity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 items-center z-30 pointer-events-auto"
          >
            <MagneticBtn as={Link} to="/contact" intensity={0.3} className="px-8 py-5 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105">
              Get Your Own Ad <ArrowRight size={24} />
            </MagneticBtn>
            <MagneticBtn as={Link} to="/work" intensity={0.2} className="px-8 py-5 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-foreground font-display text-2xl tracking-widest uppercase rounded-full hover:bg-foreground hover:text-background transition-all duration-300 shadow-xl hover:scale-105">
              View Work
            </MagneticBtn>
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

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="glass-panel p-10 md:p-16 rounded-[3rem] flex flex-col md:flex-row gap-10 md:gap-4 justify-between items-center relative overflow-hidden">
          <StatCounter value={50} suffix="M+" label="Views Generated" />
          <div className="hidden md:block w-px h-16 bg-[var(--glass-border)]"></div>
          <StatCounter value={300} suffix="%" label="Average ROI" />
          <div className="hidden md:block w-px h-16 bg-[var(--glass-border)]"></div>
          <StatCounter value={200} suffix="+" label="Campaigns Launched" />
          <div className="hidden md:block w-px h-16 bg-[var(--glass-border)]"></div>
          <StatCounter value={4} suffix="M+" label="Reach Delivered" />
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
              className={`w-full ${video.isPortrait ? 'max-w-sm mx-auto aspect-[9/16]' : 'aspect-video'} rounded-[2rem] overflow-hidden glass-panel relative group`}
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
                <h3 className={`font-display text-4xl text-foreground mb-2 uppercase ${video.isPortrait ? 'text-center' : ''}`}>{video.title}</h3>
                <p className={`text-foreground opacity-90 uppercase tracking-widest font-bold text-sm ${video.isPortrait ? 'text-center' : ''}`}>{video.category}</p>
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
              { name: "NYU INDIA", role: "Social Media Client", text: "Working with Kencer for my page, NYU INDIA, has been game-changing. We opted for their social media package, and their Instagram post generation gave us incredible engagement. Thanks to their strategies, our account reach shot up from 100K to 4 Million!\n\nWhat makes Kencer stand out is their ability to deliver top-tier, high-performing services within a very budget-friendly package. Their team is dedicated, creative, and focused on real growth.\n\nFrom now on, I will exclusively partner with Kencer for all our social media needs. If you are a business owner looking to scale your brand's digital presence and maximize ROI without overspending, I highly recommend Kencer." },
              { name: "The Angar Batch", role: "Digital Growth Client", text: "Working with Kencer for the past 3 months has been an absolute game-changer for The Angar Batch. They have been managing our entire social media presence, handling everything from high-converting social media posts to top-notch video editing and full account management.\n\nThanks to their strategic content and consistent effort, our follower base grew from 11K to over 30K in just 3 months! Their team is extremely professional, creative, and budget-friendly.\n\nKencer is now our permanent partner for all digital growth. If any business owner wants real, fast, and organic social media growth, I highly recommend Kencer!" },
              { name: "Terphern AI", role: "Tech Brand", text: "We recently partnered with Kencer for Terphern AI, and even though we’ve just started working together, their work quality has already blown us away.\n\nTheir video editing skills are absolutely outstanding—bringing a sharp, high-end feel to our content that perfectly matches our tech brand. What sets their social media management apart is their operational discipline; they provide detailed, time-to-time performance reports, keeping us completely updated on our growth metrics without any follow-ups needed.\n\nIf you are a founder or business owner who values speed, precision, and complete transparency in social media execution, Kencer is hands-down the right agency to scale your brand." }
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
                <p className="text-base text-foreground opacity-90 mb-8 italic font-medium whitespace-pre-line">"{testimonial.text}"</p>
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
