import React from 'react';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
export const Layout = ({
  children,
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode
}: LayoutProps) => {
  return <div className="flex flex-col h-screen w-full bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100">
      {/* Top Navigation */}
      <div className="w-full">
        <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <main className="container mx-auto max-w-7xl">{children}</main>
      </div>
      {/* Mobile navigation - visible only on mobile */}
      <div className="md:hidden">
        <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>;
};