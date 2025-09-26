import { TableBody as TBody, TableCell, TableRow } from '@/components/ui/table';
import type { ProjectItem } from '@/contexts/project/types';

import { Trash2 } from 'lucide-react';

type Props = {
  items: ProjectItem[];
  handleDelete: (itemId: string) => void;
};

export const TableBody = ({ items, handleDelete }: Props) => {
  return (
    <TBody>
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="align-middle">
            <span className="font-medium">{item.name}</span>
          </TableCell>
          <TableCell className="align-middle">
            <span className="font-medium">{item.date}</span>
          </TableCell>
          <TableCell className="align-middle">
            <span className="font-medium">{item.byn}</span>
          </TableCell>
          <TableCell className="align-middle">
            <span className="font-medium">{item.usd}</span>
          </TableCell>
          <TableCell className="align-middle">
            <div>
              <Trash2 className="cursor-pointer" onClick={() => handleDelete(item.id)} size={18} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TBody>
  );
};
