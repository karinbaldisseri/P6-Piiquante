const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // if (!token) ?  ou header == null (= null + undefined) nécessaire puisque qans un  try/catch
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); // `${process.env.JWT_TOKEN}` ?
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(500).json({ error: 'internal server error' });  // ??? est-ce correct ?
    }
};
