import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { projectsData, Project } from '../data/projects';

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <div className="mb-20">
        <h1 className="font-display text-[clamp(4rem,10vw,140px)] text-foreground leading-none mb-6 uppercase tracking-tighter mix-blend-overlay relative z-10 drop-shadow-sm">
          Our Work
        </h1>
        <p className="text-2xl text-foreground opacity-70 max-w-2xl font-medium">
          A curated selection of our finest visual identities, campaigns, and digital experiences.
        </p>
      </div>

      {/* Staggered Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 auto-rows-[400px]">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className={`group cursor-pointer flex flex-col h-full ${project.span || ''}`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="w-full h-full bg-[var(--glass-bg)] rounded-3xl overflow-hidden relative glass-panel mb-6">
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-10">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <ZoomIn size={24} />
                  </div>
                  <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">{project.title}</h3>
                  <p className="text-white opacity-90 text-lg">{project.description}</p>
                </div>
              </div>
              
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            
            {/* Mobile Title (hidden on hover on desktop since overlay shows it) */}
            <div className="md:hidden">
              <h3 className="font-display text-3xl text-foreground mb-1 uppercase">{project.title}</h3>
              <p className="text-foreground opacity-50 text-sm uppercase tracking-widest">{project.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop - adaptive blur */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
            onClick={() => setSelectedProject(null)}
          />
          
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground opacity-50 hover:opacity-100 transition-colors z-[110] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-4 hover:bg-[var(--glass-border)]"
            onClick={() => setSelectedProject(null)}
          >
            <X size={32} />
          </button>

          {/* Modal Content */}
          <div className="relative z-[105] max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center bg-[var(--glass-bg)] p-4 rounded-3xl border border-[var(--glass-border)] glass-panel shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="w-full md:w-2/3 h-[50vh] md:h-[75vh] rounded-2xl overflow-hidden relative glass-panel p-2">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="w-full md:w-1/3 p-6 md:p-10 flex flex-col justify-center">
              <span className="text-blue-500 font-bold uppercase tracking-widest mb-4 text-sm">
                {selectedProject.category}
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tighter mb-6 leading-none">
                {selectedProject.title}
              </h2>
              <p className="text-xl text-foreground opacity-70 leading-relaxed mb-10 font-medium">
                {selectedProject.description}
              </p>
              
              <button 
                className="px-8 py-4 bg-foreground text-background rounded-full font-display uppercase tracking-widest text-xl hover:opacity-90 hover:scale-105 transition-all w-fit shadow-lg"
                onClick={() => setSelectedProject(null)}
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
