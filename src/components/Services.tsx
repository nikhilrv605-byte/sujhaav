"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      title: "Ecosystem Calibration",
      description: "We analyze your current hardware array (iOS, Android, macOS, Windows) to ensure that any new recommendation fits seamlessly and enhances your overall workflow connectivity.",
      tag: "Ecosystem Sync",
    },
    {
      num: "02",
      title: "Benchmark Validation Audits",
      description: "Our backend reviews actual user telemetry data, independent lab benchmarks, and hardware fault reports to confirm that recommended devices deliver on their marketing promises.",
      tag: "Spec Verification",
    },
    {
      num: "03",
      title: "Budget Optimization Calibration",
      description: "We prevent overspending by mapping user usage limits to actual hardware parameters, ensuring you don't purchase overkill specs that sit dormant.",
      tag: "Finance Efficiency",
    },
    {
      num: "04",
      title: "Workflow Specialization Audits",
      description: "Customized presets matching parameters for specialized users, including colorists, machine learning researchers, high-refresh gamers, and professional copywriters.",
      tag: "Custom Presets",
    },
  ];

  return (
    <section id="services" className="w-full bg-[#030303] py-24 relative overflow-hidden">
      {/* Glow circles */}
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4">
            Curated Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Curated analysis, bespoke results.
          </h2>
        </div>

        {/* Services List Table */}
        <div className="flex flex-col border-t border-white/[0.08]">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative py-12 md:py-16 border-b border-white/[0.08] cursor-pointer group transition-colors duration-500"
            >
              {/* Dynamic background highlight */}
              <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start px-4 md:px-8">
                {/* Index Num */}
                <div className="md:col-span-1 font-mono text-sm text-gray-600 group-hover:text-indigo-400 transition-colors duration-300">
                  {service.num}
                </div>

                {/* Title & Tag */}
                <div className="md:col-span-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 bg-white/[0.03] border border-white/5 px-2 py-1 rounded-md mb-3 inline-block">
                    {service.tag}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-glow">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-6 text-gray-400 font-light text-sm md:text-base leading-relaxed">
                  {service.description}
                </div>

                {/* Arrow indicator */}
                <div className="md:col-span-1 flex md:justify-end justify-start self-center">
                  <motion.div
                    animate={{
                      x: hoveredIndex === index ? 5 : 0,
                      color: hoveredIndex === index ? "#6366f1" : "#4b5563",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
