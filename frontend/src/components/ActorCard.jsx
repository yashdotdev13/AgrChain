export default function ActorCard({ actor, onClick }) {
  // Define a color badge based on role
  const roleColors = {
    FARMER: "bg-green-200 text-green-800",
    DISTRIBUTOR: "bg-blue-200 text-blue-800",
    RETAILER: "bg-yellow-200 text-yellow-800",
  };

  return (
    <div
      className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick && onClick(actor)}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">{actor.name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColors[actor.role] || "bg-gray-200 text-gray-800"}`}
        >
          {actor.role}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">
        Wallet Address:
      </p>
      <p className="text-gray-700 text-sm truncate">{actor.walletAddress}</p>
    </div>
  );
}
