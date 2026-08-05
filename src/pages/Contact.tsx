export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[80vh] flex flex-col md:flex-row gap-20 items-center">
      <div className="flex-1">
        <h1 className="font-display text-8xl md:text-[120px] text-foreground leading-none mb-8 uppercase mix-blend-overlay drop-shadow-sm">
          Let's Talk
        </h1>
        <p className="text-3xl text-foreground opacity-80 font-medium mb-12">
          Ready to make something bold? Drop us a line.
        </p>
        <div className="flex flex-col gap-4 text-xl text-foreground font-medium">
          <a href="mailto:hello@sumnaymedia.com" className="hover:opacity-70 transition-opacity w-fit">hello@sumnaymedia.com</a>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="flex-1 w-full">
        <form className="glass-panel p-10 rounded-3xl flex flex-col gap-6">
          <div>
            <label className="block font-display text-xl text-foreground mb-2 uppercase tracking-widest">Name</label>
            <input type="text" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-6 py-4 text-foreground placeholder-foreground/40 outline-none focus:border-foreground transition-colors shadow-inner" placeholder="John Doe" />
          </div>
          <div>
            <label className="block font-display text-xl text-foreground mb-2 uppercase tracking-widest">Email</label>
            <input type="email" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-6 py-4 text-foreground placeholder-foreground/40 outline-none focus:border-foreground transition-colors shadow-inner" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block font-display text-xl text-foreground mb-2 uppercase tracking-widest">Message</label>
            <textarea rows={4} className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-6 py-4 text-foreground placeholder-foreground/40 outline-none focus:border-foreground transition-colors shadow-inner" placeholder="Tell us about your project..."></textarea>
          </div>
          <button type="button" className="w-full mt-4 py-5 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-xl hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
