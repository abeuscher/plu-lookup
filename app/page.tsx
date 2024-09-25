// pages/index.js

import FlashcardGame from '../components/FlashcardGame';
import ProductSearch from '../components/ProductSearch';
import React from 'react';

const Home = () => {
  return <div>
    <ProductSearch />
    <FlashcardGame />
    </div>;
};

export default Home;
