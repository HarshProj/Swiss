"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchMemes } from "../utils/fetchMemes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useDarkMode } from "@/context/DarkModeContext";
interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  likes?: number;
  comments?: number;
}

const ExplorePage = () => {
  const { darkMode } = useDarkMode();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [sortOption, setSortOption] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");

  // Load stored likes/comments from localStorage
  useEffect(() => {
    const storedMemes = memes.map((meme) => ({
      ...meme,
      likes: parseInt(localStorage.getItem(`likes-${meme.id}`) || "0"),
      comments: JSON.parse(localStorage.getItem(`comments-${meme.id}`) || "[]").length,
    }));
    setMemes(storedMemes);
  }, []);

  // Sort memes based on likes or comments
  const sortedMemes = [...memes].sort((a, b) => {
    if (sortOption === "likes") return (b.likes || 0) - (a.likes || 0);
    if (sortOption === "comments") return (b.comments || 0) - (a.comments || 0);
    return 0;
  });

  // Filter memes based on search query
  const filteredMemes = sortedMemes.filter((meme) =>
    meme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load memes with infinite scroll
  useEffect(() => {
    const loadMemes = async () => {
      setLoading(true);
      const newMemes = await fetchMemes(page);
      
      // Ensure unique memes
      setMemes((prev) => {
        const uniqueMemes = new Map(prev.map((meme) => [meme.id, meme]));
        newMemes.forEach((meme:any) => uniqueMemes.set(meme.id, meme));
        return Array.from(uniqueMemes.values());
      });

      setLoading(false);
    };

    loadMemes();
  }, [page]);

  // Infinite Scroll Observer
  const lastMemeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Share meme function (copies individual meme link)
  const shareMeme = (memeId: string) => {
    const url = `${window.location.origin}/meme/${memeId}`;
    navigator.clipboard.writeText(url);
    alert("Meme link copied to clipboard!");
  };

  return (<>
<div className="drop-shadow-md">

      <Navbar/>
</div>
    <div className={`min-h-screen ${darkMode?"text-gray-900":"dark:text-white"} ${darkMode?"bg-gray-200":"dark:bg-gray-900"} p-8`}>
      <h1 className={`${darkMode?"text-gray-900":"dark:text-white"} text-3xl font-bold text-center`}>Explore Memes</h1>

      {/* Search & Sorting */}
      <div className={`flex justify-between items-center mb-4 ${darkMode?"text-gray-900":"dark:text-white"}`}>
        <input
          type="text"
          placeholder="Search memes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`p-2 border rounded-lg ${!darkMode?"dark:bg-gray-700 dark:text-white":"bg-gray-200 text-gray-900"}`}
          />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={`p-2 border rounded-lg ${!darkMode?"bg-white dark:bg-gray-700 dark:text-white":"bg-gray-200 text-gray-900"}`}
        >
          <option value="new">New</option>
          <option value="likes">Most Liked</option>
          <option value="comments">Most Commented</option>
        </select>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredMemes.map((meme, index) => (
          <motion.div
          key={meme.id}
          ref={index === filteredMemes.length - 1 ? lastMemeRef : null}
          className={` ${darkMode?"bg-white ":"dark:bg-gray-800"} p-4  rounded-lg shadow-md`}
          whileHover={{ scale: 1.05 }}
          >
            <Link href={`/meme/${meme.id}`}>
              <h2 className={`${darkMode?"text-gray-900":"dark:text-white"} text-lg font-bold cursor-pointer hover:underline`}>
                {meme.name}
              </h2>
              <Image
                src={meme.url}
                alt={meme.name}
                width={meme.width}
                height={meme.height}
                className={`${darkMode?"rounded mt-2":"rounded mt-2 dark:text-white"} w-full h-[500px] object-cover`}
              />
            </Link>

            {/* Share Button */}
            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => shareMeme(meme.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                📢 Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
    </div>
                </>
  );
};

export default ExplorePage;
