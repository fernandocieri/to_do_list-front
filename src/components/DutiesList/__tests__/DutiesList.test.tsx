import { render, screen } from '@testing-library/react';
import DutiesList from '../DutiesList';

jest.mock('../../../services/API', () => ({
  getDuties: jest.fn().mockResolvedValue([]),
  patchDuty: jest.fn().mockResolvedValue({}),
  postDuty: jest.fn().mockResolvedValue('new-id'),
  deleteDuty: jest.fn().mockResolvedValue({}),
}));

test('renders duties list', async () => {
  render(<DutiesList />);
  expect(await screen.findByText(/add new duty/i)).toBeInTheDocument();
});
