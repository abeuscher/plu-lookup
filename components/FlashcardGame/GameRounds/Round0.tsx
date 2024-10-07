import { Button, Container, Typography } from '@mui/material';

interface Round0Props {
  playerName: string;
  selectedPLUs: string[]; // Use selectedPLUs instead of hydratedGameItems
  onStartGame: () => void;
}

const Round0: React.FC<Round0Props> = ({
  playerName,
  selectedPLUs,
  onStartGame,
}) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom>
        PLU Quiz
      </Typography>
      <Typography variant="h5" gutterBottom>
        Ready to start, {playerName}?
      </Typography>
      <Typography variant="body1" gutterBottom>
        You've selected {selectedPLUs.length} PLUs to be quizzed on.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onStartGame}
        sx={{ marginTop: '1rem' }}
      >
        Start Game
      </Button>
    </Container>
  );
};

export default Round0;
