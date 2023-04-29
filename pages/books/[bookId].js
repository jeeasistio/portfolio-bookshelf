import Head from 'next/head'
import { getOneBook } from '@lib/getBooks'
import { HFLayout } from '@components/Layout'
import BookDetails from '@components/BookDetails'
import RequestButton from '@components/RequestButton'
import nookies from 'nookies'
import { Container } from '@material-ui/core'

const Book = ({ book, userRole }) => {
  return (
    <div>
      <Head>
        <title>{book.title}</title>
      </Head>
      
      <HFLayout>
        <Container maxWidth="lg" >
          <BookDetails book={book} />
          <RequestButton bookId={book.book_id} />
        </Container>
      </HFLayout>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const book = await getOneBook(params.bookId);
  const userRole = nookies.get()['user-role'];
  
  return {
    props: JSON.parse(JSON.stringify({ book, userRole }))
  }
}

export default Book;