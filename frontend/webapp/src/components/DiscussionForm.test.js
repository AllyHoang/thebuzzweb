// DiscussionForm.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock Axios for testing
import DiscussionForm from './DiscussionForm';

jest.mock('axios');

describe('DiscussionForm', () => {
  test('submits form with correct data', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { getByLabelText, getByText } = render(
      <DiscussionForm onSuccess={onSuccess} onError={onError} />
    );

    const titleInput = getByLabelText('Title:');
    const messageInput = getByLabelText('Idea:');
    const submitButton = getByText('Submit');

    // Fill out form inputs
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    // Submit form
    fireEvent.click(submitButton);

    // Mock Axios response
    axios.post.mockResolvedValueOnce({ status: 200, data: { mStatus: 'ok' } });

    // Wait for Axios request to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://team-dawgs.dokku.cse.lehigh.edu/discussions',
        { mTitle: 'Test Title', mMessage: 'Test Message' },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});