import { useState } from "react";

export default function TransferForm({ produces = [], receivers = [], onSubmit }) {
  const [formData, setFormData] = useState({
    produceId: "",
    toActorId: "",
    status: "",
    reason: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      produceId: "",
      toActorId: "",
      status: "",
      reason: "",
      comments: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      {/* Select Produce */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Produce</label>
        <select
          name="produceId"
          value={formData.produceId}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="">-- Choose Produce --</option>
          {produces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.quantity}) - Owner: {p.currentOwnerName || p.currentOwnerId}
            </option>
          ))}
        </select>
      </div>

      {/* Select Receiver */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Receiver</label>
        <select
          name="toActorId"
          value={formData.toActorId}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="">-- Choose Receiver --</option>
          {receivers.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.role})
            </option>
          ))}
        </select>
      </div>

      {/* Optional Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Status (optional)</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="e.g., Quality Check"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason (optional)</label>
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="e.g., Bulk Order"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments (optional)</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Additional notes"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Transfer
      </button>
    </form>
  );
}
