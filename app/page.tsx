"use client"; // Ensures client-side rendering
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MemeCard from "../components/MemeCard";
import Navbar from "../components/Navbar";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

const ExplorePage = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);

  const { darkMode, toggleDarkMode } = useDarkMode();
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(res.data.data.memes.slice(0, 10));
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode?"text-gray-900":"dark:text-white"} ${darkMode?"bg-gray-200":"dark:bg-gray-900"}`}>
      <Navbar />
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-4xl font-bold text-center ">
          Trending Memes
        </h1>

        {loading && <p className="text-center text-gray-700">Loading memes...</p>}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExplorePage;
