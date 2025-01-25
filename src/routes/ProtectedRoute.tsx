import { useAuth } from '../context/AuthContect'; // Hook pour obtenir l'état d'authentification
import { useNavigate } from 'react-router-dom'; // Pour rediriger
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode; // Type pour `children`
}

// Composant qui protège les routes
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth() || { isAuthenticated: false }; // Récupère l'état d'authentification
  const navigate = useNavigate(); // Pour la redirection

  useEffect(() => {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirige vers /login
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Si l'utilisateur est authentifié, on affiche la route protégée
  if (isAuthenticated) {
    return children;
  }

  // Sinon, on retourne null, le composant ne sera pas rendu tant que l'utilisateur n'est pas authentifié
  return null;
};