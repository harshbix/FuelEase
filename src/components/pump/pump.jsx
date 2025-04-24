// FuelPriceManager.jsx
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

const FuelCard = ({ fuel, onEdit, onSchedule }) => (
  <div className="bg-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-900">{fuel.type}</h3>
      <div className="flex space-x-3">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg shadow"
          onClick={() => onEdit(fuel)}
        >
          Edit Price
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-4 py-2 rounded-lg shadow"
          onClick={() => onSchedule(fuel)}
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
            <p>{format(new Date(change.date), "yyyy-MM-dd HH:mm")}</p>
          </div>
        ))}
      </div>
    )}
    <div>
      <h4 className="text-sm font-medium text-gray-700">Price History</h4>
      {fuel.priceHistory.map((history, idx) => (
        <div key={idx} className="flex justify-between text-sm text-gray-500">
          <p>{history.price}</p>
          <p>{format(new Date(history.date), "yyyy-MM-dd HH:mm")}</p>
          <p>{history.user}</p>
        </div>
      ))}
    </div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-xl shadow-xl w-96 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>
        <X />
      </button>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
    {message}
  </div>
);

const FuelPriceManager = () => {
  const [fuelData, setFuelData] = useState([
    {
      type: "Petrol",
      currentPrice: "Tsh.3150",
      scheduledChanges: [],
      priceHistory: [
        { price: "Tsh.3000", date: new Date(), user: "admin" },
        { price: "Tsh.3100", date: new Date(), user: "admin" },
      ],
    },
    {
      type: "Diesel",
      currentPrice: "Tsh.3050",
      scheduledChanges: [],
      priceHistory: [
        { price: "Tsh.2900", date: new Date(), user: "admin" },
        { price: "Tsh.2950", date: new Date(), user: "admin" },
      ],
    },
    {
      type: "Kerosene",
      currentPrice: "Tsh.2800",
      scheduledChanges: [],
      priceHistory: [
        { price: "Tsh.2600", date: new Date(), user: "admin" },
        { price: "Tsh.2700", date: new Date(), user: "admin" },
      ],
    },
  ]);

  const [selectedFuel, setSelectedFuel] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [toast, setToast] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputDate, setInputDate] = useState("");

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeModal = () => {
    setModalType(null);
    setInputValue("");
    setInputDate("");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSavePrice = () => {
    if (!inputValue || isNaN(inputValue)) return showToast("Enter valid numeric price.");
    const formattedPrice = inputValue.startsWith("Tsh.") ? inputValue : `Tsh.${inputValue}`;
    setFuelData(prev => prev.map(f => f.type === selectedFuel.type ? { ...f, currentPrice: formattedPrice } : f));
    closeModal();
    showToast("Price updated successfully!");
  };

  const handleSaveSchedule = () => {
    if (!inputValue || !inputDate || new Date(inputDate) < new Date()) return showToast("Enter valid future date and price.");
    const formattedPrice = inputValue.startsWith("Tsh.") ? inputValue : `Tsh.${inputValue}`;
    const newSchedule = { price: formattedPrice, date: inputDate };
    setFuelData(prev => prev.map(f => f.type === selectedFuel.type ? { ...f, scheduledChanges: [...f.scheduledChanges, newSchedule] } : f));
    closeModal();
    showToast("Schedule added successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-center text-4xl font-extrabold">Fuel Price Management</h1>
      </header>

      {toast && <Toast message={toast} />}

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Manage Fuel Prices</h2>
          <button className="bg-blue-800 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg shadow">
            View Competitor Prices
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fuelData.map((fuel, index) => (
            <FuelCard
              key={index}
              fuel={fuel}
              onEdit={(f) => {
                setSelectedFuel(f);
                setInputValue(f.currentPrice.replace("Tsh.", ""));
                setModalType("edit");
              }}
              onSchedule={(f) => {
                setSelectedFuel(f);
                setModalType("schedule");
              }}
            />
          ))}
        </div>
      </main>

      {modalType && (
        <Modal
          title={modalType === "edit" ? "Edit Price" : "Schedule Change"}
          onClose={closeModal}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            placeholder="Enter price"
          />
          {modalType === "schedule" && (
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            />
          )}
          <div className="flex justify-end gap-3">
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-400 text-white px-5 py-2 rounded-lg shadow">
              Cancel
            </button>
            <button
              onClick={modalType === "edit" ? handleSavePrice : handleSaveSchedule}
              className="bg-blue-800 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FuelPriceManager;