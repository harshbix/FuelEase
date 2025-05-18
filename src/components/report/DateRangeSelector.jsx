import React, { useState } from 'react';

const DateRangeSelector = ({ onDateRangeChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
        if (onDateRangeChange) {
            onDateRangeChange({ startDate: value, endDate });
        }
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
        if (onDateRangeChange) {
            onDateRangeChange({ startDate, endDate: value });
        }
    };

    const resetDateRange = () => {
        setStartDate('');
        setEndDate('');
        if (onDateRangeChange) {
            onDateRangeChange({ startDate: '', endDate: '' });
        }
    };

    return (
        <div className="date-range-selector p-4 bg-gray-100 rounded shadow-md flex items-center space-x-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date:
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="date-input border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date:
                </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="date-input border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <button
                    onClick={resetDateRange}
                    className="reset-button bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default DateRangeSelector;