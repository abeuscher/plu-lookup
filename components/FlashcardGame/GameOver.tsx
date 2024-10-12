import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { GameState, Turn } from '@/types';

import React from 'react';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameState, onRestart }) => {
  console.log(gameState);
  const renderRoundRecap = (roundNumber: number) => {
    const roundTurns = gameState.history.filter(
      (turn) => turn.round === roundNumber
    );

    return (
      <List>
        <Typography variant="h6">Round {roundNumber}:</Typography>
        {roundTurns.map((turn, index) => (
          <ListItem key={index}>
            <ListItemText>
              {index + 1}. Correct answer was {turn.correctAnswer}. You guessed{' '}
              {turn.playerGuess}.
              {turn.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Game Over
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your final score: {gameState.score}
      </Typography>

      {renderRoundRecap(1)}
      {renderRoundRecap(2)}
      {renderRoundRecap(3)}

      <Button
        variant="contained"
        color="primary"
        onClick={onRestart}
        style={{ marginTop: '20px' }}
      >
        Play Again
      </Button>
    </Container>
  );
};

export default GameOver;
