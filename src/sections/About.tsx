import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiPython, SiN8N, SiPandas } from 'react-icons/si';
import { Database, BrainCircuit, CandlestickChart, TrendingUp } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { portfolioData } from '../data/portfolio';

const photos = portfolioData.about.cornerImages.slice(0, 4);

const tags = [
  { icon: BrainCircuit, label: 'Data Science' },
  { icon: SiPython, label: 'Python' },
  { icon: Database, label: 'SQL' },
  { icon: SiPandas, label: 'Pandas' },
  { icon: SiN8N, label: 'n8n AI Automation' },
  { icon: CandlestickChart, label: 'Quant Trading' },
  { icon: TrendingUp, label: 'Predictive Analytics' },
];

export function AboutSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* Interactive portrait gallery: full-size photo, switch via thumbnails */}
        <FadeIn delay={0.2} duration={0.9} y={40}>
          <div className="relative w-fit mx-auto py-8 px-2">
            {/* ambient glow behind the frame */}
            <div className="pointer-events-none absolute inset-8 bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-purple-500/20 blur-3xl rounded-[3rem]" />

            <div className="relative rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/20 p-3 shadow-2xl w-72 sm:w-80 md:w-96">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photos[active].src}
                    src={photos[active].src}
                    alt={photos[active].alt}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute inset-0 h-full w-full object-contain grayscale contrast-110"
                  />
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-3 mt-4 pb-1">
                {photos.map((photo, index) => (
                  <button
                    key={photo.src}
                    onClick={() => setActive(index)}
                    aria-label={`Show portrait ${index + 1}`}
                    className={`h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === active
                        ? 'border-sky-400 scale-105 shadow-[0_0_16px_rgba(56,189,248,0.35)]'
                        : 'border-white/15 opacity-55 hover:opacity-100 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="h-full w-full object-cover object-top grayscale"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bio text */}
        <div className="text-center lg:text-left">
          <FadeIn delay={0.3} duration={0.8} y={40}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-10 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              About Me
            </h2>
          </FadeIn>

          <FadeIn delay={0.45} duration={0.8} y={40}>
            <div className="relative p-8 sm:p-10 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/20 shadow-2xl">
              <div className="text-lg sm:text-xl leading-relaxed text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <AnimatedText>
                  {portfolioData.about.text}
                </AnimatedText>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} duration={0.8} y={30}>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {tags.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-slate-200 transition-all duration-300 hover:border-sky-400/50 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(56,189,248,0.18)] cursor-default"
                >
                  <Icon size={15} className="text-sky-300 group-hover:text-sky-200 transition-colors duration-300" />
                  {label}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
