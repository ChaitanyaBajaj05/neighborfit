import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NeighborhoodList({ matches }) {
  const navigate = useNavigate();

  if (!matches || matches.length === 0)
    return (
      <div className="text-white/80 text-center text-lg font-medium animate-fadeIn">
        Matching results will appear here after you submit your preferences.
      </div>
    );

  return (
    <div
      id="results-section"
      className="w-full space-y-4 animate-fadeIn"
    >
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        🎯 Top Matching Neighborhoods
      </h2>

      {matches.map((m, idx) => (
        <div
          key={idx}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-5 rounded-2xl shadow flex justify-between items-center hover:shadow-xl transition group"
        >
          <div>
            <h3 className="text-lg font-bold mb-1">
              {m.neighborhood.name}
            </h3>
            <p className="text-sm text-white/70">
              Match Score: <span className="text-pink-400 font-medium">{m.score}</span>
            </p>
          </div>
          <button
            onClick={() => navigate(`/neighborhoods/${m.neighborhood._id}`)}
            className="flex items-center gap-1 text-pink-400 font-semibold text-sm hover:underline hover:text-pink-300 transition"
          >
            <Info size={18} /> View
          </button>
        </div>
      ))}
    </div>
  );
}
