import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";

function CreateOrder() {
  const [formData, setFormData] = useState({
    customer: "",
    pickupAddress: "",
    dropAddress: "",
    pickupZone: "",
    dropZone: "",
    weight: "",
    orderType: "B2C",
    paymentType: "COD",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        formData
      );

      alert("Order Created Successfully");

      setFormData({
        customer: "",
        pickupAddress: "",
        dropAddress: "",
        pickupZone: "",
        dropZone: "",
        weight: "",
        orderType: "B2C",
        paymentType: "COD",
      });
    } catch (err) {
      console.log(err);
      alert("Error creating order");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create Order
      </h1>

      <form
        onSubmit={createOrder}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="customer"
          placeholder="Customer ID"
          value={formData.customer}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="dropAddress"
          placeholder="Drop Address"
          value={formData.dropAddress}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="pickupZone"
          placeholder="Pickup Zone ID"
          value={formData.pickupZone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="dropZone"
          placeholder="Drop Zone ID"
          value={formData.dropZone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Order
        </button>
      </form>
    </DashboardLayout>
  );
}

export default CreateOrder;