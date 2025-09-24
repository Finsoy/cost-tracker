import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[1fr_9fr]">
        <AppSidebar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};
