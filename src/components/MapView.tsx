import { useEffect, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import type { LocationData } from '../types';
import { MAP_BOUNDS } from '../data/locations';

interface Props { locations: LocationData[]; selectedId: string | null; selectTick: number; resetTick: number; onSelect: (id: string) => void; onReset: () => void }

const EARTH_IMAGERY = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const EARTH_TOPOGRAPHY = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const ESRI_ATTRIBUTION = 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community';

const makeIcon = (location: LocationData, selected: boolean) => L.divIcon({ className: 'exo-icon', html: `<div class="exo-pin exo-${location.markerShape} ${selected ? 'exo-selected' : ''}" style="--c:${location.color}"></div>`, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16] });

function MapController({ locations, selectedId, selectTick, resetTick }: Pick<Props, 'locations' | 'selectedId' | 'selectTick' | 'resetTick'>) {
  const map = useMap();
  useEffect(() => { const location = locations.find((item) => item.id === selectedId); if (location) map.flyTo([location.coordinates.lat, location.coordinates.lng], 8, { duration: 1.1 }); }, [locations, selectedId, selectTick, map]);
  useEffect(() => { if (resetTick > 0) map.flyToBounds(MAP_BOUNDS, { padding: [40, 40], duration: 1.1 }); }, [resetTick, map]);
  return null;
}

export default function MapView({ locations, selectedId, selectTick, resetTick, onSelect, onReset }: Props) {
  const [mapError, setMapError] = useState(false);
  const [loading, setLoading] = useState(true);
  const onReady = () => setLoading(false);
  const onError = () => { setLoading(false); setMapError(true); };
  return <div className="relative h-full w-full"><MapContainer bounds={MAP_BOUNDS} boundsOptions={{ padding: [40, 40] }} zoomControl={false} minZoom={3} worldCopyJump className="earth-map h-full w-full"><ZoomControl position="bottomright" /><LayersControl position="topright"><LayersControl.BaseLayer checked name="Earth satellite"><TileLayer url={EARTH_IMAGERY} attribution={ESRI_ATTRIBUTION} maxZoom={19} eventHandlers={{ load: onReady, tileerror: onError }} /></LayersControl.BaseLayer><LayersControl.BaseLayer name="Earth topography"><TileLayer url={EARTH_TOPOGRAPHY} attribution={ESRI_ATTRIBUTION} maxZoom={19} /></LayersControl.BaseLayer></LayersControl>{locations.map((location) => <Marker key={location.id} position={[location.coordinates.lat, location.coordinates.lng]} icon={makeIcon(location, location.id === selectedId)} eventHandlers={{ click: () => onSelect(location.id) }}><Popup><div className="min-w-[180px]"><div className="font-semibold text-amber-100">{location.name}</div><div className="mt-0.5 text-xs text-slate-400">{location.country} · {location.coordinates.status.replace('-', ' ')}</div><button type="button" onClick={() => onSelect(location.id)} className="mt-3 rounded-md bg-amber-200 px-2.5 py-1.5 text-xs font-semibold text-[#2a1308]">Open profile</button></div></Popup></Marker>)}<MapController locations={locations} selectedId={selectedId} selectTick={selectTick} resetTick={resetTick} /></MapContainer><div className="absolute right-3 top-3 z-[1000] rounded-md border border-amber-200/20 bg-[#2a1c15]/90 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-amber-100">Earth / satellite view</div><button type="button" onClick={onReset} className="absolute left-3 top-3 z-[1000] flex items-center gap-2 rounded-lg border border-white/10 bg-[#2a1c15]/95 px-3 py-2 text-xs font-medium text-slate-200 shadow-xl transition hover:border-amber-200/50 hover:text-amber-100"><RotateCcw className="h-3.5 w-3.5" /> Reset view</button>{loading && !mapError && <div className="absolute bottom-3 left-3 z-[1000] rounded-md border border-white/10 bg-[#2a1c15]/95 px-3 py-1.5 text-xs text-slate-400">Loading Earth imagery…</div>}{mapError && <div className="absolute bottom-12 left-3 right-3 z-[1000] flex items-center gap-2 rounded-lg border border-amber-200/20 bg-[#2a1c15]/95 p-3 text-xs text-amber-100 sm:right-auto sm:max-w-md"><AlertTriangle className="h-4 w-4 shrink-0" /><span>Earth imagery could not load. Candidate profiles remain available.</span></div>}</div>;
}
