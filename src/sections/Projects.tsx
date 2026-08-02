import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { ElectricBorder } from '../components/ElectricBorder';
import { ScrollStack, ScrollStackItem } from '../components/ScrollStack';
import { portfolioData } from '../data/portfolio';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-16 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Featured Projects
          </h2>
        </FadeIn>

        <ScrollStack
          useWindowScroll={true}
          itemDistance={60}
          itemScale={0.035}
          itemStackDistance={35}
          stackPosition="15%"
          baseScale={0.88}
        >
          {portfolioData.projects.map((project) => (
            <ScrollStackItem key={project.number}>
              <div className="bg-slate-950/90 backdrop-blur-2xl p-5 sm:p-8 lg:p-12 rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-sky-400/30 text-sky-300 text-[11px] sm:text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
                  <span>•</span> {project.category}
                </div>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-start">
                  <div className="lg:w-5/12 space-y-3 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-light text-sky-400">
                      {project.number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-2 sm:mb-4 tracking-wide">{project.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                    <div>
                      <LiveProjectButton href={project.actionHref}>
                        {project.actionLabel}
                      </LiveProjectButton>
                    </div>
                  </div>

                  <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="space-y-4 flex flex-col">
                      {project.images.left.map((img, imgIndex) => (
                        <div key={imgIndex} className="overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-36 sm:h-44 object-cover hover:scale-105 transition-transform duration-500"
                            width={img.width}
                            height={img.height}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                      <img
                        src={project.images.right.src}
                        alt={project.images.right.alt}
                        className="w-full h-44 sm:h-full object-cover sm:min-h-[22rem] hover:scale-105 transition-transform duration-500"
                        width={project.images.right.width}
                        height={project.images.right.height}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* Contact section at the end wrapped with ElectricBorder */}
        <div id="contact" className="mt-28">
          <FadeIn delay={0.4} duration={0.8} y={40}>
            <ElectricBorder color="#38BDF8" speed={1.2} chaos={0.14} borderRadius={24} className="max-w-4xl mx-auto">
              <div className="bg-slate-950/90 backdrop-blur-2xl p-10 sm:p-16 rounded-[24px] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">Get in Touch</h3>
                <p className="text-lg sm:text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                  Open for Data Science projects, n8n AI automations, and quantitative financial trading tools.
                </p>
                <div className="flex flex-wrap justify-center gap-5 relative z-10">
                  {portfolioData.contacts.map((contact) => (
                    <LiveProjectButton key={contact.label} href={contact.href}>
                      {contact.label}
                    </LiveProjectButton>
                  ))}
                </div>
              </div>
            </ElectricBorder>
          </FadeIn>
        </div>

        {/* Footer Copyright */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center pb-8">
          <p className="text-sm sm:text-base font-semibold text-slate-300 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            © 2026 <span className="text-sky-400 font-bold">KADHEER VEL RAJ N</span> — All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}