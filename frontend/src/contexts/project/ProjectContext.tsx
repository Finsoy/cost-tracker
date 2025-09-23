import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import { type ProjectsContext, type ProjectType } from './types';
import { v4 as uuid } from 'uuid';

const ProjectsContext = createContext<ProjectsContext | undefined>(undefined);

export const ProjectsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const addProject: ProjectsContext['addProject'] = (projectName) => {
    const newProject: ProjectType = { name: projectName, totalByn: 0, totalUsd: 0, id: uuid() };
    setProjects((prev) => [...prev, newProject]);
  };
  const deleteProject: ProjectsContext['deleteProject'] = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);

  if (!ctx) throw new Error('useProject must be inside ProjectProvider');
  return ctx;
};
