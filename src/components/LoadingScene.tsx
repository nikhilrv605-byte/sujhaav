"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function LoadingScene() {
  const [loadingText, setLoadingText] = useState("Initializing advisor matrix...");
  
  useEffect(() => {
    const messages = [
      "Initializing advisor matrix...",
      "Analyzing user preference vectors...",
      "Scanning active specifications database...",
      "Validating benchmarks & hardware reviews...",
      "Synthesizing neutral recommendations...",
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 1800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      {/* 3D Distorting Mesh */}
      <div className="w-40 h-40">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ec4899" />
          <pointLight position={[-5, -5, -5]} intensity={1.5} color="#6366f1" />
          
          <Float speed={8} rotationIntensity={3} floatIntensity={1.5}>
            <mesh>
              <icosahedronGeometry args={[0.8, 1]} />
              <MeshDistortMaterial
                color="#6366f1"
                distort={0.5}
                speed={4}
                roughness={0.15}
                metalness={0.9}
              />
            </mesh>
          </Float>
        </Canvas>
      </div>

      {/* Loading Status Indicator */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 animate-pulse">
          MATCHING IN PROGRESS
        </span>
        <p className="text-gray-300 text-sm font-light h-6 text-center transition-all duration-300">
          {loadingText}
        </p>
      </div>
    </div>
  );
}