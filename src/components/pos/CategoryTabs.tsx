interface Props {
  categories: { id: string; name: string }[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategoryId, onSelect }: Props) {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2 custom-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap ${
            activeCategoryId === cat.id 
              ? "bg-accent text-black shadow-lg shadow-accent/20" 
              : "bg-card border border-border text-subtext hover:text-text-main hover:bg-gray-800"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
