import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CheckIcon from '@icons/Check'
import CloseIcon from '@icons/Close'
import RequestsSkeleton from './RequestsSkeleton'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import Link from 'next/link'
import {
    Box,
    IconButton,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Snackbar,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    acceptStyle: {
        color: theme.palette.success.main,
    },
    rejectStyle: {
        color: theme.palette.error.main,
    },
    pendingStyle: {
        color: theme.palette.warning.dark,
        fontSize: '0.8rem',
    },
    titleStyle: {
        textTransform: 'none',
    },
    personStyle: {
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
    },
    tableHeading: {
        color: theme.palette.text.secondary,
    },
    link_book: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
        },
    },
    link_person: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.info.dark,
        },
    },
}))

const RequestsList = ({ requests, mutate, error }) => {
    const classes = useStyles()
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setsnackMessage] = useState('Request Accepted')
    const [snackStatus, setSnackStatus] = useState('success')

    const acceptRequest = (requestId, bookId, personId) => {
        axios
            .patch('/api/librarian/requests', {
                action: 'accept',
                requestId,
                bookId,
                personId,
            })
            .then((res) => {
                mutate()
                setSnackOpen(true)
                setsnackMessage('Request Accepted')
                setSnackStatus('success')
            })
    }

    const rejectRequest = (requestId) => {
        axios
            .patch('/api/librarian/requests', { action: 'reject', requestId })
            .then((res) => {
                mutate()
                setSnackOpen(true)
                setsnackMessage('Request rejected')
                setSnackStatus('error')
            })
    }

    const handleClose = () => {
        setSnackOpen(false)
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className={classes.tableHeading}
                            align="center"
                        >
                            Book Requesting
                        </TableCell>
                        <TableCell
                            className={classes.tableHeading}
                            align="center"
                        >
                            Requested by
                        </TableCell>
                        <TableCell
                            className={classes.tableHeading}
                            align="center"
                        >
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {error && (
                        <TableCell colSpan="4">
                            <ErrorMsg message="Something went wrong" />
                        </TableCell>
                    )}

                    {requests === undefined && <RequestsSkeleton />}

                    {requests?.length === 0 && (
                        <TableCell colSpan="4">
                            <ErrorMsg message="No Requests Found" />
                        </TableCell>
                    )}

                    {requests?.map((request) => (
                        <TableRow key={uuidv4()}>
                            <TableCell>
                                <Link href={`/books/${request.book_id}`}>
                                    <a className={classes.link_book}>
                                        <Typography>{request.title}</Typography>
                                    </a>
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link
                                    href={`/librarian/visit/requests/${request.person_id}`}
                                >
                                    <a className={classes.link_person}>
                                        <Typography>
                                            {request.person_name}
                                        </Typography>
                                    </a>
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                {request.request_status === 'accepted' && (
                                    <Typography className={classes.acceptStyle}>
                                        Accepted
                                    </Typography>
                                )}
                                {request.request_status === 'rejected' && (
                                    <Typography className={classes.rejectStyle}>
                                        Rejected
                                    </Typography>
                                )}
                                {request.request_status === 'pending' && (
                                    <Box>
                                        <Box>
                                            <Typography
                                                className={classes.pendingStyle}
                                                variant="body2"
                                            >
                                                Pending
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                onClick={() =>
                                                    acceptRequest(
                                                        request.request_id,
                                                        request.book_id,
                                                        request.person_id
                                                    )
                                                }
                                            >
                                                <CheckIcon
                                                    className={
                                                        classes.acceptStyle
                                                    }
                                                />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    rejectRequest(
                                                        request.request_id
                                                    )
                                                }
                                            >
                                                <CloseIcon
                                                    className={
                                                        classes.rejectStyle
                                                    }
                                                />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <Snackbar
                    autoHideDuration={3000}
                    open={snackOpen}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={snackStatus}>
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </Table>
        </TableContainer>
    )
}

export default RequestsList
