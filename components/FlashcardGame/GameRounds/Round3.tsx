'use client';

import { Button, Container, TextField, Typography } from '@mui/material';

import { Product } from '../../../types/';
import { useState } from 'react';

interface Round3Props {
  onSubmit: (answers: Record<string, string>) => void;
  gameItems: Product[];
}

const Round3: React.FC<Round3Props> = ({ onSubmit, gameItems }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (plu: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [plu]: value }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Enter PLUs for the following items:
      </Typography>
      {gameItems.map((item) => (
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
