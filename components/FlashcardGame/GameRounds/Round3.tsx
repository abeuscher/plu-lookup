'use client';

import { Button, Container, TextField, Typography } from '@mui/material';
import { Product, Turn } from '../../../types';

import { useState } from 'react';

interface Round3Props {
  onSubmit: (answers: Turn[]) => void;
  gameItems: Product[];
}

const Round3: React.FC<Round3Props> = ({ onSubmit, gameItems }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (plu: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [plu]: value }));
  };

  const handleSubmit = () => {
    const turns: Turn[] = gameItems.map((item) => ({
      round: 3,
      playerGuess: answers[item.plu] || '',
      correctAnswer: item.plu,
      isCorrect: answers[item.plu] === item.plu,
    }));
    onSubmit(turns);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Round 3
      </Typography>
      <Typography variant="h5" gutterBottom>
        Enter PLUs for the following items:
      </Typography>
      {gameItems &&
        gameItems.map((item) => (
          <TextField
            key={item.plu}
            fullWidth
            label={item.fullname}
            value={answers[item.plu] || ''}
            onChange={(e) => handleInputChange(item.plu, e.target.value)}
            margin="normal"
          />
        ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Answers
      </Button>
    </Container>
  );
};

export default Round3;
