"use client";

import { useState } from "react";
import ResultsDisplay, { Recommendation } from "./ResultsDisplay";
import LoadingScene from "./LoadingScene";
import { motion, AnimatePresence } from "framer-motion";

export default function InputForm() {
  const [category, setCategory] = useState("");
  const [usage, setUsage] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  // ── Streaming: products arrive one by one ──────────────────────────
  const [streamedProducts, setStreamedProducts] = useState<Recommendation[]>([]);
  // Track loading progress message index for LoadingScene
  const [loadingStage, setLoadingStage] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStreamedProducts([]);
    setLoadingStage(0);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, usage, budget, preferences }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // ── Read streaming chunks ──────────────────────────────────────
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Each product is sent as one JSON line
        const lines = buffer.split("\n");
        // Keep the last (possibly incomplete) line in the buffer
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line) as {
              index: number;
              product: Recommendation;
            };
            // Add product to the list as it arrives
            setStreamedProducts((prev) => {
              const updated = [...prev];
              updated[parsed.index] = parsed.product;
              return updated;
            });
            // Advance loading stage so messages cycle nicely
            setLoadingStage(parsed.index + 1);
          } catch {
            // Partial chunk — wait for more data
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show results panel as soon as the FIRST product arrives
  const hasResults = streamedProducts.length > 0;

  return (
    <section
      id="advisor"
      className="w-full min-h-screen bg-[#030303] py-32 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background lights */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Info Side */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 block mb-4">
              Real-time Calibration
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Calibrate your tech profile.
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Adjust the parameter inputs. Our neural synth engine will scan
              active specifications, verify performance ratios, and present 3
              curated options matching your usage threshold.
            </p>

            <div className="space-y-4 border-t border-white/[0.08] pt-8">
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Core: Gemini-2.5-Flash</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Neutral Matrix: Enabled (No affiliate bias)</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span>Curation Pool: Active Specs Database</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden glow-indigo"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    01 // What category are you scanning?
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full bg-[#0c0c0e] text-white border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all cursor-pointer text-sm"
                  >
                    <option value="" className="bg-[#030303]">Select device category</option>
                    <option value="smartphone" className="bg-[#030303]">Smartphone</option>
                    <option value="laptop" className="bg-[#030303]">Laptop</option>
                    <option value="headphones" className="bg-[#030303]">Headphones / Earbuds</option>
                    <option value="smartwatch" className="bg-[#030303]">Smartwatch</option>
                    <option value="other" className="bg-[#030303]">Other Accessories</option>
                  </select>
                </div>

                {/* Usage */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    02 // Define your primary usage environment
                  </label>
                  <input
                    type="text"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    required
                    placeholder="e.g. 4k video editing, competitive FPS gaming, daily university coding"
                    className="w-full bg-[#0c0c0e] text-white border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all placeholder-gray-600 text-sm"
                  />
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    03 // Select your calibration budget (INR)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    className="w-full bg-[#0c0c0e] text-white border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all cursor-pointer text-sm"
                  >
                    <option value="" className="bg-[#030303]">Select budget range</option>
                    <option value="under-15k" className="bg-[#030303]">Under ₹15,000</option>
                    <option value="15k-30k" className="bg-[#030303]">₹15,000 – ₹30,000</option>
                    <option value="30k-50k" className="bg-[#030303]">₹30,000 – ₹50,000</option>
                    <option value="50k-1l" className="bg-[#030303]">₹50,000 – ₹1,00,000</option>
                    <option value="above-1l" className="bg-[#030303]">Above ₹1,00,000</option>
                  </select>
                </div>

                {/* Preferences */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    04 // Additional preferences (Optional)
                  </label>
                  <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="e.g. prefer matte screen, lightweight build, minimum 10-hour battery, metal body"
                    rows={3}
                    className="w-full bg-[#0c0c0e] text-white border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all placeholder-gray-600 resize-none text-sm leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white font-semibold tracking-wider uppercase text-xs overflow-hidden transition-all duration-300 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"
                >
                  {loading
                    ? "Synthesizing recommendations..."
                    : "Synthesize Recommendations"}
                </button>
              </form>

              {/* Loading overlay — only shown while loading AND no results yet */}
              <AnimatePresence>
                {loading && !hasResults && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#030303]/90 backdrop-blur-md flex flex-col items-center justify-center z-20"
                  >
                    <LoadingScene stage={loadingStage} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Results — appear as products stream in */}
        <AnimatePresence>
          {hasResults && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 w-full"
            >
              <ResultsDisplay
                recommendations={streamedProducts}
                isStreaming={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
