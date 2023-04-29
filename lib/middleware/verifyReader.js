import jwt from 'jsonwebtoken'
import nookies from 'nookies'

const verifyLibrarian = (req, res, next = () => null) => {
  const role = nookies.get({ req })['role'];
  
  if (role !== 'reader') 
    return res.status(400).json({ msg: 'Permission denied, please login as reader' })
    
  return next();
}

export default verifyLibrarian;