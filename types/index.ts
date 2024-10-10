export interface Product {
  plu: string;
  fullname: string;
  spoken_variety: string;
  commodity: string;
  variety: string;
  category: string;
}
export type Turn = {
  round: number;
  playerGuess?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
};

export interface GameState {
  currentRound: number;
  score: number;
  currentItemIndex: number;
  shuffledIndexes: number[];
  hydratedGameItems: Product[];
  gameTime: number;
  history: Turn[];
  currentTurn: Turn | null;
}

export interface PlayerState {
  playerName: string;
  selectedPLUs: string[];
}
export interface Guess {
  playerGuess: string;
  correctAnswer: string;
}
export interface RoundProps {
  onAnswer: (guess: Guess) => void;
  gameItems: Product[];
  currentItemIndex: number;
  shuffledIndexes: number[];
}