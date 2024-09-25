// /components/__tests__/FlashcardGame.test.js

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import FlashcardGame from '../FlashcardGame';
import React from 'react';
import { defaultGroups } from '../../data/products';

// Import defaultGroups

describe('FlashcardGame Component', () => {
  test('toggles between showing all items and checked items only', () => {
    render(<FlashcardGame />);

    // Select a PLU (assuming 3064 is a valid PLU)
    const pluCheckbox = screen.getByLabelText(/3064 - /i);
    fireEvent.click(pluCheckbox);

    // Toggle the "Show Checked Only" switch
    const toggleSwitch = screen.getByLabelText(/Show Checked Only/i);
    fireEvent.click(toggleSwitch);

    // Expect only checked items to be visible
    expect(screen.queryByLabelText(/3064 - /i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Other PLU/i)).not.toBeInTheDocument();
  });

  test('resets all selections when reset button is clicked', () => {
    render(<FlashcardGame />);

    // Select a PLU (assuming 3064 is a valid PLU)
    const pluCheckbox = screen.getByLabelText(/3064 - /i);
    fireEvent.click(pluCheckbox);

    // Click the reset button
    const resetButton = screen.getByRole('button', {
      name: /Reset Selections/i,
    });
    fireEvent.click(resetButton);

    // Ensure the selection is cleared
    expect(pluCheckbox).not.toBeChecked();
  });

  test('renders the Flashcard Game title', () => {
    render(<FlashcardGame />);
    const titleElement = screen.getByText(/Flashcard Game/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('disables Start Game button when no PLUs are selected or player name is empty', () => {
    render(<FlashcardGame />);
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    expect(startButton).toBeDisabled();
  });

  test('enables Start Game button when PLUs are selected and player name is entered', () => {
    render(<FlashcardGame />);

    // Enter player name
    const playerNameInput = screen.getByLabelText(/Player Name/i);
    fireEvent.change(playerNameInput, { target: { value: 'Alice' } });

    // Select a PLU (assuming 3064 is a valid PLU in your data)
    const pluCheckbox = screen.getByLabelText(/3064 - /i);
    fireEvent.click(pluCheckbox);

    // Check if the Start Game button is enabled
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    expect(startButton).toBeEnabled();
  });
  test('advances rounds correctly', () => {
    render(<FlashcardGame />);

    // Enter player name
    const playerNameInput = screen.getByLabelText(/Player Name/i);
    fireEvent.change(playerNameInput, { target: { value: 'Test Player' } });

    // Select a PLU (assuming 3064 is a valid PLU in the data set)
    const pluCheckbox = screen.getByLabelText(/3064 - /i);
    fireEvent.click(pluCheckbox);

    // Start the game
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    fireEvent.click(startButton);

    // Verify that the game has started (Round 1 should be displayed)
    expect(screen.getByText(/Round 1/i)).toBeInTheDocument();

    // Select the correct PLU to advance
    const correctPLUButton = screen.getByText(/3064/i);
    fireEvent.click(correctPLUButton);

    // Check if the round has advanced
    expect(screen.getByText(/Round 2/i)).toBeInTheDocument();
  });
  test('loads default PLUs and enables Start Game button', () => {
    render(<FlashcardGame />);

    // Enter player name
    const playerNameInput = screen.getByLabelText(/Player Name/i);
    fireEvent.change(playerNameInput, { target: { value: 'Test Player' } });

    // Open the dropdown by clicking the Select component
    const groupSelect = screen.getByLabelText(/Select Default Group/i);
    fireEvent.mouseDown(groupSelect);

    // Find the listbox (the dropdown options) and click on the first item (defaultGroups[0])
    const listbox = screen.getByRole('listbox');
    const firstOption = screen.getByText(defaultGroups[0].groupName); // Ensure this matches your data
    fireEvent.click(firstOption);

    // Ensure that the Start Game button is enabled after loading defaults
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    expect(startButton).toBeEnabled();
  });
});
