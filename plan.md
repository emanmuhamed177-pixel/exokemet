# EXOKEMET — Implementation and Design Plan

## Product scope

Recreate the supplied EXOKEMET contest demo as a responsive, login-free scientific discovery website. Preserve the provided React + Vite application, candidate data, Leaflet map, search and Moon/Mars filters, candidate profiles, comparisons, methodology, source registry, and the three supplied landscape photographs. Keep stated scientific uncertainty and source attribution intact; do not introduce calculated similarity scores or stronger mission-suitability claims than the demo supports.

Apply the user's visual direction to the candidate profile shown in the reference: replace its isolated blue/navy header with a wide photograph of the selected site, then place the candidate name and profile information beneath the image. Keep legibility, map function, and the amber highlight system unchanged. Replace the three illustrated Earth, Moon, and Mars bodies in the orbit graphic with real, NASA-sourced planetary images.

## Implementation

- Import the supplied app rather than replacing its information architecture or data model.
- Preserve the React 18 + TypeScript + Vite frontend, existing component/data boundaries, React Leaflet map, and Express production server.
- Add a wide, responsive photo at the top of the candidate profile using the selected site's supplied photograph; put its title and all profile information below the image. Retain the existing profile tabs and details. Use warm dark umber for the profile content, light text, borders, and amber/gold active states; avoid the isolated cool-blue cast.
- Replace the orbit illustration's Earth, Moon, and Mars icon glyphs with correctly identified, local image assets. Animate all three along distinct orbital paths with different periods and directions. Respect the user's reduced-motion system preference by leaving the images in readable, distinct static positions. Preserve the orbit composition and labels, provide meaningful image descriptions, include a “not to scale” caveat, and document source credits and source-page URLs. The motion is a CSS effect and adds no dependency.
- Preserve `public/images/` (supplied White Desert, Black Desert, Umm Jirsan, logo, plus the three planetary images), `public/manus-routes.json`, package lock, build scripts, Dockerfile, and `/health` endpoint.
- Keep the project's dependency set from the package manifest; no authentication, database, or new external service is needed by the demo. Bundle photos locally so the orbit graphic works in the Visual Studio Code project and after the user later uploads it to GitHub, without image-hosting dependencies.

## Project structure

- `src/App.tsx`: page assembly, mission filter, site selection, discovery cards.
- `src/components/`: header, intro, search, interactive map, site profile, comparisons, methodology, and sources.
- `src/data/`: candidate records, comparisons, site media, planetary image metadata, and references.
- `src/types.ts`: shared candidate and research types.
- `src/index.css`: global palette, Leaflet styling, shared interface component styles, and reduced-motion-aware orbit animation.
- `public/images/`: supplied site photographs, EXOKEMET mark, and locally bundled planetary photos.
- `public/manus-routes.json`: static page-route manifest.
- `server/index.js`: development/production HTTP serving and health response.
- `Dockerfile`, `package.json`, and `package-lock.json`: reproducible build and runtime.

## Design

Use the design language already present in the supplied website and its image assets: a warm, terrain-inspired dark observatory aesthetic, tuned so the candidate-profile surface feels like part of the same interface.

- **Design Movement:** Contemporary scientific field atlas with a restrained dark observatory interface.
- **Core Principles:** Research-first hierarchy; warm earth-derived surfaces; transparent, inspectable evidence; responsive map-and-profile pairing.
- **Color Philosophy:** Deep brown-black and umber surfaces echo desert rock and night fieldwork. Amber and muted gold identify active controls, evidence, and key markers. Neutral slate supports secondary information. The profile's blue header gives way to a photographic site image, with warm dark information surfaces below so one panel no longer breaks the palette.
- **Layout Paradigm:** Mission-led editorial opening followed by a wide map and adjacent evidence panel, then a horizontal flow of discovery cards, comparison, methodology, and sources.
- **Signature Elements:** Fine orbital/grid traces; warm amber indicator lights and active states; terrain and planetary photography used as mission context.
- **Interaction Philosophy:** Deliberate and reversible exploration—filter or search, select a location, inspect its evidence tabs, and reset without implying certainty.
- **Animation:** Keep existing short, low-amplitude transitions for hover, focus, backdrop changes, and map selection. Animate the three planetary image bodies on separate, slow CSS orbits, with clear offsets and a `prefers-reduced-motion` static alternative; avoid motion that distracts from reading data.
- **Typography System:** Preserve the supplied Inter sans-serif for interface and evidence, with Cinzel reserved for prominent headings and candidate names. Use compact uppercase tracking for metadata, comfortable line height for explanations, and clear numeric labels for coordinates.
- **Brand Essence:** Earth-analog intelligence for planetary field research; candid, exploratory, evidence-led.
- **Brand Voice:** Specific and measured; distinguish an editorial shortlist from a validated scientific result. Examples: “A shortlist built for questions, not certainty.” “Open the evidence trail.”
- **Wordmark & Logo:** Reuse the supplied EXOKEMET logo and its orbit/planet motif; do not replace it with default text branding.
- **Signature Brand Color:** Muted amber-gold, drawn from the desert imagery, used for active and evidence-bearing details rather than broad fills.

## Serving and constraints

The Express server serves Vite in development on the configured port 3000 and serves built assets in production. Preserve the unauthenticated `/health` endpoint and Dockerfile. Candidate climate summaries are historical regional ERA5 grid estimates (2015–2024), not site weather-station measurements; approximate coordinates and elevation differences retain their existing cautions. Map basemap attribution remains visible. Planet photos are packaged in `public/images/` with their source-page credits documented, so local development does not rely on external image URLs.
