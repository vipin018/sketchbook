import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { Maximize2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import screenfull from 'screenfull';
import { Thumbnail } from './Thumbnail';

interface Sketch {
  name: string;
  thumbnail: string;
  // Add other properties if available in sketch object
}

interface LayoutProps {
  children: React.ReactNode;
  sketches: Sketch[];
  active: string;
  onChange: (sketchName: string) => void;
}

export const Layout = ({ children, sketches, active, onChange }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(340); // Local width state for Resizable

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-50 overflow-hidden font-sans">
      {/* Sidebar - Positioned Left for better visual flow */}
      <Resizable
        width={isCollapsed ? 0 : width}
        onResize={(_, { size }) => {
          if (isCollapsed && size.width > 0) {
            setIsCollapsed(false);
            setWidth(size.width);
          } else if (!isCollapsed) {
            setWidth(size.width);
          }
        }}
        axis="x"
        resizeHandles={['e']}
        minConstraints={[isCollapsed ? 0 : 280, 0]}
        maxConstraints={[isCollapsed ? 0 : 500, 0]}
      >
        <motion.aside 
          initial={false}
          animate={{ width: isCollapsed ? 0 : width }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative h-full bg-zinc-100 border-r border-zinc-200 flex flex-col z-20"
        >
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.2 }}
            className="h-full flex flex-col"
          >
            <div className="px-8 pt-8 pb-4 border-b border-zinc-200">
              <h2 className="text-xl font-bold text-zinc-800 mb-1">Vipin Sketches</h2>
              <p className="font-medium text-sm italic font-serif text-zinc-600">Selected Experiments</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {sketches.map((sketch: Sketch, i: number) => (
                              <button
                                key={sketch.name}
                                onClick={() => onChange(sketch.name)}
                                className={`group w-full text-left p-4 rounded-lg transition-all duration-200 ${
                                  active === sketch.name
                                    ? 'bg-blue-100 border border-blue-300' // Active state
                                    : 'hover:bg-gray-50 hover:border-gray-200' // Inactive hover state
                                }`}
                              >
                                <div className={`mb-4 transition-all duration-300 ${
                                  active === sketch.name ? 'opacity-100' : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                                }`}>
                                  <Thumbnail thumbnail={sketch.thumbnail} active={active === sketch.name} />
                                </div>
                                <div className="flex justify-between items-baseline">
                                  <span className={`text-xs font-mono transition-opacity ${
                                    active === sketch.name ? 'opacity-60' : 'opacity-20 group-hover:opacity-40'
                                  }`}>0{i+1}</span>
                                  <h3 className={`text-sm uppercase tracking-[0.1em] transition-colors ${
                                    active === sketch.name ? 'text-blue-700 font-bold' : 'text-zinc-500 group-hover:text-zinc-700'
                                  }`}>
                                    {sketch.name}
                                  </h3>
                                </div>
                              </button>              ))}
            </div>

            <footer className="px-8 py-4 border-t border-zinc-200 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Built with React & Three.js <br /> © 2026
            </footer>
          </motion.div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full bg-zinc-100 border border-zinc-200 shadow-md hover:bg-zinc-200 transition-colors duration-200 z-50"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronLeft size={16} className="text-zinc-600" />
            </motion.div>
          </button>
        </motion.aside>
      </Resizable>

      {/* Main Canvas Area - THIS NOW FILLS THE SCREEN */}
      <main className="relative flex-1 bg-gradient-to-br from-gray-50 to-white h-full overflow-hidden">
        <motion.div
          key={active} // Key change will trigger re-animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full"
        >
           {children}
        </motion.div>
        
        {/* Subtle Canvas UI Overlays */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Currently Viewing</p>
          <h1 className="text-5xl font-bold tracking-tight italic font-serif text-zinc-800">{active}</h1>
        </div>
        
        <div className="absolute bottom-10 left-10 z-10">
           <button 
              onClick={handleFullscreen}
              className="p-3 rounded-full border border-zinc-200/5 bg-zinc-100/50 backdrop-blur hover:bg-zinc-100 transition-all">
              <Maximize2 size={14} className="text-zinc-600" />
           </button>
        </div>
      </main>
    </div>
  );
};