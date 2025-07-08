import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

export default function NeighborhoodDetails() {
  const { id } = useParams();
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNeighborhood = async () => {
    try {
      const res = await axios.get(`/neighborhoods/${id}`);
      setNeighborhood(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch neighborhood details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeighborhood();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!neighborhood) return <p className="text-white text-center mt-10">Neighborhood not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white space-y-8">
      {neighborhood.image && (
        <img
          src={neighborhood.image}
          alt={neighborhood.name}
          className="rounded-2xl w-full h-64 object-cover shadow-lg"
        />
      )}

      <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 space-y-4">
        <h2 className="text-4xl font-bold text-purple-700">{neighborhood.name}</h2>
        <p className="text-gray-600 text-lg">City: {neighborhood.city}</p>
        <p className="text-gray-700">{neighborhood.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 mb-2">Scores</h3>
            <ul className="space-y-1">
              <li>Safety: {neighborhood.safety}</li>
              <li>Affordability: {neighborhood.affordability}</li>
              <li>Nightlife: {neighborhood.nightlife}</li>
              <li>Parks: {neighborhood.parks}</li>
            </ul>
          </div>

          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 mb-2">Schools</h3>
            {neighborhood.schools?.length ? (
              <ul className="space-y-1">
                {neighborhood.schools.map((school, idx) => (
                  <li key={idx}>{school}</li>
                ))}
              </ul>
            ) : <p>No schools listed</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 mb-2">Hospitals</h3>
            {neighborhood.hospitals?.length ? (
              <ul className="space-y-1">
                {neighborhood.hospitals.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            ) : <p>No hospitals listed</p>}
          </div>

          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 mb-2">Markets</h3>
            {neighborhood.markets?.length ? (
              <ul className="space-y-1">
                {neighborhood.markets.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            ) : <p>No markets listed</p>}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.history.back()}
          className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
