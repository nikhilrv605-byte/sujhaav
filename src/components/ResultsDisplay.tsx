"use client";

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

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Your Recommendations
      </h3>

      {recommendations.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4 className="text-xl font-semibold text-white">{item.name}</h4>
            <span className="text-indigo-400 font-bold whitespace-nowrap">
              {item.price}
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">{item.why}</p>
        </div>
      ))}
    </div>
  );
}