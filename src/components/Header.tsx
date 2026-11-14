import { useState } from 'react';
import { Compass, Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#map', label: 'Discovery map' },
  { href: '#discovery', label: 'Hidden sites' },
  { href: '#compare', label: 'Compare' },
  { href: '#methodology', label: 'Methodology' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[1100] border-b border-white/[0.08] bg-[#120e0c]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="brand-orbit"><Compass className="h-5 w-5 text-amber-200" /></span>
          <span>
            <span className="block font-display text-lg font-bold tracking-[0.22em] text-white">EXOKEMET</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:block">Earth analog intelligence</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {LINKS.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
          <a href="#map" className="nav-cta">Enter explorer <span aria-hidden="true">↗</span></a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" className="rounded-lg border border-white/10 p-2 text-slate-300 hover:border-amber-300/40 hover:text-amber-200 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && <nav className="border-t border-white/[0.08] px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile navigation">{LINKS.map((link) => <a key={link.href} href={link.href} className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/[0.05] hover:text-amber-200" onClick={() => setOpen(false)}>{link.label}</a>)}</nav>}
    </header>
  );
}
