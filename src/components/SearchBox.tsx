import { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { LocationData } from '../types';

interface Props {
  locations: LocationData[];
  onSelect: (id: string) => void;
}

const RESULTS_ID = 'exokemet-location-search-results';

export default function SearchBox({ locations, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const normalizedQuery = query.trim().toLowerCase();
  const results = locations.filter((location) =>
    `${location.name} ${location.country} ${location.region}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const activeResult = activeIndex >= 0 ? results[activeIndex] : undefined;

  const choose = (id: string) => {
    onSelect(id);
    setQuery('');
    setActiveIndex(-1);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (results.length === 0) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => {
        if (event.key === 'ArrowDown') {
          return current < 0 || current >= results.length - 1 ? 0 : current + 1;
        }
        return current <= 0 ? results.length - 1 : current - 1;
      });
      return;
    }

    if (event.key === 'Enter' && open && results.length > 0) {
      event.preventDefault();
      choose((activeResult ?? results[0]).id);
    }
  };

  return (
    <div className="relative w-full sm:w-80">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" aria-hidden="true" />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(-1);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder="Search sites or regions"
        aria-label="Search candidate locations"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={RESULTS_ID}
        aria-activedescendant={open && activeResult ? `${RESULTS_ID}-${activeResult.id}` : undefined}
        className="w-full rounded-lg border border-white/10 bg-white/[0.035] py-2.5 pl-9 pr-9 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-amber-200/50 focus:ring-2 focus:ring-amber-200/10"
      />

      {query && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setQuery('');
            setActiveIndex(-1);
            setOpen(false);
          }}
          className="absolute right-2 top-2 rounded p-0.5 text-slate-500 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200/60"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {open && (
        <ul
          id={RESULTS_ID}
          role="listbox"
          aria-label="Candidate locations"
          className="absolute z-[1200] mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1a2b] py-1 shadow-2xl"
        >
          {results.length === 0 ? (
            <li role="presentation" className="px-3 py-3 text-sm text-slate-400" aria-live="polite">
              No matching location in this lens.
            </li>
          ) : (
            results.map((location, index) => (
              <li
                key={location.id}
                id={`${RESULTS_ID}-${location.id}`}
                role="option"
                aria-selected={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onPointerDown={(event) => {
                  event.preventDefault();
                  choose(location.id);
                }}
                className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition ${activeIndex === index ? 'bg-amber-200/10 text-amber-100' : 'text-slate-200 hover:bg-amber-200/10'}`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: location.color }} />
                <span>{location.name}</span>
                <span className="ml-auto text-xs text-slate-400">{location.country}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
