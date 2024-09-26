import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

import { GameState } from '../../types';
import React from 'react';
import { usePlayerState } from '../../hooks/usePlayerState';

interface AppBarProps {
  title: string;
  gameState: GameState;
}

export const AppBar: React.FC<AppBarProps> = ({ title, gameState }) => {
  const { playerName } = usePlayerState();
  return (
    <MuiAppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {gameState.currentRound > 0 && (
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
          </>
        )}
        <Typography variant="body1" style={{ marginLeft: 16 }}>
          Player: {playerName}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
