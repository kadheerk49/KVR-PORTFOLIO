import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

/* Particle-burst pill: the active link gets a white pill that pops into place
   while blurred particles scatter out and reassemble into it (goo filter).
   Overlay text clone sits above the pill so the label stays crisp. */
const pillCSS = `
  .effect {
    position: absolute;
    pointer-events: none;
    display: grid;
    place-items: center;
    z-index: 1;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 12px;
  }
  @media (min-width: 640px) {
    .effect { font-size: 14px; }
  }
  .effect.text {
    color: #E2EDF8;
    transition: color 0.3s ease;
  }
  .effect.text.active {
    color: #0C0C0C;
  }
  .effect.filter {
    filter: blur(7px) contrast(100) blur(0);
    mix-blend-mode: lighten;
  }
  .effect.filter::before {
    content: "";
    position: absolute;
    inset: -16px;
    z-index: -2;
    background: black;
  }
  .effect.filter::after {
    content: "";
    position: absolute;
    inset: 0;
    background: #ffffff;
    transform: scale(0);
    opacity: 0;
    z-index: -1;
    border-radius: 9999px;
  }
  .effect.active::after {
    animation: pill-pop 0.3s ease both;
  }
  @keyframes pill-pop {
    to { transform: scale(1); opacity: 1; }
  }
  .particle,
  .point {
    display: block;
    opacity: 0;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    transform-origin: center;
  }
  .particle {
    --time: 5s;
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    animation: particle calc(var(--time)) ease 1 -350ms;
  }
  .point {
    background: var(--color);
    opacity: 1;
    animation: point calc(var(--time)) ease 1 -350ms;
  }
  @keyframes particle {
    0% {
      transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
      opacity: 1;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    70% {
      transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
      opacity: 1;
    }
    100% {
      transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
      opacity: 1;
    }
  }
  @keyframes point {
    0% {
      transform: scale(0);
      opacity: 0;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    25% {
      transform: scale(calc(var(--scale) * 1.2));
      opacity: 1;
    }
    100% {
      transform: scale(calc(var(--scale)));
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .effect.active::after {
      animation: none;
      transform: scale(1);
      opacity: 1;
    }
  }
`;

interface NavPillProps {
  activeIndex: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  navRef: React.RefObject<HTMLUListElement | null>;
  reduceMotion: boolean;
}

