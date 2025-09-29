import type { ProjectItem } from '@/contexts/project/types';
import { TableCell } from '../ui/table';
import { formatDate } from '@/lib/utils';
import type { FC } from 'react';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DateCellProps = {
  date: string;
  isEditing: boolean;
  draft: Partial<Omit<ProjectItem, 'id'>>;
  setDraft: React.Dispatch<React.SetStateAction<Partial<Omit<ProjectItem, 'id'>>>>;
};
export const DateCell: FC<DateCellProps> = ({ date, isEditing, setDraft, draft }) => {
  const handleChange = (newDate: Date) => {
    console.log('🚀 ~ newDate:', newDate);
    setDraft((prev) => ({ ...prev, date: newDate.toISOString() }));
  };

  return (
    <TableCell className="align-middle">
      {!isEditing ? (
        <span className="font-medium">{formatDate(date)}</span>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground h-6 justify-start text-left font-normal"
            >
              {draft.date ? formatDate(draft.date) : <span>Pick a date</span>}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" required selected={new Date(date)} onSelect={handleChange} />
          </PopoverContent>
        </Popover>
      )}
    </TableCell>
  );
};
