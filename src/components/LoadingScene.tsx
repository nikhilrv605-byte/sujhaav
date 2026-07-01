"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function LoadingScene() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center">
      <div className="w-32 h-32">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <Float speed={5} rotationIntensity={2} floatIntensity={1}>
            <mesh>
              <icosahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial
                color="#6366f1"
                distort={0.6}
                speed={5}
                roughness={0.1}
              />
            </mesh>
          </Float>
        </Canvas>
      </div>
      <p className="text-gray-400 text-sm mt-2 animate-pulse">
        Finding your perfect match...
      </p>
    </div>
  );
}