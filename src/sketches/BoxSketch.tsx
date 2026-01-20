import { MeshDistortMaterial } from '@react-three/drei';
import Sketch from '../components/Sketch/Sketch';

export default function BoxSketch({ distort = 0.4 }) {
  return (
    <Sketch
      geometry={<boxGeometry args={[1, 1, 1]} />}
      material={<MeshDistortMaterial color="#6366f1" speed={2} distort={distort} />}
    />
  );
}