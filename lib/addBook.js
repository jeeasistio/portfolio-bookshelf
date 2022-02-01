import { db } from '@db'

const addBook = (details) => {
  const columns = ['title', 'author', 'summary']
  const returning = ['title', 'author', 'summary']

  return db.one(
    `INSERT INTO books ($<columns~>)
     VALUES ($<title>, $<author>, $<summary>)
     RETURNING $<returning~>`,
    { columns, returning, ...details }
  )
}

export default addBook
