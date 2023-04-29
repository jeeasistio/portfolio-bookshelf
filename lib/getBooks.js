import { db } from '@db'
import paginateQuery from './paginateQuery'

const getOneBook = (bookId) => {
  const columns = ['book_id', 'title', 'author', 'summary'];
  
  return db.one(
    `SELECT $<columns~>
     FROM books
     WHERE book_id = $<bookId>`,
    { columns, bookId }
  )
}

const getAllBooks = (variables) => {
  const columns = ['book_id', 'title', 'author'];
  const { 
    page = 1, 
    perPage = 20, 
    query = '%', 
    order = 'ASC', 
    filter = 'title',
    sort = 'title',
    onlyAvailable = false,
  } = variables;
  
  return paginateQuery(
    `SELECT $<columns~>
     FROM books 
     WHERE $<filter~> 
     ILIKE '$<query#>%' AND ($<onlyAvailable> IS NULL OR person_id IS NULL)
     ORDER BY $<sort~> $<order:alias>`,
    { columns, query, filter, order, sort, onlyAvailable: onlyAvailable || null },
    page,
    perPage
  )
}

const getAllBorrowed = (variables) => {
  const columns = ['book_id', 'title', 'author', 'person_name', 'person_id'];
  const { 
    page = 1, 
    perPage = 20, 
    query = '%', 
    order = 'ASC', 
    filter = 'title',
    sort = 'title'
  } = variables;
  
  return paginateQuery(
    `SELECT $<columns~>
     FROM books 
     JOIN people USING (person_id)
     WHERE $<filter~> 
     ILIKE '$<query#>%'
     ORDER BY $<sort~> $<order:alias>`,
    { columns, query, filter, order, sort },
    page,
    perPage
  )
}

const getUserBorrowed = (variables, personId) => {
  const columns = ['book_id', 'title', 'author'];
  const { 
    page = 1, 
    perPage = 20, 
    query = '%', 
    order = 'ASC', 
    filter = 'title',
    sort = 'title'
  } = variables;
  
  return paginateQuery(
    `SELECT $<columns~>
     FROM books 
     JOIN people USING (person_id)
     WHERE person_id = $<personId> AND $<filter~>
     ILIKE '$<query#>%'
     ORDER BY $<sort~> $<order:alias>`,
    { columns, query, filter, order, sort, personId },
    page,
    perPage
  )
}

export {
  getOneBook,
  getAllBooks,
  getAllBorrowed,
  getUserBorrowed
};