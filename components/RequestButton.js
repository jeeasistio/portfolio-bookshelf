import { useState } from 'react'
import axios from 'axios'
import BookmarkIcon from '@icons/Bookmark'
import { Alert } from '@material-ui/lab'
import {  
  Button, 
  Box,
  Snackbar
} from '@material-ui/core'

const RequestButton = ({ bookId }) => {
  
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setsnackMessage] = useState('Book requested');
  const [snackStatus, setSnackStatus] = useState('success');
  
  const makeRequest = () => {
    axios.post('/api/reader/requests', { bookId })
      .then(res => {
        setSnackOpen(true);
        setsnackMessage('Book requested');
        setSnackStatus('success');
      })
      .catch(err => {
        setSnackOpen(true);
        setsnackMessage(err.response.data.msg);
        setSnackStatus('error');
      })
  }
  
  const handleClose = () => setSnackOpen(false);
  
  return (
    <Box my={2}>
      <Button 
        endIcon={<BookmarkIcon />} fullWidth color="primary"
        variant="contained" onClick={makeRequest}
      >
        Request Book
      </Button>
      <Snackbar autoHideDuration={3000} open={snackOpen} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackStatus}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RequestButton;