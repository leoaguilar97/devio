
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (request, response, next) {

    // Get token from header
    const token = request.header('x-auth-token');

    // Check if not token
    if (!token) {
        return response.status(401).json({ msg: 'No token, auth denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        request.user = decoded.user;
    }
    catch (err) {
        console.log("Error middleware auth")
        console.log(err);
        return response.status(401).json({ msg: 'Token is not valid' });
    }

    next();
};

