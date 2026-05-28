// Shared geography for the demo so the map, the radius, and the zone cards
// all stay in sync. Centered on Nairobi.

export const DEMO_CENTER: [number, number] = [-1.2921, 36.8219]; // Nairobi
export const DEMO_RADIUS_KM = 2;

export type DemoZone = {
  id: string;
  label: string;
  volunteers: number;
  color: string; // hex, used for both the map polygon and the card dot
  polygon: [number, number][];
};

const [clat, clng] = DEMO_CENTER;
const d = 0.011; // ~1.2 km at this latitude

// Four non-overlapping quadrant zones tiling the area around the last-seen point.
export const DEMO_ZONES: DemoZone[] = [
  {
    id: "A",
    label: "Ngong Road — north",
    volunteers: 3,
    color: "#12b76a",
    polygon: [
      [clat, clng],
      [clat + d, clng],
      [clat + d, clng + d],
      [clat, clng + d],
    ],
  },
  {
    id: "B",
    label: "Market & matatu stage",
    volunteers: 2,
    color: "#2e90fa",
    polygon: [
      [clat, clng],
      [clat, clng - d],
      [clat + d, clng - d],
      [clat + d, clng],
    ],
  },
  {
    id: "C",
    label: "Riverside path",
    volunteers: 5,
    color: "#f79009",
    polygon: [
      [clat, clng],
      [clat - d, clng],
      [clat - d, clng - d],
      [clat, clng - d],
    ],
  },
  {
    id: "D",
    label: "School & playground",
    volunteers: 1,
    color: "#9b8afb",
    polygon: [
      [clat, clng],
      [clat, clng + d],
      [clat - d, clng + d],
      [clat - d, clng],
    ],
  },
];
