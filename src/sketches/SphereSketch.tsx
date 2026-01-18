import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, ContactShadows } from '@react-three/drei';

export default function SphereSketch() {
  return (
    /* No defined width/height here, it will fill the parent div from Layout.tsx */
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial 
            color="#111111" 
            speed={3} 
            distort={0.4} 
            roughness={0.8} 
            metalness={0.25}
          />
        </mesh>
      </Float>

      <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
      <OrbitControls makeDefault enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}