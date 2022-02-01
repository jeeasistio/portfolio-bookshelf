import { v4 as uuidv4 } from 'uuid'
import BooksSkeleton from './BooksSkeleton'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'
import {
  Grid,
  Typography,
  Paper,
  Box,
  Link,
  CardActionArea,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    margin: 0,
    width: '100%'
  },
  authorStyle: {
    fontWeight: theme.typography.fontWeightMedium
  },
  writtenBy: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

const BooksListRdr = ({ books, setParams, error }) => {
  const classes = useStyles()

  if (error) return <ErrorMsg message="Something went wrong" />

  if (books === undefined) return <BooksSkeleton />

  if (books?.length === 0) return <ErrorMsg message="No Books Found" />

  if (books)
    return (
      <Grid
        className={classes.gridStyle}
        spacing={2}
        justify="center"
        container
      >
        {books.map((book) => (
          <Grid xs={12} sm={6} lg={4} key={uuidv4()} item>
            <Box
              component={Paper}
              height={'100%'}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              p={2}
            >
              <CardActionArea component="a" href={`/books/${book.book_id}`}>
                <Typography variant="h6" paragraph>
                  {book.title}
                </Typography>
              </CardActionArea>
              <Box>
                <Typography
                  className={classes.writtenBy}
                  color="textSecondary"
                  component={Link}
                  onClick={() =>
                    setParams((prev) => ({
                      ...prev,
                      query: book.author,
                      filter: 'author',
                      page: 1
                    }))
                  }
                >
                  Written by:{' '}
                  <span className={classes.authorStyle}>{book.author}</span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    )
}

export default BooksListRdr
