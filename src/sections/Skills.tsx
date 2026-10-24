import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { portfolioData } from '../data/portfolio';
import { SkillIcon } from '../components/SkillIcon';

export function SkillsSection() {
  const categories = portfolioData.skills;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            My Skills
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-300 mb-12 tracking-wide">
            Focus areas: <span className="accent-gradient-text font-medium">Predictive Analytics, n8n AI Automation &amp; Quantitative Trading Systems</span>
          </p>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn delay={0.3} duration={0.8} y={30}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={category.title}
                  onClick={() => setActiveIndex(index)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-[0.15em] uppercase border backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-400/15 border-sky-400/50 text-sky-300 scale-105 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-950/70 border-white/15 text-slate-400 hover:text-white hover:border-white/40'
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Skill chips for active category */}
        <FadeIn delay={0.4} duration={0.8} y={30}>
          <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl min-h-[230px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4"
              >
                {active.skills.map((skill) => (
                  <span
                    key={skill}
                    className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/15 text-sm sm:text-base text-slate-100 font-normal hover:border-sky-400/50 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    <SkillIcon
                      name={skill}
                      size={17}
                      className="shrink-0 text-slate-300 group-hover:text-sky-300 transition-colors duration-300"
                    />
                    {skill}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
