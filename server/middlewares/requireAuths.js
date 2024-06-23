const jwt = require('jsonwebtoken');

function verifyAdminToken(req, res, next) {
  // token for buyers login for requests توكن لعملاء الجملة لطلبات الشراء
  //const token = req.headers.authorization
  const token = req.headers.authorization.split(' ')[1]

    console.log('req.headers authorization',req.headers.authorization)
    console.log('req.headers authorization split:',req.headers.authorization.split(' ')[1])
  if (!token) {
    console.log('No token provided')
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'c045acda77617205441ef7', (err, decoded) => {
    if (err) {
        console.log('Failed to authenticate token')
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    console.log('authenticated token')
    req.email = decoded.email;
    next();
  });
}

function verifyCustomerToken(req, res, next) {
  // توكن لعملاء التجزئة
  //const token = req.headers.authorization
  const token = req.headers.authorization.split(' ')[1]

    console.log('req.headers verifyCustomerToken authorization',req.headers.authorization)
    console.log('req.headers verifyCustomerToken authorization split:',req.headers.authorization.split(' ')[1])
  if (!token) {
    console.log('No token verifyCustomerToken provided')
    return res.status(401).json({ message: 'No token verifyCustomerToken provided' });
  }

  jwt.verify(token, 'c045acda77617205441ef8', (err, decoded) => {
    if (err) {
        console.log('Failed to authenticate Admin token')
      return res.status(403).json({ message: 'Failed to authenticate Admin token' });
    }
    console.log('authenticated token')
    req.email = decoded.email;
    next();
  });
}

module.exports = {verifyAdminToken, verifyCustomerToken};
//module.exports = verifyToken;