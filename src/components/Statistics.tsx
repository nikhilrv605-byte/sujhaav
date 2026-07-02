"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}

function StatItem({ value, suffix = "", decimals = 0, label, description }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const increment = end / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col p-8 border border-white/[0.04] bg-white/[0.01] rounded-2xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-500">
      {/* Background glow hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <span className="font-display text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
        {count.toFixed(decimals)}
        {suffix}
      </span>
      <span className="text-sm font-semibold tracking-wider text-indigo-400 uppercase mb-4">
        {label}
      </span>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Statistics() {
  const stats = [
    {
      value: 99.4,
      suffix: "%",
      decimals: 1,
      label: "Recommendation Accuracy",
      description: "Tested and refined AI models aligning tech specs with direct user preferences.",
    },
    {
      value: 4.9,
      suffix: "/5",
      decimals: 1,
      label: "User Satisfaction Score",
      description: "Highly rated by audiophiles, gamers, developers, and everyday tech buyers.",
    },
    {
      value: 120,
      suffix: "k+",
      decimals: 0,
      label: "Decisions Guided",
      description: "Saving hundreds of hours of research and preventing bad purchase returns.",
    },
    {
      value: 0.08,
      suffix: "s",
      decimals: 2,
      label: "Average Query Speed",
      description: "Powered by custom LLM prompt architectures for real-time comparative matching.",
    },
  ];

  return (
    <section id="statistics" className="w-full bg-[#030303] py-24 border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
