import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message received. We will be in touch shortly.');
    }, 1500);
  };

  const InputField = ({ label, type = "text", name, textarea = false }: any) => {
    const isFilled = formData[name as keyof typeof formData].length > 0;
    
    return (
      <div className="relative mb-8 group">
        {textarea ? (
          <textarea
            required
            id={name}
            value={formData[name as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            className="w-full bg-transparent border-b-2 border-foreground/20 py-4 text-xl text-foreground focus:outline-none focus:border-primary transition-colors resize-none peer min-h-[120px]"
          />
        ) : (
          <input
            type={type}
            required
            id={name}
            value={formData[name as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            className="w-full bg-transparent border-b-2 border-foreground/20 py-4 text-xl text-foreground focus:outline-none focus:border-primary transition-colors peer"
          />
        )}
        <label 
          htmlFor={name}
          className={`absolute left-0 text-foreground opacity-50 font-medium transition-all duration-300 pointer-events-none ${
            isFilled ? '-top-6 text-sm opacity-100 text-primary' : 'top-4 text-xl peer-focus:-top-6 peer-focus:text-sm peer-focus:opacity-100 peer-focus:text-primary'
          }`}
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background w-full">
      
      {/* Left Side - Typography & Vibe */}
      <div className="w-full lg:w-1/2 p-10 md:p-20 flex flex-col justify-between relative overflow-hidden bg-foreground text-background">
        {/* Subtle animated background shapes */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-full aspect-square bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[150%] aspect-square bg-blue-500/20 rounded-[40%] blur-[120px]"
        />

        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(4rem,8vw,120px)] leading-[0.85] uppercase tracking-tighter mb-12"
          >
            Let's Build <br/>
            <span className="text-primary">Something</span> <br/>
            Beautiful.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl opacity-80 max-w-md font-medium leading-relaxed"
          >
            We partner with visionary brands to create digital experiences that dominate. 
          </motion.p>
        </div>

        <div className="relative z-10 mt-20 flex flex-col sm:flex-row gap-12">
          <div>
            <h4 className="font-display text-xl uppercase tracking-widest mb-4 opacity-50">Local Time (IST)</h4>
            <div className="font-mono text-3xl font-bold">{timeString}</div>
          </div>
          <div>
            <h4 className="font-display text-xl uppercase tracking-widest mb-4 opacity-50">Status</h4>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xl font-medium">Accepting New Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 p-10 md:p-20 flex items-center justify-center relative">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="w-full"
              >
                <div className="mb-16">
                  <h2 className="font-display text-5xl uppercase tracking-tighter mb-4 text-foreground">Project Inquiry</h2>
                  <p className="text-foreground opacity-60 text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <InputField label="What's your name?" name="name" />
                <InputField label="What's your email address?" type="email" name="email" />
                <InputField label="Company / Brand name" name="company" />
                <InputField label="Tell us about your project" name="message" textarea />

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 px-10 py-6 bg-foreground text-background font-display text-2xl tracking-widest uppercase rounded-2xl transition-all duration-300 flex items-center justify-between group overflow-hidden relative"
                >
                  <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  
                  <div className="relative z-10 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Liquid fill effect on hover */}
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 size={64} />
                </div>
                <h2 className="font-display text-6xl uppercase tracking-tighter mb-6 text-foreground">Message Received</h2>
                <p className="text-2xl text-foreground opacity-70 mb-12">We've received your inquiry and will be in touch shortly to discuss how we can elevate your brand.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-4 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-foreground font-bold tracking-widest uppercase rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Contact Info */}
          <div className="mt-20 pt-10 border-t border-[var(--glass-border)] grid grid-cols-1 sm:grid-cols-2 gap-8">
            <a href="mailto:ms6959826@gmail.com" className="flex items-center gap-4 text-foreground opacity-70 hover:opacity-100 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10">
                <Mail size={20} />
              </div>
              <span className="font-medium text-lg">ms6959826@gmail.com</span>
            </a>
            
            <a href="tel:+919520544305" className="flex items-center gap-4 text-foreground opacity-70 hover:opacity-100 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10">
                <Phone size={20} />
              </div>
              <span className="font-medium text-lg">+91 95205 44305</span>
            </a>

            <a href="https://wa.me/919520544305" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground opacity-70 hover:opacity-100 hover:text-green-500 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-green-500/10">
                <WhatsappIcon />
              </div>
              <span className="font-medium text-lg">WhatsApp Us</span>
            </a>

            <a href="https://www.instagram.com/_kencer_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground opacity-70 hover:opacity-100 hover:text-pink-500 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-pink-500/10">
                <InstagramIcon />
              </div>
              <span className="font-medium text-lg">@_kencer_</span>
            </a>

            <div className="flex items-center gap-4 text-foreground opacity-70 sm:col-span-2 mt-4">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <span className="font-medium text-lg">India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
