import type { FormEvent } from 'react';
import { Mail, Send, User } from 'lucide-react';
import { SiGithub, SiTelegram } from 'react-icons/si';
import { FadeIn } from '../components/FadeIn';
import SpecularButton from '../components/SpecularButton';
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
            <ElectricBorder color="#38BDF8" speed={1.2} chaos={0.14} borderRadius={24} className="max-w-5xl mx-auto">
              <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[24px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  Get in Touch
                </h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Have an idea, a project, or an automation to build? I&apos;m always open to meaningful conversations and new possibilities.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mt-10">
                  {/* Message form — composes an email to Kadheer */}
                  <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      const data = new FormData(e.currentTarget);
                      const name = String(data.get('name') || '');
                      const email = String(data.get('email') || '');
                      const message = String(data.get('message') || '');
                      const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`);
                      const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`);
                      window.location.href = `mailto:kadheerk49@gmail.com?subject=${subject}&body=${body}`;
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold tracking-[0.15em] uppercase text-slate-300 mb-2">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full rounded-xl bg-slate-900/70 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-300 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold tracking-[0.15em] uppercase text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="w-full rounded-xl bg-slate-900/70 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-300 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold tracking-[0.15em] uppercase text-slate-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me what you're thinking..."
                        className="w-full resize-none rounded-xl bg-slate-900/70 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-300 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                      />
                    </div>
                    <div>
                      <SpecularButton
                        type="submit"
                        size="md"
                        radius={24}
                        tint="#ffffff"
                        tintOpacity={0.08}
                        blur={12}
                        textColor="#f8fafc"
                        lineColor="#38BDF8"
                        baseColor="#1e293b"
                        intensity={1.3}
                        shineSize={18}
                        shineFade={40}
                        thickness={1.5}
                        speed={0.35}
                        autoAnimate={true}
                      >
                        SEND MESSAGE
                      </SpecularButton>
                      <p className="mt-3 text-[11px] text-slate-500">
                        Opens your email app with the message pre-filled — nothing is stored on the site.
                      </p>
                    </div>
                  </form>

                  {/* Contact details + social profiles */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4 tracking-wide">Contact Details</h4>
                      <div className="space-y-3">
                        <a href="mailto:kadheerk49@gmail.com" className="flex items-center gap-4 group">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-white/15 text-sky-300 group-hover:border-sky-400/50 group-hover:text-sky-200 transition-all duration-300">
                            <Mail size={18} />
                          </span>
                          <span className="text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors duration-300">
                            kadheerk49@gmail.com
                          </span>
                        </a>
                        <a href="https://t.me/skull_420" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-white/15 text-sky-300 group-hover:border-sky-400/50 group-hover:text-sky-200 transition-all duration-300">
                            <Send size={18} />
                          </span>
                          <span className="text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors duration-300">
                            Telegram — @skull_420
                          </span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-4 tracking-wide">Social Profiles</h4>
                      <div className="flex flex-wrap gap-3">
                        {portfolioData.contacts.map((contact) => {
                          const Icon =
                            contact.label === 'GitHub' ? SiGithub
                            : contact.label === 'Telegram' ? SiTelegram
                            : contact.label === 'Email' ? Mail
                            : User;
                          return (
                            <a
                              key={contact.label}
                              href={contact.href}
                              target={contact.href.startsWith('http') ? '_blank' : undefined}
                              rel="noreferrer"
                              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-sky-400/50 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(56,189,248,0.18)]"
                            >
                              <Icon size={16} className="text-sky-300" />
                              {contact.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
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