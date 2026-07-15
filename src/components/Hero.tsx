"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function ParticleSwarm() {
  const sphereRef = useRef<THREE.Points>(null);
  const ringARef = useRef<THREE.Points>(null);
  const ringBRef = useRef<THREE.Points>(null);

  const sphereCount = 1000;
  const ringCount = 350;

  // Pure Local LCG random number generator
  let seed = 42;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const sphereData = useMemo(() => {
    const pos = new Float32Array(sphereCount * 3);
    const initPos = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      const u = random();
      const v = random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.5 + random() * 0.6;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      initPos[i * 3] = pos[i * 3];
      initPos[i * 3 + 1] = pos[i * 3 + 1];
      initPos[i * 3 + 2] = pos[i * 3 + 2];
    }
    return { pos, initPos };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ringAData = useMemo(() => {
    const pos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const theta = (i / ringCount) * 2.0 * Math.PI;
      const r = 2.2 + (random() - 0.5) * 0.15;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (random() - 0.5) * 0.1;
      pos[i * 3 + 2] = r * Math.sin(theta);
    }
    return pos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ringBData = useMemo(() => {
    const pos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const theta = (i / ringCount) * 2.0 * Math.PI;
      const r = 2.4 + (random() - 0.5) * 0.15;
      pos[i * 3] = (random() - 0.5) * 0.1;
      pos[i * 3 + 1] = r * Math.cos(theta);
      pos[i * 3 + 2] = r * Math.sin(theta);
    }
    return pos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    // 1. Distort core sphere
    if (sphereRef.current) {
      const posArr = sphereRef.current.geometry.attributes.position.array as Float32Array;
      const init = sphereData.initPos;
      const mouseDist = Math.sqrt(px * px + py * py);
      const intensity = 0.05 + mouseDist * 0.15;

      for (let i = 0; i < sphereCount; i++) {
        const idx = i * 3;
        const ix = init[idx];
        const iy = init[idx + 1];
        const iz = init[idx + 2];
        const offset = time * 0.5 + (ix + iy) * 0.2;
        const wave = Math.sin(offset) * intensity;

        posArr[idx] = ix + Math.cos(time * 0.2 + iy) * 0.05 + px * wave;
        posArr[idx + 1] = iy + Math.sin(time * 0.2 + ix) * 0.05 + py * wave;
        posArr[idx + 2] = iz + wave;
      }
      sphereRef.current.geometry.attributes.position.needsUpdate = true;
      sphereRef.current.rotation.y = time * 0.04;
      sphereRef.current.rotation.x = time * 0.02;
    }

    // 2. Rotate Ring A
    if (ringARef.current) {
      ringARef.current.rotation.y = time * 0.15;
      ringARef.current.rotation.x = py * 0.25;
      ringARef.current.rotation.z = px * 0.25;
    }

    // 3. Rotate Ring B
    if (ringBRef.current) {
      ringBRef.current.rotation.x = -time * 0.12;
      ringBRef.current.rotation.y = px * 0.25;
      ringBRef.current.rotation.z = py * 0.25;
    }
  });

  return (
    <group>
      {/* Core Sphere Swarm */}
      <points ref={sphereRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sphereData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#6366f1"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbit Ring A */}
      <points ref={ringARef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ringAData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ec4899"
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbit Ring B */}
      <points ref={ringBRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ringBData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          color="#22d3ee"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Hero() {
  const handleScrollToAdvisor = () => {
    const el = document.getElementById("advisor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="w-full h-screen relative bg-[#030303] overflow-hidden flex items-center justify-center">
      {/* Background Soft Glow Bulbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* R3F Interactive Scene */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-5, -5, -5]} intensity={1.0} color="#ec4899" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <ParticleSwarm />
          </Float>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400 mb-6 block"
        >
          SUJHAAV AI ADVISOR
        </motion.span>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl mb-8">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            BE BESPOKE.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
          >
            DECIDE NEUTRAL.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-gray-400 font-light text-base md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          Navigate the tech space with an independent, neural advisor.
          Spec-matched algorithms configured for creative professionals, developers, and collectors.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="pointer-events-auto"
        >
          <button
            onClick={handleScrollToAdvisor}
            className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 hover:scale-105 active:scale-95 duration-300 text-black font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            Calibrate Advisor
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.0 }}
        onClick={handleScrollToAdvisor}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-gray-500 hover:text-white transition-colors duration-300 z-10"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}