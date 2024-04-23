# CSE 216 Team Repo Web Branch

This is being used for the Phase 2 Sprint 8 Unit Tests.

## Unit Tests

* Example of a like button test:

    ```
    describe('LikeButton', () => {
        test('successfully likes discussion', async () => {
            const { getByText } = render(
            <LikeButton discussionId="456" />
            );
            const likeButton = getByText('Like');
            axios.post.mockResolvedValueOnce({ status: 200, data: { mStatus: 'ok' } });
            fireEvent.click(likeButton);
            await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://team-dawgs.dokku.cse.lehigh.edu/discussions/456/like'
            );
            });
        });
    });
    ```

* Example of a delete discussion test:

    ```
    describe('DiscussionDeleteButton', () => {
        test('successfully deletes discussion', async () => {
            const onDelete = jest.fn();
            const onError = jest.fn();
            const { getByText } = render(
            <DiscussionDeleteButton discussionId="123" onDelete={onDelete} onError={onError} />
            );
            const deleteButton = getByText('Delete');
            axios.delete.mockResolvedValueOnce({ status: 200, data: { mStatus: 'ok' } });
            fireEvent.click(deleteButton);
            await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(
                'https://team-dawgs.dokku.cse.lehigh.edu/admin/discussions/123'
            );
            expect(onDelete).toHaveBeenCalled();
            });
        });
    });
    ```