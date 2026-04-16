import { useAppStore } from '../store/useAppStore';
import type { Table } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function TableCard({ table, onClick }: { table: Table; onClick: () => void }) {
  const colors = {
    empty: "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20",
    occupied: "bg-danger/10 border-danger/30 text-danger hover:bg-danger/20",
    paying: "bg-warning/10 border-warning/30 text-warning hover:bg-warning/20",
  };

  const statusText = {
    empty: "Available",
    occupied: "Seated",
    paying: "Billing"
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative h-48 rounded-[2.5rem] border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl backdrop-blur-xl ${colors[table.status]}`}
    >
      <div className="absolute top-4 right-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
        Zone A
      </div>
      <div className="text-5xl font-black mb-1 pointer-events-none tracking-tighter">{table.number}</div>
      <div className="text-[10px] font-black uppercase tracking-widest pointer-events-none bg-black/20 px-3 py-1 rounded-full">{statusText[table.status]}</div>
      
      {/* Decorative center point */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="w-24 h-24 border border-current rounded-full"></div>
      </div>
    </motion.div>
  );
}

export default function TablesPage() {
  const { tables, setSelectedTable, updateTableStatus } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto p-10 h-full flex flex-col bg-slate-950/20">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 shrink-0 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Floor Plan</h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest">Main Dining Area • Level 1</p>
          </div>
          <div className="flex gap-6 bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(20,184,166,0.5)]"></div> <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available</span></span>
            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seated</span></span>
            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div> <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Billing</span></span>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-start">
          {tables.map(table => (
            <TableCard 
              key={table.id} 
              table={table} 
              onClick={() => {
                if (table.status === 'empty') {
                    setSelectedTable(table.id);
                    navigate('/demo'); 
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

