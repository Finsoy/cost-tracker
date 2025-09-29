import { Input } from '@/components/ui/input';

import { TableCell } from '../ui/table';
import type { ProjectItem } from '@/contexts/project/types';

type Props = {
  isEditing: boolean;
  draft: Partial<Omit<ProjectItem, 'id'>>;
  setDraft: React.Dispatch<React.SetStateAction<Partial<Omit<ProjectItem, 'id'>>>>;
};

export const NameCell = ({ isEditing, draft, setDraft }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({ ...prev, name: event.target.value }));
  };

  return (
    <TableCell className="align-middle">
      {!isEditing ? (
        <span className="font-medium">{draft.name}</span>
      ) : (
        <Input id="name" className="h-6" type="text" value={draft.name} onChange={handleChange} />
      )}
    </TableCell>
  );
};
