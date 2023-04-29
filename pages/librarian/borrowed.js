import Head from 'next/head'
import { useState } from 'react'
import { HFLayout } from '@components/Layout.js'
import SearchFilter from '@components/SearchFilter'
import BorrowedList from '@components/BorrowedList'
import Pagination from '@components/Pagination'
import { isMobile } from 'react-device-detect'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const Borrowed = () => {
  
  const [params, setParams] = useState({
    query: '',
    filter: 'title',
    sort: 'title',
    order: 'asc',
    perPage: isMobile ? '20' : '50',
    page: 1
  })
  
  const { data, mutate, error } = useSWR(['/api/librarian/borrowed', params]);
  
  return (
    <div>
      <Head>
        <title>Borrowed Books</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <SearchFilter params={params} setParams={setParams} />
          <BorrowedList books={data} mutate={mutate} error={error} />
          <Pagination 
            params={params} setParams={setParams} 
            perPage={params.perPage} data={data}
          />
        </Container>
      </HFLayout>
    </div>
  )
}

export default Borrowed;