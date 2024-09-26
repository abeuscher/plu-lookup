export interface Product {
  plu: string;
  fullname: string;
  spoken_variety: string;
  commodity: string;
  variety: string;
  category: string;
}

export interface GameState {
  currentRound: number;
  score: number;
  gameItems: Product[];
  finalScore: number;
}

export interface PlayerState {
  playerName: string;
  selectedPLUs: string[];
}