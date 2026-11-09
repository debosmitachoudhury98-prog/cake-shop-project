
function authorize(role = 'admin') {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Access denied, please login first'
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: 'Access denied, admin only'
            });
        }

        next();
    };
}

module.exports = authorize;
