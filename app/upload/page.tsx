"use client";

import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import axios from "axios";

const UploadMeme = () => {
  // States
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Handle Image Selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Restrict file size to 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB!");
        return;
      }

      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload Meme to Firebase
  const uploadMeme = async () => {
    if (!image) return alert("Please select an image!");

    setUploading(true);
    setProgress(0);
    
    const storageRef = ref(storage, `memes/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed! Please try again.");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadedImageUrl(downloadURL);
        setUploading(false);
        setProgress(100);
        alert("Meme uploaded successfully!");
      }
    );
  };

  // Generate AI Caption
  const generateAICaption = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes"); // Replace with actual AI API
      const randomMeme = res.data.data.memes[Math.floor(Math.random() * res.data.data.memes.length)];
      setGeneratedCaption(randomMeme.name); // Mock AI caption
    } catch (error) {
      console.error("Error generating caption:", error);
      alert("Failed to generate AI caption.");
    }
  };

  // Save Meme Locally
  const handleUpload = () => {
    if (!uploadedImageUrl) return alert("Please upload an image first!");

    const newMeme = { id: Date.now().toString(), url: uploadedImageUrl, caption };
    const uploadedMemes = JSON.parse(localStorage.getItem("uploaded-memes") || "[]");
    uploadedMemes.push(newMeme);
    localStorage.setItem("uploaded-memes", JSON.stringify(uploadedMemes));

    alert("Meme saved locally!");
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Upload a Meme</h1>

      {/* Image Input */}
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="block text-center cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg">
          Choose an Image
        </label>
      </div>

      {/* Preview */}
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-lg mb-4 shadow-md" />
      )}

      {/* Caption Input */}
      <textarea
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
      />

      {/* AI Caption Button */}
      <button onClick={generateAICaption} className="px-3 py-1 bg-green-500 text-white rounded mr-2">
        Generate AI Caption
      </button>
      <p className="text-gray-700 dark:text-gray-300">{generatedCaption}</p>

      {/* Upload Button */}
      <button
        onClick={uploadMeme}
        disabled={uploading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded mt-4 disabled:opacity-50"
      >
        {uploading ? `Uploading... ${Math.round(progress)}%` : "Upload Meme"}
      </button>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full mt-2">
          <div
            className="bg-blue-500 text-xs text-center text-white p-1 rounded-full"
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Save Locally Button */}
      <button
        onClick={handleUpload}
        disabled={!uploadedImageUrl}
        className="w-full px-4 py-2 bg-purple-500 text-white rounded mt-4 disabled:opacity-50"
      >
        Save Meme Locally
      </button>
    </div>
  );
};

export default UploadMeme;
