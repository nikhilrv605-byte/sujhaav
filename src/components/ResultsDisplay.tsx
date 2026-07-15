"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type Recommendation = {
  name: string;
  price: string;
  rating: number;
  why: string;
  image: string;
  specs: {
    Display: string;
    Processor: string;
    Camera: string;
    Battery: string;
    Memory: string;
  };
  pros: string[];
  cons: string[];
};

type ResultsDisplayProps = {
  recommendations: (Recommendation | undefined)[];
  /** true while streaming is still in progress */
  isStreaming?: boolean;
};

// ── Skeleton card shown while a product slot is still loading ─────────────
function SkeletonCard() {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-[4/3] w-full bg-white/[0.03] border-b border-white/[0.04]" />
      <div className="p-8 flex flex-col gap-4">
        <div className="h-6 bg-white/[0.05] rounded-lg w-3/4" />
        <div className="h-4 bg-white/[0.03] rounded-lg w-1/3" />
        <div className="h-3 bg-white/[0.03] rounded-lg w-full" />
        <div className="h-3 bg-white/[0.03] rounded-lg w-5/6" />
      </div>
    </div>
  );
}

export default function ResultsDisplay({
  recommendations,
  isStreaming = false,
}: ResultsDisplayProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  // Always render 3 slots — filled or skeleton
  const slots: (Recommendation | undefined)[] = [
    recommendations[0],
    recommendations[1],
    recommendations[2],
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // Only allow expansion on fully loaded cards
  const handleCardClick = (index: number) => {
    if (!slots[index]) return;
    setSelectedProduct(selectedProduct === index ? null : index);
  };

  const selectedItem =
    selectedProduct !== null ? slots[selectedProduct] : undefined;

  return (
    <div className="w-full border-t border-white/[0.08] pt-20">
      <div className="text-center mb-16">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400">
          Neural Curation Active
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
          Your Curated Tech Array
        </h3>
        <p className="text-gray-400 text-sm mt-4 font-light">
          {isStreaming
            ? "Products are appearing as our AI finishes analysing each one..."
            : "Click any card to focus details, or explore the side-by-side comparison matrix below."}
        </p>
      </div>

      {/* ── Product Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {slots.map((item, index) => {
          if (!item) {
            // Show skeleton while this slot is still loading
            return (
              <motion.div key={index} variants={itemVariants}>
                <SkeletonCard />
              </motion.div>
            );
          }

          const isSelected = selectedProduct === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => handleCardClick(index)}
              className={`glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-500 cursor-pointer hover:bg-white/[0.02] ${
                isSelected
                  ? "border-indigo-500 ring-1 ring-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.15)] scale-[1.02]"
                  : "hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full bg-white/[0.01] border-b border-white/[0.04] p-6 flex items-center justify-center overflow-hidden">
                <span className="absolute top-4 left-4 z-10 font-mono text-[9px] uppercase tracking-wider text-indigo-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                  Rating: {item.rating} / 10
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || "/hero_abstract_tech.png"}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/hero_abstract_tech.png";
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display text-2xl font-bold text-white group-hover:text-glow leading-tight">
                      {item.name}
                    </h4>
                    <span className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                    {item.why}
                  </p>
                </div>

                <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-white transition-colors duration-300">
                  <span>{isSelected ? "Collapse Profile" : "View Core Specs"}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      isSelected ? "rotate-180" : "group-hover:translate-x-1"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Expanded Product Profile ── */}
      <AnimatePresence>
        {selectedProduct !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mb-16 overflow-hidden"
          >
            <div className="glass-panel p-8 md:p-12 rounded-3xl glow-indigo border-indigo-500/20 grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Specs */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <h4 className="font-display text-2xl font-bold text-white">
                  {selectedItem.name} — Specification Sheet
                </h4>
                <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
                  {Object.entries(selectedItem.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm"
                    >
                      <span className="font-mono text-gray-500 font-medium uppercase tracking-wider">
                        {key}
                      </span>
                      <span className="sm:col-span-3 text-gray-300 font-light">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros / Cons + Buy links */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest mb-4">
                      {"// PROS"}
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-300 font-light">
                      {selectedItem.pros.map((pro, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-rose-400 font-bold uppercase tracking-widest mb-4">
                      {"// CONS"}
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-300 font-light">
                      {selectedItem.cons.map((con, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="text-rose-400 font-bold">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Store links */}
                <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-6">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Store Search Redirects
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(selectedItem.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-[#FF9900]/10 hover:bg-[#FF9900]/20 border border-[#FF9900]/25 text-[#FF9900] font-semibold text-center text-xs tracking-wider uppercase transition-colors"
                    >
                      Search on Amazon
                    </a>
                    <a
                      href={`https://www.flipkart.com/search?q=${encodeURIComponent(selectedItem.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-[#2874F0]/10 hover:bg-[#2874F0]/20 border border-[#2874F0]/25 text-[#2874F0] font-semibold text-center text-xs tracking-wider uppercase transition-colors"
                    >
                      Search on Flipkart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Comparison Matrix — only show when all 3 products are loaded ── */}
      <AnimatePresence>
        {slots.every(Boolean) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <h4 className="font-display text-2xl font-bold text-white mb-8 border-b border-white/[0.08] pb-4">
              Side-by-Side Comparison Matrix
            </h4>
            <div className="overflow-x-auto border border-white/[0.08] rounded-3xl bg-white/[0.01]">
              <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500 w-1/4">
                      Specs Parameter
                    </th>
                    {(slots as Recommendation[]).map((item, i) => (
                      <th key={i} className="p-6 font-display text-lg font-bold text-white w-1/4">
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-gray-300 font-light">
                  {/* Device render */}
                  <tr>
                    <td className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500">Device render</td>
                    {(slots as Recommendation[]).map((item, i) => (
                      <td key={i} className="p-6">
                        <div className="w-24 h-24 bg-white/[0.01] border border-white/5 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Price */}
                  <tr>
                    <td className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500">Price tag</td>
                    {(slots as Recommendation[]).map((item, i) => (
                      <td key={i} className="p-6 font-mono text-base font-bold text-indigo-400">{item.price}</td>
                    ))}
                  </tr>
                  {/* Rating */}
                  <tr>
                    <td className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500">Overall Rating</td>
                    {(slots as Recommendation[]).map((item, i) => (
                      <td key={i} className="p-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/25 text-violet-400">
                          {item.rating} / 10
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Specs rows */}
                  {(["Display", "Processor", "Camera", "Battery", "Memory"] as const).map((key) => (
                    <tr key={key}>
                      <td className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500">{key}</td>
                      {(slots as Recommendation[]).map((item, i) => (
                        <td key={i} className="p-6 text-sm">{item.specs[key]}</td>
                      ))}
                    </tr>
                  ))}
                  {/* Action links */}
                  <tr>
                    <td className="p-6 font-mono text-xs uppercase tracking-widest text-gray-500">Action Link</td>
                    {(slots as Recommendation[]).map((item, i) => (
                      <td key={i} className="p-6">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a
                            href={`https://www.amazon.in/s?k=${encodeURIComponent(item.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg bg-[#FF9900]/10 hover:bg-[#FF9900]/25 text-[#FF9900] font-semibold text-center text-[10px] tracking-wider uppercase transition-colors"
                          >
                            Amazon
                          </a>
                          <a
                            href={`https://www.flipkart.com/search?q=${encodeURIComponent(item.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg bg-[#2874F0]/10 hover:bg-[#2874F0]/25 text-[#2874F0] font-semibold text-center text-[10px] tracking-wider uppercase transition-colors"
                          >
                            Flipkart
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
