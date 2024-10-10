'use client';

import { Button, Container, Grid2 as Grid, Typography } from '@mui/material';

import { RoundProps } from '@/types';
import { toTitleCase } from '@/utils';

const Round2: React.FC<RoundProps> = ({
  onAnswer,
  gameItems,
  shuffledIndexes,
  currentItemIndex,
}) => {
  if (
    !gameItems ||
    gameItems.length === 0 ||
    currentItemIndex >= gameItems.length
  ) {
    return (
      <Container>
        <Typography>No items available for Round 2</Typography>
      </Container>
    );
  }
  const currentItem = gameItems[shuffledIndexes[currentItemIndex]];
  if (!currentItem) {
    return null;
  }

  const handleProductClick = (selectedProductName: string) => {
    setTimeout(() => {
      onAnswer({
        playerGuess: selectedProductName,
        correctAnswer: currentItem.fullname,
      });
    }, 500);
  };

  return (
    <Container>
      <Typography variant="body1" gutterBottom>
        Round 2
        <span style={{ float: 'right' }}>
          Item {currentItemIndex + 1} of {gameItems.length}
        </span>
      </Typography>
      <Typography variant="h3" gutterBottom>
        PLU: {currentItem.plu}
      </Typography>
      <Grid container spacing={2}>
        {gameItems.map((item) => (
          <Grid key={item.fullname} size={{ xs: 3 }}>
            <Button
              className={`round-2-tile  ${item.plu === currentItem.plu ? 'correct' : 'incorrect'}`}
              variant="contained"
              fullWidth
              onClick={() => handleProductClick(item.fullname)}
            >
              {toTitleCase(item.fullname)}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Round2;
