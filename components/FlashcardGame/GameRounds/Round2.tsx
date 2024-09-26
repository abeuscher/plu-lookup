import { Button, Container, Grid, Typography } from '@mui/material';

import { Product } from '../../../types';
import React from 'react';

interface Round2Props {
  onAnswer: (isCorrect: boolean) => void;
  gameItems: Product[];
}

const Round2: React.FC<Round2Props> = ({ onAnswer, gameItems }) => {
  if (gameItems.length === 0) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          No more items to quiz. Moving to next round...
        </Typography>
      </Container>
    );
  }

  const currentItem = gameItems[0];

  const handleNameClick = (selectedName: string) => {
    onAnswer(selectedName === currentItem.fullname);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        {currentItem.plu}
      </Typography>
      <Grid container spacing={2}>
        {gameItems.map((item) => (
          <Grid item xs={6} key={item.plu}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleNameClick(item.fullname)}
            >
              {item.fullname}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Round2;
