import React from 'react';

const NavigationBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <i className={`fas fa-home text-lg ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}>HOME</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('pump')}>
              <i className={`fas fa-gas-pump text-lg ${activeTab === 'pump' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'pump' ? 'text-blue-600' : 'text-gray-600'}`}>PUMP</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('transactions')}>
              <i className={`fas fa-exchange-alt text-lg ${activeTab === 'transactions' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'transactions' ? 'text-blue-600' : 'text-gray-600'}`}>TRANSACTIONS</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('inventory')}>
              <i className={`fas fa-box text-lg ${activeTab === 'inventory' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'inventory' ? 'text-blue-600' : 'text-gray-600'}`}>INVENTORY</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('fuel')}>
              <i className={`fas fa-tag text-lg ${activeTab === 'fuel' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'fuel' ? 'text-blue-600' : 'text-gray-600'}`}>FUEL PRICE</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('staff')}>
              <i className={`fas fa-users text-lg ${activeTab === 'staff' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'staff' ? 'text-blue-600' : 'text-gray-600'}`}>STAFF</span>
            </div>
            
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('report')}>
              <i className={`fas fa-file-alt text-lg ${activeTab === 'report' ? 'text-blue-600' : 'text-gray-600'}`}></i>
              <span className={`ml-2 font-medium ${activeTab === 'report' ? 'text-blue-600' : 'text-gray-600'}`}>REPORT</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="fas fa-user text-gray-500"></i>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
