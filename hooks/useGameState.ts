import { GameState, Turn } from '../types';
import { emptyTurn, shuffleItems } from '../utils/';
import { useCallback, useEffect, useState } from 'react';

import { products } from '../data/products';
import { usePlayerState } from './usePlayerState';

const INITIAL_GAME_STATE: GameState = {
  currentRound: 0,
  score: 0,
  hydratedGameItems: [],
  shuffledIndexes: [],
  currentItemIndex: 0,
  gameTime: 0,
  history: [],
  currentTurn: emptyTurn,
};

export const useGameState = () => {
  const { selectedPLUs } = usePlayerState();
  
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('gameState');
      return storedState ? JSON.parse(storedState) : INITIAL_GAME_STATE;
    }
    return INITIAL_GAME_STATE;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    const hydratedItems = products.filter(product => selectedPLUs.includes(product.plu));
    const shuffledItems = shuffleItems(hydratedItems);
    setGameState({
      ...INITIAL_GAME_STATE,
      currentRound: 1,
      hydratedGameItems: shuffledItems,
      shuffledIndexes: shuffleItems(Array.from(Array(shuffledItems.length).keys())),
      gameTime: Date.now(),
    });
  }, [selectedPLUs]);

  const handleAnswer = useCallback(() => {
    setGameState(prevState => {
      const newScore = prevState.score + (prevState.currentTurn?.isCorrect ? 1 : 0);
      const newItemIndex = prevState.currentItemIndex + 1;
      
      const newState = {
        ...prevState,
        score: newScore,
        currentItemIndex: newItemIndex,
        history: [...prevState.history, prevState.currentTurn],
        currentTurn: emptyTurn,
      };
  
      if (newItemIndex >= prevState.hydratedGameItems.length) {
        const newRound = prevState.currentRound < 3 ? prevState.currentRound + 1 : 4;
        return {
          ...newState,
          hydratedGameItems: shuffleItems(prevState.hydratedGameItems),
          shuffledIndexes: shuffleItems(Array.from(Array(prevState.hydratedGameItems.length).keys())),
          currentRound: newRound,
          currentItemIndex: 0,
        };
      } else {
        return newState;
      }
    });
  }, []);

  const calculateFinalScore = useCallback((round3Turns: Turn[]) => {
    setGameState(prevState => ({
      ...prevState,
      score: prevState.score + round3Turns.reduce((score, turn) => score + (turn.isCorrect ? 1 : 0), 0),
      currentRound: 4,
      gameTime: Date.now() - prevState.gameTime,
      history: [...prevState.history, ...round3Turns],
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
  }, []);

  return {
    gameState,
    startGame,
    handleAnswer,
    calculateFinalScore,
    resetGame,
  };
};