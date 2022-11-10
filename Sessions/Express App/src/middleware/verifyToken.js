const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({ error: 'Token is required' });
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_TOKEN_KEY);
        req.jwtPayload = payload;
    } catch (err) {
        if (err instanceof JWT.JsonWebTokenError) {
            return res.status(401).send({ error: 'Invalid Token Supplied!' });
        }
    }
    return next();
}

module.exports = verifyToken;