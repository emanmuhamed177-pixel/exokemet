export interface SiteMedia {
  locationId: string;
  path: string;
  title: string;
  credit: string;
  sourceUrl: string;
  license: string;
}

export interface PlanetaryMedia {
  path: string;
  title: string;
  alt: string;
  credit: string;
  sourceUrl: string;
}

export const SITE_MEDIA: SiteMedia[] = [
  {
    locationId: 'white-desert',
    path: '/images/white-desert.jpg',
    title: 'White Desert, Farafra',
    credit: 'Zadokite / Omar Kamel via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saharan_White_Desert,_Farafra,_D1.jpg',
    license: 'CC BY-SA 3.0',
  },
  {
    locationId: 'black-desert',
    path: '/images/black-desert.jpg',
    title: 'Black Desert, Egypt',
    credit: 'nomo / Michael Hoefner via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Black-desert-egypt.jpg',
    license: 'CC BY-SA 2.5',
  },
  {
    locationId: 'umm-jirsan',
    path: '/images/umm-jirsan.jpg',
    title: 'Umm Jirsan Cave',
    credit: 'Stewart et al. (2024), Fig. 2 via PLOS ONE',
    sourceUrl: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0299292',
    license: 'Open access · CC BY',
  },
];

export const PLANETARY_MEDIA: Record<'earth' | 'moon' | 'mars', PlanetaryMedia> = {
  earth: {
    path: '/images/earth-globe.webp',
    title: 'Earth from Space',
    alt: 'Earth as seen from space, with North and South America beneath cloud cover.',
    credit: 'Reto Stöckli, Nazmi El Saleous, and Marit Jentoft-Nilsen / NASA GSFC',
    sourceUrl: 'https://science.nasa.gov/earth/earth-observatory/earth-from-space-885/',
  },
  moon: {
    path: '/images/moon-globe.webp',
    title: 'Full Moon on Christmas Day',
    alt: 'Full-disk image of Earth’s Moon created from Lunar Reconnaissance Orbiter images.',
    credit: 'NASA/Goddard/Lunar Reconnaissance Orbiter',
    sourceUrl: 'https://science.nasa.gov/resource/rare-full-moon-on-christmas-day/',
  },
  mars: {
    path: '/images/mars-globe.webp',
    title: 'Mars Planet Globe',
    alt: 'Valles Marineris hemisphere of Mars, assembled from Viking Orbiter images.',
    credit: 'NASA/JPL-Caltech',
    sourceUrl: 'https://science.nasa.gov/resource/mars-planet-globe/',
  },
};

export const getSiteMedia = (locationId: string) =>
  SITE_MEDIA.find((media) => media.locationId === locationId) ?? SITE_MEDIA[0];
