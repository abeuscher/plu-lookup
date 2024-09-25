// pages/index.js

import NavigationBar from '../components/NavigationBar';
import ProductSearch from '../components/ProductSearch';
import React from 'react';

const Home = () => {
  return <div>
    <NavigationBar />
    <ProductSearch />
    </div>;
};

export default Home;
