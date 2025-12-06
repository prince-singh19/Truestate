// frontend/src/services/salesService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/sales';


export const fetchSalesData = async (queryState) => {
   
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
        search: search || undefined, // Only include if present

       
        minAmount: amountRange?.min || undefined,
        maxAmount: amountRange?.max || undefined,
        minAge: ageRange?.min || undefined,
      
        ...filters,
        ...rest, // Catches any remaining keys
    };

   
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
    );

    try {
        const response = await axios.get(BASE_URL, { params: cleanParams });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};