export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <h1 className="font-display text-8xl md:text-[140px] text-white leading-none mb-12 uppercase">
        About Us
      </h1>
      <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl">
        <p className="text-2xl md:text-4xl text-white/90 leading-relaxed font-medium">
          We are a digital design agency that doesn't compromise. We believe in bold colors, massive typography, and leaving a lasting impression.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-12">
          <div>
            <div className="font-display text-5xl text-white mb-2">10+</div>
            <div className="text-white/60 uppercase tracking-widest text-sm">Years Exp</div>
          </div>
          <div>
            <div className="font-display text-5xl text-white mb-2">200</div>
            <div className="text-white/60 uppercase tracking-widest text-sm">Projects</div>
          </div>
          <div>
            <div className="font-display text-5xl text-white mb-2">15</div>
            <div className="text-white/60 uppercase tracking-widest text-sm">Awards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
