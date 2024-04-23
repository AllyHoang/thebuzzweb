// DiscussionDeleteButton.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock Axios for testing
import DiscussionDeleteButton from './DiscussionDeleteButton';

jest.mock('axios');

describe('DiscussionDeleteButton', () => {
  test('successfully deletes discussion', async () => {
    const onDelete = jest.fn();
    const onError = jest.fn();

    const { getByText } = render(
      <DiscussionDeleteButton discussionId="123" onDelete={onDelete} onError={onError} />
    );

    const deleteButton = getByText('Delete');

    // Mock Axios response
    axios.delete.mockResolvedValueOnce({ status: 200, data: { mStatus: 'ok' } });

    // Click delete button
    fireEvent.click(deleteButton);

    // Wait for Axios request to complete
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'https://team-dawgs.dokku.cse.lehigh.edu/admin/discussions/123'
      );
      expect(onDelete).toHaveBeenCalled();
    });
  });
});
