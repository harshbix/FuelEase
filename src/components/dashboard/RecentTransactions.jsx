// the recent transactions component
import React from 'react';

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Recent Transactions</h2>
        <i className="fas fa-history text-blue-500"></i>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-800">Transaction #2023002</p>
            <p className="text-xs text-gray-500">Diesel - Pump 2</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">$85.00</p>
            <p className="text-xs text-gray-500">5 mins ago</p>
          </div>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-800">Transaction #2023003</p>
            <p className="text-xs text-gray-500">Diesel - Pump 2</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">$85.00</p>
            <p className="text-xs text-gray-500">5 mins ago</p>
          </div>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-800">Transaction #2023004</p>
            <p className="text-xs text-gray-500">Diesel - Pump 2</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">$85.00</p>
            <p className="text-xs text-gray-500">5 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
