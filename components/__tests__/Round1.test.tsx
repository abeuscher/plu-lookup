import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import Round1 from '../FlashcardGame/GameRounds/Round1';
import { products } from '../../data/products';

const mockGameItems = products.slice(0, 4);

describe('Round1 Component', () => {
  const mockOnAnswer = jest.fn();

  it('should render correctly', () => {
    render(
      <Round1
        onAnswer={mockOnAnswer}
        gameItems={mockGameItems}
        currentItemIndex={0}
      />
    );

    expect(screen.getByText(/Round 1 - Item 1 of 4/)).toBeInTheDocument();
    expect(screen.getByText(/Alkmene Apples/)).toBeInTheDocument();

    mockGameItems.forEach((item) => {
      expect(
        screen.getByRole('button', { name: item.plu })
      ).toBeInTheDocument();
    });
  });

  it('should handle PLU selection', () => {
    render(
      <Round1
        onAnswer={mockOnAnswer}
        gameItems={mockGameItems}
        currentItemIndex={0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: mockGameItems[0].plu }));

    expect(mockOnAnswer).toHaveBeenCalledWith(true);
  });

  it('should render "No items available" when all items are answered', () => {
    render(
      <Round1
        onAnswer={mockOnAnswer}
        gameItems={mockGameItems}
        currentItemIndex={mockGameItems.length}
      />
    );

    expect(
      screen.getByText('No items available for Round 1')
    ).toBeInTheDocument();
  });
});
