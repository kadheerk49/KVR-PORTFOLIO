'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiClaude, SiN8N, SiPython } from 'react-icons/si';
import type { CertificationItem } from '../data/portfolio';

interface CredentialFanDeckProps {
  certifications: CertificationItem[];
  onOpenCert: (index: number) => void;
}

const BRAND_THEMES: Record<
  'claude' | 'n8n' | 'python',
  {
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    accentHex: string;
    chipGradient: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    cardBorderGlow: string;
    hologramGradient: string;
  }
> = {
  claude: {
    Icon: SiClaude,
    accentHex: '#D97757',
    chipGradient: 'from-amber-300 via-amber-400 to-amber-600',
    badgeBg: 'bg-[#D97757]/15',
    badgeBorder: 'border-[#D97757]/40',
    badgeText: 'text-[#F39C7A]',
    cardBorderGlow: 'hover:border-[#D97757]/70 hover:shadow-[0_20px_50px_rgba(217,119,87,0.25)]',
    hologramGradient: 'from-amber-400/40 via-orange-500/30 to-rose-500/40',
  },
  n8n: {
    Icon: SiN8N,
    accentHex: '#EA4B71',
    chipGradient: 'from-rose-300 via-rose-400 to-rose-600',
    badgeBg: 'bg-[#EA4B71]/15',
    badgeBorder: 'border-[#EA4B71]/40',
    badgeText: 'text-[#FF7096]',
    cardBorderGlow: 'hover:border-[#EA4B71]/70 hover:shadow-[0_20px_50px_rgba(234,75,113,0.25)]',
    hologramGradient: 'from-rose-400/40 via-pink-500/30 to-purple-500/40',
  },
  python: {
    Icon: SiPython,
    accentHex: '#38BDF8',
    chipGradient: 'from-sky-300 via-sky-400 to-emerald-500',
    badgeBg: 'bg-sky-400/15',
    badgeBorder: 'border-sky-400/40',
    badgeText: 'text-sky-300',
    cardBorderGlow: 'hover:border-sky-400/70 hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)]',
    hologramGradient: 'from-sky-400/40 via-cyan-500/30 to-emerald-500/40',
  },
};

