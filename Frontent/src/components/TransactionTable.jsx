import React from 'react';
import { Paperclip } from 'lucide-react';

// Helper function to format date strings (remains the same)
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-CA', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    } catch (e) {
        console.error('Date formatting error:', e);
        return dateString;
    }
};

const TransactionTable = ({ data, loading, error }) => {
    // 🚨 FIX: Removed duplicate 'Product ID' from the column list
    const columns = [
        // Core Transaction Info
        'Transaction ID', 'Date', 'Customer ID', 'Customer Name', 'Phone Number', 
        // Product & Sales Info
        'Product Category', 'Quantity', 'Total Amount', 
        // Customer/Operational Details
        'Gender', 'Age', 'Customer Region','Product ID', 'Employee Name' 
    ];

    if (loading) return (
        <div className="flex-1 flex items-center justify-center p-20 bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
    );
    
    if (!data || data.length === 0 || error) return (
        <div className="flex-1 flex flex-col items-center justify-center p-20 text-gray-400 bg-white text-sm">
            {error ? <p className="text-red-500">{error}</p> : <p>No transactions found.</p>}
        </div>
    );

    return (
        // flex-1 ensures the container uses all available vertical space
        <div className="overflow-x-auto bg-white flex-1 border-t border-gray-200">
            {/* min-w-max ensures the table stretches horizontally for scrolling */}
            <table className="min-w-max w-full text-left whitespace-nowrap">
                
                {/* Table Header */}
                <thead className="bg-[#F9FAFB] text-gray-600 text-sm font-semibold uppercase tracking-wider sticky top-0 shadow-sm">
                    <tr>
                        {columns.map(col => (
                            <th 
                                key={col} 
                                // 🚨 INCREASED ROW HEIGHT: Increased vertical padding (py-4) 🚨
                                className="px-5 py-4 border-b border-gray-200"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                    {data.map((item, index) => (
                        <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                            {columns.map(col => {
                                let content = item[col];
                                
                                // ... (Conditional rendering logic remains the same) ...
                                if (col === 'Date') {
                                    content = formatDate(content);
                                } 

                                return (
                                    <td 
                                        key={col} 
                                        // 🚨 INCREASED ROW HEIGHT & TEXT SIZE: py-4 and text-base (was text-sm) 🚨
                                        className="px-5 py-4 text-base text-gray-700 border-b border-gray-100"
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;