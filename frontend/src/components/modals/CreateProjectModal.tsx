import { PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useProjects } from '@/contexts/project/ProjectContext';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

export const CreateProjectModal = () => {
  const { addProject } = useProjects();

  const [value, setValue] = useState('');

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAddProject = () => {
    if (!value.trim()) return;
    addProject(value);
    setValue('');
  };
  return (
    <ConfirmationModal
      trigger={
        <>
          <PlusIcon />
          Create new Project
        </>
      }
      triggerClassName="flex items-start justify-start bg-violet px-3 py-2"
      title="Project Name"
      description={<Input id="name" type="text" value={value} onChange={handleValueChange} />}
      confirmButtonText="Create"
      rejectButtonText="Cancel"
      handleConfirm={handleAddProject}
    />
  );
};
