import Sketch from '../components/Sketch/Sketch';

const DodecahedronSketch = () => {
  return (
    <Sketch
      geometry={<dodecahedronGeometry args={[1, 0]} />}
      color="deepskyblue"
    />
  );
};

export default DodecahedronSketch;
