"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Sujhaav completely solved my buying anxiety. I was looking for a laptop for ML research and gaming. It bypassed all sponsor ads and recommended a specific legion model that had perfect thermals. A absolute game changer.",
      author: "Vikram Sharma",
      role: "AI Research Engineer",
      rating: 5,
    },
    {
      quote: "The visual curation and editorial presentation of Sujhaav feels premium, and their recommendations are remarkably accurate. It recommended a clean setup matching my Apple ecosystem perfectly.",
      author: "Aditi Rao",
      role: "Independent Art Director",
      rating: 5,
    },
    {
      quote: "As a student with tight budget constraints, I was worried about wasting money. Sujhaav's advisor recommended a specific budget phone I hadn't even considered. It fits my daily college workload flawlessly.",
      author: "Rohan Das",
      role: "Computer Science Undergraduate",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="w-full bg-[#030303] py-24 relative overflow-hidden">
      {/* Background soft ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-pink-500/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4">
          User Voices
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-16">
          Loved by visual curators & creators.
        </h2>

        {/* Interactive Quote Container */}
        <div className="relative min-h-[300px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-10 md:p-16 rounded-3xl w-full text-center relative overflow-hidden"
            >
              {/* Giant quote mark back decoration */}
              <div className="absolute -top-6 -left-6 font-display text-[120px] text-white/[0.02] select-none pointer-events-none">
                “
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1.5 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              <div>
                <cite className="not-italic font-display font-bold text-lg text-white block">
                  {testimonials[activeIndex].author}
                </cite>
                <span className="text-xs text-gray-500 font-mono tracking-widest mt-1 block">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-indigo-500/40 bg-white/[0.02] hover:bg-white/[0.04] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-8 bg-indigo-500" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-indigo-500/40 bg-white/[0.02] hover:bg-white/[0.04] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
