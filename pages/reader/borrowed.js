import Head from 'next/head'
import { useState } from 'react'
import { HFLayout } from '@components/Layout.js'
import UserDetails from '@components/UserDetails'
import SearchFilter from '@components/SearchFilter'
import BooksListRdr from '@components/BooksListRdr'
import Pagination from '@components/Pagination'
import { isMobile } from 'react-device-detect'
import ReaderTabs from '@components/ReaderTabs'
import verifyToken from '@lib/middleware/verifyToken'
import getUserDetails from '@lib/getUserDetails'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const VisitBorrowed = ({ details }) => {
  
  const [params, setParams] = useState({
    query: '',
    filter: 'title',
    sort: 'title',
    order: 'asc',
    perPage: isMobile ? '20' : '50',
    page: 1,
    type: 'borrowed'
  })
  
  const { data, error } = useSWR([`/api/reader/details`, params]);
  
  return (
    <div>
      <Head>
        <title>Your Borrowed Books</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <UserDetails details={details} />
          <ReaderTabs active="borrowed" />
          <SearchFilter params={params} setParams={setParams} />
          <BooksListRdr books={data} setParams={setParams} error={error} />
          <Pagination 
            params={params} setParams={setParams} 
            perPage={params.perPage} data={data}
          />
        </Container>
      </HFLayout>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  verifyToken(req, res);
  const details = await getUserDetails(req.user);
  
  return {
    props: JSON.parse(JSON.stringify({ details }))
  }
}

export default VisitBorrowed;