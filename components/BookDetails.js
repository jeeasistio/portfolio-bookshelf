import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  typeStyle: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black
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
        <Typography color="textSecondary">
          <span className={classes.typeStyle}>Author: </span>{book.author}
        </Typography>
      </Box>
      
      <Box my={2}>
        <Typography color="textSecondary">
          <span className={classes.typeStyle}>Book Id: </span>{book.book_id}
        </Typography>
      </Box>
      
      <Box>
        <Typography className={classes.typeStyle}>Summary:</Typography>
        <Box py={1} px={2}>
          <Typography color="textSecondary">{book.summary}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default BookDetails;