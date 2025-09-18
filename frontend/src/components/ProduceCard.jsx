export default function ProduceCard({ produce }) {
  // Status colors
  const statusColors = {
    FARMER: "bg-green-100 text-green-800",
    DISTRIBUTOR: "bg-yellow-100 text-yellow-800",
    RETAILER: "bg-blue-100 text-blue-800",
    SOLD: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer border border-gray-200">
      <h2 className="text-xl font-bold text-green-700 mb-2">{produce.name}</h2>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Description:</span> {produce.description}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Quantity:</span> {produce.quantity}
      </p>
      <p className="mb-1">
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[produce.status] || "bg-gray-100 text-gray-800"}`}
        >
          {produce.status}
        </span>
      </p>
      <p className="text-gray-500 text-sm truncate">
        <span className="font-medium">Owner ID:</span> {produce.currentOwnerId}
      </p>
    </div>
  );
}
