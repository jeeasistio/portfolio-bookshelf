import Head from 'next/head'
import { useState } from 'react'
import { HFLayout } from '@components/Layout.js'
import UserDetails from '@components/UserDetails'
import SearchFilter from '@components/SearchFilter'
import RequestsListRdr from '@components/RequestsListRdr'
import Pagination from '@components/Pagination'
import StatusFilter from '@components/StatusFilter'
import { isMobile } from 'react-device-detect'
import ReaderTabs from '@components/ReaderTabs'
import verifyToken from '@lib/middleware/verifyToken'
import getUserDetails from '@lib/getUserDetails'
import useSWR from 'swr'
import { Container } from '@material-ui/core'

const VisitRequests = ({ details }) => {
    const [params, setParams] = useState({
        query: '',
        filter: 'title',
        sort: 'title',
        order: 'asc',
        perPage: isMobile ? '20' : '50',
        page: 1,
        status: 'pending',
        type: 'requests',
    })

    const { data, mutate, error } = useSWR([`/api/reader/details`, params])

    return (
        <div>
            <Head>
                <title>Your Requests</title>
            </Head>
            <HFLayout>
                <Container maxWidth="lg">
                    <UserDetails details={details} />
                    <ReaderTabs active="requests" />
                    <SearchFilter
                        params={params}
                        setParams={setParams}
                        extraFilters={[
                            params.type === 'requests' && (
                                <StatusFilter
                                    params={params}
                                    setParams={setParams}
                                />
                            ),
                        ]}
                    />
                    <RequestsListRdr
                        requests={data}
                        mutate={mutate}
                        error={error}
                    />
                    <Pagination
                        params={params}
                        setParams={setParams}
                        perPage={params.perPage}
                        data={data}
                    />
                </Container>
            </HFLayout>
        </div>
    )
}

export const getServerSideProps = async ({ req, res }) => {
    verifyToken(req, res)
    const details = await getUserDetails(req.user)

    return {
        props: JSON.parse(JSON.stringify({ details })),
    }
}

export default VisitRequests
