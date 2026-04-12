import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main font-inter selection:bg-accent selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-accent text-black font-bold px-2 py-1 rounded">PS</span>
            <span className="font-bold text-lg tracking-tight">ProServe</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-subtext">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#demo" className="hover:text-white transition">Demo</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Alysha93/ProServe-POS-System" target="_blank" rel="noreferrer" className="text-subtext hover:text-white transition flex items-center gap-2 text-sm font-medium">
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link to="/demo" className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:bg-accent-soft transition-all active:scale-[0.97] text-sm">
              Launch Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] -z-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Smart restaurant <br className="hidden md:block"/> operations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">simplified.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-subtext max-w-2xl mx-auto leading-relaxed"
          >
            A modern POS system designed for speed, clarity, and real-world restaurant workflows. Built for high-volume environments where every second counts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/demo" className="w-full sm:w-auto bg-accent text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-accent-soft transition-all active:scale-[0.97] shadow-lg shadow-accent/25 flex items-center justify-center gap-2 group">
              Launch Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/Alysha93/ProServe-POS-System" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-all active:scale-[0.97] flex items-center justify-center gap-2">
              <Terminal className="w-5 h-5" />
              View Source Code
            </a>
          </motion.div>
        </div>

        {/* UI Mockup Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-6xl mx-auto mt-20 relative perspective-1000"
        >
          <div className="absolute inset-x-4 inset-y-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-card/80 backdrop-blur aspect-[16/10] md:aspect-[16/9] rotate-x-12 transform-gpu">
             <div className="absolute inset-0 flex items-center justify-center text-subtext/50 font-mono text-sm border-2 border-dashed border-white/5 m-4 rounded-xl">
               [ Demo Mockup Area - Replace with actual Screenshot inside Vercel ]
             </div>
          </div>
        </motion.div>
      </section>

      {/* Problem -> Solution */}
      <section className="py-24 px-6 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Running a restaurant is chaotic.</h2>
            <div className="space-y-4 text-subtext text-lg">
              <p>Tickets get lost. Kitchens get overwhelmed during rushes. Front-of-house staff waste time switching between clunky legacy systems.</p>
              <p className="text-white font-semibold border-l-4 border-accent pl-4">ProServe POS fixes this.</p>
              <p>A streamlined system connecting ordering, back-of-house ticketing, and checkout into one seamless, lightning-fast digital workflow.</p>
            </div>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px] border border-white/10 rounded-2xl bg-bg/50 overflow-hidden flex items-center justify-center">
             <div className="text-center p-8 bg-card border border-white/10 shadow-2xl rounded-2xl -rotate-6 transform hover:rotate-0 transition-transform duration-500 max-w-sm">
                <span className="text-2xl font-bold block mb-2 text-danger">⏱ 14:32</span>
                <span className="text-subtext">Table 12 is waiting too long!</span>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need. <br />Nothing you don't.</h2>
            <p className="text-subtext text-lg max-w-2xl mx-auto">Enterprise-grade features packed into a user-friendly interface that requires zero training.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Fast Order Flow</h3>
              <p className="text-subtext leading-relaxed">Add items instantly with an optimized UI grid. Speed mode keyboard shortcuts (1-9) make power users fly through rushes.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🍳</div>
              <h3 className="text-xl font-bold text-white mb-3">Kitchen Display System</h3>
              <p className="text-subtext leading-relaxed">Track orders in real-time with visual status columns. Overdue orders actively pulse red to keep the line moving.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🪑</div>
              <h3 className="text-xl font-bold text-white mb-3">Table Management</h3>
              <p className="text-subtext leading-relaxed">Visual table mapping with drag-and-drop rearrangements. Live status colors instantly reveal open tables or guests paying.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">💳</div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Checkout</h3>
              <p className="text-subtext leading-relaxed">Automatic tax calculations and live totals. The cart seamlessly transitions orders out from the global system states.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#020617]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-sm font-bold tracking-widest text-subtext uppercase">Engineering Stack</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xl md:text-2xl font-bold text-white/50">
            <span className="hover:text-white transition-colors cursor-default">React v19</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hover:text-white transition-colors cursor-default">Tailwind CSS V4</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hover:text-white transition-colors cursor-default">Zustand</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hover:text-white transition-colors cursor-default">Framer Motion</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">Ready to explore the system?</h2>
          <Link to="/demo" className="inline-flex items-center gap-2 bg-accent text-black font-bold text-xl px-10 py-5 rounded-2xl hover:bg-accent-soft transition-all active:scale-[0.97] shadow-xl shadow-accent/20">
            Launch Live Demo
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
      
      <footer className="py-8 text-center text-subtext text-sm border-t border-white/5">
        Designed for speed. Built for production.
      </footer>
    </div>
  );
}
