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

export const CreateProjectModal = () => {
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
            <Input id="name" type="text" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
