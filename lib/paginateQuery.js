import { db } from '@db'

const paginateQuery = (query, variables = {}, page = 1, perPage = 10) => {
  const offset = perPage * (page - 1);
  
  return db.any(
    `${query} LIMIT $<perPage> OFFSET $<offset>`, 
    { perPage, offset, ...variables }
  )
}

export default paginateQuery;