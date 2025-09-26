import type { Maybe } from '@/lib/types';

export type ProjectItem = {
  id: string;
  name: string;
  date: string; // ISO string
  byn: number;
  usd: number;
};

export type ProjectType = {
  id: string;
  name: string;
  totalByn: number;
  totalUsd: number;
  items: ProjectItem[];
};

export type ProjectsContext = {
  projects: ProjectType[];
  addProject: (projectName: string) => void;
  deleteProject: (id: string) => void;
  addItem: (projectId: Maybe<string>, newItem: Partial<Omit<ProjectItem, 'id'>>) => void;
  getProjectById: (id: Maybe<string>) => Maybe<ProjectType>;
  deleteItem: (projectId: Maybe<string>, itemId: Maybe<string>) => void;
};
