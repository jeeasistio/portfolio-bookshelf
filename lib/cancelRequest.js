import { db } from '@db'

const cancelRequest = (requestId, personId) => {
  const returning = ['book_id', 'person_id'];
  
  return db.one(
    `DELETE FROM requests
     WHERE person_id = $<personId> AND request_id = $<requestId>
     RETURNING $<returning~>`,
    { returning, requestId, personId }
  )
}

export default cancelRequest;