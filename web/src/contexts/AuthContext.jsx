// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour vérifier si l'utilisateur est déjà connecté au chargement de l'application
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Pour la démo, on vérifie simplement si un token existe dans le localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Dans une vraie application, on vérifierait la validité du token avec le serveur
          // Ici, on simule simplement un utilisateur connecté
          setCurrentUser({
            id: 'admin123',
            name: 'Admin User',
            email: 'admin@peiot.com',
            role: 'admin'
          });
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setError('Erreur lors de la vérification de l\'authentification');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setError(null);
      
      // Dans une vraie application, on enverrait les identifiants au serveur
      // et on récupérerait un token d'authentification
      
      // Pour la démo, on simule une réponse du serveur
      if (email === 'admin@peiot.com' && password === 'password') {
        const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('authToken', fakeToken);
        
        setCurrentUser({
          id: 'admin123',
          name: 'Admin User',
          email: email,
          role: 'admin'
        });
        
        setIsAuthenticated(true);
        return true;
      } else {
        setError('Identifiants invalides');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur lors de la connexion');
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Valeur du contexte
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;