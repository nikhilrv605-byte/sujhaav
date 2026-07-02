"use client";

import { motion } from "framer-motion";

type Recommendation = {
  name: string;
  price: string;
  why: string;
};

type ResultsDisplayProps = {
  recommendations: Recommendation[];
};

export default function ResultsDisplay({ recommendations }: ResultsDisplayProps) {
  if (!recommendations || recommendations.length === 0) return null;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="w-full border-t border-white/[0.08] pt-20">
      <div className="text-center mb-12">
        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
          Match Output Successful
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
          Your Curated Tech Array
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {recommendations.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-500/30 hover:shadow-[0_0_50px_rgba(99,102,241,0.08)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Number indicators for premium tech touch */}
            <div className="absolute top-6 right-8 font-mono text-xs text-white/10 group-hover:text-indigo-400/20 transition-colors">
              {"// REQ-"}{index + 1}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-4">
                Recommended Option
              </span>
              <h4 className="font-display text-2xl font-bold text-white mb-2 leading-tight group-hover:text-glow">
                {item.name}
              </h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                {item.why}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] pt-6 mt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Estimated Price
              </span>
              <span className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                {item.price}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}