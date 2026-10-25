import { FadeIn } from '../components/FadeIn';
import {
  BarChart3,
  Workflow,
  CandlestickChart,
  Bitcoin,
  Coins,
  type LucideIcon,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const serviceIcons: Record<string, LucideIcon> = {
  'Data Science & Analytics': BarChart3,
  'n8n AI Automation': Workflow,
  'Forex Trading Systems': CandlestickChart,
  'Crypto Market Analytics': Bitcoin,
  'Commodities Analytics': Coins,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              My Services
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 tracking-wide">
              What I build, from{' '}
              <span className="accent-gradient-text font-medium">raw data</span> to{' '}
              <span className="accent-gradient-text font-medium">automated decisions</span>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.services.map((service, index) => {
            const Icon = serviceIcons[service.title];
            const featured = index === 0;

            return (
              <FadeIn
                key={service.number}
                delay={0.2 + index * 0.08}
                duration={0.7}
                y={30}
                className={featured ? 'md:col-span-2' : ''}
              >
                <div className="group relative h-full overflow-hidden rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-400/40 hover:shadow-[0_10px_40px_rgba(56,189,248,0.15)]">
                  {/* faint gradient wash that lights up on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:from-sky-500/10 group-hover:to-purple-500/10 transition-opacity duration-500" />

                  {/* watermark number */}
                  <span className="pointer-events-none absolute -top-3 right-4 text-[4.5rem] leading-none font-bold text-white/[0.04] select-none">
                    {service.number}
                  </span>

                  <div className="relative flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-sky-400/30 text-sky-300 group-hover:scale-110 group-hover:text-sky-200 transition-all duration-300">
                      {Icon && <Icon size={22} strokeWidth={1.8} />}
                    </div>
                    <span className="text-xs font-bold tracking-[0.25em] text-slate-500 pt-1">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="relative text-xl md:text-2xl font-medium text-white mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="relative text-sm md:text-[15px] text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
