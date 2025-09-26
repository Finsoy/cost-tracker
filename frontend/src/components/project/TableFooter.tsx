import { TableRow, TableFooter as TFooter, TableCell } from '../ui/table';

type Props = {
  totalByn: number;
  totalUsd: number;
};

export const TableFooter = ({ totalByn, totalUsd }: Props) => {
  return (
    <TFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell>{totalByn}</TableCell>
        <TableCell>{totalUsd}</TableCell>
        <TableCell />
      </TableRow>
    </TFooter>
  );
};
