import React, { useState } from 'react';
import { Save, User, Bell, Shield, Phone } from 'lucide-react';
export const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [darkModePreference, setDarkModePreference] = useState('system');
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Settings
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <User className="mr-2" size={20} />
          Profile Information
        </h3>
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input type="text" id="first-name" defaultValue="John" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="last-name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input type="text" id="last-name" defaultValue="Doe" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input type="email" id="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <Bell className="mr-2" size={20} />
          Notifications
        </h3>
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Enable Notifications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive alerts for critical health events
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Data Sharing
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your health data with your healthcare provider
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dataSharing} onChange={() => setDataSharing(!dataSharing)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <Shield className="mr-2" size={20} />
          Emergency Contacts
        </h3>
        <div className="space-y-4 max-w-2xl">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Dr. Sarah Johnson
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primary Care Physician
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  (555) 123-4567
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Mary Doe
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Emergency Contact (Spouse)
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  (555) 987-6543
                </p>
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            + Add another contact
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors flex items-center">
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>;
};