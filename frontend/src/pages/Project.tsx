import { useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/project/ProjectContext';

export const Project = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);
  return (
    <>
      {!project ? (
        <div>
          <h2 className="text-xl font-semibold">Project not found</h2>
          <p className="text-muted-foreground">
            Check the URL or select a project from the sidebar.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="grid gap-2">
            <p>Total BYN: {project.totalByn}</p>
            <p>Total USD: {project.totalUsd}</p>
          </div>
        </div>
      )}
    </>
  );
};
