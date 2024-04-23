// LikeButton.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock Axios for testing
import LikeButton from './LikeButton';

jest.mock('axios');

describe('LikeButton', () => {
  test('successfully likes discussion', async () => {
    const { getByText } = render(
      <LikeButton discussionId="456" />
    );

    const likeButton = getByText('Like');

    // Mock Axios response
    axios.post.mockResolvedValueOnce({ status: 200, data: { mStatus: 'ok' } });

    // Click like button
    fireEvent.click(likeButton);

    // Wait for Axios request to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://team-dawgs.dokku.cse.lehigh.edu/discussions/456/like'
      );
    });
  });
});