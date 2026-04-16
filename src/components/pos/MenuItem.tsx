import type { MenuItem as MenuItemType } from '../../store/useAppStore';

interface Props {
  item: MenuItemType;
  onAdd: () => void;
}

export function MenuItem({ item, onAdd }: Props) {
  return (
    <div
      onClick={onAdd}
      className="group relative bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] overflow-hidden backdrop-blur-xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-accent/30 hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.15)] active:scale-[0.98] flex flex-col h-full shadow-2xl"
    >
      {/* Visual Indicator of selection (brief flash or similar can be handled by state, but css hover is good) */}
      
      {/* Image Section */}
      <div className="h-48 w-full relative overflow-hidden bg-slate-950/50">
        <img 
          src={item.image || '/images/burger.png'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* Price Badge - Floating & Premium */}
        <div className="absolute top-4 right-4 bg-accent text-slate-950 font-black px-4 py-1.5 rounded-2xl text-sm shadow-xl z-10 backdrop-blur-md">
          ${item.price.toFixed(2)}
        </div>

        {/* Gradient Overlay for texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4 flex flex-col flex-1 gap-2">
        <div className="text-xl font-black tracking-tight text-white group-hover:text-accent transition-colors duration-300">
          {item.name}
        </div>
        {item.description && (
          <div className="text-sm text-slate-500 leading-relaxed line-clamp-2 group-hover:text-slate-400 transition-colors duration-300">
            {item.description}
          </div>
        )}
      </div>

      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-700" />
    </div>
  );
}
