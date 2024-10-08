'use client';

import { getLocalStorage, setLocalStorage } from '../utils/';
import { useEffect, useState } from 'react';

export const usePlayerState = () => {
  const [playerName, setPlayerName] = useState(() => 
    getLocalStorage<string>('playerName', '')
  );
  const [selectedPLUs, setSelectedPLUs] = useState(() => 
    getLocalStorage<string[]>('selectedPLUs', [])
  );

  useEffect(() => {
    setLocalStorage('playerName', playerName);
  }, [playerName]);

  useEffect(() => {
    setLocalStorage('selectedPLUs', selectedPLUs);
  }, [selectedPLUs]);

  return {
    playerName,
    setPlayerName,
    selectedPLUs,
    setSelectedPLUs
  };
};