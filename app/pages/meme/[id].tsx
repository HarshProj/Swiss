import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const MemeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [meme, setMeme] = useState<any>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`https://api.imgflip.com/get_memes`).then((res) => {
        const foundMeme = res.data.data.memes.find((m: any) => m.id === id);
        setMeme(foundMeme);
      });
    }
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!meme) return <p>Loading...</p>;

    const newLikes = likes + 1;
  setLikes(newLikes);
  localStorage.setItem(`likes-${id}`, newLikes.toString());

  // Store liked meme in local storage
  const likedMemes = JSON.parse(localStorage.getItem("liked-memes") || "[]");
  if (!likedMemes.find((meme: any) => meme.id === id)) {
    likedMemes.push(meme);
    localStorage.setItem("liked-memes", JSON.stringify(likedMemes));
  }

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
