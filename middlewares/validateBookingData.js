const validateBookingData = (handler) => (req, res) => {
        const { property, startDate, endDate, totalPrice } = req.body;
    
        // Validate required fields
        if (!property || !startDate || !endDate || !totalPrice) {
        return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Validate dates
        if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'Start date must be before the end date' });
        }
    
        // Proceed to the next handler if validation is successful
        return handler(req, res);
    };
    
export default validateBookingData;