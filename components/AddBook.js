import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import AddBookForm from './AddBookForm'
import AddBookButton from './AddBookButton'

const useStyles = makeStyles((theme) => ({
  sectionCtn: {
    margin: theme.spacing(4, 0),
    maxWidth: '100%'
  }
}))

const AddBook = () => {
  const classes = useStyles()

  const [booksQueue, setBooksQueue] = useState([1, 2, 3]);

  return (
    <Box>
      <Box>
        <Box className={classes.sectionCtn}>
          <Typography variant="h3">Add a book</Typography>
        </Box>

        <Grid className={classes.sectionCtn} container spacing={4}>
          {booksQueue.map((queue) => (
            <AddBookForm />
          ))}
          {/* <AddBookToQueue /> */}
        </Grid>

        <Box className={classes.sectionCtn}>
          <AddBookButton />
        </Box>
      </Box>
    </Box>
  )
}

export default AddBook
