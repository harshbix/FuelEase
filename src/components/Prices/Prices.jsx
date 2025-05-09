// Full updated Prices.jsx
import React, { useState, useEffect } from "react";
import { Edit, Clock, CheckCircle, XCircle, Trash } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { exportFuelDataToCSV } from "./exportCSV";
import Navbar from "../Navbar/navbar";

const Prices = () => {
  const [fuelData, setFuelData] = useState([
    {
      type: "Regular",
      currentPrice: "Tsh.3900",
      scheduledChanges: [{ price: "Tsh.3400", date: "2024-01-20 06:00" }],
      priceHistory: [
        { price: "Tsh.3450", date: "2024-01-10 08:00", user: "John Smith" },
        { price: "Tsh.3490", date: "2024-01-15 07:30", user: "Sarah Lee" },
      ],
    },
    {
      type: "Premium",
      currentPrice: "Tsh.3892",
      scheduledChanges: [],
      priceHistory: [
        { price: "Tsh.3856", date: "2024-01-12 09:15", user: "John Smith" },
        { price: "Tsh.3897", date: "2024-01-15 07:30", user: "Sarah Lee" },
      ],
    },
    {
      type: "Diesel",
      currentPrice: "Tsh.3993",
      scheduledChanges: [{ price: "Tsh.4090", date: "2024-01-21 00:00" }],
      priceHistory: [
        { price: "Tsh.3952", date: "2024-01-11 06:45", user: "John Smith" },
        { price: "Tsh.3999", date: "2024-01-15 07:30", user: "Sarah Lee" },
      ],
    },
  ]);

  const [selectedFuel, setSelectedFuel] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newSchedule, setNewSchedule] = useState({ price: "", date: "" });

  useEffect(() => {
    if (isEditModalOpen) {
      setNewPrice("");
      setErrorMessage("");
    }
    if (isScheduleModalOpen) {
      setNewSchedule({ price: "", date: "" });
      setErrorMessage("");
    }
  }, [isEditModalOpen, isScheduleModalOpen]);

  const handleEditPrice = (fuel) => {
    setSelectedFuel(fuel);
    setIsEditModalOpen(true);
  };

  const handleScheduleChange = (fuel) => {
    setSelectedFuel(fuel);
    setIsScheduleModalOpen(true);
  };

  const handleSavePrice = () => {
    if (!/^[0-9]+$/.test(newPrice)) {
      setErrorMessage("Invalid price. Only numbers allowed.");
      return;
    }

    const formattedPrice = `Tsh.${newPrice}`;
    setFuelData((prevData) =>
      prevData.map((fuel) =>
        fuel.type === selectedFuel.type
          ? {
              ...fuel,
              currentPrice: formattedPrice,
              priceHistory: [
                ...fuel.priceHistory,
                {
                  price: formattedPrice,
                  date: new Date().toISOString(),
                  user: "System",
                },
              ],
            }
          : fuel
      )
    );

    setIsEditModalOpen(false);
    setFeedbackMessage("Price updated successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  const handleSaveSchedule = () => {
    if (!/^[0-9]+$/.test(newSchedule.price) || !newSchedule.date) {
      setErrorMessage("Invalid price or date.");
      return;
    }

    const formattedPrice = `Tsh.${newSchedule.price}`;
    setFuelData((prevData) =>
      prevData.map((fuel) =>
        fuel.type === selectedFuel.type
          ? {
              ...fuel,
              scheduledChanges: [
                ...fuel.scheduledChanges,
                { price: formattedPrice, date: newSchedule.date },
              ],
            }
          : fuel
      )
    );

    setIsScheduleModalOpen(false);
    setFeedbackMessage("Schedule added successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  const handleDeleteSchedule = (fuelType, idx) => {
    setFuelData((prev) =>
      prev.map((f) =>
        f.type === fuelType
          ? {
              ...f,
              scheduledChanges: f.scheduledChanges.filter((_, i) => i !== idx),
            }
          : f
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <Navbar />
      </div>

      {feedbackMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow flex items-center gap-2 z-50">
          <CheckCircle className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow flex items-center gap-2 z-50">
          <XCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Fuel Prices
            </h2>
            <button
              onClick={() => exportFuelDataToCSV(fuelData)}
              className="bg-blue-700 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded shadow"
            >
              Export History
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fuelData.map((fuel, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold">{fuel.type}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPrice(fuel)}
                      className="bg-blue-700 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleScheduleChange(fuel)}
                      className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Clock size={14} />
                      Schedule
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{fuel.currentPrice}</p>
                  <p className="text-xs text-gray-500">Current Price</p>
                </div>
                {fuel.scheduledChanges.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Scheduled Changes
                    </h4>
                    {fuel.scheduledChanges.slice(0, 3).map((change, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs text-gray-800 items-center"
                      >
                        <span>{change.price}</span>
                        <span>{new Date(change.date).toLocaleString()}</span>
                        <button
                          onClick={() => handleDeleteSchedule(fuel.type, idx)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-1">
                    Price History
                  </h4>
                  {fuel.priceHistory
                    .slice(-3)
                    .reverse()
                    .map((h, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 text-xs text-gray-500"
                      >
                        <span>{h.price}</span>
                        <span>{new Date(h.date).toLocaleString()}</span>
                        <span>{h.user}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Price History Charts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fuelData.map((fuel, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <h3 className="text-base font-medium mb-2">
                  {fuel.type} Price Chart
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={fuel.priceHistory.map((h) => ({
                      ...h,
                      date: new Date(h.date).toLocaleDateString(),
                      price: parseInt(h.price.replace("Tsh.", "")) || 0,
                    }))}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
              <h3 className="text-base font-semibold mb-3">
                Edit Price for {selectedFuel?.type}
              </h3>
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4 text-sm"
                placeholder="Enter new price"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-1.5 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrice}
                  className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
              <h3 className="text-base font-semibold mb-3">
                Schedule Price for {selectedFuel?.type}
              </h3>
              <input
                type="text"
                value={newSchedule.price}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-3 text-sm"
                placeholder="Price (numbers only)"
              />
              <input
                type="datetime-local"
                value={newSchedule.date}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, date: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-4 text-sm"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-1.5 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prices;
