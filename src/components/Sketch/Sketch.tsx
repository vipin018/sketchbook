import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SketchProps {
  geometry: React.ReactNode;
  color?: string;
  material?: React.ReactNode;
}

const RotatingMesh = ({ geometry, color, material }: SketchProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      {geometry}
      {material ? material : <meshStandardMaterial color={color} />}
    </mesh>
  );
};

const Sketch = ({ geometry, color, material }: SketchProps) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingMesh geometry={geometry} color={color} material={material} />
      <OrbitControls />
    </Canvas>
  );
};

export default Sketch;
