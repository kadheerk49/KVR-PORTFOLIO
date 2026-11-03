import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { SkillIcon } from './SkillIcon';
import { LiveProjectButton } from './LiveProjectButton';
import type { ProjectItem, ProjectStatus } from '../data/portfolio';

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> = {
  ongoing: {
    label: 'Ongoing',
    className: 'bg-amber-400/10 border-amber-400/40 text-amber-300',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-emerald-400/10 border-emerald-400/40 text-emerald-300',
  },
  completed: {
    label: 'Completed',
    className: 'bg-sky-400/10 border-sky-400/40 text-sky-300',
  },
  prototype: {
    label: 'Prototype',
    className: 'bg-violet-400/10 border-violet-400/40 text-violet-300',
  },
};

interface ProjectCarouselMobileProps {
  projects: ProjectItem[];
}

export function ProjectCarouselMobile({ projects }: ProjectCarouselMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el || !el.children.length) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.children[0].getBoundingClientRect().width + 16; // 16px gap
    const index = Math.round(scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    setActiveIndex(clamped);
    if (scrollLeft > 20) setHasInteracted(true);
  }, [projects.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateIndex);
  }, [updateIndex]);

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el || !el.children[index]) return;
    const target = el.children[index] as HTMLElement;
    el.scrollTo({
      left: target.offsetLeft - 16,
      behavior: 'smooth',
    });
    setActiveIndex(index);
    setHasInteracted(true);
  };

  const handlePrev = () => {
    scrollTo(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollTo(Math.min(projects.length - 1, activeIndex + 1));
  };

  return (
    <div className="w-full relative">
      {/* Swipe prompt hint on initial view */}
      {!hasInteracted && (
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-sky-400 font-semibold tracking-wider uppercase mb-3 animate-pulse">
          <span>Swipe cards</span>
          <span>↔</span>
        </div>
      )}

      {/* Snap container — completely horizontal, zero vertical scroll trapping */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 pt-1 scroll-smooth no-scrollbar touch-pan-x"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {projects.map((project, idx) => {
          const status = STATUS_STYLES[project.status];
          const isActive = idx === activeIndex;

          return (
            <div
              key={project.number}
              className={`w-[85vw] max-w-[350px] shrink-0 snap-center rounded-2xl bg-slate-950/90 backdrop-blur-2xl border transition-all duration-300 p-5 shadow-2xl flex flex-col justify-between ${
                isActive
                  ? 'border-sky-400/50 shadow-[0_10px_35px_rgba(56,189,248,0.18)] scale-[1.01]'
                  : 'border-white/15 opacity-85 scale-[0.98]'
              }`}
            >
              <div>
                {/* Header: Number + Status + Domain */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-light text-sky-400 font-mono">
                      {project.number}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-bold tracking-[0.16em] uppercase ${status.className}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {status.label}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-500">
                    {project.domain}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-medium text-white tracking-tight mb-1">
                  {project.title}
                </h3>
                <p className="accent-gradient-text text-xs font-medium mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-white/[0.04] border border-white/10 p-2 text-center"
                    >
                      <div className="text-sm font-bold accent-gradient-text leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-[8px] font-semibold tracking-wider uppercase text-slate-400 mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 rounded-md bg-white/[0.05] border border-white/10 px-2 py-1 text-[10px] font-medium text-slate-300"
                    >
                      <SkillIcon name={tech} size={11} className="text-sky-300/90 shrink-0" />
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="inline-flex items-center rounded-md bg-white/[0.03] border border-white/5 px-1.5 py-1 text-[9px] text-slate-400">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                {project.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-400/10 border border-sky-400/40 py-2.5 text-xs font-bold tracking-wider uppercase text-sky-300 active:bg-sky-400/20 active:scale-[0.98] transition-all"
                    >
                      <Github size={14} />
                      {link.label}
                    </a>
                  ) : (
                    <div key={link.label} className="w-full">
                      <LiveProjectButton href={link.href}>
                        {link.label}
                      </LiveProjectButton>
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls: Chevrons + Dots + Indicator */}
      <div className="flex items-center justify-between px-6 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className="h-9 w-9 rounded-full bg-slate-900/80 border border-white/15 text-slate-300 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots + counter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                    : 'w-2 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-semibold text-slate-400 ml-1">
            0{activeIndex + 1} / 0{projects.length}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === projects.length - 1}
          aria-label="Next project"
          className="h-9 w-9 rounded-full bg-slate-900/80 border border-white/15 text-slate-300 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
