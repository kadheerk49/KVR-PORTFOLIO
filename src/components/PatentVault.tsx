'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type PanInfo } from 'framer-motion';
import {
  FileText,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Eye,
  RotateCw,
  RotateCcw,
} from 'lucide-react';
import type { PatentItem } from '../data/portfolio';

interface PatentVaultProps {
  patents: PatentItem[];
  onOpenPatent: (index: number) => void;
}

type TabKey = 'abstract' | 'claims' | 'docket';

/**
 * Desktop: Interactive 3D Holographic Patent Card with spring physics tilt & parallax layers.
 */
function HolographicPatentCard({
  patent,
  index,
  onOpenPdf,
}: {
  patent: PatentItem;
  index: number;
  onOpenPdf: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('abstract');
  const cardRef = useRef<HTMLDivElement>(null);

  // Framer Motion spring-based 3D tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-6deg', '6deg']);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const isCyan = patent.accent === 'cyan';
  const theme = isCyan
    ? {
        accent: '#00F0FF',
        accentText: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/10',
        badgeBorder: 'border-cyan-500/30',
        borderHover: 'hover:border-cyan-500/40',
        glow: 'from-cyan-500/[0.08] via-sky-500/[0.03] to-transparent',
        tagBg: 'bg-cyan-500/10 text-cyan-200 border-cyan-500/20',
        Icon: Cpu,
      }
    : {
        accent: '#F59E0B',
        accentText: 'text-amber-400',
        badgeBg: 'bg-amber-500/10',
        badgeBorder: 'border-amber-500/30',
        borderHover: 'hover:border-amber-500/40',
        glow: 'from-amber-500/[0.08] via-orange-500/[0.03] to-transparent',
        tagBg: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
        Icon: Eye,
      };

  const MainIcon = theme.Icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full [perspective:1400px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`group relative h-full flex flex-col justify-between rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-white/10 ${theme.borderHover} p-6 sm:p-8 transition-colors duration-300 shadow-2xl overflow-hidden will-change-transform`}
      >
        {/* Dynamic Specular Sheen tracked to mouse coordinates */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle 320px at ${x} ${y}, rgba(255,255,255,0.06), transparent 70%)`
            ),
          }}
        />

        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${theme.glow} pointer-events-none rounded-tr-3xl`}
        />

        {/* Header Bar & Holographic Official IPO Seal */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 mb-5">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border bg-white/[0.04] border-white/10 text-white shadow-inner group-hover:scale-105 transition-transform duration-300">
                <MainIcon size={19} className={theme.accentText} />
              </span>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400">
                  DOCKET #{patent.number}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-200">
                  <ShieldCheck size={12} className={theme.accentText} />
                  {patent.publicationNo}
                </span>
              </div>
            </div>

            {/* Rotating Micro-Holographic IPO Seal */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`h-7 w-7 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} flex items-center justify-center shadow-md`}>
                  <CheckCircle2 size={13} className={theme.accentText} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title, Domain & Subsystem */}
        <div style={{ transform: 'translateZ(45px)' }} className="relative z-10 mb-5">
          <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-medium block mb-2 ${theme.accentText}`}>
            {patent.subsystem}
          </span>
          <h4 className="text-xl sm:text-2xl font-light text-white leading-snug tracking-tight group-hover:text-sky-50 transition-colors">
            {patent.title}
          </h4>

          {/* Applicant & Role */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-3">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Building2 size={13} className="text-slate-400" />
              {patent.applicant}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono text-[11px]">
              Role: <strong className="text-slate-200 font-medium">{patent.role}</strong>
            </span>
          </div>
        </div>

        {/* Kinetic Inspection Tabs */}
        <div style={{ transform: 'translateZ(25px)' }} className="relative z-10 mb-6 flex-1 flex flex-col justify-between">
          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 mb-4">
            {(
              [
                { id: 'abstract', label: 'Abstract' },
                { id: 'claims', label: 'Architecture & Claims' },
                { id: 'docket', label: 'IPO Registry' },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex-1 py-1.5 px-2 rounded-lg text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer outline-none select-none text-center"
                >
                  {isActive && (
                    <motion.div
                      layoutId={`patent-tab-pill-${patent.number}`}
                      className="absolute inset-0 rounded-lg bg-white/10 border border-white/15 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[170px] flex items-center">
            <AnimatePresence mode="wait">
              {activeTab === 'abstract' && (
                <motion.div
                  key="tab-abstract"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {patent.summary}
                  </p>
                </motion.div>
              )}

              {activeTab === 'claims' && (
                <motion.div
                  key="tab-claims"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full space-y-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    <Layers size={12} className={theme.accentText} />
                    Verified System Specifications
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {patent.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.04] px-3 py-2 rounded-xl border border-white/5"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.badgeBg} border ${theme.badgeBorder}`} />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'docket' && (
                <motion.div
                  key="tab-docket"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px] bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                    <div className="p-2 rounded-xl bg-white/[0.02]">
                      <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 mb-0.5">
                        Application No.
                      </span>
                      <span className="text-slate-100 font-semibold tabular-nums">
                        {patent.applicationNo}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02]">
                      <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 mb-0.5">
                        Filing Date
                      </span>
                      <span className="text-slate-200 tabular-nums">{patent.filed}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02]">
                      <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 mb-0.5">
                        Publication Issue
                      </span>
                      <span className="text-slate-200 tabular-nums">{patent.published}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02]">
                      <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 mb-0.5">
                        Filing Authority
                      </span>
                      <span className="text-slate-200">IPO · New Delhi</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Inspection Button */}
        <div style={{ transform: 'translateZ(40px)' }} className="relative z-10 pt-4 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={onOpenPdf}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText} hover:bg-white/10 hover:text-white`}
          >
            <FileText size={15} />
            <span>Examine Official Patent PDF</span>
            <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-1" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Mobile-Specific: Interactive 3D Double-Sided Flippable Patent Dossier Card
 * Allows user to physically flip between Overview and Technical Claims in 3D on mobile.
 */
