// frontend/src/services/salesService.js
import axios from 'axios';

// 🚨 DEFINING THE BASE_URL WITH FALLBACK LOGIC 🚨
// 1. Attempts to use the VITE_BACKEND_URL (your live Vercel URL).
// 2. If VITE_BACKEND_URL is undefined (e.g., when running locally without a .env file, or if the variable is missing), 
//    it falls back to the local development URL.

const LIVE_URL = import.meta.env.VITE_BACKEND_URL;
const LOCAL_URL = 'http://localhost:3000/api/sales'; // Your local Express server endpoint

const BASE_URL = LIVE_URL ? LIVE_URL : LOCAL_URL;


export const fetchSalesData = async (queryState) => {
    
    // Deconstructed props (removed for brevity, but they are still used below)
    const { 
        page, 
        limit, 
        sortBy, 
        sortOrder, 
        search, 
        filters, 
        ageRange,
        amountRange, 
        ...rest 
    } = queryState;

    // Build base params
    const params = {
        page,
        limit,
        sortBy,
        sortOrder,
        search: search || undefined,

        minAmount: amountRange?.min || undefined,
        maxAmount: amountRange?.max || undefined,
        minAge: ageRange?.min || undefined,
        
        ...filters,
        ...rest,
    };

    
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
    );

    try {
        // Use BASE_URL, which is now guaranteed to be a valid URL
        const response = await axios.get(BASE_URL, { params: cleanParams });
        return response.data;
    } catch (error) {
        console.error(`Error fetching sales data from ${BASE_URL}:`, error);
        throw error;
    }
};