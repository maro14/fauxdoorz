const validatePropertyData = (handler) => (req, res) => {
        const { title, description, location, price, images } = req.body;
    
        // Validate required fields
        if (!title || !description || !location || !price || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: 'All fields are required, and images must be an array with at least one item' });
        }
    
        // Proceed to the next handler if validation is successful
        return handler(req, res);
};

export default validatePropertyData;