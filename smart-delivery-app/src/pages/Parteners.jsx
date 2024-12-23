import React, { useState, useEffect } from "react";
import Table_Partner from "../components/Table_Partner";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns for the table
  const columns = [
    { header: "Partner Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Areas", accessor: "areas" }, // Expecting areas to be a string or formatted
    { header: "Status", accessor: "status", status: true },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 font-bold";
      case "inactive":
        return "text-red-600 font-bold";
      default:
        return "";
    }
  };

  // Update partner status after the backend update
  const updatePartnerStatus = (updatedPartner) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("https://rentkar-backend-knt8.onrender.com/api/partners"); // Replace with your actual endpoint
        const data = await response.json();
        const formattedData = data.map((partner) => ({
          ...partner,
          areas: Array.isArray(partner.areas) ? partner.areas.join(", ") : partner.areas,
        }));
        setPartners(formattedData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table_Partner
      T_Name="Delivery Partners"
      data={partners}
      columns={columns}
      getStatusClass={getStatusClass}
      updatePartnerStatus={updatePartnerStatus} // Pass the callback
    />
  );
};

export default Partners;
