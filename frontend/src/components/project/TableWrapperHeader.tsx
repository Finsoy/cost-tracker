import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
  handleAdd: () => void;
};

export const TableWrapperHeader = ({ handleAdd }: Props) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-medium">Items</h3>
      <Button variant="violet" size="sm" onClick={handleAdd}>
        <Plus /> Add
      </Button>
    </div>
  );
};
