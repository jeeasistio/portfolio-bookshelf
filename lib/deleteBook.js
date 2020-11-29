import { db } from '@db'

const deleteBook = (bookId) => {
  const returning = ['title', 'author'];
  
  return db.one(
    `DELETE FROM books
     WHERE book_id = $<bookId>
     RETURNING $<returning~>`,
    { bookId, returning }
  )
}

export default deleteBook;