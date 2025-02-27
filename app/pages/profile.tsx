import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchMemes } from "@/utils/fetchMemes";

const Profile = () => {
  // State for user details
  const [name, setName] = useState("Meme Enthusiast");
  const [bio, setBio] = useState("I love memes!");
  const [profilePic, setProfilePic] = useState("/default-avatar.png");

  // State for uploaded and liked memes
  const [uploadedMemes, setUploadedMemes] = useState<any[]>([]);
  const [likedMemes, setLikedMemes] = useState<any[]>([]);

  useEffect(() => {
    // Load user data from local storage
    const storedName = localStorage.getItem("user-name");
    const storedBio = localStorage.getItem("user-bio");
    const storedProfilePic = localStorage.getItem("user-profile-pic");
    const storedLikedMemes = JSON.parse(localStorage.getItem("liked-memes") || "[]");
    const storedUploadedMemes = JSON.parse(localStorage.getItem("uploaded-memes") || "[]");

    if (storedName) setName(storedName);
    if (storedBio) setBio(storedBio);
    if (storedProfilePic) setProfilePic(storedProfilePic);
    setLikedMemes(storedLikedMemes);
    setUploadedMemes(storedUploadedMemes);
  }, []);

  // Save user data
  const saveProfile = () => {
    localStorage.setItem("user-name", name);
    localStorage.setItem("user-bio", bio);
    localStorage.setItem("user-profile-pic", profilePic);
    alert("Profile updated!");
  };

  // Handle profile picture change
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePic(result);
        localStorage.setItem("user-profile-pic", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold dark:text-white">Your Profile</h1>

        {/* Profile Picture */}
        <div className="flex items-center mt-4">
          <Image src={profilePic} alt="Profile" width={80} height={80} className="rounded-full" />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} className="ml-4" />
        </div>

        {/* Edit Name & Bio */}
        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button onClick={saveProfile} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save Profile
        </button>

        {/* Uploaded Memes */}
        <div className="mt-6">
          <h2 className="text-lg font-bold dark:text-white">Your Uploaded Memes</h2>
          {uploadedMemes.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-3">
              {uploadedMemes.map((meme, index) => (
                <Image key={index} src={meme.url} alt="Meme" width={150} height={150} className="rounded" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You haven't uploaded any memes yet.</p>
          )}
        </div>

        {/* Liked Memes */}
        <div className="mt-6">
          <h2 className="text-lg font-bold dark:text-white">Your Liked Memes</h2>
          {likedMemes.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-3">
              {likedMemes.map((meme, index) => (
                <Image key={index} src={meme.url} alt="Meme" width={150} height={150} className="rounded" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You haven't liked any memes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
