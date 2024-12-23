import React, { useState, useEffect } from "react";
import { addOrder } from "../../utils/apiService";
import axios from "axios"; // To make the API call for fetching active partners

const AddOrderModal = ({ isOpen, onClose }) => {
  const [order, setOrder] = useState({
    orderNumber: "",
    customer: { name: "", phone: "", address: "" },
    area: "",
    items: [{ name: "", quantity: 0, price: 0 }],
    status: "pending", // Default status
    scheduledFor: "", // This is the scheduled time
    assignedTo: "", // Initially empty, will be set to ObjectId when selected
    totalAmount: 0,
  });
  const [partners, setPartners] = useState([]); // To store the active delivery partners

  // Fetch active delivery partners when modal opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("https://rentkar-api.vercel.app/api/active-delivery-partners")
        .then((response) => {
          setPartners(response.data); // Store active partners in state
        })
        .catch((error) => {
          console.error("Error fetching active partners:", error);
        });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      customer: { ...prev.customer, [name]: value },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.items];
    updatedItems[index][field] = value;
    setOrder((prev) => ({ ...prev, items: updatedItems }));
  };

  const addNewItem = () => {
    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 0, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!order.scheduledFor) {
      alert("Please select a scheduled time.");
      return;
    }

    // Calculate total amount
    const totalAmount = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderWithTotal = { ...order, totalAmount };

    try {
      const response = await addOrder(orderWithTotal);
      console.log("Order Submitted Successfully:", response.data);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="overflow-y-auto bg-white p-6 rounded-lg max-w-full md:max-w-[550px] w-[90%] sm:w-[95%] h-[95vh]">
        <h2 className="text-lg font-bold mb-4">Add New Order</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="orderNumber"
            placeholder="Order Number"
            value={order.orderNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />

          <div>
            <h4 className="font-semibold mb-2">Customer Details</h4>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={order.customer.name}
              onChange={handleCustomerChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={order.customer.phone}
              onChange={handleCustomerChange}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={order.customer.address}
              onChange={handleCustomerChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <input
            type="text"
            name="area"
            placeholder="Area"
            value={order.area}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />

          {/* Status Dropdown */}
          <div>
            <h4 className="font-semibold mb-2">Order Status</h4>
            <select
              name="status"
              value={order.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="picked">Picked</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {/* Active Delivery Partner Dropdown */}
          <div>
            <h4 className="font-semibold mb-2">Assign Delivery Partner</h4>
            <select
              name="assignedTo"
              value={order.assignedTo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a partner</option>
              {partners.map((partner) => (
                <option key={partner._id} value={partner._id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Time Picker */}
          <div>
            <h4 className="font-semibold mb-2">Scheduled Time</h4>
            <input
              type="datetime-local"
              name="scheduledFor"
              value={order.scheduledFor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Items</h4>
            {order.items.map((item, index) => (
              <div key={index} className="flex md:flex-wrap gap-4 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  className="w-20 p-2 border rounded"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="text-white text-sm bg-red-500 py-2 px-3 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addNewItem}
              className="text-white text-sm bg-blue-500 py-2 px-3 rounded-md"
            >
              Add Item
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-700 font-semibold text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;
