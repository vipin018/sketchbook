import { motion } from 'framer-motion';

export const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
      className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center text-white"
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-4 font-mono">
            Laboratory Archive v.01
          </p>
          <h1 className="text-4xl font-serif italic tracking-tighter">
            Vipin Sketches
          </h1>
          
          {/* Animated loading line */}
          <div className="mt-10 w-48 h-[1px] bg-white/10 relative mx-auto overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/60"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-[9px] uppercase tracking-widest text-white/20"
      >
        Initialising WebGL Context
      </motion.div>
    </motion.div>
  );
};