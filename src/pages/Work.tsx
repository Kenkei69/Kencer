import { useState, useMemo } from 'react';
import { X, ZoomIn, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '../data/projects';
import { videosData, VideoProject } from '../data/videos';

type CombinedProject = (Project | VideoProject) & { isVideo: boolean };

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<CombinedProject | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const allProjects: CombinedProject[] = useMemo(() => {
    const graphics = projectsData.map(p => ({ ...p, isVideo: false }));
    const videos = videosData.map(v => ({ ...v, isVideo: true }));
    return [...graphics, ...videos];
  }, []);

  const categories = ['All', 'Graphic Design', 'Commercial', 'Event / Showcase', 'Documentary / Promo'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allProjects;
    
    // Group graphics under "Graphic Design"
    if (activeFilter === 'Graphic Design') return allProjects.filter(p => !p.isVideo);
    
    return allProjects.filter(p => p.category === activeFilter);
  }, [allProjects, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="font-display text-[clamp(4rem,10vw,140px)] text-foreground leading-none mb-6 uppercase tracking-tighter mix-blend-overlay relative z-10 drop-shadow-sm">
          Our Work
        </h1>
        <p className="text-2xl text-foreground opacity-70 max-w-2xl font-medium">
          A curated selection of our finest visual identities, campaigns, and digital experiences.
        </p>
      </motion.div>

      {/* Filter Pills */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 mb-16"
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
              activeFilter === category 
                ? 'bg-foreground text-background shadow-lg scale-105' 
                : 'glass-panel text-foreground opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Staggered Grid Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 auto-rows-[400px]">
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={project.id} 
              className={`group cursor-pointer flex flex-col h-full ${project.span || ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="w-full h-full bg-[var(--glass-bg)] rounded-3xl overflow-hidden relative glass-panel mb-6">
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-10">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
                      {project.isVideo ? <PlayCircle size={24} /> : <ZoomIn size={24} />}
                    </div>
                    <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">{project.title}</h3>
                    <p className="text-white opacity-90 text-lg">{project.description}</p>
                  </div>
                </div>
                
                {/* Media */}
                {project.isVideo ? (
                  <video 
                    src={(project as VideoProject).videoUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img 
                    src={(project as Project).image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Mobile Title */}
              <div className="md:hidden">
                <h3 className="font-display text-3xl text-foreground mb-1 uppercase flex items-center gap-2">
                  {project.title}
                  {project.isVideo && <PlayCircle size={20} className="text-primary" />}
                </h3>
                <p className="text-foreground opacity-50 text-sm uppercase tracking-widest">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground opacity-50 hover:opacity-100 transition-colors z-[110] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-4 hover:bg-[var(--glass-border)] hover:scale-110"
              onClick={() => setSelectedProject(null)}
            >
              <X size={32} />
            </button>

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-[105] max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center bg-[var(--glass-bg)] p-4 rounded-3xl border border-[var(--glass-border)] glass-panel shadow-2xl"
            >
              <div className="w-full md:w-2/3 h-[50vh] md:h-[75vh] rounded-2xl overflow-hidden relative glass-panel p-2 flex items-center justify-center bg-black/5">
                {selectedProject.isVideo ? (
                  <video 
                    src={(selectedProject as VideoProject).videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain rounded-xl shadow-lg"
                  />
                ) : (
                  <img 
                    src={(selectedProject as Project).image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain rounded-xl shadow-lg"
                  />
                )}
              </div>
              
              <div className="w-full md:w-1/3 p-6 md:p-10 flex flex-col justify-center">
                <span className="text-blue-500 font-bold uppercase tracking-widest mb-4 text-sm flex items-center gap-2">
                  {selectedProject.isVideo && <PlayCircle size={16} />}
                  {selectedProject.category}
                </span>
                <h2 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tighter mb-6 leading-none">
                  {selectedProject.title}
                </h2>
                <p className="text-xl text-foreground opacity-70 leading-relaxed mb-10 font-medium">
                  {selectedProject.description}
                </p>
                
                <button 
                  className="px-8 py-4 bg-foreground text-background rounded-full font-display uppercase tracking-widest text-xl hover:opacity-90 hover:scale-105 transition-all w-fit shadow-lg magnetic-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Close Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
