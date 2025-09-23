import { Folder, PlusIcon, MinusIcon } from 'lucide-react';

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

export const AppSidebar = () => {
  const { projects } = useProjects();
  const handleDelete = () => {
    console.log('delete project');
  };
  return (
    <>
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
                      <SidebarMenuButton asChild>
                        <p className="grid grid-cols-[auto_auto_1fr] items-center">
                          <Folder />
                          <span>{proj.name}</span>
                          <MinusIcon onClick={handleDelete} className="justify-self-end" />
                        </p>
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
    </>
  );
};
