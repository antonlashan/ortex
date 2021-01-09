import { render, screen } from '@testing-library/react';
import React from 'react';

import { App } from './App';

test('renders Ortex test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ortex/i);
  expect(linkElement).toBeInTheDocument();
});
