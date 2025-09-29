import { TableBody as TBody } from '@/components/ui/table';
import type { ProjectItem } from '@/contexts/project/types';

import { TableRow } from './TableRow';

type Props = {
  items: ProjectItem[];
  handleDelete: (itemId: string) => void;
};

export const TableBody = ({ items, handleDelete }: Props) => {
  return (
    <TBody>
      {items.map((item) => (
        <TableRow item={item} handleDelete={() => handleDelete(item.id)} />
      ))}
    </TBody>
  );
};
