"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-full bg-[#030303] py-24 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Storytelling Text */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4"
          >
            The Vision
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-8"
          >
            Merging human aesthetics with AI expertise.
          </motion.h2>

          <div className="space-y-6 text-gray-400 font-light text-base md:text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Technology shopping is broken. Consumers face choice paralysis, biased review sites, and technical jargon designed to confuse rather than clarify. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Sujhaav was founded to create a calm, editorial guide through this noise. We process technical specs and synthesize them with your custom context—whether you are a cinematographer needing precise color accuracy or a student on a strict budget.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white font-medium"
            >
              Our recommendation system is highly curated, objective, and respects your time.
            </motion.p>
          </div>

          {/* Inline signature/philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 p-6 border-l-2 border-indigo-500 bg-white/[0.01] rounded-r-2xl"
          >
            <p className="italic text-gray-300 text-sm">
              &ldquo;We believe tech should serve your lifestyle, not the other way around. Every advice is tailored like a fine suit, fitting perfectly to your budget and constraints.&rdquo;
            </p>
            <span className="block mt-3 text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              — The Sujhaav Philosophy
            </span>
          </motion.div>
        </div>

        {/* Visual Graphic on the Right */}
        <div className="lg:col-span-5 relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/[0.08] group">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-[#030303]/20 z-10 group-hover:bg-[#030303]/0 transition-colors duration-700 pointer-events-none" />
            {/* Visual glow frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
            
            <Image
              src="/hero_abstract_tech.png"
              alt="Conceptual Tech Synthesis"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-w-7xl) 100vw, 50vw"
            />
          </motion.div>
          
          {/* Subtle floating metadata overlay to fit Flowers For Society feel */}
          <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] uppercase tracking-widest text-white/50 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            System ID: SUJ-V1.0
          </div>
        </div>
      </div>
    </section>
  );
}
