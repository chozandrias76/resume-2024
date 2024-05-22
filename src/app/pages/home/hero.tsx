import { useHeroModel } from "@/hooks/useHeroModel";
import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function HeroModel() {
  const {data: model} = useHeroModel()
  return model ? <primitive scale={0.275} object={model} /> : null;
}

export function HeroCanvas() {

  return (
    <Canvas
      style={{ height: "48vh" }}
      className="bg-zinc-900"
      camera={{
        fov: 75,
        near: 0.1,
        far: 10,
        position: [2, 1, 2.5],
        rotation: [0, 45 * (Math.PI / 180), 0],
      }}
    >
      <Sparkles scale={7.5} color={"black"} count={1e4} size={0.4}/>
      <ambientLight intensity={0.01} />
      <pointLight intensity={250} color={"rgb(71, 100, 85)"} position={[10, 10, 10]} />
      <pointLight intensity={100} color={"rgb(71, 85, 0)"} position={[0, 10, 10]} />
      {<HeroModel />}
    </Canvas>
  );
}