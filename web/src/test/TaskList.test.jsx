import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import TaskList from '../pages/TaskList';
import * as taskService from '../services/taskService';

vi.mock('../services/taskService');

const mockTasks = [
  { id: 1, title: 'Setup CI', status: 'OPEN', priority: 'HIGH', dueDate: '2026-06-01' },
  { id: 2, title: 'Write docs', status: 'DONE', priority: 'MEDIUM', dueDate: '2026-06-10' }
];

describe('TaskList', () => {

  beforeEach(() => {
    taskService.fetchTasks.mockResolvedValue(mockTasks);
    taskService.updateTask.mockResolvedValue({ ...mockTasks[0], status: 'DONE' });
  });

  it('renders the list of tasks returned by the API', async () => {
    render(<MemoryRouter><TaskList /></MemoryRouter>);
    expect(await screen.findByText('Setup CI')).toBeInTheDocument();
    expect(screen.getByText('Write docs')).toBeInTheDocument();
  });

  it('does not show "Mark Done" button for tasks already DONE', async () => {
    render(<MemoryRouter><TaskList /></MemoryRouter>);
    await screen.findByText('Setup CI');
    const buttons = screen.getAllByRole('button', { name: /mark as done/i });
    // Only task 1 (OPEN) should have the button — task 2 (DONE) should not
    expect(buttons).toHaveLength(1);
  });

  /**
   * Challenge F-1: This test currently fails.
   * It should pass once the stale state bug is fixed.
   */
  it('updates task status in the UI after marking as done', async () => {
    render(<MemoryRouter><TaskList /></MemoryRouter>);
    const button = await screen.findByRole('button', { name: /mark as done/i });
    fireEvent.click(button);

    await waitFor(() => {
      // After clicking, the "Mark Done" button for task 1 should disappear
      expect(screen.queryByRole('button', { name: /mark as done/i })).not.toBeInTheDocument();
    });
  });
});