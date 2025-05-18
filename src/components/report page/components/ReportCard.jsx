import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Download, 
  Bell, 
  List 
} from 'lucide-react';
import Modal from './Modal';
import ReportTable from './ReportTable';

function ReportCard({ report }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = (format) => {
    console.log(`Exporting ${report.title} as ${format}`);
    // Logic for exporting would go here
  };

  const hasUpdatesToday = report.lastUpdated === 'Today';

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${report.bgColor} mr-3`}>
                <report.icon className={`${report.iconColor} h-5 w-5`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {report.title}
                {hasUpdatesToday && (
                  <span className="inline-flex ml-2 items-center">
                    <Bell className="h-4 w-4 text-blue-500" />
                  </span>
                )}
              </h2>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => handleExport('csv')}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                title="Export as CSV"
              >
                <Download className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-1.5 rounded-md hover:bg-blue-50 text-blue-500 transition-colors"
                title="Expand Report"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-sm">{report.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {report.stats.map((stat, index) => {
              let bgColorClass = '';
              const label = stat.label.toLowerCase();

              if (label.includes('petrol')) {
                bgColorClass = 'bg-yellow-100';
              } else if (label.includes('premium')) {
                bgColorClass = 'bg-blue-100';
              } else if (label.includes('diesel') || label.includes('regular')) {
                bgColorClass = 'bg-green-100';
              } else if (['active', 'on leave', 'new hires'].some(keyword => label.includes(keyword))) {
                if (label.includes('active')) {
                  bgColorClass = 'bg-yellow-100';
                } else if (label.includes('on leave')) {
                  bgColorClass = 'bg-blue-100';
                } else if (label.includes('new hires')) {
                  bgColorClass = 'bg-green-100';
                }
              } else if (['active pumps', 'maintenance', 'offline'].some(keyword => label.includes(keyword))) {
                if (label.includes('active pumps')) {
                  bgColorClass = 'bg-yellow-100';
                } else if (label.includes('maintenance')) {
                  bgColorClass = 'bg-blue-100';
                } else if (label.includes('offline')) {
                  bgColorClass = 'bg-green-100';
                }
              }

              return (
                <div key={index} className={`flex flex-col p-2 rounded-md ${bgColorClass}`}>
                  <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {report.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-xs text-gray-500 hover:text-blue-500"
            >
              <List className="h-3 w-3 mr-1" />
              View all data
            </button>
            <span className="text-xs text-gray-400">Last updated: {report.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Moved outside the card to fix flickering */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        reportId={report.id}
      />
    </>
  );
}

export default ReportCard;
