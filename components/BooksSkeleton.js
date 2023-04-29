import { v4 as uuidv4 } from 'uuid'
import { Skeleton } from '@material-ui/lab'
import BookmarkIcon from '@icons/Bookmark'
import { isMobile } from 'react-device-detect'
import { 
  Grid,
  Paper, 
  Box, 
  makeStyles, 
  Typography, 
  IconButton,
  Avatar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  gridStyle: {
    margin: 0,
    width: '100%'
  },
  writtenStyle: {
    width: '90%',
    marginRight: theme.spacing(1)
  }
}))

const BooksSkeleton = () => {
  
  const classes = useStyles();
  
  return (
    <Grid className={classes.gridStyle} spacing={2} justifyContent="center" container>
      {Array(isMobile ? 20 : 50).fill(0).map(_ => (
        <Grid xs={12} sm={6} lg={4} key={uuidv4()} item>
          <Box 
            component={Paper} height={'100%'} 
            display="flex" flexDirection="column" 
            justifyContent="center" p={2}
          >
            <Typography variant="h6" paragraph><Skeleton /></Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography className={classes.writtenStyle}><Skeleton /></Typography>
              <Skeleton variant="circle">
                <Avatar />
              </Skeleton>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default BooksSkeleton;