/**
 * Main component of the application
 * @module App
 * @category Components
 * @author Jeffery Desir
 * @version 1.0.0
 * @see {@link DiscussionForm}
 * @see {@link DiscussionDeleteButton}
 * @see {@link LikeButton}
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import DiscussionForm from "./components/DiscussionForm";
import DiscussionDeleteButton from "./components/DiscussionDeleteButton";
import LikeButton from "./components/LikeButton"; // Importing the LikeButton component

/**
 * Main component of the application
 * @returns {JSX.Element} The main application component
 */
function Home() {
  // State variables
  const [isLoading, setLoading] = useState(true);
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Base URL for API endpoint
  const baseurl = "https://team-dawgs.dokku.cse.lehigh.edu";

  // Fetch discussions data when the component mounts
  useEffect(() => {
    axios
      .get(`${baseurl}/discussions`)
      .then((response) => {
        if (response.data.mStatus === "ok") {
          setDiscussions(response.data.mData);
        } else {
          setError("Failed to fetch discussions");
        }
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
        setError("Failed to fetch discussions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Function to handle successful submission of discussion form
  const handleSuccess = (newDiscussion) => {
    setDiscussions([...discussions, newDiscussion]);
    setError(null);
    setShowForm(false);
  };

  // Function to handle errors during form submission
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  // Function to handle successful deletion of discussion
  const handleDeleteSuccess = () => {
    // Update discussions list after deletion
    // For example: Fetch discussions again or filter out the deleted discussion
    console.log("Discussion deleted successfully");
  };

  // Function to handle errors during deletion of discussion
  const handleDeleteError = (errorMessage) => {
    // Handle deletion error
    console.error("Error deleting discussion:", errorMessage);
    setError(errorMessage);
  };

  // Render loading message while fetching data
  if (isLoading) {
    return (
      <div className="App">
        <h1 className="app-title">The Buzz</h1>
        <p className="app-subtitle">Share ideas here!</p>
        <div>Loading...</div>
      </div>
    );
  }

  // Render the main content once data is loaded
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">The Buzz</h1>
        <p className="app-subtitle">Share ideas here!</p>
        {!showForm && (
          <button
            className="start-discussion-btn"
            onClick={() => setShowForm(true)}
          >
            Start New Discussion
          </button>
        )}
        {showForm && (
          <DiscussionForm onSuccess={handleSuccess} onError={handleError} />
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {/* Render discussions */}
        {discussions.map((discussion, index) => (
          <div className="item discussion-item" key={index}>
            <div>
              <b>Title: </b>
              {discussion.mTitle}
            </div>
            <div>
              <b>Idea: </b>
              {discussion.mContent}
            </div>
            {/* Render DiscussionDeleteButton component */}
            <DiscussionDeleteButton
              discussionId={discussion.mId}
              onDelete={handleDeleteSuccess}
              onError={handleDeleteError}
            />
            {/* Render LikeButton component */}
            <LikeButton discussionId={discussion.mId} />
          </div>
        ))}
      </header>
    </div>
  );
}

// Export the Home component as default
export default Home;
