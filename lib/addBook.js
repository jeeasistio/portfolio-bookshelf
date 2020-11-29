import { db } from '@db'

const addBook = (details) => {
  const columns = ['title', 'author'];
  const returning = ['title', 'author'];
  
  return db.one(
    `INSERT INTO books ($<columns~>)
     VALUES ($<title>, $<author>)
     RETURNING $<returning~>`,
    { columns, returning, ...details }
  )
}

export default addBook;