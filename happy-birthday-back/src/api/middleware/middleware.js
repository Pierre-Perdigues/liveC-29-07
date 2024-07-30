const middleware = (req, res, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);

    const whitelist = [
        { url: '/getBirthday', method: 'GET' },
        { url: '/getQuote', method: 'GET' },
        { url: '/login', method: 'POST' },
    ];

    const isWhitelisted = whitelist.some(route => route.url === req.url && route.method === req.method);

    if (!isWhitelisted) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
    }

    next();
};


module.exports = middleware;
