import { BadgeInfo, GitCompareArrows, Layers3, SlidersHorizontal } from 'lucide-react';

const STEPS = [
  { number: '01', icon: Layers3, title: 'Describe the environment', text: 'Record geology, terrain, surface materials, processes, and context for each Earth candidate.' },
  { number: '02', icon: GitCompareArrows, title: 'Map to a mission lens', text: 'Compare like with like: lunar questions stay separate from Mars questions, and incompatible units are called out.' },
  { number: '03', icon: SlidersHorizontal, title: 'Expose the gaps', text: 'Show provenance, coverage, uncertainty, and unavailable measurements instead of quietly filling the blanks.' },
];

export default function MethodologySection() {
  return (
    <section id="methodology" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="section-kicker"><span className="section-number">04</span> Methodology & data boundaries</div>
      <div className="mt-3 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div><h2 className="section-title">Transparent by default.</h2><p className="section-copy">EXOKEMET is designed as a scientific starting point, not a certainty engine. The interface makes it possible to see what is known, what is inferred, and what still needs work.</p><div className="method-callout mt-7"><BadgeInfo className="h-5 w-5 shrink-0 text-amber-200" /><p><strong className="text-white">Analogy has limits.</strong> Earth cannot reproduce lunar gravity, vacuum, radiation, or the full Martian atmosphere. Similarity never establishes landing or permanent-base suitability.</p></div></div>
        <div className="grid gap-3 md:grid-cols-3">{STEPS.map(({ number, icon: Icon, title, text }) => <article key={number} className="method-card"><div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-[0.18em] text-amber-200">{number}</span><Icon className="h-5 w-5 text-slate-500" /></div><h3 className="mt-8 text-base font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}</div>
      </div>
      <div className="mt-10 grid gap-3 border-t border-white/[0.08] pt-6 text-xs text-slate-400 sm:grid-cols-3"><div><span className="status-key status-real" /> Real / cited summary</div><div><span className="status-key status-review" /> Approximate / needs review</div><div><span className="status-key status-unavailable" /> Data unavailable / not integrated</div></div>
    </section>
  );
}
