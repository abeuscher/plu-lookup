import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import Round1 from '../FlashcardGame/GameRounds/Round1';
import { toTitleCase } from '@/utils';

// Mock the products data
jest.mock('../../data/products', () => ({
  products: [
    { id: 1, plu: '3000', fullname: 'ALKMENE APPLES' },
    { id: 2, plu: '3001', fullname: 'BRAEBURN APPLES' },
    { id: 3, plu: '3002', fullname: 'CAMEO APPLES' },
    { id: 4, plu: '3003', fullname: 'CORTLAND APPLES' },
  ],
}));

const mockGameItems = require('../../data/products').products;
const shuffledIndexes = Array.from(Array(mockGameItems.length).keys());
describe('Round1 Component', () => {
  const mockOnAnswer = jest.fn();

  it('should render correctly', () => {
    render(
      <Round1
        onAnswer={mockOnAnswer}
        shuffledIndexes={shuffledIndexes}
        gameItems={mockGameItems}
        currentItemIndex={0}
      />
    );

    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Item 1 of 4')).toBeInTheDocument();
    expect(
      screen.getByText(toTitleCase(mockGameItems[0].fullname))
    ).toBeInTheDocument();

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
        shuffledIndexes={shuffledIndexes}
        gameItems={mockGameItems}
        currentItemIndex={0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: mockGameItems[0].plu }));
    setTimeout(() => {
      expect(mockOnAnswer).toHaveBeenCalledWith({
        playerGuess: mockGameItems[0].plu,
        correctAnswer: mockGameItems[0].plu,
      });
    }, 500);
  });

  it('should render "No items available" when all items are answered', () => {
    render(
      <Round1
        onAnswer={mockOnAnswer}
        shuffledIndexes={shuffledIndexes}
        gameItems={mockGameItems}
        currentItemIndex={mockGameItems.length}
      />
    );

    expect(
      screen.getByText('No items available for Round 1')
    ).toBeInTheDocument();
  });
});
