import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
function Zones() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    

  const fetchZones = async () => {
    try {
      const res = await api.get("/orders");
      setZones(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchZones();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Zones</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Zone Name</th>
              <th className="p-3">Areas</th>
            </tr>
          </thead>

          <tbody>
            {zones.map((zone) => (
              <tr key={zone._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{zone.name}</td>
                <td className="p-3">
                  {zone.areas?.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Zones;