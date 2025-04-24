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
            scheduledChanges: [{ price: "Tsh.4.09", date: "2024-01-21 00:00" }],
            priceHistory: [
                { price: "Tsh.3952", date: "2024-01-11 06:45", user: "John Smith" },
                { price: "Tsh.3991", date: "2024-01-15 07:30", user: "Sarah Lee" },
            ],
        },
    ]);

    const [selectedFuel, setSelectedFuel] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleEditPrice = (fuel) => {
        setSelectedFuel(fuel);
        setIsEditModalOpen(true);
    };

    const handleScheduleChange = (fuel) => {
        setSelectedFuel(fuel);
        setIsScheduleModalOpen(true);
    };

    const handleSavePrice = (newPrice) => {
        if (!newPrice.startsWith("Tsh.")) {
            newPrice = `Tsh.${newPrice}`;
        }

        setFuelData((prevData) =>
            prevData.map((fuel) =>
                fuel.type === selectedFuel.type
                    ? { ...fuel, currentPrice: newPrice }
                    : fuel
            )
        );
        setIsEditModalOpen(false);
        setFeedbackMessage("Price updated successfully!");
        setTimeout(() => setFeedbackMessage(""), 3000);
    };

    const handleSaveSchedule = (newSchedule) => {
        if (!newSchedule.price.startsWith("Tsh.")) {
            newSchedule.price = `Tsh.${newSchedule.price}`;
        }

        setFuelData((prevData) =>
            prevData.map((fuel) =>
                fuel.type === selectedFuel.type
                    ? {
                          ...fuel,
                          scheduledChanges: [...fuel.scheduledChanges, newSchedule],
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
            {/* Header */}
            <div className="bg-blue-600 text-white py-4">
                <h1 className="text-center text-3xl font-bold">Fuel Price Management</h1>
            </div>

            {/* Feedback Message */}
            {feedbackMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow">
                    {feedbackMessage}
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Manage Fuel Prices
                        </h2>
                        <button className="bg-blue-800 text-white text-sm px-4 py-2 rounded">
                            View Competitor Prices
                        </button>
                    </div>

                    {/* Fuel Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fuelData.map((fuel, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg shadow p-4 space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {fuel.type}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button
                                            className="bg-blue-800 text-white text-xs px-3 py-1 rounded"
                                            onClick={() => handleEditPrice(fuel)}
                                        >
                                            Edit Price
                                        </button>
                                        <button
                                            className="bg-gray-600 text-white text-xs px-3 py-1 rounded"
                                            onClick={() => handleScheduleChange(fuel)}
                                        >
                                            Schedule Change
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-3xl font-semibold text-gray-900">
                                        {fuel.currentPrice}
                                    </p>
                                    <p className="text-sm text-gray-500">current price</p>
                                </div>
                                {fuel.scheduledChanges.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">
                                            Scheduled Changes
                                        </h4>
                                        {fuel.scheduledChanges.map((change, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between text-sm text-gray-900"
                                            >
                                                <p>{change.price}</p>
                                                <p>{change.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Price History
                                    </h4>
                                    {fuel.priceHistory.map((history, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between text-sm text-gray-500"
                                        >
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

            {/* Edit Price Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-medium mb-4">Edit Price</h3>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            placeholder="Enter new price"
                            onChange={(e) =>
                                setSelectedFuel({ ...selectedFuel, currentPrice: e.target.value })
                            }
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-800 text-white px-4 py-2 rounded"
                                onClick={() => handleSavePrice(selectedFuel.currentPrice)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule Change Modal */}
            {isScheduleModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-medium mb-4">Schedule Change</h3>
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            placeholder="Enter new price"
                            onChange={(e) =>
                                setSelectedFuel({ ...selectedFuel, newPrice: e.target.value })
                            }
                        />
                        <input
                            type="datetime-local"
                            className="border p-2 w-full mb-4"
                            onChange={(e) =>
                                setSelectedFuel({ ...selectedFuel, newDate: e.target.value })
                            }
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setIsScheduleModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-800 text-white px-4 py-2 rounded"
                                onClick={() =>
                                    handleSaveSchedule({
                                        price: selectedFuel.newPrice,
                                        date: selectedFuel.newDate,
                                    })
                                }
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
