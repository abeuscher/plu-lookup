import { generateMetadata, getStructuredData } from '../../utils';

import FlashcardGame from '../../components/FlashcardGame';
import { StructuredData } from '../layout';

export const metadata = generateMetadata('/flashcard');

const FlashcardPage = () => {
  const structuredData = getStructuredData('/voice-lookup');
  return (
    <>
      <StructuredData data={structuredData} />
      <FlashcardGame />
    </>
  );
};

export default FlashcardPage;
