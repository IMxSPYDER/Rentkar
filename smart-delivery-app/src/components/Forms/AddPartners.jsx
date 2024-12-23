import React, { useState } from "react";
import { addPartner } from "../../utils/apiService";


const AddPartners = ({ closeModal }) => {
  const [deliveryPartner, setDeliveryPartner] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active", // default to active
    currentLoad: 0, // max: 3
    areas: [],
    shift: { start: "", end: "" },
    metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryPartner((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (e) => {
    const { value } = e.target;
    const areas = value.split(",").map((area) => area.trim());
    setDeliveryPartner((prev) => ({ ...prev, areas }));
  };

  const handleShiftChange = (e, shiftType) => {
    const { value } = e.target;
    setDeliveryPartner((prev) => ({
      ...prev,
      shift: { ...prev.shift, [shiftType]: value },
    }));
  };

  const handleMetricsChange = (e, metricType) => {
    const { value } = e.target;
    setDeliveryPartner((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [metricType]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPartner(deliveryPartner);
      console.log("Partner Added Successfully:", response.data);
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding partner:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Partner Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter partner name"
          value={deliveryPartner.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={deliveryPartner.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={deliveryPartner.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={deliveryPartner.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Load</label>
        <input
          type="number"
          name="currentLoad"
          placeholder="Enter current load (max 3)"
          value={deliveryPartner.currentLoad}
          onChange={handleInputChange}
          max={3}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Areas (comma-separated)</label>
        <input
          type="text"
          name="areas"
          placeholder="Enter areas"
          value={deliveryPartner.areas.join(", ")}
          onChange={handleAreaChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Shift Start</label>
          <input
            type="time"
            name="shiftStart"
            value={deliveryPartner.shift.start}
            onChange={(e) => handleShiftChange(e, "start")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Shift End</label>
          <input
            type="time"
            name="shiftEnd"
            value={deliveryPartner.shift.end}
            onChange={(e) => handleShiftChange(e, "end")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={deliveryPartner.metrics.rating}
            onChange={(e) => handleMetricsChange(e, "rating")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Completed Orders</label>
          <input
            type="number"
            name="completedOrders"
            value={deliveryPartner.metrics.completedOrders}
            onChange={(e) => handleMetricsChange(e, "completedOrders")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Cancelled Orders</label>
          <input
            type="number"
            name="cancelledOrders"
            value={deliveryPartner.metrics.cancelledOrders}
            onChange={(e) => handleMetricsChange(e, "cancelledOrders")}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-700 font-semibold text-white py-2 px-4 rounded hover:bg-blue-800"
        >
          Add Partner
        </button>
      </div>
    </form>
  );
};

export default AddPartners;
