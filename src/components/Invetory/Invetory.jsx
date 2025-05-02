import React, { useState } from "react";
import Navbar from "../Navbar/navbar";

const fuelData = [
  { type: "Petrol", percent: 82, capacity: 10000, alert: 2000, color: "bg-green-600" },
  { type: "Diesel", percent: 29, capacity: 8000, alert: 1600, color: "bg-red-600" },
  { type: "Premium", percent: 42, capacity: 6000, alert: 1200, color: "bg-yellow-500" },
];

const deliveryData = [
  { type: "Petrol", amount: 5000, date: "2024-01-25 09:00", status: "Scheduled" },
  { type: "Diesel", amount: 4000, date: "2024-01-26 14:30", status: "Scheduled" },
  { type: "Premium", amount: 3000, date: "2024-01-27 11:00", status: "Pending" },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeliveries = deliveryData.filter(delivery =>
    delivery.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.amount.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-200 min-h-screen pt-24"> {/* Updated padding-top */}
      
      {/* Header with Schedule Delivery button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
        <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
          Schedule Delivery
        </button>
      </div>

      {/* Fuel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {fuelData.map((fuel, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{fuel.type}</h3>
              <span className="text-gray-700 font-medium">{fuel.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full ${fuel.color}`}
                style={{ width: `${fuel.percent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Capacity: {fuel.capacity.toLocaleString()}L</span>
              <span>Alert: {fuel.alert.toLocaleString()}L</span>
            </div>
          </div>
        ))}
      </div>

      {/* Deliveries Section */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Upcoming Deliveries</h3>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search deliveries..."
            className="w-full pl-4 pr-8 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-1200 toLowercase tracking-wider">Fuel Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-1200 toLowercase tracking-wider">Amount (L)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-1200 toLowercase tracking-wider">Delivery Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-1200 toLowercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{item.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full 
                        ${item.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-1200">
                    {searchTerm ? "No results found" : "No upcoming deliveries"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}