export function CredentialFanDeck({ certifications, onOpenCert }: CredentialFanDeckProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);

  const activeIndex = hoveredIndex ?? selectedIndex;
  const activeCert = certifications[activeIndex] || certifications[0];
  const activeTheme = BRAND_THEMES[activeCert.brand];

  // Mobile swipe gesture handler
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> Advance to next credential
      if (selectedIndex < certifications.length - 1) {
        setDirection(1);
        setSelectedIndex((prev) => prev + 1);
      }
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> Return to previous credential
      if (selectedIndex > 0) {
        setDirection(-1);
        setSelectedIndex((prev) => prev - 1);
      }
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setDirection(-1);
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < certifications.length - 1) {
      setDirection(1);
      setSelectedIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* DESKTOP VIEW: Interactive 3D Fanned Deck & Dossier Inspector   */}
      {/* ============================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 3D Perspective Fan Deck */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-6">
          <div
            className="relative w-full h-[400px] flex items-center justify-center [perspective:1200px]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {certifications.map((cert, index) => {
              const theme = BRAND_THEMES[cert.brand];
              const BrandIcon = theme.Icon;
              const isSelected = selectedIndex === index;
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              // Calculate 3D transforms based on fan state
              let rotateZ = 0;
              let translateX = 0;
              let translateY = 0;
              let translateZ = 0;
              let scale = 1;
              let zIndex = 10;

              if (isAnyHovered) {
                // Expanded side-by-side fan when user hovers over deck
                translateX = (index - 1) * 160;
                if (isHovered) {
                  translateZ = 90;
                  translateY = -24;
                  scale = 1.08;
                  rotateZ = 0;
                  zIndex = 40;
                } else {
                  translateZ = 0;
                  translateY = 6;
                  scale = 0.94;
                  rotateZ = (index - 1) * 6;
                  zIndex = 20 - Math.abs(index - 1);
                }
              } else {
                // Rest state: elegant stacked physical card fan
                if (isSelected) {
                  translateX = (index - 1) * 90;
                  translateY = -14;
                  translateZ = 60;
                  scale = 1.05;
                  rotateZ = 0;
                  zIndex = 30;
                } else {
                  translateX = (index - 1) * 105;
                  translateY = 10;
                  translateZ = index === 1 ? 20 : 0;
                  scale = 0.96;
                  rotateZ = (index - 1) * 9;
                  zIndex = 10 + (index === 1 ? 5 : 0);
                }
              }

              return (
                <motion.div
                  key={cert.code}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${cert.title}`}
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedIndex(index);
                    }
                  }}
                  animate={{
                    x: translateX,
                    y: translateY,
                    z: translateZ,
                    rotateZ,
                    scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 26,
                  }}
                  style={{ zIndex }}
                  className="absolute w-[330px] h-[210px] rounded-2xl cursor-pointer select-none transition-shadow duration-300 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {/* Physical Metallic Card Body */}
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden p-5 flex flex-col justify-between border transition-all duration-300 ${
                      isSelected || isHovered
                        ? `border-white/40 shadow-2xl ${theme.cardBorderGlow}`
                        : 'border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-black/95 shadow-xl'
                    } bg-gradient-to-br from-[#0c1017] via-[#080b11] to-[#040507]`}
                  >
                    {/* Metallic brushed grain & security lattice background */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.06]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Holographic light sheen reflection */}
                    <div
                      className={`absolute -inset-full pointer-events-none opacity-30 bg-gradient-to-tr ${theme.hologramGradient} blur-2xl transition-opacity duration-500 ${
                        isSelected || isHovered ? 'opacity-50' : 'opacity-15'
                      }`}
                    />

                    {/* Card Top: Security EMV Smart Chip + Official Brand Emblem */}
                    <div className="relative z-10 flex items-center justify-between">
                      {/* Realistic EMV Smart Chip */}
                      <div className="relative flex items-center">
                        <div
                          className={`w-10 h-7 rounded-md bg-gradient-to-br ${theme.chipGradient} border border-amber-200/50 shadow-inner flex items-center justify-center overflow-hidden`}
                        >
                          {/* Chip micro-traces */}
                          <div className="w-full h-full border border-black/20 flex flex-col justify-between p-0.5">
                            <div className="h-[1px] w-full bg-black/25" />
                            <div className="flex justify-between items-center h-full">
                              <div className="w-[1px] h-full bg-black/25" />
                              <div className="w-3 h-3 rounded-full border border-black/25" />
                              <div className="w-[1px] h-full bg-black/25" />
                            </div>
                            <div className="h-[1px] w-full bg-black/25" />
                          </div>
                        </div>
                        <span className="ml-2 font-mono text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                          {cert.code}
                        </span>
                      </div>

                      {/* Brand Logo in metallic seal */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-md transition-transform duration-300 ${
                          isSelected || isHovered ? 'scale-110' : ''
                        } ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                      >
                        <BrandIcon size={20} />
                      </div>
                    </div>

                    {/* Card Middle: Typographic Credential Title */}
                    <div className="relative z-10 my-auto">
                      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">
                        {cert.type.replace('Official ', '')}
                      </p>
                      <h4 className="text-base font-semibold text-white leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                    </div>

                    {/* Card Bottom: Holder, Issuer & Hologram Verification Strip */}
                    <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                          {cert.issuer}
                        </p>
                        <p className="text-[10px] font-medium text-slate-200">{cert.period}</p>
                      </div>

                      {/* Holographic Security Stamp */}
                      <div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                      >
                        <ShieldCheck size={11} />
                        VERIFIED
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Deck Switcher Indicators */}
          <div className="flex items-center gap-3 mt-4">
            {certifications.map((cert, index) => {
              const isSelected = selectedIndex === index;
              const theme = BRAND_THEMES[cert.brand];
              return (
                <button
                  key={cert.code}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? `${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} border shadow-md`
                      : 'bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSelected ? 'bg-current animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  {cert.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Real-Time Credential Telemetry & Inspector */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert.code}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-950/90 backdrop-blur-2xl rounded-3xl border border-white/15 p-7 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Background accent glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-15"
                style={{ backgroundColor: activeTheme.accentHex }}
              />

              {/* Dossier Header */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300">
                    Validated Public Credential
                  </span>
                </div>
                <span className="font-mono text-xs font-bold tracking-widest text-slate-400 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10">
                  {activeCert.code}
                </span>
              </div>

              {/* Credential Name & Organization */}
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 block mb-2">
                  {activeCert.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight mb-3">
                  {activeCert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
                  <span className="font-medium text-white">{activeCert.issuer}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{activeCert.school}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 tabular-nums">{activeCert.period}</span>
                </div>
              </div>

              {/* Validated Competency Matrix */}
              <div className="mb-8">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3">
                  Validated Competency Matrix
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 font-medium hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenCert(activeIndex)}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-slate-200 active:scale-[0.98] transition-all shadow-lg"
                >
                  <FileText size={15} />
                  View Certificate PDF
                </button>

                {activeCert.verifyUrl ? (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all active:scale-[0.98] ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.badgeText} hover:bg-white/10 shadow-sm`}
                  >
                    <ExternalLink size={14} />
                    Verify On {activeCert.brand === 'claude' ? 'Claude Academy' : activeCert.brand === 'n8n' ? 'n8n' : 'Portal'}
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Institutional Record
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET VIEW: Gesture-Driven Swipeable Card & Dossier  */}
      {/* ============================================================== */}
      <div className="block lg:hidden">
        {/* Mobile Swipe Guidance Banner */}
        <div className="flex flex-col items-center justify-center gap-1.5 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-white/15 text-xs text-slate-200 shadow-md backdrop-blur-xl">
            <Sparkles size={13} className="text-amber-300 animate-pulse shrink-0" />
            <span>
              Swipe <strong className="text-white font-semibold">left / right ↔</strong> or tap arrows
            </span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono font-bold text-slate-300">
              {selectedIndex + 1} / {certifications.length}
            </span>
          </div>
        </div>

        {/* Swipeable Card Stage with Floating Tactile Chevrons */}
        <div className="relative flex items-center justify-center max-w-md mx-auto">
          {/* Previous Card Floating Chevron */}
          {selectedIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous credential"
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 text-white shadow-2xl flex items-center justify-center active:scale-95 transition-all hover:bg-white/10"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next Card Floating Chevron */}
          {selectedIndex < certifications.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next credential"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 text-white shadow-2xl flex items-center justify-center active:scale-95 transition-all hover:bg-white/10"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Gesture-drag Card Container (touch-pan-y ensures vertical page scroll is completely free) */}
          <div className="w-full overflow-hidden px-1 py-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeCert.code}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
                    opacity: 0,
                    scale: 0.96,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
                    opacity: 0,
                    scale: 0.96,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                className="touch-pan-y cursor-grab active:cursor-grabbing w-full"
              >
                {/* Physical Metallic Card Preview */}
                <div
                  className={`w-full aspect-[1.58/1] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border ${activeTheme.badgeBorder} bg-gradient-to-br from-[#0c1017] via-[#080b11] to-[#040507] shadow-2xl relative overflow-hidden`}
                >
                  <div
                    className={`absolute -inset-full pointer-events-none opacity-40 bg-gradient-to-tr ${activeTheme.hologramGradient} blur-2xl`}
                  />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-6 rounded-md bg-gradient-to-br ${activeTheme.chipGradient} border border-amber-200/50 shadow-inner`}
                      />
                      <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                        {activeCert.code}
                      </span>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.badgeText}`}
                    >
                      {(() => {
                        const BrandIcon = activeTheme.Icon;
                        return <BrandIcon size={20} />;
                      })()}
                    </div>
                  </div>

                  {/* Card Title */}
                  <div className="relative z-10 my-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">
                      {activeCert.type.replace('Official ', '')}
                    </p>
                    <h4 className="text-base sm:text-lg font-semibold text-white leading-snug line-clamp-2">
                      {activeCert.title}
                    </h4>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                        {activeCert.issuer}
                      </p>
                      <p className="text-[10px] font-medium text-slate-300">{activeCert.period}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.badgeText}`}
                    >
                      <ShieldCheck size={11} />
                      VERIFIED
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quick-Switch Pill Bar Below Card */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-6">
          {certifications.map((cert, index) => {
            const isSelected = selectedIndex === index;
            const theme = BRAND_THEMES[cert.brand];
            return (
              <button
                key={cert.code}
                type="button"
                onClick={() => {
                  setDirection(index > selectedIndex ? 1 : -1);
                  setSelectedIndex(index);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? `${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} border shadow-md scale-105`
                    : 'bg-white/[0.05] border border-white/10 text-slate-400'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSelected ? 'bg-current animate-pulse' : 'bg-slate-500'
                  }`}
                />
                {cert.code}
              </button>
            );
          })}
        </div>

        {/* Mobile Dossier Telemetry Box */}
        <div className="bg-slate-950/90 backdrop-blur-2xl rounded-2xl border border-white/15 p-6 shadow-xl max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-emerald-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Public Credential
            </span>
            <span className="font-mono text-xs font-bold text-slate-400">
              {activeCert.code}
            </span>
          </div>

          <h4 className="text-lg font-semibold text-white mb-1">{activeCert.title}</h4>
          <p className="text-xs text-slate-400 mb-4">{activeCert.issuer} · {activeCert.school}</p>

          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500 mb-2">
              Validated Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeCert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenCert(selectedIndex)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase active:scale-[0.98] transition-all shadow-md"
            >
              <FileText size={15} />
              View Certificate PDF
            </button>
            {activeCert.verifyUrl && (
              <a
                href={activeCert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all active:scale-[0.98] ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.badgeText}`}
              >
                <ExternalLink size={14} />
                Verify On Claude Academy
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
