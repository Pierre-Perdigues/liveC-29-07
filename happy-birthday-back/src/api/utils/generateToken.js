const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex'); // Génère une clé secrète sécurisée de 64 octets

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    generateToken,
    verifyToken
};
