import { useEffect } from 'react';
import { usePlayerState } from '../hooks/usePlayerState';
import { useRouter } from 'next/navigation';

export const useAuthCheck = () => {
  const router = useRouter();
  const { playerName, selectedPLUs } = usePlayerState();

  useEffect(() => {
    if (!playerName || selectedPLUs.length === 0) {
      router.push('/');
    }
  }, [playerName, selectedPLUs, router]);

  return { isAuthenticated: !!playerName && selectedPLUs.length > 0 };
};

export const shuffleItems = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error getting localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export const emptyTurn = {
  round: 0,
  playerGuess: null,
  correctAnswer: null,
  isCorrect: null,
}