import { v4 as uuidv4 } from 'uuid'
import DeleteIcon from '@icons/Delete'
import CloseIcon from '@icons/Close'
import RequestsSkeleton from './RequestsSkeleton'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
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
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  acceptStyle: {
    color: theme.palette.success.main
  },
  rejectStyle: {
    color: theme.palette.error.main
  },
  pendingStyle: {
    color: theme.palette.warning.main
  }
}))

const RequestsListRdr = ({ requests, mutate, error }) => {
  
  const classes = useStyles();
  
  const cancelRequest = (requestId) => {
    axios.delete(`/api/reader/requests/${requestId}`)
      .then(res => mutate())
  }
  
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow> 
            <TableCell align="center">Book Requesting</TableCell> 
            <TableCell align="center">Status</TableCell> 
            <TableCell align="center">Action</TableCell> 
          </TableRow> 
        </TableHead>
        
        <TableBody>
          {error && (
            <TableCell colSpan="4">
              <ErrorMsg message="Something went wrong" />
            </TableCell>
          )}
          
          {requests === undefined && (
            <RequestsSkeleton />
          )}
          
          {requests?.length === 0 && (
            <TableCell colSpan="4">
              <ErrorMsg message="No Requests Found" />
            </TableCell>
          )}
          
          {requests?.map(request => (
            <TableRow key={uuidv4()}>
              <TableCell>
                <Typography 
                  component={Button} href={`/books/${request.book_id}`}
                  className={classes.buttonStyle}
                >
                  {request.title}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {request.request_status === 'accepted' && (
                  <Typography className={classes.acceptStyle}>Accepted</Typography>
                )}
                {request.request_status === 'rejected' && (
                  <Typography className={classes.rejectStyle}>Rejected</Typography>
                )}
                {request.request_status === 'pending' && (
                  <Typography className={classes.pendingStyle}>Pending</Typography>
                )}
              </TableCell>
              <TableCell>
                {request.request_status === 'pending' && (
                  <Button
                    startIcon={<CloseIcon />} className={classes.rejectStyle}
                    onClick={() => cancelRequest(request.request_id)}
                  >
                    Cancel
                  </Button>
                )}
                {request.request_status !== 'pending' && (
                  <Button
                    startIcon={<DeleteIcon />} className={classes.rejectStyle}
                    onClick={() => cancelRequest(request.request_id)}
                  >
                    Remove
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RequestsListRdr;