import { FadeIn } from '../components/FadeIn';
import { portfolioData } from '../data/portfolio';

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-16 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            My Services
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {portfolioData.services.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={0.2 + index * 0.1}
              duration={0.8}
              y={30}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 p-8 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all shadow-xl">
                <div className="text-5xl md:text-6xl font-light text-sky-400 min-w-[70px]">
                  {service.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-base md:text-lg text-slate-100 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}