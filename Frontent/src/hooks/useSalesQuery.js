
import { useReducer, useEffect, useState, useCallback } from 'react';
import { fetchSalesData } from '../services/salesService';


const INITIAL_STATE = {
    page: 1,
    limit: 10,
    sortBy: 'Date',
    sortOrder: 'desc',
    search: '',
    filters: {
        'Customer Region': '',
        'Gender': '',
        'Product Category': '',
        'Payment Method': '',
    },
    amountRange: { min: '', max: '' },
    ageRange: { min: '', max: '' },
};

// --- REDUCER LOGIC ---
const queryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return { ...state, search: action.payload, page: 1 };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'SET_SORT':
            return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
        case 'SET_FILTER':
            return { 
                ...state, 
                filters: { ...state.filters, [action.payload.name]: action.payload.value }, 
                page: 1 
            };
        case 'SET_RANGE_FILTER':
            return { 
                ...state, 
                [action.payload.type]: { min: action.payload.min, max: action.payload.max }, 
                page: 1 
            };
        case 'RESET_ALL':
            return INITIAL_STATE;
        default:
            return state;
    }
};

// --- CUSTOM HOOK ---
export const useSalesQuery = () => {
    const [queryState, dispatch] = useReducer(queryReducer, INITIAL_STATE);
    const [data, setData] = useState({ data: [], summary: {}, pagination: {} });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce utility function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Memoized function to fetch data
    const executeFetch = useCallback(
        debounce(async (state) => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchSalesData(state);
                
                // --- SAFE PROCESSING OF SUMMARY (Frontend Solution) ---
                const rawSummary = result.summary || { totalUnitsSold: 0, totalAmount: 0, totalDiscount: 0 };

                setData({
                    data: result.data || [],
                    pagination: result.pagination || {},
                    summary: {
                        totalUnitsSold: rawSummary.totalUnitsSold || 0,
                        // Ensure formatting with fallback for null/undefined/0
                        totalAmount: rawSummary.totalAmount ? parseFloat(rawSummary.totalAmount).toFixed(2) : "0.00",
                        totalDiscount: rawSummary.totalDiscount ? parseFloat(rawSummary.totalDiscount).toFixed(2) : "0.00",
                    },
                });

            } catch (err) {
                console.error("Failed to load data:", err);
                setError("Failed to load data. Please check the backend server.");
                setData({ data: [], summary: { totalUnitsSold: 0, totalAmount: "0.00", totalDiscount: "0.00" }, pagination: {} });
            } finally {
                setLoading(false);
            }
        }, 300), 
        []
    );

    // Effect to trigger fetch whenever queryState changes
    useEffect(() => {
        executeFetch(queryState);
    }, [queryState, executeFetch]);

    return {
        data: data.data,
        summary: data.summary,
        pagination: data.pagination,
        loading,
        error,
        queryState,
        dispatch,
    };
};