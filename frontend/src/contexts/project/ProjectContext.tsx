import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import { type ProjectsContext, type ProjectType, type ProjectItem } from './types';
import { v4 as uuid } from 'uuid';

const ProjectsContext = createContext<ProjectsContext | undefined>(undefined);

export const ProjectsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const addProject: ProjectsContext['addProject'] = (projectName) => {
    const newProject: ProjectType = {
      id: uuid(),
      name: projectName,
      totalByn: 0,
      totalUsd: 0,
      items: [],
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const deleteProject: ProjectsContext['deleteProject'] = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  const addItem: ProjectsContext['addItem'] = (projectId, newItem) => {
    const project = getProjectById(projectId);
    console.log('🚀 ~ project:', project);

    setProjects((prev) => {
      return prev.map((proj) => {
        if (proj.id === projectId) {
          const newItems = [...(proj.items || []), { ...newItem, id: uuid() }] as ProjectItem[];
          return { ...proj, items: newItems } as ProjectType;
        } else {
          return proj;
        }
      });
    });
  };

  const getProjectById: ProjectsContext['getProjectById'] = (id) => {
    return projects.find((proj) => proj.id === id);
  };

  const deleteItem: ProjectsContext['deleteItem'] = (projectId, itemId) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const newItems = (proj.items || []).filter((item) => item.id !== itemId);
          return { ...proj, items: newItems };
        } else {
          return proj;
        }
      }),
    );
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, deleteProject, addItem, getProjectById, deleteItem }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);

  if (!ctx) throw new Error('useProject must be inside ProjectProvider');
  return ctx;
};
