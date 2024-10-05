'use client';

import { Button, Container, Grid, Typography } from '@mui/material';

import { Product } from '../../../types';
import styles from './Round1.module.scss';
import { useState } from 'react';

interface Round1Props {
  onAnswer: (isCorrect: boolean) => void;
  onRound1Data: (data: number[]) => void;
  gameItems: Product[];
}

const Round1: React.FC<Round1Props> = ({ onAnswer, gameItems }) => {
  const [pastGuesses, setPastGuesses] = useState<
    {
      text: string;
      guessedPLU: string;
      correctPLU: string;
      isCorrect: boolean;
    }[]
  >([]);

  const currentItem = gameItems[0];

  const handlePLUClick = (selectedPLU: string) => {
    const isCorrect = selectedPLU === currentItem.plu;

    const newGuess = {
      text: currentItem.fullname,
      guessedPLU: selectedPLU,
      correctPLU: currentItem.plu,
      isCorrect: isCorrect,
    };

    setPastGuesses([newGuess, ...pastGuesses]);
    onRound1Data(pastGuesses);
    onAnswer(isCorrect);
  };

  return (
    <Container maxWidth="md">
      {/* Feedback Area */}
      <div className={styles.feedbackContainer}>
        <ul>
          {pastGuesses.map((guess, index) => (
            <li
              key={index}
              className={guess.isCorrect ? styles.correct : styles.error}
            >
              {guess.text} - Your guess: {guess.guessedPLU}
              {!guess.isCorrect && ` - Correct PLU: ${guess.correctPLU}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Playing Grid */}
      <Typography variant="h5" gutterBottom>
        {currentItem.fullname}
      </Typography>
      <Grid container spacing={2}>
        {gameItems.map((item) => (
          <Grid item xs={3} key={item.plu}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handlePLUClick(item.plu)}
            >
              {item.plu}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Round1;
