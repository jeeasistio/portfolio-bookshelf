import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BookmarkIcon from '@icons/Bookmark'
import BooksSkeleton from './BooksSkeleton'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import Link from 'next/link'
import {
    Grid,
    Typography,
    Paper,
    Box,
    makeStyles,
    IconButton,
    Snackbar,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    gridStyle: {
        margin: 0,
        width: '100%',
    },
    authorStyle: {
        fontWeight: theme.typography.fontWeightMedium,
    },
    writtenBy: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
        },
    },
}))

const BooksList = ({ books, setParams, error }) => {
    const classes = useStyles()
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setsnackMessage] = useState('Book requested')
    const [snackStatus, setSnackStatus] = useState('success')

    const makeRequest = async (bookId) => {
        try {
            await axios.post('/api/reader/requests', { bookId })
            setSnackOpen(true)
            setsnackMessage('Book requested')
            setSnackStatus('success')
        } catch (err) {
            setSnackOpen(true)
            setsnackMessage(err.response.data.msg)
            setSnackStatus('error')
        }
    }

    const handleClose = () => setSnackOpen(false)

    if (error) return <ErrorMsg message="Something went wrong" />

    if (books === undefined) return <BooksSkeleton />

    if (books?.length === 0) return <ErrorMsg message="No Books Found" />

    if (books)
        return (
            <Grid
                className={classes.gridStyle}
                spacing={2}
                justifyContent="center"
                container
            >
                {books.map((book) => (
                    <Grid xs={12} sm={6} lg={4} key={uuidv4()} item>
                        <Box
                            component={Paper}
                            height={'100%'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            p={2}
                            elevation={3}
                        >
                            <Link href={`/books/${book.book_id}`}>
                                <a className={classes.link}>
                                    <Typography variant="h6" paragraph>
                                        {book.title}
                                    </Typography>
                                </a>
                            </Link>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography
                                    className={classes.writtenBy}
                                    color="textSecondary"
                                    onClick={() =>
                                        setParams((prev) => ({
                                            ...prev,
                                            query: book.author,
                                            filter: 'author',
                                            page: 1,
                                        }))
                                    }
                                >
                                    Written by:{' '}
                                    <span className={classes.authorStyle}>
                                        {book.author}
                                    </span>
                                </Typography>
                                <IconButton
                                    color="secondary"
                                    onClick={() => makeRequest(book.book_id)}
                                >
                                    <BookmarkIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Snackbar
                    autoHideDuration={3000}
                    open={snackOpen}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={snackStatus}>
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        )
}

export default BooksList
