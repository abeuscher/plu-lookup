'use client';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { GameState } from '@/types';
import { usePlayerState } from '@/hooks/usePlayerState';

interface AppBarProps {
  title: string;
  gameState: GameState;
  onRestartGame: () => void;
}

export const StatusBar: React.FC<AppBarProps> = ({
  title,
  gameState,
  onRestartGame,
}) => {
  const { playerName } = usePlayerState();

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
        >
          {title}
        </Typography>
        <Typography variant="body1">Player: {playerName}</Typography>
        {gameState && gameState.currentRound > 0 && (
          <>
            <Typography
              variant="body1"
              style={{ marginRight: 12, marginLeft: 12 }}
            >
              Round {gameState.currentRound}
            </Typography>
            <Typography variant="body1" style={{ marginRight: 12 }}>
              Score: {gameState.score}
            </Typography>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={onRestartGame}
              style={{ marginLeft: 16 }}
            >
              Restart Game
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
