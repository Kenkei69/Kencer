export default function Work() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="font-display text-8xl md:text-[140px] text-white leading-none mb-16 uppercase">
        Our Work
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-white/10 rounded-2xl mb-6 overflow-hidden relative glass-panel">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-10">
                <span className="font-display text-3xl text-white uppercase tracking-widest">View Case</span>
              </div>
              {/* Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center opacity-30 font-display text-4xl text-white">Project {item}</div>
            </div>
            <h3 className="font-display text-4xl text-white mb-2 uppercase">Project {item}</h3>
            <p className="text-white/60 text-lg uppercase tracking-widest">Branding / Web</p>
          </div>
        ))}
      </div>
    </div>
  );
}
