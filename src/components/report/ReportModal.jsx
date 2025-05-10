import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Clock, Download, Filter } from 'lucide-react';
import StatusTag from './StatusTag';

const ReportModal = ({ report, onClose, dateRange }) => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!report || !report.items) {
    return null;
  }

  // Filter items based on selected filter and date range
  const filteredItems = report.items.filter(item => {
    // Date range filter
    const itemDate = new Date(item.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    const isInDateRange = itemDate >= startDate && itemDate <= endDate;

    // Status filter
    const matchesStatusFilter = filter === 'all' || item.status === filter;

    return isInDateRange && matchesStatusFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <div className={`p-2 rounded-md mr-3 ${report.iconBgColor}`}>
              {/* Placeholder for icon */}
              <div className={`h-5 w-5 ${report.iconColor}`}>📊</div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{report.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Showing data from {dateRange.start} to {dateRange.end}
              </span>
              <a href="#" className="ml-4 text-blue-600 hover:text-blue-800 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                View change log
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="removed">Removed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <button className="flex items-center text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{item.date}</td>
                    <td className="py-3 px-4">
                      <StatusTag status={item.status} />
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No data found for the selected filters.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} entries
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReportModal.propTypes = {
  report: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.string,
        details: PropTypes.string,
      })
    ),
    iconBgColor: PropTypes.string,
    iconColor: PropTypes.string,
    title: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default ReportModal;
