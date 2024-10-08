'use client';

import FlashcardGame from '../../components/FlashcardGame';
import { useAuthCheck } from '../../utils/';

const FlashcardPage = () => {
  const { isAuthenticated } = useAuthCheck();

  if (!isAuthenticated) {
    return null;
  }

  return <FlashcardGame />;
};

export default FlashcardPage;
