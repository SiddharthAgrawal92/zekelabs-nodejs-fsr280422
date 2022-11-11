const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //token in request header 'authorization'
    // const token = req.headers.authorization;

    //token from cookie in request
    const token = req.url === '/refresh' ? req.cookies.refresh_token : req.cookies.access_token;

    if (!token) {
        return res.status(401).send({ error: 'Token is required' });
    }

    try {
        let payload = null;
        if (req.url === '/refresh') {
            payload = JWT.verify(token, process.env.JWT_REFRESH_TOKEN_KEY);
        } else {
            payload = JWT.verify(token, process.env.JWT_TOKEN_KEY);
        }
        req.jwtPayload = payload;
    } catch (err) {
        if (err instanceof JWT.JsonWebTokenError) {
            return res.status(401).send({ error: 'Invalid Token Supplied!' });
        }
    }
    return next();
}

module.exports = verifyToken;