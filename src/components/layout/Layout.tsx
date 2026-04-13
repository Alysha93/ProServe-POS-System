import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#060b19] via-[#0b1736] to-[#0f1035] text-white overflow-hidden relative">
      {/* Glow Effect Background */}
      <div className="absolute top-[-10%] left-[-5%] blur-[120px] opacity-20 bg-accent w-[500px] h-[500px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] blur-[120px] opacity-20 bg-purple-500 w-[600px] h-[600px] rounded-full pointer-events-none" />
      
      <Sidebar />
      <main className="flex-1 overflow-hidden relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
