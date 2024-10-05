'use client';

import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { AppBar } from '../shared/AppBar';
import GameOver from './GameOver';
import Link from 'next/link';
import Round0 from './GameRounds/Round0';
import Round1 from './GameRounds/Round1';
import Round2 from './GameRounds/Round2';
import Round3 from './GameRounds/Round3';
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';

const FlashcardGame: React.FC = () => {
  const { playerName, selectedPLUs } = usePlayerState();
  const {
    gameState,
    startGame,
    handleAnswer,
    handleRound1Data,
    advanceRound,
    calculateFinalScore,
    resetGame,
  } = useGameState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (playerName && selectedPLUs.length > 0) {
      setIsReady(true);
    }
  }, [playerName, selectedPLUs]);

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
          <Round0
            playerName={playerName}
            gameItems={gameState.gameItems}
            onStartGame={handleStartGame}
          />
        );
      case 1:
        return (
          <Round1
            onAnswer={handleAnswer}
            gameItems={gameState.gameItems}
            onRound1Data={handleRound1Data}
          />
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
    return (
      <div>
        <AppBar title="Flashcard Game" gameState={gameState} />
        <Container>
          <Link href="/">
            <Typography variant="h5" gutterBottom>
              Please select your name and at least one PLU to start the game on
              the home page.
            </Typography>
          </Link>
        </Container>
      </div>
    );
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
