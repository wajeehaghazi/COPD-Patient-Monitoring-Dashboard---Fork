import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, ClipboardList, Bell, Settings, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
interface TopNavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
export const TopNav = ({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode
}: TopNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  }, {
    id: 'symptoms',
    label: 'Symptom Log',
    icon: <ClipboardList size={20} />
  }, {
    id: 'coach',
    label: 'AI Coach',
    icon: <MessageSquare size={20} />
  }, {
    id: 'alerts',
    label: 'Alerts',
    icon: <Bell size={20} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />
  }];
  return <>
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-800 dark:to-teal-700 shadow-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="text-white" size={28} />
                <span className="font-bold text-xl text-white">
                  BreathGuard
                </span>
              </div>
            </div>
            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map(item => <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${currentPage === item.id ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>)}
              </div>
            </div>
            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-full text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => <button key={item.id} onClick={() => {
          setCurrentPage(item.id);
          setMobileMenuOpen(false);
        }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                <span className={currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>)}
          </div>
        </div>}
    </>;
};