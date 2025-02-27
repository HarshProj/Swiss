"use client"; // Ensure this is a client-only component

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null); // null to prevent SSR mismatch

  useEffect(() => {
    // ✅ Ensure this runs only on client after hydration
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode === null) return; // Prevent interaction before state initializes
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  if (darkMode === null) {
    return null; // 🚀 Avoid rendering mismatched HTML
  }

  return (
    <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
