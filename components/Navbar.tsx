import { useDarkMode } from "../context/DarkModeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className={`p-4 ${darkMode?"bg-gray-200":"dark:bg-gray-900"} ${darkMode?"text-gray-900":"dark:text-white"} flex justify-between items-center shadow-md`}>
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">MemeVerse</Link>

      {/* Navigation Links */}
      <div className={`space-x-4 flex items-center `}>
        <Link href="/explore" className="">Explore</Link>
        <Link href="/upload" className="">Upload</Link>
        <Link href="/profile" className="">Profile</Link>
        <Link href="/leaderboard" className="text-gray-700 dark:text-yellow-400 font-bold">🏆 Leaderboard</Link>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 cursor-pointer rounded-full ${!darkMode?"bg-gray-200 dark:bg-gray-700":"bg-gray-700 dark:bg-gray-200"}`}
        >
          {darkMode ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-900" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
