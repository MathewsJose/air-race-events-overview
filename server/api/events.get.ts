import type { RaceEvent } from "../../types/event";

const events: RaceEvent[] = [
  {
    id: "abu-dhabi-desert-sprint",
    title: "Abu Dhabi Desert Sprint",
    description:
      "A fast opening weekend above the waterfront with technical turns and strong crosswinds.",
    address: "Yas Marina Circuit, Yas Island, Abu Dhabi",
    country: "United Arab Emirates",
    coordinates: { lat: 24.4672, lng: 54.6031 },
    category: "A",
  },
  {
    id: "porto-river-chicane",
    title: "Porto River Chicane",
    description:
      "A fan-favorite city race set along the Douro with close spectator access and compact flight lines.",
    address: "Cais da Ribeira, Porto",
    country: "Portugal",
    coordinates: { lat: 41.1405, lng: -8.611 },
    category: "B",
  },
  {
    id: "budapest-danube-classic",
    title: "Budapest Danube Classic",
    description:
      "Historic city backdrop with a balanced course designed for precision and mid-speed control.",
    address: "Danube Embankment, Budapest",
    country: "Hungary",
    coordinates: { lat: 47.4979, lng: 19.0402 },
    category: "A",
  },
  {
    id: "vancouver-harbor-run",
    title: "Vancouver Harbor Run",
    description:
      "A coastal stop with cooler temperatures, changing visibility, and a wide harbor approach.",
    address: "Coal Harbour Seawall, Vancouver, BC",
    country: "Canada",
    coordinates: { lat: 49.2931, lng: -123.1242 },
    category: "B",
  },
  {
    id: "sydney-bay-finals",
    title: "Sydney Bay Finals",
    description:
      "A closing race weekend over the bay with long sightlines and a dramatic waterfront setting.",
    address: "Mrs Macquaries Point, Sydney NSW",
    country: "Australia",
    coordinates: { lat: -33.8568, lng: 151.2243 },
    category: "A",
  },
  {
    id: "istanbul-strait-challenge",
    title: "Istanbul Strait Challenge",
    description:
      "A narrow and tactical course that rewards discipline through variable wind channels.",
    address: "Ortakoy Square, Istanbul",
    country: "Turkey",
    coordinates: { lat: 41.0471, lng: 29.0269 },
    category: "B",
  },
];

export default defineEventHandler(() => events);
