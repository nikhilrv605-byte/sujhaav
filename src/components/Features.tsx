"use client";

import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Neural Comparison Engine",
      description: "Our algorithm processes hundreds of technical specifications and performance benchmarks, translating raw hardware stats into actual real-world utility.",
      icon: (
        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      glow: "hover:shadow-[0_0_50px_rgba(99,102,241,0.12)] hover:border-indigo-500/30",
    },
    {
      title: "Absolute Vendor Neutrality",
      description: "Sujhaav accepts no promotional commissions or corporate sponsorships. Our recommendations are strictly unbiased and driven by matching metrics.",
      icon: (
        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      glow: "hover:shadow-[0_0_50px_rgba(236,72,153,0.12)] hover:border-pink-500/30",
    },
    {
      title: "Deep Context Synthesis",
      description: "Instead of simplistic filters, we synthesize your budget, subjective taste, usage quirks, and ecosystem constraints to give a holistic verdict.",
      icon: (
        <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      glow: "hover:shadow-[0_0_50px_rgba(139,92,246,0.12)] hover:border-violet-500/30",
    },
  ];

  return (
    <section id="features" className="w-full bg-[#030303] py-24 relative overflow-hidden">
      {/* Background radial gradient lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/300" /> {/* Hide or soften this */}
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Crafting the future of tech recommendation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed"
          >
            We remove the guesswork, specification jargon, and sponsor bias.
            Our models isolate absolute utility so you buy once and buy right.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`p-10 rounded-3xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.02] hover:-translate-y-2 cursor-default group ${feature.glow}`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-glow">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light text-sm">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-white/50 group-hover:text-white transition-colors duration-300">
                Learn more
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
