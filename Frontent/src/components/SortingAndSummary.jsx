// frontend/src/components/SortingAndSummary.jsx
import React from 'react';

const sortOptions = [
    { label: 'Date', value: 'Date' },
    { label: 'Quantity', value: 'Quantity' },
    { label: 'Customer Name', value: 'Customer Name' },
    { label: 'Final Amount', value: 'Final Amount' },
];


const SortingAndSummary = ({ summary, queryState, dispatch }) => {
    const { sortBy, sortOrder } = queryState;

    const handleSortChange = (e) => {
        const newSortBy = e.target.value;
        const newSortOrder = sortBy === newSortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'desc'; 
        
        dispatch({ type: 'SET_SORT', payload: { sortBy: newSortBy, sortOrder: newSortOrder } });
    };

    const displayOrder = sortOrder === 'asc' ? ' (ASC)' : ' (DESC)';

    return (
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white
">
            {/* KPI Summary Cards */}
            <div className="flex gap-1">
                <SummaryCard title="Total Units Sold" value={summary.totalUnitsSold || 0} />
                <SummaryCard title="Total Amount" value={`₹${summary.totalAmount || '0.00'}`} />
                <SummaryCard title="Total Discount" value={`${summary.totalDiscount || '0.00'}`} />
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-4 text-sm">
                <label className="text-gray-600">Sort By:</label>
                <select 
                    value={sortBy} 
                    onChange={handleSortChange} 
                    className="p-2 border border-gray-300 rounded-md"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="font-semibold text-gray-700">{displayOrder}</span>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value }) => (
    <div className="border border-gray-200 p-3 rounded-md shadow-sm min-w-[150px] bg-white">
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
);

export default SortingAndSummary;