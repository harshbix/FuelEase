import React from 'react';
import ReportCard from './ReportCard';

function ReportPage({ data, dateRange, setDateRange }) {
  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">FuelEase Report Page</h1>
        <p className="text-gray-600 text-lg mb-4">Station Manager Reports</p>
      </header>

      {/* General Filter Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center text-blue-600 font-medium mr-2">
            {/* Calendar Icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" className="mr-1" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
              <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" stroke="currentColor" fill="none"/>
            </svg>
            Date Range:
          </span>
          <span className="text-gray-700">From</span>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={e => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <span className="text-gray-700">To</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={e => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Apply
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((report) => (
          <ReportCard 
            key={report.id} 
            report={report}
          />
        ))}
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2023 FuelEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ReportPage;
