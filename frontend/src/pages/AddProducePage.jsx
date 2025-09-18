import { useState, useEffect } from "react";
import AddProduceForm from "../components/AddProduceForm";
import { getActorsByRole, addProduce } from "../api";

export default function AddProducePage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actors, setActors] = useState([]);

  // Fetch all actors (you can filter by role if needed)
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const farmers = await getActorsByRole("FARMER");
        setActors(farmers); // you can extend this to DISTRIBUTOR/RETAILER if needed
      } catch (err) {
        console.error("Error fetching actors:", err);
      }
    };
    fetchActors();
  }, []);

  const handleAddProduce = async (formData) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await addProduce({
        ...formData,
        currentOwnerId: Number(formData.currentOwnerId)
      });
      setMessage(`✅ Produce added successfully! ID: ${response.id}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.message || "Failed to add produce"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Produce</h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg font-medium ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <AddProduceForm
        onSubmit={handleAddProduce}
        loading={loading}
        actors={actors}
      />
    </div>
  );
}
