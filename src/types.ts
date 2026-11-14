export type CoordStatus = 'verified' | 'approximate' | 'pending-verification';
export type DatasetStatus = 'not-integrated' | 'unavailable' | 'summary-only';
export type MarkerShape = 'circle' | 'diamond' | 'triangle';

export interface PlanetaryAnalog {
  relevance: string;
  points: string[];
}

export interface DatasetInfo {
  name: string;
  status: DatasetStatus;
  note: string;
}

export interface ElevationStats {
  minM: number;
  maxM: number;
  meanM: number;
  medianM: number;
  searchBox: string;
  note: string;
  displayValue?: string;
  sourceLabel?: string;
}

export interface SourceRef {
  id: string;
  category: string;
  title: string;
  publisher: string;
  url?: string;
  note: string;
}

export interface LocationData {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: { lat: number; lng: number; status: CoordStatus; note: string };
  color: string;
  markerShape: MarkerShape;
  summary: string;
  geology: string[];
  surface: string[];
  subsurface: string[];
  processes: string[];
  lunar: PlanetaryAnalog;
  mars: PlanetaryAnalog;
  datasets: DatasetInfo[];
  /** Summary values computed offline. null = Data unavailable. */
  elevation: ElevationStats | null;
  limitations: string[];
  sourceIds: string[];
}

export type Objective = 'lunar' | 'mars';

export interface ComparisonRow {
  dimension: string;
  lunar: string | null;
  mars: string | null;
  /** Earth values per location id. null = no verified value available. */
  earth: Record<string, string | null>;
}
