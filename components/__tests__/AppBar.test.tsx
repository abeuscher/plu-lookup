import { render, screen } from '@testing-library/react';

import { AppBar } from '../shared/AppBar';
import { usePlayerState } from '../../hooks/usePlayerState';

// Mock the usePlayerState hook
jest.mock('../../hooks/usePlayerState');

describe('AppBar Component', () => {
  const mockGameState = {
    currentRound: 1,
    score: 10,
  };

  beforeEach(() => {
    // Mock the playerName returned from usePlayerState
    (usePlayerState as jest.Mock).mockReturnValue({
      playerName: 'Bruce',
    });
  });

  it('should render the title, player name, and game details when gameState is provided', () => {
    render(<AppBar title="Flashcard Game" gameState={mockGameState} />);

    // Check if the title is displayed
    expect(screen.getByText(/flashcard game/i)).toBeInTheDocument();

    // Check if the player's name is displayed
    expect(screen.getByText(/player: bruce/i)).toBeInTheDocument();

    // Check if the game details are displayed
    expect(screen.getByText(/score: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/round 1/i)).toBeInTheDocument();
  });

  it('should render the title and player name but no game details when gameState is not provided', () => {
    render(<AppBar title="Flashcard Game" gameState={null} />);

    // Check if the title is displayed
    expect(screen.getByText(/flashcard game/i)).toBeInTheDocument();

    // Check if the player's name is displayed
    expect(screen.getByText(/player: bruce/i)).toBeInTheDocument();

    // Check that game details (score and round) are not rendered
    expect(screen.queryByText(/score:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/round/i)).not.toBeInTheDocument();
  });
});
