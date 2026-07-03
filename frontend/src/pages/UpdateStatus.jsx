import { useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

function UpdateStatus() {
  const [formData, setFormData] = useState({
    orderId: "",
    status: "Pending",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateStatus = async (e) => {
    e.preventDefault();

    try {
      await api.put("/orders/status");

      alert("Order Status Updated");

      setFormData({
        orderId: "",
        status: "Pending",
        remarks: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Update Order Status
      </h1>

      <form
        onSubmit={updateStatus}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Pending</option>
          <option>Picked Up</option>
          <option>Delivered</option>
          <option>Failed</option>
        </select>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Update Status
        </button>
      </form>
    </DashboardLayout>
  );
}

export default UpdateStatus;