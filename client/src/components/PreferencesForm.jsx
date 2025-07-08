import { useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function PreferencesForm({ setMatches }) {
  const [formData, setFormData] = useState({
    safety: "",
    affordability: "",
    nightlife: "",
    schools: "",
    parks: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/neighborhoods/match", formData);
      setMatches(res.data);
      toast.success("Matches found successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to find matches.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 space-y-8 text-white animate-fadeIn"
      id="preferences"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-1 text-white">Your Preferences</h2>
        <p className="text-sm text-white/80">Rate each factor from 1 to 10</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 capitalize font-medium text-white/90">{field}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="px-4 py-2 rounded-lg bg-white/80 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none shadow-md"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-300 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : "Find My Matches"}
      </button>
    </form>
  );
}
