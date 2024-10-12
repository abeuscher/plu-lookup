import { generateMetadata, getStructuredData } from '../utils/';

import HomePage from '../components/HomePage';
import React from 'react';
import { StructuredData } from './layout';

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
