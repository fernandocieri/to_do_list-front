import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home component', () => {
  render(<App />);
  expect(screen.getByText(/hide completed duties/i)).toBeInTheDocument();
});
