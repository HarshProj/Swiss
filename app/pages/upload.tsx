import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import axios from "axios";

const UploadMeme = () => {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // Store the uploaded image URL

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadMeme = async () => {
    if (!image) return alert("Please select an image!");

    setUploading(true);
    const storageRef = ref(storage, `memes/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setUploadedImageUrl(downloadURL); // ✅ Save the uploaded image URL
        setUploading(false);
        alert("Meme uploaded successfully!");
      }
    );
  };

  const generateAICaption = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes"); // Replace with AI caption API
      const randomMeme = res.data.data.memes[Math.floor(Math.random() * res.data.data.memes.length)];
      setGeneratedCaption(randomMeme.name); // Mock AI caption
    } catch (error) {
      console.error("Error generating caption:", error);
    }
  };

  const handleUpload = () => {
    if (!uploadedImageUrl) return alert("Please upload an image first!"); // Ensure image is uploaded

    const newMeme = { id: Date.now().toString(), url: uploadedImageUrl };
    const uploadedMemes = JSON.parse(localStorage.getItem("uploaded-memes") || "[]");
    uploadedMemes.push(newMeme);
    localStorage.setItem("uploaded-memes", JSON.stringify(uploadedMemes));
    alert("Meme saved locally!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Upload a Meme</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-lg mb-4" />}
      <textarea
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={generateAICaption} className="px-3 py-1 bg-green-500 text-white rounded mr-2">
        Generate AI Caption
      </button>
      <p className="text-gray-700">{generatedCaption}</p>
      <button onClick={uploadMeme} disabled={uploading} className="px-4 py-2 bg-blue-500 text-white rounded mt-4">
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>
      <button onClick={handleUpload} disabled={!uploadedImageUrl} className="px-4 py-2 bg-purple-500 text-white rounded mt-4 ml-2">
        Save Meme Locally
      </button>
    </div>
  );
};

export default UploadMeme;
