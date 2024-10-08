'use client';

import { Button, Container, Typography } from '@mui/material';

import Grid from '@mui/material/Grid2';
import { RoundProps } from '../../../types';
import { shuffleItems } from '../../../utils';

const Round2: React.FC<RoundProps> = ({
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
        <Typography>No items available for Round 2</Typography>
      </Container>
    );
  }
  const currentItem = gameItems[currentItemIndex];
  if (!currentItem) {
    return null;
  }

  const handleProductClick = (selectedProductName: string) => {
    onAnswer({
      playerGuess: selectedProductName,
      correctAnswer: currentItem.fullname,
    });
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
        {shuffleItems(gameItems).map((item) => (
          <Grid key={item.fullname} size={{ xs: 3 }}>
            <Button
              className="round-2-tile"
              variant="contained"
              fullWidth
              onClick={() => handleProductClick(item.fullname)}
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
