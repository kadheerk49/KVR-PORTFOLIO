import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SkillIcon } from '../components/SkillIcon';
import CardSwap, { Card } from '../components/CardSwap';
import { portfolioData } from '../data/portfolio';

const categories = portfolioData.skills;

export function SkillsSection() {
  const [frontIndex, setFrontIndex] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  // Escape closes the expanded card; lock page scroll while open
  useEffect(() => {
    if (expanded === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [expanded]);

  const category = expanded !== null ? categories[expanded] : null;

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            My Skills
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-300 mb-12 tracking-wide">
            One deck, ten domains —{' '}
            <span className="accent-gradient-text font-medium">
              {categories.reduce((n, c) => n + c.skills.length, 0)} skills
            </span>
            . Click the front card to open it big.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} duration={0.9} y={30}>
          <div className="h-[540px] sm:h-[600px] max-w-[820px] mx-auto">
            <CardSwap
              width={580}
              height={420}
              cardDistance={58}
              verticalDistance={66}
              depth={85}
              skewAmount={6}
              hoverSpread={0.14}
              cardRadius={24}
              autoplay
              delay={5200}
              pauseOnHover
              draggable
              theme="dark"
              dim={0.55}
              onChange={(index) => setFrontIndex(index)}
              onCardClick={(index) => {
                if (index === frontIndex) setExpanded(index);
              }}
            >
              {categories.map((category) => (
                <Card key={category.title}>
                  <div className="flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-baseline justify-between mb-5">
                      <h3 className="text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-sky-300">
                        {category.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {category.skills.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 content-center flex-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2 text-[13px] font-medium text-slate-200"
                        >
                          <SkillIcon name={skill} size={16} className="text-sky-300/90 shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-600 mt-4">
                      click to expand
                    </p>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} duration={0.8} y={20}>
          <p className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-slate-600 mt-8">
            hover to fan · drag or click to swap · arrow keys work too
          </p>
        </FadeIn>
      </div>

      {/* Expanded big-picture view of the selected domain */}
      <AnimatePresence>
        {category && (
          <motion.div
            key="skills-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#050507]/85 backdrop-blur-xl"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 26, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-400/25 shadow-[0_30px_90px_rgba(0,0,0,0.7)] p-8 sm:p-10 max-h-[86vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10 rounded-3xl" />
              <button
                onClick={() => setExpanded(null)}
                aria-label="Close"
                className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/[0.06] border border-white/15 text-slate-300 hover:text-white hover:border-sky-400/50 transition-colors duration-300 flex items-center justify-center"
              >
                <X size={18} />
              </button>

              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-sky-300/80 mb-2">
                Domain {expanded! + 1} of {categories.length}
              </p>
              <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-wide mb-7">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3 relative">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.3 }}
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.05] border border-white/12 px-4 py-2.5 text-sm sm:text-[15px] font-medium text-slate-100"
                  >
                    <SkillIcon name={skill} size={19} className="text-sky-300 shrink-0" />
                    {skill}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-600 mt-8">
                press esc or tap outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
