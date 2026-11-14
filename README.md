# EXOKEMET

Earth analog intelligence for Moon and Mars mission research.

## Run locally in Visual Studio Code

Open this folder in Visual Studio Code, open its integrated terminal, and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in a browser. On Windows, the included `run-windows.bat` starts the same local development server and installs the locked dependencies if `node_modules` is missing. The project pins npm `10.9.9` in `package.json` and keeps the exact dependency graph in `package-lock.json`.

The development server uses port `3000`. This contest-demo version intentionally has no sign-in or database requirement, so visitors can open the explorer directly. No `.env` file or MySQL service is needed.

For a production build:

```bash
npm run build
npm start
```

The production `start` command uses a portable Node bootstrap, so it does not rely on Unix-only shell environment syntax. The production server listens on `PORT` (default `3000`) and exposes `/health` for deployment checks. The committed `Dockerfile` installs dependencies, builds the frontend, and starts the server.

## Current experience

The app includes a responsive mission-led landing page, an interactive Leaflet discovery map, Moon/Mars filters, location search, candidate profiles, transparent qualitative comparison, methodology, and source registry. Selecting a candidate changes the hero backdrop and loads that site's photo at the top of its profile; the candidate information appears below, with the supplied image credit and license retained. The default backdrop is White Desert; the map/profile and Hidden Earth cards select Black Desert and Umm Jirsan as well. The orbit graphic uses locally bundled NASA images of Earth, the Moon and Mars. Each body moves on its own illustrative CSS orbit at a different speed; the animation respects the system reduced-motion preference and the paths are not to scale.

## Comparison data and limitations

The comparison table is populated with static 2015–2024 ERA5 historical grid summaries near the approximate candidate pins. Temperature, precipitation, and 10 m wind values are regional model estimates, not measurements from site weather stations; the approximate coordinates also have not been fully verified. Rainfall estimates do not establish the presence of surface water or groundwater. The Black Desert elevation is a single SRTM 90 m point sample, while the White Desert and Umm Jirsan entries are NASADEM search-box ranges, so those elevation values are not directly comparable.

Site-specific sources are linked in the table and registry: [White Desert karst study](https://doi.org/10.3986/ac.v52i2-3.12796), [Bahariya geology study](https://pubs.geoscienceworld.org/gpl/geoarabia/article-pdf/8/1/91/5441097/mustafa.pdf), and [Umm Jirsan study](https://doi.org/10.1371/journal.pone.0299292). Climate summaries use the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) with ERA5; Black Desert point elevation uses [SRTM 90 m via OpenTopoData](https://www.opentopodata.org/datasets/srtm/).

## Image and map sources

- White Desert: [Wikimedia Commons file](https://commons.wikimedia.org/wiki/File:Saharan_White_Desert,_Farafra,_D1.jpg), credited to Zadokite / Omar Kamel, CC BY-SA 3.0.
- Black Desert: [Wikimedia Commons file](https://commons.wikimedia.org/wiki/File:Black-desert-egypt.jpg), credited to nomo / Michael Hoefner, CC BY-SA 2.5.
- Umm Jirsan: [Stewart et al. 2024, PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0299292), Fig. 2, open access / CC BY.
- Earth globe: [NASA Earth Observatory — Earth from Space](https://science.nasa.gov/earth/earth-observatory/earth-from-space-885/), credit Reto Stöckli, Nazmi El Saleous, and Marit Jentoft-Nilsen / NASA GSFC; Earth surface and cloud data from Terra MODIS and NOAA GOES.
- Moon globe: [NASA — Full Moon on Christmas Day](https://science.nasa.gov/resource/rare-full-moon-on-christmas-day/), imagery from NASA's Lunar Reconnaissance Orbiter; credit NASA/Goddard/Lunar Reconnaissance Orbiter.
- Mars globe: [NASA — Mars Planet Globe](https://science.nasa.gov/resource/mars-planet-globe/), Valles Marineris mosaic assembled from 102 Viking Orbiter images; credit NASA/JPL-Caltech.
- Map: [Esri World Imagery and World Topographic Map](https://www.arcgis.com/home/item.html?id=10df2279f9e4db1cbf3f6a8e2c9f6d3b) via Leaflet, with required Esri/Maxar/Earthstar attribution. The default layer is satellite Earth imagery and a topographic Earth layer is available from the map controls.

All current candidate coordinates remain approximate or pending verification, and the app does not present invented measurements or similarity scores.
