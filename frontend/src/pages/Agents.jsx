import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    
  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (err) {
      console.log(err);
    }
  };
fetchAgents();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Agents</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((agent) => (
              <tr
                key={agent._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{agent.name}</td>
                <td className="p-3">{agent.email}</td>
                <td className="p-3">{agent.phone}</td>
                <td className="p-3">{agent.zone}</td>
                <td className="p-3">
                  {agent.available ? (
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Busy
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Agents;