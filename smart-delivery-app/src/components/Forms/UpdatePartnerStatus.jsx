import React, { useState } from "react";
import { Route } from "react-router-dom";

const UpdatePartnerStatus = ({ partner, closeModal, updatePartnerStatus }) => {
  const [status, setStatus] = useState(partner.status);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Log partner and partner ID for debugging
    console.log(partner);
    console.log(partner._id);
  
    try {
      if (!partner._id) {
        throw new Error("Partner ID is missing");
      }
  
      // Send the updated status (from the state) instead of partner.status
      const response = await fetch(`http://localhost:3000/api/partners/${partner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }), // Use the updated `status` state
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update partner status: ${errorText}`);
      }
  
      const updatedPartner = await response.json();
      console.log('Partner status updated:', updatedPartner);
      updatePartnerStatus(updatedPartner); // Assuming you want to update the state in the parent component
    } catch (error) {
      console.error('Error updating partner status', error);
      alert('Error updating partner status. Please try again.');
    }
    
    window.location.reload(); // This will reload the page to reflect the changes
    closeModal();
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="partnerName" className="text-sm font-semibold text-gray-600">
          Partner Name
        </label>
        <input
          id="partnerName"
          type="text"
          value={partner.name}
          disabled
          className="bg-gray-100 p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="status" className="text-sm font-semibold text-gray-600">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-100 p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
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
          Update Status
        </button>
      </div>
    </form>
  );
};

export default UpdatePartnerStatus;
