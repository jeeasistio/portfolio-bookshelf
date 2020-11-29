import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  detailStyle: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const UserDetails = ({ details }) => {
  
  const classes = useStyles();
  
  return (
    <Box my={2}>
      <Box mb={2}>
        <Typography variant="h4">{details.person_name}</Typography>
      </Box>
      <Box ml={2}>
        <Typography>
          Email: <span className={classes.detailStyle}>{details.email}</span>
        </Typography>
        <Typography>
          Home Address: <span className={classes.detailStyle}>{details.address}</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default UserDetails;