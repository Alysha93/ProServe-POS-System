import type { MenuItem as MenuItemType } from '../../store/useAppStore';

interface Props {
  item: MenuItemType;
  onAdd: () => void;
}

export function MenuItem({ item, onAdd }: Props) {
  return (
    <div
      onClick={onAdd}
      className="bg-card border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.97] flex flex-col justify-between group h-full"
    >
      <div>
        <div className="text-xl font-semibold text-text-main group-hover:text-accent transition-colors">{item.name}</div>
        {item.description && (
          <div className="text-sm text-subtext mt-2 line-clamp-2">{item.description}</div>
        )}
      </div>
      <div className="text-accent font-bold text-lg mt-4">${item.price.toFixed(2)}</div>
    </div>
  );
}
