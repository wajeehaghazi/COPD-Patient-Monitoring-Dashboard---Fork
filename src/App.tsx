import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { DashboardPage } from './components/Dashboard/DashboardPage';
import { SymptomLogPage } from './components/SymptomLog/SymptomLogPage';
import { AIRecommendationsPage } from './components/AIRecommendations/AIRecommendationsPage';
import { AlertsPage } from './components/Alerts/AlertsPage';
import { SettingsPage } from './components/Settings/SettingsPage';
export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'symptoms':
        return <SymptomLogPage />;
      case 'coach':
        return <AIRecommendationsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };
  return <div className={`${darkMode ? 'dark' : ''}`}>
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode}>
        {renderPage()}
      </Layout>
    </div>;
}