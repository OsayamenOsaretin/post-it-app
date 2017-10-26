import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * @export
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * 
 * @return {void}
 */
export default function (req, res, next) {
  const token = req.headers.authorization ||
  req.body.token ||
  req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'You are not signed in'
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Invalid Token'
      });
    }
    req.decoded = decoded;
    next();
  });
}
