import { RouterProvider, createBrowserRouter, Outlet, Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight, Sun, Moon, PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

import CustomCursor from './components/CustomCursor';
import ReadingProgress from './components/ReadingProgress';
import FloatingActionPill from './components/FloatingActionPill';

// Page Transition Wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
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
    <div className="min-h-screen flex flex-col font-body selection:bg-primary selection:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* Global Components */}
      <CustomCursor />
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
      <div className="bg-text-svg fixed inset-0">PORTFOLIO</div>

      <header className="fixed w-full top-0 z-50 glass-panel border-b-0 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-wider text-foreground hover:scale-105 transition-transform origin-left">
            SUMNAY<span className="opacity-50">MEDIA</span>
          </Link>

          {/* Desktop Nav - Mega Menu approach for Work could be added here */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors uppercase tracking-widest relative z-10"
                >
                  {link.name}
                </Link>
                {/* Mega Menu Dropdown for Work */}
                {link.name === 'Work' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-96 p-4 glass-panel rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/work" className="group/item flex flex-col gap-2">
                        <div className="w-full aspect-video rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                          <PlayCircle className="text-foreground opacity-50 group-hover/item:scale-110 group-hover/item:text-primary transition-all" size={32} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground text-center">Video</span>
                      </Link>
                      <Link to="/work" className="group/item flex flex-col gap-2">
                        <div className="w-full aspect-video rounded-lg bg-foreground/10 border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
                          <span className="font-display text-2xl text-foreground opacity-50 group-hover/item:scale-110 group-hover/item:text-primary transition-all">G</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground text-center">Graphics</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
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
      <div className="relative h-[400px] mt-20" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <footer className="fixed bottom-0 w-full z-0 glass-panel border-t border-[var(--glass-border)] pt-20 pb-10 px-6 h-[400px]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="font-display text-4xl tracking-wider text-foreground mb-6 block">
                SUMNAY<span className="opacity-50">MEDIA</span>
              </Link>
              <p className="text-foreground-muted max-w-sm mb-8 text-lg font-medium">
                We design bold, unforgettable digital experiences for visionary brands. Let's build something beautiful together.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                  <a key={social} href="#" className="w-12 h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-foreground-muted hover:bg-foreground hover:text-background transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current mask-brush-stroke"></div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-xl mb-6 text-foreground tracking-widest">Sitemap</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-foreground-muted hover:text-foreground transition-colors font-medium">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xl mb-6 text-foreground tracking-widest">Legal</h4>
              <ul className="flex flex-col gap-3">
                <li><a href="#" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Privacy Policy</a></li>
                <li><a href="#" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Terms of Service</a></li>
                <li><a href="#" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--glass-border)] text-foreground-muted text-sm font-medium">
            <p>&copy; 2026 Sumnay Media. All rights reserved.</p>
            <p>Designed with boldness.</p>
          </div>
        </footer>
      </div>
    </div>
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
  return <RouterProvider router={router} />;
}
