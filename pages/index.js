import Head from 'next/head'
import { useState } from 'react'
import { HFLayout } from '@components/Layout.js'
import SearchFilter from '@components/SearchFilter'
import BooksList from '@components/BooksList'
import Pagination from '@components/Pagination'
import OnlyAvailable from '@components/OnlyAvailable'
import { isMobile } from 'react-device-detect'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const Home = () => {
  
  const [params, setParams] = useState({
    query: '',
    filter: 'title',
    sort: 'title',
    order: 'asc',
    perPage: isMobile ? '20' : '50',
    page: 1,
    onlyAvailable: false
  })
  
  const { data, error } = useSWR(['/api/books', params])

  console.log(data)
  
  return (
    <div>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <SearchFilter 
            params={params} setParams={setParams} 
            extraFilters={[
              <OnlyAvailable params={params} setParams={setParams} />
            ]} 
          />
          <BooksList books={data} setParams={setParams} error={error} />
          <Pagination 
            params={params} setParams={setParams} 
            perPage={params.perPage} data={data}
          />
        </Container>
      </HFLayout>
    </div>
  )
}

export default Home;