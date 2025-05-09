// taday's sales component
import React from 'react';

const TodaysSales = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Today's Sales</h2>
        <i className="fas fa-chart-line text-blue-500"></i>
      </div>
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-800">$12,456.78</p>
        <p className="text-sm text-green-500">+15% from yesterday</p>
      </div>
    </div>
  );
};

export default TodaysSales;
