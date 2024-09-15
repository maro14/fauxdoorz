const adminMiddleware = (handler) => (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    // If the user is an admin, proceed to the next handler
    return handler(req, res);
};

export default adminMiddleware;