import { motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

export interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  pdfUrl: string;
  verifyUrl?: string;
  verifyLabel?: string;
  accentColorClass?: string;
}

export function PdfViewerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  pdfUrl,
  verifyUrl,
  verifyLabel = 'Verify Badge',
  accentColorClass = 'border-emerald-400/30 text-emerald-300',
}: PdfViewerModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      key="pdf-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] bg-[#050507]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 16, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`relative w-full max-w-4xl h-[88vh] rounded-3xl bg-slate-950 border ${accentColorClass.split(' ')[0]} shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-slate-950/95">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
              {subtitle}
            </p>
            <p className="text-sm font-medium text-white truncate">{title}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-colors duration-300"
              >
                <ExternalLink size={14} />
                {verifyLabel}
              </a>
            )}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-white/40 hover:text-white transition-colors duration-300"
            >
              <ExternalLink size={14} />
              Open in new tab
            </a>
            <button
              onClick={onClose}
              aria-label="Close document viewer"
              className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/15 text-slate-300 hover:text-white hover:border-white/40 transition-colors duration-300 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Document Container */}
        <iframe src={pdfUrl} title={title} className="flex-1 w-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
export default PdfViewerModal;
