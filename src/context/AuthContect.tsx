import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, removeAuthToken } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Rediriger si l'utilisateur tente d'accéder à une page protégée
      const publicPages = ['/login', '/register'];
      if (!publicPages.includes(router.pathname)) {
        router.push('/login');
      }
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    removeAuthToken(); // Supprimer le token
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
