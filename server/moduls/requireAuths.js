var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extracting JWT secret from environment variable
     //const JWT_SECRET = process.env.JWT_SECRET;
     const JWT_SECRET = 'c045acda77617205441ef2';
     var token = req.signedCookies;
     token = token['Authorization'];
     try {
        const verified = jwt.verify(token,JWT_SECRET);
        req.email=verified;
        return next()
     } catch (err) {
        console.log('error token verify',err)
     }

    }

