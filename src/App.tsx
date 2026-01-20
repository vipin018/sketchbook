import { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from './components/Preloader';
import SphereSketch from './sketches/SphereSketch';
import BoxSketch from './sketches/BoxSketch';
import TorusSketch from './sketches/TorusSketch';
import ConeSketch from './sketches/ConeSketch';
import CylinderSketch from './sketches/CylinderSketch';
import DodecahedronSketch from './sketches/DodecahedronSketch';
import IcosahedronSketch from './sketches/IcosahedronSketch';

const SKETCHES_DATA = [
  {
    name: "Metaball Study",
    component: SphereSketch,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Geometric Flow",
    component: BoxSketch,
    thumbnail: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Torus Field",
    component: TorusSketch,
    thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Radial Cone",
    component: ConeSketch,
    thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Cylinder Test",
    component: CylinderSketch,
    thumbnail: "https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Dodecahedron",
    component: DodecahedronSketch,
    thumbnail: "https://images.unsplash.com/photo-1618556658017-fd9c732d1f60?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Icosahedron",
    component: IcosahedronSketch,
    thumbnail: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
  },
];

function App() {
  const [current, setCurrent] = useState(SKETCHES_DATA[0].name);
  const [loading, setLoading] = useState(true);
  const [distort, setDistort] = useState(0.4);

  const SKETCHES = SKETCHES_DATA.map((sketch) => {
    if (sketch.name === "Geometric Flow") {
      return {
        ...sketch,
        component: <BoxSketch distort={distort} />,
      };
    }
    const SketchComponent = sketch.component;
    return {
      ...sketch,
      component: <SketchComponent />,
    };
  });

  useEffect(() => {
    // 3000ms ensures the Preloader animations (counter, columns) 
    // have enough time to finish their sequences.
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const currentComponent = useMemo(() => {
    return SKETCHES.find(s => s.name === current)?.component;
  }, [current, distort]);

  return (
    <div className="relative w-full h-screen bg-[#fcfcfc]">
      {/* 1. Preloader - Mounted on top */}
      <AnimatePresence mode="wait">
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      {/* 2. Main Content - Logic change: 
          We render the Layout even while loading (opacity 0) 
          so Three.js can start warming up the GPU. */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <Layout 
          sketches={SKETCHES} 
          active={current} 
          onChange={setCurrent}
          distort={distort}
          onDistortChange={setDistort}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              /* Improved Transition: Scale + Blur + Opacity */
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1] // Custom quintic ease-out
              }}
              className="w-full h-full"
            >
              {currentComponent}
            </motion.div>
          </AnimatePresence>
        </Layout>
      </motion.div>
    </div>
  );
}

export default App;