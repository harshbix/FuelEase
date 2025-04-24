import React, { useState } from "react";

const Pump = () => {
    const [fuelData, setFuelData] = useState([
        {
            type: "Regular Unleaded",
            currentPrice: "Tsh.3900",
            scheduledChanges: [{ price: "Tsh.3400", date: "2024-01-20 06:00" }],
            priceHistory: [
                { price: "Tsh.3450", date: "2024-01-10 08:00", user: "John Smith" },
                { price: "Tsh.3490", date: "2024-01-15 07:30", user: "Sarah Lee" },
            ],
        },
        {
            type: "Premium Unleaded",
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
    const [newPrice, setNewPrice] = useState("");
    const [newSchedule, setNewSchedule] = useState({ price: "", date: "" });

    const handleEditPrice = (fuel) => {
        setSelectedFuel(fuel);
        setNewPrice("");
        setIsEditModalOpen(true);
    };

    const handleScheduleChange = (fuel) => {
        setSelectedFuel(fuel);
        setNewSchedule({ price: "", date: "" });
        setIsScheduleModalOpen(true);
    };

    const handleSavePrice = () => {
        if (!newPrice.trim()) return;

        const formattedPrice = newPrice.startsWith("Tsh.") ? newPrice : `Tsh.${newPrice}`;

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
        if (!newSchedule.price.trim() || !newSchedule.date) return;

        const formattedPrice = newSchedule.price.startsWith("Tsh.") ? newSchedule.price : `Tsh.${newSchedule.price}`;

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
                <h1 className="text-center text-4xl font-extrabold tracking-wide">
                    Fuel Price Management
                </h1>
            </div>

            {feedbackMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                    {feedbackMessage}
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
                                            className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg shadow transition"
                                            onClick={() => handleEditPrice(fuel)}
                                        >
                                            Edit Price
                                        </button>
                                        <button
                                            className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-4 py-2 rounded-lg shadow transition"
                                            onClick={() => handleScheduleChange(fuel)}
                                        >
                                            Schedule Change
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
                                                <p>{change.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Price History</h4>
                                    {fuel.priceHistory.map((history, idx) => (
                                        <div key={idx} className="flex justify-between text-sm text-gray-500">
                                            <p>{history.price}</p>
                                            <p>{history.date}</p>
                                            <p>{history.user}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-6">Edit Price</h3>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter new price"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow transition"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-800 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
                                onClick={handleSavePrice}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isScheduleModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-6">Schedule Change</h3>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter new price"
                            value={newSchedule.price}
                            onChange={(e) => setNewSchedule({ ...newSchedule, price: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={newSchedule.date}
                            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow transition"
                                onClick={() => setIsScheduleModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-800 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
                                onClick={handleSaveSchedule}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pump;