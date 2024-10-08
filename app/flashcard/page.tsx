'use client';

import FlashcardGame from '../../components/FlashcardGame';
import { useAuthCheck } from '../../utils/';

const FlashcardPage = () => {
  const { isAuthenticated } = useAuthCheck();

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <FlashcardGame />
    </div>
  );
};

export default FlashcardPage;
