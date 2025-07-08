import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Users, MapPin, FileEdit, CheckCircle, AlertCircle, PlusCircle } from "lucide-react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ user }) {
  const [neighborhoodCount, setNeighborhoodCount] = useState(0);
  const [editRequests, setEditRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const neighborhoodsRes = await axios.get("/neighborhoods");
      setNeighborhoodCount(neighborhoodsRes.data.length);

      const requestsRes = await axios.get("/neighborhoods/edit-requests");
      setEditRequests(requestsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (req) => {
    try {
      await axios.put(`/neighborhoods/${req.neighborhoodId}`, req.requestedData);
      await axios.delete(`/neighborhoods/edit-requests/${req._id}`);
      toast.success("Request approved & neighborhood updated!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`/neighborhoods/edit-requests/${id}`);
      toast.success("Request rejected!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user?.role !== "admin") {
    return <p className="text-center text-white">Unauthorized</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white text-gray-700 p-6 rounded-xl shadow flex items-center space-x-4">
          <MapPin size={36} className="text-purple-600" />
          <div>
            <p className="text-xl font-bold">{neighborhoodCount}</p>
            <p className="text-sm">Total Neighborhoods</p>
          </div>
        </div>

        <div className="bg-white text-gray-700 p-6 rounded-xl shadow flex items-center space-x-4">
          <FileEdit size={36} className="text-yellow-500" />
          <div>
            <p className="text-xl font-bold">{editRequests.length}</p>
            <p className="text-sm">Pending Edit Requests</p>
          </div>
        </div>

        <div className="bg-white text-gray-700 p-6 rounded-xl shadow flex items-center space-x-4">
          <Users size={36} className="text-green-600" />
          <div>
            <p className="text-xl font-bold">Admin</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/add")}
          className="bg-purple-600 text-white p-6 rounded-xl shadow flex items-center space-x-4 cursor-pointer hover:bg-purple-700 transition"
        >
          <PlusCircle size={36} />
          <div>
            <p className="text-xl font-bold">Add</p>
            <p className="text-sm">New Neighborhood</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Edit Requests</h3>
      {loading ? (
        <p>Loading...</p>
      ) : editRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {editRequests.map((req) => (
            <div key={req._id} className="bg-white text-gray-700 p-4 rounded-lg shadow space-y-2">
              <h3 className="text-lg font-semibold">Requested by: {req.requestedBy}</h3>
              <p className="text-sm text-gray-600">Neighborhood ID: {req.neighborhoodId}</p>
              <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(req.requestedData, null, 2)}</pre>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(req)}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1"
                >
                  <CheckCircle size={18} /> Approve
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center gap-1"
                >
                  <AlertCircle size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
