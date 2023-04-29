import { db } from '@db'

const deleteRequest = (requestId) => {
  const returning = ['book_id', 'person_id'];
  
  return db.one(
    `DELETE FROM requests
     WHERE request_id = $<requestId>
     RETURNING $<returning~>`,
    { returning, requestId }
  )
}

export default deleteRequest;