import type { LocationData, DatasetInfo } from '../types';

/**
 * CENTRAL LOCATIONS CONFIGURATION
 * -------------------------------
 * All coordinates below are APPROXIMATE (area-level, 2 decimals) and are
 * marked "approximate" until the team verifies them against a trusted source
 * (e.g. a published paper or official survey). To verify: change `status`
 * to 'verified', update lat/lng, and update `note`.
 */

const COORD_NOTE = 'Approximate area-level position. Pending verification against a published source.';

const makeDatasets = (demUsed: boolean): DatasetInfo[] => [
  demUsed
    ? { name: 'NASADEM elevation (1 arc-second)', status: 'summary-only', note: 'Min, max, mean and median for the search box were computed offline. No raster layer is shown in this app.' }
    : { name: 'NASADEM elevation (1 arc-second)', status: 'unavailable', note: 'Not yet processed for this location.' },
  { name: 'Satellite imagery (NASA Worldview, Copernicus Sentinel)', status: 'not-integrated', note: 'Public portals are listed in Data Sources, but nothing is connected to this frontend.' },
  { name: 'Radar imagery (CSA RADARSAT)', status: 'not-integrated', note: 'Public archive exists, but is not connected to this frontend.' },
  { name: 'ERA5 regional climate summary (2015–2024)', status: 'summary-only', note: 'Modelled grid estimates for temperature, rainfall and wind are shown in the comparison table. They are regional proxies, not site sensor measurements.' },
  { name: 'On-site temperature, wind and dust measurements', status: 'unavailable', note: 'No direct sensor observations or dust-concentration measurements are included.' },
];

