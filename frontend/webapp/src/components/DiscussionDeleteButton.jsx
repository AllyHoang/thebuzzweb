/**
 * React component for deleting discussions
 * @module DiscussionDeleteButton
 * @category Components
 * @author Jeffery Desir
 * @version 1.0.0
 * @param {Object} props - The component props
 * @param {string} props.discussionId - The ID of the discussion to delete
 * @param {Function} props.onDelete - Callback function to be called upon successful deletion
 * @param {Function} props.onError - Callback function to be called upon deletion error
 * @returns {JSX.Element} A button component for deleting discussions
 */
import React from "react";
import axios from "axios";

function DiscussionDeleteButton({ discussionId, onDelete, onError }) {
  // Base URL for the API endpoint
  const baseurl = "https://team-dawgs.dokku.cse.lehigh.edu";

  /**
   * Function to handle deletion of discussion
   * @returns {void}
   */
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server to delete the discussion
      const response = await axios.delete(`${baseurl}/admin/discussions/${discussionId}`);
      // Check if the request was successful
      if (response.status === 200 && response.data.mStatus === "ok") {
        // If successful, call onDelete callback function to notify parent component
        onDelete();
      } else {
        // If unsuccessful, call onError callback function with error message
        onError(response.data.mMessage || "Failed to delete discussion");
      }
    } catch (error) {
      // If an error occurs during the request, log the error and call onError callback
      console.error("Error deleting discussion:", error);
      onError(error.message || "Failed to delete discussion");
    }
  };

  // Render a button with an onClick event listener to trigger the handleDelete function
  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

// Export the DiscussionDeleteButton component as default
export default DiscussionDeleteButton;
