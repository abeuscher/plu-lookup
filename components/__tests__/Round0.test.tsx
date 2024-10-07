import { fireEvent, render, screen } from '@testing-library/react';

import Round0 from '../FlashcardGame/GameRounds/Round0';

describe('Round0 Component', () => {
  const mockProps = {
    playerName: 'Bruce',
    selectedPLUs: ['4011', '94011'], // Sample PLUs
    onStartGame: jest.fn(),
  };

  it('should render player name and selected PLUs count correctly', () => {
    render(<Round0 {...mockProps} />);

    // Check if the player's name is displayed
    expect(screen.getByText(/ready to start, bruce\?/i)).toBeInTheDocument();

    // Check if the number of selected PLUs is displayed
    expect(screen.getByText(/you've selected 2 PLUS/i)).toBeInTheDocument();
  });

  it('should call onStartGame when the button is clicked', () => {
    render(<Round0 {...mockProps} />);

    // Simulate clicking the "Start Game" button
    fireEvent.click(screen.getByText(/start game/i));

    // Check if the onStartGame function was called
    expect(mockProps.onStartGame).toHaveBeenCalled();
  });
});
