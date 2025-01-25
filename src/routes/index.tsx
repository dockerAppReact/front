import { lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute'; // Importation du composant de route protégée

// Pages de l'application (chargement dynamique via React.lazy)
const Register = lazy(() => import('../pages/register'));  // Page d'inscription
const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/index'));

// Définition des routes
const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>, // Protégé par l'authentification
  },
];

export default routes;