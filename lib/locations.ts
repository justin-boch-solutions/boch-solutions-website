export interface Location {
  slug: string;
  name: string;
  /** Straßenentfernung vom Standort Münster, grob gerundet. 0 beim eigenen Standort. */
  distanceKm: number;
  direction: string;
  /** Was den Ort ausmacht – muss je Ort wirklich unterschiedlich sein, sonst
   *  wertet Google die Ortsseiten als austauschbare Dopplungen. */
  blurb: string;
  /** Gewerke, die vor Ort besonders stark vertreten sind. */
  schwerpunkt: string;
  /** Eigener Standort – die Ortsseite formuliert dann anders. */
  isHeadquarters?: boolean;
}

export const locations: Location[] = [
  {
    slug: "muenster",
    name: "Münster",
    distanceKm: 0,
    direction: "",
    blurb:
      "Unser Sitz. Über 300.000 Einwohner, ein dichtes Netz inhabergeführter Handwerksbetriebe und mit der Handwerkskammer Münster der Mittelpunkt des westfälischen Handwerks.",
    schwerpunkt: "Alle Gewerke, von SHK und Elektro über Dachdecker bis Tischlerei und Garten- und Landschaftsbau",
    isHeadquarters: true,
  },
  {
    slug: "telgte",
    name: "Telgte",
    distanceKm: 15,
    direction: "östlich",
    blurb:
      "Wallfahrtsstadt an der Ems mit gewachsenem Handwerk und vielen Betrieben, die seit Generationen in Familienhand sind.",
    schwerpunkt: "Bau, Ausbau und SHK",
  },
  {
    slug: "greven",
    name: "Greven",
    distanceKm: 20,
    direction: "nördlich",
    blurb:
      "Wachsende Stadt am Flughafen Münster/Osnabrück. Die Nähe zu Gewerbegebieten und Logistik sorgt für viele Betriebe mit Auftraggebern aus der Industrie.",
    schwerpunkt: "Elektro, Metallbau und Industrieservice",
  },
  {
    slug: "nottuln",
    name: "Nottuln",
    distanceKm: 20,
    direction: "südwestlich",
    blurb:
      "Gemeinde am Rand der Baumberge. Viel Altbau und Sanierung im Bestand prägen die Auftragslage der örtlichen Betriebe.",
    schwerpunkt: "Bau, Ausbau und Dachdecker",
  },
  {
    slug: "havixbeck",
    name: "Havixbeck",
    distanceKm: 15,
    direction: "westlich",
    blurb:
      "Kleinstadt in den Baumbergen, bekannt für den Baumberger Sandstein. Handwerk und Landwirtschaft prägen den Ort bis heute.",
    schwerpunkt: "Steinmetz, Bau und Landtechnik",
  },
  {
    slug: "senden",
    name: "Senden",
    distanceKm: 20,
    direction: "südlich",
    blurb:
      "Gemeinde an der Stever und am Dortmund-Ems-Kanal mit gewachsenem Mittelstand und vielen Familienbetrieben.",
    schwerpunkt: "SHK, Elektro und Garten- und Landschaftsbau",
  },
  {
    slug: "coesfeld",
    name: "Coesfeld",
    distanceKm: 35,
    direction: "westlich",
    blurb:
      "Kreisstadt im westlichen Münsterland mit eigener Handwerkstradition und einem breiten Mittelstand, der weit über die Stadtgrenzen hinaus arbeitet.",
    schwerpunkt: "Bau, Holz und Metall",
  },
  {
    slug: "duelmen",
    name: "Dülmen",
    distanceKm: 35,
    direction: "südwestlich",
    blurb:
      "Stadt zwischen Münster und dem Ruhrgebiet. Die Lage an der A43 bringt vielen Betrieben Aufträge aus beiden Richtungen.",
    schwerpunkt: "Bau, Elektro und Fahrzeugtechnik",
  },
  {
    slug: "emsdetten",
    name: "Emsdetten",
    distanceKm: 30,
    direction: "nördlich",
    blurb:
      "Stadt an der Ems mit traditionell starker Textil- und später Kunststoffindustrie – entsprechend viele Handwerksbetriebe mit gewerblichen Auftraggebern.",
    schwerpunkt: "Metallbau, Elektro und Industrieinstandhaltung",
  },
  {
    slug: "steinfurt",
    name: "Steinfurt",
    distanceKm: 30,
    direction: "nordwestlich",
    blurb:
      "Kreisstadt mit Hochschulstandort und zwei gewachsenen Ortsteilen. Viele kleine und mittlere Betriebe mit festem Kundenstamm in der Region.",
    schwerpunkt: "SHK, Elektro und Ausbau",
  },
  {
    slug: "warendorf",
    name: "Warendorf",
    distanceKm: 30,
    direction: "östlich",
    blurb:
      "Kreisstadt an der Ems, bekannt für Pferdezucht und einen gut erhaltenen historischen Stadtkern – was dem Handwerk viele Aufträge im Bestand und in der Denkmalpflege bringt.",
    schwerpunkt: "Restaurierung, Zimmerei und Dachdecker",
  },
  {
    slug: "luedinghausen",
    name: "Lüdinghausen",
    distanceKm: 30,
    direction: "südlich",
    blurb:
      "Stadt der drei Burgen im südlichen Münsterland. Überwiegend kleinere Betriebe, die ihr Einzugsgebiet im Kreis Coesfeld haben.",
    schwerpunkt: "Bau, SHK und Garten- und Landschaftsbau",
  },
  {
    slug: "ahlen",
    name: "Ahlen",
    distanceKm: 35,
    direction: "südöstlich",
    blurb:
      "Größte Stadt im Kreis Warendorf mit industrieller Vergangenheit im Bergbau und heute einem breiten gewerblichen Mittelstand.",
    schwerpunkt: "Metall, Elektro und Gebäudetechnik",
  },
  {
    slug: "altenberge",
    name: "Altenberge",
    distanceKm: 15,
    direction: "nordwestlich",
    blurb:
      "Gemeinde auf dem höchsten Punkt zwischen Münster und Steinfurt, geprägt von kleinen inhabergeführten Betrieben mit kurzen Wegen zu ihrer Kundschaft.",
    schwerpunkt: "Ausbau, Elektro und Haustechnik",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
