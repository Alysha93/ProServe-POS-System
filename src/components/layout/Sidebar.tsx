import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Armchair, 
  ChefHat, 
  BarChart3, 
  Settings, 
  LogOut,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { icon: Home, label: 'POS', path: '/demo' },
  { icon: ShoppingBag, label: 'Takeout', path: '/demo/takeout' },
  { icon: Armchair, label: 'Tables', path: '/demo/tables' },
  { icon: ChefHat, label: 'Kitchen', path: '/demo/kitchen' },
  { icon: BarChart3, label: 'Reports', path: '/demo/reports' },
  { icon: Settings, label: 'Settings', path: '/demo/settings' },
];

export function Sidebar() {
  const { isClockedIn, toggleClockIn } = useAppStore();

  return (
    <div className="h-screen w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-8 shadow-xl z-20 shrink-0">
      <div className="text-secondary text-2xl font-bold tracking-tighter">PS</div>

      <nav className="flex flex-col gap-6 flex-1 w-full px-2 mt-4 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) => twMerge(clsx(
              "group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-[1.05] active:scale-[0.95]",
              isActive 
                ? "bg-accent/10 text-accent shadow-inner" 
                : "text-subtext hover:bg-gray-800 hover:text-text-main"
            ))}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto w-full px-2 flex flex-col items-center gap-4">
        <button 
          onClick={toggleClockIn}
          title={isClockedIn ? "Clock Out" : "Clock In"}
          className={twMerge(clsx(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-[0.9] border shadow-lg",
            isClockedIn 
              ? "bg-success/10 border-success/30 text-success shadow-success/20 ring-4 ring-success/5 animate-pulse" 
              : "bg-danger/10 border-danger/30 text-danger shadow-danger/20 ring-4 ring-danger/5"
          ))}
        >
          <Clock className="w-6 h-6" />
        </button>

        <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-subtext hover:bg-danger/10 hover:text-danger transition-all duration-200 ease-in-out hover:scale-[1.05] active:scale-[0.95] group">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

