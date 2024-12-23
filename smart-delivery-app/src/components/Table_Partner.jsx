import React, { useState } from "react";
import AddPartners from "./Forms/AddPartners";
import UpdatePartnerStatus from "./Forms/UpdatePartnerStatus";

const Table_Partner = ({ T_Name, data, columns, getStatusClass, onRowClick, updatePartnerStatus }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUpdateModal, setIsUpdateModel] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openUpdate = (partner) => {
        console.log(partner)
        setSelectedPartner(partner);
        setIsUpdateModel(true);
      };
    
      const closeUpdate = () => {
        setIsUpdateModel(false);
        setSelectedPartner(null);
      };


  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-black text-xl">Delivery Partners</div>
                <button
                  onClick={openModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
                >
                  + Add Partner
                </button>
              </div>

        {/* Wrapper for horizontal scrolling */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="rounded-l-lg rounded-r-lg">
              <tr className="bg-blue-800 text-white rounded-l-xl rounded-r-lg">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-2 text-left">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => openUpdate(row)} // Trigger the row click handler
                >
                  {columns.map((column, idx) => {
                    let cellValue = row[column.accessor];

                    return (
                      <td
                        key={idx}
                        className={`px-4 py-2 capitalize ${
                          column.status && getStatusClass
                            ? getStatusClass(cellValue)
                            : ""
                        }`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6 h-[95vh] overflow-y-auto">
            
            {/* Here you can include your AddPartner form or modal */}
            <AddPartners closeModal={closeModal} /> 
          </div>
        </div>
      )}

      {isUpdateModal && selectedPartner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-1/5 md:w-1/2 p-6 h-[auto] overflow-y-auto">
            
            {/* Open UpdatePartnerStatus form for editing the status */}
            <UpdatePartnerStatus
              partner={selectedPartner}
              closeModal={closeUpdate}
              updatePartnerStatus={updatePartnerStatus} // Callback to update status in parent
            />
          </div>
        </div>
      )}





    </div>
  );
};

export default Table_Partner;
