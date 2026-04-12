import { useAppStore } from '../store/useAppStore';
import type { Table } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

function TableCard({ table, onClick }: { table: Table; onClick: () => void }) {
  const colors = {
    empty: "bg-accent/20 border-accent/30 text-accent",
    occupied: "bg-danger/20 border-danger/30 text-danger",
    paying: "bg-yellow-500/20 border-yellow-500/30 text-yellow-500",
  };

  const statusText = {
    empty: "Available",
    occupied: "Seated",
    paying: "Checkout"
  }

  return (
    <div 
      onClick={onClick}
      className={`p-6 bg-card border rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.05] active:scale-[0.95] shadow-lg backdrop-blur ${colors[table.status]}`}
    >
      <div className="text-3xl font-bold mb-2">T{table.number}</div>
      <div className="text-sm font-medium uppercase tracking-wider">{statusText[table.status]}</div>
    </div>
  );
}

export default function TablesPage() {
  const { tables, setSelectedTable, updateTableStatus } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto p-8 h-full flex flex-col">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        <header className="flex items-center justify-between mb-8 shrink-0">
          <h1 className="text-3xl font-bold text-text-main tracking-tight">Table Map</h1>
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent"></div> <span className="text-sm">Available</span></span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-danger"></div> <span className="text-sm">Seated</span></span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> <span className="text-sm">Checkout</span></span>
          </div>
        </header>

        <div className="bg-card/50 rounded-2xl border border-border p-12 min-h-[600px] shadow-lg flex-1 backdrop-blur grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tables.map(table => (
            <TableCard 
              key={table.id} 
              table={table} 
              onClick={() => {
                if (table.status === 'empty') {
                    setSelectedTable(table.id);
                    navigate('/'); // Route to POS
                } else if (table.status === 'occupied') {
                    updateTableStatus(table.id, 'paying');
                } else if (table.status === 'paying') {
                    updateTableStatus(table.id, 'empty');
                }
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

