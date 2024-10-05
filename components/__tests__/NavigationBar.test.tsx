import { fireEvent, render, screen } from '@testing-library/react';

import NavigationBar from '../NavigationBar'; // Adjusted path
import { menuItems } from '../../data/nav';

// Mock window.location.pathname
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/voice-lookup', // Set an initial path
  },
  writable: true,
});

describe('NavigationBar Component', () => {
  test('sets currentPath on initial render', () => {
    render(<NavigationBar />);

    // Verify that the correct link is bold based on the initial path
    expect(screen.getByRole('link', { name: /voice lookup/i })).toHaveStyle(
      'font-weight: bold'
    );
  });

  test('updates link styles based on current path', () => {
    render(<NavigationBar />);

    // Verify the initial path is applied
    const voiceLookupLink = screen.getByRole('link', { name: /voice lookup/i });
    expect(voiceLookupLink).toHaveStyle('font-weight: bold');

    // Simulate a path change
    window.location.pathname = '/exporter';
    fireEvent.popState(window); // Simulate popstate event

    // Re-render the component to check for style updates
    const exporterLink = screen.getByRole('link', { name: /exporter/i });
    expect(exporterLink).toHaveStyle('font-weight: bold');
  });

  test('toggles mobile drawer on button click', () => {
    render(<NavigationBar />);

    // Ensure the drawer is initially closed
    expect(screen.queryByText(menuItems[0].text)).not.toBeInTheDocument();

    // Click the menu button to open the drawer
    const menuButton = screen.getByLabelText(/menu/i);
    fireEvent.click(menuButton);

    // Verify the drawer is now open
    expect(screen.getByText(menuItems[0].text)).toBeInTheDocument();

    // Click the menu button to close the drawer
    fireEvent.click(menuButton);
    expect(screen.queryByText(menuItems[0].text)).not.toBeInTheDocument();
  });
});
