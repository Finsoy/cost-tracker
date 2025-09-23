import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useProjects } from '@/contexts/project/ProjectContext';
import { useState } from 'react';

export const CreateProjectModal = () => {
  const { addProject } = useProjects();

  const [value, setValue] = useState('');

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleAddProject = () => {
    if (!value.trim()) return;
    addProject(value);
    setValue('');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-start justify-start bg-violet px-3 py-2">
        <PlusIcon />
        Create new Project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Project name</AlertDialogTitle>
          <AlertDialogDescription>
            <Input id="name" type="text" value={value} onChange={handleValueChange} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddProject}>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
