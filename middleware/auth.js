const jwt = require('jsonwebtoken');

// AUTHORIZE 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); 
        const userId = decodedToken.userId;
        req.auth = { userId };
        next();
    } catch(error) {
        res.status(500).json({ error });  
    }
};

