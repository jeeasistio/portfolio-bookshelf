import { db } from '@db'

const checkIfRequested = (bookId, personId) => {
  const pending = 'pending';
  
  return db.one(
    `SELECT EXISTS (SELECT *
     FROM requests
     WHERE book_id = $<bookId> AND person_id = $<personId> AND request_status = $<pending>)`,
    { bookId, personId, pending }
  )
}

const checkIfAvailable = (bookId) => {
  return db.one(
    `SELECT EXISTS (SELECT *
     FROM books
     WHERE book_id = $<bookId> AND person_id IS NULL)`,
    { bookId }
  )
}

const makeRequest = async (bookId, personId) => {
  const columns = ['book_id', 'person_id'];
  const returning = ['book_id', 'person_id', 'request_status'];
  
  const { exists: bookAvailable } = await checkIfAvailable(bookId);
  
  if (!bookAvailable) throw { message: 'Book unavailable' };
  
  const { exists: requestedAlready } = await checkIfRequested(bookId, personId);
  
  if (requestedAlready) throw { message: 'Book requested already' };
  
  return db.one(
    `INSERT INTO requests ($<columns~>)
    VALUES ($<bookId>, $<personId>)
    RETURNING $<returning~>`,
    { columns, returning, bookId, personId }
  )
}

export default makeRequest;