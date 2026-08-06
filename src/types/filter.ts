export type SortOption = 'cheapest' | 'fastest' | 'relevance' | 'departure-early' | 'arrival-early';

export interface FilterState {
  maxPrice: number;
  minPrice: number;
  selectedPrice: number;
  stops: number[]; // e.g. [0, 1] for non-stop and 1-stop
  airlines: string[]; // airline IDs
  departureTimeWindow: string[]; // e.g. ['morning', 'afternoon', 'evening', 'night']
  arrivalTimeWindow: string[];
  sortBy: SortOption;
  yovoAiTags: string[]; // e.g. ['Yovo pick', 'Cheap but sensible', 'Non-stop']
}
