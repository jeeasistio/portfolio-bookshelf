const pgp = require('pg-promise')({ noWarnings: true });

let connected = false;
const db = pgp(process.env.DB_URI);
if (db) connected = true;

const connectDb = (req, res, next = () => null) => {
  if (connected) return next();
  res.status(400).json({ msg: 'Cannot connect to database'})
}

module.exports = { connectDb, db };