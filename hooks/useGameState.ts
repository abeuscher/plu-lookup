import { GameState, Product, Turn } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageHelpers';
import { useCallback, useEffect, useState } from 'react';

import { calculateScore } from '../utils/gameHelpers';
import { products } from '../data/products';
import { usePlayerState } from './usePlayerState';

export const useGameState = () => {
  const { selectedPLUs } = usePlayerState();
  
  const [gameState, setGameState] = useState<GameState>(() => ({
    currentRound: getLocalStorage<number>('currentRound', 0) || 0,
    score: getLocalStorage<number>('score', 0) || 0,
    hydratedGameItems: getLocalStorage<Product[]>('hydratedGameItems', []) || [],
    currentItemIndex: getLocalStorage<number>('currentItemIndex', 0) || 0,
    gameTime: getLocalStorage<number>('gameTime', 0) || 0,
    history: [],
    currentTurn: null,
  }));

  useEffect(() => {
    setLocalStorage('currentRound', gameState.currentRound);
    setLocalStorage('score', gameState.score);
    setLocalStorage('hydratedGameItems', gameState.hydratedGameItems);
    setLocalStorage('currentItemIndex', gameState.currentItemIndex);
    setLocalStorage('gameTime', gameState.gameTime);
  }, [gameState]);

  const hydrateGameItems = useCallback(() => {
    const hydratedItems = products.filter(product => selectedPLUs.includes(product.plu));
    setGameState(prevState => ({
      ...prevState,
      hydratedGameItems: hydratedItems
    }));
  }, [selectedPLUs]);

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      currentRound: 1,
      score: 0,
      currentItemIndex: 0,
      gameTime: Date.now(),
      history: [],
      currentTurn: null,
    }));
    hydrateGameItems();
  }, [hydrateGameItems]);

  const handleAnswer = useCallback((turn: Turn) => {
    setGameState(prevState => {
      const newScore = prevState.score + (turn.isCorrect ? 1 : 0);
      const newItemIndex = prevState.currentItemIndex + 1;
      
      const newState = {
        ...prevState,
        score: newScore,
        currentItemIndex: newItemIndex,
        history: [...prevState.history, turn],
        currentTurn: null,
      };

      if (newItemIndex >= prevState.hydratedGameItems.length) {
        return {
          ...newState,
          currentRound: prevState.currentRound < 3 ? prevState.currentRound + 1 : 4,
          currentItemIndex: 0,
        };
      } else {
        return newState;
      }
    });
  }, []);

  const calculateFinalScore = useCallback((turns: Turn[]) => {
  
    const finalScore = turns.reduce((score, turn) => {
      return score + (turn.isCorrect ? 1 : 0);
    }, 0);
  
    setGameState(prevState => ({
      ...prevState,
      score: finalScore,
      currentRound: 4,
      gameTime: Date.now() - prevState.gameTime, // Calculate total game time
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      currentRound: 0,
      score: 0,
      hydratedGameItems: [],
      currentItemIndex: 0,
      gameTime: 0,
      history: [],
      currentTurn: null,
    });
  }, []);

  return {
    gameState,
    startGame,
    handleAnswer,
    calculateFinalScore,
    resetGame,
  };
};