import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

export default function NeighborhoodListPage({ user }) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    city: "",
    description: "",
    safety: "",
    affordability: "",
    nightlife: "",
    parks: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchNeighborhoods = async () => {
    try {
      const res = await axios.get("/neighborhoods");
      setNeighborhoods(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch neighborhoods");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this neighborhood?")) return;
    try {
      await axios.delete(`/neighborhoods/${id}`);
      toast.success("Neighborhood deleted successfully!");
      fetchNeighborhoods();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete neighborhood");
    }
  };

  const handleEdit = (n) => {
    setEditId(n._id);
    setEditFormData({
      name: n.name,
      city: n.city,
      description: n.description,
      safety: n.safety,
      affordability: n.affordability,
      nightlife: n.nightlife,
      parks: n.parks
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (user?.role === "admin") {
        await axios.put(`/neighborhoods/${editId}`, {
          ...editFormData,
          safety: Number(editFormData.safety),
          affordability: Number(editFormData.affordability),
          nightlife: Number(editFormData.nightlife),
          parks: Number(editFormData.parks)
        });
        toast.success("Neighborhood updated successfully!");
      } else {
        await axios.post("/neighborhoods/edit-request", {
          neighborhoodId: editId,
          requestedData: {
            ...editFormData,
            safety: Number(editFormData.safety),
            affordability: Number(editFormData.affordability),
            nightlife: Number(editFormData.nightlife),
            parks: Number(editFormData.parks)
          },
          requestedBy: user.email
        });
        toast.success("Edit request sent for admin approval!");
      }
      setEditId(null);
      fetchNeighborhoods();
    } catch (err) {
      console.error(err);
      toast.error("Failed to process update");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const filteredNeighborhoods = neighborhoods.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">All Neighborhoods</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
      />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredNeighborhoods.length === 0 ? (
        <p className="text-center">No neighborhoods found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((n) => (
            <div key={n._id} className="bg-white text-gray-700 p-4 rounded-xl shadow-lg flex flex-col">
              {n.image && (
                <img
                  src={n.image}
                  alt={n.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">
                {n.name} <span className="text-sm text-gray-500">({n.city})</span>
              </h3>
              <p className="mb-2 text-sm text-gray-600">{n.description}</p>

              <ul className="text-sm space-y-1">
                <li><strong>Safety:</strong> {n.safety}</li>
                <li><strong>Affordability:</strong> {n.affordability}</li>
                <li><strong>Nightlife:</strong> {n.nightlife}</li>
                <li><strong>Parks:</strong> {n.parks}</li>
              </ul>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => window.location.href = `/neighborhoods/${n._id}`}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  View
                </button>

                <button
                  onClick={() => handleEdit(n)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editId && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setEditId(null)} />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white text-gray-700 shadow-xl p-6 space-y-4 z-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Edit Neighborhood</h3>

            {["name", "city", "description", "safety", "affordability", "nightlife", "parks"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="font-medium mb-1 capitalize">{field}</label>
                <input
                  type={["safety", "affordability", "nightlife", "parks"].includes(field) ? "number" : "text"}
                  name={field}
                  value={editFormData[field]}
                  onChange={handleEditChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}

            <div className="flex space-x-2 mt-4">
              <button
                type="button"
                onClick={handleEditSubmit}
                disabled={submitting}
                className={`flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 ${submitting && "opacity-50 cursor-not-allowed"}`}
              >
                {user?.role === "admin" ? "Update" : "Request Edit"}
              </button>
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
