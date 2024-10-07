import { act, renderHook } from '@testing-library/react';

import { usePlayerState } from '../usePlayerState';

// Mock the localStorage helpers
jest.mock('../../utils/localStorageHelpers', () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn(),
}));

describe('usePlayerState Hook', () => {
  const { getLocalStorage, setLocalStorage } = require('../../utils/localStorageHelpers');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize playerName and selectedPLUs from localStorage', () => {
    // Mock the local storage values
    getLocalStorage.mockImplementation((key) => {
      if (key === 'playerName') return 'Bruce';
      if (key === 'selectedPLUs') return ['4011', '94011'];
    });

    const { result } = renderHook(() => usePlayerState());

    // Verify that the initial values are set from localStorage
    expect(result.current.playerName).toBe('Bruce');
    expect(result.current.selectedPLUs).toEqual(['4011', '94011']);
  });

  it('should update playerName and call setLocalStorage when setPlayerName is called', () => {
    const { result } = renderHook(() => usePlayerState());

    act(() => {
      result.current.setPlayerName('Clark');
    });

    // Verify that playerName is updated
    expect(result.current.playerName).toBe('Clark');

    // Verify that setLocalStorage was called with the updated value
    expect(setLocalStorage).toHaveBeenCalledWith('playerName', 'Clark');
  });

  it('should update selectedPLUs and call setLocalStorage when setSelectedPLUs is called', () => {
    const { result } = renderHook(() => usePlayerState());

    act(() => {
      result.current.setSelectedPLUs(['1234']);
    });

    // Verify that selectedPLUs is updated
    expect(result.current.selectedPLUs).toEqual(['1234']);

    // Verify that setLocalStorage was called with the updated value
    expect(setLocalStorage).toHaveBeenCalledWith('selectedPLUs', ['1234']);
  });
});
