interface Props {
  categories: { id: string; name: string }[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategoryId, onSelect }: Props) {
  return (
    <div className="flex gap-2.5 mb-8 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-6 py-3 rounded-2xl font-bold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap border-2 ${
              isActive 
                ? "bg-accent border-accent text-slate-950 shadow-xl shadow-accent/20 scale-105" 
                : "bg-slate-900/50 border-slate-800/50 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
