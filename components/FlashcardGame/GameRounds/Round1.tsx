import { Button, Container, Grid, Typography } from '@mui/material';

import { RoundProps } from '../../../types';

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
    const isCorrect = selectedPLU === currentItem.plu;
    onAnswer(isCorrect);
  };
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Round 1 - Item {currentItemIndex + 1} of {gameItems.length}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {toTitleCase(currentItem.fullname)}
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
