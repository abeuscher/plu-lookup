'use client';

import { Container, Typography } from '@mui/material';

import { AppBar } from '../shared/AppBar';
import GameOver from './GameOver';
import { Guess } from '../../types';
import Link from 'next/link';
import React from 'react';
import Round0 from './GameRounds/Round0';
import Round1 from './GameRounds/Round1';
import Round2 from './GameRounds/Round2';
import Round3 from './GameRounds/Round3';
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';

const FlashcardGame: React.FC = () => {
  const { playerName, selectedPLUs } = usePlayerState();
  const { gameState, startGame, handleAnswer, calculateFinalScore, resetGame } =
    useGameState();

  const onAnswer = (guess: Guess) => {
    gameState.currentTurn = {
      round: gameState.currentRound,
      playerGuess: guess.playerGuess,
      correctAnswer: guess.correctAnswer,
      isCorrect: guess.playerGuess === guess.correctAnswer,
    };
    handleAnswer();
  };

  const handleRestartGame = () => {
    resetGame();
    // Not calling startGame() here, so it resets to Round 0
  };

  const renderCurrentStage = () => {
    switch (gameState.currentRound) {
      case 0:
        return (
          <Round0
            playerName={playerName}
            selectedPLUs={selectedPLUs}
            onStartGame={startGame}
          />
        );
      case 1:
        return (
          <Round1
            onAnswer={onAnswer}
            gameItems={gameState.hydratedGameItems}
            currentItemIndex={gameState.currentItemIndex}
          />
        );
      case 2:
        return (
          <Round2
            onAnswer={onAnswer}
            gameItems={gameState.hydratedGameItems}
            currentItemIndex={gameState.currentItemIndex}
          />
        );
      case 3:
        return (
          <Round3
            onSubmit={calculateFinalScore}
            gameItems={gameState.hydratedGameItems}
          />
        );
      case 4:
        return <GameOver score={gameState.score} onRestart={resetGame} />;
      default:
        return null;
    }
  };

  if (!playerName || selectedPLUs.length === 0) {
    return (
      <div>
        <AppBar
          title="Flashcard Game"
          gameState={gameState}
          onRestartGame={handleRestartGame}
        />
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
        onRestartGame={handleRestartGame}
      />
      <Container className="game-round-container">
        {renderCurrentStage()}
      </Container>
    </>
  );
};

export default FlashcardGame;
