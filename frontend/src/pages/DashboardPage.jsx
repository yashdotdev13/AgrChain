import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, Clock, PlusCircle } from "lucide-react";
import {
  getTotalProducesCount,
  getProducesCountByStatus,
  // getProducesCountByOwner // you can add owner count if needed
} from "../api"; // adjust path to your api.js file

export default function DashboardPage() {
  const navigate = useNavigate();

  // States for stats
  const [totalProduces, setTotalProduces] = useState(0);
  const [transfersDone, setTransfersDone] = useState(0);
  const [pendingTransfers, setPendingTransfers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1️⃣ Total produces
        const total = await getTotalProducesCount();
        setTotalProduces(total);

        // 2️⃣ Transferred (done transfers)
        const transferred = await getProducesCountByStatus("TRANSFERRED"); // status enum from backend
        setTransfersDone(transferred);

        // 3️⃣ Pending transfers
        const pending = await getProducesCountByStatus("PENDING"); // status enum from backend
        setPendingTransfers(pending);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-10 rounded-b-3xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white flex justify-center items-center gap-3">
          🌱 AgriChain Dashboard
        </h1>
        <p className="text-green-100 text-lg mt-3 max-w-2xl mx-auto">
          Manage produce, track transfers & monitor your supply chain seamlessly.
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center"
          >
            <Package className="text-green-600 mb-2" size={36} />
            <h2 className="text-lg font-semibold text-gray-700">Total Produces</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">{totalProduces}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center"
          >
            <Truck className="text-blue-600 mb-2" size={36} />
            <h2 className="text-lg font-semibold text-gray-700">Transfers Done</h2>
            <p className="text-3xl font-bold text-blue-700 mt-2">{transfersDone}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center"
          >
            <Clock className="text-orange-500 mb-2" size={36} />
            <h2 className="text-lg font-semibold text-gray-700">Pending Transfers</h2>
            <p className="text-3xl font-bold text-orange-500 mt-2">{pendingTransfers}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/add-produce")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow text-lg font-medium transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={22} /> Add Produce
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/my-produces")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl shadow text-lg font-medium transition flex items-center justify-center gap-2"
          >
            📦 My Produces
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/transfer-produce")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl shadow text-lg font-medium transition flex items-center justify-center gap-2"
          >
            🔄 Transfer Produce
          </motion.button>
        </div>

        {/* Recent Activity */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6 text-center">
          Recent Activity
        </h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex items-start gap-4">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
              <div className="flex justify-between w-full">
                <span className="text-gray-700">You added <b>Wheat</b></span>
                <span className="text-sm text-gray-400">2 mins ago</span>
              </div>
            </li>
            <li className="py-4 flex items-start gap-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
              <div className="flex justify-between w-full">
                <span className="text-gray-700">Transferred <b>Wheat</b> to Distributor</span>
                <span className="text-sm text-gray-400">5 mins ago</span>
              </div>
            </li>
            <li className="py-4 flex items-start gap-4">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
              <div className="flex justify-between w-full">
                <span className="text-gray-700">Added <b>Rice</b></span>
                <span className="text-sm text-gray-400">10 mins ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
