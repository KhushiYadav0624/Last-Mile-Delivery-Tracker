import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import AgentDashboard from "../pages/AgentDashboard";
import Agents from "../pages/Agents";
import Zones from "../pages/Zones";
import RateCards from "../pages/RateCards";
import Tracking from "../pages/Tracking";
import UpdateStatus from "../pages/UpdateStatus";
function Admin() {
  return <h1 className="text-4xl p-10">Admin Dashboard</h1>;
}

function Customer() {
  return <h1 className="text-4xl p-10">Customer Dashboard</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/ratecards" element={<RateCards />} />
        <Route path="/tracking/:orderId" element={<Tracking />}/>
        <Route path="/update-status" element={<UpdateStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;