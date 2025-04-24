import React from "react";

const Pump = () => {
    const fuelData = [
        {
            type: "Regular Unleaded",
            currentPrice: "$3.49",
            scheduledChanges: [{ price: "$3.59", date: "2024-01-20 06:00" }],
            priceHistory: [
                { price: "$3.45", date: "2024-01-10 08:00", user: "John Smith" },
                { price: "$3.49", date: "2024-01-15 07:30", user: "Sarah Lee" },
            ],
        },
        {
            type: "Premium Unleaded",
            currentPrice: "$3.89",
            scheduledChanges: [],
            priceHistory: [
                { price: "$3.85", date: "2024-01-12 09:15", user: "John Smith" },
                { price: "$3.89", date: "2024-01-15 07:30", user: "Sarah Lee" },
            ],
        },
        {
            type: "Diesel",
            currentPrice: "$3.99",
            scheduledChanges: [{ price: "$4.09", date: "2024-01-21 00:00" }],
            priceHistory: [
                { price: "$3.95", date: "2024-01-11 06:45", user: "John Smith" },
                { price: "$3.99", date: "2024-01-15 07:30", user: "Sarah Lee" },
            ],
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-blue-800 text-white py-4">
                <h1 className="text-center text-3xl font-bold">Fuel Price Management</h1>
            </div>

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
                                        <button className="bg-blue-800 text-white text-xs px-3 py-1 rounded">
                                            Edit Price
                                        </button>
                                        <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">
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
        </div>
    );
};

export default Pump;
