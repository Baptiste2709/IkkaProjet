// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/ADminPage';
import SensorsPage from './pages/SensorsPage';
import UsersPage from './pages/UsersPage.jsx';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

// Context (pour la gestion de l'authentification)
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique pour la connexion */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Routes protégées avec le layout du dashboard */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/sensors" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SensorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UsersPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AlertsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;