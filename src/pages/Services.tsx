import { CheckCircle2, ArrowRight, Video, Code, PenTool, Share2, Hexagon } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Video Editing",
      icon: <Video size={40} className="text-foreground" />,
      desc: "Transform raw footage into viral cinematic masterpieces with high-converting motion typography and spatial audio.",
      features: [
        "Motion graphics & custom animations",
        "Dynamic typography & viral captions",
        "Seamless A-roll & B-roll rhythm",
        "Mastered 4K rendering & color grading",
        "Audio enhancement & spatial sound design"
      ],
      cta: "Request Video Editing Quote",
      bonus: "⭐ FREE Domain & Hosting Included"
    },
    {
      title: "Web Development",
      icon: <Code size={40} className="text-foreground" />,
      desc: "Ultra-responsive, blazingly fast full-stack applications and high-converting e-commerce digital storefronts.",
      features: [
        "Ultra-fast landing page creation",
        "High-converting Shopify store setups",
        "Custom portfolio web applications",
        "Full-stack e-commerce architecture"
      ],
      cta: "Request Web Development Quote",
      bonus: "⭐ Free 2-time edits / revisions included"
    },
    {
      title: "Graphic Design",
      icon: <PenTool size={40} className="text-foreground" />,
      desc: "Crystal-sharp visual branding, click-magnetic YouTube thumbnails, and high-impact digital marketing assets.",
      features: [
        "Logo design",
        "Social media post design",
        "Digital templates & flyers",
        "High-CTR YouTube thumbnails"
      ],
      cta: "Request Graphic Design Quote",
      bonus: "⭐ Free weekly 2 high-grade posts & 1 viral reel included"
    },
    {
      title: "Social Media Handling",
      icon: <Share2 size={40} className="text-foreground" />,
      desc: "End-to-end community management, viral reel production, content scheduling, and audience expansion analytics.",
      features: [
        "Content calendar & caption writing",
        "Deep insights & audience analytics",
        "Scheduled automated publishing",
        "In-depth monthly performance reports"
      ],
      cta: "Request Social Media Handling Quote",
      bonus: ""
    },
    {
      title: "Logo Design",
      icon: <Hexagon size={40} className="text-foreground" />,
      desc: "Iconic, memorable, and versatile logo designs that perfectly encapsulate your brand's core identity and values.",
      features: [
        "Custom vector typography",
        "Brand mark & logomark creation",
        "Color palette & typography guidelines",
        "Multiple format exports (SVG, PNG, EPS)"
      ],
      cta: "Request Logo Design Quote",
      bonus: "⭐ Full commercial rights & source files included"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h1 className="font-display text-7xl md:text-[120px] text-foreground leading-none mb-6 uppercase tracking-tighter mix-blend-overlay drop-shadow-sm">
          Our Services
        </h1>
        <p className="text-2xl text-foreground opacity-80 max-w-3xl mx-auto font-medium">
          Comprehensive digital solutions designed to elevate your brand and drive measurable results.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {services.map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-10 md:p-12 rounded-[2rem] flex flex-col relative group overflow-hidden hover:bg-[var(--glass-border)] transition-all duration-500 hover:-translate-y-2"
          >
            {/* Subtle glow effect behind icon */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-500" />
            
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-[var(--glass-bg)] flex items-center justify-center border border-[var(--glass-border)] group-hover:scale-110 group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-all duration-500 shadow-sm">
                <div className="group-hover:text-background text-foreground transition-colors">
                  {service.icon}
                </div>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wider leading-tight">{service.title}</h2>
            </div>
            
            <p className="text-xl text-foreground opacity-80 mb-10 leading-relaxed relative z-10 font-medium">
              {service.desc}
            </p>
            
            <ul className="flex flex-col gap-5 mb-14 flex-grow relative z-10">
              {service.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-4 text-foreground opacity-90 text-lg font-medium">
                  <CheckCircle2 size={24} className="text-blue-500 shrink-0 mt-0.5" /> 
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-6 relative z-10">
              {service.bonus && (
                <div className="inline-flex self-start px-5 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-xl text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md">
                  {service.bonus}
                </div>
              )}
              
              <Link to="/contact" className="w-full py-5 bg-foreground text-background font-display text-xl tracking-widest uppercase rounded-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center gap-3 group/btn hover:scale-[1.02] magnetic-btn">
                {service.cta}
                <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}