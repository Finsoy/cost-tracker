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

  const updateProject = (projectId: string, payload: Partial<Omit<ProjectType, 'id'>>) => {
    setProjects((prev) => {
      return prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return { ...proj, ...payload };
      });
    });
  };

  const addItem: ProjectsContext['addItem'] = (projectId, newItem) => {
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

  const updateItem: ProjectsContext['updateItem'] = (projectId, itemId, payload) => {
    const project = getProjectById(projectId);
    if (!project) return;

    const updatedItems = project.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...payload };
      } else {
        return item;
      }
    });

    const { totalByn, totalUsd } = calculateTotals(updatedItems);

    updateProject(projectId, { items: updatedItems, totalByn, totalUsd });
  };

  const getProjectById: ProjectsContext['getProjectById'] = (id) => {
    return projects.find((proj) => proj.id === id);
  };

  const deleteItem: ProjectsContext['deleteItem'] = (projectId, itemId) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const updatedItems = (proj.items || []).filter((item) => item.id !== itemId);
          const { totalByn, totalUsd } = calculateTotals(updatedItems);
          return { ...proj, items: updatedItems, totalByn, totalUsd };
        } else {
          return proj;
        }
      }),
    );
  };

  const calculateTotals = (items: ProjectItem[]) => {
    const totalByn = items.reduce((acc, item) => acc + item.byn, 0);
    const totalUsd = items.reduce((acc, item) => acc + item.usd, 0);
    return { totalByn, totalUsd };
  };

  // const recomputeTotal = (projectId: string): void => {
  //   const project = getProjectById(projectId);
  //   if (!project) return;

  //   const { totalByn, totalUsd } = calculateTotals(project.items);
  //   updateProject(projectId, { totalByn, totalUsd });
  // };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        addItem,
        getProjectById,
        deleteItem,
        updateItem,
      }}
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
