import { ArrowRight, CheckCircle2, Star, Zap, MonitorSmartphone, PenTool } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 overflow-hidden px-4">
        
        {/* Background Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blob-glow -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blob-glow translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none bg-[#1d4ed8]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          
          <h1 className="font-display text-[var(--display-size)] leading-[0.85] text-white tracking-tighter mb-6 mix-blend-overlay relative z-30">
            DIGITAL
            <br />
            EXCELLENCE
          </h1>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-[300px] h-[400px] md:w-[450px] md:h-[600px] mask-brush-stroke overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Portrait" 
                className="w-full h-full object-cover object-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent mix-blend-multiply" />
            </div>
          </div>

          <p className="mt-40 md:mt-24 text-xl md:text-2xl text-white/90 max-w-3xl font-medium z-30">
            Elevating brands through premium advertising, immersive digital experiences, and unapologetic creativity.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center z-30">
            <Link to="/contact" className="px-8 py-5 bg-white text-primary font-display text-2xl tracking-widest uppercase rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300 flex items-center gap-3">
              Get Your Own Ad <ArrowRight size={24} />
            </Link>
            <Link to="/work" className="px-8 py-5 border border-white/30 text-white font-display text-2xl tracking-widest uppercase rounded-full hover:bg-white/10 transition-all duration-300">
              View Work
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-4 z-30 text-white/70 text-sm font-medium tracking-wide uppercase">
            <div className="flex gap-1">
               <Star size={16} fill="currentColor" className="text-blue-400" />
               <Star size={16} fill="currentColor" className="text-blue-400" />
               <Star size={16} fill="currentColor" className="text-blue-400" />
               <Star size={16} fill="currentColor" className="text-blue-400" />
               <Star size={16} fill="currentColor" className="text-blue-400" />
            </div>
            <span>Trusted by 200+ Premium Brands</span>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="absolute bottom-0 left-0 w-full glass-panel py-6 z-30 overflow-hidden">
          <div className="flex gap-16 animate-[pulse_4s_ease-in-out_infinite] px-8 items-center justify-center w-full max-w-7xl mx-auto opacity-70">
            {['VOGUE', 'WIRED', 'FORBES', 'GQ', 'FAST COMPANY'].map((brand, i) => (
              <span key={i} className="font-display text-3xl md:text-4xl tracking-widest text-white/50">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl text-white mb-6">Expertise</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">We push the boundaries of what's possible on the web, combining aesthetic brilliance with technical mastery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MonitorSmartphone size={40} />, title: "Digital Design", desc: "Crafting visually stunning, user-centric interfaces that captivate and convert." },
            { icon: <PenTool size={40} />, title: "Brand Identity", desc: "Building powerful brand narratives through typography, color, and motion." },
            { icon: <Zap size={40} />, title: "Creative Dev", desc: "Bringing designs to life with smooth animations and cutting-edge web technologies." }
          ].map((feature, i) => (
            <div key={i} className="clay-panel p-10 flex flex-col items-start group hover:-translate-y-2 transition-transform duration-300">
              <div className="p-4 bg-white/10 rounded-2xl text-white mb-8 group-hover:bg-white group-hover:text-primary transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-display text-3xl text-white mb-4 tracking-wider">{feature.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 skew-y-3 origin-top-left -z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-6xl md:text-8xl text-white mb-4">Client Love</h2>
              <p className="text-xl text-white/70 max-w-xl">Don't just take our word for it. Here's what visionary leaders say about our work.</p>
            </div>
            <Link to="/work" className="font-display text-xl uppercase tracking-widest text-white border-b border-white/30 hover:border-white pb-1 transition-all">
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
                <div className="flex text-white mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" className="opacity-80" />)}
                </div>
                <p className="text-xl text-white/90 mb-8 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20" />
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider">{testimonial.name}</h4>
                    <span className="text-white/60 text-sm">{testimonial.role}</span>
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
          <h2 className="font-display text-6xl md:text-8xl text-white mb-6">Invest in Boldness</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Transparent pricing for premium design services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col">
            <h3 className="font-display text-3xl text-white mb-2">Essential</h3>
            <div className="text-5xl font-display text-white mb-6">$5k<span className="text-xl text-white/50 lowercase font-body">/project</span></div>
            <p className="text-white/70 mb-8 pb-8 border-b border-white/10">Perfect for emerging brands needing a strong foundation.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-white/80">
              {['Brand Identity', 'Landing Page', 'Basic Animations', '1 Week Delivery'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white/50"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 border border-white/30 rounded-full text-white font-bold hover:bg-white hover:text-primary transition-all uppercase tracking-widest">Select</button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="clay-panel p-10 rounded-3xl flex flex-col transform scale-105 shadow-2xl bg-white/20 border border-white/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">Most Popular</div>
            <h3 className="font-display text-4xl text-white mb-2">Pro</h3>
            <div className="text-6xl font-display text-white mb-6">$12k<span className="text-2xl text-white/50 lowercase font-body">/project</span></div>
            <p className="text-white/80 mb-8 pb-8 border-b border-white/20">Comprehensive design system for growing companies.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-white/90">
              {['Full Website Redesign', 'Advanced 3D/Motion', 'Design System', 'Copywriting', '3 Weeks Delivery'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={20} className="text-white"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-5 bg-white rounded-full text-primary font-bold hover:shadow-lg hover:scale-105 transition-all uppercase tracking-widest text-lg">Start Project</button>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col">
            <h3 className="font-display text-3xl text-white mb-2">Enterprise</h3>
            <div className="text-5xl font-display text-white mb-6">Custom</div>
            <p className="text-white/70 mb-8 pb-8 border-b border-white/10">Bespoke solutions for large organizations.</p>
            <ul className="flex flex-col gap-4 mb-8 flex-grow text-white/80">
              {['Unlimited Pages', 'Custom WebGL', 'Dedicated Team', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white/50"/> {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 border border-white/30 rounded-full text-white font-bold hover:bg-white hover:text-primary transition-all uppercase tracking-widest">Let's Talk</button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center px-6 z-10">
        <h2 className="font-display text-[clamp(3rem,8vw,120px)] leading-none text-white mb-8 tracking-tighter">
          READY TO BE BOLD?
        </h2>
        <p className="text-2xl text-white/80 max-w-2xl mx-auto mb-12">
          Stop blending in. Let's create an experience that demands attention.
        </p>
        <Link to="/contact" className="inline-block px-12 py-6 bg-white text-primary font-display text-2xl tracking-widest uppercase rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300">
          Start a Project
        </Link>
      </section>

    </div>
  );
}
