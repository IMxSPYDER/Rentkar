import React, { useState, useEffect } from "react";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import MessengerCard from "../components/MessengerCard";
import AddOrderModal from "../components/Forms/AddOrderModal";
import { fetchOrders } from "../utils/apiService"; // Assuming you have this API function to fetch orders
import { Pie, Bar } from "react-chartjs-2"; // Importing Chart.js components
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersMetrics, setOrdersMetrics] = useState({
    totalOrders: 0,
    delivered: 0,
    inProgress: 0,
    failed: 0,
  });
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch orders and calculate metrics
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await fetchOrders(); // Fetch orders from the API
        const orders = response.data;

        let totalOrders = orders.length;
        let delivered = 0;
        let inProgress = 0;
        let failed = 0;

        // Calculate the metrics based on order status
        orders.forEach((order) => {
          const status = order.status?.toLowerCase();
          switch (status) {
            case "delivered":
              delivered++;
              break;
            case "pending":
            case "assigned":
            case "picked":
              inProgress++;
              break;
            default:
              failed++;
              break;
          }
        });

        setOrdersMetrics({
          totalOrders,
          delivered,
          inProgress,
          failed,
        });
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return <div className="p-4">Loading metrics...</div>;
  }

  const { totalOrders, delivered, inProgress, failed } = ordersMetrics;

  // Data for the pie chart (order status distribution)
  const pieChartData = {
    labels: ["Delivered", "In Progress", "Failed"],
    datasets: [
      {
        data: [delivered, inProgress, failed],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"], // Color for each segment
        hoverBackgroundColor: ["#4C8BF5", "#FFDB64", "#FF6F7D"],
      },
    ],
  };

  // Data for the bar chart (daily orders)
  const barChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"], // Replace with real dates or dynamic data
    datasets: [
      {
        label: "Total Orders",
        data: [10, 20, 30, 40, 50, 60, 70], // Replace with actual data
        backgroundColor: "#36A2EB",
      },
      {
        label: "Delivered Orders",
        data: [8, 18, 28, 38, 48, 58, 68], // Replace with actual data
        backgroundColor: "#FFCE56",
      },
      {
        label: "In Progress Orders",
        data: [2, 4, 6, 8, 10, 12, 14], // Replace with actual data
        backgroundColor: "#FF6384",
      },
      {
        label: "Failed Orders",
        data: [1, 3, 5, 7, 9, 11, 13], // Replace with actual data
        backgroundColor: "#FF5733",
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-black text-xl">Dashboard</div>
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
        >
          + Add Order
        </button>
      </div>

      <AddOrderModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <MetricCard title="Orders" value={totalOrders} change="50%" />
        <MetricCard
          title="Orders Delivered"
          value={delivered}
          change={`${((delivered / totalOrders) * 100).toFixed(1)}%`}
        />
        <MetricCard
          title="Orders in Progress"
          value={inProgress}
          change={`${((inProgress / totalOrders) * 100).toFixed(1)}%`}
        />
        <MetricCard
          title="Orders Failed"
          value={failed}
          change={`${((failed / totalOrders) * 100).toFixed(1)}%`}
          negative
        />
      </div>

          {/* Charts and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 cursor-pointer">
      
      <ChartCard title="Order Status Distribution">
      <div className="flex items-center justify-center m-auto">
        <div className="chart-container" style={{width: '250px', height: '250px' }}>
          <Pie data={pieChartData} />
        </div>
        </div>
      </ChartCard>
      
      <ChartCard title="Orders (Day-to-Day)">
        <Bar data={barChartData} />
      </ChartCard>
    </div>

    {/* Sales Funnel and Messenger */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <ChartCard title="Sales Funnel">
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          Sales Funnel Chart
        </div>
      </ChartCard>
      <MessengerCard />
    </div>
  </div>
  );
};

export default Dashboard;
