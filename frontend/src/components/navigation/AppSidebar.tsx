import { Folder, Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { CreateProjectModal } from '../modals';
import { useProjects } from '@/contexts/project/ProjectContext';
import { DeleteProjectModal } from '../modals/DeleteProjectModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const AppSidebar = () => {
  const { projects, deleteProject } = useProjects();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    console.log('delete project');
    deleteProject(id);
    navigate('/');
    console.log('navigate');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="mt-2 mb-10">
              <SidebarMenuButton asChild isActive={location.pathname === `/`}>
                <Link
                  to="/"
                  className="group grid grid-cols-[auto_1fr] items-center gap-2 h-[40px]"
                >
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <CreateProjectModal />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

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
                      className="grid grid-cols-[auto_auto_1fr] items-center cursor-pointer"
                    >
                      <Folder />
                      <span>{proj.name}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuAction>
                    <DeleteProjectModal handleDelete={() => handleDelete(proj.id)} />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
};
