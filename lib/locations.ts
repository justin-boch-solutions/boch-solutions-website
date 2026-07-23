export interface Location {
  slug: string;
  name: string;
  distanceKm: number;
  direction: string;
  blurb: string;
}

export const locations: Location[] = [
  {
    slug: "telgte",
    name: "Telgte",
    distanceKm: 15,
    direction: "östlich",
    blurb: "Wallfahrtsstadt im Münsterland mit starkem Handwerk in Bau, Ausbau und SHK.",
  },
  {
    slug: "greven",
    name: "Greven",
    distanceKm: 20,
    direction: "nördlich",
    blurb: "Wachsende Stadt am Flughafen Münster/Osnabrück mit vielen inhabergeführten Betrieben.",
  },
  {
    slug: "nottuln",
    name: "Nottuln",
    distanceKm: 20,
    direction: "südwestlich",
    blurb: "Gemeinde im Baumberge-Gebiet mit vielen Handwerksbetrieben in Bau und Ausbau.",
  },
  {
    slug: "havixbeck",
    name: "Havixbeck",
    distanceKm: 15,
    direction: "westlich",
    blurb: "Kleinstadt im Münsterland, geprägt von Landwirtschaft und regionalem Handwerk.",
  },
  {
    slug: "senden",
    name: "Senden",
    distanceKm: 20,
    direction: "südlich",
    blurb: "Gemeinde an der Werse mit gewachsenem Mittelstand und vielen Familienbetrieben.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
