import { CheckCircle2, ArrowRight, Video, Code, PenTool, Share2, Hexagon } from 'lucide-react';
import { Link } from 'react-router';

export default function Services() {
  const services = [
    {
      title: "Video Editing",
      icon: <Video size={40} className="text-white" />,
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
      icon: <Code size={40} className="text-white" />,
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
      icon: <PenTool size={40} className="text-white" />,
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
      icon: <Share2 size={40} className="text-white" />,
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
      icon: <Hexagon size={40} className="text-white" />,
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
      <div className="text-center mb-24">
        <h1 className="font-display text-7xl md:text-[120px] text-white leading-none mb-6 uppercase tracking-tighter mix-blend-overlay">
          Our Services
        </h1>
        <p className="text-2xl text-white/80 max-w-3xl mx-auto font-medium">
          Comprehensive digital solutions designed to elevate your brand and drive measurable results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {services.map((service, i) => (
          <div key={i} className="glass-panel p-10 md:p-12 rounded-[2rem] flex flex-col relative group overflow-hidden hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2">
            {/* Subtle glow effect behind icon */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-500" />
            
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl">
                {service.icon}
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider leading-tight">{service.title}</h2>
            </div>
            
            <p className="text-xl text-white/80 mb-10 leading-relaxed relative z-10">
              {service.desc}
            </p>
            
            <ul className="flex flex-col gap-5 mb-14 flex-grow relative z-10">
              {service.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-4 text-white/90 text-lg">
                  <CheckCircle2 size={24} className="text-blue-400 shrink-0 mt-0.5" /> 
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-6 relative z-10">
              {service.bonus && (
                <div className="inline-flex self-start px-5 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-200 rounded-xl text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-md">
                  {service.bonus}
                </div>
              )}
              
              <Link to="/contact" className="w-full py-5 bg-white text-primary font-display text-xl tracking-widest uppercase rounded-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center justify-center gap-3 group/btn hover:scale-[1.02]">
                {service.cta}
                <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}