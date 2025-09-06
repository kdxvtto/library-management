const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
            success : false,
            message : 'Unauthorized'
            })
        }
        if (req.user.role !== requiredRoles) {
            return res.status(403).json({
            success : false,
            message : 'Access denied'
            })
        }
        next()
    }
}

module.exports = checkRole