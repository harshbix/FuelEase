/* main dashboard component */
import React, { useState } from 'react';
import TodaysSales from './TodaysSales';
import FuelInventory from './FuelInventory';
import PumpStationMonitor from './PumpStationMonitor';
import SystemAlerts from './SystemAlerts';
import RecentTransactions from './RecentTransactions';
import FuelStationHeader from './FuelStationHeader';

const Dashboard = () => {
  const [activeTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavigationBar component removed because it does not exist */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && <FuelStationHeader />}

        {activeTab === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TodaysSales />
            <FuelInventory />
            <PumpStationMonitor />
            <SystemAlerts />
            <RecentTransactions />
          </div>
        )}

        {/* StaffPage component removed because it does not exist */}
      </div>
    </div>
  );
};

export default Dashboard;
