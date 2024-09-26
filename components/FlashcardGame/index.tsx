'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AppBar } from '../shared/AppBar';
import GameOver from './GameOver';
import Round1 from './GameRounds/Round1';
import Round2 from './GameRounds/Round2';
import Round3 from './GameRounds/Round3';
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';
import { useRouter } from 'next/navigation';

const FlashcardGame: React.FC = () => {
  const router = useRouter();
  const { playerName, selectedPLUs } = usePlayerState();
  const {
    gameState,
    startGame,
    handleAnswer,
    advanceRound,
    calculateFinalScore,
    resetGame,
  } = useGameState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!playerName || selectedPLUs.length === 0) {
      router.push('/');
    } else {
      setIsReady(true);
    }
  }, [playerName, selectedPLUs, router]);

  const handleStartGame = () => {
    startGame(selectedPLUs);
  };

  const renderCurrentStage = () => {
    if (
      gameState.gameItems.length === 0 &&
      gameState.currentRound !== 0 &&
      gameState.currentRound !== 4
    ) {
      // If we've run out of items, move to the next round
      advanceRound();
      return null;
    }

    switch (gameState.currentRound) {
      case 0:
        return (
          <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
              Ready to start, {playerName}?
            </Typography>
            <Typography variant="body1" gutterBottom>
              You've selected {selectedPLUs.length} PLUs to be quizzed on.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartGame}
            >
              Start Game
            </Button>
          </Container>
        );
      case 1:
        return (
          <Round1 onAnswer={handleAnswer} gameItems={gameState.gameItems} />
        );
      case 2:
        return (
          <Round2 onAnswer={handleAnswer} gameItems={gameState.gameItems} />
        );
      case 3:
        return (
          <Round3
            onSubmit={calculateFinalScore}
            gameItems={gameState.gameItems}
          />
        );
      case 4:
        return <GameOver score={gameState.score} onRestart={resetGame} />;
      default:
        return null;
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      <AppBar
        title={`Flashcard Game - Round ${gameState.currentRound}`}
        gameState={gameState}
      />
      <Container>{renderCurrentStage()}</Container>
    </>
  );
};

export default FlashcardGame;
