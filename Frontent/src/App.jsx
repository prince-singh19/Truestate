
import React from 'react';
import { useSalesQuery } from './hooks/useSalesQuery';
import './index.css'; 
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SortingAndSummary from './components/SortingAndSummary';
import TransactionTable from './components/TransactionTable';
import PaginationControls from './components/PaginationControls';


const calculateSummary = (data) => {
    let totalUnitsSold = 0;
    let totalAmount = 0;
    let totalDiscount = 0;
 data.forEach(item => {
        const qty = Number(item.Quantity) || 0;
        const finalAmount = Number(item["Final Amount"]) || 0;
      
        const totalAmounta = Number(item["Total Amount"]) || 0;
        // Calculate actual discount amount
        const discountAmount = (-finalAmount + totalAmounta);

        totalUnitsSold += qty;
        totalAmount += finalAmount;
        totalDiscount += discountAmount;
    });

    return {
        totalUnitsSold,
        totalAmount: totalAmount.toFixed(2),
        totalDiscount: totalDiscount.toFixed(2)
    };
};

const App = () => {
    const { 
        data, 
        pagination, 
        loading, 
        error, 
        queryState, 
        dispatch 
    } = useSalesQuery();

  
    const summary = calculateSummary(data);

    return (
        <div className="flex min-h-screen bg-gray-100"> 
            
            {/* Sidebar */}
            <Sidebar /> 

            {/* Main Content */}
            <div className="flex-grow bg-white flex flex-col">
                
                {/* Header */}
                <div className="flex justify-start items-center p-4 border-b border-gray-200 shadow-sm">
                    <h1 className="text-xl font-bold text-gray-800">Sales Management System</h1>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-wrap items-center p-4 border-b border-gray-200 bg-gray-50 space-x-4">
                    <SearchBar dispatch={dispatch} /> 
                    <Filters queryState={queryState} dispatch={dispatch} />
                </div>
                
                {/* Summary + Sorting */}
                <SortingAndSummary 
                    summary={summary} 
                    queryState={queryState}
                    dispatch={dispatch}
                />

                {/* Table */}
                <div className="flex-grow overflow-x-auto">
                    <TransactionTable 
                        data={data} 
                        loading={loading} 
                        error={error} 
                    />
                </div>

                {/* Pagination */}
                <PaginationControls 
                    pagination={pagination} 
                    dispatch={dispatch} 
                />
            </div>
        </div>
    );
};

export default App;
