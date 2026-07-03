import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
function RateCards() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    

  const fetchRates = async () => {
    try {
      const res = await api.get("/orders");
      setRates(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchRates();
  }, []);


  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Rate Cards</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Pickup Zone</th>
              <th className="p-3">Drop Zone</th>
              <th className="p-3">Order Type</th>
              <th className="p-3">Rate/Kg</th>
              <th className="p-3">COD Charge</th>
            </tr>
          </thead>

          <tbody>
            {rates.map((rate) => (
              <tr key={rate._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{rate.pickupZone?.name}</td>
                <td className="p-3">{rate.dropZone?.name}</td>
                <td className="p-3">{rate.orderType}</td>
                <td className="p-3">₹{rate.ratePerKg}</td>
                <td className="p-3">₹{rate.codCharge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default RateCards;