import React from 'react';

const FuelInventory = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Fuel Inventory</h2>
        <i className="fas fa-gas-pump text-blue-500"></i>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Diesel</span>
            <span className="text-sm font-medium text-gray-700">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Petrol</span>
            <span className="text-sm font-medium text-gray-700">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelInventory;
