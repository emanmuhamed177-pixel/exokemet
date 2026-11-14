import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Filter, Map, ShieldCheck, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Intro from './components/Intro';
import SearchBox from './components/SearchBox';
import MapView from './components/MapView';
import LocationPanel from './components/LocationPanel';
import ComparisonSection from './components/ComparisonSection';
import SourcesSection from './components/SourcesSection';
import MethodologySection from './components/MethodologySection';
import { LOCATIONS } from './data/locations';
import type { Objective } from './types';

type ObjectiveFilter = Objective | 'all';

const DISCOVERY_NOTES: Record<string, string> = {
  'umm-jirsan': 'Subsurface analogue with the strongest cave-exploration signal in the current shortlist.',
  'black-desert': 'Basaltic terrain makes this a useful candidate for volcanic-surface field procedures.',
  'white-desert': 'Wind-sculpted morphology offers a clear process analogue for remote terrain studies.',
};

const FILTERS: { id: ObjectiveFilter; label: string; detail: string }[] = [
  { id: 'all', label: 'All candidates', detail: '3 sites' },
  { id: 'lunar', label: 'Moon-facing', detail: 'basalt · caves · mobility' },
  { id: 'mars', label: 'Mars-facing', detail: 'wind · dust · landforms' },
];

export default function App() {

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectTick, setSelectTick] = useState(0);
  const [resetTick, setResetTick] = useState(0);
  const [objective, setObjective] = useState<ObjectiveFilter>('all');
  const panelRef = useRef<HTMLDivElement>(null);

  const visibleLocations = useMemo(() => {
    if (objective === 'all') return LOCATIONS;
    return LOCATIONS.filter((location) => location[objective].relevance.length > 0);
  }, [objective]);
  const selected = LOCATIONS.find((location) => location.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && !visibleLocations.some((location) => location.id === selectedId)) setSelectedId(null);
  }, [objective, selectedId, visibleLocations]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setSelectTick((tick) => tick + 1);
    if (window.innerWidth < 1024) setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
  }, []);

  const handleReset = () => {
    setSelectedId(null);
    setResetTick((tick) => tick + 1);
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Intro activeLocation={selected ?? LOCATIONS[0]} onExplore={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })} />

        <section id="map" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
          <div className="section-kicker"><span className="section-number">01</span> Global discovery map</div>
          <div className="mt-3 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div><h2 className="section-title">Find the signal in the noise.</h2><p className="section-copy">Explore a small, transparent shortlist of Earth locations. Filter by mission context, then open a profile to see the evidence and its boundaries.</p></div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="live-dot" /> Map layers are public basemaps · candidate data is static and reviewable</div>
          </div>
          <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter candidate locations by mission context"><Filter className="mr-1 h-4 w-4 text-amber-300" aria-hidden="true" />{FILTERS.map((filter) => <button key={filter.id} type="button" onClick={() => setObjective(filter.id)} aria-pressed={objective === filter.id} className={`filter-pill ${objective === filter.id ? 'filter-pill-active' : ''}`}><span>{filter.label}</span><span className="filter-detail">{filter.detail}</span></button>)}</div>
            <SearchBox locations={visibleLocations} onSelect={handleSelect} />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="map-frame h-[520px] min-h-[420px] lg:h-[680px]"><MapView locations={visibleLocations} selectedId={selectedId} selectTick={selectTick} resetTick={resetTick} onSelect={handleSelect} onReset={handleReset} /></div>
            <div ref={panelRef} className="h-[600px] scroll-mt-24 lg:h-[680px]"><LocationPanel key={selectedId ?? 'none'} location={selected} onClose={() => setSelectedId(null)} /></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400"><span className="inline-flex items-center gap-2"><span className="legend-dot legend-amber" /> Earth candidate</span><span className="inline-flex items-center gap-2"><span className="legend-dot legend-gold" /> Selected profile</span><span className="inline-flex items-center gap-2"><Map className="h-3.5 w-3.5 text-slate-500" /> Pan, zoom, and switch basemaps with the map controls</span></div>
        </section>

        <section id="discovery" className="border-y border-white/[0.06] bg-[#20150f]/60">
          <div className="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
            <div className="section-kicker"><span className="section-number">02</span> Hidden Earth site discovery</div>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="section-title">A shortlist built for questions, not certainty.</h2><p className="section-copy">This first-pass ordering is editorial triage based on the current descriptions. It is not a calculated similarity score, a landing recommendation, or a NASA assessment.</p></div><div className="status-badge"><ShieldCheck className="h-4 w-4" /> Preliminary · review required</div></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">{visibleLocations.map((location, index) => <article key={location.id} className="discovery-card group" tabIndex={0} onClick={() => handleSelect(location.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') handleSelect(location.id); }}><div className="flex items-start justify-between gap-4"><span className="rank-mark">0{index + 1}</span><span className="preliminary-label">{objective === 'all' ? 'Cross-context' : `${objective === 'lunar' ? 'Moon' : 'Mars'} lens`}</span></div><div className="mt-8 flex items-center gap-3"><span className="site-mark" style={{ backgroundColor: location.color }} /><div><h3 className="text-lg font-semibold text-white">{location.name}</h3><p className="text-xs text-slate-400">{location.country} · {location.region}</p></div></div><p className="mt-4 min-h-[54px] text-sm leading-6 text-slate-300">{DISCOVERY_NOTES[location.id]}</p><div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-amber-200"><span>Open scientific profile</span><span aria-hidden="true">↗</span></div></article>)}</div>
            {visibleLocations.length === 0 && <div className="empty-state mt-8">No candidates match this lens yet. Reset the filter to see the full shortlist.</div>}
          </div>
        </section>

        <ComparisonSection locations={LOCATIONS} selectedId={selectedId} />
        <MethodologySection />
        <SourcesSection />
        <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-8"><div className="closing-note"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10"><Sparkles className="h-5 w-5 text-amber-200" /></div><div><p className="text-sm font-semibold text-white">Earth holds clues to other worlds.</p><p className="mt-1 text-sm leading-6 text-slate-400">EXOKEMET turns those clues into a transparent starting point for field teams, planetary scientists, and the next generation of explorers.</p></div></div></section>
      </main>
      <footer className="border-t border-white/[0.07] px-4 py-6 text-center text-xs text-slate-500 sm:px-6">EXOKEMET · Candidate analog environments, not confirmed scientific matches · Map data © OpenStreetMap contributors</footer>
    </div>
  );
}
