import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { getDashboardStats } from "../services/dashboardService";

function AgentDashboard() {
  const [stats, setStats] = useState({
    pendingOrders: 0,
    deliveredOrders: 0,
    failedOrders: 0,
    assignedOrders: 0,
  });

  useEffect(() => {
    

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchStats();
}, []);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Agent Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          className="bg-yellow-500"
        />

        <DashboardCard
          title="Delivered"
          value={stats.deliveredOrders}
          className="bg-green-500"
        />

        <DashboardCard
          title="Failed"
          value={stats.failedOrders}
          className="bg-red-500"
        />

        <DashboardCard
          title="Assigned Orders"
          value={stats.assignedOrders}
          className="bg-blue-500"
        />

      </div>
    </DashboardLayout>
  );
}

export default AgentDashboard;