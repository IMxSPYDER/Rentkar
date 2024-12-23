import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import OrderStatusForm from "../components/Forms/OrderStatusForm";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetch("https://rentkar-backend-knt8.onrender.com/api/orders");
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        const partnerIds = [...new Set(ordersData.map((order) => order.assignedTo))];
        const partnersResponse = await fetch(
          `https://rentkar-backend-knt8.onrender.com/api/partners?ids=${partnerIds.join(",")}`
        );
        const partnersData = await partnersResponse.json();
        setPartners(partnersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getPartnerName = (partnerId) => {
    const partner = partners.find((p) => p._id === partnerId);
    return partner ? partner.name : "Partner Not Found";
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

    // Get Order Status Class
    const getOrderStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case "pending":
          return "text-orange-500 font-semibold";
        case "assigned":
          return "text-blue-500 font-semibold";
        case "delivered":
          return "text-green-500 font-semibold";
        case "picked":
          return "text-purple-500 font-semibold";
        default:
          return "";
      }
    };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`https://rentkar-backend-knt8.onrender.com/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const orderColumns = [
    { header: "Order Number", accessor: "orderNumber" },
    { header: "Customer Name", accessor: "customer", render: (row) => row.customer?.name || "No name available" },
    { header: "Area", accessor: "area" },
    { header: "Status", accessor: "status", status: true },
    { header: "Total Amount", accessor: "totalAmount" },
    { header: "Scheduled For", accessor: "scheduledFor" },
    { header: "Assign To", accessor: "assignedTo", render: (row) => getPartnerName(row.assignedTo) },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table
        T_Name="Orders"
        data={orders}
        columns={orderColumns}
        getStatusClass={getOrderStatusClass}
        onRowClick={handleRowClick}
      />
      {selectedOrder && (
        <OrderStatusForm
          order={selectedOrder}
          partnerName={getPartnerName(selectedOrder.assignedTo)}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default Orders;
