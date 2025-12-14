import Sale from '../models/Sale.js';
async function getSales(query) {
    const { 
        page = 1, 
        limit = 10, 
        sortBy = 'Date', 
        sortOrder = 'desc', 
        search, 
        minAmount,
        maxAmount,
        minAge,
        maxAge,
        ...filters 
    } = query;
    const filter = {};
    for (const key in filters) {
        if (Sale.schema.paths[key] && filters[key]) {
            filter[key] = filters[key];
        }
    }
    if (minAmount || maxAmount) {
        filter['Final Amount'] = {};
        if (minAmount) filter['Final Amount'].$gte = parseFloat(minAmount);
        if (maxAmount) filter['Final Amount'].$lte = parseFloat(maxAmount);
    }
    if (minAge || maxAge) {
        filter['Age'] = {};
        if (minAge) filter['Age'].$gte = parseInt(minAge, 10);
        if (maxAge) filter['Age'].$lte = parseInt(maxAge, 10);
    }

   
    if (search) {
        const searchRegex = new RegExp(search, 'i'); 
        const searchConditions = {
            $or: [
                { 'Customer Name': searchRegex },
                { 'Product Name': searchRegex },
                { 'Transaction ID': searchRegex },
            ]
        };
        filter.$and = filter.$and ? [...filter.$and, searchConditions] : [searchConditions];
    }
    
    const skip = (page - 1) * limit;
    const totalRecords = await Sale.countDocuments(filter);

    // --- 3. SORTING ---
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 }; 

    // --- 4. FETCH DATA ---
    const data = await Sale.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();

    // --- 5. AGGREGATE SUMMARY ---
    
    const aggregationResult = await Sale.aggregate([
        { $match: filter }, 
        { $group: {
            _id: null,
            totalUnitsSold: { $sum: '$Quantity' },
            totalAmount: { $sum: '$Final Amount' },
            totalDiscount: { $sum: '$Discount Percentage' }
        }}
    ]);

    const summary = aggregationResult[0] || { totalUnitsSold: 0, totalAmount: 0, totalDiscount: 0 };

    return {
        
        summary: {
            totalUnitsSold: summary.totalUnitsSold,
            totalAmount: summary.totalAmount ? summary.totalAmount.toFixed(2) : "0.00",
            totalDiscount: summary.totalDiscount ? summary.totalDiscount.toFixed(2) : "0.00"
            
        },
        pagination: {
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: parseInt(page, 10),
            pageSize: parseInt(limit, 10),
        },
        data: data,
    };
   
    

}

export default getSales;