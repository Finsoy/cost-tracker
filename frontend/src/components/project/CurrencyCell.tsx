import type { ProjectItem } from '@/contexts/project/types';
import { TableCell } from '@/components/ui/table';
import type { FC } from 'react';
import { Input } from '@/components/ui/input';
import type { Currencies } from '@/lib/enums';

type CurrencyCellProps = {
  currency: Currencies;
  isEditing: boolean;
  draft: Partial<Omit<ProjectItem, 'id'>>;
  setDraft: React.Dispatch<React.SetStateAction<Partial<Omit<ProjectItem, 'id'>>>>;
};
export const CurrencyCell: FC<CurrencyCellProps> = ({ currency, isEditing, setDraft, draft }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({ ...prev, [currency]: Number(event.target.value) }));
  };

  return (
    <TableCell className="align-middle">
      {!isEditing ? (
        <span className="font-medium">{draft[currency]}</span>
      ) : (
        <Input
          id={currency}
          className="h-6"
          type="text"
          value={draft[currency]}
          onChange={handleChange}
        />
      )}
    </TableCell>
  );
};
