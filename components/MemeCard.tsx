import Image from "next/image";

import { useDarkMode } from "../context/DarkModeContext";
import { motion } from "framer-motion";
interface MemeProps {
  meme: {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
  };
}

const MemeCard: React.FC<MemeProps> = ({ meme }) => {
  
  const { darkMode } = useDarkMode();
  return (
    <motion.div className={` ${darkMode?"bg-white":"bg-gray-800"} rounded-lg shadow-lg p-4`}
    whileHover={{ scale: 1.05 }}>
      <h2 className={`text-lg font-bold  ${darkMode?"text-gray-900":"dark:text-white"}`}>
        {meme.name}
      </h2>
      {/* ✅ Use Next.js Image for optimization */}
      <Image
        src={meme.url}
        alt={meme.name}
        width={meme.width}
        height={meme.height}
        className="rounded-lg"
        priority // Ensures proper SSR loading
      
      />
    </motion.div>
  );
};

export default MemeCard;
