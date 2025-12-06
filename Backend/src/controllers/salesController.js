
const salesService = require('../services/salesService');

async function getSalesRecords(req, res) {
    try {
        
        const response = await salesService.getSales(req.query);
        
        res.status(200).json(response);

    } catch (error) {
        console.error("Error fetching sales records:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

module.exports = {
    getSalesRecords,
};