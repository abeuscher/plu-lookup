import { Product, Turn } from '../../types';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import Round3 from '../FlashcardGame/GameRounds/Round3';

describe('Round3 Component', () => {
  const mockGameItems: Product[] = [
    {
      plu: '4011',
      fullname: 'Bananas',
      spoken_variety: '',
      commodity: 'Bananas',
      variety: '',
      category: 'Fruit',
    },
    {
      plu: '4065',
      fullname: 'Green Bell Pepper',
      spoken_variety: '',
      commodity: 'Pepper',
      variety: 'Green Bell',
      category: 'Vegetable',
    },
  ];

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<Round3 onSubmit={mockOnSubmit} gameItems={mockGameItems} />);
  });

  it('renders all game items as text fields', () => {
    expect(screen.getByLabelText('Bananas')).toBeInTheDocument();
    expect(screen.getByLabelText('Green Bell Pepper')).toBeInTheDocument();
  });

  it('updates answers state when input changes', () => {
    const bananasInput = screen.getByLabelText('Bananas');
    fireEvent.change(bananasInput, { target: { value: '4011' } });
    expect(bananasInput).toHaveValue('4011');
  });

  it('calls onSubmit with correct Turn objects when submit button is clicked', () => {
    const bananasInput = screen.getByLabelText('Bananas');
    const pepperInput = screen.getByLabelText('Green Bell Pepper');

    fireEvent.change(bananasInput, { target: { value: '4011' } });
    fireEvent.change(pepperInput, { target: { value: '4065' } });

    fireEvent.click(screen.getByText('Submit Answers'));

    const expectedTurns: Turn[] = [
      { round: 3, playerGuess: '4011', correctAnswer: '4011', isCorrect: true },
      { round: 3, playerGuess: '4065', correctAnswer: '4065', isCorrect: true },
    ];

    expect(mockOnSubmit).toHaveBeenCalledWith(expectedTurns);
  });
});
