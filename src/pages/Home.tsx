import { ArrowRight, CheckCircle2, Star, Zap, MonitorSmartphone, PenTool } from 'lucide-react';
import { Link } from 'react-router';
import { projectsData } from '../data/projects';

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 overflow-hidden px-4">
        
        {/* Background Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blob-glow -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blob-glow translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          
          <h1 className="font-display text-[var(--display-size)] leading-[0.85] text-foreground tracking-tighter mb-6 mix-blend-overlay relative z-30 drop-shadow-sm">
            DIGITAL
            <br />
            EXCELLENCE
          </h1>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-[300px] h-[400px] md:w-[450px] md:h-[600px] mask-brush-stroke overflow-hidden glass-panel relative">
              <img 
                src={projectsData[0].image} 
                alt="Featured Hero Graphic" 
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80 mix-blend-multiply" />
            </div>
          </div>

          <p className="mt-40 md:mt-24 text-xl md:text-2xl text-foreground font-medium z-30 opacity-90 max-w-3xl">
            Elevating brands through premium advertising, immersive digital experiences, and unapologetic creativity.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center z-30">
            <Link to="/contact" className="px-8 py-5 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl">
              Get Your Own Ad <ArrowRight size={24} />
            </Link>
            <Link to="/work" className="px-8 py-5 border border-[var(--glass-border)] text-foreground font-display text-2xl tracking-widest uppercase rounded-full hover:bg-[var(--glass-border)] transition-all duration-300 glass-panel">
              View Work
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-4 z-30 text-foreground text-sm font-bold tracking-wide uppercase opacity-70">
            <div className="flex gap-1">
               <Star size={16} fill="currentColor" className="text-blue-500" />
               <Star size={16} fill="currentColor" className="text-blue-500" />
               <Star size={16} fill="currentColor" className="text-blue-500" />
               <Star size={16} fill="currentColor" className="text-blue-500" />
               <Star size={16} fill="currentColor" className="text-blue-500" />
            </div>
            <span>Trusted by 200+ Premium Brands</span>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="absolute bottom-0 left-0 w-full glass-panel py-6 z-30 overflow-hidden">
          <div className="flex gap-16 animate-[pulse_4s_ease-in-out_infinite] px-8 items-center justify-center w-full max-w-7xl mx-auto opacity-50">
            {['VOGUE', 'WIRED', 'FORBES', 'GQ', 'FAST COMPANY'].map((brand, i) => (
              <span key={i} className="font-display text-3xl md:text-4xl tracking-widest text-foreground">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl text-foreground mb-6">Expertise</h2>
          <p className="text-xl text-foreground opacity-70 max-w-2xl mx-auto font-medium">We push the boundaries of what's possible on the web, combining aesthetic brilliance with technical mastery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MonitorSmartphone size={40} />, title: "Digital Design", desc: "Crafting visually stunning, user-centric interfaces that captivate and convert." },
            { icon: <PenTool size={40} />, title: "Brand Identity", desc: "Building powerful brand narratives through typography, color, and motion." },
            { icon: <Zap size={40} />, title: "Creative Dev", desc: "Bringing designs to life with smooth animations and cutting-edge web technologies." }
          ].map((feature, i) => (
            <div key={i} className="clay-panel p-10 flex flex-col items-start group hover:-translate-y-2 transition-transform duration-300">
              <div className="p-4 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl text-foreground mb-8 group-hover:bg-foreground group-hover:text-background transition-colors shadow-sm">
                {feature.icon}
              </div>
              <h3 className="font-display text-3xl text-foreground mb-4 tracking-wider">{feature.title}</h3>
              <p className="text-foreground opacity-70 text-lg leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Work */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4">Selected Work</h2>
            <p className="text-xl text-foreground opacity-70 max-w-xl font-medium">A glimpse into our latest and greatest visual creations.</p>
          </div>
          <Link to="/work" className="font-display text-xl uppercase tracking-widest text-foreground border-b border-[var(--glass-border)] hover:border-foreground pb-1 transition-all flex items-center gap-2">
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project) => (
            <Link to="/work" key={project.id} className="group cursor-pointer flex flex-col">
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
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--glass-bg)] skew-y-3 origin-top-left -z-10 border-y border-[var(--glass-border)]" />
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4">Client Love</h2>
              <p className="text-xl text-foreground opacity-70 max-w-xl font-medium">Don't just take our word for it. Here's what visionary leaders say about our work.</p>
            </div>
            <Link to="/work" className="font-display text-xl uppercase tracking-widest text-foreground border-b border-[var(--glass-border)] hover:border-foreground pb-1 transition-all">
              See Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "CMO, TechNova", text: "The redesign completely transformed our brand perception. We look like a billion-dollar company now." },
              { name: "Marcus Reed", role: "Founder, Studio X", text: "Bold, uncompromised, and technically flawless. They delivered exactly what we needed to stand out." },
              { name: "Elena Rostova", role: "Director, ArtBasel", text: "A rare mix of true artistic vision and digital execution. The final product exceeded all expectations." }
            ].map((testimonial, i) => (
              <div key={i} className="glass-panel p-10 rounded-3xl relative group">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10 mb-20">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl text-foreground mb-6">Invest in Boldness</h2>
          <p className="text-xl text-foreground opacity-70 max-w-2xl mx-auto font-medium">Transparent pricing for premium design services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col">
            <h3 className="font-display text-3xl text-foreground mb-2">Essential</h3>
            <div className="text-5xl font-display text-foreground mb-6">$5k<span className="text-xl text-foreground opacity-50 lowercase font-body font-bold">/project</span></div>
            <p className="text-foreground opacity-70 mb-8 pb-8 border-b border-[var(--glass-border)] font-medium">Perfect for emerging brands needing a strong foundation.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-foreground font-medium">
              {['Brand Identity', 'Landing Page', 'Basic Animations', '1 Week Delivery'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-foreground opacity-50"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 border border-[var(--glass-border)] rounded-full text-foreground font-bold hover:bg-foreground hover:text-background transition-all uppercase tracking-widest shadow-sm">Select</button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="clay-panel p-10 rounded-3xl flex flex-col transform md:scale-105 z-10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-background px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">Most Popular</div>
            <h3 className="font-display text-4xl text-foreground mb-2 mt-4">Pro</h3>
            <div className="text-6xl font-display text-foreground mb-6">$12k<span className="text-2xl text-foreground opacity-50 lowercase font-body font-bold">/project</span></div>
            <p className="text-foreground opacity-80 mb-8 pb-8 border-b border-[var(--glass-border)] font-medium">Comprehensive design system for growing companies.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-foreground font-medium">
              {['Full Website Redesign', 'Advanced 3D/Motion', 'Design System', 'Copywriting', '3 Weeks Delivery'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={20} className="text-blue-500"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-5 bg-foreground rounded-full text-background font-bold hover:shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-lg">Start Project</button>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col">
            <h3 className="font-display text-3xl text-foreground mb-2">Enterprise</h3>
            <div className="text-5xl font-display text-foreground mb-6">Custom</div>
            <p className="text-foreground opacity-70 mb-8 pb-8 border-b border-[var(--glass-border)] font-medium">Bespoke solutions for large organizations.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-foreground font-medium">
              {['Unlimited Pages', 'Custom WebGL', 'Dedicated Team', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-foreground opacity-50"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 border border-[var(--glass-border)] rounded-full text-foreground font-bold hover:bg-foreground hover:text-background transition-all uppercase tracking-widest shadow-sm">Let's Talk</button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center px-6 z-10 glass-panel border-x-0 mx-[-1rem]">
        <h2 className="font-display text-[clamp(3rem,8vw,120px)] leading-none text-foreground mb-8 tracking-tighter mix-blend-overlay">
          READY TO BE BOLD?
        </h2>
        <p className="text-2xl text-foreground opacity-80 max-w-2xl mx-auto mb-12 font-medium">
          Stop blending in. Let's create an experience that demands attention.
        </p>
        <Link to="/contact" className="inline-block px-12 py-6 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300">
          Start a Project
        </Link>
      </section>

    </div>
  );
}
