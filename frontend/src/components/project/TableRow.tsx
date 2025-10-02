import { TableRow as TRow } from '@/components/ui/table';

import { NameCell } from './NameCell';
import { DateCell } from './DateCell';
import { OptionsCell } from './OptionsCell';
import { CurrencyCell } from './CurrencyCell';
import { useState } from 'react';
import type { ProjectItem } from '@/contexts/project/types';
import { useProjects } from '@/contexts/project';
import { useParams } from 'react-router-dom';
import { Currencies } from '@/lib/enums';

type Props = {
  item: ProjectItem;
  handleDelete: () => void;
};

export const TableRow = ({ item, handleDelete }: Props) => {
  const { id: projectId } = useParams<{ id: string }>();
  const { updateItem } = useProjects();

  const [isEditing, setIsEditing] = useState(false);

  const { id: itemId, ...itemWithoutId } = item;
  const [draft, setDraft] = useState<Partial<Omit<ProjectItem, 'id'>>>(itemWithoutId);

  if (!projectId) {
    return null;
  }

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    updateItem(projectId, itemId, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(itemWithoutId);
    setIsEditing(false);
  };

  return (
    <TRow key={itemId}>
      <NameCell isEditing={isEditing} draft={draft} setDraft={setDraft} />
      <DateCell date={item.date} isEditing={isEditing} draft={draft} setDraft={setDraft} />
      <CurrencyCell
        currency={Currencies.BYN}
        isEditing={isEditing}
        draft={draft}
        setDraft={setDraft}
      />
      <CurrencyCell
        currency={Currencies.USD}
        isEditing={isEditing}
        draft={draft}
        setDraft={setDraft}
      />
      <OptionsCell
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        isEditing={isEditing}
        toggleIsEditing={toggleIsEditing}
      />
    </TRow>
  );
};
