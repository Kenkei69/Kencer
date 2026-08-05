import { RouterProvider, createBrowserRouter, Outlet, Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-white selection:text-primary relative overflow-hidden">
      {/* Universal Background Gradient handled by body in index.css */}
      
      {/* Abstract background text across site */}
      <div className="bg-text-svg fixed inset-0">PORTFOLIO</div>

      <header className="fixed w-full top-0 z-50 glass-panel border-b-0 border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-wider text-white">
            SUMNAY<span className="opacity-50">MEDIA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className="px-6 py-3 border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-primary transition-all uppercase tracking-wider text-sm flex items-center gap-2">
              Let's Talk <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center pt-20">
          <nav className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-display text-5xl text-white hover:opacity-70 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow pt-24 relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 glass-panel border-t border-white/10 pt-20 pb-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-display text-4xl tracking-wider text-white mb-6 block">
              SUMNAY<span className="opacity-50">MEDIA</span>
            </Link>
            <p className="text-white/70 max-w-sm mb-8 text-lg">
              We design bold, unforgettable digital experiences for visionary brands. Let's build something beautiful together.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white hover:text-primary transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-brush-stroke"></div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xl mb-6 text-white tracking-widest">Sitemap</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/70 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl mb-6 text-white tracking-widest">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/50 text-sm">
          <p>&copy; 2026 Sumnay Media. All rights reserved.</p>
          <p>Designed with boldness.</p>
        </div>
      </footer>
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
