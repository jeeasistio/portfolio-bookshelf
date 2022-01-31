import Head from 'next/head'
import { HFLayout } from '@components/Layout.js'
import AddBook from '@components/AddBook'
import Container from '@material-ui/core/Container'

const AddBookPage = () => {
  return (
    <div>
      <Head>
        <title>Add Book</title>
      </Head>
      <HFLayout>
        <Container maxWidth="lg">
          <AddBook />
        </Container>
      </HFLayout>
    </div>
  )
}

export default AddBookPage;