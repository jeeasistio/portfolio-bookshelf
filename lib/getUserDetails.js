import { db } from './middleware/connectDb'

const getUserDetails = (personId) => {
  const columns = ['person_name', 'address', 'email'];
  
  return db.one(
    `SELECT $<columns~>
     FROM people
     WHERE person_id = $<personId>`,
    { columns, personId }
  )
}

export default getUserDetails;