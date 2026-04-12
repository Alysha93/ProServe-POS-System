import type { MenuItem as MenuItemType } from '../../store/useAppStore';

interface Props {
  item: MenuItemType;
  onAdd: () => void;
}

export function MenuItem({ item, onAdd }: Props) {
  return (
    <div
      onClick={onAdd}
      className="bg-card/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] hover:border-accent/40 hover:shadow-accent/10 active:scale-[0.98] flex flex-col group h-full relative"
    >
      {/* Image Section */}
      <div className="h-40 w-full relative overflow-hidden bg-white/5">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-accent text-black font-black px-3 py-1 rounded-full text-sm shadow-lg z-10">
          ${item.price.toFixed(2)}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5 pt-2 flex flex-col flex-1">
        <div className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors mb-2">
          {item.name}
        </div>
        {item.description && (
          <div className="text-sm text-subtext/80 leading-relaxed line-clamp-2">
            {item.description}
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ring-1 ring-accent/30" />
    </div>
  );
}
