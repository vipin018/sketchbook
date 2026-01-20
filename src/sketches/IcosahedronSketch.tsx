import Sketch from '../components/Sketch/Sketch';

const IcosahedronSketch = () => {
  return (
    <Sketch
      geometry={<icosahedronGeometry args={[1, 0]} />}
      color="tomato"
    />
  );
};

export default IcosahedronSketch;