function MobileFlippablePatentCard({
  patent,
  onOpenPdf,
}: {
  patent: PatentItem;
  onOpenPdf: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const isCyan = patent.accent === 'cyan';
  const theme = isCyan
    ? {
        accent: '#00F0FF',
        accentText: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/10',
        badgeBorder: 'border-cyan-500/30',
        glow: 'from-cyan-500/[0.1] via-sky-500/[0.04] to-transparent',
        Icon: Cpu,
      }
    : {
        accent: '#F59E0B',
        accentText: 'text-amber-400',
        badgeBg: 'bg-amber-500/10',
        badgeBorder: 'border-amber-500/30',
        glow: 'from-amber-500/[0.1] via-orange-500/[0.04] to-transparent',
        Icon: Eye,
      };

  const MainIcon = theme.Icon;

  return (
    <div className="w-full [perspective:1400px]">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full min-h-[520px]"
      >
        {/* ========================================================== */}
        {/* FRONT FACE: Architecture Overview & Abstract               */}
        {/* ========================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="w-full rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${theme.glow} pointer-events-none rounded-tr-3xl`} />

          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-white/[0.04] border-white/10">
                  <MainIcon size={17} className={theme.accentText} />
                </span>
                <div>
                  <span className="block text-[9.5px] font-mono uppercase tracking-[0.2em] text-slate-400">
                    DOCKET #{patent.number}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                    {patent.publicationNo}
                  </span>
                </div>
              </div>

              {/* Flip Button in Top Right */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFlipped(true)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10.5px] font-mono tracking-wider cursor-pointer ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText}`}
              >
                <RotateCw size={11} className="animate-spin-slow" />
                <span>Claims ↻</span>
              </motion.button>
            </div>

            {/* Subsystem & Title */}
            <span className={`text-[10px] font-mono uppercase tracking-[0.18em] font-semibold block mb-1.5 ${theme.accentText}`}>
              {patent.subsystem}
            </span>
            <h4 className="text-lg font-normal text-white leading-snug tracking-tight mb-2.5">
              {patent.title}
            </h4>

            {/* Attribution */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <span className="text-slate-300 truncate">{patent.applicant}</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-300">Co-inventor</span>
            </div>

            {/* Abstract */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {patent.summary}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/10 mt-5 space-y-2.5">
            {/* Flip prompt button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsFlipped(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 cursor-pointer transition-colors"
            >
              <RotateCw size={12} className={theme.accentText} />
              <span>Tap to Flip: View System Claims &amp; Registry</span>
            </motion.button>

            {/* PDF Inspector Button */}
            <button
              type="button"
              onClick={onOpenPdf}
              className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] cursor-pointer ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText} hover:bg-white/10`}
            >
              <FileText size={14} />
              <span>Examine Official PDF</span>
              <ArrowUpRight size={13} className="opacity-70" />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* BACK FACE: Technical Claims & Verified Registry Docket     */}
        {/* ========================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 w-full h-full rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className={`absolute top-0 left-0 w-64 h-64 bg-gradient-to-br ${theme.glow} pointer-events-none rounded-tl-3xl`} />

          <div>
            {/* Back Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                <ShieldCheck size={14} className={theme.accentText} />
                <span>Claims &amp; Filing Docket</span>
              </div>

              {/* Flip Back Button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFlipped(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-[10.5px] font-mono tracking-wider text-slate-200 cursor-pointer"
              >
                <RotateCcw size={11} className={theme.accentText} />
                <span>Overview ↺</span>
              </motion.button>
            </div>

            {/* Core Specifications */}
            <div className="mb-4">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                Core Architectural Novelty
              </span>
              <div className="space-y-1.5">
                {patent.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} shrink-0`} />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Filing Registry Table */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                Filing Authority Record
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500">App No.</span>
                  <span className="text-slate-200 font-semibold">{patent.applicationNo}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500">Filed</span>
                  <span className="text-slate-200">{patent.filed}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500">Gazette</span>
                  <span className="text-slate-200">{patent.published}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500">Authority</span>
                  <span className="text-slate-200">IPO · India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions on Back Face */}
          <div className="pt-4 border-t border-white/10 mt-4 space-y-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsFlipped(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 cursor-pointer"
            >
              <RotateCcw size={12} className={theme.accentText} />
              <span>Flip Back to Abstract Overview</span>
            </motion.button>

            <button
              type="button"
              onClick={onOpenPdf}
              className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] cursor-pointer ${theme.badgeBg} ${theme.badgeBorder} ${theme.accentText} hover:bg-white/10`}
            >
              <FileText size={14} />
              <span>Examine Official PDF</span>
              <ArrowUpRight size={13} className="opacity-70" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * PatentVault: Master Interactive Patents Section Container
 * Features:
 * - Desktop: Dual 3D Spring-Tilt Holographic Dockets side-by-side with parallax depth layers.
 * - Mobile: Tactile Dual Segmented Capsule Switcher + 3D Double-Sided Flippable Card with 3D perspective fold.
 */
