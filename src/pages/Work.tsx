import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, PlayCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { projectsData, Project } from '../data/projects';
import { videosData, VideoProject } from '../data/videos';

type CombinedProject = (Project | VideoProject) & { isVideo: boolean };

// Parallax Project Card
function ProjectCard({ project, onClick, index }: { project: CombinedProject, onClick: () => void, index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Create a slight parallax effect for the image/video inside the card container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={`group cursor-pointer flex flex-col h-full w-full ${project.span || ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={cardRef}
        className="w-full h-[500px] md:h-[600px] bg-[var(--glass-bg)] rounded-[2rem] overflow-hidden relative glass-panel mb-6"
      >
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        
        {/* Center Icon */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none">
          <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
            {project.isVideo ? <PlayCircle size={32} /> : <ZoomIn size={32} />}
          </div>
        </div>
        
        {/* Media with Parallax */}
        <motion.div style={{ y, height: "120%" }} className="absolute inset-0 -top-[10%] w-full">
          {project.isVideo ? (
            <video 
              src={(project as VideoProject).videoUrl}
              className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
              autoPlay={isHovered}
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={(project as Project).image} 
              alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
              loading="lazy"
            />
          )}
        </motion.div>
      </div>
      
      {/* Title Area */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="font-display text-4xl text-foreground mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-foreground opacity-60 text-sm uppercase tracking-widest font-bold">{project.category}</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowUpRight className="text-foreground" />
        </div>
      </div>
    </motion.div>
  );
}

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
    if (activeFilter === 'Graphic Design') return allProjects.filter(p => !p.isVideo);
    return allProjects.filter(p => p.category === activeFilter);
  }, [allProjects, activeFilter]);

  return (
    <div className="w-full bg-background pb-32">
      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h1 className="font-display text-[clamp(4rem,10vw,140px)] text-foreground leading-[0.8] uppercase tracking-tighter mix-blend-overlay relative z-10 drop-shadow-sm mb-6">
              Selected <br/> Work
            </h1>
            <p className="text-2xl text-foreground opacity-70 max-w-xl font-medium leading-relaxed">
              A curated archive of our finest visual identities, campaigns, and immersive digital experiences.
            </p>
          </div>
          
          {/* Filter Pills - Magnetic / Animated */}
          <div className="flex flex-wrap gap-3 md:justify-end max-w-lg">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 relative ${
                  activeFilter === category 
                    ? 'text-background' 
                    : 'text-foreground opacity-70 hover:opacity-100 hover:bg-foreground/5'
                }`}
              >
                {activeFilter === category && (
                  <motion.div 
                    layoutId="activeFilter" 
                    className="absolute inset-0 bg-foreground rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Masonry-like Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <div key={project.id} className={`${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                <ProjectCard 
                  project={project} 
                  index={i} 
                  onClick={() => setSelectedProject(project)} 
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox / Modal (Rendered via Portal) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
              <div 
                className="absolute inset-0 bg-background/95 backdrop-blur-2xl" 
                onClick={() => setSelectedProject(null)}
              />
              
              <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground opacity-50 hover:opacity-100 transition-colors z-[110] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-4 hover:bg-foreground hover:text-background hover:scale-110 duration-300"
                onClick={() => setSelectedProject(null)}
              >
                <X size={32} />
              </button>

              <motion.div 
                layoutId={`project-${selectedProject.id}`}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-[105] max-w-7xl w-full flex flex-col lg:flex-row gap-0 items-stretch bg-[var(--glass-bg)] rounded-[3rem] border border-[var(--glass-border)] glass-panel shadow-[0_0_100px_rgba(0,0,0,0.2)] max-h-[95vh] overflow-hidden"
              >
                <div className="w-full lg:w-2/3 h-[40vh] lg:h-[85vh] relative bg-black shrink-0">
                  {selectedProject.isVideo ? (
                    <video 
                      src={(selectedProject as VideoProject).videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={(selectedProject as Project).image} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="w-full lg:w-1/3 p-10 md:p-16 flex flex-col justify-center bg-background/50 overflow-y-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] font-bold uppercase tracking-widest mb-8 text-xs w-fit">
                    {selectedProject.isVideo && <PlayCircle size={14} className="text-primary" />}
                    {selectedProject.category}
                  </span>
                  
                  <h2 className="font-display text-5xl md:text-6xl text-foreground uppercase tracking-tighter mb-8 leading-none">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-xl text-foreground opacity-80 leading-relaxed mb-12 font-medium">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      className="w-full py-5 bg-foreground text-background rounded-2xl font-display uppercase tracking-widest text-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
