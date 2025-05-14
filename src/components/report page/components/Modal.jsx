import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { reportsData, getStatusIcon, getStatusColor } from '../data/reportsData';

function Modal({ isOpen, onClose, reportId }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const report = reportsData.find((r) => r.id === reportId);
  if (!report) return null;

  const { title, tableData } = report;
  const { columns, rows } = tableData;

  // Map columns to row keys by matching lowercased and spaceless column names to row keys
  const columnKeyMap = {};
  if (rows.length > 0) {
    const rowKeys = Object.keys(rows[0]);
    columns.forEach((col) => {
      const colKey = col.toLowerCase().replace(/\s/g, '');
      const matchedKey = rowKeys.find((key) => key.toLowerCase() === colKey);
      columnKeyMap[col] = matchedKey || colKey;
    });
  }

  // Fix filtering to check all columns for search term
  const filteredRows = rows.filter((row) =>
    columns.some((col) => {
      const key = columnKeyMap[col];
      const value = row[key] ? String(row[key]).toLowerCase() : '';
      return value.includes(searchTerm.toLowerCase());
    })
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-transparent transition-opacity" onClick={onClose} />
        
          <div 
            className="inline-block w-full max-w-2xl max-h-[70vh] p-6 my-8 text-left align-middle transition-all transform bg-white text-gray-900 shadow-lg rounded-lg border border-gray-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{title} Report</h3>
              <div className="flex space-x-2">
                <button 
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Export Report"
                  onClick={() => alert('Export clicked')}
                >
                  <Download className="h-5 w-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  console.log('Search term:', e.target.value);
                }}
              />
              <div className="flex items-center space-x-4">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => alert('View change log clicked')}
                >
                  View change log
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full border border-gray-200 text-left text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {columns.map((col) => (
                      <th key={col} className="px-4 py-2 border-b border-gray-200">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                        No results found.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-100">
                        {columns.map((col) => {
                          const key = columnKeyMap[col];
                          const value = row[key];

                          if (col.toLowerCase() === 'status') {
                            const Icon = getStatusIcon(value);
                            const colorClass = getStatusColor(value);
                            return (
                              <td key={col} className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                                <Icon className={`h-4 w-4 ${colorClass}`} />
                                <span className={colorClass}>{value}</span>
                              </td>
                            );
                          }

                          return (
                            <td key={col} className="px-4 py-2 border-b border-gray-200">
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Modal;
