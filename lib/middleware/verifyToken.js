import jwt from 'jsonwebtoken'
import nookies from 'nookies'

const verifyToken = (req, res, next = () => null) => {
  const token = nookies.get({ req })['auth-token'];
  
  if (!token) 
    return res.status(400).json({ msg: 'Please login' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    return next();
  } catch (e) {
    res.status(400).json({ msg: 'Please login'});
  } 
}

export default verifyToken;