import { Box, Paper, Typography } from '@mui/material';

import { GameState } from '../../types';
import React from 'react';
import { usePlayerState } from '../../hooks/usePlayerState';

interface GameInfoBlockProps {
  gameState: GameState;
}

const GameInfoBlock: React.FC<GameInfoBlockProps> = ({ gameState }) => {
  const { playerName } = usePlayerState();

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6">Game Information</Typography>
        <Typography>Player: {playerName}</Typography>
        <Typography>Current Round: {gameState.currentRound}</Typography>
        <Typography>Score: {gameState.score}</Typography>
        <Typography>Remaining Items: {gameState.gameItems.length}</Typography>
      </Box>
    </Paper>
  );
};

export default GameInfoBlock;
