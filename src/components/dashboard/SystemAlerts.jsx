// system alerts component
import React from 'react';

const SystemAlerts = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">System Alerts</h2>
        <i className="fas fa-bell text-blue-500"></i>
      </div>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-yellow-500 mt-0.5"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-500">Low fuel level in Tank 2</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-yellow-500 mt-0.5"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-500">Maintenance due for Pump 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;
