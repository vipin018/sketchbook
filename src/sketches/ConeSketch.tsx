import Sketch from '../components/Sketch/Sketch';

const ConeSketch = () => {
  return (
    <Sketch
      geometry={<coneGeometry args={[1, 2, 32]} />}
      color="hotpink"
    />
  );
};

export default ConeSketch;
