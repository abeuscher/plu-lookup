import { Button, Container, Grid, Typography } from '@mui/material';

import { Product } from '../../../types';
import React from 'react';

interface Round1Props {
  onAnswer: (isCorrect: boolean) => void;
  gameItems: Product[];
}

const Round1: React.FC<Round1Props> = ({ onAnswer, gameItems }) => {
  const currentItem = gameItems[0];

  const handlePLUClick = (selectedPLU: string) => {
    onAnswer(selectedPLU === currentItem.plu);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        {currentItem.fullname}
      </Typography>
      <Grid container spacing={2}>
        {gameItems.map((item) => (
          <Grid item xs={3} key={item.plu}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handlePLUClick(item.plu)}
            >
              {item.plu}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Round1;
