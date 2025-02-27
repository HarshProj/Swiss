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

interface Props {
  initialMemes: Meme[];
}

const ExplorePage = ({ initialMemes }: Props) => {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const [loading, setLoading] = useState(false);

  // Fetch only if initialMemes is empty (prevents hydration errors)
  useEffect(() => {
    if (initialMemes.length === 0) {
      setLoading(true);
      axios.get("https://api.imgflip.com/get_memes").then((res) => {
        setMemes(res.data.data.memes.slice(0, 10));
        setLoading(false);
      });
    }
  }, [initialMemes]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Trending Memes
        </h1>

        {loading && <p className="text-center text-gray-700">Loading memes...</p>}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {memes?.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ✅ Ensuring Type Safety in getServerSideProps
export async function getServerSideProps(): Promise<{ props: { initialMemes: Meme[] } }> {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();

    return {
      props: {
        initialMemes: data.data.memes.slice(0, 10) || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch memes:", error);
    return {
      props: {
        initialMemes: [],
      },
    };
  }
}

export default ExplorePage;
