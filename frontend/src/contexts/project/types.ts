export type ProjectType = {
  id: string;
  name: string;
  totalByn: number;
  totalUsd: number;
};

export type ProjectsContext = {
  projects: ProjectType[];
  addProject: (projectName: string) => void;
  deleteProject: (id: string) => void;
};
