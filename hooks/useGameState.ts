import { GameState, Product, Turn } from '../types';
import { emptyTurn, getLocalStorage, setLocalStorage, shuffleItems } from '../utils/';
import { useCallback, useEffect, useState } from 'react';

import { products } from '../data/products';
import { usePlayerState } from './usePlayerState';

export const useGameState = () => {
  const { selectedPLUs } = usePlayerState();
  
  const [gameState, setGameState] = useState<GameState>(() => ({
    currentRound: getLocalStorage<number>('currentRound', 0) || 0,
    score: getLocalStorage<number>('score', 0) || 0,
    hydratedGameItems: getLocalStorage<Product[]>('hydratedGameItems', []) || [],
    shuffledIndexes: getLocalStorage<number[]>('shuffledIndexes', []) || [],
    currentItemIndex: getLocalStorage<number>('currentItemIndex', 0) || 0,
    gameTime: getLocalStorage<number>('gameTime', 0) || 0,
    history: getLocalStorage<Turn[]>('hydratedGameItems', []) || [],
    currentTurn: getLocalStorage<Turn>('currentTurn', emptyTurn) || emptyTurn
  }));

  useEffect(() => {
    setLocalStorage('currentRound', gameState.currentRound);
    setLocalStorage('score', gameState.score);
    setLocalStorage('hydratedGameItems', gameState.hydratedGameItems);
    setLocalStorage('shuffledIndexes', gameState.shuffledIndexes);
    setLocalStorage('currentItemIndex', gameState.currentItemIndex);
    setLocalStorage('gameTime', gameState.gameTime);
    setLocalStorage('history', gameState.history);
    setLocalStorage('currentTurn', gameState.currentTurn);
  }, [gameState]);

  const hydrateGameItems = useCallback(() => {
    const hydratedItems = products.filter(product => selectedPLUs.includes(product.plu));
    setGameState(prevState => ({
      ...prevState,
      hydratedGameItems: shuffleItems(hydratedItems)
    }));
  }, [selectedPLUs]);

  const shuffledIndexes = useCallback(() => {
    const shuffledIndexes = shuffleItems(Array.from(Array(gameState.hydratedGameItems.length).keys()));
    setGameState(prevState => ({
      ...prevState,
      shuffledIndexes: shuffledIndexes
    }));
  }, [selectedPLUs]);

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      currentRound: 1,
      score: 0,
      shuffledIndexes: shuffleItems(Array.from(Array(prevState.hydratedGameItems.length).keys())),
      currentItemIndex: 0,
      gameTime: Date.now(),
      history: [],
      currentTurn: emptyTurn,
    }));
    hydrateGameItems();
    shuffledIndexes();
  }, [hydrateGameItems]);

  const handleAnswer = useCallback(() => {
    setGameState(prevState => {
      const newScore = prevState.score + (prevState.currentTurn.isCorrect ? 1 : 0);
      const newItemIndex = prevState.currentItemIndex + 1;
      
      const newState = {
        ...prevState,
        score: newScore,
        currentItemIndex: newItemIndex,
        history: [...prevState.history, prevState.currentTurn],
        currentTurn: {
          round: prevState.currentRound,
          playerGuess: null,
          correctAnswer: null,
          isCorrect: null,
        },
      };
  
      if (newItemIndex >= prevState.hydratedGameItems.length) {
        const newRound = prevState.currentRound < 3 ? prevState.currentRound + 1 : 4;
        return {
          ...newState,
          hydratedGameItems: shuffleItems(prevState.hydratedGameItems),
          shuffledIndexes: shuffleItems(Array.from(Array(prevState.hydratedGameItems.length).keys())),
          currentRound: newRound,
          currentItemIndex: 0,
          currentTurn: {
            round: newRound,
            playerGuess: null,
            correctAnswer: null,
            isCorrect: null,
          },
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
      shuffledIndexes: [],
      currentItemIndex: 0,
      gameTime: 0,
      history: [],
      currentTurn: emptyTurn,
    });
  }, []);

  return {
    gameState,
    startGame,
    handleAnswer,
    calculateFinalScore,
    resetGame,
    shuffleItems
  };
};