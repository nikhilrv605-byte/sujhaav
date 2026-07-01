"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";

export default function Hero() {
  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <MeshDistortMaterial
              color="#6366f1"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
            />
          </mesh>
        </Float>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Sujhaav
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-xl">
          AI-powered tech recommendations, made for you.
        </p>
      </div>
    </div>
  );
}