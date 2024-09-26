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