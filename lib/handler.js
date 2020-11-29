import nc from 'next-connect'
import cors from 'cors'
import morgan from 'morgan'
import { connectDb } from './middleware/connectDb'
import verifyToken from './middleware/verifyToken'
import verifyLibrarian from './middleware/verifyLibrarian'
import verifyReader from './middleware/verifyReader'

const commonDev = nc().use(cors()).use(morgan('dev')).use(connectDb)
const commonProd = nc().use(connectDb)
const loginAuth = nc().use('/api/reader', verifyToken).use('/api/reader', verifyReader)
const librarianAuth = nc().use('/api/librarian', verifyToken).use('/api/librarian', verifyLibrarian)

const onError = (err, req, res) => {
  res.status(500).json({ msg: 'Something Went Wrong', error: err.message })
}
const onNoMatch = (req, res) => {
  res.status(400).json({ msg: `Method ${req.method} not allowed` })
}

export default nc({ onError, onNoMatch })
  .use(process.env.NODE_ENV === 'development' ? commonDev : commonProd)
  .use(loginAuth)
  .use(librarianAuth)