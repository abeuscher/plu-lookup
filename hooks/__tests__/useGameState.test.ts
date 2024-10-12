import { act, renderHook } from '@testing-library/react';

import { Turn } from '../../types';
import { emptyTurn } from '@/utils';
import { useGameState } from '../useGameState';
import { usePlayerState } from '../usePlayerState';

jest.mock('../usePlayerState');
jest.mock('../../data/products', () => ({
  products: [
    {"id":19,"plu":"3018","type":"Global","category":"Fruits","variety":"Durondeau","commodity":"PEARS","size":"All Sizes","botanical":"Pyrus spp.","growtype":"any","spoken_variety":"Durondeau","fullname":"Durondeau PEARS"},
    {"id":20,"plu":"3019","type":"Global","category":"Fruits","variety":"Flamingo","commodity":"PEARS","size":"All Sizes","botanical":"Pyrus spp.","growtype":"any","spoken_variety":"Flamingo","fullname":"Flamingo PEARS"},
  ],
}));

describe('useGameState Hook', () => {
  beforeEach(() => {
    (usePlayerState as jest.Mock).mockReturnValue({
      selectedPLUs: ['3018', '3019'],
    });
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toEqual({
      currentRound: 0,
      score: 0,
      hydratedGameItems: [],
      shuffledIndexes: [],
      currentItemIndex: 0,
      gameTime: 0,
      history: [],
      currentTurn: emptyTurn,
    });
  });

  it('should start the game correctly', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startGame();
    });
    expect(result.current.gameState.currentRound).toBe(1);
    expect(result.current.gameState.hydratedGameItems).toHaveLength(2);
  });

  it('should handle answers and progress through items', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame();
    });

    expect(result.current.gameState.currentRound).toBe(1);
    expect(result.current.gameState.currentItemIndex).toBe(0);

    act(() => {
      result.current.gameState.currentTurn = {
        round: 1,
        playerGuess: 'Pears',
        correctAnswer: 'Pears',
        isCorrect: true,
      }
      result.current.handleAnswer();
    });

    expect(result.current.gameState.score).toBe(1);
    expect(result.current.gameState.currentItemIndex).toBe(1);

    act(() => {
      result.current.gameState.currentTurn = {
        round: 1,
        playerGuess: 'Pears',
        correctAnswer: 'Pears',
        isCorrect: true,
      }
      result.current.handleAnswer();
    });

    expect(result.current.gameState.score).toBe(2);
    expect(result.current.gameState.currentRound).toBe(2);
    expect(result.current.gameState.currentItemIndex).toBe(0);
  });

  it('should calculate final score correctly', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame();
    });

    // Simulate scoring in Round 1 and 2
    act(() => {
      result.current.gameState.currentTurn = {
        round: 1,
        playerGuess: '3018',
        correctAnswer: '3018',
        isCorrect: true,
      };
      result.current.handleAnswer();
    });

    act(() => {
      result.current.gameState.currentTurn = {
        round: 2,
        playerGuess: '3019',
        correctAnswer: '3019',
        isCorrect: true,
      };
      result.current.handleAnswer();
    });

    const round3Turns: Turn[] = [
      { round: 3, playerGuess: '3018', correctAnswer: '3018', isCorrect: true },
      { round: 3, playerGuess: '3019', correctAnswer: '3019', isCorrect: true },
    ];

    act(() => {
      result.current.calculateFinalScore(round3Turns);
    });

    expect(result.current.gameState.score).toBe(4); // 2 from previous rounds + 2 from Round 3
    expect(result.current.gameState.currentRound).toBe(4);
    expect(result.current.gameState.history.length).toBe(4); // 2 from previous rounds + 2 from Round 3
  });

  it('should reset the game state', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.gameState.currentTurn = {
        round: 1,
        playerGuess: 'Pears',
        correctAnswer: 'Pears',
        isCorrect: true,
      }
      result.current.handleAnswer();
    });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameState).toEqual({
      currentRound: 0,
      score: 0,
      hydratedGameItems: [],
      shuffledIndexes: [],
      currentItemIndex: 0,
      gameTime: 0,
      history: [],
      currentTurn: emptyTurn,
    });
  });
});