export function PatentVault({ patents, onOpenPatent }: PatentVaultProps) {
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  // Mobile Swipe handler (horizontal swipe with direction lock)
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      if (mobileIndex < patents.length - 1) {
        setDirection(1);
        setMobileIndex((prev) => prev + 1);
      }
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      if (mobileIndex > 0) {
        setDirection(-1);
        setMobileIndex((prev) => prev - 1);
      }
    }
  };

  const selectPatent = (idx: number) => {
    if (idx !== mobileIndex) {
      setDirection(idx > mobileIndex ? 1 : -1);
      setMobileIndex(idx);
    }
  };

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* DESKTOP VIEW (lg+): Side-by-Side Dual 3D Perspective Dockets   */}
      {/* ============================================================== */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch">
        {patents.map((patent, idx) => (
          <HolographicPatentCard
            key={patent.publicationNo}
            patent={patent}
            index={idx}
            onOpenPdf={() => onOpenPatent(idx)}
          />
        ))}
      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW (< lg): 3D Flippable Patent Deck & Segmented Dial  */}
      {/* ============================================================== */}
      <div className="block lg:hidden relative">
        {/* Top Segmented Capsule Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900/80 border border-white/10 mb-4 relative shadow-lg">
          {patents.map((p, idx) => {
            const isSelected = mobileIndex === idx;
            return (
              <button
                key={p.publicationNo}
                type="button"
                onClick={() => selectPatent(idx)}
                className="relative flex-1 py-2.5 px-3 rounded-xl text-xs font-mono tracking-wider transition-colors duration-200 outline-none select-none text-center cursor-pointer"
              >
                {isSelected && (
                  <motion.div
                    layoutId="mobile-patent-active-pill"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors font-medium flex items-center justify-center gap-1.5 ${
                    isSelected ? 'text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  <span className="opacity-60">#{p.number}</span>
                  <span className="truncate">
                    {p.accent === 'cyan' ? 'Quantum Chiplet' : 'Edge CV & IoT'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Pivot Animated Deck Surface with Swipe Support */}
        <div className="relative py-1 min-h-[530px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={mobileIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 60 : -60,
                  rotateY: dir > 0 ? 20 : -20,
                  opacity: 0,
                  scale: 0.94,
                }),
                center: {
                  x: 0,
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  x: dir < 0 ? 60 : -60,
                  rotateY: dir < 0 ? 20 : -20,
                  opacity: 0,
                  scale: 0.94,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="touch-pan-y"
            >
              <MobileFlippablePatentCard
                patent={patents[mobileIndex]}
                onOpenPdf={() => onOpenPatent(mobileIndex)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Dots & Controls */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2">
            {patents.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectPatent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === mobileIndex ? 'w-6 bg-sky-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to patent ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => selectPatent(0)}
              disabled={mobileIndex === 0}
              aria-label="Previous Patent"
              className={`p-2 rounded-xl border transition-all ${
                mobileIndex === 0
                  ? 'border-white/5 text-slate-600 cursor-not-allowed opacity-40'
                  : 'border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/10'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => selectPatent(1)}
              disabled={mobileIndex === 1}
              aria-label="Next Patent"
              className={`p-2 rounded-xl border transition-all ${
                mobileIndex === 1
                  ? 'border-white/5 text-slate-600 cursor-not-allowed opacity-40'
                  : 'border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/10'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatentVault;
