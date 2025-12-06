
import React from 'react';

const PaginationControls = ({ pagination, dispatch }) => {
    const { currentPage, totalPages, totalRecords } = pagination;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch({ type: 'SET_PAGE', payload: newPage });
        }
    };

    return (
        <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-white space-x-3">
            <span className="text-sm text-gray-600 mr-4">
                Page {currentPage || 0} of {totalPages || 0} (Total Records: {totalRecords || 0})
            </span>
            
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage <= 1}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm disabled:bg-gray-400 transition-colors hover:bg-blue-600"
            >
                &larr; Previous
            </button>
            
            <span className="font-semibold text-gray-800 text-sm">{currentPage}</span>
            
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage >= totalPages}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm disabled:bg-gray-400 transition-colors hover:bg-blue-600"
            >
                Next &rarr;
            </button>
        </div>
    );
};

export default PaginationControls;