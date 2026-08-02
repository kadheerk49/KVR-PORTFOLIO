import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className={`w-full px-6 sm:px-12 py-5 flex items-center justify-center transition-all duration-300 ${
          scrolled ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Centered Desktop Header Links */}
        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs sm:text-sm font-bold tracking-[0.25em] transition-all duration-300 uppercase ${
                  isActive ? 'text-white border-b-2 border-white pb-0.5 scale-105' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden w-full flex items-center justify-between">
          <a href="#hero" className="text-xs font-bold tracking-widest text-white uppercase">
            KADHEER
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 py-4 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 flex flex-col gap-3 text-center"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-[0.25em] text-white py-2 uppercase hover:text-sky-300"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
