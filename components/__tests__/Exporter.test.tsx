import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Exporter from '../Exporter';
import Papa from 'papaparse';
import { useGameState } from '../../hooks/useGameState';
import { usePlayerState } from '../../hooks/usePlayerState';

// Mock the hooks
jest.mock('../../hooks/useGameState');
jest.mock('../../hooks/usePlayerState');

// Mock file-saving functionality
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

// Mock Papa.parse
jest.mock('papaparse', () => ({
  parse: jest.fn(),
}));

describe('Exporter Component', () => {
  const mockSetGameItems = jest.fn();
  const mockSelectedPLUs = ['12345', '67890'];

  beforeEach(() => {
    // Mock return values for useGameState and usePlayerState
    (useGameState as jest.Mock).mockReturnValue({
      setGameItems: mockSetGameItems,
    });
    (usePlayerState as jest.Mock).mockReturnValue({
      selectedPLUs: mockSelectedPLUs,
    });

    // Reset mock functions before each test
    jest.clearAllMocks();
  });

  it('should call setGameItems with the parsed CSV data when a file is uploaded', async () => {
    render(<Exporter />);

    // Mock the result of Papa.parse
    const parsedData = {
      data: [
        { plu: '12345', fullname: 'Apple', type: 'Fruit' },
        { plu: '67890', fullname: 'Banana', type: 'Fruit' },
      ],
    };

    (Papa.parse as jest.Mock).mockImplementation((file, options) => {
      options.complete(parsedData); // Simulate the completion of parsing with the mock data
    });

    // Simulate a CSV file upload event
    const file = new Blob(
      ['plu,fullname,type\n12345,Apple,Fruit\n67890,Banana,Fruit\n'],
      { type: 'text/csv' }
    );
    const input = screen.getByTestId('file-input');

    // Fire the file input change event with the CSV file
    fireEvent.change(input, {
      target: { files: [file] },
    });

    // Wait for the file to be processed and check if setGameItems was called with parsed data
    await waitFor(() => {
      expect(mockSetGameItems).toHaveBeenCalledWith([
        { plu: '12345', fullname: 'Apple', type: 'Fruit' },
        { plu: '67890', fullname: 'Banana', type: 'Fruit' },
      ]);
    });
  });

  it('should display the correct products when exported', () => {
    render(<Exporter />);

    // Simulate the export button click
    const exportButton = screen.getByText(/export all/i);
    fireEvent.click(exportButton);

    // Check if the saveAs function was called
    expect(require('file-saver').saveAs).toHaveBeenCalled();
  });
});
