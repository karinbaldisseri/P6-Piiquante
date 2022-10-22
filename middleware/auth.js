const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // if (!token) ?  ou header == null (= null + undefined) nécessaire puisque qans un  try/catch
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); 
        const userId = decodedToken.userId;
        req.auth = { userId };
        next();
    } catch(error) {
        res.status(403).json({ error: 'Unauthorized request' });  // ??? est-ce correct ?
    }
};

/* module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); 
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== req.auth.userId) {
            //throw "error : bad request";
            return res.status(403).json({ error: 'Unauthorized request' });
        }
        next();
    } catch(error) {
        res.status(403).json({ error: 'Unauthorized request' });  // ??? est-ce correct ?
    }
}; */