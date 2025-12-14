import React from 'react';
import { Paperclip } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-CA');
  } catch {
    return dateString;
  }
};

const TransactionTable = ({ data, loading, error }) => {
  const columns = [
    'Transaction ID', 'Date', 'Customer ID', 'Customer Name', 'Phone Number',
    'Product Category', 'Quantity', 'Total Amount',
    'Gender', 'Age', 'Customer Region', 'Product ID', 'Employee Name'
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 bg-white">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!data || data.length === 0 || error) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 text-gray-400 bg-white text-sm">
        {error ? error : 'No transactions found.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white flex-1 border-t border-gray-200">
      <table className="min-w-full w-full text-left text-sm">
        {/* Header */}
        <thead className="bg-[#F9FAFB] text-gray-600 font-semibold sticky top-0">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="px-3 py-2 border-b border-gray-200 uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr
              key={item._id || index}
              className="hover:bg-gray-50 transition"
            >
              {columns.map(col => {
                let content = item[col];

                if (col === 'Date') {
                  content = formatDate(content);
                }

                return (
                  <td
                    key={col}
                    className="px-3 py-2 text-gray-700"
                  >
                    {content ?? '-'}
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
