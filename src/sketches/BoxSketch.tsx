import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';

export default function BoxSketch() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#6366f1" speed={2} distort={0.4} />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}