import { RouterProvider, createBrowserRouter, Outlet, Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight, Sun, Moon, PlayCircle, Volume2, VolumeX, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';
import ReadingProgress from './components/ReadingProgress';
import FloatingActionPill from './components/FloatingActionPill';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import { useUISound } from './hooks/useUISound';

// Social SVG Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { soundEnabled, toggleSound, tick } = useUISound();
  
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle theme toggling
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col font-body selection:bg-primary selection:text-white relative overflow-hidden transition-colors duration-500">
        
        {/* Global Components */}
        <CustomCursor />
        <ScrollToTop />
        <ReadingProgress />
        <FloatingActionPill />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            className: 'glass-panel !bg-background !text-foreground !rounded-full !px-6 !py-3',
            duration: 4000,
          }}
        />

        {/* Abstract background text across site */}
        <div className="bg-text-svg fixed inset-0 pointer-events-none">PORTFOLIO</div>

        <header className="fixed w-full top-0 z-50 glass-panel border-b-0 px-6 py-4 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="font-display text-4xl md:text-5xl tracking-wider text-foreground hover:scale-105 transition-transform origin-left">
              KENCER<span className="opacity-50">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors uppercase tracking-widest relative z-10"
                    onMouseEnter={tick}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {/* Sound Toggle Button */}
              <button 
                onClick={toggleSound}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>

              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/contact" className="px-6 py-3 border border-[var(--glass-border)] rounded-full text-foreground font-medium hover:bg-foreground hover:text-background transition-all uppercase tracking-wider text-sm flex items-center gap-2 magnetic-btn">
                Let's Talk <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                className="text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center pt-20"
            >
              <nav className="flex flex-col gap-8 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="font-display text-5xl text-foreground hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-grow pt-24 relative z-10 w-full flex flex-col">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

        {/* Curtain Reveal Footer Wrapper */}
        <div className="relative h-[500px] mt-20" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          <footer className="fixed bottom-0 w-full z-0 border-t border-[var(--glass-border)] pt-10 pb-10 px-6 h-[500px] bg-foreground text-background">
            
            {/* Massive Magnetic CTA */}
            <div className="max-w-7xl mx-auto text-center mb-12">
              <Link 
                to="/contact" 
                className="group inline-block"
                data-cursor-text="GO"
              >
                <motion.h2 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="font-display text-[clamp(3rem,10vw,120px)] leading-none uppercase tracking-tighter text-background opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  LET'S TALK
                </motion.h2>
              </Link>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
              <div className="col-span-1 md:col-span-2">
                <Link to="/" className="font-display text-4xl md:text-5xl tracking-wider text-background mb-6 block">
                  KENCER<span className="opacity-50">.</span>
                </Link>
                <p className="text-background/70 max-w-sm mb-8 text-lg font-medium">
                  We design bold, unforgettable digital experiences for visionary brands. Let's build something beautiful together.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/_kencer_" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://wa.me/919520544305" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all" aria-label="WhatsApp">
                    <WhatsappIcon />
                  </a>
                  <a href="mailto:ms6959826@gmail.com" className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all" aria-label="Email">
                    <Mail size={18} />
                  </a>
                  <a href="tel:+919520544305" className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:bg-background hover:text-foreground transition-all" aria-label="Phone">
                    <Phone size={18} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-display text-xl mb-6 text-background tracking-widest">Sitemap</h4>
                <ul className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-background/70 hover:text-background transition-colors font-medium">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display text-xl mb-6 text-background tracking-widest">Contact</h4>
                <ul className="flex flex-col gap-3">
                  <li><a href="mailto:ms6959826@gmail.com" className="text-background/70 hover:text-background transition-colors font-medium">ms6959826@gmail.com</a></li>
                  <li><a href="tel:+919520544305" className="text-background/70 hover:text-background transition-colors font-medium">+91 95205 44305</a></li>
                  <li><span className="text-background/70 font-medium">India</span></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/20 text-background/50 text-sm font-medium">
              <p>&copy; 2026 Kencer. All rights reserved.</p>
              <p>Designed with boldness.</p>
            </div>
          </footer>
        </div>
      </div>
    </SmoothScroll>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "work", Component: Work },
      { path: "contact", Component: Contact },
    ],
  },
]);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HelmetProvider>
      <Helmet>
        <title>KENCER | Digital Excellence</title>
        <meta name="description" content="We design bold, unforgettable digital experiences for visionary brands." />
      </Helmet>
      
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      {isLoaded && <RouterProvider router={router} />}
    </HelmetProvider>
  );
}
