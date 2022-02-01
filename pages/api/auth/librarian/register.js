import handler from '@lib/handler'
import { db } from '@db'
import bcrypt from 'bcrypt'

export default handler
.post((req, res) => {
  if (req.body.libraryPassword !== process.env.LIBRARY_PASSWORD) {
    return res.status(400).json({ msg: 'Incorrect Library Password' })
  } 
  
  const role = 'librarian';
  const columns = ['person_name', 'email', 'password', 'address', 'role'];
  const returning = ['person_name', 'email', 'address', 'role'];
  
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    db.one(
      `INSERT INTO people ($<columns~>)
       VALUES ($<email>, $<password>, $<address>, $<role>)
       RETURNING $<returning~>`, 
      { columns, returning, role, ...req.body, password: hash }
    )
      .then(person => res.json({ 
        msg: 'Registered as a librarian',
        user: person
      }))
      .catch(err => {
        if (err.code === '23505') 
          return res.status(400).json({ msg: 'Email already exists' })
          
        res.status(400).json({ msg: err.message })
      })
  });
})