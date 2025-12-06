import getSales from "../services/salesService.js";

async function getSalesRecords(req, res) {
    try {
        const response = await getSales(req.query); // call function directly
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching sales records:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export default getSalesRecords;
