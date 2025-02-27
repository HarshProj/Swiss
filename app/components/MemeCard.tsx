import Image from "next/image";

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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
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
    </div>
  );
};

export default MemeCard;
