import Sketch from '../components/Sketch/Sketch';

const CylinderSketch = () => {
  return (
    <Sketch
      geometry={<cylinderGeometry args={[1, 1, 2, 32]} />}
      color="limegreen"
    />
  );
};

export default CylinderSketch;
