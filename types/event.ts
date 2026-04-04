export type EventCategory = "A" | "B";
export type EventId = string;

export interface EventCoordinates {
  lat: number;
  lng: number;
}

export interface RaceEvent {
  id: EventId;
  title: string;
  description: string;
  address: string;
  country: string;
  coordinates: EventCoordinates;
  category: EventCategory;
}