function NavPill({ activeIndex, containerRef, navRef, reduceMotion }: NavPillProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const nav = navRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    if (!container || !nav || !filter || !text) return;

    // No active section (hero in view): hide the pill entirely
    if (activeIndex < 0) {
      filter.style.display = 'none';
      text.style.display = 'none';
      filter.classList.remove('active');
      text.classList.remove('active');
      return;
    }
    filter.style.display = '';
    text.style.display = '';

    const place = () => {
      const link = nav.querySelectorAll('li > a')[activeIndex] as HTMLElement | undefined;
      if (!link) return;
      const cRect = container.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const pos = {
        left: `${r.x - cRect.x}px`,
        top: `${r.y - cRect.y}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      };
      Object.assign(filter.style, pos);
      Object.assign(text.style, pos);
      text.innerText = link.innerText;
    };

    place();

    if (reduceMotion) {
      filter.classList.add('active');
      text.classList.add('active');
      return;
    }

    // Replay the pill pop on the text layer
    text.classList.remove('active');
    void text.offsetWidth;
    text.classList.add('active');

    // Scatter particles out of the old pill and reassemble into the new one
    filter.querySelectorAll('.particle').forEach((p) => p.remove());
    filter.classList.remove('active');
    void filter.offsetWidth;

    const jitter = (n: number) => n / 2 - Math.random() * n;
    const polar = (radius: number, i: number, count: number): [number, number] => {
      const angle = ((360 + jitter(8)) / count) * i * (Math.PI / 180);
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
    };

    const timers: number[] = [];
    for (let i = 0; i < 8; i++) {
      const time = 1000 + jitter(600);
      const start = polar(90, 8 - i, 8);
      const end = polar(10 + jitter(7), 8 - i, 8);
      const rot = jitter(10);
      const rotate = rot > 0 ? (rot + 5) * 10 : (rot - 5) * 10;
      const scale = 1 + jitter(0.2);

      timers.push(
        window.setTimeout(() => {
          if (!filterRef.current) return;
          const p = document.createElement('span');
          p.classList.add('particle');
          p.style.setProperty('--start-x', `${start[0]}px`);
          p.style.setProperty('--start-y', `${start[1]}px`);
          p.style.setProperty('--end-x', `${end[0]}px`);
          p.style.setProperty('--end-y', `${end[1]}px`);
          p.style.setProperty('--time', `${time}ms`);
          p.style.setProperty('--scale', `${scale}`);
          p.style.setProperty('--rotate', `${rotate}deg`);
          p.style.setProperty('--color', '#ffffff');
          const point = document.createElement('span');
          point.classList.add('point');
          p.appendChild(point);
          filter.appendChild(p);
          requestAnimationFrame(() => filter.classList.add('active'));
          timers.push(
            window.setTimeout(() => {
              try {
                filter.removeChild(p);
              } catch {
                /* already removed */
              }
            }, time)
          );
        }, 30)
      );
    }

    // Keep the pill glued to the active link on resize / font shifts
    const ro = new ResizeObserver(() => place());
    ro.observe(container);
    nav.querySelectorAll('li > a').forEach((a) => ro.observe(a));

    return () => {
      timers.forEach(clearTimeout);
      ro.disconnect();
    };
  }, [activeIndex, reduceMotion, containerRef, navRef]);

  return (
    <>
      <style>{pillCSS}</style>
      <div ref={filterRef} className="effect filter" aria-hidden="true" />
      <div ref={textRef} className="effect text" aria-hidden="true" />
    </>
  );
}

/* Dock-style link: magnifies toward the cursor like the macOS dock */
interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  skipMagnify: boolean;
  onSelect: () => void;
}

function NavLink({ label, href, isActive, mouseX, skipMagnify, onSelect }: NavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (x: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Number.POSITIVE_INFINITY;
    return x - rect.x - rect.width / 2;
  });
  const scaleRaw = useTransform(distance, [-100, 0, 100], [1, 1.25, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <li>
      <a
        ref={ref}
        href={href}
        onClick={onSelect}
        className={`block relative z-[3] px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-full transition-colors duration-300 ${
          isActive ? 'text-slate-950' : 'text-slate-400 hover:text-white'
        }`}
      >
        <motion.span
          style={{ scale: skipMagnify ? 1 : scale }}
          className="inline-block origin-center"
        >
          {label}
        </motion.span>
      </a>
    </li>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const suppressSpy = useRef(false);
  const suppressTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reduceMotion = !!useReducedMotion();

  useEffect(() => {
    setHoverable(window.matchMedia('(hover: hover)').matches);
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

  // Section tracking: whichever section crosses the viewport's vertical
  // center line becomes active — one stable value, no flicker while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressSpy.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveIndex(navItems.findIndex((n) => n.href === `#${entry.target.id}`));
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    // Hero has no nav item: crossing its center clears the active pill
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);
    navItems.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
        className={`w-full px-6 sm:px-12 py-4 flex items-center transition-all duration-300 ${
          scrolled ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Desktop Header: brand left, particle-pill nav right */}
        <div className="hidden md:flex items-center w-full justify-between gap-8">
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <img
              src="images/kadheer_bright_3d_avatar_transparent.png"
              alt="Kadheer avatar"
              className="w-9 h-9 rounded-full object-cover object-top border border-white/20 group-hover:border-sky-400/50 transition-colors duration-300"
            />
            <span className="text-sm font-bold tracking-wide text-white whitespace-nowrap">
              KADHEER VEL RAJ N
            </span>
          </a>

          <div ref={containerRef} className="relative w-fit overflow-hidden rounded-full bg-[#0C0C0C] px-2 py-2">
            <ul
              ref={navRef}
              className="relative z-[3] flex items-center gap-1"
              onMouseMove={(e) => {
                if (!reduceMotion && hoverable) mouseX.set(e.clientX);
              }}
              onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
            >
              {navItems.map((item, index) => (
                <NavLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  isActive={activeIndex === index}
                  mouseX={mouseX}
                  skipMagnify={reduceMotion || !hoverable}
                  onSelect={() => handleNavClick(index)}
                />
              ))}
            </ul>
            <NavPill
              activeIndex={activeIndex}
              containerRef={containerRef}
              navRef={navRef}
              reduceMotion={reduceMotion}
            />
          </div>
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
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 my-2 px-6 py-5 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl flex flex-col gap-4 text-center shadow-2xl"
          >
            {navItems.map((item) => {
              const isActive = activeIndex === navItems.findIndex((n) => n.href === item.href);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    handleNavClick(navItems.findIndex((n) => n.href === item.href));
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-bold tracking-[0.25em] py-2.5 uppercase transition-all duration-200 rounded-xl ${
                    isActive ? 'text-white bg-white/10 border border-white/20' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
