import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { RoundProps } from '../../../types';

const Round2: React.FC<RoundProps> = ({
  onAnswer,
  gameItems,
  currentItemIndex,
}) => {
  const [userInput, setUserInput] = useState('');

  if (!gameItems || gameItems.length === 0) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading game items...</Typography>
      </Container>
    );
  }

  const currentItem = gameItems[currentItemIndex];

  if (!currentItem) {
    return (
      <Container>
        <Typography variant="h5">Round 2 Complete</Typography>
      </Container>
    );
  }

  const handleSubmit = () => {
    const isCorrect =
      userInput.trim().toLowerCase() === currentItem.fullname.toLowerCase();
    onAnswer(isCorrect);
    setUserInput('');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Round 2 - Item {currentItemIndex + 1} of {gameItems.length}
      </Typography>
      <Typography variant="h6" gutterBottom>
        PLU: {currentItem.plu}
      </Typography>
      <TextField
        fullWidth
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter the product name"
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Answer
      </Button>
    </Container>
  );
};

export default Round2;
