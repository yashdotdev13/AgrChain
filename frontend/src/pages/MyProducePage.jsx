import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProduces } from "../api";
import ProduceCard from "../components/ProduceCard";

export default function MyProducesPage() {
  const [produces, setProduces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchProduces = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await getAllProduces();
      setProduces(data);
      if (data.length === 0) setMessage("No produces available.");
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error fetching produces: ${err.message}`);
      setProduces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduces();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">All Produces</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("❌") ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produces.map((produce) => (
            <div
              key={produce.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-green-700">{produce.name}</h3>
              <p className="text-gray-600">Quantity: {produce.quantity}</p>
              <p className="text-gray-500 text-sm">Owner ID: {produce.currentOwnerId}</p>

              <button
                onClick={() => navigate(`/produce-history/${produce.id}`)}
                className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                View History
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