export const LOCATIONS: LocationData[] = [
  {
    id: 'white-desert',
    name: 'White Desert',
    country: 'Egypt',
    region: 'Farafra, New Valley Governorate',
    coordinates: { lat: 27.3, lng: 28.17, status: 'approximate', note: COORD_NOTE },
    color: '#e8d3a2',
    markerShape: 'circle',
    summary:
      'A desert area in the Farafra region known for pale chalk landforms sculpted by wind erosion.',
    geology: [
      'Surface dominated by Cretaceous chalk, a soft carbonate sedimentary rock.',
      'Wind-carved chalk pillars and mushroom-like rocks, often described as yardang-type features.',
    ],
    surface: [
      'Pale chalk outcrops rising above a sandy desert floor.',
      'Scattered rock fragments and sand between the formations.',
    ],
    subsurface: ['No verified subsurface or cave data is included in this project.'],
    processes: [
      'Wind abrasion is the main sculpting process.',
      'Hyper-arid conditions limit liquid-water activity today.',
    ],
    lunar: {
      relevance: 'Limited or indirect (to be assessed)',
      points: [
        'Chalk is sedimentary, not volcanic or impact-derived, so the rock-type match to lunar materials is weak.',
        'May still be useful for testing survey and mobility procedures in remote desert terrain.',
      ],
    },
    mars: {
      relevance: 'Potentially relevant for wind-eroded landforms',
      points: [
        'Wind-carved landforms are comparable in process to yardangs reported on Mars.',
        'The comparison is morphological only: Martian yardangs are not made of chalk.',
      ],
    },
    datasets: makeDatasets(true),
    elevation: {
      minM: -72, maxM: 293, meanM: 71.7, medianM: 57,
      searchBox: '27.1-27.5 N, 28.0-28.4 E',
      note: 'Computed offline from NASADEM tiles n27e027 and n27e028. Describes the whole search box, not the landform itself.',
    },
    limitations: [
      'Coordinates are approximate and pending verification.',
      'Chalk composition differs from lunar and Martian surface materials.',
      'No measured temperature, wind or dust data is integrated.',
      'Site-specific scientific references are still pending.',
    ],
    sourceIds: ['white-desert-geology', 'era5-weather', 'nasadem', 'nasa-earthdata', 'nasa-worldview', 'copernicus', 'nasa-mars', 'nasa-moon'],
  },
  {
    id: 'black-desert',
    name: 'Black Desert',
    country: 'Egypt',
    region: 'Bahariya, Giza Governorate',
    coordinates: { lat: 28.3, lng: 28.95, status: 'approximate', note: COORD_NOTE },
    color: '#4fb3a9',
    markerShape: 'diamond',
    summary:
      'A desert area near Bahariya Oasis where dark volcanic rock covers hills and parts of the plain.',
    geology: [
      'Dark basalt and dolerite-type volcanic rock caps hills above lighter sedimentary rock.',
      'Volcanic material overlies older sedimentary layers.',
    ],
    surface: [
      'Dark rock fragments scattered over pale sand, giving strong colour contrast.',
      'Conical hills and small buttes.',
    ],
    subsurface: ['No verified subsurface or cave data is included in this project.'],
    processes: [
      'Weathering and wind redistribute dark rock fragments over the surface.',
      'Process rates have not been measured in this project.',
    ],
    lunar: {
      relevance: 'Potentially relevant for basaltic surfaces',
      points: [
        'Dark basaltic rock is broadly comparable in rock type to lunar mare basalts.',
        'Earth basalt is altered by water, air and biology; lunar basalt is not. Direct equivalence is not established.',
      ],
    },
    mars: {
      relevance: 'Potentially relevant for basaltic terrain',
      points: [
        'Basalt is widespread across Martian volcanic plains.',
        'Martian dust, chemistry and atmosphere differ, so the match is partial.',
      ],
    },
    datasets: [
      ...makeDatasets(false),
      { name: 'SRTM 90 m elevation', status: 'summary-only', note: 'Single point sample at the approximate map pin; not a search-box min/max range.' },
    ],
    elevation: {
      minM: 134, maxM: 134, meanM: 134, medianM: 134,
      searchBox: 'Approximate map pin: 28.30° N, 28.95° E',
      note: 'Single SRTM 90 m point sample from OpenTopoData. The candidate coordinates are approximate, and this is not an area elevation range.',
      displayValue: 'About 134 m at the approximate map pin',
      sourceLabel: 'SRTM 90 m · single point',
    },
    limitations: [
      'Coordinates are approximate and pending verification.',
      'Exact rock types and ages are not confirmed in this project.',
      'No measured temperature, wind or dust data is integrated.',
      'Site-specific scientific references are still pending.',
    ],
    sourceIds: ['black-desert-geology', 'era5-weather', 'black-desert-srtm', 'nasa-earthdata', 'nasa-worldview', 'copernicus', 'nasa-moon', 'nasa-mars'],
  },
  {
    id: 'umm-jirsan',
    name: 'Umm Jirsan Lava Tube',
    country: 'Saudi Arabia',
    region: 'Harrat Khaybar, Madinah Province',
    coordinates: { lat: 25.15, lng: 39.85, status: 'pending-verification', note: 'Very approximate position within Harrat Khaybar. Must be verified before any real use.' },
    color: '#d4a64a',
    markerShape: 'triangle',
    summary:
      'A lava tube within the Harrat Khaybar volcanic field, a candidate for studying volcanic caves.',
    geology: [
      'Located in Harrat Khaybar, a basaltic lava field (a "harrat").',
      'Lava tubes form when the outer crust of a lava flow hardens while molten lava drains from inside.',
    ],
    surface: [
      'Rugged volcanic terrain with basalt flows.',
      'Collapse openings give access to the tube (access details need verification).',
    ],
    subsurface: [
      'Enclosed lava-tube passage.',
      'Interior dimensions and conditions are not included in this project.',
    ],
    processes: [
      'Volcanic flow and later collapse shaped the tube.',
      'Interior microclimate has not been measured in this project.',
    ],
    lunar: {
      relevance: 'Potentially high interest for lava-tube studies',
      points: [
        'Lunar lava tubes are proposed as shelters from radiation and temperature swings.',
        'Lunar tubes are often expected to be much larger because of lower gravity; scale differs and is unconfirmed.',
      ],
    },
    mars: {
      relevance: 'Potentially relevant for subsurface and cave exploration',
      points: [
        'Pits seen from orbit on Mars are candidate lava-tube skylights; this is unconfirmed.',
        'Earth caves are shaped by water, air and biology in ways that differ from Mars.',
      ],
    },
    datasets: makeDatasets(true),
    elevation: {
      minM: 913, maxM: 1558, meanM: 1122.9, medianM: 1094,
      searchBox: '24.9-25.4 N, 39.6-40.1 E',
      note: 'Computed offline from NASADEM tiles n24e039, n24e040, n25e039 and n25e040. Describes the whole search box and the surface only, not the lava-tube interior.',
    },
    limitations: [
      'Coordinates are very approximate and pending verification.',
      'Tube length, width and interior conditions are not verified here.',
      'Earth lava tubes are not direct equivalents of lunar or Martian ones.',
      'Site-specific scientific references are still pending.',
    ],
    sourceIds: ['umm-jirsan-paper', 'era5-weather', 'nasadem', 'nasa-earthdata', 'nasa-worldview', 'copernicus', 'nasa-lro', 'lroc', 'nasa-moon', 'nasa-mars'],
  },
];

export interface TileLayerConfig {
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string;
}

// Free, OpenStreetMap-compatible tile layers. No API keys needed.
export const TILE_LAYERS: TileLayerConfig[] = [
  {
    name: 'OpenStreetMap (official)',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
  {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Style: &copy; OpenTopoMap (CC-BY-SA)',
    maxZoom: 17,
    subdomains: 'abc',
  },
];
// Bounds covering all three locations (used for the initial view and Reset).
export const MAP_BOUNDS: [[number, number], [number, number]] = [
  [24.5, 27.5],
  [29, 40.5],
];
