import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WinterArcProvider } from './context/WinterArcContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import DailyHabitsPage from './pages/DailyHabitsPage';
import CalendarPage from './pages/CalendarPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MonthlyGoalsPage from './pages/MonthlyGoalsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <WinterArcProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="habits" element={<DailyHabitsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="goals" element={<MonthlyGoalsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WinterArcProvider>
  );
}
