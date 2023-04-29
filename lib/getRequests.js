import { db } from './middleware/connectDb'
import paginateQuery from './paginateQuery'

const getAllRequests = (variables) => {
  const columns = 'request_id, request_status, book_id, title, people.person_id, person_name';
  const { 
    page = 1, 
    perPage = 20, 
    query = '%', 
    order = 'ASC', 
    filter = 'title',
    sort = 'title',
    status = 'pending'
  } = variables;
  
  return paginateQuery(
    `SELECT DISTINCT $<columns^>
     FROM requests
     JOIN people USING (person_id)
     JOIN books USING (book_id)
     WHERE $<filter~> 
     ILIKE '$<query#>%' AND request_status = $<status>
     ORDER BY $<sort~> $<order:alias>`,
    { columns, query, filter, order, sort, status },
    page,
    perPage
  )
}

const getUserRequests = (variables, personId) => {
  const columns = ['request_id', 'request_status', 'book_id', 'title', 'author'];
  const { 
    page = 1, 
    perPage = 20, 
    query = '%', 
    order = 'ASC', 
    filter = 'title',
    sort = 'title',
    status = 'pending'
  } = variables;
  
  return paginateQuery(
    `SELECT DISTINCT $<columns~>
     FROM requests
     JOIN books USING (book_id)
     WHERE requests.person_id = $<personId> AND $<filter~>
     ILIKE '$<query#>%' AND request_status = $<status>
     ORDER BY $<sort~> $<order:alias>`,
    { columns, query, filter, order, sort, personId, status },
    page,
    perPage
  )
}

export {
  getAllRequests,
  getUserRequests
};