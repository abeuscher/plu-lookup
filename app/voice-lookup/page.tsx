'use client';

import NavigationBar from '../../components/NavigationBar';
import ProductSearch from '../../components/ProductSearch';
import React from 'react';
import { useAuthCheck } from '../../utils/authCheck';

const VoiceLookup = () => {
  const { isAuthenticated } = useAuthCheck();

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <NavigationBar />
      <ProductSearch />
    </div>
  );
};

export default VoiceLookup;
