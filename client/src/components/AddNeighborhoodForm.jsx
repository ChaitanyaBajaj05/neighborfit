import { useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

export default function AddNeighborhoodForm() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
    safety: "",
    affordability: "",
    nightlife: "",
    parks: "",
    schools: "",
    hospitals: "",
    markets: ""
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val === "")) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/neighborhoods/add", {
        ...formData,
        safety: Number(formData.safety),
        affordability: Number(formData.affordability),
        nightlife: Number(formData.nightlife),
        parks: Number(formData.parks),
        schools: formData.schools.split(",").map(s => s.trim()),
        hospitals: formData.hospitals.split(",").map(h => h.trim()),
        markets: formData.markets.split(",").map(m => m.trim())
      });
      toast.success("Neighborhood added successfully!");
      setFormData({
        name: "",
        city: "",
        description: "",
        image: "",
        safety: "",
        affordability: "",
        nightlife: "",
        parks: "",
        schools: "",
        hospitals: "",
        markets: ""
      });
      setImagePreview("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add neighborhood");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-10 space-y-8 text-gray-700">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-4">Add Neighborhood</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name" },
            { label: "City", name: "city" },
            { label: "Description", name: "description" }
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="font-semibold mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded-lg h-64 w-full object-cover shadow-lg"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Safety (1-10)", name: "safety" },
            { label: "Affordability (1-10)", name: "affordability" },
            { label: "Nightlife (1-10)", name: "nightlife" },
            { label: "Parks (1-10)", name: "parks" }
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="font-semibold mb-1">{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[
            { label: "Schools (comma separated)", name: "schools" },
            { label: "Hospitals (comma separated)", name: "hospitals" },
            { label: "Markets (comma separated)", name: "markets" }
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="font-semibold mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition text-lg font-semibold"
        >
          {loading ? "Adding..." : "Add Neighborhood"}
        </button>
      </form>
    </div>
  );
}
