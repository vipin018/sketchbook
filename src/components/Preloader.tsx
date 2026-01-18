import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const Preloader = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
      await controls.start({ opacity: 1, transition: { delay: 0.5 } }); // "Initialising WebGL Context"
    };
    sequence();
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
      style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0 }}
      className="z-[100] bg-zinc-900 flex flex-col items-center justify-center text-white"
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={controls}
          className="text-center"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-4 font-mono"
          >
            Laboratory Archive v.01
          </motion.p>
          <motion.h1
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-serif italic tracking-tighter"
          >
            Vipin Sketches
          </motion.h1>
          
          {/* Animated loading line */}
          <div className="mt-10 w-48 h-[1px] bg-white/10 relative mx-auto overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 1 }}
              className="absolute inset-0 bg-white/80"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-24 w-full px-2 text-center text-xs uppercase tracking-normal text-white/30"
      >
        Initialising WebGL Context
      </motion.div>
    </motion.div>
  );
};