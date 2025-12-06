// frontend/src/components/Filters.jsx
import React from 'react';

// Example static data for filters 
const filterOptions = {
    'Customer Region': ['North', 'South', 'East', 'West'],
    'Gender': ['Female', 'Male', 'Other'],
    'Product Category': ['Clothing', 'Electronics', 'Footwear'],
    'Payment Method': ['Cash', 'Card', 'UPI'],
    // Tags and Date Range are omitted for simplicity but would follow the same pattern.
};

const Filters = ({ queryState, dispatch }) => {
    const handleFilterChange = (e) => {
        dispatch({
            type: 'SET_FILTER',
            payload: { name: e.target.name, value: e.target.value }
        });
    };

    const handleRangeChange = (type, key) => (e) => {
        dispatch({
            type: 'SET_RANGE_FILTER',
            payload: {
                type,
                min: key === 'min' ? e.target.value : queryState[type].min,
                max: key === 'max' ? e.target.value : queryState[type].max,
            }
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-4 text-sm">
            
            {/* Equality Filters (Dropdowns) */}
            {Object.entries(filterOptions).map(([key, options]) => (
                <select 
                    key={key} 
                    name={key} 
                    value={queryState.filters[key] || ''} 
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">{key}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ))}

            {/* Range Filters: Age */}
            <div className="flex items-center space-x-1">
                <label className="text-gray-600">Age:</label>
                <input 
                    type="number" 
                    placeholder="Min" 
                    value={queryState.ageRange.min}
                    onChange={handleRangeChange('ageRange', 'min')}
                    className="p-2 border border-gray-300 rounded-md w-16"
                />
                <span className="text-gray-500">-</span>
                <input 
                    type="number" 
                    placeholder="Max" 
                    value={queryState.ageRange.max}
                    onChange={handleRangeChange('ageRange', 'max')}
                    className="p-2 border border-gray-300 rounded-md w-16"
                />
            </div>
            
            {/* Range Filters: Amount */}
            <div className="flex items-center space-x-1">
                <label className="text-gray-600">Amount:</label>
                <input 
                    type="number" 
                    placeholder="Min Amt" 
                    value={queryState.amountRange.min}
                    onChange={handleRangeChange('amountRange', 'min')}
                    className="p-2 border border-gray-300 rounded-md w-20"
                />
                <span className="text-gray-500">-</span>
                <input 
                    type="number" 
                    placeholder="Max Amt" 
                    value={queryState.amountRange.max}
                    onChange={handleRangeChange('amountRange', 'max')}
                    className="p-2 border border-gray-300 rounded-md w-20"
                />
            </div>
            
        </div>
    );
};

export default Filters;