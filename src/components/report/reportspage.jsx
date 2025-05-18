import React, { useState } from 'react';
import ReportCard from './ReportCard';
import DateRangeSelector from './DateRangeSelector';
import ReportModal from './ReportModal';
import { reportData } from './mockData';

const ReportPage = () => {
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' });
  const [activeModal, setActiveModal] = useState(null);
  
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };
  
  const openModal = (reportId) => {
    setActiveModal(reportId);
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reports Dashboard</h2>
        <DateRangeSelector onChange={handleDateRangeChange} initialRange={dateRange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {reportData.map((report) => (
          <ReportCard 
            key={report.id}
            report={report}
            onExpand={() => openModal(report.id)}
          />
        ))}
      </div>
      
      {activeModal && (
        <ReportModal
          report={reportData.find(r => r.id === activeModal)}
          onClose={closeModal}
          dateRange={dateRange}
        />
      )}
    </div>
  );
};

export default ReportPage;
