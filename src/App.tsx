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

const SKETCHES = [
  {
    name: "Metaball Study",
    component: <SphereSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Geometric Flow",
    component: <BoxSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Torus",
    component: <TorusSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cone",
    component: <ConeSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cylinder",
    component: <CylinderSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dodecahedron",
    component: <DodecahedronSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb052d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Icosahedron",
    component: <IcosahedronSketch />,
    thumbnail: "https://images.unsplash.com/photo-1765527634013-bb0.5d3f5b4c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function App() {
  const [current, setCurrent] = useState(SKETCHES[0].name);
  const [loading, setLoading] = useState(true);

  // This hides the loader after 2.5 seconds (gives time for the animation to play)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const currentComponent = useMemo(() => {
    return SKETCHES.find(s => s.name === current)?.component;
  }, [current]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <Layout 
          sketches={SKETCHES} 
          active={current} 
          onChange={setCurrent}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              {currentComponent}
            </motion.div>
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}

export default App;