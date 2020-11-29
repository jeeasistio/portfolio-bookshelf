import { db } from '@db'

const lendBook = (bookId, personId) => {
  const returning = ['title', 'author'];
  
  return db.one(
    `UPDATE books
     SET person_id = $<personId>
     WHERE book_id = $<bookId>
     RETURNING $<returning~>`,
    { returning, personId, bookId }
  )
}

export default lendBook;