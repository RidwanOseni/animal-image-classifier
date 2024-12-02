"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<{
    classification: string;
    description: string;
    isDangerous: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setResult(null); // Clear previous result when a new image is selected
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleUploadClick = async () => {
    if (image) {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("file", image);

      try {
        const response = await fetch("/api/classify", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Image classification failed.");
        }

        const data = await response.json();
        setResult(data);
      } catch (error: any) {
        console.error("Error:", error);
        alert(error.message || "An error occurred while processing the image.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#FFFFFF",
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#90CAF9" }}>🐾 Animal Image Classifier</h1>
      <p style={{ color: "#B0BEC5" }}>
        Upload an image of an animal to classify it and learn more about it!
      </p>

      <div style={{ margin: "20px 0" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
          style={{
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            padding: "10px",
            border: "1px solid #90CAF9",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        />
      </div>

      <button
        onClick={handleUploadClick}
        disabled={loading || !image}
        style={{
          backgroundColor: loading ? "#757575" : "#90CAF9",
          color: "#FFFFFF",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {loading ? "Processing..." : "Upload and Analyze Image"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#1E1E1E",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
            margin: "30px auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ color: "#FFCC80" }}>Classification Result:</h2>
          <p>{result.classification}</p>

          <h2 style={{ color: "#FFCC80" }}>Description from Wikipedia:</h2>
          <p>{result.description}</p>

          <h2 style={{ color: "#FFCC80" }}>Is this animal dangerous?</h2>
          <p
            style={{
              fontWeight: "bold",
              color: result.isDangerous ? "#FF5252" : "#81C784",
            }}
          >
            {result.isDangerous
              ? "Yes, it is dangerous."
              : "No, it is not dangerous."}
          </p>
        </div>
      )}
    </div>
  );
}
