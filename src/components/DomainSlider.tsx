// Slide control for the skill deck: big title that slides between domains,
// ‹ › arrows, 01/10 counter, and a timeline where every stop carries its own
// always-visible name (scrolls + auto-centres on narrow screens instead of
// hiding anything). Horizontal swipe moves the deck. Memoised — re-renders
// only when the active index changes.
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface DomainSliderItem {
  label: string;
  meta?: string;
}

export interface DomainSliderProps {
  items: DomainSliderItem[];
  index: number;
  onChange: (index: number) => void;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const FILL_SPRING = { type: 'spring' as const, stiffness: 140, damping: 22 };

const titleVariants = {
  enter: (dir: number) => ({ x: dir * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -56, opacity: 0 })
};

const ARROW =
  'group/shrink relative grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 outline-none backdrop-blur-md transition-all duration-300 hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:scale-95';

const pad = (n: number) => String(n).padStart(2, '0');

export const DomainSlider = memo(function DomainSlider({
  items,
  index,
  onChange,
  className = ''
}: DomainSliderProps) {
  const count = items.length;
  const item = items[index] ?? items[0];

  // Direction the title slides: normalised delta survives the wrap-around
  // (9 → 0 via autoplay is "forward", 0 → 9 via a jump is "backward").
  const prevRef = useRef(index);
  const dirRef = useRef(1);
  if (index !== prevRef.current && count > 1) {
    const delta = ((index - prevRef.current) % count + count) % count;
    dirRef.current = delta <= count / 2 ? 1 : -1;
    prevRef.current = index;
  }
  const dir = dirRef.current;

  const step = (delta: 1 | -1) => {
    if (count < 2) return;
    onChange((((index + delta) % count) + count) % count);
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -650) step(1);
    else if (info.offset.x > 70 || info.velocity.x > 650) step(-1);
  };

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [fill, setFill] = useState(0);

  // Progress line ends exactly at the active stop's centre; re-measured when
  // the index changes and whenever the track resizes.
  useLayoutEffect(() => {
    const measure = () => {
      const active = activeRef.current;
      const track = trackRef.current;
      if (!active || !track) return;
      setFill(active.offsetLeft + active.offsetWidth / 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [index, count]);

  // Below sm the timeline scrolls — keep the active stop in view.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = activeRef.current;
    if (!scroller || !active) return;
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return;
    const chip = active.getBoundingClientRect();
    const box = scroller.getBoundingClientRect();
    const delta = chip.left + chip.width / 2 - (box.left + box.width / 2);
    scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: 'smooth' });
  }, [index]);

  return (
    <div className={`w-full max-w-[1000px] mx-auto select-none ${className}`.trim()}>
      {/* counter + skill tally */}
      <div className="mb-3 flex items-baseline justify-between text-[10px] font-bold tracking-[0.3em] uppercase">
        <span className="tabular-nums text-slate-400">
          {pad(index + 1)} <span className="text-slate-600">/ {pad(count)}</span>
        </span>
        <span className="text-slate-500">{item?.meta}</span>
      </div>

      {/* arrows + sliding title + swipe surface */}
      <motion.div
        className="flex items-center gap-3 sm:gap-5 touch-pan-y"
        drag={count > 1 ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        dragMomentum={false}
        onDragEnd={onDragEnd}
      >
        <button type="button" onClick={() => step(-1)} aria-label="Previous domain" className={ARROW}>
          <ChevronLeft size={20} className="transition-transform duration-300 group-hover/shrink:-translate-x-0.5" />
        </button>

        <div className="relative h-11 sm:h-14 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.h3
              key={`${index}-${item?.label}`}
              custom={dir}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-center text-sm sm:text-2xl md:text-3xl font-medium uppercase tracking-[0.08em] sm:tracking-[0.16em] text-white drop-shadow-[0_2px_12px_rgba(56,189,248,0.25)]"
            >
              {item?.label}
            </motion.h3>
          </AnimatePresence>
        </div>

        <button type="button" onClick={() => step(1)} aria-label="Next domain" className={ARROW}>
          <ChevronRight size={20} className="transition-transform duration-300 group-hover/shrink:translate-x-0.5" />
        </button>
      </motion.div>

      {/* timeline (lg+): every stop names its domain — fits with no scrolling */}
      <div ref={scrollerRef} className="no-scrollbar mt-5 overflow-x-auto hidden lg:block">
        <div ref={trackRef} className="relative flex min-w-full justify-between gap-3">
          <span className="absolute inset-x-0 top-[6px] h-px bg-white/10" aria-hidden="true" />
          <motion.span
            className="absolute left-0 top-[6px] h-px bg-gradient-to-r from-sky-400 to-emerald-300"
            initial={false}
            animate={{ width: fill }}
            transition={FILL_SPRING}
            aria-hidden="true"
          />
          {items.map((stop, i) => {
            const active = i === index;
            return (
              <button
                key={stop.label}
                type="button"
                ref={active ? activeRef : undefined}
                onClick={() => onChange(i)}
                aria-label={`Go to ${stop.label}`}
                aria-current={active ? 'true' : undefined}
                className="group/stop relative flex flex-col items-center outline-none"
              >
                <span className="flex h-3 items-center">
                  <span
                    className={`block rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active
                        ? 'h-2.5 w-6 bg-sky-400 shadow-[0_0_0_5px_rgba(56,189,248,0.16)]'
                        : 'h-2 w-2 bg-white/25 group-hover/stop:bg-white/70 group-focus-visible/stop:bg-white/70'
                    }`}
                  />
                </span>
                <span
                  className={`mt-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.06em] transition-colors duration-300 ${
                    active
                      ? 'text-sky-300'
                      : 'text-slate-500 group-hover/stop:text-slate-300 group-focus-visible/stop:text-slate-300'
                  }`}
                >
                  {stop.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Below lg: a wrapped strip where every name is visible at once —
          no rail, no cut-off labels, no scrolling, just tap a name */}
      <div className="mt-5 flex flex-wrap justify-center gap-x-2 gap-y-1 lg:hidden">
        {items.map((stop, i) => {
          const active = i === index;
          return (
            <button
              key={stop.label}
              type="button"
              onClick={() => onChange(i)}
              aria-current={active ? 'true' : undefined}
              className={`rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-400/70 ${
                active
                  ? 'bg-sky-400 font-bold text-sky-950 shadow-[0_4px_14px_rgba(56,189,248,0.35)]'
                  : 'text-slate-400 hover:text-white active:text-white'
              }`}
            >
              {stop.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default DomainSlider;
