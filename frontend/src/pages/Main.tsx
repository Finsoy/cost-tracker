import { AppSidebar } from '@/components/navigation';

export const Main = () => {
  return (
    <div className="grid grid-cols-[1fr_9fr]">
      <AppSidebar />
      <div>
        <h1>Cost tracker for Diana</h1>
      </div>
    </div>
  );
};
