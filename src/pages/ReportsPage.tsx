import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportsPage() {
  const { activeOrders, menu, categories } = useAppStore();

  // Calculate real-time stats from activeOrders
  const stats = useMemo(() => {
    // We add some "mock historical" data to the real data for a better demo feel
    const baseRevenue = 12450.75;
    const baseOrders = 142;
    
    const sessionRevenue = activeOrders.reduce((sum, order) => sum + order.total, 0);
    const sessionOrders = activeOrders.length;
    
    const totalRevenue = baseRevenue + sessionRevenue;
    const totalOrders = baseOrders + sessionOrders;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      revenue: totalRevenue,
      orders: totalOrders,
      avgValue: avgOrderValue,
      guests: Math.round(totalOrders * 2.4),
      revenueGrowth: 12.5,
      orderGrowth: 8.2
    };
  }, [activeOrders]);

  // Mock Category Distribution for chart
  const categoryData = useMemo(() => {
    return categories.map((cat, i) => ({
      name: cat.name,
      value: [35, 15, 10, 20, 10, 5, 3, 2][i] || 5, // Mock weights
      color: i === 0 ? '#14b8a6' : i === 1 ? '#8b5cf6' : i === 2 ? '#ec4899' : '#475569'
    }));
  }, [categories]);

  // Mock Sales Trend (Hourly)
  const hourlyData = [
    { hour: '11am', sales: 420 },
    { hour: '12pm', sales: 1250 },
    { hour: '1pm', sales: 980 },
    { hour: '2pm', sales: 450 },
    { hour: '3pm', sales: 310 },
    { hour: '4pm', sales: 520 },
    { hour: '5pm', sales: 1450 },
    { hour: '6pm', sales: 2100 },
    { hour: '7pm', sales: 1850 },
    { hour: '8pm', sales: 1200 },
  ];

  const maxSales = Math.max(...hourlyData.map(d => d.sales));

  return (
    <div className="flex flex-col h-full bg-[#060b19] p-8 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-accent/10 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Analytics Engine</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Business Intelligence</h1>
        <p className="text-subtext mt-2 font-medium tracking-tight">Today's operational performance and sales metrics.</p>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, trend: stats.revenueGrowth, color: 'text-accent' },
          { label: 'Net Orders', value: stats.orders, icon: ShoppingBag, trend: stats.orderGrowth, color: 'text-secondary' },
          { label: 'Avg Ticket', value: `$${stats.avgValue.toFixed(2)}`, icon: TrendingUp, trend: 4.1, color: 'text-pink-500' },
          { label: 'Total Guests', value: stats.guests, icon: Users, trend: -2.4, color: 'text-blue-400' },
        ].map((kpi, i) => (
          <motion.div 
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl bg-white/5 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${kpi.trend > 0 ? 'text-success' : 'text-danger'}`}>
                {kpi.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(kpi.trend)}%
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-subtext text-xs uppercase font-black tracking-widest mb-1">{kpi.label}</p>
              <p className="text-3xl font-black text-white tracking-tighter">{kpi.value}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Sales Trend (Line Graph SVG) */}
        <div className="lg:col-span-2 bg-card border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Hourly Sales Trend
              </h3>
              <p className="text-subtext text-xs font-medium tracking-tight">Peak performance tracking</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-bold text-accent uppercase tracking-widest">Live</div>
            </div>
          </div>

          <div className="flex-1 h-64 relative mt-4">
             {/* Simple SVG Chart */}
             <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Guide Lines */}
                {[0, 1, 2, 3].map(i => (
                  <line 
                    key={i} 
                    x1="0" y1={i * 50} x2="800" y2={i * 50} 
                    stroke="white" strokeOpacity="0.05" strokeWidth="1" 
                  />
                ))}

                {/* The Path */}
                <path 
                  d={`M ${hourlyData.map((d, i) => `${(i * 800) / (hourlyData.length - 1)},${200 - (d.sales / maxSales) * 160}`).join(' L ')}`}
                  fill="none" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                />
                
                {/* Area under path */}
                <path 
                  d={`M 0,200 L ${hourlyData.map((d, i) => `${(i * 800) / (hourlyData.length - 1)},${200 - (d.sales / maxSales) * 160}`).join(' L ')} L 800,200 Z`}
                  fill="url(#chartGradient)"
                />

                {/* Data Points */}
                {hourlyData.map((d, i) => (
                  <circle 
                    key={i} 
                    cx={(i * 800) / (hourlyData.length - 1)} 
                    cy={200 - (d.sales / maxSales) * 160} 
                    r="5" fill="#060b19" stroke="#14b8a6" strokeWidth="2" 
                  />
                ))}
             </svg>
             <div className="flex justify-between mt-6 px-1">
                {hourlyData.map(d => (
                  <span key={d.hour} className="text-[10px] font-black text-subtext uppercase tracking-tighter">{d.hour}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Category Mix (List View + Mini Chart) */}
        <div className="bg-card border border-white/5 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-2 mb-8">
            <PieChart className="w-5 h-5 text-secondary" />
            Category Mix
          </h3>
          
          <div className="space-y-6">
            {categoryData.slice(0, 5).map(cat => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                  <span className="text-white">{cat.name}</span>
                  <span className="text-subtext">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
             <div className="text-[10px] font-black text-subtext uppercase tracking-widest mb-1">Highest Profit Margin</div>
             <div className="text-xl font-black text-accent italic uppercase tracking-tighter">Artisanal Spirits</div>
          </div>
        </div>
      </div>

      {/* Top Items Table */}
      <div className="bg-card border border-white/5 rounded-[2.5rem] p-8">
         <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Top Performing Items</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline transition-all">Export CSV</button>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/5">
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-subtext px-4">Rank</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-subtext px-4">Item Name</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-subtext px-4">Category</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-subtext px-4 text-right">Qty Sold</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-subtext px-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: '#1', name: 'Classic Cheeseburger', cat: 'Mains', qty: 842, rev: '$10,937.58' },
                  { rank: '#2', name: 'Pepperoni Pizza', cat: 'Pizza', qty: 621, rev: '$10,550.79' },
                  { rank: '#3', name: 'Double Bacon Burger', cat: 'Mains', qty: 412, rev: '$6,587.88' },
                  { rank: '#4', name: 'Caesar Salad', cat: 'Salads', qty: 389, rev: '$3,886.11' },
                  { rank: '#5', name: 'Nashville Spicy Chicken', cat: 'Mains', qty: 356, rev: '$4,980.44' },
                ].map((row, i) => (
                  <tr key={row.name} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-5 font-black text-subtext px-4 italic">{row.rank}</td>
                    <td className="py-5 font-bold text-white px-4">{row.name}</td>
                    <td className="py-5 text-subtext px-4 text-[11px] font-bold uppercase tracking-widest">{row.cat}</td>
                    <td className="py-5 text-white px-4 text-right font-medium">{row.qty}</td>
                    <td className="py-5 text-accent px-4 text-right font-black tracking-tighter">{row.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
