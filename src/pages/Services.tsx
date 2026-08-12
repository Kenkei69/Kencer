import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Video, Code, PenTool, Share2, Hexagon, Star } from 'lucide-react';
import { Link } from 'react-router';

const services = [
  {
    id: 'video',
    title: "Video Editing",
    icon: <Video size={32} />,
    color: "#3b82f6", // blue
    bg: "bg-blue-500/10",
    desc: "Transform raw footage into viral cinematic masterpieces with high-converting motion typography and spatial audio. We don't just edit; we engineer engagement.",
    features: [
      "Motion graphics & custom animations",
      "Dynamic typography & viral captions",
      "Seamless A-roll & B-roll rhythm",
      "Mastered 4K rendering & color grading",
      "Audio enhancement & spatial sound design"
    ],
    cta: "Request Video Editing Quote",
    bonus: "FREE Domain & Hosting Included"
  },
  {
    id: 'web',
    title: "Web Development",
    icon: <Code size={32} />,
    color: "#8b5cf6", // purple
    bg: "bg-purple-500/10",
    desc: "Ultra-responsive, blazingly fast full-stack applications and high-converting e-commerce digital storefronts built on modern architectures.",
    features: [
      "Ultra-fast landing page creation",
      "High-converting Shopify store setups",
      "Custom portfolio web applications",
      "Full-stack e-commerce architecture"
    ],
    cta: "Request Web Development Quote",
    bonus: "Free 2-time edits / revisions included"
  },
  {
    id: 'graphic',
    title: "Graphic Design",
    icon: <PenTool size={32} />,
    color: "#f59e0b", // amber
    bg: "bg-amber-500/10",
    desc: "Crystal-sharp visual branding, click-magnetic YouTube thumbnails, and high-impact digital marketing assets that demand attention.",
    features: [
      "Logo design",
      "Social media post design",
      "Digital templates & flyers",
      "High-CTR YouTube thumbnails"
    ],
    cta: "Request Graphic Design Quote",
    bonus: "Free weekly 2 high-grade posts & 1 viral reel included"
  },
  {
    id: 'social',
    title: "Social Media Handling",
    icon: <Share2 size={32} />,
    color: "#ec4899", // pink
    bg: "bg-pink-500/10",
    desc: "End-to-end community management, viral reel production, content scheduling, and audience expansion analytics. We grow your digital cult.",
    features: [
      "Content calendar & caption writing",
      "Deep insights & audience analytics",
      "Scheduled automated publishing",
      "In-depth monthly performance reports"
    ],
    cta: "Request Social Media Handling Quote"
  },
  {
    id: 'logo',
    title: "Logo Design",
    icon: <Hexagon size={32} />,
    color: "#10b981", // emerald
    bg: "bg-emerald-500/10",
    desc: "Iconic, memorable, and versatile logo designs that perfectly encapsulate your brand's core identity and values.",
    features: [
      "Custom vector typography",
      "Brand mark & logomark creation",
      "Color palette & typography guidelines",
      "Multiple format exports (SVG, PNG, EPS)"
    ],
    cta: "Request Logo Design Quote",
    bonus: "Full commercial rights & source files included"
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full transition-colors duration-700 pb-32">
      {/* Dynamic Background Glow based on active service */}
      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 opacity-20 dark:opacity-10 z-0"
        style={{ backgroundColor: activeService.color }}
      />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[clamp(3rem,10vw,120px)] text-foreground leading-none uppercase tracking-tighter mix-blend-overlay drop-shadow-sm mb-6"
        >
          Our Capabilities
        </motion.h1>
        <p className="text-2xl text-foreground opacity-80 max-w-3xl font-medium">
          Comprehensive digital solutions designed to elevate your brand and drive measurable, uncompromising results.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Sticky Navigation */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onMouseEnter={() => setActiveService(service)}
              onClick={() => setActiveService(service)}
              className={`text-left px-8 py-6 rounded-3xl transition-all duration-300 flex items-center justify-between group ${
                activeService.id === service.id 
                  ? 'bg-foreground text-background shadow-2xl scale-105' 
                  : 'glass-panel text-foreground opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`transition-colors duration-300 ${activeService.id === service.id ? 'text-background' : 'text-foreground'}`}>
                  {service.icon}
                </span>
                <span className="font-display text-2xl uppercase tracking-wider">{service.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="lg:w-2/3 min-h-[60vh] glass-panel rounded-[3rem] p-10 md:p-16 border-[var(--glass-border)] bg-[var(--glass-bg)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col h-full"
            >
              <div className="flex items-center gap-6 mb-8">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: activeService.color }}
                >
                  {activeService.icon}
                </div>
                <h2 className="font-display text-5xl md:text-6xl text-foreground uppercase tracking-tighter leading-none">
                  {activeService.title}
                </h2>
              </div>

              <p className="text-2xl text-foreground opacity-80 leading-relaxed font-medium mb-12">
                {activeService.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {activeService.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-foreground/5 border border-foreground/10"
                  >
                    <CheckCircle2 size={24} style={{ color: activeService.color }} className="shrink-0 mt-0.5" />
                    <span className="text-foreground opacity-90 font-medium leading-snug">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-6">
                {activeService.bonus && (
                  <div className="inline-flex self-start items-center gap-2 px-6 py-4 bg-foreground/10 border border-foreground/20 rounded-2xl text-foreground font-bold tracking-wide backdrop-blur-md">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    {activeService.bonus}
                  </div>
                )}
                
                <Link 
                  to="/contact" 
                  className="w-full py-6 text-white font-display text-2xl tracking-widest uppercase rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-4 group/btn shadow-2xl"
                  style={{ backgroundColor: activeService.color }}
                >
                  {activeService.cta}
                  <ArrowRight className="group-hover/btn:translate-x-3 transition-transform" size={28} />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Decorative massive blurred background icon */}
          <div 
            className="absolute -right-20 -bottom-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-all duration-700"
            style={{ color: activeService.color, transform: 'scale(8)' }}
          >
            {activeService.icon}
          </div>
        </div>

      </div>
    </div>
  );
}