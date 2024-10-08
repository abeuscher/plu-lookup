'use client';

import { Button, Container, Typography } from '@mui/material';

import Grid from '@mui/material/Grid2';
import { RoundProps } from '../../../types';
import { useGameState } from '../../../hooks/useGameState';

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
  const { shuffleItems } = useGameState();
  const currentItem = gameItems[currentItemIndex];
  if (!currentItem) {
    return null;
  }
  const handlePLUClick = (selectedPLU: string) => {
    onAnswer({ playerGuess: selectedPLU, correctAnswer: currentItem.plu });
  };
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }
  return (
    <Container>
      <Typography variant="body1" gutterBottom>
        Round 1{' '}
        <span style={{ float: 'right' }}>
          Item {currentItemIndex + 1} of {gameItems.length}
        </span>
      </Typography>
      <Typography variant="h3" gutterBottom>
        {toTitleCase(currentItem.fullname)}
      </Typography>
      <Grid container spacing={2}>
        {shuffleItems(gameItems).map((item) => (
          <Grid key={item.plu} size={{ xs: 3 }}>
            <Button
              className="round-1-tile"
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
