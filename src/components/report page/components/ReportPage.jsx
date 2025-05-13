import React from 'react';
import { Calendar } from 'lucide-react';
import ReportCard from './ReportCard';
import DateRangeSelector from './DateRangeSelector';

function ReportPage({ data, dateRange, setDateRange }) {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">FuelEase Report Page</h1>
            <p className="text-gray-600 mt-1">Station Manager Reports</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <DateRangeSelector 
              dateRange={dateRange} 
              setDateRange={setDateRange} 
            />
          </div>
        </div>
      </header>

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
