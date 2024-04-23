/**
 * React component for liking discussions
 * @module LikeButton
 * @category Components
 * @param {Object} props - The component props
 * @param {string} props.discussionId - The ID of the discussion to like
 * @returns {JSX.Element} A button to like discussions
 */
import React, { useState } from "react";
import axios from "axios";
import { FaThumbsUp } from 'react-icons/fa';

function LikeButton({ discussionId }) {
  // State variable to track the number of likes
  const [likes, setLikes] = useState(0);

  // Function to handle liking a discussion
  const handleLike = async () => {
    try {
      // Send a POST request to the server to like the discussion
      const response = await axios.post(
        `https://team-dawgs.dokku.cse.lehigh.edu/discussions/${discussionId}/like`
      );
      // Check if the request was successful
      if (response.status === 200 && response.data.mStatus === "ok") {
        // Increment likes count on successful like
        setLikes(likes + 1);
      } else {
        // If unsuccessful, log an error
        console.error("Failed to like discussion:", response.data.mMessage);
      }
    } catch (error) {
      // If an error occurs during the request, log the error
      console.error("Error liking discussion:", error);
    }
  };

  // Render a button with an onClick event listener to trigger the handleLike function
  return (
    <button onClick={handleLike}>
      <FaThumbsUp /> {likes}
    </button>
  );
}

// Export the LikeButton component as default
export default LikeButton;
