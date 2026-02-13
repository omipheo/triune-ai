// P6 Math Mastery Nodes – ordered list for the Mission Map
export const MASTERY_NODES = [
  { id: "ratio", title: "Ratio", slug: "ratio" },
  { id: "percentage", title: "Percentage", slug: "percentage" },
  { id: "percentage-remainder", title: "Percentage of Remainder", slug: "percentage-remainder" },
  { id: "speed", title: "Speed, Distance & Time", slug: "speed" },
  { id: "algebra", title: "Algebra", slug: "algebra" },
  { id: "geometry", title: "Geometry", slug: "geometry" },
  { id: "area-perimeter", title: "Area & Perimeter", slug: "area-perimeter" },
  { id: "volume", title: "Volume", slug: "volume" },
  { id: "fractions", title: "Fractions", slug: "fractions" },
  { id: "decimals", title: "Decimals", slug: "decimals" },
] as const;

export type NodeId = (typeof MASTERY_NODES)[number]["id"];
