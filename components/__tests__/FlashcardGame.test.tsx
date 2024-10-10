import { fireEvent, render, screen } from '@testing-library/react';

import FlashcardGame from '../FlashcardGame/index';
import React from 'react';
import { products } from '../../data/products';
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';

jest.mock('../../hooks/usePlayerState');
jest.mock('../../hooks/useGameState');

describe('FlashcardGame Component', () => {
  const mockUseGameState = useGameState as jest.Mock;
  const mockUsePlayerState = usePlayerState as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 0,
        score: 0,
        hydratedGameItems: [],
        shuffledIndexes: [],
        currentItemIndex: 0,
      },
      startGame: jest.fn(),
      handleAnswer: jest.fn(),
      calculateFinalScore: jest.fn(),
      resetGame: jest.fn(),
    });

    mockUsePlayerState.mockReturnValue({
      playerName: '',
      setPlayerName: jest.fn(),
      selectedPLUs: [],
      setSelectedPLUs: jest.fn(),
    });
  });

  it('renders correctly when not ready', () => {
    render(<FlashcardGame />);
    expect(
      screen.getByText(/Please select your name and at least one PLU/)
    ).toBeInTheDocument();
  });

  it('renders PLU Quiz when game is ready to start', () => {
    mockUsePlayerState.mockReturnValue({
      playerName: 'TestPlayer',
      setPlayerName: jest.fn(),
      selectedPLUs: ['4011', '3008'],
      setSelectedPLUs: jest.fn(),
    });

    render(<FlashcardGame />);
    expect(screen.getByText('PLU Quiz')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('progresses through rounds correctly', () => {
    mockUsePlayerState.mockReturnValue({
      playerName: 'TestPlayer',
      setPlayerName: jest.fn(),
      selectedPLUs: ['4011', '4012'],
      setSelectedPLUs: jest.fn(),
    });

    const mockStartGame = jest.fn();
    const mockHandleAnswer = jest.fn();
    const mockCalculateFinalScore = jest.fn();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 0,
        score: 0,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: mockStartGame,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: jest.fn(),
    });

    const { rerender } = render(<FlashcardGame />);

    fireEvent.click(screen.getByText('Start Game'));
    expect(mockStartGame).toHaveBeenCalled();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 1,
        score: 0,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: mockStartGame,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: jest.fn(),
    });
    rerender(<FlashcardGame />);
    expect(screen.getByText('Flashcard Game - Round 1')).toBeInTheDocument();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 2,
        score: 1,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: mockStartGame,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: jest.fn(),
    });
    rerender(<FlashcardGame />);
    expect(screen.getByText('Flashcard Game - Round 2')).toBeInTheDocument();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 3,
        score: 2,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: mockStartGame,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: jest.fn(),
    });
    rerender(<FlashcardGame />);
    expect(screen.getByText('Flashcard Game - Round 3')).toBeInTheDocument();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 4,
        score: 3,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: mockStartGame,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: jest.fn(),
    });
    rerender(<FlashcardGame />);
    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });

  it('handles game reset correctly', () => {
    mockUsePlayerState.mockReturnValue({
      playerName: 'TestPlayer',
      setPlayerName: jest.fn(),
      selectedPLUs: ['4011', '4012'],
      setSelectedPLUs: jest.fn(),
    });

    const mockResetGame = jest.fn();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 4,
        score: 100,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: jest.fn(),
      handleAnswer: jest.fn(),
      calculateFinalScore: jest.fn(),
      resetGame: mockResetGame,
    });

    render(<FlashcardGame />);
    fireEvent.click(screen.getByText('Play Again'));
    expect(mockResetGame).toHaveBeenCalled();
  });

  it('updates AppBar title correctly', () => {
    mockUsePlayerState.mockReturnValue({
      playerName: 'TestPlayer',
      setPlayerName: jest.fn(),
      selectedPLUs: ['4011', '4012'],
      setSelectedPLUs: jest.fn(),
    });

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 0,
        score: 0,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: jest.fn(),
      handleAnswer: jest.fn(),
      calculateFinalScore: jest.fn(),
      resetGame: jest.fn(),
    });

    const { rerender } = render(<FlashcardGame />);
    expect(screen.getByText('PLU Quiz')).toBeInTheDocument();

    mockUseGameState.mockReturnValue({
      gameState: {
        currentRound: 1,
        score: 0,
        hydratedGameItems: products.filter((p) =>
          ['4011', '4012'].includes(p.plu)
        ),
        shuffledIndexes: [0, 1],
        currentItemIndex: 0,
      },
      startGame: jest.fn(),
      handleAnswer: jest.fn(),
      calculateFinalScore: jest.fn(),
      resetGame: jest.fn(),
    });

    rerender(<FlashcardGame />);
    expect(screen.getByText('Flashcard Game - Round 1')).toBeInTheDocument();
  });
});
