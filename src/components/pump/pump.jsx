import React, { useState } from "react";
import FuelCard from "./fuelCard";  // Import the FuelCard component
import Modal from "./Modal";        // Import the Modal component
import Toast from "./Toast";        // Import the Toast component

const FuelPriceManager = () => {
  // Define your state and logic for the FuelPriceManager
  const [fuelData, setFuelData] = useState([
    { type: "Petrol", currentPrice: 100, scheduledChanges: [] },
    { type: "Diesel", currentPrice: 90, scheduledChanges: [] },
  ]);  // Your fuel data
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
      {/* Other content */}
      <div className="container mx-auto px-6 py-8">
        {/* Render fuel cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fuelData.map((fuel, index) => (
            <FuelCard
              key={index}
              fuel={fuel}
              onEdit={handleEditPrice}
              onSchedule={handleScheduleChange}
            />
          ))}
        </div>
      </div>

          <div>
            <input
              type="number"
              placeholder="Enter new price"
              onChange={(e) => handleSavePrice(Number(e.target.value))}
            />
          </div>
      {isEditModalOpen && (
        <Modal title="Edit Price" onClose={() => setIsEditModalOpen(false)}>
          {/* Add your modal content */}
        </Modal>
      )}

      {/* Schedule Change Modal */}
      {isScheduleModalOpen && (
        <Modal title="Schedule Change" onClose={() => setIsScheduleModalOpen(false)}>
          {/* Add your modal content */}
        </Modal>
      )}

      {/* Toast for feedback */}
      {feedbackMessage && <Toast message={feedbackMessage} />}
    </div>
  );
};

export default FuelPriceManager;
