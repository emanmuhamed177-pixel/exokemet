import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  Check,
  Compass,
  Database,
  ExternalLink,
  MapPin,
  Mountain,
  Moon,
  Rocket,
  X,
} from 'lucide-react';
import type { CoordStatus, LocationData } from '../types';
import { getSiteMedia } from '../data/media';
import { getSourcesByIds } from '../data/sources';

type TabId = 'overview' | 'geology' | 'analogs' | 'data' | 'limits';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'geology', label: 'Terrain', icon: Mountain },
  { id: 'analogs', label: 'Mission lens', icon: Rocket },
  { id: 'data', label: 'Provenance', icon: Database },
  { id: 'limits', label: 'Boundaries', icon: AlertTriangle },
] as const;

const STATUS_LABEL: Record<CoordStatus, string> = {
  verified: 'Verified',
  approximate: 'Approximate',
  'pending-verification': 'Pending verification',
};

const formatCoord = (lat: number, lng: number) =>
  `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? 'E' : 'W'}`;

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-5">
      <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">{title}</h4>
      {items.length === 0 ? (
        <p className="text-sm italic text-slate-500">Data unavailable</p>
      ) : (
        <ul className="space-y-2 text-sm leading-6 text-slate-300">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AnalogCard({
  icon,
  title,
  relevance,
  points,
}: {
  icon: ReactNode;
  title: string;
  relevance: string;
  points: string[];
}) {
  return (
    <div className="mb-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        {title}
      </div>
      <p className="mb-2 text-xs font-medium text-amber-100">{relevance}</p>
      <ul className="space-y-1.5 text-xs leading-5 text-slate-400">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Props {
  location: LocationData | null;
  onClose: () => void;
}

export default function LocationPanel({ location, onClose }: Props) {
  const [tab, setTab] = useState<TabId>('overview');

  if (!location) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
        <MapPin className="mb-4 h-8 w-8 text-slate-600" />
        <p className="text-sm leading-6 text-slate-400">
          Select a marker or search a candidate to inspect its evidence trail.
        </p>
        <p className="mt-2 text-xs text-slate-600">Profiles keep unavailable values visible.</p>
      </div>
    );
  }

  const refs = getSourcesByIds(location.sourceIds);
  const media = getSiteMedia(location.id);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#20150f] shadow-2xl shadow-black/20">
      <figure className="relative h-36 shrink-0 overflow-hidden bg-[#120e0c] sm:h-40">
        <img
          src={media.path}
          alt={media.title}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#120e0c]/90 to-transparent"
        />
        <figcaption
          className="absolute inset-x-0 bottom-0 truncate px-4 pb-2 text-[9px] leading-4 text-white/80"
          title={`${media.credit} · ${media.license}`}
        >
          {media.credit} · {media.license}
        </figcaption>
      </figure>

      <div className="flex items-start justify-between border-b border-white/[0.08] bg-[#20150f] p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: location.color }} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Candidate profile
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-white">{location.name}</h3>
          <p className="mt-1 text-xs text-slate-300">
            {location.country} · {location.region}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/[0.06] hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div role="tablist" aria-label={`${location.name} profile sections`} className="flex shrink-0 overflow-x-auto border-b border-white/[0.08]">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`profile-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`profile-panel-${id}`}
            onClick={() => setTab(id)}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-[10px] uppercase tracking-[0.08em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-200/70 ${tab === id ? 'border-amber-200 text-amber-100' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`profile-panel-${tab}`}
        aria-labelledby={`profile-tab-${tab}`}
        className="min-h-0 flex-1 overflow-y-auto p-4"
      >
        {tab === 'overview' && (
          <>
            <p className="mb-5 text-sm leading-6 text-slate-300">{location.summary}</p>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Coordinates</div>
                <div className="mt-2 text-sm text-slate-100">
                  {formatCoord(location.coordinates.lat, location.coordinates.lng)}
                </div>
                <span className="mt-2 inline-flex rounded-full border border-amber-200/20 bg-amber-200/5 px-2 py-1 text-[10px] text-amber-100">
                  {STATUS_LABEL[location.coordinates.status]}
                </span>
                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  {location.coordinates.note}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Elevation summary</div>
                {location.elevation ? (
                  <>
                    <div className="mt-2 text-sm text-slate-100">
                      {location.elevation.displayValue ?? `${location.elevation.minM}–${location.elevation.maxM} m`}
                    </div>
                    <p className="mt-1 text-[11px] text-amber-100">
                      {location.elevation.sourceLabel ?? 'NASADEM · summary-only'}
                    </p>
                    <p className="mt-2 text-[11px] leading-5 text-slate-400">
                      {location.elevation.note}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm italic text-slate-400">Data unavailable</p>
                )}
              </div>
            </div>
            <Block title="Surface characteristics" items={location.surface} />
          </>
        )}

        {tab === 'geology' && (
          <>
            <Block title="Geological description" items={location.geology} />
            <Block title="Subsurface characteristics" items={location.subsurface} />
            <Block title="Environmental processes" items={location.processes} />
          </>
        )}

        {tab === 'analogs' && (
          <>
            <AnalogCard
              icon={<Moon className="h-4 w-4 text-amber-200" />}
              title="Lunar analog relevance"
              relevance={location.lunar.relevance}
              points={location.lunar.points}
            />
            <AnalogCard
              icon={<Rocket className="h-4 w-4 text-orange-200" />}
              title="Mars analog relevance"
              relevance={location.mars.relevance}
              points={location.mars.points}
            />
            <p className="rounded-lg border border-amber-200/15 bg-amber-200/[0.04] p-3 text-xs leading-5 text-amber-100/80">
              Relevance is qualitative. No similarity score is calculated in this prototype.
            </p>
          </>
        )}

        {tab === 'data' && (
          <>
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
              Available datasets
            </h4>
            <ul className="mb-6 space-y-2">
              {location.datasets.map((dataset) => (
                <li key={dataset.name} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <div className="flex items-start justify-between gap-3 text-xs text-slate-100">
                    <span>{dataset.name}</span>
                    {dataset.status === 'summary-only' ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-amber-200" />
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        {dataset.status === 'unavailable' ? 'unavailable' : 'not integrated'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-400">{dataset.note}</p>
                </li>
              ))}
            </ul>
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
              Source references
            </h4>
            <ul className="space-y-3">
              {refs.map((source) => (
                <li key={source.id}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-100 hover:underline">
                      {source.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-100">{source.title}</span>
                  )}
                  <div className="mt-0.5 text-[11px] leading-5 text-slate-400">
                    {source.publisher} — {source.note}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'limits' && (
          <>
            <div className="mb-4 flex gap-3 rounded-xl border border-amber-200/15 bg-amber-200/[0.04] p-3 text-xs leading-5 text-amber-100/80">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Similarity does not mean safe, suitable, or ready for landing or a permanent base.
            </div>
            <Block title="Scientific limitations" items={location.limitations} />
          </>
        )}
      </div>
    </div>
  );
}
