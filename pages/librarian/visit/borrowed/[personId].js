import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { HFLayout } from '@components/Layout.js'
import UserDetails from '@components/UserDetails'
import SearchFilter from '@components/SearchFilter'
import BooksList from '@components/BooksList'
import Pagination from '@components/Pagination'
import { isMobile } from 'react-device-detect'
import VisitTabs from '@components/VisitTabs'
import getUserDetails from '@lib/getUserDetails'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const VisitBorrowed = ({ details }) => {
  
  const router = useRouter();
  
  const [params, setParams] = useState({
    query: '',
    filter: 'title',
    sort: 'title',
    order: 'asc',
    perPage: isMobile ? '20' : '50',
    page: 1,
    type: 'borrowed'
  })
  
  const { data, error } = useSWR([`/api/librarian/visit/${router.query.personId}`, params]);
  
  return (
    <div>
      <Head>
        <title>Visit {details.person_name}'s Borrowed Books</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <UserDetails details={details} />
          <VisitTabs active="borrowed" personId={router.query.personId} />
          <SearchFilter params={params} setParams={setParams} />
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

export const getServerSideProps = async ({ params }) => {
  const details = await getUserDetails(params.personId);
  
  return {
    props: JSON.parse(JSON.stringify({ details }))
  }
}

export default VisitBorrowed;