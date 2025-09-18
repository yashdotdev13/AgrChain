import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduceHistory } from "../api";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProduceHistoryPage() {
  const { id: produceId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getProduceHistory(produceId);
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (produceId) fetchHistory();
  }, [produceId]);

  if (loading) return <p className="p-4">Loading history...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
        🚚 Produce Journey History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">
          No history available for this produce.
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-start gap-6 mb-8"
            >
              {/* Actor flow */}
              <div className="flex flex-col items-center">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow">
                  {item.fromActorName}
                </div>
                <ArrowRight className="text-green-500 my-2" size={28} />
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow">
                  {item.toActorName}
                </div>
              </div>

              {/* Details */}
              <div className="ml-6 flex-1 text-gray-700">
                <p>
                  <span className="font-medium">Transferred At:</span>{" "}
                  {new Date(item.transferredAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {item.status}
                </p>
                <p>
                  <span className="font-medium">Reason:</span> {item.reason}
                </p>
                {item.comments && (
                  <p>
                    <span className="font-medium">Comments:</span> {item.comments}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
