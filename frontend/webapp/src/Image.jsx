import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploaded, setUploaded] = useState(false); // State to track if file has been uploaded

  // Load the image URL from local storage on component mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
      setUploaded(true); // Set uploaded to true if image URL exists in local storage
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
      setUploaded(true); // Set uploaded to true after successful upload

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
      <input type="file" onChange={handleFileChange} disabled={uploaded} />
      <button onClick={handleUpload} disabled={!selectedFile || uploaded}>
        Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default FileUpload;
