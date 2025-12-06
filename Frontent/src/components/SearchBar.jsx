
import React, { useState } from 'react';

const SearchBar = ({ dispatch }) => {
    const [localSearch, setLocalSearch] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setLocalSearch(value);
        dispatch({ type: 'SET_SEARCH', payload: value }); 
    };

    return (
        <div className="flex items-center ml-2"> 
            <input
                type="text"
                value={localSearch}
                onChange={handleChange}
                placeholder="Name, Phone no., or Transaction ID"
                className="p-3 border border-gray-300 rounded-md text-sm w-64 focus:ring-blue-500 focus:border-blue-500" 
            />
        </div>
    );
};

export default SearchBar;