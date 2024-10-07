import {
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material';

import { GameState } from '../../types';
import React from 'react';
import { usePlayerState } from '../../hooks/usePlayerState';

interface AppBarProps {
  title: string;
  gameState: GameState;
  onRestartGame: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  gameState,
  onRestartGame,
}) => {
  const { playerName } = usePlayerState();

  return (
    <MuiAppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {gameState && gameState.currentRound > 0 && (
          <>
            <Typography variant="h5" style={{ marginRight: 16 }}>
              Game Details
            </Typography>
            <Typography variant="body1" style={{ marginRight: 12 }}>
              Score: {gameState.score}
            </Typography>
            <Typography variant="body1" style={{ marginRight: 12 }}>
              Round {gameState.currentRound}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={onRestartGame}
              style={{ marginRight: 16 }}
            >
              Restart Game
            </Button>
          </>
        )}
        <Typography variant="body1" style={{ marginLeft: 16 }}>
          Player: {playerName}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
