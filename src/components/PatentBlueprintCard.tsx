'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react';
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 p-6 sm:p-8 shadow-xl hover:shadow-2xl overflow-hidden"
    >
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-500/[0.03] via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Folio Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-400">
              DOCKET #{patent.number}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono font-medium text-emerald-400 tracking-wider uppercase">
              <CheckCircle2 size={11} className="text-emerald-400" />
              Published
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400 tracking-wider">
            {patent.publicationNo}
          </span>
        </div>

        {/* Subsystem & Title */}
        <div className="mb-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sky-400 font-medium block mb-2">
            {patent.subsystem}
          </span>
          <h4 className="text-xl sm:text-2xl font-light text-white leading-snug tracking-tight group-hover:text-sky-50 transition-colors">
            {patent.title}
          </h4>
        </div>

        {/* Institution & Role */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-5">
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <Building2 size={13} className="text-sky-400/80 shrink-0" />
            {patent.applicant}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px] tracking-wide uppercase">
            Role: <span className="text-slate-200 font-medium">{patent.role}</span>
          </span>
        </div>

        {/* Abstract */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {patent.summary}
        </p>

        {/* Core Technical Scope / Claims */}
        <div className="mb-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
            Key Technical Claims &amp; Architecture
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {patent.specs.map((spec) => (
              <div
                key={spec}
                className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.03] px-3 py-2 rounded-lg border border-white/5"
              >
                <span className="h-1 w-1 rounded-full bg-sky-400 shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Filing Registry & Action */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] mt-2">
        {/* Docket Key-Value Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono mb-5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
          <div>
            <span className="block text-slate-500 uppercase text-[9px] tracking-wider mb-0.5">
              App Number
            </span>
            <span className="text-slate-200 font-medium tabular-nums">
              {patent.applicationNo}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px] tracking-wider mb-0.5">
              Filing Date
            </span>
            <span className="text-slate-300 tabular-nums">{patent.filed}</span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px] tracking-wider mb-0.5">
              Gazette Issue
            </span>
            <span className="text-slate-300 tabular-nums">{patent.published}</span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px] tracking-wider mb-0.5">
              Jurisdiction
            </span>
            <span className="text-slate-300">IPO · India</span>
          </div>
        </div>

        {/* Action Button: Official PDF Docket */}
        <button
          type="button"
          onClick={onOpenPdf}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-sky-400/15 border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.99] group/btn cursor-pointer"
        >
          <FileText size={14} className="text-sky-400 group-hover/btn:scale-110 transition-transform" />
          <span>View Official Patent Document (PDF)</span>
          <ArrowUpRight size={14} className="opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all ml-1" />
        </button>
      </div>
    </motion.article>
  );
}

export default PatentBlueprintCard;
