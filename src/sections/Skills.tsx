import { useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { SkillIcon } from '../components/SkillIcon';

const rows = [
  {
    title: 'Languages & Data',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'pandas', 'NumPy', 'R', 'Matplotlib', 'Excel', 'Google Sheets'],
    duration: 34,
    reverse: false,
  },
  {
    title: 'AI & Automation',
    skills: ['n8n', 'LLM Agents', 'OpenAI API', 'Webhooks', 'TensorFlow', 'PyTorch', 'scikit-learn', 'XGBoost', 'Hugging Face', 'Claude'],
    duration: 40,
    reverse: true,
  },
  {
    title: 'Markets & Tooling',
    skills: ['TradingView', 'Forex', 'Crypto', 'Backtesting', 'Risk Management', 'GitHub', 'Docker', 'Vercel', 'React', 'Tailwind CSS'],
    duration: 36,
    reverse: false,
  },
];

/* One icon tile: magnifies toward the cursor (dock physics) + tooltip */
function SkillTile({ name, mouseX }: { name: string; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Number.POSITIVE_INFINITY;
    return x - rect.x - rect.width / 2;
  });
  const scaleRaw = useTransform(distance, [-130, 0, 130], [1, 1.5, 1]);
  const liftRaw = useTransform(distance, [-130, 0, 130], [0, -14, 0]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 160, damping: 12 });
  const lift = useSpring(liftRaw, { mass: 0.1, stiffness: 160, damping: 12 });

  return (
    <motion.div ref={ref} style={{ scale, y: lift }} className="relative shrink-0 mx-2 group">
      <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-slate-200 group-hover:text-sky-300 group-hover:border-sky-400/50 transition-colors duration-300">
        <SkillIcon name={name} size={30} />
      </div>
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800/95 border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-20">
        {name}
      </span>
    </motion.div>
  );
}

/* One endlessly scrolling row; pauses and docks on hover */
function MarqueeRow({
  skills,
  reverse,
  duration,
}: {
  skills: string[];
  reverse: boolean;
  duration: number;
}) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [paused, setPaused] = useState(false);
  const doubled = [...skills, ...skills];

  return (
    <div
      className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        mouseX.set(Number.POSITIVE_INFINITY);
        setPaused(false);
      }}
    >
      <div
        className={`flex w-max items-center ${reverse ? 'marquee-reverse' : 'marquee'}`}
        style={{ animationDuration: `${duration}s`, animationPlayState: paused ? 'paused' : 'running' }}
      >
        {doubled.map((skill, index) => (
          <SkillTile key={`${skill}-${index}`} name={skill} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-0 relative">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            My Skills
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-300 mb-14 tracking-wide">
            Hover to pause and explore —{' '}
            <span className="accent-gradient-text font-medium">the toolbox behind the systems</span>
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} duration={0.9} y={30}>
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.title}>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-slate-500 mb-2 max-w-6xl mx-auto px-4">
                {row.title}
              </p>
              <MarqueeRow skills={row.skills} reverse={row.reverse} duration={row.duration} />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
