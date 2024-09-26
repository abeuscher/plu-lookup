import { Button, Container, Typography } from '@mui/material';

import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Game Over
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your final score: {score}
      </Typography>
      <Button variant="contained" color="primary" onClick={onRestart}>
        Play Again
      </Button>
    </Container>
  );
};

export default GameOver;
