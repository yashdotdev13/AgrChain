import { motion, AnimatePresence } from "framer-motion";

export default function ProduceDetailModal({ produce, onClose }) {
  if (!produce) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold text-green-700 mb-2">{produce.name}</h2>
          <p className="text-gray-600 mb-4">{produce.description}</p>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-700">Quantity:</span>{" "}
              {produce.quantity}
            </p>
            <p>
              <span className="font-medium text-gray-700">Owner ID:</span>{" "}
              {produce.currentOwnerId}
            </p>
            {produce.status && (
              <p>
                <span className="font-medium text-gray-700">Status:</span>{" "}
                {produce.status}
              </p>
            )}
            {produce.txHash && (
              <p className="break-all">
                <span className="font-medium text-gray-700">Blockchain TX:</span>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${produce.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {produce.txHash}
                </a>
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
