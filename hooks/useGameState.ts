import { calculateScore, shuffleArray } from '../utils/gameHelpers';
import { useCallback, useState } from 'react';

import { Product } from '../types';
import { products } from '../data/products';

export const useGameState = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameItems, setGameItems] = useState<Product[]>([]);
  const [Round1Data, setRound1Data] = useState<number[]>([]);
  const [Round2Data, setRound2Data] = useState<number[]>([]);
  const [Round3Data, setRound3Data] = useState<number[]>([]);


  const startGame = useCallback((selectedPLUs: string[]) => {
    const selectedProducts = products.filter(product => selectedPLUs.includes(product.plu));
    setGameItems(shuffleArray(selectedProducts));
    setCurrentRound(1);
    setScore(0);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setScore(prevScore => prevScore + (isCorrect ? 1 : 0));
    setGameItems(prevItems => prevItems.slice(1));
    if (gameItems.length === 1) {
      setCurrentRound(prevRound => prevRound + 1);
    }
  }, [gameItems]);

  const handleRound1Data = useCallback((data: number[]) => {
    setRound1Data(data);
  }, []);

  const handleRound2Data = useCallback((data: number[]) => {
    setRound2Data(data);
  }, []);

  const handleRound3Data = useCallback((data: number[]) => {
    setRound3Data(data);
  }, []);

  const advanceRound = useCallback(() => {
    setCurrentRound(prevRound => prevRound + 1);
  }, []);

  const calculateFinalScore = useCallback((userAnswers: Record<string, string>) => {
    const correctAnswers = gameItems.reduce((acc, item) => ({
      ...acc,
      [item.plu]: item.fullname
    }), {} as Record<string, string>);
    const finalScore = calculateScore(userAnswers, correctAnswers);
    setScore(finalScore);
    setCurrentRound(4);
  }, [gameItems]);

  const resetGame = useCallback(() => {
    setCurrentRound(0);
    setScore(0);
    setGameItems([]);
  }, []);

  return {
    gameState: { currentRound, score, gameItems },
    startGame,
    handleAnswer,
    handleRound1Data,
    handleRound2Data,
    handleRound3Data,
    advanceRound,
    calculateFinalScore,
    resetGame
  };
};