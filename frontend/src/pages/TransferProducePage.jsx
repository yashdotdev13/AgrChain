import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProduces, getActorsByRole, transferProduce } from "../api";
import TransferForm from "../components/TransferForm";

export default function TransferProducePage() {
  const [produces, setProduces] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all produces
  const fetchProduces = async () => {
    try {
      const data = await getAllProduces();

      // Map produces to include currentOwnerName if available
      const mapped = data.map((p) => ({
        ...p,
        currentOwnerName: p.currentOwner?.name || `Owner ID: ${p.currentOwnerId}`,
      }));

      setProduces(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all receivers (distributors + retailers)
  const fetchReceivers = async () => {
    try {
      const distributors = await getActorsByRole("DISTRIBUTOR");
      const retailers = await getActorsByRole("RETAILER");
      setReceivers([...distributors, ...retailers]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduces();
    fetchReceivers();
  }, []);

  // Handle form submission
  const handleTransferSubmit = async (formData) => {
    if (!formData.produceId || !formData.toActorId) return;

    const produce = produces.find((p) => p.id === Number(formData.produceId));
    if (!produce) return;

    setLoading(true);
    setMessage("");

    try {
      await transferProduce({
        produceId: Number(formData.produceId),
        fromActorId: Number(produce.currentOwnerId),
        toActorId: Number(formData.toActorId),
        status: formData.status || undefined,
        reason: formData.reason || undefined,
        comments: formData.comments || undefined,
      });

      setMessage("✅ Produce transferred successfully!");
      fetchProduces();
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Transfer Produce</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg font-medium ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* Transfer Form */}
      <TransferForm
        produces={produces}
        receivers={receivers}
        onSubmit={handleTransferSubmit}
      />

      {/* All Produces Section */}
      {produces.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Produces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {produces.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-green-700">{p.name}</h3>
                <p className="text-gray-600">Quantity: {p.quantity}</p>
                <p className="text-gray-500 text-sm">Owner: {p.currentOwnerName}</p>
                <p className="text-gray-500 text-sm">Status: {p.status}</p>

                <button
                  onClick={() => navigate(`/produce-history/${p.id}`)}
                  className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  View History
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
