import React from 'react';
import { LayoutDashboard, MessageSquare, ClipboardList, Bell, Settings } from 'lucide-react';
interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}
export const Sidebar = ({
  currentPage,
  setCurrentPage
}: SidebarProps) => {
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
  return <div className="h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="text-teal-500" size={28} />
        <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
          BreathGuard
        </span>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map(item => <li key={item.id}>
              <button onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <span className={currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>)}
        </ul>
      </nav>
    </div>;
};