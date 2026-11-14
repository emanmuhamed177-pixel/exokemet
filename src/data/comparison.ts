import type { ComparisonRow } from '../types';

/**
 * Comparison values include regional ERA5 model estimates and published
 * observations. Grid estimates are not site instrumentation. No similarity
 * scores are computed.
 */
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Geology',
    lunar: 'Basaltic mare plains and anorthositic highlands; impact-shaped crust.',
    mars: 'Basaltic volcanic terrains plus sedimentary deposits linked to past water.',
    earth: {
      'white-desert': 'Cretaceous chalk (sedimentary carbonate).',
      'black-desert': 'Dark basaltic/dolerite-type rock over sedimentary layers.',
      'umm-jirsan': 'Basaltic lava field (harrat) with a lava tube.',
    },
  },
  {
    dimension: 'Terrain',
    lunar: 'Craters, regolith plains and pits.',
    mars: 'Dunes, yardangs, volcanic plains and canyons.',
    earth: {
      'white-desert': 'Wind-sculpted chalk landforms in open desert.',
      'black-desert': 'Dark conical hills scattered over lighter ground.',
      'umm-jirsan': 'Rugged lava field with collapse openings.',
    },
  },
  {
    dimension: 'Surface materials',
    lunar: 'Fine, sharp-edged regolith with no water or air weathering.',
    mars: 'Basaltic sand and dust, with salts and possible clays.',
    earth: {
      'white-desert': 'Chalk rock and sand.',
      'black-desert': 'Dark volcanic fragments on pale sand.',
      'umm-jirsan': 'Basalt rock and lava surfaces.',
    },
  },
  {
    dimension: 'Elevation (DEM; statistic varies by site)',
    lunar: 'Not compared: Earth elevations use a different reference surface.',
    mars: 'Not compared: Earth elevations use a different reference surface.',
    earth: {
      'white-desert': '-72 to 293 m (NASADEM search-box range).',
      'black-desert': '134 m at the approximate map point (SRTM 90 m; point value, not an area range).',
      'umm-jirsan': '913 to 1558 m (NASADEM search-box range; surface only).',
    },
  },
  {
    dimension: 'Temperature and environmental extremes',
    lunar: 'Very large day-night swings, vacuum and radiation exposure.',
    mars: 'Cold, thin carbon-dioxide atmosphere with large daily swings.',
    earth: {
      'white-desert': 'ERA5 grid estimate, 2015–24: mean 23.6°C; average daily high/low 30.6/16.3°C; daily max/min 47.1/−1.7°C; mean precipitation 3.6 mm/year.',
      'black-desert': 'ERA5 grid estimate, 2015–24: mean 23.1°C; average daily high/low 29.5/16.2°C; daily max/min 46.2/1.6°C; mean precipitation 6.3 mm/year.',
      'umm-jirsan': 'ERA5 grid estimate, 2015–24: mean 26.2°C; average daily high/low 31.8/19.6°C; daily max/min 43.8/0.1°C; mean precipitation 52.5 mm/year.',
    },
  },
  {
    dimension: 'Dust and wind processes',
    lunar: 'No wind; dust behaviour is driven by electrostatic and mechanical effects.',
    mars: 'Wind erosion, dust storms and dune activity.',
    earth: {
      'white-desert': 'Wind is the prevailing rock-shaping process in the published White Desert study. ERA5 grid proxy: mean daily maximum wind 18.0 km/h; highest daily maximum 49.1 km/h. Not a dust measurement.',
      'black-desert': 'ERA5 grid proxy, 2015–24: mean daily maximum wind 20.8 km/h; highest daily maximum 59.2 km/h. Dust concentration and abrasion rate are not measured.',
      'umm-jirsan': 'ERA5 grid proxy, 2015–24: mean daily maximum wind 26.1 km/h; highest daily maximum 50.6 km/h. The lava tube provides shade from wind; dust concentration is not measured.',
    },
  },
  {
    dimension: 'Water or ice',
    lunar: 'Possible ice in permanently shadowed polar regions.',
    mars: 'Polar and subsurface ice; evidence of past liquid water.',
    earth: {
      'white-desert': 'ERA5 grid estimate averages 3.6 mm precipitation/year (2015–24). Published geomorphology also describes brief heavy-rain events; no groundwater inventory is included.',
      'black-desert': 'ERA5 grid estimate averages 6.3 mm precipitation/year (2015–24). No verified surface-water or groundwater inventory is included.',
      'umm-jirsan': 'The study reports regional rainfall below 100 mm/year and wadis feeding aquifers/springs. ERA5 grid estimate: 52.5 mm/year (2015–24); no cave water-level measurement is reported.',
    },
  },
  {
    dimension: 'Caves and subsurface features',
    lunar: 'Lava tubes are inferred from observed pits; unconfirmed.',
    mars: 'Pits are candidate lava-tube skylights; unconfirmed.',
    earth: {
      'white-desert': 'A 2023 study describes old, now-dry karst cave features in the White Desert region; no cave survey is tied to this approximate map point.',
      'black-desert': 'The sources included here do not document a cave survey for this candidate; that is not evidence that caves are absent.',
      'umm-jirsan': 'Published lava-tube passage length: 1,481 m; typical height 8–12 m; maximum width 45 m. Interior temperature/humidity measurements are not provided in this project.',
    },
  },
  {
    dimension: 'Robotic and human exploration relevance',
    lunar: 'Shelter, radiation protection and use of local resources.',
    mars: 'Landing safety, mobility, resources and habitat protection.',
    earth: {
      'white-desert': 'Possible field-testing of survey procedures (to be assessed).',
      'black-desert': 'Possible field-testing on basaltic terrain (to be assessed).',
      'umm-jirsan': 'Possible field-testing for cave exploration (to be assessed).',
    },
  },
];
