import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { portfolioData } from '../data/portfolio';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-10 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            About Me
          </h2>
        </FadeIn>

        <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <FadeIn delay={0.4} duration={0.8} y={40}>
            <div className="text-xl sm:text-2xl leading-relaxed text-white max-w-3xl mx-auto font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <AnimatedText>
                {portfolioData.about.text}
              </AnimatedText>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}