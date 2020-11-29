import handler from '@lib/handler'
import { db } from '@db'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import bcrypt from 'bcrypt'

export default handler
.post((req, res) => {
  const { email, password } = req.body;
  
  db.one('SELECT * from people WHERE email = $1', [email])
    .then( async person => {
      if (person.role !== 'reader') 
        return res.status(400).json({ msg: 'User is not a reader' })
      
      const match = await bcrypt.compare(password, person.password);
      
      if (!match) 
        return res.status(400).json({ msg: 'Incorrect Password' })
          
        const token = jwt.sign({ id: person.person_id }, process.env.JWT_SECRET);
        
        nookies.set({ res }, 'auth-token', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
          httpOnly: true,
          sameSite: 'strict'
        })
        nookies.set({ res }, 'user-role', 'reader', {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        nookies.set({ res }, 'role', 'reader', {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
          httpOnly: true,
          sameSite: 'strict'
        })
        return res.json({ 
          msg: 'Login Successful', 
          user: {
            user: person.person_name,
            email: person.email
          }
        });
    })
    .catch(err => res.status(400).json({ msg: 'User does not exist' }))
})