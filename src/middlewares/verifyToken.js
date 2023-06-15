const jwt = require('jsonwebtoken');
const config = require( "./../config" );

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            if (err) {
                res.json({result: err});
            } else {
                next();
            }
        });
    } else {
        res.send({
            result: 'Token not provided'
        })
    }    
}

module.exports = verifyToken;