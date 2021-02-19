import React from 'react';
import { render, screen } from '@testing-library/react';
import { Page } from 'components/Page/Page';

test('renders Page', () => {
  render(<Page />);
  const linkElement = screen.getByText(/categories/i);
  expect(linkElement).toBeInTheDocument();
});
