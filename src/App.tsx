import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

function AppRoutes() {
  const element = useRoutes(routes); // Utilisation des routes définies
  return element;
}

function App() {
  return (
    <MantineProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MantineProvider>
  );
}

export default App;