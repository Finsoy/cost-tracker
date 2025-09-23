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

// Menu items.
const items = [
  {
    title: 'Project 1',
    url: '#',
    icon: Folder,
  },
];

export const AppSidebar = () => {
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
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="grid grid-cols-[auto_auto_1fr] items-center">
                          <item.icon />
                          <span>{item.title}</span>
                          <MinusIcon onClick={handleDelete} className="justify-self-end" />
                        </a>
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
