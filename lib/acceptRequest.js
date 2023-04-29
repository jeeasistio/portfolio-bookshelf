import { db } from '@db'
import lendBook from './lendBook'

const acceptRequest = async (requestId, bookId, personId) => {
  const accepted = 'accepted';
  const rejected = 'rejected';
  
  await db.none(
    `UPDATE requests
     SET request_status = $<rejected>
     WHERE book_id = $<bookId>`,
    { rejected, bookId }
  )
  
  await db.none(
    `UPDATE requests
     SET request_status = $<accepted>
     WHERE book_id = $<bookId> AND person_id = $<personId>`,
    { accepted, bookId, personId }
  )
  
  return await lendBook(bookId, personId);
}

export default acceptRequest;