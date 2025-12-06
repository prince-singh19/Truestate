// backend/src/models/Sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    // Customer Fields
    'Customer ID': { type: String, required: true },
    'Customer Name': { type: String, required: true },
    'Phone Number': { type: String },
    'Gender': { type: String },
    'Age': { type: Number },
    'Customer Region': { type: String },
    'Customer Type': { type: String },

    // Product Fields
    'Product ID': { type: String },
    'Product Name': { type: String },
    'Brand': { type: String },
    'Product Category': { type: String },
    'Tags': { type: String },

   
    'Quantity': { type: Number },
    'Price per Unit': { type: Number },
    'Discount Percentage': { type: Number },
    'Total Amount': { type: Number },
    'Final Amount': { type: Number, index: true }, // Index for fast filtering

  
    'Date': { type: Date, index: true }, 
    'Payment Method': { type: String },
    'Order Status': { type: String },
    'Delivery Type': { type: String },
    'Store ID': { type: String },
    'Store Location': { type: String },
    'Salesperson ID': { type: String },
    'Employee Name': { type: String },
}, {
  
    collection: 'sales', 
    timestamps: true 
});

module.exports = mongoose.model('Sale', SaleSchema);