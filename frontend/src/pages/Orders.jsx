import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 fetchOrders();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Drop</th>
              <th className="p-3">Status</th>
              <th className="p-3">Charge</th>
              <th className="p-3">Track</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{order._id.slice(-6)}</td>
                <td className="p-3">{order.pickupAddress}</td>
                <td className="p-3">{order.dropAddress}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">₹{order.deliveryCharge}</td>

<td className="p-3">
  <Link
    to={`/tracking/${order._id}`}
    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
  >
    View
  </Link>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Orders;