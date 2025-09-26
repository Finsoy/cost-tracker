import { useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/project/ProjectContext';
import { useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar as CalendarIcon, Edit, Save, X, Trash2, Plus } from 'lucide-react';
import { TableWrapperHeader } from './TableWrapperHeader';
import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';

export const ProjectTable = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const { addItem, getProjectById, deleteItem } = useProjects();

  const project = getProjectById(projectId);

  if (!project) return null;

  const handleAdd = () => {
    const todayIso = new Date().toISOString();
    addItem(projectId, { date: todayIso, name: 'New item', byn: 0, usd: 0 });
  };

  const handleDelete = (itemId: string) => {
    deleteItem(projectId, itemId);
  };

  return (
    <div className="w-2xl mx-auto mt-5 rounded-lg p-4 border">
      <TableWrapperHeader handleAdd={handleAdd} />
      <Table className="text-base text-neutral-300">
        <TableCaption>Manage your expenses for this project.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Name</TableHead>
            <TableHead className="w-[25%]">Date</TableHead>
            <TableHead className="w-[15%]">BYN</TableHead>
            <TableHead className="w-[15%]">USD</TableHead>
            <TableHead className="w-[15%]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody items={project.items} handleDelete={handleDelete} />

        <TableFooter totalByn={project.totalByn} totalUsd={project.totalUsd} />
      </Table>
    </div>
  );
};
