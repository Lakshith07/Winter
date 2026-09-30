import React, { useState } from 'react';
import { Quote, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { getQuoteForDay } from '../../utils/motivation';

export default function QuoteCard() {
  const { stats, showToast } = useWinterArc();
  const [copied, setCopied] = useState(false);

  const currentDayNumber = stats.elapsedDaysCount > 0 ? stats.elapsedDaysCount : 1;
  const quote = getQuoteForDay(currentDayNumber);

  const handleCopy = () => {
    const textToCopy = `"${quote.text}" — ${quote.author} (Winter Arc Day ${currentDayNumber})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast("Quote copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background subtle quote mark */}
      <Quote className="absolute right-3 bottom-2 w-28 h-28 text-white/[0.02] pointer-events-none transform -rotate-12" />

      {/* Top Tag & Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-bold text-sky-400 tracking-wider flex items-center gap-1.5">
              <span>Quote of the Day</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 border border-sky-500/20">
                Day {String(currentDayNumber).padStart(2, '0')}
              </span>
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold">{quote.topic}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          title="Copy Quote"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Copy quote"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Quote text */}
      <div className="my-2">
        <p className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed">
          "{quote.text}"
        </p>
        <p className="text-xs font-bold text-sky-400 mt-2 tracking-wide text-right">
          — {quote.author}
        </p>
      </div>
    </div>
  );
}
