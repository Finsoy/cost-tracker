import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './contexts/auth/';
import { ProjectsProvider } from './contexts/project/ProjectContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </StrictMode>,
);
