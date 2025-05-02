import React, { useState } from "react";
import Navbar from "../Navbar/navbar";

const fuelData = [
  { type: "Petrol", percent: 82, capacity: 10000, alert: 2000, color: "bg-green-600" },
  { type: "Diesel", percent: 29, capacity: 8000, alert: 1600, color: "bg-red-600" },
  { type: "Premium", percent: 42, capacity: 6000, alert: 1200, color: "bg-yellow-500" },
];

const deliveryData = [
  { 
    id: 1,
    type: "Petrol", 
    amount: 5000, 
    requestTime: "2024-01-24 10:30",
    deliveryTime: "2024-01-25 09:00",
    status: "Scheduled", 
    deliveryPrice: 150, 
    deliveryLocation: "123 Main St" 
  },
  { 
    id: 2,
    type: "Diesel", 
    amount: 4000, 
    requestTime: "2024-01-25 08:15",
    deliveryTime: "2024-01-26 14:30", 
    status: "Scheduled", 
    deliveryPrice: 120, 
    deliveryLocation: "456 Oak Ave" 
  },
  { 
    id: 3,
    type: "Premium", 
    amount: 3000, 
    requestTime: "2024-01-26 13:45",
    deliveryTime: "", 
    status: "Pending", 
    deliveryPrice: 0, 
    deliveryLocation: "" 
  },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryLocation: "",
    deliveryTime: "",
    deliveryPrice: ""
  });
  const [deliveries, setDeliveries] = useState(deliveryData);
  const [isEditing, setIsEditing] = useState(false);

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.requestTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.amount.toString().includes(searchTerm)
  );

  const pendingOrders = deliveries.filter(delivery => delivery.status === "Pending");

  const handleScheduleDelivery = () => {
    const updatedDeliveries = deliveries.map(delivery => {
      if (delivery.id === selectedOrder.id) {
        return {
          ...delivery,
          status: "Scheduled",
          deliveryLocation: deliveryDetails.deliveryLocation,
          deliveryTime: deliveryDetails.deliveryTime,
          deliveryPrice: deliveryDetails.deliveryPrice
        };
      }
      return delivery;
    });
    
    setDeliveries(updatedDeliveries);
    setShowModal(false);
    setSelectedOrder(null);
    setDeliveryDetails({
      deliveryLocation: "",
      deliveryTime: "",
      deliveryPrice: ""
    });
    setIsEditing(false);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setDeliveryDetails({
      deliveryLocation: order.deliveryLocation,
      deliveryTime: order.deliveryTime,
      deliveryPrice: order.deliveryPrice
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedDeliveries = deliveries.filter(delivery => delivery.id !== orderToDelete.id);
    setDeliveries(updatedDeliveries);
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  return (
    <div className="relative">
      {/* Main content with conditional blur */}
      <div className={`p-6 bg-gray-200 min-h-screen pt-24 ${showModal || showDeleteModal ? 'blur-sm' : ''}`}>
        {/* Header with Schedule Delivery button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
          <button 
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setSelectedOrder(null);
              setDeliveryDetails({
                deliveryLocation: "",
                deliveryTime: "",
                deliveryPrice: ""
              });
            }}
          >
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
        <div className="bg-gray-200 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Fuel Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Amount (L)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowecase tracking-wider">Request Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Delivery Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Delivery Price (Tshs)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 toLowercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.status === 'Pending' ? '--' : item.deliveryTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.deliveryPrice ? `Tshs${item.deliveryPrice}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full 
                          ${item.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-700 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-700">
                      {searchTerm ? "No results found" : "No upcoming deliveries"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Delivery' : 'Schedule Delivery'}
            </h3>
            
            {/* Select Pending Order (only shown when not editing) */}
            {!isEditing && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Order
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedOrder ? `${selectedOrder.type}-${selectedOrder.amount}` : ""}
                  onChange={(e) => {
                    const [type, amount] = e.target.value.split("-");
                    const order = pendingOrders.find(
                      order => order.type === type && order.amount === parseInt(amount)
                    );
                    setSelectedOrder(order);
                  }}
                >
                  <option value="">Select an order</option>
                  {pendingOrders.map((order, index) => (
                    <option 
                      key={index} 
                      value={`${order.type}-${order.amount}`}
                    >
                      {order.type} - {order.amount}L - {order.requestTime}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Delivery Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Location
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter delivery address"
                value={deliveryDetails.deliveryLocation}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  deliveryLocation: e.target.value
                })}
              />
            </div>

            {/* Delivery Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-lg"
                value={deliveryDetails.deliveryTime}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  deliveryTime: e.target.value
                })}
              />
            </div>

            {/* Delivery Price */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Price (Tshs)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter delivery price"
                value={deliveryDetails.deliveryPrice}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  deliveryPrice: e.target.value
                })}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <div>
                {isEditing && (
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-2"
                    onClick={() => {
                      const updatedDeliveries = deliveries.map(delivery => {
                        if (delivery.id === selectedOrder.id) {
                          return {
                            ...delivery,
                            status: "Pending",
                            deliveryLocation: "",
                            deliveryTime: "",
                            deliveryPrice: ""
                          };
                        }
                        return delivery;
                      });
                      setDeliveries(updatedDeliveries);
                      setShowModal(false);
                    }}
                  >
                    Un-schedule
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  className="px-4 py-1 border rounded-lg text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrder(null);
                    setDeliveryDetails({
                      deliveryLocation: "",
                      deliveryTime: "",
                      deliveryPrice: ""
                    });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                  onClick={handleScheduleDelivery}
                  disabled={!selectedOrder || !deliveryDetails.deliveryLocation || !deliveryDetails.deliveryTime || !deliveryDetails.deliveryPrice}
                >
                  {isEditing ? 'Update' : 'Schedule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this delivery order?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-1 border rounded-lg text-gray-700 hover:bg-gray-200"
                onClick={cancelDelete}
              >
                No
              </button>
              <button
                className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}