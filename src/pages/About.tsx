export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <h1 className="font-display text-8xl md:text-[140px] text-foreground leading-none mb-12 uppercase mix-blend-overlay drop-shadow-sm">
        About Us
      </h1>
      <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl bg-[var(--glass-bg)] border-[var(--glass-border)]">
        <p className="text-2xl md:text-4xl text-foreground opacity-90 leading-relaxed font-medium">
          We are a digital design agency that doesn't compromise. We believe in bold colors, massive typography, and leaving a lasting impression.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--glass-border)] pt-12">
          <div>
            <div className="font-display text-5xl text-foreground mb-2">10+</div>
            <div className="text-foreground opacity-60 uppercase tracking-widest text-sm font-bold">Years Exp</div>
          </div>
          <div>
            <div className="font-display text-5xl text-foreground mb-2">200</div>
            <div className="text-foreground opacity-60 uppercase tracking-widest text-sm font-bold">Projects</div>
          </div>
          <div>
            <div className="font-display text-5xl text-foreground mb-2">15</div>
            <div className="text-foreground opacity-60 uppercase tracking-widest text-sm font-bold">Awards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
