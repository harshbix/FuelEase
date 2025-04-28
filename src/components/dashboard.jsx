import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import TodaysSales from './TodaysSales';
import FuelInventory from './FuelInventory';
import PumpStationMonitor from './PumpStationMonitor';
import SystemAlerts from './SystemAlerts';
import RecentTransactions from './RecentTransactions';
import FuelStationHeader from './FuelStationHeader';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

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

        {activeTab === 'staff' && <StaffPage />}
      </div>
    </div>
  );
};

export default App;
