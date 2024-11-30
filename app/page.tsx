"use client";

import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(null);
    } else {
      // Handle error: not an image file
    }
  };

  const handleUploadClick = () => {
    if (image) {
      setLoading(true);
      // Simulate processing with a timeout (replace with actual processing logic)
      setTimeout(() => {
        // After processing is done
        setLoading(false);
        setImagePreview(URL.createObjectURL(image));
      }, 2000); // Simulate a 2-second processing time
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} disabled={loading} />
      <button onClick={handleUploadClick} disabled={loading || !image}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      {image && !loading && <p>Selected file: {image.name}</p>}
    </div>
  );
}
