import Sketch from '../components/Sketch/Sketch';

const TorusSketch = () => {
  return (
    <Sketch
      geometry={<torusGeometry args={[1, 0.4, 16, 100]} />}
      color="orange"
    />
  );
};

export default TorusSketch;
