import { Button, Container, Typography } from '@mui/material';

import { Product } from '../../../types';

interface Round0Props {
  playerName: string;
  gameItems: Product[];
  onStartGame: () => void;
}

const Round0: React.FC<Round0Props> = ({
  playerName,
  gameItems,
  onStartGame,
}) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Ready to start, {playerName}?
      </Typography>
      <Typography variant="body1" gutterBottom>
        You've selected {gameItems.length} PLUs to be quizzed on.
      </Typography>
      <Button variant="contained" color="primary" onClick={onStartGame}>
        Start Game
      </Button>
    </Container>
  );
};

export default Round0;
