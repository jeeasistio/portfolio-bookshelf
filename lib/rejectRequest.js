import { db } from '@db'

const rejectRequest = (requestId) => {
  const returning = ['book_id', 'person_id'];
  const rejected = 'rejected';
  
  return db.one(
    `UPDATE requests
     SET request_status = $<rejected>
     WHERE request_id = $<requestId>
     RETURNING $<returning~>`,
    { returning, rejected, requestId }
  )
}

export default rejectRequest;