import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { makeStyles, Paper } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  sectionCtn: {
    margin: theme.spacing(4, 0),
    maxWidth: '100%'
  }
}))

const AddBook = () => {
  const classes = useStyles()
  const [status, setStatus] = useState({})
  const { register, handleSubmit, errors, reset } = useForm()

  const addFunc = async (data) => {
    setStatus({ status: 'info', message: 'Adding book...' })

    try {
      await axios.post('/api/librarian/books', data)
      setStatus({ status: 'success', message: 'Book Added' })
      reset()
    } catch (err) {
      setStatus({ status: 'error', message: err.response.data.msg })
    }
  }

  return (
    <Box>
      <Box>
        <Box className={classes.sectionCtn}>
          <Typography variant="h3">Add a book</Typography>
        </Box>

        <Box className={classes.sectionCtn}>
          {status.status && (
            <Alert severity={status.status} className={classes.alertStyle}>
              {status.message}
            </Alert>
          )}
        </Box>

        <Box className={classes.sectionCtn}>
          <Box p={2} component={Paper}>
            <form className={classes.form}>
              <TextField
                margin="normal"
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                error={errors.title}
                helperText={errors.title?.message}
                inputRef={register({ required: 'Please enter a title' })}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Author"
                variant="outlined"
                name="author"
                error={errors.author}
                helperText={errors.author?.message}
                inputRef={register({ required: 'Please enter a author' })}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Summary"
                variant="outlined"
                multiline
                name="summary"
                error={errors.summary}
                helperText={errors.summary?.message}
                inputRef={register({ required: 'Please enter a summary' })}
              />
            </form>
          </Box>
        </Box>

        <Box className={classes.sectionCtn}>
          <Button
            onClick={handleSubmit(addFunc)}
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            disabled={status.status === 'loading'}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AddBook
