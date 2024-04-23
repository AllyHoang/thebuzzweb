/**
 * React component for creating discussions
 * @module DiscussionForm
 * @category Components
 * @param {Object} props - The component props
 * @param {Function} props.onSuccess - Callback function invoked upon successful discussion creation
 * @param {Function} props.onError - Callback function invoked upon discussion creation error
 * @returns {JSX.Element} A form to create discussions
 */
import React, { useState } from "react";
import axios from "axios";

function DiscussionForm({ onSuccess, onError }) {
  // State variables for title and message of the discussion
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to create a new discussion
      const response = await axios.post(
        "https://team-dawgs.dokku.cse.lehigh.edu/discussions",
        {
          mTitle: title,
          mMessage: message
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );

      // Check if the request was successful
      if (response.status === 200 && response.data.mStatus === "ok") {
        // If successful, call onSuccess callback function to notify parent component
        onSuccess(response.data);
        // Reset title and message fields
        setTitle("");
        setMessage("");
      } else {
        // If unsuccessful, call onError callback function with error message
        onError(response.data.mMessage || "Failed to create discussion");
      }
    } catch (error) {
      // If an error occurs during the request, log the error and call onError callback
      console.error("Error creating discussion:", error);
      onError(error.message || "Failed to create discussion");
    }
  };

  // Render a form with input fields for title and message, and a submit button
  return (
    <form onSubmit={handleSubmit} className="discussion-form">
      <div>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Idea: </label>
        <textarea
          name="body"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

// Export the DiscussionForm component as default
export default DiscussionForm;
