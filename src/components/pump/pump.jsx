import React, { useState, useEffect } from "react";
import { Edit, Clock, CheckCircle, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Pump = () => {
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
                { price: formattedPrice, date: new Date().toISOString(), user: "System" },
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
              scheduledChanges: [...fuel.scheduledChanges, { price: formattedPrice, date: newSchedule.date }],
            }
          : fuel
      )
    );

    setIsScheduleModalOpen(false);
    setFeedbackMessage("Schedule added successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-center text-4xl font-extrabold tracking-wide">Fuel Price Management</h1>
      </div>

      {feedbackMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <XCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Manage Fuel Prices</h2>
            <button className="bg-blue-800 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg shadow transition">
              View Competitor Prices
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fuelData.map((fuel, index) => (
              <div key={index} className="bg-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{fuel.type}</h3>
                  <div className="flex space-x-3">
                    <button
                      className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg shadow transition flex items-center space-x-2"
                      onClick={() => handleEditPrice(fuel)}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-4 py-2 rounded-lg shadow transition flex items-center space-x-2"
                      onClick={() => handleScheduleChange(fuel)}
                    >
                      <Clock className="w-4 h-4" />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{fuel.currentPrice}</p>
                  <p className="text-sm text-gray-500">Current Price</p>
                </div>
                {fuel.scheduledChanges.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Scheduled Changes</h4>
                    {fuel.scheduledChanges.map((change, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-900">
                        <p>{change.price}</p>
                        <p>{new Date(change.date).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Price History</h4>
                  {fuel.priceHistory.map((history, idx) => (
                    <div key={idx} className="grid grid-cols-3 text-sm text-gray-500">
                      <p>{history.price}</p>
                      <p>{new Date(history.date).toLocaleString()}</p>
                      <p>{history.user}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Price History Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fuelData.map((fuel, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{fuel.type} Price Chart</h3>
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
                    <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Price Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Price for {selectedFuel?.type}</h3>
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full border px-4 py-2 rounded-md mb-4"
                placeholder="Enter new price (numbers only)"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrice}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Price Modal */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Schedule Price for {selectedFuel?.type}</h3>
              <input
                type="text"
                value={newSchedule.price}
                onChange={(e) => setNewSchedule({ ...newSchedule, price: e.target.value })}
                className="w-full border px-4 py-2 rounded-md mb-4"
                placeholder="Price (Tsh, numbers only)"
              />
              <input
                type="datetime-local"
                value={newSchedule.date}
                onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                className="w-full border px-4 py-2 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
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

export default Pump;
