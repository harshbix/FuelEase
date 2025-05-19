import React from 'react';
import { FileText, ExternalLink, Bell } from 'lucide-react';
import StatusTag from './StatusTag';

const ReportCard = ({ report, onExpand }) => {
  const hasUpdatesToday = report.items.some(item => {
    const today = new Date().toISOString().split('T')[0];
    return item.date === today;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-md mr-3 ${report.iconBgColor}`}>
              <FileText className={`h-5 w-5 ${report.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
            {hasUpdatesToday && (
              <div className="ml-2 bg-red-100 rounded-full p-1">
                <Bell className="h-3 w-3 text-red-500" />
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{report.description}</p>
        
        <div className="space-y-3 mb-4">
          {report.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-700 truncate max-w-[70%]">{item.name}</span>
              <StatusTag status={item.status} />
            </div>
          ))}
        </div>
        
        {report.items.length > 3 && (
          <p className="text-xs text-gray-500 mb-4">
            +{report.items.length - 3} more items
          </p>
        )}
        
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button 
            onClick={onExpand}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <span>View Details</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </button>
          
          <div className="flex space-x-2">
            <button className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              PDF
            </button>
            <button className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
