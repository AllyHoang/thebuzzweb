import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function LogInPage() {
  const [user, setUser] = useState(null);

  function handleCallbackResponse(response) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://team-dawgs.dokku.cse.lehigh.edu/tokensignin");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      // Handle response from the server
      console.log("Server response: " + xhr.responseText);

      // Parse the response as JSON
      var userData = JSON.parse(xhr.responseText);

      // Update the user state with the received data
      setUser(userData.userId);

      // Redirect to uploadFile page
      <Navigate to="/uploadFile" replace />;
    };
    xhr.send(response.credential);
    console.log(response.credential);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "847429488383-7as0v0or83kv2j8m9ahi14jsie2htmon.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="LogInPage">
      <div id="signInDiv"></div>
    </div>
  );
}

export default LogInPage;
