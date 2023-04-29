import { db } from '@db'

const retrieveBook = (bookId) => {
  const returning = ['title', 'author'];
  
  return db.one(
    `UPDATE books
     SET person_id = NULL
     WHERE book_id = $<bookId>
     RETURNING $<returning~>`,
    { returning, bookId }
  )
}

export default retrieveBook;