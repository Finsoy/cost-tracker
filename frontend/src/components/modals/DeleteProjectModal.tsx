import { Trash2Icon } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';
type Props = {
  handleDelete?: () => void;
};

export const DeleteProjectModal = ({ handleDelete }: Props) => {
  return (
    <ConfirmationModal
      trigger={<Trash2Icon size={18} />}
      triggerClassName="justify-self-end"
      title="Delete this project?"
      confirmButtonText="Delete"
      rejectButtonText="Cancel"
      handleConfirm={handleDelete}
    />
  );
};
