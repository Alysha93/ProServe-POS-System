import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-text-main overflow-hidden font-inter">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative p-6">
        <Outlet />
      </main>
    </div>
  );
}

