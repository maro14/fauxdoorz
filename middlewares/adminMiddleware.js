const adminMiddleware = (handler) => (req, res) => {
    // Check for both user existence and admin role
    if (!req.user?.role === 'admin') {
        return res.status(403).json({ 
            message: 'Forbidden: Admin access required',
            error: 'UNAUTHORIZED_ADMIN_ACCESS'
        });
    }

    // Add admin context to request
    req.isAdminRequest = true;
    
    // Proceed to handler
    return handler(req, res);
};

export default adminMiddleware;