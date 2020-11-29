import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  typeStyle: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const BookDetails = ({ book }) => {
  
  const classes = useStyles();
  
  return (
    <>
      <Box my={4}>
        <Typography variant="h4" align="center">
          {book.title}
        </Typography>
      </Box>
      
      <Box my={2}>
        <Typography>
          <span className={classes.typeStyle}>Author: </span>{book.author}
        </Typography>
      </Box>
      
      <Box my={2}>
        <Typography>
          <span className={classes.typeStyle}>Book Id: </span>{book.book_id}
        </Typography>
      </Box>
      
      <Box>
        <Typography className={classes.typeStyle}>Summary:</Typography>
        <Box py={1} px={2}>
          <Typography>{book.summary}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default BookDetails;