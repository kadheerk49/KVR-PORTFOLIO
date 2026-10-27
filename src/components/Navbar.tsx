import { useState, useEffect, useRef } from 'react';
import GooeyNav from './GooeyNav';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const suppressSpy = useRef(false);
  const suppressTimer = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setPastHero(y > window.innerHeight * 0.55);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section tracking: on every scroll frame, the active section is the last
  // one whose top has crossed the viewport's center line. Unlike an
  // IntersectionObserver (which misses sections that are entered AND exited
  // between frames during fast scrolling), this can never skip a section in
  // either direction.
  useEffect(() => {
    const update = () => {
      if (suppressSpy.current) return;
      const center = window.innerHeight / 2;
      let idx = -1;
      for (let i = 0; i < navItems.length; i++) {
        const el = document.getElementById(navItems[i].href.slice(1));
        if (el && el.getBoundingClientRect().top <= center) idx = i;
      }
      setActiveIndex((prev) => (idx !== prev ? idx : prev));
    };
    // Compute synchronously per scroll event — cheap (5 rects) and immune to
    // frame-timing quirks, so no section can ever be skipped.
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    suppressSpy.current = true;
    if (suppressTimer.current) window.clearTimeout(suppressTimer.current);
    suppressTimer.current = window.setTimeout(() => {
      suppressSpy.current = false;
    }, 1000);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        pastHero ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav
        className={`w-full px-4 sm:px-12 py-3 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
      >
        <a href="#hero" className="hidden md:flex items-center gap-3 group shrink-0">
          <img
            src="images/kadheer_bright_3d_avatar_transparent.png"
            alt="Kadheer avatar"
            className="w-9 h-9 rounded-full object-cover object-top border border-white/20 group-hover:border-sky-400/50 transition-colors duration-300"
          />
          <span className="text-sm font-bold tracking-wide text-white whitespace-nowrap">
            KADHEER VEL RAJ N
          </span>
        </a>

        <div className={`flex-1 md:flex-none flex justify-center md:justify-end min-w-0 ${isMobile ? "gooey-mobile" : ""}`}>
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex}
            onChange={(index) => handleNavClick(index)}
            theme="dark"
            colors={['#38BDF8', '#A7F3D0', '#A855F7']}
            size={isMobile ? 'sm' : 'md'}
          />
        </div>
      </nav>
    </header>
  );
}
