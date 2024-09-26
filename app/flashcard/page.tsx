'use client';

import FlashcardGame from '../../components/FlashcardGame';
import NavigationBar from '../../components/NavigationBar';
import React from 'react';
import { useAuthCheck } from '../../utils/authCheck';

const FlashcardPage = () => {
  const { isAuthenticated } = useAuthCheck();

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <NavigationBar />
      <FlashcardGame />
    </div>
  );
};

export default FlashcardPage;
