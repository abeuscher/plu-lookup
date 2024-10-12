import { generateMetadata, getStructuredData } from '../utils/';

import HomePage from '@/components/HomePage';
import { StructuredData } from '@/components/StructuredData';

export const metadata = generateMetadata('/');

const Home = () => {
  const structuredData = getStructuredData('/');
  return (
    <>
      <StructuredData data={structuredData} />
      <HomePage />
    </>
  );
};

export default Home;
