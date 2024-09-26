'use client';

import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';

import PLUSelector from '../shared/PLUSelector';
import PlayerInfo from '../shared/PlayerInfo';

interface GameSetupProps {
  onStartGame: (selectedPLUs: string[]) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [selectedPLUs, setSelectedPLUs] = useState<string[]>([]);

  const handleStartGame = () => {
    if (selectedPLUs.length > 0) {
      onStartGame(selectedPLUs);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Flashcard Game Setup
      </Typography>
      <PlayerInfo />
      <PLUSelector onSelectionChange={setSelectedPLUs} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartGame}
        disabled={selectedPLUs.length === 0}
      >
        Start Game
      </Button>
    </Container>
  );
};

export default GameSetup;
