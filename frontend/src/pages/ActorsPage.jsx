import { useEffect, useState } from "react";
import { getActorsByRole } from "../api";
import ActorCard from "../components/ActorCard";

export default function ActorsPage() {
  const [actors, setActors] = useState([]);
  const [roleFilter, setRoleFilter] = useState("FARMER");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchActors = async () => {
    setLoading(true);
    try {
      const data = await getActorsByRole(roleFilter); // API returns clean array
      setActors(data);

      if (data.length === 0) {
        setMessage("No actors found for this role.");
      } else {
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error fetching actors: ${err.response?.data?.message || err.message}`);
      setActors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (actor) => {
    alert(
      `Actor Details:\nName: ${actor.name}\nRole: ${actor.role}\nWallet: ${actor.walletAddress}`
    );
  };

  useEffect(() => {
    fetchActors();
  }, [roleFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Actors Directory</h1>

      {/* Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="font-medium text-gray-700">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="FARMER">Farmer</option>
          <option value="DISTRIBUTOR">Distributor</option>
          <option value="RETAILER">Retailer</option>
        </select>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`mb-6 p-3 rounded ${
            message.startsWith("❌") ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mb-6 text-center text-gray-500 font-medium">Loading actors...</div>
      )}

      {/* Actor cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors.length > 0 ? (
          actors.map((actor) => (
            <ActorCard
              key={actor.id}
              actor={actor}
              onClick={handleClick}
              className="transition transform hover:scale-105 hover:shadow-xl"
            />
          ))
        ) : (
          !loading && (
            <p className="text-gray-500 col-span-full text-center">No actors to display.</p>
          )
        )}
      </div>
    </div>
  );
}
