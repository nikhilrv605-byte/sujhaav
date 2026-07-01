"use client";
import ResultsDisplay from "./ResultsDisplay";
import { useState } from "react";
import LoadingScene from "./LoadingScene";

export default function InputForm() {
  const [category, setCategory] = useState("");
  const [usage, setUsage] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
const [loading, setLoading] = useState(false);
const [results, setResults] = useState<any>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setResults(null);

  try {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, usage, budget, preferences }),
    });
    const data = await res.json();
    setResults(data);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Tell us what you need
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Answer a few quick questions and get tailored recommendations.
        </p>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-white mb-2 font-medium">
              What are you looking for?
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="headphones">Headphones / Earbuds</option>
              <option value="smartwatch">Smartwatch</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Usage */}
          <div>
            <label className="block text-white mb-2 font-medium">
              What will you mainly use it for?
            </label>
            <input
              type="text"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              placeholder="e.g. gaming, college work, content creation"
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 placeholder-gray-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-white mb-2 font-medium">
              What's your budget? (₹)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a range</option>
              <option value="under-15k">Under ₹15,000</option>
              <option value="15k-30k">₹15,000 – ₹30,000</option>
              <option value="30k-50k">₹30,000 – ₹50,000</option>
              <option value="50k-1l">₹50,000 – ₹1,00,000</option>
              <option value="above-1l">Above ₹1,00,000</option>
            </select>
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Any specific preferences? <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g. prefer Samsung, need long battery life, lightweight"
              rows={3}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 placeholder-gray-500 resize-none"
            />
          </div>

<button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-colors"
>
  {loading ? "Finding the best picks..." : "Get Recommendations"}
</button>

{loading && <LoadingScene />}

{results?.recommendations && (
  <ResultsDisplay recommendations={results.recommendations} />
)}
        </div>
      </div>
    </section>
  );
}