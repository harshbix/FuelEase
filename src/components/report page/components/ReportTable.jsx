import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Download } from 'lucide-react';
import { getStatusIcon, getStatusColor } from '../data/reportsData';

function ReportTable({ report }) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Get table data from the report
  const { columns, rows } = report.tableData;

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort and filter data
  let filteredRows = [...rows];
  
  if (searchTerm) {
    filteredRows = filteredRows.filter((row) => 
      Object.values(row).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  
  if (sortField) {
    filteredRows.sort((a, b) => {
      const fieldA = Object.values(a)[columns.findIndex(col => col.toLowerCase().includes(sortField.toLowerCase()))];
      const fieldB = Object.values(b)[columns.findIndex(col => col.toLowerCase().includes(sortField.toLowerCase()))];
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // Pagination
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);
  
  // Handle export
  const handleExport = (format) => {
    console.log(`Exporting table data as ${format}`);
    // Logic for exporting data would go here
  };
  
  // Get field key from column name
  const getFieldKey = (columnName) => {
    const mapping = {
      'Pump ID': 'id',
      'Station': 'station',
      'Status': 'status',
      'Last Maintenance': 'lastMaintenance',
      'Fuel Type': 'fuelType',
      'Current Level': 'currentLevel',
      'Capacity': 'capacity',
      'Last Delivery': 'lastDelivery',
      'Supplier': 'supplier',
      'Date': 'date',
      'Old Price': 'oldPrice',
      'New Price': 'newPrice',
      'Change': 'change',
      'Approved By': 'approvedBy',
      'Employee ID': 'employeeId',
      'Name': 'name',
      'Role': 'role',
      'Last Login': 'lastLogin'
    };
    
    return mapping[columnName] || columnName.toLowerCase().replace(/\s+/g, '');
  };
  
  return (
    <div className="overflow-hidden">
      {/* Table controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <div className="absolute right-0 z-10 mt-2 hidden bg-white border border-gray-200 rounded-md shadow-lg group-hover:block">
              <div className="py-1">
                <button 
                  onClick={() => handleExport('csv')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  CSV
                </button>
                <button 
                  onClick={() => handleExport('pdf')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column}
                    {sortField === column && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => {
                  const fieldKey = getFieldKey(column);
                  const value = row[fieldKey];
                  
                  // Special rendering for status column
                  if (column === 'Status') {
                    const StatusIcon = getStatusIcon(value);
                    const statusColor = getStatusColor(value);
                    
                    return (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon className={`h-4 w-4 mr-1.5 ${statusColor}`} />
                          <span>{value}</span>
                        </div>
                      </td>
                    );
                  }
                  
                  // Default rendering
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportTable;