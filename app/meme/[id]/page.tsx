"use client";

import { useParams} from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";

interface Meme {
  id: string;
  name: string;
  url: string;
}

const MemeDetails = () => {
  const params = useParams();
  const memeId = params.id; // ✅ Get `id` safely from URL query params
  console.log("memeId", memeId);
  const [meme, setMeme] = useState<Meme | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!memeId) return;

    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      const foundMeme = res.data.data.memes.find((m: Meme) => m.id === memeId);
      setMeme(foundMeme || null);
    });

    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem(`likes-${memeId}`);
      if (savedLikes) {
        setLikes(parseInt(savedLikes, 10));
      }

      const savedComments = JSON.parse(localStorage.getItem(`comments-${memeId}`) || "[]");
      setComments(savedComments);
    }
  }, [memeId]);

  const handleLike = () => {
    if (!memeId) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${memeId}`, newLikes.toString());

    const likedMemes: Meme[] = JSON.parse(localStorage.getItem("liked-memes") || "[]");
    if (!likedMemes.some((meme) => meme.id === memeId)) {
      likedMemes.push(meme!);
      localStorage.setItem("liked-memes", JSON.stringify(likedMemes));
    }
  };

  const handleComment = () => {
    if (!memeId || newComment.trim() === "") return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment("");

    localStorage.setItem(`comments-${memeId}`, JSON.stringify(updatedComments));
  };

  if (!meme) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{meme.name}</h1>
      <img src={meme.url} alt={meme.name} className="w-full h-auto rounded-lg mt-4" />
      <button onClick={handleLike} className="px-3 py-1 bg-red-500 text-white rounded mt-4">
        ❤️ {likes}
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Comments</h3>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <button onClick={handleComment} className="px-3 py-1 bg-blue-500 text-white rounded mt-2">
          Add Comment
        </button>
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="p-2 border-b">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemeDetails;
