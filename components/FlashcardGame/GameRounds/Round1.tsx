'use client';

import { Button, Container, Grid2 as Grid, Typography } from '@mui/material';

import { RoundProps } from '@/types';
import { toTitleCase } from '@/utils';

const Round1: React.FC<RoundProps> = ({
  onAnswer,
  gameItems,
  currentItemIndex,
}) => {
  if (
    !gameItems ||
    gameItems.length === 0 ||
    currentItemIndex >= gameItems.length
  ) {
    return (
      <Container>
        <Typography>No items available for Round 1</Typography>
      </Container>
    );
  }
  const currentItem = gameItems[currentItemIndex];
  if (!currentItem) {
    return null;
  }
  const handlePLUClick = (selectedPLU: string) => {
    setTimeout(() => {
      onAnswer({ playerGuess: selectedPLU, correctAnswer: currentItem.plu });
    }, 500);
  };

  return (
    <Container>
      <Typography variant="body1" gutterBottom>
        Round 1
        <span style={{ float: 'right' }}>
          Item {currentItemIndex + 1} of {gameItems.length}
        </span>
      </Typography>
      <Typography variant="h3" gutterBottom>
        {toTitleCase(currentItem.fullname)}
      </Typography>
      <Grid container spacing={2}>
        {gameItems.map((item) => (
          <Grid key={item.plu} size={{ xs: 3 }}>
            <Button
              className={`round-1-tile ${item.plu === currentItem.plu ? 'correct' : 'incorrect'}`}
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
