import React from 'react';
import { Calendar } from 'lucide-react';

function DateRangeSelector({ dateRange, setDateRange }) {
  const handleStartDateChange = (e) => {
    setDateRange({
      ...dateRange,
      startDate: e.target.value
    });
  };

  const handleEndDateChange = (e) => {
    setDateRange({
      ...dateRange,
      endDate: e.target.value
    });
  };

  // Preset options for quick date selection
  const presets = [
    { label: 'Today', start: new Date().toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] },
    { label: 'This Week', start: getThisWeekStart(), end: new Date().toISOString().split('T')[0] },
    { label: 'This Month', start: getThisMonthStart(), end: new Date().toISOString().split('T')[0] },
    { label: 'This Year', start: getThisYearStart(), end: new Date().toISOString().split('T')[0] }
  ];

  // Helper functions to calculate date ranges
  function getThisWeekStart() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust to make Monday the start of the week
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - daysToSubtract);
    return weekStart.toISOString().split('T')[0];
  }

  function getThisMonthStart() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  }

  function getThisYearStart() {
    const now = new Date();
    return `${now.getFullYear()}-01-01`;
  }

  const applyPreset = (preset) => {
    setDateRange({
      startDate: preset.start,
      endDate: preset.end
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="date"
          value={dateRange.startDate}
          onChange={handleStartDateChange}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="text-gray-500 self-center hidden sm:block">to</div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={handleEndDateChange}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="relative group">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Presets
        </button>
        
        <div className="absolute right-0 z-10 mt-2 hidden bg-white border border-gray-200 rounded-md shadow-lg group-hover:block">
          <div className="py-1">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateRangeSelector;