import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Load the image URL from local storage on component mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8998/uploadFiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.fileUrl;
      setImageUrl(imageUrl);
      setUploadStatus("File uploaded successfully.");

      // Save the uploaded image URL to local storage
      localStorage.setItem("uploadedImageUrl", imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default FileUpload;
