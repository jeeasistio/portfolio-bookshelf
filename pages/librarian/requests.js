import Head from 'next/head'
import { useState } from 'react'
import { HFLayout } from '@components/Layout.js'
import SearchFilter from '@components/SearchFilter'
import RequestsList from '@components/RequestsList'
import Pagination from '@components/Pagination'
import StatusFilter from '@components/StatusFilter'
import { isMobile } from 'react-device-detect'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const Requests = () => {
  
  const [params, setParams] = useState({
    query: '',
    filter: 'title',
    sort: 'title',
    order: 'asc',
    perPage: isMobile ? '20' : '50',
    page: 1,
    status: 'pending'
  })
  
  const { data, mutate, error } = useSWR(['/api/librarian/requests', params]);
  
  return (
    <div>
      <Head>
        <title>Requests</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <SearchFilter 
            params={params} setParams={setParams} 
            extraFilters={[
              <StatusFilter params={params} setParams={setParams} />
            ]}
          />
          <RequestsList requests={data} mutate={mutate} error={error} />
          <Pagination 
            params={params} setParams={setParams} 
            perPage={params.perPage} data={data}
          />
        </Container>
      </HFLayout>
    </div>
  )
}

export default Requests;