import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const COLUMN_COUNT = 5;

export const Preloader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      // Force it to stay on top of EVERYTHING
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        width: '100vw', 
        height: '100vh',
        pointerEvents: 'all' // Blocks clicks to the background while loading
      }}
      className="flex overflow-hidden bg-zinc-950"
    >
      {/* Background Columns */}
      <div className="absolute inset-0 flex">
        {[...Array(COLUMN_COUNT)].map((_, i) => (
          <motion.div
            key={i}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05 * i
            }}
            className="h-full flex-1 bg-zinc-950 border-r border-white/5 last:border-r-0"
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
        <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          <span>System: Active / Vipin</span>
          <span>2026 Archive</span>
        </div>

        <div className="flex flex-col items-center">
           <motion.span 
             exit={{ opacity: 0 }}
             className="text-8xl font-serif italic tracking-tighter opacity-10 mb-4"
           >
            {percent}%
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl md:text-7xl font-serif italic tracking-tighter text-center"
            >
              Vipin Sketches
            </motion.h1>
          </div>
        </div>

        <div className="flex justify-between items-end font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          <p>Initialising WebGL...</p>
          <p className="text-white/40 tracking-[0.4em]">Wait for Interaction</p>
        </div>
      </div>
    </motion.div>
  );
};