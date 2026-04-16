import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Armchair, 
  ChefHat, 
  BarChart3, 
  Settings, 
  LogOut,
  ShoppingBag,
  Clock,
  CreditCard
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { icon: Home, label: 'POS', path: '/demo' },
  { icon: ShoppingBag, label: 'Takeout', path: '/demo/takeout' },
  { icon: Armchair, label: 'Tables', path: '/demo/tables' },
  { icon: CreditCard, label: 'Checkout', path: '/demo/checkout' },
  { icon: ChefHat, label: 'Kitchen', path: '/demo/kitchen' },
  { icon: BarChart3, label: 'Reports', path: '/demo/reports' },
  { icon: Settings, label: 'Settings', path: '/demo/settings' },
];

export function Sidebar() {
  const { isClockedIn, toggleClockIn } = useAppStore();

  return (
    <div className="h-screen w-20 bg-card border-r border-slate-800/50 flex flex-col items-center py-8 gap-8 shadow-2xl z-20 shrink-0">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative text-white text-2xl font-black tracking-tighter bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10">
          PS
        </div>
      </div>

      <nav className="flex flex-col gap-5 flex-1 w-full px-2 mt-4 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) => twMerge(clsx(
              "group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-90",
              isActive 
                ? "bg-accent text-slate-950 shadow-lg shadow-accent/20" 
                : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-200"
            ))}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
            
            {/* Tooltip-like label on hover if you want, but for now just visual juice */}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto w-full px-2 flex flex-col items-center gap-6 pb-2">
        <button 
          onClick={toggleClockIn}
          title={isClockedIn ? "Clock Out" : "Clock In"}
          className={twMerge(clsx(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 border-2 shadow-xl",
            isClockedIn 
              ? "bg-success/10 border-success/30 text-success shadow-success/10 ring-4 ring-success/5" 
              : "bg-danger/10 border-danger/30 text-danger shadow-danger/10 ring-4 ring-danger/5"
          ))}
        >
          <Clock className="w-5 h-5" />
        </button>

        <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-danger/10 hover:text-danger transition-all duration-300 hover:scale-110 active:scale-90 group">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

