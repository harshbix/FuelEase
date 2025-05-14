import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { reportsData } from '../data/reportsData';
import ReportTable from './ReportTable';

function Modal({ isOpen, onClose, reportId }) {
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

  const { title } = report;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-transparent transition-opacity" onClick={onClose} />
        
        <div 
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="inline-block w-full max-w-4xl max-h-[80vh] p-6 my-8 text-left align-middle transition-all transform bg-white text-gray-900 shadow-lg rounded-lg border border-gray-300 overflow-auto focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
            <h3 id="modal-title" className="text-xl font-semibold text-gray-900">{title} Report</h3>
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

          <ReportTable report={report} />

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
