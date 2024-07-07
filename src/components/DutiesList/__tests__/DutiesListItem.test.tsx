import { render, screen, fireEvent } from '@testing-library/react';
import DutiesListItem from '../DutiesListItem';

const duty = {
  id: '1',
  name: 'Test Duty',
  done: false,
};

const mockUpdateDutyCompletion = jest.fn();
const mockUpdateDutyName = jest.fn();
const mockRemoveDuty = jest.fn();

test('renders duty item', () => {
  render(
    <DutiesListItem
      {...duty}
      updateDutyCompletion={mockUpdateDutyCompletion}
      updateDutyName={mockUpdateDutyName}
      removeDuty={mockRemoveDuty}
    />
  );
  expect(screen.getByText(/test duty/i)).toBeInTheDocument();
});

test('calls updateDutyCompletion when checkbox is clicked', () => {
  render(
    <DutiesListItem
      {...duty}
      updateDutyCompletion={mockUpdateDutyCompletion}
      updateDutyName={mockUpdateDutyName}
      removeDuty={mockRemoveDuty}
    />
  );
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(mockUpdateDutyCompletion).toHaveBeenCalledWith(duty.id, true);
});

test('calls removeDuty when delete button is clicked', () => {
  render(
    <DutiesListItem
      {...duty}
      updateDutyCompletion={mockUpdateDutyCompletion}
      updateDutyName={mockUpdateDutyName}
      removeDuty={mockRemoveDuty}
    />
  );
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);
  expect(mockRemoveDuty).toHaveBeenCalledWith(duty.id);
});
