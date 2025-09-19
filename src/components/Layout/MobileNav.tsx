import React from 'react';
import { LayoutDashboard, MessageSquare, ClipboardList, Bell, Settings } from 'lucide-react';
interface MobileNavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}
export const MobileNav = ({
  currentPage,
  setCurrentPage
}: MobileNavProps) => {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  }, {
    id: 'symptoms',
    label: 'Symptoms',
    icon: <ClipboardList size={20} />
  }, {
    id: 'coach',
    label: 'Coach',
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
  return <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md">
      <div className="flex justify-around">
        {navItems.map(item => <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`flex flex-col items-center py-3 px-4 ${currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>)}
      </div>
    </div>;
};