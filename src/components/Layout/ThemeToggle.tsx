import React from 'react';
import { Moon, Sun } from 'lucide-react';
interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
export const ThemeToggle = ({
  darkMode,
  setDarkMode
}: ThemeToggleProps) => {
  return <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>;
};