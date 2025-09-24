import { Folder } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { CreateProjectModal } from '../modals';
import { useProjects } from '@/contexts/project/ProjectContext';
import { DeleteProjectModal } from '../modals/DeleteProjectModal';
import { Link } from 'react-router-dom';

export const AppSidebar = () => {
  const { projects, deleteProject } = useProjects();

  const handleDelete = (id: string) => {
    console.log('delete project');
    deleteProject(id);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenuButton asChild>
              <CreateProjectModal />
            </SidebarMenuButton>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects?.map((proj) => (
                  <SidebarMenuItem key={proj.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === `/projects/${proj.id}`}
                    >
                      <Link
                        to={`/projects/${proj.id}`}
                        className="grid grid-cols-[auto_auto_1fr] items-center cursor-pointer h-[40px]"
                      >
                        <Folder />
                        <span>{proj.name}</span>
                        <DeleteProjectModal handleDelete={() => handleDelete(proj.id)} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p>Footer</p>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
