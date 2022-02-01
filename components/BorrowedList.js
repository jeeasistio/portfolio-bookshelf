import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BorrowedSkeleton from './BorrowedSkeleton'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  retrieveStyle: {
    textTransform: 'none',
    color: theme.palette.error.main
  },
  titleStyle: {
    textTransform: 'none'
  },
  personStyle: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular
  },
  tableHeading: {
    color: theme.palette.text.secondary
  }
}))

const BorrowedList = ({ books, mutate, error }) => {
  const classes = useStyles()
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setsnackMessage] = useState('sucess')
  const [snackStatus, setSnackStatus] = useState('Book retrieved')

  const retrieveBook = async (bookId) => {
    try {
      await axios.patch('/api/librarian/borrowed', { bookId })
      mutate()
      setSnackOpen(true)
      setsnackMessage('Book retrieved')
      setSnackStatus('success')
    } catch (err) {
      setSnackOpen(true)
      setsnackMessage(err.response.data.msg)
      setSnackStatus('error')
    }
  }

  const handleClose = () => setSnackOpen(false)

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeading} align="center">
              Book Title
            </TableCell>
            <TableCell className={classes.tableHeading} align="center">
              Person Borrowing
            </TableCell>
            <TableCell className={classes.tableHeading} align="center">
              Retrieve
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {error && (
            <TableCell colSpan="4">
              <ErrorMsg message="Something went wrong" />
            </TableCell>
          )}

          {books === undefined && <BorrowedSkeleton />}

          {books?.length === 0 && (
            <TableCell colSpan="4">
              <ErrorMsg message="No Books Found" />
            </TableCell>
          )}

          {books?.map((book) => (
            <TableRow key={uuidv4()}>
              <TableCell>
                <Typography
                  component={Button}
                  href={`/books/${book.book_id}`}
                  className={classes.titleStyle}
                >
                  {book.title}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  component={Button}
                  href={`/librarian/visit/requests/${book.person_id}`}
                  className={classes.personStyle}
                >
                  {book.person_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Button
                  className={classes.retrieveStyle}
                  disableTypography
                  onClick={() => retrieveBook(book.book_id)}
                >
                  Retrieve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar autoHideDuration={3000} open={snackOpen} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackStatus}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </TableContainer>
  )
}

export default BorrowedList
