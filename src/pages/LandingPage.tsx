import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main font-inter selection:bg-accent selection:text-slate-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-slate-950 font-black px-2.5 py-1.5 rounded-xl text-sm shadow-lg shadow-accent/20">PS</div>
            <span className="font-black text-xl tracking-tighter text-white">ProServe</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Platform</a>
            <a href="#demo" className="hover:text-white transition-colors">Case Studies</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Alysha93/ProServe-POS-System" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <span className="hidden sm:inline">Engineering</span>
            </a>
            <Link to="/demo" className="bg-white text-slate-950 font-black px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-xl">
              Launch Stack
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-40 px-8">
        <div className="absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-10 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 shadow-2xl"
          >
            Terminal 4.0 Release
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] flex flex-col items-center"
          >
            <span>Production POS</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-accentSoft">reimagined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-tight font-medium tracking-tight"
          >
            A high-fidelity operation system for modern dining. Built for volume. Engineered for speed. Designed to disappear.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <Link to="/demo" className="w-full sm:w-auto bg-accent text-slate-950 font-black text-lg px-10 py-5 rounded-[1.5rem] hover:bg-accent-soft transition-all active:scale-[0.97] shadow-2xl shadow-accent/20 flex items-center justify-center gap-3 group tracking-tighter">
              Launch Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/Alysha93/ProServe-POS-System" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-slate-900 border border-white/5 text-white font-black text-lg px-10 py-5 rounded-[1.5rem] hover:bg-slate-800 transition-all active:scale-[0.97] flex items-center justify-center gap-3 tracking-tighter">
              <Terminal className="w-5 h-5" />
              OSS Engine
            </a>
          </motion.div>
        </div>

        {/* UI Mockup Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-7xl mx-auto mt-32 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden bg-slate-950 aspect-[16/10] md:aspect-[21/9]">
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]">
                <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
                   <div className="w-12 h-12 rounded-full border-4 border-accent animate-spin border-t-transparent shadow-[0_0_20px_rgba(20,184,166,0.3)]"></div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Initializing Terminal...</div>
             </div>
          </div>
          
          {/* Floating Tags */}
          <div className="absolute -top-10 -left-10 hidden xl:flex bg-slate-900/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl flex-col gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
             <div className="text-[10px] font-black uppercase tracking-widest text-accent">Active Load</div>
             <div className="text-4xl font-black text-white">42ms</div>
             <div className="text-xs text-slate-500 font-medium tracking-tight">System latency under max traffic</div>
          </div>
        </motion.div>
      </section>

      {/* Stats / Proof */}
      <section className="py-20 px-8 border-y border-white/5 bg-slate-950/50 backdrop-blur-md">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
               <div className="text-5xl font-black text-white tracking-tighter mb-2">99.9%</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Uptime</div>
            </div>
            <div>
               <div className="text-5xl font-black text-white tracking-tighter mb-2">&lt;2s</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ticket Latency</div>
            </div>
            <div>
               <div className="text-5xl font-black text-white tracking-tighter mb-2">12k+</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ops / Minute</div>
            </div>
            <div>
               <div className="text-5xl font-black text-white tracking-tighter mb-2">0.05</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Staff Training Sec.</div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-8 relative">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">Built for the <br />intensity of the line.</h2>
            <p className="text-xl text-slate-500 max-w-xl font-medium tracking-tight">Enterprise capabilities engineered into a zero-latency interface. No training required, just results.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-12 hover:bg-slate-900/60 transition-all duration-500 group shadow-2xl">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-accent/10">⚡</div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Zero-Lag Checkout</h3>
              <p className="text-slate-500 text-lg leading-tight font-medium tracking-tight">Optimized UI grid for instant item addition. Native keyboard shortcuts (1-9) for power-user speed during peak hours.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-12 hover:bg-slate-900/60 transition-all duration-500 group shadow-2xl">
              <div className="w-16 h-16 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/10">📊</div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Live KDS Control</h3>
              <p className="text-slate-500 text-lg leading-tight font-medium tracking-tight">Real-time bi-directional ticketing. Orders pulse through states with deep visual feedback for high-stress kitchens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-56 px-8 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_70%)]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8]">Ready to <br />elevate?</h2>
          <Link to="/demo" className="inline-flex items-center gap-4 bg-white text-slate-950 font-black text-2xl px-14 py-6 rounded-3xl hover:bg-slate-200 transition-all active:scale-95 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] tracking-tighter">
            Enter Dashboard
            <ArrowRight className="w-8 h-8" />
          </Link>
        </div>
      </section>
      
      <footer className="py-12 text-center text-slate-600 text-[10px] uppercase font-black tracking-[0.4em] border-t border-white/5 opacity-50">
        Operational Excellence © 2026 ProServe System
      </footer>
    </div>
  );
}
