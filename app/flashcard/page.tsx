import { generateMetadata, getStructuredData } from '@/utils';

import FlashcardGame from '@/components/FlashcardGame';
import { StructuredData } from '@/components/StructuredData';

export const metadata = generateMetadata('/flashcard');

const FlashcardPage = () => {
  const structuredData = getStructuredData('/flashcard');
  return (
    <>
      <StructuredData data={structuredData} />
      <FlashcardGame />
    </>
  );
};

export default FlashcardPage;
