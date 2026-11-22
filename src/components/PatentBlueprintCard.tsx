'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Eye,
  FileText,
  ShieldCheck,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { PatentItem } from '../data/portfolio';

interface PatentBlueprintCardProps {
  patent: PatentItem;
  index: number;
  onOpenPdf: () => void;
}

export function PatentBlueprintCard({
  patent,
  index,
  onOpenPdf,
}: PatentBlueprintCardProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const isCyan = patent.accent === 'cyan';

  // Aesthetic Blueprint Design Tokens
  const theme = isCyan
    ? {
        accent: '#00F0FF',
        accentText: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/10',
        badgeBorder: 'border-cyan-500/30',
        cardGlow: 'hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(0,240,255,0.18)]',
        chipActive: 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200',
        nodeActive: 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.6)]',
        lineActive: 'bg-gradient-to-r from-cyan-400 to-sky-400',
        gridTint: 'rgba(0, 240, 255, 0.04)',
        Icon: Cpu,
      }
    : {
        accent: '#F59E0B',
        accentText: 'text-amber-400',
        badgeBg: 'bg-amber-500/10',
        badgeBorder: 'border-amber-500/30',
        cardGlow: 'hover:border-amber-400/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]',
        chipActive: 'bg-amber-500/20 border-amber-400/60 text-amber-200',
        nodeActive: 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.6)]',
        lineActive: 'bg-gradient-to-r from-amber-400 to-yellow-400',
        gridTint: 'rgba(245, 158, 11, 0.04)',
        Icon: Eye,
      };

  const MainIcon = theme.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="h-full will-change-transform"
    >
      <div
        className={`group relative h-full flex flex-col justify-between rounded-3xl bg-[#070b12]/95 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 transition-all duration-300 shadow-2xl ${theme.cardGlow}`}
      >
        {/* CAD Blueprint Drafting Grid Background */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.gridTint} 1px, transparent 1px), linear-gradient(to bottom, ${theme.gridTint} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* CAD Alignment Crosshairs in 4 corners */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
          +
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
          +
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
          +
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
          +
        </div>

        {/* Main Content Area */}
        <div className="relative z-10">
          {/* Schematic Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-inner transition-transform duration-300 group-hover:scale-110 ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText}`}
              >
                <MainIcon size={22} />
              </span>
              <div>
                <span className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-slate-400">
                  Intellectual Property
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-200">
                  <ShieldCheck size={13} className={theme.accentText} />
                  IPO · {patent.publicationNo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-400">
                PATENT #{patent.number}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9.5px] font-bold tracking-widest uppercase ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Published
              </span>
            </div>
          </div>

          {/* Subsystem & Title */}
          <div className="mb-4">
            <span
              className={`text-[10.5px] font-mono uppercase tracking-[0.2em] font-semibold block mb-2 ${theme.accentText}`}
            >
              {patent.subsystem}
            </span>
            <h4 className="text-xl sm:text-2xl font-light text-white leading-snug tracking-tight">
              {patent.title}
            </h4>
          </div>

          {/* Technical Summary Abstract */}
          <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
            {patent.summary}
          </p>

          {/* Architectural Pipeline Node Visualizer */}
          <div className="mb-6 rounded-2xl bg-black/40 border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <Layers size={12} className={theme.accentText} />
                System Architecture Pipeline
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                STAGE {activeStep + 1} / {patent.schematicSteps.length}
              </span>
            </div>

            {/* Interactive Schematic Flow Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {patent.schematicSteps.map((step, sIdx) => {
                const isActive = activeStep === sIdx;
                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(sIdx)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-200 outline-none select-none ${
                      isActive
                        ? theme.chipActive
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-wider mb-1 opacity-70">
                      0{sIdx + 1} · NODE
                    </span>
                    <span className="block text-xs font-semibold leading-tight line-clamp-1 text-white">
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Telemetry Callout */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
              <Sparkles size={14} className={`mt-0.5 shrink-0 ${theme.accentText}`} />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 mr-1.5">
                  {patent.schematicSteps[activeStep].label}:
                </span>
                <span className="text-slate-400">
                  {patent.schematicSteps[activeStep].desc}
                </span>
              </div>
            </div>
          </div>

          {/* Key Engineering Specifications */}
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5">
              Core Technical Claims &amp; Novelty
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {patent.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${theme.accentText} bg-current`} />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blueprint Footer & Verification Docket */}
        <div className="relative z-10 pt-4 border-t border-white/10 mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] mb-5 font-mono">
            <div>
              <span className="block text-slate-400 uppercase text-[9px] tracking-wider">
                Application
              </span>
              <span className="text-slate-200 font-semibold tabular-nums">
                {patent.applicationNo}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 uppercase text-[9px] tracking-wider">
                Filing Date
              </span>
              <span className="text-slate-200">{patent.filed}</span>
            </div>
            <div>
              <span className="block text-slate-400 uppercase text-[9px] tracking-wider">
                Published Date
              </span>
              <span className="text-slate-200">{patent.published}</span>
            </div>
            <div>
              <span className="block text-slate-400 uppercase text-[9px] tracking-wider">
                Inventor Role
              </span>
              <span className={`font-semibold ${theme.accentText}`}>{patent.role}</span>
            </div>
          </div>

          {/* Action Button: PDF Inspector */}
          <button
            type="button"
            onClick={onOpenPdf}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] shadow-md ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText} hover:bg-white/10 hover:text-white`}
          >
            <FileText size={15} />
            Inspect Official Patent Document (PDF)
            <ChevronRight size={14} className="ml-1 opacity-70" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default PatentBlueprintCard;
