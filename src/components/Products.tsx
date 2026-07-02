"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Products() {
  const products = [
    {
      name: "Aura Premium Audio",
      category: "Conceptual Headwear",
      tier: "Elite Series",
      image: "/conceptual_headphones.png",
      tag: "Best for Audiophiles & Creators",
      glow: "hover:border-cyan-500/20 hover:shadow-[0_0_50px_rgba(6,182,212,0.08)]",
    },
    {
      name: "Aether Watch",
      category: "Holographic Wearables",
      tier: "Prestige Series",
      image: "/conceptual_watch.png",
      tag: "Best for Productivity & Health",
      glow: "hover:border-purple-500/20 hover:shadow-[0_0_50px_rgba(168,85,247,0.08)]",
    },
    {
      name: "Pulse Smart Mobile",
      category: "Holographic Display",
      tier: "Apex Series",
      image: "/conceptual_phone.png",
      tag: "Best for Developers & Design Enthusiasts",
      glow: "hover:border-indigo-500/20 hover:shadow-[0_0_50px_rgba(99,102,241,0.08)]",
    },
  ];

  return (
    <section id="products" className="w-full bg-[#030303] py-24 relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4">
              Curated Masterpieces
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              The zenith of modern engineering.
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xs leading-relaxed">
            A small taste of the hardware we frequently analyze and matches we curate for high-end digital workflows.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border border-white/[0.04] bg-white/[0.01] overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:bg-white/[0.02] cursor-pointer ${product.glow}`}
            >
              {/* Image Container with zoom aspect */}
              <div className="relative aspect-square w-full overflow-hidden border-b border-white/[0.04]">
                {/* Floating tags */}
                <div className="absolute top-6 left-6 z-20 font-mono text-[9px] uppercase tracking-wider text-indigo-400 bg-[#030303]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                  {product.tier}
                </div>
                
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-w-7xl) 100vw, 33vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-8">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                  {product.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-glow">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  {product.tag}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
