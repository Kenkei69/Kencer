import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields to make magic happen.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast.success(
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-500" />
          <span>Message received! We'll be in touch shortly.</span>
        </div>
      );
    }, 1500);
  };

  const inputClasses = "w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-6 py-4 text-foreground placeholder-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner focus:shadow-lg";

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[80vh] flex flex-col md:flex-row gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h1 className="font-display text-8xl md:text-[120px] text-foreground leading-none mb-8 uppercase mix-blend-overlay drop-shadow-sm">
          Let's Talk
        </h1>
        <p className="text-3xl text-foreground opacity-80 font-medium mb-12">
          Ready to make something bold? Drop us a line.
        </p>
        <div className="flex flex-col gap-4 text-xl text-foreground font-medium">
          <a href="mailto:hello@kencer.com" className="hover:opacity-70 transition-opacity w-fit relative group">
            hello@kencer.com
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
          </a>
          <p className="opacity-70">+1 (555) 123-4567</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-3xl flex flex-col gap-6 relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-widest opacity-80">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={inputClasses} 
              placeholder="John Doe" 
            />
          </div>
          <div className="relative z-10">
            <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-widest opacity-80">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={inputClasses} 
              placeholder="john@example.com" 
            />
          </div>
          <div className="relative z-10">
            <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-widest opacity-80">Message</label>
            <textarea 
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className={inputClasses} 
              placeholder="Tell us about your project..."
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="relative z-10 w-full mt-4 py-5 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 magnetic-btn overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
