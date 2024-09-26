import { fireEvent, render, screen } from '@testing-library/react';

import FlashcardGame from '../../components/FlashcardGame'; // Adjust based on your folder structure
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';

// Mock the necessary hooks
jest.mock('../../hooks/useGameState');
jest.mock('../../hooks/usePlayerState');

describe('FlashcardGame Round Advancement', () => {
  const mockStartGame = jest.fn();
  const mockAdvanceRound = jest.fn();
  const mockHandleAnswer = jest.fn();
  const mockCalculateFinalScore = jest.fn();
  const mockResetGame = jest.fn();

  beforeEach(() => {
    // Mock the game state and player state
    useGameState.mockReturnValue({
      gameState: {
        currentRound: 0,
        gameItems: [],
        finalScore: null,
      },
      startGame: mockStartGame,
      advanceRound: mockAdvanceRound,
      handleAnswer: mockHandleAnswer,
      calculateFinalScore: mockCalculateFinalScore,
      resetGame: mockResetGame,
    });

    usePlayerState.mockReturnValue({
      playerName: 'Test Player',
      selectedPLUs: ['PLU1', 'PLU2'],
    });
  });

  it('starts the game and advances from Round 1 to Round 2', () => {
    render(<FlashcardGame />);

    // Simulate starting the game
    fireEvent.click(screen.getByText('Start Game'));

    // Simulate advancing to Round 1
    useGameState.mockReturnValueOnce({
      gameState: {
        currentRound: 1,
        gameItems: [{ plu: 'test1', fullname: 'Test Item 1' }],
      },
      advanceRound: mockAdvanceRound,
    });

    // Trigger an answer selection in Round 1
    fireEvent.click(screen.getByText('Test Item 1'));

    // Assert that the round advanced to Round 2
    expect(mockAdvanceRound).toHaveBeenCalled();
    useGameState.mockReturnValueOnce({
      gameState: {
        currentRound: 2,
        gameItems: [{ plu: 'test2', fullname: 'Test Item 2' }],
      },
    });

    // Check if Round 2 content is displayed
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('advances through all rounds and ends the game', () => {
    render(<FlashcardGame />);

    // Simulate advancing to Round 3
    useGameState.mockReturnValueOnce({
      gameState: {
        currentRound: 3,
        gameItems: [{ plu: 'test3', fullname: 'Test Item 3' }],
      },
      advanceRound: mockAdvanceRound,
      calculateFinalScore: mockCalculateFinalScore,
    });

    fireEvent.click(screen.getByText('Submit Answers'));

    // Assert that the final score is calculated
    expect(mockCalculateFinalScore).toHaveBeenCalled();
  });
});
