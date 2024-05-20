const jwt = require('jsonwebtoken');
const constants = require('../util/constants');
const { JWT_SECRET } = process.env;

const authToken = (req, res, next) => {
    try {
        // Extract the token from cookies or the Authorization header
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
          
            return res.status(200).json({
                message: constants.USR_LNG_ER,
                data: {},
                error: true,
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded token data to the request object
        next();
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: {},
            error: true,
            success: false
        });
    }
};

module.exports = authToken;
