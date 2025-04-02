const validateBookingData = (handler) => (req, res) => {
    const { property, startDate, endDate, totalPrice, guestCount } = req.body;

    // Validate required fields
    if (!property || !startDate || !endDate || !totalPrice) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    // Remove time portion for comparison
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
        return res.status(400).json({ message: 'Start date cannot be in the past' });
    }
    
    if (start >= end) {
        return res.status(400).json({ message: 'Start date must be before the end date' });
    }

    // Validate guest count
    if (guestCount && (isNaN(guestCount) || guestCount < 1)) {
        return res.status(400).json({ message: 'Guest count must be at least 1' });
    }

    // Validate price
    if (isNaN(totalPrice) || totalPrice <= 0) {
        return res.status(400).json({ message: 'Total price must be a positive number' });
    }

    // Proceed to the next handler if validation is successful
    return handler(req, res);
};
    
export default validateBookingData;