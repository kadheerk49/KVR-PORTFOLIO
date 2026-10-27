import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, FileText, Github, Mail, Send, User, X } from 'lucide-react';
import { SiGithub, SiReddit, SiTelegram } from 'react-icons/si';
import { FadeIn } from '../components/FadeIn';
import BorderGlow from '../components/BorderGlow';
import SpecularButton from '../components/SpecularButton';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { ElectricBorder } from '../components/ElectricBorder';
import { ScrollStack, ScrollStackItem } from '../components/ScrollStack';
import { SkillIcon } from '../components/SkillIcon';
import { portfolioData, type ProjectStatus } from '../data/portfolio';

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> = {
  ongoing: {
    label: 'Ongoing',
    className: 'bg-amber-400/10 border-amber-400/40 text-amber-300',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-emerald-400/10 border-emerald-400/40 text-emerald-300',
  },
  completed: {
    label: 'Completed',
    className: 'bg-sky-400/10 border-sky-400/40 text-sky-300',
  },
  prototype: {
    label: 'Prototype',
    className: 'bg-violet-400/10 border-violet-400/40 text-violet-300',
  },
};

export function ProjectsSection() {
  const [openPatent, setOpenPatent] = useState<number | null>(null);
  const [openCert, setOpenCert] = useState<number | null>(null);

  // Escape closes the patent viewer; lock page scroll while open
  useEffect(() => {
    if (openPatent === null && openCert === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPatent(null);
        setOpenCert(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openPatent, openCert]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.2} duration={0.8} y={40}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 text-center tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Featured Projects
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-300 mb-16 tracking-wide">
            Real systems I built —{' '}
            <span className="accent-gradient-text font-medium">
              agents, models, kernels and augmented reality
            </span>
          </p>
        </FadeIn>

        <ScrollStack>
          {portfolioData.projects.map((project) => {
            const status = STATUS_STYLES[project.status];
            return (
              <ScrollStackItem key={project.number}>
                <motion.div
                  initial={{ opacity: 0, y: 70, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-slate-950/90 backdrop-blur-2xl p-5 sm:p-8 lg:p-10 rounded-3xl border border-white/20 hover:border-white/40 transition-colors duration-300 shadow-2xl">
                  {/* header row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-light text-sky-400">
                      {project.number}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.18em] uppercase ${status.className}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {status.label}
                    </span>
                    <span className="ml-auto hidden sm:inline text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">
                      {project.domain}
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-start">
                    {/* content column */}
                    <div className="w-full min-w-0">
                      <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-wide mb-1.5">
                        {project.title}
                      </h3>
                      <p className="accent-gradient-text text-sm sm:text-[15px] font-medium mb-4">
                        {project.tagline}
                      </p>
                      <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* highlights */}
                      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5 text-[13px] sm:text-sm text-slate-300 leading-relaxed">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/80" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                        {project.metrics.map((metric) => (
                          <motion.div
                            key={metric.label}
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5"
                          >
                            <div className="text-base sm:text-lg font-bold accent-gradient-text leading-tight">
                              {metric.value}
                            </div>
                            <div className="text-[9.5px] font-semibold tracking-[0.12em] uppercase text-slate-500 mt-0.5">
                              {metric.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* stack chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] border border-white/10 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-300"
                          >
                            <SkillIcon name={tech} size={14} className="text-sky-300/90 shrink-0" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* links */}
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link) =>
                          link.external ? (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 border border-sky-400/40 px-5 py-2.5 text-xs font-bold tracking-[0.12em] uppercase text-sky-300 transition-all duration-300 hover:bg-sky-400/20 hover:text-white hover:-translate-y-0.5"
                            >
                              <Github size={15} />
                              {link.label}
                            </a>
                          ) : (
                            <LiveProjectButton key={link.label} href={link.href}>
                              {link.label}
                            </LiveProjectButton>
                          ),
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>

        {/* Patents — filed & published Indian patent applications */}
        <FadeIn delay={0.3} duration={0.8} y={40}>
          <div className="mt-24">
            <h3 className="text-3xl sm:text-4xl font-light text-white text-center tracking-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Patents <span className="accent-gradient-text font-medium">Filed</span>
            </h3>
            <p className="text-center text-sm text-slate-400 mb-10 tracking-wide">
              Published Indian patent applications — co-inventor, Vellore Institute of Technology
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolioData.patents.map((patent, index) => (
                <motion.div
                  key={patent.publicationNo}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                <BorderGlow
                  glowColor="43 96 56"
                  colors={['#38bdf8', '#a7f3d0', '#a855f7']}
                  backgroundColor="#0b0f19"
                  borderRadius={24}
                  glowRadius={36}
                  glowIntensity={0.9}
                  className="h-full w-full"
                >
                <button
                  type="button"
                  onClick={() => setOpenPatent(index)}
                  className="group block w-full h-full text-left p-7 focus-visible:outline-2 focus-visible:outline-amber-400/60 rounded-[inherit]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-[10px] font-bold tracking-[0.18em] uppercase text-amber-300">
                      <Award size={12} />
                      Patent Published
                    </span>
                    <span className="text-[11px] font-semibold tabular-nums text-slate-500">
                      {patent.number} / {String(portfolioData.patents.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-medium text-white leading-snug mb-3">
                    {patent.title}
                  </h4>
                  <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed line-clamp-4 mb-5">
                    {patent.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] mb-5">
                    <div>
                      <span className="block text-slate-500 uppercase tracking-[0.14em] font-bold">Publication No.</span>
                      <span className="text-slate-200 tabular-nums">{patent.publicationNo}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-[0.14em] font-bold">Published</span>
                      <span className="text-slate-200">{patent.published}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-[0.14em] font-bold">Filed</span>
                      <span className="text-slate-200">{patent.filed}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-[0.14em] font-bold">Role</span>
                      <span className="text-amber-300/90 font-semibold">{patent.role}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-amber-300/90 group-hover:text-amber-200 transition-colors duration-300">
                    <FileText size={14} />
                    Click to view the patent PDF
                  </span>
                </button>
                </BorderGlow>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Certifications */}
        <FadeIn delay={0.3} duration={0.8} y={40}>
          <div className="mt-24">
            <h3 className="text-3xl sm:text-4xl font-light text-white text-center tracking-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Certifications
            </h3>
            <p className="text-center text-sm text-slate-400 mb-10 tracking-wide">
              Courses and credentials — click to view the certificate
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {portfolioData.certifications.map((cert, index) => (
                <motion.button
                  key={cert.code}
                  type="button"
                  onClick={() => setOpenCert(index)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group w-full max-w-2xl text-left rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 p-6 sm:p-7 shadow-xl transition-colors duration-300 hover:border-emerald-400/50 hover:shadow-[0_12px_40px_rgba(52,211,153,0.12)] focus-visible:outline-2 focus-visible:outline-emerald-400/60"
                >
                  <div className="flex items-start gap-5">
                    {/* medallion */}
                    <span className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-sky-400/20 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                      <Award size={26} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-[9.5px] font-bold tracking-[0.16em] uppercase text-emerald-300 mb-2.5">
                        {cert.type}
                      </span>
                      <h4 className="text-lg sm:text-xl font-medium text-white leading-snug mb-1.5">
                        {cert.title}
                      </h4>
                      <p className="text-[13px] text-slate-400 mb-3">
                        {cert.issuer} · {cert.school}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
                        <span className="font-bold tracking-[0.14em] uppercase text-slate-500">
                          {cert.code}
                        </span>
                        <span className="text-slate-400 tabular-nums">{cert.period}</span>
                        <span className="inline-flex items-center gap-1.5 text-emerald-300/90 font-semibold group-hover:text-emerald-200 transition-colors duration-300">
                          <FileText size={13} />
                          View certificate PDF
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

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
                            : contact.label === 'Reddit' ? SiReddit
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

      {/* Patent PDF viewer */}
      <AnimatePresence>
        {openPatent !== null && portfolioData.patents[openPatent] && (
          <motion.div
            key="patent-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-[#050507]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setOpenPatent(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-4xl h-[88vh] rounded-3xl bg-slate-950 border border-amber-400/30 shadow-[0_30px_90px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-slate-950/95">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300/90">
                    Indian Patent Application · {portfolioData.patents[openPatent].publicationNo}
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    {portfolioData.patents[openPatent].title}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={portfolioData.patents[openPatent].pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-amber-400/50 hover:text-amber-200 transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    Open in new tab
                  </a>
                  <button
                    onClick={() => setOpenPatent(null)}
                    aria-label="Close patent viewer"
                    className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/15 text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors duration-300 flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe
                src={portfolioData.patents[openPatent].pdf}
                title={portfolioData.patents[openPatent].title}
                className="flex-1 w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate PDF viewer */}
      <AnimatePresence>
        {openCert !== null && portfolioData.certifications[openCert] && (
          <motion.div
            key="cert-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-[#050507]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setOpenCert(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-4xl h-[88vh] rounded-3xl bg-slate-950 border border-emerald-400/30 shadow-[0_30px_90px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-slate-950/95">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-300/90">
                    {portfolioData.certifications[openCert].code} · {portfolioData.certifications[openCert].type}
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    {portfolioData.certifications[openCert].title}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={portfolioData.certifications[openCert].pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-emerald-400/50 hover:text-emerald-200 transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    Open in new tab
                  </a>
                  <button
                    onClick={() => setOpenCert(null)}
                    aria-label="Close certificate viewer"
                    className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/15 text-slate-300 hover:text-white hover:border-emerald-400/50 transition-colors duration-300 flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe
                src={portfolioData.certifications[openCert].pdf}
                title={portfolioData.certifications[openCert].title}
                className="flex-1 w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
