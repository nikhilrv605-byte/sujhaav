"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

// Stage 0 → AI thinking, Stage 1 → first product done, Stage 2 → second, Stage 3 → third
const STAGE_MESSAGES = [
  "Initializing advisor matrix...",
  "Analysing your requirement vectors...",
  "Scanning active specifications database...",
  "Validating benchmarks & hardware reviews...",
  "Synthesizing neutral recommendations...",
];

const PROGRESS_STEPS = [
  { label: "AI thinking", pct: 20 },
  { label: "Product 1 ready", pct: 50 },
  { label: "Product 2 ready", pct: 75 },
  { label: "Product 3 ready", pct: 100 },
];

interface LoadingSceneProps {
  /** 0 = AI call in progress, 1/2/3 = N products received */
  stage?: number;
}

export default function LoadingScene({ stage = 0 }: LoadingSceneProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  // Cycle through sub-messages within each stage
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % STAGE_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const progress = PROGRESS_STEPS[Math.min(stage, PROGRESS_STEPS.length - 1)];

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 gap-6">
      {/* 3D Distorting Mesh — unchanged */}
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

      {/* Progress bar */}
      <div className="w-64 flex flex-col items-center gap-2">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress.pct}%` }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400">
          {progress.label} — {progress.pct}%
        </span>
      </div>

      {/* Cycling status message */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 animate-pulse">
          MATCHING IN PROGRESS
        </span>
        <p className="text-gray-300 text-sm font-light h-6 text-center transition-all duration-300">
          {STAGE_MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  );
}
