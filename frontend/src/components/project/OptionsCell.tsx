import { Trash2, Edit, Save, X } from 'lucide-react';
import { TableCell } from '../ui/table';

type Props = {
  handleDelete: () => void;
  isEditing: boolean;
  toggleIsEditing: () => void;
  handleSave: () => void;
  handleCancel: () => void;
};
export const OptionsCell = ({
  handleDelete,
  isEditing,
  toggleIsEditing,
  handleSave,
  handleCancel,
}: Props) => {
  return (
    <TableCell className="align-middle">
      {isEditing ? (
        <div className="flex justify-evenly">
          <Save className="cursor-pointer" onClick={handleSave} size={18} />
          <X className="cursor-pointer" onClick={handleCancel} size={18} />
        </div>
      ) : (
        <div className="flex justify-evenly">
          <Trash2 className="cursor-pointer" onClick={handleDelete} size={18} />
          <Edit className="cursor-pointer" onClick={toggleIsEditing} size={18} />
        </div>
      )}
    </TableCell>
  );
};
