import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";

export default function EditRequestsPage({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/neighborhoods/edit-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (req) => {
    try {
      await axios.put(`/neighborhoods/${req.neighborhoodId}`, req.requestedData);
      await axios.delete(`/neighborhoods/edit-requests/${req._id}`);
      toast.success("Request approved & neighborhood updated!");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`/neighborhoods/edit-requests/${id}`);
      toast.success("Request rejected!");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (user?.role !== "admin") {
    return <p className="text-center text-white">Unauthorized</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white text-gray-700 p-4 rounded-lg shadow space-y-2">
              <h3 className="text-lg font-semibold">Requested by: {req.requestedBy}</h3>
              <p className="text-sm text-gray-600">Neighborhood ID: {req.neighborhoodId}</p>
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(req.requestedData, null, 2)}
              </pre>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(req)}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
