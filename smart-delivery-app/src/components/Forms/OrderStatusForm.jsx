import React from "react";

const OrderStatusForm = ({ order, partnerName, onClose, onUpdateStatus }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStatus = e.target.status.value;
    onUpdateStatus(order._id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Customer Name</label>
            <input
              type="text"
              value={order.customer?.name || "No name available"}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Assigned Partner</label>
            <input
              type="text"
              value={partnerName}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              defaultValue={order.status}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="picked">Picked</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 font-semibold text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderStatusForm;
