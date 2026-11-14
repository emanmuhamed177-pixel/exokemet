import type { SourceRef } from '../types';

// References support the static summaries shown in the comparison table.
// Regional model estimates are clearly labelled and are not site measurements.
export const SOURCES: SourceRef[] = [
  {
    id: 'white-desert-geology',
    category: 'Site-specific studies',
    title: 'Karst Rock Relief of Qara and White Desert',
    publisher: 'Acta Carsologica, 2023',
    url: 'https://doi.org/10.3986/ac.v52i2-3.12796',
    note: 'Describes carbonate rock relief, wind as a prevailing surface-shaping process in the White Desert, old dry karst-cave traces, and episodic rainfall effects. The study does not provide measurements for the approximate map pin.',
  },
  {
    id: 'black-desert-geology',
    category: 'Site-specific studies',
    title: 'Structural setting and tectonic evolution of the Bahariya Depression',
    publisher: 'GeoArabia, 2003',
    url: 'https://pubs.geoscienceworld.org/gpl/geoarabia/article-pdf/8/1/91/5441097/mustafa.pdf',
    note: 'Regional geological mapping describes basalt flows and dolerite intrusions in Bahariya. It does not establish a cave inventory or measurements at the approximate Black Desert map pin.',
  },
  {
    id: 'umm-jirsan-paper',
    category: 'Site-specific studies',
    title: 'First evidence for human occupation of a lava tube in Arabia: Umm Jirsan Cave',
    publisher: 'PLOS ONE, 2024',
    url: 'https://doi.org/10.1371/journal.pone.0299292',
    note: 'Peer-reviewed site study reports a 1,481 m horizontal passage length, typical passage height of 8–12 m, maximum width of 45 m, regional rainfall below 100 mm/year, and arid-region wadi/aquifer context.',
  },
  {
    id: 'era5-weather',
    category: 'Regional climate estimates',
    title: 'Open-Meteo Historical Weather API (ERA5)',
    publisher: 'Open-Meteo / ECMWF ERA5 reanalysis',
    url: 'https://open-meteo.com/en/docs/historical-weather-api',
    note: '2015–2024 daily estimates were summarized at grid locations near the approximate candidate pins. ERA5 is a regional model grid (~25 km), not a weather station or direct site measurement. Temperatures, precipitation, and 10 m wind summaries are identified in the table.',
  },
  {
    id: 'black-desert-srtm',
    category: 'Elevation sources',
    title: 'SRTM 90 m elevation data',
    publisher: 'USGS SRTM / OpenTopoData',
    url: 'https://www.opentopodata.org/datasets/srtm/',
    note: 'The approximate Black Desert map-pin elevation (28.30°N, 28.95°E) was queried as a single point. It is not comparable to the NASADEM search-box ranges shown for White Desert and Umm Jirsan.',
  },

  // Earth observation portals
  { id: 'nasadem', category: 'Earth data portals', title: 'NASADEM Merged DEM Global 1 arc second', publisher: 'NASA, via Earthdata Search', url: 'https://search.earthdata.nasa.gov/search?q=NASADEM', note: 'Source used for the offline White Desert and Umm Jirsan elevation summaries. These min/max ranges describe approximate search boxes, not individual landforms.' },
  { id: 'nasa-earthdata', category: 'Earth data portals', title: 'NASA Earthdata Search', publisher: 'NASA', url: 'https://search.earthdata.nasa.gov/', note: "NASA's main portal for discovering and accessing Earth science observations." },
  { id: 'nasa-worldview', category: 'Earth data portals', title: 'NASA Worldview', publisher: 'NASA', url: 'https://worldview.earthdata.nasa.gov/index.html', note: 'Interactive exploration of NASA satellite imagery and environmental observations.' },

  // Moon and Mars portals
  { id: 'nasa-pds', category: 'Moon & Mars data portals', title: 'NASA Planetary Data System (PDS)', publisher: 'NASA', url: 'https://pds.nasa.gov/', note: 'Long-term archive of lunar and Martian mission data: imagery, geoscience, atmospheres and more.' },
  { id: 'nasa-lro', category: 'Moon & Mars data portals', title: 'NASA Lunar Reconnaissance Orbiter (LRO) data', publisher: 'NASA PDS Geosciences Node', url: 'https://pds-geosciences.wustl.edu/missions/lro/', note: 'LRO instruments include LROC, LOLA, Diviner, LEND and Mini-RF.' },
  { id: 'nasa-diviner', category: 'Moon & Mars data portals', title: 'LRO Diviner lunar data', publisher: 'NASA PDS Geosciences Node', url: 'https://pds-geosciences.wustl.edu/missions/lro/diviner.htm', note: 'Maps lunar surface temperatures; polar products could be compared with cold or ice-bearing terrestrial environments.' },

  // Space agency partner resources
  { id: 'csa-rcm', category: 'Space agency partner resources', title: 'RADARSAT Constellation Mission (RCM) data', publisher: 'Canadian Space Agency (CSA)', url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/rcm', note: 'Radar Earth-observation satellites that scan day or night in any weather.' },
  { id: 'csa-radarsat1', category: 'Space agency partner resources', title: 'RADARSAT-1 data', publisher: 'Canadian Space Agency (CSA)', url: 'https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1', note: 'Radar imagery archive released under an open license.' },
  { id: 'csa-sar-tutorial', category: 'Space agency partner resources', title: 'Synthetic Aperture Radar (SAR) Python tutorial', publisher: 'Canadian Space Agency (CSA)', url: 'https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial', note: 'Tutorial for working with SAR imagery using Python and QGIS.' },
  { id: 'copernicus', category: 'Space agency partner resources', title: 'Copernicus Data Space Ecosystem', publisher: 'European Space Agency (ESA)', url: 'https://dataspace.copernicus.eu/', note: 'Free and open access to Sentinel Earth-observation data, with visualization and processing tools.' },
  { id: 'esa-osc', category: 'Space agency partner resources', title: 'ESA Open Science Catalog', publisher: 'European Space Agency (ESA)', url: 'https://opensciencedata.esa.int/', note: 'Catalog of public geoscience datasets, products, experiments and workflows.' },
  { id: 'jaxa-gportal', category: 'Space agency partner resources', title: 'JAXA G-Portal', publisher: 'Japan Aerospace Exploration Agency (JAXA)', url: 'https://gportal.jaxa.jp/gpr/index/index', note: 'Earth-observation products from JAXA missions, searchable by variable.' },

  // General and map credits
  { id: 'nasa-moon', category: 'General & map credits', title: 'NASA Moon science and exploration', publisher: 'NASA', url: 'https://science.nasa.gov/moon/', note: 'General background on the Moon. Verify specific citations before publishing.' },
  { id: 'nasa-mars', category: 'General & map credits', title: 'NASA Mars science and exploration', publisher: 'NASA', url: 'https://science.nasa.gov/mars/', note: 'General background on Mars. Verify specific citations before publishing.' },
  { id: 'lroc', category: 'General & map credits', title: 'Lunar Reconnaissance Orbiter Camera (LROC)', publisher: 'Arizona State University / NASA', url: 'https://www.lroc.asu.edu/', note: 'Source of lunar imagery, including pits. Not integrated into this app.' },
  { id: 'openfreemap', category: 'General & map credits', title: 'OpenFreeMap public map instance', publisher: 'OpenFreeMap / OpenMapTiles / OpenStreetMap', url: 'https://openfreemap.org/quick_start/', note: 'No-key vector map style used in the embedded explorer through the MapLibre GL Leaflet bridge.' },
  { id: 'osm', category: 'General & map credits', title: 'OpenStreetMap copyright and licence', publisher: 'OpenStreetMap contributors', url: 'https://www.openstreetmap.org/copyright', note: 'Base map data used for the map tiles.' },
  { id: 'opentopomap', category: 'General & map credits', title: 'OpenTopoMap', publisher: 'OpenTopoMap (CC-BY-SA)', url: 'https://opentopomap.org', note: 'Topographic map style, based on OpenStreetMap and SRTM.' },
  { id: 'carto', category: 'General & map credits', title: 'CARTO basemaps', publisher: 'CARTO', url: 'https://carto.com/basemaps/', note: 'Dark basemap style, based on OpenStreetMap data.' },
];

export const getSourcesByIds = (ids: string[]) => SOURCES.filter((s) => ids.includes(s.id));
