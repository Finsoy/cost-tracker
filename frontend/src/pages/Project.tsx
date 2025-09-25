import { useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/project/ProjectContext';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Project = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div>
        <h2 className="text-xl font-semibold">Project not found</h2>
        <p className="text-muted-foreground">Check the URL or select a project from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <div className="grid gap-2">
        <p>Total BYN: {project.totalByn}</p>
        <p>Total USD: {project.totalUsd}</p>
      </div>

      <div className="w-2xl mx-auto mt-5 border-1 border-solid  rounded-lg p-10 ">
        <Table className="text-base text-neutral-300">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
