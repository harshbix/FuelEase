import React from 'react';

const PumpStationMonitor = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Pump Station Monitor</h2>
        <i className="fas fa-tachometer-alt text-blue-500"></i>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Pump 1</span>
          <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full !rounded-button whitespace-nowrap">Active</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Pump 2</span>
          <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full !rounded-button whitespace-nowrap">Active</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Pump 3</span>
          <span className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full !rounded-button whitespace-nowrap">Idle</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Pump 4</span>
          <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full !rounded-button whitespace-nowrap">Error</span>
        </div>
      </div>
    </div>
  );
};

export default PumpStationMonitor;
