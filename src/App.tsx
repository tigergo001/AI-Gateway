/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Models } from './components/Models';
import { Routes as RoutesPage } from './components/Routes';
import { Stats } from './components/Stats';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { ModelDetail } from './components/ModelDetail';
import { LogDetail } from './components/LogDetail';
import { WorkspaceManagement } from './components/WorkspaceManagement';
import { StrategyConfig } from './components/StrategyConfig';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Home />} />
              <Route path="models" element={<Models />} />
              <Route path="model-detail/:id" element={<ModelDetail />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="strategy-config" element={<StrategyConfig />} />
              <Route path="stats" element={<Stats />} />
              <Route path="log-detail/:id" element={<LogDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="workspace" element={<WorkspaceManagement />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
