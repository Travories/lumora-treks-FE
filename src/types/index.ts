export type TravelPackage = {
  id: string;
  title: string;
  image: string;
  rating: number;
  duration: string;
  peopleCount: number;
  price: number;
};

export type RegionHighlight = {
  id: string;
  title: string;
  image: string;
};

export type SeasonalDestination = {
  id: string;
  title: string;
  image: string;
  layout: "tall" | "wide";
};
