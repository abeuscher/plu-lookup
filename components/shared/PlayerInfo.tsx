import React from 'react';
import { Typography } from '@mui/material';
import { usePlayerState } from '../../hooks/usePlayerState';

const PlayerInfo: React.FC = () => {
  const { playerName } = usePlayerState();

  return (
    <Typography variant="h6" gutterBottom>
      Player: {playerName}
    </Typography>
  );
};

export default PlayerInfo;
