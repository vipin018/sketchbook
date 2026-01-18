import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { Maximize2 } from 'lucide-react';
import { Thumbnail } from './Thumbnail';

export const Layout = ({ children, sketches, active, onChange }: any) => {
  const [width, setWidth] = useState(340);

  return (
    <div className="flex h-screen w-screen bg-[#f8f8f8] overflow-hidden font-sans">
      {/* Sidebar - Positioned Left for better visual flow */}
      <Resizable
        width={width}
        height={0}
        onResize={(_, { size }) => setWidth(size.width)}
        axis="x"
        resizeHandles={['e']}
        minConstraints={[280, 0]}
        maxConstraints={[500, 0]}
      >
        <aside 
          style={{ width: `${width}px` }}
          className="relative h-full bg-white border-r border-black/[0.05] flex flex-col z-20"
        >
          <div className="p-10 border-b border-black/[0.03]">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-2">Vipin Sketches</h2>
            <p className="font-medium text-sm italic font-serif text-black/80 tracking-tight">Selected Experiments</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {sketches.map((sketch: any, i: number) => (
              <button
                key={sketch.name}
                onClick={() => onChange(sketch.name)}
                className="group w-full text-left"
              >
                <div className={`mb-4 transition-all duration-700 ${
                  active === sketch.name ? 'ring-1 ring-black ring-offset-4' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                }`}>
                  <Thumbnail thumbnail={sketch.thumbnail} active={active === sketch.name} />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-mono opacity-20 group-hover:opacity-40 transition-opacity">0{i+1}</span>
                  <h3 className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    active === sketch.name ? 'text-black font-bold' : 'text-black/40'
                  }`}>
                    {sketch.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          <footer className="p-10 border-t border-black/[0.03] text-[9px] uppercase tracking-[0.3em] text-black/20">
            Built with React & Three.js <br /> © 2026
          </footer>
        </aside>
      </Resizable>

      {/* Main Canvas Area - THIS NOW FILLS THE SCREEN */}
      <main className="relative flex-1 bg-white h-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
           {children}
        </div>
        
        {/* Subtle Canvas UI Overlays */}
        <div className="absolute top-10 right-10 z-10 pointer-events-none text-right">
          <h1 className="text-[10px] uppercase tracking-[0.4em] text-black/20 mb-1">Index Study</h1>
          <p className="text-xl font-medium tracking-tighter italic font-serif text-black/60">{active}</p>
        </div>
        
        <div className="absolute bottom-10 left-10 z-10">
           <button className="p-3 rounded-full border border-black/5 bg-white/50 backdrop-blur hover:bg-white transition-all">
              <Maximize2 size={14} className="text-black/40" />
           </button>
        </div>
      </main>
    </div>
  );
};