import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
function Tracking() {
  const { orderId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {


  const fetchTracking = async () => {
    try {
      const res = await api.get("/orders");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };
fetchTracking();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Order Tracking
      </h1>

      <div className="bg-white rounded-lg shadow p-8">

        {history.map((item, index) => (
          <div
            key={item._id}
            className="flex gap-4 mb-8"
          >
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-blue-600"></div>

              {index !== history.length - 1 && (
                <div className="w-1 h-16 bg-blue-300"></div>
              )}
            </div>

            <div>
              <h2 className="font-bold text-xl">
                {item.status}
              </h2>

              <p className="text-gray-600">
                {item.remarks}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}

export default Tracking;